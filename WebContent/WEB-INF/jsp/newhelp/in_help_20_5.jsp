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
								<li><a href="/view/newhelp/in_help_20_5"  class="on">ㆍ통계버튼 목록 관리</a></li>
								<li><a href="/view/newhelp/in_help_20_6">ㆍ시계열 통계 조회</a></li>
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
					<h1>통계버튼 목록 관리</h1>
					<h2>○ 조회타입에 따라 통계버튼을 지도상의 지역에 끌어서 놓기(drag&amp;drop) 하는 방식 또는 더블클릭 하는 방식으로 조회가</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;가능합니다.</h2>
					<h2>○ [삭제]버튼을 누르면 선택한 통계버튼은 삭제됩니다.</h2>
					<img src="/img/newhelp/In_020_18_new.png" style="margin-left: 130px; width:294px;" alt="길이계산"/>	
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
