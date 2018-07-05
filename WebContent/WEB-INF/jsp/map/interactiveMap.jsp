<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 JSP  
* File Name     : interactiveMap.jsp
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
<%@ page import="kostat.sop.ServiceAPI.common.security.Security" %>
<%
	String strType = "";
	String paramObj = "";
	try {
		Map map = (Map)request.getAttribute("paramInfo");
		strType = (String)map.get("type");	
		
		//2017.12.04 [개발팀] 시큐어코딩
		strType = Security.cleanXss(strType);
		
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
			strType.equals("publicdata")		|| //2017.07.13 [개발팀] 공공데이터 url
			strType.equals("userdata")) {
			paramObj = (String)map.get("paramObj");
		}
	} catch (IllegalArgumentException e) {
		System.out.println("처리중 에러가 발생하였습니다.");
	} catch (Exception e) {
		System.out.println("처리중 에러가 발생하였습니다.");
	}
%>

<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <title>대화형 통계지도 | 통계지리정보서비스</title>
	    
	    <link rel="stylesheet" type="text/css" href="/css/um.css" />
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" />

<!-- 	    <link rel='shortcut icon' href='/img/ico/n_favicon.png'/>  -->
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" href="/css/popup.css">
	    <link rel="stylesheet" href="/css/tutorial/tutorial.css">
	    <link rel="stylesheet" type="text/css" href="/css/tutorial/common.css">
	    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts-more.js"></script>
		<script type="text/javascript" src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>
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
	    <script type="text/javascript" src="/js/interactive/interactiveMap.js"></script>
	    <script type="text/javascript" src="/js/interactive/interactiveTutorial.js"></script>
<!-- 
		leekh 사용자 안내 rotation 추가 start
 -->
 	    <script type="text/javascript" src="/js/interactive/rotation/jquery.slides.min.js"></script> 
 	    <script type="text/javascript" src="/js/interactive/rotation/interactiveRotation.js"></script> 
