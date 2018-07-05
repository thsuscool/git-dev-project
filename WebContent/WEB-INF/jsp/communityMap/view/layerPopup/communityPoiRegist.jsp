<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 의견 등록 JSP	
* File Name		 : communityRegist.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-01-15
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="popupId" value="layer-popup-poi-regist"/>
<div id="${popupId }" class="List_detail" data-layer="true">
	<div class="detail_box">
		<h2>의견등록하기</h2>
		<button class="close_layer" id="${popupId }-close-button" type="button"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
		<form id="${popupId }-form" style="padding-right:15px;">
			<c:if test="${(communityMapInfo.cmmnty_partcptn_grant_yn=='M'||communityMapInfo.cmmnty_partcptn_grant_yn=='P'||communityMapInfo.cmmnty_partcptn_grant_yn=='A')&&communityMapInfo.usr_id!=member_id }">
				<c:choose>
					<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='A' }">
						<c:set var="idName" value="별명"/>
					</c:when>
					<c:otherwise>
						<c:set var="readonly" value="true"/>
						<c:set var="idName" value="아이디"/>
					</c:otherwise>
				</c:choose>
				<div class="WriteBox">
					<label for="${popupId }-id">${idName }</label>
					<input type="text" id="${popupId }-id" name="id" data-null="false" data-error-message="'${communityMapInfo.cmmnty_partcptn_grant_yn=='A'?'별명을':'아이디를' }' " placeholder="${idName }">
					<label for="${popupId }-pw">비밀번호</label>
					<input id="${popupId }-pw" type="password" name="pw" data-null="false" data-error-message="'비밀번호'를 " placeholder="비밀번호">
					<button id="type-password-check-button" type="button">확인</button>
					<c:if test="${communityMapInfo.cmmnty_partcptn_grant_yn=='P' }">
						<ul>
							<li>아이디는 참여자가 설정하며 5글자 이상 입력해야 합니다.<br> 작성한 글의 수정이나 삭제시 사용됩니다.</li>
							<li>비밀번호는 소통지도 개설자가 설정한 비밀번호이므로,<br> 비밀번호는 개설자에게 확인하시기 바랍니다.</li>
						</ul>
					</c:if>
					<script>
						$("#${popupId } input[name=id],#${popupId } input[name=pw]").on("keydown",function(e){
							if(event.keyCode == 13){
								return false;
							}
						});
						$("#type-password-check-button").click(function(){
							if(!$("#${popupId } input[name=pw]").prop("readonly")){
								var abs = new sop.portal.absAPI();
								abs.onBlockUIPopup();
								if($("#${popupId } input[name=id]").val().replace(/ /gi,"")==""){
									$communityMapCommon.alert("알림","아이디를 입력해주세요",function(){
										$("#${popupId } input[name=id]").focus();
									});
									abs.onBlockUIClose();
									return false;
								}else if($("#${popupId } input[name=pw]:password").val().replace(/ /gi,"")==""){
									$communityMapCommon.alert("알림","비밀번호를 입력해주세요",function(){
										$("#${popupId } input[name=pw]:password").focus();
									});
									abs.onBlockUIClose();
									return false;
								}
								if($("#${popupId } input[name=id]").val().replace(/ /gi,"")=="${communityMapInfo.usr_id}"){
									$communityMapCommon.alert("알림","개설자 아이디를 사용하실 수 없습니다",function(){
										$("#${popupId } input[name=id]").focus();
									});
									abs.onBlockUIClose();
									return false;
								}
								var data = {
									cmmnty_map_id : $communityMapCommon.getParameter("cmmnty_map_id"),
									cmmnty_ipcd : $("#${popupId } input[name=id]").val(),
									cmmnty_ppcd : $("#${popupId } input[name=pw]:password").val()
								};
								if($communityView.ui.curMarker&&$communityView.ui.curMarker.cmmnty_poi_id){
									data.cmmnty_poi_id = $communityView.ui.curMarker.cmmnty_poi_id;
								}
								$.ajax({
									url: contextPath+"/view/community/check/password",
									data:data,
									async: true,
									type: 'POST',
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											if(res.success){
												$("#${popupId }-form input:not(:password,#${popupId }-location),#${popupId }-form textarea").prop("readonly",false).prop("disabled",false);
												$("#${popupId }-form>div,#${popupId }-form>button[type=submit]").removeClass("disabled");
												$("#${popupId }-form input:password,#${popupId }-form input[name=id]").prop("readonly",true).parent(".WriteBox").addClass("disabled");
											}else{
												$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
											}
										}else{
											$communityMapCommon.alert("알림", res.errMsg);
										}
										abs.onBlockUIClose();
									},
									error: function(data){
										$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
										abs.onBlockUIClose();
										return false;
									}
								});
							}
						});
					</script>
				</div>
			</c:if>
			<div class="write_title ${readonly?'disabled':'' }">
				<h3>
					<label for="${popupId }-title">제목</label>
					<span id="${popupId }-title_length" style="color:#bbb;font-size: 11px;">(<span>0</span>/30)</span>
				</h3>
				<input type="text" id="${popupId }-title" name="title" data-null="false" data-max-length="30" data-error-message="'제목'을 " ${readonly?'readonly="readonly"':'' }>
			</div>
	
			<div class="write_position ${readonly?'disabled':'' }">
				<h3><label >위치</label></h3>
				<input id="${popupId }-location" name="reg_lc" type="text" readonly="readonly" data-null="false" data-max-length="65" data-error-message="'등록위치'를 ">
				<button id="choose-map" type="button" onclick="$communityLeftMenu.ui.poiRegist.chooseMap();">위치선택</button>
				<button type="button" onclick="$communityLeftMenu.ui.poiRegist.popup();">주소선택</button>
			</div>
	
			<div class="write_image ${readonly?'disabled':'' }">
				<!-- 문제 발생시 label에 for 삽입 -->
				<h3 style="float:left;"><label>대표이미지</label>대표이미지를 포함하여 5개의 이미지 등록이 가능합니다.</h3>
			<!-- 
				<h3 style="float:left;"><label for="${popupId }-file">대표이미지</label>대표이미지를 포함하여 5개의 이미지 등록이 가능합니다.</h3>
			 -->
				<button type="button" id="poi-file-search-button" style="margin-top:7px;margin-left:46px;">파일찾기</button>
				<ul id="${popupId }-photo-file-list" class="list"></ul>
				<div id="${popupId }-photo-hidden-file-list" style="display:none;">
					<input type="file" name="fileSearch" style="display:none;">
				</div>
			</div>
	
			<div class="write_comment ${readonly?'disabled':'' }">
				<h3>
					<label for="${popupId }-opinion_state">의견</label>
					<span id="${popupId }-opinion_state_length" style="color:#bbb;font-size: 11px;">(<span>0</span>/150)</span>
				</h3>
				<textarea id="${popupId }-opinion_state" name="opinion_state" data-null="false" data-max-length="150" data-error-message="'의견' " ${readonly?'readonly="readonly"':'' }></textarea>
			</div>
	
			<div class="write_icon ${readonly?'disabled':'' }">
				<h3>아이콘</h3>
				<c:forEach items="${custom_symbol_list }" var="custom_symbol" varStatus="status">
					<c:choose>
						<c:when test="${fn:trim(communityMapInfo.reg_symbol)=='' }">
							<label for="symbol${status.index }" title="${custom_symbol.label_nm }">
								<input type="radio" id="symbol${status.index }" name="symbol" value="${custom_symbol.custom_symbol_id }" ${status.first?'checked="checked"':'' } ${readonly?'disabled="disabled"':'' }>
								<img src="${pageContext.request.contextPath}${custom_symbol.path_nm }thumbnail/thumbnail-XS-${custom_symbol.save_file_nm}" style="width:23px;height:28px;" alt="아이콘" />
							</label>
						</c:when>
						<c:otherwise>
							<label for="symbol${status.index }" title="${custom_symbol.label_nm }">
								<input type="radio" id="symbol${status.index }" name="symbol" value="${custom_symbol.order }" ${status.first?'checked="checked"':'' } data-value="${communityMapInfo.reg_symbol }${custom_symbol.order }" ${readonly?'disabled="disabled"':'' }>
								<img src="${pageContext.request.contextPath}/img/community/iconset_${communityMapInfo.reg_symbol }${custom_symbol.order }.png" alt="아이콘" />
							</label>
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</div>
	
			<button class="Finish" type="submit">등록완료</button>
		</form>
	</div>
</div>