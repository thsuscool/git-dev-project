package kostat.sop.ServiceAPI.controller.view;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
//import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.HouseAnalysisMapService;
import kostat.sop.ServiceAPI.controller.service.SSOService;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.apache.ibatis.session.SqlSession;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
/**
 * 1. 기능 : 주거지분석맵 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 이기로, 1.0, 2015/10/19  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 이기로
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/house")
public class HouseAnalysisMapController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(HouseAnalysisMapController.class);
	
	@Resource(name="houseAnalysisMapService")
	private HouseAnalysisMapService houseAnalysisMapService;
	
	@Resource(name="mapService")
	private MapService mapService;
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/houseAnalysisMap/{type}")
	public ModelAndView bookmarkHouse(@PathVariable String type, HttpServletRequest request, HttpServletResponse response ,ModelMap model) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			model.addAttribute("mlsfcListsJson",mapper.writeValueAsString(houseAnalysisMapService.selectMlsfcLists()));
			Map<String,Object> idealType = houseAnalysisMapService.selectIdealTypeLists();
			model.addAttribute("idealTypeListsJson",mapper.writeValueAsString(idealType));
			model.addAttribute("idealTypeLists",idealType);
		} catch (JsonProcessingException e) {
			logger.error("json 변환을 실패하였습니다");
		} catch (IOException e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		}
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
		
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println(paramInfo.toString());
		return new ModelAndView("house/houseAnalysisMap", "paramInfo", paramInfo);
	}
	
	
	//2017.11.01 [개발팀] LBDMS 데이터연계
	@Resource(name="ssoService")
	private SSOService ssoService;
	
	/**
	 * 주거지분석맵 메인
	 * @param request
	 * @param response
	 * @return house/houseAnalysisMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/houseAnalysisMap")
	public ModelAndView houseAnalysisMapBack(HttpServletRequest request, HttpServletResponse response,ModelMap model) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			model.addAttribute("mlsfcListsJson",mapper.writeValueAsString(houseAnalysisMapService.selectMlsfcLists()));
			Map<String,Object> idealType = houseAnalysisMapService.selectIdealTypeLists();
			model.addAttribute("idealTypeListsJson",mapper.writeValueAsString(idealType));
			model.addAttribute("idealTypeLists",idealType);
			
			//====== 2017.11.01 [개발팀] LBDMS 데이터연계 START =========//
			HttpSession session = request.getSession();
			String member_id = (String)session.getAttribute("member_id");
			model.addAttribute("writeAble", false);
			if(member_id != null) {
				HashMap<String,Object> mapParameter = new HashMap<String,Object>();
				mapParameter.put("member_id", member_id);
				try {
					Map member = ssoService.memberInfo(mapParameter);
					String member_grade = (String)member.get("member_grade");
					if(member!=null){
						if (!member_grade.equals("GM")) {
							model.addAttribute("writeAble", true);
						}
					}
				} catch (SQLException e) {
					logger.error(e);
				}
			}
			//====== 2017.11.01 [개발팀] LBDMS 데이터연계 END =========//
			
		} catch (JsonProcessingException e) {
			logger.error("json 변환을 실패하였습니다");
		} catch (IOException e) {
			String message = "서버에서 처리중 에러가 발생했습니다.";
			logger.info(message+":"+e);
		}
		return new ModelAndView("house/houseAnalysisMap");
	}
	
	/**
	 * 주거지분석맵 레프트 메뉴
	 * @param request
	 * @param response
	 * @return house/houseAnalysisLeftMenu
	 */
	@RequestMapping(value="/houseAnalysisLeftMenu")
	public ModelAndView houseAnalysisLeftMenu(HttpServletRequest request, HttpServletResponse response,ModelMap model) {
		model.addAttribute("mlsfcLists",houseAnalysisMapService.selectMlsfcLists());
		model.addAttribute("lifeStyle",houseAnalysisMapService.selectLifeStyleLists());
		return new ModelAndView("house/houseAnalysisLeftMenu");
	}
	
	/**
	 * 주거지분석맵 레프트 메뉴
	 * @param request
	 * @param response
	 * @return house/houseAnalysisLeftMenu
	 */
	@RequestMapping(value="/houseAnalysisDataBoard")
	public ModelAndView houseAnalysisDataBoard(HttpServletRequest request, HttpServletResponse response,ModelMap model) {
		model.addAttribute("mlsfcLists",houseAnalysisMapService.selectMlsfcLists());
		return new ModelAndView("house/houseAnalysisDataBoard");
	}
	/**
	 * 주거지분석맵 분류
	 * @param request
	 * @param response
	 * @return house/getClassElement
	 */
	@RequestMapping(value="/getClassElement")
	public ModelAndView getClassElement(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("house/getClassElement");
	}
	/**
	 * 주거지표현황
	 * @param request
	 * @param response
	 * @return house/heler/indicator
	 */
	@RequestMapping(value="/helper/indicator")
	public ModelAndView indicator(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("house/helper/indicator");
	}
	/**
	 * 이상형 동네찾기
	 * @param request
	 * @param response
	 * @param page
	 * @return house/idealType
	 */
	@RequestMapping(value="/idealType/{page}")
	public ModelAndView idealType(HttpServletRequest request, HttpServletResponse response,@PathVariable String page) {
		return new ModelAndView("house/idealType/"+page);
	}
}