<%
/**************************************************************************************************************************
* Program Name  : 메인 JSP  
* File Name     : index.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String userAgent = request.getHeader("User-Agent");
	String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos",
				"Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};
	
	String param = request.getParameter("param");
	if(param == null || !param.equals("0")){
		int j = -1;
		if(userAgent != null && !userAgent.equals("")){
			for(int i = 0; i < mobileOs.length; i++){
				j = userAgent.indexOf(mobileOs[i]);
				if(j > -1 ){
					out.println("");
					out.println("");
					out.println("<script>");
					out.println("location.href='/mobile';");
					out.println("</script>");
					out.println("");
					out.println("");
					break;
				}
			}
		}
	}
%>
<!-- Top Include -->
<jsp:include page="/view/common/common"></jsp:include>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Statistical Geographic Information Service</title>
    <link href="/jsp/english/css/default.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="/jsp/english/css/main.css" />
    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type="text/javascript" src="/js/plugins/slick.min.js"></script>    
    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
    <script type="text/javascript" src="/jsp/english/js/index.js"></script>   
</head>

<body class="main">
		<header>
			<jsp:include page="/jsp/english/includeSearch.jsp"></jsp:include>
		</header>
		
	    <div id="container">
			<dl class="latestList">
				<dt class="im"><!-- 통계주제도 -->
					<p class="h3" title="Thematic Maps"><a href="/jsp/english/thematic.jsp" class="evtLatest"><span>Thematic Maps</span></a></p>
				</dt>
				<dd class="im">
					<p class="etc" title="Thematic Maps">You can easily view statistical maps of topics that you are interested in without setting them up.</p> 
				</dd>
				<dt class="tm"><!-- 대화형통계지도 -->
					<div style="font-size:12px;">
					<a href="/jsp/english/interactive.jsp" class="evtLatest"><br /><span style="font-size: 20px; font-family: 나눔고딕b;">Interactive Statistical Map</span></a>
					</div>
				</dt>
				<dd class="tm">
					<p class="etc" title="Interactive Statistical Map">Various data such as population, household, house, business, etc. can be displayed on the map according to user's condition.</p>
				</dd>
				<dt class="ca"><!-- 활용사례 -->
					<p class="h3" title="Applications"><a href="/jsp/english/application.jsp"><span >Applications</span></a></p>  
				</dt>
				<dd class="ca">
					<div class="icoSlideBox">
						<div class="icoSlideController">
							<a href="javascript:void(0)" class="micoPrev">prev</a>
							<a href="javascript:void(0)" class="micoNext">next</a>
						</div>
						<div class="icoSlide">
							<div class="item"><a href="/jsp/english/application.jsp?application1" class="caIco06">Policy<br>Statistics Map</a></div>
							<div class="item"><a href="/jsp/english/application.jsp?application2" class="caIco05">Technical Industry</a></div>
							<div class="item"><a href="/jsp/english/application.jsp?application3" class="caIco01">Where We Want To Live In<br></a></div>
							<div class="item"><a href="/jsp/english/application.jsp?application4" class="caIco02">Our Town’s Industry</a></div>
							<div class="item"><a href="/jsp/english/application.jsp?application5" class="caIco03">Communication Map</a></div>
							<div class="item"><a href="/jsp/english/application.jsp?application6" class="caIco04">Statistical Map Experience</a></div>
							<div class="item"><a href="/jsp/english/application.jsp?application7" class="caIco07">Statistical Gallery</a></div>
						</div>
					</div> 
				</dd>
				<dt class="ma"><!-- 분석지도 -->
					<p class="h3" title="Map Analysis"><a href="/jsp/english/analysis.jsp"><span >Map Analysis</span></a></p>  
				</dt>
				<dd class="ma">
					<ul>
						<li><a href="/jsp/english/analysis.jsp?analysis1">Monthly Statistics</a></li>
						<li><a href="/jsp/english/analysis.jsp?analysis2">Popuplation<br />Pyramid</a></li>
						<li><a href="/jsp/english/analysis.jsp?analysis3">Viewing<br /> Aging Status</a></li>
						<li><a href="/jsp/english/analysis.jsp?analysis4">Surname Distribution</a></li>
						<li><a href="/jsp/english/analysis.jsp?analysis5">Change Of<br />Province</a></li>
					</ul>
				</dd>
			</dl>
			
			<div class="sideContents">
				<div class="sideBanner">
					<ul class="sbList">					
						<li><img src="/jsp/english/img/sgis.png"></img></li>
					</ul>
				</div>
				
				<div class="sideGuide">
					<h3 title="SGIS+ Introduce"><a href="/jsp/english/sopIntro.jsp">Introduction to SGIS</a></h3>
					<ul>
						<li><a href="/jsp/english/sopIntro.jsp">About SGIS</a></li>
						<li><a href="/jsp/english/faq.jsp">FAQ</a></li>
					</ul>
				</div>
			</div> 
	    </div> 
	</div>
</body>
</html>
