package kostat.sop.ServiceAPI.api.house;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 추천지역리스트 가져오기 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2015/11/10  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */
public class RecommendAreaLists extends AbsQuery<List<?>> {
	private static final Log logger = LogFactory.getLog(RecommendAreaLists.class);
	@Override
	public String getApiId() {
		return "100202";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		now_resid_sido_cd,//기준지역 시도
		now_resid_sgg_cd,//기준지역 시군구
		inter_resid_sido_cd,//관심지역 시도
		inter_resid_sgg_cd,//관심지역 시군구
		importance_cd,//중요도 코드 지표중분류
		importance_val,//중요도 값(1 : 하,2 : 중,3 : 상)
		base_year,//지도 년도
		importance_asis_val,//기준지역 가중치 값(1 : 하,2 : 중,3 : 상)
		importance_search_val,//정렬기준(3:높음 , 1:낮음)
		importance_disp_lev//지표데이터의 데이터기준(1:시도, 2:시군구, 3:읍면동)
	}
	
	enum OptionParam
	{
	}

	@Override
	public List<?> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();
		
		List<?> result = null;
		List<?> recmdAreaList = null;
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String importance_cd = (String) mapParameter.get(MustParam.importance_cd.name());
			String importance_val = (String) mapParameter.get(MustParam.importance_val.name());
			String importance_asis_val = (String) mapParameter.get(MustParam.importance_asis_val.name());
			String importance_search_val = (String) mapParameter.get(MustParam.importance_search_val.name());
			String importance_disp_lev = (String) mapParameter.get(MustParam.importance_disp_lev.name());
			
			String[] importance_cd_split = importance_cd.split(",");
			String[] importance_val_split = importance_val.split(",");
			String[] importance_asis_val_split = importance_asis_val.split(",");
			String[] importance_search_val_split = importance_search_val.split(",");
			String[] importance_disp_lev_split = importance_disp_lev.split(",");
			
			if(importance_cd_split.length < 1) {
				throw new ApiException("중요도 설정을 하나이상 해주세요.");
			}
			Random random = new Random();
			long curTime = System.currentTimeMillis();
			long randomCurTime = curTime+(random.nextInt(100)+random.nextInt(150)+random.nextInt(300))*random.nextInt(100);
			
			String slctn_id = "SLCT_" + randomCurTime;
			String usr_info_id = "USRI_" + randomCurTime;
			
			mapParameter.put("slctn_id", slctn_id);
			mapParameter.put("usr_info_id", usr_info_id);
			
			session.insert("house.recmdAreaSlctnRegist", mapParameter);
			
			for(int i = 0; i < importance_cd_split.length; i++){
				String cnt = (i+1)+"";
				if(i+1 < 10){
					cnt = "0"+cnt;
				}
				String wghtval_id = "WVAL_"+cnt+"_" + randomCurTime;
				mapParameter.put("wghtval_id", wghtval_id);
				mapParameter.put("ix_id", importance_cd_split[i]);
				mapParameter.put("wghtval", importance_asis_val_split[i]);
				mapParameter.put("wghtval_inter", importance_val_split[i]);
				mapParameter.put("search_base", importance_search_val_split[i]);
				session.insert("house.indexWghtvalRegist", mapParameter);
			}
			//지표데이터 기준에 따른 목록 기준 선택
			String dispLev = "1";
			int tempCnt = 0;
			while(tempCnt < importance_disp_lev_split.length){
				if("3".equals(importance_disp_lev_split[tempCnt])){
					dispLev = importance_disp_lev_split[tempCnt];
					break;
				}
				tempCnt++;
			}
			mapParameter.put("searchDispLev",dispLev);
			mapParameter.put("max_order_no", session.selectOne("house.getMaxOrder"));
			recmdAreaList = (List<?>) session.selectList("house.recmdAreaLists", mapParameter);
			
			for(int i = 0; i < recmdAreaList.size(); i++) {
				Map<String,Object> tempMap = (Map<String,Object>)recmdAreaList.get(i);
				String sum_wghtval = String.valueOf(tempMap.get("sum_wghtval"));
				String sido_cd = (String)tempMap.get("sido_cd");
				String sgg_cd = (String)tempMap.get("sgg_cd");
				String sido_nm = (String)tempMap.get("sido_nm");
				String sgg_nm = (String)tempMap.get("sgg_nm");
				String emdong_cd = "";
				String emdong_nm = "";
				if("3".equals(dispLev)){
					emdong_cd = (String)tempMap.get("emdong_cd");
					emdong_nm = (String)tempMap.get("emdong_nm");
				}
				String recmd_region_nm = sido_nm + " " + sgg_nm + " " + emdong_nm;
				
				int recmd_region_order = i+1;
				String cnt = recmd_region_order+"";
				if(recmd_region_order < 10){
					cnt = "0"+cnt;
				}
				String list_id = "LIST_"+cnt+"_" + randomCurTime;
				
				Map<String,Object> tempParam = new HashMap<String,Object>();
				tempParam.put("list_id", list_id);
				tempParam.put("slctn_id", slctn_id);
				tempParam.put("usr_info_id", usr_info_id);
				tempParam.put("sido_cd", sido_cd);
				tempParam.put("sgg_cd", sgg_cd);
				tempParam.put("emdong_cd", emdong_cd);
				tempParam.put("recmd_region_nm", recmd_region_nm);
				tempParam.put("wghtval_avg", sum_wghtval);
				tempParam.put("recmd_region_order", recmd_region_order);
				
				session.insert("house.recmdAreaListRegist", tempParam);
			}	

			result = (List<?>) session.selectList("house.recmdAreaResultLists", mapParameter);
			session.delete("house.deleteIxWghtval",mapParameter);
			session.delete("house.deleteRecomendAreaList",mapParameter);
			session.delete("house.deleteRecomendAreaSlctn",mapParameter);
			
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
		return result;
	}
}