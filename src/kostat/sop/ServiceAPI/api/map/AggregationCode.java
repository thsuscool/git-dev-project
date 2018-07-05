package kostat.sop.ServiceAPI.api.map;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;

/**
 * Created by htkim on 2014-10-27.
 */
@SuppressWarnings("rawtypes")
public class AggregationCode extends AbsQuery<NFData> {

	private static final Log logger = LogFactory.getLog(AggregationCode.class);

	@Override
	public String getApiId() {
		return "5102";
	} 

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	
	@Override
	protected String getQueryStr() {
		return null;
	}

	@Override
	public NFData executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		
		httpSession = req.getSession();
		NFData resultMap = null;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String x = req.getParameter(MustParam.x.name());
			String y = req.getParameter(MustParam.y.name());
			Map paramsSql = new HashMap<String, String>();
			paramsSql.put(MustParam.x.name(), x);
			paramsSql.put(MustParam.y.name(), y);
			Map mapSelOne = (Map) session.selectOne("selectAggregationCode", paramsSql);
			if( logger.isDebugEnabled()) {
				logger.debug(mapSelOne);
			}
			resultMap = new NFData( mapSelOne );
			
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
		
		return resultMap;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}

	private enum MustParam {
		x,
		y
	}
}
