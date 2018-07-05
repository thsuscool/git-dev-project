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
								<li><a href="/view/newhelp/so_help_30_4"  class="on">ㆍ생활업종 후보지 정보보기</a></li>
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
					<h1>생활업종 후보지 정보보기</h1>
					<h2>○ 지역(시군구, 읍면동)에 대한 생활업종 관련 종합 정보를 조회합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 생활업종 후보지 정보보기에서 생성된 선택항목을 지도 위에 끌어놓으면(Drag&Drop) 정보를 조회 하실 수 있습니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 창업지역 검색 메뉴에서도 창업후보지에 대한 생활업종 후보지 정보를 보실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(검색결과 화면에서 후보지 선택)</h2>
					<img src="/img/newhelp/So_030_05_new.png" style="margin-left: 0px; width:700px;" alt="지역현황 상세조회"/>	
					<h2>○ 지역특성정보 그래프는 선택한 행정구역과 상위 행정구역의 현황정보가 동시에 표출됩니다.</h2>
					<img src="/img/newhelp/So_030_06_new.png" style="margin-left: 150px; width:400px;" alt="지역특성정보"/>	
					<h2 style="margin-left: 300px;">[지역특성정보]</h2><br>
					<h1>지역종합현황 보기</h1>
					<h2>○ 사업체, 인구, 가구, 주택 등의 분야에 대한 지역종합 정보가 다양한 형태로 시각화돼서 표출됩니다.</h2>
					<img src="/img/newhelp/So_030_07_new.png" style="margin-left: 40px; width:620px;" alt="지역종합현황"/>	
					<h2 style="margin-left: 300px;">[지역종합현황]</h2><br>
					<h2>○ 인구 분야의 지역특성정보는 연령별분포, 성별분포 등 2가지의 통계정보를 그래프형태로 제공합니다.</h2>
					<img src="/img/newhelp/So_030_08_new.png" style="margin-left: 0px; width:700px;" alt="지역종합현황-인구"/>	
					<h2 style="margin-left: 300px;">[지역종합현황-인구]</h2><br>
					<h2>○ 거처유형별 주택비율 및 점유형태별 가구비율 통계정보를 그래프형태로 제공합니다.</h2>
					<img src="/img/newhelp/So_030_09_new.png" style="margin-left: 0px; width:700px;" alt="지역종합현황-가구"/>	
					<h2 style="margin-left: 250px;">[지역종합현황-가구]</h2><br>
					<h2>○ 사업체 분야의 지역특성정보는 업종별 비율,  업종별 증감 등 2가지의 통계정보를 그래프형태로 제공합니다.</h2>
					<img src="/img/newhelp/So_030_10_new.png" style="margin-left: 0px; width:700px;" alt="지역종합현황-사업체"/>	
					<h2 style="margin-left: 280px;">[지역종합현황-사업체]</h2><br>

					<h1>주택동향정보 조회</h1>
					<h2>○ 지역 검색결과 화면에서 지역 선택 시 주택동향정보를 조회할 수 있습니다. 주택동향정보는 주택 거래가격과</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;주택 거래량 정보를 제공합니다.</h2>
					<h2>○ 주택 거래가격과 주택 거래량 정보는 아파트, 다세대/연립, 단독으로 구분해서 각각 별도의 그래프를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;생성해서 보여줍니다.</h2>
					<img src="/img/newhelp/So_030_11_new.png" style="margin-left: 0px; width:700px;" alt="주택동향정보-거래가격/거래량"/>	
					<h2 style="margin-left: 250px;">[주택동향정보-주택]</h2><br>
					<h1>상권정보 조회</h1>
					<h2>○ 지역 검색결과 화면에서 화면 오른쪽 상단의 사업체전개도 버튼을 누르면 해당 지역의 통계정보가 조회되고, 동시에 주변</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;지역의 상권블럭정보(중기청의 상권영역)가 다른 색상으로 지도화면에 표출됩니다.</h2>
					<h2>○ 지도화면에서 임의의 상권블럭을 선택하면 해당 상권의 사업체관련 통계정보가 표출됩니다.</h2>
					<img src="/img/newhelp/So_030_12_new.png" style="margin-left: 0px; width:700px;" alt="사업체관련 통계정보"/><br>
					<img src="/img/newhelp/So_030_13_new.png" style="margin-left: 150px; width:450px;" alt="상권정보 조회"/>	
					<h2 style="margin-left: 310px;">[상권정보 조회]</h2><br>
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
