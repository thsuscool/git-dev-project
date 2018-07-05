<%
/**************************************************************************************************************************
* Program Name  : 통계주제도 목록 JSP  
* File Name     : categoryList.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-04
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
        <script type="text/javascript"  src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
        <script type="text/javascript" src="/js/common/includeHead.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/tm.css" />
        <link href="/css/default.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        <script type="text/javascript" src="/js/common/common.js"></script>
        <script type="text/javascript" src="/js/thematicMap/thematicMap_api.js"></script>
        <script type="text/javascript" src="/js/thematicMap/categoryList.js"></script>
<!--    <script type="text/javascript" src="/js/thematicMap/thematicSearch01.js"></script> -->
        <script src="/js/plugins/ui.js"></script>
        <!--[if lt IE 9]><script src="/js/plugins/libs/html5shiv.js"></script><![endif]-->
        <!--[if lt IE 9]><script src="/js/plugins/libs/respond.js"></script><![endif]-->
        <script src="/js/plugins/common.js"></script>
        <script src="/js/board/jquery.paging.js"></script>
        <title>통계주제도 | 통계지리정보서비스</title>
    </head>
    <body>
        <div id="wrap">
            <!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
		
            <div id="container" style="padding-bottom: 50px;">
            	<p class="path">
                    <a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
                    <a href="/view/thematicMap/categoryList"><span class="path_el current">통계주제도</span></a>
                </p>
<!--                 <p class="path"> -->
<!--                     <a href="/view/thematicMap/categoryList"><span class="path_el current">통계주제도</span></a> -->
<!--                     <a href="/view/index"><span class="path_el path_home">처음페이지</span></a> -->
<!--                 </p> -->
                <h2 class="ctit">통계주제도</h2>
                <div class="smr">
                    국민 행복통계와 관련하여 주요주제에 따른 관심사별 통계정보를 손쉽게 확인할 수 있습니다.
                </div>
                <div id="contents">
                    <div id="content">
                    	<!-- 게시물 검색// -->
                    	<div id="article-wrap">
	                        <div class="article-search">
	                            <div class="searchDiv">
	                                <fieldset>
	                                    <legend class="blind">
	                                        게시물 검색
	                                    </legend>                                        
	                                    <div class="f-el f-el-select">
	                                        <span class="el-h blind"> <label for="atc-sel2">항목</label> </span>
<!-- 	                                            <span class="el-b"> -->
<!-- 	                                                <select class="selectbox" id="atc-sel2">                                                     -->
<!-- 	                                                    <option value="">항목</option> -->
<!-- 	                                                    <option value="STATE">현황</option> -->
<!-- 	                                                    <option value="ANALYS">분석</option> -->
<!-- 	                                                </select> </span> -->
	                                    </div>
	                                    <div class="f-el">
	                                        <span class="el-h"> <label for="atc-kwd"></label> </span>
	                                        <span class="el-b">
	                                            <input type="text" id="atc-kwd" value="검색어 입력" title="검색어 입력" onfocus="this.value=''" style="padding-left: 7px;"/>
	                                        </span>
	                                    </div>
	                                </fieldset>
	                                <div class="sbm">
	                                    <input type="submit" value="검색" id="themeSearchBtn"/>
	                                </div>
	                            </div>
	                        </div>
                        </div>
                        <div class="analysis-main">
<!--                             <ul class="analysis"> -->
<!--                                 <li class="life"> -->
<!--                                     <div class="category"> -->
<!--                                         <h4>인구와 주거</h4> -->
<!--                                         <p class="en-tit"> -->
<!--                                             Population &amp; Housing -->
<!--                                         </p> -->
<!--                                         <p class="summary"> -->
<!--                                            인구 및 가구구성의 변화, 주택 및 주거환경 관련 -->
<!--                                             <br /> -->
<!--                                             이슈들을 주제로 한 통계지도 -->
<!--                                         </p> -->
<!--                                         <a href="#" class="more"><img src="/img/tm/btn_more.png" alt="더보기" /></a> -->
<!--                                     </div> -->
<!--                                     <div class="section"> -->
<!--                                     	<div id="lifeList"></div> -->
<!-- 			                            <div id="life_lists_paging" class="pagenation1" align="center" style="width: 100%;height:30px;"> -->
<!-- 	                                        <span class="pages"> <a href="" class="page">1</a></span> -->
<!-- 	                                    </div> -->
<!--                                     </div> -->
<!--                                 </li> -->
<!--                                 <li class="health"> -->
<!--                                     <div class="category"> -->
<!--                                         <h4>복지와 문화</h4> -->
<!--                                         <p class="en-tit"> -->
<!--                                             Welfare &amp; Culture -->
<!--                                         </p> -->
<!--                                         <p class="summary"> -->
<!--                                             국민복지와 문화 및 일상 여가활동에 대한 -->
<!--                                             <br /> -->
<!--                                             이슈들을 주제로 한 통계지도 -->
<!--                                         </p> -->
<!--                                         <a href="#" class="more"><img src="/img/tm/btn_more.png" alt="더보기" /></a> -->
<!--                                     </div> -->
<!--                                     <div class="section"> -->
<!--                                     	<div id="healthList"></div> -->
<!-- 			                            <div id="health_lists_paging" class="pagenation2" align="center" style="width: 100%;height:30px;"> -->
<!-- 	                                        <span class="pages"> <a href="" class="page">1</a></span> -->
<!-- 	                                    </div> -->
<!--                                     </div> -->
<!--                                 </li> -->
<!--                                 <li class="culture"> -->
<!--                                     <div class="category"> -->
<!--                                         <h4>일과 산업</h4> -->
<!--                                         <p class="en-tit"> -->
<!--                                             Work &amp; Industry -->
<!--                                         </p> -->
<!--                                         <p class="summary"> -->
<!--                                             우리사회의 노동과 산업의 변화를 파악할 수 있는 -->
<!--                                             <br /> -->
<!--                                             이슈들을 주제로한 통계지도 -->
<!--                                         </p> -->
<!--                                         <a href="#" class="more"><img src="/img/tm/btn_more.png" alt="더보기" /></a> -->
<!--                                     </div> -->
<!--                                     <div class="section"> -->
<!--                                     	<div id="cultureList"></div> -->
<!-- 			                            <div id="culture_lists_paging" class="pagenation3" align="center" style="width: 100%;height:30px;"> -->
<!-- 	                                        <span class="pages"> <a href="" class="page">1</a></span> -->
<!-- 	                                    </div> -->
<!--                                     </div> -->
<!--                                 </li> -->
<!--                                 <li class="environment"> -->
<!--                                     <div class="category"> -->
<!--                                         <h4>환경과 안전</h4> -->
<!--                                         <p class="en-tit"> -->
<!--                                             Environment &amp; Safety -->
<!--                                         </p> -->
<!--                                         <p class="summary"> -->
<!--                                             환경과 에너지, 재해와 사과 관련 -->
<!--                                             <br /> -->
<!--                                             이슈들을 주제로 한 통계지도 -->
<!--                                         </p> -->
<!--                                         <a href="#" class="more"><img src="/img/tm/btn_more.png" alt="더보기" /></a> -->
<!--                                     </div> -->
<!--                                     <div class="section"> -->
<!--                                     	<div id="saftyList"></div> -->
<!-- 			                            <div id="environment_lists_paging" class="pagenation4" align="center" style="width: 100%;height:30px;"> -->
<!-- 	                                        <span class="pages"> <a href="" class="page">1</a></span> -->
<!-- 	                                    </div> -->
<!--                                     </div>  -->
<!--                                 </li> -->
<!--                             </ul> -->
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