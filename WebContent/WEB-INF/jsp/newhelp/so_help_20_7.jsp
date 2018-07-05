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
				<div class="leftTitle">우리동네생활업종</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/so_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/so_help_20_0">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/so_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/so_help_20_1">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/so_help_20_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/so_help_20_5">ㆍ통계버튼 목록 관리</a></li>
								<li><a href="/view/newhelp/so_help_20_7" class="on">ㆍ다중뷰 통계 조회</a></li>
						        <li><a href="/view/newhelp/so_help_20_9">ㆍ데이터 업로드 이용방법</a></li>
							</ul>
						</li>							
						<li><a href="/view/newhelp/so_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>다중뷰 통계 조회</h1>
					<h2>○ 지도화면을 2개 사용해서 통계를 조회할 수 있는 기능입니다.</h2>
					<h2>○ 화면 상단 메뉴에서 지도화면 추가 버튼을 누르면 기존 지도화면이 2개의 지도화면으로 분리되고,</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;각각의 지도화면에 서로 다른 통계정보를 조회할 수 있습니다.</h2>
					<h2>○ 통계버튼에는 2개의 지도화면 중 어느 쪽에서 통계정보가 조회되고 있는지 확인할 수 있도록</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;지도화면을 구분하는 색상을 표시해서 구분할 수 있습니다.</h2>
					<img src="/img/newhelp/So_020_20_new.png"  style="margin-left: 10px; width:700px; height:340px" alt="다중뷰 통계 조회"/>	
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
