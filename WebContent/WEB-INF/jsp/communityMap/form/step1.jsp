<%
/**************************************************************************************************************************
* Program Name	 : 통계소통지도 개설하기 step1 JSP	
* File Name		 : step1.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-10-12
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="isDisabled" value="${!(fn:length(command)==0||fn:trim(command.poi_cnt)==''||command.poi_cnt==0) }"/>
<div class="cm_step1">
	<div class="ImgSelect">
		<span id="imageView" class="ImgFace" style="<c:if test="${fn:trim(command.path_nm)!=''&&fn:trim(command.save_file_nm)!=''}">background-image: url(${command.path_nm}${command.save_file_nm})</c:if>">대표이미지</span>
		<label for="fileSearch">파일명</label>
		<input id="filePathField" type="text" readonly value="${command.ori_file_nm}" onclick="$('#fileSearch').click();">
		<button type="button" onclick="$('#fileSearch').click();">파일찾기</button>
		<input type="file" name="fileSearch" id="fileSearch" accept="image/*" style="display:none;">
		<input type="hidden" name="fileSearchSample">

		<p class="comment">
			*첨부 가능한 사진은 jpg, bmp, gif 입니다.<br> *5M 이상 파일은 첨부할 수 없습니다.<br> *이미지 사이즈 : 가로 250px, 세로 178px<br> *이미지가 없을 경우 아래의 이미지 중 선택하세요.
		</p>
		<ul id="main-image-sample" class="SampleImg">
			<c:forEach begin="1" end="12" varStatus="status">
				<li><a style="background-image:url(${pageContext.request.contextPath}/img/community/sample/${status.count }.png);" data-id="${status.count }">이미지${status.count }</a></li>
			</c:forEach>
		</ul>
	</div>
	<table class="cm_make_info">
		<caption>기본정보</caption>
		<tr>
			<th>
				<label for="cmmnty_map_nm">맵이름</label>
				<p id="cmmnty_map_nm_length" style="color:#bbb;font-size: 11px;">(<span>0</span>/26)</p>
			</th>
			<td>
				<input id="cmmnty_map_nm" name="cmmnty_map_nm" type="text" style="width:100%;" value="${command.cmmnty_map_nm }" data-null="false" data-max-length="26" data-error-message="'맵이름' ">
				<c:if test="${fn:trim(error.cmmnty_map_nm)!='' }">
					<div style="color:red;">
						${error.cmmnty_map_nm }
					</div>												
				</c:if>
			</td>
		</tr>
		<tr>
			<th>
				<label for="intrcn">맵소개</label>
				<p id="intrcn_length" style="color:#bbb;font-size: 11px;">(<span>0</span>/1300)</p>
			</th>
			<td>
				<textarea id="intrcn" name="intrcn" data-max-length="1300" data-error-message="'맵소개' ">${command.intrcn }</textarea>
				<c:if test="${fn:trim(error.intrcn)!='' }">
					<div style="color:red;">
						${error.intrcn }
					</div>							
				</c:if>	
			</td>
		</tr>
		<tr>
			<th style="padding-bottom: 20px;"><label for="sidoSelect">지역설정<br><span id="map-year-helper" style="font-size:11px;color:#aaa;"></span></label></th>
			<td style="padding-bottom: 20px;">
				<jsp:include page="/view/community/form/layerPopup/createAreaItem"/>
				<button id="add-area-button" class="cm_btn_add" type="button"><img src="${pageContext.request.contextPath}/img/community/cm_btn_add.png" alt="지역추가" title="지역추가"></button>
				<span class="comment_area">초기설정지역<a id="init-map-intro-tooltip" href="javascript:void(0)" title="초기설정지역은 소통지도의 초기화면에서 지도가 확대되어 보이는 지역입니다" style="padding-left:5px;"><img src="${pageContext.request.contextPath}/img/community/cm_btn_question.png" alt="?" style="margin-top: -1px;"></a></span>
				<div id="add-area-list">
					<c:forEach items="${areaList }" var="areas" varStatus="status">
						<c:set var="appendId" value="${status.count }" scope="request"/>
						<div id="add-area-list-box${appendId }" class="cm_area_box">
							<jsp:include page="/view/community/form/layerPopup/createAreaItem"/>
							<button title="삭제" class="cm_btn_add area-delete-button" type="button"><img src="/img/community/icon_x.png" alt="삭제" style="margin-left:1px;"></button>
						</div>
						<script>
							$communityForm.ui.getSidoList("${areas.sido_cd }","${areas.sgg_cd}","${areas.emdong_cd}","${status.count}");
						</script>
					</c:forEach>
				</div>
			</td>
		</tr>
		<tr>
			<th><label for="">기간설정</label></th>
			<td>
				<jsp:useBean id="now" class="java.util.Date" />
				<fmt:formatDate value="${now}" pattern="yyyy" var="year"/>
				<fmt:formatDate value="${now}" pattern="MM.dd" var="da"/>
				<fmt:formatDate value="${now}" pattern="yyyy.MM.dd" var="today"/>
				<c:set var="endDate">
					<c:choose>
						<c:when test="${fn:trim(command.prid_estbs_end_date)=='' }">
							${year+1 }.${da }
						</c:when>
						<c:otherwise>
							${command.prid_estbs_end_date }
						</c:otherwise>
					</c:choose>
				</c:set>
				<span class="Calendar">
				<input type="hidden" id="datePickP">
					<label for="startDate">기간설정 시작일</label>
					<input id="startDate" name="startDate" type="text" style="width:168px;" value="${fn:trim(command.prid_estbs_start_date)==''?today:command.prid_estbs_start_date }" data-null="false" data-error-message="'시작날짜' "><button type="button" class="callendar" id="s_DateIcon"><img alt="날짜선택" src="${pageContext.request.contextPath}/img/community/icon_callendar.png"></button>
				</span> ~
				<span class="Calendar">
					<label for="endDate">기간설정 종료일</label>
					<input id="endDate" name="endDate" type="text" style="width:168px;" value="${endDate }" data-null="false"  data-error-message="'종료날짜' "><button type="button" class="callendar" id="e_DateIcon"><img alt="날짜선택" src="${pageContext.request.contextPath}/img/community/icon_callendar.png"></button>
				</span>
				<c:if test="${fn:trim(error.prid_estbs_start_date)!='' }">
					<div style="color:red;">
						${error.prid_estbs_start_date }
					</div>												
				</c:if>
				<c:if test="${fn:trim(error.prid_estbs_end_date)!='' }">
					<div style="color:red;">
						${error.prid_estbs_end_date }
					</div>												
				</c:if>
			</td>
		</tr>
		<tr class="${isDisabled?'disabled':'' }">
			<c:set var="grantTooltip">
				<div class='grant-helper'>
			 		<div>
			 			<span class='title'>모든 사용자 의견등록 가능</span>
			 			<div class='grant-image'><img src='${pageContext.request.contextPath}/img/community/cm_comment_type1.png'></div>
			 			<div class='content'>누구나 의견을 등록할 수 있습니다.<span style='font-weight:bold;font-size: 12px !important;color:#4673a2;'>로그인이 필요 없습니다.</span></div>
		 			</div>
			 		<div>
			 			<span class='title'>로그인 사용자 의견등록 가능</span>
			 			<br>
			 			<div class='grant-image'><img src='${pageContext.request.contextPath}/img/community/cm_comment_type2.png'></div>
			 			<div class='content'><span style='font-weight:bold;font-size: 12px !important;'>로그인한 사용자</span> 누구나 의견을 등록할 수 있습니다.</div>
		 			</div>
			 		<div>
			 			<span class='title'>승인된 사용자 의견등록 가능</span>
			 			<div class='grant-image'><img src='${pageContext.request.contextPath}/img/community/cm_comment_type4.png'></div>
			 			<div class='content' style='border-bottom:1px solid #ddd;'><p style='font-weight: bold;font-size:13px !important;padding-bottom:5px;'>비밀번호 입력 </p>개설자가 비밀번호를 설정하고, 비밀번호를 아는 사용자만 의견을 등록할 수 있습니다.<span style='font-weight:bold;font-size: 12px !important;color:#4673a2;'> 로그인이 필요 없습니다.</span></div>
			 			<div class='grant-image'><img src='${pageContext.request.contextPath}/img/community/cm_comment_type5.png'></div>
			 			<div class='content' style='border-bottom:1px solid #ddd;'><p style='font-weight: bold;font-size:13px !important;padding-bottom:5px;'>회원 일괄 등록 </p>개설자가 소통지도 회원들의 아이디와 비밀번호를 미리 저장하고, 회원들은 지정받은 아이디와 비밀번호로 의견을 등록할 수 있습니다. <span style='font-weight:bold;font-size: 12px !important;color:#4673a2;'> 로그인이 필요 없습니다.</span></div>
			 			<div class='grant-image'><img src='${pageContext.request.contextPath}/img/community/cm_comment_type3.png'></div>
			 			<div class='content'><p style='font-weight: bold;font-size:13px !important;padding-bottom:5px;'>개설자 승인 후 참여</p> <span style='font-weight:bold;font-size: 12px !important;'> 로그인 한 사용자</span>가 개설자에게 승인 요청 후 개설자가 승인한 사용자만 의견을 등록할 수 있습니다.</div>
		 			</div>
				</div>
			</c:set>
			<th>의견등록<br>참여방법<br><a href="javascript:void(0)" id="grant-helper" title="${grantTooltip }" style="padding-left: 18px;"><img src="${pageContext.request.contextPath}/img/community/cm_btn_question.png" alt="?" style="margin-top: 8px;"></a></th>
			<td>
				<div id="grant-type" class="MakeType">
					<div class="type1 ${fn:trim(command)==''||command.cmmnty_partcptn_grant_yn=='A'?'M_on':''}"><input name="grant_yn" type="radio" value="A" style="display:none;" ${fn:trim(command)==''||command.cmmnty_partcptn_grant_yn=='A'?'checked="checked"':''}><span class="title">모든 사용자<br>의견등록 가능</span></div>
					<div class="type2 ${command.cmmnty_partcptn_grant_yn=='N'?'M_on':''}"><input name="grant_yn" type="radio" value="N" style="display:none;" ${command.cmmnty_partcptn_grant_yn=='N'?'checked="checked"':''}><span class="title">로그인 사용자<br>의견등록 가능</span></div>
					<c:set var="is_type3" value="${command.cmmnty_partcptn_grant_yn=='Y'||command.cmmnty_partcptn_grant_yn=='P'||command.cmmnty_partcptn_grant_yn=='M'}"/>
					<div class="type3 ${is_type3?'M_on':''}">
						<input name="grant_yn" id="grant_yn_s" type="radio" value="${is_type3?command.cmmnty_partcptn_grant_yn:'P' }" ${is_type3?'checked=="checked"':'' } style="display:none;">
						<span class="title">승인된 사용자 의견등록 가능</span>
						<ul>
							<li style="padding-bottom: 5px;">
								<input type="hidden" name="pwdyn" id="pwdyn" value="${command.pwdyn }">
								<label><input name="grant_yn_s" type="radio" value="P" ${fn:trim(command)==''||!is_type3||command.cmmnty_partcptn_grant_yn=='P'?'checked="checked"':''}>비밀번호 입력</label>
								<label for="pw" class="Hidden">비밀번호입력</label>
								<input id="pwdchk" type="password" name="pwdchk" style="${command.cmmnty_partcptn_grant_yn=='P'?'display:none;':''}" ${isDisabled?'disabled="disabled"':'' }>
								<c:if test="${command.cmmnty_partcptn_grant_yn=='P'||fn:trim(error.pwdchk)!=''}">
									<button id="change-password-cancel-button" class="cancel" type="button" style="display:none;">취소</button>
									<button id="change-password-button" type="button">비밀번호 변경</button>
								</c:if>
							</li>
							<li style="padding-bottom: 8px;"><label><input name="grant_yn_s" type="radio" value="M" ${command.cmmnty_partcptn_grant_yn=='M'?'checked="checked"':''}>회원 일괄 등록</label></li>
							<li><label><input name="grant_yn_s" type="radio" value="Y" ${command.cmmnty_partcptn_grant_yn=='N'?'checked="checked"':''}>개설자 승인 후 참여</label></li>
						</ul>
						<span id="grant_yn_s_face" class="Img type3_<c:choose><c:when test="${fn:trim(command)==''||command.cmmnty_partcptn_grant_yn=='P' }">1</c:when><c:when test="${command.cmmnty_partcptn_grant_yn=='M' }">2</c:when><c:when test="${command.cmmnty_partcptn_grant_yn=='N' }">3</c:when></c:choose>">아이콘</span>
					</div>
				</div>
			</td>
		</tr>
		<tr class="${isDisabled?'disabled':'' }">
			<th><label for="">등록아이콘<br>선택</label></th>
			<td>
				<div id="symbol-box" class="SelectIcon_new2">
					<ul id="symbol-tab" class="i_menu">
						<li class="${fn:trim(command)==''||command.reg_symbol=='a'||command.reg_symbol=='e'?'M_on':'' }"><a href="#">5레벨아이콘</a></li>
						<li class="${command.reg_symbol=='b'?'M_on':'' }"><a href="#">3레벨아이콘</a></li>
						<li class="${command.reg_symbol=='c'?'M_on':'' }"><a href="#">2레벨아이콘</a></li>
						<li class="${command.reg_symbol=='d'?'M_on':'' }"><a href="#">사용자 선택 아이콘</a></li>
						<li class="${fn:trim(command)!=''&&fn:trim(command.reg_symbol)==''?'M_on':'' }"><a href="#">사용자 정의 아이콘</a></li>
					</ul>
					<div class="i_box i_box1 ${fn:trim(command)==''||command.reg_symbol=='a'||command.reg_symbol=='e'?'M_on':'' }">
						<div class="i_box_cont">
							<div class="i_box_choose ${fn:trim(command)==''||command.reg_symbol=='a'?'':'disabled' }">
								<input name="symbol" type="radio" value="a" ${fn:trim(command.reg_symbol)==''||command.reg_symbol=='a'?'checked="checked"':'' }/>
								<c:set var="aTypeNameMap" value="<%=new java.util.HashMap()%>" />
								<c:set target="${aTypeNameMap}" property="1" value="${command.reg_symbol=='a'&&fn:trim(custom_symbol_map['1'].label_nm)!=''?custom_symbol_map['1'].label_nm:'매우좋음' }"/>
								<c:set target="${aTypeNameMap}" property="2" value="${command.reg_symbol=='a'&&fn:trim(custom_symbol_map['2'].label_nm)!=''?custom_symbol_map['2'].label_nm:'좋음' }"/>
								<c:set target="${aTypeNameMap}" property="3" value="${command.reg_symbol=='a'&&fn:trim(custom_symbol_map['3'].label_nm)!=''?custom_symbol_map['3'].label_nm:'보통' }"/>
								<c:set target="${aTypeNameMap}" property="4" value="${command.reg_symbol=='a'&&fn:trim(custom_symbol_map['4'].label_nm)!=''?custom_symbol_map['4'].label_nm:'나쁨' }"/>
								<c:set target="${aTypeNameMap}" property="5" value="${command.reg_symbol=='a'&&fn:trim(custom_symbol_map['5'].label_nm)!=''?custom_symbol_map['5'].label_nm:'매우나쁨' }"/>
								<c:forEach begin="1" end="5" varStatus="status">
									<c:set var="aTypeName">${status.count }</c:set>
									<input type="hidden" name="iconSetRadio" value="${status.count }" ${fn:trim(command.reg_symbol)==''||command.reg_symbol=='a'?'':'disabled="disabled"' }/>
									<label for="symbol-a-${status.count }"><img src="${pageContext.request.contextPath}/img/community/iconset_a${status.count }.png" alt="${aTypeNameMap[aTypeName] }"></label><input id="symbol-a-${status.count }" name="iconSetRadioName" type="text" value="${aTypeNameMap[aTypeName] }" ${fn:trim(command.reg_symbol)==''||command.reg_symbol=='a'?'':'disabled="disabled"' }>
								</c:forEach>
							</div>
							<div class="i_box_choose  ${command.reg_symbol=='e'?'':'disabled' }">
								<input name="symbol" type="radio" value="e" ${command.reg_symbol=='e'?'checked="checked"':'' }/>
								<c:set var="eTypeNameMap" value="<%=new java.util.HashMap()%>" />
								<c:set target="${eTypeNameMap}" property="1" value="${command.reg_symbol=='e'&&fn:trim(custom_symbol_map['1'].label_nm)!=''?custom_symbol_map['1'].label_nm:'종류1' }"/>
								<c:set target="${eTypeNameMap}" property="2" value="${command.reg_symbol=='e'&&fn:trim(custom_symbol_map['2'].label_nm)!=''?custom_symbol_map['2'].label_nm:'종류2' }"/>
								<c:set target="${eTypeNameMap}" property="3" value="${command.reg_symbol=='e'&&fn:trim(custom_symbol_map['3'].label_nm)!=''?custom_symbol_map['3'].label_nm:'종류3' }"/>
								<c:set target="${eTypeNameMap}" property="4" value="${command.reg_symbol=='e'&&fn:trim(custom_symbol_map['4'].label_nm)!=''?custom_symbol_map['4'].label_nm:'종류4' }"/>
								<c:set target="${eTypeNameMap}" property="5" value="${command.reg_symbol=='e'&&fn:trim(custom_symbol_map['5'].label_nm)!=''?custom_symbol_map['5'].label_nm:'종류5' }"/>
								<c:forEach begin="1" end="5" varStatus="status">
									<c:set var="eTypeName">${status.count }</c:set>
									<input type="hidden" name="iconSetRadio" value="${status.count }" ${command.reg_symbol=='e'?'':'disabled="disabled"' }/>
									<label for="symbol-e-${status.count }"><img src="${pageContext.request.contextPath}/img/community/iconset_e${status.count }.png" alt="${eTypeNameMap[eTypeName] }"></label><input id="symbol-e-${status.count }" name="iconSetRadioName" type="text" value="${eTypeNameMap[eTypeName] }" ${command.reg_symbol=='e'?'':'disabled="disabled"' }>
								</c:forEach>
							</div>
						</div>
					</div>
					<div class="i_box i_box2 ${command.reg_symbol=='b'||command.reg_symbol=='f'?'M_on':'' }">
						<div class="i_box_cont">
							<div class="i_box_choose  ${command.reg_symbol=='b'?'':'disabled' }">
								<input name="symbol" type="radio" value="b" ${command.reg_symbol=='b'?'checked="checked"':'' }/>
								<c:set var="bTypeNameMap" value="<%=new java.util.HashMap()%>" />
								<c:set target="${bTypeNameMap}" property="1" value="${command.reg_symbol=='b'&&fn:trim(custom_symbol_map['1'])!=''?custom_symbol_map['1'].label_nm:'좋음' }"/>
								<c:set target="${bTypeNameMap}" property="2" value="${command.reg_symbol=='b'&&fn:trim(custom_symbol_map['2'])!=''?custom_symbol_map['2'].label_nm:'보통' }"/>
								<c:set target="${bTypeNameMap}" property="3" value="${command.reg_symbol=='b'&&fn:trim(custom_symbol_map['3'])!=''?custom_symbol_map['3'].label_nm:'나쁨' }"/>
								<c:forEach begin="1" end="3" varStatus="status">
									<c:set var="bTypeName">${status.count }</c:set>
									<input type="hidden" name="iconSetRadio" value="${status.count }" ${command.reg_symbol=='b'?'':'disabled="disabled"' }/>
									<label for="symbol-b-${status.count }"><img src="${pageContext.request.contextPath}/img/community/iconset_b${status.count }.png" alt="${bTypeNameMap[bTypeName] }"></label><input id="symbol-b-${status.count }" name="iconSetRadioName" type="text" value="${bTypeNameMap[bTypeName] }" ${command.reg_symbol=='b'?'':'disabled="disabled"' }>
								</c:forEach>
							</div>
							<div class="i_box_choose  ${command.reg_symbol=='f'?'':'disabled' }">
								<input name="symbol" type="radio" value="f" ${command.reg_symbol=='f'?'checked="checked"':'' }/>
								<c:set var="fTypeNameMap" value="<%=new java.util.HashMap()%>" />
								<c:set target="${fTypeNameMap}" property="1" value="${command.reg_symbol=='f'&&fn:trim(custom_symbol_map['1'])!=''?custom_symbol_map['1'].label_nm:'종류1' }"/>
								<c:set target="${fTypeNameMap}" property="2" value="${command.reg_symbol=='f'&&fn:trim(custom_symbol_map['2'])!=''?custom_symbol_map['2'].label_nm:'종류2' }"/>
								<c:set target="${fTypeNameMap}" property="3" value="${command.reg_symbol=='f'&&fn:trim(custom_symbol_map['3'])!=''?custom_symbol_map['3'].label_nm:'종류3' }"/>
								<c:forEach begin="1" end="3" varStatus="status">
									<c:set var="fTypeName">${status.count }</c:set>
									<input type="hidden" name="iconSetRadio" value="${status.count }" ${command.reg_symbol=='f'?'':'disabled="disabled"' }/>
									<label for="symbol-f-${status.count }"><img src="${pageContext.request.contextPath}/img/community/iconset_f${status.count }.png" alt="${fTypeNameMap[fTypeName] }"></label><input id="symbol-f-${status.count }" name="iconSetRadioName" type="text" value="${fTypeNameMap[fTypeName] }" ${command.reg_symbol=='f'?'':'disabled="disabled"' }>
								</c:forEach>
							</div>
						</div>
					</div>
					<div class="i_box i_box3 ${command.reg_symbol=='c'||command.reg_symbol=='g'?'M_on':'' }">
						<div class="i_box_cont">
							<div class="i_box_choose  ${command.reg_symbol=='c'?'':'disabled' }">
								<input name="symbol" type="radio" value="c" ${command.reg_symbol=='c'?'checked="checked"':'' }/>
								<c:set var="cTypeNameMap" value="<%=new java.util.HashMap()%>" />
								<c:set target="${cTypeNameMap}" property="1" value="${command.reg_symbol=='c'&&fn:trim(custom_symbol_map['1'].label_nm)!=''?custom_symbol_map['1'].label_nm:'좋음' }"/>
								<c:set target="${cTypeNameMap}" property="2" value="${command.reg_symbol=='c'&&fn:trim(custom_symbol_map['2'].label_nm)!=''?custom_symbol_map['2'].label_nm:'나쁨' }"/>
								<c:forEach begin="1" end="2" varStatus="status">
									<c:set var="cTypeName">${status.count }</c:set>
									<input type="hidden" name="iconSetRadio" value="${status.count }" ${command.reg_symbol=='c'?'':'disabled="disabled"' }/>
									<label for="symbol-c-${status.count }"><img src="${pageContext.request.contextPath}/img/community/iconset_c${status.count }.png" alt="${cTypeNameMap[cTypeName] }"></label><input id="symbol-c-${status.count }" name="iconSetRadioName" type="text" value="${cTypeNameMap[cTypeName] }" ${command.reg_symbol=='c'?'':'disabled="disabled"' }>
								</c:forEach>
							</div>
							<div class="i_box_choose  ${command.reg_symbol=='g'?'':'disabled' }">
								<input name="symbol" type="radio" value="g" ${command.reg_symbol=='g'?'checked="checked"':'' }/>
								<c:set var="gTypeNameMap" value="<%=new java.util.HashMap()%>" />
								<c:set target="${gTypeNameMap}" property="1" value="${command.reg_symbol=='g'&&fn:trim(custom_symbol_map['1'].label_nm)!=''?custom_symbol_map['1'].label_nm:'종류1' }"/>
								<c:set target="${gTypeNameMap}" property="2" value="${command.reg_symbol=='g'&&fn:trim(custom_symbol_map['2'].label_nm)!=''?custom_symbol_map['2'].label_nm:'종류2' }"/>
								<c:forEach begin="1" end="2" varStatus="status">
									<c:set var="gTypeName">${status.count }</c:set>
									<input type="hidden" name="iconSetRadio" value="${status.count }" ${command.reg_symbol=='g'?'':'disabled="disabled"' }/>
									<label for="symbol-g-${status.count }"><img src="${pageContext.request.contextPath}/img/community/iconset_g${status.count }.png" alt="${gTypeNameMap[gTypeName] }"></label><input id="symbol-g-${status.count }" name="iconSetRadioName" type="text" value="${gTypeNameMap[cTypeName] }" ${command.reg_symbol=='g'?'':'disabled="disabled"' }>
								</c:forEach>
							</div>
						</div>
					</div>
					<div class="i_box i_box4 ${command.reg_symbol=='d'?'M_on':'' }">
						<input name="symbol" type="radio" value="d" style="display:none;" ${command.reg_symbol=='d'?'checked="checked"':'' }/>
						<div class="i_box_cont">
							<c:set var="dTypeNameMap" value="<%=new java.util.HashMap()%>" />
							<c:set target="${dTypeNameMap}" property="1" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['1'].label_nm)!=''?custom_symbol_map['1'].label_nm:'체크' }"/>
							<c:set target="${dTypeNameMap}" property="2" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['2'].label_nm)!=''?custom_symbol_map['2'].label_nm:'표적지' }"/>
							<c:set target="${dTypeNameMap}" property="3" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['3'].label_nm)!=''?custom_symbol_map['3'].label_nm:'별' }"/>
							<c:set target="${dTypeNameMap}" property="4" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['4'].label_nm)!=''?custom_symbol_map['4'].label_nm:'압정' }"/>
							<c:set target="${dTypeNameMap}" property="5" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['5'].label_nm)!=''?custom_symbol_map['5'].label_nm:'전구' }"/>
							<c:set target="${dTypeNameMap}" property="6" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['6'].label_nm)!=''?custom_symbol_map['6'].label_nm:'볼거리' }"/>
							<c:set target="${dTypeNameMap}" property="7" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['7'].label_nm)!=''?custom_symbol_map['7'].label_nm:'개선점' }"/>
							<c:set target="${dTypeNameMap}" property="8" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['8'].label_nm)!=''?custom_symbol_map['8'].label_nm:'편의시설' }"/>
							<c:set target="${dTypeNameMap}" property="9" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['9'].label_nm)!=''?custom_symbol_map['9'].label_nm:'쓰레기' }"/>
							<c:set target="${dTypeNameMap}" property="10" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['10'].label_nm)!=''?custom_symbol_map['10'].label_nm:'불법주차' }"/>
							<c:set target="${dTypeNameMap}" property="11" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['11'].label_nm)!=''?custom_symbol_map['11'].label_nm:'기타' }"/>
							<c:set target="${dTypeNameMap}" property="12" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['12'].label_nm)!=''?custom_symbol_map['12'].label_nm:'아이콘' }"/>
							<c:set target="${dTypeNameMap}" property="13" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['13'].label_nm)!=''?custom_symbol_map['13'].label_nm:'아이콘' }"/>
							<c:set target="${dTypeNameMap}" property="14" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['14'].label_nm)!=''?custom_symbol_map['14'].label_nm:'아이콘' }"/>
							<c:set target="${dTypeNameMap}" property="15" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['15'].label_nm)!=''?custom_symbol_map['15'].label_nm:'아이콘' }"/>
							<c:set target="${dTypeNameMap}" property="16" value="${command.reg_symbol=='d'&&fn:trim(custom_symbol_map['16'].label_nm)!=''?custom_symbol_map['16'].label_nm:'아이콘' }"/>
							<ul>
								<c:forEach begin="1" end="16" varStatus="status">
									<c:set var="dTypeName">${status.count }</c:set>
									<c:set var="dTypeChecked">
										<c:choose>
											<c:when test="${command.reg_symbol=='d' }">
												<c:if test="${fn:trim(custom_symbol_map[dTypeName])!='' }">
													checked="checked"
												</c:if>
											</c:when>
											<c:otherwise>
												<c:if test="${status.first }">
													checked="checked"
												</c:if>
											</c:otherwise>
										</c:choose>
									</c:set>
									<c:set var="dTypeDisabled">
										<c:choose>
											<c:when test="${command.reg_symbol=='d' }">
												<c:if test="${fn:trim(custom_symbol_map[dTypeName])=='' }">
													disabled="disabled"
												</c:if>
											</c:when>
											<c:otherwise>
												disabled="disabled"
											</c:otherwise>
										</c:choose>
									</c:set>
									<li>
										<label>
											<input data-id="symbol-d-${status.count }" name="iconSetRadio" type="checkbox" value="${status.count }" ${dTypeChecked } ${command.reg_symbol=='d'?'':dTypeDisabled }>
											<span><img src="${pageContext.request.contextPath}/img/community/iconset_d${status.count }.png" alt="${dTypeNameMap[dTypeName] }"></span>
										</label>
										<label><input name="iconSetRadioName" type="text" id="symbol-d-${status.count }" value="${dTypeNameMap[dTypeName] }" ${dTypeDisabled }></label>
									</li>
								</c:forEach>
							</ul>
						</div>
					</div>
					<div class="i_box i_box5 ${fn:trim(command)!=''&&fn:trim(command.reg_symbol)==''?'M_on':'' }">
						<div class="i_box_cont i_box_list M_on">
							<div class="i_detail">
								<ul id="custom-group-list">
								</ul>
							</div>
							<c:if test="${fn:length(command)==0||fn:trim(command.poi_cnt)==''||command.poi_cnt==0 }">
								<button id="create-custom-icon-button" class="i_btn_make" type="button">만들기</button>
							</c:if>
						</div>
						<div class="i_box_cont i_box_make">
							<div class="i_detail">
								<div id="file-list" style="display: none;">
									<input type="file" name="customSymbolFile" accept="image/*" style="display:none;">
								</div>
								<dl class="i_box_bagic">
									<dt><label for="create_custom_symbol_group_nm">그룹 이름</label></dt>
									<dd><input type="text" id="create_custom_symbol_group_nm" name="custom_symbol_group_nm" placeholder="그룹명을 작성해주세요"><button id="choose-file-button" class="i_btn_file" type="button" title="아이콘 최적의 사이즈는 가로 23px 세로 28px 입니다">아이콘 추가</button></dd>
								</dl>
								<ul class="i_icon_list"></ul>
								<button class="i_btn_list" type="button" onclick='$(".i_box5 .i_box_cont").removeClass("M_on");$(".i_box5 .i_box_cont.i_box_list").addClass("M_on");'>목록</button>
								<div class="i_btn_group">
									<button id="create-button" type="button">만들기</button>
								</div>
							</div>
						</div>
						<div class="i_box_cont i_box_modify ">
							<div class="i_detail">
								<div id="add-symbol-list" style="display:none;">
									<input type="file" name="customSymbolFile" accept="image/*" style="display:none;">
								</div>
								<dl class="i_box_bagic">
									<dt><label for="modify_custom_symbol_group_nm">그룹 이름</label></dt>
									<dd><input id="modify_custom_symbol_group_nm" name="custom_symbol_group_nm" type="text" placeholder="그룹명을 작성해주세요"></dd>

								</dl>
								<ul class="i_icon_list"></ul>
								<button class="i_btn_list" type="button" onclick='$(".i_box5 .i_box_cont").removeClass("M_on");$(".i_box5 .i_box_cont.i_box_list").addClass("M_on");'>목록</button>
								<div class="i_btn_group">
									<button type="button" id="modify-symbol-group-button">그룹수정</button>
									<button type="button" id="remove-symbol-group-button">그룹삭제</button>
									<button type="button" id="add-symbol-button" title="아이콘 최적의 사이즈는 가로 23px 세로 28px 입니다">아이콘추가</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<span class="cm_info_text">* 아이콘 라벨을 수정할 수 있습니다.</span>
			</td>
		</tr>
		<tr>
			<th><label for="">태그달기</label></th>
			<td>
				<input id="kwrd" name="kwrd" type="text" style="width:100%;" value="${command.kwrd }">
				<span class="cm_info_text">
					* 태그와 태그는 쉼표로 구분하며 5개까지 입력할 수 있습니다.<br>
					* 키워드는 한단어로 입력하세요.
				</span>
				${error.kwrd }
			</td>
		</tr>
	</table>
</div>
