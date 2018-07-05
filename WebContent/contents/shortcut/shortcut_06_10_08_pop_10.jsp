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
       // 지도 컨트롤을 생성합니다.
		var point = new Point(237610, 315220);


       
       function init(){
		 mapObj = new SMap("mapContainer","650","400",1, "<%=sgisKey%>");
		}
       
       function addMarker()
		{
			var content = "Marker";
			var iconURL = "<%=sc_webUrl%>/SMapAPI/symbols/PIN.gif";
			// overlay할 marker 객체를 생성합니다.
			marker = new Marker(point, iconURL, content);
			mapObj.addOverlay(marker, 1);
			mapObj.panToXY(point);
		}
		// marker 를 삭제합니다.
		function removeMarker(){
			mapObj.removeOverlay(marker);
		}
		// marker 에 이벤트를 등록합니다.
		function addEvent(){
			mapObj.addListener(marker, "mousedown", "onMousedown");
		}
		// 이벤트 발생 시 호출되는 리스너입니다.
		function onMousedown(){
			alert("이벤트가 발생하였습니다.");
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
			<p class="api_title">Overlay API 예제</p>
			<h5 class="mrt20">1.Marker Overlay</h5>
			<p class="api_tt2"> 1.addMarker 클릭 하시면  지도위에 해당 아이콘 표시 됩니다.</p>
			<p class="api_tt2"> 2.addEvent 클릭하시고  등록된  Marker에 이벤트를 등록시킵니다 </p>
			<p class="api_tt2"> 3.이벤트 등록 후  지도위의 표시되는 아이콘에 마우스 클릭 시 이벤트 발생합니다.</p>
			<p class="api_tt2"> 4.removeMarker 클릭 하시면 지도위에 표시 되었던   아이콘이  지도상에서 없어집니다.</p>
			<div id='mapContainer' style='width:650px;  height:400px; border:2px solid #B5D1E1;'></div>
	        <button onclick="javascript:addMarker();">addMarker</button>
	        <button onclick="javascript:addEvent();">addEvent</button>
	        <button onclick="javascript:removeMarker();">removeMarker</button>


  


		     
		</div><!--// api_wrap -->
		<!-- API 추가 끝 -->
      <!-- 상단 박스-->
	
      </div>
    </div>
    <!--/contents-->

 
   
</div>

</body>
</html>
