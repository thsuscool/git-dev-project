/**
 * 
 */
(function (W, D) {
	W.$thematicMap = W.$thematicMap || {};
	
	$(document).ready(function () {
		// map.js 및 mapInfo.js를 사용하기위한 초기설정
		$thematicMap.ui.initialize();
	});
	
	$thematicMap.ui = {
		sMap : null, // map.js의 map객체
		map : {},
		bnd_year : '2012',
		comboControl : {},
		isMapCreated : false,
		mapNavi1 : null,
		
		initialize : function () {
			/* sMap.map생성 kcu 추가 */
			this.sMap = new sMap.map();
			this.sMap.mapInfo = new sMapInfo.mapInfo(this.sMap);
			this.sMap.mapInfo.initialize($thematicMap.ui);
			
			//네비게이션 init 함수
			this.mapNavi1 = new window.parent.mapNavigation.UI();
			this.mapNavi1.isThematicMap = true;
			this.mapNavi1.admView = false;         //읍면동 안보이기
//			window.parent.$mapNavigation.ui.setMapObj(this.sMap);
//			window.parent.$mapNavigation.event.setUIEvent();
			
			// 가락동좌표
//			$thematicMap.ui.createMap([ 966621, 1944048 ], 2);
//			var center = window.parent.$mapNavigation.ui.getLocationCoords();
			var center = this.mapNavi1.getLocationCoords();
			$thematicMap.ui.createMap(center, 2);
			this.mapNavi1.create("mapNavi_1", 1, $thematicMap.ui);
		},
		createMap : function (centerPos, zoomlevel) {
			
			/* 최소 MIN 레벨 설정 */
			var maxLevel = 3, minlevel = 0;
			
			if (!this.isMapCreated) {
				// 최초 로딩시
				$thematicMap.ui.map = sop.map('map', {
					scale : false,
					panControl : false,
					measureControl : false,
					maxZoom : maxLevel,
					minZoom : minlevel,
					attributionControl : false
				});
				
				/* 범례 생성 */
				this.sMap.gMap = $thematicMap.ui.map;
				
				//네비게이션 추가
//				window.parent.$mapNavigation.ui.sidoSelectSet(1); 
				
				this.sMap.mapInfo.createLegend();
				this.sMap.mapInfo.createLegendColor();
				this.sMap.mapInfo.colorPickerSet();
				
				
				this.sMap.MainObj = $thematicMap;
							
				this.sMap.addControlEvent("moveend");
				this.sMap.addControlEvent("zoomend");
				
				this.isMapCreated = true;
				
				// 마커들 그룹
				$thematicMap.ui.markerGroup = new sop.LayerGroup();
				// 지도레이어에 POI Marker 그룹 레이어 추가
				$thematicMap.ui.map.addLayer($thematicMap.ui.markerGroup);
				
				// 마커클러스터
				/*
				 * $thematicMap.ui.markers=sop.markerClusterGroup({
				 * animateAddingMarkers : true });
				 * $thematicMap.ui.map.addLayer($thematicMap.ui.markers);
				 */
				
//				this.sMap.createInfoControl("2014 년");
			}
			
			$thematicMap.ui.initializeMap();
			$thematicMap.ui.map.on('moveend', function () {
			});
			$thematicMap.ui.map.setView(sop.utmk(centerPos), zoomlevel);
			
			$thematicMap.ui.sMap.createCurrentLocationButton();// 현재위치
			
			$thematicMap.ui.map.zoomControl.setPosition("topleft");
			
			$thematicMap.ui.sMap.createMapSizeControlButton();
			
		},
		initializeMap : function () {
			if (this.isGeoJsonCreated) {
				$thematicMap.geoJsonObj = {};
				$thematicMap.staticJsonObj = [];
				
				$thematicMap.ui.geoJson.onRemove($thematicMap.ui.map);
				$thematicMap.ui.clearDataOverlay();
				$thematicMap.ui.isGeoJsonCreated = false;
				
				$thematicMap.ui.markerGroup.clearLayers();
				// $thematicMap.ui.markers.clearLayers();
				
			}
			$($thematicMap.ui.sMap.mapInfo.barChartObj).hide();
		},
		clearDataOverlay : function () {
			if ($thematicMap.ui.sMap.dataGeojson) {
				$thematicMap.ui.sMap.dataGeojson.remove();
				$thematicMap.ui.sMap.dataGeojson.eachLayer(function (layer) {
					layer.removeCaption();
				});
			}
			$thematicMap.ui.sMap.data = [];
			$thematicMap.ui.sMap.combineData = [];
			$thematicMap.ui.sMap.dataGeojson = null;
			$thematicMap.ui.sMap.curDropPolygonCode = null;
		},
		setMapzoomLevel : function (zoomlevel, adm_cd, callbackApi) {
			// 초기화
			$thematicMap.ui.initializeMap();
			if (zoomlevel >= 0 && zoomlevel <= 3) {
				// 전국시도경계
				$thematicMap.ui.sMap.curPolygonCode = 1;
				$thematicMap.request.sidoArea($thematicMap.ui.bnd_year, callbackApi);
			}
			else if (zoomlevel > 3 && zoomlevel <= 5) {
				$thematicMap.ui.sMap.curPolygonCode = 2;
				// 시군구 hadmarea
				$thematicMap.request.hadmArea(adm_cd, callbackApi);
			}
			else if (zoomlevel > 5 && zoomlevel <= 8) {
				$thematicMap.ui.sMap.curPolygonCode = 3;
				// 동경계 경계 hadmarea
				$thematicMap.request.hadmArea(adm_cd, callbackApi);
			}
			else if (zoomlevel > 8) {
				$thematicMap.ui.sMap.curPolygonCode = 4;
				// 동경계 경계 hadmarea
				$thematicMap.request.hadmArea(adm_cd, callbackApi);
			}
		},
		// sop GeoJSON이 담길 객체
		geoJson : {},
		isGeoJsonCreated : false,
		isStatsGeoJson : false,
		isKosisStatsGeoJson : false,
		// geojson 초기화
		initGeoJson : function () {
			$thematicMap.geoJsonObj = {};
			$thematicMap.staticJsonObj = [];
		},
		setGeoJson : function (geoJsonObj) {
			$thematicMap.ui.initializeMap();
			this.isGeoJsonCreated = true;
			var type = 'data';
			
			/* 범례 색 설정을 위한 map.dataGeoJson 설정 */
			$thematicMap.ui.geoJson = sop.geoJson(geoJsonObj, {
				style : this.sMap.setPolygonGeoJsonStyle(type),
				onEachFeature : function (feature, layer) {
					$thematicMap.ui.sMap.setLayerColor(feature, layer);
					layer.on({
						click : function (event) {
							$thematicMap.ui.sMap.removePreLayer(event, feature, type);
							$thematicMap.ui.sMap.didSelectedPolygon(event, feature, type);
						}
					});
				}
			}).addTo($thematicMap.ui.map);
			
			$thematicMap.Popup.close();
			
			/* 통계+경계데이터 일경우에 setCatpion */
			$thematicMap.ui.sMap.dataGeojson = $thematicMap.ui.geoJson;
			
		},
		addMarker : function () {
			
		},
		createToolTip : function (event, feature) {
			
		}
	};
	// 경계데이터
	$thematicMap.geoJsonObj = {};
	
	// 통계데이터
	$thematicMap.staticJsonObj = [];
	
	$thematicMap.themeList = {};
	
	/** ********* API 요청 ********* */
	$thematicMap.request = {
		getStatsThemeMapParamInfo : function (paramKey) {
			$statsPotal.api.thematicMap.getStatsThemeMapParamInfo({
				param : {
					stat_thema_map_id : paramKey
				},
				method : 'POST',
				success : $thematicMap.response.successStatsThemeMapParamInfo
			});
		},
		
		getThemeKosis : function (adm_cd) {
			var p = null;
			
			if(adm_cd != null && adm_cd != undefined) {
				p = {
					adm_cd : adm_cd
				};
			}
			
			$statsPotal.api.thematicMap.getThemeKosis({
				method : 'POST',
				param : p,
				success : $thematicMap.response.successThemeKosis
			});
		},		
		// 남한경계
		countryArea : function () {
			options = {
				callbackFunc : null,
				adm_cd : null,
				info : 'countryArea'
			};
			$.ajax({
				type : "POST",
				url : "/mobile/js/data/geo.js",
				success : function (res, callbackStatsApi) {
					$thematicMap.response.successCountryArea(res, options);
					
				},
				dataType : "json",
				error : function (e) {
					// alert(e.responseText);
				}
			});
		},
		// 시도경계
		sidoArea : function (year, callbackStatsApi) {
			options = {
				callbackFunc : callbackStatsApi,
				adm_cd : null,
				info : 'sidoArea'
			};
			$.ajax({
				type : "POST",
				url : contextPath+"/js/data/geo_sido_" + year + ".js",
				success : function (res, callbackStatsApi) {
					$thematicMap.response.successSidoArea(res, options);
				},
				dataType : "json",
				error : function (e) {
					// alert(e.responseText);
					
				}
			});
		},
		// 행정경계
		hadmArea : function (adm_cd, callbackStatsApi) {
			if (sop.Util.isUndefined(adm_cd)) {
				throw new Error('Check adm_cd');
			}
			
			$statsPotal.api.boundary.hadmarea({
				param : {
					year : $thematicMap.ui.bnd_year,
					adm_cd : adm_cd
				},
				accessToken : accessToken,
				success : $thematicMap.response.successHadmArea,
				options : {
					param : adm_cd,
					callbackApi : callbackStatsApi,
					adm_cd : adm_cd,
					year : $thematicMap.ui.bnd_year
				
				}
			});
		},
		
		// 집계구
		statsArea : function (adm_cd, callbackStatsApi) {
			if (sop.Util.isUndefined(adm_cd)) {
				throw new Error('Check adm_cd');
			}
			
			$statsPotal.api.boundary.statsarea({
				param : {
					adm_cd : adm_cd
				},
				accessToken : accessToken,
				success : $thematicMap.response.successStatsArea,
				options : {
					param : adm_cd,
					callbackApi : callbackStatsApi,
					adm_cd : adm_cd					
				}
			});
		},
		
		// 리버스지오코드 시 호출되는 함수 (경계+ 표출데이터 호출)
		AreaAndStatsApis : function (_adm_cd, year) {
			var adm_cd = _adm_cd;
			// 시도 경계인 경우
			if (adm_cd == null) {
				
			}
			
			// zoomlevel별 행정경계 및 Callback API 설정..
			$thematicMap.ui.setMapzoomLevel($thematicMap.ui.map.getZoom(), adm_cd, function () {
				// getOldManHealthList : function (base_year, adm_cd) {
				$thematicMap.request.getThemeKosis(adm_cd);
			
			});
			
		}
	};
	
	$thematicMap.response = {
		successStatsThemeMapList : function (status, res) {
			if (res.errCd === 0) {
				// 테마리스트 전역변수 저장
				$thematicMap.themeList = res.result;
				// Statthemamapparaminfo 조회
				$thematicMap.request.getStatsThemeMapParamInfo($thematicMap.param.stat_thema_map_id);
				
			}
		},
		successThemeKosis : function (status, res) {
			if (res.errCd === 0) {
				$thematicMap.staticJsonObj.push(res.result.kosisInfo);
//				$thematicMap.formatter.combinStatsToGeoJon($thematicMap.geoJsonObj, '명', 'ppltn_cnt');
				$thematicMap.formatter.combinStatsToGeoJon($thematicMap.geoJsonObj, '명', 'basic_liv_recipient');
			}
			
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},		
		successCountryArea : function (res, options) {
			// 경계데이터만 로딩
			$thematicMap.geoJsonObj = res;
			$thematicMap.ui.isStatsGeoJson = false;
			$thematicMap.ui.setGeoJson(res);
			options["geojson"] = res;
			$thematicMap.ui.sMap.lastGeojsonInfo = options;
			
			$thematicMap.Popup.close();
			
		},
		successSidoArea : function (res, options) {
			if (!sop.Util.isUndefined(options)) {
				options.callbackFunc();
			}
			// 경계데이터만 로딩
			options["geojson"] = res;
			$thematicMap.ui.sMap.lastGeojsonInfo = options;
			
			$thematicMap.geoJsonObj = res;
			$thematicMap.Popup.close();
			
		},
		successHadmArea : function (status, res, options) {
			if (res.errCd == '-401') {
				console.log('-401..successHadmArea..accessToken..Error....');
				accessTokenInfo();
				
				setTimeout(function () {
					$thematicMap.request.hadmArea(options.param, options.callbackApi);
				}, 500);
			}
			else {
				$thematicMap.ui.initGeoJson();
				
				options["geojson"] = res;
				$thematicMap.ui.sMap.lastGeojsonInfo = options;
				
				$thematicMap.ui.isStatsGeoJson = false;
				// $thematicMap.ui.setGeoJson(res);
				
				// 경계데이터만 로딩
				$thematicMap.geoJsonObj = res;

				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				//$thematicMap.ui.setGeoJson($thematicMap.geoJsonObj);
			}
		},
		successStatsArea : function (status, res, options) {
			if (res.errCd == '-401') {
				console.log('-401..successStatsArea..accessToken..Error....');
				accessTokenInfo();
				setTimeout(function () {
					$thematicMap.request.statsArea(options.param);
				}, 500);
			}
			else {
				options["geojson"] = res;
				$thematicMap.ui.sMap.lastGeojsonInfo = options;
				// 경계데이터만 로딩
				$thematicMap.ui.isStatsGeoJson = false;		
				
				$thematicMap.geoJsonObj = res;
				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				// $thematicMap.ui.setGeoJson(res);
				
			}
		}
	
	};
	
	$thematicMap.formatter = {
		setLegendForStatsData : function (arData) {
			$thematicMap.ui.sMap.valPerSlice = $thematicMap.ui.sMap.calculateLegend(arData);
			$thematicMap.ui.sMap.mapInfo.updateLegendRange($thematicMap.ui.sMap.valPerSlice);
			
		},
		setMaxMinForStats : function () {
			var arData = new Array();
			for ( var k = 0; k < $thematicMap.staticJsonObj.length; k++) {
				var tmpData = new Array();
				
				for ( var i = 0; i < $thematicMap.staticJsonObj[k].length; i++) {
					for (key in $thematicMap.staticJsonObj[k][i]) {
						if (key == $thematicMap.staticJsonObj[k][i].showData) {
							tmpData.push($thematicMap.staticJsonObj[k][i][key]);
							break;
						}
					}
				}
				arData.push(tmpData);
				
			}
			$thematicMap.formatter.setLegendForStatsData(arData);
		},
		combinStatsToGeoJon : function (geoJsonObj, _unit, _showData) {
			for ( var k = 0; k < $thematicMap.staticJsonObj.length; k++) {
				/*
				 * if ($thematicMap.staticJsonObj[k] != null) {
				 * geoJsonObj["combine"] = true; } else { geoJsonObj["combine"] =
				 * false; }
				 */
				for ( var i = 0; i < geoJsonObj.features.length; i++) {
					var staticObj = $thematicMap.staticJsonObj[k];
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
			$thematicMap.formatter.setMaxMinForStats();
			
			// 경계+통계데이터 인지 구분
			$thematicMap.ui.isStatsGeoJson = true;
			
			// 최종 GeoJSon 설정하기
			$thematicMap.ui.setGeoJson(geoJsonObj);
			
			// return geoJsonObj;
			
		}
	};
	
	$thematicMap.Popup = {
		show : function () {
			this.blockUI = document.createElement("DIV");
			this.blockUI.style.backgroundColor = "#D3D3D3";
			this.blockUI.style.border = "0px solid black";
			this.blockUI.style.position = "absolute";
			this.blockUI.style.left = '0px';
			this.blockUI.style.top = '0px';
			if (window.innerHeight == undefined) {
				this.blockUI.style.height = document.documentElement.clientHeight + 'px';
				this.blockUI.style.width = document.documentElement.clientWidth + 'px';
			}
			else {
				this.blockUI.style.height = window.innerHeight + 'px';
				this.blockUI.style.width = window.innerWidth + 'px';
			}
			this.blockUI.style.zIndex = "10000";
			this.blockUI.style.filter = "alpha(opacity=60);";
			this.blockUI.style.MozOpacity = 0.6;
			this.blockUI.style.opacity = 0.6;
			this.blockUI.style.KhtmlOpacity = 0.6;
			document.body.appendChild(this.blockUI);
			
			this.popupUI = document.createElement("DIV");
			this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
			this.popupUI.style.border = "3px solid rgb(0,0,0)";
			this.popupUI.style.position = "absolute";
			this.popupUI.style.height = '10px';
			this.popupUI.style.lineHeight = '50px';
			this.popupUI.style.paddingBottom = '40px';
			this.popupUI.style.width = '400px';
			this.popupUI.style.top = '50%';
			this.popupUI.style.left = '50%';
			this.popupUI.style.zIndex = "11000";
			this.popupUI.style.cursor = 'wait';
			var divHeight = this.popupUI.style.height.replace('px', '');
			var divWidth = this.popupUI.style.width.replace('px', '');
			this.popupUI.style.margin = '-' + divHeight / 2 + 'px 0 0 -' + divWidth / 2 + 'px';
			this.popupUI.style.textAlign = 'center';
			
			// var errorMsg = "<p>Example message</p><br><img
			// src='../mobile/img/loding_type01.GIF'/>";
			var errorMsg = "Please Wait...";
			this.popupUI.innerHTML = errorMsg;
			
			document.body.appendChild(this.popupUI);
		},
		close : function () {
			if (!sop.Util.isUndefined(this.blockUI)) {
				document.body.removeChild(this.blockUI);
				delete this.blockUI;
			}
			if (!sop.Util.isUndefined(this.popupUI)) {
				D.body.removeChild(this.popupUI);
				delete this.popupUI;
			}
		}
	
	};
	/* window console.log 문제해결 */
	if (!window.console) {
		console = {
			log : function () {
			}
		};
	}
}(window, document));
