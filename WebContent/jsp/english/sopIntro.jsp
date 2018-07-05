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
	#contentList td{font-size:13px;text-align:left;padding-left:3px;height:40px;}
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
				<a href="/jsp/english/sopIntro.jsp" class="active">About SGIS & FAQ</a> <a href="/jsp/english/thematic.jsp">SGIS Main Service Introduce</a>
			</div>
			<div id="contents">
				<div id="content_2">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						<div class="tab_contents">
							<!-- About SGIS -->
							<div class="article-list">
								<div style="float:left;width:50%"><h3 class="ptit"><a style="color:#4f87b6" href="/jsp/english/sopIntro.jsp">About SGIS</a></h3></div><div><h3 class="ptit"><a href="/jsp/english/faq.jsp">FAQ</a></h3></div>
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
										   <td>Statistical thematic map</td>
										   <td>&nbsp;&nbsp;Provides statistical themes on population ㆍ household, housing ㆍ transportation, welfare ㆍ culture, labor ㆍ economy, environment ㆍ safety</td>
									      </tr>
									      <tr>
										   <td>Interactive statistical map</td>
										   <td>&nbsp;&nbsp;Provides statistical map information on population, housing, households, agriculture, forestry and fishery, census and administrative district statistics by region</td>
									      </tr>
									      <tr>
										   <td>Policy Statistical Map</td>
										   <td>&nbsp;&nbsp;Demand change by region and cooperative policy map information</td>
									      </tr>
									      <tr>
										   <td>Technical industry statistics map</td>
										   <td>&nbsp;&nbsp;Provide information on the characteristics of technology industries by region for technology industries closely related to people's lives</td>
									      </tr>
									      <tr>
										   <td>Our neighborhood we want to live in</td>
										   <td>&nbsp;&nbsp;Provide a facility to recommend a residential area that meets your requirements</td>
									      </tr>
									      <tr>
										   <td>Living in our neighborhood</td>
										   <td>&nbsp;&nbsp;Providing statistical information related to entrepreneurs in various forms</td>
									      </tr>
									      <tr>
										   <td>Communicate local issues</td>
										   <td>&nbsp;&nbsp;Provide community mapping function by members of local community</td>
									      </tr>
									      <tr>
										   <td>Statistics Map Experience</td>
										   <td>&nbsp;&nbsp;Ability to create various statistical map by user inputting data directly</td>
									      </tr>
									      <tr>
										   <td>Statistics Gallery</td>
										   <td>&nbsp;&nbsp;Provides the ability to collect and share statistical information identified by various services of the statistical portal</td>
									      </tr>
									      <tr>
										   <td>Monthly statistics</td>
										   <td>&nbsp;&nbsp;Provides statistical maps for users to understand major monthly statistics</td>
									      </tr>
									      <tr>
										   <td>Moving Population Pyramid</td>
										   <td>&nbsp;&nbsp;The pyramid shape of the past and future population changes by age based on the estimated population</td>
									      </tr>
									      <tr>
										   <td>View aging status</td>
										   <td>&nbsp;&nbsp;Provide statistics on aging and press releases such as regional comparison of aging status, trend analysis, welfare facilities for the elderly, etc</td>
									      </tr>
									      <tr>
										   <td>Distribution of Surname</td>
										   <td>&nbsp;&nbsp;Providing statistical information about the distribution of geographical names in our country's 50s and the region of the 99 provinces of Korea </td>
									      </tr>
									      <tr>
										   <td>View of change in the province</td>
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