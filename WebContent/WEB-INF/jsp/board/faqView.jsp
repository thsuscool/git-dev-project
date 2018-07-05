<%
/**************************************************************************************************************************
* Program Name  : 질문과 개선요청 JSP  
* File Name     : expAndNotice.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	
	<title>질문과 개선요청 | 통계지리정보서비스</title>
	
	<link href="/css/default.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script src="/js/common/common.js"></script>
	<!-- <script src="/js/common/board.js"></script> -->
	<!-- <script src="/js/board/themaAndRequest.js"></script>
	<script src="/js/board/qnaAndRequest.js"></script> -->
	<script src="/js/board/faqView.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	
	<script src="/js/board/holder.js"></script>
	
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script src='/js/plugins/ckeditor/ckeditor.js'></script>
<!-- 	<script type="text/javascript" src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script> -->
	<script type="text/javascript" src='/js/plugins/google_recaptcha.js'></script>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />
</head>
<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div id="container">
			<p class="path">
                   <a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
                   <a href="/view/board/sopBoardMain"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a>
                   <a href="/view/board/qnaAndRequest"><span class="path_el">질문과 개선요청&nbsp;&nbsp;>&nbsp;</span></a>
                   <a href="/view/board/qnaAndRequest"><span class="path_el current">상세</span></a>
			</p>
			<h2 class="ctit">질문과 개선요청</h2>
			<!-- mng_s 20170918_김건민 -->
			<p class="smr">SGIS플러스에 대해 궁금한 사항이나 요청사항에 대한 글을 올려 주세요</p>
			<!-- mng_e 20170918_김건민 -->
			<!-- <div class="board_tabs1">
				<a id="board_tabs_faq" class="active" style="cursor: pointer;">FAQ</a>
				<a id="board_tabs_qna" style="cursor: pointer;">Q&A</a>
				<a id="board_tabs_thema" style="cursor: pointer;">통계주제도 요청</a>
			</div> -->
			<div id="contents">
				<div id="content">
					<!-- 게시판 전체 영역// -->
					<div id="article-wrap">
						<!-- 게시물 목록 // -->
						<div class="tab_contents">
							<div class="faq_list">
								<h3 class="ptit">상세</h3>
								
								<div id="article-wrap">
									<div id="faq_list_div">
										<div id="faq_list" class="faq_list" style="width: 100%;">
										</div>
									</div>
								</div>
								
								<!-- <div id="faq_lists_paging" class="pagenation" align="center" style="width: 100%;">
									<span class="pages"> <a href="" class="page">1</a></span>
								</div> -->
							</div>
	
							
	
						</div>
						<!-- //게시물 목록 -->
	
					</div>
					<!-- //게시판 전체 영역 -->
					<!-- 맨위로 버튼 -->
					<a id=topScrollTag href="javascript:window.scroll(0,0)" style="position: fixed; bottom:220; display:none; border-radius: 5px; width: 50px; height: 50px;cursor: pointer;background-color: #8e787f; opacity: 0.4; filter: alpha(opacity=40);">
                   		<img id="topScrollImg" src="/img/ico/arrowup.png" alt="통계청 바로가기" >
                    </a>
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