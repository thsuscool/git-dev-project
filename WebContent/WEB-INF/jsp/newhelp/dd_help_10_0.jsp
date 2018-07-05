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
						<li><a href="/view/newhelp/dd_help_10_0" class="on">서비스 이용절차</a></li>
						<li><a href="/view/newhelp/dd_help_20_0">참고사항</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>자료신청</h1>
					<h2>○ 센서스 공간통계 자료를 제공하는 서비스입니다.</h2>
					<h2>○ 통계청에서 자체 생산한 통계지리정보자료를 정부기관 및 민간에서 활용하여 더 큰 부가가치를 창출할 수</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;있도록 자료를 제공하는 것으로 현재 센서스 공간통계 자료를 파일형태로 서비스하고 있습니다. </h2>
					<br><br>
				  <h1>서비스 목적</h1>
					<h2>○ 통계청에서 자체 구축한 통계지리정보의 공동 활용을 통한 국가 경쟁력 강화</h2>
					<br><br>
				  <h1>자료제공 절차</h1>
					<img src="/img/newhelp/Us_020_01.png"  style="width:700px;" alt="자료신청"/>
					<br>
				  <h1>자료 신청방법</h1> <!-- 2016.03.18 수정, 자료제공 신청방법->자료신청 방법  -->
					<h2><a href="http://sgis.kostat.go.kr/contents/include/download.jsp?filename=sgis_data_request_guide.hwp&path=/board/"> [다운로드]</a></h2> 
					<h2>문의사항연락처: ☏042-481-2438, parkkb@korea.kr</h2>
					<h2><a href="/contents/shortcut/shortcut_05_02.jsp"><img src="/img/newhelp/Dd_blue.png" style="margin-left: 0px; width:238px; height:25px" border=0 alt="자료신청 바로가기"></a></h2>
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
