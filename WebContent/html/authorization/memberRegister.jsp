<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="java.util.Properties" %>

<%
	// 세션에서 필요한 정보를 가져온다.
	HttpSession httpSession = request.getSession();
	String strSsnInfo = (String)httpSession.getAttribute("SSN_INFO");
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
			var reqMemberRegister = function() {
				var domain = window.location.protocol+"//"+window.location.host;
				cur_url =  domain + "/view/authorization/register?returnPage=" + domain + "/view/index";
				$("#registerForm").find("#CUR_URL").val(cur_url);
				$("#registerForm").attr("target", "_parent");
				$("#registerForm").submit();
			} 
		</script>
	</head>
	<body>
		<form action="//kosis.kr/oneid/cmmn/login/MemberType.do" method="post" id="registerForm" name="registerForm">
			<input type="hidden" id="CUR_URL" name="CUR_URL"/>
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="S" />
			<input type="hidden" id="SSN_INFO" name="SSN_INFO" value="<%=strSsnInfo %>" />
		</form>
	</body>
</html>