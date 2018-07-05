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
	W.$thematicMapFrame07 = W.$thematicMapFrame07 || {};

	$(document).ready(function() {

		console.log("test");
		$thematicMapFrame07.params = getAllParameter();
		$thematicMapFrame07.ui.createMap("mapRgn_1", 0);
		$thematicMapFrame07.event.setUIEvent();
		var mapNavi1 = new mapNavigation.UI();
		mapNavi1.create("mapNavi_1", 1, $thematicMapFrame07.ui);	
		//메뉴에서 카타고리 정보 가져온다.
		$thematicMapFrame07.request.getCategory();	

		//leftBox 사이즈 height 줄인다.
		$('.sqListBox.sq03 .sqList').css("height","185px");		

		//범례에 타입설정을 숨긴다.
		$(".sideQuick sq03").hide();
		$(".lgListBox li:eq(0)").hide();
//		$(".sideQuick.sq03").click();
	});

	$thematicMapFrame07.ui = {
			namespace: "thematicMap",
			mapList : [],
			curMapId : 0,
			dataGeoJson : [],
			reportPopup : null,
			poiInfoArray : [],		// poi 정보 저장 배열
			paramInfo : null,
			
			doAnalysisShareInfo : function(data) {
				var map = this.mapList[0];
				if (data.type == "bookmark") {
					map.mapMove(data.center, data.zoom);
				}else {
					map.zoom = 8;
					map.openApiReverseGeoCode(map.center);
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

				map.createMap($thematicMapFrame07, id, {
					center : [ 989674, 1818313 ],
					zoom : 1, 
					measureControl : false,
					statisticTileLayer: true
				});

				map.id = seq;
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	

				//범례 호출 함수 
//				var legend = new sLegendInfo.legendInfo(map);			
//				legend.initialize($thematicMapFrame07.ui);
//				map.legend = legend;
//				legend.createLegend();
				//작업부분 끝

				var btnInfo = new interactiveMapBtnInfo.btnInfo(map);	
				map.mapBtnInfo = btnInfo;

				btnInfo.createUI({
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : true,
					bizZoomControl : true
				});	


				//공유
				var shareInfo = new share.shareInfo(map, $thematicMapFrame07.ui);
				map.shareInfo = shareInfo;
				$thematicMapFrame07.params["url"] = "/view/thematicMap/thematicMapMain";
				map.shareInfo.setThematicMapShareInfo($thematicMapFrame07.params, "07");
				
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				//갤러리 등록
				$galleryAdd.delegate = this;
							
				map.gMap.whenReady(function() {
					map.createHeatMap();	
				});
				
				if (window.parent.$thematicMapMain) {
					$thematicMapFrame07.ui.doAnalysisShareInfo(window.parent.$thematicMapMain.param);
				}else {
					$thematicMapFrame07.request.getStatsThemeMapList($thematicMapFrame07.params.id);
				}

			},

			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				var map = this.mapList[this.curMapId];
				var mapType = "thematicMap";
				var divId = "#mapRgn_" + (map.id + 1);

				var title, adm_nm, origin, companyObj, subTitle;
				var chart = null;
				var legend = null;
				var param = {};
				var selectOption = $("#selectValue").val(); // 통계 선택 (수/율)
//				var base_year = $("#select_base_year").val(); // 데이터 년도
				var menuType = {
						"publicData" : 0,	//공공데이터
						"kosis"      : 1,	//kosis
				};

				//2017.03.09 보고서 수정
				var dataList = {
						id : map.id, 
						divId : divId,
						geojson : map.dataGeojsonLayer, 
						data : map.dataForCombine,
						legend : null,
						param : {
							title : $(".helperText").find("span").html()
						},
						zoom : map.zoom,
						center : map.center,
						origin : "통계청, 2014년 전국사업체조사"

				};
				
				//2017.03.09 보고서 수정
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
	                    	var popup = $thematicMapFrame07.ui.reportPopup.$reportForm.ui;
	                    	popup.setData(deepCopy(dataList), options, $thematicMapFrame07.ui.poiInfoArray);
		 				}
		 			});
				},300);
				//==================================================================================================================================//
			},

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
//				if (map.dataGeojson == null && 
//						map.multiLayerControl.dataGeojson == null 
////						&& $publicDataBoard.ui.chartDataList[map.id] == null
//				) {
//					messageAlert.open("알림", "출력할 결과가 없습니다.");
//					return;
//				}
				$thematicMapFrame07.ui.reportPopup = 
					window.open("/js/thematicMap/report/07/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
			},


			/**
			 * 
			 * @name         : changeLeftRightValue
			 * @description  : 주제도 통계 선택을 변경한다. 
			 * @date         : 2015. 11. 13. 
			 * @author	     : 
			 * @history 	 :
			 */
			changeLeftRightValue : function() {
				var map1 = $thematicMapFrame07.ui.mapList[0];
				map1.selectStatsOption = true;
				map1.changeRegionBound();						
				map1.selectStatsOption = false;
			},		

			/**
			 * 
			 * @name         : changeDataMode
			 * @description  : 주제도 지도유형 변경한다. 
			 * @date         : 2015. 12. 3. 
			 * @author	     : 
			 * @history 	 :
			 */
			changeDataMode : function() {
				var map1 = $thematicMapFrame07.ui.mapList[0];				

				var tempData1 = this.dataGeoJson;

				if(tempData1 != undefined && tempData1.length && tempData1 != null > 0) {
					map1.multiLayerControl.dataGeojson = tempData1;
				}

				if($('#dataMode').val()=='bubble'){			
					$('#lgTypeList_'+map1.legend.id+' a:eq(2)').trigger("click");
				}else{
					$('#lgTypeList_'+map1.legend.id+' a:eq(1)').trigger("click");
				}
				map1.checkShowCaption();
			},	

			/**
			 * 
			 * @name         : changeDataMode2
			 * @description  : caption on/off 변경한다. 
			 * @date         : 2015. 12.22. 
			 * @author	     : 
			 * @history 	 :
			 */
			changeDataMode2 : function() {

				var map1 = $thematicMapFrame07.ui.mapList[0];				
				if($('#dataMode2').val()=='dataOff'){
					map1.legend.numberData = false;
					//map1.changeRegionBound();	
				}else{
					map1.legend.numberData = true;
					//map1.changeRegionBound();	
				}				
				map1.checkShowCaption();
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
				var html = "<table style='margin:10px;'>";
				var searchYear = "";

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
								var value = appendCommaToNumber(parseFloat(data.info[0]));
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
//								if (i == 0) {
//								if (tmpData.adm_nm !== undefined) {
//								html += "<tr><td class='admName'>"
//								+ tmpData.adm_nm 
//								+ "</td></tr>"
//								+ "<tr style='height:5px'></tr>";
//								}
//								}

								if(data.properties.adm_nm !== undefined){
									//데이터보드에 쓸 행정구역 이름을 map.js에 저장한다.
									map.adm_nm = data.properties.adm_nm;
									html += "<tr><td class='admName'>"
										+ data.properties.adm_nm 
										+ "</td></tr>"
										+ "<tr style='height:5px'></tr>";							
								}


								if (tmpData.showData != undefined && tmpData.showData.length > 0) {
									var filterName = "";
									// 선택된 adm_cd를 map.js에 저장한다.
									$thematicMapFrame07.ui.mapList[0].selectedAdmCd = tmpData.adm_cd;


									//tmpData.showData ( left_setp_value )


//									if (showName[tmpData.showData] != undefined) {
//									filterName = showName[tmpData.showData];
//									}

									if($("#selectValue").val()=="leftValue"){
										filterName = tmpData.left_sep_ttip_title;
									}else{
										filterName = tmpData.right_sep_ttip_title;
									}
									html += "<tr>";
//									if (filterName.length > 0) {
//									html += "<td class='statsData'>"+searchYear +" " + filterName+ "</td>"
//									+ "<td>&nbsp;:&nbsp;</td>";
//									} else {
//									html += "<td class='statsData'>"+searchYear +" </td>"
//									+ "<td>&nbsp;:&nbsp;</td>";
//									}
									if (filterName.length > 0) {
										html += "<td class='statsData'>"+tmpData.base_year+"년" +" " + filterName+ "</td>"
										+ "<td>&nbsp;:&nbsp;</td>";
									} else {
										html += "<td class='statsData'>"+tmpData.base_year+"년" +" </td>"
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
										value = appendCommaToNumber(parseFloat(tmpData[tmpData.showData]));
									}else {
										value = appendCommaToNumber(parseFloat(tmpData[tmpData.showData]));
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
						map.adm_nm = data.properties.adm_nm;
						html += "<tr><td class='admName'>"
							+ data.properties.adm_nm 
							+ "</td></tr>"
							+ "<tr style='height:5px'></tr>";	
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
			 * @date         : 2015. 10. 08. 
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
				if 	    (api_id == "API_0301") $thematicMapFrame07Api.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $thematicMapFrame07Api.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $thematicMapFrame07Api.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $thematicMapFrame07Api.request.openApiCompany(options);
				else if (api_id == "API_0305") $thematicMapFrame07Api.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $thematicMapFrame07Api.request.openApiHouse(options);
				else if (api_id == "API_0307") $thematicMapFrame07Api.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $thematicMapFrame07Api.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $thematicMapFrame07Api.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $thematicMapFrame07Api.request.openApiHouseHoldMember(options);

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
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2017. 01. 13. 
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
						var shareData = shareInfo.shareUrlInfo;
						var stat_sel, region_boundary, map_type, data_type;
						var title = $(".helperText > span").html();
						
						
						
						var params = {
								"stat_thema_map_id" : window.parent.$thematicMapMain.param.stat_thema_map_id,
								"theme" : window.parent.$thematicMapMain.param.theme,
								"mapType" : window.parent.$thematicMapMain.param.mapType,
								"center" : map.center,
								"zoom" : map.zoom,
								"iframe_url" : window.location.protocol+"//"+window.location.host+"/view/thematicMap/thematicMapFrame07"
							};
						
						
						for (var i=0; i<shareData.length; i++) {
							shareData[i].params.paramInfo = params;
							var captureTargetId = "#mapRgn_"+type;
							shareData[i].params["mapCaptureId"] = captureTargetId;
							
						}
						
						//갤러리 등록일 경우
						if (srvType != undefined && srvType != "THEME") {
							switch (srvType) {
								case "gallary":
									var captureTargetId = "#mapRgn_"+type;
									$galleryAdd.map = map;
									$galleryAdd.makeImageURL("THEME", captureTargetId);
									break;
								case "report":
									this.reportPopup.$reportFormEvent.UI.makeImageURL("THEME");
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
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 2017. 01. 15. 
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
					map.shareInfo.doBookMark($("#savesubj").val(), "THEME");
				}
				$("#"+type).hide();	
				$(".deem").hide();
			},
			
			/**
			 * 
			 * @name         : doCancel
			 * @description  : 경계정보 설정을 취소한다.
			 * @date         : 2017. 01. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doCancel : function(type) {
				$("#"+type).hide();	
				$(".deem").hide();
			}
	};

	// ==============================//
	// map event callback
	// ==============================//
	$thematicMapFrame07.callbackFunc = {

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
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				var poiControl = map.mapBtnInfo;
				if (map.zoom < 10 && map.isInnerMapShow) {
					$thematicMapFrame07.ui.doInnerMap(map.id+1);
				}

				//사업체 POI 없애기
				if (map.zoom < 10 && poiControl.isOpenPOI) {
					messageAlert.open("알림", "해당 레벨에서는 사업체 POI정보를 볼 수 없습니다.");
					poiControl.clearPOI();
				}
			},

			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
				// api_id?
				var api_id = "";
				// index?
				var index = null;

				// share정보 초기화


				$thematicMapFrame07.ui.curMapId = map.id;
				$thematicMapFrame07Api.request.combineFailCnt = 0;
				map.shareInfo.shareUrlInfo = [];
				map.dropInfo = null;

				//id?
				// prop() : javascirpt 프로퍼티를 취급
				var id = $("#" + source.prop("id")).find("a").attr("id"); 
				// tmpParamList?
				var tmpParamList = deepCopy($interactiveLeftMenu.ui.arParamList);

				//kosis
				if (id.split("-")[0] == "kosis") {
					var tempAdmCd = data.adm_cd;
					if (tempAdmCd == "00") {
						tempAdmCd = "1";
					}
					var admCdLen = tempAdmCd.length;
					interactiveMapKosis.map = map;
					index = id.split("-")[1];
//					$thematicMapFrame07.ui.changeBtnLineColor("kosis", tmpParamList,
//					index, map);

					var selParams = [];
					for (var i = 0; i < tmpParamList.length; i++) {
						if (tmpParamList[i].idx == index) {
							interactiveMapKosis.curSelectedTitle = tmpParamList[i].title;
							selParams.push(tmpParamList[i].params);
							break;
						}
					}
					interactiveMapKosis.reqSetKosisParam(selParams, tempAdmCd, map);
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					return;
				} else {
					map.bnd_year = map.bnd_year;
					$thematicMapFrame07.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);

					var tmpParam = null;
					for (var i = 0; i < tmpParamList.length; i++) {
						if (tmpParamList[i].idx == index) {
							tmpParam = tmpParamList[i];
							$thematicMapFrame07.ui.dropBtnInfo[map.id] = tmpParamList[i];
							break;
						}
					}
				}

				// 다중선택일 경우
				if (map.selectedBoundMode == "multi") {
					for (var i = 0; i < map.selectedBoundList.length; i++) {
						var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
						var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
						if (adm_cd.length > 7) {
							adm_cd = adm_cd.substring(0, 7);
						}
						$thematicMapFrame07.ui.curAdmCode = adm_cd;
						map.curAdmCd = adm_cd;

						if (tmpParam != null) {
							var params = $thematicMapFrame07.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
							$thematicMapFrame07.ui.curDropParams[map.id] = params;
							$thematicMapFrame07.ui.requestOpenApi(params);
						}
					}
				} else {
					if (data.adm_cd.length > 7) {
						data.adm_cd = data.adm_cd.substring(0, 7);
					}
					$thematicMapFrame07.ui.curAdmCode = data.adm_cd;
					map.curAdmCd = data.adm_cd;

					if (tmpParam != null) {
						var params = $thematicMapFrame07.ui.reqSetParams(tmpParam,data.adm_cd, data.adm_nm, api_id, map);
						console.log(params);
						//시계열 초기값 세팅
						$interactiveDataBoard.ui.timeSeriesInit(params);

						$thematicMapFrame07.ui.curDropParams[map.id] = params;
						$thematicMapFrame07.ui.requestOpenApi(params);
					}
					map.setBoundSelectedMoode(null);
					map.mapBtnInfo.setFixedBoundBtn(false);
				}
			},

			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
				var map = $thematicMapFrame07.ui.mapList[$thematicMapFrame07.ui.curMapId];				
				var index = null;
				var adm_cd = "";
				var adm_name= "";
				var api_id = "";

				// share정보 초기화
				$thematicMapFrame07.ui.curMapId = map.id;
				map.shareInfo.shareUrlInfo = [];
				map.dropInfo = null;

				$thematicMapFrame07Api.request.combineFailCnt = 0;
				var id = btn_id;

				// kosis
				if (id.split("-")[0] == "kosis") {
				} else {
					map.bnd_year = map.bnd_year;
					$thematicMapFrame07.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];

					// 버튼 시각 효과
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					$thematicMapFrame07.ui.dropBtnInfo[map.id] = tmpParam;
				}

				if (map.selectedBoundMode == "multi") {
					for (var i=0; i<map.selectedBoundList.length; i++) {
						var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
						var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
						if (adm_cd.length > 7) {
							adm_cd = adm_cd.substring(0,7);
						}

						$thematicMapFrame07.ui.curAdmCode = adm_cd;
						map.curAdmCd = adm_cd;

						if (tmpParam != null) {		
							var params = $thematicMapFrame07.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
							$thematicMapFrame07.ui.curDropParams[map.id] = params;
							$thematicMapFrame07.ui.requestOpenApi(params);
						}
					}
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

					if (adm_cd.length == 0) {
						messageAlert.open("알림", "조회할 경게정보가 없습니다.<br/>경계를 조회해주세요.");
						return;
					}

					if (adm_cd.length > 7) {
						adm_cd = adm_cd.substring(0,7);
					}

					$thematicMapFrame07.ui.curAdmCode = adm_cd;
					map.curAdmCd = adm_cd;
					map.curDropCd = adm_cd;

					if (tmpParam != null) {				
						var params = $thematicMapFrame07.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
						$thematicMapFrame07.ui.curDropParams[map.id] = params;
						$thematicMapFrame07.ui.requestOpenApi(params);
					}
					map.setBoundSelectedMoode(null);
					map.mapBtnInfo.setFixedBoundBtn(false);
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
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$thematicMapFrame07.ui.createInfoTooltip(event, data, type, map);
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
					if ($thematicMapFrame07.ui.buildPopup != null) {
						$thematicMapFrame07.ui.buildPopup.close();
					}

					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
					$("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$thematicMapFrame07.ui.buildPopup = 
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

					if (boundList.length >= 3) {
						messageAlert.open("알림", "다중경계는 최대 3개까지 선택가능합니다.");
						return;
					}

					layer.setStyle({
						weight : 5,
						color : layer.options.color,
						dashArray : layer.options.dashArray,
						fillOpacity : 0.7,
						fillColor : "#FFF56E"
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
			}

	};

	$thematicMapFrame07.event = {

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
							if (id == $thematicMapFrame07.ui.curMapId) {
								isSameView = true;
							}
						});						

						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$thematicMapFrame07.ui.curMapId = tmpView[0];
							}else {
								$thematicMapFrame07.ui.curMapId = tmpView[1];
							}

							var id = "view" + ($thematicMapFrame07.ui.curMapId + 1);
							switch($thematicMapFrame07.ui.curMapId) {
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
							$thematicMapFrame07.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$thematicMapFrame07.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$thematicMapFrame07.ui.curMapId = 2;
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
				});

				$(".tb_radio .fl").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_on.png)");  
				});
				$(".tb_radio .fr").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_off.png)");  
				});

			},


	};

	$thematicMapFrame07.Popup = {
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


	$thematicMapFrame07.request = {
			//카타고리 정보를 가져온다.
			getCategory : function () {
				$statsPotal.api.thematicMap.getCategory({
					method : 'POST',
					success : $thematicMapFrame07.response.successCateList
				});
			},
			
			getStatsThemeMapList : function (id) {
				var sopthemeMapParamListObj = new sop.portal.themeMapParamList.api();
				sopthemeMapParamListObj.addParam("hist_id", id);
				sopthemeMapParamListObj.request({
					method : "POST",
				    async : true,
				    url : contextPath+"/ServiceAPI/thematicMap/GetStatsThemeMapParamInfo.json",
				    options : {}
				});
			}
	};

	$thematicMapFrame07.response = {
			successCateList : function (stats, res) {
				// 좌측 카탈로그 리스트 받아서 붙이기 
				if (res.errCd === 0) {
					categoryList = res.result.cateList;

					for ( var i = 0; i < categoryList.length; i++) {							
						var html = "<li style='background:url("+categoryList[i].category_icon_url+");background-size:30px 30px;background-repeat:no-repeat;background-position:left'><a href='javascript:$thematicMapFrame07.getCategoryList.getMenuList(\""+categoryList[i].thema_map_category+"\");'>"+categoryList[i].category_nm+"</a></li>";
						$('.qmIcon01').append(html);

					}						
				}
			}				
	};

	$thematicMapFrame07.getCategoryList = {
			getMenuList : function (thema_map_category){
				$.ajax({
					type: "POST",
					url: contextPath + "/ServiceAPI/thematicMap/GetMenuCategoryList.json",
					async : false,
					data : {
						cate_id : thema_map_category						  
					},
					success: function(res) {

						$('#subj_list').text(res.result.categoryList[0].category_nm+" 주제도 목록");
						$thematicMapFrame07.setCategoryList.setCategoryListHtml(res);			

					},								  
					dataType: "json",
					error:function(e){}  
				});			
			}
	};

//	<div class="totalResult tr01">
//	<div class="stepBox">
//	<ul id="stepBoxUl">

//	</ul>
//	</div> 
//	</div>

//	<input type="checkbox" id="rd_juger01" />
//	<label for="rd_juger01" data-subj="주제도 특성" title="<span class='sp01'>시도11</span><span class='sp01'>시군구12</span><span class='sp02'>다중뷰14</span>">갤혼기간 10년 이하 가구의 주택 점유형태 지역별 분포, 2010</label>
//	</li>

	$thematicMapFrame07.setCategoryList = {
			setCategoryListHtml : function(res){
				$('#scrollBox').html("");

				var list = res.result.categoryList;
				var html = "<div class='totalResult tr"+list[0].category.substring(6,8)+"'>";
				html += "<div class='stepBox'>";
				html += "<ul id='stepBoxUl'>";
				for(var i=0;i<list.length;i++){															
					if(list[i].thema_map_type=="02"){
						html += "<li><label id='rd_juger"+i+"'>"+ '<a href="/view/thematicMap/thematicMapMainOld?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '" target="_top">'+list[i].title+"</a></label></li>";
					}else{
						html += "<li><label id='rd_juger"+i+"'>"+'<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '" target="_top">' + list[i].title + "</a></label></li>";															
					}
				}
				html += "</ul></div></div>";
				$('#scrollBox').append(html);
				for(var i=0;i<list.length;i++){	
					var dataType = "";
//					// 시도,시군구,읍면동,집계구 설정(공통)
					if(list[i].max_expnsn_level == '01') {
						dataType += '<span class="sp01">시도</span>';
					} else if(list[i].max_expnsn_level == '02') {
						// 2016. 03. 28 j.h.Seok
						dataType += '<span class="sp01">시군구</span>';
					} else if(list[i].max_expnsn_level == '03') {
						dataType += '<span class="sp01">읍면동</span>';
					} else if(list[i].max_expnsn_level == '04'){
						dataType += '<span class="sp01">집계구</span>';
					}

					// 주제도 유형 정보
					if(list[i].thema_map_type=='02'){
						// 예전 데이터의 경우 disp_mthd 와 max_expnsn으로 박스표시
						dataType += '<span class="sp02">'+list[i].disp_method+'</span>';	
					}else{
						// theme_map_type이 다른경우 max_expnsn
						if(list[i].thema_map_type == '03'){
							dataType += '<span class="sp02">색상</span>'
						}else if(list[i].thema_map_type == '04'){
							dataType += '<span class="sp02">증감</span>';
						}else if(list[i].thema_map_type == '05'){
							dataType += '<span class="sp02">시계열</span>';
						}else if(list[i].thema_map_type == '06'){
							dataType += '<span class="sp02">분할뷰</span>';
						} else if(list[i].thema_map_type == '07'){
							dataType += '<span class="sp02">POI</span>';
						}else if(list[i].thema_map_type == '07'){
							dataType += '<span class="sp02">POI</span>';
						}
					}

					//데이터 년도
					dataType += '<span class="sp03">'+list[i].year_info+'</span>';					
					$('#rd_juger'+i).attr('title',dataType);
				}
				linkTooltip();
			}
	};
	
	(function() {
		$class("sop.portal.themeMapParamList.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						console.log(res);
						var result = res.result.themeParamInfoList[0];
						if (result.param_info) {
							$thematicMapFrame07.ui.paramInfo = JSON.parse(res.result.themeParamInfoList[0].param_info);
							$thematicMapFrame07.ui.paramInfo.paramInfo["type"] = "bookmark"
							$thematicMapFrame07.ui.doAnalysisShareInfo($thematicMapFrame07.ui.paramInfo.paramInfo);
						}
					},
					onFail : function(status, options) {
					}
				});
	}());


}(window, document));