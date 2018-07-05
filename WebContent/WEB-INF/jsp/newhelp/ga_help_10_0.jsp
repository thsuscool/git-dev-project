<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/common.css" />
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help.css" />
	<title>SGIS 플러스 도움말</title>
</head>
<body>
	<div class="wrapper">
		<!--header start-->
		<jsp:include page="/view/newhelp/helpHeader"></jsp:include>
		<!--header end-->
		<div class="container">
			<!--leftmenu-->
			<div class="leftWrap">
				<div class="leftTitle">우수활용사례</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ga_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/ga_help_20_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1>
					<h2>○ 통계지리정보의 자료제공이나 OpenAPI 등을 통하여 전국의 연구기관, 학교 등 다양한 분야에서 활용이 증가하고 있어.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;이용자가 직접 참여하고, 이용자가 우수 활용사례를 공유하고자 하는 서비스 입니다. </h2>
					<h2>○ 공간통계자료를 활용하여 논문이나 분석에 활용한 사례 및 OpenAPI를 연계하여 시스템을 개발한 사례에 대하여</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;이용자가 직접 등록하고, 승인절차에 따라 공개를 하도록 하고 있습니다.</h2>
					<br><br>
				  <h1>활용사례 등록방법</h1>
					<h2>○ 통계지리정보의 자료제공이나 OpenAPI를 통하여 연구 및 웹페이지를 개발합니다.</h2>
					<h2>○ 로그인을 하고 활용사례에 대한 세부내용을 등록합니다.</h2>
					<h2>○ 관리자가 등록하신 활용사례의 내용을 검토하여 승인 처리를 수행하면 등록하신 정보가 공개됩니다.</h2>
					<br><br>
				  <h1>활용사례 목록화면</h1>
					<img src="/img/newhelp/Ga_010_02.png" style="border-width:1px; margin-left: 0px; width:600px; height:700px" border=0 alt="활용사례목록 화면"/>
					<br><br>
				  <h1>활용사례 상세등록화면</h1>
					<img src="/img/newhelp/Ga_010_01.png" style="border-width:1px; margin-left: 0px; width:600px; height:700px" border=0 alt="활용사례화면 구성"/>
					<br><br>
				</div>
			</div><!--contentsWrap-->
		</div><!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div><!--wrapper-->
</body>
</html>
