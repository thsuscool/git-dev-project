//========== 2017.08.30 [개발팀] 연관정책통계지도 호출  START ==========//
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
 * 1. 기능 : 정책통계지도 API 지역에 따른 카테고리 갯수 조회<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김보민 1.0, 2017/08/10  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김보민
 * @version 1.0
 * @see
 * <p/>
 */
public class GetRelationPolicyMapList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetRelationPolicyMapList.class);
	@Override
	public String getApiId() {
		return "100420";
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
			
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			if(login_id == null){
				throw new ApiException("세션정보가 만료되었습니다.");
			}
			
			mapParameter.put("member_id",login_id);
			List<Map> result = session.selectList("policyStatic.selectRelationPolicyMapList",mapParameter);
			resultData.put("policyMapList", result);
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