package kostat.sop.ServiceAPI.api.board;


import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
public class BoardGridRegist extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BoardGridRegist.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10600";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return null;
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
	
	enum OptionParam
	{
		  post_no
		, post_title
		, LOW_RANK_S_CLASS_CD
		, post_content
		, boanCode
		, file
		, file_id
		, file_content
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		Map result = new HashMap();
		
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			
			
			//	session.insert("edu.eduBoardReg", mapParameter);
				
			String captchaId = httpSession.getId();
			String response = (String) mapParameter.get("boanCode");
			
			Boolean isResponseCorrect = false;
			
			isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response);
			
			result.put("isResponseCorrect", isResponseCorrect);
			if (!isResponseCorrect) {
				return result;
			}else{
				
				String userId = (String)req.getSession().getAttribute("member_id");
				
				if(userId == null){
					userId = "guest";
				}
				
				
				mapParameter.put("reg_member_id",userId);
				
				
			/*	if(null == mapParameter.get("ref_file")){
					mapParameter.put("ref_file" , "");
					mapParameter.put("real_file_name" , "");
				}*/
				
				
				String contentStr = (String)mapParameter.get("post_content");
				contentStr = contentStr.replaceAll("\n" , "<br />");
				
				mapParameter.put("post_content", contentStr);
				mapParameter.put("FILE_YN", "N");
				
				session.insert("board.boardGridRegist", mapParameter);
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
}