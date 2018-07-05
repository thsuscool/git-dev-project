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
				<div class="leftTitle">지역현안 소통지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/community_help_1">서비스 개요</a></li>
						<li><a href="/view/newhelp/community_help_4">이용정책</a></li>
						<li><a href="/view/newhelp/community_help_2_1" class="on">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/community_help_2_1">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/community_help_2_2">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/community_help_2_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/community_help_2_5" class="on">ㆍ통계버튼 목록 관리</a></li>
							</ul>
						</li>
						<li><a href="/view/newhelp/community_help_3_1">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>통계버튼 목록 관리</h1>
					<ul class="Cont_List">
						<li>맵 개설시 생성한 통계 리스트 및 기본 POI를 표시합니다.</li>
						<li>기본 POI 의 체크박스를 선택하면, 지도화면의 중심점을 기준으로 일정 반경 내의 POI를 검색해서 마커 형태로 표출됩니다.</li>
						<li>조회타입에 따라 통계리스트항목을 지도상의 지역에 끌어서 놓기(drag&amp;drop) 하는 방식 또는 더블클릭 또는 체크박스 선택 하는 방식으로 조회가 가능합니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_community_2_19.png" style="margin-left: 0px; border:#ddd solid 1px;" alt="통계버튼 목록 관리">
						<figcaption>[통계버튼 목록 관리]</figcaption>
					</figure>
					
					<ul class="Cont_List">
						<li>기본자료 on일 때는 개설시 설정한 나의데이터 POI가 지도위에 표출되고, off일 때는 표출되지 않습니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_community_2_20.png" style="margin-left: 0px; width:722px;" alt="기본자료">
						<figcaption>[기본자료]</figcaption>
					</figure>
					
					<ul class="Cont_List">
						<li>통계수치가 on일 때는 통계수치를 지도위에 표출되고, off일 때는 표출되지 않습니다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_community_2_21.png" style="margin-left: 0px; width:722px;" alt="통계수치">
						<figcaption>[통계수치]</figcaption>
					</figure>
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
