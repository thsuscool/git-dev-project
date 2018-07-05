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
				<div class="leftTitle">통계갤러리</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/rg_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/rg_help_20_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/rg_help_20_0">ㆍ갤러리</a></li>
								<li><a href="/view/newhelp/rg_help_20_1" class="on">ㆍ활용 사례</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>활용 사례 등록</h1>
				  	<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 갤러리 등록 버튼을 클릭합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 활용 사례 등록을 선택하면 등록 화면으로 전환됩니다.</h2>  
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 등록 버튼을 클릭하면 등록이 완료됩니다.</h2>
					
				    <img src="/img/newhelp/Rg_020_05.png" alt="통계사례 등록화면"/>
					<img src="/img/newhelp/Rg_020_06.png" alt="통계사례 등록화면"/>
					<img src="/img/newhelp/Rg_020_07.png" alt="통계사례 등록화면"/>
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
