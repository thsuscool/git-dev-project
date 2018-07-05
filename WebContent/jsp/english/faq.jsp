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
				<a href="/jsp/english/sopIntro.jsp" class="active">About SGIS & FAQ</a> <a href="/jsp/english/thematic.jsp">SGIS Main Service Introduce</a>
			</div>
			<div id="contents">
				<div id="content_2">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						<div class="tab_contents">
							<!-- About SGIS -->
							<!-- FAQ -->
							<div class="article-list">
								<div style="float:left;width:50%"><h3 class="ptit"><a href="/jsp/english/sopIntro.jsp">About SGIS</a></h3></div><div><h3 class="ptit"><a style="color:#4f87b6" href="/jsp/english/faq.jsp">FAQ</a></h3></div>
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
										<br><br><br>
										<h4 class="itit">What is Administrative District and Court District?</h4>
										<p class="para mb25">
											Administrative District is the district established for administrative convenience, <br>
											and the court district is the administrative district designated by law and uses the traditional regional name.<br><br>
											Example: Yangjae 1-dong (Administrative District), Umyeon-dong (court district)
										</p>
										<br><br><br>
										<h4 class="itit">What is the standard for threshold setting?</h4>
										<p class="para mb25">
											Within the boundaries of the base of the basic area of the administrative zone, the establishment of a population of 500 people,<br>
											the optimum population, and the social and socioeconomic equivalence indices are selected and settled by the AZP Procedure (AZP) program. 
										</p>
										<br><br><br>
										<h4 class="itit">What is JIT?</h4>
										<p class="para mb25">
											JIT (Just In Time) is a service that can check and test the map API and data API provided in SGIS OpenAPI in real time.
										</p>
										<br><br><br>
										<h4 class="itit">What is SGIS OpenAPI?</h4>
										<p class="para mb25">
											SGIS OpenAPI provides a map API that can be used to implement a website using the JavaScript (JacaScript) language,<br>
											and a Data API that can be used to implement a website for services in the Rest format.
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