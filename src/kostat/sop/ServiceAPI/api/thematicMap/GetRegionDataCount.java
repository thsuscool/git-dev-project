package kostat.sop.ServiceAPI.api.thematicMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetRegionDataCount extends AbsQuery<String> {
	private static final Log logger = LogFactory.getLog(GetRegionDataCount.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9037";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.GET;
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
		region
	}
	
	enum OptionParam
	{
		base_year
	}
	
	@Override
	public String executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map mapParameter= getParameterMap(req);
		
		_checkNullParameterValue(mapParameter);
			
		List getCount = new ArrayList<>();
		String count = "";
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			getCount = session.selectList("thematicMap.select.getRegionDataCount",mapParameter);
			count = (String)getCount.get(0);					
			
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
		return count;
	}
}