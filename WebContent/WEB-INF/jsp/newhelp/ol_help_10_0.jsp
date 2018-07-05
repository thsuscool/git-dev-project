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
				<div class="leftTitle">고령화 현황보기</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ol_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/ol_help_20_0">현황비교</a></li>
						<li><a href="/view/newhelp/ol_help_30_0">추세분석</a></li>
						<li><a href="/view/newhelp/ol_help_40_0">복지시설</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>고령화 현황보기 서비스</h1><br>
					<h2>○ 고령화 현황보기 서비스는 고령화가 점점 심화되는 상황에서 고령화와 관련된 다양한 통계를 제공하고,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이를 통해서 고령화현황, 고령화추세, 복지시설 등을 파악할 수 있도록 하기 위한 서비스입니다.</h2>
					<h2>○ 주요 기능</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 고령화주제도 : 노인인구(비율), 고령인구비율 등을 시군구/읍면동 단위로 지도위에 색상지도로 표출합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 인접지역 통계 제공 : 지역간 고령화 통계표출 시 해당 시군구의 인접지역에 대한 통계를 동시에 제공합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 다양한 차트 제공 : 통계 성격에 따라 표, 그래프, 원형차트, 분석차트 등 다양한 형태로 시각화하여 제공합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 복지시설주제도 : 노인대상 주요 복지시설의 위치를 지도위에 표출하여 보여줍니다.</h2>
					<h2>○ 제공하는 통계정보</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 현황비교 : 고령화주제도, 지역간 고령화 현화비교, 국민기초생활수급자 수, 생활비 마련방법 등</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 추세분석 : 과거/미래 인구구조변화, 고령화 추세진단 등의 통계 및 분석결과 제공</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 복지시설 : 복지시설 주제도, 노인 주거/의료/여가 복지시설 현황 등</h2>
				    <br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/Ol_010_01.png" style="width:700px;" alt="고령화현황 화면구성"/>
					<h2>○ 세부 서비스로는 지역간 고령화 현황 비교, 고령화 추세 분석이 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지역간 고령화 현황 비교 : 지역별로 고령화의 정도를 비교 할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 고령화 추세 분석 : 지역별 고령화 정도와 몇년후의 고령화 정도를 알아 볼 수 있으며</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 고령화 인구가 심해지는 지역을 집중으로 고령화 정책을 세우는데 도움이 될 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 노인 복지시설 분석 :지역별 노인복지시설 정보를 지도로 볼 수 있습니다.</h2>
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
