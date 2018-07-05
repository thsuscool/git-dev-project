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
						<!-- 통계주제도 -->
						<div class="tab_contents">
							<div class="article-list">
								<div style="float:left;width:25%"><h3 class="ptit"><a style="color:#4f87b6" href="/jsp/english/thematic.jsp">Thematic Maps</a></h3></div><div><h3 class="ptit" style="float:left;width:35%"><a href="/jsp/english/interactive.jsp">Interactive Statistical Map</a></h3></div><div><h3 class="ptit" style="float:left;width:25%"><a href="/jsp/english/application.jsp">Applications </a></h3></div><div><h3 class="ptit"><a href="/jsp/english/analysis.jsp">Map Analysis</a></h3></div>
								<div id="content">
									<div class="pl20 pr20">
										<h2 style="float:left">Thematic Maps</h2>&nbsp;&nbsp;&nbsp;
										<a href="/view/thematicMap/categoryList"><img src="/jsp/english/img/btn_service.png" alt="서비스 바로가기" /></a><hr>
										<h4 class="itit">Service Overview</h4>
										<p class="para mb25">
											○ It is a service that can easily check the statistical information by interest according to the main topic related to statistics.<br>
											○ It is a service that institutionalized interested statistics according to five categories of population and household, housing and transportation, welfare and culture, labor and economy, environment and safety.<br>
											○ Reflecting social issues and trends, it provides more than 90 thematic themes and is constantly added according to social trends.<br>
											○ Topic display type<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Color Type Theme: It is the basic form to express statistical information by administrative area in color.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Increment / Decrement Type Theme: It uses the increase / decrease of two different data to show whether the increase or decrease is by region.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Time series type theme diagram: It is a theme type for displaying change according to the viewpoint. It can be viewed as a color type for each view point, and charts the change of information at each view point of the area.<br>
											&nbsp;&nbsp;&nbsp;&nbsp;- Split type theme: It is a theme type that can directly compare two pieces of data. Express data that is considered to be relevant or highly relevant to be compared by region.<br>
										</p>	
										<h4 class="itit">Screen Layout</h4>
										<p><img src="/img/newhelp/Su_010_01_new.png" alt="통계주제도 안내" style="width:850px;"/></p>
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