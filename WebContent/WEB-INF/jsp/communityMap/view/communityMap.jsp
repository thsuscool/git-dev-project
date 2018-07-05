<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@page import="javax.servlet.http.Cookie"%>
<%
String userAgent = request.getHeader("User-Agent");
String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos",
			"Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};

String param = request.getParameter("param");
if(param == null || !param.equals("0")){
	int j = -1;
	if(userAgent != null && !userAgent.equals("")){
		for(int i = 0; i < mobileOs.length; i++){
			j = userAgent.indexOf(mobileOs[i]);
			if(j > -1 ){
				out.println("");
				out.println("");
				out.println("<script>");
				out.println("location.href='/mobile/community.sgis';");
				out.println("</script>");
				out.println("");
				out.println("");
				break;
			}
		}
	}
}
%>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<script>
		var defaultCurAdmCd = "${communityMapInfo.adm_cd}";
		var defaultCurAdmNm = "${communityMapInfo.adm_nm}";
		var defaultCurCenter = [${area.x_coor},${area.y_coor}];
		var communityMapInfo = ${communityMapInfoJson};
		<c:choose>
			<c:when test="${fn:length(communityMapInfo.adm_cd)<2}">
				var defaultCurZoom = 2;
			</c:when>
			<c:when test="${fn:length(communityMapInfo.adm_cd)==2}">
				var defaultCurZoom = 4;
			</c:when>
			<c:when test="${fn:length(communityMapInfo.adm_cd)==5}">
				var defaultCurZoom = 6;
			</c:when>
			<c:when test="${fn:length(communityMapInfo.adm_cd)==7}">
				var defaultCurZoom = 10;
			</c:when>
		</c:choose>
		var defaultMyData;
		<c:if test="${fn:trim(communityMapInfo.mydata)!=''}">
			defaultMyData = "${communityMapInfo.mydata}";
		</c:if>
	</script>

	<title>통계소통지도</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/um.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui-1.10.4.custom.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/map/interactiveFunc.css"/> 
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery.mCustomScrollbar.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/EasyTree/skin-lion/ui.easytree_new.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/colorpicker/css/colpick.css"/>
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/handsontable.full.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/communityMap.css" />
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	<script src="${pageContext.request.contextPath}/js/plugins/colorpicker/js/colpick.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.wheelcolorpicker.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/EasyTree/jquery.easytree.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/colResizable-1.5.min.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highcharts.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/modules/exporting.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highcharts-more.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highchart.drag.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/sop.portal.absAPI.js"></script>	    
	<script src="${pageContext.request.contextPath}/js/common/map.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/handsontable.full.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapNavigation.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.heum.validation.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/communityCommon.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/map/communityMapApi.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/map/communityMap.js"></script>
	<script src="${pageContext.request.contextPath}/js/interactive/interactiveMapBtn.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapInfo/publicDataBoard.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/communityMap/view/communityDataBoard.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/communityMap/view/communityLeftMenu.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/view/layerPopup/communityPoi.js"></script>
	<script src="${pageContext.request.contextPath}/js/communityMap/view/layerPopup/communityNotice.js"></script>
	<c:if test="${member_id==communityMapInfo.usr_id }">
	<script src="${pageContext.request.contextPath}/js/communityMap/view/layerPopup/communityMember.js"></script>
	</c:if>
	
	
	<script src="${pageContext.request.contextPath}/js/communityMap/view/communityView.js"></script>
	
	
	
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
	
	<script src="${pageContext.request.contextPath}/js/communityMap/communityTutorial.js"></script>
	<link rel="stylesheet" href="/css/tutorial/tutorial.css">
	
	<script>
	var loading = new sop.portal.absAPI();
	$(document).ready(function(){
		if(getCookie("confirmMsg") == ""){
			readyTutorial();
		}
		if($(location).attr('search').match("tutorial_mode")){
	    	startTutorial();
		}
// 		loading.onBlockUIPopup();
	});
	function getSession(){
// 		loading.onBlockUIClose();
	}
	function popupCallback(jibunAddr,roadAddress){
		var res = $communityMapApi.request.getAddressFromAddressName(roadAddress);
		if($communityMapCommon.hasText(res)&&res.errCd=="0"&&res.result.totalcount>0){
			var data = res.result.resultdata[0];
			$communityLeftMenu.ui.poiRegist.setNewMarker([data.x,data.y],roadAddress);
		}else{
			$communityMapCommon.alert("알림", "좌표가 존재하지 않는 주소입니다");
		}
	}
	</script>
</head>

