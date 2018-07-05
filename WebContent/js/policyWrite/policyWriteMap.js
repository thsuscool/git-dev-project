/**
 * 정책통계지도 등록화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2017/08/13  초기 작성
 * author : 권차욱
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyWriteMap = W.$policyWriteMap || {};

	$(document).ready(
		function() {
			$policyWriteMap.noReverseGeoCode = true;
			$policyWriteMap.ui.createMap("mapRgn_1", 0);
			$policyWriteMap.ui.createMap("mapRgn_2", 1);
			$policyWriteMap.event.setUIEvent();
			
			//좌측메뉴 오픈
			$("#leftMenu").click();
	});
	
	$policyWriteMap = {
			noReverseGeoCode : false
	};
	
	$policyWriteMap.ui = {
			namespace : "policyWriteMap",
			searchBtnType : "normal",
			mapList : [],
			curMapId : 0,
			dataTypeList : [],
			memberGrade : "PM",
			settingInfo : null,
			poiSettingInfo : null,
			circleRadius : 0,		//반경 반지름
			circleOpacity : 20,		//반경 투명도
			heatMapRadius : 20,		//열지도 반지름
			heatMapOpacity : 20,	//열지도 투명도
			poiLayerList : [], 		//poi 레이어 리스트 
			renderer : sop.svg(),
			analysisOriginMultiData : null,
			defaultPoiCnt : 200, //최소 POI 필터링 숫자
			mapBounds : null,
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 김성현
			 * @history 	 :
			 */
			createMap : function(id, seq) {
				var map = new sMap.map();
				map.createMap($policyWriteMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				
				//map.addControlEvent("movestart");
				//map.addControlEvent("moveend");
				//map.addControlEvent("zoomend");	
				//map.addControlEvent("draw");

				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($policyWriteMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "equal";
				
				//타입설정버튼 숨김
				//정책통계지도 등록 시, 타입변경은 의미없음
				$("#legendPopEvent00_"+ map.legend.id).parent().hide();
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;

				map.gMap.whenReady(function() {
					map.createHeatMap();
				});
				
				map.gMap.on("moveend", function(e) {
					$policyWriteMap.callbackFunc.didMapMoveEnd(e, map);
				});
				
				return map;
			},
			
			/**
			 * 
			 * @name         : doAnalysisData
			 * @description  : 파라미터정보를 체크한다.
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 파라미터 정보
			 */
			doAnalysisData : function(data, grade) {
				if (data != null && data != undefined) {
					this.memberGrade = grade;
					data = decodeURIComponent(window.atob(decodeURIComponent(data)));
					var tmpData = {};
					var params = data.split("&");
					for (var i=0; i<params.length; i++) {
						var objList = params[i].split("=");
						tmpData[objList[0]] = objList[1];
					}
					this.settingInfo = tmpData;
					$("#naviTitle").html(tmpData.adm_nm);
					$("#boundLevelTitle").html(tmpData.boundLevelTitle);
					switch (parseInt(this.settingInfo.idxType)) {
						case 1: //수요변화 지표
							//수요변화지표일 경우,
							//kosis와 협업형데이터는 시계열을 지원하지 않으므로 숨김
							$("#etcMenuItem").hide();
							$("#rightMenu").hide();
							$(".policySelectBox").show();
							break;
						case 2: //통계연산형 지표
							$("#rightMenu").show();
							$(".policySelectBox").hide();
							break;
						case 3: //시설 분석형 지표
							$("#rightMenu").show();
							$(".policySelectBox").hide();
							
							//시설분석형일 경우, 범례를 숨기고
							//poi설정버튼을 만든다.
							for (var i=0; i<this.mapList.length; i++) {
								var map = this.mapList[i];
								if (i==0) {
									this.createHeatMapChangeBtn(map);
								}else {
									$("#legend_"+map.legend.id).hide();
									this.createPoiSettingBtn(map);
								}
							}
							break;
					}
					
					for (var i=0; i<this.mapList.length; i++) {
						var map = this.mapList[i];
						map.mapMove([tmpData.coor_x, tmpData.coor_y], map.zoom);
					}

				}
				
			},
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				var html = "<table style='margin:10px;'>";
				if (type == "data") {
					if (data.info != undefined && data.info.length > 0) {
						var tmpData = map.multiLayerControl.multiData[0].data;
						switch(data.info[0].api_id) {
							case "API_KOSIS": //KOSIS
								var searchYear = tmpData.option.params.kosis_data_year + "년";
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>"+ searchYear +" 통계정보 : " + appendCommaToNumber(data.info[0].DATA)
								
									 if (data.info[0].unit != undefined && data.info[0].unit.length > 0)	{
										 html += "("+data.info[0].unit+")";
									 } 
									 + "</td>";
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							case "API_MYDATA":	//나의데이터
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>" + data.info[0].title + " : " + appendCommaToNumber(data.info[0].data_cnt) + "</td>"
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							case "API_LOCAL": //협업형데이터
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>" + data.info[0].div_nm + " : " + appendCommaToNumber(data.info[0].cnt) + "("+data.info[0].unit+")</td>"
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							case "API_LBDMS": //LBDMS데이터
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>통계정보 : " + appendCommaToNumber(data.info[0].cnt) +"</td>"
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							default:
								var searchYear = tmpData.option.params.year + "년";
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
									"fishery_cnt" : "어가수",
									"tot_family" : "총가구",
									"avg_fmember_cnt" : "평균가구원수",
									"tot_house" : "총주택",
									"nongga_cnt" : "농가(가구)",
									"nongga_ppltn" : "농가(인구)",
									"imga_cnt" : "임가(가구)",
									"imga_ppltn" : "임가인구",
									"naesuoga_cnt" : "내수면총어가",
									"naesuoga_ppltn" : "내수면 어가 인구", //2018.01.09 [개발팀] 문구수정
									"haesuoga_cnt" : "해수면총어가",
									"haesuoga_ppltn" : "해수면 어가 인구", //2018.01.09 [개발팀] 문구수정
									"employee_cnt" : "종사자수",
									"data_cnt" : "결합정보"
								};
								
							for (var i = 0; i < data.info.length; i++) {
								var tmpData = data.info[i];
								if (i == 0) {
									if (data.properties.adm_nm !== undefined) {
										html += "<tr><td class='admName'>"
											 + data.properties.adm_nm
											 + "</td></tr>"
											 + "<tr style='height:5px'></tr>";
									}
									
									//집계구 일경우
									if (data.properties.adm_cd.length > 7) {
										html += "<tr>";
										html += "<td class='statsData'>집계구 : " + data.properties.adm_cd + "</td>";
										html += "</tr>";
									}
								}
								
								if (tmpData.showData != undefined && tmpData.showData.length > 0) {
									var filterName = ""; 
									var title = "";
									if (showName[tmpData.showData] != undefined) {
										filterName = showName[tmpData.showData];
									}else{
										if(tmpData.div_nm!=null && tmpData.div_nm != undefined){
											filterName = tmpData.div_nm;
										}
									}
									html += "<tr style='font-size:12px;padding-left:5px;'>";
									if (filterName.length > 0) {
										title = searchYear +" " + filterName + " : ";
									} else {
										title = searchYear + " : ";
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
										tmpData.showData != "tot_suprt_per" &&
										tmpData.showData != "tot_worker" &&
										tmpData.showData != "avg_fmember_cnt" &&
										tmpData.showData != "employee_cnt" &&
										tmpData.showData != "cnt") {
										value = "N/A";
									}else {
										value = appendCommaToNumber(tmpData[tmpData.showData]);
									}
									
									if (value != "N/A") {
										html += "<td class='statsData'>"+title+value+" ("+tmpData.unit+")</td>";
									}else {
										html += "<td class='statsData'>"+title+value+"</td>";
									}
									html += "</td></tr>";
								}	
							}
							break;
						}
					}else {
						html += "<tr><td class='statsData'>N/A</td></td>";
					}
				}
				html += "</table>";

				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1,
					pane:"infowindowPane"
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
			 * @name         : setParams
			 * @description  : 통계파라미터 정보를 설정한다.
			 * @date         : 2017. 08. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param type : 통계타입
			 * @param options : 파라미터정보
			 * @param map : map 정보
			 */
			setParams : function(type, options, map) {
				var paramsData = {
						params : {},
						nonParams : {}, 
						unit : options.unit,
						filter : options.filterParam,
						title : options.title,
						adm_nm : this.settingInfo.adm_nm,
						dataType : type
				};
				for (var i=0; i<options.params.length; i++) {
					paramsData.params[options.params[i].key] = options.params[i].value;
				}
				
				for (var i=0; i<options.noneParams.length; i++) {
					paramsData.nonParams[options.noneParams[i].key] = options.noneParams[i].value;
				}
				
				//비자치구 여부 체크
				var isAtdrc = false;
				var admList = [];
				var adm_cd = this.settingInfo.adm_cd;
				var sido_cd =  adm_cd.substring(0,2);
				if ($psmCombine.ui.atdrcList[sido_cd]){
					$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt, sidoNode){
						if (sidoNode.adm_cd == adm_cd) {
							isAtdrc = true;
							for (var i=0; i<sidoNode.sgg_list.length; i++) {
								admList.push(sido_cd + sidoNode.sgg_list[i]);
							}
						}
					});
				}
				
				if (!isAtdrc) {
					admList.push(adm_cd);
				}
				
				paramsData["isAtdrc"] = isAtdrc;
				switch (type) {
					case "census":   //센서스 통계
						paramsData.params["bnd_year"] = map.bnd_year;
						paramsData.params["low_search"] = this.settingInfo.boundLevel;
						break;
					case "kosis":    //kosis 통계
						paramsData["etc"] = {};
						paramsData.etc["gis_se"] = deepCopy(paramsData.params.gis_se);
						paramsData.etc["adm_cd"] = adm_cd;
						paramsData.etc["low_search"] = this.settingInfo.boundLevel;
						paramsData.params.gis_se = adm_cd;
						break;
					case "local":    //공공데이터(LBDMS)
					case "lbdms":
						paramsData["etc"] = {};
						paramsData.params["low_search"] = this.settingInfo.boundLevel;
						paramsData.params["bnd_year"] = map.bnd_year;
						break;
					case "userData": //나의데이터
						paramsData["etc"] = {};
						paramsData.etc["low_search"] = this.settingInfo.boundLevel;
						paramsData.etc["bnd_year"] = map.bnd_year;
						break;
					default:
						break;
				}
				
				return {
					"param" : paramsData,
					"admList" : admList
				}
			},
			
			/**
			 * 
			 * @name         : setDemandYearList
			 * @description  : 년도정보를 설정한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options: 파라미터정보
			 * @param idx    : 인덱스정보
			 */
			setDemandYearList : function(type, options, idx) {
				switch(type) {
					case "census":   //센서스 통계
						var yearList = $(options.yearListId).html();
						$("#policySelectBox_"+(idx+1)).html(yearList);
						for (var i=0; i<options.params.length; i++) {
							if (options.params[i].key == "year") {
								$("#policySelectBox_"+(idx+1)).val(options.params[i].value);
								break;
							}
							//2018.01.08 [개발팀]
							//테마코드 2006년부터
							else if (options.params[i].key == "theme_cd") {
								$("#policySelectBox_"+(idx+1) + " option").each(function() {
									if (parseInt($(this).val()) < 2006) {
										$(this).hide();
									}
								});
							}
						}
						break;
					case "userData": //나의데이터
						$("#policySelectBox_"+(idx+1)).html(options);
						$("#policySelectBox_"+(idx+1) + " option:eq(0)").attr("selected", "selected");
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doReqStatsData
			 * @description  : 통계정보를 조회한다.
			 * @date         : 2017. 08. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options : 파라미터정보
			 */
			doReqStatsData : function(api_id, options) {
				switch(parseInt(this.settingInfo.idxType)) {
					case 1:	//수요변화지표
						for (var i=0; i<this.mapList.length; i++) {
							var map = this.mapList[i];
							this.setDemandYearList(options[0].type, options[0], i);
							for (var k=0; k<options.length; k++) {
								this.doDemandIndexData(api_id, options[k], map);
							}
						}
						break;
					case 2:	//통계연산형지표
						var map = this.mapList[this.curMapId];
						this.doCalculateIndexData(api_id, options[map.id], map);
						break;
					case 3: //시설분석형지표
						var map = this.mapList[this.curMapId];
						this.analysisOriginMultiData = null;
						this.doAnalysisIndexData(api_id, options[0], map);
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doDemandIndexData
			 * @description  : 수요변화지표를 조회한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			doDemandIndexData : function(api_id, options, map) {
				var type = options.type;
				var setData = this.setParams(type, options, map);
				switch(type) {
					case "census":   //센서스 통계
						map.multiLayerControl.multiData = [];
						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyWriteMapApi.ui.doCensusStatsData(api_id, setData, map);
						}
						break;
					case "userData": //나의데이터
						map.multiLayerControl.multiData = [];
						$policyWriteMapApi.ui.doUserStatsData(api_id, setData, map);
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doCalculateIndexData
			 * @description  : 통계연산형지표를 조회한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			doCalculateIndexData : function(api_id, options, map) {
				var type = options.type;
				var setData = this.setParams(type, options, map);
				switch(type) {
					case "census":   //센서스 통계
						map.multiLayerControl.multiData = [];
						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyWriteMapApi.ui.doCensusStatsData(api_id, setData, map);
						}
						break;
					case "userData": //나의데이터
						map.multiLayerControl.multiData = [];
						$policyWriteMapApi.ui.doUserStatsData(api_id, setData, map);
						break;
					case "kosis": //KOSIS
						map.multiLayerControl.multiData = [];
						setData.param.params["gis_se"] = setData.admList[0];
						$policyWriteMapApi.ui.checkKosisParams(api_id, setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["gis_se"] = setData.admList[k];
								$policyWriteMapApi.ui.doKosisStatsData(api_id, setData, map);
							}
						});
						break;
					case "local": //협업형 데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyWriteMapApi.ui.checkLocalParams(api_id, setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyWriteMapApi.ui.doLocalStatsData(api_id, setData, map);
							}
						});
						break;
					case "lbdms": //LBDMS 전송데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyWriteMapApi.ui.checkLbdmsParams(api_id, setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyWriteMapApi.ui.doLbdmsStatsData(api_id, setData, map);
							}
						});
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doAnalysisIndexData
			 * @description  : 시설분석형지표를 조회한다.
			 * @date         : 2017. 09. 13. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			doAnalysisIndexData : function(api_id, options, map) {
				var type = options.type;
				var setData = this.setParams(type, options, map);
				switch(type) {
					case "census":   //센서스 통계
						map.multiLayerControl.multiData = [];
						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyWriteMapApi.ui.doCensusStatsData(api_id, setData, map);
						}
						break;
					case "userData": //나의데이터
						map.multiLayerControl.multiData = [];
						$policyWriteMapApi.ui.doUserStatsData(api_id, setData, map);
						break;
					case "kosis": //KOSIS
						map.multiLayerControl.multiData = [];
						setData.param.params["gis_se"] = setData.admList[0];
						$policyWriteMapApi.ui.checkKosisParams(api_id, setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["gis_se"] = setData.admList[k];
								$policyWriteMapApi.ui.doKosisStatsData(api_id, setData, map);
							}
						});
						break;
					case "local": //협업형 데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyWriteMapApi.ui.checkLocalParams(api_id, setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyWriteMapApi.ui.doLocalStatsData(api_id, setData, map);
							}
						});
						break;
					case "lbdms": //lbdms 전송데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyWriteMapApi.ui.checkLbdmsParams(api_id, setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyWriteMapApi.ui.doLbdmsStatsData(api_id, setData, map);
							}
						});
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doReqPoiData
			 * @description  : 통계정보를 조회한다.
			 * @date         : 2017. 09. 15. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options : 파라미터정보
			 */
			doReqPoiData : function(options) {
				var map = this.mapList[this.curMapId];
				var titleList = [];
				for (var i=0; i<options.length; i++) {
					var type = options[i].type;
					var setData = this.setPoiParams(type, options[i], map);
					$policyWriteMapApi.ui.clearPoi();
					
					switch(type) {
						case "census":	 //센서스통계
							$policyWriteMapApi.ui.doCensusPoiData(setData, i, map);
							break;
						case "local":	 //협업형데이터
							$policyWriteMapApi.ui.doLocalPoiData(setData, i, map);
							break;
						case "userData": //나의데이터
							$policyWriteMapApi.ui.doUserPoiData(setData, i, map);
							break;
						case "lbdms": 	//LBDMS데이터
							$policyWriteMapApi.ui.doLbdmsPoiData(setData, i, map);
							break;
						default:
							break;
					}
					titleList.push(options[i].title);
				}
				//설정팝업창에 POI목록을 설정한다.
				this.setPoiListPopupBox(options);
				
				//타이릍 설정
				var tmpOptions = {
					title : titleList.join(",")
				};
				this.setTitle(tmpOptions, map);
			},
			
			/**
			 * 
			 * @name         : setPoiParams
			 * @description  : POI데이터 파라미터를 설정한다.
			 * @date         : 2017. 09. 15. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param type   : 타입정보
			 * @param options: 파라미터정보
			 * @param map    : 맵정보
			 */
			setPoiParams : function(type, options, map) {
				//비자치구 여부 체크
				var isAtdrc = false;
				var adm_cd = this.settingInfo.adm_cd;
				var sido_cd = adm_cd.substring(0,2);
				if ($psmCombine.ui.atdrcList[sido_cd]){
					$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt, sidoNode){
						if (sidoNode.adm_cd == adm_cd) {
							isAtdrc = true;
						}
					});
				}
				
				if (isAtdrc) {
					//2017.01.08 [개발팀] 비자치구 조회 수정
					options.params["atdrc_type"] = "1";
				}
				
				switch(type) {
					case "census":	 //센서스통계
						options.params["base_year"] = companyDataYear;
						options.params["adm_cd"] = adm_cd;
						break;
					case "local":	 //협업형데이터
					case "lbdms":	 //LBDMS데이터
						options.params["base_year"] = bndYear;
						options.params["page_num"] = "1";
						options.params["page_size"] = "1000000";
						switch(adm_cd.length) {
							case 2: //시도
								options.params["sido_cd"] = adm_cd;
								break;
							case 5: //시군구
								options.params["sido_cd"] = adm_cd.substring(0,2);
								options.params["sgg_cd"] = adm_cd.substring(2,5);
								break;
							case 7: //읍면동
								options.params["sido_cd"] = adm_cd.substring(0,2);
								options.params["sgg_cd"] = adm_cd.substring(2,5);
								options.params["emdong_cd"] = adm_cd.substring(5,7);
								break;
						}
						break;
					case "userData": //나의데이터
						options.params["adm_cd"] = adm_cd;
						break;
					default:
						break;
				}
				
				return options;
			},
			
			/**
			 * 
			 * @name         : setTitle
			 * @description  : 통계정보를 타이틀을 설정한다.
			 * @date         : 2017. 08. 24. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			setTitle : function(options, map) {
				var id = map.id;
				var title = options.title;
				
				//년도가 있으면 년도정보 설정
				if (options.year != undefined) {
					title += " ("+options.year+")";
				}
				
				$("#title_"+(id+1)).html(title);
			},
			
			/**
			 * 
			 * @name         : doCombineMap
			 * @description  : 통계정보를 융합한다.
			 * @date         : 2017. 08. 24. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			doCombineMap : function() {
				if ($policyWriteMap.ui.checkCombine()) {
					switch (parseInt(this.settingInfo.idxType)) {
						case 2: //통계연산형 
							//수식연산형 팝업오픈
							this.setCalculatePopup();
							break;
						default:
							$policyWriteCombineMap.ui.initCombineMap(this);
							break;
					}
				}else {
					messageAlert.open("알림", "융합할 수 없는 조회결과입니다.");
				}
			},
			
			/**
			 * 
			 * @name         : checkCombine
			 * @description  : 융합정보를 체크한다.
			 * @date         : 2017. 08. 25. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			checkCombine : function() {
				var isCombine = true;
				switch (parseInt(this.settingInfo.idxType)) {
					case 1: //수요변화 지표
						for (var i=0; i<this.mapList.length; i++) {
							var map = this.mapList[i];
							if (map.multiLayerControl.dataGeojson == null ||
								map.multiLayerControl.dataGeojson.length == 0 ||
								map.data[0].result.length == 0) {
								isCombine = false;
							}
						}
						break;
					case 2: //통계연산형 지표
						for (var i=0; i<this.mapList.length; i++) {
							var map = this.mapList[i];
							if (map.multiLayerControl.dataGeojson == null ||
								map.multiLayerControl.dataGeojson.length == 0 ||
								map.data[0].result.length == 0) {
								isCombine = false;
							}
						}
						break;
					case 3: //시설 분석형 지표
						for (var i=0; i<this.mapList.length; i++) {
							var map = this.mapList[i];
							switch(map.id) {
								case 0:
									if (map.multiLayerControl.dataGeojson == null ||
										map.multiLayerControl.dataGeojson.length == 0 ||
										map.data[0].result.length == 0) {
										isCombine = false;
									}
									break;
								case 1:
									if (this.poiLayerList.length == 0) {
										isCombine = false;
									}
									break;
							}
						}
						break;
					default:
						break;
				}
				
				return isCombine;
			},
			
			/**
			 * 
			 * @name         : setCalculatePopup
			 * @description  : 통계연산 팝업창을 설정한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			setCalculatePopup : function() {
				$("#tData_1").html($("#title_1").html());
				$("#tData_2").html($("#title_2").html());
				$("#calculatePopup").show();
			},
			
			/**
			 * 
			 * @name         : setCalculatePopup
			 * @description  : 연산기준을 변경한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			doCalculateChange : function() {
				var hDataA = $("#hData_1").clone().html();
				var hDataB = $("#hData_2").clone().html();
				var tDataA = $("#tData_1").clone().html();
				var tDataB = $("#tData_2").clone().html();
				
				$("#hData_1").html(hDataB);
				$("#hData_2").html(hDataA);
				$("#tData_1").html(tDataB);
				$("#tData_2").html(tDataA);
			},
			
			/**
			 * 
			 * @name         : doCalculateApply
			 * @description  : 통계설정을 적용한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			doCalculateApply : function() {
				var standData = 0;
				if ($("#hData_1").html().indexOf("A") != -1) {
					standData = 0;
				}else {
					standData = 1;
				}
				var calcSymbol = $("#calculSymbolSelectBox").val();
				$policyWriteMap.event.popupClose("calculatePopup");
				$policyWriteCombineMap.ui.setCalcData(standData, calcSymbol);
				$policyWriteCombineMap.ui.initCombineMap(this);
				
			},
			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵을 초기화 한다.
			 * @date         : 2017. 09. 12. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			doClearMap : function() {
				for (var i=0; i<this.mapList.length; i++) {
					var map = this.mapList[i];
					map.multiLayerControl.multiData = [];
					$policyWriteMapApi.ui.clear(map);
				}
				this.analysisOriginMultiData = null;
				$policyWriteMapApi.ui.clearPoi();
			},
			
			/**
			 * 
			 * @name         : createPoiSettingBtn
			 * @description  : 위치정보 시각화설정 팝업창을 생성한다.
			 * @date         : 2017. 09. 19. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param map	 : 맵정보
			 */
			createPoiSettingBtn : function(map) {
				var infoControl = sop.control({position: 'bottomleft'});
				infoControl.onAdd = function (map) {
					this._div = sop.DomUtil.create('div', 'info_control');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'poiSettingBtn');
					return this._div;
				};

				infoControl.update = function (props) {
					var html = "";
						html += "<div class='btn_gpsSetting'>";
						html +=		"<span>위치정보<br>시각화설정</span>";
						html += "</div>";
					this._div.innerHTML = html;
				};
				infoControl.addTo(map.gMap);	
			},
			
			/**
			 * 
			 * @name         : createHeatMapChangeBtn
			 * @description  : 열지도/색상지도로 변환한다.
			 * @date         : 2017. 11. 13. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param map	 : 맵정보
			 */
			createHeatMapChangeBtn : function(map) {
				var infoControl = sop.control({position: 'bottomright'});
				infoControl.onAdd = function (map) {
					this._div = sop.DomUtil.create('div', 'info_control');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'heatMapChangeBtn');
					$(this._div).attr("class", 'color');
					return this._div;
				};

				infoControl.update = function (props) {
					var html = "";
						html += "<div class='btn_heatMapSetting'>";
						html +=		"<span>열지도<br>변환</span>";
						html += "</div>";
					this._div.innerHTML = html;
				};
				infoControl.addTo(map.gMap);	
			},
			
			/**
			 * 
			 * @name         : setPoiListPopupBox
			 * @description  : 위치정보 시각화 팝업창에 POI리스트를 생성한다.
			 * @date         : 2017. 09. 19. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiList: POI목록정보
			 */
			setPoiListPopupBox : function(poiList) {
				$("#poiList_radio").empty();
				var html = "";
				for (var i=0; i<poiList.length; i++) {
					html += "<li>";
					html +=		"<label id='poi_"+i+"'>"+poiList[i].title+"</label>"
					html +=	"</li>";
				}
				$("#poiList_radio").append(html);
				$("#poi_0").addClass("on");
			},
			
			/**
			 * 
			 * @name         : setPoiListPopupBox
			 * @description  : 위치정보 시각화 팝업창에 POI리스트를 생성한다.
			 * @date         : 2017. 09. 19. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiList: POI목록정보
			 */
			checkSettingPopup : function() {
				if (this.poiLayerList.length == 0) {
					messageAlert.open("알림", "위치정보가 조회되지 않았습니다.<br>위치정보 시각화 설정을 위해서는 먼저 위치정보를 조회해주세요.");
					return false;
				}else {
					this.initPoiSetting(true);
				}
				return true;
			},
			
			/**
			 * 
			 * @name         : checkHeatMapChangePopup
			 * @description  : 표출된 색상지도가 열지도로 변활될 수 있는지 체크한다.
			 * @date         : 2017. 11. 13. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			checkHeatMapChangePopup : function() {
				if ($policyWriteMapLeftMenu.ui.arParamList.length == 0) {
					messageAlert.open("알림", "통계정보가 조회되지 않았습니다.<br>열지도변환 설정을 위해서는 먼저 통계정보를 조회해주세요.");
					return false;
				}else {
					var options = $policyWriteMapLeftMenu.ui.arParamList[0];
					if (options.type != "census") {
						messageAlert.open("알림", "열지도변환은 센서스통계에만 해당됩니다.");
						return false;
					}
				}
				return true;
			},
			
			/**
			 * 
			 * @name         : doSetPoiSetting
			 * @description  : POI설정정보를 저장한다.
			 * @date         : 2017. 09. 19. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			doSetPoiSetting : function() {
				//일괄/개별모드 설정
				var mode = null;
				$(".settingMode_radio label").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						mode = $(this).attr("id");
					}
				});
				
				//POI항목선택
				var idx = 0;
				$("#poiList_radio label").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						idx = $(this).attr("id");
						idx = parseInt(idx.split("poi_")[1]);
					}
				});
				
				//POI 모양설정
				var shapeCd = null;
				$("#poiShape_radio label").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						shapeCd = $(this).attr("id");
						shapeCd = shapeCd.split("shape_")[1];
					}
				});
				
				//POI 색상설정
				var colorCd = null;
				$("#poiColor_radio label").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						colorCd = $(this).attr("id");
						colorCd = colorCd.split("color_")[1];
					}
				});
				
				//반경색상설정
				var radiusColorCd = null;
				$("#poiRadius_radio label").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						radiusColorCd = $(this).attr("id");
						radiusColorCd = radiusColorCd.split("radius_")[1];
					}
				});
				
				//반경설정
				var radius = $("#slider-radius").slider("option", "value");
				
				//반경 투명도설정
				var radiusOpacity = $("#slider-opacity").slider("option", "value");
				
				//열지도 반지름 설정
				var heatRadius = $("#heat-radius").slider("option", "value");
				
				//열지도 투명도 설정
				var heatOpacity = $("#heat-opacity").slider("option", "value");
				
				//2018.02.06 [개발팀]
				if (shapeCd == "5") {
					radius = 0;
				}
				
				var poiList = this.poiLayerList;
				switch (mode) {
					case "indivisual": //개별설정
						if (poiList[idx] == undefined) {
							$policyWriteMap.event.popupClose("policyPoiBox");
							return;
						}
						poiList[idx]["settingInfo"] = {
							mode : mode,
							shapeCd : shapeCd,
							colorCd : colorCd,
							radiusColorCd : radiusColorCd,
							radius : radius,
							radiusOpacity : radiusOpacity,
							heatRadius : heatRadius,
							heatOpacity : heatOpacity
						};
						this.doApplyPoiSetting(poiList[idx]);
						break;
					case "batch": //일괄설정
						for (var i=0; i<poiList.length; i++) {
							poiList[i]["settingInfo"] = {
								mode : mode,	
								shapeCd : shapeCd,
								colorCd : colorCd,
								radiusColorCd : radiusColorCd,
								radius : radius,
								radiusOpacity : radiusOpacity,
								heatRadius : heatRadius,
								heatOpacity : heatOpacity
							};
							this.doApplyPoiSetting(poiList[i]);
						}
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doApplyPoiSetting
			 * @description  : POI설정정보를 적용한다
			 * @date         : 2017. 09. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI설정정보
			 */
			doApplyPoiSetting : function(poiInfo) {
				var map = this.mapList[1];
				var setInfo = poiInfo.settingInfo;
				var markerGroup = poiInfo.markerGroup;
				var heatGroup = poiInfo.heatGroup;
				var clusterGroup = poiInfo.clusterGroup;
				
				clusterGroup.clearLayers();
				markerGroup.clearLayers();
				if (heatGroup) {
					heatGroup.setUTMKs([]);
				}
				
				switch(parseInt(setInfo.shapeCd)) {
					case 1:
					case 2:
					case 3:
					case 4:
						//마커를 생성한다.
						if (poiInfo.data.length > this.defaultPoiCnt && map.gMap._zoom >= 9) {
							poiInfo["markerType"] = "cluster";
							this.drawPoiMarker(poiInfo, map, 1, this.mapBounds);
						}else {
							if (poiInfo["markerType"] != "cluster") {
								poiInfo["markerType"] = "normal";
								this.drawPoiMarker(poiInfo, map, 1);
							}else {
								poiInfo["markerType"] = "cluster";
								this.drawPoiMarker(poiInfo, map, 2);
							}
						}
						break;
					case 5:
						//열지도를 생성한다.
						poiInfo["markerType"] = "heatMap";
						this.drawPoiHeatMap(poiInfo, map);
						break;
				}
			
				//반경정보 삭제
				var circleGroup = poiInfo.circleGroup;
				if (circleGroup != null) {
					for (var i=0; i<circleGroup.length; i++) {
						circleGroup[i].remove();
					}
				}
				
				//반경정보가 있을 경우, 반경정보 표출
				if (setInfo.radius != 0) {
					this.drawPoiCircle(poiInfo, map);
				}
				
				$policyWriteMap.event.popupClose("policyPoiBox");
			},
			
			/**
			 * 
			 * @name         : checkPoiSetting
			 * @description  : POI설정정보를 체크한다.
			 * @date         : 2017. 09. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param mode   : POI설정모드
			 * @param idx 	 : 인덱스번호
			 */
			checkPoiSetting : function(idx) {
				var poiList = this.poiLayerList[idx];
				if (poiList == undefined) {
					return;
				}
				var setInfo = poiList.settingInfo;
				if (setInfo != undefined) {
					$("#shape_"+setInfo.shapeCd).click();
					$("#color_"+setInfo.colorCd).click();
					$("#radius_"+setInfo.radiusColorCd).click();
					$("#slider-radius").slider("value", setInfo.radius);
					$("#slider-opacity").slider("value", setInfo.radiusOpacity);
					$("#radiusSelectBox").val(setInfo.radius);
					$("#radiusOpacitySelectBox").val(setInfo.radiusOpacity);
					$("#heat-radius").slider("value", setInfo.heatRadius);
					$("#heat-opacity").slider("value", setInfo.heatOpacity);
					$("#heatRadiusInputBox").val(setInfo.heatRadius);
					$("#heatOpacityInputBox").val(setInfo.heatOpacity);
					
				}else {
					this.initPoiSetting(false);
				}
			},
			
			/**
			 * 
			 * @name         : initPoiSetting
			 * @description  : POI설정정보를 초기화한다.
			 * @date         : 2017. 09. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			initPoiSetting : function(isPass) {
				if (isPass) {
					$("#poiList_radio label").removeClass("on")
					$("#poiList_radio label:eq(0)").click();
					
					//모드설정 초기화
					$(".settingMode_radio label").removeClass("on");
					$("#indivisual").addClass("on");
					$("#setting_poiList").show();
				}
				
				
				//모양설정 초기화
				$("#poiShape_radio label").removeClass("on");
				$("#shape_1").addClass("on");
				
				//색상설정 초기화
				$("#poiColor_radio label").removeClass("on");
				$("#color_1").addClass("on");
				
				//반경설정 초기화
				$("#poiRadius_radio label").removeClass("on");
				$("#radius_1").addClass("on");
				
				//반경/투명도 슬라이더 초기화 
				$("#slider-radius").slider("value", this.circleRadius);
				$("#slider-opacity").slider("value", this.circleOpacity);
				$("#radiusSelectBox").val(this.circleRadius);
				$("#radiusOpacitySelectBox").val(this.circleOpacity);
				
				//열지도 반지름/투명도 초기화
				$("#heat-radius").slider("value", this.heatMapRadius);
				$("#heat-opacity").slider("value", this.heatMapOpacity);
				$("#heatRadiusInputBox").val(this.heatMapRadius);
				$("#heatOpacityInputBox").val(this.heatMapOpacity);
				
				$("#poiRadiusArea").show();
				$("#poiRadiusArea").next().show();
				$("#poiRadiusColorArea").show();
				$("#poiRadiusColorArea").next().show();
				$("#poiRadiusArea").addClass("on");
				$("#poiRadiusColorArea").addClass("on");
				$("#heatRadiusArea").hide();
				$("#heatRadiusArea").next().hide();
				$("#heatOpacityArea").hide();
				$("#heatOpacityArea").next().hide();
			},
			
			/**
			 * 
			 * @name         : setMarker
			 * @description  : POI정보를 세팅한다.
			 * @date         : 2017. 12. 05. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param dataList: POI데이터
			 * @param iconUrl	 : icon url
			 * @param markerGroup : 마커그룹
			 * @param poiInfo : 설정정보
			 */
			setMarker : function(dataList, iconUrl, markerGroup, poiInfo) {
				var icon = sop.icon({
					iconUrl: iconUrl,
					shadowUrl: '/img/marker/theme_shadow.png',
					iconAnchor: [7, 7 ],
					iconSize: [ 14, 14 ],
					infoWindowAnchor: [1, -16]
				});
				var marker = sop.marker([ dataList.coor_x, dataList.coor_y ], {
					icon : icon,
					opacity : 0.7
				});
				marker.info = dataList;
				markerGroup.addLayer(marker);
					
				var html = "";
				html += '<table class="policyPoiTooltip">';
				switch (dataList.type) {
					case "census":	//센서스 POI 통계
						html += '<tr>';
						html += 	'<th>' + dataList.corp_nm + '</th>';
						html += 	'<td></td>';
						html += '</tr>';
						html += '<tr>';
						html +=		'<td>'+ dataList.naddr + '</td>';
						html += '</tr>';
						break;
					case "local": //협업형 POI 통계
						html += '<tr>';
						html += 	'<th>' + dataList.div_nm + '</th>';
						html += 	'<td></td>';
						html += '</tr>';
						break;
					case "userData": //사용자 POI 통계
						html += '<tr>';
						html += 	'<th>' + dataList.title + '</th>';
						html += 	'<td></td>';
						html += '</tr>';
						break;
				}
				
				html += '</table>';
				marker.bindInfoWindow(html);
			},
			
			/**
			 * 
			 * @name         : drawPoiMarker
			 * @description  : POI정보를 표출한다.
			 * @date         : 2017. 09. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI정보
			 * @param map	 : 맵정보
			 */
			drawPoiMarker : function(poiInfo, map, type, mapBounds) {
				var setInfo = poiInfo.settingInfo;
				var dataList = poiInfo.data;
				var markerGroup = null;//poiInfo.markerGroup;
				
				switch (type) {
					case 1:
						markerGroup = poiInfo.markerGroup;
						break;
					case 2:
						markerGroup = poiInfo.clusterGroup;
						break;
				}
				markerGroup.clearLayers();
				
				var iconUrl = "";
				switch(parseInt(setInfo.shapeCd)) {
					case 1: //원
						iconUrl = "/img/policyStatic/ico_circle_0"+setInfo.colorCd+".png";
						break;
					case 2:	//사각형
						iconUrl = "/img/policyStatic/ico_rectangle_0"+setInfo.colorCd+".png";
						break;
					case 3:	//마름모
						iconUrl = "/img/policyStatic/ico_rhrombus_0"+setInfo.colorCd+".png";
						break;
					case 4:	//역삼각형
						iconUrl = "/img/policyStatic/ico_triangle_0"+setInfo.colorCd+".png";
						break;
					case 5: //열지도
						break;
				}
				
				for (var i=0; i<dataList.length; i++) {
					if (mapBounds != null && mapBounds != undefined) {
						if (mapBounds.contains(sop.utmk(dataList[i].coor_x, dataList[i].coor_y))) {
							this.setMarker(dataList[i], iconUrl, markerGroup, poiInfo);
						}
					}else {
						this.setMarker(dataList[i], iconUrl, markerGroup, poiInfo);
					}
				}
				
				/*for (var i=0; i<dataList.length; i++) {
					var icon = sop.icon({
						iconUrl: iconUrl,
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [7, 7 ],
						iconSize: [ 14, 14 ],
						infoWindowAnchor: [1, -16]
					});
					var marker = sop.marker([ dataList[i].coor_x, dataList[i].coor_y ], {
						icon : icon,
						opacity : 0.7
					});
					marker.info = dataList[i];
					markerGroup.addLayer(marker);
						
					var html = "";
					html += '<table class="policyPoiTooltip">';
					switch (dataList[i].type) {
						case "census":	//센서스 POI 통계
							html += '<tr>';
							html += 	'<th>' + dataList[i].corp_nm + '</th>';
							html += 	'<td></td>';
							html += '</tr>';
							html += '<tr>';
							html +=		'<td>'+ dataList[i].naddr + '</td>';
							html += '</tr>';
							break;
						case "local": //협업형 POI 통계
							html += '<tr>';
							html += 	'<th>' + dataList[i].div_nm + '</th>';
							html += 	'<td></td>';
							html += '</tr>';
							break;
						case "userData": //사용자 POI 통계
							html += '<tr>';
							html += 	'<th>' + dataList[i].title + '</th>';
							html += 	'<td></td>';
							html += '</tr>';
							break;
					}
					
					html += '</table>';
					marker.bindInfoWindow(html);
				}*/
			},
			
			/**
			 * 
			 * @name         : drawPoiCircle
			 * @description  : 반경정보를 표출한다.
			 * @date         : 2017. 09. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI정보
			 * @param map	 : 맵정보
			 */
			drawPoiCircle : function(poiInfo, map) {
				var setInfo = poiInfo.settingInfo;
				var markerGroup = poiInfo.markerGroup;
				var circleGroup = [];
				markerGroup.eachLayer(function(marker) {
					var fillColor = "#0070C0";
					switch (parseInt(setInfo.radiusColorCd)) {
						case 1:
							fillColor = "#0070C0";
							break;
						case 2:
							fillColor = "#ff0000";
							break;
						case 3:
							fillColor = "#0E4000";
							break;
						case 4:
							fillColor = "#000"; 
							break;
						case 5:
							fillColor = "#ffff00";
							break;
					}
					var utmk = marker.getUTMK();
					var circle = sop.circle([utmk.x, utmk.y], setInfo.radius, {
						color : fillColor,
						fillColor : fillColor,
						fillOpacity : setInfo.radiusOpacity / 100,
						opacity :0,
						weight : 0,
						renderer : this.renderer
					});
					circle.addTo(map.gMap);
					circleGroup.push(circle);
				});
				poiInfo.circleGroup = circleGroup;
			},
			
			/**
			 * 
			 * @name         : drawHeatMap
			 * @description  : 열지도를 표출한다.
			 * @date         : 2017. 09. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI정보
			 * @param map	 : 맵정보
			 */
			drawPoiHeatMap : function(poiInfo, map) {
				var dataList = poiInfo.data;
				var setInfo = poiInfo.settingInfo;
				var heatGroup = poiInfo.heatGroup;
				if (heatGroup) {
					heatGroup.setUTMKs([]);
				}
				
				var gradient = {};
				switch (parseInt(setInfo.colorCd)) {
					case 1: //파란색계열
						gradient = {
							"0.4" : "#3678F3",
							"0.6" : "#86CCF3",
							"0.7" : "#0070C0",
							"0.8" : "#342FF1",
							"1.0" : "#0000ff"
						};
						break;
					case 2: //빨간색계열
						gradient = {
							"0.4" : "#F6B24C",
							"0.6" : "#FD891E",
							"0.7" : "#F95007",
							"0.8" : "#F91C08",
							"1.0" : "#FF0000"
						};
						break;
					case 3: //녹색계열
						gradient = {
							"0.4" : "#5ACB5E",
							"0.6" : "#05D10C",
							"0.7" : "#059F0A",
							"0.8" : "#057908",
							"1.0" : "#0E4000"
						};
						break;
					case 4: //검은색계열
						gradient = {
							"0.4" : "#C8C6C6",
							"0.6" : "#908F8F",
							"0.7" : "#5C5A5A",
							"0.8" : "#2A2A2A",
							"1.0" :"#000"
						}; 
						break;
					case 5: //노란색계열
						gradient = {
							"0.4" : "#F5F57D",
							"0.6" : "#F2F268",
							"0.7" : "#D2F13B",
							"0.8" : "#CFF50C",
							"1.0" : "#ffff00"
						};
						break;
					case 6: //열지도기본색계열
						gradient = {
							"0.4": 'blue',
						    "0.6": 'cyan',
						    "0.7": 'lime',
						    "0.8": 'yellow',
						    "1.0": 'red'
						 };
						break;
				}
				var heatLayer = sop.heatLayer();
				heatLayer.addTo(map.gMap);
				heatLayer.setOptions({
					radius: 20,
					blur: 20,
					max: 1,
					gradient : gradient,
					renderer : this.renderer
				});
				for (var i=0; i<dataList.length; i++) {
					if (heatLayer) {
						heatLayer.addUTMK([
							 parseFloat(dataList[i].coor_x),
							 parseFloat(dataList[i].coor_y),
							 1
						]);
					}
				}
				poiInfo.heatGroup = heatLayer;
			},
			
			/**
			 * 
			 * @name         : doChangeHeatMap
			 * @description  : 열지도로 변환한다.
			 * @date         : 2017. 11. 13. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param map	 : 맵정보
			 */
			doChangeHeatMap : function() {
				var map = this.mapList[0];
				var multiData = map.multiLayerControl.multiData;
				this.analysisOriginMultiData = deepCopy(map.multiLayerControl.multiData);
				for (var i=0; i<multiData.length; i++) {
					var api_id = multiData[i].data.id;
					var options = multiData[i].data.option;
					var params = multiData[i].data.option.params;
					var isRefresh = false;
					var admList = [];
					for (var p in params) {
						switch(p) {
							case "low_search":
								if (params[p] == "1") {
									params[p] = "2";
									isRefresh = true;
								}
								break
							case "adm_cd":
								admList.push(params[p]);
								break;
						}
					}
					if (isRefresh) {
						var tmpOptions = {
								admList : admList,
								param : options
						};
						map.multiLayerControl.multiData = [];
						for (var i=0; i<tmpOptions.admList.length; i++) {
							tmpOptions.param.params["adm_cd"] = tmpOptions.admList[i];
							$policyWriteMapApi.ui.doCensusStatsData(api_id, tmpOptions, map, function(map) {
								$policyWriteMap.ui.setLegendMode("heat", map);
								map.multiLayerControl.multiData["type"] = "heat";
							});
						}
					}
				}
				
				if (!isRefresh) {
					$policyWriteMap.ui.setLegendMode("heat", map);
					map.multiLayerControl.multiData["type"] = "heat";
				}
			},
			
			/**
			 * 
			 * @name         : doChangeColorMap
			 * @description  : 색상지도로 변환한다.
			 * @date         : 2017. 11. 13. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param map	 : 맵정보
			 */
			doChangeColorMap : function() {
				var map = this.mapList[0];
				var multiData = this.analysisOriginMultiData;
				if (multiData != null) {
					for (var i=0; i<multiData.length; i++) {
						var api_id = multiData[i].data.id;
						var options = multiData[i].data.option;
						var params = multiData[i].data.option.params;
						var isRefresh = true;
						var admList = [];
						for (var p in params) {
							switch(p) {
								case "low_search":
									if (params[p] == "2") {
										isRefresh = false;
									}
									break
								case "adm_cd":
									admList.push(params[p]);
									break;
							}
						}
						if (isRefresh) {
							var tmpOptions = {
									admList : admList,
									param : options
							};
							map.multiLayerControl.multiData = [];
							for (var i=0; i<tmpOptions.admList.length; i++) {
								tmpOptions.param.params["adm_cd"] = tmpOptions.admList[i];
								$policyWriteMapApi.ui.doCensusStatsData(api_id, tmpOptions, map, function(map) {
									$policyWriteMap.ui.setLegendMode("color", map);
									map.multiLayerControl.multiData["type"] = "color";
								});
							}
						}
					}
					
					if (!isRefresh) {
						$policyWriteMap.ui.setLegendMode("color", map);
						map.multiLayerControl.multiData["type"] = "color";
					}
				}
			},
			
			/**
			 * 
			 * @name         : setLegendMode
			 * @description  : 범례모드를 설정한다.
			 * @date         : 2017. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mode   : 범례타입
			 * @param map 	 : map정보
			 */
			setLegendMode : function(mode, map) {
				$("#lgTypeList_"+map.legend.id+">li>a").each(function() {
					var type = $(this).attr("data-type");
					if (type == mode) {
						$(this).click();
					}
				});
				
				if (mode == "heat") {
					$("#btn_legendSetting_"+map.legend.id).hide();
				}else {
					$("#btn_legendSetting_"+map.legend.id).show();
				}
			},
	
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$policyWriteMap.callbackFunc = {

			// 맵 줌 종료 시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				if (map.id == 1 && $policyWriteMap.ui.poiLayerList.length > 0) {
					var mapBounds = map.gMap.getBounds();
					var poiList = $policyWriteMap.ui.poiLayerList;
					if (map.gMap._zoom >= 9) {
						//중심좌표가 화면영역에 벗어났을 경우, poi를 그린다.
						/*if ($policyStaticMap.ui.mapBounds != null &&
							$policyStaticMap.ui.mapBounds.contains(map.gMap.getCenter())) {
							return;
						}*/
						$policyWriteMap.ui.mapBounds = mapBounds;
						for (var i=0; i<poiList.length; i++) {
							poiList[i].clusterGroup.clearLayers();
							poiList[i].markerGroup.clearLayers();
							if (poiList[i].markerType != "heatMap") {
								if (poiList[i].data.length > $policyWriteMap.ui.defaultPoiCnt) {
									poiList[i].markerType = "cluster";
								}else {
									poiList[i].markerType = "normal";
								}
								$policyWriteMap.ui.drawPoiMarker(poiList[i], map, 1, $policyWriteMap.ui.mapBounds);
								
								//반경정보 삭제
								var circleGroup = poiList[i].circleGroup;
								if (circleGroup != null) {
									for (var k=0; k<circleGroup.length; k++) {
										circleGroup[k].remove();
									}
								}
									
								//반경정보가 있을 경우, 반경정보 표출
								var setInfo = poiList[i].settingInfo;
								if (setInfo.radius != 0) {
									$policyWriteMap.ui.drawPoiCircle(poiList[i], map);
								}
							}
						}
					}else {
						for (var i=0; i<poiList.length; i++) {
							if (poiList[i] != undefined && poiList[i].markerType != undefined) {
								switch(poiList[i].markerType) {
									case "cluster":
										var cnt = poiList[i].markerGroup.getLayers().length;
										if (cnt > 0) {
											poiList[i].markerGroup.clearLayers();
											$policyWriteMap.ui.drawPoiMarker(poiList[i], map, 2);
											
											//반경정보 삭제
											var circleGroup = poiList[i].circleGroup;
											if (circleGroup != null) {
												for (var k=0; k<circleGroup.length; k++) {
													circleGroup[k].remove();
												}
											}
										}
										break;
									case "normal":
										//마커를 다 그리면 더 이상 그리지 않는다.
										var cnt = poiList[i].markerGroup.getLayers().length;
										if (cnt == poiList[i].data.length) {
											return;
										}
										$policyWriteMap.ui.drawPoiMarker(poiList[i], map, 1);
										
										//반경정보 삭제
										var circleGroup = poiList[i].circleGroup;
										if (circleGroup != null) {
											for (var k=0; k<circleGroup.length; k++) {
												circleGroup[k].remove();
											}
										}
											
										//반경정보가 있을 경우, 반경정보 표출
										var setInfo = poiList[i].settingInfo;
										if (setInfo.radius != 0) {
											$policyWriteMap.ui.drawPoiCircle(poiList[i], map);
										}
										break;
									default:
										break;
								}
							}
							
						}
					}
				}
				
			},
			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOverPolygon : function(event, data, type, map) {	
				if (type != "polygon") {
					if (type == "data") {
						if (data.info!=undefined&&data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$policyWriteMap.ui.createInfoTooltip(event, data, type, map);
				}
			},

			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					for (var i=0; i<map.selectedBoundList.length; i++) {
						var layer = map.selectedBoundList[i];
						if (event.target == layer) {
							layer.setStyle({
								weight : 3,
								color : "white",
								dashArray : layer.options.dashArray,
								fillOpacity : 0.7,
								fillColor : "#F06292"
							});
						}
					}
				}
			}

	};
	
	$policyWriteMap.event = {
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				//poi설정창 스크롤
				$("#poiContentScroll").mCustomScrollbar({axis:"y"});
				$("#poiContentScroll").find(".mCSB_container").css("margin-right", "0px");
				
				//반경설정 슬라이더
				$("#slider-radius").slider({
		   	        min: 0,
		   	        max: 1000,
		   	        step : 100,
		   	        value : 0,
		   	        slide : function(e, ui) {
		   	        	$("#radiusSelectBox").val(ui.value);
		   	        }
		   		});
				
				//반경투명도 슬라이더
				$("#slider-opacity").slider({
					 min: 10,
			   	     max: 70,
			   	     step : 10,
			   	     value : 20,
			   	     slide : function(e, ui) {
			   	    	 $("#radiusOpacitySelectBox").val(ui.value);
			   	     }
				});
				
				//열지도반경 슬라이더
				$("#heat-radius").slider({
					 min: 5,
			   	     max: 40,
			   	     step : 1,
			   	     value : 20,
			   	     slide : function(e, ui) {
			   	    	 $("#heatRadiusInputBox").val(ui.value);
			   	     }
				});
				
				//열지도 투명도 슬라이다
				$("#heat-opacity").slider({
					 min: 20,
			   	     max: 120,
			   	     step : 1,
			   	     value : 20,
			   	     slide : function(e, ui) {
			   	    	 $("#heatOpacityInputBox").val(ui.value);
			   	     }
				});
	
				//좌측 데이터불러오기
				$("body").on("click","#leftMenu", function() {
					$(this).addClass("on");
					var on = $("#rightMenu").hasClass("on");
					if (on) {
						$("#rightMenu").removeClass("on");
					}
					
					$policyWriteMapRightMenu.event.stepCloseAnimate(1, "pass", 0);
					$policyWriteMapLeftMenu.event.stepCloseAnimate(1, "pass", 0);
					$policyWriteMapLeftMenu.event.stepOpenAnimate();
		        	$policyWriteMap.ui.curMapId = 0;
				});
				
				//우측 데이터불러오기
				$("body").on("click","#rightMenu", function() {
					$(this).addClass("on");
					var on = $("#leftMenu").hasClass("on");
					if (on) {
						$("#leftMenu").removeClass("on");
					}
					$policyWriteMapLeftMenu.event.stepCloseAnimate(1, "pass", 0);
					$policyWriteMapRightMenu.event.stepCloseAnimate(1, "pass", 0);
					switch(parseInt($policyWriteMap.ui.settingInfo.idxType)) {
						case 1:
						case 2:
							$policyWriteMapLeftMenu.event.stepOpenAnimate();
							break;
						case 3:
							$policyWriteMapRightMenu.event.stepOpenAnimate();
							break;
					}
					
					$policyWriteMap.ui.curMapId = 1;
				});
				
				//년도선택-수요변화지표
				$("body").on("change", ".yearSelectBox", function() {
					var id = $(this).attr("id");
					idx = id.split("_")[1];
					var map = $policyWriteMap.ui.mapList[parseInt(idx)-1];
					var year = $(this).val();
					var options = $policyWriteMapLeftMenu.ui.arParamList;
					for (var i=0; i<options.length; i++) {
						for (var k=0; k<options[i].params.length; k++) {
							if (options[i].params[k].key == "year") {
								options[i].params[k].value = year;
								break;
							}
						}
						
						switch(options[i].type) {
							case "census":
								$policyWriteMap.ui.doDemandIndexData(options[i].apiId, options[i], map);
								break;
							//사용자데이터의 경우, 년도에 상관없이 한번에 데이터를 다 가져오므로
							//한번 받아놓은 상태에서 데이터 가공후, draw
							case "userData": 
								var result = $policyWriteMapApi.ui.userData[map.id][year];
								var res = {
										errCd : "0",
										id : "API_MYDATA",
										result : result,
										dataType : "userData"
								};
								var setData = $policyWriteMap.ui.setParams(options[i].type, options[i], map);
								setData.param["year"] = year;
								map.multiLayerControl.multiData = [];
								$policyWriteMapApi.ui.doUserBoundData(res, setData, map);
								break;
							default:
								break;
						}
					}
				});
				
				//정책통계지도 작성취소
				$("body").on("click", "#policyWriteCancel", function() {
					location.href = "/view/map/policyStaticMap";
				});
				
				//poi설정버튼
				$("body").on("click", "#poiSettingBtn", function() {
					if($policyWriteMap.ui.checkSettingPopup()) {
						$policyWriteMap.ui.checkPoiSetting(0);
						$("#policyPoiBox").show();
					}
				});
				
				//일괄/개별설정
				$("body").on("click", ".settingMode_radio label", function() {
					$(".settingMode_radio label").removeClass("on");
					$(this).addClass("on");
					var id = $(this).attr("id");
					switch(id) {
						case "batch": //일괄설정
							$("#setting_poiList").hide();
							break;
						case "indivisual": //개별설정
							$("#setting_poiList").show();
							break;
					}
					$policyWriteMap.ui.checkPoiSetting(0);
				});
				
				//반경정보 콤보박스
				$("body").on("change", "#radiusSelectBox", function() {
					var value = $(this).val();
					$("#slider-radius").slider("value", value);
				});
				
				//반경투명도 콤보박스
				$("body").on("change", "#radiusOpacitySelectBox", function() {
					var value = $(this).val();
					$("#slider-opacity").slider("value", value);
				});
				
				//POI설정
				$("body").on("click", ".poiSetting_radio label", function() {
					var id = $(this).parent().parent().attr("id");
					$("#"+id+" label").removeClass("on");
					$(this).addClass("on");
				
					switch (id) {
						case "poiList_radio": //POI항목설정
							var idx = $(this).attr("id");
							idx = idx.split("poi_")[1];
							$policyWriteMap.ui.checkPoiSetting(parseInt(idx));
							break;
						case "poiShape_radio": //POI모양설정
							var shapeCd = $(this).attr("id");
							shapeCd = shapeCd.split("shape_")[1];
							if (shapeCd == "5") { //열지도
								$("#poiColor_radio li").css("width", "16%");
								$("#heatColor").show();
								$("#poiRadiusArea").hide();
								$("#poiRadiusArea").next().hide();
								$("#poiRadiusColorArea").hide();
								$("#poiRadiusColorArea").next().hide();
								$("#heatRadiusArea").show();
								$("#heatRadiusArea").next().show();
								$("#heatOpacityArea").show();
								$("#heatOpacityArea").next().show();
							}else {
								$("#poiColor_radio li").css("width", "20%");
								$("#heatColor").hide();
								$("#poiRadiusArea").show();
								$("#poiRadiusArea").next().show();
								$("#poiRadiusColorArea").show();
								$("#poiRadiusColorArea").next().show();
								$("#poiRadiusArea").addClass("on");
								$("#poiRadiusColorArea").addClass("on");
								$("#heatRadiusArea").hide();
								$("#heatRadiusArea").next().hide();
								$("#heatOpacityArea").hide();
								$("#heatOpacityArea").next().hide();
								
								//열지도로 선택 후, 모양을 열지도가 아닌것을 선택했을 때
								//POI색상 선택이 되지 않는 문제
								$("#poiColor_radio label").each(function() {
									var on = $(this).hasClass("on");
									if (on) {
										if ($(this).attr("id") == "color_6") {
											$("#color_1").click();
										}
									}
								})
							}
							break;
						default:
							break;
					}
				});
				
				//색상<->열지도 변환버튼
				$("body").on("click", "#heatMapChangeBtn", function() {
					if ($policyWriteMap.ui.checkHeatMapChangePopup()) {
						if ($(this).hasClass("color")) {
							$(this).removeClass("color");
							$(this).addClass("heat");
							$(".btn_heatMapSetting > span").html("색상지도<br>변환");
							$policyWriteMap.ui.doChangeHeatMap();
						}else {
							$(this).removeClass("heat");
							$(this).addClass("color");
							$(".btn_heatMapSetting > span").html("열지도<br>변환");
							$policyWriteMap.ui.doChangeColorMap();
						}
					}
				});
				
			},
			
			/**
			 * 
			 * @name         : popupClose
			 * @description  : 팝업을 닫는다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id     : 엘리먼트 아이디
			 */
			popupClose : function(id) {
				$("#"+id).hide();
				switch(id) {
					case "calculatePopup":
						$("#hData_1").html("데이터 A");
						$("#hData_2").html("데이터 B");
						$("#tData_1").empty();
						$("#tData_2").empty();
						$("#calculSymbolSelectBox").val("1");
						break;
				}
			}
	};
	
}(window, document));