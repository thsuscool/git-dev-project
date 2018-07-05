//========== 2017.08.10 [개발팀] 정책통계지도 수정 저장 START ==========//
package kostat.sop.ServiceAPI.api.policy;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 정책통계지도 API 호출 정보<p>
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
public class SavePolicyStaticMap extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SavePolicyStaticMap.class);
	@Override
	public String getApiId() {
		return "100416";
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
		idx_id, policy_idx_nm, category_id, policy_idx_content, disp_unit, disp_nm
	}

	enum OptionParam{
		rel_policy_stat_map_id
	}
	
	@Override
	public HashMap<String, Object> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			session.update("policyStatic.updatePolicyStaticMap", mapParameter);   // 정책통계지도 저장
			
			session.update("policyStatic.updatePolicyMapApiParam", mapParameter);   // 정책통계지도 API PARAM 수정.
			
			session.update("policyStatic.deleteRelPolicyMapInfo", mapParameter);   // 연관정책통계지도 삭제
			
			String[] rel_map_ids = mapParameter.get("rel_policy_stat_map_id").toString().split(",");
			for ( String rel_id : rel_map_ids) {
				if(!"".equals(rel_id)) {
					mapParameter.put("rel_policy_stat_map_id", rel_id);
					session.insert("policyStatic.insertRelPolicyMapInfo", mapParameter);  // 연관정책통계지도 insert
				}
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
//========== 2017.08.10 [개발팀] 정책통계지도 수정 저장 END ==========//