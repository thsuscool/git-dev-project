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
				<div class="leftTitle">홈페이지 이용안내</div>
				<div class="leftmenu">
					<ul>
						<!-- mng_s 20170915_김건민 -->	
						<li><a href="/view/newhelp/us_help_10_0">SGIS 플러스란?</a></li>
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a></li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a>
							<ul class="sub">
								<li><a href="/view/newhelp/us_help_30_0">ㆍSGIS 플러스의 GIS 좌표체계</a></li>
						<!-- mng_e 20170915_김건민 -->	
								<li><a href="/view/newhelp/us_help_30_1">ㆍ자료신청시 참조사항</a></li>
								<li><a href="/view/newhelp/us_help_30_2">ㆍ최적 사용을 위한 조건</a></li>
								<li><a href="/view/newhelp/us_help_30_3" class="on">ㆍ기타 주의사항</a></li>
							</ul>
						</li>
						<!-- <li><a href="/view/newhelp/us_help_40_0">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				<!-- mng_s 20170915_김건민 -->		
				  <h1>SGIS플러스 서비스 이용시 유의 사항</h1>
					<h2>● SGIS플러스에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업 등의 자료를 제외하고 최신 경계를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다.아래 사항을 유의하여 SGIS플러스를 이용하시기 바랍니다.</h2>					<h2>● 제외된 자료</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대, 전투경찰대, 의무소방대 등의 특별 조사구와 외국인</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사업체 센서스 : 개인운수업(사업장이 일정치 않음)</h2>
					<h2>● 최신 경계 반영에 따른 차이</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- SGIS플러스는 최신 행정구역 경계에 맞추어 서비스함에 따라 KOSIS 자료와 다를 수 있음</h2>
					<h2>● 인구주택총조사 결합조건</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 결합조건은 인구(특별조사구와 외군인 제외), 가구(집단가구 제외), 주택(주택 이외의 거처 제외)의 세가지 조건을 모두</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;충족하는자료만 대상이므로 단독조건의 검색 결과와 다를 수 있습니다.</h2>
					<br><br>
				  <h1>네트워크 차단 시  지도표시 지연 현상</h1><br>
					<h2>● 사용자 PC 네트워크의 방화벽에서 카카오스토리, 트위터, 페이스북을 차단한 경우, SGIS플러스에서 대화형 통계지도를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;처음 접속할 때 약3~4분 후에 지도가 나타납니다.</h2>
				<!-- mng_e 20170915_김건민 -->	
					<br><br>
				  <h1>통계지도 조회 시 검색조건을 지도에 끌어다 놓을 때 주의사항</h1><br>
					<h2>● 통계지도 조회 시 검색조건을 지도에 끌어다 놓을 경우 지도상에 경계(검은선)가 표시된 상태에서 끌어다 놓아야</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;통계결과가 조회됩니다.</h2>
					<br><br>
				  <h1>통계지도 조회 시 지도상에 경계가 표시되지 않을 경우</h1><br>
					<h2>● 통계지도 조회 시 지도상에서 경계(검은선)가 표시되지 않을 경우에는 마우스로 지도를 약간 움직여 주시면 경계가</h2> 
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;나타납니다.</h2>
					<br><br>
				  <h1>장시간 브라우저를 사용하지 않은 경우</h1><br>
					<h2>● 장시간 브라우저를 사용하지 않은 경우 지도나 데이터가 표시되지 않을 수 있습니다. 이때는 F5키를 눌러서 새로고침을</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;하거나 브라우저를 다시 실행해주시면 됩니다.</h2>
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
