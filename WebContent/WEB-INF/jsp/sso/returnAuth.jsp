<%
/**************************************************************************************************************************
* Program Name  : SSO 세션 결과 수신 JSP  
* File Name     : returnAuth.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-07-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="kostat.sop.ServiceAPI.common.util.StringUtil"       %>
<%
	
//==============운영============ 운영올릴때 주석제거 요망
	/*
	String strSsnInfo = request.getParameter("SSN_INFO");			//통합이용자 접속 세션 ID
	String strUsrId = request.getParameter("USR_ID");				//통합이용자 아이디
	String strUsrName = request.getParameter("USR_NAME");			//통합이용자 이름
	String strIpAddress = request.getParameter("SID_IP_ADDR");	 	//통합이용자 접속 아이디
	String strUsrSn = request.getParameter("USR_SN");	 			//통합이용자 번호
	String strUsrPw = request.getParameter("USR_PW");	 			//통합이용자 비밀번호
	String strUsrGubun = request.getParameter("USR_GUBUN");	 		//통합이용자 구분 (N : 신규, K, M, S, E : 통합전환)
	String strLoginYN = request.getParameter("LOGIN_YN");			//로그인 여부
	String strUsrBirth = request.getParameter("USR_BIRTHDAY");		//통합이용자 생년월일
	String strPhoneNo = request.getParameter("USR_MOBILE");			//핸드폰번호
	String strEmail = request.getParameter("USR_EMAIL");			//이메일
	String strMemberId = "";
	String strIntgrLoginYn = "N";
	*/
	
	//==============로컬============ 운영올릴때 주석처리 요망
		String strSsnInfo = "strSsnInfo";			//통합이용자 접속 세션 ID
		String strUsrId = "member_id";				//통합이용자 아이디
		String strUsrName = "유지보수";			//통합이용자 이름
		String strIpAddress = "strIpAddress";	 	//통합이용자 접속 아이디
		String strUsrSn = "strUsrSn";	 			//통합이용자 번호
		String strUsrPw = "strUsrPw";	 			//통합이용자 비밀번호
		String strUsrGubun = "N";	 		//통합이용자 구분 (N : 신규, K, M, S, E : 통합전환)
		String strLoginYN = "Y";			//로그인 여부
		String strUsrBirth = "19731111";		//통합이용자 생년월일
		String strPhoneNo = "0101234567";			//핸드폰번호
		String strEmail = "sgis@email.com";			//이메일
		String strMemberId = "member_id";
		String strIntgrLoginYn = "N";
	
	
	//인코딩 변경
	if(strUsrName != null) {
		strUsrName = StringUtil.encodingChange(request, strUsrName);	
	}
	
	HttpSession httpSession = request.getSession();
	try {	
	httpSession.setAttribute("ssn_info", strSsnInfo);
	httpSession.setAttribute("sid_ip_addr", strIpAddress);
	
	if (strUsrId!=null&&strUsrId.length() > 0) {
		httpSession.setAttribute("member_id", strUsrId);
		httpSession.setAttribute("member_pw", strUsrPw);
		httpSession.setAttribute("member_nm", strUsrName);
		httpSession.setAttribute("member_sn", strUsrSn);	
		httpSession.setAttribute("member_gubun", strUsrGubun);
		httpSession.setAttribute("login_yn", strLoginYN);
		httpSession.setAttribute("intgr_login_yn", "Y");
		httpSession.setAttribute("birth", strUsrBirth);	
		httpSession.setAttribute("cp_no", strPhoneNo);
		httpSession.setAttribute("sc_telephone", strPhoneNo);
		httpSession.setAttribute("email", strEmail);
		httpSession.setAttribute("sc_email", strEmail);
	}

	//통합회원인지 기존회원인지 구분(N:기존회원, Y:통합회원)
	if(httpSession.getAttribute("intgr_login_yn") != null && 
	   httpSession.getAttribute("intgr_login_yn").toString().length() > 0) {
		strIntgrLoginYn = httpSession.getAttribute("intgr_login_yn").toString();
	}
	
	if (httpSession.getAttribute("member_id") != null) {
		strMemberId = httpSession.getAttribute("member_id").toString();
		}
		//다른 서비스에서 통합회원 로그아웃을 하고
	    //우리쪽에 넘어왔을 경우, 세션을 제거한다.
		if (strIntgrLoginYn.equals("Y")) {
			if (strUsrId.length() == 0) {
				httpSession.removeAttribute("member_id");
				httpSession.removeAttribute("member_pw");
				httpSession.removeAttribute("member_sn");
				httpSession.removeAttribute("login_yn");
				httpSession.removeAttribute("member_nm");
				httpSession.removeAttribute("member_gubun");
				httpSession.removeAttribute("intgr_login_yn");
				httpSession.removeAttribute("birth");
				httpSession.removeAttribute("cp_no");
				httpSession.removeAttribute("sc_telephone");
				httpSession.removeAttribute("email");
				httpSession.removeAttribute("sc_email");
			}
		}
	}catch (Exception e) {
		System.out.println("==========================="+e);
	}
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>SSO 세션 결과 수신|통계지리정보서비스</title>
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				//<!-- //2015-09-10 수정 -->
				$('#loginFrame', parent.document).attr("src", "/html/authorization/login.jsp");
				$('#logoutFrame', parent.document).attr("src", "/html/authorization/logout.jsp");
				$('#registerFrame', parent.document).attr("src", "/html/authorization/memberRegister.jsp");
				$('#unRegisterFrame', parent.document).attr("src", "/html/authorization/memberUnRegister.jsp");
				$('#modifyFrame', parent.document).attr("src", "/html/authorization/memberModify.jsp");
				<%
					//통합인증 로그인 상태
					if(httpSession.getAttribute("member_id") != null && httpSession.getAttribute("member_id").toString().length() > 0) {
				%>
						AuthInfo = {
							authStatus : true,
							member_id : "<%= strMemberId %>",
							intgrLoginYN : "<%= strIntgrLoginYn %>",
							ipAddress : "<%= strIpAddress %>",
							ssnInfo : "<%= strSsnInfo %>"
						}
				<%
					} else {	//비로그인
				%>
						AuthInfo = {
							authStatus : false,
							member_id : "<%= strMemberId %>",
							intgrLoginYN : "",
							ipAddress : "<%= strIpAddress %>",
							ssnInfo : "<%= strSsnInfo %>"
						}
						//<!-- //2015-09-10 수정 -->
						if((parent.location.href).indexOf("/view/mypage/") > -1) {
							parent.location.href = "/view/member/login_new?returnPage=/";
						}
				<%
					}
				%>
				if (parent != undefined && parent != null) {
					if (typeof parent.setSession !== "undefined") { 
						parent.setSession(AuthInfo);
					}
				}
				
			});
		</script>
	</head>
</html>