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
								<li><a href="/view/newhelp/community_help_2_1" class="on">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/community_help_2_2">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/community_help_2_3">ㆍ지도상에서의 측정방법</a></li>
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
				  <h1>지도 표출 및 경계 표출</h1>
					<ul class="Cont_List">
                      <li>지역현안 소통지도는 총 14단계의 타일맵이 있습니다.
                        <ul>
                          <li>지도를 축소/확대 할때에 각 지도 레벨에 해당하는 행정경계 정보가 표출됩니다.</li>
                        </ul>
                      </li>
                    </ul>
					
				    <h2 class="Type_2">1, 2레벨 ▶ 전국 경계 표출</h2>
                    <figure>
					<img src="/img/newhelp/img_community_2_01.png"  style="margin-left: 0px;" alt="전국 경계 표출">
                    <figcaption>[전국 경계 표출]</figcaption>
                    </figure>
                    
                    <h2 class="Type_2">3, 4레벨 ▶ 시/도 경계 표출</h2>
                    <figure>
					<img src="/img/newhelp/img_community_2_02.png"  style="margin-left: 0px;" alt="시/도 경계 표출">
                    <figcaption>[시/도 경계 표출]</figcaption>
                    </figure>
                    
                    <h2 class="Type_2">5, 6레벨 ▶ 시/군/구 경계 표출</h2>
                    <figure>
					<img src="/img/newhelp/img_community_2_03.png"  style="margin-left: 0px;" alt="시/군/구 경계 표출">
                    <figcaption>[시/군/구 경계 표출]</figcaption>
                    </figure>
                    
                    <h2 class="Type_2">7, 8, 9레벨 ▶ 읍/면/동 경계 표출</h2>
                    <figure>
					<img src="/img/newhelp/img_community_2_04.png"  style="margin-left: 0px;" alt="읍/면/동 경계 표출">
                    <figcaption>[읍/면/동 경계 표출]</figcaption>
                    </figure>
                    
                    <h2 class="Type_2">10, 11, 12, 13, 14레벨 ▶ 집계구 경계 표출</h2>
                    <figure>
					<img src="/img/newhelp/img_community_2_05.png"  style="margin-left: 0px;" alt="집계구 경계 표출">
                    <figcaption>[집계구 경계 표출]</figcaption>
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
