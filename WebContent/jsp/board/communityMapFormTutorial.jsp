<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="ko" style="overflow: scroll;height: auto;">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<title>통계소통지도 개설</title>
<%-- 	<link rel="shortcut icon" href="${pageContext.request.contextPath}/img/ico/n_favicon.png"/> --%>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/nm.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui-1.10.4.custom.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/map/interactiveFunc.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/communityMap.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery.mCustomScrollbar.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/colorpicker/css/colpick.css">
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	<script src="${pageContext.request.contextPath}/js/communityMap/communityTutorial.js"></script>
	<link rel="stylesheet" href="/css/tutorial/tutorial.css">
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	<script src="${pageContext.request.contextPath}/js/plugins/colorpicker/js/colpick.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.wheelcolorpicker.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/EasyTree/jquery.easytree.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/colResizable-1.5.min.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highcharts.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highcharts-more.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/sop.portal.absAPI.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/map.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapNavigation.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.heum.validation.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/communityForm.js"></script>
	<script src="${pageContext.request.contextPath}/js/board/jquery.paging.js"></script>
	<script src="${pageContext.request.contextPath}/js/interactive/interactiveMapBtn.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapInfo/publicDataBoard.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/thematicMap/thematicMap_api.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Feature.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Manager.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/draw/Draw.Cricle.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/draw/Draw.Polygon.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Overlay.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Distance.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Poi.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Measure.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapInfo/legendInfo.js"></script>
	
	<script>
		$(function(){
			var urlPath = $(location).attr('pathname') + $(location).attr('search');
			if(urlPath == '/jsp/board/communityMapFormTutorial.jsp?tutorial_mode'){
				startTutorial();
			}
		})
	</script>
</head>

<body>
	<header>
		<jsp:include page="/view/common/includeSearch"></jsp:include>
	</header>
	<form id="community-form">
		<div id="container">
			<c:set var="appendPath" scope="request">
				<a href="#"><span class="path_el current">통계소통지도 개설</span></a>
			</c:set>
			<jsp:include page="/view/community/communityPath"/>
			<h2 class="ctit">통계소통지도 개설</h2>
			<p class="smr">지역현안 해결을 위한 통계소통지도는 사용자의 참여와 관심으로 운영됩니다.</p>
			<a class="go-helper" href="${pageContext.request.contextPath}/view/newhelp/community_help_3_1">개설하기 도움말</a>
			<div id="contents">
				<div id="content">
					<div class="cm_make">
						<h2><img src="${pageContext.request.contextPath}/img/community/cm_make_step1.png" alt="스텝1">개설 기본정보</h2>
						<jsp:include page="/view/community/form/layerPopup/step1"/>
