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

/**
* 주택 통계 API
* 통계청 센서스의 주택에 대한 통계를 제공하기 위한 API
* <pre>
* input : house.json/xml
* output : json/xml
* Table : SRV_PT_HOUSECENSUS
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

public class House extends AbsQuery<List>{
	private static final Log logger = LogFactory.getLog(House.class);
	
	//======================================================================//
	//2016.10.25 연면적 추가
	private Map<String, Map<String, String>> houseAreaCodeMap;

	public Map< String, Map< String, String > > getHouseAreaCodeMap()
	{
		HashMap map = new HashMap<String, Map<String,String>>();
		map.putAll(houseAreaCodeMap);
		return map;
	}
	
	public void setHouseAreaCodeMap( Map< String, Map< String, String > > houseAreaCodeMap )
	{
		this.houseAreaCodeMap = new HashMap<String, Map< String, String >>();
		this.houseAreaCodeMap.putAll(houseAreaCodeMap);
	}
	//======================================================================//
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "4006";
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
		
			String strPercent;
			Map<String, Object> mapCurrTemp = null;
			
			// 9월 서비스
			String year = (String) mapParameter.get("year");
			if(year.equals("2015")) {
				mapCurrTemp = (Map) session.selectOne("stats.house_2015", mapParameter);
			} else {
				mapCurrTemp = (Map) session.selectOne(getQueryStr(), mapParameter);
			}
			
			
			if(mapCurrTemp==null||mapCurrTemp.size()==0){
				throw new NoResultException();
			}
			StatUtil.setPercent( "house_cnt"
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
		//String house_type = (String) mapParameter.get("house_type");
		String const_year = (String) mapParameter.get("const_year");
		String bdspace_from = (String) mapParameter.get("bdspace_from");
		String bdspace_to = (String) mapParameter.get("bdspace_to");
		String adm_length = "7";
		String bnd_year = (String) mapParameter.get("bnd_year");
		
		// 9월 서비스
		String house_area_cd = (String) mapParameter.get("house_area_cd");
		String house_use_prid_cd = (String) mapParameter.get("house_use_prid_cd");
		
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
		
		if(const_year!=null&&!Properties.getConst_year_list().contains(const_year)){
			throw new ApiException("const_year정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		if(bdspace_from==null&&bdspace_to==null){
		}else if(bdspace_from==null||bdspace_to==null||!StringUtil.NumberChk(bdspace_from)||!StringUtil.NumberChk(bdspace_to)){
			throw new ApiException("to from bdspace정보를 입력해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		// 9월 서비스
		//2016.10.25 주석처리
		/*if(house_area_cd!=null&&!Properties.getHouse_area_cd_list().contains(house_area_cd)){
			throw new ApiException("주택면적코드 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}*/
		
		//======================================================================//
		//2016.10.25 연면적오류 처리
		if( Integer.valueOf(year) > 2010)
		{
			if( mapParameter.containsKey(OptionParam.house_area_cd.name()) )
			{
				String house_area_str = mapParameter.get("house_area_cd").toString();
				String house_area_cd_list[] = house_area_str.split(",");
				mapParameter.put( "house_area_cd", house_area_cd_list );
			}
		}else {
			if( mapParameter.containsKey(OptionParam.house_area_cd.name()) )
			{
				String house_area_param = null;
				String house_area_str = mapParameter.get("house_area_cd").toString();
				String house_area_cd_list[] = house_area_str.split(",");
				List tmp_list = new ArrayList< String >();
				for(int i = 0; i < house_area_cd_list.length; i ++){
					Map<String, String> tmp = houseAreaCodeMap.get(house_area_cd_list[i]);
					
					if(house_area_cd_list.length == 1){
						house_area_param = "house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to");
					}else if(i==0){
						house_area_param = "((house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to") + ")";
					}else if(i==house_area_cd_list.length-1){
						house_area_param = house_area_param + " or (house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to") + "))";
					}else{
						house_area_param = house_area_param + " or (house.rd_bdspace_mm >= " + tmp.get("from") + " and house.rd_bdspace_mm <= " + tmp.get("to") + ")";
					}
				}
				mapParameter.put( "house_area_param", house_area_param );
			}
		}
		//======================================================================//
		
		if(house_use_prid_cd!=null&&!Properties.getHouse_use_prid_cd_list().contains(house_use_prid_cd)){
			throw new ApiException("주택사용기간코드 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		
		
		
		if(mapParameter.containsKey("house_type")){
			String house_type_str = mapParameter.get("house_type").toString();
			
			String house_type[] = house_type_str.split(",");
			
			if(house_type.length>3){
				throw new ApiException("house_type 중복은 3개까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM);
			}
			//주택 외 거주시설 병합 요청으로 06요청을 받았을 시 코드값을 늘림
			if(house_type_str.contains("06")){
				house_type_str= house_type_str.replaceAll("06", "06,07,08,09,10,99");
			}
			house_type = house_type_str.split(",");
			
			for(int i=0; i<house_type.length ;i ++){
				if(!Properties.getHouse_type_list().contains(house_type[i])){
					throw new ApiException("house_type정보를 확인하세요", COMM_ERR_CODE.ERR_PARAM);
				}
			}
			
			mapParameter.put("house_type", house_type);
		}
		
		if(!mapParameter.containsKey("const_year")&&!mapParameter.containsKey("bdspace_from")&&!mapParameter.containsKey("bdspace_to")&&!mapParameter.containsKey("house_type")){
			mapParameter.put("search_type", "Y");
		}
		
		//동코드 분할
		if(area_type.equals("0")){
			String adm_cd  = (String) mapParameter.get("adm_cd");
			String sido_cd=null;
			String sgg_cd=null;
			String emdong_cd=null;
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
			}else{
				throw new ApiException("행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}
//			logger.info(sido_cd+" "+sgg_cd+" "+emdong_cd);
			mapParameter.put("sido_cd", sido_cd);
			mapParameter.put("sgg_cd", sgg_cd);
			mapParameter.put("emdong_cd", emdong_cd);
			mapParameter.put("adm_length", adm_length);
		}else if(area_type.equals("1")){
			String area = (String) mapParameter.get("area");
			if(area == null){
				throw new ApiException("좌표데이터를 입력하세요", COMM_ERR_CODE.ERR_PARAM);
			}
			String area_kind = null;
			String round = null;
			if(area.toUpperCase().contains("CIRCLE")){
				area_kind="POINT";
				area = area.toUpperCase().replace("CIRCLE(", "");
				area = area.replace(")", "");
				
				String circle_list[] = area.split(",");
				
				mapParameter.put("round", circle_list[1]);
				mapParameter.put("area","POINT("+circle_list[0]+")");
			}else if(area.toUpperCase().contains("RECTANGLE")){
				area_kind="RECTANGLE";
			}else if(area.toUpperCase().contains("POLYGON")){
				area_kind="POLYGON";
			}else{
				throw new ApiException("좌표데이터를 입력하세요", COMM_ERR_CODE.ERR_PARAM);
			}
			mapParameter.put("area_kind", area_kind);
		}
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return "stats.house";
	}
	
	enum MustParam
	{
		year
		,area_type
	}
	
	enum OptionParam
	{	
		//accessToken
		adm_cd
		,low_search
		,area
		,house_type
		,const_year
		,bdspace_from
		,bdspace_to
		,bnd_year
		,house_area_cd
		,house_use_prid_cd
	}

}
