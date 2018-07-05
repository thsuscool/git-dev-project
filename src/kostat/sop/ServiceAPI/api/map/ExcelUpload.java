package kostat.sop.ServiceAPI.api.map;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.AbsAPI;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class ExcelUpload extends AbsAPI<Map> {

	private static final Log logger = LogFactory.getLog(ExcelUpload.class);

	@Override
	public String getApiId() {
		return "5101";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trx) throws AbsException {

		logger.info("==1=================================================");  
		MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) req;
		MultipartFile multiFile = multiReq.getFile("fileData");
		//if (logger.isDebugEnabled()) {
			logger.info("Name          : [ " + multiFile.getName() + " ]");
			logger.info("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
			logger.info("Content-Type  : [ " + multiFile.getContentType() + " ]");
			logger.info("Size          : [ " + multiFile.getSize() + " ]");
		//}
			logger.info("==2=================================================");  
		ConvertExcelToMap eToMapConverter = new ConvertExcelToMap(multiFile);
		Map<String, Object> resultMap = null;
		try {
			resultMap = eToMapConverter.convert();
		} 
		catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		}
		catch (Exception e) {
			logger.error(e);
			throw new ApiException("엑셀변환에 실패하였습니다. 지정된 폼이 맞는지 다시확인하여 주십시요.");
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
