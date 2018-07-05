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
		System.out.println("############"+e);
	}
%>

<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <title>정책통계지도 | 통계지리정보서비스</title>
	    
	    <link rel="stylesheet" type="text/css" href="/css/um.css" />
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/policyWrite/interactiveFunc.css" rel="stylesheet" type="text/css" />
	    <link href="/css/policyWrite/cont_policy.css" rel="stylesheet" type="text/css" />
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
	    <!-- 9월 서비스 -->
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

        <script type="text/javascript" src="/js/policyWrite/linkage/boundary.js"></script>
        <script type="text/javascript" src="/js/policyWrite/linkage/mydata.api.js"></script>
        <script type="text/javascript" src="/js/policyWrite/linkage/local-government.api.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/interactiveMap.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/interactiveMapApi.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/interactiveMap_kosis.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/interactiveLeftMenu.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMapRightmenu.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMapIndex.js"></script>
	    <script>var policyTarget = "$interactiveMap";</script>
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
	    <script type="text/javascript" src="/js/policyWrite/combine.js"></script>
         
        <script type="text/javascript" src="/js/board/jquery.paging.js"></script>
        <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
        <!--[If IE 9]>    
			<script type="text/javascript" src="/js/common/classList.js"></script>
		<![endif]-->
		
        <script>
       		$(document).ready(
    			function() {
    				 if($interactiveMap.ui.getCookie("confirmMsg") == ""){
	       				$(".Popup_Info").hide();
    					//$interactiveMap.ui.readyTutorial();
    				}
	       			if($(location).attr('search').match("tutorial_mode")){
	       				$(".Popup_Info").hide();
	    				$interactiveMap.ui.startTutorial();
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
    				//$interactiveMap.ui.doAnalysisShareInfo("<%=strType%>", param);
    		});
       		
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
					
					<div class="BtnAdmin">
						<a href="/view/map/policyStaticMap" style="float: left;"><img src="/img/ico/ico_toolbars02.png" alt="초기화"></a>
						<button id="policyWriteCancel" type="button"><img src="/img/policyStatic/btn_admin1.png" alt="정책통계지도 작성 취소">정책통계지도 작성 취소</button>
					</div>
					
					
					<div class="sceneBox on" id="view1" style="width:50%">
						<div class="sceneRela">
							<div class="toolBar">
								<h2>정책통계지도</h2>
								<div class="viewTitle"><span  id="title_1" style="background: #0070c0; display:block;">기준 데이터</span></div>
								<button class="Btn_CallData" type="button" id="leftMenu">데이터 불러오기</button>
								<!-- 네비게이터 -->
								<div id="mapNavi_1" style="display:none;"></div>
								<!-- 
								<a href="javascript:$policyWriteMapRightmenu.ui.companyListPoiCircleRemove();">반경 전체 삭제</a>
								<span id="poiInit">POI초기화</span>
								 -->
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<!-- <p class="helperText" id="title_1" style="display:none;"></p> -->
					    	</div><!-- map topbar -->
					    		
					    	<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
				    	</div>
			    	</div>
			    	
					<div class="Btn_fuse">
						<button class="btn_fuse_operation" type="button">연산설정</button>
						<button class="btn_fuse" type="button" title="융합 버튼 클릭시 새창으로 융합 화면이 나타납니다.">
						융합
						<!-- <img src="/img/policyWrite/icon_fuse.png" alt=""> -->
						</button>
						<button class="btn_fuse_buffer" type="button">버퍼설정</button>
					</div>
			    	
			    	<div class="sceneBox" id="view2" style="display:block; width:50%">
						<div class="sceneRela">
							<div class="toolBar">
								<!-- <h2>대화형통계지도</h2> -->
								<div class="viewTitle"><span id="title_2" style="background: #0070c0; display:block;">추가 데이터</span></div>
								<button class="Btn_CallData" type="button" id="rightMenu">데이터 불러오기</button>
								<!-- 네비게이터 -->
								<div id="mapNavi_2" style="display:none;"></div>
							
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<!-- <p class="helperText" id="title_2" style="display:none;"></p> -->
								<!-- <div id="slider-buffer" style="width:300px;"></div> -->
					    	</div><!-- map topbar -->
						    <div class="dummy-right">왼쪽 지도의 데이터부터 먼저 선택해주세요</div>
					    	<div class="mapContents" id="mapRgn_2"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
				    	</div>
			    	</div>
			    	
				    
				    
					<!-- 조회버튼 -->
			    <!-- 	<a href="javascript:void(0)" class="sideQuick sq02" id="map_left_btn">
			    		<span>통계메뉴</span>
			    		<img src="/img/ico/ico_totalmenu.gif" alt="통계메뉴" />
			    	</a> -->
			     <!-- 
			    	<a href="javascript:void(0)" class="sideQuick sq03">
			    		<span>선택항목</span>
			    		<img src="/img/ico/ico_resultbtn.gif" alt="선택항목" />
			    	</a>
			    	<div class="sqListBox sq03">
			    		<div class="sqTabs">
			    			<span>통계표출</span>
			    			<a href="javascript:$interactiveLeftMenu.ui.showNumberClick();" id="showNumberBtn">off</a>
			    		</div>
			    		<div id="searchBtnResultRgn" class="sqList">
			    			<ul></ul>
			    		</div> 
			    	</div> 
 -->


					<jsp:include page="/view/map/policyWriteMapIndex"/>
					
				    <!-- 버퍼 설정하기 S -->
					<div id="popBoxBuffer" class="popBox" style="display: none; z-index: 20001;">
						<div class="topbar">
							<span>버퍼 설정하기</span>
							<a onclick="javascript:$interactiveMap.ui.doCancel('popBoxBuffer');">닫기</a>
						</div>
						<div class="popContents">
							<div class="rangeinput">
								<label for="">위치 데이터의 버퍼거리를 설정하세요.</label>
								<select id="circleRadius" name="circleRadius">
									<c:forEach var="num" begin="0" end="5000" step="50">
										<option value=${num}>${num}</option>
									</c:forEach>
								</select>
								<span>m</span>
							</div>
							<div id="slider-buffer" class="rangeSlide"></div>
							<div class="btnBox">
								<a href="javascript:void(0);" id="bufferBtn" class="btnStyle01">적용</a>
							</div>
						</div>
					</div>
				    <!-- 버퍼 설정하기 E -->
				    
					<!-- 연산 설정하기 S -->
					<div id="popBoxCombine" class="popBox" style="display:none; z-index: 20001;">
						<div class="topbar">
							<span>정책통계지도 데이터 연산</span>
							<a onclick="javascript:$interactiveMap.ui.doCancel('popBoxCombine');">닫기</a>
						</div>
					
						<div class="popContents">
							<div class="rangeinput">각 데이터 화면의 지역경계 기준이 동일할 경우에 연산기능이 지원됩니다.</div>
							<div class="calculation">
								<dl>
									<dt>기준데이터</dt>
									<dd id="title_combine_1"></dd>
								</dl>
								
								<div class="symbol">
									<!-- D:선택된 연산기호에 class="M_on" -->
									<button id="" type="button" value="+">+</button>
									<button id="" type="button" value="-">-</button>
									<button id="" type="button" value="*">×</button>
									<button id="" type="button" value="/">÷</button>
								</div>
								
								<dl>
									<dt>추가데이터</dt>
									<dd id="title_combine_2"></dd>
								</dl>
							</div>
							<div class="btnBox">
								<a href="#" id="arithmeticBtn" class="btnStyle01">적용</a>
							</div>
						</div>
					</div>
					<!-- 연산 설정하기 E -->
				    
    
			    	<!-- left menu --> 
    				<div class="leftArea">
    					<!-- Top Include -->
						<jsp:include page="/view/map/policyWriteMapLeftMenu"/>
			    	</div>
			    	
			    	<div class="rightArea">
    					<!-- Top Include -->
						<jsp:include page="/view/map/policyWriteMapRightMenu"/>
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
		
		
		<div id="notice_mini_pop" class="popupWrapper" style="margin-left: 200px; margin-top: 120px; width:602px; height:375px; background: rgba(0,0,0,0); display:none;">
			<div>
				<img src="/img/new/sgis_use_notice_pop.png" alt='' usemap="#Map" />
				<map name="Map">
					<area shape="rect" coords="565 0 601 36" href="javascript:$interactiveMap.ui.informationPopClose();" >
				</map>
			</div>
 		</div>
 		
 		<!--하루동안 열지않기  -->
 		
 		<div class="Popup_Info" style="display:none;" id="interactive_laypopup">
		<div class="PopupCont">
			<h1>대화형 통계지도 이용안내</h1>
			<button type="button" style="z-index:100;" class="Popup_close1" onclick="javascript:commonPopupObj.closeWin('interactive_laypopup', 1);">창닫기</button>
			
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
			</div>
			<map name="rotation2">
				<area shape="rect" coords="333 98 413 120" href="javascript:moveHighFunction(1);">
			</map>
			<map name="rotation7">
				<area shape="rect" coords="453 171 521 193" href="javascript:moveHighFunction(1);">
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
				</ul>
			</div>
			<div class="CloseZone">
				<div class="popmm">
					<label><input type="checkbox" name="close" value="OK">오늘 하루 열지 않음</label>
					<button type="button" class="Popup_close2" onclick="javascript:commonPopupObj.closeWin('interactive_laypopup', 1);">창닫기</button>
				</div>
			</div>
		</div>
	</div>
 		
		<div id ="dataBoardImgDiv" style="display:none; float: right; width:549px; height:882px; top:138px; right:0px; position:absolute; background-image: url('/img/tutorial/companyDataboard2Img.png'); background-position: bottom; z-index:10003;">
			<img id="yearChoice2006Img" src="/img/tutorial/yearChoice2006Img.png" draggable="false">
			<img id="yearChoice2010Img" src="/img/tutorial/yearChoice2010Img.png" draggable="false">
			<img id="yearChoice2014Img" src="/img/tutorial/yearChoice2014Img.png" draggable="false">
			<img id="toPoint_db1" src="/img/tutorial/toPoint_3.png" draggable="false" style="display:none; position:absolute; right:375px; bottom:385px; z-index: 10003;">
			<img id="toPoint_db2" src="/img/tutorial/toPoint_3.png" draggable="false" style="display:none; position:absolute; right:40px; bottom:385px; z-index: 10003;">
			<img id="toPoint_db3" src="/img/tutorial/toPoint_3.png" draggable="false" style="display:none; position:absolute; right:130px; bottom:320px; z-index: 10003;">				
		</div>
			<div class="tutorialWrapper" style= "display: none" draggable="false">
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn.png" style="cursor:pointer; display:block; position:absolute; right:302px; top:107px; z-index:10003;" onclick="javascript:$interactiveMap.ui.closeTutorial();" draggable="false">
				<img id="rightControlImg" src="/img/tutorial/rightControlImg.png" style="display:none; position:absolute; top:103px; right:1px; z-index:10002;" draggable="false">
				
				<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
					<div id="tutorialText" draggable="false">
					</div>
				</div>

				<img id="mainIndexImg" src="/img/tutorial/mainIndexImg.png" draggable="false">
				<img id="ptotalImg" src="/img/tutorial/ptotalImg.png" draggable="false">
				<img id="searchImg" src="/img/tutorial/searchImg.png" draggable="false">			
				<img id="addrSearchImg" src="/img/tutorial/addrSearchImg.png" draggable="false">			
				<img id="dragItemListImg" src="/img/tutorial/dragItemListImg.png" draggable="false">			
				<img id="addrChoiceImg" src="/img/tutorial/addrChoiceImg.png" draggable="false">
				<img id="okImg" src="/img/tutorial/okImg.png" draggable="false">
				
				<div id="zoomMapImgDiv" draggable="false">
<!-- 				<img id="zoomMapImg" src="/img/tutorial/zoomMapImg.png" draggable="false"> -->
				</div>
				<img id="zoomInImg" src="/img/tutorial/zoomInImg.png" draggable="false">
				<img id="zoomInMapImg" src="/img/tutorial/zoomInMapImg.png" draggable="false">
				
				<img id="dragItemImg" src="/img/tutorial/dragItemImg.png" draggable="true" style="display:none; position:absolute; top:227px; left:-2px; border: 3px outset red; cursor:pointer; z-index:10001;" draggable="false">			
				
				<img id="zoomMapImg2" src="/img/tutorial/zoomMapImg2.png" draggable="false">
				<img id="zoomMapInfoImg" src="/img/tutorial/zoomMapInfoImg.png" draggable="false">
				<img id="MouseoverImg" src="/img/tutorial/MouseoverImg.png" draggable="false">
				
				<img id="zoomOutImg" src="/img/tutorial/zoomOutImg.png" draggable="false">
				<img id="zoomOutMapImg" src="/img/tutorial/zoomOutMapImg.png" draggable="false">

				<img id="dataBoardImg" src="/img/tutorial/dataBoardImg.png" draggable="false">
				<img id="dataBoardDetailImg" src="/img/tutorial/dataBoardDetailImg.png" draggable="false">
				<img id="dataBoardPyoImg" src="/img/tutorial/dataBoardPyoImg.png" draggable="false">
				<img id="dataBoardPyoDetailImg" src="/img/tutorial/dataBoardPyoDetailImg.png" draggable="false">
				<img id="showDataImg" src="/img/tutorial/showDataImg.png" draggable="false">
				<img id="dataBoardYearImg" src="/img/tutorial/dataBoardYearImg.png" draggable="false">
				<img id="dataBoardCloseImg" src="/img/tutorial/dataBoardCloseImg.png" draggable="false">
				
				<img id="redLegendInfo" src="/img/tutorial/redLegendInfo.png" draggable="false">
				<img id="greenLegendInfo" src="/img/tutorial/greenLegendInfo.png" draggable="false">
				<img id="bottomControlImg1" src="/img/tutorial/bottomControlImg1.png" draggable="false">
				<img id="bottomControlImg2" src="/img/tutorial/bottomControlImg2.png" draggable="false">
				
				<img id="greenLegendImg" src="/img/tutorial/greenLegendImg.png" draggable="false">
				<img id="greenLegendMapImg" src="/img/tutorial/greenLegendMapImg.png" draggable="false">
				
				<img id="legendOptionImg" src="/img/tutorial/legendOptionImg.png" draggable="false">
				<img id="legendTypeImg" src="/img/tutorial/legendTypeImg.png" draggable="false">
				<img id="legendTypeBubbleImg" src="/img/tutorial/legendTypeBubbleImg.png" draggable="false">
				<img id="legendBubbleMapImg" src="/img/tutorial/legendBubbleMapImg.png" draggable="false">
				<img id="cleanImg" src="/img/tutorial/cleanImg.png" draggable="false">
				<img id="cleanMapImg" src="/img/tutorial/cleanMapImg.png" draggable="false">

				<img id="addrChoice2Img" src="/img/tutorial/addrChoice2Img.png" draggable="false">
				<img id="zoomMapImg3" src="/img/tutorial/zoomMapImg3.png" draggable="false">
				<img id="zoomOutMap2Img" src="/img/tutorial/zoomOutMap2Img.png" draggable="false">
				<img id="zoomOutMap3Img" src="/img/tutorial/zoomOutMap3Img.png" draggable="false">
				
				<img id="mainMenuImg" src="/img/tutorial/mainMenuImg.png" draggable="false">
				
				<img id="slide1Img" src="/img/tutorial/slide1Img.png" draggable="false">
				<img id="slide2Img" src="/img/tutorial/slide2Img.png" draggable="false">
				<img id="slide3Img" src="/img/tutorial/slide3Img.png" draggable="false">
				<img id="slide4Img" src="/img/tutorial/slide4Img.png" draggable="false">
				<img id="slide5Img" src="/img/tutorial/slide5Img.png" draggable="false">
				<img id="slide6Img" src="/img/tutorial/slide6Img.png" draggable="false">
				
				<img id="companyBtnImg" src="/img/tutorial/companyBtnImg.png" draggable="false">
				<img id="themaListImg" src="/img/tutorial/themaListImg.png" draggable="false">
				<img id="themaRestaurantImg" src="/img/tutorial/themaRestaurantImg.png" draggable="false">
				<img id="themaCafeImg" src="/img/tutorial/themaCafeImg.png" draggable="false">
				<img id="themaButtonImg" src="/img/tutorial/themaButtonImg.png" draggable="false">
				<img id="zoomMapImg4" src="/img/tutorial/zoomMapImg4.png" draggable="false">
				<img id="dragItemImg2" src="/img/tutorial/dragItemImg2.png" draggable="true" style="display:none; position:absolute; top:227px; left:-3px; border: 3px outset red; cursor: pointer;z-index:10001;" draggable="false">

				<img id="zoomMapImg5" src="/img/tutorial/zoomMapImg5.png" draggable="false">
				
				<img id="redRegionImg" src="/img/tutorial/redRegionImg.png" draggable="false">
				<img id="redRegionInfoImg" src="/img/tutorial/redRegionInfoImg.png" draggable="false">
				<img id="whiteRegionImg" src="/img/tutorial/whiteRegionImg.png" draggable="false">
				<img id="whiteRegionInfoImg" src="/img/tutorial/whiteRegionInfoImg.png" draggable="false">

				<img id="companyDataboardImg" src="/img/tutorial/companyDataboardImg.png" draggable="false">
				
				<img id="companyDataboard2Img" src="/img/tutorial/companyDataboard2Img.png" draggable="false">

<!-- 			<img id="dataBoard2006Img" src="/img/tutorial/dataBoard2006Img.png" draggable="false"> -->
<!-- 			<img id="yearChoice2006Img" src="/img/tutorial/yearChoice2006Img.png" draggable="false"> -->
				<img id="baseYear2006MapImg" src="/img/tutorial/baseYear2006MapImg.png" draggable="false">
				
<!-- 			<img id="dataBoard2010Img" src="/img/tutorial/dataBoard2010Img.png" draggable="false"> -->
<!-- 			<img id="yearChoice2010Img" src="/img/tutorial/yearChoice2010Img.png" draggable="false"> -->
				<img id="baseYear2010MapImg" src="/img/tutorial/baseYear2010MapImg.png" draggable="false">
				
<!-- 					<img id="yearChoice2014Img" src="/img/tutorial/yearChoice2014Img.png" draggable="false">				 -->
				
				<img id="rightControlImg2" src="/img/tutorial/rightControlImg2.png" draggable="false">
				<img id="rightControlImg3" src="/img/tutorial/rightControlImg3.png" draggable="false">
				
				<img id="poiButtonImg" src="/img/tutorial/poiButtonImg.png" draggable="false">
				<img id="poiButtonOnImg" src="/img/tutorial/poiButtonOnImg.png" draggable="false">
				<img id="poiRestaurantImg" src="/img/tutorial/poiRestaurantImg.png" draggable="false">
				<img id="poiSubmenuCafeImg" src="/img/tutorial/poiSubmenuCafeImg.png" draggable="false">
				<img id="poiMapImg" src="/img/tutorial/poiMapImg.png" draggable="false">
				<img id="poiGroupMarkerImg" src="/img/tutorial/poiGroupMarkerImg.png" draggable="false">
				<img id="poiMap2Img" src="/img/tutorial/poiMap2Img.png" draggable="false">
				<img id="poiMarkerImg" src="/img/tutorial/poiMarkerImg.png" draggable="false">
				<img id="poiMarkerInfoImg" src="/img/tutorial/poiMarkerInfoImg.png" draggable="false">
				<img id="poiCleanImg" src="/img/tutorial/poiCleanImg.png" draggable="false">
				<img id="poiCleanMapImg" src="/img/tutorial/poiCleanMapImg.png" draggable="false">
<!-- 				<img id="zoomMapImg6" src="/img/tutorial/zoomMapImg6.png" draggable="false"> -->
				<img id="zoomMapImg7" src="/img/tutorial/zoomMapImg7.png" draggable="false">

				<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" draggable="false">
				<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" draggable="false">
				<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" draggable="false">
				<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" draggable="false">

				<img id="toPoint_1_1" src="/img/tutorial/toPoint_1.png" draggable="false">
				<img id="toPoint_2_2" src="/img/tutorial/toPoint_2.png" draggable="false">
				<img id="toPoint_3_3" src="/img/tutorial/toPoint_3.png" draggable="false">
				<img id="toPoint_4_4" src="/img/tutorial/toPoint_4.png" draggable="false">
				
				<img id="toPoint_1_1_1" src="/img/tutorial/toPoint_1.png" draggable="false">
				<img id="toPoint_2_2_2" src="/img/tutorial/toPoint_2.png" draggable="false">

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