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
								<li><a href="/view/newhelp/us_help_20_5">ㆍ지방의 변화보기</a></li>
						        <li><a href="/view/newhelp/us_help_20_10" class="on">ㆍ자료신청</a></li>
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
				  <h1>자료신청</h1>
					<h2>● 센서스 공간통계 자료를 제공하는 서비스입니다.</h2>
					<h2>● 통계청에서 자체 생산한 통계지리정보자료를 정부기관 및 민간에서 활용하여 더 큰 부가가치를 창출할 수</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;있도록 자료를 제공하는 것으로 현재 센서스 공간통계 자료를 파일형태로 서비스하고 있습니다. </h2>
					<br>
				  <h1>서비스 목적</h1>
					<h2>● 통계청에서 자체 구축한 통계지리정보의 공동 활용을 통한 국가 경쟁력 강화</h2>
					<br>
				  <h1>자료제공 절차</h1>
					<img src="/img/newhelp/Us_020_01.png" style="margin-top:10px; margin-bottom:10px;" alt="자료신청"/>
				  <h1>자료제공 신청방법</h1>
				  <!-- 2016. 03. 25 j.h.Seok 수정 -->
				  	<h2><a href="/contents/include/download.jsp?filename=sgis_data_request_guide.hwp&path=/board/"> [다운로드]</a></h2>
<!-- 					<h2><a href="http://sgis.kostat.go.kr/contents/include/download.jsp?filename=sgis_data_request_guide.hwp&path=/board/"> [다운로드]</h2> -->

					<h2>문의사항연락처: ☏042-481-2438, parkkb@korea.kr</h2>
					<h2><a href="http://sgis.kostat.go.kr/contents/shortcut/shortcut_05_02.jsp"><img src="/img/newhelp/Dd_blue.png" style="margin-left: 0px; width:238px; height:25px" border=0 alt="자료신청 바로가기"/></a></h2>
					<br /><br />
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
