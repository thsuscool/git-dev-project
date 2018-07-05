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
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

/**
 * 1. 기능 : 회원 로그인 처리 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/12  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class Login extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(Login.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2000";
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
		member_id, pw
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
			
			System.out.println("[Login.java] Login.java 시작======================================");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			//비밀번호 SHA256 암호화
			String pw = (String) mapParameter.get(MustParam.pw.name());
			
			//실환경 =======================================================
			//pw = SecureDB.encryptSha256(pw); //상용일때 꼭 풀어주세요. 로컬용은 주석처리 요망
			pw = "0nxbLbfcOSoM/rGLl4LzRwnR3qe9uN1yCfbUxzh8eRA="; //test1234!
			//실환경 =======================================================
			
			
			mapParameter.put(MustParam.pw.name(), pw);
			
			//아이디로 정보를 조회한 후 코드에서 비밀번호를 비교
			Map memberInfo = (Map) session.selectOne("member.memberLoginInfo", mapParameter);
			
			//if(memberInfo == null) {
			if(memberInfo == null) {
				throw new ApiException("아이디 또는 비밀번호를 다시 확인하세요.", COMM_ERR_CODE.NO_RESULT);
			}
			
			
			mapParameter.put("member_key", memberInfo.get("member_key"));
			
			//로그인 실패 횟수
			short failCnt = (Short) memberInfo.get("pw_fail_cnt");
			if(failCnt >= 5) {
				throw new ApiException("비밀번호를 5회 이상 틀렸기 때문에 사용 제한이 되었습니다.<br/>통합관리자에게 문의 바랍니다.");
			}
			
			//비밀번호 불일치
			String resultPw = (String) memberInfo.get("pw");
			
			//Local 전용 ========================================================
			// =================== 실환경 사용시 주석처리 요망 =====================
			 pw = (String) memberInfo.get("pw");
			 mapParameter.put("pw", pw);
			//Local 전용 ========================================================
						
			
			if(!resultPw.equals(pw)) {
				//로그인 실패 횟수 + 1
				mapParameter.put("pw_fail_cnt", failCnt+1);
				//test 임시 주석처리
				session.update("member.updatePwFailCnt", mapParameter);
				
				if(failCnt >= 4) {
					throw new ApiException("비밀번호를 5회 이상 틀렸기 때문에 사용 제한이 되었습니다.<br/>통합관리자에게 문의 바랍니다.");
				} else {
					throw new ApiException(/*"비밀번호를 " + (failCnt+1) + "회 틀렸습니다. <br/> 5회 이상 실패시 접속이 제한됩니다."*/ "아이디 또는 비밀번호를 다시 확인하세요.");
				}
			}
			
			//로그인 제한
			String login_limit_yn = (String) memberInfo.get("login_limit_yn");
			if(login_limit_yn.equals("Y")) {
				throw new ApiException("사용 제한이 되었습니다.<br/>통합관리자에게 문의 바랍니다.");
			}
			
			//로그인 실패 횟수 0으로 초기화
			mapParameter.put("pw_fail_cnt", 0);
			session.update("member.updatePwFailCnt", mapParameter);
			
			resultData.put("last_access_ip", memberInfo.get("last_access_ip"));		//최종접속IP주소
			resultData.put("last_access_dt", memberInfo.get("last_access_dt"));			//최종접속일자

			//현재 로그인한 아이피주소와 현재 시간으로 업데이트
			/*
			HttpServletRequest svlRequest = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
			String ip = req.getHeader("X-FORWARDED-FOR");
			if(ip == null) {
				ip = svlRequest.getRemoteAddr();
			}
			mapParameter.put("last_access_ip", ip);
			*/
			mapParameter.put("last_access_ip", req.getRemoteAddr());
			session.update("member.updateLastConn", mapParameter);
			
			//분기 1회 이상 비밀변호 변경이 없을 경우 (93일 이전)
			int pwChgCnt = (Integer) session.selectOne("member.getPWChangeChk", mapParameter);
			resultData.put("pwChgCnt", pwChgCnt);
			
			// 사용자 세션정보 등록
			//========================== 9월버전에서 주석처리
			//req.getSession().setAttribute("sessionId", httpSession.getId());					//세션 고유 ID
			
			req.getSession().setAttribute("member_key", memberInfo.get("member_key"));			//회원키
			req.getSession().setAttribute("member_id", memberInfo.get("member_id"));				//아이디
			req.getSession().setAttribute("member_nm", memberInfo.get("member_nm"));				//이름
			req.getSession().setAttribute("member_grade", memberInfo.get("member_grade"));		//회원등급
			
			//req.getSession().setAttribute("sc_telephone", SecureDB.decryptAria256((String)memberInfo.get("cp_no")));
			//req.getSession().setAttribute("cp_no", SecureDB.decryptAria256((String)memberInfo.get("cp_no")));
			//req.getSession().setAttribute("sc_email", SecureDB.decryptAria256((String)memberInfo.get("email")));
			//req.getSession().setAttribute("email", SecureDB.decryptAria256((String)memberInfo.get("email")));
			req.getSession().setAttribute("sc_userkey", memberInfo.get("member_id")); //member_key값을 넣어야하지만 조건이 않맞아 member_id를 넣는다.
			
			//========================== 9월버전에서 주석해제
			req.getSession().setAttribute("intgr_login_yn", memberInfo.get("combine_login_yn"));	//통합회원여부
			
			//logger.debug("[Login.java] - SecureDB.decryptAria256((String)memberInfo.get(\"member_key\"))[" + SecureDB.decryptAria256((String)memberInfo.get("member_key")) + "] ");
			
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