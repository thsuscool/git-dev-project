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
				<div class="leftTitle">움직이는 인구피라미드</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/py_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/py_help_20_0" class="on">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 용어설명 및 이용방법</h1>
					<h2>○ 피라미드 그래프</h2>
					<h2 style="margin-left:35px">
						<table border='1' width="600" bordercolor="#A09D9D" summary="피라미드 그래프">
						  <colgroup>
							<col width=100px/>
							<col width=500px/>
						  </colgroup>
						  <thead>
							<tr height="30" bgcolor="#dadada">
							<th scope="col">아이콘</th>
							<th scope="col">설명</th>
						 </thead>
						  <tr>
							   <td height="30" style="text-align:center"><img src="/img/newhelp/Py_020_01.gif"  style="margin-top:0px; margin-left:-7px; width:56px; height:28px" alt="1960~2050년도까지의 전국 인구 추계를 나타낸 그래프" /></td>
							   <td>1960~2065년도까지의 전국 인구 추계를 나타낸 그래프 입니다.</td>
						  </tr>
						  <tr>
							   <td height="30" style="text-align:center"><img src="/img/newhelp/Py_020_02.gif"  style="margin-top:0px; margin-left:-7px; width:56px; height:31px" alt="클릭시 1년 단위로 그래프 추이를 볼 수 있는 버튼" /></td>
							   <td>클릭시 1년 단위로 그래프 추이를 볼 수 있는 버튼</td>
						  </tr>
					   </table>
					</h2>
					<br><br>
					<h2>○ 연속보기</h2>
					<h2 style="margin-left:35px">
						<table border='1' width="600" bordercolor="#A09D9D" summary="연속보기">
						  <colgroup>
							<col width=100px/>
							<col width=500px/>
						  </colgroup>
						  <thead>
							<tr height="30" bgcolor="#dadada">
							<th scope="col">아이콘</th>
							<th scope="col">설명</th>
						 </thead>
<!-- 						  <tr> -->
<!-- 							   <td height="50" style="text-align:center"><img src="./img/Py_020_03.gif"  style="margin-top:0px; margin-left:-7px; width:53px; height:32px" alt="1960~2050년도까지의 전국 인구 추계를 나타낸 그래프" /></td> -->
<!-- 							   <td>자신의 출생연도를 리스트 박스에서 선택하고 옆에 입력 버튼을 클릭하여 선택하면 밑에<br> -->
<!-- 							   &nbsp;&nbsp;플레이 bar위에 자신의 출생년도 위치에 표기 됩니다.</td> -->
<!-- 						  </tr> -->
						  <tr>
							   <td height="50" style="text-align:center"><img src="/img/newhelp/Py_020_04.jpg"  style="margin-top:-7px; margin-left:0px; width:41px; height:22px" alt="클릭시 1년 단위로 그래프 추이를 볼 수 있는 버튼" /></td>
							   <td>클릭시 전국 인구추계 피라미드 그래프가 1년씩 증감하면서 자동으로 변화합니다.</td>
						  </tr>
						  <tr>
							   <td height="50" style="text-align:center"><img src="/img/newhelp/Py_020_05.jpg"  style="margin-top:-7px; margin-left:0px; width:40px; height:21px" alt="1960~2050년도까지의 전국 인구 추계를 나타낸 그래프" /></td>
							   <td>클릭시 위 전국 인구추계 피라미드 그래프가 2배 속도로 1년씩 증감하면서 자동으로<br>
							   &nbsp;&nbsp;변화합니다.</td>
						  </tr>
<!-- 						  <tr> -->
<!-- 							   <td height="50" style="text-align:center"><img src="./img/Py_020_06.gif"  style="margin-top:-7px; margin-left:0px; width:53px; height:32px" alt="클릭시 1년 단위로 그래프 추이를 볼 수 있는 버튼" /></td> -->
<!-- 							   <td>클릭 드래그를 하면 원하는 년도 그래프를 볼수 있습니다.</td> -->
<!-- 						  </tr> -->
<!-- 						  <tr> -->
<!-- 							   <td height="50" style="text-align:center"><img src="./img/Py_020_07.gif"  style="margin-top:-7px; margin-left:0px; width:53px; height:32px" alt="1960~2050년도까지의 전국 인구 추계를 나타낸 그래프" /></td> -->
<!-- 							   <td>위에 입력받은 자신의 출생년도 위치를 표시, 클릭시 자신의 출생년도에 해당되는<br> -->
<!-- 							   &nbsp;&nbsp;그래프를 볼 수 있습니다.</td> -->
<!-- 						  </tr> -->
<!-- 						  <tr> -->
<!-- 							   <td height="50"  style="text-align:center"><img src="./img/Py_020_08.gif"  style="margin-top:0px; margin-left:-7px; width:42px; height:17px" alt="클릭시 1년 단위로 그래프 추이를 볼 수 있는 버튼" /></td> -->
<!-- 							   <td>클릭시 올해년도 인구 그래프를 볼 수 있습니다.</td> -->
<!-- 						  </tr> -->
					   </table>
					</h2>
					<br><br>
