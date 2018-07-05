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
	W.$policyStaticMapApi = W.$policyStaticMapApi || {};
	
	////////// 2017.09.06 [개발팀] 조회기능 추가 수정 START /////////////
	$policyStaticMapApi = {
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
//					if (this.loadCnt == this.closeCnt) {
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
//					}
					
				}
			}
	};
	////////// 2017.09.06 [개발팀] 조회기능 추가 수정 END /////////////
	
	$policyStaticMapApi.request = {
			
			API_0301_URL : "/OpenAPI3/stats/population.json",
			API_0302_URL : "/OpenAPI3/stats/innersearchpopulation.json",	//9월서비스 권차욱 api명 변경
			API_0303_URL : "/OpenAPI3/stats/industrycode.json",
			API_0304_URL : "/OpenAPI3/stats/company.json",
			API_0305_URL : "/OpenAPI3/stats/household.json",
			API_0306_URL : "/OpenAPI3/stats/house.json",
			API_0307_URL : "/OpenAPI3/stats/farmhousehold.json",
			API_0308_URL : "/OpenAPI3/stats/forestryhousehold.json",
			API_0309_URL : "/OpenAPI3/stats/fisheryhousehold.json",
			API_0310_URL : "/OpenAPI3/stats/householdmember.json",
			API_FUSION_URL : "/ServiceAPI/stats/fusionstats.json",
			API_USERAREA_URL : "/ServiceAPI/map/userAreaBoundInfo.geojson",
//			local_URL : "/ServiceAPI/policyWrite/getLocalGovernmentPolygonData.json",
			
			combineFailCnt : 0,
			
			//////// 2017.09.06 [개발팀] 조회 기능 수정 START ///////////
			
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
			reqCensusStatsData : function(parameter, options, map, callback) {
				var pathUrl = "";
				var apiMethod = "";

				//OpenAPI예만 accessToken 정보 추가
				if (options.param.call_url.indexOf("OpenAPI3") != -1) {
					parameter.params["accessToken"] = accessToken;
				} 
				
				//path 설정
				if ( options.param.data_type == "04" || options.param.data_type == "05") { // 열지도, POI조회 시
					pathUrl = contextPath;
					apiMethod = "POST";
				} else {
					switch(parseInt(options.param.data_div)){
						case 1: pathUrl = openApiPath;
										if (options.param.call_url.indexOf("ServiceAPI") != -1) pathUrl = contextPath;
										if (options.param.call_url.indexOf("fusionstats") != -1) {
											apiMethod = "POST";
										}else {
											apiMethod = "GET";
										}
										break;
						case 2: pathUrl = kosisApiPath;
										apiMethod = "POST";
										break;
						case 3: pathUrl = contextPath;
										apiMethod = "POST";
										break;
						case 4: pathUrl = contextPath;
										apiMethod = "POST";
										break;
					}
				}
				
				$.ajax({
					url : pathUrl+options.param.call_url,
					type : apiMethod,
					data : parameter.params,
					async : true,
					dataType : "json",
					beforeSend: function() {
						//$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						$policyStaticMap.ui.setDemandYearList(res.id, parameter.params, options.param.map_div, options.param.data_div, "", parameter);
						switch (parseInt(res.errCd)) {
							case 0:
								$policyStaticMapApi.ui.setStatsData(res, parameter, options, map, callback);
								break;
							case -100:
								res["result"] = [];
								$policyStaticMapApi.ui.setStatsData(res, parameter, options, map, callback);	
								break;
							case -401:
								accessTokenInfo(function() {
									$policyStaticMapApi.request.reqCensusStatsData(parameter, options, map, callback);
				            	});
								break;
							default:
								res["result"] = [];
								$policyStaticMapApi.ui.setStatsData(res, parameter, options, map, callback);	
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(data) {
						$policyStaticMapApi.loadingBar.close();
					}
				});
			},
			
			/**
			 * 
			 * @name         : reqUserStatsData
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
			reqUserStatsData : function(parameter, options, map, callback) {
				var pathUrl = "";
				//OpenAPI예만 accessToken 정보 추가
				if (options.param.call_url.indexOf("OpenAPI3") != -1) {
					parameter.params["accessToken"] = accessToken;
				} 

				//path 설정
				if ( options.param.data_type == "04" || options.param.data_type == "05") { // 열지도, POI조회 시
					pathUrl = contextPath;
				}else {
					switch(parseInt(options.param.data_div)){
						case 1: pathUrl = openApiPath;
										if (options.param.call_url.indexOf("ServiceAPI") != -1) pathUrl = contextPath;
										break;
						case 2: pathUrl = kosisApiPath;
										break;
						case 3: pathUrl = contextPath;
										break;
						case 4: pathUrl = contextPath;
										break;
					}
				}
				$.ajax({
					url : pathUrl+options.param.call_url,
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
								$policyStaticMapApi.ui.setUserData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(data) {
						$policyStaticMapApi.loadingBar.close();
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
			reqKosisStatsData : function(parameter, options, map, callback) {
				var pathUrl = "";
				var apiMethod  = "GET";
				
				//path 설정
				if ( options.param.data_type == "04" || options.param.data_type == "05") { // 열지도, POI조회 시
					pathUrl = contextPath;
					apiMethod = "POST";
				} else {
					switch(parseInt(options.param.data_div)){
						case 1: pathUrl = openApiPath;
										if (options.param.call_url.indexOf("ServiceAPI") != -1) pathUrl = contextPath;
										break;
						case 2: pathUrl = kosisApiPath;
										break;
						case 3: pathUrl = contextPath;
										break;
						case 4: pathUrl = contextPath;
										break;
					}
				}
				$.ajax({
					url : pathUrl+options.param.call_url,
					type : apiMethod,
					data : parameter.params,
					async : false,
					dataType : "json",
					beforeSend: function() {
						//$policyWriteMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyStaticMap.ui.setDemandYearList(res.id, parameter.params, options.param.map_div, options.param.data_div, "", parameter);
								
								$policyStaticMapApi.ui.setKosisData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(data) {
						$policyStaticMapApi.loadingBar.close();
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
			reqLocalStatsData : function(parameter, options, map, callback) {
				var pathUrl = "";
				//OpenAPI예만 accessToken 정보 추가
				if (options.param.call_url.indexOf("OpenAPI3") != -1) {
					parameter.params["accessToken"] = accessToken;
				} 

				//path 설정
				if ( options.param.data_type == "04" || options.param.data_type == "05") { // 열지도, POI조회 시
					pathUrl = contextPath;
				} else {
					switch(parseInt(options.param.data_div)){
						case 1: pathUrl = openApiPath;
										if (options.param.call_url.indexOf("ServiceAPI") != -1) pathUrl = contextPath;
										break;
						case 2: pathUrl = kosisApiPath;
										break;
						case 3: pathUrl = contextPath;
										break;
						case 4: pathUrl = contextPath;
										break;
					}
				}
				$.ajax({
					url : pathUrl+options.param.call_url,
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
								$policyStaticMap.ui.setDemandYearList(res.id, parameter.params, options.param.map_div, options.param.data_div, "", parameter);
								
								$policyStaticMapApi.ui.setLocalData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(data) {
						$policyStaticMapApi.loadingBar.close();
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqLbdmsStatsData
			 * @description  : LBDMS 통계를 조회한다.
			 * @date         : 2017. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param callback : 콜백
			 */
			reqLbdmsStatsData : function(parameter, options, map, callback) {
				var pathUrl = "";
				//OpenAPI예만 accessToken 정보 추가
				if (options.param.call_url.indexOf("OpenAPI3") != -1) {
					parameter.params["accessToken"] = accessToken;
				} 

				//path 설정
				if ( options.param.data_type == "04" || options.param.data_type == "05") { // 열지도, POI조회 시
					pathUrl = contextPath;
				} else {
					switch(parseInt(options.param.data_div)){
						case 1: pathUrl = openApiPath;
										if (options.param.call_url.indexOf("ServiceAPI") != -1) pathUrl = contextPath;
										break;
						case 2: pathUrl = kosisApiPath;
										break;
						case 3: pathUrl = contextPath;
										break;
						case 4: pathUrl = contextPath;
										break;
						case 5: pathUrl = contextPath;
										break;
					}
				}
				$.ajax({
					url : pathUrl+options.param.call_url,
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
								$policyStaticMapApi.ui.setLbdmsData(res, parameter, options, map, callback);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(data) {
						$policyStaticMapApi.loadingBar.close();
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
			reqCensusPoiData : function(parameter, options, map, callback) {
				$.ajax({
					url : contextPath+options.call_url,
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyStaticMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								//경계 초기화
								$policyStaticMapApi.ui.clear(map);
								$policyStaticMapApi.ui.setCensusPoiData(res, parameter, options, map, callback);
								$policyStaticMap.ui.doSetPoiSetting(parseInt(options.call_info_serial)-2, options.map_param);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyStaticMapApi.loadingBar.close();
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
			reqLocalPoiData : function(parameter, options, map, callback) {
				$.ajax({
					url : contextPath+options.call_url,
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyStaticMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyStaticMapApi.ui.clear(map);
								$policyStaticMapApi.ui.setLocalPoiData(res, parameter, options, map, callback);
								$policyStaticMap.ui.doSetPoiSetting(parseInt(options.call_info_serial)-2, options.map_param);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyStaticMapApi.loadingBar.close();
						messageAlert.open("알림", res.errMsg);
					}
				});	
			},
			
			/**
			 * 
			 * @name         : reqLbdmsPoiData
			 * @description  : LBDMS POI를 조회한다.
			 * @date         : 2017. 11. 01	. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param options : 옵션정보
			 * @param map : 맵정보
			 * @param idx : 요청순서
			 * @param callback : 콜백
			 */
			reqLbdmsPoiData : function(parameter, options, map, callback) {
				$.ajax({
					url : contextPath+options.call_url,
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyStaticMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyStaticMapApi.ui.clear(map);
								$policyStaticMapApi.ui.setLbdmsPoiData(res, parameter, options, map, callback);
								$policyStaticMap.ui.doSetPoiSetting(parseInt(options.call_info_serial)-2, options.map_param);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyStaticMapApi.loadingBar.close();
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
			reqUserPoiData : function(parameter, options, map, callback) {
				$.ajax({
					url : contextPath+options.call_url,
					type : "POST",
					data : parameter,
					async : true,
					dataType : "json",
					beforeSend: function() {
						$policyStaticMapApi.loadingBar.show(2);
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$policyStaticMapApi.ui.clear(map);
								$policyStaticMapApi.ui.setUserPoiData(res, parameter, options, map, callback);
								$policyStaticMap.ui.doSetPoiSetting(parseInt(options.call_info_serial)-2, options.map_param);
								break;
							default:
								break;
						}
						$policyStaticMapApi.loadingBar.close();
					},
					error : function(res) {
						$policyStaticMapApi.loadingBar.close();
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
						map.multiLayerControl.openApiBoundaryStatsarea(adm_cd, bnd_year, callback);
						break;
				}
	
	//////// 2017.09.06 [개발팀] 조회 기능 수정 END ///////////
			}
			
			
			
			
	};
	//////// 2017.09.06 [개발팀] 조회 기능 수정 START ///////////
	$policyStaticMapApi.ui = {
			userData : [],     //사용자데이터 저장
			
			
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
			checkKosisParams : function(options, evt_yn, callback) {

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
									func : function(opt) {
										if ( evt_yn == "Y" ) {
											var orgValue = $("#boundLevelTitle").val() == "1"?"2":"1";
											$("#boundLevelTitle").val(orgValue);
										}
									}
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
											func : function(opt) {
												if ( evt_yn == "Y" ) {
													var orgValue = $("#boundLevelTitle").val() == "1"?"2":"1";
													$("#boundLevelTitle").val(orgValue);
												}
											}
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
													func : function(opt) {
														if ( evt_yn == "Y" ) {
															var orgValue = $("#boundLevelTitle").val() == "1"?"2":"1";
															$("#boundLevelTitle").val(orgValue);
														}
													}
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
													func : function(opt) {
														if ( evt_yn == "Y" ) {
															var orgValue = $("#boundLevelTitle").val() == "1"?"2":"1";
															$("#boundLevelTitle").val(orgValue);
														}
													}
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
			checkLocalParams : function(options, callback) {
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
			 * @description  : LBDMS통계 요청 전, 파라미터를 체크한다.
			 * @date         : 2017. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 */
			checkLbdmsParams : function(options, callback) {
				switch (options.param.params.adm_cd.length) {
					case 5:
						if (options.param.params.low_search == 2) {
							messageConfirm.open(
									"알림", 
									"LBDMS 통계는 읍면동까지만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?",
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
			doCensusStatsData : function(options, map) {
				$policyStaticMapApi.request.reqCensusStatsData(
						deepCopy(options.param), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyStaticMapApi.ui.setBoundaryData(parameter, res, options, map, function(parameter, map) {
						if (parameter.mapType == "heat") {
							$policyStaticMap.ui.setLegendMode("heat", map);
							$policyStaticMap.ui.setOriginData(options, map);
						}else {
							$policyStaticMap.ui.setLegendMode("color", map);
						}
					});		

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
			doUserStatsData : function(options, map) {
				$policyStaticMapApi.request.reqUserStatsData(
						deepCopy(options.param), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyStaticMapApi.ui.doUserBoundData(res, options, map, function(paramter, map) {
						$policyStaticMap.ui.setLegendMode("color", map);
					});
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
			doKosisStatsData : function(options, map) {
				$policyStaticMapApi.request.reqKosisStatsData(
						deepCopy(options.param), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, parameter, options, map) { //callback
								
					//경계정보 호출 및 draw
					$policyStaticMapApi.ui.doKosisBoundData(parameter, res, options, map, function(parameter, map) {
						$policyStaticMap.ui.setLegendMode("color", map);
					});
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
			doLocalStatsData : function(options, map) {
				$policyStaticMapApi.request.reqLocalStatsData(
						deepCopy(options.param),    //호출 파라미터
						options, 					//옵션정보
						map, 						//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyStaticMapApi.ui.doLocalBoundData(parameter, res, options, map, function(parameter, map) {
						$policyStaticMap.ui.setLegendMode("color", map);
					});

				});
			},
			
			/**
			 * 
			 * @name         : doLbdmsStatsData
			 * @description  : LBDMS 데이터를 조회한다.
			 * @date         : 2017. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doLbdmsStatsData : function(options, map) {
				$policyStaticMapApi.request.reqLbdmsStatsData(
						deepCopy(options.param),    //호출 파라미터
						options, 					//옵션정보
						map, 						//맵정보
						function(res, parameter, options, map) { //callback
							
					//경계정보 호출 및 draw
					$policyStaticMapApi.ui.doLbdmsBoundData(parameter, res, options, map, function(parameter, map) {
						$policyStaticMap.ui.setLegendMode("color", map);
					});

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
			doCensusPoiData : function(options, map) {
				$policyStaticMapApi.request.reqCensusPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, options, map) { //callback
							$policyStaticMap.ui.checkOpenDataBoard();
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
			doLocalPoiData : function(options, map) {
				$policyStaticMapApi.request.reqLocalPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, options, map) { //callback
							$policyStaticMap.ui.checkOpenDataBoard();		
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
			doLbdmsPoiData : function(options, map) {
				$policyStaticMapApi.request.reqLbdmsPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, options, map) { //callback
							$policyStaticMap.ui.checkOpenDataBoard();		
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
			doUserPoiData : function(options, map) {
				$policyStaticMapApi.request.reqUserPoiData(
						deepCopy(options.params), //호출 파라미터
						options, 						//옵션정보
						map, 							//맵정보
						function(res, options, map) { //callback
							$policyStaticMap.ui.checkOpenDataBoard();		
				});
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
				$policyStaticMapApi.request.reqBoundaryData(parameter, res, options, map, function(geoData) {
					if (options.admList.length == map.multiLayerControl.multiData.length) {
						//경계 초기화
						$policyStaticMapApi.ui.clear(map);
						
						//통계정보 체크
						res = $policyStaticMapApi.ui.checkStatsData(res, geoData);
						
						//통계정보 sort
						res = $policyStaticMapApi.ui.sortData(res, parameter, map);
						
						//통게정보 set
						map.setStatsData("normal", res, parameter.filter, parameter.unit);
						
						//범례설정
						$policyStaticMapApi.ui.setLegend(res, parameter.filter, map);
						
						//폴리곤 draw
						$policyStaticMapApi.ui.drawPolygon(map);	
						
						//범례고정체크
						$policyStaticMapApi.ui.checkLegendFixed();
						
						//타이틀설정
						$policyStaticMap.ui.setTitle(options.param, map);
						
						//데이터보드 설정
						$policyStaticMap.ui.checkOpenDataBoard();
						
						if (callback != undefined && typeof callback === "function") {
							callback.call(undefined, parameter, map);
						}
					}
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
			doUserBoundData : function(res, options, map, callback) {
				for (var i=0; i<options.admList.length; i++) {
					var param = {
							params : {
								adm_cd : options.admList[i],
								low_search : options.param.etc.low_search,
								bnd_year : options.param.etc.bnd_year
							},
							filter : options.param.filter,
							unit : options.param.unit,
							title : options.param.title
					};
					$policyStaticMapApi.ui.setBoundaryData(param, res, options, map, callback);
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
			doKosisBoundData : function(parameter, res, options, map, callback) {
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
				$policyStaticMapApi.ui.setBoundaryData(param, res, options, map, callback);
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
			doLocalBoundData : function(parameter, res, options, map, callback) {
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
				$policyStaticMapApi.ui.setBoundaryData(param, res, options, map, callback);
			},
			
			/**
			 * 
			 * @name         : doLbdmsBoundData
			 * @description  : LBDMS 데이터를 경계정보를 조회한다.
			 * @date         : 2017. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param parameter : 파라미터정보
			 * @param res    : 결과정보
			 * @param options: 옵션정보
			 * @param map    : 맵정보
			 */
			doLbdmsBoundData : function(parameter, res, options, map, callback) {
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
				$policyStaticMapApi.ui.setBoundaryData(param, res, options, map, callback);
			},
			
			
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
				
				$policyStaticMapApi.loadingBar.loadCnt = 0;
				$policyStaticMapApi.loadingBar.closeCnt = 0;
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
				for (var i=0; i<$policyStaticMap.ui.poiLayerList.length; i++) {
					if ( $policyStaticMap.ui.poiLayerList[i] == undefined ) continue;
					
					//마커 초기화
					var layerGroup = $policyStaticMap.ui.poiLayerList[i].markerGroup;
					layerGroup.clearLayers();
					
					var clusterGroup = $policyStaticMap.ui.poiLayerList[i].clusterGroup;
					clusterGroup.clearLayers();
					
					//써클초기화
					var circleGroup = $policyStaticMap.ui.poiLayerList[i].circleGroup;
					if (circleGroup) {
						for (var k=0; k<circleGroup.length; k++) {
							circleGroup[k].remove();
						}
					}
					//열지도 초기화
					var heatGroup = $policyStaticMap.ui.poiLayerList[i].heatGroup;
					if (heatGroup) {
						heatGroup.setUTMKs([]);
					}
				}
				$policyStaticMap.ui.poiLayerList = [];
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
				    //2017.09.10 kcu 수정
					//나의데이터와 KOSIS는 비자치구 일때, 데이터를 여러번 호출할 필요없음
					if (res.id == "API_MYDATA" || res.id == "API_KOSIS") {
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
				
				//2017.09.10 kcu 수정
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
				if ($policyStaticMap.ui.settingInfo["idx_type"] == "1") {
					for (var i=0; i<$policyStaticMap.ui.mapList.length; i++) {
						var map = $policyStaticMap.ui.mapList[i];
						if (map.multiLayerControl.dataGeojson == null ||
							map.multiLayerControl.dataGeojson.length == 0) {
							continue;
						}
						map.legend.legendList = null;
						map.legend.legendCopy(0);
					}
				}
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
					switch(parseInt($policyStaticMap.ui.settingInfo["idx_type"])) {
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
							$policyStaticMap.ui.setDemandYearList(res.id, parameter.params, options.param.map_div, options.param.data_div, html, parameter);
							
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
							$policyStaticMapApi.ui.userData[map.id] = {};
							$policyStaticMapApi.ui.userData[map.id] = lData;
							
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
			 * @description  : LBDMS 통계결과정보를 가공한다.
			 * @date         : 2017. 11. 01. 
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
			setCensusPoiData : function(res, parameter, options, map, callback) {
				var result = res.result;
				var featureLayer = null;
				var clusterLayer = null;
				var adm_cd = parameter.adm_cd;
				
				clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});

				featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(featureLayer);
				map.gMap.addLayer(clusterLayer);
				
				/*var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				map.gMap.addLayer(featureLayer);
					
				for (var i=0; i<result.length; i++) {
					result[i]["type"] = "census";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_01.png',
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
					featureLayer.addLayer(marker);

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
					
				}*/
				var idx = parseInt(options.call_info_serial)-2;
				$policyStaticMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : result,
					idx : idx,
					title : options.title,
					type : "census",
					adm_cd : adm_cd
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
			setLocalPoiData : function(res, parameter, options, map, callback) {
				var result = res.result;
				var featureLayer = null;
				var clusterLayer = null;
				var adm_cd = parameter.sido_cd;
				if (parameter.sgg_cd != undefined) {
					adm_cd += parameter.sgg_cd;
				}
				
				clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});

				featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(featureLayer);
				map.gMap.addLayer(clusterLayer);
				
				/*var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				map.gMap.addLayer(featureLayer);
				
				for (var i=0; i<result.length; i++) {
					result[i]["type"] = "local";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_01.png',
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
					featureLayer.addLayer(marker);
					
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
				}*/
				
				var idx = parseInt(options.call_info_serial)-2;
				$policyStaticMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : result,
					idx : idx,
					title : options.title,
					type : "local",
					adm_cd : adm_cd
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
			setLbdmsPoiData : function(res, parameter, options, map, callback) {
				var result = res.result;
				var featureLayer = null;
				var clusterLayer = null;
				var adm_cd = parameter.sido_cd;
				if (parameter.sgg_cd != undefined) {
					adm_cd += parameter.sgg_cd;
				}
				
				clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});

				featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(featureLayer);
				map.gMap.addLayer(clusterLayer);
				
				/*var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				map.gMap.addLayer(featureLayer);
				
				for (var i=0; i<result.length; i++) {
					result[i]["type"] = "local";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_01.png',
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
					featureLayer.addLayer(marker);
					
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
				}*/
				
				var idx = parseInt(options.call_info_serial)-2;
				$policyStaticMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : result,
					idx : idx,
					title : options.title,
					type : "local",
					adm_cd : adm_cd
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
			setUserPoiData : function(res, parameter, options, map, callback) {
				var result = res.result[0];
				var metaData = result.metaData;
				var uploadData = result.uploadData;
				var featureLayer = null;
				var clusterLayer = null;
				var adm_cd = parameter.adm_cd;
				
				clusterLayer = sop.markerClusterGroup({
					chunkedLoading : true
				});

				featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				
				map.gMap.addLayer(featureLayer);
				map.gMap.addLayer(clusterLayer);
				
				/*var featureLayer = sop.featureGroup({
					chunkedLoading : true
				});
				map.gMap.addLayer(featureLayer);
				*/
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
				
				/*for (var i=0; i<tmpResult.length; i++) {
					tmpResult[i]["type"] = "userData";
					var icon = sop.icon({
						iconUrl: '/img/policyStatic/ico_circle_01.png',
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
					featureLayer.addLayer(marker);
					
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
				*/
				var idx = parseInt(options.call_info_serial)-2;
				$policyStaticMap.ui.poiLayerList[idx] = {
					clusterGroup : clusterLayer,
					markerGroup : featureLayer,
					circleGroup : null,
					heatGroup : null,
					data : tmpResult,
					idx : idx,
					title : options.title,
					type : "userData",
					adm_cd : adm_cd
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
			}
	};
	//////// 2017.09.06 [개발팀] 조회 기능 수정 END ///////////
	
}(window, document));