/**
 * 맵 부가기능 에 관한 공통 메소드
* 
* history : 네이버시스템(주), 1.0, 2014/08/25  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
 */
(function(W, D) {
	//"use strict";
	
	W.$mapInfo = W.$mapInfo || {};
	
	$(document).ready(function() {
		
		$.cssHooks.backgroundColor = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["backgroundColor"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("background-color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
		
		$.cssHooks.color = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["color"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
	});
	
	sMapInfo = {
			mapInfo : function(map){
				var that = this;
				this.delegate = null;
				this.map = map;
				this.id = null;
				this.barChartObj = null;									// 막대차트 Object
				this.pieChartObj = null;									// 파이차트 Object
				this.legendObj = null;										// 범례 Object
				this.rentalLegendObj = null;								//권리금 Object
				this.minimapObj = null;									// 미니맵 Object
				this.timeSeriesObj = null;										// 시계열 Object
				this.infoUserUploadObj = null;								//사용자지정 업로드 Object
				this.legendColorObj = null;									// 범례설정 Object
				this.userLegendObj = null;									//사용자지정 범례 Object
				this.foreGiftObj = null,										// 권리금 Object
				this.searchTitleObj = null;											// 타이틀 Object
				this.legendColor1 = "#ffddd7";								// 범례 색상1
				this.legendColor2 = "#ffb2a5";								// 범례 색상2
				this.legendColor3 = "#ff806c";								// 범례 색상3
				this.legendColor4 = "#ff593f";								// 범례 색상4
				this.legendColor5 = "#ff2400";								// 범례 색상5
				this.selectSeriesYear = "";										//선택한 시계열 년도
				this.yearArray = new Array();									//선택 가능 시계열 년도
				this.timeSeriesPushData = new Array();					//시계열 애니메이션의 정보를 담는 변수
				this.isTimeSeriesPlay = false;							//시계열 애니메이션에서 사용될 정보를 모두 가져왔는지 확인
				this.timeSeriesCnt = 0;									//시계열 도는 횟수
				this.timer = 0;											//타이머
				this.lastChatIndex = null;
				this.curMarker = null;
				this.markerGroup = [];
				this.dataTable = null;
				this.rentalLegendValue = [];
				this.rentalLegendCircle = [17, 35, 47];
				this.rentalLegendColor = ["#e2f1ff", "#badcff", "#7dbdff", "#409eff", "#0880fa"];
				this.rentalLegendType = "auto";
				this.rentalValPerSlice = null;
				this.indicatorCnt = 0;
				
				this.initialize = function(delegate) {					
					//현재 범례를 변수에 저장
					var tmpColors = [
					                 this.legendColor1,
					                 this.legendColor2, 
					                 this.legendColor3, 
					                 this.legendColor4, 
					                 this.legendColor5 ];
					
					this.map.setLegendColor(tmpColors);
					this.delegate = delegate;
					
					var currentdate = new Date();
					this.id = makeStamp(currentdate);
					
				};
				
				//범례 추가
				this.createLegend = function() {
					var infoLegend = sop.control({position: 'bottomleft'});
					infoLegend.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'legend_' +that.id);
					    that.legendObj = this._div;
					    return this._div;
					};
					infoLegend.update = function (props) {
						this._div.innerHTML = "<div class='legend_remark_section'>" +
															"<a class='btn_remark'><img class='rollover' src='/img/im/btn_remarks_off.png' alt='' /></a>" +
															"<div class='remarkbox'>" +
																"<div class='remarkbox_in'>" +
																	"<p class='remarks_tit'>" +
																		"범례" +
																		"<span id='legendUnit_"+that.id+"' class='legend_unit'></span>" +
																		"<a><img class='rollover' src='/img/im/icon_wheel_off.gif' alt='범례설정' title='범례설정' /></a>" +
																	"</p>" +
																	
										
																	"<div class='remarks_list'>" +
																		"<ul>" +
																			"<li><span id='legendColor1_"+that.id+"' style='background: #ffddd7;'>&nbsp;</span><span class='txt' id='legendRange1'>-</span></li>" +
																			"<li><span id='legendColor2_"+that.id+"' style='background: #ffb2a5;'>&nbsp;</span><span class='txt' id='legendRange2'>-</span></li>" +
																			"<li><span id='legendColor3_"+that.id+"' style='background: #ff806c;'>&nbsp;</span><span class='txt' id='legendRange3'>-</span></li>" +
																			"<li><span id='legendColor4_"+that.id+"' style='background: #ff593f;'>&nbsp;</span><span class='txt' id='legendRange4'>-</span></li>" +
																			"<li><span id='legendColor5_"+that.id+"' style='background: #ff2400;'>&nbsp;</span><span class='txt' id='legendRange5'>-</span></li>" +
																		"</ul>" +
																	"</div>" +
										
																	"<a class='btn_remark_offset'><img class='rollover' src='/img/im/icon_arrow_remark_off.gif' alt='최소화' title='최소화' /></a>" +
																"</div>" +
															"</div>" +
														"</div>";
					};
					infoLegend.addTo(this.map.gMap);
					
					//remark layer
					$("#legend_"+this.id).find(".btn_remark").click(function(){
						$("#legend_"+that.id).find(".remarkbox").show();
					});
					$("#legend_"+this.id).find(".btn_remark_offset").click(function(){
						$("#legend_"+that.id).find(".remarkbox").hide();
						$("#legendColor_"+that.id).find(".remarks_option").hide();
						$('#legendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#legendColor_'+that.id).find('.color-box2').colpick().colpickHide();
						$("#userLegend_"+that.id).find(".remarksUser_option").hide();
					});
					
					// image rollover
					$("#legend_"+this.id).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//설정창 열기
					$("#legend_"+this.id).find(".remarks_tit > a").click(function(){
						$("#legendColor_"+that.id).find(".remarks_option").show();
						
						//사용자지정 범례창 show/hide
						if($("#legendColor_"+that.id).find("#legend_user").is(":checked")) {
							if ($("#legendColor_"+that.id).find("#legend_user").is(":disabled")) {
								$("#userLegend_"+that.id).find(".remarksUser_option").hide();
							}else {
								$("#userLegend_"+that.id).find(".remarksUser_option").show();
							}	
						}else {
							$("#userLegend_"+that.id).find(".remarksUser_option").hide();
						}
						
						//사용자 범례 설정
						that.userColorChg();
					});
					
					//사용자지정범례 생성
					this.createUserLegend();
					
//					$("#legend_modal").dialog({width: 100, minimize: '#minimizeArea'});
				};
				
				//범례설정 추가
				this.createLegendColor = function() {
					var infoLegendColor = sop.control({position: 'bottomleft'});
					infoLegendColor.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'legendColor_' +that.id);
					    that.legendColorObj = this._div;
					    return this._div;
					};
					infoLegendColor.update = function (props) {
					    this._div.innerHTML = "<div class='remarks_option'>" +
														"<div class='remarks_option_in'>" +
															"<p class='roption_tit'>범례설정</p>" +
															"<table>" +
																"<caption>범례설정</caption>" +
																"<colgroup>" +
																	"<col style='width: 70px;' />" +
																	"<col style='width: ;' />" +
																"</colgroup>" +
																"<tbody>" +
//																	"<tr>" +
//																		"<th scope='row'><span>구간수</span></th>" +
//																		"<td>" +
//																			"<select style='width: 75px;' disabled='true'>" +
//																				"<option>5레벨</option>" +
//																			"</select>" +
//																		"</td>" +
//																	"</tr>" +
																	"<tr>" +
																		"<th style='vertical-align: top;' scope='row'><span>컬러</span></th>" +
																		"<td>" +
																			"<ul>" +
																				"<li>" +
																					"<div class='mixcolorbox'>" +
																						"<input id='radioBWColor' name='setColor_"+that.id+"' type='radio' value='BW' />" +
																						"<span class='color_01'>" +
																							"<span style='background: #eeeeee;'>&nbsp;</span>" +
																							"<span style='background: #cccccc;'>&nbsp;</span>" +
																							"<span style='background: #999999;'>&nbsp;</span>" +
																							"<span style='background: #767676;'>&nbsp;</span>" +
																							"<span style='background: #575757;'>&nbsp;</span>" +
																						"</span>" +
																					"</div>" +
																				"</li>" +
																				"<li>" +
																					"<div class='mixcolorbox'>" +
																						"<input id='radioBlueColor' name='setColor_"+that.id+"' type='radio' value='Blue' />" +
																						"<span class='color_02'>" +
																							"<span style='background: #e2f1ff;'>&nbsp;</span>" +
																							"<span style='background: #badcff;'>&nbsp;</span>" +
																							"<span style='background: #7dbdff;'>&nbsp;</span>" +
																							"<span style='background: #409eff;'>&nbsp;</span>" +
																							"<span style='background: #0880fa;'>&nbsp;</span>" +
																						"</span>" +
																					"</div>" +
																				"</li>" +
																				"<li>" +
																					"<div class='mixcolorbox'>" +
																						"<input id='radioRedColor' name='setColor_"+that.id+"' type='radio' checked='checked' value='Red' />" +
																						"<span class='color_03'>" +
																							"<span style='background: #ffddd7;'>&nbsp;</span>" +
																							"<span style='background: #ffb2a5;'>&nbsp;</span>" +
																							"<span style='background: #ff806c;'>&nbsp;</span>" +
																							"<span style='background: #ff593f;'>&nbsp;</span>" +
																							"<span style='background: #ff2400;'>&nbsp;</span>" +
																						"</span>" +
																					"</div>" +
																				"</li>" +
																				"<li>" +
																					"<input id='radioMixColor' name='setColor_"+that.id+"' type='radio' value='Mix' /> " +
																					"Mixed Color" +
																				"</li>" +
																			"</ul>" +
								
																			"<div class='colpick_area'>" +
																				"<div class='colpick_cont'>" +
																					"<div class='color-box'></div>" +
																					"<span class='colpick_gradation'>" +
																						"<span style='background: #fee7e5;'>&nbsp;</span>" +
																						"<span style='background: #feb7b2;'>&nbsp;</span>" +
																						"<span style='background: #fe887f;'>&nbsp;</span>" +
																						"<span style='background: #fe584c;'>&nbsp;</span>" +
																						"<span style='background: #fe291a;'>&nbsp;</span>" +
																					"</span>" +
																					"<div class='color-box2' style='float: right;'></div>" +
																				"</div>" +
																			"</div>" +
								
																		"</td>" +
																	"</tr>" +
																	"<tr>" +
																		"<th scope='row'><span>분류</span></th>" +
																		"<td>" +
																			"<input type='radio' name='selectEvenLegend_"+that.id+"' id='legend_auto' value='auto' checked='checked' /> 자동범례 &nbsp;&nbsp;" +
																			"<input type='radio' name='selectEvenLegend_"+that.id+"' id='legend_equal' value='equal' /> 균등범례<br/><br/>" +
																			"<input type='radio' name='selectEvenLegend_"+that.id+"' id='legend_user' value='user'/> 사용자정의범례" +
																		"</td>" +
																	"</tr>" +
																"</tbody>" +
															"</table>" +
															"<div class='btn_roption'>" +
																"<a id='legendApply' class='bg_blue'>적용</a>" +
																"<a id='legendClosed'>취소</a>" +
															"</div>" +
														"</div>" +
														"<span class='arrow_remark'><img src='/img/im/icon_arrow.png' alt='' /></span>" +
														"<a class='remark_btn_close'><img src='/img/im/btn_layer_close.gif' alt='close' /></a>" +
													"</div>";
					};
					infoLegendColor.addTo(this.map.gMap);
					
					//X버튼 누르기
					$("#legendColor_"+this.id).find(".remark_btn_close").click(function(){
						$("#legendColor_"+that.id).find(".remarks_option").hide();
						$('#legendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#legendColor_'+that.id).find('.color-box2').colpick().colpickHide();
						$(that.userLegendObj).find(".remarksUser_option").hide();
						that.updateUserLegend();
					});
					
					//범례적용
					$("#legendColor_"+this.id).find("#legendApply").click(function(){
						that.colorApply();
					});
					
					//범례닫기
					$("#legendColor_"+this.id).find("#legendClosed").click(function(){
						$("#legendColor_"+that.id).find(".remarks_option").hide();
						$('#legendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#legendColor_'+that.id).find('.color-box2').colpick().colpickHide();
						$(that.userLegendObj).find(".remarksUser_option").hide();
						that.updateUserLegend();
					});
					
					//사용자정의 범례
					$("#legendColor_"+this.id).find("input[type=radio][name=selectEvenLegend_"+this.id+"]").change(function() {
						if (this.id != "legend_user") {
							$("#userLegend_"+that.id).find(".remarksUser_option").hide();
						}
					});
					
					//사용자정의 범례
					$("#legendColor_"+this.id).find("#legend_user").click(function() {
						$("#userLegend_"+that.id).find(".remarksUser_option").show();
						that.updateUserLegend();
					});
					
				};
				
				//범례설정 추가
				this.createUserLegend = function() {
					var userLegendColor = sop.control({position: 'bottomleft'});
					userLegendColor.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'userLegend_' +that.id);
					    that.userLegendObj = this._div;
					    return this._div;
					};
					userLegendColor.update = function (props) {
					    this._div.innerHTML = "<div class='remarksUser_option'>" +
														"<div class='remarks_option_in'>" +
															"<p class='roption_tit'>사용자정의범례 설정</p>" +
															"<table border=1 style='text-align:center;width:220px;margin:auto'>" +
																"<thead>" +
																	"<tr style='height:30px;background-color:#eeeeee'>" +
																		"<td style='width:30px;font-size:11px;'>구간</td>" +
																		"<td style='font-size:11px;'>이상</td>" +
																		"<td style='font-size:11px;'>미만</td>" +
																	"</tr>" +
																"</thead>" +
																"<tbody>" +
																	"<tr>" +
																		"<td>1</td>" +
																		"<td>-</td>" +
																		"<td><input id='legend_1_2' type='text' value='100' /></td>" +
																	"</tr>" +
																	"<tr>" +
																		"<td>2</td>" +
																		"<td><input id='legend_2_1' type='text' value='100' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
																		"<td><input id='legend_2_2' type='text' value='200'/></td>" +
																	"</tr>" +
																	"<tr>" +
																		"<td>3</td>" +
																		"<td><input id='legend_3_1' type='text' value='200' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
																		"<td><input id='legend_3_2' type='text' value='300'/></td>" +
																	"</tr>" +
																	"<tr>" +
																		"<td>4</td>" +
																		"<td><input id='legend_4_1' type='text' value='300' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
																		"<td><input id='legend_4_2' type='text' value='400'/></td>" +
																	"</tr>" +
																	"<tr>" +
																		"<td>5</td>" +
																		"<td><input id='legend_5_1' type='text' value='400' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
																		"<td>-</td>" +
																	"</tr>" +
																"</tbody>" +
															"</table>" +
														"</div>" +
														"<a class='remark_btn_close'><img src='/img/im/btn_layer_close.gif' alt='close' /></a>" +
													"</div>";
					};
					userLegendColor.addTo(this.map.gMap);
					
					//X버튼 누르기
					$("#userLegend_"+this.id).find(".remark_btn_close").click(function(){
						$("#userLegend_"+that.id).find(".remarksUser_option").hide();
					});
					
					//범례닫기
					$("#userLegend_"+this.id).find("#legendClosed").click(function(){
						$("#userLegend_"+that.id).find(".remarksUser_option").hide();
					});
					
					//범례적용
					$("#userLegend_"+this.id).find("#legendApply").click(function(){
					});
					
					$("#userLegend_"+this.id).find("input").keypress(function(e) {
						return numbersonly(e, this.value, true);
					}) ;
					
					var isKeypress = true;
					$("#userLegend_"+this.id).find("input").keyup(function(e) {
						if (this.id == "legend_1_2") {
							if (parseFloat(this.value) >= parseFloat($("#legend_2_2").val())) {
								if (isKeypress) {
									messageAlert.open(
											"알림",
											$("#legend_2_2").val() + " 보다 같거나 클수없습니다.",
											function done() {
												$("#legend_1_2").val(that.map.legendValue.user[0][0]);
												$("#legend_2_1").val(that.map.legendValue.user[0][0]);
												isKeypress = true;
											}
									);
									
								}
								isKeypress = false;

							}else {
								$("#legend_2_1").val(this.value);
							}
						}else if (this.id == "legend_2_2") {
							if (parseFloat(this.value) >= parseFloat($("#legend_3_2").val())) {
								if (isKeypress) {
									messageAlert.open(
											"알림", 
											$("#legend_3_2").val() + " 보다 같거나 클수없습니다.",
											function done() {
												$("#legend_2_2").val(that.map.legendValue.user[0][1]);
												$("#legend_3_1").val(that.map.legendValue.user[0][1]);
												isKeypress = true;
											}
									);
								}
								isKeypress = false;
							}else {
								$("#legend_3_1").val(this.value);
							}
						}else if (this.id == "legend_3_2") {
							if (parseFloat(this.value) >= parseFloat($("#legend_4_2").val())) {
								if (isKeypress) {
									messageAlert.open(
											"알림", 
											$("#legend_4_2").val() + " 보다 같거나 클수없습니다.",
											function done() {
												$("#legend_3_2").val(that.map.legendValue.user[0][2]);
												$("#legend_4_1").val(that.map.legendValue.user[0][2]);
												isKeypress = true;
											}
									);
								}
								isKeypress = false;
							}else {
								$("#legend_4_1").val(this.value);
							}
						}else if (this.id == "legend_4_2") {
							$("#legend_5_1").val(this.value);
						}
					});
					
					var isKeypress2 = true;
					$("#userLegend_"+this.id).find("input").change(function(e) {
						 if (this.id == "legend_2_2") {
							if (parseFloat(this.value) <= parseFloat($("#legend_2_1").val())) {
								if (isKeypress2) {
									messageAlert.open(
											"알림", 
											$("#legend_2_1").val() + " 보다 같거나 작을 수 없습니다.",
											function done() {
												$("#legend_2_2").val(that.map.legendValue.user[0][1]);
												$("#legend_3_1").val(that.map.legendValue.user[0][1]);
												isKeypress2 = true;
											}
									);
								}
								isKeypress2 = false;
							}
						}else if (this.id == "legend_3_2") {
							if (parseFloat(this.value) <= parseFloat($("#legend_3_1").val())) {
								if (isKeypress2) {
									messageAlert.open(
											"알림", 
											$("#legend_3_1").val() + " 보다 같거나 작을 수 없습니다.",
											function done() {
												$("#legend_3_2").val(that.map.legendValue.user[0][2]);
												$("#legend_4_1").val(that.map.legendValue.user[0][2]);
												isKeypress2 = true;
											}
									);
								}
								isKeypress2 = false;
							}
						}else if (this.id == "legend_4_2") {
							if (parseFloat(this.value) <= parseFloat($("#legend_4_1").val())) {
								if (isKeypress2) {
									messageAlert.open(
											"알림", 
											$("#legend_4_1").val() + " 보다 같거나 작을 수 없습니다.",
											function done() {
												$("#legend_4_2").val(that.map.legendValue.user[0][3]);
												$("#legend_5_1").val(that.map.legendValue.user[0][3]);
												isKeypress2 = true;
											}
									);
								}
								isKeypress2 = false;
							}
						}
					});
					
				};
				
				//원형차트 추가
				this.createPieChart = function() {
					var infoPieChart = sop.control({position: 'topright'});
					infoPieChart.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'pieChart_' +that.id);
					    that.pieChartObj = this._div;
					    return this._div;
					};
					infoPieChart.update = function (props) {
						this._div.innerHTML = 	"<div class='graph_remark_section'>" +
														"<a class='btn_graph'><img class='rollover' src='/img/im/btn_graph_off.png' alt='' /></a>" +
														"<div class='graphbox'>" +
															"<div class='graphbox_in'>" +
																"<p class='graph_txt' title=\"\"></p>" +
																"<p class='graph_tit'></p>" +
																"<div class='graph'>" +
																	"<div id='container_graph'>" +
																		"<div id='pieChartDiv1'></div>"+
																		"<div id='pieChartDiv2'></div>" +
										    							"<div id='pieChartDiv3'></div>" +
																	"</div>" +
																"</div>" +
																"<p class='pieLegend'></p>" +
															"</div>" +
															"<a class='btn_graph_offset'><img class='rollover' src='/img/im/icon_arrow_graph_off.gif' alt='최소화' title='최소화' /></a>" +
														"</div>" +
													"</div>";
					};
					infoPieChart.addTo(this.map.gMap);
					
					// image rollover
					$("#pieChart_"+this.id).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//graph layer
					$("#pieChart_"+this.id).find(".btn_graph").click(function(){
						$("#pieChart_"+that.id).find(".graphbox").show();
					});

					$("#pieChart_"+this.id).find(".btn_graph_offset").click(function(){
						$("#pieChart_"+that.id).find(".graphbox").hide();
					});
					
					$(that.pieChartObj).hide();
				};
				
				//막대차트 추가
				this.createBarChart = function(_position) {
					var poistion = _position ? _position : 'topright';
					var infoBarChart = sop.control({
						position : poistion
					});
					infoBarChart.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div); 
					    this.update();
					    $(this._div).attr("id", 'barChart_' +that.id);
					    that.barChartObj = this._div;
					    return this._div;
					};
					infoBarChart.update = function (props) {
						this._div.innerHTML = 	"<div class='graph_bar_remark_section'>" +
														"<a class='btn_graph_bar'><img class='rollover' src='/img/im/btn_graphplot_off.png' alt='' /></a>" +
														"<div class='graphbox_bar'>" +
															"<div class='graphbox_in'>" +
																"<p class='graph_txt' title=\"\"></p>" +
																"<div class='graph'>" +
																	"<div id='container_graph_bar'>" +
																	"</div>" +
																"</div>" +
															"</div>" +
															"<div id='graphbox_in_link'></div>" +
															"<a class='btn_graph_bar_offset'><img class='rollover' src='/img/im/icon_arrow_graph_off.gif' alt='최소화' title='최소화' /></a>" +
														"</div>" +
													"</div>";
					};
					infoBarChart.addTo(this.map.gMap);
					
					// image rollover
					$("#barChart_"+this.id).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//graph layer
					$("#barChart_"+this.id).find(".btn_graph_bar").click(function(){
						$("#barChart_"+that.id).find(".graphbox_bar").show();
					});

					$("#barChart_"+this.id).find(".btn_graph_bar_offset").click(function(){
						$("#barChart_"+that.id).find(".graphbox_bar").hide();
					});
					
					$(that.barChartObj).hide();
				};
				
				//시계열 설정 추가
				this.createTimeSeries = function() {
					var infoTimeSeries = sop.control({position: 'bottomleft'});
					infoTimeSeries.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'timeSeries_' +that.id);
					    that.timeSeriesObj = this._div;
					    return this._div;
					};
					infoTimeSeries.update = function (props) {
						this._div.innerHTML = "<div class='map_timeseries' style='height: 6px;'>" +
														"<a class='btn_timeseries off'></a>" +
														"<div class='btn_timeseries_text'>시계열</div>" +
														"<div class='timeseries_section' style='display: none;'>" +
															"<a class='stop' id='timeSeriesPlayBtn'><span><img class='rollover' src='/img/im/btn_play_off.gif' alt='' /></span></a>" + //( stop 버튼 )
															"<div class='series_article'>" +
																"<div class='map_ts' id='tableTimeSeries'>" +
//																	"<a class='prev'><img src='/img/im/btn_timeseries_left.gif' alt='' /></a>" + //( 파란색 조절 화살표 )
																	"<ul>" +
																		"<li class='first' style='width: 6.6%;'>" +
																			"<p>2000</p>" +
																			"<em class='on'>&nbsp;</em>" + //( 회색 바  --  class='on' 추가시 활성화 )
																			"<span class='on'>&nbsp;</span>" + //( 회색 원  --  class='on' 추가시 활성화 )
																		"</li>" +
																	"</ul>" +
//																	"<a class='next'><img src='/img/im/btn_timeseries_right.gif' alt='' /></a>" + //( 파란색 조절 화살표 )
																"</div>" +
															"</div>" +
														"</div>" +
													"</div>";
					};
					infoTimeSeries.addTo(this.map.gMap);
					
					$(".sop-bottom").css("width", "100%");
					$("#timeSeries_" + this.id).css("width", "100%");
					
					// image rollover
					$("#timeSeries_"+this.id).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					// 시계열 버튼
					$("#timeSeries_" + this.id).find(".btn_timeseries, .btn_timeseries_text").click(function(){
						var timeseries_section = $("#timeSeries_" + that.id).find(".timeseries_section").css("display");
						if ( timeseries_section == "block" ){
							$("#timeSeries_" + that.id).find(".timeseries_section").hide();
							$("#timeSeries_" + that.id).find(".btn_timeseries").addClass("off");
							$("#timeSeries_" + that.id).find(".btn_timeseries_text").addClass("off");
//							$(this).addClass("off");
							$("#timeSeries_" + that.id).find(".map_timeseries").css("height", "6px");
						} else {
							$("#timeSeries_" + that.id).find(".timeseries_section").show();
							$("#timeSeries_" + that.id).find(".btn_timeseries").removeClass("off");
							$("#timeSeries_" + that.id).find(".btn_timeseries_text").removeClass("off");
//							$(this).removeClass("off")
							$("#timeSeries_" + that.id).find(".map_timeseries").css("height", "");
						}
					});
					
					$(that.timeSeriesObj).hide();
				
					//시계열 플레이 버튼
					$(that.timeSeriesObj).find("#timeSeriesPlayBtn").click(function(){
						var btnSrc = $(that.timeSeriesObj).find("#timeSeriesPlayBtn > span > img").attr("src");
						var btnType = "";
						if(btnSrc.indexOf("btn_stop_on.gif") > -1 || btnSrc.indexOf("btn_stop_off.gif") > -1) {
							btnType = "stop";
						} else {
							btnType = "play";
						}
						
						if(btnType == "play") {
							$(that.timeSeriesObj).find("#timeSeriesPlayBtn > span > img").attr("src", "/img/im/btn_stop_off.gif");
							//시계열 플레이시작.
							that.isTimeSeriesPlay = true;
							that.doReqTimeSeries();
							
						} else if(btnType == "stop") {
							$(that.timeSeriesObj).find("#timeSeriesPlayBtn > span > img").attr("src", "/img/im/btn_play_off.gif");
							//시계열 플레이종료.
							that.isTimeSeriesPlay = false;
							that.timeSeriesPushData = new Array();	//초기화
							clearInterval(that.timer);
						}
					});
					
				};
				
				//미니맵
				this.createMinimap = function() {
					var infoMinimap = sop.control({position: 'bottomleft'});
					infoMinimap.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'minimap_' +that.id);
					    that.minimapObj = this._div;
					    return this._div;
					};
					infoMinimap.update = function (props) {
//						this._div.innerHTML = "<div class='miniMap' id='mMap_" + that.id + "'></div>";
						this._div.innerHTML = "<div>" +
															"<a class='btn_mimiMap_remark'><img class='rollover' src='/img/im/btn_remarks_off.png' alt='' /></a>" +
															"<div class='miniMap' id='mMap_" + that.id + "'></div>" +
															"<a class='miniMap_offset'><img class='rollover' src='/img/im/icon_arrow_remark_off.gif' alt='최소화' title='최소화' /></a>" +
														"</div>";
					};
					infoMinimap.addTo(this.map.gMap);
					
					//remark layer
					$(this.minimapObj).find(".btn_mimiMap_remark").click(function(){
						$(that.minimapObj).find("#mMap_" + that.id).show();
						$(that.minimapObj).find(".miniMap_offset").show();
						$(that.minimapObj).find(".btn_mimiMap_remark").hide();
					});
					$(this.minimapObj).find(".miniMap_offset").click(function(){
						$(that.minimapObj).find("#mMap_" + that.id).hide();
						$(that.minimapObj).find(".miniMap_offset").hide();
						$(that.minimapObj).find(".btn_mimiMap_remark").show();
					});
					
					// image rollover
					$(this.minimapObj).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//미니맵 생성
					var miniMap = this.map.miniMap;
					miniMap.id = that.map.id;
					miniMap.createMap(this.map.delegate, "mMap_" + that.id);
					//miniMap.eventAllDiabled();//미니맵의 드래그이벤트를 모두 막는다
					$(that.minimapObj).hide();
				};
				
				//창업통계 권리금 추가
				this.createForeGift = function() {
					var infoForeGift = sop.control({position: 'bottomleft'});
					infoForeGift.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'foreGift_' +that.id);
					    that.foreGiftObj = this._div;
					    return this._div;
					};
					infoForeGift.update = function (props) {
					    this._div.innerHTML =  	"<div>" +
					    									"<a class='btn_stats'><img class='rollover' src='/img/im/btn_stats_off.png' alt='' /></a>" +
														    "<div class='statsbox' style='display: none;'>" +
																"<div class='statsbox_in'>" +
																	"<p class='stats_tit'><span>권리금</span></p>" +
																	"<div class='stats_contents'>" +
																		"<dl>" +
																			"<dt><img src='/img/im/circle_graph.gif' alt='' /></dt>" +
																			"<dd>2000~</dd>" +
																			"<dd>500~2000</dd>" +
																			"<dd>0~500</dd>" +
																		"</dl>" +
																	"</div>" +
																	"<a class='pop_layer_close'><img class='rollover' src='/img/im/icon_arrow_graph_off.png' alt='최소화' title='최소화' /></a>" +
																"</div>" +
															"</div>" +
														"</div>";
					};
					infoForeGift.addTo(this.map.gMap);
					
					// image rollover
					$(that.foreGiftObj).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//graph layer
					$(that.foreGiftObj).find(".btn_stats").click(function(){
						$(that.foreGiftObj).find(".btn_stats").hide();
						$(that.foreGiftObj).find(".statsbox").show();
					});
					
					//숨기기
					$(that.foreGiftObj).find(".pop_layer_close").click(function(){
						$(that.foreGiftObj).find(".btn_stats").show();
						$(that.foreGiftObj).find(".statsbox").hide();
					});
					
					$(that.foreGiftObj).hide();
				};
				
				//임대료 범례 추가
				this.createRentalLegend = function() {
					var infoRentalLegend = sop.control({position: 'bottomleft'});
					infoRentalLegend.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'rentalLegend_' +that.id);
					    that.rentalLegendObj = this._div;
					    return this._div;
					};
					infoRentalLegend.update = function (props) {
						this._div.innerHTML = "	<div class='rental_legend_remark_section'>" +
															"<a class='btn_remark'><img class='rollover' src='/img/im/btn_remarks_off.png' alt='' /></a>" +
															"<div class='remarkbox'>" +
																"<div class='remarkbox_in'>" +
																	"<p class='remarks_tit'>" +
																		"<span>임대료</span>" +
																		"<a><img class='rollover' src='/img/im/icon_wheel_off.gif' alt='' /></a>" +
																	"</p>" +
										
																	"<div class='remarks_list'>" +
																		"<ul>" +
																			"<li><span id='rentalLegendColor1_"+that.id+"' style='background: #e2f1ff;'>&nbsp;</span><a id='legendRange1'>-</a></li>" +
																			"<li><span id='rentalLegendColor2_"+that.id+"' style='background: #badcff;'>&nbsp;</span><a id='legendRange2'>-</a></li>" +
																			"<li><span id='rentalLegendColor3_"+that.id+"' style='background: #7dbdff;'>&nbsp;</span><a id='legendRange3'>-</a></li>" +
																			"<li><span id='rentalLegendColor4_"+that.id+"' style='background: #409eff;'>&nbsp;</span><a id='legendRange4'>-</a></li>" +
																			"<li><span id='rentalLegendColor5_"+that.id+"' style='background: #0880fa;'>&nbsp;</span><a id='legendRange5'>-</a></li>" +
																		"</ul>" +
																	"</div>" +
										
																	"<a class='btn_remark_offset'><img class='rollover' src='/img/im/icon_arrow_remark_off.gif' alt='최소화' title='최소화' /></a>" +
																"</div>" +
															"</div>" +
														"</div>";
					};
					infoRentalLegend.addTo(this.map.gMap);
					
					//remark layer
					$(this.rentalLegendObj).find(".btn_remark").click(function(){
						$(that.rentalLegendObj).find(".remarkbox").show();
					});
					$(this.rentalLegendObj).find(".btn_remark_offset").click(function(){
						$(that.rentalLegendObj).find(".remarkbox").hide();
						$("#rentalLegendColor_"+that.id).find(".rental_remarks_option").hide();
						$('#rentalLegendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#rentalLegendColor_'+that.id).find('.color-box2').colpick().colpickHide();
					});
					
					// image rollover
					$(this.rentalLegendObj).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//설정창 열기
					$(this.rentalLegendObj).find(".remarks_tit > a").click(function(){
						$("#rentalLegendColor_"+that.id).find(".rental_remarks_option").show();
						//사용자 범례 설정
						that.rentalUserColorChg();
					});
					
					$(that.rentalLegendObj).hide();
				};
				
				//임대료 범례설정 추가
				this.createRentalLegendColor = function() {
					var infoRentalLegendColor = sop.control({position: 'bottomleft'});
					infoRentalLegendColor.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'rentalLegendColor_' +that.id);
					    return this._div;
					};
					infoRentalLegendColor.update = function (props) {
					    this._div.innerHTML = "<div class='rental_remarks_option'>" +
														"<div class='remarks_option_in'>" +
															"<p class='roption_tit'>범례설정</p>" +
															"<table>" +
																"<caption>범례설정</caption>" +
																"<colgroup>" +
																	"<col style='width: 70px;' />" +
																	"<col style='width: ;' />" +
																"</colgroup>" +
																"<tbody>" +
//																	"<tr>" +
//																		"<th scope='row'><span>구간수</span></th>" +
//																		"<td>" +
//																			"<select style='width: 75px;' disabled='true'>" +
//																				"<option>5레벨</option>" +
//																			"</select>" +
//																		"</td>" +
//																	"</tr>" +
																	"<tr>" +
																		"<th style='vertical-align: top;' scope='row'><span>컬러</span></th>" +
																		"<td>" +
																			"<ul>" +
																				"<li>" +
																					"<div class='mixcolorbox'>" +
																						"<input id='radioBWColor' name='setRentalColor_"+that.id+"' type='radio' value='BW' />" +
																						"<span class='color_01'>" +
																							"<span style='background: #eeeeee;'>&nbsp;</span>" +
																							"<span style='background: #cccccc;'>&nbsp;</span>" +
																							"<span style='background: #999999;'>&nbsp;</span>" +
																							"<span style='background: #767676;'>&nbsp;</span>" +
																							"<span style='background: #575757;'>&nbsp;</span>" +
																						"</span>" +
																					"</div>" +
																				"</li>" +
																				"<li>" +
																					"<div class='mixcolorbox'>" +
																						"<input id='radioBlueColor' name='setRentalColor_"+that.id+"' type='radio' value='Blue' checked='checked' />" +
																						"<span class='color_02'>" +
																							"<span style='background: #e2f1ff;'>&nbsp;</span>" +
																							"<span style='background: #badcff;'>&nbsp;</span>" +
																							"<span style='background: #7dbdff;'>&nbsp;</span>" +
																							"<span style='background: #409eff;'>&nbsp;</span>" +
																							"<span style='background: #0880fa;'>&nbsp;</span>" +
																						"</span>" +
																					"</div>" +
																				"</li>" +
																				"<li>" +
																					"<div class='mixcolorbox'>" +
																						"<input id='radioRedColor' name='setRentalColor_"+that.id+"' type='radio' value='Red' />" +
																						"<span class='color_03'>" +
																							"<span style='background: #ffddd7;'>&nbsp;</span>" +
																							"<span style='background: #ffb2a5;'>&nbsp;</span>" +
																							"<span style='background: #ff806c;'>&nbsp;</span>" +
																							"<span style='background: #ff593f;'>&nbsp;</span>" +
																							"<span style='background: #ff2400;'>&nbsp;</span>" +
																						"</span>" +
																					"</div>" +
																				"</li>" +
																				"<li>" +
																					"<input id='radioMixColor' name='setRentalColor_"+that.id+"' type='radio' value='Mix' /> " +
																					"Mixed Color" +
																				"</li>" +
																			"</ul>" +
								
																			"<div class='colpick_area'>" +
																				"<div class='colpick_cont'>" +
																					"<div class='color-box'></div>" +
																					"<span class='colpick_gradation'>" +
																						"<span style='background: #fee7e5;'>&nbsp;</span>" +
																						"<span style='background: #feb7b2;'>&nbsp;</span>" +
																						"<span style='background: #fe887f;'>&nbsp;</span>" +
																						"<span style='background: #fe584c;'>&nbsp;</span>" +
																						"<span style='background: #fe291a;'>&nbsp;</span>" +
																					"</span>" +
																					"<div class='color-box2' style='float: right;'></div>" +
																				"</div>" +
																			"</div>" +
								
																		"</td>" +
																	"</tr>" +
																	"<tr>" +
																		"<th scope='row'><span>분류</span></th>" +
																		"<td>" +
																			"<input type='radio' name='selectEvenRentalLegend_"+that.id+"' id='legend_auto' value='auto' checked='checked' /> 자동범례 &nbsp;&nbsp;" +
																			"<input type='radio' name='selectEvenRentalLegend_"+that.id+"' id='legend_equal' value='equal' /> 균등범례" +
																		"</td>" +
																	"</tr>" +
																"</tbody>" +
															"</table>" +
															"<div class='btn_roption'>" +
																"<a id='legendApply' class='bg_blue'>적용</a>" +
																"<a id='legendClosed'>취소</a>" +
															"</div>" +
														"</div>" +
														"<span class='arrow_remark'><img src='/img/im/icon_arrow.png' alt='' /></span>" +
														"<a class='remark_btn_close'><img src='/img/im/btn_layer_close.gif' alt='close' /></a>" +
													"</div>";
					};
					infoRentalLegendColor.addTo(this.map.gMap);
					
					//X버튼 누르기
					$("#rentalLegendColor_"+this.id).find(".remark_btn_close").click(function(){
						$("#rentalLegendColor_"+that.id).find(".rental_remarks_option").hide();
						$('#rentalLegendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#rentalLegendColor_'+that.id).find('.color-box2').colpick().colpickHide();
					});
					
					//범례적용
					$("#rentalLegendColor_"+this.id).find("#legendApply").click(function(){
						that.rentalColorApply();
					});
					
					//범례닫기
					$("#rentalLegendColor_"+this.id).find("#legendClosed").click(function(){
						$("#rentalLegendColor_"+that.id).find(".rental_remarks_option").hide();
						$('#rentalLegendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#rentalLegendColor_'+that.id).find('.color-box2').colpick().colpickHide();
					});
				};
				
				//타이틀 추가
				this.createSearchTitle = function() {
					var infoSearchTitle = sop.control({position: 'topright'});
					infoSearchTitle.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'searchTitle_' +that.id);
					    that.searchTitleObj = this._div;
					    return this._div;
					};
					infoSearchTitle.update = function (props) {
						this._div.innerHTML = "<div class='map_search_title'>" +
															"<a class='btn_search_title'></a>" +
															"<div class='title_area'>" +
																"<div class='title_txt' title=\"\"></div>" +
																"<div class='hidden_title_txt' title=\"\"></div>" +
																"<div class='reference_txt'></div>" +
															"</div>" +
														"</div>";
					};
					infoSearchTitle.addTo(this.map.gMap);
					
					$(".sop-top").css("width", "100%");
					$("#searchTitle_" + this.id).css("width", "90%");
					
					// 시계열 버튼
					$("#searchTitle_" + this.id).find(".btn_search_title").click(function(){
						var searchTitle_section = $("#searchTitle_" + that.id).find(".title_area").css("display");
						if ( searchTitle_section == "block" ){
							$("#searchTitle_" + that.id).find(".title_area").hide();
							$("#searchTitle_" + that.id).find(".btn_search_title").addClass("off");
						} else {
							$("#searchTitle_" + that.id).find(".title_area").show();
							$("#searchTitle_" + that.id).find(".btn_search_title").removeClass("off");
						}
					});
					
					$(that.searchTitleObj).hide();
				};
				
				//사용자지정 업로드 생성
				this.createUserUploadFile = function() {
					var infoUserUpload = sop.control({position: 'topright'});
					infoUserUpload.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'userExcelUpload_'+that.id);
					    that.infoUserUploadObj = this._div;
					    return this._div;
					};
					infoUserUpload.update = function (props) {
						this._div.innerHTML = "<div style='position:absolute; right:55px; top:10px; width:45px;'>" +
													"<a class='btn_graph'><img class='rollover' src='/img/im/btn_remarks_off.png' alt='' /></a>" +
														"<div class='graphbox' style='width:620px;'>" +
															"<div class='graphbox_in'>" +
																"<div class='graph'>" +
																"<div class='m_indicator' style='position:absolute; width:100%; height:100%; z-index:10000; display:none'><img style='margin-top:25%;' src='/img/common/loding_type01.gif'/></div>" +
																	"<div style='height:35px;float:left;line-height:25px;'><span style='margin-left:10px'>*위치보기를 할 경우, 위치정보조회를 해주세요. (업로드한 정보중 최대 500개까지만 표출됩니다.)</span></div>" +
																	"<div class='userUploadBox' id='userUploadView_"+ that.id +"'>" +
																	/*"<div style='height:35px;float:left;line-height:35px;'><input id='checkMarker_"+ that.id +"' type='checkbox'><span style='margin-left:10px'>지도에서 위치보기</span></div>" +*/
																	"<a id='downExcelForm_"+ that.id +"' class='bg_yellow' style='cursor:pointer'>엑셀다운로드</a>" +
																	"<a id='showBtn_"+ that.id +"' class='bg_blue' style='margin-right:5px;cursor:pointer'>위치보기 on</a>" +
																	"<a id='geocodeBtn_"+ that.id +"' class='bg_blue' style='margin-right:5px;cursor:pointer'>위치정보조회</a>" +
																	"<table id='userUpload_"+ that.id +"' width=100% class='display' style='table-layout:fixed;'></table>" +
																	"</div>" +
																"</div>" +
															"</div>" +
															"<a class='btn_graph_offset'><img class='rollover' src='/img/im/icon_arrow_graph_off.gif' alt='최소화' title='최소화' /></a>" +
														"</div>" +
													"</div>";
						 
					};
					infoUserUpload.addTo(this.map.gMap);
					
					// image rollover
					$(that.infoUserUploadObj).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//graph layer
					$(that.infoUserUploadObj).find(".btn_graph").click(function(){
						$("#userExcelUpload_"+that.id).find(".graphbox").show();
					});

					$(that.infoUserUploadObj).find(".btn_graph_offset").click(function(){
						$("#userExcelUpload_"+that.id).find(".graphbox").hide();
					});
					
					$(that.infoUserUploadObj).hide();
				},
				
				this.updateUserUploadFile = function(data, vType) {
					if (this.dataTable) {
						this.dataTable.clear().draw();
						this.dataTable.destroy();
				        $('#userUpload_'+this.id).empty(); 
				        this.dataTable = null;
				        
				        $("#geocodeBtn_"+this.id).off("click");  
				        $("#checkMarker_"+this.id).off("click");
				        $("#downExcelForm_"+this.id).off("click");
				       
				        $("#checkMarker_"+this.id).attr("checked", false);
						for (var i=0; i<this.markerGroup.length; i++) {
							this.markerGroup[i].marker.remove();
						}
						this.markerGroup = [];				
						
					}
					
					var header = data.result.header;
					var body = data.result.bodys;
					var columns = [];
					var type = {
							"name"    : 0,
							"addr" 	  : 1,
							"uda"     : 2,
							"udb"     : 3,
							"udc"     : 4,
							"udd"     : 5,
							"ude"     : 6,
							"x"       : 7,
							"y"       : 8,
							"aggcode" : 9
 					};

					for (var i=0; i<header.length; i++) {
						var width = "";
						switch(type[header[i].field]) {
							case 0:
								width = 120;
								break;
							case 1:
								width = 180;
								break;
							case 2:
							case 3:
							case 4:
							case 5:
							case 6:
							case 9:
								width = 100;
								break;
							case 7:
							case 8:
								width = 100;
								break;
								
						}
						var data = {
								"name" : header[i].field, 
								"data" : header[i].field, 
								"width" : width, 
								"title" : header[i].title,
						};
						
						if (i == 0) {
							var tmp = {
								"name" : "status", 
								"data" : "status", 
								"width" : 40, 
								"title" : "상태"
				            };
							columns.push(tmp);
						}
						
						columns.push(data);				
					}
		
					var tmpBody = [];
					for (var i=0; i<body.length; i++) {
						var isEmpty = true;
						for (column in body[i]) {
							if (body[i][column] != null) {
								if (column == "addr" && body[i][column].trim().length == 0) {
									isEmpty = true;
									break;
								}
								if (body[i][column].trim().length > 0) {
									isEmpty = false;
								}
							}
						}
						
						if (!isEmpty) {
							body[i]["status"] = "";
							body[i]["idx"] = i; 
							
							if (column != "addr" && column != "name" && column != "status") {
								if (body[i].uda != undefined && isNaN(parseFloat(body[i].uda))) {
									body[i].uda = "";
								}else {
									body[i].uda = appendCommaToNumber(parseFloat(body[i].uda));
								}
								if (body[i].udb != undefined && isNaN(parseFloat(body[i].udb))) {
									body[i].udb = "";
								}else {
									body[i].udb = appendCommaToNumber(parseFloat(body[i].udb));
								}
								if (body[i].udc != undefined && isNaN(parseFloat(body[i].udc))) {
									body[i].udc = "";
								}else {
									body[i].udc = appendCommaToNumber(parseFloat(body[i].udc));
								}
								if (body[i].udd != undefined && isNaN(parseFloat(body[i].udd))) {
									body[i].udd = "";
								}else {
									body[i].udd = appendCommaToNumber(parseFloat(body[i].udd));
								}
								if (body[i].ude != undefined && isNaN(parseFloat(body[i].ude))) {
									body[i].ude = "";
								}else {
									body[i].ude = appendCommaToNumber(parseFloat(body[i].ude));
								}
							}
							tmpBody.push(body[i]);
						}
						
					}
					
					var dataTable = $("#userUpload_"+this.id).dataTable( {
						"autoWidth": true,
						"paging" : false,
						"bFilter" : false, 
						"bInfo" : false,
						"scrollX": true,
						"scrollY": 200,
						"scrollCollapse": true,
						"bProcessing": true,
						"bSort" : false,
						"data": tmpBody,
					    "columns": columns,
					} );
		
					that.dataTable = $("#userUpload_"+this.id).DataTable();
					that.dataTable.column("aggcode:name").visible(false);
					that.dataTable.column("status:name").visible(false);
					
					//====================== 범례설정 시작 ===========================//
					var colorLegend = that.dataTable.column("uda:name").data();
					var circleLegend = that.dataTable.column("udb:name").data()
					var colorLegendTitle = "";
					var circleLegendTitle = "";
					for (var i=0; i<dataTable.fnSettings().aoColumns.length; i++) {
						if (dataTable.fnSettings().aoColumns[i].name == "uda") {
							colorLegendTitle = dataTable.fnSettings().aoColumns[i].title;
						}
						if (dataTable.fnSettings().aoColumns[i].name == "udb") {
							circleLegendTitle = dataTable.fnSettings().aoColumns[i].title;
						}
					};
					
					for (var i=0; i<colorLegend.length; i++) {
						colorLegend[i] = colorLegend[i].split(",").join("");
					}
					
					for (var i=0; i<circleLegend.length; i++) {
						circleLegend[i] = circleLegend[i].split(",").join("");
					}
					
					that.calculateLegend(colorLegend, circleLegend);
					that.rentalValPerSlice = that.rentalLegendValue.auto;
					that.setRentalLegendRange(colorLegendTitle, that.rentalValPerSlice.color);
					that.updateForeGift(circleLegendTitle, that.rentalValPerSlice.circle);
					//====================== 범례설정 종료 ===========================//
					
					$(that.infoUserUploadObj).show();
					$(that.infoUserUploadObj).find(".btn_graph").click();

					$("#geocodeBtn_"+this.id).click(function() {
						that.indicatorCnt = 0;
						that.dataTable.column("status:name").visible(true);

						for (var i=0; i<tmpBody.length; i++) {
							$('#userUpload_'+that.id+' tbody > tr').eq(i)
							   .find("td").eq(0)
							   .css("background-color", "#fffa82");
							
							var index = that.dataTable.column("status:name").index();
							that.dataTable.cell(i, index).data("전송시작");
							var indicator = $(that.infoUserUploadObj).find(".m_indicator");
							indicator.show();
							that.openApiGeocode(tmpBody[i].addr, {
								index : tmpBody[i].idx,
								title : tmpBody[i].name,
								dataTable : dataTable,
								delegate : that,
								lastIndex : tmpBody.length - 1,
								address : tmpBody[i].addr
							});
						}
						
					});
					
					var isChecked = false;
					$("#showBtn_"+this.id).click(function() {
						isChecked ^= true;
						if (isChecked) {
							$(this).text("위치보기 off");
							for (var i=0; i<that.markerGroup.length; i++) {
								that.markerGroup[i].marker.remove();
							}
							that.markerGroup = [];
							var table = $("#userUpload_"+that.id).dataTable();
							var markerType = "marker";
							if (vType == "biz") markerType = "circle";			
							else 				 markerType = "marker";

							for (var i=0; i<table.fnGetData().length; i++) {
								var data = table.fnGetData()[i];
								var marker = that.createMarker(data, columns, markerType);
							}			
							
							if (that.markerGroup.length > 0) {
								if (that.markerGroup.length > 2) {
									var bounds = sop.utmkBounds(that.markerGroup[0].marker._utmk,
																that.markerGroup[1].marker._utmk);
									
									for (var i=2; i<that.markerGroup.length; i++) {
										var utmk = that.markerGroup[i].marker._utmk;
										bounds.extend(utmk);
									}
									var tmpBounds = sop.utmkBounds(bounds.getSouthWest(), bounds.getNorthEast());
									that.map.gMap.fitBounds(tmpBounds, {animate:false});
								}else {
									var index = that.markerGroup.length-1;
									var utmk = that.markerGroup[index].marker._utmk;
									that.map.mapMove([utmk.x, utmk.y], that.map.zoom);
								}
							}
								
						}else {
							$(this).text("위치보기 on");
							for (var i=0; i<that.markerGroup.length; i++) {
								that.markerGroup[i].marker.remove();
							}
							that.markerGroup = [];
						}
					});
					
					/*var isCheck = false;
					$("#checkMarker_"+this.id).click(function() {
						isCheck = $(this).is(":checked");
					});	*/
					
					$('#userUpload_'+this.id+' tbody').on( 'click', 'tr', function () {
					    var data = that.dataTable.row( this ).data();
					    var index = that.dataTable.row( this ).index();

					    if (data.x.length > 0 && data.y.length > 0) {
					    	for (var i=0; i<that.markerGroup.length; i++) {
						    	if (data.idx == that.markerGroup[i].index) {
						    		that.map.mapMove([data.x, data.y], that.map.zoom);
						    		that.markerGroup[i].marker.openInfoWindow();
						    		return;
						    	}
						    }
						   
					    	var markerType = "marker";
								if (vType == "biz") markerType = "circle";			
								else 				 markerType = "marker";

						    var marker = that.createMarker(data, columns, markerType);
						    if (marker != null) {
						    	that.map.mapMove([data.x, data.y], that.map.zoom);
					    		that.markerGroup[i].marker.openInfoWindow();
						    }
						    
					    }else {
						    var options = {
						    		data : data,
						    		idx : index
						    };
					    	messageConfirm.open(
					    			 "알림", 
					    			 "선택한 정보의 위치정보가 없습니다.<br>위치정보조회 또는 지도에서 위치를 지정해주세요.",
					    			 btns = [
										{
											   title : "위치정보조회",
											   fAgm : options,
											   disable : false,
											   func : function(opt) {
										 	   that.indicatorCnt = 0;
										 	   that.dataTable.column("status:name").visible(true);
										 	   $('#userUpload_'+that.id+' tbody > tr')
										 	   		.eq(opt.idx)
										 	   		.find("td").eq(0)
										 	   		.css("background-color", "#fffa82");
										 	   var index = that.dataTable.column("status:name").index();
										 	   that.dataTable.cell(opt.idx, index).data("전송시작");
										 	   var indicator = $(that.infoUserUploadObj).find(".m_indicator");
										 	   indicator.show();
										 	   that.openApiGeocode(tmpBody[opt.idx].addr, {
														index : tmpBody[opt.idx].idx,
														title : tmpBody[opt.idx].name,
														dataTable : dataTable,
														delegate : that,
														lastIndex : 0,
														address : tmpBody[opt.idx].addr
										 	   });	
										    }
										    
										 },    
					    			           
					    			     {
					    			       title : "지도에서찾기",
					    			       fAgm : options,
					    			       disable : false,
					    			       func : function(opt) {
					    			    	   $("#myMakerPos").remove();
					    			    	   var idx = parseInt(that.map.id);
					    			    	   var html = "<div id='myMakerPos'>" +
					    			    	   			  "<img src='/img/marker/thema_marker_defailt.png' height='41' width='25'><br>" +
					    			    	   			  "<div style='width:167px;height:50px;'>" +
					    			    	   			  	"<a id='btnCancle' class='myMarkerBtn'>취소</a>" +	
					    			    	   			  	"<a id='btnApply' class='myMarkerBtn'>적용</a>" +                                                                                                    
					    			    	   			  "</div>" +
					    			    	   			  "</div>";
					    			    	   
					    			    	   $("#mapRgn_" +(idx+1)).append(html);
					    			    	   $("#myMakerPos").css({
						    			    		  "position" : "absolute",
						    			    		  "width" : "200px",
						    			    		  "height" : "100px",
						    			    		  "left" : ($("#mapRgn_" +(idx+1)).width()/2 - 200) + "px",
						    			    		  "top" : ($("#mapRgn_" +(idx+1)).height()/2 - 41) + "px",
						    			    		  "z-index" : "100",
						    			    		  "text-align" : "center"
						    			    		  
					    			    	   });
					    			    	   
					    			    	   $(".myMarkerBtn").css({
					    							"height" : "35px",
					    							"width" : "60px",
					    							"font-size" : "14px",
					    							"font-weight" : "bold",
					    							"line-height" : "35px",
					    							"color" : "#ffffff",
					    							"background" : "#3386d4",
					    							"margin-right" : "5px",
					    							"cursor" : "pointer",
					    							"z-index" : "100px",
					    							"float" : "right"
					    						});
					    			    	   
					    			    	   $(".myMarkerBtn").hover(function() {
					    								$(this).css({"background" : "#666666"});
					    							}, function() {
					    								$(this).css({"background" : "#3386d4"});
					    							}
					    			    	   );
					    			    	   
					    			    	   $("#mapRgn_" +(idx+1)).on("resizeMap", function() {
					    			    		   $("#myMakerPos").css({
							    			    		  "left" : ($("#mapRgn_" +(idx+1)).width()/2 - 200/2) + "px",
							    			    		  "top" : ($("#mapRgn_" +(idx+1)).height()/2 - 41) + "px",
						    			    	   });
					    			    	   });
					    			    	   $("#mapRgn_" +(idx+1)).trigger("resizeMap");
					    			    	   $(window).resize(function() {
					    			    		   $("#mapRgn_" +(idx+1)).trigger("resizeMap");
					    			    	   });
					    			    	   
					    			    	   $("#btnApply").click(function() {
					    			    		   var center = that.map.center;
					    			    		   var xIdx = that.dataTable.column("x:name").index();
					    			    		   var yIdx = that.dataTable.column("y:name").index();

					    			    		   messageAlert.open(
					    			    				   "알림",
					    			    				   "현재 좌표정보를 사용하시겠습니까?<br>("+center[0]+", "+center[1]+")",
					    			    				   function done() {
					    			    					   that.dataTable.cell(opt.idx, xIdx).data(center[0]+"");
								    			    		   that.dataTable.cell(opt.idx, yIdx).data(center[1]+"");
								    			    		   $("#myMakerPos").remove();
					    			    				   },
					    			    				   function cancel() {  
					    			    				   }
					    			    		   );
					    			    		   
					    			    	   });
					    			    	    
					    			    	   $("#btnCancle").click(function() {
					    			    		   $("#myMakerPos").remove();
					    			    	   });
					    			    	   
					    			       }
					    			       
					    			     }
					    			     
					    			 ]
					    			 
					    	 );
					    }
					    
					
					} );		
					
					$("#downExcelForm_"+this.id).click(function() {
						var table = $("#userUpload_"+that.id).dataTable();
						var datas = table.fnGetData();
				        var target;

				        var header = [];
				        for (var i=0; i<table.fnSettings().aoColumns.length; i++) {
				        	if (table.fnSettings().aoColumns[i].data != "status") {
				        		header.push({
					        		"field" : table.fnSettings().aoColumns[i].data,
					        		"title" : table.fnSettings().aoColumns[i].title 
					        	});
				        	}
				        }
				        
				        for (var i=0; i<datas.length; i++) {
				        	datas[i].uda = datas[i].uda.split(",").join("");
				        	datas[i].udb = datas[i].udb.split(",").join("");
				        	datas[i].udc = datas[i].udc.split(",").join("");
				        	datas[i].udd = datas[i].udd.split(",").join("");
				        	datas[i].ude = datas[i].ude.split(",").join("");
				        	delete datas[i].status;
				        	delete datas[i].idx;
				        }
				        var tmpJsonData = {
					        	header : header,
					        	bodys : datas
					    };

				        var sendData = JSON.stringify(tmpJsonData);				        
				        var target;
				        var currentdate = new Date();
						var timeStamp = makeStamp(currentdate);
						
				        target = $('body');
				        target.prepend("<form id='tempForm_"+that.id+"'></form>");

				        target = $('#tempForm_'+that.id);
				        target.attr("method", "post");
				        target.attr("style", "top:-3333333333px;");
				        target.attr("action", contextPath + "/ServiceAPI/map/exceldown.excel");
				        target.append("<input type='hidden' id='filename_"+that.id+"'>");
				        target.append("<input type='hidden' id='datas_"+that.id+"'>");

				        target = $('#filename_'+that.id);
				        target.attr('name', 'filename');
				        target.attr('value', "userDataForm_"+timeStamp);

				        target = $('#datas_'+that.id);
				        target.attr('name', 'datas');
				        target.attr('value', encodeURIComponent(sendData));

				        $('#tempForm_'+that.id).submit();
				        $('#tempForm_'+that.id).remove();
  
					});

				},
				
				this.calculateLegend = function(arColorData, arCircleData) {			
					this.rentalLegendValue = {
							equal : {
								color : {},
								circle : {},
							},
							auto : {
								color : {},
								circle : {},
							}
					};
					
					//================균등분할방식 start===============//
					//균등분할 범례
					var tmpValPerSlice = new Array();
					var min = Math.min.apply(null, arColorData);
					var max = Math.max.apply(null, arColorData);
					var result = Math.round((parseFloat(min) + parseFloat(max)) / 5);
					if (result == 0) {
						result = 1;
					}

					var tmpResult = new Array();
					for ( var y = 1; y <= 5; y++) {
						tmpResult.push(result * y);
					}
					if (tmpResult.length < 5) {
						for ( var x = 0; x < 5 - tmpResult.length; x++) {
							tmpResult.push("");
						}
					}
					tmpValPerSlice = tmpResult;
					this.rentalLegendValue.equal.color = tmpValPerSlice;
					
					//균등분할-원
					var tmpValPerSlice = new Array();
					var min = Math.min.apply(null, arCircleData);
					var max = Math.max.apply(null, arCircleData);
					var result = Math.round((parseFloat(min) + parseFloat(max)) / 3);
					if (result == 0) {
						result = 1;
					}
						
					var tmpResult = new Array();
					for ( var y = 1; y <= 3; y++) {
						tmpResult.push(result * y);
					}
					if (tmpResult.length < 3) {
						for ( var x = 0; x < 3 - tmpResult.length; x++) {
							tmpResult.push("");
						}
					}
					tmpValPerSlice = tmpResult;
					this.rentalLegendValue.equal.circle = tmpValPerSlice;
					//================균등분할방식 end===============//
					
					
					
					//================자동분할방식 start===============//
					//자동분할(분포분할)
					var tmpValPerSlice = new Array();
					var tmpSortArray = arColorData.sort(function (a, b) {
						return a - b;
					});
					
					//중복숫자제거
					var tmpGroupArray = [];
					$.each(tmpSortArray, function (i, el) {
						if ($.inArray(el, tmpGroupArray) === -1) {
							tmpGroupArray.push(el);
						}
					});
					
					var result = Math.round((tmpGroupArray.length / 5));
					if (result == 0) {
						result = 1;
					}
					
					if (tmpGroupArray.length < 5) {
						tmpValPerSlice = tmpGroupArray;
					}else {
						var tmpResult = new Array();
						for ( var y = 0; y < tmpGroupArray.length; y++) {
							if (y % result == 0 && y != 0) {
								tmpResult.push(tmpGroupArray[y]);
							}
						}
						if (tmpResult.length == 0) {
							tmpResult.push(tmpGroupArray[0]);
						}
						if (tmpResult.length < 5) {
							//계산된 값이 4개 이하일경우, sort된 마지막 데이터를 하나더 채운다.
							if (tmpResult.length < 4) {
								tmpResult.push(tmpGroupArray[tmpGroupArray.length-1]);
							}
							var cnt = 5 - tmpResult.length;
							for ( var x = 0; x < cnt; x++) {
								tmpResult.push("");
							}
						}
						tmpValPerSlice = tmpResult;
					}					
					this.rentalLegendValue.auto.color = tmpValPerSlice;
					
					//자동분할 - 원크기
					var tmpValPerSlice2 = new Array();
					var tmpSortArray = arCircleData.sort(function (a, b) {
						return a - b;
					});
					
					//중복숫자제거
					var tmpGroupArray = [];
					$.each(tmpSortArray, function (i, el) {
						if ($.inArray(el, tmpGroupArray) === -1) {
							tmpGroupArray.push(el);
						}
					});
					
					var result = Math.round((tmpGroupArray.length / 3));
					if (result == 0) {
						result = 1;
					}
					
					if (tmpGroupArray.length < 3) {
						tmpValPerSlice2 = tmpGroupArray;
					}else {
						var tmpResult = new Array();
						for ( var y = 0; y < tmpGroupArray.length; y++) {
							if (y % result == 0 && y != 0) {
								tmpResult.push(tmpGroupArray[y]);
							}
						}
						if (tmpResult.length == 0) {
							tmpResult.push(tmpGroupArray[0]);
						}

						if (tmpResult.length < 3) {
							var cnt = 3 - tmpResult.length;
							for ( var x = 0; x < cnt; x++) {
								tmpResult.push("");
							}
						}
						tmpValPerSlice2 = tmpResult;
					}					
					this.rentalLegendValue.auto.circle = tmpValPerSlice2;
					//================자동분할방식 end===============//

					return this.rentalLegendValue;
				},
				
				this.getCircleLengendInfo = function(data, data2) {
					data = parseFloat(data.split(",").join(""));
					data2 = parseFloat(data2.split(",").join(""));
					var legend = {};
					if (this.rentalValPerSlice.color.length < 5) {
						for (var i=0; i<this.rentalValPerSlice.color.length; i++) {
							if (data == this.rentalValPerSlice.color[i]) {
								legend.color = [ that.rentalLegendColor[i], i+1 ];
								break;
							}
						}

					}else {
						legend.color = data < parseFloat(this.rentalValPerSlice.color[0].split(",").join("")) ? [ that.rentalLegendColor[0], 1 ] : 
								       data < parseFloat(this.rentalValPerSlice.color[1].split(",").join("")) ? [ that.rentalLegendColor[1], 2 ] : 
								       data < parseFloat(this.rentalValPerSlice.color[2].split(",").join("")) ? [ that.rentalLegendColor[2], 3 ] : 
									   data < parseFloat(this.rentalValPerSlice.color[3].split(",").join("")) ? [ that.rentalLegendColor[3], 4 ] :
								   								          	    								[ that.rentalLegendColor[4], 5 ];	
					}

					if (this.rentalValPerSlice.circle.length < 3) {
						for (var i=0; i<this.rentalValPerSlice.circle.length; i++) {
							if (data2 == this.rentalValPerSlice.circle[i]) {
								legend.circle = [ that.rentalLegendCircle[i], i+1 ];
								break;
							}
						}

					}else {
						legend.circle = data2 < parseFloat(this.rentalValPerSlice.circle[0].split(",").join("")) ? [ that.rentalLegendCircle[0], 1 ] : 
									    data2 < parseFloat(this.rentalValPerSlice.circle[1].split(",").join("")) ? [ that.rentalLegendCircle[1], 2 ] : 
							   	    									     	   [ that.rentalLegendCircle[2], 3 ];	
					}
					return legend;
					
				},
				
				
				this.createMarker = function(data, columns, type) {
						var html =  "<table style='margin:10px;'>" 
							      + "<tr>" 								
							      + "<td class='admName' style='color:#3792de;font-size:12px;font-weight:bold;' colspan=3>" +data.name + "</td>"
							      + "</tr>"
							      + "<tr style='height:1px;background-color:#0080c6'></tr>" 
							      + "<tr style='height:10px;'></tr>";
						
						for (column in data) {
					    	if (column == "uda" ||  
					    		column == "udb" || 
					    		column == "udc" || 
					    		column == "udd" || 
					    		column == "ude") {
					    		if (data[column] != null && 
					    			data[column] != undefined && 
					    			data[column].length > 0) {
					    			
					    			var title = "";
					    			for (var x=0; x<columns.length; x++) {
					    				if (columns[x].data == column) {
					    					title = columns[x].title;
					    					break;
					    				}
					    			}
					    			
					    			html += "<tr>"
					    				  + "<td style='margin-left:10px;font-size:11px;'>" +title + "</td>"
					    				  + "<td >:</td>"
										  + "<td style='font-size:11px'>" + data[column] + "</td>"
										  + "</tr>"
										  + "<tr style='height:5px;'></tr>";
					    		}
					    	}
					    }
						
						html += "</table>";

					    if (data.x.length > 0 && data.y.length > 0) {
					    	var curMarker = null;
					    	if (type == "marker") {
					    		curMarker = that.map.addMarker(data.x, data.y, {
						    		tooltipMsg : html,
						    		visible : false
						    	});
					    	}else {
					    		if (data.uda == undefined || 
					    			data.uda == null || 
					    			data.uda.length == 0) {
					    			data.uda = 0;
					    		}
					    		if (data.udb == undefined || 
					    			data.udb == null || 
					    			data.udb.length == 0) {
					    			data.udb = 0;
					    		}
					    		var tmpData = [];
					    		tmpData.push(data.uda);
					    		tmpData.push(data.udb);
					    		
					    		var legend = that.getCircleLengendInfo(data.uda, data.udb) 
					    		curMarker = that.map.addCircleMarker(data.x, data.y, {
						    		tooltipMsg : html,
						    		visible : false,
						    		radius : legend.circle[0],
						    		fillColor : legend.color[0]
						    		
						    	});
					    		
					    		$(curMarker).mouseover(function() {
						    		var fillColor = this.options.fillColor;
						    		that.selectRentalLegendRangeData(fillColor);
					    		});
					    	}	

					    	that.markerGroup.push({marker:curMarker, index:data.idx, data:tmpData});
					    	return curMarker;
					    }
					  return null;
				},
				
				
				//원형차트 업데이트
				this.updatePieChart = function (options) {
					if(options.params.adm_cd == "00") {	//전국 단위일 경우 원형차트 안보임
						$(this.pieChartObj).hide();
						return;
					}
					var url = "";
					if(options.params.api_id == "API_0301") {	//인구통계총괄
						url = "/ServiceAPI/stats/population.json";
					} else if(options.params.api_id == "API_0302") {	//인구통계세부조건검색
						url = "/ServiceAPI/stats/searchpopulation.json";
					} else if(options.params.api_id == "API_0303") {	//산업체분류검색
						url = "/ServiceAPI/stats/industrycode.json";
					} else if(options.params.api_id == "API_0304") {	//사업체분류검색
						url = "/ServiceAPI/stats/company.json";
					} else if(options.params.api_id == "API_0305") {	//가구통계검색
						url = "/ServiceAPI/stats/household.json";
					} else if(options.params.api_id == "API_0306") {	//주택통계검색
						url = "/ServiceAPI/stats/house.json";
					} else if(options.params.api_id == "API_0307") {	//농가통계검색
						url = "/ServiceAPI/stats/farmhousehold.json";
					} else if(options.params.api_id == "API_0308") {	//임가통계검색
						url = "/ServiceAPI/stats/forestryhousehold.json";
					} else if(options.params.api_id == "API_0309") {	//어가통계검색
						url = "/ServiceAPI/stats/fisheryhousehold.json";
					} else if(options.params.api_id == "API_0310") {	//가구원통계검색
						url = "/ServiceAPI/stats/householdmember.json";
					}

					var sopPortalPieChartDrawObj = new sop.portal.pieChartDraw.api();
					for (var i=0; i<options.params.param.length; i++) {
						sopPortalPieChartDrawObj.addParam(
								options.params.param[i].key, 
								options.params.param[i].value);
					}
					sopPortalPieChartDrawObj.addParam("adm_cd", options.params.adm_cd);
					sopPortalPieChartDrawObj.request({
				        method : "POST",
				        async : true,
				        url : contextPath + url,
				        options : {
				        	target : this,
				        	params : options.params
				        }
				    });
				};
				
				//막대차트 업데이트(KOSIS)
				this.updateKosisBarChart = function(res, title) {
					
					//차트인텍스 초기화
					this.lastChatIndex = null;
					
					$(this.pieChartObj).hide();
					$(this.barChartObj).show();
					
					var xAxisCat = [];
					var retDataList = [];
					for(var i = 0; i < res.length; i ++) {
						var adm_nms = res[i].NAME;
						xAxisCat.push(adm_nms);		//시도단위
						if (isNaN(res[i].DATA )) {
							//res[i].DATA == 'NaN' || res[i].DATA == undefined
							res[i].DATA = 0;
						}
						retDataList.push(res[i].DATA);
					}
					var unit = "단위 : " + res[0].UNIT;

					$("#barChart_"+that.id).find("#container_graph_bar").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', height: 220, width:420
				        },
				        title: {
				            text: ''
				        },
				        xAxis: {
				            categories: xAxisCat,
				            labels : {
				            	rotation: -45,
				            	enabled: true
				            }
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: unit
				            }
				        }, 
				        legend: {
				        	enabled: false
				        },
				        plotOptions: {
				            column: {
				                pointPadding: 0.2,
				                borderWidth: 0
				            }
				        },
				        series: [{
				            name: ' ',
				            data: retDataList,
				            color: '#2951f2'
				        }]
				    });
					
