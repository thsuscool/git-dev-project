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
	W.$thematicMapFrame06 = W.$thematicMapFrame06 || {};

	$(document).ready(
		function() {	
			
			$thematicMapFrame06.params = getAllParameter();
			$thematicMapFrame06.ui.createMap("mapRgn_1", 0);
			$thematicMapFrame06.event.setUIEvent();
			var mapNavi1 = new mapNavigation.UI();	
			
			//메뉴에서 카타고리 정보 가져온다.
			$thematicMapFrame06.request.getCategory();	
			
			//네비게이션을 만든다.
			mapNavi1.create("mapNavi_1", 1, $thematicMapFrame06.ui);	
			
			//지도를 추가한다.
			$thematicMapFrame06.ui.doAddMap();
			
			setTimeout(function() {
				if (window.parent.$thematicMapMain) {
					$thematicMapFrame06.ui.doAnalysisShareInfo(window.parent.$thematicMapMain.param);
				}else {
					$thematicMapFrame06.request.getStatsThemeMapList($thematicMapFrame06.params.id);
				}
			}, 500);
			

			//leftBox 사이즈 height 줄인다.
			$('.sqListBox.sq03 .sqList').css("height","185px");						
			$(".sideQuick.sq03").click();
			
	});
	
	$thematicMapFrame06.ui = {
			mapList : [],
			curMapId : 0,
			namespace: "thematicMap",
			reportPopup : null,
			paramInfo : null,
			
			doAnalysisShareInfo : function(data) {
				if (data.type == "bookmark") {
					var map = this.mapList[0];
					map.openInitStatData($thematicMapFrame06.params, function() {
							
						//통계선택
						$("#selectValue").val(data.stat_sel);
						$("#stat_sel > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.stat_sel) {
							case "leftValue" :
								$("#stat_sel > a").eq(0).addClass("on");
								break;
							case "rightValue" :
								$("#stat_sel > a").eq(1).addClass("on");
								break;
						}

						//지역경계
						$("#selectValue2").val(data.region_boundary);
						$("#region_boundary > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.region_boundary) {
							case "auto" :
								$("#region_boundary > a").eq(0).addClass("on");
								break;
							case "1" :
								$("#region_boundary > a").eq(1).addClass("on");
								break;
							case "2" :
								$("#region_boundary > a").eq(2).addClass("on");
								break;
							case "3" :
								$("#region_boundary > a").eq(3).addClass("on");
								break;
						}
						
						//지도유형
						$("#dataMode").val(data.map_type);
						$("#map_type > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.map_type) {
							case "color" :
								$("#map_type > a").eq(0).addClass("on");
								break;
							case "bubble" :
								$("#map_type > a").eq(1).addClass("on");
								break;
						}
						$thematicMapFrame06.ui.changeDataMode();
						
						//통계표출
						$("#dataMode2").val(data.data_type);
						$("#data_type > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.data_type) {
							case "dataOn" :
								$("#data_type > a").eq(0).addClass("on");
								break;
							case "dataOff" :
								$("#data_type > a").eq(1).addClass("on");
								break;
						}
						$thematicMapFrame06.ui.changeDataMode2();
					});
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
//				$("#view1").attr("style","width:50%");
				var map = new sMap.map();
				
				map.createMap($thematicMapFrame06, id, {
					center : [ 989674, 1818313 ],
					zoom : 1, 
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("rgeoevent");
				map.addControlEvent("zoomend");	
		
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($thematicMapFrame06.ui);
				map.legend = legend;
				legend.createLegend();
				//작업부분 끝
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map);	
				map.mapBtnInfo = btnInfo;

				btnInfo.createUI({
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : false, //true (위성, 확대축소)
					bizZoomControl : false  //true
				});	
				
				map.createInfoControl();
				
				//공유
				var shareInfo = new share.shareInfo(map, $thematicMapFrame06.ui);
				map.shareInfo = shareInfo;
				$thematicMapFrame06.params["url"] = "/view/thematicMap/thematicMapMain";
				map.shareInfo.setThematicMapShareInfo($thematicMapFrame06.params, "06");
				
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				//갤러리 등록
				$galleryAdd.delegate = this;
							
				map.gMap.whenReady(function() {
					map.createHeatMap();	
				});
				
				//$thematicMapFrame06.ui.doAnalysisShareInfo(window.parent.$thematicMapMain.param);
				
				
				//북마크
				setTimeout(function() {
					map.openApiReverseGeoCode(map.center);
				}, 300);
				
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
				//지도생성
				this.createMap("mapRgn_2", 1);
				var mapNavi = new mapNavigation.UI();
				mapNavi.firstBoolean = false;
				mapNavi.create("mapNavi_2", 2, $thematicMapFrame06.ui);				
		
				//가운데 버튼 추가
				var leftVal = $("#mapRgn_2").width()-22;

				$("#mapRgn_lock_btn").css("position", "absolute");
				$("#mapRgn_lock_btn").css("z-index", "500");
				$("#mapRgn_lock_btn").css("top", "50%");
				$("#mapRgn_lock_btn").css("left", "49%");
				$("#mapRgn_lock_btn").css("cursor", "pointer");
				
				
				
				// 범례의 타입설정 버튼을 지운다.
				$("#view1 .lgListBox li:eq(0)").hide();
				$("#view2 .lgListBox li:eq(0)").hide();
				
				$thematicMapFrame06.ui.mapList[0].commonMoveEventLeft();
				$thematicMapFrame06.ui.mapList[1].commonMoveEventRight();
			},
			
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				var map1 = this.mapList[0];
				var map2 = this.mapList[1];
				var dataGeoJson = [];
				dataGeoJson.push(map1.dataGeoJsonArray);
				dataGeoJson.push(map2.dataGeoJsonArray);
							
				var mapType = "thematicMap";
				var divId1 = "#mapRgn_1";
				var divId2 = "#mapRgn_2";
				
				var title, adm_nm, origin, companyObj, subTitle;
				var chart = null;
				var legend = null;
				var param = {};
				var selectOption = $("#selectValue").val(); // 통계 선택 (수/율)
				
				var dataList1 = { 					
						id : map1.id, 
						divId : divId1,
						geojson : map1.dataGeojsonLayer, 
						data : map1.dataForCombine,
						legend : {
							valPerSlice : map1.legend.valPerSlice,
							legendColor : map1.legend.legendColor,
							legendId: "#legend_"+map1.legend.id,
							legendType : map1.legend.legendType
						},
						param : map1.initData, // 초기데이터
						zoom : map1.zoom,
						center : map1.center,
						isCaption : map1.legend.numberData,
						dataType : map1.legend.selectType,
						selectOption : selectOption,
						origin : $("#thematicMapOrigin").html(),
				};
				
				var dataList2 = {
						id : map2.id, 
						divId : divId2,
						geojson : map2.dataGeojsonLayer, 
						data : map2.dataForCombine,
						legend : {
							valPerSlice : map2.legend.valPerSlice,
							legendColor : map2.legend.legendColor,
							legendId: "#legend_"+map2.legend.id,
							legendType : map2.legend.legendType
						},
						param : map2.initData, // 초기데이터
						zoom : map2.zoom,
						center : map2.center,
						isCaption : map2.legend.numberData,
						dataType : map2.legend.selectType,
						selectOption : selectOption,
						origin : $("#thematicMapOrigin2").html(),
				};
				
				var targetId = [divId1, divId2];
				var canvasList = [];
    			for (var i=0; i<targetId.length; i++) {
    				var capture = html2canvas($(targetId[i]), {
                        logging: true,
                        useCORS: false,
                        proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
                        onrendered : function(canvas, id) {
                        	//익스플로러 예외처리
                        	//2017.03.14 svg처리
                        	/*var agent = navigator.userAgent.toLowerCase();
	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	                     		var doc = document.querySelector(id.selector); 
	                     		var mapContainer = null;
	                     		for (var x=0; x<doc.childNodes.length; x++) {
	                     			var tmpClassName = doc.childNodes[x].className;
	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
	                     				mapContainer = doc.childNodes[x];
	                     				break;
	                     			}
	                     		}
	                     		if (mapContainer != null) {
	                     			var svgList = mapContainer.querySelectorAll("svg");
		                     		for (var x=0; x<svgList.length; x++) {
		                     			var svg = svgList[x];
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
                        	canvasList.push(canvas); 
                        	if (canvasList.length == targetId.length) {
                        		var targetCanvas = document.createElement("canvas");
                        		var width = canvas.width;
                        		var height = canvas.height;
                        		var dx = 0, dy = 0;
                        		targetCanvas.width = canvas.width *2;
                        		targetCanvas.height = canvas.height;
                        		var ctx = targetCanvas.getContext("2d");
                    			for (var x=0; x<canvasList.length; x++) {
                    				if (x != 0) {
                    					dx += width;
                    				}
                    				ctx.drawImage(canvasList[x], dx, dy, width, height);
                    			}
                    			
                    			var data = targetCanvas.toDataURL();  
                        		
                        		
                        		var options1 = {				
            							mapType : mapType,
            							mapWidth : $(divId1).width()*2,
            							mapHeight : $(divId1).height(),
            							chart : chart,
            							legend :legend,	
            							id : map1.id,
            							mapData : data
                        		};
            				
	            				var options2 = {
	            						mapType : mapType,
	            						mapClone : $(divId2).clone(),
	            						mapWidth : $(divId2).width()*2,
	            						mapHeight : $(divId2).height(),
	            						chart : chart,
	            						legend :legend,
	            						id : map2.id,
	            						mapData : data
	            				};
	            								
	            				var popup =  $thematicMapFrame06.ui.reportPopup.$reportForm.ui;
	            				popup.setData(deepCopy(dataList1),deepCopy(dataList2),options1,options2,dataGeoJson);
                        		
                        	}
                        	
                        }
                    });
    			}
				
				
				
				
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
				var tempVal = $("#mapRgn_lock_btn").attr("alt");
					if(tempVal=="locked"){
					
					this.curMapId = parseInt(type)-1;
					var map = this.mapList[this.curMapId];
					if (map.dataGeojson == null && 
						map.multiLayerControl.dataGeojson == null 
						) {
						messageAlert.open("알림", "출력할 결과가 없습니다.");
		 				return;
					}
					$thematicMapFrame06.ui.reportPopup = 
						window.open("/js/thematicMap/report/06/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
				}else{
					messageAlert.open("알림", "화면 중단에 있는 자물쇠 버튼을 눌러주세요.<br><br><img src='/img/common/icon_temp_sseok_2.png'>");
				}
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
					var map1 = $thematicMapFrame06.ui.mapList[0];
					var map2 = $thematicMapFrame06.ui.mapList[1];
					map1.selectStatsOption = true;
					map1.changeRegionBound();						
					map1.selectStatsOption = false;
					map2.selectStatsOption = true;
					map2.changeRegionBound();						
					map2.selectStatsOption = false;			
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
				var map1 = $thematicMapFrame06.ui.mapList[0];
				var map2 = $thematicMapFrame06.ui.mapList[1];
				
				var tempData1 = map1.dataGeoJsonArray;
				var tempData2 = map2.dataGeoJsonArray;
				
				//시군구, 읍면동인 경우에만 multiLayerControl를 이용한다.
		
					//밑에 없으면 이상해짐
					if(tempData1 != undefined && tempData1.length && tempData1 != null > 0) {
						map1.multiLayerControl.dataGeojson = tempData1;
					}
					if(tempData2 != undefined && tempData2.length && tempData2 != null> 0) {
						map2.multiLayerControl.dataGeojson = tempData2;
					}

					
				if($('#dataMode').val()=='bubble'){		
					//changeDataMode
					$('#lgTypeList_'+map1.legend.id+' a:eq(2)').trigger("click");
					$('#lgTypeList_'+map2.legend.id+' a:eq(2)').trigger("click");
				}else{
					$('#lgTypeList_'+map1.legend.id+' a:eq(1)').trigger("click");
					$('#lgTypeList_'+map2.legend.id+' a:eq(1)').trigger("click");
				}		
				map1.checkShowCaption();
				map2.checkShowCaption();
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
				
				var map1 = $thematicMapFrame06.ui.mapList[0];				
				var map2 = $thematicMapFrame06.ui.mapList[1];				
				if($('#dataMode2').val()=='dataOff'){
					map1.legend.numberData = false;
					//map1.changeRegionBound();	
					map2.legend.numberData = false;
					//map2.changeRegionBound();	
				}else{
					map1.legend.numberData = true;
					//map1.changeRegionBound();	
					map2.legend.numberData = true;
					//map2.changeRegionBound();	
				}
				map1.checkShowCaption();
				map2.checkShowCaption();
				
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
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				map.setInnerMap(isShow);
				
				if (isShow) {
					$("#btnList_"+type).find("ul").hide();
					$("#btnList_"+type).css("margin-right", "5px");
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
				}else {
					$("#btnList_"+type).find("ul").show();
					$("#btnList_"+type).css("margin-right", "0px");
					map.mapBtnInfo.controlShow("poi");
					map.mapBtnInfo.controlShow("setting");
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
					if (this.mapList[i] != null) {
						var map = this.mapList[i];
						console.log(map.dataForCombine);
						data.push({
							id : map.id, 
							geojson : map.dataGeojsonLayer, 
							data : map.dataForCombine,
							legend : {
								valPerSlice : map.legend.valPerSlice,
								legendColor : map.legend.legendColor
							},
							param:this.dropBtnInfo[map.id],
							zoom:map.zoom,
							center:map.center,
							adm_cd : map.curAdmCd
						});
					}
					
				}
				var popup = $thematicMapFrame06.ui.combinePopup.$combineMap.ui;
				popup.setData(deepCopy(data));
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
				if 	    (api_id == "API_0301") $thematicMapFrame06Api.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $thematicMapFrame06Api.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $thematicMapFrame06Api.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $thematicMapFrame06Api.request.openApiCompany(options);
				else if (api_id == "API_0305") $thematicMapFrame06Api.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $thematicMapFrame06Api.request.openApiHouse(options);
				else if (api_id == "API_0307") $thematicMapFrame06Api.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $thematicMapFrame06Api.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $thematicMapFrame06Api.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $thematicMapFrame06Api.request.openApiHouseHoldMember(options);
				
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
						
						//통계선택
						$("#stat_sel > a").each(function() {
							if ($(this).hasClass("on")) {
								stat_sel = $("#selectValue").val();
							}
						});
						
						//지역선택
						$("#region_boundary > a").each(function() {
							if ($(this).hasClass("on")) {
								region_boundary = $("#selectValue2").val();
							}
						});
						
						//지도유형
						$("#map_type > a").each(function() {
							if ($(this).hasClass("on")) {
								map_type = $("#dataMode").val();
							}
						});
						
						//통계표출
						$("#data_type > a").each(function() {
							if ($(this).hasClass("on")) {
								data_type = $("#dataMode2").val();
							}
						});
						
						var params = {
								"stat_sel" : stat_sel,
								"region_boundary" : region_boundary,
								"map_type" : map_type,
								"data_type" : data_type,
								"stat_thema_map_id" : window.parent.$thematicMapMain.param.stat_thema_map_id,
								"theme" : window.parent.$thematicMapMain.param.theme,
								"mapType" : window.parent.$thematicMapMain.param.mapType,
								"iframe_url" : window.location.protocol+"//"+window.location.host+"/view/thematicMap/thematicMapFrame06"
							};
						
						
						for (var i=0; i<shareData.length; i++) {
							shareData[i].params.paramInfo = params;
							//2017.02.22 이미지캡쳐 수정
							shareData[i].params["mapCaptureId"] = ["#mapRgn_1", "#mapRgn_2"];
						}
						
						//갤러리 등록일 경우
						if (srvType != undefined && srvType != "THEME") {
							switch (srvType) {
								case "gallary":
									var captureTargetId = ["#mapRgn_1", "#mapRgn_2"];
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
	$thematicMapFrame06.callbackFunc = {

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
				if (map.zoom < 10 && map.isInnerMapShow) {
					$thematicMapFrame06.ui.doInnerMap(map.id+1);
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
			didMouseOverPolygon : function(event, data, type, map, mapid) {	
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);						
						}
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
	
	$thematicMapFrame06.event = {
			
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
							if (id == $thematicMapFrame06.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$thematicMapFrame06.ui.curMapId = tmpView[0];
							}else {
								$thematicMapFrame06.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($thematicMapFrame06.ui.curMapId + 1);
							switch($thematicMapFrame06.ui.curMapId) {
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
							$thematicMapFrame06.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$thematicMapFrame06.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$thematicMapFrame06.ui.curMapId = 2;
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
				
				$("#mapRgn_lock_btn").click(function() {
					var tempVal = $("#mapRgn_lock_btn").attr("alt");
					
					if(tempVal == "locked") {
						$("#mapRgn_lock_btn").attr("alt", "unlocked");
						$("#mapRgn_lock_btn").attr("src", "/img/common/icon_temp_sseok_2.png");
						$("#mapNavi_2").show();
						$("#view2 .interactiveIco").show();
												
					} else {
						$("#mapRgn_lock_btn").attr("alt", "locked");
						$("#mapRgn_lock_btn").attr("src", "/img/common/icon_temp_sseok.png");
						$("#mapNavi_2").hide();
						$("#view2 .interactiveIco").hide();
						
						$thematicMapFrame06.ui.mapList[0].gMap.fire("zoomend");
					}
				});

			},
			
			
	};
	
			$thematicMapFrame06.request = {
				//카타고리 정보를 가져온다.
				getCategory : function () {
					$statsPotal.api.thematicMap.getCategory({
						method : 'POST',
						success : $thematicMapFrame06.response.successCateList
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
		
			$thematicMapFrame06.response = {
				successCateList : function (stats, res) {
					// 좌측 카탈로그 리스트 받아서 붙이기 
					if (res.errCd === 0) {
						categoryList = res.result.cateList;
						
						for ( var i = 0; i < categoryList.length; i++) {							
							var html = "<li style='background:url("+categoryList[i].category_icon_url+");background-size:30px 30px;background-repeat:no-repeat;background-position:left'><a href='javascript:$thematicMapFrame06.getCategoryList.getMenuList(\""+categoryList[i].thema_map_category+"\");'>"+categoryList[i].category_nm+"</a></li>";
							$('.qmIcon01').append(html);
							
						}						
					}
				}				
			};
			
			$thematicMapFrame06.Popup = {
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
						this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
						this.popupUI.style.border = "3px solid rgb(0,0,0)";
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
						
						/*this.popupUI.style.position = "absolute";
		                this.popupUI.style.height = '10px';
		                this.popupUI.style.lineHeight = '50px';
		                this.popupUI.style.paddingBottom='40px';
		                this.popupUI.style.width ='400px';
		                this.popupUI.style.top ='50%';
		                this.popupUI.style.left = '50%';
		                this.popupUI.style.zIndex = "11000";*/
						
						var errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
						//var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
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
			
			$thematicMapFrame06.getCategoryList = {
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
								$thematicMapFrame06.setCategoryList.setCategoryListHtml(res);			
							
							  },								  
							  dataType: "json",
							  error:function(e){}  
						});			
					}
			};
				
			$thematicMapFrame06.setCategoryList = {
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
//							// 시도,시군구,읍면동,집계구 설정(공통)
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
									$thematicMapFrame06.ui.paramInfo = JSON.parse(res.result.themeParamInfoList[0].param_info);
									$thematicMapFrame06.ui.paramInfo.paramInfo["type"] = "bookmark"
									$thematicMapFrame06.ui.doAnalysisShareInfo($thematicMapFrame06.ui.paramInfo.paramInfo);
								}
							},
							onFail : function(status, options) {
							}
						});
			}());
		
	
}(window, document));