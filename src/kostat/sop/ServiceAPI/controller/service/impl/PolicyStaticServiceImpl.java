//========== 2017.08.11 [개발팀] 정책통계지도 PolicyStaticServiceImpl추가  START ==========//
package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.controller.service.PolicyStaticService;
import kostat.sop.ServiceAPI.controller.service.mapper.MypageMapper;
import kostat.sop.ServiceAPI.controller.service.mapper.PolicyMapper;
import kostat.sop.ServiceAPI.controller.service.mapper.PolicyMypageMapper;

import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


@Service("policystaticService")
public class PolicyStaticServiceImpl extends EgovAbstractServiceImpl implements PolicyStaticService {

	private static final Logger logger = LoggerFactory.getLogger(PolicyStaticServiceImpl.class);
	
	@Resource(name="policyMapper")
	private PolicyMapper policyMapper;
	
	@Override
	public List<Map> policyStaticCategoryList() throws SQLException {
		return policyMapper.policyStaticCategoryList();
	}
}
//========== 2017.08.11 [개발팀] 정책통계지도 PolicyStaticServiceImpl추가  END ==========//