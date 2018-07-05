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
				<div class="leftTitle">통계지도 체험</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ex_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/ex_help_20_0">서비스 이용방법</a></li>
						<li><a href="/view/newhelp/ex_help_30_0">엑셀활용 방법</a></li>
						<li><a href="/view/newhelp/ex_help_40_0">출력 방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1><br>
					<h2>○ 통계지도 체험은 이용자가 필요에 따라 지도상의 행정경계 위에 시각적, 공간적으로<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 통계값을 표현해 볼 수 있는 서비스입니다.</h2>
					<h2>○ 통계자료를 직접 입력하거나 엑셀등의 자료를 이용하여 행정구역별 색채지도를 만들 수 있습니다.</h2>
					<h2>○ 주요기능</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 행정구역 단위 통계체험 : 시도/시군구/읍면동 단위의 통계체험을 할 수 있습니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 지도화면 설정 : 색상설정, 라벨설정, 폰트설정, 범례설정 등이 가능합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 통계값 직접 입력 : 각 행정구역의 통계값을 사용자가 입력할 수 있습니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 엑셀을 활용하여 통계값 입력 : 행정구역의 통계값이 있는 엑셀을 이용하여 통계값을 설정할 수 있습니다.
				    <h2>&nbsp;&nbsp;&nbsp;- 보고서 출력 : 그래프, 차트 표출하고, 생성한 통계지도를 보고서로 출력합니다.</h2>
				    <br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/Ex_010_01.png" style="width:620px;" border=0 alt="화면구성"/>
					<h2>1) 지역단위 선택 : 시도, 시군구, 읍면동 등 활용하고자 하는 지역 단위를 선택합니다. (초기설정:시도)</h2>
					<h2>2) 입력방식 선택 및 데이터 조회방식 : 값 입력방식 및 입력한 값의 조회방식을 선택 할 수 있습니다. </h2>
					<h2>3) 통계값 입력 및 적용 : 체험하고자 하는 지역 단위에 대한 지역별 통계값을 입력하고 입력값을 적용 할 수 있습니다.  </h2>
					<h2>4) 지도창 : 선택하신 지역 단위에 통계값이 표현되는 지도창입니다. </h2>
					<h2>5) 데이터 보기 : 지역별 통계값의 데이터를 볼 수 있습니다.  </h2>
					<h2>6) 범례 : 지도창의 범례(구간 수, 색상, 지도라벨, 지도라벨 등)를 설정할 수 있습니다.</h2>
					<h2>7) 다운로드하기 및 출력하기 : 체험하신 자료에 대한 지도와 자료를 다운로드 할수 있거나 출력 할 수 있습니다.</h2>
						
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
