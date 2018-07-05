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
<script src="/js/common/common.js"></script>
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
			$(".tab_content > div").hide();
			$(".tab_content > div").eq($(".board_tab > a").index(this)).show();
			$(".tab_content > div:eq("+ $(".board_tab > a").index(this) +") > div:eq(0)").show();
// 			return false;
		});
		$(".article-tab1 > div a").click(function(){
			$(".article-tab1 > div a").removeClass("M_on");
			$(this).addClass("M_on");
			$(".tab_contents1 > div").hide();
			$(".tab_contents1 > div").eq($(".article-tab1 > div a").index(this)).show();
		});	
		$(".article-tab2 > div a").click(function(){
			$(".article-tab2 > div a").removeClass("M_on");
			$(this).addClass("M_on");
			$(".tab_contents1 > div").hide();
			$(".tab_contents1 > div").eq($(".article-tab2 > div a").index(this)).show();
		});
		$(".service-1 > div a").click(function(){
			$(".service-1 > div a").removeClass("M_on");
			$(this).addClass("M_on");
			$(".tab_contents2 > div").hide();
			$(".tab_contents2 > div").eq($(".service-1 > div a").index(this)).show();
		});
		$(".service-2 > div a").click(function(){
			$(".service-2 > div a").removeClass("M_on");
			$(this).addClass("M_on");
			$(".tab_contents2 > div").hide();
			$(".tab_contents2 > div").eq($(".service-2 > div a").index(this)).show();
		});
		$(".service-3 > div a").click(function(){
			$(".service-3 > div a").removeClass("M_on");
			$(this).addClass("M_on");
			$(".tab_contents2 > div").hide();
			$(".tab_contents2 > div").eq($(".service-3 > div a").index(this)).show();
		});
		$(".service-4 > div a").click(function(){
			$(".service-4 > div a").removeClass("M_on");
			$(this).addClass("M_on");
			$(".tab_contents2 > div").hide();
			$(".tab_contents2 > div").eq($(".service-4 > div a").index(this)).show();
		});
		
		$("#container #contents h3.ptit a").mouseover(function(){
			$(this).css("color","#4f87b6");
		})
		$("#container #contents h3.ptit a").mouseout(function(){
			$(this).css("color","#666");
		})
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
				<a href="javascript:;" class="active">About SGIS & FAQ</a> <a href="javascript:;">SGIS Main Service Introduce</a>
			</div>
			<div id="contents">
				<div id="content_2">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						
						<div class="tab_content">
							<div class="tab_contents1">
								<!-- About SGIS -->
								<div class="article-list">
									<div class="article-tab1">
										<div style="float:left;width:50%"><h3 class="ptit"><a href="javascript:;">About SGIS</a></h3></div><div><h3 class="ptit"><a href="javascript:;">FAQ</a></h3></div>
									</div>
									<div id="content">
										<div class="pl20 pr20">
											<h4 class="itit">What is SGIS?</h4>
											<p class="para mb25">
												○ SGIS is a location-based open service platform that can integrate census data, public and private data such as population, households, houses, and businesses owned by Statistics Korea <br>
												○ You can search various statistical information through map-based (interactive statistical map) and subject-based statistical map service. , OpenAPI on map control and various information utility. <br>
												○ User data analysis is also possible so that individual information can be integrated into SGIS. <br>
												○ System concept map
											</p>
											<img width=840 src="/jsp/english/img/eng_01.png" alt="통계지리정보시스템(SGIS플러스)" /><br><br>
											<h4 class="itit">Content composition</h4>
											<p class="para mb25">
												○ The menu consists of statistical thematic map, interactive statistical map, applications, map analysis, notification area, and developer support center. <br>
												○ If you log in, you can use My Page.
											</p>
											<h4 class="itit">Menu structure</h4>
											<img width=840 src="/jsp/english/img/eng_02.png" alt="통계지리정보시스템(SGIS플러스)" /><br><br>
											<h4 class="itit">Content list</h4>
											<table id="contentList" border="1">
											  <colgroup>
												<col style="width:20%;" />
												<col style="width:80%;"/>
											  </colgroup>
										      <thead>
												<tr style="height:40px; bgcolor:#dadada;">
												<th scope="col">Content Type</th>
												<th scope="col">Service Contents</th>
										      </thead>
										      <tr>
											   <td style="height:40px; text-align:center">Statistical thematic map</td>
											   <td>&nbsp;&nbsp;Provides statistical themes on population ㆍ household, housing ㆍ transportation, welfare ㆍ culture, labor ㆍ economy, environment ㆍ safety</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Interactive statistical map</td>
											   <td>&nbsp;&nbsp;Provides statistical map information on population, housing, households, agriculture, forestry and fishery, census and administrative district statistics by region</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Policy Statistical Map</td>
											   <td>&nbsp;&nbsp;Demand change by region and cooperative policy map information</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Technical industry statistics map</td>
											   <td>&nbsp;&nbsp;Provide information on the characteristics of technology industries by region for technology industries closely related to people's lives</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Our neighborhood we want to live in</td>
											   <td>&nbsp;&nbsp;Provide a facility to recommend a residential area that meets your requirements</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Living in our neighborhood</td>
											   <td>&nbsp;&nbsp;Providing statistical information related to entrepreneurs in various forms</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Communicate local issues</td>
											   <td>&nbsp;&nbsp;Provide community mapping function by members of local community</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Statistics Map Experience</td>
											   <td>&nbsp;&nbsp;Ability to create various statistical map by user inputting data directly</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Statistics Gallery</td>
											   <td>&nbsp;&nbsp;Provides the ability to collect and share statistical information identified by various services of the statistical portal</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Monthly statistics</td>
											   <td>&nbsp;&nbsp;Provides statistical maps for users to understand major monthly statistics</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Moving Population Pyramid</td>
											   <td>&nbsp;&nbsp;The pyramid shape of the past and future population changes by age based on the estimated population</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">View aging status</td>
											   <td>&nbsp;&nbsp;Provide statistics on aging and press releases such as regional comparison of aging status, trend analysis, welfare facilities for the elderly, etc</td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">Distribution of Surname</td>
											   <td>&nbsp;&nbsp;Providing statistical information about the distribution of geographical names in our country's 50s and the region of the 99 provinces of Korea </td>
										      </tr>
										      <tr>
											   <td style="height:40px;text-align:center">View of change in the province</td>
											   <td>&nbsp;&nbsp;Provide a change of province every five years from 1995 to 2015</td>
										      </tr>
										   </table>
										   <br><br>
											<h4 class="itit">History</h4>
											<div class="ml20 mb20">
												<table class="tbl-normal none-head" summary="SGIS플러스 연혁">
													<colgroup>
														<col style="width: 151px;" /><col />
													</colgroup>
													<tbody>
													<tr>
														<th>2017</th>
														<td>Policy statistics map, technology sector statistics map, statistics gallery, research service support system service launched.</td>
													</tr>
													<tr>
														<th>2016</th>
														<td>Launches local neighborhood data communication system, location-based data management system service</td>
													</tr>
													<tr>
														<th>2015</th>
														<td>SGIS open platform nationwide service implementation</td>
													</tr>
													<tr>
														<th>2014</th>
														<td>First phase of SGIS open platform</td>
													</tr>
													<tr>
														<th>2013</th>
														<td>Promotion of Information Technology Strategy (ISP) for SGIS Open Platform</td>
													</tr>
													<tr>
														<th>2012</th>
														<td>Adoption of OGC standard Web GIS engine, small area statistics reorganization</td>
													</tr>
													<tr>
														<th>2011.12.</th>
														<td>Statistical map time series service, S-statistics navigator, Administrative area statistics service</td>
													</tr>
													<tr>
														<th>2009.05.</th>
														<td>National Service of Statistics Geographic Information Service (SGIS)</td>
													</tr>
													<tr>
														<th>2008.12.</th>
														<td>Establishment of nationwide data and expansion of system</td>
													</tr>
													<tr>
														<th>2007.12.</th>
														<td>Expanding services for seven large cities</td>
													</tr>
													<tr>
														<th>2006.12.</th>
														<td>Daejeon Metropolitan City Pilot Service</td>
													</tr>
												</tbody>
											</table></div><br /><br />
											<h4 class="itit">DB building process</h4>
											<p class="para mb25">
												○ Step 1 - Census map construction: Digital map construction for spatial analysis service <br>
												○ Step 2 - Entering information for individual statistics survey: Establishment of a DB that registers location information of the national residence and business and links property information <br>
												○ Step 3 - Construction of basic units: Compartmentalizing basic units based on permanent features such as roads, rivers, and ridges <br>
												○ Step 4 – Census output area: Tie basic units together to determine the home layout of a regular population of up to 500 persons. <br>
												○ Step 5 - Service provision: providing statistical geographic information service and spatial statistical data <br>
											</p>
										</div>
									</div>
								</div>
								
								<!-- FAQ -->
								<div class="article-list" style="display:none;">
									<div class="article-tab2">
										<div style="float:left;width:50%"><h3 class="ptit"><a href="javascript:;">About SGIS</a></h3></div><div><h3 class="ptit"><a href="javascript:;">FAQ</a></h3></div>
									</div>
									<div id="content">
										<div class="pl20 pr20">
											<h4 class="itit">Conditions for optimal use of SGIS</h4>
											<p class="para mb25">
												<p style="font-weight:bold;">1. Browser compatibility</p><br>
												 The SGIS open platform is built on HTML5.<br>
												 The following browsers can be used optimally.<br><br>
												 Internet Explorer 10 + <br>
												 <a style="color:blue;" href="http://windows.microsoft.com/ko-KR/internet-explorer/products/ie/home">http://windows.microsoft.com/ko-KR/internet-explorer/products/ie/home</a><br><br> 
												 Google Chrome 37 + <br>
												 <a style="color:blue;" href="http://www.google.com/chrome">http://www.google.com/chrome</a><br><br>
												 Mozilla Firefox 32 + <br>
												 <a style="color:blue;" href="http://www.mozilla.or.kr/ko/firefox/">http://www.mozilla.or.kr/ko/firefox/</a><br><br> 
												 Apple Safari 6.0 + <br>
												 <a style="color:blue;" href="http://www.apple.com/kr/safari/">http://www.apple.com/kr/safari/</a><br><br>
												 Opera 22 + <br>
												 <a style="color:blue;" href="http://www.opera.com">http://www.opera.com</a><br>
											</p>	 
											<p class="para mb25">
												<p style="font-weight:bold;">2. Screen resolution</p><br>
												Screen resolution of SGIS service is minimum 1024 * 768, and some services are based on 1280 * 768.<br>
												However, due to the nature of the map information service that displays various statistical information, it can be used optimally when the screen resolution is higher.
											</p>
											 
											<p class="para mb25">
												<p style="font-weight:bold;">3. Delay of map display when network is blocked</p><br>
												If you block Kacao Story, Twitter, or Facebook from your PC network firewall,<br>
												The first time you connect an interactive statistical map on the SGIS open platform, the map will appear about three to four minutes later.
											</p>
											 
											<p class="para mb25">
												<p style="font-weight:bold;">4. Precautions when dragging and dropping the search criteria on the statistical map</p><br>
												If you drag the search criteria onto the map when viewing a statistical map,<br>
												You should drag and drop when there are borders (black lines) on the map to see the statistics.
											</p>
											<p class="para mb25">
												<p style="font-weight:bold;">5. If you do not see a border on the map, when you are viewing the statistical map </p><br>
												If you do not see the border (black line) on the map when viewing the statistical map<br>
												Move the map a little with your mouse and you'll see the border.
											</p> 
											<p class="para mb25">
												<p style="font-weight:bold;">6. If you have not used your browser for a long time</p><br>
												If you have not used the browser for a long time, the map or data may not be displayed.<br>
												In this case, press the F5 key to refresh or restart the browser
											</p>
											<br><br><br>
											<h4 class="itit">If there is an error in SGIS behavior in the Web browser edge on Windows 10</h4>
											<p class="para mb25">
												In Windows 10, you can select Internet Explorer 11 other than Web browser edge to maintain compatibility of existing website.<br>
												You can change the current web browser through the setup menu. If there is an error in SGIS operation,<br>
												please change your web browser to Internet Explorer 11.<br>
												There are information on the internet how to change your web browser. 
											</p>
											<br><br><br>
											<h4 class="itit">What is the difference between administrative and sub-districts?</h4>
											<p class="para mb25">
												The administrative district is the statistical reference area above the Eup or Myeon-dong,<br>
												and the small area (county district) is the area for collecting statistical data for convenience.<br>
												It is about 500 people in size, and the scale is about 1/25 of Eup/Myeon-dong.  
											</p>
										</div>
									</div>
								</div>
							</div>
							
							<!-- SGIS서비스 소개 -->
							<!-- 통계주제도 -->
							<div class="tab_contents2" style="display:none;">
								<div class="service-1">
									<div style="float:left;width:25%"><h3 class="ptit"><a href="javascript:;">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a href="javascript:;">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a href="javascript:;">Applications </a></h3></div><div><h3 class="ptit"><a href="javascript:;">Map Analysis</a></h3></div>
									<div id="content">
										<div class="pl20 pr20">
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ It is a service that can easily check the statistical information by interest according to the main topic related to statistics.<br>
												○ It is a service that institutionalized interested statistics according to five categories of population and furniture, housing and transportation, welfare and culture, labor and economy, environment and safety.<br>
												○ Reflecting social issues and trends, it provides more than 90 thematic themes and is constantly added according to social trends.<br>
												○ Topic display type<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Color Type Theme: It is the basic form to express statistical information by administrative area in color.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Increment / Decrement Type Theme: It uses the increase / decrease of two different data to show whether the increase or decrease is by region.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Time series type theme diagram: It is a theme type for displaying change according to the viewpoint. It can be viewed as a color type for each view point, and charts the change of information at each view point of the area.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Split type theme: It is a theme type that can directly compare two pieces of data. Express data that is considered to be relevant or highly relevant to be compared by region.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Su_010_01_new.png" alt="통계주제도 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Region setting: The area corresponding to the center of the map is set. Therefore, the information is updated when you move the map.<br>
												2) Topic list: A list of thematic categories and thematic maps appears.<br>
												3) Topic Title: Title of the statistic being displayed.<br>
												4) Set Topic: Set statistical information representation such as statistics selection, area boundary selection, map type, statistical presentation.<br>
												5) Data visualization: Adjust the legend of statistical information.<br>
												6) Print and Topic Request: This is a function that prints a theme and requests to add a new topic.<br>
												7) Map Type: Change the background map to General / Satellite.<br>
											</p>	
										</div>
									</div>
								</div>
								<!-- 대화형통계지도 -->
								<div class="service-2" style="display:none;">
									<div style="float:left;width:25%"><h3 class="ptit"><a href="javascript:;">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a href="javascript:;">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a href="javascript:;">Applications </a></h3></div><div><h3 class="ptit"><a href="javascript:;">Map Analysis</a></h3></div>
									<div id="content">
										<div class="pl20 pr20">
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ It is statistical geographical information service which can freely inquire various statistical information such as population, housing, furniture, agriculture, forestry fishery, business census and administrative district statistics on a regional basis.<br>
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
											<p><img src="/img/newhelp/In_010_new.png" alt="대화형통계지도 안내" style="width:700px;height:355px;"/></p>
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
								<!-- 활용서비스  -->
								<div class="service-3" style="display:none;">
									<div style="float:left;width:25%"><h3 class="ptit"><a href="javascript:;">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a href="javascript:;">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a href="javascript:;">Applications </a></h3></div><div><h3 class="ptit"><a href="javascript:;">Map Analysis</a></h3></div>
									<div id="content">
										<div class="pl20 pr20">
											<!-- 정책 통계지도 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Policy Statistical Map</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ Policy Statistics Map is a service to show the past and current statistical changes about major statistical indicators such as population, household, house, business, and to help policy decision of the community through this.<br>
												○ Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Region and Indicator Selection: Select an attempt or municipality area for statistical display, and select statistical indicators.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Statistics Change: Displays past and current statistical information for selected indicators in the form of map, graph, and table.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Convergence: By displaying the changed statistical information of the selected indicator on one map, you can see the statistical change by region at a glance.<br>
												○ Key statistical indicators<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Changes in population (15 types): Changes in male / female population, population density, aging index, infant population, elderly population, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Changes in furniture and housing (13 types): Changes in total houses, single-person households, single-person households over 65 years old, farm households, apartments,<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Changes in Businesses (10 types): Changes in total businesses, wholesale and retail, manufacturing, agriculture and forestry, PC rooms, chicken shops, coffee shops<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Ps_010_01.png" alt="정책 통계지도 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Set up statistics items: Set up statistics items and detailed conditions.<br>
												2) Legend Window: It displays the legend of the displayed statistical value and can change the legend setting.<br>
												3) Data board: Provided statistical data information in graph form.<br>
												4) Year setting: Set year to view.<br>
												5) Convergence: In the new window, you will see the merged data information of both maps.<br>
											</p><br>
												
											<!-- 기술업종 통계지도 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Technical Industry Statistics Map</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ Technology Industry Statistics Map is a service that allows you to view various statistical information related to technology industry, and to view information related to technology industry support facilities and industrial complexes.<br>
												○ The technology sector is a technology-intensive sector that generates revenue based on new technology. It is classified into 7 sectors according to degree of technology innovation and degree of knowledge aggregation.<br>
												○ Main Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Status of technology industry by province: It is a service that inquires the technology industry status of major enterprises. It shows information on regional characteristics and economic census status by sector.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- City and County Technology Status: Provides city and municipal districts with information on regional status of technology industries nationwide. It shows business status and city / district ranking of technology industry indicators.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Changes in the density of the industry: Shows the density of the industry in the technology sector in the form of open maps.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Viewing Support facility: We display the status of technology industry support facilities and start-up support facilities by region.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Viewing Industrial Complex: View the status of industrial complexes and detailed information of industrial complexes by region.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Tc_help_10_0.png" alt="기술업종 통계지도 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Set up statistical items: Set the service menu and corresponding statistical items and detailed conditions.<br>
												2) Additional functions: Reset, favorites, report viewing and more.<br>
												3) Data board: Provides statistical data information in various graph form.<br>
											</p>
												
											<!-- 살고싶은 우리동네 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Where we want to live in</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ Where we want to live is, based on statistics, we recommend a residential area that meets your requirements.<br>
												○ Users can see the nature, housing, population, safety, life convenience transportation, education, culture, welfare and so on seven categories that correspond to the selection criteria of the total residential area that meets the condition of 33 kinds of recommended lists and statistics.<br>
												○ Main Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Find recommended places<br>
												&nbsp;&nbsp;&nbsp;&nbsp;: The service that searches for housing recommendation based on key indicators includes area selection, automatic index setting by lifestyle, sorting criteria and weight setting by index, and detailed information of recommended area.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- View residential status<br>
												&nbsp;&nbsp;&nbsp;&nbsp;: You can view the status of the indicators by region for the main indicators and the status of the distribution by the indicators.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Find towns<br>
												&nbsp;&nbsp;&nbsp;&nbsp;: It's a simple way to view your town of interest, including features like setting up interests, setting indicator priorities, and viewing recommendations for your town.<br>
												○ Key indicators<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Nature: air pollution rate, green area ratio, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Housing: apartment rate, apartment price, official price, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Local population: ratio of youth population, net population, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Safety: fire safety, traffic accident safety, crime safety, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Living convenience transportation: Number of facilities, number of shopping facilities, number of restaurants<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Education: Number of high education institutions, number of institutes, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Welfare culture: Kindergarten and childcare facilities, medical clinics and pharmacies, social welfare facilities, cultural facilities, etc.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/img_house_1_01.png" alt="살고싶은 우리동네 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Regional Settings: Set to go to a specific area on the map.<br>
												2) Additional function: Enlarge and initialize full screen.<br>
												3) Main functions: Find recommended areas, view residential status, and find ideal neighborhood.<br>
												4) Data board: Provides statistical data information in the form of graphs.<br>
												5) Point of Interest (POI): Display the POI of the school district, convenience facilities, etc. on the map.<br>
												6) Tools: Perform distance, area calculation, satellite image overlap in the map window.<br>
												7) Zoom in / out map: Zoom in and out the map.<br>
												8) Legend Window: It displays the legend of the displayed statistical value, and it is also possible to change the legend setting.<br>
											</p>
												
											<!-- 우리동네 생활업종-->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Our town’s industry</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ It is a service that can inquire various statistical information about major life industries such as restaurants (11 kinds), wholesale and retail (11 kinds), service (11 kinds), lodging business (3 kinds)<br>
												○ Main Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Status of daily living industry by province: It is a service that inquires the status of daily living industry in the unit of trial. It shows the ratio of business by category, number, ratio, and year-on-year increase / decrease by indicators.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Status of living industry by municipal district: This is a service that inquires the status of living industry by city or municipal area. It shows the status of business and city / district ranking of living industry indicators.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Change of density of industry: Indicates density of industry type information in the form of open map on the map.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Search for the candidates for living industry: You can search the candidate areas for the selected living conditions by selecting the indicators and weights of the ten target indicators such as the number of businesses, the working population, the type of furniture, and the official price.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- View the information on the type of residential area: View the information about the residential area related to the living area in each area (city, county, and town).<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Status of opening of business: Provides the status of opening the business by type of business for licensed and authorized businesses.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/So_010_01_new.png" alt="우리동네 생활업종 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Set up statistical items: Set the service menu and corresponding statistical items and detailed conditions.<br>
												2) Additional function: It searches the business development map and views information of the trade information.<br>
												3) Data board: Provides statistical data information displayed in various graph form<br>
											</p>	
											
											<!-- 지역현안 소통지도-->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Regional issues communication map</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ Local communication map provides a map mapping function as a service for local community members to identify issues in the community and to create a space for communication.<br>
												○ Communication map establisher can use interactive statistical map or my data function to apply statistics related to topic to communication map.<br>
												○ Main Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Communication map creation: communication map information registration, area setting, period setting, icon setting, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Create background map: You can display POI information such as statistical color map or theme, my data, etc. of total population, total business, and favorites.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Registering comments on the communication map: You can register comments, location, and photos.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Viewing communication map status: Provides various status information such as opinions on communication map and participant status through charts and tables.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/img_community_1_01.png" alt="지역현안 소통지도 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Search for communication map: Search by title or tag.
												2) Sorting: You can re-display the list of statistical traffic maps by sorting and sorting first.
												3) Creating a communication map: After the establisher selects the statistical data in accordance with the purpose of operation as a background map, the communication map is created and operated. Participants can participate after obtaining the approval of the establisher according to the operational nature of the communication map.
												4) Communication map list: The communication map list displays the list of all, opened and subscribed communication map. If you select the communication map with the registered opinions, the detailed information of the communication map and the functions such as comment registration, comment writing, Can be used.
												5) Hot Communication Map: Four communication maps are selected and viewed in hot communication map in order of the number of participants and registration opinions.
												6) Up-to-date communication map: It shows the recently registered communication map.
												7) Notice: You can inquire about the current issue of local communication map.
											</p>
												
											<!-- 통계지도체험-->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Statistics Map Experience</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ The statistical map experience is a service that users can express statistical values visually and spatially on the administrative boundary of the map as needed.<br>
												○ You can create color map by administrative area by inputting statistical data or using data such as Excel <br>
												○ Main Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Administrative Area Unit Statistics Experience: You can experience statistical experience in the province / city / municipal / eup, myeon-dong.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Map screen setting: color setting, label setting, font setting, and legend settings are possible.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Enter statistical values directly: Users can input statistical values for each administrative area.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Enter statistics value using Excel: Statistical values can be set using Excel with statistical values of administrative districts.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Report output: Graphs and charts are displayed, and the generated statistical map is output as a report.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Ex_010_01.png" alt="통계지도체험 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Select the area unit: Select the area unit you want to use, such as province, city, county, (Initial setting: City, town)<br>
												2) Input method selection and data viewing method: You can select input method of value and viewing method of input value.<br>
												3) Inputting and applying statistical values: You can input statistical values according to region and apply input values to the local units you want to experience.<br>
												4) Map window: It is the map window where the statistical value is expressed in the selected area unit.<br>
												5) View data: You can see data of statistical value by region.<br>
												6) Legend: You can set legend (number of segments, color, map label, etc.) of the map window.<br>
												7) Downloading and Printing: You can download and print out maps and materials you have experienced.<br>
											</p>
											
											<!-- 통계갤러리-->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Statistics Gallery</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ The Statistics Gallery is a service that allows users to share various statistical information retrieved using SGIS or statistical information generated by users and communicate with each other.<br>
												○ Main Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Gallery registration: You can register the gallery by setting registration information, registering images, selecting existing favorite items, and so on.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Display existing services and register for gallery: We will display the results of inquiries about major services such as interactive statistical map and where we want to live in as a gallery.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Use case registration: Users register and share cases of receiving and using statistics information directly.<br>
											</p>	
											<h4 class="itit">Statistics Gallery screen</h4>
											<p><img src="/img/newhelp/Rg_010_01.png" alt="통계갤러리 안내" style="width:700px;height:355px;"/></p>
										</div>
									</div>
								</div>
								<!-- 분석지도 -->
								<div class="service-4" style="display:none;">
									<div style="float:left;width:25%"><h3 class="ptit"><a href="javascript:;">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a href="javascript:;">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a href="javascript:;">Applications </a></h3></div><div><h3 class="ptit"><a href="javascript:;">Map Analysis</a></h3></div>
									<div id="content">
										<div class="pl20 pr20">
											<!-- 월간통계 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Monthly statistics</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ Monthly statistics service is a service that shows the monthly statistical information such as the consumer price index and the unemployment rate into three types of statistics such as monthly statistics, month-to-month, and year-to-date.<br>
												○ The statistical information is provided on a monthly basis since 2008, and the statistics of the trial unit for the statistical item are displayed on the map.<br>
												○ Detailed information such as summary information, units, and arithmetic expressions for statistical items are provided.<br>
												○ Provided statistical items<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Employment trends: employment rate, unemployment rate<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Industrial activity trends: Mining industry index (production / shipment / inventory), default rate, large retail sales index<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Consumer Price Trend: Consumer Price Index, Life Price Index<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Population Trends: Number of births, number of deaths, number of marriages, number of divorces<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Mn_010_01.png" alt="월간통계 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												 1) Selection of statistical items: Employment trends, industrial activity trends, consumer price trends, and population trends can be selected.<br>
											     2) Select year/month: Select year and month.<br>
											     3) Monthly statistics for the statistical items, month-to-month, and year-to-date are available at once.<br>
											     4) Left click on the map window to select an administrative area.<br>
											     5) Receiving data: You can download reports and press releases.<br>
											     6) Statistic item description: You can see descriptive data about statistic item to be viewed.<br>
											     7) Data / Graph Display: Performs data and graph inquiry for statistical items.<br>
											     8) Monthly data search: You can search monthly data by pressing the left / right navigation button.<br>
											     9) View legend: You can see the legend information about the color displayed on the map.<br>
											</p>
												
											<!-- 인구피라미드 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Population pyramid</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ The moving population pyramid can be graphically plotted for future population changes, taking into account the defined population for the past population and future population changes (birth, death, international migration).<br>
												○ Service Contents<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- From 1960 to 2065, the annual pyramid population<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- 1970 to 2045 year, nationwide, and age 5 populations by age pyramid<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Indicates the percentage of population by birth year and current year to indicate survival rate<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Demonstrates population changes in the country and provinces to compare changes in demographic structure between tries.<br>
												○ Population growth assumption<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- High-income households: Calculated in anticipation of high fertility and life expectancy.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Low-income households: Calculated to predict low population growth.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Medium-income households: Calculated in anticipation of the median of the high and low.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Py_010_01.png" alt="인구피라미드 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1)	Choose a nationwide population-specific population-based pyramid.<br>
											    2) Select the base year and birth year to display the population pyramid.<br>
											    3) You can view the population pyramid by selecting the slider.<br>
											    4) You can see the total population of the year, the number of male and female population, the sex ratio and the average age.<br>
											    5) Continuous view: Population estimation information is displayed continuously.<br>
											    6) Population estimation information on the previous year and the following year can be retrieved.<br>
											</p>	
											
											<!-- 고령화현황보기 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>View aging status</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ This service provides various statistics related to aging in an increasingly aging society, and provides information on aging trends, aging trends, and welfare facilities.<br>
												○ Main Features<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Aging theme map: to express the elderly population (percentage), aging population, etc. as a color on the map in city/town/ eup-myeondong units.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Providing statistics on neighboring regions: Provides statistics on the neighboring regions of the relevant municipal or district when displaying the statistics on aging of the regions.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Provide various charts: Various charts, graphs, pie charts and analysis charts are provided according to statistical characteristics.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Welfare facility theme map: Displays the location of major welfare facilities for seniors on the map.<br>
												○ Statistical information provided<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Comparison of current situation: aging theme, comparison of aging trends among regions, number of people receiving basic living, how to prepare living expenses, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Trend analysis: Provides statistical and analysis results such as changes in past / future demographic structure and diagnosis of aging trends<br>
   												&nbsp;&nbsp;&nbsp;&nbsp;- Welfare facilities: theme of welfare facilities, elderly housing / medical / leisure welfare facilities, etc.<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Ol_010_01.png" alt="고령화현황보기 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Select a region: To view the aging status, you can select the city / province / district and see the results.<br>
											    2) Select topic: You can select the topic you want.<br>
											    3) Select Details: You can select a subdivided topic and map range.<br>
											    4) Report output: You can output the screen.<br>
											</p>	
											
											<!-- 성씨분포 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>Distribution of Surname</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ Distribution of Surname Service is a service that allows you to compare the population ratio and the changes from the past to the surname of the country and the main building in each region.<br>
												○ About each surname, main building We show population distribution state and population change from the past in color map form in unit of municipal district of the whole country.<br>
												○ Surname distribution statistics provide 15-year cycle statistics<br>
												○ Service Contents<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Surname Population Distribution: Population-to-Population Ratio Service for seniors in 50s, 1985/2000/2015<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Main population: Population and population ratio service for the 99 main, 1985/2000/2015<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Comparison of Population Distribution Change: Simultaneous display of population map of 1985/2000/2015<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Nm_010_01.png" alt="성씨분포 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Surname Population Distribution / Main Population Distribution: Select the population distribution by main surname.<br>
											    2) Select your surname: Select your surname to display the population distribution.<br>
											    3) Display statistical value: Population distribution status is displayed according to the selected condition.<br>
											    4) View data: You can inquire data about selected population information.<br>
											    5) View legend: You can check the legend for the color shown on the map.<br>
											</p>
												
											<!-- 지방의 변화보기 -->
											<a href="/view/thematicMap/categoryList"><img src="/img/nm/btn_service.gif" alt="서비스 바로가기" /></a><br><br>
											<h2>See the change of the province</h2><hr>
											<h4 class="itit">Service Overview</h4>
											<p class="para mb25">
												○ See the change of the province is a service that provides a changing picture of the province (national city / county district).<br>
												○ From 1995 to the present, you can provide statistical map by city and district such as population, housing ratio, etc. at five-year intervals, and you can display three maps at the same time and check statistics change at a glance.<br>
												○ Statistical information can be checked in tabular form in addition to the map, and statistics for the whole year are provided in units of attempts.<br>
												○ The statistical items provided are as follows.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Households / Population Ratio: Population by age group / marital status, households with one or more households, birth rate of 20s / 40s, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Ratio of Social: education level, female education, remarriage ratio, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Ratio of traffic: commuting population, commuting transportation, automobiles, etc.<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Ratios of housing: apartment / apartment / house ratio<br>
												&nbsp;&nbsp;&nbsp;&nbsp;- Ratio of Religion: Religion / Buddhism / Catholicism / Protestant / Other Religious Population<br>
											</p>	
											<h4 class="itit">Screen Layout</h4>
											<p><img src="/img/newhelp/Lo_010_01.png" alt="지방의 변화보기 안내" style="width:700px;height:355px;"/></p>
											<p class="para mb25">
												1) Select the statistic item: Select the statistical item for the change of the province.<br>
											    2) Left click on the map window to select the administrative area.<br>
											    3) Display statistic value: If you click the mouse on the map window, the statistical value of the relevant administrative area is displayed.<br>
											    4) View data: You can view statistical data about the information displayed on the map.<br>
											    5) Data display: You can see statistical data about the information displayed on the map.<br>
											    6) View legend: You can see the legend information about the color displayed on the map.<br>
											    7) View data by survey year: You can search data by survey year by pressing the left / right navigation button.<br>
											</p>	
										</div>
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
        
		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>