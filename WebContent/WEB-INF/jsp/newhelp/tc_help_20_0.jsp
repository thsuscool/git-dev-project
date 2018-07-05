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
				<div class="leftTitle">기술업종 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/tc_help_10_0">서비스 개요</a></li>
						<li>
							<a href="/view/newhelp/tc_help_20_0" class="on">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/tc_help_20_0"  class="on">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/tc_help_20_1">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/tc_help_20_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/tc_help_20_5">ㆍ통계버튼 목록 관리</a></li>
						        <li><a href="/view/newhelp/tc_help_20_9">ㆍ데이터 업로드 이용방법</a></li>
							</ul>
						</li>
						<li><a href="/view/newhelp/tc_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>지도 표출 및 경계 표출</h1>
					<h2>○ 기술업종통계지도는 총 12단계의 타일맵이 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;지도를 축소/확대 할때에 각 지도 레벨에 해당하는 행정경계 정보가 표출됩니다.</h2>
					<h2>○ 1, 2레벨 ▶ 시/도 경계 표출</h2>
					<img src="/img/newhelp/In_020_1_new.png" border=0 alt="시/도 경계 표출"/>		
					<h2 style="margin-left: 320px;">[시/도 경계 표출]</h2><br>					
					<h2>○ 3, 4레벨 ▶ 시/군/구 경계 표출</h2>
					<img src="/img/newhelp/In_020_2_new.png" border=0 alt="시/군/구 경계 표출"/>	
					<h2 style="margin-left: 320px;">[시/군/구 경계 표출]</h2><br>										
					<h2>○ 5, 6, 7레벨 ▶ 읍/면/동 경계 표출</h2>
					<img src="/img/newhelp/In_020_3_new.png" border=0 alt="읍/면/동 경계 표출"/>				
					<h2 style="margin-left: 300px;">[읍/면/동 경계 표출]</h2><br>										
					<h2>○ 8, 9, 10, 11, 12레벨 ▶ 집계구 경계 표출</h2>
					<img src="/img/newhelp/In_020_4_new.png" border=0 alt="집계구 경계 표출"/>				
					<h2 style="margin-left: 300px;">[집계구 경계 표출]</h2><br>										
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
