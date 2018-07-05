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
				<div class="leftTitle">정책통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/policy_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/policy_help_20_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>서비스 개요</h1>
					<ul class="Cont_List">
						<li>정책통계지도는 SGIS+의 활용 사례로, 통계청이 보유한 인구, 가구, 주택, 사업체 등의 센서스 통계와 지자체 및 중앙부처 데이터와 융합하여 인구대비 시설 등의 다양한 정책통계지도를 작성하여 대국민에게 공개 및 홍보하는 서비스 입니다. </li>
						<li>이용자는 지역별 수요변화, 지역별 정책통계지도를 통하여 지자체 및 중앙부처에서 공개한 정책통계지도를 조회하여 볼수 있으며, 지자체 및 중앙부처가 수행하는 도시계획을 홍보 및 의견수렴의 채널로 활용할 수 있습니다.</li>
						<li>주요기능
							<ul>
								<li>지역별 수요변화 : 지역별 수요변화는 통계청이 보유한 센서스 통계를 이용하여 정책의사결정에 참고할 통계를 시계열로 제공하며 인구의 변화, 가구 및 주택의 변화, 사업체 변화의 주요지표를 제공함</li>
								<li>지역별 정책지도 : 지자체 및 중앙부처에서 시정 및 국정 등의 홍보를 위하여 작성된 정책통계지도를 조회할수 있으며, 통계청이 보유한 센서스 데이터와 지자체 및 중앙부처가 보유한 데이터를 융합하여 정책통계지도를 작성할수 있으며, 버퍼분석형 정책통계 지도 만들기, 연산형 정책통계지도 만들기 기능을 제공하며, 로그인한 사용자만 정책통계지도를 작성할 수 있습니다.</li>
							</ul>
						</li>
					</ul>

					<h1>화면 구성</h1>
					<ol>
						<li>처음페이지 > 활용서비스 > 정책통계지도</li>
					</ol>
					<img src="/img/newhelp/img_policy_1_01.png" style="margin-left: 0px;" alt="정책통계지도 화면구성">
					<ol>
						<li>1) 지역설정 : 해당지역으로 지도창이 이동합니다.</li>
						<li>2) 부가기능 : 초기화, 정책통계지도 작성 기능을 제공합니다.</li>
						<li>3) 주요기능 : 지역별 수요변화, 지역별 정책지도 기능을 제공합니다.</li>
						<li>4) 데이터 보드 : 조회된 통계 데이터정보를 그래프 등의 형태로 제공합니다.</li>
						<li>5) 융합 : 기준데이터와 추가데이터를 융합하여 보여줍니다.</li>
						<li>6) 범례창 : 표시된 통계값의 범례를 표시하며, 범례설정 변경도 가능합니다.</li>
					</ol>
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