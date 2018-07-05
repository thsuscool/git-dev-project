package kostat.sop.ServiceAPI.api.bizStats;

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

import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.BizStatsMapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 지자체 인허가 업종별 개업현황 시계열별 데이터 정보 API
* <pre>
* input : PoiOpenTimeSeries.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 
* </pre>
* 
* @author 
* @version 1.0, 
* @see None
*/

@SuppressWarnings("rawtypes")
public class PoiBestTimeSeries extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(PoiBestTimeSeries.class);
	
	//우리동네 생활업종 지도 관련 서비스
	@Resource(name="bizStatsMapService")
	private BizStatsMapService bizStatsMapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10025";
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
		adm_cd,
		param_job_best_from,
		param_job_best_to
	}
	
	enum OptionParam
	{
		what
	}
	
	@SuppressWarnings({ "unchecked", "unused" })
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
			
			String adm_cd = (String)mapParameter.get("adm_cd");
			String bnd_year = (String)mapParameter.get("param_job_best_from");
			String theme_cd = (String)mapParameter.get("param_job_best_to");
			String year = (String)mapParameter.get("what");
			int cntSum = 0;

			
			//년도별 사업체 수
			List jobBestTab10 = bizStatsMapService.selectjobBestTab10(mapParameter);
			List jobBestTab20 = bizStatsMapService.selectjobBestTab20(mapParameter);
			List jobBestTab30 = bizStatsMapService.selectjobBestTab30(mapParameter);
			List jobBestTab40 = bizStatsMapService.selectjobBestTab40(mapParameter);
			List jobBestTab50 = bizStatsMapService.selectjobBestTab50(mapParameter);
			List jobBestTabFull = bizStatsMapService.selectjobBestTabFull(mapParameter);
			
			resultData.put("jobBestTab10", jobBestTab10);
			resultData.put("jobBestTab20", jobBestTab20);
			resultData.put("jobBestTab30", jobBestTab30);
			resultData.put("jobBestTab40", jobBestTab40);
			resultData.put("jobBestTab50", jobBestTab50);
			resultData.put("jobBestTabFull", jobBestTabFull);
			
			
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