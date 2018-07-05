/**
 * 
 */
(function (W, D) {
	$thematicMap.rightMap = {
		mapId : "rightMap",
		isMapCreated : false,
		geoJson : {},
		isGeoJsonCreated : false,
		isStatsGeoJson : false,
		mapNavi2 : null,
		
		// 경계데이터
		geoJsonObj : {},
		// 통계데이터
		staticJsonObj : [],
		themeList : {},
		initialize : function () {
			/* sMap.map생성 kcu 추가 */
			this.sMap = new sMap.map();
			this.sMap.bnd_year = $sgisMobileThematicFrame.mapInfo.sep_map_data_year;
			this.sMap.mapInfo = new sMapInfo.mapInfo(this.sMap);
			this.sMap.mapInfo.initialize($thematicMap.rightMap);
			
			//네비게이션 init 함수
			this.mapNavi2 = new window.parent.mapNavigation.UI();
			var center = this.mapNavi2.getLocationCoords();
			this.createMap(center, 1);
			
			this.BoundaryApi = new $thematicMap.Api();
		},
		initializeMap : function () {
			if (this.isGeoJsonCreated) {
				$thematicMap.rightMap.geoJsonObj = {};
				$thematicMap.rightMap.staticJsonObj = [];
				$thematicMap.rightMap.geoJson.onRemove($thematicMap.rightMap.map);
				$thematicMap.rightMap.clearDataOverlay();
				$thematicMap.rightMap.isGeoJsonCreated = false;
			}
		},
		createMap : function (centerPos, zoomlevel) {
			
			/* 최소 MIN 레벨 설정 */
			var maxLevel = 5, minlevel = 0;
			
			if (!this.isMapCreated) {
				// 최초 로딩시
				$thematicMap.rightMap.map = sop.map('rightMap', {
					scale : false,
					panControl : false,
					measureControl : false,
					maxZoom : maxLevel,
					minZoom : minlevel,
					attributionControl : false,
					zoomControl : false
				});
				
				/* 범례 생성 */
				this.sMap.gMap = $thematicMap.rightMap.map;
				
				this.sMap.mapInfo.createLegend();
				this.sMap.mapInfo.createLegendColor();
				this.sMap.mapInfo.colorPickerSet();
				
				this.sMap.MainObj = $thematicMap;
				this.sMap.thisObj = $thematicMap.rightMap;
				
				this.sMap.addControlEvent("rgeoevent");
				this.sMap.addControlEvent("zoomend");
				
				this.isMapCreated = true;
				
				this.sMap.createLeftDataWindow($thematicMap.rightMap.mapId);
			}
			$thematicMap.rightMap.initializeMap();
			
			$thematicMap.rightMap.map.setView(sop.utmk(centerPos), zoomlevel);
			
			$thematicMap.rightMap.sMap.createMapSizeControlButton();
		},
		commonMoveEvent : function () {
			$thematicMap.rightMap.map.on('drag', function (e) {
				var len = $thematicMap.rightMap.map.dragging._positions.length;
				var positions = $thematicMap.rightMap.map.dragging._positions;
				var pos = positions[len-1].subtract(positions[len-2]); 

				$thematicMap.leftMap.map.panBy(pos.multiplyBy(-1), {animate : false});
			});
			
			$thematicMap.rightMap.map.on('dragend', function (e) {
				$thematicMap.leftMap.map.fire("rgeoevent");
				$thematicMap.rightMap.map.fire("rgeoevent");
			});
			
			$thematicMap.rightMap.map.on('zoomend', function (e) {
				$thematicMap.leftMap.map.setView(e.target.getCenter(), e.target.getZoom(), {
					animate : false
				});
				$thematicMap.leftMap.map.fire("rgeoevent");
				$thematicMap.rightMap.map.fire("rgeoevent");
			});
		},
		clearDataOverlay : function () {
			if ($thematicMap.rightMap.sMap.dataGeojson) {
				$thematicMap.rightMap.sMap.dataGeojson.remove();
				$thematicMap.rightMap.sMap.dataGeojson.eachLayer(function (layer) {
					layer.removeCaption();
				});
			}
			$thematicMap.rightMap.sMap.data = [];
			$thematicMap.rightMap.sMap.combineData = [];
			$thematicMap.rightMap.sMap.dataGeojson = null;
			$thematicMap.rightMap.sMap.curDropPolygonCode = null;
		},
		
		setMapzoomLevel : function (zoomlevel, adm_cd, callbackApi) {
			// 초기화
			$thematicMap.rightMap.initializeMap();
			if (zoomlevel >= 0 && zoomlevel <= 3) {
				// 전국시도경계
				$thematicMap.rightMap.sMap.curPolygonCode = 1;
				this.BoundaryApi.sidoArea($thematicMap.leftMap.sMap.bnd_year, callbackApi, $thematicMap.rightMap);
			}
			else if (zoomlevel > 3 && zoomlevel <= 5) {
				$thematicMap.rightMap.sMap.curPolygonCode = 2;
				// 시군구 hadmarea
				this.BoundaryApi.hadmArea($thematicMap.leftMap.sMap.bnd_year, adm_cd, callbackApi, $thematicMap.rightMap);
			}
			else if (zoomlevel > 5 && zoomlevel <= 8) {
				$thematicMap.rightMap.sMap.curPolygonCode = 3;
				// 동경계 경계 hadmarea
				this.BoundaryApi.hadmArea($thematicMap.leftMap.sMap.bnd_year, adm_cd, callbackApi, $thematicMap.rightMap);
			}
			else if (zoomlevel > 8) {
				$thematicMap.rightMap.sMap.curPolygonCode = 4;
				// 동경계 경계 hadmarea
				this.BoundaryApi.statsArea($thematicMap.leftMap.sMap.bnd_year, adm_cd, callbackApi, $thematicMap.rightMap);
			}
		},
		
		initGeoJson : function () {
			$thematicMap.rightMap.geoJsonObj = {};
			$thematicMap.rightMap.staticJsonObj = [];
		},
		
		setGeoJson : function (geoJsonObj) {
			$thematicMap.rightMap.initializeMap();
			this.isGeoJsonCreated = true;
			var type = 'data';
			
			/* 범례 색 설정을 위한 map.dataGeoJson 설정 */
			$thematicMap.rightMap.geoJson = sop.geoJson(geoJsonObj, {
				style : this.sMap.setPolygonGeoJsonStyle(type),
				onEachFeature : function (feature, layer) {
					$thematicMap.rightMap.sMap.setLayerColor(feature, layer);
					layer.on({
						click : function (event) {
							$thematicMap.rightMap.sMap.removePreLayer(event, feature, type);
							$thematicMap.rightMap.sMap.didSelectedPolygon(event, feature, type);
							$thematicMap.leftMap.geoJson.eachLayer(function(layer) {
								if(event.target.feature.properties.adm_cd == layer.feature.properties.adm_cd) {
									layer.fire("sync", {action : "click"});
								}
							});
						},
						sync : function (event) {
							if(event.action == "click") {
								$thematicMap.rightMap.sMap.removePreLayer(event, feature, type); 
							}
						}
					});
				}
			}).addTo($thematicMap.rightMap.map);
			
			$thematicMap.Popup.close();
			
			/* 통계+경계데이터 일경우에 setCatpion */
			$thematicMap.rightMap.sMap.dataGeojson = $thematicMap.rightMap.geoJson;
			
		}
	};
	
	$thematicMap.rightMap.request = {
		// 리버스지오코드 시 호출되는 함수 (경계+ 표출데이터 호출)
		AreaAndStatsApis : function (_adm_cd, year) {
			var zoom = $thematicMap.rightMap.map.getZoom();
			var adm_cd = _adm_cd;
			// zoomlevel별 행정경계 및 Callback API 설정..
			$thematicMap.rightMap.setMapzoomLevel(zoom, adm_cd, function () {
				var sopAbsApi = new sop.portal.absAPI();
				sopAbsApi.onBlockUIPopup();
				$thematicMap.rightMap.BoundaryApi.getStats($thematicMap.rightMap, adm_cd,function(){
					sopAbsApi.onBlockUIClose();
				});
			});
		}
	};
}(window, document));
