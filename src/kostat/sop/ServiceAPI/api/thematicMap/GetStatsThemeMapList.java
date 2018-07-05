package kostat.sop.ServiceAPI.api.thematicMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 1. 기능 : 통계주제도 테이블에 데이터를 조회한다.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 * dmd
 *  <b>History:</b> 
 *     작성자 : 윤지혜, 1.0, 2014/10/06  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 윤지혜
 * @version 1.0
 * @see <p/>
 */
public class GetStatsThemeMapList extends AbsQuery<Map> {
	private static final Log logger = LogFactory
			.getLog(GetStatsThemeMapList.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9002";
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

	enum MustParam {
		
	}

	enum OptionParam {
		cate_id, manager_id, stat_thema_map_id, title, article_div, resultCnt, p , categoryList
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map mapParameter = getParameterMap(req);

		_checkNullParameterValue(mapParameter);
		
		
		Map resultData = new HashMap();
		
		Map map = new HashMap();
		List countList = new ArrayList();
		List categoryList = new ArrayList();
		JSONArray jsonArray = new JSONArray();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			if(mapParameter.get("categoryList") != null){
				String jsonParam = (String) mapParameter.get("categoryList");
				
				JSONParser parser = new JSONParser();
				jsonArray = (JSONArray) parser.parse(jsonParam);				
			}
		
			
			
			//cate_id를 넣고 해당 카타로그 리스트를 받고 싶은경우
			if (mapParameter.containsKey("cate_id")) {
				int themeMapInfoListCount = (Integer) session.selectOne(
						"thematicMap.select.statsMapListCount", mapParameter);

				// 전체 조회 갯수
				resultData.put("themeMapInfoListCount", themeMapInfoListCount);

				// 현재 요청된 데이터의 페이지
				if (!mapParameter.containsKey("p")) {
					resultData.put("currentPage", 1);
					resultData.put("returnOnlyPage", true);
				}else {
					resultData.put("currentPage",
							Integer.parseInt(mapParameter.get("p").toString()) + 1);
					int p = Integer.valueOf(mapParameter.get("p").toString())
							* Integer.valueOf(mapParameter.get("resultCnt")
									.toString()) + 1;
					mapParameter.put("p", p);
				}

				List themeMapInfoList = (List) session.selectList("thematicMap.select.statsMapList", mapParameter);
				resultData.put("themeMapInfoList", themeMapInfoList);
				resultData.put("category", (String) mapParameter.get(OptionParam.cate_id.name()));
				
				
				
			}else{
				if (!mapParameter.containsKey("p")) {
					// 처음 페이지 만들 경우
					
				
					for(int i=0;i<jsonArray.size();i++){
						map = (Map)jsonArray.get(i);
						String param = (String)map.get("thema_map_category");
						
						mapParameter.put("cate_id", param);
						
						int themeMapInfoListCount = (Integer) session.selectOne("thematicMap.select.statsMapListCount", mapParameter);
						countList.add(themeMapInfoListCount);
						categoryList.add(param);						
					}
					resultData.put("count", countList);
					resultData.put("categoryList", categoryList);
					resultData.put("currentPage", 1);
					resultData.put("returnOnlyPage", true);
				} else {
					// 다른 페이지를 눌렀을경우
					resultData.put("currentPage",Integer.parseInt(mapParameter.get("p").toString()) + 1);
					int p = Integer.valueOf(mapParameter.get("p").toString())
							* Integer.valueOf(mapParameter.get("resultCnt").toString()) + 1;
					mapParameter.put("p", p);
					
					for(int i=0;i<jsonArray.size();i++){
						map = (Map)jsonArray.get(i);
						String param = (String)map.get("thema_map_category");
						
						mapParameter.put("cate_id", param);
						
						int themeMapInfoListCount = (Integer) session.selectOne("thematicMap.select.statsMapListCount", mapParameter);
						countList.add(themeMapInfoListCount);
						categoryList.add(param);						
					}
					resultData.put("count", countList);
					resultData.put("categoryList", categoryList);
//					mapParameter.put("cate_id", "CTGR_001");
//					List lifeCateList = (List) session.selectList("thematicMap.select.statsMapList", mapParameter);	
//					resultData.put("lifeCateList", lifeCateList);
//					
//					mapParameter.put("cate_id", "CTGR_002");
//					List healthCateList = (List) session.selectList("thematicMap.select.statsMapList", mapParameter);	
//					resultData.put("healthCateList", healthCateList);
//					
//					mapParameter.put("cate_id", "CTGR_003");
//					List cultureCateList = (List) session.selectList("thematicMap.select.statsMapList", mapParameter);	
//					resultData.put("cultureCateList", cultureCateList);
//					
//					mapParameter.put("cate_id", "CTGR_004");
//					List saftyCateList = (List) session.selectList("thematicMap.select.statsMapList", mapParameter);	
//					resultData.put("saftyCateList", saftyCateList);
				}
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