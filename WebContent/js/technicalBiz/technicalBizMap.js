/**
 * 대화형 통계지도 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/10  초기 작성
 * author : 권차욱, 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$technicalBizMap = W.$technicalBizMap || {};

	$(document).ready(
		function() {	
			$technicalBizMap.ui.createMap("mapRgn_1", 0);
			$technicalBizMap.event.setUIEvent();
			//var mapNavi1 = new mapNavigation.UI();
			//mapNavi1.firstBoolean = true;
			//mapNavi1.create("mapNavi_1", 1, $technicalBizMap.ui);
			// mng_s 20180412_김건민 
			//commonPopupObj.openWin("technicalBiz_laypopup");
			// mng_s 20180412_김건민
			$(".dimAreaScroll").mCustomScrollbar(); 	
	});
	
	$technicalBizMap = {
			noReverseGeoCode : false	
	};
	
	$technicalBizMap.Popup = {
			show : function () {
				this.blockUI = document.createElement("DIV");
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
                this.popupUI.style.paddingBottom='40px';
                this.popupUI.style.width ='400px';
                this.popupUI.style.top ='50%';
                this.popupUI.style.left = '50%';
                this.popupUI.style.zIndex = "11000";

				var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
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
	
	$technicalBizMap.ui = {
			namespace : "technicalBizMap",
			mapList : [],
			curMapId : 0,
			curDropParams : [],
			dropBtnInfo : [],	//==>임시변수
			introMarkerManageInfo : [],
			sigunguMarkers : null,
			sidoPieChartMarkers : null, //시도별 기술업종현황 파이차트마커 그룹
			heatMapList : [],
			reportPopup : null,
			industryPopup : null,
			dataTypeList : [],
			markerGroup1 : null,
			markerGroup2 : null,
			markerGroup3 : null,
			markerGroup4 : null,
			industryMarkerGroup : null,
			indsutryPopupInfo : null,
			isLocalGov : false,
			whiteMap : false,
			//2017.10.23 개발팀 변수 추가
			lqLayerInfo : null,
			searchDetailLayer : null,
			compareAreaSelectedCnt : 5,   //2018.01.18 [개발팀] 비교지역 후보지 선택 최대 갯수
			compareAreaSelectedList : [], //2018.01.18 [개발팀]
			compareAreaSelectedColorList : [], //2018.01.22 [개발팀]
			
			/**
			 * 
			 * @name         : setDataType
			 * @description  : 현재 조회한 데이터타입을 설정한다.
			 * @date         : 2016. 01. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setDataType : function(mapId, type) {
				if (this.dataTypeList != null && 
					Object.prototype.toString.call(this.dataTypeList) === "[object Array]") {
					this.dataTypeList[mapId] = type;
				}
			},
			
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
				map.createMap($technicalBizMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8, //9->8
					measureControl : false,
					miniMap : true,
					statisticTileLayer: true
				});
				map.gMap.setMinZoom(2);
				
				map.id = seq;
				map.addControlEvent("drop", {accept : ".dragItem"});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");	
				
				//미니맵 추가
				//$technicalBizDataBoard.ui.createMiniMap(map, seq);
				
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($technicalBizMap.ui);
				map.legend = legend;
				legend.createLegend();
				//작업부분 끝
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map);
				btnInfo.delegate = $technicalBizMap;
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					techPoiControl : true,
					techSettingControl : true,
					mapTypeControl : true,
					bizZoomControl : true
				});	
				
				//공유
				var shareInfo = new share.shareInfo(map, $technicalBizMap.ui);
				map.shareInfo = shareInfo;
				
				map.tileLayer = map.gMap.statisticTileLayer;
				map.blankLayer = new sop.BuildingLayer();
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				//갤러리 등록
				$galleryAdd.delegate = this;
				
				
				map.gMap.whenReady(function() {
					map.createHeatMap();
				});
				
			},
			
			/**
			 * 
			 * @name         : doAnalysisShareInfo
			 * @description  : 공유된 정보를 분석하여, 통계정보를 조회한다.
			 * @date         : 2015. 11. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param key    : 공유ID
			 */
			doAnalysisShareInfo : function (type, data) {
				if (type.length == 0 || data.length == 0) {
					var mapNavi1 = new mapNavigation.UI();
					mapNavi1.firstBoolean = true;
					mapNavi1.create("mapNavi_1", 1, $technicalBizMap.ui);	
					return false;
				}
				
				var map = this.mapList[0];
				var mapNavi1 = new mapNavigation.UI();
				mapNavi1.create("mapNavi_1", 1, $technicalBizMap.ui);
				$("#technicalBiz_laypopup").hide();
				
				//지자체
				if (type == "localgov") {
					if (data.code != undefined && !isNaN(parseInt(data.code))) {
						if (data.isbnu == undefined || data.isbnu == "false") {
							this.isLocalGov = true;
							
							//header/footer hide
							$(".headerEtc").hide();
							$(".headerContents").hide();
							$("#footer").hide();
							$(".containerBox").css({
								"top" : "0px",
								"height" : "100%"
							});
							$("#bookmarkBtn").hide();
							$("#shareBtn").hide();
							$(".icon01").hide();
							$(".icon02").hide();
							
							//2018.01.02 [개발팀]
							$("#qmdlList02").hide();
							$("#qmdlList02").parent().hide();
							
							
							//성남시 경계호출
							if (data.code.indexOf("31020") != -1) {
								$technicalBizMap.noReverseGeoCode = true;
								this.doSungNamBoundary();
							}
							
						}else if (data.isbnu == "true") { //2017.05.02 성남시  isbnu = true 일 경우
							$(".headerEtc").show();
							$(".headerContents").show();
							$("#footer").show();
						}
					}
					return;
				}
				
				data["param_info"] = JSON.parse(data.param_info);
				if (data.param_info != undefined) {
					$technicalBizLeftMenu.ui.curSelectedStatsType = data.param_info.type;
					switch (data.param_info.type) {
						case "sido": //시도별 기술업종현황
							this.doSidoIntro();
							setTimeout(function() {
								$("#view1").find(".tb_report").parent().show();
								if (data.param_info.paramInfo.adm_cd != undefined) {
									var options = {
											params : {
												adm_cd : data.param_info.paramInfo.adm_cd,
												adm_nm : data.param_info.paramInfo.adm_nm,
												map : map
											}
									};
									$technicalBizDataBoard.ui.updateDataBoard(options, "sido");
								}
							}, 500);
							break;
						case "sigungu" : //시군구별 기술업종현황
							this.doCompanySidoIntro(function() {
								if ($technicalBizDataBoard.ui.mapData[map.id].options.dataBoard == undefined) {
									$technicalBizDataBoard.ui.mapData[map.id].options.dataBoard = {};
								}
								if (data.param_info.paramInfo.theme_cd == undefined) {
									data.param_info.paramInfo.theme_cd = "00";
								}
								$technicalBizDataBoard.ui.mapData[map.id].options.dataBoard.jobAreaThemeCd = data.param_info.paramInfo.theme_cd;
								$technicalBizMap.ui.doReqSidoCompany(data.param_info.paramInfo.theme_cd, data.param_info.paramInfo.theme_nm, "0", function() {
									if (data.param_info.paramInfo.adm_cd != undefined) {
										for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
											var group = $technicalBizMap.ui.sigunguMarkers[i];
											if (group.sido_cd == data.param_info.paramInfo.adm_cd.substring(0,2)) {
												for (var k=0; k<group.markers.length; k++) {
													var marker = group.markers[k];
													if (marker.options.adm_cd = data.param_info.paramInfo.adm_cd) {
														marker.fire("click");
														if (data.param_info.paramInfo.viewType != undefined) {
															$("#techLegend_"+data.param_info.paramInfo.viewType).click();
														}
														break;
													}
												}
												break;
											}
										}
									}									
								})
							});
							break;
						case "density": //업종밀집도변화
							$technicalBizMap.ui.doCompanyDensityIntro();
							setTimeout(function() {
								map.mapMove([data.param_info.mapInfo.center[0], data.param_info.mapInfo.center[1]], data.param_info.mapInfo.zoomlevel);
								var adm_cd = null;
								if (data.param_info.paramInfo.adm_cd != undefined) {
									adm_cd = data.param_info.paramInfo.adm_cd;
								}
								
								var themeCd = "00";
								if (data.param_info.paramInfo.theme_cd != undefined) {
									themeCd = data.param_info.paramInfo.theme_cd;
								}
								
								var options = {
										params : {
											adm_cd : adm_cd,
											adm_nm : data.param_info.paramInfo.adm_nm,
											map : map,
											year : data.param_info.paramInfo.year
										},
										dataBoard : {
											jobAreaThemeCd : themeCd,
											themeCd : themeCd,
											themeNm : data.param_info.paramInfo.theme_nm
										},
										etc : {
											themeCd : data.param_info.paramInfo.theme_cd,
											curPolygonCode : $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId].curPolygonCode,
											year : data.param_info.paramInfo.year,
										}
								} 
								$technicalBizDataBoard.ui.updateDataBoard(options, "density");
								$("#densityBaseYearList > li > a").each(function() {
									if ($(this).hasClass("on")) {
										$(this).removeClass("on");
									}
									if ($(this).attr("id") == "densityBaseYear_"+data.param_info.paramInfo.year) {
										$(this).addClass("on");
									}
								})
							}, 300);
							break;
						case "supply": //지원시설현황
							if (data.param_info.paramInfo.adm_cd == "00") {
								this.doSupplyFacilitiesIntro(true); //2017.05.02
							}else {
								var layer = {
										feature : {
											properties : {
												adm_cd : data.param_info.paramInfo.adm_cd,
												adm_nm : data.param_info.paramInfo.adm_nm,
												x : data.param_info.mapInfo.center[0],
												y : data.param_info.mapInfo.center[1]
											}
										}
								};
								this.doSupplyDetailRegionInfo(layer, map);
								$technicalBizDataBoard.event.dataBoardOpen();
							}
							break;
						case "industry": //산업단지현황
							//산업단지 경계일 경우
							if (data.param_info.paramInfo.complex_no != undefined) {
								var options = {
										params : data.param_info.paramInfo
								};
								options.params["map"] = map;
								
								this.clearIntroData(map);
								$technicalBizMap.noReverseGeoCode = true;
								$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
								$technicalBizDataBoard.ui.doComplexDetailInfo(options, data.param_info.paramInfo);
								$technicalBizDataBoard.ui.industryDetailClick(options, function() {
									for (var i=0; i<$technicalBizMap.ui.industryMarkerGroup.length; i++) {
										var markerGroup = $technicalBizMap.ui.industryMarkerGroup[i];
										markerGroup.eachLayer(function(marker) {
											if (marker.info.complex_no == data.param_info.paramInfo.complex_no) {
												map.mapMove([marker.info.x_coor, marker.info.y_coor], map.zoom);
												marker.fire("click");
											}
										});
									}
								});
								$technicalBizDataBoard.event.dataBoardOpen();
							}else {
								//전국시도
								if (data.param_info.paramInfo.adm_cd == "00") {
									this.doIndustrialComplexIntro(true); //2017.05.02
								}else {
									var layer = {
											feature : {
												properties : {
													adm_cd : data.param_info.paramInfo.adm_cd,
													adm_nm : data.param_info.paramInfo.adm_nm,
													x : data.param_info.mapInfo.center[0],
													y : data.param_info.mapInfo.center[1]
												}
											}
									};
									this.doIndustryDetailRegionInfo(layer, map);
									$technicalBizDataBoard.event.dataBoardOpen();
								}
							}
							break;
						case "lq" : 

							var param = data.param_info;
							$("#mapDataStandard").show()
							if(param.paramInfo.standard == "worker"){
								$("#standardButton").addClass("off");
							}
							$("#lqInfoYearSettingList > li > a").removeClass("on");
							$("#lqInfoYear_"+param.paramInfo.year).addClass("on");
							
							
							$("#technicalDbTabs > a").removeClass("on");
							$("#technicalDbTab_" +param.paramInfo.techbiz_class_cd.substring(0,2)).addClass("on");
							$technicalBizDataBoardApi.request.getInnerTechCd(param.paramInfo.techbiz_class_cd,"subTechnicalList");
							
							
							if(param.paramInfo.adm_cd == "00"){
								$technicalBizMap.ui.doReqAllLq(param.paramInfo.techbiz_class_cd,'','',param.paramInfo.base_region,param.paramInfo.standard);
								
							}else{
								var map = this.mapList[this.curMapId];
								var subStringLength = 0;
								if(data.param_info.paramInfo.adm_cd.length == 5){
									subStringLength = 2;
								}else{
									subStringLength = 5;
								}
								
								
								$("#technicalLqDivAreaBox").data("admcd",data.param_info.paramInfo.adm_cd.substring(0,subStringLength));
								var layer = {
										feature : {
											properties : {
												adm_cd : data.param_info.paramInfo.adm_cd.substring(0,subStringLength),
												adm_nm : '',
												x : data.param_info.mapInfo.center[0],
												y : data.param_info.mapInfo.center[1]
											}
										}
								};
								
							
								$technicalBizMap.ui.doGetSggBookMarkLq(param.paramInfo.adm_cd,'',param.paramInfo.techbiz_class_cd,map.id,layer,param.paramInfo.yearMTab,param.paramInfo.yearSubTab);
							}
							
							
							break;
						case "search" : 
							var param = data.param_info.paramInfo;
							
							if(param.idx == 0){
								var option = {
										lq_base_region	: "country",
										techbiz_class_cd : param.searchOption.techbiz_class_cd,
										selectInfoType : param.searchOption.selectInfoType,
										option1 : param.searchOption.option1, 
										option2 : param.searchOption.option2,
										param : param.searchOption,
										is_contain_bizfac : param.searchOption.is_contain_bizfac,
										is_contain_induscom : param.searchOption.is_contain_induscom,
										afterCheckBox : param.selectCheckBox,
										afterSelectTabl : param.selectTab
								}
								var callback = function(){
									$technicalBizMap.ui.searchLqSgg(option)
								}
								$technicalBizLeftMenu.ui.doBookMarkSigunguIntro(callback);
								var dataBoard = $technicalBizDataBoard.ui;
								var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
								$technicalBizMap.ui.setTitle("조건별 지역 찾기", viewId);		
								$technicalBizMap.ui.whiteMap = true;
								
								
							}else{
								
								var option = {
										lq_base_region	: "country",
										techbiz_class_cd : param.searchOption.techbiz_class_cd,
										selectInfoType : param.searchOption.selectInfoType,
										option1 : param.searchOption.option1, 
										option2 : param.searchOption.option2,
										param : param.searchOption,
										is_contain_bizfac : param.searchOption.is_contain_bizfac,
										is_contain_induscom : param.searchOption.is_contain_induscom,
								}
								$technicalBizDataBoard.ui.searchOption = option;
								
								$("#mapDataStandard").show()
								
								if(param.standard == "worker"){
									$("#standardButton").addClass("off");
								}
								
								var layer = {
										feature : {
											properties : {
												adm_cd : data.param_info.paramInfo.adm_cd.substring(0,subStringLength),
												adm_nm : '',
												x : data.param_info.mapInfo.center[0],
												y : data.param_info.mapInfo.center[1]
											}
										}
								};
								
								$technicalBizDataBoard.ui.searchDetailAreaBookMark('25010','대전광역시 동구',layer,param.tabMIdx,param.tabSIdx);
							}
							
							
							
							break;
						default:
							break;
					}
				}
				
				return true;
			},
			
			/**
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function(type) {
				var ck = $(".tb_sizing").hasClass("on"); 
				if(!ck){
					$(".tb_sizing").addClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
					$("header").css({"height":"10px", "width":"100%"}); 
					$(".headerEtc, .gnb, .headerContents form").hide();
					$(".headerContents h1").css({"height":"10px"});
					$(".headerContents h1 img").hide();
					$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
				}else{
					$(".tb_sizing").removeClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png");
					$("header").css({"height":"104px", "width":"970px"}); 
					$(".headerEtc, .gnb, .headerContents form").show();
					$(".headerContents h1").css({"height":"78px"});
					$(".headerContents h1 img").show();
					$(".containerBox").css({"height":"calc(100% - 104px)", "top":"104px"});
				}
				
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].update();
					}
				}
			},
			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doClearMap : function(type) {
				$technicalBizMap.noReverseGeoCode = false;
				this.curMapId = parseInt(type)-1;
				if (this.mapList.length > 0) {
					var map = this.mapList[this.curMapId];
					map.clearDataOverlay();
					map.drawControl.removeOverlay();
					map.legend.legendInit();
					var markerGroup = this.introMarkerManageInfo[map.id];
					if (markerGroup != undefined) {
						for (var i=0; i<markerGroup.markers.length; i++) {
							var marker = markerGroup.markers[i].marker;
							marker.remove();
						}
						markerGroup = undefined;
					}
				}
				this.dropBtnInfo[this.curMapId] = [];
				
				if (this.sigunguMarkers != null && this.sigunguMarkers.length > 0) {
					for (var i=0; i<this.sigunguMarkers.length; i++) {
						var markers = this.sigunguMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
					this.sigunguMarkers = null;
				}
				
				if (this.sidoPieChartMarkers != null && this.sidoPieChartMarkers.length > 0) {
					for (var i=0; i<this.sidoPieChartMarkers.length; i++) {
						this.sidoPieChartMarkers[i].remove();
					}
					this.sidoPieChartMarkers = null;
				}
				
				this.doSupplyMarkerClear();
				this.doIndustryMarkerClear();
				
				this.heatMapList[this.mapList[this.curMapId].id] = null;
				this.dataTypeList[this.curMapId] = null;
				
				
				//데이터보드 초기화
				$technicalBizDataBoard.ui.reset(this.curMapId);
				//2017.12.12 [개발팀] 접근성 조치
				//$publicDataBoard.ui.remove(this.curMapId);
				//$mydataDataBoard.ui.remove(this.curMapId);
				
				//초기화한 지도정보와 매핑되는 버튼 Effect 수정
				$technicalBizLeftMenu.ui.updateSearchBtnEffect("", this.curMapId);
				$("#view"+type).find(".tb_report").parent().show();
				this.setTitle("아래 메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요.", type);
				
				//2017.05.02 성남시뷰에서 초기화시 성남시 경계가 안나오는 문제
				if (this.isLocalGov) {
					$technicalBizMap.noReverseGeoCode = true;
					var map = this.mapList[this.curMapId];
					if(map.geojson) {
						map.geojson.remove();
					}
					setTimeout(function() {
						$technicalBizMap.ui.doSungNamBoundary();
					}, 200);
					
				}
			},
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2016. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShare : function(type) {
				this.curMapId = parseInt(type)-1;
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var map = this.mapList[this.curMapId];
				if(shareInfo == null) {
					messageAlert.open("알림", "공유할 수 없는 데이터입니다.");
				} else {
					if (shareInfo.checkShare("SHARE")) {
						var options = $technicalBizDataBoard.ui.mapData[map.id].options;
						var shareData = shareInfo.shareUrlInfo;
						var title = "";
						var veiwType = "";
						for (var i=0; i<shareData.length; i++) {
							//2016.10.25 lbdms 캡쳐를 위한 정보 수정
							if (shareData[i].params != undefined) {
								if (shareData[i].params.mapInfo != undefined) {
									shareData[i].params.mapInfo.center = map.center;
									shareData[i].params.mapInfo.zoomlevel = map.zoom;
								}
							}
							
							if (options.params != undefined) {
								for (var p in options.params) {
									if (p != "map") {
										if (options.params[p] != undefined) {
											shareData[i].params.paramInfo[p] = options.params[p];
										}
									}
								}
							}
							
							switch (shareData[i].params.type) {
								case "sido":
									title = "시도별 기술업종현황";
									break;
								case "sigungu":
									title = "시군구별 기술업종현황";
									if ($("#techLegend_color").hasClass("on")) {viewType = "color";}
									else {
										viewType = "bubble";
									} 
									shareData[i].params.paramInfo["viewType"] = viewType;
									break;
								case "density":
									title = "업종밀집도변화";
									shareData[i].params.paramInfo["theme_cd"] = options.dataBoard.themeCd;
									shareData[i].params.paramInfo["theme_nm"] = options.dataBoard.themeNm;
									break;
								case "supply":
									title = "지원시설현황";
									break;
								case "industry":
									title = "산업단지현황";
									break;
							}
						}
						shareInfo.doShare(title, "TECH");
					}
				}
				
			},
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function(type, srvType) {
				this.curMapId = parseInt(type)-1;
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var map = this.mapList[this.curMapId];
				
				if(shareInfo == null) {
					messageAlert.open("알림", "저장할 수 없는 데이터입니다.");
				} else {
					if (shareInfo.checkShare("BMARK", srvType)) {
						var options = $technicalBizDataBoard.ui.mapData[map.id].options;
						var shareData = shareInfo.shareUrlInfo;
						var title = "";
						for (var i=0; i<shareData.length; i++) {
							
							//2017.02.22 이미지캡쳐 수정
							var captureTargetId = "#mapRgn_"+type;
							
							//2016.10.25 lbdms 캡쳐를 위한 정보 수정
							if (shareData[i].params != undefined) {
								if (shareData[i].params.mapInfo != undefined) {
									shareData[i].params.mapInfo.center = map.center;
									shareData[i].params.mapInfo.zoomlevel = map.zoom;
								}
								//2017.02.22 이미지캡쳐 수정
								shareData[i].params["mapCaptureId"] = captureTargetId;
							}
							
							if (options.params != undefined) {
								for (var p in options.params) {
									if (p != "map") {
										if (options.params[p] != undefined) {
											shareData[i].params.paramInfo[p] = options.params[p];
										}
									}
								}
							}
							
							switch (shareData[i].params.type) {
								case "sido":
									title = "시도별 기술업종현황";
									break;
								case "sigungu":
									title = "시군구별 기술업종현황";
									if ($("#techLegend_color").hasClass("on")) {viewType = "color";}
									else {
										viewType = "bubble";
									} 
									shareData[i].params.paramInfo["viewType"] = viewType;
									break;
								case "density":
									title = "업종밀집도변화";
									shareData[i].params.paramInfo["theme_cd"] = options.dataBoard.themeCd;
									shareData[i].params.paramInfo["theme_nm"] = options.dataBoard.themeNm;
									break;
								case "supply":
									title = "지원시설현황";
									break;
								case "industry":
									title = "산업단지현황";
									break;
								case "lq" : 
									title = "업종별 입지계수";
									if(shareData[i].params.paramInfo["adm_cd"] !="00" ){
										var yearMTab = '11';
										var yearSubTab = '00';
										var dbTabs = $("#technicalYearDbTabs >  a");
										var dbSubTabs = $("#subTechnicalYearList > li");
										
										for(var j = 0; j < dbTabs.length; j++){
											if($(dbTabs[j]).hasClass("on")){
												yearMTab = $(dbTabs[j]).data('name');
											}
										}
										
										for(var j = 0; j < dbSubTabs.length;j++){
											if($(dbSubTabs[j]).find("a").hasClass("on")){
												var strId = $(dbSubTabs[j]).attr("id");
												yearSubTab =  strId.split("_")[1];
											}
										}
										
										shareData[i].params.paramInfo["yearMTab"] = yearMTab.toString();
										shareData[i].params.paramInfo["yearSubTab"] = yearSubTab.toString();
									}
									
									break;
								case "search" : 
									title = "지역 검색";
									//체크 박스 및 선택 탭 추가 
									var checkedBox = new Array();
									var checkBoxList = $("#searchTechBizCheckBoxList > a");
									for(var j=0; j < checkBoxList.length; j++ ){
										if($(checkBoxList[j]).hasClass("on")){
											checkedBox.push(j);
										}
									}
									
									var techbizSearchTabList = $("#techbizSearchTabList > a");
									var selectTechBizTab = 0;
									for(var j = 0 ; j < techbizSearchTabList.length; j++){
										if($(techbizSearchTabList[j]).hasClass("on")){
											selectTechBizTab = j;
										}
									}
									shareData[i].params.paramInfo["selectCheckBox"] = checkedBox;
									shareData[i].params.paramInfo["selectTab"] = selectTechBizTab;
									//체크 박스 및 선택 탭 추가  종료
									if(shareData[i].params.paramInfo["idx"] == 1){
										var standard = "company";
										if($("#standardButton").hasClass("off")){
											standard = "worker";
										}
										
										var mTab = $(".searchDetailStatsInfoTab02");
										var sTab = $(".searchDetailStatsInfoTab03");
										var tabMIdx = 0;
										var tabSIdx = 0;
										for(var j = 0; j < mTab.length; j++){
											if($(mTab[j]).hasClass("on")){
												tabMIdx = j;
											}
										}
										if(tabMIdx !=3){
											for(var j = 0; j < sTab.length; j++){
												if($(sTab[j]).hasClass("on")){
													tabSIdx = j;
												}
											}
										}
										
										
										shareData[i].params.paramInfo["tabMIdx"] = tabMIdx;
										shareData[i].params.paramInfo["tabSIdx"] = tabSIdx;
										shareData[i].params.paramInfo["standard"] =standard;
										
									}
									
									break;
							}
						}
						
						//갤러리 등록일 경우
						if (srvType != undefined && srvType != "TECH") {
							switch (srvType) {
								case "gallary":
									var captureTargetId = "#mapRgn_"+type;
									$galleryAdd.map = map;
									$galleryAdd.makeImageURL("TECH", captureTargetId);
									break;
								case "report":
									this.reportPopup.$reportFormEvent.UI.makeImageURL("TECH");
									break;
							}
							return;
						} 
						
						var currentdate = new Date(); 
					    var datetime = currentdate.getFullYear() + "-"
					    			+ (currentdate.getMonth()+1)  + "-" 
					    			+ currentdate.getDate() + " "
					                + currentdate.getHours() + ":"  
					                + currentdate.getMinutes() + ":" 
					                + currentdate.getSeconds();
					    
						$("#savesubj").val(title);
						$("#savedate").val(datetime);
						
						$(".deem").show();
						$("#myGalleryPop").hide();
						$("#bookmarkdlg").show();
					}
				}
			},
			
			/**
			 * 
			 * @name         : shareToKakaoStory
			 * @description  : 카카오스토리 공유를 수행한다.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param		 : 
			 * @param    	 : 
			 */
			shareToKakaoStory : function() {
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var linkUrl = $("#sharedlg").find($("input")).val();
				shareInfo.doShareToKakaoStory(linkUrl);
			},
			
			
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 데이터 세팅
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @param  res 결과데이터
			 * @param  options  기타데이터
			 */
			reportDataSet : function(mapId) {
				this.curMapId = parseInt(mapId)-1;
				var map = this.mapList[this.curMapId];
				
				if ($technicalBizDataBoard.ui.chartDataList[map.id] == undefined || 
						$technicalBizDataBoard.ui.mapData[map.id].options.params == undefined) {
					messageAlert.open("알림", "보고서 출력은 데이터보드 출력 후 이용할 수 있습니다.");
					return;
				}
				
				$technicalBizMap.ui.reportPopup = 
					window.open("/js/technicalBiz/report/reportForm.jsp", "reportPrint","width=850, height=700, scrollbars=yes");
			},
			
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 3o. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				var map = this.mapList[this.curMapId];
				var mapType = "technicalBizMap";
				var divId = "#mapRgn_" + (map.id + 1);
				var adm_nm, chart, legend, theme_cd, origin, companyObj, subTitle, dataType, mapData, options, poiData, chartId, chartLegend;
				var param = {};
				var chart = [];
				/*var menuType = {
						"sido"			: 0,	// 시도별 기술업종 현황
						"sigungu"		: 1,	// 시군구별 기술업종 현황
						"density"		: 2,	// 업종밀집도 변화
						"supply"		: 3,	// 지원시설 조회
						"industry"		: 4,	// 산업시설 조회
				};*/
				var menuType = {
						"sido"			: 0,	//시도별 기술업종 현황
						"sigungu"		: 1,	//시군구별 기술업종 현황
						"density"	 	: 2,	//업종밀집도 변화
						"lq"			: 3,	//업종별 입지계수 지도			
						"search"		: 4,	//조건별 지역찾기
						"supply" 	 	: 5,	//지원시설 조회
						"industry"		: 6,		//산업단지 조회
						  
				};
				
				var options = $technicalBizDataBoard.ui.mapData[map.id].options;
				dataType = $technicalBizLeftMenu.ui.curSelectedStatsType;
				switch(menuType[$technicalBizLeftMenu.ui.curSelectedStatsType]) {
					case 0:
						//시도별 기술업종 현황
						mapData = $technicalBizDataBoard.ui.chartDataList[map.id];
						adm_nm = options.params.adm_nm;
						if (adm_nm == undefined) {
							adm_nm = "전국";
						}
						param = {
							title : "시도별 기술업종 현황" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							year : $(".areaBox>span").html(),
							featureType: options.params.featureType,
							searchClassNm : "기술업종("+adm_nm+")",
						};
						
						for (var i=1; i<=4; i++) {
							if ($("#sidoFeatureChartArea0"+i).find(".posb").is(":visible")) {
								chartLegend = $("#sidoFeatureChartArea0"+i).find(".posb").clone(); //2017.03.13 pdf저장 이슈
								break;
							}
						}
						
						//2017.11.24 개발팀 수정
						/*var sidoFeatureChartList = $(".sidoFeatureChart");
						var chartIdx = null;
						for (var i=0; i<=sidoFeatureChartList.length; i++) {
							if($(sidoFeatureChartList[i]).is(":visible")){
								console.log(i +"번째 담청");
								chartIdx = i;
							} 
						}*/
						
						//ChangeEconomyChart
						var economyChartList = $("#ChangeEconomyChart > a");
						var selectTabText = "";
						for(var i = 0; i < economyChartList.length; i++){
							if($(economyChartList[i]).hasClass("on")){
								selectTabText =  $(economyChartList[i]).text();
							}
						}
							
						if($("#sidoFeatureChartArea03").is(":visible")){
							chart = [
							    {
							    	title : adm_nm + " " + "업종별 입지계수 현황", 
							    	data : getChartSvgData("#sidoFeatureChart03"), //2017.03.13 pdf저장 이슈
							    	chartTab : 0
							    },
							    {
							    	title : adm_nm + " " + "경제총조사 현황 "+ selectTabText,
							    	data : getChartSvgData(".sidoEconomyChart"), //2017.03.13 pdf저장 이슈
							    }
							];
							
							/*chartLegend = $("#sidoFeatureChartArea03").find(".ltListBox").clone();*/
							/*chartLegend = $("#techBizGraphList").clone();*/
						}else{
							chart = [
							    {
							    	title : adm_nm + " " + "업종별 특성정보", 
							    	data : getChartSvgData(".sidoFeatureChart"), //2017.03.13 pdf저장 이슈
							    	chartTab : 1
							    },
							    {
							    	title : adm_nm + " "+ "경제총조사 현황 " + selectTabText ,
							    	data : getChartSvgData(".sidoEconomyChart"), //2017.03.13 pdf저장 이슈
							    }
							];
						}
							
					
						/*chart = [
						    {
						    	title : adm_nm + " " + "업종별 특성정보", 
						    	data : getChartSvgData(".sidoFeatureChart"), //2017.03.13 pdf저장 이슈
						    },
						    {
						    	title : adm_nm + " " + "경제총조사 현황",
						    	data : getChartSvgData(".sidoEconomyChart"), //2017.03.13 pdf저장 이슈
						    }
						];*/
						//2017.11.24 개발팀 수정 종료
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						break;
					case 1:
						//시군구별 기술업종 현황
						mapData = $technicalBizDataBoard.ui.chartDataList[map.id];
						adm_nm = $technicalBizDataBoard.ui.mapData[map.id].options.params.adm_nm;
						
						var seachTitle = "";
						//사업체수
						if ($("#corp_cnt").hasClass("on")) {
							seachTitle = $("#corp_cnt").html();
						}
						//사업체비율
						else if ($("#corp_per").hasClass("on")) {
							seachTitle = $("#corp_per").html();
						}
						//거주인구
						else if ($("#resid_ppltn_cnt").hasClass("on")) {
							seachTitle = $("#resid_ppltn_cnt").html();
						}
						//종사자수
						else if ($("#worker_cnt").hasClass("on")) {
							seachTitle = $("#worker_cnt").html();
						}else {
							seachTitle = $("#avg_worker_cnt").html();
						}
						
						param = {
							title : "시군구별 기술업종 현황" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							year : $(".areaBox>span").html(),
							searchClassNm : $("#sigunguTabs>a.on").html() +" "+seachTitle+ " ("+adm_nm+")" ,
							searchTypeNm : $("#sigunguRankTypes>a.on").html()
						};
						
						if($("#sigunguDbTabs > a").eq(0).hasClass("on")){
							var currentCharts = ['#sigunguClassChart01', '#sigunguClassChart02','#sigunguClassChart03','#sigunguClassChart04']; //2017.03.13 pdf저장 이슈
							var title = "";
							for(var i=0; i<currentCharts.length; i++){
								if(c = currentCharts[i]){
									if (i==0 || i==2) {
										if(i == 0 ){
											title = adm_nm + " 기술업종 사업체 현황" + " ("+adm_nm+")";
										}else{
											title = adm_nm.split(" ")[0] + " 기술업종 사업체 현황" + " ("+adm_nm+")";
										}
									}else {
										if(i == 1 ){
											title = adm_nm.split(" ")[0] + " 기술업종 종사자 현황" + " ("+adm_nm+")";
										}else{
											title = adm_nm + " 기술업종 종사자 현황" + " ("+adm_nm+")";
										}
									}
									var legend = $(c).next(".typelabel").clone();
									/*var legend = $(c).next(".typelabel:visible").clone();*/
									var data = getChartSvgData(c);
									chart.push({title:title, data:data, legend: legend});
								}
							}
						}else{
							var currentCharts = ["#sigunguLctChart"];
							var division = "";
							
							if($("#sigunguLctTab > .noneAreaBox > .dbTabs > a").eq(0).hasClass("on")){
								division = "전국 대비";
							}else{
								division = "시도 대비";
							}
							
							var title = division + " 입지계수 ";
							var data = getChartSvgData(currentCharts[0]);
							chart.push({title : title , data : data});
							
						}
						// 시군구 내 분류별 사업체 현황정보, 타입별 순위 .. 시도정보는 굳이 넣을필요 있나? 
						
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						break;
					case 2:
						//업종밀집도 변화
						mapData = $technicalBizDataBoard.ui.chartDataList[map.id];
						adm_nm = $technicalBizDataBoard.ui.mapData[map.id].options.params.adm_nm;
						var tmpMthemeNm = "";
						$("#densityDiv").find(".dbTabs > a").each(function() {
							if ($(this).hasClass("on")) {
								tmpMthemeNm = $(this).html();
							}
						});
						
						var tmpSthemeNm = "";
						$("#densityDiv").find(".dbTabs01").each(function() {
							$(this).find("a").each(function() {
								if ($(this).hasClass("on")) {
									tmpSthemeNm = $(this).html();
								}
							})
						});

						param = {
							title : "업종밀집도 변화" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							searchClassNm : tmpMthemeNm+ " " + tmpSthemeNm + " ("+adm_nm+")",
							base_year : $technicalBizDataBoard.ui.mapData[map.id].options.params.base_year,
							m_class_nm : $("#densityDiv .dbTabs a.on").html(),
							s_class_nm : $("#densityDiv .dbTabs01:visible a.on").html(),
						};
						var data = getChartSvgData("#timeAreaCharts01");
						chart.push({title:"시계열 그래프", data:data});
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						break;
					case 3:
						mapData = $technicalBizDataBoard.ui.chartDataList[map.id];
						
						//업종별 입지계수 지도
						var themeCd = options.selectThemeCd;
						
						//lqInfoChartRela						
						var currentCharts = ['#lqInfoLctChart']; 
						var title = "업종별 입지계수";
						var data = getChartSvgData('#lqInfoLctChart');
						chart.push({title : "업종별 입지계수" , data : data});
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						
						if($("#lqColumCharts02").is(":visible")){
							var legend = $("#lqChartCheckZone").clone();
							chart.push({title : "년도별 입지계수",data : getChartSvgData("#lqColumCharts02") , legend : legend})						
						}
						param = {
								title : "업종별 입지계수",
								
							};
							
						break;
					case 4: 
						//조건별 지역찾기
						
						//idx
							//menu 0 , 1 , 2, 3
						//techbizSearchTabList
						
						//idx 가 1 이면 표로 표현
						//$technicalBizDataBoard.ui.searchDataArray 
						//adm_nm
						//corp_irds 사업체 증감률
						//country_vs_worker_lq
						//country_vs_worker_lq
						//induscom_cnt
						//bizfac_cnt
						//techBiz
						
						//$technicalBizDataBoard.ui.searchOption
						//option1 option2
						//param 
							//from_corp_lq
							//from_worker_lq
							//to_corp_lq
							//to_worker_lq
							//selectInfoType
							//techbiz_class_cd : 
						
						
						
						if(options.standardOption.idx == 0){
							//첫 검색일때 
							chart.push({title : "검색 조건" , data : options.standardOption , idx : 0})
							chart.push({title : "검색 지역 찾기",data : options.dataArray , idx : 0});
							
							param = {
									title : "조건별 지역 찾기",
									
								};
							
						}else{
							
							
							var selectAdmNm = $("#technicalSearchAdmNm").text();
							chart.push({title : "검색 조건" , data : options.standardOption, idx : 0})
							chart.push({title : "검색 지역 찾기",data : options.dataArray, idx : 0});
							
							switch (options.standardOption.subIdx){
								case 1 : 
									//searchDetailStatsInfoChart01
									chart.push({title : selectAdmNm + "기술업종별 사업체수",data : getChartSvgData("#searchDetailStatsInfoChart01"), idx : 1})
									break;
								case 2 : 
									//searchDetailStatsInfoChart02
									var legend = $("#searchDetailStatsInfoChart02").next(".typelabel").clone();
									chart.push({title : selectAdmNm + "기술업종별 사업체 비율",data : getChartSvgData("#searchDetailStatsInfoChart02") , legend : legend, idx : 2})
									
									break;
								case 3 : 
									//searchDetailStatsInfoChart03Div
									chart.push({title : selectAdmNm + "기술업종별 사업체 즏감",data : getChartSvgData("#searchDetailStatsInfoChart03Div"), idx : 3})
									break;
								case 4 : 
									//searchDetailStatsInfoChart04
									chart.push({title : selectAdmNm + "기술업종별 입계수",data : getChartSvgData("#searchDetailStatsInfoChart04"), idx : 4})
									break;
								
							}
							
							
							
							param = {
									title : "조건별 지역 찾기 상세정보",
								};
							

						}
						
						
						/*param = {
								title : "조건별 지역 찾기",
								standardOption : options.standardOption,
								dataArray : options.dataArray,
							};*/
						
						 
						
						break;
					case 5:
						//지원시설 조회
						mapData = $technicalBizDataBoard.ui.chartDataList[map.id];
						adm_nm = $technicalBizDataBoard.ui.mapData[map.id].options.params.adm_nm;
						if (adm_nm == undefined) {
							adm_nm = "전국";
						}
						
						var seachTitle = "";
						if ($("#supplyDiv").is(":visible")) {
							if ($("#supplyMapBtn01").hasClass("on")) {
								seachTitle = $("#supplyMapBtn01").html() +"수 / ";
							}else {
								seachTitle = $("#supplyMapBtn02").html() +"수 / ";
							}
							origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
							if ($("#changeSupplyTabBtn01").hasClass("on")) {
								seachTitle = seachTitle + " " + $("#changeSupplyTabBtn01").html();
							}else {
								seachTitle = seachTitle + " " + $("#changeSupplyTabBtn02").html();
								origin = origin+":중소기업청, 벤처창업입지 114";
							}
						} else {
							for (var i=0; i<7; i++) {
								if ($("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn0"+i).hasClass("on")) {
									seachTitle = $("#changeSupplyAreaSynthesizeStatsInfoTab03_Btn0"+i).html();
									break;
								}
							}
							for (var i=1; i<=3; i++) {
								if ($("#changeSupplyAreaSynthesizeStatsInfoTab02_Btn0"+i).hasClass("on")) {
									seachTitle = seachTitle + " " + $("#changeSupplyAreaSynthesizeStatsInfoTab02_Btn0"+i).html() + "/지원시설현황";
									break;
								}
							}
							origin = "통계청, 통계청전국사업체조사("+companyDataYear+"):중소기업청, 벤처창업입지 114";
						}
 					
						param = {
							title : "지원시설정보" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							searchClassNm : seachTitle + " ("+adm_nm+")",
							base_year : $technicalBizDataBoard.ui.mapData[map.id].options.params.base_year,
							m_class_nm : $("#densityDiv .dbTabs a.on").html(),
							s_class_nm : $("#densityDiv .dbTabs01:visible a.on").html(),
						};
						
						if ($("#supplyAreaSynthesizeStatsInfoChart01").is(":visible")) {
							var data = getChartSvgData("#supplyAreaSynthesizeStatsInfoChart01");
							if (data != undefined) {
								chart[0] = {title:"지역종합통계정보", data:data, legend:$("#supplyAreaSynthesizeStatsInfoChart01").next().clone()};
							}
						}
						
						if ($("#supplyAreaSynthesizeStatsInfoChart02").is(":visible")) {
							var data2 = getChartSvgData("#supplyAreaSynthesizeStatsInfoChart02");
							if (data2 != undefined) {
								chart[0] = {title:"지역종합통계정보", data:data2};
							}
						}
						
						if ($("#supplyAreaSynthesizeStatsInfoChart03").is(":visible")) {
							var data3 = getChartSvgData("#supplyAreaSynthesizeStatsInfoChart03");
							if (data3 != undefined) {
								chart[0] = {title:"지역종합통계정보", data:data3};
							}
						}
						
						var data = getChartSvgData("#supplyMajorFacilityBarChart");
						if (data != undefined) {
							chart[1] = {title:"주요지원시설현황", data:data};
						}
						break;
					case 6:
						//산업단지 조회
						var tmpOptions = $technicalBizDataBoard.ui.mapData[map.id].options;
						mapData = $technicalBizDataBoard.ui.chartDataList[map.id];
						adm_nm = $technicalBizDataBoard.ui.mapData[map.id].options.params.adm_nm;
						if (adm_nm == undefined) {
							adm_nm = "전국";
						}
						
						var complex_nm = "";
						if (tmpOptions.curInfo != undefined) {
							complex_nm = tmpOptions.curInfo.complex_nm;
						}
						
						var seachTitle = "";
						if ($("#industryDiv").is(":visible")) {
							seachTitle = "기술업종 사업체수 / 산업단지수 현황";
						}else {
							for (var i=0; i<7; i++) {
								if ($("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn0"+i).hasClass("on")) {
									seachTitle = $("#changeIndustryAreaSynthesizeStatsInfoTab03_Btn0"+i).html();
									break;
								}
							}
							for (var i=1; i<=3; i++) {
								if ($("#changeIndustryAreaSynthesizeStatsInfoTab02_Btn0"+i).hasClass("on")) {
									seachTitle = seachTitle + " " + $("#changeIndustryAreaSynthesizeStatsInfoTab02_Btn0"+i).html() + "/산업단지현황";
									break;
								}
							}
						}
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+"):국토교통부,산업단지 현황(2015):한국산업단지공단, 한국산업단지총람(2015)";
						
						if (complex_nm.length > 0) {
							seachTitle = complex_nm;
						}
						
						param = {
							title : "산업단지정보" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							searchClassNm : seachTitle + " ("+adm_nm+")",
							base_year : $technicalBizDataBoard.ui.mapData[map.id].options.params.base_year,
							m_class_nm : $("#densityDiv .dbTabs a.on").html(),
							s_class_nm : $("#densityDiv .dbTabs01:visible a.on").html(),
						};
						
						if ($("#industryAreaSynthesizeStatsInfoChart01Div").is(":visible")) {
							var data = getChartSvgData("#industryAreaSynthesizeStatsInfoChart01");
							if (data != undefined) {
								chart[0] = {title:"지역종합통계정보", data:data, legend:$("#industryAreaSynthesizeStatsInfoChart01").next().clone()};
							}
						}
						
						if ($("#industryAreaSynthesizeStatsInfoChart02Div").is(":visible")) {
							var data2 = getChartSvgData("#industryAreaSynthesizeStatsInfoChart02");
							if (data2 != undefined) {
								chart[0] = {title:"지역종합통계정보", data:data2, legend:$("#industryAreaSynthesizeStatsInfoChart02").next().clone()};
							}
						}
						
						if ($("#industryAreaSynthesizeStatsInfoChart03Div").is(":visible")) {
							var data3 = getChartSvgData("#industryAreaSynthesizeStatsInfoChart03");
							if (data3 != undefined) {
								chart[0] = {title:"지역종합통계정보", data:data3};
							}
						}
						
						var data4 = getChartSvgData("#industryMajorFacilityBarChart");
						if (data4 != undefined) {
							chart[1] = {title:"주요지원시설현황", data:data4};
						}
						
						//산업단지내 증감현황
						var data5 = getChartSvgData("#industryVariationStateChart");
						if (data5 != undefined) {
							chart[2] = {title:"산업단지 내 기술업종 증감현황 ", data:data5};
						}
						
						//산업단지 내 기술업종 분포현황
						var data6 = getChartSvgData("#industryDistributionStateChart");
						if (data6 != undefined) {
							chart[3] = {title:"산업단지 내 기술업종 분포현황", data:data6};
						}
						
						//산업단지 내 기술업종 주요시설현황
						var data7 = getChartSvgData("#industryDetailStateChart");
						if (data7 != undefined) {
							chart[4] = {title:"산업단지 내 기술업종 상세현황", data:data7, legend:$("#industryDetailStateChart").next().clone()};
						}
						
						
						//산업단지 내 기술업종 주요시설현황
						var data8 = getChartSvgData("#industryImportantFacilityStateChart");
						if (data8 != undefined) {
							chart[5] = {title:"산업단지 내 기술업종 주요시설현황", data:data8};
						}
						
						break;
					default:
						break;
				};
				
				function getChartSvgData(id){
					var tmpChart = $(id).highcharts();
					if(tmpChart){
						//2017.03.13 pdf저장 이슈
						var doc = document.querySelector(id);
						var svg = doc.querySelector("svg");
						var xml  = new XMLSerializer().serializeToString(svg);
			            var canvas = document.createElement("canvas");
			            canvg(canvas, xml);
			            return canvas.toDataURL();
					}
				}
				
				var dataList = {
					id : map.id, 
					divId : divId,
					geojson : null, 
					data : mapData,
					legend : {
						valPerSlice : map.legend.valPerSlice,
						legendColor : map.legend.legendColor,
						legendId: "#legend_"+map.legend.id,
						legendType : map.legend.legendType
					},
					param : param,
					zoom : map.zoom,
					center : map.center,
					dataType : dataType,
					origin : origin
				};
				
				//2017.03.14 svg처리
				//시도별 기술업종지도 차트가 i.e에서 제대로 처리되지 않는 문제 해결
         		var mapContainer = $(divId).find(".sop-marker-pane");		
				var svgElements = $(mapContainer).find('svg');
			    svgElements.each(function() {
			        var canvas, xml;
			        canvas = document.createElement("canvas");
			        canvas.className = "screenShotTempCanvas";
			        xml = (new XMLSerializer()).serializeToString(this);
			        xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
			        canvg(canvas, xml);
			        
			        var marginLeft = (canvas.width - $(divId).width())/2;
                    var marginTop = (canvas.height - $(divId).height())/2;
                    
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(canvas, -marginLeft, -marginTop, canvas.width, canvas.height);
			        
			        $(canvas).insertAfter(this);
			        $(this).attr('class', 'tempHide');
			        $(this).hide();
			     });
				
				
				//2017.02.22 이미지캡쳐 수정
				//==================================================================================================================================//
				setTimeout(function(){
					html2canvas($(divId), {
						logging: false,
	                    useCORS: false,
	                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
		 				onrendered: function(canvas) {
		 					//익스플로러 예외처리
		 					//2017.03.14 svg처리
		 					/*var agent = navigator.userAgent.toLowerCase();
	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	                     		var doc = document.querySelector(divId); 
	                     		var mapContainer = null;
	                     		for (var i=0; i<doc.childNodes.length; i++) {
	                     			var tmpClassName = doc.childNodes[i].className;
	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
	                     				mapContainer = doc.childNodes[i];
	                     				break;
	                     			}
	                     		}
	                     		if (mapContainer != null) {
	                     			var svgList = mapContainer.querySelectorAll("svg");
		                     		for (var i=0; i<svgList.length; i++) {
		                     			var svg = svgList[i];
		                     			var xml  = new XMLSerializer().serializeToString(svg);
			                            var tmpCanvas = document.createElement("canvas");
			                            canvg(tmpCanvas, xml);
			                            var marginLeft = (tmpCanvas.width - canvas.width)/2;
			                            var marginTop = (tmpCanvas.height - canvas.height)/2;
			                            var ctx = canvas.getContext("2d");
			                            ctx.drawImage(tmpCanvas, -marginLeft, -marginTop, tmpCanvas.width, tmpCanvas.height);
		                     		}
	                     		}
	                     	}*/
		 					
		 					$(divId).find('.screenShotTempCanvas').remove();
		 					$(divId).find('.tempHide').show().removeClass('tempHide');
		 					
		 					var data = canvas.toDataURL();
		 					var options = {
		 							mapType : mapType,
		 							mapClone : $(divId).clone(),
		 							mapWidth : $(divId).width(),
		 							mapHeight : $(divId).height(),
		 							chart : chart,
		 							legend :legend,
		 							chartLegend : chartLegend, //2017.03.13 pdf저장 이슈
		 							mapData : data
		 					};
		 					var popup = $technicalBizMap.ui.reportPopup.$reportForm.ui;
		 					popup.delegate = $technicalBizMap.ui;
		 					popup.map = map;
		 					
		 					popup.setData(dataList, options);
		 				}
		 			});
				},300);
				//==================================================================================================================================//
			},
			
			getStyle : function(el, styleProp) {
				  var camelize = function(str) {
				    return str.replace(/\-(\w)/g, function(str, letter) {
				      return letter.toUpperCase();
				    });
				  };

				  if (el.currentStyle) {
				    return el.currentStyle[camelize(styleProp)];
				  } else if (document.defaultView && document.defaultView.getComputedStyle) {
				    return document.defaultView.getComputedStyle(el, null)
				      .getPropertyValue(styleProp);
				  } else {
				    return el.style[camelize(styleProp)];
				  }
				},
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function(type) {				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				var createMapId, updateId;
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					createMapId = 2;
					updateId = 1;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					createMapId = 1;
					updateId = 2;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					createMapId = 0;
					updateId = 3;
				}else if (isMap1ContentShow) {
					createMapId = 1;
					updateId = 4;
				}else if (isMap2ContentShow) {
					createMapId = 0;
					updateId = 5;
				}else if (isMap3ContentShow) {
					createMapId = 0;
					updateId = 6;
				}

				var sceneInx = $(".sceneBox.on").length; 
				$(".sceneBox").eq(createMapId).show().addClass("on");
				if(sceneInx==1){ 
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$technicalBizMap.ui.mapList.length; i++) {
							if ($technicalBizMap.ui.mapList[i] != null) {
								$technicalBizMap.ui.mapList[i].update();
							}
						}
					});
					$(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneRela").eq(0).css({"border-left":"0"});
				}else if(sceneInx==2){ 
					$(".sceneBox").css({"position":"absolute"});
					$(".sceneBox").stop().animate({"width":"600px", "height":"500px"},200, function() {
						for (var i=0; i<$technicalBizMap.ui.mapList.length; i++) {
							if ($technicalBizMap.ui.mapList[i] != null) {
								$technicalBizMap.ui.mapList[i].update();
							}
						}
					}); 
					$(".sceneRela").css({"border-left":"0"});
					$(".resizeIcon").show();
					$(".sceneBox").each(function(i){
						$(this).css({"z-index":parseInt(10-i), "border":"3px solid #333"})
						.animate({"top":parseInt(50*(i+1))+"px", "left":parseInt(150*(i+1))+"px"},200);
					});
					$( ".sceneBox" ).draggable({containment: ".containerBox>.rela"}).resizable();
					$( ".sceneBox" ).on("resize", function() {
						for (var i=0; i<$technicalBizMap.ui.mapList.length; i++) {
							if ($technicalBizMap.ui.mapList[i] != null) {
								$technicalBizMap.ui.mapList[i].update();
							}
						}
					});
				} 
				
				//지도생성
				//heatMap 생성에 버그가 있음
				//맵이 완전히 생성되어 화면에 표출된 다음, heatMap을 생성해야 오류가 안남
				this.createMap("mapRgn_" + (createMapId+1), createMapId);
				var mapNavi = new mapNavigation.UI();
				mapNavi.firstBoolean = false;
				mapNavi.create("mapNavi_" + (createMapId+1), createMapId+1, $technicalBizMap.ui);
				
				$(".sceneBox.on").each(function(index) {
					$(this).find(".tb_radio").hide();
				});				
			
				//기존지도정보 복사
				switch(updateId) {
					case 1:
						this.mapList[2].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 2:
					case 4:
						this.mapList[1].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 3:
					case 5:
						this.mapList[0].mapMove(this.mapList[1].center, this.mapList[1].zoom);
						break;
					case 6:
						this.mapList[0].mapMove(this.mapList[2].center, this.mapList[2].zoom);
						break;
				}
				
				$(".interactiveView").css("display","inline-block");
				$(".tb_close").show();
				$(".interactiveView").each(function(i){
					$(".tb_mapAdd").text("VIEW"+parseInt(i+1));
				}); 
				
				var sceneInx = $(".sceneBox.on").length;
				if (sceneInx > 1) {
					$(".viewTitle > span").show();
				}else {
					$(".viewTitle > span").hide();
				}
				
			},
			
			/**
			 * 
			 * @name         : doRemoveMap
			 * @description  : 맵을 삭제한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 1:1번맵, 2:2번맵, 3:3번맵
			 */
			doRemoveMap : function(type) {
				this.curMapId = parseInt(type)-1;
				if (this.mapList[this.curMapId] !== undefined) {
					this.mapList[this.curMapId].gMap.remove();
					this.mapList[this.curMapId] = null;
				}
				
				$(".sceneBox").eq(this.curMapId).removeClass("on").hide();
				var sceneInx = $(".sceneBox.on").length;  
				if(sceneInx==1){  
					$(".sceneBox").stop().animate({"width":"100%"},200, function() {
						for (var i=0; i<$technicalBizMap.ui.mapList.length; i++) {
							if ($technicalBizMap.ui.mapList[i] != null) {
								$technicalBizMap.ui.mapList[i].update();
							}
						}
					}); 
					$(".tb_close, .interactiveView").hide();
					$(".interactiveDataBoard").show();
					$(".sceneBox.on").eq(0).find(".sceneRela").css({"border-left":"0px"});
					$(".sceneBox.on").each(function(index) {
						$(this).find(".tb_radio").show();
					});
				}else if(sceneInx==2){
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$technicalBizMap.ui.mapList.length; i++) {
							if ($technicalBizMap.ui.mapList[i] != null) {
								$technicalBizMap.ui.mapList[i].update();
							}
						}
					});
					$(".sceneBox").draggable("destroy").resizable("destroy").css({"position":"static", "border":"0", "height":"100%"});
					$(".sceneBox.on").eq(1).find(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneBox.on").each(function(index) {
						$(this).find(".tb_radio").hide();
					});
				}
				
				$(this).hide(); 
				$(".resizeIcon").hide();
				$(".interactiveView").each(function(i){
					$(this).text("VIEW"+parseInt(i+1));
				});
				
				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//삭제한 지도정보와 매핑되는 버튼 Effect 수정
