package kostat.sop.ServiceAPI.common.security;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

/**
 * 1. 기능 : SSL 프로토콜로 접근 가능한 페이지 필터.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2015/06/22  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
public class SSLFilter implements Filter {
	
	@SuppressWarnings("unused")
	private static final Log logger = LogFactory.getLog(SSLFilter.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	
    @Override
    public void destroy() {
        // Do nothing
    }

	@Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) req;
		
		HttpServletResponse httpResponse = (HttpServletResponse) res;
		
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		String requestURI = httpRequest.getRequestURI();
		String nowProtocol = httpRequest.getRequestURL().substring(0, 5);
		String domainURL = "";
		Boolean sslFlag = false;
		
		String parameter = httpRequest.getQueryString();
		if(parameter != null) {
			parameter = "?" + parameter;
		} else {
			parameter = "";
		}
		
		//2015-12-03 시큐어코딩
		requestURI = requestURI.replaceAll("\r","").replaceAll("\n","");
		
		if(requestURI.indexOf("/html/member/") > -1 || requestURI.indexOf("/html/mypage/") > -1) {
			if(nowProtocol.equals("http:")) {
				domainURL = props.getProperty("Globals.Config.domainURLssl");
				sslFlag = true;	
			}
		} else {
			if(nowProtocol.equals("https")) {
				if(requestURI.indexOf("/html/authorization/") == -1) {
					domainURL = props.getProperty("Globals.Config.domainURL");
					sslFlag = true;	
				}
			}
		}
		
		if (sslFlag) {
			String allowURL[] = {"http://localhost:8080/", "http://211.41.186.149:8080", "http://sgis.kostat.go.kr"};
			//2015-12-03 시큐어코딩
			for(int i = 0; i < allowURL.length; i ++) {
				if(domainURL.contains(allowURL[i])) {
					httpResponse.sendRedirect(domainURL + httpRequest.getContextPath() + requestURI + parameter);
				}
			}
		} else {
			chain.doFilter(req, res);
		}
	}

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        // Do nothing
    }

}