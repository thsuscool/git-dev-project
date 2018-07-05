<%
/**************************************************************************************************************************
* Program Name	: 살고싶은 우리동네 Left메뉴 JSP	
* File Name		 : houseAnalysisMap.jsp
* Comment			 : 
* History			 : 2015-10-26
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="mlsfcLists" value="${mlsfcLists }" scope="request"/>
<div class="quickBox step01" style="width:478px; height:calc(100% - 68px);left: 0px;">
	<div class="subj">
		<span id="quick-box-sub-title">추천지역찾기</span> <a href="javascript:void(0)" class="stepClose">닫기</a>
	</div>
	<div class="scrollBox">
		<div id="look-abode-box" class="menu-box" style="display:none;">
			<div class="HouseMap">
				<h2>지역선택 <input id="look-select-location" type="checkbox" checked="checked" title="지역선택" /></h2>
				<dl id="current-location-select" class="SetArea">
					<dt><label for="current-sido-select">지역명</label></dt>
					<dd>
						<select id="current-sido-select" data-type="current" title="지역명 시도 선택"></select>
						<select id="current-sgg-select" title="지역명 시군구 선택"></select>
					</dd>
				</dl>
				<h2>지표선택 <input id="look-select-type" type="checkbox" checked="checked" title="지표선택" /></h2>
				<ul id="look-select" class="IndexSelect">
					<jsp:include page="/view/house/getClassElement?recommend=false"></jsp:include>
				</ul>
			</div>
			<div class="btnBottom">
				<a href="javascript:void(0);" onclick="$houseAnalysisMap.search.abode.search();return false;" class="btnStyle01 submit" style="display: inline-block;padding:10px 30px;">보기</a>
			</div>
		</div>
		<div id="search-recommend-box" class="menu-box">
			<div class="HouseMap">
				<h2>
					지역선택
					<a href="javascript:void(0)" style="position: absolute;right: 10px;top: 7px;" data-subj="지역선택" title="○ 기준지역과 관심지역을 시도, 시군구 까지 설정할 수 있습니다.<br><br>○ 기준지역은 지표의 기준, 비교의 대상이 되는 지역입니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;- 현재 살고있는 지역을 입력하시면, 현 거주지에 대한 지표를 상, 중, 하로 보실 수 있습니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;- 기준지역을 전국으로 설정하시면, 전국 평균으로 지역을 검색 하실 수 있습니다.<br><br> ○ 관심지역은 찾아보고 싶은, 이사 하고자 하는 지역입니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;- 이사 하고 싶은 지역을 관심지역으로 설정 하시면, 설정된 지역 내에서 추천 지역을 찾습니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;- 관심지역을 전국으로 설정하시면, 전국에 대한 모든 읍면동 중에서 추천 지역을 찾습니다.">

						<img src="${pageContext.request.contextPath}/img/ico/ico_tooltip02.png" alt="아이콘" />
					</a>
				</h2>
				<dl class="SetArea">
					<dt><label for="stand-recommend-sido-select">기준지역</label></dt>
					<dd style="margin-bottom:5px;">
						<select id="stand-recommend-sido-select" data-type="stand-recommend" title="기준지역 시도 선택"></select>
						<select id="stand-recommend-sgg-select" title="기준지역 시군구 선택"></select>
					</dd>
					<dt><label for="inter-recommend-sido-select">관심지역</label></dt>
					<dd>
						<select id="inter-recommend-sido-select" data-type="inter-recommend" title="관심지역 시도 선택"></select>
						<select id="inter-recommend-sgg-select" title="관심지역 시군구 선택"></select>
					</dd>
				</dl>
				<h2 style="z-index:100;">
				지표설정
					<button id="LifeStyleBtn" class="Btn_lifestyle close">라이프스타일 별 지표 설정</button>
					<a href="javascript:void(0)" style="position: absolute;right: 10px;top: 7px;" data-subj="지표설정" title="○ 33개 지표 중에서, 최대 9개의 관심 지표를 선택 하실 수 있습니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;- 각각의 지표에 마우스를 올려보시면, 지표 별 설명글을 보실 수 있습니다.<br><br>○ 각 지표 별로 정렬기준을 선택 하실 수 있으며, 지표별 가중치도 선택 하실 수 있습니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;- 지표의 정렬기준(높음, 낮음 등), 가중치(상, 중, 하)에 따라 추천지역이 달라집니다.<br><br>○ 지표 설정 후, 추천지역찾기 버튼을 누르시면, 추천된 지역을 보여줍니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;-  추천된 10개 지역을 보실 수 있으며, 같은 순위일 때는 행정구역번호 순서대로 나타납니다.<br><br>○ 라이프스타일 별로 지표를 선택 하실 수 있습니다.<br>&nbsp;&nbsp;&nbsp;&nbsp;-  '라이프스타일 별 지표 설정'을 클릭 하시면, 미리 만들어둔 지표를 간편하게 선택 하실 수 있습니다.">
						<img src="${pageContext.request.contextPath}/img/ico/ico_tooltip02.png" alt="아이콘" />
					</a>
				</h2>
				<!-- 차수아 -->
				<ul id="LifeStyleSelect" class="LifeStyleGuide close">
					<c:forEach var="lifeStyleList" items="${lifeStyle }">
						<li>
							<c:set var="items">
								<c:forEach var="children" items="${lifeStyleList.children }" varStatus="status">
									{"m_class_idx_id":"${children.m_class_idx_id }"
									,"b_class_idx_id":"${children.b_class_idx_id }"
									,"default_value":"${children.default_value }"
									,"wghtval":"${children.wghtval }"
									,"m_class_idx_nm":"${children.m_class_idx_nm }"
									,"order_base_disp":"${children.order_base_disp }"
									,"serial":"${children.serial }"
									,"order_base":"${children.order_base }"
									}
									<c:if test="${!status.last }">,</c:if>
								</c:forEach>
							</c:set>
							<a href='#' data-items='[${items }]'>
								<span>${lifeStyleList.nm }<img src="${pageContext.request.contextPath}/img/house/life_icon_${lifeStyleList.serial }.png" alt="아이콘" /></span>
							</a>
						</li>
					</c:forEach>
				</ul>
				<ul class="IndexSelect SetStep">
					<jsp:include page="/view/house/getClassElement?recommend=true"></jsp:include>
				</ul>
				<h2>설정된지표<button class="Btn_delete_all" type="button" id="recommend-search-list-delete">전체삭제</button></h2>
				<ul id="recommend-search-list" class="indexfine">
				</ul>
			</div>
			<div class="btnBottom">
				<a href="javascript:void(0);" onclick="$houseAnalysisMap.search.recommend.search();return false;" class="btnStyle01 submit" style="display: inline-block;padding:10px 30px;">추천지역찾기</a>
			</div>
		</div>
	</div>
	<div class="menuAutoClose">
		<input type="radio" name="menuAutoClose_radio" id="menuAutoClose_radio" checked="checked" />
		<label for="menuAutoClose_radio" class="on">통계메뉴바 자동 닫기</label>
	</div>
	<div class="btnBottom">
		<span class="logo"><img src="${pageContext.request.contextPath}/img/pic/pic_logo01.gif" alt="통계청" /></span>
        <div class="serviceLayer" id="bottomServiceLayer">
			<ol>
				<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdis.kostat.go.kr');">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');">통계분류</a></li>
			</ol>
		</div>
		<div class="btnService" id="bottomService">통계청 주요서비스</div>
	</div>
</div>
<!-- 1Depth End -->
