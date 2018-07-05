<%
/**************************************************************************************************************************
* Program Name  : 기존회원 정보수정 결과 수신 JSP  
* File Name     : returnModifyOriginMember.jsp
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
	String strCurUrl = request.getParameter("returnPage");			//이동할 주소
%>

	<!DOCTYPE>
	<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				//<!-- //2015-09-10 수정 -->
				$("#successModifyOriginMemberForm").attr("target", "_parent");
				$("#successModifyOriginMemberForm").submit();
			});
		</script>
	</head>
	<body>
		<form action="<%=strCurUrl %>" method="post" id="successModifyOriginMemberForm" name="successModifyOriginMemberForm">
		</form>
	</body>
	</html>