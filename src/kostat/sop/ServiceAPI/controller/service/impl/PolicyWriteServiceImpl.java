package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.controller.service.PolicyWriteService;
import kostat.sop.ServiceAPI.controller.service.SSOService;
import kostat.sop.ServiceAPI.controller.service.mapper.MypageMapper;
import kostat.sop.ServiceAPI.controller.service.mapper.PolicyMapper;
import kostat.sop.ServiceAPI.controller.service.mapper.PolicyMypageMapper;


@Service("policyWriteService")
public class PolicyWriteServiceImpl extends EgovAbstractServiceImpl implements PolicyWriteService {

	private static final Logger logger = LoggerFactory.getLogger(PolicyWriteServiceImpl.class);
	
	@Resource(name="mapService")
	private MapService mapService;
	@Resource(name="mypageMapper")
	private MypageMapper mypageMapper;
	@Resource(name="policyMapper")
	private PolicyMapper policyMapper;
	@Resource(name="policyMypageMapper")
	private PolicyMypageMapper policyMypageMapper;
	@Resource(name="ssoService")
	private SSOService ssoService;
	
	@Override
	public String policyStaticMapLeftMenu(HttpServletRequest request, ModelMap model) throws SQLException {
		HashMap<String,Object> paramInfo = new HashMap<String,Object>();
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		HashMap<String,Object> tooltipInfo = new HashMap<String,Object>();
		mapParameter.put("menu_class_cd", "A0");
		List<?> tooltipList = mapService.selectTooltipInfo(mapParameter);
		
		for (int i=0; i<tooltipList.size(); i++) {
			HashMap<String,Object> map = (HashMap<String,Object>)tooltipList.get(i);
			String classCd = (String)map.get("menu_class_cd");
			String ttpId = (String)map.get("ttip_id");
			String exp = (String)map.get("ttip_exp");
			tooltipInfo.put(classCd + ttpId, exp);
		}
		paramInfo.put("tooltipList", tooltipInfo);
		model.addAttribute("paramInfo", paramInfo);
		mapParameter.put("data_type", "1");
		model.addAttribute("localGovernmentList", policyMapper.selectOpenDataNm(mapParameter));
		
		//2017.10.31 [개발팀]
		String usr_id = request.getSession().getAttribute("member_id").toString();
		mapParameter.put("member_id", usr_id);
		try {
			Map member = (Map)ssoService.memberInfo(mapParameter);
			String grade = (String)member.get("member_grade");
			String name = (String)member.get("member_nm");
			mapParameter.put("grade", grade);
			mapParameter.put("member_nm", name);
			mapParameter.put("spacial_data_type_cd", "03");
			mapParameter.put("info_link_srv_nm_cd", "01"); 
			model.addAttribute("lbdmsList", policyMapper.getLbdmsList(mapParameter));
		} catch (SQLException e) {
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		return "policyWrite/policyWriteMapLeftMenu"; //2017.08.13 [개발팀] jsp변경
	}

	@Override
	public String policyWriteMapRightMenu(HttpServletRequest request, ModelMap model) throws SQLException {
		//2017.10.31 [개발팀]
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		mapParameter.put("data_type", "2");
		model.addAttribute("localGovernmentList", policyMapper.selectOpenDataNm(mapParameter));
		String usr_id = request.getSession().getAttribute("member_id").toString();
		mapParameter.put("member_id", usr_id);
		try {
			Map member = (Map)ssoService.memberInfo(mapParameter);
			String grade = (String)member.get("member_grade");
			String name = (String)member.get("member_nm");
			mapParameter.put("grade", grade);
			mapParameter.put("member_nm", name);
			mapParameter.put("spacial_data_type_cd", "01");
			mapParameter.put("info_link_srv_nm_cd", "01"); 
			model.addAttribute("lbdmsList", policyMapper.getLbdmsList(mapParameter));
		} catch (SQLException e) {
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
		}
		return "policyWrite/policyWriteMapRightMenu";
	}
	@Override
	public String mydataList(HttpServletRequest request) throws SQLException {
		HashMap<String,Object> hm = new HashMap<String,Object>();
		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
		String index = request.getParameter("index");
		String usr_id = request.getSession().getAttribute("member_id").toString();
		mapParameter.put("usr_id", usr_id);
		mapParameter.put("map_disp_type", request.getParameter("map_disp_type"));
		if(!StringUtils.isNumeric(index)){
			index = "1";
		}
		int page = Integer.parseInt(index);
		int count = policyMypageMapper.SelectListMyDataCount(mapParameter);
		int pageCount = (int) Math.ceil((double)count/(double)5);
		int startPage = (page-1)/5 * 5+1;
		int endPage = startPage + 5 -1;
		
		if(endPage > pageCount){
			endPage = pageCount;
		}
		
		int startRow = ((page -1) *5)+1;
		int endRow = startRow + 5 -1;
		mapParameter.put("startRow", Integer.toString(startRow));
		mapParameter.put("endRow", Integer.toString(endRow));
		//최대 보여줄 개수 4개씩
		List<HashMap<String,Object>> list = policyMypageMapper.SelectListMyData(mapParameter);
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("list", list);
		data.put("page",page);
		data.put("count", count);
		data.put("pageCount", pageCount);
		data.put("startPage", startPage);
		data.put("endPage", endPage);
		hm.put("data", data);
		JSONObject obj = new JSONObject(hm);
		return obj.toString();
	}
	
	//=========================== 2017.09.06 [개발팀] START ========================//
	
		/**
		 * 정책통계지도 조회
		 * @param mapParameter
		 * @exception Exception
		 */
		public Map getPolicyMap(Map mapParameter) throws SQLException {
			return policyMapper.getPolicyMap(mapParameter);
		}
		
		/**
		 * 정책통계지도 등록
		 * @param mapParameter
		 * @exception Exception
		 */
		public int insertPolicyMap(Map mapParameter) throws SQLException {
			return policyMapper.insertPolicyMap(mapParameter);
		}
		
		/**
		 * 정책통계지도 삭제
		 * @param mapParameter
		 * @exception Exception
		 */
		public int deletePolicyMap(Map mapParameter) throws SQLException {
			return policyMapper.deletePolicyMap(mapParameter);
		}
		
		/**
		 * 정책통계지도 수정
		 * @param mapParameter
		 * @exception Exception
		 */
		public int updateOpenYnPolicyMap(Map mapParameter) throws SQLException {
			return policyMapper.updateOpenYnPolicyMap(mapParameter);
		}
		
		/**
		 * 정책통계지도 파라미터정보 등록
		 * @param mapParameter
		 * @exception Exception
		 */
		public int insertPolicyParamInfo(Map mapParameter) throws SQLException {
			return policyMapper.insertPolicyParamInfo(mapParameter);
		}
		
		/**
		 * 정책통계지도 파라미터정보 삭제
		 * @param mapParameter
		 * @exception Exception
		 */
		public int deletePolicyParamInfo(Map mapParameter) throws SQLException {
			return policyMapper.deletePolicyParamInfo(mapParameter);
		}
		
		/**
		 * 연관정책통계지도 등록
		 * @param mapParameter
		 * @exception Exception
		 */
		public int insertRelPolicyMapInfo(Map mapParameter) throws SQLException {
			return policyMapper.insertRelPolicyMapInfo(mapParameter);
		}
		
		/**
		 * 연관정책통계지도 삭제
		 * @param mapParameter
		 * @exception Exception
		 */
		public int deleteRelPolicyMapInfo(Map mapParameter) throws SQLException {
			return policyMapper.deleteRelPolicyMapInfo(mapParameter);
		}
		
		/**
		 * 산업분류코드 조회
		 * @param mapParameter
		 * @exception Exception
		 */
		public List getIndustryCode(Map mapParameter) throws SQLException {
			return policyMapper.getIndustryCode(mapParameter);
		}
		
		/**
		 * 테마코드 조회
		 * @param mapParameter
		 * @exception Exception
		 */
		public List getThemeCode(Map mapParameter) throws SQLException {
			return policyMapper.getThemeCode(mapParameter);
		}
		
		/**
		 * 산업분류/테마 POI조회
		 * @param mapParameter
		 * @exception Exception
		 */
		public List getCompanyPoiList(Map mapParameter) throws SQLException {
			return policyMapper.getCompanyPoiList(mapParameter);
		}
		
		/**
		 * 협업형데이터 POI조회
		 * @param mapParameter
		 * @exception Exception
		 */
		public List getLocalGovernmentPoiList(Map mapParameter) throws SQLException {
			return policyMapper.getLocalGovernmentPoiList(mapParameter);
		}
		
		/**
		 * LBDMS데이터 POI조회
		 * @param mapParameter
		 * @exception Exception
		 */
		public List getLbdmsPoiList(Map mapParameter) throws SQLException {
			return policyMapper.getLbdmsPoiList(mapParameter);
		}
			
		//=========================== 2017.09.06 [개발팀] END ========================//
}