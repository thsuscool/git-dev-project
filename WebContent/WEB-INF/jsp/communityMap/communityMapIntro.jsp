<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>통계소통지도</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/nm.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui-1.10.4.custom.css">
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/ui.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/html5shiv.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/sop.portal.absAPI.js"></script>
<%-- 	<link rel="shortcut icon" href="${pageContext.request.contextPath}/img/ico/n_favicon.png"/> --%>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/communityMap.css" />
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/communityCommon.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/communityIntro.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/communityTutorial.js"></script>
	<link rel="stylesheet" href="/css/tutorial/tutorial.css">
	<c:if test="${writeAble==true }">
		<script src="${pageContext.request.contextPath}/js/board/jquery.paging.js"></script>
		<script src="${pageContext.request.contextPath}/js/communityMap/communityRecommendStats.js"></script>
	</c:if>
	<c:if test="${conOrgan&&fn:trim(param.scu)!='' }">
		<script>
			var communityLogoutFailCnt = 0;
			function getSession(auth){
				if(auth.authStatus){
					communityLogout();
				}else{
					$.ajax({
						url : contextPath+"/view/community/organUser",
						type:"POST",
						data: {
							scu:"${param.scu}",
							organ:"${param.organ}"
						},
						async: false,
						dataType:"json",
						success: function(res){
							if(res.errCd=="0"){
								$.ajax({
									url : contextPath+"/ServiceAPI/member/login.json",
									type:"POST",
									data: {
										member_id:"${organ_scu}",
										pw:"${organ_scu}1234!@#$"
									},
									async: false,
									dataType:"json",
									success: function(res){
										location.href = "/view/community/intro?organ=${param.organ}"+$communityMapCommon.addQuery(["organ","scu"]);
									},
									error: function(data){
										$("body").show();
										$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.",function(){
											location.href = "/view/community/intro?organ=${param.organ}";
										});
										return false;
									}
								});
							}else{
								location.href = "/view/community/intro?organ=${param.organ}"+$communityMapCommon.addQuery(["organ","scu"]);
							}
						},
						error: function(data){
							$("body").show();
							$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.",function(){
								location.href = "/view/community/intro?organ=${param.organ}"+$communityMapCommon.addQuery(["organ","scu"]);
							});
							return false;
						}
					});
				}
			}
			function communityLogout(){
				try{
					memberLogout("/view/community/intro?organ=${param.organ}&scu=${param.scu}"+$communityMapCommon.addQuery(["organ","scu"]));
				}catch(e){
					console.warn(e);
					communityLogoutFailCnt++
					setTimeout(function(){
						if(communityLogoutFailCnt<10){
							communityLogout();
						}
					},1000);
				}
			}
		</script>
	</c:if>
	<script>
		$(function(){
			//mng_s 20180412_김건민
//			if(getCookie("confirmMsg") == ""){
//				readyTutorial();
//			}
			//mng_e 20180412_김건민
   			if($(location).attr('search').match("tutorial_mode")){
				startTutorial();
   			}
		})

	</script>
</head>

<body <c:if test="${conOrgan&&fn:trim(param.scu)!='' }">style="display:none;"</c:if>>
	<div id="wrap">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		<div id="container">
			<div id="contents">
				<div id="content">
					<div class="CM_new CM_index">
						<h2>지역현안 해결을 위한 <strong>통계소통지도</strong><span>여러분이 생활하는 지역의 소소한 이야기를 지도에 그려보는 공간입니다.</span></h2>
						<div class="CM_Left">
							<div class="SearchArea">
								<form id="community-search-form">
									<p class="SearchList">
										<label for="community_search_word">검색어입력</label><input id="community_search_word" name="search_word" type="text">
										<button type="submit">목록검색</button>
									</p>
								</form>
								<form id="community-sort-form">
									<p class="SearchType">
<!-- 										<label for="community-first-sort" class="Hidden">우선정렬선택</label> -->
<!-- 										<select id="community-first-sort" size="1"> -->
<!-- 			                              <option value="Default" selected>우선정렬선택</option> -->
<!-- 			                              <option value="hot">Hot 소통지도</option> -->
<!-- 			                              <option value="newest">New 소통지도</option> -->
<!-- 			                              <option value="open">개방형 소통지도</option> -->
<!-- 			                              <option value="enclosed">폐쇄형 소통지도</option> -->
<%-- 			                              <c:if test="${fn:trim(member_id)!='' }"> --%>
<!-- 				                              <option value="my">내가만든 소통지도</option> -->
<!-- 				                              <option value="temp">임시저장 소통지도</option> -->
<%-- 			                              </c:if> --%>
<!-- 			                            </select> -->
										<label for="community-second-sort" class="Hidden">정렬방법선택</label>
										<select id="community-second-sort" size="1">
			                              <option value="Default" selected>정렬방법선택</option>
			                              <option value="title_asc">소통지도명</option>
