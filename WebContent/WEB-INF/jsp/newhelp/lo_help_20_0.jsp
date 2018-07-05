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
						<li><a href="/view/newhelp/lo_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/lo_help_20_0" class="on">서비스 이용방법</a></li>
						<li><a href="/view/newhelp/lo_help_30_0">통계항목 보기</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 이용방법</h1>
					<h2>○ 지방의 변화보기 서비스의 구성</h2>
					<img src="/img/newhelp/Lo_010_01.png" style="margin-left:20px; width:700px;" alt="지방의 변화보기 화면구성"/>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 통계항목 선택 : 지방의 변화에 대한 통계항목을 선택합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 지도창에서 행정구역을 선택하기 위해 마우스 왼쪽 버튼으로 클릭합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 통계값 표시 : 마우스를 지도창에 클릭하면 해당 행정구역의 통계값을 표시합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 데이터 보기 : 지도에 표시된 정보에 대한 통계 데이터를 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 데이터 표시 : 지도에 표시된 정보에 대한 통계 데이터를 조회할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;6) 범례조회 : 지도에 표시된 색상에 대한 범례정보를 확인할 수 있습니다.</h2>
 					<h2>&nbsp;&nbsp;&nbsp;&nbsp;7) 조사년별 데이터 조회 : 좌우 이동 버튼을 눌러 조사 년도별 데이터를 조회할 수 있습니다.</h2>
					<br><br>
					<h2>○ 데이터 보기</h2>
					<img src="/img/newhelp/Lo_020_01.png" style="margin-left:20px; width:300px;" alt="지방의 변화보기 데이터 보기"/>
					<br><br>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 데이터보기 버튼을 누르면 아래와 같은 데이터 창이 표시됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 데이터에 대한 설명자료가 표시됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 데이터 다운로드를 누르면 데이터 자료를 받으실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 지역을 마우스로 선택하시면 각 지역에 대한 데이터가 조회됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 데이터 표시 : 통계 데이터를 조회할 수 있습니다.</h2>
					<br><br>
					<h2>○ 지도에서 한 지역의 정보를 조회하기</h2>
					<img src="/img/newhelp/Lo_020_02.png" style="margin-left:20px; width:700px;" alt="지도에서 한 지역의 정보를 조회하기"/>
					<h2>1) 지도상에서 정보를 보고 싶어하는 지역으로 마우스를 이동시킵니다. 이동 후에 왼쪽 버튼을 클릭합니다.</h2>
					<h2>2) 해당 지역의 통계항목에 대한 값이 표현됩니다. 이때 3개의 지도가 같은 지역이 표시되어 값을 비교할 수 있습니다.</h2>
					<h2>3) 년도 이동 버튼을 눌러 전년도 및 후년도의 정보를 조회할 수 있습니다.</h2>
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
