package kostat.sop.ServiceAPI.api.communityMap;


import java.util.HashMap;
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
 * 1. 기능 : 소통지도 공지사항 삭제<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/10/19  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityNoticeDelete extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityNoticeDelete.class);
	@Override
	public String getApiId() {
		return "100045";
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
		cmmnty_map_indvdlz_notice_id
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
			HashMap<String,Object> notice = session.selectOne("communityNotice.selectCmmntyNotice", mapParameter);
			HashMap<String,Object> community = session.selectOne("communityMap.selectCmmnty", mapParameter);
			if(this.validation(login_id, community, notice, mapParameter)){
				session.delete("deleteCmmntyNoticeFileForId",mapParameter);
				int delete = (int)session.delete("deleteCmmntyNotice",mapParameter);
				resultData.put("success", delete>0);
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
	private boolean validation(String login_id,HashMap<String,Object> community,HashMap<String,Object> notice,Map<String,Object> mapParameter){
		if(login_id==null){
			throw new ApiException("로그인 후 작성가능합니다");
		}else if(community==null){
			throw new ApiException("소통지도가 존재하지 않습니다");
		}else if(notice==null){
			throw new ApiException("공지사항이 존재하지 않습니다");
		}else if(!community.get("usr_id").equals(login_id)||!notice.get("usr_id").equals(login_id)){
			throw new ApiException("삭제 권한이 존재하지 않습니다");
		}else{
			return true;
		}
	}
}
