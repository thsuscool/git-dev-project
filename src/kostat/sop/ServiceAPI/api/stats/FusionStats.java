package kostat.sop.ServiceAPI.api.stats;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

public class FusionStats extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(FusionStats.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "4011";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		List result = new ArrayList();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			optimizeParameterMap(mapParameter);
			String strFormat =_getViewType(req,res);
			if(strFormat.equals("geojson")||strFormat.equals("kml")){
				throw new NotSupportFormatException("Not Support Format[" + strFormat + "]");
			}
			
			// 9월 서비스
			String year = (String) mapParameter.get("year");
			
			// mng_s 2017. 10. 24 j.h.Seok 추가
			int tempParseYear = Integer.parseInt(year);
			// mng_e 2017. 10. 24 j.h.Seok 추가
			
			//인구, 가구, 주택 조인여부
			// 9월 서비스
			String fusion_query_type = (String) mapParameter.get("fusion_query_type");
			if(fusion_query_type.equals("household_house")) {		//가구, 주택 조인일 경우
				if(year.equals("2015")) {
					
					logger.debug(mapParameter.toString());
					
					mapParameter.put("year1", "2015");
					mapParameter.put("year2", "2015");
					
					result = session.selectList("stats.fusionstatsHouse_2015", mapParameter);
				} 
				// mng_s 2017. 10. 24 j.h.Seok 추가
				else if(tempParseYear > 2015) {
					
					logger.debug(mapParameter.toString());
					
					mapParameter.put("year1", year);
					mapParameter.put("year2", year);
					
					result = session.selectList("stats.fusionstatsHouse_2015_mt", mapParameter);
				}
				// mng_e 2017. 10. 24 j.h.Seok 추가
				else {
					result = session.selectList("stats.fusionstatsHouse", mapParameter);
				}
			} else {
				if(year.equals("2015")) {
					result = session.selectList("stats.fusionstats_2015", mapParameter);
				}
				// mng_s 2017. 10. 24 j.h.Seok 추가
				else if(tempParseYear > 2015) {
					result = session.selectList("stats.fusionstats_2015_mt", mapParameter);
				}
				// mng_e 2017. 10. 24 j.h.Seok 추가
				else {
					result = session.selectList(getQueryStr(), mapParameter);
				}
			}
			
			if(result.size() == 0) {
				if(year.equals("2015")) {
					result = session.selectList("stats.fusionstats_2015", mapParameter);
				}
				// mng_s 2017. 10. 24 j.h.Seok 추가
				else if(tempParseYear > 2015) {
					result = session.selectList("stats.fusionstats_2015_mt", mapParameter);
				}
				// mng_e 2017. 10. 24 j.h.Seok 추가
				else {
					result = session.selectList(getQueryStr(), mapParameter);	
				}
			}
			
			if(result.size()==0){
				throw new NoResultException();
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");

			if (logger.isDebugEnabled()) {
				logger.debug("[ result = " + result + " ]");
			}
		} catch(PersistenceException e){
			logger.error(e);
			throw new DurianSQLException("SQL ERROR");
		} catch (ApiException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
//			throw new ParameterException("입력값을 체크 해 주세요");
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			//2015-12-03 시큐어코딩	
			e.printStackTrace();
			logger.info(StringUtil.getErrMsg()+e);
			
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
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
		// TODO Auto-generated method stub
		return "stats.fusionstats";
	}

	protected void optimizeParameterMap(Map mapParameter) throws ApiException {
		// TODO Auto-generated method stub
		String year = (String) mapParameter.get("year");
		String gender = (String) mapParameter.get("gender");
		String area_type = (String) mapParameter.get("area_type");
		String low_search = (String) mapParameter.get("low_search");
		
		//2016.07.29 9월서비스 권차욱 수정
		String age_from = (String) mapParameter.get("age_from");
		String age_to = (String) mapParameter.get("age_to");
		
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get("bnd_year");
		
		String const_year = (String) mapParameter.get("const_year");
		String house_type_str = (String) mapParameter.get("house_type");
		String bdspace_from = (String) mapParameter.get("bdspace_from");
		String bdspace_to = (String) mapParameter.get("bdspace_to");
		
//		융합 검색조건 여부 population, household, house
//		String type = "population";
//		String search_type[] = mapParameter.get("combine_base").toString().split(",");
//		for(int i =0 ; i<search_type.length ; i ++){
//			if(search_type[i].equals("house")){
//				type="house";
//			}
//		}
//		mapParameter.put("type", type);
		
		//경계년도 체크
		if(bnd_year==null){
			mapParameter.put("bnd_year", Properties.getDefult_bnd_year());
		}else if(!Properties.getBnd_year_list().contains(bnd_year)){
			throw new ApiException("경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//년도 체크
		if(!Properties.getYear_list().contains(year)){
			throw new ApiException("년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//성별 체크
//		if(gender==null){
//			mapParameter.put("gender", "0");
//		}else if(!Properties.getGender_list().contains(gender)){
//			throw new ApiException("성별 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
//		}
		
		//영역 체크
		if(area_type==null){
			area_type="0";
			mapParameter.put("area_type", "0");
		}else if(!Properties.getArea_type_list().contains(area_type)){
			throw new ApiException("영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//하위 경계 체크
		if(low_search==null){
			low_search="0";
			mapParameter.put("low_search", "0");
		}else if(!Properties.getLow_search_list().contains(low_search)){
			throw new ApiException("하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//교육수준
		if(mapParameter.containsKey("edu_level")){
			/*String edu_level = (String) mapParameter.get("edu_level");
			if (!Properties.getEdu_level_list().contains(edu_level)){
				throw new ApiException("교육정도가 정의되지 않은 값 입니다", COMM_ERR_CODE.ERR_PARAM);
			}*/
			String edu_level[] = mapParameter.get("edu_level").toString().split(",");
			mapParameter.put("edu_level", edu_level);
		}
		
		//2016.07.29 9월서비스 권차욱 수정
		//연령정보체크
		if(age_from==null&&age_to==null){
		}else if(age_from==null||age_to==null||!StringUtil.NumberChk(age_from)||!StringUtil.NumberChk(age_to)){
			throw new ApiException("to from 연령정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//결혼 상태 체크
		if(mapParameter.containsKey("mrg_state")){
			String mrg_state[] = mapParameter.get("mrg_state").toString().split(",");
			mapParameter.put("mrg_state", mrg_state);
		}
		
		//세대유형별
		if(mapParameter.containsKey("household_type")){
			String household_type[] = mapParameter.get("household_type").toString().split(",");
			
//			if(household_type.length>3){
//				throw new ApiException("household_type 중복은 3개까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM);
//			}
			
			for(int i=0; i<household_type.length ;i ++){
				if(!Properties.getHousehold_type_list().contains(household_type[i])){
					throw new ApiException("household_type정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM);
				}
			}
			
			mapParameter.put("household_type", household_type);
		}
		
		//점유유형별
		if(mapParameter.containsKey("ocptn_type")){
			String ocptn_type[] = mapParameter.get("ocptn_type").toString().split(",");
			mapParameter.put("ocptn_type", ocptn_type);
		}
		
		//
		if(mapParameter.containsKey("house_area_cd")){
			String house_area_cd[] = mapParameter.get("house_area_cd").toString().split(",");
			mapParameter.put("house_area_cd", house_area_cd);
		}
		
		if(const_year!=null&&!Properties.getConst_year_list().contains(const_year)){
			throw new ApiException("const_year정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		if(bdspace_from==null&&bdspace_to==null){
		}else if(bdspace_from==null||bdspace_to==null||!StringUtil.NumberChk(bdspace_from)||!StringUtil.NumberChk(bdspace_to)){
			throw new ApiException("to from bdspace정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//주택유형별
		if(mapParameter.containsKey("house_type")){
			String house_type[] = mapParameter.get("house_type").toString().split(",");
			
//			if(house_type.length>3){
//				throw new ApiException("house_type 중복은 3개까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM);
//			}
			
			for(int i=0; i<house_type.length ;i ++){
				if(!Properties.getHouse_type_list().contains(house_type[i])){
					throw new ApiException("house_type정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM);
				}
			}
			
			mapParameter.put("house_type", house_type);
		}
		
		//동코드 분할
		if(area_type.equals("0")){
			String adm_cd  = (String) mapParameter.get("adm_cd");
			String sido_cd=null;
			String sgg_cd=null;
			String emdong_cd=null;
			if(adm_cd==null){
				adm_length = "0";
				low_search="1";
				mapParameter.put("low_search", low_search);
//				throw new ApiException("행정동 코드를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
			}else if(adm_cd.length()==2){
				
				if(low_search.equals("0")){
					adm_length="2";
				}else if(low_search.equals("1")){
					adm_length="5";
				}
				
				sido_cd=adm_cd;
			}else if(adm_cd.length()==5){
				
				if(low_search.equals("0")){
					adm_length="5";
				}else if(low_search.equals("1")){
					adm_length="7";
				}
						
				sido_cd=adm_cd.substring(0, 2);
				sgg_cd=adm_cd.substring(2, 5);
			}else if(adm_cd.length()==7){
				
				if(low_search.equals("0")){
					adm_length="7";
				}else if(low_search.equals("1")){
					adm_length="13";
				}
				
				sido_cd=adm_cd.substring(0, 2);
				sgg_cd=adm_cd.substring(2, 5);
				emdong_cd=adm_cd.substring(5, 7);
			}else{
				throw new ApiException("행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}
//			logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd+" "+adm_length+" "+low_search);
			
			mapParameter.put("sido_cd", sido_cd);
			mapParameter.put("sgg_cd", sgg_cd);
			mapParameter.put("emdong_cd", emdong_cd);
			mapParameter.put("adm_length", adm_length);
			
		}else if(area_type.equals("1")){
			userareackeck(mapParameter);
		}
		
	}


	enum MustParam
	{
		year
		,area_type
		,combine_base
	}
	
	enum OptionParam
	{	
		//공통
		adm_cd
		,low_search
		,area
		,bnd_year
		,fusion_query_type
		//인구
		,gender
		
		//2016.07.29 9월서비스 권차욱 수정
		,age_from
		,age_to
		
		,edu_level
		,mrg_state
		//가구
		,household_type
		,ocptn_type
		//주택
		,house_type
		,const_year
		,bdspace_from
		,bdspace_to
		,house_area_cd
		,house_use_prid_cd
	}
}
