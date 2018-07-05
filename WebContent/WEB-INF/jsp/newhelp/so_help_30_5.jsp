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
					<h1>나의 데이터</h1>
					<h2>○ 내가 등록한 정보 및 다른 사용자가 등록하여 공개한 정보를 조회합니다.</h2>
					<h2>○ 사용자가 보유하고 있는 txt, csv, Excel, KML 등의 포맷파일을 업로드하여</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;지도 위에 매핑할 수 있습니다.</h2>
					<img src="/img/newhelp/So_030_20.png" alt="나의 데이터 이동"/>
					<h2>○ 나의 데이터 이동 버튼을 누르면 자신이 가지고 있는 데이터 목록이 나타납니다.</h2>
					<h2>○ 로그인을 안하셨다면 로그인을 하셔야 이용 할 수 있습니다.</h2>	
					<h2 style="margin-left: 250px;">[나의 데이터 이동]</h2><br>
					<img src="/img/newhelp/So_030_21.png" alt="나의 데이터 목록"/>
					<h2>○ 자신이 업로드한 데이터 목록을 나타냅니다.</h2>	
					<h2 style="margin-left: 250px;">[나의 데이터 목록]</h2><br>
					<img src="/img/newhelp/So_030_22.png" alt="나의 데이터 업로드"/>
					<h2>○ 내파일 업로드 하기를 클릭하면 자신이 업로드 할 파일의 제목,파일형태,제목 및 지오코딩 설정을 할 수 있습니다.</h2>	
					<h2 style="margin-left: 250px;">[나의 데이터 업로드]</h2><br>
					<img src="/img/newhelp/So_030_23.png" alt="위치조회(지오코딩)"/>
					<h2>○ 위치조회(지오코딩)가 업로드한 파일에서 주소의 X좌표,Y좌표값을 설정합니다.</h2>
					<h2 style="margin-left: 250px;">[위치조회(지오코딩)]</h2><br>
					<img src="/img/newhelp/So_030_24.png" alt="지도표출설정"/>
					<h2>○ 위치조회(지오코딩)가 완료되면 지도표출설정을 클릭합니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;지도상에서 자신이 업로드한 데이터의 위치에 POI 마커가 표출 됩니다.</h2>
					<h2>○ 자신이 사용할 목적에 맞게 원하는 유형으로 설정 후 저장합니다. </h2>						
					<h2 style="margin-left: 250px;">[지도표출설정]</h2>
					<h2 style="margin-left: 250px;">*위치표시: 좌표, 열지도: 분포</h2><br>
					<img src="/img/newhelp/So_030_25.png" alt="공개된 사용자 데이터 목록"/>
					<h2>○ 공개된 사용자 데이터 목록은 다른 사용자가 자신이 가지고 있는 데이터를 공개 해놓은 것을 목록으로 나타냅니다.</h2>	
					<h2>○ 목록중에서 클릭하면 다른 사용자가 공개한 데이터들이 지도에 표출 됩니다.</h2>						
					<h2 style="margin-left: 250px;">[공개된 사용자 데이터 목록]</h2><br>
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