<!-- 			                              <option value="title_desc">소통지도명 역순</option> -->
<!-- 			                              <option value="">페이지뷰</option> -->
			                              <option value="data_desc">자료건수</option>
			                              <option value="date_desc">등록일</option>
<!-- 			                              <option value="date_desc">등록일 역순</option> -->
			                              <option value="mod_desc">수정일</option>
			                            </select>
										<button type="submit">적용</button>
									</p>
								</form>
							</div>
							<div class="CM_List">
								<div id="community-list"></div>
								<a href="#" id="list-more-button" class="ListMore" style="display:none;">더보기 (0/0)</a>
							</div>
						</div>
						<div class="CM_Right">
							<c:choose>
								<c:when test="${conOrgan&&fn:trim(member_id)=='' }">
									<button id="organ-anonymous-create-community-button" class="btn_mapmake" type="button">통계소통지도 만들기</button>
								</c:when>
								<c:otherwise>
									<c:url var="formUrl" value="/view/community/form">
										<c:forEach var="parameterItem" items="${param }">
											<c:if test="${parameterItem.key!='cmmnty_map_id' }">
												<c:param name="${parameterItem.key }" value="${parameterItem.value }"/>
											</c:if>
										</c:forEach>
									</c:url>
									<c:url var="makeUrl" value="/view/community/auth">
										<c:param name="returnPage" value="${formUrl }"/>
									</c:url>
									<button class="btn_mapmake" onclick="location.href='${makeUrl}'" type="button">통계소통지도 만들기</button>
								</c:otherwise>
							</c:choose>
							<div style="padding-bottom: 22px;">
								<!-- mng_s 20180412_김건민 -->
								<!-- <img id="tuto_start_btn" src="/img/tutorial/community/tuto_start_btn.png" alt="튜토리얼시작" style="cursor:pointer; display:block; margin-bottom:10px;" onclick="readyTutorial();" title="사용법 따라하기"> -->
								<button type="button" id="tuto_start_btn" style="   border-radius: 12px;	background-color: #1dab8f; font-size: 12px; color: #ffffff; line-height: 19px; height: 24px; width: 200px; top:167px;  padding-right: 117px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="readyTutorial();" title="사용법 따라하기">튜토리얼</button>
								<!-- mng_e 20180412_김건민 -->
							</div> 
							<div class="ListHot">
								<h3><strong>Hot</strong> 소통지도</h3>
								<ul id="hot-community-list"></ul>
							</div>
							<div class="ListNew">
								<h3>최신 소통지도</h3>
								<ul id="new-community-list"></ul>
							</div>
							<div class="ListNotice">
								<h3>공지사항</h3>
								<ul id="notice-list"></ul>
							</div>
							<div class="Gomenu">
								<a href="${pageContext.request.contextPath}/view/newhelp/community_help_1">통계소통지도 소개</a>
								<a href="${pageContext.request.contextPath}/view/newhelp/community_help_3_1">이용안내</a>
								<c:if test="${writeAble==true }">
									<a href="#" id="recommend-button" class="recommend">추천통계</a>
								</c:if>
								<p class="QR">
										<img src="/img/pic/0jx8W.png" alt="모바일소통지도 QR code">
									모바일로 통계소통지도를 이용하실 수 있습니다.
								</p>
							</div>
						</div>
					</div>
					<c:if test="${writeAble==true }">
						<div id="recommend-stats" class="popup_recommend" style="display:none;">
							<div class="popupCont">
								<h1>통계소통지도 목록</h1>
								<button class="btn_close" type="button" onclick="$('.popup_recommend').hide();"><img src="http://sgis.kostat.go.kr/img/community/btn_close_layer.png" alt="닫기"></button>
								<div class="recommend_List">
									<form>
										<fieldset class="ListSearch">
											<legend>목록검색</legend>
											<label for="recommend-stats-search-type">검색타입</label>
											<select id="recommend-stats-search-type" name="search_type">
												<option selected="selected">전체</option>
												<option value="cmmnty_map_nm">소통지도명</option>
												<option value="usr_id">개설자</option>
											</select>
											<label for="recommend-stats-search-word">검색어</label>
											<input type="text" id="recommend-stats-search-word" name="search_word">
											<button type="submit">검색</button>
										</fieldset>
									</form>
									<table class="TB_02">
										<caption>통계소통지도 목록</caption>
										<colgroup>
											<col style="width:145px;">
											<col style="width:auto;">
											<col style="width:80px;">
											<col style="width:80px;">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">소통지도 타입</th>
												<th scope="col">소통지도 명</th>
												<th scope="col">개설자</th>
												<th scope="col">개설일</th>
											</tr>
										</thead>
										<tbody id="recommend-stats-list"></tbody>
									</table>
									<div id="recommend-stats-paging" class="pagenation1" align="center" style="width: 100%;">
										<span class="pages"> <a href="" class="page">1</a></span>
									</div>
								</div>
							</div>
						</div>
						<div id="recommend-stats-bookmark" class="popup_recommend" style="display:none;">
							<div class="popupCont">
								<h1>추천통계</h1>
								<button class="btn_close" type="button" onclick="$('.popup_recommend').hide();"><img src="http://sgis.kostat.go.kr/img/community/btn_close_layer.png" alt="닫기"></button>
								<div class="recommend_set">
									<div class="setList">
										<h2>즐겨찾기</h2>
										<table class="TB_02">
											<caption>즐겨찾기 목록</caption>
											<thead>
												<tr>
													<th scope="col"><input type="checkbox" id="bookmark-all"><label for="bookmark-all">전체선택</label></th>
													<th scope="col">색지도명</th>
												</tr>
											</thead>
											<tbody id="recommend-stats-bookmark-list"></tbody>
										</table>
									</div>
						
									<div class="btn_set">
										<button id="recommend-add" type="button" title="지역현안 소통지도로 이동">추가▶</button>
										<button id="recommend-delete" type="button" title="즐겨찾기로 이동">◀삭제</button>
									</div>
						
									<div class="setList">
										<h2 id="recommend-stats-bookmark-name">통계청 소통지도</h2>
										<table class="TB_02">
											<caption>통계청 소통지도 추천통계</caption>
											<thead>
												<tr>
													<th scope="col"><input type="checkbox" id="recommend-all"><label for="recommend-all">전체선택</label></th>
													<th scope="col">색지도명</th>
												</tr>
											</thead>
											<tbody id="recommend-stats-bookmark-map-list"></tbody>
										</table>
									</div>
								</div>
								<div class="Btn_Group">
									<button type="button" id="recommend-submit">적용</button>
									<button type="button" id="recommend-reset">초기화</button>
								</div>
						
							</div>
						</div>
					</c:if>
				</div>
			</div>
		</div>
		<div class="tutorialWrapper" style= "display: none" draggable="false">
			<div style="position:relative; margin:0 auto; padding-bottom:23px; max-width:960px; min-width: 970px; padding-top:20px;">
				<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
					<div id="tutorialText" draggable="false">
						<!-- mng_s 20180412_김건민 -->
						<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
						<!-- mng_e 20180412_김건민 -->
					</div>
				</div>
				<img id="comm_9" src="/img/tutorial/community/comm_9.png" alt="통계소통지도 만들기" style="display:none; margin-top:82px; margin-right:-3px; float:right; border:3px outset red; cursor:pointer;" draggable="false">
				<img id="comm_0" src="/img/tutorial/community/comm_0.png" alt="소통지도 리스트" style="display:none; margin-top:143px; margin-left:-3px; border:3px outset red; cursor:pointer; position:absolute;" draggable="false">
				<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
		 		<!-- <img id="tuto_end_btn" src="/img/tutorial/community/tuto_end_btn.png" style="cursor:pointer; display:block; position:absolute; left:770px; top:291px; z-index:10003;" onclick="closeTutorial();" draggable="false" alt="튜토리얼 종료"> -->
		 		<!-- mng_s 20180411_김건민 -->
		 		<button type="button" id="tuto_start_btn" style="   border-radius: 12px;	background-color: #2F4D6A; font-size: 12px; color: #ffffff; line-height: 19px; height: 24px; width: 200px; left:769px; top:291px;  padding-right: 90px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="사용법 따라하기">튜토리얼 종료</button>
		 		<!-- mng_e 20180411_김건민 -->
			</div>
		</div>
		<footer id="footer">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>
</body>

</html>