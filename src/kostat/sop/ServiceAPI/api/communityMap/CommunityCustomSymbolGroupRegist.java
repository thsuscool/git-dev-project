package kostat.sop.ServiceAPI.api.communityMap;


import java.io.File;
import java.util.HashMap;
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
 * 1. 기능 : 소통지도 커스텀 심볼 그룹 만들기<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/05/15  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityCustomSymbolGroupRegist extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityCustomSymbolGroupRegist.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	@Override
	public String getApiId() {
		return "100070";
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
		custom_symbol_group_nm,
		customSymbolName
	}

	enum OptionParam{
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
			Properties props = PropertiesLoaderUtils.loadProperties(resource);

			Map<String,Object> mapParameter = getParameterMap(req);
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			MultipartRequest multiReq = (MultipartRequest) req;
			List<MultipartFile> customSymbolFileList = multiReq.getFiles("customSymbolFile");
			mapParameter.put("share_yn", "N");
			mapParameter.put("auto_create_yn", "N");

			if(httpSession.getAttribute("member_id")==null){
				throw new ApiException("로그인이 필요합니다");
			}
			if(customSymbolFileList==null||customSymbolFileList.size()<=0){
				throw new ApiException("아이콘을 등록해주세요");
			}
			mapParameter.put("member_id",httpSession.getAttribute("member_id").toString());
			if(session.insert("communityCustomSymbol.insertCustomSymbolGroup",mapParameter)>0){
				String filePath = props.getProperty("Globals.Community.File.Path");
				String[] customSymbolName = req.getParameterValues("customSymbolName");
				for(int i=0;i<customSymbolFileList.size();i++){
					if(!this.insertCustomSymbolFile(mapParameter.get("custom_symbol_group_id").toString(), customSymbolName[i], filePath, customSymbolFileList.get(i),i+1)){
						throw new ApiException("등록을 실패하였습니다");
					}
				}
				resultData.put("custom_symbol_group_id", mapParameter.get("custom_symbol_group_id").toString());
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
	private boolean insertCustomSymbolFile(
			String custom_symbol_group_id,
			String label_nm,
			String filePath,
			MultipartFile file,
			int order
			)throws Exception,IllegalArgumentException{
		HashMap<String, Object> parameters = new HashMap<String, Object>();
		String symbolSavePath = "upload"+File.separator+"community"+File.separator+"symbol";
		HashMap<String,Object> fileResult = FileUtils.imageUpload(filePath, symbolSavePath, file);
		if(!(Boolean)fileResult.get("error")){
			HashMap<String,Object> fileResultHashMap = (HashMap<String, Object>) fileResult.get("file");
			parameters.put("label_nm",label_nm);
			parameters.put("custom_symbol_group_id",custom_symbol_group_id);
			parameters.put("path_nm",File.separator+symbolSavePath+File.separator+fileResultHashMap.get("savePath"));
			parameters.put("save_file_nm",fileResultHashMap.get("saveFilename"));
			parameters.put("file_extn",fileResultHashMap.get("extension"));
			parameters.put("file_type",fileResultHashMap.get("contentType"));
			parameters.put("ori_file_nm",fileResultHashMap.get("originalFilename"));
			parameters.put("order", order);
			return session.insert("communityCustomSymbol.insertCustomSymbol",parameters)>0&&session.insert("communityCustomSymbol.insertCustomSymbolFile",parameters)>0;
		}else{
			return false;
		}
	}
}
