package kostat.sop.ServiceAPI.center.api.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CommonService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component("PageCallReg")
public class PageCallReg implements HandlerInterceptor {
	private final Log log = LogFactory.getLog(PageCallReg.class);
	
	//공통 서비스
	@Resource(name="commonService")
	private CommonService commonService;
		
	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object obj, Exception ext) throws IllegalArgumentException {
	}

	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object obj, ModelAndView mv) throws IllegalArgumentException {
	}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object obj) throws IllegalArgumentException {
		String url = req.getRequestURI();
		String hpage = "";
		
		try {
			if(url.indexOf("#") > -1) {	//파라미터가 있으면 # 까지 자름
				hpage = url.substring(0, url.indexOf("#"));
				url = hpage;
			}
			if(url.indexOf("?") > -1) {	//파라미터가 있으면 ? 까지 자름 
				hpage = url.substring(0, url.indexOf("?"));
			} else {
				hpage = url.substring(0, url.length());
			}
			log.info("#########PageCallReg#########"+hpage);
			
			Map mapParameter = new HashMap();
			mapParameter.put("hpage", hpage);
			
			//랜덤한 6자리 숫자 생성
			String randomStr = StringUtil.getRandomString(27);
			mapParameter.put("tr_id", randomStr);
			
			//접근 IP
			String access_ip = req.getRemoteAddr();
			mapParameter.put("access_ip", access_ip);
			
			//페이지 호출통계 등록
			commonService.insertPageCall(mapParameter);
			
		} catch(Exception e) {
			// 2015-12-03 시큐어코딩
			log.info(e);
			
			if(url != null) {
				url = null;
			}
			
			if(hpage != null) {
				hpage = null;
			}
		}
		
		return true;
	}
}
