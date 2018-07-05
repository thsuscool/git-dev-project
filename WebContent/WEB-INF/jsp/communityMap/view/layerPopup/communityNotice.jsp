<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 공지사항	
* File Name		 : communityNotice.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-01-15
                   (주)유코아시스템 나광흠 디자인 수정 2016-10-04
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="popupId" value="layer-popup-notice"/>
<div id="${popupId }" class="cm_info_s cm_notice">
	<a class="cn_tab_btn" href="#">공지사항</a>
	<h2>공지사항</h2>
	<div class="List_search">
		<form id="${popupId }-list-search-form">
			<label for="notice_search_word" class="Hidden">검색어입력</label>
			<input id="notice_search_word" name="search_word" type="text">
			<button type="submit">검색</button>
		</form>
	</div>
	<ul id="${popupId }-list" class="notice_List"></ul>
	<p id="${popupId }-page" class="pasing"></p>
	<c:if test="${member_id==communityMapInfo.usr_id }">
		<button class="btn btn_write" onclick="$communityLeftMenu.ui.notice.modify.setForm();" type="button">글쓰기</button>
	</c:if>
</div>