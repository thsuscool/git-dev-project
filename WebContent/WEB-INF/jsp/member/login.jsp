<%
/**************************************************************************************************************************
* Program Name  : 기존회원 로그인 JSP  
* File Name     : login.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>로그인 | 통계지리정보서비스</title>
    
    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />	
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
       
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
    <script src="/js/common/common.js"></script>    
    <script src="/js/member/login.js"></script>
</head>
<body>
<!-- 	//2015-09-10 수정 -->
<!-- 	<script type="text/javascript"  src="/softcamp/scwebsc.js"></script> -->
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		
	    <!-- body -->
<!-- 	    2017.05.12 통합로그인관련공지 -->
		<div class="container" id="container" style="height:510px;">
			<img src="/img/common/login_notice_popup.png" style="margin-left:15%; cursor:pointer;" onclick="window.open('http://kosis.kr/news/news_01Detail.jsp?p_id=1974');"/>
			<!-- 2016.12.02 시큐어코딩 삭제  -->
			<div class="login_popbox" style="width: 440px; height: 358px; left: 50%; top: 75%; margin: -200px 0 0 -220px; position: absolute;">
				<div class="login_con">
					<p class="login_title"><img src="/img/um/title_login.gif" alt="login" /></p>
<!-- 					//2015-09-10 수정 -->
					<p class="login_txt">SGIS<sup>+plus</sup> 를 이용하기 위하여 로그인이 필요합니다.<br />아직 회원이 아니시면 회원가입후 이용해주세요.</p>
			
					<div class="boxlogincon">
						<div>
							<dl>
								<dt class="mb5"><label for="member_id">아이디</label></dt>
								<dd class="mb5"><input type="text" name="member_id" id="member_id" value="" style="width: 183px;" /></dd>
								<dt><label for="pw">비밀번호</label></dt>
								<dd><input type="password" name="pw" id="pw" value=""  style="width: 183px;" /></dd>
							</dl>
			
							<p>
<!-- 								//2015-09-10 수정 -->
								<!-- 2016.12.02 시큐어코딩 삭제  -->
								<a href="javascript:login.checkLogin();">로그인</a>
							</p>
						</div>
					</div>
			
					<div class="login_btn_center">
						<a href="javascript:login.find_ID();"><img src="/img/um/btn_idsearch.gif" alt="아이디찾기" /></a>
						<a href="javascript:login.find_PW();"><img src="/img/um/btn_pwsearch.gif" alt="비밀번호찾기" /></a>
<!-- 						//2015-09-10 수정 -->
						<a href="javascript:memberRegister();"><img src="/img/um/btn_sgismemberjoin.jpg" alt="회원가입" /></a>
						<!-- 2016.12.02 시큐어코딩 삭제  -->
					</div>
				</div>							
			</div>
			<!-- 2016.12.02 시큐어코딩 삭제  -->
	    </div>
	    
	    <!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
		
<!-- 		//2015-09-10 수정 -->
		<iframe id="originloginCheckFrame" name="originloginCheckFrame" width='0' height='0' frameborder='0'></iframe>
		<form id="originLoginCheckForm" action="/html/authorization/originLogin.jsp" method="post" name="originLoginCheckForm">
			<input type="hidden" id="SYS_USR_ID" name="SYS_USR_ID"/>
			<input type="hidden" id="SYS_USR_PW" name="SYS_USR_PW"/>
		</form>
		
		
	</div>
	<!--nProtect 키보드보안 적용 시작-->
<!-- 	Local 전용 -->
<!-- 	<script src="https://supdate.nprotect.net/nprotect2007/keycrypt/kostat/npkfx_multi.js" type="text/javascript"></script> -->
	<!--nProtect 키보드보안   적용 끝-->
</body>
</html>