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
       function panToXY(){
			// 지도를 이동시킬 포인트 객체를 생성합니다.
			var point = new Point(237800, 315400);
			// 특정 포인트로 지도를 이동합니다.
			mapObj.panToXY(point);
		}
		
		function setCenterAndScale(){
			// 지도를 이동시킬 포인트 객체를 생성합니다.
			var point = new Point(237610, 315220);
			// 특정 축척을 적용하며 특정 포인트로 지도를 이동합니다.
			// 1:6000의 축척으로 특정 포인트로 지도를 이동합니다.
			mapObj.setCenterAndScale(point, 6000);
		}
		
		function setCenterAndZoomLevel(){
			// 지도를 이동시킬 포인트 객체를 생성합니다.
			var point = new Point(237610, 315220);
			// 특정 축척레벨을 적용하며 특정 포인트로 지도를 이동합니다.
			// 2레벨의 축척으로 특정 포인트로 지도를 이동합니다.
			mapObj.setCenterAndZoomLevel(point, 2);
		}
		
		function setBound(){
			// 영역경계 최소 x 좌표
			var minx = 235975; 
			// 영역경계 최소 y 좌표
			var miny = 314743.75; 
			// 영역경계 최대 x 좌표
			var maxx = 237245; 
			// 영역경계 최대 y 좌표
			var maxy = 315696.25; 
			// 지도를 이동시킬 영역경계 사각형 객체를 생성합니다.
			var rectangle = new Rectangle(minx,miny,maxx,maxy);
			// 특정 영역으로 지도를 이동합니다.
			// 영역으로 지도를 이동합니다.
			mapObj.setBounds(rectangle);
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
			<h5 class="mrt20">1.지도 중심점 이동</h5>
			<p class="api_tt2"> 1.panToXY버튼을 클릭하시면 지정한 중심 좌표로 지도가 이동합니다.</p>
			<p class="api_tt2"> 2.setCenterAndScale버튼을 클릭하시면 지정된 중심 좌표로의 이동과 동시에 축적의 설정이 변경됩니다.</p>
			<p class="api_tt2"> 3.setCenterAndZoomLevel버튼을 클릭하시면 지정된 중심 좌표로의 이동과  지도의 줌레벨이 변경됩니다.</p>
			<p class="api_tt2"> 4.setBound버튼을 클릭하시면 설정된 지도의 시작과 끝의 좌표값으로  설정이 변경됩니다.</p>
			<div id='mapContainer' style='width:650px;  height:400px; border:2px solid #B5D1E1;'></div>
	       <button onclick="javascript:panToXY();">panToXY</button>
	       <button onclick="javascript:setCenterAndScale();">setCenterAndScale</button>
	       <button onclick="javascript:setCenterAndZoomLevel();">setCenterAndZoomLevel</button>
	       <button onclick="javascript:setBound();">setBound</button>

		     
		</div><!--// api_wrap -->
		<!-- API 추가 끝 -->
      <!-- 상단 박스-->
	
      </div>
    </div>
    <!--/contents-->

 
   
</div>

</body>
</html>
