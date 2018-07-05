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
	String grade = "";
	try {
		grade =  (String)request.getSession().getAttribute("member_grade");
		Map map = (Map)request.getAttribute("paramInfo");
		paramObj = (String)map.get("paramObj");
		
		//2017.12.04 [개발팀] 시큐어코딩
		paramObj = Security.cleanXss(paramObj);
	}catch (IllegalArgumentException e) {
		System.out.println("처리중 에러가 발생하였습니다.");
	}catch (Exception e) {
		System.out.println("처리중 에러가 발생하였습니다.");
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
	    <link rel='shortcut icon' href='/img/ico/n_favicon.png'/> 
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" href="/css/popup.css">
	    <link rel="stylesheet" href="/css/tutorial/tutorial.css">
	    <link rel="stylesheet" type="text/css" href="/css/tutorial/common.css">
	    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
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
	    
		<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>
	    
		<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
		<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
		<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script type="text/javascript" src="/js/common/map.js"></script>
	    <script type="text/javascript" src="/js/common/common.js"></script>
	    <script type="text/javascript" src="/js/common/mapNavigation.js"></script>

        <script type="text/javascript" src="/js/policyWrite/linkage/boundary.js"></script>
        <script type="text/javascript" src="/js/policyWrite/linkage/mydata.api.js"></script>
        <script type="text/javascript" src="/js/policyWrite/linkage/local-government.api.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMap.js"></script>
	   
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMapApi.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMap_kosis.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMapLeftMenu.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMapRightMenu.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/policyWritePopup.js"></script>
	     <script type="text/javascript" src="/js/policyWrite/policyWriteCombineMap.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/combine.js"></script>
        <script type="text/javascript" src="/js/board/jquery.paging.js"></script>
        <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>

        <script>
       		$(document).ready(
    			function() {
    				$policyWriteMap.ui.doAnalysisData("<%=paramObj%>", "<%=grade%>");
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
						<a id="clearMapBtn" onclick="$policyWriteMap.ui.doClearMap();" style="float: left;cursor:pointer;"><img src="/img/ico/ico_toolbars02.png" alt="초기화"></a>
						<button id="policyWriteCancel" type="button"><img src="/img/policyStatic/btn_admin1.png" alt="정책통계지도 작성 취소">정책통계지도 작성 취소</button>
					</div>
					
					
					<div class="sceneBox on" id="view1" style="width:50%">
						<div class="sceneRela">
							<div class="toolBar">
								<h2>정책통계지도</h2>
								<div class="navi_title" id="naviTitle"></div>
								<div class="navi_title" id="boundLevelTitle"></div>
							</div>
							<div class="interactiveBar">
								<div class="policy_fn">
					    			<a id="leftMenu" class="btn_dataload">
					    				<span>데이터A 불러오기</span>
					    				<img src="/img/ico/ico_gps02.png" />
					    			</a>
					    		</div>
					    		<p class="navi_title" id="title_1" style="background-color: transparent !important;">통계를 조회하세요</p>
					    	</div>
					    		
					    	<div class="mapContents" id="mapRgn_1">
					    		<div class="policySelectBox" style="display:none;">
				    				<div class="policyBar">
				    					<span>조회년도 선택</span>
				    				</div>
				    				<div class="policySelectItem">
				    					<select id="policySelectBox_1" class="select yearSelectBox" name="">
				    						<option>조회년도</option>
				    					</select>
				    				</div>
				    			</div>
					    	</div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
				    	</div>
			    	</div>
			    	
					<div class="Btn_fuse">
						<a onclick="$policyWriteMap.ui.doCombineMap();" class="policyResultBox">
							<span>융합결과보기</span>
						</a>
					</div>
					
			    	<div class="sceneBox" id="view2" style="display:block; width:50%">
						<div class="sceneRela">
							<div class="toolBar">
							</div>
							<div class="interactiveBar">
								<div class="policy_fn">
					    			<a id="rightMenu" class="btn_dataload" style="none;">
					    				<span>데이터B 불러오기</span>
					    				<img src="/img/ico/ico_gps02.png" />
					    			</a>
					    		</div>
					    		<p class="navi_title" id="title_2" style="background-color: transparent !important;">통계를 조회하세요</p>
					    	</div>
						    <div class="dummy-right" style="display:none;">왼쪽 지도의 데이터부터 먼저 선택해주세요</div>
					    	<div class="mapContents" id="mapRgn_2">
					    		<div class="policySelectBox" style="display:none;">
				    				<div class="policyBar">
				    					<span>조회년도 선택</span>
				    					<!-- <a href="javascript:void(0)"><img src="/img/ico/ico_close01.png" /></a> -->
				    				</div>
				    				<div class="policySelectItem">
				    					<select id="policySelectBox_2" class="select yearSelectBox" name="">
				    						<option>조회년도</option>
				    					</select>
				    				</div>
				    			</div>
					    	</div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
				    	</div>
			    	</div>
			    	
			    	<!-- left menu --> 
    				<div class="leftArea">
    					<!-- Top Include -->
						<jsp:include page="/view/map/policyWriteMapLeftMenu"/>
			    	</div>
			    	
			    	<div class="rightArea">
    					<!-- Top Include -->
						<jsp:include page="/view/map/policyWriteMapRightMenu"/>
			    	</div>
			    	
			    	<!-- 융합팝업창 -->
			    	<div class="combineMap" style="display:none;">
						<jsp:include page="/view/map/policyWriteCombineMap"/>
			    	</div>
					
					<!-- ( mask ) -->
        			<div class="deem" style="display: none;"></div> 
      				<!-- ( mask ) -->
				</div>	 
			</div>
			
			<!-- 통계연산형지표 수식설정 팝업창 -->
			<div class="dialogbox" id="calculatePopup" style="display:none;">
				<div class="calcBox">
			   		<div class="bar">
			   			<span>연산기준 설정</span> 
			   			<a onclick="javascript:$policyWriteMap.event.popupClose('calculatePopup');"><img src="/img/ico/ico_close04.png" alt="데이터보드 닫기" /></a>
			   		</div>
			   		<div class="calcContents">
			   			<div class="calcItem">
			   				<div class="ccLeft" id="hData_1">데이터 A</div>
			   				<div class="ccCenter"><img src="/img/policyStatic/ico_calc01.png" class="calcChange" onclick="javascript:$policyWriteMap.ui.doCalculateChange();" /></div>
			   				<div class="ccRight" id="hData_2">데이터 B</div>
			   			</div>
			   			<div class="calcItem t01">
			   				<div class="ccLeft" id="tData_1"></div>
			   				<div class="ccCenter">
			   					<select id="calculSymbolSelectBox" class="select">
			   						<option value="1">+</option>
			   						<option value="2">-</option>
			   						<option value="3">×</option>
			   						<option value="4">÷</option>
			   					</select>
			   				</div>
			   				<div class="ccRight" id="tData_2"></div>
			   			</div>
			   		</div>
			   		<div class="calcBtn">
			   			<a onclick="javascript:$policyWriteMap.event.popupClose('calculatePopup');">취소</a>
			   			<a onclick="javascript:$policyWriteMap.ui.doCalculateApply();">적용</a>
			   		</div>
			   	</div>  
		   	</div>
			
			<!-- poi설정창 -->
			<div class="dialogbox" id="policyPoiBox" style="display:none;">
				<div class="policyPoiBox">
			   		<div class="bar">
			   			<span>위치정보 시각화(POI) 설정</span> 
			   			<a onclick="javascript:$policyWriteMap.event.popupClose('policyPoiBox');"><img src="/img/ico/ico_close04.png" alt="데이터보드 닫기" /></a>
			   		</div>
			   		<div class="policyPoiContents">
			   		 	<div class="stepBox" id="poiContentScroll"> 
						    <div class="poiTop">
						    	<ul class="dbTypeCk settingMode_radio">
							        <li>
							            <label for="rd_set11" id="batch">일괄설정</label>
							        </li>
							        <li>
							            <label for="rd_set12" id="indivisual" class="on">개별설정</label>
							        </li> 
							    </ul>
						    </div>
						    <div id="setting_poiList" class="joinDefault" style="display: block;">
						    	<ul class="dbTypeCk poiSetting_radio" id="poiList_radio"></ul>
						    </div>
						     
						    <!-- POI 모양 설정 --> 
						    <a class="roundTextBox on">
								<span style="margin-left:20px;">위치 데이터의 포인트 모양</span> 
						    </a>
						    <div class="joinDefault" style="display: block;">
								<ul class="dbTypeCk po01 poiSetting_radio" id="poiShape_radio">
							        <li>
							            <label class="on" id="shape_1"><img src="/img/statsPotal/ico_pointer01.png" /></label>
							        </li>
							        <li>
							            <label id="shape_2"><img src="/img/statsPotal/ico_pointer02.png" /></label>
							        </li>
							        <li>
							            <label id="shape_3"><img src="/img/statsPotal/ico_pointer03.png" /></label>
							        </li> 
							        <li>
							            <label id="shape_4"><img src="/img/statsPotal/ico_pointer04.png" /></label>
							        </li>
							         <li>
							            <label id="shape_5"><img src="/img/statsPotal/ico_color06.png" /></label>
							        </li>  
							    </ul>	
							</div>
							
							<!-- POI 색상 설정 -->
							<a class="roundTextBox on">
								<span style="margin-left:20px;">위치 데이터의 포인트 색상</span> 
						    </a>
						    <div class="joinDefault" style="display: block;">
								<ul class="dbTypeCk po03 poiSetting_radio" id="poiColor_radio">
							        <li>
							            <label class="on" id="color_1"><img src="/img/statsPotal/ico_color01.png" /></label>
							        </li>
							        <li>
							            <label id="color_2"><img src="/img/statsPotal/ico_color02.png" /></label>
							        </li>
							        <li>
							            <label id="color_3"><img src="/img/statsPotal/ico_color03.png" /></label>
							        </li> 
							        <li>
							            <label id="color_4"><img src="/img/statsPotal/ico_color04.png" /></label>
							        </li> 
							        <li>
							            <label id="color_5"><img src="/img/statsPotal/ico_color05.png" /></label>
							        </li> 
							        <li id="heatColor" style="display:none;">
							            <label id="color_6"><img src="/img/statsPotal/ico_color06.png" /></label>
							        </li> 
							        
							    </ul>	
							</div>
		
							<!-- POI 반지름 설정 -->
					   		<a id="poiRadiusArea" class="roundTextBox on">
								<span style="margin-left:20px;">위치 데이터의 반경 거리</span> 
						    </a>
						    <div class="joinDefault" style="display: block;">
								<div id="slider-radius" class="slider-range"></div>
								<select id="radiusSelectBox" class="select" style="margin-left:20px;">
									<option value="0" selected="selected">0</option>
									<option value="100">100</option>
									<option value="200">200</option>
									<option value="300">300</option>
									<option value="400">400</option>
									<option value="500">500</option>
									<option value="600">600</option>
									<option value="700">700</option>
									<option value="800">800</option>
									<option value="900">900</option>
									<option value="1000">1000</option>
								</select>
								<label>m</label>
								<div class="helpSliderText">
									<span style="margin-left:10px;">0</span>
									<span style="margin-left:200px">1000</span>
								</div>
							</div>
							
							<!-- POI반경 색상 및 투명도 조절 -->
							<a id="poiRadiusColorArea" class="roundTextBox on">
								<span style="margin-left:20px;">위치 데이터의 반경 색상 및 투명도</span> 
						    </a>
						    <div class="joinDefault" style="display: block;">
								<ul class="dbTypeCk po03 poiSetting_radio" id="poiRadius_radio">
							        <li>
							            <label class="on" id="radius_1"><img src="/img/statsPotal/ico_color01.png" /></label>
							        </li>
							        <li>
							            <label id="radius_2"><img src="/img/statsPotal/ico_color02.png" /></label>
							        </li>
							        <li>
							            <label id="radius_3"><img src="/img/statsPotal/ico_color03.png" /></label>
							        </li> 
							        <li>
							            <label id="radius_4"><img src="/img/statsPotal/ico_color04.png" /></label>
							        </li> 
							        <li>
							            <label id="radius_5"><img src="/img/statsPotal/ico_color05.png" /></label>
							        </li> 
							    </ul>	
							    <div id="slider-opacity" class="slider-range"></div>
							    <select class="select" id="radiusOpacitySelectBox" style="margin-left:20px;">
							    	<option value="10">10</option>
							    	<option value="20" selected="selected">20</option>
							    	<option value="30">30</option>
							    	<option value="40">40</option>
							    	<option value="50">50</option>
							    	<option value="60">60</option>
							    	<option value="70">70</option>
							    </select>
								<label>%</label>
								<div class="helpSliderText">
									<span style="margin-left:10px;">10</span>
									<span style="margin-left:200px">70</span>
								</div>
							</div>
							
							<!-- 열지도 반지름 설정 -->
							<a id="heatRadiusArea" class="roundTextBox on" style="display:none;">
								<span style="margin-left:20px;">열지도 반지름</span> 
						    </a>
						    <div class="joinDefault" style="display: none;">
								<div id="heat-radius" class="slider-range"></div>
								<input type="text" id="heatRadiusInputBox" class="input" value="20">
								<div class="helpSliderText">
									<span style="margin-left:10px;">5</span>
									<span style="margin-left:205px">40</span>
								</div>
							</div>
							
							<!-- 열지도 투명도 설정 -->
							<a id="heatOpacityArea" class="roundTextBox on" style="display:none;">
								<span style="margin-left:20px;">열지도 투명도</span> 
						    </a>
						    <div class="joinDefault" style="display: none;">
								<div id="heat-opacity" class="slider-range"></div>
								<input type="text" id="heatOpacityInputBox" class="input" value="20">
								<div class="helpSliderText">
									<span style="margin-left:10px;">20</span>
									<span style="margin-left:200px">120</span>
								</div>
							</div>
							
						</div>
			   			<div class="policyPoiBtn">
			   				<a onclick="javascript:$policyWriteMap.event.popupClose('policyPoiBox');">취소</a>
			   				<a onclick="javascript:$policyWriteMap.ui.doSetPoiSetting();">적용</a>
			   			</div>
			   		</div>
			   	</div> 
			 </div> 
			<!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		    </footer>
		</div>

	</body>
</html>