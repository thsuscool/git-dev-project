<%
	/**************************************************************************************************************************
	* Program Name  : 즐겨찾기리스트 JSP  
	* File Name     : bookMarkGallery.jsp
	* Comment       : 
	* History       : 네이버시스템 최재영 2016-08-26
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
	<META http-equiv="Expires" content="-1">
	<META http-equiv="Pragma" content="no-cache">
	<META http-equiv="Cache-Control" content="No-Cache">
	<title>메인 | 통계청SGIS 오픈플랫폼</title>

    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css'>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	<link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery.css" />
	
	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script> 
	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	<script type="text/javascript" src="/js/common/map.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.min.js"></script> 
    <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> 
    <script type="text/javascript" src="/js/plugins/slick.min.js"></script>
    <script src="/js/mypage/bookMark.js"></script>
	<script src="/js/gallery/bookMarkGallery.js"></script>
	
	
	
</head>

<body>   
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div class="containerBox">  
			<p class="mpGuide">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;>&nbsp;</span></a>
				<a href="/view/gallery/resultGallery"><span class="path_el">통계 갤러리&nbsp;>&nbsp;</span></a>
				<a href="/view/gallery/bookMarkGallery"><span class="path_el current">즐겨찾기</span></a>
			</p>
			
			<div class="mpSubTitle">
				<h3>마이 갤러리</h3>
				<p>즐겨찾기:즐겨찾기를 모아 갤러리를 생성할 수 있습니다. / 작성 갤러리:그동안 작성한 갤러리에 대해 볼 수 있습니다.
				/ 수집 갤러리:다른 사용자가 작성한 갤러리를 저장해 볼 수 있습니다.</p> 
			</div>
			
			<div class="myRgBox">
				<p id="memberNmTxt"></p>
				<div class="nun" id="statsCount">
<!-- //TODO	즐겨찾기, 작성갤러리, 수집 갤러리 - 카운트 쿼리 추가 -->
					<span id="bookMarkCount"></span> <!-- 2017.03.28 초기화설정 -->
					<span id="writeGalleryCount"></span> <!-- 2017.03.28 초기화설정 -->
					<span id="collectGalleryCount"></span> <!-- 2017.03.28 초기화설정 -->
					<span id="tempCount"></span>
				</div>
			</div>
			<div class="mrgTabsList">
<!-- //TODO	링크연결 -->
				<a href="/view/gallery/bookMarkGallery" class="on">즐겨찾기</a>
				<a href="/view/gallery/collectionGallery">작성 갤러리</a>
				<a href="/view/gallery/myGallery">수집 갤러리</a>
			</div>
			<div class="btnbox ar"> 
				<div class="leftEtc">
<!-- //TODO	임시저장, 수집 갤러리, 추천 수 - 카운트 쿼리 추가(추천수-전체갤러리 추천수?) -->
					<span><!-- 임시저장 중1 --></span>
					<span id="nowCount"></span> <!-- 2017.03.28 초기화설정 -->
				</div> 
				<a onclick="javascript:$bookMarkGallery.selectGalleryYn('Y');" id="selectBtn" class="btnGtype">선택</a>
				<!-- 2017. 02. 28 개발팀 수정요청 -->
				<a onclick="javascript:$bookMarkGallery.addGallery();" id="deleteBtn" class="btnGtype" style="display:none;">등록</a>
				<a onclick="javascript:$bookMarkGallery.selectGalleryYn('N');" id="cancelBtn" class="btnGtype" style="display:none;">취소</a>
			</div>
			
			<ul class="writeGalleryListItem">
			</ul>

			<div id="gallery_lists_paging" class="pagenation" align="center" style="width: 100%; margin-bottom:50px;">
				<span class="paging"></span>
			</div>		
				 
		</div>   
		
		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>
	
	<div id="dialogDiv" style="display:none;">
		<jsp:include page="/view/gallery/insertGallaryDialog"></jsp:include>
	</div>
	
</body>
</html>