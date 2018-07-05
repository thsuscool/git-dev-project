package kostat.sop.ServiceAPI.controller.view;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.MypageService;
import kostat.sop.ServiceAPI.controller.service.PolicyStaticService;
import kostat.sop.ServiceAPI.controller.service.PolicyWriteService;
import kostat.sop.ServiceAPI.controller.service.SSOService;

/**
 * 1. 기능 : 정책통계지도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 송종대, 1.0, 2016/11/25  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 송종대
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/map")
public class PolicyWriteController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(PolicyWriteController.class);
	
	@Resource(name="policyWriteService")
	private PolicyWriteService policyWriteService;
	@Resource(name="ssoService")
	private SSOService ssoService;
	
	@Resource(name="policystaticService")   //2017.08.27 [개발팀]
	private PolicyStaticService policystaticService; //2017.08.27 [개발팀]
	
	@Resource(name="mypageService")	//2017.09.23 [개발팀]
	private MypageService mypageService; //2017.09.23 [개발팀]
	
	/**
	 * 정책통계지도 작성화면
	 * @param request
	 * @return policyStatic/policyStaticMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/policyWriteMap")
	//==================== 2017.08.12 [개발팀] 등록화면 수정 START ===================//
	public ModelAndView interactiveMap(HttpServletRequest request) {
		String params = request.getParameter("params");
		if(request.getSession().getAttribute("member_id")==null){
			return new ModelAndView("redirect:/view/member/login_new?returnPage=/view/map/policyWriteMap?params="+params);
		}else{
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("member_id", request.getSession().getAttribute("member_id"));
			try {
				Map member = ssoService.memberInfo(mapParameter);
				Map paramInfo = new HashMap();
				paramInfo.put("paramObj", params);
				String grade = (String)member.get("member_grade");
				request.getSession().setAttribute("member_grade", grade); //2018.01.03 [개발팀]
				if(grade.equals("MM") || grade.equals("PM")){
					return new ModelAndView("policyWrite/policyWriteMap", "paramInfo", paramInfo);
				}else{
					return new ModelAndView("redirect:/view/map/policyStaticMap");
				}
			} catch (SQLException e) {
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
			}
			return new ModelAndView("policyWrite/policyStaticMap");//2107-08-16 [개발팀]
		}
	}
	//================== 2017.08.12 [개발팀] 등급록화면수정 END ==================//
	
	/**
	 * 정책통계지도 작성 왼쪽메뉴(대화형 통계지도 메뉴)
	 * @param request
	 * @return
	 * @throws SQLException 
	 */
	@RequestMapping(value="/policyWriteMapLeftMenu")
	public String policyStaticMapLeftMenu(HttpServletRequest request,ModelMap model) throws SQLException {
		return policyWriteService.policyStaticMapLeftMenu(request,model);
	}
	
	/**
	 * 정책통계지도 작성 왼쪽메뉴(산업분류표 메뉴)
	 * @return
	 */
	@RequestMapping(value="/policyWriteMapRightMenu")
	public String policyWriteMapRightMenu(HttpServletRequest request,ModelMap model) throws SQLException{
		return policyWriteService.policyWriteMapRightMenu(request, model);
	}
	
	/**
	 * 정책통계지도 작성 메인화면(버퍼형, 연산형 선택)
	 * @return
	 */
	@RequestMapping(value="/policyWriteMapIndex")
	public ModelAndView policyWriteMapIndex() {
		return new ModelAndView("policyWrite/policyWriteMapIndex");
	}
	
	/**
	 * 정책통계지도 작성 융합화면(버퍼형)
	 * @return
	 */
	@RequestMapping(value="/policyWriteCombineBufferMap")
	public ModelAndView policyStaticCombineBufferMap() {
		return new ModelAndView("policyWrite/policyWriteCombineBufferMap");
	}
	
	/**
	 * 정책통계지도 작성 융합화면(연산형)
	 * @return
	 */
	@RequestMapping(value="/policyWriteCombineArithmeticMap")
	public ModelAndView policyStaticCombineArithmeticMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("policyWrite/policyWriteCombineArithmeticMap");
	}
	/**
	 * 정책통계지도 정보
	 * @return
	 */
	@RequestMapping(value="/policyWriteCombineInfo")
	public ModelAndView policyWriteCombineInfo(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("policyWrite/policyWriteCombineInfo");
	}
	@RequestMapping(value = "/policyWrite/mydataList", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String poiRegist(HttpServletRequest request) throws SQLException{
		return policyWriteService.mydataList(request);
	}
	
	//===================== 2017.08.09 [개발팀] 정책통계지도 수정  START =========================//
	/**
	 * 정책통계지도 작성 팝업
	 * @return
	 */
	@RequestMapping(value="/policyWritePopup")
	public ModelAndView policyWritePopup() {
		return new ModelAndView("policyWrite/policyWritePopup");
	}
	
	/**
	 * 정책통계지도 작성  융합팝업
	 * @return
	 */
	@RequestMapping(value="/policyWriteCombineMap")
	public ModelAndView policyWriteCombineMap(HttpServletRequest request, ModelMap model) {
		try {
			HttpSession session = request.getSession();
			String member_id = (String)session.getAttribute("member_id");
			List<Map> categoryList = policystaticService.policyStaticCategoryList();  //2017.08.11 [개발팀]
			model.addAttribute("categoryList", categoryList);
			model.addAttribute("memberId", member_id);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		return new ModelAndView("policyWrite/policyWriteCombineMap");
	}
	
	/**
	 * 정책통계지도 - 사업체 POI조회 
	 * durian으로 poi조회시, 대용량일 경우 log때문에 속도가 상당히 느려지는 단점 보완 : controller에서 model로 결과 리턴 
	 * @return
	 */
	@RequestMapping(value="/policyWrite/getCompanyPoiList.do")
	public ModelAndView getCompanyPoiList(HttpServletRequest request, ModelMap model) {
		try {
			Map mapParameter = new HashMap();
			String base_year = request.getParameter("base_year");
			String adm_cd = request.getParameter("adm_cd");
			String type = request.getParameter("type");
			String atdrc_type = request.getParameter("atdrc_type"); //2018.01.08 [개발팀]
			String ksic_1_cd = null;
			String ksic_5_cd = null;
			String theme_cd = null;
			if (type.equals("company")) {
				ksic_1_cd = request.getParameter("ksic_1_cd");
				ksic_5_cd = request.getParameter("ksic_5_cd");
				mapParameter.put("ksic_1_cd", ksic_1_cd);
				mapParameter.put("ksic_5_cd", ksic_5_cd);
			}else {
				theme_cd = request.getParameter("theme_cd");
				mapParameter.put("theme_cd", theme_cd);
			}
			mapParameter.put("base_year", base_year);
			mapParameter.put("adm_cd", adm_cd);
			mapParameter.put("type", type);
			
			//2018.01.08 [개발팀]
			//비자치구 연계
			if (atdrc_type != null && atdrc_type.equals("1")) {
				mapParameter.put("atdrc_type", atdrc_type);
			}
			
		
			List result = policyWriteService.getCompanyPoiList(mapParameter);
			model.put("id", "100426");
			if (result.size() > 0) {
				model.put("errCd", "0");
			}else if (result.size() == 0) {
				model.put("errCd", "-100");
			}else {
				model.put("errCd", "-1");
			}
			model.put("errMsg", "Success");
			model.put("result", result);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 정책통계지도 - 협업형 POI조회 
	 * durian으로 poi조회시, 대용량일 경우 log때문에 속도가 상당히 느려지는 단점 보완 : controller에서 model로 결과 리턴 
	 * @return
	 */
	@RequestMapping(value="/policyWrite/getLocalGovernmentPoiList.do")
	public ModelAndView getLocalGovernmentPoiList(HttpServletRequest request, ModelMap model) {
		try {
			Map mapParameter = new HashMap();
			String base_year = request.getParameter("base_year");
			String sido_cd = request.getParameter("sido_cd");
			String sgg_cd = request.getParameter("sgg_cd");
			String emdong_cd = request.getParameter("emdong_cd");
			String div_cd = request.getParameter("div_cd");
			String page_size = request.getParameter("page_size");
			String page_num = request.getParameter("page_num");
			String atdrc_type = request.getParameter("atdrc_type"); //2018.01.08 [개발팀]
			
			if (page_size == null) {
				page_size = "1000000"; 
			}
			
			if (page_num == null) {
				page_num = "1";
			}
			
			//2018.01.08 [개발팀]
			//비자치구 연계
			if (atdrc_type != null && atdrc_type.equals("1")) {
				mapParameter.put("atdrc_type", atdrc_type);
			}
			
			mapParameter.put("base_year", base_year);
			mapParameter.put("div_cd", div_cd);
			mapParameter.put("page_size", page_size);
			mapParameter.put("last_num", page_num);
			mapParameter.put("sido_cd", sido_cd);
			mapParameter.put("sgg_cd", sgg_cd);
			mapParameter.put("emdong_cd", emdong_cd);
		
			List result = policyWriteService.getLocalGovernmentPoiList(mapParameter);
			
			model.put("id", "100407");
			if (result.size() > 0) {
				model.put("errCd", "0");
			}else if (result.size() == 0) {
				model.put("errCd", "-100");
			}else {
				model.put("errCd", "-1");
			}
			model.put("errMsg", "Success");
			model.put("result", result);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 정책통계지도 - 사용자데이터 POI조회 
	 * durian으로 poi조회시, 대용량일 경우 log때문에 속도가 상당히 느려지는 단점 보완 : controller에서 model로 결과 리턴 
	 * @return
	 */
	@RequestMapping(value="/policyWrite/getMyDataPoiList.do")
	public ModelAndView getMyDataPoiList(HttpServletRequest request, ModelMap model) {
		try {
			List result = new ArrayList();
			String data_uid = request.getParameter("data_uid");
			Map data = mypageService.selectMyData(data_uid);
			result.add(data);
			
			model.put("id", "12002");
			if (result.size() > 0) {
				model.put("errCd", "0");
			}else if (result.size() == 0) {
				model.put("errCd", "-100");
			}else {
				model.put("errCd", "-1");
			}
			model.put("errMsg", "Success");
			model.put("result", result);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 정책통계지도 - 협업형 POI조회 
	 * durian으로 poi조회시, 대용량일 경우 log때문에 속도가 상당히 느려지는 단점 보완 : controller에서 model로 결과 리턴 
	 * @return
	 */
	@RequestMapping(value="/policyWrite/getLbdmsPoiList.do")
	public ModelAndView getLbdmsPoiList(HttpServletRequest request, ModelMap model) {
		try {
			Map mapParameter = new HashMap();
			String base_year = request.getParameter("base_year");
			String sido_cd = request.getParameter("sido_cd");
			String sgg_cd = request.getParameter("sgg_cd");
			String emdong_cd = request.getParameter("emdong_cd");
			String seq = request.getParameter("seq");
			String page_size = request.getParameter("page_size");
			String page_num = request.getParameter("page_num");
			String atdrc_type = request.getParameter("atdrc_type"); //2018.01.08 [개발팀]
			
			if (page_size == null) {
				page_size = "1000000"; 
			}
			
			if (page_num == null) {
				page_num = "1";
			}
			
			//2018.01.08 [개발팀]
			//비자치구 연계
			if (atdrc_type != null && atdrc_type.equals("1")) {
				mapParameter.put("atdrc_type", atdrc_type);
			}
			
			mapParameter.put("base_year", base_year);
			mapParameter.put("seq", seq);
			mapParameter.put("page_size", page_size);
			mapParameter.put("last_num", page_num);
			mapParameter.put("sido_cd", sido_cd);
			mapParameter.put("sgg_cd", sgg_cd);
			mapParameter.put("emdong_cd", emdong_cd);
		
			List result = policyWriteService.getLbdmsPoiList(mapParameter);
			
			model.put("id", "100427");
			if (result.size() > 0) {
				model.put("errCd", "0");
			}else if (result.size() == 0) {
				model.put("errCd", "-100");
			}else {
				model.put("errCd", "-1");
			}
			model.put("errMsg", "Success");
			model.put("result", result);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		return new ModelAndView("jsonV", model);
	}
	//===================== 2017.08.09 [개발팀] 정책통계지도 수정  END =========================//
}
