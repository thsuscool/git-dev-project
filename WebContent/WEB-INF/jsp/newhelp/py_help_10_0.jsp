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
				<div class="leftTitle">움직이는 인구피라미드</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/py_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/py_help_20_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1>
					<h2>○ 움직이는 인구피라미드는 과거 인구에 대한 확정인구와 향후 인구변동(출생, 사망, 국제이동)을 고려하여<br></h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;작성된 장래추계 변화를 그래프로 보실 수 있습니다.</h2>

					<h2>○ 서비스 내용</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 1960~2065년 연도별, 전국 각세별 인구피라미드</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 1970~2045년 연도별, 전국 및 시도 5세별 인구피라미드</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 출생년도 및 현재년도 기준으로 인구 비율을 나타내어 생존율을 표시</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 시도 간 인구구조 변화를 비교할 수 있도록 전국과 시도의 인구 변화를 대비하여 보여줌</h2><br>
					<h2>○ 인구성장 가정</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 고위 가정 : 높은 정도의 출산율과 기대수명을 예상해 계산한 것입니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 저위 가정 : 낮은 정도의 인구성장을 예상해 계산한 것입니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 중위 가정 : 고위와 저위의 중간치를 예상해 계산한 것입니다.</h2><br>
				    <br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/Py_010_01.png" style="width:700px;" alt="움직이는 인구피라미드 화면구성"/>					
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 전국별 시도별 인구추계 피라미드를 선택합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 기준년도 및 출생년도를 선택하여 인구피라미드를 조회합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 슬라이더를 선택하여 인구피라미드를 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 해당 년도의 총인구수, 남녀인구수, 성비 및 평균 연령을 볼 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 연속보기 : 인구추계 정보를 연속적으로 조회합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;6) 인구추계 정보에 대하여 전년도와 다음년도의 정보를 조회할 수 있습니다.</h2>
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