/**
 * 통계주제도 소개페이지
 * 
 * history : 네이버시스템(주), 1.0, 2015/01/21  초기 작성
 * author : 이동형
 * version : 1.0
 * see : 
 *
 */


(function(W, D) {
	//"use strict";

	W.$sopThemeticmap = W.$sopThemeticmap || {};

	
	$(document).ready(
			function() {					
				$("#THEME_01").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>주제도 네비게이터</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 주제도 메인 카테고리 혹은 카테고리별 주제도 목록 조회를 통해<br> 해당 주제도로 이동할 수 있습니다.<br>" +								          		
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
				$("#THEME_02").tooltip({
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
												"<font size='3' style='font-weight: bold;'></font> 선택하신 주제도에 해당하는 데이터의 범례범위 혹은 POI(시설또는<br> 사업체) 범례를 확인하실 수 있습니다.<br>" +
								          		"<font size='3' style='font-weight: bold;'></font> 사용자 설정을 통해 원하는 범례단계, 색상, 등위별 적용기준을 설정<br>할 수 있습니다.<br> 지도 위 마우스의 위치에 따라 해당되는 지역의 범례 값이 자동 표시됩니다.<br>" +								          	
								          	"</p>" +
											"</div>" +
									    "</p>" +
								    "</div>" +
								    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

						return html;
					},
					open: function (event, ui) {
				        ui.tooltip.css("max-width", "420px");
				    }
				});
				$("#THEME_03").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지역 통계정보</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 마우스 포인트에 따라 해당 지역의 명칭 및 해당 데이터 세부값이<br> 툴팁 형식으로 표출됩니다.<br>" +
												"<font size='3' style='font-weight: bold;'></font> 특히 주제도 유형에 따라 일반통계값, 연평균 증감값 혹은 POI 정보<br>(지도 확대 시)를 표출하거나 다중뷰를 통해 지역별 혹은 연도별<br> 데이터 값을 비교할 수 있습니다.<br>" +
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
				$("#THEME_04").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>세부 데이터창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 주제도 유형에 따라 지역별 세부 데이터를 그래프로 제공하여<br> 손쉬운 데이터 비교 및 확인이 가능합니다.<br>" +								          										          	
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
				$("#THEME_05").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>지역선택창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 조회된 해당 통계 데이터의 세부 구역(지역) 별 <br>수치를 제공합니다.<br>" +								          										          	
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
				$("#THEME_06").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>주제도 설명창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>선택하신 주제도 명, 특성 외에도 해당 주제도에 적용된 데이터의<br> 출처 및 주제도의 내용, 주제도 내 결과의 다양한 조회방법 등을<br> 확인할 수 있습니다.<br>" +								          										          	
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
				$("#THEME_06_1").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>주제도 설명창</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>선택하신 주제도 명, 특성 외에도 해당 주제도에 적용된 데이터의<br> 출처 및 주제도의 내용, 주제도 내 결과의 다양한 조회방법 등을<br> 확인할 수 있습니다.<br>" +								          										          	
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
				
				$("#THEME_07").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>맵 컨트롤러</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font>지도 확대 및 축소를 통해 지도 경계레벨에 따른 지역 통계정보를<br> 조회 및 지역별 이동이 가능합니다.<br>" +											
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
				
	});


}(window, document));