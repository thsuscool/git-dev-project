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
				<div class="leftTitle">홈페이지 이용안내</div>
				<div class="leftmenu">
					<ul>
						<!-- mng_s 20170915_김건민 -->	
						<li><a href="/view/newhelp/us_help_10_0">SGIS플러스란?</a></li>
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a></li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a>
							<ul class="sub">
								<li><a href="/view/newhelp/us_help_30_0">ㆍSGIS플러스의 GIS 좌표체계</a></li>
						<!-- mng_e 20170915_김건민 -->	
								<li><a href="/view/newhelp/us_help_30_1">ㆍ자료신청시 참조사항</a></li>
								<li><a href="/view/newhelp/us_help_30_2" class="on">ㆍ브라우저 호환성</a></li>
								<li><a href="/view/newhelp/us_help_30_3">ㆍ기타 주의사항</a></li>
							</ul>
						</li>
						<!-- <li><a href="/view/newhelp/us_help_40_0">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>브라우저 호환성</h1><br>
				  	<!-- mng_s 20170915_김건민 -->	
					<h2>● SGIS플러스는 HTML5 기반으로 구축되어 있습니다. 다음과 같은 브라우저에서 최적으로 사용하실 수 있습니다.</h2>
					<!-- mng_e 20170915_김건민 -->	
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;· Internet Explorer 10 이상</h2>
					<h2><a href="http://windows.microsoft.com/ko-KR/internet-explorer/products/ie/home" style="font-size:14px; color:#0000ff;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://windows.microsoft.com/ko-KR/internet-explorer/products/ie/home</a></h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;· Google Chrome 37 이상</h2>
					<h2><a href="http://www.google.com/chrome" style="font-size:14px; color:#0000ff;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://www.google.com/chrome</a></h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;· Mozilla Firefox 32 이상</h2>
					<h2><a href="http://www.mozila.or.kr/ko/firefox/" style="font-size:14px; color:#0000ff;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://www.mozila.or.kr/ko/firefox/</a></h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;· Apple Safari 6.0 이상</h2>
					<h2><a href="http://www.apple.com/kr/safari/" style="font-size:14px; color:#0000ff;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http://www.apple.com/kr/safari</a></h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;· Opera 22 이상</h2>
					<h2><a href="http://www.opera.com" style="font-size:14px; color:#0000ff;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://www.opera.com</a></h2>
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
