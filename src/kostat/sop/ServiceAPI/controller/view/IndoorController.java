package kostat.sop.ServiceAPI.controller.view;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.IndoorService;

/**
 * 1. 기능 : 사업체 전개도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2015/09/17  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/indoor")
public class IndoorController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(IndoorController.class);
	
	@Resource(name="indoorService")
	private IndoorService indoorService;
	
	/**
	 * 통계주제도 목록
	 * @param request
	 * @param response
	 * @return indoor/indoorMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/indoorMap")
	public ModelAndView indoorMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("indoor/indoorMap");
	}
	
}