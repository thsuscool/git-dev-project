/**
 * 맵에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/11/20 초기 작성 author : wodus version : 1.0 see :
 * 
 */

(function (W, D) {
	W.$map = W.$map || {};
	
	sMap = {
			
			map : function() {
				var that = this;
				this.id = null;
				this.delegate = null;
				this.gMap = null;
				this.target = null;	 		// target element
				this.isScale = false; 		// map scale 유무
				this.isPanControl = false; 	// map panControl 유무
				this.isMouseOver = false;
				this.isDrop = false;
				this.isFirstDraw = true;
				this.isZoomStart = false;
				this.center = null;			// center 좌표(utmk)
				this.zoom = 14;			    // zoom level
				this.maxZoom = 16;
				this.minZoom = 12;
				this.maxBounds = null;
				this.geojson = null;
				this.bounds = null;
				this.curSelectedLayer = null;
				this.dataType = "normal";
				this.dropEvent = null;
				this.bnd_year = "2014";

				
				
				// 맵을 생성한다.
				this.createMap = function (delegate, target, opt) {

					if (!opt.center) {
						this.center = [ 953922, 1952036 ];
					}
					else {
						this.center = opt.center;
					}
					
					if (delegate) {this.delegate = delegate;}
					if (target) {this.target = target;}
					
					if (opt.zoom) {this.zoom = opt.zoom;}
					if (opt.maxZoom) {this.maxZoom = opt.maxZoom;}
					if (opt.minZoom) {this.minZoom = opt.minZoom;}
					if (opt.maxBounds) {this.maxBounds = opt.maxBounds;}
					
					if (opt.scale !== undefined) {this.isScale = opt.isScale;}
					if (opt.panControl !== undefined) {this.isPanControl = opt.isPanControl;}	
					if (opt.zoom !== undefined) {this.zoom = opt.zoom;}
				
					
					this.gMap = sop.map(this.target, {
						maxZoom : this.maxZoom,
						minZoom : this.minZoom,
						maxBounds : this.maxBounds,
						scale : this.isScale,
						panControl : this.isPanControl,
						attributionControl : false
					});
					this.gMap.setView(sop.utmk(this.center[0], this.center[1]), this.zoom);
					this.bounds = this.gMap.getBounds();
				};
				
				this.update = function () {
					this.gMap._onResize();
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
				
				this.addMarker = function (utmkPoint, options) {		
					var marker = null;
					var visible = false;
					if (options != undefined && options.visible != undefined) {
						visible = options.visible;	
					}
					if (this.gMap) {
						marker = sop.marker(utmkPoint, options);		
						marker.addTo(this.gMap);
						
						if (options.tooltipMsg != null) {
							marker.bindInfoWindow(options.tooltipMsg);
							if (visible) {
								marker.bindInfoWindow(options.tooltipMsg)
									  .openInfoWindow();
							}	
						}
					}
					return marker;
				};
				
				this.removeMarker = function (marker) {
					if (marker) {
						marker.remove();
					}
				};
				
				this.clearDataOverlay = function () {
					;
				};
				
				
				this.setLayerColor = function (feature, layer) {
					;
				};
				
				this.setCaption = function () {
					;
				};
				
				
				this.setPolygonGeoJsonStyle = function (type) {			
					// floor(층 경계), company(사업체경계), etc(시설 경계), selectCompany(사업체 하이라이트)
					var stroke		= true ;
//					var color 		= "#BBBBBB";
					var color 		= "#4C4C4C";
					var fill 		= false;
					var fillColor 	= "#F1F1F3";
//					var fillOpacity = 1;
					var fillOpacity = 0.2;
					var weight 		= 1;
					var rtn			= null;
					
					if (type == "floor") {
						fill = true;
						fillColor = "#F2F2F2";
					}else if (type == "company") {
						fill = true;
						fillColor = "#FFFFFF";
					}else if (type == "selectCompany") {
						stroke		= false ;
						fill = true;
						fillColor = "#6077A0";
					}else if (type == "etc") {
						fill = true;
						fillColor = "#F1F1F3";
					}else if(type == "company_theme_10") {
						fill = true;
						fillColor = "#E9E9F0";
					}else if(type == "company_theme_20") {
						fill = true;
						fillColor = "#D9E1ED";
					}else if(type == "company_theme_30") {
						fill = true;
						fillColor = "#B9D1E6";
					}else if(type == "company_theme_40") {
						fill = true;
						fillColor = "#E2E7E6";
					}else if(type == "company_theme_50") {
						fill = true;
						fillColor = "#D7E2D1";
					}else if(type == "company_theme_60") {
						fill = true;
						fillColor = "#C0D8A8";
					}else if(type == "company_theme_70") {
						fill = true;
						fillColor = "#C8CFE1";
					}else if(type == "company_theme_80") {
						fill = true;
						fillColor = "#C6C0D3";
					}else if(type == "company_theme_99") {
						fill = true;
						fillColor = "#C3B0C6";
					}
					
					rtn = {
							stroke: stroke,
							weight : weight,
							opacity : 1,
							color : color,
							dashArray: 1,
							fill: fill,
							fillOpacity : fillOpacity,
							fillColor : fillColor
						};
					return rtn;
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
								/*click : function (e) {
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}
									
									if (that.delegate && 
										that.delegate.callbackFunc && 
										that.delegate.callbackFunc.didSelectedPolygon) {
										that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
									}
									
								},*/
							});
						},
						type : type, 
						layerCode : that.curPolygonCode,
					
					});
				
					if(type == "floor") {
						this.geojson = geojson;
					}
					
					if (opt) {
						if(opt.fit == true) {
							this.gMap.fitBounds(geojson.getBounds());
						}
					}
					else {
						geojson.addTo(this.gMap);
					}
					return geojson;
				};
				
				this.updatePolygonGeoJson = function () {
					;
				};
				
				this.addControlEvent = function (type, opt) {
					// 지도이동시 발생
					if (type == "movestart") {
						this.gMap.on("movestart", function (e) {
							if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapMoveStart instanceof Function) {
								that.delegate.callbackFunc.didMapMoveStart(e, that);
							}
						});
					}
					
					else if (type == "moveend") {
						this.gMap.on("moveend", function (e) {
							if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
								that.delegate.callbackFunc.didMapMoveEnd(e, that);
							}
						});
					}
					
					// 줌 시작
					else if (type == "zoomstart") {
						this.gMap.on("zoomstart", function (e) {
							that.isZoomStart = true;
							if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapZoomStart instanceof Function) {
								that.delegate.callbackFunc.didMapZoomStart(e, that);
							}
						});
					}
					// 줌 종료
					else if (type == "zoomend") {
						this.gMap.on("zoomend", function (e) {
							if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
								that.delegate.callbackFunc.didMapZoomEnd(e, that);
							}
						});
					}
					else if (type == "zoomend zoomlevelschange") {
						this.gMap.on("zoomend", function (e) {
							if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
								that.delegate.callbackFunc.didMapZoomEnd(e, that);
							}
						});
					}
				};
				
				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
				
					if(layer.feature.properties.figure_type == "2"){
						layer.setStyle({
							weight : 3,
							color : "#A23CD7",
							dashArray : "5,5",
						});

						if (!sop.Browser.ie) {
							layer.bringToFront();
						}
					}
					
				};
				
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					
					// 2016. 03. 24 j.h.Seok modify
					layer.setStyle({
						weight : 1,
						color : "#4C4C4C",
						dashArray : 1,
					});
					
//					if(layer.feature.properties.figure_type == "2"){
//						layer.setStyle({
//							weight : 1,
//							color : "#BBBBBB",
//							dashArray : 1,
//						});
//	
//						if (!sop.Browser.ie) {
//							layer.bringToBack();
//						}
//					}
				};
				
				this.getLocation = function () {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {
							console.log(position);
						});
					}
					else {
						console.log("브라우져가 기능을 제공하지 않습니다.");
					}
				};
			},	
	};

}(window, document));
