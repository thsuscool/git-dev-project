<%
/**************************************************************************************************************************
* Program Name  : 통합회원가입 결과 수신 JSP  
* File Name     : returnRegister.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-07-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	//<!-- //2015-09-10 수정 -->
	String strCurUrl = request.getParameter("returnPage");			//이동할 주소
	String strSsnInfo = request.getParameter("SSN_INFO");			//통합이용자 접속 세션 ID
	String strUsrId = request.getParameter("USR_ID");				//통합이용자 아이디
	String strUsrPw = request.getParameter("USR_PW");				//통합이용자 패스워드
	String strUsrName = request.getParameter("USR_NAME");			//통합이용자 이름
	String strUsrSn = request.getParameter("USR_SN");	 			//통합이용자 번호
	String strUsrGubun = request.getParameter("USR_GUBUN");	 		//통합이용자 구분 (N : 신규, K, M, S, E : 통합전환)
	String strIpAddress = request.getParameter("SID_IP_ADDR");	 	//통합이용자 접속 아이디
	String strLoginYN = request.getParameter("LOGIN_YN");			//로그인 여부
	String strUsrBirth = request.getParameter("USR_BIRTHDAY");		//통합이용자 생년월일
	String strPhoneNo = request.getParameter("USR_MOBILE");			//핸드폰번호
	String strEmail = request.getParameter("USR_EMAIL");			//이메일
	
	HttpSession httpSession = request.getSession();
	httpSession.setAttribute("member_id", strUsrId);
	httpSession.setAttribute("member_pw", strUsrPw);
	httpSession.setAttribute("member_sn", strUsrSn);
	httpSession.setAttribute("member_nm", strUsrName);
	httpSession.setAttribute("member_gubun", strUsrGubun);
	httpSession.setAttribute("login_yn", strLoginYN);
	httpSession.setAttribute("ssn_info", strSsnInfo);
	httpSession.setAttribute("sid_ip_addr", strIpAddress);
	httpSession.setAttribute("birth", strUsrBirth);
	httpSession.setAttribute("cp_no", strPhoneNo);
	httpSession.setAttribute("sc_telephone", strPhoneNo);
	httpSession.setAttribute("email", strEmail);
	httpSession.setAttribute("sc_email", strEmail);
%>

<!DOCTYPE>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				$("#successRegisterForm").attr("target", "_parent");
				$("#successRegisterForm").submit();
			});
		</script>
	</head>
	<body>
		<form action="<%=strCurUrl %>" method="post" id="successRegisterForm" name="successRegisterForm">
		</form>
	</body>
</html>