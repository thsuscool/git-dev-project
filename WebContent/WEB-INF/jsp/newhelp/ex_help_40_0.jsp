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
				<div class="leftTitle">통계지도 체험</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ex_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/ex_help_20_0">서비스 이용방법</a></li>
						<li><a href="/view/newhelp/ex_help_30_0">엑셀활용 방법</a></li>
						<li><a href="/view/newhelp/ex_help_40_0" class="on">출력 방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>출력 방법</h1>
					<img src="/img/newhelp/Ex_040_01.png" style="width:670px;" alt="인쇄하기"/>
					<h2>1) 출력하기 : 작성한 통계지도를 보고서 형식으로 출력할 수 있습니다.</h2>     
					
						
				</div>
				
				<br><br><br>
				
				<div class="contents">
				  <h1>보고서 출력</h1>
					<img src="/img/newhelp/Ex_040_02.gif" style="width:580px;" alt="보고서 출력"/>
					<h2>2) 지도 다운로드 : 통계값이 조회된 지도를 이미지로 다운받을 수 있습니다.(PNG파일형식)</h2>
					<h2>3) 자료 다운로드 : 통계값을 엑셀파일로 다운받을 수 있습니다.</h2>          
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
