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
						<li><a href="/view/newhelp/tc_help_20_0">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/tc_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/tc_help_20_1"  class="on">ㆍ지도창 조작 방법</a></li>
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
					<h1>지도창 조작 방법</h1>
					<h2>○ 지도이동은 마우스 드래그 방식으로 동작하고, 지도확대 및 축소는 마우스 휠 조작 또는 지도레벨 컨트롤 조작에 의해서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;동작합니다.</h2>
					<h2>○ 지도 레벨 컨트롤을 이용해서 1단계 지도 레벨 확대/축소를 할 수 있습니다.</h2>
					<img src="/img/newhelp/So_020_6_new.png" style="margin-left: 100px; width:400px; height:250px" border=0 alt="지도레벨 제어"/>
					<br><br>
					<h1>행정구역으로 이동하는 방법</h1>
					<h2>○ 시도, 시군구, 읍면동 각 단계별 행정구역을 선택해서 행정구역 위치조회를 할 수 있습니다.</h2>
					<h2>○ 지도 이동 시 지도화면의 중심점 위치에 해당하는 행정구역 정보가 설정된다.</h2>
					<img src="/img/newhelp/In_020_7_new.png" style="margin-left: 100px; width:500px; height:340px" border=0 alt="행정구역으로 이동하는 방법"/>	
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
