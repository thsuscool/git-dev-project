package kostat.sop.ServiceAPI.api.communityMap;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.FileUtils;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 POI<p>
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
public class CommunityPoiRegist extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityPoiRegist.class);
	private static final String PROPERTY_PATH = "/globals.properties"; //20160526 차수아 추가
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100012";
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
		title,
		reg_lc,
		opinion_state,
		symbol,
		loc_x,
		loc_y
	}

	enum OptionParam{
		cmmnty_ipcd,
		cmmnty_ppcd
	}

	@Override
	public HashMap<String,Object> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			communityService.replaceIdPw(mapParameter);
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
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(this.validation(login_id,fileSize, community, mapParameter)){
				mapParameter.put("geom", "Point("+mapParameter.get("loc_x")+" "+mapParameter.get("loc_y")+")");
				boolean result = false;
				if(multiFiles.size()<6){
					if(session.insert("communityPoi.insertPoiPoint", mapParameter)>0){
						if(session.insert("communityPoi.insertPoi", mapParameter)>0){
							if(fileSize>0){
								result = this.imageUpload(multiFiles, mapParameter);
							}else{
								result = true;
							}

						}
					}
				}else if(multiFiles.size()>5){
					throw new ApiException("이미지는 최대 5개까지 등록하실 수 있습니다.");
				}
				resultData.put("cmmnty_poi_id", mapParameter.get("cmmnty_poi_id"));
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
	private boolean validation(String login_id,long fileSize,HashMap<String,Object> community,Map<String,Object> mapParameter) throws Exception,IllegalArgumentException{
		communityService.registCheckDate(community);
		if(!community.get("regist_yn").equals("Y")){
			throw new ApiException("등록 권한이 존재하지 않습니다");
		}else if(fileSize>22020096){
			throw new ApiException("첨부파일 제한 용량은 20MB 입니다.");
		}else if(mapParameter.get("title")==null||mapParameter.get("title").toString().length()<=0){
			throw new ApiException("제목을 입력해주세요");
		}else if(mapParameter.get("reg_lc")==null||mapParameter.get("reg_lc").toString().length()<=0){
			throw new ApiException("위치를 등록해주세요");
		}else if(mapParameter.get("opinion_state")==null||mapParameter.get("opinion_state").toString().length()<=0){
			throw new ApiException("의견기재 해주세요");
		}else if(mapParameter.get("title").toString().length()>30){
			throw new ApiException("제목은 최대 30자까지 작성하실 수 있습니다");
		}else if(mapParameter.get("reg_lc").toString().length()>65){
			throw new ApiException("등록위치는 최대 65자까지 작성하실 수 있습니다");
		}else if(mapParameter.get("opinion_state").toString().length()>150){
			throw new ApiException("의견기재는 최대 150자까지 작성하실 수 있습니다");
		}
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		if(community.get("cmmnty_partcptn_grant_yn").equals("M")&&!community.get("usr_id").equals(login_id)){
			String pw = mapParameter.get("pw").toString();
			HashMap<String,Object> mber = session.selectOne("communityRegistMember.selectCmmntyMapRegMber", mapParameter);
			if(mber==null||!bcrypt.matches(pw,mber.get("pw").toString())){
				throw new ApiException("아이디 또는 비밀번호를 확인해주세요");
			}else{
				mapParameter.put("member_id", mapParameter.get("id"));
			}
		}else if(community.get("cmmnty_partcptn_grant_yn").equals("P")&&!community.get("usr_id").equals(login_id)){
			if(mapParameter.get("id")==null){
				throw new ApiException("아이디를 입력해주세요");
			}else if(mapParameter.get("id").toString().length()<5){
				throw new ApiException("아이디는 5글자 이상으로 등록해주세요");
			}else if(mapParameter.get("id").toString().length()>30){
				throw new ApiException("아이디는 30글자 이하로 등록해주세요");
			}else if(!mapParameter.get("id").toString().matches("[a-z|A-Z|0-9]+")){
				throw new ApiException("아이디는 영문 또는 숫자만 사용하실 수 있습니다");
			}else if(community.get("usr_id").equals(mapParameter.get("id").toString())){
				throw new ApiException("개설자 아이디는 사용하실 수 없습니다");
			}else{
				String pw = mapParameter.get("pw").toString();
				String communityPw = session.selectOne("communityMap.selectCmmntyMapPassword", mapParameter);
				if(!bcrypt.matches(pw,communityPw)){
					throw new ApiException("소통지도에 설정된 비밀번호를 확인해주세요");
				}else{
					mapParameter.put("member_id", mapParameter.get("id"));
				}
			}
		}else if(community.get("cmmnty_partcptn_grant_yn").equals("A")&&!community.get("usr_id").equals(login_id)){
			if(mapParameter.get("id")==null){
				throw new ApiException("별명을 입력해주세요");
			}else if(mapParameter.get("id").toString().length()<5){
				throw new ApiException("별명은 5글자 이상으로 등록해주세요");
			}else if(mapParameter.get("id").toString().length()>30){
				throw new ApiException("별명은 30글자 이하로 등록해주세요");
			}else if(!mapParameter.get("id").toString().matches("[a-z|A-Z|0-9]+")){
				throw new ApiException("별명은 영문 또는 숫자만 사용하실 수 있습니다");
			}else if(community.get("usr_id").equals(mapParameter.get("id").toString())){
				throw new ApiException("별명은 개설자 아이디는 사용하실 수 없습니다");
			}else if(mapParameter.get("pw")==null){
				throw new ApiException("비밀번호를 입력해주세요");
			}else{
				mapParameter.put("member_id", mapParameter.get("id"));
				mapParameter.put("member_pw",bcrypt.encode(mapParameter.get("pw").toString()));
			}
		}else{
			if(login_id==null){
				throw new ApiException("로그인 후 작성가능합니다");
			}
		}
		return true;
	}
	private boolean imageUpload(List<MultipartFile> multiFiles,Map<String,Object> mapParameter) throws IOException{
		ClassPathResource resource = new ClassPathResource("/globals.properties");
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String filePath = props.getProperty("Globals.Community.File.Path");
		String savePath = "upload"+File.separator+"community"+File.separator+"poimg";
		HashMap<String,Object> fileResult = FileUtils.fileUpload(
				filePath,
				"WHITE",
				"(?i)(jpe?g|png|gif|bmf)$",
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
				session.insert("communityPoi.insertPoiImage", mapParameter);
			}
			return true;
		}else{
			throw new ApiException(fileResult.get("message").toString());
		}
	}
}
