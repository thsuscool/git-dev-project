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
								<li><a href="/view/newhelp/community_help_3_4" class="on">ㆍ소통지도 의견 등록</a></li>
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
					<h1>소통지도 의견등록</h1>
					<figure>
					<img src="/img/newhelp/img_community_3_05.png"	style="width:700px;" alt="소통지도 의견등록">
					</figure>
					<ol>
						<li>1) [의견 등록하기] 버튼 선택.</li>
						<li>2) 제목 : 등록할 소통지도 의견의 제목을 작성합니다.</li>
						<li>3) 위치선택 : 의견을 등록할 위치를 지도상에서 선택하여 지정할 수 있습니다.</li>
						<li>4) 주소선택 : 의견을 등록할 위치를 주소정보연계팝업창에 주소를 검색을 하여 해당 주소를 선택할 수 있습니다.</li>
						<li>5) 사진 : 의견등록에 필요한 첨부사진을 추가할 수 있습니다.</li>
						<li>6) 의견 : 소통지도에 등록하려고하는 내용을 입력합니다.</li>
						<li>7) 아이콘 : 아이콘의 분류중 자신의 의견에 해당하는 아이콘을 선택합니다.</li>
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
