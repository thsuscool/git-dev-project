/**
 * 맵에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/19 초기 작성 author : 권차욱 version : 1.0 see :
 * 
 */

(function (W, D) {
	W.$map = W.$map || {};
	
	sMap = {
			
			map : function() {
				var that = this;
				this.id = null;
				this.mapInfo = null;
				this.bizStatsChart = null;
				this.delegate = null;
				this.gMap = null;
				this.target = null;	 		// target element
				this.isScale = false; 		// map scale 유무
				this.isPanControl = false; 	// map panControl 유무
				this.isMouseOver = false;
				this.isMeasureControl = true;
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
				this.curPolygonCode = 4;
				this.data = [];
				this.curSidoCd = null;
				this.curSiggCd = null;
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
				this.miniMap = null;
				this.isMiniMapDraw = false; 
				this.isTradeMapShow = false;
				this.isZoomSliderControl = true;
				this.isZoomAnimation = true;
				this.render = null;
				this.lastDrawList = [];
				this.mouseOverAdmCd = null;
				this.markers = null;
				this.mapNavigation = null;
				
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
				
					//zoomAnimation (IE10 이하일 경우 false)
					if(browserFnc() != -1 && browserFnc() < 11) {
						//this.isZoomAnimation = false;
					}
					
					this.gMap = sop.map(this.target, {
						buildingLayer: true,
						scale : this.isScale,
						panControl : this.isPanControl,
						measureControl : this.isMeasureControl,
						attributionControl : false,
						zoomSliderControl: this.isZoomSliderControl, //줌 컨트롤
						zoomAnimation : this.isZoomAnimation	//줌 애니메이션 효과
					});
					
					this.initializeHonamMarker();
					
					this.gMap.setView(sop.utmk(this.center[0], this.center[1]), this.zoom);
					this.bounds = this.gMap.getBounds();
					this.miniMap = new sMap.miniMap();	
					this.render = sop.svg();
					this.markers = sop.markerClusterGroup({
						animateAddingMarkers: true,
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
							this.gMap.setView(sop.utmk(center[0], center[1]), zoom, {
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
						this.gMap.setZoom(zoom);
					}
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
				
				this.initializeHonamMarker = function() {
					sop.MarkerHonam = sop.Marker.extend({
		                options: {
		                    levelIconMode: true,
		                    iconCreateFunction: null,
		                },

		                getEvents: function () {
		                    var fn = sop.Util.bind(sop.Marker.prototype.getEvents, this);
		                    var events = fn();
		                    if(this.options.levelIconMode) {
		                        if(!!this.options.iconCreateFunction) {
		                            events.zoomend = this.options.iconCreateFunction;
		                        } else {
		                            events.zoomend = this._defaultIconCreateFunction;
		                        }
		                    }
		                    return events;
		                },

		                _defaultIconCreateFunction: function (e) {
		                    var zoomLevel = e.target.getZoom();
		                    if( zoomLevel  <= 5 ) {
		                        this.setIcon(this.options.divIconLists[2]);
		                    } else if( zoomLevel == 6 ) {
		                        this.setIcon(this.options.divIconLists[1]);
		                    } else if( zoomLevel > 6 ) {
		                    	this.setIcon(this.options.divIconLists[0]);
		                    }
		                }
		            });
				};
				
				this.addHonamMarker = function(x, y, options) {
					var marker = null;
					var visible = false;
					if (options != undefined && options.visible != undefined) {
						visible = options.visible;	
					}
					if (this.gMap) {
						marker = new sop.MarkerHonam([ x, y ], options);		
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
						
						if(options.color != undefined) {
							color = options.color;	
						}	
					}

					if (this.gMap) {
						marker = sop.circleMarker([x,y], {
							radius:options.radius,
							color :color,
							fillColor : options.fillColor,
							fillOpacity : 0.7,
							weight:2,
							renderer: this.render,
							options : options.options
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
						this.dataGeojson.eachLayer(function (layer) {
							layer.removeCaption();
						});
					}
					
					if (this.tradeGeojson) {
						this.tradeGeojson.remove();
					}
					
					if (this.miniMap) {
						if(this.miniMap.geojson) {
							this.miniMap.geojson.remove();
						}
					}
					
					this.data = [];
					this.combineData = [];
					this.dataGeojson = null;
					this.curDropPolygonCode = null;
					this.valPerSlice = [];
					this.legendValue = [];
					this.lastGeojsonInfo = null;
					this.openApiReverseGeoCode(that.center);
					this.isTradeMapShow = false;
					this.lastDrawList = [];
					this.legendValue.user = [];
					if (this.drawControl) {
						this.drawControl.removeOverlay();
					}
					this.markers.clearLayers();
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
						this.openApiReverseGeoCode(that.center);
					}
				};
				
				this.setTradeMap = function(isShow) {
					this.isTradeMapShow = isShow;
					if (isShow) {
						if (this.zoom >= 10) {
							this.openApiTradeArea(this.bounds);
						}
						
					}
				}
				
				
				
				this.setLegendColor = function (colorSet) {
					if (colorSet) {
						this.legendColor = colorSet;
						if (this.dataGeojson) {
							this.updatePolygonGeoJson();
						}
					}
				};
				
				this.updatePolygonGeoJson = function () {
					this.gMap.eachLayer(function (layer) {
						if (layer.feature) {
							that.setLayerColor(layer.feature, layer);
						}
						
					});
				};
				
				this.setPolygonGeoJsonStyle = function (type) {			
					// 일반경계일 경우, 색상을 채우지않고,
					// 데이터경계일 경우, 색상을 채운다.
					var color = "#666666";
					var fillColor = "white";
					var weight = 2.5;
					var fillOpacity = 0;
					if (type == "data") {
						color = "white", 
						fillColor = "#F0FFF0";
						weight = 2.5;
						fillOpacity = 0.7;
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
						dashArray: '3',
						fillOpacity : fillOpacity,
						fillColor : fillColor
					};
				};
				
				this.addPolygonGeoJson = function (obj, type, opt) {
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
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
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}
									
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
									that.mapMove([layer.dropUTMK.x, layer.dropUTMK.y], that.zoom);
									
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
					
				};

				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					if (layer == that.curSelectedLayer) {
						layer.setStyle({
							weight : 5,
							color : "#ff0000",
							dashArray : layer.options.dashArray,
							fillOpacity : layer.options.fillOpacity,
							fillColor : layer.options.fillColor
						});
					}
					else {
						layer.setStyle({
							weight : 5,
							color : "#0086c6",
							dashArray : layer.options.dashArray,
							fillOpacity : layer.options.fillOpacity,
							fillColor : layer.options.fillColor
						});
						
					}
					
					if (!sop.Browser.ie) {
						layer.bringToFront();
					}
				};
				
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					
					if (that.curSelectedLayer) {
						layer.setStyle({
							weight : 3,
							color : "#ff0000",
							dashArray : layer.options.dashArray,
							fillOpacity : layer.options.fillOpacity,
							fillColor : layer.options.fillColor
						});
					}
					
					if (layer != that.curSelectedLayer) {
						
						var color = "#666666";
						var weight = 3;
						if (layer.options.type == "polygon" || 
							layer.options.type == "build" || 
							layer.options.type == "trade") {
							color = "#666666";
							weight = 3;
						}
						else {
							color = "white";
							weight = 3;
						}
						
						layer.setStyle({
							weight : weight,
							color : color,
							dashArray : layer.options.dashArray,
							fillOpacity : layer.options.fillOpacity,
							fillColor : layer.options.fillColor
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
							
							if (!that.isDrop) {
								that.openApiReverseGeoCode(that.center);
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
							var mapPolygonCode = 0;

							// 전국단위 경계표출
							if (that.zoom <= 1) {
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
							}
							
							else if (that.zoom > 1 && that.zoom <= 3) {
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
						this.dataGeojson.eachLayer(function (layer) {
							layer.removeCaption();
						});
						this.dataGeojson = null;
					}
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
						//this.setZoom(10);
						this.openApiReverseGeoCode(this.center);
						break;
					
					default:
						break;
					
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
						  type: "POST",
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
				this.openApiBoundarySido = function (year) {
					$.ajax({
						  type: "POST",
						  url: "/js/data/geo_sido_" + year + ".js",
						  success: function(res) {
							  res["pAdmCd"] = "00";
							  that.setPolygonDataGeojson(res);
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
				this.openApiReverseGeoCode = function (center) {
					var sopOpenApiReverseGeoCodeObj = new sop.openApi.ReverseGeoCode.api();
					sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
					sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
					sopOpenApiReverseGeoCodeObj.addParam("x_coor", center[0]);
					sopOpenApiReverseGeoCodeObj.addParam("y_coor", center[1]);
					
					sopOpenApiReverseGeoCodeObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
						options : {
							target : this,
							center : center
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
							target : this,
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
										if (param == feature.info[x].showData) {
											layer.setStyle({
												weight : layer.options.weight,
												color : layer.options.color,
												dashArray : layer.options.dashArray,
												fillOpacity : layer.options.fillOpacity,
												fillColor : that.getColor(feature.info[x][param], that.valPerSlice[x])[0]
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
								fillColor : that.getColor(feature.info[0], that.valPerSlice[0])[0]
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
											tmpLevel.push(that.getColor(feature.info[x][param], that.valPerSlice[feature.info[x].legendIndex])[1]);
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
								fillColor : that.getColorForLevel(level)
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
								fillColor : that.getColorForLevel(level)
							});
							
						}
						
					}
					
				};
				
				this.setCaption = function () {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function(layer) {
							//결합데이터
							if (layer.feature.combine) {
								if (layer.feature.combineData != undefined) {
									layer.setCaption({title:appendCommaToNumber(layer.feature.combineData) + " (%)", color:"red"});
								}else {
									layer.setCaption({title:"N/A", color:"#989898", showAllZoomLevel: false});
								}
							}else {
								if (layer.feature.info.length > 0) {
									for (param in layer.feature.info[0]) {
										if (layer.feature.info[0].showData == param) {
											layer.setCaption({title:appendCommaToNumber(layer.feature.info[0][param])+ " ("+layer.feature.info[0].unit + ")", color:"red", showAllZoomLevel: false});
											break;
										}
									}
								}else {
									layer.setCaption({title:"N/A", color:"#989898"});
								}
							}
						});
					}
				};
				
				this.setPolygonDataGeojson = function (geoData) {
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
						}
						
						//시계열때문에 드랍된 현재위치정보를 저장한다.
						this.setDroppedInfo();
					}
					
					// res = combineStatsData(res);
					if (geoData.combine && this.data.length > 0) {
						if (this.dataGeojson) {
							this.dataGeojson.remove();
							/*this.dataGeojson.eachLayer(function (layer) {
								layer.removeCaption();
							});*/
							
							this.dataGeojson = null;
						}
						//this.addPolygonGeoJson(geoData, "polygon");
						this.addPolygonGeoJson(geoData, "data");
						if (this.isMiniMapDraw) {
							if (this.miniMap.geojson) {
								this.miniMap.geojson.remove();
								this.miniMap.geojson = null;
							}
							this.miniMap.mapMove([989674, 1818313], 8, false);
							this.miniMap.addPolygonGeoJson(geoData, "mini");
						}
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
			
					this.data = [];
					
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

					this.setLegendForStatsData();
					return boundData;
					
				},
				
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
					} that.valPerSlice = this.calculateLegend(arData);

				},
				
				this.calculateLegend = function(arData) {	
					var tmpValPerSlice = new Array();
					
					//균등분할방식				
					this.legendValue.equal = [];
					this.legendValue.auto = [];

					for ( var k = 0; k < arData.length; k++) {
						var min = Math.min.apply(null, arData[k]);
						var max = Math.max.apply(null, arData[k]);
						var result = Math.round((min + max) / 5);
						if (result == 0) {
							result = 1;
						}
						
						/*var tmpResultArray = [];
						for ( var x = 0; x < 5; x++) {
							tmpResultArray[x] = result;
						}*/
						
						var tmpResult = new Array();
						for ( var y = 1; y <= 5; y++) {
							if (result == 1) {
								tmpResult.push(result);
							}else {
								tmpResult.push(result * y);
							}
						}
	
						if (tmpResult.length < 5) {
							for ( var x = 0; x < 5 - tmpResult.length; x++) {
								tmpResult.push("");
							}
						}
						tmpValPerSlice[k] = tmpResult;
					}
					this.legendValue.equal = tmpValPerSlice;
					var tmpValPerSlice2 = new Array();
					
					//자동분할(분포분할)
					for ( var i = 0; i < arData.length; i++) {
						var tmpSortArray = arData[i].sort(function (a, b) {
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
							tmpValPerSlice2[i] = tmpGroupArray;
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
							tmpValPerSlice2[i] = tmpResult;
						}
						
					}
					this.legendValue.auto = tmpValPerSlice2;
					
					if (this.legendValue.user == undefined || this.legendValue.user.length == 0) {
						var tmpValPerSlice3 = new Array();
						var tmpArray = [100, 200, 300, 400, ""];
						tmpValPerSlice3.push(tmpArray);
						this.legendValue.user = tmpValPerSlice3;
					}
					
					if($("#legendColor_"+this.mapInfo.id).find("#legend_auto").is(":checked")) {
						return this.legendValue.auto;
					}else if($("#legendColor_"+this.mapInfo.id).find("#legend_equal").is(":checked")) {
						return this.legendValue.equal;
					}else if($("#legendColor_"+this.mapInfo.id).find("#legend_user").is(":checked")) {
						return this.legendValue.user;
					} else {
						return this.legendValue.auto;
					}
				
				},
				
				
				this.getColor = function (value, valPerSlice) {
					if (valPerSlice.length < 5 && that.legendType == "auto") {
						for (var i=0; i<valPerSlice.length; i++) {
							if (value == valPerSlice[i]) {
								return [ that.legendColor[i], i+1 ];
							}
						}

					}else {
						return value < valPerSlice[0] ? [ that.legendColor[0], 1 ] : 
							   value < valPerSlice[1] ? [ that.legendColor[1], 2 ] : 
							   value < valPerSlice[2] ? [ that.legendColor[2], 3 ] : 
							   value < valPerSlice[3] ? [ that.legendColor[3], 4 ] :
								   						[ that.legendColor[4], 5 ];	
					}
	
				},
				
				this.getColorForLevel = function (level) {
					var color;
					switch (level) {
					
					case 1:
						color = that.legendColor[0];
						break;
					
					case 2:
						color = that.legendColor[1];
						break;
					
					case 3:
						color = that.legendColor[2];
						break;
					
					case 4:
						color = that.legendColor[3];
						break;
					
					case 5:
						color = that.legendColor[4];
						break;
					
					default:
						color = '#FFEDA0';
						break;
					
					}
					
					return color;
					
				};
			
			},	
			
			miniMap : function() {
				var that = this;
				this.delegate = null;
				this.target = null;
				this.center = null;
				this.zoom = null;
				this.gMap = null;
				this.geojson = null;
				this.isMouseOver = false;
				this.isDrop = false;
				this.isZoomStart = false;
				this.data = [];
				this.curSelectedLayer = null;
				this.legendColor = null;
				this.id = null;
		
				// 맵을 생성한다.
				this.createMap = function (delegate, target, opt) {
					if (opt !== undefined && opt.center != undefined) {
						this.center = opt.center;
					}
					else {
						this.center = [ 953427, 1950827 ];
					}
					
					if (delegate) {this.delegate = delegate;}
					if (target) {this.target = target;}	
					if (opt !== undefined && opt.zoom !== undefined) {
						this.zoom = opt.zoom;
					}else {
						this.zoom = 5; //6->5
					}

					this.gMap = sop.map(this.target, {
						buildingLayer: true,
						ollehTileLayer: false,
						scale: false, // 축적 컨트롤
						panControl: false, // 지도이동 컨트롤
						zoomSliderControl: false, //줌 컨트롤
						measureControl: false, // 측정 컨트롤 (면적, 길이)
						attributionControl: false // 지도속성 컨트롤

					});
					this.gMap.setView(this.center, this.zoom);
					
				};
				
				this.mapMove = function (center, zoom, animate) {
					if (animate == null) {
						animate = false;
					}
					
					if (center != null) {
						this.center = center;
						
						if (zoom != null) {
							this.zoom = zoom;
							this.gMap.setView(sop.utmk(center[0], center[1]), zoom, {
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
				
				this.eventAllDiabled = function() {
						this.gMap.dragging.disable();
						this.gMap.touchZoom.disable();
						this.gMap.doubleClickZoom.disable();
						this.gMap.scrollWheelZoom.disable();
				},
				
				this.setPolygonGeoJsonStyle = function (type) {			
					// 일반경계일 경우, 색상을 채우지않고,
					// 데이터경계일 경우, 색상을 채운다.
					var color = "#ffb2a5";
					var fillColor = "#F0FFF0";
					var fillOpacity = 0.7;
					var weight = 1;
					
					return {
						weight : weight,
						opacity : 1,
						color : color,
						//dashArray: 3,
						fillOpacity : fillOpacity,
						fillColor : fillColor
					};
				};
				
				this.addPolygonGeoJson = function (obj, type, opt) {
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							that.setLayerColor(feature, layer);	
							layer.on({
								mouseover : function (e) {
									that.isMouseOver = true;		
									that.setPolyLayerMouseover(e);
									
									// mouse over , 사용자 콜백
									if (that.delegate && 
										that.delegate.callbackFunc &&
										that.delegate.callbackFunc.didMouseOverPolygon) {
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
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}

									if (that.delegate && 
										that.delegate.callbackFunc && 
										that.delegate.callbackFunc.didSelectedPolygon) {
										that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
									}
									
								},
							
							});
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
					
					});
					
					this.geojson = geojson;
					
					if (opt) {
						if (opt.group) {
							this.geojson.addTo(opt.group);
						}
						else {
							this.geojson.addTo(this.gMap);
						}
					}
					else {
						this.geojson.addTo(this.gMap);
					}
					
					
					this.gMap.fitBounds(geojson.getBounds());

					
				};
				
				this.setLayerColor = function (feature, layer) {
					feature["combine"] = false;
					if (feature.info) {
						for ( var x = 0; x < feature.info.length; x++) {
							if (feature.info[x].adm_cd == feature.properties.adm_cd) {
								layer.setStyle({
									weight : layer.options.weight,
									color : layer.options.color,
									dashArray : layer.options.dashArray,
									fillOpacity : layer.options.fillOpacity,
									fillColor : "#ff2400"
								});
							}
						}
					}
					
				};

				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					layer.setStyle({
						weight : 1,
						color : "#0086c6",
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
					
					if (!sop.Browser.ie) {
						layer.bringToFront();
					}
				};
				
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					var color = "#ffb2a5";
					var weight = 1;
						
					layer.setStyle({
						weight : weight,
						color : color,
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
						

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
							that.zoom = e.target._zoom;
							if (that.delegate && 
							    that.delegate.callbackFunc &&
							    that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
								that.delegate.callbackFunc.didMapZoomEnd(e, that);
							}
						});
					}
	
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
				if (res.errCd == "0") {
					var result = res.result[0];
					var curSidoCd = result.sido_cd;
					var curSiggCd = result.sgg_cd;
					var curDongCd = result.emdong_cd;	
					
					if (that.isInnerMapShow){
						that.openApiBuildArea(that.bounds);
					}else {
						switch (that.curPolygonCode) {
						
						// 전국
						case 1:
							that.openApiBoundaryContry();
							break;
						
						//전국시도
						case 2:
							that.openApiBoundarySido(that.bnd_year);
							break;
						
						// 시군구
						case 3:
							//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (that.lastGeojsonInfo != null 
									&& that.lastGeojsonInfo.adm_cd == curSidoCd 
									&& that.lastGeojsonInfo.year == that.bnd_year) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}else {
									that.clearData();
									that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year, "1");
								}
							}else {
								that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year, "1");
							}
							break;
						
						// 동면읍
						case 4:
							if (that.lastGeojsonInfo != null 
									&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd 
									&& that.lastGeojsonInfo.year == that.bnd_year) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}else {
									that.clearData();
									that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1");
								}
							}else {
								that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1");
							}
							break;
						
						// 집계구
						case 5:
							if (that.lastGeojsonInfo != null 
									&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd + curDongCd
									&& that.lastGeojsonInfo.year == that.bnd_year) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}else {
									that.clearData();
									that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year);
								}							
							}else {
								that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year);
							}
							break;
						
						default:
							break;
						
						}
					}
					
					that.curSidoCd = result.sido_cd;
					that.curSiggCd = result.sgg_cd;
					that.curDongCd = result.emdong_cd;
					that.mapNavigation.reverseOnSelectChange(that);
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					if (options.center != undefined && options.center != null) {
						setTimeout(that.openApiReverseGeoCode(options.center), 500);
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
	/** ********* OpenAPI 상권조회. End ********* */
	
}(window, document));
