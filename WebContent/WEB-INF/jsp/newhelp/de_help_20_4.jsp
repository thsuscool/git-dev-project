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
								<li><a href="/view/newhelp/de_help_20_3">ㆍ체험하기</a></li>
								<li><a href="/view/newhelp/de_help_20_4" class="on">ㆍ문의하기</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>Q&A 작성 및 조회</h1>
				  	<!-- mng_s 20180205_김건민-->
					<h2>○ 개발지원센터에서 알림마당 메뉴를 선택하고, Q&A 선택하면 Q&A 목록을 조회할 수 있습니다.</h2> 
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;Q&A 목록화면에서 검색어 입력 후 Q&A 항목에 대한 검색도 가능합니다.</h2>
					<img src="/img/newhelp/De_020_19_renewal.png" style="width:700px;" alt="Data API"/>					
					<h2>○ Q&A 글을 작성하려면 먼저 로그인을 해야하고, 로그인 후에 Q&A 목록을 조회하면 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;Q&A 글 등록을 위한 질문하기 버튼과 API 글 등록을 위한 API 요청 버튼도 활성화 됩니다.</h2>
					<img src="/img/newhelp/De_020_20_01_renewal.png" style="width:700px;" alt="Data 정의서"/>		
					<h2>○ Q&A 목록을 선택하면 해당 상세 내용 과 답변을 확인 할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_20_02_renewal.png" style="width:700px;" alt="Data 정의서"/>		
					<br><br><br>
					<h2>○ 질문하기 버튼을 누르면 Q&A 글쓰기 창이 표출되고, 제목, 내용, 파일첨부 등 Q&A 질문사항 입력을 통해서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;Q&A 등록을 할 수 있습니다.</h2>
					<!-- <h2>○ 소스코드 설정 창에 사용자가 발급받은 Service ID, Secret Key를 입력하고, AccessToken 받기 버튼을 눌러서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;AccessToken을 발급 후 소스실행 버튼을 눌러서 실행결과를 확인할 수 있습니다.</h2>		
					<h2>○ 소스코드 설정 창에서 Request URL, URL Params 등의 설정을 변경하면 다른 실행결과를 확인할 수 있습니다.</h2> -->
					<img src="/img/newhelp/De_020_21.jpg" style="width:600px;" alt="Data API"/>							
					<br><br><br>
					<h2>○ API 요청 버튼을 누르면 API 글쓰기 창이 표출되고, 제목, 내용, 파일첨부 등 API 요청 입력을 통해서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;API 등록을 할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_22_renewal.png" style="width:600px;" alt="Data API"/>		
					<br><br><br>
				  <h1>FAQ 조회</h1>
					<h2>○ 개발자사이트의 문의하기 메뉴를 선택하고, FAQ 서브메뉴를 선택하면 FAQ 목록을 조회할 수 있습니다.</h2> 
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;FAQ 목록화면에서 검색어 입력 후 FAQ 항목에 대한 검색도 가능합니다.</h2>
					<img src="/img/newhelp/De_020_23_renewal.png" style="width:700px;" alt="Data API"/>
					<h2>○ FAQ 목록을 선택하면 해당 상세 내용을 확인할 수 있습니다.</h2>
					<img src="/img/newhelp/De_020_24_renewal.png" style="width:700px;" alt="Data API"/>
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
