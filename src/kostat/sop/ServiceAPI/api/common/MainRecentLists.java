package kostat.sop.ServiceAPI.api.common;

import java.util.HashMap;
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


public class MainRecentLists extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(MainRecentLists.class);
	@Override
	public String getApiId() {
		return "1003";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			List interactiveLists = (List)session.selectList("common.interactive_recent");
			resultData.put("interactive_lists", interactiveLists);
			
			List themaListsY = (List)session.selectList("common.thema_recent");
			resultData.put("thema_lists", themaListsY);
		
//			List themaListsN = (List)session.selectList("common.thema_recent2");
//			resultData.put("thema_lists2", themaListsN);
//			
			List bannerList = (List)session.selectList("common.banner_recent");
			resultData.put("banner_lists", bannerList);
			
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