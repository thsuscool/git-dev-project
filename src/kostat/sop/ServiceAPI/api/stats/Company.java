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
* 사업체 통계 API
* 통계청 센서스 정보중 사업체 통계를 조회하기 위한 API
* <pre>
* input : company.json/xml
* output : json/xml
* Table : SRV_PG_CORPCENSUS
* </pre>
* <pre>
* <b>History:</b> 
* 심홍헌, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 심홍헌
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Company extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(Company.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "4004";
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

			result = new ArrayList();
			String strPercent;
			Map<String, Object> mapCurrTemp = null;

			mapCurrTemp = (Map) session.selectOne(getQueryStr(), mapParameter);
			
			Map<String, Object> mapadmnm = (Map)session.selectOne("admnm", mapParameter);
			resultkind[] arrResultKind = resultkind.values();
			for(int i=0; i < arrResultKind.length; i++){
				
				StatUtil.setPercentByNM( arrResultKind[i].name()
								       , Integer.parseInt((String)mapParameter.get("adm_length"))
								       , mapadmnm
								       , mapCurrTemp);

			}
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
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info(StringUtil.getErrMsg()+e);
			throw new DurianSQLException("SQL ERROR");
		} catch (ApiException e) {
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info(StringUtil.getErrMsg()+e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요",COMM_ERR_CODE.ERR_PARAM);
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
		String class_code = (String) mapParameter.get(OptionParam.class_code.name());
		String code_length = null;
		String year = (String) mapParameter.get("year");
		String area_type = (String) mapParameter.get("area_type");
		String low_search = (String) mapParameter.get("low_search");
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get("bnd_year");
		String class_deg = (String) mapParameter.get("class_deg");
		
		//경계년도 체크
		if(bnd_year==null){
			mapParameter.put("bnd_year", Properties.getDefult_bnd_year());
		}else if(!Properties.getBnd_year_list().contains(bnd_year)){
			throw new ApiException("경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		//년도 체크
		if(!Properties.getCompany_year_list().contains(year)){
//		if(!year_list.contains(year)){
			throw new ApiException("년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		
		//영역 체크
		if(area_type==null){
			area_type="0";
			mapParameter.put("area_type", "0");
		}else if(!Properties.getArea_type_list().contains(area_type)){
			throw new ApiException("영역검색 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		/*
		//하위 경계 체크
		if(low_search==null){
			low_search="0";
			mapParameter.put("low_search", low_search);
		}else if(!Properties.getLow_search_list().contains(low_search)){
			throw new ApiException("하위통계정보 유무를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		*/
		mapParameter.put("low_search", "0");
		
		//산업체 분류 차수
		if(class_deg==null){
			mapParameter.put("class_deg", "9");
		}else if(!class_deg.equals("9")&&!class_deg.equals("8")){
			throw new ApiException("산업체 분류코드 차수는 8,9차 입니다", COMM_ERR_CODE.ERR_PARAM);
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
		
		if (class_code==null){
		}else if(class_code!=null&&class_code.length()==1){
			String ksic1 = class_code;
			code_length = String.valueOf(class_code.length());
			mapParameter.put("ksic1", ksic1);
			mapParameter.put("code_length", code_length);
		}else if(class_code!=null&&class_code.length()>=3&&class_code.length()<=6){
			String ksic1 = class_code.substring(0, 1);
			String ksic5 = class_code.substring(1, class_code.length());
			code_length = String.valueOf(class_code.length());
			mapParameter.put("ksic1", ksic1);
			mapParameter.put("ksic5", ksic5);
			mapParameter.put("code_length", code_length);
		}else{
			throw new ApiException("코드 값을 다시입력하세요", COMM_ERR_CODE.ERR_PARAM);
		}
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return "stats.company";
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
		,class_code
		,accessToken
		,bnd_year
		,theme_cd
		,class_deg
	}
	
	enum resultkind
	{
		worker,
		corp
	}
	
}
