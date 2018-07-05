<%
/**************************************************************************************************************************
* Program Name  : 사업체 전개도 JSP  
* File Name     : indoorMap.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-17
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" type="text/css" href="/css/idm/common.css" />
<link rel="stylesheet" type="text/css" href="/css/idm/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/idm/im.css" />
<link rel="stylesheet" type="text/css" href="/css/idm/sop.css" />

<script type="text/javascript" src="/js/indoor/libs/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="/js/indoor/ui.js"></script>
<script type="text/javascript" src="/js/indoor/sop-src.js"></script>

<!-- <script type="text/javascript" src="/js/indoor/common.js"></script> -->
<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/indoor/indoorMap.js"></script>
<script type="text/javascript" src="/js/indoor/indoorMapView.js"></script>




<title>인터랙티브 맵 :: 통계지리정보서비스</title>

<script type="text/javascript">
$(function(){
	$("#planar_btn_1").click(function(){
		$(".planar_sectionc .open_info_modify").find(">a").toggleClass("on");
		$(".layer_pop_planar2").toggle();
	});
	
	$(".planar_sectionb .open_info_modify").click(function(){
		$(this).find(">a").toggleClass("on");
		$(".layer_pop_planar").toggle();

		var heightlayer = $(".planar_sectionc").height();
		var widthlayer = $(".planar_sectionc .planar_section01 .planar_sec02").width();
		var heightlayer2 = $(".planar_sectionb .planar_section01").height();
		$(".layer_pop_planar .planar_sec02 .planar_sec02box").css("height", (heightlayer + heightlayer2) - 50);
		$(".layer_pop_planar").css({
			'width' : widthlayer,
			'height' : heightlayer + heightlayer2 -11
		});
	});

	$(".lppl_close").click(function(){
		$(".layer_pop_planar").hide();
		$(".planar_sectionb .open_info_modify").find(">a").toggleClass("on");
	});

	$(".planar_sectionc .open_info_modify").click(function(){
		$(this).find(">a").toggleClass("on");
		$(".layer_pop_planar2").toggle();
		
		var heightlayer = $(".planar_sectionc").height();
		$(".layer_pop_planar2").css("height", heightlayer);

	});

	$(".lppl2_close").click(function(){
		$(".layer_pop_planar2").hide();
		$(".planar_sectionc .open_info_modify").find(">a").toggleClass("on");
	});

	$(window).resize(function() {
		//console.log("documentHeight: ",$(document).height());
		//console.log("windowsHeight: ",$(window).height());

		var windowsHeight = $(window).height();
		var planarheight = $(".planar_sectionc").height(); 
// 		$(".va-container").css("margin-top", (planarheight / 2) - 150);
		$(".planar_sectionc .planar_section01 .planar_sec02 .planar_sec02box #map").css("height", windowsHeight - 300);
		
		var heightlayer = $(".planar_sectionc").height();
		var widthlayer = $(".planar_sectionc .planar_section01 .planar_sec02").width();
		var heightlayer2 = $(".planar_sectionb .planar_section01").height();
		$(".layer_pop_planar .planar_sec02 .planar_sec02box").css("height", (heightlayer + heightlayer2) - 50);
		$(".layer_pop_planar").css({
			'width' : widthlayer,
			'height' : heightlayer + heightlayer2 -11
		});
		
		var heightlayer3 = $(".planar_sectionc").height();
		$(".layer_pop_planar2").css("height", heightlayer3);
		
	}).resize();
});
</script>

<style type="text/css">
html, body { overflow-y: visible;}
body { min-width: 750px;}
</style>

</head>
<body>

<!-- ( pop_planar ) -->
<div class="pop_planar">
	<div class="planar_section">
		<div class="planar_sectiont">
			<p class="planar_tit"></p>
			<!-- 2016-03-17 수정 -->
<!-- 			<p id="planar_btn_1" class="planar_btn"> -->
<!-- 				<a href="#" style="width: 95px;">정보수정요청</a> -->
<!-- 			</p> -->
			<p id="planar_btn_2" class="planar_btn" onclick="$indoorMapView.ui.goMainFloor();">
				<a href="#" style="width: 95px;">대표층보기</a>
			</p>
		</div>

		<!-- ( layer_pop_planar ) -->
		<div class="layer_pop_planar" style="display: none;">
			<div class="planar_sec01">
				<p class="planar_sec01_tit">해당 층 사업체 정보</p>
				<p class="planar_sec01box"><a href="#" class="lppl_close"><img src="/img/idm/btn_mapinfo_close.gif" alt="닫기" /></a></p>
			</div>
			<div class="planar_sec02">
				<div id="planar_sec02box_t" class="planar_sec02box" style="padding-top: 10px;">

				</div>
			</div>
		</div>
		<!-- //( layer_pop_planar ) -->

		<!-- ( layer_pop_planar2 ) -->
		<div class="layer_pop_planar2" style="display: none;">
			<div class="planar_sec01">
				<p class="planar_sec01_tit">정보수정 요청</p>
				<p class="planar_sec01box"><a href="#" class="lppl2_close"><img src="/img/idm/btn_mapinfo_close.gif" alt="닫기" /></a></p>
			</div>
			<div class="planar_sec02">
				<div class="planar_sec02box" style="padding-top: 15px;">
					<p class="planar_tit_l">정보요청항목</p>
					<div class="planar_sel">
						<select class="easyui-combobox" name="language" style="width: 205px;">
							<option value="ar">사업체 전개도(평면도)부분</option>
						</select>
					</div>
					<p class="planar_tit_l">정보요청사항</p>
					<div class="planar_text">
<!-- 						<input class="easyui-textbox" name="message" data-options="multiline:true" style="height:154px"></input> -->
						<textarea name="message" style="height:154px"></textarea>
					</div>
					<div class="planar_btn">
						<a href="#" class="bg_blue" style="width: 72px;">작성</a>
						<a href="#" style="width: 72px;">취소</a>
						<a href="#" style="width: 72px;">다시쓰기</a>
					</div>
				</div>
			</div>
		</div>
		<!-- //( layer_pop_planar2 ) -->

		<!-- ( planar_sectionc ) -->
		<div class="planar_sectionc">
			<div class="planar_section01">
				<div class="planar_sec01" onclick="$indoorMapView.ui.setZoom();">
					<p class="planar_sec01_tit">평면도</p>
					<p class="planar_sec01box"><a href="#"><img src="/img/idm/btn_glass.gif" alt="확대" /> 확대</a></p>
				</div>
				<div class="planar_sec02">
					<div class="planar_sec02box" style="/* padding-top: 50px; */">
						<!-- development figure area -->
						<div id="map">
						</div>
						<!-- development figure area -->
					</div>
				</div>
			</div>

			<div class="planar_section02">
				<!-- p class="open_info_modify"><a href="#"><span>open</span></a></p-->
				<div class="planar_sec01">
					<p class="planar_sec01_tit">건물전체 입체도</p>
				</div>
				<div class="planar_sec02">
					<div class="planar_sec02box">
						<div class="planar_sec02box_c"></div>
						<div id="va-accordion" class="va-container">
							<div class="va-nav">
								<span class="va-nav-prev"><img src="/img/idm/btn_arrtop.gif" alt="위로" /></span>
								<span class="va-nav-next"><img src="/img/idm/btn_arrbottom.gif" alt="아래로" /></span>
							</div>
							<div class="va-wrapper"><!-- 입체도 영역 --></div>
						</div>

						<script type="text/javascript" src="/js/indoor/libs/jquery.easing.1.3.js"></script>
