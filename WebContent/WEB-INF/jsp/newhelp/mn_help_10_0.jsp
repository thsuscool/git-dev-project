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
				<div class="leftTitle">월간통계</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/mn_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/mn_help_20_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1>
					<h2>○ 월간통계 서비스는 소비자물가지수, 실업률 등 월간 주요 통계정보를 당월통계, 전월비 및 전년동월비 등 3가지로<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 구분하여 지도기반의 색상지도로 보여주는 서비스입니다.</h2>
					<h2>○ 통계정보는 2008년 이후 월단위로 제공하고, 통계항목에 대한 시도단위의 통계값을 지도에 표출합니다.</h2>
					<h2>○ 통계항목에 대한 보도자료 요약정보, 단위, 산술식 등 자세한 설명 자료 제공합니다.</h2>
					<h2>○ 제공하는 통계 항목</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 고용동향 : 고용률, 실업률</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 산업활동동향 : 광공업지수(생산/출하/재고), 부도율, 대형소매판매액지수</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 소비자물가동향 : 소비자물가지수, 생활물가지수</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 인구동향 : 출생아수, 사망자수, 혼인건수, 이혼건수</h2>
				    <br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/Mn_010_01.png" style="width:700px;" alt="월간통계 화면구성"/>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 통계항목선택 : 고용동향, 산업활동동향, 소비자물가동향, 인구동향을 선택할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 년월선택 : 년월을 선택하여 조회합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 통계항목에 대한 당월통계, 전월비, 전년동월비를 한번에 확인할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 지도창에서 행정구역을 선택하기 위해 마우스 왼쪽 버튼으로 클릭합니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 자료받기 : 보고서와 보도자료를 다운받을 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;6) 통계항목설명 : 조회하는 통계항목에 대한 설명자료를 확인할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;7) 데이터/그래프 조회 : 통계항목에 대한 데이터와 그래프 조회를 수행합니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;8) 월별 데이터 조회 : 좌우 이동 버튼을 눌러 월별 데이터를 조회할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;9) 범례조회 : 지도에 표시된 색상에 대한 범례정보를 확인할 수 있습니다.</h2>
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