<!-- 					<h2>○ 출생기준 비율 </h2> -->
<!-- 					<h2 style="margin-left:35px"> -->
<!-- 						<table border='1' width="600" bordercolor="#A09D9D"> -->
<!-- 						  <colgroup> -->
<!-- 							<col width=100px/> -->
<!-- 							<col width=500px/> -->
<!-- 						  </colgroup> -->
<!-- 						  <thead> -->
<!-- 							<tr height="30" bgcolor="#dadada"> -->
<!-- 							<th scope="col">기준</th> -->
<!-- 							<th scope="col">설명</th> -->
<!-- 						 </thead> -->
<!-- 						  <tr> -->
<!-- 							   <td height="50" style="text-align:center">성비</td> -->
<!-- 							   <td>인구구조를 크게 남녀별로 구분하는 지료로 여자 100명당 남자수를 의미하는 것입니다.</td> -->
<!-- 						  </tr> -->
<!-- 						  <tr> -->
<!-- 							   <td height="50" style="text-align:center">출생년도기준</td> -->
<!-- 							   <td>사용자가 선택한 출생년도의 해당나이 인구를 100%로 보고 이후 년도부터의 생존률을<br> -->
<!-- 							    &nbsp;&nbsp;계산한 것입니다.</td> -->
<!-- 						  </tr> -->
<!-- 						  <tr> -->
<!-- 							   <td height="100" style="text-align:center">올해년도 기준</td> -->
<!-- 							   <td>사용자 올해 나이 인구를 100%로 보고 이후 년도부터의 생존률을 계산<br> -->
<!-- 							   &nbsp;&nbsp;사용자 올해 나이 인구를 100%로 보고 이후 년도부터의 생존률을 계산<br>  -->
<!-- 							   &nbsp;&nbsp;예) 사용자의 출생년도가 1981년일경우<br> -->
<!-- 							   &nbsp;&nbsp;&nbsp;&nbsp;- 출생년도 기준 : 1981년 0세 인구를 100%기준으로 생존률을 계산<br> -->
<!-- 							   &nbsp;&nbsp;&nbsp;&nbsp;- 올해년도 기준 : 2008년 27세 인구를 100% 기준으로 생존률을 계산</td> -->
<!-- 							   </td> -->
<!-- 						  </tr> -->
<!-- 					   </table> -->
<!-- 					</h2> -->
<!-- 					<br><br> -->
					<h2>○ 연도 선택 후, 인구피라미드 데이터 보기 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;연도를 선택 후에 인구피라미드 데이터 보기를 누르면 해당 년도를 기준으로 인구추계 정보가 조회됩니다.</h2>
					<img src="/img/newhelp/Py_020_10.png" style="width:700px; height:450px"alt="연도 선택 후, 인구피라미드 데이터 보기"/>
					<br><br>
					<h2>○ 성비 데이터 보기</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;성비 데이터 보기 버튼을 누르면 성비 데이터 창이 표시되면서 데이터를 조회할 수 있습니다.</h2>
					<img src="/img/newhelp/Py_020_11.png" style="width:700px;" alt="성비 데이터 보기 "/>
					<br><br>
					<h2>○ 시도 인구추계 피라미드</h2>
					<img src="/img/newhelp/Py_020_12.png" style="width:700px;" alt="시도 인구추계 피라미드"/>

					<h2>&nbsp;&nbsp;&nbsp;&nbsp;1) 비교년도, 비교지역1과 2를 선택하면 인구피라미드 데이터가 조회됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;2) 전국 vs 시도, 시도 vs 시도를 선택하여 비교하실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;3) 슬라이더를 선택하여 인구피라미드를 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;4) 연속보기 : 인구추계 정보를 연속적으로 조회합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;5) 인구추계 정보에 대하여 전년도와 다음년도의 정보를 조회할 수 있습니다.</h2>
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
