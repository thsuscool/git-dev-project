package kostat.sop.ServiceAPI.api.board;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.board.BoardListsView.MustParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.CaptchaServiceSingleton;
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
public class BoardModify extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BoardModify.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8005";
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
		post_no,
		input_code
	}
	
	enum OptionParam
	{
		post_title,
		post_title_en,
		post_content,
		priority_disp_yn,
		low_rank_s_class_cd
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		Boolean isResponseCorrect = false;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String captchaId = httpSession.getId();
			String response = (String) mapParameter.get(MustParam.input_code.name());
			isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response);
			if (!isResponseCorrect) {
				throw new ApiException("보안코드를 다시 입력하여 주세요.");
			}else {
				String boardTitle = "";
				boardTitle = mapParameter.get(OptionParam.post_title.name()).toString();
				boardTitle = Security.cleanXss(boardTitle);
				mapParameter.put(OptionParam.post_title.name(), boardTitle);
				
				String boardContent = "";
				boardContent = mapParameter.get(OptionParam.post_content.name()).toString();
				boardContent = Security.cleanXss(boardContent);
				mapParameter.put(OptionParam.post_content.name(), boardContent);
				mapParameter.put("board_cd", "BOARD_003");
				
				
				//mng_s 20170905 웹취약점 수정
				
				String userId = (String)req.getSession().getAttribute("member_id");
				
				List summaryList = (List) session.selectList("board.boardListsView", mapParameter);
				Map tempParam = new HashMap();
				tempParam = (HashMap)summaryList.get(0);
				String reg_member_id = tempParam.get("reg_member_id").toString();
				if(userId.equals(reg_member_id)){
					session.update("board.boardModify", mapParameter);
				}
				//mng_e 20170905 웹취약점 수정
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