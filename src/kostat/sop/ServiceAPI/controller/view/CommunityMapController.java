package kostat.sop.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.security.Security; //2017.12.06 [개발팀] 취약점점검
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.controller.service.SSOService;

/**
 * 1. 기능 : 참여형 소통시도 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠, 1.0, 2016/01/13  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping("/view/community")
public class CommunityMapController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(CommunityMapController.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Resource(name="ssoService")
	private SSOService ssoService;

	@RequestMapping(value="/communityPath")
	public ModelAndView communityPath() throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/communityPath");
	}
	@RequestMapping(value="/communityLeftMenu")
	public ModelAndView communityLeftMenu() throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/view/communityLeftMenu");
	}
	@RequestMapping(value="/communityDataBoard")
	public ModelAndView communityDataBoard() throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/view/communityDataBoard");
	}
	@RequestMapping(value="/layerPopup/{type}")
	public ModelAndView include(@PathVariable String type) throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/view/layerPopup/"+type);
	}
	@RequestMapping(value="/form/layerPopup/{type}")
	public ModelAndView includeForm(@PathVariable String type) throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/form/"+type);
	}
	@RequestMapping(value="/form/layerPopup/{type}/{file}")
	public ModelAndView includeForm(@PathVariable String type,@PathVariable String file) throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/form/"+type+"/"+file);
	}
	@RequestMapping(value="/intro")
	public ModelAndView intro(
			HttpServletRequest request, 
			HttpServletResponse response,
			ModelMap model,
			String organ,
			String scu
			) throws Exception,IllegalArgumentException {
		
		//2017.12.06 [개발팀] 취약점점검
		organ = Security.cleanXss(organ);
		scu = Security.cleanXss(scu);
		
		model.addAttribute("conOrgan",communityService.hasOrgan(organ));
		model.addAttribute("organ",communityService.base64Decode(organ));
		model.addAttribute("organ_scu",communityService.base64Decode(scu));
		//로그인 여부 확인
		HttpSession session = request.getSession();
		String member_id = (String)session.getAttribute("member_id");
		model.addAttribute("writeAble", false);
		if(member_id != null) {
			HashMap<String,Object> mapParameter = new HashMap<String,Object>();
			mapParameter.put("member_id", member_id);
			try {
				Map member = ssoService.memberInfo(mapParameter);
				if(member!=null){
					model.addAttribute("writeAble", member!=null&&"PM".equals(member.get("member_grade")));
				}
			} catch (SQLException e) {
				logger.error(e);
			}
		}
		return new ModelAndView("/communityMap/communityMapIntro");
	}

	@RequestMapping(value="/auth")
	public ModelAndView auth(
			) throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/communityMapAuth");
	}
	@RequestMapping(value="/form")
	public ModelAndView getForm(
			HttpServletRequest request, 
			HttpServletResponse response,
			ModelMap model
			) throws Exception,IllegalArgumentException {
		return communityService.getForm(request, model);
	}
	@RequestMapping(value="/view")
	public ModelAndView view(
			HttpServletRequest request, 
			HttpServletResponse response,
			ModelMap model
			) throws Exception,IllegalArgumentException {
		return communityService.view(request, model);
	}
	@RequestMapping(value="/popup/joso")
	public ModelAndView juso(
			HttpServletRequest request, 
			HttpServletResponse response,
			ModelMap model
			) throws Exception,IllegalArgumentException {
		return communityService.juso(request, response, model);
	}
	@Interceptor("PageCallReg")
	@RequestMapping(value="/notice/{type}")
	public ModelAndView noticelist(
			HttpServletRequest request,
			HttpServletResponse response,
			@PathVariable String type
			) throws Exception,IllegalArgumentException {
		return new ModelAndView("/communityMap/notice/"+type);
	}
	@RequestMapping(value = "/getData", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String getData(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		return communityService.getFileDataToHandsontable(request);
	}
	@RequestMapping(value = "/member/regist", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String memberRegist(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		return communityService.memberRegist(request);
	}
	@RequestMapping(value="/dataUpload")
	public ModelAndView dataUpload(
			HttpServletRequest request, 
			HttpServletResponse response,
			ModelMap model
			) throws Exception,IllegalArgumentException{
		return communityService.dataUpload(request, response, model);
	}
	@RequestMapping(value = "/getBatchData", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String getBatchData(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		return communityService.getBatchFileDataToHandsontable(request);
	}
	@RequestMapping(value = "/sample/download", method = RequestMethod.GET)
	public void sampleExcelDownload(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{
		communityService.getBatchSampleExcel(request, response);
	}
	@RequestMapping(value = "/poi/regist", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String poiRegist(
			HttpServletRequest request,
			HttpServletResponse response
			) throws Exception,IllegalArgumentException{

		return communityService.poiRegist(request);
	}
	@RequestMapping(value="/fileDownLoadSHP",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void getSHPFile(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException{
		communityService.getPoiSHPFile(request, response);
	}
	@RequestMapping(value = "/check/password", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String checkPassword(
			HttpServletRequest request
			) throws Exception,IllegalArgumentException{
		return communityService.checkPassword(request);
	}
	@RequestMapping(value="/organUser", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String organUser(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException{
		return communityService.insertOrganUser(request, response);
	}
}