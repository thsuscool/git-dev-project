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
				<div class="leftTitle">통계주제도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/su_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/su_help_20_0">통계항목 선택방법</a></li>
						<li><a href="/view/newhelp/su_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1><br>
					<h2>○ 통계와 관련하여 주요주제에 따른 관심사별 통계정보를 손쉽게 확인할 수 있는 서비스입니다.</h2>
					<h2>○ 인구와 가구, 주거와 교통, 복지와 문화, 노동과 경제, 환경과 안전의 5가지 카테고리에 따라<br> 
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 관심 있는 통계를 주제도화한 서비스입니다.</h2>
					<h2>○ 사회적 이슈 및 트렌드를 반영하여 총 90종 이상의 주제도를 제공하고 있고, 사회 흐름에 따라 지속적으로 추가됩니다.</h2>
					<h2>○ 주제도 표출 타입</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 색상타입 주제도 : 행정구역별 통계 정보를 색상으로 표현하는 기본 형태입니다</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 증감타입 주제도 : 시점이 다른 두 데이터의 증감을 이용하여 지역별 증가 또는 감소 여부를 표출하고,<br>
				    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 년도별로 데이터의 증감여부를 차트로 표출합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 시계열타입 주제도 : 시점에 따른 변화를 표출하기 위한 주제도 타입으로 각 시점별로 색상타입으로 조회할 수 있으며,<br>
				     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 해당 지역의 시점별 정보 변화를 차트로 표출합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 분할타입 주제도 : 두 데이터를 직접 비교할 수 있는 주제도 타입입니다.<br>
				     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 연관성 있거나 연관성이 높은 것으로 추정되는 데이터를 지역별로 비교할 수 있도록 표출합니다.</h2>
					<br><br>
				  <h1>화면 구성</h1>
				  	<!-- 2016.03.18 수정, 이미지 높이 수정 -->
					<img src="/img/newhelp/Su_010_01_new.png" style="width:700px;"  alt="화면구성"/><br>
					<h2>1) 지역설정 : 지도의 중심에 해당하는 지역이 설정됩니다. 따라서 지도 이동시 정보가 업데이트 됩니다.</h2>
					<h2>2) 주제도 목록 : 버튼 클릭 시 <img src="/img/newhelp/Su_010_04_new.png" style="width:18px; height:18px; margin-top:-10px; margin-bottom:-4px; "> 의 주제도 카테고리 및 주제도 목록이 나타납니다.</h2>
					<h2>3) 주제도 제목 : 표출되는 통계의 제목입니다.</h2>
					<h2>4) 주제도 설정 : 통계선택, 지역경계 선택, 지도 유형, 통계표출 등의 통계정보 표현을 설정합니다.</h2>
					<h2>5) 데이터 시각화 : 통계정보의 범례를 조정합니다.</h2>
					<h2>6) 출력 및 주제도 신규 요청 : 주제도 인쇄 및 주제도 신규 추가를 신청하는 기능입니다.</h2>
					<h2>7) 지도유형 : 배경지도를 일반/위성으로 변경합니다.</h2>
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
