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
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 

<%
	String strType = "";
	String paramObj = "";
	try {
		Map map = (Map)request.getAttribute("paramInfo");
		strType = (String)map.get("type");	
		if (strType != null) {
			if (strType.equals("bookmark") || strType.equals("sharedata")) {
					paramObj = (String)map.get("paramObj");
			}
		}
		
	} catch (Exception e) {
// 		System.out.println("############"+e);
	}
%>


<!DOCTYPE html>
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
<!--         <link href="/css/default.css" rel="stylesheet" type="text/css" /> -->
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        
		<!-- 추가 -->
		<link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 
   		<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  

        <script>
       		$(document).ready(
    			function() {	
    				//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
    				if ("<%=strType%>" == "bookmark" || "<%=strType%>" == "sharedata") {
    					var param = null;
        				var length = <%=paramObj.length()%>;
        				if (length == 0) {
        					param = "";
        				}else {
        					param = JSON.parse(<%=paramObj%>);
        				}
        				$thematicMapMain.ui.doAnalysisShareInfo("<%=strType%>", param);
    				}
    		});
        </script>
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
 			<iframe class="map_dummy" frameborder="0" src="" id="themeticFrame" title="themeticFrame" style="width: 100%; position: relative;"></iframe>
          
        </div>
        
        <!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
	    </footer>
    </body>
</html>