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
<!-- <script src="/js/plugins/common.js"></script> -->
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
	function scrollFunction(){
		var tmp = window.location.search;
		var tmpId = tmp.substring(1);
		//상단 메뉴 클릭시 해당 주제로 스크롤해서 내려가는 기능
		if(tmpId != ""){
			var tempScroll = $("#"+tmpId).offset().top;
			$('body,html').animate({
				scrollTop: tempScroll
			}, 300);
		}
	}		
	</script>
	</head>
	<body onload="scrollFunction()">
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
						<!-- 활용서비스  -->
						<div class="tab_contents"">
							<div class="article-list"">
								<div style="float:left;width:25%"><h3 class="ptit"><a href="/jsp/english/thematic.jsp">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a href="/jsp/english/interactive.jsp">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a style="color:#4f87b6" href="/jsp/english/application.jsp">Applications </a></h3></div><div><h3 class="ptit"><a href="/jsp/english/analysis.jsp">Map Analysis</a></h3></div>
								<div id="content">
									<div class="pl20 pr20">
										<!-- 정책 통계지도 -->
										<h2 id="application1" style="float:left">Policy Statistical Map</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/map/policyStaticMap"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
										<h4 class="itit">Service Overview</h4>
										<p class="para mb25">
											○ Policy Statistics Map is a service to show the past and current statistical changes about major statistical indicators such as population, household, house, business, and to help policy decision of the community through this.<br>
											○ Features<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Region and Indicator Selection: Select an attempt or municipality area for statistical display, and select statistical indicators.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Statistics Change: Displays past and current statistical information for selected indicators in the form of map, graph, and table.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Convergence: By displaying the changed statistical information of the selected indicator on one map, you can see the statistical change by region at a glance.<br>
											○ Key statistical indicators<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Changes in population (15 types): Changes in male / female population, population density, aging index, infant population, elderly population, etc.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Changes in household and housing (13 types): Changes in total houses, single-person households, single-person households over 65 years old, farm households, apartments,<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Changes in Businesses (10 types): Changes in total businesses, wholesale and retail, manufacturing, agriculture and forestry, PC rooms, chicken shops, coffee shops<br>
										</p>	
										<h4 class="itit">Screen Layout</h4>
										<p><img src="/img/newhelp/Ps_010_01.png" alt="정책 통계지도 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Set up statistics items: Set up statistics items and detailed conditions.<br>
											2) Legend Window: It displays the legend of the displayed statistical value and can change the legend setting.<br>
											3) Data board: Provided statistical data information in graph form.<br>
											4) Year setting: Set year to view.<br>
											5) Convergence: In the new window, you will see the merged data information of both maps.<br>
										</p><br><br><br><br>
											
										<!-- 기술업종 통계지도 -->
										<h2 id="application2" style="float:left">Technical Industry Statistics Map</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/technicalBiz/technicalBizMap"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/Tc_help_10_0.png" alt="기술업종 통계지도 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Set up statistical items: Set the service menu and corresponding statistical items and detailed conditions.<br>
											2) Additional functions: Reset, favorites, report viewing and more.<br>
											3) Data board: Provides statistical data information in various graph form.<br>
										</p><br><br><br><br>
											
										<!-- 살고싶은 우리동네 -->
										<h2 id="application3" style="float:left">Where We Want To Live In</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/house/houseAnalysisMap"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/img_house_1_01.png" alt="살고싶은 우리동네 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Regional Settings: Set to go to a specific area on the map.<br>
											2) Additional function: Enlarge and initialize full screen.<br>
											3) Main functions: Find recommended areas, view residential status, and find ideal neighborhood.<br>
											4) Data board: Provides statistical data information in the form of graphs.<br>
											5) Point of Interest (POI): Display the POI of the school district, convenience facilities, etc. on the map.<br>
											6) Tools: Perform distance, area calculation, satellite image overlap in the map window.<br>
											7) Zoom in / out map: Zoom in and out the map.<br>
											8) Legend Window: It displays the legend of the displayed statistical value, and it is also possible to change the legend setting.<br>
										</p><br><br><br><br>
											
										<!-- 우리동네 생활업종-->
										<h2 id="application4" style="float:left">Our Town’s Industry</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/bizStats/bizStatsMap"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
										<h4 class="itit">Service Overview</h4>
										<p class="para mb25">
											○ It is a service that can inquire various statistical information about major life industries such as restaurants (11 kinds), wholesale and retail (11 kinds), service (11 kinds), lodging business (3 kinds)<br>
											○ Main Features<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Status of daily living industry by province: It is a service that inquires the status of daily living industry in the unit of trial. It shows the ratio of business by category, number, ratio, and year-on-year increase / decrease by indicators.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Status of living industry by municipal district: This is a service that inquires the status of living industry by city or municipal area. It shows the status of business and city / district ranking of living industry indicators.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Change of density of industry: Indicates density of industry type information in the form of open map on the map.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Search for the candidates for living industry: You can search the candidate areas for the selected living conditions by selecting the indicators and weights of the ten target indicators such as the number of businesses, the working population, the type of household, and the official price.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- View the information on the type of residential area: View the information about the residential area related to the living area in each area (city, county, and town).<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Status of opening of business: Provides the status of opening the business by type of business for licensed and authorized businesses.<br>
										</p>	
										<h4 class="itit">Screen Layout</h4>
										<p><img src="/img/newhelp/So_010_01_new.png" alt="우리동네 생활업종 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Set up statistical items: Set the service menu and corresponding statistical items and detailed conditions.<br>
											2) Additional function: It searches the business development map and views information of the trade information.<br>
											3) Data board: Provides statistical data information displayed in various graph form<br>
										</p><br><br><br><br>	
										
										<!-- 지역현안 소통지도-->
										<h2 id="application5" style="float:left">Regional Issues Communication Map</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/community/intro"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/img_community_1_01.png" alt="지역현안 소통지도 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Search for communication map: Search by title or tag.<br>
											2) Sorting: You can re-display the list of statistical traffic maps by sorting and sorting first.<br>
											3) Creating a communication map: After the establisher selects the statistical data in accordance with the purpose of operation as a background map, the communication map is created and operated. Participants can participate after obtaining the approval of the establisher according to the operational nature of the communication map.<br>
											4) Communication map list: The communication map list displays the list of all, opened and subscribed communication map. If you select the communication map with the registered opinions, the detailed information of the communication map and the functions such as comment registration, comment writing, Can be used.<br>
											5) Hot Communication Map: Four communication maps are selected and viewed in hot communication map in order of the number of participants and registration opinions.<br>
											6) Up-to-date communication map: It shows the recently registered communication map.<br>
											7) Notice: You can inquire about the current issue of local communication map.<br>
										</p><br><br><br><br>
											
										<!-- 통계지도체험-->
										<h2 id="application6" style="float:left">Statistics Map Experience</h2>&nbsp;&nbsp;&nbsp;
										<a href="https://sgis.kostat.go.kr/statexp/index.vw"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/Ex_010_01.png" alt="통계지도체험 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Select the area unit: Select the area unit you want to use, such as province, city, county, (Initial setting: City, town)<br>
											2) Input method selection and data viewing method: You can select input method of value and viewing method of input value.<br>
											3) Inputting and applying statistical values: You can input statistical values according to region and apply input values to the local units you want to experience.<br>
											4) Map window: It is the map window where the statistical value is expressed in the selected area unit.<br>
											5) View data: You can see data of statistical value by region.<br>
											6) Legend: You can set legend (number of segments, color, map label, etc.) of the map window.<br>
											7) Downloading and Printing: You can download and print out maps and materials you have experienced.<br>
										</p><br><br><br><br>
										
										<!-- 통계갤러리-->
										<h2 id="application7" style="float:left">Statistics Gallery</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/gallery/resultGallery"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
										<h4 class="itit">Service Overview</h4>
										<p class="para mb25">
											○ The Statistics Gallery is a service that allows users to share various statistical information retrieved using SGIS or statistical information generated by users and communicate with each other.<br>
											○ Main Features<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Gallery registration: You can register the gallery by setting registration information, registering images, selecting existing favorite items, and so on.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Display existing services and register for gallery: We will display the results of inquiries about major services such as interactive statistical map and where we want to live in as a gallery.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Use case registration: Users register and share cases of receiving and using statistics information directly.<br>
										</p>	
										<h4 class="itit">Statistics Gallery screen</h4>
										<p><img src="/img/newhelp/Rg_010_01.png" alt="통계갤러리 안내" style="width:850px;"/></p>
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