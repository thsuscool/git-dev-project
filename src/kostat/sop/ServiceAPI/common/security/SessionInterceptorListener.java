package kostat.sop.ServiceAPI.common.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 1. 기능 : 로그인 세션이 있어야만 접근 가능한 페이지 필터.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/08  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
public class SessionInterceptorListener extends HandlerInterceptorAdapter{
	
	private static final Log logger = LogFactory.getLog(SessionInterceptorListener.class);
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object controller) throws ServletException, IOException {
		
		logger.debug("SessionInterceptorListener :: preHandle");
		
    	HttpSession session = request.getSession();
    	String member_id = (String)session.getAttribute("member_id");
    	
    	//<!-- //2015-09-10 수정 -->
    	if (member_id == null || member_id.length() == 0) {
			request.getRequestDispatcher(request.getContextPath() + "/ServiceAPI/auth/noSession.json").forward(request, response);
			return false;
		} else {
			return true;
		}
	}
}