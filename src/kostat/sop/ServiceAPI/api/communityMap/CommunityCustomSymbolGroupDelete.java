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
 * 1. 기능 : 소통지도 커스텀 심볼 그룹 삭제<p>
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
public class CommunityCustomSymbolGroupDelete extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityCustomSymbolGroupDelete.class);
	@Override
	public String getApiId() {
		return "100072";
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
		return "communityCustomSymbol.deleteCommunityCustomSymbolGroup";
	}

	enum MustParam{
		custom_symbol_group_id
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
			Map<String,Object> mapParameter = getParameterMap(req);
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			if(httpSession.getAttribute("member_id")==null){
				throw new ApiException("로그인이 필요합니다");
			}
			HashMap<String,Object> symbolGroup = session.selectOne("communityCustomSymbol.selectCommunityCustomSymbolGroup",mapParameter.get("custom_symbol_group_id").toString());
			int hasCount = session.selectOne("communityCustomSymbol.selectCommunityFromCustomSymbolGroup",mapParameter);
			if(hasCount>0){
				throw new ApiException("해당 그룹을 사용하는 곳이 있습니다.<br/>사용하는 곳이 있으면 삭제 및 수정을 하실 수 없습니다.");
			}else {
				if(symbolGroup.get("usr_id").equals(httpSession.getAttribute("member_id").toString())){
					mapParameter.put("member_id", httpSession.getAttribute("member_id").toString());
					session.delete("communityCustomSymbol.deleteCommunityCustomSymbolAtchImage",mapParameter);
					session.delete("communityCustomSymbol.deleteCommunityCustomSymbol",mapParameter);
					resultData.put("success", session.delete(getQueryStr(),mapParameter)>0);
				}else{
					throw new ApiException("자신이 등록한 그룹만 삭제가 가능합니다");
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
