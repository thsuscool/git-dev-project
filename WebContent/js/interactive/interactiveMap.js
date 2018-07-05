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
	W.$interactiveMap = W.$interactiveMap || {};

	$(document).ready(
		function() {
			
			//mng_s 주용민
			$("#interactive_magni").click(function(){
				if(!$("#interactive_magni").hasClass("on")){
					$("#content_mapNavi_1").css("display","block");
					$("#interactive_magni").attr("src","/img/popup/magni_minus.png");
					$("#interactive_magni").addClass("on");
					$("#addr_magni").attr("src","/img/popup/magni_minus.png");
					$("#addr_magni").addClass("on");
					$(".navi-content").css({"width":"580px","height":"441px"});
					$(".scrl-first").css({"width":"206px","height":"394px"});
					$(".scrl-second").css({"width":"186px","height":"394px"});
					$(".scrl-third").css({"width":"186px","height":"394px"});
					$(".li-alink").css("height","25px");
					$(".li-strong").css({"font-size":"23px","overflow":"visible","width":"-1px"});
				}else{
					$("#content_mapNavi_1").css("display","block");
					$("#interactive_magni").attr("src","/img/popup/magni_plus.png");
					$("#interactive_magni").removeClass("on");
					$("#addr_magni").attr("src","/img/popup/magni_plus.png");
					$("#addr_magni").removeClass("on");
					$(".navi-content").css({"width":"380px","height":"241px"});
					$(".scrl-first").css({"width":"126px","height":"194px"});
					$(".scrl-second").css({"width":"126px","height":"194px"});
					$(".scrl-third").css({"width":"126px","height":"194px"});
					$(".li-alink").css("height","20px");
					$(".li-strong").css({"font-size":"15px","overflow":"hidden","width":"100px"});
				}
			});
			//mng_e 주용민
			
			$interactiveMap.ui.createMap("mapRgn_1", 0);
			$interactiveMap.event.setUIEvent();
		//	commonPopupObj.openWin("interactive_laypopup");
			$("#interactive_laypopup").show();
	});
	
	$interactiveMap = {
			noReverseGeoCode : false
	};
	
	$interactiveMap.ui = {
			namespace : "interactiveMap",
			searchBtnType : "normal",
			mapList : [],
			curMapId : 0,
			isInnerMapShow : false,
			curDropParams : [],
			combinePopup : null,
			buildPopup : null,
			reportPopup : null,
			dropBtnInfo : [],
			dataTypeList : [],
			tutoIndex : 0,
			toolTipTitle : "",		// 툴팁 N/A 처리용
			toolTipUnit : "",		// 툴팁 N/A 처리용
			
			/**
			 * 
			 * @name         : setDataType
			 * @description  : 현재 조회한 데이터타입을 설정한다.
			 * @date         : 2016. 01. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setDataType : function(mapId, type) {
				
				console.log("[interactiveMap.js] setDataType() 호출");
				console.log("[interactiveMap.js] setDataType() type [" + type);
				
				if (this.dataTypeList != null && 
					Object.prototype.toString.call(this.dataTypeList) === "[object Array]") {
					if (type == "poi") {
						if (this.dataTypeList[mapId] != "" && this.dataTypeList[mapId] != null) {
							return;
						}
					}
					this.dataTypeList[mapId] = type;
					if (type == "userData") {
						$interactiveLeftMenu.ui.curSelectedStatsType = "userData";
					}
					
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
				map.createMap($interactiveMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8, //9->8
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("drop", {accept : ".dragItem"});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");
								
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($interactiveMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "equal";
				//작업부분 끝
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map, $interactiveMap.ui);
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					intrPoiControl : true,
					intrSettingControl : true,
					mapTypeControl : true,
					intrZoomControl : true
				});	
				
				//공유
				var shareInfo = new share.shareInfo(map, $interactiveMap.ui);
				map.shareInfo = shareInfo;
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				//갤러리 등록
				$galleryAdd.delegate = this;

				map.gMap.whenReady(function() {
					map.createHeatMap();
				});

				return map; //9월 서비스
			},
			
			
			/**
			 * 
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
			doClearMap : function(type, isStatsInfoClear) {
				$interactiveMap.noReverseGeoCode = false;
				this.curMapId = parseInt(type)-1;
				if (this.mapList.length > 0) {
					var map = this.mapList[this.curMapId];
					if (isStatsInfoClear == undefined || isStatsInfoClear) {
						map.clearDataOverlay();
					}
					map.drawControl.removeOverlay();
					if(map.shareInfo != null) {
						map.shareInfo.clearShareData();
					}
					map.legend.legendInit();
					map.mapBtnInfo.doClearSelectedBound();
					map.mapBtnInfo.setFixedBoundBtn(false);
					map.mapBtnInfo.isOpenPOI = false; //2016.10.04 추가
					if($interactiveLeftMenu.event.marker != null){
						$interactiveLeftMenu.event.marker.remove();
					}
					this.dataTypeList[this.curMapId] = null;
				}
				this.dropBtnInfo[this.curMapId] = [];
				var viewId = this.curMapId+1;
				$("#title_"+viewId).empty();
				$("#title_"+viewId).hide();
				$("#helper_"+viewId).show();
				
				$mydataDataBoard.ui.delegateSetting($interactiveMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($interactiveMap.ui);			//공공데이터 세팅
				
				//데이터보드 초기화
				$interactiveDataBoard.ui.reset(this.curMapId);
				$publicDataBoard.ui.remove(this.curMapId);
				$mydataDataBoard.ui.remove(this.curMapId);
				
				//초기화한 지도정보와 매핑되는 버튼 Effect 수정
				$interactiveLeftMenu.ui.updateSearchBtnEffect("", this.curMapId);
			},
			
			
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 10. 01. 
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
						var shareData = shareInfo.shareUrlInfo;
						var title = "";
						for (var i=0; i<shareData.length; i++) {
							title += $.trim(shareData[i].params.title);
							if (shareData.length > 1 && i==0) {
								title += " | ";
							}
							
							//2016.10.25 lbdms 캡쳐를 위한 정보 수정
							if (shareData[i].params != undefined) {
								if (shareData[i].params.mapInfo != undefined) {
									shareData[i].params.mapInfo.center = map.center;
									shareData[i].params.mapInfo.zoomlevel = map.zoom;
								}
							}
						}	
						shareInfo.doShare(title);
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
				
				console.log("[interactiveMap.js] doBookMark() 호출");
				
				this.curMapId = parseInt(type)-1;
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var map = this.mapList[this.curMapId];
				
				console.log("[interactiveMap.js] doBookMark() srvType [" + srvType);
				
				
				if(shareInfo == null) {
					messageAlert.open("알림", "저장할 수 없는 데이터입니다.");
				} else {
					if (shareInfo.checkShare("BMARK", srvType)) {
						var shareData = shareInfo.shareUrlInfo;
						var title = "";
						for (var i=0; i<shareData.length; i++) {
							title += $.trim(shareData[i].title);
							if (shareData.length > 1 && i==0) {
								title += " | ";
							}
							
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
							
							//나의 데이터인 경우
							if (shareData[i].params.type == "userData") {
								var value = "";
								for (var k=1; k<=4; k++) {
									$("#dbTypeCk0"+k).each(function() {
										if ($(this).is(":checked")) {
											value = $(this).val();
										}
									});
								}
								shareData[i].params.paramInfo["type"] = value;
							}
								
							
						}
						
						//갤러리 등록일 경우
						if (srvType != undefined && srvType != "IMAP") {
							switch (srvType) {
								case "gallary":
									var captureTargetId = "#mapRgn_"+type;
									$galleryAdd.map = map;
									$galleryAdd.makeImageURL("IMAP", captureTargetId);
									break;
								case "report":
									this.reportPopup.$reportFormEvent.UI.makeImageURL("IMAP");
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
			 * @name         : doInnerMap
			 * @description  : 
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param type
			 */
			doInnerMap : function(type, isShow) {
				
				console.log("[interactiveMap.js] doInnerMap 호출 type [" + type + "] isShow [" + isShow +"]");
				
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				map.setInnerMap(isShow);
				
				if (isShow) {
					$(".grid_radio").hide();//mng_s 김준하
					$("#btnList_"+type).find("ul").hide();
					$("#btnList_"+type).css("margin-right", "5px");
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
				}else {
					$(".grid_radio").show();//mng_s 김준하
					$("#btnList_"+type).find("ul").show();
					$("#btnList_"+type).css("margin-right", "0px");
					map.mapBtnInfo.controlShow("poi");
					map.mapBtnInfo.controlShow("setting");
				}	
				
			},
			
			/**
			 * 
			 * @name         : doInnerMap2
			 * @description  : 그리드 보기 버튼 클릭시 지도 세팅
			 * @date         : 2017. 07. 10. 
			 * @author	     : 김준하
			 * @history 	 :
			 * @param @param type
			 */
			doInnerMap2 : function(type, isShow) {
				
				console.log("[interactiveMap.js] doInnerMap2 호출 type [" + type + "] isShow [" + isShow +"]");
				
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				map.setInnerMap2(isShow);
				
				if (isShow) {
					commonPopupObj.openWin("grid_laypopup");
					/*
					$("#btnList_"+type).find("ul").hide();
					$("#btnList_"+type).css("margin-right", "5px");
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
					*/
					$("#btnList_"+type).find(".tb_mapAdd").hide();
					$("#btnList_"+type).find(".bnd_grid_radio").hide(); //행정구역 그리드 하이드
					$("#btnList_"+type).find(".tb_radio").hide(); //사업체 전개도 하이드
					$("#btnList_"+type).find(".tb_share").hide(); //공유버튼 하이드
					$("#btnList_"+type).find(".tb_bookmark").hide(); //북마크 하이드
					$("#btnList_"+type).find(".tb_report").hide(); //리포트 하이드
					//mng_s 범례 설정버튼 show/hide
					$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
					//mng_e 범례 설정버튼 show/hide
					$("#btnList_"+type).css("margin-right", "-150px");
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
					//그리드 경계를 불러오는 로직을 넣으면 된다.
					//here grid bnd()
				}else {
					//$("#btnList_"+type).find("ul").show();
					/*
					$("#btnList_"+type).find(".tb_mapAdd").show();
					$("#btnList_"+type).find(".tb_radio").show(); //사업체 전개도 하이드
					$("#btnList_"+type).find(".tb_share").show(); //공유버튼 하이드
					$("#btnList_"+type).find(".tb_bookmark").show(); //북마크 하이드
					$("#btnList_"+type).find(".tb_report").show(); //리포트 하이드
					$("#btnList_"+type).css("margin-right", "0px");
					map.mapBtnInfo.controlShow("poi");
					map.mapBtnInfo.controlShow("setting");
					*/
					
					//초기화가 완벽하게 않되므로 최초페이지를 그냥 호출한다. 이렇게 않하려면 위쪽 소스를 주석해제 한다. 하지만 초기화가 제대로 되진 않는다.
					location.href = "/view/map/interactiveMap/mainIndexView";
					
				}	
				
			},
			
			/**
			 * 
			 * @name         : doInnerMap3
			 * @description  : 행정구역 그리드 보기 버튼 클릭시 지도 세팅
			 * @date         : 2018. 02. 06. 
			 * @author	     : 김준하
			 * @history 	 :
			 * @param @param type
			 */
			doInnerMap3 : function(type, isShow) {
				
				console.log("[interactiveMap.js] doInnerMap3 호출 type [" + type + "] isShow [" + isShow +"]");
				
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				map.setInnerMap3(isShow);
				
				if (isShow) {
					//commonPopupObj.openWin("bnd_grid_laypopup");
					/*
					$("#btnList_"+type).find("ul").hide();
					$("#btnList_"+type).css("margin-right", "5px");
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
					*/
					$("#btnList_"+type).find(".tb_mapAdd").hide();
					$("#btnList_"+type).find(".grid_radio").hide(); //그리드 하이드
					$("#btnList_"+type).find(".tb_radio").hide(); //사업체 전개도 하이드
					$("#btnList_"+type).find(".tb_share").hide(); //공유버튼 하이드
					$("#btnList_"+type).find(".tb_bookmark").hide(); //북마크 하이드
					$("#btnList_"+type).find(".tb_report").hide(); //리포트 하이드
					//mng_s 범례 설정버튼 show/hide
					$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
					//mng_e 범례 설정버튼 show/hide
					$("#btnList_"+type).css("margin-right", "-150px");
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
					//그리드 경계를 불러오는 로직을 넣으면 된다.
					//here grid bnd()
				}else {
					//$("#btnList_"+type).find("ul").show();
					/*
					$("#btnList_"+type).find(".tb_mapAdd").show();
					$("#btnList_"+type).find(".tb_radio").show(); //사업체 전개도 하이드
					$("#btnList_"+type).find(".tb_share").show(); //공유버튼 하이드
					$("#btnList_"+type).find(".tb_bookmark").show(); //북마크 하이드
					$("#btnList_"+type).find(".tb_report").show(); //리포트 하이드
					$("#btnList_"+type).css("margin-right", "0px");
					map.mapBtnInfo.controlShow("poi");
					map.mapBtnInfo.controlShow("setting");
					*/
					
					//초기화가 완벽하게 않되므로 최초페이지를 그냥 호출한다. 이렇게 않하려면 위쪽 소스를 주석해제 한다. 하지만 초기화가 제대로 되진 않는다.
					location.href = "/view/map/interactiveMap/mainIndexView";
					
				}	
				
			},
			
			
			/**
			 * @name         : doCombineMap
			 * @description  : 범례결합창을 표출한다.
			 * @date         : 2015. 10. 20. 
			 * @author	     : 김성현
			 * @param  type	 : 맵타입
			 */
			doCombineMap : function(type) {
				var isCombine = true;
				var cnt = 0;
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						var map = this.mapList[i];
						var markerCnt = 0;
						map.markers.eachLayer(function(layer) {
							markerCnt++;
						});
						if (map.dataGeojson != null || 
							map.multiLayerControl.dataGeojson != null ||
							$mydataDataBoard.ui.mapData[map.id].options.rowDataArray.length != 0 || markerCnt > 0) {
							cnt++;
						}
					}
				}
				
				if (cnt < 2) {
					isCombine = false;
				}
				
				if (isCombine) {
					$interactiveMap.ui.combinePopup = 
						window.open(
							"/view/map/interactiveCombineMap", 
							"combinePopup",
							"top=50, left=100, width=1200, height=800, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);	
				}else {
					messageAlert.open("알림", "2개 이상의 조회된 통계정보가 있을때만<br/>지도 겹쳐보기 기능을 사용할 수 있습니다.");
				}
			},
			
			
			/**
			 * @name         : mapLoad
			 * @description  : 범례결합창의 데이터를 설정한다.
			 * @date         : 2015. 10. 20. 
			 * @author	     : 김성현
			 * @param  type	 : 맵타입
			 */
			mapLoad : function() {
				var data = [];
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i]) {
						var map = this.mapList[i];
						var markerCnt = 0;
						
						map.markers.eachLayer(function() {
							markerCnt++;
						});
						if (map.dataGeojsonLayer == null && 
							$mydataDataBoard.ui.mapData[map.id].options.rowDataArray.length == 0 && markerCnt == 0) {
							continue;
						}
						if ($mydataDataBoard.ui.mapData[map.id].options.rowDataArray.length > 0) {
							data.push({
								id : map.id, 
								geojson : null, 
								data : $mydataDataBoard.ui.mapData[map.id].options,
								legend : {
									valPerSlice : map.legend.valPerSlice,
									legendColor : map.legend.legendColor,
									type : map.legend.selectType
								},
								param:{
									title : $mydataDataBoard.ui.mapData[map.id].options.title
								},
								zoom:map.zoom,
								center:map.center,
								adm_cd : map.curDropCd,
								type : "MY"
							});
						}else if (markerCnt > 0) {
							data.push({
								id : map.id, 
								geojson : null, 
								data : map.mapBtnInfo.markerGroup,
								legend : {
									valPerSlice : map.legend.valPerSlice,
									legendColor : map.legend.legendColor,
									type : map.legend.selectType
								},
								param:{
									title : map.mapBtnInfo.selectedPoiTitle
								},
								zoom:map.zoom,
								center:map.center,
								adm_cd : map.curDropCd,
								type : "POI"
							});
						}else {
							data.push({
								id : map.id, 
								geojson : map.dataGeojsonLayer, 
								data : map.dataForCombine,
								legend : {
									valPerSlice : map.legend.valPerSlice,
									legendColor : map.legend.legendColor,
									type : map.legend.selectType
								},
								param:this.dropBtnInfo[map.id],
								zoom:map.zoom,
								center:map.center,
								adm_cd : map.curDropCd,
								type : this.dataTypeList[map.id]
							});
						}
						
					}
					
				}
				var popup = $interactiveMap.ui.combinePopup.$combineMap.ui;
				popup.setData(data);
			},
			
			//============ 2017.06.26 [개발팀] kcu 공공데이터 추가 START ============//
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				var map = this.mapList[this.curMapId];
				var mapType = "interactiveMap";
				var divId = "#mapRgn_" + (map.id + 1);
				
				var title, adm_nm, origin, companyObj, subTitle, dataType, mapData, param, options, poiData, chartId;
				var chart = [];
				var legend = null;
				var param = {};
				var menuType = {
						"publicData" : 0,	//공공데이터
						"kosis"      : 1,	//kosis
						"userData"	 : 2,	//나의데이터
						"poi"		 : 3,   //사업체/테마
				};
				
				//데이터타입이 없을 경우 (북마크나 공유로 넘어왔을 경우)
				if (this.dataTypeList[map.id] == undefined || this.dataTypeList[map.id] == null) {
					// 2016. 03. 23 j.h.Seok 수정
					if(this.dropBtnInfo[0] == undefined || this.dropBtnInfo[0].filterParam == null) {
						this.dataTypeList[map.id] = "kosis";
					} else {
						this.dataTypeList[map.id] = "census";
					}
				}
				
				if (this.dataTypeList[map.id] != undefined && this.dataTypeList[map.id] != null) {
					switch (menuType[this.dataTypeList[map.id]]) {
						case 0:
							mapType = "publicData";
							var subMenu = {
								"population" : 0,	//유동인구
								"school"	 : 1,	//학교인구
								"metro"		 : 2,	//지하철승하차
								"busStop"	 : 3,	//버스정류장
								"cctv"		 : 4	//cctv 2017.06.26 [개발팀] kcu 공공데이터 추가
							};
							
							options = $publicDataBoard.ui.mapData[map.id].options;
							dataType = $publicDataBoard.ui.mapData[map.id].type;
							switch (subMenu[$publicDataBoard.ui.mapData[map.id].type]) {
								case 0:
									var idx = options.viewIndex;
									chartId = "publicPopulationChart";
									poiData = options.result.target.info.resultList[idx];
									adm_nm = options.result.target.info.resultList[0].adm_nm;
									$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info.resultList[idx]};
									mapData = $publicDataBoard.ui.chartDataList[map.id];
									title = "유동인구 정보" + "  ("+adm_nm+")"; 
									subTitle = poiData.surv_region+ " 유동인구 ("+makeYYYYMMDDString(poiData.surv_dt)+ " "+poiData.surv_time+")";
									origin = "중소기업청, 전국 주요상권 유동인구 DB(2010)";
									break;
								case 1:
									adm_nm = "";
									chartId = "publicSchoolChart";
									poiData = options.result.target.info.resultList;
									$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info.resultList};
									mapData = $publicDataBoard.ui.chartDataList[map.id];
									title = "학교인구 정보" + "  ("+poiData.school_nm+")"; 
									subTitle = poiData.school_nm;
									origin = "한국교육개발원, 교육기본통계(유초중등통계,고등통계)(2013)";
									break;
								case 2:
									adm_nm = "";
									chartId = $(".metroChartDiv:visible").attr("id");
									poiData = options.result.target.info;
									$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info};
									var tmpChartData = [];
									if (chartId == "publicMetroChart01") {
										for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
											if ($publicDataBoard.ui.chartDataList[map.id][i].type == "poiInfo" || 
												$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
												tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
											}
										}
									}else if (chartId == "publicMetroChart02") {
										for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
											if ($publicDataBoard.ui.chartDataList[map.id][i].type == "metro_month" || 
												$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
												tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
											}
										}
									}else {
										for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
											if ($publicDataBoard.ui.chartDataList[map.id][i].type == "metro_dayofweek" || 
												$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
												tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
											}
										}
									}
									
									mapData = tmpChartData;
									title = "지하철 승하차인구 정보" + "  ("+poiData.sido_nm+" "+poiData.station_nm+")"; 
									subTitle = poiData.sido_nm+" "+poiData.station_nm;
									origin = "철도 노선별 관리기관, 지하철 이용현황(2015,2016)";
									break;
								case 3:
									adm_nm = "";
									poiData = options.result.target.info;
									mapData = $publicDataBoard.ui.chartDataList[map.id];
									title = "버스정류장 정보" + "  ("+poiData.busstop_nm+")"; 
									subTitle = poiData.busstop_nm;
									origin = "교통안전공단,버스정류장 위치정보(2016)";
									break;
								//2017.06.26 [개발팀] kcu 공공데이터 추가 
								case 4:
									var tmpChart = null;
									var isCCTV = true;
									var curMarker = null;
									var name = "";
									adm_nm = "";
									poiData = options.result;
									mapData = $publicDataBoard.ui.chartDataList[map.id];
									curMarker = $publicDataBoard.ui.selectedCctvObj;
									title = "세종권역 통행흐름정보";
									if (curMarker.cctv_lc_id != undefined) {
										subTitle = curMarker.lc_nm;
										isCCTV = true;
									}else {
										subTitle = curMarker.busstop_nm;
										isCCTV = false;
									}
									origin = "충청청,세종권역정보(2017)";
									
									if (isCCTV) {
										//월별통계 차트정보 - 주말/주중 그래프
										var data = getChartSvgData("#weekendChart");
										if (data != undefined) {
											chart.push({title:"월별통계정보(주중/주말)", data:data});
										}

										//월별통계 차트정보 - 출퇴근시간대별 그래프
										var data = getChartSvgData("#rushHoursChart");
										if (data != undefined) {
											chart.push({title:"월별통계정보(출퇴근시간)", data:data});
										}

										//시간대별 차트정보 - 시간대별 그래프
										var data = getChartSvgData("#timeseriesChart");
										if (data != undefined) {
											chart.push({title:"시간대별통계정보(시간대별)", data:data});
										}
										
										//시간대별 차트정보 - 시간대별 그래프
										var data = getChartSvgData("#dayOfWeekChart");
										if (data != undefined) {
											chart.push({title:"시간대별통계정보(요일별)", data:data});
										}
		
									}else {
										//월별통계정보 - 주중 승하차
										var data = getChartSvgData("#brtMonthDayOfWeekChart");
										if (data != undefined) {
											chart.push({title:"월별통계정보(주중 승하차)", data:data});
										}
										
										//월별통계정보 - 주말 승하차
										var data = getChartSvgData("#brtMonthWeekendChart");
										if (data != undefined) {
											chart.push({title:"월별통계정보(주말 승하차)", data:data});
										}
										
										//월별통계정보 - 출근시간 승하차
										var data = getChartSvgData("#brtMonthOnWorkGraphArea");
										if (data != undefined) {
											chart.push({title:"월별통계정보(출근시간 승하차)", data:data});
										}
										
										//월별통계정보 - 퇴근시간 승하차
										var data = getChartSvgData("#brtMonthOffWorkChart");
										if (data != undefined) {
											chart.push({title:"월별통계정보(퇴근시간 승하차)", data:data});
										}
										
										//시간대별통계정보 - 주중 시간대별
										var data = getChartSvgData("#brtTimeSeriesDayOfWeekChart");
										if (data != undefined) {
											chart.push({title:"시간대별통계정보(주중 시간대별)", data:data});
										}
										
										//시간대별통계정보 - 주말 시간대별
										var data = getChartSvgData("#brtTimeSeriesWeekendChart");
										if (data != undefined) {
											chart.push({title:"시간대별통계정보(주말 시간대별)", data:data});
										}
										
										//시간대별통계정보 - 출근 시간대별
										var data = getChartSvgData("#brtTimeSeriesOnWorkChart");
										if (data != undefined) {
											chart.push({title:"시간대별통계정보(출근 시간대별)", data:data});
										}
										
										//시간대별통계정보 - 퇴근 시간대별
										var data = getChartSvgData("#brtTimeSeriesOffWorkChart");
										if (data != undefined) {
											chart.push({title:"시간대별통계정보(퇴근 시간대별)", data:data});
										}
									}
									break;
								default:
									break;
							}
								
							param = {
								title : title,
								subTitle: subTitle,
								adm_nm : adm_nm
							};
							
							//POI통계정보
							//2017.06.26 [개발팀] kcu 공공데이터 추가 
							var data = getChartSvgData("#"+chartId);
							if (data != undefined) {
								chart.push({title:subTitle, data:data});
							}
							
							
							//반경내 사업체정보
							//2017.06.26 [개발팀] kcu 공공데이터 추가 
							var data = getChartSvgData("#publicDataThemeChart");
							if (data != undefined) {
								chart.push({title:subTitle, data:data});
							}							
							break;
						case 2:
							mapType = "userData";
							dataType = mapType;
							mapData = $mydataDataBoard.ui.mapData[map.id].options;
							if ($mydataDataBoard.ui.selectedMyData != null) {
								subTitle = $mydataDataBoard.ui.selectedMyData.title;
							}
							param = {
									title : "나의 데이터",
									subTitle: subTitle
							};
							break;
						case 3:
							mapType = "poi";
							dataType = mapType;
							mapData = map.markers;
							param = {
									title : "POI 데이터",
									subTitle: map.mapBtnInfo.selectedPoiTitle
							};
							break;
						default:
							if (this.dataTypeList[map.id] == "kosis") {
								origin = "KOSIS";
							}else {
								origin = $("#dataBoardOrigin").html();
							}
							param = this.dropBtnInfo[map.id];
							mapData = map.dataForCombine;
							dataType = map.legend.selectType;
							break;
					}
				}
				
				if(mapType == "interactiveMap"){
					//2017.03.28 2레벨 조회일 경우, 파이차트 숨김
					if ($("#viewDataBoard").find(".topAreaChartsBox").is(":visible")) {
						chart = [
								    {
								    	title : "지역특성그래프", 
								    	data : [
								    	    $("#viewDataBoard").find(".topAreaChartsBox").clone(),
								    	    $("#viewDataBoard").find(".pieLegend").clone()
								    	]
								    }
								];
					}
				}
				
				//2017.06.26 [개발팀] kcu 공공데이터 추가 
				function getChartSvgData(id){
					var tmpChart = $(id).highcharts();
					if(tmpChart){
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
					geojson : map.dataGeojsonLayer, 
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
					isCaption : map.legend.numberData,
					dataType : dataType,
					origin : origin,
					markers : map.markers
				};
				
				//2017.02.22 이미지캡쳐 수정
				//==================================================================================================================================//
				setTimeout(function() {
					html2canvas($(divId), {
						logging: true,
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
	                    	var data = canvas.toDataURL();
	                    	var options = {
    	 							mapType : mapType,
    	 							mapClone : $(divId).clone(),
    	 							mapWidth : $(divId).width(),
    	 							mapHeight : $(divId).height(),
    	 							chart : chart,
    	 							legend :legend,
    	 							mapData : data
    	 					};
    	 					var popup = $interactiveMap.ui.reportPopup.$reportForm.ui;
    	 					popup.delegate = $interactiveMap.ui;
    	 					popup.map = map;
    	 					//'공공데이터'를 제외한 메뉴들만 변경된 보고서디자인 적용을 위해
    	 					popup.setNewDiv(mapType);
    	 					popup.setData(dataList, options);	
		 					
		 					
		 				}
		 			});
				},300);
				//==================================================================================================================================//
				
				
			},
			//============ 2017.06.26 공공데이터 추가 END ============//
			
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 데이터 세팅
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @param  res 결과데이터
			 * @param  options  기타데이터
			 */
			reportDataSet : function(type) {
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				if (map.dataGeojson == null && 
					map.multiLayerControl.dataGeojson == null) {
					if (this.dataTypeList[map.id] != undefined && this.dataTypeList[map.id] != null) {
						if (this.dataTypeList[map.id] == "publicData") {
							if ($publicDataBoard.ui.mapData[map.id].options.result.length == 0) {
								messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.</br>POI를 선택해주세요.");
								return;
							}
						}else if (this.dataTypeList[map.id] == "userData") {
							if ($("#searchMethodBox").find("input:checked").length == 0) {
								messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
								return;
							}
						}else if (this.dataTypeList[map.id] == "poi") {
							if (map.markers == null) {
								messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다");
								return;
							}else {
								var cnt =0;
								map.markers.eachLayer(function(layer) {
									cnt++;
								});
								if (cnt == 0) {
									messageAlert.open("알림", "보고서를 출력할 정보가 없습니다.");
									return;
								}
							}
						}
						else {
							messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
			 				return;
						}
					}else {
						messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
		 				return;
					}
				}
				$interactiveMap.ui.reportPopup = 
					window.open("/js/common/report/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
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
						for (var i=0; i<$interactiveMap.ui.mapList.length; i++) {
							if ($interactiveMap.ui.mapList[i] != null) {
								$interactiveMap.ui.mapList[i].update();
							}
						}
					});
					$(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneRela").eq(0).css({"border-left":"0"});
				}else if(sceneInx==2){ 
					$(".sceneBox").css({"position":"absolute"});
					$(".sceneBox").stop().animate({"width":"800px", "height":"500px"},200, function() {
						for (var i=0; i<$interactiveMap.ui.mapList.length; i++) {
							if ($interactiveMap.ui.mapList[i] != null) {
								$interactiveMap.ui.mapList[i].update();
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
						for (var i=0; i<$interactiveMap.ui.mapList.length; i++) {
							if ($interactiveMap.ui.mapList[i] != null) {
								$interactiveMap.ui.mapList[i].update();
							}
						}
					});
				} 
				
				//지도생성
				//heatMap 생성에 버그가 있음
				//맵이 완전히 생성되어 화면에 표출된 다음, heatMap을 생성해야 오류가 안남
				var map = this.createMap("mapRgn_" + (createMapId+1), createMapId); //9월 서비스
				var mapNavi = new mapNavigation.UI();
				mapNavi.firstBoolean = false;
				mapNavi.create("mapNavi_" + (createMapId+1), createMapId+1, $interactiveMap.ui);
				
				//범례고정 show/hide
				//9월 서비스
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].legend.showLegendFixed();
					}
				}
				
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
					$(".tb_combine").parent().show();
					$(".viewTitle > span").show();
				}else {
					$(".viewTitle > span").hide();
				}
				
				$("#helper_" + parseInt(createMapId+1)).show();
				$("#title_" + parseInt(createMapId+1)).text("");
				$("#title_" + parseInt(createMapId+1)).hide();
				//mng_s 20180104 주용민 다중뷰 투명도 hide
				$(".lgListBox li:last").hide();
				//mng_e
				apiLogWrite2("A0","A16","다중뷰","없음","00","없음");
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
				this.doClearMap(type, true);
				this.curMapId = parseInt(type)-1;
				if (this.mapList[this.curMapId] !== undefined) {
					this.mapList[this.curMapId].gMap.remove();
					this.mapList[this.curMapId] = null;
				}
				
				$(".sceneBox").eq(this.curMapId).removeClass("on").hide();
				var sceneInx = $(".sceneBox.on").length;  
				if(sceneInx==1){  
					$(".sceneBox").stop().animate({"width":"100%"},200, function() {
						for (var i=0; i<$interactiveMap.ui.mapList.length; i++) {
							if ($interactiveMap.ui.mapList[i] != null) {
								$interactiveMap.ui.mapList[i].update();
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
						for (var i=0; i<$interactiveMap.ui.mapList.length; i++) {
							if ($interactiveMap.ui.mapList[i] != null) {
								$interactiveMap.ui.mapList[i].update();
							}
						}
					});
					
					$(".sceneBox").draggable("destroy").resizable("destroy").css({"position":"static", "border":"0", "height":"100%"});
					$(".sceneBox.on").eq(1).find(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneBox.on").each(function(index) {
						$(this).find(".tb_radio").hide();
					});
				}
				
				//범례고정 show/hide
				//9월 서비스
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].legend.hideLegendFixed(this.curMapId);
					}
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
				$("#title_"+type).empty();
				$("#title_"+type).hide();
				$("#helper_"+type).show();
				$interactiveLeftMenu.ui.updateSearchBtnEffect("", this.curMapId);
				
				/*$mydataDataBoard.ui.delegateSetting($interactiveMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($interactiveMap.ui);			//공공데이터 세팅
*/				
				//데이터보드 초기화
				//this.dataTypeList[this.curMapId] = null;
				//$interactiveDataBoard.ui.reset(this.curMapId);
				//$publicDataBoard.ui.remove(this.curMapId);
				//$mydataDataBoard.ui.remove(this.curMapId);
				
				
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
				
				$mydataDataBoard.ui.delegateSetting($interactiveMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($interactiveMap.ui);			//공공데이터 세팅
				
				//현재 선택된 맵으로 데이터보드 다시 그리기
				$interactiveDataBoard.ui.reDraw(this.curMapId);
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
					mapNavi1.create("mapNavi_1", 1, $interactiveMap.ui);	
					
					//서브메뉴 선택 시, 해당 항목에 대한 2단계 메뉴창을 open한다.
					if (type == "mainIndexView" 	  ||
						type == "populationHouseView" ||
						type == "3fView"			  ||
						type == "companyView"	      ||
						type == "kosisView"			  ||
						type == "publicDataView"	  ||
						type == "userDataView"		  ||
						type == "userdata") {
						if  (type.indexOf("View") != -1) {
							setTimeout(function() {
								$interactiveLeftMenu.ui.setDetailStatsPanel(type.split("View")[0]);
							}, 200);
						}
					}
					return false;
				}
				
				var map = this.mapList[0];
				var mapNavi1 = new mapNavigation.UI();
				mapNavi1.create("mapNavi_1", 1, $interactiveMap.ui);
				
				var typeList = {
					"bookmark"  		: 0,	//북마크
					"sharedata" 		: 1,	//공유
					"totalindex"		: 2,	//인구총괄
					"population"		: 3,	//인구통계
					"company"			: 4,	//사업체통계
					"household"			: 5,	//가구통계
					"house"				: 6,	//주택통계
					"farmhousehold"		: 7,	//농가통계
					"forestryhousehold" : 8,	//임가통계
					"fisheryhousehold"	: 9,	//어가통계
					"householdmember"	: 10,	//가구원통계
					"kosis"				: 11,	//kosis통계
					"recentdata"		: 12,	//메인최신통계
					"userdata"			: 13,   //사용자데이터
					"publicdata"		: 14	//공공데이터 	2017.07.13 [개발팀] kcu 공공데이터 url
				};
				
				var apiInfo = [
				       {id:"API_0301", url:"/OpenAPI3/stats/population.json", unit:"명"},  									//인구총괄
				       {id:"API_0302", url:"/OpenAPI3/stats/innersearchpopulation.json", unit:"명", showData:"population"},	//인구통계  9월서비스 권차욱 api명 변경
				       {id:"API_0304", url:"/OpenAPI3/stats/company.json", unit:"개", showData:"corp_cnt"},					//사업체통계
				       {id:"API_0305", url:"/OpenAPI3/stats/household.json", unit:"가구", showData:"household_cnt"},		//가구통계
				       {id:"API_0306", url:"/OpenAPI3/stats/house.json", unit:"호", showData:"house_cnt"},					//주택통계
				       {id:"API_0307", url:"/OpenAPI3/stats/farmhousehold.json", unit:"가구", showData:"farm_cnt"},			//농가통계
				       {id:"API_0308", url:"/OpenAPI3/stats/forestryhousehold.json", unit:"가구", showData:"forestry_cnt"},	//임가통계
				       {id:"API_0309", url:"/OpenAPI3/stats/fisheryhousehold.json", unit:"가구", showData:"fishery_cnt"},	//어가통계
				       {id:"API_0310", url:"/OpenAPI3/stats/householdmember.json", unit:"명", showData:"population"},		//가구원통계
				];
				
				//인구총괄 showData
				var totalIndex_showData = {
						"tot_ppltn" 	  : 0,
						"avg_fmember_cnt" : 1,
						"nongga_ppltn" 	  : 2,
						"imga_ppltn" 	  : 3,
						"naesuoga_ppltn"  : 4,
						"haesuoga_ppltn"  : 5,
						"avg_age"		  : 6,
						"ppltn_dnsty"	  : 7,
						"aged_child_idx"  : 8,
						"oldage_suprt_per": 9,
						"juv_suprt_per"	  : 10,
						"tot_family"	  : 11,
						"nongga_cnt"	  : 12,
						"imga_cnt"		  : 13,
						"naesuoga_cnt"    : 14,
						"haesuoga_cnt"    : 15,
						"tot_house"		  : 16,
						"corp_cnt"		  : 17,
						"employee_cnt"	  : 18
				};
				
				var url, title, unit, isKosis = false, api_id, center, zoomlevel, showData, paramInfo = {};
				var admCdList = [];
				switch(typeList[type]) {
					case 0:
					case 1:
					case 12:
						this.searchBtnType = "normal";
						url = data.api_call_url;
						data["param_info"] = JSON.parse(data.param_info);
						
						if (data.param_info.type == "userData") {
							$mydataDataBoard.ui.setShareData(data.param_info);
							$mydataDataBoard.ui.updateMyData(data.param_info.paramInfo.data_id, data.param_info.title);
							return;
						}else {
							//사업체검색에서 전산업일 경우 area_type을 삭제
							if(url == "/OpenAPI3/stats/population.json" && data.param_info.api_id == "API_0304") {
								delete data.param_info.paramInfo["area_type"];
							}
							
							if (data.param_info.title == undefined) {
								title = data.hist_nm;
							}else {
								title = data.param_info.title;
							}
							data["param_info"]["title"] = title;	
							
							//kosis일 경우, api_id와 title을 강제로 세팅한다.
							if (data.param_info.isKosis) {
								data.param_info["api_id"] = "kosis";
								interactiveMapKosis.curSelectedTitle = data.param_info.title;
							}
							
							if (data.param_info.paramInfo.adm_cd.indexOf(",") != -1) {
								admCdList = data.param_info.paramInfo.adm_cd.split(",");
							}else {
								admCdList.push(data.param_info.paramInfo.adm_cd)
							}
						}
						break;
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
						this.searchBtnType = "normal";
						api_id = apiInfo[typeList[type]-2].id;
						url = apiInfo[typeList[type]-2].url;
						admCdList.push(data.adm_cd);
						center = [data.x, data.y];
						title = data.title;
						isKosis = false;
						
						//단위설정
						if (type == "totalindex") {
							switch(totalIndex_showData[data.showData]) {
								case 0:
								case 1:
								case 2:
								case 3:
								case 4:
								case 5:
								case 18:
									unit = "명";
									break;
								case 6:
									unit = "세";
									break;
								case 7:
									unit = "명/㎢";
									break;
								case 8:
								case 9:
								case 10:
									unit = "일백명당 명";
									break;
								case 11:
								case 12:
								case 13:
								case 14:
								case 15:
									unit = "가구";
									break;
								case 16:
									unit = "호";
									break;
								case 17:
									unit = "개";
									break;
							}
						}else {
							unit = apiInfo[typeList[type]-2].unit;
						}
						
						//showData 설정
						switch (typeList[type]) {
							case 0:
							case 1:
							case 2:
								showData = data.showData;
								break;
							default:
								showData = apiInfo[typeList[type]-2].showData;
								break;
						}
						
						//파라미터정보 설정
						for (p in data) {
							if (p != "x" && 
								p != "y" &&
								p != "showData" &&
								p != "title") {
								paramInfo[p] = data[p];
							}
						}
						paramInfo["bnd_year"] = bndYear;
						
						//행정동코드 및 줌레벨 설정
						if (data.adm_cd == null) {
							data.adm_cd = "00";
							center = [966298, 1898301];
						}
						
						if (data.adm_cd == "00") {
							zoomlevel = 2;
						}else {
							switch (data.adm_cd.length) {
							case 2:
								zoomlevel = 4;
								break;
							case 5:
								zoomlevel = 6;
								break;
							case 7:
								zoomlevel = 9;
								break;
							default:
								zoomlevel = 2;
								data.adm_cd = "00";
								break;
							}
						}		
						break;
					case 11:
						api_id = "kosis";
						isKosis = true;
						
						interactiveMapKosis.gis_se = data.gis_se;
						interactiveMapKosis.org_id = data.kosis_org_id;
						interactiveMapKosis.tbl_id = data.kosis_tb_id;
						interactiveMapKosis.adm_cd = data.adm_cd;
						interactiveMapKosis.atdrc_yn = data.atdrc_yn;
						
						// j.h.Seok
						if(data.adm_cd == undefined || data.adm_cd == null) {
							interactiveMapKosis.adm_cd = '00';
						}
						
						if(data.obj_var_id != undefined) {
							interactiveMapKosis.kosis_obj_var_id = data.obj_var_id;
						}
						
						if(data.field_id != undefined) {
							interactiveMapKosis.kosis_field_id = data.field_id
						}
						
//						var center = [data.x, data.y];
//						var url = "/SOP_Kosis/kosis/ServiceAPI/api/KosisDataList.do";
						var url = "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
						var zoom = "0";
						
						var title = decodeURIComponent(data.title);
						interactiveMapKosis.curSelectedTitle = title;
						interactiveMapKosis.kosis_select_menu_text = title;
						
//						this.mapList[mapId].setZoom(zoom);
						
						interactiveMapKosis.gis_se = interactiveMapKosis.gis_se.replace(/(^\s*)|(\s*$)/gi, "");
						interactiveMapKosis.gis_se = parseInt(interactiveMapKosis.gis_se);
						
						//전국경계
						if(interactiveMapKosis.adm_cd == "00" || interactiveMapKosis.adm_cd == "") {
							zoom = "2";
							interactiveMapKosis.adm_cd = "1";
						} else {
							switch(interactiveMapKosis.gis_se) {
							case 1: //전국시도
								zoom = "2";
								if(interactiveMapKosis.adm_cd != undefined && interactiveMapKosis.adm_cd.length >= 2) {
									interactiveMapKosis.adm_cd = "1";
								} else {
									interactiveMapKosis.adm_cd = "1";
								}
								break;

							case 2: //시군구
								zoom = "4"; //5->4
								if(interactiveMapKosis.adm_cd != undefined && interactiveMapKosis.adm_cd.length >= 5) {
									interactiveMapKosis.adm_cd = interactiveMapKosis.adm_cd.substring(0, 2);
								} else {
									interactiveMapKosis.adm_cd = "1";
								}
								break;

							case 3: //읍면동 
								zoom = "6"; //7->6
								if(interactiveMapKosis.adm_cd != undefined && interactiveMapKosis.adm_cd.length > 2) {
									interactiveMapKosis.adm_cd = interactiveMapKosis.adm_cd.substring(0, 5);
								} else {
									interactiveMapKosis.adm_cd = "1";
								}
								break;
							}
						}
						
						admCdList.push(interactiveMapKosis.adm_cd);
						
						// j.h.Seok
						if(data.x == undefined || data.x == null || data.y == undefined || data.y == null) {
							center = ["989674", "1818313"];
						} else {
							center = [data.x, data.y];
						}
						
						zoomlevel = zoom;
						
						var options = new Array();
						options.push({
							key : "gis_se",
							value : interactiveMapKosis.gis_se
						});
						
						options.push({
							key : "org_id",
							value : interactiveMapKosis.org_id
						});
						
						options.push({
							key : "tbl_id",
							value : interactiveMapKosis.tbl_id
						});
						
						options.push({
							key : "adm_cd",
							value : interactiveMapKosis.adm_cd
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
							value : interactiveMapKosis.curSelectedTitle
						});
						
						if(interactiveMapKosis.kosis_obj_var_id == null || interactiveMapKosis.kosis_obj_var_id == undefined) {
							interactiveMapKosis.getKosisDetailOption(options);
						} else {
							interactiveMapKosis.getKosisStaticDataFieldForSearchList(options);
						}
						break;
					case 13:
						$interactiveLeftMenu.ui.curSelectedStatsType = "userData";
						$mydataDataBoard.ui.updateMyData(data.id, data.title);
						map.openApiReverseGeoCode(map.center);
						return;
						break;
					//2017.07.13 [개발팀] 공공데이터 url	
					case 14:
						$interactiveLeftMenu.ui.curSelectedStatsType = "publicData";
						if (data.id != undefined && data.id.length > 0) {
							closeRotationTip('interactive_laypopup', 1);
							$(".headerEtc").hide();
							$(".headerContents").hide();
							$("#footer").hide();
							$(".containerBox").css({
								"top" : "0px",
								"height" : "100%"
							});
							$("#map_left_btn").hide();
							$(".sideQuick.sq03").hide();
							$(".tb_bookmark").parent().hide();
							$(".tb_share").parent().hide();
							$(".tb_mapAdd").parent().hide();
							$(".tb_radio").hide();
							$("#rotationTip").hide();
							$("#tuto_start_btn").hide();
							$(".helperText").hide();
							$(".helperText").next().hide();
							
							//선택항목창 닫기
							var sq03 = $(".sideQuick.sq03");
							if(sq03.hasClass("on")){
								$(sq03).click();
							}
							
							//왼쪽 메뉴창 닫기
							var sq02 = $(".sideQuick.sq02");
							if(sq02.hasClass("on")){
								$(sq02).click();
							}
							
							//범례 최소화
							$("#btn_legend_"+map.legend.id).click();
							
							$interactiveMap.noReverseGeoCode = true;
							//setTimeout(function() {
								map.multiLayerControl.dataGeojson = [];
								map.multiLayerControl.openApiBoundaryHadmarea("29", bndYear, "0", null, "0", function(res) {
									var geojson = map.addPolygonGeoJson(res, "polygon");
									if (geojson) {
										geojson.eachLayer(function(layer) {
											layer.feature["info"] = [];
											layer.feature["tooltip"] = false; //2017.07.24 [개발팀] 공공데이터 - 경계 툴팁제거
											layer.setStyle({
												weight : 2,
												color : "#4169e1",
												dashArray : "",
												fillOpacity : 0.1,
												fillColor : "#4169e1"
											});
											layer.on({
												mouseout : function(e) {
													var tmpLayer = e.target;
													tmpLayer.setStyle({
														weight : 2,
														color : "#4169e1",
														dashArray : "",
														fillOpacity :0.1,
														fillColor : "#4169e1"
													});
												}
											});
										}) 
									};
									$publicDataBoard.ui.updatePublicData(data.id);
								});
							//}, 200);
							
						}
						return;
						break;
					default:
						break
				};

				var shareInfo = {
						api_call_url : url,
						param_info : {
							api_id :api_id,
							isKosis : isKosis,
							mapInfo : {
								center : center,
								zoomlevel : zoomlevel
							},
							paramInfo : paramInfo,
							showData : showData,
							title : title,
							unit : unit
						},
						title : title
				};
				
				//북마크/공유/메인최신통계 일 경우
				if (typeList[type] == 0 || typeList[type] == 1 || typeList[type] == 12) {
					shareInfo.param_info = data.param_info;
				}
				
				if(!isKosis) {
					var tmpShareInfo = [];
					var tmpParams = deepCopy(shareInfo);
					tmpShareInfo.push(tmpParams);
					$interactiveLeftMenu.ui.setRevertParams(tmpShareInfo, "share");
					this.updateSearchTitle(shareInfo.param_info.title, shareInfo.param_info.unit, 0);
					
					if (admCdList.length > 1) {
						map.setBoundSelectedMoode("multi");
						map.mapBtnInfo.setFixedBoundBtn(true);
					}
					for (var i=0; i<admCdList.length; i++) {
						$interactiveMapApi.request.openApiShareForStats(tmpParams, admCdList[i]);
					}
				}
				
				
				map.curDropCd = shareInfo.param_info.paramInfo.adm_cd;
				$interactiveMap.ui.dropBtnInfo[map.id] = $interactiveLeftMenu.ui.arParamList[0];
				if ( shareInfo.param_info.paramInfo != null &&  shareInfo.param_info.paramInfo != undefined) {
					for (var p in  shareInfo.param_info.paramInfo) {
						if (p == "year") {
							this.curDropParams[map.id] = {}
							this.curDropParams[map.id]["param"] = [];
							var tmpParams = {
							     "key": "year", 
							     "value": shareInfo.param_info.paramInfo[p]
							};
							this.curDropParams[map.id]["param"].push(tmpParams);
							tmpParams = null;
						}
					}
				}
				
				return true;
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
				if (type == "settings") {
					if ($("#bndYear").val() != map.bnd_year) {
						map.bnd_year = $("#bndYear").val();
						map.openApiReverseGeoCode(map.center);
					}	
					map.bnd_year = $("#bndYear").val();
				}
				else if (type == "sharedlg") {
					copyToClipboard($("#sharedlg").find($("input")).val());
				}
				else if (type == "bookmarkdlg") {
					map.shareInfo.doBookMark($("#savesubj").val());
				}
				else if (type == "uploadFile") {
					$("#fileSearch").val("");
					$("#filePathField").val("");
				}
				
				if (type != "sharePeriodSetting") {
					$(".deem").hide();
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
				
				if (type != "sharePeriodSetting") {
					$(".deem").hide();
				}
				$("#"+type).hide();
				
			},
			
			/**
			 * 
			 * @name         : updateSearchTitle
			 * @description  : 통계제목을 설정한다. 
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			updateSearchTitle : function(title, unit, mapId) {
				var viewId = mapId+1;
				if (unit != undefined) {
					title = title + "(" + unit + ")";
				}
				
				$("#helper_" + viewId).hide();
				$("#title_" + viewId).text(title);
				$("#title_" + viewId).show();
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
			 * @name         : informationPopClose
			 * @description  : SGIS 서비스 이용시 유의사항 팝업 닫기
			 * @date         : 2016. 02. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			informationPopClose : function() {
				$("#notice_mini_pop").hide();
			},
			
			/**
			 * @name         : informationPopOpen
			 * @description  : SGIS 서비스 이용시 유의사항 팝업 열기
			 * @date         : 2016. 02. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			informationPopOpen : function() {
				if($("#notice_mini_pop").css("display") == "none") {
					$("#notice_mini_pop").show();
				} else {
					$("#notice_mini_pop").hide();
				}
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
				
				//console.log("[interactiveMap.js] createInfoTooltip() map.grid_legend_new [" + map.grid_legend_new);
				
				var html = "<table style='margin:10px;'>";
				var searchYear = "";
				var that = this;
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
									"naesuoga_ppltn" : "내수면어가인구",
									"haesuoga_cnt" : "해수면총어가",
									"haesuoga_ppltn" : "해수면어가인구",
									"employee_cnt" : "종사자수"
								};
				if(this.curDropParams[map.id] != undefined) {
					for(var i = 0; i < this.curDropParams[map.id].param.length; i ++) {
						if (this.curDropParams[map.id].param[i].key == "year") {
							//지도 추가하여 비교시 년도 표시가 다르게 나와서 원복(17.06.07)
							searchYear = this.curDropParams[map.id].param[i].value + "년 ";
							
							//시계열 조회시 지도에 툴팁 년도 안바뀌는 문제 수정(17.03.16)
//							var year = ( !this.curDropParams.time_year ? this.curDropParams[map.id].param[i].value : this.curDropParams.time_year );
//							searchYear = year + "년 ";
							
							
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
							//나의 데이터일 경우
							if(data.info[0].api_id == "API_MYDATA") {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
								for(var i = 0; i < data.info[0].userData.length; i ++) {
									html += "<tr>";
									html += "<td>" + data.info[0].userData[i].title + " : " + data.info[0].userData[i].data + "</td>";
									html += "</tr>";
								}
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								
							} else {	//일반 조회일 경우								
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
										if (data.properties.adm_cd.length > 7 && !sop.isInnerMapShow2 && !sop.isInnerMapShow3) { //mng_s !sop.isInnerMapShow2==>그리드가 아니면
											html += "<tr>";
											html += "<td class='statsData'>";
											html += ( data.dataIdx + 1 ) + '_';
											html += "집계구 : " + data.properties.adm_cd + "</td>";
											html += "</tr>";
										}
									}
									
									if (tmpData.showData != undefined && tmpData.showData.length > 0) {
										var filterName = ""; 
										var title = "";
										if (showName[tmpData.showData] != undefined) {
											filterName = showName[tmpData.showData];
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
											// 2016. 03. 24 j.h.Seok modify
											//tmpData.showData != "corp_cnt" &&
											tmpData.showData != "tot_worker" &&
											tmpData.showData != "avg_fmember_cnt" &&
											tmpData.showData != "employee_cnt") {
											
											//mng_s
											if (sop.isInnerMapShow2) { //그리드 이면
												//value = "5미만"; //그리드에서 5미만은 없고, 값의 범위만 표시해주므로 여기서는 아무처리하지 않는걸로 변경함. 추후 5미만 표시 해달라고 하면 이 부분 주석해제하기 바람. 20171123
												
												// N/A의 경우 투명하게 해달라는 요구가 있어서 해봤으나 않되네...ㅠㅠ
												//$('.sop-interactive').attr('fill-opacity','0.1');
												
											} else if (sop.isInnerMapShow3) { //행정구역 그리드 이면 5미만도 표시해 준다
												value = appendCommaToNumber(tmpData[tmpData.showData]);
											} else {
												value = "N/A";
											}											
											
										}else {
											value = appendCommaToNumber(tmpData[tmpData.showData]);
										}
										
										if (value != "N/A") {
											
											//mng_s
											if (sop.isInnerMapShow2) { //그리드 이면
												
												//mng_s
												if(value == "5미만") { //그리드이면 5미만으로 표시
													value = "5미만";
												} else {
													//map.grid_legend_new[0][0]는 더미값 0.01 이므로 사용않함.
													if(Number(tmpData[tmpData.showData]) < Number(map.grid_legend_new[0][1])) {
														value = appendCommaToNumber(map.grid_legend_new[0][1]) + " 이하";
													} else if(Number(map.grid_legend_new[0][1]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][2]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][1]) + "~" + appendCommaToNumber(map.grid_legend_new[0][2]) + " 이하";
													} else if(Number(map.grid_legend_new[0][2]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][3]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][2]) + "~" + appendCommaToNumber(map.grid_legend_new[0][3]) + " 이하";
													} else if(Number(map.grid_legend_new[0][3]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][4]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][3]) + "~" + appendCommaToNumber(map.grid_legend_new[0][4]) + " 이하";
													} else if(Number(map.grid_legend_new[0][4]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][5]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][4]) + "~" + appendCommaToNumber(map.grid_legend_new[0][5]) + " 이하";
													} else if(Number(map.grid_legend_new[0][5]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][6]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][5]) + "~" + appendCommaToNumber(map.grid_legend_new[0][6]) + " 이하";
													} else if(Number(map.grid_legend_new[0][6]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][7]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][6]) + "~" + appendCommaToNumber(map.grid_legend_new[0][7]) + " 이하";
													} else if(Number(map.grid_legend_new[0][7]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][8]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][7]) + "~" + appendCommaToNumber(map.grid_legend_new[0][8]) + " 이하";
													} else if(Number(map.grid_legend_new[0][8]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][9]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][8]) + "~" + appendCommaToNumber(map.grid_legend_new[0][9]) + " 이하";
													} else if(Number(map.grid_legend_new[0][9]) <  Number(tmpData[tmpData.showData])  ) {
														value = appendCommaToNumber(map.grid_legend_new[0][9]) + " 초과";
													}
												}
											}
											
											//mng_s
											if (sop.isInnerMapShow3) { //행정구역 그리드 이면
												if(value == "5미만") { //그리드이면 5미만으로 표시
													value = "5미만";
												}
											}
											
											html += "<td class='statsData'>"+title+value+" ("+tmpData.unit+")</td>";
											
										}else {
											html += "<td class='statsData'>"+title+value+"</td>";
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
						}
					}else {
						//mng_s
						if (sop.isInnerMapShow2 || sop.isInnerMapShow3) { //그리드 이면
							html += "<tr><td class='statsData'></td></td>";
						} else {
							if (data.properties.adm_nm !== undefined) {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
							}
							//집계구 일경우
							if (data.properties.adm_cd.length > 7) {
								html += "<tr>";
								html += "<td class='statsData'>";
								html += "집계구 : " + data.properties.adm_cd + "</td>";
								html += "</tr>";
							}
							
							var filterName = ""; 
							var title = "";
							if (showName[that.toolTipTitle] != undefined) {
								filterName = showName[that.toolTipTitle];
							}
							html += "<tr style='font-size:12px;padding-left:5px;'>";
							if (filterName.length > 0) {
								title = searchYear +" " + filterName + " : ";
							} else {
								title = searchYear + " : ";
							}
							
							html += "<td class='statsData'>"+title+" N/A ("+that.toolTipUnit+")</td>";
//							html += "<tr><td class='statsData'>N/A</td></td>";
						}
						
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
				}else if (type == "polygon") {
					var html = "<table style='margin:10px;'>";
					if (data.properties.adm_nm !== undefined) {
						html += "<tr><td class='admName'>"
							 + data.properties.adm_nm 
							 + "</td></tr>"
							 + "<tr style='height:5px'></tr>";
					}
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
			 * @date         : 2015. 10. 08. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			requestOpenApi : function(options) {
				
				console.log("[interactiveMap.js] requestOpenApi() 호출");
				
				//9월 서비스
				//options.map.isDrop = true;
				//options.map.undoDropLayerBounds();
				
				//param의 adm_cd가 00(전국)일 경우 adm_cd 삭제
				var tmpOptions = [];
				for (var i = 0; i < options.param.length; i ++) {
					if((options.param[i].key == "adm_cd" && options.param[i].value == "00")|| options.param[i].key == "adm_cd") { //9월 서비스
					} else {
						tmpOptions.push(options.param[i]);
					} 
				}
				options.param = tmpOptions;

				var api_id = options.api_id;
				
				console.log("[interactiveMap.js] requestOpenApi() api_id [" + api_id);
				
				if 	    (api_id == "API_0301") $interactiveMapApi.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $interactiveMapApi.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $interactiveMapApi.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $interactiveMapApi.request.openApiCompany(options);
				else if (api_id == "API_0305") $interactiveMapApi.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $interactiveMapApi.request.openApiHouse(options);
				else if (api_id == "API_0307") $interactiveMapApi.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $interactiveMapApi.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $interactiveMapApi.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $interactiveMapApi.request.openApiHouseHoldMember(options);
				else if (api_id == "API_4011") $interactiveMapApi.request.openApiItemCombine(options);
				pageCallReg();
				
			},
			
			/**
			 * 
			 * @name         : requestGridLegend
			 * @description  : 좌측 범례의 확정값 요청한다.
			 * @date         : 2017. 07. 27. 
			 * @author	     : 김준하
			 * @history 	 :
			 * @param options
			 */
			requestGridLegend : function(options) {
				
				console.log("[interactiveMap.js] requestGridLegend() 호출");
				
				//9월 서비스
				//options.map.isDrop = true;
				//options.map.undoDropLayerBounds();
				
				//param의 adm_cd가 00(전국)일 경우 adm_cd 삭제
				/*
				var tmpOptions = [];
				for (var i = 0; i < options.param.length; i ++) {
					if((options.param[i].key == "adm_cd" && options.param[i].value == "00")|| options.param[i].key == "adm_cd") { //9월 서비스
					} else {
						tmpOptions.push(options.param[i]);
					} 
				}
				options.param = tmpOptions;
				*/

				var api_id = options.api_id;
				
				console.log("[interactiveMap.js] requestGridLegend() api_id [" + api_id);
				
				//주의할점 경고!!! 실제 페이지를 불러올때 아래 함수가 없으면 맵이 정상작동을 않함. 
				//개발중이어서 다 만들지 않은 상태에서 테스트 하다보니 지도를 드래그 했을때 격자를 못그림
				//각 서비스별로 나눌 필요가 없어서 하나로 사용한다.
				$interactiveMapApi.request.gridLegendTotalPopulation(options);
				/*
				if 	    (api_id == "API_0301") $interactiveMapApi.request.gridLegendTotalPopulation(options);
				else if (api_id == "API_0302") $interactiveMapApi.request.gridLegendTotalPopulation(options); //0302테스트용 이 함수가 없으면 맵이 작동 않함.
				//else if (api_id == "API_0302") $interactiveMapApi.request.gridLegendSearchPopulation(options);
				else if (api_id == "API_0303") $interactiveMapApi.request.gridLegendInderstryCode(options);
				else if (api_id == "API_0304") $interactiveMapApi.request.gridLegendCompany(options);
				else if (api_id == "API_0305") $interactiveMapApi.request.gridLegendHouseHold(options);
				else if (api_id == "API_0306") $interactiveMapApi.request.gridLegendHouse(options);
				else if (api_id == "API_0307") $interactiveMapApi.request.gridLegendFarmHouseHold(options);
				else if (api_id == "API_0308") $interactiveMapApi.request.gridLegendForestryHouseHold(options);
				else if (api_id == "API_0309") $interactiveMapApi.request.gridLegendFisheryHouseHold(options);
				else if (api_id == "API_0310") $interactiveMapApi.request.gridLegendHouseHoldMember(options);
				else if (api_id == "API_4011") $interactiveMapApi.request.gridLegendItemCombine(options);
				*/
				pageCallReg(); //그리드 페이지 통계
				
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
			reqSetParams : function (tmpParam, adm_cd, adm_nm, api_id, map, type) {
				
				console.log("[interactiveMap.js] reqSetParams() 호출 adm_cd [" + adm_cd);
				
				//0레벨,2레벨 집계구 조회일 경우,
				//레벨상관없이 집계구가 나와야 하므로, low_search를 강제로 1로 주기위에
				//소스위치를 옮김
				var low_search;
				if (adm_cd.length > 7 || type == "gibgae") {
					if (map.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 8자리일 경우 8자리를 유지해야함
						low_search = "0";
					} else {
						low_search = "1";
						adm_cd = adm_cd.substring(0, 7);
					}
				}else {
					low_search = map.boundLevel;
				}
				this.curAdmCode = adm_cd;
				map.curAdmCd = adm_cd;
				map.curDropCd = adm_cd;
				
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
					value : low_search
				});
				
				return params;
			}
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$interactiveMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				
				console.log("[interactiveMap.js] didMapMoveEnd 호출");
				console.log("[interactiveMap.js] didMapMoveEnd() $interactiveMap.ui.dropBtnInfo[map.id] [" + $interactiveMap.ui.dropBtnInfo[map.id]);
				
				var poiControl = map.mapBtnInfo;
				
				//테마poi조회
				if (poiControl.isOpenPOI && 
					poiControl.isShow &&
					poiControl.themeCd != undefined && 
					poiControl.themeCd.length > 0) {
					
					console.log("[interactiveMap.js] didMapMoveEnd 테마poi조회");
					
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
						poiControl.isShow &&
						poiControl.class_cd != undefined && 
						poiControl.class_cd.length > 0) {
					
						console.log("[interactiveMap.js] didMapMoveEnd 사업체poi조회");
					
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
				
				//공공데이터 조회
				var publicDataBoard = $publicDataBoard.ui.mapData[map.id];
				if (publicDataBoard.type != undefined && 
					publicDataBoard.type.length > 0 && 
					$publicDataBoard.ui.isShow) {
/*
<<<<<<< .mine
					
					console.log("[interactiveMap.js] didMapMoveEnd 공공데이터 조회");
					
					if(publicDataBoard.options.mapBounds == null) {
						map.markers.clearLayers();
						$publicDataBoard.ui.reqPoi();
					} else {
						if (!publicDataBoard.options.mapBounds.contains(map.gMap.getCenter())) {
=======
					//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
					if (publicDataBoard.type != "cctv") {
						if(publicDataBoard.options.mapBounds == null) {
>>>>>>> .r1050
							map.markers.clearLayers();
							$publicDataBoard.ui.reqPoi();
						} else {
							if (!publicDataBoard.options.mapBounds.contains(map.gMap.getCenter())) {
								map.markers.clearLayers();
								$publicDataBoard.ui.reqPoi();
							}
						}	
					}
*/
					//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
					if (publicDataBoard.type != "cctv") {
						if(publicDataBoard.options.mapBounds == null) {
							map.markers.clearLayers();
							$publicDataBoard.ui.reqPoi();
						} else {
							if (!publicDataBoard.options.mapBounds.contains(map.gMap.getCenter())) {
								map.markers.clearLayers();
								$publicDataBoard.ui.reqPoi();
							}
						}	
					}
				}
				
				//나의데이터
				if ($mydataDataBoard && 
						$mydataDataBoard.callbackFunc &&
						$mydataDataBoard.callbackFunc.didMapMoveEnd) {
					
					console.log("[interactiveMap.js] didMapMoveEnd 나의데이터");
					
					$mydataDataBoard.callbackFunc.didMapMoveEnd(event, map);
				}
				
				if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
					if($interactiveMap.ui.dropBtnInfo[map.id] != null && $interactiveMap.ui.dropBtnInfo[map.id]!=undefined) {
						$(".dragItem .M_on").dblclick();
						
						/*
						$(".dragItem").dblclick(function(event) {
							var id = $("#"+event.currentTarget.id).find("a").attr("id");
							var index = id.split("-")[1];
							var tmpParam = "";
							for(var i = 0; i < $interactiveMapLeftMenu.ui.arParamList.length; i ++) {
								if($$interactiveMapLeftMenu.ui.arParamList[i].idx == index) {
									tmpParam = $interactiveMapLeftMenu.ui.arParamList[i];
								}
							}
							// 더블클릭 시, 콜백 호출
							$interactiveMap.callbackFunc.didMapDoubleClick(id, tmpParam);
						});
						*/
						
					}
				}
				
			},
			
			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				
				console.log("[interactiveMap.js] didMapZoomEnd 호출");
				console.log("[interactiveMap.js] didMapZoomEnd() map.zoom [" + map.zoom);
				
				//mng_s
				if(map.isInnerMapShow2) {
					
					//mng_s
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
					
					
					if(map.geojson != null) {
						map.geojson.remove();
					}
					if(map.dataGeojson != null) {
						map.dataGeojson.remove();
					}
					
					map.openApiBoundaryHadmarea("11010", map.bnd_year, "1", "0", map.boundaryCallback, map.bounds); //그리드이므로 adm_cd는 임의의 값을 넣어줌
					if($interactiveMap.ui.dropBtnInfo[map.id] != null && $interactiveMap.ui.dropBtnInfo[map.id]!=undefined) {
						$(".dragItem .M_on").dblclick();
						
						/*
						$(".dragItem").dblclick(function(event) {
							var id = $("#"+event.currentTarget.id).find("a").attr("id");
							var index = id.split("-")[1];
							var tmpParam = "";
							for(var i = 0; i < $interactiveMapLeftMenu.ui.arParamList.length; i ++) {
								if($$interactiveMapLeftMenu.ui.arParamList[i].idx == index) {
									tmpParam = $interactiveMapLeftMenu.ui.arParamList[i];
								}
							}
							// 더블클릭 시, 콜백 호출
							$interactiveMap.callbackFunc.didMapDoubleClick(id, tmpParam);
						});
						*/
						
					}
				}
				
				//mng_s 20180213
				if(map.isInnerMapShow3) {
					
					//mng_s
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
				}
				
				var poiControl = map.mapBtnInfo;
				if (map.zoom < 10 && map.isInnerMapShow) {
					$interactiveMap.ui.doInnerMap(map.id+1);
				}

				//사업체 POI 없애기
				if (map.zoom < 9 && poiControl.isOpenPOI && poiControl.isShow) {
					poiControl.isShow = false;
					messageConfirm.open(
			    			 "알림", 
			    			 "해당 레벨부터는 사업체 POI정보를 볼 수 없습니다.<br>" +
			    			 "유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
			    			 btns = [
								{
								    title : "그만보기",
								    fAgm : null,
								    disable : false,
								    func : function(opt) {
								    	poiControl.clearPOI();
								    }
								 },
								 
			    			     {
								   title : "유지하기",
								   fAgm : null,
								   disable : false,
								   func : function(opt) {}
			    			     }   
			    			 ]
			    	);
				}else if (map.zoom > 9 && poiControl.isOpenPOI && !poiControl.isShow) {
					poiControl.isShow = true;
				}
				
				//공공데이터 POI  없애기
				var publicDataBoard = $publicDataBoard.ui.mapData[map.id];
				
				//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
				if (publicDataBoard.type != "cctv") {
					if (map.zoom < 9 && publicDataBoard.options.map != null && $publicDataBoard.ui.isShow) {
						$publicDataBoard.ui.isShow = false;
						messageConfirm.open(
				    			 "알림", 
				    			 "해당 레벨부터는 공공데이터 POI정보를 볼 수 없습니다.<br>" +
				    			 "유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
				    			 btns = [
									{
									    title : "그만보기",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
									    	$publicDataBoard.ui.remove(map.id);
									    }
									 },
									 
				    			     {
									   title : "유지하기",
									   fAgm : null,
									   disable : false,
									   func : function(opt) {}
				    			     }   
				    			 ]
				    	);
					}else if (map.zoom > 9 && 
							  publicDataBoard.options.map != null && 
							  !$publicDataBoard.ui.isShow) {
						$publicDataBoard.ui.isShow = true;
					}
				}
				
			},
			
			
			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
				if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우
					//그리드는 드랍 이벤트 없음
				} else {
					console.log("[interactiveMap.js] didMapDropEnd 호출");
					console.log("[interactiveMap.js] source.prop(\"id\") [" + source.prop("id") );
					
					var api_id = "";
					var index = null;
	
					// share정보 초기화
					$interactiveMap.noReverseGeoCode = false;
					$interactiveMap.ui.curMapId = map.id;
					$interactiveMapApi.request.combineFailCnt = 0;
					
					//공유 (나의 데이터에서는 shareInfo가 null)
					var shareInfo = new share.shareInfo(map, $interactiveMap.ui); //share.shareInfo()는 bookmarkAndShareInfo.js에 있는듯 하다.
					map.shareInfo = shareInfo;
					map.shareInfo.shareUrlInfo = [];
					map.dropInfo = null;
					
					if ($interactiveMap.ui.curDropParams == undefined) {
						$interactiveMap.ui.curDropParams = [];
					}
					
					var id = $("#" + source.prop("id")).find("a").attr("id");
					var atdrcYn = $("#" + source.prop("id")).find(".atdrc_yn").html();
					var tmpParamList = deepCopy($interactiveLeftMenu.ui.arParamList);
					
					console.log("[interactiveMap.js] didMapDropEnd() id [" + id );
					console.log("[interactiveMap.js] didMapDropEnd() atdrcYn [" + atdrcYn );
					
					//경계고정을 하였을 경우,
					//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
					if (map.isFixedBound) {
						map.setBoundSelectedMoode("multi");
						if (map.selectedBoundList.length == 0) {
							map.setBoundSelectedLayer();
						}
					}
					
					//kosis
					if (id.split("-")[0] == "kosis") {
						map.curAdmCd = data.adm_cd;
						var tempAdmCd = data.adm_cd;
						if (tempAdmCd == "00") {
							tempAdmCd = "1";
						}
						var admCdLen = tempAdmCd.length;
						interactiveMapKosis.map = map;
						index = id.split("-")[1];
	
						var selParams = [];
						for (var i = 0; i < tmpParamList.length; i++) {
							if (tmpParamList[i].idx == index) {
								interactiveMapKosis.curSelectedTitle = tmpParamList[i].title;
								selParams.push(tmpParamList[i].params);
								break;
							}
						}
						
						//kosis 년도정도 설정
						var kosisYear = null;
						for (var k=0; k<selParams[0].length; k++) {
							if (selParams[0][k].key == "kosis_data_year") {
								kosisYear = selParams[0][k].value;
								if (kosisYear.length > 4) {
									kosisYear = kosisYear.substring(0,4);
								}
								break;
							}
						}
						if (kosisYear != null) {
							$interactiveMap.ui.curDropParams[map.id] = {
									param : [{
										key : "year",
										value : kosisYear
									}]
							};
						}
						
						$interactiveMap.ui.setDataType(map.id, "kosis");
						$interactiveMap.ui.dropBtnInfo[map.id] = tmpParamList[i];
						$interactiveMap.ui.dropBtnInfo[map.id]["isKosis"] = true;
						interactiveMapKosis.reqSetKosisParam(selParams, tempAdmCd, atdrcYn, map);
						$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
						return;
						
					} else {
						//코시스에서 조회된 세부항목설정창을 닫는다.
						$("#kosisArea").hide();
						
						//전국단위에서 경계레벨 0과 2로 조회할 경우
						//데이터를 조회하지 않는다.
						if (map.boundLevel == "2") {
							if (data.adm_cd == "00") {
								map.clearDataOverlay();
								messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
								return;
							}
						}
						
						map.bnd_year = bndYear;
						$interactiveMap.ui.setDataType(map.id, "census");
						$interactiveMap.ui.searchBtnType = "normal";
						api_id = id.split("-")[0];
						index = id.split("-")[1];
						$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
		
						var tmpParam = null;
						for (var i = 0; i < tmpParamList.length; i++) {
							if (tmpParamList[i].idx == index) {
								tmpParam = tmpParamList[i];
								$interactiveMap.ui.dropBtnInfo[map.id] = tmpParamList[i];
								break;
							}
						}
					}
					
					// 다중선택일 경우
					if (map.selectedBoundMode == "multi") {
						map.multiLayerControl.clear();
						if (map.selectedBoundList.length > 0) {
							var admList = null;
							if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
								for (var i=0; i<map.selectedBoundList.length; i++) {
									var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
									var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
									if (admList == null) admList = [];
									admList.push(adm_cd.substring(0,7));
								}
								if (admList.length > 0) {
									//데이터 중복제거
									var tmpData = [];
									$.each(admList, function(k, el){
										if($.inArray(el, tmpData) === -1) tmpData.push(el);
									});
									admList = tmpData;
							
									for (var i=0; i<admList.length; i++) {
										if (tmpParam != null) {
											//map.selectedBoundList = admList;
											var params = $interactiveMap.ui.reqSetParams(tmpParam, admList[i], adm_nm, api_id, map, "gibgae");
											$interactiveMap.ui.curDropParams[map.id] = params;
											$interactiveMap.ui.requestOpenApi(params);
										}
									}
								}
								
							}else {
								for (var i = 0; i < map.selectedBoundList.length; i++) {
									var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
									var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
				
									if (tmpParam != null) {
										var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
										$interactiveMap.ui.curDropParams[map.id] = params;
										$interactiveMap.ui.requestOpenApi(params);
									}
								}
							}
						}
						/*for (var i = 0; i < map.selectedBoundList.length; i++) {
							var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
							var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
		
							if (tmpParam != null) {
								var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
								$interactiveMap.ui.curDropParams[map.id] = params;
								$interactiveMap.ui.requestOpenApi(params);
							}
						}*/
					} else {
						if (tmpParam != null) {
							var params = $interactiveMap.ui.reqSetParams(tmpParam, data.adm_cd, data.adm_nm, api_id, map);
	
							//시계열 초기값 세팅
							$interactiveDataBoard.ui.timeSeriesInit(params);
							$interactiveMap.ui.curDropParams[map.id] = params;
							$interactiveMap.ui.requestOpenApi(params);
						}
						map.setBoundSelectedMoode(null);
						//map.mapBtnInfo.setFixedBoundBtn(false);
					}
				}
			},
			
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
				
				console.log("[interactiveMap.js] didMapDoubleClick 호출");
				console.log("[interactiveMap.js] didMapDoubleClick btn_id[" + btn_id);
				console.log("[interactiveMap.js] didMapDoubleClick tmpParam[" + tmpParam);
				
				var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];				
				var index = null;
				var adm_cd = "";
				var adm_name= "";
				var api_id = "";
				
				console.log("[interactiveMap.js] didMapDoubleClick() $interactiveMap.ui.dropBtnInfo[map.id] [" + $interactiveMap.ui.dropBtnInfo[map.id]);
								
				// share정보 초기화
				$interactiveMap.noReverseGeoCode = false;
				$interactiveMap.ui.curMapId = map.id;
				$interactiveMapApi.request.combineFailCnt = 0;
				
				//공유 (나의 데이터에서는 shareInfo가 null)
				var shareInfo = new share.shareInfo(map, $interactiveMap.ui);
				map.shareInfo = shareInfo;
				map.shareInfo.shareUrlInfo = [];
				map.dropInfo = null;
				
				//경계고정을 하였을 경우,
				//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
				if (map.isFixedBound) {
					map.setBoundSelectedMoode("multi");
					if (map.selectedBoundList.length == 0) {
						map.setBoundSelectedLayer();
					}
				}
				
				var id = btn_id;
				var atdrcYn = $("#"+id).find(".atdrc_yn").html();
				
				console.log("[interactiveMap.js] didMapDoubleClick() btn_id[" + btn_id);
				console.log("[interactiveMap.js] didMapDoubleClick() atdrcYn[" + atdrcYn);
				console.log("[interactiveMap.js] didMapDoubleClick() map.selectedBoundMode[" + map.selectedBoundMode);

				// kosis
				if (id.split("-")[0] == "kosis") {
					var tempAdmCd = "";
					var tempAdmNm = "";
					
					var center = map.gMap.getCenter();
					map.gMap.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint(center);  
			                    if (layer._containsPoint(point)){
			                    	tempAdmCd = layer.feature.properties.adm_cd;
			                    	tempAdmNm = layer.feature.properties.adm_nm;
			                    }
						 }
					});
					
					if (tempAdmCd.length == 0 && !map.isInnerMapShow2) { //mng_s
						messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
						return;
					}
					if (!map.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 읍면동으로 내려가면 8 자리인데 7자리로 자르면 않됨
						if (tempAdmCd.length > 7) {
							tempAdmCd = tempAdmCd.substring(0,7);
						}
					}
					
					if (tempAdmCd == "00") {
						tempAdmCd = "1";
					}
					var admCdLen = tempAdmCd.length;
					interactiveMapKosis.map = map;
					index = id.split("-")[1];

					var selParams = [];
					selParams.push(tmpParam.params);
					
					//kosis 년도정도 설정
					var kosisYear = null;
					for (var k=0; k<selParams[0].length; k++) {
						if (selParams[0][k].key == "kosis_data_year") {
							kosisYear = selParams[0][k].value;
							if (kosisYear.length > 4) {
								kosisYear = kosisYear.substring(0,4);
							}
							break;
						}
					}
					if (kosisYear != null) {
						$interactiveMap.ui.curDropParams[map.id] = {
								param : [{
									key : "year",
									value : kosisYear
								}]
						};
					}
					
					$interactiveMap.ui.setDataType(map.id, "kosis");
					interactiveMapKosis.reqSetKosisParam(selParams, tempAdmCd, atdrcYn, map);
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					return;
				} else {
					
					//코시스에서 조회된 세부항목설정창을 닫는다.
					$("#kosisArea").hide();
					
					map.bnd_year = map.bnd_year;
					$interactiveMap.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];
	
					// 버튼 시각 효과
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					$interactiveMap.ui.dropBtnInfo[map.id] = tmpParam;
					$interactiveMap.ui.setDataType(map.id, "census");
				}
				
				if (map.selectedBoundMode == "multi") {
					map.multiLayerControl.clear();
					
					if (map.selectedBoundList.length > 0) {
						var admList = null;
						if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
							for (var i=0; i<map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel == "2") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
								
								if (admList == null) admList = [];
								admList.push(adm_cd.substring(0,7));
							}
							if (admList.length > 0) {
								//데이터 중복제거
								var tmpData = [];
								$.each(admList, function(k, el){
									if($.inArray(el, tmpData) === -1) tmpData.push(el);
								});
								admList = tmpData;
						
								for (var i=0; i<admList.length; i++) {
									if (tmpParam != null) {
										//map.selectedBoundList = admList;
										var params = $interactiveMap.ui.reqSetParams(tmpParam, admList[i], adm_nm, api_id, map, "gibgae");
										$interactiveMap.ui.curDropParams[map.id] = params;
										$interactiveMap.ui.requestOpenApi(params);
									}
								}
							}
							
						}else {
							for (var i = 0; i < map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel == "2") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
			
								if (tmpParam != null) {
									var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
									$interactiveMap.ui.curDropParams[map.id] = params;
									$interactiveMap.ui.requestOpenApi(params);
								}
							}
						}
					}
					
					
					/*for (var i=0; i<map.selectedBoundList.length; i++) {
						var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
						var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
						
						//전국단위에서 경계레벨 0과 2로 조회할 경우
						//데이터를 조회하지 않는다.
						if (map.boundLevel != "1") {
							if (adm_cd == "00") {
								map.clearDataOverlay();
								messageAlert.open("알림", "경계레벨 0과 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
								map.setBoundSelectedMoode(null);
								map.mapBtnInfo.setFixedBoundBtn(false);
								return;
							}
						}

						if (tmpParam != null) {		
							var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
							$interactiveMap.ui.curDropParams[map.id] = params;
							$interactiveMap.ui.requestOpenApi(params);
						}
					}*/
				}else {
					var center = map.gMap.getCenter();
					map.gMap.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint(center);  
			                    if (layer._containsPoint(point)){
			                    	adm_cd = layer.feature.properties.adm_cd;
			                    	adm_nm = layer.feature.properties.adm_nm;
			                    }
						 }
					});
					
					if (adm_cd.length == 0 && !map.isInnerMapShow2) { //mng_s
						messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
						return;
					}
					
					//전국단위에서 경계레벨 0과 2로 조회할 경우
					//데이터를 조회하지 않는다.
					if (map.boundLevel == "2") {
						if (adm_cd == "00") {
							map.clearDataOverlay();
							messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
							return;
						}
					}

					if (tmpParam != null) {				
						var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
						
						//시계열 초기값 세팅
						$interactiveDataBoard.ui.timeSeriesInit(params);
						$interactiveMap.ui.curDropParams[map.id] = params;
						$interactiveMap.ui.requestOpenApi(params);
						
						if ( map.isInnerMapShow2 ) {
							$interactiveMap.ui.requestGridLegend(params); //mng_s 그리드 범례요청
						}
					}
					map.setBoundSelectedMoode(null);
					map.mapBtnInfo.setFixedBoundBtn(false);
				}
				
				//mng_s
				if ( map.isInnerMapShow2 ) {
					//mng_s 20180104 주용민 투명도
					$(".btn_legendSetting").show(); 
					$(".lgListBox li").hide();
					$(".lgListBox li:last").show();
					$(".opacityLayer").css("left","450px");
					//mng_e
					//$("#legendColor_"+map.legend.id+ " li>a").eq(0).click(); //mng_s 그리드 범례요청
					$("#grid_title_1").show();
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
				}
				
				
				//mng_s 20180208 bnd_grid 행정구역그리드와 전체화면 그리드의 경우 grid_level이 다를 수 있으므로 주의요망
				if ( map.isInnerMapShow3 ) {
					//mng_s 20180104 주용민 투명도
					$(".btn_legendSetting").show(); 
					$(".lgListBox li").hide();
					$(".lgListBox li:last").show();
					$(".opacityLayer").css("left","450px");
					//mng_e
					//$("#legendColor_"+map.legend.id+ " li>a").eq(0).click(); //mng_s 그리드 범례요청
					$("#grid_title_1").show();
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
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
				//2017.07.25 [개발팀] 공공데이터 관련 - 툴팁 pass
				if (data.tooltip != undefined && !data.tooltip) {
					return;
				}
				if (type != "polygon") {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						if (type == "data") {
								$interactiveDataBoard.ui.selectChartData(data.properties, data.dataIdx, map.id);
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$interactiveMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else if( map.isInnerMapShow3!=undefined && map.isInnerMapShow3 ) { //mng_s 그리드일 경우 
						if (type == "data") {
								$interactiveDataBoard.ui.selectChartData(data.properties, data.dataIdx, map.id);
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$interactiveMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else {
						if (type == "data") {
	//						if (data.info.length > 0) {
								$interactiveDataBoard.ui.selectChartData(data.properties, data.dataIdx, map.id);
								map.legend.selectLegendRangeData(event.target.options.fillColor);
	//						}
						}
						$interactiveMap.ui.createInfoTooltip(event, data, type, map);
					}
				}else {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						$interactiveMap.ui.createInfoTooltip(event, data, type, map);
					} else {
						$interactiveMap.ui.createInfoTooltip(event, data, type, map);
					}
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
					if ($interactiveMap.ui.buildPopup != null) {
						$interactiveMap.ui.buildPopup.close();
					}
					
					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
							   $("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$interactiveMap.ui.buildPopup = 
						window.open(
							"/view/indoor/indoorMap?sufid=" + data.properties.sufid, 
							"건물상세정보",
							"top="+top+", left="+left+", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);
					
				}
				
				//다중경계선택
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					var layer = event.target;
					var boundList = map.selectedBoundList;
					var tmpBoundList = [];
					var isEqualLayer = false;
					
					for (var i=0; i<boundList.length; i++) {
						if (boundList[i].feature.properties.adm_cd == layer.feature.properties.adm_cd) {
							map.clearLayerStyle(layer);
							isEqualLayer = true;
						}else {
							tmpBoundList.push(boundList[i]);
						}
					}
					map.selectedBoundList = tmpBoundList;
					
					if (isEqualLayer) {
						return;
					}
					
					//2017.01.06 요청에의해 설정제거 
					/*if (boundList.length >= 3) {
						messageAlert.open("알림", "다중경계는 최대 3개까지 선택가능합니다.");
						return;
					}*/
					
					if (layer.options.origin == undefined) {
						layer.options["origin"] = {
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor	
						};
					}					
					
					layer.setStyle({
						weight : 3,
						color : "white",
						dashArray : layer.options.dashArray,
						fillOpacity : 0.7,
						fillColor : "#F06292"
					});
					map.selectedBoundList.push(layer);
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
				
				//다각형 및 사각형일때, 특정 영역을 넘어서면 알림 메시지 호출
				if (type == "polygon" || type == "rectangle") {
					var shapeArea = layer._getArea();
					if (shapeArea > 113000000) {
						messageAlert.open('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
						layer._shapeGroup.removeLayer(layer._shape);
						layer._shape = null;
						layer._map.dragging.enable();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
						return;
					}
				}
				
				if(type == "polygon") {
					area = "POLYGON((";
					for(var i = 0; i < layer.getUTMKs()[0].length; i++) {
						area += layer.getUTMKs()[0][i].x + " " + 
								 layer.getUTMKs()[0][i].y + ",";
						
						if(i == layer.getUTMKs()[0].length - 1) {
							area += layer.getUTMKs()[0][0].x + " " + 
							         layer.getUTMKs()[0][0].y;
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
								layer._utmks[0][0].x + " " + 
								layer._utmks[0][0].y + "," + 
								layer._utmks[0][2].x + " " +
								layer._utmks[0][2].y + 
							")";
				}
				
				if (map.curPolygonCode == 5) {
					map.setZoom(9);
					map.curPolygonCode = 5;
				}
				map.selectedBoundMode = "multi";
				map.selectedBoundList = [];
				
				//전국
				if (map.curPolygonCode == "1") {
					if (map.geojson) {
						map.geojson.remove();
					}
					if (map.dataGeojson) {
						map.dataGeojson.remove();
					}
					map.multiLayerControl.clear();
					map.openApiBoundaryContry(function(map, res) {
						map.addPolygonGeoJson(res, "polygon");
						if (map.geojson) {
							map.geojson.eachLayer(function(layer) {
								layer.setStyle({
									weight : 3,
									color : "white",
									dashArray : layer.options.dashArray,
									fillOpacity : 0.7,
									fillColor : "#F06292"
								});
								map.selectedBoundList.push(layer);
							});
						}
						event.shapeGroup.thisShapeRemove();
					});
				}else {
					$interactiveMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);	
				}
				
			},
			
			/**
			 * 
			 * @name         : didFinishedMultidata
			 * @description  : 사용자경계(multi layer data) 조회 후, 콜백
			 * @date         : 2016. 02. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param dataList 표출된 데이터리스트
			 * @param admCdList 행정동코드리스트
			 * @param @param map   델리케이트
			 */
			didFinishedMultidata : function(dataList, admCdList, map) {
				var admNameList = [];
				for (var i=0; i<dataList.length; i++) {
					var layer = dataList[i].layer;
					admNameList.push(layer.features[0].properties.adm_nm);
				}
				var options = {
						params : {
							adm_cd : admCdList.join(","),
							adm_nm : admNameList.join(","),
							title : "사용자영역 통계",
							map : map
						}
				};
				
				//나의 데이터일 경우 데이터보드를 실행하지 않고 멈춘다.
				if($interactiveLeftMenu.ui.curSelectedStatsType == "userData") {
					return;
				}
				
				$interactiveDataBoard.ui.updateDataBoardMulti(dataList, options);
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
			setUIEvent : function() {
				
				console.log("[interactiveMap.js] setUIEvent() 호출");
				
				Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
				//Kakao.init('8e948243dde3004186d166fcb43ff5ea');
				
				$("#openShare").click(function() {
					
				});
				
				var isClose = false;
				$(".tb_close").click(function(){ 
					isClose = true;
					$(this).hide(); 
					$(".resizeIcon").hide();
					$(".interactiveView").each(function(i){
						$(this).text("VIEW"+parseInt(i+1));
					});
					
					var sceneInx = $(".sceneBox.on").length;
					if (sceneInx == 1) {
						$(".tb_combine").parent().hide();
						$(".viewTitle > span").hide();
					}else if (sceneInx == 2) {
						var tmpView = [];
						var isSameView = false;
						$(".sceneBox.on").each(function() {
							var id = parseInt($(this).attr("id").split("view")[1])-1;
							tmpView.push(id);
							if (id == $interactiveMap.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$interactiveMap.ui.curMapId = tmpView[0];
							}else {
								$interactiveMap.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($interactiveMap.ui.curMapId + 1);
							switch($interactiveMap.ui.curMapId) {
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
				
/*				$(".tb_mapAdd").click(function(){ 
					$(".interactiveDataBoard").hide();
					$(".interactiveView").css("display","inline-block");
					$(".tb_close").show();
					$(".interactiveView").each(function(i){
						$(this).text("VIEW"+parseInt(i+1));
					}); 
					
					var sceneInx = $(".sceneBox.on").length;
					if (sceneInx > 1) {
						$(".tb_combine").parent().show();
						$(".viewTitle > span").show();
					}else {
						$(".viewTitle > span").hide();
					}
					
			    });*/
				
				$(".sceneBox").click(function(){
					var sceneInx = $(".sceneBox.on").length; 
					var id = $(this).attr("id");
					if (sceneInx > 1) {
						if (!isClose) {
							$(".sceneBox").find(".toolBar").css("background", "#ffffff");
						}
						if (id == "view1") {
							$interactiveMap.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$interactiveMap.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$interactiveMap.ui.curMapId = 2;
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
					
					var curMapId = $interactiveMap.ui.curMapId;
					var dataType = $interactiveMap.ui.dataTypeList[curMapId];		//census, kosis, publicData, userData
					
					$mydataDataBoard.ui.delegateSetting($interactiveMap.ui);			//나의데이터 세팅
					$publicDataBoard.ui.delegateSetting($interactiveMap.ui);			//공공데이터 세팅

					//다른 분할맵을 선택할 경우
					if(curMapId != $interactiveDataBoard.ui.map_id) {
						if(dataType == "census" || dataType == "kosis") {
							//현재 선택된 맵으로 데이터보드 다시 그리기
							$interactiveDataBoard.ui.reDraw(curMapId, dataType);
						} else if(dataType == "userData") {
							//현재 선택된 맵으로 데이터보드 다시 그리기
							$mydataDataBoard.ui.reDraw(curMapId);
						} else if(dataType == "publicData") {
							//현재 선택된 맵으로 데이터보드 다시 그리기
							$publicDataBoard.ui.reDraw(curMapId);
						} else {
							//조회된 데이터가 없으면 데이터보드 삭제
							$interactiveDataBoard.ui.reset(curMapId);
						}
					}
					$interactiveDataBoard.ui.map_id = curMapId;		//현재 선택된 맵 아이디 저장
					
					//Left Menu 통계표출 연동
					$interactiveLeftMenu.ui.showNumberSetting();
			    });
				
				//사업체전개도 토글버튼
				$(".tb_radio .fl").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_radio .fr").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });
				
				//mng_s
				//그리드 토글버튼
				$(".grid_radio .fl").click(function(){ 
					$(".grid_radio").css("background","url(/img/bg/bg_gridradio_on.png)");
					
					$interactiveLeftMenu.ui.isInnerMapShow2 = false;
					
					//좌측메뉴 보이기
					$("#gridHideLeftBtn01").show();
					$("#gridHideLeftBtn02").show();
					$("#gridHideLeftBtn03").show();	
			    });
				$(".grid_radio .fr").click(function(){
					$(".grid_radio").css("background","url(/img/bg/bg_gridradio_off.png)");
					
					$interactiveLeftMenu.ui.isInnerMapShow2 = true;
					sop.isInnerMapShow2 = true;
					
					$interactiveMap.ui.doClearMap(1); //지도 초기화
					
					//좌측메뉴 숨기기
					$("#gridHideLeftBtn01").hide();
					$("#gridHideLeftBtn02").hide();
					$("#gridHideLeftBtn03").hide();
					$("#gridHideCombineBtn").hide(); //인구주택총조사의 결합조건 탭 하이드
					$("#gridHideShowNumberBtn").hide(); //통계표출 하이드
					
					$("#helper_1").hide(); //왼쪽 통계메뉴 버튼을 클릭하여... 하이드
					$("#title_1").html("");//다른 부분에서 조회된 좌측 상단의 타이틀 초기화
					$("#manual_icon_1").hide(); //이용법 하이드
					
					//총조사 주요지표의 2depths의 메뉴 숨기기
					$("#li_mainIndex_radio02").hide();
					$("#li_mainIndex_radio03").hide();
					$("#li_mainIndex_radio04").hide();
					$("#li_mainIndex_radio05").hide();
					$("#li_mainIndex_radio06").hide();
					$("#li_mainIndex_radio08").hide();
					
					$("#li_mainIndex_radio10").hide();
					$("#li_mainIndex_radio11").hide();
					$("#li_mainIndex_radio12").hide();
					$("#li_mainIndex_radio13").hide();
					$("#li_mainIndex_radio14").hide();
					$("#li_mainIndex_radio15").hide();
					$("#li_mainIndex_radio16").hide();
					$("#li_mainIndex_radio17").hide();
					
					//인구주택총조사 인구조건의 2010년도 이하의 메뉴 숨기기 ==> 2010년 이하로 콤보박스
					//변경시 쇼/하이드가 되므로 interactiveLeftMenu.js에서 처리함.
					//메뉴가 이미 보인 상태에서도 동작해야 하므로 여기서도 하이드 해야함.
					$("#populationEduTab").hide();
					$("#populationMarryTab").hide();
					$("#householdOcptnTab").hide();
					
					$("#houseTypeTabSpan").hide();//주택조건의 주택유형(다중선택을 단일선택으로)
					$("#houseTypeTabGrid").show();//주택조건의 주택유형(다중선택을 단일선택으로)
					
					$("#gridCompanyThemaHide").hide();//전국사업체조사의 테마업종탭 하이드
					$("#gridCompanyKsscHide").hide();//전국사업체조사의 표준산업분류목록 버튼 하이드
					$("#companyClassListDiv").hide();//전국사업체조사의 3depth의 표준산업분류목록 하이드
					
					//데이터보드쪽 하이드
					$(".dataBoardArea").hide();
					$("#dataBoardStatsSum").hide();
					$("#viewCurrentRegionData_dt_area").hide();
					$("#viewCurrentRegionData_dd_area").hide();
					$(".btn_clockTypeSetting").hide(); //시계열 설정버튼
					//$(".btn_clockTypeSetting").show();
					$(".btn_clockTypePlay").hide(); //시계열 플레이버튼 하이드
					
					$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
					
					console.log("[interactiveMap.js] $interactiveLeftMenu.ui.searchbtnCnt [" + $interactiveLeftMenu.ui.searchbtnCnt);
					//그리드로 넘어오기전 생성된 버튼을 제거한다. 그리드에서 서비스 하지 않는 버튼이 있기 때문에
					if($interactiveLeftMenu.ui.searchbtnCnt!=undefined && $interactiveLeftMenu.ui.searchbtnCnt>0) {
						for(i=0; i<$interactiveLeftMenu.ui.searchbtnCnt; i++) {
							$interactiveLeftMenu.ui.deleteSearchBtn(i);
						}
					}
					
					//지도레벨과 격자레벨 보여주기 여기에 하나있고, 조회전 줌didMapZoomEnd, 3000줄 정도에 하나가 더 있다. 수정시 3군데 다 해주어야한다.
					$("#grid_title_1").show();
					var grid_level = "";
					var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
					
					$("#grid_lg_color_0").attr("style","background :rgb(137,14,79)");//pink
					$("#grid_lg_color_1").attr("style","background :rgb(255,111,0)");//amber
					$("#grid_lg_color_2").attr("style","background :rgb(27,94,32)");//green
					$("#grid_lg_color_3").attr("style","background :rgb(1,87,155)");//light blue
					$("#grid_lg_color_4").attr("style","background :rgb(26,35,126)");//indigo
					$("#grid_lg_color_5").attr("style","background :rgb(74,20,140)");//purple
					
					
			    });
				
				
				//============================================================================================================
				//mng_s 행정구역 그리드 20180208
				//행정구역 그리드 토글버튼
				$(".bnd_grid_radio .fl").click(function(){ 
					$(".bnd_grid_radio").css("background","url(/img/bg/bg_bnd_gridradio_on.png)");
					
					$interactiveLeftMenu.ui.isInnerMapShow3 = false;
					
					//좌측메뉴 보이기
					$("#gridHideLeftBtn01").show();
					$("#gridHideLeftBtn02").show();
					$("#gridHideLeftBtn03").show();	
			    });
				$(".bnd_grid_radio .fr").click(function(){
					$(".bnd_grid_radio").css("background","url(/img/bg/bg_bnd_gridradio_off.png)");
					
					$interactiveLeftMenu.ui.isInnerMapShow3 = true;
					sop.isInnerMapShow3 = true;
					
					$interactiveMap.ui.doClearMap(1); //지도 초기화
					
					//좌측메뉴 숨기기
					$("#gridHideLeftBtn01").hide();
					$("#gridHideLeftBtn02").hide();
					$("#gridHideLeftBtn03").hide();
					$("#gridHideCombineBtn").hide(); //인구주택총조사의 결합조건 탭 하이드
					$("#gridHideShowNumberBtn").hide(); //통계표출 하이드
					
					$("#helper_1").hide(); //왼쪽 통계메뉴 버튼을 클릭하여... 하이드
					$("#title_1").html("");//다른 부분에서 조회된 좌측 상단의 타이틀 초기화
					$("#manual_icon_1").hide(); //이용법 하이드
					
					//총조사 주요지표의 2depths의 메뉴 숨기기
					$("#li_mainIndex_radio02").hide();
					$("#li_mainIndex_radio03").hide();
					$("#li_mainIndex_radio04").hide();
					$("#li_mainIndex_radio05").hide();
					$("#li_mainIndex_radio06").hide();
					$("#li_mainIndex_radio08").hide();
					
					$("#li_mainIndex_radio10").hide();
					$("#li_mainIndex_radio11").hide();
					$("#li_mainIndex_radio12").hide();
					$("#li_mainIndex_radio13").hide();
					$("#li_mainIndex_radio14").hide();
					$("#li_mainIndex_radio15").hide();
					$("#li_mainIndex_radio16").hide();
					$("#li_mainIndex_radio17").hide();
					
					//인구주택총조사 인구조건의 2010년도 이하의 메뉴 숨기기 ==> 2010년 이하로 콤보박스
					//변경시 쇼/하이드가 되므로 interactiveLeftMenu.js에서 처리함.
					//메뉴가 이미 보인 상태에서도 동작해야 하므로 여기서도 하이드 해야함.
					$("#populationEduTab").hide();
					$("#populationMarryTab").hide();
					$("#householdOcptnTab").hide();
					
					$("#houseTypeTabSpan").hide();//주택조건의 주택유형(다중선택을 단일선택으로)
					$("#houseTypeTabGrid").show();//주택조건의 주택유형(다중선택을 단일선택으로)
					
					$("#gridCompanyThemaHide").hide();//전국사업체조사의 테마업종탭 하이드
					$("#gridCompanyKsscHide").hide();//전국사업체조사의 표준산업분류목록 버튼 하이드
					$("#companyClassListDiv").hide();//전국사업체조사의 3depth의 표준산업분류목록 하이드
					
					//데이터보드쪽 하이드
					$(".dataBoardArea").hide();
					$("#dataBoardStatsSum").hide();
					
					//$("#viewCurrentRegionData_dt_area").hide();
					$("#viewCurrentRegionData_dt_area").show();
					
					//$("#viewCurrentRegionData_dd_area").hide();
					$("#viewCurrentRegionData_dd_area").show();
					
					$(".btn_excelDownload").hide(); //엑셀다운로드 하이드
					
					$(".btn_clockTypeSetting").hide(); //시계열 설정버튼
					//$(".btn_clockTypeSetting").show();
					$(".btn_clockTypePlay").hide(); //시계열 플레이버튼 하이드
					
					$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
					
					console.log("[interactiveMap.js] bnd_grid 행정구역 그리드 $interactiveLeftMenu.ui.searchbtnCnt [" + $interactiveLeftMenu.ui.searchbtnCnt);
					//그리드로 넘어오기전 생성된 버튼을 제거한다. 그리드에서 서비스 하지 않는 버튼이 있기 때문에
					if($interactiveLeftMenu.ui.searchbtnCnt!=undefined && $interactiveLeftMenu.ui.searchbtnCnt>0) {
						for(i=0; i<$interactiveLeftMenu.ui.searchbtnCnt; i++) {
							$interactiveLeftMenu.ui.deleteSearchBtn(i);
						}
					}
					
					//지도레벨과 격자레벨 보여주기 여기에 하나있고, 조회전 줌didMapZoomEnd, 3000줄 정도에 하나가 더 있다. 수정시 3군데 다 해주어야한다.
					$("#grid_title_1").show();
					var grid_level = "";
					var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
					
					// 행정구역 그리드의 경우 이 부분은 나중에 수정해주어야 함. 아직 수정 않함. 20180208
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
					
					$("#grid_lg_color_0").attr("style","background :rgb(137,14,79)");//pink
					$("#grid_lg_color_1").attr("style","background :rgb(255,111,0)");//amber
					$("#grid_lg_color_2").attr("style","background :rgb(27,94,32)");//green
					$("#grid_lg_color_3").attr("style","background :rgb(1,87,155)");//light blue
					$("#grid_lg_color_4").attr("style","background :rgb(26,35,126)");//indigo
					$("#grid_lg_color_5").attr("style","background :rgb(74,20,140)");//purple
					
					
			    });	
				//mng_e 행정구역 그리드 20180208
				
				
				
				//투명도 설정 바
				$("#dataSlider_item").slider({
			    	range: "min",
			        min: 0.2,
			        max: 1,
			        value: 1,
			        step : 0.2,
			        slide: function( event, ui ) {  //ui.value
			        	$(".sqListBox.sq03").css("background-color", "rgba(255,255,255,"+ui.value+")");
				    }
			    });
			}
	};
	
}(window, document));