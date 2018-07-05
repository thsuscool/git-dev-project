/**
 * 
 */
(function(W, D) {
	W.$reportForm = W.$reportForm || {}
	
	$(document).ready(function() {	
	});
	
	$(window).load(function() {
		setTimeout(function() {
			if (window.opener.$thematicMapFrame06 != undefined) {
				window.opener.$thematicMapFrame06.ui.reportLoad();
			}
		}, 500);
	});

	$reportForm.ui = {
				map : null,
				datas : [],
				mapType : null,
				totalDataList1 : null,
				totalDataList2 : null,
				dataGeojson : [],
				selectOption : "",
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
						window.opener.$thematicMapFrame06.ui.reportLoad();
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
				setData : function(data1, data2, options1, options2, dataGeoJson) {
					this.selectOption = data1.selectOption;
					
					this.datas.push(data1);
					this.datas.push(data2);
					this.mapType = options1.mapType;
					
					//2017.03.09
					this.drawMap(options1); 
					//this.drawMap(options2);
					
					this.setMainReportInfo(data1, data2);
					this.setLegend(data1, options1,"1");
					this.setLegend(data2, options2,"2");
					this.setChart(data1, options1,dataGeoJson);
//					//datageojson을 가져와서 표에 넣을 것.
					this.setGrid(data1, options1,dataGeoJson);
					
					
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
		 			var scaleWidthValue = (originWidth / w).toFixed(2)*(0.48);
	 	 			var scaleHeightValue = (originHeight / h).toFixed(2)*(0.4);
	 	 			var scaleWidth = ((w / originWidth) + 0.15).toFixed(2)*(0.40);
	 	 			var scaleHeight = (h / originHeight).toFixed(2)*(0.85);
//	 	 			
	 	 			var reportMapCss = {
		 	 				"width" : "50%",
			 	 			"height" : "100%",
//			 	 			"overflow":"hidden",
			 	 			"display" : "inline"
//			 	 			"margin-left" : ((originWidth -w)*-1) / 2 + "px",
//			 	 			"margin-top" : ((originHeight - h)*-1) / 2 + "px"
		 	 		};
//	 	 			
	 	 			if(originWidth < w) {
	 	 				//화면 작을때
	 	 				reportMapCss["transform"] = "matrix("+scaleWidthValue+",0,0, "+scaleHeightValue+",-25,-60)";
//	 	 				reportMapCss["transform"] = "translate(-100px,0px)";
	 	 			
	 	 			} else {
	 	 				//화면 클때
	 	 				reportMapCss["transform"] = "matrix("+scaleWidth+",0,0, "+scaleHeight+",-85,-85)";
//	 	 				reportMapCss["transform"] = "translate(-100px,0px)";
	 	 			}
				
					
					
					$(clone).find(".sop-control").hide();					
					
					$("#reportMapDiv"+(options.id+1)).html($(clone).html());
			
					$("#reportMapDiv"+(options.id+1)).css(reportMapCss);*/
					
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
				setMainReportInfo : function(data, data2) {
					var mainTitle, searchTitle;
					var date = $reportForm.Util.getToday();
					
					//통계주제도
					if (this.mapType == "thematicMap") {
						mainTitle = data.param.title;
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
				setLegend : function(data, options,number) {
					var map, legend, title, unit;
					if (window.opener.$thematicMapFrame06 != undefined) {
						map = window.opener.$thematicMapFrame06.ui.mapList[data.id];
					}
					
					if (this.mapType == "thematicMap") {
						if (data.param.isKosis != undefined && data.param.isKosis) {
							unit = data.data[0].UNIT;
						}else {
							//임시
							if(data.selectOption=="leftValue"){
								unit = data.param.left_sep_unit;
							}else{
								unit = data.param.right_sep_unit;
							}
								
						}
						legend = $(map.legend.legendObj).clone().removeClass("min");
						title = "범례 (단위 : " + unit + ")";
						
						$("#legend"+number).append($(legend).html());
						$("#legendTitle"+number).html(title);
						$("#legend"+number).find(".legendBox").removeClass("min");
						$("#legend"+number).find(".legendRound").hide();
						$("#legend"+number).find(".lgListBox").hide();
						$("#legend"+number).find(".legendRrefresh").css("right", "13px");
						$("#legend"+number).find(".legendBox").removeAttr("data-html2canvas-ignore"); //2017.03.13 pdf저장 이슈
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
						var retDataList1 = [];
						var retDataList2 = [];
						
						if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
//							for(var i=0; i<data.geojson.length; i++) {
//								var geojson = data.geojson[i];
//								for (var k=0; k<geojson.features.length; k++) {
//									var layer = geojson.features[k];
//									if (layer.properties.adm_cd.length > 7) {
//										labelsVisible = false;
//									}
//									var tmpAdmName = layer.properties.adm_nm.split(" ");
//									var adm_nm = "";
//									if (tmpAdmName.length > 1) {
//										adm_nm = tmpAdmName[tmpAdmName.length-1];
//									}else {
//										adm_nm = tmpAdmName[0];
//									}
//									categoryList.push(adm_nm);
//									if (layer.info.length > 0) {
//										var info = layer.info[0];
//										retDataList.push(parseFloat(info[info.showData]));
//									}
//								}
//							}
						}else {
							var dataGeoJson1 = dataGeoJson[0];
							var dataGeoJson2 = dataGeoJson[1];
							var data1 = dataGeoJson1[0];
							var data2 = dataGeoJson2[0];
							
								for (var i=0; i<dataGeoJson1.length;i++){					
										dataGeoJson1[i].eachLayer(function(layer) {
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
												retDataList1.push(parseFloat(info[info.showData]));
												
											}
										
									    });
									}
								for (var i=0; i<dataGeoJson2.length;i++){	
									dataGeoJson2[i].eachLayer(function(layer) {
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
											retDataList2.push(parseFloat(info[info.showData]));
										}
									
								    });
								}
								
							
						}
						
						var param = {
								title : title,
								categories : categoryList,
								dataList1 : retDataList1,
								dataList2 : retDataList2,
								isLabel : labelsVisible
						};
						//차트는 생성하지 않는다.
//						this.addBarChart("#barChartDiv", param, 520, 220);	
						this.totalDataList1 = retDataList1;
						this.totalDataList2 = retDataList2;
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
					var dataGeoJson1 = dataGeoJson[0];
					var dataGeoJson2 = dataGeoJson[1];
					//대화형통계지도
					if (this.mapType == "thematicMap") {
						var unit = '';
						var unit2 = '';
						if(data.selectOption=="leftValue"){
							unit = data.param.left_sep_ttip_title+"("+data.param.left_sep_unit+")"; // 우선 임시 왼쪽만
							unit2 = data.param.sep_map_left_sep_ttip_title+"("+data.param.sep_map_left_sep_unit+")";
						}else{
							unit = data.param.right_sep_ttip_title+"("+data.param.right_sep_unit+")";
							unit2 = data.param.sep_map_right_sep_ttip_title+"("+data.param.sep_map_right_sep_unit+")";
							
						}
						
						var adm_nm = "지역";
						var total1 = 0;
						var total2 = 0;
						
						for (var i=0; i<this.totalDataList1.length; i++) {
							total1 += this.totalDataList1[i];
						}
						for (var i=0; i<this.totalDataList2.length; i++) {
							total2 += this.totalDataList2[i];
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
								total1 : total1,
								total2 : total2,
						};
						if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
//							for (var i=0; i<data.geojson.length; i++) {
//								var geojson = data.geojson[i];
//								if (i != 0) {
//									var name = geojson.features[0].properties.adm_nm.split(" ");
//									tmpAdmList.push(name[name.length-1]);
//								}else {
//									tmpAdmList.push(geojson.features[0].properties.adm_nm);
//								}
//								adm_cd = geojson.features[0].properties.adm_cd;
//								this.getGridData(geojson, tmpDataList, adm_cd, options);
//							}
//							adm_nm = tmpAdmList.join();
						}else {							
							adm_nm = data.geojson.features[0].properties.adm_nm;
							adm_cd = data.geojson.features[0].properties.adm_cd;
							this.getGridData(data.geojson, tmpDataList, adm_cd, options,dataGeoJson);
						}
						
						var gridList = tmpDataList.sort(function (a, b) {
							return b.value - a.value 
						});
						
						
						//dataList가 실제 값이 있는 리스트임
						var options = {
								dataList : gridList,
								total1 : total1,
								total2 : total2,
								unit : unit,
								unit2 : unit2,
								adm_nm : adm_nm
						};
						//표를 그린다.
						this.drawGrid(options,data);
						
						if (adm_cd.length > 7) {
							for (var i=0; i<gridList.length; i++) {
								$reportForm.Request.reportReverseGeoCode(gridList[i].x, gridList[i].y, options, i);
							}
						}
					}	
					
				},
				
				/**
				 * @name         : getGridData
				 * @description  : 표 정보를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				getGridData : function(geojson, tmpDataList, adm_cd, options,dataGeoJson) {
					var self = this;
					
					var dataGeoJson1 = dataGeoJson[0];
					var dataGeoJson2 = dataGeoJson[1];
					
					var adm_nm, coord_x, coord_y;
					var value = 0;
					var value2 = 0;
					var rate = 0;
					var color = "#F0FFF0";
					// 시도, 시군구, 읍면동일 경우
					
					for (var i=0; i<dataGeoJson1.length;i++){					
//							for(var k=0;k<100000;k++){
//								if(!dataGeoJson1[i]._layers[k]){
//									continue;//null, undefiend, 빈 원소일때 건너 띔
//								}
//								var feature = dataGeoJson1[i]._layers[k].feature;
						
							dataGeoJson1[i].eachLayer(function(layer){
								var feature = layer.feature;
						
								adm_nm = feature.properties.adm_nm;
								coord_x = feature.properties.x;
								coord_y = feature.properties.y;
								value = 0;
								rate = 0;
								color = "#F0FFF0";															
							
								
							// 데이터가 있으면
							//2017.03.09 보고서 수정	
							if (feature.info.length > 0) {
								var tmpValue = null;
								
								info = feature.info[0];
								tmpValue = info[info.showData];							
								value = parseFloat(tmpValue);
								rate = (parseFloat(tmpValue) / options.total) * 100;
								color = options.legend.getColor(value, options.legend.valPerSlice[0])[0];
							}
							
							for(var l=0;l<dataGeoJson2.length;l++){
								dataGeoJson2[l].eachLayer(function(layer) {
									var feature2 = layer.feature;
									
									if(feature.properties.adm_cd==feature2.properties.adm_cd){
										if(self.selectOption == "leftValue"){
											if( feature2.hasOwnProperty('info') && feature2.info.length > 0 && feature2.info[0].hasOwnProperty('left_data_val') ){
												value2=parseFloat(feature2.info[0].left_data_val);
											} else {
												value2 = 0;
											}
										}else{
											if( feature2.hasOwnProperty('info') && feature2.info.length > 0 && feature2.info[0].hasOwnProperty('right_data_val') ){
												value2=parseFloat(feature2.info[0].right_data_val);												
											} else {
												value2 = 0;
											}
										}
										
										var tmpValue = null;
										
										info = feature2.info[0];
										rate = (parseFloat(value2) / options.total) * 100;
										color = options.legend.getColor(value2, options.legend.valPerSlice[0])[0];
									}
								});
							}
							
							var param = {
									adm_cd : adm_cd,
									adm_nm :adm_nm,
									value : value,
									value2 : value2,
									rate : rate,
									color : color,
									x : coord_x,
									y : coord_y
							}
							tmpDataList.push(param);	
						})					
					}			
					
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
					var total1 = data.total1;
					var total2 = data.total2;
					var unit = param.param.stat_data_base_year+"년 "+data.unit;
					var unit2 = param.param.sep_map_data_year+"년 "+data.unit2;
					var adm_nm = data.adm_nm;
					var html = "";
					
					var gridList2 = [];
					for(var i=0; i<gridList.length; i++){
						gridList2.push(gridList[i].value2);
					}
					var max = Math.max.apply(Math,gridList2);
					
					for (var i=0; i<gridList.length; i++) {
						html += "<tr>";
		 				html += 	"<td class='al' id='adm_nm_"+i+"'>"+gridList[i].adm_nm+"</td>";
		 				html += 	"<td class='ar'><div class='valueBox'><span class='bg' style='background:"+gridList[i].color+"'></span><span class='txt'>"+(i+1)+"</span></div></td>";

	 					if( gridList[i].value == 0 ){
	 						html += "<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>N/A</span></td>";
	 					} else {
	 						html += "<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(gridList[i].value/gridList[0].value*100)+"%; background:rgba(76,139,253,1); '></span><span class='txt'>"+appendCommaToNumber(gridList[i].value)+"</span></td>";
	 					}
	 					
	 					if( gridList[i].value2 == 0 ){
	 						html += "<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%;'></span><span class='txt'>N/A</span></td>";
	 					} else {
	 						html += "<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(gridList[i].value2/max*100)+"%; background:rgba(131,235,176,1); '></span><span class='txt'>"+appendCommaToNumber(gridList[i].value2)+"</span></td>";
	 					}
		 				
		 				// 비율
//		 				if(param.selectOption=="leftValue"){
//		 					html += "<td class='ar'><div class='valueBox'><span class='txt'>"+(gridList[i].value/total1*100).toFixed(2)+"</span></div></td>";
//		 				}
		 				html += "</tr>";
					}
					$("#mask").hide();
					$("#interactiveMapTableRegion").find("#tBody").append(html);
					
					$("#tAdmName").html("행정구역");
					$("#tUnit").html(unit);
					$("#tUnit2").html(unit2);
					
					if(param.selectOption=="rightValue"){
						$("#percent").remove();
						$("#100").remove();
						$("#col_extra").remove();
						$("#sum").remove();
					}
					
					$("#tTotal").html(appendCommaToNumber(total1));
					$("#tTotal2").html(appendCommaToNumber(total2));
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
				            data: param.dataList1,
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


