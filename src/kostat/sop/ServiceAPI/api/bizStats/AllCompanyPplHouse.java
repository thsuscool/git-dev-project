package kostat.sop.ServiceAPI.api.bizStats;

import java.util.ArrayList;
import java.util.Collections;
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

/**
* 지역 종합정보 조회 - 총사업체, 총인구, 총가구, 총주택 조회
* <pre>
* input : allCompanyPplHouse.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/12/03 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/12/03 메서드 추가
* @see None
*/

@SuppressWarnings("rawtypes")
public class AllCompanyPplHouse extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(AllCompanyPplHouse.class);
	
	//생활업종지도 관련 서비스
	@Resource(name="bizStatsMapService")
	private BizStatsMapService bizStatsMapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10018";
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
		adm_cd
	}
	
	enum OptionParam
	{
		sub_adm_cd1,
		sub_adm_cd2
	}
	
	@SuppressWarnings({ "unchecked" })
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		List compareList = new ArrayList();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			//동코드
			//2016.09.06 9월 서비스
			String adm_cd = (String)mapParameter.get("adm_cd");
			String company_year = Collections.max(Properties.getCompany_year_list());
			String base_year = Collections.max(Properties.getYear_list());
			mapParameter.put("year", base_year);
			mapParameter.put("company_year", company_year);
			
			if(adm_cd == null)
			{
				throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}
			
			//총사업체, 총인구, 총가구, 총주택
			Map result = new HashMap();
			result = bizStatsMapService.getAllCompanyPplHouse(mapParameter);
			resultData.put("corp_cnt", result.get("corp_cnt"));
			resultData.put("ppltn_cnt", result.get("ppltn_cnt"));
			resultData.put("family_cnt", result.get("family_cnt"));
			resultData.put("resid_cnt", result.get("resid_cnt"));
			
			String sub_adm_cd1 = (String)mapParameter.get("sub_adm_cd1");		//비교하려는 지역1
			String sub_adm_cd2 = (String)mapParameter.get("sub_adm_cd2");		//비교하려는 지역2
			if(sub_adm_cd1 != null || sub_adm_cd2 != null) {	//비교 지역이 한군데라도 있을 경우 adm_cd로 찾은 지역을 List에 저장
				compareList.add(result);
			}
			if(sub_adm_cd1 != null) {	//비교하려는 지역이 있을경우
				mapParameter.put("adm_cd", sub_adm_cd1);
				result = bizStatsMapService.getAllCompanyPplHouse(mapParameter);
				compareList.add(result);
			}
			if(sub_adm_cd2 != null){	//비교하려는 지역이 있을경우
				mapParameter.put("adm_cd", sub_adm_cd2);
				result = bizStatsMapService.getAllCompanyPplHouse(mapParameter);
				compareList.add(result);
			}
			resultData.put("compareList", compareList);
			
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