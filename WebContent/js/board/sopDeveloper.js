/**
 * 개발자 소개페이지
 * 
 * history : 네이버시스템(주), 1.0, 2015/01/21  초기 작성
 * author : 이동형
 * version : 1.0
 * see : 
 *
 */


(function(W, D) {
	//"use strict";

	W.$sopDeveloper = W.$sopDeveloper || {};

	
	$(document).ready(
			function() {					
				$("#DEV_01").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>JIT(Just In Time)</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 다양한 샘플을 제공하여 실시간으로 API를 테스트할 수 있습니다.<br>" +								          		
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
				$("#DEV_02").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>제공 API소개</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> JavaScript, Open API의 주요기능 및 API 정의 내용, 사용예제에 대해 확인할 수 있습니다.<br>" +								          										          	
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
				$("#DEV_03").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>인증키 발급 및 신청</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> API를 활용하기 위한 인증키 발급절차와 인증키 신청방법에 대하여 확인할 수 있습니다.<br>" +												
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
				$("#DEV_04").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>Q&A</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 공지사항, 질문과 답변, 자주하는 질문 등에 대한 개발자 커뮤니티 기능을 제공합니다.<br>" +								          										          	
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
				$("#DEV_05").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>제공 API소개</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> JavaScript, Open API의 주요기능 및 API 정의 내용, 사용예제에 대해 확인할 수 있습니다.<br>" +								          										          	
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
				$("#DEV_06").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>JIT(Just In Time)</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 다양한 샘플을 제공하여 실시간으로 API를 테스트할 수 있습니다.<br>" +								          										          	
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
				$("#DEV_07").tooltip({
					items: "div",
					position : {my: "left+12 top-15"},
					track: true,
					tooltipClass : "layer_alarm_pop",
					show: { effect: "none", duration: 800 },
					content : function() {
						var html =  "<div class='layer_alarm_pop'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>Q&A</font><br>" +
											"<div style='margin-left:5px;'>" +
											"<p>" +
												"<font size='3' style='font-weight: bold;'></font> 공지사항, 질문과 답변, 자주하는 질문 등에 대한 개발자 커뮤니티 기능을 제공합니다.<br>" +											
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