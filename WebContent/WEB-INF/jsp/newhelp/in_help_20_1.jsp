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
								<li><a href="/view/newhelp/in_help_20_1"  class="on">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/in_help_20_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/in_help_20_4">ㆍPOI(관심지점) 조회방법</a></li>
								<li><a href="/view/newhelp/in_help_20_5">ㆍ통계버튼 목록 관리</a></li>
								<li><a href="/view/newhelp/in_help_20_6">ㆍ시계열 통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_20_7">ㆍ다중뷰 통계 조회</a></li>
								<!--  <li><a href="/view/newhelp/in_help_20_8">ㆍ범례결합통계조건 통계 조회</a></li>-->
						        <li><a href="/view/newhelp/in_help_20_9">ㆍ데이터 업로드 이용방법</a></li>
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
					<h1>지도창 조작 방법</h1>
					<h2>○ 지도이동은 마우스 드래그 방식으로 동작하고, 지도확대 및 축소는 마우스 휠 조작 또는 지도레벨 컨트롤 조작에 의해서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;동작합니다.</h2>
					<h2>○ 지도 레벨 컨트롤을 이용해서 1단계 지도 레벨 확대/축소를 할 수 있습니다.</h2>
					<h2>○ 축척 가운데 버튼으로 잠그면 동일 레벨의 행정구역 내에서만 이동할 수 있습니다.</h2>
					<img src="/img/newhelp/In_020_6_new.png" style="margin-left: 100px; width:400px;" border=0 alt="지도레벨 제어"/>
					<br><br>
					<h1>행정구역으로 이동하는 방법</h1>
					<h2>○ 시도, 시군구, 읍면동 각 단계별 행정구역을 선택해서 행정구역 위치조회를 할 수 있습니다.</h2>
					<h2>○ 지도 이동 시 지도화면의 중심점 위치에 해당하는 행정구역 정보가 설정됩니다.</h2>
					<img src="/img/newhelp/In_020_7_new.png" style="margin-left: 100px; width:500px; height:340px" border=0 alt="행정구역으로 이동하는 방법"/>	
					<br><br>
					<h1>데이터시각화 설정</h1>
					<h2>○ 통계 조회 시 지도화면에 표출되는 통계정보에 대해서 해당 범례를 사용자가 직접 설정할 수 있습니다.</h2>
					<h2>○ 데이터시각화 창에서 “설정“ 버튼을 누르면 데이터시각화 설정창이 표출되고, 데이터시각화 설정창에서 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;표출색상, 분류방법 등을 수정해서 적용할 수 있습니다.</h2>
					<img src="/img/newhelp/In_020_11_new.png" style="margin-left: 55px; width:600px; height:300px" border=0 alt="범례 설정"/>	
					<br><br>
					<h1>지도 초기화</h1>
					<h2>○ 지도화면에 표출되고 있는 통계정보를 모두 삭제하고, 초기화하는 기능입니다.</h2>
					<h2>○ 초기화 버튼을 누르면 지도화면의 통계정보가 삭제되고, 요약데이터창, 상세데이터창, 범례창 등이 모두 삭제됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;통계정보가 모두 삭제되면 초기의 기본 지도화면만 표출되는 상태로 변경됩니다.</h2>
					<img src="/img/newhelp/In_020_12_new.png" style="margin-left: 58px; width:300px; height:32px" border=0 alt="지도 초기화"/>	
					<br><br>
					<h1>북마크 설정</h1>
					<h2>○ 지도화면에 표출되고 있는 통계정보를 추후에 다시 확인할 수 있도록 관련정보를 저장하는 기능입니다.</h2>
					<h2>○ 지도화면에 통계정보가 표출된 상태에서 북마크 설정 버튼을 누르면 현재상태의 통계조회 관련 정보가 저장됩니다.</h2>
					<h2>○ 저장한 북마크설정 정보는 마이페이지 화면의 통계조회 히스토리 목록에서 확인할 수 있습니다.</h2>
					<img src="/img/newhelp/In_020_13_new.png" style="margin-left: 58px; width:300px; height:32px" border=0 alt="북마크 설정"/>	
					<br><br>
					<h1>공유 설정</h1>
					<h2>○ 지도화면에 표출되고 있는 통계정보를 블로그, 페이스북 등 SNS에 링크시켜서 공유할 수 있도록 하는 기능입니다.</h2>
					<h2>○ 지도화면에 통계정보가 표출된 상태에서 공유 버튼을 누르면 공유 안내창이 표출되고, 클립보드 복사를 통해서</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;원하는 곳에 링크 시킬 수 있습니다.</h2>
					<img src="/img/newhelp/In_020_14_new.png" style="margin-left: 58px; width:300px; height:32px" border=0 alt="공유 설정"/>	
					<br><br>					
					<h2>○ 공유를 위하여는 로그인을 해야 합니다.</h2>
					<img src="/img/newhelp/In_020_15_new.png" style="margin-left: 40px; width:640px;" border=0 alt="로그인"/>	
					<br><br>
					<h2>○ URL을 복사하여 정보를 공유할 수 있습니다.</h2>
					<img src="/img/newhelp/In_020_16_new.png" style="margin-left: 55px; width:314px; height:180px" border=0 alt="정보공유"/>	
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
