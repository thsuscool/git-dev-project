package kostat.sop.ServiceAPI.controller.view;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.CommonService;
import kostat.sop.ServiceAPI.common.security.*;

/**
 * 1. 기능 : 공통페이지 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/common")
public class CommonController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(CommonController.class);
	
	@Resource(name="commonService")
	private CommonService commonService;
	
	/**
	 * 잘못된 페이지 접근
	 * @param request
	 * @param response
	 * @return common/errorCode
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/errorCode")
	public ModelAndView errorCode(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/errorCode");
	}
	
	/**
	 * 연관검색
	 * @param request
	 * @param response
	 * @return common/searchList
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/searchList")
	public ModelAndView searchList(HttpServletRequest request, HttpServletResponse response) {
		
		String value="";
		value = request.getParameter("searchKeyword")==null?"":request.getParameter("searchKeyword");
		
		value = Security.cleanXss(value);
		
		request.setAttribute("searchKeyword", value);
		
		return new ModelAndView("common/searchList");
	}
	
	/**
	 * 상단 Header (검색)
	 * @param request
	 * @param response
	 * @return common/includeSearch
	 */
	@RequestMapping(value="/includeSearch")
	public ModelAndView includeSearch(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/includeSearch");
	}
	
	/**
	 * 하단 Footer
	 * @param request
	 * @param response
	 * @return common/includeBottom
	 */
	@RequestMapping(value="/includeBottom")
	public ModelAndView includeBottom(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/includeBottom");
	}
	
	/**
	 * 하단 Footer
	 * @param request
	 * @param response
	 * @return common/includeBottom
	 */
	@RequestMapping(value="/includeBottom/hidden")
	public ModelAndView includeBottomHidden(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/includeBottom", "type", "hidden");
	}
	
	/**
	 * 활용서비스 메인
	 * @param request
	 * @param response
	 * @return common/serviceMain
	 */
	@RequestMapping(value="/serviceMain")
	public ModelAndView serviceMain(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/serviceMain");
	}
	
	/**
	 * 분석지도 메인
	 * @param request
	 * @param response
	 * @return common/analMapMain
	 */
	@RequestMapping(value="/analMapMain")
	public ModelAndView analMapMain(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/analMapMain");
	}
	
	
}