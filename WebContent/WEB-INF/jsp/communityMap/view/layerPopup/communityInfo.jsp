<%
/**************************************************************************************************************************
* Program Name	 : 통계 소통지도 기본정보 JSP	
* File Name		 : communityInfo.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-10-04
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
<div class="cm_info_s cm_basic M_on">
	<h2>
		기본정보
		<c:choose>
			<c:when test="${communityMapInfo.temp_save_yn=='Y' }">
				<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_temp.png" alt="임시소통지도">
			</c:when>
			<c:when test="${s>n }">
				<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_wait.png" alt="대기소통지도">
			</c:when>
			<c:otherwise>
				<c:if test="${communityMapInfo.is_hot=='Y' }">
					<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_hot.png" alt="Hot소통지도">
				</c:if>
				<c:if test="${communityMapInfo.is_new=='Y' }">
					<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_new.png" alt="New소통지도">
				</c:if>
			</c:otherwise>
		</c:choose>
	</h2>
	<span class="cm_property">
		<c:choose>
			<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='A' }">
				<a href="javascript:void(0)" title="누구나 의견을 등록할 수 있습니다. 로그인이 필요 없습니다." style="cursor: default;">
					<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_all.png" alt="모든 사용자 의견등록 가능">
				</a>
			</c:when>
			<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='N' }">
				<a href="javascript:void(0)" title="로그인한 사용자 누구나 의견을 등록할 수 있습니다." style="cursor: default;">
					<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_login.png" alt="로그인 사용자 의견등록 가능" >
				</a>
			</c:when>
			<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='Y' }">
				<a href="javascript:void(0)" title="로그인 한 사용자가 개설자에게 승인 요청 후 개설자가 승인한 사용자만 의견을 등록할 수 있습니다." style="cursor: default;">
					<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_check.png" alt="개설자 승인 후 참여">
				</a>
			</c:when>
			<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='P' }">
				<a href="javascript:void(0)" title="개설자가 비밀번호를 설정하고, 비밀번호를 아는 사용자만 의견을 등록할 수 있습니다. 로그인이 필요 없습니다." style="cursor: default;">
					<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_pw.png" alt="비밀번호 입력">
				</a>
			</c:when>
			<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='M' }">
				<a href="javascript:void(0)" title="개설자가 소통지도 회원들의 아이디와 비밀번호를 미리 저장하고, 회원들은 지정받은 아이디와 비밀번호로 의견을 등록할 수 있습니다. 로그인이 필요 없습니다." style="cursor: default;">
					<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_onetime.png" alt="회원 일괄 등록">
				</a>
			</c:when>
		</c:choose>
<%-- 		<img src="${pageContext.request.contextPath}/img/community/cm_detail_icon_map.png" alt="정책연계지도"> --%>
	</span>
	<h3 id="cmmntyMapNm"><c:out value="${communityMapInfo.cmmnty_map_nm }"/></h3>
	<button class="btn_cm_more" type="button">기본정보 더보기</button>
	<span class="FaceImg" style="background-image:url(${pageContext.request.contextPath}${communityMapInfo.path_nm }/thumbnail/thumbnail-L-${communityMapInfo.save_file_nm });" onclick="window.open(location.origin+'${pageContext.request.contextPath}${communityMapInfo.path_nm }/${communityMapInfo.save_file_nm }','_blank');">대표이미지</span>
	<p class="cm_cont"><c:out value="${communityMapInfo.intrcn }"/></p>
	<table class="cm_detail_tb">
		<caption class="Hidden">개설기본정보</caption>
		<tr>
			<th>개설자</th>
			<td><c:out value="${communityMapInfo.usr_id }"/></td>
		</tr>
		<tr>
			<th>지역</th>
			<td id="cmmnty_location">
				<c:forEach items="${communityMapInfo.addAreaList }" var="region" varStatus="status">
				<!-- 
				style="${status.first?'M_on':''} 제거함
				 -->
					<a href="#" data-move="true" data-x-coor="${region.x_coor }" data-y-coor="${region.y_coor }" data-adm-cd="${region.adm_cd }" >
						<c:choose>
							<c:when test="${fn:length(region.adm_cd)>2 }">
								${region.addr }
							</c:when>
							<c:otherwise>
								${region.sido_nm }
							</c:otherwise>
						</c:choose>
					</a>
				</c:forEach>
			</td>
		</tr>
		<tr>
			<th>기간</th>
			<td>${communityMapInfo.prid_estbs_start_date } ~ ${communityMapInfo.prid_estbs_end_date }</td>
		</tr>
		<tr>
			<th>참여자</th>
			<td>${communityMapInfo.join_cnt }명</td>
		</tr>
	</table>
	<span class="cm_sns">
		<button id="share-facebook" type="button"><img src="${pageContext.request.contextPath}/img/community/cm_icon_facebook.png" alt="페이스북"></button>
		<button id="share-twitter" type="button"><img src="${pageContext.request.contextPath}/img/community/cm_icon_twitter.png" alt="트위터"></button>
	</span>
	<c:choose>
		<c:when test="${communityMapInfo.cmmnty_partcptn_grant_yn=='M'||communityMapInfo.cmmnty_partcptn_grant_yn=='P'||communityMapInfo.cmmnty_partcptn_grant_yn=='A' }">
			<button class="btn_comment" id="poi-register-button" name="btn_register" type="button">의견 등록하기</button>
		</c:when>
		<c:when test="${communityMapInfo.regist_yn=='Y' }">
			<button class="btn_comment" id="${fn:trim(member_id)==''?'poi-register-join-button':'poi-register-button'}" name="btn_register" type="button">의견 등록하기</button>
		</c:when>
		<c:when test="${communityMapInfo.regist_yn=='W' }">
			<button class="btn_comment" id="poi-register-wait-button" name="btn_register" type="button">의견 등록하기</button>
			<script>
				$("#poi-register-wait-button").click(function(){
					$communityMapCommon.alert("알림", "승인대기중입니다");
				});
			</script>
		</c:when>
		<c:otherwise>
			<button class="btn_comment" id="poi-register-join-button" name="btnPrtcpnt" type="button">소통지도 참여하기</button>
		</c:otherwise>
	</c:choose>
	<script>
		$("#poi-register-join-button").click(function(){
			var cancelButton = {
				title : "취소",
				fAgm : null,
				disable : false,
				func : function(opt) {}
			};
			<c:choose>
				<c:when test="${communityMapInfo.approval_distinct=='D' }">
					$communityMapCommon.confirm("알림", "\"${communityMapInfo.cmmnty_map_nm}\"은 제한된 멤버만 참여 가능합니다. 침여승인 반려되었습니다",[{
							title : "확인",
							fAgm : null,
							disable : false,
							func : function(opt) {}
						}]
			    	);
				</c:when>
				<c:when test="${fn:trim(member_id)==''}">
					$communityMapCommon.confirm("알림", "로그인이 필요합니다. 이동하시겠습니까?",[{
							title : "확인",
							fAgm : null,
							disable : false,
							func : function(opt) {
								location.href="/view/member/login_new?returnPage="+location.href;
							}
						},cancelButton]
			    	);
				</c:when>
				<c:otherwise>
					$communityMapCommon.confirm("알림", "참여승인 요청하시겠습니까?",[{
							title : "승인요청",
							fAgm : null,
							disable : false,
							func : function(opt) {
								$communityLeftMenu.ui.joinCommunity();
							}
						},cancelButton]
			    	);
				</c:otherwise>
			</c:choose>
		});
	</script>
</div>