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
				<div class="leftTitle">살고싶은 우리동네</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/house_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/house_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/house_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>서비스 개요</h1>
					<ul class="Cont_List">
						<li>살고싶은 우리동네는 통계에 기반하여 사용자 조건에 맞는 주거지역을 추천해 주는 서비스입니다.</li>
						<li>이용자는 자연, 주택, 지역 인구, 안전, 생활 편의 교통, 교육, 복지 문화 등 7개 카테고리 총 33종의 주거지 선정 조건에 해당하는 추천지역리스트 및 통계정보를 확인할 수 있습니다</li>
						<li>주요기능
							<ul>
								<li>추천지역 찾기<br>
								 : 주요 지표를 조건으로 주거 추천지를 검색하는 서비스로 지역 선택, 라이프스타일 별 자동 지표 설정, 지표별 정렬기준과 가중치 설정, 추천지역 상세정보 조회 등의 세부 기능이 있습니다.</li>
								<li>주거현황 보기<br>
								 : 주요 지표에 대해서 지역별 지표 현황 조회, 지표별 지역분포 현황 조회 등을 할 수 있습니다.</li>
								<li>간편동네 찾기<br>
								 : 나의 관심사에 해당하는 동네를 간편하게 조회하는 서비스로 관심사 설정, 지표 우선순위 설정, 추천지역 상세정보 조회 등의 세부 기능이 있습니다. </li>
							</ul>
						</li>
						<li>주요지표
							<ul>
								<li> 자연 : 대기오염도, 녹지비율 등</li>
								<li> 주택 : 공동주택비율, 아파트 가격, 공시지가 등</li>
								<li> 지역 인구 : 청장년인구비율, 순유입인구비율 등</li>
								<li> 안전 : 화재 안전, 교통사고 안전, 범죄 안전 등</li>
								<li> 생활 편의 교통 : 편의시설 수, 쇼핑시설 수, 외식시설 수 등</li>
								<li> 교육 : 고등교육기관 수, 학원 수 등</li>
								<li> 복지 문화 : 유치원 및 보육시설, 병의원 및 약국, 사회복지시설, 문화시설 수 등</li>
							</ul>
						</li>
					</ul>

					<h1>화면 구성</h1>
					<ol>
						<li>처음페이지 > 활용서비스 > 살고싶은 우리동네</li>
					</ol>
					<img src="/img/newhelp/img_house_1_01.png" style="margin-left: 0px;" alt="살고싶은우리동네 화면구성">
					<ol>
						<li>1) 지역설정 : 지도에서 특정 지역으로 이동하도록 설정합니다.</li>
						<li>2) 부가기능 : 전체 화면 확대, 초기화 등을 수행합니다.</li>
						<li>3) 주요기능 : 추천지역 찾기, 주거현황 보기, 이상형동네 찾기를 수행합니다.</li>
						<li>4) 데이터 보드 : 조회된 통계 데이터정보를 그래프 등의 형태로 제공합니다.</li>
						<li>5) 관심지점(POI) 조회 : 학구도, 편의시설 등의 POI를 지도 위에 표출합니다.</li> 
						<li>6) 도구 : 지도창에서 거리, 면적계산, 위성영상 중첩 등을 수행합니다.</li>
						<li>7) 지도 확대/축소 : 지도를 확대 및 축소합니다.</li>
						<li>8) 범례창 : 표시된 통계값의 범례를 표시하며, 범례설정 변경도 가능합니다.</li>
					</ol>
				</div>
			</div>
			<!--contentsWrap-->
		</div>
		<!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div>
	<!--wrapper-->
</body>

</html>