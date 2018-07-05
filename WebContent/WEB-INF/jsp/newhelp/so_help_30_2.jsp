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
								<li><a href="/view/newhelp/so_help_30_1">ㆍ시군구별 생활업종현황</a></li>
								<li><a href="/view/newhelp/so_help_30_2"  class="on">ㆍ업종밀집도 변화</a></li>
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
					<h1>업종밀집도 변화</h1>
					<h2>○ 생활업종에 대한 업종밀집도를 열지도와 점지도로 보실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 생활업종을 선택하신 후, 지도 위에 선택항목을 끌어놓으면(Drag&Drop) 열지도가 표출 됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도상에서 축척을 읍면동 이하로 내리시면 열지도에서 점지도로 보실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 생활업종을 선택하신 후, 지도 위에 선택항목을 끌어놓으면(Drag&Drop) 열지도가 표출 됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 시도 검색 시에는 선택된 사업체에 대한 개별 위치정보를 모두 조회하므로, 다소 시간이 소요될 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(※ 검색 시 시군구 단위 조회를 추천 드립니다.)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※ 생활업종: 음식점(11종), 도소매업(11종), 서비스업(11종), 숙박업(3종)</h2>
					<img src="/img/newhelp/So_030_18.png" style="margin-left: 40px; width:650px;" alt="업종 밀집도 – 업종 검색 방법"/>	
					<h2 style="margin-left: 300px;">[업종 밀집도 – 업종 검색 방법]</h2><br>
					<img src="/img/newhelp/So_030_19.png" style="margin-left: 40px; width:650px;" alt="업종별 밀집도 – 업종별 열지도 및 점지도 표출"/>	
					<h2 style="margin-left: 300px;">[업종별 밀집도 – 업종별 열지도 및 점지도 표출]</h2><br>
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
