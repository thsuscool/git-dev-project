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
				<div class="leftTitle">통계주제도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/su_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/su_help_20_0">통계항목 선택방법</a></li>
						<li><a href="/view/newhelp/su_help_30_0" class="on">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>색상타입 주제도</h1><br>
					<h2>○ 통계주제도는 주제도의 성격에 따라 4가지 타입으로 구분됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; 공통적으로 주제도 목록, 주제도 설정, 주제도 목록, 데이터 시각화 등이 있습니다.</h2>
					<h2>○ 색상타입의 주제도는 행정구역별 통계 정보를 색상으로 표현하는 기본 형태입니다.</h2>
					<!-- 2016.03.18 수정, 이미지 높이 수정 -->
					<img src="/img/newhelp/Su_030_01_new.png" style="margin-left: 20px; width:650px;" alt="색상타입 주제도"/>
					<h2 style="margin-left: 320px;">[색상타입]</h2><br>

				  <h1>증감타입 주제도</h1><br>
					<h2>○ 시점이 다른 두 데이터의 증감을 이용하여 지역별 증가 또는 감소 여부를 표출하고</h2>
					<h2>&nbsp;&nbsp;&nbsp; 년도별로 데이터의 증감여부를 차트로 표출합니다.</h2>
					<!-- 2016.03.18 수정, 이미지 높이 수정 -->
					<img src="/img/newhelp/Su_030_02_new.png" style="margin-left: 20px; width:650px;" alt="증감타입 주제도"/>
					<h2 style="margin-left: 320px;">[증감타입]</h2><br>

				  <h1>시계열타입 주제도</h1><br>
					<h2>○ 시점에 따른 변화를 표출하기 위한 주제도 타입으로 각 시점별로 색상타입으로 조회할 수 있으며</h2>
					<h2>&nbsp;&nbsp;&nbsp; 해당 지역의 시점별 정보 변화를 차트로 표출합니다.</h2>
					<!-- 2016.03.18 수정, 이미지 높이 수정 -->
					<img src="/img/newhelp/Su_030_03_new.png" style="margin-left: 20px; width:650px;" alt="시계열타입 주제도"/>
					<h2 style="margin-left: 320px;">[시계열타입]</h2><br>

				  <h1>분할타입 주제도</h1><br>
					<h2>○ 두 데이터를 직접 비교할 수 있는 주제도 타입입니다. 연관성 있거나 연관성이 높은 것으로 추정되는 데이터를</h2>
					<h2>&nbsp;&nbsp;&nbsp; 지역별로 비교할 수 있도록 표출합니다.</h2>
					<!-- 2016.03.18 수정, 이미지 높이 수정 -->
					<img src="/img/newhelp/Su_030_04_new.png" style="margin-left: 20px; width:650px;" alt="분할타입 주제도"/>
					<h2 style="margin-left: 320px;">[분할타입]</h2><br>
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
