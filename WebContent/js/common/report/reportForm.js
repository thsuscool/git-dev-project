/**
 * 
 */
(function(W, D) {
	W.$reportForm = W.$reportForm || {}
	
	$(document).ready(function() {	
		/*function LockF5() { 
	        if (event.keyCode == 116) { 
	            event.keyCode = 0; 
	            return false; 
	        }	
	    } 
	    document.onkeydown = LockF5;*/
	});
	
	$(window).load(function() {
		setTimeout(function() {
			if (window.opener.$interactiveMap != undefined) {
				window.opener.$interactiveMap.ui.reportLoad();
			}else if (window.opener.$bizStatsMap != undefined) {
				$("#interactiveTopDiv").remove();
				window.opener.$bizStatsMap.ui.reportLoad();
			}
		}, 500);
	});

	$reportForm.ui = {
				map : null,
				datas : null,
				mapType : null,
				totalDataList : null,
				dataGeojson : [],
				delegate : null,
				menuType : {
					"intro"     : 0,
					"jobArea"   : 1,
					"jobChange" : 2,
					"areaInfo"  : 3,
					"areaSearch": 4,
					"population": 5,
					"school"	: 6,
					"metro"		: 7,
					"busStop"	: 8,
					"cctv"		: 9 //2017.06.26 [개발팀] kcu 공공데이터 추가
				},
				
				companyName : {
					theme_sum_01 : "교육시설",
					theme_sum_02 : "공공기관",
					theme_sum_03 : "금융시설",
					theme_sum_04 : "의료시설",
					theme_sum_05 : "대중교통",
					theme_sum_06 : "방범/방재",
					theme_sum_07 : "백화점/중대형마트",
					theme_sum_08 : "편의점",
					theme_sum_09 : "극장/영화관",
					theme_sum_10 : "도서관/박물관"
				},
				
				/**
				 * @name         : createMap
				 * @description  : 맵을 생성한다.
				 * @date         : 2015. 11. 10. 
				 * @author	     : 권차욱
				 * @param divId  : 맵 엘리먼트 아이디
				 * @param seq	 : 맵의 순번
				 */
				createMap : function(divId, seq) {
					var map = new sMap.map();
					map.createMap($reportForm, divId, {
						center : [ 989674, 1818313 ],
						zoom : 8,
						measureControl : false,
						statisticTileLayer: false
					});
					map.id = seq;
					this.map = map;
					map.gMap.whenReady(function() {
						window.opener.$interactiveMap.ui.reportLoad();
					});
					map.gMap.dragging.disable();
					map.gMap.scrollWheelZoom.disable();
					map.gMap.doubleClickZoom.disable();
				},
				
				/**
				 * @name         : setData
				 * @description  : 보고서를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 * @param maType : 보고서타입
				 */
				setData : function(data, options) {
					this.datas = data;
					this.mapType = options.mapType;
					this.drawMap(options);			//지도생성
					this.setMainReportInfo(data);	//보고서 제목, 출처, 일자 등 생성
					this.setLegend(data, options);	//범례생성
					this.setChart(data, options);	//차트생성
					this.setGrid(data, options);	//표생성
				},
				
				/**
				 * @name         : drawMap
				 * @description  : 보고서의 지도화면을 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param options: 옵션파라미터
				 */
				drawMap : function(options) {
					/*var clone = options.mapClone;
					var originWidth = options.mapWidth;
					var originHeight = options.mapHeight;
					var w = $(".pntMap").width();
					var h = $(".pntMap").height();
					
					//지도 크기, 배율 설정
		 			var scaleWidthValue = (originWidth / w).toFixed(2);
	 	 			var scaleHeightValue = (originHeight / h).toFixed(2);
	 	 			var scaleWidth = (w / originWidth) + 0.15;
	 	 			var scaleHeight = (h / originHeight);
	 	 			
	 	 			var reportMapCss = {
		 	 				"width" : originWidth+"px",
			 	 			"height" : originHeight+"px",
			 	 			"overflow":"hidden",
			 	 			"margin-left" : ((originWidth -w)*-1) / 2 + "px",
			 	 			"margin-top" : ((originHeight - h)*-1) / 2 + "px"
		 	 		};
	 	 			
	 	 			if(originWidth < w) {
	 	 				reportMapCss["transform"] = "scale("+scaleHeight+", "+scaleHeight+")";
	 	 			} else {
	 	 				reportMapCss["transform"] = "scale("+scaleWidth+", "+scaleHeight+")";
	 	 			}*/
					
					var originWidth = options.mapWidth;
					var originHeight = options.mapHeight;
					var rate = originWidth/originHeight;
					var height = 472;
					var width = parseInt(height*rate);
					var marginLeft = parseInt((798-width)/2);
		
					var reportMapCss = {
		 	 				"width" : width+"px",
			 	 			"height" : height+"px",
			 	 			"margin-left" : marginLeft+"px",
			 	 			"overflow":"hidden"
		 	 		};
					
					//$(clone).find(".sop-control").hide();
					$("#reportMapDiv").attr("src", options.mapData);
					$("#reportMapDiv").css(reportMapCss);
					
					/*//열지도의 경우, 
					//canvas에 열지도를 그리는 것이라 html을 clone할 때,
					//데이터는 복사되지 않아 그려지지 않는다.
					//따라서 기존의 canvas를 다시 redraw하여 표출한다.
					if ($(clone).find(".sop-heatmap-layer").length) {
						var originCanvas = $(window.opener.document).find(".sop-heatmap-layer")[0]
						var image = new Image();
						image.src = originCanvas.toDataURL("image/png");
						
						var canvas = $(".sop-heatmap-layer")[0];
						if (canvas != undefined) {
							canvas.width = image.width;
							canvas.height = image.height;
							canvas.getContext("2d").drawImage(image, 0, 0);
						}
						
					}*/
				},
				
				/**
				 * @name         : drawPolygon
				 * @description  : 맵에 폴리곤을 그린다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				drawPolygon : function(data) {
					var legend = new sLegendInfo.legendInfo(this.map);			
					legend.initialize($reportForm.ui);
					this.map.legend = legend;
					this.map.legend.valPerSlice = data.legend.valPerSlice;
					this.map.legend.legendColor = data.legend.legendColor;
					this.map.legend.legendType = data.legend.legendType;
					this.map.legend.numberData = data.isCaption;
					this.map.legend.selectType = data.dataType;
					legend.valPerSlice = data.legend.valPerSlice;
					legend.legendColor = data.legend.legendColor;
					
					var adm_cd = "";
					if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
						for (var i=0; i<data.geojson.length; i++) {
							if (i==0) {
								adm_cd = data.geojson[i].features[0].properties.adm_cd;
							}					
							this.dataGeojson.push(this.map.addPolygonGeoJson(data.geojson[i], "data"));
						}
					}else {
						adm_cd = data.geojson.features[0].properties.adm_cd;
						this.dataGeojson.push(this.map.addPolygonGeoJson(data.geojson, "data"));
					}	
					this.map.legend.changeDataMode(data.dataType);
					
					//layer의 이벤트를 제거한다.
					this.map.gMap.eachLayer(function(layer) {
						layer.off("mouseover");
						layer.off("mouseout");
					});
				},
				
				/**
				 * @name         : setMainReportInfo
				 * @description  : 보고서의 기본적인 정보를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setMainReportInfo : function(data) {
					var mainTitle, searchTitle;
					var date = $reportForm.Util.getToday();
					
					//대화형통계지도
					if (this.mapType == "interactiveMap") {
						if (data.param.isKosis != undefined && data.param.isKosis) {
							mainTitle = data.param.title + "("+data.data[0].UNIT+")";
						}else {
							mainTitle = data.param.title + "("+data.param.unit+")";
						}
						searchTitle = mainTitle;
						$("#origin").html(data.origin);
					}
					//생활통계지도
					else if (this.mapType == "bizStatsMap") {
						switch(this.menuType[data.dataType]) {
							case 0:
								mainTitle = data.param.title;
								searchTitle = data.param.adm_nm + "("+data.param.year+")";
								break;
							case 1:
							case 2:
								mainTitle = data.param.title;
								searchTitle = data.param.adm_nm + " "+data.param.theme_nm+ "("+data.param.year+")";
								break;
							case 3:
								mainTitle = data.param.title;
								searchTitle = data.param.adm_nm + " "+"("+data.param.year+")";
								$("#origin").html(data.origin);
								break;
							case 4:
								mainTitle = data.param.title;
								searchTitle = data.param.adm_nm;
								break;
						}
					}
					//통계주제도
					else if (this.mapType == "themeticMap") {
						
					}
					//공공데이터
					else if (this.mapType == "publicData") {
						mainTitle = data.param.title;
						searchTitle = data.param.subTitle;
						$("#origin").html(data.origin);
					}
					//나의데이터
					else if (this.mapType == "userData") {
						mainTitle = data.param.title;
						searchTitle = data.param.subTitle;
					}
					
					//poi데이터
					else if (this.mapType == "poi") {
						mainTitle = data.param.title;
						searchTitle = data.param.subTitle;
					}

					if (this.mapType == "interactiveMap") {
						$("#reportTitle").val(mainTitle);
					} else {
						$("#reportTitle").val("보고서명 : " + mainTitle);
					}
					$("#searchItem").html(searchTitle);
					$("#date").html(date);
				},
				
				/**
				 * @name         : setLegend
				 * @description  : 보고서의 범례를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setLegend : function(data, options) {
					var map, legend, title, unit;
					if (window.opener.$interactiveMap != undefined) {
						map = window.opener.$interactiveMap.ui.mapList[data.id];
					}else if (window.opener.$bizStatsMap != undefined) {
						map = window.opener.$bizStatsMap.ui.mapList[data.id];
					}
					
					//대화형통계지도
					if (this.mapType == "interactiveMap" || this.mapType == "userData") {
						if (data.param.isKosis != undefined && data.param.isKosis) {
							unit = data.data[0].UNIT;
						}else {
							unit = data.param.unit;
						}
						legend = $(map.legend.legendObj).clone().removeClass("min");
						if (unit != undefined) {
							title = "범례 (단위 : " + unit + ")";
						}else {
							title = "범례";
						}
						
						$("#legend").append($(legend).html());
						$("#legendTitle").html(title);
						$("#legend").find(".legendBox").removeClass("min");
						$("#legend").find(".legendRound").hide();
						$("#legend").find(".lgListBox").hide();
						$("#legend").find(".legendRrefresh").css("right", "13px");
					}
					//생활업종지도
					else if (this.mapType == "bizStatsMap") {
						switch(this.menuType[data.dataType]) {
							case 0:
							case 3:
							case 4:
								legend = options.legend;
								$(".pntLeft").css("width", "130px");
								$(".pntRight").css("width", "660px");
								$("#legend").append($(legend).html());
								$("#legendTitle").html("범례");
								break;
							case 1:
								legend = $(map.legend.legendObj).clone().removeClass("min");
								title = "범례 (단위 : 개)"; 
								$("#legend").append($(legend).html());
								$("#legendTitle").html(title);
								$("#legend").find(".legendRound").hide();
								$("#legend").find(".lgListBox").hide();
								$("#legend").css("width", "205px");
								break;
							case 2:
								legend = $(map.legend.legendObj).clone().removeClass("min");
								title = "범례 (단위 : 개)"; 
								$("#legend").append($(legend).html());
								$("#legendTitle").html(title);
								$("#legend").find(".legendRound").hide();
								$("#legend").find(".lgListBox").hide();
								$("#legend").css("width", "205px");
								break;
						}
					}
				},
				
				/**
				 * @name         : setChart
				 * @description  : 차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setChart : function(data, options) {
					//대화형통계지도
					if (this.mapType == "interactiveMap") {
						var labelsVisible = true;
						var title = data.param.title;
						var categoryList = [];
						var retDataList = [];
						
						if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
							for(var i=0; i<data.geojson.length; i++) {
								var geojson = data.geojson[i];
								for (var k=0; k<geojson.features.length; k++) {
									var layer = geojson.features[k];
									if (layer.dataIdx == undefined) {
										continue;
									}
									var tmpAdmName = layer.properties.adm_nm.split(" ");
									var adm_nm = "";
									if (tmpAdmName.length > 1) {
										adm_nm = tmpAdmName[tmpAdmName.length-1];
									}else {
										adm_nm = tmpAdmName[0];
									}
									
									if (layer.properties.adm_cd.length > 7) {
										labelsVisible = true;
										adm_nm = adm_nm + "_" + (layer.dataIdx+1);
										
									}
									
									categoryList.push(adm_nm);
									if (layer.info.length > 0) {
										var info = layer.info[0];
										retDataList.push(parseFloat(info[info.showData]));
									}
								}
							}
						}else {
							for(var i=0; i<data.geojson.features.length; i++) {
								var layer = data.geojson.features[i];
								if (layer.dataIdx == undefined) {
									continue;
								}
								var tmpAdmName = layer.properties.adm_nm.split(" ");
								var adm_nm = "";
								if (tmpAdmName.length > 1) {
									adm_nm = tmpAdmName[tmpAdmName.length-1];
								}else {
									adm_nm = tmpAdmName[0];
								}
								
								//집계구 레벨
								if (layer.properties.adm_cd.length > 7) {
									labelsVisible = true;
									adm_nm = adm_nm + "_" + (layer.dataIdx+1);
								}
								
								categoryList.push(adm_nm);
								if (layer.info.length > 0) {
									var info = null;
									if (layer.isKosis) {
										info = layer.info;
										retDataList.push(parseFloat(info[0]));
									}else {
										info = layer.info[0];
										retDataList.push(parseFloat(info[info.showData]));
									}
								}
							}
						}
						
						//	데이터보드에 '상위 지역 비교 데이터 보기' 차트가 있는 경우에만 보고서에 추가
						if(data.data.id == "API_0302" || data.data.id == "API_0307" || data.data.id == "API_0304"){
							$("#extraChartRegion2").show();
							
							//2017.03.28 2레벨 조회일 경우, 지역특성그래프 숨김
							if (options.chart != null && options.chart.length > 0) {
								var chart1 = options.chart[0].data[0];
								var chart2 = options.chart[0].data[1];

								var html =  "<div class='pntNewCenter' style='margin-bottom:10px;'>";
									html +=	 	"<h3 style='height:220px;line-height:220px;'>" + options.chart[0].title + "</h3>";
									html +=		"<div style='width:370px;height:220px;float:left;'><div id='newPieChart2' style='width:220px;height:220px;line-height:220px;float:right;'></div></div>";
									html +=		"<div id='newPieChart3' style='width:180px;height:220px;overflow:hidden;float:right;border-left:1px solid #ccc;padding-left:10px;position:relative;'><br/><br/><br/><div class='pntCloseBtn'><a href='javascript:$reportForm.ui.onOffDiv(\"extraChartRegion2\");'><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div></div>";
									html +=	"</div>";
								$("#extraChartRegion2").append(html);
								
								$("#newPieChart2").append($(chart1).html());
								$("#newPieChart3").append($(chart2).html());
							}
							
						}
						
						var param = {
								title : title,
								categories : categoryList,
								dataList : retDataList,
								isLabel : labelsVisible
						};
						
						var unit = window.opener.$interactiveMap.ui.curDropParams[0].unit;						
						$("#chartTitle").html( $("#chartTitle").text() + ( unit ? " ("+unit+")" : "" ) );
												
						this.addBarChart("#barChartDiv", param, 770, 220);	
						this.totalDataList = retDataList;
					}
					//생활업종지도
					else if (this.mapType == "bizStatsMap") {
						switch(this.menuType[data.dataType]) {
							case 0:
								var chart1 = options.chart[0].data[0];
								var chart2 = options.chart[0].data[1];
								var chart3 = options.chart[1].data;
	
								var html =  "<div class='pntCenter' style='position:relative;'>";
									html +=		"<h3>"+options.chart[1].title+"</h3>";
									html +=		"<div id='introChart3' style='width:530px;margin:0 auto;'></div>";
									html +=		"<div class='pntCloseBtn'><a href='javascript:$reportForm.ui.onOffDiv(\"extraChartRegion\");'><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>";
									html +=	"</div>";
								$("#extraChartRegion").append(html);
								
								$(".pntRight>h3").html(options.chart[0].title);
								$("#barChartDiv").append($(chart1).html());
								$("#barChartDiv").append($(chart2).html());
								$("#introChart3").append($(chart3).html());
								$("#barChartDiv").css("width", "500px");
								$("#barChartDiv").css("margin","0 auto");
								$("#barChartDiv>div").eq(0).css("float","left");
								break;
							case 1:
								for (var i=0; i<options.chart.length; i++) {
									var chart = options.chart[i];
									if (i==0) {
										var html = "<img src='"+chart.data+"' width=528 height=250/>";
										$("#chartTitle").html(chart.title);
										$("#barChartDiv").append(html);
									}else {
										var html = "";
										if (i%2 != 0) {
											html =  "<div class='pntLeft mt60' style='width:393px;'>";
										}else {
											html =  "<div class='pntRight mt60' style='width:393px;'>";
										}
										html += 	"<h3>"+chart.title+"</h3>";
										html +=		"<div id='jobArea_"+i+"' style='margin:0 auto;'>";
										html +=			"<img src='"+chart.data+"' width=393 height=250/>";
										html +=		"</div>";
										html += "</div>";
										$("#extraChartRegion").append(html);
									}
								}
								break;
							case 2:
								var html = "<img src='"+options.chart.data+"' width=528 height=250/>";
								$("#chartTitle").html(options.chart.title);
								$("#barChartDiv").append(html);
								break;
							case 3:
								var html  = "<img src='"+options.chart[0].data+"' width=330 height=250/ style='float:left;'>";
									html += "<img src='"+options.chart[1].data+"' width=330 height=250/'>";
								$(".pntRight>h3").html(options.chart[0].title);
								$("#barChartDiv").append(html);
								$("#barChartDiv").css("margin","0 auto");
								
								var html =  "<div class='pntCenter' style='position:relative;'>";
									html +=		"<h3>"+options.chart[2].title+"</h3>";
									html +=		"<div id='introChart3' style='width:530px;margin:0 auto;'>";
									html +=			"<img src='"+options.chart[2].data+"' style='max-width:100%;height:auto;'/>";
									html +=		"</div>";
									html +=		"<div class='pntCloseBtn'><a href='javascript:$reportForm.ui.onOffDiv(\"extraChartRegion\");'><img src='/img/um/btn_closel01.png' alt='숨기기' /></a></div>";
									html +=	"</div>";
								$("#extraChartRegion").append(html);
								break;
							case 4:
								var html  = "<img src='"+options.chart[0].data+"' width=330 height=250/ style='float:left;'>";
								html += "<img src='"+options.chart[1].data+"' width=330 height=250/'>";
								$(".pntRight>h3").html(options.chart[0].title);
								$("#barChartDiv").append(html);
								$("#barChartDiv").css("margin","0 auto");
								break;
						}
					}
					//공공데이터
					else if (this.mapType == "publicData") {
						$("#interactiveMapRegion").empty();
						var html = "";
						html += '<div class="pntCloseBtn"><a href="javascript:$reportForm.ui.onOffDiv(\'interactiveMapRegion\');"><img src="/img/um/btn_closel01.png" alt="숨기기" /></a></div>';
						switch(this.menuType[data.dataType]) {
							case 5:
							case 6:
							case 7:
								for (var i=0; i<options.chart.length; i++) {
									if (i%2 == 0) {
										html +=  "<div class='pntLeft mt60' style='width:393px;'>";
									}else {
										html +=  "<div class='pntRight mt60' style='width:393px;'>";
									}
									html +=		"<h3>"+options.chart[i].title+"</h3>";
									html +=		"<img src='"+options.chart[i].data+"' width=393 height=250/>";
									html += "</div>";
								}
								break;
							case 8:
								for (var i=0; i<options.chart.length; i++) {
									html +=  "<div class='pntCenter'>";
									html +=		"<h3>"+options.chart[i].title+"</h3>";
									html +=		"<img src='"+options.chart[i].data+"' width=800 height=250/>";
									html += "</div>";
								}
								break;
							//2017.07.11 [개발팀] kcu 공공데이터 추가 - 세종권역 통행흐름정보	
							case 9:
								for (var i=0; i<options.chart.length; i++) {
									html +=  "<div class='pntCenter'>";
									html +=		"<h3>"+options.chart[i].title+"</h3>";
									html +=		"<img src='"+options.chart[i].data+"' width=450 height=250 style='margin-left:170px;'/>";
									html += "</div>";
								}
								break;
							default:
								break;
						}
						$("#interactiveMapRegion").append(html);
						$("#interactiveMapRegion").css("border", "none"); //2017.03.13 pdf저장 이슈
					}
					//사용자데이터
					else if (this.mapType == "userData") {
						$("#interactiveMapRegion").hide();
					}
				},
				
				/**
				 * @name         : setGrid
				 * @description  : 표를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setGrid : function(data, options) {
					//대화형통계지도
					if (this.mapType == "interactiveMap") {
						var unit = null;
						if (data.param.isKosis != undefined && data.param.isKosis) {
							unit = data.data[0].UNIT;
						}else {
							unit = data.param.unit;
						}
						var unit = "단위 ("+unit +")";
						var adm_nm = "지역";
						var total = 0;
						for (var i=0; i<this.totalDataList.length; i++) {
							total += this.totalDataList[i];
						}
						
						total = total.toFixed(2);
						
						var legend = new sLegendInfo.legendInfo();			
						legend.valPerSlice = data.legend.valPerSlice;
						legend.legendColor = data.legend.legendColor;
						
						//표정보 설정
						var tmpAdmList = [];
						var tmpDataList = [];
						var adm_cd;
						var options = {
								legend : legend,
								total : total
						};
						if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
							for (var i=0; i<data.geojson.length; i++) {
								var geojson = data.geojson[i];
								if (geojson.features[0].dataIdx == undefined) {
									continue;
								}
								if (i != 0) {
									var name = geojson.features[0].properties.adm_nm.split(" ");
									tmpAdmList.push(name[name.length-1]);
								}else {
									tmpAdmList.push(geojson.features[0].properties.adm_nm);
								}
								adm_cd = geojson.features[0].properties.adm_cd;
								this.getGridData(geojson, tmpDataList, adm_cd, options);
							}
							adm_nm = tmpAdmList.join();
						}else {
							adm_nm = data.geojson.features[0].properties.adm_nm;
							adm_cd = data.geojson.features[0].properties.adm_cd;
							this.getGridData(data.geojson, tmpDataList, adm_cd, options);
						}
						
						var gridList = tmpDataList.sort(function (a, b) {
							if( a._dataIdx && b._dataIdx ){
								return Number(a._dataIdx) - Number(b._dataIdx); 
							} else {
								var x = Number(a.value);
								var y = Number(b.value);
								if (x > y) return -1;
								if (x < y) return 1;
								return 0;
							} 
						});
						
						var options = {
								dataList : gridList,
								total : total,
								unit : unit,
								adm_nm : adm_nm,
								adm_cd : adm_cd
						};
						this.drawGrid(options);
						
						if (adm_cd.length > 7 && gridList.length > 0) {
							/*$reportForm.Request.reportReverseGeoCode(gridList[0].x, gridList[0].y, options, 0);*/
							for(var i=0; i < gridList.length; i+=5){
								(function(i){
									setTimeout(function(){
										if(i < gridList.length)   { $reportForm.Request.reportReverseGeoCode(gridList[i].x, gridList[i].y, options, i); }
										if(i+1 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+1].x, gridList[i+1].y, options, i+1); }
										if(i+2 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+2].x, gridList[i+2].y, options, i+2); }
										if(i+3 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+3].x, gridList[i+3].y, options, i+3); }
										if(i+4 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+4].x, gridList[i+4].y, options, i+4); }
									}, 20 * i)
								})(i);
							}
						}
						
						if (data.markers != null) {
							var tmpData = data.markers;
							if (tmpData != undefined && tmpData != null) {
								var html = "";
								var cnt = 1;
								tmpData.eachLayer(function(layer) {
									html += "<tr>"
									html +=		"<td>"+cnt+"</td>";
									html +=		"<td>"+layer.info.corp_nm+"</td>";
									html +=		"<td>"+layer.info.naddr+"</td>";
									html +=		"<td>"+layer.info.x+"</td>";
									html +=		"<td>"+layer.info.y+"</td>";
									html += "</tr>";
									cnt++;
								});
								$("#poiRegion").append(html);
								if (html.length > 0) {
									$("#poiRegion").show();
								}
							}
						}
					}
					//생활업종지도
					else if (this.mapType == "bizStatsMap") {
						switch(this.menuType[data.dataType]) {
							case 0:
								$("#interactiveMapTableRegion").hide();
								$("#bizStatsMapIntro1TableRegion").show();
								$("#bizStatsMapIntro2TableRegion").show();
								
								var curRegionData, upperRegionData, curSidoRankData;
								var curRegionTitle = data.param.adm_nm + " " + "비율(%)";
								var tmpData = data.data;
								for (var i=0; i<tmpData.length; i++) {
									if (tmpData[i].type == "sidoPieChart") {
										curRegionData = tmpData[i].data;
									}else if (tmpData[i].type == "contryPieChart") {
										upperRegionData = tmpData[i].data;
									}else if (tmpData[i].type == "introRank") {
										curSidoRankData = tmpData[i].data;
									}
								}
									
								var itemName = {
										"lodgebiz_per" : "숙박업",
										"rstrt_per"	   : "음식점",
										"srv_per"	   : "서비스",
										"whrtlsal_per" : "도소매"
								};
								var html = "";
								if (curRegionData != undefined && curRegionData != null) {
									for (p in curRegionData) {
										if (p == "lodgebiz_per" || 
											p == "rstrt_per"    ||
											p == "srv_per"		||
											p == "whrtlsal_per") {
											html += "<tr>";
											html +=		"<td>"+itemName[p]+"</td>";
											html +=		"<td>"+curRegionData[p]+"</td>";
											if (upperRegionData != undefined && upperRegionData != null) {
												html += "<td>"+upperRegionData[p]+"</td>";
											}else {
												html += "<td></td>";
											}
											html +=	"</tr>";
										}
									}
								}
								
								var html2 = "";
								if (curSidoRankData != undefined && curSidoRankData != null) {
									var result = curSidoRankData.tob_rank;
									for (var i=0; i<result.length; i++) {
										html2 += "<tr'>";
										html2 += 	"<td colspan=2>"+result[i].theme_nm+"</td>";
										html2 +=	"<td>"+appendCommaToNumber(result[i].corp_cnt)+"</td>";
										html2 +=	"<td>"+result[i].corp_cnt_rank+"</td>";
										html2 +=	"<td>"+result[i].corp_per+"</td>";
										html2 +=	"<td>"+result[i].corp_per_rank+"</td>";
										html2 +=	"<td>"+result[i].corp_irdsrate+"</td>";
										html2 +=	"<td>"+result[i].corp_irds_rank+"</td>";
										html2 +=	"<td>"+appendCommaToNumber(result[i].worker_cnt)+"</td>";
										html2 +=	"<td>"+result[i].worker_cnt_rank+"</td>";
										html2 +=	"<td>"+result[i].worker_per+"</td>";
										html2 +=	"<td>"+result[i].worker_per_rank+"</td>";
										html2 +=	"<td>"+result[i].worker_irdsrate+"</td>";
										html2 +=	"<td>"+result[i].worker_irds_rank+"</td>";
										html2 += "</tr>";
									}
								}
								
								$("#curRegionTitle").html(curRegionTitle);
								$("#bizStatsMapIntro1TableRegion").find("#tBody").append(html);
								$("#bizStatsMapIntro2TableRegion").find("#tBody").append(html2);
								$("#mask").hide();
								break;
							case 1:
								$("#interactiveMapTableRegion").hide();
								var tmpGridList = [];
								var tmpRankData = data.data[1];
								for (var i=0; i<tmpRankData.data.sgg_info.length; i++) {
									var lData = tmpRankData.data.sgg_info[i];
									for (p in lData) {
										if (p == "corp_cnt") {
											for (var k=0; k<7; k++) {
												if (tmpGridList[k] == null || tmpGridList[k] == undefined) {tmpGridList[k] = [];}
											}
											tmpGridList[0].push({name:lData.sgg_nm, data:parseFloat(lData.corp_cnt)});
											tmpGridList[1].push({name:lData.sgg_nm, data:parseFloat(lData.upregion_vs_corp_per)});
											tmpGridList[2].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_ppltn_rate)});
											tmpGridList[3].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_worker_rate)});
											tmpGridList[4].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_family_rate)});
											tmpGridList[5].push({name:lData.sgg_nm, data:parseFloat(lData.biz_worker_cnt)});
											tmpGridList[6].push({name:lData.sgg_nm, data:parseFloat(lData.avg_worker_rate)});
										}
									} 
								}
								
								for (var i=0; i<tmpGridList.length; i++) {
									tmpGridList[i] = tmpGridList[i].sort(function (a, b) {
										return b.data - a.data 
									});
									
									var html =  "";
									if (i%2 == 0){
										html += "<table class='pntTable' style='width:395px;float:left;margin-bottom:10px;'>";
									}else {
										html += "<table class='pntTable' style='width:395px;float:right;margin-bottom:10px;'>";
									}
									
										html += 	"<colgroup>";
										html +=			"<col width=''/>";
										html +=			"<col width=''/>";
										html +=			"<col width='90'/>";
										html +=		"</colgroup>";
										html += 	"<tbody>";
										html +=			"<tr>";
										html +=				"<th scope='col' colspan=3>"+options.chart[i].title+"</th>";
										html +=		    "</tr>";
										html +=			"<tr>";
										html +=				"<th scope='col'>지역</th>";
										html +=				"<th scope='col'>값</th>";
										html +=				"<th scope='col'>순위</th>";
										html +=			"</tr>";
										
										for (var k=0; k<tmpGridList[i].length; k++) {
											html += "<tr>";
											html += 	"<td>"+tmpGridList[i][k].name+"</td>";
											html +=	 	"<td>"+tmpGridList[i][k].data+"</td>";
											html +=	 	"<td>"+(k+1)+"</td>";
											html +=	"</tr>";
										}
										
										html +=		"</tbody>";
										html ==	"</table>";
										$("#gridArea").append(html);
								}
								$("#mask").hide();
								break;
							case 2:
								$("#interactiveMapTableRegion").hide();
								var title = data.param.adm_nm + " "+data.param.theme_nm+" "+"시계열 데이터";
								var tmpTimeseriesData = data.data[0].data.companyList;
								var total = 0;
								var html  = "<table class='pntTable' style='margin-bottom:10px;'>";
								html += 	"<colgroup>";
								html +=			"<col width='270'/>";
								html +=			"<col width='270'/>";
								html +=			"<col width=''/>";
								html +=		"</colgroup>";
								html += 	"<tbody>";
								html +=			"<tr>";
								html +=				"<th scope='col' colspan=3>"+title+"</th>";
								html +=		    "</tr>";
								html +=			"<tr>";
								html +=				"<th scope='col'>년도</th>";
								html +=				"<th scope='col'>사업체수(개)</th>";
								html +=				"<th scope='col'>비율(%)</th>";
								html +=			"</tr>";
								
								for (var i=0; i<tmpTimeseriesData.length; i++) {
									total += parseFloat(tmpTimeseriesData[i].cnt);
								}
								
								for (var i=0; i<tmpTimeseriesData.length; i++) {
									html +=			"<tr>";
									html +=				"<td>"+tmpTimeseriesData[i].base_year+"</td>";
									html +=				"<td>"+appendCommaToNumber(tmpTimeseriesData[i].cnt)+"</td>";
									html +=				"<td>"+((parseFloat(tmpTimeseriesData[i].cnt)/total)*100).toFixed(2)+"</td>";
									html +=			"</tr>";
								}
								html +=			"<tr>";
								html +=				"<td scope='col'>합계</td>";
								html +=				"<td scope='col'>"+appendCommaToNumber(total)+"</td>";
								html +=				"<td scope='col'>100</td>";
								html +=			"</tr>";
								
								html +=		"</tbody>";
								html +=	"</table>";
								$("#gridArea").append(html);
								$("#mask").hide();
								break;
							case 3:
								$("#interactiveMapTableRegion").hide();
								$("#bizStatsMapAreaInfo1Region").show();
								$("#bizStatsMapAreaInfo2Region").show();
								$("#bizStatsMapAreaInfo3Region").show();
								$("#bizStatsMapAreaInfo4Region").show();
								$("#publicCicleCompanyDataRegion").show();
								var allCompanyPplHouseData, corpdistsumChartData, corpindecreaseChartData, regionTotalChartData, mainFacilityChartData;
								for (var i=0; i<data.data.length; i++) {
									if (data.data[i].type == "allCompanyPplHouse") {
										allCompanyPplHouseData = data.data[i];
									}else if (data.data[i].type == "corpdistsumChart") {
										corpdistsumChartData = data.data[i];
									}else if (data.data[i].type == "corpindecreaseChart") {
										corpindecreaseChartData = data.data[i];
									}else if (data.data[i].type == "regionTotalChart") {
										regionTotalChartData = data.data[i];
									}else if (data.data[i].type == "mainFacilityChart") {
										mainFacilityChartData = data.data[i];
									}
								}
								
								//지역특성정보-총사업체, 총인구, 총가구, 총주택
								var html  = "<tr>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.corp_cnt)+"</td>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.ppltn_cnt)+"</td>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.family_cnt)+"</td>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.resid_cnt)+"</td>";
									html +=	"</td>";
									$("#areaInfoTitle1").html(data.param.adm_nm +"  주요통계정보");
									$("#bizStatsMapAreaInfo1Region").append(html);
									
								//지역특성정보
								var html = "";
								for (var i=0; i<regionTotalChartData.data.length; i++) {
									html += "<tr>";
									html += 	"<td>"+regionTotalChartData.data[i].adm_nm+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].resid_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].one_person_family_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].sixty_five_more_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].twenty_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].job_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].apart_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].monrent_family_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].lease_family_per+"</td>";
									html += "</tr>";
								}
								$("#areaInfoTitle2").html(data.param.adm_nm+" 지역특성정보");
								$("#bizStatsMapAreaInfo2Region").append(html);
								
								//지역종합현황정보
								var categoryData = [];
								var listData = [];
								for(var i=0; i<corpdistsumChartData.data.length; i ++) {
									var corpData = corpdistsumChartData.data[i];
				        			var tempData = [];
				        			for(var x=0; x<corpData.theme_list.length; x++) {
				        				var elem = corpData.theme_list[x];
				        				tempData.push(parseFloat(elem.dist_per));
				        				if(i == 0) {
				        					categoryData.push(elem.theme_nm);
				        				}
				        			}
				        			listData.push({ "adm_nm" : corpData.adm_nm, "list" : tempData });
				        			$("#areaInfoReginName"+(i+1)).html(corpData.adm_nm);
				        		}
								
								var tableTmpList = [];
			        			for(var  i = 0; i < listData[0].list.length; i ++) {
			        				var tmpObj = [];
			        				tmpObj.push(categoryData[i]);
			        				for(var x = 0; x < listData.length; x ++) {
			        					tmpObj.push(listData[x].list[i]);
			        				}
			        				tableTmpList.push(tmpObj);
			        			}
				        		
			        			var html = "";
								for (var i=0; i<tableTmpList.length; i++) {
									var tableData = tableTmpList[i];
									html += "<tr>";
									for (var x=0; x<tableData.length; x++) {
										html +=	"<td>"+tableData[x]+"</td>";
									}
									html +=	"</tr>";
								}
								$("#bizStatsMapAreaInfo3Region").append(html);
								
								//소상공인 업종별 증감
								listData = [];
								categoryData = [];
								for(var i=0; i<corpindecreaseChartData.data.length; i ++) {
									var corpData = corpindecreaseChartData.data[i];
				        			var tempData = [];
				        			for(var x=0; x<corpData.theme_list.length; x++) {
				        				var elem = corpData.theme_list[x];
				        				tempData.push(parseFloat(elem.corp_cnt));
				        				if(i == 0) {
				        					categoryData.push(elem.theme_nm);
				        				}
				        			}
				        			listData.push({ "year" : corpData.year, "list" : tempData });
				        		}
								
								var tableTmpList = [];
			        			for(var  i = 0; i < listData[0].list.length; i ++) {
			        				var tmpObj = [];
			        				tmpObj.push(categoryData[i]);
			        				for(var x = 0; x < listData.length; x ++) {
			        					tmpObj.push(listData[x].list[i]);
			        				}
			        				tableTmpList.push(tmpObj);
			        			}
			        			
			        			var html = "";
			        			var width = Math.round(800/(listData.length+1));
			        			for (var i=0; i<listData.length; i++) {
			        				if (i==0) {
			        					html += "<col width=''>";
			        				}else {
			        					html += "<col width='"+width+"'>";
			        				}
			        			}
			        			$("#bizStatsMapAreaInfo4Region").find("#colgroup").append(html);
			        			
			        			var html  = "<tr>";
			        				html +=		"<th colspan='"+(listData.length+1)+"'>소상공인 업종별 증감(개)</th>";
			        				html +=	"</tr>";
			        				html +=	"<tr>";
			        				html +=		"<th scope='col'>지역</th>";
			        			for (var i=0; i<listData.length; i++) {
			        				html +=	"<th scope='col'>"+listData[i].year+"</th>";
			        			}
			        			html +=	"</tr>";
								for (var i=0; i<tableTmpList.length; i++) {
									var tableData = tableTmpList[i];
									html += "<tr>";
									for (var x=0; x<tableData.length; x++) {
										html +=	"<td>"+tableData[x]+"</td>";
									}
									html +=	"</tr>";
								}
								$("#bizStatsMapAreaInfo4Region").find("#tBody").append(html);
								
								//주요시설물 현황
								html = "";
								var tmpMainFacData = [];
								for (var p in mainFacilityChartData.data.themeInfo) {
									tmpMainFacData.push({
										title : p,
										data : mainFacilityChartData.data.themeInfo[p]
									});
								}
								
								tmpMainFacData = tmpMainFacData.sort(function (a, b) {
									return b.data - a.data 
								});
								
								for (var i=0; i<tmpMainFacData.length; i++) {
									html += "<tr>";
									html +=		"<td colspan=2>"+this.companyName[tmpMainFacData[i].title]+"</td>";
									html +=		"<td>"+tmpMainFacData[i].data+"</td>";
									html +=		"<td>"+(i+1)+"</td>";
									html += "</tr>";
								}
								$("#publicCicleCompanyDataRegion").find("#tBody").append(html);
								$("#mask").hide();
								break;
							case 4:
								$("#interactiveMapTableRegion").hide();
								$("#bizStatsMapAreaInfo2Region").show();
								
								var resultData = [];
								for (var i=0; i<data.data.spyChartList03.length; i++) {
									var tmpData = data.data.spyChartList03[i];
									for (var x=0; x<tmpData.length; x++) {
										if (i==0) {
											var params = {
													adm_nm : tmpData[x].adm_nm,
													list : tmpData[x].list
											};
											resultData.push(params);
										}else {
											if (x != 0) {
												var params = {
														adm_nm : tmpData[x].adm_nm,
														list : tmpData[x].list
												};
												resultData.push(params);
											}
										}
									}
								}
								
								for (var i=0; i<data.data.spyChartList04.length; i++) {
									var tmpData = data.data.spyChartList04[i];
									if (i==0) {
										for (var k=0; k<tmpData.length; k++) {
											for (var x=0; x<resultData.length; x++) {
												if (tmpData[k].adm_nm == resultData[x].adm_nm) {
													for (var z=0; z<tmpData[k].list.length; z++) {
														resultData[x].list.push(tmpData[k].list[z]);
													}
												}
											}
										}
									}else {
										for (var k=1; k<tmpData.length; k++) {
											for (var x=0; x<resultData.length; x++) {
												if (tmpData[k].adm_nm == resultData[x].adm_nm) {
													for (var z=0; z<tmpData[k].list.length; z++) {
														resultData[x].list.push(tmpData[k].list[z]);
													}
												}
											}
										}
									}
								}
								
 								for (var i=0; i<resultData.length; i++) {
									html += "<tr>";
									html += 	"<td>"+resultData[i].adm_nm+"</td>";
									for (var k=0; k<resultData[i].list.length; k++) {
										html += "<td>"+resultData[i].list[k]+"</td>";	
									}
									html += "</tr>";
								}
								$("#areaInfoTitle2").html(data.param.adm_nm+" 지역특성정보");
								$("#bizStatsMapAreaInfo2Region").append(html);
								$("#mask").hide();
								break;
							default:
								$("#mask").hide();
								break;
						}
					}
					//공공데이터
					else if (this.mapType == "publicData") {
						//========== 2017.07.11 [개발팀] 공공데이터 추가 - 세종권역 통행흐름정보 START ============//
						var poiData, circleData, schoolSggData, cctvPoiData, brtPoiData, monthData, timeData;
						for (var i=0; i<data.data.length; i++) {
							var tmpData = data.data[i];
							switch(tmpData.type) {
								case "poiInfo" :
								case "metro_month" :
								case "metro_dayofweek" :
									poiData = tmpData.data;
									break;
								case "school_sggAvg" :
									schoolSggData = tmpData.data;
									break;
								case "circleAreaInfo" :
									circleData = tmpData.data;
									break;
								case "cctvPoi" :
									cctvPoiData = tmpData.data;
									break;
								case "brtPoi" :
									brtPoiData = tmpData.data;
									break;
								case "weekendChart" :
									monthData = tmpData.data;
									break;
								case "timeSeriesChart" :
									timeData = tmpData.data;
									break;
							}
						}
						//========== 2017.07.11 [개발팀] 공공데이터 추가 - 세종권역 통행흐름정보 END ============//
						
						var tmpCircleData = [];
						for (var p in circleData.themeInfo) {
							tmpCircleData.push({title:this.companyName[p], data:circleData.themeInfo[p]});
						}
						tmpCircleData = tmpCircleData.sort(function (a, b) {
							return b.data - a.data 
						});
						
						$("#interactiveMapTableRegion").hide();
						$("#publicCicleDataRegion").show();
						$("#publicCicleCompanyDataRegion").show();
						
						switch(this.menuType[data.dataType]) {
							case 5:
								$("#publicPopulationPoiDataRegion").show();
								
								//해당지점 시간별 유동인구수
								var maleSum = poiData.male_agegp_10_cnt+poiData.male_agegp_20_cnt+poiData.male_agegp_30_cnt+poiData.male_agegp_40_cnt+poiData.male_agegp_50_cnt;
								var femaleSum = poiData.fem_agegp_10_cnt+poiData.fem_agegp_20_cnt+poiData.fem_agegp_30_cnt+poiData.fem_agegp_40_cnt+poiData.fem_agegp_50_cnt;
								var html  = "<tr>";
									html +=		"<td rowspan=2>"+poiData.surv_time+"</td>";
									html +=		"<td>남</td>";
									html +=		"<td>"+poiData.male_agegp_10_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_20_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_30_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_40_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_50_cnt+"</td>";
									html +=		"<td>"+maleSum+"</td>";
									html += "</tr>";
									html += "<tr>";
									html +=		"<td>여</td>";
									html +=		"<td>"+poiData.fem_agegp_10_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_20_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_30_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_40_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_50_cnt+"</td>";
									html +=		"<td>"+femaleSum+"</td>";
									html += "</tr>";	
									html +=	"<tr>";
									html +=		"<td colspan=2>합계</td>";
									html +=		"<td>"+(poiData.male_agegp_10_cnt+poiData.fem_agegp_10_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_20_cnt+poiData.fem_agegp_20_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_30_cnt+poiData.fem_agegp_30_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_40_cnt+poiData.fem_agegp_40_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_50_cnt+poiData.fem_agegp_50_cnt)+"</td>";
									html +=		"<td>"+(maleSum+femaleSum)+"</td>";
									html += "</tr>";
								$("#publicPopulationPoiDataRegion").append(html);
								$("#publicTitle1").html(data.param.subTitle);
								break;
							case 6:
								$("#publicSchoolPoiDataRegion").show();
								$("#publicSchoolPoiDataRegion2").show();
								
								//학교 학생/교직원현황
								var total = poiData.stdnt_cnt + poiData.tcher_cnt;
								var studentRate = (Math.round((poiData.stdnt_cnt / total) * 100)).toFixed(1);
								var teacherRate = (Math.round((poiData.tcher_cnt / total) * 100)).toFixed(1);
								var studentCntPerTeacher =  (poiData.stdnt_cnt / poiData.tcher_cnt).toFixed(1);
								var html  = "<tr>";
									html +=		"<td>"+appendCommaToNumber(poiData.stdnt_cnt)+"</td>";
									html +=		"<td>"+studentRate+" (%)</td>";
									html +=		"<td>"+appendCommaToNumber(poiData.tcher_cnt)+"</td>";
									html +=		"<td>"+teacherRate+" (%)</td>";
									html +=		"<td colspan=2>"+studentCntPerTeacher+"</td>";
									html +=	"</tr>";
								$("#publicSchoolPoiDataRegion").append(html);
								$("#publicTitle2").html(data.param.subTitle + " 학생/교직원 현황");
								
								//상위 학교 평균 학생수
								html  =	"<tr>";
								html +=		"<td>"+schoolSggData.sggAvg.stdnt_cnt+"</td>";
								html +=		"<td>"+schoolSggData.sggAvg.tcher_cnt+"</td>";
								html +=	"</tr>";	
								$("#publicSchoolPoiDataRegion2").append(html);
								$("#publicTitle3").html(schoolSggData.sggAvg.sgg_nm + " "+schoolSggData.sggAvg.elsm+ " 평균 학생/교직원수");
								break;
							case 7:
								$("#publicMetroPoiDataRegion").show();
								var dateTitle = ""; 
								var dateType = {
										hour1_psn_cnt  : "00시 ~ 01시",
										hour2_psn_cnt  : "01시 ~ 02시",
										hour3_psn_cnt  : "02시 ~ 03시",
										hour4_psn_cnt  : "03시 ~ 04시",
										hour5_psn_cnt  : "04시 ~ 05시",
										hour6_psn_cnt  : "05시 ~ 06시",
										hour7_psn_cnt  : "06시 ~ 07시",
										hour8_psn_cnt  : "07시 ~ 08시",
										hour9_psn_cnt  : "08시 ~ 09시",
										hour10_psn_cnt : "09시 ~ 10시",
										hour11_psn_cnt : "10시 ~ 11시",
										hour12_psn_cnt : "11시 ~ 12시",
										hour13_psn_cnt : "12시 ~ 13시",
										hour14_psn_cnt : "13시 ~ 14시",
										hour15_psn_cnt : "14시 ~ 15시",
										hour16_psn_cnt : "15시 ~ 16시",
										hour17_psn_cnt : "16시 ~ 17시",
										hour18_psn_cnt : "17시 ~ 18시",
										hour19_psn_cnt : "18시 ~ 19시",
										hour20_psn_cnt : "19시 ~ 20시",
										hour21_psn_cnt : "20시 ~ 21시",
										hour22_psn_cnt : "21시 ~ 22시",
										hour23_psn_cnt : "22시 ~ 23시",
										hour24_psn_cnt : "23시 ~ 24시",
								};
								
								var html  = "";
								var tmpData = [];
								if (poiData.onResult != undefined) {
									dateTitle = "시간별";
									for (var p in poiData.onResult) {
										if (p.indexOf("cnt") != -1) {
											var idx = parseInt(p.split("_")[0].split("hour")[1]);
											tmpData[idx-1] = {
												title:dateType[p], 
												onData:poiData.onResult[p], 
												offData:poiData.offResult[p], 
												onSum:poiData.onResult["hour_psn_sum"],
												offSum:poiData.offResult["hour_psn_sum"]
											};
										}
									}	
								}else if (poiData.monthOnList != undefined) {
									dateTitle = "월별";
									var onSum = 0, offSum = 0;
									for (var i=0; i<poiData.monthOnList.length; i++) {
										tmpData[i] = {
											title:poiData.monthOnList[i].surv_dt+"월", 
											onData:poiData.monthOnList[i].hour_psn_avg, 
											offData:poiData.monthOffList[i].hour_psn_avg, 
										};
										onSum += parseInt(poiData.monthOnList[i].hour_psn_avg);
										offSum += parseInt(poiData.monthOffList[i].hour_psn_avg);
									}
									tmpData[0]["onSum"] = onSum;
									tmpData[0]["offSum"] = offSum;
								}else {
									dateTitle = "요일별";
									var onSum = 0, offSum = 0;
									for (var i=0; i<poiData.weekOnList.length; i++) {
										tmpData[i] = {
											title:poiData.weekOnList[i].surv_dt, 
											onData:poiData.weekOnList[i].hour_psn_avg, 
											offData:poiData.weekOffList[i].hour_psn_avg, 
										};
										onSum += parseInt(poiData.weekOnList[i].hour_psn_avg);
										offSum += parseInt(poiData.weekOffList[i].hour_psn_avg);
									}
									tmpData[0]["onSum"] = onSum;
									tmpData[0]["offSum"] = offSum;
								}
								
								for (var i=0; i<tmpData.length; i++) {
									html +=	"<tr>";
									html += 	"<td>"+tmpData[i].title+"</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[i].onData)+"</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[i].offData)+"</td>";
									html += "</tr>";
								}
								
								if (tmpData[0].onSum != undefined) {
									html += "<tr>";
									html += 	"<td>합계</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[0].onSum)+"</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[0].offSum)+"</td>";
									html +=	"</tr>";
								}
								
								$("#publicMetroPoiDataRegion").append(html);
								$("#publicTitle4").html(dateTitle+" "+data.param.subTitle+" 승하차인원정보");
								
								break;
							case 8:
								break;
								
							//===== 2017.07.11 [개발팀] kcu 공공데이터 추가 - 세종권역 통행흐름정보 START =====//	
							case 9:
								$("#publicCctvPoiDataRegion").show();
								$("#publicBrtPoiDataRegion").show();

								//cctv 목록
								var html = "";
								for (var i=0; i<cctvPoiData.length; i++) {
									html +=	"<tr>";
									html += 	"<td>"+cctvPoiData[i].cctv_no+"</td>";
									html += 	"<td style='text-align:left;padding-left:10px;'>"+cctvPoiData[i].lc_nm+"</td>";
									html +=		"<td style='text-align:left;padding-left:10px;'>"+cctvPoiData[i].path_nm+"</td>";
									html +=		"<td style='text-align:left;padding-left:10px;'>"+cctvPoiData[i].addr+"</td>";
									html +=		"<td>"+appendCommaToNumber(cctvPoiData[i].recent_6_month_day_avg_pasng_cnt)+"</td>"; //6개월간 평균데이터
									html += "</tr>";
								}
								$("#publicCctvPoiDataRegion").append(html);
								
								//brt목록
								html = "";
								for (var i=0; i<brtPoiData.length; i++) {
									html +=	"<tr>";
									html += 	"<td>"+brtPoiData[i].busstop_no+"</td>";
									html += 	"<td style='text-align:left;padding-left:10px;'>"+brtPoiData[i].busstop_nm+"</td>";		//버스정류장명
									html +=		"<td style='text-align:left;padding-left:10px;'>"+brtPoiData[i].path_nm+"</td>";		//방향
									html +=		"<td>"+appendCommaToNumber(brtPoiData[i].recent_6_month_day_avg_tkcar_psn_cnt)+"</td>";	//6개월간 평균승차정보
									html +=		"<td>"+appendCommaToNumber(brtPoiData[i].recent_6_month_day_avg_gff_psn_cnt)+"</td>";	//6개월간 평균하차정보
									html += "</tr>";
								}
								$("#publicBrtPoiDataRegion").append(html);
								
								//cctv 월별통계
								html = "";
								if (monthData != undefined) {
									var isCCTV = true;
									var element = "";
									for (var i=0; i<monthData.length; i++) {
										if (i==0) {
											if (monthData[i].cctv_lc_id != undefined) { //cctv
												element = "#publicCctvMonthDataRegion";
												$(element).show();
												$(element).find("#cctvName").html("월별통계 - "+data.param.subTitle);
												isCCTV = true;
											}else { //brt
												element = "#publicBrtMonthDataRegion";
												$(element).show();
												$(element).find("#brtName").html("월별통계 - "+data.param.subTitle);
												isCCTV = false;
											}
										}
										
										if (isCCTV) {
											html +=	"<tr>";
											html += 	"<td>"+monthData[i].base_ym+"</td>";
											html += 	"<td>"+appendCommaToNumber(monthData[i].mdwk_day_avg_pasng_cnt)+"</td>";			//주중평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].weekend_day_avg_pasng_cnt)+"</td>";			//주말평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].attend_ts_time_pr_avg_pasng_cnt)+"</td>";	//출근시간평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].lvffc_ts_time_pr_avg_pasng_cnt)+"</td>";	//퇴근시간평균
											html += "</tr>";
											$("#publicCctvMonthDataRegion").append(html);
										}else {
											html +=	"<tr>";
											html += 	"<td>"+monthData[i].base_ym+"</td>";
											html += 	"<td>"+appendCommaToNumber(monthData[i].mdwk_day_avg_tkcar_psn_cnt)+"</td>";			//주중 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].mdwk_day_avg_gff_psn_cnt)+"</td>";				//주중 하차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].weekend_day_avg_tkcar_psn_cnt)+"</td>";			//주말 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].weekend_day_avg_gff_psn_cnt)+"</td>";			//주말 하차평균
											html += 	"<td>"+appendCommaToNumber(monthData[i].attend_ts_time_pr_avg_tkcar_psn_cnt)+"</td>";	//출근시간 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].attend_ts_time_pr_avg_gff_psn_cnt)+"</td>";		//출근시간 하차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].lvffc_ts_time_pr_avg_tkcar_psn_cnt)+"</td>";	//퇴근시간 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].lvffc_ts_time_pr_avg_gff_psn_cnt)+"</td>";		//퇴근시간 하차평균
											html += "</tr>";
											
										}
									}
									$(element).append(html);
								}
								
								//cctv 시간대별 통계
								if (timeData != undefined) {
									var isCCTV = true;
									var tmpLdata = [];
									for (var i=0; i<timeData.timeSeriesInfo.length; i++) {
										var tmpData = timeData.timeSeriesInfo[i];
										if (i==0) {
											if (tmpData.cctv_lc_id != undefined) {
												isCCTV = true;
												$("#publicCctvTimeDataRegion").show();
												$("#publicCctvTimeDataRegion").find("#cctvName").html("시간대별통계 - "+data.param.subTitle);
												tmpCellData = {"base_ym" : null, "time" : null, "mkdw" : null , "weekend" : null };
											}else {
												isCCTV = false;
												$("#publicBrtTimeDataRegion").show();
												$("#publicBrtTimeDataRegion").find("#brtName").html("시간대별통계 - "+data.param.subTitle);
												tmpCellData = {"base_ym" : null, "time" : null, "mkdwOn" : null, "mkdwOff" : null, "weekendOn" : null, "weekendOff" : null };
											}
										}
										
										//cctv
										if (isCCTV) {
											switch(parseInt(tmpData.weekend_div)) {
												case 1: //주중
													for (var k=0; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.mkdw = tmpData["hour_"+k+"_avg_pasng_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].mkdw = tmpData["hour_"+k+"_avg_pasng_cnt"];
														}
													}
													break;
												case 2: //주말
													for (var k=0; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.weekend = tmpData["hour_"+k+"_avg_pasng_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].weekend = tmpData["hour_"+k+"_avg_pasng_cnt"];
														}													
													}
													break;
											}
										}else { //brt
											switch(parseInt(tmpData.weekend_div)) {
												case 1: //주중
													for (var k=6; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.mkdwOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpCellData.mkdwOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].mkdwOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpLdata[k].mkdwOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
														}
													}
													break;
												case 2: //주말
													for (var k=6; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.weekendOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpCellData.weekednOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].weekendOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpLdata[k].weekendOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
														}													
													}
													break;
											}
										}
									}
									
									if (isCCTV) {
										html = "";
										for (var i=0; i<tmpLdata.length; i++) {
											html +=	"<tr>";
											html += 	"<td>"+tmpLdata[i].base_ym+"</td>";	//년월
											html += 	"<td>"+tmpLdata[i].time+"</td>";	//시간
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].mkdw)+"</td>";	 //주중
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].weekend)+"</td>"; //주말
											html += "</tr>";
										}
										$("#publicCctvTimeDataRegion").append(html);
									}else {
										html = "";
										for (var i=0; i<tmpLdata.length; i++) {
											html +=	"<tr>";
											html += 	"<td>"+tmpLdata[i].base_ym+"</td>";	//년월
											html += 	"<td>"+tmpLdata[i].time+"</td>";	//시간
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].mkdwOn)+"</td>";		//주간승차
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].mkdwOff)+"</td>";	//주간하차
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].weekendOn)+"</td>";	//주말승차
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].weekendOff)+"</td>";	//주말하차
											html += "</tr>";
										}
										$("#publicBrtTimeDataRegion").append(html);
									}
									
									//cctv 요일별 통계
									html = "";
									var element = "";
									for (var i=0; i<timeData.dayOfWeekInfo.length; i++) {
										var tmpData = timeData.dayOfWeekInfo[i];
										if (i==0) {
											if (tmpData.cctv_lc_id != undefined) {
												isCCTV = true;
												element = "#publicCctvDayOfWeekDataRegion";
												$(element).show();
												$(element).find("#cctvName").html("요일별통계 - "+data.param.subTitle);
											}else {
												isCCTV = false;
												element = "#publicBrtDayOfWeekDataRegion";
												$(element).show();
												$(element).find("#brtName").html("요일별통계 - "+data.param.subTitle);
											}
										}
										if (isCCTV) {
											html +=	"<tr>";
											html += 	"<td>"+tmpData.base_ym+"</td>";
											switch(parseInt(tmpData.ts_div)) {
												case 1:
													html += "<td>주중</td>";
													break;
												case 2:
													html += "<td>주말</td>";
													break;
												default :
													html += "<td>평균</td>";
													break;
											}
											html +=		"<td>"+appendCommaToNumber(tmpData.mon_time_pr_avg_pasng_cnt)+"</td>";	//월요일
											html +=		"<td>"+appendCommaToNumber(tmpData.tues_time_pr_avg_pasng_cnt)+"</td>";	//화요일
											html +=		"<td>"+appendCommaToNumber(tmpData.wed_time_pr_avg_pasng_cnt)+"</td>";	//수요일
											html +=		"<td>"+appendCommaToNumber(tmpData.thur_time_pr_avg_pasng_cnt)+"</td>";	//목요일
											html +=		"<td>"+appendCommaToNumber(tmpData.fri_time_pr_avg_pasng_cnt)+"</td>";	//금요일
											html +=		"<td>"+appendCommaToNumber(tmpData.sat_time_pr_avg_pasng_cnt)+"</td>";	//토요일
											html +=		"<td>"+appendCommaToNumber(tmpData.sun_time_pr_avg_pasng_cnt)+"</td>";	//일요일
											html += "</tr>";	
										}else {
											html +=	"<tr>";
											html += 	"<td>"+tmpData.base_ym+"</td>";
											switch(parseInt(tmpData.ts_div)) {
												case 1:
													html += "<td>주중</td>";
													break;
												case 2:
													html += "<td>주말</td>";
													break;
												default :
													html += "<td>평균</td>";
													break;
											}
											html +=		"<td>"+appendCommaToNumber(tmpData.mon_time_pr_avg_tkcar_psn_cnt)+"</td>";	//월요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.mon_time_pr_avg_gff_psn_cnt)+"</td>";	//월요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.tues_time_pr_avg_tkcar_psn_cnt)+"</td>";	//화요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.tues_time_pr_avg_gff_psn_cnt)+"</td>";	//화요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.wed_time_pr_avg_tkcar_psn_cnt)+"</td>";	//수요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.wed_time_pr_avg_gff_psn_cnt)+"</td>";	//수요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.thur_time_pr_avg_tkcar_psn_cnt)+"</td>";	//목요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.thur_time_pr_avg_gff_psn_cnt)+"</td>";	//목요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.fri_time_pr_avg_tkcar_psn_cnt)+"</td>";	//금요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.fri_time_pr_avg_gff_psn_cnt)+"</td>";	//금요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.sat_time_pr_avg_tkcar_psn_cnt)+"</td>";	//토요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.sat_time_pr_avg_gff_psn_cnt)+"</td>";	//토요일 하차 
											html +=		"<td>"+appendCommaToNumber(tmpData.sun_time_pr_avg_tkcar_psn_cnt)+"</td>";	//일요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.sun_time_pr_avg_gff_psn_cnt)+"</td>";	//일요일 하차
											html += "</tr>";	
										}
									}
									$(element).append(html);
								}
								break;
								//===== 2017.07.11 [개발팀] kcu 공공데이터 추가 - 세종권역 통행흐름정보 END =====//	
							default:
								break;
						}
						
						//해당지점 반경내 정보
						var html  = "<tr>"
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.ppltn_cnt)+"</td>";
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.family_cnt)+"</td>";
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.resid_cnt)+"</td>";
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.corp_cnt)+"</td>";
							html += "</tr>";
						$("#publicCicleDataRegion").append(html);
						
						//해당지점 반경내 사업체정보
						html = "";
						for (var i=0; i<tmpCircleData.length; i++) {
							html += "<tr>";
							html +=		"<td colspan=2>"+tmpCircleData[i].title+"</td>";
							html +=		"<td>"+tmpCircleData[i].data+"</td>";
							html +=		"<td>"+(i+1)+"</td>";
							html += "</tr>";
						}
						$("#publicCicleCompanyDataRegion").append(html);
						$("#mask").hide();
					}
					//나의데이터
					else if (this.mapType == "userData") {
						var tmpData = data.data;
						$("#interactiveMapTableRegion").hide();
						$("#myDataRegion").show();
						
						var html = "";
						var width = 0;
						for (var i=0; i<tmpData.rowHeaderArray.length; i++) {
							if (i==0) {
								html += "<col width=''/>";
								width = Math.round(760/tmpData.rowHeaderArray.length);
							}
							html += "<col width='"+width+"'/>";
						}
						$("#myDataRegion").find("#colgroup").append(html);
						
						html  = "<tr>";
						html += 	"<th>순서</th>"; 
						for (var i=0; i<tmpData.rowHeaderArray.length; i++) {
							html += "<th>"+tmpData.rowHeaderArray[i].COL_NM+"</th>";
						}
						html += "</tr>";
						
						for (var i=0; i<tmpData.rowDataArray.length; i++) {
							var Ldata = tmpData.rowDataArray[i].USR_DATA;
							html += "<tr>";
							html += 	"<td>"+(i+1)+"</td>";
							for (var x=0; x<Ldata.length; x++) {
								for (var p in Ldata[x]) {
									if (p != "COL_NM") {
										html +=	"<td>"+Ldata[x][p]+"</td>";
										break;
									}
								}
							}
							html += "</tr>";
						}
						
						$("#myDataRegion").find("#tBody").append(html);
						$("#mask").hide();
					}
					//poi
					else if (this.mapType == "poi") {
						$("#interactiveMapTableRegion").hide();
						$("#poiRegion").show();
						var tmpData = data.data;
						if (tmpData != undefined && tmpData != null) {
							var html = "";
							var cnt = 1;
							tmpData.eachLayer(function(layer) {
								html += "<tr>"
								html +=		"<td>"+cnt+"</td>";
								html +=		"<td>"+layer.info.corp_nm+"</td>";
								html +=		"<td>"+layer.info.naddr+"</td>";
								html +=		"<td>"+layer.info.x+"</td>";
								html +=		"<td>"+layer.info.y+"</td>";
								html += "</tr>";
								cnt++;
							});
							$("#poiRegion").append(html);
						}
						$("#mask").hide();
					}
				},
				
				/**
				 * @name         : getGridData
				 * @description  : 표 정보를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				getGridData : function(geojson, tmpDataList, adm_cd, options) {
					var adm_nm, coord_x, coord_y;
					var value = 0;
					var rate = 0;
					var color = "#F0FFF0";
					for (var i=0; i<geojson.features.length; i++) {
						var feature = geojson.features[i];
						adm_nm = feature.properties.adm_nm;
						adm_cd = feature.properties.adm_cd;
						
						coord_x = feature.properties.x;
						coord_y = feature.properties.y;
						value = 0;
						rate = 0;
						color = "#F0FFF0";
													
						if (feature.info.length > 0) {
							var tmpValue = null;
							if (feature.isKosis != undefined && feature.isKosis) {
								info = feature.info;
								tmpValue = info[0];
							}else {
								info = feature.info[0];
								tmpValue = info[info.showData];
//								adm_cd = info.adm_cd;
							}
							value = parseFloat(tmpValue);
							rate = (parseFloat(tmpValue) / options.total) * 100;
							color = options.legend.getColor(value, options.legend.valPerSlice[0])[0];
						}
						var param = {
								adm_cd : adm_cd,
								adm_nm :adm_nm,
								value : value,
								rate : rate,
								color : color,
								x : coord_x,
								y : coord_y,
								_dataIdx : feature._dataIdx
						}
						tmpDataList.push(param);
					}
				},
				
				/**
				 * @name         : drawGrid
				 * @description  : 표를 표출한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				drawGrid : function(data) {
					var gridList = data.dataList;
					var total = data.total;
					var unit = data.unit;
					var adm_nm = data.adm_nm;
					var adm_cd = data.adm_cd;
					var html = "";
					
					for (var i=0; i<gridList.length; i++) {
						html += "<tr>";
						html += 	"<td class='al' id='adm_nm_"+i+"'>"+gridList[i].adm_nm+"</td>";
						
						if( adm_cd.length > 7 ){
							html += 	"<td class='al' id='adm_cd_"+i+"'>"+gridList[i].adm_cd+"</td>";
						}
						
		 				html += 	"<td class='ar'><div class='valueBox'><span class='bg' style='background:"+gridList[i].color+"'></span><span class='txt'>"+(i+1)+"</span></div></td>";

		 				if(gridList[i].value == 0) {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>N/A</span></td>";
		 				} else {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(gridList[i].value/gridList[0].value*100)+"%; background:rgba(76,139,253,1); '></span><span class='txt'>"+appendCommaToNumber(gridList[i].value)+"</span></td>";
		 				}
		 				
		 	 			html += "<td class='ar'><div class='valueBox'><span class='txt'>"+gridList[i].rate.toFixed(2)+"</span></div></td>";
		 				html += "</tr>";
					}
					$("#mask").hide();
					$("#interactiveMapTableRegion").find("#tBody").append(html);
					//$("#tAdmName").html(adm_nm);
					$("#tUnit").html(unit);
					$("#tTotal").html(appendCommaToNumber(total));
					
					if( adm_cd.length > 7 ){
						$("#tAdmCd").css("display", "");
						$("#tColspan").prop("colspan", "3");
					} else {
						$("#tAdmCd").css("display", "none");
						$("#tColspan").prop("colspan", "2");
					}
					
				},
				
				/**
				 * @name         : addBarChart
				 * @description  : 바차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				addBarChart : function(divId, param, width, height) {
					$(divId).highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', height: height, width:width
				        },
				        exporting: { enabled: false }, //2017.03.13 pdf저장 이슈
				        title: {
				            text: ''
				        },
				        xAxis: {
				            categories: param.categories,
				            labels : {
				            	rotation: -45,
				            	enabled: param.isLabel
				            }
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ""
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
				            name: param.title,
				            data: param.dataList,
				            color: '#2951f2'
				        }]
				    });
					
					//2017.03.13 pdf저장 이슈
					setTimeout(function() {
						$reportForm.Util.chartToImage(divId, ".pntChart");
					}, 300);
					
				},
				
				/**
				 * @name         : onOffDiv
				 * @description  : 보고서 항목을 on/off한다.
				 * @date         : 2016. 08. 29. 
				 * @author	     : 
				 * @param data   : 보고서 div
				 */
				onOffDiv : function(value) {
					if($("#" + value).css("display") == "none"){
						$("#" + value + "_show").hide();
						$("#" + value).show();
					}else{
						$("#" + value).hide();
						$("#" + value + "_show").show();
					}
				},
				
				/**
				 * @name         : setNewDiv
				 * @description  : 변경된 보고서디자인을 적용한다(공공데이터 제외)
				 * @date         : 2016. 08. 29. 
				 * @author	     : 
				 * @param data   : 보고서데이터(mapType)
				 */
				setNewDiv : function(data) {
					if(data == 'publicData'){
						$("#interactiveTopDiv").remove();
						$("#poiDiv").remove();
					}else if (data == "poi") {
						$("#interactiveTopDiv").remove();
						$("#bizStatsTopDiv").remove();
					}
					else{
						$("#bizStatsTopDiv").remove();
						$("#poiDiv").remove();
					}
				}
				
				
		 		
		 		
		 		
	},

	$reportForm.Util = {
				//Data를 순서대로 정렬하고, 비율 삽입
				tableDataSort : function(data) {
					var totalSum = 0;
		 	 		data.sort(function(a, b){
		 	 			var x = Number(a.value);
		 	 			var y = Number(b.value);
		 	 			if (x > y) return -1;
		 	 			if (x < y) return 1;
		 	 			return 0;
		 	 		});
		 	 		
		 	 		totalSum = this.tableDataSum(data);
		 	 		for(var i = 0; i < data.length; i ++) {	//비율 구하기
		 	 			if(data[i].value == 0) {
		 	 				data[i].rate = 0;
		 	 			} else {
		 	 				data[i].rate = (data[i].value / totalSum * 100).toFixed(1);
		 	 			}
		 	 		}
		 	 		return data;
				},
				
				//지역과 데이터 매핑
				admCdSet : function(admCdList, data) {
					var dataList = [];
					var tmpObj = {};
					//지역 데이터
					for(var i = 0; i < admCdList.length; i ++) {
						var admNm = admCdList[i].adm_nm;
						var admCd = admCdList[i].adm_cd;
						//기본값
						tmpObj = {
								item : admNm,
								itemCd : admCd,
								value : 0,
								color : "#fff"
						}
						//정보 데이터
						for(var x = 0; x < data.length; x ++) {
							//지역코드와 매핑
							if(data[x].itemCd == admCd) {
								data[x].item = admNm;
								if(data[x].value == undefined) { data[x].value = 0; }
								tmpObj =data[x];
							}
						}
						dataList.push(tmpObj);
					}
					return dataList;
				},
				
				//Data 총 합계 구하기
				tableDataSum : function(data) {
					var totalSum = 0;
					for(var i = 0; i < data.length; i ++) {
		 	 			totalSum += Number(data[i].value);
		 	 		}
					return totalSum;
				},
				
				//오늘날짜 가져오기
				getToday : function() {
					var today = new Date();
	 	 			var y = today.getFullYear();
	 	 			var m = today.getMonth()+1;
	 	 			var d = today.getDate();
	 	 			var h = today.getHours();
	 	 			var mn = today.getMinutes();
	 	 			
	 	 			var returnDate = "";
	 	 			if(m < 10) {
	 	 				m = "0" + m;
	 	 			}
	 	 			if(d < 10) {
	 	 				d = "0" + d;
	 	 			}
	 	 			if(h < 10) {
	 	 				h = "0" + h;
	 	 			}
	 	 			if(mn < 10) {
	 	 				mn = "0" + mn;
	 	 			}
	 	 			returnDate = y + "년 " + m + "월 " + d + "일 " + h + "시 " + mn + "분";
	 	 			
	 	 			return returnDate;
				},
				
				//천단위 콤마
				addComma : function(num) {
					var len, point, str;
					
					num = num + "";
					var tmpNum = null;
					var tmpMod = null;
					if (num.indexOf(".") == -1) {
						tmpNum = num;
					}else {
						tmpNum = num.split(".")[0];
						tmpMod = "." + num.split(".")[1];
					}

					point = tmpNum.length % 3;
					len = tmpNum.length;
					
					str = tmpNum.substring(0, point);
					while (point < len) {
						if (str != "")
							str += ",";
						str += tmpNum.substring(point, point + 3);
						point += 3;
					}

					if (tmpMod != null && tmpMod.length > 0) {
						str = str + tmpMod;
					}
					return str;
				},
				
				chartToImage : function(srcDiv, dscDiv) {				    
					//2017.03.13 pdf저장 이슈
					var render_width = 798;
				    var render_height = 220;
				    var image = document.createElement('img');
				    image.height = render_height;
				    image.width = render_width;
				    setTimeout(function() {
				    	 var doc = document.querySelector(srcDiv);
						 var svg = doc.querySelector("svg");
						 var xml  = new XMLSerializer().serializeToString(svg);
		                 var canvas = document.createElement("canvas");
		                 canvg(canvas, xml);
		                 $(image).attr("src", canvas.toDataURL());
		                 $(dscDiv).empty();
		                 $(dscDiv).append(image);
				    }, 500);  
				}
				
	},
	
	$reportForm.Request = {
			/**
			 * @name         : reportReverseGeoCode
			 * @description  : OpenAPI 리버스지오코딩 (집계구 주소 변환)
			 * @date         : 2015. 07. 30. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param  center
			 * @param  options
			 */
			reportReverseGeoCode : function (x, y, optData, idx) {
				var sopReportReverseGeoCodeObj = new sop.report.ReverseGeoCode.api();
				sopReportReverseGeoCodeObj.addParam("accessToken", accessToken);
				sopReportReverseGeoCodeObj.addParam("addr_type", "10");
				sopReportReverseGeoCodeObj.addParam("x_coor", x);
				sopReportReverseGeoCodeObj.addParam("y_coor", y);
				
				sopReportReverseGeoCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						data : optData,
						idx : idx,
						x : x,
						y : y
					}
				});
			}
	};
	
	/** ********* OpenAPI 보고서용 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.report.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var idx = options.idx;
				var data = options.data;
				var coord_x = options.x;
				var coord_y = options.y;
				var length = data.dataList.length;
				var adm_nm = "";
				var adm_cd = "";
				
				var dataIdx = data.dataList[idx]._dataIdx;
				
				var dong = "";
				
				var dongArr = data.dataList[idx].adm_nm.split(" ");
				dong = dongArr[dongArr.length-1];
				
				if( dong == '' || dong == null ){
					dong = "";
				} else {
					if( dong.indexOf("(") < 0 ){
						dong = "(" + dong + (dataIdx ? "_" + dataIdx : "") + ")";
					}
				}
				
				switch(res.errCd) {
					case 0:
						if (idx < length) {
							var fullAddr = result[0].full_addr.split(" ");
							var roadNm = "";
							if(fullAddr.length < 4) {
								roadNm = "";
							} else {
								roadNm = fullAddr[fullAddr.length - 2] + " " + fullAddr[fullAddr.length - 1] + " 부근 " ;
							}		
							adm_nm = roadNm;
							adm_cd = data.dataList[idx].adm_cd;
							
//							data.dataList[idx].adm_nm = adm_nm;
							$("#adm_nm_"+idx).html( dong + adm_nm);
							$("#adm_cd_"+idx).html(adm_cd);
							
							/*idx++;
							if (idx < length) {
								$reportForm.Request.reportReverseGeoCode(data.dataList[idx].x, data.dataList[idx].y, data, idx);
							}*/
						}
						break;
					case -401:
						accessTokenInfo(function() {
							$reportForm.Request.reportReverseGeoCode(coord_x, coord_y, data, idx);
						});
						break;
					case -100:
						adm_nm = dong;
						adm_cd = data.dataList[idx].adm_cd;
						
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
						$("#adm_cd_"+idx).html(adm_cd);
						
						idx++;
						if (idx < length) {
							$reportForm.
							Request.reportReverseGeoCode(data.dataList[idx].x, data.dataList[idx].y, data, idx);
						}
						break;
					default:
						adm_nm = dong;
						adm_cd = data.dataList[idx].adm_cd;
						
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
						$("#adm_cd_"+idx).html(adm_cd);
						break;
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 보고서용 리버스지오코딩. End ********* */
	
}(window, document));


