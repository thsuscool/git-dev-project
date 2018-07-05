package kostat.sop.ServiceAPI.api.req;

import java.util.HashMap;
import java.util.List;
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

/**
 * 1. 기능 : 예제.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 *  <b>History:</b> 
 *     작성자 : jrj, 1.0, 2018/02/07  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 :
 * @version 1.0
 * @see <p/>
 */
public class ReqBoardList extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(ReqBoardList.class);

	@Override
	public String getApiId() {
		return "reqboard_list";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam {
		
	}

	enum OptionParam {
		page_num,
		searchWordType,
		searchWord
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();

		Map resultData = new HashMap();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			//_checkNullParameterValue(mapParameter);
			
			int totalCount = (int) session.selectOne("reqBoard.searchReqBoardCount", mapParameter);
			int pageSize = 10;
			int curPage = Integer.parseInt((String)mapParameter.get(OptionParam.page_num.name()));
			
			// 2016.12.02 시큐어코딩 삭제
			int totalPage = ((totalCount - 1) / pageSize) + 1;
			int lastNum = (totalCount - (curPage - 1) * pageSize) + 1;
			//int lastNum =  ( pageSize * curPage ) - pageSize;
			
			mapParameter.put("page_size", pageSize);
			mapParameter.put("last_num", lastNum);
			mapParameter.put("page_num", curPage);
			
			List list = (List) session.selectList("reqBoard.searchReqBoard", mapParameter);
			resultData.put("reqList", list);
			resultData.put("total_count", totalCount);
			resultData.put("pageSize", pageSize);
			resultData.put("curPage", curPage);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
		} catch (AbsAPIException e) {
			logger.error(e);
			e.printStackTrace();
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