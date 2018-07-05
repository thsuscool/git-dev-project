<%
/**************************************************************************************************************************
* Program Name  : 생활업종 통계지도 소개 JSP  
* File Name     : sopBizstatsmap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
* 수정 : 김성현 2016-03-18
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>SOP 안내 - 우리동네 생활업종 | 통계지리정보서비스</title>

<link href="/css/default.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script src="/js/common/common.js"></script>
<script src="/js/board/sopBizstatmap.js"></script>

<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<style>
.function h1{font-size:14px; font-weight:700; color: #666; padding-top:15px; letter-spacing: -0.6px; font-weight: 100;}
.function h2{font-size:13px;  text-indent:19px; color: #666; letter-spacing: -0.6px; font-weight: 100;}
.function h2 span{ font-weight: 100;padding-left: 116px; line-height: 30px;}
.function h2 span.pl{ padding-left: 128px; }
</style>
</head>
<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div id="container">
			<p class="path">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/board/sopBoardMain"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a> 
				<a href="/view/board/sopIntro"><span class="path_el">SGIS<sup>+Plus</sup> 소개&nbsp;&nbsp;>&nbsp;</span></a> 
				<a href="/view/board/sopBizstatsmap"><span class="path_el current">창업통계 맵</span></a>
			</p>

			<div id="contents">
				<h3 class="ptit">창업통계 맵</h3>
				<div id="content">
					<div class="pl20 pr20">
						<h4 class="itit">우리동네 생활업종은 SGIS<sup>+Plus</sup> 의 활용 사례로 창업에 적합한 지역을 찾는데 도움을 주는 서비스입니다.</h4>
						<p class="para">창업지역요건을 선택하면 인구, 주택종류, 아파트 시세정도, 소상공인 업종 현황 등의 통계정보를 바탕으로 상위 30%에 해당하는 지역을 찾아줍니다. </p>
						<p class="para">이용자는 추천된 창업 지역에 대한 인구 및 주택특성, 주택거래 동향, 업종별 상권분석 등 필요한 각종 통계정보를 볼 수 있습니다. </p>
						<p class="para">이용하는 방법은 우선 고려할 수 있는 창업조건을 설정하여 후보지역을 검색합니다. </p>
						<p class="para">검색조건을 설정 한 후 지도상에 끌어서 놓기(Drag & Drop)하여 지역의 특성을 파악해봅니다. </p>
						<p class="para mb30">미니맵을 통해 후보지역을 쉽게 이동할 수 있습니다.</p>
						
						<h4 class="itit">화면 및 기능설명</h4>
						<p class=""></p>
						<br />
						<p class="alarm">
							<img src="/img/nm/nm_data_04_1.jpg" alt="" />
						</p>
						
						
						<!-- <p class="alarm"><img src="/img/nm/nm_data_03_1.jpg" alt="" usemap="#Map"/></p> -->
						<!-- 
						<div
							style="position: absolute; top: 425px; left: 23px; width: 208px; height: 282px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_01"></div>
						<div
							style="position: absolute; top: 716px; left: 23px; width: 280px; height: 137px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_02"></div>
						<div
							style="position: absolute; top: 697px; left: 247px; width: 104px; height: 109px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_03"></div>
						<!-- <div
							style="position: absolute; top: 777px; left: 226px; width: 704px; height: 38px; background: rgba(0, 0, 0, 0);"
							id="BIZ_04"></div>
						<div 
							style="position: absolute; top: 683px; left: 679px; width: 254px; height: 164px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_05"></div>
						<div
							style="position: absolute; top: 434px; left: 680px; width: 253px; height: 237px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_06"></div>
						<div
							style="position: absolute; top: 403px; left: 788px; width: 123px; height: 20px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_07"></div>
						<div
							style="position: absolute; top: 405px; left: 915px; width: 20px; height: 20px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_08"></div>
						<div
							style="position: absolute; top: 404px; left: 237px; width: 130px; height: 20px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_09"></div>
						<div
							style="position: absolute; top: 425px; left: 237px; width: 19px; height: 119px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_09_1"></div>
						<!-- <div
							style="position: absolute; top: 544px; left: 228px; width: 104px; height: 17px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_09_2"></div> 
						<div
							style="position: absolute; top: 567px; left: 239px; width: 15px; height: 62px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_10"></div>
						<div
							style="position: absolute; top: 633px; left: 247px; width: 59px; height: 60px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="BIZ_11"></div>
						 -->
							
													<div class="function">
	<h1>① 지역을 설정할 수 있습니다. 반대로 지도를 움직이면 해당 지도의 중심 좌표를 변환하여 지역명을 표시합니다.</h1>
	<h1>② 각 통계항목별로 세부 조건을 설정합니다. "검색조건담기" 버튼을 클릭하여 통계버튼을 생성합니다.</h1>
	<h1>③ 통계버튼이 저장되며 각 통계버튼을 지도 위 경계가 표시된 곳에 "드래그 앤 드롭"하여 조회합니다.<br /><br />
	<span style="margin-left: 15px"> 통계버튼 결합, 분리, 삭제 할 수 있습니다. </span></h1>
	<h1>④ 지도의 축소/확대를 수행할 수 있습니다.</h1>
	<h1>⑤ 지도 상에서 사용자가 원하는 범위의 측정, 영역조회, POI표시 기능을 제공합니다.</h1>
	<h1>⑥ 미니맵 : 지역 검색 결과를 지도 형태로 제공합니다.</h1>
	<h1>⑦ 지도에서 시각화된 데이터의 범례를 제공합니다.</h1>
	<h1>⑧ 사업체 전개도 건물표시, 데이터 업로드, 초기화, 지도 다중뷰 기능을 제공합니다.</h1>
	<h1>⑨ 지역종합현황, 지역특성정보, 주택동행정보를 제공합니다.</h1>
</div>
							
						<br />
						<br />
						
						
						<h4 class="itit">창업통계 맵 이용 가이드</h4>
						<!-- <img src='/img/nm/CM STEP0-2.png' id="imstep0" alt='' onclick="javascript:bizstep(0)"/> -->
							 <h1 class="itit" style="font-size: 14px; color:red; padding2px; font-weight: normal;padding: 2px;">
								STEP 버튼을 누르면 이용법을 단계별로 보실 수 있습니다.
							</h1>
						<img src='/img/nm/CM STEP1-2.png' id="imstep1" alt=''
							style="margin-left: 0px; cursor: pointer" /> <img
							src='/img/nm/CM STEP2-1.png' id="imstep2" alt=''
							style="margin-left: -26px; cursor: pointer" /> <img
							src='/img/nm/CM STEP3-1.png' id="imstep3" alt=''
							style="margin-left: -26px; cursor: pointer" /> <img
							src='/img/nm/CM STEP4-1.png' id="imstep4" alt=''
							style="margin-left: -26px; cursor: pointer" /> <img
							src='/img/nm/CM STEP5-1.png' id="imstep5" alt=''
							style="margin-left: -26px; cursor: pointer" /> <img
							src='/img/nm/CM STEP6-1.png' id="imstep6" alt=''
							style="margin-left: -26px; cursor: pointer" /> <br />
						<br />
						<div id="step0">
							<!-- <h1 class="itit" style="font-size: 14px;">STEP 1</h1> -->
							<!-- <h4 class="itit">검색 대상지역 설정</h4> -->
							<h1 class="itit"
								style="font-size: 14px;padding2px; font-weight: normal;padding: 2px;">
								맵 컨트롤러나 마우스를 이용하여 조회하기 원하는 지역으로 이동하고 지도 레벨을 조정합니다.<br />
								창업통계 맵에서는 현재 지도의 (화면)중심 좌표와 지도 레벨에 따라 전국, 시/도, 시/군/구, 읍/면/동,
								집계구 단위의 지역 경계가 자동으로 표출됩니다.
							</h1>
							<br />
							<p class="alarm">
								<img src="/img/nm/cm_step_1.jpg" alt='' usemap="#Map" />
							</p>
							<h1 class='itit' style="font-size: 14px;padding2px; font-weight: normal;padding: 2px;">(서울특별시를 중심으로 지도를 이동하고 레벨을 조절하여, 서울특별시 내에서 통계버튼을 드래그 앤드 드롭 할 수 있는 대상인 '구'경계가 나와있는 예)</h1>
						</div>
						<div id="step1"></div>
						<br />
						<br />
						<br />
						<h4 class="itit">사용자 데이터 업로드 이용 가이드</h4>
							 <h1 class="itit" style="font-size: 14px; color:red; padding2px; font-weight: normal;padding: 2px;">
								STEP 버튼을 누르면 이용법을 단계별로 보실 수 있습니다.
							</h1>
						<img src='/img/nm/DU STEP1-2.png' id="imstep7" alt='' /> <img
							src='/img/nm/DU STEP2-1.png' id="imstep8" alt=''
							style="margin-left: -26px; cursor: pointer" /> <img
							src='/img/nm/DU STEP3-1.png' id="imstep9" alt=''
							style="margin-left: -26px; cursor: pointer" /> <img
							src='/img/nm/DU STEP4-1.png' id="imstep10" alt=''
							style="margin-left: -26px; cursor: pointer" /> <img
							src='/img/nm/DU STEP5-1.png' id="imstep11" alt=''
							style="margin-left: -26px; cursor: pointer" /> <br />
						<br />
						<div id="step2">
							<!-- <h1 class="itit" style="font-size: 14px;">STEP 1</h1>
							<h4 class="itit">파일 업로드</h4> -->
							<h1 class="itit"
								style="font-size: 14px;padding2px; font-weight: normal;padding: 2px;">
								'데이터 업로드' 버튼을 클릭하여 데이터 파일을 선택하고 업로드 합니다. 업로드 할 파일은 제공되는
								양식에 맞게 입력되어 있어야 합니다.
							</h1>
							<br />
							<p class="alarm">
								<img src="/img/nm/du_step_1.jpg" alt='' />
							</p>
						</div>
						<div id="step" style="height: 1px"></div>
						<div id="step3" style="margin-bottom: 30px;"></div>
						<p class="mb45 btn_arr_link">
							<a href="/view/map/bizStatsMap" alt="우리동네 생활업종 바로가기">우리동네 생활업종
								바로가기</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>