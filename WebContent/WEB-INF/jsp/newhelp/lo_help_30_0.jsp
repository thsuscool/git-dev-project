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
				<div class="leftTitle">지방의 변화보기</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/lo_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/lo_help_20_0">서비스 이용방법</a></li>
						<li><a href="/view/newhelp/lo_help_30_0" class="on">통계항목 보기</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>통계항목 보기</h1>
					<h2>○ 15세 미만인구 = (15세미만인구 / 총인구) × 100</h2>
					<h2>○ 65세 이상인구 = (65세이상인구 / 총인구) × 100</h2>
					<h2>○ 20대 미혼자 = (20대미혼인구 / 20대인구) × 100</h2>
					<h2>○ 30대 미혼자 = (30대미혼인구 / 30대인구) × 100</h2>
					<h2>○ 1인 가구 = (1인가구 / 총가구) × 100</h2>
					<h2>○ 3세대이상 가구 = (3세대이상가구 / 총가구) × 100</h2>
					<h2>○ 화장실 공동사용가구 = (화장실공동이용가구 / 총가구) × 100</h2>
					<h2>○ 65세 이상 1인가구 = (65세이상1인인구 / 총가구) × 100</h2>
					<h2>○ 20대 출산율 = (20대모의연령출생아수 / 20대여자연앙인구) × 100</h2>
					<h2>○ 40대 출산율(천분율) = (40대모의연령출생아수 / 40대여자연앙인구) × 1000</h2>
					<h2>○ 교육수준(대졸 이상) = (25세이상인구중대학교졸업이상 / 25세이상인구) × 100</h2>
					<h2>○ 교육수준(대학원졸 이상) = (25세이상인구중대학원졸업이상 / 25세이상인구) × 100</h2>
					<h2>○ 여성 학력(대졸 이상) = (25세이상인구중대학교졸업이상 / 25세이상여성인구) × 100</h2>
					<h2>○ 재혼 구성비 = (남여1인재혼또는2인재혼 / 전체혼인건수) × 100</h2>
					<h2>○ 공동주택 = (공동주택수 / 총주택수) × 100</h2>
					<h2>○ 아파트 = (아파트수 / 총주택수) × 100</h2>
					<h2>○ 단독주택 = (단독주택수 / 총주택수) × 100</h2>
					<h2>○ 비거주용 건물내 주택 = (비거주용건물내주택수 / 총주택수) × 100</h2>
					<h2>○ 아파트 100㎡ 이상 = (100㎡ 이상아파트수 / 아파트수) × 100</h2>
					<h2>○ 아파트 165㎡ 이상(천분율) = (165㎡ 이상아파트수 / 아파트수) × 1000</h2>
					<h2>○ 단독주택 165㎡ 이상 = (165㎡ 이상단독주택수 / 단독주택수) × 100</h2>
					<h2>○ 소형주택 60㎡ 이하 = (60㎡ 이상주택수 / 단독주택수) × 100</h2>
					<h2>○ 통근통학 인구 = (통근통학인구 / 12세이상인구) × 100</h2>
					<h2>○ 통근통학시 승용차 = (승용차이용통근통학인구 / 통근통학인구) × 100</h2>
					<h2>○ 통근통학시 도보 = (도보이용통근통학인구 / 통근통학인구) × 100</h2>
					<h2>○ 통근통학시 대중교통= (대중교통이용통근통학인구/통근통학인구) × 100</h2>
					<h2>○ 자동차 보유 가구 = (자동차보유가구수 / 전체가구건수) × 100</h2>
					<h2>○ 자동차 2대 이상 보유 가구 = (자동차2대이상보유가구수 / 전체가구건수) × 100</h2>
					<h2>○ 종교 인구 = (종교인구 / 총인구) × 100</h2>
					<h2>○ 불교 인구 = (불교인구 / 종교인구) × 100</h2>
					<h2>○ 천주교 인구 = (천주교인구 / 종교인구) × 100</h2>
					<h2>○ 개신교 인구 = (개신교인구 / 종교인구) × 100</h2>
					<h2>○ 기타종교 인구 = (기타종교인구 / 종교인구) × 100</h2>
					<h2>○ PC방(천분율) = (PC방수 / 총사업체수) × 1000</h2>
					<h2>○ 편의점(천분율) = (편의점수 / 총사업체수) × 1000</h2>
					<h2>○ 보육업체(천분율) = (보육업체수 / 총사업체수) × 1000</h2>
					<h2>○ 학원(천분율) = (학원수 / 총사업체수) × 1000</h2>
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
