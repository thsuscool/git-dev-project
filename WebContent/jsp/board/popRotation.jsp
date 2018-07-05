
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <title>대화형 통계지도 고급기능소개 | 통계지리정보서비스</title>
	    
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet" href="/css/popup.css">
	    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
 	    <script type="text/javascript" src="/js/interactive/rotation/jquery.slides.min.js"></script> 
 	    <script type="text/javascript" src="/jsp/board/js/interactiveRotation.js"></script>
        <script type="text/javascript" src="/js/board/jquery.paging.js"></script>
	</head>

	<body>  
		<div class="PopupCont" style="width:100%; height:100%;">
			<div id="slides">
				<img id="interactiveRotationImg1" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation1.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg2" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation2.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내" usemap="#rotation2"/>
				<img id="interactiveRotationImg3" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation3.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg4" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation4.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg5" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation5.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg6" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation6.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg7" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation7.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내" usemap="#rotation7"/>
				<img id="interactiveRotationImg8" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation8.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg9" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation9.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg10" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation10.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg11" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation11.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg12" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation12.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg13" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation13.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg14" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation14.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg15" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation15.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg16" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation16.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg17" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation17.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg18" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation18.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg19" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation19.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
				<img id="interactiveRotationImg20" src="${pageContext.request.contextPath}/img/interactiveMapRotation/interactiveRocation20.png" style="width:977px; height:522px;" alt="대화형통계지도이용안내"/>
			</div>
			<map name="rotation2">
				<area shape="rect" coords="333 98 413 120" href="javascript:moveHighFunction(1);" alt="고급기능 이동" >
			</map>
			<map name="rotation7">
				<area shape="rect" coords="453 171 521 193" href="javascript:moveHighFunction(1);" alt="고급기능 이동">
			</map>	
			<div class="Popup-page-alter" style="z-index: 999999;">
					<div id="preViewBtn" class="fl ml20"><a href="#"><img src="${pageContext.request.contextPath}/img/interactiveMapRotation/l_arrow.png" alt="arrow"></a></div>
					<div id="nextViewBtn" class="fr mr20"><a href="#"><img src="${pageContext.request.contextPath}/img/interactiveMapRotation/r_arrow.png" alt="arrow"></a></div>
			</div>
			<div class="Pagination" style="font-size:13px;">
				<ul id="rotationDiv" style="width:500px;">
					<li id="rotationPageText1"><a href="#">1</a></li> 
					<li id="rotationPageText2"><a href="#">2</a></li>
					<li id="rotationPageText3"><a href="#">3</a></li>
					<li id="rotationPageText4"><a href="#">4</a></li>
					<li id="rotationPageText5"><a href="#">5</a></li>
					<li id="rotationPageText6"><a href="#">6</a></li>
					<li id="rotationPageText7"><a href="#">7</a></li>
					<li id="rotationPageText8"><a href="#">8</a></li>
					<li id="rotationPageText9"><a href="#">9</a></li>
					<li id="rotationPageText10"><a href="#">10</a></li>
					<li id="rotationPageText11"><a href="#">11</a></li>
					<li id="rotationPageText12"><a href="#">12</a></li>
					<li id="rotationPageText13"><a href="#">13</a></li>
					<li id="rotationPageText14"><a href="#">14</a></li>
					<li id="rotationPageText15"><a href="#">15</a></li>
					<li id="rotationPageText16"><a href="#">16</a></li>
					<li id="rotationPageText17"><a href="#">17</a></li>
					<li id="rotationPageText18"><a href="#">18</a></li>
					<li id="rotationPageText19"><a href="#">19</a></li>
					<li id="rotationPageText20"><a href="#">20</a></li>
				</ul>
			</div>
		</div>
	</body>
</html>