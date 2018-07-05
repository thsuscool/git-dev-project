package kostat.sop.ServiceAPI.api.policy;


import java.util.HashMap;
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
 * 1. 기능 : 정책통계지도 지자체 POI 조회 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠, 1.0, 2017/1/3  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */

public class GetLocalGovernmentPoi extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetLocalGovernmentPoi.class);
	@Override
	public String getApiId() {
		return "100407";
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
		base_year,
		div_cd
	}
	
	enum OptionParam{
		sido_cd,
		sgg_cd,
		emdong_cd,
		pageSize,
		page_num
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();
		HashMap<String,Object> result =  new HashMap<String,Object>();
		Map<String,Object> mapParameter = getParameterMap(req);
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			_checkNullParameterValue(mapParameter);
			int pageSize = req.getParameter("pageSize")==null?50:Integer.parseInt(mapParameter.get("pageSize").toString());
			int curPage = req.getParameter("page_num")==null?1:Integer.parseInt(mapParameter.get("page_num").toString());
			int lastNum = pageSize*(curPage-1) + 1;
			if(curPage == 1){
				lastNum = 0;
			}
			mapParameter.put("page_size", pageSize);
			mapParameter.put("last_num", lastNum);
			result.put("pageSize", pageSize);
			result.put("page_num", curPage);
			result.put("total_count", session.selectOne("policyStatic.selectOpenDataPoiCount",mapParameter));
			result.put("summaryList", session.selectList("policyStatic.selectOpenDataPoiList",mapParameter));
			logger.info("END Query - TXID[" + getApiId() + "] ");
			return result;
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("메뉴정보를 확인 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
	}
}
