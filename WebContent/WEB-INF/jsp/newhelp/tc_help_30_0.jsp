<!-- 2017.11.25 [개발팀] -->
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
				<div class="leftTitle">기술업종 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/tc_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/tc_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/tc_help_30_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/tc_help_30_0" class="on">ㆍ시도별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_1">ㆍ시군구별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_2">ㆍ업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/tc_help_30_5">ㆍ업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/tc_help_30_6">ㆍ조건별 지역찾기</a></li>
								<li><a href="/view/newhelp/tc_help_30_3">ㆍ지원시설 조회</a></li>
								<li><a href="/view/newhelp/tc_help_30_4">ㆍ산업단지 조회</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>시도별 기술업종 현황</h1>
					<h2>○ 17개 주요 시도별, 기술업종 유형별에 대한 다양한 통계정보를 조회하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;-지도상의 차트(Pie)를 클릭하시면, 팝업창에서 업종별 점유율을 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※ 기술업종: 기술혁신(4종), 지식집약(3종)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;-팝업창의 지역통계 데이터보기 버튼을 클릭하시면, 데이터보드에서 상세정보를 조회할 수 있습니다.</h2>
					<img src="/img/newhelp/Tc_help_30_0.png" width=600 height=auto border=0 alt="시도별 기술업종현황"/>	
					<h2 style="margin-left: 250px;">[시도별 기술업종현황]</h2><br>
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
