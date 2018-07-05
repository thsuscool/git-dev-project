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
				<div class="leftTitle">지방의 변화보기</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/lo_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/lo_help_20_0">서비스 이용방법</a></li>
						<li><a href="/view/newhelp/lo_help_30_0">통계항목 보기</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1>
					<h2>○ 지방의 변화보기는 통계적으로 지방(시군구)의 변화하는 모습을 제공하는 서비스입니다.</h2>
					<h2>○ 1995년부터 최근까지 5년 간격으로 인구, 주택비율 등 시군구별 통계를 지도로 제공하고,<br>
					&nbsp;&nbsp;&nbsp;&nbsp; 동시에 3개의 지도를 표출하여 한눈에 통계변화를 확인해볼 수 있습니다.</h2>
					<h2>○ 통계정보는 지도 외에 표 형태로 확인할 수 있고 시도 단위로 전체 년도에 대한 통계를 한꺼번에 제공합니다.</h2>
					<h2>○ 제공하는 통계 항목은 다음과 같습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 가구/인구 비율 : 연령대/혼인상태별 인구,1인/3세대이상 가구, 20대/40대 출산율 등</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사회 비율 : 교육수준, 여성 학력, 재혼 구성비 등</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 교통 비율 : 통근통학 인구, 통근통학 시 교통수단, 자동차 보유 가구 등</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 주택 비율 : 아파트/공동주택/단독주택 비율, 평수별 주택 비율 등</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 종교 비율 : 종교/불교/천주교/개신교/기타종교 인구</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사업체 비율 : PC방/편의점/보육업체/학원 비율</h2>
				    <br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/Lo_010_01.png" style="width:700px;" alt="지방의 변화보기 화면구성"/>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 통계항목 선택 : 지방의 변화에 대한 통계항목을 선택합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 지도창에서 행정구역을 선택하기 위해 마우스 왼쪽 버튼으로 클릭합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 통계값 표시 : 마우스를 지도창에 클릭하면 해당 행정구역의 통계값을 표시합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 데이터 보기 : 지도에 표시된 정보에 대한 통계 데이터를 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 데이터 표시 : 지도에 표시된 정보에 대한 통계 데이터를 조회할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;6) 범례조회 : 지도에 표시된 색상에 대한 범례정보를 확인할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;7) 조사년별 데이터 조회 : 좌우 이동 버튼을 눌러 조사 년도별 데이터를 조회할 수 있습니다.</h2>
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
