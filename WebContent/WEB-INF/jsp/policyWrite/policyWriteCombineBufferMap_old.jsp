<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 JSP  
* File Name     : interactiveMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 


<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <title>정책통계지도 | 통계지리정보서비스</title>
	    
	    <link rel="stylesheet" type="text/css" href="/css/um.css" />
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link rel='shortcut icon' href='/img/ico/n_favicon.png'/> 
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/policyWrite/interactiveFunc.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/policyWrite/cont_policy.css">
	    
	    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts-more.js"></script>
		<script type="text/javascript" src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script type="text/javascript" src="/js/plugins/btoa.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highchart.drag.js"></script>
	    
		<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>
	    
		<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
		<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
		<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script type="text/javascript" src="/js/common/map.js"></script>
	    <script type="text/javascript" src="/js/common/common.js"></script>
	    <script type="text/javascript" src="/js/common/mapNavigation.js"></script>
	    
	    <script>var policyTarget = "$interactiveMap";</script>
	    <script type="text/javascript" src="/js/policyWrite/policyWriteMapCombine.js"></script>
	    <script type="text/javascript" src="/js/policyWrite/combine.js"></script>
	    
        
        <script type="text/javascript" src="/js/board/jquery.paging.js"></script>
        <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
        <!--[If IE 9]>    
			<script type="text/javascript" src="/js/common/classList.js"></script>
		<![endif]-->
		
		<style type="text/css">
		.colorSettingLayer{left:410px;}
		.guganSettingLayer{left:410px;}
		</style>
	</head>
	<body>  
		<div id="wrap">
			<div class="containerBox">
				<div class="FuseResult_layer M_on">
					<div class="FuseResult">
						<div id="policy-popup-header" style="border-bottom:#036 solid 1px;">
							<h3 id="combineTitle"><span>버퍼 분석 데이터</span></h3>
							<button id="closePopup" class="btn_close" type="button">창닫기</button>
						</div>
						<div class="FR_MapArea" id="mapRgn"></div>
						<div id="step1" class="FR_Data">
							<ul class="Tab">
								<li id="0" style="display:none;"><a href="javascript:void(0);">정보</a></li>
								<li class="M_on" id="1"><a href="javascript:void(0);">기준 데이터</a></li>
								<li id="2"><a href="javascript:void(0);">추가 데이터</a></li>
							</ul>
							<div class="DataBox FR_single" style="width:100%">
								<div class="FR_Basic">
									<ul>
										<li id="openerMenu"><span>주요지표</span></li>
										<li id="openerSidoSgg"><span>대상지역</span></li>
										<li id="openerorigin"><span>출처</span></li>
									</ul>
								</div>
								<div class="DataBoxScroll" style="height:350px;">
									<div class="Chart" id="targetCharts" style="width:355px;"></div><!-- 차트 -->
								</div>
							</div>
							<div class="DataBox FR_fuse" style="display:none; width:100%;">
								<div class="FR_Basic">
									<ul>
										<li id="openerPoi"><span>시설종류</span>안산시청 아동보육시설</li>
									</ul>
								</div>
								<div class="DataBoxScroll" style="height:350px;">
									<div class="Chart" id="targetGrid" style="width:340px;"></div><!-- Grid -->
								</div>
							</div>
							<jsp:include page="/view/map/policyWriteCombineInfo"/>
							<div class="Btn_Group">
								<button id="btn-write" type="button">정책지도 바로 작성</button>
							</div>
						</div>
						<jsp:include page="/view/map/policyWriteCombineStep2"/>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>