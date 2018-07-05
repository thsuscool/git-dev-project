/**
 * 
 */
(function (W, D) {
	$thematicMap.rightMap = {
		mapId : "rightMap",
		bnd_year : '2013',
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
			this.sMap.mapInfo = new sMapInfo.mapInfo(this.sMap);
			this.sMap.mapInfo.initialize($thematicMap.rightMap);
			
			//네비게이션 init 함수
			this.mapNavi2 = new window.parent.mapNavigation.UI();
			this.mapNavi2.isThematicMap = true;
			this.mapNavi2.sggView = false;          //시군구 안보이기
			this.mapNavi2.admView = false;         //읍면동 안보이기
//			window.parent.$mapNavigation_2.ui.setMapObj(this.sMap);
//			window.parent.$mapNavigation_2.event.setUIEvent();
			
			// 가락동좌표
//			$thematicMap.ui.createMap([ 966621, 1944048 ], 1);
//			var center = window.parent.$mapNavigation.ui.getLocationCoords();
			var center = this.mapNavi2.getLocationCoords();
			this.createMap(center, 1);
			this.mapNavi2.create("mapNavi_1", 2, $thematicMap.rightMap);
			
			this.BoundaryApi = new $thematicMap.Api();
			
			$("#mapNavi2", window.parent.document).show();
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
			var maxLevel = 3, minlevel = 0;
			
			if (!this.isMapCreated) {
				// 최초 로딩시
				$thematicMap.rightMap.map = sop.map('mapRgn_1', {
					scale : false,
					panControl : false,
					measureControl : false,
					maxZoom : maxLevel,
					minZoom : minlevel,
					attributionControl : false,
					zoomControl : false
				});
				
				// 네비게이션 추가
//				window.parent.$mapNavigation_2.ui.sidoSelectSet(2);
				
				/* 범례 생성 */
				this.sMap.gMap = $thematicMap.rightMap.map;
				
				this.sMap.mapInfo.createLegend();
				this.sMap.mapInfo.createLegendColor();
				this.sMap.mapInfo.colorPickerSet();
				
				this.sMap.MainObj = $thematicMap;
				this.sMap.thisObj = $thematicMap.rightMap;
				
				this.sMap.addControlEvent("moveend");
				this.sMap.addControlEvent("zoomend");
				
				this.isMapCreated = true;
				
				this.sMap.createInfoControl("2013 년", $thematicMap.rightMap.mapId);
			}
			// $thematicMap.rightMap.map.addLayer($thematicMap.leftMap.map.ollehTileLayer);
			$thematicMap.rightMap.initializeMap();
			
			$thematicMap.rightMap.map.setView(sop.utmk(centerPos), zoomlevel);
//			$thematicMap.rightMap.map.zoomSliderControl.setPosition("topleft");
			
			$thematicMap.rightMap.sMap.createMapSizeControlButton();
			
		},
		commonMoveEvent : function () {
			
			$thematicMap.rightMap.map.on('move', function (e) {
				$thematicMap.leftMap.map.setView(e.target.getCenter(), e.target.getZoom(), {
					animate : false
				});
			});
			$thematicMap.rightMap.map.on('moveend', function (e) {
				$thematicMap.leftMap.map.setView(e.target.getCenter(), e.target.getZoom(), {
					animate : true
				});
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
				this.BoundaryApi.sidoArea($thematicMap.rightMap.bnd_year, callbackApi, $thematicMap.rightMap);
				// $thematicMap.request.sidoArea($thematicMap.rightMap.bnd_year,
				// callbackApi, $thematicMap.rightMap);
			}
			else if (zoomlevel > 3 && zoomlevel <= 5) {
				$thematicMap.rightMap.sMap.curPolygonCode = 2;
				// 시군구 hadmarea
				this.BoundaryApi.hadmArea($thematicMap.rightMap.bnd_year, adm_cd, callbackApi, $thematicMap.rightMap);
				// $thematicMap.request.hadmArea(adm_cd, callbackApi,
				// $thematicMap.rightMap);
			}
			else if (zoomlevel > 5 && zoomlevel <= 8) {
				$thematicMap.rightMap.sMap.curPolygonCode = 3;
				// 동경계 경계 hadmarea
				this.BoundaryApi.hadmArea($thematicMap.rightMap.bnd_year, adm_cd, callbackApi, $thematicMap.rightMap);
				// $thematicMap.request.hadmArea(adm_cd, callbackApi,
				// $thematicMap.rightMap);
			}
			else if (zoomlevel >8) {
				$thematicMap.rightMap.sMap.curPolygonCode = 4;
				// 동경계 경계 hadmarea
				this.BoundaryApi.hadmArea($thematicMap.rightMap.bnd_year, adm_cd, callbackApi, $thematicMap.rightMap);
				// $thematicMap.request.hadmArea(adm_cd, callbackApi,
				// $thematicMap.rightMap);
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
			// 시도 경계인 경우
			if (adm_cd == null) {
				
			}
			
			// zoomlevel별 행정경계 및 Callback API 설정..
			$thematicMap.rightMap.setMapzoomLevel(zoom, adm_cd, function () {
				$thematicMap.rightMap.BoundaryApi.getThemeKosisDataList($thematicMap.rightMap);
			});
			
		}
	};
	
	$thematicMap.rightMap.formatter = {
		setLegendForStatsData : function (arData) {
			$thematicMap.rightMap.sMap.valPerSlice = $thematicMap.rightMap.sMap.calculateLegend(arData);
			$thematicMap.rightMap.sMap.mapInfo.updateLegendRange($thematicMap.rightMap.sMap.valPerSlice);
			
		},
		
		setMaxMinForStats : function () {
			var arData = new Array();
			for ( var k = 0; k < $thematicMap.rightMap.staticJsonObj.length; k++) {
				var tmpData = new Array();
				
				for ( var i = 0; i < $thematicMap.rightMap.staticJsonObj[k].length; i++) {
					for (key in $thematicMap.rightMap.staticJsonObj[k][i]) {
						if (key == $thematicMap.rightMap.staticJsonObj[k][i].showData) {
							tmpData.push($thematicMap.rightMap.staticJsonObj[k][i][key]);
							break;
						}
					}
				}
				arData.push(tmpData);
				
			}
			$thematicMap.rightMap.formatter.setLegendForStatsData(arData);
		},
		
		combinStatsToGeoJon : function (geoJsonObj, _unit, _showData) {
			for ( var k = 0; k < $thematicMap.rightMap.staticJsonObj.length; k++) {
				for ( var i = 0; i < geoJsonObj.features.length; i++) {
					var staticObj = $thematicMap.rightMap.staticJsonObj[k];
					for ( var j = 0; j < staticObj.length; j++) {
						if (geoJsonObj.features[i].info == null) {
							geoJsonObj.features[i]["info"] = [];
						}
						if (geoJsonObj.features[i].properties.adm_cd == staticObj[j].adm_cd) {
							staticObj[j].unit = _unit;
							staticObj[j].showData = _showData;
							var staticObjInfo = staticObj[j];
							if (sop.Util.isUndefined(geoJsonObj.features[i].info)) {
								geoJsonObj.features[i].info = [];
							}
							geoJsonObj.dataIdx = i;
							geoJsonObj.features[i].info.push(staticObjInfo);
						}
					}
					
				}
			}
			
			// API 결과 범례 수치 계산
			$thematicMap.rightMap.formatter.setMaxMinForStats();
			
			// 경계+통계데이터 인지 구분
			$thematicMap.rightMap.isStatsGeoJson = true;
			
			// 최종 GeoJSon 설정하기
			$thematicMap.rightMap.setGeoJson(geoJsonObj);
			
			// return geoJsonObj;
			
		}
	};
	
}(window, document));
