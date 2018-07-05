<%
/**************************************************************************************************************************
* Program Name  : 언론소개자료 JSP  
* File Name     : mediaIntroView.jsp
* Comment       : 
* History       : 네이버시스템 이경현 2016-10-11
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

        <title>언론소개자료 | 통계지리정보서비스</title>

        <link href="/css/default.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript" src="/js/common/includeHead.js"></script>
        <script src="/js/common/common.js"></script>
        <script src="/js/board/mediaIntroView.js"></script>
        <!-- <script src="/js/common/board.js"></script>
        <script src="/js/board/expAndNotice.js"></script>
        <script src="/js/board/statsWord.js"></script>
        <script src="/js/communityBoard/communityNotice.js"></script> -->
        
        <script src="/js/board/jquery.paging.js"></script>
		<script src='/js/plugins/ckeditor/ckeditor.js'></script>
        <script src="/js/plugins/ui.js"></script>
        <script src="/js/plugins/common.js"></script>
        <script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
        <script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>

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
                    <!-- 
                    <a href="/view/board/sopBoardMain"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a>
                     -->
                    <a href="/view/board/expAndNotice"><span class="path_el">언론소개자료&nbsp;&nbsp;>&nbsp;</span></a>
                    <a href="/view/board/expAndNotice"><span class="path_el current">상세</span></a>                    
                </p>
                <h2 class="ctit">언론소개자료</h2>
                <p class="smr">
                    SGIS 플러스 에서 사용하는 언론소개자료를 볼 수 있습니다.
                </p>
                <!-- <div class="board_tabs">
                    <a id="board_tabs_notice" href="#" class="active">공지사항</a><a id="board_tabs_exp" href="#">통계용어 설명</a>
                </div> -->
                <div id="contents">
                    <div id="content">
                        <!-- 게시판 전체 영역// -->
                        <div id="article-wrap">
                            <!-- 게시물 목록 // -->
                            <div class="tab_contents">
                            
                            <div class="notice_list" style="display: block;">
                                    <h3 class="ptit">상세</h3>
                                    <div id="content">
                                        <!-- 게시판 전체 영역// -->
                                        <div id="article-wrap">
                                            <div id="article-wrap">
                                                <div id="notice_list" class="exp_list" style="width: 100%;"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- //게시물 목록 -->

                                </div>
                            
                            
                            
                                <div class="article-list" style="display: none;">
                                    <h3 class="ptit">통계용어 설명</h3>
                                    <div class="article-search2">
                                    	<!-- 	//2015-12-03 시큐어코딩 -->
                                        <form action="#" method="POST">
                                            <fieldset style="margin-left: 165px;">
                                                <legend class="blind">
                                                    게시물 검색
                                                </legend>
                                                <div class="f-el">
                                                    <span class="el-h"> <label for="atc-kwd">검색어
                                                            입력</label> </span><span class="el-b">
                                                        <input
                                                        id="statsWord_search_title_text" class="easyui-textbox"
                                                        type="text" name="search" style="width: 350px;"
                                                        data-options="required:true" />
                                                    </span>
                                                </div>
                                            </fieldset>
                                            <div class="sbm">
                                                <input style="cursor: pointer;" type="button" onclick="javascript:statsWord.searchWordLists();" value="검색" />
                                            </div>
                                        </form>
                                    </div>

                                    <div id="article-wrap">
                                        <div id="statsWord_list" style="width: 100%;"></div>
                                    </div>

                                    <div id="board_lists_paging" class="pagenation" align="center" style="width: 100%; padding-top: 50px;">
                                        <span class="pages"> <a href="" class="page">1</a></span>
                                    </div>
                                </div>

                                
                                <!-- //게시판 전체 영역 -->

                            </div>
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