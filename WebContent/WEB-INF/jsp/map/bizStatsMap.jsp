<%
/**************************************************************************************************************************
* Program Name  : 창업통계맵 JSP  
* File Name     : bizStatsMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
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
		if (strType.equals("bookmark")   		|| 
			strType.equals("sharedata")  		||
			strType.equals("totalindex") 		||
			strType.equals("population") 		||
			strType.equals("company") 	 		||
			strType.equals("household")	 		||
			strType.equals("house")		 		||
			strType.equals("farmhousehold") 	||
			strType.equals("forestryhousehold") ||
			strType.equals("fisheryhousehold") 	||
			strType.equals("householdmember") 	||
			strType.equals("kosis")				||
			strType.equals("recentdata")		||
			strType.equals("userdata")) {
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
	    <title>우리동네 생활업종 | 통계지리정보서비스</title>

		<link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 
	    <link href="/css/map/bizStatsHelper.css" rel="stylesheet" type="text/css" />
<!-- 		<link rel='shortcut icon' href='/img/ico/n_favicon.png'/>	   -->
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" type="text/css" href="/css/map/bxslider.css">
	    <link rel="stylesheet" href="/css/popup.css">
	    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script type="text/javascript" src="/js/plugins/store.min.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts-3d.src.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts-more.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script type="text/javascript" src="/js/plugins/btoa.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highchart.drag.js"></script>
	    
	    <!-- 2016.03.23 j.h.Seok -->
<!-- 	    <link rel="stylesheet" type="text/css" href="/css/handsontable.css"> -->
<!-- 	    <script type="text/javascript" src="/js/plugins/handsontable.js"></script> -->
	    <link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>
	    
		<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
		<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
		<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script type="text/javascript" src="/js/common/map.js"></script>
	    <script type="text/javascript" src="/js/common/common.js"></script>
	    <script type="text/javascript" src="/js/common/mapNavigation.js"></script>
	    <script type="text/javascript" src="/js/common/mapInfo/publicDataBoard.js"></script>
		<script type="text/javascript" src="/js/common/mapInfo/mydataDataBoard.js"></script>
		<script type="text/javascript" src="/js/plugins/libs/jquery.bxslider.min.js"></script>
	    <script type="text/javascript" src="/js/bizStats/bizStatsMap.js"></script>
	    <script type="text/javascript" src="/js/bizStats/bizStatsMapApi.js"></script>
	    <script type="text/javascript" src="/js/bizStats/bizStatsLeftMenu.js"></script>
		<script type="text/javascript" src="/js/bizStats/bizStatsDataBoard.js"></script>
		<script type="text/javascript" src="/js/bizStats/bizStatsDataBoardApi.js"></script>
	    <script type="text/javascript" src="/js/interactive/interactiveMapBtn.js"></script>
	    <script type="text/javascript" src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>
	    
	    <!-- 사용자지정 컨트롤  -->
		<script type="text/javascript" src="/js/thematicMap/thematicMap_api.js"></script>
	    <script type="text/javascript" src="/js/common/mapDraw/Draw.Feature.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Manager.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/draw/Draw.Cricle.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/draw/Draw.Polygon.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Overlay.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Distance.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Poi.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script>
        <script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Measure.js"></script>
        
        <script type="text/javascript" src="/js/board/jquery.paging.js"></script>
        <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
        
		<!-- 생활업종 통계지도 퍼블리싱 CSS 추가 -->
	    <link rel="stylesheet" type="text/css" href="/css/map/bizStats.css">
	    
	    <script type="text/javascript"  src="/js/interactive/kakao_script_api.js"></script>
	    
	     <!-- 통계갤러리 -->
        <script type="text/javascript" src="/js/plugins/slick.min.js"></script>  
		<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
	    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
    	<script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/rgbcolor.js"></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/canvg.js"></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->
        
        <!-- 튜토리얼 -->
        <link rel="stylesheet" href="/css/tutorial/tutorial.css">
       	<script type="text/javascript" src="/js/bizStats/bizStatsTutorial.js"></script>
		 
		 <script>
       		$(document).ready(
    			function() {
    				// mng_s 20180412_김건민 
//    				if(getCookie("confirmMsg") == ""){
//	       				$(".Popup_Info").hide();
//   					readyTutorial();
//    				}
    				// mng_e 20180412_김건민 
	       			if($(location).attr('search').match("tutorial_mode")){
	       				$(".Popup_Info").hide();
	    				startTutorial();
	       			}
// 					if($bizStatsMap.ui.getCookie("confirmMsg") == ""){
// 	       				$(".Popup_Info").hide();
//     					$bizStatsMap.ui.readyTutorial();
//     				}
// 	       			if($(location).attr('search').match("tutorial_mode")){
// 	       				$(".Popup_Info").hide();
// 	    				$bizStatsMap.ui.startTutorial();
// 	       			}
    				
    				//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
<%--     				if ("<%=strType%>" != "bookmark"   		  &&  --%>
<%--     					"<%=strType%>" != "recentdata" 		  &&  --%>
<%--     					"<%=strType%>" != "userdata"   		  &&  --%>
<%--     					"<%=strType%>" != "sharedata"  		  && --%>
<%--     					"<%=strType%>" != "totalindex" 		  && --%>
<%--     					"<%=strType%>" != "population" 		  && --%>
<%--     					"<%=strType%>" != "company"    		  && --%>
<%--     					"<%=strType%>" != "household"  		  && --%>
<%--     					"<%=strType%>" != "house"      		  && --%>
<%--     					"<%=strType%>" != "farmhousehold" 	  && --%>
<%--     					"<%=strType%>" != "forestryhousehold" && --%>
<%--     					"<%=strType%>" != "fisheryhousehold"  && --%>
<%--     					"<%=strType%>" != "householdmember"   && --%>
<%--     					"<%=strType%>" != "kosis") { --%>
//     					$(".sideQuick.sq02").click();
//     				}
    				if("<%=strType%>" == "sharedata" || "<%=strType%>" == "bookmark"){
    					
    					//alert("[bizStatsMap.jsp] strType [" + "<%=strType%>");
    					//alert("[bizStatsMap.jsp] paramObj [" + <%=paramObj%>); //이걸 자바스크립트에서 찍어보면 paramObj값에 "가 들어가있어서 오류가 나는데 인지하기 어려우므로 sysout으로 찍어보기바람.
    					
	    				var param = null;
	    				var length = <%=paramObj.length()%>;
	    				if (length == 0) {
	    					param = "";
	    				}else {
	    					param = JSON.parse(<%=paramObj%>); //JSON.parse() 안에 파라미터 넣을때 "를 넣으면 오류가 나고 오류인지가 어려우므로 "를 넣지 않도록 주의바람
	    				}
	    				$bizStatsMap.ui.doAnalysisShareInfo("<%=strType%>", param);
    				}
	    		}
   			);
	 	 </script>

</head>
<body>
	<div id="wrap" style="height: 300px;">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div class="containerBox">
			<div class="rela">
				<div class="sceneBox on" id="view1">
					<div class="sceneRela">
						<div class="toolBar">
							<h2>우리동네 생활업종</h2>
							<div class="viewTitle">
								<span style="background: #0070c0;">VIEW 1</span>
							</div>
							<!-- 네비게이터 -->
							<div id="mapNavi_1"></div>

							<div class="tb_right" id="btnList_1">
								<!-- <img id="tuto_start_btn" src="/img/tutorial/tuto_start_btn.png" alt="튜토리얼시작" style="cursor:pointer; display:block; position:absolute; margin-top:3px; right:415px;" onclick="readyTutorial();" title="사용법 따라하기"> -->
								<!-- mng_s 20180412_김건민 --> 
								<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 411px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="readyTutorial();" title="사용법 따라하기">튜토리얼</button>
								<!-- mng_e 20180412_김건민 -->
								<span class="tb_inner" style="font-size: 12px;">사업체전개도</span>
								<div class="tb_radio tb_inner on" style="margin-right: 15px;">
									<a onclick="javascript:$bizStatsMap.ui.doInnerMap(1);" style="cursor: pointer;" title="사업체전개도 토글" ></a>
								</div>
								<span class="tb_trade" style="font-size: 12px;">상권정보</span>
								<div class="tb_radio tb_trade on">
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(1);" style="cursor: pointer;" title="상권정보 토글" ></a>
								</div>
								<ul>
									<li><a onclick="javascript:$bizStatsMap.ui.doMaxSize(1);" class="tb_sizing" style="cursor: pointer;" title="전체 화면 확대" ><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대" /></a></li>
									<li><a onclick="javascript:$bizStatsMap.ui.doClearMap(1);" class="tb_clear" style="cursor: pointer;" title="초기화" ><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li id="bizStatsMapUrlShare"><a onclick="javascript:$bizStatsMap.ui.doShare(1);" style="cursor:pointer;" title="URL 공유하기"><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"></a></li>
									<li id="bizStatsMapBookmark"><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
									<li style="display:none;"><a onclick="javascript:$bizStatsMap.ui.reportDataSet(1);" class="tb_report" style="cursor: pointer;" title="보고서 보기" ><img src="/img/ico/ico_toolbars06.png" alt="보고서 보기" /></a></li>
								</ul>
								<a onclick="javascript:$bizStatsMap.ui.doRemoveMap(1);" class="tb_close" style="cursor: pointer;" title="창닫기" ><img src="/img/um/btn_closel04.png" alt="창닫기" style="height: 34px;" /></a>
							</div>
						</div>
						<div class="interactiveBar">
							<!-- map topbar -->
							<p class="helperText" style="margin-left: 150px;">왼쪽 통계메뉴 버튼을 클릭하여 항목을 선택하고 통계버튼을 만드세요.</p>
							<a onclick="javascript:window.open('/view/newhelp/so_help_10_0');">이용법</a>
							<a onclick="javascript:$('#help-indicator').show();">생활업종현황</a>
						</div>
						<!-- map topbar -->

						<div class="mapContents" id="mapRgn_1"></div>
						
						
						<!-- 맵영역 -->
						<div class="resizeIcon">
							<!-- 리사이즈 아이콘 -->
						</div>

					</div>
				</div>

				<div class="sceneBox" id="view2">
					<div class="sceneRela">
						<div class="toolBar">
							<div class="viewTitle">
								<span style="background: #9ed563;">VIEW 2</span>
							</div>
							<!-- 네비게이터 -->
							<div id="mapNavi_2"></div>

							<div class="tb_right" id="btnList_2">
								<div class="tb_radio tb_trade">
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, false);" class="fl" style="cursor: pointer;">체크1</a>
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, true);" class="fr" style="cursor: pointer;">체크2</a>
								</div>
								<ul>
									<li><a onclick="javascript:$bizStatsMap.ui.doMaxSize(2);" class="tb_sizing" style="cursor: pointer;"><img src="/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									<li><a onclick="javascript:$bizStatsMap.ui.doClearMap(2);" class="tb_clear" style="cursor: pointer;"><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>		
									<li style="display:none;"><a onclick="javascript:$bizStatsMap.ui.reportDataSet(2);" class="tb_report" style="cursor: pointer;"><img src="/img/ico/ico_toolbars06.png" alt="보고서출력" /></a></li>
<!-- 									<li><a onclick="javascript:$bizStatsMap.ui.doAddMap(2);" class="tb_mapAdd" style="cursor: pointer;"><img src="/img/ico/ico_toolbars07.png" alt="지도추가" /></a></li> -->
								</ul>
								<a onclick="javascript:$bizStatsMap.ui.doRemoveMap(2);" class="tb_close" style="cursor: pointer;"><img src="/img/um/btn_closel03.png" alt="창닫기" style="height: 34px;" /></a>
							</div>
						</div>
						<div class="interactiveBar">
							<!-- map topbar -->
							<p class="helperText">아래 메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요</p>
						</div>
						<!-- map topbar -->

						<div class="mapContents" id="mapRgn_2"></div>
						<!-- 맵영역 -->
						<div class="resizeIcon">
							<!-- 리사이즈 아이콘 -->
						</div>

					</div>
				</div>

				<div class="sceneBox" id="view3">
					<div class="sceneRela">
						<div class="toolBar">
							<div class="viewTitle">
								<span style="background: #ff0066;">VIEW 3</span>
							</div>
							<!-- 네비게이터 -->
							<div id="mapNavi_3"></div>

							<div class="tb_right" id="btnList_3">
								<div class="tb_radio tb_trade">
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, false);" class="fl" style="cursor: pointer;">체크1</a>
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, true);" class="fr" style="cursor: pointer;">체크2</a>
								</div>
								<ul>
									<li><a onclick="javascript:$bizStatsMap.ui.doMaxSize(3);" class="tb_sizing" style="cursor: pointer;"><img src="/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									<li><a onclick="javascript:$bizStatsMap.ui.doClearMap(3);" class="tb_clear" style="cursor: pointer;"><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li style="display:none;"><a onclick="javascript:$bizStatsMap.ui.reportDataSet(3);" class="tb_report" style="cursor: pointer;"><img src="/img/ico/ico_toolbars06.png" alt="보고서출력" /></a></li>
<!-- 									<li><a onclick="javascript:$bizStatsMap.ui.doAddMap(3);" class="tb_mapAdd" style="cursor: pointer;"><img src="/img/ico/ico_toolbars07.png" alt="지도추가" /></a></li> -->
								</ul>
								<a onclick="javascript:$bizStatsMap.ui.doRemoveMap(3);" class="tb_close" style="cursor: pointer;"><img src="/img/um/btn_closel02.png" alt="창닫기" style="height: 34px;" /></a>
							</div>
						</div>
						<div class="interactiveBar">
							<!-- map topbar -->
							<p class="helperText">아래 메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요</p>
						</div>
						<!-- map topbar -->

						<div class="mapContents" id="mapRgn_3"></div>
						<!-- 맵영역 -->
						<div class="resizeIcon">
							<!-- 리사이즈 아이콘 -->
						</div>

					</div>
				</div>


				<!-- 조회버튼 -->
		    	<a href="javascript:void(0)" class="sideQuick sq02" id="map_left_btn">
		    		<span>통계메뉴</span>
		    		<img src="/img/ico/ico_totalmenu.gif" alt="통계메뉴" />
		    	</a>
		     
		     	<div class="buttonBar">
			    	<a href="javascript:void(0)" class="sideQuick sq03">
			    		<span>선택항목</span>
			    		<img src="/img/ico/ico_resultbtn.gif" alt="선택항목" />
			    	</a>
					<div class="sqListBox sq03">
						<div class="sqTabs">
							<!-- 
			    			<span>조회타입설정</span>
			    			<a href="javascript:$bizStatsLeftMenu.ui.changeFindingType(1);" id="statisbtn" class="on"><img src="/img/ico/ico_click.png" alt="통계버튼목록"></a>
				    		<a href="javascript:$bizStatsLeftMenu.ui.changeFindingType(2);" id="dragbtn" class=""><img src="/img/ico/ico_drag.png" alt="드래그앤드롭"></a>
				    		 -->  
			    		</div>
						<div id="searchBtnResultRgn" class="sqList">
							<ul></ul>
						</div>
					</div>
				</div>

				<!-- left menu -->
				<div class="leftArea">
					<!-- Top Include -->
					<jsp:include page="/view/bizStats/bizStatsLeftMenu"></jsp:include>
				</div>
				
				<!-- 데이터보드 -->
				<div id="dataBoard">
					<jsp:include page="/view/bizStats/bizStatsDataBoard"></jsp:include>
				</div>
				<!-- 데이터보드 end-->
				
				<!-- 갤러리 등록 및 즐겨찾기 -->
				<jsp:include page="/view/map/gallaryDialog"></jsp:include>
				
				<!-- 공유팝업  -->
		    	<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
					<div class="topbar">
						<span>조회한 통계결과  URL공유하기</span>
						<a onclick="javascript:$bizStatsMap.ui.doCancel('sharedlg');">닫기</a>
					</div>
					<div class="popContents">
						<ul class="listFormPop">
							<li>
								<label for="urlsubj" class="label">URL 내용 :</label>
								<input type="text" id="urlsubj" class="inp" readonly=readonly />
							</li>
							<li>
								<div style="width:100%;margin:auto 0">
									<table style="margin:auto;width:270px;height:30px;margin-top:10px" summary="URL공유하기 SNS 목록">
										<tr style="height:30px;line-height:1px;">
											<td valign="middle">
												<a href="javascript:$bizStatsMap.ui.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
											</td>
											<td valign="middle">
												<div id="twitterDiv" style="margin-left:25px;">
													<!-- <a class='twitter-share-button' href='//twitter.com/share' data-count='none'>twitter</a> -->
												</div>
											</td>
											<td valign="middle">
												<div id="facebookDiv"></div>
											</td>
										</tr>
									</table>
								</div>
							</li>
						</ul>
						<p class="txt">SGIS+plus 사용자간 통계조회 결과의<br />자유로운 열람이 가능합니다.</p>
						<div class="btnBox">
							<a onclick="javascript:$bizStatsMap.ui.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
							<a onclick="javascript:$bizStatsMap.ui.doCancel('sharedlg');" class="btnStyle01">닫기</a>
						</div>
					</div>
				</div>
				
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
							<a onclick="javascript:$bizStatsMap.ui.doDone('bookmarkdlg');"
								class="btnStyle01">My Page 저장</a> <a
								onclick="javascript:$bizStatsMap.ui.doCancel('bookmarkdlg');"
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
								검색한 데이터로 갤러리를 등록 하시겠습니까?<br />즐겨찾기 하시겠습니까?
							</p>
							<div class="btnBox">
								<a href="javascript:$galleryAdd.interactiveGalleryPopHide();$galleryAdd.interactiveMyGalleryDialogPopOpen()" class="btnGtype">갤러리 등록</a> 
								<a href="javascript:$bizStatsMap.ui.doBookMark(1, 'BMAP');" class="btnGtype">즐겨찾기</a> 
								<a onclick="javascript:$('#myGalleryPop').hide();" class="btnGtype">취소</a> <!-- 2017.02.23 -->
							</div>
						</div>
					</div>
				
			</div>
			
			<!-- ( mask ) -->
			<div class="deem" style="display: none;"></div> 
			<!-- ( mask ) -->
			
		</div>
		

		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		</footer>
	</div>
	
	<script>
		 //트위터
		window.twttr = (function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0],
			    t = window.twttr || {};
			  if (d.getElementById(id)) return t;
			  js = d.createElement(s);
			  js.id = id;
			  js.src = "https://platform.twitter.com/widgets.js";
			  fjs.parentNode.insertBefore(js, fjs);
			 
			  t._e = [];
			  t.ready = function(f) {
			    t._e.push(f);
			  };
			 
			  return t;
		}(document, "script", "twitter-wjs"));
		
		window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '893451250742184', //'893451250742184'(상용),//'1516531411965359'(이전),
		      xfbml      : true,
		      version    : 'v2.5'//'v2.4'
		    });
		};

		 //페이스북
		window.facebook =(function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "https://connect.facebook.net/ko_KR/sdk.js";
		     fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
	</script>
	
	<!-- 생활업종현황 도움말 -->
	<jsp:include page="/view/bizStats/bizStatsHelper"></jsp:include>

	<!--하루동안 열지않기  -->
	<div class="Popup_Info" id="bizStats_laypopup">
		<div class="PopupCont">
			<h1>생활업종지도 이용안내</h1>
			<button type="button" class="Popup_close1" onclick="javascript:commonPopupObj.closeWin('bizStats_laypopup', 1);">창닫기</button>
			<img src="${pageContext.request.contextPath}/img/nm/guide_startup_small_businesses2.png" alt="생활업종지도 이용안내">
			<div class="CloseZone">
				<label><input type="checkbox" name="close" value="OK" />오늘 하루 열지 않음</label>
				<button type="button" class="Popup_close2" onclick="javascript:commonPopupObj.closeWin('bizStats_laypopup', 1);">창닫기</button>
			</div>
		</div>
		<div class="PopupBg">&nbsp;</div>
	</div>
	
	<div id ="dataBoardImgDiv" style="display:none; float: right; width:549px; height:882px; top:138px; right:0px; position:absolute; z-index:10003;">
		<img id="area2006Img" src="/img/tutorial/area2006Img.png" alt="2006년" draggable="false">
		<img id="toPoint_db3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:450px; z-index: 10004;">				
	</div>
	
	<div id="tuto_dimbox" draggable="false" style="display:none; width:1226px; height:660px; position:absolute; left:40%; top:50%; margin:-300px 0 0 -500px; z-index:10004;">
		<img id="compareInfoImg" src="/img/tutorial/compareInfoImg.png" alt="상세비교하기" draggable="false">
		<img id="xxImg" src="/img/tutorial/xxImg.png" draggable="false" alt="닫기" style="float:right; cursor:pointer;  border: 3px outset red;">
		<img id="toPoint_db2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false" style="display:none; position:absolute; left:1080px; top:0px; z-index: 10004;">				
	</div>
	
	<div class="tutorialWrapper" style= "display: none" draggable="false">
		<!-- mng_s 20180412_김건민 -->
		<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 415px; top:104px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="사용법 따라하기">튜토리얼 종료</button>
		<!-- mng_e 20180412_김건민 -->				
		<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
			<div id="tutorialText" draggable="false">
				<!-- mng_s 20180412_김건민 -->
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
				<!-- mng_e 20180412_김건민 -->
			</div>
		</div>	
		<img id="mainMenuImg" src="/img/tutorial/mainMenuImg.png" alt="통계메뉴" draggable="false">
		<img id="sidoBizMainImg" src="/img/tutorial/sidoBizMainImg.png" alt="시도별 생활업종 현황" draggable="false">
		<img id="bizMapImg1" src="/img/tutorial/bizMapImg1.png" alt="지도" draggable="false">
<!-- 		<img id="bizRightIconImg" src="/img/tutorial/bizRightIconImg.png" style="display:none; position:absolute; top:103px; right:1px;" draggable="false"> -->
		<img id="sidoBizPoiImg1" src="/img/tutorial/sidoBizPoiImg1.png" alt="POI" draggable="false">
		<img id="bizMapImg2" src="/img/tutorial/bizMapImg2.png" alt="지도" draggable="false">
		<img id="sidoBizDataBoardImg" src="/img/tutorial/sidoBizDataBoardImg.png" alt="데이터보드" draggable="false">
		<img id="sidoBizDbFoodImg" src="/img/tutorial/sidoBizDbFoodImg.png" alt="음식점" draggable="false">
		<img id="sidoBizDataBoardImg2" src="/img/tutorial/sidoBizDataBoardImg2.png" alt="데이터보드" draggable="false">
		<img id="pageClipImg" src="/img/tutorial/pageClipImg.png" alt="메뉴접기" draggable="false">
		<img id="sidoBizDataBoardImg3" src="/img/tutorial/sidoBizDataBoardImg3.png" alt="데이터보드" draggable="false">
<!-- 		<img id="cleanImg" src="/img/tutorial/cleanImg.png" draggable="false"> -->
		<img id="sggBizMainImg" src="/img/tutorial/sggBizMainImg.png" alt="시군구별 생활업종 현황" draggable="false">
		<img id="restaurantImg" src="/img/tutorial/restaurantImg.png" alt="음식점" draggable="false">
		<img id="restaurantOnImg" src="/img/tutorial/restaurantOnImg.png" alt="음식점 On" draggable="false">
		<img id="cafeImg" src="/img/tutorial/cafeImg.png" alt="카페" draggable="false">
		<img id="bizMapImg3" src="/img/tutorial/bizMapImg3.png" alt="지도" draggable="false">
		<img id="bizRedLegend1" src="/img/tutorial/bizRedLegend1.png" alt="범례" draggable="false">
		<img id="sggMapInfoImg" src="/img/tutorial/sggMapInfoImg.png" alt="지도결과" draggable="false">
		<img id="sggBizDataBoardImg1" src="/img/tutorial/sggBizDataBoardImg1.png" alt="데이터보드" draggable="false">
		<img id="sggMapInfoTooltip" src="/img/tutorial/sggMapInfoTooltip.png" alt="툴팁" draggable="false">
		<img id="chickenImg" src="/img/tutorial/chickenImg.png" alt="치킨" draggable="false">
		<img id="sggBizDataBoardImg2" src="/img/tutorial/sggBizDataBoardImg2.png" alt="데이터보드" draggable="false">
		<img id="sggInteriorImg" src="/img/tutorial/sggInteriorImg.png" alt="인테리어" draggable="false">
		<img id="sggBizDataBoardImg3" src="/img/tutorial/sggBizDataBoardImg3.png" alt="데이터보드" draggable="false">
		<img id="bizMapImg4" src="/img/tutorial/bizMapImg4.png" alt="지도" draggable="false">
		<img id="sggMapInfoImg2" src="/img/tutorial/sggMapInfoImg2.png" alt="지도결과" draggable="false">
		<img id="sggMapInfoTooltip2" src="/img/tutorial/sggMapInfoTooltip2.png" alt="지도결과 설명" draggable="false">
		<img id="bizMapImg5" src="/img/tutorial/bizMapImg5.png" alt="지도" draggable="false">
		<img id="sggBizDataBoardImg4" src="/img/tutorial/sggBizDataBoardImg4.png" alt="데이터보드" draggable="false">
		<img id="areaBizMainImg" src="/img/tutorial/areaBizMainImg.png" alt="업종 밀집도 현황" draggable="false">
		<img id="bizMapImg6" src="/img/tutorial/bizMapImg6.png" alt="지도" draggable="false">
		<img id="areaBizDataBoardImg1" src="/img/tutorial/areaBizDataBoardImg1.png" alt="데이터보드" draggable="false">
		<img id="areaHeatLegend" src="/img/tutorial/areaHeatLegend.png" alt="범례" draggable="false">
		<img id="areaHeatLegend2" src="/img/tutorial/areaHeatLegend2.png" alt="범례" draggable="false">
		<img id="heatRadiusImg" src="/img/tutorial/heatRadiusImg.png" alt="열지도 범례" draggable="false">
		<img id="areaHeatSido" src="/img/tutorial/areaHeatSido.png" alt="시도 열지도" draggable="false">
		<img id="bizMapImg7" src="/img/tutorial/bizMapImg7.png" alt="지도" draggable="false">
		<img id="areaBizDataBoardImg2" src="/img/tutorial/areaBizDataBoardImg2.png" alt="데이터보드" draggable="false">
		<img id="areaHeatSgg" src="/img/tutorial/areaHeatSgg.png" alt="시군구 열지도" draggable="false">
		<img id="bizMapImg8" src="/img/tutorial/bizMapImg8.png" alt="지도" draggable="false">
		<img id="serviceImg" src="/img/tutorial/serviceImg.png" alt="서비스" draggable="false">
		<img id="pcImg" src="/img/tutorial/pcImg.png" alt="PC방" draggable="false">
		<img id="areaBizDataBoardImg3" src="/img/tutorial/areaBizDataBoardImg3.png" alt="데이터보드" draggable="false">
		<img id="areaBizDataBoardImg5" src="/img/tutorial/areaBizDataBoardImg5.png" alt="데이터보드" draggable="false">
		
		<img id="searchBizMainImg" src="/img/tutorial/searchBizMainImg.png" alt="생활업종 후보지 검색" draggable="false">
		<img id="companyCntImg" src="/img/tutorial/companyCntImg.png" alt="사업체수" draggable="false">
		<img id="ccOption" src="/img/tutorial/ccOption.png" alt="사업체수 설정" draggable="false">
		<img id="employeeImg" src="/img/tutorial/employeeImg.png" alt="직장인구" draggable="false">
		<img id="searchBtnImg" src="/img/tutorial/searchBtnImg.png" alt="조건버튼 생성" draggable="false">
		<img id="bizMapImg9" src="/img/tutorial/bizMapImg9.png" alt="지도" draggable="false">
<!-- 		<img id="bizRightIconImg2" src="/img/tutorial/bizRightIconImg2.png" style="display:none; position:absolute; top:103px; right:1px;" draggable="false"> -->
		<img id="redLegendInfo1" src="/img/tutorial/redLegendInfo1.png" alt="범례" draggable="false">
		<img id="addrSearchImg" src="/img/tutorial/addrSearchImg.png" alt="주소검색" draggable="false">
		<img id="addrChoiceImg3" src="/img/tutorial/addrChoiceImg3.png" alt="주소선택" draggable="false">
		<img id="okImg" src="/img/tutorial/okImg.png" alt="확인" draggable="false">
		<img id="bizMapImg10" src="/img/tutorial/bizMapImg10.png" alt="지도" draggable="false">
		<img id="dragBizImg" src="/img/tutorial/dragBizImg.png" alt="선택항목" style="display:none; position:absolute; top:227px; left:-2px; border: 3px outset red; cursor:pointer; z-index:10001;" draggable="false">
		<img id="addrChoiceImg4" src="/img/tutorial/addrChoiceImg4.png" alt="주소선택" draggable="false">
		<img id="bizMapImg11" src="/img/tutorial/bizMapImg11.png" alt="지도" draggable="false">
		<img id="bizMapImg12" src="/img/tutorial/bizMapImg12.png" alt="지도" draggable="false">
		<img id="bizMapImg13" src="/img/tutorial/bizMapImg13.png" alt="지도" draggable="false">
		<img id="bizMapImg14" src="/img/tutorial/bizMapImg14.png" alt="지도" draggable="false">
		<img id="pcInfoImg1" src="/img/tutorial/pcInfoImg1.png" alt="pc방 상세내용" draggable="false">
		<img id="pcInfoImg2" src="/img/tutorial/pcInfoImg2.png" alt="pc방 상세내용" draggable="false">
		<img id="dropZone" src="/img/tutorial/dropZone.png" alt="드랍존" draggable="false">
		<img id="searchBizDataBoardImg1" src="/img/tutorial/searchBizDataBoardImg1.png" alt="데이터보드" draggable="false">
		<img id="compareImg" src="/img/tutorial/compareImg.png" alt="비교하기" draggable="false">
		<img id="galmaDetailBtn" src="/img/tutorial/galmaDetailBtn.png" alt="읍면동" draggable="false">
		<img id="galmaMapImg" src="/img/tutorial/galmaMapImg.png" alt="지도" draggable="false">
		<img id="galmaTooltip" src="/img/tutorial/galmaTooltip.png" alt="툴팁" draggable="false">
		<img id="searchBizDataBoardImg2" src="/img/tutorial/searchBizDataBoardImg2.png" alt="데이터보드" draggable="false">
		<img id="bizRedLegend2" src="/img/tutorial/bizRedLegend2.png" alt="범례" draggable="false">
		<img id="searchBizDataBoardImg3" src="/img/tutorial/searchBizDataBoardImg3.png" alt="데이터보드" draggable="false">
		<img id="searchBizDataBoardImg4" src="/img/tutorial/searchBizDataBoardImg4.png" alt="데이터보드" draggable="false">
		<img id="searchBizDataBoardImg5" src="/img/tutorial/searchBizDataBoardImg5.png" alt="데이터보드" draggable="false">
		<img id="searchJobGraphImg" src="/img/tutorial/searchJobGraphImg.png" alt="소상공인 업종별 증감" draggable="false">
		<img id="jobOpenImg" src="/img/tutorial/jobOpenImg.png" alt="업종별 개업 현황" draggable="false">
		<img id="jobOpenImg2" src="/img/tutorial/jobOpenImg2.png" alt="산업고용(3종)" draggable="false">
		<img id="jobOpenImg3" src="/img/tutorial/jobOpenImg3.png" alt="석유판매업(주유소)" draggable="false">
		<img id="bizMapImg15" src="/img/tutorial/bizMapImg15.png" alt="지도" draggable="false">
		<img id="jobOpenDataBoardImg" src="/img/tutorial/jobOpenDataBoardImg.png" alt="데이터보드" draggable="false">
		
		
		<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
		<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
		<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
		<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">
		
	</div>
</body>
</html>