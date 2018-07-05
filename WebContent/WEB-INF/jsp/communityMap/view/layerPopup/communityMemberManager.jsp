<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 회원관리 JSP	
* File Name		 : communityMemberManager.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-01-15
                   (주)유코아시스템 나광흠 디자인 수정 2016-10-06
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div id="community-member-box" class="List_detail admin_member" data-layer="true">
	<div class="detail_box">
		<div style="padding-right:15px;">
			<h2>회원관리</h2>
			<button class="close_layer" onclick="$('#community-member-box').removeClass('M_on');" type="button"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
			<ul class="member_tab">
				<li class="M_on"><a href="#" data-id="all">전체 <span id="community-member-all-count">0</span></a></li>
				<li><a href="#" data-id="waitAccess">참여승인대기 <span id="community-member-wait-access-count">0</span></a></li>
				<li><a href="#" data-id="waitSecede">탈퇴승인대기 <span  id="community-member-wait-secede-count">0</span></a></li>
			</ul>
			<div id="all-community-member">
				<ul id="all-community-member-list" class="member_List"></ul>
				<p id="all-community-member-list-page" class="pasing"></p>
			</div>
			<div id="waitAccess-community-member" style="display:none;">
				<ul id="waitAccess-community-member-list" class="member_List"></ul>
				<p id="waitAccess-community-member-list-page" class="pasing"></p>
			</div>
			<div id="waitSecede-community-member" style="display:none;">
				<ul id="waitSecede-community-member-list" class="member_List"></ul>
				<p id="waitSecede-community-member-list-page" class="pasing"></p>
			</div>
		</div>
	</div>
</div>