//					tooltip: {
//			            headerFormat: '<span style="font-size:13px">{point.key}</span></br>',
//			            pointFormat: '<span style="font-size:10px">&nbsp;&nbsp;{point.y}' + ' ' + res[0].UNIT + '</span>',
//			            footerFormat: '',
//			            shared: true,
//			            useHTML: true
//			        },
					
					var html = "<div id='testKosisLink' align='right'>";
					html += "<img src='/img/common/banner.gif' onclick='javascript:interactiveMapKosis.kosisLinked();' style='cursor:pointer;'>";
					html += "</div>";
//					$(this.barChartObj).append(html);
					$("#graphbox_in_link").html(html);
					
					//차트 숨기기
					$("#barChart_"+that.id).find(".graphbox_bar").hide();
					
					//타이틀
		        	$("#barChart_"+that.id).find(".graph_txt").html(title);
		        	$("#barChart_"+that.id).find(".graph_txt").tooltip({
		        		content : title,
		        		position : {my: "left+10 top-40"},
						track: true
		        	});
		        	
					//툴팁을 없애지 않고 계속 놔둔다.
					var charts = $("#barChart_"+that.id).find("#container_graph_bar").highcharts();
					charts.tooltip.hide = function() {};
				};
				
				//막대차트 업데이트
				this.updateBarChart = function(res, options) {
					//차트인텍스 초기화
					this.lastChatIndex = null;
					
					$("#graphbox_in_link").html("");
					$(this.barChartObj).show();
					var xAxisCat = [];	//X축 카테고리
					var retDataList = [];	//수치 데이터
					var titleText;		//차트 타이틀
					var labelsVisible = true;	//카테고리 표출 여부
					
					if(res.result != undefined) {
						for(var i = 0; i < res.result.length; i ++) {
							var elem = res.result[i];
							
							//읍면동 단위
							if((this.map.curPolygonCode == 4 || this.map.curPolygonCode == 5) && elem.adm_cd.length > 7) {
								xAxisCat.push("집계구");
								labelsVisible = false;
							} else {
								xAxisCat.push(elem.adm_nm);
							}
							
							if(res.id == "API_0301") {	//인구통계총괄
								if (res.showData == "tot_ppltn") {
									titleText = "총인구";
									retDataList.push(parseInt(elem.tot_ppltn));
								} else if (res.showData == "tot_ppltn_male") {
									titleText = "총인구-남자";
									retDataList.push(parseInt(elem.tot_ppltn_male));
								} else if (res.showData == "tot_ppltn_fem") {
									titleText = "총인구-여자";
									retDataList.push(parseInt(elem.tot_ppltn_fem));
								} else if (res.showData == "avg_age") {
									titleText = "평균나이";
									retDataList.push(parseFloat(elem.avg_age));
								} else if (res.showData == "avg_age_male") {
									titleText = "평균나이-남자";
									retDataList.push(parseFloat(elem.avg_age_male));
								} else if (res.showData == "avg_age_fem") {
									titleText = "평균나이-여자";
									retDataList.push(parseFloat(elem.avg_age_fem));
								} else if (res.showData == "ppltn_dnsty") {
									titleText = "인구밀도";
									retDataList.push(parseFloat(elem.ppltn_dnsty));
								} else if (res.showData == "aged_child_idx") {
									titleText = "노령화지수";
									retDataList.push(parseInt(elem.aged_child_idx));
								} else if (res.showData == "oldage_suprt_per") {
									titleText = "노년부양비";
									retDataList.push(parseInt(elem.oldage_suprt_per));
								} else if (res.showData == "juv_suprt_per") {
									titleText = "유년부양비";
									retDataList.push(parseInt(elem.juv_suprt_per));
								} else if (res.showData == "tot_suprt_per") {
									titleText = "총부양비";
									retDataList.push(parseInt(elem.tot_suprt_per));
								}
								
							} else if(res.id == "API_0302") {	//인구통계세부조건검색
								titleText = "인구";
								retDataList.push(parseInt(elem.population));
								
							} else if(res.id == "API_0304") {	//사업체분류검색
								if (res.showData == "tot_worker") {
									titleText = "종사자수";
									retDataList.push(parseInt(elem.tot_worker));
								} else if (res.showData == "corp_cnt") {
									titleText = "사업체수";
									retDataList.push(parseInt(elem.corp_cnt));
								}
								
							} else if(res.id == "API_0305") {	//가구통계검색
								titleText = "가구수";
								retDataList.push(parseInt(elem.household_cnt));
								
							} else if(res.id == "API_0306") {	//주택통계검색
								titleText = "주택수";
								retDataList.push(parseInt(elem.house_cnt));
								
							} else if(res.id == "API_0307") {	//농가통계검색
								retDataList.push(parseInt(elem.farm_cnt));
							} else if(res.id == "API_0308") {	//임가통계검색
								retDataList.push(parseInt(elem.forestry_cnt));
							} else if(res.id == "API_0309") {	//어가통계검색
								retDataList.push(parseInt(elem.fishery_cnt));	
							} else if(res.id == "API_0310") {	//가구원통계검색
								titleText = "가구원 수";
								retDataList.push(parseInt(elem.population));
							}
							//조건결합시
							else {
								titleText = "";
								retDataList.push(parseInt(elem.data_cnt));
							}
						}
					}
					
					$("#barChart_"+that.id).find("#container_graph_bar").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', height: 220, width:420
				        },
				        title: {
				            text: ''
				        },
				        xAxis: {
				            categories: xAxisCat,
				            labels : {
				            	rotation: -45,
				            	enabled: labelsVisible
				            }
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: titleText
				            }
				        },
				        tooltip: {
					        formatter: function () {
					        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
					        		return 	'<span>' + this.point.category + '</span><br/>' +
					        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
					        	} else {
					        		return 	'<span>' + this.point.category + '</span><br/>' +
					        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + Highcharts.numberFormat(Math.abs(this.point.y), 0) + '</b>';
					        	}
			                }
				        	
				        },
				        legend: {
				        	enabled: false
				        },
				        plotOptions: {
				            column: {
				                pointPadding: 0.2,
				                borderWidth: 0
				            }
				        },
				        series: [{
				            name: titleText,
				            data: retDataList,
				            color: '#2951f2'
				        }]
				    });
					
					//차트 열기
