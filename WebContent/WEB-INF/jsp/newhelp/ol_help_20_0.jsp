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
						<li><a href="/view/newhelp/ol_help_20_0" class="on">현황비교</a></li>
						<li><a href="/view/newhelp/ol_help_30_0">추세분석</a></li>
						<li><a href="/view/newhelp/ol_help_40_0">복지시설</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>지역간 고령화 현황 비교</h1><br>
					<h2>○ 통계 데이터를 활용하여 시군구 단위의 지역간 현황비교서비스로서 노인인구수, 인구비율, 노령화지수,<br></h2>
					<h2>&nbsp;&nbsp;&nbsp;고령인구비율 등의 수치를 비교하여 해당 시군구의 타지역 대비 고령화 현황을 진단합니다.</h2>
					<br><br>
				  <h1>시나리오</h1><br>
					<h2>○ S시 공무원 L씨는 노인관련 복지서비스를 담당하고 있다.</h2>
					<h2>○ 최근 노인장기요양보험제도 실시로 인해 서비스 대상자와 공급주체를 지방자치단체와 지역 건강보험공단이<br></h2>
					<h2>&nbsp;&nbsp;&nbsp;선정하게 되어 향후 지역중심의 복지체계가 강조될 것을 예상하였다.</h2>
					<h2>○ 이에 L씨는 해당지역의 장단기적인 복지 수요를 파악하기 위해 노인 인구의 현황 및 추세파악이 선결 되어야 한다고 판단, </h2>
					<h2>&nbsp;&nbsp;&nbsp; 통계청에서 제공하고 있는 ‘지역간 고령화 현황 비교’ 서비스와 ‘고령화 추세분석’ 서비스를 이용하기로 하였다.</h2>
					<h2>○ L씨는 ‘지역간 고령화 현황 비교’ 서비스를 통해 S시가 다른 시에 비해 상대적으로 인구의 고령화 현상이 심각하다고 </h2> 
					<h2>&nbsp;&nbsp;&nbsp; 판단하여 S시의 노인 복지가 다른 시에 비해 뒤떨어 지지 않도록 복지예산을 시급히 늘려야 한다고 판단하였다.</h2>

				  <br><br>	
				  <h1>메뉴설명</h1><br>					
					<img src="/img/newhelp/Ol_010_02.png" style="width:600px;" alt="고령화현황 화면구성"/><br>
						<h2>○ 지역 선택(①)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 고령화 현황보기는 시/군/구 단위를 선택하여 결과를 볼 수 있습니다.</h2>
						<h2>○ 주제 선택(②)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 원하는 주제를 선택할 수 있습니다.</h2>
						<h2>○ 세부사항 선택(③)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 세분화된 주제 및 지도범위를 선택 할 수 있습니다. </h2>
						<h2>○ 보고서 출력(④)</h2>
						<h2>&nbsp;&nbsp;&nbsp;- 화면을 출력할 수 있습니다.</h2>


				  <br><br>	
				  <h1>결과화면</h1><br>	
					<img src="/img/newhelp/Ol_010_04.png" style="width:650px;" alt="고령화현황 화면구성"/>

					<h2>○ (①)번 선택된 주제도(노인인구,노인인구비율,노령화지수,고령인구비율)가 오른쪽 지도에 표시되고, 주제도 아래 분석</h2>
					<h2>&nbsp;&nbsp;&nbsp; 결과가 표시됩니다.</h2>
					<h2>○  (②)번에서는 선택한 시군구의 인접지역(경계가 맞닿아 있는 시군구), 해당 시군구가 포함된 시도의 시군구 또는<br></h2>
					<h2>&nbsp;&nbsp;&nbsp;시군구의 하위의 읍면동단위를 지도 표시영역으로 설정합니다.</h2>
					<h2>○  (③)번은 주제도의 색상, 범위, 단위를 표시합니다.</h2>
					<img src="/img/newhelp/Ol_010_05.png" style="width:650px;" alt="고령화현황 화면구성"/>
					<img src="/img/newhelp/Ol_010_06.png" style="width:650px;" alt="고령화현황 화면구성"/>


				  <br><br>	
					<h2>○ 대전광역시 서구를 대상으로 서비스를 실행한 결과입니다.</h2>
					<h2>○ (①) 그래프는 대전광역시의 구단위(동구, 서구, 유성구, 대덕구, 중구) 지역들과 인접지역들의 노인인구비율에 대한</h2>
					<h2>&nbsp;&nbsp;&nbsp;수치를 나타냅니다.</h2>
					<h2>○ 진단 내용은 노인 인구 비율이 높을수록 노인 인구가 많고, 노인 인구 비율이 적을수록 고령화가 진행되는 속도가</h2>
					<h2>&nbsp;&nbsp;&nbsp;늦을 수 있다는 뜻입니다.</h2>
					<h2>○ (②) 그래프는 대전광역시에 포함되는 지역들의 노령화 지수를 그래프로 나타냅니다.</h2>
					<h2>○ 지수는 낮을 수록 65세 이상 인구에 비해서 14-64세 인구가 많음을 의미합니다.</h2>
					<h2>○ (③)그래프는 대전광역시에 포함되는 지역들의 고령인구비율을 그래프로 나타냅니다.</h2>
					<h2>○ 65세 이상 인구 중에서 실제로 노인이라고 추정할 수 있는 나이인 85세 이상의 노인 인구 비율을 뜻하며, 수치는</h2>
					<h2>&nbsp;&nbsp;&nbsp;낮을수록 노인이 적다는 뜻입니다.</h2>
					<img src="/img/newhelp/Ol_010_07.png" style="width:660px;" alt="고령화현황 화면구성"/>



				  <br><br>	
					<h2>○ 고령자(60세 이상)에 대한 생활비원천에 대한 자료를 나타내며 전국,시도,시군구 자료를 비교 할 수 있는 표입니다.</h2>
					<img src="/img/newhelp/Ol_010_08.png" style="width:660px;" alt="고령화현황 화면구성"/>


					<h2>○ 고령자(60세 이상)가 거주하는 거처의 종류를 알아 볼 수 있는 자료를 나타내며 전국,시도,시군구 자료를 비교</h2>
					<h2>&nbsp;&nbsp;&nbsp; 할 수 있는 표입니다.</h2>
					<img src="/img/newhelp/Ol_010_09.png" style="width:660px;" alt="고령화현황 화면구성"/>

					<h2>○ (①) 국민기초일반수급자수의 결과를 전체인구와 65세이상 노인으로 나눠 비교한 자료로 노인 수급자 비율을</h2>
					<h2>&nbsp;&nbsp;&nbsp; 나타냅니다.</h2>
					<h2>○ (②) 노인수급자 비율을 시도별로 나타냅니다.</h2>
					<h2>○  (③) 노인수급자 비율을 전국과 시도 자료를 비교할 수 있습니다.</h2>


					<img src="/img/newhelp/Ol_010_10.png" style="width:650px;" alt="고령화현황 화면구성"/>

				  <br><br>	
					<h2>○ 노인들이 겪는 가장 어려운 문제를 전국과 시도 자료를 비교할 수 있습니다.</h2>
					<img src="/img/newhelp/Ol_010_11.png" style="width:650px;" alt="고령화현황 화면구성"/>

				  <br><br>	
					<h2 style="font-weight:bold">○ 사회 판단 기준</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 노인인구비율(65세이상인구/전체인구)이 각 년도를 기준으로 </h2>
					<h2 style="font-weight:bold">&nbsp;&nbsp;&nbsp;- 7%미만 이면 일반사회</h2>
					<h2 style="font-weight:bold">&nbsp;&nbsp;&nbsp;- 7%이상 14%미만이면 고령화사회</h2>
					<h2 style="font-weight:bold">&nbsp;&nbsp;&nbsp;- 14%이상 20%미만이면 고령사회</h2>
					<h2 style="font-weight:bold">&nbsp;&nbsp;&nbsp;- 20%이상이면 초고령화사회</h2>
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
