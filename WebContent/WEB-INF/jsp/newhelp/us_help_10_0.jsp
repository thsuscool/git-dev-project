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
		<!-- mng_s 20170919 이경현 -->
	<style>
table {border:1px solid #A09D9D; border-collapse: collapse;}
th, td {border:1px solid #A09D9D;}
</style>
		<!-- mng_e 20170919 이경현 -->
	
	
	
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
						<li><a href="/view/newhelp/us_help_10_0" class="on">SGIS플러스란?</a></li>
						<!-- mng_e 20170915_김건민 -->
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a></li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a></li>
						<!-- <li><a href="/view/newhelp/us_help_40_0">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <!-- mng_s 20170915_김건민 -->	
				  <h1>SGIS플러스란?</h1><br>
					<h2>○ SGIS플러스는 통계청이 보유한 인구·가구·주택·사업체 등의 센서스데이터와 공공 및 민간 자료와 연계∙융합할 수</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;있는 위치기반 개방형 서비스 플랫폼입니다.</h2>
					<h2>○ 각종 통계정보를 지도기반 위에서 검색할 수 있고(대화형 통계지도), 주제별 통계지도 서비스를 통해 관심이</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;높은 여러 사회 현안을 살펴 볼 수 있으며(통계주제도), 플랫폼 활용서비스(우리동네생활업종),지도 제어에서부터</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;각종 정보 활용에 관한 OpenAPI를 제공합니다.</h2>
					<h2>○ 개인의 정보를 SGIS플러스에 융합할 수 있도록 사용자 데이터 분석도 가능합니다.</h2>
					<!-- mng_e 20170915_김건민 -->
					<h2>○ 시스템 개념도</h2>
					<img src="/img/newhelp/Us_010_01.png" style="margin-left: 0px; width:650px; height:400px" border=0 alt="시스템 개념도"/>

					<br><br>
				  <h1>콘텐츠 구성</h1>
					<h2>○ 메뉴는 크게 통계주제도, 대화형 통계지도, 활용서비스, 분석지도, 알림마당, 개발자지원센터로 구성되어 있습니다.</h2>
					<h2>○ 로그인을 하는경우 마이페이지를 이용하실 수 있습니다.</h2>
					<img src="/img/newhelp/Us_010_03_new.png" style="margin-left: 10px; width:650px; height:450px" border=0 alt="메뉴 구성도"/>
					<br><br>
				  <h1>콘텐츠 목록</h1>
					<br>
					<!-- mng_s  20170810 웹표준 적용  -->
						<table style="border='1';" >
						    <colgroup>
							    <col style="width:150px;" />
							    <col style="width:550px;"/>
						    </colgroup>
					      <thead>
							<tr style="height:30px; bgcolor:#dadada;">
							<th scope="col">콘텐츠 종류</th>
							<th scope="col">서비스 내용</th>
					      </thead>
					      <tr>
						   <td style="height:30px; text-align:center">통계주제도</td>
						   <td>&nbsp;&nbsp;인구ㆍ가구, 주거ㆍ교통, 복지ㆍ문화, 노동ㆍ경제, 환경ㆍ안전의 통계 주제도 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">대화형 통계지도</td>
						   <td>&nbsp;&nbsp;인구, 주택, 가구, 농림어업, 사업체 센서스 및 행정구역통계 등 지역단위로 통계지도로 정보 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">정책통계지도</td>
						   <td>&nbsp;&nbsp;지역별 수요변화 및 협업형 정책지로 정보 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">기술업종 통계지도</td>
						   <td>&nbsp;&nbsp;국민 생활과 밀접한 기술업종에 대한 지역별 기술업종의 특성정보 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">살고싶은 우리동네</td>
						   <td>&nbsp;&nbsp;사용자 조건에 맞는 주거지역을 추천해 주는 기능 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">우리동네 생활업종</td>
						   <td>&nbsp;&nbsp;창업관련 통계정보를 다양한 형태로 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">지역현안 소통지도</td>
						   <td>&nbsp;&nbsp;지역사회 구성원이 직접참여하여 커뮤니티 매핑기능 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">통계지도 체험</td>
						   <td>&nbsp;&nbsp;사용자가 직접 자료를 입력하여 다양한 통계지도를 작성할 수 있는 기능 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">통계갤러리</td>
						   <td>&nbsp;&nbsp;통계포털의 여러 서비스에서 확인한 통계정보를 수집하고 공유하는 기능 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">월간통계</td>
						   <td>&nbsp;&nbsp;월간 발표되는 주요 통계를 이용자가 알기 쉽도록 통계지도로 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">움직이는 인구피라미드</td>
						   <td>&nbsp;&nbsp;추계인구를 기준으로 연령별 과거와 미래의 인구분포 변화모습을 피라미드 형태로 표현</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">고령화 현황보기</td>
						   <td>&nbsp;&nbsp;고령화 현황의 지역간 비교, 추세분석, 노인복지시설 등 고령화 관련 통계와 보도자료를 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">성씨분포</td>
						   <td>&nbsp;&nbsp;인구 기준으로 우리나라 50대 성씨와 99대 본관의 지역별 분포에 대한 통계정보 제공</td>
					      </tr>
					      <tr>
						   <td style="height:30px;text-align:center">지방의 변화보기</td>
						   <td>&nbsp;&nbsp;1995년부터 2015년까지 5년 주기로 지방의 변화되는 모습을 제공</td>
					      </tr>
					   </table>
					   <!-- mng_e  20170810 웹표준 적용  -->
					<br><br>
				  <h1>연혁</h1>
				  	<h2>○ 2017년 : 정책통계지도, 기술업종 통계지도, 통계갤러리, 그리드서비스, 조사업무지원시스템 서비스 개시</h2>
				  	<h2>○ 2016년 : 살고싶은 우리동네, 지역현안 소통지도, 모바일서비스, 위치기반데이터관리시스템 서비스 개시</h2>
					<h2>○ 2015년 : SGIS 오픈플랫폼 전국 서비스 실시 - 대화형 통계지도, 통계주제도, 우리동네 생활업종 서비스 개시</h2>
					<h2>○ 2014년 : SGIS 오픈플랫폼 1단계 구축</h2>
					<h2>○ 2013년 : SGIS 오픈플랫폼 정보화전략계획(ISP) 추진</h2>
					<h2>○ 2012년 : OGC표준 준수 웹 GIS엔진 도입, 소지역통계 개편</h2>
					<h2>○ 2011. 12. : 통계지도 시계열서비스, S-통계내비게이터, 지도로 보는 행정구역통계 서비스 개시</h2>
					<h2>○ 2009. 5.~ : 통계지리정보서비스(SGIS) 전국 서비스 실시</h2>
					<h2>○ 2008. 12. : 전국 자료 구축 및 시스템 확충</h2>
					<h2>○ 2007. 12. : 7개 특․광역시 서비스 확대</h2>
					<h2>○ 2006. 12. : 대전광역시 시범 서비스</h2>
					<br><br>
				  <h1>DB구축 과정</h1>
					<h2>○ 1단계 - 센서스 지도 구축 : 공간분석 서비스가 가능한 수치지도(Digital Map) 구축</h2>
					<h2>○ 2단계 - 개별 통계 조사대상처의 정보 입력 : 전국 거처와 사업체의 위치정보를 등록하고 속성정보를 연결하는 DB구축</h2>
					<h2>○ 3단계 - 기초단위구 구축 : 도로, 하천, 능선 등 항구적 지형지물을 기준으로 기초단위구를 구획</h2>
					<h2>○ 4단계 - 집계구 구축 : 기초단위구를 묶어 일정규모(인구 최적 500명 내외)의 집계구를 획정</h2>
					<h2>○ 5단계 - 서비스 제공 : 통계지리정보서비스 및 공간통계 자료제공</h2>
					<br><br>				</div>
			</div><!--contentsWrap-->
		</div><!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom" flush="true"></jsp:include>
		</footer>
		<!--footer-->
	</div><!--wrapper-->
</body>
</html>
