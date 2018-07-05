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
				<div class="leftTitle">성씨분포</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/nm_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/nm_help_20_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1>
					<h2>○ 성씨분포 서비스는 우리나라의 성씨와 주요 본관에 대해서 지역별로 인구비율 및 과거로부터의 변화를<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 비교해볼 수 있는 서비스입니다.</h2>
					<h2>○ 각각의 성씨, 본관에 대해서 전국의 시군구단위로 인구분포현황 및 과거로부터의 인구변화를<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 색상지도 형태로 보여줍니다.</h2>
					<h2>○ 성씨분포 통계정보는 15년 주기의 통계정보를 제공합니다.</h2>

					<h2>○ 서비스 내용</h2> 
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 성씨 인구분포 : 50대 성씨 대상, 1985년/2000/2015년 인구와 인구비율 서비스 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 본관 인구분포 : 99대 본관 대상, 1985년/2000/2015년 인구와 인구비율 서비스</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 인구분포 변화 비교 : 1985년/2000/2015년의 인구분포 색상지도를 동시에 표출하여 한눈에 비교해보는 서비스</h2>
				    <br><br>
				  <h1>화면 구성</h1>
					 <!-- mng_s 20170811 웹접근성 조치 -->
					<img src="/img/newhelp/Nm_010_01.png" style="width:700px;" alt="성씨분포 화면구성"/>
					 <!-- mng_e 20170811 웹접근성 조치 -->
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 성씨 인구분포/본관 인구분포 선택 : 성씨별 본관별 인구분포를 선택합니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 성씨선택 : 성씨를 선택하여 인구분포를 조회합니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 통계값 표시 : 선택한 조건에 따라 인구분포 현황을 표시합니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 데이터 보기 : 선택하여 조회한 인구분포 정보에 대하여 데이터를 조회할 수 있습니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 범례보기 : 지도에 표시된 색상에 대하여 범례를 확인할 수 있습니다.</h2>
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
