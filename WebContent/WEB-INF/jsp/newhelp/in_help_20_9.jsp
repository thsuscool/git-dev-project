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
						<li><a href="/view/newhelp/in_help_20_0">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/in_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/in_help_20_1">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/in_help_20_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/in_help_20_4">ㆍPOI(관심지점) 조회방법</a></li>
								<li><a href="/view/newhelp/in_help_20_5">ㆍ통계버튼 목록 관리</a></li>
								<li><a href="/view/newhelp/in_help_20_6">ㆍ시계열 통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_20_7">ㆍ다중뷰 통계 조회</a></li>
								<!--  <li><a href="/view/newhelp/in_help_20_8">ㆍ범례결합통계조건 통계 조회</a></li>-->
						        <li><a href="/view/newhelp/in_help_20_9"  class="on">ㆍ데이터 업로드 이용방법</a></li>
							</ul>
						</li>							
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a></li>
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>데이터 업로드 이용방법</h1>
					<h2>○ 사용자의 데이터를 업로드해서 지도화면에 표출할 수 있도록 하는 기능입니다.</h2>
					<h2>○ 데이터업로드 버튼을 누르면 업로드파일 설정 창이 표출되고, 파일을 설정할 수 있습니다.</h2>
					<h2>○ 통계메뉴 버튼을 누릅니다.</h2>
					<img src="/img/newhelp/In_020_22_new.png"  style="margin-left: 55px; width:350px; height:200px" alt="데이터 업로드"/>
					<br><br>
					<h2>○ 나의 데이터 메뉴를 선택합니다.</h2>
					<img src="/img/newhelp/In_020_23_new.png"  style="margin-left: 55px; width:400px; height:550px" alt="데이터 업로드 파일선택"/>	
					<br><br>
					<h2>○ 데이터 업로드는 지정된 양식의 문서만 업로드가 가능한데, 양식파일은 데이터업로드 설정창에서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;다운로드가 가능합니다.</h2>
					<h2>○ 지정된 양식의 데이터 파일을 업로드하면 사용자데이터 리스트창이 표출되어, 문서내의</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;항목리스트가 표출됩니다.</h2>
					<h2>○ 위치정보조회 버튼을 누르면 좌표값이 생성되고, 지도에서 위치보기 체크를 통해서 지도화면에서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;마커 형태로 표출되는 것을 확인할 수 있습니다.</h2>
					<img src="/img/newhelp/In_020_25_new.png" style="margin-left: 35px; width:600px;" alt="마커표출"/>	
					<br><br>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;○ 마커표출 설정</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) 데이터 표출 및 툴팁설정 : 마커에 표시될 정보와 툴팁에 표시될 정보를 설정할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) 그룹화 컬럼 설정 : 원하는 컬럼으로 데이터를 그룹화하여 볼 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3) 마커정보 표시 : 원하는 마커를 클릭하면 상세정보가 표시됩니다.</h2>
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
