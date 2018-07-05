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
				<div class="leftTitle">우수활용사례</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ga_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/ga_help_20_0" class="on">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>활용사례 등록</h1>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 활용사례 등록 바를 선택합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 활용사례 내용을 등록합니다
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(TIP:메모장에 등록하실 내용을 복사해두었다가 이용하시면 편리합니다)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 등록신청 버튼을 누르면 등록이 완료됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;관리자가 내용을 검토하고 승인처리를 수행하면 공개가 됩니다.</h2>
					<img src="/img/newhelp/Ga_020_01.png" style="border-width:1px; margin-left: 0px; width:600px; height:700px" border=0 alt="활용사례 등록화면"/>
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
