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
		if(urlPath == '/jsp/board/communityMapViewTutorial2.jsp?tutorial_mode'){
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
			<img id="comm_bg15" src="/img/tutorial/community/comm_bg15.png" alt="지도" style="position:absolute;" draggable="false">
			<img id="comm_bg16" src="/img/tutorial/community/comm_bg16.png" alt="좌측 메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg17" src="/img/tutorial/community/comm_bg17.png" alt="제목" style="display:none; top:197px; left:25px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg18" src="/img/tutorial/community/comm_bg18.png" alt="위치" style="display:none; top:254px; left:25px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg19" src="/img/tutorial/community/comm_bg19.png" alt="해당 지점등록" style="display:none; top:442px; left:595px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg20" src="/img/tutorial/community/comm_bg20.png" alt="의견" style="display:none; top:428px; left:26px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg21" src="/img/tutorial/community/comm_bg21.png" alt="POI" style="display:none; top:359px; left:535px; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg22" src="/img/tutorial/community/comm_bg22.png" alt="좌측메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg23" src="/img/tutorial/community/comm_bg23.png" alt="좌측메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg24" src="/img/tutorial/community/comm_bg24.png" alt="댓글" style="display:none; top:365px; left:25px;position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg25" src="/img/tutorial/community/comm_bg25.png" alt="좌측메뉴" style="display:none; position:absolute; z-index:1;" draggable="false">
			<img id="comm_bg26" src="/img/tutorial/community/comm_bg26.png" alt="지도" style="display:none; position:absolute;" draggable="false">
			
		</div>
		<footer id="footer">
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		</footer>
	</div>
	<div class="tutorialWrapper" style= "display:none;" draggable="false">
		<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn.png" alt="튜토리얼종료" style="cursor:pointer; display:block; position:absolute; right:190px; top:107px; z-index:10003;" onclick="closeTutorial();" draggable="false">
		<div id="headerTutorial" style="width:100%; height:120px;" draggable="false">
			<div id="tutorialText" draggable="false">
				<!-- mng_s 20180412_김건민 -->
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
				<!-- mng_e 20180412_김건민 -->
			</div>
		</div>	
		<img id="comm_24" src="/img/tutorial/community/comm_24.png" alt="의견등록하기" style="display:none; position:absolute; top:545px; left:277px; border:3px outset red; border-radius:7px; cursor:pointer;" draggable="false">
		<img id="comm_25" src="/img/tutorial/community/comm_25.png" alt="제목" style="display:none; position:absolute; top:193px; left:22px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_26" src="/img/tutorial/community/comm_26.png" alt="위치선택" style="display:none; position:absolute; top:251px; left:273px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_27" src="/img/tutorial/community/comm_27.png" alt="위치" style="display:none; position:absolute; top:493px; left:624px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_28" src="/img/tutorial/community/comm_28.png" alt="의견" style="display:none; position:absolute; top:424px; left:22px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_29" src="/img/tutorial/community/comm_29.png" alt="등록완료" style="display:none; position:absolute; top:632px; left:162px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_30" src="/img/tutorial/community/comm_30.png" alt="상세보기" style="display:none; position:absolute; top:486px; left:601px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_31" src="/img/tutorial/community/comm_31.png" alt="댓글" style="display:none; position:absolute; top:361px; left:23px; border:3px outset red; cursor:pointer;" draggable="false">
		<img id="comm_32" src="/img/tutorial/community/comm_32.png" alt="댓글등록" style="display:none; position:absolute; top:383px; left:21px; border:3px outset red; cursor:pointer;" draggable="false">
		
		<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
		<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
		<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
		<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" style="display:none; position:absolute; z-index:11000;" draggable="false">
	</div>
</body>
</html>