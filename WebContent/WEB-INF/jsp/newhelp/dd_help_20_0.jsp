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
				<div class="leftTitle">자료신청</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/dd_help_10_0">서비스 이용절차</a></li>
						<li><a href="/view/newhelp/dd_help_20_0" class="on">참고사항</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>제공자료에 대한 자세한 내용은 아래 문서 참조</h1>
					<h2><a href="/upload/census/2010_oa_statistics_guide.hwp" style="color:#0000FF">집계구별 통계자료 이용안내</a></h2>
					<h2><a href="/upload/census/2010_GIS_statistics_guid.zip" style="color:#0000FF">공간통계자료제공 안내</a></h2>
					<h2><a href="/upload/census/SOP_prj_utmk.zip" style="color:#0000FF">자료제공에서 사용되는 좌표계</a></h2>
					<h2><a href="/upload/census/adm_code.xls" style="color:#0000FF">SGIS 행정구역코드</a></h2>
					<h2><a href="/upload/census/db_schema.hwp" style="color:#0000FF">SGIS 통계지리정보서비스 DB Schema 다운로드</a></h2>
					<br><br>
				  <h1>참고사항</h1>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지리정보 기준시점 : 기준년도 12월31일</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지리정보 좌표계 : UTM-K(GRS80타원체)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 서비스 제한 기준 :  집계구별 5미만 통계값 서비스제외(총괄항목은 미적용)</h2>
					<br><br>
				  <h1>유의 사항</h1>
					<h2>○ SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업 등의 자료를 제외하고 최신 경계를</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다.아래 사항을 유의하여 SGIS 서비스를 이용하시기 바랍니다.</h2>
					<h2>○ 제외된 자료</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대, 전투경찰대, 의무소방대 등의 특별 조사구와 외국인</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사업체 센서스 : 개인운수업(사업장이 일정치 않음)</h2>
					<h2>○ 최신 경계 반영에 따른 차이</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- SGIS는 최신 행정구역 경계에 맞추어 서비스함에 따라 KOSIS 자료와 다를 수 있음</h2>
					<h2>○ 인구주택총조사 결합조건</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 결합조건은 인구(특별조사구와 외국인 제외), 가구(집단가구 제외), 주택(주택 이외의 거처 제외)의 세가지 조건을<br></h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;모두 충족하는 자료만 대상이므로 단독조건의 검색 결과와 다를 수 있습니다.</h2>
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
