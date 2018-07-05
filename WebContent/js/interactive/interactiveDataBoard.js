/**
 * 대화형 통계지도 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/10/28  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$interactiveDataBoard = W.$interactiveDataBoard || {};
	
	$(document).ready(function() {
		$interactiveDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$interactiveDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅
	});
	
	$interactiveDataBoard.ui = {
			mapData : [],				//지도별 데이터
			map : null,				//지도 (sMap.map)
			map_id : "0",				//지도 ID (0, 1, 2)
			lastChatIndex : null,
			fixedLegendYear : null,
			isFixedLegend : false,	//시계열 유무
			fixedLegend : null,
			dataSumValue : 0,
			
			/**
			 * 
			 * @name         : mapDataSetting
			 * @description  : 지도별 데이터 형식 세팅
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			mapDataSetting : function() {
				var tempObj = {};
				for(var i = 0; i < 3; i ++) {
					tempObj = {
							"res" : {},
							"options" : {},
							"dataBoard" : {
								yearArray : [],				//선택 가능 시계열 년도
								selectedYearArray : [],		//선택한 시계열 년도
								timeSeriesPushData : [],					//시계열 애니메이션의 정보를 담는 변수
								selectSeriesYear : "",						//선택한 시계열 년도 1개
								isTimeSeriesPlay : false,					//시계열 애니메이션에서 사용될 정보를 모두 가져왔는지 확인
								timeSeriesCnt : 0,							//시계열 도는 횟수
								timer : 0										//타이머
							}
					}
					this.mapData.push(tempObj);	
				}
			},
			
			/**
			 * 
			 * @name         : reDraw
			 * @description  : 데이터보드 다시 그리기 (지도 삭제, 초기화일 경우)
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reDraw : function(map_id, type) {
				if (type == "census") {
					//기존 조회된 데이터가 있을경우
					if(!$.isEmptyObject(this.mapData[map_id].options)) {
						if( Object.prototype.toString.call(this.mapData[map_id].res) === '[object Array]' ) {
							this.updateDataBoardMulti(this.mapData[map_id].res, this.mapData[map_id].options);
						}else {
							//시계열 초기화
							this.resetTimeSeries();
							this.updateDataBoard(this.mapData[map_id].res, this.mapData[map_id].options);
						}	
					}
				}else if (type == "kosis") {
					this.updateDataBoardKosis(this.mapData[map_id].res, this.mapData[map_id].options.title, map_id);
				}
				
				
			},
			
			/**
			 * 
			 * @name         : updateDataBoard
			 * @description  : 데이터보드 업데이트
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @param	: res, options
			 * @history 	 :
			 */
			updateDataBoard : function(res, options) {
				this.lastChatIndex = null;
				
				if($("#viewUpRegionData_dt_area").is(":hidden")) {
					$("#viewUpRegionData_dt_area").show();
					$("#viewTimeSeriesData_dt_area").show();
//					$("#viewUpRegionData_dt_area a").removeClass("on");
//					$("#viewTimeSeriesData_dt_area a").removeClass("on");
				}
				
				//데이터보드 보이기
				$(".dataBoardDiv").hide();
				$("#viewDataBoard").show();
				
				//사업체일 경우 area_type을 강제로 넣는다.
				if (options.params.api_id == "API_0304") {
					options.params.param.push({"key" : "area_type", "value" : "0"});
				}
				
				this.map = options.params.map;
				this.map_id = options.params.map.id;
				this.mapData[this.map_id].res = res;
				this.mapData[this.map_id].options = options;
				
				//2017.03.28 2레벨에서 그래프 라벨 안나오는 이슈
				this.reqAdmList(res, options);	//행정동 리스트가져오기
				this.updateTargetAreaChart(res, options); //해당지역 데이터 보기 막대차트
				this.updateTargetAreaTable(res, options); //해당지역 데이터 보기 표테이블
				this.updateInfo(res, options);		//해당지역 조회 정보
				this.updateTimeSeries(options);	//시계열별 데이터 조회
				
				//인구총괄의 경우, 파이차트가 의미가 없어 hide함.
				if ((res.id == "API_0301" || res.id == "4011" || res.pAdmCd == "00") || this.map.boundLevel != "1") { //9월 서비스
					$("#fullPieChart").hide();
					$(".fullPieLegend").hide();
					$("#viewUpRegionData_dt_area").hide();
					$("#viewUpRegionData_dd_area").hide();
//					$("#dataBoardStats").hide();
					$(".dataBoardStats").hide();
//					$("#fullDataBoardTitle").find("#dataBoardStats").show();	//2016.03.18 수정
					$("#fullDataBoardTitle").find(".dataBoardStats").show();	//2016.03.18 수정
				}else {
					this.updatePieChart(options);		//상위 지역 비교 데이터 보기
					$("#fullPieChart").show();
					$(".fullPieLegend").show();
					$("#viewUpRegionData_dt_area").show();
					//$("#viewUpRegionData_dd_area").show(); //2017.04.05 시계열 플레이시 상위지역차트 영역 강제 show되는 이슈
//					$("#dataBoardStats").hide();
					$(".dataBoardStats").hide();
//					$("#fullDataBoardTitle").find("#dataBoardStats").hide();
					$("#fullDataBoardTitle").find(".dataBoardStats").hide();
				}
			},
			
			/**
			 * 
			 * @name         : updateDataBoardKosis
			 * @description  : Kosis 용 데이터보드 업데이트
			 * @date         : 2015. 11. 03. 
			 * @author	     : 석진혁
			 * @param	: res, options
			 * @history 	 :
			 */
			updateDataBoardKosis : function(res, title, id) {
				this.lastChatIndex = null;
				
				$("#viewUpRegionData_dt_area").hide();
				$("#viewUpRegionData_dd_area").hide();
				$("#viewTimeSeriesData_dt_area").hide();
				$("#viewTimeSeriesData_dd_area").hide();
				
				$(".dataBoardDiv").hide();
				$("#viewDataBoard").show();
				
				this.mapData[id].res = res;
				this.mapData[id].options.title = title;

				
				this.updateTargetAreaChartKosis(res, title); //해당지역 데이터 보기 막대차트
				this.updateTargetAreaTableKosis(res); //해당지역 데이터 보기 표테이블
			},
			
			
			updateDataBoardMulti : function(res, options) {
				this.map = options.params.map;
				this.map_id = options.params.map.id;
				this.mapData[this.map_id].res = res;
				this.mapData[this.map_id].options = options;

				$("#viewUpRegionData_dt_area").hide();
				$("#viewUpRegionData_dd_area").hide();
				$("#viewTimeSeriesData_dt_area").hide();
				$("#viewTimeSeriesData_dd_area").hide();
				$(".dataBoardDiv").hide();
				$("#viewDataBoard").show();
				
				//$("#dataBoardTitle").html("제목 : " + options.params.title);
				$(".dataBoardTitle").html("제목 : " + options.params.title);
				//$("#fullDataBoardTitle").find("#dataBoardTitle").html("제목 : " + options.params.title);
				$("#fullDataBoardTitle").find(".dataBoardTitle").html("제목 : " + options.params.title);
				
				this.updateTargetAreaChartMulti(res, options);
				this.updateTargetAreaTableMulti(res, options);
			},
			
			
			/**
			 * 
			 * @name         : updateInfo
			 * @description  :	해당지역 조회 정보
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @param	: res, options
			 * @history 	 :
			 */
			updateInfo : function(res, options) {
				var year = "";
				var title = "";
				for(var i = 0; i < options.params.param.length; i ++) {
					if(options.params.param[i].key == "year") {
						year = options.params.param[i].value + "년";
					}
				}
				
				if (year.length > 0) {
					title = options.params.title + " ("+year+")";
				}else {
					title = options.params.title;
				}
				//$("#dataBoardTitle").html("제목 : " + title);
				$(".dataBoardTitle").html("제목 : " + title);
//				$("#dataBoardArea").html("지역 : " + options.params.adm_nm);
				$(".dataBoardArea").html("지역 : " + options.params.adm_nm);
//				$("#dataBoardStats").html("통계 :");													//통계는 Pie차트를 통해서 입력
//				$("#fullDataBoardTitle").find("#dataBoardTitle").html("제목 : " + title);
				$("#fullDataBoardTitle").find(".dataBoardTitle").html("제목 : " + title);
//				$("#fullDataBoardTitle").find("#dataBoardArea").html("지역 : " + options.params.adm_nm);
				$("#fullDataBoardTitle").find(".dataBoardArea").html("지역 : " + options.params.adm_nm);
//				$("#fullDataBoardTitle").find("#dataBoardStats").html("통계 :");						//통계는 Pie차트를 통해서 입력
				$("#fullTableTimeSeries").show();
				
				var origin = null;
				if (res.id != null && res.id.length > 0 ){
					var apiId = res.id.replace("API_", "");
					switch(parseInt(apiId)) {
						case 301:	//인구지표통계
						case 302:	//인구조건검색통계
						case 305:	//가구통계
						case 306:	//주택통계
						case 4011:	//조건결합통계
							origin = "통계청, 인구주택총조사 ("+year+")";
							
							
							if(res.showData == "nongga_cnt"
								||res.showData == "nongga_ppltn"
								||res.showData == "imga_cnt"
								||res.showData == "imga_ppltn"
								||res.showData == "naesuoga_cnt"
								||res.showData == "naesuoga_ppltn"
								||res.showData == "haesuoga_cnt"
								||res.showData == "haesuoga_ppltn"
									
							){
								origin = "통계청, 농림어업총조사("+year+")";
							}else if(res.showData == "corp_cnt"){
								
								origin = "통계청, 전국사업체조사("+year+")";
							}
							
							break;
						case 304:	//사업체통계
							origin = "통계청, 전국사업체조사 ("+year+")";
							break;
						case 307:	//농가통계
						case 308:	//임가통계
						case 309:	//어가통계
						case 310:	//가구원통계
							origin = "통계청, 농림어업총조사 ("+year+")";
							break;
					}
				}
				
				if (origin != undefined && origin.length != null) {
//					$("#dataBoardOrigin").show();
					$(".dataBoardOrigin").show();
//					$("#dataBoardOrigin").html("출처 : " + origin);
					$(".dataBoardOrigin").html("출처 : " + origin);
//					$("#fullDataBoardTitle").find("#dataBoardOrigin").show();
					$("#fullDataBoardTitle").find(".dataBoardOrigin").show();
//					$("#fullDataBoardTitle").find("#dataBoardOrigin").html("출처 : " + origin);
					$("#fullDataBoardTitle").find(".dataBoardOrigin").html("출처 : " + origin);
				}
				
			},
			
			/**
			 * 
			 * @name         : updateInfoKosis
			 * @description  :	해당지역 조회 정보 Kosis
			 * @date         : 2015. 11. 03. 
			 * @author	     : 석진혁
			 * @param	: res, options
			 * @history 	 :
			 */
			updateInfoKosis : function(title, value) {
//				$("#fullDataBoardTitle").find("#dataBoardTitle").html("제목 : " + title);
				$("#fullDataBoardTitle").find(".dataBoardTitle").html("제목 : " + title);
//				$("#dataBoardTitle").html("제목 : " + title);
				$(".dataBoardTitle").html("제목 : " + title);
//				$("#dataBoardOrigin").html("");
				$(".dataBoardOrigin").html("");
//				$("#dataBoardArea").html("");
				$(".dataBoardArea").html("");
				$("#dataBoardStatsSum").html("");
				$("#fullPieChart").hide();
				$(".fullPieLegend").hide();
				$("#fullTableTimeSeries").hide();
//				$("#fullDataBoardTitle").find("#dataBoardOrigin").show();
				$("#fullDataBoardTitle").find(".dataBoardOrigin").show();
//				$("#fullDataBoardTitle").find("#dataBoardArea").hide();
				$("#fullDataBoardTitle").find(".dataBoardArea").hide();
//				$("#fullDataBoardTitle").find("#dataBoardOrigin").html("출처 : KOSIS(<a href='javascript:interactiveMapKosis.kosisLinked();'>통계표보기</a>)");
				$("#fullDataBoardTitle").find(".dataBoardOrigin").html("출처 : KOSIS(<a href='javascript:interactiveMapKosis.kosisLinked();'>통계표보기</a>)");
//				$("#dataBoardStats").html("출처 : KOSIS(<a href='javascript:interactiveMapKosis.kosisLinked();'>통계표보기</a>)");
				$(".dataBoardStats").html("출처 : KOSIS(<a href='javascript:interactiveMapKosis.kosisLinked();'>통계표보기</a>)");
			},
			
			/**
			 * 
			 * @name         : updateTargetAreaChart
			 * @description  : 해당 지역 데이터 보기 차트
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @param	: res, options
			 * @history 	 :
			 */
			updateTargetAreaChart : function(res, options) {
				var xAxisCat = [];	//X축 카테고리
				var retDataList = [];	//수치 데이터
				var titleText;		//차트 타이틀
				var labelsVisible = true;	//카테고리 표출 여부
				
				if(res.result != undefined) {
					for(var i = 0; i < res.result.length; i ++) {
						var elem = res.result[i];
						
						//2017.03.28 2레벨에서 그래프 라벨 안보이는 문제
						//============================START================================//
						/*//읍면동 단위
						if((this.map.curPolygonCode == 4 || this.map.curPolygonCode == 5) && elem.adm_cd.length > 7) {
							//9월 서비스
							//xAxisCat.push(elem.adm_cd);
							var tmpAdmNm = "";
							if (options.params.adm_nm != null && options.params.adm_nm != undefined) {
								var arAdmNmList = options.params.adm_nm.split(" ");
								tmpAdmNm = arAdmNmList[arAdmNmList.length-1];
							}
							var label = tmpAdmNm+"_"+(i+1);
							xAxisCat.push(label);
							labelsVisible = true;
						} else {
							xAxisCat.push(elem.adm_nm);
						}*/
						xAxisCat.push(elem.adm_nm);
						//============================END================================//
						
						if(res.id == "API_0301") {	//인구통계총괄
							if (res.showData == "tot_ppltn") {
								titleText = "총인구";
								retDataList.push(parseFloat(elem.tot_ppltn));
							} else if (res.showData == "tot_ppltn_male") {
								titleText = "총인구-남자";
								retDataList.push(parseFloat(elem.tot_ppltn_male));
							} else if (res.showData == "tot_ppltn_fem") {
								titleText = "총인구-여자";
								retDataList.push(parseFloat(elem.tot_ppltn_fem));
							} else if (res.showData == "avg_age") {
								titleText = "평균나이";
								retDataList.push(parseFloat(elem.avg_age));
							} else if (res.showData == "avg_age_male") {
								titleText = "평균나이-남자";
								retDataList.push(parseFloat(elem.avg_age_male));
							} else if (res.showData == "avg_age_fem") {
								titleText = "평균나이-여자";
								retDataList.push(parseFloat(elem.avg_age_fem));
							} else if (res.showData == "ppltn_dnsty") {
								titleText = "인구밀도";
								retDataList.push(parseFloat(elem.ppltn_dnsty));
							} else if (res.showData == "aged_child_idx") {
								titleText = "노령화지수";
								retDataList.push(parseFloat(elem.aged_child_idx));
							} else if (res.showData == "oldage_suprt_per") {
								titleText = "노년부양비";
								retDataList.push(parseFloat(elem.oldage_suprt_per));
							} else if (res.showData == "juv_suprt_per") {
								titleText = "유년부양비";
								retDataList.push(parseFloat(elem.juv_suprt_per));
							} else if (res.showData == "tot_suprt_per") {
								titleText = "총부양비";
								retDataList.push(parseFloat(elem.tot_suprt_per));
							} else if (res.showData == "corp_cnt") {
								titleText = "총사업체수";
								retDataList.push(parseFloat(elem.corp_cnt));
							} else if (res.showData == "household_cnt") {
								titleText = "가구수";
								retDataList.push(parseFloat(elem.household_cnt));
							} else if (res.showData == "house_cnt") {
								titleText = "주택수";
								retDataList.push(parseFloat(elem.house_cnt));
							} else if (res.showData == "farm_cnt") {
								titleText = "농가수";
								retDataList.push(parseFloat(elem.farm_cnt));
							} else if (res.showData == "forestry_cnt") {
								titleText = "임가수";
								retDataList.push(parseFloat(elem.forestry_cnt));
							} else if (res.showData == "fishery_cnt") {
								titleText = "어가수";
								retDataList.push(parseFloat(elem.fishery_cnt));
							} else if (res.showData == "tot_family") {
								titleText = "총가구";
								retDataList.push(parseFloat(elem.tot_family));
							} else if (res.showData == "avg_fmember_cnt") {
								titleText = "평균가구원수";
								retDataList.push(parseFloat(elem.avg_fmember_cnt));
							} else if (res.showData == "tot_house") {
								titleText = "총주택";
								retDataList.push(parseFloat(elem.tot_house));
							} else if (res.showData == "nongga_cnt") {
								titleText = "농가(가구)";
								retDataList.push(parseFloat(elem.nongga_cnt));
							} else if (res.showData == "imga_cnt") {
								titleText = "임가(가구)";
								retDataList.push(parseFloat(elem.imga_cnt));
							} else if (res.showData == "imga_ppltn") {
								titleText = "임가인구";
								retDataList.push(parseFloat(elem.imga_ppltn));
							} else if (res.showData == "naesuoga_cnt") {
								titleText = "내수면총어가";
								retDataList.push(parseFloat(elem.naesuoga_cnt));
							} else if (res.showData == "naesuoga_ppltn") {
								titleText = "해수면어가인구";
								retDataList.push(parseFloat(elem.naesuoga_ppltn));
							} else if (res.showData == "haesuoga_cnt") {
								titleText = "해수면총어가";
								retDataList.push(parseFloat(elem.haesuoga_cnt));
							} else if (res.showData == "haesuoga_ppltn") {
								titleText = "해수면어가인구";
								retDataList.push(parseFloat(elem.haesuoga_ppltn));
							} else if (res.showData == "employee_cnt") {
								titleText = "종사자수";
								retDataList.push(parseFloat(elem.employee_cnt));
							}else if (res.showData == "nongga_ppltn") {
								titleText = "농가인구";
								retDataList.push(parseFloat(elem.nongga_ppltn));
							}
							
						} else if(res.id == "API_0302") {	//인구통계세부조건검색
							titleText = "인구";
							retDataList.push(parseFloat(elem.population));
							
						} else if(res.id == "API_0304") {	//사업체분류검색
							//alert(parseFloat(elem.corp_cnt));
							if (res.showData == "tot_worker") {
								titleText = "종사자수";
								retDataList.push(parseFloat(elem.tot_worker));
							} else if (res.showData == "corp_cnt") {
								titleText = "사업체수";
								retDataList.push(parseFloat(elem.corp_cnt));
							} else if (res.showData == "employee_cnt") {
								titleText = "종사자수";
								retDataList.push(parseFloat(elem.employee_cnt));
							}
							
						} else if(res.id == "API_0305") {	//가구통계검색
							titleText = "가구수";
							retDataList.push(parseFloat(elem.household_cnt));
							
						} else if(res.id == "API_0306") {	//주택통계검색
							titleText = "주택수";
							retDataList.push(parseFloat(elem.house_cnt));
							
						} else if(res.id == "API_0307") {	//농가통계검색
							titleText = "농가수"; //2016.09.05 9월 서비스
							retDataList.push(parseFloat(elem.farm_cnt));
						} else if(res.id == "API_0308") {	//임가통계검색
							titleText = "임가수"; //2016.09.05 9월 서비스
							retDataList.push(parseFloat(elem.forestry_cnt));
						} else if(res.id == "API_0309") {	//어가통계검색
							titleText = "어가수"; //2016.09.05 9월 서비스
							retDataList.push(parseFloat(elem.fishery_cnt));	
						} else if(res.id == "API_0310") {	//가구원통계검색
							titleText = "가구원 수";
							retDataList.push(parseFloat(elem.population));
						}
						//조건결합시
						else {
							titleText = "";
							retDataList.push(parseFloat(elem.data_cnt));
						}
					}
				}
				
				var length = res.result.length;
				height = length * 20;
				width = length * 25; //2017.02.23
				if (height < 303) {
					height = 303;
				}
				
				//2017.02.23
				if (width < 480) {
					width = 480;
				}
				
				//$("#viewCurrentRegionData_dd_area").css("height", height+"px");
				//$("#viewCurrentRegionData_dd_area").find(".compareBox").css("height", height+"px");
				$("#targetCharts").css("height", height+"px");
				$("#fullTargetChart").css("width", width+"px");
				
				
				if(titleText == null || titleText.trim() == ""){
					titleText = "값";
				}

				//해당지역 데이터 보기 차트 (일반)
				$('#targetCharts').highcharts(
				{
					chart : { 
						type : 'bar',height: height, width:500
					},
					exporting: { enabled: false },
					title : {
						text : ''
					},
					subtitle : {
						text : ''
					},
					xAxis : {
						categories: xAxisCat,
						labels : { 
							rotation : 0,
							enabled: labelsVisible
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					},
					plotOptions : {
						series : {
							cursor : "pointer",
							point : {
								events : {
									click : function() {
										var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
										//집계구
										if (this.category.indexOf("_") != -1) {
											var idx = parseInt(this.category.split("_")[1]);
											map.dataGeojson.eachLayer(function(layer) {
												if (layer.feature) {
													var e = {
															target : layer,
															utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
													};
													map.setPolyLayerMouseout(e);
													layer.unbindToolTip();
													if (layer.feature.dataIdx == idx-1) {
														map.setPolyLayerMouseover(e);
														$interactiveMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
													}
												}
											});
										}
										// 집계구 외  (시도, 시군구, 읍면동)
										else {
											var title = this.category;
											map.dataGeojson.eachLayer(function(layer) {
												if (layer.feature) {
													var e = {
															target : layer,
															utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
													};
													map.setPolyLayerMouseout(e);
													layer.unbindToolTip();
													var adm_nm = layer.feature.properties.adm_nm;
													var titleList = adm_nm.split(" ");
													var tmpTitle = titleList[titleList.length-1];
													if (tmpTitle == title) {
														map.setPolyLayerMouseover(e);
														$interactiveMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
													}
												}
											});
										}
									}
								}
							}
						}
					},
					
					legend : {
						enabled : false
					},
					tooltip: {
						valueDecimals: 2,
						formatter: function () {
				        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
				        	} else {
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
				        	}
		                }
			        },
					series : [ {
						name : titleText,
						data : retDataList,
						color : '#2951f2'
					} ]
				});
				
				//해당지역 데이터 보기 차트 (Full)
				$('#fullTargetChart').highcharts({
			        chart : { 
						type : 'column',height: 220, width:width //2017.02.23
					},
					exporting: { enabled: false },
			        title : {
						text : ''
					},
					subtitle : {
						text : ''
					},
					xAxis : {
						categories: xAxisCat,
						labels : { 
							rotation : -45,
							enabled: false
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					},
					legend : {
						enabled : false
					},
			        tooltip: {
			        	valueDecimals: 2,
						formatter: function () {
				        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
				        	} else {
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
				        	}
		                }
			        },
			        series : [ {
						name : titleText,
						data : retDataList,
						color : '#2951f2'
					} ]
			    });
				
				//그래프 라벨선택 시, 해당 레이어 mouseover
				//9월 서비스
				$("#targetCharts").find('.highcharts-axis-labels text').click(function(){
					//집계구
					if ($(this).text().indexOf("_") != -1) {
						var idx = parseInt($(this).text().split("_")[1]);
						var map = options.params.map;
						map.dataGeojson.eachLayer(function(layer) {
							if (layer.feature) {
								var e = {
										target : layer,
										utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
								};
								map.setPolyLayerMouseout(e);
								layer.unbindToolTip();
								if (layer.feature.dataIdx == idx-1) {
									map.setPolyLayerMouseover(e);
									$interactiveMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
								}
							}
						});
					}
					// 집계구 외  (시도, 시군구, 읍면동)
					else {
						var title = $(this).text();
						var map = options.params.map;
						map.dataGeojson.eachLayer(function(layer) {
							if (layer.feature) {
								var e = {
										target : layer,
										utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
								};
								map.setPolyLayerMouseout(e);
								layer.unbindToolTip();
								var adm_nm = layer.feature.properties.adm_nm;
								var titleList = adm_nm.split(" ");
								var tmpTitle = titleList[titleList.length-1];
								if (tmpTitle == title) {
									map.setPolyLayerMouseover(e);
									$interactiveMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
								}
							}
						});
					}
				});

				
			},
			
			/**
			 * 
			 * @name         : updateTargetAreaChartKosis
			 * @description  : 해당 지역 데이터 보기 차트 Kosis
			 * @date         : 2015. 11. 03. 
			 * @author	     : 석진혁
			 * @param	: res, options
			 * @history 	 :
			 */
			updateTargetAreaChartKosis : function(res, title) {
				var xAxisCat = [];	//X축 카테고리
				var retDataList = [];	//수치 데이터
				var labelsVisible = true;	//카테고리 표출 여부
				var sumDataValue = 0;
				
				if(res.length > 0) {
					for(var i = 0; i < res.length; i ++) {
						var elem = res[i];
						
						xAxisCat.push(elem.NAME);
						retDataList.push(parseFloat(elem.DATA));
						
						sumDataValue = sumDataValue + parseFloat(elem.DATA);
						
						if(i == res.length - 1 && elem.UNIT != undefined) {
							sumDataValue = sumDataValue.toFixed(1) + "	(" + elem.UNIT + ")";
						}
					}
				}
				
				this.updateInfoKosis(title, sumDataValue);
				
				var length = res.length;
				height = length * 30;
				if (height < 303) {
					height = 303;
				}
				$("#targetCharts").css("height", height+"px");
				
				//해당지역 데이터 보기 차트 (일반)
				$('#targetCharts').highcharts(
				{
					chart : { 
						type : 'bar',height: height, width:500
					},
					exporting: { enabled: false },
					title : {
						text : ''
					},
					subtitle : {
						text : ''
					},
					xAxis : {
						categories: xAxisCat,
						labels : { 
							rotation : 0,
							enabled: true
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					},
					legend : {
						enabled : false
					},
					tooltip: {
						valueDecimals: 2,
						formatter: function () {
				        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
				        	} else {
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
				        	}
		                }
			        },
					series : [ {
						name : title,
						data : retDataList,
						color : '#2951f2'
					} ]
				});
				
				//해당지역 데이터 보기 차트 (Full)
				$('#fullTargetChart').highcharts({
			        chart : { 
						type : 'column',height: 250, width:400
					},
					exporting: { enabled: false },
			        title : {
						text : ''
					},
					subtitle : {
						text : ''
					},
					xAxis : {
						categories: xAxisCat,
						labels : { 
							rotation : -45,
							enabled: labelsVisible
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					},
					legend : {
						enabled : false
					},
			        tooltip: {
			        	valueDecimals: 2,
						formatter: function () {
				        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
				        	} else {
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
				        	}
		                }
			        },
			        series : [ {
						name : title,
						data : retDataList,
						color : '#2951f2'
					} ]
			    });
			},
			
			/**
			 * 
			 * @name         : updateTargetAreaChartMulti
			 * @description  : 해당 지역 데이터 보기 차트 multi data
			 * @date         : 2016. 02. 04. 
			 * @author	     : 권차욱
			 * @param	: res, options
			 * @history 	 :
			 */
			updateTargetAreaChartMulti : function(res, options) {
				var xAxisCat = [];	//X축 카테고리
				var retDataList = [];	//수치 데이터
				var titleText;		//차트 타이틀
				var labelsVisible = true;	//카테고리 표출 여부
				var length = 0;
				
				for (var i=0; i<res.length; i++) {
					var data = res[i].data;
					if (data.result != undefined && data.result.length > 0) {
						for (var k=0; k<data.result.length; k++) {
							var elem = data.result[k];
							length ++;
							
							//읍면동 단위
							if((this.map.curPolygonCode == 4 || this.map.curPolygonCode == 5) && elem.adm_cd.length > 7) {
								//xAxisCat.push(elem.adm_cd);
								//labelsVisible = true;
								var tmpAdmNm = "";
								if (options.params.adm_nm != null && options.params.adm_nm != undefined) {
									var arAdmNmList = options.params.adm_nm.split(",")[i];
									tmpAdmNmList = arAdmNmList.split(" ");
									tmpAdmNm = tmpAdmNmList[tmpAdmNmList.length-1];
								}
								var label = tmpAdmNm+"_"+(k+1);
								xAxisCat.push(label);
								labelsVisible = true;
							} else {
								xAxisCat.push(elem.adm_nm);
							}
							
							if(data.id == "API_0301") {	//인구통계총괄
								if (data.showData == "tot_ppltn") {
									titleText = "총인구";
									retDataList.push(parseFloat(elem.tot_ppltn));
								} else if (data.showData == "tot_ppltn_male") {
									titleText = "총인구-남자";
									retDataList.push(parseFloat(elem.tot_ppltn_male));
								} else if (data.showData == "tot_ppltn_fem") {
									titleText = "총인구-여자";
									retDataList.push(parseFloat(elem.tot_ppltn_fem));
								} else if (data.showData == "avg_age") {
									titleText = "평균나이";
									retDataList.push(parseFloat(elem.avg_age));
								} else if (data.showData == "avg_age_male") {
									titleText = "평균나이-남자";
									retDataList.push(parseFloat(elem.avg_age_male));
								} else if (data.showData == "avg_age_fem") {
									titleText = "평균나이-여자";
									retDataList.push(parseFloat(elem.avg_age_fem));
								} else if (data.showData == "ppltn_dnsty") {
									titleText = "인구밀도";
									retDataList.push(parseFloat(elem.ppltn_dnsty));
								} else if (data.showData == "aged_child_idx") {
									titleText = "노령화지수";
									retDataList.push(parseFloat(elem.aged_child_idx));
								} else if (data.showData == "oldage_suprt_per") {
									titleText = "노년부양비";
									retDataList.push(parseFloat(elem.oldage_suprt_per));
								} else if (data.showData == "juv_suprt_per") {
									titleText = "유년부양비";
									retDataList.push(parseFloat(elem.juv_suprt_per));
								} else if (data.showData == "tot_suprt_per") {
									titleText = "총부양비";
									retDataList.push(parseFloat(elem.tot_suprt_per));
								} else if (data.showData == "corp_cnt") {
									titleText = "총사업체수";
									retDataList.push(parseFloat(elem.corp_cnt));
								} else if (data.showData == "household_cnt") {
									titleText = "가구수";
									retDataList.push(parseFloat(elem.household_cnt));
								} else if (data.showData == "house_cnt") {
									titleText = "주택수";
									retDataList.push(parseFloat(elem.house_cnt));
								} else if (data.showData == "farm_cnt") {
									titleText = "농가수";
									retDataList.push(parseFloat(elem.farm_cnt));
								} else if (data.showData == "forestry_cnt") {
									titleText = "임가수";
									retDataList.push(parseFloat(elem.forestry_cnt));
								} else if (data.showData == "fishery_cnt") {
									titleText = "어가수";
									retDataList.push(parseFloat(elem.fishery_cnt));
								} else if (data.showData == "tot_family") {
									titleText = "총가구";
									retDataList.push(parseFloat(elem.tot_family));
								} else if (data.showData == "avg_fmember_cnt") {
									titleText = "평균가구원수";
									retDataList.push(parseFloat(elem.avg_fmember_cnt));
								} else if (data.showData == "tot_house") {
									titleText = "총주택";
									retDataList.push(parseFloat(elem.tot_house));
								} else if (data.showData == "nongga_cnt") {
									titleText = "농가(가구)";
									retDataList.push(parseFloat(elem.nongga_cnt));
								} else if (data.showData == "imga_cnt") {
									titleText = "임가(가구)";
									retDataList.push(parseFloat(elem.imga_cnt));
								} else if (data.showData == "imga_ppltn") {
									titleText = "임가인구";
									retDataList.push(parseFloat(elem.imga_ppltn));
								} else if (data.showData == "naesuoga_cnt") {
									titleText = "내수면총어가";
									retDataList.push(parseFloat(elem.naesuoga_cnt));
								} else if (data.showData == "naesuoga_ppltn") {
									titleText = "해수면어가인구";
									retDataList.push(parseFloat(elem.naesuoga_ppltn));
								} else if (data.showData == "haesuoga_cnt") {
									titleText = "해수면총어가";
									retDataList.push(parseFloat(elem.haesuoga_cnt));
								} else if (data.showData == "haesuoga_ppltn") {
									titleText = "해수면어가인구";
									retDataList.push(parseFloat(elem.haesuoga_ppltn));
								} else if (data.showData == "employee_cnt") {
									titleText = "종사자수";
									retDataList.push(parseFloat(elem.employee_cnt));
								} else if (data.showData == "nongga_ppltn") {
									titleText = "농가인구";
									retDataList.push(parseFloat(elem.nongga_ppltn));
								}
								
							} else if(data.id == "API_0302") {	//인구통계세부조건검색
								titleText = "인구";
								retDataList.push(parseFloat(elem.population));
								
							} else if(data.id == "API_0304") {	//사업체분류검색
								if (data.showData == "tot_worker") {
									titleText = "종사자수";
									retDataList.push(parseFloat(elem.tot_worker));
								} else if (data.showData == "corp_cnt") {
									titleText = "사업체수";
									retDataList.push(parseFloat(elem.corp_cnt));
								}
								
							} else if(data.id == "API_0305") {	//가구통계검색
								titleText = "가구수";
								retDataList.push(parseFloat(elem.household_cnt));
								
							} else if(data.id == "API_0306") {	//주택통계검색
								titleText = "주택수";
								retDataList.push(parseFloat(elem.house_cnt));
								
							} else if(data.id == "API_0307") {	//농가통계검색
								retDataList.push(parseFloat(elem.farm_cnt));
							} else if(data.id == "API_0308") {	//임가통계검색
								retDataList.push(parseFloat(elem.forestry_cnt));
							} else if(data.id == "API_0309") {	//어가통계검색
								retDataList.push(parseFloat(elem.fishery_cnt));	
							} else if(data.id == "API_0310") {	//가구원통계검색
								titleText = "가구원 수";
								retDataList.push(parseFloat(elem.population));
							}
							//조건결합시
							else {
								titleText = "";
								retDataList.push(parseFloat(elem.data_cnt));
							}
						}
						
					}
				}
				
				height = length * 20;
				if (height < 303) {
					height = 303;
				}
				
				//$("#viewCurrentRegionData_dd_area").css("height", "800px");
				//$("#viewCurrentRegionData_dd_area > .compareBox").css("height", "800px");
				$("#wrapperChartScroll").css("height", (height+50)+"px");
				$("#targetCharts").css("height", height+"px");

				//해당지역 데이터 보기 차트 (일반)
				$('#targetCharts').highcharts(
				{
					chart : { 
						type : 'bar',height: height, width:500
					},
					exporting: { enabled: false },
					title : {
						text : ''
					},
					subtitle : {
						text : ''
					},
					xAxis : {
						categories: xAxisCat,
						labels : { 
							rotation : 0,
							enabled: labelsVisible
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					},
					legend : {
						enabled : false
					},
					tooltip: {
						valueDecimals: 2,
						formatter: function () {
				        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
				        	} else {
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
				        	}
		                }
			        },
					series : [ {
						name : titleText,
						data : retDataList,
						color : '#2951f2'
					} ]
				});
				
				//해당지역 데이터 보기 차트 (Full)
				$('#fullTargetChart').highcharts({
			        chart : { 
						type : 'column',height: 250, width:500
					},
					exporting: { enabled: false },
			        title : {
						text : ''
					},
					subtitle : {
						text : ''
					},
					xAxis : {
						categories: xAxisCat,
						labels : { 
							rotation : -45,
							enabled: false
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					},
					legend : {
						enabled : false
					},
			        tooltip: {
			        	valueDecimals: 2,
						formatter: function () {
				        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
				        	} else {
				        		return 	'<span>' + this.point.category + '</span><br/>' +
				        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
				        	}
		                }
			        },
			        series : [ {
						name : titleText,
						data : retDataList,
						color : '#2951f2'
					} ]
			    });
			},
			
			/**
			 * 
			 * @name         : updateTargetAreaTable
			 * @description  : 해당 지역 데이터 보기 표 업데이트
			 * @date         : 2015. 10. 29. 
			 * @author	     : 김성현
			 * @param	: res, options
			 * @history 	 :
			 */
			updateTargetAreaTable : function(res, options) {
				var addrCdList = [];		//행정동코드 데이터
				var addrDataList = [];	//동이름 데이터
				var retDataList = [];	//수치 데이터
				$interactiveDataBoard.ui.dataSumValue = 0;
				//mng_s 20180109 주용민
				if(res.result2 == undefined){
					res.result2 = [];
				}
				for(var i = 0; i < res.result.length + res.result2.length; i ++) {
					var elem = [];
					if(i<res.result.length){
						elem = res.result[i];
					}else{
						elem = res.result2[i-res.result.length];
						if(elem.adm_cd.length > 7){
							elem.adm_nm = elem.adm_nm +"_"+ (i+1);
						}else{
							elem.adm_nm = elem.adm_nm;
						}
					}
					//mng_e
					
					//2017.03.28 2레벨에서 그래프 라벨 안보이는 문제
					//===============================START==================================//
					/*if((this.map.curPolygonCode == 4 || this.map.curPolygonCode == 5) && elem.adm_cd.length > 7) {
						var tmpAdmNm = "";
						if (options.params.adm_nm != null && options.params.adm_nm != undefined) {
							var arAdmNmList = options.params.adm_nm.split(" ");
							tmpAdmNm = arAdmNmList[arAdmNmList.length-1];
						}
						var label = tmpAdmNm+"_"+(i+1);
						addrDataList.push( label );
					} else {
						addrDataList.push( elem.adm_nm );
					}*/
					
					addrDataList.push( elem.adm_nm );
					//===============================END==================================//
					
					addrCdList.push(elem.adm_cd);
					//mng_s 20180115 leekh N/A에 의한 합계 오류 수정
					if(res.id == "API_0301") {	//인구통계총괄
						if (res.showData == "tot_ppltn") {
							this.dataBoardSum(elem.tot_ppltn);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue)); 
							retDataList.push(parseFloat(elem.tot_ppltn));	//총인구
						} else if (res.showData == "tot_ppltn_male") {
							this.dataBoardSum(elem.tot_ppltn_male);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.tot_ppltn_male));	//총인구-남자
						} else if (res.showData == "tot_ppltn_fem") {
							this.dataBoardSum(elem.tot_ppltn_fem);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.tot_ppltn_fem));		//총인구-여자
						} else if (res.showData == "avg_age") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.avg_age));		//평균나이
						} else if (res.showData == "avg_age_male") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.avg_age_male));		//평균나이-남자
						} else if (res.showData == "avg_age_fem") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.avg_age_fem));		//평균나이-여자
						} else if (res.showData == "ppltn_dnsty") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.ppltn_dnsty));		//인구밀도
						} else if (res.showData == "aged_child_idx") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.aged_child_idx));		//노령화지수
						} else if (res.showData == "oldage_suprt_per") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.oldage_suprt_per));	//노년부양비
						} else if (res.showData == "juv_suprt_per") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.juv_suprt_per));		//유년부양비
						} else if (res.showData == "tot_suprt_per") {
							$("#dataBoardStatsSum").html("");
							retDataList.push(parseFloat(elem.tot_suprt_per));		//총부양비
						} else if (res.showData == "corp_cnt") {
							this.dataBoardSum(elem.corp_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.corp_cnt));				//총사업체수
						} else if (res.showData == "household_cnt") {				//가구수
							this.dataBoardSum(elem.household_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.household_cnt));
						} else if (res.showData == "house_cnt") {				//주택수
							this.dataBoardSum(elem.house_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.house_cnt));
						} else if (res.showData == "farm_cnt") {				//농가수
							this.dataBoardSum(elem.farm_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.farm_cnt));
						} else if (res.showData == "forestry_cnt") {			//임가수
							this.dataBoardSum(elem.forestry_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.forestry_cnt));
						} else if (res.showData == "fishery_cnt") {				//어가수
							this.dataBoardSum(elem.fishery_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.fishery_cnt));		//총가구
						} else if (res.showData == "tot_family") {
							//msg_s 20170831 leekh
							this.dataBoardSum(elem.tot_family);
							//msg_e 20170831 leekh
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.tot_family));		//평균가구원수
						} else if (res.showData == "avg_fmember_cnt") {
							this.dataBoardSum(elem.avg_fmember_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.avg_fmember_cnt));
						} else if (res.showData == "tot_house") {				//총주택
							this.dataBoardSum(elem.tot_house);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.tot_house));
						} else if (res.showData == "nongga_cnt") {				//농가가구
							this.dataBoardSum(elem.nongga_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.nongga_cnt));
						} else if (res.showData == "imga_cnt") {				//임가가구
							this.dataBoardSum(elem.imga_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.imga_cnt));		//임가인구
						} else if (res.showData == "imga_ppltn") {
							this.dataBoardSum(elem.imga_ppltn);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.imga_ppltn));			//내수면총어가
						} else if (res.showData == "naesuoga_cnt") {
							this.dataBoardSum(elem.naesuoga_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.naesuoga_cnt));		//해수면어가인구
						} else if (res.showData == "naesuoga_ppltn") {
							this.dataBoardSum(elem.naesuoga_ppltn);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.naesuoga_ppltn));	//해수면총어가
						} else if (res.showData == "haesuoga_cnt") {
							this.dataBoardSum(elem.haesuoga_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.haesuoga_cnt));		//해수면어가인구
						} else if (res.showData == "haesuoga_ppltn") {
							this.dataBoardSum(elem.haesuoga_ppltn);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.haesuoga_ppltn));	//종사자수
						} else if (res.showData == "employee_cnt") {
							this.dataBoardSum(elem.employee_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.employee_cnt));
						} else if (res.showData == "nongga_ppltn") {			//농가인구
							this.dataBoardSum(elem.nongga_ppltn);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.nongga_ppltn));
						}
						
					} else if(res.id == "API_0302") {	//인구통계세부조건검색
						this.dataBoardSum(elem.population);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.population));
						
					} else if(res.id == "API_0304") {	//사업체분류검색
						if (res.showData == "tot_worker") {
							this.dataBoardSum(elem.tot_worker);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.tot_worker));
						} else if (res.showData == "corp_cnt") {
							this.dataBoardSum(elem.corp_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.corp_cnt));
						} else if (res.showData == "employee_cnt") {
							this.dataBoardSum(elem.employee_cnt);
							$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
							retDataList.push(parseFloat(elem.employee_cnt));
						}
						
					} else if(res.id == "API_0305") {	//가구통계검색
						this.dataBoardSum(elem.household_cnt);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.household_cnt));
					} else if(res.id == "API_0306") {	//주택통계검색
						this.dataBoardSum(elem.house_cnt);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.house_cnt));
					} else if(res.id == "API_0307") {	//농가통계검색
						this.dataBoardSum(elem.farm_cnt);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.farm_cnt));
					} else if(res.id == "API_0308") {	//임가통계검색
						this.dataBoardSum(elem.forestry_cnt);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.forestry_cnt));
					} else if(res.id == "API_0309") {	//어가통계검색
						this.dataBoardSum(elem.fishery_cnt);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.fishery_cnt));
					} else if(res.id == "API_0310") {	//가구원통계검색
						this.dataBoardSum(elem.population);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.population));
					}
					//조건결합시
					else {
						this.dataBoardSum(elem.data_cnt);
						$("#dataBoardStatsSum").html("합계 : " + appendCommaToNumber($interactiveDataBoard.ui.dataSumValue));
						retDataList.push(parseFloat(elem.data_cnt));
					}
				}
				//mng_e 20180115 leekh N/A에 의한 합계 오류 수정

				//표 데이터 생성
				var dataList = [];
				for(var i = 0; i < addrDataList.length; i ++) {
					dataList.push({ item : addrDataList[i], itemCd : addrCdList[i], value : retDataList[i], _dataIdx : (i+1) });
				}
				
				//정렬
				var dataList = $interactiveDataBoard.Util.tableDataSort(dataList);
				
				var html = "";
				for(var  i = 0; i < dataList.length; i ++) {
					var value = appendCommaToNumber(dataList[i].value);
					var rate = dataList[i].rate;
					if (value == "0"){
						value = "N/A";
					}
					if (rate == "0") {
						rate = "-";
					}
					
					html += "<tr>";
					html += "	<td class='al' style='text-align:center;'>"+dataList[i].item+"</td>";
					
					if( dataList[i].itemCd.length > 7 ){
						html += "	<td class='al' style='text-align:center;word-wrap:break-word;'>"+dataList[i].itemCd+"</td>";
					}
					
					html += "	<td style='text-align:center;'>"+(i+1)+"</td>";
					html += "	<td style='text-align:center;'>"+value+"</td>";
					html += "	<td style='text-align:center;'>"+rate+"</td>";
					html += "</tr>";
				}
				
				if( dataList.length > 0 && dataList[0].itemCd.length > 7 ) {
					$(".adm_cd_th").css("display", "");
				} else {
					$(".adm_cd_th").css("display", "none");
				}
				
				$("#barChartTable").html(html);
				
				//데이터보드 확장
				$("#fullBarChartTable").html(html);
			},
			
			//mng_s 20180115 leekh N/A 0처리 함수
			dataBoardSum : function(val) {
				if(val == "N/A"){
					val = 0;
				}
				$interactiveDataBoard.ui.dataSumValue += parseFloat(val);
			},
			//mng_e 20180115 leekh 
			
			/**
			 * 
			 * @name         : updateTargetAreaTableKosis
			 * @description  : 해당 지역 데이터 보기 표 업데이트 Kosis
			 * @date         : 2015. 11. 03. 
			 * @author	     : 석진혁
			 * @param	: res, options
			 * @history 	 :
			 */
			updateTargetAreaTableKosis : function(res) {
				var addrCdList = [];		//행정동코드 데이터
				var addrDataList = [];	//동이름 데이터
				var retDataList = [];	//수치 데이터
				
				if(res.length > 0) {
					for(var i = 0; i < res.length; i ++) {
						var elem = res[i];
						
						addrDataList.push(elem.NAME);
						addrCdList.push(elem.CODE);
						retDataList.push(parseInt(elem.DATA));
					}
				}
				
				//표 데이터 생성
				var dataList = [];
				for(var i = 0; i < addrDataList.length; i ++) {
					dataList.push({ item : addrDataList[i], itemCd : addrCdList[i], value : retDataList[i], _dataIdx : (i+1) });
				}
				
				//정렬
				var dataList = $interactiveDataBoard.Util.tableDataSort(dataList);
				
				var html = "";
				for(var  i = 0; i < dataList.length; i ++) {
					html += "<tr>";
					html += "	<td class='al'>"+dataList[i].item+"</td>";
					html += "	<td>"+(i+1)+"</td>";
					html += "	<td>"+appendCommaToNumber(dataList[i].value)+"</td>";
					html += "	<td>"+dataList[i].rate+"</td>";
					html += "</tr>";
				}
				
				$(".adm_cd_th").css("display", "none");
				$("#barChartTable").html(html);
			},
			
			/**
			 * 
			 * @name         : updateTargetAreaTableMulti
			 * @description  : 해당 지역 데이터 보기 표 업데이트 multi data
			 * @date         : 2016. 02. 05. 
			 * @author	     : 권차욱
			 * @param	: res, options
			 * @history 	 :
			 */
			updateTargetAreaTableMulti : function(res, options) {
				var addrCdList = [];		//행정동코드 데이터
				var addrDataList = [];		//동이름 데이터
				var retDataList = [];		//수치 데이터
				
				for (var i=0; i<res.length; i++) {
					var data = res[i].data;
					if (data.result != undefined && data.result.length > 0) {
						for (var k=0; k<data.result.length; k++) {
							var elem = data.result[k];
							
							//읍면동 단위
							if(elem.adm_cd.length > 7) {
								addrDataList.push(elem.adm_cd);
							} else {
								addrDataList.push(elem.adm_nm);
							}
							addrCdList.push(elem.adm_cd);
							
							if (data.id == "API_0301") {	//인구통계총괄
								if (data.showData == "tot_ppltn") {
									retDataList.push(parseFloat(elem.tot_ppltn));	//총인구
								} else if (data.showData == "tot_ppltn_male") {
									retDataList.push(parseFloat(elem.tot_ppltn_male));	//총인구-남자
								} else if (data.showData == "tot_ppltn_fem") {
									retDataList.push(parseFloat(elem.tot_ppltn_fem));		//총인구-여자
								} else if (data.showData == "avg_age") {
									retDataList.push(parseFloat(elem.avg_age));		//평균나이
								} else if (data.showData == "avg_age_male") {
									retDataList.push(parseFloat(elem.avg_age_male));		//평균나이-남자
								} else if (data.showData == "avg_age_fem") {
									retDataList.push(parseFloat(elem.avg_age_fem));		//평균나이-여자
								} else if (data.showData == "ppltn_dnsty") {
									retDataList.push(parseFloat(elem.ppltn_dnsty));		//인구밀도
								} else if (data.showData == "aged_child_idx") {
									retDataList.push(parseFloat(elem.aged_child_idx));		//노령화지수
								} else if (data.showData == "oldage_suprt_per") {
									retDataList.push(parseFloat(elem.oldage_suprt_per));	//노년부양비
								} else if (data.showData == "juv_suprt_per") {
									retDataList.push(parseFloat(elem.juv_suprt_per));		//유년부양비
								} else if (data.showData == "tot_suprt_per") {
									retDataList.push(parseFloat(elem.tot_suprt_per));		//총부양비
								} else if (data.showData == "corp_cnt") {
									retDataList.push(parseFloat(elem.corp_cnt));				//총사업체수
								}else if (data.showData == "household_cnt") {			//가구수
									retDataList.push(parseFloat(elem.household_cnt));		//주택수
								} else if (data.showData == "house_cnt") {
									retDataList.push(parseFloat(elem.house_cnt));			//농가수
								} else if (data.showData == "farm_cnt") {
									retDataList.push(parseFloat(elem.farm_cnt));			//임가수
								} else if (data.showData == "forestry_cnt") {
									retDataList.push(parseFloat(elem.forestry_cnt));		//어가수
								} else if (data.showData == "fishery_cnt") {
									retDataList.push(parseFloat(elem.fishery_cnt));		//총가구
								} else if (data.showData == "tot_family") {
									retDataList.push(parseFloat(elem.tot_family));		//평균가구원수
								} else if (data.showData == "avg_fmember_cnt") {
									retDataList.push(parseFloat(elem.avg_fmember_cnt));	//총주택
								} else if (data.showData == "tot_house") {
									retDataList.push(parseFloat(elem.tot_house));			//농가가구
								} else if (data.showData == "nongga_cnt") {
									retDataList.push(parseFloat(elem.nongga_cnt));		//임가가구
								} else if (data.showData == "imga_cnt") {
									retDataList.push(parseFloat(elem.imga_ppltn));		//임가인구
								} else if (data.showData == "imga_ppltn") {
									retDataList.push(parseFloat(elem.imga_cnt));			//내수면총어가
								} else if (data.showData == "naesuoga_cnt") {
									retDataList.push(parseFloat(elem.naesuoga_cnt));	
								} else if (data.showData == "naesuoga_ppltn") {			//해수면어가인구
									retDataList.push(parseFloat(elem.naesuoga_ppltn));
								} else if (data.showData == "haesuoga_cnt") {			//해수면총어가
									retDataList.push(parseFloat(elem.haesuoga_cnt));
								} else if (data.showData == "haesuoga_ppltn") {			//해수면어가인구
									retDataList.push(parseFloat(elem.haesuoga_ppltn));
								} else if (data.showData == "employee_cnt") {			//종사자수
									retDataList.push(parseFloat(elem.employee_cnt));	
								} else if (data.showData == "nongga_ppltn") {			//농가인구
									retDataList.push(parseFloat(elem.nongga_ppltn));
								}
								
								
							} else if(data.id == "API_0302") {	//인구통계세부조건검색
								retDataList.push(parseFloat(elem.population));
								
							} else if(data.id == "API_0304") {	//사업체분류검색
								if (data.showData == "tot_worker") {
									retDataList.push(parseFloat(elem.tot_worker));
								} else if (data.showData == "corp_cnt") {
									retDataList.push(parseFloat(elem.corp_cnt));
								}
							} else if(data.id == "API_0305") {	//가구통계검색
								retDataList.push(parseFloat(elem.household_cnt));
							} else if(data.id == "API_0306") {	//주택통계검색
								retDataList.push(parseFloat(elem.house_cnt));
							} else if(data.id == "API_0307") {	//농가통계검색
								retDataList.push(parseFloat(elem.farm_cnt));
							} else if(data.id == "API_0308") {	//임가통계검색
								retDataList.push(parseFloat(elem.forestry_cnt));
							} else if(data.id == "API_0309") {	//어가통계검색
								retDataList.push(parseFloat(elem.fishery_cnt));
							} else if(data.id == "API_0310") {	//가구원통계검색
								retDataList.push(parseFloat(elem.population));
							}
							//조건결합시
							else {
								retDataList.push(parseFloat(elem.data_cnt));
							}
						}
						
					}
				}

				//표 데이터 생성
				var dataList = [];
				for(var i = 0; i < addrDataList.length; i ++) {
					dataList.push({ item : addrDataList[i], itemCd : addrCdList[i], value : retDataList[i], _dataIdx : (i+1) });
				}
				
				//정렬
				var dataList = $interactiveDataBoard.Util.tableDataSort(dataList);
				
				var html = "";
				for(var  i = 0; i < dataList.length; i ++) {
					var value = appendCommaToNumber(dataList[i].value);
					var rate = dataList[i].rate;
					if (value == "0"){
						value = "N/A";
					}
					if (rate == "0") {
						rate = "-";
					}
					
					html += "<tr>";
					html += "	<td class='al' style='text-align:center;'>"+dataList[i].item+"</td>";
					html += "	<td style='text-align:center;'>"+(i+1)+"</td>";
					html += "	<td style='text-align:center;'>"+value+"</td>";
					html += "	<td style='text-align:center;'>"+rate+"</td>";
					html += "</tr>";
				}
				
				if( dataList.length > 0 && dataList[0].itemCd.length > 7 ) {
					$(".adm_cd_th").css("display", "");
				} else {
					$(".adm_cd_th").css("display", "none");
				}
				
				$("#barChartTable").html(html);
				
				//데이터보드 확장
				$("#fullBarChartTable").html(html);
			},
			
			/**
			 * 
			 * @name         : updatePieChart
			 * @description  : 상위 지역 비교 데이터 보기 차트 & 표 업데이트
			 * @date         : 2015. 10. 29. 
			 * @author	     : 김성현
			 * @param	:  options
			 * @history 	 :
			 */
			updatePieChart : function(options) {
				if(options.params.adm_cd == "00") {	//전국 단위일 경우 원형차트 안보임
					//$(this.pieChartObj).hide();
					//$("#pieChartTable").html("");
					$("#viewUpRegionData_dt_area").hide(); //9월 서비스
					$("#viewUpRegionData_dd_area").hide(); //9월 서비스
					return;
				}
				
				var url = "";
				if(options.params.api_id == "API_0301") {	//인구통계총괄
					url = "/ServiceAPI/stats/population.json";
				} else if(options.params.api_id == "API_0302") {	//인구통계세부조건검색
					url = "/ServiceAPI/stats/searchpopulation.json";
				} else if(options.params.api_id == "API_0303") {	//산업체분류검색
					url = "/ServiceAPI/stats/industrycode.json";
				} else if(options.params.api_id == "API_0304") {	//사업체분류검색
					url = "/ServiceAPI/stats/company.json";
				} else if(options.params.api_id == "API_0305") {	//가구통계검색
					url = "/ServiceAPI/stats/household.json";
				} else if(options.params.api_id == "API_0306") {	//주택통계검색
					url = "/ServiceAPI/stats/house.json";
				} else if(options.params.api_id == "API_0307") {	//농가통계검색
					url = "/ServiceAPI/stats/farmhousehold.json";
				} else if(options.params.api_id == "API_0308") {	//임가통계검색
					url = "/ServiceAPI/stats/forestryhousehold.json";
				} else if(options.params.api_id == "API_0309") {	//어가통계검색
					url = "/ServiceAPI/stats/fisheryhousehold.json";
				} else if(options.params.api_id == "API_0310") {	//가구원통계검색
					url = "/ServiceAPI/stats/householdmember.json";
				}

				var sopPortalPieChartDrawObj = new sop.portal.pieChartDraw.api();
				for (var i=0; i<options.params.param.length; i++) {
					sopPortalPieChartDrawObj.addParam(
							options.params.param[i].key, 
							options.params.param[i].value);
				}
				sopPortalPieChartDrawObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalPieChartDrawObj.request({
			        method : "POST",
			        async : true,
			        url : contextPath + url,
			        options : {
			        	target : this,
			        	params : options.params
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : timeSeriesInit
			 * @description  : 시계열 초기값 세팅
			 * @date         : 2015. 10. 30. 
			 * @author	     : 김성현
			 * @param	:  options
			 * @history 	 :
			 */
			timeSeriesInit : function(params) {
				
				console.log("[interactiveDataBoard.js] timeSeriesInit() 호출");
				
//				var dataBoard = this.mapData[this.map_id].dataBoard;
				var dataBoard = this.mapData[$interactiveMap.ui.curMapId].dataBoard;
				var date = new Date();
				var minYear = 2000;		//최소년도 기본 2000년
				var maxYear = date.getFullYear()-1;		//재작년도를 maxYear로 잡는다. //mng_s 2016년 추가로 -2에서 -1로 변경 김준하 20171103
				
				//사업체일 경우 기본 최소년도는 2000년
				if(params.api_id == "API_0304") {
					minYear = 2000;
				}
				//사업체일 경우 기본 최소년도는 2000년
				if(params.api_id == "API_0304") {
					minYear = 2000;
				}
				if (params.maxYear != undefined && params.maxYear.length > 0) {
					maxYear = params.maxYear;
				}
				
				//총조사 사업체일 경우 기본 최소년도는 2000년, 재작년도를 maxYear로 잡는다.
				if(params.api_id == "API_0301" && params.filter == "corp_cnt") {
					minYear = 2000;
					maxYear = date.getFullYear()-2;
				}
				
				//총조사 임가일 경우 기본 최소년도는 2005년, 재작년도를 maxYear로 잡는다.
				if(params.api_id == "API_0308" && params.filter == "forestry_cnt") {
					minYear = 2005;
					maxYear = date.getFullYear()-2;
				}
				//총조사 임가일 경우 기본 최소년도는 2005년, 재작년도를 maxYear로 잡는다.
				if(params.api_id == "API_0310" && params.filter == "population" && params.title.substr(0,2)== "임가") {
					minYear = 2005;
					maxYear = date.getFullYear()-2;
				}
				
//				if(params.api_id == "API_0307"){
//					maxYear = date.getFullYear()-2;
//				}

				if (params.param != undefined && params.param.length > 0) {
					for (var i=0; i<params.param.length; i++) {
						if(params.param[i].key == "class_deg") {		//8차 산업분류일 경우 시작년도는 2000년
							minYear = 2000;
						}
					}
				}
				
				dataBoard.selectedYearArray = [];
				
				//사업체일 경우 or 총조사 사업체일 경우 1년단위
				if((params.api_id == "API_0304") || (params.api_id == "API_0301" && params.filter == "corp_cnt")) {
					for(var year = minYear; year <= maxYear; year ++) {
						dataBoard.selectedYearArray.push(year);
					}
					
				} else {	//나머지는 5년단위
					for(var year = minYear; year < date.getFullYear(); year ++) {
						if((year % 5) == 0) {
							if(year <= maxYear) {
								dataBoard.selectedYearArray.push(year);
							}
						}else if(year == "2016"){
							if(params.api_id == "API_0307" || params.api_id == "API_0308" || params.api_id == "API_0309" || params.api_id == "API_0310"  ) {
								//농가 임가 어가는 2016년을 추가하지 않는다
							}else{
								dataBoard.selectedYearArray.push(year);
							}
						}
					}
				}
			},
			
			/**
			 * 
			 * @name         : updateTimeSeries
			 * @description  : 시계열별 데이터 조회
			 * @date         : 2015. 10. 29. 
			 * @author	     : 김성현
			 * @param	:  options
			 * @history 	 :
			 */
			updateTimeSeries : function(options) {
				var dataBoard = this.mapData[this.map_id].dataBoard;
				var date = new Date();
				var minYear = 2000;		//최소년도 기본 2000년
				//var maxYear = date.getFullYear()-2;		//재작년도를 maxYear로 잡는다.
				var maxYear = 2016;	//2016년 데이터 적용
				var viewMaxYear = "";
				var html = "";
				var html2 = "";
				var base_year = "";
				
				console.log("interactiveDataBoard.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@ maxYear1 : " + maxYear);
				
				//사업체일 경우 기본 최소년도는 2000년
				if(options.params.api_id == "API_0304") {
					minYear = 2000;
				}
				if (options.params.maxYear != undefined && options.params.maxYear.length > 0) {
					maxYear = options.params.maxYear;
				}
				console.log("interactiveDataBoard.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@ maxYear2 : " + maxYear);
				//총조사 사업체일 경우 기본 최소년도는 2000년, 재작년도를 maxYear로 잡는다.
				if(options.params.api_id == "API_0301" && options.params.filter == "corp_cnt") {
					minYear = 2000;
					maxYear = date.getFullYear()-2;
				}
				
				console.log("interactiveDataBoard.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@ maxYear3: " + maxYear);
				
				if(options.params.api_id == "API_0307"){
					maxYear= date.getFullYear()-2;
				}
				
				console.log("interactiveDataBoard.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@ maxYear4 : " + maxYear);
				
				var isTimeSerieseHide = false;
				if (options.params.param != undefined && options.params.param.length > 0) {
					for (var i=0; i<options.params.param.length; i++) {
						if (options.params.param[i].key == "year") {
							base_year = options.params.param[i].value;
							$interactiveMap.ui.curDropParams.time_year = base_year;
						} else if(options.params.param[i].key == "class_deg") {		//8차 산업분류일 경우 시작년도는 2000년
							minYear = 2000;
						} else if (options.params.param[i].key == "house_use_prid_cd" || options.params.param[i].key == "const_year") {
							isTimeSerieseHide = true;
						}
					}
				}
				
				
				console.log("interactiveDataBoard.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@ maxYear5 : " + maxYear);
				//2016.08.30 9월 서비스 - 2015년 통계일 경우, 시계열 hide
				if (//options.params.api_id == "API_0301" || 	//주요지표
					//options.params.api_id == "API_0302" ||	//인구통계
					//options.params.api_id == "API_0305" ||	//가구통계
					(options.params.api_id == "API_0306" ||  //주택통계
					options.params.api_id == "API_4011") && isTimeSerieseHide) {	//조건결합
					$("#viewTimeSeriesData_dt_area").hide();
					$("#viewTimeSeriesData_dd_area").hide();
					$("#fullTableTimeSeries").hide();
					$("#fullTableTimeSeries").prev().hide();
					return;
				}else {
					$("#viewTimeSeriesData_dt_area").show();
					$("#viewTimeSeriesData_dd_area").show();
					$("#fullTableTimeSeries").show();
					$("#fullTableTimeSeries").prev().show();
				}
				
				$("#tableTimeSeries").empty();
				$("#fullTableTimeSeries").empty();
				dataBoard.yearArray = [];
				
				html += "	<ul>";
				var dashText = "";
				//사업체일 경우 or 총조사 사업체일 경우 1년단위
				
				if((options.params.api_id == "API_0304") || (options.params.api_id == "API_0301" && options.params.filter == "corp_cnt")) {
					// mng_s 2017. 12. 05 j.h.Seok
					var tempParam = options.params.param;
					var isThemeCd = false;
					
					for(var i = 0; i < tempParam.length; i++) {
						var tempVal = tempParam[i];
						
						if(tempVal.key === 'theme_cd') {
							isThemeCd = true;
							break;
						}
					}
					
					if(!isThemeCd) {
					// mng_e 2017. 12. 05 j.h.Seok
					// 사업체의 경우 데이터보드의 시계열 조회 2015년 항목 삭제		// leekh 전국 사업체조사 시계열은 srv_dt_statbaseyearinfo에서 수정
					
						if(base_year <= 2005) {
							minYear = "2000";
							
							maxYear = "2005";
							dashText = "2006년 이후 자료를 보시기 위해서는 산업분류를 다시 선택해 주십시오. (2000~2005: 8차 산업분류, 2006~현재: 9차 산업분류)";
						} else if(base_year > 2005) {
							minYear = "2006";
							maxYear = "2016";
							dashText = "2005년 이전 자료를 보시기 위해서는 산업분류를 다시 선택해 주십시오. (2000~2005: 8차 산업분류, 2006~현재: 9차 산업분류)";
						}
					}
					// mng_s 2017. 12. 05 j.h.Seok
					else {
						minYear = "2006";
						maxYear = "2016";
						dashText = "테마코드는 9차 산업분류에 한해서만 제공됩니다.";
					}
					// mng_e 2017. 12. 05 j.h.Seok
					for(var year = minYear; year <= maxYear; year ++) {
						viewMaxYear = year;
						
						html += "<li id='li_y"+year+"'>";
						html += "	<input type='checkbox' id='y"+year+"' value='"+year+"' class='year_input' />";
						html +=	"   <input type='radio' name='fixed_legend' value='"+year+"' class='year_radio' style='display:none;'/>";	
						html += "	<div id='div_y"+year+"'>"+year+"</div>";
						html += "</li>";
						
						//데이터보드 확장일 경우
						html2 += "<li id='full_li_y"+year+"'>";
						html2 += 	year + "<input type='hidden' id='full_li_y"+year+"' value='"+year+"' />";
						html2 += "</li>";
						dataBoard.yearArray.push(year);
					}
					
				} else {	//나머지는 5년단위
					
					/*
					if(options.params.api_id == "API_0301" && options.params.filter == "tot_ppltn") {
						maxYear = "2016";
					}
					if(options.params.api_id == "API_0302" && options.params.filter == "population") {	//인구주택 총조사 2016년 시계열 추가
						maxYear = "2016";
					}
					if(options.params.api_id == "API_0305" && options.params.filter == "household_cnt") {	//인구주택 총조사 가구 2016년 시계열 추가
						maxYear = "2016";
					}
					if(options.params.api_id == "API_0306" && options.params.filter == "house_cnt") {	//인구주택 총조사 주택 2016년 시계열 추가
						maxYear = "2016";
					}
					*/
					
					for(var year = minYear; year < date.getFullYear(); year ++) {
						if((year % 5) == 0) {
							if(year <= maxYear) {
								viewMaxYear = year;
								html += "<li id='li_y"+year+"'>";
								html += "	<input type='checkbox' id='y"+year+"' value='"+year+"' class='year_input' />";
								html +=	"   <input type='radio' name='fixed_legend' value='"+year+"' class='year_radio' style='display:none;'/>";	
								html += "	<div id='div_y"+year+"'>"+year+"</div>";
								html += "</li>";
								
								//데이터보드 확장일 경우
								html2 += "<li id='full_li_y"+year+"'>";
								html2 += 	year + "<input type='hidden' id='full_li_y"+year+"' value='"+year+"' />";
								html2 += "</li>";
								dataBoard.yearArray.push(year);
							}
							//mng_s 20171030 leekh 추가 2016년 추가
						}else if((year % 5) != 0 && year == maxYear){
							console.log("interactiveDataBoard.js maxYear2 : " + maxYear);
							viewMaxYear = year;
							html += "<li id='li_y"+year+"'>";
							html += "	<input type='checkbox' id='y"+year+"' value='"+year+"' class='year_input' />";
							html +=	"   <input type='radio' name='fixed_legend' value='"+year+"' class='year_radio' style='display:none;'/>";	
							html += "	<div id='div_y"+year+"'>"+year+"</div>";
							html += "</li>";
							
							//데이터보드 확장일 경우
							html2 += "<li id='full_li_y"+year+"'>";
							html2 += 	year + "<input type='hidden' id='full_li_y"+year+"' value='"+year+"' />";
							html2 += "</li>";
							dataBoard.yearArray.push(year);
						}
							//mng_e 20171030 leekh 추가
					}
				}
				html += "	</ul>";
				html += "	<div style='color:#26415c; font-size:15px;position:absolute;top:130px;margin-left:100px;width:300px'>"+dashText+"</div>";
				$("#tableTimeSeries").append(html);
				
				//클릭 시 조회 이벤트 추가
				for(var i = 0; i < dataBoard.yearArray.length; i ++) {
					$("#li_y"+dataBoard.yearArray[i]).on('click', function() {
						//시계열 설정창이 닫혀있고
						if(!$(".btn_clockTypeSetting").hasClass("on")) {
							$interactiveDataBoard.ui.selectTimeSeries(options, $(this).find("input"));
						}
					});
				}
				
				//선택된 년도 버튼만 보여주기
				for(var i = 0; i < dataBoard.selectedYearArray.length; i ++) {
					for(var x = 0; x < dataBoard.yearArray.length; x ++) {
						if(dataBoard.selectedYearArray[i] == dataBoard.yearArray[x]) {
							$("#li_y"+dataBoard.selectedYearArray[i]).show();
							$("#li_y"+dataBoard.selectedYearArray[i]).find("input").prop("checked", true);
							break;
						}
					}
				}
				
				// 링크로 넘어왔을 경우, 최초검색(파라미터 base_year 기반으로 해당년도 선택)
//				if ((base_year != undefined && base_year != "" && base_year.length > 0) &&
//				(dataBoard.selectSeriesYear == undefined || dataBoard.selectSeriesYear == "")) {
				if (base_year != undefined && base_year != "") {
					$("#li_y"+base_year).addClass("on");
					dataBoard.selectSeriesYear = base_year;
				} 
				//링크가 아닌, 최초검색
				else if(dataBoard.selectSeriesYear == undefined || dataBoard.selectSeriesYear == "") {
					$("#li_y"+viewMaxYear).addClass("on");
					dataBoard.selectSeriesYear = viewMaxYear;
				} else {
					$("#li_y"+dataBoard.selectSeriesYear).addClass("on");
					dataBoard.selectSeriesYear = base_year;
				}
				
				//데이터보드 확장, 클릭 시 조회 이벤트 추가
				$("#fullTableTimeSeries").append(html2);
				$("#full_li_y"+dataBoard.selectSeriesYear).addClass("on");
				for(var i = 0; i < dataBoard.yearArray.length; i ++) {
					$("#full_li_y"+dataBoard.yearArray[i]).on('click', function() {
						$("#fullTableTimeSeries").find("li").removeClass("on");
						$(this).addClass("on");
						$interactiveDataBoard.ui.selectTimeSeries(options, $(this).find("input"));
					});
				}
			},
			
			/**
			 * 
			 * @name         : selectTimeSeries
			 * @description  : 시계열 년도 선택 시 조회
			 * @date         : 2015. 10. 29. 
			 * @author	     : 김성현
			 * @param	:  options, 년도array
			 * @history 	 :
			 */
			selectTimeSeries : function(options, yearObj) {
				var dataBoard = this.mapData[this.map_id].dataBoard; 
				if (dataBoard.selectedYearArray.length != dataBoard.timeSeriesPushData.length) {
					dataBoard.selectSeriesYear = $(yearObj).val();
					
					// share정보 초기화
//					this.delegate.curMapId = map.id;
//					this.delegate.shareUrlInfo = [];
					
					for(var i = 0; i < options.params.param.length; i ++) {
						if(options.params.param[i].key == "year") {
							options.params.param[i].value = $(yearObj).val();
							$interactiveMap.ui.curDropParams.time_year = $(yearObj).val();
						}
					}
					
					var btnType = "";
					if($(".btn_clockTypePlay").text() == "play") {
						btnType = "stop";
					} else {
						btnType = "play";
					}
					
					options.params["view_type"] = "TS";
					if(btnType == "stop") {	//애니메이션이 실행중일 경우
						options.params["isTimeSeriesYn"] = "Y";
					}
					//9월 서비스
					this.map.isDrop = true;
					this.map.undoDropLayerBounds();
					$interactiveMap.ui.requestOpenApi(options.params);
				}
			},
			
			/**
			 * 
			 * @name         : doReqTimeSeries
			 * @description  : 시계열 애니메이션이 끝까지 돌았는지 확인
			 * @date         : 2015. 10. 30. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			doReqTimeSeries : function() {
				var dataBoard = this.mapData[this.map_id].dataBoard;
				if (dataBoard.selectedYearArray.length > 0) {
					if (dataBoard.timeSeriesCnt == dataBoard.selectedYearArray.length) {
						$interactiveMapApi.request.mask.close(); //9월 서비스
						dataBoard.isTimeSeriesPlay = false;
						
						//시계열 고정-범례값 설정
						if (this.isFixedLegend) {
							for (var i=0; i<dataBoard.timeSeriesPushData.length; i++) {
								var tmpDataBoard = dataBoard.timeSeriesPushData[i];
								for (var k=0; k<tmpDataBoard.options.params.param.length; k++) {
									var tmpParams = tmpDataBoard.options.params.param[k];
									if (tmpParams.key == "year") {
										if (tmpParams.value == this.fixedLegendYear) {
											if (tmpDataBoard.res.result.length > 0) {
												this.map.setStatsData("normal", tmpDataBoard.res, tmpDataBoard.options.params.filter, tmpDataBoard.options.params.unit);
												this.map.setLegendForStatsData();
											}else {
												var tmpData = [];
												tmpData[0] = [0];
												this.map.legend.calculateLegend(tmpData);
											}					
											this.fixedLegend = deepCopy(this.map.legend.valPerSlice);
											break;
										}
									}
								}
							}
						}
						
						if( sop.isInnerMapShow2 || sop.isInnerMapShow3 ) { //mng_s 그리드일 경우 
							dataBoard.timer = setInterval(this.timerSeriesPlay, 5000);
						} else {
							dataBoard.timer = setInterval(this.timerSeriesPlay, 2000);
						}
						dataBoard.timeSeriesCnt = 0;
						return;
					}
					//9월 서비스
					this.mapData[this.map_id].options.params.map = null;
					var options = deepCopy(this.mapData[this.map_id].options);
					this.mapData[this.map_id].options.params.map = this.map;
					options.params.map = this.map;
					for(var i = 0; i < options.params.param.length; i ++) {
						if(options.params.param[i].key == "year") {
							options.params.param[i].value = dataBoard.selectedYearArray[dataBoard.timeSeriesCnt];
							break;
						}
					}
					options.params.async = true;
					if (dataBoard.timeSeriesCnt == 0) {
						$interactiveMapApi.request.mask.show();
					}
					
					$interactiveMap.ui.requestOpenApi(options.params);
					dataBoard.timeSeriesCnt ++;
				}
			},
			
			/**
			 * 
			 * @name         : timerSeriesPlay
			 * @description  : 시계열 애니메이션 플레이
			 * @date         : 2015. 10. 30. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			timerSeriesPlay : function() {
				//9월 서비스
				var dataBoard = $interactiveDataBoard.ui.mapData[$interactiveDataBoard.ui.map_id].dataBoard;
				var map = $interactiveDataBoard.ui.map;
				var geojson = map.dataGeojsonLayer;
				for (var j=0; j<geojson.features.length; j++) {
					if (geojson.features[j].info) {
						geojson.features[j].info = [];
					}
				}
				
				if (dataBoard.timeSeriesPushData[dataBoard.timeSeriesCnt].res.errCd == "0") {
					var res = dataBoard.timeSeriesPushData[dataBoard.timeSeriesCnt].res;
					var options = dataBoard.timeSeriesPushData[dataBoard.timeSeriesCnt].options;
					
					map.setStatsData("normal", res, options.params.filter, options.params.unit);
					
					//범례고정일 경우
					if ($interactiveDataBoard.ui.isFixedLegend) {
						if (map.dataGeojson) {
							map.dataGeojson.remove();
							map.removeCaption();
							map.dataGeojson = null;
						}
						map.legend.valPerSlice = $interactiveDataBoard.ui.fixedLegend;
						geoData = map.combineStatsData(geojson, true);
						map.addPolygonGeoJson(geoData, "data");
					}else {
						map.setPolygonDataGeojson(geojson);
					}
					
					$interactiveDataBoard.ui.updateDataBoard(res, options);
					$interactiveMap.ui.curDropParams[map.id] = options.params;
					dataBoard.timeSeriesCnt++;
					
					if (dataBoard.timeSeriesCnt == dataBoard.selectedYearArray.length) {
						dataBoard.timeSeriesCnt = 0;
					}
				}
			},
			
			/**
			 * 
			 * @name         : emptyTimerBaseInsert
			 * @description  : 시계열 애니메이션에서 검색값이 없을 경우
			 * @date         : 2015. 10. 30. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			emptyTimerBaseInsert : function(res, options) {
				var dataBoard = this.mapData[this.map_id].dataBoard;
				if (dataBoard.isTimeSeriesPlay) {
					dataBoard.timeSeriesPushData.push({
						"res" : res,
						"options": options
					});
					
					if (dataBoard.timeSeriesCnt == dataBoard.selectedYearArray.length) {
						dataBoard.isTimeSeriesPlay = false;
						dataBoard.timer = setInterval(this.timerSeriesPlay, 2000);
						dataBoard.timeSeriesCnt = 0;
						return;
					}
					this.doReqTimeSeries();
				}
			},
			
			/**
			 * 
			 * @name         : selectChartData
			 * @description  : 폴리곤을 오버했을 경우, 해당 차트데이터의 색상을 변경한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			selectChartData : function(properties, index, map_id) {
				var charts = $("#targetCharts").highcharts();
				
				if($("#targetCharts").is(":visible")) {
					var adm_cd = properties.adm_cd;
					var ssaArray = properties.adm_nm.split(" ");
					
					//현재 보고 있는 지도일 경우에만
					if(map_id == this.map_id) {
						if(charts != undefined && index != undefined && index != null) {
							if (this.lastChatIndex != null && (this.lastChatIndex < charts.series[0].data.length)) {
								charts.series[0].data[this.lastChatIndex].update({ color: '#2951f2' });
							}
							
							//선택된 bar의 위치로 scroll 이동, 9월 서비스
							var scrollIdx = index-2;
							if (scrollIdx < 0) {
								scrollIdx = 0;;
							}
							$("#wrapperChartScroll").mCustomScrollbar("scrollTo", $("#targetCharts").find('.highcharts-axis-labels text').eq(scrollIdx));
							
							charts.series[0].data[index].update({ color: '#fe5800' });
							charts.tooltip.refresh(charts.series[0].data[index]);				
							this.lastChatIndex = index;
						}else{
							var lastIndx = charts.series[0].data.length;
//							charts.series[0].data[this.lastChatIndex].update({ color: '#2951f2' });
							$("#wrapperChartScroll").mCustomScrollbar("scrollTo", $("#targetCharts").find('.highcharts-axis-labels text').eq(lastIndx-1));
						}
					}
				}
			},
			
			/**
			 * @name         : resetTimeSeries
			 * @description  :	시계열 초기화
			 * @date         : 2015. 11. 26.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			resetTimeSeries : function() {
				for(var i = 0; i < this.mapData.length; i ++) {
					var dataBoard = this.mapData[i].dataBoard;
					clearInterval(dataBoard.timer);
					dataBoard.selectSeriesYear = "";	//선택된 시계열 변수값 초기화
					dataBoard.timeSeriesPushData = [];				//시계열 애니메이션의 정보를 담는 변수 초기화
					dataBoard.isTimeSeriesPlay = false;
					dataBoard.timeSeriesCnt = 0;
					dataBoard.timer = 0;
				}
				
				
				
//				var dataBoard = this.mapData[this.map_id].dataBoard;
//				
//				clearInterval(dataBoard.timer);
//				dataBoard.selectSeriesYear = "";	//선택된 시계열 변수값 초기화
//				dataBoard.timeSeriesPushData = [];				//시계열 애니메이션의 정보를 담는 변수 초기화
//				dataBoard.isTimeSeriesPlay = false;
//				dataBoard.timeSeriesCnt = 0;
//				dataBoard.timer = 0;
				$(".btn_clockTypePlay").text("play");	//버튼 변경
				$(".btn_clockTypePlay").css("background-image", "url(/img/ico/ico_dbPlay.png)");
			},
			
			/**
			 * @name         : reset
			 * @description  :	대화형 통계지도 데이터보드 초기화
			 * @date         : 2015. 11. 26.
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reset : function(map_id) {
				$(".dataBoardDiv").hide();
				//일반 데이터보드
				//$("#dataBoardTitle").html("");		//제목
				$(".dataBoardTitle").html("");		//제목
//				$("#dataBoardArea").html("");		//지역
				$(".dataBoardArea").html("");		//지역
//				$("#dataBoardStats").html("");		//통계
				$(".dataBoardStats").html("");		//통계
				$("#targetCharts").empty();		//표 차트
				$("#barChartTable").html("");		//표 차트 테이블
				$("#pieChartDiv1").empty();		//원형차트1
				$("#pieChartDiv2").empty();		//원형차트2
				$("#pieChartDiv3").empty();		//원형차트3
				$(".pieLegend").html("");			//원형차트범례
				$("#pieChartTable").html("");		//원형 차트 테이블
				$("#tableTimeSeries").html("");	//시계열
				
				//확장 데이터보드
				//조회조건
				//2016.03.18 수정, 확장데이터보드에서 조회건이 안나오는 현상
//				$("#fullDataBoardTitle").find("#dataBoardTitle").html("");
				$("#fullDataBoardTitle").find(".dataBoardTitle").html("");
//				$("#fullDataBoardTitle").find("#dataBoardOrigin").html("");
				$("#fullDataBoardTitle").find(".dataBoardOrigin").html("");
//				$("#fullDataBoardTitle").find("#dataBoardArea").html("");
				$("#fullDataBoardTitle").find(".dataBoardArea").html("");
//				$("#fullDataBoardTitle").find("#dataBoardStats").html("");
				$("#fullDataBoardTitle").find(".dataBoardStats").html("");
				
				$("#fullTableTimeSeries").html("");		//조회년도
				$("#fullTargetChart").empty();				//막대 차트
				$("#fullPieChart").empty();					//상위지역대비 차트
				$(".fullPieLegend").html("");				//상위지역대비 차트 범례
				$("#fullBarChartTable").html("");			//표 테이블
				
				//시계열 초기화
				this.resetTimeSeries();
				
				var options = {
						res : {},
						options : {},
						dataBoard : {
							yearArray : [],				//선택 가능 시계열 년도
							selectedYearArray : [],		//선택한 시계열 년도
							timeSeriesPushData : [],					//시계열 애니메이션의 정보를 담는 변수
							selectSeriesYear : "",						//선택한 시계열 년도 1개
							isTimeSeriesPlay : false,					//시계열 애니메이션에서 사용될 정보를 모두 가져왔는지 확인
							timeSeriesCnt : 0,							//시계열 도는 횟수
							timer : 0										//타이머
						}
				}
				this.mapData[map_id] = options;
			},
			
			/**
			 * @name         : reqAdmList
			 * @description  : 행정동정보 가져오기
			 * @date         : 2017. 03. 30.
			 * @author	     : 권차욱
			 * @param	     : res, options  
			 * @history 	 :
			 */
			reqAdmList : function(res, options) {
				if (res.result != undefined && res.result.length > 0) {
					if (res.result[0].adm_cd.length > 7) {
						if (this.map.curPolygonCode == 3) {
							if (options.params.adm_cd != null && options.params.adm_cd != undefined) {
								$.ajax({
									type: "POST",
									url : contextPath + "/ServiceAPI/map/admAddressList.json",
									data : {
										sido_cd : options.params.adm_cd.substring(0,2),
										sgg_cd : options.params.adm_cd.substring(2,5),
										base_year : bndYear
									},
									async : false,
									success: function(tmpRes) {
										if (tmpRes.errCd == "0") {
	
											var admNmaList = tmpRes.result.admList;
											for (var i=0; i<res.result.length; i++) {
												for(var k=0; k<admNmaList.length; k++) {
													if (res.result[i].adm_cd.substring(0,7) == options.params.adm_cd +  admNmaList[k].emdong_cd) {
														res.result[i]["adm_nm"] =  admNmaList[k].emdong_nm + "_" + (i+1);
														res.result[i]["_dataIdx"] = (i+1);
														break;
													}
												}
												
											}
										}
									},									 
									dataType: "json",
									error:function(e){
										for (var i=0; i<res.result.length; i++) {
											res.result[i]["adm_nm"] =  "";
										}
									}  
									
								});
							}
						}else {
							if (options.params.adm_nm != null && options.params.adm_nm != undefined) {
								var arAdmNmList = options.params.adm_nm.split(" ");
								tmpAdmNm = arAdmNmList[arAdmNmList.length-1];
								for (var i=0; i<res.result.length; i++) {
									res.result[i]["adm_nm"] = tmpAdmNm + "_" + (i+1);
									res.result[i]["_dataIdx"] = (i+1);
								}
							}
						}
						
					}
				}
				if(res.result2 != undefined && res.result2.length > 0){
					for (var i=0; i<res.result2.length; i++) {
						var arAdmNmList = "";
						if(res.result2[i].adm_nm == undefined){
							arAdmNmList = options.params.adm_nm.split(" ");
						}else{
							arAdmNmList = res.result2[i].adm_nm.split(" ");
						}
						tmpAdmNm = arAdmNmList[arAdmNmList.length-1];
						res.result2[i]["adm_nm"] = tmpAdmNm;
					}
				}
			}
	};

	$interactiveDataBoard.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				//투명도 설정 바
				$("#dataSlider").slider({
			    	range: "min",
			        min: 5,
			        max: 10,
			        value: 10,
			        slide: function( event, ui ) {  //ui.value
			        	$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value*0.1);
				    }
			    });
				$(".dataSideBox, .interactiveDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
				
				//닫기 버튼
				body.on("click",".dataSideBox .bar>a",function(){ 
					$(".dataSideBox").removeClass("full");
					$(".dataSideBox").stop().animate({"right":"-1500px"},200);
					$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
				});
				
				//4개 탭 열고 닫기
				body.on("click",".dscList dt>a",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).parents("dt").next("dd").show();
					}else{
						$(this).removeClass("on");
						$(this).parents("dt").next("dd").hide();
					} 
				});
				
				//데이터보드 열고 닫기
				body.on("click",".interactiveDataBoard",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						//일반 데이터보드
						$(".dataSideBox").stop().animate({"right":"0"},200);
						$("#normalDataBoard").show();
						$("#fullDataBoard").hide();
						$(this).addClass("on").stop().animate({"right":"426px"},200);
						
					}else{
						var full = $(".dataSideBox").hasClass("full");
						if(!full){
							//KOSIS, 공공데이터, 나의데이터일 경우 확장 데이터보드를 열지 않는다.
							if($interactiveLeftMenu.ui.curSelectedStatsType == "kosis"
										|| $interactiveLeftMenu.ui.curSelectedStatsType == "publicData"
										|| $interactiveLeftMenu.ui.curSelectedStatsType == "userData") {
								
								//데이터보드 닫기
								$(".dataSideBox").removeClass("full");
								$(".dataSideBox").stop().animate({"right":"-1500px"},200);
								$(this).removeClass("on").stop().animate({"right":"0"},200);
							} else {
								//풀 데이터보드
								$(".dataSideBox").addClass("full");
								$("#normalDataBoard").hide();
								$("#fullDataBoard").show();
								$(this).addClass("on").stop().animate({"right":"670px"},200);
							}
						}else{
							//데이터보드 닫기
							$(".dataSideBox").removeClass("full");
							$(".dataSideBox").stop().animate({"right":"-1500px"},200);
							$(this).removeClass("on").stop().animate({"right":"0"},200);
						}
					}
				});
				
				//표보기, 차트보기
				body.on("click",".typeBox>a",function(){ 
					$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
					$(this).addClass("on");
					var ck = $(this).index(".typeBox>a")+1;
					$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
					$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
					if(ck%2){
						$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
						$(this).parents(".compareBox").find(".censusChart").show();
						$(this).parents(".compareBox").find(".combineGrid").hide();
						
						//$(this).parents(".compareBox").find(".combineGrid").find("#dataGrid").hide();
						$(this).parents(".compareBox").find(".combineGrid").find(".dataGrid").hide();
						$(this).parents(".compareBox").find(".combineGrid").find(".btn_excelDownload").hide();
					}else{
						$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
						$(this).parents(".compareBox").find(".censusChart").hide();
						$(this).parents(".compareBox").find(".combineGrid").show();
						//$(this).parents(".compareBox").find(".combineGrid").find("#dataGrid").show();
						$(this).parents(".compareBox").find(".combineGrid").find(".dataGrid").show();
						$(this).parents(".compareBox").find(".combineGrid").find(".btn_excelDownload").show();
					}
			    });
				//데이터보기 엑셀 다운로드
				body.on("click",".btn_excelDownload", function(){
					
					var myForm = document.excelDownForm;
					$("#excelDownForm").html("");
					
					var titleData = [];
					$(this).parents(".compareBox").eq(0).find(".tables").eq(0).find("table th").each(function(){
						if($(this).css("display")!= "none"){
							titleData.push($(this).html());
						}
					});
					var excelDataElement = document.createElement("input");
					excelDataElement.type = "hidden";
					excelDataElement.name = "excelData";
					excelDataElement.value = titleData;
					myForm.appendChild(excelDataElement)
					
					$(this).parents(".compareBox").eq(0).find(".tables").eq(0).find("div").find("table tr").each(function(){
						var contentData = [];
						$(this).find("td").each(function(i){
							var tmpContentData = $(this).html();
							if (i!=0) {
								tmpContentData = parseFloat(tmpContentData.replace(/,/gi, ""));
							}
							contentData.push(tmpContentData)
						});
						var excelDataElement = document.createElement("input");
						excelDataElement.type = "hidden";
						excelDataElement.name = "excelData";
						excelDataElement.value = contentData;
						myForm.appendChild(excelDataElement)
					});

					 var url = "/view/map/interactiveExcelDown";
					 window.open("" , "_self", "enabled"); 
					 myForm.action = url; 
					 myForm.method="post";
					 myForm.target="_self";
					 myForm.submit();
					
				});
				
				//시계열 세팅 버튼
				body.on("click",".btn_clockTypeSetting",function(){ 
					$(this).addClass("on");
					$(".yearList li").show();
					$(".yearList input").css("position","static");
					$(".btn_clockTypeOk").show();
					$(".btn_clockTypeLegend").show();
					
					//시계열이 on일때, 라디오버튼 보이기
					if ($(".btn_clockTypeLegend").text() == "on") {
						$(".year_input").hide();
						$(".year_radio").show();
						if ($interactiveDataBoard.ui.fixedLegendYear != null) {
							$(".year_radio").each(function() {
								if ($(this).val() == $interactiveDataBoard.ui.fixedLegendYear) {
									$(this).prop("checked");
								}
							});
						}
					}else {
						$(".year_input").show();
						$(".year_radio").hide();
					}
					
			    });
				
				//시계열 확인
				body.on("click",".btn_clockTypeOk",function(){
					var dataBoard = $interactiveDataBoard.ui.mapData[$interactiveDataBoard.ui.map_id].dataBoard;
					$(".btn_clockTypeSetting").removeClass("on");
					dataBoard.selectedYearArray = [];	//기존 시계열 초기화
					$(".yearList li").each(function(i){
						var ck = $(this).find("input").prop("checked");

						if(!ck){
							$(this).hide();
						} else {
							//체크박스 체크된 년도 저장
							dataBoard.selectedYearArray.push($(this).find("input").val());
							
							console.log("[interactiveDataBoard.js] $(this).find(\"input\").val() [" + $(this).find("input").val());
						}
					});
					$(".yearList input").css("position","absolute");
					$(".btn_clockTypeOk").hide();
					$(".btn_clockTypeLegend").hide();
			    });
				
				//시계열 플레이/스탑 버튼
				body.on("click", ".btn_clockTypePlay", function() {
					
					//mng_s
					if ( sop.isInnerMapShow2 || sop.isInnerMapShow3 ) { //그리드이면
						
						//5초 간격으로 플레이 해봤으나 그리드 부하때문에 브라우져에서 정상적으로 
						//동작을 못하므로 플레이 버튼은 계속 하이드 해두는게 좋을듯하다.
						
						if($(this).text() == "play") {
							that = $interactiveMap.ui;
							$(this).text("stop");
							$(this).css("background-image", "url(/img/ico/ico_dbStop.png)");
							//시계열 플레이시작.
							//dataBoard.isTimeSeriesPlay = true;
							
							
							$("#div_y2000").click();
							
							setTimeout(function() {
								$("#div_y2005").click();
							}, 15000);
							
							setTimeout(function() {
								$("#div_y2010").click();
							}, 30000);
							setTimeout(function() {
								$("#div_y2015").click();
							}, 45000);
							setTimeout(function() {
								$("#div_y2016").click();
							}, 60000);
							
							
							setInterval( function() {
								$("#div_y2000").click();
								
								setTimeout(function() {
									$("#div_y2005").click();
								}, 15000);
								
								setTimeout(function() {
									$("#div_y2010").click();
								}, 30000);
								setTimeout(function() {
									$("#div_y2015").click();
								}, 45000);
								setTimeout(function() {
									$("#div_y2016").click();
								}, 60000);
							}, 75000);
							
							
						} else {
							$(this).text("play");
							$(this).css("background-image", "url(/img/ico/ico_dbPlay.png)");
							$("#div_y2016").click();
						}
						
						
					} else {
						var dataBoard = $interactiveDataBoard.ui.mapData[$interactiveDataBoard.ui.map_id].dataBoard;
						$(".btn_clockTypeOk").click();
						
						if($(this).text() == "play") {
							that = $interactiveMap.ui;
							$(this).text("stop");
							$(this).css("background-image", "url(/img/ico/ico_dbStop.png)");
							//시계열 플레이시작.
							dataBoard.isTimeSeriesPlay = true;
							//9월 서비스
							$interactiveDataBoard.ui.map.isDrop = true;
							$interactiveDataBoard.ui.map.undoDropLayerBounds();
							$interactiveDataBoard.ui.map.setFixedBoundLevel(true);
							$interactiveDataBoard.ui.doReqTimeSeries();
							
						} else {
							$(this).text("play");
							$(this).css("background-image", "url(/img/ico/ico_dbPlay.png)");
							//시계열 플레이종료.
							dataBoard.isTimeSeriesPlay = false;
							dataBoard.timeSeriesPushData = new Array();	//초기화
							dataBoard.timeSeriesCnt = 0; //9월 서비스
							clearInterval(dataBoard.timer);
							$interactiveDataBoard.ui.map.setFixedBoundLevel(false); //9월 서비스
						}
					}
					
					
				});
				
				//시계얄-범례고정 on/off
				body.on("click", ".btn_clockTypeLegend", function() {
					if($(this).text() == "off") {
						$(this).text("on");
						$(this).css("background-image", "url(/img/ico/ico_fixed_legend_on.png)");
						$(".year_input").hide();
						$(".year_radio").show();
						
						$(".year_radio").each(function() {
							var radio = $(this).is(":checked");
							if (radio) {
								$interactiveDataBoard.ui.fixedLegendYear = $(this).val(); 
							}
						})
						$interactiveDataBoard.ui.isFixedLegend = true;
						
					}else {
						$(this).text("off");
						$(this).css("background-image", "url(/img/ico/ico_fixed_legend_off.png)");
						$(".year_input").show();
						$(".year_radio").hide();
						$interactiveDataBoard.ui.isFixedLegend = false;
					}
				});
				
				//시계열-범례고정 버튼 선택
				body.on("click", ".year_radio", function() {
					$interactiveDataBoard.ui.fixedLegendYear = $(this).val(); 
				});
				
				
				//시계열 년도 div 클릭
				body.on("click", "#tableTimeSeries div", function() {
					var ck = $(this).prev().prop("checked");
					//시계열 설정창이 열려 있을 때
					if($(".btn_clockTypeSetting").hasClass("on")) {
						if(!ck) {	//체크박스만 체크해줌
							$(this).prev().prop("checked", true);
						} else {
							$(this).prev().prop("checked", false);
						}
						
					} else {	//시계열 설정창이 닫혀 있을 때
						$("#tableTimeSeries li").removeClass("on");
						var ck2 = $(this).parent().hasClass("on");
						if(!ck2) {
							$(this).parent().addClass("on");
						} else {
							$(this).parent().removeClass("on");
						}
					}
				});
			
				$("#wrapperChartScroll").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
				$("#wrapperFullChartScroll").mCustomScrollbar({axis:"x",advanced: { autoExpandHorizontalScroll: true }});
			},
			
			/**
			 * 
			 * @name         : dataBoardOpen
			 * @description  : 데이터보드를 오픈한다. 
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			dataBoardOpen : function() {
				//데이터 보드가 닫혀있을 경우 오픈한다.
				if(!$(".interactiveDataBoard").hasClass("on")) {
					$(".interactiveDataBoard").click();
					$("#dataBoard").show();
				}
			}
	};
	
	$interactiveDataBoard.Util = {
			/**
			 * 
			 * @name         : tableDataSort
			 * @description  : Data를 순서대로 정렬하고, 비율 삽입
			 * @date         : 2015. 10. 29. 
			 * @author	     : 김성현
			 * @param		: data
			 */	
			tableDataSort : function(data) {
				var totalSum = 0;
				
				function compareNumbers( a, b ){
					if( a._dataIdx && b._dataIdx ){
						return Number(a._dataIdx) - Number(b._dataIdx); 
					} else {
						var x = Number(a.value);
						var y = Number(b.value);
						if (x > y) return -1;
						if (x < y) return 1;
						return 0;
					}
//					return b.value - a.value;
				}
				
		 		data.sort(compareNumbers);
		 		
		 		totalSum = this.tableDataSum(data);
		 		for(var i = 0; i < data.length; i ++) {	//비율 구하기
		 			//mng_s 20180109 주용민
		 			if(data[i].value == 0 || isNaN(data[i].value) ) {
		 			//mng_e
		 				data[i].value = "N/A";
		 				data[i].rate = "-";
		 			} else {
		 				data[i].rate = (data[i].value / totalSum * 100).toFixed(1);
		 			}
		 		}
		 		return data;
			},
			
			/**
			 * 
			 * @name         : tableDataSum
			 * @description  : Data 총 합계 구하기
			 * @date         : 2015. 10. 29. 
			 * @author	     : 김성현
			 * @param		: data
			 */	
			tableDataSum : function(data) {
				var totalSum = 0;
				for(var i = 0; i < data.length; i ++) {
				//mng_s 20180109 주용민
					if(!(isNaN(data[i].value))){
						totalSum += Number(data[i].value);
					}
			 	}
			 	//mng_e
				return totalSum;
			}
	};
	
	/*********** 원형차트 레벨별 표출 Start **********/
	(function() {
	    $class("sop.portal.pieChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	
	        	var result = res.result;
	        	var that = options.target;
	        	var filter = options.params.filter;
	        	
	            if(res.errCd == "0") {
	            	var pplObj = new Array();
	            	var pieCount = "";
	            	var top = eval(result[0].top);
		        	var middle = eval(result[0].middle);
		        	var bottom = eval(result[0].bottom);
		        	var top_nm, middle_nm, bottom_nm;
		        	var topViewFlag = true;
		        	var middleViewFlag = true;
		        	var titleText = "";
		        	
		        	top_nm = result[0].top_nm;
		        	if (result[0].top_nm == undefined) {
		        		middle_nm = result[0].middle_nm;
		        		if (middle_nm == undefined) {
		        			bottom_nm = result[0].bottom_nm;
		        		}else {
		        			bottom_nm = result[0].bottom_nm + "/" + result[0].middle_nm;
		        		}
		        	}else {
		        		middle_nm = result[0].middle_nm + "/" + result[0].top_nm;
		        		bottom_nm = result[0].bottom_nm + "/" + result[0].middle_nm + "/" + result[0].top_nm;
		        	}
		        	
		        	if(res.id == "4001") {	//인구통계총괄
						if (filter == "tot_ppltn") {
							pplObj = result[0].tot_ppltn;
							titleText = "총인구";
						} else if (filter == "tot_ppltn_male") {
							pplObj = result[0].tot_ppltn_male;
							titleText = "총인구-남자";
						} else if (filter == "tot_ppltn_fem") {
							pplObj = result[0].tot_ppltn_fem;
							titleText = "총인구-여자";
						} else if (filter == "avg_age") {
							pplObj = result[0].avg_age;
							titleText = "평균나이";
						} else if (filter == "avg_age_male") {
							pplObj = result[0].avg_age_male;
							titleText = "평균나이-남자";
						} else if (filter == "avg_age_fem") {
							pplObj = result[0].avg_age_fem;
							titleText = "평균나이-여자";
						} else if (filter == "ppltn_dnsty") {
							pplObj = result[0].ppltn_dnsty;
							titleText = "인구밀도";
						} else if (filter == "aged_child_idx") {
							pplObj = result[0].aged_child_idx;
							titleText = "노령화지수";
						} else if (filter == "oldage_suprt_per") {
							pplObj = result[0].oldage_suprt_per;
							titleText = "노년부양비";
						} else if (filter == "juv_suprt_per") {
							pplObj = result[0].juv_suprt_per;
							titleText = "유년부양비";
						} else if (filter == "tot_suprt_per") {
							pplObj = result[0].tot_suprt_per;
							titleText = "총부양비";
						} else if (filter == "household_cnt") {
							pplObj = result[0].household_cnt;
							titleText = "가구수";
						} else if (filter == "house_cnt") {
							pplObj = result[0].house_cnt;
							titleText = "주택수";
						} else if (filter == "farm_cnt") {
							pplObj = result[0].farm_cnt;
							titleText = "농가수";
						} else if (filter == "forestry_cnt") {
							pplObj = result[0].forestry_cnt;
							titleText = "임가수";
						} else if (filter == "fishery_cnt") {
							pplObj = result[0].fishery_cnt;
							titleText = "어가수";
						} else if (filter == "tot_family") {
							pplObj = result[0].tot_family;
							titleText = "총가구";
						} else if (filter == "avg_fmember_cnt") {
							pplObj = result[0].avg_fmember_cnt;
							titleText = "평균가구원수";
						} else if (filter == "tot_house") {
							pplObj = result[0].tot_house;
							titleText = "총주택";
						} else if (filter == "nongga_cnt") {
							pplObj = result[0].nongga_cnt;
							titleText = "농가(가구)";
						} else if (filter == "imga_cnt") {
							pplObj = result[0].imga_cnt;
							titleText = "임가(가구)";
						} else if (filter == "imga_ppltn") {
							pplObj = result[0].imga_ppltn;
							titleText = "임가인구";
						} else if (filter == "naesuoga_cnt") {
							pplObj = result[0].naesuoga_cnt;
							titleText = "내수면총어가";
						} else if (filter == "naesuoga_ppltn") {
							pplObj = result[0].naesuoga_ppltn;
							titleText = "해수면어가인구";
						} else if (filter == "haesuoga_cnt") {
							pplObj = result[0].haesuoga_cnt;
							titleText = "해수면총어가";
						} else if (filter == "haesuoga_ppltn") {
							pplObj = result[0].haesuoga_ppltn;
							titleText = "해수면어가인구";
						} else if (filter == "employee_cnt") {
							pplObj = result[0].employee_cnt;
							titleText = "종사자수";
						} else if (filter == "nongga_ppltn") {
							pplObj = result[0].nongga_ppltn;
							titleText = "농가인구";
						}
						
						pieCount = pplObj.base_cnt;
						top = eval(pplObj.top);
						middle = eval(pplObj.middle);
						bottom = eval(pplObj.bottom);
						top_nm = (pplObj.top_nm);
						middle_nm = (pplObj.middle_nm);
						bottom_nm = (pplObj.bottom_nm);
						
					} else if(res.id == "4002") {	//인구통계세부조건검색
						pieCount = result[0].population;
						titleText = "인구";
					} else if(res.id == "4004") {	//사업체분류검색
						if (filter == "tot_worker" || filter == "employee_cnt") {
							pieCount = result[0].worker.base_cnt;
							top = eval(result[0].worker.top);
				        	middle = eval(result[0].worker.middle);
				        	bottom = eval(result[0].worker.bottom);
				        	top_nm = result[0].worker.top_nm;
				        	middle_nm = result[0].worker.middle_nm;
				        	bottom_nm = result[0].worker.bottom_nm;
							titleText = "종사자수";
						} else if (filter == "corp_cnt") {
							pieCount = result[0].corp.base_cnt;
							top = eval(result[0].corp.top);
				        	middle = eval(result[0].corp.middle);
				        	bottom = eval(result[0].corp.bottom);
				        	top_nm = result[0].corp.top_nm;
				        	middle_nm = result[0].corp.middle_nm;
				        	bottom_nm = result[0].corp.bottom_nm;
							titleText = "사업체수";
						}
					} else if(res.id == "4005") {	//가구통계검색
						pieCount = result[0].household_cnt;
						titleText = "가구수";
					} else if(res.id == "4006") {	//주택통계검색
						pieCount = result[0].house_cnt;
						titleText = "주택수";
					} else if(res.id == "4007") {	//농가통계검색
						pieCount = result[0].farm_cnt;
						titleText = "가구원 수";
					} else if(res.id == "4008") {	//임가통계검색
						pieCount = result[0].population;
						titleText = "가구원 수";
					} else if(res.id == "4009") {	//어가통계검색
						pieCount = result[0].fishery_cnt;
						titleText = "가구원 수";
					} else if(res.id == "4010") {	//가구원통계검색
						pieCount = result[0].population;
						titleText = "가구원 수";
					}
					
		        	$("#pieChartDiv1").html("");
		        	$("#pieChartDiv2").html("");
		        	$("#pieChartDiv3").html("");
		        	
		        	//5 미만 N/A처리
		        	if(pieCount > 4) {
		        		pieCount = appendCommaToNumber(pieCount);	
		        	} else {
		        		pieCount = "N/A";
		        	}
		        	
		        	//통계
//		        	$("#dataBoardStats").html("통계 : " + pieCount);		
//		        	$("#fullDataBoardTitle").find("#dataBoardStats").html("통계 : " + pieCount);
		        	
		        	if(top == undefined) {
		        		top = 0;
		        		topViewFlag = false;
		        	}
		        	if(middle == undefined) {
		        		middle = 0;
		        		middleViewFlag = false;
		        	}
		        	if(bottom == undefined) {
		        		bottom = 0;
		        	}
		        	
		        	//범례
		        	var html = "<table style='margin:0 auto;'>";
		        	if (topViewFlag) {
		        		html +=		"<tr>";
			        	html +=			"<td style='width:25px;'><div class='pielegendBox1'></div></td>"
			        	html +=			"<td style='text-align:left;'>"+top_nm+"</td>";
			        	html +=			"<td tyle='width:20px;'>:</td>";
			        	html +=			"<td style='text-align:left;'>"+top+"%</td>";
			        	html +=		"</tr>";
		        	}
		        	
		        	if (middleViewFlag) {
		        		html +=		"<tr>";
			        	html +=			"<td style='width:25px;'><div class='pielegendBox2'></div></td>"
			        	html +=			"<td style='text-align:left;'>"+middle_nm+"</td>";
			        	html +=			"<td style='width:20px;'>:</td>";
			        	html +=			"<td style='text-align:left;'>"+middle+"%</td>";
			        	html +=		"</tr>";
		        	}
		        	
		        	if (bottom_nm == undefined) {
		        		bottom_nm = "검색결과";
		        	}
		        	
		        	html +=		"<tr>";
		        	html +=			"<td style='width:25px;'><div class='pielegendBox3'></div></td>"
		        	html +=			"<td style='text-align:left;'>"+bottom_nm+"</td>";
		        	html +=			"<td style='width:20px;'>:</td>";
		        	html +=			"<td style='text-align:left;'>"+bottom+"%</td>";
		        	html +=		"</tr>";
		        	html += "</table>";
		        	$(".pieLegend").html(html);
		        	
		        	//Full 범례
		        	$(".fullPieLegend").html(html);
		        	
		        	if($d.browser.ie8) {	//익스플로러 8일 경우 막대차트로
					    $("#pieChartDiv1").highcharts({
					        chart: {
					            type: 'column', backgroundColor: 'white', height: 180, width: 200, margin: [0, 0, 0, 0]
					        },
					        tooltip: { enabled: false },
					        title: {
					            text: ''
					        },
					        xAxis: {
					            categories: ['차상위', '상위', '지역'],
					        },
					        yAxis: {
					            min: 0,
					            title: {
					                text: ''
					            }
					        },
					        plotOptions: {
					            column: {
					                stacking: 'percent'
					            },
					            series: {
					                states: {
					                    hover: {
					                        brightness: 0
					                    }
					                }
					            }
					        },
					        legend: {
					        	enabled: false
					        },
					        
					        series: [{
					            name: '',
					            color: '#d0d0d0',
					            data : [100-top, 100-middle, 100-bottom]
					        }, {
					            name: '차상위',
					            color: '#E91E63',
					            data: [top, 0, 0]
					        }, {
					            name: '상위',
					            color: '#03A9F4',
					            data: [0, middle, 0]
					        }, {
					            name: '지역',
					            color: '#8BC34A',
					            data: [0, 0, bottom]
					        }]
					    });
					    
					} else {
						if(topViewFlag) {
							//원형차트1
			    			$("#pieChartDiv1").highcharts({
			    				chart: { backgroundColor:"transparent", borderWidth:0, margin: [0, 0, 0, 0], height: 200, width: 200 },
			    				colors: ['#E91E63', '#eeeeee'],
			    				navigation: { buttonOptions: { enabled: false } },
			    				tooltip: { enabled: false },
			    		        title: { text: '' },
			    		        plotOptions: {
			    		            pie: {
			    		                dataLabels: {
			    		                    enabled: true, distance: -50, style: { fontWeight: 'bold', color: 'white', textShadow: '0px 1px 2px black' }
			    		                },
			    		                states : {
			    		                	hover : {
			    		                		brightness : 0
			    		                	}
			    		                },
			    		                startAngle: 0, endAngle: 360, center: ['50%', '50%'],
			    						borderWidth: 0
			    		            }
			    		        }, 
			    		        series: [{
			    		            type: 'pie',
			    		            name: '차상위',
			    		            innerSize: '91%',
			    		            data: [
			    		                ['비율',  top ],
			    		                ['전체',  100 - top]
			    		            ],
			    					dataLabels: {
			    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
			    					}
			    		        }]
			    		    });
						}
		    			
						if(middleViewFlag) {
							//원형차트2
			    			$('#pieChartDiv2').highcharts({
			    				chart: { backgroundColor:"transparent", borderWidth:0, margin: [0, 0, 0, 0], height: 160, width: 160 },
			    				colors: ['#03A9F4', '#eeeeee'],
			    				tooltip: { enabled: false },
			    				navigation: { buttonOptions: { enabled: false } }, 
			    		        title: {
			    		            text: ''
			    		        },
			    		        plotOptions: {
			    		            pie: {
			    		                dataLabels: {
			    		                    enabled: true,
			    		                    distance: -50,
			    		                    style: {
			    		                        fontWeight: 'bold',
			    		                        color: 'white',
			    		                        textShadow: '0px 1px 2px black'
			    		                    }
			    		                },
			    		                states : {
			    		                	hover : {
			    		                		brightness : 0
			    		                	}
			    		                },
			    		                startAngle: 0,
			    		                endAngle: 360,
			    		                center: ['50%', '50%'], borderWidth: 0
			    		            }
			    		        }, 
			    		        series: [{
			    			        type: 'pie',
			    		            name: '상위',
			    		            innerSize: '91%',
			    		            data: [
			    		                ['비율',  middle],
			    		                ['전체',  100 - middle]
			    		            ],
			    					dataLabels: {
			    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
			    					}
			    		        }]
			    		    });
						}
		    			
		    			//원형차트3
		    			$('#pieChartDiv3').highcharts({
		    				chart: { backgroundColor:"transparent", borderWidth:0, margin: [0, 0, 0, 0], height: 120, width: 120},
		    				colors: ['#8BC34A', '#eeeeee'],
		    				tooltip: { enabled: false },
		    				navigation: { buttonOptions: { enabled: false } }, 
		    		        title: {
		    		            text: ''
		    		        },
		    		        plotOptions: {
		    		            pie: {
		    		                dataLabels: {
		    		                    enabled: true,
		    		                    distance: -70,
		    		                    style: {
		    		                        fontWeight: 'bold',
		    		                        color: 'white',
		    		                        textShadow: '0px 1px 2px black'
		    		                    }
		    		                },
		    		                states : {
		    		                	hover : {
		    		                		brightness : 0
		    		                	}
		    		                },
		    		                startAngle: 0,
		    		                endAngle: 360,
		    		                center: ['50%', '50%'], borderWidth: 0
		    		            }
		    		        }, 
		    		        series: [{
		    		        	type: 'pie',
		    		            name: '해당지역',
		    		            innerSize: '91%',
		    		            data: [
		    		                ['비율',  bottom],
		    		                ['전체',  100 - bottom]
		    		            ],
		    					dataLabels: {
		    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
		    					}
		    		        }]
		    		    });  
					}
		        	
		        	//표 테이블
		        	var html = "";
		        	if(topViewFlag) {
		        		html += "<tr>";
			        	html += "	<td class='al'>"+top_nm+"</td>";
			        	html += "	<td>"+top+"%</td>";
			        	html += "</tr>";
		        	}
		        	if(middleViewFlag) {
		        		html += "<tr>";
			        	html += "	<td class='al'>"+middle_nm+"</td>";
			        	html += "	<td>"+middle+"%</td>";
			        	html += "</tr>";
		        	}
		        	html += "<tr>";
		        	html += "	<td class='al'>"+bottom_nm+"</td>";
		        	html += "	<td>"+bottom+"%</td>";
		        	html += "</tr>";
		        	$("#pieChartTable").html(html);

		        	var tmpData = [];
		        	var tmpCategories = null;
		        	if (top != 0) {
		        		tmpCategories = [top_nm, middle_nm, bottom_nm];
		        		tmpData.push({name: top_nm, color : "#E91E63", y:top});
		        		tmpData.push({name: middle_nm, color : "#03A9F4", y:middle});
		        		tmpData.push({name: bottom_nm, color : "#8BC34A", y:bottom});
		        	}else {
		        		tmpCategories = [middle_nm, bottom_nm];
		        		tmpData.push({name: middle_nm, color : "#03A9F4", y:middle});
		        		tmpData.push({name: bottom_nm, color : "#8BC34A", y:bottom});
		        	}
		        	
		        	//상위 지역 비교 데이터 보기 (Full)
		        	$("#fullPieChart").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', height: 230, width: 385
				        },
				        exporting: { enabled: false },
				        tooltip: { enabled: false },
				        title: {
				            text: ''
				        },
				        xAxis: {
				            categories: tmpCategories,
				        },
				        yAxis: {
				            min: 0,
				            max : 100,
				            title: {
				                text: ''
				            }
				        },
				        plotOptions: {
				            series: {
				                states: {
				                    hover: {
				                        brightness: 0
				                    }
				                }
				            }
				        },
				        legend: {
				        	enabled: false
				        },
				        series:[{
				        	data : tmpData
				        }] 
				    });
	            	
	            } else {
	                messageAlert.open("알림", res.errMsg);
//	                $("#pieChart_"+that.id).hide();
	            }
	        },
	        onFail : function(status, options) {
	        	var that = options.target;
//	        	$("#pieChart_"+that.id).hide();
	        }
	    });
	}());
	/*********** 원형차트 레벨별 표출 End **********/
	
}(window, document));