
(function(W, D) {
	W.$thematicMapFrame03_api = W.$thematicMapFrame03_api || {};
	
	
	$thematicMapFrame03_api.request = {
			
			/**
			 * 
			 * @name         : setStatsData
			 * @description  : 
			 * @date         : 2014. 10. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsData : function (res, options) {		
				var result = res.result;
				var params = options.params;
				var map = params.map;
				var mapInfo = map.mapInfo;
				
				res["pAdmCd"] = params.adm_cd;
				
				/*//N/A의 경우 0으로 치환
				for (var i=0; i<result.length; i++) {
					if (result[i][params.filter] == "N/A") {
						result[i][params.filter] = "0";
					}
				}*/
				
				map.drawControl.removeOverlay();
				//map.multiLayerControl.clear();

				/*//인구총괄일 경우, 사용자지정영역을 그릴수 없다.
				if (res.id == "API_0301") {
					//$(mapInfo.pieChartObj).hide(); => 다른거로 대체
				}
*/
				// 일반검색 버튼일 경우,
				if ($interactiveMap.ui.searchBtnType == "normal") {	
					//시계열 조회일 경우
					if ($interactiveDataBoard.ui.isTimeSeriesPlay) {
						$interactiveDataBoard.ui.timeSeriesPushData.push({
							"res" : res,
							"options": options
						});
						$interactiveDataBoard.ui.doReqTimeSeries();
						
					} else {
						map.setStatsData("normal", res, params.filter, params.unit);	
						if (params.view_type == "TS") {
							map.openApiReverseGeoCode(map.center);
						}else {
							map.autoDownBoundary();
						}
						
						//인구총괄의 경우, 파이차트가 의미가 없어 hide함.
//						if ((res.id == "API_0301" && params.filter == "tot_ppltn") ||
//							 res.id != "API_0301") {
//							$interactiveDataBoard.ui.updatePieChart(options);
//						}
						
						//데이터보드 업데이트
						$interactiveDataBoard.ui.updateDataBoard(res, options);
					/*
						mapInfo.updateBarChart(res, options);
						mapInfo.updateLegendRange(res);
						mapInfo.updateTimeSeries(options);
						mapInfo.updateSearchTitle(options);*/
					}
						
					// 북마크,공유정보 설정
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "normal";
					options.params.param.push({"key" : "adm_cd", "value" : params.adm_cd});
					console.log(map.shareInfo);
					map.shareInfo.setShareInfo(options, "normal", map.id);
					
					//API 로그
					apiLogWrite("A0", options);
					
				} else {
					
					//범례결합시, 하나라도 통신에러나 검색결과가 없을 경우, 초기화한다.
					if ($thematicMapFrame03_api.request.combineFailCnt > 0) {
						map.clearDataOverlay();
						$interactiveMap.ui.shareUrlInfoList = [];
						return;
					}
					map.setStatsData("combine", res, params.filter, params.unit);
					
					// 요청된 api정보가 모두 수신되었을 경우,
					if (map.combineData.length == 2) {
						map.autoDownBoundary();
						$(mapInfo.pieChartObj).hide();
						$(mapInfo.barChartObj).hide();
						$(mapInfo.timeSeriesObj).hide();
//						$("#timeSeriesDiv").hide();
						
						//결합일경우, 범례설정
						mapInfo.setLegendRange();
					}

					// 북마크,공유정보 설정
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "combine";
					options.params.param.push({"key" : "adm_cd", "value" : params.adm_cd});
					map.shareInfo.setShareInfo(options, "normal", map.id);
					
					if (map.combineData.length == 2) {
						var shareUrlInfoList = map.shareInfo.shareUrlInfo;
						var combineTitle = "";
						var api_ids = "";
						for( var i = 0; i < shareUrlInfoList.length; i ++ ) {
							if(i == 0) {
								combineTitle += shareUrlInfoList[i].title;
								api_ids += shareUrlInfoList[i].params.api_id;
							} else {
								combineTitle += " | " + shareUrlInfoList[i].title;
								api_ids += " | " + shareUrlInfoList[i].params.api_id;
							}
						}

						options.params.api_id = api_ids;
						options.params.title = combineTitle;
						//mapInfo.updateSearchTitle(options);	=> 다른걸로 대체
						
						//API 로그
						apiLogWrite("A0", options);
					}

				}
			},
			
			
		
			API_9000_URL : "/ServiceAPI/thematicMap/other/GetThemaSingleFamily.json",
				
			/**
			 * 
			 * @name         : 
			 * @description  :  테마 맵 정보를 조회한다.
			 * @date         : 2015. 11. 09. 
			 * @author	     :
			 * @history 	 :
			 * @param params : 
			 */
			openThematicMapInfo : function(params) {
				var openThematicMapInfoObj = new sop.openApi.openThematicMapInfo.api();
								
				//must param : adm_cd
				param = adm_cd;
				
				openThematicMapInfoObj.addParam("adm_cd", adm_cd);
				
				openThematicMapInfo.request({
					method : "GET",
					async : false,
					url : this.API_9000_URL,
					/*options : {
						// null 가능
						params : params,
						url : this.API_0301_URL,
					}*/
				});
			}		
	}; // $thematicMapFrame03_api.request 끝

	
	
	/** *********  시작 ********* */
	(function() {
		$class("sop.portal.openThematicMapInfo.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") { // 멀티일경우
									// 상태를 세팅한다.
									$thematicMapFrame03_api.request.setMultiStatsData(res, options);		
								}else {
									$thematicMapFrame03_api.request.setStatsData(res, options);		
								}
								break;
							case -401://
								accessTokenInfo(function() {
									$thematicMapFrame03_api.request.openThematicMapInfo(options.params);
								});
								break;
							default:
								$thematicMapFrame03_api.request.combineFailCnt++;
								map.clearDataOverlay();

								$interactiveDataBoard.ui.emptyTimerBaseInsert(res, options);
								
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른것으로 대체
					}
				});
	}());
	/** ********* 종료 ********* */
	
	
}(window, document));

/*function getSession() {

};*/