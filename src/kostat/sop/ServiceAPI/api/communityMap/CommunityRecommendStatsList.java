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
 * 1. 기능 : 소통지도 추천통계 리스트<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 :  1.0, 2016/03/15  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 나광흠
 * @version 1.0
 * @see
 * <p/>
 */
public class CommunityRecommendStatsList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityRecommendStatsList.class);
	@Override
	public String getApiId() {
		return "100004";
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
		cmmnty_map_id//통계 소통지도 일련번호
	}

	enum OptionParam{
	}

	@Override
	public HashMap<String,Object> executeAPI(
			HttpServletRequest req, 
			HttpServletResponse res,
			String trId) throws AbsException {
		HashMap<String,Object> result = new HashMap<String,Object>();
		httpSession = req.getSession();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			if(httpSession.getAttribute("member_id")==null){
				throw new ApiException("로그인이 필요합니다.");
			}else{
				mapParameter.put("member_id",httpSession.getAttribute("member_id"));
				HashMap<String,Object> member = session.selectOne("member.memberInfo", mapParameter);
				if(member==null||!"PM".equals(member.get("member_grade"))){
					throw new ApiException("권한이 존재하지 않습니다");
				}else{
					mapParameter.put("recmd_stat_yn", "Y");
					result.put("recommend", session.selectList("communityEtc.selectMapList",mapParameter));
					mapParameter.put("recmd_stat_yn", "N");
					result.put("map", session.selectList("communityEtc.selectMapList",mapParameter));
					result.put("hist", session.selectList("communityEtc.selectRecomendHistList",mapParameter));
				}
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");
			return result;
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
	}
}