//				$technicalBizLeftMenu.ui.updateSearchBtnEffect("", this.curMapId);
				
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					this.curMapId = 0;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					this.curMapId = 1;
				}else if (isMap1ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow) {
					this.curMapId = 1;
				}else if (isMap3ContentShow) {
					this.curMapId = 2;
				}
				
				//현재 선택된 맵으로 데이터보드 다시 그리기
				$technicalBizDataBoard.ui.reDraw(this.curMapId);
			},
			
			/**
			 * 
			 * @name         : doCharacteristicIntro
			 * @description  : 기술업종 특성 인트로화면으로 전환한다.
			 * @date         : 2017. 7. 14.
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doCharacteristicIntro : function(){
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				map.mapMode = "intro";
				map.mapMove([1007770, 1855549], 2);
				map.gMap.removeLayer(map.tileLayer);
				map.blankLayer.addTo(map.gMap);
				map.setFixedBoundLevel(true);
				map.gMap.setMaxZoom(5);
				map.isLayerMouseEventDisabled = false;
				map.gMap.scrollWheelZoom.enable();
				map.legend.legendInit();
				
				setTimeout(function() {
					map.openApiBoundarySido(map.bnd_year, function() {
						if (map.geojson != null) {
							//기술업종 특성 현황 조회
							$technicalBizMapApi.request.openApiTechCharacterisInfo(map);
						}
					});
				},200);
				var array = new Array();
				var object = new Object();
				object.sido_cd = "11";
				array.push(object)
				
				this.setTitle("기술업종 특성 현황 조회", viewId);
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_clear").parent().hide();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$("#legend_"+map.legend.id).hide();
				
			},
			
			/**
			 * 
			 * @name         : doSidoIntro
			 * @description  : 인트로화면으로 전환한다.
			 * @date         : 2016. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSidoIntro : function() {
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				map.mapMode = "intro";
				map.mapMove([1007770, 1855549], 2);
				map.gMap.removeLayer(map.tileLayer);
				map.blankLayer.addTo(map.gMap);
				map.setFixedBoundLevel(true);
				map.gMap.setMaxZoom(3);
				map.isLayerMouseEventDisabled = false;
				map.gMap.scrollWheelZoom.enable();
				map.legend.legendInit();
				
				var type = "company";
				if ($("#standardButton").hasClass("off")) {
					type = "worker";
				}
				
				setTimeout(function() {
					map.openApiBoundarySido(map.bnd_year, function() {
						if (map.geojson != null) {
							//시도별 기술업종현황 조회 
							switch (type) {
							case "company":
								$technicalBizMapApi.request.openApiTechSidoCompanyInfo(map);
								break;
							case "worker":
								$technicalBizMapApi.request.openApiTechSidoWorkerInfo(map);
								break;
							}
							
						}
					});
				},200);
				this.setTitle("시도별 기술업종 현황", viewId);
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_clear").parent().hide();
				/*$("#view"+viewId).find(".tb_report").parent().hide();*/
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$("#legend_"+map.legend.id).hide();
				
				/*setTimeout(function(){
					$("#view1").find(".tb_report").parent().show();
					$technicalBizDataBoard.ui.updateDataBoard({ params: {adm_cd : "25", adm_nm : "대전광역시", map: $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId]} }, "sido");
				}, 500);*/
				
			},
			
			/**
			 * 
			 * @name         : doCompanySidoIntro
			 * @description  : 업종별 지역현황정보를 조회한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanySidoIntro : function(callback) {
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				map.mapMode = "intro";
				map.mapMove([1007770, 1855549], 2);
				map.gMap.removeLayer(map.tileLayer);
				map.blankLayer.addTo(map.gMap);
				map.setFixedBoundLevel(true);
				map.isLayerMouseEventDisabled = true;
				map.legend.legendInit();
				map.gMap.setMaxZoom(7);
				map.gMap.scrollWheelZoom.enable();
				map.multiLayerControl.clear();
				map.multiLayerControl.dataGeojson = null;
				$technicalBizDataBoard.ui.mapData[map.id].type = "";
				setTimeout(function() {
					$technicalBizMap.Popup.show();
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetSidoCodeList.json",
						async : true,
						success: function(res) {
							if (res.errCd == "0") {
								sidoList = res.result.sidoCodeList;
								
								$technicalBizMap.ui.doGetSggBoundary(sidoList, 0, map, function() {
									$technicalBizMap.Popup.close();
									if (callback != null && callback instanceof Function) {
										/*callback.call(undereqfined, null);*/
										callback.call(undefined, null);
									}
								});
							}else {
								$technicalBizMap.Popup.close();
							}
						},									 
						dataType: "json",
						error:function(e){
							$technicalBizMap.Popup.close();
						}  
					});
				}, 200);
				
				if($technicalBizLeftMenu.ui.curSelectedStatsType == "search"){
					$("#view"+viewId).find(".helperText").html("조건별 지역찾기");
				}else{
					$("#view"+viewId).find(".helperText").html("시군구 생활업종 현황");
				}
				
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_inner").hide();
				$("#view"+viewId).find(".tb_report").parent().show();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$(".btn_legendSetting").hide();
				$("#legend_"+map.legend.id).show();
				
				//2017.02.22 색상수정
				$("#legendColor_"+map.legend.id).find("li:eq(0)>a").click();
				$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "bubble") {
						$(this).find("a").click();
					}
				});
			},
			
			/**
			 * 
			 * @name         : doGetSggBoundary
			 * @description  : 전국 시군구경계를 조회한다.
			 * @date         : 2016. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doGetSggBoundary : function(sidoCdList, index, map, callback) {
				var sumName = true;
				$.ajax({
					type : "GET",
					url : contextPath + "/js/data/geo_sgg_"+map.bnd_year+"/geo_sgg_"+sidoCdList[index].sido_cd+"_"+map.bnd_year+".js",
					async : true,
					success : function(res) {
							var geojson = map.addPolygonGeoJson(res, "polygon");
							if (map.multiLayerControl.dataGeojson == null) {
								map.multiLayerControl.dataGeojson = [];
							}
							map.multiLayerControl.dataGeojson.push(geojson);
							if (index >= sidoCdList.length-1) {
								if (callback != null && callback instanceof Function) {
									callback.call(undefined, null);
								}
								return;
							}
							index++;
							$technicalBizMap.ui.doGetSggBoundary(sidoCdList, index, map, callback);
							
							
							//파이차트 마커 초기화
							if ($technicalBizMap.ui.sidoPieChartMarkers == null) {
								$technicalBizMap.ui.sidoPieChartMarkers = [];
							}else {
								for (var i=0; i<$technicalBizMap.ui.sidoPieChartMarkers.length; i++) {
									$technicalBizMap.ui.sidoPieChartMarkers[i].remove();
								}
							}
							
							
							
							if($technicalBizMap.ui.whiteMap){
								
								var html = "";
								html +=     "<div style='width:100px; text-align:center;font-weight:bold;font-size:12px;'>"+"독도"+"</div>";
								
								icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
								var marker2 = sop.marker([ 1372094, 1927430], {
									icon : icon2
								});
								marker2.addTo(map.gMap);
								$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
								
								html = "";
								html +=     "<div style='width:100px; text-align:center;font-weight:bold;font-size:12px;'>"+"울릉도"+"</div>";
								
								icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
								var marker2 = sop.marker([ 1292094, 1969430], {
									icon : icon2
								});
								marker2.addTo(map.gMap);
								$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
							}
					},
					dataType: "json",
					error:function(e){}  
				});
			},
			
			/**
			 * 
			 * @name         : doCompanyDensityIntro
			 * @description  : 업종밀집도정보를 조회한다.
			 * @date         : 2016. 06. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanyDensityIntro : function() {
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				$technicalBizMap.noReverseGeoCode = true;
				this.clearIntroData(map);
				$technicalBizMap.noReverseGeoCode = true;
				
				if (!this.isLocalGov) {
					map.mapMove([1007770, 1855549], 2);
					map.gMap.setMaxZoom(12);
					map.gMap.setMinZoom(2);
					map.gMap.scrollWheelZoom.enable();
					map.openApiBoundarySido(map.bnd_year);
				}else {
					setTimeout(function() {
						$technicalBizMap.ui.doSungNamBoundary();
					}, 200);
				}
				
				
				$("#view"+viewId).find(".helperText").html("업종밀집도변화");
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_clear").parent().hide();
				$("#view"+viewId).find(".tb_report").parent().show();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$(".btn_legendSetting").hide();
				$("#legend_"+map.legend.id).show();
				
				$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "heat") {
						$(this).find("a").click();
					}
				});
				
			},
			
			/**
			 * 
			 * @name         : doSupplyFacilitiesIntro
			 * @description  : 지원시설 정보를 조회한다.
			 * @date         : 2016. 10. 17
			 * @author	     : 이정운
			 * @history 	 :
			 */
			doSupplyFacilitiesIntro : function(isInit) { //2017.05.02 선택 시, 무조건 총사업체로 초기화되는 문제		
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				$technicalBizMap.noReverseGeoCode = true;
				this.clearIntroData(map);
				$technicalBizMap.noReverseGeoCode = true;
				$("#view"+viewId).find(".tb_report").parent().show();
				
				//지자체-성남시
				if (this.isLocalGov) {
					$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
					$("#supplyDetailDiv > .mapBefore").hide();
					
					setTimeout(function(){
						map.mapMove([965210, 1935917], 6);
						map.gMap.setMinZoom(5);
						
						var adm_cd = "31020";
						var adm_nm = "경기도 성남시";
						var params = {
								year : companyDataYear,
								adm_cd : adm_cd,
								adm_nm : adm_nm,
								type : "4",
								menuType : "supply"
						};
						var layer = {
								feature : {
									properties : {
										adm_cd : adm_cd,
										adm_nm : adm_nm
									}
								}
						};
						$technicalBizMap.ui.doSupplyMarkerClear();
					 	$technicalBizDataBoard.ui.mapData[map.id].options["preLayer"] = layer;
						$technicalBizMapApi.request.openApiSupplyRegionInfo(params, map, function() {
							map.multiLayerControl.multiData = [];
							map.multiLayerControl.dataGeojson = [];
							var admCdList = ["31021", "31022", "31023"];
							for (var i=0; i<admCdList.length; i++) {
								map.multiLayerControl.openApiBoundaryHadmarea(admCdList[i], bndYear, "0", map.data[0], "0", function(res) {
									if (map.multiLayerControl.multiData.length == admCdList.length) {
										map.multiLayerControl.setPolygonDataGeojson(map.multiLayerControl.multiData);
										var options = {
									    		params : {
									    			adm_cd : adm_cd,
									    			adm_nm : adm_nm,
									    			map : map,
									    			year : companyDataYear
									    		},
									    		isInit : isInit, //2017.05.02 뒤로가기 선택 시, 총사업체로 무조건 초기화 되는 현상,
									    		corp_worker_type : $("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").hasClass("on") ? "1" : "2"
									    };
										$technicalBizDataBoard.ui.startUpSupplyClick(options);
										$technicalBizDataBoard.event.dataBoardOpen();
									}
								});
							}
						});
					},200);
				}else {
					map.mapMove([1007770, 1855549], 2);
					map.gMap.setMinZoom(2);
					
					$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
					
					var params = {
							year : companyDataYear,
							adm_cd : "00",
							type : "1",
							menuType : "supply"
					};
					
					$technicalBizMapApi.request.openApiSupplyRegionInfo(params, map, function() {
						map.openApiBoundarySido(map.bnd_year, function(res) {
							var options = {
									params : {
										map : map,
									}
							}
							var type = "1";
							if ($("#standardButton").hasClass("off")) {
								type = "2";
							}
							$technicalBizDataBoard.ui.changeSupplyMap(type);
							$technicalBizDataBoard.ui.updateDataBoard(options, "supply");	
							
							
						});
					});
				}
				
				
			},
			
			/**
			 * 
			 * @name         : doSupplyDetailInfo
			 * @description  : 해당 지원시설이 있는 지역상세보기 조회
			 * @date         : 2016. 11. 25
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSupplyDetailInfo : function(x_coor, y_coor) {
				var map = this.mapList[this.curMapId];
				if (map.dataGeojson) {
					var tmpLayer = null
					map.dataGeojson.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint([x_coor, y_coor]);  
			                  if (layer._containsPoint(point)) {
			                	  tmpLayer = layer;
			                  }
						 }
					});
					
					if (tmpLayer != null) {
						this.doSupplyDetailRegionInfo(tmpLayer, map);
					}
				}
			},
			
			/**
			 * 
			 * @name         : doDrawSupplyFacilityInfo
			 * @description  : 지원시설-사업체/종사자수 색상지도를 그린다.
			 * @date         : 2016. 11. 15
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doChangeColorMap : function(type, data, menuType) {
				var map = this.mapList[this.curMapId];
				var showData = "corp_cnt";

				switch(parseInt(type)) {
					case 1:
						showData = "corp_cnt";
						unit = "개";
						/*$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();*/
						$("#legendColor_"+map.legend.id).find("li:eq(0)>a").click();
						break;
					case 2:
						showData = "worker_cnt";
						unit = "명";
						/*$("#legendColor_"+map.legend.id).find("li:eq(0)>a").click();*/
						$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
						break;
				}

				var tmpData = [];
				tmpData[0] = [];
				for (var i=0; i<data.length; i++) {
					tmpData[0].push(parseFloat(data[i][showData]));
				}
				
				var res = {
						result : data
				};
				map.legend.valPerSlice = map.legend.calculateLegend(tmpData);
				map.setStatsData("normal", res, showData, unit);
				
				if (map.dataGeojson == null) {
					map.dataGeojson = map.geojson;
				}
				
 				if (map.dataGeojson != null) {
					map.dataGeojson.eachLayer(function(layer) {
						layer.options.type = "data";
						layer.setStyle(map.setPolygonGeoJsonStyle("data"));
						for (var k=0; k<data.length; k++) {
							var tmpAdmCd = data[k].adm_cd;
							if (layer.feature.properties.adm_cd == tmpAdmCd) {
								layer.feature["info"] = [];
								data[k]["unit"] = unit;
								data[k]["api_id"] = "";
								data[k]["adm_cd"] = tmpAdmCd;
								data[k]["adm_nm"] = layer.feature.properties.adm_nm;
								data[k]["showData"] = showData;
								data[k]["type"] = menuType;
								layer.feature.info.push(data[k]);
								layer.setStyle({
									weight : layer.options.weight,
									color : layer.options.color,
									dashArray : layer.options.dashArray,
									fillOpacity : layer.options.fillOpacity,
									fillColor : map.legend.getColor(parseFloat(data[k][showData]), map.legend.valPerSlice[0])[0]
								}); 
							}	
						}
					});
					
				}
				
			},
			
			/**
			 * 
			 * @name         : doIndustrialComplexIntro
			 * @description  : 산업단지 정보를 조회한다.
			 * @date         : 2016. 10. 18
			 * @author	     : 이정운
			 * @history 	 :
			 */
			doIndustrialComplexIntro : function(isInit) { //2017.05.02 초기화변수 추가
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				$technicalBizMap.noReverseGeoCode = true;
				this.clearIntroData(map);
				$technicalBizMap.noReverseGeoCode = true;
				$("#view"+viewId).find(".tb_report").parent().show();

				//지자체-성남시
				if (this.isLocalGov) {
					$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
					$("#industryDetailDiv > .mapBefore").hide();
					
					setTimeout(function(){
						map.mapMove([965210, 1935917], 6);
						map.gMap.setMinZoom(5);
						
						var adm_cd = "31020";
						var adm_nm = "경기도 성남시";
						var params = {
								year : companyDataYear,
								adm_cd : adm_cd,
								adm_nm : adm_nm,
								type : "4",
								menuType : "industry"
						};
						var layer = {
								feature : {
									properties : {
										adm_cd : adm_cd,
										adm_nm : adm_nm
									}
								}
						};
						$technicalBizMap.ui.doIndustryMarkerClear();
					 	$technicalBizDataBoard.ui.mapData[map.id].options["preLayer"] = layer;
						$technicalBizMapApi.request.openApiSupplyRegionInfo(params, map, function() {
							map.multiLayerControl.multiData = [];
							map.multiLayerControl.dataGeojson = [];
							var admCdList = ["31021", "31022", "31023"];
							for (var i=0; i<admCdList.length; i++) {
								map.multiLayerControl.openApiBoundaryHadmarea(admCdList[i], bndYear, "0", map.data[0], "0", function(res) {
									if (map.multiLayerControl.multiData.length == admCdList.length) {
										map.multiLayerControl.setPolygonDataGeojson(map.multiLayerControl.multiData);
										var options = {
									    		params : {
									    			adm_cd : adm_cd,
									    			adm_nm : adm_nm,
									    			map : map,
									    			year : companyDataYear
									    		},
									    		isInit : isInit, //2017.05.02 선택시 무조건 총사업체로 초기화되는 문제
									    		corp_worker_type : $("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn01").hasClass("on") ? "1" : "2"
									    };
										$technicalBizDataBoard.ui.industryDetailClick(options);
										$technicalBizDataBoard.event.dataBoardOpen();
									}
								});
							}
						});
					},200);
				}else {
					map.mapMove([1007770, 1855549], 2);
					map.gMap.setMinZoom(2);
					
					$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
					
					var params = {
							year : companyDataYear,
							adm_cd : "00",
							type : "1",
							menuType : "industry"
					}

					$technicalBizMapApi.request.openApiSupplyRegionInfo(params, map, function(res) {
						map.openApiBoundarySido(map.bnd_year, function() {
							var options = {
									params : {
										map : map,
									}
							}
							var type = "1";
							if ($("#standardButton").hasClass("off")) {
								type = "2";
							}
							$technicalBizDataBoard.ui.changeIndustryMap(type);
							$technicalBizDataBoard.ui.updateDataBoard(options, "industry");	
						});
					});
				}	
			},
			
			/**
			 * 
			 * @name         : doSupplyMarkerClear
			 * @description  : 지원시설 마커를 삭제한다.
			 * @date         : 2016. 11. 19
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSupplyMarkerClear : function() {
				if (this.markerGroup1 != null) {
					this.markerGroup1.clearLayers();
					this.markerGroup1 = null;
				}
				
				if (this.markerGroup2 != null) {
					this.markerGroup2.clearLayers();
					this.markerGroup2 = null;
				}
				
				if (this.markerGroup3 != null) {
					this.markerGroup3.clearLayers();
					this.markerGroup3 = null;
				}
				
				if (this.markerGroup4 != null) {
					this.markerGroup4.clearLayers();
					this.markerGroup4 = null;
				}
			},
			
			/**
			 * 
			 * @name         : doIndustryMarkerClear
			 * @description  : 산업시설 마커를 삭제한다.
			 * @date         : 2016. 11. 21
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doIndustryMarkerClear : function() {
				if (this.industryMarkerGroup != null) {
					if (Object.prototype.toString.call(this.industryMarkerGroup) === "[object Array]") {
						for (var i=0;i <this.industryMarkerGroup.length; i++) {
							this.industryMarkerGroup[i].clearLayers();
						}
					}else {
						this.industryMarkerGroup.clearLayers();
					}
					this.industryMarkerGroup = null;
				}
			},
			
			/**
			 * 
			 * @name         : goIndustryDetailInfo
			 * @description  : 산업단지 상세정보 조회
			 * @date         : 2016. 11. 23
			 * @author	     : 권차욱
			 * @param pageNo : 페이지넘버
			 * @param index  : 인덱스정보
			 * @history 	 :
			 */
			goIndustryDetailInfo : function(pageNo, index) {
				$("#industryDetailDiv > .mapBefore").show();
				$(".industryDetailStep01").hide();
				$technicalBizDataBoard.ui.chartDataList = [];
				var options = $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options;
				var markerGroup = options.marker;
				var marker = null;
				for (var i=0; i<markerGroup[pageNo].length; i++) {
					if (index == i) {
						marker = markerGroup[pageNo][i];
						break;
					}
				}
				//2017.10.12 개발팀 추가
				$("#industryAreaSynthesizeStatsDetailInfoChart04Div").attr("data-page", pageNo);
				$("#industryAreaSynthesizeStatsDetailInfoChart04Div").attr("data-index",index);
				//2017.10.12 개발팀 추가 종료
				$technicalBizDataBoard.ui.doComplexDetailInfo(options, marker);
			},
			
			goLinkIndustryDetailInfo : function(pageNo, index) {
				var map = this.mapList[0];
				setTimeout(function() {
					var options = $technicalBizDataBoard.ui.mapData[map.id].options;
					var markerGroup = options.marker;
					var marker = null;
					if (markerGroup != undefined) {
						for (var i=0; i<markerGroup[pageNo].length; i++) {
							if (index == i) {
								marker = markerGroup[pageNo][i];
								break;
							}
						}
						$technicalBizMap.ui.industryPopupInfo = marker;
						$technicalBizMap.ui.industryPopup = 
							window.open("/view/technicalBiz/industyPopup", "reportPrint","width=850, height=700, scrollbars=yes");
					}
				},300);
				
			},
			
			
			openIndustryPopup : function() {
				$technicalBizMap.ui.industryPopup.$technicalBizMapIndustryPopup.ui.setData(this.industryPopupInfo);
			},
			
			/**
			 * 
			 * @name         : doNormalMapInit
			 * @description  : 노말지도로 초기화한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doNormalMapInit : function() {
				var map = this.mapList[this.curMapId];
				var id = this.curMapId+1;
				map.mapMode = "normal";
				this.clearIntroData(map);
				this.checkBlankLayer(map);
				map.isLayerMouseEventDisabled = false;
				$technicalBizDataBoard.ui.mapData[map.id].type = "";
				map.legend.legendInit();
				$(".btn_legendSetting").show();
				
				/*$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					console.log($(this).find("a").attr("data-type"));
					if ($(this).find("a").attr("data-type") == "heat") {
						$(this).find("a").click();
					}
				});*/
	    		if ($technicalBizLeftMenu.ui.curSelectedStatsType == "userData") {
	    			$("#view"+id).find(".tb_report").parent().show();
	    		}else {
	    			$("#view"+id).find(".tb_report").parent().hide();
	    		}
	    		
	    		
			},
			
			/**
			 * 
			 * @name          : doReqSidoCompany
			 * @description   : 업종별 지역현황 정보를 요청한다.
			 * @date          : 2015. 11. 20. 
			 * @author	      : 권차욱
			 * @history 	  :
			 * @param themeCd : 테마코드
			 */
			doReqSidoCompany : function(themeCd, themeNm, type, callback) {
				var map = this.mapList[this.curMapId];
				/*if (themeCd == "00") {
					//전체현황
					$technicalBizMapApi.request.openApiSggAllCompanyCnt(themeNm, companyDataYear, map, callback);
				}else {*/
					$technicalBizMapApi.request.openApiSggCompanyCnt(themeCd, themeNm, map, type, callback);
				//}
				
					
					
			},
			
			/**
			 * 
			 * @name          : doReqCompanyDensity
			 * @description   : 업종밀집도변화 정보를 요청한다.
			 * @date          : 2016. 10. 26. 
			 * @author	      : 권차욱
			 * @history 	  :
			 * @param themeCd : 테마코드
			 */
			doReqCompanyDensity : function(themeCd, themeNm, year, params) {
				var tmpYear = "";
				var tmpParams;
				if (year == null || year == undefined) {
					 tmpYear = companyDataYear;
				}else {
					tmpYear = year;
				}
				
				if (params != null && params != undefined) {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear
					};
					for (p in params) {
						if  (p == "adm_cd" || p == "sido_cd" || p == "sgg_cd") {
							if (p == "adm_cd" && params[p] == null) {
								break;
							}
							tmpParams[p] = params[p];
						}
					}
				}else {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear
					};
				}
				
				var map = this.mapList[this.curMapId];
				var type = "1";
				if (params.adm_cd != undefined || params.adm_cd != null) {
					//지자체-성남시
					if (this.isLocalGov && params.adm_cd == "31020") {
						tmpParams.adm_cd = tmpParams.adm_cd.substring(0,4);
						type = "4";
						$("#densityDiv > .mapBefore").hide();
						map.gMap.setMaxZoom(7);
					}else {
						switch (params.adm_cd.length) {
							case 2:
								type = "2";
								map.gMap.setMaxZoom(7);
								break;
							case 5:
								type = "3";
								map.gMap.setMaxZoom(13);
								break;
							case 7:
								map.gMap.setMaxZoom(13);
								//2017.03.23 읍면동 레벨에서 데이터보드의 테마를 선택했을 시, 열지도가 변하지 않는 현상 수정
								if ($technicalBizDataBoard.ui.mapData[map.id].options.preLayer.theme_cd == themeCd &&
									$technicalBizDataBoard.ui.mapData[map.id].options.preLayer.year == year) {
									return;
								}else {
									tmpParams["adm_cd"] = params.adm_cd.substring(0,5);
									type = "3";
								};
								break;
							default:
								type = "1";
								map.gMap.setMaxZoom(3);
								break;
						}
						$("#densityDiv > .mapBefore").show();
					}
					
				}else {
					map.gMap.setMaxZoom(3);
					$("#densityDiv > .mapBefore").hide();
				}
				
				if (map.heatMap) {
					map.heatMap.setUTMKs([]);
				}
				$technicalBizMapApi.request.openApiPoiCompanyDensity(type, tmpParams, map, function() {
					if (map.zoom >= 9) {
						$technicalBizMap.ui.doConvertHeatMap(map, "dotMap");
					}
				});
			},
			
			//2017.10.16 개발팀 추가
			/**
			 * 
			 * @name         : doReqAllLq
			 * @description  : 업종별 입지계수 시도 정보를 조회한다.
			 * @date         : 2017. 10. 16. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doReqAllLq : function(themeCd,themeNm,type,base_region,standard){
				$("#technicalLqPrevButton").hide();
				var map = this.mapList[this.curMapId];
				$technicalBizMap.noReverseGeoCode = true;
				map.clearDataOverlay();
				map.mapMove([1007770, 1855549], 2);
				map.gMap.setMinZoom(2);

				//
				/*$technicalBizDataBoard.ui.changeLqInfo(themeCd);*/
				
				var selectYearList = $("#lqInfoYearSettingList > li");
				var selectYear = null;
				for(var i = 0; i < selectYearList.length; i++){
					if($(selectYearList[i]).find("a").hasClass("on")){
						selectYear = $(selectYearList[i]).find("a").text()
					}
				}
				if(selectYear == null){
					selectYear = companyDataYear;
				}
				
				$technicalBizMapApi.request.openApiGetAllLq(themeCd, themeNm, type, base_region, selectYear, map, standard, function(res, options){
					map.openApiBoundarySido(map.bnd_year, function() {	
						var dataBoardOption = {
								featureData : res.result,
								standard : options.standard,
								adm_cd : res.pAdmCd,
								year : options.year,
								selectThemeCd : options.themeCd,
								base_region : "country",
								params : {
									map : map
								}
						}
						$technicalBizDataBoard.ui.updateDataBoard(dataBoardOption,"lq");	
					});
				});
			},
			//2017.10.16 개발팀 추가 종료
			
			/**
			 * 
			 * @name         : clearIntroData
			 * @description  : 업종별 지역현황정보를 조회한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			clearIntroData : function(map) {
				var markerGroup = this.introMarkerManageInfo[map.id];
				var viewId = map.id+1;
				if (markerGroup != undefined) {
					for (var i=0; i<markerGroup.markers.length; i++) {
						var marker = markerGroup.markers[i].marker;
						marker.remove();
					}
					markerGroup = undefined;
				}
				
				if (this.sigunguMarkers != null && this.sigunguMarkers.length > 0) {
					for (var i=0; i<this.sigunguMarkers.length; i++) {
						var markers = this.sigunguMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
					this.sigunguMarkers = null;
				}
				
				//시도별 기술업종현황 파이차트 마커 초기화
				if (this.sidoPieChartMarkers != null && this.sidoPieChartMarkers.length > 0) {
					for (var i=0; i<this.sidoPieChartMarkers.length; i++) {
						this.sidoPieChartMarkers[i].remove();
					}
					this.sidoPieChartMarkers = null;
				}
				
				map.clearDataOverlay();
				map.multiLayerControl.clear();
				
				this.doSupplyMarkerClear();
				this.doIndustryMarkerClear();
				
				if (map.geojson) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				$technicalBizMap.noReverseGeoCode = false;
				
				//2018.01.19 [개발팀]
				this.heatMapList = [];
				
			},
			
			/**
			 * 
			 * @name         : checkBlankLayer
			 * @description  : blank 레이어를삭제한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkBlankLayer : function(map) {
				if (!map.isBlankLayer) {
					var viewId = map.id + 1;
					//map.openApiBoundarySido(map.bnd_year);
					map.mapMode = "normal";
					map.gMap.removeLayer(map.blankLayer);
					map.tileLayer.addTo(map.gMap);
					map.setFixedBoundLevel(false);

					$("#view"+viewId).find(".tb_trade").show();
					$("#view"+viewId).find(".tb_clear").parent().show();
					$("#view"+viewId).find(".tb_report").parent().show();
					$("#poi_"+map.mapBtnInfo.id).show();
					$("#set_"+map.mapBtnInfo.id).show();
					$("#map_"+map.mapBtnInfo.id).show();
					$("#legend_"+map.legend.id).show();
				}
			},
			
			/**
			 * 
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 2015. 12. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doDone : function(type) {
				var map = this.mapList[this.curMapId];
				if (type == "sharedlg") {
					copyToClipboard($("#sharedlg").find($("input")).val());
				}
				else if (type == "bookmarkdlg") {
					map.shareInfo.doBookMark($("#savesubj").val(), "TECH");
				}
				$("#"+type).hide();
				
			},
			
			/**
			 * 
			 * @name         : doCancel
			 * @description  : 경계정보 설정을 취소한다.
			 * @date         : 2015. 10. 13. 
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
				$("#"+type).hide();
				
			},
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				if (type == "mini") {
					return;
				}
				//2017.10.17 개발팀 showName 추가 count 추가
				var showName = {
						"corp_cnt"   : "사업체수",
						"worker_cnt" : "종사자수",
						"techbiz_corp_cnt" : "기술업종수",
						"corp_per" : "업종비율",
						"resid_ppltn_cnt" : "거주인구수",
						"worker_cnt" : "종사자수",
						"avg_worker_cnt" : "평균종사자수",
						"country_vs_corp_lq" : "사업체 입지계수",
						"sido_vs_corp_lq" : "사업체 입지계수",
						"country_vs_worker_lq" : "종사자 입지계수",
						"sido_vs_worker_lq" : "종사자 입지계수",
						"count" : "",
				};
				//2017.11.02 개발팀 변수 추가
				var admNmCssChange = false;
				var html = "<div style='margin:10px;'>";
				if (type == "data") {
					if (data.info != undefined && data.info.length > 0) {
						for (var i = 0; i < data.info.length; i++) {
							var tmpData = data.info[i];	
							if (i == 0) {
								if (tmpData.adm_nm !== undefined) {
									html += "<div class='admName'>"
											+ tmpData.adm_nm 
											+ "</div>"
								}
							}
							for (key in tmpData) {
								if (key == tmpData.showData) {
									var value;
									
									//2017.11.01 개발팀 변경 조건 검색시 툴팁 변경
									if(tmpData.showData == "count"){
										html = "";
										admNmCssChange = true;
										var techNm = {
												11 : "첨",
												12 : "고",
												13 : "중",
												14 : "저",
												21 : "창",
												22 : "ICT",
												23 : "서"
										};
										
										var techClass = {
												11 : "tb01",
												12 : "tb02",
												13 : "tb03",
												14 : "tb04",
												21 : "tb05",
												22 : "tb06",
												23 : "tb07"
										};
										value = "";

										html += "<div class='teclqTooltipBox' style='margin:10px;'>";
										html += 	"<div class='topbar' style='width:200px;'>"+tmpData.adm_nm+"</div>";
										html += 	"<div class='popContents' style='margin-top:10px;'>";
										
										var techBizList = data.info[0].techBiz;
										for(var i = 0; i < techBizList.length; i++){
											html += '<span class="'+techClass[techBizList[i]] +'" style="height:30px;line-height:30px;">'+techNm[techBizList[i]]+'</span>';
										}
										html +=			"<div style='height:20px;'></div>";
										html += 	"</div>";
										
									}else{
										// 2016. 03. 24 j.h.Seok modify
										//2017.02.23
										/*if (parseFloat(tmpData[tmpData.showData]) < 5 && (tmpData.showData != "corp_cnt" && tmpData.showData != "tot_worker")) {
											value = "N/A";
										}else {*/
											value = showName[tmpData.showData]+" : "+appendCommaToNumber(tmpData[tmpData.showData]);
										//}
										html += "<tr><td class='statsData'>"
												+ value;
										if (value != "N/A") {
											html += " ("+ tmpData.unit +")";
										}
										html +=	"</td></tr>";
									}
									
								}
							}				
						}
						
						//조건별 지역 찾기에서는 툴팁을 변경한다.
						//data.info[i].showData == count
					} else {
						html += "<div class='statsData'>N/A</div>";
					}
				}else if (type == "density") {
					html += "<span style='font-size:11px;'>해당 지역을 누르면, 밀집도정보를 보실 수 있습니다.<span>";
				}
				
				html += "</div>";
				
				// 2017.03.24j 업종밀집도변화 선택시 조건검색안했는데도 지도에 tooltip 뜨는것을 방지 
				if(type == "data" || $("#rd_cate02").is(":checked") || $("input[name=rd_goocha]").is(":checked")){	
					event.target.bindToolTip(html, {
						direction: 'right',
						noHide:true,
						opacity: 1
	
					}).addTo(map.gMap)._showToolTip(event);
				}
				
				if(admNmCssChange == true){
					$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de")
					.css("width","150px")
					.css("text-align","center");
				}else{
					$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				}
				
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
				$(".admName_mini")
					.css("font-size", "10px")
					.css("color", "#3792de");
			},
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			requestOpenApi : function(options) {
				var type = {
						"jobChange"  : 0,	//업종밀집도
						"areaInfo"	 : 1,	//지역종합정보
						"areaSearch" : 2	//지역찾기
				};
				var reqType = {
						"company" 	 : 0,	//사업체검색
						"population" : 1,	//인구검색
						"household"  : 2,	//가구검색
						"house"  	 : 3	//주택검색
				};
				
				var map = options.params.map;
				if(options.type == "areaSearch") {	//지역찾기일 경우 options 아래 map이 있음
					map = options.map;
				}
				
//				this.doClearMap(map.id+1);
				switch(type[options.type]) {
					case 0:
						map.isDrop = true;
						map.autoDownBoundary();
						if (map.geojson) {
							map.geojson.remove();
						}
						$technicalBizMapApi.request.openApiPoiCompanyDensity(
								options.dataBoard.themeCd, 
								options.params.adm_cd, 
								options.params.year, 
								0,
								500, 
								map, options);
						break;
						
					case 1:
						var params = {
							"adm_cd" : options.params.adm_cd,
							"year" : "2010",
							"bnd_year" : bndYear,
							"area_type" : 0,
							"low_search" : 1
						};
						var url = null;
						var api_id = null;
						var filter = null;
						var unit = null;
						var zoom = null;
						switch(reqType[options.reqType]) {
							case 0:
								params = {
									"adm_cd" : options.params.adm_cd,
									"year" : "2014",
									"bnd_year" : bndYear,
									"low_search" : 1
								};
								api_id = "API_0301";
								filter = "corp_cnt";
								unit = "개";
								url = $technicalBizMapApi.request.API_0301_URL;
								break;
							case 1:
								api_id = "API_0302";
								filter = "population";
								unit = "명"; 
								url = $technicalBizMapApi.request.API_0302_URL;
								break;
							case 2:
								api_id = "API_0305";
								filter = "household_cnt";
								unit = "가구";
								url = $technicalBizMapApi.request.API_0305_URL;
								break;
							case 3:
								api_id = "API_0306";
								filter = "house_cnt";
								unit = "호"; 
								url = $technicalBizMapApi.request.API_0306_URL;
								break;
						}
						var statInfo = {
								api_call_url : url,
								param_info : {
									api_id : api_id,
									isKosis : false,
									mapInfo : {
										center : options.params.center,
										zoomlevel : options.params.zoom
									},
									paramInfo : params,
									showData : filter,
									title : "",
									unit : unit,
									adm_nm : options.params.adm_nm
								},
								map : map
						}
						map.lastGeojsonInfo = null;
						this.curDropParams[map.id] = statInfo;
						$technicalBizMapApi.request.openApiStatBaseYearProcess(api_id, params, {info:statInfo});
						
						break;
						
					case 2:
						$technicalBizMapApi.request.openApiPplSummary(options);
						break;
				}
			},
			
			/**
			 * 
			 * @name         : reqSetParams
			 * @description  : 통계정보 파라미터를 설정한다.
			 * @date         : 2015. 10. 30. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			reqSetParams : function (tmpParam, adm_cd, adm_nm, api_id, map) {
				var params = {
						param : tmpParam.params,
						noneParams : tmpParam.noneParams,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						filter : tmpParam.filterParam,
						unit : tmpParam.unit,
						title : tmpParam.title,
						api_id : api_id,
						map : map,
						view_type : "NM",
						maxYear : tmpParam.maxYear
				};	
				params.param.push({
					key : "low_search",
					value : map.boundLevel
				});
				
				return params;
			},
			
			/**
			 * 
			 * @name         : deSelectedIntroMarker
			 * @description  : 인트로화면의 경계 deselected 시 마커를 다시 설정한다.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			deSelectedIntroMarker : function(layer, map) {
				var markerGroup = this.introMarkerManageInfo[map.id];
				if (markerGroup.deselectedMarker != null) {
					var marker = markerGroup.deselectedMarker.marker;
					var adm_cd = markerGroup.deselectedMarker.adm_cd;
					var tmpMarkerList = [];
					for (var i=0; i<markerGroup.markers.length; i++) {
						var tmpLayer = markerGroup.markers[i];
						if (tmpLayer.adm_cd == adm_cd) {
							tmpLayer.marker.remove();
							var utmk_x = tmpLayer.marker._utmk.x;
							var utmk_y = tmpLayer.marker._utmk.y;
							var markerIcon = sop.icon({
								iconUrl: '/img/ico/ico_mapIcon.png',
								iconAnchor: [16.5, 45 ],
								iconSize: [ 33, 45 ],
								infoWindowAnchor: [1, -45]
							});
							var marker = sop.marker([utmk_x, utmk_y], {
								icon: markerIcon
							});
							marker.addTo(map.gMap);	
							tmpMarkerList.push({
								adm_cd : tmpLayer.adm_cd,
								marker : marker
							});
						}else {
							tmpMarkerList.push(tmpLayer);
						}
					}
					this.introMarkerManageInfo[map.id].markers = tmpMarkerList;
				}
			},
			
			/**
			 * 
			 * @name         : selectedIntroMarker
			 * @description  : 인트로화면의 경계 selected 시 마커를 다시 설정한다.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			selectedIntroMarker : function(layer, map) {
				var tmpMarkerList = [];
				var markerGroup = this.introMarkerManageInfo[map.id];
				for (var i=0; i<markerGroup.markers.length; i++) {
					var tmpLayer = markerGroup.markers[i];
					if (tmpLayer.adm_cd == layer.feature.properties.adm_cd) {
						tmpLayer.marker.remove();
						var utmk_x = layer.feature.properties.x;
						var utmk_y = layer.feature.properties.y;
						var markerIcon = sop.icon({
							iconUrl: '/img/ico/ico_mapIcon_on.png',
							iconAnchor: [16.5, 45 ],
							iconSize: [ 33, 45 ],
							infoWindowAnchor: [1, -45]
						});
						var tmpMarker = sop.marker([utmk_x, utmk_y], {
							icon: markerIcon
						});
						tmpMarker.bindInfoWindow("<div>"+ layer.feature.properties.adm_nm +"</div>");
						tmpMarker.addTo(map.gMap);
						tmpMarker.openInfoWindow();

						var markerInfo = {
							adm_cd : tmpLayer.adm_cd,
							marker : tmpMarker
						};
						markerGroup.deselectedMarker = markerInfo;
						tmpMarkerList.push(markerInfo);
					}else {
						tmpMarkerList.push(tmpLayer);
					}

				}
				this.introMarkerManageInfo[map.id].markers = tmpMarkerList;
				map.curSelectedLayer = layer;
			},
			
			/**
			 * 
			 * @name         : doConvertHeatMap
			 * @description  : 줌레벨에 따라 heatMap <-> dotMap을 수행한다.
			 * @date         : 2015. 11. 24. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param map    : map 객체
			 * @param type	 : heatMap, dotMap
			 */
			doConvertHeatMap : function(map, type) {
				if (map.legend.circleMarkerGroup != null) {
		    		for (var i=0; i<map.legend.circleMarkerGroup.length; i++) {
			    		var marker = map.legend.circleMarkerGroup[i];
			    		marker.remove();
			    	}
		    		map.legend.circleMarkerGroup = null;
		    	}
				if (map.legend.circleMarkerGroup == null) {
					map.legend.circleMarkerGroup = [];
				}
				this.heatMapList[map.id].type = type;
					
				if (map.heatMap) {
					map.heatMap.setUTMKs([]);
				}
				var dataList = this.heatMapList[map.id];
				if (type == "dotMap") {
					for (var i=0; i<dataList.data.length; i++) {
						var x = dataList.data[i].x;
						var y = dataList.data[i].y;
						var toolTip  = "<div style='margin:10px;'>";
				    		toolTip += 		"<div>";
				    		toolTip += 			"<a style='font-size:14px;font-weight:bold;color:#3792de;'>"+ dataList.data[i].corp_nm +"</a>";
				    		toolTip +=		"</div>";
				    		toolTip +=		"<div style='height:5px;'></div>";
				    		toolTip += 		"<div style='font-size:12px;'>";
				    		toolTip += 			"<a>"+ dataList.data[i].naddr +"</a>";
				    		toolTip +=		"</div>";
				    		//2018.01.16 [개발팀] 주석처리
				    		/*toolTip += 		"<div style='font-size:12px;'>";
				    		toolTip += 			"<a>"+ dataList.data[i].theme_nm +"</a>";
				    		toolTip +=		"</div>";*/
				    		toolTip += "</div>";
			    				
				    	var marker = map.addCircleMarker(x, y, {
				    		radius : map.legend.legendDotRadius,
				    		color : map.legend.legendColor1,
				    		fillColor : map.legend.legendColor1,
				    		tooltipMsg : toolTip 
				    	});
				    	map.legend.circleMarkerGroup.push(marker);
					}
					map.legend.setLegendParams("dot", map.legend.legendColor, map.legend.lv);
				}else {
					for (var i=0; i<dataList.data.length; i++) {
						var x = dataList.data[i].x;
						var y = dataList.data[i].y;
						map.addHeatMap(x, y, 1);
					}
					map.legend.setLegendParams("heat", map.legend.legendColor, map.legend.lv);
				}
			},
			
			/**
			 * 
			 * @name         : companyDensityClick
			 * @description  : 업종별 밀집도보기 선택시, 설정을 수행한다.
			 * @date         : 2015. 11. 25. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param themeCd: 테마코드
			 * @param admCd	 : 행정동코드
			 * @param admNm  : 행정동이름
			 * @param x_coord: 행정동 x좌표
			 * @param y_coord: 행정동 y좌표
			 */
			companyDensityClick : function(themeCd, themeNm, admCd, admNm, x_coord, y_coord) {
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				$technicalBizMap.noReverseGeoCode = true;
				map.isBlankLayer = false;
				map.gMap.setMinZoom(2);
				map.gMap.scrollWheelZoom.enable();
				this.doNormalMapInit();
				
				$("#view"+viewId).find(".helperText").html("업종밀집도변화");
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_clear").parent().hide();
				$("#view"+viewId).find(".tb_report").parent().hide();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$(".btn_legendSetting").hide();
				$("#legend_"+map.legend.id).show();
				
				$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "heat") {
						$(this).find("a").click();
					}
				});
				
				$technicalBizLeftMenu.ui.curSelectedStatsType = "density";
				
				setTimeout(function() {
					var adm_cd = admCd;
					var adm_nm = admNm;
					var type = "1";
					
					var options = {
							params : {
								adm_cd : adm_cd,
								adm_nm : adm_nm,
								theme_cd : themeCd,
								map : map,
								year : companyDataYear
							},
							dataBoard : {
								jobAreaThemeCd : themeCd,
								themeCd : themeCd,
								themeNm : themeNm
							},
							etc : {
								themeCd : themeCd,
								curPolygonCode :map.curPolygonCode,
								year : companyDataYear,
							}
					};
												
					switch (adm_cd.length) {
						case 5:
							map.clearDataOverlay();
							map.mapMove([x_coord, y_coord], 7, true);
							break;
					}
					
					setTimeout(function() {
						map.openApiBoundaryHadmarea(adm_cd, map.bnd_year, "1", null);
						options["preLayer"] = {
								adm_cd : options.params.adm_cd,
								adm_nm : options.params.adm_nm,
								x : x_coord,
								y : y_coord
						};
						options.params.adm_cd = adm_cd;
						options.params.adm_nm = adm_nm;
						$technicalBizDataBoard.ui.updateDataBoard(options, "density");
					}, 300);
				}, 300);
				
			},
			
			/**
			 * 
			 * @name         : regionComplexClick
			 * @description  : 지역 종합현황보기 선택시, 설정을 수행한다.
			 * @date         : 2015. 11. 25. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param admCd	 : 행정동코드
			 * @param admNm  : 행정동이름
			 * @param x_coord: 행정동 x좌표
			 * @param y_coord: 행정동 y좌표
			 */
			regionComplexClick : function(admCd, admNm, x_coord, y_coord) {
				var map = this.mapList[this.curMapId];
				var params = {
						params : {
							adm_cd : admCd,
							adm_nm : admNm,
							zoom : 5,
							center : [x_coord, y_coord],
							map : map
						},
						type : "areaInfo"
				};
				
				//intro 백지도에서 일반지도로 변경한다.
				map.mapMode = "normal";
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				map.isLayerMouseEventDisabled = false;
				this.clearIntroData(map);
				this.checkBlankLayer(map);
				
				//무조건 시군구데이터 이므로 강제로 줌레벨을 시군구레벨로 이동시킨다.
				//drop할때와 마찬가지로 drop정보를 설정한다.
				map.setZoom(5);
				map.dropInfo = {
						center : [x_coord, y_coord],
						zoom : 5
				};

				map.legend.legendInit();
				this.curDropParams[map.id] = params;
				setTimeout(function() {
					$technicalBizDataBoard.ui.updateDataBoard(params, "areaInfo");
				}, 500);
			},
			
			/**
			 * 
			 * @name         : setTitle
			 * @description  : 타이틀을 설정한다.
			 * @date         : 2015. 12. 31. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param title	 : 제목
			 */
			setTitle :function(title, viewId) {
				$("#view"+viewId).find(".helperText").html(title);
			},
			
			/**
			 * @name         : changePopupIntroTabs
			 * @description  : 팝업 인트로창 탭 변경 이벤트
			 * @date         : 2016. 10. 12. 
			 * @author	     : 김재상
			 */
			changePopupIntroTabs : function(type){
				$(".introCommonTabs").removeClass("on");
				$(".introCommonTabs#ict_"+type).addClass("on");
				
				$(".iaDefault").hide();
				$("#iadBox_"+type).show();
				
				switch(type){
					case "chart":
						$technicalBizMapApi.request.popupIntroChart();
					default:
						$(".iatcSrcollBox").mCustomScrollbar("destroy");
						break;
					case "code":
						this.changePopupCodeTabs(1, 11);
						$(".iatcSrcollBox").mCustomScrollbar({axis:"xy"});
						break;
				}
			},
			
			/**
			 * @name         : changePopupCodeTabs
			 * @description  : 팝업 코드창 탭 변경 이벤트
			 * @date         : 2016. 10. 12. 
			 * @author	     : 김재상
			 */
			changePopupCodeTabs : function(b_class_cd, m_class_cd){
				
				$(".iaSubTabs").hide();
				$("#iaSubTabs0"+b_class_cd).show();
				
				$(".iaTabs01>a,.iaSubTabs>a").removeClass("on");
				$("#iaTab0"+b_class_cd).addClass("on");
				$("#iaTab"+m_class_cd).addClass("on");
				
				$technicalBizMapApi.request.getTechCd(m_class_cd);
			},
			
			/**
			 * @name         : doUpdateDataboard
			 * @description  : 시도별/시군구별 데이터보드 업데이트
			 * @date         : 2016. 10. 21. 
			 * @author	     : 권차욱
			 */
			doUpdateDataboard : function(adm_cd, adm_nm, type) {
				var map = this.mapList[this.curMapId];
				var options = {
						params : {
							map : map,
							adm_cd : adm_cd,
							adm_nm : adm_nm
						}
				}
				$technicalBizDataBoard.ui.updateDataBoard(options, type);
			},
			
			/**
			 * 
			 * @name         : setChangeColorMode
			 * @description  : 버블지도를 색상지도로 변경한다.
			 * @date         : 2016. 10. 18. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param 	     : 
			 */
			setChangeColorMode : function() {
				var map = this.mapList[this.curMapId];
				var result = map.data[0].result;
				map.isLayerMouseEventDisabled = false;
				//map.setFixedBoundLevel(true);
				map.gMap.setMaxZoom(7);
				map.gMap.scrollWheelZoom.enable();
				
				// validation
				if (map.mapMode == "data") {
					return;
				}
				
				map.mapMode = "data";
				
				//범례설정
				$("#legendPopEvent01_"+map.legend.id).parent().show();
				$("#legendPopEvent02_"+map.legend.id).parent().show();
    			$("#bubbleLegendLine_"+map.legend.id).hide();
    			if ($("#legendBox_"+map.legend.id).hasClass("min")) {
    				$("#legendColor_"+map.legend.id).hide();
    			}else if ($("#legendBox_"+map.legend.id).hasClass("max")) {
    				$("#legendColor_"+map.legend.id).show();
    			}else {
    				$("#legendColor_"+map.legend.id).hide();
    			}
    			$("#typeArea_"+map.legend.id).removeClass().addClass("color");
    			legendColor(map.legend.legendColor2, map.legend.legendColor1, "#colorStatus_"+map.legend.id, map.legend.lv, map.legend.id, map.legend);
    			$(".btn_legendSetting").show(); //2017.02.23
    			
						
				//서클 마커 초기화
				if ($technicalBizMap.ui.sigunguMarkers != null && $technicalBizMap.ui.sigunguMarkers.length > 0) {
					for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
						var markers = $technicalBizMap.ui.sigunguMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
				}
				$technicalBizMap.ui.sigunguMarkers = [];
				if (map.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
							layer.options.type = "data";
							layer.setStyle(map.setPolygonGeoJsonStyle("data"));
							layer.feature["info"] = []; //2017.02.24
							for (var k=0; k<result.length; k++) {
								var tmpAdmCd = result[k].sido_cd + result[k].sgg_cd;
								if (layer.feature.properties.adm_cd == tmpAdmCd) {
									result[k]["showData"]= result[k].showData;
									result[k]["unit"] = result[k].unit;
									result[k]["api_id"] = "";
									result[k]["adm_cd"] = tmpAdmCd;
									result[k]["adm_nm"] = layer.feature.properties.adm_nm;
									result[k]["type"] = "sigungu";
									layer.feature.info.push(result[k]);
									layer.setStyle({
										weight : layer.options.weight,
										color : layer.options.color,
										dashArray : layer.options.dashArray,
										fillOpacity : layer.options.fillOpacity,
										fillColor : map.legend.getColor(parseFloat(result[k][result[k].showData]), map.legend.valPerSlice[0])[0]
									}); 
								}	
							}
						});
					}
				}
			},
			
			/**
			 * 
			 * @name         : setChangeBubbleMode
			 * @description  : 색상지도를 버블지도로 변경한다.
			 * @date         : 2016. 10. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param 	     : 
			 */
			setChangeBubbleMode : function() {
				var map = this.mapList[this.curMapId];
				var result = map.data[0].result;
				map.isLayerMouseEventDisabled = true;
				//map.setFixedBoundLevel(true);
				map.gMap.setMaxZoom(7);
				map.gMap.scrollWheelZoom.enable();
				
				// validation
				if (map.mapMode == "intro" && 
					$technicalBizMap.ui.sigunguMarkers != null && 
					$technicalBizMap.ui.sigunguMarkers.length > 0) {
					if ($technicalBizMap.ui.sigunguMarkers[0].theme_cd == result[0].techbiz_cd) {
						return;
					}
				}
				
				//범례설정
				$("#legendColor_"+map.legend.id).hide();
    			if ($("#legendBox_"+map.legend.id).hasClass("min")) {
    				$("#bubbleLegendLine_"+map.legend.id).hide();
    			}else if ($("#legendBox_"+map.legend.id).hasClass("max")) {
    				$("#bubbleLegendLine_"+map.legend.id).show();
    			}else {
    				$("#bubbleLegendLine_"+map.legend.id).hide();
    			}
    			$("#typeArea_"+map.legend.id).removeClass().addClass("ring");
    			legendColor(map.legend.legendColor2, map.legend.legendColor1, "#colorStatus_"+map.legend.id, map.legend.lv, map.legend.id, map.legend);
    			$(".btn_legendSetting").hide(); //2017.02.23
    			
				var tmpData = [];
				var data = [];
				var sidoCdList = [];
				var options = null;

				for (var i=0; i<result.length; i++) {
					tmpData.push(parseFloat(result[i][result[i].showData]));
					sidoCdList.push(result[i].sido_cd);
				}
				data.push(tmpData);
				map.legend.valPerSlice = map.legend.calculateLegend(data);
				map.mapMode = "intro";
				
				if (map.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
							layer.options.type = "polygon";
							layer.setStyle(map.setPolygonGeoJsonStyle("polygon"));
						});
					}
				}
				
				if (map.legend.circleMarkerGroup == null) {
					map.legend.circleMarkerGroup = [];
				}
				
				//시도별로 그룹핑
				var tmpSidoList = [];
				$.each(sidoCdList, function (i, el) {
					if ($.inArray(el, tmpSidoList) === -1) {
						tmpSidoList.push(el);
					}
				});
				
				//시도별 총 사업체수
				var totalCntInfo = {};
				for (var k=0; k<tmpSidoList.length; k++) {
					var totalCnt = 0;
					var adm_cd = tmpSidoList[k];
					for (var i=0; i<result.length; i++) {
						if (result[i].sido_cd == tmpSidoList[k]) {
							totalCnt += parseFloat(result[i][result[i].showData]);
							continue;
						}
					}
					totalCntInfo[adm_cd] = totalCnt;
				}
				
				//서클 마커 초기화
				if ($technicalBizMap.ui.sigunguMarkers != null && $technicalBizMap.ui.sigunguMarkers.length > 0) {
					for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
						var markers = $technicalBizMap.ui.sigunguMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
				}
				$technicalBizMap.ui.sigunguMarkers = [];
				
				var tmpGroup = {};
				for (var i=0; i<tmpSidoList.length; i++) {
					tmpGroup[tmpSidoList[i]] = [];
					for (var j=0; j<result.length; j++) {
						if (result[j].sido_cd == tmpSidoList[i]) {
							tmpGroup[result[j].sido_cd].push(result[j]);
						}
					}
				}
				 
				var type = "sigungu"; 
				for (var k=0; k<tmpSidoList.length; k++) {
					var markerInfo = {};
					markerInfo["sido_cd"] = tmpSidoList[k];
					markerInfo["theme_cd"] = result[0].techbiz_cd;
					var tmpMarkers = [];
					
					
					for (var i=0; i<result.length; i++) {
						if (result[i].sido_cd == tmpSidoList[k]) {
							var sggGroup = [];   
							sggGroup.push(tmpGroup[result[i].sido_cd]);
							var rate = ((parseFloat(result[i][result[i].showData])/totalCntInfo[result[i].sido_cd]) * 100).toFixed(2);
							var summary =		"<div>";
								summary += 			"<div class='bar'>";
								summary +=				result[i].sido_nm + " " +result[i].sgg_nm+" 해당 업종 현황 ("+companyDataYear+")";
								summary +=			"</div>";
								summary +=			"<div class='text01' style='margin-left:10px;'>";
								summary += 				"<p style=''>"+result[i].techbiz_nm+" : "+appendCommaToNumber(result[i][result[i].showData])+" ("+result[i].unit+")</p>";
								summary += 				"<p style=''>비율 : "+rate+"% ("+result[i].sido_nm+" 기준)</p>";
								summary +=			"</div>"; 	
								summary +=		"</div>";
				    			
			    			var sggGroupHtml =		"<div class='parScroll' id='introTooltipTable'>";
		    					sggGroupHtml +=			"<table>";
		    					sggGroupHtml +=				"<tr>";
				    			for (var j=0; j<sggGroup[0].length; j++) {
				    				if(j%3 	== 0 && j != 0)
				    					sggGroupHtml += "</tr><tr>";
				    				var sido_cd = sggGroup[0][j].sido_cd;
				    				var adm_cd = sggGroup[0][j].sido_cd + sggGroup[0][j].sgg_cd;
				    				options = {
				    						map : map,
				    						params : {
				    							theme_nm : result[i].techbiz_nm,
				    							theme_cd : result[i].techbiz_cd
				    						},
				    						themeCd : result[i].techbiz_cd,
				    						themeNm : result[i].techbiz_nm
				    				};
				    				$technicalBizMap.callbackFunc.introTooltipOptions = options;
				    				sggGroupHtml +=	"<td class='" + (result[i].sgg_cd == sggGroup[0][j].sgg_cd ? "on" : "") + "' id='" + adm_cd + "'>";
				    				sggGroupHtml +=		"<a onclick='javascript:$technicalBizMap.callbackFunc.introTooltipFunc(\"" + sido_cd + "\", \"" + adm_cd + "\", \""+sggGroup[0][j].techbiz_cd+"\", \""+sggGroup[0][j].techbiz_nm+"\", \""+sggGroup[0][j].sido_nm +" "+sggGroup[0][j].sgg_nm+"\", \""+sggGroup[0][j].x_coor+"\", \""+sggGroup[0][j].y_coor+"\", \""+type+"\");'>";
				    				sggGroupHtml += 		sggGroup[0][j].sgg_nm;
				    				sggGroupHtml += 	"</a>";
				    				sggGroupHtml +=	"</td>";
			    				}
				    			sggGroupHtml += 			"</tr>";
				    			sggGroupHtml += 		"</table>";
				    			sggGroupHtml += 	"</div>";
		    					
			    			var companyDensity =		"<div class='introTooltip_btn_wrapper' style='margin-top: 10px;'>";
				    			companyDensity += 			"<dl>";
				    			companyDensity +=				"<dt id='density'>";
				    			companyDensity +=					"<a onclick='javascript:$technicalBizMap.ui.companyDensityClick(\""+result[i].techbiz_cd+"\", \""+result[i].techbiz_nm+"\", \""+result[i].sido_cd+result[i].sgg_cd +"\", \""+result[i].sido_nm +" "+result[i].sgg_nm+"\", \""+result[i].x_coor+"\", \""+result[i].y_coor+"\", \""+type+"\");'>업종 밀집도 변화</a>"
				    			companyDensity +=				"</dt>";
				    			companyDensity += 			"</dl>";
								companyDensity +=		"</div>";
								
							var tooltipMsg = $("<div></div>").append(
									$("<div class='popAreaResult'></div>").append(summary).append(sggGroupHtml).append(companyDensity)
							).html();
				    			
				    		var colorInfo = map.legend.getColor(parseFloat(result[i][result[i].showData]), map.legend.valPerSlice[0]);
				    		var marker = map.addCircleMarker(result[i].x_coor, result[i].y_coor, {
				    			radius : map.legend.legendCircleRadius[colorInfo[1]],
				    			color : colorInfo[0],
				    			fillColor : "white",
				    			weight : 4,
				    			tooltipMsg : tooltipMsg
				    		});
				    		marker.options["sido_cd"] = result[i].sido_cd;
				    		marker.options["bFillColor"] = colorInfo[0];
				    		marker.options["adm_cd"] = result[i].sido_cd+result[i].sgg_cd;
				    		marker.options["adm_nm"] = result[i].sido_nm +" " +result[i].sgg_nm;
				    		marker.options["theme_cd"] = result[i].techbiz_cd;
				    		tmpMarkers.push(marker);
				    		marker.on("mouseover", function(e) {
				    			var markers = null;
				    			for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
				    				if ($technicalBizMap.ui.sigunguMarkers[i].sido_cd == e.target.options.sido_cd) {
				    					markers = $technicalBizMap.ui.sigunguMarkers[i].markers;
				    					break;
				    				}
				    			}
				    			$technicalBizMap.callbackFunc.didMouseOverPolygon(e, markers, "sigungu", map);
				    		});
				    		marker.on("mouseout", function(e) {
				    			$technicalBizMap.callbackFunc.didMouseOutPolygon(e, $technicalBizMap.ui.sigunguMarkers, "sigungu", map);
				    		});
				    		marker.on("click", function(e) {
				    			$technicalBizMap.callbackFunc.didSelectedPolygon(e, $technicalBizMap.ui.sigunguMarkers, "sigungu", map);
				    		});
							continue;
						} 
					}
					markerInfo["markers"] = tmpMarkers;
					$technicalBizMap.ui.sigunguMarkers.push(markerInfo);
				}
				tmpData = null;
				data = null;
			},
			
			/**
			 * 
			 * @name         : doChangeSupplyMarker
			 * @description  : 지원시설 마커를 show/hide 한다.
			 * @date         : 2016. 11. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param 	     : 
			 */
			doChangeSupplyMarker : function(type) {
				
				//마커 초기화 
				var map = this.mapList[this.curMapId];
				map.gMap.removeLayer(this.markerGroup1);
				map.gMap.removeLayer(this.markerGroup2);
				map.gMap.removeLayer(this.markerGroup3);
				map.gMap.removeLayer(this.markerGroup4);
				
				if (type.length > 0) {	
					var tmpType = type.split(",");
					for (var i=0; i<tmpType.length; i++) {
						switch(parseInt(tmpType[i])) {
							case 1:
								this.markerGroup1.addTo(map.gMap);
								break;
							case 2:
								this.markerGroup2.addTo(map.gMap);
								break;
							case 3:
								this.markerGroup3.addTo(map.gMap);
								break;
							case 4:
								this.markerGroup4.addTo(map.gMap);
								break;
						}
					}
				}
			},
			
			//2017.10.18 개발팀 추가
			/**
			 * 
			 * @name         : lqInfoTooltip
			 * @description  : 업종별 입지계수 폴리곤 클릭시 툴팁 표출
			 * @date         : 2017. 10. 17. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param 	     : 
			 */
			lqInfoTooltip : function(event,data,map){
				var html =	'<div class="teclqTooltipBox">';
					html +=		'<div class="topbar">'+event.target.feature.properties.adm_nm+'</div>';
					html +=			'<div class="popContents">';
					html +=				'<div class="areaResultCompare">';
					html +=					'<ul class="f01">';
					html +=						'<li>';
					html +=							'<p class="t01 cRed">사업체 입지계수</p>';
					if (data.info[0].showData == "country_vs_corp_lq" || data.info[0].showData == "country_vs_worker_lq"){
						html +=						'<div class="wrapLqBox"><p class="t02">'+data.info[0].country_vs_corp_lq+'</p></div>';
					}else{
						html +=						'<div class="wrapLqBox"><p class="t02">'+data.info[0].sido_vs_corp_lq+'</p></div>';
					}
					html +=							'<p class="t01 cRed">사업체수</p>';
					html +=							'<div class="wrapLqBox"><p class="t02">'+appendCommaToNumber(data.info[0].corp_cnt)+' (개)</p></div>';
					html +=							'<p class="t01 cRed">사업체 비율</p>';
					html +=							'<div class="wrapLqBox"><p class="t02">'+data.info[0].corp_per+' (%)</p></div>';
					//사업체수
					//사업체 비율
					
					html +=						'</li>';
					html +=					'</ul>';
					html +=					'<div class="lqCenterLine"></div>';
					//사업체수
					//사업체 비율
					html +=					'<ul class="f02">';
					html +=						'<li>';
					html +=							'<p class="t01 cBlue">종사자 입지계수</p>';
					if(data.info[0].showData == "country_vs_corp_lq" || data.info[0].showData == "country_vs_worker_lq"){
						html +=						'<div class="wrapLqBox"><p class="t02">'+data.info[0].country_vs_worker_lq+'</p></div>';
					}else{
						html +=						'<div class="wrapLqBox"><p class="t02">'+data.info[0].sido_vs_worker_lq+'</p></div>';
					}
					html +=							'<p class="t01 cBlue">종사자수</p>';
					html +=							'<div class="wrapLqBox"><p class="t02">'+appendCommaToNumber(data.info[0].worker_cnt)+' (명)</p></div>';
					html +=							'<p class="t01 cBlue">종사자 비율</p>';
					html +=							'<div class="wrapLqBox"><p class="t02">'+data.info[0].worker_per+' (%)</p></div>';
					//종사자수
					//종사자 비율
					
					html +=						'</li>';
					html +=					'</ul>';
					html +=				'</div>';
					//2504051
					if(event.target.feature.properties.adm_cd.toString().length != 7){
						html +=			'<div class="btnBox" style="margin-left:50px;">'
						/*html +=				'<a href="javascript:$technicalBizMap.ui.doGetSggLq(\''+event.target.feature.properties.adm_cd+'\',\''+event.target.feature.properties.adm_nm+'\','+data.info[0].techbiz_m_class_cd+','+map.id+')" class="btnGtype t01">해당지역 상세정보 보기</a>';*/
							if(data.info[0].techbiz_m_class_cd == undefined){
								html +=				'<a href="javascript:$technicalBizMap.ui.doGetSggLq(\''+event.target.feature.properties.adm_cd+'\',\''+event.target.feature.properties.adm_nm+'\','+data.info[0].techbiz_s_class_cd+','+map.id+');" class="btnGtype t01">해당지역 상세정보 보기</a>';
							}else{
								html +=			'<a href="javascript:$technicalBizMap.ui.doGetSggLq(\''+event.target.feature.properties.adm_cd+'\',\''+event.target.feature.properties.adm_nm+'\','+data.info[0].techbiz_m_class_cd+','+map.id+');" class="btnGtype t01">해당지역 상세정보 보기</a>';
							}
						html +=			'</div>';
					}
					
					html += '</div>';
					
					var coor_x = data.properties.x;
					var coor_y = data.properties.y;
					event.target.bindInfoWindow(html).addTo(map.gMap).openInfoWindow(sop.utmk(coor_x, coor_y));
			},
			
			//2017.10.18 개발팀 추가 종료
			
			//2017.10.17 개발팀 추가
			/**
			 * 
			 * @name         : doGetSggLq
			 * @description  : 시군구 지역의 입지계수 정보 조회
			 * @date         : 2017. 10. 17. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param 	     : 
			 */
			doGetSggLq : function(adm_cd,adm_nm,techbiz_m_class_cd,mapId){
				$("#technicalLqPrevButton").show();
				$technicalBizMap.noReverseGeoCode = true;
				
				var map = null;
				if(mapId == null){
					map = this.mapList[this.curMapId];
				}else{
					map = this.mapList[mapId];
				}
				/*var map = this.mapList[mapId];*/
				
				var tmpLayer = null;
				if (map.dataGeojson != null) {
					map.dataGeojson.eachLayer(function(layer) {
						if (layer.feature.properties.adm_cd == adm_cd) {
							tmpLayer = layer;
						}
					});
				}
				
				if(tmpLayer != null){
					$technicalBizMap.ui.lqLayerInfo = tmpLayer;
				}else{
					tmpLayer = $technicalBizMap.ui.lqLayerInfo;
				}
				var standard = "company";
				
				if($("#standardButton").hasClass("off")){
					standard = "worker";
				}
				var selectYearList = $("#lqInfoYearSettingList > li");
				var selectYear = null;
				for(var i = 0; i < selectYearList.length; i++){
					if($(selectYearList[i]).find("a").hasClass("on")){
						selectYear = $(selectYearList[i]).find("a").text()
					}
				}
				
				if(selectYear == null){
					selectYear = companyDataYear;
				}
				
				var center = map.gMap.getCenter();
				var x = center.x;
				var y = center.y;
				var params = {
						year : selectYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						menuType : "lq",
						standard : standard
					}
				
				map.clearDataOverlay();
				
				$technicalBizMapApi.request.openApiGetSggLq(params,techbiz_m_class_cd, map, function() {
					map.openApiBoundaryHadmarea (adm_cd, map.bnd_year, "1", null, function(res) {
						//2018.01.11 [개발팀] 줌레벨 변경
						if (map.dataGeojson != null) {
							map.gMap.fitBounds(map.dataGeojson, {
								zoom : {animate : false}
							});
						}
					});
				});
				
				/*$technicalBizMapApi.request.openApiGetSggLq(params,techbiz_m_class_cd, map, function() {
					map.mapMove([tmpLayer.feature.properties.x, tmpLayer.feature.properties.y], "4");
					map.openApiBoundaryHadmarea (adm_cd, map.bnd_year, "1", null, function(res) {
						    
					});
				});*/
				
			},
			
			
			/**
			 * 
			 * @name         : doGetSggBookMarkLq
			 * @description  : 즐겨찾기한 업종별 입지계수 시군구 불러오기
			 * @date         : 2017. 10. 17. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param 	     : 
			 */
			doGetSggBookMarkLq : function(adm_cd,adm_nm,techbiz_m_class_cd,mapId,layer,yearMTab,yearSubTab){
				$("#technicalLqPrevButton").show();
				$technicalBizMap.noReverseGeoCode = true;
				
				
				var zoom, type;
				var adm_cd = layer.feature.properties.adm_cd;
				if (adm_cd == "00") {
					zoom = 2;
					type = "1";
				}else {
					switch(adm_cd.length) {
						case 2:
							zoom = 4;
							type = "2";
							break;
						case 5:
							zoom = 7;
							type = "3";
							break;
					}
				}
				
				var map = null;
				if(mapId == null){
					map = this.mapList[this.curMapId];
				}else{
					map = this.mapList[mapId];
				}
				/*var map = this.mapList[mapId];*/
				
				
				var standard = "company";
				
				if($("#standardButton").hasClass("off")){
					standard = "worker";
				}
				var selectYearList = $("#lqInfoYearSettingList > li");
				var selectYear = null;
				for(var i = 0; i < selectYearList.length; i++){
					if($(selectYearList[i]).find("a").hasClass("on")){
						selectYear = $(selectYearList[i]).find("a").text()
					}
				}
				
				if(selectYear == null){
					selectYear = companyDataYear;
				}
				
				var center = map.gMap.getCenter();
				var x = center.x;
				var y = center.y;
				var params = {
						year : selectYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						menuType : "lq",
						standard : standard
					}
				
				map.clearDataOverlay();
				
				
				
				$technicalBizMapApi.request.openApiGetSggLq(params,techbiz_m_class_cd, map, function() {
					map.mapMove([layer.feature.properties.x, layer.feature.properties.y], "6");
					map.openApiBoundaryHadmarea (adm_cd, map.bnd_year, "1", null, function(res) {
						$("#technicalYearDbTabs > a").removeClass("on");
						$("#technicalYearDbTab_" + yearMTab).addClass("on");
						if(yearSubTab.length == 2){
							$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(yearMTab);
							/*$technicalBizDataBoardApi.request.getInnerTechCd(yearMTab,"subTechnicalYearList");*/
								
						}else{
							$technicalBizDataBoardApi.request.getInnerTechCd(yearSubTab,"subTechnicalYearList");
						}
					});
				});
				
			},
			
			/**
			 * 
			 * @name         : doGetSggSearchDetailInfo
			 * @description  : 검색된 시군구 지역의 종사자 및 사업체 수 
			 * @date         : 2017. 11. 22. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param 	     : 
			 */
			doGetSggSearchDetailInfo : function(adm_cd,adm_nm,mapId,x,y){
				var map = this.mapList[mapId];
				var zoom = 6;
				var tmpLayer = null;
				map.clearDataOverlay();
				map.mapMove([x, y], zoom);
				var selectYear = companyDataYear;
				var params = {
						year : selectYear,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						menuType : "searchDetail",
						map : map,
						type : "3"
					};
				$technicalBizMap.noReverseGeoCode = true;	//2018.01.26 [개발팀]
				$technicalBizMapApi.request.searchDetailCntInfo(params, map, function() {	
					map.openApiBoundaryHadmarea ( adm_cd, map.bnd_year, "1", null, function(res) {
						    var options = {
						    		params : {
						    			adm_cd : adm_cd,
						    			adm_nm : adm_nm,
						    			map : map,
						    			year : companyDataYear
						    		},
						    		isInit : false,
						    };
						    
						    //2018.01.26 [개발팀] 줌레벨 변경
							if (map.dataGeojson != null) {
								map.gMap.fitBounds(map.dataGeojson, {
									zoom: {animate: false}
								});
							}
					});
				});
							
			},
			
				
			
			/**
			 * 
			 * @name         : changeLqInfoChart
			 * @description  : 시군구 지역의 입지계수 정보 조회 변경
			 * @date         : 2017. 10. 23. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param 	     : 
			 */
			changeLqInfoChart : function(adm_cd,adm_nm,techbiz_m_class_cd,mapId,base_region){
				
				if(base_region == "country"){
					$("#lqInfoChartStandardButton > a").eq(0).addClass("on");
					$("#lqInfoChartStandardButton > a").eq(1).removeClass("on");
				}else{
					$("#lqInfoChartStandardButton > a").eq(0).removeClass("on");
					$("#lqInfoChartStandardButton > a").eq(1).addClass("on");
				}
				
				this.doGetSggLq(adm_cd,adm_nm,techbiz_m_class_cd,mapId);
			},
			//2017.10.17 개발팀 추가 종료
			
			//2017.10.27 개발팀 추가
			/**
			 * 
			 * @name         : searchLqSgg
			 * @description  : 시군구 지역의 입지계수 및 증감률 검색
			 * @date         : 2017. 10. 27. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param 	     : 
			 */
			searchLqSgg : function(option){
				var map = this.mapList[this.curMapId];
				option.map = map;
				if(option.selectInfoType == "lq"){
					//lq 검색
					$technicalBizMapApi.request.openApiSearchLq(option);
				}else{
					//증감률 검색
					$technicalBizMapApi.request.openApiSearchIrds(option);
				}
			},
			//2017.10.27 개발팀 추가 종료
			
			/**
			 * 
			 * @name         : doSupplyDetailRegionInfo
			 * @description  : 지역별 지원시설 정보를 조회한다.
			 * @date         : 2016. 11. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param 	     : 
			 */
			doSupplyDetailRegionInfo : function(layer, map) {
				$("#supplyDetailDiv > .mapBefore").show();
				var zoom, type;
				
				//집계구에서는 조회되지 않도록 한다.
				if (layer.feature.properties.adm_cd.length > 5) {
					//messageAlert.open("알림", "상세보기는 시군구레벨까지만 지원합니다.");
					return;
				}
				
				var adm_cd = layer.feature.properties.adm_cd;
				if (adm_cd == "00") {
					zoom = 2;
					type = "1";
				}else {
					switch(adm_cd.length) {
						case 2:
							zoom = 4;
							type = "2";
							break;
						case 5:
							zoom = 7;
							type = "3";
							break;
					}
				}

				var params = {
						year : companyDataYear,
						adm_cd : layer.feature.properties.adm_cd,
						adm_nm : layer.feature.properties.adm_nm,
						type : type,
						menuType : "supply"
					}
					this.doSupplyMarkerClear();
				 	$technicalBizDataBoard.ui.mapData[map.id].options["preLayer"] = layer;
				 	$technicalBizDataBoard.ui.chartDataList = [];
					$technicalBizMapApi.request.openApiSupplyRegionInfo(params, map, function() {
						//map.mapMove([layer.feature.properties.x, layer.feature.properties.y], zoom); //2018.01.11 [개발팀] 주석처리
						map.openApiBoundaryHadmarea ( layer.feature.properties.adm_cd, map.bnd_year, "1", null, function(res) {
								var options = {
							    		params : {
							    			adm_cd : layer.feature.properties.adm_cd,
							    			adm_nm : layer.feature.properties.adm_nm,
							    			map : map,
							    			year : companyDataYear
							    		},
							    		isInit : false, //2017.05.02 총사업체/총종사자 중 하나를 선택하고, 지역을 선택했을 때 무조건 총사업체로 초기화되는 현상,
							    		/*corp_worker_type : $("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").hasClass("on") ? "1" : "2"*/
							    		corp_worker_type :$("#standardButton").hasClass("off") ? "2" : "1" 
							    };
							   // $("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
							    var type = "1";
								if ($("#standardButton").hasClass("off")) {
									type = "2";
								}
							    $technicalBizDataBoard.ui.changeSupplyMap(type);
								$technicalBizDataBoard.ui.startUpSupplyClick(options);	
								
								//2018.01.11 [개발팀] 줌레벨 변경
								if (map.dataGeojson != null) {
									map.gMap.fitBounds(map.dataGeojson, {
										zoom: {animate: false}
									});
								}
						});
					});
				
			},
			
			doDetailRegionInfo : function(options, techCd, type) {
				if (type == "supply" || type == "industry") {
					if (options.preLaye == undefined) {
						return;
					}
					var adm_cd = options.preLayer.feature.properties.adm_cd;
					var adm_nm = options.preLayer.feature.properties.adm_nm;
					var map = options.params.map;
					var techbiz_class_cd;
					var tmpType;
					
					if (adm_cd == "00") {
						tmpType = "1";
					}else {
						switch(adm_cd.length) {
							case 2:
								tmpType = "2";
								break;
							case 5:
								tmpType = "3";
								break;
						}
					}

					switch(parseInt(techCd)) {
						case 1:
							techbiz_class_cd = "11";
							break;
						case 2:
							techbiz_class_cd = "12";
							break;
						case 3:
							techbiz_class_cd = "13";
							break;
						case 4:
							techbiz_class_cd = "14";
							break;
						case 5:
							techbiz_class_cd = "21";
							break;
						case 6:
							techbiz_class_cd = "22";
							break;
						case 7:
							techbiz_class_cd = "23";
							break;
					}
					
					options.params["techbiz_class_cd"] = techbiz_class_cd;
					options.params["pass"] = true;
					
					$technicalBizMapApi.request.openApiSupplyRegionInfo(options.params, map, function() {
						var data = map.data[0];
						map.setLegendForStatsData();
						
						if (map.dataGeojson) {
							map.dataGeojson.eachLayer(function(layer) {
								layer.options.type = "data";
								layer.setStyle(map.setPolygonGeoJsonStyle("data"));
								
								for (var k=0; k<data.result.length; k++) {
									var tmpAdmCd = data.result[k].adm_cd;
									if (layer.feature.properties.adm_cd == tmpAdmCd) {
										layer.feature["info"] = [];
										data.result[k]["showData"]= data.showData;
										data.result[k]["unit"] = data.unit;
										data.result[k]["api_id"] = data.id;
										data.result[k]["adm_cd"] = tmpAdmCd;
										data.result[k]["adm_nm"] = layer.feature.properties.adm_nm;
										data.result[k]["type"] = type;
										layer.feature.info.push(data.result[k]);
										layer.setStyle({
											weight : layer.options.weight,
											color : layer.options.color,
											dashArray : layer.options.dashArray,
											fillOpacity : layer.options.fillOpacity,
											fillColor : map.legend.getColor(parseFloat(data.result[k][data.showData]), map.legend.valPerSlice[0])[0]
										}); 
									}	
								}
							});
							
						//2017.05.02 성남시일 경우, 총사업체<->총종사자 변환 안되는 문제
						}else if ($technicalBizMap.ui.isLocalGov == true && map.multiLayerControl.dataGeojson.length > 0) {
							if (map.multiLayerControl.dataGeojson) {
								for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
									var dataGeojson = map.multiLayerControl.dataGeojson[i];
										dataGeojson.eachLayer(function(layer) {
										layer.options.type = "data";
										layer.setStyle(map.setPolygonGeoJsonStyle("data"));
										
										for (var k=0; k<data.result.length; k++) {
											var tmpAdmCd = data.result[k].adm_cd;
											if (layer.feature.properties.adm_cd == tmpAdmCd) {
												layer.feature["info"] = [];
												data.result[k]["showData"]= data.showData;
												data.result[k]["unit"] = data.unit;
												data.result[k]["api_id"] = data.id;
												data.result[k]["adm_cd"] = tmpAdmCd;
												data.result[k]["adm_nm"] = layer.feature.properties.adm_nm;
												data.result[k]["type"] = type;
												layer.feature.info.push(data.result[k]);
												layer.setStyle({
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													fillColor : map.legend.getColor(parseFloat(data.result[k][data.showData]), map.legend.valPerSlice[0])[0]
												}); 
											}	
										}
									});
								}
							}
						}
					});
					
				}else {
					
				}
				
			},
			
			/**
			 * 
			 * @name         : doPrevRegionInfo
			 * @description  : 이전 정보로 이동한다.
			 * @date         : 2016. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type	 : 메뉴타입
			 */
			doPrevRegionInfo : function(type) {
				var map = this.mapList[this.curMapId];
				var options = $technicalBizDataBoard.ui.mapData[map.id].options;
				switch (type) {
					case "density":
						if (options != undefined && options != null) {
							var adm_cd, type;
							if (map.heatMap) {
								map.heatMap.setUTMKs([]);
							}
							if (map.geojson) {
								map.geojson.remove();
								map.geojson = null;
							}
							if (map.dataGeojson) {
								map.dataGeojson.remove();
								map.dataGeojson = null;
							}
							map.clearData();
							map.lastGeojsonInfo = null;
							switch (options.params.adm_cd.length) {
								case 2:
									$("#densityDiv > .MapBefore").hide();
									type = "1";
									adm_cd = null;
									adm_nm = "전국";
									map.mapMove([options.preLayer.x, options.preLayer.y], 2, true);
									setTimeout(function() {
										map.openApiBoundarySido(map.bnd_year);
										var params = {
												theme_cd : options.dataBoard.themeCd,
												adm_cd : adm_cd,
												year : options.params.year
										};
										options.params.adm_cd = adm_cd;
										options.params.adm_nm = adm_nm;
										$technicalBizDataBoard.ui.updateDataBoard(options, "density");
									},300);
									break;
								case 5:
								case 7:
									$("#densityDiv > .MapBefore").show();
									type = "2";
									adm_cd = options.preLayer.adm_cd;
									adm_nm = options.preLayer.adm_nm;
									if (!$technicalBizMap.ui.isLocalGov) {
										setTimeout(function() {
											map.mapMove([options.preLayer.x, options.preLayer.y], 5, true);
										}, 1000);
									}
									setTimeout(function() {
										if ($technicalBizMap.ui.isLocalGov) {
											$technicalBizMap.ui.doSungNamBoundary();
										}else {
											map.openApiBoundaryHadmarea (adm_cd, map.bnd_year, "1", null);
										}
										var params = {
												theme_cd : options.dataBoard.themeCd,
												adm_cd : adm_cd,
												year : options.params.year
										};
										options.params.adm_cd = adm_cd;
										options.params.adm_nm = adm_nm;
										$technicalBizDataBoard.ui.updateDataBoard(options, "density");
									},200);
									break;
							}
						}
						break;
					case "supply":
						if (options != undefined && options != null) {
							if (options.preLayer != undefined) {
								var adm_cd = options.preLayer.feature.properties.adm_cd;
								var adm_nm = options.preLayer.feature.properties.adm_nm;
								switch (adm_cd.length) {
									case 2:	//현재 시도정보 
										//전국레벨로 이동
										this.doSupplyFacilitiesIntro(false); //2017.05.02
										break;
									case 5: //현재 시군구정보
										if (this.isLocalGov) {
											this.doSupplyFacilitiesIntro(false); //2017.05.02
										}else {
											var tmpLayer = {
													feature : {
														properties : {
															adm_cd : adm_cd.substring(0,2),
															adm_nm : adm_nm.split(" ")[0],
															x : options.preLayer.feature.properties.x,
															y : options.preLayer.feature.properties.y
														}
													}
											};
											map.mapMove([tmpLayer.feature.properties.x, tmpLayer.feature.properties.y], 4);
											this.doSupplyDetailRegionInfo(tmpLayer, map);
										}
										break;
									default:
										break;
								}
							}
						}else {
							this.doSupplyFacilitiesIntro(true); //2017.05.02
						}
						break;
					case "industry":
						$(".industryDetailStep01").show();
						if (options != undefined && options != null) {
							if (options.preLayer != undefined) {
								var adm_cd = options.preLayer.feature.properties.adm_cd;
								var adm_nm = options.preLayer.feature.properties.adm_nm;
								switch (adm_cd.length) {
									case 2:	//현재 시도정보 
										//전국레벨로 이동
										this.doIndustrialComplexIntro(false); //2017.05.02
										break;
									case 5: //현재 시군구정보
										if (this.isLocalGov) {
											this.doIndustrialComplexIntro(false); //2017.05.02
										}else {
											if (map.dataGeojson) {
												adm_cd = adm_cd.substring(0,2);
												adm_nm = adm_nm.split(" ")[0];
											}
											var tmpLayer = {
													feature : {
														properties : {
															adm_cd : adm_cd,
															adm_nm : adm_nm,
															x : options.preLayer.feature.properties.x,
															y : options.preLayer.feature.properties.y
														}
													}
											};
											map.mapMove([tmpLayer.feature.properties.x, tmpLayer.feature.properties.y], 4);
											this.doIndustryDetailRegionInfo(tmpLayer, map);
										}
										break;
									default:
										break;
								}
							}else {
								this.doIndustrialComplexIntro(true); //2017.05.02
							}
						}
						break;
					//2017.10.24 개발팀 추가
					case "lq" :
						$("#lqIncreaseTab").hide();
						var adm_cd = $("#technicalLqDivAreaBox").data("admcd");
						var techbiz_m_class_cd = $("#technicalLqDivAreaBox").data("classCd");
						var standard = "company";
						 if($("#standardButton").hasClass("off")){
							 standard = "worker";
						 }
						var pAdmCd = null;
						if(adm_cd.length == 2) {
							pAdmCd = "00";
							//getAll
							$technicalBizMap.ui.doReqAllLq(techbiz_m_class_cd,'','0','country',standard);
						}else{
							pAdmCd = adm_cd.substring(0,2);
							 $technicalBizMap.ui.doGetSggLq(pAdmCd,'',techbiz_m_class_cd,null);
							//doGet
						}
						
						
						break;
						
					case "search" :
						$("#mapDataStandard").hide();
						var param = $technicalBizDataBoard.ui.searchOption;
					    var dataArray = $technicalBizDataBoard.ui.searchDataArray;
						
						var checkedBox = new Array();
						var checkBoxList = $("#searchTechBizCheckBoxList > a");
						for(var j=0; j < checkBoxList.length; j++ ){
							if($(checkBoxList[j]).hasClass("on")){
								checkedBox.push(j);
							}
						}
						var techbizSearchTabList = $("#techbizSearchTabList > a");
						var selectTechBizTab = 0;
						for(var j = 0 ; j < techbizSearchTabList.length; j++){
							if($(techbizSearchTabList[j]).hasClass("on")){
								selectTechBizTab = j;
							}
						}
						
						//afterCheckBox
						//afterSelectTabl
						
						var option = {
								lq_base_region	: "country",
								techbiz_class_cd : param.techbiz_class_cd,
								selectInfoType : param.selectInfoType,
								option1 : param.option1, 
								option2 : param.option2,
								param : param.param,
								is_contain_bizfac : param.is_contain_bizfac,
								is_contain_induscom : param.is_contain_induscom,
								afterCheckBox : checkedBox,
								afterSelectTabl : selectTechBizTab,
								
						}
						
						
						
						
						var callback = function(){
							$technicalBizMap.ui.searchLqSgg(option)
						}
						$technicalBizLeftMenu.ui.doBookMarkSigunguIntro(callback);
						var dataBoard = $technicalBizDataBoard.ui;
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						$technicalBizMap.ui.setTitle("조건별 지역 찾기", viewId);		
						$technicalBizMap.ui.whiteMap = true;
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doIndustryDetailRegionInfo
			 * @description  : 지역별 산업단지 정보를 조회한다.
			 * @date         : 2016. 11. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param layer	 : layer 정보
			 * @param map    : 맵 정보 
			 */
			doIndustryDetailRegionInfo : function(layer, map) {
				$("#industryDetailDiv > .mapBefore").show();
				var zoom, type;
				
				//집계구에서는 조회되지 않도록 한다.
				if (layer.feature.properties.adm_cd.length > 5) {
					return;
				}
				
				var adm_cd = layer.feature.properties.adm_cd;
				if (adm_cd == "00") {
					zoom = 2;
					type = "1";
				}else {
					switch(adm_cd.length) {
						case 2:
							zoom = 4;
							type = "2";
							break;
						case 5:
							zoom = 7;
							type = "3";
							break;
					}
				}

				var params = {
						year : companyDataYear,
						adm_cd : layer.feature.properties.adm_cd,
						adm_nm : layer.feature.properties.adm_nm,
						type : type,
						menuType : "industry"
					}
					this.doIndustryMarkerClear();
					$technicalBizDataBoard.ui.mapData[map.id].options["preLayer"] = layer;
					$technicalBizDataBoard.ui.chartDataList = [];
					$technicalBizMapApi.request.openApiSupplyRegionInfo(params, map, function() {
						//map.mapMove([layer.feature.properties.x, layer.feature.properties.y], zoom); //2018.01.11 [개발팀] 주석처리
						map.openApiBoundaryHadmarea ( layer.feature.properties.adm_cd, map.bnd_year, "1", null, function(res) {
							    var options = {
							    		params : {
							    			adm_cd : layer.feature.properties.adm_cd,
							    			adm_nm : layer.feature.properties.adm_nm,
							    			map : map,
							    			year : companyDataYear
							    		},
							    		isInit : false, //2017.05.02 총사업체/총종사자 중 하나를 선택하고, 지역을 선택했을 때 무조건 총사업체로 초기화되는 현상
							    		corp_worker_type : $("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn01").hasClass("on") ? "1" : "2"
							    };
							    //$("#legendColor_"+map.legend.id).find("li:eq(3)>a").click();
							    var type = "1";
								if ($("#standardButton").hasClass("off")) {
									type = "2";
								}
								$technicalBizDataBoard.ui.changeIndustryMap(type);
								$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab01(type);
								$technicalBizDataBoard.ui.industryDetailClick(options);
								
								//2018.01.11 [개발팀] 줌레벨 변경
								if (map.dataGeojson != null) {
									map.gMap.fitBounds(map.dataGeojson, {
										zoom : {animate : false}
									});
								}
						});
					});
				
			},
			
			/**
			 * 
			 * @name         : setNewCorpInfoList
			 * @description  : 신설법인정보 융합
			 * @date         : 2016. 12. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵 정보 
			 */
			setNewCorpInfoList : function(map) {
				if (map.data != null && map.data.length > 0) {
					var data = map.data[map.id];
					var tmpGeojson = [];
					
					if (this.isLocalGov) {
						tmpGeojson = map.multiLayerControl.dataGeojson;
					}else {
						if (map.geojson != null) {
							tmpGeojson.push(map.geojson);
						}else if (map.dataGeojson != null) {
							tmpGeojson.push(map.dataGeojson);
						}
					}
					
					if (tmpGeojson != null && tmpGeojson.length > 0) {
						var result = data.result;
						for (var i=0; i<tmpGeojson.length; i++){
							tmpGeojson[i].eachLayer(function(layer) {
								layer.options.type = "data";
								layer.setStyle(map.setPolygonGeoJsonStyle("data"));
								for (var k=0; k<result.length; k++) {
									var tmpAdmCd = result[k].adm_cd;
									if (layer.feature.properties.adm_cd == tmpAdmCd) {
										layer.feature["info"] = [];
										result[k]["showData"]= data.showData;
										result[k]["unit"] = data.unit;
										result[k]["api_id"] = data.id;
										result[k]["adm_cd"] = tmpAdmCd;
										result[k]["adm_nm"] = layer.feature.properties.adm_nm;
										result[k]["type"] = "density";
										layer.feature.info.push(result[k]);
										layer.setStyle({
											weight : layer.options.weight,
											color : layer.options.color,
											dashArray : layer.options.dashArray,
											fillOpacity : layer.options.fillOpacity,
											fillColor : map.legend.getColor(parseFloat(result[k].corp_cnt), map.legend.valPerSlice[0])[0]
										}); 
									}	
								}
							});
						}
						
					}
				}
			},
			
			/**
			 * 
			 * @name         : clearNewCorpBoundary
			 * @description  : 신설법인정보 초기화
			 * @date         : 2016. 12. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵 정보 
			 */
			clearNewCorpBoundary : function(map) {
				if (map.data != null && map.data.length > 0) {
					var data = map.data[map.id];
					var tmpGeojson = [];
					
					if (this.isLocalGov) {
						tmpGeojson = map.multiLayerControl.dataGeojson;
					}else {
						if (map.geojson != null) {
							tmpGeojson.push(map.geojson);
						}else if (map.dataGeojson != null) {
							tmpGeojson.push(map.dataGeojson);
						}
					}
					
					if (tmpGeojson != null && tmpGeojson.length > 0) {
						var result = data.result;
						for (var i=0; i<tmpGeojson.length; i++) {
							tmpGeojson[i].eachLayer(function(layer) {
								layer.options.type = "polygon";
								layer.setStyle(map.setPolygonGeoJsonStyle("polygon"));
								layer.feature.info = undefined;
								layer.unbindToolTip();
							});
						}
					}
				}
			},
			
			/**
			 * 
			 * @name         : doSggThemaInfo
			 * @description  : 인트로 - 시군구 기술업종바로가기
			 * @date         : 2017. 01. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param themeCd: 테마코드
			 */
			doSggThemaInfo : function(themeCd) {
				$technicalBizMap.ui.whiteMap = true;
				commonPopupObj.closeWin('technicalBiz_laypopup', 7);
				$technicalBizLeftMenu.ui.curSelectedStatsType = "sigungu";
				this.doCompanySidoIntro(function() {
					$("#lebelTech"+themeCd).click();
				});
			},
			
			/**
			 * 
			 * @name         : doSungNamBoundary
			 * @description  : 성남경계 조회
			 * @date         : 2017. 01. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param themeCd: 테마코드
			 */
			doSungNamBoundary : function() {
				$technicalBizMap.noReverseGeoCode = true;
				var map = this.mapList[this.curMapId];
				map.mapMove([965210, 1935917], 6);
				map.gMap.setMinZoom(5);
				
				if (map.dataGeojson) {
					map.dataGeojson.remove();
					map.dataGeojson = null;
				}
				if (map.geojson) {
					map.geojson.remove();
					map.geojson = null;
				}
				if (map.multiLayerControl.dataGeojson) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].remove();
					}
				}
				map.multiLayerControl.dataGeojson = [];
				
				map.gMap.eachLayer(function(layer) {
					if (layer._layers) {
						layer.remove();
					}
				});
				
				var admList = ["31021", "31022", "31023"];
				for (var i=0; i<admList.length; i++) {
					map.multiLayerControl.openApiBoundaryHadmarea(admList[i], bndYear, "0", null, "0", function(res) {
						var geojson = map.addPolygonGeoJson(res, "polygon");
						map.multiLayerControl.dataGeojson.push(geojson);
					});
					
				}
			},
			
			/**
			 * @name         : areaSelectSearch
			 * @description  : 조건검색 지역비교 방법 선택하기
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		: 
			 * @history 	 :
			 */
			areaSelectSearch : function(idx){
				switch(idx){
					case 0: 
						//처음 클릭 하였을때 
						$("#searchAreaBox").show();
						$("#searchAreaBox").attr("display","block");
						$(".selItemListBox > .selList02").empty();
						break;
					case 1 :
						//선택지역 집적 비교하기 , 지역 필터링 하기
						
						if($('#searchAreaBoxSelList > li:eq(0) > a').hasClass('on')){
							//선택지역 직접 비교하기
							this.areaZoneSelect();
						}else{
							//지역 필터링 하기
							this.areaFilterSelect();
						}
						
						//초기화
						$("#searchAreaBox").hide();
						$('#searchAreaBoxSelList > li > a').removeClass('on');
						$('#searchAreaBoxSelList > li:eq(0) > a').addClass('on');
						break;
						
					case 2 : 
						
						break;
				}
			},
			
			/**
			 * @name         : areaZoneSelect
			 * @description  : 선택지역 직접 비교하기
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		: 
			 * @history 	 :
			 */
			areaZoneSelect : function(){
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				
				$("#areaZoneSelect").show();
				$("#areaZoneSelect").attr("display","block");
				
				var html = "";
				
				for(var i = 0; i < dataArray.length; i++){
					html += '<li>';
					html +=	'	<a id="selTextBox_'+i+'" href="javascript:$technicalBizMap.ui.areaAdmClick(\''+dataArray[i].adm_cd+'\',\''+i+'\');" data-id="selText_'+i+'">';
					html +=	'		<span class="t01">'+dataArray[i].sido_nm+'</span>';
					html +=	'		<span class="t02">'+dataArray[i].sgg_nm+'</span>';
					html +=	'	</a>';
					html += '</li>';
				}
				
				$("#areaZoneSelectList").html(html);
				
			},
			
			/**
			 * @name         : areaAdmClick
			 * @description  : 선택지역명 클릭 
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaAdmClick : function(adm_cd,idx){
				var obj = $("#selTextBox_"+idx);
				var selList = $(".selItemListBox > .selList02 li");
				
				var ck = $("#selTextBox_"+idx).hasClass("on");
				var _id = $("#selTextBox_"+idx).attr("data-id");
				var _txt = $("#selTextBox_"+idx).find(".t01").text();
				var _txt2 = $("#selTextBox_"+idx).find(".t02").text();
				if(ck){
					$("#selTextBox_"+idx).removeClass("on");
					$("#"+_id).parent().remove();
				}else{
					if(selList.length < 5){
						$("#selTextBox_"+idx).addClass("on");
						/*var _item = '<div class="bitem" id="'+_id+'" data-subj="'+adm_cd+'" style="text-align:center;">';
						_item += '<span>'+_txt+'</span>';
						_item += '<a href="javascript:void(0)"><i class="fa fa-times" aria-hidden="true">X</i></a>';
						_item += '</div>';
						$(".selItemListBox").append(_item);*/
						var _item = '<li data-subj="'+adm_cd+'">';
							_item +=	'<a id="'+_id+'" data-subj="'+adm_cd+'" onclick="javascript:$technicalBizMap.ui.areaAdmClick(\''+adm_cd+'\',\''+idx+'\');">';
							_item += 		'<span class="t01">'+_txt+'</span>';
							_item += 		'<span class="t02">'+_txt2+'</span>';
							_item +=	'</a>';
							_item += '</li>';
						$(".selItemListBox > .selList02").append(_item);
					}
				} 
				
			},
			
			/**
			 * @name         : selectAreaCompare
			 * @description  : 선택지역 검색 
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			selectAreaCompare : function(){
				/*var list = $(".selItemListBox > div");*/
				var list = $(".selItemListBox > ul > li");
				var admCodeArray = new Array();
				for(var i =0; i < list.length ; i++){
					admCodeArray.push($(list[i]).data("subj"));
				}
				$("#areaDetailInfo").data("region","1");
				var options = {base_region : "1"};
				
				//2018.02.05 [개발팀]
			    var param = $technicalBizDataBoard.ui.searchOption;
			    if (param.techbiz_class_cd != "00") {
			    	options["techCd"] = param.techbiz_class_cd;
			    }else {
					options["techCd"] = "11";
			    }
				
				$technicalBizMap.ui.setSelectAdmCode(admCodeArray,options);
				
			},
			
			
			
			/**
			 * @name         : areaFilterSelect
			 * @description  : 선택지역 직접 비교하기
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		: 
			 * @history 	 :
			 */
			areaFilterSelect : function(){
				$("#areaFilterSelect").show();
				$("#areaFilterSelect").attr("display","block");
				
				sliderRanger("#sliderRange1");
				sliderRanger("#sliderRange2");
				sliderRanger("#sliderRange3");
				sliderRanger("#sliderRange4");
				
				//fromChk01
				//toChk01
				$("#fromChk01").text(5);
				$("#toChk01").text(7);
				$("#fromChk02").text(5);
				$("#toChk02").text(7);
				$("#fromChk03").text(5);
				$("#toChk03").text(7);
				$("#fromChk04").text(5);
				$("#toChk04").text(7);
				
				
				function sliderRanger(id){
					$(id + " .item" ).slider({
				      range: true,
				      min: 0,
				      max: 10,
				      values: [ 5, 7 ],
				      slide: function( event, ui ) {
				    	var _v1 = Number(ui.values[0])*1;
				    	var _v2 = Number(ui.values[1])*1;
				        $(id + " .val01" ).text(_v1.toFixed(1));
				        $(id + " .val02" ).text(_v2.toFixed(1));
				      }
				    });
				}
				
				
			},
			
			/**
			 * @name         : areaFilterSearch
			 * @description  : 지역 필터 검색
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaFilterSearch : function(){
				var dataArray = $technicalBizDataBoard.ui.searchDataArray;
				var param = $technicalBizDataBoard.ui.searchOption;
				var validate = false;
				
				var admCodeArray = new Array();
				/*var admObjList = new Object();*/
				for(var i = 0; i < dataArray.length; i ++){
					admCodeArray.push(dataArray[i].adm_cd);
					
					/*admObjList[dataArray[i].adm_cd] = new Array();
					for(var j = 0 ; j < dataArray[i].techBiz.length; j++){
						admObjList[dataArray[i].adm_cd].push(dataArray[i].techBiz[j]);
					}*/
				}
				
				
				/*console.log(admObjList);*/
				
				//option : 
				//base_region : country, sido
				//
				
				var base_region = "country";
				/*var techCd = JSON.stringify(admObjList);*/
				var techCd = '11';
				
				var ppltn = false; //인구통계
				var areaStat = false; //면적통계
				var areaPrice = false; //면적시세
				var financial = false; //재정자립도
				
				var fromPpltn = 0;
				var toPpltn = 0;
				
				var fromAreaStat = 0;
				var toAreaStat = 0;
				
				var fromAreaPrice = 0;
				var toAreaPrice = 0;
				
				var fromFinancial = 0;
				var toFinancial = 0;
				
				//2018.01.22 [개발팀]
				if (param.techbiz_class_cd != "00") {
					techCd = param.techbiz_class_cd;
				}
				
				if(!$("#selAreaCountry").hasClass("on")){
					base_region = "2"; //2018.01.22 [개발팀]
				}else{
					base_region = "1"; //2018.01.22 [개발팀]
				}
				$("#areaDetailInfo").data("region",base_region);
				
				if($("#chk01").attr("checked")){
					ppltn = true;
					validate = true;
					fromPpltn = $("#fromChk01").text();
					toPpltn = $("#toChk01").text();
				}
				
				if($("#chk02").attr("checked")){
					areaStat = true;
					validate = true;
					fromAreaStat = $("#fromChk02").text();
					toAreaStat = $("#toChk02").text()
				}
				
				if($("#chk03").attr("checked")){
					areaPrice = true;
					validate = true;
					fromAreaPrice = $("#fromChk03").text();
					toAreaPrice = $("#toChk03").text()
				}
				
				if($("#chk04").attr("checked")){
					financial = true;
					validate = true;
					fromFinancial = $("#fromChk04").text();
					toFinancial = $("#toChk04").text()
				}
				
				var option = {
						base_region : base_region,
						ppltn : ppltn,
						areaStat : areaStat,
						areaPrice : areaPrice,
						financial : financial,
						fromPpltn : fromPpltn,
						toPpltn : toPpltn,
						fromAreaStat : fromAreaStat,
						toAreaStat: toAreaStat,
						fromAreaPrice :fromAreaPrice,
						toAreaPrice : toAreaPrice,
						fromFinancial : fromFinancial,
						toFinancial : toFinancial,
						techCd : techCd //2018.01.22 [개발팀]
				};
				
				if(validate == true){
					//2018.01.22 [개발팀]
					$("#compareChart2").hide();
					$("#compareChart1").hide();
					$("#legendPage_count").hide();
					$technicalBizMapApi.request.areaFilterSearch(techCd,admCodeArray,option);
				}else{
					messageAlert.open("알림", "필터 조건을 하나 이상 선택 하셔야 합니다.");
				}
				
			},
			
			/**
			 * @name         : setSelectAdmCode
			 * @description  : 선정된 지역들에 대한 정보 세팅
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			setSelectAdmCode : function(admCodeArray, option){
				$("#areaFilterSelect").hide();
				$("#areaFilterSelect").attr("display","none");
				
				$("#areaDetailInfo").show();
				$("#areaDetailInfo").attr("display","block");
				
				$("#areaDetailInfo").data("admCodes",admCodeArray);
				$("#areaDetailInfo").data("techCd",option.techCd); //2018.01.22 [개발팀]
				$("#areaDetailInfo").data("region",option.base_region);
				
				//2018.01.22 [개발팀] 로직수정
				$("#legendPage").html("");
				$technicalBizMapApi.request.searchAdmNm(admCodeArray,'legendPage', function() { 
					var techCdIdx = {
							"11" : 0, //첨단기술
							"12" : 1, //고기술
							"13" : 2, //중기술
							"14" : 3, //저기술
							"21" : 4, //창의디지털
							"22" : 5, //ICT
							"23" : 6  //전문서비스					
					};
					$("#compositeChart").attr("href", "javascript:$technicalBizMap.ui.areaTotalInfoResult('"+option.techCd+"',"+techCdIdx[option.techCd]+")");
					$("#detailChart").attr("href", "javascript:$technicalBizMap.ui.areaDetailInfoResult('"+option.techCd+"',"+techCdIdx[option.techCd]+", 0, 0)");
					
					$technicalBizMap.ui.areaTotalInfoResult(option.techCd,techCdIdx[option.techCd]); 
				});
				
			},
			
			/**
			 * @name         : areaTechCdChageResult
			 * @description  : 종합통계정보 업종 변경
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaTechCdChageResult : function(techCd,idx){
				//2018.01.22 [개발팀]
				$("#compositeChart").attr("href", "javascript:$technicalBizMap.ui.areaTotalInfoResult('"+techCd+"',"+idx+")");
				$("#detailChart").attr("href", "javascript:$technicalBizMap.ui.areaDetailInfoResult('"+techCd+"',"+idx+", 0, 0)");
				
				if($("#areaInfoSelect > a").eq(0).hasClass("on")){
					this.areaTotalInfoResult(techCd,idx);
				}else{
					this.areaDetailInfoResult(techCd,idx,0,0);
				}
			},
			
			/**
			 * @name         : areaTotalInfoResult
			 * @description  : 선정된 지역들에 대한 데이터 종합통계정보
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaTotalInfoResult : function(techCd,idx){
				var techCdNameList = {
						0 : "첨단기술",
						1 : "고기술",
						2 : "중기술",
						3 : "저기술",
						4 : "창의 디지털",
						5 : "ICT",
						6 : "전문서비스"
				}
				
				var cItemList = $("#compareChart1 > .cItem");
				
				$(cItemList[0]).find("p").text("지역 특성 정보_" + techCdNameList[idx]);
				$(cItemList[1]).find("p").text("입지계수 정보_" + techCdNameList[idx]);
				$(cItemList[2]).find("p").text("증감 추이_" + techCdNameList[idx]);
				
				$("#areaInfoSelect > a").removeClass("on");
				$("#areaInfoSelect > a").eq(0).addClass("on");
				
				$("#searchTechCdList > a").removeClass("on");
				$("#searchTechCdList > a").eq(idx).addClass("on");
				$('#areaDetailInfo').data('techCd',techCd);
				
				//2018.01.22 [개발팀] 성능이슈 - 로직변경
				var admCodeArray = [];
				$("#legendPage_ul li").each(function() {
					if ($(this).find("a").hasClass("on")) {
						admCodeArray.push($(this).find("a").attr("adm_cd"));
					}
				});
				
				var region = $("#areaDetailInfo").data("region");
				//지역 특성 정보 
				$("#compareChart2").hide();
				$("#compareChart1").show();
				$("#legendPage_count").show(); //2018.01.22 [개발팀]
				$technicalBizMapApi.request.searchTechTotalInfo(admCodeArray,techCd,region);
				//입지계수 정보
				
				//증감 추이 
				
			},
			
			/**
			 * @name         : areaDetailInfoResult
			 * @description  : 선정된 지역들에 대한 데이터 종합통계정보
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaDetailInfoResult : function(techCd,idx,option1,option2){
				$("#areaInfoSelect > a").removeClass("on");
				$("#areaInfoSelect > a").eq(1).addClass("on");
				$("#searchOptionTab1 > a").removeClass("on");
				$("#searchOptionTab1 > a").eq(option1).addClass("on");
				$("#searchOptionTab2 > a").removeClass("on");
				$("#searchOptionTab2 > a").eq(option2).addClass("on");
				
				$("#searchTechCdList > a").removeClass("on");
				$("#searchTechCdList > a").eq(idx).addClass("on");
				$('#areaDetailInfo').data('techCd',techCd);
				
				//2018.01.22 [개발팀] 성능이슈 - 로직변경
				var admCodeArray = [];
				$("#legendPage_ul li").each(function() {
					if ($(this).find("a").hasClass("on")) {
						admCodeArray.push($(this).find("a").attr("adm_cd"));
					}
				});
				
				var region = $("#areaDetailInfo").data("region");
				$("#compareChart1").hide();
				$("#compareChart2").show();
				
				$technicalBizMapApi.request.searchTechDetailInfo(admCodeArray,techCd,region,option1,option2);
				//창업지원시설 현황
				//산업단지 현황
				//기술업종 통계 현황 사업체수,종사자수
				//지역통계현황 인구,면적,지가변동률,재정자립도
			},
			
			/**
			 * @name         : areaDetailChangeResult1
			 * @description  : 기술업종 통계현황 현경 차트
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaDetailChangeResult1 : function(option){
				var option2List = $("#searchOptionTab2 > a");
				
				var techCdTabList = $("#searchTechCdList > a");
				var idx = 0;
				for(var i = 0; i < techCdTabList.length; i++){
					if($(techCdTabList[i]).hasClass("on")){
						idx = i;
					}
				}
				
				var optionIdx = 0;
				for(var i = 0; i < option2List.length;i++){
					if($("#searchOptionTab2 > a").eq(i).hasClass("on")){
						optionIdx = i;
					}
				}
				var option1 = option;
				var option2 = optionIdx;
				$technicalBizMap.ui.areaDetailInfoResult($('#areaDetailInfo').data('techCd'),idx,option1,option2);
				
				//2018.01.18 [개발팀]
				switch(option) {
					case 0: //사업체
						$("#chtBar03").next().html("단위:개");
						break;
					case 1: //종사자
						$("#chtBar03").next().html("단위:명");
						break;
				}
			},
			
			/**
			 * @name         : areaDetailChangeResult2
			 * @description  : 기술업종 통계현황 현경 차트
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaDetailChangeResult2 : function(option){
				var option2List = $("#searchOptionTab1 > a");
				
				var techCdTabList = $("#searchTechCdList > a");
				var idx = 0;
				for(var i = 0; i < techCdTabList.length; i++){
					if($(techCdTabList[i]).hasClass("on")){
						idx = i;
					}
				}
				
				var optionIdx = 0;
				for(var i = 0; i < option2List.length;i++){
					if($("#searchOptionTab1 > a").eq(i).hasClass("on")){
						optionIdx = i;
					}
				}
				
				var option1 = optionIdx;
				var option2 = option;
				$technicalBizMap.ui.areaDetailInfoResult($('#areaDetailInfo').data('techCd'),idx,option1,option2);
				
				//2018.01.18 [개발팀]
				switch(option) {
					case 0: //인구
						$("#chtBar04").next().html("단위:명");
						break;
					case 1: //면적
						$("#chtBar04").next().html("단위:㎡");
						break;
					case 2: //지가변동률
						$("#chtBar04").next().html("단위:%");
						break;
					case 3: //재정자립도
						$("#chtBar04").next().html("단위:%");
						break;
				}
			},
			
			/**
			 * @name         : areaDetailChartSetAdmCode
			 * @description  : 기술업종 통계현황 현경 차트 지역 선택
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			//2018.01.18 [개발팀] 함수 재개변 -머지시 그냥 엎어칠것 
			areaDetailChartSetAdmCode : function(id, adm_cd){
				var isVisible = true;
				if($("#"+id).hasClass("on")){
					if (this.compareAreaSelectedList.length <= 1) {
						messageAlert.open("알림", "최소 한개 이상의 후보지역을 선택해야 합니다.");
						return;
					}
					$("#"+id).removeClass("on");
					isVisible = false;
					if (this.compareAreaSelectedList.length > 0) {
						var idx = 0;
						for (var i=0; i<this.compareAreaSelectedList.length; i++) {
							if (this.compareAreaSelectedList[i].adm_cd == adm_cd) { //2018.01.22 [개발팀] 성능이슈 - 로직변경
								idx = i;
								break;
							}
						}
						this.compareAreaSelectedList.splice(i, 1);
					}
					
					//2018.01.22 [개발팀] 성능이슈 - 로직변경
					var color = $("#"+id).css("background-color");
					this.compareAreaSelectedColorList.push(color);
					$("#"+id).css({
						"background-color" : "#ddd", 
						"color" : "#666"
					});
					
					if ($("#compositeChart").hasClass("on")) {
						for (var i=1; i<=3; i++) {
							var charts = $("#chtBox0"+i).highcharts();
							for (var k=0; k<charts.series.length; k++) {
								if (charts.series[k].userOptions.adm_cd == adm_cd) {
									charts.series[k].setVisible(false, true);
									break;
								}
							}
						}
					}else {
						for (var i=1; i<=4; i++) {
							var charts = $("#chtBar0"+i).highcharts();
							var tmpData = [];
							for (var k=0; k<charts.series[0].userOptions.originData.length; k++) {
								for (var v=0; v<this.compareAreaSelectedList.length; v++) {
									if (charts.series[0].userOptions.originData[k].adm_cd == this.compareAreaSelectedList[v].adm_cd) {
										tmpData.push(charts.series[0].userOptions.originData[k]);
										break;
									}
								}
							}	
							charts.series[0].setData(tmpData);
						}
					}
					
				}else{
					if (this.compareAreaSelectedList.length >= this.compareAreaSelectedCnt) {
						messageAlert.open("알림", "후보지역 선택을 최대 "+ this.compareAreaSelectedCnt + "개 까지 할 수 있습니다.");
						return;
					}
					$("#"+id).addClass("on");
					
					//2018.01.22 [개발팀] 성능이슈 - 로직변경
					var color = "#ddd";
					if (this.compareAreaSelectedColorList.length > 0) {
						color = this.compareAreaSelectedColorList[0];
						$("#"+id).css({
							"background-color" : this.compareAreaSelectedColorList[0],
							"color" : "#fff"
						});
						this.compareAreaSelectedColorList.splice(0, 1);
					}
					
					isVisible = true;
					this.compareAreaSelectedList.push({adm_cd :adm_cd, color:color});
					
					//2018.01.22 [개발팀] 성능이슈 - 로직변경
					var techCd = $('#areaDetailInfo').data('techCd');
					var region = $("#areaDetailInfo").data("region");
					
					var tmpAdmList = [];
					for (var i=0; i<this.compareAreaSelectedList.length; i++) {
						tmpAdmList.push(this.compareAreaSelectedList[i].adm_cd);
					}
					
					if ($("#compositeChart").hasClass("on")) {
						$technicalBizMapApi.request.searchTechTotalInfo(tmpAdmList, techCd, region);
					}else {
						$technicalBizMapApi.request.searchTechDetailInfo(tmpAdmList, techCd, region, "0", "0");
					}
				}
				
				
				
			} //2018.01.15 [개발팀] 콤마제거
			
			
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$technicalBizMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				var poiControl = map.mapBtnInfo;
				
				//테마poi조회
				if (poiControl.isOpenPOI && 
					poiControl.themeCd != undefined && 
					poiControl.themeCd.length > 0) {
						if (poiControl.mapBounds == null) {
							map.markers.clearLayers();
							poiControl.reqThemePoiInfo(poiControl.themeCd, "0");
						}else {
							if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
								map.markers.clearLayers();
								poiControl.reqThemePoiInfo(poiControl.themeCd, "0");
							}
						}	
				}
				
				//사업체poi조회
				if (poiControl.isOpenPOI && 
						poiControl.class_cd != undefined && 
						poiControl.class_cd.length > 0) {
							if (poiControl.mapBounds == null) {
								map.markers.clearLayers();
								poiControl.reqCompanyPoiInfo(poiControl.class_cd, "9", "0");
							}else {
								if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
									map.markers.clearLayers();
									poiControl.reqCompanyPoiInfo(poiControl.class_cd, "9", "0");
								}
							}	
					}
				
				//2017.12.12 [개발팀] 접근성
				//공공데이터 조회
				/*var publicDataBoard = $publicDataBoard.ui.mapData[$technicalBizMap.ui.curMapId];
				if(publicDataBoard.type != undefined &&publicDataBoard.type.length > 0 ) {
					if(publicDataBoard.options.mapBounds == null) {
						map.markers.clearLayers();
						$publicDataBoard.ui.reqPoi();
					} else {
						if (!publicDataBoard.options.mapBounds.contains(map.gMap.getCenter())) {
							map.markers.clearLayers();
							$publicDataBoard.ui.reqPoi();
						}
					}	
				}*/
				
				//업종밀집도 변화
				if (!$technicalBizMap.ui.isLocalGov) {
					setTimeout(function() {
						if ($technicalBizDataBoard.ui.mapData[map.id] != null && $technicalBizDataBoard.ui.mapData[map.id].type == "density") {
							var options = $technicalBizDataBoard.ui.mapData[map.id].options;
							if (options.params.adm_cd != null && options.params.adm_cd.length >= 5) {
								if (map.zoom < 10) {
									$technicalBizMap.ui.doConvertHeatMap(map, "heatMap");
								}else {
									$technicalBizMap.ui.doConvertHeatMap(map, "dotMap");
								}
							}
						}
					}, 300);
				}
				
			},
			
			didMapZoomIn : function(map) {
				if ($technicalBizLeftMenu.ui.curSelectedStatsType == "sigungu") {
					map.gMap.zoomIn(1);
				}
			},
			
			didMapZoomOut : function(map) {
				if ($technicalBizLeftMenu.ui.curSelectedStatsType == "sigungu") {
					map.gMap.zoomOut(1);
				}
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				var poiControl = map.mapBtnInfo;
				if (map.zoom < 10 && map.isInnerMapShow) {
					$technicalBizMap.ui.doInnerMap(map.id+1);
				}

				//사업체 POI 없애기
				if (map.zoom < 10 && poiControl.isOpenPOI) {
					messageAlert.open("알림", "해당 레벨에서는 사업체 POI정보를 볼 수 없습니다.");
					poiControl.clearPOI();
				}
				
				//업종별 밀집도 heatMap convert to dotMap
				if ($technicalBizMap.ui.heatMapList[map.id] != null && 
					$technicalBizMap.ui.heatMapList[map.id].data.length > 0) {
					var type = $technicalBizMap.ui.heatMapList[map.id].data_type;
					if (type == "3") {
						if (map.zoom > 9) {
							$technicalBizMap.ui.doConvertHeatMap(map, "dotMap");
						}else {
							$technicalBizMap.ui.doConvertHeatMap(map, "heatMap");
						}
					}
				}
				
				//2017.12.12 [개발팀] 접근성
				//공공데이터 POI  없애기
				/*var publicDataBoard = $publicDataBoard.ui.mapData[map.id];
				if (map.zoom < 10 && publicDataBoard.options.map != null) {
					messageAlert.open("알림", "해당 레벨에서는 공공데이터 정보를 볼 수 없습니다.");
					$publicDataBoard.ui.remove(map.id);
				}*/
				
			},
			
			/**
			 * 
			 * @name         : didMapChangeMode
			 * @description  : 위성지도/일반지도 변환
			 * @date         : 2016. 11. 24. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 위성/일반 타입
			 * @param map    : 맵 정보
			 */
			didMapChangeMode : function(type, map) {
				switch(type) {
					case "settlite":
						break;
					case "normal":
						break;
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
				if (type == "sigungu") {
					for (var i=0; i<data.length; i++) {
						var marker = data[i];
						marker.setStyle({
							fillColor : "#FF9100"
						});
					}
				} else {
					if (type != "polygon" && type != "industry") {
						$technicalBizMap.ui.createInfoTooltip(event, data, type, map);
					} else if (type == "polygon") {
						if($technicalBizLeftMenu.ui.curSelectedStatsType == "density"){
							$technicalBizMap.ui.createInfoTooltip(event, data, "density", map);
							var layer = event.target;
							layer.setStyle({
								fillColor : "#1e90ff",
								fillOpacity : 0.1
							});
						}
					}
				}
			},
			
			/**
			 * 
			 * @name         : didMouseOutPolygon
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
				if (type == "sigungu") {
					for (var i=0; i<data.length; i++) {
						var markers = data[i].markers;
						for (var k=0; k<markers.length; k++) {
							var marker = markers[k];
							marker.setStyle({
								color : marker.options.bFillColor,
								fillColor : "white"
							});
						}
					}
				} else if (type == "polygon") {
					if($technicalBizLeftMenu.ui.curSelectedStatsType == "density"){
						var layer = event.target;
						layer.setStyle({
							fillColor : "#1e90ff",
							fillOpacity : 0
						});
					}
				}
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
					if (data.info) {
						if (data.info.length > 0) {
							var center = [ event.target.getCenter().x, event.target.getCenter().y ];
							//지원시설정보/산업단지정보 보기 지역선택
							if (data.info[0].type != undefined) {
								var layer = event.target;
								switch(data.info[0].type) {
									case "sigungu" :
										//2017.11.17 시군구일때만 실행
										if($technicalBizLeftMenu.ui.curSelectedStatsType == "sigungu"){
											var options = {
													params : {
														adm_cd : layer.feature.properties.adm_cd,
														adm_nm : layer.feature.properties.adm_nm,
														map : map
													},
													dataBoard : {
														jobAreaThemeCd : $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
													}
											}
											//데이터 보드 호출 (options, type)
											$technicalBizDataBoard.ui.updateDataBoard(options, "sigungu");
											$("#view"+id).find(".tb_report").parent().show();
										}
										
										break;
									case "density": //업종밀집도변화(신설법인)
										var options = $technicalBizDataBoard.ui.mapData[map.id].options;
										options.params.adm_cd = layer.feature.properties.adm_cd;
										options.params.adm_nm = layer.feature.properties.adm_nm;
										$technicalBizDataBoard.ui.updateDataBoard(options, "density");
										break;
									//2017.10.17 개발팀 추가	
									case "lq" :										
										var options = {
												params : {
													adm_cd : layer.feature.properties.adm_cd,
													adm_nm : layer.feature.properties.adm_nm,
													themeCd : data.info[0].techbiz_m_class_cd,
													themeNm : data.info[0].techbiz_m_class_nm,
													year :	companyDataYear,
													map : map
												},
												
										}
										$technicalBizMap.ui.lqInfoTooltip(event,data,map);
										break;
										//2017.10.17 개발팀 추가	종료
									case "supply":	//지원시설
										//2017.05.02 지원시설 읍면동레벨에서 지역선택 시, 마커삭제되는 문제
										if (layer.feature.properties.adm_cd.length >= 7) {
											return;
										}
										$technicalBizMap.ui.doSupplyMarkerClear();
										$technicalBizMap.ui.doIndustryMarkerClear();
										$technicalBizMap.ui.doSupplyDetailRegionInfo(event.target, map);
										break;
									case "industry": //산업단지
										//2017.05.02 산업단지 읍면동레벨에서 지역선택 시, 마커삭제되는 문제
										if (layer.feature.properties.adm_cd.length >= 7) {
											return;
										}
										$technicalBizMap.ui.doSupplyMarkerClear();
										$technicalBizMap.ui.doIndustryMarkerClear();
										$technicalBizMap.ui.doIndustryDetailRegionInfo(event.target, map);
										break;
								}
							}
						}
					}
				}
				
				//미니맵 선택 (지역종합정보)
				else if(type == "mini") {
					if (data.info) {
						if (data.info.length > 0) {
							var property = data.properties;
							//데이터보드 지역상세정보 보기 호출
							$technicalBizDataBoard.ui.areaSearchDetailInfo("none", property.adm_cd, property.adm_nm, property.x, property.y);
						}
					}
				}
				
				//사업체전개도
				else if (type == "build") {
					if ($technicalBizMap.ui.buildPopup != null) {
						$technicalBizMap.ui.buildPopup.close();
					}
					
					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
							   $("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$technicalBizMap.ui.buildPopup = 
						window.open(
							"/view/indoor/indoorMap?sufid=" + data.properties.sufid, 
							"건물상세정보",
							"top="+top+", left="+left+", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);
				}
				
				else if (type == "trade") {	//생활업종지도 상권정보 업데이트
					//데이터보드 상권정보
					var options = {
							params : {
								map : map,
								data : data
							}
					}
					$technicalBizDataBoard.ui.updateDataBoard(options, "trade");
				}
				
				else if (type == 'polygon'){
					var id = map.id+1;
					var layer = event.target;
					$technicalBizMap.ui.setTitle($technicalBizLeftMenu.ui.curSelectedStatsNm + " > " + data.properties.adm_nm, id);
					$("#view"+id).find(".tb_report").parent().show();
					
					switch($technicalBizLeftMenu.ui.curSelectedStatsType){
						case 'characteristic' : 
							if(data.properties.adm_cd.length == 2){
								var sidoList = new Array();
								var object = new Object();
								object.sido_cd = data.properties.adm_cd;
								
								sidoList.push(object);
								map.geojson.remove();
								map.geojson = null;
								$technicalBizMap.ui.doGetSggBoundary(sidoList, 0, map, function() {
									$technicalBizMap.Popup.close();
									
								});
							}
							break;
						// 시도별 기술업종 현황
						case 'sido':
							layer.setStyle({
								color : "#ebb410",
								fillColor: "#fcbe47",
								fillOpacity : 1,
								opacity : layer.options.opacity,
								weight: 2.5,
								dashArray : ""
							});
							
							if (map.curSelectedLayer) {
								if (layer != map.curSelectedLayer) {
									map.curSelectedLayer.setStyle({
										color : "#cccccc",
										fillColor: "#F1F1F1",
										fillOpacity : 1,
										opacity : layer.options.opacity,
										weight: 1.5,
										dashArray : ""
									});
								}
							}
							
							$technicalBizMap.ui.deSelectedIntroMarker(layer, map);
							$technicalBizMap.ui.selectedIntroMarker(layer, map);
									
							var options = {
									params : {
										adm_cd : layer.feature.properties.adm_cd,
										adm_nm : layer.feature.properties.adm_nm,
										map : map
									}
							}
									
							//데이터보드 호출 (options, type)
							$technicalBizDataBoard.ui.updateDataBoard(options, "sido");
							break;
							
						case "density":
							var options = $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options;
							if ($technicalBizDataBoard.ui.mapData[map.id].type.length == 0) {
								return;
							}
							
							var adm_cd = data.properties.adm_cd;
							var adm_nm = data.properties.adm_nm;
							var type = "1";
														
							switch (adm_cd.length) {
								case 2:
									map.clearDataOverlay();
									setTimeout(function() {
										map.mapMove([data.properties.x, data.properties.y], 5, true);
									},1000);
									break;
								case 5:
									map.clearDataOverlay();
									setTimeout(function() {
										map.mapMove([data.properties.x, data.properties.y], 7, true);
									},1000);
									break;
								case 7:
									//2017.03.23 읍면동 레벨에서 데이터보드의 테마를 선택했을 시, 열지도가 변하지 않는 현상 수정
									$technicalBizDataBoard.ui.mapData[map.id].options["preLayer"].theme_cd = $technicalBizDataBoard.ui.mapData[map.id].options.dataBoard.themeCd;
									$technicalBizDataBoard.ui.mapData[map.id].options["preLayer"].year = $technicalBizDataBoard.ui.mapData[map.id].options.params.year;
									map.mapMove([data.properties.x, data.properties.y], map.zoom);
									options.params.adm_cd = adm_cd;
									options.params.adm_nm = adm_nm;
									$technicalBizDataBoard.ui.updateDataBoard(options, "density");
									return;
									break;
							}
							
							setTimeout(function() {
								$("#densityDiv > .MapBefore").show();
								map.openApiBoundaryHadmarea(adm_cd, map.bnd_year, "1", null, function(map, res) {
									if (map.geojson) {
										map.geojson.remove();
										map.geojson = null;
									}
									map.addPolygonGeoJson(res, "polygon");
								});
								options["preLayer"] = {
										adm_cd : options.params.adm_cd,
										adm_nm : options.params.adm_nm,
										x : data.properties.x,
										y : data.properties.y
								};
								options.params.adm_cd = adm_cd;
								options.params.adm_nm = adm_nm;
								$technicalBizDataBoard.ui.updateDataBoard(options, "density");
							}, 300);
							break;
					}
				}
				
				// 시군구 기술업종 현황
				else if (type == "sigungu") {		
					var id = map.id + 1;
					var layer = event.target;
					var options = {
							params : {
								adm_cd : layer.options.adm_cd,
								adm_nm : layer.options.adm_nm,
								map : map
							},
							dataBoard : {
								jobAreaThemeCd : $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
							}
					}
					//데이터 보드 호출 (options, type)
					$technicalBizDataBoard.ui.updateDataBoard(options, "sigungu");
					$("#view"+id).find(".tb_report").parent().show();
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
			},
			

			/**
			 * @name         : sigunguTooltipFunc
			 * @description  : 시군구 툴팁 창 클릭이벤트 콜백함수
			 * @date         : 2016. 10. 12. 
			 * @author	     : 김재상
			 */
			sigunguTooltipFunc : function(sido_cd, adm_cd) {
				$("#sigunguTooltipTable td").removeClass("on");
				$("#sigunguTooltipTable #"+adm_cd).addClass("on");
				var markers = null;
    			for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
    				if ($technicalBizMap.ui.sigunguMarkers[i].sido_cd == sido_cd) {
    					markers = $technicalBizMap.ui.sigunguMarkers[i].markers;
    					for(var j = 0; j < markers.length; j++) {
    						if(markers[j].options.adm_cd == adm_cd) {
    							var temp = $(markers[j]);
    							temp.on("click", function(e) {
    								$technicalBizMap.callbackFunc.didSelectedPolygon(e, $technicalBizMap.ui.sigunguMarkers, "sigungu", $technicalBizMap.callbackFunc.sigunguTooltipOptions.map);
					    		});
    							temp.trigger("click");
    							break;
    						}
    					}
    				}
    			}
			},
			
			sigunguTooltipOption : null,
			
			/**
			 * 
			 * @name         : introTooltipFunc
			 * @description  : introTooltip 화면 시군구 리스트 클릭 기능
			 * @date         : 2016. 10. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param  sido_cd 시도코드 
			 * @param  adm_cd  주소값
			 */
			introTooltipFunc : function(sido_cd, adm_cd, theme_cd, theme_nm, adm_nm, x_coord, y_coord, type) {
				$("#introTooltipTable td").removeClass("on");
				$("#introTooltipTable #"+adm_cd).addClass("on");
				var markers = null;
    			for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
    				if ($technicalBizMap.ui.sigunguMarkers[i].sido_cd == sido_cd) {
    					markers = $technicalBizMap.ui.sigunguMarkers[i].markers;
    					for(var j = 0; j < markers.length; j++) {
    						if(markers[j].options.adm_cd == adm_cd) {
    							/*var temp = $(markers[j]);
    							temp.off().on("click", function(e) {
    							$technicalBizMap.callbackFunc.didSelectedPolygon(e, $technicalBizMap.ui.sigunguMarkers, "sigungu", $technicalBizMap.callbackFunc.introTooltipOptions.map);
					    		});
    							temp.trigger("click");*/
    							markers[j].fire("click");
    							break;
    						}
    					}
    				}
    			}
    			
    			//업종밀집도변화 버튼 재설정
    			$("#density").empty();
    			$("#density").html("<a onclick='javascript:$bizStatsMap.ui.companyDensityClick(\""+theme_cd+"\", \""+theme_nm+"\", \""+adm_cd+"\", \""+adm_nm+"\", \""+x_coord+"\", \""+y_coord+"\", \""+type+"\");'>업종 밀집도 변화</a>");
    			
			}
			
	};
	
	$technicalBizMap.event = {
			
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
				Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
				var isClose = false;
				
				$(".selListArea").mCustomScrollbar({axis:"y"}); 
				
				$(".tb_close").click(function(){ 
					isClose = true;
					$(this).hide(); 
					$(".resizeIcon").hide();
					$(".interactiveView").each(function(i){
						$(this).text("VIEW"+parseInt(i+1));
					});
					
					var sceneInx = $(".sceneBox.on").length;
					if (sceneInx == 1) {
						$(".viewTitle > span").hide();
					}else if (sceneInx == 2) {
						var tmpView = [];
						var isSameView = false;
						$(".sceneBox.on").each(function() {
							var id = parseInt($(this).attr("id").split("view")[1])-1;
							tmpView.push(id);
							if (id == $technicalBizMap.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$technicalBizMap.ui.curMapId = tmpView[0];
							}else {
								$technicalBizMap.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($technicalBizMap.ui.curMapId + 1);
							switch($technicalBizMap.ui.curMapId) {
								case 0:
									$("#"+id).find(".toolBar").css("background", "#0070c0");
									break;
								case 1:
									$("#"+id).find(".toolBar").css("background", "#9ed563");
									break;
								case 2:
									$("#"+id).find(".toolBar").css("background", "#ff0066");
									break;
							}
						}	
					}
			    }); 
				
				$(".sceneBox").click(function(){
					var sceneInx = $(".sceneBox.on").length; 
					var id = $(this).attr("id");
					if (sceneInx > 1) {
						if (!isClose) {
							$(".sceneBox").find(".toolBar").css("background", "#ffffff");
						}
						if (id == "view1") {
							$technicalBizMap.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$technicalBizMap.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$technicalBizMap.ui.curMapId = 2;
							$(this).find(".toolBar").css("background", "#ff0066");
						}
						$(".sceneBox").find(".tb_mapAdd").parent().show();
						
						if (sceneInx == 3) {
							$(".sceneBox").find(".tb_mapAdd").parent().hide();
							$(".sceneBox").css({"z-index":"8", "border":"2px solid #333"});
							$(this).css({"z-index":"10"});
							
						}
					}else {
						$(".sceneBox").find(".toolBar").css("background", "#ffffff");
					}
					isClose = false;
					
					//현재 선택된 맵으로 데이터보드 다시 그리기
					$technicalBizDataBoard.ui.reDraw($technicalBizMap.ui.curMapId);
					
					//Left Menu 통계표출 연동
					$technicalBizLeftMenu.ui.showNumberSetting();
			    });
				
				$(".tb_inner .fl").click(function(){ 
					$(".tb_inner").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_inner .fr").click(function(){ 
					$(".tb_inner").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });
				
				$(".tb_trade .fl").click(function(){ 
					$(".tb_trade").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_trade .fr").click(function(){ 
					$(".tb_trade").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });
				
				$(".fbSelArea a").click(function(){
					$(".fbSelArea a").removeClass("on");
					$(this).addClass("on");
				});
				
				$(".filterList01 input").click(function(){	
					var ck = $(this).prop("checked");
					if(ck){
						$(this).parents(".chkbox").eq(0).addClass("on");
						//2017.11.09 개발팀 수정
						$(this).attr("checked",true);
					}else{
						$(this).parents(".chkbox").eq(0).removeClass("on");
						//2017.11.09 개발팀 수정
						$(this).attr("checked",false);
					}
				});
				
				//======= 2017.12.21 [개발팀] 접근성 시정조치 START =====//
				$(".toolBar .tb_right ul li a").keydown(function(e) {
					if (e.keyCode == 13) {
						$(this).trigger("click");
					}
				});
				
				$(".skipNav").keydown(function(e) {
					if (e.keyCode == 13) {
						$("#tuto_start_btn").focus();
					}
				});
				//======= 2017.12.21 [개발팀] 접근성 시정조치 END =====//
			},
	};
	
}(window, document));