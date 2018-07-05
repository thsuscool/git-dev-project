
<%
	/**************************************************************************************************************************
	* Program Name  : 북마크 리스트 JSP  
	* File Name     : bookMarkList.jsp
	* Comment       : 
	* History       : 네이버시스템 권차욱 2015-11-16
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>나의 소통지도 | 통계청SGIS 오픈플랫폼</title>

<link href="/css/default.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/js/plugins/jquery-easyui-1.4/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link rel="stylesheet" type="text/css" href="/css/mypage/mypage.css" />
<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<script src="/js/plugins/ui.js"></script>
<script src="/js/board/jquery.paging.js"></script>
<script src="/js/common/common.js"></script>
<script src="/js/mypage/community.js"></script>
</head>

<body>
	<div id="wrap">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		<div id="container">
			<p class="path">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/mypage/mypage"><span class="path_el">마이페이지 &nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/mypage/community"><span class="path_el current">나의 소통지도</span></a>
			</p>
			<div class="containerBox">
				<div class="mpSubTitle">
					<h3>나의 통계 목록</h3>
					<p>지역현안 소통지도에서 개설 및 참여중인 소통지도를 확인할 수 있습니다.</p>
				</div>
				<div class="mpForm"></div>
				<div class="searchReslutBox">
					<div class="fc">
						<ul class="mpSearchList"></ul>
					</div>
				</div>
				<div id="article-wrap">
					<div id="mypage_lists_paging" class="pagenation" align="center" style="width: 100%;margin-top:20px;">
						<span class="pages"><a href="" class="page">1</a></span>
					</div>
				</div>													
			</div>
		</div>
		   	<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>		
	</div>

</body>
</html>