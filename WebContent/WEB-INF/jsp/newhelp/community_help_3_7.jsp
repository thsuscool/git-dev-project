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
								<li><a href="/view/newhelp/community_help_3_2">ㆍ소통지도 목록 조회</a></li>
								<li><a href="/view/newhelp/community_help_3_3">ㆍ소통지도 참여/승인</a></li>
								<li><a href="/view/newhelp/community_help_3_4">ㆍ소통지도 의견 등록</a></li>
								<li><a href="/view/newhelp/community_help_3_5">ㆍ소통지도 의견 검색</a></li>
								<li><a href="/view/newhelp/community_help_3_6">ㆍ댓글쓰기 및 신고하기</a></li>
								<li><a href="/view/newhelp/community_help_3_7" class="on">ㆍ데이터보드</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>소통지도 의견 댓글쓰기 및 신고하기</h1>
					
					<h2 class="Type_4">소통지도의견 통계</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_12.png" style="width:700px;" alt="데이터 보드 1">
					</figure>
					<ol>
						<li>1) 막대형차트</li>
						<li>2) 원형차트</li>
						<li>3) 방사형차트</li>
						<li>4) 모든데이터표 : 등록된 의견의 지역(시도,시군구,읍면동)을 표로 나타냅니다.</li>
					</ol>
					<h2 class="Type_4">선택된 통계 데이터</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_13.png" style="width:700px;" alt="데이터 보드 2">
					</figure>
					<ol>
						<li>1) 통계리스트에서 원하는 통계를 표출합니다</li>
						<li>2) 차트 : 선택된 통계의 데이터를 차트로 보여줍니다</li>
						<li>3) 표 : 선택된 통계의 데이터를 표로 보여줍니다</li>
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
