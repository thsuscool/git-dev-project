package kostat.sop.ServiceAPI.center.api.interceptor;

import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component("CallLogger")
public class CallLogger implements HandlerInterceptor {
	private final Log log = LogFactory.getLog(CallLogger.class);
	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object obj, Exception ext) throws IllegalArgumentException {
		if(log.isInfoEnabled()) {
			StringBuilder sb = new StringBuilder();
			sb.append("[").append(req.hashCode()).append("]");
			sb.append(" [").append("CALL[2]").append("]");
			//sb.append(" [").append(res.getStatus()).append("]");
			
			if(ext != null) {
				sb.append(" [").append(ext.getMessage()).append("]");
			}
			
			log.info(sb.toString());
		}
	}

	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object obj, ModelAndView mv) throws IllegalArgumentException {
		if(log.isInfoEnabled()) {
			StringBuilder sb = new StringBuilder();
			sb.append("[").append(req.hashCode()).append("]");
			sb.append(" [").append("CALL[1]").append("]");
			//sb.append(" [").append(res.getStatus()).append("]");
			if(mv != null)
				sb.append(" [").append(mv.getViewName()).append("(JSP)]");
			else
				sb.append(" [").append("JSON").append("]");
			
			log.info(sb.toString());
		}
	}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object obj) throws IllegalArgumentException {
		if(log.isInfoEnabled()) {
			StringBuilder sb = new StringBuilder();
			sb.append("[").append(req.hashCode()).append("]");
			sb.append(" [").append("CALL[0]").append("]");
			sb.append(" [").append(req.getRemoteAddr()).append("]");
			sb.append(" [").append(req.getRequestURI()).append("]");
			
			if(log.isDebugEnabled()) {
				Enumeration<String> er = req.getParameterNames();
				String param = null;
				String[] values = null;
				StringBuilder params = new StringBuilder();
				int index = 0;
				int idx = 0;
				int len = 0;
				while(er.hasMoreElements()) {
					values = null;
					param = er.nextElement();
					if(index != 0)
						params.append("&");
					params.append(param).append("=");
					values = req.getParameterValues(param);
					if(values != null) {
						len = values.length;
						params.append("{");
						for(idx = 0; idx < len; idx++) {
							if(idx != 0) params.append(",");
							params.append(values[idx]);
						}
						params.append("}");
					}
					index++;
				}
				
				sb.append(" [").append(params).append("]");
			}
			sb.append(" [").append(obj.toString()).append("]");
			log.info(sb.toString());
		}
		return true;
	}
}
