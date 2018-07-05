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
				<div class="leftTitle">OpenAPI</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/de_help_10_0">OpenAPI 소개</a></li>
						<li><a href="/view/newhelp/de_help_20_0">OpenAPI 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/de_help_20_0"  class="on">ㆍ지도 API</a></li>
								<li><a href="/view/newhelp/de_help_20_1">ㆍData API</a></li>
								<li><a href="/view/newhelp/de_help_20_2">ㆍ모바일 SDK</a></li>
								<li><a href="/view/newhelp/de_help_20_3">ㆍ체험하기</a></li>
								<li><a href="/view/newhelp/de_help_20_4">ㆍ문의하기</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>지도 API</h1>
				  	<!-- mng_s 20180205_김건민-->
					<h2>○ 개발지원센터에서 자바스크립트(JavaScript) 언어를 사용하여 웹 사이트를 구현하는데 사용할 수 있는 지도 API</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;상세안내를 제공합니다.</h2>
					<h2>○ 개발지원센터에서 지도 API을 선택하면 지도 API 정보페이지를 조회할 수 있습니다.</h2>
					<h2>○ 지도API의 인터페이스 정의서 링크를 제공하고 인증키 발급 신청 , 주요기능에 대한 설명 및 사용예제를 제공합니다.</h2>
					<img src="/img/newhelp/De_020_02_renewal.png" style="width:700px;" alt="지도 API"/>					
					<h2>○ 지도 API 페이지에서 정의서 보기 버튼을 누르면 지도 API에 대한 인터페이스 정의서를 바로 조회할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_03_renewal.png" style="width:700px;" alt="지도 API 정의서"/>		
					<br><br><br>
					<h2>○ 사용예제에 대한 샘플코드와 함께 직접 소스실행을 위한 링크를 제공하는데, 소스실행 버튼을 누르면 JIT 페이지의</h2>		
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;관련 API로 직접 연결되어 샘플소스를 실행해 볼 수 있습니다.</h2>					
					<img src="/img/newhelp/De_020_04_renewal.png" style="width:700px;" alt="지도 API"/>		
					<br><br><br>
					<!-- mng_e 20180205_김건민-->
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
