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
			this.firstBoolean = false; // 처음로딩 여부
			this.firstValue = ""; // 처음로딩 임시 저장값
			this.firstSggCd = ""; // 처음로딩 좌표(시군구)
			this.firstAdmCd = ""; // 처음로딩 좌표(읍면동)
			this.barChartObj = null; // 막대차트 Object
			this.legendObj = null; // 범례 Object
			this.legendColor1 = "#ffddd7";								// 범례 색상1
			this.legendColor2 = "#ffb2a5";								// 범례 색상2
			this.legendColor3 = "#ff806c";								// 범례 색상3
			this.legendColor4 = "#ff593f";								// 범례 색상4
			this.legendColor5 = "#ff2400";	
			
			this.initialize = function (delegate) {
				// 현재 범례를 변수에 저장
				var tmpColors = [ this.legendColor1, this.legendColor2, this.legendColor3, this.legendColor4, this.legendColor5 ];
				
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
					$(top.document).find(".Btn_Top>nav>.Btn_Top4").removeClass("M_on");
					if($("#legend_"+that.id).find(".remarkbox").is(":visible")){
						$("#legendColor_"+that.id).find(".remarks_option").hide();
						$('#legendColor_'+that.id).find('.color-box').colpick().colpickHide();
						$('#legendColor_'+that.id).find('.color-box2').colpick().colpickHide();
						$(top.document).find(".Btn_Top>nav>.Btn_Top3").removeClass("M_on");
						$(top.document).find(".Btn_Top>nav>.Btn_Top2").addClass("M_on");
					}
					else{
						$(top.document).find(".Btn_Top>nav>.Btn_Top3").addClass("M_on");
						$(top.document).find(".Btn_Top>nav>.Btn_Top2").removeClass("M_on");
						$(top.document).find("#chart-area").hide();
						$(top.document).find(".Map").show();
					}
					if($(top.document).find("#chart-area").is(":visible")){
						$(top.document).find("#chart-area").hide();
						$(top.document).find(".Map").show();
						$(top.document).find(".Btn_Top>nav>.Btn_Top3").addClass("M_on");
						$(top.document).find(".Btn_Top>nav>.Btn_Top2").removeClass("M_on");
						$(top.document).find("#legend_"+that.id).find(".remarkbox").show();
						console.log($("#legend_"+that.id).find(".remarkbox"));
					}
					else{
						$("#legend_"+that.id).find(".remarkbox").toggle();
					}
					top.window.setRemarkBoxListSize();
				});
				
				//범례/차트/표 지우기
				$(top.document).find(".Btn_Top>nav>.Btn_Top2").click(function(){
					$(top.document).find(".Btn_Top>nav>.Btn_Top3").removeClass("M_on");
					$(top.document).find(".Btn_Top>nav>.Btn_Top4").removeClass("M_on");
					$(top.document).find(".Btn_Top>nav>.Btn_Top2").addClass("M_on");
				    $("#legend_"+that.id).find(".remarkbox").hide();
				    $(top.document).find("#chart-area").hide();
					$(top.document).find(".Map").show();
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
			
			//막대차트 추가
			this.createBarChart = function(_position) {
				var chartHeight = $(window).outerHeight(true)>400?($(window).outerHeight(true)-206):$(window).outerHeight(true);
				$(top.document).find("#barchart-area").html(
					"<div id='barChart_"+that.id+"' style='width:100%;'>"+
						"<div class='graphbox_bar' style='width:100%;'>" +
							"<div class='graphbox_in'>" +
								"<p class='graph_txt' title=\"\"></p>" +
								"<div class='graph'>" +
									"<div id='container_graph_bar' style='width:100%;height:"+(chartHeight-37)+"px;'>" +
									"</div>" +
								"</div>" +
							"</div>" +
							"<div id='graphbox_in_link'></div>" +
						"</div>" +
					"</div>"
				);
				
				// image rollover
				$(top.document).find("#barChart_"+this.id).find("img.rollover").hover( 
					function() { this.src = this.src.replace("_off", "_on"); 
					}, 
					function() { this.src = this.src.replace("_on", "_off"); 
				});
				
				//graph layer
				$(top.document).find(".Btn_Top>nav>.Btn_Top4").removeClass("NoneAction");
				$(top.document).find(".Btn_Top>nav>.Btn_Top4").click(function(){
					$(top.document).find(".Btn_Top>nav>.Btn_Top2").removeClass("M_on");
					$(top.document).find(".Btn_Top>nav>.Btn_Top3").removeClass("M_on");
					if($(top.document).find("#chart-area").is(":visible")){
						$(top.document).find(".Btn_Top>nav>.Btn_Top4").removeClass("M_on");
						$(top.document).find(".Map").show();
						$(top.document).find("#chart-area").hide();
					if($("#legend_"+that.id).find(".remarkbox").is(":visible")){
						$(top.document).find(".Btn_Top>nav>.Btn_Top3").addClass("M_on");
						$(top.document).find(".Btn_Top>nav>.Btn_Top2").removeClass("M_on");
					}
					else{
						$(top.document).find(".Btn_Top>nav>.Btn_Top2").addClass("M_on");
					}
					}else{
						$(top.document).find(".Btn_Top>nav>.Btn_Top4").addClass("M_on");
						$(top.document).find(".Map").hide();
						$(top.document).find("#chart-area").show();
					}
						
					/*$(top.document).find("#barChart_"+that.id).find(".graphbox_bar").toggle();*/
					});
			};
            
			// 막대차트 업데이트
			this.updateBarChart = function(res, options) {
				//TODO 바 차트 셋팅
				if(window.orientation!=undefined){
					if(window.orientation===0){
						$(top.document).find("#barchart-area").css({"padding-bottom":"0px"});
					}else{
						$(top.document).find("#barchart-area").css({"padding-bottom":"60px"});
					}
				}	
				$(this.barChartObj).show();
				var xAxisCat = []; // X축 카테고리
				var retDataList = []; // 수치 데이터
				var titleText; // 차트 타이틀
				
				var tempList = res.info[0].details;
				
				for(var i = 0; i < tempList.length; i++) {
					xAxisCat.push(tempList[i].base_year + '년');
					retDataList.push(tempList[i].corp_cnt);
				}
				
//				xAxisCat.push('2000년');
//				xAxisCat.push('2005년');
//				xAxisCat.push('2010년');
//				
//				retDataList.push(res.info[0].one_person_family_cnt_2000);
//				retDataList.push(res.info[0].one_person_family_cnt_2005);
//				retDataList.push(res.info[0].one_person_family_cnt_2010);
				
				var titleStr = "<h3><b>주요 소상공인 업종의 사업체수 증감현황(커피전문점)(개)</b></h3> </br>";
				titleStr += res.properties.adm_nm;
				$(top.document).find("#bar_graph_title").html(titleStr);
				
				//차트 열기
				//$("#barChart_"+that.id).find(".graphbox_bar").show();
				
				var chartWidth = $(window).outerWidth(true);
				var outerHeight = $(window).outerHeight(true)-($("header:visible").outerHeight(true)+$(".MapTitle").outerHeight(true)+$("p.SelectArea").outerHeight(true)+$(".Btn_Top").outerHeight(true))-100;
				var chartHeight = outerHeight>400?outerHeight:$(window).outerHeight(true)-100;
				$(top.document).find("#barChart_"+that.id).find("#container_graph_bar").height(chartHeight);
				$(top.document).find("#barChart_"+that.id).find("#container_graph_bar").highcharts({
					chart : {
						type : 'column',backgroundColor: 'white', height:chartHeight, width:chartWidth
					},
					title: {
			            text: ''
			        },
					xAxis : {
						categories : xAxisCat,
						labels : {
			            	enabled: true
			            }
					},
					yAxis : {
						min : 0,
						title : null,
					},
					tooltip : {
						headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat : '<tr><td style="color:{series.color};padding:0"></td>' + '<td style="padding:0"><b>{point.y} 개</b></td></tr>',
						footerFormat : '</table>',
						shared : true,
						useHTML : true
					},
					plotOptions : {
						line: {
							lineWidth: 3,
			                dataLabels: {
			                	enabled: true,
			                    style : {"color": "#000000", "fontSize": "15px"}
			                },
			                marker : {
			                	fillColor: '#FFFFFF',
			                    lineWidth: 2,
			                    lineColor: null
			                },
			                enableMouseTracking: false
			            },
						column : {
							pointPadding : 0.2,
							borderWidth : 0
						}
					},
					legend: {
			            enabled: false
			        },
					series : [ {
						type : "column",
						name : '',
						data : retDataList,
						color : '#2CCBF0'
					}, {
						type : "line",
						data : retDataList,
						color : '#ff0000'
					} ]
				});
				
				var html = "<div align='center' style='background-color: WHITE;'>";
				html += "출처 : 통계청, 2009년~2013년 전국사업체조사</br>";
				html += "</div>";
				html += "</br>";
//				$(this.barChartObj).append(html);
				$(top.document).find("#barChart_"+that.id).find("#graphbox_bar_append").html(html);
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
			
			//경계 선택 시 차트에서 해당하는 값을 하이라이트
			this.selectChartData = function(properties) {
				var charts = $(this.barChartObj).highcharts();
				var adm_cd = properties.adm_cd;
				var ssaArray = properties.adm_nm.split(" ");
				
				if(charts != undefined) {
					if(adm_cd.length == 13) {	//집계구
						for(var i = 0; i < charts.xAxis[0].categories.length; i ++) {
							if(adm_cd.substring(6, 13) == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({ color: '#fe5800' });
								charts.tooltip.refresh(charts.series[0].data[i]);
							} else {
								charts.series[0].data[i].update({ color: '#2951f2' });
							}
						}
					} else if(ssaArray.length == 3) {	//읍면동
						for(var i = 0; i < charts.xAxis[0].categories.length; i ++) {
							if(ssaArray[2] == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({ color: '#fe5800' });
								charts.tooltip.refresh(charts.series[0].data[i]);
							} else {
								charts.series[0].data[i].update({ color: '#2951f2' });
							}
						}
					} else if(ssaArray.length == 2) {	//시군구
						for(var i = 0; i < charts.xAxis[0].categories.length; i ++) {
							if(ssaArray[1] == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({ color: '#fe5800' });
								charts.tooltip.refresh(charts.series[0].data[i]);
							} else {
								charts.series[0].data[i].update({ color: '#2951f2' });
							}
						}
					} else if(ssaArray.length == 1) {	//시도
						for(var i = 0; i < charts.xAxis[0].categories.length; i ++) {
							if(ssaArray[0] == charts.xAxis[0].categories[i]) {
								charts.series[0].data[i].update({ color: '#fe5800' });
								charts.tooltip.refresh(charts.series[0].data[i]);
							} else {
								charts.series[0].data[i].update({ color: '#2951f2' });
							}
						}
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
				if (!this.firstBoolean) {
					// 지도 위치 이동
					this.map.mapMove([ sidoArray[1], sidoArray[2] ], /* 5 */3);
					// 오픈API 호출
					this.map.curSidoCd = sidoArray[0];
					this.map.curSiggCd = null;
					this.map.curDongCd = null;
				}
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
					if (!this.firstBoolean) {
						// 지도 위치 이동
						this.map.mapMove([ sggArray[1], sggArray[2] ], /* 7 */6);
						this.map.curSidoCd = sidoArray[0];
						this.map.curSiggCd = sggArray[0];
						this.map.curDongCd = null;
					}
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
						
						// 첫화면은 구단위
						if (that.firstBoolean == true && elem.sgg_cd == "240") {
							that.firstValue = elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor;
							that.firstSggCd = elem.sgg_cd;
						}
					}
					$("#navi_" + that.id).find("#sggSelect").empty();
					$("#navi_" + that.id).find("#sggSelect").html(html);
					
					$("#navi_" + that.id).find("#admSelect").empty();
					$("#navi_" + that.id).find("#admSelect").html("<option value=''>동/읍면 선택</option>");
					/*
					 * //첫화면은 구단위 if(that.firstBoolean) {
					 * $("#navi_"+that.id).find("#sggSelect").val(that.firstValue).attr("selected",
					 * "selected"); that.admSelectSet(that.firstValue); }
					 */
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
						
						// 첫화면은 특정지역
						if (that.firstBoolean == true && elem.emdong_cd == "65") {
							that.firstValue = elem.emdong_cd + "/" + elem.x_coor + "/" + elem.y_coor;
							that.firstAdmCd = elem.emdong_cd;
							x_coor = elem.x_coor;
							y_coor = elem.y_coor;
						}
					}
					$("#navi_" + that.id).find("#admSelect").empty();
					$("#navi_" + that.id).find("#admSelect").html(html);
					/*
					 * //첫화면은 특정지역 if(that.firstBoolean) { that.firstBoolean =
					 * false;
					 * $("#navi_"+that.id).find("#admSelect").val(that.firstValue).attr("selected",
					 * "selected"); //지도 위치 이동 that.map.mapMove([x_coor, y_coor] ,
					 * 9);
					 * 
					 * //오픈API 호출 var sidoArray =
					 * $("#navi_"+that.id).find("#sidoSelect").val().split("/");
					 * that.map.curSidoCd = sidoArray[0]; that.map.curSiggCd =
					 * that.firstSggCd; that.map.curDongCd = that.firstAdmCd; }
					 */
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
					 messageAlert.open("알림", res.errMsg)
				}
			},
			onFail : function (status) {				
			}
		});
	}());
	/** ********* 시도/시군구/읍면동 일괄 검색 End ********* */
	
}(window, document));