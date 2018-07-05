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
	W.$honamMap = W.$honamMap || {};

	var isDraggable = false;

	$(document).ready(
		function() {	
			$honamMap.ui.createMap("mapRgn_1", 0); // 맵 생성
			$honamMap.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
			var mapNavi1 = new mapNavigation.UI();
			//공유/통계히스토리 정보분석
//			mapNavi1.firstBoolean = true;
			mapNavi1.create("mapNavi_1", 1, $honamMap.ui);
	});
	
	$honamMap.ui = {
			searchbtnCnt : 0, // 버튼생성 카운트
			curSelectedStatsType : "society", // 현재 선택된 통계분류(인구, 가구, 사업체통계 등)
			curSelectedDetailStatsType : null, // 현재 선택된 통계상세분류(인구총괄, 인구세부조건검색 등)
			arParamList : [], // 생성된 조회버튼에 매칭된 파라미터 정보배열
			data : null,
			curAdmCode : null,
			combineList : [],
			searchBtnType : "normal",
			shareUrlInfo : [],
			shareUrlInfoList : [],
			share_type : "BMARK",
			mapList: [],
			curMapId : null,
			isInnerMapShow : false,
			curDropParams : [],
			buildPopup : null,
			panelGroup : [],
			companyTree : null,
			curSelectedCompanyNode : null,
			sKeyword : null,					//전체 검색어
			addressKeyword : null,		//검색어의 앞단어(주소)
			searchKeyword : null,			//검색어의 뒷단어(검색어)
			addressAdmCd : "00",			//검색어의 앞단어(주소) code
			x : "941047",					//X좌표
			y : "1685274",					//Y좌표
			sopCurrentPageIndex : 0,			//통계표 검색 SOP 현재 페이지
			kosisCurrentPageIndex : 0, 		//통계표 검색 KOSIS 현재 페이지
			searchSOPParam : [],				//통계표 검색 SOP 파라미터 정보
			searchKosisParam : [],				//통계표 검색 KOSIS 파라미터 정보
			markerGroup : [],
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 김성현
			 * @history 	 :
			 */
			createMap : function(id, seq) {
				if (this.mapList[seq] !== undefined) {
					this.mapList[seq].gMap.remove();
				}

				var map = new sMap.map();
				map.createMap($honamMap, id, {
					center : [ 941047, 1685274 ],
					zoom : 8, //9->8
					measureControl : false
				});
				map.id = seq;

				// 이벤트 추가
				map.addControlEvent("drop", {
					accept : ".dragItem"
				});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");	
	
				var mapInfo = new sMapInfo.mapInfo(map);
				map.mapInfo = mapInfo;
				
				mapInfo.initialize($honamMap.ui);
				mapInfo.createUserUploadFile();
				//mapInfo.createLegend(); 	  // 범례 추가
				
				var zoomControl = map.gMap.zoomSliderControl;
				zoomControl.setPosition("topleft");
				
				if (map.isMeasureControl) {
					//줌컨트롤 위치지정
					var measureControl = map.gMap.measureControl;
					measureControl.setPosition("topleft");
				}
				
				map.createInfoControl();
				map.createDrawControl("intr");
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				$(".draw-poi-out").hide();
				
				map.mapMove([ 941047, 1685274 ], map.zoom);
			},

			
			/**
			 * 
			 * @name         : addSearchBtn
			 * @description  : 조건검색버튼을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 석진혁
			 * @history 	 :
			 */
			addSearchBtn : function() {
				var show = $("#" + this.curSelectedDetailStatsType).is(":visible");
				var dataType = $("#" + this.curSelectedDetailStatsType).find($("input:checked"));
				var personArray = new Array();
				if (this.curSelectedDetailStatsType != null) {
					if (show) {
						if(dataType.length == 0) {
							messageAlert.open("알림","담당자를 선택해주세요.");
						} else {
							$(dataType).each(function() {
								personArray.push(this.value);
							});
							
							var type = "";
							var categories = "";
							
							if (this.curSelectedDetailStatsType == "A") {
								 var checkOffice = $("#office").find($("input:checked"));
								 var checkResearch = $("#rsc").find($("input:checked"));
								 
								 if (checkOffice.val()) {
										var tmpNames = [];
										checkOffice.map(function(idx) {
											var name = "";
											tmpNames.push(this.value);
										});

										if (tmpNames.length > 0) {
											type = tmpNames.join();
										}
								 }
								 
								 if (checkResearch.val()) {
										var tmpNames = [];
										checkResearch.map(function(idx) {
											var name = "";
											tmpNames.push(this.value);
										});

										if (tmpNames.length > 0) {
											categories = tmpNames.join();
										}
								 }
								 
							}else if (this.curSelectedDetailStatsType == "B") {
							 
								
							}else if (this.curSelectedDetailStatsType == "C") {
								
							}
							$honamMapApi.request.personInfoList(type, categories);
						}
					}
				}else {
					messageAlert.open("알림","조건을 선택해주세요.");
				}
			},
			
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정한다. 
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 * @param api_id : 선택된 통계정보의 API ID(element id)
			 */
			setParams : function(curSelectedStatsType, api_id) {
				var tmpArParams = new Array();
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				var filterParam = null;
				var unit = null;
				var filterName = null;

				if (curSelectedStatsType == "population") {
					
					// 인구총괄
					if (api_id == "API_0301") {
						var total = $("#" + curSelectedStatsType + "Total").find($("input:checked"));
						//tmpArParamName.push("인구총괄");

						if (total.val()) {
							var tmpNames = [];
							total.map(function(idx) {
								filterParam = this.value;
								tmpNames.push($.trim($("#" + this.value).text()));
								
								//단위설정
								if (this.value == "tot_ppltn" || 
									this.value == "tot_ppltn_male" || 
									this.value == "tot_ppltn_fem") {
									unit = "명";
								}
								else if (this.value == "avg_age" ||
										 this.value == "avg_age_male" ||
										 this.value == "avg_age_fem") {
									unit = "세";
								}
								else if (this.value == "ppltn_dnsty") {
									unit = "명/㎢";
								}
								else if (this.value == "aged_child_idx" || 
										 this.value == "oldage_suprt_per" ||
										 this.value == "juv_suprt_per" ||
										 this.value == "tot_suprt_per") {
									unit = "%"; //%->""
								}
								
							});

							if (tmpNames.length > 0) {
								tmpArParamName.push(tmpNames.join());
							}
						}

						tmpArParams.push({
							key : "year",
							value : "2010"
						});
						tmpArParams.push({
							key : "low_search",
							value : "1"
						});

					}
					// 인구통계세부조건검색
					else if (api_id == "API_0302") {
						filterParam = "population";
						unit = "명";
						//tmpArParamName.push("인구");

						var gender = $("#" + curSelectedStatsType + "Gender").find($("input:checked"));
						var ageFrom = $("#" + curSelectedStatsType + "AgeFrom");
						var ageTo = $("#" + curSelectedStatsType + "AgeTo");
						var eduLevel = $("#" + curSelectedStatsType + "EduLevel");
						var eduFinish = $("#" + curSelectedStatsType + "EduFinish");
						var mrgState = $("#" + curSelectedStatsType + "MrgState").find($("input:checked"))

						// 연령별인구
						var isCheck = $("#populationAgeIgnore").find($("input")).is(":checked");
						if (isCheck) {
							if (ageFrom.val().length > 0 && ageTo.val().length > 0) {
								var tmpAgeTo = ageTo.val();
								var tmpAgeFrom = ageFrom.val();
								var tmpAgeToText = ageTo.val() + "세";

								if (parseInt(ageFrom.val()) >= 100) {
									tmpAgeFrom = "100";
								}
								if (parseInt(ageTo.val()) >= 101) {
									tmpAgeTo = "150";
									tmpAgeToText = ageTo.val() + "세 이상";
									tmpArParamName.push(tmpAgeFrom + "세 이상");
								}else {
									tmpArParamName.push(tmpAgeFrom + "세~"
											+ tmpAgeToText);
								}
								
								tmpArParams.push({
									key : "age_from",
									value : tmpAgeFrom
								});
								tmpArParams.push({
									key : "age_to",
									value : tmpAgeTo
								});
								
							}
						}
						
						var isCheck = $("#populationEduLevelIgnore").find($("input")).is(":checked");
						if (isCheck) {
							// 교육정도별인구
							if (eduLevel.val().length > 0) {
								var level = eduLevel.val();
								var name = $("#" + curSelectedStatsType + "EduLevel option:selected").text();
								/*if (eduFinish.val().length > 0) {
									level += eduFinish.val();
									name += ",";
									name += $("#" + curSelectedStatsType + "EduFinish option:selected").text();
								}*/
								tmpArParams.push({
									key : "edu_level",
									value : level
								});
								tmpArParamName.push(name);
							}
						}

						// 혼인상태별인구
						var tmpNames = [];
						var str = mrgState.map(function(idx) {
							tmpNames.push($.trim($("#" + this.name).text()));
							return this.value;
						}).get().join(",");

						if (str.length > 0) {
							tmpArParams.push({
								key : "mrg_state",
								value : str
							});
							tmpArParamName.push(tmpNames.join());
						}
						
						var gValue = "0";
						if (gender.length == 2) {
							gValue = "0";
							tmpArParamName.push("남여인구");
						}else {
							gValue = gender.val();
							tmpArParamName.push($.trim($("#gender_" + gender.val()).text()));
						}

						tmpArParams.push({
							key : "gender",
							value : gValue
						});
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "low_search",
							value : "1"
						});
						tmpArParams.push({
							key : "year",
							value : "2010"
						});
					}
				} else if (curSelectedStatsType == "household") {

					// 가구통계
					if (api_id == "API_0305") {
						filterParam = "household_cnt";
						unit = "가구";
						//tmpArParamName.push("가구");

						var householdType = $("#" + curSelectedStatsType + "Type").find($("input:checked"));
						var ocptnType = $("#" + curSelectedStatsType + "OcptnType").find($("input:checked"));

						// 세대구성별가구
						var tmpNames = [];
						var str = householdType.map(function(idx) { 
									tmpNames.push($.trim($("#" + this.name).text())); 
									return this.value;
						 		  }).get().join(",");
						 
						if (str.length > 0) { 
							tmpArParams.push({
								key :"household_type", 
								value : str
							});
							tmpArParamName.push(tmpNames.join()); 
						}
						
						// 점유형태별가구
						tmpNames = [];
						var str = ocptnType.map(function(idx) {
							tmpNames.push($.trim($("#" + this.name).text()));
							return this.value;
						}).get().join(",");

						if (str.length > 0) {
							tmpArParams.push({
								key : "ocptn_type",
								value : str
							});
							tmpArParamName.push(tmpNames.join());
						}
						
						//아무 조건도 선택 안했을 경우
						if(tmpArParamName.length == 0) {
							tmpArParamName.push("총가구");
							tmpArNoneParams.push({"noneParam" : true});
						}
						
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "low_search",
							value : "1"
						});
						tmpArParams.push({
							key : "year",
							value : "2010"
						});

					}

				} else if (curSelectedStatsType == "house") {

					// 주택통계
					if (api_id == "API_0306") {
						filterParam = "house_cnt";
						unit = "호";
						//tmpArParamName.push("주택");
					}
					var houseType = $("#" + curSelectedStatsType + "Type").find($("input:checked"));
					var houseConstYear = $("#" + curSelectedStatsType + "ConstYear");
					var houseBdspaceFrom = $("#" + curSelectedStatsType + "BdspaceFrom");
					var houseBdspaceTo = $("#" + curSelectedStatsType + "BdspaceTo");
					
					// 주택유형
					var tmpNames = [];
					var str = houseType.map(function(idx) {
						tmpNames.push($.trim($("#" + this.name).text()));
						return this.value;
					}).get().join(",");
					

					if (str.length > 0) {						
						tmpArParams.push({
							key : "house_type",
							value : str
						});
						tmpArParamName.push(tmpNames.join());
					}
					
					var isCheck = $("#houseConstYearIgnore").find($("input")).is(":checked");
					if (isCheck) {
						// 건축년도
						if ( houseConstYear.val().length > 0) {
							tmpArParams.push({
								key : "const_year",
								value : houseConstYear.val()
							});
							tmpArParamName.push($("#" + curSelectedStatsType + "ConstYear option:selected").text() + " 건축");
						}
					}
					
					// 건축범위
					var isCheck = $("#houseBdspaceIgnore").find($("input")).is(":checked");
					if (isCheck) {
						if (houseBdspaceFrom.val().length > 0
								&& houseBdspaceTo.val().length > 0) {
							
							var tmpHouseBdspaceTo = houseBdspaceTo.val();
							var tmpHouseBdspaceFrom = houseBdspaceFrom.val();
							var tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎥";
							
							if (parseInt(houseBdspaceFrom.val()) >= 300) {
								tmpHouseBdspaceFrom = "300"
							}
							if (parseInt(houseBdspaceTo.val()) >= 301) {
								tmpHouseBdspaceTo = "9999";
								tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎥ 이상";
								tmpArParamName.push(tmpHouseBdspaceFrom + "㎥ 이상");
							}else {
								tmpArParamName.push(tmpHouseBdspaceFrom + "㎥~"
										+ tmpHouseBdspaceToText);
							}
							
							tmpArParams.push({
								key : "bdspace_from",
								value : tmpHouseBdspaceFrom
							});
							tmpArParams.push({
								key : "bdspace_to",
								value : tmpHouseBdspaceTo
							});

						}
					}
					
					//아무 조건도 선택 안했을 경우
					if(tmpArParamName.length == 0 || str.length == 0) {
						tmpArParamName.push("총주택");
						tmpArNoneParams.push({"noneParam" : true});
					}
					
					tmpArParams.push({
						key : "area_type",
						value : "0"
					});
					tmpArParams.push({
						key : "low_search",
						value : "1"
					});
					tmpArParams.push({
						key : "year",
						value : "2010"
					});

				} else if (curSelectedStatsType == "3f") {

					// 가구원
					if (api_id == "API_0310") {
						filterParam = "population";
						unit = "명";
						//tmpArParamName.push("가구원");

						var dataType = $("#" + curSelectedStatsType + "DataType").find($("input:checked"));
						var gender = $("#" + curSelectedStatsType + "Gender").find($("input:checked"));
						var ageFrom = $("#" + curSelectedStatsType + "AgeFrom");
						var ageTo = $("#" + curSelectedStatsType + "AgeTo");
						
						// 가구원유형
						if (dataType.val()) {
							var tmpNames = [];
							dataType.map(function(idx) {
								tmpNames.push($.trim($("#" + this.name + "_" + this.value).text()));
							});

							if (tmpNames.length > 0) {
								tmpArParamName.push(tmpNames.join());
							}
						}

						// 가구별연령별 인구
						var isCheck = $("#3fAgeIgnore").find($("input")).is(":checked");
						if (isCheck) {
							if (ageFrom.val().length > 0 && ageTo.val().length > 0) {
								var tmpAgeTo = ageTo.val();
								var tmpAgeFrom = ageFrom.val();
								var tmpAgeToText = ageTo.val() + "세";

								if (parseInt(ageFrom.val()) >= 100) {
									tmpAgeFrom = "100";
								}
								if (parseInt(ageTo.val()) >= 101) {
									tmpAgeTo = "150";
									tmpAgeToText = ageTo.val() + "세 이상";
									tmpArParamName.push(tmpAgeFrom + "세 이상");
								}else {
									tmpArParamName.push(tmpAgeFrom + "세~"
											+ tmpAgeToText);
								}
								
								tmpArParams.push({
									key : "age_from",
									value : tmpAgeFrom
								});
								tmpArParams.push({
									key : "age_to",
									value : tmpAgeTo
								});
								
							}
						}
						
						// 가구원성별
						var gValue = 0;
						if (gender.length == 2) {
							gValue = 0;
							tmpArParamName.push("남여인구");
						}else {
							gValue = gender.val();
							tmpArParamName.push($.trim($("#gender_" + gender.val()).text()));
						}
						
						tmpArParams.push({
							key : "gender",
							value : gValue
						});
						tmpArParams.push({
							key : "data_type",
							value : dataType.val()
						});
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "low_search",
							value : "1"
						});
						tmpArParams.push({
							key : "year",
							value : "2010"
						});
						
					}
					
					//농가통계
					else if (api_id == "API_0307") {
						unit = "가구";
						var conditionType = $("#" + curSelectedStatsType + "ConditionType").find($("input:checked"));
						var ogaType = $("#" + curSelectedStatsType + "OgaType").find($("input:checked"));

						//조건선택
						if (conditionType.val()) {
							var tmpNames = [];
							conditionType.map(function(idx) {
								filterParam = this.value;
								if (this.value == "farm_cnt") {
									api_id = "API_0307";
									tmpNames.push($.trim($("#" + this.value).text()));
								}else if (this.value == "forestry_cnt") {
									api_id = "API_0308";
									tmpNames.push($.trim($("#" + this.value).text()));
								}else if (this.value == "fishery_cnt") {
									api_id = "API_0309";
								}
								
							});

							if (tmpNames.length > 0) {
								tmpArParamName.push(tmpNames.join());
							}
						}
						
						// 어가유형
						if ($("#" + curSelectedStatsType + "OgaType").parent().is(":visible")) {
							if (ogaType.val().length > 0
									&& ogaType.val().length > 0) {
								
								tmpArParams.push({
									key : "oga_div",
									value : ogaType.val()
								});
								
								switch (parseInt(ogaType.val())) {
									case 0:
										tmpArParamName.push("어가가구");
										break;
										
									case 1:
										tmpArParamName.push($.trim($("#oga_div_" + ogaType.val()).text()) + "가구");
										break;
										
									case 2:
										tmpArParamName.push($.trim($("#oga_div_" + ogaType.val()).text()) + "가구");
										break;
								}	
							}
						}
						
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "low_search",
							value : "1"
						});
						tmpArParams.push({
							key : "year",
							value : "2005"
						});
					}

				} else if (curSelectedStatsType == "company") {
				
					// 사업체통계 - 테마검색
					if (api_id == "API_0304-a") {
						//tmpArParamName.push("사업체");
						var companyDataType = $("#" + curSelectedStatsType + "DataType").find($("input:checked"));
						var companyThemaCode = $("#" + curSelectedStatsType + "ThemeCode");
						var companyDetailThemaCode = $("#" + curSelectedStatsType + "ThemeDetailCode");
						var companyThemeCodeIgnore = $("#" + curSelectedStatsType + "ThemeCodeIgnore").find($("input:checked"));
						
						var isCheck = $("#companyThemeCodeIgnore").find($("input")).is(":checked");
						if (isCheck) {
							//테마유형 검색
							if (companyThemaCode.val().length > 0) {
								tmpArParams.push({
									key : "theme_cd",
									value : companyThemaCode.val()
								});
								tmpArParamName
								.push($("#" + curSelectedStatsType + "ThemeCode option:selected").text());
								
								if (companyDetailThemaCode.val().length > 0) {
									for (var i = 0; i < tmpArParams.length; i++) {
										if (tmpArParams[i].key == "theme_cd") {
											tmpArParams[i].value = companyThemaCode.val()+companyDetailThemaCode.val()
										}
									}
									tmpArParamName
									.push($("#" + curSelectedStatsType + "ThemeDetailCode option:selected").text());
								}
							}
							
						}
						
						// 조회항목 구분
						if (companyDataType.val()) {
							var tmpNames = [];
							companyDataType.map(function(idx) {
								filterParam = this.value;
								tmpNames.push($.trim($("#" + this.value).text()));
								
								//단위설정
								if (this.value == "corp_cnt") {
									unit = "개";
								}else {
									unit = "명";
								}
								
							});

							if (tmpNames.length > 0) {
								tmpArParamName.push(tmpNames.join());
							}
						}
						

						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "low_search",
							value : "1"
						});
						tmpArParams.push({
							key : "year",
							value : "2013"
						});
						
					}
					else if (api_id == "API_0304-b") {
						//tmpArParamName.push("사업체");
						var companyDataType = $("#" + curSelectedStatsType + "DataType2").find($("input:checked"));
						var companyClassType = $("#" + curSelectedStatsType + "ClassType").find($("input:checked"));
						var companyPoiView = $("#" + curSelectedStatsType + "PoiView").find($("input:checked"));

						// 산업체유형 선택
						if ($honamMap.ui.curSelectedCompanyNode != null && $honamMap.ui.curSelectedCompanyNode.cd.length > 0) {
							tmpArParams.push({
								key : "class_code",
								value : $honamMap.ui.curSelectedCompanyNode.cd
							});
							tmpArParamName.push($honamMap.ui.curSelectedCompanyNode.text);
							
							//POI표출
							if(companyPoiView.val() != undefined) {
								tmpArNoneParams = { 
										"class_code" :  $honamMap.ui.curSelectedCompanyNode.cd
								};
							}
							
						}
						
						//산업체분류 차수
						if (companyClassType.val()) {	
							if (companyClassType.val() == "8") {
								tmpArParams.push({
									key : "class_deg",
									value : companyClassType.val()
								});
								tmpArParams.push({
									key : "year",
									value : "2005"
								});
							}else {
								tmpArParams.push({
									key : "year",
									value : "2013"
								});
							}
						}else {
							tmpArParams.push({
								key : "year",
								value : "2013"
							});
						}
						
						// 조회항목 구분
						if (companyDataType.val()) {
							var tmpNames = [];
							companyDataType.map(function(idx) {
								filterParam = this.value;
								tmpNames.push($.trim($("#" + this.value).text()));
								//단위설정
								if (this.value == "corp_cnt") {
									unit = "개";
								}else {
									unit = "명";
								}
								
							});

							if (tmpNames.length > 0) {
								tmpArParamName.push(tmpNames.join());
							}
						}
						
						if(companyPoiView.val() != undefined) {
							tmpArParamName.push("위치표시");
						}

						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "low_search",
							value : "1"
						});
						

					}

				} else if (curSelectedStatsType == "kosis") {
					//this.arParamList = [];
					
					tmpArParams.push({
						key : "org_id",
						value : interactiveMapKosis.org_id
					});
					tmpArParams.push({
						key : "tbl_id",
						value : interactiveMapKosis.tbl_id
					});
					if (interactiveMapKosis.kosis_data_item_detail != null
							&& interactiveMapKosis.kosis_data_item_detail.length > 2) {
						tmpArParams.push({
							key : "kosis_data_item_detail",
							value : interactiveMapKosis.kosis_data_item_detail
						});
					} else {
						tmpArParams.push({
							key : "kosis_data_item_detail",
							value : " "
						});
					}
					tmpArParams.push({
						key : "kosis_data_item",
						value : interactiveMapKosis.kosis_data_item
					});
					tmpArParams.push({
						key : "kosis_data_period",
						value : interactiveMapKosis.kosis_data_period
					});
					tmpArParams.push({
						key : "kosis_data_year",
						value : interactiveMapKosis.kosis_data_year
					});
					tmpArParams.push({
						key : "gis_se",
						value : interactiveMapKosis.gis_se
					});
				}

				this.arParamList.push({
					idx : this.searchbtnCnt,
					params : tmpArParams,
					noneParams : tmpArNoneParams,
					names : tmpArParamName,
					filterParam : filterParam,
					unit : unit
				});

				return api_id;
				
			},
			
			
			/**
			 * 
			 * @name         : setRevertParams
			 * @description  : 파라미터정보를 가지고 조건버튼을 생성한다,.
			 * @date         : 2015. 1. 20. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param api_id
			 * @param @param data
			 */
			setRevertParams : function(data, type) {
				//일반통계정보
				if (data.length == 1) {
					var paramInfo = JSON.parse(data[0].param_info);
					var params = paramInfo.paramInfo;
					var api_id = paramInfo.api_id;
					var title = null;
					var unit = paramInfo.unit;
					var showData = paramInfo.showData;
					var tmpParams = [];
					
					if (paramInfo.btntype == "items") {
						if (type == "recent") {
							title = data[0].title.split(" | ");
						}else if (type == "share") {
							title = data[0].hist_nm.split(" | ");
						}else {
							title = data[0].title.split(" | ");
						}
						
						for (var i=0; i<title.length; i++) {
							if (api_id[i] == "API_0302") {
								for (p in params) {
									if (p != "household_type" && 
										p != "ocptn_type" && 
										p != "house_type" &&
										p != "const_year" &&
										p != "bdspace_from" && 
										p != "bdspace_to") {
										var tmpData = {
												key : p,
												value : params[p] 
										};
										tmpParams.push(tmpData);
									}
								}
							}else if (api_id[i] == "API_0305") {
								for (p in params) {
									if (p != "gender" && 
										p != "age_from" && 
										p != "age_to" && 
										p != "edu_level" && 
										p != "mrg_state" &&
										p != "house_type" &&
										p != "const_year" &&
										p != "bdspace_from" && 
										p != "bdspace_to") {
										var tmpData = {
												key : p,
												value : params[p] 
										};
										tmpParams.push(tmpData);
									}
								}
							}else if (api_id[i] == "API_0306") {
								for (p in params) {
									if (p != "gender" && 
										p != "age_from" && 
										p != "age_to" && 
										p != "edu_level" && 
										p != "mrg_state" &&
										p != "household_type" &&
										p != "ocptn_type") {
										var tmpData = {
												key : p,
												value : params[p] 
										};
										tmpParams.push(tmpData);
									}
								}
							}
							
							this.arParamList.push({
								idx : this.searchbtnCnt,
								params : tmpParams,
								noneParams : [],
								names : title[i].split(" + "),
								filterParam : showData,
								unit : unit
							});
							this.createSearchBtn(api_id[i]); // 버튼생성
							this.searchbtnCnt++;
						}
						
						var items = $(".dragItem").find($("input"));
						this.createCombineBtn("item", items);
						this.curDropParams[0] = { 
								api_id : api_id,
								param : tmpParams,
								filter : showData,
								unit : unit
						};
						
						//버튼이 2개이므로 0,1.. 강제로 id 박음..
						var id = $("#c_dragItem_cItems_01").find($("table")).attr("id");
						this.changeBtnLineColor("combine", $honamMap.ui.combineList, id, this.mapList[0]);
						
					}else {
						// 연관검색에서 넘어올 때 지역정보 없는 경우 gis_se 가 무조건 1로 설정되는 경우가 있음
						// 실제 지원하는 레벨 정보를 따로 저장 후 버튼 생성 시 재 설정
						if(paramInfo.isKosis && paramInfo.gis_se_bak != null && paramInfo.gis_se_bak != undefined) {
							params.gis_se = paramInfo.gis_se_bak;
						}
						
						for (p in params) {
							var tmpData = {
									key : p,
									value : params[p] 
							};
							tmpParams.push(tmpData);
						}
						if (type == "recent") {
							title = data[0].title.split(" | ");
						}else if (type == "share") {
							title = data[0].hist_nm.split(" | ");
						}else {
							title = data[0].title.split(" | ");
						}

						this.arParamList.push({
							idx : this.searchbtnCnt,
							params : tmpParams,
							noneParams : [],
							names : title,
							filterParam : showData,
							unit : unit
						});
						
						this.curDropParams[0] = { 
								api_id : api_id,
								param : tmpParams,
								filter : showData,
								unit : unit
						};
						this.createSearchBtn(api_id); // 버튼생성
						this.searchbtnCnt++;
						this.changeBtnLineColor("normal", this.arParamList, this.searchbtnCnt-1, this.mapList[0]);
					}

					var statsType = {
							API_0301 : "population",
							API_0302 : "population",
							API_0304 : "company",
							API_0305 : "household",
							API_0306 : "house",
							API_0307 : "3f",
							API_0308 : "3f",
							API_0309 : "3f",
							API_0310 : "3f"	
					};

					//통계표검색일 경우, 제외
					if (type != "search") {
						if (api_id == undefined || api_id == null) {
							$("#kosisStatsBtn").click();
							this.curSelectedStatsType = "kosis"
						}else {
							$("#" + statsType[api_id] + "StatsBtn").click();
						}
					}

				}
				//결합통계정보
				else if (data.length == 2) {
					for (var i=0; i<data.length; i++) {
						var paramInfo = JSON.parse(data[i].param_info);
						var params = paramInfo.paramInfo;
						var api_id = paramInfo.api_id;
						var title = data[i].hist_nm.split(" | ")[i];
						var unit = paramInfo.unit;
						var showData = paramInfo.showData;
						var tmpParams = [];
						for (p in params) {
							var tmpData = {
									key : p,
									value : params[p] 
							};
							tmpParams.push(tmpData);
						}

						this.arParamList.push({
							idx : this.searchbtnCnt,
							params : tmpParams,
							noneParams : [],
							names : title,
							filterParam : showData,
							unit : unit
						});
						
						this.curDropParams[0] = { 
								api_id : api_id,
								param : tmpParams,
								filter : showData,
								unit : unit
						};
						
						this.createSearchBtn(api_id); // 버튼생성
						this.searchbtnCnt++;
					}
					var items = $(".dragItem").find($("input"));
					this.createCombineBtn("legend", items);
					
					//버튼이 2개이므로 0,1.. 강제로 id 박음..
					var id = $("#c_dragItem_combine_01").find($("table")).attr("id");
					this.changeBtnLineColor("combine", $honamMap.ui.combineList, id, this.mapList[0]);
					
				}
			},
			
			
			/**
			 * 
			 * @name         : getBtnCnt
			 * @description  : 버튼갯수 
			 * @date         : 2014. 11. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			getBtnCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
				$("#btnCnt").text(cnt+"개");
				
				this.detectSearchBtnCheck();
			},

			
			/**
			 * 
			 * @name         : createSearchBtn
			 * @description  : 조건버튼을 실제로 생성한다.(버튼 타이틀생성/버튼생성)
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 석진혁
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			createSearchBtn : function(curSelectedStatsType) {
				// 버튼타이틀생성
				var btnTitle = null;
				var unit = null;
				var showData = null;

				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == this.searchbtnCnt) {
						var names = this.arParamList[i].names;
						if (Object.prototype.toString.call(names) === "[object Array]") {
							btnTitle = names.join(" + ");
						}else {
							btnTitle = names;
						}
						unit = this.arParamList[i].unit;
						showData = this.arParamList[i].filterParam;
						this.arParamList[i]["title"] = btnTitle;
						break;
					}
				}

				if(curSelectedStatsType == undefined || curSelectedStatsType == null) {
					var tempObj = this.arParamList[0].params;
					for (var i=0; i<tempObj.length; i++) {
						if (tempObj[i].key == "org_id") {
							interactiveMapKosis.org_id = tempObj[i].value;
						}else if (tempObj[i].key == "tbl_id") {
							interactiveMapKosis.tbl_id = tempObj[i].value;
						}else if (tempObj[i].key == "kosis_data_item_detail") {
							interactiveMapKosis.kosis_data_item_detail = tempObj[i].value;
						}else if (tempObj[i].key == "gis_se") {
							interactiveMapKosis.gis_se = tempObj[i].value;
						}else if (tempObj[i].key == "kosis_data_item") {
							interactiveMapKosis.kosis_data_item = tempObj[i].value;
						}else if (tempObj[i].key == "kosis_data_year") {
							interactiveMapKosis.kosis_data_year = tempObj[i].value;
						}else if (tempObj[i].key == "kosis_data_period") {
							interactiveMapKosis.kosis_data_period = tempObj[i].value;
						}
					}
						
					//버튼생성
					var html =
						"<li class=\"dragItem\" id=\"dragItem_"+ $honamMap.ui.searchbtnCnt + "\" style='width:253px; cursor: pointer;'>" +
							"<span class='kosisBtn'>" +
								"<input type=\"checkbox\" class=\"checke\" value=\"" + $honamMap.ui.searchbtnCnt + "\" />" +
								"<img id=\"line_f_"+ $honamMap.ui.searchbtnCnt +"\" src=\"/img/im/icon_circle3.png\" alt=\"\"/>" +
								"<img id=\"line_s_"+ $honamMap.ui.searchbtnCnt +"\" src=\"/img/im/icon_circle3.png\" alt=\"\" />" +
							"</span>" +
							"<table title=\""+btnTitle+"\" id=\"kosis-" + $honamMap.ui.searchbtnCnt + "\" class=\"t_drop\">" +
								"<tr><td class=\"ndroptd\">" + btnTitle + "</td></tr>" +
							"</table>" +
						"</li>"	;		
					$("#searchBtnResultRgn").append(html);
					$("#kosis-" + $honamMap.ui.searchbtnCnt).tooltip({
						position : {my: "left+10 top-40"},
						track: true
					});
					
				} else {
					//사업체 apiid 분기
					var curSelectedDetailStatsType = curSelectedStatsType.substring(0,8);
					var tmpTitle = "";
					
					//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위제거
					/*if (showData == "aged_child_idx" ||
						showData == "oldage_suprt_per" ||
						showData == "juv_suprt_per" || 
						showData == "tot_suprt_per") {
						tmpTitle = btnTitle;				
					}else {*/
						tmpTitle = btnTitle + " ("+ unit +")";
					//}
					
					//버튼생성
					var html =
						"<li class=\"dragItem\" id=\"dragItem_"+ this.searchbtnCnt + "\" style='width:253px; cursor: pointer;'>" +
							"<span class='sensorsBtn'>" +
								"<input type=\"checkbox\" class=\"checke\" value=\"" + this.searchbtnCnt + "\" />" +
								"<img id=\"line_f_"+ this.searchbtnCnt +"\" src=\"/img/im/icon_circle3.png\" alt=\"\"/>" +
								"<img id=\"line_s_"+ this.searchbtnCnt +"\" src=\"/img/im/icon_circle3.png\" alt=\"\" />" +
							"</span>" +
							"<table title=\""+tmpTitle+"\" id=\"" + curSelectedDetailStatsType + "-" + this.searchbtnCnt + "\" class=\"t_drop\">" +
								"<tr><td class=\"ndroptd\">" + tmpTitle +"</td></tr>" +
							"</table>" +
						"</li>"	;		
					$("#searchBtnResultRgn").append(html);
					$("#"+curSelectedDetailStatsType + "-" + this.searchbtnCnt).tooltip({
						position : {my: "left+10 top-40"},
						track: true
					});
					
				}
				
				//버튼 드래그설정
				$(".dragItem").draggable({ 
					revert : "invalid",
					helper : "clone",
					cursor : "pointer",
					zIndex : 100,
					cursorAt : {left : -5},
					start : function(e, ui) {
					},
					drag : function(e, ui) {
						isDraggable = true;
					},
					stop : function(e, ui) {
						isDraggable = false;
					}
				});			
				
				//버튼 카운트
				this.getBtnCnt();

			},

			
			/**
			 * 
			 * @name         : setDetailStatsPanel
			 * @description  : 특정 통계버튼을 생성했을 때, 해당 통계에 대한 세부통계조건선택뷰를 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 석진혁
			 * @history 	 :
			 * @param obj    : 선택된 버튼 element id	
			 * @param type   : 현재 선택된 통계타입
			 */
			setDetailStatsPanel : function(type) {
				this.curSelectedStatsType = type;
				if(type=="kosis"){
					$("#map_remark_notice").hide();
				}else{
					$("#map_remark_notice").show();
				}
				var menuType = {
					"office" 		: 0,	//관할사무소별
					"research"  		: 1,	//조사부문별
					"person" 		: 2,	//조사담당자별
				};
				
				$(".interactive_ct").hide();
				$(".btn_option a").show();
				
				switch(menuType[type]) {
					case 0:
						$("#A").show();
						$("#A1").show();
						$("#A .map_ct_controll").show();
						$("#A1 .map_ct_controll").show();
						$("#B .map_ct_controll").hide();
						$("#B1 .map_ct_controll").hide();
						$("#C .map_ct_controll").hide();
						$("#C1 .map_ct_controll").hide();
						this.curSelectedDetailStatsType = "A";
						break;
					case 1:
						$("#B").show();
						$("#B1").show();
						$("#B .map_ct_controll").show();
						$("#B1 .map_ct_controll").show();
						$("#A .map_ct_controll").hide();
						$("#A1 .map_ct_controll").hide();
						$("#C .map_ct_controll").hide();
						$("#C1 .map_ct_controll").hide();
						this.curSelectedDetailStatsType = "B";
						break;
					case 2:
						$("#C").show();
						$("#C1").show();
						$("#C .map_ct_controll").show();
						$("#C1 .map_ct_controll").show();
						$("#A .map_ct_controll").hide();
						$("#A1 .map_ct_controll").hide();
						$("#B .map_ct_controll").hide();
						$("#B1 .map_ct_controll").hide();
						this.curSelectedDetailStatsType = "C";
						break;
					case 3:
						$("#API_0307").show();
						$("#API_0310").show();
						$("#API_0301 .map_ct_controll").hide();
						$("#API_0302 .map_ct_controll").hide();
						$("#API_0305 .map_ct_controll").hide();
						$("#API_0306 .map_ct_controll").hide();
						$("#API_0307 .map_ct_controll").hide();
						$("#API_0310 .map_ct_controll").show();
						$("#API_0304-a .map_ct_controll").hide();
						$("#API_0304-b .map_ct_controll").hide();
						$("#kosisStatsPanel .map_ct_controll").hide();
						this.curSelectedDetailStatsType = "API_0310";
						break;
				};

			},

			
			/**
			 * 
			 * @name         : combineSearchBtn
			 * @description  : 버튼 2개를 결합하여 새로운 결합버튼을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			combineSearchBtn : function() {
				var items = $(".dragItem").find($("input:checked"));
				if (items.length > 0) {
					for (var i = 0; i < items.length; i++) {
						if ($(items[i]).parent().attr("class") == "combineBtn") {
							messageAlert.open("알림","이미 결합된 버튼과는 결합할 수 없습니다.");
							return;
						}
						if ($(items[i]).parent().attr("class") == "kosisBtn") {
							messageAlert.open("알림","행정구역통계는 결합기능을 사용할 수 없습니다.");
							return;
						}
					}
				}else {
					messageAlert.open("알림", "결합할 버튼을 선택해주세요.");
					return;
				}
				
				if (items.length == 2) {
					var btnDisabled = false;
					for (var i = 0; i < items.length; i++) {
						var refId = $("#dragItem_" + items[i].value).find($("table")).attr("id");
						var apiId = refId.split("-")[0];
						var idx = refId.split("-")[1];

						if (apiId != "API_0302" &&
							apiId != "API_0305" &&
							apiId != "API_0306") {
							btnDisabled = true;
							break;
						}else {
							for (var k = 0; k < $honamMap.ui.arParamList.length; k++) {
								if ($honamMap.ui.arParamList[k].idx == idx) {
									for(var x=0; x<$honamMap.ui.arParamList[k].noneParams.length; x++) {
										if ($honamMap.ui.arParamList[k].noneParams[x].noneParam != undefined &&
												$honamMap.ui.arParamList[k].noneParams[x].noneParam) {
											btnDisabled = true;
											break;
										}
									}
								}
							}
						}
					}
					
					var html ="";
					html += "<ul id='combine_message'>";
					html += 	"<li class='combine_title'>&middot;범례결합 : 범례를 중첩하여 5단계(상-중-하)로 표시</li>";
					html += 	"<li class='combine_subtitle'>&nbsp;예)총인구(5단계) + 사업체수(5단계) => 상(인구도 많고,</li><br>";
					html += 	"<li class='combine_subtitle' style='margin-top:-10px;'>&nbsp;사업체도 많은지역)</li><br>";
					html += 	"<li class='combine_title'>&middot;조건결합 : 인구, 가구, 주택 항목을 각각 선택하여 결합</li>";
					html += 	"<li class='combine_subtitle'>&nbsp;예)1인(가구) + 65세이상(인구) = 65세이상 1인가구";
					html += "</ul>";
					
					messageConfirm.open(
			    			 "알림", 
			    			 html,
			    			 btns = [
								{
								    title : "범례결합",
								    fAgm : items,
								    disable : false,
								    func : function(opt) {
								 	   $honamMap.ui.createCombineBtn("legend", opt);
								    }
								 },
								 
			    			     {
								   title : "조건결합",
								   fAgm : items,
								   disable : btnDisabled,
								   func : function(opt) {
									   var tmpApiIds = [];
									   for (var i = 0; i < items.length; i++) {
											var refId = $("#dragItem_" + items[i].value).find($("table")).attr("id");
											var apiId = refId.split("-")[0];
											var idx = refId.split("-")[1];
				
											/*if (apiId != "API_0302" &&
												apiId != "API_0305" &&
												apiId != "API_0306") {
												messageAlert.open("알림", "조건결합은 인구,가구,주택 세부검색에 한해서 제공됩니다.");
												return;
											}else {
												
												//조건결합일 경우, 각 통계당 하나 이상의 조건을 선택해야한다.
												for (var k = 0; k < $honamMap.ui.arParamList.length; k++) {
													if ($honamMap.ui.arParamList[k].idx == idx) {
														for(var x=0; x<$honamMap.ui.arParamList[k].noneParams.length; x++) {
															if ($honamMap.ui.arParamList[k].noneParams[x].noneParam != undefined &&
																	$honamMap.ui.arParamList[k].noneParams[x].noneParam) {
																messageAlert.open("알림", "조건결합은 통계당 하나 이상의 조건을 선택해야합니다.<br>다시 조건을 선택해주세요.");
																return;
															}
														}
													}
												}
												
												//같은통계를 조건결합할 수없도록 필터링한다.
												tmpApiIds.push(apiId);
												 if (tmpApiIds.length == 2) {
													   if (tmpApiIds[0] == tmpApiIds[1]) { 
														   messageAlert.open("알림", "같은통계는 조건결합을 할 수 없습니다.<br>서로 다른통계를 결합해주세요.");
														   return;
													   } 
												 }
											}*/	
											
											//같은통계를 조건결합할 수없도록 필터링한다.
											tmpApiIds.push(apiId);
											 if (tmpApiIds.length == 2) {
												   if (tmpApiIds[0] == tmpApiIds[1]) { 
													   messageAlert.open("알림", "같은통계는 조건결합을 할 수 없습니다.<br>서로 다른통계를 결합해주세요.");
													   return;
												   } 
											 }
									   }
									   $honamMap.ui.createCombineBtn("item", opt);
								   }
			    			     }   
			    			     
			    			 ]
			    	);
				} else {
					messageAlert.open("알림","결합은 2개만 가능합니다.");
				}
			},
			
			
			/**
			 * 
			 * @name         : createCombineBtn
			 * @description  : 범례 또는 결합버튼을 생성한다.
			 * @date         : 2015. 1. 7. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param type  : 범례 또는 결합타입 (범례-legend, 조건-item)
			 * @param @param items : 버튼객체
			 */
			createCombineBtn : function(type, items) {
				var tmpCombineIdx = new Array();
				var refBtnIds = new Array();
				var params = new Array();
				var noneParams = new Array();
				var filterParams = new Array();
				var unit = new Array();
				var showUnit = new Array();
				var maxYear = new Array();

				for (var i = 0; i < items.length; i++) {
					$("#dragItem_" + items[i].value).hide();
					$("#dragItem_" + items[i].value).find($("input")).prop("checked", false);
					var refId = $("#dragItem_" + items[i].value).find($("table")).attr("id");
					tmpCombineIdx.push(items[i].value);
					refBtnIds.push(refId.split("-")[0]);

					// 결합전 버튼들의 파라미터정보를 저장한다.
					var tmpIdx = refId.split("-");
					for (var k = 0; k < this.arParamList.length; k++) {
						if (this.arParamList[k].idx == tmpIdx[1]) {
							params.push(this.arParamList[k].params);
							noneParams.push(this.arParamList[k].noneParams);
							filterParams.push(this.arParamList[k].filterParam);
							showUnit.push(this.arParamList[k].unit);
							maxYear.push(this.arParamList[k].maxYear);
							break;
						}
					}
				}

				var tmpId = "combine_";
				
				//조건결합일 경우
				var tmpType = [];
				var itemType = "";
				if (type == "item") {
					tmpId = "cItems_"	
						
					for (var i=0; i<refBtnIds.length; i++) {
						if (refBtnIds[i] == "API_0302") {
							tmpType.push("ppl");
						}else if (refBtnIds[i] == "API_0305") {
							tmpType.push("family");
						}else if (refBtnIds[i] == "API_0306") {
							tmpType.push("house");
						}
					}
					if (tmpType.length > 0) {
						itemType = tmpType.join(",");
						
						unit = [];
						if (itemType.indexOf("family") != -1 && 
							itemType.indexOf("house") != -1) {
							unit.push("호");
						}else if (itemType.indexOf("ppl") != -1 && 
								  itemType.indexOf("family") != -1) {
							unit.push("가구");
						}else if (itemType.indexOf("ppl") != -1 && 
								  itemType.indexOf("house") != -1) {
							unit.push("호");
						}
					}					
				}else {
					unit = showUnit;
				}
				
				for (var i = 0; i < tmpCombineIdx.length; i++) {
					tmpId += tmpCombineIdx[i];
				}

				// 버튼타이틀생성
				var btnTitle = new Array();
				for (var i = 0; i < tmpCombineIdx.length; i++) {
					for (var k = 0; k < this.arParamList.length; k++) {
						if (this.arParamList[k].idx == tmpCombineIdx[i]) {
							var names = this.arParamList[k].names;
							if( Object.prototype.toString.call(names) === "[object Array]" ) {
								btnTitle.push(names.join(" + "));
							}else {
								btnTitle.push(names);
							}
							
							break;
						}
					}
				}
				
				this.combineList.push({
					idx : tmpId,
					data : tmpCombineIdx,
					refIds : refBtnIds,
					itemType : itemType,
					params : params,
					noneParams : noneParams,
					filterParam : filterParams,
					unit : unit,
					title : btnTitle,
					maxYear : maxYear
				});
				
				//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위삭제
				for (var i=0; i<filterParams.length; i++) {
					/*if (filterParams[i] == "aged_child_idx" ||
						filterParams[i] == "oldage_suprt_per" ||
						filterParams[i] == "juv_suprt_per" || 
						filterParams[i] == "tot_suprt_per") {
						 btnTitle[i] = 	btnTitle[i];		
					}else {*/
						btnTitle[i] = btnTitle[i] + " ("+ showUnit[i] +")";
					//}
				}

				var html = "<li class=\"dragItem\" id=\"c_dragItem_" + tmpId + "\" style='width:253px;cursor: pointer;'>" +
							"<span class='combineBtn'>" +
								"<input type=\"checkbox\" class=\"checke\" value=\"c_dragItem_" + tmpId + "\" />" +
								"<img id=\"c_line_f_"+ tmpId +"\" src=\"/img/im/icon_circle3.png\" alt=\"\"/>" +
								"<img id=\"c_line_s_"+ tmpId +"\" src=\"/img/im/icon_circle3.png\" alt=\"\" />" +
							"</span>" +
							"<table title=\"\" id=\"" +tmpId + "\" class=\"t_drop\">" +
								"<tr><td class=\"cdroptd\">" + btnTitle[0] + "</td></tr>" +
								"<tr><td class=\"cdroptd\">" + btnTitle[1] + "</td></tr>" +
							"</table>" +
						   "</li>"	;		

				$("#searchBtnResultRgn").append(html);
				
				//조건결합일 경우
				if (type == "item") {
					$("#c_dragItem_" + tmpId).css("background-color", "#c1ff6b");
				}
				//범례결합일 경우
				else {
					$("#c_dragItem_" + tmpId).css("background-color", "#ffe65a");
				}
				
				var tooltipMsg = "<table>" +
									"<tr><td>"+ btnTitle[0] +"</td></tr>" + 
									"<tr><td>"+ btnTitle[1] +"</td></tr>" + 
								 "</table>";
				$("#"+tmpId).tooltip({
					content : tooltipMsg,
					position : {my: "left+10 top-40"},
					track: true
				});
				
				//버튼 드래그설정
				$(".dragItem").draggable({ 
					revert : "invalid",
					helper : "clone",
					cursor : "pointer",
					zIndex : 100,
					cursorAt : {left : -5},
					start : function(e, ui) {
					},
					drag : function(e, ui) {
						isDraggable = true;
					},
					stop : function(e, ui) {
						isDraggable = false;
					}
				});	
				
				//버튼 카운트
				this.getBtnCnt();

				// 전체체크버튼 초기화
				$("#checkAllSearchBtn").prop("checked", false);
			},
			

			
			
			/**
			 * 
			 * @name         : undoSearchBtn
			 * @description  : 결합된 버튼을 푼다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			undoSearchBtn : function() {
				var items = $(".dragItem").find($("input:checked"));
				if (items.length > 0) {
					messageAlert.open(
							"알림",
							"해당 버튼을 결합해제 하시겠습니까?",
							function done() {
								var that = $honamMap.ui;
								var arTmp = [];
								for (var i = 0; i < items.length; i++) {
									
									//생성된 버튼 중, 결합버튼인지 확인한다.
									if (items[i].value.indexOf("c_dragItem_") != -1) {
										var id = items[i].value.split("c_dragItem_")[1];
										$("#" + items[i].value).remove();
										for (var x = 0; x < that.combineList.length; x++) {
											if (that.combineList[x].idx == id) {
												var tmpData = that.combineList[x].data;
												for (var k = 0; k < tmpData.length; k++) {
													$("#dragItem_" + tmpData[k]).show();
													$("#dragItem_" + tmpData[k]).find($("input")).prop("checked", false);
												}
												break;
											}
										}

										// 삭제된 조회버튼의 파라미턴정보를 삭제한다.
										for (var k = 0; k < that.combineList.length; k++) {
											if (that.combineList[k].idx == id) {
												that.combineList.splice(that.combineList
														.indexOf(that.combineList[k]), 1);
												break;
											}
										}
									}else {
										$("#dragItem_" + items[i].value).find($("input")).prop("checked", false);
									}
								}
								
								//버튼 카운트
								that.getBtnCnt();
								
								// 전체체크버튼 초기화
								$("#checkAllSearchBtn").prop("checked", false);
							},
							
							function cancel() {	
							}
					);
				}else {
					messageAlert.open("알림", "결합해제할 버튼을 선택해주세요.");
				}
			},

			
			/**
			 * 
			 * @name         : deleteSearchBtn
			 * @description  : 생성된 조건검색버튼을 삭제한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			deleteSearchBtn : function() {
				var items = $(".dragItem").find($("input:checked"));
				if (items.length > 0) {
					var arTmp = [];
					for (var i = 0; i < items.length; i++) {
						$("#dragItem_" + items[i].value).remove();
						$("#" + items[i].value).remove();

						// 삭제된 조회버튼의 파라미턴정보를 삭제한다.
						for (var j = 0; j < this.arParamList.length; j++) {
							if (this.arParamList[j].idx == items[i].value) {
								this.arParamList.splice(this.arParamList.indexOf(this.arParamList[j]), 1);
								break;
							}
						}

						for (var k = 0; k < this.combineList.length; k++) {
							if (this.combineList[k].idx == items[i].value) {
								this.combineList.splice(this.combineList.indexOf(this.combineList[k]), 1);
								break;
							}
						}

					}
					
					//버튼 카운트
					this.getBtnCnt();
				}else {
					messageAlert.open("알림", "삭제할 버튼을 선택해주세요.");
				}
				
			},
			
			
			/**
			 * 
			 * @name         : clearViewOverlay
			 * @description  : 실내맵 토글시, 각종 버튼 및 그래프를 숨긴다.
			 * @date         : 2014. 10. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			clearViewOverlay : function(isShow, type) {
				this.curMapId = parseInt(type)-1;
				var mapInfo = this.mapList[this.curMapId].mapInfo;
				var isMap1ContentShow =  $("#map_dummy_1").is(":visible");
				var isMap2ContentShow =  $("#map_dummy_2").is(":visible");		
				if (isShow) {
					$("#settingBtn_" + type).hide();
					$("#shareBtn_" + type).hide();
					$("#bookmarkBtn_" + type).hide();
					$("#initBtn_" + type).hide();
					$("#uploadBtn_" + type).hide();
					$(mapInfo.barChartObj).hide();
					$(mapInfo.pieChartObj).hide();
					$(mapInfo.legendObj).hide();
//					$("#timeSeriesDiv").hide();
					
					this.mapList[this.curMapId].clearDataOverlay();
					this.removeBtnLineColor();
					
				}else {
					$("#settingBtn_" + type).show();
					$("#shareBtn_" + type).show();
					$("#bookmarkBtn_" + type).show();
					$("#initBtn_" + type).show();
					$("#uploadBtn_" + type).show();
					$(mapInfo.legendObj).show();
				}
				
			},
			
			
			/**
			 * 
			 * @name         : doInnerMap
			 * @description  : 
			 * @date         : 2014. 10. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param type
			 */
			doInnerMap : function(type) {
				this.curMapId = parseInt(type)-1;
				this.isInnerMapShow ^= true;
				this.mapList[this.curMapId].setInnerMap(this.isInnerMapShow);
				this.clearViewOverlay(this.isInnerMapShow, type);
				this.mapList[this.curMapId].drawControl.disable();
				var mapInfo = this.mapList[this.curMapId].mapInfo;
				
				if (this.isInnerMapShow) {
					$("#innerMapBtn_" + type).val("실내맵off");
					$("#sideMask").show();
					$("#mapAddBtn_"+type).hide();
					this.mapList[this.curMapId].infoControlShowHide(false);
					$(".btn_map_sel").addClass("on");
					mapInfo.resetMapInfo();
				}else {
					$("#innerMapBtn_" + type).val("실내맵on");
					$("#sideMask").hide();
					$("#mapAddBtn_"+type).show();
					this.mapList[this.curMapId].infoControlShowHide(true);
					this.mapList[this.curMapId].drawControl.enable();
					$(".btn_map_sel").removeClass("on");
					
				}		
			},
			
			
			/**
			 * 
			 * @name         : doUpload
			 * @description  : 
			 * @date         : 2014. 10. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param type
			 */
			doUpload : function(type) {
				this.curMapId = parseInt(type)-1;
				$("#fileSearch").val("");
				$(".deem").show();
				$("#uploadFile").show();
				
				document.forms["uploadForm"].reset();
				
			},

			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.(데이터오버레이만 해당)
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doClearMap : function(type) {
				this.curMapId = parseInt(type)-1;
				if (this.mapList.length > 0) {
					this.mapList[this.curMapId].clearDataOverlay();
					//this.mapList[this.curMapId].drawControl.disableControl("drawControl"); //draw hide
					this.mapList[this.curMapId].drawControl.removeOverlay();
					this.removeBtnLineColor();
					
					for (var i=0; i<this.markerGroup.length; i++) {
						this.mapList[this.curMapId].gMap.removeLayer(this.markerGroup[i].marker);
					}
					
					
					
					//MapInfo 초기화
					var mapInfo = this.mapList[this.curMapId].mapInfo;
					mapInfo.resetMapInfo();
				}
			},
			
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function(type) {
				this.curMapId = parseInt(type)-1;
				messageAlert.open(
						"알림", 
						"해당 통계정보를 북마크를 하시겠습니까?",  
						function done() {
							that = $honamMap.ui;
							if (that.shareUrlInfoList[that.curMapId] != null &&
									that.shareUrlInfoList[that.curMapId].length > 0) {
									that.share_type = "BMARK"; 
									if(!AuthInfo.authStatus) {	
										$(".deem").show();
										$(".login_pop").show();
										
										//아이디/비밀번호 초기화
										$(".plogin_id").val("");
										$(".plogin_pw").val("");
										
									}else {
										$honamMapApi.request.openApiRegBookmark(
												that.shareUrlInfoList[that.curMapId], 
												that.share_type, 
												type);
									}
									
								} else {
									messageAlert.open("북마크", "북마크할 통계정보가 없습니다. 먼저 통계조회를 해주세요.");
								}
						},
						function cancel() {
						}
						
				);
			},

			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShare : function(type) {
				this.curMapId = parseInt(type)-1;
				messageAlert.open(
						"알림", 
						"해당 통계정보를 공유 하시겠습니까?",  
						function done() {
							that = $honamMap.ui;
							if (that.shareUrlInfoList[that.curMapId] != null &&
									that.shareUrlInfoList[that.curMapId].length > 0) {
								that.share_type = "SHARE"; 
									if(!AuthInfo.authStatus) {	
										$(".deem").show();
										$(".login_pop").show();
										
										//아이디/비밀번호 초기화
										$(".plogin_id").val("");
										$(".plogin_pw").val("");

									}else {
										$honamMapApi.request.openApiRegBookmark(
												that.shareUrlInfoList[that.curMapId], 
												that.share_type,
												type);
									}
									
								} else {
									messageAlert.open("공유", "공유할 통계정보가 없습니다. 먼저 통계조회를 해주세요.");
								}
							
						},
						
						function cancel() {
						}
						
				);

			},

			
			/**
			 * 
			 * @name         : doSetting
			 * @description  : 맵의 경계정보를 설정한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSetting : function(type) {
				this.curMapId = parseInt(type)-1;
				$("#bndYear").val(this.mapList[this.curMapId].bnd_year);
				$(".deem").show();
				$("#settings").show();
			},
			
		/*	doExcelDownLoad : function() {
				messageAlert.open("알림", "준비중입니다.");
			},*/
			
			/**
			 * 
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 2014. 11. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doDone : function(type) {
				if (type == "settings") {
					var map = this.mapList[this.curMapId];
					if ($("#bndYear").val() != map.bnd_year) {
						map.bnd_year = $("#bndYear").val();
						map.openApiReverseGeoCode(map.center);
					}	
					map.bnd_year = $("#bndYear").val();
				}
				else if (type == "sharedlg") {
					copyToClipboard($("#sharedlg").find($("input")).val());
				}
				else if (type == "uploadFile") {
					$("#fileSearch").val("");
					$("#filePathField").val("");
				}
				
				$(".deem").hide();
				$("#"+type).hide();
				
			},
			
			/**
			 * 
			 * @name         : doCancel
			 * @description  : 경계정보 설정을 취소한다.
			 * @date         : 2014. 11. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doCancel : function(type) {
				if (type == "settings") {
					$("#bndYear").val(this.mapList[this.curMapId].bnd_year);
				}else if (type == "uploadFile") {
					$("#fileSearch").val("");
					$("#filePathField").val("");
				}
				$(".deem").hide();
				$("#"+type).hide();
				
			},
			getImg : function() {
				width = 900;    //팝업창의 너비
				height = 509;    //팝업창의 높이				
				var sw  = screen.availWidth ;
				var sh  = screen.availHeight ;
				px=(sw - width)/2 ;
				py=(sh - height)/2 ;
				var set  = 'top=' + py + ',left=' + px ;
				set += ',width=' + width + ',height=' + height + ',toolbar=0,resizable=1,status=0,scrollbars=1' ;

				window.open("../../img/nm/guide_interactive_map1.jpg","gImgWin",set) ;				
		        			       
			},
			
			/**
			 * 
			 * @name         : doRemoveMap
			 * @description  : 맵을 삭제한다.
			 * @date         : 2014. 10. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 1:1번맵, 2:2번맵
			 */
			doRemoveMap : function(type) {
				this.curMapId = parseInt(type)-1;
				var mapInfo = this.mapList[this.curMapId].mapInfo;
				if (type == "1") {
					$("#innerMapBtn_1").show();
					$("#innerMapBtn_2").show();
					$("#uploadBtn_1").show();
					$("#uploadBtn_2").show();	
					$("#mapCloseBtn_2").hide();
					
					$("#map_area").css({
//						"width": "50%",
						"width": "0%",
//						"display": "none",
						"float": "left"
					});
					$("#map_area2").css({
						"width": "100%",
						"display": "block",
						"float": "left"
					});
					$("#map_area2 .area_cont").css("borderLeft", "0px");
					
					$("#mapRgn_1").hide();
					$("#map_dummy_1").hide();
					$("#map_remark_1").hide();
					
					mapInfo.resetTimeSeries();	//시계열 초기화

				}else { 
					$("#innerMapBtn_1").show();
					$("#innerMapBtn_2").show();
					$("#uploadBtn_1").show();
					$("#uploadBtn_2").show();	
					$("#mapCloseBtn_1").hide();
					
					$("#map_area").css({
						"width": "100%",
						"display": "block",
						"float": "left"
					});
					$("#map_area2").css({
						"width": "100%",
//						"display": "none",
						"float": "left"
					});
					
					$("#mapRgn_2").hide();
					$("#map_dummy_2").hide();
					$("#map_remark_2").hide();
					
					mapInfo.resetTimeSeries();	//시계열 초기화

				}
				
				$("#settings").hide();
				$("#sharedlg").hide();
				
				if (this.mapList[parseInt(type)-1] !== undefined) {
					this.mapList[parseInt(type)-1].gMap.remove();
				}
				
				//map resize
				for (var i=0; i<this.mapList.length; i++) {
					this.mapList[i].gMap._onResize();
					$("#viewBtn_" + (i+1)).hide();
					$("#mapAddBtn_" + (i+1)).show();
				}
				
				//버튼라인색상 초기화
				this.removeBtnLineColor();
				
				$(".map_location").css("padding", "6px 0 0 10px");
				$("#mapRgn_1").trigger("resizeMap");
				$("#mapRgn_2").trigger("resizeMap");

			},
			
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.(이벤트 콜백)
			 * @date         : 2014. 10. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function(type) {
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var createMapId;
				
				$("#innerMapBtn_1").hide();
				$("#innerMapBtn_2").hide();
				$("#uploadBtn_1").hide();
				$("#uploadBtn_2").hide();
				
				$("#map_area").css({
					"width": "50%",
					"display": "block",
					"float": "left"
				});
				$("#map_area2").css({
					"width": "50%",
					"display": "block",
					"float": "left"
				});
				$(".btn_map_sel").hide();
				$("#map_area2 .area_cont").css("borderLeft", "5px solid #3e3e3e");
				
				if (isMap1ContentShow) {
					$("#mapRgn_2").show();
					$("#map_dummy_2").show();
					$("#map_remark_2").show();
					this.createMap("mapRgn_2", 1);
					createMapId = 1;
					
					var mapNavi2 = new mapNavigation.UI();
					mapNavi2.firstBoolean = false;
					mapNavi2.create("mapNavi_2", 2, $honamMap.ui);
					
				}else if (isMap2ContentShow) {
					$("#mapRgn_1").show();
					$("#map_dummy_1").show();
					$("#map_remark_1").show();
					this.createMap("mapRgn_1", 0);
					createMapId = 0;
					
					var mapNavi1 = new mapNavigation.UI();
					mapNavi1.firstBoolean = false;
					mapNavi1.create("mapNavi_1", 1, $honamMap.ui);
				}
				
				//map resize
				for (var i=0; i<this.mapList.length; i++) {
					this.mapList[i].update();
					$("#viewBtn_" + (i+1)).show();
					$("#mapCloseBtn_" + (i+1)).show();
					$("#mapAddBtn_" + (i+1)).hide();
				}
				
				//지도추가시, 현재보고있는 맵의 상태를 그대로 복사한다.(센터, 줌레벨)
				if (createMapId == 0) {
					this.mapList[0].mapMove(this.mapList[1].center, this.mapList[1].zoom);
				}else {
					this.mapList[1].mapMove(this.mapList[0].center, this.mapList[0].zoom);
				}
				
				$(".map_location").css("padding", "6px 0 0 10px");
				$("#mapRgn_1").trigger("resizeMap");
				$("#mapRgn_2").trigger("resizeMap");
				
			},
			
			
			/**
			 * 
			 * @name         : setShareInfo
			 * @description  : 공유 및 북마크정보를 세팅한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options : 공유 및 북마크정보
			 * @param type : 공유정보 타입(normal, share)
			 */
			setShareInfo : function(options, type, id) {
				if (options != null) {
					var url = null;
					var params = {};
					var noneParams = {};
					var showData = null;
					var unit = null;
					var title = null;
					var zoomlevel = null;
					var center = null;
					var apiId = null;
					var isKosis = false;
					var dist_level = null;
					var btntype = null;		
					
					if (type == "normal") {
						// 파라미터세팅		
						for (var i = 0; i < options.params.param.length; i++) {
							var key = options.params.param[i].key;
							var value = options.params.param[i].value;
							params[key] = value;
						}
						params["adm_cd"] = options.params.adm_cd;

						//조회조건이 아닌 파라미터 세팅
						noneParams = options.params.noneParams;
						url = options.url;
						zoomlevel = options.zoomlevel;
						center = options.center;
						showData = options.params.filter;
						unit = options.params.unit;
						title = options.params.title;
						apiId = options.params.api_id;
						btntype = options.btntype;
							
						if (options.params.isKosis !== undefined || options.params.isKosis == true) {
							isKosis = true; 
							dist_level = options.dist_level;
						}
		
					}else {
						url = options.api_call_url;
						zoomlevel = options.param_info.mapInfo.zoomlevel;
						center = options.param_info.mapInfo.center;
						showData = options.param_info.showData;
						unit = options.param_info.unit;
						title = options.param_info.title;
						params = options.param_info.paramInfo;
						apiId = options.param_info.api_id;
						btntype = options.param_info.btntype;
						
						if (options.param_info.isKosis !== undefined || options.param_info.isKosis == true) {
							isKosis = true; 
						}
					}

					// 공유정보 설정
					var shareInfo = {
							url : url,
							params : {
								mapInfo : {
									zoomlevel : zoomlevel,
									center : center
								},
								paramInfo : params,
								showData : showData,
								unit : unit,
								api_id : apiId,
								isKosis : isKosis,
								btntype : btntype
							},
							title : $.trim(title),
							
					};

					if(isKosis){	
						//관리자 통계주제도를 위한 표출레벨 설정
						if(dist_level=='1')
						{	//시도
							dist_level='01';
						}else if(dist_level=='2'){
							//시군구
							dist_level='02';
						}else if(dist_level=='3'){
							//읍면동
							dist_level='03';
						}else{
							dist_level='01';
						}
						shareInfo.params.dist_level=dist_level;
					}
					this.shareUrlInfo.push(shareInfo);
				
				}

				// 줌레벨, 센터좌표 재설정
				if (this.shareUrlInfo.length > 1) {
					var length = this.shareUrlInfo.length;
					var zoomlevel = this.shareUrlInfo[length - 1].params.mapInfo.zoomlevel;
					var center = this.shareUrlInfo[length - 1].params.mapInfo.center;
					for (var i = 0; i < this.shareUrlInfo.length; i++) {
						this.shareUrlInfo[i].params.mapInfo.zoomlevel = zoomlevel;
						this.shareUrlInfo[i].params.mapInfo.center = center;
					}
				}
				
				this.shareUrlInfoList[parseInt(id)] = this.shareUrlInfo;
				
			},
			
			
			/**
			 * 
			 * @name         : analysisShareInfo
			 * @description  : 공유된 정보를 분석하여, 통계정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param key    : 공유ID
			 */
			analysisShareInfo : function (keyList) {
				for (key in keyList) {
					if (key == "") {
						return false;
					}					
				}
				
				if (keyList.key != undefined) {
					$honamMap.ui.shareUrlInfoList = [];
					$honamMap.ui.shareUrlInfo = [];
					$honamMapApi.request.openApiStatisticsHistoryParamInfo(keyList.key);
				}
				else if (keyList.intr != undefined) {
					$honamMap.ui.shareUrlInfoList = [];
					$honamMap.ui.shareUrlInfo = [];
					$honamMapApi.request.openApiMainRecentParamInfo(keyList.intr);
				}
				else if (keyList.type != undefined) {
					if (keyList.type == "kosis") {
						var gis_se = keyList.gis_se;
						var kosis_tb_id = keyList.kosis_tb_id;
						var adm_cd = keyList.adm_cd;
						var center = [keyList.x, keyList.y];
						var url = "/SOP_Kosis/kosis/ServiceAPI/api/KosisDataList.do";
						var zoom = "2";
						var title = decodeURI(keyList.stat_title);
						
						gis_se = gis_se.replace(/(^\s*)|(\s*$)/gi, "");
						gis_se = parseInt(gis_se);
						
						if(adm_cd == "00" || adm_cd == "") {
							zoom = "2";
							adm_cd = "1";
						} else {
							switch(gis_se) {
							case 1:
								zoom = "2"; // "1";
								if(adm_cd.length >= 2) {
									adm_cd = "1";
								}
								break;

							case 2:
								zoom = "4"; // 5->4;
								if(adm_cd.length >= 5) {
									adm_cd = adm_cd.substring(0, 2);
								}
								break;

							case 3:
								zoom = "6"; // 7->6;
								if(adm_cd.length > 2) {
									adm_cd = adm_cd.substring(0, 5);
								}
								break;
							}
						}
						
						this.setDetailStatsPanel("kosis");
						$("#kosisStatsBtn").click();
						this.setParams(this.curSelectedStatsType, api_id);
						this.searchbtnCnt++;
						
						var options = new Array();
						options.push({
							key : "gis_se",
							value : gis_se
						});
						
						options.push({
							key : "tbl_id",
							value : kosis_tb_id
						});
						
						options.push({
							key : "adm_cd",
							value : adm_cd
						});
						
						options.push({
							key : "center",
							value : center
						});
						
						options.push({
							key : "url",
							value : url
						});
						
						options.push({
							key : "zoom",
							value : zoom
						});
						
						options.push({
							key : "title",
							value : title
						});

						interactiveMapKosis.getKosisStaticDataFieldForSearchList(kosis_tb_id, options);
					}
					else if (keyList.type == "intr") {
						var code = keyList.code;
						$("#"+code + "StatsBtn").click();
//						$mapNavigation.ui.firstBoolean = true;
//						$mapNavigation.ui.initialize($honamMap.ui);
					}
					else {
						var api_id = "API_" + keyList.type;
						var adm_cd = keyList.adm_cd;
						var center = [keyList.x, keyList.y];
						var url = "";
						var filter = "";
						var unit = "";
						var title = decodeURI(keyList.title);
						this.curSelectedDetailStatsType = api_id;

						if (adm_cd == null) {
							adm_cd = "00";
							center = [966298, 1898301];
						}
						
						//전국
						if (adm_cd == "00") {
							var zoom = 2;
						}else {
							switch (adm_cd.length) {
							case 2:
								zoom = 4; //5->4
								break;
							case 5:
								zoom = 6; //7->6
								break;
							case 7:
								zoom = 9; //10->9
								break;
							default:
								var zoom = 2;
								adm_cd = "00";
								break;
							}

						}		
						
						var params = {
								"adm_cd" : adm_cd,
								"bnd_year" : $("#bndYear").val(),//this.mapList[0].bnd_year,
								"low_search" : "1"
						};
						
						//url, 해당통계버튼 선택
						if (api_id == "API_0301") {
							this.curSelectedStatsType = "population";
							url = $honamMapApi.request.API_0301_URL;
							filter = keyList.showData;
							unit = "명";
							//title = "인구총괄";
							
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0302") {
							this.curSelectedStatsType = "population";
							url = $honamMapApi.request.API_0302_URL;
							filter = "population";
							unit = "명";
							//title = "인구통계세부조건";
							
							params["area_type"] = keyList.area_type;
							params["gender"] = keyList.gender;
							
							if (keyList.age_from != undefined && keyList.age_from.length > 0) {
								params["age_from"] = keyList.age_from;
							}
							if (keyList.age_to != undefined && keyList.age_to.length > 0) {
								params["age_to"] = keyList.age_to;
							}
							if (keyList.edu_level != undefined && keyList.edu_level.length > 0) {
								params["edu_level"] = keyList.edu_level;
							}
							if (keyList.mrg_state != undefined && keyList.mrg_state.length > 0) {
								params["mrg_state"] = keyList.mrg_state;
							}
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0304") {
							this.curSelectedStatsType = "company";
							url = $honamMapApi.request.API_0304_URL;
							filter = "corp_cnt";
							unit = "개";
							//title = "사업체통계";
							
							params["area_type"] = keyList.area_type;
							params["class_code"] = keyList.class_code;
							if (keyList.class_deg != undefined && keyList.class_deg.length > 0 /*&& keyList.class_deg == "8"*/) {
								params["class_deg"] = keyList.class_deg;
							}
							
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2013";
							}
						}
						else if (api_id == "API_0305") {
							this.curSelectedStatsType = "household";
							url = $honamMapApi.request.API_0305_URL;
							filter = "household_cnt";
							unit = "가구";
							//title = "가구통계";
							
							params["area_type"] = keyList.area_type;
							if (keyList.household_type != undefined && keyList.household_type.length > 0) {
								params["household_type"] = keyList.household_type;
							}
							
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0306") {
							this.curSelectedStatsType = "house";
							url = $honamMapApi.request.API_0306_URL;
							filter = "house_cnt";
							unit = "호";
							//title = "주택통계";
							
							params["area_type"] = keyList.area_type;
							if (keyList.house_type != undefined && keyList.house_type.length > 0) {
								params["house_type"] = keyList.house_type;
							}
							if (keyList.const_year != undefined && keyList.const_year.length > 0) {
								params["const_year"] = keyList.const_year;
							}
							if (keyList.bdspace_from != undefined && keyList.bdspace_from.length > 0) {
								params["bdspace_from"] = keyList.bdspace_from;
							}
							if (keyList.bdspace_to != undefined && keyList.bdspace_to.length > 0) {
								params["bdspace_to"] = keyList.bdspace_to;
							}
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0307") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0307_URL;
							filter = "farm_cnt";
							unit = "가구";
							//title = "농가통계";
							
							params["area_type"] = keyList.area_type;
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0308") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0308_URL;
							filter = "forestry_cnt";
							unit = "가구";
							//title = "임가통계";
							
							params["area_type"] = keyList.area_type;
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0309") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0309_URL;
							filter = "fishery_cnt";
							unit = "가구";
							//title = "어가통계";
							
							params["area_type"] = keyList.area_type;
							params["oga_div"] = keyList.oga_div;
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0310") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0310_URL;
							filter = "population";
							unit = "명";
							//title = "가구원통계";
							
							params["area_type"] = keyList.area_type;
							params["data_type"] = keyList.data_type;

							if (keyList.gender != undefined && keyList.gender.length > 0) {
								params["gender"] = keyList.gender;
							}
							if (keyList.age_from != undefined && keyList.age_from.length > 0) {
								params["age_from"] = keyList.age_from;
							}
							if (keyList.age_to != undefined && keyList.age_to.length > 0) {
								params["age_to"] = keyList.age_to;
							}
							if (keyList.year != null) {
								params["year"] = keyList.year;
							}else {
								params["year"] = "2010";
							}
						}
						
						var year = null;
						if (keyList.year != undefined && keyList.year.lngth > 0) {
							params.year = this.mapList[0].bnd_year
						}

						//파라미터설정
						this.setDetailStatsPanel(this.curSelectedStatsType);
						$("#"+ this.curSelectedStatsType +"StatsBtn").click();
						var shareInfo = {
								api_call_url : url,
								param_info : {
									api_id : api_id,
									isKosis : false,
									mapInfo : {
										center : center,
										zoomlevel : zoom
									},
									paramInfo : params,
									showData : filter,
									title : title,
									unit : unit
								},
								title : title
						};
						
						var tmpShareInfo = [];
						var tmpParams = deepCopy(shareInfo);
						tmpParams.param_info = JSON.stringify(tmpParams.param_info);
						tmpShareInfo.push(tmpParams);
						this.setRevertParams(tmpShareInfo, "search");

						setTimeout(function() {
							$honamMapApi.request.openApiShareForStats(shareInfo);
						},200);
					}
				}
				
				return true;
			},

			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {;
				var html = "<table style='margin:10px;'>";
				var searchYear = "";

				if(this.curDropParams[map.id] != undefined) {
					for(var i = 0; i < this.curDropParams[map.id].param.length; i ++) {
						if (this.curDropParams[map.id].param[i].key == "year") {
							searchYear = this.curDropParams[map.id].param[i].value + "년 ";
						}
					}	
				}
				
				if (type == "data") {
					if (data.info.length > 0) {
						
						//kosis
						if(data.info[2] == "kosis") {
							var html = "<table style='margin:10px;'>";
							if (data.properties.adm_nm !== undefined) {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
							}
							
							if(data.info[0] != null && data.info[0] != undefined && data.info[0] != 'NaN') {
								/*//5미만의 데이터의 경우, N/A처리
								var value;
								if (parseFloat(data.info[0]) < 5) {
									value = "N/A";
								}else {
									value = appendCommaToNumber(data.info[0]);
								}*/
								var value = appendCommaToNumber(data.info[0]);
								html += "<tr><td class='statsData'>"
										+ searchYear + value;
							} else {
								html += "<tr><td class='statsData'>-";
							}
							
							if (data.info[1] != undefined) {
								html += " (" + data.info[1] + ")";
							}
						    html += "</td></tr>";
						}else {
							var showName = {
								"tot_ppltn" : "총인구",
								"tot_ppltn_male" : "총인구(남자)",
								"tot_ppltn_fem" : "총인구(여자)",
								"avg_age" : "평균나이",
								"avg_age_male" : "평균나이(남자)",
								"avg_age_fem" : "평균나이(여자)",
								"ppltn_dnsty" : "인구밀도",
								"aged_child_idx" : "노령화지수",
								"oldage_suprt_per" : "노년부양비",
								"juv_suprt_per" : "유년부양비",
								"tot_suprt_per" : "총부양비",
								"population" : "인구",
								"tot_worker" : "종사자수",
								"corp_cnt" : "사업체수",
								"household_cnt" : "가구수",
								"house_cnt" : "주택수",
								"farm_cnt" : "농가수",
								"forestry_cnt" : "임가수",
								"fishery_cnt" : "어가수"
								
							};
							
							for (var i = 0; i < data.info.length; i++) {
								var tmpData = data.info[i];
								if (i == 0) {
									if (tmpData.adm_nm !== undefined) {
										html += "<tr><td class='admName'>"
											 + tmpData.adm_nm 
											 + "</td></tr>"
											 + "<tr style='height:5px'></tr>";
									}
								}
								
								if (tmpData.showData != undefined && tmpData.showData.length > 0) {
									var filterName = ""; 
									if (showName[tmpData.showData] != undefined) {
										filterName = showName[tmpData.showData];
									}
									html += "<tr>";
									if (filterName.length > 0) {
//										html += "<td class='statsData'>"+map.mapInfo.selectSeriesYear +"년 " + filterName+ "</td>"
										html += "<td class='statsData'>"+searchYear +" " + filterName+ "</td>"
										 	 + "<td>&nbsp;:&nbsp;</td>";
									} else {
										html += "<td class='statsData'>"+searchYear +" </td>"
									 	 + "<td>&nbsp;:&nbsp;</td>";
									}
									
									//5미만의 데이터의 경우, N/A처리
									//인구총괄의 경우, 평균나이, 인구밀도, 노령화지수, 노년부양비, 유년부양비, 총부양비는 제외
									var value;
									if (parseFloat(tmpData[tmpData.showData]) < 5 && 
										tmpData.showData != "avg_age" &&
										tmpData.showData != "ppltn_dnsty" &&
										tmpData.showData != "aged_child_idx" && 
										tmpData.showData != "oldage_suprt_per" &&
										tmpData.showData != "juv_suprt_per" && 
										tmpData.showData != "tot_suprt_per") {
										value = "N/A";
									}else {
										value = appendCommaToNumber(tmpData[tmpData.showData]);
									}
									
									html += "<td>"
										 + value;
									
									if (value != "N/A") {
										html +=  " ("+ tmpData.unit +")";
									}
									
								/*	//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위삭제
									if (tmpData.showData != "aged_child_idx" && 
										tmpData.showData != "oldage_suprt_per" &&
										tmpData.showData != "juv_suprt_per" && 
										tmpData.showData != "tot_suprt_per" && value != "N/A") {
										html +=  " ("+ tmpData.unit +")";
									}*/

									html += "</td></tr>";
								}	
							}
						}
					}else {
						html += "<tr><td class='statsData'>N/A</td></td>";
					}
					
				}else if (type == "build") {
					var info = data.properties;
					var lowest = "";
					var highest = "지상" + Math.abs(info.highest_flr) + "(층)";
					if(info.lowest_flr < 0) {
						lowest = "지하" + Math.abs(info.lowest_flr) + "(층)";	
					}else {
						lowest = "지상" + Math.abs(info.lowest_flr) + "(층)";	
					}
					
					var bd_nm = "";
					if(info.bd_nm != undefined && info.bd_nm.length > 0 ) {
						bd_nm = info.bd_nm;
					}
					html += "<tr><td class='admName'>" + bd_nm + "</td></tr>" 
					     +  "<tr style='height:10px;'></tr>" 
					     +  "<tr><td class='statsData'>" +lowest + " ~ "+ highest +"</td></tr>" 
					     +	"<tr style='height:5px;'></tr>" 
					     +  "<tr><td class='statsData'>" + info.bd_naddr + "</td></tr>";
				}
				html += "</table>";
				
				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo(map.gMap)._showToolTip(event);
				
				$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");

			},
			
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * @date         : 2014. 10. 23. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			requestOpenApi : function(options) {
				options.map.isDrop = true;
				options.map.undoDropLayerBounds();
				
				//param의 adm_cd가 00(전국)일 경우 adm_cd 삭제
				var tmpOptions = [];
				for (var i = 0; i < options.param.length; i ++) {
					if(options.param[i].key == "adm_cd" && options.param[i].value == "00") {
					} else {
						tmpOptions.push(options.param[i]);
					} 
				}
				options.param = tmpOptions;

				var api_id = options.api_id;
				if 	    (api_id == "API_0301") $honamMapApi.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $honamMapApi.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $honamMapApi.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $honamMapApi.request.openApiCompany(options);
				else if (api_id == "API_0305") $honamMapApi.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $honamMapApi.request.openApiHouse(options);
				else if (api_id == "API_0307") $honamMapApi.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $honamMapApi.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $honamMapApi.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $honamMapApi.request.openApiHouseHoldMember(options);
				
			},
			
			
			/**
			 * 
			 * @name         : changeBtnLineColor
			 * @description  : 생성된 버튼의 라인색상을 변경한다. 
			 * @date         : 2014. 10. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param type 	"normal", "kosis", "combine"
			 * @param @param array  버튼리스트
			 * @param @param index  드랍된 버튼의 인덱스정보
			 * @param @param map    드랍된 맵정보
			 */
			changeBtnLineColor : function(type, array, index, map) {
				var tmpLine;
				var color = "/img/im/icon_circle3.png";
				
				//일반버튼 또는 kosis일 경우,
				if (type == "normal" || type == "kosis") {	
					if (map.id == "0") {
						tmpLine = "line_f_";
						color = "/img/im/icon_circle1.png";
					}else {
						tmpLine = "line_s_";
						color = "/img/im/icon_circle2.png";
					}

					for (var i=0; i<array.length; i++) {
						if (array[i].idx == index) { 
							$("#"+ tmpLine + index).attr("src", color);
						}else {
							$("#"+ tmpLine + array[i].idx).attr("src", "/img/im/icon_circle3.png");
						}
					}
					
					for (var i=0;i<$honamMap.ui.combineList.length; i++) {
						$("#c_"+tmpLine + $honamMap.ui.combineList[i].idx).attr("src", "/img/im/icon_circle3.png");
					}
				}
				
				//병합버튼일 경우
				else {
					if (map.id == "0") {
						tmpLine = "c_line_f_";
						color = "/img/im/icon_circle1.png";
					}else {
						tmpLine = "c_line_s_";
						color = "/img/im/icon_circle2.png";
					}
					
					for (var i=0; i<array.length; i++) {
						if (array[i].idx == index) { 
							$("#"+ tmpLine + index).attr("src", color);
						}else {
							$("#"+ tmpLine + array[i].idx).attr("src", "/img/im/icon_circle3.png");
						}
					}
					
					for (var i=0;i<$honamMap.ui.arParamList.length; i++) {
						$("#"+tmpLine.split("c_")[1]+ $honamMap.ui.arParamList[i].idx).attr("src", "/img/im/icon_circle3.png");
					}
				}
				
			},
			
			
			/**
			 * 
			 * @name         : removeBtnLineColor
			 * @description  : 생성된 버튼의 라인색상을 초기화한다.
			 * @date         : 2014. 10. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			removeBtnLineColor : function() {
				//1번 맵 초기화가 이루어졌을 경우,
				if (this.curMapId == 0 ) {
					var isMap1Show = $("#map_area").is(":visible");
					for (var i=0; i<this.arParamList.length; i++) {
						$("#line_f_"+this.arParamList[i].idx).attr("src", "/img/im/icon_circle3.png");
					}
					for (var i=0; i<this.combineList.length; i++) {
						$("#c_line_f_"+this.combineList[i].idx).attr("src", "/img/im/icon_circle3.png");
					}
				}
				
				//2번 맵 초기화가 이루어졌을 경우,
				else {
					var isMap2Show = $("#map_dummy_2").is(":visible");
					for (var i=0; i<this.arParamList.length; i++) {
						$("#line_s_"+this.arParamList[i].idx).attr("src", "/img/im/icon_circle3.png");
					}	
					for (var i=0; i<this.combineList.length; i++) {
						$("#c_line_s_"+this.combineList[i].idx).attr("src", "/img/im/icon_circle3.png");
					}
				}	

			},
			
			/**
			 * 
			 * @name         : keywordSplit
			 * @description  : 통계표 입력문구를 확인 후 검색을 실행한다.
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			keywordSplit : function() {
				if($("#searchStatsText").val() == "") {
					messageAlert.open("알림", "검색어를 입력하세요.");
					return;
					
				} else {
					this.sopCurrentPageIndex = 0;		//SOP 페이징 초기화
					this.kosisCurrentPageIndex = 0;		//KOSIS 페이징 초기화
					
					this.sKeyword = $("#searchStatsText").val();
					this.sKeyword = this.sKeyword.replace(/(^\s*)|(\s*$)/gi, "");
					this.sKeyword = this.sKeyword.replace(/ +/g, " "); 
					var arrayKey = this.sKeyword.split(" ");
					
					this.addressKeyword = arrayKey[0];				 
					this.searchKeyword = arrayKey[1];
					
					if(arrayKey.length < 2) {
						//지오코딩 검색
						$honamMapApi.request.openApiGeocode(this.sKeyword);
						this.searchKeyword = this.sKeyword;
					} else {
						//지오코딩 검색
						$honamMapApi.request.openApiGeocode(this.addressKeyword);	
					}
				}
			},
			
			/**
			 * @name         : sopPaging
			 * @description  : 통계표 SOP 페이징 처리
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @param totalCount  총 개수
			 * @param currentIndex  현재 페이지
			 */
			sopPaging : function(totalCount, currentIndex) {
				var pageSize = 5;						
				var totalPage = Math.ceil( totalCount / pageSize);			
				$('#sopPaging .pages').paging({
					current:currentIndex+1,
					max:totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						$honamMap.ui.sopCurrentPageIndex = page-1;
						$honamMapApi.request.openApiSOP($honamMap.ui.searchKeyword, page-1);
					}
				});
			},
			
			/**
			 * @name         : kosisPaging
			 * @description  : 통계표 KOSIS 페이징 처리
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @param totalCount  총 개수
			 * @param currentIndex  현재 페이지
			 */
			kosisPaging : function(totalCount, currentIndex) {
				var pageSize = 5;
				var totalPage = Math.ceil( totalCount / pageSize);
				$('#kosisPaging .pages').paging({
					current:currentIndex+1,
					max:totalPage,
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						$honamMap.ui.kosisCurrentPageIndex = page-1;
						$honamMapApi.request.openApiKOSIS($honamMap.ui.sKeyword, page-1);
					}
				});
			},
			
			/**
			 * 
			 * @name         : analysisSearchInfo
			 * @description  : 통계표에서 검색된 정보를 분석하여, 통계정보를 조회한다.
			 * @date         : 2015. 01. 09. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param idx    : 순번
			 */
			analysisSearchInfo : function (type, idx) {
				var mapId = getMapDivisionId();		//검색 시 적용 될 지도(맵 분할 시)
				var keyList = new Array();
				if(type == "kosis") {
					keyList = this.searchKosisParam[idx];
				} else {
					keyList = this.searchSOPParam[idx];
				}

				if (keyList.type != undefined) {
					if (keyList.type == "kosis") {
						var gis_se = keyList.gis_se;
						var kosis_tb_id = keyList.kosis_tb_id;
						var adm_cd = keyList.adm_cd;
						var center = [keyList.x, keyList.y];
						var url = "/SOP_Kosis/kosis/ServiceAPI/api/KosisDataList.do";
						var zoom = "0";
						var title = keyList.stat_title;
						
						this.mapList[mapId].setZoom(zoom);
						
						gis_se = gis_se.replace(/(^\s*)|(\s*$)/gi, "");
						gis_se = parseInt(gis_se);
						
						//전국경계
						if(adm_cd == "00" || adm_cd == "") {
							zoom = "2";
							adm_cd = "1";
						} else {
							switch(gis_se) {
							case 1: //전국시도
								zoom = "2";
								if(adm_cd.length >= 2) {
									adm_cd = "1";
								}
								break;

							case 2: //시군구
								zoom = "4"; //5->4
								if(adm_cd.length >= 5) {
									adm_cd = adm_cd.substring(0, 2);
								}
								break;

							case 3: //읍면동 
								zoom = "6"; //7->6
								if(adm_cd.length > 2) {
									adm_cd = adm_cd.substring(0, 5);
								}
								break;
							}
						}
						
						var options = new Array();
						options.push({
							key : "gis_se",
							value : gis_se
						});
						
						options.push({
							key : "tbl_id",
							value : kosis_tb_id
						});
						
						options.push({
							key : "adm_cd",
							value : adm_cd
						});
						
						options.push({
							key : "center",
							value : center
						});
						
						options.push({
							key : "url",
							value : url
						});
						
						options.push({
							key : "zoom",
							value : zoom
						});
						
						options.push({
							key : "title",
							value : title
						});
						
						interactiveMapKosis.getKosisStaticDataFieldForSearchList(kosis_tb_id, options);
						
					} else {
						var api_id = "API_" + keyList.type;
						var adm_cd = keyList.adm_cd;
						var center = [keyList.x, keyList.y];
						var url = "";
						var filter = "";
						var unit = "";
						var title = keyList.title;
						this.curSelectedDetailStatsType = api_id;

						if (adm_cd == null) {
							adm_cd == "00";
							center = [966298, 1898301];
						}
						
						//전국
						if (adm_cd == "00") {
							var zoom = 2;
						}else {
							switch (adm_cd.length) {
							case 2: //시군구
								zoom = 4; //5->4
								break;
							case 5: //읍면동
								zoom = 6; //7->6
								break;
							case 7:	//집계구
								zoom = 9; //10->9
								break;
							default:
								var zoom = 2;
								adm_cd = "00";
								break;
							}

						}		
						
						var params = {
								"adm_cd" : adm_cd,
								"bnd_year" : $("#bndYear").val(),//this.mapList[0].bnd_year,
								"low_search" : "1"
						};

						//url, 해당통계버튼 선택
						if (api_id == "API_0301") {
							this.curSelectedStatsType = "population";
							url = $honamMapApi.request.API_0301_URL;
							filter = keyList.params.showData;
							unit = "명";
							//title = "인구총괄";
							
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0302") {
							this.curSelectedStatsType = "population";
							url = $honamMapApi.request.API_0302_URL;
							filter = "population";
							unit = "명";
							//title = "인구통계세부조건";
							
							params["area_type"] = keyList.params.area_type;
							params["gender"] = keyList.params.gender;
							if (keyList.params.age_from != undefined && keyList.params.age_from.length > 0) {
								params["age_from"] = keyList.params.age_from;
							}
							if (keyList.params.age_to != undefined && keyList.params.age_to.length > 0) {
								params["age_to"] = keyList.params.age_to;
							}
							if (keyList.params.edu_level != undefined && keyList.params.edu_level.length > 0) {
								params["edu_level"] = keyList.params.edu_level;
							}
							if (keyList.params.mrg_state != undefined && keyList.params.mrg_state.length > 0) {
								params["mrg_state"] = keyList.params.mrg_state;
							}

							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0304") {
							this.curSelectedStatsType = "company";
							url = $honamMapApi.request.API_0304_URL;
							filter = "corp_cnt";
							unit = "개";
							//title = "사업체통계";

							params["area_type"] = keyList.params.area_type;
							params["class_code"] = keyList.params.class_code;
							if (keyList.params.class_deg != undefined && keyList.params.class_deg.length > 0) {
								params["class_deg"] = keyList.params.class_deg;
							}
							
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2013";
							}
						}
						else if (api_id == "API_0305") {
							this.curSelectedStatsType = "household";
							url = $honamMapApi.request.API_0305_URL;
							filter = "household_cnt";
							unit = "가구";
							//title = "가구통계";
							
							params["area_type"] = keyList.params.area_type;
							if (keyList.params.household_type != undefined && keyList.params.household_type.length > 0) {
								params["household_type"] = keyList.params.household_type;
							}
							
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0306") {
							this.curSelectedStatsType = "house";
							url = $honamMapApi.request.API_0306_URL;
							filter = "house_cnt";
							unit = "호";
							//title = "주택통계";
							
							params["area_type"] = keyList.params.area_type;
							if (keyList.params.house_type != undefined && keyList.params.house_type.length > 0) {
								params["house_type"] = keyList.params.house_type;
							}
							if (keyList.const_year != undefined && keyList.const_year.length > 0) {
								params["const_year"] = keyList.const_year;
							}
							if (keyList.bdspace_from != undefined && keyList.bdspace_from.length > 0) {
								params["bdspace_from"] = keyList.bdspace_from;
							}
							if (keyList.bdspace_to != undefined && keyList.bdspace_to.length > 0) {
								params["bdspace_to"] = keyList.bdspace_to;
							}
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0307") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0307_URL;
							filter = "farm_cnt";
							unit = "가구";
							//title = "농가통계";
							
							params["area_type"] = keyList.params.area_type;
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0308") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0308_URL;
							filter = "forestry_cnt";
							unit = "가구";
							//title = "임가통계";
							
							params["area_type"] = keyList.params.area_type;
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0309") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0309_URL;
							filter = "fishery_cnt";
							unit = "가구";
							//title = "어가통계";
							
							params["area_type"] = keyList.params.area_type;
							params["oga_div"] = keyList.params.oga_div;
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						else if (api_id == "API_0310") {
							this.curSelectedStatsType = "3f";
							url = $honamMapApi.request.API_0310_URL;
							filter = "population";
							unit = "명";
							//title = "가구원통계";
							
							params["area_type"] = keyList.params.area_type;
							params["data_type"] = keyList.params.data_type;
							if (keyList.gender != undefined && keyList.gender.length > 0) {
								params["gender"] = keyList.gender;
							}
							if (keyList.age_from != undefined && keyList.age_from.length > 0) {
								params["age_from"] = keyList.age_from;
							}
							if (keyList.age_to != undefined && keyList.age_to.length > 0) {
								params["age_to"] = keyList.age_to;
							}
							if (keyList.params.year != null) {
								params["year"] = keyList.params.year;
							}else {
								params["year"] = "2010";
							}
						}
						
						var year = null;
						if (keyList.params.year != undefined && keyList.params.year.lngth > 0) {
							params.year = this.mapList[0].bnd_year
						}
						
						//파라미터설정
						var shareInfo = {
								api_call_url : url,
								param_info : {
									api_id : api_id,
									isKosis : false,
									mapInfo : {
										center : center,
										zoomlevel : zoom
									},
									paramInfo : params,
									showData : filter,
									title : title,
									unit : unit
								},
								title : title
						};
						
						var tmpShareInfo = [];
						var tmpParams = deepCopy(shareInfo);
						tmpParams.param_info = JSON.stringify(tmpParams.param_info);
						tmpShareInfo.push(tmpParams);
						this.setRevertParams(tmpShareInfo, "search");

						setTimeout(function() {
							$honamMap.ui.mapList[mapId].lastGeojsonInfo = null;
							$honamMapApi.request.openApiShareForStats(shareInfo);
						},200);
					}
				}
			},			
			
			/**
			 * @name         : detectSearchBtnCheck
			 * @description  : 검색버튼을 check/uncheck 상태를 체크하여, 전체선택 상태를 변경한다.
			 * @date         : 2015. 03. 26. 
			 * @author	     : 권차욱
			 * @param 
			 */
			detectSearchBtnCheck : function() {
				if ($("#searchBtnResultRgn").find("li:visible").length == 0) {
					$("#checkAllSearchBtn").prop("checked", false);
					return;
				}
				$(".dragItem").find($("input")).click(function() {
					var checkedItems = $(".dragItem").find($("input:checked")).length;
					var cnt = $("#searchBtnResultRgn").find("li:visible").length;
					if (checkedItems != cnt) {
						$("#checkAllSearchBtn").prop("checked", false);
					}else {
						$("#checkAllSearchBtn").prop("checked", true);
					}
				});
			}
				
	};

	// ==============================//
	// map event callback
	// ==============================//
	$honamMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
				$(".sop-marker-pane").css("visibility", "hidden");
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				$(".sop-marker-pane").css("visibility", "visible");
				var poiControl = map.drawControl.controlGroup.poiControl.poi.interactiveMap;
				
				//테마poi조회
				if (poiControl.themeCd != undefined && 
					poiControl.themeCd.length > 0) {
						if (poiControl.mapBounds == null) {
							poiControl.removeMarkers();
							poiControl.requestPoiinfo(
									poiControl.themeCd, 
									"0",
									poiControl.isCenter, 
									poiControl.isRectangle
							);
						}else {
							if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
								poiControl.removeMarkers();
								poiControl.requestPoiinfo(
										poiControl.themeCd, 
										"0",
										poiControl.isCenter, 
										poiControl.isRectangle
								);
							}
						}	
				}
				//산업체 poi조회
				else if (poiControl.companyParams != null) {
					if (map.zoom >= 9) { //10->9
						if (poiControl.mapBounds == null) {
							poiControl.removeMarkers();
							poiControl.requestCompanyPoi(
									poiControl.companyParams, 
									"0"
							);
						}else {
							if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
								poiControl.removeMarkers();
								poiControl.requestCompanyPoi(
										poiControl.companyParams, 
										"0"
								);
							}
						}
					}
					
				}
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				if (map.zoom < 10 && $honamMap.ui.isInnerMapShow) { //11->10
					$honamMap.ui.doInnerMap(map.id+1);
				}

				//사업체 POI 없애기
				if (map.zoom < 10 && map.drawControl.controlGroup.poiControl._isActivated()) {
					messageAlert.open("알림", "해당 레벨에서는 사업체를 볼 수 없습니다.");
					map.drawControl.controlGroup.poiControl.deactivated();
					map.drawControl.controlGroup.poiControl.onRemove();
				}
			},

			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
				var selParams = new Array();
				var noneParams = new Array();
				var api_id = new Array();
				var index = null;
				var filterParam = new Array();
				var unit = new Array();
				var title = new Array();
				var maxYear = new Array();
				// share정보 초기화
				$honamMap.ui.curMapId = map.id;
				$honamMap.ui.shareUrlInfo = [];
				map.dropInfo = null;
				
				$honamMapApi.request.combineFailCnt = 0;
				
				//시계열 초기화
				map.mapInfo.resetTimeSeries();
				
				var id = $("#"+source.prop("id")).find($("table")).attr("id");

				//결합버튼일 경우,
				//기존검색버튼들의 파라미터정보를 세팅한다.
				if (id.indexOf("combine") != -1 ) {
					
					//병합버튼일 경우, 사용자지정영역 비활성화
					//map.drawControl.disableControl("drawControl"); //draw hide
					
					$("#legendColor_"+map.mapInfo.id).find("#legend_auto").prop("disabled", true);
					$("#legendColor_"+map.mapInfo.id).find("#legend_equal").prop("disabled", true);
					$("#legendColor_"+map.mapInfo.id).find("#legend_user").prop("disabled", true);
					$("#legendColor_"+map.mapInfo.id).find("#legend_auto").prop("checked", true);
					
					var tmpParamList = deepCopy($honamMap.ui.combineList);
					$honamMap.ui.searchBtnType = "combine";
					$honamMap.ui.changeBtnLineColor("combine", tmpParamList, id, map);
					for (var i=0; i<$honamMap.ui.combineList.length; i++) {
						if (tmpParamList[i].idx == id) {
							selParams = tmpParamList[i].params;
							noneParams = tmpParamList[i].noneParams;
							api_id = tmpParamList[i].refIds;
							filterParam = tmpParamList[i].filterParam;
							unit = tmpParamList[i].unit;
							title =  tmpParamList[i].title;
							maxYear = tmpParamList[i].maxYear;
							break;
						}
					}	
					
				}
				else if (id.indexOf("cItems") != -1 ) {
					var tmpParamList = deepCopy($honamMap.ui.combineList);
					$honamMap.ui.searchBtnType = "normal";
					$honamMap.ui.changeBtnLineColor("combine", tmpParamList, id, map);
					for (var i=0; i<$honamMap.ui.combineList.length; i++) {
						if (tmpParamList[i].idx == id) {
							var selParams = [];
							for (var x=0; x<tmpParamList[i].params.length; x++) {
								selParams = tmpParamList[i].params[0];
								if (x == 1) {
									for (var y=0; y<tmpParamList[i].params[x].length; y++) {
										if (tmpParamList[i].params[x][y].key != "year" &&
												tmpParamList[i].params[x][y].key != "low_search" &&
												tmpParamList[i].params[x][y].key != "area_type") {
												selParams.push(tmpParamList[i].params[x][y]);
										} 
									}
								}
							}
							selParams.push({"key" : "search_type", "value" : tmpParamList[i].itemType});
							noneParams = tmpParamList[i].noneParams;
							filterParam = "data_cnt";
							unit = tmpParamList[i].unit[0];
							title = tmpParamList[i].title.join(" | ");
							maxYear = tmpParamList[i].maxYear[0];
							api_id = tmpParamList[i].refIds;
						}
					}
					
					if (data.adm_cd.length > 7) {
						data.adm_cd = data.adm_cd.substring(0,7);
					}
					
					var params = {
							param : selParams,
							noneParams : noneParams,
							adm_cd : data.adm_cd,
							filter : filterParam,
							unit : unit,
							title : title,
							api_id : api_id,
							map : map,
							view_type : "NM",
							maxYear : maxYear
					};	

					$honamMap.ui.curDropParams[map.id] = params;
					$honamMapApi.request.openApiItemCombine(params);
					return;
	
				}
				else {
					var tmpParamList = deepCopy($honamMap.ui.arParamList);

					//kosis
					if(id.split("-")[0] == "kosis") {
						var tempAdmCd = data.adm_cd;
						if(tempAdmCd == "00") {
							tempAdmCd = "1";
						}
						var admCdLen = tempAdmCd.length;
						interactiveMapKosis.map = map;
						index = id.split("-")[1];
						$honamMap.ui.changeBtnLineColor("kosis", tmpParamList, index, map);
						
						for(var i = 0; i < tmpParamList.length; i++) {
							if (tmpParamList[i].idx == index) {
								interactiveMapKosis.curSelectedTitle = tmpParamList[i].title;
								selParams.push(tmpParamList[i].params);
								break;
							}
						}

						var switchVal = 1;
						var tempParam = selParams[0];

						for(var i = 0; i < tempParam.length; i++) {
							if(tempParam[i].key == "gis_se") {
								switchVal = parseInt(tempParam[i].value);
								break;
							}
						}

						switch(switchVal) {
						case 1:
							if(admCdLen > 1) {
								messageAlert.open(
										"알림", 
										"현재 데이터는 시도 단위까지만 지원합니다. 지도 레벨을 바꿔 데이터를 보시겠습니까?",  
										function done() {
											map.setZoom(1);
											setTimeout(function() {
												interactiveMapKosis.getKosisDataList(selParams, 1, 1, map);
											}, 500);
										},
										function cancel() {}
								);
							} else {
								map.setZoom(1);
								setTimeout(function() {
									interactiveMapKosis.getKosisDataList(selParams, 1, 1, map);
								}, 500);
							}
							break;

						case 2:
							if(admCdLen > 2) {
								messageAlert.open(
										"알림", 
										"현재 데이터는 시군구 단위까지만 지원합니다. 지도 레벨을 바꿔 데이터를 보시겠습니까?",  
										function done() {
											map.setZoom(3);
											setTimeout(function() {
												interactiveMapKosis.getKosisDataList(selParams, 3, tempAdmCd.substring(0, 2), map);
											}, 500);
										},
										function cancel() {}
								);
							
							} else {
								if(map.zoom <= 1) {
									map.setZoom(1);
									setTimeout(function() {
										interactiveMapKosis.getKosisDataList(selParams, 1, 1, map);
									}, 500);
								} else {
									map.setZoom(3);
									setTimeout(function() {
										interactiveMapKosis.getKosisDataList(selParams, 3, tempAdmCd, map);
									}, 500);
								}
							}
							break;

						case 3:
							if(admCdLen > 5) {
								messageAlert.open(
										"알림", 
										"현재 데이터는 읍면동 단위까지만 지원합니다. 지도 레벨을 바꿔 데이터를 보시겠습니까?",  
										function done() {
											map.setZoom(4); //5->4
											setTimeout(function() {
												interactiveMapKosis.getKosisDataList(selParams, 4, tempAdmCd.substring(0, 5), map);
											}, 500);
										},
										function cancel() {}
								);
							} else {
								if(map.zoom <= 1) {
									map.setZoom(1);
									setTimeout(function() {
										interactiveMapKosis.getKosisDataList(selParams, 1, 1, map);
									}, 500);
								} else if(map.zoom > 1 && map.zoom <= 3) { //4->3
									map.setZoom(3);
									setTimeout(function() {
										interactiveMapKosis.getKosisDataList(selParams, 3, tempAdmCd, map);
									}, 500);
								} else {
									map.setZoom(4); //5->4
									setTimeout(function() {
										interactiveMapKosis.getKosisDataList(selParams, 4, tempAdmCd, map);
									}, 500);
								}
							}
							break;

						default:
							interactiveMapKosis.getKosisDataList(selParams, null, tempAdmCd, map);
							break;
						}

						return;
					} else {
						map.bnd_year = $("#bndYear").val();
						$honamMap.ui.searchBtnType = "normal";
						api_id.push(id.split("-")[0]);
						index = id.split("-")[1];
						$honamMap.ui.changeBtnLineColor("normal", tmpParamList, index, map);
						
						$("#legendColor_"+map.mapInfo.id).find("#legend_auto").prop("disabled", false);
						$("#legendColor_"+map.mapInfo.id).find("#legend_equal").prop("disabled", false);
						$("#legendColor_"+map.mapInfo.id).find("#legend_user").prop("disabled", false);

						for (var i=0; i<tmpParamList.length; i++) {
							if (tmpParamList[i].idx == index) { //=> 0302_1 형태
								selParams.push(tmpParamList[i].params);
								noneParams.push(tmpParamList[i].noneParams);
								filterParam.push(tmpParamList[i].filterParam);
								unit.push(tmpParamList[i].unit);
								title.push(tmpParamList[i].title);
								maxYear.push(tmpParamList[i].maxYear);
								break;
							}
						}
					}
				}
				
				if (data.adm_cd.length > 7) {
					data.adm_cd = data.adm_cd.substring(0,7);
				}
	
				// 현재 드랍된 행정동코드 저장
				$honamMap.ui.curAdmCode = data.adm_cd;

				for (var i = 0; i < api_id.length; i++) {
					if (selParams.length > 0) {				
						var params = {
								param : selParams[i],
								noneParams : noneParams[i],
								adm_cd : data.adm_cd,
								filter : filterParam[i],
								unit : unit[i],
								title : title[i],
								api_id : api_id[i],
								map : map,
								view_type : "NM",
								maxYear : maxYear[i]
						};	
						$honamMap.ui.curDropParams[map.id] = params;
						$honamMap.ui.requestOpenApi(params);
					}
				}
			},

			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOverPolygon : function(event, data, type, map) {	
				if (type != "polygon") {
					if (type == "data") {
						//차트및범례 하이라이트
						if (data.info.length > 0) {
							map.mapInfo.selectChartData(data.properties, data.dataIdx);
							map.mapInfo.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$honamMap.ui.createInfoTooltip(event, data, type, map);
				}
			},

			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
			},

			
			/**
			 * 
			 * @name         : didSelectedPolygon
			 * @description  : 해당경계 선택 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didSelectedPolygon : function(event, data, type, map) {
				if (type == "data") {
					// 차트 하이라이트 효과
					//map.mapInfo.selectChartData(data.properties, data.dataIdx);
					// 범례 하이라이트 효과
					//map.mapInfo.selectLegendRangeData(event.target.options.fillColor);
					
				}else if (type == "build") {
					if ($honamMap.ui.buildPopup != null) {
						$honamMap.ui.buildPopup.close();
					}
					
					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
							   $("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$honamMap.ui.buildPopup = 
						window.open(
							"/html/indoor/indoorMap.html?sufid=" + data.properties.sufid, 
							"건물상세정보",
							"top="+top+", left="+left+", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);
					
				}else {
					
				}

			},

			
			/**
			 * 
			 * @name         : didDrawCreate
			 * @description  : 사용자지정 draw 이벤트콜백
			 * @date         : 2014. 10. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param event 이벤트객체
			 * @param @param type  객체타입
			 * @param @param map   델리케이트
			 */
			didDrawCreate : function(event, type, map) {
				var layer = event.layer;
				var area = "";
				if(type == "polygon") {
					area = "POLYGON((";
					for(var i = 0; i < layer.getUTMKs().length; i++) {
						area += layer.getUTMKs()[i].x + " " + 
								 layer.getUTMKs()[i].y + ",";
						
						if(i == layer.getUTMKs().length - 1) {
							area += layer.getUTMKs()[0].x + " " + 
							         layer.getUTMKs()[0].y;
						}
					}
					area += "))";
				}
				else if(type == "circle") {
					area = "CIRCLE(" + 
						    	layer._utmk.x + " " + 
						    	layer._utmk.y + "," + 
						    	layer.getRadius()+ 
						    ")";
				}
				else if(type == "rectangle") {
					area = "RECTANGLE(" +
								layer._utmks[0].x + " " + 
								layer._utmks[0].y + "," + 
								layer._utmks[2].x + " " +
								layer._utmks[2].y + 
							")";
				}

				var curParams = $honamMap.ui.curDropParams[map.id];
				$honamMapApi.request.openApiUserDrawForStats(curParams, area, event);	
			}

	};
	
	
	$honamMap.event = {
			
		/**
		 * 
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2014. 10. 15. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param
		 */	
		setUIEvent : function() {
			//인구통계버튼 선택
			$honamMap.ui.setDetailStatsPanel("office");
			
			$honamMap.ui.panelGroup = {
					"office" : ["A", "A1"],
					"research"  : ["B", "B1"],
					"person" 	 : ["C", "C1"],
			};
			
			//통계서브메뉴 show/hide
			$(".map_ct_tit").click(function() {
				var subPanel =  $("#" + $(this).parent().attr("id") + " .map_ct_controll");
				var view = subPanel.is(":visible");
				if(view) {
					$honamMap.ui.curSelectedDetailStatsType = null;
					subPanel.hide();	
				} else {
					$honamMap.ui.curSelectedDetailStatsType = $(this).parent().attr("id");
					subPanel.show();
					
					/*//선택된 하나의 메뉴를 제외한 나머지는 hide한다.
					var type = $honamMap.ui.curSelectedStatsType;
					var cnt = $honamMap.ui.panelGroup[type].length;
					for (var i=0; i<cnt; i++) {
						var id = $honamMap.ui.panelGroup[type][i];
						if(id != $(this).parent().attr("id")) {
							$("#"+ id).find($(".map_ct_controll")).hide();
						}
					}*/
				}
			});

			
			$("#office").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#office").find("input:checked").length;
					if (cnt == 0) {
						$(this).prop("checked", true);
						messageAlert.open(
								"알림", 
								"관할사무소는 반드시 하나 이상 선택하여야 합니다."
						);
					}
				});
			});
			
			
			$("#rsc").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#rsc").find("input:checked").length;
					if (cnt == 0) {
						$(this).prop("checked", true);
						messageAlert.open(
								"알림", 
								"조사부문은 반드시 하나 이상 선택하여야 합니다."
						);
					}
				});
			});
			
			
			/** ********* 인구통계 start ********* */
			
			$("#populationAgeFrom").attr("disabled", "disabled"); 
			$("#populationAgeTo").attr("disabled", "disabled"); 
			$("#populationEduLevel").attr("disabled", "disabled"); 
			$("#populationEduFinish").attr("disabled", "disabled"); 
			$("#slider-range").slider("disable"); 
			
			//연령
			$("#populationAgeIgnore").find($("input")).click(function() {
				var isCheck = $(this).is(":checked");
				if (!isCheck) {
					$("#populationAgeFrom").attr("disabled", "disabled"); 
					$("#populationAgeTo").attr("disabled", "disabled"); 
					$("#slider-range").slider("disable"); 
				}else {
					$("#populationAgeFrom").removeAttr("disabled"); 
					$("#populationAgeTo").removeAttr("disabled", "disabled");
					$("#slider-range").slider("enable"); 
				}
			});
			
			//교육정도
			$("#populationEduLevelIgnore").find($("input")).click(function() {
				var isCheck = $(this).is(":checked");
				if (!isCheck) {
					$("#populationEduLevel").attr("disabled", "disabled"); 
					$("#populationEduFinish").attr("disabled", "disabled"); 
				}else {
					$("#populationEduLevel").removeAttr("disabled");  
					$("#populationEduFinish").removeAttr("disabled"); 
				}
			});
			
			$("#populationEduLevel").change(function() {
				if ($(this).val() == "1") {
					$("#populationEduFinish").val(""); 
				}
			});
			
			
			
			//연령별인구
			for (var i=0; i<=101; i++) {
				var tmpText = i+"세";
				if (i == 101) {
					tmpText = "100+"
				}
				$("#populationAgeFrom").append($("<option>", { 
			        value: i,
			        text : tmpText
			    }));
				$("#populationAgeTo").append($("<option>", { 
			        value: i,
			        text : tmpText
			    }));
			}
			//연령별인구-slider
			$("#slider-range").slider({
				range: true,
			    min: 0,
			    max: 100,
			    step : 1,
			    values : [20, 50],
				slide : function(e, ui) {
					$("#populationAgeFrom").val(ui.values[0]);
					$("#populationAgeTo").val(ui.values[1]);					
				}
			});
			$("#populationAgeFrom").val("20");
			$("#populationAgeTo").val("50");
			$("#populationAgeFrom").change(function(){
				var ageTo = $("#populationAgeTo").val();
				if (parseInt($(this).val()) > parseInt(ageTo)) {
					$(this).val(ageTo);
				}
				$("#slider-range").slider("values", 0, $(this).val());
			});

			$("#populationAgeTo").change(function(){
				var ageFrom = $("#populationAgeFrom").val();
				if (parseInt($(this).val()) < parseInt(ageFrom)) {
					$(this).val(ageFrom);
				}
				$("#slider-range").slider("values", 1,  $(this).val());
			});
			
			$("#populationGender").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#populationGender").find("input:checked").length;
					if (cnt == 0) {
						$(this).prop("checked", true);
						messageAlert.open(
								"알림", 
								"성별은 반드시 하나 이상 선택하여야 합니다."
						);
					}
				});
			});
			
			$("#populationMrgState").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#populationMrgState").find("input:checked").length;
					if (cnt > 3) {
						$(this).prop("checked", false);
						messageAlert.open("알림", "혼인상태는 최대 3개까지 선택할 수 있습니다.");
					}
				});
			});
			
			/** ********* 인구통계 end ********* */

			/** ********* 가구통계 start ********* */
			$("#householdType").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#householdType").find("input:checked").length;
					if (cnt > 3) {
						$(this).prop("checked", false);
						messageAlert.open("알림", "세대구성별 가구는 최대 3개까지 선택할 수 있습니다.");
					}
				});
			});
			
			$("#householdOcptnType").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#householdOcptnType").find("input:checked").length;
					if (cnt > 3) {
						$(this).prop("checked", false);
						messageAlert.open("알림", "점유형태별 가구는 최대 3개까지 선택할 수 있습니다.");
					}
				});
			});
			/** ********* 가구통계 end ********* */
			
			/** ********* 주택통계 start ********* */
			$("#houseBdspaceFrom").attr("disabled", "disabled"); 
			$("#houseBdspaceTo").attr("disabled", "disabled"); 
			$("#slider-range2").slider("disable"); 
			
			$("#houseBdspaceIgnore").find($("input")).click(function() {
				var isCheck = $(this).is(":checked");
				if (!isCheck) {
					$("#houseBdspaceFrom").attr("disabled", "disabled"); 
					$("#houseBdspaceTo").attr("disabled", "disabled"); 
					$("#slider-range2").slider("disable"); 
				}else {
					$("#houseBdspaceFrom").removeAttr("disabled"); 
					$("#houseBdspaceTo").removeAttr("disabled", "disabled");
					$("#slider-range2").slider("enable"); 
				}
			});
			
			
			//건축면적
			for (var i=1; i<=301; i++) {
				var tmpText = i+"㎥";
				if (i == 301) {
					tmpText = "300+"
				}
				
				$("#houseBdspaceFrom").append($("<option>", { 
			        value: i,
			        text : tmpText
			    }));
				$("#houseBdspaceTo").append($("<option>", { 
			        value: i,
			        text : tmpText
			    }));
			}
			
			$("#slider-range2").slider({
				range: true,
			    min: 1,
			    max: 300,
			    values : [60, 85],
				slide : function(e, ui) {
					$("#houseBdspaceFrom").val(ui.values[0]);
					$("#houseBdspaceTo").val(ui.values[1]);					
				}
			});
			$("#houseBdspaceFrom").val("60");
			$("#houseBdspaceTo").val("85");
			$("#houseBdspaceFrom").change(function(){
				var spaceTo = $("#houseBdspaceTo").val();
				if (parseInt($(this).val()) > parseInt(spaceTo)) {
					$(this).val(spaceTo);
				}
				$("#slider-range2").slider("values", 0, $(this).val());
			});
			$("#houseBdspaceTo").change(function(){
				var spaceFrom = $("#houseBdspaceFrom").val();
				if (parseInt($(this).val()) < parseInt(spaceFrom)) {
					$(this).val(spaceFrom);
				}
				$("#slider-range2").slider("values", 1,  $(this).val());
			});
			
			//주택유형갯수체크
			$("#houseType").find($("input")).each(function(index) {
				$(this).click(function() {
					var cnt = $("#houseType").find($("input:checked")).length;
					if (cnt > 3) {
						$(this).prop("checked", false);
						messageAlert.open("알림", "주택유형은 최대3개까지 선택할 수 있습니다.");
					}
				});
			});
			/** ********* 주택통계 end ********* */
			
			/** ********* 가구원통계 start ********* */
			$("#3fAgeFrom").attr("disabled", "disabled"); 
			$("#3fAgeTo").attr("disabled", "disabled"); 
			$("#houseConstYear").attr("disabled", "disabled"); 
			$("#slider-range3").slider("disable"); 
			
			$("#3fAgeIgnore").find($("input")).click(function() {
				var isCheck = $(this).is(":checked");
				if (!isCheck) {
					$("#3fAgeFrom").attr("disabled", "disabled"); 
					$("#3fAgeTo").attr("disabled", "disabled"); 
					$("#slider-range3").slider("disable"); 
				}else {
					$("#3fAgeFrom").removeAttr("disabled"); 
					$("#3fAgeTo").removeAttr("disabled", "disabled");
					$("#slider-range3").slider("enable"); 
				}
			});
			
			//건축년도
			$("#houseConstYearIgnore").find($("input")).click(function() {
				var isCheck = $(this).is(":checked");
				if (!isCheck) {
					$("#houseConstYear").attr("disabled", "disabled"); 
				}else {
					$("#houseConstYear").removeAttr("disabled"); 
				}
			});
			
			//연령별인구
			for (var i=0; i<=101; i++) {
				var tmpText = i+"세";
				if (i == 101) {
					tmpText = "100+"
				}
				$("#3fAgeFrom").append($("<option>", { 
			        value: i,
			        text : tmpText
			    }));
				$("#3fAgeTo").append($("<option>", { 
			        value: i,
			        text : tmpText
			    }));
			}
			
			$("#slider-range3").slider({
				range: true,
			    min: 0,
			    max: 100,
			    step : 1,
			    values : [20, 50],
				slide : function(e, ui) {
					$("#3fAgeFrom").val(ui.values[0]);
					$("#3fAgeTo").val(ui.values[1]);					
				}
			});
			$("#3fAgeFrom").val("20");
			$("#3fAgeTo").val("50");
			$("#3fAgeFrom").change(function(){
				var ageTo = $("#3fAgeTo").val();
				if (parseInt($(this).val()) > parseInt(ageTo)) {
					$(this).val(ageTo);
				}
				$("#slider-range3").slider("values", 0, $(this).val());
			});

			$("#3fAgeTo").change(function(){
				var ageFrom = $("#3fAgeFrom").val();
				if (parseInt($(this).val()) < parseInt(ageFrom)) {
					$(this).val(ageFrom);
				}
				$("#slider-range3").slider("values", 1,  $(this).val());
			});
			/** ********* 가구원통계 end ********* */
			
			/** ********* 농가어가 가구통계 start ********* */
			//농림어가통계선택
			$("#3fConditionType").change(function() {
				var type = $("#3fConditionType").find($("input:checked"));
				if (type.val() == "fishery_cnt") {
					$("#3fOgaType").parent().show();
				}else {
					$("#3fOgaType").parent().hide();
				}
			});
			
			$("#3fConditionType").find($("input")).change(function() {
				$honamMap.ui.curSelectedDetailStatsType = "API_0307";
			});
			$("#3fOgaType").find($("input")).change(function() {
				$honamMap.ui.curSelectedDetailStatsType = "API_0307";
			});
			
			$("#3fGender").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#3fGender").find("input:checked").length;
					if (cnt == 0) {
						$(this).prop("checked", true);
						messageAlert.open(
								"알림", 
								"성별은 반드시 하나 이상 선택하여야 합니다."
						);
					}
				});
			});
			/** ********* 농가어가 가구통계 end ********* */
			
			/** ********* 사업체테마통계 start ********* */
			$("#companyThemeCode").attr("disabled", "disabled");
			$("#companyThemeDetailCode").attr("disabled", "disabled");
			
			
			//테마유형
			$("#companyThemeCodeIgnore").find($("input")).click(function() {
				var isCheck = $(this).is(":checked");
				if (!isCheck) {
					$("#companyThemeCode").attr("disabled", "disabled"); 
					$("#companyThemeDetailCode").attr("disabled", "disabled");
					//$("#companyPoiView").find($("input")).attr("checked", false);
				}else {
					$("#companyThemeCode").removeAttr("disabled"); 
					$("#companyThemeDetailCode").removeAttr("disabled", "disabled"); 
				}
			});
			
