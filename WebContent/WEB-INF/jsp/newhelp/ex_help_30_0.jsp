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
						<li><a href="/view/newhelp/ex_help_20_0">서비스 이용방법</a></li>
						<li><a href="/view/newhelp/ex_help_30_0" class="on">엑셀활용 방법</a></li>
						<li><a href="/view/newhelp/ex_help_40_0">출력 방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>통계값을 엑셀을 활용하여 불러오기</h1>
					<img src="/img/newhelp/Ex_030_01.png" style="width:670px;" alt="통계값을 엑셀을 활용하여 불러오기"/>
					<h2>1) 지역단위별 양식 내려받기 : 시도 양식, 시군구 양식, 읍면동 양식 중 하나를 선택합니다. </h2>                  
					<h2>2) 저장하기 : 저장하기를 선택하여 컴퓨터에 저장합니다.                      			</h2>
					
						
				</div>
				
				<br><br><br>
				
				<div class="contents">
				  <h1>엑셀에 통계값을 입력하기</h1>
					<img src="/img/newhelp/Ex_030_02.gif" style="width:300px;" alt="엑셀에 통계값을 입력하기"/>
					<h2>1) 엑셀에 통계값 입력 : 지역별로 통계값을 입력합니다.     </h2>
					<h2>※주의 : 입력할 값은 숫자이어야 합니다.        </h2>           
											
				</div>
				
				<br><br><br>
				
				<div class="contents">
				  <h1>엑셀자료를 불러오기</h1>
					<img src="/img/newhelp/Ex_030_03.png" style="border-width:1px; margin-left: 0px; width:670px; height:400px" border=0 alt="지도화면 설정하기"/>
					<h2>1) 엑셀 불러오기 : 파일선택 버튼을 눌러 엑셀을 불러옵니다. 값들이 지역별 통계값이 입력됩니다.</h2>
					<h2>※주의 : 통계지도체험에서 다운받은 파일이어야 합니다.</h2>
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
