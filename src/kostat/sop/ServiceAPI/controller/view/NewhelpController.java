package kostat.sop.ServiceAPI.controller.view;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


/**
 * 1. 기능 : 도움말 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/09/02  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/newhelp")
public class NewhelpController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MypageController.class);
	
	
	/**
	 *  도움말 헤더
	 * @param 
	 * @exception 
	 */
	@RequestMapping(value="/helpHeader")
	public ModelAndView helpHeader(){		
		return new ModelAndView("newhelp/helpHeader");
	}
	
	
	/**
	 * 홈페이지 이용안내 도움말 
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/us_help_{pNum}")
	public ModelAndView us_help(@PathVariable(value = "pNum") String pNum){
		return new ModelAndView("newhelp/us_help_"+pNum);
	}
	
	/**
	 * 대화형 통계지도 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/in_help_{pNum}")
	public ModelAndView in_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/in_help_"+pNum);
	}
	
	/**
	 * 살고싶은 우리동네 도움말 
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/house_help_{pNum}")
	public ModelAndView house_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/house_help_"+pNum);
	}
	
	/**
	 * 생활업종 통계지도 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/so_help_{pNum}")
	public ModelAndView so_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/so_help_"+pNum);
	}
	
	/**
	 * 통계커뮤니티맵 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/community_help_{pNum}")
	public ModelAndView community_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/community_help_"+pNum);
	}

	/**
	 * 통계주제도 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/su_help_{pNum}")
	public ModelAndView su_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/su_help_"+pNum);
	}


	/**
	 * 고령화 현황보기 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/ol_help_{pNum}")
	public ModelAndView ol_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/ol_help_"+pNum);
	}

	/**
	 * 성씨분포 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/nm_help_{pNum}")
	public ModelAndView nm_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/nm_help_"+pNum);
	}

	/**
	 * 월간통계 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/mn_help_{pNum}")
	public ModelAndView mn_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/mn_help_"+pNum);
	}

	/**
	 * 자료신청 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/dd_help_{pNum}")
	public ModelAndView dd_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/dd_help_"+pNum);
	}

	/**
	 * 지방의 변화보기 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/lo_help_{pNum}")
	public ModelAndView lo_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/lo_help_"+pNum);
	}

	/**
	 * 인구피라미드 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/py_help_{pNum}")
	public ModelAndView py_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/py_help_"+pNum);
	}


	/**
	 * 통계지도체험 도움말 
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/ex_help_{pNum}")
	public ModelAndView ex_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/ex_help_"+pNum);
	}

	/**
	 * 활용갤러리 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/ga_help_{pNum}")
	public ModelAndView ga_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/ga_help_"+pNum);
	}
	
	/**
	 * OpenAPI 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/de_help_{pNum}")
	public ModelAndView de_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/de_help_"+pNum);
	}
	
	/**
	 * 기술업종 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/tc_help_{pNum}")
	public ModelAndView tc_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/tc_help_"+pNum);
	}
	
	/**
	 * 정책통계지도 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/ps_help_{pNum}")
	public ModelAndView ps_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/ps_help_"+pNum);
	}
	
	/**
	 * 통계갤러리 도움말
	 * @param pNum
	 * @exception 
	 */
	@RequestMapping(value="/rg_help_{pNum}")
	public ModelAndView rg_help(@PathVariable(value = "pNum") String pNum){		
		return new ModelAndView("newhelp/rg_help_"+pNum);
	}


}
