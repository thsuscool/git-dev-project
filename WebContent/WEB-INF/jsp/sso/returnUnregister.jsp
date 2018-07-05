<%
/**************************************************************************************************************************
* Program Name  : 통합회원탈퇴 결과 수신 JSP  
* File Name     : returnUnregister.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-07-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String strSsnInfo = request.getParameter("SSN_INFO");			//통합이용자 접속 세션 ID
	String strIpAddress = request.getParameter("SID_IP_ADDR");	 	//통합이용자 접속 아이디
	String strCurUrl = request.getParameter("CUR_URL");				//이동할 페이지주소
	
	HttpSession httpSession = request.getSession();
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
	httpSession.setAttribute("ssn_info", strSsnInfo);
	httpSession.setAttribute("sid_ip_addr", strIpAddress);
%>

	<!DOCTYPE>
	<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				$("#successUnRegisterForm").attr("target", "_parent");
				$("#successUnRegisterForm").submit();
			});
		</script>
	</head>
	<body>
		<form action="<%=strCurUrl %>" method="post" id="successUnRegisterForm" name="successUnRegisterForm">
		</form>
	</body>
	</html>