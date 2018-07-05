package kostat.sop.ServiceAPI.controller.view;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.MemberService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

/**
 * 1. 기능 : 회원 관련 컨트롤러.<p>
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
@RequestMapping(value="/view/member")
public class MemberController {
	private final Log logger = LogFactory.getLog(MemberController.class);
	
	@Resource(name="memberService")
	private MemberService memberService;
	
	/**
	 * 이용약관
	 * @param request
	 * @param response
	 * @return member/clause
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/clause")
	public ModelAndView clause(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("member/clause");
	}
	
	/**
	 * 통합 로그인
	 * @param request
	 * @param response
	 * @return member/login_new
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/login_new")
	public ModelAndView login_new(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("member/login_new");
	}
	
	/**
	 * 기존 로그인
	 * @param request
	 * @param response
	 * @return member/login
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/login")
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("member/login");
	}
	
	/**
	 * 아이디 찾기
	 * @param request
	 * @param response
	 * @return member/IDFind
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/IDFind")
	public ModelAndView idFind(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("member/IDFind");
	}
	
	/**
	 * 비밀번호 찾기
	 * @param request
	 * @param response
	 * @return member/PWFind
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/PWFind")
	public ModelAndView pwFind(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("member/PWFind");
	}
	
	/**
	 * 이메일무단수집거부
	 * @param request
	 * @param response
	 * @return member/emailInfo
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/emailInfo")
	public ModelAndView emailInfo(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("member/emailInfo");
	}
	
	/**
	 * 개인정보처리방침
	 * @param request
	 * @param response
	 * @return member/personalInfo
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/personalInfo")
	public ModelAndView personalInfo(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("member/personalInfo");
	}
	
	/**
	 * 삭제회원, 휴면회원 관리
	 * @return JSONObject
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "unchecked", "deprecation" })
	@RequestMapping(value="/mng",method = RequestMethod.GET)
	public ModelAndView memberMng( HttpServletRequest request, ModelMap model ) {
		JSONObject result = new JSONObject();
		Map paramMap = new HashMap<String, Object>();
		
		String gubun_cd = request.getParameter("GUBUN_CD");
		String usr_id = request.getParameter("USR_ID");
		String usr_pw = request.getParameter("USR_PW");
		
		URLDecoder ud = new URLDecoder();
		if( usr_pw != null ){
			usr_pw = ud.decode( usr_pw );
		}
		
		String sys_cd = "S";
		String return_val = null;
		
		paramMap.put("usr_pw", usr_pw);
		paramMap.put("usr_id", usr_id);
		paramMap.put("gubun_cd", gubun_cd);
		
		try {
			return_val = String.valueOf( memberService.memberMng( paramMap ) );
		} catch (AbsAPIException e) {
			logger.error(e);
			result.put("RETURN_VAL", 0);
		} catch (IllegalArgumentException e) {
			logger.error(e);
			result.put("RETURN_VAL", 0);
		} catch (Exception e) {
			result.put("RETURN_VAL", 0);
			logger.error(e);
		}
		
		model.addAttribute("USR_ID", usr_id);
		model.addAttribute("GUBUN_CD", gubun_cd);
		model.addAttribute("RETURN_VAL", return_val);
		model.addAttribute("SYS_CD", sys_cd);
		
		return new ModelAndView("/member/memberMng", model);
	}
	
}