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
						<li><a href="/view/newhelp/in_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/in_help_50_0"  class="on">ㆍ인구통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_1">ㆍ가구통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_2">ㆍ주택통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_6">ㆍ결합통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_3">ㆍ농림어가통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_4">ㆍ사업체통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_5">ㆍKOSIS(지역통계)</a></li>
								<li><a href="/view/newhelp/in_help_50_7">ㆍ나의 데이터</a></li>
							</ul>
						</li>							
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>인구통계 조회</h1>
					<h2>○ 총인구, 평균나이, 인구밀도 등 인구총괄 검색조건 설정 및 해당 통계조회가 가능하고, 성별, 나이, </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;교육정도, 혼인상태 등의 세부검색조건을 설정해서 인구통계를 조회할 수 있습니다.</h2>
					<h2>○ 검색조건을 설정하고, 인구조건 버튼생성을 클릭하면 해당 검색조건의 통계버튼이 생성됩니다.</h2>
					<img src="/img/newhelp/In_050_1_new.png" style="margin-left: 60px; width:561px;" alt="검색조건 설정"/>	
					<h2 style="margin-left: 250px;">[검색조건 설정]</h2><br>
					<h2>○ 생성된 통계버튼을 더블클릭하거나, 지도화면의 임의의 행정구역에 드래그앤드롭 하면 선택된 행정구역의 세부행정구역</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;단위로 인구통계정보가 생성되어 지도화면에 표출됩니다.</h2>
					<h2>○ 지도화면에는 세부행정구역 단위로 통계 값이 계산되고 해당 범례 값에 따라 색상이 구분되어 표출됩니다.</h2>
					<h2>○ 지도화면 우측에는 데이터 시각화창을 표출할 수 있는데, 통계 요약데이터 및 상세데이터창이 표출됩니다.</h2>
					<h2>○ 좌측 아래쪽에는 범례창이 표출됩니다.</h2>
					<img src="/img/newhelp/In_050_2_new.png" style="margin-left: 0px; width:700px; height:400px" border=0 alt="상세정보 표시"/>
					<h2 style="margin-left: 300px;">[상세정보 표시]</h2><br>
					<h2>○ 요약데이터창에는 선택된 통계조건에 대해서 해당 행정구역의 상대적 통계정보가 선택된 행정구역의</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;레벨에 맞게 표출됩니다.</h2>
					<h2>○ 선택된 행정구역의 해당 시군구 내의 통계비율, 해당 시군구의 시도 내의 통계비율, 해당 시도의</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;전국 내에서 통계비율이 원형그래프형태로 시각화되어 표출됩니다.</h2>
					<h2>○ 상세데이터창에서는 해당 행정구역의 세부 행정구역단위로 통계값 계산 후 막대그래프 형태로 시각화되어 표출됩니다.</h2>
					<img src="/img/newhelp/In_050_3_new.png" style="margin-left: 50px; width:600px;" alt="상세정보 그래프"/>
					<h2 style="margin-left: 300px;">[상세정보 그래프]</h2>
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
