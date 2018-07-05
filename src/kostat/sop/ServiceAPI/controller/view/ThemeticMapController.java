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
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.controller.service.ThemeticMapService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 통계주제도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/04  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/thematicMap")
public class ThemeticMapController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(ThemeticMapController.class);
	
	@Resource(name="themeticMapService")
	private ThemeticMapService themeticMapService;
	
	@Resource(name="mapService")
	private MapService mapService;
	
	/**
	 * 통계주제도 목록
	 * @param request
	 * @param response
	 * @return thematicMap/categoryList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/categoryList")
	public ModelAndView categoryList(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/thematicSearch01");
	}
	
	/**
	 * 통계주제도 목록
	 * @param request
	 * @param response
	 * @return thematicMap/categoryList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/categoryListHuman")
	public ModelAndView categoryListHuman(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView("thematicMap/thematicSearch01");
		model.addObject("type", "01");
		return model;
//		return new ModelAndView("thematicMap/thematicSearch01");
	}
	
	/**
	 * 통계주제도 목록
	 * @param request
	 * @param response
	 * @return thematicMap/categoryList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/categoryListHouse")
	public ModelAndView categoryListHouse(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView("thematicMap/thematicSearch01");
		model.addObject("type", "02");
		return model;
//		return new ModelAndView("thematicMap/thematicSearch01");
	}
	
	/**
	 * 통계주제도 목록
	 * @param request
	 * @param response
	 * @return thematicMap/categoryList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/categoryListWelfare")
	public ModelAndView categoryListWelfare(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView("thematicMap/thematicSearch01");
		model.addObject("type", "03");
		return model;
//		return new ModelAndView("thematicMap/thematicSearch01");
	}
	
	/**
	 * 통계주제도 목록
	 * @param request
	 * @param response
	 * @return thematicMap/categoryList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/categoryListWork")
	public ModelAndView categoryListWork(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView("thematicMap/thematicSearch01");
		model.addObject("type", "04");
		return model;
//		return new ModelAndView("thematicMap/thematicSearch01");
	}
	
	/**
	 * 통계주제도 목록
	 * @param request
	 * @param response
	 * @return thematicMap/categoryList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/categoryListEnvironment")
	public ModelAndView categoryListEnvironment(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView("thematicMap/thematicSearch01");
		model.addObject("type", "05");
		return model;
//		return new ModelAndView("thematicMap/thematicSearch01");
	}
	
//	/**
//	 * 통계주제도 thematicSearch01
//	 * @param request
//	 * @param response
//	 * @return thematicMap/thematicSearch01
//	 */
//	@Interceptor("PageCallReg")
//	@RequestMapping(value="/thematicMapMain")
//	public ModelAndView thematicSearch01(HttpServletRequest request, HttpServletResponse response) {
//		return new ModelAndView("thematicMap/thematicSearch01");
//	}
	
	/**
	 * 통계주제도 테마 리스트
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapList")
	public ModelAndView thematicMapList(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/thematicMapList");
	}
	
	/**
	 * 통계주제도 상세 메인 화면
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapMain")
	public ModelAndView thematicMapMain(HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			logger.info("START Query - select interactiveMap param Info");
			String hist_id = request.getParameter("id");
			if (hist_id != null) {
				hist_id = Security.cleanXss(hist_id);
				Map mapParameter = new HashMap();
				mapParameter.put("hist_id", hist_id);
				List bookmarkList = mapService.getStatistcsHistoryParamInfo(mapParameter);
				
				JSONArray tmpbookmarkList = new JSONArray();
				JSONObject bookmarkInfo;
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
				paramInfo.put("type", "bookmark");
				paramInfo.put("paramObj", tmpbookmarkList.toString());
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
		return new ModelAndView("thematicMap/thematicMapMain", "paramInfo", paramInfo);
	}
	
	/**
	 * 통계주제도 상세 메인 화면
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapMainOld")
	public ModelAndView thematicMapMainOld(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/old/thematicMapMain");
	}
	
	/**
	 * 통계주제도 iframe 화면 03
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapFrame03")
	public ModelAndView thematicMapFrame03(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/thematicMapFrame03");
	}
	
	/**
	 * 통계주제도 iframe 화면 04
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapFrame04")
	public ModelAndView thematicMapFrame04(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/thematicMapFrame04");
	}
	
	/**
	 * 통계주제도 iframe 화면 05
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapFrame05")
	public ModelAndView thematicMapFrame05(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/thematicMapFrame05");
	}
	
	/**
	 * 통계주제도 iframe 화면 06
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapFrame06")
	public ModelAndView thematicMapFrame06(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/thematicMapFrame06");
	}
	
	/**
	 * 통계주제도 iframe 화면 07
	 * @param request
	 * @param response
	 * @return thematicMap/thematicMapMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/thematicMapFrame07")
	public ModelAndView thematicMapFrame07(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("thematicMap/thematicMapFrame07");
	}
	
	
//	/**
//	 * 통계주제도 Left 메뉴
//	 * @param request
//	 * @param response
//	 * @return thematicMap/thematicMapLeftMenu
//	 */
//	@RequestMapping(value="/thematicMapLeftMenu")
//	public ModelAndView thematicMapLeftMenu(HttpServletRequest request, HttpServletResponse response) {
//		return new ModelAndView("thematicMap/thematicMapLeftMenu");
//	}
//	
//	/**
//	 * 통계주제도 데이터보드
//	 * @param request
//	 * @param response
//	 * @return thematicMap/thematicMapDataBoard
//	 */
//	@RequestMapping(value="/thematicMapDataBoard")
//	public ModelAndView thematicMapDataBoard(HttpServletRequest request, HttpServletResponse response) {
//		return new ModelAndView("thematicMap/thematicMapDataBoard");
//	}
//	
//	
//	/**
//	 * 통계주제도 범례결합창
//	 * @param request
//	 * @param response
//	 * @return thematicMap/thematicMapCombineMap
//	 */
//	@RequestMapping(value="/thematicMapCombineMap")
//	public ModelAndView thematicMapCombineMap(HttpServletRequest request, HttpServletResponse response) {
//		return new ModelAndView("thematicMap/thematicMapCombineMap");
//	}
	
	
}