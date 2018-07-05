/**
 * 맵 부가기능 에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/25  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
var titleActionDoit;
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
					if (bg != null) {
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
					if (bg != null) {
						return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
					} else {
						return "#fff";
					}
				}
			}
		};
	});
	sMapInfo = {
		mapInfo: function(map) {
			var that = this;
			this.delegate = null;
			this.map = map;
			this.id = null;
			this.barChartObj = null; // 막대차트 Object
			this.pieChartObj = null; // 파이차트 Object
			this.legendObj = null; // 범례 Object
			this.rentalLegendObj = null; //권리금 Object
			this.timeSeriesObj = null; // 시계열 Object
			this.infoUserUploadObj = null; //사용자지정 업로드 Object
			this.legendColorObj = null; // 범례설정 Object
			this.userLegendObj = null; //사용자지정 범례 Object
			this.foreGiftObj = null, // 권리금 Object
				this.searchTitleObj = null; // 타이틀 Object
			this.legendColor1 = "#ffddd7"; // 범례 색상1
			this.legendColor2 = "#ffb2a5"; // 범례 색상2
			this.legendColor3 = "#ff806c"; // 범례 색상3
			this.legendColor4 = "#ff593f"; // 범례 색상4
			this.legendColor5 = "#ff2400"; // 범례 색상5
			this.selectSeriesYear = ""; //선택한 시계열 년도
			this.yearArray = new Array(); //선택 가능 시계열 년도
			this.timeSeriesPushData = new Array(); //시계열 애니메이션의 정보를 담는 변수
			this.isTimeSeriesPlay = false; //시계열 애니메이션에서 사용될 정보를 모두 가져왔는지 확인
			this.timeSeriesCnt = 0; //시계열 도는 횟수
			this.timer = 0; //타이머
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
					this.legendColor5
				];
				this.map.setLegendColor(tmpColors);
				this.delegate = delegate;
				var currentdate = new Date();
				this.id = makeStamp(currentdate);
			};
			//범례 추가
			this.createLegend = function() {
				var infoLegend = sop.control({
					position: 'bottomleft'
				});
				infoLegend.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'legend_' + that.id).css({"margin":"0px"});
					that.legendObj = this._div;
					return this._div;
				};
				infoLegend.update = function(props) {
					this._div.innerHTML = 
						"<div class='legend_remark_section'>" +
						"	<div class='remarkbox' style=width:"+$(window).width()+"px;>" +
						"		<div class='remarkbox_in'>" +
						"			<div class='remarks_list'>" +
						"				<ul>" +
						"					<li id='legendColor1_" + that.id + "' style='background: #ffddd7;'>&nbsp;<span id='legendRange1'>-</span></li>" +
						"					<li id='legendColor2_" + that.id + "' style='background: #ffb2a5;'>&nbsp;<span id='legendRange2'>-</span></li>" +
						"					<li id='legendColor3_" + that.id + "' style='background: #ff806c;'>&nbsp;<span id='legendRange3' style='color:#fff;'>-</span></li>" +
						"					<li id='legendColor4_" + that.id + "' style='background: #ff593f;'>&nbsp;<span id='legendRange4' style='color:#fff;'>-</span></li>" +
						"					<li id='legendColor5_" + that.id + "' style='background: #ff2400;'>&nbsp;<span id='legendRange5' style='color:#fff;'>-</span></li>" +
						"					<li style='width:10%;'><a><img id='rollover_" + that.id + "' class='rollover' src='/mobile/img/im/icon_wheel_off.gif' alt='범례설정' title='범례설정' /></a></li>" +
						"				</ul>" +
						"			</div>" +
						"		</div>" +
						"	</div>" +
						"</div>";
				};
				infoLegend.addTo(this.map.gMap);
				// image rollover
				$("#legend_" + this.id).find("img.rollover").hover(
					function() {
						this.src = this.src.replace("_off", "_on");
					},
					function() {
						this.src = this.src.replace("_on", "_off");
					});
				//설정창 열기
				$("#rollover_" + this.id).click(function() {
					$("#legendColor_" + that.id).find(".remarks_option").show();
					//사용자지정 범례창 show/hide
					if ($("#legendColor_" + that.id).find("#legend_user").is(":checked")) {
						if ($("#legendColor_" + that.id).find("#legend_user").is(":disabled")) {
							$("#userLegend_" + that.id).find(".remarksUser_option").hide();
						} else {
							$("#userLegend_" + that.id).find(".remarksUser_option").show();
						}
					} else {
						$("#userLegend_" + that.id).find(".remarksUser_option").hide();
					}
					//사용자 범례 설정
					that.userColorChg();
				});
				//사용자지정범례 생성
				//this.createUserLegend();
				//					$("#legend_modal").dialog({width: 100, minimize: '#minimizeArea'});
			};
			//범례설정 추가
			this.createLegendColor = function() {
				var infoLegendColor = sop.control({
					position: 'bottomright'
				});
				infoLegendColor.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'legendColor_' + that.id);
					that.legendColorObj = this._div;
					return this._div;
				};
				infoLegendColor.update = function(props) {
					this._div.innerHTML =
						"<div class='remarks_option'>" +
						"	<div class='remarks_option_in'>" +
						"		<p class='roption_tit'>범례설정</p>" +
						"		<table>" +
						"			<caption>범례설정</caption>" +
						"			<colgroup>" +
						"				<col style='width: 70px;' />" +
						"				<col style='width: ;' />" +
						"			</colgroup>" +
						"			<tbody>" +
						"				<tr>" +
						"					<th style='vertical-align: top;' scope='row'><span>컬러</span></th>" +
						"					<td>" +
						"						<ul>" +
						"							<li>" +
						"								<div class='mixcolorbox'>" +
						"									<input id='radioBWColor' name='setColor_" + that.id + "' type='radio' value='BW' />" +
						"									<span class='color_01'>" +
						"										<span style='background: #eeeeee;'>&nbsp;</span>" +
						"										<span style='background: #cccccc;'>&nbsp;</span>" +
						"										<span style='background: #999999;'>&nbsp;</span>" +
						"										<span style='background: #767676;'>&nbsp;</span>" +
						"										<span style='background: #575757;'>&nbsp;</span>" +
						"									</span>" +
						"								</div>" +
						"							</li>" +
						"							<li>" +
						"								<div class='mixcolorbox'>" +
						"									<input id='radioBlueColor' name='setColor_" + that.id + "' type='radio' value='Blue' />" +
						"									<span class='color_02'>" +
						"										<span style='background: #e2f1ff;'>&nbsp;</span>" +
						"										<span style='background: #badcff;'>&nbsp;</span>" +
						"										<span style='background: #7dbdff;'>&nbsp;</span>" +
						"										<span style='background: #409eff;'>&nbsp;</span>" +
						"										<span style='background: #0880fa;'>&nbsp;</span>" +
						"									</span>" +
						"								</div>" +
						"							</li>" +
						"							<li>" +
						"								<div class='mixcolorbox'>" +
						"									<input id='radioRedColor' name='setColor_" + that.id + "' type='radio' checked='checked' value='Red' />" +
						"									<span class='color_03'>" +
						"										<span style='background: #ffddd7;'>&nbsp;</span>" +
						"										<span style='background: #ffb2a5;'>&nbsp;</span>" +
						"										<span style='background: #ff806c;'>&nbsp;</span>" +
						"										<span style='background: #ff593f;'>&nbsp;</span>" +
						"										<span style='background: #ff2400;'>&nbsp;</span>" +
						"									</span>" +
						"								</div>" +
						"							</li>" +
						"						</ul>" +
						"					</td>" +
						"				</tr>" +
						"				<tr>" +
						"					<th scope='row'><span>분류</span></th>" +
						"					<td>" +
						"						<input type='radio' name='selectEvenLegend_" + that.id + "' id='legend_auto' value='auto' checked='checked' /> 자동범례 &nbsp;&nbsp;" +
						"						<input type='radio' name='selectEvenLegend_" + that.id + "' id='legend_equal' value='equal' /> 균등범례<br/><br/>" +
						"					</td>" +
						"				</tr>" +
						"			</tbody>" +
						"		</table>" +
						"		<div class='btn_roption'>" +
						"			<a id='legendApply' class='bg_blue'>적용</a>" +
						"			<a id='legendClosed'>취소</a>" +
						"		</div>" +
						"	</div>" +
						"	<span class='arrow_remark'><img src='/mobile/img/im/icon_arrow_down.png' alt='' /></span>" +
						"	<a class='remark_btn_close'><img src='/mobile/img/im/btn_layer_close.gif' alt='close' /></a>" +
						"</div>";
				};
				infoLegendColor.addTo(this.map.gMap);
				//X버튼 누르기
				$("#legendColor_" + this.id).find(".remark_btn_close").click(function() {
					$("#legendColor_" + that.id).find(".remarks_option").hide();
					$('#legendColor_' + that.id).find('.color-box').colpick().colpickHide();
					$('#legendColor_' + that.id).find('.color-box2').colpick().colpickHide();
					$(that.userLegendObj).find(".remarksUser_option").hide();
					that.updateUserLegend();
				});
				//범례적용
				$("#legendColor_" + this.id).find("#legendApply").click(function() {
					that.colorApply();
				});
				//범례닫기
				$("#legendColor_" + this.id).find("#legendClosed").click(function() {
					$("#legendColor_" + that.id).find(".remarks_option").hide();
					$('#legendColor_' + that.id).find('.color-box').colpick().colpickHide();
					$('#legendColor_' + that.id).find('.color-box2').colpick().colpickHide();
					$(that.userLegendObj).find(".remarksUser_option").hide();
					that.updateUserLegend();
				});
				//사용자정의 범례
				$("#legendColor_" + this.id).find("input[type=radio][name=selectEvenLegend_" + this.id + "]").change(function() {
					if (this.id != "legend_user") {
						$("#userLegend_" + that.id).find(".remarksUser_option").hide();
					}
				});
				//사용자정의 범례
				$("#legendColor_" + this.id).find("#legend_user").click(function() {
					$("#userLegend_" + that.id).find(".remarksUser_option").show();
					that.updateUserLegend();
				});
			};
			//범례설정 추가
			this.createUserLegend = function() {
				var userLegendColor = sop.control({
					position: 'bottomright'
				});
				userLegendColor.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'userLegend_' + that.id);
					that.userLegendObj = this._div;
					return this._div;
				};
				userLegendColor.update = function(props) {
					this._div.innerHTML = 
						"<div class='remarksUser_option'>" +
						"	<div class='remarks_option_in'>" +
						"		<p class='roption_tit'>사용자정의범례 설정</p>" +
						"		<table border=1 style='text-align:center;width:220px;margin:auto'>" +
						"			<thead>" +
						"				<tr style='height:30px;background-color:#eeeeee'>" +
						"					<td style='width:30px;font-size:11px;'>구간</td>" +
						"					<td style='font-size:11px;'>이상</td>" +
						"					<td style='font-size:11px;'>미만</td>" +
						"				</tr>" +
						"			</thead>" +
						"			<tbody>" +
						"				<tr>" +
						"					<td>1</td>" +
						"					<td>-</td>" +
						"					<td><input id='legend_1_2' type='text' value='100' /></td>" +
						"				</tr>" +
						"				<tr>" +
						"					<td>2</td>" +
						"					<td><input id='legend_2_1' type='text' value='100' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
						"					<td><input id='legend_2_2' type='text' value='200'/></td>" +
						"				</tr>" +
						"				<tr>" +
						"					<td>3</td>" +
						"					<td><input id='legend_3_1' type='text' value='200' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
						"					<td><input id='legend_3_2' type='text' value='300'/></td>" +
						"				</tr>" +
						"				<tr>" +
						"					<td>4</td>" +
						"					<td><input id='legend_4_1' type='text' value='300' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
						"					<td><input id='legend_4_2' type='text' value='400'/></td>" +
						"				</tr>" +
						"				<tr>" +
						"					<td>5</td>" +
						"					<td><input id='legend_5_1' type='text' value='400' readonly='readonly' style='background-color:#f9f9f9'/></td>" +
						"					<td>-</td>" +
						"				</tr>" +
						"			</tbody>" +
						"		</table>" +
						"	</div>" +
						"	<a class='remark_btn_close'><img src='/mobile/img/im/btn_layer_close.gif' alt='close' /></a>" +
						"</div>";
				};
				userLegendColor.addTo(this.map.gMap);
				//X버튼 누르기
				$("#userLegend_" + this.id).find(".remark_btn_close").click(function() {
					$("#userLegend_" + that.id).find(".remarksUser_option").hide();
				});
				//범례닫기
				$("#userLegend_" + this.id).find("#legendClosed").click(function() {
					$("#userLegend_" + that.id).find(".remarksUser_option").hide();
				});
				//범례적용
				$("#userLegend_" + this.id).find("#legendApply").click(function() {});
				$("#userLegend_" + this.id).find("input").keypress(function(e) {
					return numbersonly(e, this.value, true);
				});
				var isKeypress = true;
				$("#userLegend_" + this.id).find("input").keyup(function(e) {
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
						} else {
							$("#legend_2_1").val(this.value);
						}
					} else if (this.id == "legend_2_2") {
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
						} else {
							$("#legend_3_1").val(this.value);
						}
					} else if (this.id == "legend_3_2") {
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
						} else {
							$("#legend_4_1").val(this.value);
						}
					} else if (this.id == "legend_4_2") {
						$("#legend_5_1").val(this.value);
					}
				});
				var isKeypress2 = true;
				$("#userLegend_" + this.id).find("input").change(function(e) {
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
					} else if (this.id == "legend_3_2") {
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
					} else if (this.id == "legend_4_2") {
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
				$("#piechart-area").html(
					"<div id='pieChart_" + that.id + "' style='width:100%;'>" +
					"	<div class='graphbox'>" +
					"		<div class='graphbox_in'>" +
					"			<p class='graph_txt' title=\"\"></p>" +
					"			<p class='graph_tit'></p>" +
					"			<div class='graph'>" +
					"				<div id='container_graph'>" +
					"					<div id='pieChartDiv1'></div>" +
					"					<div id='pieChartDiv2'></div>" +
					"					<div id='pieChartDiv3'></div>" +
					"				</div>" +
					"			</div>" +
					"			<p class='pieLegend'></p>" +
					"		</div>" +
					"	</div>" +
					"</div>"
				);
				// image rollover
				$("#pieChart_" + this.id).find("img.rollover").hover(
					function() {
						this.src = this.src.replace("_off", "_on");
					},
					function() {
						this.src = this.src.replace("_on", "_off");
					});
			};
			//막대차트 추가
			this.createBarChart = function(_position) {
				var chartHeight = $(window).outerHeight(true) > 400 ? ($(window).outerHeight(true) - 206) : $(window).outerHeight(true);
				$("#barchart-area").html(
					"<div id='barChart_" + that.id + "' style='width:100%;'>" +
					"	<div class='graphbox_bar' style='width:100%;'>" +
					"		<div class='graphbox_in'>" +
					"			<p class='graph_txt' title=\"\"></p>" +
					"			<div class='graph'>" +
					"				<div id='container_graph_bar' style='width:100%;height:" + (chartHeight - 37) + "px;'>" +
					"			</div>" +
					"		</div>" +
					"	</div>" +
					"	<div id='graphbox_in_link'></div>" +
					"	</div>" +
					"</div>"
				);
				// image rollover
				$("#barChart_" + this.id).find("img.rollover").hover(
					function() {
						this.src = this.src.replace("_off", "_on");
					},
					function() {
						this.src = this.src.replace("_on", "_off");
					});
			};
			//타이틀 추가
			this.createSearchTitle = function() {
				var infoSearchTitle = sop.control({
					position: 'topright'
				});
				infoSearchTitle.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'searchTitle_' + that.id);
					that.searchTitleObj = this._div;
					return this._div;
				};
				infoSearchTitle.update = function(props) {
					this._div.innerHTML = "<div class='map_search_title'>" +
						"<a class='btn_search_title'></a>" +
						"<div class='title_area'>" +
						"<div class='title_txt' title=\"\"></div>" +
						"<div class='reference_txt'></div>" +
						"</div>" +
						"</div>";
				};
				infoSearchTitle.addTo(this.map.gMap);
				$(".sop-top").css("width", "100%");
				$("#searchTitle_" + this.id).css("width", "90%");
				// 시계열 버튼
				$("#searchTitle_" + this.id).find(".btn_search_title").click(function() {
					var searchTitle_section = $("#searchTitle_" + that.id).find(".title_area").css("display");
					if (searchTitle_section == "block") {
						$("#searchTitle_" + that.id).find(".title_area").hide();
						$("#searchTitle_" + that.id).find(".btn_search_title").addClass("off");
					} else {
						$("#searchTitle_" + that.id).find(".title_area").show();
						$("#searchTitle_" + that.id).find(".btn_search_title").removeClass("off");
					}
				});
				$(that.searchTitleObj).hide();
			};
			this.calculateLegend = function(arColorData, arCircleData) {
				this.rentalLegendValue = {
					equal: {
						color: {},
						circle: {},
					},
					auto: {
						color: {},
						circle: {},
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
				for (var y = 1; y <= 5; y++) {
					tmpResult.push(result * y);
				}
				if (tmpResult.length < 5) {
					for (var x = 0; x < 5 - tmpResult.length; x++) {
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
				for (var y = 1; y <= 3; y++) {
					tmpResult.push(result * y);
				}
				if (tmpResult.length < 3) {
					for (var x = 0; x < 3 - tmpResult.length; x++) {
						tmpResult.push("");
					}
				}
				tmpValPerSlice = tmpResult;
				this.rentalLegendValue.equal.circle = tmpValPerSlice;
				//================균등분할방식 end===============//
				//================자동분할방식 start===============//
				//자동분할(분포분할)
				var tmpValPerSlice = new Array();
				var tmpSortArray = arColorData.sort(function(a, b) {
					return a - b;
				});
				//중복숫자제거
				var tmpGroupArray = [];
				$.each(tmpSortArray, function(i, el) {
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
				} else {
					var tmpResult = new Array();
					for (var y = 0; y < tmpGroupArray.length; y++) {
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
							tmpResult.push(tmpGroupArray[tmpGroupArray.length - 1]);
						}
						var cnt = 5 - tmpResult.length;
						for (var x = 0; x < cnt; x++) {
							tmpResult.push("");
						}
					}
					tmpValPerSlice = tmpResult;
				}
				this.rentalLegendValue.auto.color = tmpValPerSlice;
				//자동분할 - 원크기
				var tmpValPerSlice2 = new Array();
				var tmpSortArray = arCircleData.sort(function(a, b) {
					return a - b;
				});
				//중복숫자제거
				var tmpGroupArray = [];
				$.each(tmpSortArray, function(i, el) {
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
				} else {
					var tmpResult = new Array();
					for (var y = 0; y < tmpGroupArray.length; y++) {
						if (y % result == 0 && y != 0) {
							tmpResult.push(tmpGroupArray[y]);
						}
					}
					if (tmpResult.length == 0) {
						tmpResult.push(tmpGroupArray[0]);
					}
					if (tmpResult.length < 3) {
						var cnt = 3 - tmpResult.length;
						for (var x = 0; x < cnt; x++) {
							tmpResult.push("");
						}
					}
					tmpValPerSlice2 = tmpResult;
				}
				this.rentalLegendValue.auto.circle = tmpValPerSlice2;
				//================자동분할방식 end===============//
				return this.rentalLegendValue;
			};
			this.getCircleLengendInfo = function(data, data2) {
				data = parseFloat(data.split(",").join(""));
				data2 = parseFloat(data2.split(",").join(""));
				var legend = {};
				if (this.rentalValPerSlice.color.length < 5) {
					for (var i = 0; i < this.rentalValPerSlice.color.length; i++) {
						if (data == this.rentalValPerSlice.color[i]) {
							legend.color = [that.rentalLegendColor[i], i + 1];
							break;
						}
					}
				} else {
					legend.color = data < parseFloat(this.rentalValPerSlice.color[0].split(",").join("")) ? [that.rentalLegendColor[0], 1] :
						data < parseFloat(this.rentalValPerSlice.color[1].split(",").join("")) ? [that.rentalLegendColor[1], 2] :
						data < parseFloat(this.rentalValPerSlice.color[2].split(",").join("")) ? [that.rentalLegendColor[2], 3] :
						data < parseFloat(this.rentalValPerSlice.color[3].split(",").join("")) ? [that.rentalLegendColor[3], 4] : [that.rentalLegendColor[4], 5];
				}
				if (this.rentalValPerSlice.circle.length < 3) {
					for (var i = 0; i < this.rentalValPerSlice.circle.length; i++) {
						if (data2 == this.rentalValPerSlice.circle[i]) {
							legend.circle = [that.rentalLegendCircle[i], i + 1];
							break;
						}
					}
				} else {
					legend.circle = data2 < parseFloat(this.rentalValPerSlice.circle[0].split(",").join("")) ? [that.rentalLegendCircle[0], 1] :
						data2 < parseFloat(this.rentalValPerSlice.circle[1].split(",").join("")) ? [that.rentalLegendCircle[1], 2] : [that.rentalLegendCircle[2], 3];
				}
				return legend;
			};
			this.createMarker = function(data, columns, type) {
				var html = "<table style='margin:10px;'>" + "<tr>" + "<td class='admName' style='color:#3792de;font-size:12px;font-weight:bold;' colspan=3>" + data.name + "</td>" + "</tr>" + "<tr style='height:1px;background-color:#0080c6'></tr>" + "<tr style='height:10px;'></tr>";
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
							for (var x = 0; x < columns.length; x++) {
								if (columns[x].data == column) {
									title = columns[x].title;
									break;
								}
							}
							html += "<tr>" + "<td style='margin-left:10px;font-size:11px;'>" + title + "</td>" + "<td >:</td>" + "<td style='font-size:11px'>" + data[column] + "</td>" + "</tr>" + "<tr style='height:5px;'></tr>";
						}
					}
				}
				html += "</table>";
				if (data.x.length > 0 && data.y.length > 0) {
					var curMarker = null;
					if (type == "marker") {
						curMarker = that.map.addMarker(data.x, data.y, {
							tooltipMsg: html,
							visible: false
						});
					} else {
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
							tooltipMsg: html,
							visible: false,
							radius: legend.circle[0],
							fillColor: legend.color[0]
						});
						$(curMarker).mouseover(function() {
							var fillColor = this.options.fillColor;
						});
					}
					that.markerGroup.push({
						marker: curMarker,
						index: data.idx,
						data: tmpData
					});
					return curMarker;
				}
				return null;
			};
			//원형차트 업데이트
			this.updatePieChart = function(options) {
				if (options.params.adm_cd == "00") { //전국 단위일 경우 원형차트 안보임
					$(this.pieChartObj).hide();
					return;
				}
				var url = "";
				if (options.params.api_id == "API_0301") { //인구통계총괄
					url = "/ServiceAPI/stats/population.json";
				} else if (options.params.api_id == "API_0302") { //인구통계세부조건검색
					url = "/ServiceAPI/stats/searchpopulation.json";
				} else if (options.params.api_id == "API_0303") { //산업체분류검색
					url = "/ServiceAPI/stats/industrycode.json";
				} else if (options.params.api_id == "API_0304") { //사업체분류검색
					url = "/ServiceAPI/stats/company.json";
				} else if (options.params.api_id == "API_0305") { //가구통계검색
					url = "/ServiceAPI/stats/household.json";
				} else if (options.params.api_id == "API_0306") { //주택통계검색
					url = "/ServiceAPI/stats/house.json";
				} else if (options.params.api_id == "API_0307") { //농가통계검색
					url = "/ServiceAPI/stats/farmhousehold.json";
				} else if (options.params.api_id == "API_0308") { //임가통계검색
					url = "/ServiceAPI/stats/forestryhousehold.json";
				} else if (options.params.api_id == "API_0309") { //어가통계검색
					url = "/ServiceAPI/stats/fisheryhousehold.json";
				} else if (options.params.api_id == "API_0310") { //가구원통계검색
					url = "/ServiceAPI/stats/householdmember.json";
				}
				var sopPortalPieChartDrawObj = new sop.portal.pieChartDraw.api();
				for (var i = 0; i < options.params.param.length; i++) {
					sopPortalPieChartDrawObj.addParam(
						options.params.param[i].key,
						options.params.param[i].value);
				}
				sopPortalPieChartDrawObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalPieChartDrawObj.request({
					method: "POST",
					async: true,
					url: contextPath + url,
					options: {
						target: this,
						params: options.params
					}
				});
			};
			//막대차트 업데이트
			this.updateBarChart = function(res, options) {
				if (window.orientation != undefined) {
					if (window.orientation === 0) {
						$("#barchart-area").css({
							"padding-bottom": "0px"
						});
					} else {
						$("#barchart-area").css({
							"padding-bottom": "60px"
						});
					}
				}
				//차트인텍스 초기화
				this.lastChatIndex = null;
				$("#graphbox_in_link").html("");
				$(this.barChartObj).show();
				var xAxisCat = []; //X축 카테고리
				var retDataList = []; //수치 데이터
				var titleText; //차트 타이틀
				var labelsVisible = true; //카테고리 표출 여부
				if (res.result != undefined) {
					$("#barchart-area").show();
					$("#piechart-area").hide();
					$(".Content>.Btn_Top>nav>.Btn_Top4").removeClass("NoneAction");
					$(".Content>.Btn_Top>nav>.Btn_Top4").off("click").click(function() {
						$(".Map.mapareaboxd").show();
						$(".Content>.Btn_Top>nav>a[class^=Btn_Top]").removeClass("M_on");
						$("#table-area").hide();
						if ($("#chart-area").is(":visible")) {
							if ($("#legend_" + that.id).find(".remarkbox").css("display") == "none") {
								$(".Content>.Btn_Top>nav>a.Btn_Top2").addClass("M_on");
							} else {
								$(".Content>.Btn_Top>nav>a.Btn_Top3").addClass("M_on");
							}
							$("#chart-area").hide();
						} else {
							$(".Content>.Btn_Top>nav>a.Btn_Top4").addClass("M_on");
							$("#chart-area").show();
							$("html,body").animate({
								scrollTop: $(window).height()/2
							}, 300);
						}
					});
					//내림차순
					res.result = res.result.sort(dynamicSort("-"+res.showData));
					for (var i = 0; i < res.result.length; i++) {
						var elem = res.result[i];
						//읍면동 단위
						if ((this.map.curPolygonCode == 4 || this.map.curPolygonCode == 5) && elem.adm_cd.length > 7) {
//							xAxisCat.push("집계구");
//							labelsVisible = false;
							xAxisCat.push(elem.adm_cd);
						} else {
							xAxisCat.push(elem.adm_nm);
						}
						if (res.id == "API_0301") { //인구통계총괄
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
						} else if (res.id == "API_0302") { //인구통계세부조건검색
							titleText = "인구";
							retDataList.push(parseInt(elem.population));
						} else if (res.id == "API_0304") { //사업체분류검색
							if (res.showData == "tot_worker") {
								titleText = "종사자수";
								retDataList.push(parseInt(elem.tot_worker));
							} else if (res.showData == "corp_cnt") {
								titleText = "사업체수";
								retDataList.push(parseInt(elem.corp_cnt));
							}
						} else if (res.id == "API_0305") { //가구통계검색
							titleText = "가구수";
							retDataList.push(parseInt(elem.household_cnt));
						} else if (res.id == "API_0306") { //주택통계검색
							titleText = "주택수";
							retDataList.push(parseInt(elem.house_cnt));
						} else if (res.id == "API_0307") { //농가통계검색
							retDataList.push(parseInt(elem.farm_cnt));
						} else if (res.id == "API_0308") { //임가통계검색
							retDataList.push(parseInt(elem.forestry_cnt));
						} else if (res.id == "API_0309") { //어가통계검색
							retDataList.push(parseInt(elem.fishery_cnt));
						} else if (res.id == "API_0310") { //가구원통계검색
							titleText = "가구원 수";
							retDataList.push(parseInt(elem.population));
						}
						//조건결합시
						else {
							titleText = "";
							retDataList.push(parseInt(elem.data_cnt));
						}
					}
				} else {
					$(".Content>.Btn_Top>nav>.Btn_Top4").addClass("NoneAction");
					$("#up-and-down-button").hide();
				}
				var tmpRetDataList;
				var chartWidth = $(window).outerWidth(true);
				//var chartHeight = $(window).outerHeight(true) > 400 ? ($(window).outerHeight(true) - 243) : $(window).outerHeight(true) - 90;
				var chartHeight = parseInt(xAxisCat.length) * 25;
				if (chartHeight < $(window).height()) {
					chartHeight = $(window).height();
				}
				$("#barChart_" + that.id).find("#container_graph_bar").height(chartHeight);
				$("#barChart_" + that.id).find("#container_graph_bar").highcharts({
					chart: {
						type: 'bar',
						backgroundColor: 'white',
						height: chartHeight,
						width: chartWidth
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: xAxisCat,
						labels: {
							//rotation: -45,
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
						formatter: function() {
							if (this.point.y == 0) { //0일 경우 N/A로 처리
								return '<span>' + this.point.category + '</span><br/>' +
									'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
							} else {
								return '<span>' + this.point.category + '</span><br/>' +
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
				//타이틀만들기 - (표출경계 + 년도 + 최종선택 된 통계항목 제목) 
				for (var i = 0; i < options.params.param.length; i++) {
					if (options.params.param[i].key == "year") {
						titleText = options.params.param[i].value + "년 " + options.params.title + " (" + options.params.unit + ")";
						break;
					}
				}
				if (options.params.adm_cd == "00") {
					titleText = "시도별";
				} else if (options.params.adm_cd.length == 2) {
					titleText = "시군구별";
				} else if (options.params.adm_cd.length == 5) {
					titleText = "읍면동별";
				} else {
					titleText = "집계구별";
				}
				$("#barChart_" + that.id).find(".graph_txt").html(textSubString(titleText, 38));
				$("#barChart_" + that.id).find(".graph_txt").tooltip({
					content: titleText,
					position: {
						my: "left+10 top-40"
					},
					track: true
				});
				//툴팁을 없애지 않고 계속 놔둔다.
				var charts = $("#barChart_" + that.id).find("#container_graph_bar").highcharts();
				charts.tooltip.hide = function() {};
				//차트 소수점 설정
				if (res.showData == "avg_age" || res.showData == "avg_age_male" || res.showData == "avg_age_fem") { //평균나이(세), 평균나이-남자(세), 평균나이-여자(세)
					charts.series[0].update({
						tooltip: {
							valueDecimals: 1
						}
					});
				} else if (res.showData == "ppltn_dnsty") { //인구밀도(명/㎢)
					charts.series[0].update({
						tooltip: {
							valueDecimals: 2
						}
					});
				}
			};
			//범례 기준값 업데이트
			this.updateLegendRange = function(res) {
				$(".Content>.Btn_Top>nav>.Btn_Top3").removeClass("NoneAction");
				$(".Content>.Btn_Top>nav>.Btn_Top3").off("click");
				$(".Content>.Btn_Top>nav>.Btn_Top3").click(function() {
					$("#chart-area").hide();
					$(".Content>.Btn_Top>nav>a[class^=Btn_Top]").removeClass("M_on");
					$(".Map.mapareaboxd").show();
					if ($("#chart-area").is(":visible")) {
						$(".Content>.Btn_Top>nav>a.Btn_Top3").addClass("M_on");
						$("#chart-area").hide();
						$("#legend_" + that.id).find(".remarkbox").show();
					} else {
						if ($("#legend_" + that.id).find(".remarkbox").is(":visible")) {
							$("#legendColor_" + that.id).find(".remarks_option").hide();
							$('#legendColor_' + that.id).find('.color-box').colpick().colpickHide();
							$('#legendColor_' + that.id).find('.color-box2').colpick().colpickHide();
							$(".Content>.Btn_Top>nav>a.Btn_Top2").addClass("M_on");
						} else {
							$(".Content>.Btn_Top>nav>a.Btn_Top3").addClass("M_on");
						}
						$("#legend_" + that.id).find(".remarkbox").toggle();
					}
				});
				var retDataList = []; //수치 데이터
				var unit = res.unit;
				if (res.result != undefined) {
					for (var i = 0; i < res.result.length; i++) {
						var elem = res.result[i];
						if (res.id == "API_0301") { //인구통계총괄
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
						} else if (res.id == "API_0302") { //인구통계세부조건검색
							titleText = "인구";
							retDataList.push(parseInt(elem.population));
						} else if (res.id == "API_0304") { //사업체분류검색
							if (res.showData == "tot_worker") {
								titleText = "종사자수(명)";
								retDataList.push(parseInt(elem.tot_worker));
							} else if (res.showData == "corp_cnt") {
								titleText = "사업체수";
								retDataList.push(parseInt(elem.corp_cnt));
							}
						} else if (res.id == "API_0305") { //가구통계검색
							titleText = "가구수";
							retDataList.push(parseInt(elem.household_cnt));
						} else if (res.id == "API_0306") { //주택통계검색
							titleText = "주택수";
							retDataList.push(parseInt(elem.house_cnt));
						} else if (res.id == "API_0307") { //농가통계검색
							retDataList.push(parseInt(elem.farm_cnt));
						} else if (res.id == "API_0308") { //임가통계검색
							retDataList.push(parseInt(elem.forestry_cnt));
						} else if (res.id == "API_0309") { //어가통계검색
							retDataList.push(parseInt(elem.fishery_cnt));
						} else if (res.id == "API_0310") { //가구원통계검색
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
					$("#legendUnit_" + that.id).text("(단위: " + unit + ")");
				}
			};
			this.setLegendRange = function(_valPerSlice) {
				if (_valPerSlice != undefined) {
					$("#legendColor_" + this.id).find("#selectEvenLegend").show();
					var valPerSlice = _valPerSlice;
					var point = valPerSlice[0];
					for (var i = 0; i < 5; i++) {
						$("#legend_" + this.id).find("#legendRange" + (i + 1)).text("-");
					}
					if (point.length < 5) {
						for (var i = 0; i < point.length; i++) {
							if (parseFloat(point[i]) < 5) {
								$("#legend_" + this.id).find("#legendRange1").text("5 미만");
							} else {
								$("#legend_" + this.id).find("#legendRange" + (i + 1)).text(appendCommaToNumber(parseFloat(point[i])));
							}
						}
					} else {
						//범례값이 모두  1또는 0이면, 범례값을 5미만으로 처리
						var isNA = true;
						for (var i = 0; i < point.length; i++) {
							if (point[i] != 1 && point[i] != 0) {
								isNA = false;
								break;
							}
						}
						if (isNA) {
							$("#legend_" + this.id).find("#legendRange1").text("5 미만");
						} else {
							var point1 = (point[0] != "") ? appendCommaToNumber(parseFloat(point[0])) : "-";
							var point2 = (point[1] != "") ? appendCommaToNumber(parseFloat(point[1])) : "-";
							var point3 = (point[2] != "") ? appendCommaToNumber(parseFloat(point[2])) : "-";
							var point4 = (point[3] != "") ? appendCommaToNumber(parseFloat(point[3])) : "-";
							$("#legend_" + this.id).find("#legendRange1").text(point1 + " 미만");
							$("#legend_" + this.id).find("#legendRange2").text(point2 + " 미만");
							$("#legend_" + this.id).find("#legendRange3").text(point3 + " 미만");
							$("#legend_" + this.id).find("#legendRange4").text(point4 + " 미만");
							$("#legend_" + this.id).find("#legendRange5").text(point4 + " 이상");
						}
					}
				} else {
					$("#legendUnit_" + this.id).html("");
					$("#legendColor_" + this.id).find("#selectEvenLegend").hide();
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
			};
			this.updateLegendRangeKosis = function(res) {
				var retDataList = []; //수치 데이터
				for (var i = 0; i < res.length; i++) {
					retDataList.push(res[i].DATA);
				}
				var tmpData = new Array();
				tmpData.push(retDataList);
				var valPerSlice = that.map.calculateLegend(tmpData);
				this.setLegendRange(valPerSlice);
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
				if (dataObj.length == 3) {
					largeData = dataObj[1] + " 이상";
					middleData = dataObj[1] + " 미만";
					smallData = dataObj[0] + " 미만";
				} else if (dataObj.length == 2) {
					middleData = dataObj[1];
					smallData = dataObj[0];
				} else if (dataObj.length == 1) {
					smallData = dataObj[0];
				}
				$(that.foreGiftObj).find(".stats_tit").html(title);
				$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(0)").html(largeData);
				$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(1)").html(middleData);
				$(that.foreGiftObj).find(".stats_contents > dl > dd:eq(2)").html(smallData);
				$(that.foreGiftObj).show();
				$(that.foreGiftObj).find(".statsbox").show();
			};
			//타이틀 업데이트
			this.updateSearchTitle = function(options) {
				if (options == null) {
					return;
				}
				var titleText = "";
				var year = "";
				var reference = "";
				if (options.params == undefined) { //KOSIS
					return false;
				} else { //인터랙티브
					//타이틀만들기 
					for (var i = 0; i < options.params.param.length; i++) {
						if (options.params.param[i].key == "year") {
							//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위 삭제
							titleText = options.params.title;
							year = options.params.param[i].value;
							break;
						}
					}
					//조건결합일 경우, 하드코딩
					if (Object.prototype.toString.call(options.params.api_id) === '[object Array]') {
						reference += "통계청, 인구주택총조사";
					} else {
						var tmpApiId = options.params.api_id.split(" | ");
						for (var i = 0; i < tmpApiId.length; i++) {
							if (tmpApiId[i] == "API_0301" || tmpApiId[i] == "API_0302" ||
								tmpApiId[i] == "API_0305" || tmpApiId[i] == "API_0306") {
								reference = this.getReference(reference, 0);
							} else if (tmpApiId[i] == "API_0304") {
								reference = this.getReference(reference, 1);
							} else if (tmpApiId[i] == "API_0307" || tmpApiId[i] == "API_0308" ||
								tmpApiId[i] == "API_0309" || tmpApiId[i] == "API_0310") {
								reference = this.getReference(reference, 2);
							} else { //default
								reference = this.getReference(reference, 0);
							}
						}
					}
					reference = "[출처 : " + reference + " (" + year + ")]";
				}
				clearTimeout(titleActionDoit);
				$(".MapArea>.MapTitle>h3").stop().css({"margin-left":"0"}).html(titleText + "&nbsp;" + reference);
				var titleAction = function(){
					clearTimeout(titleActionDoit);
					$(".MapTitle>h3").css({"width":"","padding-left":""});
					if($(".MapTitle>h3").width()>$(".MapTitle").width()){
						$(".MapTitle>h3").css({"padding-left":"10px"});
						titleActionDoit = setTimeout(function(){
							$(".MapTitle>h3").animate({
								"margin-left":"-"+($(".MapTitle>h3").width()+10)
							},6000,function(){
								$(".MapTitle>h3").css({"margin-left":"0"});
								titleAction();
							});
						}, 3000);
					}else{
						$(".MapTitle>h3").css({"width":"100%"});
					}
				};
				titleAction();
				$(".MapArea>.MapTitle").show();
			};
			//출처가져오기
			this.getReference = function(reftext, idx) {
				var ref = {
					0: "통계청, 인구주택총조사",
					1: "통계청, 전국사업체조사",
					2: "통계청, 농림어업총조사"
				};
				if (reftext != ref[idx]) {
					if (reftext != "") {
						reftext += " | ";
					}
					reftext += ref[idx];
				} else {
					reftext.replace(" | ", "");
				}
				return reftext;
			};
			//경계 선택 시 차트에서 해당하는 값을 하이라이트
			this.selectChartData = function(properties, index) {
				var charts = $("#barChart_" + this.id).find("#container_graph_bar").highcharts();
				//그래프가 열려있을 때 툴팁 보여줌
				if ($("#barChart_" + this.id).find("#container_graph_bar").is(":visible")) {
					var adm_cd = properties.adm_cd;
					var ssaArray = properties.adm_nm.split(" ");
					if (charts != undefined && index != undefined && index != null) {
						if (this.lastChatIndex != null) {
							charts.series[0].data[this.lastChatIndex].update({
								color: '#2951f2'
							});
						}
						charts.series[0].data[index].update({
							color: '#fe5800'
						});
						charts.tooltip.refresh(charts.series[0].data[index]);
						this.lastChatIndex = index;
					}
				}
			};
			//경계 선택 시 범례에서 해당하는 값을 하이라이트
			this.selectLegendRangeData = function(fillColor) {
				$("#legendColor1_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor2_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor3_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor4_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor5_" + this.id).parent().css("background-color", "#fff");
				if (this.legendColor1 == fillColor) {
					$("#legendColor1_" + this.id).parent().css("background-color", "#fa9696");
				} else if (this.legendColor2 == fillColor) {
					$("#legendColor2_" + this.id).parent().css("background-color", "#fa9696");
				} else if (this.legendColor3 == fillColor) {
					$("#legendColor3_" + this.id).parent().css("background-color", "#fa9696");
				} else if (this.legendColor4 == fillColor) {
					$("#legendColor4_" + this.id).parent().css("background-color", "#fa9696");
				} else if (this.legendColor5 == fillColor) {
					$("#legendColor5_" + this.id).parent().css("background-color", "#fa9696");
				}
			};
			//컬러픽커 설정
			this.colorPickerSet = function() {
				$('#legendColor_' + this.id).find('.color-box').colpick({
					colorScheme: 'dark',
					layout: 'rgbhex',
					color: '#ededed',
					onSubmit: function(hsb, hex, rgb, el) {
						$(el).css('backgroundColor', '#' + hex);
						$(el).colpickHide();
						that.userColorChg();
					}
				}).css('background-color', '#ededed');
				$('#legendColor_' + this.id).find('.color-box2').colpick({
					colorScheme: 'dark',
					layout: 'rgbhex',
					color: '#05f5b9',
					onSubmit: function(hsb, hex, rgb, el) {
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
				if ($("#legendColor_" + this.id).find("#legend_auto").is(":checked")) {
					that.map.legendType = "auto";
				}
				if ($("#legendColor_" + this.id).find("#legend_equal").is(":checked")) {
					that.map.legendType = "equal";
				}
				if ($("#legendColor_" + this.id).find("#legend_user").is(":checked")) {
					that.map.legendType = "user";
				}
				if (that.map.legendType == 'equal') {
					that.map.valPerSlice = that.map.legendValue.equal;
				} else if (that.map.legendType == 'auto') {
					that.map.valPerSlice = that.map.legendValue.auto;
				} else if (that.map.legendType == 'user') {
					if (that.map.legendValue.user != undefined && that.map.legendValue.user.length > 0) {
						var value1 = parseFloat($("#legend_1_2").val());
						var value2 = parseFloat($("#legend_2_2").val());
						var value3 = parseFloat($("#legend_3_2").val());
						var value4 = parseFloat($("#legend_4_2").val());
						var value5 = parseFloat($("#legend_2_1").val());
						var value6 = parseFloat($("#legend_3_1").val());
						var value7 = parseFloat($("#legend_4_1").val());
						if (parseFloat(value2) <= parseFloat(value5)) {
							messageAlert.open("알림", "2구간 " + value2 + "은 2구간 " + value5 + "보다 작거나 같을 수 없습니다.");
							return;
						} else if (parseFloat(value3) <= parseFloat(value6)) {
							messageAlert.open("알림", "3구간 " + value3 + "은 3구간 " + value6 + "보다 작거나 같을 수 없습니다.");
							return;
						} else if (parseFloat(value4) <= parseFloat(value7)) {
							messageAlert.open("알림", "4구간 " + value4 + "은 4구간 " + value7 + "보다 작거나 같을 수 없습니다.");
							return;
						} else if (parseFloat(value1) >= parseFloat(value2)) {
							messageAlert.open("알림", "1구간 " + value1 + "은 2구간 " + value2 + "보다 크거나 같을 수 없습니다.");
							return;
						} else if (parseFloat(value2) >= parseFloat(value3)) {
							messageAlert.open("알림", "2구간 " + value2 + "은 3구간 " + value3 + "보다 크거나 같을 수 없습니다.");
							return;
						} else if (parseFloat(value3) >= parseFloat(value4)) {
							messageAlert.open("알림", "3구간 " + value3 + "은 4구간 " + value4 + "보다 크거나 같을 수 없습니다.");
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
				if (that.map.valPerSlice != undefined && that.map.valPerSlice.length > 0) {
					that.setLegendRange(that.map.valPerSlice);
				}
				var legend = $("#legend_" + this.id);
				var legendColor = $("#legendColor_" + this.id);
				if (legendColor.find("input[name='setColor_" + this.id + "']:checked").val() == "BW") { //검정 & 화이트
					legend.find("#legendColor1_" + this.id).css("background-color", legendColor.find(".color_01 > span:eq(0)").css("background-color"));
					legend.find("#legendColor2_" + this.id).css("background-color", legendColor.find(".color_01 > span:eq(1)").css("background-color"));
					legend.find("#legendColor3_" + this.id).css("background-color", legendColor.find(".color_01 > span:eq(2)").css("background-color"));
					legend.find("#legendColor4_" + this.id).css("background-color", legendColor.find(".color_01 > span:eq(3)").css("background-color"));
					legend.find("#legendColor5_" + this.id).css("background-color", legendColor.find(".color_01 > span:eq(4)").css("background-color"));
				} else if (legendColor.find("input[name='setColor_" + this.id + "']:checked").val() == "Blue") { //파랑색
					legend.find("#legendColor1_" + this.id).css("background-color", legendColor.find(".color_02 > span:eq(0)").css("background-color"));
					legend.find("#legendColor2_" + this.id).css("background-color", legendColor.find(".color_02 > span:eq(1)").css("background-color"));
					legend.find("#legendColor3_" + this.id).css("background-color", legendColor.find(".color_02 > span:eq(2)").css("background-color"));
					legend.find("#legendColor4_" + this.id).css("background-color", legendColor.find(".color_02 > span:eq(3)").css("background-color"));
					legend.find("#legendColor5_" + this.id).css("background-color", legendColor.find(".color_02 > span:eq(4)").css("background-color"));
				} else if (legendColor.find("input[name='setColor_" + this.id + "']:checked").val() == "Red") { //붉은색
					legend.find("#legendColor1_" + this.id).css("background-color", legendColor.find(".color_03 > span:eq(0)").css("background-color"));
					legend.find("#legendColor2_" + this.id).css("background-color", legendColor.find(".color_03 > span:eq(1)").css("background-color"));
					legend.find("#legendColor3_" + this.id).css("background-color", legendColor.find(".color_03 > span:eq(2)").css("background-color"));
					legend.find("#legendColor4_" + this.id).css("background-color", legendColor.find(".color_03 > span:eq(3)").css("background-color"));
					legend.find("#legendColor5_" + this.id).css("background-color", legendColor.find(".color_03 > span:eq(4)").css("background-color"));
				}
				this.colorVarSet();
				$("#legendColor_" + that.id).find(".remarks_option").hide();
				$('#legendColor_' + that.id).find('.color-box').colpick().colpickHide();
				$('#legendColor_' + that.id).find('.color-box2').colpick().colpickHide();
				$(that.userLegendObj).find(".remarksUser_option").hide();
			};
			//범례를 변수에 저장
			this.colorVarSet = function() {
				var legend = $("#legend_" + this.id);
				this.legendColor1 = legend.find("#legendColor1_" + this.id).css("background-color");
				this.legendColor2 = legend.find("#legendColor2_" + this.id).css("background-color");
				this.legendColor3 = legend.find("#legendColor3_" + this.id).css("background-color");
				this.legendColor4 = legend.find("#legendColor4_" + this.id).css("background-color");
				this.legendColor5 = legend.find("#legendColor5_" + this.id).css("background-color");
				var tmpColors = [
					this.legendColor1,
					this.legendColor2,
					this.legendColor3,
					this.legendColor4,
					this.legendColor5
				];
				this.map.setLegendColor(tmpColors);
			};
			this.updateUserLegend = function() {
				if (that.map.valPerSlice != undefined && that.map.valPerSlice.length > 0) {
					var value = that.map.legendValue.user[0];
					$("#userLegend_" + that.id).find("#legend_1_2").val(value[0]);
					$("#userLegend_" + that.id).find("#legend_2_1").val(value[0]);
					$("#userLegend_" + that.id).find("#legend_2_2").val(value[1]);
					$("#userLegend_" + that.id).find("#legend_3_1").val(value[1]);
					$("#userLegend_" + that.id).find("#legend_3_2").val(value[2]);
					$("#userLegend_" + that.id).find("#legend_4_1").val(value[2]);
					$("#userLegend_" + that.id).find("#legend_4_2").val(value[3]);
					$("#userLegend_" + that.id).find("#legend_5_1").val(value[3]);
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
				$("#legend_" + this.id).find("#legendRange1").text("-");
				$("#legend_" + this.id).find("#legendRange2").text("-");
				$("#legend_" + this.id).find("#legendRange3").text("-");
				$("#legend_" + this.id).find("#legendRange4").text("-");
				$("#legend_" + this.id).find("#legendRange5").text("-");
				$("#legendColor1_" + this.id).css("background-color", "#ffddd7");
				$("#legendColor2_" + this.id).css("background-color", "#ffb2a5");
				$("#legendColor3_" + this.id).css("background-color", "#ff806c");
				$("#legendColor4_" + this.id).css("background-color", "#ff593f");
				$("#legendColor5_" + this.id).css("background-color", "#ff2400");
				$("#legendColor1_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor2_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor3_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor4_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor5_" + this.id).parent().css("background-color", "#fff");
				$("#rentalLegend_" + this.id).find("#legendRange1").text("-");
				$("#rentalLegend_" + this.id).find("#legendRange2").text("-");
				$("#rentalLegend_" + this.id).find("#legendRange3").text("-");
				$("#rentalLegend_" + this.id).find("#legendRange4").text("-");
				$("#rentalLegend_" + this.id).find("#legendRange5").text("-");
				$("#rentalLegendColor1_" + this.id).css("background-color", "#e2f1ff");
				$("#rentalLegendColor2_" + this.id).css("background-color", "#badcff");
				$("#rentalLegendColor3_" + this.id).css("background-color", "#7dbdff");
				$("#rentalLegendColor4_" + this.id).css("background-color", "#409eff");
				$("#rentalLegendColor5_" + this.id).css("background-color", "#0880fa");
				$("#rentalLegendColor1_" + this.id).parent().css("background-color", "#fff");
				$("#rentalLegendColor2_" + this.id).parent().css("background-color", "#fff");
				$("#rentalLegendColor3_" + this.id).parent().css("background-color", "#fff");
				$("#rentalLegendColor4_" + this.id).parent().css("background-color", "#fff");
				$("#rentalLegendColor5_" + this.id).parent().css("background-color", "#fff");
				$("#userLegend_" + this.id).find("#legend_1_2").val("100");
				$("#userLegend_" + this.id).find("#legend_2_1").val("100");
				$("#userLegend_" + this.id).find("#legend_2_2").val("200");
				$("#userLegend_" + this.id).find("#legend_3_1").val("200");
				$("#userLegend_" + this.id).find("#legend_3_2").val("300");
				$("#userLegend_" + this.id).find("#legend_4_1").val("300");
				$("#userLegend_" + this.id).find("#legend_4_2").val("400");
				$("#userLegend_" + this.id).find("#legend_5_1").val("400");
				$("#legendUnit_" + this.id).html("");
				$(that.pieChartObj).hide();
				$(that.barChartObj).hide();
				$(that.timeSeriesObj).hide();
				$(that.searchTitleObj).hide();
				$(that.legendObj).find(".remarkbox").hide();
				$(that.legendObj).find(".remarks_option").hide();
				$(that.legendColorObj).find(".remarks_option").hide();
				$(that.legendObj).find('.color-box').colpick().colpickHide();
				$(that.legendObj).find('.color-box2').colpick().colpickHide();
				$(that.userLegendObj).find(".remarksUser_option").hide();
				$(that.foreGiftObj).find(".btn_stats").show();
				$(that.foreGiftObj).find(".statsbox").hide(); //권리금
				$(that.rentalLegendObj).find(".remarkbox").hide(); //임대료
				$(that.rentalLegendObj).find(".rental_remarks_option").hide();
				$(that.rentalLegendObj).find('.color-box').colpick().colpickHide();
				$(that.rentalLegendObj).find('.color-box2').colpick().colpickHide();
				that.colorVarSet();
				that.lastChatIndex != null;
				$("#checkMarker").attr("checked", false);
				for (var i = 0; i < this.markerGroup.length; i++) {
					this.markerGroup[i].marker.remove();
				}
				this.markerGroup = [];
			};
			// OpenAPI 지오코딩 검색
			this.openApiGeocode = function(address, options) {
				var sopOpenApiGeocodeObj = new sop.openApi.openApiuserGeocode.api();
				sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
				sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent(address)));
				sopOpenApiGeocodeObj.request({
					method: "GET",
					async: true,
					url: openApiPath + "/OpenAPI3/addr/geocode.json",
					options: options
				});
			}
			//상단 버튼 클릭 이벤트
			this.topButton = function() {
				var that = this;
				$("#Btn_Search_Detail>button,.Content>.Btn_Top>nav>.Btn_Top2").click(function() {
					that.showThisMap();
				});
			}
			//지도만 보여주고 나머지는 숨기고 상단버튼의 지도 영역 활성화
			this.showThisMap = function() {
				$(".Map.mapareaboxd").show();
				$("#chart-area,#table-area").hide();
				$("#legendColor_" + that.id).find(".remarks_option").hide();
				$('#legendColor_' + that.id).find('.color-box').colpick().colpickHide();
				$('#legendColor_' + that.id).find('.color-box2').colpick().colpickHide();
				$("#legend_" + that.id).find(".remarkbox").hide();
				if (that.delegate && that.delegate.mapList && that.delegate.mapList.length > 0) {
					$sgisMobile.ui.mapResize(that.delegate.mapList);
				}
				$(".Content>.Btn_Top>nav>a[class^=Btn_Top]").removeClass("M_on");
				$(".Content>.Btn_Top>nav>a.Btn_Top2").addClass("M_on");
			}
		}
	};
	/*********** 원형차트 레벨별 표출 Start **********/
	(function() {
		$class("sop.portal.pieChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var that = options.target;
				var filter = options.params.filter;
				if (res.errCd == "0") {
					$(".Content>.Btn_Top>nav>.Btn_Top4").removeClass("NoneAction");
					//if()
					$("#piechart-button").show();
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
					if (res.id == "4001") { //인구통계총괄
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
					} else if (res.id == "4002") { //인구통계세부조건검색
						pieCount = result[0].population;
						titleText = "인구";
					} else if (res.id == "4004") { //사업체분류검색
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
					} else if (res.id == "4005") { //가구통계검색
						pieCount = result[0].household_cnt;
						titleText = "가구수";
					} else if (res.id == "4006") { //주택통계검색
						pieCount = result[0].house_cnt;
						titleText = "주택수";
					} else if (res.id == "4007") { //농가통계검색
						pieCount = result[0].farm_cnt;
						titleText = "가구원 수";
					} else if (res.id == "4008") { //임가통계검색
						pieCount = result[0].population;
						titleText = "가구원 수";
					} else if (res.id == "4009") { //어가통계검색
						pieCount = result[0].fishery_cnt;
						titleText = "가구원 수";
					} else if (res.id == "4010") { //가구원통계검색
						pieCount = result[0].population;
						titleText = "가구원 수";
					}
					$("#pieChart_" + that.id).find("#pieChartDiv1").html("");
					$("#pieChart_" + that.id).find("#pieChartDiv2").html("");
					$("#pieChart_" + that.id).find("#pieChartDiv3").html("");
					//5 미만 N/A처리
					if (pieCount > 4) {
						pieCount = appendCommaToNumber(pieCount);
					} else {
						pieCount = "N/A";
					}
					$("#pieChart_" + that.id).find(".graph_tit").html("<font size='3'>" + pieCount + "</font><font size='3'>" + options.params.unit + "</font>");
					$("#pieChart_" + that.id).show();
					//타이틀만들기 - (년도 + 최종선택 된 통계항목 제목) 
					for (var i = 0; i < options.params.param.length; i++) {
						if (options.params.param[i].key == "year") {
							//							titleText = "상위지역대비 비율 : " + options.params.param[i].value + "년 " + options.params.title + " (" + options.params.unit + ")";
							titleText = "상위지역대비 비율";
							break;
						}
					}
					$("#pieChart_" + that.id).find(".graph_txt").html(textSubString(titleText, 20));
					$("#pieChart_" + that.id).find(".graph_txt").tooltip({
						content: titleText,
						position: {
							my: "left+10 top-40"
						},
						track: true
					});
					if (top == undefined) {
						top = 0;
						topViewFlag = false;
					}
					if (middle == undefined) {
						middle = 0;
						middleViewFlag = false;
					}
					if (bottom == undefined) {
						bottom = 0;
					}
					//범례
					var html = "";
					if (topViewFlag) {
						html += "<span class='pieLegend1'><span class='legendName'>" + top_nm + "</span> : <span class='legendValue'>" + top + "%</span></span> ";
					}
					if (middleViewFlag) {
						html += "<span class='pieLegend2'><span class='legendName'>" + middle_nm + "</span> : <span class='legendValue'>" + middle + "%</span></span> ";
					}
					if (bottom_nm == undefined) {
						bottom_nm = "검색결과";
					}
					html += "<span class='pieLegend3'><span class='legendName'>" + bottom_nm + "</span> : <span class='legendValue'>" + bottom + "%</span></span>";
					$("#pieChart_" + that.id).find(".pieLegend").html(html);
					if (top > 0 || middle > 0 || bottom > 0) {
						if ($d.browser.ie8) { //익스플로러 8일 경우 막대차트로
							$("#pieChart_" + that.id).find("#pieChartDiv1").highcharts({
								chart: {
									type: 'column',
									backgroundColor: 'white',
									height: ($(window).outerHeight(true) - 263),
									width: $(window).outerWidth(true),
									margin: [0, 0, 0, 0]
								},
								tooltip: {
									enabled: false
								},
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
									data: [100 - top, 100 - middle, 100 - bottom]
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
							if (topViewFlag) {
								//원형차트1
								$("#pieChart_" + that.id).find("#pieChartDiv1").highcharts({
									chart: {
										backgroundColor: "transparent",
										borderWidth: 0,
										margin: [0, 0, 0, 0],
										height: 200,
										width: 200
									},
									colors: ['#c95236', '#eeeeee'],
									navigation: {
										buttonOptions: {
											enabled: false
										}
									},
									tooltip: {
										enabled: false
									},
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
											states: {
												hover: {
													brightness: 0
												}
											},
											startAngle: 0,
											endAngle: 360,
											center: ['50%', '50%'],
											borderWidth: 0
										}
									},
									series: [{
										type: 'pie',
										name: '차상위',
										innerSize: '91%',
										data: [
											['비율', top],
											['전체', 100 - top]
										],
										dataLabels: {
											enabled: true,
											rotation: -45,
											color: '#333333',
											align: 'right',
											x: -4004,
											y: 20,
											style: {
												fontSize: '15px',
												fontWeight: 'normal'
											}
										}
									}]
								});
							}
							if (middleViewFlag) {
								//원형차트2
								$("#pieChart_" + that.id).find('#pieChartDiv2').highcharts({
									chart: {
										backgroundColor: "transparent",
										borderWidth: 0,
										margin: [0, 0, 0, 0],
										height: 160,
										width: 160
									},
									colors: ['#3677bb', '#eeeeee'],
									tooltip: {
										enabled: false
									},
									navigation: {
										buttonOptions: {
											enabled: false
										}
									},
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
											states: {
												hover: {
													brightness: 0
												}
											},
											startAngle: 0,
											endAngle: 360,
											center: ['50%', '50%'],
											borderWidth: 0
										}
									},
									series: [{
										type: 'pie',
										name: '상위',
										innerSize: '91%',
										data: [
											['비율', middle],
											['전체', 100 - middle]
										],
										dataLabels: {
											enabled: true,
											rotation: -45,
											color: '#333333',
											align: 'right',
											x: -4004,
											y: 20,
											style: {
												fontSize: '15px',
												fontWeight: 'normal'
											}
										}
									}]
								});
							}
							//원형차트3
							$("#pieChart_" + that.id).find('#pieChartDiv3').highcharts({
								chart: {
									backgroundColor: "transparent",
									borderWidth: 0,
									margin: [0, 0, 0, 0],
									height: 120,
									width: 120
								},
								colors: ['#41b66e', '#eeeeee'],
								tooltip: {
									enabled: false
								},
								navigation: {
									buttonOptions: {
										enabled: false
									}
								},
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
										states: {
											hover: {
												brightness: 0
											}
										},
										startAngle: 0,
										endAngle: 360,
										center: ['50%', '50%'],
										borderWidth: 0
									}
								},
								series: [{
									type: 'pie',
									name: '해당지역',
									innerSize: '91%',
									data: [
										['비율', bottom],
										['전체', 100 - bottom]
									],
									dataLabels: {
										enabled: true,
										rotation: -45,
										color: '#333333',
										align: 'right',
										x: -4004,
										y: 20,
										style: {
											fontSize: '15px',
											fontWeight: 'normal'
										}
									}
								}]
							});
						}
					} else {
						$("#piechart-button").hide();
					}
				} else {
					//messageAlert.open("알림", res.errMsg);
					$("#piechart-button").hide();
				}
			},
			onFail: function(status, options) {
				var that = options.target;
				$("#piechart-button").hide();
			}
		});
	}());
	/*********** 원형차트 레벨별 표출 End **********/
	/*********** OpenAPI 지오코딩 검색 Start **********/
	(function() {
		$class("sop.openApi.openApiuserGeocode.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var table = $("#userUpload_" + options.delegate.id).DataTable();
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
							result.resultdata[0].adm_cd != null &&
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
						$('#userUpload_' + options.delegate.id + ' tbody > tr').eq(options.index)
							.find("td").eq(0)
							.css("background-color", "#b2fa5c");
						options.delegate.indicatorCnt++;
						if (options.delegate.indicatorCnt == options.lastIndex + 1) {
							$(options.delegate.infoUserUploadObj).find(".m_indicator").hide();
							options.dataTable.fnDraw();
						}
					} else {
						var statusIdx = table.column("status:name").index();
						table.cell(options.index, statusIdx).data("변환실패");
						$('#userUpload_' + options.delegate.id + ' tbody > tr').eq(options.index)
							.find("td").eq(0)
							.css("background-color", "#ff9999");
						options.delegate.indicatorCnt++;
						if (options.delegate.indicatorCnt == options.lastIndex + 1) {
							$(options.delegate.infoUserUploadObj).find(".m_indicator").hide();
							options.dataTable.fnDraw();
						}
					}
				} else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(options.delegate.openApiGeocode(options.address, options), 500);
				} else {
					var table = $("#userUpload_" + options.delegate.id).DataTable();
					var statusIdx = table.column("status:name").index();
					table.cell(options.index, statusIdx).data("변환실패");
					$('#userUpload_' + options.delegate.id + ' tbody > tr').eq(options.index)
						.find("td").eq(0)
						.css("background-color", "#ff9999");
					options.delegate.indicatorCnt++;
					if (options.delegate.indicatorCnt == options.lastIndex + 1) {
						$(options.delegate.infoUserUploadObj).find(".m_indicator").hide();
						options.dataTable.fnDraw();
					}
				}
			},
			onFail: function(status, options) {
				var table = $("#userUpload_" + options.delegate.id).DataTable();
				table.cell(options.index, table.column("status:name").index()).data("변환실패");
				$('#userUpload_' + options.delegate.id + ' tbody > tr').eq(options.index)
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