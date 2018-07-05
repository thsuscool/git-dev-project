<%
/**************************************************************************************************************************
* Program Name  : SGIS 플러스 소개 JSP  
* File Name     : sopIntro.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<title>SGIS Main Service Introduce</title>

<link href="/jsp/english/css/default.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/js/common/includeHead.js"></script>
<!-- <script src="/js/common/common.js"></script> -->
<script src="/js/common/board.js"></script>
<script src="/js/board/jquery.paging.js"></script>

<script src="/js/plugins/ui.js"></script>
<script src="/js/plugins/common.js"></script>
<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<style>
	#contentList td{font-size:13px;text-align:center;}
</style>
<script type="text/javascript">
	$(function(){
		$(document).ready(function() {
			//맨위로 버튼///////
			var scrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
			$("#topScrollTag").css("left", scrollWidthVal)
			$(window).scroll(function(){
			    var currentScrollY = $(this).scrollTop();
			    if(currentScrollY >= 10){
			    	$("#topScrollTag").fadeIn("fast");
			    }else{
			    	$("#topScrollTag").fadeOut("fast");
			    }
			});
		});
		// tabs
		$(".board_tab > a").click(function(){
			console.log("tabs click");
			
			$(".board_tab > a").removeClass("active");
			$(this).addClass("active");
		});
	});
</script>
</head>
<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/jsp/english/includeSearch.jsp"></jsp:include>
		</header>

		<!-- body -->
		<div id="container">
			<div class="board_tab">
				<a href="/jsp/english/sopIntro.jsp">About SGIS & FAQ</a> <a href="/jsp/english/thematic.jsp" class="active">SGIS Main Service Introduce</a>
			</div>
			<div id="contents">
				<div id="content_2">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						<!-- SGIS서비스 소개 -->
						<!-- 대화형통계지도 -->
						<div class="tab_contents">
							<div class="article-list">
								<div style="float:left;width:25%"><h3 class="ptit"><a href="/jsp/english/thematic.jsp">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a style="color:#4f87b6" href="/jsp/english/interactive.jsp">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a href="/jsp/english/application.jsp">Applications </a></h3></div><div><h3 class="ptit"><a href="/jsp/english/analysis.jsp">Map Analysis</a></h3></div>
								<div id="content">
									<div class="pl20 pr20">
										<h2 style="float:left">Interactive Statistical Map</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/map/interactiveMap"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
										<h4 class="itit">Service Overview</h4>
										<p class="para mb25">
											○ It is statistical geographical information service which can freely inquire various statistical information such as population, housing, household, agriculture, forestry fishery, business census and administrative district statistics on a regional basis.<br>
											○ You can subdivide various statistical items into conditions and display them according to your interests.<br>
											○ You can preset the desired statistical items and drag and drop them on the map area,You can view statistics by double-clicking the selected item twice in a row.<br>
											○ Space statistics information can be displayed easily and quickly.<br>
											○ Features<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Setting statistical search conditions: Setting various search conditions for statistics such as population / housing / household / business<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Statistical information display: statistical information of statistical search condition is visualized on map<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- POI marker display: Display the business location corresponding to the category selected by the user in the form of marker on the map<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- User data display: Personal data can be uploaded and displayed on the map and can be analyzed.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Multi-view: You can display statistical maps to compare regional differences for the same conditions or compare different statistical conditions for the same region<br>
										</p>	
										<h4 class="itit">Screen Layout</h4>
										<p><img src="/img/newhelp/In_010_new.png" alt="대화형통계지도 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Regional Settings: Set to go to a specific area on the map.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- As you move the map, the coordinates of the center of the map will be transformed to show the local name.<br>
											2) Tutorial: Take a tutorial for first time users.<br>
											3) Additional function for the user: It performs business map development, data upload, initialization, bookmarking, sharing and so on.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Business Layout: Displays (on / off) the building on which the business floor layout is provided. <br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Upload Data: You can display data collected by individuals on the map.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Reset: Initializes the current map screen.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Bookmarks: You can bookmark statistics you are viewing separately.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Sharing: Provide URLs to share the metrics you've viewed.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Map multiple view: Split the map screen left / right so that various views / comparisons can be made (up to 3 multiple views are possible).<br>
											4) Set up statistical items: Set statistical items and detailed conditions.<br>
											5) Data Visualization (Percentage): Provides the ratio between upper and lower regions for the statistical data that has been viewed.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Data visualization (number): Provides numerical values for each detail area (area) of the statistical data viewed.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Time series display: Selects and displays data for each statistical item by year.<br>
											6) Statistics button: Statistic items to be displayed are added as buttons.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- The statistics button is saved and each statistics button is displayed by "drag-and-drop" or double-click on the map where the border is displayed.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Since the statistics button is saved, there is no need to regenerate the same condition again.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Delete statistics button: You can delete the created statistics button.<br>
											7) Map add-on: Perform distance, area calculation and POI display in the map window.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Provides range measurement, area lookup, and POI display function on the map.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- User scope measurement: Area and Distance Measurement<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- View User’s Area: You can inquire statistics about regions created by users, such as circles, rectangles, and polygons.<br>
											(However, data lookup for the current released statistic is only available.)<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- POI: Brief information on businesses classified into 9 major themes<br>
											8) Scale Adjustment: Adjusts the scale of the map. You can zoom in / out on the map.<br>
											9) Data visualization: It displays legend of displayed statistical value and can change legend setting.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- It is a legend of visualized data on the map. You can set custom criteria such as the legend level, color, etc. through user setting.<br>
										</p>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	 	<!-- 맨위로 버튼 -->
        <a id=topScrollTag href="javascript:window.scroll(0,0)" style="position: fixed; bottom:150px; display:none; border-radius: 5px; width: 50px; height: 50px;cursor: pointer;background-color: #8e787f; opacity: 0.4; filter: alpha(opacity=40);">
        	<img id="topScrollImg" src="/img/ico/arrowup.png" alt="맨위로 가기" />
        </a>
	</div>
</body>
</html>