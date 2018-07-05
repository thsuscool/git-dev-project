/**
 * 맵 부가기능 에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/25 초기 작성 author : 김성현 version : 1.0 see :
 * 
 */
(function (W, D) {
	// "use strict";
	
	W.$mapInfo = W.$mapInfo || {};
	
	$(document).ready(function () {
		
		$.cssHooks.backgroundColor = {
			get : function (elem) {
				if (elem.currentStyle)
					var bg = elem.currentStyle["backgroundColor"];
				else if (window.getComputedStyle)
					var bg = document.defaultView.getComputedStyle(elem, null).getPropertyValue("background-color");
				if (bg.search("rgb") == -1)
					return bg;
				else {
					bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					function hex (x) {
						return ("0" + parseInt(x).toString(16)).slice(-2);
					}
					if (bg != null) {
						return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
					}
					else {
						return "#fff";
					}
				}
			}
		};
		
		$.cssHooks.color = {
			get : function (elem) {
				if (elem.currentStyle)
					var bg = elem.currentStyle["color"];
				else if (window.getComputedStyle)
					var bg = document.defaultView.getComputedStyle(elem, null).getPropertyValue("color");
				if (bg.search("rgb") == -1)
					return bg;
				else {
					bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					function hex (x) {
						return ("0" + parseInt(x).toString(16)).slice(-2);
					}
					if (bg != null) {
						return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
					}
					else {
						return "#fff";
					}
				}
			}
		};
	});
	
	sMapInfo = {
		mapInfo : function (map) {
			var that = this;
			this.delegate = null;
			this.map = map;
			this.id = null;
			this.firstBoolean = true; // 처음로딩 여부
			this.firstValue = ""; // 처음로딩 임시 저장값
			this.firstSggCd = ""; // 처음로딩 좌표(시군구)
			this.firstAdmCd = ""; // 처음로딩 좌표(읍면동)
			this.barChartObj = null; // 막대차트 Object
			this.pieChartObj = null; // 파이차트 Object
			this.legendObj = null; // 범례 Object
			this.addMapBtnObj = null; // 지도추가 버튼 Object
			this.removeMapBtnObj = null; // 지도삭제 버튼 Object
			this.legendColor1 = "#ffddd7";								// 범례 색상1
			this.legendColor2 = "#ffb2a5";								// 범례 색상2
			this.legendColor3 = "#ff806c";								// 범례 색상3
			this.legendColor4 = "#ff593f";								// 범례 색상4
			this.legendColor5 = "#ff2400";	
			this.timeSeriesYear = ""; // 첫번째 맵에서 선택한 시계열 년도
			this.timeSeriesYearAdd = ""; // 두번째 맵에서 선택한 시계열 년도
			this.firstYearArray = new Array(); // 첫번째 맵의 선택 가능 시계열 년도
			this.secondYearArray = new Array(); // 두번째 맵의 선택 가능 시계열 년도
			this.timeSeriesPushData = new Array(); // 시계열 애니메이션의 정보를 담는 변수
			this.isTimeSeriesPlay = false; // 시계열 애니메이션에서 사용될 정보를 모두 가져왔는지 확인
			this.timeSeriesCnt = 0; // 시계열 도는 횟수
			this.timer = 0; // 타이머
			
			this.initialize = function (delegate) {
				// 현재 범례를 변수에 저장
				var tmpColors = [ this.legendColor1, this.legendColor2, this.legendColor3, this.legendColor4, this.legendColor5 ];
				
				this.map.setLegendColor(tmpColors);
				this.delegate = delegate;
				
				var currentdate = new Date();
				this.id = makeStamp(currentdate);
				
			};
			
			//poi
			this.createPoiInfo = function () {
				var poiInfo = sop.control({
					position : 'bottomleft'
				});
				poiInfo.onAdd = function (map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'foreGift_' + that.id);
					that.foreGiftObj = this._div;
					return this._div;
				};
				poiInfo.update = function (props) {
					var html="";
					html += '<div class="poibox">';
					html += "<div class='poibox_in'>";
					html += '<img src="/mobile/img/marker/marker/10_12.png">';
					html += '<p>보건 업종</p>';
					html += '</div>';
					 html += '</div>';
					this._div.innerHTML=html;
				};
					poiInfo.addTo(this.map.gMap);
			};
						
			//범례 추가
			this.createLegend = function() {
				var infoLegend = sop.control({position: 'bottomleft'});
				infoLegend.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'legend_' +that.id).css({"margin":"0px"});
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
				
				//remark layer
				$(top.document).find(".Btn_Top>nav>.Btn_Top3").removeClass("NoneAction");
				$(top.document).find(".Btn_Top>nav>.Btn_Top3").click(function(){
					$(top.document).find(".Btn_Top>nav>.Btn_Top2").removeClass("M_on");
					if($("#legend_"+that.id).find(".remarkbox").is(":visible")){
						$(top.document).find(".Btn_Top>nav>.Btn_Top3").removeClass("M_on");
						$(top.document).find(".Btn_Top>nav>.Btn_Top2").addClass("M_on");
						$("#legendColor_"+that.id).find(".remarks_option").hide();
						$('#legendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#legendColor_'+that.id).find('.color-box2').colpick().colpickHide();
					}
					else{
						$(top.document).find(".Btn_Top>nav>.Btn_Top3").addClass("M_on");
					}
					$("#legend_"+that.id).find(".remarkbox").toggle();
				});
				
				//범례/차트/표 지우기
				$(top.document).find(".Btn_Top>nav>.Btn_Top2").click(function(){
					$(top.document).find(".Btn_Top>nav>.Btn_Top3").removeClass("M_on");
					$(top.document).find(".Btn_Top>nav>.Btn_Top2").addClass("M_on");
					$("#legend_"+that.id).find(".remarkbox").hide();
				});
				
				// image rollover
				$("#legend_"+this.id).find("img.rollover").hover( 
					function() { this.src = this.src.replace("_off", "_on"); 
					}, 
					function() { this.src = this.src.replace("_on", "_off"); 
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
				
			};
			
			//범례설정 추가
			this.createLegendColor = function() {
				var infoLegendColor = sop.control({position: 'bottomright'});
				infoLegendColor.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'legendColor_' +that.id);
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
				$("#legendColor_"+this.id).find(".remark_btn_close").click(function(){
					$("#legendColor_"+that.id).find(".remarks_option").hide();
				});
				
				//범례적용
				$("#legendColor_"+this.id).find("#legendApply").click(function(){
					that.colorApply();
				});
				
				//범례닫기
				$("#legendColor_"+this.id).find("#legendClosed").click(function(){
					$("#legendColor_"+that.id).find(".remarks_option").hide();
				});
			};
			
			// 원형차트 추가
			this.createPieChart = function () {
				var infoPieChart = sop.control({
					position : 'topright'
				});
				infoPieChart.onAdd = function (map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'pieChart_' + that.id);
					that.pieChartObj = this._div;
					return this._div;
				};
				infoPieChart.update = function (props) {
					$(this._div).css("height", "300px");
					this._div.innerHTML = "<div id='pieChartDiv1'></div>" + "<div id='pieChartDiv2' style='position: relative; width: 180px; top: -200px; left: 20px;'></div>" + "<div id='pieChartDiv3' style='position: relative; width: 100px; top: -360px; left: 40px;'></div>" + "<div id='pieCountDiv' style='width: 76px; height: 40px; top: 89px; right: 72px; background-color: #fff; position: absolute;'></div>";
				};
				infoPieChart.addTo(this.map.gMap);
				$("#pieChart_" + that.id).hide();
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
													"<a class='btn_graph_bar'><img class='rollover' src='/mobile/img/im/btn_graphplot_off.png' alt='' /></a>" +
													"<div class='graphbox_bar'>" +
														"<div class='graphbox_in' style='padding-bottom: 0px'>" +
															"<div class='graph'>" +
																"<div id='container_graph_bar'>" +
																"</div>" +
															"</div>" +
														"</div>" +
														"<a class='btn_graph_bar_offset'><img class='rollover' src='/mobile/img/im/icon_arrow_graph_off.gif' alt='' /></a>" +
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
			};
			
			// 시계열 설정 추가
			this.createTimeSeries = function () {
				var isVisible = $("#tableTimeSeries").is(":visible");
				var isMap1ContentShow = $("#mapContent_1").is(":visible");
				var isMap2ContentShow = $("#mapContent_2").is(":visible");
				
				if (!isVisible) {
					var date = new Date();
					var html = "";
					html += "		<div style='text-align: center; line-height: 45px; width: 100%; margin: auto; background-color: #fff;'>";
					html += "			<div style='float: left; width: 30px; font-weight: bold; cursor: pointer;'>";
					html += "				<span id='timeSeriesPlayBtn'>▶</span>";
					html += "			</div>";
					html += "			<div>";
					html += "				<table width='95%' id='tableTimeSeries'>";
					html += "					<tr>";
					html += "						<td><table width='100%' id='tableTimeSeries1'></table></td>";
					html += "					</tr>";
					html += "					<tr>";
					html += "						<td><table width='100%' id='tableTimeSeriesYear'></table></td>";
					html += "					</tr>";
					html += "					<tr>";
					html += "						<td><table width='100%' id='tableTimeSeries2'></table></td>";
					html += "					</tr>";
					html += "				</table>";
					html += "			</div>";
					html += "		</div>";
					
					$("#timeSeriesDiv").hide();
					$("#timeSeriesDiv").html(html);
				}
				
				// 첫번째맵, 두번째맵 둘 다 열려있을 경우
				if (isMap1ContentShow && isMap2ContentShow) {
					var html1 = "";
					var html2 = "";
					var date = new Date();
					
					if (this.map.id == "0") { // 첫번째 맵 생성
						html1 += "	<tr>";
						for ( var year = 2000; year < date.getFullYear(); year++) {
							html1 += "	<td id='tdYear" + year + "' style='color: #ebe8eb;'>" + year + "</td>";
						}
						html1 += "	</tr>";
						
						$("#tableTimeSeries1").empty();
						$("#tableTimeSeries1").html(html1);
					}
					
					if (this.map.id == "1") { // 두번째 맵 생성
						html2 += "	<tr>";
						for ( var year = 2000; year < date.getFullYear(); year++) {
							html2 += "	<td id='tdYearAdd" + year + "' style='color: #ebe8eb;'>" + year + "</td>";
						}
						html2 += " 	</tr>";
						
						$("#tableTimeSeries2").empty();
						$("#tableTimeSeries2").html(html2);
					}
					
					// 두개의 맵 모두 시계열 정보가 있을 경우 보여준다.
					if ($("#tableTimeSeries1").html() != "" && $("#tableTimeSeries2").html() != "") {
						$("#timeSeriesDiv").show();
					}
				}
				
				// 시계열 플레이 버튼
				if ((isMap1ContentShow && !isMap2ContentShow) || (!isMap1ContentShow && isMap2ContentShow)) { // 둘 중에
					// 하나만
					// 열려있을
					// 경우에만
					$("#timeSeriesPlayBtn").click(function () {
						var isMap1 = $("#mapContent_1").is(":visible");
						var isMap2 = $("#mapContent_2").is(":visible");
						if ((isMap1 && !isMap2) || (!isMap1 && isMap2)) { // 둘 중에
							// 하나만
							// 열려있을
							// 경우에만
							if ($("#timeSeriesPlayBtn").html() == "▶") {
								$("#timeSeriesPlayBtn").html("■");
								// 시계열 플레이시작.
								that.isTimeSeriesPlay = true;
								
								if (isMap1ContentShow) {
									that.doReqTimeSeries();
								}
								else if (isMap2ContentShow) {
									
								}
								
							}
							else if ($("#timeSeriesPlayBtn").html() == "■") {
								$("#timeSeriesPlayBtn").html("▶");
								// 시계열 플레이시작.
								that.isTimeSeriesPlay = false;
								that.timeSeriesPushData = [];// 초기화
								clearInterval(that.timer);
							}
						}
					});
				}
			};
			
			// 지도추가 버튼 생성
			this.createAddMapBtn = function () {
				var infoAddMap = sop.control({
					position : 'bottomright'
				});
				infoAddMap.onAdd = function (map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'addMap_' + that.id);
					that.addMapBtnObj = this;
					return this._div;
				};
				infoAddMap.update = function (props) {
					this._div.innerHTML = "<input type='button' id='addMapBtn' value='지도추가+' style='width: 100px; height: 40px; margin:5px;'/>";
				};
				infoAddMap.addTo(this.map.gMap);
				
				// 지도추가버튼선택
				$("#addMap_" + this.id).find("#addMapBtn").click(function () {
					that.addMap();
				});
				
			};
			
			// 지도삭제 버튼 생성
			this.createRemoveMapBtn = function () {
				var infoRemoveMap = sop.control({
					position : 'bottomright'
				});
				infoRemoveMap.onAdd = function (map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'removeMap_' + that.id);
					that.removeMapBtnObj = this;
					return this._div;
				};
				infoRemoveMap.update = function (props) {
					this._div.innerHTML = "<input type='button' id='removeMapBtn' value='지도삭제-' style='width: 100px; height: 40px; margin:5px;'/>";
				};
				infoRemoveMap.addTo(this.map.gMap);
				
				// 지도삭제버튼
				$("#removeMap_" + this.id).find("#removeMapBtn").click(function () {
					that.removeMap("2");
				});
				
			};
			
			// 원형차트 업데이트
			this.updatePieChart = function (options) {
				var url = "";
				if (options.params.api_id == "API_0301") { // 인구통계총괄
					url = "/ServiceAPI/stats/totalpopulation.json";
				}
				else if (options.params.api_id == "API_0302") { // 인구통계세부조건검색
					url = "/ServiceAPI/stats/searchpopulation.json";
				}
				else if (options.params.api_id == "API_0303") { // 산업체분류검색
					url = "/ServiceAPI/stats/industrycode.json";
				}
				else if (options.params.api_id == "API_0304") { // 사업체분류검색
					url = "/ServiceAPI/stats/company.json";
				}
				else if (options.params.api_id == "API_0305") { // 가구통계검색
					url = "/ServiceAPI/stats/household.json";
				}
				else if (options.params.api_id == "API_0306") { // 주택통계검색
					url = "/ServiceAPI/stats/house.json";
				}
				else if (options.params.api_id == "API_0307") { // 농가통계검색
					url = "/ServiceAPI/stats/farmhousehold.json";
				}
				else if (options.params.api_id == "API_0308") { // 임가통계검색
					url = "/ServiceAPI/stats/forestryhousehold.json";
				}
				else if (options.params.api_id == "API_0309") { // 어가통계검색
					url = "/ServiceAPI/stats/fisheryhousehold.json";
				}
				else if (options.params.api_id == "API_0310") { // 가구원통계검색
					url = "/ServiceAPI/stats/householdmember.json";
				}
				
				var sopPortalPieChartDrawObj = new sop.portal.pieChartDraw.api();
				for ( var i = 0; i < options.params.param.length; i++) {
					sopPortalPieChartDrawObj.addParam(options.params.param[i].key, options.params.param[i].value);
				}
				sopPortalPieChartDrawObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalPieChartDrawObj.request({
					method : "POST",
					async : true,
					url : contextPath + url,
					options : {
						target : this
					}
				});
			};
			
			// 막대차트 업데이트
			this.updateBarChart = function (res) {
				$(this.barChartObj).show();
				var xAxisCat = []; //X축 카테고리
				var retDataList = []; //수치 데이터
				var titleText; //차트 타이틀
				
				if (res.result != undefined) {
					for ( var i = 0; i < res.result.length; i++) {
						var elem = res.result[i];
						
						//읍면동 단위
						if (this.map.curPolygonCode == 4 || this.map.curPolygonCode == 5) {
							xAxisCat.push(elem.adm_cd.substring(6, 13));
						}
						else if (this.map.curPolygonCode < 4) {
							xAxisCat.push(elem.adm_nm);
						}
						
						if (res.id == "API_0301") { //인구통계총괄
							if (res.showData == "tot_ppltn") {
								titleText = "총인구";
								retDataList.push(parseInt(elem.tot_ppltn));
							}
							else if (res.showData == "tot_ppltn_male") {
								titleText = "총인구-남자";
								retDataList.push(parseInt(elem.tot_ppltn_male));
							}
							else if (res.showData == "tot_ppltn_fem") {
								titleText = "총인구-여자";
								retDataList.push(parseInt(elem.tot_ppltn_fem));
							}
							else if (res.showData == "avg_age") {
								titleText = "평균나이(세)";
								retDataList.push(parseInt(elem.avg_age));
							}
							else if (res.showData == "avg_age_male") {
								titleText = "평균나이-남자(세)";
								retDataList.push(parseInt(elem.avg_age_male));
							}
							else if (res.showData == "avg_age_fem") {
								titleText = "평균나이-여자(세)";
								retDataList.push(parseInt(elem.avg_age_fem));
							}
							else if (res.showData == "ppltn_dnsty") {
								titleText = "인구밀도(명/㎢)";
								retDataList.push(parseInt(elem.ppltn_dnsty));
							}
							else if (res.showData == "aged_child_idx") {
								titleText = "노령화지수(%)";
								retDataList.push(parseInt(elem.aged_child_idx));
							}
							else if (res.showData == "oldage_suprt_per") {
								titleText = "노년부양비(%)";
								retDataList.push(parseInt(elem.oldage_suprt_per));
							}
							else if (res.showData == "juv_suprt_per") {
								titleText = "유년부양비(%)";
								retDataList.push(parseInt(elem.juv_suprt_per));
							}
							else if (res.showData == "tot_suprt_per") {
								titleText = "총부양비(%)";
								retDataList.push(parseInt(elem.tot_suprt_per));
							}
							
						}
						else if (res.id == "API_0302") { //인구통계세부조건검색
							titleText = "인구";
							retDataList.push(parseInt(elem.population));
							
						}
						else if (res.id == "API_0304") { //사업체분류검색
							if (res.showData == "tot_worker") {
								titleText = "종사자수(명)";
								retDataList.push(parseInt(elem.tot_worker));
							}
							else if (res.showData == "corp_cnt") {
								titleText = "사업체수";
								retDataList.push(parseInt(elem.corp_cnt));
							}
							
						}
						else if (res.id == "API_0305") { //가구통계검색
							titleText = "가구수";
							retDataList.push(parseInt(elem.household_cnt));
							
						}
						else if (res.id == "API_0306") { //주택통계검색
							titleText = "주택수";
							retDataList.push(parseInt(elem.house_cnt));
							
						}
						else if (res.id == "API_0307") { //농가통계검색
							retDataList.push(parseInt(elem.farm_cnt));
						}
						else if (res.id == "API_0308") { //임가통계검색
							retDataList.push(parseInt(elem.forestry_cnt));
						}
						else if (res.id == "API_0309") { //어가통계검색
							retDataList.push(parseInt(elem.fishery_cnt));
						}
						else if (res.id == "API_0310") { //가구원통계검색
							titleText = "가구원 수";
							retDataList.push(parseInt(elem.population));
						}
					}
				}
				
				$(this.barChartObj).highcharts({
					chart : {
						type : 'column',
						backgroundColor : 'white',
						height : 300,
						width : 450
					},
					title : {
						text : '시각화 차트'
					},
					xAxis : {
						categories : xAxisCat,
						labels : {
			            	rotation: -45,
			            	enabled: true
			            }
					},
					yAxis : {
						min : 0,
						title : {
							text : titleText
						}
					},
					plotOptions : {
						column : {
							pointPadding : 0.2,
							borderWidth : 0
						}
					},
					series : [ {
						name : titleText,
						data : retDataList,
						color : '#2951f2'
					} ]
				});
				
				//툴팁을 없애지 않고 계속 놔둔다.
				var charts = $(this.barChartObj).highcharts();
				charts.tooltip.hide = function () {
				};
				
			};
			
			// 범례 기준값 업데이트
			this.updateLegendRange = function (valPerSlice) {
				this.setLegendRange(valPerSlice);
				if($("#legend_"+that.id).find(".remarkbox").is(":visible")){
					$("#legend_"+that.id).find(".remarkbox").show();
				}else{
					$("#legend_"+that.id).find(".remarkbox").hide();
				}
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
							$("#legend_" + this.id).find("#legendRange" + (i+1)).text(point[i]);
						}
						
					}else {
						var point1 = (point[0] != "") ? appendCommaToNumber(point[0]) : "-";
						var point2 = (point[1] != "") ? appendCommaToNumber(point[1]) : "-";
						var point3 = (point[2] != "") ? appendCommaToNumber(point[2]) : "-";
						var point4 = (point[3] != "") ? appendCommaToNumber(point[3]) : "-";
						
						$("#legend_" + this.id).find("#legendRange1").text("< " + point1);
						$("#legend_" + this.id).find("#legendRange2").text(point1 + " to < " + point2);
						$("#legend_" + this.id).find("#legendRange3").text(point2 + " to < " + point3);
						$("#legend_" + this.id).find("#legendRange4").text(point3 + " to < " + point4);
						$("#legend_" + this.id).find("#legendRange5").text(point4 + "+");
					}
					
				}else {
					$("#legendColor_"+this.id).find("#selectEvenLegend").hide();
					
					$("#legend_" + this.id).find("#legendRange1").text("20% 이하");
					$("#legend_" + this.id).find("#legendRange2").text("40% 이하");
					$("#legend_" + this.id).find("#legendRange3").text("60% 이하");
					$("#legend_" + this.id).find("#legendRange4").text("80% 이하");
					$("#legend_" + this.id).find("#legendRange5").text("100% 이하");
				}
				
				
				$("#legendColor1_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor2_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor3_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor4_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor5_" + this.id).parent().css("background-color", "#fff");
				
				
			};
			
			this.updateLegendRangeKosis = function (res) {
				var retDataList = []; // 수치 데이터
				
				for ( var i = 0; i < res.length; i++) {
					retDataList.push(parseInt(res[i].DATA));
				}
				
				var tmpData = new Array();
				tmpData.push(retDataList);
				var valPerSlice = that.map.calculateLegend(tmpData);
				var point = valPerSlice[0];
				console.log(point);
				var point1 = (point[0] != "") ? appendCommaToNumber(point[0]) : "-";
				var point2 = (point[1] != "") ? appendCommaToNumber(point[1]) : "-";
				var point3 = (point[2] != "") ? appendCommaToNumber(point[2]) : "-";
				var point4 = (point[3] != "") ? appendCommaToNumber(point[3]) : "-";
				
				$("#legend_" + this.id).find("#legendRange1").text("< " + point1);
				$("#legend_" + this.id).find("#legendRange2").text(point1 + " to < " + point2);
				$("#legend_" + this.id).find("#legendRange3").text(point2 + " to < " + point3);
				$("#legend_" + this.id).find("#legendRange4").text(point3 + " to < " + point4);
				$("#legend_" + this.id).find("#legendRange5").text(point4 + "+");
				
				$("#legendColor1_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor2_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor3_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor4_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor5_" + this.id).parent().css("background-color", "#fff");
			};
			
			// 시계열 업데이트
			this.updateTimeSeries = function (options) {
				var date = new Date();
				var maxYear = date.getFullYear(); // 최신년도를 maxYear로 잡는다.
				var isMap1ContentShow = $("#mapContent_1").is(":visible"); // 첫번째
				// 화면
				// (true,
				// false)
				var isMap2ContentShow = $("#mapContent_2").is(":visible"); // 두번째
				// 화면
				// (true,
				// false)
				var viewMaxYear = "";
				var viewMaxYearAdd = "";
				
				if (options.params.maxYear != undefined && options.params.maxYear.length > 0) {
					maxYear = options.params.maxYear;
				}
				
				var html1 = "";
				html1 += "					<tr>";
				for ( var year = 2000; year < date.getFullYear(); year++) {
					if (isMap1ContentShow) { // 첫번째맵:true
						html1 += "					<td id='tdYear" + year + "' style='color: #ebe8eb;'>" + year + "</td>";
					}
				}
				html1 += "					</tr>";
				
				var htmlYear = "";
				htmlYear += "					<tr>";
				for ( var year = 2000; year < date.getFullYear(); year++) {
					htmlYear += "					<td><div id='divYear" + year + "' style='width: 10px; height: 10px; background-color: #ebe8eb; margin: auto;'></div></td>";
				}
				htmlYear += "					</tr>";
				
				// 두번째맵:true 일 경우
				var html2 = "";
				if (isMap2ContentShow) {
					html2 += "					<tr>";
					for ( var year = 2000; year < date.getFullYear(); year++) {
						html2 += "					<td id='tdYearAdd" + year + "' style='color: #ebe8eb;'>" + year + "</td>";
					}
					html2 += "					</tr>";
				}
				if (isMap1ContentShow && this.map.id == "0") { // 첫번째맵:true
					$("#tableTimeSeries1").empty();
					$("#tableTimeSeries1").html(html1);
					that.firstYearArray = new Array();
				}
				if (isMap2ContentShow && this.map.id == "1") { // 두번째맵:true
					$("#tableTimeSeries2").empty();
					$("#tableTimeSeries2").html(html2);
					// that.secondYearArray = new Array();
				}
				$("#tableTimeSeriesYear").empty();
				$("#tableTimeSeriesYear").html(htmlYear);
				
				// 사업체일 경우 1년단위
				if (options.params.api_id == "API_0304") {
					for ( var year = 2000; year <= maxYear; year++) {
						if (isMap1ContentShow && this.map.id == "0") { // 첫번째맵:true
							viewMaxYear = year;
							$("#tdYear" + year).css({
								color : "#000",
								cursor : "pointer"
							});
							that.firstYearArray.push($("#tdYear" + year).text());
							$("#tdYear" + year).on('click', function () {
								that.selectTimeSeries(options, $(this));
							});
						}
						if (isMap2ContentShow && this.map.id == "1") { // 두번째맵:true
							viewMaxYearAdd = year;
							that.secondYearArray.push($("#tdYearAdd" + year).text());
							$("#tdYearAdd" + year).css({
								color : "#000",
								cursor : "pointer"
							});
							$("#tdYearAdd" + year).on('click', function () {
								that.selectTimeSeries(options, $(this));
							});
						}
					}
				}
				else { // 나머지는 5년단위
					for ( var year = 2000; year < date.getFullYear(); year++) {
						if (isMap1ContentShow && this.map.id == "0") { // 첫번째맵:true
							$("#tdYear" + year).css({
								color : "#ebe8eb",
								cursor : ""
							});
						}
						if (isMap2ContentShow && this.map.id == "1") { // 두번째맵:true
							$("#tdYearAdd" + year).css({
								color : "#ebe8eb",
								cursor : ""
							});
						}
						
						if ((year % 5) == 0) {
							if (year <= maxYear) {
								if (isMap1ContentShow && this.map.id == "0") { // 첫번째맵:true
									viewMaxYear = year;
									that.firstYearArray.push($("#tdYear" + year).text());
									$("#tdYear" + year).css({
										color : "#000",
										cursor : "pointer"
									});
									$("#tdYear" + year).on('click', function () {
										that.selectTimeSeries(options, $(this));
									});
								}
								if (isMap2ContentShow && this.map.id == "1") { // 두번째맵:true
									viewMaxYearAdd = year;
									that.secondYearArray.push($("#tdYearAdd" + year).text());
									$("#tdYearAdd" + year).css({
										color : "#000",
										cursor : "pointer"
									});
									$("#tdYearAdd" + year).on('click', function () {
										that.selectTimeSeries(options, $(this));
									});
								}
							}
						}
					}
				}
				
				// 첫 검색일 경우
				if (that.timeSeriesYear == undefined || that.timeSeriesYear == "") {
					if (isMap1ContentShow) { // 첫번째맵:true
						$("#tdYear" + viewMaxYear).css("color", "#006fff");
						$("#divYear" + viewMaxYear).css("background-color", "#006fff");
					}
					that.timeSeriesYear = viewMaxYear;
				}
				else { // 시계열 선택일 경우
					if (isMap1ContentShow) { // 첫번째맵:true
						$("#tdYear" + that.timeSeriesYear).css("color", "#006fff");
						$("#divYear" + that.timeSeriesYear).css("background-color", "#006fff");
					}
				}
				
				// 첫 검색일 경우
				if (that.timeSeriesYearAdd == undefined || that.timeSeriesYearAdd == "") {
					if (isMap2ContentShow) { // 두번째맵:true
						$("#tdYearAdd" + viewMaxYearAdd).css("color", "#05f555");
						$("#divYear" + viewMaxYearAdd).css("background-color", "#05f555");
					}
					that.timeSeriesYearAdd = viewMaxYearAdd;
				}
				else { // 시계열 선택일 경우
					if (isMap2ContentShow) { // 두번째맵:true
						$("#tdYearAdd" + that.timeSeriesYearAdd).css("color", "#05f555");
						$("#divYear" + that.timeSeriesYearAdd).css("background-color", "#05f555");
					}
				}
				
				// console.log("viewMaxYear => "+viewMaxYear+" viewMaxYearAdd =>
				// "+viewMaxYearAdd);
				// console.log("that.timeSeriesYear => "+that.timeSeriesYear+"
				// that.timeSeriesYearAdd => "+that.timeSeriesYearAdd);
				
				// 첫번째 맵 년도와 두번째 년도가 같을 경우
				if ($("#tdYear" + that.timeSeriesYear).css("color") == "#006fff" && $("#tdYearAdd" + that.timeSeriesYear).css("color") == "#05f555") {
					$("#divYear" + that.timeSeriesYear).css("background-color", "#f5e905");
				}
				else if ($("#tdYear" + that.timeSeriesYearAdd).css("color") == "#006fff" && $("#tdYearAdd" + that.timeSeriesYearAdd).css("color") == "#05f555") {
					$("#divYear" + that.timeSeriesYearAdd).css("background-color", "#f5e905");
				}
				
				$("#timeSeriesDiv").show();
			};
			
			// 시계열 년도 선택 시 조회
			this.selectTimeSeries = function (options, yearObj) {
				if (this.firstYearArray.length != this.timeSeriesPushData.length) {
					if (this.map.id == "0") {
						that.timeSeriesYear = $(yearObj).text();
					}
					else if (this.map.id == "1") {
						that.timeSeriesYearAdd = $(yearObj).text();
					}
					
					// share정보 초기화
					this.delegate.curMapId = map.id;
					this.delegate.shareUrlInfo = [];
					
					for ( var i = 0; i < options.params.param.length; i++) {
						if (options.params.param[i].key == "year") {
							options.params.param[i].value = $(yearObj).text();
						}
					}
					
					options.params["view_type"] = "TS";
					if ($("#timeSeriesPlayBtn").html() == "■") { // 애니메이션이
						// 실행중일 경우
						options.params["isTimeSeriesYn"] = "Y";
					}
					this.delegate.requestOpenApi(options.params);
				}
			}

			// 시계열 애니메이션이 끝까지 돌았는지 확인
			this.doReqTimeSeries = function () {
				if (this.firstYearArray.length > 0) {
					if (this.timeSeriesCnt == this.firstYearArray.length) {
						this.isTimeSeriesPlay = false;
						that.timer = setInterval(this.timerSeriesPlay, 2000);
						this.timeSeriesCnt = 0;
						return;
					}
					$("#tdYear" + this.firstYearArray[this.timeSeriesCnt]).click();
					this.timeSeriesCnt++;
				}
			},

			// 시계열 애니메이션 플레이
			this.timerSeriesPlay = function () {
				that.map.isDrop = true;
				that.map.undoDropLayerBounds();
				// console.log(that.timeSeriesPushData);
				// console.log(that.firstYearArray.length + " " +
				// that.timeSeriesPushData.length);
				// if(that.firstYearArray.length ==
				// that.timeSeriesPushData.length) {
				for ( var i = 0; i < that.firstYearArray.length; i++) {
					if (that.timeSeriesYear == that.firstYearArray[i]) {
						if ((i + 1) == that.firstYearArray.length) {
							that.timeSeriesYear = that.firstYearArray[0];
							$interactiveMapApi.request.setStatsData(that.timeSeriesPushData[0].res, that.timeSeriesPushData[0].options);
						}
						else {
							that.timeSeriesYear = that.firstYearArray[i + 1];
							$interactiveMapApi.request.setStatsData(that.timeSeriesPushData[i + 1].res, that.timeSeriesPushData[i + 1].options);
						}
						break;
					}
				}
				// }
			};
			
			// 시계열 애니메이션에서 검색값이 없을 경우
			this.emptyTimerBaseInsert = function (res, options) {
				if (this.isTimeSeriesPlay) {
					that.timeSeriesPushData.push({
						"res" : res,
						"options" : options
					});
					
					if (this.timeSeriesCnt == this.firstYearArray.length) {
						this.isTimeSeriesPlay = false;
						that.timer = setInterval(this.timerSeriesPlay, 2000);
						this.timeSeriesCnt = 0;
						return;
					}
					
					that.doReqTimeSeries();
				}
			};
			
			// 경계 선택 시 차트에서 해당하는 값을 하이라이트
			this.selectChartData = function (properties) {
				var charts = $(this.barChartObj).highcharts();
				var adm_cd = properties.adm_cd;
				var ssaArray = properties.adm_nm.split(" ");
				
				if (charts != undefined) {
					if (adm_cd.length == 13) { // 집계구
						for ( var i = 0; i < charts.xAxis[0].categories.length; i++) {
							if (adm_cd.substring(6, 13) == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({
									color : '#fe5800'
								});
								charts.tooltip.refresh(charts.series[0].data[i]);
							}
							else {
								charts.series[0].data[i].update({
									color : '#2951f2'
								});
							}
						}
					}
					else if (ssaArray.length == 3) { // 읍면동
						for ( var i = 0; i < charts.xAxis[0].categories.length; i++) {
							if (ssaArray[2] == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({
									color : '#fe5800'
								});
								charts.tooltip.refresh(charts.series[0].data[i]);
							}
							else {
								charts.series[0].data[i].update({
									color : '#2951f2'
								});
							}
						}
					}
					else if (ssaArray.length == 2) { // 시군구
						for ( var i = 0; i < charts.xAxis[0].categories.length; i++) {
							if (ssaArray[1] == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({
									color : '#fe5800'
								});
								charts.tooltip.refresh(charts.series[0].data[i]);
							}
							else {
								charts.series[0].data[i].update({
									color : '#2951f2'
								});
							}
						}
					}
					else if (ssaArray.length == 1) { // 시도
						for ( var i = 0; i < charts.xAxis[0].categories.length; i++) {
							if (ssaArray[0] == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({
									color : '#fe5800'
								});
								charts.tooltip.refresh(charts.series[0].data[i]);
							}
							else {
								charts.series[0].data[i].update({
									color : '#2951f2'
								});
							}
						}
					}
				}
			};
			
			// 경계 선택 시 범례에서 해당하는 값을 하이라이트
			this.selectLegendRangeData = function (fillColor) {
				$("#legendColor1_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor2_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor3_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor4_" + this.id).parent().css("background-color", "#fff");
				$("#legendColor5_" + this.id).parent().css("background-color", "#fff");
				
				if (this.legendColor1 == fillColor) {
					$("#legendColor1_" + this.id).parent().css("background-color", "#fa9696");
				}
				else if (this.legendColor2 == fillColor) {
					$("#legendColor2_" + this.id).parent().css("background-color", "#fa9696");
				}
				else if (this.legendColor3 == fillColor) {
					$("#legendColor3_" + this.id).parent().css("background-color", "#fa9696");
				}
				else if (this.legendColor4 == fillColor) {
					$("#legendColor4_" + this.id).parent().css("background-color", "#fa9696");
				}
				else if (this.legendColor5 == fillColor) {
					$("#legendColor5_" + this.id).parent().css("background-color", "#fa9696");
				}
			};
			
			// 맵 이동 시 시도/시군구/읍면동 셀렉트박스 변경
			this.reverseOnSelectChange = function () {
				var sopPortalAllAddressObj = new sop.portal.allAddress.api();
				sopPortalAllAddressObj.addParam("sido_cd", this.map.curSidoCd);
				sopPortalAllAddressObj.addParam("sgg_cd", this.map.curSiggCd);
				sopPortalAllAddressObj.addParam("dong_cd", this.map.curDongCd);
				sopPortalAllAddressObj.addParam("base_year", this.map.bnd_year);
				sopPortalAllAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/allAddressList.json",
					options : {
						target : this
					}
				});
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
				
				$(".colpick").css("z-index", 6000);
				$(".colpick").css("z-index", 6000);
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
				} else {
					that.map.legendType = "equal";
				}
				
				if (that.map.legendType == 'equal') {
					that.map.valPerSlice = that.map.legendValue.equal;
				}
				else if (that.map.legendType == 'auto') {
					that.map.valPerSlice = that.map.legendValue.auto;
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
			
			// 전국 지도보기
			this.allCountrySet = function () {
				this.map.mapMove([ "957082", "1856829" ], 1);
				
			};
			
			// 시도 검색
			this.sidoSelectSet = function () {
				var sopPortalSidoObj = new sop.portal.sido.api();
				sopPortalSidoObj.addParam("base_year", this.delegate.bnd_year);
				sopPortalSidoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/map/sidoAddressList.json",
					options : {
						target : this
					}
				});
			};
			
			// 시군구 검색 Start
			this.sggSelectSet = function (sido_cd) {
				var sidoArray = sido_cd.split("/");
				// 지도 위치 이동
				this.map.mapMove([ sidoArray[1], sidoArray[2] ], /* 5 */3);
				// 오픈API 호출
				this.map.curSidoCd = sidoArray[0];
				this.map.curSiggCd = null;
				this.map.curDongCd = null;
				var sopPortalSggObj = new sop.portal.sgg.api();
				sopPortalSggObj.addParam("sido_cd", sidoArray[0]);
				sopPortalSggObj.addParam("base_year", this.map.bnd_year);
				sopPortalSggObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/map/sggAddressList.json",
					options : {
						target : this
					}
				});
			};
			
			// 읍면동 검색
			this.admSelectSet = function (sgg_cd) {
				var sidoArray = $("#navi_" + this.id).find("#sidoSelect").val().split("/");
				var sggArray = sgg_cd.split("/");
				if (sgg_cd == "") {
					$("#navi_" + this.id).find("#admSelect").empty();
					$("#navi_" + this.id).find("#admSelect").html("<option value=''>동/읍면 선택</option>");
				}
				else {
					
					// 지도 위치 이동
					this.map.mapMove([ sggArray[1], sggArray[2] ], /* 7 */6);
					this.map.curSidoCd = sidoArray[0];
					this.map.curSiggCd = sggArray[0];
					this.map.curDongCd = null;
					
					var sopPortalAdmObj = new sop.portal.adm.api();
					sopPortalAdmObj.addParam("sido_cd", sidoArray[0]);
					sopPortalAdmObj.addParam("sgg_cd", sggArray[0]);
					sopPortalAdmObj.addParam("base_year", this.map.bnd_year);
					sopPortalAdmObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/map/admAddressList.json",
						options : {
							target : this
						}
					});
				}
			};
			
			// 읍면동 셀렉트박스 변경 시
			this.admOnchange = function (adm_cd) {
				var sidoArray = $("#navi_" + this.id).find("#sidoSelect").val().split("/");
				var sggArray = $("#navi_" + this.id).find("#sggSelect").val().split("/");
				var admArray = adm_cd.split("/");
				if (adm_cd != "") {
					// 지도 위치 이동
					this.map.mapMove([ admArray[1], admArray[2] ], /* 9 */10);
					this.map.curSidoCd = sidoArray[0];
					this.map.curSiggCd = sggArray[0];
					this.map.curDongCd = admArray[0];
				}
			};
			
			// 지도 추가
			this.addMap = function () {
				if (this.delegate && this.delegate.addMap instanceof Function) {
					this.delegate.addMap();
				}
			};
			
			// 지도 삭제
			this.removeMap = function (num) {
				if (this.delegate && this.delegate.addMap instanceof Function) {
					this.delegate.removeMap(num);
				}
				
			};
			
			//범례 기준값 초기화
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
				
				$(that.pieChartObj).hide();
				$(that.barChartObj).hide();
				$(that.timeSeriesObj).hide();
				$("#legendColor_"+that.id).find(".remarks_option").hide();
				$('#legendColor_'+that.id).find('.color-box').colpick().colpickHide();
				$('#legendColor_'+that.id).find('.color-box2').colpick().colpickHide();
				that.resetTimeSeries();
				that.lastChatIndex != null;
			};
			
			// 선택된 시계열 변수값 초기화
			this.timeSeriesVarReset = function () {
				var date = new Date();
				if (this.map.id == "0") {
					that.timeSeriesYear = "";
				}
				else if (this.map.id == "1") {
					that.timeSeriesYearAdd = "";
				}
			}
		},
	
	};
	
	/** ********* 시도 검색 Start ********* */
	(function () {
		$class("sop.portal.sido.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var html = "";
					for ( var i = 0; i < result.sidoList.length; i++) {
						var elem = result.sidoList[i];
						html += "<option value=\"" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sido_nm + "</option>";
					}
					$("#navi_" + that.id).find("#sidoSelect").empty();
					$("#navi_" + that.id).find("#sidoSelect").html(html);
					
					that.sggSelectSet($("#navi_" + that.id).find("#sidoSelect").val());
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 시도 검색 End ********* */
	
	/** ********* 시군구 검색 Start ********* */
	(function () {
		$class("sop.portal.sgg.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var html = "";
					html += "<option value=''>구/군 선택</option>";
					for ( var i = 0; i < result.sggList.length; i++) {
						var elem = result.sggList[i];
						html += "<option value=\"" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sgg_nm + "</option>";
						
					}
					$("#navi_" + that.id).find("#sggSelect").empty();
					$("#navi_" + that.id).find("#sggSelect").html(html);
					
					$("#navi_" + that.id).find("#admSelect").empty();
					$("#navi_" + that.id).find("#admSelect").html("<option value=''>동/읍면 선택</option>");
					
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 시군구 검색 End ********* */
	
	/** ********* 읍면동 검색 Start ********* */
	(function () {
		$class("sop.portal.adm.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var html = "";
					var x_coor = "";
					var y_coor = "";
					html += "<option value=''>동/읍면 선택</option>";
					console.log("res", res);
					for ( var i = 0; i < result.admList.length; i++) {
						var elem = result.admList[i];
						html += "<option value=\"" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.emdong_nm + "</option>";
						
					}
					$("#navi_" + that.id).find("#admSelect").empty();
					$("#navi_" + that.id).find("#admSelect").html(html);
					
					// 첫화면은 특정지역
					if (that.firstBoolean) {
						that.firstBoolean = false;
					}
					
				}
				else { 
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 읍면동 검색 End ********* */
	
	/** ********* 시도/시군구/읍면동 일괄 검색 Start ********* */
	(function () {
		$class("sop.portal.allAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var html = "";
					
					// 시도 생성
					for ( var i = 0; i < result.sidoList.length; i++) {
						var elem = result.sidoList[i];
						if (elem.sido_cd == result.sido_cd) {
							html += "<option selected='selected' value=\"" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sido_nm + "</option>";
						}
						else {
							html += "<option value=\"" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sido_nm + "</option>";
						}
					}
					$("#navi_" + that.id).find("#sidoSelect").empty();
					$("#navi_" + that.id).find("#sidoSelect").html(html);
					
					// 시군구 생성
					html = "";
					html += "<option value=''>구/군 선택</option>";
					// if(that.map.curPolygonCode >= 2) {
					for ( var i = 0; i < result.sggList.length; i++) {
						var elem = result.sggList[i];
						if (elem.sgg_cd == result.sgg_cd) {
							html += "<option selected='selected' value=\"" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sgg_nm + "</option>";
						}
						else {
							html += "<option value=\"" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.sgg_nm + "</option>";
						}
					}
					// }
					$("#navi_" + that.id).find("#sggSelect").empty();
					$("#navi_" + that.id).find("#sggSelect").html(html);
					
					// 읍면동 생성
					html = "";
					html += "<option value=''>동/읍면 선택</option>";
					// if(that.map.curPolygonCode >= 4) {
					for ( var i = 0; i < result.admList.length; i++) {
						var elem = result.admList[i];
						if (elem.emdong_cd == result.dong_cd) {
							html += "<option selected='selected' value=\"" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.emdong_nm + "</option>";
						}
						else {
							html += "<option value=\"" + elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor + "\">" + elem.emdong_nm + "</option>";
						}
					}
					// }
					$("#navi_" + that.id).find("#admSelect").empty();
					$("#navi_" + that.id).find("#admSelect").html(html);
					
					that.map.curSidoCd = result.sido_cd;
					that.map.curSiggCd = result.sgg_cd;
					that.map.curDongCd = result.dong_cd;
					
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 시도/시군구/읍면동 일괄 검색 End ********* */
	
	/** ********* 원형차트 레벨별 표출 Start ********* */
	(function () {
		$class("sop.portal.pieChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var that = options.target;
				if (res.errCd == "0") {
					var top = eval(result[0].top);
					var middle = eval(result[0].middle);
					var bottom = eval(result[0].bottom);
					console.log(res);
					if (top == undefined) {
						top = 0;
					}
					if (middle == undefined) {
						middle = 0;
					}
					if (bottom == undefined) {
						bottom = 0;
					}
					
					if (res.id == "API_0301") { // 인구통계총괄
						if (res.showData == "tot_ppltn") {
							retDataList.push(parseInt(elem.tot_ppltn));
						}
						else if (res.showData == "tot_ppltn_male") {
							retDataList.push(parseInt(elem.tot_ppltn_male));
						}
						else if (res.showData == "tot_ppltn_fem") {
							retDataList.push(parseInt(elem.tot_ppltn_fem));
						}
						else if (res.showData == "avg_age") {
							retDataList.push(parseInt(elem.avg_age));
						}
						else if (res.showData == "avg_age_male") {
							retDataList.push(parseInt(elem.avg_age_male));
						}
						else if (res.showData == "avg_age_fem") {
							titleText = "평균나이-여자(세)";
							retDataList.push(parseInt(elem.avg_age_fem));
						}
						else if (res.showData == "ppltn_dnsty") {
							titleText = "인구밀도(명/㎢)";
							retDataList.push(parseInt(elem.ppltn_dnsty));
						}
						else if (res.showData == "aged_child_idx") {
							titleText = "노령화지수(%)";
							retDataList.push(parseInt(elem.aged_child_idx));
						}
						else if (res.showData == "oldage_suprt_per") {
							titleText = "노년부양비(%)";
							retDataList.push(parseInt(elem.oldage_suprt_per));
						}
						else if (res.showData == "juv_suprt_per") {
							titleText = "유년부양비(%)";
							retDataList.push(parseInt(elem.juv_suprt_per));
						}
						else if (res.showData == "tot_suprt_per") {
							titleText = "총부양비(%)";
							retDataList.push(parseInt(elem.tot_suprt_per));
						}
						
					}
					else if (res.id == "API_0302") { // 인구통계세부조건검색
						titleText = "인구";
						retDataList.push(parseInt(elem.population));
						
					}
					else if (res.id == "API_0304") { // 사업체분류검색
						if (res.showData == "tot_worker") {
							titleText = "종사자수(명)";
							retDataList.push(parseInt(elem.tot_worker));
						}
						else if (res.showData == "corp_cnt") {
							titleText = "사업체수";
							retDataList.push(parseInt(elem.corp_cnt));
						}
						
					}
					else if (res.id == "API_4003") { // 가구통계검색
						$("#pieCountDiv").html("<font size='5'>" + appendCommaToNumber(result[0].household_cnt) + "</font>");
						
					}
					else if (res.id == "API_0306") { // 주택통계검색
						titleText = "주택수";
						retDataList.push(parseInt(elem.house_cnt));
						
					}
					else if (res.id == "API_0307") { // 농가통계검색
						retDataList.push(parseInt(elem.farm_cnt));
					}
					else if (res.id == "API_0308") { // 임가통계검색
						retDataList.push(parseInt(elem.forestry_cnt));
					}
					else if (res.id == "API_0309") { // 어가통계검색
						retDataList.push(parseInt(elem.fishery_cnt));
					}
					else if (res.id == "API_0310") { // 가구원통계검색
						titleText = "가구원 수";
						retDataList.push(parseInt(elem.population));
					}
					
					$("#pieChart_" + that.id).show();
					
					if ($d.browser.ie8) { // 익스플로러 8일 경우 막대차트로
						$("#pieChart_" + that.id).find("#pieChartDiv1").highcharts({
							chart : {
								type : 'column',
								backgroundColor : 'white',
								height : 220,
								width : 220
							},
							title : {
								text : '시각화 차트'
							},
							xAxis : {
								categories : [ '차상위', '상위', '지역' ],
							},
							yAxis : {
								min : 0,
								title : {
									text : '비율'
								}
							},
							tooltip : {
								shared : true,
								formatter : function () {
									var s = '';
									$.each(this.points, function (i, point) {
										if (i > 0) {
											s += '<span style="color:' + point.series.color + '">' + point.series.name + '</span>: <b>' + point.y + '</b><br/>';
										}
									});
									return s;
								}
							},
							plotOptions : {
								column : {
									stacking : 'percent'
								}
							},
							legend : {
								enabled : false
							},
							series : [ {
								name : '',
								color : '#d0d0d0',
								data : [ 100 - top, 100 - middle, 100 - bottom ]
							}, {
								name : '차상위',
								color : '#c95236',
								data : [ top, 0, 0 ]
							}, {
								name : '상위',
								color : '#3677bb',
								data : [ 0, middle, 0 ]
							}, {
								name : '지역',
								color : '#41b66e',
								data : [ 0, 0, bottom ]
							} ]
						});
					}
					else {
						// 원형차트1
						$("#pieChart_" + that.id).find("#pieChartDiv1").highcharts({
							// chart: { backgroundColor:"transparent",
							// borderWidth:0, margin: [0, 0, 0, 0], height: 220,
							// width: 220 },
							chart : {
								backgroundColor : "#fff",
								borderWidth : 0,
								margin : [ 0, 0, 0, 0 ],
								height : 220,
								width : 220
							},
							colors : [ '#c95236', '#d0d0d0' ],
							navigation : {
								buttonOptions : {
									enabled : false
								}
							},
							tooltip : {
								enabled : false
							},
							title : {
								text : ''
							},
							plotOptions : {
								pie : {
									dataLabels : {
										enabled : true,
										distance : -50,
										style : {
											fontWeight : 'bold',
											color : 'white',
											textShadow : '0px 1px 2px black'
										}
									},
									startAngle : 0,
									endAngle : 360,
									center : [ '50%', '50%' ],
									borderWidth : 0
								}
							},
							series : [ {
								type : 'pie',
								name : '차상위',
								innerSize : '91%',
								data : [ [ '비율', top ], [ '전체', 100 - top ] ],
								dataLabels : {
									enabled : true,
									rotation : -45,
									color : '#333333',
									align : 'right',
									x : -4004,
									y : 20,
									style : {
										fontSize : '15px',
										fontWeight : 'normal'
									}
								}
							} ]
						});
						
						// 원형차트2
						$("#pieChart_" + that.id).find('#pieChartDiv2').highcharts({
							chart : {
								backgroundColor : "transparent",
								borderWidth : 0,
								margin : [ 0, 0, 0, 0 ],
								height : 180,
								width : 180
							},
							// chart: { backgroundColor:"#fff", borderWidth:0,
							// margin: [0, 0, 0, 0], height: 180, width: 180 },
							colors : [ '#3677bb', '#d0d0d0' ],
							tooltip : {
								enabled : false
							},
							navigation : {
								buttonOptions : {
									enabled : false
								}
							},
							title : {
								text : ''
							},
							plotOptions : {
								pie : {
									dataLabels : {
										enabled : true,
										distance : -50,
										style : {
											fontWeight : 'bold',
											color : 'white',
											textShadow : '0px 1px 2px black'
										}
									},
									startAngle : 0,
									endAngle : 360,
									center : [ '50%', '50%' ],
									borderWidth : 0
								}
							},
							series : [ {
								type : 'pie',
								name : '상위',
								innerSize : '91%',
								data : [ [ '비율', middle ], [ '전체', 100 - middle ] ],
								dataLabels : {
									enabled : true,
									rotation : -45,
									color : '#333333',
									align : 'right',
									x : -4004,
									y : 20,
									style : {
										fontSize : '15px',
										fontWeight : 'normal'
									}
								}
							} ]
						});
						
						// 원형차트3
						$("#pieChart_" + that.id).find('#pieChartDiv3').highcharts({
							chart : {
								backgroundColor : "transparent",
								borderWidth : 0,
								margin : [ 0, 0, 0, 0 ],
								height : 140,
								width : 140
							},
							// chart: { backgroundColor:"#fff", borderWidth:0,
							// margin: [0, 0, 0, 0], height: 140, width: 140},
							colors : [ '#41b66e', '#d0d0d0' ],
							tooltip : {
								enabled : false
							},
							navigation : {
								buttonOptions : {
									enabled : false
								}
							},
							title : {
								text : ''
							},
							plotOptions : {
								pie : {
									dataLabels : {
										enabled : true,
										distance : -50,
										style : {
											fontWeight : 'bold',
											color : 'white',
											textShadow : '0px 1px 2px black'
										}
									},
									startAngle : 0,
									endAngle : 360,
									center : [ '50%', '50%' ],
									borderWidth : 0
								}
							},
							series : [ {
								type : 'pie',
								name : '해당지역',
								innerSize : '91%',
								data : [ [ '비율', bottom ], [ '전체', 100 - bottom ] ],
								dataLabels : {
									enabled : true,
									rotation : -45,
									color : '#333333',
									align : 'right',
									x : -4004,
									y : 20,
									style : {
										fontSize : '15px',
										fontWeight : 'normal'
									}
								}
							} ]
						});
					}
					
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 원형차트 레벨별 표출 End ********* */
	
}(window, document));