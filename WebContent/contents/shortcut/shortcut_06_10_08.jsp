<%--
/*
    ********************************************************************
    * @source      : shortcut_06_10_08_d.jsp
    * @description : OpenAPI 1.0  API제공리스트
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 
	*2014-09-12		이경현							디자인시각화
    ********************************************************************
 */
--%>  
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
    String leftMenu="shortcut";
    RecordModel rm = null;
    GeneralBroker broker = null;
    String  api_expert_doc = new String("공간통계OpenAPI_사용자지침서.pdf");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" /><!-- 전화번호 자동 링크 생성 방지 --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
		<link rel="stylesheet" href="/contents/css/2014_css/css/default.css" />   
		<script type="text/javascript" src="/contents/css/2014_css/js/jquery-1.11.0.min.js"></script> 
		<script type="text/javascript" src="/contents/css/2014_css/js/default.js"></script> 
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
	<script type="text/javascript" src="/contents/scripts/divwriter.js"></script>
			
	
	<script type="text/javascript" language="javascript">
	//<![CDATA[
	function apiRun(url){
		var winpop =window.open(url,"winpop","width=700px,height=660px");
	
			
		}
	
	
	
	
	
	//예제 실행하기
	function examplesClicked() {
	    var fm=document.pFm;
	
	    if(fm.api_element_id.value == "") {
	        alert("서비스를 선택하세요.");
	        return;
	    } else {
	
	        var url = fm.api_element_example_exe.value;
	        window.open(url, "api_samples", "width=850, height=650, resizable=yes");
	    }
	}
	//]]>
	</script>
	</head>

	<body>
		<div class="wrapper">
			<!-- cls:header start -->
			<div class="header"> 
			<!-- top -->
		  	<%@include file="/contents/include/header_2014.jsp" %>		<!-- 헤어 영역 -->
		  	<!-- /top -->			
  			</div><!-- cls:header end -->


			<!-- cls:contents start -->
			<div class="contents subbg">
				<div class="container">
					<div class="lnb">
						<%@include file="/contents/include/leftMenu_2014.jsp" %>
						<script type="text/javascript">
							$("#l05").attr("style", "display:block");		//left Menu에서 참여바당 부분 보여줌.
							$("#l052").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0525").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
	<div class="acticle">
		<!-- MapControl/Overlay서비스  -->
			<div class="location">
				<p><span class="on">OpenAPI 1.0</span> &lt;  <span>OpenAPI</span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">OpenAPI 1.0</p>
				<p class="txt02">S-OpenAPI 1.0의 내용은 다음과 같습니다.</p>
			</div>
			<div class="use_wrap">	
					<div class="apiTitleBlue">※ S-OpenAPI 1.0은 2013년 12월 말 서비스 종료 되었습니다.</div>
					<div class="apiTab">
						<div>
							<span class="apiTab_font01"><a href="/contents/shortcut/shortcut_06_10_08.jsp">MapControl/Overlay서비스</a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_01.jsp">좌표 변환 서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_02.jsp">WebMap 서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_03.jsp">Geocoder서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_04.jsp">Reverse Geocoder서비스</a></span>
						</div>
						<div>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_05.jsp"> 집계구 기반 제공 항목 검색 서비스</a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_06.jsp">원시명부항목검색서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_07.jsp">집계구 기반 공간통계서비스 </a></span>
						</div>							
					</div>
					<div class="apiP01">
						<p class="apiP01Tilte"> Map Control 및 Overlay 서비스</p>
						<p class="apiPFont01">
							Map Control 및 Overlay 서비스는 자바 스크립트(Java Script) 언어를 사용하여 웹 사이트를 구현하는데 익숙한 사용자를 대상으로 하였습니다. Map Control 및 Overlay 서비스를 이용하여 웹사이트에 지도를 표시하려면 Map Control 및 Overlay 서비스 포함하고 있는 자바 스크립트를 사용할 수 있도록 웹 페이지를 작성해야 합니다. 또한 Map API 사용자 등록 키가 필요합니다.
						</p>
					</div>
					<div class="apiP01">
						<p class="apiP02Title">1. Map Control API 예제</p>
						<p class="apiPFont01">
							여기에서는 지도조작 API에서 제공하는 기능들을 이용하여 웹 페이지를 작성하는 예들을 보여줍니다. 
						</p>
						<div>
							<h5 class="apiPFont02">1.1 지도생성</h5>
							<p class="apiPFont01">API발급키를 이용하여 지도를 웹 페이지에 표시하는 방법입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도생성 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		function init(){
			var mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_01.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<div class="apiP02">
							<h5 class="apiPFont02">1.2 지도 이동, 확대, 축소 및 축적 설정</h5>
							<h6 class="apiPFont03">1.2.1 지도 이동모드</h6>
							<p class="apiPFont01">API발급키를 이용하여 지도를 웹 페이지에 표시하는 방법입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도이동 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}
		
		function pan(){
			//지도를 이동모드로 전환하도록 설정
			mapObj.pan();
		}
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:pan();"&gt;pan&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_02.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<div class="apiP02">							
							<h6 class="apiPFont03">1.2.2 지도 확대모드</h6>
							<p class="apiPFont01">지도를 확대모드로 전환하도록 설정하는 방법입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도확대 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}
		
		function zoomIn(){
			//지도를 확대모드로 전환하도록 설정
			mapObj.zoomIn();
		}
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:zoomIn();"&gt;zoomIn&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_03.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<div class="apiP02">							
							<h6 class="apiPFont03">1.2.3 지도 축소모드</h6>
							<p class="apiPFont01">지도를 축소모드로 전환하도록 설정하는 방법입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도축소 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}
		
		function zoomOut(){
			//지도를 축소모드로 전환하도록 설정
			mapObj.zoomOut();
		}
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:zoomOut();"&gt;zoomOut&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_04.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
						<div class="apiP02">							
							<h6 class="apiPFont03">1.2.4 지도 축척설정 및 축척확인 방법</h6>
							<p class="apiPFont01">지도의 scale을 임의로 설정하는 방법과 API가 제공하는 특정레벨의 scale로 설정하는 방법 그리고 레벨과 scale을 확인하는 방법입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도축척 설정 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
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
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:setZoomLevel(0);"&gt;0&lt;/button&gt;
	&lt;button onclick="javascript:setZoomLevel(1);"&gt;1&lt;/button&gt;
	&lt;button onclick="javascript:setZoomLevel(2);"&gt;2&lt;/button&gt;
	&lt;button onclick="javascript:setZoomLevel(3);"&gt;3&lt;/button&gt;
	&lt;button onclick="javascript:setZoomLevel(4);"&gt;4&lt;/button&gt;
	&lt;button onclick="javascript:setZoomLevel(5);"&gt;5&lt;/button&gt;
	&lt;button onclick="javascript:setZoomLevel(6);"&gt;6&lt;/button&gt;
	&lt;button onclick="javascript:getZoomLevel();"&gt;Level확인&lt;/button&gt;
	&lt;button onclick="javascript:setScale();"&gt;1:6000축척설정&lt;/button&gt;
	&lt;button onclick="javascript:getScale();"&gt;축척확인&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
								</textarea>
								<!-- 
								<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_05.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
								 -->
							</div>
							<div class="apiP02">							
								<h6 class="apiPFont03">1.3 지도 중심점  이동</h6>
								<p class="apiPFont01">지도의 중심점을 좌표 및 영역 경계를 이용하여 이동하는 방법입니다. </p>
								<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도 중심점 이동 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}
		
		function panToXY(){
			// 지도를 이동시킬 포인트 객체를 생성합니다.
			var point = new Point(237610, 315220);
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
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:panToXY();"&gt;panToXY&lt;/button&gt;
	&lt;button onclick="javascript:setCenterAndScale();"&gt;setCenterAndScale&lt;/button&gt;
	&lt;button onclick="javascript:setCenterAndZoomLevel();"&gt;setCenterAndZoomLevel&lt;/button&gt;
	&lt;button onclick="javascript:setBound();"&gt;setBound&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_06.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<div class="apiP02">							
							<h6 class="apiPFont03">1.4 지도 컨트롤 등록</h6>
							<p class="apiPFont01">MapAPI에서 제공하는 컨트롤인 확대, 축소, 이동의 지도 컨트롤을 지도 상에 표시하는 방법입니다. <br/>
							이 컨트롤은 특정 화면의 좌표 및 Position Anchor을 이용하여 정렬할 수 있습니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도 컨트롤 등록 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		// 지도 컨트롤을 생성합니다.
		var control = new Control();
		
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
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
		
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:addControlXY();"&gt;addControlXY&lt;/button&gt;
	&lt;button onclick="javascript:addControlAnchor();"&gt;addControlAnchor&lt;/button&gt;
	&lt;button onclick="javascript:removeControl();"&gt;removeControl&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_07.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
						<div class="apiP02">							
							<h6 class="apiPFont03">1.5 이벤트 리스너 등록</h6>
							<p class="apiPFont01">지도상에서 사용자에 의해 일어나는 마우스 클릭, 이동과 같은 움직임을 감지하여 웹페이지가 적절한 동작을 하도록 이벤트 리스너를 등록하는 방법입니다.
								사용자가 등록한 이벤트가 발생할 때 이벤트와 관련된 인자로 등록한 이벤트 리스너가 호출됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 지도 이벤트 리스너 등록 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sfis.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}

		
		function addClick(){
			// 이벤트 리스너를 등록합니다.
			// 이벤트 종류
			// clicked, drag, startdrag, enddrag, mousedown, mouseup, mousemove, mouseover, mouseout
			mapObj.addListener(mapObj, "clicked", "onClicked");
		}
		
		function removeClick(){
			// 이벤트 리스너를 삭제합니다.
			mapObj.removeListener(mapObj, "clicked");
		}
		
		function onClicked(){
			// 이벤트 발생 시 호출되는 이벤트 리스너입니다.
			alert("clicked");
		}
		
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:addClick();"&gt;addClick&lt;/button&gt;
	&lt;button onclick="javascript:removeClick();"&gt;removeClick&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_08.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
						<div class="apiP02">							
							<h6 class="apiPFont03">1.6 영역 그리기 예제</h6>
							<p class="apiPFont01">지도상에서 사용자에 의해  임의의 영역을 그리기 위한 방법과 그 영역에 대한 정보를 받아오는 방법에 대해서 보여줍니다..</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI 영역 그리기 사용 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sfis.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
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
		

		
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:drawArea();"&gt;drawArea&lt;/button&gt;
	&lt;button onclick="javascript:getArea();"&gt;getArea&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_13.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<p class="apiP02Title">2. Overlay API 예제</p>
						<p class="apiPFont01">
							Overlay API에서 제공하는 기능들을 이용하여 웹 페이지를 작성하는 예들을 보여줍니다.
						</p>
						<div>
							<h5 class="apiPFont02">2.1 point overlay</h5>
							<p class="apiPFont01">Point를 지도에 overlay하고 이벤트를 등록하는 방법을 보여줍니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI point overlay 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		// overlay할 포인트 객체를 생성합니다.
		var point = new Point(237610, 315220);
		
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}		
		
		function addPoint(){
			// point를 overlay 합니다.
			mapObj.addOverlay(point, 1);
			mapObj.panToXY(point);
		}
		
		function removePoint(){
			// point를 삭제합니다.
			mapObj.removeOverlay(point);
		}
		
		function addEvent()
		{
			// point에 이벤트를 등록합니다.
			mapObj.addListener(point, "mousedown","onMousedown");
		}
		
		function onMousedown()
		{
			// 이벤트 발생 시 호출되는 리스너입니다.
			alert("이벤트가 발생하였습니다.");
		}
		
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:addPoint();"&gt;addPoint&lt;/button&gt;
	&lt;button onclick="javascript:addEvent();"&gt;addEvent&lt;/button&gt;
	&lt;button onclick="javascript:removePoint();"&gt;removePoint&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_09.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<div>
							<h5 class="apiPFont02">2.2 marker overlay</h5>
							<p class="apiPFont01">특정지점을 표시하기 위한 marker와 marker객체와 연관된 정보를 표시하는 정보창을 이용하는 방법을 알려줍니다.
								marker를 사용하려면 아이콘 파일과 위치 그리고 marker에 표시할 내용을 이용하여 marker 객체를 생성하면 됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI marker overlay 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http:// sgis1.kostat.go.kr /SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		// marker 생성에 필요한 값을 설정합니다.
		var point = new Point(237610, 315220);
		var marker = null;
		
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
			
		}		

		// marker 를 overlay 합니다.
		function addMarker()
		{
			var content = "Marker";
			var iconURL = "http://sgis1.kostat.go.kr/SMapAPI/symbols/PIN.gif";
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
		
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:addMarker();"&gt;addMarker&lt;/button&gt;
	&lt;button onclick="javascript:addEvent();"&gt;addEvent&lt;/button&gt;
	&lt;button onclick="javascript:removeMarker();"&gt;removeMarker&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_10.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<div>
							<h5 class="apiPFont02">2.3 polyline overlay</h5>
							<p class="apiPFont01">Polyline을 지도 위에 overlay하고 이벤트를 등록하는 방법을 보여줍니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;title&gt;통계지리정보서비스 OpenAPI polyline overlay 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		// polyline을 생성할 포인트 객체를 생성합니다.
		var point1 = new Point(237610, 315220);
		var point2 = new Point(236890, 315900);
		var point3 = new Point(235250, 315218);
		var point4 = new Point(235050, 315018);
		var point5 = new Point(236235, 315167);
		var points = new Array(point1, point2, point3, point4, point5);
		// polyline을 생성합니다.
		var polyline = new Polyline(points);
		
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}		
		
		// polyline 을 overlay 합니다.
		function addPolyline(){
			mapObj.addOverlay(polyline, 1);
			mapObj.setBounds(polyline.getBounds());
		}
		
		// polyline 을 삭제합니다.
		function removePolyline(){
			mapObj.removeOverlay(polyline);
		}
		
		// polyline 에 이벤트를 등록합니다.
		function addEvent(){
			mapObj.addListener(polyline, "mousedown", "onMousedown");
		}
		
		// 이벤트 발생 시 호출되는 리스너입니다.
		function onMousedown(){
			alert("이벤트가 발생하였습니다.");
		}
		
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:addPolyline();"&gt;addPolyline&lt;/button&gt;
	&lt;button onclick="javascript:addEvent();"&gt;addEvent&lt;/button&gt;
	&lt;button onclick="javascript:removePolyline();"&gt;removePolyline&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_11.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>
					<div>
							<h5 class="apiPFont02">2.4 polygon overlay</h5>
							<p class="apiPFont01">Polygon을 지도 위에 overlay하고 이벤트를 등록하는 방법을 보여줍니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"&gt;
	&lt;title&gt;통계지리정보서비스 OpenAPI polygon overlay 예제 &lt;/title&gt;
	&lt;script type="text/javascript" language="javascript" src="http://sgis1.kostat.go.kr/SMapAPI/MapAPI.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript" language="javascript"&gt;
		var mapObj = null;
		// polygon을 생성할 포인트 객체를 생성합니다.
		var point1 = new Point(237610, 315220);
		var point2 = new Point(236890, 315900);
		var point3 = new Point(235250, 315218);
		var point4 = new Point(235050, 315018);
		var point5 = new Point(236235, 315167);
		var points = new Array(point1, point2, point3, point4, point5);
		// polygon을 생성합니다.
		var polygon= new Polygon (points);
		
		function init(){
			mapObj = new SMap("mapContainer","400","300",1, "API발급키");
		}		
		
		// polygon을 overlay 합니다.
		function addPolygon(){
			mapObj.addOverlay(polygon, 1);
			mapObj.setBounds(polygon.getBounds());
		}
		
		// polygon을 삭제합니다.
		function removePolygon(){
			mapObj.removeOverlay(polygon);
		}
		// polygon에 이벤트를 등록합니다.
		function addEvent(){
			mapObj.addListener(polygon, "mousedown","onMousedown");
		}
		// 이벤트 발생 시 호출되는 리스너입니다.
		function onMousedown(pos){
			alert("이벤트가 발생하였습니다.");
		}
		
	&lt;/script&gt;
