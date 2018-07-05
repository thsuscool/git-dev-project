<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 의견 JSP	
* File Name		 : communityPoiView.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-11-28
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="popupId" value="poi-detail"/>
<div id="${popupId }" class="List_detail" data-layer="true">
	<div class="detail_box">
		<div style="padding-right:15px;">
			<h2 id="${popupId }-title"></h2>
			<button class="close_layer" id="${popupId }-close-button" type="button"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
			<div class="ImgZone">
				<span id="${popupId}-image" class="ImgFace"></span>
				<div id="${popupId}-image-list" class="ImgList"></div>
			</div>
			<ul class="data_info">
				<li>작성자 : <span id="${popupId}-wirter"></span></li>
				<li>등록일 : <span id="${popupId}-date"></span></li>
				<li>위치 : <span id="${popupId}-address"></span></li>
			</ul>
			<dl class="data_comment">
				<dt><img src="${pageContext.request.contextPath}/img/community/icon_datacomment.png" alt="">의견</dt>
				<dd id="${popupId}-comment" style="word-break: break-all;"></dd>
			</dl>
			<div class="btn_detail_group">
				<button id="${popupId }-modify-button" type="button"><img src="${pageContext.request.contextPath}/img/community/comment_modify.png" alt="">수정</button>
				<button id="${popupId }-delete-button" type="button"><img src="${pageContext.request.contextPath}/img/community/comment_delete.png" alt="">삭제</button>
				<button id="${popupId }-report-button" class="register" type="button" onclick="$communityLeftMenu.ui.leftLayerPopupAllClose();$('#${popupId }-report-layer-popup input').val(null);$('#${popupId },#${popupId }-report-layer-popup').addClass('M_on');"><img src="${pageContext.request.contextPath}/img/community/icon_report.png" alt="">신고하기</button>
				<c:choose>
					<c:when test="${(communityMapInfo.cmmnty_partcptn_grant_yn!='M'&&communityMapInfo.cmmnty_partcptn_grant_yn!='P'&&communityMapInfo.cmmnty_partcptn_grant_yn!='A')||communityMapInfo.usr_id==member_id }">
						<button id="${popupId }-report-list-button" class="register" type="button" style="display:none;" onclick="$('#${popupId }-report-list-layer-popup').addClass('M_on');">
							<img src="${pageContext.request.contextPath}/img/community/page_white_text.png" alt="">신고<span id="${popupId }-sttemnt-cnt">0</span>
						</button>
					</c:when>
					<c:otherwise>
						<button id="${popupId }-report-list-button" class="register" type="button" style="display:none;">
							<img src="${pageContext.request.contextPath}/img/community/page_white_text.png" alt="">신고<span id="${popupId }-sttemnt-cnt">0</span>
						</button>
						<div id="sttemnt-login-box" class="register_login" data-layer="true">
							<form id="sttemnt-login-form">
								<c:choose>
									<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn!='P' }">
										<p><label for="sttemnt-login-pw">비밀번호를 입력하세요</label></p>
									</c:when>
									<c:otherwise>
										<input id="sttemnt-login-id" type="text" placeholder="아이디를 입력하세요">
									</c:otherwise>
								</c:choose>
								<input id="sttemnt-login-pw" type="password" <c:if test="${communityMapInfo.cmmnty_partcptn_grant_yn=='P' }">placeholder="비밀번호를 입력하세요"</c:if>>
								<div class="btn">
									<button type="submit">확인</button>
									<button type="button" onclick="$('#sttemnt-login-box').removeClass('M_on');">취소</button>
								</div>
							</form>
						</div>
						<script>
							$("#${popupId }-report-list-button").click(function(){
								$("#sttemnt-login-box input").val(null);
								$("#sttemnt-login-box").addClass("M_on");
								return;
							});
							$("#sttemnt-login-form").submit(function(){
								var pw = $("#sttemnt-login-pw").val();
								var register = $("#sttemnt-login-id").val();
								var data = {
									"cmmnty_poi_id": $("#${popupId }").data("id")
								};
								if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&(register==undefined||register==null||register.replace(/ /gi,"")=="")){
									$communityMapCommon.alert("알림", "아이디를 입력해주세요");
									return false;
								}else if(pw==undefined||pw==null||pw.replace(/ /gi,'')==''){
									$communityMapCommon.alert("알림", "비밀번호를 입력하세요");
									return false;
								}
								data.cmmnty_ppcd = pw;
								data.cmmnty_ipcd = register;
								$.ajax({
									url: contextPath+"/ServiceAPI/community/communityPoiReportList.json",
									data:data,
									async: true,
									type: 'POST',
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#sttemnt-login-box").removeClass("M_on")
											$("#${popupId }-report-list").empty();
											$communityView.ui.createPoiSttemnt(res.result.sttemntList);
											$('#${popupId }-report-list-layer-popup').addClass("M_on");
										}else{
											$communityMapCommon.alert("알림", res.errMsg);
										}
									},
									error: function(data){
										$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
										return false;
									}
								});
								return false;
							});
						</script>
					</c:otherwise>
				</c:choose>
				<div id="${popupId }-report-layer-popup" class="register_layer" data-layer="true">
					<p>등록된 자료에 문제가 있나요?</p>
					<form id="${popupId }-report-form">
						<c:if test="${communityMapInfo.cmmnty_partcptn_grant_yn=='M'||communityMapInfo.cmmnty_partcptn_grant_yn=='P'||communityMapInfo.cmmnty_partcptn_grant_yn=='A' }">
							<div style="margin-bottom:10px;">
								<label for="${popupId }-sttemnt-id">아이디</label>
								<input id="${popupId }-sttemnt-id" type="text" placeholder="아이디">
								<label for="${popupId }-sttemnt-pw">비밀번호</label>
								<input id="${popupId }-sttemnt-pw" type="password" placeholder="비밀번호">
							</div>
						</c:if>
						<textarea id="${popupId }-sttemnt-content" placeholder="신고 내용을 작성해주세요"></textarea>
						<div class="btn">
							<button type="submit">신고완료</button>
							<button type="button" onclick="$('#${popupId }-report-layer-popup').removeClass('M_on');">취소</button>
						</div>
						<span id="${popupId }-sttemnt-content_length" class="text_count">(<span>0</span>/1300)</span>
					</form>
				</div>
				<div id="${popupId }-report-list-layer-popup" class="register_list" data-layer="true">
					<h2>신고목록</h2>
					<button class="close_layer" onclick="$('#${popupId }-report-list-layer-popup').removeClass('M_on');" type="button"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
					<div id="${popupId }-report-list" class="List"></div>
				</div>
			</div>
			<div class="Data_Reply">
				<h3>댓글<strong id="${popupId}-reply-count">0</strong><span id="${popupId}-reply-content_length" style="float:right; font-size:11px;color: #aaa;">(<span>0</span>/30)</span></h3>
				<form id="${popupId}-reply-form">
					<c:if test="${(communityMapInfo.cmmnty_partcptn_grant_yn=='M'||communityMapInfo.cmmnty_partcptn_grant_yn=='P'||communityMapInfo.cmmnty_partcptn_grant_yn=='A')&&communityMapInfo.usr_id!=member_id }">
						<div class="repler">
							<label for="${popupId}-reply-id">${communityMapInfo.cmmnty_partcptn_grant_yn=='A'?'별명':'ID' }</label><input id="${popupId}-reply-id" type="text">
							<label for="${popupId}-reply-pw">PW</label><input id="${popupId}-reply-pw" type="password">
						</div>
					</c:if>
					<div class="reply_insert">
						<label for="${popupId}-reply-content">댓글내용입력</label>
						<input id="${popupId}-reply-content" type="text">
						<button type="submit">댓글등록</button>
					</div>
				</form>
				<div id="${popupId}-reply-list" class="reply_list"></div>
				<div id="${popupId}-reply-page" class="pasing_small"></div>
			</div>
		</div>
	</div>
</div>