<body>
	<div id="wrap" style="height: 300px;">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		<div class="containerBox">
			<div class="rela">
				<div class="sceneBox" id="view1">
					<div class="sceneRela">
						<div class="toolBar">
							<div class="viewTitle">
								<span style="background: #0070c0;">VIEW 1</span>
							</div>
							<div id="mapNavi_1"></div>
							<div class="tb_right" id="btnList_1">
								<ul>
									<li><a href="#" title="SHP 파일 다운로드" onclick="return $communityMap.ui.getSHPfile();"><img src="${pageContext.request.contextPath}/img/community/icon_download.png" alt="전체창" /></a></li>
									<c:if test="${param.type!='full' }">
										<li><a onclick="javascript:$communityMap.ui.doMaxSize();" class="tb_sizing" style="cursor: pointer;" title="전체 화면 확대"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									</c:if>
									<li><a onclick="javascript:$communityMap.ui.doClearMap(function(){$('#history-list li>a,#poi-list li>a').removeClass('M_on').find('input:checkbox').prop('checked',false);});" class="tb_clear" style="cursor: pointer;" title="초기화"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li><a onclick="javascript:$communityMap.ui.reportDataSet();" class="tb_report" style="cursor:pointer;" title="보고서 보기"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars06.png" alt="보고서출력"/></a></li>
								</ul>
							</div>
						</div>
						<div class="interactiveBar">
							<p class="helperText" style="display:none;margin: 1px 0 0 235px;">
								<span class="location-name"></span>
								<span class="map-stats-name"></span>
							</p>
						</div>
						<div class="mapContents" id="mapRgn_1"></div>
						<div class="resizeIcon"></div>
					</div>
				</div>
				<c:choose>
					<c:when test="${fn:length(communityMapInfo.stats)>0||fn:length(communityMapInfo.itemList)>0}">
				    	<a href="javascript:void(0)" class="sideQuick sq03 on">
				    		<span>통계리스트</span>
				    		<img src="/img/ico/ico_resultbtn.gif" alt="선택항목" />
				    	</a>
				    	<div class="sqListBox sq03" style="left:430px;">
				    		<div class="sqTabs">
				    			<c:if test="${fn:trim(communityMapInfo.mydata)!=''}">
									<span>기본자료</span>
					    			<a href="javascript:$communityLeftMenu.ui.defaultMydata();" id="defaultMydataBtn" class="on">on</a>
				    			</c:if>
				    			<c:if test="${fn:length(communityMapInfo.stats)>0 }">
									<span>통계수치</span>
					    			<a href="javascript:$communityLeftMenu.ui.showNumberClick();" id="showNumberBtn">off</a>
				    			</c:if>
				    		</div>
				    		
				    		<div id="searchBtnResultRgn" class="sqList">
				    			<c:if test="${fn:length(communityMapInfo.stats)>0||fn:length(communityMapInfo.recommend)>0 }">
					    			<h3 class="ListTitle">통계리스트</h3>
					    			<div id="history-list-box">
						    			<ul id="history-list">
						    				<c:forEach var="stat" items="${communityMapInfo.recommend }" varStatus="status">
						    					<li class="dragItem" data-list="${fn:trim(stat.list) }" data-type="history">
													<a href="#" class="ellipsis">
														<input type="checkbox">
														<span class="text" style="width:200px;">
															${stat.hist_nm }
														</span>
														<img src="/img/community/recommend_icon.png" alt="추천 통계" style="right: 4px;position: absolute;top: 2px;">
													</a>
												</li>
						    				</c:forEach>
						    				<c:forEach var="stat" items="${communityMapInfo.stats }" varStatus="status">
												<li class="dragItem" data-list="${fn:trim(stat.list) }" data-type="history">
													<a href="#" class="ellipsis">
														<input type="checkbox">
														<span class="text">
															${stat.hist_nm }
														</span>
													</a>
												</li>
											</c:forEach>
						    			</ul>
					    			</div>
				    			</c:if>
				    			<c:if test="${fn:length(communityMapInfo.itemList)>0 }">
					    			<h3 class="ListTitle">기본 POI</h3>
					    			<div id="poi-list-box">
						    			<ul id="poi-list">
						    				<c:forEach var="item" items="${communityMapInfo.itemList }" varStatus="status">
												<li data-list="${fn:trim(item.cd) }" data-type="company">
													<a href="#" class="ellipsis">
														<input type="checkbox">
														<img src="${pageContext.request.contextPath}/img/ico/ico_${fn:trim(item.cd)=='7005'||fn:trim(item.cd)=='7006'||fn:trim(item.cd)=='7007'?'7001':fn:trim(item.cd) }.png"/>
														<span class="text">
															${item.nm }
														</span>
													</a>
												</li>
											</c:forEach>
						    			</ul>
					    			</div>
				    			</c:if>
				    		</div> 
				    	</div>
					</c:when>
					<c:when test="${fn:trim(communityMapInfo.mydata)!='' }">
						<div class="sqListBox sq03 onlyMydata">
							<div class="sqTabs">
								<span>기본자료</span>
				    			<a href="javascript:$communityLeftMenu.ui.defaultMydata();" id="defaultMydataBtn" class="on">on</a>
							</div>
						</div>
					</c:when>
				</c:choose>
				<div class="leftArea">
					<c:set var="member_id" value="${member_id }" scope="request"/>
					<c:set var="communityMapInfo" value="${communityMapInfo }" scope="request"/>
					<jsp:include page="/view/community/communityLeftMenu"/>
				</div>
				<div id="dataBoard">
					<jsp:include page="/view/community/communityDataBoard"></jsp:include>
				</div>
			</div>
		</div>
			<div class="tutorialWrapper" style= "display:none;" draggable="false">
			<div id="headerTutorial" style="width:100%; height:120px;" draggable="false">
				<div id="tutorialText" draggable="false">
				</div>
			</div>	
		</div>
		<footer id="footer">
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		</footer>
	</div>
	<c:if test="${addMessage }">
		<script>
			$communityMapCommon.confirm("알림","지금 회원 등록을 하시겠습니까?",[{title:"예",func:function(){
				$("#member-manager-button").click();
			}},{title:"아니오"}]);
		</script>
	</c:if>
	<c:set var="addMessage" value="false" scope="session"/>
</body>
</html>