package kostat.sop.ServiceAPI.controller.sso;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.security.Security; //2017.12.06 [개발팀] 취약점점검
import kostat.sop.ServiceAPI.common.util.StringUtil;		//<!-- //2015-09-10 수정 -->
import kostat.sop.ServiceAPI.controller.service.SSOService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 시스템접속 ( 시스템 영역 -> 통합인증영역 ).<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/07/29  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
public class SessionService {
	private final Log logger = LogFactory.getLog(SessionService.class);
	
	//통합인증 관련 서비스
	@Resource(name="ssoService")
	private SSOService ssoService;
	
	/**
	 * 통합인증서버에서 세션값을 받아온다.
	 * @param request
	 * @param response
	 * @return sso/returnAuth
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value="/view/service")
	public ModelAndView service(HttpServletRequest request, HttpServletResponse response) {
		
		Map map = request.getParameterMap();		
		logger.debug("#######SessionService######"+map);
		
		HttpSession httpSession = request.getSession();
		
		String birthDay = request.getParameter("USR_BIRTHDAY") == null ? "" : request.getParameter("USR_BIRTHDAY").toString();				//생년월일
		String name = request.getParameter("USR_NAME") == null ? "" : request.getParameter("USR_NAME").toString();							//이름
		String sex = request.getParameter("USR_SEX") == null ? "" : request.getParameter("USR_SEX").toString();								//성별
		if ("".equals(sex)) {
			sex = "M";
		}
			
		String memberId = request.getParameter("USR_ID") == null ? "" : request.getParameter("USR_ID").toString();							//통합이용자 아이디
		String memberSn = request.getParameter("USR_SN") == null ? "" : request.getParameter("USR_SN").toString();							//통합이용자 번호
		String memberPw = request.getParameter("USR_PW") == null ? "" : request.getParameter("USR_PW").toString();							//통합이용자 비밀번호
		String phoneNo = request.getParameter("USR_MOBILE") == null ? "" : request.getParameter("USR_MOBILE").toString();					//핸드폰번호
		String email = request.getParameter("USR_EMAIL") == null ? "" : request.getParameter("USR_EMAIL").toString();						//이메일
		String regDate = request.getParameter("JOIN_DATE") == null ? "" : request.getParameter("JOIN_DATE").toString();						//가입일자
		String accessIP = request.getParameter("SID_IP_ADDR") == null ? "" : request.getParameter("SID_IP_ADDR").toString();				//최종접속 IP
		String modifyPwDate = request.getParameter("USR_PW_CHG_DATE") == null ? "" : request.getParameter("USR_PW_CHG_DATE").toString();	//비밀번호 변경일시
		String virtualNo = request.getParameter("USR_VIRTUALNO") == null ? "" : request.getParameter("USR_VIRTUALNO").toString();			//통합이용자 DI값
		String sysMemberId = request.getParameter("SYS_USR_ID") == null ? "" : request.getParameter("SYS_USR_ID").toString();				//기존서비스 사용자ID
		String failPwdCnt = request.getParameter("USR_PW_FAIL_CNT") == null ? "" : request.getParameter("USR_PW_FAIL_CNT").toString();		//비밀번호 틀린 횟수
		String parentVirtualNo =  request.getParameter("USR_PRE_VIRTUALNO") == null ? "" : request.getParameter("USR_PRE_VIRTUALNO").toString();	//14세미만 사용자 부모 DI값
		
		//2017.12.06 [개발팀] 취약점점검
		memberId = Security.cleanXss(memberId);
		memberSn = Security.cleanXss(memberSn);
		memberPw = Security.cleanXss(memberPw);
		phoneNo = Security.cleanXss(phoneNo);
		email = Security.cleanXss(email);
		regDate = Security.cleanXss(regDate);
		accessIP = Security.cleanXss(accessIP);
		modifyPwDate = Security.cleanXss(modifyPwDate);
		virtualNo = Security.cleanXss(virtualNo);
		sysMemberId = Security.cleanXss(sysMemberId);
		failPwdCnt = Security.cleanXss(failPwdCnt);
		parentVirtualNo = Security.cleanXss(parentVirtualNo);
		
		//기존 회원은 로직을 타지 않는다.
		if (memberId.length() > 0) {
			//<!-- //2015-09-10 수정 -->
			name = StringUtil.encodingChange(request, name);
			/*
			try{
				byte[] tmpName = name.getBytes("ISO-8859-1");
				name = new String(tmpName,"UTF-8");
	        } catch(UnsupportedEncodingException e1){
				logger.error(e1);
	        }
	        */
			
