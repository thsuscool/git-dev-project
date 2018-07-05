package kostat.sop.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.BizStatsMapService;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.common.security.Security;

/**
 * 1. 기능 : 생활업종 통계지도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/10/06  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/bizStats")
public class BizStatsMapController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(BizStatsMapController.class);
	
	@Resource(name="bizStatsMapService")
	private BizStatsMapService bizStatsMapService;
	
	@Resource(name="mapService")
	private MapService mapService;
	
	/**
	 * 생활업종 통계지도
	 * @param request
	 * @param response
	 * @return bizStats/bizStatsMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/bizStatsMap")
	public ModelAndView bizStatsMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/bizStatsMap");
	}
	
	/**
	 * 생활업종 통계지도 연관검색
	 * @param request
	 * @param response
	 * @return map/bizStatsMap/{type}
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/bizStatsMap/{type}")
	public ModelAndView census(@PathVariable String type, HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			logger.info("START Query - select interactiveMap param Info");
			
			logger.debug("type [" + type);
			
			if (type.equals("bookmark") || type.equals("sharedata")) {
				
				String hist_id = request.getParameter("id");
				hist_id = Security.cleanXss(hist_id);
				hist_id = Security.sqlInjectionCheck(hist_id);
				
				Map mapParameter = new HashMap();
				mapParameter.put("hist_id", hist_id);
				List bookmarkList = mapService.getStatistcsHistoryParamInfo(mapParameter);
				
				JSONArray tmpbookmarkList = new JSONArray();
				JSONObject bookmarkInfo;
				
				logger.debug("bookmarkList.size() [" + bookmarkList.size());
				
				for (int i=0; i<bookmarkList.size(); i++) {
					HashMap tmpBookmarkInfo = (HashMap)bookmarkList.get(i);
					bookmarkInfo = new JSONObject();
					bookmarkInfo.put("hist_type",tmpBookmarkInfo.get("hist_type"));
					bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
					bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("hist_nm"));
					bookmarkInfo.put("map_type",tmpBookmarkInfo.get("map_type"));
					bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
					bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
					bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
					tmpbookmarkList.put(bookmarkInfo.toString());
					
				}
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpbookmarkList.toString());
				
				logger.debug("tmpbookmarkList.toString() [" + tmpbookmarkList.toString());
				
			}
			//TODO 하위 코딩 확인////////////////???????????
			else if(type.equals("recentdata")){
				String hist_id = request.getParameter("id");
				hist_id = Security.cleanXss(hist_id);
				hist_id = Security.sqlInjectionCheck(hist_id);
				
				Map mapParameter = new HashMap();
				mapParameter.put("hist_id", hist_id);
				List bookmarkList = mapService.getMainRecentParamInfo(mapParameter);
				
				JSONArray tmpbookmarkList = new JSONArray();
				JSONObject bookmarkInfo;
				for (int i=0; i<bookmarkList.size(); i++) {
					HashMap tmpBookmarkInfo = (HashMap)bookmarkList.get(i);
					bookmarkInfo = new JSONObject();
					bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
					bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("title"));
					bookmarkInfo.put("ex_type",tmpBookmarkInfo.get("ex_type"));
					bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
					bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
					bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
					tmpbookmarkList.put(bookmarkInfo.toString());
				}
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpbookmarkList.toString());
			}
			else if (type.equals("userdata")) {
				String id = request.getParameter("id");
				String title = request.getParameter("title");
				
				id = Security.cleanXss(id);
				title = Security.cleanXss(title);
				id = Security.sqlInjectionCheck(id);
				title = Security.sqlInjectionCheck(title);
				
				JSONArray tmpUserDataList = new JSONArray();
				JSONObject userDataInfo = new JSONObject();
				userDataInfo.put("id", id);
				userDataInfo.put("title",title);
				tmpUserDataList.put(userDataInfo.toString());
				
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpUserDataList.toString());
			}
			else {
				String params = request.getParameter("params");
				params = Security.cleanXss(params);
				params = Security.sqlInjectionCheck(params);
				
				JSONArray searchParamList = new JSONArray();
				JSONObject searchParamInfo = new JSONObject();
				
				Map tempMap = request.getParameterMap();
				Iterator<String> itr = tempMap.keySet().iterator();
				while(itr.hasNext()) {
					String key = itr.next();
					String data = request.getParameter(key);
					
					if (key.equals("params")) {
						String[] tempVal = data.split("=");
						
						key = tempVal[0];
						data = tempVal[1];
					}
					
//					if (key.equals("title")) {
//						data = StringUtil.encodingChange(request, data);
//					}
					searchParamInfo.put(key, data);
				}
			
				searchParamList.put(searchParamInfo.toString());
				paramInfo.put("type", type);
				paramInfo.put("paramObj", searchParamList.toString());
			///////////////////////////////////////////////////////////////
			}
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		
		//2017.12.04 [개발팀] 시큐어코딩
		//System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		//System.out.println(paramInfo.toString());
		return new ModelAndView("map/bizStatsMap", "paramInfo", paramInfo);
	}
	
	/**
	 * 생활업종 통계지도 Left 메뉴
	 * @param request
	 * @param response
	 * @return map/bizStatsLeftMenu
	 */
	@RequestMapping(value="/bizStatsLeftMenu")
	public ModelAndView bizStatsLeftMenu(HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			Map mapParameter = new HashMap();
			Map tooltipInfo = new HashMap();
			mapParameter.put("menu_class_cd", "B0");
			List tooltipList = mapService.selectTooltipInfo(mapParameter);
			
			for (int i=0; i<tooltipList.size(); i++) {
				Map map = (HashMap)tooltipList.get(i);
				String classCd = (String)map.get("menu_class_cd");
				String ttpId = (String)map.get("ttip_id");
				String exp = (String)map.get("ttip_exp");
				tooltipInfo.put(classCd + ttpId, exp);
			}
			paramInfo.put("tooltipList", tooltipInfo);
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		return new ModelAndView("map/bizStatsLeftMenu", "paramInfo", paramInfo);
	}
	
	
	/**
	 * 생활업종 통계지도 데이터보드
	 * @param request
	 * @param response
	 * @return map/bizStatsDataBoard
	 */
	@RequestMapping(value="/bizStatsDataBoard")
	public ModelAndView bizStatsDataBoard(HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			Map mapParameter = new HashMap();
			Map tooltipInfo = new HashMap();
			mapParameter.put("menu_class_cd", "B0");
			List tooltipList = mapService.selectTooltipInfo(mapParameter);
			
			for (int i=0; i<tooltipList.size(); i++) {
				Map map = (HashMap)tooltipList.get(i);
				String classCd = (String)map.get("menu_class_cd");
				String ttpId = (String)map.get("ttip_id");
				String exp = (String)map.get("ttip_exp");
				tooltipInfo.put(classCd + ttpId, exp);
			}
			paramInfo.put("tooltipList", tooltipInfo);
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		return new ModelAndView("map/bizStatsDataBoard", "paramInfo", paramInfo);
	}
	
	/**
	 * 생활업종 통계지도 도움말
	 * @param request
	 * @param response
	 * @return map/bizStatsHelper
	 */
	@RequestMapping(value="/bizStatsHelper")
	public ModelAndView bizStatsHelper(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/helper/bizStatsHelper");
	}
}