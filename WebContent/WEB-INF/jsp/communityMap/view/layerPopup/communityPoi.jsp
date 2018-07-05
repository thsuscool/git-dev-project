<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 의견 JSP	
* File Name		 : communityPoi.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-10-04
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div class="cm_info_s cm_data">
	<a class="cn_tab_btn" href="#">등록자료 <span class="member">0</span></a>
	<h2>등록자료</h2>
	<div class="List_search">
		<form id="poi-search-form">
			<label for="searchWord" class="Hidden">검색어입력</label>
			<input type="text" id="searchWord">
			<button type="submit">검색</button>
		</form>
	</div>
	<div id="symbol-list" class="Icon_search">
		<c:forEach items="${custom_symbol_list }" var="custom_symbol" varStatus="status">
			<c:choose>
				<c:when test="${fn:trim(communityMapInfo.reg_symbol)=='' }">
					<a href="#" data-id="${custom_symbol.custom_symbol_id }">
						<img src="${pageContext.request.contextPath}${custom_symbol.path_nm }thumbnail/thumbnail-XS-${custom_symbol.save_file_nm}" style="width:23px;height:28px;" alt="${custom_symbol.label_nm }"> ${custom_symbol.label_nm }
					</a>
				</c:when>
				<c:otherwise>
					<a href="#" data-id="${custom_symbol.order }">
						<img src="${pageContext.request.contextPath}/img/community/iconset_${communityMapInfo.reg_symbol }${custom_symbol.order }.png" alt="${custom_symbol.label_nm }"> ${custom_symbol.label_nm }
					</a>
				</c:otherwise>
			</c:choose>
		</c:forEach>
		<button id="symbol-all" type="button" title="아이콘의견별로 on/off 가 가능합니다.">전체</button>
	</div>
	<div class="TabArea">
		<ul id="poi-list-tab" class="List_tab">
			<li class="M_on"><a href="#" data-id="all">전체등록자료<span id="all-community-total-count">0</span></a></li>
			<c:if test="${fn:trim(member_id)!=''&&(communityMapInfo.usr_id==member_id||(communityMapInfo.cmmnty_partcptn_grant_yn!='M'&&communityMapInfo.cmmnty_partcptn_grant_yn!='P'&&communityMapInfo.cmmnty_partcptn_grant_yn!='A')) }">
				<li><a href="#" data-id="my">나의등록자료<span id="my-community-total-count">0</span></a></li>
			</c:if>
		</ul>
		<div id="all-community-box">
			<ul id="all-community-poi-list" class="data_List"></ul>
			<p id="all-community-poi-page" class="pasing"></p>
		</div>
		<c:if test="${communityMapInfo.usr_id==member_id||(communityMapInfo.cmmnty_partcptn_grant_yn!='M'&&communityMapInfo.cmmnty_partcptn_grant_yn!='P') }">
			<div id="my-community-box" style="display:none;">
				<ul id="my-community-poi-list" class="data_List"></ul>
				<p id="my-community-poi-page" class="pasing"></p>
			</div>
		</c:if>
		<button class="btn_comment" onclick="$('.cm_basic .btn_comment').click();" type="button">의견등록하기</button>
	</div>
</div>