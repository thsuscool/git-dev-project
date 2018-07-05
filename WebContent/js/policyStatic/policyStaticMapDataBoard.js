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
	W.$policyStaticMapDataBoard = W.$policyStaticMapDataBoard || {};
	
	$(document).ready(function() {
		$policyStaticMapDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
	});
	
	$policyStaticMapDataBoard.ui = {
			mapData : [],				//지도별 데이터
			map : null,				//지도 (sMap.map)
			map_id : "0",				//지도 ID (0, 1, 2)
			lastChatIndex : null	,
			layerGroup : [],
			dataGrid : null,
			
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
			createInfoTooltip : function(event, data, type, map, map_div) {
				var html = "";
				if (type == "data") {
					var title, unit;
					var data1 = $policyStaticMapLeftmenu.ui.arrParamList[0];
					var data2 = $policyStaticMapLeftmenu.ui.arrParamList[1];
					var sMap_param1 = data1.map_param;
					if(typeof(data1.map_param) == "string") sMap_param1 = eval("("+data1.map_param+")");
					var sMap_param2 = data2.map_param;
					if(typeof(data2.map_param) == "string") sMap_param2 = eval("("+data2.map_param+")");

					if ( map_div == "0" ) {
						title = sMap_param1.showTitle;
						unit = sMap_param1.unit;
					} else {
						title = sMap_param2.showTitle;
						unit = sMap_param2.unit;
					}

					if (data.info != undefined && data.info.length > 0) {
						switch (data.info.length) {
						case 1:
							switch(data.info[0].api_id) {
								case "API_MYDATA":	//나의데이터
									html = $policyStaticCombineMap.ui.userDataTooltip(data, title, unit);
									break;
								default:
									//센서스데이터
									html = $policyStaticCombineMap.ui.censusDataTooltip(data, title, unit);
									break;
							}
							break;
						default:
							if(data.isKosis != undefined && data.isKosis) {
								html =$policyStaticCombineMap.ui.kosisTooltip(data, title, unit);
							}
							break;
						}
					}else {
						html = "<table style='margin:10px;'>"
				             + 	"<tr><td class='statsData'>N/A</td></td>";
							 + "</table>";
					}
				}
			
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
			}
	};

	$policyStaticMapDataBoard.event = {
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
				
				$(".dataSideContents").mCustomScrollbar({axis:"xy"});
				
				var body = $("body");
				
				//투명도 설정 바
				$("#dataSlider").slider({
			    	range: "min",
			        min: 5,
			        max: 10,
			        value: 10,
			        slide: function( event, ui ) {  //ui.value
			        	$(".dataSideBox, .policyStaticMapDataBoard").css("opacity", ui.value*0.1);
				    }
			    });
				$(".dataSideBox, .policyStaticMapDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
				
				//닫기 버튼
				body.on("click",".dataSideBox .bar>a",function(){ 
					$(".dataSideBox").removeClass("full");
					$(".dataSideBox").stop().animate({"right":"-1500px"},200);
					$(".policyStaticMapDataBoard").removeClass("on").stop().animate({"right":"0"},200);
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
				body.on("click",".policyStaticMapDataBoard",function(){
					var btn = $(this);
					function close(){
						//데이터보드 닫기
						$(".dataSideBox").removeClass("full");
						$(".dataSideBox").stop().animate({"right":"-1500px"},200);
						btn.removeClass("on").stop().animate({"right":"0"},200);
					}
					if(btn.hasClass("disabled")){
						close();
					}else{
						var ck = btn.hasClass("on");
						if(!ck){
							$policyStaticMapDataBoard.Combine.mapLoad();//중복 차트 조회
							//일반 데이터보드
							$(".dataSideBox").stop().animate({"right":"0"},200);
							$("#normalDataBoard").show();
							$("#fullDataBoard").hide();
							btn.addClass("on").stop().animate({"right":"426px"},200);
						}else{
							if($(".dataSideBox").hasClass("full")){
								close();
							}
						}
					}
				});
				
				//표보기, 차트보기
				body.on("click","#typeBoxDB>a",function(){ 
					$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
					$(this).addClass("on");
					var ck = $(this).index("#typeBoxDB>a")+1;
					$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
					$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
					
					if(ck%2){
						$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
						$(this).parents(".compareBox").find(".censusChart").show();
						$("#dataGridDB").hide();
					}else{
						$(this).parents(".compareBox").find(".censusChart").hide();
						$("#dataGridDB").show();
					}
					
			    });
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
				if(!$(".policyStaticMapDataBoard").hasClass("on")) {
					$(".policyStaticMapDataBoard").click();
					$("#dataBoard").show();
				}
			}
	};
	

	//결합 차트 관련
	$policyStaticMapDataBoard.Combine = {
			
			/**
			 * @name         : mapLoad
			 * @description  : MAP 정보를 이용하여 데이터 보드 정보 설정
			 * @date         : 2016. 12.01. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			mapLoad : function() {
				var data = [];
				for (var i=0; i< $policyStaticMap.ui.mapList.length; i++) {
					if ($policyStaticMap.ui.mapList[i]) {
						var map = $policyStaticMap.ui.mapList[i];
						if (map.dataGeojsonLayer == null) {
							continue;
						}
						
						//============ 2017.05.29 [개발팀] 비자치구 추가-데이터정제 START ==============//
						if (map.dataForCombine != null) {
							if (Object.prototype.toString.call(map.dataForCombine) === "[object Array]") {
								var tmpResult = null;
								var tmpLdata = null;
								for (var j=0; j<map.dataForCombine.length; j++) {
									var tmpData = map.dataForCombine[j].data;
									if (j==0) {
										tmpResult = tmpData.result; 
										tmpLdata = tmpData;
										tmpLdata["chartResult"] = null;
									}else {
										for (var k=0; k<tmpData.result.length; k++) {
											tmpResult.push(tmpData.result[k]);
										}
									}
								}
								
								tmpLdata["chartResult"] = tmpResult;
								map.dataForCombine = tmpLdata;
							}
							
							map.dataForCombine.result = map.dataForCombine.result.sort(function(a, b) {
								if (b[b.showData] == "N/A") {
									b[b.showData] = 0;
								}else if (a[a.showData] == "N/A") {
									a[a.showData] = 0;
								}
								return parseFloat(b[b.showData])-parseFloat(a[a.showData]);
							});
							map.dataForCombine.chartResult = map.dataForCombine.result;
						}
						//============ 2017.05.29 [개발팀] 비자치구 추가-데이터정제 END ==============//
						
						data.push({
							id : map.id, 
							geojson : null,
							data : map.dataForCombine,
							legend : {
								valPerSlice : map.legend.valPerSlice,
								legendColor : map.legend.legendColor,
								type : map.legend.selectType
							},
							param:$policyStaticMap.ui.arParamList[map.id],
							zoom:map.zoom,
							center:map.center,
							adm_cd : map.curDropCd,
							type : "census"
						});
						
					}
					
				}
				$policyStaticMapDataBoard.Combine.setData(data);
				$policyStaticMapDataBoard.Combine.searchTitle();
				$policyStaticMapDataBoard.Combine.addCombineLayer("0-1", "결합차트");
				$policyStaticMapDataBoard.Combine.doShowChart("0-1");
				var data2 = $policyStaticMapLeftmenu.ui.arrParamList[1];
				if (data2.data_type == "04" || data2.data_type == "05") {  // 열지도이거나 POI 지도일때
				} else {
					$policyStaticMapDataBoard.Combine.drawGrid();
				}
			},

			/**
			 * @name         : searchTitle
			 * @description  : 데이터보드 제목, 출처 명칭 변경
			 * @date         : 2016. 12.01. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			searchTitle : function() {
			////////// 2017.09.13 [개발팀] 데이터보드기능수정 START ////////////
				var paramInfo = $policyStaticMapLeftmenu.ui.arrParamList;
				//대상지역 설정
				var boundLevel = $("#boundLevelTitle option:selected").text();
				var regionTitle = $("#current-sido-select option:selected").text()+" "+$("#current-sgg-select option:selected").text() + ", " + boundLevel;
				$("#regionTitleDB").html(regionTitle);
				
				//기관설정
				var grade = $policyStaticMap.ui.settingInfo["src_inst_cd"];
				switch (parseInt(grade)) {
					case 1:
						grade = "통계청";
						$("#inst_titleDB").css("background", "#ff0000");
						break;
					case 2:
						grade = "지자체";
						$("#inst_titleDB").css("background", "#0099ff");
						break;
					case 3:
						grade = "공공데이터";
						$("#inst_titleDB").css("background", "#ff0000");
						break;
					default:
						grade = "지자체";
						$("#inst_titleDB").css("background", "#ff0000");
						break;
				}
				$("#inst_titleDB").html(grade);
				
				var data1 = $policyStaticMapLeftmenu.ui.arrParamList[0];
				var data2 = $policyStaticMapLeftmenu.ui.arrParamList[1];
				var sCall_param1 = data1.call_param;
				if(typeof(data1.call_param) == "string") sCall_param1 = eval("("+data1.call_param+")");
				var sCall_param2 = data2.call_param;
				if(typeof(data2.call_param) == "string") sCall_param2 = eval("("+data2.call_param+")");
				var sMap_param1 = data1.map_param;
				if(typeof(data1.map_param) == "string") sMap_param1 = eval("("+data1.map_param+")");
				var sMap_param2 = data2.map_param;
				if(typeof(data2.map_param) == "string") sMap_param2 = eval("("+data2.map_param+")");
				
				//주요지표
				if ( sMap_param1.unit == "" ) {
					$("#dataA_titleDB").html(sMap_param1.showTitle);
				} else {
					$("#dataA_titleDB").html(sMap_param1.showTitle+" ("+sMap_param1.unit+")");
				}
				if ( sMap_param2.unit == "" ) {
					$("#dataB_titleDB").html(sMap_param2.showTitle);
				} else {
					$("#dataB_titleDB").html(sMap_param2.showTitle+" ("+sMap_param2.unit+")");
				}
				
				switch(parseInt(data1.data_div)) {
					case 2: // KOSIS 데이터
						//출처설정
						$("#dataA_originDB").html(data1.source+" ("+sCall_param1.kosis_data_year+")");
						break;
					case 3: // 사용자 데이터
						//출처설정
						$("#dataA_originDB").html(data1.source+" ("+$("#policySelectBox_1").val()+")");
						break;
					case 4: // 공공 데이터
					case 5: // LBDMS 데이터
						//출처설정
						$("#dataA_originDB").html(data1.source);
						break;
					default: // census 데이터
						//출처설정
						$("#dataA_originDB").html(data1.source+" ("+sCall_param1.year+")");
						break;
				}
				
				switch(parseInt(data2.data_div)) {
					case 2: // KOSIS 데이터
						//출처설정
						$("#dataB_originDB").html(data2.source+" ("+sCall_param2.kosis_data_year+")");
						break;
					case 3: // 사용자 데이터
						//출처설정
						$("#dataB_originDB").html(data2.source+" ("+$("#policySelectBox_2").val()+")");
						break;
					case 4: // 공공 데이터
					case 5: // LBDMS 데이터
						//출처설정
						$("#dataB_originDB").html(data2.source);
						break;
					default: // census 데이터
						//출처설정
						$("#dataB_originDB").html(data2.source+" ("+sCall_param2.year+")");
						break;
				}
				
				if (data2.data_type == "04" || data2.data_type == "05") {
					$("#dataB_titleDB").html($policyStaticCombineMap.ui.poiTitleNm);
					$("#dataB_originDB").html($policyStaticCombineMap.ui.poiSourceNm);
				}
				////////// 2017.09.13 [개발팀] 데이터보드기능수정 END ////////////
			},

			/**
			 * @name         : drawGrid
			 * @description  : 표 그리기
			 * @date         : 2017. 09.14. 
			 * @author	     : 김보민
			 * @history 	 :
			 */
			drawGrid : function(data) {
				var data1 = $policyStaticMapLeftmenu.ui.arrParamList[0];
				var data2 = $policyStaticMapLeftmenu.ui.arrParamList[1];
				
				if ( data2.data_type == "04" || data2.data_type == "05" ) {  // 열지도orPOI지도일 때
					var html = "";
					html += "<colgroup>";
					html += 		"<col width='80' />";
					html +=     "<col width='' />";
					html +=		"<col width='' />";
					html +=	"</colgroup>";
					html +=	"<tr>";
					html +=		"<th class='addSideLine'>지역명</th>";
					html +=		"<th class='addSideLine'>행정동코드</th>";
					html +=		"<th class='addSideLine'>값</th>";
					html +=	"</tr>";
					
					for (var k=0; k<data.length; k++) {
						var length = data[k].poiData.length + 1;
						html += "<tr class='databoard_tr'>";
						html += 	"<td rowspan='"+length+"' class='addSideLine'>"+data[k].adm_nm+"</td>";
						html += 	"<td rowspan='"+length+"' class='addSideLine'>"+data[k].adm_cd+"</td>";
						html += 	"<td class='border addSideLine'>"+appendCommaToNumber(data[k].data)+"</td>";
						html += "</tr>";
						for (var i=0; i<data[k].poiData.length; i++) {
							html += "<tr class='databoard_tr'>";
							html += 	"<td class='border addSideLine'>"+appendCommaToNumber(data[k].poiData[i].data)+"</td>";
							html += "</tr>";
						}
					}
					$("#dataTableDB").html(html);
				} else {
					var chartData = this.getDemandIndexCombineData();
					var sCall_param1 = data1.call_param;
					if(typeof(data1.call_param) == "string") sCall_param1 = eval("("+data1.call_param+")");
					var sCall_param2 = data2.call_param;
					if(typeof(data2.call_param) == "string") sCall_param2 = eval("("+data2.call_param+")");
					var sMap_param1 = data1.map_param;
					if(typeof(data1.map_param) == "string") sMap_param1 = eval("("+data1.map_param+")");
					var sMap_param2 = data2.map_param;
					if(typeof(data2.map_param) == "string") sMap_param2 = eval("("+data2.map_param+")");
					
					var html = "";
					html += "<colgroup>";
					html += 		"<col width='80' />";
					html +=     "<col width='' />";
					html +=		"<col width='' />";
					html +=	"</colgroup>";
					html +=	"<tr>";
					html +=		"<th class='addSideLine' rowspan='2'>지역명</th>";
					html +=		"<th class='addSideLine' rowspan='2'>행정동코드</th>";
					html +=		"<th class='addSideLine' colspan='2'>값</th>";
					html +=	"</tr>";
					html +=	"<tr>";
					switch (parseInt($policyStaticMap.ui.settingInfo["idx_type"])) {
						case 1:  // 수요변화형
							switch(data1.data_div) {
							case "3" :
								html +=		"<th class='addSideLine'>"+$("#policySelectBox_1").val()+"년</th>";
								html +=		"<th class='addSideLine'>"+$("#policySelectBox_2").val()+"년</th>";
								break;
							default :
								html +=		"<th class='addSideLine'>"+sCall_param1.year+"년</th>";
								html +=		"<th class='addSideLine'>"+sCall_param2.year+"년</th>";
								break;
							}
							break;
						case 2:  // 통계연산형
							html +=		"<th class='addSideLine'>"+sMap_param1.showTitle+" ("+sMap_param1.unit+")</th>";
							html +=		"<th class='addSideLine'>"+sMap_param2.showTitle+" ("+sMap_param2.unit+")</th>";
							break;
					}
					html +=	"</tr>";
					for (var i=0; i<chartData.combineDataInfo.length; i++) {
						var adm_nm = chartData.combineDataInfo[i].adm_nm;
						var admNmList = adm_nm.split(" ");
						adm_nm = admNmList[admNmList.length-1];
						html += 	"<tr class='databoard_tr'>";
						html += 		"<td class='addSideLine'>"+adm_nm+"</td>";
						html += 		"<td class='combine_td addSideLine'>"+chartData.combineDataInfo[i].adm_cd+"</td>";
						html +=		"<td class='combine_td addSideLine'>"+appendCommaToNumber(parseInt(chartData.combineDataInfo[i].dataA))+"</td>";
						html +=		"<td class='combine_td addSideLine'>"+appendCommaToNumber(parseInt(chartData.combineDataInfo[i].dataB))+"</td>";
						html += 	"</tr>";
					}
					
					$("#dataTableDB").html(html);
				}
			},
			
			/**
			 * @name         : doShowChart
			 * @description  : CHART, GRID 보이기
			 * @date         : 2016. 12.01. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param id
			 */
			doShowChart : function(id) {
				//데이터보드 보이기
				$(".dataBoardDiv").hide();
				$("#viewDataBoard").show();
				
				var data2 = $policyStaticMapLeftmenu.ui.arrParamList[1];
				if ( data2.data_type == "04" || data2.data_type == "05") {   // 열지도 or POI 데이터일 때
					$policyStaticMapDataBoard.Combine.addPoiChart();
				} else {
					$policyStaticMapDataBoard.Combine.addChart();
				}

			},
			
			/**
			 * 
			 * @name         : getDemandIndexCombineData
			 * @description  : 수요변화지표의 융합정보(증감/증감률)를 가져온다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 데이터 타입(증감:1, 증감률:2)
			 * @param mapList: 맵 정보
			 */
			getDemandIndexCombineData : function() {
				var mapA = $policyStaticMap.ui.mapList[0];
				var mapB = $policyStaticMap.ui.mapList[1];
				var multiDataA = mapA.multiLayerControl.multiData;
				var multiDataB = mapB.multiLayerControl.multiData;
				var combineLayer = deepCopy(multiDataA);
				var combineDataInfo = [];
				
				multiDataA = multiDataA.sort(function(a, b) {
					return parseInt(b.data.pAdmCd) - parseInt(a.data.pAdmCd);
				});
				
				multiDataB = multiDataB.sort(function(a, b) {
					return parseInt(b.data.pAdmCd) - parseInt(a.data.pAdmCd);
				});

				//지도 A,B의 각 지역별 데이터 융합(증감)
				//지도 A 기준으로 증감 
				for (var i=0; i<multiDataA.length; i++) {
					var featuresA = multiDataA[i].layer.features;
					var featuresB = multiDataB[i].layer.features;

					for (var k=0; k<featuresA.length; k++) {
						var dataA = this.getDataInLayer(featuresA[k]);
						var dataB = this.getDataInLayer(featuresB[k]);
						
						if (dataA != null && dataB != null) {
							var resultDataA = dataA.data;
							var resultDataB = dataB.data;

							combineDataInfo.push({
									dataA : resultDataA,
									dataB : resultDataB,
									adm_cd : featuresA[k].properties.adm_cd,
									adm_nm : featuresA[k].properties.adm_nm,
									data_type :  multiDataA[i].data.dataType
							});
						}
					}		
				}
				return {
					"combineDataInfo" : combineDataInfo,
					"combineLayer" : combineLayer
				}
			},
			
			/**
			 * 
			 * @name         : getDataInLayer
			 * @description  : 융합을 위해 레이어에서 데이터를 가져온다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param features : 레이어정보
			 */
			getDataInLayer : function(features) {
				if (features !=undefined) {
					if (features.info != undefined && 
						Object.prototype.toString.call(features.info) === "[object Array]") {
						var info = features.info[0];
						if (info == undefined) {
							return {
								"data" : 0,
								"info" : info,
								"dataIdx" : features.dataIdx
							};
						} 
						var data = info[info.showData];
						if (data == "N/A") {
							data = 0;
						}
						return {
							"data" : data,
							"info" : info,
							"dataIdx" : features.dataIdx
						};
					}
				}
				return null;
			},
			
			
			/**
			 * @name         : addChart
			 * @description  : 좌, 우 수요변화 정보를 CHART로 변환
			 * @date         : 2016. 12.01. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param data
			 * @param title
			 * @param unit
			 * @param mapId
			 * @param type
			 * @param year
			 */
			addChart : function() {
				var chartData = this.getDemandIndexCombineData();
				
				//2018.01.09 [개발팀]
				chartData.combineDataInfo = chartData.combineDataInfo.sort(function(a, b) {
					return parseFloat(b.dataA) - parseFloat(a.dataA);
				});
				
				var length = 0;
				var height = 0;

				var series = [];
				var tmpDataA = [];
				var tmpDataB = [];
				var categories = [];

				for (var i=0; i<chartData.combineDataInfo.length; i++) {
					tmpDataA.push({"y":parseInt(chartData.combineDataInfo[i].dataA), "adm_cd":chartData.combineDataInfo[i].adm_cd, "map_div":0});
					tmpDataB.push({"y":parseInt(chartData.combineDataInfo[i].dataB), "adm_cd":chartData.combineDataInfo[i].adm_cd, "map_div":1});
					if (chartData.combineDataInfo[i].adm_cd.length > 7) {
						categories.push(chartData.combineDataInfo[i].adm_cd);
					}else {
						var adm_nm = chartData.combineDataInfo[i].adm_nm;
						var admNmList = adm_nm.split(" ");
						adm_nm = admNmList[admNmList.length-1];
						categories.push(adm_nm);
					}
				}

				var data1 = $policyStaticMapLeftmenu.ui.arrParamList[0];
				var data2 = $policyStaticMapLeftmenu.ui.arrParamList[1];
				switch (parseInt($policyStaticMap.ui.settingInfo["idx_type"])) {
					case 1:
						var sCall_param1 = data1.call_param;
						if(typeof(data1.call_param) == "string") sCall_param1 = eval("("+data1.call_param+")");
						var sCall_param2 = data2.call_param;
						if(typeof(data2.call_param) == "string") sCall_param2 = eval("("+data2.call_param+")");
						
						switch(parseInt(data1.data_div)) {
							case 2 : // KOSIS 데이터
								series.push({name:sCall_param1.kosis_data_year+"년", data:tmpDataA, color:'#21AAFF'});
								series.push({name:sCall_param2.kosis_data_year+"년", data:tmpDataB, color:'#FFC622'});
								break;
							case 3 : // 사용자 데이터
								series.push({name:$("#policySelectBox_1").val()+"년", data:tmpDataA, color:'#21AAFF'});
								series.push({name:$("#policySelectBox_2").val()+"년", data:tmpDataB, color:'#FFC622'});
								break;
							default :
								series.push({name:sCall_param1.year+"년", data:tmpDataA, color:'#21AAFF'});
								series.push({name:sCall_param2.year+"년", data:tmpDataB, color:'#FFC622'});
								break;
							}
						break;
					case 2:
						var sMap_param1 = data1.map_param;
						if(typeof(data1.map_param) == "string") sMap_param1 = eval("("+data1.map_param+")");
						var sMap_param2 = data2.map_param;
						if(typeof(data2.map_param) == "string") sMap_param2 = eval("("+data2.map_param+")");
						
						series.push({name:sMap_param1.showTitle+" ("+sMap_param1.unit+")", data:tmpDataA, color:'#21AAFF'});
						series.push({name:sMap_param2.showTitle+" ("+sMap_param2.unit+")", data:tmpDataB, color:'#FFC622'});
						break;
				}

				// 2016. 03. 29 j.h.Seok modify
				length = chartData.combineDataInfo.length;
				height = length * 40;
				
				if (length <= 20) {
					height = 500;
				}else {
					height = length * 50;
				}

				$("#wrapperChartScroll3").css("height", (height+50)+"px");
				$("#targetChartsDB").css("height", height+"px");

				$("#targetChartsDB").highcharts({
					chart: {
					    type: 'bar', 
					    height : height,
					    width : 480
					},
					exporting: { enabled: false },
					title: {
					    text: '' 
					},
					subtitle: {
					    text: ''
					},
					xAxis: {
					    categories: categories,
					    labels : { 
							rotation : 0,
							enabled: true
						}
					},
					yAxis: {
					    min: 0,
					    title: {
					    	text: ''//,  align: 'high'
					    },
					    labels: {
			                formatter:function(){return appendCommaToNumber(this.value);},
			                step: 1,
			                align: 'center',
			                overflow : 'justify'
			                //rotation : -45
			            },
	//				    showFirstLabel: true,
					    showLastLabel: false
					},
					plotOptions : {
						series : {
							cursor : "pointer",
							point : {
								events : {
									mouseOver : function() {
										var adm_cd = this.adm_cd;
										var map_div = this.map_div;
										var map = $policyStaticMap.ui.mapList[map_div];

										for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
											map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
												if (layer.feature) {
													var e = {
															target : layer,
															utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
													};
													map.setPolyLayerMouseout(e);
													layer.unbindToolTip();

													if (layer.feature.properties.adm_cd == adm_cd) {
														map.setPolyLayerMouseover(e);
//														$policyStaticCombineMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
														$policyStaticMapDataBoard.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map, map_div);
													}
												}
											});
										}
									}
								}
							}
						}
					},
					
					legend: {
						enabled : true,
						verticalAlign: "top"
					},
					tooltip: {
						shared : true,
						valueDecimals: 2,
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
								html += ' ' + this.points[i].series.name + ': <b>' + appendCommaToNumber(this.points[i].y) + '</b>';
								if (i < this.points.length-1) {
									html += "<br/>";
								}
							}
							return html;
						}
					},
					series: series
			    });

			},
			
			
			/**
			 * @name         : addPoiChart
			 * @description  : Poi CHART로 변환
			 * @date         : 2017. 10.13. 
			 * @author	     : 김보민
			 * @history 	 :
			 * @param data
			 * @param title
			 * @param unit
			 * @param mapId
			 * @param type
			 * @param year
			 */
			addPoiChart : function() {
				var title = "융합데이터";
				var categories = [];
				var dataList = [];
				var chartList = {};
				var combineData = this.getAnalysisIndexCombineData($policyStaticMap.ui.mapList);
				var poiList = $policyStaticMap.ui.poiLayerList;
				
				//색상지도 차트데이터 가공
				for (var i=0; i<combineData.combineDataInfo.length; i++) {
					var adm_nm;

					adm_nm = combineData.combineDataInfo[i].adm_nm;
					var admNmList = adm_nm.split(" ");
					adm_nm = admNmList[admNmList.length-1];
					categories.push(adm_nm);

					dataList.push({"y":parseFloat(combineData.combineDataInfo[i].data), "adm_cd":combineData.combineDataInfo[i].adm_cd});
					chartList[combineData.combineDataInfo[i].adm_cd] = {
							adm_cd : combineData.combineDataInfo[i].adm_cd,
							adm_nm : adm_nm,
							data : parseFloat(combineData.combineDataInfo[i].data),
							poiData : []
					}
				}
				
				//POI 차트데이터 가공
				var poiDataList = [];
				for (var k=0; k<poiList.length; k++) {
					if (poiList[k] == undefined) {
						continue;
					}

					var tmpRankData = [];
					for (var i=0; i<combineData.combineDataInfo.length; i++) {
						var adm_cd = combineData.combineDataInfo[i].adm_cd;
						var poiCnt = 0;
						for (var v=0; v<poiList[k].data.length; v++) {
							if (poiList[k].data[v].tot_reg_cd.indexOf(adm_cd) != -1) {
								poiCnt++;
							}
						}
						if (poiDataList[k] == null) {
							poiDataList[k] = [];
						}

						poiDataList[k].push({"y":poiCnt, "adm_cd":adm_cd, "title":poiList[k].title});
						chartList[adm_cd].poiData.push({
							data : poiCnt,
							title : poiList[k].title
						});
						
					}
				}
				
				if (combineData.combineLayer.length) {
					title = combineData.combineLayer[0].data.option.title;
				}
				
				var chartInfo = {
						categories : categories,
						data : [
						    {name : title, data : dataList, type : "column", color : "#21aaff"},
						]
				};
				
				for (var i=0; i<poiDataList.length; i++) {
					if (poiDataList[i] == undefined) {
						continue;
					}
					var color = $policyStaticCombineMap.util.getChartColor(i);
					chartInfo.data.push( {name : poiDataList[i][0].title, data : poiDataList[i], type : "column", color : color})
				}
				
				//sort	
				var tmpChartList = [];
				var keys = Object.keys(chartList).sort(function (a, b) {
					  return chartList[b].data - chartList[a].data
				}).map(function(elem, idx, arr) {
					for (var p in chartList) {
						if (p == elem) {
							tmpChartList.push(chartList[p]);
							break;
						}
					}
				});
				chartList = tmpChartList;

				// 2016. 03. 29 j.h.Seok modify
				length = dataList.length;
				height = length * 40;
				
				if (length <= 20) {
					height = 500;
				}else {
					height = length * 50;
				}

				$("#wrapperChartScroll3").css("height", (height+50)+"px");
				$("#targetChartsDB").css("height", height+"px");

				$("#targetChartsDB").highcharts({
					chart: {
					    type: 'bar', 
					    height : height,
					    width : 480
					},
					exporting: { enabled: false },
					title: {
					    text: '' 
					},
					subtitle: {
					    text: ''
					},
					xAxis: {
					    categories: chartInfo.categories,
					    labels : { 
							rotation : 0,
							enabled: true
						}
					},
					yAxis: {
					    min: 0,
					    title: {
					    	text: ''//,  align: 'high'
					    },
					    labels: {
			                formatter:function(){return appendCommaToNumber(this.value);},
			                step: 1,
			                align: 'center',
			                overflow : 'justify'
			                //rotation : -45
			            },
	//				    showFirstLabel: true,
					    showLastLabel: false
					},
					plotOptions : {
						series : {
							cursor : "pointer",
							point : {
								events : {
									mouseOver : function() {
										var adm_cd = this.adm_cd;
										var map = $policyStaticMap.ui.mapList[0];

										for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
											map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
												if (layer.feature) {
													var e = {
															target : layer,
															utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
													};
													map.setPolyLayerMouseout(e);
													layer.unbindToolTip();

													if (layer.feature.properties.adm_cd == adm_cd) {
														map.setPolyLayerMouseover(e);
//														$policyStaticCombineMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
														$policyStaticMapDataBoard.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map, 0);
													}
												}
											});
										}
									}
								}
							}
						}
					},
					
					legend: {
						enabled : true,
						verticalAlign: "top"
					},
					tooltip: {
						shared : true,
						valueDecimals: 2,
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
								html += ' ' + this.points[i].series.name + ': <b>' + appendCommaToNumber(this.points[i].y) + '</b>';
								if (i < this.points.length-1) {
									html += "<br/>";
								}
							}
							return html;
						}
					},
					series: chartInfo.data
			    });
				$policyStaticMapDataBoard.Combine.drawGrid(chartList);
			},
			
			/**
			 * 
			 * @name         : getAnalysisIndexCombineData
			 * @description  : 시설분석형형지표의 융합정보를 가져온다.
			 * @date         : 2017. 09. 24. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mapList: 맵 정보
			 */
			getAnalysisIndexCombineData : function(mapList) {
				var tmpData = [];
				var mapA = mapList[0];
				var multiDataA = mapA.multiLayerControl.multiData;
//				this.dispTitle = "융합데이터";
//				this.dispUnit = "";
				var combineDataList = [];
				var combineDataInfo = [];
				
				multiDataA = multiDataA.sort(function(a, b) {
					return parseInt(b.data.pAdmCd) - parseInt(a.data.pAdmCd);
				});
				
				var combineLayer = deepCopy(multiDataA);
				
				//지도 A,B의 각 지역별 데이터 융합
				//기준데이터를 기준으로 연산
				for (var i=0; i<multiDataA.length; i++) {
					var featuresA = multiDataA[i].layer.features;
					for (var k=0; k<featuresA.length; k++) {
						var dataA = this.getDataInLayer(featuresA[k]);
						
						if (dataA != null) {
							var combineData = null;
							tmpDataA = null;
								
							combineDataList.push(dataA.data);
							combineDataInfo.push({
									data : dataA.data,
									adm_cd : featuresA[k].properties.adm_cd,
									adm_nm : featuresA[k].properties.adm_nm,
									data_type :  multiDataA[i].data.dataType
							});
						}
					}		
				}
				
				return {
					"combineDataList" : combineDataList,
					"combineDataInfo" : combineDataInfo,
					"combineLayer" : combineLayer
				}
			},
			////////// 2017.09.13 [개발팀] 데이터보드기능수정 END ////////////
			/**
			 * @name         : addGrid
			 * @description  : 좌, 우 수요변화 정보를 GRID로 변환
			 * @date         : 2016. 12.01. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param data
			 * @param title
			 * @param unit
			 * @param type
			 * @param year
			 */
			addGrid : function(data, title, unit, type, year) {
				var header = null;
				if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
					header = [];
					header.push("지역");
					var tmpAdmCd = [];
					for (var i=0; i<data.length; i++) {
						var Ldata = data[i].result;
						var tmpTitle = title.split("|")[i] + " (" + data[i].unit + ")"+(year[i]?", "+year[i]+"년":"");
						var tmpTitle = title.split("|")[i] + " (" + data[i].unit + ")"+(year[i]?", "+year[i]+"년":"");
						
						if(tmpTitle.length >8){
							tmpTitle = "<span style='font-size:12px'>" + tmpTitle + "</span>";
						}
						
						header.push(tmpTitle);
						
						for (var k=0; k<Ldata.length; k++) {
							tmpAdmCd.push(Ldata[k].adm_nm);
						}
					}	
					
					var codeList = tmpAdmCd.reduce(function(a,b){
						if (a.indexOf(b) < 0 ) a.push(b);
						return a;
					  },[]);
					tmpAdmCd = null;
					
					
					
					var tmpVal1 = data[0].result;
					var tmpVal2 = data[1].result;
					if(tmpVal1.length != tmpVal2.length){
						for(var i=0; i<tmpVal1.length; i++){
							var adm_nm_left = tmpVal1[i].adm_nm;
							var adm_nm_right = "";
							var bigyoFlag = false;
							for(var j=0; j<tmpVal2.length; j++){
								adm_nm_right = tmpVal2[j].adm_nm;
								if(adm_nm_left == adm_nm_right){
									bigyoFlag = true;
								}
							}
							if(!bigyoFlag){
								var map = {
										adm_nm:adm_nm_left,
										shoData : 0
								};
								data[1].result.push(map);
							}
							
						}
					}
					if(tmpVal2.length != tmpVal1.length){
						for(var i=0; i<tmpVal2.length; i++){
							var adm_nm_left = tmpVal2[i].adm_nm;
							var adm_nm_right = "";
							var bigyoFlag = false;
							for(var j=0; j<tmpVal1.length; j++){
								adm_nm_right = tmpVal1[j].adm_nm;
								if(adm_nm_left == adm_nm_right){
									bigyoFlag = true;
								}
							}
							
							if(!bigyoFlag){
								var map = {
										adm_nm:adm_nm_left,
										shoData : 0
								};
								data[0].result.push(map);
							}
							
						}
					}
					var tmpData = [];
					for (var i=0; i<codeList.length; i++) {
						var tmpRowData = [];
						tmpRowData.push(codeList[i]);
						for (var k=0; k<data.length; k++) {
							var Ldata = data[k].result;
							for (var j=0; j<Ldata.length; j++) {
								if (codeList[i] == Ldata[j].adm_nm) {
									if($.isNumeric(Ldata[j][Ldata[j].showData])){
										tmpRowData.push(appendCommaToNumber(Ldata[j][Ldata[j].showData]));
									}else{
										tmpRowData.push(Ldata[j][Ldata[j].showData]);
									}
									break;
								}
							}
						}
						tmpData.push(tmpRowData);
					}
					
				}else {	
					var Ldata = data.result;
					var title = title + " (" + unit + ")"+(year?", "+year+"년":"");
					header = ["행정동", title];
					var tmpData = [];
					for (var i=0; i<Ldata.length; i++) {
						var record = [];
						record.push(Ldata[i].adm_nm);
						record.push(Ldata[i][Ldata[i].showData]);
						tmpData.push(record);
					}
				}

				var columns = [];
				var colWidth = [];
				for (var i=0; i<header.length; i++) {
					var gridWidth = 130;
					if(i==0){
						gridWidth = 70;
					}
					columns.push({
						data:header[i],editor:false
						});
					colWidth.push(gridWidth);
				}
				var dbHeight = $(".dataSideContents").height();
				
				if (tmpData.length > 20) {
					dbHeight = tmpData.length * 25;
				}
				
				$("#dataGridDB").empty();
				var container = document.getElementById("dataGridDB"); 
				var grid = new Handsontable(container, {
					data : tmpData,
					height : dbHeight,
					colWidths : colWidth,
					colHeaders : header,
					rowHeaders : true,
					stretchH : 'all',
					contextMenu : true,
//					autoRowSize: {syncLimit: '100%'},
					autoColumnSize : true,
					className: "htCenter htMiddle",
				});
				grid.updateSettings({
				    cells: function (row, col, prop) {
				      var cellProperties = {};
				      cellProperties.readOnly = true;
				      return cellProperties;
				    }
				});
				$policyStaticMapDataBoard.ui.dataGrid = grid;
			},
			
			/**
			 * @name         : setData
			 * @description  : 좌, 우 data를 layer로 저장 처리(대화형통계)
			 * @date         : 2016. 12.01. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param data
			 */
			setData : function(data) {
				//초기화
				$policyStaticMapDataBoard.ui.layerGroup = [];
				
				var map = $policyStaticMap.ui.mapList[0];
				var layer = null;
				
				for (var i=0; i<data.length; i++) {
					var type ="normal";
				
					layer = {
							geojson : null,
							layer : [],
							legend : data[i].legend,
							param : data[i].param,
							id : data[i].id,
							admCd : data[i].adm_cd,
							data : data[i].data,
							legendObj : null,
							type : type
					};
					$policyStaticMapDataBoard.ui.layerGroup.push(layer);
				}
			},
			
			
			/**
			 * @name         : addCombineLayer
			 * @description  : 저장된 레이어 병합 처리(대화형통계)
			 * @date         : 2016. 12.01. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param id
			 * @param title
			 */
			addCombineLayer : function(id, title) {
				var map = $policyStaticMap.ui.mapList[0];
				var layer = null;
				var ids = id.split("-");
				var datas = [];
				
				
				var years = [];
				var subTitles = [];
				var units = [];
				
				for (var i=0; i<ids.length; i++) {
					var group = $policyStaticMapDataBoard.ui.layerGroup;
					var layerGroup = null;
					var data = null;
					for (var k=0; k<group.length; k++) {
						if (group[k].id == ids[i]) {
							layerGroup = group[k];
							data = group[k].data;
							datas.push(data);
							years.push(group[k].param.year);
							subTitles.push(group[k].param.title);
							units.push(group[k].param.unit);
							
							break;
						}
					}
				}
		
				
				$policyStaticMapDataBoard.ui.layerGroup.push({
					geojson : null,
					layer : [],
					legend : null,
					param : {
						title : title,
						unit : units,
						years : years,
						subTitle : subTitles
					},
					id : id,
					admCd : null,
					data : datas,
					legendObj : null
				});
			}
			
			
	};
	
	
	$policyStaticMapDataBoard.callbackFunc = {
			didMouseOverPolygon : function(event, data, type, map, map_div) {
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$policyStaticMapDataBoard.ui.createInfoTooltip(event, data, type, map, map_div);
				}
			}
			
	};
	
}(window, document));