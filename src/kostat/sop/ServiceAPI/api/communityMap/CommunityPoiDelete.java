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
 * 1. 기능 : 소통지도 POI 삭제<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/01/26  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityPoiDelete extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityPoiDelete.class);
	@Resource(name="communityService")
	private CommunityService communityService;
	@Override
	public String getApiId() {
		return "100014";
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
			mapParameter.put("getPw", "Y");
			HashMap<String,Object> communityPoi = session.selectOne("communityPoi.selectCmmntyPoi",mapParameter);
			mapParameter.put("cmmnty_map_id", communityPoi.get("cmmnty_map_id"));
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(this.validation(login_id,community, communityPoi,mapParameter)){
				session.delete("communityPoiSttemnt.deletePoiSttemnt",mapParameter);//신고 목록 삭제
				session.delete("communityPoi.deletePoiImags",mapParameter);//이미지 삭제
				session.delete("communityPoiReply.deletePoiReplys",mapParameter);//댓글 삭제
				resultData.put("success", session.update("communityPoi.deletePoi",mapParameter)>0);
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
	private boolean validation(String login_id,HashMap<String,Object> community,HashMap<String,Object> communityPoi,Map<String,Object> mapParameter) throws Exception,IllegalArgumentException{
		communityService.registCheckDate(community);
		if(communityPoi==null){
			throw new ApiException("등록되지 않은 자료입니다");
		}
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		if(community.get("cmmnty_partcptn_grant_yn").equals("M")&&!community.get("usr_id").equals(login_id)){
			mapParameter.put("id",communityPoi.get("usr_id"));
			String pw = mapParameter.get("pw").toString();
			HashMap<String,Object> mber = session.selectOne("communityRegistMember.selectCmmntyMapRegMber", mapParameter);
			if(mber==null||!bcrypt.matches(pw,mber.get("pw").toString())){
				throw new ApiException("비밀번호를 확인해주세요");
			}else{
				mapParameter.put("member_id", mapParameter.get("id"));
			}
		}else if(community.get("cmmnty_partcptn_grant_yn").equals("P")&&!community.get("usr_id").equals(login_id)){
			if(mapParameter.get("id")==null||community.get("usr_id").equals(mapParameter.get("id").toString())||!communityPoi.get("usr_id").equals(mapParameter.get("id"))){
				throw new ApiException("아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요");
			}else{
				String pw = mapParameter.get("pw").toString();
				String communityPw = session.selectOne("communityMap.selectCmmntyMapPassword", mapParameter);
				if(!bcrypt.matches(pw,communityPw)){
					throw new ApiException("아이디 또는 소통지도에 설정된 비밀번호를 확인해주세요");
				}else{
					mapParameter.put("member_id", mapParameter.get("id"));
				}
			}
		}else if(community.get("cmmnty_partcptn_grant_yn").equals("A")&&!community.get("usr_id").equals(login_id)){
			String pw = mapParameter.get("pw").toString();
			String poiPw = null;
			if(communityPoi.get("pw")!=null){
				poiPw = communityPoi.get("pw").toString();
			}
			if(!bcrypt.matches(pw,poiPw)){
				throw new ApiException("비밀번호를 확인해주세요");
			}else{
				mapParameter.put("member_id", mapParameter.get("id"));
			}
		}else{
			if(login_id==null){
				throw new ApiException("로그인 후 삭제가 가능합니다");
			}else if(!communityPoi.get("usr_id").equals(login_id)){
				throw new ApiException("권한이 존재하지 않습니다");
			}
		}
		return true;
	}
}
