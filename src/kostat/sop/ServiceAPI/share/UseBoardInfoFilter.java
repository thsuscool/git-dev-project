package kostat.sop.ServiceAPI.share;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;



public class UseBoardInfoFilter implements Filter {

	@Override
	public void destroy() {}
	@Override
	public void init(FilterConfig arg0) throws ServletException {}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletResponse response = (HttpServletResponse)res;
		
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTION, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
		
		response.setHeader("Access-Control-Allow-Orign", "*");		//실서버 반영시 수정해줘야 하는 부분. cross domain 허용 url을 넣어준다.
		
		chain.doFilter(req, res);
		
		
	}

	
}