<!-- 
		leekh 사용자 안내 rotation 추가 end
 -->
	    <script type="text/javascript" src="/js/interactive/interactiveMapApi.js"></script>
	    <script type="text/javascript" src="/js/interactive/interactiveMapBtn.js"></script>
	    <script type="text/javascript" src="/js/interactive/interactiveMap_kosis.js"></script>
	    <script type="text/javascript" src="/js/interactive/interactiveLeftMenu.js"></script>
		<script type="text/javascript" src="/js/interactive/interactiveDataBoard.js"></script>
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
     	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
        <!--[If IE 9]>    
			<script type="text/javascript" src="/js/common/classList.js"></script>
		<![endif]-->
		
        <!-- 공유  -->
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
        
        <script>
       		$(document).ready(
    			function() {
    			//mng_s 20180412_김건민	
				/* if(getCookie("confirmMsg") == ""){
	       				$(".Popup_Info").hide();
    					readyTutorial();
    				} */
    			//mng_e 20180412_김건민	
	       			if($(location).attr('search').match("tutorial_mode")){
	       				$(".Popup_Info").hide();
	    				startTutorial();
	       			}
    				
    				//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
    				if ("<%=strType%>" != "bookmark"   		  && 
    					"<%=strType%>" != "recentdata" 		  && 
    					"<%=strType%>" != "userdata"   		  && 
    					"<%=strType%>" != "sharedata"  		  &&
    					"<%=strType%>" != "totalindex" 		  &&
    					"<%=strType%>" != "population" 		  &&
    					"<%=strType%>" != "company"    		  &&
    					"<%=strType%>" != "household"  		  &&
    					"<%=strType%>" != "house"      		  &&
    					"<%=strType%>" != "farmhousehold" 	  &&
    					"<%=strType%>" != "forestryhousehold" &&
    					"<%=strType%>" != "fisheryhousehold"  &&
    					"<%=strType%>" != "householdmember"   &&
    					"<%=strType%>" != "kosis") {
    					$(".sideQuick.sq02").click();
    				}
    				
    				var param = null;
    				var length = <%=paramObj.length()%>;
    				if (length == 0) {
    					param = "";
    				}else {
    					param = JSON.parse(<%=paramObj%>);
    				}
    				console.log("[interactiveMap.jsp] strType["+"<%=strType%>");
    				$interactiveMap.ui.doAnalysisShareInfo("<%=strType%>", param);
    		});
       		
    	    function popupRotation(){
    	    	popX=$(".PopupCont")[0].offsetLeft;
    	    	popY=$(".PopupCont")[0].offsetTop;
    	    	var url = '/jsp/board/popRotation.jsp';
    		    var options = 'toolbar=yes,scrollbars=yes,resizable=yes,copyhistory=yes,'+
    		                  'status=yes,location=yes,menubar=no,width=977,height=600,top='+popY+',left='+popX; 
    		   window.open(url, '', options);
    		   $(".Popup_Info").hide();
    	    }
    	    
    		function gridPop(){
    			var url = '/view/board/gridWrite?write';
    		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
    		                  'status=no,location=no,menubar=no,top=200,left=200'; 
    		   window.open(url, '', options);
 	  		   $(".Grid_Info").hide();
    		}
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
					<!-- <img src="/img/common/icon_temp_sseok_2.png" id="mapRgn_lock_btn" class="rock off" alt="locked" style="position: absolute; z-index: 500; top: 50%; left: 49%; cursor: pointer; display:none;"> -->
					<div class="sceneBox on" id="view1">
						<div class="sceneRela">
							<div class="toolBar">
								<!-- mng_s 20170908_김건민 -->
								<h2>대화형 통계지도</h2>
								<!-- mng_e 20170908_김건민 -->
								<div class="viewTitle"><span style="background:#0070c0;">VIEW 1</span></div>
								<!-- 네비게이터 -->
								<div id="mapNavi_1"></div>
								<img id='interactive_magni' src='/img/popup/magni_plus.png' alt='돋보기' style='cursor: pointer; margin-top:3px; margin-left:5px;'></img>								
								<div class="tb_right" id="btnList_1">

									<!-- mng_s 20180412_김건민 -->
									<!-- <img id="rotationTip" src="/img/interactiveMapRotation/rotationTipImg.png" alt="고급기능소개" style="cursor:pointer; display:block; position:absolute; margin-top:3px; right:450px;" onclick="javascript:openRotationTip();"> -->
									<button type="button" id="rotationTip" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 450px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="javascript:openRotationTip();" title="고급기능소개">고급기능소개</button>
									<!-- <img id="tuto_start_btn" src="/img/tutorial/tuto_start_btn.png" alt="튜토리얼시작" style="cursor:pointer; display:block; position:absolute; margin-top:3px; right:350px;" onclick="readyTutorial();" title="사용법 따라하기"> -->
									<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 350px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="readyTutorial();" title="사용법 따라하기">튜토리얼</button>
									<!-- mng_e 20180412_김건민 -->

									
									<!-- mng_s_20180205_kimjoonha 행정구역경계 그리드 버튼 -->
									<!-- <div class="bnd_grid_radio" style="display:none;"> --><!-- 경계 그리드 오픈시 주석처리후 바로 아래쪽라인 주석해제 -->
									<div class="bnd_grid_radio">
										<a onclick="javascript:$interactiveMap.ui.doInnerMap3(1, false);" class="fl" style="cursor:pointer;" title="행정구역단위 그리드 끄기"  >체크1</a>
										<a onclick="javascript:$interactiveMap.ui.doInnerMap3(1, true);" class="fr" style="cursor:pointer;" title="행정구역단위 그리드 보기" >체크2</a>
									</div>
									<!-- mng_e_20180205_kimjoonha -->
									
									<!-- mng_s_20170711_kimjoonha -->
									<!-- <div class="grid_radio" style="display:none;"> --><!-- 그리드 오픈시 주석처리후 바로 아래쪽라인 주석해제 20171030 -->
									<div class="grid_radio">
										<a onclick="javascript:$interactiveMap.ui.doInnerMap2(1, false);" class="fl" style="cursor:pointer;" title="그리드 끄기"  >체크1</a>
										<a onclick="javascript:$interactiveMap.ui.doInnerMap2(1, true);" class="fr" style="cursor:pointer;" title="그리드 보기" >체크2</a>
									</div>
									<!-- mng_e_20170711_kimjoonha -->
									
									<div class="tb_radio">
										<a onclick="javascript:$interactiveMap.ui.doInnerMap(1, false);" class="fl" style="cursor:pointer;" title="사업체전개도 끄기"  >체크1</a>
										<a onclick="javascript:$interactiveMap.ui.doInnerMap(1, true);" class="fr" style="cursor:pointer;" title="사업체전개도 보기" >체크2</a>
									</div>
									<ul> 
										<!-- 2017.07.24 [개발팀] 클래스명 추가 START  -->
										<li><a onclick="javascript:$interactiveMap.ui.doMaxSize(1);" class="tb_sizing" style="cursor:pointer;" title="전체 화면 확대"><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doClearMap(1);" style="cursor:pointer;" title="초기화" ><img src="/img/ico/ico_toolbars02.png" alt="초기화"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doShare(1);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li>
										<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
										<!-- <li><a onclick="javascript:$interactiveMap.ui.doBookMark(1);" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li> -->
										<!-- <li><a onclick="javascript:$interactiveMap.ui.addGallery(1);"><img src="/img/ico/ico_toolbars05.png" alt="통계갤러리 추가"/></a></li> -->
										<li><a onclick="javascript:$interactiveMap.ui.reportDataSet(1);" class="tb_report" style="cursor:pointer;" title="보고서 보기" ><img src="/img/ico/ico_toolbars06.png" alt="보고서 보기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doAddMap(1);" class="tb_mapAdd" style="cursor:pointer;" title="지도 추가하여 비교하기" ><img src="/img/ico/ico_toolbars07.png" alt="지도 추가하여 비교하기"/></a></li>
										<li style="display:none;"><a onclick="javascript:$interactiveMap.ui.doCombineMap(1);" class="tb_combine" style="cursor:pointer;" title="지도 겹쳐보기" ><img src="/img/ico/ico_toolbars08.png" alt="지도 겹쳐보기"/></a></li>
										<!-- 2017.07.24 [개발팀] 클래스명 추가 END  -->
									</ul> 
									<a onclick="javascript:$interactiveMap.ui.doRemoveMap(1);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel04.png" alt="창닫기" style="height:34px;"/></a>
								</div>
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<p class="helperText" id="helper_1" style="margin-left:150px;">왼쪽 통계메뉴 버튼을 클릭하여 항목을 선택하고 통계버튼을 만드세요.</p>
					    		<p class="helperText" id="title_1" style="display:none;"></p>  
					    		<a id="manual_icon_1" onclick="javascript:window.open('/view/newhelp/in_help_10_0');">이용법</a>
					    		<p style="position:absolute;left:40%;display:inline-block;line-height:30px;" id="grid_title_1" style="display:none;"></p>
					    	</div><!-- map topbar -->
					    		
					    	<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
					    	<!-- 설명 문구 -->
					    	<div class="noticeTextPopup" id="noticeTextPopup01">
								<a onclick="javascript:$interactiveMap.ui.informationPopOpen();">
								<img src="/img/new/use_notice_map.png" alt="더보기"/></a>
							</div>
				    	</div>
			    	</div>
			    	
			    	<div class="sceneBox" id="view2">
						<div class="sceneRela">
							<div class="toolBar">
							<!-- mng_s 20170911_김건민 -->
							<h2>대화형 통계지도</h2>
							<!-- mng_e 20170911_김건민 -->
							<div class="viewTitle"><span style="background:#9ed563;">VIEW 2</span></div>
								<!-- 네비게이터 -->
								<div id="mapNavi_2"></div>
								
								<div class="tb_right" id="btnList_2">
									<div class="tb_radio">
										<a onclick="javascript:$interactiveMap.ui.doInnerMap(2, false);" class="fl" style="cursor:pointer;" title="사업체전개도 끄기"  >체크1</a>
										<a onclick="javascript:$interactiveMap.ui.doInnerMap(2, true);" class="fr" style="cursor:pointer;" title="사업체전개도 보기"  >체크2</a>
									</div>
									<ul> 
										<!-- 2017.07.24 [개발팀] 클래스명 추가 START  -->
										<li><a onclick="javascript:$interactiveMap.ui.doMaxSize(2);" class="tb_sizing" style="cursor:pointer;" title="전체 화면 확대"  ><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doClearMap(2);" style="cursor:pointer;" title="초기화"  ><img src="/img/ico/ico_toolbars02.png" alt="초기화"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doShare(2);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li>
										<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.reportDataSet(2);" class="tb_report" style="cursor:pointer;" title="보고서 보기" ><img src="/img/ico/ico_toolbars06.png" alt="보고서 보기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doAddMap(2);" class="tb_mapAdd" style="cursor:pointer;" title="지도 추가하여 비교하기" ><img src="/img/ico/ico_toolbars07.png" alt="지도 추가하여 비교하기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doCombineMap(2);" class="tb_combine" style="cursor:pointer;" title="지도 겹쳐보기" ><img src="/img/ico/ico_toolbars08.png" alt="지도 겹쳐보기"/></a></li>
										<!-- 2017.07.24 [개발팀] 클래스명 추가 END  -->
									</ul> 
									<a onclick="javascript:$interactiveMap.ui.doRemoveMap(2);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel03.png" alt="창닫기" style="height:34px;"/></a>
								</div>
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<p class="helperText" id="helper_2" style="margin-left:150px;">왼쪽 통계메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요.</p> <!-- 2016.09.07 9월 서비스 -->
					    		<p class="helperText" id="title_2" style="display:none;"></p>  
					    	</div><!-- map topbar -->
						    
					    	<div class="mapContents" id="mapRgn_2"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
					    	<!-- 설명 문구 -->
					    	<div class="noticeTextPopup" id="noticeTextPopup02">
								<a onclick="javascript:$interactiveMap.ui.informationPopOpen();">
								<img src="/img/new/use_notice_map.png" alt="더보기"/></a>
							</div>
				    	</div>
			    	</div>
			    	
			    	<div class="sceneBox" id="view3">
						<div class="sceneRela">
							<div class="toolBar">
							<!-- mng_s 20170911_김건민 -->
							<h2>대화형 통계지도</h2>
							<!-- mng_e 20170911_김건민 -->
							<div class="viewTitle"><span style="background:#ff0066;">VIEW 3</span></div>
								<!-- 네비게이터 -->
								<div id="mapNavi_3"></div>
								
								<div class="tb_right" id="btnList_3">
									<div class="tb_radio">
										<a onclick="javascript:$interactiveMap.ui.doInnerMap(3, false);" class="fl" style="cursor:pointer;" title="사업체전개도 끄기"  >체크1</a>
										<a onclick="javascript:$interactiveMap.ui.doInnerMap(3, true);" class="fr" style="cursor:pointer;" title="사업체전개도 보기"  >체크2</a>
									</div>
									<ul> 
										<!-- 2017.07.24 [개발팀] 클래스명 추가 START  -->
										<li><a onclick="javascript:$interactiveMap.ui.doMaxSize(3);" class="tb_sizing" style="cursor:pointer;" title="전체 화면 확대" ><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doClearMap(3);" style="cursor:pointer;" title="초기화" ><img src="/img/ico/ico_toolbars02.png" alt="초기화"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doShare(3);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li>
										<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.reportDataSet(3);" class="tb_report" style="cursor:pointer;" title="보고서 보기" ><img src="/img/ico/ico_toolbars06.png" alt="보고서 보기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doAddMap(3);" class="tb_mapAdd" style="cursor:pointer;" title="지도 추가하여 비교하기" ><img src="/img/ico/ico_toolbars07.png" alt="지도 추가하여 비교하기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doCombineMap(3);" class="tb_combine" style="cursor:pointer;" title="지도 겹쳐보기" ><img src="/img/ico/ico_toolbars08.png" alt="지도 겹쳐보기"/></a></li>
										<!-- 2017.07.24 [개발팀] 클래스명 추가 END  -->
									</ul> 
									<a onclick="javascript:$interactiveMap.ui.doRemoveMap(3);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel02.png" alt="창닫기" style="height:34px;"/></a>
								</div>
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<p class="helperText" id="helper_3" style="margin-left:150px;">왼쪽 통계메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요.</p> <!-- 2016.09.07 9월 서비스 --> 
					    		<p class="helperText" id="title_3" style="display:none;"></p>  
					    	</div><!-- map topbar -->
						    
					    	<div class="mapContents" id="mapRgn_3"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
					    	<!-- 설명 문구 -->
					    	<div class="noticeTextPopup" id="noticeTextPopup03">
								<a onclick="javascript:$interactiveMap.ui.informationPopOpen();">
								<img src="/img/new/use_notice_map.png" alt="더보기"/></a>
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
				    	<div class="sqListBox sq03" id="sqlListBox">
				    		<div class="sqTabs">
					    		<div id="gridHideShowNumberBtn" style="float:right">
					    			<span>통계표출</span>
					    			<a href="javascript:$interactiveLeftMenu.ui.showNumberClick();" id="showNumberBtn">off</a>
					    		</div>
					    		<div style="float:right">
					    			<div id="dataSlider_item" class="dataSlider"></div> 
					    		</div>	
				    		</div>
				    		<div id="searchBtnResultRgn" class="sqList">
				    			<ul></ul>
				    		</div> 
				    	</div>
			    	</div>
				    	
			    	<!-- left menu --> 
    				<div class="leftArea">
    					<!-- Top Include -->
						<jsp:include page="/view/map/interactiveLeftMenu"></jsp:include>
			    	</div>
			    	
			    	<!-- 데이터보드 -->
			    	<div id="dataBoard">
						<jsp:include page="/view/map/interactiveDataBoard"></jsp:include>
					</div>
			    	<!-- 데이터보드 end-->
			    	
					<!-- 갤러리 등록 및 즐겨찾기 -->
					<jsp:include page="/view/map/gallaryDialog"></jsp:include>
					
					<!-- 공유팝업  -->
			    	<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
						<div class="topbar">
							<span>조회한 통계결과  URL공유하기</span>
							<a onclick="javascript:$interactiveMap.ui.doCancel('sharedlg');">닫기</a>
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
													<a href="javascript:$interactiveMap.ui.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
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
								<a onclick="javascript:$interactiveMap.ui.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
								<a onclick="javascript:$interactiveMap.ui.doCancel('sharedlg');" class="btnStyle01">닫기</a>
							</div>
						</div>
					</div>
					
					<!-- 북마크 팝업  -->
					<div id="bookmarkdlg" class="popBox"
						style="display: none; z-index: 20001;">
						<div class="topbar">
							<span>조회한 통계결과 My Page 저장하기</span> <a
								onclick="javascript:$interactiveMap.ui.doCancel('bookmarkdlg');">닫기</a>
						</div>
						<div class="popContents">
							<ul class="listFormPop">
								<li><label for="savesubj" class="label">저장제목 :</label> <input
									type="text" id="savesubj" class="inp" maxlength="100" /></li>
								<li id="caseInput" style="display: none;"><span
									class="label">공개여부</span> <input type="checkbox" id="openShare" title="공개여부" />
									<label for="openShare" class="mr20">SGIS+plus 활용사례 공유</label></li>
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
								<a onclick="javascript:$interactiveMap.ui.doDone('bookmarkdlg');"
									class="btnStyle01">My Page 저장</a> <a
									onclick="javascript:$interactiveMap.ui.doCancel('bookmarkdlg');"
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
								<a href="javascript:$interactiveMap.ui.doBookMark(1, 'IMAP');" class="btnGtype">즐겨찾기</a> 
								<a onclick="javascript:$('#myGalleryPop').hide();" class="btnGtype">취소</a> <!-- 2017.02.23 -->
							</div>
						</div>
					</div>

					<!-- ( mask ) -->
	        		<div class="deem" style="display: none;"></div> 
	      			<!-- ( mask ) -->
				</div>	 
			</div>
			
			  
			<!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		    </footer>
		</div>
		
		<script>
			// 2016. 04. 21 j.h.Seok 수정
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
		
		<div id="notice_mini_pop" class="popupWrapper" style="margin-left: 200px; margin-top: 120px; width:602px; height:375px; background: rgba(0,0,0,0); display:none;">
			<div>
				<img src="/img/new/sgis_use_notice_pop.png" alt='' usemap="#Map" />
				<map name="Map">
					<area shape="rect" coords="565 0 601 36" href="javascript:$interactiveMap.ui.informationPopClose();" alt="팝업닫기" >
				</map>
			</div>
 		</div>
 		
 		<!-- 171124주용민 -->
 		<!-- 그리드 이용안내 popup -->
 		<div class="Grid_Info" id="grid_laypopup">
 			<div class="GridCont">
				<button type="button" style="z-index:100;" class="Popup_close1" onclick="commonPopupObj.closeWin('grid_laypopup',1);">창닫기</button>
				<img src="/img/popup/grid_service.png" alt="그리드서비스" usemap="#gridInfo"/>
		    	<map name="gridInfo">
		    		<area id="grid_opinion" shape="rect" coords="284 46 395 74" href="javascript:gridPop();">
		    	</map>
				<div class="CloseZone">
					<div class="popmm">
						<label><input type="checkbox" name="close" value="OK">일주일 동안 열지 않음</label>
						<button type="button" class="Popup_close2" onclick="commonPopupObj.closeWin('grid_laypopup',7);">창닫기</button>
					</div>
				</div> 			
 			</div>
 		</div>
 		<!-- 171124주용민 -->
 		
 		<!--하루동안 열지않기  -->
 		<div class="Popup_Info" style="display:none;" id="interactive_laypopup">
		<div class="PopupCont">
			<h1>대화형 통계지도 이용안내</h1>
			<img class="popup_rotation" title="팝업창으로 보기" src="/img/ico/ico_toolbars08.png" style="position:absolute; right:50px; top:8px; z-index:100; cursor:pointer;" onclick="javascript:popupRotation();"/>
			<button type="button" style="z-index:100;" class="Popup_close1" onclick="javascript:closeRotationTip('interactive_laypopup', 1);">창닫기</button>
			
			<div id="slides">
				<img id="interactiveRotationImg1" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation1.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg2" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation2.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내" usemap="#rotation2"/>
				<img id="interactiveRotationImg3" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation3.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg4" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation4.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg5" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation5.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg6" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation6.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg7" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation7.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내" usemap="#rotation7"/>
				<img id="interactiveRotationImg8" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation8.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg9" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation9.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg10" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation10.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg11" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation11.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg12" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation12.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg13" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation13.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg14" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation14.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg15" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation15.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg16" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation16.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg17" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation17.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg18" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation18.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg19" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation19.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg20" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation20.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
			</div>
			<map name="rotation2">
				<area shape="rect" coords="333 98 413 120" href="javascript:moveHighFunction(1);" alt="고급기능 이동" >
			</map>
			<map name="rotation7">
				<area shape="rect" coords="453 171 521 193" href="javascript:moveHighFunction(1);" alt="고급기능 이동">
			</map>	
			<div class="Popup-page-alter" style="z-index: 999999;">
					<div id="preViewBtn" class="fl ml20"><a href="#"><img src="${pageContext.request.contextPath}/img/interactiveMapRotation/l_arrow.png" alt="arrow"></a></div>
					<div id="nextViewBtn" class="fr mr20"><a href="#"><img src="${pageContext.request.contextPath}/img/interactiveMapRotation/r_arrow.png" alt="arrow"></a></div>
			</div>
			<div class="Pagination" style="font-size:13px;">
				<ul id="rotationDiv" style="width:500px;">
					<li id="rotationPageText1"><a href="#">1</a></li> 
					<li id="rotationPageText2"><a href="#">2</a></li>
					<li id="rotationPageText3"><a href="#">3</a></li>
					<li id="rotationPageText4"><a href="#">4</a></li>
					<li id="rotationPageText5"><a href="#">5</a></li>
					<li id="rotationPageText6"><a href="#">6</a></li>
					<li id="rotationPageText7"><a href="#">7</a></li>
					<li id="rotationPageText8"><a href="#">8</a></li>
					<li id="rotationPageText9"><a href="#">9</a></li>
					<li id="rotationPageText10"><a href="#">10</a></li>
					<li id="rotationPageText11"><a href="#">11</a></li>
					<li id="rotationPageText12"><a href="#">12</a></li>
					<li id="rotationPageText13"><a href="#">13</a></li>
					<li id="rotationPageText14"><a href="#">14</a></li>
					<li id="rotationPageText15"><a href="#">15</a></li>
					<li id="rotationPageText16"><a href="#">16</a></li>
					<li id="rotationPageText17"><a href="#">17</a></li>
					<li id="rotationPageText18"><a href="#">18</a></li>
					<li id="rotationPageText19"><a href="#">19</a></li>
					<li id="rotationPageText20"><a href="#">20</a></li>
				</ul>
			</div>
			<div class="CloseZone">
				<div class="popmm">
					<!-- mng_s 20180412_김건민 -->
					<!-- <label><input type="checkbox" name="close" value="OK">일주일 동안 열지 않음</label> -->
					<!-- mng_e 20180412_김건민 -->
					<button type="button" class="Popup_close2" onclick="javascript:closeRotationTip('interactive_laypopup', 7);">창닫기</button>
				</div>
			</div>
		</div>
	</div>
 		
		<div id ="dataBoardImgDiv" style="display:none; float: right; width:549px; height:882px; top:138px; right:0px; position:absolute; background-image: url('/img/tutorial/companyDataboard2Img.png'); z-index:10003;">
			<img id="yearChoice2006Img" src="/img/tutorial/yearChoice2006Img.png" alt="2006년" draggable="false">
			<img id="yearChoice2010Img" src="/img/tutorial/yearChoice2010Img.png" alt="2010년" draggable="false">
			<img id="yearChoice2014Img" src="/img/tutorial/yearChoice2014Img.png" alt="2014년" draggable="false">
			<img id="toPoint_db1" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:375px; z-index: 10003;">
			<img id="toPoint_db2" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:40px; z-index: 10003;">
			<img id="toPoint_db3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:130px; z-index: 10003;">				
		</div>
			<div class="tutorialWrapper" style= "display: none" draggable="false">
				<!-- mng_s 20180412_김건민 -->
				<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 302px; top:104px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="사용법 따라하기">튜토리얼 종료</button>
				<!-- mng_e 20180412_김건민 -->
				<img id="rightControlImg" src="/img/tutorial/rightControlImg.png" alt="우측퀵버튼" style="display:none; position:absolute; top:103px; right:1px; z-index:10002;" draggable="false">
				
				<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
					<div id="tutorialText" draggable="false">
						<!-- mng_s 20180412_김건민 -->
						<!-- <button type="button" id="tuto_end_btn" alt="튜토리얼종료" style="float: right; position: relative; bottom: 15px; top: 2px; left: -1px; width:20px; height:19px; margin:0 1px 0 1px; line-height:19px; background-color: #D8D8D8; font-size: 10px; border: 0; outline: 0;" onclick="closeTutorial();" draggable="false">X</button> -->
						<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
						<!-- mng_s 20180412_김건민 -->
					</div>
				</div>

				<img id="mainIndexImg" src="/img/tutorial/mainIndexImg.png" alt="총조사 주요지표" draggable="false">
				<img id="ptotalImg" src="/img/tutorial/ptotalImg.png" alt="인구주택 조사" draggable="false">
				<img id="searchImg" src="/img/tutorial/searchImg.png" alt="검색조건 생성" draggable="false">			
				<img id="addrSearchImg" src="/img/tutorial/addrSearchImg.png" alt="주소 검색" draggable="false">			
				<img id="dragItemListImg" src="/img/tutorial/dragItemListImg.png" alt="선택항목 리스트" draggable="false">			
				<img id="addrChoiceImg" src="/img/tutorial/addrChoiceImg.png" alt="주소 선택" draggable="false">
				<img id="okImg" src="/img/tutorial/okImg.png" alt="확인" draggable="false">
				
				<div id="zoomMapImgDiv" draggable="false">
