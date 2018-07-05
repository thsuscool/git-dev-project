
<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 Left메뉴 JSP	
* File Name		 : communityLeftMenu.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-01-15
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<jsp:useBean id="now" class="java.util.Date" />
<fmt:parseDate var="startDate" value="${communityMapInfo.prid_estbs_start_date}" pattern="yyyy.MM.dd" />
<fmt:formatDate var="nowFormat" value="${now }" pattern="yyyyMMdd" />
<fmt:formatDate var="startFormat" value="${startDate }" pattern="yyyyMMdd" />
<fmt:formatNumber var="n" value="${nowFormat }"/>
<fmt:formatNumber var="s" value="${startFormat }"/>
<div class="quickBox step01" style="width: 430px;">
	<div class="subj">
		<c:url var="introUrl" value="/view/community/intro">
			<c:forEach var="parameterItem" items="${param }">
				<c:if test="${parameterItem.key!='cmmnty_map_id' }">
					<c:param name="${parameterItem.key }" value="${parameterItem.value }"/>
				</c:if>
			</c:forEach>
		</c:url>
		<span>통계소통지도</span> <a href="${introUrl }" class="HomeCommunity">소통지도 홈</a>
	</div>
	<div id="community-left-menu" class="scrollBox" style="width:430px;">
		<div class="menu-box MapInfoBox">
			<div class="cm_info">
				<jsp:include page="/view/community/layerPopup/communityInfo"/>
				<jsp:include page="/view/community/layerPopup/communityPoi"/>
				<jsp:include page="/view/community/layerPopup/communityNotice"/>
				<c:choose>
					<c:when test="${member_id==communityMapInfo.usr_id }">
						<div class="cm_info_s cm_admin">
							<a class="cn_tab_btn" href="#">
								관리자메뉴
								<c:if test="${communityMapInfo.cmmnty_partcptn_grant_yn=='Y'||communityMapInfo.cmmnty_partcptn_grant_yn=='M' }">
									<span class="member" style="display:none;"></span>
								</c:if>
							</a>
							<h2>관리자메뉴</h2>
							<ul class="admin_menu">
								<li class="am_modify">
									<c:url var="formUrl" value="/view/community/form">
										<c:forEach var="parameterItem" items="${param }">
											<c:param name="${parameterItem.key }" value="${parameterItem.value }"/>
										</c:forEach>
									</c:url>
									<c:url var="makeUrl" value="/view/community/auth">
										<c:param name="returnPage" value="${formUrl }"/>
									</c:url>
									<a href="${makeUrl }">정보수정</a>
								</li>
								<li class="am_upload">
									<c:url var="uploadUrl" value="/view/community/dataUpload">
										<c:forEach var="parameterItem" items="${param }">
											<c:param name="${parameterItem.key }" value="${parameterItem.value }"/>
										</c:forEach>
									</c:url>
									<c:url var="makeUrl" value="/view/community/auth">
										<c:param name="returnPage" value="${uploadUrl }"/>
									</c:url>
									<div class="${s>n?'overlay':'' }">
										<a href="${makeUrl }" ${s>n?'class="wait-show-message-button"':'' }>일괄업로드</a>
									</div>
								</li>
								<c:if test="${communityMapInfo.cmmnty_partcptn_grant_yn=='Y'||communityMapInfo.cmmnty_partcptn_grant_yn=='M' }">
									<li class="am_member">
										<div class="${s>n?'overlay':'' }">
											<a href="#" ${s>n?'class="wait-show-message-button"':'id="member-manager-button"' }><span>0</span>회원관리</a>
										</div>
									</li>
								</c:if>
								<c:if test="${s>n }">
									<script>
										$(".admin_menu li>.overlay,.wait-show-message-button").click(function(){
											$communityMapCommon.alert("알림", "아직 시작하지 않은 커뮤니티입니다.");
											return false;
										});
									</script>
								</c:if>
								<li class="am_closing">
									<a href="javascript:$communityLeftMenu.ui.closeCommunity();">폐쇄하기</a>
								</li>
							</ul>
						</div>
					</c:when>
					<c:otherwise>
						<c:if test="${(communityMapInfo.regist_yn=='Y'||communityMapInfo.regist_yn=='W')&&communityMapInfo.cmmnty_partcptn_grant_yn=='Y'&&communityMapInfo.approval_distinct=='A'}">
							<div class="cm_info_s">
								<a href="javascript:$communityLeftMenu.ui.outCommunity();" class="cn_tab_btn no_tab" style="background-image: none;">소통지도 탈퇴</a>
							</div>
						</c:if>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</div>
	<div id="layer-popup-box">
		<jsp:include page="/view/community/layerPopup/communityPoiRegist"/>
		<jsp:include page="/view/community/layerPopup/communityPoiView"/>
		<jsp:include page="/view/community/layerPopup/communityNoticeRegist"/>
		<jsp:include page="/view/community/layerPopup/communityNoticeView"/>
		<c:if test="${member_id==communityMapInfo.usr_id }">
			<c:choose>
				<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='Y' }">
					<jsp:include page="/view/community/layerPopup/communityMemberManager"/>
				</c:when>
				<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='M' }">
					<jsp:include page="/view/community/layerPopup/communityMtypeMemberManager"/>
				</c:when>
			</c:choose>
		</c:if>
	</div>
	<div class="btnBottom">
		<span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
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