/**
 * 창업통계맵 소개페이지
 * 
 * history : 네이버시스템(주), 1.0, 2015/01/21  초기 작성
 * author : 이동형
 * version : 1.0
 * see : 
 *
 */


(function(W, D) {
	//"use strict";

	W.$sopBizstatmap = W.$sopBizstatmap || {};

	
	$(document).ready(
			function() {					
				$("#BIZ_01").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지역검색용 통계 조건 설정창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지역 검색을 위해 사용자가 원하는 세부 통계 조건을 설정합니다.<br> 검색 통계 조건을 설정한 뒤, “설정내용 버튼담기” 를 클릭하여<br> 통계버튼을 생성해야 합니다.<br>" +								          		
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_02").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>통계 버튼 바구니</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 생성된 통계버튼을 모아놓는 곳이며 각 통계 버튼을 지도 위 원하는<br> 지역에 “드래그 앤드 드롭”하여 조건에 해당되는 지역을 검색합니다.<br>" +
								          		"<font size='3' style='font-weight: bold;'></font> 생성해 놓은 통계버튼은 검색을 위해 원하는 조건을 다시 생성해야 하는 불편함을 해소해 줍니다.<br>" +								          		
								          		"<font size='3' style='font-weight: bold;'></font> 삭졔 : 생성된 버튼을 삭제<br>" +								          		
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_03").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>범례창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 지도에 시각화된 데이터의 범례이며 사용자 설정을 통해<br> 원하는 범례단계, 색상, 등위별 적용기준을 설정할 수 있습니다.<br>" +								          										          	
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_04").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>시계열 컨트롤러</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 해당 통계항목의 년도별 데이터를 선택, 조회합니다. <br>플레이버튼은 연도별 데이터를 자동적으로 불러와<br> 순서대로 표출합니다.<br>" +								          										          	
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_05").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>사용자 영역/주요상권정보창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>맵 부가기능 내 사용자 영역설정을 통해 사용자가 직접 그린 영역 내 통계정보를 조회할 수 있습니다.<br>" +
												"<font size='3' style='font-weight: bold;'></font>지역상권정보 On시 지도 상의 상권을 선택하면 상권 내 사업체 통계정보를 조회할 수 있습니다.<br>" +
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_06").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>종합정보창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지역종합현황창 : 인구, 주택, 가구, 사업체 등 창업과 연관된 주요정보들을<br> 방사형 그래프를 통해 종합적으로 제공합니다.<br>" +
												"<font size='3' style='font-weight: bold;'></font>지역특성정보창 : 인구특성, 주택 및 가구 특성, 사업체 업력 및 증감률 등의<br> 통계 정보를 상위지역간 비교 그래프를 통해 보다 자세하게 제공합니다.<br>" +
												"<font size='3' style='font-weight: bold;'></font>주택동향정보창 : 국토부에서 제공하고 있는 주택 시세, 거래량 등의 통계<br>정보를 통해 지역 구매력과 연관된 정보를 비교, 확인할 수 있습니다.<br>" +
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "445px");
				    }
				});
				$("#BIZ_07").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>사용자 부가 기본기능</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지역상권정보 : 중소기업청에서 제공하는 1,200대 주요 상권영역을 표시(on/off)합니다.<br>" +
												"<font size='3' style='font-weight: bold;'></font>데이터업로드 : 개인이 수집한 데이터를 지도위에 표시할 수 있습니다.<br>" +
												"<font size='3' style='font-weight: bold;'></font>초기화 : 현재 지도 화면을 초기화 합니다.<br>" +												
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_08").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지도 다중뷰</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>다양한 조회/비교가 가능하도록<br> 지도 화면을 좌/우로 분할합니다.<br>" +												
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_09").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지도 컨트롤</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지도의 이동, 확대/축소를 위한 도구이며,<br> 마우스를 이용해서도 컨트롤이 가능합니다.<br> 표시되는 지역은 지도 화면의 중심 좌표에<br> 해당되는 지역 명으로 자동 표시됩니다.<br>" +												
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_09_1").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지도 컨트롤</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지도의 이동, 확대/축소를 위한 도구이며,<br> 마우스를 이용해서도 컨트롤이 가능합니다.<br> 표시되는 지역은 지도 화면의 중심 좌표에<br> 해당되는 지역 명으로 자동 표시됩니다.<br>" +												
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				$("#BIZ_09_2").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지도 컨트롤</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지도의 이동, 확대/축소를 위한 도구이며,<br> 마우스를 이용해서도 컨트롤이 가능합니다.<br> 표시되는 지역은 지도 화면의 중심 좌표에<br> 해당되는 지역 명으로 자동 표시됩니다.<br>" +												
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "400px");
				    }
				});
				
				$("#BIZ_10").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지도 부가 기능</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지도 상에서 사용자가 원하는 범위의 측정, 영역조회, POI표시 기능을 제공합니다.<br>" +																								
												"<font size='3' style='font-weight: bold;'></font>사용자 범위 측정 : 면적 및 거리 측정.<br>" +
												"<font size='3' style='font-weight: bold;'></font>사용자 영역 조회 : 원, 사각형, 다각형 등 사용자가 그린 영역에 대한 통계 조회<br>" +
												"<font size='3' style='font-weight: bold; margin-left:104px; '></font>단, 현재 표출된 통계항목의 데이터 조회<br>" +
												"<font size='3' style='font-weight: bold;'></font>POI : 사업체, 시설, 기타 등 위치 정보 조회.<br>" +
												"<font size='3' style='font-weight: bold;'></font>삭제 : 지도상에 표시된 사용자 영역 또는 POI 해제.<br>" +
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "600px");
				    }
				});
				$("#BIZ_11").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>미니맵</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지역 검색 결과를 지도 형태로 제공합니다. <br>지역검색 결과 중 다른 지역 선택(이동) 및<br> 통계 조회를 위한 편의성을 제공합니다.<br>" +												
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "600px");
				    }
				});
				
	});
	$(function () {
		  $("#imstep1").click(function() {
			    $("#step0").hide();
			    var src = ($(this).attr("src") === "/img/nm/CM STEP1-2.png")? "/img/nm/CM STEP1-2.png" : "/img/nm/CM STEP1-2.png";
	 			  $(this).attr("src", src);
	 			  for(var i=2; i<7; i++){
	 				 $("#imstep"+i).attr("src", "/img/nm/CM STEP"+i+"-1.png");  
	 			  } 	 											
				var html = "<div id='step0'>"+				
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"맵 컨트롤러나 마우스를 이용하여 조회하기 원하는 지역으로 이동하고 지도 레벨을 조정하면 지역 경계가 표출됩니다.<br>"+
				"창업통계 맵에서는 현재 지도의 (화면)중심 좌표와 지도 레벨에 따라 전국, 시/도, 시/군/구, 읍/면/동, 집계구 단위의"+
				"지역 경계가 자동으로 표출됩니다.</h1><br>"+
				"<img src='/img/nm/cm_step_1.jpg' alt='' />";				
				$("#step1").html(html);
				var html = "<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>(서울특별시를 중심으로 지도를 이동하고 레벨을 조절하여, 서울특별시 내에서 통계버튼을 드래그 앤드 드롭 할 수 있는 대상인 '구'경계가 나와있는 예)</h1>";
				$("#step1").append(html);
		      
		  });
		  $("#imstep2").click(function() {
			    $("#step0").remove();			    
			    var src = ($(this).attr("src") === "/img/nm/CM STEP2-2.png")? "/img/nm/CM STEP2-2.png" : "/img/nm/CM STEP2-2.png";
 			    $(this).attr("src", src);
 			    $("#imstep1").attr("src", "/img/nm/CM STEP1-1.png");
 			    for(var i=3; i<7; i++){
 			 	 $("#imstep"+i).attr("src", "/img/nm/CM STEP"+i+"-1.png");  
 			    } 			    
				var html = "<div id='step0'>"+				
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"검색조건 설정 창에서 지역 검색에 필요한 세부 통계조건을 선택합니다."+
				"('검색 대상지역 설정'과 '지역 검색조건 설정'의 순서는 무관합니다.)</h1><br>"+
				"<img src='/img/nm/cm_step_2.jpg' alt='' />";
				$("#step1").html(html);
		  });
		  $("#imstep3").click(function() {
			    $("#step0").remove();			    
 			    $("#imstep3").attr("src", "/img/nm/CM STEP3-2.png"); 			     
 			    $("#imstep1").attr("src", "/img/nm/CM STEP1-1.png");
 			    $("#imstep2").attr("src", "/img/nm/CM STEP2-1.png");
 			    $("#imstep4").attr("src", "/img/nm/CM STEP4-1.png");
 			    $("#imstep5").attr("src", "/img/nm/CM STEP5-1.png");
  			    $("#imstep6").attr("src", "/img/nm/CM STEP6-1.png");   			    			  				
				var html = "<div id='step0'>"+
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+				
				"검색 조건을 설정했다면 '설정내용 버튼담기' 버튼을  눌러 통계버튼을 생성합니다."+
				"통계버튼은 하단 통계바구니에 생성되며, 통계 종류와 상관없이 계속<br> 추가가 가능합니다.</h1><br>"+
				"<img src='/img/nm/cm_step_3.jpg' alt='' />";
				$("#step1").html(html);
		  });
		  $("#imstep4").click(function() {
			  $("#step0").remove();
				$("#imstep4").attr("src", "/img/nm/CM STEP4-2.png");
				$("#imstep1").attr("src", "/img/nm/CM STEP1-1.png");
 			    $("#imstep2").attr("src", "/img/nm/CM STEP2-1.png");
 			    $("#imstep3").attr("src", "/img/nm/CM STEP3-1.png");
 			    $("#imstep5").attr("src", "/img/nm/CM STEP5-1.png");
  			    $("#imstep6").attr("src", "/img/nm/CM STEP6-1.png");
				var html = "<div id='step0'>"+
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"통계 버튼을 드래그하여 원하는 지역에 드롭 합니다. "+
				"원하는 지역으로 드래그하여 해당 지역의 경계선 색상이 파란색으로 변경되면 이때 드롭합니다."+
				"<br> 단, '우리동네 생활업종'에서는 통계 버튼을 내려 놓을 수 있는 지역 단위가 시/도 또는 시/군/구로 제한됩니다.</h1><br>"+	//2016.03.18 수정
				"<img src='/img/nm/cm_step_4.jpg' alt='' />";
				$("#step1").html(html);
		  });
		  $("#imstep5").click(function() {
			  $("#step0").remove();
				$("#imstep5").attr("src", "/img/nm/CM STEP5-2.png");
				$("#imstep1").attr("src", "/img/nm/CM STEP1-1.png");
 			    $("#imstep2").attr("src", "/img/nm/CM STEP2-1.png");
 			    $("#imstep3").attr("src", "/img/nm/CM STEP3-1.png");
 			    $("#imstep4").attr("src", "/img/nm/CM STEP4-1.png");
  			    $("#imstep6").attr("src", "/img/nm/CM STEP6-1.png");
				var html = "<div id='step0'>"+
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"통계버튼이 놓인 지역내 하위 행정구역 단위로 검색 결과가 제공됩니다."+
				"통계가 시각화 되어있는 지역 및 그 이외 지역 어디라도 통계버튼을 다시 드래그 앤드 드롭하여 조회가 가능합니다. "+
				"단, 동일 혹은 상위 행정구역을 대상으로 다시 검색하기 위해서는 지역 경계를 재설정(STEP 1)해야 합니다.</h1><br>"+
				"<img src='/img/nm/cm_step_5.jpg' alt='' />";
				$("#step1").html(html);
				var html = "<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>(서울특별시 성동구에 통계버튼(거주인구비율이 높은, 20, 30대 비율이 높은)을 드래그 앤드 드롭하여 조건에 해당하는 지역이 결과로 표시 된 예)</h1>";
				$("#step1").append(html);
		  });
		  $("#imstep6").click(function() {
			  $("#step0").remove();
				$("#imstep6").attr("src", "/img/nm/CM STEP6-2.png");
				$("#imstep1").attr("src", "/img/nm/CM STEP1-1.png");
 			    $("#imstep2").attr("src", "/img/nm/CM STEP2-1.png");
 			    $("#imstep3").attr("src", "/img/nm/CM STEP3-1.png");
 			    $("#imstep4").attr("src", "/img/nm/CM STEP4-1.png");
  			    $("#imstep5").attr("src", "/img/nm/CM STEP5-1.png");
				var html = "<div id='step0'>"+
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"검색 결과 중 선택한 지역 내 하위 행정구역 단위로 시각화된 통계가 제공됩니다."+
				"또한 미니맵을 통해 검색 조건과 유사한 지역(검색 결과)으로 이동하여 통계 조회가 가능합니다.</h1><br>"+
				"<img src='/img/nm/cm_step_6.jpg' alt='' />";
				$("#step1").html(html);
				var html = "<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>(서울특별시 성동구에서 검색된 결과 중 하나(행당2동)를 선택하여 통계를 조회하는 예)</h1>";
				$("#step1").append(html);
		  });
		  $("#imstep7").click(function() {
			    $("#step2").remove();
			    var src = ($(this).attr("src") === "/img/nm/DU STEP1-2.png")? "/img/nm/DU STEP1-2.png" : "/img/nm/DU STEP1-2.png";
			    $(this).attr("src", src); 			
			    $("#imstep8").attr("src", "/img/nm/DU STEP2-1.png");
			    $("#imstep9").attr("src", "/img/nm/DU STEP3-1.png");
			    $("#imstep10").attr("src", "/img/nm/DU STEP4-1.png");
			    $("#imstep11").attr("src", "/img/nm/DU STEP5-1.png");			    
				var html =
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"'데이터 업로드' 버튼을 클릭하여 데이터 파일을 선택하고 업로드 합니다."+
				"업로드 할 파일은 제공되는 양식에 맞게 입력되어 있어야 합니다.<br></h1><br>"+			
				"<img src='/img/nm/du_step_1.jpg' alt='' />";
				$("#step3").html(html);
		  });
		  $("#imstep8").click(function() {
			    $("#step2").remove();
			    var src = ($(this).attr("src") === "/img/nm/DU STEP2-2.png")? "/img/nm/DU STEP2-2.png" : "/img/nm/DU STEP2-2.png";
			    $(this).attr("src", src); 			
			    $("#imstep7").attr("src", "/img/nm/DU STEP1-1.png");
			    $("#imstep9").attr("src", "/img/nm/DU STEP3-1.png");
			    $("#imstep10").attr("src", "/img/nm/DU STEP4-1.png");
			    $("#imstep11").attr("src", "/img/nm/DU STEP5-1.png");			    								
				var html = 
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"'위치정보조회' 버튼을 클릭하여 좌표 변환을 수행합니다.<br><br></h1>"+					
				"<img src='/img/nm/du_step_2.jpg' alt='' />";
				$("#step3").html(html);
		  });
		  $("#imstep9").click(function() {
			    $("#step2").remove();
			    var src = ($(this).attr("src") === "/img/nm/DU STEP3-2.png")? "/img/nm/DU STEP3-2.png" : "/img/nm/DU STEP3-2.png";
			    $(this).attr("src", src); 			
			    $("#imstep7").attr("src", "/img/nm/DU STEP1-1.png");
			    $("#imstep8").attr("src", "/img/nm/DU STEP2-1.png");
			    $("#imstep10").attr("src", "/img/nm/DU STEP4-1.png");
			    $("#imstep11").attr("src", "/img/nm/DU STEP5-1.png");			  				
				var html =
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"좌표 변환이 되지 않는 항목을 클릭하여 좌표 변환을 재 실행하거나 사용자가 직접 좌표를 지정할 수 있습니다. "+
				"단, 변환실패 항목에 대해서만 좌표<br> 지정이 가능합니다.</h1><br>"+					
				"<img src='/img/nm/du_step_3.jpg' alt='' />";
				$("#step3").html(html);
		  });
		  $("#imstep10").click(function() {
			    $("#step2").remove();
			    var src = ($(this).attr("src") === "/img/nm/DU STEP4-2.png")? "/img/nm/DU STEP4-2.png" : "/img/nm/DU STEP4-2.png";
			    $(this).attr("src", src); 			
			    $("#imstep7").attr("src", "/img/nm/DU STEP1-1.png");
			    $("#imstep8").attr("src", "/img/nm/DU STEP2-1.png");
			    $("#imstep9").attr("src", "/img/nm/DU STEP3-1.png");
			    $("#imstep11").attr("src", "/img/nm/DU STEP5-1.png");			    			
				var html =
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"'지도에서찾기'를 선택한 경우, 지도를 원하는 지점으로 이동하여 좌표를 지정합니다. "+
				"화면 중앙에 포인트가 표시되어 있으며 원하는 지점에 포인트가<br> 위치하도록 지도를 이동합니다.</h1><br>"+					
				"<img src='/img/nm/du_step_4.jpg' alt='' />";
				$("#step3").html(html);
		  });
		  $("#imstep11").click(function() {
			    $("#step2").remove();
			    var src = ($(this).attr("src") === "/img/nm/DU STEP5-2.png")? "/img/nm/DU STEP5-2.png" : "/img/nm/DU STEP5-2.png";
 			    $(this).attr("src", src); 			
			    $("#imstep7").attr("src", "/img/nm/DU STEP1-1.png");
			    $("#imstep8").attr("src", "/img/nm/DU STEP2-1.png");
			    $("#imstep9").attr("src", "/img/nm/DU STEP3-1.png");
			    $("#imstep10").attr("src", "/img/nm/DU STEP4-1.png");				
				var html =
				"<h1 class='itit' style='font-size: 14px;padding2px; font-weight: normal;padding: 2px;'>"+
				"'위치보기on'를 클릭하여 지도상에 사용자 데이터를 표시합니다."+
				"(시각화가 되어 있을때는 위치보기on 버튼이 off로 변경됩니다.)<br>"+
				"인구, 사업체 등의 통계청 데이터가 지도에 시각화 되어있는 상태에서도 사용자 데이터 시각화(조회)가 가능합니다.</h1><br>"+					
				"<img src='/img/nm/du_step_5.jpg' alt='' />";
				$("#step3").html(html);
		  });
		});	

}(window, document));