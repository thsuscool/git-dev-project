package kostat.sop.ServiceAPI.share;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 1. 기능 : 예제.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : j.h.Seok, 1.0, 2014/08/20  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : j.h.Seok
 * @version 1.0
 * @see
 * <p/>
 */
public class UseBoardRegist extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(UseBoardRegist.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	private FileOutputStream fos;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8009";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		//req_file_real
	}
	
	enum OptionParam
	{
		req_file_real1,
		req_file_real2,
		req_file_real3,
		req_file_real4,
		req_file_real5,
		fileName
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		Boolean isResponseCorrect = false;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);

			MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) req;
			
			MultipartFile multiFile;

			if(multiReq.getFile("req_file_real1") != null){
				multiFile = multiReq.getFile("req_file_real1");
			}
			else if(multiReq.getFile("req_file_real2") != null){
				multiFile = multiReq.getFile("req_file_real2");
			}
			else if(multiReq.getFile("req_file_real3") != null){
				multiFile = multiReq.getFile("req_file_real3");
			}
			else if(multiReq.getFile("req_file_real4") != null){
				multiFile = multiReq.getFile("req_file_real4");
				
			}else if(multiReq.getFile("req_file_real5") != null){
					multiFile = multiReq.getFile("req_file_real5");
			}else{
				multiFile = multiReq.getFile("req_file_real1");
			}
			String originName = multiFile.getOriginalFilename();
			String fileName = originName.substring(0, originName.lastIndexOf("."));
			long fileSize = multiFile.getSize();
			String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
			
			int count = 0;		//허용된 확장자인지 체크
			if(fileSize > 22020096) {
				throw new ApiException("첨부파일 제한 용량은 20MB 입니다.");
			} else {
				for(String extd : getAllowExtension()) {
					if(fileExtension.equals(extd)) {
						count++;
						break;
					}
				}
			}
			if(count == 0) {
				throw new ApiException("허용 가능한 확장자가 아닙니다.");
			}
			
			
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
//			String filePath = props.getProperty("Globals.Board.File.Path");
//			filePath += "share"/*(String) mapParameter.get(MustParam.board_cd.name())*/;
//			String filePath = "/upload/share/";
			String filePath = "/DATA/docs/statsPotal/upload/share";
//			String filePath = "C:/workspace/statsPotal/upload/share";
			
			long curTime = System.currentTimeMillis();
			String fileId = fileName + "_" + Long.toString(curTime);
			String fileContentType = multiFile.getContentType();
			/*
			if (logger.isDebugEnabled()) {
				logger.debug("Name          : [ " + multiFile.getName() + " ]");
				logger.debug("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
				logger.debug("Extension     : [ " + originName.substring(originName.lastIndexOf(".") + 1) + " ]");
				logger.debug("Content-Type  : [ " + multiFile.getContentType() + " ]");
				logger.debug("Size          : [ " + multiFile.getSize() + " ]");
			} else {
				logger.info("Name          : [ " + multiFile.getName() + " ]");
				logger.info("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
				logger.info("Extension     : [ " + originName.substring(originName.lastIndexOf(".") + 1) + " ]");
				logger.info("Content-Type  : [ " + multiFile.getContentType() + " ]");
				logger.info("Size          : [ " + multiFile.getSize() + " ]");
				logger.info("ParamMap      : [ " + req.getParameterMap() + " ]");
			}*/
			
			logger.info("fileId :: " + fileId);
			logger.info("filePath :: " + filePath);
			logger.info("fileName :: " + fileName);
			logger.info("fileExtension :: " + fileExtension);
			logger.info("fileContentType :: " + fileContentType);
			
			if(writeFile(multiFile, filePath, fileId, fileExtension)) {
				resultData.put("fileId", fileId + "." + fileExtension);
			} else {
				throw new ApiException("파일 업로드에 실패 하였습니다.");
			}
					
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

	private void decodeParams(Map mapParameter) {
		Set<String> keySet = mapParameter.keySet();
		Iterator<String> itr = keySet.iterator();
		
		while(itr.hasNext()) {
			String key = itr.next();
			String value = (String) mapParameter.get(key);
			
			try {
				mapParameter.put(key, URLDecoder.decode(value, "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			}
		}
	}
	
	private Boolean writeFile(MultipartFile file, String path, String fileName, String extension){
		File f = new File(path);
		if(!f.exists()) {
			f.mkdirs();
		}
		
		Boolean returnValue = false;
		try {
			//2015-12-03 시큐어코딩
			path = StringUtil.specialCharCnvr(path);
			fileName = StringUtil.specialCharCnvr(fileName);
			extension = StringUtil.specialCharCnvr(extension);
			
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String slash = props.getProperty("Globals.Board.File.Path.slash");
			
			byte fileData[] = file.getBytes();
			fos = new FileOutputStream(path + slash + fileName + "." + extension);
			fos.write(fileData);
			
			returnValue = true;
		} catch(FileNotFoundException e){
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} catch(IOException e){
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}catch(Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
			if(fos != null) {
				try{
					fos.close();
				} catch(IOException e){
					logger.error(e);
					throw new ApiException(StringUtil.getErrMsg());
				}

			}
		}
		
		return returnValue;
	}
}