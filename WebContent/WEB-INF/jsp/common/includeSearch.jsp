<%
/**************************************************************************************************************************
* Program Name  : 상단 Header JSP  
* File Name     : includeSearch.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-09
*				: 웹 접근성 관련 tabindex 삭제 2016-12-08
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="/js/plugins/jquery.placeholder.min.js"></script> <!-- 2017.12.12 [개발팀] 접근성 점검 -->
<script src="/js/common/includeSearch.js"></script> <!-- 2017.12.12 [개발팀] 접근성 점검 -->
<a class="skipNav" href="#container" tabindex="2">본문바로가기</a>
<div class="headerEtc">
</div>
<div class="headerContents">
	<h1><a href='/' tabindex="10"><img src='/img/common/logoPlus.gif' alt='SGIS plus 통계지리정보서비스' title="통계지리정보 서비스 홈페이지 입니다"/></a></h1>
	
<!-- 	<div class="searchPop"> -->
<!-- 		<p class="subj">추천검색어</p> -->
<!-- 		<ul> -->
<!-- 			<li><a href="/view/common/searchList?searchKeyword=서울시%20인구">서울시 인구</a></li> -->
<!-- 			<li><a href="/view/common/searchList?searchKeyword=미취학아동">미취학아동</a></li> -->
<!-- 			<li><a href="/view/common/searchList?searchKeyword=자동차">자동차</a></li> -->
<!-- 			<li><a href="/view/common/searchList?searchKeyword=편의점">편의점</a></li> -->
<!-- 			<li><a href="/view/common/searchList?searchKeyword=20대">20대</a></li> -->
<!-- 		</ul> -->
<!-- 		<p class="subj">인기검색어</p> -->
<!-- 		<ol> -->
<!-- 			<li><a href="javascript:void(0)">서울시인구</a></li> -->
<!-- 			<li><a href="javascript:void(0)">미취학아동</a></li> -->
<!-- 			<li><a href="javascript:void(0)">편의점</a></li> -->
<!-- 			<li><a href="javascript:void(0)">20대</a></li> -->
<!-- 			<li><a href="javascript:void(0)">출산율</a></li> -->
<!-- 		</ol> -->
<!-- 	</div> -->
	
<!-- 2017.12.20 [개발팀] 접근성조치 -->
	<h2>주메뉴</h2>
	<ul id="gnb" class="gnb" style="font-size: 16px;font-weight: bold;">
		<li style="width: 110px;"><a id="themaList" href="/view/thematicMap/categoryList" tabindex="11">통계주제도</a></li>
		<li style="width: 145px;"><a id="interList" href="/view/map/interactiveMap" tabindex="21">대화형 통계지도</a></li>
		<li style="width: 110px;"><a id="serviceList" href="/view/common/serviceMain" tabindex="31">활용서비스</a></li>
		<li style="width: 110px;"><a id="analList" href="/view/common/analMapMain" tabindex="41">분석지도</a></li>
		<li style="width: 115px;"><a id="sopList" href="/view/board/sopBoardMain" tabindex="51">알림마당</a></li>
	</ul>
	<form action="#" method="post">
		<fieldset>
			<legend class='blind'>통합검색</legend>
			<label for="searchKeyword">통계정보 검색</label>
			<a href="#" ><img src="/img/common/btn_search_plus.png" title="검색하기" alt="검색" id="searchBtn" usemap ="#magni"/></a>
			<map name="magni">
				<area id="search_magni" shape="rect" coords="56 8 72 23"> 
				<area id="search_keyword" shape="rect" coords="6 0 50 29" href="javascript:$includeSearch.ui.moveSearchList();"> 
			</map>
			<input id="searchKeyword" type="text" placeholder="통계정보를 검색해 보세요" onblur="$includeSearch.ui.searchHide();" onkeydown="if(event.keyCode == 13) { $includeSearch.ui.moveSearchList(); return false; }" />
		</fieldset>
		
		<!-- <div class="searchPop">
			<p class="subj">추천검색어</p>
			<ul>
				<li><div onclick="location.href='/view/common/searchList?searchKeyword=서울시%20인구'">서울시 인구</div></li>
				<li><div onclick="location.href='/view/common/searchList?searchKeyword=미취학아동'">미취학아동</div></li>
				<li><div onclick="location.href='/view/common/searchList?searchKeyword=자동차'">자동차</div></li>
				<li><div onclick="location.href='/view/common/searchList?searchKeyword=편의점'">편의점</div></li>
				<li><div onclick="location.href='/view/common/searchList?searchKeyword=20대'">20대</div></li>
			</ul>
		</div> -->
	</form>
</div>

<div class="submenuBox"><!-- submenu  -->
	<div class="rela"></div><!-- 9월 서비스 변경 -->
		<div class="etc">센서스 등 통계자료를 외부자료와 지도위에서 융합하여 사용 할 수 있는 SGIS의 새로운 서비스입니다.</div>
		<div class="ulDiv"><!-- 9월 서비스 변경 -->
			<ul style="margin-left : 0px; line-height: 10px;">
				<li><a id="human" href="/view/thematicMap/categoryListHuman" tabindex="12">인구와 가구</a></li>
				<li><a id="house" href="/view/thematicMap/categoryListHouse" tabindex="13">주거와 교통</a></li>
				<li><a id="welfare" href="/view/thematicMap/categoryListWelfare" tabindex="14">복지와 문화</a></li>
				<li><a id="work" href="/view/thematicMap/categoryListWork" tabindex="15">노동과 경제</a></li>
				<li><a id="envi" href="/view/thematicMap/categoryListEnvironment" tabindex="16">환경과 안전</a></li>
			</ul>
			<ul style="margin-left : -8px; line-height: 10px;">
				<li><a id="mainDex" href="/view/map/interactiveMap/mainIndexView" tabindex="22">총조사 주요지표</a></li>
				<li><a id="popHouse" href="/view/map/interactiveMap/populationHouseView" tabindex="23">인구주택총조사</a></li>
				<li><a id="3fv" href="/view/map/interactiveMap/3fView" tabindex="24">농림어업총조사</a></li>
				<li><a id="comp" href="/view/map/interactiveMap/companyView" tabindex="25">전국사업체조사</a></li>
				<li><a id="kosi" href="/view/map/interactiveMap/kosisView" tabindex="26">KOSIS(지역통계)</a></li>
				<li><a id="pubData" href="/view/map/interactiveMap/publicDataView" tabindex="27">공공데이터</a></li>
				<li><a id="uData" href="/view/map/interactiveMap/userDataView" tabindex="28">나의 데이터</a></li>
			</ul>
			<ul style="margin-left : 23px; line-height: 10px;">
				<li><a id="static" href="/view/map/policyStaticMap" tabindex="32">정책통계지도</a></li>
				<li><a id="technicalBizMap" href="/view/technicalBiz/technicalBizMap" tabindex="33">기술업종 통계지도</a></li>
				<li><a id="houseAnal" href="/view/house/houseAnalysisMap" tabindex="34">살고싶은 우리동네</a></li>
				<li><a id="bizMap" href="/view/bizStats/bizStatsMap" tabindex="35">우리동네 생활업종</a></li>
				<li><a id="comIntro" href="/view/community/intro" tabindex="36">지역현안 소통지도</a></li>
				<li><a id="statexp" href="https://sgis.kostat.go.kr/statexp/index.vw" tabindex="37">통계지도체험</a></li>
				<!-- <li><a  id="useBoard" href="/jsp/share/useBoardList.jsp">우수활용사례</a></li>2016.03.18 수정, 사용자공유마당->우수활용사례  -->
				<li><a id="gallery" href="/view/gallery/resultGallery" tabindex="38">통계 갤러리</a></li>
			</ul>
			<ul style="margin-left : -8px; line-height: 10px;">
<!--				
					<li><a id="staMonth" href="javascript:void(0); alert('서비스점검중입니다.');">월간통계</a></li>			
-->
				<li><a id="staMonth" href="https://analysis.kostat.go.kr/funny_month/month/sta_month_main.do" tabindex="42">월간통계</a></li>	
				<li><a id="pyra" href="https://sgis.kostat.go.kr/jsp/pyramid/pyramid1.jsp" tabindex="43">인구피라미드</a></li>
<!--
				<li><a id="pubModel" href="javascript:void(0); alert('서비스점검중입니다.');">고령화현황보기</a></li>				
-->
				<li><a id="pubModel" href="https://analysis.kostat.go.kr/publicsmodel/" tabindex="44">고령화현황보기</a></li>	
				<li><a id="statbdFam" href="https://sgis.kostat.go.kr/statbd/family_01.vw" tabindex="45">성씨분포</a></li>
				<li><a id="statbdFuture" href="https://sgis.kostat.go.kr/statbd/future_01.vw" tabindex="46">지방의 변화보기</a></li>
			</ul>
			<ul style="margin-left : -11px; line-height: 10px;">
				<li><a id="sopIn" href="/view/board/sopIntro" tabindex="52">SGIS플러스 소개</a></li>
				<li><a id="ean" href="/view/board/expAndNotice" tabindex="53">설명과 공지</a></li>
				<li><a id="shortc" href="/contents/shortcut/shortcut_05_02.jsp" tabindex="54">자료신청</a></li>
				<li><a id="qar" href="/view/board/qnaAndRequest" tabindex="55">질문과 개선요청</a></li>
			</ul>
		</div>
</div>