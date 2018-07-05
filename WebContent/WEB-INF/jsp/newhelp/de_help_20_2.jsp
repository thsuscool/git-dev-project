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
								<li><a href="/view/newhelp/de_help_20_2" class="on">ㆍ모바일 SDK</a></li>
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
				  <h1>모바일 SDK</h1>
				  	<!-- mng_s 20180205_김건민-->
					<h2>○ 개발지원센터에서 Android OS / iOS가 설치된 스마트폰의 App구현시 사용할 수 있는 API 안내를 제공합니다.</h2>
					<h2>○ Android SDK 다운로드 , API 정의서 보기 링크를 제공하고 주요기능에 대한 설명 및 사용예제를 제공합니다.</h2>	
					<img src="/img/newhelp/De_020_08_01_renewal.png" style="width:700px;" alt="SDK 주요기능"/>
					<h2>○ 사용예제에 대한 샘플코드를 제공하며 샘플코드 실행결과를  이미지를 통해 미리 확인해 볼 수 있습니다.</h2>
					<!-- <h2>○ 테스트용 인증키는 즉시발급, 상용 인증키는 관리자 승인절차를 거쳐서 발급됩니다.</h2> -->
					<img src="/img/newhelp/De_020_09_01_renewal.png" style="width:700px;" alt="사용예제 및 샘플"/>	
					<img src="/img/newhelp/De_020_09_01_renewal_1.png" style="width:700px;" alt="사용예제 및 샘플"/>	
					<h2>○ iOS SDK 다운로드 , API 정의서 보기 링크를 제공하고 주요기능에 대한 설명 및 사용예제를 제공합니다.</h2>
					<!-- <h2>○ 개발자사이트의 Open API 메뉴 선택 후 My App 서브메뉴를 선택하면 해당 사용자의 인증키 목록을 조회할 수 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;있습니다.</h2>
					<h2>○ 인증키 목록에서 인증키 종류, 인증키 상태 설정 후 검색을 할 수 있고, 항목을 삭제하려면 항목 선택 후</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;삭제 버튼을 누르면 됩니다.</h2> -->
					<img src="/img/newhelp/De_020_08_02_renewal.png" style="width:700px;" alt="SDK 주요기능"/>					
					<h2>○ 사용예제에 대한 샘플코드를 제공하며 샘플코드 실행결과를  이미지를 통해 미리 확인해 볼 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_09_02_renewal.png" style="width:700px;" alt="사용예제 및 샘플"/>
					<img src="/img/newhelp/De_020_09_02_renewal_1.png" style="width:700px;" alt="사용예제 및 샘플"/>
					<br><br><br>
					<!-- mng_e 20180205_김건민-->
					<!-- <h2>○ 인증키를 신규로 발급 받으려면 화면 하단의 신청버튼을 누르고, 해당 절차에 따라 인증키 발급 신청을 하면 됩니다.</h2>		
					<h2>○ 신청 버튼을 누르면 약관동의 절차를 거쳐서 인증키 신청 창이 표출되고, 신청 관련 정보를 입력하고 신청 버튼을 누르면</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;테스트용 인증키가 즉시 발급됩니다.</h2>
					<img src="/img/newhelp/De_020_10.jpg" style="width:560px; height:840px"alt="Data API"/>		
					<br><br><br>
					<h2>○ 등록한 인증키 정보를 수정하려면 목록에서 해당 인증키 항목의 서비스명을 선택하고, 이후 표출되는 인증키정보</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp; 수정 창에서 내용을 수정하면 됩니다.</h2>
					<img src="/img/newhelp/De_020_11.jpg" style="width:580px; height:960px"alt="Data API"/>		
					<br><br><br>
				  <h1>상용 인증키 발급</h1>
					<h2>○ 상용 인증키를 발급 받으려면 등록한 인증키 선택 후 인증키 정보 수정 창에서 상용전환 신청 버튼을 눌러서 신청하면</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;됩니다.</h2>
					<h2>○ 상용 인증키는 테스트용 인증키와 달리 관리자사이트에서 관리자가 발급절차를 수행해야 상용키 발급이 이루어 집니다.</h2>
					<h2>○ 발급 신청한 상용키에 대해서 인증키 목록에서 인증키의 상태를 조회할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_12.jpg" style="width:500px; height:950px"alt="Data API"/>		
 -->
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
