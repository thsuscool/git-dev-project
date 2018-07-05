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
						<li><a href="/view/newhelp/house_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/house_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/house_help_30_0" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/house_help_30_0">ㆍ추천지역 찾기</a></li>
								<li><a href="/view/newhelp/house_help_30_1" class="on">ㆍ주거현황 보기</a></li>
								<li><a href="/view/newhelp/house_help_30_3">ㆍ간편동네 찾기</a></li>
								<li><a href="/view/newhelp/house_help_30_2">ㆍ지표내용</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1 style="float: left;">주거현황 보기 </h1><img src="/img/newhelp/img_house_4_00.png" style="width:90px;margin-top: 0px;" alt="주거현황 보기" />
					<h2 class="Type_3">1) 지역 선택과 지표 선택 : 원하는 조회방법을 선택합니다.</h2>
					<ul class="Cont_List">
						<li>
							지역 선택과 지표 선택을 죄상단의 체크박스를  ON/OFF 할수 있습니다.
							<ul>
								<li>
									지역만 선택 시 : 해당 지역의 종합 정보를 지도와 우측의 데이터보드에서 보실 수 있습니다.<br>
									(추천지역 찾기의 “추천지역 정보 조회” 기능과 동일한 기능입니다.)
								</li>
								<li>지표만 선택 시 : 전국에서 지표(35종) 별로 통계를 조회하실 수 있습니다.</li>
								<li>지표와 지역 둘 다 선택 시 : 해당 지역에서 지표(35종) 별로 통계를 조회할 수 있습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_4_02.png" style="margin-left: 0px;" alt="지역 선택 과 지표 선택">
						<figcaption>[지역 선택과 지표 선택]</figcaption>
					</figure>

					<h2 class="Type_3">2) 지역별 종합정보 조회 : 선택한 지역의 다양한 정보를 보실 수 있습니다.</h2>
					<ul class="Cont_List">
						<li>좌상단의 체크박스를 지역만 선택하면 해당 지역의 종합 정보를 보실 수 있습니다.
							<ul>
								<li>주거지로 관심 있는 지역을 바로 조회하여 보실 수 있습니다.</li>
								<li>추천지역 찾기의 “추천지역 정보 조회”와 동일한 내용을 조회하실 수 있습니다.</li>
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_4_03.png" style="margin-left: 0px;" alt="지역 별 종합정보 조회 – 지역 선택">
						<figcaption>[지역 별 종합정보 조회 – 지역 선택]</figcaption>
					</figure>
					<figure>
						<img src="/img/newhelp/img_house_4_04.png" style="margin-left: 0px;" alt="지역 별 종합정보 조회 – 지표 정보 조회">
						<figcaption>[지역 별 종합정보 조회 – 지표 정보 조회]</figcaption>
					</figure>
					<h2 class="Type_3">3) 지표별 주거현황보기  : 선택한 지표에 대한 정보를 보실 수 있습니다.</h2>
					<ul class="Cont_List">
						<li>좌상단의 체크박스에서 지표를 선택하면 해당 지표의 색상지도를 전국으로 조회하여 보실수 있습니다.
							<ul>
								<li>전국 색상지도에서 시도를 경계를 클릭하면 해당 시도의 시군구 경계별로 지표를 색상지도로 볼 수 있습니다.</li>
<!-- 								<li>시군구별 지표의 색상지도를 전국으로 볼려면 <img src="/img/newhelp/img_house_4_06.png" style="width:24px; vertical-align: middle; margin: -5px 0 0 0;">버튼을 클릭하면 된다.</li> -->
							</ul>
						</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_house_4_05.png" style="margin-left: 0px;" alt="">
						<figcaption>[지표별 주거현황보기]</figcaption>
					</figure>
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