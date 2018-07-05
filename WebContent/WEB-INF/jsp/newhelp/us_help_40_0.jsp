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
	
<!-- mng_s 20170810 이경현 -->
	<style>
table {border:1px solid #A09D9D; border-collapse: collapse;}
th, td {border:1px solid #A09D9D;}
</style>
<!-- mng_e 20170810 이경현 -->
	
	
	
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
				<div class="leftTitle">홈페이지 이용안내</div>
				<div class="leftmenu">
					<ul>
						<!-- mng_s 20170915_김건민 -->	
						<li><a href="/view/newhelp/us_help_10_0">SGIS 플러스란?</a></li>
						<!-- mng_e 20170915_김건민 -->	
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a></li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a></li>
						<!-- <li><a href="/view/newhelp/us_help_40_0"  class="on">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>용어설명</h1><br>
					<h2>○ 이용자의 이해를 돕기위해 통계지리정보에 대한 설명자료를 제공합니다.</h2>
					<div style="height:30px;"></div>
					<!-- mng_s 20170810 웹접근성 조치 -->
						<table>
						    <colgroup>
							    <col style="width:100px;" />
							    <col style="width:150px;" />
							    <col style="width:420px;" />
						    </colgroup>
					      <thead>
							<tr style="height:30px; background-color:#dadada;" >
								<th scope="col" style="border:1px; border-color:#A09D9D;">한글명</th>
								<th scope="col" style="border:1px; border-color:#A09D9D;">영문명</th>
								<th scope="col" style="border:1px; border-color:#A09D9D;">설명</th>
						     </tr>
					      </thead>
					      <tbody>
					      <tr>
						   <td style="height:30px; text-align:center">N/A</td>
						   <td style="text-align:center">Not Available</td>
						   <td>표출불가 (5 미만)</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">가구</td>
						   <td style="text-align:center">House</td>
						   <td>1인 또는 2인 이상이 모여서 취사, 취침 등 생계를 같이하는 생활단위</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">거처</td>
						   <td style="text-align:center">Living quarters</td>
						   <td>사람이 살고 있는 모든 장소를 통칭하는 말로서 구조적으로 분리되고<br>&nbsp;&nbsp;독립된 하나의 거주단위</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">교육정도</td>
						   <td style="text-align:center">Educational attainment</td>
						   <td>교육부장관이 인정하는 정규교육 중 이수한 최고학력</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">기초단위구</td>
						   <td style="text-align:center">Basic unit district</td>
						   <td>도로, 하천, 철도, 산능선 등과 같은 준항구적인 명확한 지형지물을 <br>&nbsp;&nbsp;이용하여 지도상에 구획한 최소단위구역</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">노년부양비</td>
						   <td style="text-align:center">Aged dependency ratio</td>
						   <td>노년부양비 = (65세 이상 인구 / 15~64세 인구) × 100</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">농가</td>
						   <td style="text-align:center">Farm household</td>
						   <td>생계, 영리, 연구를 목적으로 농업을 경영하거나 농업에 종사하는 가구</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">농가인구</td>
						   <td style="text-align:center">Farm household population</td>
						   <td>조사기준 시점 현재 농가로 정의된 개인농가에서 취사, 취침 등 생계를<br>&nbsp;&nbsp;같이하는 사람</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">도시권</td>
						   <td style="text-align:center">Metropolitan Area</td>
						   <td>도시를 중심으로 형성되는 통근권을 토대로, 해당 도시와 그 주변지역간의<br>&nbsp;&nbsp;기능적 상호작용이 이루어지는 권역</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">도시화지역</td>
						   <td style="text-align:center">Urban Area</td>
						   <td>인구밀도와 지목을 기준으로 도시의 기능을 하는 기초 단위구로 이루어진<br>&nbsp;&nbsp;구역으로 행정구역과는 별도로 실질적인 도시지역을 나타내는 구역단위</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">부양비</td>
						   <td style="text-align:center">Dependency ratio</td>
						   <td>생산가능인구(15∼64세)에 대한 유소년인구(0∼14세)와 고령인구<br>&nbsp;&nbsp;(65세 이상)의 합의 백분비로, 인구의 연령구조를 나타내는 지표</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">사업체</td>
						   <td style="text-align:center">Establishment</td>
						   <td>일정한 물리적 장소에서 단일 또는 주된 경제활동을 독립적으로 수행하는<br>&nbsp;&nbsp;기업체나 기업체를 구성하는 부분을 말함</td>
					      </tr>
					      <tr>
						   <td style="height:240px; text-align:center">세대별 가구</td>
						   <td style="text-align:center">Households by generation</td>
						   <td>일반가구에 한하여 가구주와 그 가족의 친족관계에 따라 1세대 가구, 2세대<br>&nbsp;&nbsp;가구, 3세대 가구, 4세대 이상 가구로 구분한 것을 말함<br><br>&nbsp;&nbsp;ㆍ1세대가구[One generation household] : 가구주와 같은 세대에 속하는<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;친족들만 함께 사는 가구<br><br>&nbsp;&nbsp;ㆍ2세대가구 [Two generations household] : 가구주와 그 직계 또는<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;방계의 친족 2세대가 함께 사는 가구<br><br>&nbsp;&nbsp;ㆍ3세대가구[Three generations household] : 가구주와 그 직계 또는<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;방계의 친족 3세대가 함께 사는 가구<br><br>&nbsp;&nbsp;ㆍ4세대이상가구[Household of four generations or more] : 가구주와<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;그 직계 또는 방계의 친족 4세대 이상이 함께 사는 가구</td>
					      </tr>
					      <tr>
						   <td style="height:60px; text-align:center">어가</td>
						   <td style="text-align:center">Fishery household</td>
						   <td>지난 1년간 판매할 목적으로 1개월 이상 어선어업, 마을어업(맨손, 나잠, <br>&nbsp;&nbsp;기타어업), 양식어업을 직접 경영한 가구이거나,지난 1년간 직접 잡거나<br>&nbsp;&nbsp;양식한 수산물을 판 금액이 120만 원 이상인 가구</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">연령</td>
						   <td style="text-align:center">Age</td>
						   <td>조사기준시점 현재 호적이나 주민등록과는 관계없이 실제로 태어난<br>&nbsp;&nbsp;사실상의 만 나이</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">유년부양비</td>
						   <td style="text-align:center">Child dependency ratio</td>
						   <td>유년부양비 = (15세 미만 인구 / 15~64세 인구) × 100</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">인구밀도</td>
						   <td style="text-align:center">Population density</td>
						   <td>일정지역내의 인구를 해당지역의 면적으로 나눈 수치로서 지역 내에서<br>&nbsp;&nbsp;거주하는 인구의 과밀한 정도를나타낸다.(통상 ㎢당 인구수로 표시)</td>
					      </tr>
					      <tr>
						   <td style="height:60px; text-align:center">임가</td>
						   <td style="text-align:center">Forestry household</td>
						   <td>조사기준일 현재 산림면적을 3ha 이상 보유하면서 지난 5년간 육림작업<br>&nbsp;&nbsp;실적이 있거나 지난 1년간 벌목업, 양묘업을 경영하였거나, 직접 생산한<br>&nbsp;&nbsp;임산물 판매대금이 120만 원 이상인 가구</td>
					      </tr>
					      <tr>
						   <td style="height:220px; text-align:center">점유형태</td>
						   <td style="text-align:center">Type of residence</td>
						   <td>ㆍ자기집[Own house]: 법률상 소유 여하를 불문하고 실제 거주자 소유로<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;되어 있는 집<br><br>&nbsp;&nbsp;ㆍ전 세[Lease]: 일정액의 현금 또는 기타 방법으로 전세금을<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;내고 계약기간 세 들어 사는 경우<br><br>&nbsp;&nbsp;ㆍ보증금 있는 월세[Monthly rent with deposit in advance] : 일정액의 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;보증금을 내고 매월 집세를 내는 경우<br><br>&nbsp;&nbsp;ㆍ보증금 없는 월세[Monthly rent ithout deposit] :<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;일정액의 보증금 없이 매월 집세(또는 월세)를 내는 경우 <br><br>&nbsp;&nbsp;ㆍ사 글 세[Monthly rent paid in advance] : 세입자가 1년 또는 10개월<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등 일정기간의 집세를 한꺼번에 내고 매월 1개월분의 집세를<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공제하는 경우.<br><br>&nbsp;&nbsp;ㆍ무 상[Free use] : 다른 사람 소유의 건물 등을 사용하지만 임차료 등<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대가를 지불하지 않는 경우</td>
					      </tr>
					      <tr>
						   <td style="height:350px; text-align:center">주택</td>
						   <td style="text-align:center">Housing unit</td>
						   <td>한 가구가 살림을 할 수 있도록 지어진 집으로서 부엌과 한 개 이상의 방과<br>&nbsp;&nbsp;독립된 출구를 갖춘 영구 또는 준영구 건물이어야 하며, 관습상 소유 또는<br>&nbsp;&nbsp;매매의 한 단위를 이루어야 한다.<br><br>&nbsp;&nbsp;ㆍ단독주택[Detached dwelling] : 한 가구가 생활할 수 있도록 건축된<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;일반 단독주택과 여러 가구가 살 수 있도록 설계된 다가구 단독주택<br><br>&nbsp;&nbsp;ㆍ아 파 트[Apartment] : 한 건물 내에 여러 가구가 거주할 수 있도록 지은<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5층 이상의 영구건물로서, 구조적으로 한 가구씩 독립하여 살 수 있도록<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;건축된 주택<br><br>&nbsp;&nbsp;ㆍ연립주택[Row house] : 한 건물 안에 여러 가구가 살 수 있도록 지은<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4층 이하의 영구건물로서 건축 당시 ‘연립주택’으로 허가받은 주택<br><br>&nbsp;&nbsp;ㆍ다세대주택[Apartment unit in a private house] : 한 건물 내에 여러<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가구가 살 수 있도록 건축된 4층 이하의 영구건물로서 건물의 연면적이<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;660㎡이하이면서 건축 당시 다세대주택으로 허가받은 주택<br><br>&nbsp;&nbsp;ㆍ비거주용 건물 내 주택[House within commercial building] : 비거주용<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;건물에 사람이 살되, 그 거주 부분이 주택의 요건(방, 부엌, 독립된 출입구)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;을 갖추고 있는 경우를 말함</td>
					      </tr>
					      <tr>
						   <td style="height:60px; text-align:center">주택이외의 거처</td>
						   <td style="text-align:center">Living in structures other than dwellings</td>
						   <td>주택의 요건을 갖추진 못한 거처</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">지리정보시스템</td>
						   <td style="text-align:center">Geographic Information System</td>
						   <td>지리공간데이터(geographic or geospatial data)를 기반으로 유용한<br>&nbsp;&nbsp;정보를 생성하는 정보시스템. 인적자원, 자료의 통합체</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">집계구</td>
						   <td style="text-align:center">Output Area</td>
						   <td>인구, 사회경제적 동질성, 형태지수를 고려하여 확정한 통계집계 공표구역</td>
					      </tr>
					      <tr>
						   <td style="height:30px; text-align:center">총부양비</td>
						   <td style="text-align:center">Total dependency ratio</td>
						   <td>총부양비 = 유년부양비 + 노년부양비</td>
					      </tr>
					      <tr>
						   <td style="height:40px; text-align:center">통계지리정보<br>시스템/서비스</td>
						   <td style="text-align:center">Statistical Geographic Information Service</td>
						   <td>인구주택 및 사업체 센서스 데이터에 지리학적 공간(geographic<br>&nbsp;&nbsp;space/geospace) 속성,
						   즉 위치값(경위도나 주소 등), 경계, 지도 등을<br>&nbsp;&nbsp;부가한 센서스 공간데이터(census spatial data)를 기반으로 합리적 <br>&nbsp;&nbsp;의사결정을 지원하는 유용한 정보를 생성하기 위한 정보시스템,<br>&nbsp;&nbsp;혹은 그 서비스</td>
					      </tr>
					      <tr>
						   <td style="height:180px; text-align:center">혼인상태</td>
						   <td style="text-align:center">Marital status</td>
						   <td>호적이나 주민등록상의 신고와 관계없이 15세 이상의 사람에 대한 사실상의<br>&nbsp;&nbsp;혼인상태<br><br>&nbsp;&nbsp;ㆍ미 혼[Never married] : 혼인한 사실이 없는 사람<br><br>&nbsp;&nbsp;ㆍ배우자 있음[Married] : 결혼하여 배우자가 있는 사람<br><br>&nbsp;&nbsp;ㆍ사 별[Bereavement] : 혼인은 하였으나 배우자가 사망하고 현재<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;재혼하지 않고 혼자 사는 사람<br><br>&nbsp;&nbsp;ㆍ이 혼[Divorced] : 배우자와 헤어지고 현재 재혼하지 않고 혼자 사는 사람</td>
					      </tr>
					      </tbody>
					   </table>
					   <!-- mng_e 20170810 웹접근성 조치 -->
					<br /><br />
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
