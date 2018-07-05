package kostat.sop.ServiceAPI.center.api.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import kostat.sop.ServiceAPI.center.api.exception.HttpStatusException;

/**
 * @author rainmaker
 * �α���üũ, ����Űüũ, IPüũ�� ���������� ���
 */
public abstract class AbsAuthorized implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest req,
			HttpServletResponse res, Object obj, Exception ex)
			throws IllegalArgumentException {}

	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res,
			Object obj, ModelAndView mv) throws IllegalArgumentException {}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object obj) throws IllegalArgumentException {
		
		try {
			authorized(req, res);
		} catch(HttpStatusException ex) {
			throw ex;
		}
		return true;
	}
	
	public abstract void authorized(HttpServletRequest req, HttpServletResponse res) throws HttpStatusException;
}
