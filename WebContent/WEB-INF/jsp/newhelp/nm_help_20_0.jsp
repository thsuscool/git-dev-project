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
				<div class="leftTitle">성씨분포</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/nm_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/nm_help_20_0" class="on">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 이용방법</h1>
					<h2>○ 성씨분포 서비스는 각지역의 인구분포를 확인할 수 있으며 조회 후, 지역을 마우스로 선택하면 인구수와 비율을</h2>
					<h2>&nbsp;&nbsp;&nbsp; 볼 수 있습니다.</h2>
					<img src="/img/newhelp/Nm_010_02.png" style="width:700px;" alt="성씨분포 화면구성"/>
					<br><br>
					<h2>○ 성씨 선택과 성씨순, 인구순 조회</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp; 가나다순/인구수 순 을 선택하고 성씨별로 조회할 수 있습니다.</h2>
					<img src="/img/newhelp/Nm_010_03.png" style="width:700px;" alt="성씨 선택과 성씨순, 인구순 조회"/>
					<br><br>
					<h2>○ 데이터 조회</h2>
					<img src="/img/newhelp/Nm_010_04.png" style="width:700px;" alt="데이터 조회"/>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 마우스를 이용하여 지도상의 특정 시군구를 선택합니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 선택하신 시군구의 명칭과 통계값이 조회됩니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 데이터보기 버튼을 누르시면, </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 데이터보기 창이 나타나며 2개 년도의 데이터를 확인할 수 있습니다.</h2>
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
