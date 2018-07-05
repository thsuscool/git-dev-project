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
								<li><a href="/view/newhelp/de_help_20_0">ㆍ지도 API</a></li>
								<li><a href="/view/newhelp/de_help_20_1">ㆍData API</a></li>
								<li><a href="/view/newhelp/de_help_20_2">ㆍ모바일 SDK</a></li>
								<li><a href="/view/newhelp/de_help_20_3" class="on">ㆍ체험하기</a></li>
								<li><a href="/view/newhelp/de_help_20_4">ㆍ문의하기</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>체험하기</h1>
				  	<!-- mng_s 20180205_김건민-->
					<h2>○ 개발자사이트에서 Open API를 테스트할 수 있는 JIT 페이지를 제공하고 있습니다. 이와 함께 기본적으로 주요 API에</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;대한 다양한 샘플도 제공하고 있습니다.</h2>
					<!--<h2>○ 개발자사이트 페이지에서 체험하기 메뉴를 선택하면 JIT 페이지를 조회할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_13_renewal.png" style="width:700px;" alt="Data API"/>-->					
					<h2>○ 체험하기 버튼 누르면 Data API와 관련한 API 샘플목록이 나타납니다.</h2>
					<h2>○ API 샘플항목 중 임의의 항목을 선택하면 해당 API 샘플을 실행할 수 있도록 소스코드 창이 설정됩니다.</h2>
					<img src="/img/newhelp/De_020_14_renewal.png" style="width:700px;" alt="Data 정의서"/>		
					<br><br><br>
					<h2>○ 소스코드 설정 창에 사용자가 발급받은 Service ID, Secret Key를 입력하고, AccessToken 받기 버튼을 눌러서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;AccessToken을 발급 후 소스실행 버튼을 눌러서 실행결과를 확인할 수 있습니다.</h2>		
					<h2>○ 소스코드 설정 창에서 URL, Required 등의 설정을 변경하면 다른 실행결과를 확인할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_15_renewal.png" style="width:700px;" alt="Data API"/>							
					<br><br><br>
				  <h1>지도 API</h1>
					<h2>○ 체험하기 페이지의 좌측화면에 API 샘플목록에서 지도 생성을 선택하면 지도 API와 관련한 API 샘플목록이</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;나타나고 임의의 항목을 선택하면 해당 API 샘플을 실행할 수 있도록 소스코드 창이 설정됩니다.</h2>
					<img src="/img/newhelp/De_020_16_renewal.png" style="width:700px;" alt="Data API"/>		
					<h2>○ 소스코드 설정 창에 사용자가 발급받은 Service ID, Secret Key를 입력하고, AccessToken 받기 버튼을 눌러서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;AccessToken을 발급 후 소스실행 버튼을 눌러서 실행결과를 확인할 수 있습니다.</h2>
					<h2>○ 지도 API의 소스실행 결과는 기본적으로 지도화면이 표출되고, 지도화면 위에 API샘플의 실행결과를 추가하는</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;형태로 표출됩니다.</h2>
					<img src="/img/newhelp/De_020_17_renewal.png" style="width:700px;" alt="Data API"/>		
					<h2>○ 소스실행 이후에 사용자가 소스코드 설정 창의 샘플소스를 원하는 형태로 수정을 하면 수정된 결과를 바로</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp; 조회할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_18_renewal.png" style="width:700px;" alt="Data API"/>			
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
