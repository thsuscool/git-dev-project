(function(W, D) {
	W.$localMapApi = W.$localMapApi || {};
	$localMapApi.request = {
		API_0301_URL: "/OpenAPI3/stats/population.json",
		API_0302_URL: "/OpenAPI3/stats/searchpopulation.json",
		API_0303_URL: "/OpenAPI3/stats/industrycode.json",
		API_0304_URL: "/OpenAPI3/stats/company.json",
		API_0305_URL: "/OpenAPI3/stats/household.json",
		API_0306_URL: "/OpenAPI3/stats/house.json",
		API_0307_URL: "/OpenAPI3/stats/farmhousehold.json",
		API_0308_URL: "/OpenAPI3/stats/forestryhousehold.json",
		API_0309_URL: "/OpenAPI3/stats/fisheryhousehold.json",
		API_0310_URL: "/OpenAPI3/stats/householdmember.json",
		API_0601_URL: "/OpenAPI3/startupbiz/startupbiz.json",
		setStatsData: function(res, params, callback) {
			if(!$localMap.ui.abs.blockUI){
				$localMap.ui.abs.onBlockUIPopup();
			}
			$localMap.ui.doClearMap(1);
			var map = params.params.map;
			res["pAdmCd"] = params.params.adm_cd;
			$localMap.ui.data = res;
			// 일반검색 버튼일 경우,
			map.setStatsData("bizStats", res, null, null);
			if (callback != undefined && typeof callback === "function") {
				callback();
			}
			if($localMap.ui.abs.blockUI){
				$localMap.ui.abs.onBlockUIClose();
			}
		},
		requestStatsOpenApi: function(api_id, adm_cd, map, option) {
			var params = {
				"adm_cd": adm_cd,
				"year": censusDataYear,
				"bnd_year": map.bnd_year,
				"area_type": 0,
				"low_search": 1
			}
			var statInfo = {
				api_call_url: option.url,
				param_info: {
					api_id: api_id,
					isKosis: false,
					mapInfo: {
						center: $localMap.ui.curSelectedMapCenter,
						zoomlevel: 9
					},
					paramInfo: params,
					showData: option.filter,
					title: "",
					unit: option.unit,
				},
				map: map
			}
			this.openApiStatBaseYearProcess(api_id, params, {
				info: statInfo
			});
		},
		/**
		 * 
		 * @name         : openApiStatBaseYearProcess
		 * @description  : 통계별최신년도 정보를 조회한다.
		 * @param api_id
		 * @param params
		 * @param options
		 */
		openApiStatBaseYearProcess: function(api_id, params, options) {
			var obj = null;
			if (api_id == "API_0301") {
				obj = new sop.portal.statLocalBaseYear.api();
			} else {
				obj = new sop.portal.statBaseYear.api();
			}
			var param_info = new Array();
			for (key in params) {
				param_info.push(key);
			}
			obj.addParam("api_id", api_id);
			obj.addParam("param_info", param_info);
			obj.onBlockUIPopup();
			obj.request({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/map/interactive/statBaseYear.json",
				options: {
					api_id: api_id,
					params: params,
					options: options
				}
			});
		},
		/**
		 * 
		 * @name         : openApiBizStats
		 * @description  : 창업통계정보를 호출한다.
		 * @param params : 통계정보 파라미터
		 */
		openApiBizStats: function(params) {
			var sopOpenApiBizStatsObj = new sop.openApi.bizStats.api();
			var paramInfo = params.param_info.paramInfo;
			for (k in paramInfo) {
				if (k == "adm_cd") {
					if (paramInfo[k] == "00") {
						continue;
					}
				}
				sopOpenApiBizStatsObj.addParam(k, paramInfo[k]);
			}

			sopOpenApiBizStatsObj.addParam("accessToken", accessToken);
			sopOpenApiBizStatsObj.request({
				method: "GET",
				async: false,
				url: openApiPath + params.api_call_url,
				options: {
					params: params,
				}
			});
		},
		requestPopulationTable: function(params) {
			if(!$localMap.ui.abs.blockUI){
				$localMap.ui.abs.onBlockUIPopup();
			}
			$("div[id^=map-table-]").empty();
			var adm_cd = params.adm_cd;
			params.adm_cd = adm_cd.substring(0, 7);
			$localMap.ui.setTable(params, adm_cd);
			params.adm_cd = adm_cd.substring(0, 5);
			$localMap.ui.setTable(params, adm_cd.substring(0, 7));
			params.adm_cd = adm_cd.substring(0, 2);
			$localMap.ui.setTable(params, adm_cd.substring(0, 5));
			params.adm_cd = "";
			$localMap.ui.setTable(params, adm_cd.substring(0, 2));
			if($localMap.ui.abs.blockUI){
				$localMap.ui.abs.onBlockUIClose();
			}
		}
	};
	/** ********* OpenAPI 내주변통계 Start ********* */
	(function() {
		$class("sop.portal.statLocalBaseYear.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var info = options.params;
				if (res.errCd == "0") {
					if (result.base_year != null) {
						info.year = result.base_year;
						$localMapApi.request.requestPopulationTable(info);
					} else {
						$localMapApi.request.requestPopulationTable(info);
					}
				} else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapApi.request.openApiStatBaseYearProcess(options.api_id, options.params, options.options);
					});
				}else {
					$localMapApi.request.requestPopulationTable(info);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/** ********* OpenAPI 내주변통계 End ********* */
	/** ********* 통계별최신년도정보 조회 시작 ********* */
	(function() {
		$class("sop.portal.statBaseYear.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var info = options.options.info;
				if (res.errCd == "0") {
					if (result.base_year != null) {
						info.param_info.paramInfo["year"] = result.base_year;
						$localMapApi.request.openApiBizStats(info);
					} else {
						$localMapApi.request.openApiBizStats(info);
					}
				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapApi.request.openApiStatBaseYearProcess(options.api_id, options.params, options.options);
					});
				} else {
					$localMapApi.request.openApiBizStats(info);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/** ********* 통계별최신년도정보 조회 종료 ********* */

	/** ********* 창업통계정보조회 종료 ********* */
	(function() {
		$class("sop.openApi.bizStats.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var result = res.result;
				var map = options.params.map;
				var mapInfo = map.mapInfo;
				var params = options.params.param_info;
				if (res.errCd == "0") {
					res["pAdmCd"] = options.params.param_info.paramInfo.adm_cd;

					//N/A의 경우 0으로 치환
					for (var i = 0; i < result.length; i++) {
						if (result[i][params.showData] == "N/A") {
							result[i][params.showData] = "0";
						}
					}

					$localMap.ui.data = res;

					map.bnd_year = params.paramInfo.bnd_year;
					//map.drawControl.enableControl("drawControl"); //draw hide

					// 일반검색 버튼일 경우,
					map.setStatsData("normal", res, params.showData, params.unit);
					map.mapMove(
						params.mapInfo.center,
						params.mapInfo.zoomlevel, false);
					if (params.mapInfo.zoomlevel == map.zoom) {
						map.openApiReverseGeoCode(params.mapInfo.center);
					} else {
						map.curDropPolygonCode = map.curPolygonCode - 1;
					}
					mapInfo.updateLegendRange(res);
				} else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapApi.request.openApiBizStats(options);
					});
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status, options) {
				var map = options.params.map;
				map.clearData();
			}
		});
	}());
	/** ********* 창업통계정보조회 종료 ********* */
}(window, document));