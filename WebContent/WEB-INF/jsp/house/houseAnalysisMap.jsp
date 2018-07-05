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
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 

<%
	String strType = "";
	String paramObj = "";
	try {
		Map map = (Map)request.getAttribute("paramInfo");
		strType = (String)map.get("type");	
// 		if (strType.equals("bookmark")   		|| 
		if ("bookmark".equals(strType)   		|| 
// 			strType.equals("sharedata")  		||
			"sharedata".equals(strType)  		||
// 			strType.equals("recentdata")) {
			"recentdata".equals(strType)) {
			paramObj = (String)map.get("paramObj");
		}
	} catch (Exception e) {
// 		System.out.println("############"+e);
	}
%>

<!DOCTYPE html>
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
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/house/common.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/house/cont_adobe.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/house/idealType.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery.mCustomScrollbar.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/EasyTree/skin-lion/ui.easytree_new.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/colorpicker/css/colpick.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/css/popup.css" />
<%-- 		<link rel='shortcut icon' href='${pageContext.request.contextPath}/img/ico/n_favicon.png'/> --%>
		
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
		
		<!-- 2017.11.01 [개발팀] LBDMS 데이터 연계  START-->
		<script type="text/javascript" src="/js/policyStatic/policyStaticMapDataManagement.js"></script>
		<script type="text/javascript" src="/js/board/jquery.paging.js"></script>
		<!-- 2017.11.01 [개발팀] LBDMS 데이터 연계  END-->
		
		<script type="text/javascript" src="/js/house/houseAnalysisTutorial.js"></script>
        <link rel="stylesheet" href="/css/tutorial/tutorial.css">
		
		<!--  즐겨찾기 -->
    	<script type="text/javascript" src="/js/gallery/galleryAdd.js"></script>

		<!--  통계갤러리 -->
        <script type="text/javascript" src="/js/plugins/slick.min.js"></script>  
        <script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
	    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
    	<script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
    	<script type="text/javascript" src="/js/plugins/imageCapture/rgbcolor.js"></script>
    	<script type="text/javascript" src="/js/plugins/imageCapture/canvg.js"></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
        <script type="text/javascript" src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>
        
		<script>
			$(function(){
						//mng_s 20180412_김건민	
	    				/* if(getCookie("confirmMsg") == ""){
	    					$("#houseAnalysis_webtoon_laypopup").hide();
	    					readyTutorial();
	    				} */
	    				//mng_e 20180412_김건민
		       			if($(location).attr('search').match("tutorial_mode")){
	    					$("#houseAnalysis_webtoon_laypopup").hide();
		    				startTutorial();
		       			}
		       			
		   				if("<%=strType%>" == "sharedata" || "<%=strType%>" == "bookmark"){
	    					
		    				var param = null;
		    				var length = <%=paramObj.length()%>;
		    				if (length == 0) {
		    					param = "";
		    				}else {
		    					param = JSON.parse(<%=paramObj%>); 
		    				}
		    				console.log(param);
		    				$houseAnalysisMap.ui.doAnalysisShareInfo("<%=strType%>", param);
	    				}
		    				
			});
		</script>
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
							<div>
								<!-- mng_s 20180412_김건민 -->
								<!-- <img id="tuto_start_btn" src="/img/tutorial/house/tuto_start_btn.png" style="cursor:pointer; display:block; position:absolute; right:265px; top:4px;" onclick="readyTutorial();" draggable="false"> -->
								<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 350px; top: -2px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="readyTutorial();" title="사용법 따라하기">튜토리얼</button>
								<!-- mng_e 20180412_김건민 -->
							</div>
							<div class="tb_right" id="btnList_1">
								<ul>
									<!-- 2017.11.01 [개발팀] LBDMS 데이터연계 START -->
									<c:if test="${writeAble == true }">
										<button onclick="javascript:$policyStaticMapDataManagement.ui.dataManagement('','','','1','02');" id="dataManageBtn" class="dataManageBtn" type="button"><img src="/img/policyStatic/btn_admin2.png" alt="">데이터관리</button>
									</c:if>
									<!-- 2017.11.01 [개발팀] LBDMS 데이터연계 END -->
									
									<c:if test="${param.type!='full' }">
										<li><a onclick="javascript:$houseAnalysisMap.ui.doMaxSize();" class="tb_sizing" style="cursor: pointer;" title="전체 화면 확대"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									</c:if>
									<li><a onclick="javascript:$galleryAdd.houseGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
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
							<!-- mng_s 20180412_김건민 -->
							<%-- <a href="${pageContext.request.contextPath}/view/newhelp/house_help_10_0" target="_blank" style="background: none;"><img src="${pageContext.request.contextPath}/img/im/icon_q.gif" alt="이용법" /></a> --%>
							<a href="${pageContext.request.contextPath}/view/newhelp/house_help_10_0" target="_blank" style="background: none;"><button type="button" id="tuto_start_btn" style="   border-radius: 6px;	background-color: #0174DF; font-size: 11px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 21px; width: 50px; top:37px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" title="이용법">이용법</button></a>
							<%-- <a style="cursor:pointer;background: none;" href="javascript:void(0);" onclick="$('#help-indicator').show();"><img src="${pageContext.request.contextPath}/img/im/icon_q1.gif" alt="지표현황" /></a> --%>
							<a style="cursor:pointer;background: none;" href="javascript:void(0);" onclick="$('#help-indicator').show();"><button type="button" id="tuto_start_btn" style="   border-radius: 6px;	background-color: #0174DF; font-size: 11px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 21px; width: 50px; top:37px; left: 471px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" title="지표현황">지표현황</button></a> 
							<!-- <a style="cursor:pointer;background: none;" href="javascript:void(0);" onclick="openWebtoon();"><img src="/img/house/webtoon/icon_web.png" alt="웹툰보기" /></a> -->
							<a style="cursor:pointer;background: none;" href="javascript:void(0);" onclick="openWebtoon();"><button type="button" id="tuto_start_btn" style="   border-radius: 6px;	background-color: #f8a043; font-size: 11px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 21px; width: 50px; top:37px; left: 545px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;"  title="웹툰보기">웹툰보기</button></a>
							<!-- mng_e 20180412_김건민 -->
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
				<!--  mng_s 20170830_주용민	  -->
				
								<!-- 북마크 팝업  -->
				<div id="bookmarkdlg" class="popBox"
					style="display: none; z-index: 20001;">
					<div class="topbar">
						<span>조회한 통계결과 My Page 저장하기</span> <a
							onclick="javascript:$bizStatsMap.ui.doCancel('bookmarkdlg');">닫기</a>
					</div>
					<div class="popContents">
						<ul class="listFormPop">
							<li><label for="savesubj" class="label">저장제목 :</label> <input
								type="text" id="savesubj" class="inp" maxlength="100" /></li>
							<li id="caseInput" style="display: none;"><span
								class="label">공개여부</span> <input type="checkbox" id="openShare" title="공개여부" />
								<label for="ckbigong" class="mr20">SGIS+plus 활용사례 공유</label></li>
						</ul>
						<div id="caseHelper" style="display: none;">
							<p class="txt">
								조회결과 저장기간은 2개월 까지며,<br />조회결과 공개여부에 따라 SGIS+plus 사용자간<br />데이터의
								자유로운 열람이 가능합니다.
							</p>
							<p class="txt">
								저장된 내용을 활용사례로 공유시 저장기간을 연장할 수<br /> 있습니다.
							</p>
						</div>
						<div class="btnBox">
							<a onclick="javascript:$houseAnalysisMap.ui.doDone('bookmarkdlg');"
								class="btnStyle01">My Page 저장</a> <a
								onclick="javascript:$houseAnalysisMap.ui.doCancel('bookmarkdlg');"
								class="btnStyle01">닫기</a>
						</div>
					</div>
				</div>
				
				<div id="myGalleryPop" style="display: none; z-index: 20000;" class="popBox">
					<div class="topbar">
						<span>갤러리 등록 및 즐겨찾기</span>
						<a href="javascript:void(0)">닫기</a>
					</div>
					<div class="popContents">
						<p class="txt1">
