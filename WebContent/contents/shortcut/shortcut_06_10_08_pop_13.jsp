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
		
		function drawArea(){
			// 원           : 1 (Circle)
			// 사각형 : 2 (Retangle)
			// 다각형 : 3 (Polygon)
			var areaType = 1;
			mapObj.setArea(areaType);
		}
		
		function getArea(){
			// 영역 정보를 얻어옵니다
			// 현재 화며면에 그려진 영역에 대한 정보를 얻어옵니다.
			// 반환되는 영역은 Circle,  Polygon객체입니다.
			// 단 화면에 그려진 영역이 없는 경우 현재화면을 Rectangle 객체로 반환됩니다.
			var geom = mapObj.getArea();
			if(geom instanceof Circle){
             alert("Circle");
            }else if(geom instanceof Polygon){
             alert("Polygon");
            }else if(geom instanceof Retangle){
             alert("Retancle");
            }
			
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
			<h5 class="mrt20">1.영역 그리기 예제</h5>
			<p class="api_tt2"> 1.drawArea를 클릭 하시고 지도위에  드래그 하면 원이 그려집니다.</p>
			<p class="api_tt2"> 2.getArea를 클릭하면 현재 지도위에 그려진 객체를 알림창으로 알려줍니다. </p>
			<div id='mapContainer' style='width:650px;  height:400px; border:2px solid #B5D1E1;'></div>
	        <button onclick="javascript:drawArea();">drawArea</button>
	        <button onclick="javascript:getArea();">getArea</button>



  


		     
		</div><!--// api_wrap -->
		<!-- API 추가 끝 -->
      <!-- 상단 박스-->
	
      </div>
    </div>
    <!--/contents-->

 
   
</div>

</body>
</html>
