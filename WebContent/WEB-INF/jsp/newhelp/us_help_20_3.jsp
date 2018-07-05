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
						<li><a href="/view/newhelp/us_help_10_0">SGIS 플러스란?</a></li>
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a>
							<ul class="sub">
								<li><a href="/view/newhelp/us_help_20_0">ㆍ통계주제도</a></li>
								<li><a href="/view/newhelp/us_help_20_1">ㆍ대화형 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_11">ㆍ살고싶은 우리동네</a></li>
								<li><a href="/view/newhelp/us_help_20_2">ㆍ우리동네 생활업종</a></li>
								<li><a href="/view/newhelp/community_help_0">ㆍ지역현안 소통지도</a></li>
								<!-- <li><a href="/view/newhelp/us_help_20_3" class="on">ㆍ우수 활용 사례</a></li> -->
								<li><a href="/view/newhelp/us_help_20_4">ㆍ통계지도 체험</a></li>
								<li><a href="/view/newhelp/us_help_20_12">ㆍ기술업종 통계지도</a></li>
								<li><a href="/view/newhelp/policy_help_10_0">ㆍ정책 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_13">ㆍ통계 갤러리</a></li>
								<li><a href="/view/newhelp/us_help_20_5">ㆍ지방의 변화보기</a></li>
								<li><a href="/view/newhelp/us_help_20_6">ㆍ월간통계</a></li>
								<li><a href="/view/newhelp/us_help_20_7">ㆍ고령화 현황보기</a></li>
						        <li><a href="/view/newhelp/us_help_20_8">ㆍ움직이는 인구피라미드</a></li>
						        <li><a href="/view/newhelp/us_help_20_9">ㆍ성씨분포</a></li>
						        <li><a href="/view/newhelp/us_help_20_10">ㆍ자료신청</a></li>
							</ul>
						</li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a></li>
						<li><a href="/view/newhelp/us_help_40_0">용어설명</a></li>
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>우수 활용 사례</h1><br>
					<h2>● 우수활용사례는 사용자가 SGIS 플러스의 OpenAPI나 제공된 자료를 통하여 활용하신 사례를 공유하는 곳입니다.</h2>
					<h2>● 사용자께서 SGIS 플러스의 OpenAPI를 활용하여 제작한 사이트나 SGIS 플러스의 자료제공을 통하여 활용하신</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;연구정보를 공유하고자 합니다.</h2>
					<h2>● 활용사례를 등록하시면 승인절차를 통하여 공유할 수 있도록 해드립니다.</h2>
					<h2>● 공유된 활용사례는 SGIS 플러스를 이용하시는 많은 분들에게 도움이 되시리라 확신합니다. </h2>
					<br>
					<h2><a href="http://sgis.kostat.go.kr/jsp/share/useBoardList.jsp"><img src="/img/newhelp/Ga_blue.png" style="margin-left: 0px; width:238px; height:25px" border=0 alt="우수활용사례 바로가기"/>

					<img src="/img/newhelp/Ga_go.png"  style="width:700px; height:900px" alt="우수활용사례"/>
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
