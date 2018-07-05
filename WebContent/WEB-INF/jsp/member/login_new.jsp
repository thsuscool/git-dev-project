<%
/**************************************************************************************************************************
* Program Name  : 통합회원 로그인 JSP  
* File Name     : login_new.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
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
    <script type="text/javascript"  src="/js/common/common.js"></script>
    <script type="text/javascript">
	    $(document).ready(function() {
	    	
	    	
	    	//====================================== 시작 오픈전 임시막기 ===================================================
	    	//2015-09-10 수정
	   // 	var tmp_pw = prompt("9월 15일 정식 오픈전까지 로그인이 불가능합니다. 취소를 누르세요.", "");
	    	
	   // 	if(tmp_pw != "aaabbbccc") {
	//			document.location.href="http://sgis.kostat.go.kr";
	//		}
			

	    	//========================================= 끝 오픈전 임시막기 ================================================
	    	
			var returnUrl = getParameter("returnPage");
			if (returnUrl != undefined && returnUrl != null && returnUrl.length > 0) {
				returnUrl = decodeURI(returnUrl);
				setTimeout(function(){
					memberLogin(returnUrl);
				},600);
// 				$(".btnTotalLogin").click(function() {
// 					apiLogWrite2("E3","E31",$(".btnTotalLogin").text(),"없음","00","없음");
// 					memberLogin(returnUrl);
// 				});
// 				$(".btnOldLogin").click(function() {
// 					apiLogWrite2("E3","E32",$(".btnOldLogin").text(),"없음","00","없음");
// 					window.location.href = "/view/member/login?returnPage=" + encodeURI(returnUrl); 
// 				});
			}
		});
	    
	    
	    
	    
    </script>
  	
</head>
<body> 
<!-- 	<div id="wrap"> -->
<!-- 		<!-- header // --> 
<!-- 		<header> -->
<!-- 			<!-- Top Include --> 
<%-- 			<jsp:include page="/view/common/includeSearch"></jsp:include> --%>
<!-- 		</header> -->
				
<!-- 	    body -->
<!-- 	    <div class="container" id="container"> -->
<!-- 			<!-- 2016.12.02 시큐어코딩 삭제  --> 
<!-- 			<div class="loginbox"> -->
<!-- 	    		<h3>로그인</h3> -->
<!-- 	    		<ul> -->
<!-- 	    			//2015-09-10 수정 -->
<!-- 	    			<li>통합회원으로 가입하시면 통계청에서 운영하는 통계정보서비스를 하나의 아이디로 이용하실 수 있습니다.</li> -->
<!-- 	    		
<!-- 	    			<li>2017년 9월 15일까지 한시적으로 기존 로그인이 가능하며 이후 기존 회원정보는 삭제됩니다.</li> -->
<!-- 	    		--> 
<!-- 	    		</ul>  -->
<!-- 	    		<div class="loginBtnbox"> -->
<!-- 	    			<a class="btnTotalLogin" style="cursor:pointer;">통합로그인</a> -->
<!-- 	    			<p class="totalTxt">통계청 ONE - ID를 통해 <br />신규 가입 또는 통합전환을 하신 회원들의 로그인 방법입니다.</p> -->
<!-- 	    			<a class="btnOldLogin" style="cursor:pointer;">기존로그인</a> -->
<!-- 	    			<p class="oldTxt">통계청 통합회원으로 <br />전환을 하지 않은 기존 회원들의 로그인 방법입니다.</p> -->
<!-- 	    		</div> -->
<!-- 	    	</div> -->
<!-- 			<!-- 2016.12.02 시큐어코딩 삭제  --> 
<!-- 	    </div> -->
	    
<!-- 	    footer// -->
<!-- 	    <footer id="footer"> -->
<!-- 	    	Bottom Include -->
<%-- 			<jsp:include page="/view/common/includeBottom"></jsp:include> --%>
<!-- 	    </footer> -->
<!-- 	</div>  -->
	<iframe id='loginFrame' src='/html/authorization/login.jsp' width='0' height='0' frameborder='0' title="로그인프레임"></iframe>
</body>
</html>