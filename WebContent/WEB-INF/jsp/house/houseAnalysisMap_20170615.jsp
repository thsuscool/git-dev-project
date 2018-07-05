<%
/**************************************************************************************************************************
* Program Name  : 살고싶은 우리동네 JSP  
* File Name     : houseAnalysisMap.jsp
* Comment       : 
* History       : (주)유코아시스템 나광흠 2015-11-30
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
	<head>
		<meta charset="utf-8" />
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title>살고싶은 우리동네 | 통계지리정보서비스</title>

		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui-1.10.4.custom.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/map/interactiveFunc.css"/> 
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/house/common.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/house/cont_adobe.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/house/idealType.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery.mCustomScrollbar.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/colorpicker/css/colpick.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/popup.css">
		<link rel='shortcut icon' href='${pageContext.request.contextPath}/img/ico/n_favicon.png'/>
		
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
		<script src="${pageContext.request.contextPath}/js/common/mapNavigation.js"></script>
		<script>
			var bClassInfoList = ${mlsfcListsJson};
			var idealTypeInfoList = ${idealTypeListsJson};
			var errorMessage = "서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2342)로 문의하시기 바랍니다.";
		</script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.map.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.event.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.map.callback.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.leftmenu.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.databoard.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.search.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.chart.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.api.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.map.btninfo.js"></script>
		<script src="${pageContext.request.contextPath}/js/house/houseAnalysis.idealtype.js"></script>
		<script src="${pageContext.request.contextPath}/js/interactive/interactiveMapBtn.js"></script>
		
			<!-- 사용자지정 컨트롤  -->
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
		
		<!-- 웹툰 추가 start -->
		<script type="text/javascript" src="/js/interactive/rotation/jquery.slides.min.js"></script>
		<script type="text/javascript" src="/js/house/webToon/webToon.js"></script>
		<!-- 웹툰 추가 end -->
</head>
<body>
	<div id="wrap" style="height: 300px;">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		<div class="containerBox">
			<div class="rela">
				<div class="sceneBox on" id="view1">
					<div class="sceneRela">
						<div class="toolBar">
							<h2>살고싶은 우리동네</h2>
							<div class="viewTitle">
								<span style="background: #0070c0;">VIEW 1</span>
							</div>
							<button id="high-location" type="button" class="MapBefore" style="display:none;">상위지역이동</button>
							<!-- 네비게이터 -->
							<div id="mapNavi_1"></div>

							<div class="tb_right" id="btnList_1">
								<ul>
									<c:if test="${param.type!='full' }">
										<li><a onclick="javascript:$houseAnalysisMap.ui.doMaxSize();" class="tb_sizing" style="cursor: pointer;" title="전체 화면 확대"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									</c:if>
									<li><a onclick="javascript:$houseAnalysisMap.ui.doReset();" class="tb_clear" style="cursor: pointer;" title="초기화"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li><a onclick="javascript:$houseAnalysisMap.ui.reportDataSet();" class="tb_report" style="cursor:pointer;" title="보고서 보기"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars06.png" alt="보고서출력"/></a></li>
								</ul>
							</div>
						</div>
						<div class="interactiveBar">
							<p class="helperText" style="margin: 1px 0 0 355px;">
								<span class="location-name"></span>
								<span class="map-stats-name"></span>
							</p>
							<a href="${pageContext.request.contextPath}/view/newhelp/house_help_10_0" target="_blank" style="background: none;"><img src="${pageContext.request.contextPath}/img/im/icon_q.gif" alt="이용법"></a>
							<a style="cursor:pointer;background: none;" href="javascript:void(0);" onclick="$('#help-indicator').show();"><img src="${pageContext.request.contextPath}/img/im/icon_q1.gif" alt="지표현황"></a>
						</div>
						<div class="mapContents" id="mapRgn_1"></div>
						<div class="resizeIcon"></div>
					</div>
				</div>
		    	<a href="javascript:void(0)" class="sideQuick sq01_01 on" id="search-recommend" data-title="추천지역찾기" data-left="115px">
		    		<span>추천지역찾기</span>
		    		<img src="${pageContext.request.contextPath}/img/house/menu_icon2.png" alt="" />
		    	</a>
		    	<a href="javascript:void(0)" class="sideQuick sq01_02" id="look-abode" data-title="주거현황보기" data-left="5px">
		    		<span>주거현황보기</span>
		    		<img src="${pageContext.request.contextPath}/img/house/menu_icon1.png" alt="" />
		    	</a>
		    	<a href="javascript:void(0)" class="sideQuick sq01_03" id="ideal-type">
		    		<span>간편동네찾기</span>
		    		<img src="${pageContext.request.contextPath}/img/house/menu_icon3.png" alt="" />
		    	</a>
		    	
				<div class="leftArea">
					<jsp:include page="/view/house/houseAnalysisLeftMenu"></jsp:include>
				</div>
				<div id="dataBoard">
					<jsp:include page="/view/house/houseAnalysisDataBoard"></jsp:include>
				</div>
			</div>
		</div>
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		</footer>
	</div>
	<jsp:include page="/view/house/helper/indicator"></jsp:include>
	<div id="house_laypopup" class="Popup_Info">
		<div class="PopupCont">
			<h1>살고싶은 우리동네 이용안내</h1>
			<button type="button" class="Popup_close1" onclick="javascript:commonPopupObj.closeWin('house_laypopup', 1);">창닫기</button>
			<img src="${pageContext.request.contextPath}/img/nm/guide_house_map.png" alt="살고싶은 우리동네 이용안내">
			<div class="CloseZone">
				<label><input type="checkbox" name="close" value="OK" />오늘 하루 열지 않음</label>
				<button type="button" class="Popup_close2" onclick="javascript:commonPopupObj.closeWin('house_laypopup', 1);">창닫기</button>
			</div>
		</div>
		<div class="PopupBg">&nbsp;</div>
	</div>
	<div id="ideal-type-step" class="LayerCont">
		<div class="LikeTown">
			<h1>간편 동네 찾기</h1>
			<button id="ideal-type-close-button" class="Btn_close" type="button">닫기</button>
			<jsp:include page="/view/house/idealType/step1"></jsp:include>
			<jsp:include page="/view/house/idealType/step2"></jsp:include>
		</div>
	</div>
	

		<!--하루동안 열지않기  -->
 		<div class="Popup_Info" style="display:block;" id="houseAnalysis_webtoon_laypopup">
		<div class="PopupCont" style="width:800px; height:590px;">
			<h1>살고싶은 우리동네 웹툰</h1> 
			<button type="button" style="z-index:100;" class="Popup_close1" onclick="javascript:closeRotationTip('houseAnalysis_webtoon_laypopup', 1);">창닫기</button>
			<div style="left:30px; position:absolute; top:10px; width:780px; height:580px; overflow-y:scroll;">
					<img id="webToonImg1" src="/img/house/webtoon/webToon_1.jpg" alt="웹툰 이미지" style="width:690px;" />
					<img id="webToonImg2" src="/img/house/webtoon/webToon_2.jpg" alt="웹툰 이미지" style="width:690px;" />
					<img id="webToonImg3" src="/img/house/webtoon/webToon_3.jpg" alt="웹툰 이미지" style="width:690px;" />
					<img id="webToonImg4" src="/img/house/webtoon/webToon_4.jpg" alt="웹툰 이미지" style="width:690px;" />
					<img id="webToonImg5" src="/img/house/webtoon/webToon_5.jpg" alt="웹툰 이미지" style="width:690px;" />
					<img id="webToonImg6" src="/img/house/webtoon/webToon_6.jpg" alt="웹툰 이미지" style="width:690px;" />
			</div>
			<div class="CloseZone">
				<div class="popmm">
					<label><input type="checkbox" name="close" value="OK">오늘 하루 열지 않음</label>
					<button type="button" class="Popup_close2" onclick="javascript:closeRotationTip('houseAnalysis_webtoon_laypopup', 1);">창닫기</button>
				</div>
			</div>
		</div>
	</div>






</body>
</html>