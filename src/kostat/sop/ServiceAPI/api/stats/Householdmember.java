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
import kostat.sop.ServiceAPI.common.util.StatUtil;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 가구원 통계 API
* 농가,임가, 해수면어가, 내수면어가의 가구원 통계를 제공하기 위한 API
* <pre>
* input : householdmember.json/xml
* output : json/xml
* Table : SRV_DT_NONGIMOGACENSUSFAMILY
* </pre>
*
* <pre>
* <b>History:</b> 
* 심홍헌, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 심홍헌
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Householdmember extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(Householdmember.class);
	

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "4010";
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
			StatUtil.setPercent( "population"
					   , Integer.parseInt((String)mapParameter.get("adm_length"))
					   , mapCurrTemp);

			if(mapCurrTemp.containsKey("bottom") == false){
				throw new NoResultException();
			}

			Map<String, Object> mapadmnm = (Map)session.selectOne("admnm", mapParameter);
			
			StatUtil.setAdmNM(mapadmnm, mapParameter, mapCurrTemp);

			result.add(mapCurrTemp);
			
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
			throw new ApiException("입력값을 체크 해 주세요.",COMM_ERR_CODE.ERR_PARAM);
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg(),COMM_ERR_CODE.EXECUTE_FAILE);
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
		String age_from = (String) mapParameter.get("age_from");
		String age_to = (String) mapParameter.get("age_to");
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
		
		
		//연령정보체크
		if(age_from==null&&age_to==null){
		}else if(age_from==null||age_to==null||!StringUtil.NumberChk(age_from)||!StringUtil.NumberChk(age_to)){
			throw new ApiException("to from 연령정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//동코드 분할
		if(area_type.equals("0")){
			String adm_cd  = (String) mapParameter.get("adm_cd");
			String sido_cd=null;
			String sgg_cd=null;
			String emdong_cd=null;
			if (adm_cd == null) {
				adm_length = "0";
			}else if(adm_cd.length()==2){
				
				adm_length="2";
				sido_cd=adm_cd;
			}else if(adm_cd.length()==5){
				
				adm_length="5";
						
				sido_cd=adm_cd.substring(0, 2);
				sgg_cd=adm_cd.substring(2, 5);
			}else if(adm_cd.length()==7){
				
				adm_length="7";
				
				sido_cd=adm_cd.substring(0, 2);
				sgg_cd=adm_cd.substring(2, 5);
				emdong_cd=adm_cd.substring(5, 7);
			}else{
				throw new ApiException("행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}
//					logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
			mapParameter.put("sido_cd", sido_cd);
			mapParameter.put("sgg_cd", sgg_cd);
			mapParameter.put("emdong_cd", emdong_cd);
			mapParameter.put("adm_length", adm_length);
		}else if(area_type.equals("1")){
			userareackeck(mapParameter);
		}
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return "stats.householdmember";
	}

	enum MustParam
	{
		year
		,area_type
		,data_type
	}
	
	enum OptionParam
	{	
		adm_cd
		,low_search
		,area
		,age_from
		,age_to
		,gender
		//,accessToken
		,bnd_year
	}
}
