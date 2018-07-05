<!-- 
* 메인화면 HTML입니다.
* 
* history : 네이버시스템(주), 1.0, 2014/08/07  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
//-->
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 
<%
	String strType = "";
	try {
		strType = (String)request.getAttribute("type");
		if(strType == null || strType.length() < 1) {
			strType = "01";
		}
	} catch (IllegalArgumentException e) {
// 		System.out.println("############"+e);
	}
%>

<!DOCTYPE html>
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
  	    <script type="text/javascript" src="/js/thematicMap/thematicSearch01.js"></script>
        <script src="/js/plugins/ui.js"></script>
        <!--[if lt IE 9]><script src="/js/plugins/libs/html5shiv.js"></script><![endif]-->
        <!--[if lt IE 9]><script src="/js/plugins/libs/respond.js"></script><![endif]-->
        <script src="/js/plugins/common.js"></script>
        <script src="/js/board/jquery.paging.js"></script>
        <!-- *신규* --> 
		<link rel="stylesheet" type="text/css" href="/css/thematicSearch.css" />
  		<!-- *신규* --> 
        <title>통계주제도 | 통계지리정보서비스</title>
        
        <script>
			$(document).ready(
				function() {
					console.log("<%=strType%>");
					console.log($thematicSearch01);
					$thematicSearch01.ui.setThemaType("<%=strType%>");
				
			}); 
			//  mng_s 20171101_김건민 	
			function informationPopOpen(){
				if($("#notice_mini_pop").css("display") == "none") {
					$("#notice_mini_pop").show();
				} else {
					$("#notice_mini_pop").hide();
				}
			}
			
			function informationPopClose(){
				$("#notice_mini_pop").hide();
			}
			//  mng_e 20171101_김건민 
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

		<div class="containerBox">  
		
			<p class="thematicGuide">
			
					<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
                    <a href="/view/thematicMap/categoryList"><span class="path_el current">통계주제도</span></a>						
			</p>
			
			<div class="thematicSubTitle">
				<h3>통계주제도</h3>
				<p>통계와 관련하여 주요주제에 따른 관심사별 통계정보를 손쉽게 확인할 수 있습니다.</p><br>
				<!--  mng_s 20171101_김건민 -->
				<a onclick="informationPopOpen();" style="cursor:pointer; color:navy; font-weight:bold; font-size:14px; ">
				SGIS의 공간서비스 특성상 실제 공표된 값과 차이가 있을 수 있으므로 유의하시기 바랍니다.[더보기]</a>
				 <!-- mng_e 20171101_김건민 -->  
			</div>
			<div class="thematicForm">
				<input type="text" id="atc-kwd" value="검색어 입력" onfocus="this.value=''" style="padding-left: 7px;" title="검색어 입력" />
				<input type="submit" value="검색" id="themeSearchBtn"/>
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=2qtFwcUACu201512011358561668043Ge3mTM&theme=CTGR_001&mapType=03"><색상타입 테스트용></a> -->
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mMxsUm8SU82015111314280808431lM3yR4kr&theme=CTGR_003&mapType=04"><증감타입 테스트용></a> -->
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mMxsUm8SU82015111012280808431lM3yR4kr&theme=CTGR_001&mapType=05"><시계열형 테스트용></a> -->
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mMxsUm8SU82015111314234808431lM3yR4kr&theme=CTGR_004&mapType=06"><분할타입 테스트용></a> -->
			</div>			
			<div class="searchResultBox" id="searchResultBox">
			
			</div> <!--searchReslutBox 끝  -->				
			</div>		
			<!--  mng_s 20171101_김건민 -->		 
 			<div id="notice_mini_pop" class="popupWrapper" style="margin-left: 200px; margin-top: 120px; width:602px; height:375px; background: rgba(0,0,0,0); display:none;">
			<div>
				<img src="/img/new/sgis_use_notice_pop.png" alt='' usemap="#popupMap" style="border: 1px solid black" />
				<map name="popupMap">
					<area shape="rect" coords="565 0 601 36" onclick="informationPopClose();" alt="팝업닫기" >
				</map>
			</div>
 			</div> 
 			<!--  mng_e 20171101_김건민 -->

        <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
	</div>
</body>
</html>