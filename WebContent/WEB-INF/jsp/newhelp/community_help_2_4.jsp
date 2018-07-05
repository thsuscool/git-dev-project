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
								<li><a href="/view/newhelp/community_help_2_4" class="on">ㆍPOI(관심지점) 조회방법</a></li>
								<li><a href="/view/newhelp/community_help_2_5">ㆍ통계버튼 목록 관리</a></li>
							</ul>
						</li>
						<li><a href="/view/newhelp/community_help_3_1">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>POI(관심지점) 조회방법</h1>
					
                    <ul class="Cont_List">
                      <li>주요시설 POI를 검색해서 지도화면에 표출하는 기능입니다.</li>
                      <li>POI설정 메뉴 선택 후, 업종을 차례로 선택하면 현재 지도화면의 중심점을 기준으로 일정 반경 내의 POI를 검색해서 마커 형태로 표출됩니다.</li>
                      <li>지도를 확대하면 대표값으로 보인 마커가 다시 세분화되어 사업체의 위치를 표시합니다.</li>
                    </ul>
					<figure>
					<img src="/img/newhelp/img_community_2_18.png"  style="margin-left: 0px; width:722px;" alt="POI(관심지점) 조회">
                    <figcaption>[POI(관심지점) 조회]</figcaption>
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