			SqlSession session = null;
			
			try {
				logger.info("START Query - insert intergration member");
				
				//로그인한 통합회원이 기존에도 로그인 했었는지 확인
				Map mapParameter = new HashMap();
				mapParameter.put("member_id", memberId);	//<!-- //2015-09-10 수정 -->
				mapParameter.put("intgr_member_sn", memberSn);
				mapParameter.put("pw", memberPw);
				mapParameter.put("member_nm", name);
				mapParameter.put("birth_code", SecureDB.encryptAria256(birthDay)); 
				mapParameter.put("gender", sex);
				mapParameter.put("cp_no", SecureDB.encryptAria256(phoneNo)); 
				mapParameter.put("email", SecureDB.encryptAria256(email)); 
				mapParameter.put("member_key", virtualNo);
				mapParameter.put("intgr_reg_ts", regDate);
				mapParameter.put("reg_ts", regDate);
				mapParameter.put("last_access_ip", accessIP);
				mapParameter.put("pw_last_mod_dt", modifyPwDate);
				mapParameter.put("pw_fail_cnt", failPwdCnt);
				
				//<!-- //2015-09-10 수정 -->
				//14세미만 회원가입
				if (parentVirtualNo.length() > 0) {
					mapParameter.put("parent_member_id", parentVirtualNo);
					mapParameter.put("member_key", parentVirtualNo);
				}
				
				int checkCnt = ssoService.getIntgrMemberCheckCnt(mapParameter);
				
				//<!-- //2015-09-10 수정 -->
				//한번도 로그인 하지 않았다면,
				//기존 서비스 회원정보와 비교하여, 중복사용자 인지 판단
				//중복이 아닐 경우, 로그인한 회원 insert
				//중복일 경우, 기존 사용자 통합로그인 정보 N update 후, 로그인한 회원 insert
				if (checkCnt == 0) {
					
					//기존 회원정보 변수에 저장
					Map originMember = ssoService.memberInfo(mapParameter);
					
					//회원 정보가 없거나 기존회원
//					if(httpSession.getAttribute("member_id") != null) {
						if (sysMemberId.length() > 0) {
							Map info = new HashMap();
							info.put("member_id", sysMemberId);
							ssoService.memberDelete(info);
							
							info.put("member_id", memberId);
							info.put("sys_member_id", sysMemberId);
//							info.put("use_yn", "N");
							ssoService.updateHistChangeMemberId(info);
							ssoService.updateSrvChagneMemberId(info);
							ssoService.updateBoardChagneMemberId(info);
							ssoService.updateBoardReplyChagneMemberId(info);
						}
						
						//기존 회원삭제
						ssoService.memberDelete(mapParameter);
						try {
							//통합사용자 INSERT
							mapParameter.put("intgr_login_yn", "Y");
							ssoService.insertIntgrMemberInfo(mapParameter);
						} catch(SQLException e) {
							//기존데이터 INSERT
							logger.info("###########Member Insert Error##############"+e);
							ssoService.insertIntgrMemberInfo(originMember);
						}
//					}
				}else {
					//통합회원
					if (sysMemberId.length() > 0) {
						Map info = new HashMap();
						info.put("member_id", memberId);
						info.put("sys_member_id", sysMemberId);
//						info.put("use_yn", "N");
//						getSqlSession().update("member.updateIntgrLoginInfo", info);
						ssoService.updateHistChangeMemberId(info);
						ssoService.updateSrvChagneMemberId(info);
						ssoService.updateBoardChagneMemberId(info);
						ssoService.updateBoardReplyChagneMemberId(info);
					}
					//통합사용자 상태 업데이트
//					ssoService.updateIntgrMemberInfo(mapParameter);
				}
				
				logger.info("START Query - insert intergration member");
			}catch (AbsAPIException e) {
				logger.error(e);
				throw e;
			} catch (IllegalArgumentException e) {
				logger.error(e);
				throw new ApiException("입력값을 체크 해 주세요");
			} catch (SQLException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			} finally {
			}		
		}
		return new ModelAndView("sso/returnAuth");
	}
	/**
	 * 통합인증서버에서 세션값을 받아온다.
	 * @param request
	 * @param response
	 * @return sso/returnAuth
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value="/view/mobile/service")
	public ModelAndView mobileservice(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		response.setContentType("text/html; charset=UTF-8");
		request.setCharacterEncoding("UTF-8");
		
		HttpSession httpSession = request.getSession();
		if(request.getMethod().equals("POST")){
			httpSession.removeAttribute("member_id");
			httpSession.removeAttribute("member_pw");
			httpSession.removeAttribute("member_sn");
			httpSession.removeAttribute("login_yn");
			httpSession.removeAttribute("member_nm");
			httpSession.removeAttribute("member_gubun");
			httpSession.removeAttribute("mobile_intgr_login_yn");
			httpSession.removeAttribute("intgr_login_yn");
			httpSession.removeAttribute("birth");
			httpSession.removeAttribute("cp_no");
			httpSession.removeAttribute("sc_telephone");
			httpSession.removeAttribute("email");
			httpSession.removeAttribute("sc_email");
			if(request.getParameter("LOGIN_YN").equals("Y")){
				httpSession.setAttribute("member_id", request.getParameter("USR_ID"));
				httpSession.setAttribute("member_nm", new String(request.getParameter("USR_NAME").getBytes("ISO-8859-1"), "UTF-8"));
				httpSession.setAttribute("mobile_intgr_login_yn", "Y");
				httpSession.setAttribute("login_yn", "Y");
				httpSession.setAttribute("intgr_login_yn", "N");
				String redirectUrl = "/";
				if(request.getParameter("CUR_URL")!=null){
					try {
						redirectUrl = URLDecoder.decode(request.getParameter("CUR_URL"), "UTF-8");
					} catch (UnsupportedEncodingException e) {
						//2015-12-03 시큐어코딩
						logger.info(StringUtil.getErrMsg()+e);
						//e.printStackTrace();
						
						if(redirectUrl != null) {
							redirectUrl = null;
						}
					}
				}

				return new ModelAndView("redirect:"+redirectUrl);
			}else{
				response.setContentType("text/html");
		    	PrintWriter out = null;
		    	try {
		    		String url = request.getParameter("CUR_URL")==null?"/mobile":"/mobile/html/member/login.html?returnPage="+request.getParameter("CUR_URL");
		    		String message = request.getParameter("MSG")==null?"실패하였습니다":new String(request.getParameter("MSG").getBytes("ISO-8859-1"), "UTF-8");
					out = response.getWriter();
					out.println("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/><script>alert('"+(message.replaceAll("\\|", "\\\\n"))+"');location.href=\""+url+"&k=Y\";</script></head><body></body></html>");
					out.flush();
					out.close();
				} catch (IOException e) {
					//2015-12-03 시큐어코딩
					logger.info(StringUtil.getErrMsg()+e);
					//e.printStackTrace();
					
					if(out != null) {
						out = null;
					}
				}
				return null;
			}
		}else{
			return new ModelAndView("sso/returnAuth");
		}
	}
}