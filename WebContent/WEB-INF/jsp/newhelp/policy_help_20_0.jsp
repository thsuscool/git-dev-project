<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" />
	<link rel="stylesheet" type="text/css" href="./css/common.css" />
	<link rel="stylesheet" type="text/css" href="./css/help.css" />
	<link rel="stylesheet" type="text/css" href="./css/help_plus.css" />
	<title>SGIS 플러스 도움말</title>
</head>

<body>
	<div class="wrapper">
		<!--header start-->
		<script type="text/javascript" src="./js/helpHeader.js"></script>
		<!--header end-->
		<div class="container">
			<!--leftmenu-->
			<div class="leftWrap">
				<div class="leftTitle">정책통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="Policy_help_10_0.html">서비스 개요</a></li>
						<li><a href="Policy_help_20_0.html" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="Policy_help_20_0.html" class="on">ㆍ지역별 수요변화</a></li>
								<li><a href="Policy_help_20_1.html">ㆍ지역별 정책지도</a></li>
								<li><a href="Policy_help_20_2.html">ㆍ정책통계지도 작성</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1 style="float: left;">지역별 수요변화 </h1><img src="./img/img_policy_3_00.png" style="width:90px;margin-top: 0px;">
					<h2 class="Type_3">1) 대상 지역 및 지표 선택 : 대상지역 및 지역별 수요변화 보기 지표를 선택한다.</h2>
					<ul class="Cont_List">
						<li>대상지역을 시도 및 시군구까지 선택한다.</li>
						<li>지역별 수요변화를 볼 지표를 선택한다.</li>
						<li>[수요변화보기] 버튼을 클릭한다.</li>
					</ul>
					<figure>
						<img src="./img/img_policy_2_01.png" style="margin-left: 0px;" alt="대상 지역 및 지표 선택">
						<figcaption>[대상 지역 및 지표 선택]</figcaption>
					</figure>
					
					<h2 class="Type_3">2) 기준데이터 및 추가 데이터의 년도를 선택하고 [융합버튼]을 클릭한다. </h2>
					<ul class="Cont_List">
						<li>기본적으로 해당 지표의 최초년도, 최종년도 데이터를 왼쪽, 오른쪽 지도창에 보여준다.</li>
						<li>기준데이터와 추가데이터의 년도를 선택하여 변경하면 해당년도의 지표의 색상지도가 보여준다.</li>
						<li>[융합]버튼을 클릭한다. </li>
					</ul>
					<figure>
						<img src="./img/img_policy_2_02.png" style="margin-left: 0px;" alt="">
						<figcaption>[융합 선택]</figcaption>
					</figure>

					<h2 class="Type_3">3) 융합결과 및 기준/추가 데이터, 융합데이터를 조회하여 준다. </h2>
					<ul class="Cont_List">
						<li>해당 지표의 최종년도-최초년도의 증감결과를 융합결과로 보여준다.</li>
						<li>범례설정에서 색상지도를 버블이나 열지로 변경할수 있다.</li>
						<li>기준/추가 데이터, 융합데이터 조회하여 볼수 있다.</li>
					</ul>
					<figure>
						<img src="./img/img_policy_2_03.png" style="margin-left: 0px;" alt="융합 결과">
						<figcaption>[융합 결과]</figcaption>
					</figure>
					
					<h2 class="Type_3">4) 융합데이터에서 증감률을 선택한다.</h2>
					<ul class="Cont_List">
						<li>융합데이터를 선택한다.</li>
						<li>증감률을 선택한다.</li>
						<li>증감률 융합데이터를 챠르로 보여주고 지도창에 증감율 색상지도를 보여준다.</li>
					</ul>
					<figure>
						<img src="./img/img_policy_2_04.png" style="margin-left: 0px;" alt="증감률 선택">
						<figcaption>[증감률 선택]</figcaption>
					</figure>
				</div>
			</div>
			<!--contentsWrap-->
		</div>
		<!--container-->
		<!--footer-->
		<div class="footerWrap">
			<div class="footer">
				<img src="./img/footer.png" alt="footer"/>
			</div>
		</div>
		<!--footer-->
	</div>
	<!--wrapper-->
</body>

</html>