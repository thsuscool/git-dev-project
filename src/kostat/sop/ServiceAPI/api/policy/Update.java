package kostat.sop.ServiceAPI.api.policy;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 정책통계지도 수정 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 나광흠, 1.0, 2017/1/3  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */

public class Update extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(Update.class);
	@Override
	public String getApiId() {
		return "100406";
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
		policy_stat_map_serial,
		title,
		exp,
		url
	}
	enum OptionParam{
		cmmnty_map_id
	}

	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();

		HashMap<String,Object> result =  new HashMap<String,Object>();
		Map<String,Object> mapParameter = getParameterMap(req);
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			mapParameter.put("policy_stat_map_serial",mapParameter.get("policy_stat_map_serial"));
			mapParameter.put("title",mapParameter.get("title"));
			mapParameter.put("exp",mapParameter.get("exp"));
			mapParameter.put("url",mapParameter.get("url"));
			HashMap map = session.selectOne("policyStatic.selectPolicy", mapParameter);
			String mem_id = (String)map.get("reg_member_id");
			if(httpSession.getAttribute("member_id").equals(mem_id)){
				session.update("policyStatic.updatePolicy",mapParameter);
				session.delete("policyStatic.deleteCommunity",mapParameter);
				if(mapParameter.get("cmmnty_map_id")!=null){
					String text = (String)mapParameter.get("cmmnty_map_id");
					String[] mapId = text.split(",");
					//System.out.println("mapId = "+mapId); //2017.12.04 [개발팀] 시큐어코딩
					for(int i=0;i<mapId.length;i++){
						mapParameter.put("cmmnty_map_id",mapId[i]);
						session.insert("policyStatic.insertCommunity",mapParameter);
					}
				}
					
			}
			_checkNullParameterValue(mapParameter);
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("메뉴정보를 확인 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
}
