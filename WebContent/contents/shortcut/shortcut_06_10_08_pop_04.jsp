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
       
       function zoomOut(){
			//지도를 축소모드로 전환하도록 설정
			mapObj.zoomOut();
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
			<h5 class="mrt20">1.지도 축소모드</h5>
			<p class="api_tt2"> 1.축소버튼을  누르시면  축소모드로 변경됩니다.</p>
			<p class="api_tt2"> 2.마우스를 지도에서 원하는 부분을 드래그 하시면됩니다.</p>
			 <div id="mapContainer" style='width:650px;  height:400px; border:2px solid #B5D1E1;'>
			 </div>
			 <button onclick="javascript:zoomOut();">축소</button>
			 
		     
		</div><!--// api_wrap -->
		<!-- API 추가 끝 -->
      <!-- 상단 박스-->
	
      </div>
    </div>
    <!--/contents-->

 
   
</div>

</body>
</html>
