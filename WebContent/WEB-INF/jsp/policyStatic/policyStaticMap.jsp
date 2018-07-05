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

<!-- 2017.05.29 [개발팀] 지자체 연계  -->
<%
	/// 2017.09.20 [개발팀] 수정기능 START ///
	String memberId = "";
	if ( session.getAttribute("member_id") != null ) {
		memberId = (String)session.getAttribute("member_id");
	}
	/// 2017.09.20 [개발팀] 수정기능 END ///
	String strType = "";
	String paramObj = "";
	try {
		Map map = (Map)request.getAttribute("paramInfo");
		strType = (String)map.get("type");
		//2017.12.04 [개발팀] 시큐어코딩
		strType = Security.cleanXss(strType);
		if (strType.equals("localgov") || strType.equals("temp")) {
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
	    <title>정책통계지도 | 통계지리정보서비스</title>
	    
	    <link rel="stylesheet" type="text/css" href="/css/um.css" />
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link rel='shortcut icon' href='/img/ico/n_favicon.png'/> 
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/policyStatic/cont_policy.css">
	    
	    <script src="/js/plugins/jquery.min.js"></script>
	    <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script src="/js/plugins/highcharts/highcharts.js"></script>
	    <script src="/js/plugins/highcharts/highcharts-more.js"></script>
		<script src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>
	    <script src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script src="/js/plugins/btoa.js"></script>
	    <script src="/js/plugins/highcharts/highchart.drag.js"></script>
	    
		<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script src="/js/plugins/handsontable.full.js"></script>
	    
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
		<script src="/js/plugins/jquery.sha256.js"></script>
		<script src="/js/plugins/durian-v2.0.js"></script>
		<script src="/js/board/jquery.paging.js"></script>
		<script src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script src="/js/common/map.js"></script>
	    <script src="/js/common/common.js"></script>
	    <script src="/js/common/mapNavigation.js"></script>
	    
	    <script src="/js/policyWrite/linkage/boundary.js"></script>
	    <script src="/js/policyWrite/linkage/mydata.api.js"></script>
	    <script src="/js/policyWrite/linkage/local-government.api.js"></script>
	    <script src="/js/policyStatic/policyStaticMap.js"></script>
	    <script src="/js/policyStatic/policyStaticMapDataManagement.js"></script>
	    <script src="/js/policyStatic/policyStaticMapApi.js"></script>
	   <!--  <script type="text/javascript" src="/js/policyWrite/policyWriteMap_kosis.js"></script> --> <!-- 2017.09.08 [개발팀] 굳이 import할 이유 없음  -->
	    <script src="/js/policyStatic/policyStaticMapLeftmenu.js"></script>
	   <!--  <script type="text/javascript" src="/js/policyWrite/policyWriteMapRightmenu.js"></script> -->
	    <script src="/js/policyStatic/policyStaticMapDataBoard.js"></script>
	    <script>var policyTarget = "$policyStaticMap";</script>
	    <script src="/js/policyStatic/combine.js"></script>
	    <script src="/js/policyWrite/combine.js"></script>
	    
	    <!-- 2017.08.10 [개발팀] 등록팝업창  -->
	    <script src="/js/policyWrite/policyWritePopup.js"></script>
	    
	    <!-- 사용자지정 컨트롤  -->
		<script src="/js/thematicMap/thematicMap_api.js"></script>
	    <script src="/js/common/mapDraw/Draw.Feature.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Manager.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Cricle.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Polygon.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Overlay.js"></script>
        <script src="/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
        <script src="/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Distance.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Poi.js"></script>
        <script src="/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Measure.js"></script>
        
        <script src="/js/board/jquery.paging.js"></script>
        <script src="/js/common/mapInfo/legendInfo.js"></script>
        <script src="/js/policyStatic/policyStaticCombineMap.js"></script>  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
        
        <script src="/js/plugins/imageCapture/rgbcolor.js"></script>
        <script src="/js/plugins/imageCapture/canvg.js"></script>
	    <script src="/js/plugins/imageCapture/html2canvas.js"></script>
	    <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
	    
	    <!-- mng_s 20180219_김건민  -->
	    <script src="/js/policyStatic/policyStaticTutorial.js"></script>
	    <link rel="stylesheet" href="/css/tutorial/tutorial.css">
	    <!-- mng_e 20180219_김건민  --> 
        <!--[If IE 9]>    
			<script type="text/javascript" src="/js/common/classList.js"></script>
		<![endif]-->
		
	<!-- 2017.05.29 [개발팀] 지자체 연계  -->
        <script>
       		$(document).ready(
    			function() {
    				
    				// mng_s 20180412_김건민 
    				/* if(getCookie("confirmMsg") == ""){
    					$("#houseAnalysis_webtoon_laypopup").hide();
    					readyTutorial();
    				} */
    				//mng_e 20180412_김건민
	       			if($(location).attr('search').match("tutorial_mode")){
    					$("#houseAnalysis_webtoon_laypopup").hide();
	    				startTutorial();
	       			}
	       			

    				$("#mapRgn_2 .legendPopEvent:last").hide();
    				var param = null;
    				var length = <%=paramObj.length()%>;
    				if (length == 0) {
    					param = "";
    				}else {
    					param = JSON.parse(<%=paramObj%>);
    				}
    				$policyStaticMap.ui.doAnalysisShareInfo("<%=strType%>", param);
    				/*  2017.09.20 [개발팀] 수정기능 START */
    				$policyStaticMap.ui.loginUserId = "<%=memberId%>";
    				/*  2017.09.20 [개발팀] 수정기능 END */
    				/* $(".tcb-tooltip").hover(function(){
    					$("#tooltip-prntdiv").attr("style", "");
    				}, function(){
    					$("#tooltip-prntdiv").attr("style", "padding-top:20%;");
    				}); */
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
					<div class="SearhTitle" id="searhTitle"></div>
					<div class="BtnAdmin">
						<%-- <c:if test="${writeAble == true }">
							<button onclick="javascript:$policyStaticMapDataManagement.ui.dataManagement('','','','1','01');" id="dataManageBtn" type="button"><img src="/img/policyStatic/btn_admin2.png" alt="">데이터관리</button>
						</c:if> --%>
						<!-- 2017.05.29 [개발팀] 지자체 url 추가 : 초기화 수정-->
						<a onclick="javascript:$policyStaticMap.ui.doClearMap();" id="clearBtn"  style="float: left;cursor:pointer;" tabindex="91"><img src="/img/ico/ico_toolbars02.png" alt="초기화"></a>
						<a onclick="javascript:$policyStaticMap.ui.reportDataSet();" id="reportBtn" class="tb_report" style="float: left;cursor:pointer;" title="보고서 보기" tabindex="92"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars06.png" alt="보고서출력"/></a>
	            		<!-- mng_s 20180412_김건민  -->
						 <div> 
							<!-- <img id="tuto_start_btn" src="/img/tutorial/house/tuto_start_btn.png" style="cursor:pointer; display:block; position:absolute; right:265px;" onclick="readyTutorial();" draggable="false"> -->
							<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 350px; top: -2px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="readyTutorial();" title="사용법 따라하기">튜토리얼</button>
						 </div> 
						<!-- mng_e 20180412_김건민 -->
	            		<!-- 3027.08.13 [개발팀] 등록버튼 수정 -->
	            		<%-- <c:if test="${writeAble == true }">
							<button id="mapWrite" type="button"><img src="/img/policyStatic/btn_admin1.png" alt="정책통계지도 작성">정책통계지도 작성</button>
		            	</c:if> --%>
		            </div>
					<div class="sceneBox on" id="view1" style="width:50%">
						<div class="sceneRela">
							<div class="toolBar">
								<h2>정책통계지도</h2>
								
								<!-- 2017.09.06 [개발팀] 조회기능-navi 기능 추가 및 수정 -->
								<div class="navi_title" id="naviTitle"></div>
								<select id="boundLevelTitle" title="경계레벨" class="navi_title" style="border-width:0px; padding-left:15px; padding-right:0px; width:100px">
								</select>
							</div>
							<div class="interactiveBar">
								<p class="navi_title" id="sTitle" style="margin-left:150px;background-color: transparent !important;">왼쪽 통계메뉴 버튼을 클릭하여 지표를 선택하고 조회해보세요.</p>
					    		<a onclick="javascript:window.open('/view/newhelp/ps_help_10_0');" id="helpBtn" style="left:auto; margin-left:5px;" tabindex="95">이용법</a>
					    		<!-- 2017.09.06 [개발팀] 조회기능-navi 기능 추가 및 수정 END -->
					    	</div>
					    	<!-- 2017.08.30 [개발팀] 조회기능-조회년도선택 추가 -->
					    	<div class="mapContents" id="mapRgn_1">
					    		<div class="policySelectBox" style="display:none;">
				    				<div class="policyBar">
				    					<span>조회년도 선택</span>
				    					<!-- <a href="javascript:void(0)"><img src="/img/ico/ico_close01.png" /></a> -->
				    				</div>
				    				<div class="policySelectItem">
				    					<select id="policySelectBox_1" class="select yearSelectBox" title="조회년도">
				    						<option>조회년도</option>
				    					</select>
				    				</div>
				    			</div>
					    	</div>
					    	<!-- 2017.08.30 [개발팀] 조회기능-조회년도선택 추가 END -->
							<select class="select_year" id="fromSelectYear" title="시작년도"></select>
					    	<div class="resizeIcon"></div>
					    	<div class="noticeTextPopup" id="noticeTextPopup01">
								<a onclick="javascript:$('#notice_mini_pop').is(':visible')?$('#notice_mini_pop').hide():$('#notice_mini_pop').show();">
								<img src="/img/new/use_notice_map.png" alt="SGIS의 공간정보서비스 특성상 실제 공표된 값과 차이가 있을 수 있으므로 유의하시기 바랍니다" /></a>
							</div>
				    	</div>
			    	</div>
			    	<div class="Btn_fuse">  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
			    		<img src="/img/common/icon_temp_sseok.png" id="mapRgn_lock_btn" alt="locked" />
						<a onclick="$policyStaticMap.ui.doCombineMap();" class="policyResultBox">  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
							<span>융합결과보기</span>  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
						</a>  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
					</div>  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
			    	<div class="sceneBox" id="view2" style="display:block; width:50%">
						<div class="sceneRela">
							<div class="toolBar">
							<div class="viewTitle"><span style="background:#9ed563;">VIEW 2</span></div>
								<div style="display:none;" id="mapNavi_2"></div>
								<select class="select_year" id="toSelectYear" title="년도"></select>
							</div>
							<div class="interactiveBar"></div>
							<!-- 2017.08.30 [개발팀] 조회기능-조회년도선택 추가 -->
					    	<div class="mapContents" id="mapRgn_2">
					    		<div class="policySelectBox" style="display:none;">
				    				<div class="policyBar">
				    					<span>조회년도 선택</span>
				    					<!-- <a href="javascript:void(0)"><img src="/img/ico/ico_close01.png" /></a> -->
				    				</div>
				    				<div class="policySelectItem">
				    					<select id="policySelectBox_2" class="select yearSelectBox" title="년도">
				    						<option>조회년도</option>
				    					</select>
				    				</div>
				    			</div>
					    	</div>
					    	<!-- 2017.08.30 [개발팀] 조회기능-조회년도선택 추가 -->
					    	<div class="resizeIcon"></div>
					    	<div class="noticeTextPopup" id="noticeTextPopup02">
							</div>
				    	</div>
			    	</div>
			    	
			    	<div class="sceneBox" id="view3" style="display:block; ">
						<div class="sceneRela">
							<div class="toolBar">
								<div class="viewTitle"><span style="background:#9ed563;">VIEW 2</span></div>
							</div>
							<div class="interactiveBar"></div>
							<iframe class="mapContents" id="view3-map" style="border:none;" title="맵컨텐츠"></iframe>
						</div>
			    	</div>
			    	
			    	<!-- 2017.08.08 [개발팀] 통계메뉴 텍스트 변경 -->
			    	<a href="javascript:void(0)" class="sideQuick sq01_01 on" id="demand" data-title="정책통계지도 메뉴" data-left="115px" tabindex="93">
			    		<span>정책통계지도 메뉴</span>
			    		<img src="${pageContext.request.contextPath}/img/ico/policy_menu1.png" alt="이용법" tabindex="94" />
			    	</a>
<!-- 			    	<a href="javascript:void(0)" class="sideQuick sq01_02" id="policy" data-title="지역별 정책지도" data-left="5px"> -->
<!-- 			    		<span>지역별 정책지도</span> -->
<%-- 			    		<img src="${pageContext.request.contextPath}/img/ico/policy_menu2.png" alt="" /> --%>
<!-- 			    	</a> -->
    				<div class="leftArea">
						<jsp:include page="/view/map/policyStaticMapLeftMenu"/>
			    	</div>
			    	<div id="dataBoard">
						<jsp:include page="/view/map/policyStaticMapDataBoard"></jsp:include>
					</div>
        			<div class="deem" style="display: none;"></div> 
        			
        			<!-- 2017.09.07 [개발팀] 융합기능개발 START  -->
			    	<!-- 융합팝업창 -->
			    	<div class="combineMap" style="display:none;">
						<jsp:include page="/view/map/policyStaticCombineMap"/>
			    	</div>
			    	<!-- 2017.09.07 [개발팀] 융합기능개발 END -->
				</div>
				
			<!-- 전송데이터 관리 S -->
			<div id="lbdmsPopup" class="FuseResult_Layer" style="display: none;">
				<div class="FuseResult">
					<h3>전송데이터 관리</h3>
					<button id="lbdmsClosePopup" class="btn_close" type="button">창닫기</button>

					<!-- 검색 및 결과 S -->
					<div class="ContArea">
						<!-- Search S -->
						<fieldset class="ListSearch">
							<!-- 2017.12.12 [개발팀] 접근성 -->
							<label for="data_from">공개일자 : </label>
							<input type="text" id="data_from" class="inp" title="공개범위최소" style="width:130px;"> ~
							<input type="text" id="data_to" class="inp" title="공개범위최대" style="width:130px;margin-right:50px;"> 
							<label for="data_nm">서비스명 : </label>
							<input type="text" id="data_nm" class="inp" title="서비스명" style="width:250px;"/>
							<button id="data_search" type="button" class="searchBtn">검색</button>
						</fieldset>
						<!-- Search E -->
						<!-- List S -->
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
									<th scope="col"><input type="checkbox" id="allChk" title="전체선택"><label for="allChk">전체선택</label></th>
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
					<!-- 검색 및 결과 E -->


				</div>
				<!-- FuseResult -->
			</div>
			<!-- 전송데이터 관리 E -->
		</div>
		
		<!-- 정책통계지도 만들기 -->
		<jsp:include page="/view/map/policyWritePopup"/>
		
		<div id="notice_mini_pop" class="popupWrapper" style="margin-left: 200px; margin-top: 120px; width:602px; height:375px; background: rgba(0,0,0,0); display:none;">
			<div>
				<img src="/img/new/sgis_use_notice_pop.png" alt='공지사항' usemap="#Map" />
				<map name="Map">
					<area shape="rect" coords="565,0,601,36" href="javascript:$('#notice_mini_pop').hide();" alt="유의사항" >
				</map>
			</div>
 		</div>
		    <footer id="footer">
				<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		    </footer>
		</div>
		<!-- mng_s 20180219_김건민 -->
		<div id ="popupImgDiv" style="display:none; float: right; width:2000px; height:910px; top:172px; right:0px; position:absolute; background-position: bottom; background:rgba(0,0,0,.5); z-index:10003;">
			<img id="btn_09" src="/img/tutorial/policyStatic/btn_09.png" alt="융합결과데이터" draggable="false" style="display:none; position:absolute; top:184px; left:1224px; cursor:pointer; border: 3px outset red; z-index:10003;">
			<img id="btn_10" src="/img/tutorial/policyStatic/btn_10.png" alt="팝업 닫기" draggable="false" style="display:none; position:absolute; top:-7px; left:1417px; cursor:pointer; border: 3px outset red; z-index:10003;">
			
			<img id="popup_01" src="/img/tutorial/policyStatic/popup_01.png" alt="팝업" style=" display:none; position:absolute; left:450px; bottom:350px;" draggable="false">
			<img id="popup_01_1" src="/img/tutorial/policyStatic/popup_01_1.png" alt="팝업 범례" style=" display:none; position:absolute; bottom:360px; left:460px; z-index:10000;" draggable="false">
			<img id="popup_02" src="/img/tutorial/policyStatic/popup_02.png" alt="팝업" style=" display:none; position:absolute; left:450px; bottom:350px;" draggable="false">
			<img id="popup_03" src="/img/tutorial/policyStatic/popup_03.png" alt="팝업" style=" display:none; position:absolute; left:450px; bottom:350px;" draggable="false">
			<img id="popup_03_1" src="/img/tutorial/policyStatic/popup_03_1.png" alt="팝업 범례" style=" display:none; position:absolute; bottom:360px; left:460px; z-index:10000;" draggable="false">			
			<img id="popup_06" src="/img/tutorial/policyStatic/popup_06.png" alt="팝업" style=" display:none; position:absolute; left:450px; bottom:350px;" draggable="false">
			<img id="popup_06_1" src="/img/tutorial/policyStatic/popup_06_1.png" alt="팝업 범례" style=" display:none; position:absolute; bottom:360px; left:460px; z-index:10000;" draggable="false">
			<img id="popup_07" src="/img/tutorial/policyStatic/popup_07.png" alt="팝업" style=" display:none; position:absolute; left:450px; bottom:350px;" draggable="false">
			<img id="popup_07_1" src="/img/tutorial/policyStatic/popup_07_1.png" alt="팝업 범례" style=" display:none; position:absolute; bottom:355px; left:460px; z-index:10000;" draggable="false">
			
 			<img id="toPoint_db1_1" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:500px; z-index: 10003;">
			<img id="toPoint_db1_2" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:490px; z-index: 10003;">
			<img id="toPoint_db2_1" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:490px; z-index: 10003;">
			
			<img id="toPoint_db1" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:150px; z-index: 10003;">
			<img id="toPoint_db2" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:140px; z-index: 10003;">
			<img id="toPoint_db3" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:140px; z-index: 10003;">
			
		</div>
		<div class="tutorialWrapper" style= "display: none" draggable="false">
			<!-- mng_s 20180412_김건민 -->
			<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 218px; top:104px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="사용법 따라하기">튜토리얼 종료</button>
			<!-- mng_e 20180412_김건민 -->
			<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
				<div id="tutorialText" draggable="false">
					<!-- mng_s 20180412_김건민 -->
					<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
					<!-- mng_e 20180412_김건민 -->
				</div>
			</div>
			<img id="btn_01" src="/img/tutorial/policyStatic/btn_01.png" alt="서울특별시" draggable="false" style="display:none; position:absolute; top:248px; left:10px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_02" src="/img/tutorial/policyStatic/btn_02.png" alt="전국" draggable="false" style="display:none; position:absolute; top:250px; left:9px; cursor:pointer;">
			<img id="btn_03" src="/img/tutorial/policyStatic/btn_03.png" alt="대전광역시" draggable="false" style="display:none; position:absolute; top:360px; left:9px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_04" src="/img/tutorial/policyStatic/btn_04.png" alt="인구·가구·주택" draggable="false" style="display:none; position:absolute; top:334px; left:1px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_05" src="/img/tutorial/policyStatic/btn_05.png" alt="전체인구의 변화" draggable="false" style="display:none; position:absolute; top:259px; left:283px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_06" src="/img/tutorial/policyStatic/btn_06.png" alt="데이터보드 버튼" draggable="false" style="display:none; position:absolute; top:136px; right:-3px; cursor:pointer; border: 3px outset red; z-index:10000;">
			<img id="btn_07" src="/img/tutorial/policyStatic/btn_07.png" alt="데이터보드 닫기" draggable="false" style="display:none; position:absolute; top:141px; right:-1px; cursor:pointer; border: 3px outset red; z-index:10003;">
			<img id="btn_08" src="/img/tutorial/policyStatic/btn_08.png" alt="융합결과보기" draggable="false" style="display:none; position:absolute; top:497px; left:898px; cursor:pointer; border: 3px outset red; z-index:10003;">			
			<img id="btn_11" src="/img/tutorial/policyStatic/btn_11.png" alt="시군구경계" draggable="false" style="display:none; position:absolute; top:105px; left:226px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_12" src="/img/tutorial/policyStatic/btn_12.png" alt="시군구,읍면동경계" draggable="false" style="display:none; position:absolute; top:109px; left:230px; cursor:pointer;">
			<img id="btn_13" src="/img/tutorial/policyStatic/btn_13.png" alt="읍면동경계" draggable="false" style="display:none; position:absolute; top:148px; left:228px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_14" src="/img/tutorial/policyStatic/btn_14.png" alt="정책통게지도 메뉴" draggable="false" style="display:none; position:absolute; top:137px; left:2px; cursor:pointer; border: 3px outset red; z-index:10003;">
			<img id="btn_15" src="/img/tutorial/policyStatic/btn_15.png" alt="전체" draggable="false" style="display:none; position:absolute; top:249px; left:128px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_16" src="/img/tutorial/policyStatic/btn_16.png" alt="시도 리스트" draggable="false" style="display:none; position:absolute; top:250px; left:130px; cursor:pointer;">
			<img id="btn_17" src="/img/tutorial/policyStatic/btn_17.png" alt="서구" draggable="false" style="display:none; position:absolute; top:329px; left:130px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_18" src="/img/tutorial/policyStatic/btn_18.png" alt="읍면동경계" draggable="false" style="display:none; position:absolute; top:105px; left:225px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_19" src="/img/tutorial/policyStatic/btn_19.png" alt="읍면동,집계구경계" draggable="false" style="display:none; position:absolute; top:109px; left:230px; cursor:pointer;">
			<img id="btn_20" src="/img/tutorial/policyStatic/btn_20.png" alt="집계구경계" draggable="false" style="display:none; position:absolute; top:147px; left:229px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_21" src="/img/tutorial/policyStatic/btn_21.png" alt="서구" draggable="false" style="display:none; position:absolute; top:249px; left:128px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_22" src="/img/tutorial/policyStatic/btn_22.png" alt="시군구 리스트" draggable="false" style="display:none; position:absolute; top:251px; left:130px; cursor:pointer;">
			<img id="btn_23" src="/img/tutorial/policyStatic/btn_23.png" alt="전체" draggable="false" style="display:none; position:absolute; top:279px; left:128px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_24" src="/img/tutorial/policyStatic/btn_24.png" alt="교육·문화" draggable="false" style="display:none; position:absolute; top:425px; left:0px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_25" src="/img/tutorial/policyStatic/btn_25.png" alt="인구 대비 도서관 평균 도서 보유 현황" draggable="false" style="display:none; position:absolute; top:338px; left:284px; cursor:pointer;  border: 3px outset red;">
			<img id="btn_26" src="/img/tutorial/policyStatic/btn_26.png" alt="도서관 운영 현황" draggable="false" style="display:none; position:absolute; top:425px; left:284px; cursor:pointer;  border: 3px outset red;"> 
			
			
			<img id="map_01" src="/img/tutorial/policyStatic/map_01.png" alt="왼쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:1px; cursor:pointer; ">
			<img id="map_01_1" src="/img/tutorial/policyStatic/map_01_1.png" alt="오른쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:960px; cursor:pointer; ">
			<img id="map_02" src="/img/tutorial/policyStatic/map_02.png" alt="왼쪽 조회년도" draggable="false" style="display:none; position:absolute; top:172px; right:960px; cursor:pointer; z-index:10000;">
			<img id="map_02_1" src="/img/tutorial/policyStatic/map_02_1.png" alt="오른쪽 조회년도" draggable="false" style="display:none; position:absolute; top:172px; right:0px; cursor:pointer; z-index:10000;">
			<img id="map_03" src="/img/tutorial/policyStatic/map_03.png" alt="왼쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer;">
			<img id="map_03_1" src="/img/tutorial/policyStatic/map_03_1.png" alt="오른쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:970px; cursor:pointer;">
			<img id="map_04" src="/img/tutorial/policyStatic/map_04.png" alt="왼쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:1px; cursor:pointer; ">
			<img id="map_04_1" src="/img/tutorial/policyStatic/map_04_1.png" alt="오른쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:960px; cursor:pointer; ">
			<img id="map_05" src="/img/tutorial/policyStatic/map_05.png" alt="왼쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer;">
			<img id="map_05_1" src="/img/tutorial/policyStatic/map_05_1.png" alt="오른쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:970px; cursor:pointer;">
			<img id="map_06" src="/img/tutorial/policyStatic/map_06.png" alt="융합결과보기 범례" draggable="false" style="display:none; position:absolute; top:500px; left:901px; cursor:pointer; z-index:10000;">
			<img id="map_07" src="/img/tutorial/policyStatic/map_07.png" alt="잠금" draggable="false" style="display:none; position:absolute; top:450px; left:939px; cursor:pointer; z-index:10000;">
			<img id="map_08" src="/img/tutorial/policyStatic/map_08.png" alt="왼쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:2px; cursor:pointer; ">
			<img id="map_08_1" src="/img/tutorial/policyStatic/map_08_1.png" alt="오른쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:960px; cursor:pointer; ">
			<img id="map_09" src="/img/tutorial/policyStatic/map_09.png" alt="왼쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer;">
			<img id="map_09_1" src="/img/tutorial/policyStatic/map_09_1.png" alt="오른쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:970px; cursor:pointer;">
			<img id="map_10" src="/img/tutorial/policyStatic/map_10.png" alt="왼쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:2px; cursor:pointer; ">
			<img id="map_10_1" src="/img/tutorial/policyStatic/map_10_1.png" alt="오른쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:962px; cursor:pointer; ">
			<img id="map_11" src="/img/tutorial/policyStatic/map_11.png" alt="왼쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer;">
			<img id="map_11_1" src="/img/tutorial/policyStatic/map_11_1.png" alt="오른쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:970px; cursor:pointer;">
			<img id="map_12" src="/img/tutorial/policyStatic/map_12.png" alt="왼쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:1px; cursor:pointer; ">
			<img id="map_12_1" src="/img/tutorial/policyStatic/map_12_1.png" alt="오른쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:960px; cursor:pointer; ">
			<img id="map_13" src="/img/tutorial/policyStatic/map_13.png" alt="왼쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer;">
			<img id="map_13_1" src="/img/tutorial/policyStatic/map_13_1.png" alt="오른쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:970px; cursor:pointer;">
			<img id="map_14" src="/img/tutorial/policyStatic/map_14.png" alt="왼쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:1px; cursor:pointer; ">
			<img id="map_14_1" src="/img/tutorial/policyStatic/map_14_1.png" alt="오른쪽 지도" draggable="false" style="display:none; position:absolute; top:172px; left:960px; cursor:pointer; ">
			<img id="map_15" src="/img/tutorial/policyStatic/map_15.png" alt="왼쪽 범례" draggable="false" style="display:none; position:absolute; bottom:5px; left:10px; cursor:pointer;">
			
			<img id="dataBoard_01" src="/img/tutorial/policyStatic/dataBoard_01.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
			<img id="dataBoard_02" src="/img/tutorial/policyStatic/dataBoard_02.png" alt="데이터보드" draggable="false" style="display:none; position:absolute; top:137px; right:-3px; cursor:pointer; z-index:10001;">
			
		 	<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
			<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
			<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
			<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false"> 
		</div>
		<!-- mng_e 20180219_김건민 -->
	</body>
</html>