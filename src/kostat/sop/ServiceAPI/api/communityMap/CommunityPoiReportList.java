package kostat.sop.ServiceAPI.api.communityMap;


import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.CommunityService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 소통지도 POI 신고 목록<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/05/16  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityPoiReportList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityPoiReportList.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100021";
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
		cmmnty_ipcd,
		cmmnty_ppcd
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
			communityService.replaceIdPw(mapParameter);
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
			mapParameter.put("member_id", login_id);
			mapParameter.put("getPw", "Y");
			HashMap<String,Object> communityPoi = session.selectOne("communityPoi.selectCmmntyPoi", mapParameter);
			mapParameter.put("cmmnty_map_id", communityPoi.get("cmmnty_map_id"));
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(communityPoi!=null){
				BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
				if(community.get("cmmnty_partcptn_grant_yn").equals("M")&&!communityPoi.get("is_master").equals("Y")){
					String pw = mapParameter.get("pw").toString();
					mapParameter.put("id",communityPoi.get("usr_id"));
					HashMap<String,Object> mber = session.selectOne("communityRegistMember.selectCmmntyMapRegMber", mapParameter);
					if(mber==null||!bcrypt.matches(pw,mber.get("pw").toString())){
						throw new ApiException("비밀번호를 확인해주세요");
					}else{
						resultData.put("sttemntList", session.selectList("communityPoiSttemnt.selectPoiSttemntList", mapParameter));
					}
				}else if(community.get("cmmnty_partcptn_grant_yn").equals("P")&&!communityPoi.get("is_master").equals("Y")){
					if(mapParameter.get("id")==null||community.get("usr_id").equals(mapParameter.get("id").toString())||!communityPoi.get("usr_id").equals(mapParameter.get("id"))){
						throw new ApiException("아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요");
					}else{
						String pw = mapParameter.get("pw").toString();
						String communityPw = session.selectOne("communityMap.selectCmmntyMapPassword", mapParameter);
						if(!bcrypt.matches(pw,communityPw)){
							throw new ApiException("아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요");
						}else{
							resultData.put("sttemntList", session.selectList("communityPoiSttemnt.selectPoiSttemntList", mapParameter));
						}
					}
				}else if(community.get("cmmnty_partcptn_grant_yn").equals("A")&&!communityPoi.get("is_master").equals("Y")){
					String pw = mapParameter.get("pw").toString();
					mapParameter.put("id",communityPoi.get("usr_id"));
					String poiPw = null;
					if(communityPoi.get("pw")!=null){
						poiPw = communityPoi.get("pw").toString();
					}
					if(!bcrypt.matches(pw,poiPw)){
						throw new ApiException("비밀번호를 확인해주세요");
					}else{
						resultData.put("sttemntList", session.selectList("communityPoiSttemnt.selectPoiSttemntList", mapParameter));
					}
				}else{
					if(communityPoi.get("is_register").equals("Y")||communityPoi.get("is_master").equals("Y")){
						resultData.put("sttemntList", session.selectList("communityPoiSttemnt.selectPoiSttemntList", mapParameter));
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
