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
						<li><a href="/view/newhelp/de_help_10_0" class="on">OpenAPI 소개</a></li>
						<li><a href="/view/newhelp/de_help_20_0">OpenAPI 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>OpenAPI 개요</h1>
					<h2>○ Open API(Application Programming Interface)는 통계지리정보서비스에 정의되어있는 함수들의 집합으로</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;외부 개발자들이 서비스를 개발하는데 활용할 수 있도록 제공되는 인터페이스를 말합니다.</h2>
					<h2>○ 통계청에서는 지도, 경계, 통계 등 부문에서 외부 개발자들이 활용할 수 있도록 API를 제공하고 있습니다.</h2>
					<h2>○ 개발자가 통계청의 다양한 Open API를 이용해, 작게는 운영 사이트의 다양한 서비스 활용을 지원하고,</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;넓게는 창조적이고 다양한 애플리케이션을 개발할 수 있도록 기술과 서비스를 공유하는 프로그램입니다.</h2>
					<h2>○ 통계지리정보시스템에서 제공하는 OpenAPI는 무료로 제공됩니다.</h2>
					<br><br>
				  <h1>OpenAPI에서 제공하는 서비스</h1>
					<h2>○ Open API에는 통계지리정보서비스에서 사용하고 있는 MapControl, 경계, 통계, 주소 변환 부문의 다양한 API를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;제공하고 있습니다.</h2>
					<br><br>
				 <!-- mng_s 20180205_김건민-->
				  <h1>처음 OpenAPI를 사용하기 위한 절차</h1>
					<h2>1) OpenAPI를 활용하기 위해서는 로그인이 반드시 필요합니다.</h2>
					<h2>2) 홈페이지의 메인화면에서 우측하단의 개발지원센터로 이동해 주세요.</h2>
					<h2>3) 목적에 따라 지도API 혹은 Data API를 클릭하세요. 제공정보 및 사용방법을 참조하세요.</h2>
					<h2>4) OpenAPI 메인화면에서 활용하고자 하는 API를 찾아보세요</h2>
					<h2>5) Open API를 사용하기 위해서는 인증 Key가 필요합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;메인화면에서 좌측하단 인증키발급센터을 선택하여 인증키를 발급받으세요.</h2>
					<h2>6) 선택한 Open API의 사용방법을 참고하셔서 사용 목적에 맞게 활용하세요.</h2>
					<h2>7 Open API를 사용하여 서비스를 구축하셨다면 모두가 공유하여 활용할 수 있도록</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;활용사례 등록을 해주시면 감사하겠습니다.</h2>
					<br><br>
				<!-- mng_e 20180205_김건민-->	
				  <h1>OpenAPI 메인화면</h1>
					<img src="/img/newhelp/De_020_01_renewal.png" style="width:700px;" alt="penAPI 메인화면"/>				
					<br><br><br>
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
