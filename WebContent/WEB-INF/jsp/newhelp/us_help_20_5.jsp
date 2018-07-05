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
								<li><a href="/view/newhelp/us_help_20_14">ㆍ정책통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_12">ㆍ기술업종 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_11">ㆍ살고싶은 우리동네</a></li>
								<li><a href="/view/newhelp/us_help_20_2">ㆍ우리동네 생활업종</a></li>
								<li><a href="/view/newhelp/community_help_0">ㆍ지역현안 소통지도</a></li>
								<!-- <li><a href="/view/newhelp/us_help_20_3">ㆍ우수활용사례</a></li> -->
								<li><a href="/view/newhelp/us_help_20_4">ㆍ통계지도 체험</a></li>
								<li><a href="/view/newhelp/us_help_20_13">ㆍ통계갤러리</a></li>
								<li><a href="/view/newhelp/us_help_20_6">ㆍ월간통계</a></li>
						        <li><a href="/view/newhelp/us_help_20_8">ㆍ움직이는 인구피라미드</a></li>
								<li><a href="/view/newhelp/us_help_20_7">ㆍ고령화 현황보기</a></li>
						        <li><a href="/view/newhelp/us_help_20_9">ㆍ성씨분포</a></li>
								<li><a href="/view/newhelp/us_help_20_5" class="on">ㆍ지방의 변화보기</a></li>
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
				  <h1>지방의 변화보기</h1><br>


					<h2>● 지방(시군구)의 통계 변화 모습을 제공하는 서비스입니다.</h2>

					<h2>● 1995년부터 2015년까지 5년 간격으로 인구비율, 주택비율 등 다양한 통계 정보에 대한  시군구별 통계</h2> 
					<h2>&nbsp;&nbsp;&nbsp;&nbsp; 변화 모습을 지도로 제공합니다.</h2>
					<h2>● 1995, 2000, 2005, 2010, 2015년 인구주택총조사 결과를 이용하여 시군구 단위로 색채지도 작성</h2>
					<h2>● 제공하는 통계 항목</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 가구/인구 비율 : 연령대별 혼인상태 인구, 1인/3세대 이상/화장실 공동사용/65세 이상 1인 가구, 연령대별 출산율</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사회 비율 : 교육수준, 여성학력, 재혼 구성비 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 주택 비율 : 아파트/공동/단독/비거주용건물내 주택, 아파트/단독주택 평수별</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 교통 비율 : 통근통학/통근통학시 승용차/통근통학시 도보/통근통학시 대중교통</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 종교 비율 : 종교/불교/천주교/개신교/기타종교 인구</h2>

					<br>
					<h2><a href="https://sgis.kostat.go.kr/statbd/future_01.vw"><img src="/img/newhelp/Lo_blue.png" style="margin-left: 0px; width:238px; height:25px" border=0 alt="지방의 변화보기 바로가기"/></a></h2>

					<img src="/img/newhelp/Lo_go.png" alt="지방의 변화보기"/>
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
