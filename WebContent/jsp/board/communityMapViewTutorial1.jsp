<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@page import="javax.servlet.http.Cookie"%>

<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />


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

	<script src="${pageContext.request.contextPath}/js/communityMap/communityTutorial.js"></script>
	<link rel="stylesheet" href="/css/tutorial/tutorial.css">

	<script>
	$(function(){
		var urlPath = $(location).attr('pathname') + $(location).attr('search');
		if(urlPath == '/jsp/board/communityMapViewTutorial1.jsp?tutorial_mode'){
			startTutorial();
		}
	})
	</script>
</head>

<body>
	<div id="wrap" style="height: 300px;">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		<div class="tutorial_bg">
			<img id="comm_bg1" src="/img/tutorial/community/comm_bg1.png" alt="지도" style="position:absolute;" draggable="false">
			<img id="comm_bg1_1" src="/img/tutorial/community/comm_bg1_1.png" alt="좌측메뉴" style="display:none; position:absolute;" draggable="false">
			<img id="comm_bg2" src="/img/tutorial/community/comm_bg2.png" alt="좌측메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg3" src="/img/tutorial/community/comm_bg3.png" alt="데이터보드" style="display:none; top:137px; right:0px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg4" src="/img/tutorial/community/comm_bg4.png" alt="데이터보드" style="display:none;top:137px; right:0px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg5" src="/img/tutorial/community/comm_bg5.png" alt="POI" style="display:none; top:312px; left:498px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg6" src="/img/tutorial/community/comm_bg6.png" alt="좌측메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg7" src="/img/tutorial/community/comm_bg7.png" alt="좌측메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg8" src="/img/tutorial/community/comm_bg8.png" alt="좌측메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			
		</div>
		<footer id="footer">
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		</footer>
	</div>
	<div class="tutorialWrapper" style= "display:none;" draggable="false">
		<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn.png" alt="튜토리얼종료"  style="cursor:pointer; display:block; position:absolute; right:100px; top:107px; z-index:10003;" onclick="closeTutorial();" draggable="false">
		<div id="headerTutorial" style="width:100%; height:120px;" draggable="false">
			<div id="tutorialText" draggable="false">
				<!-- mng_s 20180412_김건민 -->
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
				<!-- mng_e 20180412_김건민 -->
			</div>
		</div>	
		<img id="comm_1" src="/img/tutorial/community/comm_1.png" alt="리스트 펼치기" style="display:none; position:absolute; left:386px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_2" src="/img/tutorial/community/comm_2.png" alt="데이터보드" style="display:none; position:absolute; top:134px; right:-3px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_3" src="/img/tutorial/community/comm_3.png" alt="데이터보드" style="display:none; position:absolute; top:248px; right:8px; border:3px outset red; border-top-right-radius:7px; cursor:pointer;" draggable="false">
		<img id="comm_4" src="/img/tutorial/community/comm_4.png" alt="POI" style="display:none; position:absolute; top:585px; left:598px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_5" src="/img/tutorial/community/comm_5.png" alt="상세보기" style="display:none; position:absolute; top:549px; left:562px; border:3px outset red; border-radius:6px; cursor:pointer; z-index:1;" draggable="false">
		<img id="comm_6" src="/img/tutorial/community/comm_6.png" alt="사진" style="display:none; position:absolute; top:224px; left:288px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_7" src="/img/tutorial/community/comm_7.png" alt="닫기" style="display:none; position:absolute; top:141px; left:359px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_8" src="/img/tutorial/community/comm_8.png" alt="홈버튼" style="display:none; position:absolute; top:102px; left:398px; border:3px outset red; cursor:pointer;" draggable="false">
			
		<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
		<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
		<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
		<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
	</div>
</body>
</html>