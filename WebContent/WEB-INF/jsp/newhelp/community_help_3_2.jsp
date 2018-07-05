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
						<li><a href="/view/newhelp/community_help_2_1">기본조작 방법</a></li>
						<li><a href="/view/newhelp/community_help_3_1" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/community_help_3_1">ㆍ소통지도 만들기</a></li>
								<li><a href="/view/newhelp/community_help_3_2" class="on">ㆍ소통지도 목록 조회</a></li>
								<li><a href="/view/newhelp/community_help_3_3">ㆍ소통지도 참여/승인</a></li>
								<li><a href="/view/newhelp/community_help_3_4">ㆍ소통지도 의견 등록</a></li>
								<li><a href="/view/newhelp/community_help_3_5">ㆍ소통지도 의견 검색</a></li>
								<li><a href="/view/newhelp/community_help_3_6">ㆍ댓글쓰기 및 신고하기</a></li>
								<li><a href="/view/newhelp/community_help_3_7">ㆍ데이터보드</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>소통지도 목록 조회</h1>
					<figure>
						<img src="/img/newhelp/img_community_3_03.png"	style="width:700px;" alt="소통지도 목록 조회">
					</figure>
					<ol>
						<li>1) 소통지도 목록 검색 : 개설된 소통지도의 이름과 태그를 이용하여 검색 조건에 맞는 목록을 조회합니다.</li>
						<li>2) 정렬 기준 선택 : 우선정렬과 정렬 방법을 선택하여 목록을 조회합니다.</li>
						<li>3) 소통지도 목록 : 현재 개설되어있는 소통지도 목록을 표시합니다.</li>
						<li>4) 핫 소통지도 정보 : 개설된 소통지도중 참여자가 많거나, 이슈가 되는 소통지도가 표시됩니다.</li>
						<li>5) 최신 소통지도 정보 : 최신으로 개설된 소통지도가 표시됩니다.</li>
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
