<!-- 2017.11.15 [개발팀] 리뉴얼관계로 도움말 수정-->
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
						<li><a href="/view/newhelp/ps_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/ps_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/ps_help_30_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/ps_help_30_0" class="on">ㆍ수요변화형지표</a></li>
								<li><a href="/view/newhelp/ps_help_30_1">ㆍ통계연산형지표</a></li>
								<li><a href="/view/newhelp/ps_help_30_2">ㆍ시설분석형지표</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>수요변화형지표</h1>
					<h2>○ 17개 주요 지역별 수요변화에 대한 다양한 통계정보를 조회하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;-수요변화지표를 선택하면, 해당 데이터를 지도에서 조회하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;-년도선택을 통해 다양한 년도의 시계열통계정보를 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;-데이터보드 버튼을 클릭하시면, 데이터보드에서 상세정보를 조회하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;-지도상의 융합버튼을 클릭하시면, 기준/추가 데이터와 융합데이터를 조회하실 수 있습니다.</h2>
					<!-- <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※ 정책: 기술혁신(4종), 지식집약(3종)</h2> -->
					<img src="/img/newhelp/Ps_030_01.png" width=600 height=auto border=0 alt="수요변화형지표"/>
					<h2 style="margin-left: 300px;">[수요변화형지표]</h2><br>
					<h2>1) 년도 설정 : 조회하고자 하는 년도를 설정합니다.(수요변화형지표일 경우)</h2>
					<h2>2) 데이터보드  : 조회된 통계 데이터정보를 그래프형태로 제공합니다.</h2>
					<h2>3) 융합 : 표출된 두 지도의 융합된 데이터정보를 조회합니다.</h2>
					<h2>4) 지도이동이벤트설정 : 왼쪽,오른쪽 지도의 동시 이동설정을 on/off 합니다.</h2>
					<h2>5) 경계레벨설정 : 현재 선택한 지역을 기준으로 최대 2레벨까지 통계조회를 할 수 있습니다.(통계청 등록일 경우)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;(통계청이 등록한 정책통계지도의 경우)</h2>
					<br><br>
					<img src="/img/newhelp/Ps_030_04.png" width=600 height=auto border=0 alt="수요변화형지표-데이터보드"/>
					<h2 style="margin-left: 300px;">[수요변화형지표 - 데이터보드]</h2><br>
					<h2>6) 통계상세정보 : 표출된 통계의 기본정보 및 그래프,표정보를 제공합니다.</h2>	
					<br><br>
					<img src="/img/newhelp/Ps_030_02.png" width=600 height=auto border=0 alt="통계연산형지표-융합결과"/>
					<h2 style="margin-left: 300px;">[수요변화지표 - 융합결과]</h2><br>	
					<h2>7) 융합통계 : 기준/추가 데이터의 융합정보를 제공합니다.</h2>	
					<h2>8) 융합상세정보 : 융합된 통계의 상세정보(정책내용, 그래프, 표 등)를 제공합니다.</h2>	
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
