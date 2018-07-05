package kostat.sop.ServiceAPI.api.board;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.AbsAPI;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

import kostat.sop.ServiceAPI.exception.ApiException;

public class FileUploadCheck extends AbsAPI<Map> {

	private static final Log logger = LogFactory.getLog(FileUploadCheck.class);

	@Override
	public String getApiId() {
		return "8013";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trx) throws AbsException {

		logger.info("==1=================================================");  
		MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) req;
		MultipartFile multiFile = multiReq.getFile("qna_file");
		//if (logger.isDebugEnabled()) {
			logger.info("Name          : [ " + multiFile.getName() + " ]");
			logger.info("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
			logger.info("Content-Type  : [ " + multiFile.getContentType() + " ]");
			logger.info("Size          : [ " + multiFile.getSize() + " ]");
		//}
			logger.info("==2=================================================");  
		
		Map<String, Object> resultMap = new HashMap();
		try {
			resultMap.put("size", multiFile.getSize());
		} 
		catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		}
		catch (Exception e) {
			logger.error(e);
			throw new ApiException("잘못된 파일입니다.");
		}
		return resultMap;
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}
}
