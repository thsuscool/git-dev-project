
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
						<li><a href="/view/newhelp/community_help_1" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/community_help_4">이용정책</a></li>
						<li><a href="/view/newhelp/community_help_2_1">기본조작 방법</a></li>
						<li><a href="/view/newhelp/community_help_3_1">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>서비스 개요</h1>
					<ul class="Cont_List">
						<li>지역현안 소통지도는 지역사회 구성원이 직접 참여하여 지역사회의 이슈를 찾아내고 소통을 위한 공간을 마련하는 서비스로 지도매핑 기능을 기본적으로 제공합니다.</li>
						<li>소통지도 개설자는 대화형 통계지도 또는 나의 데이터 기능을 이용해서 주제와 관련된 통계를 소통지도에 적용하여 개설할 수 있습니다.</li>
						<li>주요기능
						<ul>
							<li>소통지도 만들기 : 소통지도 정보 등록, 지역설정, 기간설정, 아이콘설정 등</li>
							<li>배경지도 만들기 : 총인구, 총사업체, 즐겨찾기 등의 통계색상지도 또는 테마, 나의데이터 등의 POI정보를 표출할 수 있습니다.</li>
							<li>소통지도 의견등록하기 : 의견작성, 위치선택, 사진추가 등의 의견등록을 할 수 있습니다.</li>
							<li>소통지도 현황 조회 : 소통지도에 대한 의견등록 및 참여자 현황 등의 다양한 현황정보를 차트, 표 등을 통해서 제공합니다.</li>
						</ul>
						</li>
					</ul>
					
					<h1>화면 구성</h1>
					<img src="/img/newhelp/img_community_1_01.png"	style="margin-left: 0px;" alt="지역현안 소통지도 화면구성">
					<ol>
						<li>1) 소통지도 검색 : 제목 또는 태그로 검색합니다.</li>
						<li>2) 정렬 : 우선정렬과 정렬 방법으로 통계 소통지도의 목록을 재 조회할 수 있습니다.</li>
						<li>3) 소통지도 만들기 : 개설자가 운영목적에 부합한 통계자료를 배경지도로 선택한후 소통지도를 만들어 운영하며, <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소통지도의 운영성격에 따라서 참여자는 개설자의 승인을 얻은후 참여가 가능합니다.</li>
						<li>4) 소통지도 목록 : 소통지도 목록은 전체, 개설, 가입 소통지도 목록을 조회하여 보여주며 의견등록한 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소통지도를 선택하면 해당 소통지도의 상세정보와 의견등록하기, 댓글쓰기, 신고하기 등의 기능을<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용하실 수 있습니다.</li>
						<li>5) 핫소통지도 : 참여인원과 등록의견이 많은 순으로 4개의 소통지도를 핫소통지도로 선정 및 조회합니다.</li>
						<li>6) 최신소통지도 : 최근 등록된 소통지도를 보여줍니다.</li>
						<li>7) 공지사항 : 지역현안 소통지도 전체 공지사항을 조회할 수 있습니다.</li>
						<li>8) 지역현안 소통지도 소개 : 지역현안 소통지도 소개 및 이용안내 등의 정보를 조회할 수 있고,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 모바일로 QR코드를 스캔하면 모바일페이지로 접근이 가능합니다.</li>
					</ol>
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
