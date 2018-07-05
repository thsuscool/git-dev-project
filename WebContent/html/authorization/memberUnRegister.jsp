<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="java.util.Properties" %>

<%
	// 세션에서 필요한 정보를 가져온다.
	HttpSession httpSession = request.getSession();
	String strSsnInfo = (String)httpSession.getAttribute("ssn_info");
	String strIpAddress = (String)httpSession.getAttribute("sid_ip_addr");
	String strUsrSn = (String)httpSession.getAttribute("member_sn");
	String strUsrId = (String)httpSession.getAttribute("member_id");
	String strUsrPw = (String)httpSession.getAttribute("member_pw");
	String strUsrGubun = (String)httpSession.getAttribute("member_gubun");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>회원등록|통계지리정보서비스</title>
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
			});
			var reqMemberUnRegister = function() {
				$("#unRegisterForm").attr("target", "_parent");
				$("#unRegisterForm").find($("#CUR_URL")).val(window.location.protocol+"//"+window.location.host + "/view/index");
				$("#unRegisterForm").find($("#SYS_URL")).val(window.location.protocol+"//"+window.location.host + "/view/authorization/unregister");
				$("#unRegisterForm").submit();
			} 
		</script>
	</head>
	<body>
		<form action="//kosis.kr/oneid/cmmn/login/GoToMemberDrop.do" method="post" id="unRegisterForm" name="unRegisterForm">
			<input type="hidden" id="CUR_URL" name="CUR_URL" />
			<input type="hidden" id="SYS_URL" name="SYS_URL" />
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="S" />
			<input type="hidden" id="LOGIN_YN" name="LOGIN_YN" value="Y" />
			<input type="hidden" id="SID_IP_ADDR" name="SID_IP_ADDR" value="<%=strIpAddress %>" />
			<input type="hidden" id="SSN_INFO" name="SSN_INFO" value="<%=strSsnInfo %>" />
			<input type="hidden" id="USR_SN" name="USR_SN" value="<%=strUsrSn %>" />
			<input type="hidden" id="USR_ID" name="USR_ID" value="<%=strUsrId %>" />
			<input type="hidden" id="USR_PW" name="USR_PW" value="<%=strUsrPw %>" />
		</form>
	</body>
</html>