/*			//POI표출
			$("#companyPoiView").find($("input")).click(function() {
				var isCheck = $(this).is(":checked");
				if(isCheck) {	//POI표출이 활성화 되면 '무관' 체크박스 해제
					if($("#companyThemeCodeIgnore").find($("input")).is(":checked")) {
						$("#companyThemeCodeIgnore").find($("input")).trigger("click");
					}
				}
			});*/
			
			var data = [
					{text : "미선택" , value : ""},
					{text : "인테리어" , value : "01"},
					{text : "철물점" , value : "02"},
					{text : "서점" , value : "03"},
					{text : "문구점" , value : "04"},
					{text : "화장품/방향제" , value : "05"},
					{text : "꽃집" , value : "06"},
					{text : "이발소" , value : "07"},
					{text : "미용실" , value : "08"},
					{text : "세탁소" , value : "09"},
					{text : "극장/영화관" , value : "10"},
					{text : "금융" , value : "11"},
					{text : "의료" , value : "12"},
					{text : "PC방/노래방" , value : "13"},
					{text : "기타" , value : "00"}
				];
			for (var i=0; i<data.length; i++) {
				$("#companyThemeDetailCode").append($("<option>", { 
			        value: data[i].value,
			        text : data[i].text
			    }));
			}
			
			$("#companyThemeCode").change(function() {
				//options제거
				$("#companyThemeDetailCode")
				.find("option")
				.remove()
				.end();

				if($(this).val() == "" ) {
					
				}else {
					var data = [];
					var code = parseInt($(this).val());
					switch(code) {
						//생활편의
						case 10:
							data = [
								{text : "미선택" , value : ""},
								{text : "인테리어" , value : "01"},
								{text : "철물점" , value : "02"},
								{text : "서점" , value : "03"},
								{text : "문구점" , value : "04"},
								{text : "화장품/방향제" , value : "05"},
								{text : "꽃집" , value : "06"},
								{text : "이발소" , value : "07"},
								{text : "미용실" , value : "08"},
								{text : "세탁소" , value : "09"},
								{text : "극장/영화관" , value : "10"},
								{text : "금융" , value : "11"},
								{text : "의료" , value : "12"},
								{text : "PC방/노래방" , value : "13"},
								{text : "기타" , value : "00"}
							];
							break;
							
						//쇼핑	
						case 20:
							data = [
								{text : "미선택" , value : ""},
								{text : "백화점" , value : "01"},
								{text : "중대형마트" , value : "02"},
								{text : "편의점" , value : "03"},
								{text : "식료품점" , value : "04"},
								{text : "의류" , value : "06"},
								{text : "기타" , value : "00"}
							];
							break;
							
						//교통	
						case 30:
							data = [
								{text : "미선택" , value : ""},
								{text : "지하철역" , value : "01"},
								{text : "터미널" , value : "02"},
								{text : "기타" , value : "00"}
							];
							break;
							
						//숙박	
						case 40:
							data = [
								{text : "미선택" , value : ""},
								{text : "호텔" , value : "01"},
								{text : "여관" , value : "02"},
								{text : "기타" , value : "00"}
							];
							break;
							
						//음식점	
						case 50:
							data = [
								{text : "미선택" , value : ""},
								{text : "한식" , value : "01"},
								{text : "중식" , value : "02"},
								{text : "일식" , value : "03"},
								{text : "분식" , value : "04"},
								{text : "서양식" , value : "05"},
								{text : "제과점" , value : "06"},
								{text : "패스트푸드" , value : "07"},
								{text : "치킨" , value : "08"},
								{text : "호프 및 간이주점" , value : "09"},
								{text : "카페" , value : "10"},
								{text : "기타 외국식" , value : "11"},
								{text : "기타" , value : "00"}
							];
							break;
							
						//공공	
						case 60:
							data = [
								{text : "미선택" , value : ""},
								{text : "우체국" , value : "01"},
								{text : "행정기관" , value : "02"},
								{text : "경찰/지구대" , value : "03"},
								{text : "소방서" , value : "04"},
								{text : "기타" , value : "00"}
							];
							break;
							
						//교육	
						case 70:
							data = [
								{text : "미선택" , value : ""},
								{text : "초등학교" , value : "01"},
								{text : "중학교" , value : "02"},
								{text : "고등학교" , value : "03"},
								{text : "전문대학" , value : "04"},
								{text : "대학교" , value : "05"},
								{text : "대학원" , value : "06"},
								{text : "어린이보육원" , value : "07"},
								{text : "기타" , value : "00"}
							];
							break;
							
						//기업	
						case 80:
							data = [
								{text : "미선택" , value : ""},
								{text : "제조/화학" , value : "01"},
								{text : "서비스" , value : "02"},
								{text : "통신/IT" , value : "03"},
								{text : "건설" , value : "04"},
								{text : "판매/유통" , value : "05"},
								{text : "기타" , value : "00"}
							];
							break;
					}

					for (var i=0; i<data.length; i++) {
						$("#companyThemeDetailCode").append($("<option>", { 
					        value: data[i].value,
					        text : data[i].text
					    }));
					}
				}
			});
			
			//산업체분류 차수
			$("#companyClassType").find($("input")).change(function() {;
				var classDeg = $(this).val();
				$honamMap.ui.companyTree = null;
				$honamMap.ui.curSelectedCompanyNode = null;
				$honamMapApi.request.openApiInterstryCode(0, classDeg, null);
			});
			
			/** ********* 사업체테마통계 end ********* */
			
			/** ********* 로그인 start ********* */
			//로그인정보창 로그인버튼선택
			$(".login_btn").click(function() {
				var id = $(".plogin_id").val();
				var pwd = $(".plogin_pw").val();
				if (id.length > 0 && pwd.length > 0) {
					$honamMapApi.request.openApiLoginProcess(id, pwd);
				}else {
					messageAlert.open("로그인", "아이디 또는 비밀번호를 입력하세요.");
				}
				
			});	
			
			$(".btn_close_b").click(function() {
				$(".deem").hide();
				$(".login_pop").hide();
			});
			/** ********* 로그인 end ********* */
			
			//ie8,9일 경우, 엑셀업로드 폼 구성
		    if(browserFnc() != -1 && browserFnc() < 10) {
		    	$("#filePathField").hide();
		    	$("#fileBtn").remove();
		    }else {
		    	$("#uploadForm > .inputbox01 > #fileSearch").remove();
		    }
			
			/** ********** 파일업로드 start ********* */
			$("#fileSearchBtn").click(function() {
				$("#fileSearch").click();
			});
			
			$("#uploadFileBtn").click(function() {
				if ($("#filePathField").val().length > 0) {
					$("#uploadForm").ajaxForm({
						async: false,
						type : "POST",
						url : contextPath + "/ServiceAPI/map/excelupload.form",
						dataType: "json",
						encoding: "utf-8",
						beforeSubmit: function(data, frm, opt) {
							var ext = $('#fileSearch').val().split('.').pop().toLowerCase();
							if($.inArray(ext, ['xlsx','xls']) == -1) {
								messageAlert.open("알림", "엑셀파일만 첨부하실 수 있습니다.");
								return false;
							}
							return true;
						},
						success: function(data) {
							if(data.errCd == "0") {
								var map = $honamMap.ui.mapList[$honamMap.ui.curMapId];
								var mapInfo = map.mapInfo;
								mapInfo.updateUserUploadFile(data, "intr");
							} else {
								messageAlert.open("알림", data.errMsg);
							}						
				        },
				        complete: function() {
				        	$("#fileSearch").val("");
							$("#filePathField").val("");
							$("#uploadFile").hide();
							$(".deem").hide();
				        },
				        error: function(xhr, textStatus, error) {
				        	messageAlert.open("알림", "지정된 양식을 사용하여 업로드 해주세요.");
				        }
					}).submit();
				}else {
					 messageAlert.open("알림", "파일을 첨부해주세요.");
				}
				
			});
			
			$("#fileSearch").change(function() {
			    var value = $(this).val();
				var fileName = value.substring(value.lastIndexOf('\\') + 1);
				$("#filePathField").val(fileName);
			});
			/** ********** 파일업로드 end ********* */
			
			$("#downUserDataForm").click(function() {
				var target;

		        target = $('body');
		        target.prepend("<form id='tempForm'></form>");

		        target = $('#tempForm');
		        target.attr("method", "post");
		        target.attr("style", "top:-3333333333px;");
		        target.attr("action", contextPath + "/ServiceAPI/board/downloadFile.download");
		        target.append("<input type='hidden' id='file_id'>");
		        target.append("<input type='hidden' id='file_nm'>");
		        target.append("<input type='hidden' id='file_path'>");
		        target.append("<input type='hidden' id='file_extension'>");
		        target.append("<input type='hidden' id='file_content_type'>");

		        target = $('#file_id');
		        target.attr('name', 'file_id');
		        target.attr('value', "tempUserForm");

		        target = $('#file_nm');
		        target.attr('name', 'file_nm');
		        target.attr('value', "temp");
		        
		        target = $('#file_path');
		        target.attr('name', 'file_path');
		        target.attr('value', "temp");

		        target = $('#file_extension');
		        target.attr('name', 'file_extension');
		        target.attr('value', "temp");
		        
		        target = $('#file_content_type');
		        target.attr('name', 'file_content_type');
		        target.attr('value', "temp");

		        $('#tempForm').submit();
		        $('#tempForm').remove();
			});
			
			$("#checkAllSearchBtn").click(function() {
				var items = $(".dragItem").find($("input"));
				if (items.length == 0) {
					$(this).prop("checked", false);
					return;
				}
				
				if ($(this).is(":checked")) {
					$(".dragItem").find($("input")).prop("checked", true);
					$(".dragItem").find($("input")).click(function() {
						var items = $(".dragItem").find($("input"));
						var checkItems = $(".dragItem").find($("input:checked"));
						if (items.length != checkItems.length) {
							$("#checkAllSearchBtn").prop("checked", false);
						}else {
							$("#checkAllSearchBtn").prop("checked", true);
						}
					});
				}else {
					$(".dragItem").find($("input")).prop("checked", false);
				}
			});
			
		}
	};
	

}(window, document));

function getSession() {

};