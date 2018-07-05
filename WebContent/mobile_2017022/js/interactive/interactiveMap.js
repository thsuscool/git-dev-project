/**
 * 인터랙티브맵 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
var communityPath = contextPath+"/mobile/html/community/mapPrtcpntRegist";
(function(W, D) {
	W.$interactiveMap = W.$interactiveMap || {};
	var isDraggable = false;
	var commonZoomLevel = "9";
	$(document).ready(function() {
	    $("#admSelect_mapNavi_1").change(function(){
	    	$interactiveMap.ui.enableResearch();	
	    });
		$interactiveMap.ui.createMap("mapRgn_1", 0); // 맵 생성
		$interactiveMap.event.setUIEvent(); //UI에 사용되는 이벤트를 설정한다.
		var mapNavi1 = new mapNavigation.UI();
		//공유/통계히스토리 정보분석	
		if ($interactiveMap.ui.analysisShareInfo(getAllParameter())) {
			mapNavi1.firstBoolean = false;
		} else {
			mapNavi1.firstBoolean = true;
		}
		mapNavi1.create("mapNavi_1", 1, $interactiveMap.ui);
	});

	$interactiveMap.ui = {
		searchbtnCnt: 0, // 버튼생성 카운트
		curSelectedStatsType: "population", // 현재 선택된 통계분류(인구, 가구, 사업체통계 등)
		curSelectedDetailStatsType: null, // 현재 선택된 통계상세분류(인구총괄, 인구세부조건검색 등)
		arParamList: [], // 생성된 조회버튼에 매칭된 파라미터 정보배열
		data: null,
		curAdmCode: null,
		combineList: [],
		searchBtnType: "normal",
		shareUrlInfo: [],
		shareUrlInfoList: [],
		share_type: "BMARK",
		mapList: [],
		curMapId: null,
		isInnerMapShow: false,
		curDropParams: [],
		buildPopup: null,
		panelGroup: [],
		companyTree: null,
		curSelectedCompanyNode: null,
		sKeyword: null, //전체 검색어
		addressKeyword: null, //검색어의 앞단어(주소)
		searchKeyword: null, //검색어의 뒷단어(검색어)
		addressAdmCd: "00", //검색어의 앞단어(주소) code
		x: "989674", //X좌표
		y: "1818313", //Y좌표
		sopCurrentPageIndex: 0, //통계표 검색 SOP 현재 페이지
		kosisCurrentPageIndex: 0, //통계표 검색 KOSIS 현재 페이지
		searchSOPParam: [], //통계표 검색 SOP 파라미터 정보
		searchKosisParam: [], //통계표 검색 KOSIS 파라미터 정보
		saveObject: {
			save: false,
			restat: false,
			event: null,
			data: null,
			map: null,
			element: null,
			center: {
				full_addr: null,
				adm_cd: null,
				x: null,
				y: null
			},
			preThat: null
		},
		companyDepth: 1,
		companyArray: [],
		/**
		 * 
		 * @name         : createMap
		 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 * @date         : 2014. 10. 11. 
		 * @author	     : 권차욱, 김성현
		 * @history 	 :
		 */
		createMap: function(id, seq) {
			$interactiveMap.ui.curMapId = seq;
			if (this.mapList[seq] !== undefined) {
				this.mapList[seq].gMap.remove();
			}

			var map = new sMap.map();
			map.createMap($interactiveMap, id, {
				center: [989674, 1818313],
				zoom: 8, //9->8
				measureControl: false
			});
			map.id = seq;

			// 이벤트 추가
			map.addControlEvent("drop", {
				accept: ".dragItem"
			});
			map.addControlEvent("movestart");
			map.addControlEvent("moveend");
			map.addControlEvent("zoomend");
			map.addControlEvent("draw");

			var mapInfo = new sMapInfo.mapInfo(map);
			map.mapInfo = mapInfo;

			mapInfo.initialize($interactiveMap.ui);
			if(location.pathname.indexOf(communityPath)==-1){
				mapInfo.createSearchTitle(); //타이틀 추가
				mapInfo.createLegend(); // 범례 추가
				mapInfo.createLegendColor(); // 범례설정 추가
				mapInfo.createPieChart(); // 원형차트 추가
				mapInfo.createBarChart(); // 막대차트 추가
				mapInfo.topButton(); //상단의 버튼 클릭 이벤트
			}
			mapInfo.colorPickerSet(); // 최초 컬러픽커 설정
			
			map.createCurrentLocationButton();// 현재위치
			var zoomControl = map.gMap.zoomControl;
			zoomControl.setPosition("topleft");
			map.createPoiControl("interactive");//poi 표출 및 삭제
			
			if(location.pathname.indexOf(communityPath)>-1){
				map.createColorControlButton("community");// 통계지도
				map.createMapSizeControlButton("community");//지도 확대 및 축소
			}
			if(location.pathname.indexOf(communityPath)==-1){
				map.createBookmarkShareControl();//북마크 및 공유 버튼
			}

			if (map.isMeasureControl) {
				//줌컨트롤 위치지정
				var measureControl = map.gMap.measureControl;
				measureControl.setPosition("topleft");
			}
			if(location.pathname.indexOf(communityPath)==-1){
				map.createMapSizeControlButton("interactive");//지도 확대 및 축소
			}
			if (document.location.href == "http://211.41.186.149/html/interactive/interactiveMap.html" || document.location.href == "http://211.41.186.149:8080/html/interactive/interactiveMap.html") { //개발서버이고 interactiveMap일 경우만 오픈
				map.drawControl.disableControl("drawControl"); //draw hide
			}

			//사용자지정컨트롤설정
			this.mapList[seq] = map;

			$("#barchart-button").click(function() {
				$("#barchart-button").attr("src", "/mobile/img/im/btn_graphplot_mobile_on.png");
				$("#piechart-button").attr("src", "/mobile/img/im/btn_graph_mobile_off.png");
				$("#barchart-area").show();
				$("#piechart-area").hide();
			});
			$("#piechart-button").click(function() {
				$("#barchart-button").attr("src", "/mobile/img/im/btn_graphplot_mobile_off.png");
				$("#piechart-button").attr("src", "/mobile/img/im/btn_graph_mobile_on.png");
				$("#barchart-area").hide();
				$("#piechart-area").show();
			});
		},


		/**
		 * 
		 * @name         : addSearchBtn
		 * @description  : 조건검색버튼을 생성한다.
		 * @date         : 2014. 10. 11. 
		 * @author	     : 권차욱, 석진혁
		 * @history 	 :
		 */
		addSearchBtn: function() {
			if (this.curSelectedStatsType == "kosis") {
				if (interactiveMapKosis.kosis_select_menu_text) {
					interactiveMapKosis.setKosisParams();
					this.searchbtnCnt++;
				} else {
					messageAlert.open("알림", "항목을 선택하여 주세요.");
				}
				return;
			}
			if (this.curSelectedDetailStatsType != null) {
				var show = $("div[data-id=" + this.curSelectedDetailStatsType + "]").is(":visible");
				if (show) {
					var api_id = this.setParams(this.curSelectedStatsType, this.curSelectedDetailStatsType); // 선택된 패널의 파라미터 세팅
//					$interactiveMapApi.request.openApiStatBaseYearProcess(); //통계별 최신년도 가져오기  20160920 김도형(삭제) - 9월서비스변경
					this.createSearchBtn(api_id,false); // 버튼생성
					this.searchbtnCnt++;
				}
			} else {
				messageAlert.open("알림", "조건을 선택해주세요.");
			}
		},
		setMultipleParam : function(id,tmpArParams,tmpArParamName){
			if ($("input[data-able="+id+"]").is(":checked")) {
				var values = [],names=[]; 
				$("#"+id+" input[name="+id+"]:checkbox:checked").each(function(){
					values.push($(this).val());
					names.push($(this).parent().text());
				});
				if(values.length>0){
					tmpArParams.push({
						key: id,
						value: values.join()
					});
					tmpArParamName.push(names.join());
				}
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
		setParams: function(curSelectedStatsType, api_id) {
			var tmpArParams = new Array();
			var tmpArNoneParams = new Array(); //API 조회조건에 사용되지 않는 파라미터
			var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
			var filterParam = null;
			var unit = null;
			var filterName = null;
			if (curSelectedStatsType == "major" || curSelectedStatsType == "population") {
				// 인구총괄
				if (api_id == "API_0301") {
					var total = $("div[data-id=" + api_id + "]").find($("input:checked"));
					if (total.val()) {
						var tmpNames = [];
						total.map(function(idx) {
							filterParam = this.value;
							tmpNames.push($.trim($("#" + this.value).text()));
							//단위설정
							if (this.value == "tot_ppltn" ||
								this.value == "tot_ppltn_male" ||
								this.value == "tot_ppltn_fem"||
								this.value == "avg_fmember_cnt"
								) {
								unit = "명";
							} else if (this.value == "avg_age" ||
								this.value == "avg_age_male" ||
								this.value == "avg_age_fem") {
								unit = "세";
							} else if (this.value == "ppltn_dnsty") {
								unit = "명/㎢";
							} else if (this.value == "aged_child_idx" ||
								this.value == "oldage_suprt_per" ||
								this.value == "juv_suprt_per" ||
								this.value == "tot_suprt_per") {
								unit = "%";
							} else if (this.value == "tot_family"){
								unit = "가구";
							} else if (this.value == "tot_house"){
								unit = "호";
							}

						});

						if (tmpNames.length > 0) {
							tmpArParamName.push(tmpNames.join());
						}
					}
					tmpArParams.push({
						key: "year",
						value: censusDataYear
					});
					tmpArParams.push({
						key: "low_search",
						value: "1"
					});
				}
				// 인구통계세부조건검색
				if (api_id == "API_0302") {
					filterParam = "population";
					unit = "명";
					//tmpArParamName.push("인구");

					var gender = $("input[name=populationgender]:checked");
					var ageFrom = $("#" + curSelectedStatsType + "AgeFrom");
					var ageTo = $("#" + curSelectedStatsType + "AgeTo");
					var eduFinish = $("#" + curSelectedStatsType + "EduFinish");
					var mrgState = $("#" + curSelectedStatsType + "MrgState").find($("input:checked"))

					// 연령별인구
					if ($("input[data-able=populationAge]").is(":checked") && ageFrom.val().length > 0 && ageTo.val().length > 0) {
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
						} else {
							tmpArParamName.push(tmpAgeFrom + "세~" + tmpAgeToText);
						}

						tmpArParams.push({
							key: "age_from",
							value: tmpAgeFrom
						});
						tmpArParams.push({
							key: "age_to",
							value: tmpAgeTo
						});

					}

					// 교육정도별인구
					this.setMultipleParam("edu_level",tmpArParams,tmpArParamName);

					// 혼인상태별인구
					this.setMultipleParam("mrg_state",tmpArParams,tmpArParamName);
					
					if(gender.val()=="0"){
						tmpArParamName.push("남여인구");
					}else if(gender.val()=="1"){
						tmpArParamName.push("남자");
					}else if(gender.val()=="2"){
						tmpArParamName.push("여자");
					}
					tmpArParams.push({
						key: "gender",
						value: gender.val()
					});
					tmpArParams.push({
						key: "area_type",
						value: "0"
					});
					tmpArParams.push({
						key: "low_search",
						value: "1"
					});
					tmpArParams.push({
						key: "year",
						value: censusDataYear
					});
				}
			} else if (curSelectedStatsType == "household") {
				if (api_id == "API_0305") {
					filterParam = "household_cnt";
					unit = "가구";
					//tmpArParamName.push("가구");

					var householdType = $("#" + curSelectedStatsType + "Type").find($("input:checked"));
					var ocptnType = $("#" + curSelectedStatsType + "OcptnType").find($("input:checked"));

					// 세대구성별가구
					this.setMultipleParam("household_type",tmpArParams,tmpArParamName);

					// 점유형태별가구
					this.setMultipleParam("ocptn_type",tmpArParams,tmpArParamName);

					//아무 조건도 선택 안했을 경우
					if (tmpArParamName.length == 0) {
						tmpArParamName.push("총가구");
						tmpArNoneParams.push({
							"noneParam": true
						});
					}

					tmpArParams.push({
						key: "area_type",
						value: "0"
					});
					tmpArParams.push({
						key: "low_search",
						value: "1"
					});
					tmpArParams.push({
						key: "year",
						value: censusDataYear
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
				this.setMultipleParam("house_type",tmpArParams,tmpArParamName);

				// 사용년수
//				if ($("input[data-able=houseConstYear]").is(":checked") && houseConstYear.val().length > 0) {
//					tmpArParams.push({
//						key: "const_year",
//						value: houseConstYear.val()
//					});
//					tmpArParamName.push($("#" + curSelectedStatsType + "ConstYear option:selected").text() + " 건축");
//				}
				if ($("input[data-able=houseConstYear]").is(":checked") && houseConstYear.val().length > 0) {
					tmpArParamName.push($("#" + curSelectedStatsType + "ConstYear option:selected").text() + "(호)");
					tmpArParams.push({
						key: "house_use_prid_cd",
						value: houseConstYear.val()
					});
				}

				// 건축범위
				if ($("input[data-able=houseBdspace]").is(":checked") && houseBdspaceFrom.val().length > 0 && houseBdspaceTo.val().length > 0) {
					var tmpHouseBdspaceTo = houseBdspaceTo.val();
					var tmpHouseBdspaceFrom = houseBdspaceFrom.val();
					var tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎡";
					var houseAreaCd = [];
					
					if (parseInt(houseBdspaceFrom.val()) >= 230) {
						tmpHouseBdspaceFrom = 230;
					}
					
					if (parseInt(houseBdspaceTo.val()) >= 300) {
						tmpHouseBdspaceTo = 9999;
						tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎡ 이상";
						tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상");
					}else {
						tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상 ~" + tmpHouseBdspaceToText + " 미만");
					}
					
					var dataSet = {
							 0 : "01",
							20 : "02",
							40 : "03",
							60 : "04",
							85 : "05",
						   100 : "06",
						   130 : "07",
						   165 : "08",
						   230 : "09",
						  9999 : "10"
					};
					
					var fromData = parseInt(dataSet[tmpHouseBdspaceFrom]);
					var toData = parseInt(dataSet[tmpHouseBdspaceTo]);
					
					for (var i=0; i<toData-fromData; i++) {
						var code = "0"+(fromData+i);
						houseAreaCd.push(code);
					}
					
					tmpArParams.push({
						key : "house_area_cd",
						value : houseAreaCd.join(",")
					});
//					var tmpHouseBdspaceTo = houseBdspaceTo.val();
//					var tmpHouseBdspaceFrom = houseBdspaceFrom.val();
//					var tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎥";
//
//					if (parseInt(houseBdspaceFrom.val()) >= 300) {
//						tmpHouseBdspaceFrom = "300"
//					}
//					if (parseInt(houseBdspaceTo.val()) >= 301) {
//						tmpHouseBdspaceTo = "9999";
//						tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎥ 이상";
//						tmpArParamName.push((tmpHouseBdspaceFrom==5?"1":tmpHouseBdspaceFrom) + "㎥ 이상");
//					} else {
//						tmpArParamName.push((tmpHouseBdspaceFrom==5?"1":tmpHouseBdspaceFrom) + "㎥~" + tmpHouseBdspaceToText);
//					}
//
//					tmpArParams.push({
//						key: "bdspace_from",
//						value: tmpHouseBdspaceFrom
//					});
//					tmpArParams.push({
//						key: "bdspace_to",
//						value: tmpHouseBdspaceTo
//					});
				}else{
					//아무 조건도 선택 안했을 경우
					tmpArParamName.push("총주택");
					tmpArNoneParams.push({
						"noneParam": true
					});
				}

				tmpArParams.push({
					key: "area_type",
					value: "0"
				});
				tmpArParams.push({
					key: "low_search",
					value: "1"
				});
				tmpArParams.push({
					key: "year",
					value: censusDataYear
				});

			} else if (curSelectedStatsType == "3f") {

				// 가구원
				if (api_id == "API_0310") {
					filterParam = "population";
					unit = "명";
					//tmpArParamName.push("가구원");

					var dataType = $("#" + curSelectedStatsType + "DataType").find($("input:checked"));
					var gender = $("input[name=3fGender]:radio:checked");
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
					if ($("input[data-able=3fAge]").is(":checked") && ageFrom.val().length > 0 && ageTo.val().length > 0) {
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
						} else {
							tmpArParamName.push(tmpAgeFrom + "세~" + tmpAgeToText);
						}

						tmpArParams.push({
							key: "age_from",
							value: tmpAgeFrom
						});
						tmpArParams.push({
							key: "age_to",
							value: tmpAgeTo
						});

					}

					// 가구원성별
					if ($("input[data-able=3fGender]").is(":checked")) {
						if(gender.val()=="0"){
							tmpArParamName.push("남여인구");
						}else if(gender.val()=="1"){
							tmpArParamName.push("남자");
						}else if(gender.val()=="2"){
							tmpArParamName.push("여자");
						}
						tmpArParams.push({
							key: "gender",
							value: gender.val()
						});
					}

					tmpArParams.push({
						key: "data_type",
						value: dataType.val()
					});
					tmpArParams.push({
						key: "area_type",
						value: "0"
					});
					tmpArParams.push({
						key: "low_search",
						value: "1"
					});
					tmpArParams.push({
						key: "year",
						value: censusDataYear
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
							} else if (this.value == "forestry_cnt") {
								api_id = "API_0308";
								tmpNames.push($.trim($("#" + this.value).text()));
							} else if (this.value == "fishery_cnt") {
								api_id = "API_0309";
							}

						});

						if (tmpNames.length > 0) {
							tmpArParamName.push(tmpNames.join());
						}
					}

					// 어가유형
					if ($("#" + curSelectedStatsType + "OgaType").parent().is(":visible")) {
						if (ogaType.val().length > 0 && ogaType.val().length > 0) {

							tmpArParams.push({
								key: "oga_div",
								value: ogaType.val()
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
						key: "area_type",
						value: "0"
					});
					tmpArParams.push({
						key: "low_search",
						value: "1"
					});
					tmpArParams.push({
						key: "year",
						value: censusDataYear
					});
				}

			} else if (curSelectedStatsType == "company") {
				// 사업체통계 - 테마검색
				if (api_id == "API_0304-a") {
					var companyDataType = $("#" + curSelectedStatsType + "DataType").find($("input:checked"));
					var companyThemaCode = $("#" + curSelectedStatsType + "ThemeCode");
					var companyDetailThemaCode = $("#" + curSelectedStatsType + "ThemeDetailCode");
					
					//테마유형 검색
					tmpArParams.push({
						key: "theme_cd",
						value: $("input[name=theme-code]:radio:checked").val()
					});
					tmpArParamName.push($("input[name=theme-code]:radio:checked").parents("li.theme-list").children("a").text());
					tmpArParamName.push($("input[name=theme-code]:radio:checked").parent().text());
					
					// 조회항목 구분
					if (companyDataType.val()) {
						var tmpNames = [];
						companyDataType.map(function(idx) {
							filterParam = this.value;
							tmpNames.push($.trim($("#companyDataType_" + this.value).text()));
							
							//단위설정
							if (this.value == "corp_cnt") {
								unit = "개";
							} else {
								unit = "명";
							}
							
						});
						
						if (tmpNames.length > 0) {
							tmpArParamName.push(tmpNames.join());
						}
					}
					
					tmpArParams.push({
						key: "area_type",
						value: "0"
					});
					tmpArParams.push({
						key: "low_search",
						value: "1"
					});
					tmpArParams.push({
						key: "year",
						value: dataYear
					});
				} else if (api_id == "API_0304-b") {
					var companyDataType = $("#" + curSelectedStatsType + "DataType2").find($("input:checked"));
					var companyPoiView = $("#" + curSelectedStatsType + "PoiView").find($("input:checked"));
					// 산업체유형 선택
					if ($interactiveMap.ui.curSelectedCompanyNode != null && $interactiveMap.ui.curSelectedCompanyNode.cd.length > 0) {
						tmpArParams.push({
							key: "class_code",
							value: $interactiveMap.ui.curSelectedCompanyNode.cd
						});
						tmpArParamName.push($interactiveMap.ui.curSelectedCompanyNode.text);

						//POI표출
						if (companyPoiView.val() != undefined) {
							tmpArNoneParams = {
								"class_code": $interactiveMap.ui.curSelectedCompanyNode.cd
							};
						}

					}

					//산업체분류 차수 9차 고정
					tmpArParams.push({
						key: "class_deg",
						value: "9"
					});
					tmpArParams.push({
						key: "year",
						value: dataYear
					});

					// 조회항목 구분
					if (companyDataType.val()) {
						var tmpNames = [];
						companyDataType.map(function(idx) {
							filterParam = this.value;
							tmpNames.push($.trim($("#companyDataType2_" + this.value).text()));
							//단위설정
							if (this.value == "corp_cnt") {
								unit = "개";
							} else {
								unit = "명";
							}

						});

						if (tmpNames.length > 0) {
							tmpArParamName.push(tmpNames.join());
						}
					}

					if (companyPoiView.val() != undefined) {
						tmpArParamName.push("위치표시");
					}

					tmpArParams.push({
						key: "area_type",
						value: "0"
					});
					tmpArParams.push({
						key: "low_search",
						value: "1"
					});
				}
			} else if (curSelectedStatsType == "kosis") {
				return;
			}
			this.arParamList.push({
				idx: this.searchbtnCnt,
				params: tmpArParams,
				noneParams: tmpArNoneParams,
				names: tmpArParamName,
				filterParam: filterParam,
				unit: unit
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
		setRevertParams: function(data, type) {
			//일반통계정보
			if (data.length == 1) {
				var paramInfo = JSON.parse(data[0].param_info);
				if(paramInfo.isKosis){
					return;
				}
				var params = paramInfo.paramInfo;
				var api_id = paramInfo.api_id;
				var title = null;
				var unit = paramInfo.unit;
				var showData = paramInfo.showData;
				var tmpParams = [];
				if (paramInfo.btntype == "items") {
					if (type == "recent") {
						title = data[0].title.split(" | ");
					} else if (type == "share") {
						title = data[0].hist_nm.split(" | ");
					} else {
						title = data[0].title.split(" | ");
					}

					for (var i = 0; i < title.length; i++) {
						if (api_id[i] == "API_0302") {
							for (p in params) {
								if (p != "household_type" &&
									p != "ocptn_type" &&
									p != "house_type" &&
									p != "const_year" &&
									p != "bdspace_from" &&
									p != "bdspace_to") {
									var tmpData = {
										key: p,
										value: params[p]
									};
									tmpParams.push(tmpData);
								}
							}
						} else if (api_id[i] == "API_0305") {
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
										key: p,
										value: params[p]
									};
									tmpParams.push(tmpData);
								}
							}
						} else if (api_id[i] == "API_0306") {
							for (p in params) {
								if (p != "gender" &&
									p != "age_from" &&
									p != "age_to" &&
									p != "edu_level" &&
									p != "mrg_state" &&
									p != "household_type" &&
									p != "ocptn_type") {
									var tmpData = {
										key: p,
										value: params[p]
									};
									tmpParams.push(tmpData);
								}
							}
						}

						this.arParamList.push({
							idx: this.searchbtnCnt,
							params: tmpParams,
							noneParams: [],
							names: title[i].split(" + "),
							filterParam: showData,
							unit: unit
						});
						this.createSearchBtn(api_id[i],true); // 버튼생성
						this.searchbtnCnt++;
					}

					var items = $(".dragItem").find($("input"));
					this.createCombineBtn("item", items);
					this.curDropParams[0] = {
						api_id: api_id,
						param: tmpParams,
						filter: showData,
						unit: unit
					};

					//버튼이 2개이므로 0,1.. 강제로 id 박음..
					var id = $("#c_dragItem_cItems_01").find($("table")).attr("id");

				} else {
					// 연관검색에서 넘어올 때 지역정보 없는 경우 gis_se 가 무조건 1로 설정되는 경우가 있음
					// 실제 지원하는 레벨 정보를 따로 저장 후 버튼 생성 시 재 설정
					if (paramInfo.isKosis && paramInfo.gis_se_bak != null && paramInfo.gis_se_bak != undefined) {
						//params.gis_se = paramInfo.gis_se_bak;
					}

					for (p in params) {
						var tmpData = {
							key: p,
							value: params[p]
						};
						tmpParams.push(tmpData);
					}
					if (type == "recent") {
						title = data[0].title.split(" | ");
					} else if (type == "share") {
						title = data[0].hist_nm.split(" | ");
					} else {
						title = data[0].title.split(" | ");
					}

					this.arParamList.push({
						idx: this.searchbtnCnt,
						params: tmpParams,
						noneParams: [],
						names: title,
						filterParam: showData,
						unit: unit
					});

					this.curDropParams[0] = {
						api_id: api_id,
						param: tmpParams,
						filter: showData,
						unit: unit
					};
					this.createSearchBtn(api_id,true); // 버튼생성
					this.searchbtnCnt++;
				}

				var statsType = {
					API_0301: "population",
					API_0302: "population",
					API_0304: "company",
					API_0305: "household",
					API_0306: "house",
					API_0307: "3f",
					API_0308: "3f",
					API_0309: "3f",
					API_0310: "3f"
				};

				//통계표검색일 경우, 제외
				if (type != "search") {
					if (api_id == undefined || api_id == null) {
						$("#kosisStatsBtn").click();
						this.curSelectedStatsType = "kosis"
					} else {
						$("#" + statsType[api_id] + "StatsBtn").click();
					}
				}

			}
			//결합통계정보
			else if (data.length == 2) {
				for (var i = 0; i < data.length; i++) {
					var paramInfo = JSON.parse(data[i].param_info);
					var params = paramInfo.paramInfo;
					var api_id = paramInfo.api_id;
					var title = data[i].hist_nm.split(" | ")[i];
					var unit = paramInfo.unit;
					var showData = paramInfo.showData;
					var tmpParams = [];
					for (p in params) {
						var tmpData = {
							key: p,
							value: params[p]
						};
						tmpParams.push(tmpData);
					}

					this.arParamList.push({
						idx: this.searchbtnCnt,
						params: tmpParams,
						noneParams: [],
						names: title,
						filterParam: showData,
						unit: unit
					});

					this.curDropParams[0] = {
						api_id: api_id,
						param: tmpParams,
						filter: showData,
						unit: unit
					};

					this.createSearchBtn(api_id,true); // 버튼생성
					this.searchbtnCnt++;
				}
				var items = $(".dragItem").find($("input"));
				this.createCombineBtn("legend", items);

				//버튼이 2개이므로 0,1.. 강제로 id 박음..
				var id = $("#c_dragItem_combine_01").find($("table")).attr("id");
			}
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
		createSearchBtn: function(curSelectedStatsType,history) {
			// 버튼타이틀생성
			var btnTitle = null;
			var unit = null;
			var showData = null;

			for (var i = 0; i < this.arParamList.length; i++) {
				if (this.arParamList[i].idx == this.searchbtnCnt) {
					var names = this.arParamList[i].names;
					if (Object.prototype.toString.call(names) === "[object Array]") {
						btnTitle = names.join(" + ");
					} else {
						btnTitle = names;
					}
					unit = this.arParamList[i].unit;
					showData = this.arParamList[i].filterParam;
					this.arParamList[i]["title"] = btnTitle;
					break;
				}
			}
			if (curSelectedStatsType == undefined || curSelectedStatsType == null) {
				var tempObj = this.arParamList[0].params;
				for (var i = 0; i < tempObj.length; i++) {
					if (tempObj[i].key == "org_id") {
						interactiveMapKosis.org_id = tempObj[i].value;
					} else if (tempObj[i].key == "tbl_id") {
						interactiveMapKosis.tbl_id = tempObj[i].value;
					} else if (tempObj[i].key == "kosis_data_item_detail") {
						interactiveMapKosis.kosis_data_item_detail = tempObj[i].value;
					} else if (tempObj[i].key == "gis_se") {
						interactiveMapKosis.gis_se = tempObj[i].value;
					} else if (tempObj[i].key == "kosis_data_item") {
						interactiveMapKosis.kosis_data_item = tempObj[i].value;
					} else if (tempObj[i].key == "kosis_data_year") {
						interactiveMapKosis.kosis_data_year = tempObj[i].value;
					} else if (tempObj[i].key == "kosis_data_period") {
						interactiveMapKosis.kosis_data_period = tempObj[i].value;
					}
				}

				//버튼생성
				var html =
					"<li class=\"dragItem\" id=\"dragItem_" + $interactiveMap.ui.searchbtnCnt + "\" style='width:253px; cursor: pointer;'>" +
					"<span class='kosisBtn'>" +
					"<input type=\"checkbox\" class=\"checke\" value=\"" + $interactiveMap.ui.searchbtnCnt + "\" />" +
					"<img id=\"line_f_" + $interactiveMap.ui.searchbtnCnt + "\" src=\"/mobile/img/im/icon_circle3.png\" alt=\"\"/>" +
					"<img id=\"line_s_" + $interactiveMap.ui.searchbtnCnt + "\" src=\"/mobile/img/im/icon_circle3.png\" alt=\"\" />" +
					"</span>" +
					"<table title=\"" + btnTitle + "\" id=\"kosis-" + $interactiveMap.ui.searchbtnCnt + "\" class=\"t_drop\">" +
					"<tr><td class=\"ndroptd\">" + btnTitle + "</td></tr>" +
					"</table>" +
					"</li>";
				$interactiveMap.ui.saveObject.element = html;

			} else {
				//사업체 apiid 분기
				var curSelectedDetailStatsType = curSelectedStatsType.substring(0, 8);
				var tmpTitle = "";

				tmpTitle = btnTitle + " (" + unit + ")";

				//버튼생성
				var html =
					"<li class=\"dragItem\" id=\"dragItem_" + this.searchbtnCnt + "\" style='width:253px; cursor: pointer;'>" +
					"<span class='sensorsBtn'>" +
					"<input type=\"checkbox\" class=\"checke\" value=\"" + this.searchbtnCnt + "\" />" +
					"<img id=\"line_f_" + this.searchbtnCnt + "\" src=\"/mobile/img/im/icon_circle3.png\" alt=\"\"/>" +
					"<img id=\"line_s_" + this.searchbtnCnt + "\" src=\"/mobile/img/im/icon_circle3.png\" alt=\"\" />" +
					"</span>" +
					"<table title=\"" + tmpTitle + "\" id=\"" + curSelectedDetailStatsType + "-" + this.searchbtnCnt + "\" class=\"t_drop\">" +
					"<tr><td class=\"ndroptd\">" + tmpTitle + "</td></tr>" +
					"</table>" +
					"</li>";
				$interactiveMap.ui.saveObject.element = html;

			}
			if(!history){
				this.enableResearch();
			}
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
		setDetailStatsPanel: function(type) {
			this.curSelectedStatsType = type;
			var menuType = {
				"population": 0, //인구
				"household": 1, //가구
				"house": 2, //주택
				"3f": 3, //농림어가
				"company": 4, //사업체
				"kosis": 5, //kosis[모바일에서 사용안함]
				"search": 6, //검색[모바일에서 사용안함]
				"major": 7 //주요지표
			};
			$(".DetailBox div[class^=Detail2_]").hide();
			switch (menuType[type]) {
				case 0:
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "]").show();
					this.curSelectedDetailStatsType = "API_0302";
					break;
				case 1:
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "]").show();
					this.curSelectedDetailStatsType = "API_0305";
					break;
				case 2:
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "]").show();
					this.curSelectedDetailStatsType = "API_0306";
					break;
				case 3:
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "]").show();
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] .TabArea").addClass("Hidden");
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] .TabArea:eq(0)").removeClass("Hidden");
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] a.tab").removeClass("M_on");
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] a.tab:eq(0)").addClass("M_on");
					this.curSelectedDetailStatsType = "API_0310";
					break;
				case 4:
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "]").show();
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] .TabArea").addClass("Hidden");
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] .TabArea:eq(0)").removeClass("Hidden");
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] a.tab").removeClass("M_on");
					$(".DetailBox div[class^=Detail2_][data-subject=" + type + "] a.tab:eq(0)").addClass("M_on");
					this.curSelectedDetailStatsType = "API_0304-b";

					$interactiveMap.ui.companyTree = null;
					$interactiveMap.ui.curSelectedCompanyNode = null;
					$interactiveMapApi.request.openApiInterstryCode(0, "9", null);
					break;
				case 5:
					//[모바일에서 사용안함]
					if ($("#kosisYear").val() != undefined) {
						$("#kosisDataField").show();
					}
					break;
				case 6:
					//[모바일에서 사용안함]
					break;
				case 7:
					$(".DetailBox div[class^=Detail2_]:eq(0)").show();
					this.curSelectedDetailStatsType = "API_0301";
					break;
			};

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
		createCombineBtn: function(type, items) {
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

				for (var i = 0; i < refBtnIds.length; i++) {
					if (refBtnIds[i] == "API_0302") {
						tmpType.push("ppl");
					} else if (refBtnIds[i] == "API_0305") {
						tmpType.push("family");
					} else if (refBtnIds[i] == "API_0306") {
						tmpType.push("house");
					}
				}
				if (tmpType.length > 0) {
					itemType = tmpType.join(",");

					unit = [];
					if (itemType.indexOf("family") != -1 &&
						itemType.indexOf("house") != -1) {
						unit.push("호");
					} else if (itemType.indexOf("ppl") != -1 &&
						itemType.indexOf("family") != -1) {
						unit.push("가구");
					} else if (itemType.indexOf("ppl") != -1 &&
						itemType.indexOf("house") != -1) {
						unit.push("호");
					}
				}
			} else {
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
						if (Object.prototype.toString.call(names) === "[object Array]") {
							btnTitle.push(names.join(" + "));
						} else {
							btnTitle.push(names);
						}

						break;
					}
				}
			}

			this.combineList.push({
				idx: tmpId,
				data: tmpCombineIdx,
				refIds: refBtnIds,
				itemType: itemType,
				params: params,
				noneParams: noneParams,
				filterParam: filterParams,
				unit: unit,
				title: btnTitle,
				maxYear: maxYear
			});

			//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위삭제
			for (var i = 0; i < filterParams.length; i++) {
				/*if (filterParams[i] == "aged_child_idx" ||
					filterParams[i] == "oldage_suprt_per" ||
					filterParams[i] == "juv_suprt_per" || 
					filterParams[i] == "tot_suprt_per") {
					 btnTitle[i] = 	btnTitle[i];		
				}else {*/
				btnTitle[i] = btnTitle[i] + " (" + showUnit[i] + ")";
				//}
			}

			var html = "<li class=\"dragItem\" id=\"c_dragItem_" + tmpId + "\" style='width:253px;cursor: pointer;'>" +
				"<span class='combineBtn'>" +
				"<input type=\"checkbox\" class=\"checke\" value=\"c_dragItem_" + tmpId + "\" />" +
				"<img id=\"c_line_f_" + tmpId + "\" src=\"/mobile/img/im/icon_circle3.png\" alt=\"\"/>" +
				"<img id=\"c_line_s_" + tmpId + "\" src=\"/mobile/img/im/icon_circle3.png\" alt=\"\" />" +
				"</span>" +
				"<table title=\"\" id=\"" + tmpId + "\" class=\"t_drop\">" +
				"<tr><td class=\"cdroptd\">" + btnTitle[0] + "</td></tr>" +
				"<tr><td class=\"cdroptd\">" + btnTitle[1] + "</td></tr>" +
				"</table>" +
				"</li>";

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
				"<tr><td>" + btnTitle[0] + "</td></tr>" +
				"<tr><td>" + btnTitle[1] + "</td></tr>" +
				"</table>";
			$("#" + tmpId).tooltip({
				content: tooltipMsg,
				position: {
					my: "left+10 top-40"
				},
				track: true
			});

			//버튼 드래그설정
			$(".dragItem").draggable({
				revert: "invalid",
				helper: "clone",
				cursor: "pointer",
				zIndex: 100,
				cursorAt: {
					left: -5
				},
				start: function(e, ui) {},
				drag: function(e, ui) {
					isDraggable = true;
				},
				stop: function(e, ui) {
					isDraggable = false;
				}
			});

			// 전체체크버튼 초기화
			$("#checkAllSearchBtn").prop("checked", false);
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
		clearViewOverlay: function(isShow, type) {
			this.curMapId = parseInt(type) - 1;
			var mapInfo = this.mapList[this.curMapId].mapInfo;
			var isMap1ContentShow = $("#map_dummy_1").is(":visible");
			var isMap2ContentShow = $("#map_dummy_2").is(":visible");
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

			} else {
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
		doInnerMap: function(type) {
			this.curMapId = parseInt(type) - 1;
			this.isInnerMapShow ^= true;
			this.mapList[this.curMapId].setInnerMap(this.isInnerMapShow);
			this.clearViewOverlay(this.isInnerMapShow, type);
			this.mapList[this.curMapId].drawControl.disable();
			var mapInfo = this.mapList[this.curMapId].mapInfo;

			if (this.isInnerMapShow) {
				$("#innerMapBtn_" + type).val("실내맵off");
				$("#sideMask").show();
				$("#mapAddBtn_" + type).hide();
				this.mapList[this.curMapId].infoControlShowHide(false);
				$(".btn_map_sel").addClass("on");
				mapInfo.resetMapInfo();
			} else {
				$("#innerMapBtn_" + type).val("실내맵on");
				$("#sideMask").hide();
				$("#mapAddBtn_" + type).show();
				this.mapList[this.curMapId].infoControlShowHide(true);
				this.mapList[this.curMapId].drawControl.enable();
				$(".btn_map_sel").removeClass("on");

			}
		},

		/**
		 * 
		 * @name         : doClearMap
		 * @description  : 맵의 오버레이를 초기화한다.(데이터오버레이만 해당)
		 * @date         : 2014. 10. 11. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		doClearMap: function(type) {
			this.curMapId = parseInt(type) - 1;
			if (this.mapList.length > 0) {
				this.mapList[this.curMapId].clearDataOverlay();
				//this.mapList[this.curMapId].drawControl.disableControl("drawControl"); //draw hide
				this.mapList[this.curMapId].drawControl.removeOverlay();

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
		doBookMark: function(type) {
			if (!AuthInfo.authStatus) {
				messageAlert.open(
					"알림",
					"북마크 기능은 로그인을 해야 사용하실 수 있습니다. 로그인페이지로 이동하시겠습니까?",
					function done() {
						location.href="/mobile/html/member/login.html?"+location.href.replace(/http(s)?:\/\//gi,'').substring(location.href.replace(/http(s)?:\/\//gi,'').indexOf("/"));
					},
					function cancel() {}
				);
			} else {
				that = $interactiveMap.ui;
				if (that.shareUrlInfoList[that.curMapId] != null &&
					that.shareUrlInfoList[that.curMapId].length > 0) {
					this.curMapId = parseInt(type) - 1;
					messageAlert.open(
						"알림",
						"해당 통계정보를 북마크를 하시겠습니까?",
						function done() {
							that.share_type = "BMARK";
							$interactiveMapApi.request.openApiRegBookmark(
								that.shareUrlInfoList[that.curMapId],
								that.share_type,
								type);

						},
						function cancel() {}
					);
				} else {
					messageAlert.open("북마크", "북마크할 통계정보가 없습니다. 먼저 통계조회를 해주세요.");
				}
			}
		},


		/**
		 * 
		 * @name         : doShare
		 * @description  : 공유를 수행한다.
		 * @date         : 2014. 10. 11. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		doShare: function(type) {
			if (!AuthInfo.authStatus) {
				messageAlert.open(
					"알림",
					"공유 기능은 로그인을 해야 사용하실 수 있습니다. 로그인페이지로 이동하시겠습니까?",
					function done() {
						location.href="/mobile/html/member/login.html?returnPage="+encodeURIComponent(location.href.replace(/http(s)?:\/\//gi,'').substring(location.href.replace(/http(s)?:\/\//gi,'').indexOf("/")));
					},
					function cancel() {}
				);
			} else {
				that = $interactiveMap.ui;
				if (that.shareUrlInfoList[that.curMapId] != null &&
					that.shareUrlInfoList[that.curMapId].length > 0) {
					messageAlert.open(
						"알림",
						"해당 통계정보를 공유 하시겠습니까?",
						function done() {
							that.share_type = "SHARE";
							$interactiveMapApi.request.openApiRegBookmark(
								that.shareUrlInfoList[that.curMapId],
								that.share_type,
								type);
						},
						function cancel() {}
					);
				} else {
					messageAlert.open("공유", "공유할 통계정보가 없습니다. 먼저 통계조회를 해주세요.");
				}
				this.curMapId = parseInt(type) - 1;
			}
		},


		/**
		 * 
		 * @name         : doDone
		 * @description  : 경계정보를 설정한다.
		 * @date         : 2014. 11. 19. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param
		 */
		doDone: function(type) {
			if (type == "settings") {
				var map = this.mapList[this.curMapId];
				if ($("#bndYear").val() != map.bnd_year) {
					map.bnd_year = $("#bndYear").val();
					map.openApiReverseGeoCode(map.center);
				}
				map.bnd_year = $("#bndYear").val();
			} else if (type == "sharedlg") {
				copyToClipboard($("#sharedlg").find($("input")).val());
			} else if (type == "uploadFile") {
				$("#fileSearch").val("");
				$("#filePathField").val("");
			}

			$(".deem").hide();
			$("#" + type).hide();

		},

		shareToKakaoStory: function(type) {
			Kakao.Auth.login({
				success: function(authObj) {
					var linkURL = $("#sharedlg").find($("input")).val();
					Kakao.API.request({
						url: '/v1/api/story/linkinfo',
						data: {
							url: linkURL
						},
					}).then(function(res) {
						res.description = that.shareUrlInfoList[that.curMapId][0].title;
						return Kakao.API.request({
							url: '/v1/api/story/post/link',
							data: {
								link_info: res
							}
						});
					}).then(function(res) {
						return Kakao.API.request({
							url: '/v1/api/story/mystory',
							data: {
								id: res.id
							},
							success: function(res) {
								messageAlert.open("알림", "카카오스토리에 정상적으로 공유하였습니다.");
							},
							fail: function(error) {
								messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>(" + error.error_description + ")");
							}
						});
					});
				},
				fail: function(error) {
					messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>(" + error.error_description + ")");
				}
			})
		},
		shareToFacebook:function(){
			window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.protocol+$("#sharedlg").find($("input")).val()));
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
		doCancel: function(type) {
			if (type == "settings") {
				$("#bndYear").val(this.mapList[this.curMapId].bnd_year);
			} else if (type == "uploadFile") {
				$("#fileSearch").val("");
				$("#filePathField").val("");
			}
			$(".deem").hide();
			$("#" + type).hide();

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
		setShareInfo: function(options, type, id) {
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

				} else {
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
					url: url,
					params: {
						mapInfo: {
							zoomlevel: zoomlevel,
							center: center
						},
						paramInfo: params,
						showData: showData,
						unit: unit,
						api_id: apiId,
						isKosis: isKosis,
						btntype: btntype
					},
					title: $.trim(title),

				};

				if (isKosis) {
					//관리자 통계주제도를 위한 표출레벨 설정
					if (dist_level == '1') { //시도
						dist_level = '01';
					} else if (dist_level == '2') {
						//시군구
						dist_level = '02';
					} else if (dist_level == '3') {
						//읍면동
						dist_level = '03';
					} else {
						dist_level = '01';
					}
					shareInfo.params.dist_level = dist_level;
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
		analysisShareInfo: function(keyList,options) {
			for (key in keyList) {
				if (key == "") {
					return false;
				}
			}

			if (keyList.key != undefined) {
				$interactiveMap.ui.shareUrlInfoList = [];
				$interactiveMap.ui.shareUrlInfo = [];
				$interactiveMapApi.request.openApiStatisticsHistoryParamInfo(keyList.key,options);
			} else if (keyList.intr != undefined) {
				$interactiveMap.ui.shareUrlInfoList = [];
				$interactiveMap.ui.shareUrlInfo = [];
				$interactiveMapApi.request.openApiMainRecentParamInfo(keyList.intr);
			} else if (keyList.type != undefined) {
				if (keyList.type == "kosis") {
					return false;
				} else if (keyList.type == "intr") {
					var code = keyList.code;
					$("#" + code + "StatsBtn").click();
				} else {
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
					} else {
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
						"adm_cd": adm_cd,
						"bnd_year": $("#bndYear").val(),
						"low_search": "1"
					};

					//url, 해당통계버튼 선택
					if (api_id == "API_0301") {
						this.curSelectedStatsType = "population";
						url = $interactiveMapApi.request.API_0301_URL;
						filter = keyList.showData;
						unit = "명";
						//title = "인구총괄";

						if (keyList.year != null) {
							params["year"] = keyList.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0302") {
						this.curSelectedStatsType = "population";
						url = $interactiveMapApi.request.API_0302_URL;
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
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0304") {
						this.curSelectedStatsType = "company";
						url = $interactiveMapApi.request.API_0304_URL;
						filter = "corp_cnt";
						unit = "개";
						//title = "사업체통계";

						params["area_type"] = keyList.area_type;
						params["class_code"] = keyList.class_code;
						if (keyList.class_deg != undefined && keyList.class_deg.length > 0 /*&& keyList.class_deg == "8"*/ ) {
							params["class_deg"] = keyList.class_deg;
						}

						if (keyList.year != null) {
							params["year"] = keyList.year;
						} else {
							params["year"] = bndYear;
						}
					} else if (api_id == "API_0305") {
						this.curSelectedStatsType = "household";
						url = $interactiveMapApi.request.API_0305_URL;
						filter = "household_cnt";
						unit = "가구";
						//title = "가구통계";

						params["area_type"] = keyList.area_type;
						if (keyList.household_type != undefined && keyList.household_type.length > 0) {
							params["household_type"] = keyList.household_type;
						}

						if (keyList.year != null) {
							params["year"] = keyList.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0306") {
						this.curSelectedStatsType = "house";
						url = $interactiveMapApi.request.API_0306_URL;
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
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0307") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0307_URL;
						filter = "farm_cnt";
						unit = "가구";
						//title = "농가통계";

						params["area_type"] = keyList.area_type;
						if (keyList.year != null) {
							params["year"] = keyList.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0308") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0308_URL;
						filter = "forestry_cnt";
						unit = "가구";
						//title = "임가통계";

						params["area_type"] = keyList.area_type;
						if (keyList.year != null) {
							params["year"] = keyList.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0309") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0309_URL;
						filter = "fishery_cnt";
						unit = "가구";

						params["area_type"] = keyList.area_type;
						params["oga_div"] = keyList.oga_div;
						if (keyList.year != null) {
							params["year"] = keyList.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0310") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0310_URL;
						filter = "population";
						unit = "명";
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
						} else {
							params["year"] = censusDataYear;
						}
					}

					var year = null;
					if (keyList.year != undefined && keyList.year.lngth > 0) {
						params.year = this.mapList[0].bnd_year
					}

					//파라미터설정
					this.setDetailStatsPanel(this.curSelectedStatsType);
					$("#" + this.curSelectedStatsType + "StatsBtn").click();
					var shareInfo = {
						api_call_url: url,
						param_info: {
							api_id: api_id,
							isKosis: false,
							mapInfo: {
								center: center,
								zoomlevel: zoom
							},
							paramInfo: params,
							showData: filter,
							title: title,
							unit: unit
						},
						title: title
					};
					var tmpShareInfo = [];
					var tmpParams = deepCopy(shareInfo);
					tmpParams.param_info = JSON.stringify(tmpParams.param_info);
					tmpShareInfo.push(tmpParams);
					this.setRevertParams(tmpShareInfo, "search");

					setTimeout(function() {
						$interactiveMapApi.request.openApiShareForStats(shareInfo);
					}, 200);
				}
			}
            $("#interactiveMap .Open_Type1").hide();
            $(".Wrap>.Content").removeAttr("style");
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
		createInfoTooltip: function(event, data, type, map) {
			var html = "<table>";
			var searchYear = "";

			if (this.curDropParams[map.id] != undefined) {
				for (var i = 0; i < this.curDropParams[map.id].param.length; i++) {
					if (this.curDropParams[map.id].param[i].key == "year") {
						searchYear = this.curDropParams[map.id].param[i].value + "년 ";
					}
				}
			}

			if (type == "data") {
				if (data.info.length > 0) {
					//kosis
					if (data.info[2] == "kosis") {
						return;
					} else {
						var showName = {
							"tot_ppltn": "총인구",
							"tot_ppltn_male": "총인구(남자)",
							"tot_ppltn_fem": "총인구(여자)",
							"avg_age": "평균나이",
							"avg_age_male": "평균나이(남자)",
							"avg_age_fem": "평균나이(여자)",
							"ppltn_dnsty": "인구밀도",
							"aged_child_idx": "노령화지수",
							"oldage_suprt_per": "노년부양비",
							"juv_suprt_per": "유년부양비",
							"tot_suprt_per": "총부양비",
							"population": "인구",
							"tot_worker": "종사자수",
							"corp_cnt": "사업체수",
							"household_cnt": "가구수",
							"house_cnt": "주택수",
							"farm_cnt": "농가수",
							"forestry_cnt": "임가수",
							"fishery_cnt": "어가수",
							"tot_family":"가구",
							"avg_fmember_cnt":"평균 가구원",
							"tot_house":"주택",
							"employee_cnt":"종사자수"
						};

						for (var i = 0; i < data.info.length; i++) {
							var tmpData = data.info[i];
							if (i == 0) {
								if (tmpData.adm_nm !== undefined) {
									html += "<tr><td class='admName'>" + (tmpData.adm_cd.length>7?tmpData.adm_cd:tmpData.adm_nm) + "</td></tr>" + "<tr style='height:5px'></tr>";
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
									html += "<td class='statsData'>" + searchYear + " " + filterName + "</td>" + "<td>&nbsp;:&nbsp;</td>";
								} else {
									html += "<td class='statsData'>" + searchYear + " </td>" + "<td>&nbsp;:&nbsp;</td>";
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
									tmpData.showData != "tot_family"&&
									tmpData.showData != "avg_fmember_cnt"&&
									tmpData.showData != "tot_house"
								) {
									value = "N/A";
								} else {
									value = appendCommaToNumber(tmpData[tmpData.showData]);
								}

								html += "<td>" + value;

								if (value != "N/A") {
									html += " (" + tmpData.unit + ")";
								}

								html += "</td></tr>";
							}
						}
					}
				} else {
					html += "<tr><td class='statsData'>N/A</td></td>";
				}

			} else if (type == "build") {
				var info = data.properties;
				var lowest = "";
				var highest = "지상" + Math.abs(info.highest_flr) + "(층)";
				if (info.lowest_flr < 0) {
					lowest = "지하" + Math.abs(info.lowest_flr) + "(층)";
				} else {
					lowest = "지상" + Math.abs(info.lowest_flr) + "(층)";
				}

				var bd_nm = "";
				if (info.bd_nm != undefined && info.bd_nm.length > 0) {
					bd_nm = info.bd_nm;
				}
				html += "<tr><td class='admName'>" + bd_nm + "</td></tr>" + "<tr style='height:10px;'></tr>" + "<tr><td class='statsData'>" + lowest + " ~ " + highest + "</td></tr>" + "<tr style='height:5px;'></tr>" + "<tr><td class='statsData'>" + info.bd_naddr + "</td></tr>";
			}
			html += "</table>";
			event.target.bindToolTip(html, {
				direction: event.layerPoint.x>180?"left":"right",
				noHide: true,
				opacity: 0.8

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
		requestOpenApi: function(options) {
			var parameter = "";
			var cmmnty_map_id = "";
			options.map.isDrop = true;
			options.map.undoDropLayerBounds();

			//param의 adm_cd가 00(전국)일 경우 adm_cd 삭제
			var tmpOptions = [];
			for (var i = 0; i < options.param.length; i++) {
				if (options.param[i].key == "adm_cd" && options.param[i].value == "00") {} else {
					tmpOptions.push(options.param[i]);
				}
			}
			options.param = tmpOptions;
			var api_id = options.api_id;
			if (api_id == "API_0301") $interactiveMapApi.request.openApiTotalPopulation(options);
			else if (api_id == "API_0302") $interactiveMapApi.request.openApiSearchPopulation(options);
			else if (api_id == "API_0303") $interactiveMapApi.request.openApiInderstryCode(options);
			else if (api_id == "API_0304") $interactiveMapApi.request.openApiCompany(options);
			else if (api_id == "API_0305") $interactiveMapApi.request.openApiHouseHold(options);
			else if (api_id == "API_0306") $interactiveMapApi.request.openApiHouse(options);
			else if (api_id == "API_0307") $interactiveMapApi.request.openApiFarmHouseHold(options);
			else if (api_id == "API_0308") $interactiveMapApi.request.openApiForestryHouseHold(options);
			else if (api_id == "API_0309") $interactiveMapApi.request.openApiFisheryHouseHold(options);
			else if (api_id == "API_0310") $interactiveMapApi.request.openApiHouseHoldMember(options);
			
			cmmnty_map_id = getParameter("cmmnty_map_id");
			if(cmmnty_map_id == null){
				for (var i = 0; i < options.param.length; i++) {
					parameter += options.param[i].key + "=" + options.param[i].value + "&";
				}
	            var title = $(".Subject .M_on").text();
	            var adm_nm = $("#sidoSelect_mapNavi_1 option:selected").text() + " " + $("#sggSelect_mapNavi_1 option:selected").text() + " " + $("#admSelect_mapNavi_1 option:selected").text();
	            apiLogWrite2("L0", "L03", title, parameter , commonZoomLevel, adm_nm);
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
		sopPaging: function(totalCount, currentIndex) {
			var pageSize = 5;
			var totalPage = Math.ceil(totalCount / pageSize);
			$('#sopPaging .pages').paging({
				current: currentIndex + 1,
				max: totalPage,
				itemClass: 'page',
				itemCurrent: 'current',
				format: '{0}',
				next: '&gt;',
				prev: '&lt;',
				first: '&lt;&lt;',
				last: '&gt;&gt;',
				onclick: function(e, page) {
					$interactiveMap.ui.sopCurrentPageIndex = page - 1;
					$interactiveMapApi.request.openApiSOP($interactiveMap.ui.searchKeyword, page - 1);
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
		kosisPaging: function(totalCount, currentIndex) {
			var pageSize = 5;
			var totalPage = Math.ceil(totalCount / pageSize);
			$('#kosisPaging .pages').paging({
				current: currentIndex + 1,
				max: totalPage,
				itemCurrent: 'current',
				format: '{0}',
				next: '&gt;',
				prev: '&lt;',
				first: '&lt;&lt;',
				last: '&gt;&gt;',
				onclick: function(e, page) {
					$interactiveMap.ui.kosisCurrentPageIndex = page - 1;
					$interactiveMapApi.request.openApiKOSIS($interactiveMap.ui.sKeyword, page - 1);
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
		analysisSearchInfo: function(type, idx) {
			var mapId = getMapDivisionId(); //검색 시 적용 될 지도(맵 분할 시)
			var keyList = new Array();
			if (type == "kosis") {
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
					if (adm_cd == "00" || adm_cd == "") {
						zoom = "2";
						adm_cd = "1";
					} else {
						switch (gis_se) {
							case 1: //전국시도
								zoom = "2";
								if (adm_cd.length >= 2) {
									adm_cd = "1";
								}
								break;

							case 2: //시군구
								zoom = "4"; //5->4
								if (adm_cd.length >= 5) {
									adm_cd = adm_cd.substring(0, 2);
								}
								break;

							case 3: //읍면동 
								zoom = "6"; //7->6
								if (adm_cd.length > 2) {
									adm_cd = adm_cd.substring(0, 5);
								}
								break;
						}
					}

					var options = new Array();
					options.push({
						key: "gis_se",
						value: gis_se
					});

					options.push({
						key: "tbl_id",
						value: kosis_tb_id
					});

					options.push({
						key: "adm_cd",
						value: adm_cd
					});

					options.push({
						key: "center",
						value: center
					});

					options.push({
						key: "url",
						value: url
					});

					options.push({
						key: "zoom",
						value: zoom
					});

					options.push({
						key: "title",
						value: title
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
					} else {
						switch (adm_cd.length) {
							case 2: //시군구
								zoom = 4; //5->4
								break;
							case 5: //읍면동
								zoom = 6; //7->6
								break;
							case 7: //집계구
								zoom = 9; //10->9
								break;
							default:
								var zoom = 2;
								adm_cd = "00";
								break;
						}

					}

					var params = {
						"adm_cd": adm_cd,
						"bnd_year": $("#bndYear").val(), //this.mapList[0].bnd_year,
						"low_search": "1"
					};

					//url, 해당통계버튼 선택
					if (api_id == "API_0301") {
						this.curSelectedStatsType = "population";
						url = $interactiveMapApi.request.API_0301_URL;
						filter = keyList.params.showData;
						unit = "명";
						//title = "인구총괄";

						if (keyList.params.year != null) {
							params["year"] = keyList.params.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0302") {
						this.curSelectedStatsType = "population";
						url = $interactiveMapApi.request.API_0302_URL;
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
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0304") {
						this.curSelectedStatsType = "company";
						url = $interactiveMapApi.request.API_0304_URL;
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
						} else {
							params["year"] = bndYear;
						}
					} else if (api_id == "API_0305") {
						this.curSelectedStatsType = "household";
						url = $interactiveMapApi.request.API_0305_URL;
						filter = "household_cnt";
						unit = "가구";
						//title = "가구통계";

						params["area_type"] = keyList.params.area_type;
						if (keyList.params.household_type != undefined && keyList.params.household_type.length > 0) {
							params["household_type"] = keyList.params.household_type;
						}

						if (keyList.params.year != null) {
							params["year"] = keyList.params.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0306") {
						this.curSelectedStatsType = "house";
						url = $interactiveMapApi.request.API_0306_URL;
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
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0307") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0307_URL;
						filter = "farm_cnt";
						unit = "가구";
						//title = "농가통계";

						params["area_type"] = keyList.params.area_type;
						if (keyList.params.year != null) {
							params["year"] = keyList.params.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0308") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0308_URL;
						filter = "forestry_cnt";
						unit = "가구";
						//title = "임가통계";

						params["area_type"] = keyList.params.area_type;
						if (keyList.params.year != null) {
							params["year"] = keyList.params.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0309") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0309_URL;
						filter = "fishery_cnt";
						unit = "가구";
						//title = "어가통계";

						params["area_type"] = keyList.params.area_type;
						params["oga_div"] = keyList.params.oga_div;
						if (keyList.params.year != null) {
							params["year"] = keyList.params.year;
						} else {
							params["year"] = censusDataYear;
						}
					} else if (api_id == "API_0310") {
						this.curSelectedStatsType = "3f";
						url = $interactiveMapApi.request.API_0310_URL;
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
						} else {
							params["year"] = censusDataYear;
						}
					}

					var year = null;
					if (keyList.params.year != undefined && keyList.params.year.lngth > 0) {
						params.year = this.mapList[0].bnd_year
					}

					//파라미터설정
					var shareInfo = {
						api_call_url: url,
						param_info: {
							api_id: api_id,
							isKosis: false,
							mapInfo: {
								center: center,
								zoomlevel: zoom
							},
							paramInfo: params,
							showData: filter,
							title: title,
							unit: unit
						},
						title: title
					};

					var tmpShareInfo = [];
					var tmpParams = deepCopy(shareInfo);
					tmpParams.param_info = JSON.stringify(tmpParams.param_info);
					tmpShareInfo.push(tmpParams);
					this.setRevertParams(tmpShareInfo, "search");

					setTimeout(function() {
						$interactiveMap.ui.mapList[mapId].lastGeojsonInfo = null;
						$interactiveMapApi.request.openApiShareForStats(shareInfo);
					}, 200);
				}
			}
		},
		/**
		 * 
		 * @name         : changeCompany
		 * @description  : 검색항목에서 사업체>산업분류(필수) 에서 항목 선택시 해당 하위 항목을 표출해준다
		 * @date         : 2015. 10. 10. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		changeCompany: function(button) {
			$("#company-list li").removeClass("Check");
			var liTag = $(button).parents("li");
			var radioTag = liTag.find("input:radio");
			liTag.addClass("Check");
			radioTag.prop("checked", true);
			this.curSelectedCompanyNode = {
				cd: $(radioTag).val(),
				text: $(radioTag).data("title")
			};
			this.companyArray.push($(radioTag).val());
			this.companyDepth = this.companyDepth + 1;
			$interactiveMapApi.request.openApiInterstryCode(this.companyDepth, "9", $(radioTag).val());
			this.setSearchPath(this.companyDepth);
		},
		/**
		 * 
		 * @name         : changeCompanyDepth
		 * @description  : 검색항목에서 사업체>산업분류(필수) 에서 Depth의 경로를 클릭시 해당 Depth를 셋팅해준다
		 * @date         : 2015. 10. 10. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param idx    : depth
		 */
		changeCompanyDepth: function(idx) {
			this.companyDepth = idx;
			if (this.companyArray[idx - 2]) {
				$interactiveMapApi.request.openApiInterstryCode(idx, "9", this.companyArray[idx - 2]);
				this.companyArray = this.companyArray.slice(0, idx - 2);
			} else {
				$interactiveMapApi.request.openApiInterstryCode(1, "9", null);
				this.companyArray = [];
			}
			this.setSearchPath(idx);
		},
		/**
		 * 
		 * @name         : setSearchPath
		 * @description  : 검색항목에서 사업체>산업분류(필수) 에서 Depth의 경로를 셋팅해준다
		 * @date         : 2015. 10. 10. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param idx    : depth
		 */
		setSearchPath: function(idx) {
			var searchPath = "";
			for (var i = 1; i <= idx; i++) {
				searchPath += '<a href=​"#" onclick="$interactiveMap.ui.changeCompanyDepth(' + (i) + '); return false;">​' + i + '단계​</a>​' + (i == this.companyDepth ? "" : " &gt; ");
			}
			if (this.companyDepth > 1) {
				searchPath += '<button type=​"button" onclick="$interactiveMap.ui.changeCompanyDepth(' + (this.companyDepth - 1) + ')">​뒤로​</button>​';
			}
			$("div[data-id=API_0304-b]").find(".SearchPath").html(searchPath);
		},
		/**
		 * 
		 * @name         : enableResearch
		 * @description  : 기존 검색 조건으로 재조회
		 * @date         : 2015. 10. 10. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		enableResearch: function() {
			$(".Content>.Btn_Top>nav>a[class^=Btn_Top]:gt(1)").off().addClass("NoneAction");
			$.each(this.mapList,function(){
				var thisMap = this;
				thisMap.mapInfo.showThisMap();
				thisMap.mapNavigation.changeLocation = true;
				if(thisMap.mapNavigation.changeLocation){
					thisMap.mapNavigation.naviConfirm(true);
				}
				thisMap.mapNavigation.changeLocation = false;
				if ($interactiveMap.ui.saveObject.element) {
					thisMap.clearDataOverlay(function(){
						$sgisMobileInteractive.ui.search();
					});
				}
			});
		},
		/**
		 * 
		 * @name         : moveCurrentLocation
		 * @description  : 현재 위치로 이동
		 * @date         : 2015. 10. 10. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param divison: 클릭한 element
		 */
		moveCurrentLocation: function(divison){
			var mapList = this.mapList;
			$.each(mapList,function(cnt,node){
				node.moveCurrentLocation($(divison));
			});
			return false;
		},
		/**
		 * 
		 * @name         : mapResize
		 * @description  : 화면 크기가 변경 되면 지도 크기 변경
		 * @date         : 2015. 10. 10. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		mapResize : function() {
			$(".sop-left .legend_remark_section .remarkbox").width($(window).width());
			if($("div[id^=mapSizeControl_]").hasClass("downscale")){
				$("#mapRgn_1").height($(window).height());
			}else{
				var top = $(".Wrap>.Header").outerHeight(true) + $(".Content>p.SelectArea:visible").outerHeight(true) + $(".Btn_Top").outerHeight(true);
				$(".Open_Type1").height($(window).outerHeight(true) - $(".Wrap>.Header").outerHeight(true));
				$(".DetailBox").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true) + $(".Open_Type1>p.SelectArea:visible").outerHeight(true) + $(".SubjectB").outerHeight(true)+$("#Btn_Search_Detail").outerHeight(true)+$(".Open_Type1>h3").outerHeight(true)));
				if(location.pathname.indexOf(communityPath)==-1){
					$("#mapRgn_1").height($(window).outerHeight(true) - top);
				}else{
					$(".Community_Insert").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true)+parseInt($(".Community_Insert").css("padding-bottom").replace("px",""))));
					if(location.pathname.indexOf(communityPath+"Result.html")>-1){
						var height = $(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true)+$(".Community_Insert h1").outerHeight(true)+$(".Community_cont").outerHeight(true)+100);
						$("#mapRgn_1").height(height>300?height:300);
					}else if(location.pathname.indexOf(communityPath+"Form.html")>-1){
						$("#mapRgn_1").height("300px");
					}else{
						$("#mapRgn_1").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true)+$(".Community_Insert h1").outerHeight(true)));
					}
				}
			}
			if (this.mapList.length > 0) {
				$(this.mapList).each(function() {
					if ($(this).gMap) {
						$(this).gMap.invalidateSize();
					}
				});
			}
		}
	};

	// ==============================//
	// map event callback
	// ==============================//
	$interactiveMap.callbackFunc = {

		// 맵이동 시작시, 콜백 호출
		didMapMoveStart: function(event, map) {
            $(".research_control,.Btn_Research").addClass("disabled");
        },

		// 맵이동 종료시, 콜백 호출
		didMapMoveEnd : function(event, map) {
			var poiControl = map.gPoi;
			if(poiControl){
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
			}
		},

		// 맵 줌시작 시, 콜백 호출
		didMapZoomStart: function(event, map) {},

		// 맵 줌 종료 시, 콜백 호출
		didMapZoomEnd: function(event, map) {
			if (map.zoom < 10 && $interactiveMap.ui.isInnerMapShow) { //11->10
				$interactiveMap.ui.doInnerMap(map.id + 1);
			}
			var poiControl = map.gPoi;
			//TODO 사업체 POI 없애기
			if (map.zoom < 10 &&poiControl&&poiControl._isActivated()) {
				messageAlert.open("알림", "해당 레벨에서는 사업체를 볼 수 없습니다.");
				poiControl.deactivated();
				poiControl.onRemove();
			}
			commonZoomLevel = map.zoom;
		},

		// 드랍종료 시, 콜백 호출
		didMapDropEnd: function(event, source, layer, data, map) {
			var selParams = new Array();
			var noneParams = new Array();
			var api_id = new Array();
			var index = null;
			var filterParam = new Array();
			var unit = new Array();
			var title = new Array();
			var maxYear = new Array();
			// share정보 초기화
			$interactiveMap.ui.curMapId = map.id;
			$interactiveMap.ui.shareUrlInfo = [];
			map.dropInfo = null;
			$interactiveMapApi.request.combineFailCnt = 0;
			//시계열 초기화
			var id = source.find("table").attr("id");
			//결합버튼일 경우,
			//기존검색버튼들의 파라미터정보를 세팅한다.
			if (id.indexOf("combine") != -1) {

				//병합버튼일 경우, 사용자지정영역 비활성화
				//map.drawControl.disableControl("drawControl"); //draw hide

				$("#legendColor_" + map.mapInfo.id).find("#legend_auto").prop("disabled", true);
				$("#legendColor_" + map.mapInfo.id).find("#legend_equal").prop("disabled", true);
				$("#legendColor_" + map.mapInfo.id).find("#legend_user").prop("disabled", true);
				$("#legendColor_" + map.mapInfo.id).find("#legend_auto").prop("checked", true);

				var tmpParamList = deepCopy($interactiveMap.ui.combineList);
				$interactiveMap.ui.searchBtnType = "combine";
				for (var i = 0; i < $interactiveMap.ui.combineList.length; i++) {
					if (tmpParamList[i].idx == id) {
						selParams = tmpParamList[i].params;
						noneParams = tmpParamList[i].noneParams;
						api_id = tmpParamList[i].refIds;
						filterParam = tmpParamList[i].filterParam;
						unit = tmpParamList[i].unit;
						title = tmpParamList[i].title;
						maxYear = tmpParamList[i].maxYear;
						break;
					}
				}

			} else if (id.indexOf("cItems") != -1) {
				var tmpParamList = deepCopy($interactiveMap.ui.combineList);
				$interactiveMap.ui.searchBtnType = "normal";
				for (var i = 0; i < $interactiveMap.ui.combineList.length; i++) {
					if (tmpParamList[i].idx == id) {
						var selParams = [];
						for (var x = 0; x < tmpParamList[i].params.length; x++) {
							selParams = tmpParamList[i].params[0];
							if (x == 1) {
								for (var y = 0; y < tmpParamList[i].params[x].length; y++) {
									if (tmpParamList[i].params[x][y].key != "year" &&
										tmpParamList[i].params[x][y].key != "low_search" &&
										tmpParamList[i].params[x][y].key != "area_type") {
										selParams.push(tmpParamList[i].params[x][y]);
									}
								}
							}
						}
						selParams.push({
							"key": "search_type",
							"value": tmpParamList[i].itemType
						});
						noneParams = tmpParamList[i].noneParams;
						filterParam = "data_cnt";
						unit = tmpParamList[i].unit[0];
						title = tmpParamList[i].title.join(" | ");
						maxYear = tmpParamList[i].maxYear[0];
						api_id = tmpParamList[i].refIds;
					}
				}

				if (data.adm_cd.length > 7) {
					data.adm_cd = data.adm_cd.substring(0, 7);
				}

				var params = {
					param: selParams,
					noneParams: noneParams,
					adm_cd: data.adm_cd,
					filter: filterParam,
					unit: unit,
					title: title,
					api_id: api_id,
					map: map,
					view_type: "NM",
					maxYear: maxYear
				};

				$interactiveMap.ui.curDropParams[map.id] = params;
				$interactiveMapApi.request.openApiItemCombine(params);
				return;

			} else {
				var tmpParamList = deepCopy($interactiveMap.ui.arParamList);
				//kosis
				if (id.split("-")[0] == "kosis") {
					var tempAdmCd = data.adm_cd;
					if (tempAdmCd == "00") {
						tempAdmCd = "1";
					}
					var admCdLen = tempAdmCd.length;
					interactiveMapKosis.map = map;
					index = id.split("-")[1];

					for (var i = 0; i < tmpParamList.length; i++) {
						if (tmpParamList[i].idx == index) {
							interactiveMapKosis.curSelectedTitle = tmpParamList[i].title;
							selParams.push(tmpParamList[i].params);
							break;
						}
					}

					var switchVal = 1;
					var tempParam = selParams[0];

					for (var i = 0; i < tempParam.length; i++) {
						if (tempParam[i].key == "gis_se") {
							switchVal = parseInt(tempParam[i].value);
							break;
						}
					}

					switch (switchVal) {
						case 1:
							if (admCdLen > 1) {
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
							if (admCdLen > 2) {
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
								if (map.zoom <= 1) {
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
							if (admCdLen > 5) {
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
								if (map.zoom <= 1) {
									map.setZoom(1);
									setTimeout(function() {
										interactiveMapKosis.getKosisDataList(selParams, 1, 1, map);
									}, 500);
								} else if (map.zoom > 1 && map.zoom <= 3) { //4->3
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
					$interactiveMap.ui.searchBtnType = "normal";
					api_id.push(id.split("-")[0]);
					index = id.split("-")[1];

					$("#legendColor_" + map.mapInfo.id).find("#legend_auto").prop("disabled", false);
					$("#legendColor_" + map.mapInfo.id).find("#legend_equal").prop("disabled", false);
					$("#legendColor_" + map.mapInfo.id).find("#legend_user").prop("disabled", false);

					for (var i = 0; i < tmpParamList.length; i++) {
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
				data.adm_cd = data.adm_cd.substring(0, 7);
			}

			// 현재 드랍된 행정동코드 저장
			$interactiveMap.ui.curAdmCode = data.adm_cd;
			for (var i = 0; i < api_id.length; i++) {
				if (selParams.length > 0) {
					var params = {
						param: selParams[i],
						noneParams: noneParams[i],
						adm_cd: data.adm_cd,
						filter: filterParam[i],
						unit: unit[i],
						title: title[i],
						api_id: api_id[i],
						map: map,
						view_type: "NM",
						maxYear: maxYear[i]
					};
					$interactiveMap.ui.curDropParams[map.id] = params;
					$interactiveMap.ui.requestOpenApi(params);
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
		didMouseOverPolygon: function(event, data, type, map) {
			if (type != "polygon") {
				if (type == "data") {
					//차트및범례 하이라이트
					if (data.info.length > 0) {
						map.mapInfo.selectChartData(data.properties, data.dataIdx);
						map.mapInfo.selectLegendRangeData(event.target.options.fillColor);
					}
				}
				$interactiveMap.ui.createInfoTooltip(event, data, type, map);
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
		didMouseOutPolygon: function(event, data, type, map) {},


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
		didSelectedPolygon: function(event, data, type, map) {
			$interactiveMap.ui.saveObject.event = event;
			$interactiveMap.ui.saveObject.data = data;
			$interactiveMap.ui.saveObject.map = map;
			if (type == "data") {
				$("#barChartTable td").removeClass("M_on");
				if($("#barChartTable tr[data-id="+data.properties.adm_cd+"]").length>0){
					$("#barChartTable").parents(".scrolls").animate({
						scrollTop: $("#barChartTable tr[data-id="+data.properties.adm_cd+"]").offset().top-$("#barChartTable").parents("table").offset().top
					}, 801);
					$("#barChartTable tr[data-id="+data.properties.adm_cd+"] td").addClass("M_on");
				}
			} else if (type == "build") {
				if ($interactiveMap.ui.buildPopup != null) {
					$interactiveMap.ui.buildPopup.close();
				}

				var top = $("#mapRgn_" + (map.id + 1)).offset().top + 100;
				var left = $("#mapRgn_" + (map.id + 1)).offset().left +
					$("#mapRgn_" + (map.id + 1)).width() / 2 - 400 / 2;

				$interactiveMap.ui.buildPopup =
					window.open(
						"/html/indoor/indoorMap.html?sufid=" + data.properties.sufid,
						"건물상세정보",
						"top=" + top + ", left=" + left + ", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
					);
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
		didDrawCreate: function(event, type, map) {
			var layer = event.layer;
			var area = "";
			if (type == "polygon") {
				area = "POLYGON((";
				for (var i = 0; i < layer.getUTMKs().length; i++) {
					area += layer.getUTMKs()[i].x + " " +
						layer.getUTMKs()[i].y + ",";

					if (i == layer.getUTMKs().length - 1) {
						area += layer.getUTMKs()[0].x + " " +
							layer.getUTMKs()[0].y;
					}
				}
				area += "))";
			} else if (type == "circle") {
				area = "CIRCLE(" +
					layer._utmk.x + " " +
					layer._utmk.y + "," +
					layer.getRadius() +
					")";
			} else if (type == "rectangle") {
				area = "RECTANGLE(" +
					layer._utmks[0].x + " " +
					layer._utmks[0].y + "," +
					layer._utmks[2].x + " " +
					layer._utmks[2].y +
					")";
			}

			var curParams = $interactiveMap.ui.curDropParams[map.id];
			$interactiveMapApi.request.openApiUserDrawForStats(curParams, area, event);
		},
        didFinishedHadmaArea: function(data,map){
            $(".research_control,.Btn_Research").removeClass("disabled");
        }

	};


	$interactiveMap.event = {

		/**
		 * 
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2014. 10. 15. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');

			//인구통계버튼 선택
			$interactiveMap.ui.setDetailStatsPanel("major");

			$interactiveMap.ui.panelGroup = {
				"major": ["API_0301"],
				"population": ["API_0302"],
				"household": ["API_0305"],
				"house": ["API_0306"],
				"company": ["API_0304-b", "API_0304-a"],
				"3f": ["API_0307", "API_0310"],
				"kosis": ["kosisStatsPanel", "kosisDataField"]
			};

			//연령별인구
			for (var i = 0; i <= 100; i+=5) {
				var j = i + 4;
				var tmpTextFrom = i + "세";
				var tmpTextTo = j + "세";
				if (i == 100) {
					tmpTextFrom = "100+"
				}
				if (j == 104) {
					tmpTextTo = "100+"
					
				}
				$("#populationAgeFrom").append($("<option>", {
					value: i,
					text: tmpTextFrom
				}));
				$("#populationAgeTo").append($("<option>", {
					value: j,
					text: tmpTextTo
				}));
			}
			$("#populationAgeFrom").val("10");
			$("#populationAgeTo").val("49");
			$("#populationAgeFrom").change(function() {
				var ageTo = $("#populationAgeTo").val();
				if (parseInt($(this).val()) > parseInt(ageTo)) {
					ageTo -= 4;
					$(this).val(ageTo);
				}
				$("#slider-range").slider("values", 0, $(this).val());
			});

			$("#populationAgeTo").change(function() {
				var ageFrom = $("#populationAgeFrom").val();
				if (parseInt($(this).val()) < parseInt(ageFrom)) {
					ageFrom = parseInt(ageFrom) + 4;
					$(this).val(ageFrom);
				}
				$("#slider-range").slider("values", 1, $(this).val());
			});

			$("#populationMrgState").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#populationMrgState").find("input:checked").length;
					if (cnt > 3) {
						$(this).prop("checked", false);
						messageAlert.open("알림", "혼인상태는 최대 3개까지 선택할 수 있습니다.");
						$sgisMobileInteractive.ui.multipleInitialize($(this));
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
						$sgisMobileInteractive.ui.multipleInitialize($(this));
					}
				});
			});

			$("#householdOcptnType").find("input").each(function(index) {
				$(this).click(function() {
					var cnt = $("#householdOcptnType").find("input:checked").length;
					if (cnt > 3) {
						$(this).prop("checked", false);
						messageAlert.open("알림", "점유형태별 가구는 최대 3개까지 선택할 수 있습니다.");
						$sgisMobileInteractive.ui.multipleInitialize($(this));
					}
				});
			});
			/** ********* 가구통계 end ********* */

			/** ********* 주택통계 start ********* */
			//주거면적
//			for (var i = 5; i <= 301; i++) {
//				var tmpText = i + "㎥";
//				if (i == 5) {
//					tmpText = "5-";
//				}else if (i == 301) {
//					tmpText = "300+";
//				}
//
//				$("#houseBdspaceFrom").append($("<option>", {
//					value: i,
//					text: tmpText
//				}));
//				$("#houseBdspaceTo").append($("<option>", {
//					value: i,
//					text: tmpText
//				}));
//			}
//
//			$("#houseBdspaceFrom").val("10");
//			$("#houseBdspaceTo").val("65");
//			$("#houseBdspaceFrom").change(function() {
//				var spaceTo = $("#houseBdspaceTo").val();
//				if (parseInt($(this).val()) > parseInt(spaceTo)) {
//					$(this).val(spaceTo);
//				}
//				$("#slider-range2").slider("values", 0, $(this).val());
//			});
//			$("#houseBdspaceTo").change(function() {
//				var spaceFrom = $("#houseBdspaceFrom").val();
//				if (parseInt($(this).val()) < parseInt(spaceFrom)) {
//					$(this).val(spaceFrom);
//				}
//				$("#slider-range2").slider("values", 1, $(this).val());
//			});
				var tmpHouseSpaceList = [0, 20, 40, 60, 85, 100, 130, 165, 230, 300];
				for (var i = 0; i <= tmpHouseSpaceList.length-1; i++) {
					var tmpText = tmpHouseSpaceList[i] + "㎥";
					if (i == tmpHouseSpaceList.length-1) {
						tmpText = "230+";
					}
					$("#houseBdspaceFrom").append($("<option>", {
						value: tmpHouseSpaceList[i],
						text: tmpText
					}));
					$("#houseBdspaceTo").append($("<option>", {
						value: tmpHouseSpaceList[i],
						text: tmpText
					}));
				}

				$("#houseBdspaceFrom").val("0");
				$("#houseBdspaceTo").val("20");
				$("#houseBdspaceFrom").change(function() {
					var spaceToOption = $("#houseBdspaceTo option").index($("#houseBdspaceTo option:selected")) - 1;
					var spaceTo = $("#houseBdspaceTo option:eq("+spaceToOption+")").val();
					if (parseInt($(this).val()) > parseInt(spaceTo)) {
						$(this).val(spaceTo);
					}
					$("#slider-range2").slider("values", 0, $(this).val());
				});
				$("#houseBdspaceTo").change(function() {
					var spaceFromOption = $("#houseBdspaceFrom option").index($("#houseBdspaceFrom option:selected")) + 1;
					var spaceFrom = $("#houseBdspaceFrom option:eq("+spaceFromOption+")").val();
					if (parseInt($(this).val()) < parseInt(spaceFrom)) {
						$(this).val(spaceFrom);
					}
					$("#slider-range2").slider("values", 1, $(this).val());
				});

			//주택유형갯수체크
			$("#houseType").find($("input")).each(function(index) {
				$(this).click(function() {
					var cnt = $("#houseType").find($("input:checked")).length;
					if (cnt > 3) {
						$(this).prop("checked", false);
						messageAlert.open("알림", "주택유형은 최대3개까지 선택할 수 있습니다.");
						$sgisMobileInteractive.ui.multipleInitialize($(this));
					}
				});
			});
			/** ********* 주택통계 end ********* */

			/** ********* 가구원통계 start ********* */
			//연령별인구
			for (var i = 0; i <= 100; i+=5) {
				var j = i + 4;
				var tmpTextFrom = i + "세";
				var tmpTextTo = j + "세";
				if (i == 100) {
					tmpTextFrom = "100+"
				}
				if (j == 104) {
					tmpTextTo = "100+"
					
				}
				$("#3fAgeFrom").append($("<option>", {
					value: i,
					text: tmpTextFrom
				}));
				$("#3fAgeTo").append($("<option>", {
					value: j,
					text: tmpTextTo
				}));
			}

			$("#3fAgeFrom").val("10");
			$("#3fAgeTo").val("49");
			$("#3fAgeFrom").change(function() {
				var ageTo = $("#3fAgeTo").val();
				if (parseInt($(this).val()) > parseInt(ageTo)) {
					ageTo -= 4
					$(this).val(ageTo);
				}
				$("#slider-range3").slider("values", 0, $(this).val());
			});

			$("#3fAgeTo").change(function() {
				var ageFrom = $("#3fAgeFrom").val();
				if (parseInt($(this).val()) < parseInt(ageFrom)) {
					ageFrom = parseInt(ageFrom) + 4;
					$(this).val(ageFrom);
				}
				$("#slider-range3").slider("values", 1, $(this).val());
			});
			/** ********* 가구원통계 end ********* */

			/** ********* 농가어가 가구통계 start ********* */
			//농림어가통계선택
			$("#3fConditionType").change(function() {
				var type = $("#3fConditionType").find($("input:checked"));
				if (type.val() == "fishery_cnt") {
					$("#3fOgaType").parent().show();
				} else {
					$("#3fOgaType").parent().hide();
				}
			});

			$("#3fConditionType").find($("input")).change(function() {
				$interactiveMap.ui.curSelectedDetailStatsType = "API_0307";
			});


			/** ********* 사업체테마통계 start ********* */
			$("input[name=theme-code]:radio").change(function(){
				$("#company-search-theme-list>li").removeClass("Select");
				$(this).parents("li.theme-list").addClass("Select");
			});
			$("#company-search-theme-list>li>a").click(function(){
				var is_show = $(this).parent().children("ul").is(":visible");
				$("#company-search-theme-list>li>ul").hide();
				$("#company-search-theme-list>li").removeClass("Open");
				if(!is_show){
					$(this).parent("li").addClass("Open").children("ul").show();
				}
			});
			/** ********* 사업체테마통계 end ********* */
		}
	};
}(window, document));