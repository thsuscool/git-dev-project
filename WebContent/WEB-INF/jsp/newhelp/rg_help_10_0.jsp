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
				<div class="leftTitle">통계 갤러리</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/rg_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/rg_help_20_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1><br>
					<h2>○ 통계갤러리는 사용자가 SGIS를 이용해서 검색한 다양한 통계정보 또는 사용자가 생성한 통계정보를 공유하며<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 함께 소통할 수 있는 서비스입니다.</h2>
					<h2>주요 기능</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 갤러리 등록 : 등록정보 설정, 이미지 등록, 기존 즐겨찾기 항목 선택 등을 이용해서<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 갤러리를 등록합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 기존 서비스를 조회하여 갤러리 등록 : 대화형통계지도, 살고싶은 우리동네 등 주요서비스에 대한<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 조회결과를 갤러리로 등록합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 활용사례 등록 : 이용자가 직접 통계정보를 수급하고 활용한 사례를 등록하고 공유합니다.</h2>
					<br><br>
				  <h1>통계 갤러리 등록방법</h1><br>
					<h2>○ 로그인을 하고 SGIS 서비스에서 기존에 저장해둔 즐겨찾기한 지도 이미지를 활용하거나 직접 이미지를 업로드하여</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;등록합니다.</h2>
				  	<br><br>
				  <h1>통계 갤러리 목록 화면</h1>
					<img src="/img/newhelp/Rg_010_01.png"  style="width:700px;" alt="설명"/>
					<br><br>      
				  <h1>통계 갤러리 등록 화면</h1>
					<img src="/img/newhelp/Rg_010_02.png"  style="width:700px;" alt="설명"/>
					<br><br>
				  <h1>마이 갤러리 목록 화면</h1>
				  	<h2>○ 마이 갤러리는 즐겨찾기, 작성한 갤러리, 수집한 갤러리를 조회할 수 있는 서비스입니다.</h2>
					<img src="/img/newhelp/Rg_010_03.png"  style="width:700px;" alt="설명"/>
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
