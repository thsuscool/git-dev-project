package kostat.sop.ServiceAPI.controller.sso;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.security.Security; //2017.12.06 [개발팀] 취약점점검
import kostat.sop.ServiceAPI.common.util.EncryptPassword;
import kostat.sop.ServiceAPI.common.util.StringUtil;	//<!-- //2015-09-10 수정 -->
import kostat.sop.ServiceAPI.controller.service.SSOService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 로그인, 로그아웃 등 회원정보와 관련된 클래스<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/07/29  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱, 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/authorization")
public class Authorization {
	private final Log logger = LogFactory.getLog(Authorization.class);
	
	//통합인증 관련 서비스
	@Resource(name="ssoService")
	private SSOService ssoService;
		
	//<!-- //2015-09-10 수정 -->
	/**
	 * 로그인
	 * @param request
	 * @param response
	 * @return sso/returnLogin
	 */
	@RequestMapping(value="/login")
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response) {		
		
		Map map = request.getParameterMap();
		logger.debug("#######Authorization######"+map);

		return new ModelAndView("sso/returnLogin");
	}
	
	/**
	 * 로그아웃
	 * @param request
	 * @param response
	 * @return sso/returnLogout
	 */
	@RequestMapping(value="/logout")
	public ModelAndView loginout(HttpServletRequest request, HttpServletResponse response) {
		Map map = request.getParameterMap();
		String memberId = request.getParameter("USR_ID") == null ? "" : request.getParameter("USR_ID").toString();				//통합이용자 아이디
		String accessIP = request.getParameter("SID_IP_ADDR") == null ? "" : request.getParameter("SID_IP_ADDR").toString();	//최종접속 IP
		
		try {
			logger.info("START Query - update intergration logout time");
			
			//사용자삭제
			Map mapParameter = new HashMap();
			mapParameter.put("member_id", memberId);
			mapParameter.put("last_access_ip", accessIP);
			ssoService.updateIntgrLastConn(mapParameter);		
			
			logger.info("START Query - update intergration logout time");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
			
		}
		
		return new ModelAndView("sso/returnLogout");
	}
	
	/**
	 * 회원가입
	 * @param request
	 * @param response
	 * @return sso/returnRegister
	 */
	@RequestMapping(value="/register")
	public ModelAndView register(HttpServletRequest request, HttpServletResponse response) {
		Map map = request.getParameterMap();
		String birthDay = request.getParameter("USR_BIRTHDAY") == null ? "" : request.getParameter("USR_BIRTHDAY").toString();						//생년월일
		String name = request.getParameter("USR_NAME") == null ? "" : request.getParameter("USR_NAME").toString();									//이름
		String sex = request.getParameter("USR_SEX") == null ? "" : request.getParameter("USR_SEX").toString();										//성별
		String memberId = request.getParameter("USR_ID") == null ? "" : request.getParameter("USR_ID").toString();									//통합이용자 아이디
		String memberSn = request.getParameter("USR_SN") == null ? "" : request.getParameter("USR_SN").toString();									//통합이용자 번호
		String memberPw = request.getParameter("USR_PW") == null ? "" : request.getParameter("USR_PW").toString();									//통합이용자 비밀번호
		String phoneNo = request.getParameter("USR_MOBILE") == null ? "" : request.getParameter("USR_MOBILE").toString();							//핸드폰번호
		String email = request.getParameter("USR_EMAIL") == null ? "" : request.getParameter("USR_EMAIL").toString();								//이메일
		String regDate = request.getParameter("JOIN_DATE") == null ? "" : request.getParameter("JOIN_DATE").toString();								//가입일자
		String accessIP = request.getParameter("SID_IP_ADDR") == null ? "" : request.getParameter("SID_IP_ADDR").toString();						//최종접속 IP
		String modifyPwDate = request.getParameter("USR_PW_CHG_DATE") == null ? "" : request.getParameter("USR_PW_CHG_DATE").toString();			//비밀번호 변경일시
		String virtualNo = request.getParameter("USR_VIRTUALNO") == null ? "" : request.getParameter("USR_VIRTUALNO").toString();					//통합이용자 DI값
		String meberGubun = request.getParameter("USR_GUBUN") == null ? "" : request.getParameter("USR_GUBUN").toString();							//사용자구분 (N:신규, S:SGIS)
		String sysMemberId = request.getParameter("SYS_USR_ID") == null ? "" : request.getParameter("SYS_USR_ID").toString();						//기존서비스 사용자ID
		String parentVirtualNo =  request.getParameter("USR_PRE_VIRTUALNO") == null ? "" : request.getParameter("USR_PRE_VIRTUALNO").toString();	//14세미만 사용자 부모 DI값
		
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
		//<!-- //2015-09-10 수정 -->
			
		//기존 서비스 사용자가 있는경우, 기존 사용자를 사용중지시킴
		if (sysMemberId.length() > 0) {
			Map info = new HashMap();
			info.put("member_id", memberId);
			
			//통합아이디가 기존 아이디와 동일할 경우
			if (sysMemberId.equals(memberId)) {
				ssoService.memberDelete(info);
			}
			//통합아이디가 기존 아이디와 다를 경우
			else {
				info.put("sys_member_id", sysMemberId);
				//info.put("use_yn", "N");
				//ssoService.updateIntgrLoginInfo(info);
				ssoService.updateHistChangeMemberId(info);
				ssoService.updateSrvChagneMemberId(info);
			}
		}else {
			//혹시나 통합인증쪽 기존사용자테이블에는 없는데, 우리쪽에는 있는 경우
			Map info = new HashMap();
			info.put("member_id", memberId);
			info.put("member_nm", name);

			Map memberInfo = ssoService.selectOriginMember(info);
			if (memberInfo != null) {	
				ssoService.memberDelete(info);
			}
		}
		
		//신규통합회원 insert
		Map mapParameter = new HashMap();
		mapParameter.put("member_id", memberId);
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
		
		//14세미만 회원가입
		if (parentVirtualNo.length() > 0) {
			mapParameter.put("parent_member_id", parentVirtualNo);
			mapParameter.put("member_key", parentVirtualNo);
		}
		
//		int checkCnt = (Integer)getSqlSession().selectOne("member.getIdCheckCnt", mapParameter);
//		if (checkCnt == 0) {
			ssoService.insertIntgrMemberInfo(mapParameter);
//		}
		
		logger.info("START Query - insert intergration member");
	}catch (AbsAPIException e) {
		logger.error(e);
		throw e;
	} catch (IllegalArgumentException e) {
		logger.error(e);
		throw new ApiException("입력값을 체크 해 주세요");
	} catch (Exception e) {
		logger.error(e);
		throw new ApiException(StringUtil.getErrMsg());
	} finally {
	}
				
		return new ModelAndView("sso/returnRegister");
	}
	
	/**
	 * 통합회원탈퇴
	 * @param request
	 * @param response
	 * @return sso/returnUnregister
	 */
	@RequestMapping(value="/unregister")
	public ModelAndView unregister(HttpServletRequest request, HttpServletResponse response) {
		Map map = request.getParameterMap();
		String memberId = request.getParameter("USR_ID") == null ? "" : request.getParameter("USR_ID").toString();	//통합이용자 아이디
		
		try {
			logger.info("START Query - delete intergration member");
			
			//사용자삭제
			Map mapParameter = new HashMap();
			mapParameter.put("member_id", memberId);
			ssoService.memberDelete(mapParameter);		
			
			//사용자 북마크 삭제
			List statisticsList = ssoService.StatistcsHistoryListsForUser(mapParameter);
			if (statisticsList.size() > 0) {
				for (int i=0; i<statisticsList.size(); i++) {
					Map mapInfo = (Map)statisticsList.get(i);
					ssoService.deleteStatistcsHistory(mapInfo);
					ssoService.deleteStatistcsHistoryParamInfo(mapInfo);
				}
			}
			
			//<!-- //2015-09-10 수정 -->
			ssoService.deleteBoardInfo(mapParameter);		//게시판 삭제
			ssoService.deleteBoardReplyInfo(mapParameter);		//게시판 댓글 삭제
			ssoService.deleteUserServiceInfo(mapParameter);		//API 서비스 정보 삭제
			
			logger.info("START Query - delete intergration member");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
			
		}
				
		return new ModelAndView("sso/returnUnregister");
	}
	
	/**
	 * 기존회원탈퇴
	 * @param request
	 * @param response
	 * @return sso/returnOriginUnRegister
	 */
	@RequestMapping(value="/originUnRegister")
	public ModelAndView originUnRegister(HttpServletRequest request, HttpServletResponse response) {
		Map map = request.getParameterMap();
		logger.info("###"+map);
		return new ModelAndView("sso/returnOriginUnregister");
	}
	
	/**
	 * 통합회원정보수정
	 * @param request
	 * @param response
	 * @return sso/returnModifyMember
	 */
	@RequestMapping(value="/modifyMember")
	public ModelAndView modifyMember(HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter("USR_NAME") == null ? "" : request.getParameter("USR_NAME").toString();							//이름
		String memberId = request.getParameter("USR_ID") == null ? "" : request.getParameter("USR_ID").toString();							//통합이용자 아이디
		String memberPw = request.getParameter("USR_PW") == null ? "" : request.getParameter("USR_PW").toString();							//통합이용자 비밀번호
		String phoneNo = request.getParameter("USR_MOBILE") == null ? "" : request.getParameter("USR_MOBILE").toString();					//핸드폰번호
		String email = request.getParameter("USR_EMAIL") == null ? "" : request.getParameter("USR_EMAIL").toString();						//이메일
		String accessIP = request.getParameter("SID_IP_ADDR") == null ? "" : request.getParameter("SID_IP_ADDR").toString();				//최종접속 IP
		String modifyPwDate = request.getParameter("USR_PW_CHG_DATE") == null ? "" : request.getParameter("USR_PW_CHG_DATE").toString();	//비밀번호 변경일시
		String failPwdCnt = request.getParameter("USR_PW_FAIL_CNT") == null ? "" : request.getParameter("USR_PW_FAIL_CNT").toString();		//비밀번호 틀린 횟수
		
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
			mapParameter.put("member_id", memberId);
			mapParameter.put("pw", memberPw);
			mapParameter.put("member_nm", name);
			mapParameter.put("cp_no", SecureDB.encryptAria256(phoneNo));
			mapParameter.put("email", SecureDB.encryptAria256(email));
			mapParameter.put("last_access_ip", accessIP);
			mapParameter.put("pw_last_mod_dt", modifyPwDate);
			mapParameter.put("pw_fail_cnt", failPwdCnt);
		//mng_s 20171024 leekh 맴버테이블 lock 잡히는 현상때문에 update 제거처리
		//	ssoService.updateIntgrMemberInfo(mapParameter);
		//mng_e 20171024 leekh 맴버테이블 lock 잡히는 현상때문에 update 제거처리
			
			logger.info("START Query - insert intergration member");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}
		
		return new ModelAndView("sso/returnModifyMember");
	}
	
	
	/**
	 * 기존회원정보수정
	 * @param request
	 * @param response
	 * @return sso/returnModifyMember
	 */
	@RequestMapping(value="/modifyOriginMember")
	public ModelAndView modifyOriginMember(HttpServletRequest request, HttpServletResponse response) {
		Map map = request.getParameterMap();
		
		return new ModelAndView("sso/returnModifyOriginMember");
	}
	
	
	/**
	 * 기존회원아이디찾기
	 * @param request
	 * @param response
	 * @return sso/returnfindOriginMember
	 */
	@RequestMapping(value="/findOriginMember")
	public ModelAndView findOriginMember(HttpServletRequest request, HttpServletResponse response) {
		Map map = request.getParameterMap();

		String memberId = request.getParameter("SYS_USR_ID") == null ? "" : request.getParameter("SYS_USR_ID").toString();							
		String memberPw = request.getParameter("SYS_USR_PW") == null ? "" : request.getParameter("SYS_USR_PW").toString();
		String memberName = request.getParameter("SYS_USR_NAME") == null ? "" : request.getParameter("SYS_USR_NAME").toString();	
		String strSysCd = request.getParameter("SYS_CD") == null ? "" : request.getParameter("SYS_CD").toString();	//2015-09-10 수정
		String strSysUsrSeCd = request.getParameter("SYS_USR_SE_CD") == null ? "" : request.getParameter("SYS_USR_SE_CD").toString();
		String strMemberType = request.getParameter("MEMBER_TYPE") == null ? "" : request.getParameter("MEMBER_TYPE").toString();
		String strSysUrl = request.getParameter("SYS_URL") == null ? "" : request.getParameter("SYS_URL").toString();
		String strCurUrl = request.getParameter("CUR_URL") == null ? "" : request.getParameter("CUR_URL").toString();
		String strChkSysCnt = request.getParameter("CHK_SYS_CNT") == null ? "" : request.getParameter("CHK_SYS_CNT").toString();
		String strSopIdChkMsg = request.getParameter("SOP_ID_CHK_MSG") == null ? "" : request.getParameter("SOP_ID_CHK_MSG").toString();
		String strSopIdChkYn = request.getParameter("SOP_ID_CHK_YN") == null ? "" : request.getParameter("SOP_ID_CHK_YN").toString();
		String strSopIdChkYnLst = request.getParameter("SOP_ID_CHK_YN_LST") == null ? "" : request.getParameter("SOP_ID_CHK_YN_LST").toString();
		String strSopUsrId = request.getParameter("SOP_USR_ID") == null ? "" : request.getParameter("SOP_USR_ID").toString();
		String strSopUsrJoinDT = request.getParameter("SOP_USR_JOIN_DT") == null ? "" : request.getParameter("SOP_USR_JOIN_DT").toString();
		String strSopSearchId = request.getParameter("SOP_SEARCH_ID") == null ? "" : request.getParameter("SOP_SEARCH_ID").toString();
		String strSopSearchDT = request.getParameter("SOP_SEARCH_DT") == null ? "" : request.getParameter("SOP_SEARCH_DT").toString();
		String strKosisIdChkYn = request.getParameter("KOSIS_ID_CHK_YN") == null ? "" : request.getParameter("KOSIS_ID_CHK_YN").toString();
		String strKosisIdChkMsg = request.getParameter("KOSIS_ID_CHK_MSG") == null ? "" : request.getParameter("KOSIS_ID_CHK_MSG").toString();
		String strEnaraIdChkYn = request.getParameter("ENARA_ID_CHK_YN") == null ? "" : request.getParameter("ENARA_ID_CHK_YN").toString();
		String strEnaraIdChkMsg = request.getParameter("ENARA_ID_CHK_MSG") == null ? "" : request.getParameter("ENARA_ID_CHK_MSG").toString();
		String strMdssIdChkYn = request.getParameter("MDSS_ID_CHK_YN") == null ? "" : request.getParameter("MDSS_ID_CHK_YN").toString();
		String strMdssIdChkMsg = request.getParameter("MDSS_ID_CHK_MSG") == null ? "" : request.getParameter("MDSS_ID_CHK_MSG").toString();
		String strKosisIdChkYnLst = request.getParameter("KOSIS_ID_CHK_YN_LST") == null ? "" : request.getParameter("KOSIS_ID_CHK_YN_LST").toString();
		String strEnaraIdChkYnLst = request.getParameter("ENARA_ID_CHK_YN_LST") == null ? "" : request.getParameter("ENARA_ID_CHK_YN_LST").toString();
		String strMdssIdChkYnLst = request.getParameter("MDSS_ID_CHK_YN_LST") == null ? "" : request.getParameter("MDSS_ID_CHK_YN_LST").toString();
		String strKosisUsrId = request.getParameter("KOSIS_USR_ID") == null ? "" : request.getParameter("KOSIS_USR_ID").toString();
		String strKosisUsrJoinDT = request.getParameter("KOSIS_USR_JOIN_DT") == null ? "" : request.getParameter("KOSIS_USR_JOIN_DT").toString();
		String strEnaraUsrId = request.getParameter("ENARA_USR_ID") == null ? "" : request.getParameter("ENARA_USR_ID").toString();
		String strEnaraUsrJoinDT = request.getParameter("ENARA_USR_JOIN_DT") == null ? "" : request.getParameter("ENARA_USR_JOIN_DT").toString();
		String strMdssUsrId = request.getParameter("MDSS_USR_ID") == null ? "" : request.getParameter("MDSS_USR_ID").toString();
		String strMdssUsrJoinDT = request.getParameter("MDSS_USR_JOIN_DT") == null ? "" : request.getParameter("MDSS_USR_JOIN_DT").toString();
		String strKosisSearchId = request.getParameter("KOSIS_SEARCH_ID") == null ? "" : request.getParameter("KOSIS_SEARCH_ID").toString();
		String strEnaraSearchId = request.getParameter("ENARA_SEARCH_ID") == null ? "" : request.getParameter("ENARA_SEARCH_ID").toString();
		String strMdssSearchId = request.getParameter("MDSS_SEARCH_ID") == null ? "" : request.getParameter("MDSS_SEARCH_ID").toString();
		String strKosisSearchDT = request.getParameter("KOSIS_SEARCH_DT") == null ? "" : request.getParameter("KOSIS_SEARCH_DT").toString();
		String strEnaraSearchDT = request.getParameter("ENARA_SEARCH_DT") == null ? "" : request.getParameter("ENARA_SEARCH_DT").toString();
		String strMdssSearchDT = request.getParameter("MDSS_SEARCH_DT") == null ? "" : request.getParameter("MDSS_SEARCH_DT").toString();
		String strRetInfo = request.getParameter("retInfo") == null ? "" : request.getParameter("retInfo").toString();
		String strDupInfo = request.getParameter("dupInfo") == null ? "" : request.getParameter("dupInfo").toString();
		
		//<!-- //2015-09-10 수정 -->
		memberName = StringUtil.encodingChange(request, memberName);
		strSopIdChkMsg = StringUtil.encodingChange(request, strSopIdChkMsg);
		strKosisIdChkMsg = StringUtil.encodingChange(request, strKosisIdChkMsg);
		strEnaraIdChkMsg = StringUtil.encodingChange(request, strEnaraIdChkMsg);
		strMdssIdChkMsg = StringUtil.encodingChange(request, strMdssIdChkMsg);
		/*
		try{
			
			byte[] tmpMemberName= memberName.getBytes("ISO-8859-1");
			byte[] tmpSopMsg = strSopIdChkMsg.getBytes("ISO-8859-1");
			byte[] tmpKosisMsg = strKosisIdChkMsg.getBytes("ISO-8859-1");
			byte[] tmpEnaraMsg = strEnaraIdChkMsg.getBytes("ISO-8859-1");
			byte[] tmpMdssMsg = strMdssIdChkMsg.getBytes("ISO-8859-1");
			memberName = new String(tmpMemberName,"UTF-8");
			strSopIdChkMsg = new String(tmpSopMsg,"UTF-8");
			strKosisIdChkMsg = new String(tmpKosisMsg,"UTF-8");
			strEnaraIdChkMsg = new String(tmpEnaraMsg,"UTF-8");
			strMdssIdChkMsg = new String(tmpMdssMsg,"UTF-8");
        } catch(UnsupportedEncodingException e1){
			logger.error(e1);
        }
        */
		
		Map tmpMap = new HashMap();
		tmpMap.put("SYS_USR_NAME", memberName);
		tmpMap.put("SYS_USR_SE_CD", strSysUsrSeCd);
		tmpMap.put("MEMBER_TYPE", strMemberType);
		tmpMap.put("SYS_CD", strSysCd);	//2015-09-10 수정
		tmpMap.put("SYS_URL", strSysUrl);
		tmpMap.put("CUR_URL", strCurUrl);
		tmpMap.put("CHK_SYS_CNT", strChkSysCnt);
		tmpMap.put("SOP_ID_CHK_MSG", strSopIdChkMsg);
		tmpMap.put("SOP_ID_CHK_YN", strSopIdChkYn);
		tmpMap.put("SOP_ID_CHK_YN_LST", strSopIdChkYnLst);
		tmpMap.put("SOP_USR_ID", strSopUsrId);
		tmpMap.put("SOP_USR_JOIN_DT", strSopUsrJoinDT);
		tmpMap.put("SOP_SEARCH_ID", strSopSearchId);
		tmpMap.put("SOP_SEARCH_DT", strSopSearchDT);
		tmpMap.put("KOSIS_ID_CHK_YN", strKosisIdChkYn);
		tmpMap.put("KOSIS_ID_CHK_MSG", strKosisIdChkMsg);
		tmpMap.put("ENARA_ID_CHK_YN", strEnaraIdChkYn);
		tmpMap.put("ENARA_ID_CHK_MSG", strEnaraIdChkMsg);
		tmpMap.put("MDSS_ID_CHK_YN", strMdssIdChkYn);
		tmpMap.put("MDSS_ID_CHK_MSG", strMdssIdChkMsg);
		tmpMap.put("KOSIS_ID_CHK_YN_LST", strKosisIdChkYnLst);
		tmpMap.put("ENARA_ID_CHK_YN_LST", strEnaraIdChkYnLst);
		tmpMap.put("MDSS_ID_CHK_YN_LST", strMdssIdChkYnLst);
		tmpMap.put("KOSIS_USR_ID", strKosisUsrId);
		tmpMap.put("KOSIS_USR_JOIN_DT", strKosisUsrJoinDT);
		tmpMap.put("ENARA_USR_ID", strEnaraUsrId);
		tmpMap.put("ENARA_USR_JOIN_DT", strEnaraUsrJoinDT);
		tmpMap.put("MDSS_USR_ID", strMdssUsrId);
		tmpMap.put("MDSS_USR_JOIN_DT", strMdssUsrJoinDT);
		tmpMap.put("KOSIS_SEARCH_ID", strKosisSearchId);
		tmpMap.put("ENARA_SEARCH_ID", strEnaraSearchId);
		tmpMap.put("MDSS_SEARCH_ID", strMdssSearchId);
		tmpMap.put("KOSIS_SEARCH_DT", strKosisSearchDT);
		tmpMap.put("ENARA_SEARCH_DT", strEnaraSearchDT);
		tmpMap.put("MDSS_SEARCH_DT", strMdssSearchDT);
		tmpMap.put("retInfo", strRetInfo);
		tmpMap.put("dupInfo", strDupInfo);
		
		SqlSession session = null;

		try {
			logger.info("START Query - select oringin member");
			
			//로그인한 통합회원이 기존에도 로그인 했었는지 확인
			Map mapParameter = new HashMap();
			mapParameter.put("member_id", memberId);
			mapParameter.put("member_nm", memberName);

			Map memberInfo = ssoService.selectOriginMember(mapParameter);
			if (memberInfo != null) {	
				String tempPw = SecureDB.encryptSha256(memberPw);
				String pw = (String)memberInfo.get("pw");
				String regTime = (String)memberInfo.get("reg_ts");

				//사용자를 찾았을 경우
				if (tempPw.equals(pw)) {
					tmpMap.put("USR_ID", memberId);
					tmpMap.put("JOIN_DT", regTime);
					tmpMap.put("RET_VAL", "S");
				}
				// 아이디는 있으나 비밀번호가 틀린경우
				else {
					tmpMap.put("USR_ID", "");
					tmpMap.put("JOIN_DT", "");
					tmpMap.put("RET_VAL", "F");
				}
			}
			// 사용자가 없을 경우
			else {
				tmpMap.put("USR_ID", "");
				tmpMap.put("JOIN_DT", "");
				tmpMap.put("RET_VAL", "N");
			}
			
			logger.info("START Query - select oringin member");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}
		
		return new ModelAndView("sso/returnFindOriginMember", "findMember", tmpMap);
	}
	
	//<!-- //2015-09-10 수정 -->
	/**
	 * 기존회원 통합회원전환 체크
	 * @param request
	 * @param response
	 * @return sso/returnOriginLoginCheck
	 */
	@RequestMapping(value="/originLoginCheck")
	public ModelAndView originLoginCheck(HttpServletRequest request, HttpServletResponse response) {
		Map map = request.getParameterMap();
		
		String chckVal = request.getParameter("ITGR_CHK_VAL") == null ? "" : request.getParameter("ITGR_CHK_VAL").toString();							
		String checkMsg = request.getParameter("ITGR_CHK_MSG") == null ? "" : request.getParameter("ITGR_CHK_MSG").toString();
		
		//2017.12.06 [개발팀] 취약점점검
		chckVal = Security.cleanXss(chckVal);
		checkMsg = Security.cleanXss(checkMsg);
		
		checkMsg = StringUtil.encodingChange(request, checkMsg);
		/*
		try{
			byte[] tmpCheckMsg = checkMsg.getBytes("ISO-8859-1");
			checkMsg = new String(tmpCheckMsg,"UTF-8");
        } catch(UnsupportedEncodingException e1){
			logger.error(e1);
        }*/
		
		Map tmpMap = new HashMap();
		tmpMap.put("ITGR_CHK_VAL", chckVal);
		tmpMap.put("ITGR_CHK_MSG", checkMsg);
		
		return new ModelAndView("sso/returnOriginLoginCheck", "checkOriginLogin", tmpMap);
	}
	/**
	 * 모바일 로그인할때 kosis로 비밀번호 보낼때 암호화 하기 위한 작업
	 * @param request
	 * @param response
	 * @return 
	 */
	@RequestMapping(value = "/pwencoding", method = RequestMethod.POST, produces="application/json; charset=UTF-8;")
	@ResponseBody
	public String pwencoding(HttpServletRequest request, HttpServletResponse response) {
		String pw = request.getParameter("pw");
		HashMap<String,Object> result = new HashMap<String,Object>();
		if(pw.isEmpty()){
			result.put("result", false);
			result.put("message", "패스워드가 존재하지 않습니다");
		}else{
			result.put("result", true);
			EncryptPassword encryptPassword = new EncryptPassword();
			result.put("pw", encryptPassword.encryptPassword_SHA256(pw));
		}
		return new JSONObject(result).toString();
	}
}