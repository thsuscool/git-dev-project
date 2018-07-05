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
						<li><a href="/view/newhelp/in_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/in_help_20_0">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/in_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/in_help_20_1">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/in_help_20_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/in_help_20_4">ㆍPOI(관심지점) 조회방법</a></li>
								<li><a href="/view/newhelp/in_help_20_5">ㆍ통계버튼 목록 관리</a></li>
								<li><a href="/view/newhelp/in_help_20_6"  class="on">ㆍ시계열 통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_20_7">ㆍ다중뷰 통계 조회</a></li>
								<!--  <li><a href="/view/newhelp/in_help_20_8">ㆍ범례결합통계조건 통계 조회</a></li>-->
						        <li><a href="/view/newhelp/in_help_20_9">ㆍ데이터 업로드 이용방법</a></li>
							</ul>
						</li>							
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a></li>
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>시계열 통계 조회</h1>
					<h2>○ 통계 조회 시 센서스데이터의 기준년도를 지정해서 해당년도의 통계를 조회하는 기능입니다.</h2>
					<h2>○ 지도화면에 통계정보가 표출된 상태에서 데이터보드창 하단의 시계열정보창을 활성화시키고, 통계 기준년도를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;선택하면 해당년도의 통계정보가 조회됩니다. 그리고, 애니매이션 버튼을 누르면</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;조회 가능한 기준년도의 통계정보가 일정 간격으로 연속해서 표출됩니다.</h2>
					<h2>○ 행정구역통계는 시계열통계 조회 기능을 지원하지 않습니다.</h2>
					<img src="/img/newhelp/In_020_19_new.png"  style="margin-left: 10px; width:700px; height:380px" alt="시계열 통계 조회"/>	
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
