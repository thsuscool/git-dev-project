package kostat.sop.ServiceAPI.api.board;


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
 * 1. 기능 : 예제.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : j.h.Seok, 1.0, 2014/08/20  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : j.h.Seok
 * @version 1.0
 * @see
 * <p/>
 */
public class BoardLists extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BoardLists.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8002";
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
		board_cd,
		page_num
	}
	
	enum OptionParam
	{
		post_title,
		post_content,
		post_all,
		low_rank_s_class_cd,
		reg_member_id
	}
	
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
			
			String id = (String)httpSession.getAttribute("member_id");
		
			int totalCount = (int) session.selectOne("board.boardCnt", mapParameter);
			int pageSize = 10;
			int curPage = Integer.parseInt((String)mapParameter.get(MustParam.page_num.name()));
			
			// 2016.12.02 시큐어코딩 삭제
			int totalPage = ((totalCount - 1) / pageSize) + 1;
			int lastNum = (totalCount - (curPage - 1) * pageSize) + 1;
			
			mapParameter.put("page_size", pageSize);
			mapParameter.put("last_num", lastNum);
			mapParameter.put("page_num", curPage);
			
			List summaryList;
			
			//mng_s  20170712 이경현 언론소개자료 게시판 수정



			if(mapParameter.get("board_cd").equals("BOARD_010")){
				
				summaryList = (List) session.selectList("board.boardLists2", mapParameter);
			}else{
				summaryList = (List) session.selectList("board.boardLists", mapParameter);
			}
			
			//mng_e  20170712 이경현 언론소개자료 게시판 수정
			
			for(int i = 0; i < summaryList.size(); i++) {
				Map tempMap = (Map)summaryList.get(i);
				String postNo = Integer.toString((Integer)tempMap.get("post_no"));
				
				Map tempParam = new HashMap();
				tempParam.put("board_cd", (String) mapParameter.get(MustParam.board_cd.name()));
				tempParam.put("post_no", postNo);
				
				List listReplies = (List) session.selectList("board.boardListsReply", tempParam);
				
				tempMap.put("reply", listReplies);
				
				String regId = (String)tempMap.get("reg_member_id");
				if(id != null && regId != null && regId.equals(id)) {
					tempMap.put("modifyMode", true);
				} else {
					tempMap.put("modifyMode", false);
				}
			}
			
			resultData.put("summaryList", summaryList);
			resultData.put("total_count", totalCount);
			resultData.put("pageSize", pageSize);
			resultData.put("curPage", curPage);
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