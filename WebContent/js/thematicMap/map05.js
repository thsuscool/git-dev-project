/**
 * 맵에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/19 초기 작성 author : 권차욱 version : 1.0 see :
 * 
 */

(function (W, D) {
	W.$map05 = W.$map05 || {};
	var errCount = 0;
	sMap = {

			map : function() {
				var that = this;
				this.id = null;
				this.mapInfo = null;
				this.mapBtnInfo = null;
				this.shareInfo = null;
				this.bizStatsChart = null;
				this.delegate = null;
				this.gMap = null;
				this.target = null;	 		// target element
				this.isScale = false; 		// map scale 유무
				this.isPanControl = false; 	// map panControl 유무
				this.isMouseOver = false;
				this.isMeasureControl = true;
				this.isStatisticTileLayer = false;
				this.isDrop = false;
				this.isFirstDraw = true;
				this.isZoomStart = false;
				this.isInnerMapShow = false;
				this.center = null;			// center 좌표(utmk)
				this.zoom = 4;			    // zoom level
				this.geojson = null;
				this.dataGeojson = null;
				this.geojsonData = null;
				this.tradeGeojon = null;
				this.bounds = null;
				this.curPolygonCode = 2;
				this.data = [];
				this.curSidoCd = null;
				this.curSggCd = null;
				this.curDongCd = null;
				this.curDropCd = null;
				this.curDropPolygonCode = null;
				this.curSelectedLayer = null;
				this.showCombineDataParam = [];
				this.valPerSlice = [];
				this.legendColor = null;
				this.legendValue = [];
				this.combineData = [];
				this.dataType = "normal";
				this.dropEvent = null;
				this.bnd_year = "2013";
				this.dropInfo = null;
				this.lastGeojsonInfo = null;
				this.infoControl = null;
				this.infoControlDiv = null;
				this.drawControl = null;
				this.legendType = "auto"; 
				this.isMiniMapDraw = false; 
				this.isTradeMapShow = false;
				this.isZoomSliderControl = false;
				this.isZoomAnimation = true;
				this.render = null;
				this.lastDrawList = [];
				this.mouseOverAdmCd = null;
				this.markers = null;
				this.mapNavigation = null;
				this.mapMode = "normal";
				this.isFixedBound = false;
				this.curAdmCd = null;
				this.legend = null;
				this.selectedBoundMode = null;
				this.isMultiSelectedBound = false;
				this.selectedBoundList = [];
				this.boundLevel = "1";
				this.dataGeojsonLayer = null;
				this.dataForCombine = null;
				this.tileLayer = null;
				this.blankLayer = null;
				this.isBlankLayer = false;
				this.heatMap = null;
				this.openInitStatData = null;
				this.getThemaMapData = null;
				this.getThemaMapBaseYear = null;
				this.getRegionData = null; //DB에서 경계데이터를 가져옴
				this.thema_map_data_id = "";
				this.adm_nm = ""; // 해당 지역 이름
				this.left_sep_unit = ""; // 표출정보A 단위
				this.left_sep_nm = "";	// 표출정보A 명		
				this.left_sep_source = ""; // 표출정보A 출처 
				this.left_sep_ttip_title = "";// 표출정보 A툴팁타이틀
				this.left_sep_chart_title = ""; // 표출정보 A차트타이틀
				this.left_base_year = "";
				this.right_sep_unit = ""; // 표출정보B 단위
				this.right_sep_nm = "";	// 표출정보B 명		
				this.right_sep_source = ""; // 표출정보B 출처 
				this.right_sep_ttip_title = "";// 표출정보 B툴팁타이틀
				this.right_sep_chart_title = ""; // 표출정보 B차트타이틀
				this.min_redctn_level = ""; //  최소 Zoom 레벨
				this.max_expnsn_level = ""; //  최대 Zoom 레벨
				this.poi_disp_yn = false;			// poi 표출 테마코드
				this.theme_cd = "";			// poi 표출 테마코드
				// mng_s 2017. 08. 03 석진혁
				this.corp_class_cd = "";	// poi 표출 산업분류코드
				// mng_e 2017. 08. 03 석진혁
				this.poiAdmCd = null;		// map boundary 저장 변수
				this.base_year_list = null;  //기준년도 리스트
				this.selectBaseYear = null; 
				this.changeRegionBound = null;
				this.setDataBoard = null; // 데이타보드 메소드
				this.selectedAdmCd = ""; // 마우스 over될때 선택된 admcd
				this.clickMode = null;	
				this.regionData = null; //주제도 설정용 시도, 시구군, 읍면동 지역경계 Data
				this.i = 0; // 경계 검색 for문 인덱스
				this.dataBoardData = null; // 데이터보드용 리스트
				this.isReloadMode = false;
				this.initData = null;
				this.thema_legend_values = [];
				this.thema_legend_type = null;
				this.thema_stat_data_base_year = null; // 데이터 년도
				this.thema_atdrc_yn = null; // 자치구년도
				this.boundary_fix_yn = null;	//시계열경계년도
				this.isTimeSeries = false;
				this.timeSeriesLayer = [];
				this.timer = null;
				this.add_data_disp_yn = null;
				this.sep_map_data_id = null;
				this.sep_map_left_sep_nm = null;
				this.sep_map_left_sep_ttip_title = null;
				this.sep_map_left_sep_unit = null;
				this.sep_map_right_sep_ttip_title = null;
				this.tmpSidoData = {};
				this.reqType = "1";

				// 맵을 생성한다.
				this.createMap = function (delegate, target, opt) {

					if (!opt.center) {
						this.center = [ 989674, 1818313 ];
					}
					else {
						this.center = opt.center;
					}

					if (delegate) {this.delegate = delegate;}
					if (target) {this.target = target;}
					if (opt.scale !== undefined) {this.isScale = opt.isScale;}
					if (opt.panControl !== undefined) {this.isPanControl = opt.isPanControl;}	
					if (opt.zoom !== undefined) {this.zoom = opt.zoom;}
					if (opt.measureControl !== undefined) {this.isMeasureControl = opt.measureControl;}
					if (opt.zoomSliderControl !== undefined) {this.isZoomSliderControl = opt.zoomSliderControl;}
					if (opt.statisticTileLayer !== undefined) {this.isStatisticTileLayer = opt.statisticTileLayer;}

					//zoomAnimation (IE10 이하일 경우 false)
					if(browserFnc() != -1 && browserFnc() < 11) {
						//this.isZoomAnimation = false;
					}

					this.gMap = sop.map(this.target, {
						scale : this.isScale,
						panControl : this.isPanControl,
						measureControl : this.isMeasureControl,
						attributionControl : false,
						zoomSliderControl: this.isZoomSliderControl, //줌 컨트롤
						zoomAnimation : this.isZoomAnimation,	//줌 애니메이션 효과
						statisticTileLayer : true
					});
					this.gMap.setView(sop.utmk(this.center[0], this.center[1]), this.zoom);
					this.bounds = this.gMap.getBounds();
//					this.miniMap = new sMap.miniMap();	
					this.render = sop.svg();
					this.markers = sop.markerClusterGroup({
						animateAddingMarkers: true
					});
					this.gMap.addLayer(this.markers);
				};

				this.createInfoControl = function() {
					var infoControl = sop.control({position: 'topleft'});
					var that = this;
					infoControl.onAdd = function (map) {
						this._div = sop.DomUtil.create('div', 'info_control');
						sop.DomEvent.disableClickPropagation(this._div);
						this.update();
						$(this._div).attr("id", 'infoControl_' + that.id);
						that.infoControlDiv = this._div;
						return this._div;
					};

					infoControl.update = function (props) {
						var adm_nm;
						if (props) {
							if (props.adm_nm == "null" || props.adm_nm == undefined) {
								adm_nm = "집계구";
							}else {
								if (props.adm_cd.length <= 7) {
									adm_nm = props.adm_nm;
								} else {
									adm_nm = props.adm_nm  + " 집계구";
								}

							}
						}

						this._div.innerHTML =
							'<h4></h4>' + (props ? adm_nm : '행정동');

					};
					this.infoControl = infoControl;
					infoControl.addTo(this.gMap);	

					$(".info_control")
					.css("padding", "6px 8px")
					.css("font", "12px/14px Arial, Helvetica, sans-serif")
					.css("background", "rgba(255,255,255,1)")
					.css("background-color", "#fff")
					.css("box-shadow", "0 0 15px rgba(0,0,0,0.2)")
					.css("border-radius", "5px");
				},

				this.infoControlShowHide = function(show) {
					if (this.infoControl) {
						if (show) {
							$(this.infoControlDiv).show();
						}else {
							$(this.infoControlDiv).hide();
						}
					}	
				},

				this.createDrawControl = function(type) {
					var options = null;
					if (type == "biz") {
						options = {
								bizMap : true,
								interactiveMap : false	
						};
					}else {
						options = {
								bizMap : false,
								interactiveMap : true	
						};
					}
					var drawControl = new Draw.Control.Manager();
					drawControl.addControl(new Draw.Control.Measure(this.gMap));
					//drawControl.addControl(new Draw.Control.Overlay(this.gMap)); //draw hide
					drawControl.addControl(new Draw.Control.Poi(this.gMap, options));
					this.drawControl = drawControl;	
					this.gMap.addControl(drawControl); 
				},

				this.update = function () {
					this.gMap._onResize();
				},
				//POI클릭시 현재 map Zoomlevel값 가지고온다
				this.poiZoomLevel = function(){
					this.gMap.on('zoomend zoomlevelschange', function () {												
					}, this);					
					return this.gMap.getZoom();
				},

				this.mapMove = function (center, zoom, animate) {
					if (animate == null) {
						animate = false;
					}

					if (center != null) {
						this.center = center;

						if (zoom != null) {
							this.zoom = zoom;
							this.gMap.setView(sop.utmk(center[0], center[1]), this.setZoomCalibrate(zoom, 6), {
								animate : animate
							});
						}
						else {
							this.gMap.setView(sop.utmk(center[0], center[1]), {
								animate : animate
							});
						}
					}
				},

				this.setZoom = function (zoom) {
					if (zoom != null) {
						this.zoom = zoom;
						this.gMap.setZoom(this.setZoomCalibrate(zoom, 6));
					}
				};

				this.setZoomCalibrate = function(zoom, value) {
					var tmpZoom = zoom;
					if (this.mapMode == "settlite") {
						tmpZoom = zoom + value;
					}
					return tmpZoom;
				}

				this.setFixedBoundLevel = function(bool) {
					var maxZoom, minZoom;
					this.isFixedBound = bool;
					if (bool) {
						switch(this.curPolygonCode) {
						case 1:	//전국
							maxZoom = 1;
							minZoom = 0;
							break;
						case 2:	//전국시도
							maxZoom = 3;
							minZoom = 2;
							break;
						case 3:	//시군구
							maxZoom = 5;
							minZoom = 4;
							break;
						case 4: //읍면동
							maxZoom = 8;
							minZoom = 6;
							break;
						case 5: //집계구
							maxZoom = 12;
							minZoom = 9;
							break;
						}

						if (this.mapMode == "settlite") {
							maxZoom += 6;
							minZoom += 6;
						}

						this.gMap.setMaxZoom(maxZoom);
						this.gMap.setMinZoom(minZoom);

					}else {
						maxZoom = 12;
						minZoom = 0;

						if (this.mapMode == "settlite") {
							maxZoom += 6;
							minZoom += 6;
						}
						this.gMap.setMaxZoom(maxZoom);
						this.gMap.setMinZoom(minZoom);
					}
				};

				this.setBoundSelectedMoode = function(mode) {
					this.selectedBoundMode = mode;
					this.isMultiSelectedBound = true;
					if (mode == null) {
						this.isMultiSelectedBound = false;
					}
				};

				this.setBoundLevel = function(level) {
					this.boundLevel = level;
				};

				this.clearLayerStyle = function(layer) {
					layer.setStyle({
						weight : layer.options.style.weight,
						color : layer.options.style.color,
						dashArray : layer.options.style.dashArray,
						fillOpacity : layer.options.style.fillOpacity,
						fillColor : layer.options.style.fillColor
					});
				};

				this.contains = function (bounds, point) {
					if (point && bounds) {
						return bounds.contains(point);
					}
				};

				this.addMarker = function (x, y, options) {		
					var marker = null;
					var visible = false;
					if (options != undefined && options.visible != undefined) {
						visible = options.visible;	
					}
					if (this.gMap) {
						marker = sop.marker([ x, y ]);		
						marker.addTo(this.gMap);

						if (options.tooltipMsg != undefined && options.tooltipMsg != null) {
							marker.bindInfoWindow(options.tooltipMsg);
							if (visible) {
								marker.openInfoWindow();
								this.gMap.on('zoomend', function (e) {
								});

							}	
						}
					}
					return marker;
				};

				this.addHoverMarker = function (x, y, options,idx) {					
					var marker = null;
					var idxcnt = idx+1;
					var markerIcon = sop.icon({
						iconUrl: '/img/marker/'+idxcnt+'.png',							
						iconAnchor: [ 12.5, 41 ],
						iconSize: [ 25, 41 ],
						infoWindowAnchor: [1, -40]
					});										
					var visible = false;
					if (options.visible != undefined) {
						visible = options.visible;	
					}
					if (this.gMap) {
						marker = sop.marker([ x, y ], {icon: markerIcon});		
						marker.addTo(this.gMap);

						if (options.tooltipMsg != null) {
							marker.bindInfoWindow(options.tooltipMsg);
							if (visible) {
								marker.bindInfoWindow(options.tooltipMsg)
								.openInfoWindow();
								this.gMap.on('zoomend', function (e) {
								});

							}	
						}
					}

					return marker;
				};
				this.mapReload = function (center, zoom) {					

					if (center != null) {
						this.center = center;

						if (zoom != null) {
							this.zoom = zoom;
							this.gMap.setView(sop.utmk(center[0], center[1]), zoom, {								
							});
						}
						else {
							this.gMap.setView(sop.utmk(center[0], center[1]), {

							});
						}
					}
				},


				this.addCircleMarker = function(x, y, options) {
					var marker = null;
					var visible = false;
					var radius = 17;
					var fillColor = "#03f";
					var color = "white";
					var fillOpacity = 0.7;
					var opacity = 0.7;
					var weight = 0;
					var params = null;

					if (options != undefined) {
						if(options.visible != undefined) {
							visible = options.visible;	
						}

						if(options.radius != undefined) {
							radius = options.radius;	
						}	

						if(options.fillColor != undefined) {
							fillColor = options.fillColor;	
						}

						if (options.color != undefined) {
							color = options.color;
						}

						if (options.fillOpacity != undefined) {
							fillOpacity = options.fillOpacity;
						}

						if (options.opacity != undefined) {
							opacity = options.opacity;
						}

						if (options.weight != undefined) {
							weight = options.weight;
						}

						if (options.options != undefined) {
							params = options.options;
						}

					}

					if (this.gMap) {
						marker = sop.circleMarker([x,y], {
							radius : radius,
							color : color,
							fillColor : fillColor,
							fillOpacity : fillOpacity,
							opacity :opacity,
							weight : weight,
							renderer: this.render,
							options : params
						});		

						if (options.tooltipMsg != undefined && options.tooltipMsg != null) {
							marker.bindInfoWindow(options.tooltipMsg);
							if (visible) {
								marker.openInfoWindow();
							}	
						}
						marker.addTo(this.gMap);
					}
					return marker;
				},


				this.removeMarker = function (marker) {
					if (marker) {
						marker.remove();
					}
				};

				this.clearDataOverlay = function () {
					if (this.dataGeojson) {
						this.dataGeojson.remove();
						this.removeCaption();
					}

					if (this.tradeGeojson) {
						this.tradeGeojson.remove();
					}

//					if (this.miniMap) {
//					if(this.miniMap.geojson) {
//					this.miniMap.geojson.remove();
//					}
//					}

					this.data = [];
					this.combineData = [];
					this.dataGeojson = null;
					this.curDropPolygonCode = null;
					this.valPerSlice = [];
					this.legendValue = [];
					this.lastGeojsonInfo = null;
					this.openApiReverseGeoCode(that.center,that.bnd_year);
					this.isTradeMapShow = false;
					this.lastDrawList = [];
					this.legendValue.user = [];
					if (this.drawControl) {
						this.drawControl.removeOverlay();
					}
					this.markers.clearLayers();
					this.selectedBoundMode = null;
					this.selectedBoundList = [];
					this.dataGeojsonLayer = null;
					this.curAdmCd = null;
					this.dataForCombine = null;
					this.multiLayerControl.clear();
				};

				this.clearData = function () {
					this.data = [];
					this.combineData = [];
				};

				this.setInnerMap = function(isShow) {
					this.isInnerMapShow = isShow;
					if (isShow) {
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
						this.setZoom(12);
					}else {
						this.openApiReverseGeoCode(that.center,that.bnd_year);
					}
				};

				this.setTradeMap = function(isShow) {
					this.isTradeMapShow = isShow;
					if (isShow) {
						if (this.zoom >= 10) {
							this.openApiTradeArea(this.bounds);
						}	
					}else {
						if (this.tradeGeojson) {
							this.tradeGeojson.remove();
							this.tradeGeojson = null;
						}
					}
				}



				this.setLegendColor = function () {
					if (this.dataGeojson || this.multiLayerControl.dataGeojson) {
						this.updatePolygonGeoJson();
					}
				};

				this.updatePolygonGeoJson = function () {
					this.gMap.eachLayer(function (layer) {
						if (layer.feature) {
							that.setLayerColor(layer.feature, layer);
						}

					});

					if (this.multiLayerControl.dataGeojson != null) {
						for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
							var dataGeojson = this.multiLayerControl.dataGeojson[i];
							dataGeojson.eachLayer(function (layer) {
								if (layer.feature) {
									that.setLayerColor(layer.feature, layer);
								}

							});
						}

					}
				};

				this.setPolygonGeoJsonStyle = function (type) {			
					// 일반경계일 경우, 색상을 채우지않고,
					// 데이터경계일 경우, 색상을 채운다.
					var color = "#666666";
					var fillColor = "white";
					var weight = 1.75;
					var fillOpacity = 0;
					var dashArray =  '3';

					if (this.mapMode == "settlite") {
						color = "white";
					}else if (this.mapMode == "intro") {
						color = "#cccccc";
						fillColor = "#F1F1F1";
						fillOpacity = 1;
						weight = 1.5;
						dashArray = "";
					}

					if (type == "data") {
						color = "white", 
						fillColor = "#F0FFF0";
						weight = 0.75;
						fillOpacity = 0.7;
						dashArray = "";
					}
					else if (type == "build") {
						fillColor = "#9c0095";
						weight = 2.5;
						fillOpacity = 0.7;
					}
					else if (type == "trade") {						
						return {
							weight : 2.5,
							opacity : 1,
							color : color,
							dashArray: '3',
							fillOpacity : 0.7,
							fillColor : "#9c0095",
							renderer: this.render
						};
					}

					return {
						weight : weight,
						opacity : 1,
						color : color,
						dashArray: dashArray,
						fillOpacity : fillOpacity,
						fillColor : fillColor
					};
				};

				this.addPolygonGeoJson = function (obj, type, opt) {
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							adm_cd = layer.feature.properties.adm_cd;
							that.setLayerColor(feature, layer);	
							layer.on({
								mouseover : function (e) {
									that.isMouseOver = true;		
									that.setPolyLayerMouseover(e);

									if (that.infoControl != null) {
										that.infoControl.update(feature.properties);
									}

									if (feature.properties.adm_cd != undefined &&
											feature.properties.adm_cd.length > 0) {
										that.mouseOverAdmCd = feature.properties.adm_cd;
									}


									// mouse over , 사용자 콜백
									if (that.delegate && 
											that.delegate.callbackFunc &&
											that.delegate.callbackFunc.didMouseOverPolygon) {
										// event , data, type , map
										that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that);
									}

								},
								mouseout : function (e) {
									that.isMouseOver = false;
									that.setPolyLayerMouseout(e);

									// mouse out, 사용자 콜백
									if (that.delegate && 
											that.delegate.callbackFunc &&
											that.delegate.callbackFunc.didMouseOutPolygon) {
										that.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type, that);
									}

								},
								click : function (e) {
									that.clickMode = true;
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}
									
									//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
									$(".thematicCharts").show();
									
									//차트를 만든다
									that.thema_map_data_id = that.initData.thema_map_data_id;
									that.getThemaMapDataboardData(feature.properties.adm_cd);
									thematicCharts(feature.properties.adm_cd);


									if (that.delegate && 
											that.delegate.callbackFunc && 
											that.delegate.callbackFunc.didSelectedPolygon) {
										that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
									}

								},

								drop : function (e) {
									var layer = e.target;
									that.curDropPolygonCode = that.curPolygonCode;
									that.dropEvent = e;
									that.curDropCd = layer.feature.properties.adm_cd;
									if (that.curDropCd.length > 7) {
										that.curDropCd = that.curDropCd.substring(0,7);
									}

									// fitBounds는 moveend 이벤트가 발생하므로,
									// moveend에서 drop 이벤트를 처리한다.
									/*that.gMap.fitBounds(layer.getBounds(), {
										maxZoom : that.zoom,
										animate : false
									});*/

									var zoom = that.zoom;	
									that.mapMove([layer.dropUTMK.x, layer.dropUTMK.y], that.setZoomCalibrate(zoom, 6));

									if (that.delegate && 
											that.delegate.callbackFunc && 
											that.delegate.callbackFunc.didMapDropEnd instanceof Function) {
										that.delegate.callbackFunc.didMapDropEnd(e.dropEvent, e.dropSource, e.target, e.target.feature.properties, that);
									}

									that.isMouseOver = false;

								},

							});
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
						layerCode : that.curPolygonCode,

					});

					if (type == "polygon" || type == "build") {
						this.geojson = geojson;
					}else if (type == "trade") {
						this.tradeGeojson = geojson;
					}else {
						$thematicMapFrame05.ui.dataGeoJson.push(geojson);
						this.dataGeojson = geojson;
					}

					if (opt) {
						if (opt.group) {
							if (type == "polygon" || type == "build") {
								this.geojson.addTo(opt.group);
							}else if (type == "trade") {
								this.tradeGeojson.addTo(opt.group);
							}else {
								this.dataGeojson.addTo(opt.group);
							}
						}
						else {
							if (type == "polygon" || type == "build") {
								this.geojson.addTo(this.gMap);
							}else if (type == "trade") {
								this.tradeGeojson.addTo(this.gMap);
							}else {
								this.dataGeojson.addTo(this.gMap);
							}		
						}
					}
					else {
						if (type == "polygon" || type == "build") {
							this.geojson.addTo(this.gMap);
						}else if (type == "trade") {
							this.tradeGeojson.addTo(this.gMap);
						}else {
							this.dataGeojson.addTo(this.gMap);
						}	
					}

					//집계구경계의 중심좌표 설정
					if (adm_cd.length == 7) {
						geojson.eachLayer(function(layer) {
							if (layer.feature.properties.adm_cd.length == 7) {
//								console.log(layer);
								var center = layer.getCenter();
								layer.feature.properties["x"] = center.x;
								layer.feature.properties["y"] = center.y;
							}
						})
					}
					return geojson;
				};

				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					var fillColor = layer.options.fillColor;
					var color = "#0086c6";
					var weight = 5;
					var dashArray = layer.options.dashArray;
					if (layer == that.curSelectedLayer) {
//						alert("layer"+layer);
//						alert("curSelectedLayer"+that.curSelectedLayer);
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 5,
								color : "#ff0000",
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor
							});
						}
					}
					else {
						if (that.mapMode == "intro") {
							fillColor = "#fcbe47";
							color = "#ebb410";
							weight = 2.5;
							dashArray = "";
						}

						layer.setStyle({
							weight : weight,
							color : color,
							dashArray : dashArray,
							fillOpacity : layer.options.fillOpacity,
							fillColor : fillColor
						});

					}

					if (!sop.Browser.ie) {
						layer.bringToFront();
					}
				};

				this.setDataBoard = function(e){
					alert("데이타보드~");
				};


				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					if (layer == that.curSelectedLayer) {
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 3,
								color : "#ff0000",
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor
							});
						}
					}

					if (layer != that.curSelectedLayer) {
						var color = "#666666";
						var fillColor = layer.options.fillColor;
						var fillOpacity = layer.options.fillOpacity;
						var weight = 3;

						if (that.mapMode == "settlite") {
							color = "white";
							weight = 3;
						}else {
							if (layer.options.type == "polygon" || 
									layer.options.type == "build" || 
									layer.options.type == "trade") {
								color = "#666666";
								weight = 1.75;
							}
							else {
								color = "white";
								weight = 0.75;
							}
						}

						if (that.mapMode == "intro") {
							color = "#cccccc";
							fillColor = "#F1F1F1";
							weight = 1.5;
						}else {
							if (layer.options.type == "polygon") {
								fillOpacity = 0;
							}else {
								fillOpacity = 0.7;
							}
						}

						layer.setStyle({
							weight : weight,
							color : color,
							dashArray : layer.options.dashArray,
							fillOpacity : fillOpacity,
							fillColor : fillColor
						});

					}
					if (!sop.Browser.ie) {
						layer.bringToBack();
					}
				};

				this.addControlEvent = function (type, opt) {

					// 지도이동시 발생
					if (type == "movestart") {
						this.gMap.on("movestart", function (e) {
							if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapMoveStart instanceof Function) {
								that.delegate.callbackFunc.didMapMoveStart(e, that);
							}
						});
					}

					else if (type == "moveend") {
						this.gMap.on("moveend", function (e) {	
							var center = e.target.getCenter();
							that.center = [ center.x, center.y ];
							that.bounds = e.target.getBounds();

							if (that.isTradeMapShow && that.zoom >= 10){
								that.openApiTradeArea(that.bounds);	
							}
							
							that.isReloadMode = true;
							if ((that.zoom <= 3 && that.curPolygonCode == "2") ||
								(that.zoom > 3 && that.zoom <=5 && that.curPolygonCode == "3") ||
								(that.zoom > 5 && that.zoom <=8 && that.curPolygonCode == "4") || 
								(that.zoom > 8 && that.curPolygonCode == "5")) {
								that.isReloadMode = false;
							}

							if (!that.isDrop && !that.isMultiSelectedBound) {
								that.openApiReverseGeoCode(that.center,that.bnd_year);
							}

							that.isDrop = false;
							that.isZoomStart = false;

							if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
								that.delegate.callbackFunc.didMapMoveEnd(e, that);
							}

						});
					}

					// 줌 시작
					else if (type == "zoomstart") {
						this.gMap.on("zoomstart", function (e) {
							that.isZoomStart = true;
							if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapZoomStart instanceof Function) {
								that.delegate.callbackFunc.didMapZoomStart(e, that);
							}
						});
					}
					// 줌 종료
					else if (type == "zoomend") {
						this.gMap.on("zoomend", function (e) {
							that.isZoomStart = true;
							that.zoom = e.target._zoom;
							that.bounds = e.target.getBounds();
							that.zoom = that.setZoomCalibrate(that.zoom, -6);
							var mapPolygonCode = 0;

							// 전국단위 경계표출
							/*if (that.zoom <= 1) {
								mapPolygonCode = 1;
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundaryContry(that);
										}
									}
								}
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("전국");
								}

							}*/

							if (/*that.zoom > 1 &&*/ that.zoom <= 3) {
								mapPolygonCode = 2;
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundarySido(that.bnd_year);
										}
									}			
								}		
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("시도");
								}
							}

							// 시구군단위 경계표출
							else if (that.zoom > 3 && that.zoom <= 5) {
								mapPolygonCode = 3;
								// 이전의 경계레벨이 시군구단위가 아닐경우
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;						
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundaryHadmarea(that.curDropCd, that.bnd_year, "1");
										}
									}
								}
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("시군구");
								}
							}

							// 동단위 경계표출
							else if (that.zoom > 5 && that.zoom <= 8) {
								mapPolygonCode = 4;
								// 이전의 경계레벨이 동단위가 아닐 경우
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundaryHadmarea(that.curDropCd, that.bnd_year, "1");
										}
									}
								}
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("읍면동");
								}
							}

							// 집계구 경계표출
							else if (that.zoom > 8) {
								mapPolygonCode = 5;
								// 이전의 경계레벨이 집계구단위가 아닐 경우
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;	
									if (!that.isInnerMapShow){
										if (that.isDrop) {
											that.openApiBoundaryStatsarea(that.curDropCd, that.bnd_year);
										}
									}		
								}

								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("집계구");
								}
							}

							if (that.delegate && 
									that.delegate.callbackFunc &&
									that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
								that.delegate.callbackFunc.didMapZoomEnd(e, that);
							}
						});
					}

					// 경계구역으로 아이템 drop
					else if (type == "drop") {
						$("#"+that.target).droppable({
							drop: function(e, s) {
								that.gMap.eachLayer(function(layer){
									if( layer._containsPoint ) {
										var point = that.gMap.mouseEventToLayerPoint(e);
										var dropUTMK = that.gMap.layerPointToUTMK(point);  
										if( layer._containsPoint(point)){

											if (layer.feature.properties.adm_cd == undefined || 
													layer.feature.properties.adm_cd == null) {
												return;
											}

											if (that.mouseOverAdmCd == layer.feature.properties.adm_cd) {
												//현재보고있는 경계레벨과 드랍한 경계레벨이 다를 경우,
												//현재있는 경계레벨을 드랍한 경계레벨로 치환하고 드랍을 수행한다.
												//이전에는 이런 예가 없었으나, 사용자영역이 일반경계에 가려지는 현상으로 인해
												//포커스가 발생했을 때 경계가 두드러지는 현상을 집어넣었고, 이같은 버그가 발생함.
												var timeInterval = 0;
												if (layer.options.layerCode < that.curPolygonCode) {
													that.autoUpBoundary();
													timeInterval = 500;
												}else {
													that.curPolygonCode = layer.options.layerCode;
												}

												setTimeout(function() {
													if (that.isMouseOver) {
														that.isDrop = true;
														layer["dropUTMK"] = dropUTMK;
														layer.fire("drop", {
															dropEvent : e,
															dropSource : s.draggable,
														});
													}
												},timeInterval);

											}

										}
									}
								});
							}
						});
					}

					//사용자지정 이벤트
					else if (type == "draw") {
						that.gMap.on("draw:created", function(e) {
							var layer = e.layer;	
							if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didDrawCreate instanceof Function) {
								that.delegate.callbackFunc.didDrawCreate(e, e.layerType, that);
							}
						});
					}

				};

				this.autoDownBoundary = function () {
					// 기존에 데이터경가 있으면 제거한다.
					if (this.dataGeojson != null) {
						this.dataGeojson.remove();		
						this.removeCaption();
						this.dataGeojson = null;
					}

					if (this.boundLevel == "0") {
						switch (this.curPolygonCode) {
						case 1:
							break;

						case 2:
						case 3:
						case 4:
							this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel);
							break;

						case 5:
							this.openApiBoundaryStatsarea(this.curDropCd, this.bnd_year);
							break;

						default:
							break;	
						}
					}else {
						switch (this.curPolygonCode) {
						case 1:
							this.setZoom(2);
							break;

						case 2:
							this.setZoom(4); //6->4
							break;

						case 3:
							this.setZoom(7); //8->7
							break;

						case 4:
							this.setZoom(9); //10->9
							break;

						case 5:
							this.openApiReverseGeoCode(this.center,that.bnd_year);
							break;

						default:
							break;	
						}
					}
				};

				this.autoUpBoundary = function () {
					switch (this.curPolygonCode) {

					/*case 1:
						this.setZoom(1);
						break;*/

					case 2:
						this.setZoom(1);
						break;

					case 3:
						this.setZoom(3); //4->3
						break;

					case 4:
						this.setZoom(5); //6->5
						break;

						/*case 5:
						this.setZoom(10);
						break;*/

					default:
						break;

					}

				};


				this.setDroppedInfo = function() {
					this.dropInfo = {
							center : this.center,
							zoom : this.zoom
					}
				};

				this.undoDropLayerBounds = function() {
					this.lastGeojsonInfo = null;
					if (this.dropInfo != null) {
						this.mapMove(this.dropInfo.center, this.dropInfo.zoom);
					}
				};

				this.isContainBound = function() {
					if (that.curPolygonCode != 1 && that.curPolygonCode != 2) {
						var isInnerForDataBounds = false;
						var tmpUtmkPoint = this.gMap.utmkToLayerPoint(this.center);
						if (that.geojson != null && tmpUtmkPoint != null 
								&& tmpUtmkPoint != undefined) {
							that.geojson.eachLayer(function (layer) {
								if (layer._containsPoint) {
									if (layer._containsPoint(tmpUtmkPoint)) {
										isInnerForDataBounds = true;
									}
								}
							});
						}
					}

					return isInnerForDataBounds;
				};

				this.getLocation = function () {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {
							//console.log(position);
						});
					}
					else {
						console.log("브라우져가 기능을 제공하지 않습니다.");
					}

				};

				this.setStatsData = function (type, data, showDataParamName, unit) {
					this.data = [];

					if (data != null) {
						if (showDataParamName != null && showDataParamName.length > 0) {
							data["showData"] = showDataParamName;
						}
						if (unit != null && unit.length > 0) {

							data["unit"] = unit;
						}
						this.data.push(data);
						this.dataForCombine = data;
					}

					// 일반 검색조건일 경우
					if (type == "normal" || type == "bizStats") {
						this.dataType = type;	
					}
					else {
						this.dataType = type;
						if (this.combineData.length >= 2) {
							this.combineData = [];
						}
						this.combineData.push(data);

						if (this.combineData.length == 2) {
							this.data = this.combineData;
						}
					}
				};

				//남한경계가져오기
				this.openApiBoundaryContry = function () {
					$.ajax({
						type: "GET",
						url: "/js/data/geo.js",
						success: function(res) {
							res["pAdmCd"] = "";
							that.setPolygonDataGeojson(res);
						} ,
						dataType: "json",
						error:function(e){  
							//alert(e.responseText);  
						}  
					});
				};


				// 전국시도경계가져오기
				this.openApiBoundarySido = function (year, callback) {
					/*	if (that.lastGeojsonInfo != null) {
						if (that.lastGeojsonInfo.adm_cd == "00" && that.lastGeojsonInfo.year == year) {
							return;
						}
					}*/
					
					if(parseInt(year) < 2000) {
						year = '2000';
					}
					
					$.ajax({
						type: "GET",
						url: "/js/data/geo_sido_" + year + ".js",
						success: function(res) {
							res["pAdmCd"] = "00";
							var tmpOption = {
									year : year,
									adm_cd : "00"
							}
							that.lastGeojsonInfo = tmpOption ;
							that.setPolygonDataGeojson(res);
							if (callback != undefined && callback != null && callback instanceof Function) {
								callback.call(undefined, res);
							}
						} ,
						dataType: "json",
						error:function(e){  
							//alert(e.responseText);  
						}  
					});
				};

				// OpenAPI 행정동경계 검색
				this.openApiBoundaryHadmarea = function (adm_cd, year, low_search) {
					var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
					sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
					sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
					sopOpenApiHadmareaObj.addParam("year", year);
					sopOpenApiHadmareaObj.addParam("low_search", low_search);
					if(that.thema_atdrc_yn != null && that.thema_atdrc_yn != undefined && that.thema_atdrc_yn === '1' && adm_cd.length === 2) {
						sopOpenApiHadmareaObj.addParam("borough", "1");
					}
					sopOpenApiHadmareaObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
						options : {
							target : this,
							adm_cd : adm_cd,
							year : year,
							low_search : low_search
						}
					});
				};

				// OpenAPI 집계구경계 검색
				this.openApiBoundaryStatsarea = function (adm_cd, year) {
					var sopOpenApiStatsareaObj = new sop.openApi.statsarea.api();
					sopOpenApiStatsareaObj.addParam("accessToken", accessToken);
					sopOpenApiStatsareaObj.addParam("adm_cd", adm_cd);
					sopOpenApiStatsareaObj.addParam("year", year);
					sopOpenApiStatsareaObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/boundary/statsarea.geojson",
						options : {
							target : this,
							adm_cd : adm_cd,
						}
					});
				};

				// OpenAPI 리버스지오코딩
				this.openApiReverseGeoCode = function (center,year) {
					var sopOpenApiReverseGeoCodeObj = new sop.openApi.ReverseGeoCode.api();
					sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
					sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
					sopOpenApiReverseGeoCodeObj.addParam("x_coor", center[0]);
					sopOpenApiReverseGeoCodeObj.addParam("y_coor", center[1]);
					sopOpenApiReverseGeoCodeObj.addParam("bnd_year", year);
					sopOpenApiReverseGeoCodeObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
						options : {
							target : this,
							center : center,
							autoFlag : false
						}
					});
				};

				//
				this.openApiBuildArea = function(bounds) {
					var sopOpenApibdAreaObj = new sop.openApi.bdArea.api();
					sopOpenApibdAreaObj.addParam("minx", bounds._southWest.x);
					sopOpenApibdAreaObj.addParam("miny", bounds._southWest.y);
					sopOpenApibdAreaObj.addParam("maxx", bounds._northEast.x);
					sopOpenApibdAreaObj.addParam("maxy", bounds._northEast.y);
					sopOpenApibdAreaObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/map/interactive/bdarea.geojson",
						options : {
							target : this,
							btntype : "build",
							params : {
								title : "사업체전개도",
								param : [
								         { "key" : "minx", "value" : bounds._southWest.x },
								         { "key" : "miny", "value" : bounds._southWest.y },
								         { "key" : "maxx", "value" : bounds._northEast.x },
								         { "key" : "maxy", "value" : bounds._northEast.y }
								         ],
								         map : this,
								         adm_nm : this.mapNavigation.data.sido_elem.sido_nm + " "
								         + this.mapNavigation.data.sgg_elem.sgg_nm + " "
								         + this.mapNavigation.data.adm_elem.emdong_nm
							},
							hat : this
						}
					});

				};


				//상권조회
				this.openApiTradeArea = function(bounds) {
					var sopOpenApitradeAreaObj = new sop.openApi.tradeArea.api();
					sopOpenApitradeAreaObj.addParam("minx", bounds._southWest.x);
					sopOpenApitradeAreaObj.addParam("miny", bounds._southWest.y);
					sopOpenApitradeAreaObj.addParam("maxx", bounds._northEast.x);
					sopOpenApitradeAreaObj.addParam("maxy", bounds._northEast.y);
					sopOpenApitradeAreaObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/bizStats/tradearea.geojson",
						options : {
							target : this
						}
					});
				}


				this.setLayerColor = function (feature, layer) {
					// 일반데이터일 경우
					if (this.dataType == "normal") {
						feature["combine"] = false;
						if (feature.info) {
							for ( var x = 0; x < feature.info.length; x++) {
								if (feature.info[x].showData) {
									for (param in feature.info[x]) {

										/*console.log("feature.info[x][param] = " +feature.info[x][param]+":: legendColor = " + that.legend.valPerSlice[x]);
										console.log(that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]);*/


										if (param == feature.info[x].showData) {

//											console.log(that.legend.valPerSlice[x]);


											layer.setStyle({
												weight : layer.options.weight,
												color : layer.options.color,
												dashArray : layer.options.dashArray,
												fillOpacity : layer.options.fillOpacity,
												//fillColor : that.getColor(feature.info[x][param], that.valPerSlice[x])[0] //test
												fillColor : that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]
											});
											break;
										}
									}
								}
							}
						}
					}
					else if (this.dataType == "bizStats") {
						feature["combine"] = false;
						if (feature.info) {
							for ( var x = 0; x < feature.info.length; x++) {
								if (feature.info[x].adm_cd == feature.properties.adm_cd) {
									layer.setStyle({
										weight : layer.options.weight,
										color : layer.options.color,
										dashArray : layer.options.dashArray,
										fillOpacity : layer.options.fillOpacity,
										fillColor : that.legendColor[4]
									});
								}
							}
						}
					}
					else if(this.dataType == "kosis") {
						feature["combine"] = false;
						if (feature.info && feature.info.length > 0) {
							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : that.legend.getColor(feature.info[0], that.legend.valPerSlice[0])[0]
							});

						}
					}
					// 결합데이터일 경우
					else {
						var tmpLevel = new Array();	
						feature["combine"] = true;

						if (feature.info) {
							for ( var x = 0; x < feature.info.length; x++) {
								if (feature.info[x].showData) {
									for (param in feature.info[x]) {
										if (param == feature.info[x].showData) {
											tmpLevel.push(that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[feature.info[x].legendIndex])[1]);
											break;
										}
									}
								}
							}
						}

						if (tmpLevel.length == 1) {
							var score = tmpLevel[0] / 2;
							var level = Math.ceil((tmpLevel[0] / 2));
							feature["combineData"] = score * 20;

							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : that.legend.getColorForLevel(level)
							});

						}else if (tmpLevel.length == 2) {
							var score = (tmpLevel[0] + tmpLevel[1]) / 2;
							var level = Math.ceil((tmpLevel[0] + tmpLevel[1]) / 2);
							feature["combineData"] = score * 20;

							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : that.legend.getColorForLevel(level)
							});

						}

					}

				};

				this.checkShowCaption = function () {
					this.checkShowCaption = function () {
						if (that.legend.numberData && (this.dataGeojson != null || this.multiLayerControl.dataGeojson != null)) {
							this.removeCaption();
							this.setCaption();
						}else {
							this.removeCaption();
						}
					};
				};

				this.setCaption = function () {
					//2016.09.22 버블일 경우, 캡션을 보여준다.
					if (this.legend != undefined && this.legend.selectType == "bubble") {
						if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
							for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
								var layer = this.legend.circleMarkerGroup[i];
								layer.setCaption({title:appendCommaToNumber(parseFloat(layer.options.options.data)), color:"white"});
							}
						}
					}else {
						if (this.multiLayerControl.dataGeojson != null) {
							for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
								var dataGeojson = this.multiLayerControl.dataGeojson[i];
								dataGeojson.eachLayer(function (layer) {
									var x = layer.feature.properties.x;
									var y = layer.feature.properties.y;

									if (layer.feature.info.length > 0) {
										for (param in layer.feature.info[0]) {
											if (layer.feature.info[0].showData == param) {
												layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.info[0][param])), color:"white", showAllZoomLevel: false}, [x,y]);
												break;
											}
										}
									}else {
										layer.setCaption({title:"N/A", color:"##FFEB3B"}, [x,y]);
									}
								});
							}
						}
						else{
							// 각각의 layer안에 데이타와 unit을 보여줌
							if (this.dataGeojson != null) {
								this.dataGeojson.eachLayer(function(layer) {
									var x = layer.feature.properties.x;
									var y = layer.feature.properties.y;

									if (layer.feature.combine) {			
										if (layer.feature.combineData != undefined) {
											layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.combineData)), color:"white"}, [x,y]);
										}else {
											layer.setCaption({title:"N/A", color:"##FFEB3B", showAllZoomLevel: false}, [x,y]);
										}
									}else if(layer.feature.info.length > 1) {
										layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.info[0])), color:"white", showAllZoomLevel: false}, [x,y]);
									}else {
										if (layer.feature.info.length > 0) {
											for (param in layer.feature.info[0]) {
												if (layer.feature.info[0].showData == param) {
													// 지도에 그려지는 레이어에서 Unit(단위)를 없앴다.
//													layer.setCaption({title:appendCommaToNumber(layer.feature.info[0][param])+ " ("+layer.feature.info[0].unit + ")", color:"white", showAllZoomLevel: false});
													layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.info[0][param])), color:"white", showAllZoomLevel: false}, [x,y]);
													break;
												}
											}
										}else {
											layer.setCaption({title:"N/A", color:"##FFEB3B"}, [x,y]);
										}
									}
								});
							}
						}
					}
				};

				this.removeCaption = function () {
					if (this.multiLayerControl.dataGeojson != null) {
						for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
							var dataGeojson = this.multiLayerControl.dataGeojson[i];
							dataGeojson.eachLayer(function (layer) {
								layer.removeCaption();
								layer.captionObj = null;
							});
						}
					}

					if (this.dataGeojson != undefined && this.dataGeojson != null ) {
						this.dataGeojson.eachLayer(function (layer) {
							layer.removeCaption();
							layer.captionObj = null;
						});
					}	
					
					//2016.09.22 버블일 경우, 캡션을 제거한다.
					if (this.legend != undefined && this.legend.selectType == "bubble") {
						if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
							for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
								var layer = this.legend.circleMarkerGroup[i];
								layer.removeCaption();
								layer.captionObj = null;
							}
						}
					}
				
				}

				this.setPolygonDataGeojson = function (geoData, type, index, options, callback) {
					$thematicMapFrame05.Popup.close();
					// 기존 경계 지우기
					if (this.geojson) {

						//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
						//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
						//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
						if (geoData.pAdmCd != undefined) {
							var tmpLayerCode = 5;
							if (geoData.pAdmCd == "00") {
								tmpLayerCode = 2;
							}else {
								switch (geoData.pAdmCd.length) {
								//전국
								case 0:
									tmpLayerCode = 1;
									break;
									//전국시도
								case 2:
									tmpLayerCode = 3;
									break;
									//시군구
								case 5:
									tmpLayerCode = 4;
									break;
									//읍면동
								case 7:
									tmpLayerCode = 5;
									break;
								}
							}

							if (tmpLayerCode != this.curPolygonCode) {
								return;
							}
						}

						this.geojson.remove();
						this.geojson = null;


					}

					// 경계데이터에 통계정보를 병합하고, 경계를 그린다.
					if (this.data.length > 0) {	
						//kosis데이터 
						if (this.data[0].kosis) {
							if(geoData.features.length > 1) {
								if(this.data[0].pAdmCd < 2) {
									this.data[0].pAdmCd = "00";
								}

								if (geoData.pAdmCd != this.data[0].pAdmCd) {
									return;
								}
								geoData = interactiveMapKosis.combineKosisStatsData(geoData);
							} else {
								return;
							}
						} else {
							if (geoData.pAdmCd != this.data[0].pAdmCd) {
								return;
							}
							geoData = this.combineStatsData(geoData);
							
							//시계열인 경우
							if (this.isTimeSeries) {
								if (options != undefined) {
									if (options.idx != 0) {
										that.legend.valPerSlice = this.timeSeriesLayer[0].valPerSlice;
									}
								}
							}
						}

						//시계열때문에 드랍된 현재위치정보를 저장한다.
						this.setDroppedInfo();
					}

					if (geoData.combine && this.data.length > 0) {
						// 지역경계가 auto면 dataGeojson을 지우고,
						// 시도,시군구,읍면동일 경우 경계와 데이터를 지우지 않는다.
						if($("#selectValue2").val()=="auto" || that.i == 1){
							if (this.dataGeojson) {
								this.dataGeojson.remove();
								this.removeCaption();
								this.dataGeojson = null;
							}
						}			

						var dataGeojson = null;
						if (!this.isTimeSeries) {
							dataGeojson =  this.addPolygonGeoJson(geoData, "data");	
						}
							
						if (type != undefined && type == "multi") {
							if (this.multiLayerControl.dataGeojson == null) {
								this.multiLayerControl.dataGeojson = [];
							};	
							this.multiLayerControl.dataGeojson.push(dataGeojson);
							this.dataGeojson = null;
						}else {
							if (this.multiLayerControl.dataGeojson != null && 
									this.multiLayerControl.dataGeojson.length > 0) {
								for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
									this.multiLayerControl.dataGeojson[i].remove();
								}
							}
							this.multiLayerControl.dataGeojson = null;
						}												

						this.dataGeojsonLayer = geoData;
						
						//시계열인 경우
						if (this.isTimeSeries) {
							if (options != undefined) {
								geoData["year"] = options.year;
								geoData["valPerSlice"] = that.legend.valPerSlice;
								this.timeSeriesLayer.push(geoData);
								//if (options.idx == options.totalCnt-1) {
									if (callback != undefined && callback instanceof Function) {
										callback.call(this, this.timeSeriesLayer, options);
									}
								//}
							}
						}
						
						if(index == undefined) {
							this.checkShowCaption();
						} else if(index >= 10) {
							if($('#dataMode2').val() != 'dataOff') {
								that.legend.numberData = true;
							}
							this.checkShowCaption();
						}

						if ($("#selectValue2").val()!="auto" && this.legend.selectType =="bubble"){
							$thematicMapFrame05.ui.mapList[0].multiLayerControl.dataGeojson = $thematicMapFrame05.ui.dataGeoJson;							
						}

						//버블추가
						this.legend.changeDataMode(this.legend.selectType);
						$thematicMapFrame05.Popup.close();
					}
					else {
						this.addPolygonGeoJson(geoData, "polygon");

						// 데이터경계가 있을 경우,
						// 지역경계가 데이터경계와 같을 때, 해당 지역경계를 지운다.
						if (this.dataGeojson) {
							if (this.geojson.getBounds().equals(this.dataGeojson.getBounds())) {
								this.geojson.remove();
							}	
						}
					}

					if (this.data.length > 0) {
						if (this.data[0].kosis) {
							interactiveMapKosis.setResultDataOnMap();
						}
					}
					// 지역경계가 auto면 통계 data를 비운다.
					if($("#selectValue2").val()=="auto"){
						this.data = [];
					}
					if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
						this.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
					}
				};

				this.combineStatsData = function (boundData) {			
					for ( var k = 0; k < that.data.length; k++) {
						if (that.data[k] != null) {
							boundData["combine"] = true;
						}else {
							boundData["combine"] = false;
						}

						for ( var i = 0; i < boundData.features.length; i++) {
							var adm_cd = boundData.features[i].properties.adm_cd;
							if (boundData.features[i].info == null) {
								boundData.features[i]["info"] = [];
								boundData.features[i]["isThematicMap"] = true;
							}

							if (that.data[k] != null) {
								if(that.data[k].result != null) {
									for ( var x = 0; x < that.data[k].result.length; x++) {
										for (key in that.data[k].result[x]) {
											if (key == "adm_cd") {
												if (adm_cd == that.data[k].result[x].adm_cd) {
													that.data[k].result[x]["showData"] = that.data[k].showData;
													that.data[k].result[x]["api_id"] = that.data[k].id;
													that.data[k].result[x]["unit"] = that.data[k].unit;
													that.data[k].result[x]["legendIndex"] = k;
													boundData.features[i].info.push(that.data[k].result[x]);
													boundData.features[i]["dataIdx"] = x;
													break;
												}
												break;
											}
										}


									}

								}
							}

						}
					}

					//읍면동별 전국지도가 off일때만 수행
					//2017.03.17 시계열 범례고정 수정
					if (!$("#eupmyundong").hasClass("on") && !this.isTimeSeries) {
						this.setLegendForStatsData();
					}
					return boundData;

				};

				this.setLegendForStatsData = function () {
					var arData = new Array();
					if (that.data.length > 0) {
						for ( var k = 0; k < that.data.length; k++) {
							var tmpData = new Array();
							if (that.data[k].showData) {
								if(that.data[k].result != null) {
									for ( var i = 0; i < that.data[k].result.length; i++) {
										for (key in that.data[k].result[i]) {
											if (key == that.data[k].showData) {
												tmpData.push(parseFloat(that.data[k].result[i][key]));
												break;
											}
										}	
									}
									arData.push(tmpData);
								}
							}
						}
					} 

					that.legend.valPerSlice = that.legend.calculateLegend(arData);//test

				};

				this.createHeatMap = function(options) {
					var minOpacity = 0.01;
					var radius = 10;
					var blur = 0;
					var max = 1;

					if (options != undefined) {
						if (options.minOpacity != undefined) {minOpacity = options.minOpacity;}
						if (options.radius != undefined) {radius = options.radius;}
						if (options.blur != undefined) {blur = options.blur;}
						if (options.max != undefined) {max = options.max;}
					}
					var heat = sop.heatLayer();
					heat.addTo(this.gMap);
					heat.setOptions({
						minOpacity: minOpacity,
						radius: radius,
						blur: blur,
						max: max
					});

					this.heatMap = heat;
				};

				this.addHeatMap = function(x, y, data) {
					if (this.heatMap) {
						this.heatMap.addUTMK([
						                      parseFloat(x),
						                      parseFloat(y),
						                      data
						                      ]);
					}
				};
				this.getLegendValues = function(param) {
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapExmpl.json",
						async : false,
						data : {
							stat_thema_map_id : param.stat_thema_map_id
						},
						success: function(res) {
							if (res.errCd == "0") {
								console.log("SseOk", res);
								that.thema_legend_values = res.result.legend_values;

								$('#themaInit_'+that.legend.id).trigger("click");
							}
						},
						dataType: "json",
						error:function(e){}  
					});
				};

				/** ********* OpenAPI 상권조회. End ********* */
				
				// 2016. 08. 03 j.h.Seok
				this.AreaAndStatsApis = function(_adm_cd, pagenum) {
					// mng_s 2017. 10. 30 j.h.Seok
					var adm_cd = _adm_cd;
					if(_adm_cd.length > 5) {
						_adm_cd = _adm_cd.substring(0, 5);
					}					
					// mng_e 2017. 10. 30 j.h.Seok
					
					// 시도 경계인 경우
					if (adm_cd == null) {

					}

					var mapBounds = that.gMap.getBounds();
					if(that.poiAdmCd == undefined || that.poiAdmCd == "" || that.poiAdmCd == null) {
						that.poiAdmCd = _adm_cd;
					} else {
						if(that.poiAdmCd != _adm_cd) {
							that.poiAdmCd = _adm_cd;
							that.markers.clearLayers();
						} else {
							return;
						}
					}

					if (this.gMap.getZoom() == 8) {
						var center = that.gMap.getCenter();
						var area = 'CIRCLE(' + center.x + ' ' + center.y + ',' + '5000' + ')';
						
						// mng_s 2017. 08. 03 석진혁
						//that.callThemePOIResult(area, pagenum);
						// mng_e 2017. 08. 03 석진혁
					} else if (that.gMap.getZoom() > 8) {
						var area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';

						that.callThemePOIResult(_adm_cd, area, pagenum);
					}
				},

				// mng_s 2017. 08. 03 석진혁
				this.callThemePOIResult = function(adm_cd, area, pagenum) {
					// mng_s 2017. 10. 30 j.h.Seok
					// var adm_cd = _adm_cd;
					if(_adm_cd.length > 5) {
						_adm_cd = _adm_cd.substring(0, 5);
					}					
					// mng_e 2017. 10. 30 j.h.Seok
					
					if(area === null || area === undefined) {
						var mapBounds = that.gMap.getBounds();
						
						area = "";
						area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';
					}
					
					var sopCompanySearchObj = new sop.thema.companySearch.api();
					sopCompanySearchObj.addParam("bnd_year", that.bnd_year);
					sopCompanySearchObj.addParam("year", that.thema_stat_data_base_year);
					sopCompanySearchObj.addParam("area", area);
					sopCompanySearchObj.addParam("resultcount", '500');
					sopCompanySearchObj.addParam("pagenum", pagenum);
					sopCompanySearchObj.addParam("adm_cd", adm_cd);
					
					if(that.theme_cd != undefined) {
						sopCompanySearchObj.addParam("theme_cd", that.theme_cd);
					}
					
					if(that.corp_class_cd != undefined) {
						sopCompanySearchObj.addParam("corp_class_cd", that.corp_class_cd);
					}

					var param = {
							"bnd_year"    : that.bnd_year,
							"year" 	      : that.thema_stat_data_base_year,
							"area"		  : area,
							"theme_cd"	  : that.theme_cd,
							"corp_class_cd"	  : that.corp_class_cd,
							"resultcount" : 500,
							"pagenum"     : pagenum,
							"adm_cd"	  : adm_cd
					};

					sopCompanySearchObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/thematicMap/getThemaMapPOI.json",
						options : {
							url : "/ServiceAPI/thematicMap/getThemaMapPOI.json",
							target : this,
							param : param,
							btntype: "poi",
							title : that.selectedPoiTitle,
							map : that.map
						}
					});
				},
				// mng_e 2017. 08. 03 석진혁

				/** 통계데이타 조회 **/
				/**
				 * 
				 * @name         : openInitStatData
				 * @description  : 통계 주제 데이터를 가져온다.
				 * @date         : 2015. 11. 10. 
				 * @author	     : 정수영
				 * @history 	 :
				 */

				this.openInitStatData = function openInitStatData(param, callback){					
					var stat_thema_map_id = param.stat_thema_map_id;					

					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaTest.json",
						async : false,
						data : {
							stat_thema_map_id : stat_thema_map_id
						},
						success: function(res) {
							if (res.errCd == "0") {
								that.initData = res.result.getThemaStatsInfo[0];
								var result = res.result.getThemaStatsInfo[0];
								//제목달기
								$(".helperText").prepend("<span>" + res.result.getThemaStatsInfo[0].title + "</span>");
//								$(".helperText span").text(res.result.getThemaStatsInfo[0].title);
								$(".helperText a").attr("title",res.result.getThemaStatsInfo[0].exp);									

								//leftside menu - left
								//
								if (result.left_sep_nm !=null && result.left_sep_unit !=null && result.left_sep_nm.length > 0 && result.left_sep_unit.length > 0){
									var leftHtml= '<a href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.changeLeftRightValue(1)" class="first" id="leftValue">'+ result.left_sep_nm+'('+result.left_sep_unit+')</a>'
									$('#stat_sel').append(leftHtml);
									//초기화
									$("#leftValue").addClass("on");
									$("#selectValue").val("leftValue");
								}
								//leftside menu - right
								if (result.right_sep_nm !=null && result.right_sep_unit!=null && result.right_sep_nm.length > 0 && result.right_sep_unit.length > 0){
									var rightHtml= '<a href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.changeLeftRightValue(2)" class="last" id="rightValue">'+ result.right_sep_nm+'('+result.right_sep_unit+')</a>'
									$('#stat_sel').append(rightHtml);								 
								}
								
								//시계열이고, 수/율 주제도일 때, 추가데이터 유무에 따라 증감률 추가
								if (result.add_data_disp_yn != null && result.add_data_disp_yn == "Y") {
									if ($("#rightValue").hasClass("last")) {
										$("#rightValue").removeClass("last");
									}
									var rightHtml= '<a href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.changeLeftRightValue(3)" class="last" id="etcValue">'+ result.sep_map_left_sep_nm+'('+result.sep_map_left_sep_unit+')</a>'
									$('#stat_sel').append(rightHtml);			
								}

								that.add_data_disp_yn = result.add_data_disp_yn;
								that.thema_map_data_id = result.thema_map_data_id;
								//증감률 데이터
								that.left_sep_unit = result.left_sep_unit;
								that.left_sep_nm = result.left_sep_nm;
								that.left_sep_source = result.left_sep_source;
								that.left_sep_ttip_title = result.left_sep_ttip_title;
								that.left_sep_chart_title = result.left_sep_chart_title;	
								that.left_base_year = result.left_base_year;	
								that.max_expnsn_level = result.max_expnsn_level;
								that.bnd_year = result.left_base_year;

								//CAGR 데이터
								that.right_sep_unit = result.right_sep_unit;
								that.right_sep_nm = result.right_sep_nm;
								that.right_sep_source = result.right_sep_source;
								that.right_sep_ttip_title = result.right_sep_ttip_title;
								that.right_sep_chart_title = result.right_sep_chart_title;							  
								that.min_redctn_level = result.min_redctn_level;
								that.thema_atdrc_yn = result.atdrc_yn;
								that.boundary_fix_yn = result.boundary_fix_yn;
								
								//추가데이터
								that.sep_map_data_id = result.sep_map_data_id;
								that.sep_map_left_sep_nm = result.sep_map_left_sep_nm;
								that.sep_map_left_sep_ttip_title = result.sep_map_left_sep_ttip_title;
								that.sep_map_left_sep_unit = result.sep_map_left_sep_unit;
								that.sep_map_right_sep_ttip_title = result.sep_map_right_sep_ttip_title;

								var tempPoiDispYn = res.result.getThemaStatsInfo[0].poi_disp_yn;
								if(tempPoiDispYn != undefined && tempPoiDispYn != null && tempPoiDispYn == 'Y') {
								  that.poi_disp_yn = true;
								  that.theme_cd = res.result.getThemaStatsInfo[0].theme_cd;
									// mng_s 2017. 08. 03 석진혁
									that.corp_class_cd = res.result.getThemaStatsInfo[0].corp_class_cd;
									// mng_e 2017. 08. 03 석진혁
								}

								$("#thematicMapOrigin").html(that.left_sep_source);

								//시계열년도고정유무가 Y이면, 기준경계년도에 맞는 경계를 표출한다.
								if (that.boundary_fix_yn == "Y") {
									that.bnd_year = that.left_base_year;
								}
								
								//경계년도 조회
								that.getThemaMapBaseYear(that.thema_map_data_id);

								// DB 에서 가져온 max_expnsn_level 의 값에 따른 분기 저리 필요
								// 01 : 시도 => 3
								// 02 : 시군구 => 5
								// 03 : 읍면동 => 8
								// 04 : 집계구 => 별도 줌 레벨 설정 필요 없음
								if(that.max_expnsn_level=="01"){
									  that.gMap.setMaxZoom(3);
									  $("#sido").attr('class', 'last');
									  $("#sigungu").hide();
									  $("#eupmyundong").hide();
								  }else if(that.max_expnsn_level=="02"){
									  that.gMap.setMaxZoom(5);
									  $("#sigungu").attr('class', 'last');
									  $("#eupmyundong").hide();
								  }else if(that.max_expnsn_level=="03"){
									  if(that.poi_disp_yn) {
										  that.gMap.setMaxZoom(11);
									  } else {
										  that.gMap.setMaxZoom(8);
									  }
								  }else if(that.max_expnsn_level=="04"){
									  that.gMap.setMaxZoom(11);
								  }
								that.thema_legend_type = res.result.getThemaStatsInfo[0].exmpl_type;
								if(that.thema_legend_type == '3') {
									that.getLegendValues($thematicMapFrame05.params);
								} else {
									$('#themaInit_'+that.legend.id).trigger("click");
								}

								//출처
								$(".thematicBotText").text(that.left_sep_source);
								
								if (callback != undefined && callback != null && callback instanceof Function) {
									  callback.call(undefined, res);
								}
							}
						} ,
						dataType: "json",
						error:function(e){}  
					});						
				};
				/** 통계 주제 데이터 조회 끝 **/

				/** 통계 주제 기준년도 데이터 목록 조회 **/
				/**
				 * 
				 * @name         : getThemaMapBaseYear
				 * @description  : 통계 기준년도 데이터 목록을 가져온다.
				 * @date         : 2015. 11. 12. 
				 * @author	     : 정수영
				 * @history 	 :
				 */

				this.getThemaMapBaseYear = function getThemaMapBaseYear(param){
					var thema_map_data_id = param;

					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
						async : false,
						data : {
							type : "1",
							thema_map_data_id : thema_map_data_id
						},
						success: function(res) {
							if (res.errCd == "0") {
								var list = new Array(); 
								for(var i=0;i<res.result.detailInfo.length;i++){
									list[i] = res.result.detailInfo[i].base_year;
								}

								that.base_year_list = list;
								//base_year초기값이 없으면 list[0]의 값을 넣는다.
//								if(that.base_year == ""){
//								that.base_year = list[0];
//								}
								// 주제도 설정 - 년도선택 리스트 태그를 붙인다.
								var output = "";
								output = '<span>년도선택</span>';
								output += '<select id="select_base_year" onchange="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()">';

								for(var i=0;i<list.length-1;i++){
									output += '<option>';
									output += list[i];
									output += '</option>';
								}
								output += '<option selected="true">'+list[list.length-1]+'</option>'
								$("#base_year").html(output);				
							}
						} ,
						dataType: "json",
						error:function(e){}  
					});						
				};
				/** 통계 세부 데이터 조회 끝 **/	

				/** 통계 주제 세부 데이터 조회 **/
				/**
				 * 
				 * @name         : getThemaMapData
				 * @description  : 통계 주제 데이터를 가져온다.
				 * @date         : 2015. 11. 12. 
				 * @author	     : 정수영
				 * @history 	 :
				 */

				this.getThemaMapData = function getThemaMapData(param, adm_cd, options, callback){
					var thema_map_data_id = param;
					var area_type = $("#selectValue2").val();					
					var selectYear = $("#select_base_year").val();
					//area_type : 지역구분, bnd_year : 기준년도, selectedRegion : 지역경계
					
					if (this.isTimeSeries) {
						selectYear = options.year;
					}

					// area_type이 auto면 지역상관없이 모두 가져온다.
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
						data : {
							thema_map_data_id : thema_map_data_id,
							area_type : area_type,
							adm_cd : adm_cd,
							stat_data_base_year : selectYear
						},
						success: function(res) {
							if (res.errCd == "0") {
								//통계 주제도 데이터 가져오기 전에 레이어를 지운다.
								that.gMap.eachLayer(function(layer){
									if (layer.feature) {
										layer.remove(); 
									}
								});

								//? 00이면 시도데이터
								if(adm_cd=="00"){
									res["pAdmCd"] = "00";
								}else{
									res["pAdmCd"] = adm_cd;
								}
								
								//모든 년도가 있는 데이터
								var result = res.result.detailInfo;
								that.dataBoardData = res.result.detailInfo;
								
								//소수점 한자리까지 표현
								// 2017. 03. 16 j.h.Seok
								for (var i=0; i<result.length; i++) {
									if (result[i].left_data_val) {
										result[i].left_data_val = parseFloat(result[i].left_data_val).toFixed(2);
									}
									if (result[i].right_data_val) {
										result[i].right_data_val = parseFloat(result[i].right_data_val).toFixed(2);
									}
								}

								// 선택된 기준년도와 같은 자료만 result1에 집어넣는다. 
								var result1 = new Array();
								var k=0;
								for(var i=0;i<result.length;i++){
									if(result[i].base_year==selectYear){
										result1[k] = result[i];
										k++;
									}
								}

								res.result = result1;

								//통계선택에서 증감률(left)를 선택이 되어있으면
								if($("#selectValue").val() == "leftValue"){

									// 테마주제 정보에서 툴팁타이틀을 각 data에 넣는다.
									for(var i=0;i<res.result.length;i++){
										res.result[i].left_sep_ttip_title = that.left_sep_ttip_title;									  
										res.result[i].left_sep_chart_title = that.left_sep_chart_title;									  
									}									  
									that.setStatsData("normal", res, "left_data_val", that.left_sep_unit);	

								}else if ($("#selectValue").val() == "rightValue") {
									// CAGR 데이터인 경우
									for(var i=0;i<res.result.length;i++){
										res.result[i].right_sep_ttip_title = that.right_sep_ttip_title;
										res.result[i].right_sep_chart_title = that.right_sep_chart_title;
									}								  
									that.setStatsData("normal", res, "right_data_val", that.right_sep_unit);	
									
								}else {
									// 테마주제 정보에서 툴팁타이틀을 각 data에 넣는다.
									for(var i=0;i<res.result.length;i++){
										res.result[i].left_sep_ttip_title = that.sep_map_left_sep_ttip_title;									  
										res.result[i].left_sep_chart_title = that.sep_map_right_sep_ttip_title;									  
									}									  
									that.setStatsData("normal", res, "left_data_val", that.sep_map_left_sep_unit);	
								}

								//주제도 설정 - 지역경계에서 자동 - 경계데이터 가져옴.
								//            - 시도,시군구,읍면동으로 설정되어 있으면 경계데이터를 밖에서 가져옴.
								var region = $("#selectValue2").val();
								$thematicMapFrame05.ui.dataGeoJson = [];

								//경계고정이 아닐때
								if (that.boundary_fix_yn == "N") {
									that.bnd_year = $("#select_base_year").val();
								}

								if(region == "auto"){	
									//데이터에 adm_cd의 경우 공백이 뒤에 붙는경우도 봤음 나중에 버그있을시 확인
									if(adm_cd=="00"){
										that.openApiBoundarySido(that.bnd_year, function(geojson) {
											if (that.reqType == "1") {
												thematicCharts(adm_cd, true);
											}else {
												thematicCharts(adm_cd, false);
											}
										});
									}else{
										that.openApiBoundaryHadmarea(adm_cd,that.bnd_year,  "1");
									}
								}else{
									//자동이 아니면 getRegionData에서 경계자료를 받는다.
									that.getRegionData(options, callback);
								} 

								//API 로그
								var logOptions = {
										type : "C0",
										theme : parent.$thematicMapMain.param.theme,
										params : {
											title : parent.$thematicMapMain.themaInfo.title + "^" + parent.$thematicMapMain.themaInfo.stat_thema_map_id,
											param : parent.$thematicMapMain.param,
											map : that.gMap
										}
								}
								//API로그 쌓기 (행정동코드로 지역 조회)
								addrCdToNm(parent.$thematicMapMain.themaInfo.stat_data_base_year, adm_cd, logOptions);
							}
						} ,
						dataType: "json",
						error:function(e){}  
					});						
				};
				/** 통계 세부 데이터 조회 끝 **/

				/**
				 * 
				 * @name         : getThemaMapDataboardData
				 * @description  : 데이터 보드 수치 값 조회
				 * @date         : 2016. 03. 05. 
				 * @author	     : SseOk
				 * @history 	 : 
				 */
				this.getThemaMapDataboardData = function getThemaMapDataboardData(adm_cd){
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
						async : false,
						data : {
							thema_map_data_id : that.thema_map_data_id,
							databoard_adm_cd : adm_cd
						},
						success: function(res) {
							if (res.errCd == "0") {
								//모든 년도가 있는 데이터
								var result = res.result.detailInfo;
								that.dataBoardData = res.result.detailInfo; 
							}
						} ,
						dataType: "json",
						error:function(e){}  
					});						
				},
				
				/**
				 * 
				 * @name         : changeRegionBound
				 * @description  : 주제도 설정 - 지역경계를 설정한다, 연도를 변경한다.
				 * @date         : 2015. 11. 16. 
				 * @author	     : 
				 * @history 	 :
				 */
				this.changeRegionBound = function(){
					var map1 = $thematicMapFrame05.ui.mapList[0];
					//선택된 년도
					var selectYear = $("#select_base_year >option:selected").text();
					if (that.dataGeoson) {
						that.dataGeojson.remove();
						that.dataGeojson = null;
					}

					if (that.multiLayerControl.dataGeojson != null && that.multiLayerControl.dataGeojson.length > 0) {
						for (var i=0; i<that.multiLayerControl.dataGeojson.length; i++) {
							that.multiLayerControl.dataGeojson[i].remove();
						}
						that.multiLayerControl.dataGeojson = null;
					}
					
					//수/율일 경우는 기존 id로 증감률일 때는 분할맵 id로 변경
					if (that.add_data_disp_yn == "Y" && $("#etcValue").hasClass("on")) {
						that.thema_map_data_id = that.initData.sep_map_data_id;
					}else {
						that.thema_map_data_id = that.initData.thema_map_data_id;
					}

					//경계 데이터를 지운다.
					that.regionData = null;
					
					that.markers.clearLayers();
					that.poiAdmCd = "";
					$thematicMapFrame05.ui.poiInfoArray = [];
					
					//자동
					if($("#selectValue2").val()=="auto"){
						that.isReloadMode = true;
						that.openApiReverseGeoCode(that.center,that.bnd_year);
						$("#timeSeries_type").hide();
						
						//2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
						if ($("#etcValue").hasClass("on")) {
							$('.sqListBox.sq03 .sqList').css("height","185px");
						}else {
							$('.sqListBox.sq03 .sqList').css("height","230px");
						}
						
						//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						$(".thematicCharts").show();
						$("#graph_help_text").hide();
						if (!$(".interactiveDataBoard").hasClass("on")) {
							$(".interactiveDataBoard").click();
						}
								
					}
					//시도별 통계지도
					else if($("#selectValue2").val()=="1"){	
						$('#themaInit_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,"00");
						if (that.add_data_disp_yn == "Y" && $("#etcValue").hasClass("on")) {
							$("#timeSeries_type").hide();
							$('.sqListBox.sq03 .sqList').css("height","185px"); //2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
						}else {
							$("#timeSeries_type").show();
							$('.sqListBox.sq03 .sqList').css("height","280px"); //2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
						}
						
						that.openApiReverseGeoCode(that.center,that.bnd_year);
						
						//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						$(".thematicCharts").hide();
						$("#graph_help_text").show();
						$(".interactiveDataBoard").addClass("on");
						$(".interactiveDataBoard").click();
					}
					//시군구별 통계지도
					else if($("#selectValue2").val()=="2"){
						$('#themaInit_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,that.curSidoCd);
						$("#timeSeries_type").hide();
						
						//2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
						if ($("#etcValue").hasClass("on")) {
							$('.sqListBox.sq03 .sqList').css("height","185px");
						}else {
							$('.sqListBox.sq03 .sqList').css("height","230px");
						}
						
						that.openApiReverseGeoCode(that.center,that.bnd_year);
						
						//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						$(".thematicCharts").hide();
						$("#graph_help_text").show();
						$(".interactiveDataBoard").addClass("on");
						$(".interactiveDataBoard").click();
					}
					//읍면동별 통계지도
					else if($("#selectValue2").val()=="3"){
						$('#themaInit_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,that.curSidoCd + that.curSggCd);
						$("#timeSeries_type").hide();
						
						//2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
						if ($("#etcValue").hasClass("on")) {
							$('.sqListBox.sq03 .sqList').css("height","185px");
						}else {
							$('.sqListBox.sq03 .sqList').css("height","230px");
						}
						
						that.openApiReverseGeoCode(that.center,that.bnd_year);
						
						//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						$(".thematicCharts").hide();
						$("#graph_help_text").show();
						$(".interactiveDataBoard").addClass("on");
						$(".interactiveDataBoard").click();
					}
				};


				/**
				 * 
				 * @name         : getRegionData
				 * @description  : 경계데이터를 가져온다.
				 * @date         : 2015. 11. 17. 
				 * @author	     : 
				 * @history 	 :
				 */

				this.getRegionData = function(options, callback){
					var selectYear = this.bnd_year;
					var region = $("#selectValue2").val();
					var count = "";								
					var startSeq = 0;
					var endSeq = 0;
										
					switch(parseInt(region)) {
						//전국시도
						case 1:
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
								async : false,
								data : {
									base_year : selectYear,
									region : region											 
								},
								success: function(res) {
									if (res.errCd == "0") {
										if(region=="1"){
											res["pAdmCd"] = "00";
										}else if(region=="2"){
											res["pAdmCd"] = that.curSidoCd;
										}else if(region=="3"){
											res["pAdmCd"] = that.curSidoCd + that.curSggCd;
										}
										//that.regionData = res;
										that.setPolygonDataGeojson(res, "normal", undefined, options, callback);
										
									} 								 
								},								  
								dataType: "json",
								error:function(e){}  
							});	
							break;
						//전국시군구	
						case 2:
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetRegionDataCount.json",
								async : false,
								data : {
									base_year : selectYear,
									region : region									 										  
								},
								success: function(res) {
									if (res.errCd == "0") {
										count = res.result; 
										var dividedNum = Math.ceil(count/10);
										for(that.i=1;that.i<11;that.i++){
											startSeq=endSeq+1; // 1
											if(that.i==10){
												endSeq=count;	
											}else{
												endSeq=startSeq+dividedNum-1; //8
											}
	
											$.ajax({
												type: "GET",
												url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
												async : false,
												data : {
													base_year : selectYear,
													region : region,
													startSeq : startSeq,
													endSeq : endSeq,
													atdrc_yn : that.thema_atdrc_yn
												},
												success: function(res) {
													if (res.errCd == "0") {
														if(region=="1"){
															res["pAdmCd"] = "00";
														}else if(region=="2"){
															res["pAdmCd"] = that.curSidoCd;
														}else if(region=="3"){
															res["pAdmCd"] = that.curSidoCd + that.curSggCd;
														}
														//regionData에 현재 경계데이터를 넣어준다.
														// 통계선택 및 지도유형이 바뀔때 경계데이타를 재사용해야한다.
	
														that.legend.numberData = false;
														that.setPolygonDataGeojson(res, "multi", that.i);
													}
												},								  
												dataType: "json",
												error:function(e){}  
											});	
										}
									}
								},									 
								dataType: "json",
								error:function(e){}  
							});
							
							break;
						//전국읍면동
						case 3:
							var sidoList = [];
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetSidoCodeList.json",
								async : true,
								success: function(res) {
									if (res.errCd == "0") {
										sidoList = res.result.sidoCodeList;
										var tmpData = deepCopy(that.data[0].result);
										var tmpData2 = [];
										for (var i=0; i<sidoList.length; i++) {
											that.tmpSidoData[sidoList[i].sido_cd] = [];
											if (tmpData2.length > 0) {
												that.data[0].result = tmpData2;
												tmpData2 = [];
											}
											for (var j=0; j<that.data[0].result.length; j++) {
												if (sidoList[i].sido_cd == that.data[0].result[j].sido_cd) {
													that.tmpSidoData[sidoList[i].sido_cd].push(that.data[0].result[j]);
												}else {
													tmpData2.push(that.data[0].result[j]);
												} 
											}                                                                                                                                                                                                                                                           
										}
										that.data[0].result = tmpData;
										that.setLegendForStatsData();
										that.reqEmgReigon(region, sidoList, 0);
									}
								},									 
								dataType: "json",
								error:function(e){}  
							});
							break;
					}

					// 자료를 다 불러와서 세팅했으면 that.i을 1로 초기화다.
					if(that.i == 10){
						that.i = 1;
					}
					//Count 끝

				};
				
				this.reqEmgReigon = function (type, data, index) {
					var sidoCd = data[index].sido_cd;
					var selectYear = $("#select_base_year").val();
					$.ajax({
						type: "GET",
						// 2017. 03. 29 오류 수정
						url: contextPath + "/js/data/geo_emdong_" + that.bnd_year + "/geo_emd_"+sidoCd+"_" + that.bnd_year + ".js",
						//url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
						async : false,
						data : {
							base_year : that.bnd_year,
							region : type,
							sido_cd : data[index].sido_cd,
							atdrc_yn : that.thema_atdrc_yn
						},
						success: function(res) {
							//if (res.errCd == "0") {
								res["pAdmCd"] = sidoCd;
								
								//regionData에 현재 경계데이터를 넣어준다.
								// 통계선택 및 지도유형이 바뀔때 경계데이타를 재사용해야한다.
								that.legend.numberData = false;
								that.data[0].pAdmCd = sidoCd;
								that.data[0].result = that.tmpSidoData[data[index].sido_cd];
								that.setPolygonDataGeojson(res, "multi", index);
								index++;
								if (index < data.length) {
									setTimeout(function() {
										that.reqEmgReigon(type, data, index);
									}, 20);
									
								}
							//}
						},								  
						dataType: "json",
						error:function(e){}  
					});
				};
				
				/**
				 * 
				 * @name         : timeSeriesPlay
				 * @description  : 시계열 조회를 시작/중지한다.
				 * @date         : 2016. 07. 12. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.timeSeriesPlay = function(bool) {
					this.isTimeSeries = bool;
					var totalCnt = $("#select_base_year option").size();
					if (bool) {
						var idx = 0;
						this.reqTimeSeriesData(idx, totalCnt);
					}
				};
				
				/**
				 * 
				 * @name         : reqTimeSeriesData
				 * @description  : 시계열 정보를 조회한다.
				 * @date         : 2016. 07. 13. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.reqTimeSeriesData = function(idx, totalCnt) {
					var year = $("#select_base_year option").eq(idx).val();
					var options = {
							year : year,
							totalCnt : totalCnt,
							idx : idx
					};
					this.getThemaMapData(that.thema_map_data_id, "00", options, function(layers, options) {
						if (options.idx == options.totalCnt-1) {
							$thematicMapFrame05.Popup.close();
							//2017.03.17 시계열 범례고정 수정 
							that.setLegendForStatsData();
							layer = layers.sort(function (a, b) { 
								return parseInt(a.year) - parseInt(b.year); 
							});
							var cnt = 0;
							
							that.timer = setInterval(function() {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								that.addPolygonGeoJson(layers[cnt], "data");
								that.checkShowCaption();
								that.multiLayerControl.dataGeojson = null;
								if($('#dataMode').val()=='bubble'){			
									$('#lgTypeList_'+that.legend.id+' a:eq(2)').trigger("click");
								}else{
									$('#lgTypeList_'+that.legend.id+' a:eq(1)').trigger("click");
								}
								$("#select_base_year").val(layers[cnt].year);
								cnt++;
								if (cnt == layers.length) {
									cnt = 0;
								}
							},2000);
						}else {
							var idx = options.idx;
							idx++;
							that.reqTimeSeriesData(idx, options.totalCnt);
						}
					});
				};
				

				this.multiLayerControl = {
						multiData : null,
						dataGeojson : null
				};

			},

	};								


	/** ********* OpenAPI 행정동경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.hadmarea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);

				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(that.openApiBoundaryHadmarea(options.adm_cd, options.year, options.low_search), 500);
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 행정동경계 검색 End ********* */

	/** ********* OpenAPI 집계구경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.statsarea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					that.setPolygonDataGeojson(res);
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(that.openApiBoundaryStatsarea(options.adm_cd, options.year), 500);
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 집계구경계 검색 End ********* */

	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {

				var that = options.target;
				
				//처음 리버스지오코딩 할때
				if(that.thema_map_data_id == ""){
					console.log($thematicMapFrame05.params);
					that.openInitStatData($thematicMapFrame05.params);
					//that.getThemaMapBaseYear(that.thema_map_data_id);				
				}

				if (res.errCd == "0") {
					var result = res.result[0];
					var curSidoCd = result.sido_cd;
					var curSggCd = result.sgg_cd;
					var curDongCd = result.emdong_cd;

					if (that.isInnerMapShow){
						that.openApiBuildArea(that.bounds);

						//지역경계가 "auto"일 경우 해당하는 getThemaMapData를 실행한다.
					}else if($("#selectValue2").val()=="auto"){

						switch (that.curPolygonCode) {

						// 전국
						case 1:
							that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame05.ui.poiInfoArray = [];
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == null && that.lastGeojsonInfo.info == "sidoArea") {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								that.openApiBoundaryContry();
							}
							break;

							//전국시도 
							// 전국시도는 시도데이터를 가지고 있는 파일을 가져옴.
						case 2:
							that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame05.ui.poiInfoArray = [];
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == '00') {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								if (that.dataGeoson) {
									that.dataGeojson.remove();
								}
								that.getThemaMapData(that.thema_map_data_id,"00");
							}
							break;

							// 시군구
						case 3:
							that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame05.ui.poiInfoArray = [];
							//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								if (that.dataGeoson) {
									that.dataGeojson.remove();
								}
								that.getThemaMapData(that.thema_map_data_id,curSidoCd);
							}
							break;

							// 동면읍
						case 4:
							that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame05.ui.poiInfoArray = [];
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSggCd) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								if (that.dataGeoson) {
									that.dataGeojson.remove();
								}
								that.getThemaMapData(that.thema_map_data_id,curSidoCd + curSggCd);
							}
							break;

							// 집계구
						case 5:
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSggCd + curDongCd) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else if(!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSggCd && that.poi_disp_yn) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								} else {
									console.log('aleady exist');
								}
								that.AreaAndStatsApis(curSidoCd + curSggCd + curDongCd, '0');
							} else {
								if (that.dataGeoson) {
									that.dataGeojson.remove();
								}
								
								if(that.poi_disp_yn) {
									that.getThemaMapData(that.thema_map_data_id, curSidoCd + curSggCd);
									that.AreaAndStatsApis(curSidoCd + curSggCd + curDongCd, '0');
								} else {
									that.AreaAndStatsApis(curSidoCd + curSggCd + curDongCd, '0');
								}
							}
							break;
						default:
							break;
						}
					} else if(that.curPolygonCode > 4 && that.poi_disp_yn) {
						that.AreaAndStatsApis(curSidoCd + curSggCd + curDongCd, '0');
					} else if(that.curPolygonCode < 5) {
						that.markers.clearLayers();
						that.poiAdmCd = "";
						$thematicMapFrame05.ui.poiInfoArray = [];
					}

					that.isReloadMode = false;
					that.curSidoCd = result.sido_cd;
					that.curSggCd = result.sgg_cd;
					that.curDongCd = result.emdong_cd;
					that.mapNavigation.reverseOnSelectChange(that);
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					if (options.center != undefined && options.center != null) {
						if(errCount < 10){
							errCount++;
							setTimeout(that.openApiReverseGeoCode(options.center,that.bnd_year), 500);
						}else{
						}
					}
				} else if (res.errCd = "-100") {
					that.mapNavigation.notFoundData(that);
				}
				else {
					////messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {

			}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩. End ********* */

	/** ********* OpenAPI 실내건물조회 Start ********* */
	(function () {
		$class("sop.openApi.bdArea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					if (that.geojson) {
						that.geojson.remove();
						that.geojson = null;
					}
					that.addPolygonGeoJson(res, "build");

					//API 로그
					apiLogWrite("A0", options);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 실내건물조회. End ********* */

	/** ********* OpenAPI 상권조회 Start ********* */
	(function () {
		$class("sop.openApi.tradeArea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					if (that.tradeGeojson) {
						that.tradeGeojson.remove();
						that.tradeGeojson = null;
					}
					that.addPolygonGeoJson(res, "trade");
				}
			},
			onFail : function (status) {
			}
		});
	}());

	// mng_s 2017. 08. 03 석진혁
	(function () {
		$class("sop.thema.companySearch.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					console.log(res);
					
					// mng_s 2017. 08. 03 석진혁
					var listCount = res.result.list_count[0];
					
					var totalCount = parseInt(listCount.totalcount);
					var returnCount = parseInt(listCount.returncount);
					var pageNum = parseInt(listCount.pagenum);
					var apicallCount = parseInt(totalCount / (options.param.resultcount * (pageNum + 1)));

					if(pageNum == '0') {
						that.markers.clearLayers();
						$thematicMapFrame05.ui.poiInfoArray = [];
					}

					console.log('apicallCount', apicallCount);
					if (returnCount !== totalCount && apicallCount > 0) {
//						that.AreaAndStatsApis(options.adm_cd, pageNum + 1);
						that.callThemePOIResult(options.adm_cd, null, pageNum + 1);
					}
					var poiList = res.result.company_list;
					// mng_e 2017. 08. 03 석진혁
					
					if (poiList.length > 0) {
						for ( var i = 0; i < poiList.length; i++) {
							var _markerIcon = sop.icon({
								iconUrl : '/img/marker/marker/70_07.png',
								shadowUrl : '/img/marker/theme_shadow.png',
								iconAnchor : [ 13, 40 ],
								iconSize : [ 25, 40 ],
								infoWindowAnchor: [1, -34]
							});

							var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
								icon : _markerIcon
							});

							_marker.info = poiList[i];
							_marker.addTo(that.markers);

							var tel_num = "";
							if (!sop.Util.isUndefined(poiList[i].tel_no)) {
								tel_num = poiList[i].tel_no;
								tel_num = appendHyphenToPhoneNumber(tel_num);
							}

							var tempList = {};
							tempList.corp_nm = poiList[i].corp_nm;
							tempList.naddr = poiList[i].naddr;
							tempList.class_nm = poiList[i].class_nm;
							tempList.worker_sum = poiList[i].worker_sum;
							$thematicMapFrame05.ui.poiInfoArray.push(tempList);

							var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
							html += '<tr>';
							html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
							html += '<td >';
							html += '</td>';
							html += '</tr>';
							//html += '<tr>';
							//html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
							//html += '<td >';
							//html += '</td>';
							//html += '</tr>';
							html += '</table>';
							_marker.bindInfoWindow(html);
						}
					}
					else {
						//window.parent.messageAlert.open("알림", "해당 지역 보육업체 검색결과가 없습니다.");
					}
				}
			},
			onFail : function (status) {
			}
		});
		}());
}(window, document));