<!-- 				<img id="zoomMapImg" src="/img/tutorial/zoomMapImg.png" draggable="false"> -->
				</div>
				<img id="zoomInImg" src="/img/tutorial/zoomInImg.png" alt="줌인" draggable="false">
				<img id="zoomInMapImg" src="/img/tutorial/zoomInMapImg.png" alt="지도" draggable="false">
				
				<img id="dragItemImg" src="/img/tutorial/dragItemImg.png" alt="선택항목" draggable="true" style="display:none; position:absolute; top:227px; left:-2px; border: 3px outset red; cursor:pointer; z-index:10001;">			
				
				<img id="zoomMapImg2" src="/img/tutorial/zoomMapImg2.png" alt="지도" draggable="false">
				<img id="zoomMapInfoImg" src="/img/tutorial/zoomMapInfoImg.png" alt="지도결과" draggable="false">
				<img id="MouseoverImg" src="/img/tutorial/MouseoverImg.png" alt="지도결과 설명" draggable="false">
				
				<img id="zoomOutImg" src="/img/tutorial/zoomOutImg.png" alt="줌아웃" draggable="false">
				<img id="zoomOutMapImg" src="/img/tutorial/zoomOutMapImg.png" alt="지도" draggable="false">

				<img id="dataBoardImg" src="/img/tutorial/dataBoardImg.png" alt="데이터보드" draggable="false">
				<img id="dataBoardDetailImg" src="/img/tutorial/dataBoardDetailImg.png" alt="데이터보드 세부사항" draggable="false">
				<img id="dataBoardPyoImg" src="/img/tutorial/dataBoardPyoImg.png" alt="데이터보드 표" draggable="false">
				<img id="dataBoardPyoDetailImg" src="/img/tutorial/dataBoardPyoDetailImg.png" alt="데이터보드 표 세부사항" draggable="false">
				<img id="showDataImg" src="/img/tutorial/showDataImg.png" alt="데이터보기" draggable="false">
				<img id="dataBoardYearImg" src="/img/tutorial/dataBoardYearImg.png" alt="데이터보드 시계열" draggable="false">
				<img id="dataBoardCloseImg" src="/img/tutorial/dataBoardCloseImg.png" alt="데이터보드 닫기" draggable="false">
				
				<img id="redLegendInfo1" src="/img/tutorial/redLegendInfo1.png" alt="범례" draggable="false">
				<img id="redLegendInfo2" src="/img/tutorial/redLegendInfo2.png" alt="범례" draggable="false">
				<img id="redLegendInfo3" src="/img/tutorial/redLegendInfo3.png" alt="범례" draggable="false">
				<img id="redLegendInfo4" src="/img/tutorial/redLegendInfo4.png" alt="범례" draggable="false">
				<img id="redLegendInfo5" src="/img/tutorial/redLegendInfo5.png" alt="범례" draggable="false">
				<img id="greenLegendInfo1" src="/img/tutorial/greenLegendInfo1.png" alt="범례" draggable="false">
				<img id="greenLegendInfo2" src="/img/tutorial/greenLegendInfo2.png" alt="범례" draggable="false">
				<img id="bottomControlImg1" src="/img/tutorial/bottomControlImg1.png" alt="범례 설정" draggable="false">
				<img id="bottomControlImg2" src="/img/tutorial/bottomControlImg2.png" alt="범례 설정" draggable="false">
				
				<img id="greenLegendImg" src="/img/tutorial/greenLegendImg.png" alt="범례 표시" draggable="false">
				<img id="greenLegendMapImg" src="/img/tutorial/greenLegendMapImg.png" alt="지도" draggable="false">
				
				<img id="legendOptionImg" src="/img/tutorial/legendOptionImg.png" alt="포인터" draggable="false">
				<img id="legendTypeImg" src="/img/tutorial/legendTypeImg.png" alt="범례 타입" draggable="false">
				<img id="legendTypeBubbleImg" src="/img/tutorial/legendTypeBubbleImg.png" alt="범례 버블 타입" draggable="false">
				<img id="legendBubbleMapImg" src="/img/tutorial/legendBubbleMapImg.png" alt="지도" draggable="false">
				<img id="cleanImg" src="/img/tutorial/cleanImg.png" alt="초기화" draggable="false">
				<img id="cleanMapImg" src="/img/tutorial/cleanMapImg.png" alt="지도" draggable="false">

				<img id="addrChoice2Img" src="/img/tutorial/addrChoice2Img.png" alt="주소선택" draggable="false">
				<img id="zoomMapImg3" src="/img/tutorial/zoomMapImg3.png" alt="지도" draggable="false">
				<img id="zoomOutMap2Img" src="/img/tutorial/zoomOutMap2Img.png" alt="지도" draggable="false">
				<img id="zoomOutMap3Img" src="/img/tutorial/zoomOutMap3Img.png" alt="지도" draggable="false">
				
				<img id="mainMenuImg" src="/img/tutorial/mainMenuImg.png" alt="통계메뉴" draggable="false">
				
				<img id="slide1Img" src="/img/tutorial/slide1Img.png" alt="LEFT 메뉴" draggable="false">
				<img id="slide2Img" src="/img/tutorial/slide2Img.png" alt="LEFT 메뉴" draggable="false">
				<img id="slide3Img" src="/img/tutorial/slide3Img.png" alt="LEFT 메뉴" draggable="false">
				<img id="slide4Img" src="/img/tutorial/slide4Img.png" alt="LEFT 메뉴" draggable="false">
				<img id="slide5Img" src="/img/tutorial/slide5Img.png" alt="LEFT 메뉴" draggable="false">
				<img id="slide6Img" src="/img/tutorial/slide6Img.png" alt="LEFT 메뉴" draggable="false">
				
				<img id="companyBtnImg" src="/img/tutorial/companyBtnImg.png" alt="전국사업체조사" draggable="false">
				<img id="themaListImg" src="/img/tutorial/themaListImg.png" alt="테마업종" draggable="false">
				<img id="themaRestaurantImg" src="/img/tutorial/themaRestaurantImg.png" alt="음식점" draggable="false">
				<img id="themaCafeImg" src="/img/tutorial/themaCafeImg.png" alt="카페" draggable="false">
				<img id="themaButtonImg" src="/img/tutorial/themaButtonImg.png" alt="테마조건 버튼생성" draggable="false">
				<img id="zoomMapImg4" src="/img/tutorial/zoomMapImg4.png" alt="지도" draggable="false">
				<img id="dragItemImg2" src="/img/tutorial/dragItemImg2.png" alt="선택항목" draggable="true" style="display:none; position:absolute; top:227px; left:-3px; border: 3px outset red; cursor: pointer;z-index:10001;" >

				<img id="zoomMapImg5" src="/img/tutorial/zoomMapImg5.png" alt="지도" draggable="false">
				
				<img id="redRegionImg" src="/img/tutorial/redRegionImg.png" alt="지도결과" draggable="false">
				<img id="redRegionInfoImg" src="/img/tutorial/redRegionInfoImg.png" alt="지도결과 설명" draggable="false">
				<img id="whiteRegionImg" src="/img/tutorial/whiteRegionImg.png" alt="지도결과" draggable="false">
				<img id="whiteRegionInfoImg" src="/img/tutorial/whiteRegionInfoImg.png" alt="지도결과 설명" draggable="false">

				<img id="companyDataboardImg" src="/img/tutorial/companyDataboardImg.png" alt="데이터보드 "  draggable="false">
				
				<img id="companyDataboard2Img" src="/img/tutorial/companyDataboard2Img.png" alt="데이터보드" draggable="false">

