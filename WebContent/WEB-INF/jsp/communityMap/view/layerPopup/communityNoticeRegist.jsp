<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="popupId" value="layer-popup-notice"/>
<c:if test="${member_id==communityMapInfo.usr_id }">
	<div id="${popupId }-form-box" class="List_detail" data-layer="true">
		<div class="detail_box">
			<div style="padding-right:15px;">
				<h2>공지사항 등록하기</h2>
				<button class="close_layer" type="button" onclick="$communityLeftMenu.ui.notice.curNotice=null;$('.cm_notice>.cn_tab_btn').click();"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
				<form id="${popupId }-regist-form">
					<div class="write_title">
						<h3><label for="${popupId }-title">제목</label><span id="${popupId }-title_length" style="color:#bbb;font-size: 11px;">(<span>0</span>/30)</span></h3>
						<input id="${popupId }-title" name="title" type="text" data-null="false" data-max-length="30" data-error-message="'제목' ">
					</div>
			
					<div class="write_comment">
						<h3><label for="">내용</label><span id="${popupId }-content_length" style="color:#bbb;font-size: 11px;">(<span>0</span>/1300)</span></h3>
						<textarea id="${popupId }-content" name="content" data-null="false" data-max-length="1300" data-error-message="'내용' "></textarea>
					</div>
			
					<div class="write_file">
						<h3><label for="${popupId }-file">파일</label></h3>
						<input id="${popupId }-file-name" type="text" readonly="readonly">
						<button type="button" onclick="$('#${popupId }-form-hidden-file-list input:file:eq(0)').click();">파일찾기</button>
						<div class="list normalBox">
							<ul id="${popupId }-form-file-list"></ul>
						</div>
						<div id="${popupId }-form-hidden-file-list" style="display:none;">
							<input type="file" name="fileSearch" style="display:none;">
						</div>
					</div>
					<button class="Finish" type="submit">등록완료</button>
				</form>
			</div>
		</div>
	</div>
</c:if>