<!-- 							검색한 데이터로 갤러리를 등록 하시겠습니까?<br /> -->
<!-- 							즐겨찾기 하시겠습니까? -->
							검색한 데이터로 즐겨찾기 하시겠습니까?
							</p>
						<div class="btnBox">
<!-- 							<a href="javascript:$galleryAdd.interactiveGalleryPopHide();$galleryAdd.interactiveMyGalleryDialogPopOpen()" class="btnGtype">갤러리 등록</a>  -->
							<a href="javascript:$houseAnalysisMap.ui.doBookMark(1, 'HMAP');" class="btnGtype">즐겨찾기</a> 
							<a onclick="javascript:$('#myGalleryPop').hide();" class="btnGtype">취소</a> <!-- 2017.02.23 -->
						</div>
					</div>
				</div>
				<!--  mng_e 20170830_주용민	  -->
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
			<img src="${pageContext.request.contextPath}/img/nm/guide_house_map.png" alt="살고싶은 우리동네 이용안내" />
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
		<!-- mng_s 20180412_김건민 -->
 		<div class="Popup_Info" style="display:none; left:10%;" id="houseAnalysis_webtoon_laypopup">
 		<!-- mng_e 20180412_김건민 -->
		<div class="PopupCont" style="width:550px; height:590px;">
			<h1>살고싶은 우리동네 웹툰</h1>
			<button type="button" style="z-index:100;" class="Popup_close1" onclick="javascript:closeRotationTip('houseAnalysis_webtoon_laypopup', 1);">창닫기</button>
			<div style="left:30px; position:absolute; top:30px; width:518px; height:550px; overflow-y:scroll; display:block;" id="webDiv1">
					<span style="width:300px; margin-left:160px;">
					<img src="/img/house/webtoon/K-003.png" alt="웹툰1" id="webToonBtn1" />
					<img src="/img/house/webtoon/K-002.png" alt="웹툰2" id="webToonBtn2" />
					</span>
					<img id="webToonImg1" src="/img/house/webtoon/webToon_1.jpg" alt="웹툰 이미지" style="width:450px;" />
					<img id="webToonImg2" src="/img/house/webtoon/webToon_2.jpg" alt="웹툰 이미지" style="width:450px;" />
					<img id="webToonImg3" src="/img/house/webtoon/webToon_3.jpg" alt="웹툰 이미지" style="width:450px;" />
					<img id="webToonImg4" src="/img/house/webtoon/webToon_4.jpg" alt="웹툰 이미지" style="width:450px;" />
					<img id="webToonImg5" src="/img/house/webtoon/webToon_5.jpg" alt="웹툰 이미지" style="width:450px;" />
					<img id="webToonImg6" src="/img/house/webtoon/webToon_6.jpg" alt="웹툰 이미지" style="width:450px;" />
			</div>
			<div style="left:30px; position:absolute; top:30px; width:518px; height:550px; overflow-y:scroll; display:none;" id="webDiv2">
					<span style="width:300px; margin-left:160px;">
					<img src="/img/house/webtoon/K-001.png" alt="웹툰1" id="webToonBtn3" />
					<img src="/img/house/webtoon/K-004.png" alt="웹툰2" id="webToonBtn4" />
					</span>
					<img id="webToonImg2_1" src="/img/house/webtoon/webToon_b_1.jpg" alt="웹툰 이미지" style="width:450px;" />
					<img id="webToonImg2_2" src="/img/house/webtoon/webToon_b_2.jpg" alt="웹툰 이미지" style="width:450px;" />
					<img id="webToonImg2_3" src="/img/house/webtoon/webToon_b_3.jpg" alt="웹툰 이미지" style="width:450px;" />
			</div>
			<div class="CloseZone">
				<div class="popmm">
					<!-- mng_s 20180412_김건민 -->
					<!-- <label><input type="checkbox" name="close" value="OK" title="오늘 하루 열지 않음" />오늘 하루 열지 않음</label> -->
					<!-- mng_e 20180412_김건민 -->
					<button type="button" class="Popup_close2" onclick="javascript:closeRotationTip('houseAnalysis_webtoon_laypopup', 1);">창닫기</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 2017.11.01 [개발팀] LBDMS 데이터연계 START -->
	<!-- 전송데이터 관리 S -->
	<div id="lbdmsPopup" class="FuseResult_Layer" style="display: none;">
		<div class="FuseResult">
			<h3>전송데이터 관리</h3>
			<button id="lbdmsClosePopup" class="btn_close" type="button">창닫기</button>

			<!-- 검색 및 결과 S -->
			<div class="ContArea">
				<fieldset class="ListSearch">
					<label for="">공개일자 : </label>
					<input type="text" id="data_from" class="inp" title="공개범위최소" style="width:130px;"> ~
					<input type="text" id="data_to" class="inp" title="공개범위최대" style="width:130px;margin-right:50px;"> 
					<label for="data_nm">서비스명 : </label>
					<input type="text" id="data_nm" class="inp" title="서비스명" style="width:250px;"/>
					<button id="data_search" type="button" class="searchBtn">검색</button>
				</fieldset>
				<table class="TB_02" style="table-layout:auto;">
					<caption>LBDMS 전송데이터 목록</caption>
					<colgroup>
                           <col style="width:40px;"><!-- checkbox -->
                           <col style="width:90px;"><!-- 순번 -->
                           <col style="width:120px;"><!-- 공개일자 -->
                           <col style="width:auto;"><!-- 공개데이터명 -->
                           <col style="width:100px;"><!-- 공개기관명 -->
                           <col style="width:100px;"><!-- 사용자명 -->
                           <col style="width:50px;"><!-- 유형 -->
                           <col style="width:220px;"><!-- 서비스명 -->
                           <col style="width:150px;"><!-- 분야 -->
                           <col style="width:70px;"><!-- 공개여부 -->
                          </colgroup>
					<thead>
						<tr>
							<th scope="col"><input type="checkbox" id="allChk"><label for="allChk">전체선택</label></th>
							<th scope="col">순번</th>
							<th scope="col">공개일자</th>
							<th scope="col">공개데이터명</th>
							<th scope="col">공개기관명</th>
							<th scope="col">사용자명</th>
							<th scope="col">유형</th>
							<th scope="col">서비스명</th>
							<th scope="col">분야</th>
							<th scope="col">공개여부</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<!-- List E -->
				<div id="page" class="pagenation1" style="padding-top:0px;">
					<span class="pages"></span>
				</div>

				<div class="Btn_Group">
					<button type="button" id="DataDelete" onclick="javascript:$policyStaticMapDataManagement.ui.doDeleteData();">선택삭제</button>
					<button type="button" id="DataOpen" onclick="javascript:$policyStaticMapDataManagement.ui.doOpenData();">선택 공개/비공개</button>
				</div>

			</div>
		</div>
		</div>
		
	<div class="tutorialWrapper" style= "display: none" draggable="false">
		<!-- mng_s 20180412_김건민 -->	
		<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 302px; top:104px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="사용법 따라하기">튜토리얼 종료</button>
		<!-- mng_e 20180412_김건민 -->			
		<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
			<div id="tutorialText" draggable="false">
				<!-- mng_s 20180412_김건민 -->			
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
				<!-- mng_e 20180412_김건민 -->
			</div>
		</div>	
		
		<!-- 주거현황보기 시군구 리스트 -->
		<img id="left_01" src="/img/tutorial/house/left_01.png" alt="전국 리스트" draggable="false" style="display:none; position:absolute; top:268px; left:78px; cursor:pointer;">
		
		<!-- 추천지역찾기 시군구 리스트 -->
		<img id="left_02" src="/img/tutorial/house/left_02.png" alt="전국 리스트" draggable="false" style="display:none; position:absolute; top:298px; left:105px; cursor:pointer; z-index:10000;"> 
		
		<!-- 간편동네찾기 시군구 리스트-->
		<img id="left_03" src="/img/tutorial/house/left_03.png" alt="전국 리스트" draggable="false" style="display:none; position:absolute; cursor:pointer; z-index:10002;">
		
		<!-- 주거현황보기 버튼 -->
		<img id="bt_01" src="/img/tutorial/house/bt_01.png" alt="주거현황보기" draggable="false" style="display:none; position:absolute; top:140px; left:113px; cursor:pointer;  border: 3px outset red;">
		<img id="bt_02" src="/img/tutorial/house/bt_02.png" alt="전국" draggable="false" style="display:none; position:absolute; top:268px; left:75px; cursor:pointer;  border: 3px outset red;">
		<img id="bt_03" src="/img/tutorial/house/bt_03.png" alt="대전광역시" draggable="false" style="display:none; position:absolute; top:385px; left:77px; cursor:pointer; border: 3px outset red; z-index:10000;">
		<img id="bt_04" src="/img/tutorial/house/bt_04.png" alt="교육" draggable="false" style="display:none; position:absolute; top:599px; left:10px; cursor:pointer; border: 3px outset red; z-index:10000;">
		<img id="bt_05" src="/img/tutorial/house/bt_05.png" alt="학원수" draggable="false" style="display:none; position:absolute; top:633px; left:180px; cursor:pointer; border: 3px outset red; z-index:10000;">
		<img id="bt_06" src="/img/tutorial/house/bt_06.png" alt="보기" draggable="false" style="display:none; position:absolute; top:736px; left:128px; cursor:pointer; border: 3px outset red;">
		<img id="bt_07" src="/img/tutorial/house/bt_07.png" alt="서구" draggable="false" style="display:none; position:absolute; top:435px; left:837px; cursor:pointer; border: 3px outset red; z-index:10000">
		<img id="bt_08" src="/img/tutorial/house/bt_08.png" alt="학구도" draggable="false" style="display:none; position:absolute; top:172px; right:240px; cursor:pointer; border: 3px outset red; z-index:10003;">		
		<img id="bt_09" src="/img/tutorial/house/bt_09.png" alt="초등학교" draggable="false" style="display:none; position:absolute; top:245px; right:370px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_10" src="/img/tutorial/house/bt_10.png" alt="대전둔산초등학교" draggable="false" style="display:none; position:absolute; top:393px; left:825px; cursor:pointer; border: 3px outset red; z-index:10002">
		
		<!-- 추천지역찾기 버튼 -->
		<img id="bt_11" src="/img/tutorial/house/bt_11.png" alt="추천지역찾기" draggable="false" style="display:none; position:absolute; top:139px; left:4px; cursor:pointer;  border: 3px outset red;">
		<img id="bt_12" src="/img/tutorial/house/bt_12.png" alt="전국" draggable="false" style="display:none; position:absolute; top:299px; left:104px; cursor:pointer;  border: 3px outset red; z-index:10000;">
		<img id="bt_13" src="/img/tutorial/house/bt_13.png" alt="대전광역시" draggable="false" style="display:none; position:absolute; top:414px; left:103px; cursor:pointer;  border: 3px outset red; z-index:10001;">
		<img id="bt_14" src="/img/tutorial/house/bt_14.png" alt="생활 편의 교통" draggable="false" style="display:none; position:absolute; top:581px; left:12px; cursor:pointer;  border: 3px outset red; z-index:10000;">
		<img id="bt_15" src="/img/tutorial/house/bt_15.png" alt="편의시설 수" draggable="false" style="display:none; position:absolute; top:428px; left:162px; cursor:pointer; border: 3px outset red; z-index:10000;">
		<img id="bt_16" src="/img/tutorial/house/bt_16.png" alt="복지 문화" draggable="false" style="display:none; position:absolute; top:675px; left:11px; cursor:pointer;  border: 3px outset red; z-index:10000;">
		<img id="bt_17" src="/img/tutorial/house/bt_17.png" alt="병의원 및 약국" draggable="false" style="display:none; position:absolute; top:472px; left:164px; cursor:pointer; border: 3px outset red; z-index:10000;">
		<img id="bt_18" src="/img/tutorial/house/bt_18.png" alt="추천지역찾기" draggable="false" style="display:none; position:absolute; top:838px; left:170px; cursor:pointer;  border: 3px outset red; z-index:10000;">
		<img id="bt_19" src="/img/tutorial/house/bt_19.png" alt="대전광역시 서구 둔산2동" draggable="false" style="display:none; position:absolute; top:366px; left:482px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_20" src="/img/tutorial/house/bt_20.png" alt="추천지역 리스트" draggable="false" style="display:none; position:absolute; top:253px; right:0px; cursor:pointer; border: 3px outset red; z-index:10002;">
		<img id="bt_21" src="/img/tutorial/house/bt_21.png" alt="복지 문화" draggable="false" style="display:none; position:absolute; top:645px; right:10px; cursor:pointer; border: 3px outset red; z-index:10002;">
		<img id="bt_22" src="/img/tutorial/house/bt_22.png" alt="유치원 및 보육시설" draggable="false" style="display:none; position:absolute; top:677px; right:440px; cursor:pointer; border: 3px outset red; z-index:10002;">
		<img id="bt_23" src="/img/tutorial/house/bt_23.png" alt="지역 종합현황 보기" draggable="false" style="display:none; position:absolute; top:284px; right:0px; cursor:pointer; border: 3px outset red; z-index:10002;">
		<img id="bt_24" src="/img/tutorial/house/bt_24.png" alt="10대" draggable="false" style="display:none; position:absolute; top:386px; right:354px; cursor:pointer; border: 3px outset red; z-index:10002;">
		<img id="bt_25" src="/img/tutorial/house/bt_25.png" alt="닫기" draggable="false" style="display:none; position:absolute; top:139px; right:-1px; cursor:pointer; border: 3px outset red; z-index:10002;">
		<img id="bt_26" src="/img/tutorial/house/bt_26.png" alt="라이프스타일 별 지표 설정" draggable="false" style="display:none; position:absolute; top:350px; left:289px; cursor:pointer; border: 3px outset red; z-index:10000;">
		<img id="bt_27" src="/img/tutorial/house/bt_27.png" alt="어린이를 키우는 맞벌이 부부" draggable="false" style="display:none; position:absolute; top:369px; left:203px; cursor:pointer; border: 3px outset red; z-index:10000;">
		
		<!-- 간편동네찾기 버튼 -->
		<img id="bt_28" src="/img/tutorial/house/bt_28.png" alt="간편동네찾기" draggable="false" style="display:none; position:absolute; top:139px; left:225px; cursor:pointer;  border: 3px outset red; z-index:10000;">
		<img id="bt_29" src="/img/tutorial/house/bt_29.png" alt="20대" draggable="false" style="display:none; position:absolute; top:463px; left:505px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_30" src="/img/tutorial/house/bt_30.png" alt="열공 동네" draggable="false" style="display:none; position:absolute; top:531px; left:592px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_31" src="/img/tutorial/house/bt_31.png" alt="전국" draggable="false" style="display:none; position:absolute; top:631px; left:645px; cursor:pointer;  border: 3px outset red; z-index:10001;">
		<img id="bt_32" src="/img/tutorial/house/bt_32.png" alt="대전광역시" draggable="false" style="display:none; position:absolute; top:778px; left:645px; cursor:pointer; border: 3px outset red; z-index:10002;">
		<img id="bt_33" src="/img/tutorial/house/bt_33.png" alt="아파트" draggable="false" style="display:none; position:absolute; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_34" src="/img/tutorial/house/bt_34.png" alt="다음" draggable="false" style="display:none; position:absolute; top:835px; left:895px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_35" src="/img/tutorial/house/bt_35.png" alt="학원 수가 많은 지역" draggable="true" style="display:none; position:absolute; top:442px; left:482px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_36" src="/img/tutorial/house/bt_36.png" alt="2인이상 가구 비율이 높은 지역" draggable="false" style="display:none; position:absolute; top:496px; left:597px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_37" src="/img/tutorial/house/bt_37.png" alt="간편 동네 찾기" draggable="false" style="display:none; position:absolute; top:827px; left:722px; cursor:pointer; border: 3px outset red; z-index:10001;">
		<img id="bt_38" src="/img/tutorial/house/bt_38.png" alt="창 닫기" draggable="false" style="display:none; position:absolute; top:134px; right:-6px; cursor:pointer; border: 3px outset red; z-index:20000;">
		
		<!-- 주거현황보기 map -->
		<img id="map_01" src="/img/tutorial/house/map_01.png" alt="시군구 지도" draggable="false" style="display:none; position:absolute; top:172px; left:0px; cursor:pointer;">
		<img id="map_02" src="/img/tutorial/house/map_02.png" alt="동 지도" draggable="false" style="display:none; position:absolute; top:172px; left:0px; cursor:pointer;">
		<img id="map_03" src="/img/tutorial/house/map_03.png" alt="초등학교 지도" draggable="false" style="display:none; position:absolute; top:172px; left:0px; cursor:pointer;">
		<img id="map_04" src="/img/tutorial/house/map_04.png" alt="대전둔산초등학교 지도" draggable="false" style="display:none; position:absolute; top:172px; left:0px; cursor:pointer; z-index:10000;">
		
		<!-- 추천지역찾기 map -->
		<img id="map_05" src="/img/tutorial/house/map_05.png" alt="지도" draggable="false" style="display:none; position:absolute; top:170px; left:0px; cursor:pointer; z-index:10000;">
		<img id="map_06" src="/img/tutorial/house/map_06.png" alt="지도" draggable="false" style="display:none; position:absolute; top:170px; left:0px; cursor:pointer; z-index:10000;">
		<img id="map_07" src="/img/tutorial/house/map_07.png" alt="지도" draggable="false" style="display:none; position:absolute; top:170px; left:0px; cursor:pointer; z-index:10000;">
		<img id="map_08" src="/img/tutorial/house/map_08.png" alt="지도" draggable="false" style="display:none; position:absolute; top:170px; left:0px; cursor:pointer; z-index:10000;">
		
		<!-- 간편동네찾기 map -->
		<img id="map_09" src="/img/tutorial/house/map_09.png" alt="동지도" draggable="false" style="display:none; position:absolute; top:172px; left:0px; cursor:pointer; z-index:10000;">
		
		<!-- 지도 우측 상단 -->
		<img id="map_10" src="/img/tutorial/house/map_10.png" alt="우측퀵버튼" altdraggable="false" style="display:none; position:absolute; top:172px; right:0px; cursor:pointer; z-index:10002;">
		<img id="map_11" src="/img/tutorial/house/map_11.png" alt="학구도 리스트" draggable="false" style="display:none; position:absolute; top:172px; right:0px; cursor:pointer; z-index:10000;">
		
		<!-- 범례 이미지 공통 -->
		<img id="map_12" src="/img/tutorial/house/map_12.png" alt="범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer; z-index:10000;">
		<img id="map_12_1" src="/img/tutorial/house/map_12_1.png" alt="범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer; z-index:10001;">
		<img id="map_12_2" src="/img/tutorial/house/map_12_2.png" alt="범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer; z-index:10001;">
		<img id="map_12_3" src="/img/tutorial/house/map_12_3.png" alt="범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer; z-index:10001;">
		<img id="map_12_4" src="/img/tutorial/house/map_12_4.png" alt="범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer; z-index:10001;">
		
		<!-- 주거현황보기, 추천지역찾기 통계치 -->
		<img id="map_13" src="/img/tutorial/house/map_13.png" alt="통계치" draggable="false" style="display:none; position:absolute; top:435px; left:935px; cursor:pointer; z-index:10000">
		<img id="map_14" src="/img/tutorial/house/map_14.png" alt="통계치" draggable="false" style="display:none; position:absolute; top:464px; left:854px; cursor:pointer; border: 3px outset red; z-index:10000">
		<img id="map_15" src="/img/tutorial/house/map_15.png" alt="통계치" draggable="false" style="display:none; position:absolute; top:465px; left:1000px; cursor:pointer; z-index:10000">
		<img id="map_16" src="/img/tutorial/house/map_16.png" alt="통계치" draggable="false" style="display:none; position:absolute; top:394px; left:465px; cursor:pointer; border: 3px outset red; z-index:10000">
		<img id="map_17" src="/img/tutorial/house/map_17.png" alt="통계치" draggable="false" style="display:none; position:absolute; top:400px; left:647px; cursor:pointer; z-index:10000">
		
		<!-- 간편동네찾기 팝업  -->
		<img id="popup_01" src="/img/tutorial/house/popup_01.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">
		<img id="popup_02" src="/img/tutorial/house/popup_02.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">
		<img id="popup_03" src="/img/tutorial/house/popup_03.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">
		<img id="popup_04" src="/img/tutorial/house/popup_04.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">		
		<img id="popup_05" src="/img/tutorial/house/popup_05.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">
		<img id="popup_06" src="/img/tutorial/house/popup_06.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">
		<img id="popup_07" src="/img/tutorial/house/popup_07.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">
		<img id="popup_08" src="/img/tutorial/house/popup_08.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:172px; left:250px; cursor:pointer; z-index:10000;">
		<img id="popup_09" src="/img/tutorial/house/popup_09.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:623px; left:273px; cursor:pointer; border: 3px outset red; z-index:10000;">
		<img id="popup_10" src="/img/tutorial/house/popup_10.png" alt="팝업" draggable="false" style="display:none; position:absolute; top:623px; left:590px; cursor:pointer; border: 3px outset red; z-index:10000;">
		
		
		<!-- 데이터보드 -->
		<img id="dataBoard_01" src="/img/tutorial/house/dataBoard_01.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:138px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_02" src="/img/tutorial/house/dataBoard_02.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_02_1" src="/img/tutorial/house/dataBoard_02_1.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_03" src="/img/tutorial/house/dataBoard_03.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_03_1" src="/img/tutorial/house/dataBoard_03_1.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_04" src="/img/tutorial/house/dataBoard_04.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_05" src="/img/tutorial/house/dataBoard_05.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_06" src="/img/tutorial/house/dataBoard_06.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
		<img id="dataBoard_07" src="/img/tutorial/house/dataBoard_07.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10018;">
				
		<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
		<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
		<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
		<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">
			
		<img id="toPoint_2_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">	
	</div>





</body>
</html>