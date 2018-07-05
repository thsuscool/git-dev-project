package kostat.sop.ServiceAPI.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 1. 기능 : 운영이력관리 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : jrj
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/req")
public class ReqBoardController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(ReqBoardController.class);
	
	/**
	 * 운영이력관리 목록 화면
	 * @param request
	 * @param response
	 * @return req/reqBoard
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/reqBoardList")
	public ModelAndView reqBoard(HttpServletRequest request, HttpServletResponse response)  {
		ipCheck( request );
		return new ModelAndView("req/reqBoardList");
	}
	
	/**
	 * 운영이력관리 상세 화면
	 * @param request
	 * @param response
	 * @return req/reqBoardView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/reqBoardView")
	public ModelAndView reqBoardView(HttpServletRequest request, HttpServletResponse response)  {
		ipCheck( request );
		return new ModelAndView("req/reqBoardView");
	}
	
	/**
	 * ipCheck
	 * @param request
	 * @param response
	 * @return
	 */
	public void ipCheck( HttpServletRequest request ) {
		String ip = request.getRemoteAddr();
		
		try {
			if( ip!= null && ( !ip.equals("125.128.71.120") && !ip.equals("125.128.71.121") ) ){
				throw new ApiException("접근이 허용된 IP가 아닙니다.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new ApiException( e.getMessage() );
		}
		
	}
	
}