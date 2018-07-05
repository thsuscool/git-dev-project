<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="java.util.Properties" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE>
<html lang="ko"> <!-- 2017.12.27 [개발팀] 접근성 시정조치-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>세션받기</title> <!-- 2017.12.12 [개발팀] 접근성  -->
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		
		
		
		<script type="text/javascript">
			$(document).ready(function() {
				$("#authForm").find($("#SYS_URL")).val(window.location.protocol+"//"+window.location.host + "/view/service");
				$("#authForm").submit();
			});
		</script>
	</head>
	<body>
		<c:set var="url">
			
			//localhost:8080/html/authorization/getSession.jsp 
			
		</c:set>
		<form action="${url }" method="${mobile_intgr_login_yn=='Y'?'get':'post' }" id="authForm" name="authForm">
			<input type="hidden" id="SYS_URL" name="SYS_URL"/>
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="S" />
		</form>
	</body>
</html>