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
				<div class="leftTitle">우리동네생활업종</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/so_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/so_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/so_help_30_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/so_help_30_0">ㆍ시도별 생활업종 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_1">ㆍ시군구별 생활업종 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_2">ㆍ업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/so_help_30_3">ㆍ생활업종 후보지 검색</a></li>
								<li><a href="/view/newhelp/so_help_30_4">ㆍ생활업종 후보지 정보보기</a></li>
								<li><a href="/view/newhelp/so_help_30_6">ㆍ업종별 개업 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_5" class="on">ㆍ나의 데이터</a></li>
							</ul>
						</li>							
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>업종별 개업 현황</h1>
					<h2>○ 지자체 인허가 업종에 대한 업종별 개업 현황을 제공합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지자체 인허가 업종분류는 통계청 산업분류와 체계가 다르며 1:1 매칭이 되지 않습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지자체 인허가 업종분류 관련 문의는 <a href="http://localdata.kr" target="_blank">localdata.kr</a>로 하시기 바랍니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 업종별 개업 사업체가 너무 적은 경우 열지도의 반지름을 조절하면서 볼 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지자체 인허가 업종을 선택하시면 개업 현황에 대한 열지도가 표출 됩니다.</h2>
					
					<img src="/img/newhelp/So_030_60.png" alt="업종별 개업 현황"/>
					<h2 style="margin-left: 250px;">[업종별 개업 현황 조회 방법]</h2><br><br>
					
					<h2>○ 업종별 개업 현황의 조회 결과입니다. 반지름 및 흐림도를 조절하여 열지도를 보실 수 있습니다.</h2>
					<h2>○ 우측 데이터 보드를 통하여 년도별 정보 및 분기별 현황을 조회하실 수 있습니다.</h2>
					<img src="/img/newhelp/So_030_61.png" alt="업종별 개업 현황 조회 결과"/>
					<h2 style="margin-left: 250px;">[업종별 개업 현황 조회 결과]</h2><br><br>
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
