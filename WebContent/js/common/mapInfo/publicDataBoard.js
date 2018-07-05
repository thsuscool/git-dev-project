/**
 * 공공데이터 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/18  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$publicDataBoard = W.$publicDataBoard || {};
	
	$(document).ready(function() {
		$publicDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$publicDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅
	});
	
	$publicDataBoard.ui = {
			delegate : null,			//interactiveMap, bizStatsMap
			mapData : [],				//지도별 데이터
			map : null,				//지도 (sMap.map)
			map_id : "0",				//지도 ID (0, 1, 2)
			chartDataList : [],
			isShow : true,
			selectedCctvObj : null, //2017.06.26 [개발팀] kcu 공공데이터추가 - 선택된 cctv 객체
			isInit : true, 
			
			
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
							"options" : {
								map : null,
								viewIndex : 0,				//현재 보고 있는 Index (페이징)
								markerGroup : [],			//POI 그룹
								result : [],					//POI 상세결과 리스트
								circle : null,				//임의영역 반경 서클
								circleGeojson : null,	//임의영역 반경 경계
								radius : 100,				//서클 크기
								mapBounds : null		//지도 바운더리
							},
							"type" : ""
					}
					this.mapData.push(tempObj);					
				}
			},
			
			/**
			 * @name         : leftMenuList
			 * @description  :	공공데이터 목록
			 * @date         : 2015. 12. 09. 
			 * @author	     : 김성현
			 * @param		: delegate
			 * @history 	 :
			 */
			leftMenuList : function(delegate) {
				var sopPortalPublicDataListObj = new sop.portal.publicDataList.api();
				sopPortalPublicDataListObj.addParam("type", delegate.namespace);
				sopPortalPublicDataListObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/publicData/publicDataList.json"
				});
			},
			
			/**
			 * @name         : delegateSetting
			 * @description  :	공공데이터 세팅 (interactive, bizstats)
			 * @date         : 2016. 01. 11. 
			 * @author	     : 김성현
			 * @param		: delegate
			 * @history 	 :
			 */
			delegateSetting : function(delegate) {
				//메모리에 저장
				this.delegate = delegate;
				this.map_id = delegate.curMapId;
				this.map = delegate.mapList[this.map_id];
			},
			
			/**
			 * 
			 * @name         : reDraw
			 * @description  : 데이터보드 다시 그리기
			 * @date         : 2016. 01. 11. 
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reDraw : function(map_id) {
				//기존 조회된 데이터가 있을경우
				if(!$.isEmptyObject(this.mapData[map_id].options)) {
					this.updatePublicData(this.mapData[map_id].type);
				}
			},
			
			/**
			 * @name         : updatePublicData
			 * @description  :	공공데이터 조회
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @param	: delegate, type 공공데이터 타입
			 * @history 	 :
			 */
			updatePublicData : function(type) {
				//초기화
				this.reset(this.map_id);
				
				this.mapData[this.map_id].options.map = this.map;
				this.mapData[this.map_id].type = type;
				
				//데이터타입 설정
				this.delegate.setDataType(this.map.id, "publicData");
				
				//보고서 차트정보 초기화
				this.chartDataList[this.map_id] = null;
				
				//데이터보드 열기
				var sceneInx = $(".sceneBox.on").length;
				if(sceneInx == 1) {
					if(this.delegate.namespace == "interactiveMap") {
						$interactiveDataBoard.event.dataBoardOpen();	
					} else if(this.delegate.namespace == "bizStatsMap") {
						$bizStatsDataBoard.event.dataBoardOpen();		
					}
				}
				
				//2017.06.26 [개발팀] kcu 공공데이터 추가 - 대전-세종간 통행정보
				if (type == "cctv") {
					//데이터보드 전체 숨기고 공공데이터보드만 열기
					$(".dataBoardDiv").hide();
					$(".publicDataDT").hide();
					$(".publicDataDD").hide();
					$("#publicDataDiv").show();

					this.map.mapMove([982858, 1837517], 6);
					this.map.markers.clearLayers();
					setTimeout(function() {
						$publicDataBoard.ui.updateCctv();
						//mng_s 20171011 apilog 추가 leekh
						apiLogWrite2('A0', 'A30', "세종권역 교통흐름 정보", "없음", "6", "없음");
						//mng_e 20171011 apilog 추가 leekh
					}, 500);
							
				}else {
					//줌레벨이 10이 아닐경우 10으로 변경
					if(this.map.zoom != 10) {
						this.map.setZoom(10);	
					} else {	//줌레벨이 10이면 현재 상태에서 조회
						this.map.markers.clearLayers();
						$publicDataBoard.ui.reqPoi();	
					}
				}
			},
			
			/**
			 * @name         : reqPoi
			 * @description  :	공공데이터 API 요청
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			reqPoi : function() {
				//데이터보드 전체 숨기고 공공데이터보드만 열기
				$(".dataBoardDiv").hide();
				$(".publicDataDT").hide();
				$(".publicDataDD").hide();
				$("#publicDataDiv").show();
				
				//2017.06.26 [개발팀] kcu 공공데이터 추가 - 대전-세종간 통행정보
				var type = this.mapData[this.map_id].type;
				switch(type) {
					case "population" :	//유동인구 정보
						this.updatePopulation();
						break;
					case "school" :		//학교인구 정보
						this.updateSchool();
						break;
					case "metro" :		//지하철 승하차 정보
						this.updateMetro();
						break;
					case "busStop" :	//버스 정류장 정보
						this.updateBusStop();
						break;
					default :
						break;
				}
			},
	
			/**
			 * @name         : updatePopulation
			 * @description  :	유동인구 조회
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updatePopulation : function() {
				$("#publicPoiInfo").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicPoiInfo").next().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicPopulationDiv").show();
				$("#publicPopulationDiv").prev().show();
				$("#userAreaDiv").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가	
				$("#userAreaDiv").prev().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				//유동인구 요청 API
				this.requestFloatPplninfo();
			},
			
			/**
			 * @name         : updateSchool
			 * @description  :	학교 조회
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updateSchool : function() {
				$("#publicPoiInfo").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicPoiInfo").next().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicSchoolDiv").show();
				$("#publicSchoolDiv").prev().show();
				$("#userAreaDiv").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#userAreaDiv").prev().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				//학교정보 요청 API
				this.requestSchoolPplninfo();
			},
			
			/**
			 * @name         : updateMetro
			 * @description  :	지하철 승하차 조회
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updateMetro : function() {
				$("#publicPoiInfo").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicPoiInfo").next().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicMetroDiv").show();
				$("#publicMetroDiv").prev().show();
				$("#userAreaDiv").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#userAreaDiv").prev().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				//학교정보 요청 API
				this.requestMetroPplninfo();
			},
			
			/**
			 * @name         : updateBusStop
			 * @description  :	버스정류장 조회
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updateBusStop : function() {
				$("#publicPoiInfo").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicPoiInfo").next().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#publicBusStopDiv").show();
				$("#publicBusStopDiv").prev().show();
				$("#userAreaDiv").show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				$("#userAreaDiv").prev().show(); //2017.06.26 [개발팀] kcu 공공데이터 추가
				//버스정류장 정보 요청 API
				this.requestBusStopinfo();
			},
			
			//2017.06.26 [개발팀] kcu 공공데이터 추가 - 대전-세종간 통행흐름 정보
			/**
			 * @name         : updateCctv
			 * @description  : 대전-세종간 통행흐름 정보
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			updateCctv : function() {
				$("#publicPoiInfo").hide(); //2017.06.26 공공데이터 추가
				$("#publicPoiInfo").next().hide(); //2017.06.26 공공데이터 추가
				$("#publicCctvPoiDiv").show();
				$("#publicCctvPoiDiv").prev().show();
				$("#weekendGraphDiv").show();
				$("#timeseriesGraphDiv").show();				

				//대전-세종간 통행흐름정보 API
				this.requestSejongCctvinfo();
				this.requestSejongBusStopinfo();
				this.requestSejongBaseYearInfo();
			},
			
			/**
			 * @name         : listDataClick
			 * @description  :	검색 리스트에서 선택 시
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @param 		: idx 인덱스
			 * @history 	 :
			 */
			listDataClick : function(idx) {
				var mapData = this.mapData[this.map_id];
				
				//POI 클릭 이벤트
				mapData.options.markerGroup[idx].marker.fire("click");
				
				//POI 위치로 이동 
				var centerX = mapData.options.markerGroup[idx].marker.info.x;
				var centerY = mapData.options.markerGroup[idx].marker.info.y;
				this.map.mapMove([centerX, centerY], this.map.zoom);
			},
			
			/**
			 * @name         : circleInfo
			 * @description  :	서클 그리기
			 * @date         : 2015. 11. 20. 
			 * @author	     : 김성현
			 * @param 		: result 선택 마커정보
			 * @history 	 :
			 */
			circleInfo : function (result) {
				var mapData = this.mapData[this.map_id];
				//기존 서클 삭제
				mapData.options.map.removeMarker(mapData.options.circle);
				
				var centerX = result.target.info.x;
				var centerY = result.target.info.y;
				//원형 반경 그리기
				var circle = sop.circle(sop.utmk(centerX, centerY), mapData.options.radius, {
					color : "white",
					fillColor : "#EAEAEA",
					fillOpacity : 0.2,
					opacity :0.2,
					weight : 0,
					renderer: sop.svg()
				});
				circle.addTo(mapData.options.map.gMap);
				mapData.options.circle = circle;		//현재 서클 메모리에 저장
				
				//임의영역 반경 내 집계구경계 정보 API (geojson)
				this.circleAreaTotInfo(mapData.options.map);
			},
			
			/**
			 * @name         : circleAreaTotInfo
			 * @description  :	임의영역 반경 내 집계구경계 정보 API (geojson)
			 * @date         : 2015. 11. 20. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			circleAreaTotInfo : function (map) {
				var mapData = this.mapData[this.map_id];
				var area = "CIRCLE(" + 
										mapData.options.circle._utmk.x + " " + 
										mapData.options.circle._utmk.y + "," + 
										mapData.options.circle.getRadius()+ 
		    						")";
				var sopPortalCircleAreaTotInfoDrawObj = new sop.portal.circleAreaTotInfo.api();
				sopPortalCircleAreaTotInfoDrawObj.addParam("area", area);
				sopPortalCircleAreaTotInfoDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/circleAreaTotInfo.geojson",
					options : {
						map : map
					}
				});
			},
			
			/**
			 * @name         : circleAreaFullInfo
			 * @description  :	임의영역 반경 내 주요 정보 API
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @param		: tot_list 집계구코드 목록
			 * @history 	 :
			 */
			circleAreaFullInfo : function (tot_list, map) {
				var mapData = this.mapData[this.map_id];
				var area = "CIRCLE(" + 
										mapData.options.circle._utmk.x + " " + 
										mapData.options.circle._utmk.y + "," + 
										mapData.options.circle.getRadius()+ 
		    						")";
				var sopPortalCircleAreaTotFullDrawObj = new sop.portal.circleAreaFullInfo.api();
				sopPortalCircleAreaTotFullDrawObj.addParam("area", area);
				sopPortalCircleAreaTotFullDrawObj.addParam("tot_list", tot_list);
				sopPortalCircleAreaTotFullDrawObj.addParam("bnd_year", companyDataYear/*bndYear*/); //2016.09.06 9월 서비스
				sopPortalCircleAreaTotFullDrawObj.request({
					method : "POST",
					async : true, //2017.06.26 [개발팀] kcu 공공데이터 추가
					url : contextPath + "/ServiceAPI/publicData/circleAreaFullInfo.json",
					options : {
						map : map
					}
				});
			},
			
			/**
			 * @name         : circleRadiusSliderClick
			 * @description  :	임의영역 반경 슬라이더 선택 시
			 * @date         : 2015. 11. 20. 
			 * @author	     : 김성현
			 * @param		: radius 선택된 반지름
			 * @history 	 :
			 */
			circleRadiusSliderClick : function (radius) {
				var mapData = this.mapData[this.map_id];
				//선택된 마커가 없다면 리턴
				if(mapData.options.result.length == 0) {
					return;
				} else {
					//반지름
					var paramRadius = 0;
					if(radius == 1) {
						paramRadius = 100;
					} else if(radius == 2) {
						paramRadius = 300;
					} else if(radius == 3) {
						paramRadius = 500;
					} else if(radius == 4) {
						paramRadius = 1000;
					}
					mapData.options.radius = paramRadius;	//영역 크기 메모리에 저장
					this.circleInfo(mapData.options.result);
				}
			},
			
			/**
			 * @name         : publicPopulationPrev
			 * @description  :	유동인구 차트 이전 버튼 클릭 시
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicPopulationPrev : function() {
				var mapData = this.mapData[this.map_id];
				//검색 결과가 없을 경우 리턴
				if(mapData.options.result.length == 0) {
					return;
				}
				//viewIndex가 0보다 클경우 1씩 줄여나간다.
				if(parseInt(mapData.options.viewIndex) > 0) {
					mapData.options.viewIndex = mapData.options.viewIndex - 1;	
				} else {	//0이면 리턴
					return;
				}
				
				this.floatPplnChartDraw(mapData.options.result);
			},
			
			/**
			 * @name         : publicPopulationNext
			 * @description  :	유동인구 차트 다음 버튼 클릭 시
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicPopulationNext : function() {
				var mapData = this.mapData[this.map_id];
				//검색 결과가 없을 경우 리턴
				if(mapData.options.result.length == 0) {
					return;
				}
				//viewIndex가 전체 페이지보다 작을경우 1씩 늘린다.
				var maxLength = mapData.options.result.target.info.resultList.length;
				if(parseInt(mapData.options.viewIndex) < (maxLength-1)) {
					mapData.options.viewIndex = mapData.options.viewIndex + 1;	
				} else {	//끝페이지면 리턴
					return;
				}
				
				this.floatPplnChartDraw(mapData.options.result);
			},
			
			/**
			 * @name         : publicSchoolPrevNext
			 * @description  :	학교 차트 이전, 다음 버튼 클릭 시
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicSchoolPrevNext : function() {
				var mapData = this.mapData[this.map_id];
				//검색 결과가 없을 경우 리턴
				if(mapData.options.result.length == 0) {
					return;
				}
				
				if($("#publicSchoolChartDiv01").is(":visible")) {
					$("#publicSchoolChartDiv01").hide();
					$("#publicSchoolChartDiv02").show();
					$("#publicSchoolTitle").html(mapData.options.result.target.info.sgg_nm + " 평균 학생/교직원 현황");
				} else if($("#publicSchoolChartDiv02").is(":visible")) {
					$("#publicSchoolChartDiv01").show();
					$("#publicSchoolChartDiv02").hide();
					$("#publicSchoolTitle").html(mapData.options.result.target.info.school_nm + " 학생/교직원 현황");
				}
			},
			
			/**
			 * @name         : publicMetroPrev
			 * @description  :	지하철 승하차 차트 이전 버튼 클릭 시
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicMetroPrev : function() {
				var mapData = this.mapData[this.map_id];
				if($("#publicMetroChart01").is(":visible")) {		//요일평균 승하차인원 정보
					$("#publicMetroTitle").html("요일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart03").show();
					this.metroWeekPplnChartDraw(mapData.options.result);
				} else if($("#publicMetroChart02").is(":visible")) {			//일평균 승하차인원 정보
					$("#publicMetroTitle").html("일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart01").show();
				} else if($("#publicMetroChart03").is(":visible")) {			//월평균 승하차인원 정보
					$("#publicMetroTitle").html("월평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart02").show();
					this.metroMonthPplnChartDraw(mapData.options.result);
				}
			},
						
			/**
			 * @name         : publicMetroNext
			 * @description  :	지하철 승하차 차트 다음 버튼 클릭 시
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicMetroNext : function() {
				var mapData = this.mapData[this.map_id];
				if($("#publicMetroChart01").is(":visible")) {		//월평균 승하차인원 정보
					$("#publicMetroTitle").html("월평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart02").show();
					this.metroMonthPplnChartDraw(mapData.options.result);
				} else if($("#publicMetroChart02").is(":visible")) {			//요일평균 승하차인원 정보
					$("#publicMetroTitle").html("요일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart03").show();
					this.metroWeekPplnChartDraw(mapData.options.result);
				} else if($("#publicMetroChart03").is(":visible")) {			//일평균 승하차인원 정보
					$("#publicMetroTitle").html("일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart01").show();
				}
			},
			
			/**
			 * @name         : setReportData
			 * @description  : 보고서 데이터를 저장한다.
			 * @date         : 2015. 12. 08.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setReportData : function(category, type, data, id) {
				if (this.chartDataList[id] == null) {
					this.chartDataList[id] = [];
				}
				
				this.chartDataList[id].push({
					category:category, 
					type:type, 
					data:data
				});
			},
			
			/**
			 * @name         : requestFloatPplninfo
			 * @description  :	유동인구 요청 API
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestFloatPplninfo : function () {
				this.mapData[this.map_id].type = "population";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalFloatPplnPoiDrawObj = new sop.portal.floatPplnPoi.api();
				sopPortalFloatPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalFloatPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalFloatPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalFloatPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalFloatPplnPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poietcfloatppln.json",
					options : {
						btntype: "etc",
						api_id : "10013",
						title : "유동인구",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : floatPplnChartDraw
			 * @description  :	유동인구 차트 및 내용 그리기
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			floatPplnChartDraw : function (result) {
				var info = result.target.info;
				var resultList = result.target.info.resultList;
				var maleData = new Array();
				var femaleData = new Array();
				
				var idx = this.mapData[this.map_id].options.viewIndex;
				maleData.push(parseInt(resultList[idx].male_agegp_10_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_20_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_30_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_40_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_50_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_10_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_20_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_30_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_40_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_50_cnt));
				
				var minValue = Math.min.apply(null, maleData);
				var maxValue = Math.max.apply(null, femaleData);
				
				//ex) 2010년 6월 9일 / 12~13시<br />조사인구 : 341명 / 날씨 : 말음
				var titleHtml = makeYYYYMMDDString(resultList[idx].surv_dt) + " / " + resultList[idx].surv_time + "<br />조사인구 : " + resultList[idx].fltppltn_sum + "명 / 날씨 : " + resultList[idx].wethr;
				$("#publicPopulationTitle").html(titleHtml);
				
				$("#publicPopulationChart").highcharts({
					chart : {
						type : 'column', width: 500, height: 300
					},
					exporting: { enabled: false },
					title: {
			            text: ''
			        },
			        xAxis: {
			            categories: ['10대', '20대', '30대', '40대', '50대']
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			            shared: true
			        },
			        plotOptions: {
			            column: {
			                stacking: 'percent'
			            }
			        },
			        series: [{
			            name: '여자',
			            data: femaleData
			        }, {
			            name: '남자',
			            data: maleData
			        }]
				});
			},
			
			/**
			 * @name         : requestSchoolPplninfo
			 * @description  :	학교정보 요청 API
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestSchoolPplninfo : function () {
				this.mapData[this.map_id].type = "school";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalSchoolPplnPoiDrawObj = new sop.portal.schoolPplnPoi.api();
				sopPortalSchoolPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalSchoolPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalSchoolPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalSchoolPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalSchoolPplnPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poietcschoolppln.json",
					options : {
						btntype: "etc",
						api_id : "10015",
						title : "학교인구",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : sggSchoolAvg
			 * @description  :	시군구 평균 학교정보 요청 API
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @param		: tot_reg_cd 집계구코드
			 * @param		: elsm 학교구분
			 * @history 	 :
			 */
			sggSchoolAvg : function (tot_reg_cd, elsm) {
				var sopPortalSggSchoolAvgDrawObj = new sop.portal.sggSchoolAvg.api();
				sopPortalSggSchoolAvgDrawObj.addParam("tot_reg_cd", tot_reg_cd);
				sopPortalSggSchoolAvgDrawObj.addParam("elsm", elsm);
				sopPortalSggSchoolAvgDrawObj.addParam("data_year", "2015");
				sopPortalSggSchoolAvgDrawObj.addParam("bnd_year", bndYear);
				sopPortalSggSchoolAvgDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/sggSchoolAvg.json",
					options : {
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : schoolPplnChartDraw
			 * @description  :	학교 차트 및 내용 그리기
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			schoolPplnChartDraw : function (result) {
				var stuCnt = result.target.info.stdnt_cnt;		//학생수
				var facCnt = result.target.info.tcher_cnt;		//교직원수
				var stuPer = parseInt(stuCnt / (stuCnt + facCnt) * 100);	//학생%
				var facPer = parseInt(facCnt / (stuCnt + facCnt) * 100);		//교직원%
				
				$("#schoolStdtCnt").text(appendCommaToNumber(stuCnt));			//총학생수
				$("#schoolTcherCnt").text(appendCommaToNumber(facCnt));		//총교직원수
				$("#schoolTperS").text((stuCnt/facCnt).toFixed(1));			//교직원 1명당 학생수
				
				if($("#publicSchoolChartDiv01").is(":visible")) {
					$("#publicSchoolTitle").html(result.target.info.school_nm + " 학생/교직원 현황");
				} else if($("#publicSchoolChartDiv02").is(":visible")) {
					$("#publicSchoolTitle").html(result.target.info.sgg_nm + " 평균 학생/교직원 현황");
				}
				
				$("#publicSchoolChart").highcharts({
					chart : {
						margin : [ 0, 0, 50, 0 ]	
					},
					exporting: { enabled: false },
					colors: ['#92D050', '#595959'],
					tooltip: { enabled: false },
    				navigation: { buttonOptions: { enabled: false } }, 
    		        title: {
    		            text: ''
    		        },
		            tooltip: {
		                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
    		                startAngle: 0,
    		                endAngle: 360,
    		                center: ['50%', '50%'], borderWidth: 0,
    		                showInLegend: true
    		            }
    		        },
    		        series: [{
    			        type: 'pie',
    		            name: '비율',
    		            data: [
    		                ['학생수',  stuPer],
    		                ['교직원',  facPer]
    		            ],
    					dataLabels: {
    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
    					}
    		        }]
		        });
			},
			
			/**
			 * @name         : requestMetroPplninfo
			 * @description  :	지하철 승하차 요청 API
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestMetroPplninfo : function () {
				this.mapData[this.map_id].type = "metro";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalMetroPplnPoiDrawObj = new sop.portal.metroPplnPoi.api();
				sopPortalMetroPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalMetroPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalMetroPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalMetroPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalMetroPplnPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poietcmetroppln.json",
					options : {
						btntype: "etc",
						api_id : "10014",
						title : "지하철승하차인구",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : metroDayPplnChartDraw
			 * @description  :	지하철 승하차 차트 및 내용 그리기 (일평균)
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			metroDayPplnChartDraw : function (result) {
				$(".metroChartDiv").hide();
				$("#publicMetroChart01").show();
				
				//타이틀
				$("#publicMetroTitle").html("일평균 / 승하차인원 정보");
				
				//승차
				var onResult = result.target.info.onResult;	
				var onList = new Array();
				onList.push(parseInt(onResult.hour1_psn_cnt), parseInt(onResult.hour2_psn_cnt), parseInt(onResult.hour3_psn_cnt), parseInt(onResult.hour4_psn_cnt));
				onList.push(parseInt(onResult.hour5_psn_cnt), parseInt(onResult.hour6_psn_cnt), parseInt(onResult.hour7_psn_cnt), parseInt(onResult.hour8_psn_cnt));
				onList.push(parseInt(onResult.hour9_psn_cnt), parseInt(onResult.hour10_psn_cnt), parseInt(onResult.hour11_psn_cnt), parseInt(onResult.hour12_psn_cnt));
				onList.push(parseInt(onResult.hour13_psn_cnt), parseInt(onResult.hour14_psn_cnt), parseInt(onResult.hour15_psn_cnt), parseInt(onResult.hour16_psn_cnt));
				onList.push(parseInt(onResult.hour17_psn_cnt), parseInt(onResult.hour18_psn_cnt), parseInt(onResult.hour19_psn_cnt), parseInt(onResult.hour20_psn_cnt));
				onList.push(parseInt(onResult.hour21_psn_cnt), parseInt(onResult.hour22_psn_cnt), parseInt(onResult.hour23_psn_cnt), parseInt(onResult.hour24_psn_cnt));
				
				//하차
				var offResult = result.target.info.offResult;
				var offList = new Array();
				offList.push(parseInt(offResult.hour1_psn_cnt), parseInt(offResult.hour2_psn_cnt), parseInt(offResult.hour3_psn_cnt), parseInt(offResult.hour4_psn_cnt));
				offList.push(parseInt(offResult.hour5_psn_cnt), parseInt(offResult.hour6_psn_cnt), parseInt(offResult.hour7_psn_cnt), parseInt(offResult.hour8_psn_cnt));
				offList.push(parseInt(offResult.hour9_psn_cnt), parseInt(offResult.hour10_psn_cnt), parseInt(offResult.hour11_psn_cnt), parseInt(offResult.hour12_psn_cnt));
				offList.push(parseInt(offResult.hour13_psn_cnt), parseInt(offResult.hour14_psn_cnt), parseInt(offResult.hour15_psn_cnt), parseInt(offResult.hour16_psn_cnt));
				offList.push(parseInt(offResult.hour17_psn_cnt), parseInt(offResult.hour18_psn_cnt), parseInt(offResult.hour19_psn_cnt), parseInt(offResult.hour20_psn_cnt));
				offList.push(parseInt(offResult.hour21_psn_cnt), parseInt(offResult.hour22_psn_cnt), parseInt(offResult.hour23_psn_cnt), parseInt(offResult.hour24_psn_cnt));
				
				$("#publicMetroChart01").highcharts({
			        chart: {
			        	backgroundColor: 'white', width: 500, height: 300
			        },
			        exporting: { enabled: false },
			        title: {
			        	text : ''
			        },
			        xAxis: {
			            categories: ['00~01', '01~02', '02~03', '03~04', '04~05', '05~06', '06~07', '07~08', '08~09', '09~10', 
			                         	'10~11', '11~12', '12~13', '13~14', '14~15', '15~16', '16~17', '17~18', '18~19', '19~20',
			                         	'20~21', '21~22', '22~23', '23~24'],
			            labels: {
			                rotation: -45,
			                style: {
			                	fontSize: '9px;'
			                }
			        	}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			        	pointFormat: '{point.y}명'
			        },
			        plotOptions: {
			            column: {
			                borderWidth: 0
			            }
			        },
			        series:[{
			        	name : '승차인원',
			        	data : onList,
			        	color : '#5CD1E5'
			        }, {
			        	name : '하차인원',
			        	data : offList,
			        	color : '#595959'
			        }]
			    });
			},
			
			/**
			 * @name         : metroMonthPplnChartDraw
			 * @description  :	지하철 승하차 차트 및 내용 그리기 (월평균)
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			metroMonthPplnChartDraw : function(result) {
				var sopPortalMetroMonthPplnDrawObj = new sop.portal.metroMonthPplnChart.api();
				sopPortalMetroMonthPplnDrawObj.addParam("subway_no", result.target.info.subway_no);
				// 2017. 03. 22 오류수정
				sopPortalMetroMonthPplnDrawObj.addParam("station_nm", result.target.info.station_nm);
				sopPortalMetroMonthPplnDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/metroMonthPpln.json",
					options : {
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : metroWeekPplnChartDraw
			 * @description  :	지하철 승하차 차트 및 내용 그리기 (요일평균)
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			metroWeekPplnChartDraw : function(result) {
				var sopPortalMetroWeekPplnDrawObj = new sop.portal.metroWeekPplnChart.api();
				sopPortalMetroWeekPplnDrawObj.addParam("subway_no", result.target.info.subway_no);
				sopPortalMetroWeekPplnDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/metroWeekPpln.json",
					options : {
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : requestBusStopinfo
			 * @description  :	버스정류장 요청 API
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestBusStopinfo : function () {
				this.mapData[this.map_id].type = "busStop";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalBusStopPoiDrawObj = new sop.portal.busStopPoi.api();
				sopPortalBusStopPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalBusStopPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalBusStopPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalBusStopPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalBusStopPoiDrawObj.request({
					method : "POST",
					async : false,
					// 2017. 07. 03 API 호출 주소 수정 ( poiEtcBusStop... -> poietcbusstop... ) 대소문자
					url : contextPath + "/ServiceAPI/bizStats/poietcbusstop.json",
					options : {
						btntype: "etc",
						api_id : "10012",
						title : "버스정류장",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			
			//========= 2017.06.26 [개발팀] kcu 공공데이터 추가 - 대전-세종간 통행흐름 정보 START ==========//
			/**
			 * @name         : requestSejongCctvinfo
			 * @description  : 대전-세종간 CCTV 통행흐름정보 API
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			requestSejongCctvinfo : function() {
				this.mapData[this.map_id].type = "cctv";
				var sopPortalCctvPoiDrawObj = new sop.portal.cctvPoi.api();
				sopPortalCctvPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/cctvPoiList.json",
					options : {
						btntype: "etc",
						api_id : "10006",
						title : "CCTV",
						map : this.map
					}
				});	
			},
			
			/**
			 * @name         : requestSejongBusStopinfo
			 * @description  : 대전-세종간 버스정류장 통행정보 API
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			requestSejongBusStopinfo : function() {
				this.mapData[this.map_id].type = "cctv";
				var sopPortalBrtPoiDrawObj = new sop.portal.brtPoi.api();
				sopPortalBrtPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/busStopPoiList.json",
					options : {
						btntype: "etc",
						api_id : "10007",
						title : "BRT",
						map : this.map
					}
				});	
			},
			
			/**
			 * @name         : requestSejongBaseYearInfo
			 * @description  : 대전-세종간 base year정보
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			requestSejongBaseYearInfo : function() {
				var sopPortalCctvAndBrtBaseYearObj = new sop.portal.cctvAndBrtBaseYear.api();
				sopPortalCctvAndBrtBaseYearObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/publicData/cctvAndBrtBaseYearList.json",
					options : {
						map : this.map
					}
				});	
			},
			
			/**
			 * @name         : requestWeekendChartInfo
			 * @description  : CCTV 주중/주말 통계정보
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			requestCctvWeekendChartInfo : function(cctvId, info) {
				var sopPortalCctvWeekendChartInfoObj = new sop.portal.cctvWeekendChartInfo.api();
				sopPortalCctvWeekendChartInfoObj.addParam("cctv_lc_id", cctvId);
				sopPortalCctvWeekendChartInfoObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/publicData/cctvWeekendChartInfo.json",
					options : {
						btntype : "etc",
						title : "cctvWeekendChart",
						map : this.map,
						info : info
					}
				});
			},
			
			/**
			 * @name         : requestCctvTimeSeriesChartInfo
			 * @description  : CCTV 시간대별 통계
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			requestCctvTimeSeriesChartInfo : function(cctvId, date, info) {
				var sopPortalCctvTimeSeriesChartInfoObj = new sop.portal.cctvTimeSeriesChartInfo.api();
				sopPortalCctvTimeSeriesChartInfoObj.addParam("cctv_lc_id", cctvId);
				sopPortalCctvTimeSeriesChartInfoObj.addParam("base_ym", date);
				sopPortalCctvTimeSeriesChartInfoObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/publicData/cctvTimeSeriesChartInfo.json",
					options : {
						btntype : "etc",
						title : "cctvTimeSeriesChart",
						map : this.map,
						info : info
					}
				});
			},
			
			/**
			 * @name         : requestBrtWeekendChartInfo
			 * @description  : BRT 주중/주말 통계정보
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			requestBrtWeekendChartInfo : function(brtNo, info) {
				var sopPortalBrtWeekendChartInfoObj = new sop.portal.brtWeekendChartInfo.api();
				sopPortalBrtWeekendChartInfoObj.addParam("busstop_no", encodeURIComponent(brtNo));
				sopPortalBrtWeekendChartInfoObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/publicData/brtWeekendChartInfo.json",
					options : {
						btntype : "etc",
						title : "brtWeekendChart",
						map : this.map,
						info : info
					}
				});
			},
			
			/**
			 * @name         : requestBrtTimeSeriesChartInfo
			 * @description  : BRT 시간대별 통계
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			requestBrtTimeSeriesChartInfo : function(brtNo, date, info) {
				var sopPortalBrtTimeSeriesChartInfoObj = new sop.portal.brtTimeSeriesChartInfo.api();
				sopPortalBrtTimeSeriesChartInfoObj.addParam("busstop_no", encodeURIComponent(brtNo));
				sopPortalBrtTimeSeriesChartInfoObj.addParam("base_ym", date);
				sopPortalBrtTimeSeriesChartInfoObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/publicData/brtTimeSeriesChartInfo.json",
					options : {
						btntype : "etc",
						title : "brtTimeSeriesChart",
						map : this.map,
						info : info
					}
				});
			},
			
			/**
			 * @name         : changeCctvAndBusPoiList
			 * @description  : CCTV/버스정류장 항목 선택
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			changeCctvAndBusPoiList : function(type) {
				$("#publicCctvPoiDiv > .dbTabs03>a").removeClass("on");
				switch(type) {
					case "cctv" : //CCTV POI
						$("#cctvList").addClass("on");
						$("#busStopPoiArea").hide();
						$("#cctvPoiArea").show();
						break;
					case "busStop" : //버스정류장 POI
						$("#busStopList").addClass("on");
						$("#cctvPoiArea").hide();
						$("#busStopPoiArea").show();
						break;
				}
			},
			
			/**
			 * @name         : changeCctvDrawMode
			 * @description  : CCTV 시각화 모드
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 0 :전체, 1:세종IN방향, 2:세종OUT방향
			 */
			changeCctvDrawMode : function(type) {
				var data = this.mapData[this.map_id].options.poiList[0];
				if (data == undefined || data == null) {
					return;
				}
				
				//사용자 영역삭제
				var publicDataBoard = this.mapData[this.map_id];
				if(publicDataBoard.options.circleGeojson != null) {
					publicDataBoard.options.circleGeojson.remove();
				}
				
				$("#cctvPoiArea").css("border", "1px solid #ec8f25");
				
				var tmpData = {};
				var legendData = [];
				var lData = [];
				switch(parseInt(type)) {
					case 0: //전체
						for(var i=0; i<data.length; i++) {
							var id = data[i].cctv_lc_id;
							id = id.replace("sj_","");
							var tmpId = id.split("_");
							if( Object.prototype.toString.call(tmpData["sj_"+tmpId[0]]) !== "[object Array]") {
								tmpData["sj_"+tmpId[0]] = [];
							}
							tmpData["sj_"+tmpId[0]].push(data[i]);
							lData.push(data[i]);
						}
						
						var tmpLegendData = [];
						for (var p in tmpData) {
							var sum = 0;
							for (var i=0; i<tmpData[p].length; i++) {
								sum += parseFloat(tmpData[p][i].recent_6_month_day_avg_pasng_cnt);
							}
							tmpLegendData.push(sum);
							tmpData[p][0]["total"] = sum;
						}
						legendData.push(tmpLegendData);
						this.map.legend.legendType = "auto";
						this.map.legend.calculateLegend(legendData);
						this.drawCctvPoi("0", tmpData);
						$(".cctvAllTextTip").show();
						break;
					case 1: //세종IN방향
						var tmpLegendData = [];
						for(var i=0; i<data.length; i++) {
							if (data[i].path_div == "1") {
								tmpData[data[i].cctv_lc_id] = [data[i]];
								tmpLegendData.push(parseFloat(data[i].recent_6_month_day_avg_pasng_cnt));
								lData.push(data[i]);
							}
						}
						legendData.push(tmpLegendData);
						this.map.legend.legendType = "auto";
						this.map.legend.calculateLegend(legendData);
						this.drawCctvPoi("1", tmpData);
						$(".cctvAllTextTip").hide();
						break;
					case 2: //세종OUT방향
						var tmpLegendData = [];
						for(var i=0; i<data.length; i++) {
							if (data[i].path_div == "2") {
								tmpData[data[i].cctv_lc_id] = [data[i]];
								tmpLegendData.push(parseFloat(data[i].recent_6_month_day_avg_pasng_cnt));
								lData.push(data[i]);
							}
						}
						legendData.push(tmpLegendData);
						this.map.legend.legendType = "auto";
						this.map.legend.calculateLegend(legendData);
						this.drawCctvPoi("2", tmpData);
						$(".cctvAllTextTip").hide();
						break;
					default:
						break;
				}
				
				$("#legendColor_"+this.map.legend.id).find("li:eq(0)>a").click();
				$("#btn_legendSetting_"+this.map.legend.id).hide();
				$("#lgTypeList_"+this.map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "bubble") {
						$(this).find("a").click();
					}
				});

				var result = lData;
				var pageSize = 9;										// 페이지 당 항목 개수
				var totalPage = Math.ceil( result.length / pageSize);	// 전체 페이지 수	
				var tmpData = {};
				var pageIndex = 1;
				if (result.length > 0) {
					for (var i=0; i<result.length; i++) {
						if (i < pageSize*pageIndex) {
							if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
								tmpData[pageIndex] = [];
							}
							tmpData[pageIndex].push(result[i]);
						}else {
							pageIndex++;
							if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
								tmpData[pageIndex] = [];
							}
							tmpData[pageIndex].push(result[i]);
						}
					}
				}
				
				if (result.length == 0) {
					$("#cctvListPaging").hide();
				} else {
					$("#cctvListPaging").show();
				}
				
				$("#publicCctvDataCnt").html(result.length);
				$publicDataBoard.ui.cctvListPaging(result.length, totalPage, pageSize, tmpData);
				
				$("#publicCctvList").empty();	
				var html = "";
				if (tmpData.length != 0 && Object.prototype.toString.call(tmpData["1"]) === "[object Array]" ) {
					var data = tmpData["1"];
					for (var i=0; i<data.length; i++) {
						var cctvNm = data[i].lc_nm;
						cctvNm = cctvNm.split("(")[0];
						cctvNm = cctvNm + " (" + data[i].path_nm + ")";
						html += '<li id="'+data[i].cctv_lc_id+'" style="cursor:pointer;height:auto;">';
						html += 	'<div class="rela">';
						html += 		'<div class="img" style="margin-top:-10px;"><img src="/img/tech/ico_listType01.png" width=20 /></div>';
						html += 		'<div class="txt">';
						html += 			'<p class="t01" >' + cctvNm+ '</p>';
						html += 			'<div style="height:5px;"></div>';
/*						html +=				'<table>';
						html += 			'<tr class="t02"><td class="td01">위치 : </td><td class="td02">'+ data[i].addr + '</td></tr>';
						html += 			'<tr class="t02"><td class="td01">방향 : </td><td class="td02">'+ data[i].path_nm + '</td></tr>';
						html +=				'</table>';*/
						html += 		'</div>';	
						html += 	'</div>';
					}
					$("#publicCctvList").append(html);
				}
			},
			
			/**
			 * @name         : changeBrtDrawMode
			 * @description  : BRT 시각화 모드
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 1:오송방향, 2:반석방향
			 */
			changeBrtDrawMode : function(type) {
				var data = this.mapData[this.map_id].options.poiList[1];
				if (data == undefined || data == null) {
					return;
				}
				
				//사용자 영역 삭제
				var publicDataBoard = this.mapData[this.map_id];
				if(publicDataBoard.options.circleGeojson != null) {
					publicDataBoard.options.circleGeojson.remove();
				}
				
				$("#busStopPoiArea").css("border", "1px solid #1778cc");
				
				var tmpData = [];
				for (var i=0; i<data.length; i++) {
					if(data[i].path_div == type) {
						tmpData.push(data[i]);
					}
				}
				
				//목록생성
				var pageSize = 9;										// 페이지 당 항목 개수
				var totalPage = Math.ceil( tmpData.length / pageSize);	// 전체 페이지 수	
				var lData = {};
				var pageIndex = 1;
				if (tmpData.length > 0) {
					for (var i=0; i<tmpData.length; i++) {
						if (i < pageSize*pageIndex) {
							if (Object.prototype.toString.call(lData[pageIndex]) != "[object Array]" ) {
								lData[pageIndex] = [];
							}
							lData[pageIndex].push(tmpData[i]);
						}else {
							pageIndex++;
							if (Object.prototype.toString.call(lData[pageIndex]) != "[object Array]" ) {
								lData[pageIndex] = [];
							}
							lData[pageIndex].push(tmpData[i]);
						}
					}
				}
				
				if (tmpData.length == 0) {
					$("#busStopListPaging").hide();
				} else {
					$("#busStopListPaging").show();
				}
				
				$("#publicBusStopDataCnt").html(tmpData.length);
				$publicDataBoard.ui.brtListPaging(tmpData.length, totalPage, pageSize, lData);
				
				$("#publicBusStopList").empty();	
				var html = "";
				if (tmpData.length != 0 && Object.prototype.toString.call(lData["1"]) === "[object Array]" ) {
					var data = lData["1"];
					for (var i=0; i<data.length; i++) {
						var brtNm = data[i].busstop_nm;
						brtNm = brtNm.split("(")[0];
						brtNm = brtNm + " (" + data[i].path_nm + ")";
						html += '<li id="'+data[i].busstop_no+'" style="cursor:pointer;height:auto;">';
						html += 	'<div class="rela">';
						html += 		'<div class="img" style="margin-top:-10px;"><img src="/img/tech/ico_listType01.png" width=20 /></div>';
						html += 		'<div class="txt">';
						html += 			'<p class="t01">' + brtNm + '</p>';
						html += 			'<div style="height:15px;"></div>';
/*						html +=				'<table>';
						html += 			'<tr class="t02"><td class="td01">방향 : </td><td class="td02">'+ data[i].path_nm + '</td></tr>';
						html +=				'</table>';*/
						html += 		'</div>';	
						html += 	'</div>';
					}
					$("#publicBusStopList").append(html);
				}
				
				this.drawBrtPoi(type, tmpData);
			},
			
			/**
			 * @name         : cctvListPaging
			 * @description  : poi 페이징처리
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount : 전체수
			 * @param totalPage : 전체페이지
			 * @param pageSize : 페이지수
			 * @param data : 데이터
			 */
			cctvListPaging : function (totalCount, totalPage, pageSize, data) {
				$('#cctvListPaging .pages').paging({
					current : 1,
					max : totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){	// 페이지 선택 시
						$("#publicCctvList").empty();
						if (data.length != 0) {
							var tmpData = data[page];
							for (var i=0; i<tmpData.length; i++) {
								var cctv_no = (parseInt(page)*pageSize) + (i-pageSize);
								var cctvNm = tmpData[i].lc_nm;
								cctvNm = cctvNm.split("(")[0];
								cctvNm = cctvNm + " (" + tmpData[i].path_nm + ")";
								html = "";
								html += '<li id="'+tmpData[i].cctv_lc_id+'" style="cursor:pointer;height:auto;">';
								html += 	'<div class="rela">';
								html += 		'<div class="img" style="margin-top:-10px;"><img src="/img/tech/ico_listType01.png" width=20 /></div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">' + cctvNm + '</p>';
								html += 			'<div style="height:5px;"></div>';
/*								html +=				'<table>';
								html += 			'<tr class="t02"><td class="td01">위치 : </td><td class="td02">'+ tmpData[i].addr + '</td></tr>';
								html += 			'<tr class="t02"><td class="td01">방향 : </td><td class="td02">'+ tmpData[i].path_nm + '</td></tr>';
								html +=				'</table>';*/
								html += 		'</div>';	
								html += 	'</div>';
								$("#publicCctvList").append(html);
							}		
						}
					}
				});
			},
			
			/**
			 * @name         : brtListPaging
			 * @description  : poi 페이징처리
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount : 전체수
			 * @param totalPage : 전체페이지
			 * @param pageSize : 페이지수
			 * @param data : 데이터
			 */
			brtListPaging : function (totalCount, totalPage, pageSize, data) {
				$('#busStopListPaging .pages').paging({
					current : 1,
					max : totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){	// 페이지 선택 시
						$("#publicBusStopList").empty();
						if (data.length != 0) {
							var tmpData = data[page];
							for (var i=0; i<tmpData.length; i++) {
								var cctv_no = (parseInt(page)*pageSize) + (i-pageSize);
								var brtNm = tmpData[i].busstop_nm;
								brtNm = brtNm.split("(")[0];
								brtNm = brtNm + " (" + tmpData[i].path_nm + ")";
								html = "";
								html += '<li id="'+tmpData[i].busstop_no+'" style="cursor:pointer;height:auto;">';
								html += 	'<div class="rela">';
								html += 		'<div class="img" style="margin-top:-10px;"><img src="/img/tech/ico_listType01.png" width=20 /></div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">' + brtNm + '</p>';
								html += 			'<div style="height:15px;"></div>';
/*								html +=				'<table>';
								html += 			'<tr class="t02"><td class="td01">방향 : </td><td class="td02">'+ tmpData[i].path_nm + '</td></tr>';
								html +=				'</table>';*/
								html += 		'</div>';	
								html += 	'</div>';
								$("#publicBusStopList").append(html);
							}		
						}
					}
				});
			},
			
			/**
			 * @name         : drawCctvPoi
			 * @description  : cctv정보 draw
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 0:전체, 1:세종IN방향, 2:세종OUT방향
			 * @param data : 데이터
			 */
			drawCctvPoi : function(type, data) {
				//마커삭제
				var publicDataBoard = this.mapData[this.map_id];
				if (publicDataBoard.options.markerGroup != undefined &&
					publicDataBoard.options.markerGroup != null &&
					publicDataBoard.options.markerGroup.length > 0 &&
					publicDataBoard.options.markerGroup[0] != undefined) {
					var markerGroup = publicDataBoard.options.markerGroup[0].marker;
					this.map.gMap.removeLayer(markerGroup);
				}

				var cctvGroup = sop.featureGroup();
				this.map.gMap.addLayer(cctvGroup);
				
				var x_coord, y_coord, cctv_nm, color, cls, width, calcInfo, addr;
				var pieChartWidth = [48, 56, 64, 72, 80, 88, 96, 104];
				
				for (var p in data) {
					for (var i=0; i<data[p].length; i++) {
						var tmpData = data[p][i];
						if (i==0) {
							x_coord = tmpData.x_coord;
							y_coord = tmpData.y_coord;
							cctv_nm = tmpData.lc_nm.split("(")[0];
							addr = tmpData.addr;
						}
						tmpData["name"] = tmpData.path_nm;
						tmpData["y"] = parseFloat(tmpData.recent_6_month_day_avg_pasng_cnt);
						
						switch(parseInt(tmpData.path_div)) {
							case 1:
								color = "rgba(255, 50, 50, 0.7)";
								break;
							case 2:
								color = "rgba(40, 40, 205, 0.7)";
								break;
						}
						tmpData["color"] = color;
					}
					
					switch(parseInt(type)) {
						case 0:
							//width = 70;
							calcInfo = this.map.legend.getColor(parseFloat(data[p][0].total), this.map.legend.valPerSlice[0]);
							width = pieChartWidth[calcInfo[1]];
							break;
						default:
							calcInfo = this.map.legend.getColor(parseFloat(data[p][0].recent_6_month_day_avg_pasng_cnt), this.map.legend.valPerSlice[0]);
							width = pieChartWidth[calcInfo[1]];
							break;
					}

					var margin = -(width/2) + "px";
					var html  = "<div id='chart_"+p+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
						html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+cctv_nm+"</div>";
						html += 	"<div id='pieChart_"+this.map.legend.id+"_"+p+"'></div>";
					    html += "</div>";

					var icon = new sop.DivIcon({html:html, className: "pieChart-public", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(-5,-15)});
					var marker = sop.marker([ x_coord, y_coord ], {
						icon : icon
					});
					marker["info"] = data[p];
					marker["id"] = p;
					cctvGroup.addLayer(marker);
					
					var infoHtml = "";
					infoHtml += "<div class='cctvTopbar'>"+cctv_nm+"</div>";
					infoHtml += "<div class='cctvTooltipAddr'>&#40;"+addr+"&#41;</div>";
					infoHtml += "<div style='height:10px;'></div>";
					infoHtml += "<table class='cctvTooltip' id='cctvTooltip_"+this.map.legend.id+"'>";
					for (var i=0; i<data[p].length; i++) {
						switch (parseInt(data[p][i].path_div)) {
							case 1:
								cls = "out";
								break;
							case 2:
								cls = "in";
								break;
						} 
						infoHtml += "<tr class='tr_"+data[p][i].cctv_lc_id+"' id='tr_"+this.map.legend.id+"_"+data[p][i].cctv_lc_id+"' style='height:25px;'>";
						infoHtml += 	"<td style='width:25px;'><div class='t02 "+cls+"'></div></td>";
						infoHtml += 	"<td class='t01 cls_"+data[p][i].cctv_lc_id+"'>" + data[p][i].path_nm + "</td>";
						infoHtml += 	"<td class='t01 t04'>:</td>";
						infoHtml += 	"<td class='t01 t03'>" + appendCommaToNumber(Math.round(parseFloat(data[p][i].recent_6_month_day_avg_pasng_cnt))) + "&nbsp;(대)</td>";
/*						infoHtml += 	"<td class='t01'>&nbsp;(대)&nbsp;</td>";*/
						infoHtml += "</tr>";
					}
					infoHtml += "</table>";
					infoHtml += "<div class='cctvSource'>";
					infoHtml +=		"<span>*1일평균(최근 6개월)</sapn>";
					infoHtml += "</div>";
					marker.bindInfoWindow(infoHtml);
					
					//파이차트 생성
					var chart = $("#pieChart_"+this.map.legend.id+"_"+p).highcharts({
			            chart: {
			                type: 'pie',
			                width : width,
			                height : width,
			                backgroundColor:'rgba(255, 255, 255, 0)',
			                margin : [-3, 0, 0, 0]
			            },
			            exporting: { enabled: false },
			            title: {
			                text: ''
			            },
			            tooltip: {
			            	enabled : false,
			            },
			            plotOptions: {
			            	series: {
			                    dataLabels: {
			                        enabled: false,
			                        //format: '{point.name}: {point.y:.1f}%'
			                    },
			                    enableMouseTracking: true,
			                    point: {
			                    	events: {
			                    		click : function(e) {
			                    			var id = this.cctv_lc_id;
			                    			$publicDataBoard.ui.selectedCctvObj = this;
			                    			var map = $publicDataBoard.ui.map;
			                    			var publicData = $publicDataBoard.ui.mapData[map.id];
			                    			this["x"] = this.x_coord;
			                    			this["y"] = this.y_coord;
			                    			publicData.options.result = {};
			                    			publicData.options.result["target"] = {};
			                    			publicData.options.result.target["info"] = this;
			                    			//그래프 조회
			                    			var year = $("#cctvTimeSeriesYear option:selected").val();
			                    			var month = $("#cctvTimeSeriesMonth option:selected").val();
			                    			var date = year + month;
			                    			
			                    			$publicDataBoard.ui.isInit = true;
			                    			$publicDataBoard.ui.requestCctvWeekendChartInfo(id, this);
			                    			$publicDataBoard.ui.requestCctvTimeSeriesChartInfo(id, date, this);
			                    			$publicDataBoard.ui.circleInfo(publicData.options.result);
			                    			
			                    			var series = this.series;
			                    			var map = $publicDataBoard.ui.map;
			                    			$("#cctvTooltip_"+map.legend.id+" td").each(function() {
			                    				$(this).css("font-weight", "normal");
			                    			});
			                    			$("#tr_"+map.legend.id+"_"+id+ " td").each(function() {
			                    				$(this).css("font-weight", "bold");
			                    			});
			                    		}/*,
			                    		mouseOver : function(e) {
			                    			var id = this.cctv_lc_id;
			                    			var series = this.series;
			                    			var map = $publicDataBoard.ui.map;
			                    			$("#cctvTooltip_"+map.legend.id+" td").each(function() {
			                    				$(this).css("font-weight", "normal");
			                    			});
			                    			$("#tr_"+map.legend.id+"_"+id+ " td").each(function() {
			                    				$(this).css("font-weight", "bold");
			                    			});
			                    		}*/
			                    	}
			                    },
			                    events : {
			                    	click: function() {
			                    		var chart =  this;
			                    		var id = this.userOptions.id;
				                    	cctvGroup.eachLayer(function(marker) {
				                    		if (marker.id == id) {
				                    			 marker.openInfoWindow();
				                    		}
				                    	});
			                    	},
			                    	/*mouseOut : function() {
			                    		var chart =  this;
			                    		var id = this.userOptions.id;
				                    	cctvGroup.eachLayer(function(marker) {
				                    		if (marker.id == id) {
				                    			 marker.closeInfoWindow();
				                    		}
				                    	});
			                    	}*/
			                    }
			                },
			                pie : {
			                	shadow : false,
			                	borderWidth: 0,
			                	
			                }
			            },
			            series: [{
			                name: 'Brands',
			                colorByPoint: true,
			                data:  data[p],
			                id : p
			            }]
			        });		
					
				}
				
				publicDataBoard.options.markerGroup[0] = {
					"type" : "cctv",
					"marker" : cctvGroup
				};
			},
			
			/**
			 * @name         : drawBrtPoi
			 * @description  : cctv정보 draw
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 1:오송방향, 2:반석방향
			 * @param data : 데이터
			 */
			drawBrtPoi : function(type, data) {
				//마커삭제
				var publicDataBoard = this.mapData[this.map_id];
				if (publicDataBoard.options.markerGroup != undefined &&
					publicDataBoard.options.markerGroup != null &&
					publicDataBoard.options.markerGroup.length > 0 && 
					publicDataBoard.options.markerGroup[1] != undefined) {
					var markerGroup = publicDataBoard.options.markerGroup[1].marker;
					this.map.gMap.removeLayer(markerGroup);
				}
				
				var brtGroup = sop.featureGroup();
				this.map.gMap.addLayer(brtGroup);
				
				for (var i=0; i<data.length; i++) {
					var markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/30_02.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					
					var marker = sop.marker([ data[i].x_coord, data[i].y_coord ], {
						icon: markerIcon
					});
					
					marker.info = data[i];
					marker.on("click", function(e) {
						var tmpMarker = e.target;
						var id = $.trim(tmpMarker.info.busstop_no);
						var info = tmpMarker.info;
						
						var year = $("#brtTimeSeriesYear option:selected").val();
	        			var month = $("#brtTimeSeriesMonth option:selected").val();
	        			var date = year + month;
	        			
	        			var map = $publicDataBoard.ui.map;
	        			var publicData = $publicDataBoard.ui.mapData[map.id];
	        			e.target.info["x"] = e.target.info.x_coord;
	        			e.target.info["y"] = e.target.info.y_coord;
	        			publicData.options.result = e;
	        			
	        			$publicDataBoard.ui.isInit = true;
	        			$publicDataBoard.ui.selectedCctvObj = info;
						$publicDataBoard.ui.requestBrtWeekendChartInfo(id, info);	//brt 월별통계
	        			$publicDataBoard.ui.requestBrtTimeSeriesChartInfo(id, date, info); //brt 시간대별통계
	        			$publicDataBoard.ui.circleInfo(e);
					});
					brtGroup.addLayer(marker);
					
					var infoHtml = "";
					infoHtml += "<div class='cctvTopbar' style='width:250px;' >"+data[i].busstop_nm+"</div>";
					infoHtml += "<div style='height:15px;'></div>";
					infoHtml += "<table class='cctvTooltip'>";

					infoHtml += "<tr style='height:25px;'>";
					infoHtml += 	"<td><div class='t02 in'></div></td>";
					infoHtml += 	"<td class='t01'>승차 </td>";
					infoHtml += 	"<td class='t01 t04'>:</td>";
					infoHtml += 	"<td class='t01 t03'>" + appendCommaToNumber(Math.round(parseFloat(data[i].recent_6_month_day_avg_tkcar_psn_cnt))) + "&nbsp;(명)</td>";
					/*infoHtml += 	"<td class='t01'>&nbsp;(명)&nbsp;</td>";*/
					infoHtml += "</tr>";
					infoHtml += "<tr style='height:25px;'>";
					infoHtml += 	"<td><div class='t02 out'></div></td>";
					infoHtml += 	"<td class='t01'>하차</td>";
					infoHtml += 	"<td class='t01 t04'>:</td>";
					infoHtml += 	"<td class='t01 t03'>" + appendCommaToNumber(Math.round(parseFloat(data[i].recent_6_month_day_avg_gff_psn_cnt))) + "&nbsp;(명)</td>";
					/*infoHtml += 	"<td class='t01'>&nbsp;(명)&nbsp;</td>";*/
					infoHtml += "</tr>";
					infoHtml += "</table>";
					infoHtml += "<div class='cctvSource'>";
					infoHtml +=		"<span>*1일평균(최근 6개월)</sapn>";
					infoHtml += "</div>";
					marker.bindInfoWindow(infoHtml);
					
				}

				publicDataBoard.options.markerGroup[1] = {
					"type" : "brt",
					"marker" : brtGroup
				};
			},
			
			/**
			 * @name         : drawCctvWeekendGraph
			 * @description  : 주중/주말 및 출퇴근시간대별 통계
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 0:주중/주말별, 1:출퇴근시간대별
			 */
			drawCctvWeekendGraph : function(type) {
				$("#publicCctvWeekendGraphDiv > .dbTabs03>a").removeClass("on");
				switch(parseInt(type)) {
					case 0:	//주중/주말
						$(".timeSeriesBoxArea").css("border", "1px solid #ec8f25");
						$("#weekendGraph").addClass("on");
						$("#rushHoursGraphArea").hide();
						$("#weekendGraphArea").show();
						break;
					case 1: //출퇴근시간대별
						$(".timeSeriesBoxArea").css("border", "1px solid #1778cc");
						$("#rushHoursGraph").addClass("on");
						$("#weekendGraphArea").hide();
						$("#rushHoursGraphArea").show();
						break;
				}
			},
			
			/**
			 * @name         : drawCctvTimeseriesGraph
			 * @description  : 시간대별/요일별 통계
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 0:시간대별, 1:요일별
			 */
			drawCctvTimeseriesGraph : function(type) {
				$("#publicCctvTimeseriesGraphDiv > .dbTabs03>a").removeClass("on");
				switch(parseInt(type)) {
					case 0:	//시간대별
						$(".monthBoxArea").css("border", "1px solid #ec8f25");
						$("#timeseriesGraph").addClass("on");
						$("#dayOfWeekGraphArea").hide();
						$("#timeseriesGraphArea").show();
						break;
					case 1:	//요일별
						$(".monthBoxArea").css("border", "1px solid #1778cc");
						$("#dayOfWeekGraph").addClass("on");
						$("#timeseriesGraphArea").hide();
						$("#dayOfWeekGraphArea").show();
						break;
				}
			},
			
			/**
			 * @name         : drawBrtWeekendGraph
			 * @description  : 주중/주말 및 출퇴근시간대별 통계
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 0:주중/주말별, 1:출퇴근시간대별
			 */
			drawBrtWeekendGraph : function(type) {
				$("#publicBrtWeekendGraphDiv > .dbTabs03>a").removeClass("on");
				switch(parseInt(type)) {
					case 0:	//주중
						$(".monthBoxArea").css("border", "1px solid #ec8f25");
						$("#brtMonthDayOfWeekGraph").addClass("on");
						$("#brtMonthDayOfWeekGraphArea").show();
						$("#brtMonthWeekendGraphArea").hide();
						$("#brtMonthOnWorkGraphArea").hide();
						$("#brtMonthOffWorkGraphArea").hide();
						break;
					case 1: //주말
						$(".monthBoxArea").css("border", "1px solid #ee6926");
						$("#brtMonthWeekendGraph").addClass("on");
						$("#brtMonthDayOfWeekGraphArea").hide();
						$("#brtMonthWeekendGraphArea").show();
						$("#brtMonthOnWorkGraphArea").hide();
						$("#brtMonthOffWorkGraphArea").hide();
						break;
					case 2: //출근시간대
						$(".monthBoxArea").css("border", "1px solid #1778cc");
						$("#brtMonthOnWorkGraph").addClass("on");
						$("#brtMonthDayOfWeekGraphArea").hide();
						$("#brtMonthWeekendGraphArea").hide();
						$("#brtMonthOnWorkGraphArea").show();
						$("#brtMonthOffWorkGraphArea").hide();
						break;
					case 3: //퇴근시간대
						$(".monthBoxArea").css("border", "1px solid #17aecd");
						$("#brtMonthOffWorkGraph").addClass("on");
						$("#brtMonthDayOfWeekGraphArea").hide();
						$("#brtMonthWeekendGraphArea").hide();
						$("#brtMonthOnWorkGraphArea").hide();
						$("#brtMonthOffWorkGraphArea").show();
						break;
				}
			},
			
			/**
			 * @name         : drawBrtTimeseriesGraph
			 * @description  : 시간대별/요일별 통계
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 0:시간대별, 1:요일별
			 */
			drawBrtTimeseriesGraph : function(type) {
				$("#publicBrtTimeseriesGraphDiv > .dbTabs03>a").removeClass("on");
				switch(parseInt(type)) {
					case 0:	//주중 시간대별
						$(".timeSeriesBoxArea").css("border", "1px solid #ec8f25");
						$("#dayOfWeektimeseriesGraph").addClass("on");
						$("#brtTimeSeriesDayOfWeekGraphArea").show();
						$("#brtTimeSeriesWeekendGraphArea").hide();
						$("#brtTimeSeriesOnWorkGraphArea").hide();
						$("#brtTimeSeriesOffWorkGraphArea").hide();
						break;
					case 1:	//주말 시간대별
						$(".timeSeriesBoxArea").css("border", "1px solid #ee6926");
						$("#weekendTimeseriesGraph").addClass("on");
						$("#brtTimeSeriesDayOfWeekGraphArea").hide();
						$("#brtTimeSeriesWeekendGraphArea").show();
						$("#brtTimeSeriesOnWorkGraphArea").hide();
						$("#brtTimeSeriesOffWorkGraphArea").hide();
						break;
					case 2:	//출근시간대별
						$(".timeSeriesBoxArea").css("border", "1px solid #1778cc");
						$("#onWorkTimeseriesGraph").addClass("on");
						$("#brtTimeSeriesDayOfWeekGraphArea").hide();
						$("#brtTimeSeriesWeekendGraphArea").hide();
						$("#brtTimeSeriesOnWorkGraphArea").show();
						$("#brtTimeSeriesOffWorkGraphArea").hide();
						break;
					case 3:	//퇴근시간대별
						$(".timeSeriesBoxArea").css("border", "1px solid #17aecd");
						$("#offWorkTimeseriesGraph").addClass("on");
						$("#brtTimeSeriesDayOfWeekGraphArea").hide();
						$("#brtTimeSeriesWeekendGraphArea").hide();
						$("#brtTimeSeriesOnWorkGraphArea").hide();
						$("#brtTimeSeriesOffWorkGraphArea").show();
						break;
				}
			},
			
			/**
			 * @name         : drawChart
			 * @description  : 시간대별/요일별 통계
			 * @date         : 2017. 06. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 차트 아이디
			 * @param data : 차트 데이터
			 */
			drawChart : function(id, data) {
				 $(id).highcharts({
					 chart : {
							type : 'column', 
							width: 500, 
							height: 300
					},
					tooltip : {
						shared : true,
						formatter: function () {
							var html = "";
							var symbol = '●';
							for (var i=0; i<this.points.length; i++) {
								switch(i) {
									case 0:
										symbol = '●';
										break;
									case 1:
										symbol = '♦';
										break;
									case 2:
										symbol = '■';
										break;
									case 3:
										symbol = '■';
										break;
								}
								html += '<span style="color:' + this.points[i].series.color + '">' + symbol + '</span>';
								html += ' ' + this.points[i].series.name + ': <b>' + appendCommaToNumber(this.points[i].y) + '</b> ('+this.points[i].series.userOptions.unit+')';
								if (i < this.points.length-1) {
									html += "<br/>";
								}
							}
							return html;
		                }
					},
					title : {
						text : data.title,
						style : {
							fontSize : "16px"
						}
					},
					exporting: { enabled: false },
					xAxis : {
						categories : data.categories
					},
					yAxis : {
						title : {
							text : data.unit
						}
					},
					series : data.data
				 });
				
			},
			
			//========= 2017.06.26 공공데이터 추가 - 대전-세종간 통행흐름 정보 END ==========//
			
			/**
			 * @name         : remove
			 * @description  :	공공데이터 삭제
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			remove : function(map_id) {
				//대화형통계지도 데이터보드 보이기
				$(".dataBoardDiv").hide();
//				$("#viewDataBoard").show();
				
				//초기화
				this.reset(map_id);
			},
			
			/**
			 * @name         : reset
			 * @description  :	공공데이터 초기화
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reset : function(map_id) {
				var mapData = this.mapData[map_id];
				
				$("#publicDataList").html("");		//리스트 지움
				$("#publicDataCnt").html("0");		//검색된 개수
				$("#publicPopulationTitle").html("");		//차트 타이틀 지움
				$("#publicSchoolTitle").html("");
				$("#publicMetroTitle").html("");
				$("#publicPopulationChart").empty();	//차트 초기화
				$("#publicSchoolChart").empty();
				$("#publicSchoolGroupChart").empty();
				$("#publicMetroChart01").empty();
				$("#publicMetroChart02").empty();
				$("#publicMetroChart03").empty();
				$("#publicDataThemeChart").empty();
				$("#circlePeople").html("");		//반경 내 인구
				$("#circleFamily").html("");		//반경 내 가구
				$("#circleHouse").html("");		//반경 내 주택
				$("#circleCorp").html("");		//반경 내 사업체 수
				
				$("#publicDataSlide").slider("value", 1);	//반경영역 50미터
				
				//서클이 있으면 삭제
				if(mapData.options.circle != null) {
					mapData.options.circleGeojson.remove();
					mapData.options.circle.remove();	
				}
				//마커 전체 삭제
				//2017.06.26 [개발팀] kcu 공공데이터 추가
				if (mapData.type != "cctv") {
					for(var i = 0; i < mapData.options.markerGroup.length; i ++) {
						this.map.markers.removeLayer(mapData.options.markerGroup[i].marker);
					}
				}else {
					for(var i = 0; i < mapData.options.markerGroup.length; i ++) {
						this.map.gMap.removeLayer(mapData.options.markerGroup[i].marker);
					}
				}
				
				
				var options = {
						map : null,
						viewIndex : 0,				//현재 보고 있는 Index (페이징)
						markerGroup : [],			//POI 그룹
						result : [],					//POI 상세결과 리스트
						circle : null,				//임의영역 반경 서클
						circleGeojson : null,	//임의영역 반경 경계
						radius : 100,				//서클 크기
						mapBounds : null		//지도 바운더리
				}
				this.mapData[this.map_id].options = options;
				this.mapData[this.map_id].type = "";
			}
	};

	$publicDataBoard.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");

				//임의반경영역 설정
				$("#publicDataSlide").slider({ 
			    	min: 1,
			        max: 4,
			        value : 1,
			        slide: function( event, ui ) {
			        	//슬라이더 선택 시
			        	$publicDataBoard.ui.circleRadiusSliderClick(ui.value);
			          }
			    });
				
				//==================== 공공데이터 추가 START ====================//
				//2017.06.26 [개발팀] kcu공공데이터 추가 - CCTV정보 모드 선택
				Highcharts.setOptions({
					lang: {
						thousandsSep: ','
					}
				});
				
				body.on("click",".cctvMode label",function(){
					$(".cctvMode label").removeClass("on");
					$(".cctvMode input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//2017.06.26 공공데이터 추가 - BRT정보 모드 선택
				body.on("click",".brtMode label",function(){
					$(".brtMode label").removeClass("on");
					$(".brtMode input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//cctv 년월선택
				body.on("change", "#cctvTimeSeriesYear, #cctvTimeSeriesMonth", function() {
					var year =  $("#cctvTimeSeriesYear option:selected").val();
					var month = $("#cctvTimeSeriesMonth option:selected").val();
					var date = year + month;
					var cctv = $publicDataBoard.ui.selectedCctvObj;
					$publicDataBoard.ui.isInit = false;
					$publicDataBoard.ui.requestCctvTimeSeriesChartInfo(cctv.cctv_lc_id, date, cctv);
				});
				
				//brt 년원선택
				body.on("change", "#brtTimeSeriesYear, #brtTimeSeriesMonth", function() {
					var year =  $("#brtTimeSeriesYear option:selected").val();
					var month = $("#brtTimeSeriesMonth option:selected").val();
					var date = year + month;
					var brt = $publicDataBoard.ui.selectedCctvObj;
					$publicDataBoard.ui.isInit = false;
					$publicDataBoard.ui.requestBrtTimeSeriesChartInfo(brt.busstop_no, date, brt);
				});
				
				//cctv 선택
				body.on("click", "#publicCctvList li", function() {
					$("#publicCctvList").find(".rela").css("border", "1px solid #e6e6e6");
					$(this).find(".rela").css("border", "3px solid #e6e6e6");
					
					var id = $(this).attr("id");
					var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
					if (publicDataBoard.options.markerGroup != null && 
						publicDataBoard.options.markerGroup != undefined &&
						publicDataBoard.options.markerGroup.length > 0) {
						var groupList = publicDataBoard.options.markerGroup[0];
						var markerLayer = groupList.marker;
						markerLayer.eachLayer(function(marker) {
							var info = marker.info;
							for (var i=0; i<info.length; i++) {
								if (info[i].cctv_lc_id == id) {
									marker.openInfoWindow();
									info[i]["x"] = marker.info[i].x_coord;
									info[i]["y"] = marker.info[i].y_coord;
									var e = {};
									e["target"] = {};
									e.target["info"] = info[i];
									var map = $publicDataBoard.ui.map;
									var year = $("#cctvTimeSeriesYear option:selected").val();
	                    			var month = $("#cctvTimeSeriesMonth option:selected").val();
	                    			var date = year + month;
	                    			$publicDataBoard.ui.mapData[map.id].options.result = info[i];
	                    			$publicDataBoard.ui.selectedCctvObj = info[i];
	                    			$publicDataBoard.ui.requestCctvWeekendChartInfo(id, info[i]);
	                    			$publicDataBoard.ui.requestCctvTimeSeriesChartInfo(id, date, info[i]);
	                    			$publicDataBoard.ui.circleInfo(e);
	                    			map.mapMove([info[i].x_coord, info[i].y_coord], map.zoom);
	                    			
	                    			$(".cctvTooltip td").each(function() {
	                    				$(this).css("font-weight", "normal");
	                    			});
	                    			$(".tr_"+id+ " td").each(function() {
	                    				$(this).css("font-weight", "bold");
	                    			});
								}
							}
							
						});
					}					
				});
				
				//brt 선택
				body.on("click", "#publicBusStopList li", function() {
					var id = $(this).attr("id");
					var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
					if (publicDataBoard.options.markerGroup != null && 
						publicDataBoard.options.markerGroup != undefined &&
						publicDataBoard.options.markerGroup.length > 0) {
						var groupList = publicDataBoard.options.markerGroup[1];
						var markerLayer = groupList.marker;
						markerLayer.eachLayer(function(marker) {
							var info = marker.info;
							if (info.busstop_no == id) {
								marker.openInfoWindow();
								info["x"] = marker.info.x_coord;
								info["y"] = marker.info.y_coord;
								var e = {};
								e["target"] = {};
								e.target["info"] = info;
								var map = $publicDataBoard.ui.map;
								var year = $("#brtTimeSeriesYear option:selected").val();
			        			var month = $("#brtTimeSeriesMonth option:selected").val();
			        			var date = year + month;
			        			$publicDataBoard.ui.mapData[map.id].options.result = info;
								$publicDataBoard.ui.selectedCctvObj = info;
								$publicDataBoard.ui.requestBrtWeekendChartInfo(id, info);	//brt 월별통계
			        			$publicDataBoard.ui.requestBrtTimeSeriesChartInfo(id, date, info); //brt 시간대별통계
			        			$publicDataBoard.ui.circleInfo(e);
			        			map.mapMove([info.x_coord, info.y_coord], map.zoom);
							}
						});
					}					
				});

				//cctv 전체/IN/OUT 빵향
				body.on("click", ".cctvMode a", function() {
					 $(".cctvMode a").removeClass("on");
					 $(this).addClass("on");
					 
				});
				
				//brt 전체/IN/OUT 빵향
				body.on("click", ".brtMode a", function() {
					 $(".brtMode a").removeClass("on");
					 $(this).addClass("on");
					 
				});
				
				//cctv 전체/IN/OUT 빵향
				body.on("click", ".dbTabs03 a", function() {
					var id = $(this).attr("id");
					switch(id) {
						case "cctvList":
							 $("#"+id).find(".blue").removeClass("on");
							 $(this).addClass("on");
							 $("#cctvPoiArea").css("border", "1px solid #ec8f25");
							break;
						case "brtList":
							 $("#"+id).find(".yellow").removeClass("on");
							 $(this).addClass("on");
							 $("#busStopPoiArea").css("border", "1px solid #1778cc");
							break;
						case "timeseriesGraph":
							 $("#"+id).find(".blue").removeClass("on");
							 $(this).addClass("on");
							 $(".timeSeriesBoxArea").css("border", "1px solid #ec8f25");
							break;
						case "dayOfWeekGraph":
							 $("#"+id).find(".yellow").removeClass("on");
							 $(this).addClass("on");
							 $(".timeSeriesBoxArea").css("border", "1px solid #1778cc");
							break;
						case "weekendGraph":
							$("#"+id).find(".blue").removeClass("on");
							 $(this).addClass("on");
							 $(".monthBoxArea").css("border", "1px solid #ec8f25");
							break;
						case "rushHoursGraph":
							 $("#"+id).find(".yellow").removeClass("on");
							 $(this).addClass("on");
							 $(".monthBoxArea").css("border", "1px solid #1778cc");
							break;
						
					}
					
					 
				});
				
				
				
				
				//==================== 공공데이터 추가 END ====================//
			}
	};
	
	/** ********* 임의영역 반경 내 집계구경계 정보 Start ********* */
	(function () {
		$class("sop.portal.circleAreaTotInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
				if (res.errCd == "0") {
					var geojson = sop.geoJson(res);
					//기존 경계 삭제
					if(publicDataBoard.options.circleGeojson != null) {
						publicDataBoard.options.circleGeojson.remove();
					}
					//경계 추가
					publicDataBoard.options.circleGeojson = geojson;
					geojson.addTo(publicDataBoard.options.map.gMap);
					
					//집계구 코드만 꺼내온다.
					var totRegCdList = [];
					for(var i = 0; i < res.features.length; i ++) {
						totRegCdList.push(res.features[i].properties.tot_reg_cd);
					}	
					setTimeout(function() {
						//영역 내 정보 가져오기
						$publicDataBoard.ui.circleAreaFullInfo(totRegCdList, options.map);
					}, 100);
					
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 임의영역 반경 내 집계구경계 정보 End ********* */
	
	/** ********* 임의영역 반경 내 주요 정보 Start ********* */
	(function () {
		$class("sop.portal.circleAreaFullInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if (res.errCd == "0") {
					var map = options.map;
					var result = res.result;
					var totalInfo = res.result.totalInfo;
					var themeInfo = res.result.themeInfo;
				
					$("#circlePeople").text(appendCommaToNumber(totalInfo.ppltn_cnt));		//반경 내 인구
					$("#circleFamily").text(appendCommaToNumber(totalInfo.family_cnt));		//반경 내 가구
					$("#circleHouse").text(appendCommaToNumber(totalInfo.resid_cnt));		//반경 내 주택
					$("#circleCorp").text(appendCommaToNumber(totalInfo.corp_cnt));			//반경 내 사업체
					
					if(themeInfo != null) {
						//주요 사업체 테마 차트
						$("#publicDataThemeChart").highcharts({
							chart : {
								type : 'column'
							},
							exporting: { enabled: false },
							title : {
								text : '반경 내 주요 시설물 수'
							},
							subtitle : {
								text : ''
							},
							xAxis : {
								type : 'category',
								labels : {
									rotation : -45,
									style : {
										fontSize : '11px'
									}
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
							tooltip : {
								pointFormat : '<b>{point.y}개</b>'
							},
							series : [ {
								name : 'Population',
								data : [ 
								         	[ '교육시설', themeInfo.theme_sum_01 ],
								         	[ '공공기관', themeInfo.theme_sum_02 ],
								         	[ '금융시설', themeInfo.theme_sum_03 ],
								         	[ '의료시설', themeInfo.theme_sum_04 ],
								         	/*[ '대중교통', parseInt(themeInfo.theme_sum_05) ],*/ //2017.07.24 [개발팀] 오승찬 주무관님 요청 - 생활업종과 같도록 대중교통항목 삭제
								         	[ '방범/방재', themeInfo.theme_sum_06 ],
								         	[ '백화점/중대형마트', themeInfo.theme_sum_07 ],
								         	[ '편의점', themeInfo.theme_sum_08 ],
								         	[ '극장/영화관', themeInfo.theme_sum_09 ],
								         	[ '도서관/박물관', themeInfo.theme_sum_10 ]
								         ],
								dataLabels : {
									enabled : false
								}
							} ]
						});
						
					} else {
						$("#publicDataThemeChart").empty();
					}
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"circleAreaInfo", 
							result, 
							map.id);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 임의영역 반경 내 주요 정보 End ********* */
	
	/** ********* 유동인구 POI Start ********* */
	(function () {
		$class("sop.portal.floatPplnPoi.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.map;
				var result = res.result;
				var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
				
				//마커그룹 초기화
				publicDataBoard.options.markerGroup = [];
				
				if (res.errCd == "0") {
					var html = "";
					//지도영역 내 조회된 정보 목록
					for(var i = 0; i < result.length; i ++) {
						html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i][0].surv_region+" 유동인구</a></li>";
					}
					$("#publicDataList").html(html);
					
					//검색된 개수
					$("#publicDataCnt").html(result.length);
					
					//해당 POI 통계정보
					for(var i = 0; i < result.length; i ++) {
						for(var x = 0; x < result[i].length; x ++) {
							if((x+1) == result[i].length) {
								var _markerIcon = sop.icon({
									iconUrl: '/img/idm/marker-icon.png',
									shadowUrl: '/img/marker/theme_shadow.png',
									iconAnchor: [ 12.5, 40 ],
									iconSize: [ 25, 40 ],
									infoWindowAnchor: [1, -34]
								});
								var _marker = sop.marker([ result[i][x].x, result[i][x].y ], {
									icon: _markerIcon
								});
								
								_marker.info = result[i][x];
								_marker.addTo(map.markers);
								_marker.info["resultList"] = result[i];
								
								var infoHtml = "";
								infoHtml += "<table style='text-align:left;white-space: nowrap;word-break:break-all;padding:5px;'>";
								infoHtml += "	<tr>";
								infoHtml += "		<th><strong>" + result[i][x].surv_region + " 유동인구</strong></th>";
								infoHtml += "	</tr>";
								infoHtml += "<table>";
								_marker.bindInfoWindow(infoHtml,{autoPan: false});
								
								//마커 클릭 시
								_marker.on("click", function(result) {
									//서클 생성
									$publicDataBoard.ui.circleInfo(result);
									//인포윈도우 열기
									_marker.openInfoWindow();
									//페이징 0으로 초기화
									publicDataBoard.options.viewIndex = 0;
									//결과 리스트 저장
									publicDataBoard.options.result = result;
									//차트 그리기
									$publicDataBoard.ui.floatPplnChartDraw(result);
								});
								
								publicDataBoard.options.markerGroup.push({
									"idx" : i,
									"marker" : _marker
								});
							}
						}
					}
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"population_poi", 
							result, 
							map.id);
					
					//API 로그
					if($publicDataBoard.ui.delegate.namespace == "interactiveMap") {
						setTimeout(apiLogWrite("A0", options), 2000);
					} else if($publicDataBoard.ui.delegate.namespace == "bizStatsMap") {
						setTimeout(apiLogWrite("B0", options), 2000);
					}
					
				} else {
					//초기화
//					$publicDataBoard.ui.reset();
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 유동인구 POI End ********* */
	
	/** ********* 학교인구 POI Start ********* */
	(function () {
		$class("sop.portal.schoolPplnPoi.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.map;
				var result = res.result;
				var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
				
				//마커그룹 초기화
				publicDataBoard.options.markerGroup = [];
				
				if (res.errCd == "0") {
					var html = "";
					//지도영역 내 조회된 정보 목록
					for(var i = 0; i < result.length; i ++) {
						html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i].school_nm+"</a></li>";
					}
					$("#publicDataList").html(html);
					
					//검색된 개수
					$("#publicDataCnt").html(result.length);
					
					//해당 POI 통계정보
					for(var i = 0; i < result.length; i ++) {
						var _markerIcon = sop.icon({
							iconUrl: '/img/marker/marker/70_01.png',
							shadowUrl: '/img/marker/theme_shadow.png',
							iconAnchor: [ 12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						var _marker = sop.marker([ result[i].x, result[i].y ], {
							icon: _markerIcon
						});
						_marker.info = result[i];
						_marker.addTo(map.markers);
						_marker.info["resultList"] = result[i];
						
						var infoHtml = "";
						infoHtml += "<table style='text-align:left;white-space: nowrap;word-break:break-all;padding:5px;'>";
						infoHtml += "	<tr>";
						infoHtml += "		<th><strong>" + result[i].school_nm + "</strong></th>";
						infoHtml += "	</tr>";
						infoHtml += "<table>";
						_marker.bindInfoWindow(infoHtml,{autoPan: false});
						
						//마커 클릭 시
						_marker.on("click", function(result) {
							//서클 생성
							$publicDataBoard.ui.circleInfo(result);
							//인포윈도우 열기
							_marker.openInfoWindow();
							//결과 리스트 저장
							publicDataBoard.options.result = result;
							//차트 그리기
							$publicDataBoard.ui.schoolPplnChartDraw(result);
							//시군구 평균 학교정보 요청 API
							$publicDataBoard.ui.sggSchoolAvg(result.target.info.tot_reg_cd, result.target.info.elsm);
						});
						
						publicDataBoard.options.markerGroup.push({
							"idx" : i,
							"marker" : _marker
						});
					}
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"school_poi", 
							result, 
							map.id);
					
					//API 로그
					if($publicDataBoard.ui.delegate.namespace == "interactiveMap") {
						setTimeout(apiLogWrite("A0", options), 2000);
					} else if($publicDataBoard.ui.delegate.namespace == "bizStatsMap") {
						setTimeout(apiLogWrite("B0", options), 2000);
					}
				} else {
					//초기화
//					$publicDataBoard.ui.reset();
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 학교인구 POI End ********* */
	
	/** ********* 시군구 평균 학생/교사 정보 Start ********* */
	$class("sop.portal.sggSchoolAvg.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			if(res.errCd == "0") {
				var result = res.result;
				var sggAvg = result.sggAvg;
				var sggGroupAvg = result.sggGroupAvg;
				var map = options.map;
				
				$("#sggNmSchool").text(sggAvg.sgg_nm + " " + sggAvg.elsm);		//시군구명 + 학교구분
				$("#schoolStdtAvg").text(sggAvg.stdnt_cnt);		//총학생수 평균
				$("#schoolTcherAvg").text(sggAvg.tcher_cnt);		//총교직원수 평균
				
				var xAxisCat = [];	//X축 카테고리
				var stdntList = [];	//학생 수
				var tcherList = [];	//교직원 수
				for(var i = 0; i < sggGroupAvg.length; i ++) {
					xAxisCat.push(sggGroupAvg[i].elsm);
					stdntList.push(parseInt(sggGroupAvg[i].stdnt_cnt));
					tcherList.push(parseInt(sggGroupAvg[i].tcher_cnt));
				}
				
				//학교별 평균 학생/교직원 현황
				$("#publicSchoolGroupChart").highcharts({
					chart : {
						type : 'column', width: 500, height: 300
					},
					exporting: { enabled: false },
					colors: ['#92D050', '#595959'],
					title: {
			            text: ''
			        },
			        xAxis: {
			            categories: xAxisCat,
			            labels : { 
							rotation : -45
						}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			            shared: true
			        },
			        plotOptions: {
			            column: {
			                stacking: 'percent'
			            }
			        },
			        series: [{
			            name: '학생',
			            data: stdntList
			        }, {
			            name: '교직원',
			            data: tcherList
			        }]
				});
				
				//보고서 생성을 위한 데이터 저장
				$publicDataBoard.ui.setReportData(
						"publicData", 
						"school_sggAvg", 
						result, 
						map.id);
				
			} else {
				$("#publicSchoolGroupChart").empty();
				$("#sggNmSchool").text("");
				$("#schoolStdtAvg").text("0");
				$("#schoolTcherAvg").text("0");
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 시군구 평균 학생/교사 정보 End ********* */
	
	/** ********* 지하철승하차인구 (일평균) POI Start ********* */
	$class("sop.portal.metroPplnPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
			//마커그룹 초기화
			publicDataBoard.options.markerGroup = [];
			
			if (res.errCd == "0") {
				var html = "";
				//지도영역 내 조회된 정보 목록
				for(var i = 0; i < result.length; i ++) {
					html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i][0].station_nm+"</a></li>";
				}
				$("#publicDataList").html(html);
				
				//검색된 개수
				$("#publicDataCnt").html(result.length);
				
				//해당 POI 통계정보
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/30_01.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i][0].x, result[i][0].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i][0];
					_marker.addTo(map.markers);
					_marker.info["onResult"] = result[i][0];
					_marker.info["offResult"] = result[i][1];
					
					var infoHtml = "";
					infoHtml += "<table style='text-align:left;white-space: nowrap;word-break:break-all;padding:5px;'>";
					infoHtml += "	<tr>";
					infoHtml += "		<th><strong>" + result[i][0].station_nm + "</strong></th>";
					infoHtml += "	</tr>";
					infoHtml += "<table>";
					_marker.bindInfoWindow(infoHtml,{autoPan: false});
					
					//마커 클릭 시
					_marker.on("click", function(result) {
						//서클 생성
						$publicDataBoard.ui.circleInfo(result);
						//인포윈도우 열기
						_marker.openInfoWindow();
						//결과 리스트 저장
						publicDataBoard.options.result = result;
						//차트 그리기
						$publicDataBoard.ui.metroDayPplnChartDraw(result);
					});
					
					publicDataBoard.options.markerGroup.push({
						"idx" : i,
						"marker" : _marker
					});
				}
				
				//보고서 생성을 위한 데이터 저장
				$publicDataBoard.ui.setReportData(
						"publicData", 
						"metro_day", 
						result, 
						map.id);
				
				//API 로그
				if($publicDataBoard.ui.delegate.namespace == "interactiveMap") {
					setTimeout(apiLogWrite("A0", options), 2000);
				} else if($publicDataBoard.ui.delegate.namespace == "bizStatsMap") {
					setTimeout(apiLogWrite("B0", options), 2000);
				}
			} else {
				//초기화
//				$publicDataBoard.ui.reset(map.id);
				
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* 지하철승하차인구 (일평균) POI End ********* */
	
	/** ********* 지하철승하차인구 차트 (월평균) Start ********* */
	$class("sop.portal.metroMonthPplnChart.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			var map = options.map;
			if(res.errCd == "0") {
				//승차
				var onList = new Array();
				for(var i = 0; i < result.monthOnList.length; i ++) {
					onList.push(parseInt(result.monthOnList[i].hour_psn_avg));
				}
				//하차
				var offList = new Array();
				for(var i = 0; i < result.monthOffList.length; i ++) {
					offList.push(parseInt(result.monthOffList[i].hour_psn_avg));
				}
				
				$("#publicMetroChart02").highcharts({
			        chart: {
			        	backgroundColor: 'white', width: 500, height: 300
			        },
			        exporting: { enabled: false },
			        title: {
			        	text : ''
			        },
			        xAxis: {
			            categories: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
			            labels: {
			                style: {
			                	fontSize: '9px;'
			                }
			        	}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			        	pointFormat: '{point.y}명'
			        },
			        plotOptions: {
			            column: {
			                borderWidth: 0
			            }
			        },
			        series:[{
			        	name : '승차인원',
			        	data : onList,
			        	color : '#5CD1E5'
			        }, {
			        	name : '하차인원',
			        	data : offList,
			        	color : '#595959'
			        }]
			    });
				
				//보고서 생성을 위한 데이터 저장
				$publicDataBoard.ui.setReportData(
						"publicData", 
						"metro_month", 
						result, 
						map.id);
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 지하철승하차인구 차트 (월평균) End ********* */
	
	/** ********* 지하철승하차인구 차트 (요일 평균) Start ********* */
	$class("sop.portal.metroWeekPplnChart.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			var map = options.map;
			if(res.errCd == "0") {
				//승차
				var onList = new Array();
				for(var i = 0; i < result.weekOnList.length; i ++) {
					onList.push(parseInt(result.weekOnList[i].hour_psn_avg));
				}
				//하차
				var offList = new Array();
				for(var i = 0; i < result.weekOffList.length; i ++) {
					offList.push(parseInt(result.weekOffList[i].hour_psn_avg));
				}
				
				$("#publicMetroChart03").highcharts({
			        chart: {
			        	backgroundColor: 'white', width: 500, height: 300
			        },
			        exporting: { enabled: false },
			        title: {
			        	text : ''
			        },
			        xAxis: {
			            categories: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
			            labels: {
			                style: {
			                	fontSize: '9px;'
			                }
			        	}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			        	pointFormat: '{point.y}명'
			        },
			        plotOptions: {
			            column: {
			                borderWidth: 0
			            }
			        },
			        series:[{
			        	name : '승차인원',
			        	data : onList,
			        	color : '#5CD1E5'
			        }, {
			        	name : '하차인원',
			        	data : offList,
			        	color : '#595959'
			        }]
			    });
				
				//보고서 생성을 위한 데이터 저장
				$publicDataBoard.ui.setReportData(
						"publicData", 
						"metro_dayofweek", 
						result, 
						map.id);
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 지하철승하차인구 차트 (요일 평균) End ********* */
	
	/** ********* 버스정류장 POI Start ********* */
	$class("sop.portal.busStopPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
			//마커그룹 초기화
			publicDataBoard.options.markerGroup = [];
			console.log(res);
			if (res.errCd == "0") {
				var html = "";
				//지도영역 내 조회된 정보 목록
				for(var i = 0; i < result.length; i ++) {
					html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i].busstop_nm+"</a></li>";
				}
				$("#publicDataList").html(html);
				
				//검색된 개수
				$("#publicDataCnt").html(result.length);
				
				//해당 POI 통계정보
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/30_02.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i].x, result[i].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i];
					_marker.addTo(map.markers);
					
					var infoHtml = "";
					infoHtml += "<table style='text-align:left;white-space: nowrap;word-break:break-all;padding:5px;'>";
					infoHtml += "	<tr>";
					infoHtml += "		<th><strong>" + result[i].busstop_nm + "</strong></th>";
					infoHtml += "	</tr>";
					infoHtml += "<table>";
					_marker.bindInfoWindow(infoHtml,{autoPan: false});
					
					//마커 클릭 시
					_marker.on("click", function(result) {
						//서클 생성
						$publicDataBoard.ui.circleInfo(result);
						//인포윈도우 열기
						_marker.openInfoWindow();
						//결과 리스트 저장
						publicDataBoard.options.result = result;
					});
					
					publicDataBoard.options.markerGroup.push({
						"idx" : i,
						"marker" : _marker
					});
				}
				
				//API 로그
				if($publicDataBoard.ui.delegate.namespace == "interactiveMap") {
					setTimeout(apiLogWrite("A0", options), 2000);
				} else if($publicDataBoard.ui.delegate.namespace == "bizStatsMap") {
					setTimeout(apiLogWrite("B0", options), 2000);
				}
			} else {
				//초기화
//				$publicDataBoard.ui.reset();
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* 버스정류장 POI End ********* */
	
	/** ********* 공공데이터 목록 Start ********* */
	$class("sop.portal.publicDataList.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			$("#publicDataLeftList").html("");
			
			var html = "";
			for(var i = 0; i < result.dataList.length; i ++) {
				var data = result.dataList[i];
				//유동인구, 학교인구, 세종권역 교통흐름 정보 제외. 20180403 kkm
				if("population" != data.pub_data_id && "school" != data.pub_data_id && "cctv" != data.pub_data_id){
					html += "<li>";
					html += "	<input type='checkbox' id='rd_public_data0"+(i+1)+"' value='"+data.pub_data_id+"' />";
					html += "	<label for='rd_public_data0"+(i+1)+"'>"+data.pub_data_nm+"</label>";
					html += "</li>";
				}
			}
			$("#publicDataLeftList").html(html);
		},
		onFail : function (status) {
		}
	});
	/** ********* 공공데이터 목록 End ********* */
	
	//===================== 2017.06.26 [개발팀] kcu 공공데이터 추가 - 대전-세종간 통행흐름정보 START ==========================//
	/** ********* CCTV 목록 Start ********* */
	$class("sop.portal.cctvPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			switch(res.errCd) {
				case 0:
					var map = options.map;
					var result = res.result;
					var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
					if (publicDataBoard.options.poiList == null) {
						publicDataBoard.options.poiList = [];
					}
					publicDataBoard.options.poiList[0] = result;
					
					var type = "0";
					$(".cctvMode label").each(function() {
						if($(this).hasClass("on")) {
							type = $(this).prev().val();
						}
					});
					$publicDataBoard.ui.changeCctvDrawMode(type);
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"cctvPoi", 
							result, 
							map.id);
					break;
				case -100:
					break;
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* CCTV 목록 End ********* */
	
	/** ********* BRT 목록 Start ********* */
	$class("sop.portal.brtPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			switch(res.errCd) {
				case 0:
					var map = options.map;
					var result = res.result;
					var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
					if (publicDataBoard.options.poiList == null) {
						publicDataBoard.options.poiList = [];
					}
					publicDataBoard.options.poiList[1] = result;
					
					var type = "1";
					$(".brtMode label").each(function() {
						if($(this).hasClass("on")) {
							type = $(this).prev().val();
						}
					});
					$publicDataBoard.ui.changeBrtDrawMode(type);
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"brtPoi", 
							result, 
							map.id);
					break;
				case -100:
					break;
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* BRT 목록 End ********* */
	
	/** ********* CCTV 월별통계정보 Start ********* */
	$class("sop.portal.cctvWeekendChartInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			switch(res.errCd) {
				case 0:
					var map = options.map;
					var result = res.result;
					
					//차트데이터 가공
					var xCategories = [];
					var cctvWeekendChartInfo = {};
					var cctvTimeseriesChartInfo = {};
					var tmpMdwkDayList = []; //주중정보 
					var tmpWeekendDayList = []; //주말정보
					var tmpAvgDay = []; //평균
					var tmpAttendTimeList = []; //출근시간
					var tmpLvffcTimeList = []; //퇴근시간
					var tmpAvgTime = []; //평균시간
					
					for (var i=0; i<result.length; i++) {
						var date = result[i].base_ym;
						var year = date.substring(0,4);
						var month = date.substring(4,6);
						date = year + "-" + month;
						xCategories.push(date);
						//주중/주말 평균정보
						tmpMdwkDayList.push(Math.round(parseFloat(result[i].mdwk_day_avg_pasng_cnt)));
						tmpWeekendDayList.push(Math.round(parseFloat(result[i].weekend_day_avg_pasng_cnt)));
						tmpAvgDay.push(Math.round(parseFloat(result[i].day_avg_pasng_cnt)));
						
						//출퇴근시간대별 평균정보
						tmpAttendTimeList.push(Math.round(parseFloat(result[i].attend_ts_time_pr_avg_pasng_cnt)));
						tmpLvffcTimeList.push(Math.round(parseFloat(result[i].lvffc_ts_time_pr_avg_pasng_cnt)));
						tmpAvgTime.push(Math.round(parseFloat(result[i].time_pr_avg_pasng_cnt)));
					}
					
					//주중/주말 그래프 정보
					cctvWeekendChartInfo = {
							title : options.info.lc_nm,
							categories : xCategories,
							data : [
							    {name : "주중", data : tmpMdwkDayList, type : "line", color : "#21aaff", unit : "대수"},
							    {name : "주말", data : tmpWeekendDayList, type : "line", color : "#ff5521", unit : "대수"},
							    {name : "전체평균", data : tmpAvgDay, type : "column", color : "#ffc622", unit : "대수"}
							],
							unit : "대수"
					};
					
					//출퇴근시간대별 그래프 정보
					cctvTimeseriesChartInfo = {
							title : options.info.lc_nm,
							categories : xCategories,
							data : [
							    {name : "출근시간", data : tmpAttendTimeList, type : "line", color : "#21aaff", unit : "대수"},    
							    {name : "퇴근시간", data : tmpLvffcTimeList, type : "line", color : "#ff5521", unit : "대수"},    
							    {name : "전시간대평균",    data : tmpAvgTime, type : "column", color : "#ffc622", unit : "대수"}
							],
							unit : "대수"
					};
					
					$publicDataBoard.ui.drawChart("#weekendChart", cctvWeekendChartInfo); //주중/주말그래프
					$publicDataBoard.ui.drawChart("#rushHoursChart", cctvTimeseriesChartInfo); //출퇴근시간대별 그래프
					
					$("#weekendGraphDiv").next().show();
					$("#publicBrtWeekendGraphDiv").hide();
					$("#publicCctvWeekendGraphDiv").show();
					if (!$("#publicCctvWeekendGraphDiv").prev().find("a").hasClass("on")) {
						$("#publicCctvWeekendGraphDiv").prev().find("a").addClass("on");
					}
					
					$publicDataBoard.ui.drawCctvWeekendGraph('0');
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"weekendChart", 
							result, 
							map.id);
					break;
				case -100:
					break;
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* CCTV 월별통계정보 목록 End ********* */
	
	/** ********* CCTV 시간대별통계정보 Start ********* */
	$class("sop.portal.cctvTimeSeriesChartInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			switch(res.errCd) {
				case 0:
					var map = options.map;
					var result = res.result;
					
					//차트데이터 가공
					var timeSeriesInfo = result.timeSeriesInfo;
					var dayOfWeekInfo = result.dayOfWeekInfo;
					var cctvTimeSeriesChartInfo = {};
					var cctvDayOfWeekChartInfo = {};
					
					//카테고리 정보
					var tmpDWCategories = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
					var tmpTSCategries = [];
					for (var i=0; i<24; i++) {
						tmpTSCategries.push(i+"시");
					}
					
					
					var tmpDayOfWeekList = [];
					var tmpWeekendList = [];
					var tmpAvgTimeList = [];
					for (var i=0; i<timeSeriesInfo.length; i++) {
						switch(parseInt(timeSeriesInfo[i].weekend_div))	{
							case 1:	 //주중
								for (var k=0; k<24; k++) {
									tmpDayOfWeekList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_pasng_cnt"])));
								}
								break;
							case 2:	 //주말
								for (var k=0; k<24; k++) {
									tmpWeekendList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_pasng_cnt"])));
								}
								break;
							default: //평균
								for (var k=0; k<24; k++) {
									tmpAvgTimeList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_pasng_cnt"])));
								}
								break;
						}
					}
					
					var tmpAttendTimeList = [];
					var tmpLvffcTimeList = [];
					var tmpAllTimeList = [];
					for (var i=0; i<dayOfWeekInfo.length; i++) {
						switch(parseInt(dayOfWeekInfo[i].ts_div)) {
							case 1:		//출근시간대
								tmpAttendTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_pasng_cnt)));  //월요일
								tmpAttendTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_pasng_cnt))); //화요일
								tmpAttendTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_pasng_cnt)));  //수요일
								tmpAttendTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_pasng_cnt))); //목요일
								tmpAttendTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_pasng_cnt)));  //금요일
								tmpAttendTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_pasng_cnt)));  //토요일
								tmpAttendTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_pasng_cnt)));  //일요일
								break;
							case 2:		//최근시간대
								tmpLvffcTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_pasng_cnt)));
								tmpLvffcTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_pasng_cnt)));
								tmpLvffcTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_pasng_cnt)));
								tmpLvffcTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_pasng_cnt)));
								tmpLvffcTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_pasng_cnt)));
								tmpLvffcTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_pasng_cnt)));
								tmpLvffcTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_pasng_cnt)));
								break;
							default:	//전시간대
								tmpAllTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_pasng_cnt)));
								tmpAllTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_pasng_cnt)));
								tmpAllTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_pasng_cnt)));
								tmpAllTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_pasng_cnt)));
								tmpAllTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_pasng_cnt)));
								tmpAllTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_pasng_cnt)));
								tmpAllTimeList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_pasng_cnt)));
								break;
						}
					}
					
					//cctv 시간대별 그래프
					cctvTimeSeriesChartInfo = {
							title : options.info.lc_nm,
							categories : tmpTSCategries,
							data : [
							    {name : "주중", data : tmpDayOfWeekList, type : "line", color : "#21aaff", unit : "대수"},
							    {name : "주말", data : tmpWeekendList,   type : "line", color : "#ff5521", unit : "대수"},
							    {name : "전체평균", data : tmpAvgTimeList,   type : "column", color : "#ffc622", unit : "대수"}
							],
							unit : "대수"
					};
					
					//cctv 요일별 그래프
					cctvDayOfWeekChartInfo = {
							title : options.info.lc_nm,
							categories : tmpDWCategories,
							data : [
							    {name : "출근시간대", data : tmpAttendTimeList, type : "line", color : "#21aaff", unit : "대수"},
							    {name : "퇴근시간대", data : tmpLvffcTimeList,  type : "line", color : "#ff5521", unit : "대수"},
							    {name : "전시간대평균",  data : tmpAllTimeList,    type : "column", color : "#ffc622", unit : "대수"}
							],
							unit : "대수"
					};
					
					$publicDataBoard.ui.drawChart("#timeseriesChart", cctvTimeSeriesChartInfo); //주중/주말그래프
					$publicDataBoard.ui.drawChart("#dayOfWeekChart", cctvDayOfWeekChartInfo); //출퇴근시간대별 그래프
					
					$("#timeseriesGraphDiv").next().show();
					$("#publicBrtTimeseriesGraphDiv").hide();
					$("#publicCctvTimeseriesGraphDiv").show();
					if (!$("#publicCctvTimeseriesGraphDiv").prev().prev().find("a").hasClass("on")) {
						$("#publicCctvTimeseriesGraphDiv").prev().prev().find("a").addClass("on");
					}
					
					if ($publicDataBoard.ui.isInit) {
						$publicDataBoard.ui.drawCctvTimeseriesGraph('0');
					}
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"timeSeriesChart", 
							result, 
							map.id);
					break;
				case -100:
					break;
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* CCTV 시간대별통계정보 목록 End ********* */
	
	/** ********* BRT 월별통계정보 Start ********* */
	$class("sop.portal.brtWeekendChartInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			switch(res.errCd) {
				case 0:
					var map = options.map;
					var result = res.result;
					
					//차트데이터 가공
					var xCategories = [];
					var tmpMdwkOnList = [];  //주중 승차정보
					var tmpMdwkOffList = []; //주중 하차정보
					var tmpWeekOnList = [];  //주말 승차정보
					var tmpWeekOffList = []; //주말 하차정보
					var tmpDayAvgOnList = [];   //평균 승차정보
					var tmpDayAvgOffList = [];	 //평균 하차정보
					var tmpAttendOnList = []; //출근시간 승차정보
					var tmpAttendOffList = [];//츨근시간 하차정보
					var tmpLvffOnList = []; //퇴근시간 승차정보
					var tmpLvffOffList = []; //퇴근시간 하차정보
					var tmpTimeAvgOnList = []; //시간당 평균 승차정보
					var tmpTimeAvgOffList = []; //시간당 평균 하차정보
					
					for (var i=0; i<result.length; i++) {
						var date = result[i].base_ym;
						var year = date.substring(0,4);
						var month = date.substring(4,6);
						date = year + "-" + month;
						xCategories.push(date);
						
						tmpMdwkOnList.push(Math.round(parseFloat(result[i].mdwk_day_avg_tkcar_psn_cnt)));
						tmpMdwkOffList.push(Math.round(parseFloat(result[i].mdwk_day_avg_gff_psn_cnt)));
						tmpWeekOnList.push(Math.round(parseFloat(result[i].weekend_day_avg_tkcar_psn_cnt)));
						tmpWeekOffList.push(Math.round(parseFloat(result[i].weekend_day_avg_gff_psn_cnt)));
						tmpDayAvgOnList.push(Math.round(parseFloat(result[i].day_avg_tkcar_psn_cnt)));
						tmpDayAvgOffList.push(Math.round(parseFloat(result[i].day_avg_gff_psn_cnt)));
						tmpAttendOnList.push(Math.round(parseFloat(result[i].attend_ts_time_pr_avg_tkcar_psn_cnt)));
						tmpAttendOffList.push(Math.round(parseFloat(result[i].attend_ts_time_pr_avg_gff_psn_cnt)));
						tmpLvffOnList.push(Math.round(parseFloat(result[i].lvffc_ts_time_pr_avg_tkcar_psn_cnt)));
						tmpLvffOffList.push(Math.round(parseFloat(result[i].lvffc_ts_time_pr_avg_gff_psn_cnt)));
						tmpTimeAvgOnList.push(Math.round(parseFloat(result[i].time_pr_avg_tkcar_psn_cnt)));
						tmpTimeAvgOffList.push(Math.round(parseFloat(result[i].time_pr_avg_gff_psn_cnt)));
					}
					
					//주중 승하차정보
					var brtMdwkChartInfo = {
							title : options.info.busstop_nm,
							categories : xCategories,
							data : [
							    {name : "주중 승차", data : tmpMdwkOnList,    type : "line",   color : "#21aaff", unit : "명"},
							    {name : "주중 하차", data : tmpMdwkOffList,   type : "line",   color : "#ff5521", unit : "명"},
							    {name : "전체평균 승차", data : tmpDayAvgOnList,   type : "column", color : "#ffc622", unit : "명"},
							    {name : "전체평균 하차", data : tmpDayAvgOffList,  type : "column", color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					//주말 승하차정보
					var brtWeekChartInfo = {
							title : options.info.busstop_nm,
							categories : xCategories,
							data : [
							    {name : "주말 승차", data : tmpWeekOnList, 	   type : "line",	color : "#21aaff", unit : "명"},
							    {name : "주말 하차", data : tmpWeekOffList,   type : "line",   	color : "#ff5521", unit : "명"},
							    {name : "전체평균 승차", data : tmpDayAvgOnList,  type : "column", 	color : "#ffc622", unit : "명"},
							    {name : "전체평균 하차", data : tmpDayAvgOffList, type : "column", 	color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					//출근시간대 승하차정보
					var brtAttendChartInfo = {
							title : options.info.busstop_nm,
							categories : xCategories,
							data : [
							    {name : "출근시간 승차",	data : tmpAttendOnList,	  type : "line",	color : "#21aaff", unit : "명"},
							    {name : "출근시간 하차",	data : tmpAttendOffList,  type : "line",   	color : "#ff5521", unit : "명"},
							    {name : "전시간대평균 승차",	data : tmpTimeAvgOnList,  type : "column", 	color : "#ffc622", unit : "명"},
							    {name : "전시간대평균 하차", 	data : tmpTimeAvgOffList, type : "column", 	color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					//퇴근시간대 승하차정보
					var brtLvffChartInfo = {
							title : options.info.busstop_nm,
							categories : xCategories,
							data : [
							    {name : "퇴근시간 승차",	data : tmpLvffOnList,	  type : "line",	color : "#21aaff", unit : "명"},
							    {name : "퇴근시간 하차",	data : tmpLvffOffList,    type : "line",   	color : "#ff5521", unit : "명"},
							    {name : "전시간대평균 승차",	data : tmpTimeAvgOnList,  type : "column", 	color : "#ffc622", unit : "명"},
							    {name : "전시간대평균 하차", 	data : tmpTimeAvgOffList, type : "column", 	color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					$publicDataBoard.ui.drawChart("#brtMonthDayOfWeekChart", brtMdwkChartInfo);   	//주중 승하차정보
					$publicDataBoard.ui.drawChart("#brtMonthWeekendChart", 	 brtWeekChartInfo); 	//주말 승하차정보
					$publicDataBoard.ui.drawChart("#brtMonthOnWorkChart", 	 brtAttendChartInfo);   //출근시간 승하차정보
					$publicDataBoard.ui.drawChart("#brtMonthOffWorkChart", 	 brtLvffChartInfo); 	//퇴근시간 승하차정보
					
					$("#weekendGraphDiv").next().show();
					$("#publicCctvWeekendGraphDiv").hide();
					$("#publicBrtWeekendGraphDiv").show();
					if (!$("#publicBrtWeekendGraphDiv").prev().prev().find("a").hasClass("on")) {
						$("#publicBrtWeekendGraphDiv").prev().prev().find("a").addClass("on");
					}
					
					if ($publicDataBoard.ui.isInit) {
						$publicDataBoard.ui.drawBrtWeekendGraph("0");
					}
					
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"weekendChart", 
							result, 
							map.id);
					break;
				case -100:
					break;
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* BRT 월별통계정보 목록 End ********* */
	
	/** ********* BRT 시간대별통계정보 Start ********* */
	$class("sop.portal.brtTimeSeriesChartInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			switch(res.errCd) {
				case 0:
					var map = options.map;
					var result = res.result;
					
					//차트데이터 가공
					var timeSeriesInfo = result.timeSeriesInfo;
					var dayOfWeekInfo = result.dayOfWeekInfo;
					var	brtMdwkTimeSeriesChartInfo = {}; 	//주중시간대별 정보
					var brtWeekendTimeSeriesChartInfo = {};	//주말시간대별 정보
					var brtOnWorkDayOfWeekChartInfo = {};	//출근시간대별 정보
					var brtOffWorkDayOfWeekChartInfo = {};	//퇴근시간대별 정보
					
					//카테고리 정보
					var tmpDWCategories = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
					var tmpTSCategries = [];
					for (var i=6; i<24; i++) {
						tmpTSCategries.push(i+"시");
					}
					
					//시간대별 통계
					var tmpMdwkOnList = [];		//주중시간대별 승차정보
					var tmpMdwkOffList = []; 	//주중시간대별 하차정보
					var tmpWeekendOnList = [];	//주말시간대별 승차정보
					var tmpWeekendOffList = []; //주말시간대별 하차정보
					var tmpAvgTimeOnList = []; 	//평균 승차정보
					var tmpAvgTimeOffList = []; //평균 하차정보
					for (var i=0; i<timeSeriesInfo.length; i++) {
						switch(parseInt(timeSeriesInfo[i].weekend_div))	{
							case 1:	 //주중시간대별
								for (var k=6; k<24; k++) {
									tmpMdwkOnList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_tkcar_psn_cnt"])));
									tmpMdwkOffList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_gff_psn_cnt"])));
								}
								break;
							case 2:	 //주말시간대별
								for (var k=6; k<24; k++) {
									tmpWeekendOnList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_tkcar_psn_cnt"])));
									tmpWeekendOffList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_gff_psn_cnt"])));
								}
								break;
							default: //평균
								for (var k=6; k<24; k++) {
									tmpAvgTimeOnList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_tkcar_psn_cnt"])));
									tmpAvgTimeOffList.push(Math.round(parseFloat(timeSeriesInfo[i]["hour_"+k+"_avg_gff_psn_cnt"])));
								}
								break;
						}
					}
					
					//요일별 통계
					var tmpAttendTimeOnList = [];	//출근시간대 승차정보
					var tmpAttendTimeOffList = [];	//출근시간대 하차정보
					var tmpLvffcTimeOnList = [];	//퇴근시간대 승차정보
					var tmpLvffcTimeOffList = [];	//퇴근시간대 하차정보
					var tmpAllTimeOnList = [];		//전시간대 승차정보
					var tmpAllTimeOffList = [];		//전시간대 하차정보
					for (var i=0; i<dayOfWeekInfo.length; i++) {
						switch(parseInt(dayOfWeekInfo[i].ts_div)) {
							case 1:		//출근시간대
								tmpAttendTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_tkcar_psn_cnt)));  //월요일-출근시간대 승차
								tmpAttendTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_tkcar_psn_cnt))); //화요일-출근시간대 승차
								tmpAttendTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_tkcar_psn_cnt)));  //수요일-출근시간대 승차
								tmpAttendTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_tkcar_psn_cnt))); //목요일-출근시간대 승차
								tmpAttendTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_tkcar_psn_cnt)));  //금요일-출근시간대 승차
								tmpAttendTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_tkcar_psn_cnt)));  //토요일-출근시간대 승차
								tmpAttendTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_tkcar_psn_cnt)));  //일요일-출근시간대 승차
								
								tmpAttendTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_gff_psn_cnt)));  //월요일-출근시간대 하차
								tmpAttendTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_gff_psn_cnt))); //화요일-출근시간대 하차
								tmpAttendTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_gff_psn_cnt)));  //수요일-출근시간대 하차
								tmpAttendTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_gff_psn_cnt))); //목요일-출근시간대 하차
								tmpAttendTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_gff_psn_cnt)));  //금요일-출근시간대 하차
								tmpAttendTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_gff_psn_cnt)));  //토요일-출근시간대 하차
								tmpAttendTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_gff_psn_cnt)));  //일요일-출근시간대 하차
								break;
							case 2:		//최근시간대
								tmpLvffcTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_tkcar_psn_cnt)));  //월요일-퇴근시간대 승차
								tmpLvffcTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_tkcar_psn_cnt))); //화요일-퇴근시간대 승차
								tmpLvffcTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_tkcar_psn_cnt)));  //수요일-퇴근시간대 승차
								tmpLvffcTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_tkcar_psn_cnt))); //목요일-퇴근시간대 승차
								tmpLvffcTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_tkcar_psn_cnt)));  //금요일-퇴근시간대 승차
								tmpLvffcTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_tkcar_psn_cnt)));  //토요일-퇴근시간대 승차
								tmpLvffcTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_tkcar_psn_cnt)));  //일요일-퇴근시간대 승차
								
								tmpLvffcTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_gff_psn_cnt)));  //월요일-퇴근시간대 하차
								tmpLvffcTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_gff_psn_cnt))); //화요일-퇴근시간대 하차
								tmpLvffcTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_gff_psn_cnt)));  //수요일-퇴근시간대 하차
								tmpLvffcTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_gff_psn_cnt))); //목요일-퇴근시간대 하차
								tmpLvffcTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_gff_psn_cnt)));  //금요일-퇴근시간대 하차
								tmpLvffcTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_gff_psn_cnt)));  //토요일-퇴근시간대 하차
								tmpLvffcTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_gff_psn_cnt)));  //일요일-퇴근시간대 하차
								break;
							default:	//전시간대
								tmpAllTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_tkcar_psn_cnt)));  //월요일-전시간대 승차
								tmpAllTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_tkcar_psn_cnt))); //화요일-전시간대 승차
								tmpAllTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_tkcar_psn_cnt)));  //수요일-전시간대 승차
								tmpAllTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_tkcar_psn_cnt))); //목요일-전시간대 승차
								tmpAllTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_tkcar_psn_cnt)));  //금요일-전시간대 승차
								tmpAllTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_tkcar_psn_cnt)));  //토요일-전시간대 승차
								tmpAllTimeOnList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_tkcar_psn_cnt)));  //일요일-전시간대 승차
								
								tmpAllTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].mon_time_pr_avg_gff_psn_cnt)));  //월요일-전시간대 하차
								tmpAllTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].tues_time_pr_avg_gff_psn_cnt))); //화요일-전시간대 하차
								tmpAllTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].wed_time_pr_avg_gff_psn_cnt)));  //수요일-전시간대 하차
								tmpAllTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].thur_time_pr_avg_gff_psn_cnt))); //목요일-전시간대 하차
								tmpAllTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].fri_time_pr_avg_gff_psn_cnt)));  //금요일-전시간대 하차
								tmpAllTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].sat_time_pr_avg_gff_psn_cnt)));  //토요일-전시간대 하차
								tmpAllTimeOffList.push(Math.round(parseFloat(dayOfWeekInfo[i].sun_time_pr_avg_gff_psn_cnt)));  //일요일-전시간대 하차
								break;
						}
					}
					
					//주중시간대별 정보
					var brtMdwkTimeSeriesChartInfo = {
							title : options.info.busstop_nm,
							categories : tmpTSCategries,
							data : [
							    {name : "주중 승차", data : tmpMdwkOnList,     type : "line",   color : "#21aaff", unit : "명"},
							    {name : "주중 하차", data : tmpMdwkOffList,    type : "line",   color : "#ff5521", unit : "명"},
							    {name : "전체평균 승차", data : tmpAvgTimeOnList,  type : "column", color : "#ffc622", unit : "명"},
							    {name : "전체평균 하차", data : tmpAvgTimeOffList, type : "column", color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					//주말시간대별 정보
					var brtWeekendTimeSeriesChartInfo = {
							title : options.info.busstop_nm,
							categories : tmpTSCategries,
							data : [
							    {name : "주말 승차", data : tmpWeekendOnList, 	type : "line",		color : "#21aaff", unit : "명"},
							    {name : "주말 하차", data : tmpWeekendOffList, type : "line",   	color : "#ff5521", unit : "명"},
							    {name : "전체평균 승차", data : tmpAvgTimeOnList,  type : "column", 	color : "#ffc622", unit : "명"},
							    {name : "전체평균 하차", data : tmpAvgTimeOffList, type : "column", 	color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					//출근시간대 요일별
					var brtOnWorkDayOfWeekChartInfo = {
							title : options.info.busstop_nm,
							categories : tmpDWCategories,
							data : [
							    {name : "출근시간 승차",	data : tmpAttendTimeOnList,	 type : "line",		color : "#21aaff", unit : "명"},
							    {name : "출근시간 하차",	data : tmpAttendTimeOffList, type : "line",   	color : "#ff5521", unit : "명"},
							    {name : "전시간대평균 승차",	data : tmpAllTimeOnList,  	 type : "column", 	color : "#ffc622", unit : "명"},
							    {name : "전시간대평균 하차", 	data : tmpAllTimeOffList, 	 type : "column", 	color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					//퇴근시간대 요일별 
					var brtOffWorkDayOfWeekChartInfo = {
							title : options.info.busstop_nm,
							categories : tmpDWCategories,
							data : [
							    {name : "퇴근시간 승차",	data : tmpLvffcTimeOnList,	type : "line",		color : "#21aaff", unit : "명"},
							    {name : "퇴근시간 하차",	data : tmpLvffcTimeOffList, type : "line",   	color : "#ff5521", unit : "명"},
							    {name : "전시간대평균 승차",	data : tmpAllTimeOnList,    type : "column", 	color : "#ffc622", unit : "명"},
							    {name : "전시간대평균 하차", 	data : tmpAllTimeOffList,   type : "column", 	color : "#44db37", unit : "명"}
							],
							unit : "명"	
					};
					
					$publicDataBoard.ui.drawChart("#brtTimeSeriesDayOfWeekChart", brtMdwkTimeSeriesChartInfo);   	//주중시간대별
					$publicDataBoard.ui.drawChart("#brtTimeSeriesWeekendChart",   brtWeekendTimeSeriesChartInfo); 	//주말시간대별
					$publicDataBoard.ui.drawChart("#brtTimeSeriesOnWorkChart", 	  brtOnWorkDayOfWeekChartInfo);  	//출근시간대별
					$publicDataBoard.ui.drawChart("#brtTimeSeriesOffWorkChart",   brtOffWorkDayOfWeekChartInfo); 	//퇴근시간대별
					
					$("#timeseriesGrapDiv").next().show();
					$("#publicCctvTimeseriesGraphDiv").hide();
					$("#publicBrtTimeseriesGraphDiv").show();
					if (!$("#publicBrtTimeseriesGraphDiv").prev().prev().find("a").hasClass("on")) {
						$("#publicBrtTimeseriesGraphDiv").prev().prev().find("a").addClass("on");
					}
					
					if ($publicDataBoard.ui.isInit) {
						$publicDataBoard.ui.drawBrtTimeseriesGraph("0");
					}
					
					//보고서 생성을 위한 데이터 저장
					$publicDataBoard.ui.setReportData(
							"publicData", 
							"timeSeriesChart", 
							result, 
							map.id);
					break;
				case -100:
					break;
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* BRT 시간대별통계정보 목록 End ********* */
	
	/** ********* CCTV/BRT BASE YEAR 정보 Start ********* */
	$class("sop.portal.cctvAndBrtBaseYear.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			switch(res.errCd) {
				case 0:
					var result = res.result;
					var cctvBaseYearList = result.cctvBaseYearList;
					var brtBaseYearList = result.brtBaseYearList;
					
					//cctv 년도정보
					$("#cctvTimeSeriesYear").empty();
					$("#cctvTimeSeriesMonth").empty();
					
					//mng_s 20170823
					var year2 = "";
					
					for (var i=0; i<cctvBaseYearList.length; i++) {
						var base_ym = cctvBaseYearList[i].base_ym;
						var year = base_ym.substring(0,4);
						var month = base_ym.substring(4,6);
						
						//mng_s
						if ( i==0 ) {
							$("#cctvTimeSeriesYear").append("<option value='"+year+"'>"+year+"년</option>");
						}
						
						if ( i!=0 && year != year2 ) {
							$("#cctvTimeSeriesYear").append("<option value='"+year+"'>"+year+"년</option>");
						}
						
						$("#cctvTimeSeriesMonth").append("<option value='"+month+"'>"+month+"월</option>");
						
						year2 = year;
						
					}
					
					//brt 년도정보
					$("#brtTimeSeriesYear").empty();
					$("#brtTimeSeriesMonth").empty();
					
					//mng_s 20170823
					var year3 = "";
					
					for (var i=0; i<brtBaseYearList.length; i++) {
						var base_ym = brtBaseYearList[i].base_ym;
						var year = base_ym.substring(0,4);
						var month = base_ym.substring(4,6);
						
						//mng_s
						if ( i==0 ) {
							$("#brtTimeSeriesYear").append("<option value='"+year+"'>"+year+"년</option>");
						}
						if ( i!=0 && year != year2 ) {
							$("#brtTimeSeriesYear").append("<option value='"+year+"'>"+year+"년</option>");
						}
						
						$("#brtTimeSeriesMonth").append("<option value='"+month+"'>"+month+"월</option>");
					}
					
					break;
				case -100:
					break;
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* CCTV/BRT BASE YEAR 정보 End ********* */
	//===================== 2017.06.26 [개발팀] kcu 공공데이터 추가 - 대전-세종간 통행흐름정보 END ==========================//
}(window, document));