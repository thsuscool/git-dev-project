package kostat.sop.ServiceAPI.api.policy;


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
 * 1. 기능 : 정책통계지도 메뉴 년도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 송종대, 1.0, 2016/11/25  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 송종대
 * @version 1.0
 * @see
 * <p/>
 */

public class MenuTypeYearList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(MenuTypeYearList.class);
	@Override
	public String getApiId() {
		return "100400";
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
	
	enum MustParam
	{
		menu_type,//mainIndex, populationHouse
		api_id,//API_0301, API_0302
		lclas_id,
		mlsfc_id
	}
	
	enum OptionParam
	{
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			List yearList = new ArrayList();
			HashMap map = session.selectOne("policyStatic.menuYearInfo", mapParameter);
			
			//int fromYear = (Integer)map.get("start_year");
			//int toYear = (Integer)map.get("end_year");
			//int cycle = (Integer)map.get("year_cycle");
			
			int fromYear = Integer.parseInt((String) map.get("start_year"));
			int toYear = Integer.parseInt((String) map.get("end_year"));
			int cycle = (Integer)map.get("year_cycle");
			int _for = ((toYear - fromYear)/cycle) + 1;
			
			
			for (int i = 0; i < _for; i++) {
				int year = fromYear;
				HashMap resultmap = new HashMap();
				year = year + (i * cycle);
				resultmap.put("year", year);
				yearList.add(resultmap);
			}
			
			//mng_s leekh 2016년 추가
			if(toYear == 2016){
				int year = fromYear;
				HashMap resultmap = new HashMap();
				resultmap.put("year", toYear);
				yearList.add(resultmap);
			}
			//mng_e leekh 2016년 추가
			
			result.put("yearList", yearList);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
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
		return result;
	}
}
