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
								<li><a href="/view/newhelp/tc_help_30_0">ㆍ시도별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_1">ㆍ시군구별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_2" class="on">ㆍ업종밀집도 변화</a></li>
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
					<h1>업종밀집도 현황</h1>
					<h2>○ 기술업종에 대한 업종밀집도를 열지도와 점지도로 보실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 기술업종을 선택하면 지도 위에 열지도가 표출 됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도상에서 축척을 변경(마우스 휠 조작)하면 더 자세한 밀집도를 확인할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 경계선을 클릭하면 선택한 지역에 대한 시계열별 데이터를 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 시도 검색 시에는 선택된 사업체에 대한 개별 위치정보를 모두 조회하므로, 다소 시간이 소요될 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※ 기술업종: 기술혁신(4종), 지식집약(3종)</h2>
					<img src="/img/newhelp/Tc_help_30_2.png" width=600 height=auto border=0 alt="업종밀집도 현황"/>	
					<h2 style="margin-left: 300px;">[업종 밀집도 현황]</h2><br>
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
