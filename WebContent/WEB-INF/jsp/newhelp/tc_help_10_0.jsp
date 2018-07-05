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
						<li><a href="/view/newhelp/tc_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/tc_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/tc_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1><br>
					<h2>○ 기술업종 통계지도는 SGIS+의 활용 사례로, 다양한 기술업종에 관련된 지역별 통계정보를</h2>
					<h2>&nbsp;&nbsp;&nbsp; 조회하여 보실 수 있으며, 기술업종 지원시설 및 산업단지에 관련된 정보를 보실 수 있는 서비스입니다.</h2>
					<h2>○ 주요기능</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 시도별 기술업종 현황 : 주요 시도의 기술업종 현황을 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 시군구 기술업종 현황 : 기술업종에 대한 지역현황을 전국에서 시군구 단위로 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 업종밀집도 변화 : 기술업종에 대한 업종밀집도를 열지도로 확인할 수 있습니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 업종별 입지계수 지도 : 기술업종에 대한 지역별 입지계수 정보를 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 조건별 지역찾기 : 기술업종에 조건을 설정하여 조건에 맞는 지역을 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 지원시설 조회 : 지역의 지원시설 현황을 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 산업단지 조회 : 지역의 산업시설 현황을 조회합니다.</h2>
					<br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/Tc_help_10_0.png"  style="width:700px;x" alt="설명"/>
					<h2>1) 통계항목 설정 : 통계항목과 상세조건을 설정합니다.</h2>
					<h2>2) 부가기능 : 사업체 전개도, 초기화, 다중뷰 등을 수행합니다.</h2>
					<h2>3) 데이터보드  : 조회된 통계 데이터정보를 그래프형태로 제공합니다.</h2>			
					<h2>4) 지도조작 및 축척 : 지도창에서 거리, 면적계산 및 POI표출을 수행하며 지도의 축척을 조정합니다.</h2>
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
