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
								<li><a href="/view/newhelp/house_help_20_1">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/house_help_20_2" class="on">ㆍ지도상에서의 측정방법</a></li>
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
					<h1>지도상에서의 측정방법</h1>
					<ul class="Cont_List">
						<li>지도화면에서 지점간 거리정보를 표출하는 기능을 제공합니다.</li>
						<li>길이계산 메뉴 선택 후 지도화면에서 마우스 왼쪽버튼을 몇 번 누르면 두 지점 사이의 거리정보가 계산되어 표출되고, 마우스 오른쪽버튼을 누르면 총거리가 표출됩니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_2_08.png" style="margin-left: 0px;" alt="거리 측정">
						<figcaption>[거리 측정]</figcaption>
					</figure>
					<ul class="Cont_List">
						<li>지도화면에서 영역을 설정하고, 해당 영역의 면적정보를 계산해서 표출하는 기능을 제공합니다.</li>
						<li>면적계산 메뉴 선택 후 지도화면에서 마우스 왼쪽버튼을 이용해서 영역을 설정하고, 마우스 오른쪽버튼을 누르면 해당영역의 총면적이 표출됩니다.</li>
						<li>면적정보 생성 후 "X"버튼을 누르면 해당 면적정보가 삭제되고, 측정해제 메뉴를 선택하면 여러 개 생성된 면적정보가 한꺼번에 삭제됩니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_2_09.png" style="margin-left: 0px;" alt="면적 측정">
						<figcaption>[면적 측정]</figcaption>
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