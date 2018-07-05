<%
/**************************************************************************************************************************
* Program Name  : 통계주제도 상세 메인 화면 JSP  
* File Name     : thematicMapMain.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-04
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
        <title>통계주제도 | 통계지리정보서비스</title>

	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">

        <script type="text/javascript"  src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
        <script type="text/javascript"  src="/js/common/includeHead.js"></script>
        <script type="text/javascript"  src="/js/plugins/libs/jquery-ui.js"></script>
        <script type="text/javascript"  src="/js/common/common.js"></script>
        <script type="text/javascript"  src="/js/thematicMap/old/thematicMap_api.js"></script>
        <script type="text/javascript"  src="/js/thematicMap/old/thematicMapMain.js"></script>
        <script type="text/javascript" src="/js/common/mapNavigation.js"></script>
<!--         <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script> -->
        
        <link rel="stylesheet"  href="/css/im.css" />
        <link rel="stylesheet"  href="/css/cupertino/jquery-ui-1.10.4.custom.css">
        <link rel="stylesheet" type="text/css" href="/css/tm.css" />
<!--         <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" />  -->
		<link rel="stylesheet" type="text/css" href="/css/layout.css" />

        <style>
        </style>
    </head>
    <body>
    <input type="hidden" name="stat_thema_map_id" id="stat_thema_map_id"/>
	<input type="hidden" name="theme" id="theme"/>
	<input type="hidden" name="mapType" id="mapType"/>
        <div class="wrap">
            <!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>

            <!-- body -->
            <div class="containerFull" style="min-width:1260px;overflow:hidden;">
                <div id="map_area">
                    <div class="area_cont" style="margin-left: 0;">
                        <!-- ( map_dummy ) -->
                        <iframe class="map_dummy" frameborder="0" src="" id="themeticFrame" title="themeticFrame" style="width: 100%; position: relative; padding-top: 45px">
                        </iframe>
                        <!-- //( map_dummy ) -->

                        <!-- ( map_remark ) -->
                        <div class="map_remark">
                            <div class="map_location" style="width: 100%; margin-top:-5px;">
	                            <div style="width: 50%; float: left;">
	                            	<a href="javascript:void(0)" class="sideQuick sq02" style="top:13px;">
							    		<span style="color:#ffffff;">주제도 목록</span>
							    		<img src="/img/ico/ico_totalmenu.gif" alt="전체메뉴" style="margin-top:3px;"/>
							    	</a>
		                            <div class="map_area_category2" id="thematicTitle" style="display: inline-block;margin-left:90px;"></div>
		                            <a class="themeTooltip" href="javascript:void(0)" data-subj="주제도 설명" title=""><img src="/img/ico/ico_i.gif" alt="주제도 설명" style="margin-left:-10px;margin-top:-3px;""/></a>
		                            <div id="mapNavi_2" style="float: right;margin-top:5px; padding-right: 20px;"></div>
								</div>
								<div id="mapNavi_1" style="float: right;margin-top:5px; padding-right: 20px;"></div>
                            </div>
                        </div>
                        <!-- //( map_remark ) -->
                    </div>
                </div>
                
               	<!-- left menu --> 
	    		<div class="leftArea">
					<div class="shadow"></div>
					<div class="quickBox step01"><!-- 주제별 목록보기 start -->
						<div class="subj">
							<span>주제별 목록보기</span>
							<a href="javascript:void(0)" class="stepClose">닫기</a>
						</div> 
						<div class="scrollBox" style="height:calc(100% - 125px);">							
							<dl class="qmdl"> 
								<dd>
									<ul class="qmIcon04">										
									</ul>
								</dd>
							</dl> 
							 
							<ul class="qmlist botn">
	                            <li><a href="${pageContext.request.contextPath}/view/newhelp/su_help_10_0" target="_top">도움말 보기</a></li> 
	                        </ul> 
						</div> 
						<div class="btnBottom">
	                        <span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
	                    </div>
						
						
					</div><!-- 주제별 목로보기 end -->
					
					<div class="quickBox step02" style="width:360px;left:-360px;"><!-- 인구와 주거 주제도 목록 start -->
						<div class="subj">
							<span id="subj_list">인구와 주거 주제도 목록</span>
							<a href="javascript:void(0)" class="stepClose">닫기</a>
						</div>
						<div class="scrollBox" id="scrollBox" style="width:350px;">
							<div class="totalResult tr01"><!-- Intro) 주요시도별 생활업종 보기 -->
								<div class="stepBox"> 
								    <ul id="stepBoxUl" style="width:340px;">
								    </ul>
								</div> 
							</div>
							
							<div class="totalResult tr02"><!-- 복지와문화  -->
                            	<div class="stepBox">복지와문화</div>   
							</div>
							<div class="totalResult tr03"><!-- 일과산업  -->
                            	<div class="stepBox">일과산업</div>   
							</div>
							<div class="totalResult tr04"><!-- 환경과안전  -->
                            	<div class="stepBox">환경과안전</div>   
							</div>
						</div>
					</div>
					<div id="thematicOrigin" style="display:none;"></div>
				</div>
            </div>
        </div>
        <!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
	    </footer>
    </body>
</html>