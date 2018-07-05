<%
/**************************************************************************************************************************
* Program Name  : 운영이력관리 목록화면 JSP  
* File Name     : reqBoardList.jsp
* Comment       : 
* History       : jrj 2018-02
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

        <title>운영이력관리 | 통계지리정보서비스</title>

        <link href="/css/default.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript" src="/js/common/includeHead.js"></script>
        <script src="/js/common/common.js"></script>
        <script src="/js/reqBoard/reqBoardList.js"></script>
        <script src="/js/board/statsWord.js"></script>
        <script src="/js/board/jquery.paging.js"></script>
        <script src="/js/plugins/ui.js"></script>
        <script src="/js/plugins/common.js"></script>
        <script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
        <script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>

        <link rel="stylesheet" type="text/css" href="/css/common.css" />
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        <link rel="stylesheet" type="text/css" href="/css/nm.css" />
        
        <style type="text/css">
        	table>th {
        		margin-top: 10px;
        	}
        </style>
        
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
                <h2 class="ctit">운영이력관리</h2>
                <div id="contents">
                    <div id="content_">
                        <!-- 게시판 전체 영역// -->
                        <div id="article-wrap">
                            <!-- 게시물 목록 // -->
                            <div class="tab_contents">
                            
                            	<div class="req_list" style="display: block;">
                                    <h3 class="ptit">운영이력관리</h3>
                                    <div id="content">
                                        <!-- 게시판 전체 영역// -->
                                        <div id="article-wrap_2">
                                            <!-- 게시물 검색// -->
                                            <div class="article-search2">
                                                <form action="#" method="POST">
                                                    <fieldset style="margin-left: 165px;">
                                                        <legend class="blind">
                                                            게시물 검색
                                                        </legend>
                                                        <div class="f-el f-el-select">
                                                            <span class="el-h blind"> <label for="req_search_select">검색항목</label> </span>
                                                            <span class="el-b select_box">
                                                                <select id="searchWordType" class="easyui-combobox" data-options="editable:false" name="searchsel" style="width: 155px; cursor: pointer;">
                                                                    <option value="REQ_TITLE">제목</option>
                                                                    <option value="REQ_CONTENT">내용</option>
                                                                    <option value="REQ_ALL" selected="selected">제목 + 내용</option>
                                                                </select> </span>
                                                        </div>
                                                        <div class="f-el">
                                                            <span class="el-h"> <label for="req_search_title_text">검색어입력</label> </span>
                                                            <span class="el-b">
                                                                <input id="searchWord" class="easyui-textbox" type="text" name="search" style="width: 350px;"/>
                                                            </span>
                                                        </div>
                                                    </fieldset>
                                                    <div class="sbm">
                                                        <input style="cursor: pointer; width:80px;" type="button"
                                                        onclick="javascript:$reqBoard.searchReqList();"
                                                        value="검색" />
                                                        <input style="cursor: pointer; width:80px;" type="button"
                                                        onclick="javascript:$reqBoard.autoReload();"
                                                        value="오토리로드" />
                                                        <input style="cursor: pointer; width:80px;" type="button"
                                                        onclick="javascript:$reqBoard.stopReload();"
                                                        value="정지" />
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- 2016.12.02 시큐어코딩 삭제  -->

                                            <div id="article-wrap_3">
                                                <div id="req_list" class="exp_list" style="width: 100%;"></div>
                                            </div>

                                            <div id="board_lists_paging" class="pagenation1" style="width: 100%; padding-top: 20px;">
                                                <span class="pages"> <a href="" class="page">1</a></span>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- //게시물 목록 -->

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