<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>공간통계 Open API제공리스트:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<script type="text/javascript" language="javascript" src="<%=sc_webUrl%>/SMapAPI/MapAPI.js"></script>
<script type="text/javascript">
//<![CDATA[
       var mapObj = null;
       function init(){
		 mapObj = new SMap("mapContainer","650","400",1, "<%=sgisKey%>");
		}
       function getScale(){
			// 지도의 축척을 반환합니다.
			var scale = mapObj.getScale();
			alert(scale);
		}
		
		function getZoomLevel(){
			// 지도의 축척 레벨을 반환합니다.
			var zoomlevel = mapObj.getZoomLevel();
			alert(zoomlevel);
		}
		
		function setZoomLevel(val){
			// 지도가 특정레벨로 조정되도록 설정
			// 지도 API의 축척단계는 레벨 0 (가장확대) 부터 레벨 11 (가장축소) 까지 총 12단계로 나누어집니다.
			mapObj.setZoomLevel(val);
		}
		
		function setScale(){
			// 지도를 임의의 축적으로 설정
			// 지도를 1:6000의 축척으로 설정
			mapObj.setScale(6000);
		}


//]]>
</script>
</head>

<body onload="javascript:init();">
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>

<div id="wrap">


    <!--contents-->
    <div id="contents">
    <h2 id="q_contents">컨텐츠 영역</h2>
     
      <div id="article">
		
		<!-- API 추가 시작 -->
		
	
		
			<div class="api_wrap">
			<p class="api_title">Map Control API 예제</p>
			<h5 class="mrt20">1.지도 축척설정 및 축척확인 방법입니다.</h5>
			<p class="api_tt2"> 1.Level 0부터 6까지 각각의 버튼을 누르시면 해당숫자에 맞는  축척으로 설정됩니다.</p>
			<p class="api_tt2"> 2.LeveL확인 버튼을 누르시면 현재 지도의 레벨이 알림창으로 알려줍니다.</p>
			<p class="api_tt2"> 3.1:6000축적설정 버튼을 누르시면 현재 지도의 축적이 1:6000으로 설정됩니다.</p>
			<p class="api_tt2"> 4.축적확인 버튼을 누르시면 현재 지도의 축적이 알림창으로 알려줍니다.</p>
			<div id='mapContainer' style='width:650px;  height:400px; border:2px solid #B5D1E1;'></div>
	        <button onclick="javascript:setZoomLevel(0);">Level 0</button>
	        <button onclick="javascript:setZoomLevel(1);">Level 1</button>
	        <button onclick="javascript:setZoomLevel(2);">Level 2</button>
	        <button onclick="javascript:setZoomLevel(3);">Level 3</button>
	        <button onclick="javascript:setZoomLevel(4);">Level 4</button>
	        <button onclick="javascript:setZoomLevel(5);">Level 5</button>
	        <button onclick="javascript:setZoomLevel(6);">Level 6</button>
	        <button onclick="javascript:getZoomLevel();">Level확인</button>
	        <button onclick="javascript:setScale();">1:6000축척설정</button>
	        <button onclick="javascript:getScale();">축척확인</button>

		     
		</div><!--// api_wrap -->
		<!-- API 추가 끝 -->
      <!-- 상단 박스-->
	
      </div>
    </div>
    <!--/contents-->

 
   
</div>

</body>
</html>
