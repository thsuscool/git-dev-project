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
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help_plus.css" />
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
				<div class="leftTitle">살고싶은 우리동네</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/house_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/house_help_20_0" class="on">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/house_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/house_help_20_1" class="on">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/house_help_20_2">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/house_help_20_3">ㆍPOI(관심지점) 조회방법</a></li>
							</ul>
						</li>
						<li><a href="/view/newhelp/house_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>지도창 조작 방법</h1>
					<ul class="Cont_List">
						<li>지도이동은 마우스 드래그 방식으로 동작하고, 지도확대 및 축소는 마우스 휠 조작 또는 지도레벨 컨트롤 조작에 의해서 동작합니다.</li>
						<li>지도 레벨 컨트롤을 이용해서 1단계 지도 레벨 확대/축소를 할 수 있습니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_2_06.png" style="margin-left: 0px;" alt="지도 이동">
						<figcaption>[지도 이동]</figcaption>
					</figure>
					<ul class="Cont_List">
						<li>시도, 시군구, 읍면동 각 단계별 행정구역을 선택해서 행정구역 위치조회를 할 수 있습니다.</li>
						<li>지도 이동 시 지도화면의 중심점 위치에 해당하는 행정구역 정보가 설정됩니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_2_07.png" style="margin-left: 0px;" alt="행정구역 이동">
						<figcaption>[행정구역 이동]</figcaption>
					</figure>
				</div>
			</div>
			<!--contentsWrap-->
		</div>
		<!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div>
	<!--wrapper-->
</body>

</html>