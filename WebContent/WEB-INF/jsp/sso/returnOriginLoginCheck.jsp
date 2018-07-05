<%
/**************************************************************************************************************************
* Program Name  : 로그인 결과 수신 JSP  
* File Name     : returnLogin.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-07-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %> 
<%
	Map map = (Map)request.getAttribute("checkOriginLogin");
	String strCheckVal = (String)map.get("ITGR_CHK_VAL");		//통합전환여부확인 Y:전환, N:미전환
	String strCheckMsg = (String)map.get("ITGR_CHK_MSG");	 	//통합전환 여부 메시지
	strCheckMsg = strCheckMsg.replace("\r\n", "</br>");
%>

<!DOCTYPE>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				//통합인증쪽에 통합된 회원인지 체크하여
				//통합된 회원이면 메시지 출력
				//통합된 회원이 아니면 기존회원로그인 프로세스 적용
				if ("<%=strCheckVal %>" == "Y") {
					parent.messageAlert.open("알림","<%= strCheckMsg %>");
				}else {
					parent.login.loginProcess();
				}
			});
		</script>
	</head>
	<body>
	</body>
</html>