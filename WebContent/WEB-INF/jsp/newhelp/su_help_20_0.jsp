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
				<div class="leftTitle">통계주제도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/su_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/su_help_20_0" class="on">통계항목 선택방법</a></li>
						<li><a href="/view/newhelp/su_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>통계주제도 목록 조회</h1><br>
					<h2>○ 포털사이트 홈에서 통계주제도 메뉴를 선택하면 목록을 조회할 수 있습니다.</h2>
					<h2>○ 통계주제도 목록 화면에서는 인구와 가구, 주거와 교통, 복지와 문화, 노동과 경제, 환경과 안전등 5가지 카테고리로</h2>
					<h2>&nbsp;&nbsp;&nbsp;분류되어 있고, 각각의 카테고리별로 최근에 등록된 5개의 통계주제도 항목이 표출됩니다.</h2>
					<!-- 2016.03.18 수정, 이미지 높이 수정 -->
					<img src="/img/newhelp/Su_010_02_new.png" style="width:700px;" alt="통계주제도"/>
					<h2 style="margin-left: 300px;">[통계주제도]</h2><br>
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
