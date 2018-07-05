<%
/**************************************************************************************************************************
* Program Name  : 설명과 공지 상세화면 JSP  
* File Name     : qnaAndRequest.jsp
* Comment       : 
* History       : 네이버시스템 이동형 2015-10-27
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

        <title>설명과 공지 | 통계지리정보서비스</title>

        <link href="/css/default.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript" src="/js/common/includeHead.js"></script>
        <script src="/js/common/common.js"></script>
        <script src="/js/common/board.js"></script>
        <script src="/js/board/expAndNotice.js"></script>
        <script src="/js/board/statsWord.js"></script>
        <script src="/js/board/jquery.paging.js"></script>
		<script src='/js/plugins/ckeditor/ckeditor.js'></script>
        <script src="/js/plugins/ui.js"></script>
        <script src="/js/plugins/common.js"></script>
        <script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
        <script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>

        <link rel="stylesheet" type="text/css" href="/css/common.css" />
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        <link rel="stylesheet" type="text/css" href="/css/nm.css" />
        
        <style type="text/css">
        	#offer_list{
        		border-collapse: collapse;
        	}
        	#offer_list th{
        		border: 1px solid black;
        	}
        	#offer_list td{
        		border: 1px solid black;
        	}
        </style>
        
        <script type="text/javascript">
			$(function() {
				
				$(".exp_list ul li").click(function() {
					var fl = $(this).attr("class");

					$(".exp_list ul li").removeClass("on");
					$(this).addClass("on");

					if(fl == "on") {
						$(".exp_list ul li").removeClass("on");
						$(".exp_list ul li").find(" > p ").slideUp();
					} else {
						$(".exp_list ul li").find(" > p ").slideUp();
						$(this).find(" > p ").slideDown();
					}
					// 			return false;
				});
			});

        </script>
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
                    <a href="/view/board/expAndNotice"><span class="path_el current">설명과 공지</span></a>
                </p>
                <h2 class="ctit">설명과 공지</h2>
                <p class="smr">
                    SGIS 플러스에서 사용하는 각종 용어와 공지사항을 볼 수 있습니다.
                </p>
                <div class="board_tabs">
                    <a id="board_tabs_notice" href="#" class="active">공지사항</a>
                    <a id="board_tabs_exp" href="#">통계용어 설명</a>
                    <a id="board_tabs_offer" href="#">SGIS 서비스 자료 제공시점 현황</a>
                </div>
                <div id="contents">
                    <div id="content_">
                        <!-- 게시판 전체 영역// -->
                        <div id="article-wrap">
                            <!-- 게시물 목록 // -->
                            <div class="tab_contents">
                            
                            	<div class="notice_list" style="display: block;">
                                    <h3 class="ptit">공지사항</h3>
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
                                                            <span class="el-h blind"> <label for="notice_search_select">검색항목</label> </span>
                                                            <span class="el-b select_box">
                                                                <select id="notice_search_select" class="easyui-combobox" data-options="editable:false" name="searchsel" style="width: 155px; cursor: pointer;">
                                                                    <option value="post_title">제목</option>
                                                                    <option value="post_content">내용</option>
                                                                    <option value="post_all" selected="selected">제목 + 내용</option>
                                                                </select> </span>
                                                        </div>
                                                        <div class="f-el">
                                                            <span class="el-h"> <label for="notice_search_title_text">검색어입력</label> </span>
                                                            <span class="el-b">
                                                                <input id="notice_search_title_text" class="easyui-textbox" type="text" name="search" style="width: 350px;"
                                                                data-options="required:true" title="검색어입력" /> <!-- 2017.12.27 [개발팀] 접근성시정조치 -->
                                                            </span>
                                                        </div>
                                                    </fieldset>
                                                    <div class="sbm">
                                                    	<label for="searchListBtn" style="display:none;">검색</label> <!-- 2017.12.27 [개발팀] 접근성조치 -->
                                                        <input id="searchListBtn" style="cursor: pointer;" type="button"
                                                        onclick="javascript:expAndNotice.searchNoticeLists();"
                                                        value="검색" title="검색" />
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- 2016.12.02 시큐어코딩 삭제  -->

                                            <div id="article-wrap_3">
                                                <div id="notice_list" class="exp_list" style="width: 100%;"></div>
                                            </div>

                                            <div id="board_lists_paging" class="pagenation1" style="width: 100%; padding-top: 20px;">
                                                <span class="pages"> <a href="" class="page">1</a></span>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- //게시물 목록 -->

                                </div>
                            
                            
                            
                                <div class="article-list" style="display: none;">
                                    <h3 class="ptit">통계용어 설명</h3>
                                    <div class="article-search2">
                                        <form action="#" method="POST">
                                            <fieldset style="margin-left: 165px;">
                                                <legend class="blind">
                                                    게시물 검색
                                                </legend>
                                                <div class="f-el">
                                                    <span class="el-h"> <label for="statsWord_search_title_text">검색어
                                                            입력</label> </span><span class="el-b">
                                                        <input
                                                        id="statsWord_search_title_text" class="easyui-textbox"
                                                        type="text" name="search" style="width: 350px;"
                                                        data-options="required:true" title="검색어입력" /> <!-- 2017.12.27 [개발팀] 접근성시정조치 -->
                                                    </span>
                                                </div>
                                            </fieldset>
                                            <div class="sbm">
                                            	<!-- 2017.12.27 [개발팀] 접근성조치 -->
                                            	<label for="searchWordListBtn" style="display:none;">검색</label> 
                                                <input id="searchWordListBtn" style="cursor: pointer;" type="button" title="검색" onclick="javascript:statsWord.searchWordLists();" value="검색" />
                                            </div>
                                        </form>
                                    </div>

                                    <div id="article-wrap_4">
                                        <div id="statsWord_list" style="width: 100%;"></div>
                                    </div>

                                    <div id="board_lists_paging_1" class="pagenation" style="width: 100%; padding-top: 20px;">
                                        <span class="pages"> <a href="" class="page">1</a></span>
                                    </div>
                                </div>

                                <div id="offer_list" style="display:none;">
									<%@include file="/jsp/board/offerList.jsp" %>
								</div>
                                <!-- //게시판 전체 영역 -->

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 맨위로 버튼 -->
            <!-- <a id=topScrollTag href="javascript:window.scroll(0,0)" style="position: fixed; bottom:150px; display:none; border-radius: 5px; width: 50px; height: 50px;cursor: pointer;background-color: #8e787f; opacity: 0.4; filter: alpha(opacity=40);">
            	<img id="topScrollImg" src="/img/ico/arrowup.png" alt="맨위로 가기" >
            </a> -->

            <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
        </div>
    </body>
</html>