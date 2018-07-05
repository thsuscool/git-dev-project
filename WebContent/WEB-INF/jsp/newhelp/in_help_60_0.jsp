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
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a></li>
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/in_help_60_0" class="on">ㆍ사례별 이용법 1</a></li>
								<li><a href="/view/newhelp/so_help_40_0">ㆍ사례별 이용법 2</a></li>	
							</ul>
						</li>	
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>사례 : 서울특별시 강남구의 65세이상 1인가구 통계를 알고 싶어요.</h1>
					<h2>1. 지역선택 : 지역선택 메뉴를 이용해 서울특별시 강남구로 이동합니다.</h2>
					<img src="/img/newhelp/interactiveMap/In_060_01_new.png" style="margin-left: 0px;" border=0 alt="지역선택"/>
					<h2>○ 통계조회를 위해 지도 레벨 설정 : 보고 싶은 통계(시도, 시군구, 읍면동, 집계구)의 상위단계 경계가 보이도록</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;지도 레벨을 조절합니다.</h2>
					<img src="/img/newhelp/In_060_02.png" style="margin-left: 0px;  width:300px; height:150px;" border=0 alt="지도 레벨 설정"/>
					<br><br>
					<h2>2. 통계선택 : 강남구 동별 65세 이상 인구 통계를 검색합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;① "인구" 버튼 선택 → ② "상세검색" 선택 → ③ 연령(65세~100세이상)설정 → ④ "검색조건 담기" 버튼 선택 →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑤ 강남구 경계 위로 통계버튼 끌어다 놓기 → ⑥ 강남구 동별 통계지도 표시 → ⑦ 강남구 동별 막대 그래프 확인 →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑧ 상위지역 대비 그래프 확인</h2>
					<img src="/img/newhelp/interactiveMap/In_060_03.png" style="margin-left: 0px;" border=0 alt="지도 레벨 설정"/>
					<br><br>
					<h2>○ 다음과 같은 결과가 나타납니다.</h2>
					<img src="/img/newhelp/interactiveMap/In_060_04_new.png" style="margin-left: 0px; width:700px; height:380px" border=0 alt="검색 결과"/>			
					<br><br>				
					<h2>3. 65세이상 인구 통계와 1인가구 통계를 비교합니다.</h2>
					<h2>○ 65세이상 인구가 많은 지역과 1인가구가 많은 지역을 두 개의 지도로 비교 가능합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;① "분할뷰" 버튼 선택 → ② "가구" 버튼 선택 → ③ "1인가구" 설정 → ④ "검색조건 담기" 버튼 선택 →</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;⑤ 강남구 경계 위로 통계버튼 끌어다 놓기 → ⑥ 범례 확인</h2>
					<h2>○ 결과 : 65세이상 인구가 가장 많은 지역은 압구정동이고, 1인가구가 가장 많은 지역은 역삼1동으로 나타납니다.</h2>
					<img src="/img/newhelp/interactiveMap/In_060_05_new.png" style="margin-left: 0px; width:700px; height:380px" border=0 alt="검색 결과"/>					
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