<!-- 			<img id="dataBoard2006Img" src="/img/tutorial/dataBoard2006Img.png" draggable="false"> -->
<!-- 			<img id="yearChoice2006Img" src="/img/tutorial/yearChoice2006Img.png" draggable="false"> -->
				<img id="baseYear2006MapImg" src="/img/tutorial/baseYear2006MapImg.png" alt="2006년 지도"  draggable="false">
				
<!-- 			<img id="dataBoard2010Img" src="/img/tutorial/dataBoard2010Img.png" draggable="false"> -->
<!-- 			<img id="yearChoice2010Img" src="/img/tutorial/yearChoice2010Img.png" draggable="false"> -->
				<img id="baseYear2010MapImg" src="/img/tutorial/baseYear2010MapImg.png" alt="2010년 지도" draggable="false">
				
<!-- 					<img id="yearChoice2014Img" src="/img/tutorial/yearChoice2014Img.png" draggable="false">				 -->
				
				<img id="rightControlImg2" src="/img/tutorial/rightControlImg2.png" alt="우측퀵버튼" draggable="false">
				<img id="rightControlImg3" src="/img/tutorial/rightControlImg3.png" alt="우측퀵버튼" draggable="false">
				
				<img id="poiButtonImg" src="/img/tutorial/poiButtonImg.png" alt="POI" draggable="false">
				<img id="poiButtonOnImg" src="/img/tutorial/poiButtonOnImg.png" alt="POI on" draggable="false">
				<img id="poiRestaurantImg" src="/img/tutorial/poiRestaurantImg.png" alt="음식점"  draggable="false">
				<img id="poiSubmenuCafeImg" src="/img/tutorial/poiSubmenuCafeImg.png" alt="카페" draggable="false">
				<img id="poiMapImg" src="/img/tutorial/poiMapImg.png" alt="지도" draggable="false">
				<img id="poiGroupMarkerImg" src="/img/tutorial/poiGroupMarkerImg.png" alt="그룹마커"  draggable="false">
				<img id="poiMap2Img" src="/img/tutorial/poiMap2Img.png" alt="지도" draggable="false">
				<img id="poiMarkerImg" src="/img/tutorial/poiMarkerImg.png" alt="마커" draggable="false">
				<img id="poiMarkerInfoImg" src="/img/tutorial/poiMarkerInfoImg.png" alt="마커설명" draggable="false">
				<img id="poiCleanImg" src="/img/tutorial/poiCleanImg.png" alt="초기화" draggable="false">
				<img id="poiCleanMapImg" src="/img/tutorial/poiCleanMapImg.png" alt="지도" draggable="false">
