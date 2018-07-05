<%
/**************************************************************************************************************************
* Program Name  : 개발자지원 소개 JSP  
* File Name     : sopDeveloper.jsp
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

<title>SOP 안내 - 개발자지원 | 통계지리정보서비스</title>

<link href="/css/default.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script src="/js/common/common.js"></script>
<script src="/js/board/sopDeveloper.js"></script>

<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<style>
.function h1{font-size:14px; font-weight:700; color: #666; padding-top:15px; letter-spacing: -0.6px; font-weight: 100;}
.function h2{font-size:13px;  text-indent:19px; color: #666; letter-spacing: -0.6px; font-weight: 100;}
.function h2 span{ font-weight: 100;padding-left: 116px; line-height: 30px;}
.function h2 span.pl{ padding-left: 128px; }
</style>
<script type="text/javascript">
	
</script>
</head>
<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div id="container">
			<p class="path">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/board/sopBoardMain"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/board/sopIntro"><span class="path_el">SOP 소개&nbsp;&nbsp;>&nbsp;</span></a> 
				<a href="/view/board/sopDeveloper"><span class="path_el current">개발자지원</span></a> 
			</p>
			<div id="contents">
				<h3 class="ptit">개발자지원</h3>
				<div id="content">
					<div class="pl20 pr20">
						<h4 class="itit">SGIS 오픈 플랫폼의 다양한 기능을 활용하여 창조적 개발활동을 지원합니다.</h4>
						<p class="para">개발자들의 놀이터! OpenAPI를 활용해 나의 아이디어를 실현합니다.</p>
						<p class="para">지도, 경계, 통계 API를 활용해 다양한 공간통계 서비스 개발이 가능하도록 풍부한 예시와 함께 사용자 가이드를 제공합니다.</p>
						<p class="para mb30">실시간으로 API 소스를 변경해 보면서 테스트 할 수 있는 환경을 제공합니다.</p>

						<h4 class="itit">서비스 기능별 설명</h4>
						<p class=""></p>
						<br />
						<p class="">
							<img src="/img/nm/nm_data_02_1.jpg" alt=""
								style="margin-bottom: 10px;" />
						</p>
						<div class="function">
							<h1>① JIT : 다양한 샘플을 제공하여 실시간으로 API를 테스트 할 수 있습니다. <br /><br />
							   <span style="margin-left: 15px">지도 API : 지도관련 OpenAPI의 구성, 정의, 내용, 사용예제를 제공합니다.</span><br /><br />
							   <span style="margin-left: 15px">Data API : 데이터관련 OpenAPI의 구성, 정의, 내용, 사용예제를 제공합니다.</span><br /><br />
							   <span style="margin-left: 15px">My App : API를 활용하기 위한 인증키 발급절차와 신청을 할수 있습니다.</span><br /><br />
							   <span style="margin-left: 15px">Q&A : OpenAPI 개발관련 질의/응답 기능을 제공합니다.</span></h1>
							<h1>② 지도 API : 지도관련 OpenAPI의 구성, 정의, 내용, 사용예제를 제공합니다. <br /><br />
							   <span style="margin-left: 15px">Data API : 데이터관련 OpenAPI의 구성, 정의, 내용, 사용예제를 제공합니다.</span></h1>
							<h1>③ Q&A : OpenAPI 개발관련 질의/응답 기능을 제공합니다.</h1>
							<h1>④ 공지사항, 질의응답, 자주하는 질문에 대한 기능을 제공합니다.</h1>
						</div>
						<p style="margin-bottom: 50px"></p>
						<p class="mb45 btn_arr_link">
							<a href="#" title="개발자지원 바로가기(새창)"
								onclick="window.open('https://sgis.kostat.go.kr/developer')"
								alt="개발자지원 바로가기">개발자지원 바로가기</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>