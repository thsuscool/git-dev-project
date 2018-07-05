<%
/**************************************************************************************************************************
* Program Name  : 상단 Header JSP  
* File Name     : includeSearch.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-09
*				: 웹 접근성 관련 tabindex 삭제 2016-12-08
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/js/plugins/jquery.placeholder.min.js"></script>
<script type="text/javascript" src="/js/common/includeSearch.js"></script>
<a class="skipNav" href="#container" tabindex="2">본문바로가기</a>
<div class="headerEtc">
<a id="engKor" href='/view/index' tabindex='3'>Korean</a>
</div>
<div class="headerContents">
	<h1><a href='/jsp/english/index.jsp' tabindex="10"><img src='/jsp/english/img/logoPlus.gif' alt='SGIS plus 통계지리정보서비스' title="통계지리정보 서비스 홈페이지 입니다"/></a></h1>
	<h2>주메뉴</h2>
	<ul id="gnb" class="gnb" style="font-size: 16px;font-weight: bold;">
		<li style="width: 110px;"><a id="themaList" href="/jsp/english/thematic.jsp">Thematic Maps</a></li>
		<li style="width: 220px;"><a id="interList" href="/jsp/english/interactive.jsp">Interactive Statistical Map</a></li>
		<li style="width: 110px;"><a id="serviceList" href="/jsp/english/application.jsp">Applications</a></li>
		<li style="width: 125px;"><a id="analList" href="/jsp/english/analysis.jsp">Map Analysis</a></li>
		<li style="width: 90px;"><a id="sopList" href="/jsp/english/sopIntro.jsp">About SGIS</a></li>
	</ul>
</div>