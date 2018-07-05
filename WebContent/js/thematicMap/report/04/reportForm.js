/**
 * 
 */
(function(W, D) {
	W.$reportForm = W.$reportForm || {}
	
	$(document).ready(function() {	
	});
	
	$(window).load(function() {
		setTimeout(function() {
			if (window.opener.$thematicMapFrame04 != undefined) {
				window.opener.$thematicMapFrame04.ui.reportLoad();
			}
		}, 500);
	});

	$reportForm.ui = {
				map : null,
				datas : null,
				mapType : null,
				totalDataList : null,
				dataGeojson : [],
				poiJson : [],
				menuType : {
					"intro"     : 0,
					"jobArea"   : 1,
					"jobChange" : 2,
					"areaInfo"  : 3,
					"areaSearch": 4
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
						window.opener.$thematicMapFrame04.ui.reportLoad();
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
				setData : function(data, options,dataGeoJson, poiJson) {
					this.datas = data;
					this.mapType = options.mapType;
					this.drawMap(options);
					this.setMainReportInfo(data);
					this.setLegend(data, options);
					this.setChart(data, options,dataGeoJson);
					//datageojson을 가져와서 표에 넣을 것.
					this.setGrid(data, options,dataGeoJson);
					
					if(poiJson != undefined && poiJson != null) {
						$("#poiInfoTable").show();
						this.drawPOIGrid(poiJson);
					} else {
						$("#poiInfoTable").hide();
					}
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
	 	 			}
					
					$(clone).find(".sop-control").hide();
					$("#reportMapDiv").html($(clone).html());
					$("#reportMapDiv").css(reportMapCss);*/
					
					//2017.03.09 보고서 수정
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
					
					$("#reportMapDiv").attr("src", options.mapData);
					$("#reportMapDiv").css(reportMapCss);
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
					
					//통계주제도
					if (this.mapType == "thematicMap") {
						mainTitle = data.param.title + "("+data.data.result[0].base_year+")";
						searchTitle =  mainTitle;
					}

					$("#reportTitle").html(mainTitle);
					$("#searchItem").html(searchTitle);
					$("#date").html(date);
					$("#origin").html(data.origin); //출처
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
					if (window.opener.$thematicMapFrame04 != undefined) {
						map = window.opener.$thematicMapFrame04.ui.mapList[data.id];
					}
					
					//대화형통계지도
//					if (this.mapType == "interactiveMap") {
					if (this.mapType == "thematicMap") {
						if (data.param.isKosis != undefined && data.param.isKosis) {
							unit = data.data[0].UNIT;
						}else {
							//임시
							if(data.selectOption=="leftValue"){
								unit = data.param.left_sep_unit;
							}else{
								// 2017. 03. 10 개발팀 수정요청
								unit = data.data.result[0].unit;
							}
								
						}
						legend = $(map.legend.legendObj).clone().removeClass("min");
						title = "범례 (단위 : " + unit + ")";
						
						$("#legend").append($(legend).html());
						$("#legendTitle").html(title);
						$("#legend").find(".legendBox").removeClass("min");
						$("#legend").find(".legendRound").hide();
						$("#legend").find(".lgListBox").hide();
						$("#legend").find(".legendRrefresh").css("right", "13px");
					}else {
						switch(this.menuType[data.dataType]) {
							case 0:
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
								//$("#legend").find(".jQWCP-wHSVGroup").hide();
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
				setChart : function(data, options,dataGeoJson) {
					//대화형통계지도
					if (this.mapType == "thematicMap") {
						var labelsVisible = true;
						var title = data.param.title;
						var categoryList = [];
						var retDataList = [];
						
						if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
							for(var i=0; i<data.geojson.length; i++) {
								var geojson = data.geojson[i];
								for (var k=0; k<geojson.features.length; k++) {
									var layer = geojson.features[k];
									if (layer.properties.adm_cd.length > 7) {
										labelsVisible = false;
									}
									var tmpAdmName = layer.properties.adm_nm.split(" ");
									var adm_nm = "";
									if (tmpAdmName.length > 1) {
										adm_nm = tmpAdmName[tmpAdmName.length-1];
									}else {
										adm_nm = tmpAdmName[0];
									}
									categoryList.push(adm_nm);
									if (layer.info.length > 0) {
										var info = layer.info[0];
										retDataList.push(parseFloat(info[info.showData]));
									}
								}
							}
						}else {
							for (var i=0; i<dataGeoJson.length;i++){					
//									for(var k=0;k<100000;k++){
//										if(!dataGeoJson[i]._layers[k]){
//											continue;//null, undefiend, 빈 원소일때 건너 띔
//										}
//										var layer = dataGeoJson[i]._layers[k].feature;							
								
									dataGeoJson[i].eachLayer(function(layer) {
										var layer = layer.feature;
								
										if (layer.properties.adm_cd.length > 7) {
											labelsVisible = false;
										}
										var tmpAdmName = layer.properties.adm_nm.split(" ");
										var adm_nm = "";
										if (tmpAdmName.length > 1) {
											adm_nm = tmpAdmName[tmpAdmName.length-1];
										}else {
											adm_nm = tmpAdmName[0];
										}
																	
										categoryList.push(adm_nm);
										if (layer.info.length > 0) {
											var info = null;								
											info = layer.info[0];
											retDataList.push(parseFloat(info[info.showData]));
											
										}
									
								    })
							}
							
						}
						
						var param = {
								title : title,
								categories : categoryList,
								dataList : retDataList,
								isLabel : labelsVisible
						};
//						this.addBarChart("#barChartDiv", param, 520, 220);	
						this.totalDataList = retDataList;
					}					
				},
				
				/**
				 * @name         : setGrid
				 * @description  : 표를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setGrid : function(data, options,dataGeoJson) {
					//대화형통계지도
					if (this.mapType == "thematicMap") {
						var unit = '';
						if(data.selectOption=="leftValue"){
							unit = data.data.result[0].base_year+"년 "+data.param.left_sep_ttip_title+"("+data.param.left_sep_unit+")"; // 우선 임시 왼쪽만
							
						}else{
							// 2017. 03. 10 개발팀 수정요청
//							unit = data.param.right_sep_ttip_title+"("+data.param.right_sep_unit+")";
							unit = data.data.result[0].base_year+"년 "+data.data.result[0].right_sep_ttip_title+"("+data.data.result[0].unit+")"; // 우선 임시 왼쪽만
						}
						
						var adm_nm = "지역";
						var total = 0;
						for (var i=0; i<this.totalDataList.length; i++) {
							total += this.totalDataList[i];
						}
						
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
							this.getGridData(data.geojson, tmpDataList, adm_cd, options,dataGeoJson);
						}
						
						var gridList = tmpDataList.sort(function (a, b) {
							return b.value - a.value 
						});
						
						var options = {
								dataList : gridList,
								total : total,
								unit : unit,
								adm_nm : adm_nm
						};
						this.drawGrid(options,data);
						
						if (adm_cd.length > 7) {
							for (var i=0; i<gridList.length; i++) {
								$reportForm.Request.reportReverseGeoCode(gridList[i].x, gridList[i].y, options, i);
							}
						}
					}
					
//					else {
//						switch(this.menuType[data.dataType]) {
//							case 0:
//								$("#interactiveMapTableRegion").hide();
//								$("#bizStatsMapIntro1TableRegion").show();
//								$("#bizStatsMapIntro2TableRegion").show();
//								
//								var curRegionData, upperRegionData, curSidoRankData;
//								var curRegionTitle = data.param.adm_nm + " " + "비율(%)";
//								var tmpData = data.data;
//								for (var i=0; i<tmpData.length; i++) {
//									if (tmpData[i].type == "sidoPieChart") {
//										curRegionData = tmpData[i].data;
//									}else if (tmpData[i].type == "contryPieChart") {
//										upperRegionData = tmpData[i].data;
//									}else if (tmpData[i].type == "introRank") {
//										curSidoRankData = tmpData[i].data;
//									}
//								}
//									
//								var itemName = {
//										"lodgebiz_per" : "숙박업",
//										"rstrt_per"	   : "음식점",
//										"srv_per"	   : "서비스",
//										"whrtlsal_per" : "도소매"
//								};
//								var html = "";
//								if (curRegionData != undefined && curRegionData != null) {
//									for (p in curRegionData) {
//										if (p == "lodgebiz_per" || 
//											p == "rstrt_per"    ||
//											p == "srv_per"		||
//											p == "whrtlsal_per") {
//											html += "<tr>";
//											html +=		"<td>"+itemName[p]+"</td>";
//											html +=		"<td>"+curRegionData[p]+"</td>";
//											if (upperRegionData != undefined && upperRegionData != null) {
//												html += "<td>"+upperRegionData[p]+"</td>";
//											}else {
//												html += "<td></td>";
//											}
//											html +=	"</tr>";
//										}
//									}
//								}
//								
//								var html2 = "";
//								if (curSidoRankData != undefined && curSidoRankData != null) {
//									var result = curSidoRankData.tob_rank;
//									for (var i=0; i<result.length; i++) {
//										html2 += "<tr'>";
//										html2 += 	"<td colspan=2>"+result[i].theme_nm+"</td>";
//										html2 +=	"<td>"+appendCommaToNumber(result[i].corp_cnt)+"</td>";
//										html2 +=	"<td>"+result[i].corp_cnt_rank+"</td>";
//										html2 +=	"<td>"+result[i].corp_per+"</td>";
//										html2 +=	"<td>"+result[i].corp_per_rank+"</td>";
//										html2 +=	"<td>"+result[i].corp_irdsrate+"</td>";
//										html2 +=	"<td>"+result[i].corp_irds_rank+"</td>";
//										html2 +=	"<td>"+appendCommaToNumber(result[i].worker_cnt)+"</td>";
//										html2 +=	"<td>"+result[i].worker_cnt_rank+"</td>";
//										html2 +=	"<td>"+result[i].worker_per+"</td>";
//										html2 +=	"<td>"+result[i].worker_per_rank+"</td>";
//										html2 +=	"<td>"+result[i].worker_irdsrate+"</td>";
//										html2 +=	"<td>"+result[i].worker_irds_rank+"</td>";
//										html2 += "</tr>";
//									}
//								}
//								
//								$("#curRegionTitle").html(curRegionTitle);
//								$("#bizStatsMapIntro1TableRegion").find("#tBody").append(html);
//								$("#bizStatsMapIntro2TableRegion").find("#tBody").append(html2);
//								$("#mask").hide();
//								break;
//							case 1:
//								$("#interactiveMapTableRegion").hide();
//								var tmpGridList = [];
//								var tmpRankData = data.data[1];
//								for (var i=0; i<tmpRankData.data.sgg_info.length; i++) {
//									var lData = tmpRankData.data.sgg_info[i];
//									for (p in lData) {
//										if (p == "corp_cnt") {
//											for (var k=0; k<7; k++) {
//												if (tmpGridList[k] == null || tmpGridList[k] == undefined) {tmpGridList[k] = [];}
//											}
//											tmpGridList[0].push({name:lData.sgg_nm, data:parseFloat(lData.corp_cnt)});
//											tmpGridList[1].push({name:lData.sgg_nm, data:parseFloat(lData.upregion_vs_corp_per)});
//											tmpGridList[2].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_ppltn_rate)});
//											tmpGridList[3].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_worker_rate)});
//											tmpGridList[4].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_family_rate)});
//											tmpGridList[5].push({name:lData.sgg_nm, data:parseFloat(lData.biz_worker_cnt)});
//											tmpGridList[6].push({name:lData.sgg_nm, data:parseFloat(lData.avg_worker_rate)});
//										}
//									} 
//								}
//								
//								for (var i=0; i<tmpGridList.length; i++) {
//									tmpGridList[i] = tmpGridList[i].sort(function (a, b) {
//										return b.data - a.data 
//									});
//									
//									var html =  "";
//									if (i%2 == 0){
//										html += "<table class='pntTable' style='width:395px;float:left;margin-bottom:10px;'>";
//									}else {
//										html += "<table class='pntTable' style='width:395px;float:right;margin-bottom:10px;'>";
//									}
//									
//										html += 	"<colgroup>";
//										html +=			"<col width=''/>";
//										html +=			"<col width=''/>";
//										html +=			"<col width='90'/>";
//										html +=		"</colgroup>";
//										html += 	"<tbody>";
//										html +=			"<tr>";
//										html +=				"<th scope='col' colspan=3>"+options.chart[i].title+"</th>";
//										html +=		    "</tr>";
//										html +=			"<tr>";
//										html +=				"<th scope='col'>지역</th>";
//										html +=				"<th scope='col'>값</th>";
//										html +=				"<th scope='col'>순위</th>";
//										html +=			"</tr>";
//										
//										for (var k=0; k<tmpGridList[i].length; k++) {
//											html += "<tr>";
//											html += 	"<td>"+tmpGridList[i][k].name+"</td>";
//											html +=	 	"<td>"+tmpGridList[i][k].data+"</td>";
//											html +=	 	"<td>"+(k+1)+"</td>";
//											html +=	"</tr>";
//										}
//										
//										html +=		"</tbody>";
//										html ==	"</table>";
//										$("#gridArea").append(html);
//								}
//								$("#mask").hide();
//								break;
//							case 2:
//								$("#interactiveMapTableRegion").hide();
//								var title = data.param.adm_nm + " "+data.param.theme_nm+" "+"시계열 데이터";
//								var tmpTimeseriesData = data.data[0].data.companyList;
//								var total = 0;
//								var html  = "<table class='pntTable' style='margin-bottom:10px;'>";
//								html += 	"<colgroup>";
//								html +=			"<col width='270'/>";
//								html +=			"<col width='270'/>";
//								html +=			"<col width=''/>";
//								html +=		"</colgroup>";
//								html += 	"<tbody>";
//								html +=			"<tr>";
//								html +=				"<th scope='col' colspan=3>"+title+"</th>";
//								html +=		    "</tr>";
//								html +=			"<tr>";
//								html +=				"<th scope='col'>년도</th>";
//								html +=				"<th scope='col'>사업체수(개)</th>";
//								html +=				"<th scope='col'>비율(%)</th>";
//								html +=			"</tr>";
//								
//								for (var i=0; i<tmpTimeseriesData.length; i++) {
//									total += parseFloat(tmpTimeseriesData[i].cnt);
//								}
//								
//								for (var i=0; i<tmpTimeseriesData.length; i++) {
//									html +=			"<tr>";
//									html +=				"<td>"+tmpTimeseriesData[i].base_year+"</td>";
//									html +=				"<td>"+appendCommaToNumber(tmpTimeseriesData[i].cnt)+"</td>";
//									html +=				"<td>"+((parseFloat(tmpTimeseriesData[i].cnt)/total)*100).toFixed(2)+"</td>";
//									html +=			"</tr>";
//								}
//								html +=			"<tr>";
//								html +=				"<td scope='col'>합계</td>";
//								html +=				"<td scope='col'>"+appendCommaToNumber(total)+"</td>";
//								html +=				"<td scope='col'>100</td>";
//								html +=			"</tr>";
//								
//								html +=		"</tbody>";
//								html +=	"</table>";
//								$("#gridArea").append(html);
//								$("#mask").hide();
//								break;
//							default:
//								$("#mask").hide();
//								break;
//						}
//					}
					
					
				},
				
				/**
				 * @name         : getGridData
				 * @description  : 표 정보를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				getGridData : function(geojson, tmpDataList, adm_cd, options,dataGeoJson) {
					var adm_nm, coord_x, coord_y;
					var value = 0;
					var rate = 0;
					var color = "#F0FFF0";
					// 시도, 시군구, 읍면동일 경우
					
					for (var i=0; i<dataGeoJson.length;i++){					
//							for(var k=0;k<100000;k++){
//								if(!dataGeoJson[i]._layers[k]){
//									continue;//null, undefiend, 빈 원소일때 건너 띔
//								}
//								var feature = dataGeoJson[i]._layers[k].feature;
							
							dataGeoJson[i].eachLayer(function(layer){
								var feature = layer.feature;
						
								adm_nm = feature.properties.adm_nm;
								coord_x = feature.properties.x;
								coord_y = feature.properties.y;
								value = 0;
								rate = 0;
								color = "#F0FFF0";															
							
							if (feature.info.length > 0) {
								var tmpValue = null;
								
								info = feature.info[0];
								tmpValue = info[info.showData];							
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
									y : coord_y
							}
							tmpDataList.push(param);	
						})
					
					}
					
					
//					for (var i=0; i<geojson.features.length; i++) {
//						var feature = geojson.features[i];
//						adm_nm = feature.properties.adm_nm;
//						coord_x = feature.properties.x;
//						coord_y = feature.properties.y;
//						value = 0;
//						rate = 0;
//						color = "#F0FFF0";
//													
//						if (feature.info.length > 0) {
//							var tmpValue = null;
//							
//							info = feature.info[0];
//							tmpValue = info[info.showData];							
//							value = parseFloat(tmpValue);
//							rate = (parseFloat(tmpValue) / options.total) * 100;
//							color = options.legend.getColor(value, options.legend.valPerSlice[0])[0];
//						}
//						var param = {
//								adm_cd : adm_cd,
//								adm_nm :adm_nm,
//								value : value,
//								rate : rate,
//								color : color,
//								x : coord_x,
//								y : coord_y
//						}
//						tmpDataList.push(param);					
//					}
					
					
					
					
				},
				
				/**
				 * @name         : drawPOIGrid
				 * @description  : POI 표를 표출한다.
				 * @date         : 2016. 08. 04. 
				 * @author	     : 석진혁
				 * @param data   : 보고서데이터
				 */
				drawPOIGrid : function(data) {
					var gridList = data;
					var html = "";
					for (var i=0; i<gridList.length; i++) {
						html += "<tr>";
						html += 	"<td class='al' >"+gridList[i].class_nm+"</td>";
						html += 	"<td class='al' >"+gridList[i].corp_nm+"</td>";
						html += 	"<td class='al' >"+gridList[i].naddr+"</td>";
						html += 	"<td class='al' >"+gridList[i].worker_sum+"</td>";
						html += "</tr>";
					}
					
					$("#poiInfoTable").find("#tBody").append(html);
				},
				
				/**
				 * @name         : drawGrid
				 * @description  : 표를 표출한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				drawGrid : function(data,param) {
					var gridList = data.dataList;
					var total = data.total;
					var unit = data.unit;
					var adm_nm = data.adm_nm;
					var html = "";
					for (var i=0; i<gridList.length; i++) {
						html += "<tr>";
		 				html += 	"<td class='al' id='adm_nm_"+i+"'>"+gridList[i].adm_nm+"</td>";
		 				html += 	"<td class='ar'><div class='valueBox'><span class='bg' style='background:"+gridList[i].color+"'></span><span class='txt'>"+(i+1)+"</span></div></td>";

		 				if(gridList[i].value == 0) {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>N/A</span></td>";
		 				} else if(gridList[i].value < 0) {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(gridList[i].value/gridList[0].value*100)+"%;'></span><span class='txt'>"+appendCommaToNumber(gridList[i].value)+"</span></td>";
		 				}else{
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(gridList[i].value/gridList[0].value*100)+"%; background:rgba(76,139,253,1); '></span><span class='txt'>"+appendCommaToNumber(gridList[i].value)+"</span></td>";
		 				}
		 				// 2017. 03. 10 개발팀 수정요청
		 				if(param.selectOption=="rightValue"){
		 					html += "<td class='ar'><div class='valueBox'><span class='txt'>"+gridList[i].rate.toFixed(2)+"</span></div></td>";
		 				}
		 				html += "</tr>";
					}
					$("#mask").hide();
					$("#interactiveMapTableRegion").find("#tBody").append(html);
					
//					$("#tAdmName").html(adm_nm);
					$("#tAdmName").html("행정구역");
					$("#tUnit").html(unit);
					if(param.selectOption=="leftValue"){
						$("#percent").remove();
						$("#100").remove();
						$("#col_extra").remove();
						$("#sum").remove();
					}
					
					$("#tTotal").html(appendCommaToNumber(total));
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
				                text: param.title
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
					
					$reportForm.Util.chartToImage(divId, ".pntChart");
				},
				
				/**
				 * @name         : onOffDiv
				 * @description  : 보고서 항목을 on/off한다.
				 * @date         : 2016. 08. 31. 
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
					var chart = $(srcDiv).highcharts();
					var render_width = 520;
				    var render_height = 220;

				    var svg = chart.getSVG({
				        exporting: {
				            sourceWidth: chart.chartWidth,
				            sourceHeight: chart.chartHeight
				        }
				    });

				    $(dscDiv).empty();
				    var image = document.createElement('img');
				    image.height = render_height;
				    image.width = render_width;
				    $(dscDiv).append(image);
				    $(image).attr("src",  'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))));
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
				
				switch(res.errCd) {
					case 0:
						var fullAddr = result[0].full_addr.split(" ");
						var roadNm = "";
						if(fullAddr.length < 4) {
							roadNm = "";
						} else {
							roadNm = fullAddr[fullAddr.length - 2] + " " + fullAddr[fullAddr.length - 1] + " 부근 " ;
						}		
						adm_nm = "(집계구 - " + data.dataList[idx].adm_cd + ") " + roadNm;
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
						break;
					case -401:
						accessTokenInfo(function() {
							$reportForm.Request.reportReverseGeoCode(coord_x, coord_y, data, idx);
						});
						break;
					default:
						adm_nm = "(집계구 - " + data.dataList[idx].adm_cd + ")";
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
						break;
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 보고서용 리버스지오코딩. End ********* */
	
}(window, document));