//					$("#barChart_"+that.id).find(".graphbox_bar").show();
					
					//타이틀만들기 - (표출경계 + 년도 + 최종선택 된 통계항목 제목) 
					for (var i=0; i<options.params.param.length; i++) {
						if (options.params.param[i].key == "year") {
							
							//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위 삭제
							/*if (options.params.filter == "aged_child_idx" ||
								options.params.filter == "oldage_suprt_per" ||
								options.params.filter == "juv_suprt_per" || 
								options.params.filter == "tot_suprt_per") {
								titleText = options.params.param[i].value + "년 " + options.params.title;
							}else {*/
								titleText = options.params.param[i].value + "년 " + options.params.title + " (" + options.params.unit + ")";
							//}
							
							break;
						}
					}
					if(options.params.adm_cd == "00") {
						titleText = "시도별 " + titleText;
					} else if(options.params.adm_cd.length == 2) {
						titleText = "시군구별 " + titleText;
					} else if(options.params.adm_cd.length == 5) {
						titleText = "읍면동별 " + titleText;
					} else {
						titleText = "집계구별 " + titleText;
					}
					
		        	$("#barChart_"+that.id).find(".graph_txt").html(textSubString(titleText, 38));
		        	$("#barChart_"+that.id).find(".graph_txt").tooltip({
		        		content : titleText,
		        		position : {my: "left+10 top-40"},
						track: true
		        	});
					
					//툴팁을 없애지 않고 계속 놔둔다.
					var charts = $("#barChart_"+that.id).find("#container_graph_bar").highcharts();
					charts.tooltip.hide = function() {};
					
					//차트 소수점 설정
					if (res.showData == "avg_age" || res.showData == "avg_age_male" || res.showData == "avg_age_fem") {		//평균나이(세), 평균나이-남자(세), 평균나이-여자(세)
						charts.series[0].update({tooltip: {valueDecimals: 1}});
					} else if (res.showData == "ppltn_dnsty") {			//인구밀도(명/㎢)
						charts.series[0].update({tooltip: {valueDecimals: 2}});
					}
				};
				
				//범례 기준값 업데이트
				this.updateLegendRange = function(res) {
					var retDataList = [];	//수치 데이터
					var unit = res.unit;
					if(res.result != undefined) {
						for(var i = 0; i < res.result.length; i ++) {
							var elem = res.result[i];
							if(res.id == "API_0301") {	//인구통계총괄
								if (res.showData == "tot_ppltn") {
									titleText = "총인구";
									retDataList.push(parseInt(elem.tot_ppltn));
								} else if (res.showData == "tot_ppltn_male") {
									titleText = "총인구-남자";
									retDataList.push(parseInt(elem.tot_ppltn_male));
								} else if (res.showData == "tot_ppltn_fem") {
									titleText = "총인구-여자";
									retDataList.push(parseInt(elem.tot_ppltn_fem));
								} else if (res.showData == "avg_age") {
									titleText = "평균나이(세)";
									retDataList.push(parseFloat(elem.avg_age));
								} else if (res.showData == "avg_age_male") {
									titleText = "평균나이-남자(세)";
									retDataList.push(parseFloat(elem.avg_age_male));
								} else if (res.showData == "avg_age_fem") {
									titleText = "평균나이-여자(세)";
									retDataList.push(parseFloat(elem.avg_age_fem));
								} else if (res.showData == "ppltn_dnsty") {
									titleText = "인구밀도(명/㎢)";
									retDataList.push(parseFloat(elem.ppltn_dnsty));
								} else if (res.showData == "aged_child_idx") {
									titleText = "노령화지수(%)";
									retDataList.push(parseInt(elem.aged_child_idx));
								} else if (res.showData == "oldage_suprt_per") {
									titleText = "노년부양비(%)";
									retDataList.push(parseInt(elem.oldage_suprt_per));
								} else if (res.showData == "juv_suprt_per") {
									titleText = "유년부양비(%)";
									retDataList.push(parseInt(elem.juv_suprt_per));
								} else if (res.showData == "tot_suprt_per") {
									titleText = "총부양비(%)";
									retDataList.push(parseInt(elem.tot_suprt_per));
								}
								
							} else if(res.id == "API_0302") {	//인구통계세부조건검색
								titleText = "인구";
								retDataList.push(parseInt(elem.population));
								
							} else if(res.id == "API_0304") {	//사업체분류검색
								if (res.showData == "tot_worker") {
									titleText = "종사자수(명)";
									retDataList.push(parseInt(elem.tot_worker));
								} else if (res.showData == "corp_cnt") {
									titleText = "사업체수";
									retDataList.push(parseInt(elem.corp_cnt));
								}
								
							} else if(res.id == "API_0305") {	//가구통계검색
								titleText = "가구수";
								retDataList.push(parseInt(elem.household_cnt));
								
							} else if(res.id == "API_0306") {	//주택통계검색
								titleText = "주택수";
								retDataList.push(parseInt(elem.house_cnt));
								
							} else if(res.id == "API_0307") {	//농가통계검색
								retDataList.push(parseInt(elem.farm_cnt));
							} else if(res.id == "API_0308") {	//임가통계검색
								retDataList.push(parseInt(elem.forestry_cnt));
							} else if(res.id == "API_0309") {	//어가통계검색
								retDataList.push(parseInt(elem.fishery_cnt));	
							} else if(res.id == "API_0310") {	//가구원통계검색
								titleText = "가구원 수";
								retDataList.push(parseInt(elem.population));
							} 
							//조건결합일 경우
							else {
								titleText = "";
								retDataList.push(parseInt(elem.data_cnt));
							}
						}
					}
					var tmpData = new Array();
					tmpData.push(retDataList);
					var valPerSlice = that.map.calculateLegend(tmpData);
					this.setLegendRange(valPerSlice);		
					
					if (unit != undefined && unit.length > 0) {
						$("#legendUnit_"+that.id).text("(단위: "+unit+")");
					}
					
//					$("#legend_"+that.id).find(".remarkbox").show();
				};
				
				this.setLegendRange = function (_valPerSlice) {
					if (_valPerSlice != undefined) {
						$("#legendColor_"+this.id).find("#selectEvenLegend").show();
						
						var valPerSlice = _valPerSlice;			
						var point = valPerSlice[0];
						for (var i=0; i<5; i++) {
							$("#legend_" + this.id).find("#legendRange" + (i+1)).text("-");
						}
						
						if (point.length < 5) {
							for (var i=0; i<point.length; i++) {
								if (parseFloat(point[i]) < 5) {
									$("#legend_" + this.id).find("#legendRange1").text("5 미만");
								}else {
									$("#legend_" + this.id).find("#legendRange" + (i+1)).text(appendCommaToNumber(point[i]));
								}								
							}
						}else {
							
							//범례값이 모두  1또는 0이면, 범례값을 5미만으로 처리
							var isNA = true;
							for (var i=0; i<point.length; i++) {
								if (point[i] != 1 && point[i] != 0) {
									isNA = false;
									break;
								}
							}
							
							if (isNA) {
								$("#legend_" + this.id).find("#legendRange1").text("5 미만");
							}else {
								var point1 = (point[0] != "") ? appendCommaToNumber(point[0]) : "-";
								var point2 = (point[1] != "") ? appendCommaToNumber(point[1]) : "-";
								var point3 = (point[2] != "") ? appendCommaToNumber(point[2]) : "-";
								var point4 = (point[3] != "") ? appendCommaToNumber(point[3]) : "-";
								
								$("#legend_" + this.id).find("#legendRange1").text(point1 + " 미만");
								$("#legend_" + this.id).find("#legendRange2").text(point2 + " 미만");
								$("#legend_" + this.id).find("#legendRange3").text(point3 + " 미만");
								$("#legend_" + this.id).find("#legendRange4").text(point4 + " 미만");
								$("#legend_" + this.id).find("#legendRange5").text(point4 + " 이상");
							}
						}
						
					}else {
						$("#legendUnit_"+this.id).html("");
						$("#legendColor_"+this.id).find("#selectEvenLegend").hide();
						
						$("#legend_" + this.id).find("#legendRange1").text("하");
						$("#legend_" + this.id).find("#legendRange2").text("중하");
						$("#legend_" + this.id).find("#legendRange3").text("중");
						$("#legend_" + this.id).find("#legendRange4").text("중상");
						$("#legend_" + this.id).find("#legendRange5").text("상");
					}
					
					
					$("#legendColor1_" + this.id).parent().css("background-color", "#fff");
					$("#legendColor2_" + this.id).parent().css("background-color", "#fff");
					$("#legendColor3_" + this.id).parent().css("background-color", "#fff");
					$("#legendColor4_" + this.id).parent().css("background-color", "#fff");
					$("#legendColor5_" + this.id).parent().css("background-color", "#fff");
					
//					$("#legend_"+that.id).find(".remarkbox").show();
					
				};
				
				this.updateLegendRangeKosis = function(res) {
					var retDataList = [];	//수치 데이터
					for(var i = 0; i < res.length; i ++) {
						retDataList.push(res[i].DATA);
					}
					var tmpData = new Array();
					tmpData.push(retDataList);
					var valPerSlice = that.map.calculateLegend(tmpData);
					this.setLegendRange(valPerSlice);
//					$("#legend_"+that.id).find(".remarkbox").show();
				};
				
				//권리금 업데이트
				this.updateForeGift = function(title, dataObj) {
					$(that.foreGiftObj).find(".stats_tit > span").html(title);
					$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(2)").html("");
					$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(1)").html("");
					$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(0)").html("");

					var largeData = " ";
					var middleData = " ";
					var smallData = " ";
					if(dataObj.length == 3) {
						largeData = dataObj[1] + " 이상";
						middleData = dataObj[1] + " 미만";
						smallData = dataObj[0] + " 미만";
						
					} else if(dataObj.length == 2) {
						middleData = dataObj[1];
						smallData = dataObj[0];
					} else if(dataObj.length == 1) {
						smallData = dataObj[0];
					}
					
					$(that.foreGiftObj).find(".stats_tit").html(title);
					$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(0)").html(largeData);
					$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(1)").html(middleData);
					$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(2)").html(smallData);
					
					$(that.foreGiftObj).show();
					$(that.foreGiftObj).find(".statsbox").show();
				};
				
				this.updateMiniMap = function() {
					$(that.minimapObj).show();
				};
				
				//타이틀 업데이트
				this.updateSearchTitle = function (options) {
					if (options == null) {
						return;
					}
					
					//타이틀 & 출처
					var data = this.getTitleAndReference(options);
					
					$(that.searchTitleObj).find(".title_txt").html(textSubString(data.titleText, 32));
					$(that.searchTitleObj).find(".hidden_title_txt").html(data.titleText);		//Hidden Full 타이틀
					$("#searchTitle_"+that.id).find(".title_txt").tooltip({
		        		content : data.titleText,
		        		position : {my: "left+10 top-40"},
						track: true
		        	});
					$(that.searchTitleObj).find(".reference_txt").html(data.reference);
					$(that.searchTitleObj).show();
				};
				
				//타이틀 & 출처 가져오기
				this.getTitleAndReference = function(options) {
					var returnData = {};
					var titleText = "";
					var year = "";
					var reference = "";

					if (options.params == undefined ) {		//KOSIS
						titleText = options;
						reference = "출처 : KOSIS(<a href='javascript:interactiveMapKosis.kosisLinked();'>통계표보기</a>)";
					} else {	//인터랙티브
						//타이틀만들기 
						for (var i=0; i<options.params.param.length; i++) {
							if (options.params.param[i].key == "year") {
								
								if(options.btntype == "items" || options.btntype == "combine") {	//결합일경우
									titleText = options.params.title;
								} else {
									titleText = options.params.title + "(" + options.params.unit + ")";
								}
								
								year = options.params.param[i].value;
								break;
							}
						}
		
						//조건결합일 경우, 하드코딩
						if( Object.prototype.toString.call( options.params.api_id ) === '[object Array]' ) {
							reference += "통계청, 인구주택총조사";
						}else {
							var tmpApiId = options.params.api_id.split(" | ");
							for (var i=0; i<tmpApiId.length; i++) {
								if(tmpApiId[i] == "API_0301" || tmpApiId[i] == "API_0302" ||
								   tmpApiId[i] == "API_0305" || tmpApiId[i] == "API_0306") {
									reference = this.getReference(reference, 0);
								} else if(tmpApiId[i] == "API_0304") {
									reference = this.getReference(reference, 1);
								} else if(tmpApiId[i] == "API_0307" || tmpApiId[i] == "API_0308" ||
										  tmpApiId[i] == "API_0309" || tmpApiId[i] == "API_0310") {
									reference = this.getReference(reference, 2);
								} else {	//default
									reference = this.getReference(reference, 0);
								}
							}
						}
						
						reference = "출처 : " + reference + " (" + year + ")";
					}
					
					returnData = {
							titleText : titleText,
							reference : reference
					}
					
					return returnData;
				}
				
				//출처가져오기
				this.getReference = function(reftext, idx) {
					var ref = {
							0 : "통계청, 인구주택총조사",
							1 : "통계청, 전국사업체조사",
							2 : "통계청, 농림어업총조사"
					};
					if (reftext != ref[idx]) {
						if (reftext != "") {
							reftext += " | ";
						}
						reftext += ref[idx];
					}else {
						reftext.replace(" | ", "");
					}
					return reftext;
				};
				
				//시계열 업데이트
				this.updateTimeSeries = function(options) {
					var date = new Date();
					var minYear = 2000;		//최소년도 기본 2000년
					var maxYear = date.getFullYear()-1;		//작년도를 maxYear로 잡는다.
					var viewMaxYear = "";
					var html = "";
					var base_year = "";
					
					if(options.params.api_id == "API_0304") {	//사업체일 경우 기본 최소년도는 2006년
						minYear = 2006;
					}
					
					if (options.params.maxYear != undefined &&
						options.params.maxYear.length > 0) {
						maxYear = options.params.maxYear;
					}

					if (options.params.param != undefined && 
						options.params.param.length > 0) {
						for (var i=0; i<options.params.param.length; i++) {
							if (options.params.param[i].key == "year") {
								base_year = options.params.param[i].value;
							} else if(options.params.param[i].key == "class_deg") {		//8차 산업분류일 경우 시작년도는 2000년
								minYear = 2000;
							}
						}
					}

					$(that.timeSeriesObj).find("#tableTimeSeries").empty();
					that.yearArray = new Array();
					
					//시계열바의 width를 정한다.
					var diffYear = 0;
					var widthPer = 0;
					if(options.params.api_id == "API_0304") {
						diffYear = maxYear - minYear + 1;
					} else {
						for(var year = minYear; year < date.getFullYear(); year ++) {
							if((year % 5) == 0) {
								++diffYear;
							}
						}
					}
					widthPer = parseFloat(98 / diffYear).toFixed(1);
					
					html += "	<ul>";
					//사업체일 경우 1년단위
					if(options.params.api_id == "API_0304") {
						for(var year = minYear; year <= maxYear; year ++) {
							viewMaxYear = year;
							if(year == minYear) {
								html += "<li class='first' id='tdYear"+year+"' style='width: "+widthPer+"%;'>";
								html += "		<p>"+year+"</p>";
								html += "		<em class='on'>&nbsp;</em>";		//( 회색 바  --  class='on' 추가시 활성화 )
								html += "		<span class='on'>&nbsp;</span>";		//( 회색 원  --  class='on' 추가시 활성화 )
								html += "</li>";	
							} else if(year == maxYear) {
								html += "<li class='last' id='tdYear"+year+"' style='width: "+widthPer+"%;'>";
								html += "		<p>"+year+"</p>";
								html += "		<span class='on'>&nbsp;</span>";		//( 회색 원  --  class='on' 추가시 활성화 )
								html += "</li>";
							} else {
								html += "<li id='tdYear"+year+"' style='width: "+widthPer+"%;'>";
								html += "		<p>"+year+"</p>";
								html += "		<em class='on'>&nbsp;</em>";		//( 회색 바  --  class='on' 추가시 활성화 )
								html += "		<span class='on'>&nbsp;</span>";		//( 회색 원  --  class='on' 추가시 활성화 )
								html += "</li>";
							}
							
							that.yearArray.push(year);
						}
						
					} else {	//나머지는 5년단위
						var cnt = 1;
						for(var year = minYear; year < date.getFullYear(); year ++) {
							if((year % 5) == 0) {
								if(year <= maxYear) {
									viewMaxYear = year;
									if(cnt == 1) {
										html += "<li class='first' id='tdYear"+year+"' style='width: "+widthPer+"%;'>";
										html += "		<p>"+year+"</p>";
										html += "		<em class='on'>&nbsp;</em>";		//( 회색 바  --  class='on' 추가시 활성화 )
										html += "		<span class='on'>&nbsp;</span>";		//( 회색 원  --  class='on' 추가시 활성화 )
										html += "</li>";	
									} else if(cnt == diffYear) {
										html += "<li class='last' id='tdYear"+year+"' style='width: "+widthPer+"%;'>";
										html += "		<p>"+year+"</p>";
										html += "		<span class='on'>&nbsp;</span>";		//( 회색 원  --  class='on' 추가시 활성화 )
										html += "</li>";
									} else {
										html += "<li id='tdYear"+year+"' style='width: "+widthPer+"%;'>";
										html += "		<p>"+year+"</p>";
										html += "		<em class='on'>&nbsp;</em>";		//( 회색 바  --  class='on' 추가시 활성화 )
										html += "		<span class='on'>&nbsp;</span>";		//( 회색 원  --  class='on' 추가시 활성화 )
										html += "</li>";
									}
									that.yearArray.push(year);
									++cnt;
								}
							}
						}
					}
					html += "	</ul>";
					$(that.timeSeriesObj).find("#tableTimeSeries").append(html);
					
					for(var i = 0; i < that.yearArray.length; i ++) {
						$(that.timeSeriesObj).find("#tdYear"+that.yearArray[i]).on('click', function() {
							that.selectTimeSeries(options, $(this));
						});
					}
					
					// 링크로 넘어왔을 경우, 최초검색(파라미터 base_year 기반으로 해당년도 선택)
					if ((base_year != undefined && base_year != "" && base_year.length > 0) &&
						(that.selectSeriesYear == undefined || that.selectSeriesYear == "")) {
						$(that.timeSeriesObj).find("#tdYear"+base_year + " > p ").css("color", "#de0000");
						$(that.timeSeriesObj).find("#tdYear"+base_year + " > span ").css("background", "url(/img/im/circle_img05.png)");
						that.selectSeriesYear = base_year;
					} 
					//링크가 아닌, 최초검색
					else if(that.selectSeriesYear == undefined || that.selectSeriesYear == "") {
						$(that.timeSeriesObj).find("#tdYear"+viewMaxYear + " > p ").css("color", "#de0000");
						$(that.timeSeriesObj).find("#tdYear"+viewMaxYear + " > span ").css("background", "url(/img/im/circle_img05.png)");
						that.selectSeriesYear = viewMaxYear;
					} else {
						that.selectSeriesYear = base_year;
						$(that.timeSeriesObj).find("#tdYear"+that.selectSeriesYear + " > p ").css("color", "#de0000");
						$(that.timeSeriesObj).find("#tdYear"+that.selectSeriesYear + " > span ").css("background", "url(/img/im/circle_img05.png)");
					}
					
					$(that.timeSeriesObj).show();
				};
				
				//시계열 년도 선택 시 조회
				this.selectTimeSeries = function(options, yearObj) {
					if (this.yearArray.length != this.timeSeriesPushData.length) {
						that.selectSeriesYear = $(yearObj).find("p").html();
						
						// share정보 초기화
						this.delegate.curMapId = map.id;
						this.delegate.shareUrlInfo = [];
						
						for(var i = 0; i < options.params.param.length; i ++) {
							if(options.params.param[i].key == "year") {
								options.params.param[i].value = $(yearObj).find("p").html();
							}
						}
						
						var btnSrc = $(that.timeSeriesObj).find("#timeSeriesPlayBtn > span > img").attr("src");
						var btnType = "";
						if(btnSrc.indexOf("btn_stop_on.gif") > -1) {
							btnType = "stop";
						} else {
							btnType = "play";
						}
						
						options.params["view_type"] = "TS";
						if(btnType == "stop") {	//애니메이션이 실행중일 경우
							options.params["isTimeSeriesYn"] = "Y";
						}
						this.delegate.requestOpenApi(options.params);
					}
				}
				
				//시계열 애니메이션이 끝까지 돌았는지 확인
				this.doReqTimeSeries = function() {
					if (this.yearArray.length > 0) {
						if (this.timeSeriesCnt == this.yearArray.length) {
							this.isTimeSeriesPlay = false;
							that.timer = setInterval(this.timerSeriesPlay, 2000);
							this.timeSeriesCnt = 0;
							return;
						}
						$(that.timeSeriesObj).find("#tdYear"+this.yearArray[this.timeSeriesCnt]).click();
						this.timeSeriesCnt ++;
					}
				},
				
				//시계열 애니메이션 플레이
				this.timerSeriesPlay = function() {
					that.map.isDrop = true;
					that.map.undoDropLayerBounds();
					for(var i = 0; i < that.yearArray.length; i ++) {	
						if(that.selectSeriesYear == that.yearArray[i]) {
							
							if((i+1) == that.yearArray.length) {
								that.selectSeriesYear = that.yearArray[0];
								var tmpOptions = that.timeSeriesPushData[0].options;
								for(var x = 0; x < tmpOptions.params.param.length; x ++) {
									if(tmpOptions.params.param[x].key == "year") {
										tmpOptions.params.param[x].value = that.selectSeriesYear;
									}
								}
								$interactiveMapApi.request.setStatsData(that.timeSeriesPushData[0].res, tmpOptions);
								
							} else {
								that.selectSeriesYear = that.yearArray[i+1];
								var tmpOptions = that.timeSeriesPushData[i+1].options;
								for(var x = 0; x < tmpOptions.params.param.length; x ++) {
									if(tmpOptions.params.param[x].key == "year") {
										tmpOptions.params.param[x].value = that.selectSeriesYear;
									}
								}
								$interactiveMapApi.request.setStatsData(that.timeSeriesPushData[i+1].res, tmpOptions);
							}
							break;
						}
					}
				};
				
				//시계열 애니메이션에서 검색값이 없을 경우
				this.emptyTimerBaseInsert = function(res, options) {
					if (this.isTimeSeriesPlay) {
						that.timeSeriesPushData.push({
							"res" : res,
							"options": options
						});
						
						if (this.timeSeriesCnt == this.yearArray.length) {
							this.isTimeSeriesPlay = false;
							that.timer = setInterval(this.timerSeriesPlay, 2000);
							this.timeSeriesCnt = 0;
							return;
						}
						
						that.doReqTimeSeries();
					}
				};
				
				//경계 선택 시 차트에서 해당하는 값을 하이라이트
				this.selectChartData = function(properties, index) {
					var charts = $("#barChart_"+this.id).find("#container_graph_bar").highcharts();
					//그래프가 열려있을 때 툴팁 보여줌
					if($("#barChart_"+this.id).find("#container_graph_bar").is(":visible")) {
						var adm_cd = properties.adm_cd;
						var ssaArray = properties.adm_nm.split(" ");
						
						if(charts != undefined && index != undefined && index != null) {
							if (this.lastChatIndex != null) {
								charts.series[0].data[this.lastChatIndex].update({ color: '#2951f2' });
							}
							charts.series[0].data[index].update({ color: '#fe5800' });
							charts.tooltip.refresh(charts.series[0].data[index]);				
							this.lastChatIndex = index;
						}
					}
				};
				
				//경계 선택 시 범례에서 해당하는 값을 하이라이트
				this.selectLegendRangeData = function(fillColor) {
					$("#legendColor1_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor2_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor3_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor4_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor5_"+this.id).parent().css("background-color", "#fff");
					
					if(this.legendColor1 == fillColor) {
						$("#legendColor1_"+this.id).parent().css("background-color", "#fa9696");
					} else if(this.legendColor2 == fillColor) {
						$("#legendColor2_"+this.id).parent().css("background-color", "#fa9696");
					} else if(this.legendColor3 == fillColor) {
						$("#legendColor3_"+this.id).parent().css("background-color", "#fa9696");
					} else if(this.legendColor4 == fillColor) {
						$("#legendColor4_"+this.id).parent().css("background-color", "#fa9696");
					} else if(this.legendColor5 == fillColor) {
						$("#legendColor5_"+this.id).parent().css("background-color", "#fa9696");
					}
				};
				
				//컬러픽커 설정
				this.colorPickerSet = function() {
					$('#legendColor_'+this.id).find('.color-box').colpick({
						colorScheme:'dark',
						layout:'rgbhex',
						color: '#ededed',
						onSubmit: function (hsb, hex, rgb, el) {
							$(el).css('backgroundColor', '#' + hex);
							$(el).colpickHide();
							that.userColorChg();
						}
					}).css('background-color' , '#ededed');
					
					$('#legendColor_'+this.id).find('.color-box2').colpick({
						colorScheme:'dark',
						layout:'rgbhex',
						color: '#05f5b9',
						onSubmit: function (hsb, hex, rgb, el) {
							$(el).css('backgroundColor', '#' + hex);
							$(el).colpickHide();
							that.userColorChg();
						}
					}).css('background-color', '#05f5b9');
					
					$(".colpick").css("z-index", 3);
				};
				
				//사용자 지정 색상
				this.userColorChg = function() {
					var arrColor = new Array();
					var paramColor1 = $('#legendColor_'+this.id).find('.color-box').colpick().css('background-color');
					var paramColor2 = $('#legendColor_'+this.id).find('.color-box2').colpick().css('background-color');
					
					for ( var i = 0; i < 10; i++) {
						var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, 9);
						arrColor.push(paramColor);
					}
					
					$('#legendColor_'+this.id).find(".colpick_gradation").html("");
					for ( var i = 0; i < arrColor.length; i++) {
						if(i % 2 == 0) {
							$('#legendColor_'+this.id).find(".colpick_gradation").append(
									"<span style='background:" + arrColor[i] + ";'>&nbsp;</span>");	
						}
					}
				};
				
				//범례적용
				this.colorApply = function() {
					if($("#legendColor_"+this.id).find("#legend_auto").is(":checked")) {
						that.map.legendType = "auto";
					}
					
					if($("#legendColor_"+this.id).find("#legend_equal").is(":checked")) {
						that.map.legendType = "equal";
					}
					
					if($("#legendColor_"+this.id).find("#legend_user").is(":checked")) {
						that.map.legendType = "user";
					} 
					
					if (that.map.legendType == 'equal') {
						that.map.valPerSlice = that.map.legendValue.equal;
					}
					else if (that.map.legendType == 'auto') {
						that.map.valPerSlice = that.map.legendValue.auto;
					}
					else if (that.map.legendType == 'user') {
						if (that.map.legendValue.user != undefined && that.map.legendValue.user.length > 0) {
							var value1 = parseFloat($("#legend_1_2").val());
							var value2 = parseFloat($("#legend_2_2").val());
							var value3 = parseFloat($("#legend_3_2").val());
							var value4 = parseFloat($("#legend_4_2").val());
							var value5 = parseFloat($("#legend_2_1").val());
							var value6 = parseFloat($("#legend_3_1").val());
							var value7 = parseFloat($("#legend_4_1").val());
							
							if (parseFloat(value2) <= parseFloat(value5)) {
								messageAlert.open("알림", "2구간 " + value2+ "은 2구간 " +value5+ "보다 작거나 같을 수 없습니다.");
								return;
							}else if (parseFloat(value3) <= parseFloat(value6)) {
								messageAlert.open("알림", "3구간 " + value3+ "은 3구간 " +value6+ "보다 작거나 같을 수 없습니다.");
								return;
							}else if (parseFloat(value4) <= parseFloat(value7)) {
								messageAlert.open("알림", "4구간 " + value4+ "은 4구간 " +value7+ "보다 작거나 같을 수 없습니다.");
								return;
							}else if (parseFloat(value1) >= parseFloat(value2)) {
								messageAlert.open("알림", "1구간 " + value1+ "은 2구간 " +value2+ "보다 크거나 같을 수 없습니다.");
								return;
							}else if (parseFloat(value2) >= parseFloat(value3)) {
								messageAlert.open("알림", "2구간 " + value2+ "은 3구간 " +value3+ "보다 크거나 같을 수 없습니다.");
								return;
							}else if (parseFloat(value3) >= parseFloat(value4)) {
								messageAlert.open("알림", "3구간 " + value3+ "은 4구간 " +value4+ "보다 크거나 같을 수 없습니다.");
								return;
							}
							
							that.map.legendValue.user[0][0] = value1;
							that.map.legendValue.user[0][1] = value2;
							that.map.legendValue.user[0][2] = value3;
							that.map.legendValue.user[0][3] = value4;
							that.map.legendValue.user[0][4] = "";
						}						
						that.map.valPerSlice = that.map.legendValue.user;
					}

					if(that.map.valPerSlice != undefined && that.map.valPerSlice.length > 0){
						that.setLegendRange(that.map.valPerSlice);
					}
					
					var legend = $("#legend_"+this.id);
					var legendColor = $("#legendColor_"+this.id);
					if(legendColor.find("input[name='setColor_"+this.id+"']:checked").val() == "BW") {	//검정 & 화이트
						legend.find("#legendColor1_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(0)").css("background-color"));
						legend.find("#legendColor2_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(1)").css("background-color"));
						legend.find("#legendColor3_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(2)").css("background-color"));
						legend.find("#legendColor4_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(3)").css("background-color"));
						legend.find("#legendColor5_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(4)").css("background-color"));
					} else if(legendColor.find("input[name='setColor_"+this.id+"']:checked").val() == "Blue") {	//파랑색
						legend.find("#legendColor1_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(0)").css("background-color"));
						legend.find("#legendColor2_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(1)").css("background-color"));
						legend.find("#legendColor3_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(2)").css("background-color"));
						legend.find("#legendColor4_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(3)").css("background-color"));
						legend.find("#legendColor5_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(4)").css("background-color"));
					} else if(legendColor.find("input[name='setColor_"+this.id+"']:checked").val() == "Red") {	//붉은색
						legend.find("#legendColor1_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(0)").css("background-color"));
						legend.find("#legendColor2_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(1)").css("background-color"));
						legend.find("#legendColor3_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(2)").css("background-color"));
						legend.find("#legendColor4_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(3)").css("background-color"));
						legend.find("#legendColor5_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(4)").css("background-color"));
					} else if(legendColor.find("input[name='setColor_"+this.id+"']:checked").val() == "Mix") {	//사용자 지정
						legend.find("#legendColor1_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(0)").css("background-color"));
						legend.find("#legendColor2_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(1)").css("background-color"));
						legend.find("#legendColor3_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(2)").css("background-color"));
						legend.find("#legendColor4_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(3)").css("background-color"));
						legend.find("#legendColor5_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(4)").css("background-color"));
					}
					
					this.colorVarSet();
					$("#legendColor_"+that.id).find(".remarks_option").hide();
					$('#legendColor_'+that.id).find('.color-box').colpick().colpickHide();
					$('#legendColor_'+that.id).find('.color-box2').colpick().colpickHide();
					$(that.userLegendObj).find(".remarksUser_option").hide();
				};
				
				//범례를 변수에 저장
				this.colorVarSet = function() {
					var legend = $("#legend_"+this.id);
					this.legendColor1 = legend.find("#legendColor1_"+this.id).css("background-color");
					this.legendColor2 = legend.find("#legendColor2_"+this.id).css("background-color");
					this.legendColor3 = legend.find("#legendColor3_"+this.id).css("background-color");
					this.legendColor4 = legend.find("#legendColor4_"+this.id).css("background-color");
					this.legendColor5 = legend.find("#legendColor5_"+this.id).css("background-color");
					
					var tmpColors = [
					                 this.legendColor1,
					                 this.legendColor2, 
					                 this.legendColor3, 
					                 this.legendColor4, 
					                 this.legendColor5 ];
					this.map.setLegendColor(tmpColors);
					
				};
				
				//경계 선택 시 임대료 범례에서 해당하는 값을 하이라이트
				this.selectRentalLegendRangeData = function(fillColor) {
					$("#rentalLegendColor1_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor2_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor3_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor4_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor5_"+this.id).parent().css("background-color", "#fff");
					
					var legend = $("#rentalLegend_"+this.id);
					if(legend.find("#rentalLegendColor1_"+this.id).css("background-color") == fillColor) {
						$("#rentalLegendColor1_"+this.id).parent().css("background-color", "#fa9696");
					} else if(legend.find("#rentalLegendColor2_"+this.id).css("background-color") == fillColor) {
						$("#rentalLegendColor2_"+this.id).parent().css("background-color", "#fa9696");
					} else if(legend.find("#rentalLegendColor3_"+this.id).css("background-color") == fillColor) {
						$("#rentalLegendColor3_"+this.id).parent().css("background-color", "#fa9696");
					} else if(legend.find("#rentalLegendColor4_"+this.id).css("background-color") == fillColor) {
						$("#rentalLegendColor4_"+this.id).parent().css("background-color", "#fa9696");
					} else if(legend.find("#rentalLegendColor5_"+this.id).css("background-color") == fillColor) {
						$("#rentalLegendColor5_"+this.id).parent().css("background-color", "#fa9696");
					}
				};
				
				//임대료 컬러픽커 설정
				this.rentalColorPickerSet = function() {
					$('#rentalLegendColor_'+this.id).find('.color-box').colpick({
						colorScheme:'dark',
						layout:'rgbhex',
						color: '#ededed',
						onSubmit: function (hsb, hex, rgb, el) {
							$(el).css('backgroundColor', '#' + hex);
							$(el).colpickHide();
							that.userColorChg();
						}
					}).css('background-color' , '#ededed');
					
					$('#rentalLegendColor_'+this.id).find('.color-box2').colpick({
						colorScheme:'dark',
						layout:'rgbhex',
						color: '#05f5b9',
						onSubmit: function (hsb, hex, rgb, el) {
							$(el).css('backgroundColor', '#' + hex);
							$(el).colpickHide();
							that.userColorChg();
						}
					}).css('background-color', '#05f5b9');
					
					$(".colpick").css("z-index", 3);
				};
				
				//임대료 사용자 지정 색상
				this.rentalUserColorChg = function() {
					var arrColor = new Array();
					var paramColor1 = $('#rentalLegendColor_'+this.id).find('.color-box').colpick().css('background-color');
					var paramColor2 = $('#rentalLegendColor_'+this.id).find('.color-box2').colpick().css('background-color');
					
					for ( var i = 0; i < 10; i++) {
						var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, 9);
						arrColor.push(paramColor);
					}
					
					$('#rentalLegendColor_'+this.id).find(".colpick_gradation").html("");
					for ( var i = 0; i < arrColor.length; i++) {
						if(i % 2 == 0) {
							$('#rentalLegendColor_'+this.id).find(".colpick_gradation").append(
									"<span style='background:" + arrColor[i] + ";'>&nbsp;</span>");	
						}
					}
				};
				
				//임대료 범례적용
				this.rentalColorApply = function() {
					if($("#rentalLegendColor_"+this.id).find("#legend_auto").is(":checked")) {
						that.rentalLegendType = "auto";
					} else {
						that.rentalLegendType = "equal";
					}

					if (that.rentalLegendType == "equal") {
						that.rentalValPerSlice = that.rentalLegendValue.equal;
					}
					else if (that.rentalLegendType == "auto") {
						that.rentalValPerSlice = that.rentalLegendValue.auto;
					}

					if(that.rentalValPerSlice != undefined){
						var colorLegendTitle = "";
						var circleLegendTitle = "";
						var table = $("#userUpload_"+this.id).dataTable();
						for (var i=0; i<table.fnSettings().aoColumns.length; i++) {
							if (table.fnSettings().aoColumns[i].name == "uda") {
								colorLegendTitle = table.fnSettings().aoColumns[i].title;
							}
							if (table.fnSettings().aoColumns[i].name == "udb") {
								circleLegendTitle = table.fnSettings().aoColumns[i].title;
							}
						};
						that.setRentalLegendRange(colorLegendTitle, that.rentalValPerSlice.color);
						that.updateForeGift(circleLegendTitle, that.rentalValPerSlice.circle);
					}
					
					var legend = $(that.rentalLegendObj);
					var legendColor = $("#rentalLegendColor_"+this.id);
					if(legendColor.find("input[name='setRentalColor_"+this.id+"']:checked").val() == "BW") {	//검정 & 화이트
						legend.find("#rentalLegendColor1_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(0)").css("background-color"));
						legend.find("#rentalLegendColor2_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(1)").css("background-color"));
						legend.find("#rentalLegendColor3_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(2)").css("background-color"));
						legend.find("#rentalLegendColor4_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(3)").css("background-color"));
						legend.find("#rentalLegendColor5_"+this.id).css("background-color", legendColor.find(".color_01 > span:eq(4)").css("background-color"));
					} else if(legendColor.find("input[name='setRentalColor_"+this.id+"']:checked").val() == "Blue") {	//파랑색
						legend.find("#rentalLegendColor1_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(0)").css("background-color"));
						legend.find("#rentalLegendColor2_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(1)").css("background-color"));
						legend.find("#rentalLegendColor3_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(2)").css("background-color"));
						legend.find("#rentalLegendColor4_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(3)").css("background-color"));
						legend.find("#rentalLegendColor5_"+this.id).css("background-color", legendColor.find(".color_02 > span:eq(4)").css("background-color"));
					} else if(legendColor.find("input[name='setRentalColor_"+this.id+"']:checked").val() == "Red") {	//붉은색
						legend.find("#rentalLegendColor1_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(0)").css("background-color"));
						legend.find("#rentalLegendColor2_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(1)").css("background-color"));
						legend.find("#rentalLegendColor3_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(2)").css("background-color"));
						legend.find("#rentalLegendColor4_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(3)").css("background-color"));
						legend.find("#rentalLegendColor5_"+this.id).css("background-color", legendColor.find(".color_03 > span:eq(4)").css("background-color"));
					} else if(legendColor.find("input[name='setRentalColor_"+this.id+"']:checked").val() == "Mix") {	//사용자 지정
						legend.find("#rentalLegendColor1_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(0)").css("background-color"));
						legend.find("#rentalLegendColor2_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(1)").css("background-color"));
						legend.find("#rentalLegendColor3_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(2)").css("background-color"));
						legend.find("#rentalLegendColor4_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(3)").css("background-color"));
						legend.find("#rentalLegendColor5_"+this.id).css("background-color", legendColor.find(".colpick_gradation > span:eq(4)").css("background-color"));
					}
					
					$("#rentalLegendColor_"+that.id).find(".rental_remarks_option").hide();
					$('#rentalLegendColor_'+that.id).find('.color-box').colpick().colpickHide();
					$('#rentalLegendColor_'+that.id).find('.color-box2').colpick().colpickHide();
					
					this.rentalLegendColor = [
					         legend.find("#rentalLegendColor1_"+this.id).css("background-color"),
					         legend.find("#rentalLegendColor2_"+this.id).css("background-color"),
					         legend.find("#rentalLegendColor3_"+this.id).css("background-color"),
					         legend.find("#rentalLegendColor4_"+this.id).css("background-color"),
					         legend.find("#rentalLegendColor5_"+this.id).css("background-color"),
					];
					
					//서클 색상변경
					for (var i=0; i<this.markerGroup.length; i++) {
						var data = this.markerGroup[i].data;
						var legend = this.getCircleLengendInfo(data[0], data[1]);
						var marker = this.markerGroup[i].marker;
						marker.setStyle({
							radius:legend.circle[0],
							fillColor : legend.color[0],
							fillOpacity : 0.7,
							renderer: this.map.render
						});
					}
					
				};
				
				//임대료 범례값 세팅
				this.setRentalLegendRange = function (title, _valPerSlice) {
					$(that.rentalLegendObj).find(".remarks_tit > span").html(title);
					if (_valPerSlice != undefined) {
						$("#rentalLegendColor_"+this.id).find("#selectEvenLegend").show();
						var point = _valPerSlice;
						
						for (var i=0; i<5; i++) {
							$("#rentalLegend_" + this.id).find("#legendRange" + (i+1)).text("-");
						}
						if (point.length < 5) {
							for (var i=0; i<point.length; i++) {
								$("#rentalLegend_" + this.id).find("#legendRange" + (i+1)).text(appendCommaToNumber(point[i]));
							}
							
						}else {
							var point1 = (point[0] != "") ? appendCommaToNumber(point[0]) : "-";
							var point2 = (point[1] != "") ? appendCommaToNumber(point[1]) : "-";
							var point3 = (point[2] != "") ? appendCommaToNumber(point[2]) : "-";
							var point4 = (point[3] != "") ? appendCommaToNumber(point[3]) : "-";
							
							$("#rentalLegend_" + this.id).find("#legendRange1").text(point1 + " 미만");
							$("#rentalLegend_" + this.id).find("#legendRange2").text(point2 + " 미만");
							$("#rentalLegend_" + this.id).find("#legendRange3").text(point3 + " 미만");
							$("#rentalLegend_" + this.id).find("#legendRange4").text(point4 + " 미만");
							$("#rentalLegend_" + this.id).find("#legendRange5").text(point4 + " 이상");
						}
						
					}else {
						$("#rentalLegendColor_"+this.id).find("#selectEvenLegend").hide();
						
						$("#rentalLegend_" + this.id).find("#legendRange1").text("하");
						$("#rentalLegend_" + this.id).find("#legendRange2").text("하중");
						$("#rentalLegend_" + this.id).find("#legendRange3").text("중");
						$("#rentalLegend_" + this.id).find("#legendRange4").text("중상");
						$("#rentalLegend_" + this.id).find("#legendRange5").text("상");
					}
					
					$("#rentalLegendColor1_" + this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor2_" + this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor3_" + this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor4_" + this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor5_" + this.id).parent().css("background-color", "#fff");
					
					$(that.rentalLegendObj).show();
					$(that.rentalLegendObj).find(".remarkbox").show();
				};
				
				this.updateUserLegend = function() {
					if (that.map.valPerSlice != undefined && that.map.valPerSlice.length > 0){
						var value = that.map.legendValue.user[0];
						$("#userLegend_"+that.id).find("#legend_1_2").val(value[0]);
						$("#userLegend_"+that.id).find("#legend_2_1").val(value[0]);
						$("#userLegend_"+that.id).find("#legend_2_2").val(value[1]);
						$("#userLegend_"+that.id).find("#legend_3_1").val(value[1]);
						$("#userLegend_"+that.id).find("#legend_3_2").val(value[2]);
						$("#userLegend_"+that.id).find("#legend_4_1").val(value[2]);
						$("#userLegend_"+that.id).find("#legend_4_2").val(value[3]);
						$("#userLegend_"+that.id).find("#legend_5_1").val(value[3]);
					}
				};
				
				//지도 추가
				this.addMap = function() {
					if (this.delegate && this.delegate.addMap instanceof Function) {
						this.delegate.addMap();
					}
				};
				
				//지도 삭제
				this.removeMap = function(num) {
					if (this.delegate && this.delegate.addMap instanceof Function) {
						this.delegate.removeMap(num);
					}
					
				};
				
				//초기화
				this.resetMapInfo = function() {
					$("#legend_"+this.id).find("#legendRange1").text("-");
					$("#legend_"+this.id).find("#legendRange2").text("-");
					$("#legend_"+this.id).find("#legendRange3").text("-");
					$("#legend_"+this.id).find("#legendRange4").text("-");
					$("#legend_"+this.id).find("#legendRange5").text("-");
					
					$("#legendColor1_"+this.id).css("background-color", "#ffddd7");
					$("#legendColor2_"+this.id).css("background-color", "#ffb2a5");
					$("#legendColor3_"+this.id).css("background-color", "#ff806c");
					$("#legendColor4_"+this.id).css("background-color", "#ff593f");
					$("#legendColor5_"+this.id).css("background-color", "#ff2400");
					
					$("#legendColor1_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor2_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor3_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor4_"+this.id).parent().css("background-color", "#fff");
					$("#legendColor5_"+this.id).parent().css("background-color", "#fff");
					
					$("#rentalLegend_"+this.id).find("#legendRange1").text("-");
					$("#rentalLegend_"+this.id).find("#legendRange2").text("-");
					$("#rentalLegend_"+this.id).find("#legendRange3").text("-");
					$("#rentalLegend_"+this.id).find("#legendRange4").text("-");
					$("#rentalLegend_"+this.id).find("#legendRange5").text("-");
					
					$("#rentalLegendColor1_"+this.id).css("background-color", "#e2f1ff");
					$("#rentalLegendColor2_"+this.id).css("background-color", "#badcff");
					$("#rentalLegendColor3_"+this.id).css("background-color", "#7dbdff");
					$("#rentalLegendColor4_"+this.id).css("background-color", "#409eff");
					$("#rentalLegendColor5_"+this.id).css("background-color", "#0880fa");
					
					$("#rentalLegendColor1_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor2_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor3_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor4_"+this.id).parent().css("background-color", "#fff");
					$("#rentalLegendColor5_"+this.id).parent().css("background-color", "#fff");
					
					$("#userLegend_"+this.id).find("#legend_1_2").val("100");
					$("#userLegend_"+this.id).find("#legend_2_1").val("100");
					$("#userLegend_"+this.id).find("#legend_2_2").val("200");
					$("#userLegend_"+this.id).find("#legend_3_1").val("200");
					$("#userLegend_"+this.id).find("#legend_3_2").val("300");
					$("#userLegend_"+this.id).find("#legend_4_1").val("300");
					$("#userLegend_"+this.id).find("#legend_4_2").val("400");
					$("#userLegend_"+this.id).find("#legend_5_1").val("400");
					
					$("#legendUnit_"+this.id).html("");
					
					$(that.pieChartObj).hide();
					$(that.barChartObj).hide();
					$(that.timeSeriesObj).hide();
					$(that.searchTitleObj).hide();
					//$(that.infoUserUploadObj).hide();
					$(that.minimapObj).hide();
					$(that.legendObj).find(".remarkbox").hide();
					$(that.legendObj).find(".remarks_option").hide();
					$(that.legendColorObj).find(".remarks_option").hide();
					$(that.legendObj).find('.color-box').colpick().colpickHide();
					$(that.legendObj).find('.color-box2').colpick().colpickHide();
					$(that.userLegendObj).find(".remarksUser_option").hide();
					$(that.foreGiftObj).find(".btn_stats").show();
					$(that.foreGiftObj).find(".statsbox").hide();	//권리금
					$(that.rentalLegendObj).find(".remarkbox").hide();	//임대료
					$(that.rentalLegendObj).find(".rental_remarks_option").hide();
					$(that.rentalLegendObj).find('.color-box').colpick().colpickHide();
					$(that.rentalLegendObj).find('.color-box2').colpick().colpickHide();
					that.resetTimeSeries();
					that.colorVarSet();
					that.lastChatIndex != null;
					
					$("#checkMarker").attr("checked", false);
					for (var i=0; i<this.markerGroup.length; i++) {
						this.markerGroup[i].marker.remove();
					}
					this.markerGroup = [];					
				};
				
				//시계열 초기화
				this.resetTimeSeries = function() {
					that.selectSeriesYear = "";	//선택된 시계열 변수값 초기화
					this.timeSeriesPushData = new Array();					//시계열 애니메이션의 정보를 담는 변수 초기화
					this.isTimeSeriesPlay = false;
					this.timeSeriesCnt = 0;
					this.timer = 0;
					$(that.timeSeriesObj).find("#timeSeriesPlayBtn > span > img").attr("src", "/img/im/btn_play_off.gif");
					clearInterval(that.timer);
				},
				
				// OpenAPI 지오코딩 검색
				this.openApiGeocode = function(address, options) {			
					var sopOpenApiGeocodeObj = new sop.openApi.openApiuserGeocode.api();
					sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
					sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent(address)));
					sopOpenApiGeocodeObj.request({
				        method : "GET",
				        async : true,
				        url : openApiPath+"/OpenAPI3/addr/geocode.json",
				        options : options
				    });
				}
				
				
			},	
			
	};
	
	/*********** 원형차트 레벨별 표출 Start **********/
	(function() {
	    $class("sop.portal.pieChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	var result = res.result;
	        	var that = options.target;
	        	var filter = options.params.filter;
	        	
	            if(res.errCd == "0") {
	            	var pplObj = new Array();
	            	var pieCount = "";
	            	var top = eval(result[0].top);
		        	var middle = eval(result[0].middle);
		        	var bottom = eval(result[0].bottom);
		        	var top_nm = result[0].top_nm;
		        	var middle_nm = result[0].middle_nm;
		        	var bottom_nm = result[0].bottom_nm;
		        	var topViewFlag = true;
		        	var middleViewFlag = true;
		        	var titleText = "";
		        	
		        	if(res.id == "4001") {	//인구통계총괄
						if (filter == "tot_ppltn") {
							pplObj = result[0].tot_ppltn;
							titleText = "총인구";
						} else if (filter == "tot_ppltn_male") {
							pplObj = result[0].tot_ppltn_male;
							titleText = "총인구-남자";
						} else if (filter == "tot_ppltn_fem") {
							pplObj = result[0].tot_ppltn_fem;
							titleText = "총인구-여자";
						} else if (filter == "avg_age") {
							pplObj = result[0].avg_age;
							titleText = "평균나이";
						} else if (filter == "avg_age_male") {
							pplObj = result[0].avg_age_male;
							titleText = "평균나이-남자";
						} else if (filter == "avg_age_fem") {
							pplObj = result[0].avg_age_fem;
							titleText = "평균나이-여자";
						} else if (filter == "ppltn_dnsty") {
							pplObj = result[0].ppltn_dnsty;
							titleText = "인구밀도";
						} else if (filter == "aged_child_idx") {
							pplObj = result[0].aged_child_idx;
							titleText = "노령화지수";
						} else if (filter == "oldage_suprt_per") {
							pplObj = result[0].oldage_suprt_per;
							titleText = "노년부양비";
						} else if (filter == "juv_suprt_per") {
							pplObj = result[0].juv_suprt_per;
							titleText = "유년부양비";
						} else if (filter == "tot_suprt_per") {
							pplObj = result[0].tot_suprt_per;
							titleText = "총부양비";
						}
						
						pieCount = pplObj.base_cnt;
						top = eval(pplObj.top);
						middle = eval(pplObj.middle);
						bottom = eval(pplObj.bottom);
						top_nm = (pplObj.top_nm);
						middle_nm = (pplObj.middle_nm);
						bottom_nm = (pplObj.bottom_nm);
						
					} else if(res.id == "4002") {	//인구통계세부조건검색
						pieCount = result[0].population;
						titleText = "인구";
					} else if(res.id == "4004") {	//사업체분류검색
						if (filter == "tot_worker") {
							pieCount = result[0].worker.base_cnt;
							top = eval(result[0].worker.top);
				        	middle = eval(result[0].worker.middle);
				        	bottom = eval(result[0].worker.bottom);
				        	top_nm = result[0].worker.top_nm;
				        	middle_nm = result[0].worker.middle_nm;
				        	bottom_nm = result[0].worker.bottom_nm;
							titleText = "종사자수";
						} else if (filter == "corp_cnt") {
							pieCount = result[0].corp.base_cnt;
							top = eval(result[0].corp.top);
				        	middle = eval(result[0].corp.middle);
				        	bottom = eval(result[0].corp.bottom);
				        	top_nm = result[0].corp.top_nm;
				        	middle_nm = result[0].corp.middle_nm;
				        	bottom_nm = result[0].corp.bottom_nm;
							titleText = "사업체수";
						}
					} else if(res.id == "4005") {	//가구통계검색
						pieCount = result[0].household_cnt;
						titleText = "가구수";
					} else if(res.id == "4006") {	//주택통계검색
						pieCount = result[0].house_cnt;
						titleText = "주택수";
					} else if(res.id == "4007") {	//농가통계검색
						pieCount = result[0].farm_cnt;
						titleText = "가구원 수";
					} else if(res.id == "4008") {	//임가통계검색
						pieCount = result[0].population;
						titleText = "가구원 수";
					} else if(res.id == "4009") {	//어가통계검색
						pieCount = result[0].fishery_cnt;
						titleText = "가구원 수";
					} else if(res.id == "4010") {	//가구원통계검색
						pieCount = result[0].population;
						titleText = "가구원 수";
					}
					
		        	$("#pieChart_"+that.id).find("#pieChartDiv1").html("");
		        	$("#pieChart_"+that.id).find("#pieChartDiv2").html("");
		        	$("#pieChart_"+that.id).find("#pieChartDiv3").html("");
		        	
		        	//5 미만 N/A처리
		        	if(pieCount > 4) {
		        		pieCount = appendCommaToNumber(pieCount);	
		        	} else {
		        		pieCount = "N/A";
		        	}
		        	
		        	$("#pieChart_"+that.id).find(".graph_tit").html("<font size='3'>"+pieCount+"</font><font size='3'>"+options.params.unit+"</font>");
		        	$("#pieChart_"+that.id).show();
		        	
		        	//타이틀만들기 - (년도 + 최종선택 된 통계항목 제목) 
					for (var i=0; i<options.params.param.length; i++) {
						if (options.params.param[i].key == "year") {
							titleText = "상위지역대비 비율 : " + options.params.param[i].value + "년 " + options.params.title + " (" + options.params.unit + ")";
							break;
						}
					}
		        	$("#pieChart_"+that.id).find(".graph_txt").html(textSubString(titleText, 20));
		        	$("#pieChart_"+that.id).find(".graph_txt").tooltip({
		        		content : titleText,
		        		position : {my: "left+10 top-40"},
						track: true
		        	});
		        	
		        	if(top == undefined) {
		        		top = 0;
		        		topViewFlag = false;
		        	}
		        	if(middle == undefined) {
		        		middle = 0;
		        		middleViewFlag = false;
		        	}
		        	if(bottom == undefined) {
		        		bottom = 0;
		        	}
		        	
		        	//범례
		        	var html = "";
		        	if(topViewFlag) {
		        		html += "<span class='pieLegend1'><span class='legendName'>" + top_nm + "</span> : <span class='legendValue'>" + top + "%</span></span><br/> ";	
		        	}
		        	if(middleViewFlag) {
		        		html += "<span class='pieLegend2'><span class='legendName'>" + middle_nm + "</span> : <span class='legendValue'>" + middle + "%</span></span><br/> ";	
		        	}
		        	if(bottom_nm == undefined) {
		        		bottom_nm = "검색결과";
		        	}
		        	html += "<span class='pieLegend3'><span class='legendName'>" + bottom_nm + "</span> : <span class='legendValue'>" + bottom + "%</span></span>";
		        	$("#pieChart_"+that.id).find(".pieLegend").html(html);
		        	
		        	//차트 열기
//		        	$("#pieChart_"+that.id).find(".graphbox").show();
		        	
		        	if($d.browser.ie8) {	//익스플로러 8일 경우 막대차트로
					    $("#pieChart_"+that.id).find("#pieChartDiv1").highcharts({
					        chart: {
					            type: 'column', backgroundColor: 'white', height: 180, width: 200, margin: [0, 0, 0, 0]
					        },
					        tooltip: { enabled: false },
					        title: {
					            text: ''
					        },
					        xAxis: {
					            categories: ['차상위', '상위', '지역'],
					        },
					        yAxis: {
					            min: 0,
					            title: {
					                text: ''
					            }
					        },
					        plotOptions: {
					            column: {
					                stacking: 'percent'
					            },
					            series: {
					                states: {
					                    hover: {
					                        brightness: 0
					                    }
					                }
					            }
					        },
					        legend: {
					        	enabled: false
					        },
					        
					        series: [{
					            name: '',
					            color: '#d0d0d0',
					            data : [100-top, 100-middle, 100-bottom]
					        }, {
					            name: '차상위',
					            color: '#c95236',
					            data: [top, 0, 0]
					        }, {
					            name: '상위',
					            color: '#3677bb',
					            data: [0, middle, 0]
					        }, {
					            name: '지역',
					            color: '#41b66e',
					            data: [0, 0, bottom]
					        }]
					    });
					    
					} else {
						if(topViewFlag) {
							//원형차트1
			    			$("#pieChart_"+that.id).find("#pieChartDiv1").highcharts({
			    				chart: { backgroundColor:"transparent", borderWidth:0, margin: [0, 0, 0, 0], height: 200, width: 200 },
			    				colors: ['#c95236', '#eeeeee'],
			    				navigation: { buttonOptions: { enabled: false } },
			    				tooltip: { enabled: false },
			    		        title: { text: '' },
			    		        plotOptions: {
			    		            pie: {
			    		                dataLabels: {
			    		                    enabled: true, distance: -50, style: { fontWeight: 'bold', color: 'white', textShadow: '0px 1px 2px black' }
			    		                },
			    		                states : {
			    		                	hover : {
			    		                		brightness : 0
			    		                	}
			    		                },
			    		                startAngle: 0, endAngle: 360, center: ['50%', '50%'],
			    						borderWidth: 0
			    		            }
			    		        }, 
			    		        series: [{
			    		            type: 'pie',
			    		            name: '차상위',
			    		            innerSize: '91%',
			    		            data: [
			    		                ['비율',  top ],
			    		                ['전체',  100 - top]
			    		            ],
			    					dataLabels: {
			    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
			    					}
			    		        }]
			    		    });
						}
		    			
						if(middleViewFlag) {
							//원형차트2
			    			$("#pieChart_"+that.id).find('#pieChartDiv2').highcharts({
			    				chart: { backgroundColor:"transparent", borderWidth:0, margin: [0, 0, 0, 0], height: 160, width: 160 },
			    				colors: ['#3677bb', '#eeeeee'],
			    				tooltip: { enabled: false },
			    				navigation: { buttonOptions: { enabled: false } }, 
			    		        title: {
			    		            text: ''
			    		        },
			    		        plotOptions: {
			    		            pie: {
			    		                dataLabels: {
			    		                    enabled: true,
			    		                    distance: -50,
			    		                    style: {
			    		                        fontWeight: 'bold',
			    		                        color: 'white',
			    		                        textShadow: '0px 1px 2px black'
			    		                    }
			    		                },
			    		                states : {
			    		                	hover : {
			    		                		brightness : 0
			    		                	}
			    		                },
			    		                startAngle: 0,
			    		                endAngle: 360,
			    		                center: ['50%', '50%'], borderWidth: 0
			    		            }
			    		        }, 
			    		        series: [{
			    			        type: 'pie',
			    		            name: '상위',
			    		            innerSize: '91%',
			    		            data: [
			    		                ['비율',  middle],
			    		                ['전체',  100 - middle]
			    		            ],
			    					dataLabels: {
			    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
			    					}
			    		        }]
			    		    });
						}
		    			
		    			//원형차트3
		    			$("#pieChart_"+that.id).find('#pieChartDiv3').highcharts({
		    				chart: { backgroundColor:"transparent", borderWidth:0, margin: [0, 0, 0, 0], height: 120, width: 120},
		    				colors: ['#41b66e', '#eeeeee'],
		    				tooltip: { enabled: false },
		    				navigation: { buttonOptions: { enabled: false } }, 
		    		        title: {
		    		            text: ''
		    		        },
		    		        plotOptions: {
		    		            pie: {
		    		                dataLabels: {
		    		                    enabled: true,
		    		                    distance: -70,
		    		                    style: {
		    		                        fontWeight: 'bold',
		    		                        color: 'white',
		    		                        textShadow: '0px 1px 2px black'
		    		                    }
		    		                },
		    		                states : {
		    		                	hover : {
		    		                		brightness : 0
		    		                	}
		    		                },
		    		                startAngle: 0,
		    		                endAngle: 360,
		    		                center: ['50%', '50%'], borderWidth: 0
		    		            }
		    		        }, 
		    		        series: [{
		    		        	type: 'pie',
		    		            name: '해당지역',
		    		            innerSize: '91%',
		    		            data: [
		    		                ['비율',  bottom],
		    		                ['전체',  100 - bottom]
		    		            ],
		    					dataLabels: {
		    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
		    					}
		    		        }]
		    		    });  
					}
	            	
	            } else {
	                messageAlert.open("알림", res.errMsg);
	                $("#pieChart_"+that.id).hide();
	            }
	        },
	        onFail : function(status, options) {
	        	var that = options.target;
	        	$("#pieChart_"+that.id).hide();
	        }
	    });
	}());
	/*********** 원형차트 레벨별 표출 End **********/
	
	/*********** OpenAPI 지오코딩 검색 Start **********/
	(function() {
	    $class("sop.openApi.openApiuserGeocode.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	            if(res.errCd == "0") {
	            	var result = res.result;
	            	var table = $("#userUpload_"+options.delegate.id).DataTable();
	            	if (result.resultdata.length > 0) {
	            		var xCoord = "";
	            		var yCoord = "";
	            		var admCd = "";
	            		if (result.resultdata[0].x != undefined && 
	            			result.resultdata[0].x != null && 
	            			result.resultdata[0].x.length > 0) {
	            			xCoord = result.resultdata[0].x;
	            		}
	            		if (result.resultdata[0].y != undefined && 
		            		result.resultdata[0].y != null && 
		            		result.resultdata[0].y.length > 0) {
		            		yCoord = result.resultdata[0].y;
		            	}
	            		if (result.resultdata[0].adm_cd != undefined && 
	            			result.resultdata[0].adm_cd	!= null &&
	            			result.resultdata[0].adm_cd.length > 0) {
	            			admCd = result.resultdata[0].adm_cd;
	            		}

	            		var xIdx = table.column("x:name").index();
	            		var yIdx = table.column("y:name").index();
	            		var statusIdx = table.column("status:name").index();
	            		var aggcdIdx = table.column("aggcode:name").index();
	            		table.cell(options.index, xIdx).data(xCoord);
	            		table.cell(options.index, yIdx).data(yCoord);
	            		table.cell(options.index, aggcdIdx).data(admCd);
	            		table.cell(options.index, statusIdx).data("변환성공");
	            		$('#userUpload_'+options.delegate.id+' tbody > tr').eq(options.index)
						   												   .find("td").eq(0)
						   												   .css("background-color", "#b2fa5c");
	            		options.delegate.indicatorCnt++;
	            		if (options.delegate.indicatorCnt == options.lastIndex+1) {
	            			$(options.delegate.infoUserUploadObj).find(".m_indicator").hide();
	            			options.dataTable.fnDraw();
	            		}
	            		
	            	}else {
	            		var statusIdx = table.column("status:name").index();
	            		table.cell(options.index, statusIdx).data("변환실패");
	            		$('#userUpload_'+options.delegate.id+' tbody > tr').eq(options.index)
	            														   .find("td").eq(0)
	            														   .css("background-color", "#ff9999");
	            		options.delegate.indicatorCnt++;
	            		if (options.delegate.indicatorCnt == options.lastIndex+1) {
	            			$(options.delegate.infoUserUploadObj).find(".m_indicator").hide();
	            			options.dataTable.fnDraw();
	            		}
	            	}
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout(options.delegate.openApiGeocode(options.address, options), 500);
	            } else {
	            	var table = $("#userUpload_"+options.delegate.id).DataTable();
	            	var statusIdx = table.column("status:name").index();
	            	table.cell(options.index, statusIdx).data("변환실패");
	            	$('#userUpload_'+options.delegate.id+' tbody > tr').eq(options.index)
	            													   .find("td").eq(0)
	            													   .css("background-color", "#ff9999");
	            	options.delegate.indicatorCnt++;
	            	if (options.delegate.indicatorCnt == options.lastIndex+1) {
	            		$(options.delegate.infoUserUploadObj).find(".m_indicator").hide();
	            		options.dataTable.fnDraw();
            		}
	            }
	            
	            
	        },
	        onFail : function(status, options) {
	        	var table = $("#userUpload_"+options.delegate.id).DataTable();
	        	table.cell(options.index, table.column("status:name").index()).data("변환실패");
	        	$('#userUpload_'+options.delegate.id+' tbody > tr').eq(options.index)
	        													   .find("td").eq(0)
	        													   .css("background-color", "#ff9999");
	        	options.delegate.indicatorCnt++;
	        	if (options.delegate.indicatorCnt == options.lastIndex) {
	        		$(options.delegate.infoUserUploadObj).find(".m_indicator").hide();
	        		options.dataTable.fnDraw();
        		}
	        }
	    });
	}());
	/*********** OpenAPI 지오코딩 검색 End **********/
	
}(window, document));