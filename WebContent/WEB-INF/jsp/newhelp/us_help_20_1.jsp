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
								<li><a href="/view/newhelp/us_help_20_1" class="on">ㆍ대화형 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_14">ㆍ정책통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_12">ㆍ기술업종 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_11">ㆍ살고싶은 우리동네</a></li>
								<li><a href="/view/newhelp/us_help_20_2">ㆍ우리동네 생활업종</a></li>
								<li><a href="/view/newhelp/community_help_0">ㆍ지역현안 소통지도</a></li>
								<!-- <li><a href="/view/newhelp/us_help_20_3">ㆍ우수 활용 사례</a></li> -->
								<li><a href="/view/newhelp/us_help_20_4">ㆍ통계지도 체험</a></li>
								<li><a href="/view/newhelp/us_help_20_13">ㆍ통계갤러리</a></li>
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
				  <h1>대화형 통계지도</h1><br>
					<h2>● 공간통계 정보를 쉽고 빠르게 조회할 수 있습니다.</h2>
					<h2>● 인구, 주택, 가구, 농림어업, 사업체 센서스 및 행정구역통계 등 다양한 통계항목을 지역단위로 자유롭게</h2>
					<h2>&nbsp;&nbsp;&nbsp;조회할 수 있는 통계지리정보 서비스입니다.</h2>
					<h2>● 다양한 통계항목을 조건별로 세분화하여 사용자 관심항목에 따라 조회할 수 있습니다.</h2>
					<h2>● 통계조회는 끌어서 놓기(Drag &amp; Drop)와 두번 연속 클릭(더블 클릭)이 제공됩니다.</h2>
					<h2>● 끌어서 놓기(Drag &amp; Drop)는 생성된 버튼을 마우스를 이용하여 이동시켜서 조회를 원하는 지역에 놓으면 됩니다.</h2>
					<h2>● 두번 연속 클릭(더블 클릭)은 주소 내비게이터(<img src="/img/newhelp/In_go_navi.png" alt="서울특별시 송파구 가락본동"  style="width:140px; height:25px; margin-top:-10px; margin-bottom:-8px; margin-left:2px;"/>)가 가리키는 지역의 통계가 조회됩니다.</h2>
					<br>
					<a href="/view/map/interactiveMap"><img src="/img/newhelp/In_blue.png" style="margin-left: 0px; width:238px; height:25px;" alt="대화형 통계지도 바로가기"/></a>

					<img src="/img/newhelp/In_go_new.png"  style="width:700px; height:400px" alt="대화형 통계지도"/>
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
