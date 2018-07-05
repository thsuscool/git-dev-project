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
				<div class="leftTitle">대화형 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/in_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/in_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/in_help_50_0">ㆍ인구통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_1">ㆍ가구통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_2">ㆍ주택통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_6">ㆍ결합통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_3">ㆍ농림어가통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_4">ㆍ사업체통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_5" class="on">ㆍKOSIS(지역통계)</a></li>
								<li><a href="/view/newhelp/in_help_50_7">ㆍ나의 데이터</a></li>
							</ul>
						</li>							
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>KOSIS(지역통계) 조회</h1>
					<h2>○ KOSIS(지역통계) 통계를 조회하는 기능입니다.</h2>
					<h2>○ KOSIS(지역통계) 단위 통계의 조회 메뉴리스트에서 단계별로 항목을 선택하고, 세부항목을 선택하면,</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;조회 세부조건 설정창이 나타난다. 항목, 분류, 주기 등 세부조건을 설정하고 해당 통계를 조회할 수 있습니다.</h2>
					<!-- mng_s 20170810 웹접근성 조치 -->
					<img src="/img/newhelp/In_050_12_new.png" style="margin-left: 10px; width:675px;" alt="행정구역통계 검색조건"/>
					<!-- mng_e 20170810 웹접근성 조치 -->
					<h2 style="margin-left: 220px;">[KOSIS(지역통계) 검색조건]</h2><br>
					<img src="/img/newhelp/In_050_14_new.png" style="margin-left: 20px; width:580px; height:50px" alt="행정구역통계 검색조건"/>	
					<h2 style="margin-left: 220px;">[KOSIS(지역통계) 세부조건 창]</h2><br>
					<h2>○ 생성된 통계버튼을 더블클릭하거나, 지도화면의 임의의 행정구역에 드래그앤드롭 하면 선택된 행정구역의 세부행정구역</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;단위로 해당 KOSIS통계정보가 생성되어 지도화면에 표출됩니다.</h2>
					<img src="/img/newhelp/In_050_13_new.png" style="margin-left: 0px;" alt="사업체 통계 검색 결과"/>
					<h2 style="margin-left: 250px;">[KOSIS(지역통계) 검색결과]</h2><br>
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
