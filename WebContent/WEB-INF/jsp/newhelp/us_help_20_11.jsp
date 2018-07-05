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
						<!-- mng_s 20170913_김건민 -->
						<li><a href="/view/newhelp/us_help_10_0">SGIS플러스란?</a></li>
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a>
							<ul class="sub">								
								<li><a href="/view/newhelp/us_help_20_0">ㆍ통계주제도</a></li>
								<li><a href="/view/newhelp/us_help_20_1">ㆍ대화형 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_14">ㆍ정책 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_12">ㆍ기술업종 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_11" class="on">ㆍ살고싶은 우리동네</a></li>
								<li><a href="/view/newhelp/us_help_20_2">ㆍ우리동네 생활업종</a></li>
								<li><a href="/view/newhelp/community_help_0">ㆍ지역현안 소통지도</a></li>
								<!-- <li><a href="/view/newhelp/us_help_20_3">ㆍ우수활용사례</a></li> -->
								<li><a href="/view/newhelp/us_help_20_4">ㆍ통계지도 체험</a></li>
								<li><a href="/view/newhelp/us_help_20_13">ㆍ통계 갤러리</a></li>
								<li><a href="/view/newhelp/us_help_20_6">ㆍ월간통계</a></li>
						        <li><a href="/view/newhelp/us_help_20_8">ㆍ움직이는 인구피라미드</a></li>
								<li><a href="/view/newhelp/us_help_20_7">ㆍ고령화 현황보기</a></li>
						        <li><a href="/view/newhelp/us_help_20_9">ㆍ성씨분포</a></li>
								<li><a href="/view/newhelp/us_help_20_5">ㆍ지방의 변화보기</a></li>
						        <li><a href="/view/newhelp/us_help_20_10">ㆍ자료신청</a></li>
						        <!-- mng_e 20170913_김건민 -->
							</ul>
						</li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a></li>
						<!-- <li><a href="/view/newhelp/us_help_40_0">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>살고싶은 우리동네</h1><br>
					<h2>● 조건에 맞는 주거지역을 추천해 주는 서비스입니다.</h2>
					<h2>● 다양한 통계정보와 공공데이터를 바탕으로 지역별 주거지 현황을 확인할 수 있습니다.</h2>
					<h2>● 생활편의 시설 현황, 교육환경, 자연환경 등 33종의 주거지 조건에 해당하는 추천지역리스트 및 통계정보를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;확인할수 있습니다.</h2>
					<h2>● 주요기능</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 주거현황 보기 : 지역별 주거현황, 지표별 주거현황을 조회하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 추천지역 찾기 : 다양한 조건으로 주거 추천지를 검색하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 간편동네 찾기 : 원하는 동네를 간편하게 조회하실 수 있습니다.</h2>
					<br>
					<a href="/view/house/houseAnalysisMap"><img src="/img/newhelp/go_house.png" style="margin-left: 0px; width:238px; height:25px" border=0 alt="살고싶은 우리동네 바로가기" /></a>
				
					<img src="/img/newhelp/img_house_0.png" alt="살고싶은 우리동네" />
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