<!-- 				<img id="zoomMapImg6" src="/img/tutorial/zoomMapImg6.png" draggable="false"> -->
				<img id="zoomMapImg7" src="/img/tutorial/zoomMapImg7.png" alt="지도" draggable="false">

				<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
				<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
				<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
				<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">

				<img id="toPoint_1_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
				<img id="toPoint_2_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
				<img id="toPoint_3_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
				<img id="toPoint_4_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">
				
				<img id="toPoint_1_1_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
				<img id="toPoint_2_2_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">

<!-- 이경현 dropzone 확대 2016.06.28 -->
				<div id="dropMapZone" style="display: none; position: absolute; width:250px; height:325px; left: 815px; top: 314px; z-index:10001">
					<svg id="dropMap" width="200px" height="275px" style="display:none;">
						<polygon id="dropMapInfo" points="135,54 124,55 103,73 105,89 96,90 94,92 95,101 97,102 96,106 92,110 92,115 85,118 82,128 77,133 73,141 65,148 56,154 55,166 56,170 61,175 64,183 67,184 71,179 75,181 75,181 77,191 85,201 89,201 91,204 90,208 91,217 93,218 102,207 102,200 106,194 111,192 111,188 114,186 111,182 114,160 111,149 113,144 116,145 120,142 118,128 121,124 125,123 126,114 128,107 129,99 140,83 141,67 136,60 135,54" style="fill:none;stroke:#0086c6; stroke-width:4"></polygon>
					</svg>
				</div>
				<div id="dropMapZone2" style="display: none; position: absolute; width:770px; height:450px; left: 653px; top: 151px; z-index:10001">	
					<svg id="dropMap2" width="470px" height="450px" style="display:none;" >
						<polygon id="dropMapInfo2" points="82,192 83,256 71,296 82,300 108,317 147,373 180,348 181,284 200,284 200,220 223,194 223,194 387,194 407,201 392,163 346,120 328,95 141,95 141,193" style="fill:none;stroke:#0086c6; stroke-width:4"></polygon>
					</svg>
				</div>
			</div>
	</body>
</html>