<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="popupId" value="layer-popup-notice"/>
<div id="${popupId }-view-box" class="List_detail" data-layer="true">
	<div class="detail_box">
		<div style="padding-right:15px;">
			<h2></h2>
			<button class="close_layer" type="button" onclick="$communityLeftMenu.ui.notice.curNotice=null;$('#${popupId }-view-box').removeClass('M_on');"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
			<c:if test="${member_id==communityMapInfo.usr_id }">
				<div class="cm_btn_group" style="float: right;">
					<button id="${popupId }-delete-button" type="button" class="btn btn_delete">삭제</button>
					<button id="${popupId }-modify-button" type="button" class="btn btn_write">수정</button>
				</div>
			</c:if>
			<p class="listinfo"></p>
			<div class="notice_cont"></div>
			<p class="file" style="display:none;"></p>
		</div>
	</div>
</div>