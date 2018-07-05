package kostat.sop.ServiceAPI.api.communityMap;


import java.util.ArrayList;
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
 * 1. 기능 : 소통지도 POI<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/01/14  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityPoi extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityPoi.class);
	@Override
	public String getApiId() {
		return "100010";
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
		cmmnty_poi_id
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
			mapParameter.put("member_id", login_id);
			mapParameter.put("getPw", null);
			List<HashMap<String,Object>> replyList = new ArrayList<HashMap<String,Object>>();

			HashMap<String,Object> summary = session.selectOne("communityPoi.selectCmmntyPoi", mapParameter);
			resultData.put("summary", summary);
			mapParameter.put("cmmnty_map_id", summary.get("cmmnty_map_id"));
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(summary!=null){
				if(community.get("cmmnty_partcptn_grant_yn").equals("P")&&!community.get("usr_id").equals(login_id)){
					summary.put("usr_id", summary.get("usr_id").toString().substring(0,2)+summary.get("usr_id").toString().substring(2).replaceAll(".", "*"));
					mapParameter.put("replace_usr_id", "Y");
				}
				replyList = session.selectList("communityPoiReply.selectPoiReplyList", mapParameter);
				resultData.put("fileList", session.selectList("communityPoi.selectPoiAtchImageList", mapParameter));
				if((summary.get("is_register").equals("Y")&&!community.get("cmmnty_partcptn_grant_yn").equals("M")&&!community.get("cmmnty_partcptn_grant_yn").equals("P"))||summary.get("is_master").equals("Y")){
					resultData.put("sttemntList", session.selectList("communityPoiSttemnt.selectPoiSttemntList", mapParameter));
				}
			}
			resultData.put("replyList", replyList);

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
