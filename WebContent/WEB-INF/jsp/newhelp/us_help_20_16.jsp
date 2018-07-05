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
								<li><a href="/view/newhelp/us_help_20_2">ㆍ우리동네생활업종</a></li>
								<li><a href="/view/newhelp/us_help_20_12">ㆍ기술업종통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_13" class="on">ㆍ통계갤러리</a></li>
								<li><a href="/view/newhelp/community_help_0">ㆍ지역현안 소통지도</a></li>
								<!-- <li><a href="/view/newhelp/us_help_20_3">ㆍ활용갤러리</a></li> -->
								<li><a href="/view/newhelp/tc_help_10_0">ㆍ기술업종 통계지도</a></li>
								<li><a href="/view/newhelp/policy_help_10_0">ㆍ정책 통계지도</a></li>
								<li><a href="/view/newhelp/rg_help_10_0">ㆍ통계 갤러리</a></li>
								<li><a href="/view/newhelp/us_help_20_4">ㆍ통계지도 체험</a></li>
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
					<h1>통계갤러리</h1><br>
					<h2>● 사용자가 포털상에서 확인한 여러통계정보를 수집하여 갤러리로 보여주는 서비스입니다. </h2>
					<h2>● 포털 내의 대화형통계지도, 우리동네생활업종, 기술업종통계지도 등 여러 서비스에서 조회한 통계정보를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;갤러리로 등록 할 수 있습니다.</h2>
					<h2>● 통계갤러니 내에서 다른 사용자가 등록한 갤러리에 댓글, 설문조사 등에 참여할 수 있습니다.</h2>
					<br>
					<!-- <a href="/view/gallery/resultGallery"><img src="/img/newhelp/go_house.png" style="margin-left: 0px; width:238px; height:25px" border=0 alt="통계갤러리 바로가기" /></a> -->
					<a href="/view/gallery/resultGallery" style="cursor:pointer;font-size:12px;height:25px;width:238px;line-height:25px;background:#1778cc;border-radius:3px;color:#fff;padding:5px 10px;">통계갤러리 바로가기   ></a>
					<img src="/img/newhelp/img_gallery.png" alt="통계갤러리" />
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
