package kostat.sop.ServiceAPI.api.technicalBiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TechnicalBizMapService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetAreaFilterSearch extends AbsQuery<List>{

	private static final Log logger = LogFactory.getLog(GetAreaFilterSearch.class);

	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	/*
	 * techbiz_m_class_cd,lq_base_region 지역찾기시 사용
	 * 
	 * sido_cd,sgg_cd 들어오면 전국 시군구 조회
	 * sido_cd,sgg_cd 없으면 지역찾기  
	 * */
	enum MustParam {
		admCodeArray,
		
		base_year
		,base_region
		,ppltn
		,areaStat
		,areaPrice
		,financial
	}
	
	enum OptionParam {
		techCd,
		
		fromPpltn,
		toPpltn,
		
		fromAreaStat,
		toAreaStat,
		
		fromAreaPrice,
		toAreaPrice,
		
		fromFinancial,
		toFinancial
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100651";
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String arg2) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		/*HashMap<String,Object> result =  new HashMap<String,Object>();*/
		List returnList = new ArrayList();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String [] amdCdArray = ((String)mapParameter.get("admCodeArray")).split(",");
			Map paramMap = new HashMap();
			String base_year = mapParameter.get("base_year").toString();
			paramMap.put("base_year",base_year);
			paramMap.put("techCd",mapParameter.get("techCd").toString());
			
			
			
			paramMap.put("base_region", mapParameter.get("base_region").toString());
			if(mapParameter.get("ppltn").toString().equals("true")){
				paramMap.put("ppltn" , true);
				paramMap.put("fromPpltn" , mapParameter.get("fromPpltn").toString());
				paramMap.put("toPpltn" , mapParameter.get("toPpltn").toString());
				//fromPpltn,
				//toPpltn,
			}else{
				paramMap.put("ppltn" , false);
			}
			
			if(mapParameter.get("areaStat").toString().equals("true")){
				paramMap.put("areaStat" , true);
				paramMap.put("fromAreaStat" , mapParameter.get("fromAreaStat").toString());
				paramMap.put("toAreaStat" , mapParameter.get("toAreaStat").toString());
				
			}else{
				paramMap.put("areaStat" , false);
			}
			
			if(mapParameter.get("areaPrice").toString().equals("true")){
				paramMap.put("areaPrice" , true);
				paramMap.put("fromAreaPrice" , mapParameter.get("fromAreaPrice").toString());
				paramMap.put("toAreaPrice" , mapParameter.get("toAreaPrice").toString());
			}else{
				paramMap.put("areaPrice" , false);
			}
			
			if(mapParameter.get("financial").toString().equals("true")){
				paramMap.put("financial" , true);
				paramMap.put("fromFinancial" , mapParameter.get("fromFinancial").toString());
				paramMap.put("toFinancial" , mapParameter.get("toFinancial").toString());
			}else{
				paramMap.put("financial" , false);
			}
			
			 
			/*String techCdString = mapParameter.get("techCd").toString();
			JSONParser parser = new JSONParser();
			JSONObject techCdObject = (JSONObject) parser.parse(techCdString); 
			
			Set<String> admKeySet = techCdObject.keySet();
			List filterResult = technicalBizMapService.selectFilterSerch(paramMap);
			
			for(String admKey : admKeySet){
				JSONArray techCdArray = (JSONArray)parser.parse(techCdObject.get(admKey).toString());
				for(int i = 0; i < filterResult.size(); i++){
					Map resultMap = (Map)filterResult.get(i);
					String admCd = resultMap.get("sido_cd").toString() + resultMap.get("sgg_cd").toString();
					String admTechCd = resultMap.get("techbiz_m_class_cd").toString();
					
					if(admKey.equals(admCd)){
						for(int j = 0; j < techCdArray.size() ; j++){
							if(techCdArray.get(j).toString().equals(admTechCd)){
								//
							}
							
						}
					}
				}
						
			}*/
			
			
			List filterResult = technicalBizMapService.selectFilterSerch(paramMap);

			if(filterResult.size() > 0){
				for(int i = 0; i < filterResult.size(); i++){
					Map resultMap = (Map)filterResult.get(i);
					String admCd = resultMap.get("sido_cd").toString() + resultMap.get("sgg_cd").toString();
					
					for(int j = 0; j < amdCdArray.length; j++){
						//System.out.println(admCd + " :: " + amdCdArray[j]); //2017.12.04 [개발팀] 시큐어코딩
						if(admCd.equals(amdCdArray[j])){
							returnList.add(resultMap);
						}
					}
				}
			}
			
			
			//selectFilterSerch
			/*for(int i = 0; i < amdCdArray.length ; i++){
				List filterResult = new ArrayList();
				String adm_cd = amdCdArray[i];
				paramMap.put("adm_cd",adm_cd);
				System.out.println(paramMap);
				filterResult = technicalBizMapService.selectFilterSerch(paramMap);
				
				if(filterResult.size() > 0){ 
					returnList.add(filterResult.get(0));
				}
			}*/
			
			//System.out.println("============ 7 =============="); //2017.12.04 [개발팀] 시큐어코딩
			/*String tempTechClassCd = (String) mapParameter.get(OptionParam.techbiz_class_cd.name());
			
			if(tempTechClassCd != null && !tempTechClassCd.isEmpty()) {
				if(tempTechClassCd.length() < 1 || tempTechClassCd.length() > 3) {
					throw new ApiException("기술업종 코드값을 확인해 주세요.");
				} else {
					mapParameter.put("techbiz_cd_div", tempTechClassCd.length());
				}
			}
			
			result.put("featureData", technicalBizMapService.selectFindRegionSggIrds(mapParameter));*/
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return returnList;
	}
	
}
