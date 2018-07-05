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
		var control = new Control();

       
       function init(){
			 mapObj = new SMap("mapContainer","650","400",1, "<%=sgisKey%>");
		}
       function addControlXY(){
			// 지도 컨트롤을 특정 화면상 위치(10,10)에 등록합니다.
			mapObj.addControlXY(control, 10, 10);
		}
		
		function addControlAnchor(){
			// 지도 컨트롤을 특정 위치에 등록합니다.
			// 지도컨트롤위치 
			// 좌측하단 : U_ANCHOR_BOTTOM_LEFT
			// 우측하단 : U_ANCHOR_BOTTOM_RIGHT
			// 좌측상단 : U_ANCHOR_TOP_LEFT
			// 우측상단 : U_ANCHOR_TOP_RIGHT
			mapObj.addControlAnchor(control,U_ANCHOR_BOTTOM_LEFT);
		}
		
		function removeControl(){
			// 지도 컨트롤을 삭제합니다.
			mapObj.removeControl(control);
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
			<h5 class="mrt20">1.지도 컨트롤 등록</h5>
			<p class="api_tt2"> 1.addControlXY버튼 클릭하시면 지정된 위치에 지도 컨트롤이 생성됩니다.</p>
			<p class="api_tt2"> 2.addControlAnchor 클릭하시면  지도에서 지정된 이미 곳에  지도 컨트롤이 생성됩니다.</p>
			<p class="api_tt2"> 3.removeControl 클릭하시면  지도에서 지도 컨트롤이 삭제됩니다.</p>
			<div id='mapContainer' style='width:650px;  height:400px; border:2px solid #B5D1E1;'></div>
	        <button onclick="javascript:addControlXY();">addControlXY</button>
	        <button onclick="javascript:addControlAnchor();">addControlAnchor</button>
	        <button onclick="javascript:removeControl();">removeControl</button>


		     
		</div><!--// api_wrap -->
		<!-- API 추가 끝 -->
      <!-- 상단 박스-->
	
      </div>
    </div>
    <!--/contents-->

 
   
</div>

</body>
</html>
