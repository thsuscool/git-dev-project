package kostat.sop.ServiceAPI.api.communityMap;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 커스텀 심볼 리스트<p>
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
public class CommunityCustomSymbolList extends AbsQuery<List<HashMap<String,Object>>> {
	private static final Log logger = LogFactory.getLog(CommunityCustomSymbolList.class);
	@Override
	public String getApiId() {
		return "100074";
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
		return "communityCustomSymbol.selectCommunityCustomSymbolList";
	}

	enum MustParam{
		custom_symbol_group_id
	}

	enum OptionParam{
	}

	@Override
	public List<HashMap<String,Object>> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		List<HashMap<String,Object>> resultData = new ArrayList<HashMap<String,Object>>();
		httpSession = req.getSession();
		try {
			Map<String,Object> mapParameter = getParameterMap(req);
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			resultData = session.selectList(getQueryStr(),mapParameter.get("custom_symbol_group_id"));
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
}
