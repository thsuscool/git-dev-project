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
 * 1. 기능 : 소통지도 공지사항 목록<p>
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
public class CommunityNoticeList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(CommunityNoticeList.class);
	@Override
	public String getApiId() {
		return "100041";
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
		cmmnty_map_id
	}

	enum OptionParam{
		page_num,
		search_word,
		pageSize
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
			int totalCount = 0;
			List<?> summaryList = new ArrayList<Object>();
			totalCount = (int) session.selectOne("communityNotice.selectCmmntyNoticeCount", mapParameter);
			int pageSize = req.getParameter("pageSize")==null?5:Integer.parseInt(mapParameter.get("pageSize").toString());
			int curPage = req.getParameter("page_num")==null?1:Integer.parseInt(mapParameter.get("page_num").toString());
			int lastNum = pageSize*(curPage-1) + 1;
			if(curPage == 1){
				lastNum = 0;
			}
			mapParameter.put("page_size", pageSize);
			mapParameter.put("last_num", lastNum);
			mapParameter.put("page_num", curPage);
			summaryList = session.selectList("communityNotice.selectCmmntyNoticeList", mapParameter);

			resultData.put("summaryList", summaryList);
			resultData.put("total_count", totalCount);

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
