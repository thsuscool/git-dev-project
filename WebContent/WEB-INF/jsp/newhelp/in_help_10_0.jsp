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
				<div class="leftTitle">대화형 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/in_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/in_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a></li>
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1><br>
					<h2>○ 인구, 주택, 가구, 농림어업, 사업체 센서스 및 행정구역통계 등 다양한 통계정보를 지역단위로 자유롭게 조회할 수 있는</h2>
					<h2>&nbsp;&nbsp;&nbsp;통계지리정보 서비스입니다.</h2>
					<h2>○ 다양한 통계항목을 조건별로 세분화하여 사용자 관심항목에 따라 조회할 수 있습니다.</h2>
					<h2>○ 원하는 통계 항목을 미리 설정하고 이를 지도상의 지역에 끌어서 놓기(drag&drop)하거나,</h2>
					<h2>&nbsp;&nbsp;&nbsp;선택항목을 두번 연속 클릭(더블 클릭)하는 방식으로 통계 조회가 가능합니다.</h2>
					<h2>○ 공간통계 정보를 쉽고 빠르게 조회할 수 있습니다.</h2>
					<h2>○ 주요기능</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 통계 검색조건 설정 : 인구/주택/가구/사업체 등 통계조회를 위한 다양한 검색조건 설정</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 통계 정보 표출 : 통계 검색조건에 대한 해당 지역의 통계정보를 지도위에 시각화하여 표출</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- POI 마커 표출 : 사용자가 선택한 분류에 해당하는 사업체 위치를 지도위에 마커 형태로 표출</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 사용자데이터 표출 : 개인 데이터를 업로드하여 지도위에 표출하고 분석이 가능함</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 다중뷰 : 통계지도를 여러개 표출하여 동일 조건에 대한 지역별 차이를 비교하거나<br>
				    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 동일 지역에 대한 서로 다른 통계조건 비교를 할 수 있음</h2>
					<br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/In_010_new.png" style="border-width:1px; border-color:whitegray; border-style:silid; width:700px; height:400px" alt="설명"/>				
					<h2 style="font-weight:bold">1) 지역설정 : 지도에서 특정 지역으로 이동하도록 설정합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도를 움직이면 해당 지도의 중심 좌표를 변환하여 지역명이 표시됩니다.</h2>
				    <h2 style="font-weight:bold">2) 튜토리얼 : 처음 사용자를 위한 튜토리얼을 진행합니다.</h2>
				    <h2 style="font-weight:bold">3) 사용자 부가기능 : 사업체 전개도, 초기화, 전체화면 확대 등을 수행합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사업체 전개도 보기 : 사업체 전개도가 제공되는 건물을 표시(on/off) 합니다. </h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 전체화면 확대 : 지도화면을 확대합니다. </h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 초기화 : 현재 지도 화면을 초기화합니다. </h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- URL공유하기 : 조회된 통계를 공유하도록 URL을 제공합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 즐겨찾기로 저장하기 : 조회하고 있는 통계를 별도로 북마크 할 수 있습니다. </h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 보고서 보기 : 개인이 검색한 데이터를 보고서로 나타내며 출력할 수 있습니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도 추가하여 비교하기 : 다양한 조회/비교가 가능하도록 지도 화면을 좌/우로 분할합니다.(다중뷰는 3개까지 가능)</h2>
				    <h2 style="font-weight:bold">4) 통계항목 설정 : 통계항목과 상세조건을 설정합니다.</h2>
					<h2 style="font-weight:bold">5) 데이터 보드 : 조회된 데이터에대한 막대그래프, 원형그래프, 시계열조회등 다양하게 데이터를 확인 할 수 있습니다.</h2>
					<h2 style="font-weight:bold">6) 통계버튼 : 조회하고자 하는 통계항목 들이 버튼형태로 추가됩니다. </h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 통계버튼이 저장되며 각 통계버튼을 지도 위 경계가 표시된 곳에 "드래그 앤 드롭" 또는 더블클릭하여 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 통계버튼이 저장되어 있으므로 다시 동일한 조건을 다시 생성할 필요가 없습니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 통계버튼 삭제 : 생성된 통계버튼을 삭제할 수 있습니다.</h2>
					<h2 style="font-weight:bold">7) 지도 부가기능 : 지도창에서 거리, 면적계산 및 POI표출을 수행합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도 상에서 사용자가 원하는 범위의 측정, 영역조회, POI표시 기능을 제공합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사용자 범위측정 : 면적 및 거리측정</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사용자 영역조회 : 원, 사각형, 다각형 등 사용자가 작성한 영역에 대한 통계를 조회할 수 있습니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(단, 현재 표출된 통계항목에 대한 데이터 조회에 한합니다)</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- POI : 9가지 주요 테마로 구분된 사업체에 대한 간략한 정보 제공</h2>
					<h2 style="font-weight:bold">8) 축척조정 : 지도의 축척을 조정합니다. 지도의 축소/확대를 수행할 수 있습니다.</h2>
					<h2 style="font-weight:bold">9) 데이터시각화 : 표시된 통계값의 범례를 표시하며 범례설정 변경도 가능합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도에서 시각화된 데이터의 범례이며 사용자 설정을 통해 원하는 범례단계, 색상 등 적용기준을 설정할 수 있습니다.</h2>
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