<!-- 						<script type="text/javascript" src="/js/indoor/libs/jquery.mousewheel.js"></script> -->
						<script type="text/javascript" src="/js/indoor/libs/jquery.vaccordion.js"></script>
					</div>
				</div>
				<div class="planar_sec03">
					<div style="position: absolute; top: 370px; right: 105px;">
						<div style="width: 12px; height: 12px; background: #fff0f2; float: left; margin-top: 2px; border: solid 1px;"></div>
						<div style="font-size: 11px; width: 150px; margin-right: -60px; margin-top: 2px;">&nbsp;평면도</div>
					</div>
					<div style="position: absolute; top: 370px; right: 40px;">
						<div style="width: 12px; height: 12px; background: #fff; float: left; margin-top: 2px; border: solid 1px;"></div>
						<div style="font-size: 11px; width: 150px; margin-right: -60px; margin-top: 2px;">&nbsp;정면도</div>
					</div>
				</div>
			</div>
		</div>
		<!-- //( planar_sectionc ) -->

		<!-- ( planar_sectionb ) -->
		<div class="planar_sectionb">
			<div class="planar_section01">
				<p class="open_info_modify"><a href="#"><span>open</span></a></p>
				<div class="planar_sec01">
					<p class="planar_sec01_tit">업종별 사업체</p>
				</div>
				<div class="planar_sec02">
					<div class="planar_sec02box">

						<div id="planar_select01_b" class="planar_select01">
							
						</div>

						<div id="planar_select02_b" class="planar_select02">
							
						</div>

					</div>
				</div>
			</div>

			<div class="planar_section02">
				<div class="planar_sec01">
					<p class="planar_sec01_tit">건물전체 업종 분포도</p>
				</div>
				<div class="planar_sec02">
					<div class="planar_sec02box">

						<div id="container" style="min-width: 230px; height: 205px; max-width: 250px;"></div>

					</div>
					<div class="planar_sec02_chart"></div>
				</div>
			</div>
		</div>
		<!-- //( planar_sectionb ) -->

	</div>
</div>
<!-- //( pop_planar ) -->


<script src="/js/indoor/libs/highcharts.js"></script>
<script src="/js/indoor/libs/exporting.js"></script>
</body>
</html>