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
								<li><a href="/view/newhelp/so_help_30_1"  class="on">ㆍ시군구별 생활업종 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_2">ㆍ업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/so_help_30_3">ㆍ생활업종 후보지 검색</a></li>
								<li><a href="/view/newhelp/so_help_30_4">ㆍ생활업종 후보지 정보보기</a></li>
								<li><a href="/view/newhelp/so_help_30_6">ㆍ업종별 개업 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_5">ㆍ나의 데이터</a></li>						
							</ul>
						</li>							
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>시군구별 생활업종 현황</h1>
					<h2>○ 생활업종에 대한 지역현황을 전국 지도에서 시군구 단위로 보실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 생활업종을 선택하시면 지도상에 업종별 분포를 버블지도로 확인하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도상에 표출된 시군구를 클릭하시면 상세 정보를 데이터 보드에서 조회하실 수 있으시며,</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 해당되는 시군구의 업종 밀집도 변화와 생활업종 후보지 정보를 바로 조회하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ※ 생활업종: 음식점(11종), 도소매업(11종), 서비스업(11종), 숙박업(3종)</h2>
					<img src="/img/newhelp/So_030_17.png" style="width:713px; height:374px" border=0 alt="시군구별 생활업종현황"/>	
					<h2 style="margin-left: 300px;">[시군구별 생활업종 현황]</h2><br>
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
