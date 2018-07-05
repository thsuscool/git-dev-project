<%
/**************************************************************************************************************************
* Program Name  : 대화형통계지도 범례결합창 JSP  
* File Name     : interactiveCombineMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-10-20
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
		 <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" type="text/css" href="/css/handsontable.css">
	    <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 
	    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script type="text/javascript" src="/js/plugins/handsontable.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts.js"></script>
	    <!-- 2016.09.07 9월 서비스 -->
	    <script type="text/javascript" src="/js/plugins/highcharts/highcharts-more.js"></script>
	    <script type="text/javascript" src="/js/plugins/highcharts/highchart.drag.js"></script>
		
		<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
		<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
		<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script type="text/javascript" src="/js/common/map.js"></script>
	    <script type="text/javascript" src="/js/common/common.js"></script>
	    <script type="text/javascript" src="/js/common/mapNavigation.js"></script>
	    <script type="text/javascript" src="/js/interactive/interactiveMapBtn.js"></script>
        <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
        <script type="text/javascript" src="/js/interactive/interactiveCombineMap.js"></script>
</head>
<body class="pop">
	<div class="popViewer databoard">   
		<h1 style="margin-top:2px;"><img src="/img/common/logo.gif" style="width:75px;height:25px;" /></h1>
		<div class="containerBox" style="top:30px;height:calc(100%);">
			<div class="rela">
				<div class="sceneBox on">
					<div class="sceneRela">
						<div class="interactiveBar">
							<!-- 네비게이터 -->
							<div id="mapNavi"></div>
							<!-- map topbar -->
							<p class="helperText2">레이어와 데이터보드를 활용하여 새로운 통계결과를 만들어보세요.</p>
						</div>
						<!-- map topbar -->

						<!-- 데이터보드 -->
						<a href="javascript:void(0)" class="interactiveDataBoard">데이터보드</a>
						<!-------------------------------------데이터보드 ----------------------------------->
						<div class="dataSideBox full" style="width:500px;">
							<div class="bar">
								<div id="dataSlider" class="dataSlider"></div>
								<a href="javascript:void(0)"><img src="/img/ico/ico_close02.png" alt="데이터보드 닫기" /></a>
							</div>
							<div class="dataSideContents">
								<div class="dataSideScroll" style="height:700px;">
									<p class="dbText01" style="font-size:13px;line-height:1.5em;">
									지도 위 결합된 통계결과에 따라 선택된 레이어의 데이터값을 확인 할 수 있습니다. 
					    			레이어간 지역매칭이 동일한 경우 하나의 기준값을 통해 데이터간 비교가 가능하며, 
					    			매칭이 안될 경우, 각각의 데이터를 선택하여 볼 수 있습니다.</p>
									<div class="dscEtc01"></div> 
									<dl class="dscList" style="width:480px;">
					    				<dt><a href="javascript:void(0)" style="background-position:460px;">레이어별 데이터 목록</a></dt>
					    				<dd>
					    					<div class="compareBox">
					    						<div class="typeBox">
					    							<a href="javascript:void(0)" class="first on">차트</a>
					    							<a href="javascript:void(0)">표</a>
					    						</div> 
					    						<div class="combineChart" id="dataChart"></div>
					    						<div class="combineGrid">
					    							<!-- <a href="javascript:void(0)" class="btn_excelDownload">엑셀다운로드</a> -->
					    							<div id="dataGrid" style="width:480px;display:none;"></div>  
					    						</div>
					    					</div>
					    				</dd>
					    			</dl>
								</div>
							</div>
						</div>
						<!-------------------------------------데이터보드 end ----------------------------------->

						<div class="mapContents" id="mapRgn"></div>
						<!-- 맵영역 -->
						<div class="resizeIcon">
							<!-- 리사이즈 아이콘 -->
						</div>

					</div>
				</div>
		    	
		    	<a href="javascript:void(0)" class="sideQuick sq03">
		    		<span>겹칩설정</span>
		    		<img src="/img/ico/ico_resultbtn.gif" alt="통계버튼" />
		    	</a>
		    	<div class="sqListBox sq03">
		    		<div class="sqEtc" style="height:30px;">
		    		</div>
		    		<div class="sqList type01" id="btnList">
		    			<div class='btnScroll'>
		    				<ul style="font-size:13px;border-bottom:0px;width:290px;"></ul>
		    			</div>
		    		</div> 
		    		<div class="btnBox">
		    			<a onclick="javascript:$combineMap.ui.doCombineLayer();" id="combineBtn" class="btnStyle10" data-subj="범례결합 팁" title="같은 행정구역 통계일 경우에만 범례결합 기능을 사용할 수 있습니다.">범례결합</a>
		    		</div>
		    	</div> 
	    	</div>
		</div> 
	</div>
</body>
</html>