package kostat.sop.ServiceAPI.common.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

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
public class AuthenticationFilter implements Filter {
	
	private static final Log logger = LogFactory.getLog(AuthenticationFilter.class);
	
    @Override
    public void destroy() {
        // Do nothing
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) req;
		HttpSession session = httpRequest.getSession();
		
		String member_id = (String) session.getAttribute("member_id");
		//String member_key = (String) session.getAttribute("member_key");
		logger.debug("######Session ID ->" + member_id);

		HttpServletResponse httpResponse = (HttpServletResponse) res;
		logger.debug("######" + httpRequest.getContextPath());
		
		if (member_id == null || member_id.length() == 0) {
			logger.debug("######" + httpRequest.getRequestURL());
//			httpResponse.sendRedirect(httpRequest.getContextPath() + "/html/common/noAuth.html");
			httpResponse.sendRedirect(httpRequest.getContextPath() + "/html/member/login_new.html?returnPage=" + httpRequest.getRequestURL());
			
			/*
			PrintWriter out = res.getWriter();
			res.setContentType("text/html; charset=utf-8");
			out.println("<HTML>");
			out.println("<HEAD><TITLE>현대자동차</TITLE></HEAD>");
			out.println("<BODY>");
			out.println("<H3>로그인이 필요합니다.</H3>");
			out.println("</BODY>");
			out.println("</HTML>");
			out.flush();
			out.close();
			*/
		} else {
			chain.doFilter(req, res);
		}
	}

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        // Do nothing
    }

}