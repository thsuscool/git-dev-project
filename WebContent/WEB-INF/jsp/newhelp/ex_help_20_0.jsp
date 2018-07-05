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
				<div class="leftTitle">통계지도 체험</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ex_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/ex_help_20_0" class="on">서비스 이용방법</a></li>
						<li><a href="/view/newhelp/ex_help_30_0">엑셀활용 방법</a></li>
						<li><a href="/view/newhelp/ex_help_40_0">출력 방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>통계지도 체험의 구성</h1>
					<img src="/img/newhelp/Ex_020_01.png" style="width:670px;" alt="통계지도 체험의 구성"/>
					<h2>1) 지역단위 설정 : 체험하고자 하는 지역단위(시도, 시군구, 읍면동)를 설정할 수 있습니다.</h2>
					<h2>2) 직접입력 : 선택하신 지역단위에 각각의 값을 입력하여 설정할 수 있습니다.           	</h2>	
					<h2>3) 지도설정 : 입력하신 값을 지도상에 표시할때 표시하는 방법을 설정할 수 있습니다.       </h2>
					<h2>4) 자료다운로드 및 출력하기 : 체험하신 통계지도 결과를 다운로드 하거나 출력 할 수 있습니다.   </h2>
						
				</div>
				
				<br><br><br>
				
				<div class="contents">
				  <h1>지도화면 설정하기</h1>
					<img src="/img/newhelp/Ex_020_02.png" style="width:670px;" alt="지도화면 설정하기"/>
					<h2>1) 지역단위 선택 : 시도, 시군구, 읍면동 등 지역단위를 선택합니다. 지도 표시가 바뀝니다.</h2>
					<h2>2) 범례설정 : 지도상에 표시되는 범례를 수정할 수 있습니다.</h2>                  
											
				</div>
				
				<br><br><br>
				
				<div class="contents">
				  <h1>통계값 입력하기</h1>
					<img src="/img/newhelp/Ex_020_03.png" style="width:670px;" alt="지도화면 설정하기"/>
					<h2>1) 통계값 입력 : 통계로 표시하고자 하는 정보를 빈 란에 입력합니다.</h2>
					<h2>2) 지도에 적용하기 : 통계값을 모두 입력한 후에 적용 버튼을 누르면 통계지도에 반영됩니다.</h2>
											
				</div>
				
				<br><br><br>
				
				<div class="contents">
				  <h1>통계값을 막대/원 그래프로 보기</h1>
					<img src="/img/newhelp/Ex_020_04.png" style="width:690px;" alt="지도화면 설정하기"/>
					<h2>1) 막대/원 그래프 : 막대나 원 그래프로 볼 수 있습니다.</h2>
					<h2>※ 그래프를 조회하면 스크롤바가 생기며 지도창 밑에 생성됩니다.</h2>
											
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
