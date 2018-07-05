/**
 * 맵에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/19 초기 작성 author : 권차욱 version : 1.0 see :
 * 
 */

(function (W, D) {
	W.$map = W.$map || {};
	
	sMap = {
		
		map : function () {
			var that = this;
			this.id = null;
			this.mapInfo = null;
			this.delegate = null;
			this.gMap = null;
			this.target = null; // target element
			this.isScale = true; // map scale 유무
			this.isPanControl = false; // map panControl 유무
			this.isMouseOver = false;
			this.isMeasureControl = true;
			this.isDrop = false;
			this.isFirstDraw = true;
			this.isZoomStart = false;
			this.isInnerMapShow = false;
			this.center = null; // center 좌표(utmk)
			this.zoom = 4; // zoom level
			this.geojson = null;
			this.dataGeojson = null;
			this.geojsonData = null;
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
			this.bnd_year = "2012";
			this.dropInfo = null;
			this.lastGeojsonInfo = null;
			this.infoControl = null;
			this.drawControl = null;
			this.legendType = "auto";
			// Mainobj 추가
			this.MainObj = null;
			this.preLayer = null;
			this.curruntLocationControl = null;
			this.curruntLocationControlDiv = null;
			this.mapSizeControl = null;
			this.mapSizeControlDiv = null;

			// 맵을 생성한다.
			this.createMap = function (delegate, target, opt) {
				if (!opt.center) {
					this.center = [ 953922, 1952036 ];
				}
				else {
					this.center = opt.center;
				}
				
				if (delegate) {
					this.delegate = delegate;
				}
				if (target) {
					this.target = target;
				}
				if (opt.scale !== undefined) {
					this.isScale = opt.isScale;
				}
				if (opt.panControl !== undefined) {
					this.isPanControl = opt.isPanControl;
				}
				if (opt.zoom !== undefined) {
					this.zoom = opt.zoom;
				}
				if (opt.measureControl !== undefined) {
					this.isMeasureControl = opt.measureControl;
				}
				
				this.gMap = sop.map(this.target, {
					scale : this.isScale,
					panControl : this.isPanControl,
					measureControl : this.isMeasureControl
				});
				this.gMap.setView(sop.utmk(this.center[0], this.center[1]), this.zoom);
				this.bounds = this.gMap.getBounds();
				
			};
			
			this.createInfoControl = function () {
				var infoControl = sop.control({
					position : 'topleft'
				});
				infoControl.onAdd = function (map) {
					this._div = sop.DomUtil.create('div', 'info_control');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					return this._div;
				};
				
				infoControl.update = function (props) {
					var adm_nm;
					if (props) {
						if (props.adm_nm == "null" || props.adm_nm == undefined) {
							adm_nm = "집계구";
						}
						else {
							adm_nm = props.adm_nm;
						}
					}
					
					this._div.innerHTML = '<h4></h4>' + (props ? '<b>' + props.adm_cd + '</b><br />' + adm_nm : '행정동');
					
				};
				this.infoControl = infoControl;
				infoControl.addTo(this.gMap);
				
				$(".info_control").css("padding", "6px 8px").css("font", "12px/14px Arial, Helvetica, sans-serif").css("background", "white").css("background", "rgba(255,255,255,1)").css("box-shadow", "0 0 15px rgba(0,0,0,0.2)").css("border-radius", "5px");
			},

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
			
			this.addMarker = function (x, y, options) {
				
				var marker = null;
				if (this.gMap) {
					marker = sop.marker([ x, y ]);
					
					if (options.tooltipMsg != null) {
						if (options.visible != null) {
							if (options.visible) {
								marker.bindInfoWindow(options.tooltipMsg).openInfoWindow();
							}
							else {
								marker.bindInfoWindow(options.tooltipMsg);
							}
						}
						else {
							marker.bindInfoWindow(options.tooltipMsg);
						}
					}
					marker.addTo(this.gMap);
				}
				return marker;
			};
			
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
				this.data = [];
				this.combineData = [];
				this.dataGeojson = null;
				this.curDropPolygonCode = null;
				this.openApiReverseGeoCode(that.center);
				this.valPerSlice = [];
				this.legendValue = [];
			};
			
			this.clearData = function () {
				this.data = [];
				this.combineData = [];
			};
			
			this.setInnerMap = function (isShow) {
				this.isInnerMapShow = isShow;
				if (isShow) {
					if (this.geojson) {
						this.geojson.remove();
						this.geojson = null;
					}
					this.setZoom(12);
				}
				else {
					this.openApiReverseGeoCode(that.center);
				}
			};
			
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
				var fillColor = "#dddddd";
				var weight = 3;
				var fillOpacity = 0.1;
				if (type == "data") {
					color = "white", fillColor = "#F0FFF0";
					weight = 3;
					fillOpacity = 0.7;
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
			
			this.didMouseOverPolygon = function(event, data, type) {
				if (!sop.Util.isUndefined(data.info) && data.info.length > 0) {
					var html = '<table style="text-align:left;width:auto;min-width:200px;white-space: nowrap;word-break:break-all;" >';
					html += '<tr>';
					html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;font-size:12px;"><strong>'+data.properties.adm_nm+'</strong></th>';
					html += '<td style="text-align:center;">';					
					html += '</td>';
					html += '</tr>';
					html += '<tr>';
					html += '<th style="text-align: left; word-break:break-all;width:30%;font-size:11px;">&nbsp;&nbsp;연평균성장률</th>';
					html += '<td style="text-align:center; padding-left:15px;">';
					html += appendCommaToNumber(data.info[0].rate_value) + '&nbsp;'+data.info[0].unit;
					html += '</td>';
					html += '</tr>';
					html += '</table>';
					event.target.bindToolTip(html, {
						direction : event.layerPoint.x>180?"left":"right",
						noHide : true,
						opacity : 0.8,
						pane: 'infowindowPane'
					
					}).addTo($thematicMap.ui.map)._showToolTip(event);
					event.target.tooltip.updateZIndex(900000);
					
					$thematicMap.ui.sMap.mapInfo.selectChartData(data.properties, data.dataIdx);
					$thematicMap.ui.sMap.mapInfo.selectLegendRangeData(event.target.options.fillColor);
				}
				else{
					var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;" >';
					html += '<tr>';
					html += '<th style="word-break:break-all;width:30%;padding:5px;font-size:12px;"><strong>'+data.properties.adm_nm+'</strong></th>';
					html += '<td style="text-align:center;">&nbsp;';					
					html += '</td>';
					html += '</tr>';
					html += '<tr>';
					html += '<th style="word-break:break-all;width:30%;padding-bottom:5px;font-size:11px;">&nbsp;데이터가 없습니다.</th>';
					html += '<td style="text-align:center;">';					
					html += '</td>';
					html += '</tr>';
					html += '</table>';
					event.target.bindToolTip(html, {
						direction : event.layerPoint.x>180?"left":"right",
						noHide : true,
						opacity : 0.8
					
					}).addTo($thematicMap.ui.map)._showToolTip(event);
				}
			};
			
			this.didSelectedPolygon = function (event, data, type) {
				// 차트 하이라이트 효과
				$thematicMap.ui.sMap.mapInfo.selectChartData(data.properties);
				// 범례 하이라이트 효과
				$thematicMap.ui.sMap.mapInfo.selectLegendRangeData(event.target.options.fillColor);
			};
			this.removePreLayer = function(event, data, type){
				if(that.preLayer){
					that.preLayer.setStyle({
						weight : 2,
						color : "white",
						dashArray : that.preLayer.options.dashArray,
						fillOpacity : that.preLayer.options.fillOpacity,
						fillColor : that.preLayer.options.fillColor
					});
					that.preLayer.unbindToolTip();
				}
				that.setPolyLayerMouseover(event);
				that.didMouseOverPolygon(event, data, type);
			};
			this.setPolyLayerMouseover = function (e) {
				var layer = e.target;
				if (layer == that.curSelectedLayer) {
					layer.setStyle({
						weight : 4,
						color : "#ff0000",
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
				}
				else {
					layer.setStyle({
						weight : 4,
						color : "#0086c6",
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
					
				}
				
				if (!sop.Browser.ie) {
					layer.bringToFront();
				}
				that.preLayer = layer;
			};
			
			this.setPolyLayerMouseout = function (e) {
				var layer = e.target;
				
				if (that.curSelectedLayer) {
					layer.setStyle({
						weight : 4,
						color : "#ff0000",
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
				}
				
				if (layer != that.curSelectedLayer) {
					
					var color = "#666666";
					var weight = 3;
					if (layer.options.type == "polygon") {
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
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapMoveStart instanceof Function) {
							that.delegate.callbackFunc.didMapMoveStart(e, that);
						}
					});
				}
				
				else if (type == "moveend") {
					this.gMap.on("moveend", function (e) {
						var center = e.target.getCenter();
						that.center = [ center.x, center.y ];
						that.bounds = e.target.getBounds();
						
						if (!that.isDrop /* && !that.isZoomStart */) {
							that.openApiReverseGeoCode(that.center);
						}
						that.isDrop = false;
						that.isZoomStart = false;
						
						// 맵 이동완료 시, 센터좌표가 기준바운더리에 속하면,
						// 경계를 호출하지 않고, 넘어서면 경계를 호출하여 다시 그린다.
						// if (that.curPolygonCode != 1 && that.curPolygonCode
						// != 2) {
						// var isInnerForDataBounds = false;
						// var tmpUtmkPoint =
						// that.gMap.utmkToLayerPoint(that.center);
						// if (that.geojson != null && tmpUtmkPoint != null
						// && tmpUtmkPoint != undefined) {
						// that.geojson.eachLayer(function (layer) {
						// if (layer._containsPoint) {
						// if (layer._containsPoint(tmpUtmkPoint)) {
						// isInnerForDataBounds = true;
						// }
						// }
						// });
						// }
						//
						// if (!isInnerForDataBounds){
						// that.openApiReverseGeoCode(that.center);
						// }
						// }
						//							
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
						that.isZoomStart = true;
						that.zoom = e.target._zoom;
						that.bounds = e.target.getBounds();
						var mapPolygonCode = 0;
						
						if (that.zoom >= 0 && that.zoom <= 3) {
							mapPolygonCode = 1;
							if (that.curPolygonCode != mapPolygonCode) {
								that.curPolygonCode = mapPolygonCode;
								if (!that.isInnerMapShow) {
									// that.openApiBoundarySido("2012");
								}
							}
							that.curPolygonCode = mapPolygonCode;
						}
						
						// 시구군단위 경계표출
						else if (that.zoom > 3 && that.zoom <= 5) {
							mapPolygonCode = 2;
							// 이전의 경계레벨이 시군구단위가 아닐경우
							if (that.curPolygonCode != mapPolygonCode) {
								that.curPolygonCode = mapPolygonCode;
								if (!that.isInnerMapShow) {
									if (that.isDrop) {
										// that.openApiBoundaryHadmarea(that.curDropCd,
										// "2012", "1");
									}
								}
							}
							that.curPolygonCode = mapPolygonCode;
						}
						
						// 동단위 경계표출
						else if (that.zoom > 5 && that.zoom<= 8) {
							mapPolygonCode = 3;
							// 이전의 경계레벨이 동단위가 아닐 경우
							if (that.curPolygonCode != mapPolygonCode) {
								that.curPolygonCode = mapPolygonCode;
								if (!that.isInnerMapShow) {
									if (that.isDrop) {
										that.openApiBoundaryHadmarea(that.curDropCd, "2012", "1");
									}
								}
							}
							that.curPolygonCode = mapPolygonCode;
						}					
						// 동 경계표출
						else if (that.zoom > 8) {
							mapPolygonCode = 4;
							// 이전의 경계레벨이 동단위가 아닐 경우
							if (that.curPolygonCode != mapPolygonCode) {
								that.curPolygonCode = mapPolygonCode;
								if (!that.isInnerMapShow) {
									if (that.isDrop) {
										that.openApiBoundaryHadmarea(that.curDropCd, "2012", "1");
									}
								}
							}
							that.curPolygonCode = mapPolygonCode;
						}	
					});
				}
				
				// 사용자지정 이벤트
				else if (type == "draw") {
					that.gMap.on("draw:created", function (e) {
						var layer = e.layer;
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didDrawCreate instanceof Function) {
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
					this.setZoom(6);
					break;
				
				case 3:
					this.setZoom(8);
					break;
				
				case 4:
					this.setZoom(10);
					break;
				
				case 5:
					// this.setZoom(10);
					this.openApiReverseGeoCode(this.center);
					break;
				
				default:
					break;
				
				}
				
			};
			
			this.autoUpBoundary = function () {
				switch (this.curPolygonCode) {
				
				case 1:
					this.setZoom(3);
					break;
				
				case 2:
					this.setZoom(5);
					break;
				
				case 3:
					this.setZoom(7);
					break;
				
				case 4:
					this.setZoom(9);
					break;
				
				case 5:
					this.setZoom(10);
					break;
				
				default:
					break;
				
				}
				
			};
			
			this.setDroppedInfo = function () {
				this.dropInfo = {
					center : this.center,
					zoom : this.zoom
				};
			};
			
			this.undoDropLayerBounds = function () {
				if (this.dropInfo != null) {
					this.mapMove(this.dropInfo.center, this.dropInfo.zoom);
				}
			};
			
			this.isContainBound = function () {
				if (that.curPolygonCode != 1 && that.curPolygonCode != 2) {
					var isInnerForDataBounds = false;
					var tmpUtmkPoint = this.gMap.utmkToLayerPoint(this.center);
					if (that.geojson != null && tmpUtmkPoint != null && tmpUtmkPoint != undefined) {
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
				if (type == "normal") {
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
				
			};
			
			this.setCaption = function () {
				if (this.dataGeojson != null) {
					this.dataGeojson.eachLayer(function (layer) {
						if (!sop.Util.isUndefined(layer.feature.info) && layer.feature.info.length > 0) {
							for (param in layer.feature.info[0]) {
								if (layer.feature.info[0].showData == param) {
									layer.setCaption({
										title : appendCommaToNumber(layer.feature.info[0][param]) + " (" + layer.feature.info[0].unit + ")",
										color : "red",
										showAllZoomLevel : false
									});
									break;
								}
							}
						}
						else {
							layer.setCaption({
								title : "N/A",
								color : "#989898"
							});
						}
						
					});
				}
			};
			
			this.combineStatsData = function (boundData) {
				
				for ( var k = 0; k < that.data.length; k++) {
					if (that.data[k] != null) {
						boundData["combine"] = true;
					}
					else {
						boundData["combine"] = false;
					}
					
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (that.data[k] != null) {
							if (that.data[k].result != null) {
								for ( var x = 0; x < that.data[k].result.length; x++) {
									for (key in that.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == that.data[k].result[x].adm_cd) {
												that.data[k].result[x]["showData"] = that.data[k].showData;
												that.data[k].result[x]["api_id"] = that.data[k].id;
												that.data[k].result[x]["unit"] = that.data[k].unit;
												boundData.features[i].info.push(that.data[k].result[x]);
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
							if (that.data[k].result != null) {
								for ( var i = 0; i < that.data[k].result.length; i++) {
									for (key in that.data[k].result[i]) {
										if (key == that.data[k].showData) {
											tmpData.push(parseInt(that.data[k].result[i][key]));
											break;
										}
									}
								}
								arData.push(tmpData);
							}
						}
					}
				}
				
				that.valPerSlice = this.calculateLegend(arData);
				/*
				 * //균등분할방식 if (this.legendType == "equal") { for ( var k = 0; k <
				 * arData.length; k++) { var min = Math.min.apply(null,
				 * arData[k]); var max = Math.max.apply(null, arData[k]); var
				 * result = Math.round((min + max) / 5);
				 * 
				 * if (result == 0) { result = 1; }
				 * 
				 * var tmpResultArray = []; for (var x=0; x<5; x++) {
				 * tmpResultArray[x] = result; }
				 * 
				 * var tmpResult = new Array(); for (var y=1; y<=5; y++) {
				 * tmpResult.push(result*y); } that.valPerSlice[k] = tmpResult; } }
				 * //자동분할(분포분할) else if (this.legendType == "auto") { for ( var
				 * i = 0; i < arData.length; i++) { var tmpSortArray =
				 * arData[i].sort(function(a, b) { return a-b; });
				 * 
				 * //중복숫자제거 var tmpGroupArray = []; $.each(tmpSortArray,
				 * function(i, el){ if ($.inArray(el, tmpGroupArray) === -1) {
				 * tmpGroupArray.push(el); } });
				 * 
				 * var result = Math.round((tmpGroupArray.length / 5)); if
				 * (result == 0) { result = 1; }
				 * 
				 * var tmpResult = new Array(); for (var y=0; y<tmpGroupArray.length;
				 * y++) { if(y % result == 0) {
				 * tmpResult.push(tmpGroupArray[y]); } } that.valPerSlice[i] =
				 * tmpResult; } }else { }
				 */
			},

			this.calculateLegend = function(arData) {			
				var tmpValPerSlice = new Array();
				
				//균등분할방식				
				this.legendValue = {};
				for ( var k = 0; k < arData.length; k++) {
					var min = Math.min.apply(null, arData[k]);
					var max = Math.max.apply(null, arData[k]);
					var result = Math.round((min + max) / 5);
					
					if (result == 0) {
						result = 1;
					}
					
					var tmpResultArray = [];
					for ( var x = 0; x < 5; x++) {
						tmpResultArray[x] = result;
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
							var cnt = 5 - tmpResult.length;
							for ( var x = 0; x < cnt; x++) {
								tmpResult.push("");
							}
						}
						tmpValPerSlice2[i] = tmpResult;
					}
					
				}
				this.legendValue.auto = tmpValPerSlice2;
				
				if(that.legendType == "auto") {
					return this.legendValue.auto;
				} else {
					return this.legendValue.equal;
				}
			},

			this.getColor = function (d, valPerSlice) {
//				var value =d;// parseInt(d);
				var value = parseFloat(d);
				if (valPerSlice.length < 5 && that.legendType == "auto") {
					for ( var i = 0; i < valPerSlice.length; i++) {
						if (value == valPerSlice[i]) {
							return [ that.legendColor[i], i + 1 ];
						}
					}
					
				}
				else {
					return value < valPerSlice[0] ? [ that.legendColor[0], 1 ] : value < valPerSlice[1] ? [ that.legendColor[1], 2 ] : value < valPerSlice[2] ? [ that.legendColor[2], 3 ] : value < valPerSlice[3] ? [ that.legendColor[3], 4 ] : [ that.legendColor[4], 5 ];
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
			
			this.createCurrentLocationButton = function(){
				var curruntLocationControl = sop.control({
					position: 'topleft'
				});
				var that = this;
				curruntLocationControl.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'control_item current_location_control');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'curruntLocationControl_' + that.id).attr("title","현재위치");
					that.curruntLocationControlDiv = this._div;
					return this._div;
				};

				curruntLocationControl.update = function(props) {
					sop.DomEvent.on(this._div, 'click', function(){
						var division = $(this._div);
						if (!division.hasClass("disabled")){
							if(navigator.geolocation) {
								division.addClass("disabled");
								var center = [989674, 1818313];
								navigator.geolocation.getCurrentPosition(function(position) {
									var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
									center = [utmkXY.x, utmkXY.y];
									that.mapMove(center, that.zoom);
									division.removeClass("disabled");
								}, function(error) {
									if (error.code === 1) {
										console.warn("현재위치를 동의하지 않아 기본 설정값인 대전 정부청사로 이동");
									} else if (error.code === 2) {
										console.warn("GPS를 확인할 수 없습니다");
									} else if (error.code === 3) {
										console.warn("시간이 초과되었습니다");
									} else {
										console.error("알수 없는 에러");
									}
									that.mapMove(center, that.zoom);
									division.removeClass("disabled");
								}, {
									timeout: 5000
								});
							}else{
								division.removeClass("disabled");
							}
						}
					}, this);
				};
				this.curruntLocationControl = curruntLocationControl;
				curruntLocationControl.addTo(this.gMap);
			}

            this.createMapSizeControlButton = function() {
				var mapSizeControl = sop.control({
					position: 'topright'
				});
				var that = this;
				mapSizeControl.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'control_item map_size_control upscale');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'mapSizeControl_' + that.id).attr("title", "지도 크기 조절");
					that.mapSizeControlDiv = this._div;
					return this._div;
				};

				mapSizeControl.update = function(props) {
					sop.DomEvent.on(this._div, 'click', function() {
							var division = $(this._div);
							var commonElement = ".Header,.Content>.SelectArea";
							if (division.hasClass("upscale")) {
								division.removeClass("upscale").addClass("downscale");
									$(top.document).find(commonElement+",.Btn_Top").hide();
									$(top.document).find("#themeticFrame").height($(top.document).height());
									$(top.document).find(".MapArea, .Map").height($(top.document).height());
									$(top.document).find(".Wrap>.Content").attr("style","padding-top: 0px;");
							} else {
								division.removeClass("downscale").addClass("upscale");
									$(top.document).find(commonElement+",.Btn_Top").show();
                                    $(top.document).find(".MapArea, .Map").height($(window).outerHeight(true)-111);
		                            $(top.document).find("#themeticFrame").height($(window).outerHeight(true)-111);
									$(top.document).find(".Wrap>.Content").removeAttr("style");
							}
							that.gMap.invalidateSize();
							$(document).scrollTop(0);
						}, this);
					};
					this.mapSizeControl = mapSizeControl;
					mapSizeControl.addTo(this.gMap);
				};
			
		}
	
	};
	
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
					
					if (!that.isInnerMapShow) {
						switch (that.curPolygonCode) {
						
						// 전국시도
						case 1:
							// 최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == null && that.lastGeojsonInfo.info == "sidoArea") {
								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									
									// that.clearData();
								}
							}
							else {
								that.MainObj.request.AreaAndStatsApis(null, "2012");
								
								// that.openApiBoundaryContry();
							}
							break;
						
						// 시군구
						case 2:
							// 최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd && that.lastGeojsonInfo.year == "2012") {
								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									// that.clearData();
								}
							}
							else {
								that.MainObj.request.AreaAndStatsApis(curSidoCd, "2012");
								
								// that.openApiBoundaryHadmarea(curSidoCd,
								// "2012", "1");
								
							}
							break;
						
						// 동면읍
						case 3:
							if (that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd && that.lastGeojsonInfo.year == "2012") {
								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									
								}
								else {
									// that.clearData();
									
								}
							}
							else {
								// Api 요청
								
								that.MainObj.request.AreaAndStatsApis(curSidoCd + curSiggCd, '2012');
								// that.openApiBoundaryHadmarea(curSidoCd +
								// curSiggCd, "2012", "1");
							}
							break;											
						
							// 동면읍
						case 3:
							if (that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd && that.lastGeojsonInfo.year == "2012") {
								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									
								}
								else {
									// that.clearData();
									
								}
							}
							else {
								// Api 요청
								
								that.MainObj.request.AreaAndStatsApis(curSidoCd + curSiggCd, '2012');
								// that.openApiBoundaryHadmarea(curSidoCd +
								// curSiggCd, "2012", "1");
							}
							break;				
						// 단일동	
						case 4:
							if (that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd + curDongCd && that.lastGeojsonInfo.year == "2012") {
								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									
								}
								else {
									// that.clearData();
									
								}
							}
							else {
								
								that.MainObj.request.AreaAndStatsApis(curSidoCd + curSiggCd+curDongCd);
								// that.openApiBoundaryStatsarea(curSidoCd +
								// curSiggCd + curDongCd);
							}
							break;						
						default:
							break;
						
						}
					}
					
					that.curSidoCd = result.sido_cd;
					that.curSiggCd = result.sgg_cd;
					that.curDongCd = result.emdong_cd;
					that.MainObj.ui.mapNavi1.reverseOnSelectChange(that);
//					window.parent.$mapNavigation.ui.reverseOnSelectChange(that);
					
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(that.openApiReverseGeoCode(options.center), 500);
				}
				else { 
					// //messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩. End ********* */
	
}(window, document));
