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
						<!-- 분석지도 -->
						<div class="tab_contents">
							<div class="article-list">
								<div style="float:left;width:25%"><h3 class="ptit"><a href="/jsp/english/thematic.jsp">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a href="/jsp/english/interactive.jsp">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a href="/jsp/english/application.jsp">Applications </a></h3></div><div><h3 class="ptit"><a style="color:#4f87b6" href="/jsp/english/analysis.jsp">Map Analysis</a></h3></div>
								<div id="content">
									<div class="pl20 pr20">
										<!-- 월간통계 -->
										<h2 id="analysis1" style="float:left">Monthly Statistics</h2>&nbsp;&nbsp;&nbsp;
										<a href="https://analysis.kostat.go.kr/funny_month/month/sta_month_main.do"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/Mn_010_01.png" alt="월간통계 안내" style="width:850px;"/></p>
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
										</p><br><br><br><br>
											
										<!-- 인구피라미드 -->
										<h2 id="analysis2" style="float:left">Population Pyramid</h2>&nbsp;&nbsp;&nbsp;
										<a href="https://sgis.kostat.go.kr/jsp/pyramid/pyramid1.jsp"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/Py_010_01.png" alt="인구피라미드 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1)	Choose a nationwide population-specific population-based pyramid.<br>
										    2) Select the base year and birth year to display the population pyramid.<br>
										    3) You can view the population pyramid by selecting the slider.<br>
										    4) You can see the total population of the year, the number of male and female population, the sex ratio and the average age.<br>
										    5) Continuous view: Population estimation information is displayed continuously.<br>
										    6) Population estimation information on the previous year and the following year can be retrieved.<br>
										</p><br><br><br><br>	
										
										<!-- 고령화현황보기 -->
										<h2 id="analysis3" style="float:left">View Aging Status</h2>&nbsp;&nbsp;&nbsp;
										<a href="https://analysis.kostat.go.kr/publicsmodel/"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/Ol_010_01.png" alt="고령화현황보기 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Select a region: To view the aging status, you can select the city / province / district and see the results.<br>
										    2) Select topic: You can select the topic you want.<br>
										    3) Select Details: You can select a subdivided topic and map range.<br>
										    4) Report output: You can output the screen.<br>
										</p><br><br><br><br>	
										
										<!-- 성씨분포 -->
										<h2 id="analysis4" style="float:left">Distribution Of Surname</h2>&nbsp;&nbsp;&nbsp;
										<a href="https://sgis.kostat.go.kr/statbd/family_01.vw"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/Nm_010_01.png" alt="성씨분포 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Surname Population Distribution / Main Population Distribution: Select the population distribution by main surname.<br>
										    2) Select your surname: Select your surname to display the population distribution.<br>
										    3) Display statistical value: Population distribution status is displayed according to the selected condition.<br>
										    4) View data: You can inquire data about selected population information.<br>
										    5) View legend: You can check the legend for the color shown on the map.<br>
										</p><br><br><br><br>
											
										<!-- 지방의 변화보기 -->
										<h2 id="analysis5" style="float:left">See The Change Of The Province</h2>&nbsp;&nbsp;&nbsp;
										<a href="https://sgis.kostat.go.kr/statbd/future_01.vw"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
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
										<p><img src="/img/newhelp/Lo_010_01.png" alt="지방의 변화보기 안내" style="width:850px;"/></p>
										<p class="para mb25">
											1) Select the statistic item: Select the statistical item for the change of the province.<br>
										    2) Left click on the map window to select the administrative area.<br>
										    3) Display statistic value: If you click the mouse on the map window, the statistical value of the relevant administrative area is displayed.<br>
										    4) View data: You can view statistical data about the information displayed on the map.<br>
										    5) Data display: You can see statistical data about the information displayed on the map.<br>
										    6) View legend: You can see the legend information about the color displayed on the map.<br>
										    7) View data by survey year: You can search data by survey year by pressing the left / right navigation button.<br>
										</p><br><br><br><br>	
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