package kostat.sop.ServiceAPI.api.communityMap;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 참여자 목록<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/01/17  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityMemberList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityMemberList.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100050";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		cmmnty_map_id,
		bnd_year
	}

	enum OptionParam{
		search_member_type,
		search_member_word,
		page_num,
		pageSize
	}

	@Override
	public HashMap<String,Object> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			communityService.dollarQueryReplace(mapParameter);
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(!community.get("usr_id").equals(login_id)){
				throw new ApiException("회원 관리 권한이 존재하지 않습니다");
			}else{
				int totalCount = 0;
				List<?> summaryList = new ArrayList<Object>();
				if(community.get("cmmnty_partcptn_grant_yn").equals("Y")){
					totalCount = (int) session.selectOne("communityApproval.selectCmmntyApprovalCount", mapParameter);
				}else if(community.get("cmmnty_partcptn_grant_yn").equals("M")){
					totalCount = (int) session.selectOne("communityRegistMember.selectCmmntyMapRegMberCount", mapParameter);
				}else{
					throw new ApiException("회원리스트를 확인할 수 없는 소통지도입니다");
				}
				int pageSize = req.getParameter("pageSize")==null?5:Integer.parseInt(mapParameter.get("pageSize").toString());
				int curPage = req.getParameter("page_num")==null?1:Integer.parseInt(mapParameter.get("page_num").toString());
				int lastNum = pageSize*(curPage-1) + 1;
				if(curPage == 1){
					lastNum = 0;
				}
				mapParameter.put("page_size", pageSize);
				mapParameter.put("last_num", lastNum);
				mapParameter.put("page_num", curPage);
				if(community.get("cmmnty_partcptn_grant_yn").equals("Y")){
					summaryList = session.selectList("communityApproval.selectCmmntyApprovalList", mapParameter);
					List<HashMap<String,Object>> approvalDistinctList = session.selectList("communityApproval.selectApprovalDistinctList", mapParameter);
					HashMap<Object,Object> approvalDistinct = new HashMap<Object,Object>();
					for(HashMap<String,Object> data:approvalDistinctList){
						approvalDistinct.put(data.get("approval_distinct"), data.get("cnt"));
					}
					resultData.put("approval", approvalDistinct);
				}else if(community.get("cmmnty_partcptn_grant_yn").equals("M")){
					summaryList = session.selectList("communityRegistMember.selectCmmntyMapRegMberList", mapParameter);
				}
				resultData.put("cmmnty_partcptn_grant_yn", community.get("cmmnty_partcptn_grant_yn"));
				resultData.put("summaryList", summaryList);
				resultData.put("total_count", totalCount);
			}

			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}
}
