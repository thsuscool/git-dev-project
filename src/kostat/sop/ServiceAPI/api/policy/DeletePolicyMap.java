
package kostat.sop.ServiceAPI.api.policy;


import java.text.SimpleDateFormat;
import java.util.Date;
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
import kostat.sop.ServiceAPI.controller.service.PolicyWriteService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * 1. 기능 : 정책통계지도 API 정책통계지도 등록<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김보민 1.0, 2017/089/06  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 권차욱
 * @version 1.0
 * @see
 * <p/>
 */
public class DeletePolicyMap extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(DeletePolicyMap.class);
	
	@Resource(name = "policyWriteService")
	private PolicyWriteService policyWriteService;
	
	@Override
	public String getApiId() {
		return "100422";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		category_id,
		idx_id
	}

	enum OptionParam{

	}
	
	@Override
	public Map executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		Map resultData = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			//사용자 아이디
			String member_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id",member_id);
			
			Map policyMapInfo = policyWriteService.getPolicyMap(mapParameter);
			if (policyMapInfo != null) {
				String usr_id = (String)policyMapInfo.get("usr_id");
				if (usr_id.equals(member_id)) {
					//지표 삭제
					int result = policyWriteService.deletePolicyMap(mapParameter);
					if (result == 1) {
						policyWriteService.deletePolicyParamInfo(mapParameter);
						policyWriteService.deleteRelPolicyMapInfo(mapParameter);
					}
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
//========== 2017.08.10 [개발팀] 정책통계지도 카테고리별 갯수조회  END ==========//