package kostat.sop.ServiceAPI.api.publicData;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.PublicDataService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
* 공공데이터 목록 가져오기 API
* <pre>
* input : publicDataList.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/12/17 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/12/17 메서드 추가
* @see None
*/

@SuppressWarnings("rawtypes")
public class PublicDataList extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(PublicDataList.class);
	
	//공공데이터 관련 서비스
	@Resource(name="publicDataService")
	private PublicDataService publicDataService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "11005";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
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
		type
	}
	
	enum OptionParam
	{
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			//공공데이터 목록
			List dataList = publicDataService.selectPublicDataList(mapParameter);
			resultData.put("dataList", dataList);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
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
}