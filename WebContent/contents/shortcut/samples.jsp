<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>

<HTML>
<HEAD>
<TITLE><%=sc_pageTitle %></TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">

<link rel="stylesheet" href="style/style.css" type="text/css">
<link href="/contents/style/style.css" rel="stylesheet" type="text/css" />
<SCRIPT  LANGUAGE="JavaScript" src="<%= ConfigManager.getStatisticsResourceURL()%>/SMapAPI/MapAPI.js"></SCRIPT>
// 지도
<div id='mapContainer'></div>
<SCRIPT LANGUAGE="JavaScript">
var mapObj = new SMap("mapContainer",750,550, "abcd12345");
</SCRIPT>

<SCRIPT LANGUAGE="JavaScript">
// 지도의 축척을 반환합니다.
function getScale()
{
 var scale = mapObj.getScale();
}
// 지도의 축척 레벨을 반환합니다.
function getZoomLevel()
{
 var zoomlevel = mapObj.getZoomLevel();
}
</SCRIPT>
</HEAD>

<BODY>
<br>
<!-- // 버튼을 클릭하면 지도를 이동모드로 전환하도록 설정 -->
<button onclick='mapObj.pan()'>pan</button>
<!-- //버튼을 클릭하면 지도를 확대모드로 전환하도록 설정-->
<button onclick='mapObj.zoomIn()'>zoomIn</button>
<!--// 버튼을 클릭하면 지도를 축소모드로 전환하도록 설정-->
<button onclick='mapObj.zoomOut()'>zoomOut</button>
<!--// 버튼을 클릭하면 지도를 1:6000의 축척으로 설정-->
<button onclick='mapObj.setScale(6000)'>축척설정</button>
<!--// 버튼을 클릭하면 지도가 특정레벨로 조정되도록 설정-->
<button onclick='mapObj.setZoomLevel(0)'>0</button>
<button onclick='mapObj.setZoomLevel(1)'>1</button>
<button onclick='mapObj. setZoomLevel (2)'>2</button>
<button onclick='mapObj. setZoomLevel (3)'>3</button>
<button onclick='mapObj. setZoomLevel (4)'>4</button>
<button onclick='mapObj. setZoomLevel (5)'>5</button>
<button onclick='mapObj. setZoomLevel (6)'>6</button>"


</body>
</html>
