package kostat.sop.ServiceAPI.api.stats;

import java.util.ArrayList;
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

/**
* 가구 통계 API
* 통계청 센서스의 가구 통계를 제공하기 위한 API
* <pre>
* input : household.json/xml
* output : json/xml
* Table : SRV_PT_FAMILYCENSUS
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

public class Household extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(Household.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "4005";
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

		List result = null;

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			optimizeParameterMap(mapParameter);
			
			String strFormat =_getViewType(req,res);
			
			if(strFormat.equals("geojson")||strFormat.equals("kml")){
				throw new NotSupportFormatException("Not Support Format[" + strFormat + "]");
			}
			
			result = new ArrayList();			
			String strPercent;
			
			Map<String, Object> mapCurrTemp = null;
			mapCurrTemp = (Map) session.selectOne(getQueryStr(), mapParameter);
			
			if(mapCurrTemp==null||mapCurrTemp.size()==0){
				throw new NoResultException();
			}
			
			StatUtil.setPercent( "household_cnt"
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
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
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

	protected void optimizeParameterMap(Map mapParameter) throws ApiException {
		// TODO Auto-generated method stub
		String year = (String) mapParameter.get("year");
		String area_type = (String) mapParameter.get("area_type");
		String room_cnt_from = (String) mapParameter.get("room_cnt_from");
		String room_cnt_to = (String) mapParameter.get("room_cnt_to");
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
		
		//영역 체크
		if(area_type==null){
			area_type="0";
			mapParameter.put("area_type", "0");
		}else if(!Properties.getArea_type_list().contains(area_type)){
			throw new ApiException("영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		
		if(room_cnt_from==null&&room_cnt_to==null){
		}else if(room_cnt_from==null||room_cnt_to==null||!StringUtil.NumberChk(room_cnt_from)||!StringUtil.NumberChk(room_cnt_to)){
			throw new ApiException("to from room정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		
		if(mapParameter.containsKey("household_type")){
			String household_type[] = mapParameter.get("household_type").toString().split(",");
			
			if(household_type.length>3){
				throw new ApiException("household_type 중복은 3개까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM);
			}
			
			for(int i=0; i<household_type.length ;i ++){
				if(!Properties.getHousehold_type_list().contains(household_type[i])){
					throw new ApiException("household_type정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM);
				}
			}
			
			mapParameter.put("household_type", household_type);
		}
		
		if(mapParameter.containsKey("ocptn_type")){
			String ocptn_type[] = mapParameter.get("ocptn_type").toString().split(",");
			mapParameter.put("ocptn_type", ocptn_type);
		}
		
		//동코드 분할
		String adm_cd  = (String) mapParameter.get("adm_cd");
		String sido_cd=null;
		String sgg_cd=null;
		String emdong_cd=null;
		String tot_reg_cd=null;
		
		if(adm_cd==null){
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
		}else if(adm_cd.length()==13){
			
			adm_length="13";
			sido_cd=adm_cd.substring(0, 2);
			sgg_cd=adm_cd.substring(2, 5);
			emdong_cd=adm_cd.substring(5, 7);
			tot_reg_cd=adm_cd.substring(0, 13);
		}else{
			throw new ApiException("행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
//		logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
		mapParameter.put("sido_cd", sido_cd);
		mapParameter.put("sgg_cd", sgg_cd);
		mapParameter.put("emdong_cd", emdong_cd);
		mapParameter.put("tot_reg_cd", tot_reg_cd);
		mapParameter.put("adm_length", adm_length);
		
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return "stats.household";
	}
	
	enum MustParam
	{
		year
		,area_type
	}
	
	enum OptionParam
	{	
		adm_cd
		,low_search
		,area
		,household_type
		,ocptn_type
		,room_cnt_from
		,room_cnt_to
		//,accessToken
		,bnd_year
	}

}
