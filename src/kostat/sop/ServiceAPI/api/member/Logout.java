package kostat.sop.ServiceAPI.api.member;

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
 * 1. 기능 : 회원 로그아웃 처리 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/13  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class Logout extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(Logout.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2010";
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
	}
	
	enum OptionParam
	{	
	}
	
	@SuppressWarnings("unchecked")
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

			//로그오프 시간 업데이트
			mapParameter.put("member_key", (String) httpSession.getAttribute("member_key"));
			session.update("member.updateLastLogout", mapParameter);
			
			// 사용자 세션정보 삭제
			//req.getSession().removeAttribute("sessionId");		//세션 고유 ID
			req.getSession().removeAttribute("member_key");		//회원키
			req.getSession().removeAttribute("member_id");		//아이디
			req.getSession().removeAttribute("member_nm");		//이름
			req.getSession().removeAttribute("member_grade");	//회원등급
			req.getSession().removeAttribute("intgr_login_yn");	//통합회원여부
			req.getSession().removeAttribute("member_pw");
			req.getSession().removeAttribute("member_sn");
			req.getSession().removeAttribute("login_yn");
			req.getSession().removeAttribute("member_gubun");
			req.getSession().removeAttribute("birth");
			
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
		return resultData;
	}
}