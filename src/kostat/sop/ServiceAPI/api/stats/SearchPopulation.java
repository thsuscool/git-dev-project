package kostat.sop.ServiceAPI.api.stats;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StatUtil;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class SearchPopulation extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(SearchPopulation.class);
	

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "4002";
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

			String strFormat =_getViewType(req,res);
			
			if(!(strFormat.equals("json")||strFormat.equals("xml"))){
				throw new NotSupportFormatException("Not Support Format[" + strFormat + "]");
			}
			
			
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			optimizeParameterMap(mapParameter);
			
			String strPercent;
			Map<String, Object> mapCurrTemp = null;

			mapCurrTemp = (Map) session.selectOne(getQueryStr(), mapParameter);
			
			if(mapCurrTemp==null||mapCurrTemp.size()==0){
				throw new NoResultException();
			}
			
			StatUtil.setPercent( "population"
							   , Integer.parseInt((String)mapParameter.get("adm_length"))
							   , mapCurrTemp);

			if(mapCurrTemp.containsKey("bottom") == false){
				throw new NoResultException();
			}
			

			Map<String, Object> mapadmnm = (Map)session.selectOne("admnm", mapParameter);
			
			StatUtil.setAdmNM(mapadmnm, mapParameter, mapCurrTemp);
			
			result.add(mapCurrTemp);
			
			

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
			logger.error(e);
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

	protected void optimizeParameterMap(Map mapParameter) throws ApiException {
		// TODO Auto-generated method stub
		String year = (String) mapParameter.get("year");
		String gender = (String) mapParameter.get("gender");
		String area_type = (String) mapParameter.get("area_type");
		String low_search = (String) mapParameter.get("low_search");
		
		//2016.07.29 9월서비스 권차욱 수정
		String age_from = (String) mapParameter.get("age_from");
		String age_to = (String) mapParameter.get("age_to");
		
		String hhadm_length = "2";
		String hadm_length = "5";
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get("bnd_year");
		
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
		if(gender==null){
			mapParameter.put("gender", "0");
		}else if(!Properties.getGender_list().contains(gender)){
			throw new ApiException("성별 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//영역 체크
		if(area_type==null){
			area_type="0";
			mapParameter.put("area_type", "0");
		}else if(!Properties.getArea_type_list().contains(area_type)){
			throw new ApiException("영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//교육수준
		if(mapParameter.containsKey("edu_level")){
			/*String edu_level = (String) mapParameter.get("edu_level");
			if(edu_level.length()==2){
				String study_level = edu_level.substring(1, 2);
				edu_level = edu_level.substring(0, 1);
				if (!Properties.getStudy_level_list().contains(study_level)||!Properties.getEdu_level_list().contains(edu_level)){
					throw new ApiException("교육정도가 정의되지 않은 값 입니다", COMM_ERR_CODE.ERR_PARAM);
				}
			}else if(edu_level.length()==1){
				if (!Properties.getEdu_level_list().contains(edu_level)){
					throw new ApiException("교육정도가 정의되지 않은 값 입니다", COMM_ERR_CODE.ERR_PARAM);
				}
			}else{
				throw new ApiException("교육정도는 두자리만 가능합니다", COMM_ERR_CODE.ERR_PARAM);
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
		
		//동코드 분할
		String adm_cd  = (String) mapParameter.get("adm_cd");
		String sido_cd=null;
		String sgg_cd=null;
		String emdong_cd=null;
		String tot_reg_cd=null;	// 집계구 코드 추가
		if(adm_cd==null){
			throw new ApiException("행정동 코드를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
		}else if(adm_cd.length()==2){
			
			adm_length="2";
			
			sido_cd=adm_cd;
		}else if(adm_cd.length()==5){
			
			hadm_length="2"; 
			adm_length="5";
					
			sido_cd=adm_cd.substring(0, 2);
			sgg_cd=adm_cd.substring(2, 5);
			
		}else if(adm_cd.length()==7){

			hhadm_length="2"; 
			hadm_length="5"; 
			adm_length="7";
			
			sido_cd=adm_cd.substring(0, 2);
			sgg_cd=adm_cd.substring(2, 5);
			emdong_cd=adm_cd.substring(5, 7);

		}else if(adm_cd.length()==13){

			hhadm_length="5"; 
			hadm_length="7"; 
			adm_length="13";
			
			sido_cd=adm_cd.substring(0, 2);
			sgg_cd=adm_cd.substring(2, 5);
			emdong_cd=adm_cd.substring(5, 7);
			tot_reg_cd=adm_cd.substring(0, 13);
		}else{
			throw new ApiException("행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		//logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
		//logger.info("adm_length :"+adm_length);
		mapParameter.put("sido_cd", sido_cd);
		mapParameter.put("sgg_cd", sgg_cd);
		mapParameter.put("emdong_cd", emdong_cd);
		mapParameter.put("tot_reg_cd", tot_reg_cd);
		mapParameter.put("adm_length", adm_length);
		
	}
	
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return "stats.searchpopulation";
//		return "stats.population";
	}
	
	enum MustParam
	{
		year
		,area_type
	}
	
	enum OptionParam
	{	
		adm_cd
		,gender
		,low_search
		,area
		
		//2016.07.29 9월서비스 권차욱 수정
		,age_from
		,age_to

		,edu_level
		,mrg_state
		,religion_type
		//,accessToken
		,bnd_year
	}
	
	enum AdmType
	{
		sido,
		sgg,
		emdong,
		tot_reg
	}

}
