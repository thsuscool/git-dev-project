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
						<li><a href="/view/newhelp/mn_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/mn_help_20_0" class="on">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 이용방법</h1>
					<h2>○ 메인화면</h2>
					<img src="/img/newhelp/Mn_010_01.png" style="width:700px;" alt="월간통계 화면구성"/>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 통계항목선택 : 고용동향, 산업활동동향, 소비자물가동향, 인구동향을 선택할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 년월선택 : 년월을 선택하여 조회합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 통계항목에 대한 당월통계, 전월비, 전년동월비를 한번에 확인할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 지도창에서 행정구역을 선택하기 위해 마우스 오른쪽 버튼으로 클릭합니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 자료받기 : 보고서와 보도자료를 다운받을 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;6) 통계항목설명 : 조회하는 통계항목에 대한 설명자료를 확인할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;7) 데이터/그래프 조회 : 통계항목에 대한 데이터와 그래프 조회를 수행합니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;8) 월별 데이터 조회 : 좌우 이동 버튼을 눌러 월별 데이터를 조회할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;9) 범례조회 : 지도에 표시된 색상에 대한 범례정보를 확인할 수 있습니다.</h2>
					<br><br>

					<h2>○ 고용동향(고용률, 실업률)의 전월비 및 전년동월비의 단위</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 전월비 %p = (당월-전월)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 전년동월비 %p = (금년당월-전년동월)</h2>
					<br><br>
					<h2>○ 산업활동동향(광공업생산지수, 광공업출하지수, 광공업재고지수, 부도율, 대형소매판매액지수), 소비자물가동향</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;(소비자물가지수, 생활물가지수), 인구동향(출생아수, 사망자수, 혼인건수, 이혼건수)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 전월비 % = ((당월-전월)/전월)*100</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 전년동월비 % = ((금년당월-전년동월)/전년동월)*100</h2>
					<br><br>
					<h2>○ 전월비 보기 : 해당(선택) 월의 전월비를 통계지도로 볼 수 있습니다.</h2>
					<h2>○ 전년 동월비 보기 : 해당(선택) 월의 전년 동월비를통계지도로 볼 수 있습니다.</h2>
					<h2>○ 전ㆍ후ㆍ월 선택하여 전월, 전년동월비 보기 : 해당(선택) 월의 전, 후 월을 클릭하면 선택한 월의 전월비 및</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;전년동월비를 통계지도로 볼 수 있습니다.</h2>
					<h2>○ 항목선택 : 통계 항목 리스트가 보이며 원하는 항목을 선택하면 해당 항목의 데이터가 적용된 통계지도를 볼 수</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;있습니다.</h2>
					<h2>○ 월별 수치 시계열 그래프로보기 : 통계지도에서 해당 행정구역(시,도)를 클릭하면 해당 지역의 월별 수치를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;시계열 그래프로 볼 수 있으며 그래프를 마우스로 클릭하면 전국그래프를 볼 수 있습니다.</h2>
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
