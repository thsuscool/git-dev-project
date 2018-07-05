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
						<li><a href="/view/newhelp/community_help_4" class="on">이용정책</a></li>
						<li><a href="/view/newhelp/community_help_2_1">기본조작 방법</a></li>
						<li><a href="/view/newhelp/community_help_3_1">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents" style="min-height: 500px;">
					<h1>이용정책</h1>
					<h2 class="Type_4">이용기간</h2>
					<ul class="Cont_List">
						<li>
							개설된 커뮤니티에 “등록자료” 가 1개월 동안 없는 경우 임시저장 소통지도로 자동 변경됩니다.<br>
							<span style="padding-left: 5px;font-size:12px;color:#aaa;">(임시 저장된 소통지도는 삭제하거나 개설하기 선택 가능)</span>
						</li>
						<li>
							임시저장 소통지도는 1개월 후 자동 삭제됩니다.
						</li>
					</ul>
					<span style="color:#8b0000;">
						※ 단 관리자에 의해 상업적인 목적으로 개설되었거나 개인정보 노출 등이 우려될 경우 작성내용이 삭제 될 수 있습니다.
					</span>
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
