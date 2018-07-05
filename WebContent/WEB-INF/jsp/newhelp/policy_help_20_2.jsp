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
						<li><a href="/view/newhelp/policy_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/policy_help_20_0" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/policy_help_20_0">ㆍ지역별 수요변화</a></li>
								<li><a href="/view/newhelp/policy_help_20_1">ㆍ지역별 정책지도</a></li>
								<li><a href="/view/newhelp/policy_help_20_2" class="on">ㆍ정책통계지도 작성</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1 style="float: left;">정책통계지도 작성 </h1>
<!-- 					<img src="/img/newhelp/img_policy_3_00.png" style="width:90px;margin-top: 0px;"> -->
					<h2 class="Type_3">1) 정책통계지도 작성 : 사용자 로그인후 정책통계지도를 작성한다.</h2>
					<ul class="Cont_List">
						<li>사용자 로그인을 수행한다.</li>
						<li>[정책통계지도 작성]버튼을 클릭한다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_07.png" style="margin-left: 0px;" alt="정책통계지도 작성">
						<figcaption>[정책통계지도 작성]</figcaption>
					</figure>
					
					<h2 class="Type_3">2) 정책통계지도 유형선택</h2>
					<ul class="Cont_List">
						<li>버퍼분석형 정책통계지도 만들기, 연산형 정책통계지도 만들기 중 하나를 선택한다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_08.png" style="margin-left: 0px;" alt="정책통계지도 유형선택">
						<figcaption>[정책통계지도 유형선택]</figcaption>
					</figure>

					<h2 class="Type_3">3) 버퍼분석형 정책통계지도 만들기</h2>
					<ul class="Cont_List">
						<li>지역을 선택한다.</li>
						<li>기준 데이터를 선택한다. 예) 총조사 주요지표 중 총인구를 선택</li>
						<li>[통계보기]버튼을 클릭하면 [기준데이터]창에 선택한 지표의 색상지도가 보여준다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_09.png" style="margin-left: 0px;" alt="버퍼분석형 정책통계지도 만들기">
						<figcaption>[버퍼분석형 정책통계지도 만들기]</figcaption>
					</figure>
					
					<h2 class="Type_3">4) 추가 데이터 선택</h2>
					<ul class="Cont_List">
						<li>추가 데이터를 선택한다. 예) 산업분류코드에서 초등교육기관을 선택함 </li>
						<li>선택한 지표의 위치정보가 [추가 데이터]창에 표시된다.</li>
						<li>[버퍼설정]버튼을 클릭하고 버퍼거리를 입력한후 [적용]버튼을 클릭한다.</li>
						<li>[융합]버튼을 클릭하면 기준 데이터와 추가 데이터의 융합결과가 팝업창으로 보여준다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_10.png" style="margin-left: 0px;" alt="추가 데이터 선택">
							<figcaption>[추가 데이터 선택]</figcaption>
					</figure>
					
					<h2 class="Type_3">5) 융합결과 조회</h2>
					<ul class="Cont_List">
						<li>융합데이터를 지도창에 보여준다.</li>
						<li>[기준 데이터 보드]와 [추가 데이터 보드]탭을 클릭하면 기준 데이터 및 추가 데이터를 조회하여 보여준다.</li>
						<li>[정책통계지도 바로 작성]버튼을 클릭한다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_11.png" style="margin-left: 0px;" alt="융합결과 조회">
						<figcaption>[융합결과 조회]</figcaption>
					</figure>

					<h2 class="Type_3">6) 정책통계지도 작성 완료 </h2>
					<ul class="Cont_List">
						<li>정책통계지도의 제목, 내용, URL 등을 입력한다. </li>
						<li>[작성완료]버튼을 클릭한다.</li>
					</ul>
					<figure>
						<img src="/img/newhelp/img_policy_2_12.png" style="margin-left: 0px;" alt="정책통계지도 작성 완료 ">
						<figcaption>[정책통계지도 작성 완료]</figcaption>
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