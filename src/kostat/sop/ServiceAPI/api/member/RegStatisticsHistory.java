package kostat.sop.ServiceAPI.api.member;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFArray;
import com.neighborsystem.durian.restapi.model.NFData;

/**
 * 1. 기능 : 통계히스토리이력정보를 등록한다.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 1.0, 2014/10/08  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class RegStatisticsHistory extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(RegStatisticsHistory.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2015";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{		
		hist_id,
		hist_type,
		hist_nm,
		map_type,
		params
	}
	
	enum OptionParam
	{
		exp,
		data_id,
		title
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			
			_checkNullParameterValue(mapParameter);
			
			String member_id = (String)httpSession.getAttribute("member_id");
			//URL공유하기 메뉴 비로그인시 사용하기 위해 임의 아이디 지정(anonymousUserId)
			if(member_id == null) member_id = "anonymousUserId";	

			NFArray tmpData = new NFArray((String)mapParameter.get("params"));

			mapParameter.put("member_id", member_id);
			resultData.put("hist_nm", mapParameter.get("hist_nm"));
			
			//통계히스토리정보 등록
			session.insert("member.insertStatistcsHistoryInfo", mapParameter);
			
			//통계히스토리파라미터정보 등록	
			for (int i=0; i<tmpData.length(); i++) {
				NFData info = (NFData)tmpData.get(i);
				String param_info = (String)info.get("params").toString();
				mapParameter.put("seq", i+1);
				mapParameter.put("api_call_url",  info.get("url"));
				mapParameter.put("param_info",  param_info);
				
				session.insert("member.insertStatistcsHistoryParamInfo", mapParameter);
			}
			
			resultData.put("hist_id", mapParameter.get("hist_id"));
			resultData.put("hist_type", mapParameter.get("hist_type"));
			resultData.put("map_type", mapParameter.get("map_type"));
			resultData.put("exp", mapParameter.get("exp"));

			
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
