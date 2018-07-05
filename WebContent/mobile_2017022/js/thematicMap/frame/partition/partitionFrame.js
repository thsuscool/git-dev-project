/**
 * 
 */
(function (W, D) {
	W.$thematicMap = W.$thematicMap || {};
	
	$(document).ready(function () {
		// map.js 및 mapInfo.js를 사용하기위한 초기설정
		$thematicMap.ui.initialize();
		$thematicMap.ui.setPartitionClass();
	});
	parent.window.onorientationchange = function() {
		setTimeout(function() {
			parent.window.setRemarkBoxListSize();
		}, 1000);
		$thematicMap.ui.setPartitionClass();
	};
	$(window).load(function(){
		$thematicMap.leftMap.map.invalidateSize();
		$thematicMap.rightMap.map.invalidateSize();
	});
	$thematicMap.ui = {
		sMap : null, // map.js의 map객체
		mapList : [],
		setPartitionClass : function(){
			if(parent.window.orientation != 0){
				$("#leftMap,#rightMap").removeClass("vertical").addClass("horizontal")
			}else{
				$("#leftMap,#rightMap").removeClass("horizontal").addClass("vertical")
			}
		},
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
		this.getStats = function(target,adm_cd,callback){
			target.staticJsonObj = [];
			var param = {
				adm_cd : adm_cd==null?"00":adm_cd,
				area_type:"auto"
			};
			if(target.mapId=="leftMap"){
				param.thema_map_data_id = $sgisMobileThematicFrame.mapInfo.thema_map_data_id;
				param.stat_data_base_year = $sgisMobileThematicFrame.mapInfo.stat_data_base_year;
			}else{
				param.thema_map_data_id = $sgisMobileThematicFrame.mapInfo.sep_map_data_id;
				param.stat_data_base_year = $sgisMobileThematicFrame.mapInfo.sep_map_data_year;
			}
			$statsPotal.api.thematicMap.getStats({
				param : param,
				method : 'GET',
				success : that.successGetStats,
				options : {
					target : target,
					callback : callback
				}
			});
		};
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
		this.successGetStats = function (status, res, options) {
			if (res.errCd === 0) {
				options.target.staticJsonObj.push(res.result.detailInfo);
				var unit;
				if(options.target.mapId=="leftMap"){
					unit = $sgisMobileThematicFrame.mapInfo[$("#stat_sel a.on").data("id")+"_sep_unit"];
				}else{
					unit = $sgisMobileThematicFrame.mapInfo["sep_map_"+$("#stat_sel a.on").data("id")+"_sep_unit"];
				}
				$thematicMap.formatter.combinStatsToGeoJon(options.target, unit, $("#stat_sel a.on").data("id")+'_data_val'); 
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
			if(typeof options.callback === "function"){
				options.callback();
			}
		};
		
		
		this.successSidoArea = function (res, options) {
			// 경계데이터만 로딩
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
				accessTokenInfo();
				setTimeout(function () {
					options.target.BoundaryApi.hadmArea(options.param, options.callbackApi);
				}, 500);
			}
			else {
				options.target.initGeoJson();
				
				options["geojson"] = res;
				options.target.sMap.lastGeojsonInfo = options;
				options.target.isStatsGeoJson = false;
				
				// 경계데이터만 로딩
				options.target.geoJsonObj = res;
				
				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				
			}
		};
		
		this.successStatsArea = function (status, res, options) {
			if (res.errCd == '-401') {
				accessTokenInfo();
				setTimeout(function () {
					options.target.BoundaryApi.statsArea(options.param);
				}, 500);
			}
			else {
				options["geojson"] = res;
				options.target.sMap.lastGeojsonInfo = options;
				options.target.isStatsGeoJson = false;
				options.target.geoJsonObj = res;
				
				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				
			}
		};
		
	};
	
	$thematicMap.formatter = {
		setLegendForStatsData : function (target,arData) {
			target.sMap.valPerSlice = target.sMap.calculateLegend(arData);
			target.sMap.mapInfo.updateLegendRange(target.sMap.valPerSlice);
		},
		
		setMaxMinForStats : function (target) {
			var arData = new Array();
			for ( var k = 0; k < target.staticJsonObj.length; k++) {
				var tmpData = new Array();
				
				for ( var i = 0; i < target.staticJsonObj[k].length; i++) {
					for (key in target.staticJsonObj[k][i]) {
						if (key == target.staticJsonObj[k][i].showData) {
							tmpData.push(target.staticJsonObj[k][i][key]);
							break;
						}
					}
				}
				arData.push(tmpData);
				
			}
			$thematicMap.formatter.setLegendForStatsData(target,arData);
		},
		
		combinStatsToGeoJon : function (target, _unit, _showData) {
			var dataName;
			if(target.mapId == "leftMap"){
				dataName = $sgisMobileThematicFrame.mapInfo[$("#stat_sel a.on").data("id")+"_sep_ttip_title"];
			}else{
				dataName = $sgisMobileThematicFrame.mapInfo["sep_map_"+$("#stat_sel a.on").data("id")+"_sep_ttip_title"];
			}
			for ( var k = 0; k < target.staticJsonObj.length; k++) {
				for ( var i = 0; i < target.geoJsonObj.features.length; i++) {
					var staticObj = target.staticJsonObj[k];
					for ( var j = 0; j < staticObj.length; j++) {
						if (target.geoJsonObj.features[i].info == null) {
							target.geoJsonObj.features[i]["info"] = [];
						}
						if (target.geoJsonObj.features[i].properties.adm_cd == staticObj[j].adm_cd) {
							staticObj[j].unit = _unit;
							staticObj[j].showData = _showData;
							var staticObjInfo = staticObj[j];
							if (sop.Util.isUndefined(target.geoJsonObj.features[i].info)) {
								target.geoJsonObj.features[i].info = [];
							}
							staticObjInfo.dataName = dataName;
							target.geoJsonObj.dataIdx = i;
							target.geoJsonObj.features[i].info.push(staticObjInfo);
						}
					}
					
				}
			}
			// API 결과 범례 수치 계산
			$thematicMap.formatter.setMaxMinForStats(target);
			
			// 최종 GeoJSon 설정하기
			target.setGeoJson(target.geoJsonObj);
		}
	};
	$thematicMap.Popup = {
		show : function () {
			this.blockUI = document.createElement("DIV");
			this.blockUI.className = "sgis-mobile-popup";
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
