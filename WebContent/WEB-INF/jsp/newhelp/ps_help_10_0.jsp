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
				<div class="leftTitle">정책 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ps_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/ps_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/ps_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1><br>
					<h2>○ 정책통계지도는 인구, 가구, 주택, 사업체 등 주요 통계지표에 대해서 과거와 현재의 통계 변화를 보여주고,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 이를 통해 지역사회의 정책 결정에 도움을 주도록 하기 위한 서비스입니다.</h2>
					<h2>○ 주요기능</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 지역 및 지표 선택 : 통계조회를 위한 시도 또는 시군구 지역을 선택하고, 통계지표를 선택합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 통계변화 조회 : 선택한 지표에 대해서 과거와 현재의 통계정보를 지도, 그래프, 표 등의 형태로 비교하여 보여줍니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 융합 : 선택한 지표의 변화된 통계정보를 하나의 지도에 융합하여 보여줌으로써<br>
				    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 지역별 통계 변화를 한 눈에 알아볼 수 있습니다.</h2>
					<h2>○ 주요 통계지표</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 인구의 변화 (15종) : 남성/여성인구, 인구밀도, 노령화지수, 유아 인구, 고령자인구 등의 변화</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 가구 및 주택 변화 (13종) : 총 주택, 1인 가구, 65세 이상 1인 가구, 농가, 아파트 현황, 전월세주택 현황 등의 변화</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 사업체 변화 (10종) : 총 사업체, 도소매업, 제조업, , 농림어업, PC방, 치킨전문점, 커피전문점 등의 변화</h2>
					<br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/Ps_010_01.png"  style="width:700px;" alt="설명"/>
					<!-- mng_s 20180202_김건민 -->
					<h2>1) 통계항목 설정 : 통계항목과 상세조건을 설정합니다.</h2>
					<h2>2) 년도 설정 : 조회하고자 하는 년도를 설정합니다. </h2>
					<h2>3) 융합 : 새창에서 두 지도의 융합된 데이터정보를 조회합니다.</h2>
					<h2>4) 데이터보드  : 조회된 통계 데이터정보를 그래프형태로 제공합니다.</h2>			
					<h2>5) 범례창 : 표시된 통계값의 범례를 표시하며 범례설정 변경도 가능합니다.</h2>
					<!-- mng_e 20180202_김건민 -->
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
