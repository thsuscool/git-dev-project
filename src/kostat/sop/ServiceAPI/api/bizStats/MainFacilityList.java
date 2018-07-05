package kostat.sop.ServiceAPI.api.bizStats;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.BizStatsMapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 주요시설물 정보 조회 API
* <pre>
* input : mainFacilityList.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/12/29 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/12/29 메서드 추가
* @see None
*/

@SuppressWarnings("rawtypes")
public class MainFacilityList extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(Houseprice.class);
	
	//생활업종지도 관련 서비스
	@Resource(name="bizStatsMapService")
	private BizStatsMapService bizStatsMapService;
		
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10020";
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
	}
	
	@SuppressWarnings({ "unchecked" })
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
			
			//동코드
			String adm_cd = (String)mapParameter.get("adm_cd");
			//2016.09.06 9월 서비스
			//String base_year = Properties.getDefult_bnd_year();
			String base_year = Collections.max(Properties.getCompany_year_list());
			mapParameter.put("base_year", base_year);
			
			if(adm_cd == null)
			{
				throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}

			//주요시설물 정보
			Map themeInfo = bizStatsMapService.mainFacilityList(mapParameter);
			resultData.put("themeInfo", themeInfo);
			List themeNmInfo = bizStatsMapService.mainFacilityList_thcd(mapParameter);
			resultData.put("themeNmInfo", themeNmInfo);
			
			List<String> themeNm_01 = new ArrayList<String>();
			List<String> themeNm_02 = new ArrayList<String>(); 
			List<String> themeNm_03 = new ArrayList<String>(); 
			List<String> themeNm_04 = new ArrayList<String>(); 
			List<String> themeNm_05 = new ArrayList<String>(); 
			List<String> themeNm_06 = new ArrayList<String>(); 
			List<String> themeNm_07 = new ArrayList<String>(); 
			List<String> themeNm_08 = new ArrayList<String>(); 
			List<String> themeNm_09 = new ArrayList<String>(); 
			List<String> themeNm_10 = new ArrayList<String>(); 
			
			//List<String> themeNm = new ArrayList<String>();			
			Map<String, List<String>> themeNm = new HashMap<String, List<String>>();
			
			for(int i=0; i<themeNmInfo.size(); i++){
				Map tMap = (Map)themeNmInfo.get(i);
				String t_nm = tMap.get("s_theme_cd_nm").toString();
				String t_cd = tMap.get("theme_cd").toString();
				//System.out.println("theme_cd =" + t_cd);
				//System.out.println("t_nm = " + t_nm + " :: t_cd = " + t_cd);
				if(t_cd.equals("7001")||t_cd.equals("7002")||
						t_cd.equals("7003")||t_cd.equals("7004")||
						t_cd.equals("7004")||t_cd.equals("7006")||
						t_cd.equals("7007")){
					themeNm_01.add(t_nm);
				}
				if(t_cd.equals("6001")||t_cd.equals("6002")||
						t_cd.equals("6003")||t_cd.equals("6004")){
					themeNm_02.add(t_nm);
				}
				if(t_cd.equals("8006")||t_cd.equals("9002")){
					themeNm_03.add(t_nm);
				}
				if(t_cd.equals("8007")||t_cd.equals("9003")){
					themeNm_04.add(t_nm);
				}
				if(t_cd.equals("6003")||t_cd.equals("6004")){
					themeNm_06.add(t_nm);
				}
				if(t_cd.equals("9001")){
					themeNm_07.add(t_nm);
				}
				if(t_cd.equals("2003")){
					themeNm_08.add(t_nm);
				}
				if(t_cd.equals("9004")){
					themeNm_09.add(t_nm);
				}
				if(t_cd.equals("9005")){
					themeNm_10.add(t_nm);
				}
			}
			themeNm.put("themeNm_01", themeNm_01);
			themeNm.put("themeNm_02", themeNm_02);
			themeNm.put("themeNm_03", themeNm_03);
			themeNm.put("themeNm_04", themeNm_04);
			themeNm.put("themeNm_05", themeNm_05);
			themeNm.put("themeNm_06", themeNm_06);
			themeNm.put("themeNm_07", themeNm_07);
			themeNm.put("themeNm_08", themeNm_08);
			themeNm.put("themeNm_09", themeNm_09);
			themeNm.put("themeNm_10", themeNm_10);
			
			// 2016.12.02 시큐어코딩 삭제
			resultData.put("themeNmInfo", themeNm);
			
			//resultData.put("themeNmInfo", themeNmInfo);
			
			if(logger.isDebugEnabled())
			{
				logger.debug(themeNmInfo);
			}
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