/**
 * 
 */
(function (W, D) {
	W.$thematicMap = W.$thematicMap || {};
	
	$(document).ready(function () {
		// map.js 및 mapInfo.js를 사용하기위한 초기설정
		$thematicMap.ui.initialize();
	});
	
	// 경계데이터
	$thematicMap.geoJsonObj = {};
	
	// 통계데이터
	$thematicMap.staticJsonObj = [];
	
	$thematicMap.themeList = {};
	
	PeopleHeapMapLayer = sop.OllehTileLayer.extend({
		options : {
			url : 'https://sgisapi.kostat.go.kr/tiles/phmap/l{z}/{y}/{x}.png',
			maxZoom: 9,
			minZoom: 0
		},

		getTileUrl: function (coords) {
			var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;

			return sop.Util.template(this._url, sop.extend({
				r: this.options.detectRetina && sop.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
				s: this._getSubdomain(coords),
				x: 'C' + this.fillZero(coords.x.toString(16), 8),
				y: 'R' + this.fillZero(y.toString(16), 8),
				z: this.fillZero(this._getZoomForUrl().toString(10), 2)
			}, this.options));
		},

		_tileOnError: function (done, tile, e) {
			if (sop.Browser.ielt9) {
				tile.style.filter = 'alpha(opacity=0)';
			} else {
				tile.style.opacity = '0';
			}
			done(e, tile);
		}
	});
	
	$thematicMap.ui = {
		sMap : null, // map.js의 map객체
		map : {},
		bnd_year : '2012',
		comboControl : {},
		isMapCreated : false,
		isFirst : true,
		
		// sop GeoJSON이 담길 객체
		geoJson : {},
		isGeoJsonCreated : false,
		
		initialize : function () {
			/* sMap.map생성 kcu 추가 */
			this.sMap = new sMap.map();
			this.sMap.mapInfo = new sMapInfo.mapInfo(this.sMap);
			this.sMap.mapInfo.initialize($thematicMap.ui);
			
			//네비게이션 init 함수
			window.parent.$mapNavigation.ui.setMapObj(this.sMap);
			window.parent.$mapNavigation.event.setUIEvent();
			
			// 가락동좌표
//			$thematicMap.ui.createMap([ 966621, 1944048 ], 8);
			var center = window.parent.$mapNavigation.ui.getLocationCoords();
			$thematicMap.ui.createMap(center, 1);
		},
		
		createMap : function (centerPos, zoomlevel) {
			/* 최소 MIN 레벨 설정 */
			var maxLevel = 13;
			
			if (!this.isMapCreated) {
				// 최초 로딩시
				$thematicMap.ui.map = sop.map('map', {
					zoomControl: false,
					ollehTileLayer: true,
					panControl: false,
					measureControl: false,
					zoomSliderControl: false,
					maxZoom: 9,
					minZoom: 0
//					scale : false,
//					panControl : false,
//					measureControl : false,
//					maxZoom : maxLevel,
//					attributionControl : false
				});
				
				var tileLayer = new PeopleHeapMapLayer();
				tileLayer.addTo($thematicMap.ui.map);
				
				//네비게이션 추가
				window.parent.$mapNavigation.ui.sidoSelectSet(1); 
				
				/* 범례 생성 */
				this.sMap.gMap = $thematicMap.ui.map;
//				this.sMap.mapInfo.createLegend();
//				this.sMap.mapInfo.createLegendColor();
//				this.sMap.mapInfo.colorPickerSet();
//				
//				this.sMap.mapInfo.createBarChart();
				
				this.sMap.MainObj = $thematicMap;
				
				// this.sMap.mapInfo.createBarChart('bottomright');
				
				this.sMap.addControlEvent("moveend");
				this.sMap.addControlEvent("zoomend");
				
				this.isMapCreated = true;
				
				// 마커들 그룹
				$thematicMap.ui.markerGroup = new sop.LayerGroup();
				// 지도레이어에 POI Marker 그룹 레이어 추가
				$thematicMap.ui.map.addLayer($thematicMap.ui.markerGroup);
			}
			
			$thematicMap.ui.initializeMap();
			
			$thematicMap.ui.map.on('moveend', function () {
				console.log('moveend...');
			});
			
			$thematicMap.ui.map.setView(sop.utmk(centerPos), zoomlevel);
			
			//$thematicMap.ui.map.zoomSliderControl.setPosition("topleft");
			
		},
		
		initializeMap : function () {
			if (this.isGeoJsonCreated) {
				console.log('initializeMap..cal..');
				$thematicMap.geoJsonObj = {};
				$thematicMap.staticJsonObj = [];
				
				$thematicMap.ui.geoJson.onRemove($thematicMap.ui.map);
				$thematicMap.ui.clearDataOverlay();
				$thematicMap.ui.isGeoJsonCreated = false;
				
				$thematicMap.ui.markerGroup.clearLayers();
				
			}
//			$($thematicMap.ui.sMap.mapInfo.barChartObj).hide();
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
			console.log('zoomlevel', zoomlevel);
			if (zoomlevel >= 0 && zoomlevel <= 5) {
				// 전국시도경계
				$thematicMap.ui.sMap.curPolygonCode = 1;
				$thematicMap.request.sidoArea($thematicMap.ui.bnd_year, callbackApi);
			}
			else if (zoomlevel > 5 && zoomlevel <= 7) {
				$thematicMap.ui.sMap.curPolygonCode = 2;
				// 시군구  hadmarea
				$thematicMap.request.hadmArea(adm_cd, callbackApi);
			}
			else if (zoomlevel > 7 && zoomlevel <= 9) {
				$thematicMap.ui.sMap.curPolygonCode = 3;
				// 동경계 경계 hadmarea
				$thematicMap.request.hadmArea(adm_cd, callbackApi);
			}
			else if (zoomlevel >=10) {
				$thematicMap.ui.sMap.curPolygonCode = 4;
				// 동경계 경계 hadmarea
				$thematicMap.request.hadmArea(adm_cd, callbackApi);
			}
		},
		
		getMapzoomLevel : function (_stat_dist_level) {
			var maxZoomlevel;
			if (_stat_dist_level == '01') {
				// 시도 1 2 3
				maxZoomlevel = 3;
			} else if (_stat_dist_level == '02') {
				// 시군구 4 5 6
				maxZoomlevel = 6;
			} else if (_stat_dist_level == '03') {
				// 읍면동 7 8 9
				maxZoomlevel = 9;
			} else if (_stat_dist_level == '04') {
				// 집계구 10 11 12 13
				maxZoomlevel = 13;
			} else {
				maxZoomlevel = 13;
			}
			
			return maxZoomlevel;
		},
		
		// geojson 초기화
		initGeoJson : function () {
			$thematicMap.geoJsonObj = {};
			$thematicMap.staticJsonObj = [];
		},
		
		setGeoJson : function (geoJsonObj) {
			$thematicMap.ui.initializeMap();
			this.isGeoJsonCreated = true;
			var type = 'data';
			
			if(this.isFirst) {
				var currentAdmCd = null;
				if($thematicMap.ui.sMap.curSidoCd != undefined && $thematicMap.ui.sMap.curSidoCd != null && $thematicMap.ui.sMap.curSidoCd.length > 0) {
					currentAdmCd = $thematicMap.ui.sMap.curSidoCd;
				}
				
				if($thematicMap.ui.sMap.curSiggCd != undefined && $thematicMap.ui.sMap.curSiggCd != null && $thematicMap.ui.sMap.curSiggCd.length > 0) {
					currentAdmCd += $thematicMap.ui.sMap.curSiggCd;			
				}
				
				if($thematicMap.ui.sMap.curDongCd != undefined && $thematicMap.ui.sMap.curDongCd != null && $thematicMap.ui.sMap.curDongCd.length > 0) {
					currentAdmCd += $thematicMap.ui.sMap.curDongCd;
				}
			}
			
			/* 범례 색 설정을 위한 map.dataGeoJson 설정 */
			$thematicMap.ui.geoJson = sop.geoJson(geoJsonObj, {
				style : this.sMap.setPolygonGeoJsonStyle(type),
				onEachFeature : function (feature, layer) {
					$thematicMap.ui.sMap.setLayerColor(feature, layer);
					if($thematicMap.ui.isFirst && feature.info[0].adm_cd != null && feature.info[0].adm_cd != undefined) {
						if(feature.info[0].adm_cd == currentAdmCd) {
							$thematicMap.ui.isFirst = false;
							$thematicMap.ui.sMap.mapInfo.updateBarChart(feature);
						}
					}
					layer.on({
						mouseover : function (event) {
							$thematicMap.ui.sMap.setPolyLayerMouseover(event);
							$thematicMap.ui.sMap.didMouseOverPolygon(event, feature, type);
						},
						mouseout : $thematicMap.ui.sMap.setPolyLayerMouseout,
						click : function (event) {
							$thematicMap.ui.sMap.didSelectedPolygon(event, feature, type);
							$thematicMap.ui.sMap.mapInfo.updateBarChart(feature);
						},
					});
				}
			}).addTo($thematicMap.ui.map);
			
			$thematicMap.Popup.close();
			$thematicMap.ui.sMap.dataGeojson = $thematicMap.ui.geoJson;
		},
		
		addMarker : function () {
			
		}
	};
	
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
		
		getSingleFamily : function (adm_cd) {
			$statsPotal.api.thematicMap.getSingleFamily({
				param : {
					adm_cd : adm_cd,
				},
				method : 'POST',
				success : $thematicMap.response.successSingleFamily
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
				url : "/js/data/geo.js",
				success : function (res, callbackStatsApi) {
					console.log('res..', res);
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
				url : "/js/data/geo_sido_" + year + ".js",
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
			console.log('adm_cd', adm_cd);
			if (sop.Util.isUndefined(adm_cd)) {
				throw new Error('Check adm_cd');
			}
			
			$statsPotal.api.boundary.hadmarea({
				param : {
					year : '2012',
					adm_cd : adm_cd
				},
				accessToken : accessToken,
				success : $thematicMap.response.successHadmArea,
				options : {
					param : adm_cd,
					callbackApi : callbackStatsApi,
					adm_cd : adm_cd,
					year : "2012",
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
					adm_cd : adm_cd,
					year : "2012"
				}
			});
		},
		
		// 리버스지오코드 시 호출되는 함수 (경계+ 표출데이터 호출)
		AreaAndStatsApis : function (_adm_cd, year) {
			console.log('AreaAndStatsApis...Start');
			var adm_cd = _adm_cd;
			// 시도 경계인 경우
			if (adm_cd == null) {
				
			}
			
			// zoomlevel별 행정경계 및 Callback API 설정..
			$thematicMap.ui.setMapzoomLevel($thematicMap.ui.map.getZoom(), adm_cd, function () {
				$thematicMap.request.getSingleFamily(adm_cd);
			});
			
		}
	};
	
	$thematicMap.response = {
		successStatsThemeMapList : function (status, res) {
			if (res.errCd === 0) {
				console.log('res themeList.', res.result);
				// 테마리스트 전역변수 저장
				$thematicMap.themeList = res.result;
				// Statthemamapparaminfo 조회
				$thematicMap.request.getStatsThemeMapParamInfo($thematicMap.param.stat_thema_map_id);
				
			}
		},
		
		successSingleFamily : function (status, res) {
			if (res.errCd === 0) {
				console.log('successSingleFamily', res.result);
				$thematicMap.staticJsonObj.push(res.result.singlefamily);
				console.log('$thematicMap.geoJsonObj', $thematicMap.geoJsonObj);
				$thematicMap.formatter.combinStatsToGeoJon($thematicMap.geoJsonObj, '(%)', 'rate_value');
			} else {
				messageAlert.open("알림", res.errMsg);
			}
		},
				
		successCountryArea : function (res, options) {
			// 경계데이터만 로딩
			console.log('successCountryArea', res);
			$thematicMap.geoJsonObj = res;
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
			console.log('successSidoArea', res);
			options["geojson"] = res;
			$thematicMap.ui.sMap.lastGeojsonInfo = options;
			
			$thematicMap.geoJsonObj = res;
			$thematicMap.Popup.close();
			
		},
		
		successHadmArea : function (status, res, options) {
			if (res.errCd == '-401') {
				console.log('-401..successHadmArea..accessToken..Error....');
				accessTokenInfo();
				console.log('options', options);
				
				setTimeout(function () {
					$thematicMap.request.hadmArea(options.param, options.callbackApi);
				}, 500);
			} else {
				$thematicMap.ui.initGeoJson();
				console.log('successHadmArea', res);
				
				options["geojson"] = res;
				$thematicMap.ui.sMap.lastGeojsonInfo = options;
				
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
			} else {
				console.log('successStatsArea', res);
				options["geojson"] = res;
				$thematicMap.ui.sMap.lastGeojsonInfo = options;
				// 경계데이터만 로딩
				
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
//			$thematicMap.ui.sMap.mapInfo.updateBarChart(arData);
			$thematicMap.formatter.setLegendForStatsData(arData);
		},
		
		combinStatsToGeoJon : function (geoJsonObj, _unit, _showData) {
			for ( var k = 0; k < $thematicMap.staticJsonObj.length; k++) {
				console.log('$thematicMap.staticJsonObj[k]', $thematicMap.staticJsonObj[k]);
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
			
		},
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
			} else {
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
