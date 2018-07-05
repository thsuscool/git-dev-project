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
		mapList : [],
		initialize : function () {
			$thematicMap.leftMap.initialize();
			$thematicMap.rightMap.initialize();
			$thematicMap.leftMap.commonMoveEvent();
			$thematicMap.rightMap.commonMoveEvent();
			$thematicMap.leftMap.map.fire("rgeoevent");
			$thematicMap.rightMap.map.fire("rgeoevent");
			this.mapList.push($thematicMap.leftMap);
			this.mapList.push($thematicMap.rightMap);
		}
	};
	
	$thematicMap.Api = function () {
		var that = this;
		this.getThemaMultiCultureDataList = function (target, adm_cd) {
			var options = {
				target : target
			};
			
			$statsPotal.api.thematicMap.getThemaMultiCulture({
				method : 'POST',
				param : {
					adm_cd : adm_cd,
				},
				success : function (status, res) {
					that.successMultiCultureData(res, options)();
				}
			});
		};
		
		this.getAllHouseDataList = function (target, adm_cd) {
			var options = {
				target : target
			};
			
			var params = {
				year : '2010',
				low_search : "1",
			};
			
			if(adm_cd != null && adm_cd != undefined) {
				params.adm_cd = adm_cd;
			}
			
//			console.log(adm_cd);
			
			$statsPotal.api.thematicMap.getAllHouse({
//			$statsPotal.api.stats.getStatsHouseHold({
				method : 'GET',
				accessToken : accessToken,
				param : params,
				options : options,
				success : function (status, res, options) {
					that.successAllHouseData(res, options)();
				}
			});
		},
		
		// 남한경계
		this.countryArea = function () {
			var options = {
				callbackFunc : null,
				adm_cd : null,
				info : 'countryArea'
			};
			$.ajax({
				type : "POST",
				url : "/mobile/js/data/geo.js",
				success : function (res, callbackStatsApi) {
					console.log('res..', res);
					that.successCountryArea(res, options);
					
				},
				dataType : "json",
				error : function (e) {
					// alert(e.responseText);
				}
			});
		};
		// 시도경계
		this.sidoArea = function (year, callbackStatsApi, target) {
			var options = {
				callbackApi : callbackStatsApi,
				adm_cd : null,
				info : 'sidoArea',
				target : target
			};
			$.ajax({
				type : "POST",
				url : contextPath+"/js/data/geo_sido_" + year + ".js",
				success : function (res, callbackStatsApi) {
					that.successSidoArea(res, options);
				},
				dataType : "json",
				error : function (e) {
					// alert(e.responseText);
					
				}
			});
		};
		
		// 행정경계
		this.hadmArea = function (year, adm_cd, callbackStatsApi, target) {
			if (sop.Util.isUndefined(adm_cd)) {
				throw new Error('Check adm_cd');
			}
			
			$statsPotal.api.boundary.hadmarea({
				param : {
					year : year,
					adm_cd : adm_cd
				},
				accessToken : accessToken,
				success : that.successHadmArea,
				options : {
					param : adm_cd,
					callbackApi : callbackStatsApi,
					adm_cd : adm_cd,
					year : year,
					target : target
				
				}
			});
		};
		
		// 집계구
		this.statsArea = function (year, adm_cd, callbackStatsApi, target) {
			if (sop.Util.isUndefined(adm_cd)) {
				throw new Error('Check adm_cd');
			}
			
			$statsPotal.api.boundary.statsarea({
				param : {
					adm_cd : adm_cd,
					year : year
				},
				accessToken : accessToken,
				success : that.successStatsArea,
				options : {
					param : adm_cd,
					callbackApi : callbackStatsApi,
					adm_cd : adm_cd,
					year : year,
					target : target
				}
			});
		};
		
		// 리버스지오코드 시 호출되는 함수 (경계+ 표출데이터 호출)
		this.successMultiCultureData = function (res, options) {
			return function () {
				if (res.errCd === 0) {
//					console.log(res);
//					console.log('options ' + options.target.mapId + 'successMultiCultureData', res.result.multiculture);
					options.target.staticJsonObj.push(res.result.multiculture);
					
					if (options.target.mapId == 'leftMap') {
						options.target.formatter.combinStatsToGeoJon(options.target.geoJsonObj, '가구', 'family_cnt');
					}
					else {
						options.target.formatter.combinStatsToGeoJon(options.target.geoJsonObj, '가구', 'family_cnt');
					}
					
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			};
			
		};
		
		this.successAllHouseData = function (res, options) {
			return function () {
				if (res.errCd === 0) {
//					console.log(res.result);
//					console.log('options ' + options.target.mapId + 'successAllHouse', res.result.multiCulture);
					options.target.staticJsonObj.push(res.result);
					
					if (options.target.mapId == 'leftMap') {
						options.target.formatter.combinStatsToGeoJon(options.target.geoJsonObj, '가구', 'household_cnt');
					}
					else {
						options.target.formatter.combinStatsToGeoJon(options.target.geoJsonObj, '가구', 'household_cnt');
					}
					
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			};
		};
		
		this.successSidoArea = function (res, options) {
			// 경계데이터만 로딩
//			console.log(options.target.mapId + ' ' + 'successSidoArea', res);
			options["geojson"] = res;
			options.target.sMap.lastGeojsonInfo = options;
			options.target.geoJsonObj = res;
			
			if (!sop.Util.isUndefined(options.callbackApi)) {
				options.callbackApi();
			}
			$thematicMap.Popup.close();
			
		};
		
		this.successHadmArea = function (status, res, options) {
			if (res.errCd == '-401') {
//				console.log('-401..successHadmArea..accessToken..Error....');
				accessTokenInfo();
				setTimeout(function () {
					$thematicMap.request.hadmArea(options.param, options.callbackApi);
				}, 500);
			}
			else {
				options.target.initGeoJson();
//				console.log('successHadmArea', res);
				
				options["geojson"] = res;
				options.target.sMap.lastGeojsonInfo = options;
				options.target.isStatsGeoJson = false;
				
				// 경계데이터만 로딩
				options.target.geoJsonObj = res;
				
				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				
				// options.target.setGeoJson($thematicMap.geoJsonObj);
			}
		};
		
		this.successStatsArea = function (status, res, options) {
			if (res.errCd == '-401') {
//				console.log('-401..successStatsArea..accessToken..Error....');
				accessTokenInfo();
				setTimeout(function () {
					$thematicMap.request.statsArea(options.param);
				}, 500);
			}
			else {
//				console.log('successStatsArea', res);
				options["geojson"] = res;
				options.target.sMap.lastGeojsonInfo = options;
				options.target.isStatsGeoJson = false;
				options.target.geoJsonObj = res;
				
				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				// $thematicMap.leftMap.setGeoJson($thematicMap.geoJsonObj);
				
			}
		};
		
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
