package kostat.sop.ServiceAPI.api.communityMap;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.FileUtils;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 공지사항 수정<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/01/14  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityNoticeModify extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityNoticeModify.class);
	@Override
	public String getApiId() {
		return "100042";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		cmmnty_map_id,
		cmmnty_map_indvdlz_notice_id,
		title,
		content
	}

	enum OptionParam{
		deleteFileIdArray
	}

	@Override
	public HashMap<String,Object> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			long fileSize = 0;
			List<MultipartFile> multiFiles = new ArrayList<MultipartFile>();
			MultipartRequest multiReq = (MultipartRequest) req;
			Map<?,?> fileMap = multiReq.getFileMap();
			Iterator<?> iter = fileMap.keySet().iterator();
			while (iter.hasNext()) {
				String fileKey = (String) iter.next();
				MultipartFile file = (MultipartFile) fileMap.get(fileKey);
				fileSize+=file.getSize();
				multiFiles.add(file);
			}

			HashMap<String,Object> notice = session.selectOne("communityNotice.selectCmmntyNotice", mapParameter);
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(this.validation(login_id, fileSize, community, notice, mapParameter)){
				boolean result = false;
				if(session.update("communityNotice.updateCmmntyNotice", mapParameter)>0){
					if(fileSize>0){
						result = this.fileUpload(multiFiles, mapParameter);
					}else{
						result = true;
					}
				}
				if(req.getParameterValues("deleteFileIdArray")!=null){
					session.delete("communityNotice.deleteCmmntyNoticeFile", req.getParameterValues("deleteFileIdArray"));
				}
				resultData.put("success", result);
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}
	private boolean validation(String login_id,long fileSize,HashMap<String,Object> community,HashMap<String,Object> notice,Map<String,Object> mapParameter){
		if(login_id==null){
			throw new ApiException("로그인 후 작성가능합니다");
		}else if(community==null){
			throw new ApiException("소통지도가 존재하지 않습니다");
		}else if(notice==null){
			throw new ApiException("공지사항이 존재하지 않습니다");
		}else if(!community.get("usr_id").equals(login_id)||!notice.get("usr_id").equals(login_id)){
			throw new ApiException("등록 권한이 존재하지 않습니다");
		}else if(fileSize>22020096){
			throw new ApiException("첨부파일 제한 용량은 20MB 입니다.");
		}else if(mapParameter.get("title")==null||mapParameter.get("title").toString().length()<=0){
			throw new ApiException("제목을 입력해주세요");
		}else if(mapParameter.get("content")==null||mapParameter.get("content").toString().length()<=0){
			throw new ApiException("내용을 입력해주세요");
		}else if(mapParameter.get("title").toString().length()>30){
			throw new ApiException("제목은 최대 30자까지 작성하실 수 있습니다");
		}else if(mapParameter.get("content").toString().length()>1300){
			throw new ApiException("내용은 최대 1300자까지 작성하실 수 있습니다");
		}else{
			return true;
		}
	}
	private boolean fileUpload(List<MultipartFile> multiFiles,Map<String,Object> mapParameter) throws IOException{
		ClassPathResource resource = new ClassPathResource("/globals.properties");
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String filePath = props.getProperty("Globals.Community.File.Path");
		String savePath = "upload"+File.separator+"community"+File.separator+"notice";

		HashMap<String,Object> fileResult = FileUtils.fileUpload(
				filePath,
				"WHITE",
				"(jpg|jpeg|bmp|png|gif|zip|hwp|xls|xlsx|ppt|pptx|doc|docx|csv|pdf)$",
				savePath,
				multiFiles
				);
		if(!(Boolean)fileResult.get("error")){
			for(HashMap<String,Object> fileResultHashMap : (List<HashMap<String,Object>>) fileResult.get("fileList")){
				mapParameter.put("path_nm",File.separator+savePath+File.separator+fileResultHashMap.get("savePath"));
				mapParameter.put("file_nm",fileResultHashMap.get("originalName"));
				mapParameter.put("ori_file_nm",fileResultHashMap.get("originalFilename"));
				mapParameter.put("save_file_nm",fileResultHashMap.get("saveFilename"));
				mapParameter.put("file_extn",fileResultHashMap.get("extension"));
				mapParameter.put("file_type",fileResultHashMap.get("contentType"));
				session.insert("communityNotice.insertCmmntyNoticeFile", mapParameter);
			}
			return true;
		}else{
			throw new ApiException(fileResult.get("message").toString());
		}
	}
}
