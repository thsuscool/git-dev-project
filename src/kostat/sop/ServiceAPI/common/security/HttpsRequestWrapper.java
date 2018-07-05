package kostat.sop.ServiceAPI.common.security;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class HttpsRequestWrapper extends HttpServletRequestWrapper {
	
	private HttpServletResponse response = null;

	public HttpsRequestWrapper(HttpServletRequest request) {
		super(request);
	}
	
	public void setResponse(HttpServletResponse response) {
		//2017.12.21 [������] ��༺ ������ġ
		response.setHeader("X-Frame-Options", "SAMEORIGIN");
		response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
		response.setHeader("X-Content-Type-Options", "nosniff");
		response.setHeader("X-XSS-Protection", "1");
		this.response = response;
	}

	public HttpSession getSession() {
		HttpSession session = super.getSession();
		processSessionCookie(session);
		return session;
	}
	
	public HttpSession getSession(boolean create) {
		HttpSession session = super.getSession(create);
		processSessionCookie(session);
		return session;
	}
	
	private void processSessionCookie(HttpSession session) {
		if(session == null || response == null) {
			return;
		}
		
		Object cookieOverWritten = getAttribute("COOKIE_OVERWRITTEN_FLAG");
		
		if(cookieOverWritten==null 
				&& isSecure() 
				&& isRequestedSessionIdFromCookie() 
				&& session.isNew()
		) {
			Cookie cookie = new Cookie("JSESSIONID", session.getId());
			cookie.setMaxAge(-1);
			String contextPath = getContextPath();
			
			if(contextPath!=null && contextPath.length()>0) {
				cookie.setPath(contextPath);
			} else {
				cookie.setPath("/");
			}
			
			//2017.12.21 [������] ��༺ ������ġ
			//cookie.setHttpOnly(true);
			//cookie.setSecure(true);
			
			response.addCookie(cookie);
			setAttribute("COOKIE_OVERWRITTEN_FLAG", "true");
		}
		
	}
	
}