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
								<li><a href="/view/newhelp/community_help_3_3" class="on">ㆍ소통지도 참여/승인</a></li>
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
					<h1>소통지도 참여/승인</h1>
					
					<h2 class="Type_4">[개설자 승인 후 참여] 소통지도에 참여하기</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_04.png" style="width:700px;" alt="소통지도 참여하기">
					</figure>
					<ol>
						<li>1) [소통지도 참여하기]버튼을 선택하여 소통지도에 참여를 합니다</li>
					</ol>
					
					<h2 class="Type_4">[개설자 승인 후 참여] 소통지도에 참가한 사람을 승인시키기</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_10.png" style="width:700p;x" alt="소통지도 승인하기">
					</figure>
					<ol>
						<li>1) [관리자메뉴] 탭을 선택합니다</li>
						<li>2) [회원관리] 버튼을 선택합니다</li>
						<li>3) [참여승인] 버튼을 선택하여 승인합니다</li>
					</ol>
					
					<h2 class="Type_4">[회원 일괄 등록] 소통지도에 등록 가능한 회원 등록시키기</h2>
					<figure>
						<img src="/img/newhelp/img_community_3_11.png" style="width:700px;" alt="소통지도 의견 등록 회원 등록">
					</figure>
					<ol>
						<li>1) [관리자메뉴] 탭을 선택합니다</li>
						<li>2) [회원관리] 버튼을 선택합니다</li>
						<li>3) [회원등록] 버튼또는 [회원엑셀등록] 버튼을 선택</li>
						<li>4) 회원을 직접 타이핑을 하여 등록합니다</li>
						<li>5) [엑셀 양식 다운로드] 버튼을 선택하여 해당 양식에 회원을 일괄 등록 할 수 있습니다</li>
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
