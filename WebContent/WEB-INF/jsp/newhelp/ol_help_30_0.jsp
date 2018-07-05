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
				<div class="leftTitle">고령화 현황보기</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ol_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/ol_help_20_0">현황비교</a></li>
						<li><a href="/view/newhelp/ol_help_30_0" class="on">추세분석</a></li>
						<li><a href="/view/newhelp/ol_help_40_0">복지시설</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>고령화 추세 분석</h1><br>
 					<h2>○ 인구센서스 데이터를 이용한 2000년~2015년간의 과거 추세 분석 및 인구추계 데이터를 이용한 미래의 추세분석,<br></h2>
					<h2>&nbsp;&nbsp;&nbsp;도표 및 그래프를 이용하여 과거에서 현재, 미래의 고령화 추세를 시각적으로 보여주는 서비스입니다.</h2>
					<br><br>
				  <h1>시나리오</h1><br>
					<h2>○ L씨는 ‘고령화 추세분석’서비스를 통해 S시의 현 고령화 정도의 추세가 더욱 악화될 것이라는 사실을 인지하여 </h2>
					<h2>&nbsp;&nbsp;&nbsp;장기적인 관점에서의 S시 복지체계를 전반적으로 검토해야 할 필요성을 제기하였다.</h2>
					<h2>○ L씨는 ‘고령화 추세분석’ 서비스를 이용, S시의 고령화 추세와 S시 주변에 있는 M, N, K시의 고령화 추세를 비교한</h2>
					<h2>&nbsp;&nbsp;&nbsp; 리포트를 상부에 보고하여 S시의 노인복지의 중요성을 상부에 보고하였다.</h2>

				  <br><br>	
				  <h1>메뉴설명</h1><br>					
					<img src="/img/newhelp/Ol_010_02.png" style="width:600px;" alt="고령화현황 화면구성" /><br />
						<h2>○ 지역 선택(①)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 고령화 현황보기는 시/군/구 단위를 선택하여 결과를 볼 수 있습니다.</h2>
						<h2>○ 주제 선택(②)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 원하는 주제를 선택할 수 있습니다.</h2>
						<h2>○ 세부사항 선택(③)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 세분화된 주제 및 지도범위를 선택 할 수 있습니다. </h2>
						<h2>○ 보고서 출력(④)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 화면을 출력할 수 있습니다.</h2>


				  <br><br>	
				  <h1>결과화면(과거인구구조변화)</h1><br>	
					<img src="/img/newhelp/Ol_010_13.png" style="width:600px;" alt="고령화현황 화면구성"/>

					<h2>○ 2000년부터 2015년까지 과거의 인구구조 변화를 그래프와 표로 보실 수 있습니다</h2>

					<h2>○ 용어설명</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 인구구성비란? 0-14세, 15-64세, 65세 이상의 인구가 전체 인구중에 차지하는 비율을 말합니다. </h2>
					<h2>○  (③)번은 주제도의 색상, 범위, 단위를 표시합니다.</h2>
					<img src="/img/newhelp/Ol_010_14.png" style="width:610px;" alt="고령화현황 화면구성"/>

					<h2>2000년부터 2015년 까지의 노인 인구 구조와 노년부양비, 노령화 지수를 그래프로 나타내고, 노인인구구성비를</h2>
					<h2>대전광역시와 서구를 비교하여 그래프를 보실 수 있습니다.</h2>
					<br>
					<h2>○ 용어설명</h2>
					<h2 style="font-weight:bold">- 노년부양비(①)</h2>
					<h2>&nbsp;&nbsp;&nbsp;노년부양비=(65세이상인구)/(15~64세인구)*100, 생산능력(경제활동능력)이 없는 노년인구를</h2>
					<h2>&nbsp;&nbsp;&nbsp;생산가능인구가 부양해야 하는 경제적 부담을 나타내는 지표</h2>
					<h2 style="font-weight:bold">- 노령화지수(②)</h2>
					<h2>&nbsp;&nbsp;&nbsp;노령화지수=(65세이상인구)/(0~14세인구)*100,</h2>
					<h2>&nbsp;&nbsp;&nbsp;유소년인구(0~14세) 100명에 대한 고령인구(65세이상인구)의 비</h2>

					<!-- mng_s 20170811 웹접근성 조치 이경현-->
					<img src="/img/newhelp/Ol_010_15.png" style="width:700px;" alt="고령화현황 화면구성"/>
					<!-- mng_e 20170811 -->

					<h2>○ 서구의 5년간 인구 증가율을 왼쪽 그래프로 보여주며, 오른쪽 그래프는 노령인구 인구 증가와 유년인구의</h2>
					<h2>&nbsp;&nbsp;&nbsp;증가를 차트로 보여줍니다.</h2>
					<br>
					<h2>○ 용어설명</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 표준화 계산법 : 해당 변수의 평균과 표준편차를 이용하여 표준화 함</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Z(표준화된 값)=(변수값-변수들의 평균)/변수들의 표준편차</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ex) 서구의 5년간 평균 0-14세 미만 인구 증가율의 값이 4.61이라고 하고 평균이가 1.61 이라고 할때,</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;서구의 표준 편차가 3이라고 하면 서구의 표준화된 값은 다음과 같다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Z = (4.61-1.61)/3=1.00</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ex) 서구의 5년간 평균 65세 이상 인구 증가율의 값이 8.67이라고 하고 평균이가 6.91 이라고 할때,</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;서구의 표준 편차가 1.75이라고 하면 서구의 표준화된 값은 다음과 같다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Z = (8.67-6.91)/1.75=1.00</h2>

					<br>
					<h2>○ 표준화값 해석방법</h2>
					<h2>&nbsp;&nbsp;&nbsp;* 진단의 기준(자료의 평균을 기준으로)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-2표준편차이하:매우낮음</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-2표준편차~-1표준편차:다소낮음</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-1표준편차~+1표준편차:비슷</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+1표준편차~+2표준편차:다소높음</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+2표준편차이상:매우높음</h2>

					<br>
					<h2>○ 사회 판단 기준 - 노인인구비율(65세이상인구/전체인구)이 각 년도를 기준으로</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 7%미만 이면 일반사회</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 7%이상 14%미만이면 고령화사회</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 14%이상 20%미만이면 고령사회</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 20%이상이면 초고령화사회</h2>

					<h2>○ 결과화면(미래인구구조변화</h2>
					<img src="/img/newhelp/Ol_010_16.png" style="width:610px;" alt="고령화현황 화면구성"/>

					<h2>○ 2005년부터 2040년까지 미래의 고령화진행을 볼 수 있으며, 대전 광역시가 전국에서 노인인구 구성비가 어느</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;정도인지 또는 전국의 노인인구 구성비를 그래프로 파악할 수 있습니다.</h2>
					<h2>○ 용어설명</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 인구구성비란? 0-14세, 15-64세, 65세 이상의 인구가 전체 인구중에 차지하는 비율을 말합니다.</h2>
					<img src="/img/newhelp/Ol_010_17.png" style="width:550px;" alt="고령화현황 화면구성"/>

					<h2>○ 대전 광역시의 노년부양비(①), 노령화 지수(②)를 그래프로 나타내서 미래 고령화 진행상황을 파악할 수 있습니다.</h2>
					<h2>○ 용어설명</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 노년부양비(①)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;노년부양비=(65세이상인구)/(15~64세인구)*100</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;생산능력(경제활동능력)이 없는 노년인구를 생산가능인구가 부양해야 하는 경제적 부담을 나타내는 지표</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 노령화지수(②)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;노령화지수=(65세이상인구)/(0~14세인구)*100</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;유소년인구(0~14세) 100명에 대한 고령인구(65세이상인구)의 비</h2>
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
