//////// 2017.09.07 [개발팀] 융합창개발 START //////////
/**
 * 대화형 통계지도 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2017/09/07  초기 작성
 *           변경하여 정책통계지도 작성 2016.10.22
 * author :  김보민
 * version : 1.0
 * see : 
 */
(function(W, D) {
	W.$policyStaticCombineMap = W.$policyStaticCombineMap || {};
	$policyStaticCombineMap.noReverseGeoCode = true;
	$(document).ready(function() {
	//	var abs = new sop.portal.absAPI();
	//	abs.onBlockUIPopup();
		
		$policyStaticCombineMap.event.setUIEvent();
		
	});
	
	$policyStaticCombineMap.ui = {
			combineDataSet : null,
			openerMapList : [],
			cdgLayer : null,
			openerArParamList : [],
			layerGroup : null,
			namespace : "thematicMap04",//negative legend 사용을 위한 namespace
			mapList : [],
			data : null,
			layerGroup : [],
			isSameHeatMapType : false,
			heatMapIdx : [],
			reportPopup : null,
			popupWidth : 0, //2017.05.29 [개발팀] 융합창 너비
			popupHeight : 0, //2017.05.29 [개발팀] 융합창 높이
			calcData : null,
			selectedRelationPolicyMapList : [], //2017.09.20 [개발팀] 수정기능
			poiTitleNm : "",
			poiSourceNm : "",
			featureLayer : null,
			clusterLayer : null,
			circleLayer : null,
			mapBounds : null,
			isZoom : false, //2018.02.06 [개발팀]
			
			/**
			 * 
			 * @name         : initCombineMap
			 * @description  : 융합팝업창을 초기화한다.
			 * @date         : 2017. 07. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			initCombineMap : function(delegate) {
				this.delegate = delegate;
				$policyStaticCombineMap.ui.resizePopup();
				$policyStaticCombineMap.ui.createMap("mapRgn");
				$policyStaticCombineMap.ui.setBasicInfo();
				$policyStaticCombineMap.ui.setGrid();
				$policyStaticCombineMap.ui.setPolicyRelList();
				$policyStaticCombineMap.ui.setChart(false); //보고서를 위해
				
				$("#autoComment").scrollTop(0);
			},
			
			
			
			/**
			 * 
			 * @name         : setPolicyRelList
			 * @description  : 연관 정책통계지도 리스트를 조회한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 김보민
			 * @history 	 :
			 */
			setPolicyRelList : function() {
				
				var parameters = {
						idx_id : $policyStaticMap.ui.settingInfo["idx_id"],
						category_id : $policyStaticMap.ui.settingInfo["category_id"]
					};
				$.ajax({
					url : contextPath+"/ServiceAPI/policyStatic/getPolicyRelList.json",
					type:"POST",
					data: parameters,
					async: true,
					dataType:"json",
					success: function(res){
						if(res.errCd=="0"){
							var sHtml = "";
							
							$.each(res.result.rel_list,function(cnt,node){
								sHtml += "<tr class='combine_tr'>";
								sHtml += 	"<td style='text-align:left; padding-left:10px; font-weight:bold;border-right-width:0px; width:280px;'>"+node.policy_idx_nm+"</td>";
								sHtml += 	"<td class='policyLink' idx_id='"+node.idx_id+"'>링크바로가기>></td>";
								sHtml += "</tr>";
							});
							$("#relTable").html(sHtml);
						}
					},
					error: function(data){
						messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.");
						return false;
					}
				});
			},
			
			/**
			 * 
			 * @name         : resizePopup
			 * @description  : 융합팝업창의 크기를 리사이즈한다.
			 * @date         : 2017. 07. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			resizePopup : function() {
				var dWidth = $(document).width();
				var dHeight = $(document).height();
				var pWidth = dWidth-400;
				var pHeight = dHeight-200;
				var marginLeft = parseInt((dWidth-pWidth)/2);
				var marginTop = parseInt((dHeight-pHeight)/2) + 50;
				var topBarHeight = $(".bar").height();
				var dataBoardWidth = $(".policyFormArea").width();
				
				//2017-09-27 수정
				if (pWidth > 1500) {
					pWidth = 1500;
				}
				
				if (pHeight < 500) {
					pHeight = 500;
				}
				
				$(".policyStaticBox").css({
					"width" : pWidth,
					"height" : pHeight	
				});

				$(".policyMapArea").css({
					"width" : (pWidth - (dataBoardWidth+1))+"px",
					"height" : (pHeight - topBarHeight) + "px"
				});
				$(".policyFormArea").css("height", (pHeight - topBarHeight) + "px");
				
				//팝업표출
				$policyStaticCombineMap.event.popupShow();

				//스크롤을 최상으로 이동
				$(".policyFormArea").animate({
					scrollTop : "0px"
				}, 0);
				
				$("#targetGrid").parent().css("margin-right", "15px");
			},
			
			/**
			 * 
			 * @name         : setCalcData
			 * @description  : 통계연산형지표의 기준데이터 및 심볼을 설정한다.
			 * @date         : 2017. 09. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param sData  : 기준데이터(0 or 1)
			 * @param symbole: 사칙연산
			 */
			setCalcData : function(sData, symbol) {
				this.calcData = {
						stand : sData,
						symbol : symbol
				};
			},
			
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2017. 07. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			createMap : function(id) {
				var map = new sMap.map();
				map.createMap($policyStaticCombineMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = 0;
				//map.addControlEvent("movestart");
				//map.addControlEvent("moveend");
				//map.addControlEvent("zoomend");	
				//map.addControlEvent("draw");

				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($policyStaticCombineMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "equal";
				legend.linkTooltip();
				
				//타입설정버튼 숨김
				//정책통계지도 등록 시, 타입변경은 의미없음
				$("#legendPopEvent00_"+ map.legend.id).parent().hide();
				
				//사용자지정컨트롤설정
				this.map = map;
				this.mapList[map.id] = map;

				map.gMap.whenReady(function() {
					map.createHeatMap();
					$policyStaticCombineMap.ui.clear(map); //2018.02.06 [개발팀]
					$policyStaticCombineMap.ui.drawCombine();
				});
				
				map.gMap.on("moveend", function(e) {
					$policyStaticCombineMap.callbackFunc.didMapMoveEnd(e, map);
				});
				
				return map;
			},
			
			/**
			 * 
			 * @name         : drawCombine
			 * @description  : 융합정보를 지도에 표출한다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			drawCombine : function() {
				switch (parseInt(this.delegate.settingInfo["idx_type"])) {
					case 1: //수요변화지표
						this.doDemandIndexCombine(this.delegate.mapList, this.delegate.settingInfo, 1);
						break;
					case 2: //통계연산형지표
						this.doCalculateIndexCombine(this.delegate.mapList, this.delegate.settingInfo);
						break;
					case 3: //시설분석형지표
						this.doAnalysisIndexCombine(this.delegate.mapList, this.delegate.poiLayerList, this.delegate.settingInfo);
						break;
					default:
						break;
				}
				
			},
			
			/**
			 * 
			 * @name         : doCalculateIndexCombine
			 * @description  : 통계연산형지표 통계정보를 융합한다.
			 * @date         : 2017. 09. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mapList : 맵정보
			 * @param settingInfo : 설정정보
			 */
			doCalculateIndexCombine : function(mapList, settingInfo) {
				//데이터 융합 
				var combineData = this.getCalculateIndexCombineData(mapList);
				
				//범례계산
				this.setLegend("negative", [combineData.combineDataList]);
				
				//경계표출
				this.clear(this.map);
				this.drawPolygon(combineData.combineLayer, this.map);	
			},
			
			/**
			 * 
			 * @name         : doAnalysisIndexCombine
			 * @description  : 시설분석형지표 통계정보를 융합한다.
			 * @date         : 2017. 09. 24. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mapList : 맵정보
			 * @param poiList : POI목록 
			 * @param settingInfo : 설정정보
			 */
			doAnalysisIndexCombine : function(mapList, poiList, settingInfo) {
				//데이터 융합 
				var combineData = this.getAnalysisIndexCombineData(mapList);
				
				//범례계산
				this.setLegend("negative", [combineData.combineDataList]);
				
				//경계표출
				this.clear(this.map);
				this.drawPolygon(combineData.combineLayer, this.map);	
				if (combineData.mapType == "heat") {
					$policyStaticMap.ui.setLegendMode("heat", this.map);
					if (this.delegate.analysisOriginMultiData != null) {
						var map = mapList[0];
						map.multiLayerControl.multiData = this.delegate.analysisOriginMultiData;
						map.multiLayerControl.multiData["type"] = "heat";
					}					
				}
				
				//poi표출
				this.setPoiInfo(poiList, this.map);
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
				if (features != undefined && 
					features.info != undefined && 
					Object.prototype.toString.call(features.info) === "[object Array]") {
					var info = features.info[0];
					if (info == undefined) {
						return null;
					} 
					var data = info[info.showData];
					if (data == "N/A") {
						data = 0;
					}
					return {
						"data" : data,
						"info" : info,
						"dataIdx" : features.dataIdx
					}
				}
				return null;
			},
			
			/**
			 * 
			 * @name         : doDemandIndexCombine
			 * @description  : 수요변화지표 통계정보를 융합한다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mapList : 맵정보
			 * @param settingInfo : 설정정보
			 * @param type : 증감(1)/증감률(2)
			 */
			doDemandIndexCombine : function(mapList, settingInfo, type) {	
				//데이터 융합 
				var combineData = this.getDemandIndexCombineData(mapList, type);
				
				//범례계산
				this.setLegend("negative", [combineData.combineDataList]);
				
				//경계표출
				this.clear(this.map);
				this.drawPolygon(combineData.combineLayer, this.map);
				
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
			getDemandIndexCombineData : function(mapList, type) {
				var tmpData = [];
				var mapA = mapList[0];
				var mapB = mapList[1];
				var multiDataA = mapA.multiLayerControl.multiData;
				var multiDataB = mapB.multiLayerControl.multiData;
				var combineLayer = deepCopy(multiDataA);
				var combineDataList = [];
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
						
						var showData = "";
						var unit = "";
						if (dataA == null && dataB != null) {
							showData = dataB.info.showData;
							unit = dataB.info.unit;
							dataA = {
									"data" : 0,
									"info" : {"showData" : showData},
									"dataIdx" : featuresB[k].dataIdx
							};
							combineLayer[i].layer.features[k].info[0] = {"showData" : showData, "unit":unit};
							combineLayer[i].layer.features[k].info[0][showData] = "0";
						}else if (dataA != null && dataB == null) {
							showData = dataA.info.showData;
							unit = dataA.info.unit;
							dataB = {
									"data" : 0,
									"info" : {"showData" : showData},
									"dataIdx" : featuresA[k].dataIdx
							};
							combineLayer[i].layer.features[k].info[0] = {"showData" : showData, "unit":unit};
							combineLayer[i].layer.features[k].info[0][showData] = "0";
						}
						
						if (dataA != null && dataB != null) {
							showData = dataA.info.showData;
							var combineData = parseFloat((parseFloat(dataB.data) - parseFloat(dataA.data)).toFixed(1));
							switch(parseInt(type)) {
								case 1: //증감
									//this.dispTitle = $policyStaticMap.ui.settingInfo["disp_nm"]+"(증감)";
									//this.dispUnit = $policyStaticMap.ui.settingInfo["disp_unit"];
									break;
								case 2: //증감률
									//this.dispTitle = $policyStaticMap.ui.settingInfo["disp_nm"]+"(증감률)";
									//this.dispUnit = "%";
									if (parseFloat(dataA.data) == 0) {
										dataA.data = 1;
									}
									combineData = parseFloat(((combineData / parseFloat(dataA.data)) * 100).toFixed(1));
									break;
							}
							combineLayer[i].layer.features[k].info[0][showData] = combineData;
							combineDataList.push(combineData);
							combineDataInfo.push({
									data : combineData,
									adm_cd : featuresA[k].properties.adm_cd,
									adm_nm : featuresA[k].properties.adm_nm,
									dataIdx : dataA.dataIdx,
									showData : dataA.info.showData,
									unit : dataA.info.unit,
									api_id : dataA.info.api_id,
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
			
			/**
			 * 
			 * @name         : setLegend
			 * @description  : 범례를 설정한다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 범례타입
			 * @param map    : 맵 정보
			 */
			setLegend : function(type, data) {
				if (type == null) {
					type = "color";
				}
				this.map.legend.legendType = type;
				this.map.legend.valPerSlice = this.map.legend.calculateLegend(data);
			},
			
			/**
			 * 
			 * @name         : drawPolygon
			 * @description  : 폴리곤을 그린다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵 정보
			 */
			drawPolygon : function(combineData, map) {
				map.multiLayerControl.dataGeojson = [];
				var bounds = null;
				for (var k=0; k<combineData.length; k++) {
					var layer = combineData[k].layer;
					layer = map.combineStatsData(layer, true);
					map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(layer, "data"));
					
					//경계위치조정
					if (k==0) {
						bounds = map.multiLayerControl.dataGeojson[k].getBounds();
					}else {
						bounds.extend(map.multiLayerControl.dataGeojson[k].getBounds());
					}
					map.gMap.fitBounds(bounds, {
						animate : false
					});
				}
			},
			
			/**
			 * 
			 * @name         : setPoiInfo
			 * @description  : POI정보를 설정한다.
			 * @date         : 2017. 09. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param poiList: POI정보
			 * @param map : 맵정보
			 */
			setPoiInfo : function(poiList, map) {
				for (var i=0; i<poiList.length; i++) {
					if (poiList[i] == undefined) {
						continue;
					}
					var settingInfo = poiList[i].settingInfo;
					var tmpSetInfo = {
							mode : "indivisual",
							shapeCd : "1",
							colorCd : "1",
							radiusColorCd : "1",
							radius : "0",
							radiusOpacity : "20",
							heatRadius : "20",
							heatOpacity : "20"	
					};
					
					if (settingInfo != undefined) {
						tmpSetInfo = settingInfo;
					}
					
					//POI모양
					switch(parseInt(tmpSetInfo.shapeCd)) {
						case 1:
						case 2:
						case 3:
						case 4:
							if (poiList[i].data.length > $policyStaticMap.ui.defaultPoiCnt && poiList[i].adm_cd.length == 2) {
								this.drawPoi(poiList[i], tmpSetInfo, map, 2);
							}else {
								this.drawPoi(poiList[i], tmpSetInfo, map, 1);
								
								//반경정보가 있을 경우, 반경정보 표출
								if (parseInt(tmpSetInfo.radius) != 0) {
									this.drawPoiCircle(poiList[i], tmpSetInfo, map);
								}
							}
							break;
						case 5:
							this.drawPoiHeatMap(poiList[i], tmpSetInfo, map);
							break;
					}
				}
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
			 * @param poiInfo : 설정정보
			 */
			setMarker : function(dataList, iconUrl, poiInfo, type) {
				var icon = sop.icon({
					iconUrl: iconUrl,
					//shadowUrl: '/img/marker/theme_shadow.png',
					iconAnchor: [7, 7 ],
					iconSize: [ 14, 14 ],
					infoWindowAnchor: [1, -16]
				});
				var marker = sop.marker([ dataList.coor_x, dataList.coor_y ], {
					icon : icon,
					opacity : 0.7
				});
				marker.info = dataList;
				
				switch(type) {
					case 1:
						this.featureLayer.addLayer(marker);
						break;
					case 2:
						this.clusterLayer.addLayer(marker);
						break;
					default:
						this.featureLayer.addLayer(marker);
						break;
				}
					
				var html = "";
				html += '<table class="policyPoiTooltip">';
				switch (poiInfo.type) {
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
			 * @name         : drawPoi
			 * @description  : POI정보를 표출한다.
			 * @date         : 2017. 09. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param poiList: POI정보
			 * @param setInfo: 파라미터설정정보
			 * @param map : 맵정보
			 */
			drawPoi : function(poiInfo, setInfo, map, type, mapBounds) {
				var dataList = poiInfo.data;

				//2018.02.06 [개발팀]
				if (this.featureLayer == null) {
					this.featureLayer = sop.featureGroup({
						chunkedLoading : true
					});
					map.gMap.addLayer(this.featureLayer);
				}
				
				if (this.clusterLayer == null) {
					this.clusterLayer = sop.markerClusterGroup({
						chunkedLoading : true
					});
					map.gMap.addLayer(this.clusterLayer);
				}

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
				}
				
				for (var i=0; i<dataList.length; i++) {
					if (mapBounds != null && mapBounds != undefined) {
						if (mapBounds.contains(sop.utmk(dataList[i].coor_x, dataList[i].coor_y))) {
							this.setMarker(dataList[i], iconUrl, poiInfo, type);
						}
					}else {
						this.setMarker(dataList[i], iconUrl, poiInfo, type);
					}
				}
			},
			
			/**
			 * 
			 * @name         : drawPoiCircle
			 * @description  : Circle정보를 표출한다.
			 * @date         : 2017. 09. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param poiList: POI정보
			 * @param setInfo: 파라미터설정정보
			 * @param map : 맵정보
			 */
			drawPoiCircle : function(poiInfo, setInfo, map) {
				//2018.02.06 [개발팀]
				if (this.circleLayer == null) {
					this.circleLayer = sop.featureGroup({
						chunkedLoading : true
					});
					map.gMap.addLayer(this.circleLayer);
				}
				
				var dataList = poiInfo.data;
				for (var i=0; i<dataList.length; i++) {
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
					var circle = sop.circle([dataList[i].coor_x, dataList[i].coor_y], setInfo.radius, {
						color : fillColor,
						fillColor : fillColor,
						fillOpacity : setInfo.radiusOpacity / 100,
						opacity :0,
						weight : 0,
						renderer : this.renderer
					});
					this.circleLayer.addLayer(circle);
				}
			},
			
			/**
			 * 
			 * @name         : drawPoiHeatMap
			 * @description  : 열지도정보를 표출한다.
			 * @date         : 2017. 09. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param poiList: POI정보
			 * @param setInfo: 파라미터설정정보
			 * @param map : 맵정보
			 */
			drawPoiHeatMap : function(poiInfo, setInfo, map) {
				var dataList = poiInfo.data;
				var setInfo = poiInfo.settingInfo;
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
			},
			
			/**
			 * 
			 * @name         : drawGrid
			 * @description  : 표를 그린다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id     : 엘리먼트 아이디
			 * @param data	 : 데이터 정보
			 * @param type	 : 표 타입(1:많은지역/적은지역, 2:증감/증감률)
			 */
			drawGrid : function(id, data, type) {
				$(id+"Area").show();
				
				var html = "";
				switch(type) {
					case 0: //지역순위
						html += "<caption>지역순위</caption>";
						html += "<colgroup>";
						html += 	"<col width='80' />";
						html +=     "<col width='' />";
						html +=		"<col width='' />";
						html +=	"</colgroup>";
						html +=	"<tr>";
						html +=		"<th>순위</th>";
						html +=		"<th>많은 지역</th>";
						html +=		"<th>적은 지역</th>";
						html +=	"</tr>";
						for (var i=0; i<data.length; i++) {
							html += "<tr class='combine_tr'>";
							html += 	"<td>"+(i+1)+"</td>";
							html += 	"<td class='combine_td'>"+data[i].max+"</td>";
							html +=		"<td class='combine_td'>"+data[i].min+"</td>";
							html += "</tr>";
						}
						break
					case 1: //많은지역/적은지역 
						html += "<caption>지역순위</caption>";
						html += "<colgroup>";
						html += 	"<col width='80' />";
						html +=     "<col width='' />";
						html +=		"<col width='' />";
						html +=	"</colgroup>";
						html +=		"<tr>";
						html +=			"<th>순위</th>";
						html +=			"<th class='titleA'></th>";
						html +=			"<th class='titleB'></th>";
						html +=		"</tr>";
						for (var i=0; i<data.length; i++) {
							html += "<tr class='combine_tr'>";
							html += 	"<td>"+(i+1)+"</td>";
							html += 	"<td class='combine_td'>"+data[i].adm_nm+"<br/>("+data[i].data+")</td>";
							html +=		"<td class='combine_td'>"+data[i].adm_nm2+"<br/>("+data[i].rate+")</td>";
							html += "</tr>";
						}
						break;
					case 2: //증감/증감률
						html += "<caption>지역순위</caption>";
						html += "<colgroup>";
						html += 	"<col width='60' />";
						html +=     "<col width='150' />";
						html +=		"<col width='100' />";
						html += 	"<col width='' />";
						html +=	"</colgroup>";
						html +=		"<tr>";
						html +=			"<th class='addSideLine'>순위</th>";
						html +=			"<th class='addSideLine'>지역명</th>";
						html +=			"<th class='addSideLine'>행정동코드</th>";
						html +=			"<th id='denmandGridDataTitle' class='addSideLine'>값</th>"; //2018.01.09 [개발팀]
						html +=		"</tr>";
						for (var i=0; i<data.length; i++) {
							html += "<tr class='combine_tr'>";
							html +=		"<td class='addSideLine'>"+(i+1)+"</td>";
							html += 	"<td class='combine_td addSideLine'>"+data[i].adm_nm+"</td>";
							html += 	"<td class='addSideLine'>"+data[i].adm_cd+"</td>";
							html += 	"<td class='addSideLine'>"+appendCommaToNumber(data[i].data)+"</td>";
							html += "</tr>";
						}
						break;
					case 3:
						html += "<caption>지역순위</caption>";
						html += "<colgroup>";
						html += 	"<col width='60' />";
						html +=     "<col width='150' />";
						html +=		"<col width='100' />";
						html += 	"<col width='' />";
						html +=	"</colgroup>";
						html +=	"<tr>";
						html +=		"<th class='addSideLine'>순위</th>";
						html +=		"<th class='addSideLine'>지역명</th>";
						html +=		"<th class='addSideLine'>행정동코드</th>";
						html +=		"<th class='addSideLine'>값</th>";
						html +=	"</tr>";
						
						for (var k=0; k<data.length; k++) {
							var length = data[k].poiData.length + 1;
							html += "<tr class='combine_tr'>";
							html +=		"<td class='addSideLine' rowspan='"+length+"'>"+(k+1)+"</td>";
							html += 	"<td class='addSideLine' rowspan='"+length+"'>"+data[k].adm_nm+"</td>";
							html += 	"<td class='addSideLine' rowspan='"+length+"'>"+data[k].adm_cd+"</td>";
							html += 	"<td class='addSideLine' class='border'>"+appendCommaToNumber(data[k].data)+"</td>";
							html += "</tr>";
							for (var i=0; i<data[k].poiData.length; i++) {
								html += "<tr class='combine_tr'>";
								html += 	"<td class='border addSideLine'>"+appendCommaToNumber(data[k].poiData[i].data)+"</td>";
								html += "</tr>";
							}
						}
						break;
				}
				$(id).empty();
				$(id).append(html);
				$(id).parent().parent().show();
			},
			
			/**
			 * 
			 * @name         : drawChart
			 * @description  : 차트를 그린다
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id     : 엘리먼트 아이디
			 * @param chartData	: 데이터 정보
			 * @param length : 데이터 길이
			 */
			drawChart : function(id, chartData, length) {
				//차트 높이설정 
				var pointWidth = 13;
				var height = length * 25 * (chartData.data.length); //2017.09.27 수정
				if (height < 360) {
					height = 360;
					pointWidth = 20;
				}
				
				$(id).css("height", height+"px");
				$(id).highcharts(
						{
							chart : { 
								type : 'bar', 
								height : height, 
								width : 380
							},
							exporting: { enabled: false },
							title : {
								text : ''
							},
							subtitle : {
								text : ''
							},
							xAxis : {
								categories: chartData.categories,
								labels : { 
									rotation : 0,
									enabled: true
								}
							},
							yAxis : {
								title : {
									text : ''
								}
							},
							plotOptions : {
								series : {
									negativeColor : "#21AAFF",
									pointWidth: pointWidth,
									cursor : "pointer",
									point : {
										events : {
											mouseOver : function() {
												var adm_cd = this.adm_cd;
												var map = $policyStaticCombineMap.ui.map;
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
																$policyStaticCombineMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
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
							series : chartData.data
						});
			},
			
			/**
			 * 
			 * @name         : setBasicInfo
			 * @description  : 융합정보를 설정한다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setBasicInfo : function() {
				var title;
				var grade = this.delegate.settingInfo["src_inst_cd"];
				switch (parseInt(this.delegate.settingInfo["idx_type"])) {
					case 1: //수요변화지표
						title = " 수요변화형";
						this.dispUnit = $policyStaticMap.ui.settingInfo["disp_unit"];
						this.dispTitle = $policyStaticMap.ui.settingInfo["disp_nm"]+"(증감)";

						$("#autoCommentArea").show();
						$("#increasedArea").show();
						$("#increasedRateArea").show();
						$("#regionRankArea").hide();
						break;
					case 2: //통계연산형지표
						title = " 통계연산형";
						this.dispUnit = $policyStaticMap.ui.settingInfo["disp_unit"];
						this.dispTitle = $policyStaticMap.ui.settingInfo["disp_nm"];

						$("#autoCommentArea").show();
						$("#increasedArea").hide();
						$("#increasedRateArea").hide();
						$("#regionRankArea").show();
						break;
					case 3: //시설분석형지표
						title = " 시설분석형";
						this.dispUnit = $policyStaticMap.ui.settingInfo["disp_unit"];
						this.dispTitle = $policyStaticMap.ui.settingInfo["disp_nm"];

						$("#autoCommentArea").show();
						$("#increasedArea").hide();
						$("#increasedRateArea").hide();
						$("#regionRankArea").hide();
						break;
					default:
						break;
				}
				
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
				//타이틀 생성
				title += " 정책통계지도 작성 > "+ $policyStaticMap.ui.settingInfo["policy_idx_nm"];
				$("#popupTitle").html(title);
				
				//대상지역 설정
				var region = $("#naviTitle").html();
				var boundLevel = $("#boundLevelTitle option:selected").text();
				var regionTitle = region + " - " + boundLevel;
				$("#regionTitle").html(regionTitle);
				
				//주요지표설정
				
				switch(parseInt(data1.data_div)) {
					case 2:  // KOSIS 데이터
						$("#dataA_title").html(sMap_param1.showTitle+" ("+sMap_param1.unit+")"+" ("+sCall_param1.kosis_data_year+")");
						break;
					case 3:  // 사용자 데이터
						if (sMap_param1.unit == "") {
							$("#dataA_title").html(sMap_param1.showTitle+" ("+$("#policySelectBox_1").val()+")");
						} else {
							$("#dataA_title").html(sMap_param1.showTitle+" ("+sMap_param1.unit+")"+" ("+$("#policySelectBox_1").val()+")");
						}
						break;
					case 4: // 공공 데이터
					case 5: //LBDMS 데이터
						$("#dataA_title").html(sMap_param1.showTitle);
						break;
					default : // census 데이터
						//20170131 김정은 주무관님 요청에 의하여 leekh 년도제거
						//$("#dataA_title").html(sMap_param1.showTitle+" ("+sMap_param1.unit+")"+" ("+sCall_param1.year+")");
						$("#dataA_title").html(sMap_param1.showTitle+" ("+sMap_param1.unit+")");
						break;
				}
				
				//주요지표설정
				switch(parseInt(data2.data_div)) {
					case 2:  // KOSIS 데이터
						$("#dataB_title").html(sMap_param2.showTitle+" ("+sMap_param2.unit+")"+" ("+sCall_param2.kosis_data_year+")");
						break;
					case 3:  // 사용자 데이터
						if (sMap_param2.unit == "") {
							$("#dataB_title").html(sMap_param2.showTitle+" ("+$("#policySelectBox_2").val()+")");
						} else {
							$("#dataB_title").html(sMap_param2.showTitle+" ("+sMap_param2.unit+")"+" ("+$("#policySelectBox_2").val()+")");
						}
						break;
					case 4: // 공공 데이터
					case 5: //LBDMS 데이터
						$("#dataB_title").html(sMap_param2.showTitle);
						break;
					default : // census 데이터
						$("#dataB_title").html(sMap_param2.showTitle+" ("+sMap_param2.unit+")");
						break;
				}
				
				//출처설정
				//20170131 김정은 주무관님 요청에 의하여 leekh 년도추가 start
//				$("#dataA_origin").html(data1.source");		//원본소스
				var strCallParamYear = "";
				var strCallParamYear2 = "";
				if (sCall_param1.year!= null){
					strCallParamYear = "(" + sCall_param1.year+ ")"
				}
				$("#dataA_origin").html(data1.source + strCallParamYear);
				
				if (sCall_param2.year != null){
					strCallParamYear2 = "(" + sCall_param2.year+ ")"
				}
				
				$("#dataB_origin").html(data2.source + strCallParamYear2);
				//20170131 김정은 주무관님 요청에 의하여 leekh 년도추가 end
				
				if (data2.data_type == "04" || data2.data_type == "05") {
					$("#dataB_title").html($policyStaticCombineMap.ui.poiTitleNm);
					$("#dataB_origin").html($policyStaticCombineMap.ui.poiSourceNm);
				}
				//기관설정
				switch (parseInt(grade)) {
					case 1:
						grade = "통계청";
						$("#inst_title").css("background", "#ff0000");
						break;
					case 2:
						grade = "지자체";
						$("#inst_title").css("background", "#0099ff");
						break;
					case 3:
						grade = "공공데이터";
						$("#inst_title").css("background", "#ff0000");
						$("#gongDataArea").show();
						break;
					default:
						grade = "지자체";
						$("#inst_title").css("background", "#ff0000");
						break;
				}
				$("#inst_title").html(grade);
				
				//정책스토리 텍스트 입력
				$("#pCtgrSelectBox").val($policyStaticMap.ui.settingInfo["category_id"]);
				$("#pTitle").val($policyStaticMap.ui.settingInfo["policy_idx_nm"]);
				$("#writeUser").html($policyStaticMap.ui.settingInfo["usr_id"]);
				$("#pCtgrTitle").val($("#pCtgrSelectBox option:selected").html());

				if ($policyStaticMap.ui.loginUserId == $policyStaticMap.ui.settingInfo["usr_id"]){
					$("#modify_bt").show();
					$("#delete_bt").show();
				} else {
					$("#modify_bt").hide();
					$("#delete_bt").hide();
				}
			},
			
			/**
			 * 
			 * @name         : setGrid
			 * @description  : 데이터보드 표 정보를 설정한다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setGrid : function() {
				//지역순위 정보 초기화
				if ($(".combine_tr").length) {
					$(".combine_tr").remove();
				}
				
				$("#increasedPlusTableArea").hide();
				$("#increasedMinusTableArea").hide();
				$("#regionRankTableArea").hide();
				for (var i=1; i<=5; i++) {
					$("#extraRankArea"+i).hide();
				}
				
				var settingInfo = this.delegate.settingInfo;
				var unit = settingInfo.disp_unit;
				
				switch (parseInt(settingInfo["idx_type"])) {
					case 1: //수요변화지표
						var combineDataA = this.getDemandIndexCombineData(this.delegate.mapList, 1);
						var combineDataB = this.getDemandIndexCombineData(this.delegate.mapList, 2);
						
						combineDataA.combineDataInfo = combineDataA.combineDataInfo.sort(function(a, b) {
							return parseFloat(b.data) - parseFloat(a.data);
						});
						
						combineDataB.combineDataInfo = combineDataB.combineDataInfo.sort(function(a, b) {
							return parseFloat(b.data) - parseFloat(a.data);
						});

						var arithmeticData = null; //증감
						var arithmeticRate = null; //증감률
						var length = combineDataA.combineDataInfo.length;
						
						//행정구역이 작을 경우, 가장많은지역 및 가장적은지역의 갯수를 조절한다.
						//5개 미만 - 가장많은지역 1개, 가장적은지역 1개
						//9개 미만 - 가장많은지역 2개,가장적은지역 2개
						//이외 - 가장많은지역 3개, 가장적은지역 3개
						var listCnt = 1;
						if (length < 5) {
							listCnt = 1;
						}else if (combineDataA.combineDataInfo.length < 9) {
							listCnt = 2;
						}else {
							listCnt = 3;
						}
						
						//증가/감소 데이터 셋팅
						var arithmeticPlusData = [];
						var arithmeticMinusData = [];
						for (var i=0; i<combineDataA.combineDataInfo.length; i++) {
							if (parseFloat(combineDataA.combineDataInfo[i].data) >= 0) {
								arithmeticPlusData.push(combineDataA.combineDataInfo[i]);
							}else {
								arithmeticMinusData.push(combineDataA.combineDataInfo[i]);
							}
						}
						
						//증가율/감소율 데이터 셋팅
						var arithmeticPlusRate = [];
						var arithmeticMinusRate = [];
						for (var i=0; i<combineDataB.combineDataInfo.length; i++) {
							if (parseFloat(combineDataB.combineDataInfo[i].data) >= 0) {
								arithmeticPlusRate.push(combineDataB.combineDataInfo[i]);
							}else {
								arithmeticMinusRate.push(combineDataB.combineDataInfo[i]);
							}
						}
						
						var dataType = null;
						var tmpArithmeticPlusData = [];
						var tmpArithmeticMinusData = [];
						var tmpArithmeticPlusRate = [];
						var tmpArithmeticMinusRate = [];
						
						for (var i=0; i<listCnt; i++) {
							//증가데이터
							if (arithmeticPlusData.length > 0 && i < arithmeticPlusData.length) {
								tmpArithmeticPlusData.push({
										adm_nm : arithmeticPlusData[i].adm_nm,
										data : appendCommaToNumber(arithmeticPlusData[i].data) + unit,
										originData : arithmeticPlusData[i],
								});
							}
							
							//감소데이터
							if (arithmeticMinusData.length > 0 && i < arithmeticMinusData.length) {
								tmpArithmeticMinusData.push({
										adm_nm : arithmeticMinusData[arithmeticMinusData.length-(1+i)].adm_nm,
										data : appendCommaToNumber(arithmeticMinusData[arithmeticMinusData.length-(1+i)].data) + unit,
										originData : arithmeticMinusData[arithmeticMinusData.length-(1+i)],
								});
							}
							
							//증가율데이터
							if (arithmeticPlusRate.length > 0 && i < arithmeticPlusRate.length) {
								tmpArithmeticPlusRate.push({
										adm_nm : arithmeticPlusRate[i].adm_nm,
										data : appendCommaToNumber(arithmeticPlusRate[i].data) + "%",
										originData : arithmeticPlusRate[i]
								});
							}
							
							//감소율데이터
							if (arithmeticMinusRate.length > 0 && i < arithmeticMinusRate.length) {
								tmpArithmeticMinusRate.push({
										adm_nm : arithmeticMinusRate[arithmeticMinusRate.length-(1+i)].adm_nm,
										data : appendCommaToNumber(arithmeticMinusRate[arithmeticMinusRate.length-(1+i)].data) + "%",
										originData : arithmeticMinusRate[arithmeticMinusRate.length-(1+i)]
								});
							}
													
							if (i==0) {
								dataType = arithmeticPlusData.data_type;
							}
						}
						
						var arithmeticData = {
								max : tmpArithmeticPlusData,
								min : tmpArithmeticMinusData
						};
						
						var arithmeticRate = {
								max : tmpArithmeticPlusRate,
								min : tmpArithmeticMinusRate
						};
						
						var plusData = [], minusData = [];
						for (var i=0; i<tmpArithmeticPlusData.length; i++) {
							plusData.push({
								adm_nm : tmpArithmeticPlusData[i].adm_nm,
								data : tmpArithmeticPlusData[i].data,
								adm_nm2 : tmpArithmeticPlusRate[i].adm_nm,
								rate : tmpArithmeticPlusRate[i].data
							});
						}
						
						for (var i=0; i<tmpArithmeticMinusData.length; i++) {
							minusData.push({
								adm_nm : tmpArithmeticMinusData[i].adm_nm,
								data : tmpArithmeticMinusData[i].data,
								adm_nm2 : tmpArithmeticMinusRate[i].adm_nm,
								rate : tmpArithmeticMinusRate[i].data
							});
						}
						
						if (tmpArithmeticPlusData.length > 0) {
							this.drawGrid("#increasedPlusTable", plusData, 1);
							$("#increasedPlusTable").find(".titleA").html("증가");
							$("#increasedPlusTable").find(".titleB").html("증가율");
						}
						
						if (tmpArithmeticMinusData.length > 0) {
							this.drawGrid("#increasedMinusTable", minusData, 1);
							$("#increasedMinusTable").find(".titleA").html("감소");
							$("#increasedMinusTable").find(".titleB").html("감소율");
						}
						
						this.setPolicyStory(parseInt(settingInfo["idx_type"]), arithmeticData, arithmeticRate);
					
						break;
					case 2: //통계연산형지표
						var combineData = this.getCalculateIndexCombineData(this.delegate.mapList);
						combineData.combineDataInfo = combineData.combineDataInfo.sort(function(a, b) {
							return parseFloat(b.data) - parseFloat(a.data);
						});
						
						var arRankData = []; //순위정보
						var length = combineData.combineDataInfo.length;
						
						//행정구역이 작을 경우, 가장많은지역 및 가장적은지역의 갯수를 조절한다.
						//5개 미만 - 가장많은지역 1개, 가장적은지역 1개
						//9개 미만 - 가장많은지역 2개,가장적은지역 2개
						//이외 - 가장많은지역 3개, 가장적은지역 3개
						var listCnt = 1;
						if (length < 5) {
							listCnt = 1;
						}else if (combineData.combineDataInfo.length < 9) {
							listCnt = 2;
						}else {
							listCnt = 3;
						}
						
						var dataType = null;
						for (var i=0; i<listCnt; i++) {
							var maxRankData = combineData.combineDataInfo[i];
							var minRankData = combineData.combineDataInfo[length-(1+i)];
							arRankData.push({
								max : maxRankData.adm_nm + "</br>(" + appendCommaToNumber(maxRankData.data) + unit + ")", 
								min : minRankData.adm_nm + "</br>(" + appendCommaToNumber(minRankData.data) + unit + ")",
								maxData : maxRankData,
								minData : minRankData
							});
							if (i==0) {
								dataType = maxRankData.data_type;
							}
						}
						
						this.drawGrid("#regionRankTable", arRankData, 0);
						$(".extraRankArea").hide();
						this.setPolicyStory(parseInt(settingInfo.idxType));
						break;
					case 3: //시설분석형지표
						var combineData = this.getAnalysisIndexCombineData(this.delegate.mapList);
						var poiList = this.delegate.poiLayerList;
						var length = combineData.combineDataInfo.length;
						
						//지역별 POI 수 카운트
						var arRanInfo = [];
						for (var k=0; k<poiList.length; k++) {
							if (poiList[k] == undefined) {
								continue;
							}
							var tmpRankData = [];
							for (var i=0; i<combineData.combineDataInfo.length; i++) {
								var adm_cd = combineData.combineDataInfo[i].adm_cd;
								var adm_nm = combineData.combineDataInfo[i].adm_nm;
								var data_type = combineData.combineDataInfo[i].data_type;
								var showData = combineData.combineDataInfo[i].showData;
								var poiCnt = 0;
								var tmpPoiCntList = [];
								for (var v=0; v<poiList[k].data.length; v++) {
									if (poiList[k].data[v].tot_reg_cd.indexOf(adm_cd) != -1) {
										poiCnt++;
									}
								}
									
								var tmpRankInfo = {
									   adm_cd : adm_cd,
									   adm_nm : adm_nm,
									   data : 0,
									   poiCnt : 0,
									   avg : 0,
									   data_type : data_type,
									   title : poiList[k].title
								};
	
								tmpRankInfo.data = parseFloat(combineData.combineDataInfo[i].data);
								tmpRankInfo.poiCnt = poiCnt;
									
								//POI 한개당 통계값 계산
								if (poiCnt != 0 && 
									parseFloat(combineData.combineDataInfo[i].data) != 0) {
									tmpRankInfo.avg = parseFloat((parseFloat(combineData.combineDataInfo[i].data) / poiCnt).toFixed(1));
								}else {
									tmpRankInfo.avg = 0;
								}
								tmpRankData.push(tmpRankInfo);
							}
							arRanInfo.push(tmpRankData);
						}
						
						//데이터 정렬
						for (var i=0; i<arRanInfo.length; i++) {
							arRanInfo[i] = arRanInfo[i].sort(function(a, b) {
								return parseFloat(b.avg) - parseFloat(a.avg); //2018.01.09 [개발팀] sort변경
							});
						}
						
						//행정구역이 작을 경우, 가장많은지역 및 가장적은지역의 갯수를 조절한다.
						//5개 미만 - 가장많은지역 1개, 가장적은지역 1개
						//9개 미만 - 가장많은지역 2개,가장적은지역 2개
						//이외 - 가장많은지역 3개, 가장적은지역 3개
						var listCnt = 1;
						if (length < 5) {
							listCnt = 1;
						}else if (combineData.combineDataInfo.length < 9) {
							listCnt = 2;
						}else {
							listCnt = 3;
						}
						
						var dataType = null;
						for (var k=0; k<arRanInfo.length; k++) {
							var arRankData = [];
							for (var i=0; i<listCnt; i++) {
								var maxRankData = arRanInfo[k][i];
								var minRankData = arRanInfo[k][length-(1+i)];
								arRankData.push({
									max : maxRankData.adm_nm + "</br>(" + appendCommaToNumber(maxRankData.avg) + unit + "/1개소)", 
									min : minRankData.adm_nm + "</br>(" + appendCommaToNumber(minRankData.avg) + unit + "/1개소)",
									maxData : maxRankData,
									minData : minRankData
								});
								if (i==0) {
									dataType = maxRankData.data_type;
								}
							}

							//표 타이틀 설정
							var title = arRanInfo[k][0].title + " 대비 통계정보";
							$("#extraRankArea"+(k+1)+" span").html(title);
							this.drawGrid("#extraRankTable"+(k+1), arRankData, 0);
							$("#extraRankArea"+(k+1)).show();
							
							this.setPolicyStory(parseInt(settingInfo.idxType));
						}
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : getCalculateIndexCombineData
			 * @description  : 통계연산형지표의 융합정보를 가져온다.
			 * @date         : 2017. 09. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mapList: 맵 정보
			 */
			getCalculateIndexCombineData : function(mapList) {
				var tmpData = [];
				var mapA = mapList[0];
				var mapB = mapList[1];
				var multiDataA = mapA.multiLayerControl.multiData;
				var multiDataB = mapB.multiLayerControl.multiData;
				var combineDataList = [];
				var combineDataInfo = [];

				multiDataA = multiDataA.sort(function(a, b) {
					return parseInt(b.data.pAdmCd) - parseInt(a.data.pAdmCd);
				});
				
				multiDataB = multiDataB.sort(function(a, b) {
					return parseInt(b.data.pAdmCd) - parseInt(a.data.pAdmCd);
				});
				
				var combineLayer = deepCopy(multiDataA);
				
				//지도 A,B의 각 지역별 데이터 융합
				//기준데이터를 기준으로 연산
				for (var i=0; i<multiDataA.length; i++) {
					var featuresA = multiDataA[i].layer.features;
					var featuresB = multiDataB[i].layer.features;
					for (var k=0; k<featuresA.length; k++) {
						var dataA = this.getDataInLayer(featuresA[k]);
						var dataB = this.getDataInLayer(featuresB[k]);
						
						switch(parseInt($policyStaticMap.ui.settingInfo["nomfrm_cd"])) {
							case 1:
							case 2:
								if (dataA == null && dataB != null) {
									dataA = {
											"data" : 0,
											"info" : {showData : "cnt"},
											"dataIdx" : featuresB[k].dataIdx
									};
									combineLayer[i].layer.features[k].info[0] = {showData : "cnt", cnt : 0};
								}else if (dataA != null && dataB == null) {
									dataB = {
											"data" : 0,
											"info" : {showData : "cnt"},
											"dataIdx" : featuresA[k].dataIdx
									};
									combineLayer[i].layer.features[k].info[0] = {showData : "cnt", cnt : 0};
								}
								break;
							case 3:
							case 4:
								if ((dataA == null && dataB != null) ||
									(dataA != null && dataB == null)) {
									combineLayer[i].layer.features[k].info = [];
								}
								break;
							default:
								break;
						}
						
						if (dataA != null && dataB != null) {
							var combineData = null;
							tmpDataA = null;
							tmpDataB = null;
							
							//기준설정
							if (parseInt($policyStaticMap.ui.settingInfo["nomfrm_base_map_div"]) == 1) {
								tmpDataA = parseFloat(dataA.data);
								tmpDataB = parseFloat(dataB.data);
							}else {
								tmpDataA = parseFloat(dataB.data);
								tmpDataB = parseFloat(dataA.data);
							}
								
							switch(parseInt($policyStaticMap.ui.settingInfo["nomfrm_cd"])) {
								case 1: //더하기(+)
									combineData = parseFloat((tmpDataA + tmpDataB).toFixed(1));
									break;
								case 2: //빼기(-)
									combineData = parseFloat((tmpDataA - tmpDataB).toFixed(1));
									break;
								case 3: //곱하기(*)
									combineData = parseFloat((tmpDataA * tmpDataB).toFixed(1));
									break;
								case 4: //나누기(/)
									combineData = parseFloat((tmpDataA / tmpDataB).toFixed(1));
									break;
								default:
									break;
							}
							
							combineLayer[i].layer.features[k].info[0] = {showData : "cnt", cnt : combineData};
							combineDataList.push(combineData);
							combineDataInfo.push({
									data : combineData,
									adm_cd : featuresA[k].properties.adm_cd,
									adm_nm : featuresA[k].properties.adm_nm,
									dataIdx : dataA.dataIdx,
									showData : dataA.info.showData,
									unit : dataA.info.unit,
									api_id : dataA.info.api_id,
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
									dataIdx : dataA.dataIdx,
									showData : dataA.info.showData,
									unit : dataA.info.unit,
									api_id : dataA.info.api_id,
									data_type :  multiDataA[i].data.dataType
							});
						}
					}		
				}
				
				var mapType = "color";
				if (mapA.multiLayerControl.multiData.type != undefined && 
					mapA.multiLayerControl.multiData.type == "heat") {
					mapType = "heat";
				} 
				
				return {
					"combineDataList" : combineDataList,
					"combineDataInfo" : combineDataInfo,
					"combineLayer" : combineLayer,
					"mapType" : mapType
				}
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 정책통계 스토리를 설정한다.
			 * @date         : 2017. 08. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 지표타입
			 * @param dataA  : 증감데이터
			 * @param dataB  : 증감율데이터 
			 */
			setPolicyStory : function(type, dataA, dataB) {
				$("#autoComment").empty();
				$("#autoComment").show();
				$("#autoComment").html("<div id='idxContent' contenteditable='false'>"+$policyStaticMap.ui.settingInfo["policy_idx_content"]+"</div>");

				var html = "";
				switch(type) {
					case 1: //수요변화지표
						var dataType = "";
						var maxARegionList = [];
						var minARegionList = [];
						var maxBRegionList = [];
						var minBRegionList = [];
						var unit = $policyStaticMap.ui.settingInfo.disp_unit;
						
						html += "<div>";
						if ($("#idxContent").html() != "") {
							html += "</br>";
						}
						
						//증가데이터 설정
						if (dataA.max.length > 0) {
							for (var i=0; i<dataA.max.length; i++) {
								if (i==0) {
									title = $policyStaticCombineMap.util.getTitleWithShowData(dataA.max[i].originData.api_id, dataA.max[i].originData.showData);
								}
								maxARegionList.push(dataA.max[i].adm_nm + " ("+dataA.max[i].data +")");
							}
							
							html += title;
							html +=	" 증가가 가장 큰 지역은 ";
							html += "<a style='font-weight:bold;color:#ff0000;'>&#60;" + maxARegionList.join(", ") + "&#62;</a>";
							html += " 순입니다.</br>";
						}
						
						//감소데이터 설정
						if (dataA.min.length > 0) {
							for (var i=0; i<dataA.min.length; i++) {
								if (i==0) {
									title = $policyStaticCombineMap.util.getTitleWithShowData(dataA.min[i].originData.api_id, dataA.min[i].originData.showData);
								}
								minARegionList.push(dataA.min[i].adm_nm + " ("+dataA.min[i].data +")");
							}
							
							html += title;
							html += " 감소가 가장 큰 지역은 ";
							html += "<a style='font-weight:bold;color:#ff0000;'>&#60;" + minARegionList.join(", ") + "&#62;</a>";
							html += " 순입니다.</br>";
						}
						
						//html += "</br></br>";
						
						//증가율 데이터 설정
						if (dataB.max.length > 0) {
							for (var i=0; i<dataB.max.length; i++) {
								if (i==0) {
									title = $policyStaticCombineMap.util.getTitleWithShowData(dataB.max[i].originData.api_id, dataB.max[i].originData.showData);
								}
								maxBRegionList.push(dataB.max[i].adm_nm + " ("+dataB.max[i].data +")");
							}
							
							html += title;
							html +=	" 증가율이 가장 큰 지역은 ";
							html += "<a style='font-weight:bold;color:#ff0000;'>&#60;" + maxBRegionList.join(", ") + "&#62;</a>";
							html += " 순입니다.</br>";
						}
						
						//감소율 데이터 설정
						if (dataB.min.length > 0) {
							for (var i=0; i<dataB.min.length; i++) {
								if (i==0) {
									title = $policyStaticCombineMap.util.getTitleWithShowData(dataB.min[i].originData.api_id, dataB.min[i].originData.showData);
								}
								minBRegionList.push(dataB.min[i].adm_nm + " ("+dataB.min[i].data+")");
							}
							
							html += title;
							html += " 감소율이 가장 큰 지역은 ";
							html += "<a style='font-weight:bold;color:#ff0000;'>&#60;" + minBRegionList.join(", ") + "&#62;</a>";
							html += " 순입니다.";
						}
						$("#autoComment").append(html);
						break;
					case 2: //통계연산형지표
						break;
					case 3: //시설분석형지표
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : changeChartAndGrid
			 * @description  : 그래프/표 보기를 수행한다.
			 * @date         : 2017. 08. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param idx    : 인덱스정보
			 */
			changeChartAndGrid : function(idx) {
				switch(idx) {
					case 1: //차트영역
						$("#wrapperGridScroll").hide();
						$("#wrapperChartScroll2").show();
						break;
					case 2: //표영역
						$("#wrapperChartScroll2").hide();
						$("#wrapperGridScroll").show();
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : clear
			 * @description  : 지도경계정보를 초기화한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵 정보
			 */
			clear : function(map) {
				if (map.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].remove();
					}
					map.multiLayerControl.dataGeojson = [];
				}
				
				map.gMap.eachLayer(function(layer) {
					if (layer._layer) {
						_layer.remove();
					}
				});
				
				
				//마커 초기화
				if (this.featureLayer != null) {
					this.featureLayer.clearLayers();
					this.featureLayer = null;
				}
				
				if (this.clusterLayer != null) {
					this.clusterLayer.clearLayers();
					this.clusterLayer = null;
				}
				
				if (this.circleLayer != null) {
					this.circleLayer.clearLayers();
					this.circleLayer = null;
				}
				
				this.mapBounds = null;
				
			},
			
			/**
			 * 
			 * @name         : setChart
			 * @description  : 데이터보드 차트 정보를 설정한다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param isRefesh : true일 경우, 경계재설정 false 일 경우, 차트만 draw
			 */
			setChart : function(isRefesh) {
				var settingInfo = this.delegate.settingInfo;
				switch (parseInt(settingInfo["idx_type"])) {
					case 1: //수요변화지표
						$(".demandIdx_stepBox").show();
						var type = "1";
						var title = "";
						var categories = [];
						var dataList = [];
						$("input[name='demandInx_radio']").each(function() {
							if ($(this).attr("checked") == "checked") {
								type = $(this).val();
							}
						});
						
						switch(parseInt(type)) {
							case 1: //증감
								this.dispTitle = $policyStaticMap.ui.settingInfo["disp_nm"]+"(증감)";
								this.dispUnit = $policyStaticMap.ui.settingInfo["disp_unit"];
								break;
							case 2: //증감률
								this.dispTitle = $policyStaticMap.ui.settingInfo["disp_nm"]+"(증감률)";
								this.dispUnit = "%";
								break;
						}
						var combineData = this.getDemandIndexCombineData(this.delegate.mapList, type);
						
						//sort
						combineData.combineDataInfo = combineData.combineDataInfo.sort(function(a, b) {
							return parseFloat(b.data) - parseFloat(a.data); //2018.01.09 [개발팀] sort변경
						});

						for (var i=0; i<combineData.combineDataInfo.length; i++) {
							if (combineData.combineDataInfo[i].adm_cd.length > 7) {
								categories.push(combineData.combineDataInfo[i].adm_cd);
							}else {
								var adm_nm = combineData.combineDataInfo[i].adm_nm;
								var admNmList = adm_nm.split(" ");
								adm_nm = admNmList[admNmList.length-1];
								categories.push(adm_nm);
							}
							dataList.push({"y":combineData.combineDataInfo[i].data, "dataIdx":combineData.combineDataInfo[i].dataIdx, "adm_cd":combineData.combineDataInfo[i].adm_cd});
						}
						switch(parseInt(type)) {
							case 1:
								title = $policyStaticMap.ui.settingInfo["disp_nm"]+"(증감)";
								break;
							case 2:
								title = $policyStaticMap.ui.settingInfo["disp_nm"]+"(증감률)";
								break;
						}
						var chartInfo = {
								categories : categories,
								data : [
								    {name : title, data : dataList, type : "column", color : "#FFA333"},
								]
						};

						this.drawChart("#targetCharts2", chartInfo, dataList.length);
						this.drawGrid("#targetGrid", combineData.combineDataInfo, 2);
						
						//2018.01.09 [개발팀]
						switch(parseInt(type)) {
							case 1:
								$("#denmandGridDataTitle").html("증감("+this.dispUnit+")");
								break;
							case 2:
								$("#denmandGridDataTitle").html("증감률(%)");
								break;
						}
						
						if (isRefesh) {
							this.setLegend("negative", [combineData.combineDataList]);
							this.clear(this.map);
							this.drawPolygon(combineData.combineLayer, this.map);
						}
						break;
					case 2: //통계연산형
						$(".demandIdx_stepBox").hide();
						
						var title = $policyStaticMap.ui.settingInfo["disp_nm"];
						var categories = [];
						var dataList = [];
						var combineData = this.getCalculateIndexCombineData(this.delegate.mapList);
						
						//sort
						combineData.combineDataInfo = combineData.combineDataInfo.sort(function(a, b) {
							return parseFloat(b.data) - parseFloat(a.data); //2018.01.09 [개발팀] sort변경
						});
						
						for (var i=0; i<combineData.combineDataInfo.length; i++) {
							if (combineData.combineDataInfo[i].adm_cd.length > 7) {
								categories.push(combineData.combineDataInfo[i].adm_cd);
							}else {
								var adm_nm = combineData.combineDataInfo[i].adm_nm;
								var admNmList = adm_nm.split(" ");
								adm_nm = admNmList[admNmList.length-1];
								categories.push(adm_nm);
							}
							dataList.push({"y":combineData.combineDataInfo[i].data, "adm_cd":combineData.combineDataInfo[i].adm_cd});
						}
	
						var chartInfo = {
								categories : categories,
								data : [
								    {name : title, data : dataList, type : "column", color : "#FFA333"},
								]
						};
						
						this.drawChart("#targetCharts2", chartInfo, dataList.length);
						this.drawGrid("#targetGrid", combineData.combineDataInfo, 2);
						
						if (isRefesh) {
							this.setLegend("negative", [combineData.combineDataList]);
							this.clear(this.map);
							this.drawPolygon(combineData.combineLayer, this.map);
						}
						break;
					case 3: //시설분석형
						$(".demandIdx_stepBox").hide();
						
						var title = $policyStaticMap.ui.settingInfo["disp_nm"];
						var categories = [];
						var dataList = [];
						var chartList = {};
						var combineData = this.getAnalysisIndexCombineData(this.delegate.mapList);
						var poiList = this.delegate.poiLayerList;
						
						//sort
						combineData.combineDataInfo = combineData.combineDataInfo.sort(function(a, b) {
							return parseFloat(b.data) - parseFloat(a.data); //2018.01.09 [개발팀] sort변경
						});
						
						//색상지도 차트데이터 가공
						for (var i=0; i<combineData.combineDataInfo.length; i++) {
							if (combineData.combineDataInfo[i].adm_cd.length > 7) {
								categories.push(combineData.combineDataInfo[i].adm_cd);
							}else {
								var adm_nm = combineData.combineDataInfo[i].adm_nm;
								var admNmList = adm_nm.split(" ");
								adm_nm = admNmList[admNmList.length-1];
								categories.push(adm_nm);
							}
							dataList.push({"y":parseFloat(combineData.combineDataInfo[i].data), "adm_cd":combineData.combineDataInfo[i].adm_cd});
							chartList[combineData.combineDataInfo[i].adm_cd] = {
									adm_cd : combineData.combineDataInfo[i].adm_cd,
									adm_nm : combineData.combineDataInfo[i].adm_nm,
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
						
						this.drawChart("#targetCharts2", chartInfo, dataList.length);
						this.drawGrid("#targetGrid", chartList, 3);
						break;
					default:
						break;
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
				var html = "";
				if (type == "data") {
					var title = $policyStaticCombineMap.ui.dispTitle;
					var unit = $policyStaticCombineMap.ui.dispUnit;
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
			},
			
			/**
			 * 
			 * @name         : kosisTooltip
			 * @description  : kosis 툴팁을 설정한다.
			 * @date         : 2017. 08. 28. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 통계데이터정보
			 * @param title  : 표출 타이틀
			 * @param unit   : 표출단위
			 */			
			kosisTooltip : function(data, title, unit) {
				var html = "<table style='margin:10px;'>";
				if (data.properties.adm_nm !== undefined) {
					html += "<tr><td class='admName'>"
						 + data.properties.adm_nm 
						 + "</td></tr>"
						 + "<tr style='height:5px'></tr>";
				}
				
				if(data.info[0] != null && data.info[0] != undefined && data.info[0] != 'NaN') {
					var value = appendCommaToNumber(data.info[0]);
					html += "<tr><td class='statsData'>" + value;
				} else {
					html += "<tr><td class='statsData'>-";
				}
				
				if (data.info[1] != undefined) {
					html += " (" + data.info[1] + ")";
				}
			    html += "</td></tr>";
			    html += "</table>";
			    
			    return html;
			},	
			
			/**
			 * 
			 * @name         : userDataTooltip
			 * @description  : 나의데이터 툴팁을 설정한다.
			 * @date         : 2017. 08. 28. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 통계데이터정보
			 * @param title  : 표출 타이틀
			 * @param unit   : 표출단위
			 */	
			userDataTooltip : function(data, title, unit) {
				var html = "<table style='margin:10px;'>";
				html += "<tr><td class='admName'>"
					 + data.properties.adm_nm 
					 + "</td></tr>"
					 + "<tr style='height:5px'></tr>"
					 + "<tr>"
					 + "<td style='font-size:12px;padding-left:5px;'>"
					 
				if (unit != null && unit.length > 0) {
					html += title + " : " + data.info[0].data_cnt + " ("+unit+")";
				}else {
					html += title + " : " + data.info[0].data_cnt;
				}
			    html += "</td>";
					 + "<td style='font-size:12px;padding-left:5px;'>" + title + " : " + data.info[0].data_cnt + "</td>"
					 + "</tr>";
				
				//집계구 일경우
				if (data.properties.adm_cd.length > 7) {
					html += "<tr>";
					html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
					html += "</tr>";
				}
				html += "</table>";
				
				return html;
			},
			
			/**
			 * 
			 * @name         : censusDataTooltip
			 * @description  : 센서스 툴팁을 설정한다.
			 * @date         : 2017. 08. 28. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 통계데이터정보
			 * @param title  : 표출 타이틀
			 * @param unit   : 표출단위
			 */	
			censusDataTooltip : function(data, title, unit) {
				var html = "<table style='margin:10px;'>";
				for (var i = 0; i < data.info.length; i++) {
					var tmpData = data.info[i];
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
					
					if (tmpData.showData != undefined && tmpData.showData.length > 0) {
						var value = appendCommaToNumber(tmpData[tmpData.showData]);

						html += "<tr style='font-size:12px;padding-left:5px;'>";
						if (unit != null && unit.length > 0) {
							html += "<td class='statsData'>"+ title + " : " + value + " ("+unit+")</td>";
						}else {
							html += "<td class='statsData'>"+ title  + " : " + value +"</td>";
						}
						html += "</td></tr>";
					}	
				}
				html += "</table>";
				
				return html;
			},
			
			/**
			 * 
			 * @name         : doRelationPolicyMap
			 * @description  : 연관정책통계지도 리스트를 호출한다.
			 * @date         : 2017. 08. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doRelationPolicyMap : function() {
				$("#relationPolicyMapPopup").show();
				$policyStaticCombineMap.request.doReqRelationPolicyMap();
			},
			
			/**
			 * 
			 * @name         : startUpSupplyListPaging
			 * @description  : 연관 정책통계지도 목록을 설정한다.
			 * @date         : 2017. 09. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param idx    : 인덱스정보
			 */
			startUpSupplyListPaging : function (totalCount, totalPage, pageSize, data) {
				$('#relationPolicyMapListPage .pages').paging({
					current : 1,
					max : totalPage,
					itemClass : 'page',
					itemCurrent : 'data',
					format : '{0}',
					next : '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){	// 페이지 선택 시
						$("#relationPolicyMapTable").empty();
						if (data.length != 0) {
							var tmpData = data[page];
							
							var html = "";
							html +=	"<colgroup>";
							html +=		"<col width='40'  />";
							html +=		"<col width='60'  />";
							html +=		"<col width='120' />";
							html +=		"<col width='100' />";
							html +=		"<col width='' 	  />";
							html +=		"<col width='100' />";
							html +=	"</colgroup>";
							html +=	"<tr>";
							html +=		"<th>선택</th>";
							html +=		"<th>순번</th>";
							html +=		"<th>카테고리</th>";
							html +=		"<th>분류</th>";
							html +=		"<th>제목</th>";
							html +=		"<th>기관명</th>";
							html +=	"</tr>";
							
							for (var i=0; i<tmpData.length; i++) {
								var no = (parseInt(page)*pageSize) + (i-pageSize);
								html += "<tr>";
								html +=		"<td><input type='checkbox' value='"+tmpData[i].idx_id+"' />";
								html += 	"<td id='no_"+(no+1)+"'>"+(no+1)+"</td>";
								html +=		"<td id='ctgr"+(no+1)+"'>"+tmpData[i].category_nm+"</td>";
								html += 	"<td id='idxType_"+(no+1)+"'>"+$policyStaticCombineMap.util.getPolicyIdxName(tmpData[i].idx_type)+"</td>";
								html +=		"<td id='idxNm_"+(no+1)+"'>"+tmpData[i].policy_idx_nm+"</td>";
								html +=		"<td id='source_"+(no+1)+"'>"+$policyStaticCombineMap.util.getSourceCdName(tmpData[i].source_inst_cd)+"</td>";
								html += "</tr>";
							}
							$("#relationPolicyMapTable").html(html);
							
							//이미 체크된 항목 설정하기
							var selectedRelationPolicyMapList = $policyStaticCombineMap.ui.selectedRelationPolicyMapList;
							$("#relationPolicyMapTable input").each(function() {
								var no = $(this).parent().next().html();
								for (var i=0; i<selectedRelationPolicyMapList.length; i++) {
									if (selectedRelationPolicyMapList[i].no == no){
										$(this).prop("checked", true);
										break;
									}
								}
							});
							
							
						}
					}
				});
			}, 
			
			/**
			 * 
			 * @name         : doApplyRelationPolicyMap
			 * @description  : 선택된 연관 정책통계지도를 적용한다.
			 * @date         : 2017. 08. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doApplyRelationPolicyMap : function() {
				var html = "";
				var orgCnt = 0;

				for (var i=0; i<this.selectedRelationPolicyMapList.length; i++) {
					orgCnt = 0;
					var isExist = false;
					var tmpData = this.selectedRelationPolicyMapList[i];
					$(".pcTable02 .policyLink").each(function() {
						orgCnt++;
						if ($(this).attr("idx_id") == tmpData.id) {
							isExist = true;
						}
					});
					if (!isExist) {
						html += "<tr class='combine_tr modifyTr'>";
						html += 	"<td style='text-align:left; padding-left:10px; font-weight:bold;border-right-width:0px; width:280px;'>"+tmpData.title+"</td>";
						html += 	"<td class='policyLink' idx_id='"+tmpData.id+"'>링크바로가기>></td>";
						html += "</tr>";
					}
				}
				
				//콤보박스에 "연관 정책통계지도를 선택하세요" 항목만 남아 있고,
				//선택된 연관 정책통계지도 정보가 있을 경우 콤보박스 덮어씌움
				if ((this.selectedRelationPolicyMapList.length > 0) && 
					(orgCnt == 0)){
					$("#relTable").html(html);
				}else {
					$("#relTable").append(html);
				}
				
				$policyStaticCombineMap.event.relationMapPopupClose();
			},
			
			
			/**
			 * 
			 * @name         : doSavePolicyStatic
			 * @description  : 수정한 정책통계지도를 적용한다.
			 * @date         : 2017. 09. 20. 
			 * @author	     : 김보민
			 * @history 	 :
			 */
			doSavePolicyStatic : function() {
				var val_rel_policy_stat_map_id = "";
				$("#relTable .policyLink").each(function(cnt, node){
					val_rel_policy_stat_map_id += ",";
					val_rel_policy_stat_map_id += $(this).attr("idx_id");
				});

				//단위정보
				var disp_unit = "";
				if ($("#unitOptionSelectBox option:selected").val() == "1") {
					disp_unit = $("#unitSelectBox option:selected").text();
				}else {
					disp_unit = $("#unitInputBox").val();
				}

				var parameters = {
						idx_id : $policyStaticMap.ui.settingInfo["idx_id"],
						policy_idx_nm : $("#pTitle").val(),
						category_id : $("#pCtgrSelectBox option:selected").val(),
						policy_idx_content : $("#idxContent").html(),
						disp_unit : disp_unit,
						disp_nm : $("#pTooltipNm").val()
					};
				if (val_rel_policy_stat_map_id != "") {
					parameters["rel_policy_stat_map_id"] = val_rel_policy_stat_map_id;
				}
				$.ajax({
					url : contextPath + "/ServiceAPI/policyStatic/savePolicyStaticMap.json",
					type : "POST",
					data : parameters,
					async : true,
					dataType : "json",
					beforeSend: function() {
					},
					success : function(res) {
						messageAlert.open("알림", "정책통계지도 정보가 수정되었습니다.");
						
						$policyStaticMap.ui.settingInfo["policy_idx_nm"] = $("#pTitle").val();
						$policyStaticMap.ui.settingInfo["policy_idx_content"] = $("#idxContent").html();
						$policyStaticMap.ui.settingInfo["category_id"] = $("#pCtgrSelectBox option:selected").val();
						$policyStaticMap.ui.settingInfo["disp_unit"] = disp_unit;
						$policyStaticMap.ui.settingInfo["disp_nm"] = $("#pTooltipNm").val();
						
						var idxTypeTxt="";
						switch(parseInt($(this).attr("idx_type"))){
						case 1: idxTypeTxt="지역별 수요변화형 >"; break;
						case 2: idxTypeTxt="지역별 통계연산형 >"; break;
						case 3: idxTypeTxt="지역별 시설분석형 >"; break;
						}
						$("#sTitle").html(idxTypeTxt+" "+$("#current-sido-select option:selected").text()+" "+$("#current-sgg-select option:selected").text()+" "+$("#pTitle").val());
						$policyStaticMapLeftmenu.ui.getCategoryCnt($("#current-sgg-select option:selected").attr("data-adm_cd"));
						$("#modifyCancel").trigger("click");
						var map = $policyStaticCombineMap.ui.map;
						if (map !== null && map !== undefined) {
							map.gMap.remove();
							map = null;
						}
						$policyStaticCombineMap.ui.createMap("mapRgn");
					},
					error : function(res) {
						messageAlert.open("알림", res.errMsg);
					}
				});					
			},
			
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 팝업창을 연다
			 * @date         : 2017. 10. 17. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			reportDataSet : function(){
				$policyStaticCombineMap.ui.reportPopup = window.open(contextPath+"/js/policyStatic/report/policyStaticMap.report.html", "reportPrint","width=850, height=700, scrollbars=yes");
			},
			
			/**
			 * @name         : reportLoad
			 * @description  : 보고서 데이터 설정
			 * @date         : 2017. 10. 17. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			reportLoad : function() {
				
				//그래프
				var chart = [];
				var data = getChartSvgData("#targetCharts2");
				if (data != undefined) {
					chart.push({title:"그래프 정보", data:data});
				}
				
				//표
				var grid = $("#targetGrid").clone();
				
				setTimeout(function() {
					var mapImageList = [];
					var mapId = "#mapRgn";
					html2canvas($(mapId), {
						logging: true,
		                useCORS: false,
		                proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
		                onrendered: function(canvas) {
		                   var data = canvas.toDataURL();
		                   mapImageList.push(data);	
		                    	
		                   var options = {
		                		   mapWidth : $(mapId).width(),
		                		   mapHeight : $(mapId).height(),
		                		   chart : chart,
		                		   grid : grid,
		                		   mapData : mapImageList,
		                		   type : "combine"
		    	 		   };

		                   var popup = $policyStaticCombineMap.ui.reportPopup.$policyStaticMap.report;
		                   popup.setData(options);
		                }
					});

				},300);
				
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
			}
	};
	
	$policyStaticCombineMap.event = {
			setUIEvent : function() {
				//스크롤바  (디자인 - 추후 변경)
//				$(".DataBoxScroll").mCustomScrollbar({axis:"y"});
				$("#wrapperChartScroll2").mCustomScrollbar({axis:"y"});
				$("#wrapperGridScroll").mCustomScrollbar({axis:"y"});
				
				//정책스토리/융합결과탭 선택
				$("body").on("click", ".pcTabs li>a", function() {
					$(".pcTabs li>a").removeClass("on");
					$(this).addClass("on");
					var id = $(this).attr("id");

					switch (id) {
						case "policyStoryTab": //정책스토리탭
							$("#policyCombineDataArea").hide();
							$("#policyStoryArea").show();
							break;
						case "combineDataTab": //융합결과탭
							$("#policyStoryArea").hide();
							$("#policyCombineDataArea").show();
							$policyStaticCombineMap.ui.setChart(false);
							break;
						default:
							break;
					}
				});
				
				//융합데이터 증감/증감률 선택
				$("body").on("click",".demandIdx_stepBox label",function(){
					$(".demandIdx_stepBox label").removeClass("on");
					$(".demandIdx_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$policyStaticCombineMap.ui.setChart(true);
			    });
				
				//표보기, 차트보기
				$("body").on("click","#combineTypeBox>a",function(){ 
					$(this).parents("#combineBox").eq(0).find("a").removeClass("on");
					$(this).addClass("on");
			    });
				
				//연관정책통계지도 클릭시
				$("body").on("click", "#relTable tr .policyLink", function() {
					$policyStaticCombineMap.event.popupClose();
					$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId($(this).attr("idx_id"));
				});
				
				//수정버튼 클릭시
				$("body").on("click", "#modify_bt", function() {
					$("#pCtgrTitle").hide();
					$("#pCtgrSelectBox").show();
					$("#pTooltipNm").val($policyStaticMap.ui.settingInfo["disp_nm"]);   // 주석입력
					// 단위입력
					var flag = 0;
					$("#unitSelectBox option").each(function() {
						if ( $(this).text() == $policyStaticMap.ui.settingInfo["disp_unit"] ) {
							flag = 1;
							$("#unitSelectBox").val($(this).val()).prop("selected", true);
							$("#unitOptionSelectBox").val("1").prop("selected", true);
							$("#unitInputBox").hide();
							$("#unitSelectBox").show();
						}
					});
					if ( flag == 0 ) {
						$("#unitInputBox").val($policyStaticMap.ui.settingInfo["disp_unit"]);
						$("#unitOptionSelectBox").val("2").prop("selected", true);
						$("#unitInputBox").show();
						$("#unitSelectBox").hide();
					}
					
					$("#modifyBtArea").show();
					$("#pTitle").removeAttr("readonly");
					$("#pCtgrSelectBox").removeAttr("disabled");
					$("#idxContent").attr("contenteditable", true);
					$("#idxContent").focus();
					$(".pcAddBox a").show();
					$("#relTable tr").addClass("modifyTr");
					$(".modifyShow").show();
					$("#idxContent").css("min-height", "50px");
				});
				
				//삭제 버튼 클릭시
				$("body").on("click", "#delete_bt", function() {
					var parameters = {
							idx_id : $policyStaticMap.ui.settingInfo["idx_id"],
							category_id : $policyStaticMap.ui.settingInfo["category_id"]
						};
					
					messageConfirm.open(
							"알림", 
							"삭제 진행하시겠습니까?",
							btns = [
								{
									title : "확인",
									fAgm : null,
									disable : false,
									func : function(opt) {
										$.ajax({
											url : contextPath + "/ServiceAPI/policyWrite/deletePolicyMap.json",
											type : "POST",
											data : parameters,
											async : true,
											dataType : "json",
											beforeSend: function() {
											},
											success : function(res) {
												location.href = '/view/map/policyStaticMap/';
											},
											error : function(res) {
												messageAlert.open("알림", res.errMsg);
											}
										});				
									}
								},
									 
				    			{
									title : "취소",
									fAgm : null,
									disable : false,
									func : function(opt) {
										
									}
				    			}   
							]
					);
					
					
					
					
					
					
					
						
				});
				
				//취소버튼 클릭시
				$("body").on("click", "#modifyCancel", function() {
					$("#pCtgrTitle").show();
					$("#pCtgrSelectBox").hide();
					$("#modifyBtArea").hide();
					$("#pTitle").attr("readonly", true);
					$("#pCtgrSelectBox").attr("disabled", "disabled");
					$("#idxContent").attr("contenteditable", false);
					$(".pcAddBox a").hide();
					$("#relTable tr").removeClass("modifyTr");
					$("#relTable tr").removeClass("onTr");
					$(".modifyShow").hide();
					$policyStaticCombineMap.ui.setBasicInfo();
					$policyStaticCombineMap.ui.setGrid();
					$policyStaticCombineMap.ui.setPolicyRelList();
				});
				
				//연관정책통계 선택 시(삭제선택)
				$("body").on("click", "#relTable .modifyTr", function() {
					$(this).removeClass("modifyTr");
					$(this).addClass("onTr");
				});
				
				//연관정책통계 선택 해제시(삭제선택)
				$("body").on("click", "#relTable .onTr", function() {
					$(this).removeClass("onTr");
					$(this).addClass("modifyTr");
				});
				
				//저장버튼 클릭시
				$("body").on("click", "#modifySave", function() {
					$("#modifyBtArea").hide();
				});
				
				//연관정책통계 항목 삭제
				$("body").on("click", ".del_img", function() {
					$("#relTable .onTr").each(function(cnt, node){
						$(this).remove();
					});
				});
				
				//연관정책통계 팝업 체크박스 선택
				$("body").on("click", "#relationPolicyMapTable input", function() {
					var selectedRelationPolicyMapList = $policyStaticCombineMap.ui.selectedRelationPolicyMapList;
					var no = $(this).parent().next().html();
					if ($(this).is(":checked")) {
						var tmpData = {
							id : $(this).val(),
							no : no,
							title : $("#idxNm_"+no).html()
						};
						selectedRelationPolicyMapList.push(tmpData);
					}else {
						for (var i=0; i<selectedRelationPolicyMapList.length; i++) {
							if (selectedRelationPolicyMapList[i].no == no) {
								selectedRelationPolicyMapList.splice(i, 1);
								break;
							}
						}
					}
				});
				
				//단위옵션선택
				$("body").on("change", "#unitOptionSelectBox", function() {
					var unitType = $(this).val();
					switch (parseInt(unitType)) {
						case 1: //단위선택
							$("#unitInputBox").hide();
							$("#unitSelectBox").show();
							break;
						case 2: //직접입력
							$("#unitSelectBox").hide();
							$("#unitInputBox").show();
							break;
						default:
							break;
					}
				});
			},
	
			/**
			 * 
			 * @name         : popupShow
			 * @description  : 정책통계지도 융합팝업창을 표출한다. 
			 * @date         : 2017. 08. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			popupShow : function() {
				$(".combineMap").show();
			},
			
			/**
			 * 
			 * @name         : popupClose
			 * @description  : 정책통계지도 융합팝업창을 닫는다. 
			 * @date         : 2017. 08. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			popupClose : function() {
				//mng_s 20180206 주용민
				$("#mapRgn_1 .dataSlider, #mapRgn_2 .dataSlider").attr("id","legendDataSlider");
				//mng_e 20180206 주용민
				var map = $policyStaticCombineMap.ui.map;
				if (map !== null && map !== undefined) {
					map.gMap.remove();
					map = null;
				}
				$("#modifyCancel").trigger("click");
				this.resetData();
			},
			
			/**
			 * 
			 * @name         : resetData
			 * @description  : 팝업을 초기화한다. 
			 * @date         : 2017. 08. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			resetData : function() {
				$(".combineMap").hide();
				$("#policyStoryTab").click();
				$("input[name='demandInx_radio']").each(function() {
					$(this).next().removeClass("on");
					$(this).removeAttr("checked");
				});
				$("input[name='demandInx_radio']:eq(0)").next().addClass("on");
				$("input[name='demandInx_radio']:eq(0)").attr("checked", "checked");

				$("#pTitle").val("");
			},
			
			relationMapPopupClose : function() {
				$("#relationPolicyMapPopup").hide();
				$policyStaticCombineMap.ui.selectedRelationPolicyMapList = [];
			}
			
	};
	
	
	
	$policyStaticCombineMap.util = {

			/**
			 * 
			 * @name         : maxLengthCheck
			 * @description  : 센서스 툴팁을 설정한다.
			 * @date         : 2017. 08. 28. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : tag id 
			 * @param maxLength : 최대 입력가능 수 (byte)
			 * @param ignoreId : 무시하는 아이디
			 */	
			maxLengthCheck : function(type, id, maxLength, ignoreId, obj){
				 var obj = null;
				 var str = null;
				 switch(type) {
					 case "input":
						 obj = document.getElementById(id);
						 str = obj.value;
						 break;
					 case "textarea":
						 str = this.getContentEditableText(id);
						 break;
					 default:
						 obj = document.getElementById(id);
					 	 str = obj.value;
						 break;
				 }
				 var e_index = 0;

				 //제한량을 초과했을 경우
				 if (this.byteCheck(str)> maxLength) { 
					 //백스페이스는 지우기작업시 바이트 체크하지 않기 위해서
					 if (event.keyCode != '8') {
						 event.preventDefault();
						 if ($(".alertPopupWrapper").is(":visible")) {
							 return;
						 }
						 var chkdgsoweg =  Math.floor( maxLength / 3 );
						 messageAlert.open(
								 "알림", 
								 '한글은 ' + chkdgsoweg + '자 , 영문은 ' + maxLength + '자 까지 입력이 가능합니다.',
								 function() {
									 obj.value = $policyStaticCombineMap.util.fnCut(str , maxLength);
								 }
						);
					 }
					 
				 }
			},
			 
			/**
			 * 
			 * @name         : byteCheck
			 * @description  : 바이트수 반환
			 * @date         : 2017. 08. 28. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param str    : 텍스트
			 */	
			byteCheck : function(str){
			    var codeByte = 0;
			    for (var idx = 0; idx < str.length; idx++) {
			        var oneChar = escape(str.charAt(idx));
			        if ( oneChar.length == 1 ) {
			            codeByte ++;
			        } else if (oneChar.indexOf("%u") != -1) {
			            codeByte += 2;
			        } else if (oneChar.indexOf("%") != -1) {
			            codeByte ++;
			        }
			    }
			    return codeByte;
			},
			
			/**
			 * 
			 * @name         : fnCut
			 * @description  : 바이트수에 맞게 텍스트를 자른다
			 * @date         : 2017. 09. 03. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param str    : 텍스트
			 * @param lengths: 길이
			 */	
			fnCut : function(str, lengths) {
				var len = 0;
			    var newStr = '';
			  
			    for (var i=0;i<str.length; i++) {
			    	var n = str.charCodeAt(i);
			    	var nv = str.charAt(i);
			        
			        if ((n>= 0)&&(n<256)) len ++;
			        else len += 2;
			        
			        if (len>lengths) break;
			        else newStr = newStr + nv;
			      }
			      return newStr;
			},
			
			/**
			 * 
			 * @name         : getContentEditableText
			 * @description  : textarea의 텍스트를 가져온다
			 * @date         : 2017. 09. 03. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id     : textarea 아이디
			 */	
			getContentEditableText : function(id) {
				var obj = $("#" + id).clone();
			    var ce = $("<pre />").html(obj.html());
			      ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
			      ce.find("p").replaceWith(function() { return this.innerHTML + "<br>"; });
			      ce.find("br").replaceWith("\n");

			    return ce.text();
			},
			
			/**
			 * 
			 * @name         : getTitleWithShowData
			 * @description  : 표출파라미터로 표출 타이틀을 가져온다.(센서스)
			 * @date         : 2017. 08. 28. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param api_id : api 아이디
			 * @param showData : 표출파마미터
			 */	
			getTitleWithShowData : function(api_id, showData) {
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
						"naesuoga_ppltn" : "내수면 어가 인구", //2018.01.15 [개발팀] 띄어쓰기
						"haesuoga_cnt" : "해수면총어가",
						"haesuoga_ppltn" : "해수면 어가 인구", //2018.01.15 [개발팀] 띄어쓰기
						"employee_cnt" : "종사자수",
						"data_cnt" : "융합정보"
				};
				return showName[showData];
			},
			
			/**
			 * 
			 * @name         : getSourceCdName
			 * @description  : 출처기관명을 가져온다
			 * @date         : 2017. 08. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param cd     : 기관코드
			 */	
			getSourceCdName : function(cd) {
				var name = "";
				switch (parseInt(cd)) {
					case 1: //통계청
						name = "통계청";
						break;
					case 2: //지자체
						name = "지자체";
						break;
					default:
						name = "통계청";
						break;
				}
				return name;
			},
			
			/**
			 * 
			 * @name         : getPolicyIdxName
			 * @description  : 정책지표 이름을 가져온다.
			 * @date         : 2017. 08. 31. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param cd     : 기관코드
			 */	
			getPolicyIdxName : function(idx) {
				var name = "";
				switch(parseInt(idx)) {
					case 1:
						name = "수요변화형";
						break;
					case 2:
						name = "통계연산형";
						break;
					case 3:
						name = "시설분석형";
						break;
					default:
						name = "수요변화형";
						break;
				}
				return name;
			},
			
			/**
			 * 
			 * @name         : getChartColor
			 * @description  : 랜덤색상을 가져온다.
			 * @date         : 2017. 09. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			getChartColor : function(idx) {
				var color = null;
				switch(idx) {
					case 0:
						color = "#ffdc3c";
						break;
					case 1:
						color = "#369f36";
						break;
					case 2:
						color = "#6ee0ff";
						break;
					case 3:
						color = "#ff8e99";
						break;
					case 4:
						color = "#e97fe5";
						break;
					default:
						color = "#505050";
						break;
					}
				 return color;
			}
	};
	

	$policyStaticCombineMap.callbackFunc = {
			// 맵 줌 종료 시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				if ($policyStaticMap.ui.poiLayerList.length > 0) {
					var mapBounds = map.gMap.getBounds();
					var poiList = $policyStaticMap.ui.poiLayerList;
					if (map.gMap._zoom >= 9) {
						$policyStaticCombineMap.ui.isZoom = true; //2018.02.06 [개발팀]
						//중심좌표가 화면영역에 벗어났을 경우, poi를 그린다.
						/*if ($policyStaticCombineMap.ui.mapBounds != null &&
							$policyStaticCombineMap.ui.mapBounds.contains(map.gMap.getCenter())) {
							return;
						}*/
						$policyStaticCombineMap.ui.mapBounds = mapBounds;
						
						//2018.02.06 [개발팀]
						if ($policyStaticCombineMap.ui.featureLayer != null) {
							$policyStaticCombineMap.ui.featureLayer.clearLayers();
						}
						
						//반경정보 삭제
						var circleLayer = $policyStaticCombineMap.ui.circleLayer;
						if (circleLayer != null) {
							circleLayer.clearLayers();
						}
						
						for (var i=0; i<poiList.length; i++) {
							var settingInfo = poiList[i].settingInfo;
							switch(poiList[i].markerType) {
								case "cluster":
									if ($policyStaticCombineMap.ui.clusterLayer != null) {
										$policyStaticCombineMap.ui.clusterLayer.clearLayers();
									}
									$policyStaticCombineMap.ui.drawPoi(poiList[i], settingInfo, map, 1, $policyStaticCombineMap.ui.mapBounds);
									break;
								case "normal":
									$policyStaticCombineMap.ui.drawPoi(poiList[i], settingInfo, map, 1, $policyStaticCombineMap.ui.mapBounds);
									break;
								default:
									break;
							}
							
							//반경정보가 있을 경우, 반경정보 표출
							var setInfo = poiList[i].settingInfo;
							if (setInfo.radius != 0) {
								$policyStaticCombineMap.ui.drawPoiCircle(poiList[i], settingInfo, map);
							}

						}
					}else {
						//2018.02.06 [개발팀]
						if (!$policyStaticCombineMap.ui.isZoom) {
							return;
						}
						$policyStaticCombineMap.ui.isZoom = false;
						
						for (var i=0; i<poiList.length; i++) {
							var settingInfo = poiList[i].settingInfo;
							switch(poiList[i].markerType) {
								case "cluster":
									//2018.02.06 [개발팀]
									//var cnt = $policyStaticCombineMap.ui.featureLayer.getLayers().length;
									//if (cnt > 0) {
										$policyStaticCombineMap.ui.featureLayer.clearLayers();
										$policyStaticCombineMap.ui.drawPoi(poiList[i], settingInfo, map, 2);
										
										//반경정보 삭제
										var circleLayer = $policyStaticCombineMap.ui.circleLayer;
										if (circleLayer != null) {
											circleLayer.clearLayers();
										}
									//}
									break;
								case "normal":
									//마커를 다 그리면 더 이상 그리지 않는다.
									var cnt = $policyStaticCombineMap.ui.featureLayer.getLayers().length;
									if (cnt == poiList[i].data.length) {
										return;
									}
									$policyStaticCombineMap.ui.drawPoi(poiList[i], settingInfo, map, 1);
									
									//반경정보 삭제
									var circleLayer = $policyStaticCombineMap.ui.circleLayer;
									if (circleLayer != null) {
										circleLayer.clearLayers();
									}
										
									//반경정보가 있을 경우, 반경정보 표출
									var setInfo = poiList[i].settingInfo;
									if (setInfo.radius != 0) {
										$policyStaticCombineMap.ui.drawPoiCircle(poiList[i], settingInfo, map);
									}
									break;
								default:
									break;
							}
						}
					}
				}
			},
			
			didMouseOverPolygon : function(event, data, type, map) {
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$policyStaticCombineMap.ui.createInfoTooltip(event, data, type, map);
				}
			}
			
	};
	
	$policyStaticCombineMap.request = {
			/**
			 * 
			 * @name         : doReaRelationPolicyMap
			 * @description  : 연관정책통계지도를 호출한다.
			 * @date         : 2017. 08. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqRelationPolicyMap : function() {
				$.ajax({
					url : contextPath + "/ServiceAPI/policyWrite/relationPolicyMapList.json",
					type : "POST",
					data : {},
					async : true,
					dataType : "json",
					beforeSend: function() {
					},
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								var policyMapList = res.result.policyMapList;
								
								//페이징 설정
								var pageSize = 5;										
								var totalPage = Math.ceil( policyMapList.length / pageSize);
								var tmpData = {};
								var pageIndex = 1;
								for (var i=0; i<policyMapList.length; i++) {
									if (i < pageSize*pageIndex) {
										if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
											tmpData[pageIndex] = [];
										}
										tmpData[pageIndex].push(policyMapList[i]);
									}else {
										pageIndex++;
										if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
											tmpData[pageIndex] = [];
										}
										tmpData[pageIndex].push(policyMapList[i]);
									}
								}
				
								$policyStaticCombineMap.ui.startUpSupplyListPaging(policyMapList.length, totalPage, pageSize, tmpData);

								//테이블 생성
								html = "";
								html +=	"<colgroup>";
								html +=		"<col width='40'  />";
								html +=		"<col width='60'  />";
								html +=		"<col width='120' />";
								html +=		"<col width='100' />";
								html +=		"<col width='' 	  />";
								html +=		"<col width='100' />";
								html +=	"</colgroup>";
								html +=	"<tr>";
								html +=		"<th>선택</th>";
								html +=		"<th>순번</th>";
								html +=		"<th>카테고리</th>";
								html +=		"<th>분류</th>";
								html +=		"<th>제목</th>";
								html +=		"<th>기관명</th>";
								html +=	"</tr>";
								
								if (tmpData.length != 0 && Object.prototype.toString.call(tmpData["1"]) === "[object Array]" ) {
									var data = tmpData["1"];
									for (var i=0; i<data.length; i++) {
										html += "<tr>";
										html +=		"<td><input type='checkbox' value='"+data[i].idx_id+"' />"
										html += 	"<td id='no_"+(i+1)+"'>"+(i+1)+"</td>";
										html +=		"<td id='ctgr_"+(i+1)+"'>"+data[i].category_nm+"</td>";
										html += 	"<td id='idxType_"+(i+1)+"'>"+$policyStaticCombineMap.util.getPolicyIdxName(data[i].idx_type)+"</td>";
										html +=		"<td id='idxNm_"+(i+1)+"'>"+data[i].policy_idx_nm+"</td>";
										html +=		"<td id='source_"+(i+1)+"'>"+$policyStaticCombineMap.util.getSourceCdName(data[i].source_inst_cd)+"</td>";
										html += "</tr>"
									}
									$("#relationPolicyMapTable").html(html);
								}
								break;
							default:
								break;
						}
					},
					error : function(data) {
					}
				});	
			}
	};
	
}(window, document));

//////// 2017.09.07 [개발팀] 융합창개발 END //////////