&lt;/head&gt;
&lt;body onload="javascript:init();"&gt;
	&lt;div id='mapContainer'&gt;&lt;/div&gt;
	&lt;button onclick="javascript:addPolygon();"&gt;addPolygon&lt;/button&gt;
	&lt;button onclick="javascript:addEvent();"&gt;addEvent&lt;/button&gt;
	&lt;button onclick="javascript:removePolygon();"&gt;removePolygon&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
							</textarea>
							<!-- 
							<p class="abiPBtn"><a href="#" onclick="apiRun('shortcut_06_10_08_pop_12.jsp');"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>																			
							 -->
					</div>


				</div>
				</div>
    <form name="apiFm" method="post" action="/contents/include/download.jsp" target="downloadIfr" onsubmit="return false;">
        <input type="hidden" name="filename"/>
        <input type="hidden" name="path" value="/api/"/>
        <input type="hidden" name="api_element_expert_api_doc" value="<%=java.net.URLEncoder.encode(api_expert_doc) %>"/>
   </form>					
				<!-- //MapControl/Overlay서비스  -->
					<!-- center contents end -->
					</div>
					
			<br /><br />&nbsp;
				</div>
			</div><!-- cls:contents end -->
			<iframe name="downloadIfr" src="#" height="0" width="0" frameborder="0" title="다운로드프레임"></iframe><%-- 다운로드 타겟 프레임 --%>
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div> 
		</div>
	</body>
</html>