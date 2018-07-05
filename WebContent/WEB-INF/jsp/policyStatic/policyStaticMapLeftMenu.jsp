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

<div class="leftArea policyType">
	<div class="shadow"></div>
	<div class="quickBox step01" id="depth_1_menu">
		<div class="subj">
			<span>정책분야 선택</span>
			<a onclick="javascript:$policyStaticMapLeftmenu.event.closeAnimate(1);" class="stepClose">닫기</a>
		</div> 
		<div class="scrollBox">
			<dl class="qmdl pt0"> 
				<dt class="none">대상지역 선택</dt>
				<dd>
					<div class="policyNormalBox menu-box" > <!-- 2017.08.17 [개발팀] class명 추가 -->
						<!-- 2017.08.10 [개발팀] 왼쪽메뉴 이벤트 수정  START -->
						<select class="select" style="width:110px;"  id="current-sido-select" data-type="current"  title="지역선택 시도 선택" tabindex="97"><option>경기도</option></select>
						<select id="current-sgg-select" class="select"  title="지역선택 시군구 선택" tabindex="98">
							<option value="00">전체</option>
						</select>
					</div>
				</dd> 
				<dt class="none">정책분야 선택</dt>
				<dd class="ctgrList">
					<ul>
						<c:forEach items="${categoryList}" var="data" varStatus="status">
						<li class="icon0${status.count}"  id="${data.category_id}" tabindex="${status.index + 99}" >  <!-- 2017.08.11 [개발팀] id 수정  -->
							<a href="#">${data.category_nm}</a>
							<span id="${data.category_id}Cnt" class="categoryCntC"></span>
						</li>
						</c:forEach>
						<!-- 2017.08.10 [개발팀] 왼쪽메뉴 이벤트 수정  END -->
					</ul>
				</dd>
			</dl> 
		</div> 
		<div class="autoCheck">
			<c:if test="${writeAble == true }">
				<a onclick="javascript:$policyWritePopup.ui.openPolicyWritePopup();" class="btnPolicyWrite">정책통계지도 작성하기</a>
			</c:if>
		</div>
		<div class="btnBottom">
	    	<span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
	        <div id="bottomServiceLayer" class="serviceLayer" style="display: none;">
				<ol>
					<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdis.kostat.go.kr');">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');">통계분류</a></li>
				</ol>
			</div>
	      	<a id="bottomService" class="btnService">통계청 주요서비스</a> 
	     </div> 		
	</div>
	
	<div class="quickBox step02" id="depth_2_menu">
		<div class="subj">
			<span>세부지표 선택</span>
			<a onclick="javascript:$policyStaticMapLeftmenu.event.closeAnimate(2);" class="stepClose">닫기</a> <!-- 2017.08.11 [개발팀] 세부지표조회  --> 
		</div>
		<div class="scrollBox normalBox01" > 
			<div class="stepBox" style="border-bottom:0px;">
				<!--  2017.08.11 [개발팀] 세부지표조회 START  -->
				<a onclick="javascript:$policyStaticMapLeftmenu.event.toggle(this);" class="noneTextBox on">수요변화 지표 목록(<span id="cnt01"></span>)</a>
				<ul id="cateDetailList01" class="type01 mainIdxRadio">
				</ul>
							    
				<a onclick="javascript:$policyStaticMapLeftmenu.event.toggle(this);" class="noneTextBox on">통계연산형 지표 목록(<span id="cnt02"></span>)</a>
				<ul id="cateDetailList02"  class="type01 mainIdxRadio">
				</ul>
				<a onclick="javascript:$policyStaticMapLeftmenu.event.toggle(this);" class="noneTextBox on">시설분석형 지표 목록(<span id="cnt03"></span>)</a>
				<ul id="cateDetailList03"  class="type01 mainIdxRadio"></ul>
				<!-- 2017.08.11 [개발팀] 세부지표조회 END -->
			</div> 
		</div> 
		<div class="btnBottom"></div> 		
	</div>			
</div>