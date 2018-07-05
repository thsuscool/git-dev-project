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
								<li><a href="/view/newhelp/us_help_30_0" class="on">ㆍSGIS플러스의 GIS 좌표체계</a></li>
						<!-- mng_e 20170913_김건민 -->		
								<li><a href="/view/newhelp/us_help_30_1">ㆍ자료신청시 참조사항</a></li>
								<li><a href="/view/newhelp/us_help_30_2">ㆍ브라우저 호환성</a></li>
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
				<!-- mng_s 20170915_김건민 -->	
				  <h1>SGIS플러스에서 사용하는 GIS 좌표체계</h1><br>
				<!-- mng_e 20170915_김건민 -->
					<h2>● 측지기준계 : 세계측지계 UTM-K(GRS80), EPSG 5179</h2>
					<h2>● Projection : Transverse_Mercator</h2>
					<h2>● False_Easting : 1000000</h2>
					<h2>● False_Northing : 2000000</h2>
					<h2>● Central_Meridian : 127.5</h2>
					<h2>● Latitude_Of_Origin : 38</h2>
					<h2>● Scale_Factor(축척계수) : 0.9996</h2>
					<h2>● Datum : GRS80</h2>
					<h2>● ArcGIS를 이용하실 경우는 첨부된 프로젝션 화일과 텍스트 파일을 참조하시기 바랍니다.</h2>
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
