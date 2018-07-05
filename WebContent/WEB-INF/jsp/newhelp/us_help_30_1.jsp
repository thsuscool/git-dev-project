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
				<div class="leftTitle">홈페이지 이용안내</div>
				<div class="leftmenu">
					<ul>
						<!-- mng_s 20170915_김건민 -->	
						<li><a href="/view/newhelp/us_help_10_0">SGIS플러스란?</a></li>
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a></li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a>
							<ul class="sub">
								<li><a href="/view/newhelp/us_help_30_0">ㆍSGIS플러스의 GIS 좌표체계</a></li>
						<!-- mng_e 20170915_김건민 -->	
								<li><a href="/view/newhelp/us_help_30_1" class="on">ㆍ자료신청시 참조사항</a></li>
								<li><a href="/view/newhelp/us_help_30_2">ㆍ브라우저 호환성</a></li>
								<li><a href="/view/newhelp/us_help_30_3">ㆍ기타 주의사항</a></li>
							</ul>
						</li>
						<!-- <li><a href="/view/newhelp/us_help_40_0">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>자료신청 시 참조사항</h1><br>
					<h2>● 로그인 후 자료신청이 가능합니다.</h2>
					<h2>● 신청하신 자료는 승인절차 후에 다운로드 받을 수 있습니다(다운로드 가능 기간 : 승인 후 7일이내)</h2>
					<h2>● 자료신청에 대한 활용내역 관리를 위하여 공문서 작성이 필요합니다.</h2>
					<h2>● 자료신청시 필요한 자료목록이 존재하는지 자료제공 목록에서 확인 바랍니다.</h2>
					<h2>● 지리정보 기준시점 : 기준년도 12월31일</h2>
					<h2>● 지리정보 좌표계 : UTM-K(GRS80타원체)</h2>
					<h2>● 서비스 제한 기준 : 집계구별 5미만 통계값 서비스제외(총괄항목은 미적용)</h2>
					<h2>● 제공자료에 대한 아래와 같은 자세한 내용은 자료다운로드 페이지에 링크되어 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 집계구별 통계자료 이용안내</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 공간통계자료제공 안내</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 2010년 집계구별 통계항목 코드</h2>
					<!-- mng_s 20170915_김건민 -->	
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- SGIS플러스에서 사용되는 좌표계</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- SGIS플러스 행정구역코드</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- SGIS플러스 통계지리정보서비스 DB Schema 다운로드</h2>
					<!-- mng_e 20170915_김건민 -->	
					<br><br>
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
