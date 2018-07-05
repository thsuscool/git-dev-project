<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 전용 회원 관리 JSP	
* File Name		 : communityMtypeMemberManager.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-05-25
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div class="cm_info">
	<div id="community-member-box" class="List_detail admin_member" data-layer="true">
		<div class="detail_box">
			<div style="padding-right:15px;">
				<h2>회원관리</h2>
				<button class="close_layer" onclick="$('#community-member-box').removeClass('M_on');" type="button"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
				<ul class="member_tab">
					<li class="M_on"><a href="#" data-id="all">전체 <span id="community-member-all-count">0</span></a></li>
				</ul>
				<div id="all-community-member" style="margin-bottom: 20px;">
					<ul id="all-community-member-list" class="member_List"></ul>
					<p id="all-community-member-list-page" class="pasing"></p>
				</div>
				<button id="member-regist-excel-button" class="btn btn_write" type="button">회원엑셀업로드</button>
				<button id="member-regist-button" class="btn btn_write" type="button">회원등록</button>
			</div>
		</div>
	</div>
	<c:set var="popupId" value="community-member-regist"/>
	<div id="${popupId }" class="List_detail admin_member" data-layer="true">
		<div class="detail_box">
			<h2>회원등록</h2>
			<button class="close_layer" onclick="$('#${popupId}').removeClass('M_on');$('#community-member-box').addClass('M_on');" type="button"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
			<form id="${popupId }-form" style="padding-right:15px;">
				<div class="cm_newwin_cont">
					<table class="tb_type1">
						<caption>회원 등록하기</caption>
						<tbody>
							<tr>
								<th scope="row">
									<label for="${popupId }-id"><span style="color:#f00;">*</span>아이디</label>
								</th>
								<td>
									<input type="text" id="${popupId }-id" name="id" style="width:100%;" data-null="false" data-max-length="30" data-error-message="'아이디'를 ">
								</td>
							</tr>
							<tr class="password-input-box">
								<th scope="row">
									<label for="${popupId }-pw"><span style="color:#f00;">*</span>비밀번호</label>
								</th>
								<td>
									<input type="text" id="${popupId }-pw" name="pw" style="width:100%;" data-null="false" data-error-message="'비밀번호'를 ">
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="${popupId }-nm">이름</label>
								</th>
								<td>
									<input type="text" id="${popupId }-nm" name="nm" style="width:100%;" data-max-length="30" data-error-message="'이름'을 ">
								</td>
							</tr>
						</tbody>
					</table>
					<div class="password-button-box" style="text-align: center;display:none;">
						<button id="${popupId }-change-password-button" class="btn" type="button" style="box-shadow: none;background: #3c0;color:#fff;">비밀번호 변경</button>
					</div>
				</div>
				<p class="Btn_Group">
					<button type="submit">등록완료</button>
				</p>
			</form>
		</div>
	</div>
	<c:set var="popupId" value="community-member-excel-regist"/>
	<div id="${popupId }" class="List_detail admin_member" data-layer="true">
		<div class="detail_box">
			<div style="padding-right:15px;">
				<h2>엑셀 업로드</h2>
				<button class="close_layer" onclick="$('#${popupId}').removeClass('M_on');$('#community-member-box').addClass('M_on');" type="button"><img src="${pageContext.request.contextPath}/img/community/btn_close_layer.png" alt="닫기"></button>
				<a href="${pageContext.request.contextPath}/upload/community/sample.xlsx" class="btn btn_write" style="line-height: 20px;">엑셀 양식 다운로드</a>
				<div class="file" style="padding: 50px 0 0 20px;margin-bottom: 30px;">
					<input class="file_input_textbox" style="margin:0 -1px 0 0; width:265px;float:left;" type="text" readonly="readonly">
					<div class="file_input_div">
						<input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display:none;">
						<button style="cursor:pointer;width:80px; margin-left:0px;" type="button" onclick="$(this).parent().find('input:file').click();">파일찾기</button>
					</div>
				</div>
				<div id="${popupId }-box" style="overflow: hidden; height: 300px; width: 373px;">
				</div>
				<p class="Btn_Group" style="display: none;">
					<button id="${popupId }-submit" type="button">등록완료</button>
				</p>
			</div>
		</div>
	</div>
</div>