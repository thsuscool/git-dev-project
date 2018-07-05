/**
 * 인터랙티브맵 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyWriteMapApi = W.$policyWriteMapApi || {};
	
	$policyWriteMapApi = {
			loadingBar : {
				loadCnt : 0,
				closeCnt : 0,
				show : function (type) {
					this.loadCnt += 1;
					if ($( "#loadingbar" ).length != null && $( "#loadingbar" ).length > 0) {
						return;
					}
					this.blockUI = document.createElement("DIV");
					this.blockUI.setAttribute("id", "loadingbar");
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
					
					var errorMsg = null;
					switch(type) {
						case 1:
							this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
							this.popupUI.style.border = "3px solid rgb(0,0,0)";
							errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
							break;
						case 2:
							errorMsg = "<img src='/img/common/loding_type01.gif'/>";
							break;
					}
					this.popupUI.innerHTML = errorMsg;
					document.body.appendChild(this.popupUI);
				},
				close : function () {
					this.closeCnt += 1;
					if (this.loadCnt == this.closeCnt) {
						if (!sop.Util.isUndefined(this.blockUI)) {
							document.body.removeChild(this.blockUI);
							delete this.blockUI;
						}
						if (!sop.Util.isUndefined(this.popupUI)) {
							D.body.removeChild(this.popupUI);
							delete this.popupUI;
						}
						this.loadCnt = 0;
						this.closeCnt = 0;
					}
					
				}
			}
	};
	
	$policyWriteMapApi.url = {
			API_0301 : openApiPath + "/OpenAPI3/stats/population.json",				//인구총괄
			API_0302 : openApiPath + "/OpenAPI3/stats/innersearchpopulation.json",	//인구통계
			API_0303 : openApiPath + "/OpenAPI3/stats/industrycode.json",			//산업체코드
			API_0304 : openApiPath + "/OpenAPI3/stats/company.json",				//사업체통계
			API_0305 : openApiPath + "/OpenAPI3/stats/household.json",				//가구통계
			API_0306 : openApiPath + "/OpenAPI3/stats/house.json",					//주택통계
			API_0307 : openApiPath + "/OpenAPI3/stats/farmhousehold.json",			//농가통계
			API_0308 : openApiPath + "/OpenAPI3/stats/forestryhousehold.json",		//임가통계
			API_0309 : openApiPath + "/OpenAPI3/stats/fisheryhousehold.json",		//어가통계
			API_0310 : openApiPath + "/OpenAPI3/stats/householdmember.json",		//가구원통계
			API_4011 : contextPath + "/ServiceAPI/stats/fusionstats.json",			//결합조건
			local    : contextPath + "/ServiceAPI/policyWrite/getLocalGovernmentPolygonData.json",
			lbdms    : contextPath + "/ServiceAPI/policyWrite/getLbdmsPolygonData.json",
			userData : contextPath + "/ServiceAPI/mypage/myData/getMyData.json",    //나의데이터 
			kosis    : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do", //KOSIS
			censusPoi: contextPath + "/view/map/policyWrite/getCompanyPoiList.do", //센서스 POI
			localPoi : contextPath + "/view/map/policyWrite/getLocalGovernmentPoiList.do", //협업형 POI
			userPoi : contextPath + "/view/map/policyWrite/getMyDataPoiList.do",    //나의데이터
			lbdmsPoi : contextPath + "/view/map/policyWrite/getLbdmsPoiList.do",	//LBDMS POI
	};
	
	$policyWriteMapApi.ui = {
			userData : [],     //사용자데이터 저장
			
			
			/**
			 * 
			 * @name         : clear
			 * @description  : 지도경계정보를 초기화한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵 정보
			 */
			clear : function(map) {
				if (map.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].remove();
					}
					map.multiLayerControl.dataGeojson = [];
				}
				
				if (map.heatMap) {
					map.heatMap.setUTMKs([]);
				}
				
				map.gMap.eachLayer(function(layer) {
					if (layer._layer) {
						_layer.remove();
					}
				});
				
				$policyWriteMapApi.loadingBar.loadCnt = 0;
				$policyWriteMapApi.loadingBar.closeCnt = 0;
				
			},
			
			/**
			 * 
			 * @name         : clearPoi
			 * @description  : POI정보를 초기화한다.
			 * @date         : 2017. 09. 24. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			clearPoi : function() {
				//마커 삭제
				for (var i=0; i<$policyWriteMap.ui.poiLayerList.length; i++) {
					//마커 초기화
					var layerGroup = $policyWriteMap.ui.poiLayerList[i].markerGroup;
					layerGroup.clearLayers();
					
					//클러스터 초기화
					var clusterGroup = $policyWriteMap.ui.poiLayerList[i].clusterGroup;
					clusterGroup.clearLayers();
					
					//써클초기화
					var circleGroup = $policyWriteMap.ui.poiLayerList[i].circleGroup;
					if (circleGroup) {
						for (var k=0; k<circleGroup.length; k++) {
							circleGroup[k].remove();
						}
					}
					//열지도 초기화
					var heatGroup = $policyWriteMap.ui.poiLayerList[i].heatGroup;
					if (heatGroup) {
						heatGroup.setUTMKs([]);
					}
				}
				$policyWriteMap.ui.poiLayerList = [];
			},
			
			/**
			 * 
			 * @name         : setLegend
			 * @description  : 범례를 설정한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param filter : 통계결과정보 filter
			 * @param map    : 맵 정보
			 */
			setLegend : function(res, filter, map) {
				var tmpLegendData = [];
				for (var i=0; i<res.result.length; i++) {
					tmpLegendData.push(parseFloat(res.result[i][filter]));
				}
				map.legend.valPerSlice = map.legend.calculateLegend([tmpLegendData]);
			},
			
			/**
			 * 
			 * @name         : checkStatsData
			 * @description  : 통계정보를 체크한다.(경계코드와 맞지않는 데이터는 버린다.)
			 * @date         : 2017. 10. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param geoData: 경계정보
			 */
			checkStatsData : function(res, geoData) {
				var tmpResult = [];
				for (var i=0; i<geoData.features.length; i++) {
					var features = geoData.features[i];
					var adm_cd = features.properties.adm_cd;
					for (var k=0; k<res.result.length; k++) {
						if (adm_cd == res.result[k].adm_cd) {
							tmpResult.push(res.result[k]);
						}
					}
				}
				res.result = tmpResult;
				
				return res;
			},
			
			/**
			 * 
			 * @name         : sortData
			 * @description  : 통계결과정보를 정렬한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param parameter : 파라미터정보
			 * @param map    : 맵 정보
			 */
			sortData : function(res, parameter, map) {
				var tmpResult = [];
				var tmpData = map.multiLayerControl.multiData;
				if (tmpData.length > 1) {
					//나의데이터는 비자치구 일때, 데이터를 여러번 호출할 필요없음
					if (res.id == "API_MYDATA") {
						for (var k=0; k<tmpData[0].data.result.length; k++) {
							tmpResult.push(tmpData[0].data.result[k]);
						}	
					}else {
						for (var i=0; i<tmpData.length; i++) {
							for (var k=0; k<tmpData[i].data.result.length; k++) {
								tmpResult.push(tmpData[i].data.result[k]);
							}
						}
					}
					res.result = tmpResult;
				}
				
				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[parameter.filter])-parseFloat(a[parameter.filter]);
					});
				}
				
				return res;
			},
			
			/**
			 * 
			 * @name         : drawPolygon
			 * @description  : 폴리곤을 그린다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵 정보
			 */
			drawPolygon : function(map) {
				map.multiLayerControl.dataGeojson = [];
				var bounds = null;
				for (var k=0; k<map.multiLayerControl.multiData.length; k++) {
					var layer = map.multiLayerControl.multiData[k].layer;
					layer = map.combineStatsData(layer, true);
					map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(layer, "data"));
					
					//경계위치조정
					if (k==0) {
						bounds = map.multiLayerControl.dataGeojson[k].getBounds();
					}else {
						bounds.extend(map.multiLayerControl.dataGeojson[k].getBounds());
					}
				}
				
				if (bounds != null) {
					map.gMap.fitBounds(bounds, {
						animate : false
					});
				}
			},
			
			/**
			 * 
			 * @name         : checkLegendFixed
			 * @description  : 지역별수요변화의 경우, 범례고정기능을 제공한다.
			 * @date         : 2017. 08. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkLegendFixed : function() {
				//지역별 수요변화일 경우, 범례고정기능 제공
				//첫번째 맵의 범례 기준으로 변경
				if ($policyWriteMap.ui.settingInfo.idxType == "1") {
					for (var i=0; i<$policyWriteMap.ui.mapList.length; i++) {
						var map = $policyWriteMap.ui.mapList[i];
						map.legend.legendList = null;
						map.legend.legendCopy(0);
					}
				}
			},

			/**
			 * 
			 * @name         : checkCensusParams
			 * @description  : 센서스통계 요청 전, 파라미터를 체크한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 */
			checkCensusParams : function(api_id, options) {
				//겹합통계는 엑세트토큰 사용하지 않음
				var method = "POST";
				
				switch (api_id) {
					case "API_4011":
						var nonParams = options.param.nonParams;
						for (var p in nonParams) {
							if (p == "fusion_query_type") {
								switch (nonParams[p]) {
									case "population":
										api_id = "API_0302";
										options.param.filter = "population";
										break;
									case "household":
										api_id = "API_0305";
										options.param.filter = "household_cnt";
										break;
									case "house":
										api_id = "API_0306";
										options.param.filter = "house_cnt";
										break;
									default:
										break;
								}
								method = "GET";
								break;
							}
						}
						break;
					case "API_0304":
						//사업체통계 전산업체크
						if( !("class_code" in options.param.params) && 
							!("theme_cd" in options.param.params)) {
							api_id = "API_0301";
						}
						method = "GET";
						break;
					default:
						method = "GET";
						break;
				}

				options.param["method"] = method;

				return {
					"api_id" : api_id,
					"options" : options
				}
			},
			
			/**
			 * 
			 * @name         : checkKosisParams
			 * @description  : KOSIS 통계 요청 전, 파라미터를 체크한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 */
			checkKosisParams : function(api_id, options, callback) {
				if (options.param.etc.low_search == "2") {
					messageConfirm.open(
							"알림", 
							"KOSIS 통계는 선택지역의 한단계 하위지역 통계(1레벨 경계)만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?",
							btns = [
								{
									title : "확인",
									fAgm : null,
									disable : false,
									func : function(opt) {
										if (callback != undefined && typeof callback === "function") {
											callback.call(undefined);
										}
									}
								},
									 
				    			{
									title : "취소",
									fAgm : null,
									disable : false,
									func : function(opt) {}
				    			}   
							]
					);
				}else {
					switch (parseInt(options.param.etc.gis_se)) {
						case 1: //시도기준
							messageConfirm.open(
									"알림", 
									"현재 통계는 시도까지만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?",
									btns = [
										{
											title : "확인",
											fAgm : null,
											disable : false,
											func : function(opt) {
												if (callback != undefined && typeof callback === "function") {
													callback.call(undefined);
												}
											}
										},
											 
						    			{
											title : "취소",
											fAgm : null,
											disable : false,
											func : function(opt) {}
						    			}   
									]
							);
							break;
						case 2: //시군구기준
							switch(options.param.etc.adm_cd.length) {
								case 5:
								case 7:
									messageConfirm.open(
											"알림", 
											"현재 통계는 시군구까지만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?",
											btns = [
												{
													title : "확인",
													fAgm : null,
													disable : false,
													func : function(opt) {
														if (callback != undefined && typeof callback === "function") {
															callback.call(undefined);
														}
													}
												},
													 
								    			{
													title : "취소",
													fAgm : null,
													disable : false,
													func : function(opt) {}
								    			}   
											]
									);
									break;
								default:
									if (callback != undefined && typeof callback === "function") {
										callback.call(undefined);
									}
									break;
							}
							break;
						case 3: //읍면동기준
							switch(options.param.etc.adm_cd.length) {
								case 7:
									messageConfirm.open(
											"알림", 
											"현재 통계는 읍면동까지만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?",
											btns = [
												{
													title : "확인",
													fAgm : null,
													disable : false,
													func : function(opt) {
														if (callback != undefined && typeof callback === "function") {
															callback.call(undefined);
														}
													}
												},
													 
								    			{
													title : "취소",
													fAgm : null,
													disable : false,
													func : function(opt) {}
								    			}   
											]
									);
									break;
								default:
									if (callback != undefined && typeof callback === "function") {
										callback.call(undefined);
									}
									break;
							}
							break;
						default:
							break;
					}
				}
			},
			
			/**
			 * 
			 * @name         : checkLocalParams
			 * @description  : 협업형통계 요청 전, 파라미터를 체크한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 */
			checkLocalParams : function(api_id, options, callback) {
				switch (options.param.params.adm_cd.length) {
					case 5:
						if (options.param.params.low_search == 2) {
							messageConfirm.open(
									"알림", 
									"협업형 통계는 읍면동까지만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?",
									btns = [
										{
											title : "확인",
											fAgm : null,
											disable : false,
											func : function(opt) {
												if (callback != undefined && typeof callback === "function") {
													callback.call(undefined);
												}
											}
										},
											 
						    			{
											title : "취소",
											fAgm : null,
											disable : false,
											func : function(opt) {}
						    			}   
									]
							);
						}else {
							if (callback != undefined && typeof callback === "function") {
								callback.call(undefined);
							}
						}
						break;
					default:
						if (callback != undefined && typeof callback === "function") {
							callback.call(undefined);
						}
						break;
				}
			},
			
			/**
			 * 
			 * @name         : checkLbdmsParams
			 * @description  : LBDMS 요청 전, 파라미터를 체크한다.
			 * @date         : 2017. 10. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 */
			checkLbdmsParams : function(api_id, options, callback) {
				switch (options.param.params.adm_cd.length) {
					case 5:
						if (options.param.params.low_search == 2) {
							messageConfirm.open(
									"알림", 
									"LBDMS 전송 데이터는 읍면동까지만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?",
									btns = [
										{
											title : "확인",
											fAgm : null,
											disable : false,
											func : function(opt) {
												if (callback != undefined && typeof callback === "function") {
													callback.call(undefined);
												}
											}
										},
											 
						    			{
											title : "취소",
											fAgm : null,
											disable : false,
											func : function(opt) {}
						    			}   
									]
							);
						}else {
							if (callback != undefined && typeof callback === "function") {
								callback.call(undefined);
							}
						}
						break;
					default:
						if (callback != undefined && typeof callback === "function") {
							callback.call(undefined);
						}
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doCensusStatsData
			 * @description  : 센서스 통계를 요청한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doCensusStatsData : function(api_id, options, map, callback) {
				var params = this.checkCensusParams(api_id, options);
				$policyWriteMapApi.request.reqCensusStatsData(
						params.api_id, 					//api 아이디
						deepCopy(params.options.param), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyWriteMapApi.ui.setBoundaryData(parameter, res, options, map, callback);		

				});
			},
			
			/**
			 * 
			 * @name         : doUserStatsData
			 * @description  : 사용자데이터를 조회한다.
			 * @date         : 2017. 08. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doUserStatsData : function(api_id, options, map) {
				$policyWriteMapApi.request.reqUserStatsData(
						api_id, 					//api 아이디
						deepCopy(options.param), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyWriteMapApi.ui.doUserBoundData(res, options, map);

				});
			},
			
			/**
			 * 
			 * @name         : doKosisStatsData
			 * @description  : KOSIS 데이터를 조회한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doKosisStatsData : function(api_id, options, map) {
				$policyWriteMapApi.request.reqKosisStatsData(
						api_id, 					//api 아이디
						deepCopy(options.param), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, parameter, options, map) { //callback
								
					//경계정보 호출 및 draw
					$policyWriteMapApi.ui.doKosisBoundData(parameter, res, options, map);
				});
			},
			
			/**
			 * 
			 * @name         : doLocalStatsData
			 * @description  : 협업형 데이터를 조회한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doLocalStatsData : function(api_id, options, map) {
				$policyWriteMapApi.request.reqLocalStatsData(
						api_id, 					//api 아이디
						deepCopy(options.param),    //호출 파라미터
						options, 					//옵션정보
						map, 						//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyWriteMapApi.ui.doLocalBoundData(parameter, res, options, map);

				});
			},
			
			/**
			 * 
			 * @name         : doLbdmsStatsData
			 * @description  : LBDMS 데이터를 조회한다.
			 * @date         : 2017. 10. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doLbdmsStatsData : function(api_id, options, map) {
				$policyWriteMapApi.request.reqLbdmsStatsData(
						api_id, 					//api 아이디
						deepCopy(options.param),    //호출 파라미터
						options, 					//옵션정보
						map, 						//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyWriteMapApi.ui.doLbdmsBoundData(parameter, res, options, map);

				});
			},
			
			/**
			 * 
			 * @name         : doCensusPoiData
			 * @description  : 센서스 POI 데이터를 조회한다.
			 * @date         : 2017. 09. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map    : 맵정보
			 */
			doCensusPoiData : function(options, idx, map) {
				$policyWriteMapApi.request.reqCensusPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						idx,
						map, 							//맵정보
						function(res, options, map) { //callback
								
				});
			},
			
			/**
			 * 
			 * @name         : doLocalPoiData
			 * @description  : 협업형 POI 데이터를 조회한다.
			 * @date         : 2017. 09. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map    : 맵정보
			 */
			doLocalPoiData : function(options, idx, map) {
				$policyWriteMapApi.request.reqLocalPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						idx,
						map, 							//맵정보
						function(res, options, map) { //callback
								
				});
			},
			
			/**
			 * 
			 * @name         : doLbdmsPoiData
			 * @description  : LBDMS POI 데이터를 조회한다.
			 * @date         : 2017. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map    : 맵정보
			 */
			doLbdmsPoiData : function(options, idx, map) {
				$policyWriteMapApi.request.reqLbdmsPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						idx,
						map, 							//맵정보
						function(res, options, map) { //callback
								
				});
			},
			
			/**
			 * 
			 * @name         : doUserPoiData
			 * @description  : 사용자 POI 데이터를 조회한다.
			 * @date         : 2017. 09. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map    : 맵정보
			 */
			doUserPoiData : function(options, idx, map) {
				$policyWriteMapApi.request.reqUserPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						idx,
						map, 							//맵정보
						function(res, options, map) { //callback
								
				});
			},
			
			/**
			 * 
			 * @name         : doUserBoundData
			 * @description  : 사용자데이터를 경계정보를 조회한다.
			 * @date         : 2017. 08. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doUserBoundData : function(res, options, map) {
				for (var i=0; i<options.admList.length; i++) {
					var param = {
							params : {
								adm_cd : options.admList[i],
								low_search : options.param.etc.low_search,
								bnd_year :options.param.etc.bnd_year
							},
							filter : options.param.filter,
							unit : options.param.unit,
							title : options.param.title
					};
					$policyWriteMapApi.ui.setBoundaryData(param, res, options, map);
				}	
			},
			
			/**
			 * 
			 * @name         : doKosisBoundData
			 * @description  : KOSIS 데이터를 경계정보를 조회한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param res    : 결과정보
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doKosisBoundData : function(parameter, res, options, map) {
				var param = {
						params : {
							adm_cd : parameter.params.gis_se,
							low_search : parameter.etc.low_search,
							bnd_year : map.bnd_year //kosis는 최신경계
						},
						filter : options.param.filter,
						unit : options.param.unit,
						title : options.param.title
				};
				$policyWriteMapApi.ui.setBoundaryData(param, res, options, map);
			},
			
			/**
			 * 
			 * @name         : doLocalBoundData
			 * @description  : 협업형 데이터를 경계정보를 조회한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param res    : 결과정보
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doLocalBoundData : function(parameter, res, options, map) {
				var param = {
						params : {
							adm_cd : parameter.params.adm_cd,
							low_search : parameter.params.low_search,
							bnd_year : parameter.params.bnd_year 
						},
						filter : options.param.filter,
						unit : options.param.unit,
						title : options.param.title
				};
				$policyWriteMapApi.ui.setBoundaryData(param, res, options, map);
			},
			
			/**
			 * 
			 * @name         : doLbdmsBoundData
			 * @description  : LBDMS 데이터를 경계정보를 조회한다.
			 * @date         : 2017. 10. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param res    : 결과정보
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doLbdmsBoundData : function(parameter, res, options, map) {
				var param = {
						params : {
							adm_cd : parameter.params.adm_cd,
							low_search : parameter.params.low_search,
							bnd_year : parameter.params.bnd_year 
						},
						filter : options.param.filter,
						unit : options.param.unit,
						title : options.param.title
				};
				$policyWriteMapApi.ui.setBoundaryData(param, res, options, map);
			},
			
			/**
			 * 
			 * @name         : setStatsData
			 * @description  : 통계결과정보를 가공한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setStatsData : function (res, parameter, options, map, callback) {
				var result = res.result;
				var params = parameter.params;
				res["pAdmCd"] = params.adm_cd;
				
				//N/A일 경우, 데이터에서 제외
				var tmpResult = [];
				for (var i=0; i<result.length; i++) {
					if (!(result[i][parameter.filter] == "N/A"   ||	
					     (parameter.filter == "ppltn_dnsty"      ||	//인구밀도		
					      parameter.filter == "aged_child_idx"   ||	//노령화지수
					      parameter.filter == "oldage_suprt_per" ||	//노년부양비
					      parameter.filter == "juv_suprt_per"    ||	//유년부양비
					      parameter.filter == "avg_age" 	  ||		//평균나이
					      parameter.filter == "avg_fmember_cnt"        //평균가구원    
					     ) && result[i][parameter.filter] == "0") ) {
						tmpResult.push(result[i]);
					}
				}
				res["dataType"] = options.param.dataType;
				res.result = tmpResult;
				options.param["year"] = parameter.params.year;
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setUserData
			 * @description  : 사용자통계결과정보를 가공한다.
			 * @date         : 2017. 08. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setUserData : function(res, parameter, options, map, callback) {
				var result = res.result;
				for (var i=0; i<result.length; i++) {
					var mainData = result[i].mainData;
					var uploadData = result[i].uploadData;
					var metaData = result[i].metaData;
					var yearList = JSON.parse(mainData.GROUP_COL_LIST);
					var geoFiled = null;
					
					//지역별 수요변화일 경우
					switch(parseInt($policyWriteMap.ui.settingInfo.idxType)) {
						case 1: //수요변화형지표
							//메터데이터 가공
							//나의데이터 구조설계 오류로 인한 가공 필수
							//집계데이터의 경우, 메터데이터 칼럼을 한단계씩 밀어야 함 (POINT의 경우, 변경하지 않아도 됨)
							//예)A -> B, C -> D로 변경 
							geoFiled = String.fromCharCode(mainData.GIOFIELD.charCodeAt(0)+1).toUpperCase();
							var tYearList = {};
							for (var p in yearList) {
								var column = String.fromCharCode(p.charCodeAt(0)+1).toUpperCase();
								var value = yearList[p];
								tYearList[column] = value;
							}
							yearList = tYearList;
							
							//년도설정
							var tmpYearList = [];
							var lData = {};
							for (var p in yearList) {
								if (lData[yearList[p]] == null || lData[yearList[p]] == undefined) {
									lData[yearList[p]] = [];
								}
								tmpYearList.push(yearList[p]);
							}
							tmpYearList = tmpYearList.sort(function(a, b) {
								return parseInt(b) - parseInt(a);
							});
							
							var html = "";
							for (var i=0; i<tmpYearList.length; i++) {
								html += "<option value='"+tmpYearList[i]+"'>"+tmpYearList[i]+"년</option>";
							}
							$policyWriteMap.ui.setDemandYearList("userData", html, map.id);
							
							//년도별 데이터설정
							for (var year in lData) {
								var column = null;
								for (var p in yearList) {
									if (yearList[p] == year) {
										column = p.toUpperCase();
									}
								}
								var tmpData = {};
								for (var i=0; i<uploadData.length; i++) {
									var tmpUserData = JSON.parse(uploadData[i].USR_DATA);
									var admCd = tmpUserData[geoFiled].split("(")[1];
									admCd = admCd.split(")")[0];
									tmpData = {
											"adm_cd" : admCd,
											"data_cnt" : parseFloat(tmpUserData[column]),
											"year" : year
									};
									
									//툴팁명 저장
									for (var k=0; k<metaData.length; k++) {
										if (metaData[k].COL_ID == column) {
											tmpData["title"] = metaData[k].COL_NM;
											break;
										}
									}
									lData[year].push(tmpData);
								}
							}
							
							//가공된 정보 저장 
							$policyWriteMapApi.ui.userData[map.id] = {};
							$policyWriteMapApi.ui.userData[map.id] = lData;
							
							//default : max year 조회 
							var maxYear = tmpYearList[0];
							res.result = lData[maxYear];
							options.param["year"] = maxYear;
							break;
						case 2: //통계연산형지표
							//메터데이터 가공
							//나의데이터 구조설계 오류로 인한 가공 필수
							//집계데이터의 경우, 메터데이터 칼럼을 한단계씩 밀어야 함 (POINT의 경우, 변경하지 않아도 됨)
							//예)A -> B, C -> D로 변경 
							geoFiled = String.fromCharCode(mainData.GIOFIELD.charCodeAt(0)+1).toUpperCase();
							var column = null;
							var title = null;
							for (var i=0; i<metaData.length; i++) {
								if (metaData[i].CHECK_TYPE == "3") {
									column = metaData[i].COL_ID;
									title = metaData[i].COL_NM;
									break;
								}
							}
							
							var tmpResult = [];
							for (var i=0; i<uploadData.length; i++) {
								var tmpUserData = JSON.parse(uploadData[i].USR_DATA);
								var admCd = tmpUserData[geoFiled].split("(")[1];
								admCd = admCd.split(")")[0];
								tmpData = {
										adm_cd : admCd,
										data_cnt : parseFloat(tmpUserData[column]),
										title : title
								};
								tmpResult.push(tmpData);
							}
							res.result = tmpResult;
							break;
						case 3: //시설분석형지표
							break;
					}

					//id 설정 
					res.id ="API_MYDATA";
					res["dataType"] = options.param.dataType;
					
					if (callback != undefined && typeof callback === "function") {
						callback.call(undefined, res, parameter, options, map);
					}
				}
			},
			
			/**
			 * 
			 * @name         : setKosisData
			 * @description  : 사용자통계결과정보를 가공한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setKosisData : function(res, parameter, options, map, callback) {
				var result = res.result.kosisData;
				var params = parameter.params;
				res["pAdmCd"] = params.gis_se;
				res["dataType"] = options.param.dataType;
				
				var tmpResult = [];
				for (var i=0; i<result.length; i++) {
					if (i==0) {
						options.param["year"] = result[i].PRD_DE;
						
						//KOSIS는 단위정보가 있는게 있고, 없는게 있음
						//단위가 없을때는 빈스트링처리
						if (result[i].UNIT != undefined) {
							options.param.unit = result[i].UNIT;
						}else {
							options.param.unit = "";
						}
						parameter.unit = options.param.unit;
						
					}
					var adm_cd = result[i].CODE;
					var data = result[i].DATA;
					
					//KOSIS는 햬당지역의 데이터가 없을 경우, 무조건 전국시도단위의 통계를 리턴한다.
					//실제 요청한 행정동코드와 결과의 행정동코드가 맞지 않을 경우, 데이터를 버린다.
					if (adm_cd.indexOf(parameter.params.gis_se) == -1) {
						continue;
					}
					
					var tmpData = {
							adm_cd : adm_cd,
							adm_nm : result[i].NAME,
							DATA : data
					}
					tmpResult.push(tmpData);
				}
				res.result = tmpResult;
				res.id = "API_KOSIS";
				res["dataType"] = options.param.dataType;
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setLocalData
			 * @description  : 협업형통계결과정보를 가공한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setLocalData : function(res, parameter, options, map, callback) {
				var result = res.result;
				var params = parameter.params;
				res["pAdmCd"] = params.adm_cd;
				res["dataType"] = options.param.dataType;			
				res.id = "API_LOCAL";
				if (result.length > 0) {
					res["unit"] = result[0].unit;
					options.param.unit =  result[0].unit;
				}
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setLbdmsData
			 * @description  : LBDMS통계결과정보를 가공한다.
			 * @date         : 2017. 10. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setLbdmsData : function(res, parameter, options, map, callback) {
				var result = res.result;
				var params = parameter.params;
				res["pAdmCd"] = params.adm_cd;
				res["dataType"] = options.param.dataType;
				res.id = "API_LBDMS";
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setCensusPoiData
			 * @description  : 센서스 POI 결과정보를 가공한다.
			 * @date         : 2017. 09. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setCensusPoiData : function(res, parameter, options, idx, map, callback) {
				var result = res.result;
				var adm_cd = parameter.adm_cd;
				var markerType = "normal";
				
				var clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});
				
				var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(clusterLayer);
				map.gMap.addLayer(featureLayer);
					
				for (var i=0; i<result.length; i++) {
					result[i]["type"] = "census";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_0'+(idx+1)+'.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [7, 7],
						iconSize: [14, 14],
						infoWindowAnchor: [1, -16]
					});
					var marker = sop.marker([ result[i].coor_x, result[i].coor_y ], {
						icon : icon,
						opacity : 0.7
					});
					marker.info = result[i];
					
					if (result.length > $policyWriteMap.ui.defaultPoiCnt) {
						clusterLayer.addLayer(marker);
						markerType = "cluster";
					}else {
						featureLayer.addLayer(marker);
						markerType = "normal";
					}
					
					if (i==0) {
						map.mapMove([ result[i].coor_x, result[i].coor_y ], map.zoom);
					}
					
					var html = "";
					html += '<table class="policyPoiTooltip">';
					html += 	'<tr>';
					html += 		'<th>' + result[i].corp_nm + '</th>';
					html += 		'<td></td>';
					html += 	'</tr>';
					html += 	'<tr>';
					html +=			'<td>'+ result[i].naddr + '</td>';
					html += 	'</tr>';
					html += '</table>';
					marker.bindInfoWindow(html);
					
				}
				$policyWriteMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : result,
					idx : idx,
					title : options.title,
					settingInfo : {
						mode : "indivisual",
						shapeCd : "1",
						colorCd : idx+1,
						radiusColorCd : "1",
						radius : "0",
						radiusOpacity : "20",
						heatRadius : "20",
						heatOpacity : "20"
					},
					adm_cd : adm_cd,
					markerType : markerType
				};
				
				/*//마커영역을 계산하여 화면중앙에 둔다.
				var polygon = new sop.Polygon(sop.QuickHull.getConvexHull(points));
				var bounds = polygon.getBounds();
				if (bounds != null) {
					map.gMap.fitBounds(bounds, {
						animate : false
					});
				}*/
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setLocalPoiData
			 * @description  : 협업형 POI 결과정보를 가공한다.
			 * @date         : 2017. 09. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setLocalPoiData : function(res, parameter, options, idx, map, callback) {
				var result = res.result;
				var adm_cd = parameter.sido_cd;
				if (parameter.sgg_cd != undefined) {
					adm_cd += parameter.sgg_cd;
				}
				var markerType = "normal";
				
				var clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});
				
				var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(clusterLayer);
				map.gMap.addLayer(featureLayer);
				
				for (var i=0; i<result.length; i++) {
					result[i]["type"] = "local";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_0'+(idx+1)+'.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [7, 7],
						iconSize: [14, 14],
						infoWindowAnchor: [1, -16]
					});
					var marker = sop.marker([ result[i].coor_x, result[i].coor_y ], {
						icon : icon,
						opacity : 0.7
					});
					marker.info = result[i];
					
					if (result.length > $policyWriteMap.ui.defaultPoiCnt) {
						clusterLayer.addLayer(marker);
						markerType = "cluster";
					}else {
						featureLayer.addLayer(marker);
						markerType = "normal";
					}
					
					if (i==0) {
						map.mapMove([ result[i].coor_x, result[i].coor_y ], map.zoom);
					}
					
					var html = "";
					html += '<table class="policyPoiTooltip">';
					html += 	'<tr>';
					html += 		'<th>' + result[i].div_nm + '</th>';
					html += 		'<td></td>';
					html += 	'</tr>';
					html += '</table>';
					marker.bindInfoWindow(html);
				}
				$policyWriteMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : result,
					idx : idx,
					title : options.title,
					settingInfo : {
						mode : "indivisual",
						shapeCd : "1",
						colorCd : idx+1,
						radiusColorCd : "1",
						radius : "0",
						radiusOpacity : "20",
						heatRadius : "20",
						heatOpacity : "20"
					},
					adm_cd :adm_cd,
					markerType : markerType
				};
				
				//마커영역을 계산하여 화면중앙에 둔다.
				/*var polygon = new sop.Polygon(sop.QuickHull.getConvexHull(points));
				var bounds = polygon.getBounds();
				if (bounds != null) {
					map.gMap.fitBounds(bounds, {
						animate : false
					});
				}*/
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setLbdmsPoiData
			 * @description  : LBDMS POI 결과정보를 가공한다.
			 * @date         : 2017. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setLbdmsPoiData : function(res, parameter, options, idx, map, callback) {
				var result = res.result;
				var adm_cd = parameter.sido_cd;
				if (parameter.sgg_cd != undefined) {
					adm_cd += parameter.sgg_cd;
				}
				var markerType = "normal";
				
				var clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});
				
				var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(clusterLayer);
				map.gMap.addLayer(featureLayer);	
				
				for (var i=0; i<result.length; i++) {
					result[i]["type"] = "lbdms";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_0'+(idx+1)+'.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [7, 7],
						iconSize: [14, 14],
						infoWindowAnchor: [1, -16]
					});
					var marker = sop.marker([ result[i].coor_x, result[i].coor_y ], {
						icon : icon,
						opacity : 0.7
					});
					marker.info = result[i];
					
					if (result.length > $policyWriteMap.ui.defaultPoiCnt) {
						clusterLayer.addLayer(marker);
						markerType = "cluster";
					}else {
						featureLayer.addLayer(marker);
						markerType = "normal";
					}
					
					if (i==0) {
						map.mapMove([ result[i].coor_x, result[i].coor_y ], map.zoom);
					}
					
					var html = "";
					html += '<table class="policyPoiTooltip">';
					html += 	'<tr>';
					html += 		'<th>' + result[i].div_nm + '</th>';
					html += 		'<td></td>';
					html += 	'</tr>';
					html += '</table>';
					marker.bindInfoWindow(html);
				}
				$policyWriteMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : result,
					idx : idx,
					title : options.title,
					settingInfo : {
						mode : "indivisual",
						shapeCd : "1",
						colorCd : idx+1,
						radiusColorCd : "1",
						radius : "0",
						radiusOpacity : "20",
						heatRadius : "20",
						heatOpacity : "20"
					},
					adm_cd : adm_cd,
					markerType : markerType
				};
				
				//마커영역을 계산하여 화면중앙에 둔다.
				/*var polygon = new sop.Polygon(sop.QuickHull.getConvexHull(points));
				var bounds = polygon.getBounds();
				if (bounds != null) {
					map.gMap.fitBounds(bounds, {
						animate : false
					});
				}*/
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setUserPoiData
			 * @description  : 사용자데이터 POI 결과정보를 가공한다.
			 * @date         : 2017. 09. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 결과정보
			 * @param parameter: 파라미터 정보
			 * @param options: 옵션정보
			 * @param idx    : 요청순서
			 * @param map 	 : map정보
			 * @param callback : 콜백
			 */
			setUserPoiData : function(res, parameter, options, idx, map, callback) {
				var result = res.result[0];
				var metaData = result.metaData;
				var uploadData = result.uploadData;
				var adm_cd = parameter.adm_cd;
				var markerType = "normal";
				
				var clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});
				
				var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(clusterLayer);
				map.gMap.addLayer(featureLayer);	
				
				var column = null;
				var title = null;
				for (var i=0; i<metaData.length; i++) {
					if (metaData[i].CHECK_TYPE == "3") {
						column = metaData[i].COL_ID;
						break;
					}
				}
				
				//데이터 가공
				var tmpResult = [];
				for (var i=0; i<uploadData.length; i++) {
					var userData = JSON.parse(uploadData[i].USR_DATA);
					var title = userData[column];
					var adm_cd = uploadData[i].TOT_REG_CD;
					
					if (adm_cd.indexOf(parameter.adm_cd) != -1) {
						tmpResult.push({
							title : title,
							coor_x : uploadData[i].GEO_X,
							coor_y : uploadData[i].GEO_Y,
							tot_reg_cd : uploadData[i].TOT_REG_CD
						});
					}
				}
				
				//데이터가 없을 경우
				if (tmpResult.length == 0) {
					return;
				}
				
				for (var i=0; i<tmpResult.length; i++) {
					tmpResult[i]["type"] = "userData";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_0'+(idx+1)+'.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [7, 7],
						iconSize: [14, 14],
						infoWindowAnchor: [1, -16]
					});
					var marker = sop.marker([ tmpResult[i].coor_x, tmpResult[i].coor_y ], {
						icon : icon,
						opacity : 0.7
					});
					marker.info = tmpResult[i];
					
					if (result.length > $policyWriteMap.ui.defaultPoiCnt) {
						clusterLayer.addLayer(marker);
						markerType = "cluster";
					}else {
						featureLayer.addLayer(marker);
						markerType = "normal";
					}
					
					if (i==0) {
						map.mapMove([ tmpResult[i].coor_x, tmpResult[i].coor_y ], map.zoom);
					}
					
					var html = "";
					html += '<table class="policyPoiTooltip">';
					html += 	'<tr>';
					html += 		'<th>' + tmpResult[i].title + '</th>';
					html += 		'<td></td>';
					html += 	'</tr>';
					html += '</table>';
					marker.bindInfoWindow(html);
				}
				$policyWriteMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : tmpResult,
					idx : idx,
					title : options.title,
					settingInfo : {
						mode : "indivisual",
						shapeCd : "1",
						colorCd : idx+1,
						radiusColorCd : "1",
						radius : "0",
						radiusOpacity : "20",
						heatRadius : "20",
						heatOpacity : "20"
					},
					adm_cd : adm_cd,
					markerType : markerType
				};
				
				//마커영역을 계산하여 화면중앙에 둔다.
				/*var polygon = new sop.Polygon(sop.QuickHull.getConvexHull(points));
				var bounds = polygon.getBounds();
				if (bounds != null) {
					map.gMap.fitBounds(bounds, {
						animate : false
					});
				}*/
				
				if (callback != undefined && typeof callback === "function") {
					callback.call(undefined, res, parameter, options, map);
				}
			},
			
			/**
			 * 
			 * @name         : setBoundaryData
			 * @description  : 경계정보를 조회한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter: 파라미터 정보
			 * @param res    : 결과정보
			 * @param options: 옵션정보
			 * @param map 	 : map정보
			 */
			setBoundaryData : function(parameter, res, options, map, callback) {
				//경계호출
				$policyWriteMapApi.request.reqBoundaryData(parameter, res, options, map, function(geoData) {
					if (options.admList.length == map.multiLayerControl.multiData.length) {
						//경계 초기화
						$policyWriteMapApi.ui.clear(map);
						
						//통계정보 체크
						res = $policyWriteMapApi.ui.checkStatsData(res, geoData);
						
						//통계정보 sort
						res = $policyWriteMapApi.ui.sortData(res, parameter, map);
						
						//통게정보 set
						map.setStatsData("normal", res, parameter.filter, parameter.unit);
						
						//범례설정
						$policyWriteMapApi.ui.setLegend(res, parameter.filter, map);
						
						//폴리곤 draw
						$policyWriteMapApi.ui.drawPolygon(map);	
						
						//범례고정체크
						$policyWriteMapApi.ui.checkLegendFixed();
						
						//타이틀설정
						$policyWriteMap.ui.setTitle(options.param, map);
						
						if (callback != undefined && typeof callback === "function") {
							callback.call(undefined, map);
						}
					}
				});
			}
			
	};
	
	$policyWriteMapApi.request = {
			
			/**
			 * 
			 * @name         : reqCensusStatsData
			 * @description  : 센서스 통계를 조회한다.
			 * @date         : 2017. 08. 20. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param parameter : 파라미터 정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param callback : 콜백
			 */
			reqCensusStatsData : function(api_id, parameter, options, map, callback) {
				//OpenAPI예만 accessToken 정보 추가
				if ($policyWriteMapApi.url[api_id].indexOf("OpenAPI3") != -1) {
					parameter.params["accessToken"] = accessToken;
				} 
				
				$.ajax({
					url : $policyWriteMapApi.url[api_id],
					type : parameter.method == undefined ? "GET" : parameter.method,
					data : parameter.params,
					async : true,
					dataType : "json",
					beforeSend: function() {
						//$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch (parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setStatsData(res, parameter, options, map, callback);
								break;
							case -100:
								res["result"] = [];
								$policyWriteMapApi.ui.setStatsData(res, parameter, options, map, callback);
								break;
							case -401:
								accessTokenInfo(function() {
									$policyWriteMapApi.request.reqCensusStatsData(api_id, parameter, options, map, callback);
				            	});
								break;
							default:
								res["result"] = [];
								$policyWriteMapApi.ui.setStatsData(res, parameter, options, map, callback);
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});
			},
			
			/**
			 * 
			 * @name         : reqCensusStatsData
			 * @description  : 센서스 통계를 조회한다.
			 * @date         : 2017. 08. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param callback : 콜백
			 */
			reqUserStatsData : function(api_id, parameter, options, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url[api_id],
					type : "POST",
					data : parameter.params,
					async : true,
					dataType : "json",
					beforeSend: function() {
						//$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setUserData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqKosisStatsData
			 * @description  : KOSIS 통계를 조회한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param callback : 콜백
			 */
			reqKosisStatsData : function(api_id, parameter, options, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url[api_id],
					type : "GET",
					data : parameter.params,
					async : false,
					dataType : "json",
					beforeSend: function() {
						//$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setKosisData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqLocalStatsData
			 * @description  : 협업형 통계를 조회한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param callback : 콜백
			 */
			reqLocalStatsData : function(api_id, parameter, options, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url[api_id],
					type : "POST",
					data : parameter.params,
					async : true,
					dataType : "json",
					beforeSend: function() {
						//$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setLocalData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqLbdmsStatsData
			 * @description  : LBDMS 통계를 조회한다.
			 * @date         : 2017. 10. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param callback : 콜백
			 */
			reqLbdmsStatsData : function(api_id, parameter, options, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url[api_id],
					type : "POST",
					data : parameter.params,
					async : true,
					dataType : "json",
					beforeSend: function() {
						//$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setLbdmsData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqCensusPoiData
			 * @description  : 센서스 POI를 조회한다.
			 * @date         : 2017. 09. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param idx : 요청순서
			 * @param callback : 콜백
			 */
			reqCensusPoiData : function(parameter, options, idx, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url["censusPoi"],
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setCensusPoiData(res, parameter, options, idx, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqLocalPoiData
			 * @description  : 협업형 POI를 조회한다.
			 * @date         : 2017. 09. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param idx : 요청순서
			 * @param callback : 콜백
			 */
			reqLocalPoiData : function(parameter, options, idx, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url["localPoi"],
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setLocalPoiData(res, parameter, options, idx, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqLbdmsPoiData
			 * @description  : LBDMS POI를 조회한다.
			 * @date         : 2017. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param idx : 요청순서
			 * @param callback : 콜백
			 */
			reqLbdmsPoiData : function(parameter, options, idx, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url["lbdmsPoi"],
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setLbdmsPoiData(res, parameter, options, idx, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqUserPoiData
			 * @description  : 사용자 POI를 조회한다.
			 * @date         : 2017. 09. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param idx : 요청순서
			 * @param callback : 콜백
			 */
			reqUserPoiData : function(parameter, options, idx, map, callback) {
				$.ajax({
					url : $policyWriteMapApi.url["userPoi"],
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyWriteMapApi.ui.setUserPoiData(res, parameter, options, idx, map, callback);
								break;
							default:
								break;
						}
						$policyWriteMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyWriteMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqBoundaryData
			 * @description  : 경계정보를 조회한다.
			 * @date         : 2017. 08. 20. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options: 옵션정보
			 * @param data : 데이터정보
			 * @param map : 맵정보
			 * @param callback : 콜백정보
			 */
			reqBoundaryData : function(parameter, data, options, map, callback) {
				var adm_cd = parameter.params.adm_cd;
				var low_search = parameter.params.low_search;
				var bnd_year = parameter.params.bnd_year;
				data ["option"] = options.param;
				
				switch (adm_cd.length) {
					case 2:
						map.multiLayerControl.openApiBoundaryHadmarea(adm_cd, bnd_year, low_search, data, "0", callback);
						break;
					case 5:
						map.multiLayerControl.openApiBoundaryHadmarea(adm_cd, bnd_year, low_search, data, "0", callback);
						break;
					case 7:
						map.multiLayerControl.openApiBoundaryStatsarea(adm_cd, bnd_year, data, callback);
						break;
				}
	
			},
			
			
			/**
			 * 
			 * @name         : openApiInterstryCode
			 * @description  : OpenAPI 산업체분류 정보를 조회한다.
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param depth : depth정보
			 * @param class_deg : 차수
			 * @param class_cd : 클래스코드
			 */
			openApiInterstryCode : function(depth, class_deg, class_cd) {
				var parameters = {
						"accessToken" : accessToken,
						"class_deg" : class_deg
				};
				
				if (class_cd != null) {
					parameters["class_code"] = class_cd;
				}
				
				$.ajax({
					url : $policyWriteMapApi.url.API_0303,
					type : "GET",
					data : parameters,
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = res.result;
						switch (parseInt(res.errCd)) {
							case 0:
								var tmpData = [];
								for(var i=0; i < result.length; i++) {
									var tmpObj = {};
									tmpObj.id = result[i].class_code + "_" + depth;
									tmpObj.cd = result[i].class_code;
	 								tmpObj.text = result[i].class_nm;
									tmpObj.depth = depth + 1;
									
									if (tmpObj.depth > 1) {
										tmpObj.infoIcon = true;
									} 
								
									if (depth < 3) {
										tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
										tmpObj.state = "closed";
									}else {
										tmpObj.childCount = 0;
									}
									tmpData.push(tmpObj);
									
								}

								if ($policyWriteMapLeftMenu.ui.companyTree == null) {
									if (depth == 0) {
										
										//산업체분류 최상위 '산업체 총괄' 추가
										//=============================================================================================//
										var rootData = [];
										var root = {
												id : "root",
												cd : "",
												text : "전산업",
												state : "closed",
												children : [{"id": "root_progress", "iconCls": "icon-tree-loading", "text": "Loading"}],
												isExpanded : true
										};
										rootData.push(root);
										//=============================================================================================//
										
										$policyWriteMapLeftMenu.ui.companyTree = $("#company_TreeBox").easytree({
											slidingTime:0,
								            building:$policyWriteMapLeftMenu.event.companyListTreeWidth,
								            stateChanged:$policyWriteMapLeftMenu.event.companyListTreeWidth,
								            toggled:$policyWriteMapLeftMenu.event.companyListTreeWidth,
											data : rootData,
											allowActivate: true,
								            disableIcons: true,
								            toggled : function(event, nodes, node) {
												if (node.childCount == null) {
													if (node.children.length > 0 ) {
														if(node.children[0].id == node.id + "_progress") {
															if (node.isExpanded) {
																$policyWriteMapApi.request.openApiInterstryCode(
																		node.depth,
																		class_deg,
																		node.cd);
															}
														}
													}
												}
											},
											selected : function(node) {	
												$policyWriteMapLeftMenu.ui.curSelectedCompanyNode = node;
											},
											iconSelected : function(e, id) {
												var id = id.split("_")[1];
												id = id.substring(1, id.length);
												window.open(
														"https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=0"+ class_deg +"&strCategoryCode="+ id,
														"통계분류 홈페이지에 오신것을 환경합니다.",
														"width=420, height=400, menubar=no, status=no, toolbar=no, location=no"
												);
											}
										});
										$policyWriteMapLeftMenu.ui.companyTree.activateNode(tmpData[0].id);
										$policyWriteMapLeftMenu.ui.curSelectedCompanyNode = $policyWriteMapLeftMenu.ui.companyTree.getNode(tmpData[0].id);
										
										for (var i=0; i<tmpData.length; i++) {
											$policyWriteMapLeftMenu.ui.companyTree.addNode(tmpData[i], "root");
										}
										$policyWriteMapLeftMenu.ui.companyTree.removeNode("root_progress");
										$policyWriteMapLeftMenu.ui.companyTree.rebuildTree();
										$policyWriteMapLeftMenu.ui.companyTree.activateNode("root");
										$policyWriteMapLeftMenu.ui.curSelectedCompanyNode = $policyWriteMapLeftMenu.ui.companyTree.getNode("root");
									} 
								}else {
									for (var i=0; i<tmpData.length; i++) {
										$policyWriteMapLeftMenu.ui.companyTree.addNode(tmpData[i], class_cd + "_" +(depth-1));
									}
									$policyWriteMapLeftMenu.ui.companyTree.removeNode(class_cd + "_" + (depth-1) + "_progress");
									$policyWriteMapLeftMenu.ui.companyTree.rebuildTree();
									$policyWriteMapLeftMenu.ui.companyTree.activateNode(class_cd + "_" + (depth-1));
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$policyWriteMapApi.request.openApiInterstryCode(
											depth,
											class_deg,
											class_cd);
								});
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(res){
						messageAlert.open("알림", res.errMsg);
					}
				});
			}
	};

}(window, document));