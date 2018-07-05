package kostat.sop.ServiceAPI.api.policy;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 정책통계지도 목록<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠 1.0, 2016/01/04  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠 
 * @version 1.0
 * @see
 * <p/>
 */
public class PolicyList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(PolicyList.class);
	@Override
	public String getApiId() {
		return "100403";
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
	}

	enum OptionParam{
		page_num,
		pageSize,
		sido_cd,
		sgg_cd,
		search_word
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
			
			int pageSize = req.getParameter("pageSize")==null?5:Integer.parseInt(mapParameter.get("pageSize").toString());
			int curPage = req.getParameter("page_num")==null?1:Integer.parseInt(mapParameter.get("page_num").toString());
			int lastNum = pageSize*(curPage-1) + 1;
			if(curPage == 1){
				lastNum = 0;
			}
			mapParameter.put("page_size", pageSize);
			mapParameter.put("last_num", lastNum);
			mapParameter.put("page_num", curPage);
			String region_cd = null;
			if(StringUtils.isNumeric(req.getParameter("sido_cd"))&&!"00".equals(req.getParameter("sido_cd"))){
				region_cd = req.getParameter("sido_cd");
				if(req.getParameter("sgg_cd")!=null&&req.getParameter("sgg_cd")!=""&&!"999".equals(req.getParameter("sgg_cd"))){
					if(req.getParameter("sgg_cd").indexOf(",")>-1){
						mapParameter.put("region_cd_type", "list");
						List<String> region_cd_list = new ArrayList<String>();
						String[] sggArray = req.getParameter("sgg_cd").split(",");
						for(int i=0;i<sggArray.length;i++){
							region_cd_list.add(req.getParameter("sido_cd")+sggArray[i]);
						}
						mapParameter.put("region_cd_list", region_cd_list);
					}else{
						region_cd += req.getParameter("sgg_cd");
					}
				}
			}
			mapParameter.put("region_cd", region_cd);
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id",login_id);
			resultData.put("summaryList", session.selectList("policyStatic.selectPolicyList",mapParameter));
			resultData.put("total_count", session.selectOne("policyStatic.selectPolicyCount", mapParameter));
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
