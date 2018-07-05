/**
 * 
 */
(function (W, D) {
	$thematicMap.leftMap = {
		mapId : "leftMap",
		bnd_year : '2000',
		isMapCreated : false,
		geoJson : {},
		isGeoJsonCreated : false,
		isStatsGeoJson : false,
		mapNavi1 : null,
		
		// 경계데이터
		geoJsonObj : {},
		// 통계데이터
		staticJsonObj : [],
		themeList : {},
		initialize : function () {
			/* sMap.map생성 kcu 추가 */
			this.sMap = new sMap.map();
			this.sMap.mapInfo = new sMapInfo.mapInfo(this.sMap);
			this.sMap.mapInfo.initialize($thematicMap.leftMap);
			
			//네비게이션 init 함수
			this.mapNavi1 = new window.parent.mapNavigation.UI();
			this.mapNavi1.isThematicMap = true;
			this.mapNavi1.sggView = false;          //시군구 안보이기
			this.mapNavi1.admView = false;         //읍면동 안보이기
//			window.parent.$mapNavigation.ui.setMapObj(this.sMap);
//			window.parent.$mapNavigation.event.setUIEvent();
			
			// 가락동좌표
//			$thematicMap.ui.createMap([ 966621, 1944048 ], 1);
//			var center = window.parent.$mapNavigation.ui.getLocationCoords();
			var center = this.mapNavi1.getLocationCoords();
			this.createMap(center, 1);
			this.mapNavi1.create("mapNavi_2", 1, $thematicMap.leftMap);
			
			// 생성자
			
			this.BoundaryApi = new $thematicMap.Api();
		},
		initializeMap : function () {
			if (this.isGeoJsonCreated) {
				$thematicMap.leftMap.geoJsonObj = {};
				$thematicMap.leftMap.staticJsonObj = [];
				$thematicMap.leftMap.geoJson.onRemove($thematicMap.leftMap.map);
				$thematicMap.leftMap.clearDataOverlay();
				$thematicMap.leftMap.isGeoJsonCreated = false;
			}
		},
		createMap : function (centerPos, zoomlevel) {
			
			/* 최소 MIN 레벨 설정 */
			var maxLevel = 3, minlevel = 0;
			
			if (!this.isMapCreated) {
				// 최초 로딩시
				$thematicMap.leftMap.map = sop.map('mapRgn_2', {
					scale : false,
					panControl : false,
					measureControl : false,
					maxZoom : maxLevel,
					minZoom : minlevel,
					attributionControl : false,
					zoomSliderControl : false
				});
				
				/* 범례 생성 */
				this.sMap.gMap = $thematicMap.leftMap.map;
				
				// 네비게이션 추가
//				window.parent.$mapNavigation.ui.sidoSelectSet(1);
				
				/*신규범례추가*/ 
				var legend = new sLegendInfo.legendInfo($thematicMap.leftMap.sMap);			
				legend.initialize($thematicMap.leftMap);
				$thematicMap.leftMap.sMap.legend = legend;
				legend.createLegend();
				$(".lgListBox li:eq(0)").hide();
				/*신규범례끝 */
				
				this.sMap.MainObj = $thematicMap;
				this.sMap.thisObj = $thematicMap.leftMap;
				
				this.sMap.addControlEvent("moveend");
				this.sMap.addControlEvent("zoomend");
				
				this.isMapCreated = true;
				
				this.sMap.createInfoControl("1999 년", $thematicMap.leftMap.mapId);
			}
			
			$thematicMap.leftMap.initializeMap();
			
			$thematicMap.leftMap.map.setView(sop.utmk(centerPos), zoomlevel);
//			$thematicMap.leftMap.map.zoomSliderControl.setPosition("topleft");
		},
		commonMoveEvent : function () {
			
			$thematicMap.leftMap.map.on('move', function (e) {
				$thematicMap.rightMap.map.setView(e.target.getCenter(), $thematicMap.leftMap.map.getZoom(), {
					animate : false
				});
			});
			$thematicMap.leftMap.map.on('moveend', function (e) {
				$thematicMap.rightMap.map.setView(e.target.getCenter(), $thematicMap.leftMap.map.getZoom());
			});
			
		},
		clearDataOverlay : function () {
			if ($thematicMap.leftMap.sMap.dataGeojson) {
				$thematicMap.leftMap.sMap.dataGeojson.remove();
				$thematicMap.leftMap.sMap.dataGeojson.eachLayer(function (layer) {
					layer.removeCaption();
				});
			}
			$thematicMap.leftMap.sMap.data = [];
			$thematicMap.leftMap.sMap.combineData = [];
			$thematicMap.leftMap.sMap.dataGeojson = null;
			$thematicMap.leftMap.sMap.curDropPolygonCode = null;
		},
		
		setMapzoomLevel : function (zoomlevel, adm_cd, callbackApi) {
			// 초기화
			$thematicMap.leftMap.initializeMap();
			if (zoomlevel >= 0 && zoomlevel <= 3) {
				// 전국시도경계
				$thematicMap.leftMap.sMap.curPolygonCode = 1;
				this.BoundaryApi.sidoArea($thematicMap.leftMap.bnd_year, callbackApi, $thematicMap.leftMap);
				// $thematicMap.request.sidoArea
			}
			else if (zoomlevel > 3 && zoomlevel <= 5) {
				$thematicMap.leftMap.sMap.curPolygonCode = 2;
				this.BoundaryApi.hadmArea($thematicMap.leftMap.bnd_year, adm_cd, callbackApi, $thematicMap.leftMap);
				// 시군구 hadmarea
				// $thematicMap.request.hadmArea(adm_cd, callbackApi,
				// $thematicMap.leftMap);
			}
			else if (zoomlevel > 5 && zoomlevel <= 8) {
				$thematicMap.leftMap.sMap.curPolygonCode = 3;
				this.BoundaryApi.hadmArea($thematicMap.leftMap.bnd_year, adm_cd, callbackApi, $thematicMap.leftMap);
				// 동경계 경계 hadmarea
				// $thematicMap.request.hadmArea(adm_cd, callbackApi,
				// $thematicMap.leftMap);
			}
			else if (zoomlevel >8) {
				$thematicMap.leftMap.sMap.curPolygonCode = 4;
				this.BoundaryApi.hadmArea($thematicMap.leftMap.bnd_year,adm_cd, callbackApi, $thematicMap.leftMap);
				// 동경계 경계 hadmarea
				// $thematicMap.request.hadmArea(adm_cd, callbackApi,
				// $thematicMap.leftMap);
			}
		},
		
		initGeoJson : function () {
			$thematicMap.leftMap.geoJsonObj = {};
			$thematicMap.leftMap.staticJsonObj = [];
		},
		
		setGeoJson : function (geoJsonObj) {
			$thematicMap.leftMap.initializeMap();
			this.isGeoJsonCreated = true;
			var type = 'data';
			
			/* 범례 색 설정을 위한 map.dataGeoJson 설정 */
			$thematicMap.leftMap.geoJson = sop.geoJson(geoJsonObj, {
				style : this.sMap.setPolygonGeoJsonStyle(type),
				onEachFeature : function (feature, layer) {
					$thematicMap.leftMap.sMap.setLayerColor(feature, layer);
					layer.on({
						mouseover : function (event) {
							$thematicMap.leftMap.sMap.setPolyLayerMouseover(event);
							$thematicMap.leftMap.sMap.didMouseOverPolygon(event, feature, type);
						},
						mouseout : $thematicMap.leftMap.sMap.setPolyLayerMouseout,
						click : function (event) {
							$thematicMap.leftMap.sMap.didSelectedPolygon(event, feature, type);
						}
					});
				}
			}).addTo($thematicMap.leftMap.map);
			
			$thematicMap.Popup.close();
			
			/* 통계+경계데이터 일경우에 setCatpion */
			$thematicMap.leftMap.sMap.dataGeojson = $thematicMap.leftMap.geoJson;
			
		}
	};
	$thematicMap.leftMap.request = {
		// 리버스지오코드 시 호출되는 함수 (경계+ 표출데이터 호출)
		AreaAndStatsApis : function (_adm_cd, year) {
			console.log('left..AreaAndStatsApis.Start');
			var zoom = $thematicMap.leftMap.map.getZoom();
			var adm_cd = _adm_cd;
			// 시도 경계인 경우
			if (adm_cd == null) {
				
			}
			// zoomlevel별 행정경계 및 Callback API 설정..
			$thematicMap.leftMap.setMapzoomLevel(zoom, adm_cd, function () {
				console.log('left..CALLBACK.Start');
				$thematicMap.leftMap.BoundaryApi.getThemeKosisDataList($thematicMap.leftMap);
			});
			
		}
	};
	
	$thematicMap.leftMap.formatter = {
		setLegendForStatsData : function (arData) {
			$thematicMap.leftMap.sMap.valPerSlice = $thematicMap.leftMap.sMap.calculateLegend(arData);
			$thematicMap.leftMap.sMap.mapInfo.updateLegendRange($thematicMap.leftMap.sMap.valPerSlice);
			//신규범례추가
			$thematicMap.leftMap.sMap.legend.valPerSlice = $thematicMap.leftMap.sMap.legend.calculateLegend(arData);
			
		},
		
		setMaxMinForStats : function () {
			var arData = new Array();
			for ( var k = 0; k < $thematicMap.leftMap.staticJsonObj.length; k++) {
				var tmpData = new Array();
				
				for ( var i = 0; i < $thematicMap.leftMap.staticJsonObj[k].length; i++) {
					for (key in $thematicMap.leftMap.staticJsonObj[k][i]) {
						if (key == $thematicMap.leftMap.staticJsonObj[k][i].showData) {
							tmpData.push($thematicMap.leftMap.staticJsonObj[k][i][key]);
							break;
						}
					}
				}
				arData.push(tmpData);
				
			}
			$thematicMap.leftMap.formatter.setLegendForStatsData(arData);
		},
		
		combinStatsToGeoJon : function (geoJsonObj, _unit, _showData) {
			for ( var k = 0; k < $thematicMap.leftMap.staticJsonObj.length; k++) {
				console.log('$thematicMap.leftMap.geoJsonObj', $thematicMap.leftMap.geoJsonObj);
				console.log('$thematicMap.leftMap.staticJsonObj[k]', $thematicMap.leftMap.staticJsonObj[k]);
				
				for ( var i = 0; i < geoJsonObj.features.length; i++) {
					var staticObj = $thematicMap.leftMap.staticJsonObj[k];
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
			$thematicMap.leftMap.formatter.setMaxMinForStats();
			
			// 경계+통계데이터 인지 구분
			$thematicMap.leftMap.isStatsGeoJson = true;
			
			// 최종 GeoJSon 설정하기
			$thematicMap.leftMap.setGeoJson(geoJsonObj);
			
			// return geoJsonObj;
			
		}
	};
	
}(window, document));
