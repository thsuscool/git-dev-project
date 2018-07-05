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
				<div class="leftTitle">정책통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/policy_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/policy_help_20_0" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/policy_help_20_0">ㆍ지역별 수요변화</a></li>
								<li><a href="/view/newhelp/policy_help_20_1" class="on">ㆍ지역별 정책지도</a></li>
								<li><a href="/view/newhelp/policy_help_20_2">ㆍ정책통계지도 작성</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1 style="float: left;">지역별 정책지도 </h1><img src="/img/newhelp/img_policy_4_00.png" style="width:90px;margin-top: 0px;">
					<h2 class="Type_3">1) 지역선택 및 검색어 입력 : 검색 대상지역 및 검색어를 입력한다.</h2>
					<ul class="Cont_List">
						<li>검색 대상지역 및 검색어를 입력후 [검색]버튼을 클릭한다.</li>
						<li>해당 정책통계지도를 선택한다.</li>
						<li>[정책지도 보기]버튼을 클릭한다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_05.png" style="margin-left: 0px;" alt="지역선택 및 검색어 입력">
						<figcaption>[지역선택 및 검색어 입력]</figcaption>
					</figure>
					
					<h2 class="Type_3">2) 정책지도 보기 : 선택한 정책통계지도 정보를 조회하여 보여준다.</h2>
					<ul class="Cont_List">
						<li>선택한 정책지도를 지도창에 보여준다.</li>
						<li>정책지도의 제목, 내용, URL, 기준 데이터, 추가 데이터를 조회하여 보여준다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_06.png" style="margin-left: 0px;" alt="정책통계지도 설명">
						<figcaption>[정책통계지도 설명]</figcaption>
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