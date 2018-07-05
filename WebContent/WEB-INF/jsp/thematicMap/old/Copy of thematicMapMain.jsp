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
<!DOCTYPE>
<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>통계주제도 | 통계지리정보서비스</title>

        <link href="/css/default.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />

        <script type="text/javascript"  src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
        <script type="text/javascript"  src="/js/common/includeHead.js"></script>
        <script type="text/javascript" src="/js/plugins/libs/jquery-ui.js"></script>
        <script type="text/javascript"  src="/js/common/common.js"></script>
        <script type="text/javascript"  src="/js/thematicMap/thematicMap_api.js"></script>
        <script type="text/javascript"  src="/js/thematicMap/thematicMapMain.js"></script>
        <script type="text/javascript" src="/js/common/mapNavigation.js"></script>
<!--         <script type="text/javascript" src="/js/thematicMap/mapNavigation2.js"></script> -->
        <link rel="stylesheet"  href="/css/im.css" />
        <link rel="stylesheet"  href="/css/cupertino/jquery-ui-1.10.4.custom.css">
        <link rel="stylesheet" type="text/css" href="/css/tm.css" />
        <link href="/css/default.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
		<!-- 추가 -->
		<link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 

        <style>
        </style>
    </head>
    <body>
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
                        <iframe class="map_dummy" frameborder="0" src="" id="themeticFrame"></iframe>
<!--                         <iframe class="map_dummy" frameborder="0" style="width:100%; height:743px;" src="" id="themeticFrame"></iframe> -->
                        <!-- //( map_dummy ) -->

                        <!-- ( map_remark ) -->
                        <a href="javascript:void(0)" class="sideQuick sq02" id="map_left_btn">
			    		<span>메뉴</span>
			    		<img src="/img/ico/ico_totalmenu.gif" alt="통계메뉴" />
			    		</a>
                        
                        <div class="map_remark">
                            <div class="map_location" style="width: 100%; margin-top:-5px;">
	                            <div style="width: 50%; float: left;">
	                                <em class="map_location_tit" id="theaticMainTitlediv" style="margin-bottom:5x;">통계주제도 > 생활과경제 &nbsp; </a></em>
	                                <ul id="menu" style="display:none;">
	                                    <li id='life'>
	                                        <p>
	                                           <img src="/img/tm/bg_tm1.png" class="theme_img">
	                                           인구와 주거
	                                        </p>
	                                        <ul></ul>
	                                    </li>
	                                    <li id='health'>
	                                        <p>
	                                            <img src="/img/tm/bg_tm2.png" class="theme_img">
	                                            복지와 문화
	                                        </p>
	                                        <ul></ul>
	                                    </li>
	                                    <li id='culture'>
	                                        <p>
	                                            <img src="/img/tm/bg_tm3.png" class="theme_img">
	                                            일과 산업&nbsp;&nbsp;&nbsp;
	                                        </p>
	                                        <ul ></ul>
	                                    </li>
	                                    <li id='environment'>
	                                        <p>
	                                            <img src="/img/tm/bg_tm4.png" class="theme_img">
	                                            환경과 안전
	                                        </p>
	                                        <ul ></ul>
	                                    </li>
	                                </ul>
<!--                                 <span id="mapNavi1"> <a id="contrySelect_1" style="display:none;"  >전국</a><span style="display:none;"> > </span> <select id="sidoSelect_1" style="border: 0px;background-color: transparent;padding-bottom: 6px;"></select><span> > </span> <select id="sggSelect_1" style="border: 0px;background-color: transparent;padding-bottom: 6px;"></select><span> > </span> -->
<!--                                     <select id="admSelect_1" style="border: 0px;background-color: transparent;padding-bottom: 6px;"> -->
<!--                                         <option value="">동/읍면 선택</option> -->
<!--                                     </select> </span> -->
<!--                                 <span style="display:none" id="mapNavi2" > <a id="contrySelect_2" style="display:none;">전국</a><span style="display:none;"> > </span> <select id="sidoSelect_2" style="border: 0px;background-color: transparent;padding-bottom: 6px;"></select><span> > </span> <select id="sggSelect_2" style="border: 0px;background-color: transparent;padding-bottom: 6px;"></select><span> > </span> -->
<!--                                     <select id="admSelect_2" style="border: 0px;background-color: transparent;padding-bottom: 6px;"> -->
<!--                                         <option value="">동/읍면 선택</option> -->
<!--                                     </select> </span> -->
<!-- 									<div id="mapNavi_1" style="display: inline-block;"></div> -->
		                            	<div class="map_area_category2" id="thematicTitle" style="display: inline-block;"></div>
		                            	<div id="mapNavi_2" style="float: right;margin-top:5px;"></div>
								</div>
								<div id="mapNavi_1" style="float: right;margin-top:5px;"></div>
<!-- 								<div style="width: 50%; float: right;"> -->
<!-- 									<div id="mapNavi_2" style="display: inline-block;"></div> -->
<!-- 	                            	<div class="map_area_category2" id="thematicTitle" style="float:right;"></div> -->
<!--                             	</div> -->
							
                            

<!--                                 2010 인구 대비 브랜드치킨집 운영현황 &nbsp; -->

<!--                                 <a href="#" class="btn_map_sel"><img src="/img/im/btn_arrtipb.gif" alt="" /></a> &nbsp; <a href="#" class="btn_analysis">분석</a> -->

                                <!-- ( layer ) -->
                                <!--                                 <div class="analysis_layer" > -->
                                <!--                                     <div class="analysisbox" id="thematicDescription"> -->
                                <!--                                         해당 주제도는 2010년 인구주택총조사 및 사업체조사를 기준으로 -->
                                <!--                                         인구 100명당 치킨집에 대한 지역별 현황에 대해 확인할 수 있습니다. -->
                                <!--                                         지도를 최대로 확대하면 해당 지역의 치킨집 분포 현황을 확인할 수 -->
                                <!--                                         있습니다. -->
                                <!--                                     </div> -->
                                <!--                                     <span><img src="/img/im/tip_arrtop.png" alt="" /></span> -->
                                <!--                                 </div> -->
                                <!-- //( layer ) -->

                            </div>
                        </div>
                        <!-- //( map_remark ) -->

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