<%-- 						<jsp:include page="/view/community/form/layerPopup/step2"/> --%>
<%-- 						<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> --%>
<%-- 						<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> --%>
<%-- 						<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> --%>
						<h2 id="header_cm_step2"><img src="${pageContext.request.contextPath}/img/community/cm_make_step2.png" alt="스텝2">배경통계 만들기<span>(옵션)</span><span style="font-size:11px;padding-left:5px;font-weight: normal;">* 소통지도 주제와 관련된 통계를 추가하실 수 있습니다.</span></h2>
						<div class="cm_step2">
							<div class="cm_make_map open">
								<button id="menu-control-button" class="btn_control" type="button"><img src="${pageContext.request.contextPath}/img/community/cm_make_map_close.png" alt="닫기"></button>
								<h3>추천통계</h3>
								<ul class="cm_make_map_basic">
									<li><label><input id="chkPo" name="stats" type="checkbox" value="bassStats" data-title="총인구">총인구</label></li>
									<li><label><input id="chkIn" name="stats" type="checkbox" value="bassBsnes" data-title="총사업체">총사업체</label></li>
								</ul>
								<h3>즐겨찾기통계(색지도)</h3>
								<button id="create-history" class="add_list" type="button">+추가</button>
								<ul class="cm_make_map_tab">
									<li class="M_on"><a href="#" style="border-right: #ddd solid 1px;">즐겨찾기<span class="comment" title="즐겨찾기로 저장한 통계정보를 활용하여 통계지도를 생성합니다.">!</span></a></li>
								</ul>
								<ul id="map-history" class="cm_make_map_tab_list">
									<li><label title="슈퍼마켓 사업체수"><input id="history-row-0" name="stats" type="checkbox" data-title="슈퍼마켓 사업체수"/>슈퍼마켓 사업체수</label><span>2017.07.19</span></li>
								</ul>
								<h3>위치표시</h3>
								<ul id="poi-tab" class="cm_make_map_tab">
									<li class="M_on"><a href="#" data-id="theme-list">테마<span class="comment" title="읍면동 이하 지도 축척레벨에서만 테마 정보를 볼 수 없습니다.">!</span></a></li>
									<li><a href="#" data-id="mydata-list">나의데이터<span class="comment" title="나의데이터에 저장된 자료가 지도위에 개별 위치로 보여집니다.">!</span></a></li>
								</ul>
								<ul id="theme-list" class="cm_make_map_tab_list">
									<c:forEach items="${themeMap }" var="theme">
										<li class="group">
											<div class="parent"><span></span>${theme.group_nm } <div class="current-theme-list"></div></div>
											<c:if test="${fn:length(theme.children)>0 }">
												<ul>
													<c:forEach items="${theme.children }" var="children">
														<li><label><input name="itemPoi" type="checkbox" value="${children.cd }" data-title="<c:out value="${children.cd_nm }"/>"><img src="${pageContext.request.contextPath}/img/ico/ico_${children.cd=='7005'||children.cd=='7006'||children.cd=='7007'?'7001':children.cd }.png" alt=""><c:out value="${children.cd_nm }"/></label></li>
													</c:forEach>				
												</ul>
											</c:if>
										</li>
									</c:forEach>
								</ul>
								<ul id="mydata-list" class="cm_make_map_tab_list" style="display:none;">
										<li><label title="서울시 전통시장"><input id="history-row-0" name="stats" type="checkbox" data-title="서울시 전통시장"/>서울시 전통시장</label><span>2017.07.20</span></li>
								</ul>
								<h3>선택한 항목</h3>
								<ul id="select-list" class="cm_make_map_tab_list select-list">
								</ul>
							</div>
							<jsp:include page="/view/community/form/layerPopup/historyMenu"/>
							<div id="mapRgn_1" class="cm_make_MapArea "></div>
						</div>
						<script>
							$communityForm.ui.curMapStat = [];
							<c:forEach items="${command.stats}" var="stat">
								$("input[name=stats][value=${stat.list}]").prop("checked",true);
								$communityForm.ui.setSelectList($("input[name=stats][value=${stat.list}]"),"stats");
								$communityForm.ui.curMapStat.push("${stat.list}");
							</c:forEach>
							<c:forEach items="${command.itemList}" var="item" varStatus="status">
								$("input[name=itemPoi][value=${item.cd}]").prop("checked",true);
								$communityForm.ui.setThemeImage("${item.cd}",true);
								$communityForm.ui.setSelectList($("input[name=itemPoi][value=${item.cd}]"),"itemPoi");
							</c:forEach>
						</script>
						<p id="submit-button-group" class="Btn_Group">
							<button id="temp-submit" type="button" style="background:#888;">임시저장</button>
							<button type="submit">개설완료</button>
							<button type="button" onclick='location.href="${introUrl}";' style="background:#888;">취소하기</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	</form>
	<footer id="footer">
		<jsp:include page="/view/common/includeBottom"></jsp:include>
	</footer>
	<div id="map_remark_1" class="map_remark" style="display:none;">
		<div class="map_location">
			<div id="mapNavi_1"></div>
		</div>
	</div>
	<div id="bookmarkdlg" class="popBox"style="display: none; z-index: 20001;">
		<div class="topbar">
			<span>조회한 통계결과 My Page 저장하기</span> 
			<a onclick="$('.deem').hide();$('#bookmarkdlg').hide();return false;">닫기</a>
		</div>
		<div class="popContents">
			<ul class="listFormPop">
				<li>
					<label for="savesubj" class="label">저장제목 :</label> 
					<input type="text" id="savesubj" class="inp" maxlength="100" placeholder="저장제목을 작성해주세요"/>
				</li>
			</ul>
			<div class="btnBox">
				<a id="history-save-button" class="btnStyle01">My Page 저장</a> 
				<a onclick="$('.deem').hide();$('#bookmarkdlg').hide();return false;" class="btnStyle01">닫기</a>
			</div>
		</div>
	</div>
	<div class="deem" style="display: none;"></div>
	<div class="tutorialWrapper" style= "display: none" draggable="false">
		<div id="headerTutorial2"  style="position:fixed; display: none; width:100%; height:120px; z-index:1;" draggable="false">
			<div id="tutorialText2" style="height:100px; margin:0 auto;" draggable="false">
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
			</div>
		</div>	
		<div style="position:relative; margin:0 auto; padding-bottom:23px; max-width:960px; min-width: 970px; padding-top:20px;">
			<div id="headerTutorial" style="width:100%; height:120px;" draggable="false">
				<div id="tutorialText" draggable="false">
					<!-- mng_s 20180412_김건민 -->
					<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
					<!-- mng_e 20180412_김건민 -->
				</div>
			</div>	
			<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn.png" alt="튜토리얼종료"  style="cursor:pointer; display:block; position:absolute; right:152px; top:166px; z-index:10003;" onclick="closeTutorial();" draggable="false">
			<img id="comm_10" src="/img/tutorial/community/comm_10.png" alt="샘플이미지" style="display:none; margin-top:447px; margin-left:12px; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_11" src="/img/tutorial/community/comm_11.png" alt="맵이름" style="display:none; margin-top:149px; margin-left:397px; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_12" src="/img/tutorial/community/comm_12.png" alt="시도 지역설정" style="display:none; margin-top:243px; margin-left:397px; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_13" src="/img/tutorial/community/comm_13.png" alt="시도 세부사항" style="display:none; margin-top:243px; margin-left:397px; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_14" src="/img/tutorial/community/comm_14.png" alt="시군구 지역설정" style="display:none; margin-top:243px; margin-left:521px; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_15" src="/img/tutorial/community/comm_15.png" alt="시군구 세부사항" style="display:none; margin-top:243px; margin-left:521px; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_16" src="/img/tutorial/community/comm_16.png" alt="의견등록 참여방법" style="display:none; margin-top:328px; margin-left:397px; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_17" src="/img/tutorial/community/comm_17.png" alt="총인구" style="display:none; margin-top:915px; margin-left:14px; border:3px outset red; cursor:pointer; position:absolute;" draggable="false">
			<img id="comm_18" src="/img/tutorial/community/comm_18.png" alt="총인구" style="display:none; margin-top:915px; margin-left:14px; border:3px outset red; cursor:pointer; position:absolute;" draggable="false">
			<img id="comm_19" src="/img/tutorial/community/comm_19.png" alt="즐겨찾기" style="display:none; position:absolute; margin-top:1016px; margin-left:18px;; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_20" src="/img/tutorial/community/comm_20.png" alt="즐겨찾기" style="display:none; position:absolute; margin-top:1016px; margin-left:18px;; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_21" src="/img/tutorial/community/comm_21.png" alt="나의데이터" style="display:none; position:absolute; margin-top:1223px; margin-left:137px;; border:3px outset red; cursor:pointer;" draggable="false">
			<img id="comm_22" src="/img/tutorial/community/comm_22.png" alt="서울시 전통시장" style="display:none; margin-top:1255px; margin-left:15px; border:3px outset red; cursor:pointer; position:absolute;" draggable="false">
			<img id="comm_23" src="/img/tutorial/community/comm_23.png" alt="개설완료" style="display:none; margin-top:1685px; margin-left:412px; border:3px outset red; cursor:pointer; position:absolute;" draggable="false">
			
			<img id="comm_bg9" src="/img/tutorial/community/comm_bg9.png" alt="지도" style="display:none; margin-top:876px; margin-left:281px; position:absolute;" draggable="false">
			<img id="comm_bg10" src="/img/tutorial/community/comm_bg10.png" alt="지도" style="display:none; margin-top:876px; margin-left:281px;" draggable="false">
			<img id="comm_bg11" src="/img/tutorial/community/comm_bg11.png" alt="지도" style="display:none; margin-top:876px; margin-left:281px;" draggable="false">
			<img id="comm_bg12" src="/img/tutorial/community/comm_bg12.png" alt="지도" style="display:none; margin-top:876px; margin-left:281px;" draggable="false">
			<img id="comm_bg13" src="/img/tutorial/community/comm_bg13.png" alt="지도" style="display:none; margin-top:876px; margin-left:281px;" draggable="false">
			<img id="comm_bg14" src="/img/tutorial/community/comm_bg14.png" alt="지도" style="display:none; margin-top:876px; margin-left:281px;" draggable="false">
			
			<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
			<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
			<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
			<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">
		
		</div>
	</div>
</body>

</html>