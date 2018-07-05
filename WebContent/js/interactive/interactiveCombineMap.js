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
	W.$combineMap = W.$combineMap || {};
	
	$(document).ready(
		function() {				
			$combineMap.ui.createMap("mapRgn", 0);
			$combineMap.event.setUIEvent();		
			var mapNavi1 = new mapNavigation.UI();
			mapNavi1.create("mapNavi", 1, $combineMap.ui);
	});
	
	$combineMap = {
			noReverseGeoCode : true
	};
	
	$combineMap.ui = {
			namespace : "interactiveCombineMap",
			mapList : [],
			data : null,
			layerGroup : [],
			isSameHeatMapType : false,
			heatMapIdx : [],
			
			
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
				map.createMap($combineMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				map.id = seq;
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.isMultiSelectedBound = true;
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map);
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					intrPoiControl : true,
					mapTypeControl : true,
					combineZoomControl : true
				});
				this.mapList[seq] = map;
				
				map.gMap.whenReady(function() {
					map.createHeatMap();
					window.opener.$interactiveMap.ui.mapLoad();
				});
			},		
			
			
			/**
			 * 
			 * @name         : setData
			 * @description  : 조회된 통계정보를 전달한다.
			 * @date         : 2015. 10.22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setData : function(data) {
				this.data = data;
				var map = this.mapList[0];
				var layer = null;
				for (var i=0; i<data.length; i++) {
					if (data[i].legend.type == "heat" || (data[i].type == "POI" && data[i].data.searchMethod == "ratio")) {
						this.heatMapIdx.push(i);
					}
				}
				
				var tmpHeatMapIdx = []; 
				for (var i=1; i<this.heatMapIdx.length; i++) {
					tmpHeatMapIdx.push(this.heatMapIdx[i]);
				}
				this.heatMapIdx = tmpHeatMapIdx;
				
				for (var i=0; i<data.length; i++) {	
					var legend = new sLegendInfo.legendInfo(map);			
					legend.initialize($combineMap.ui);
					legend.numberData = false;
					legend.createLegend();
					map.legend = legend;
					
					// 2016. 03. 29 j.h.Seok modify
					var legendNumber = i+1;
					
					$("#legend_"+legend.id).css("clear", "none");
					$("#btn_legendSetting_"+legend.id).hide();
					
					// 2016. 03. 29 j.h.Seok modify
					$("#lgListBox_"+legend.id).hide();	//2016.03.25 수정, 버튼 3개이상 시, 설정버튼이 보이는 현상
					$("#legendBox_"+legend.id).find(".legendRound").append("<div><span class='combineShowHideText' style='width:17px;height:17px;line-height:17px;margin-top:7px;border-radius:50%;background:#00bcd4;'>"+legendNumber+"</span></div>");
					
					//2016.03.30 수정
					$("#btn_legend_"+legend.id).click(function(e) {
						var id = $(this).attr("id");
						id = id.split("_")[2];
						e.stopPropagation();
						//$("body").off("click"); 
						var legendBox = $("#legendBox_"+id);
						var ing = legendBox.attr("data-ing");
						legendBox.removeClass(ing); 
						$("#btn_legendSetting_"+id).removeClass("on");
						$("#lgListBox_"+id).stop().animate({"left":"-550px"},200);
						if(ing=="min"){ 
							legendBox.attr("data-ing", "max");
							legendBox.addClass("max");
							$("#heatMinLegend_"+id).hide();
							if ($("#typeArea_"+id).attr("class") == "ring") {
								$(".legendLine").show();
							}else if ($("#typeArea_"+id).attr("class") == "color" ||
									$("#typeArea_"+id).attr("class") == "jum") {
								$("#legendColor_"+id).show();
								$("#colorStatus_"+id).find("span").show();
							}
						}else if(ing=="max"){
							legendBox.attr("data-ing", "min");
							legendBox.addClass("min");
							if ($("#typeArea_"+id).attr("class") == "color") {
								$("#colorStatus_"+id).find("span").hide();
							}
							if ($("#typeArea_"+id).attr("class") == "heat") {
								$("#heatMinLegend_"+legend.id).show();
							}
						}	
					});
					
					
					map.legend.valPerSlice = data[i].legend.valPerSlice;
					map.legend.legendColor = data[i].legend.legendColor;
					legend.valPerSlice = data[i].legend.valPerSlice;
					legend.legendColor = data[i].legend.legendColor;
					legend.selectType = data[i].legend.type;
					
					var length = legend.legendColor.length;
					legendColor(
							legend.legendColor[0],
							legend.legendColor[length-1],  
							"#colorStatus_"+legend.id, 
							length, 
							legend.id, 
							legend
					);
					
					//나의데이터- POI일경우
					if (data[i].geojson == null && data[i].type == "MY") {
						if (data[i].data.searchMethod == "location") {
							var markerGroup = this.drawMarker(data[i].data);
							data[i].geojson = markerGroup;
						}else if (data[i].data.searchMethod == "ratio") {
							data[i].legend.type = "heat";
							this.drawHeatMap(data[i].data);
						}
					}else if (data[i].geojson == null && data[i].type == "POI") {
						var markerGroup = this.drawMarker(data[i].data, "POI");
						data[i].geojson = markerGroup;
					}
					else if (Object.prototype.toString.call(data[i].geojson) === "[object Array]") {
						for (var z=0; z<data[i].geojson.length; z++) {
							for (var k=0; k<data[i].geojson[z].features.length; k++) {
								var param = data[i].geojson[z].features[k];
								if (param.isKosis) {
									param.info[3] = data[i].id;
								}else {
									for (var m=0; m<param.info.length; m++) {
										param.info[m]["mapId"] = data[i].id;
									}
								}
							}
						}
					}else {
						for (var k=0; k<data[i].geojson.features.length; k++) {
							var param = data[i].geojson.features[k];
							if (param.isKosis) {
								map.dataType = "kosis";
								param.info[3] = data[i].id;
							}else {
								map.dataType = "normal";
								for (var m=0; m<param.info.length; m++) {
									param.info[m]["mapId"] = data[i].id;
								}
							}	
						}
					}
					
					var polygonLayer = [];
					var type ="";
					map.dataGeojson = null;
					map.multiLayerControl.dataGeojson = null;
					
					//나의데이터- POI일경우
					if (data[i].type == "MY") {
						if (data[i].data.searchMethod == "location") {
							type = "poi";
						}else {
							type = "heat";
						}
					}else if (data[i].type == "POI") {
						type = "poi";
					}
					else if (Object.prototype.toString.call(data[i].geojson) === "[object Array]") {
						type = "multi";
						for (var k=0; k<data[i].geojson.length; k++) {
							var dataGeojson = map.addPolygonGeoJson(data[i].geojson[k], "data");
							polygonLayer.push(dataGeojson);
							if (map.multiLayerControl.dataGeojson == null) {map.multiLayerControl.dataGeojson = [];}
							map.multiLayerControl.dataGeojson.push(dataGeojson);
						}
					}else {
						polygonLayer.push(map.addPolygonGeoJson(data[i].geojson, "data"));
						type = "normal";
					}
					
					var isDrawLegend = true;
					if (this.heatMapIdx.length > 0) {
						for (var x=0; x<this.heatMapIdx.length; x++) {
							if (this.heatMapIdx[x] == i) {
								isDrawLegend = false;
								for (var y=0; y<polygonLayer.length; y++) {
									polygonLayer[y].remove();
								}
								$("#legend_"+legend.id).hide();
							}
						}
					}
					
					//타입별로 타입구성(색상, 버블, 점, 히트)
					if (map.legend != null && isDrawLegend) {
						$("#lgTypeList_"+map.legend.id+">li>a").each(function() {
							var type = $(this).attr("data-type");
							if (type == map.legend.selectType) {
								$(this).click();
							}
						});
					}
				
					layer = {
							geojson : data[i].geojson,
							layer : polygonLayer,
							legend : data[i].legend,
							param : data[i].param,
							id : data[i].id,
							admCd : data[i].adm_cd,
							data : data[i].data,
							legendObj : legend,
							type : type
					};
					this.layerGroup.push(layer);
					this.createBtn(data[i].param, data[i].id, data[i].adm_cd, data[i].legend.type, i);
					$combineMap.ui.addViewBtn("normal", layer);
				}
				this.checkAdmCode();
				this.enableEvent();
				map.mapMove(data[0].center, data[0].zoom);
			},
			
			
			/**
			 * 
			 * @name         : createBtn
			 * @description  : 버튼을 생성한다.
			 * @date         : 2015. 10.22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			createBtn : function(param, mapId, admCd, legendType, idx) {
				var viewSeq = parseInt(mapId) + 1;
				var html = "";
				html += "<li title='"+ param.title +"' class='legendType_"+ legendType +"' style='border-bottom:solid 1px #dddddd;'>";
				html += 	"<input type='checkbox' id='ck_"+ mapId +"_"+ admCd +"' checked=checked />";
				html +=		"<a class='combineViewIcon' id='view_"+ mapId +"'><span class='combineShowHideText'>"+ viewSeq +"</span></a>";
				html += 	"<label for='ck_"+ mapId +"_"+ admCd +"' style='width:180px;'>"+ param.title +"</label>";
				html += "</li>";
				$("#btnList").find("ul").append(html);
				
				if (this.heatMapIdx.length > 0) {
					for (var i=0; i<this.heatMapIdx.length; i++) {
						if (this.heatMapIdx[i] == idx) {
							$("#ck_"+ mapId +"_"+ admCd).removeAttr("checked");
						}
					}
				}
				
				switch(mapId) {
					case 0:
						$("#view_"+mapId).addClass("view1");
						break;
					case 1:
						$("#view_"+mapId).addClass("view2");
						break;
					case 2:
						$("#view_"+mapId).addClass("view3");
						break;
				}
			},
			
			
			/**
			 * 
			 * @name         : createCombineBtn
			 * @description  : 버튼을 생성한다.
			 * @date         : 2015. 10.22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			createCombineBtn : function(data) {
				var ids= "";
				var title = "";
				for (var i=0; i<data.length; i++) {
					ids += data[i].id;
					title += data[i].param.title;
					if (i != data.length-1) {
						ids += "-";
						title += " | ";
					}
				}
				var admCd = data[0].admCd;
				var html = "";
				//2016.03.25 수정, style 추가
				// 2016. 03. 29 j.h.Seok modify
				html += "<li title='"+ title +"' style='border-bottom:solid 1px #dddddd;'>";
				html += 	"<input type='checkbox' id='combine_"+ ids +"_"+ admCd +"' />";
				
				for (var i=0; i<data.length; i++) {
					var viewSeq = parseInt(data[i].id) + 1;
					html +=	"<a class='combineViewIcon view"+ viewSeq +"' id='view_"+ data[i].id +"'><span class='combineShowHideText'>"+ viewSeq +"</span></a>";
				}
				
				html += 	"<label for='ck_"+ ids +"_"+ admCd +"' style='width:160px;'>"+ title +"</label>";
				html +=		"<a class='sqdel' style='top:13px;cursor:pointer;' onclick='javascript:$combineMap.ui.doDeleteCombine(\"combine_"+ ids +"_"+ admCd +"\");'><img src='/img/um/btn_closel01.gif' alt='삭제' /></a>";
				html += "</li>";
				$("#btnList").find("ul").append(html);
				
				this.enableEvent();
				$("#combine_"+ ids +"_"+ admCd).click();
			},
			
			
			/**
			 * 
			 * @name         : addCombineLayer
			 * @description  : 범례결합 레이어를 생성한다.
			 * @date         : 2015. 10.23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			addCombineLayer : function(id, title) {
				var map = this.mapList[0];
				var isExist = false;
				var layer = null;
				for (var i=0; i<this.layerGroup.length; i++) {
					var layerGroup = this.layerGroup[i];
					if (id == layerGroup.id) {
						isExist = true;
						for (var k=0; k<layerGroup.layer.length; k++) {
							layerGroup.layer[k].addTo(map.gMap);
						}
						$("#legend_"+layerGroup.legendObj.id).show();
						break;
					}
				}
				if (!isExist) {
					var ids = id.split("-");
					var datas = [];
					map.combineData = [];
					for (var i=0; i<ids.length; i++) {
						var group = $combineMap.ui.layerGroup;
						var layerGroup = null;
						var data = null;
						for (var k=0; k<group.length; k++) {
							if (group[k].id == ids[i]) {
								layerGroup = group[k];
								data = group[k].data;
								datas.push(data);
								map.setStatsData("combine", data, data.showData, data.unit, ids.length);
								break;
							}
						}
					}

					var legend = new sLegendInfo.legendInfo(map);		
					var currentdate = new Date();
					legend.id = makeStamp(currentdate);
					legend.delegate = $combineMap.ui;
					// 2016. 03. 29 j.h.Seok modify
					legend.legendInit();  //2016.03.29 수정
					legend.createLegend();
					legend.numberData = false;
					// 2016. 03. 29 j.h.Seok modify
					legend.guganTextShow = false; //2016.03.25 수정, 범례결합 시, 구간별 통계치 표출hide
					map.legend = legend;
					
					// 2016. 03. 29 j.h.Seok modify
					var ids = id.split("-");
					for (var i=ids.length-1; i>=0; i--) {
						var legendNumber = parseInt(ids[i])+1;
						$("#legendBox_"+legend.id).find(".legendRound").append("<div><span class='combineShowHideText' style='width:17px;height:17px;line-height:17px;margin-top:7px;border-radius:50%;background:#00bcd4;float:right;'>"+legendNumber+"</span></div>");
					}
					$("#btn_legendSetting_"+legend.id).hide(); //2016.03.29 수정, 설정버튼 숨기기
					$("#legend_"+legend.id).css("clear", "none");
					
					//2016.03.30 수정
					$("#btn_legend_"+legend.id).click(function(e) {
						var id = $(this).attr("id");
						id = id.split("_")[2];
						e.stopPropagation();
						//$("body").off("click"); 
						var legendBox = $("#legendBox_"+id);
						var ing = legendBox.attr("data-ing");
						legendBox.removeClass(ing); 
						$("#btn_legendSetting_"+id).removeClass("on");
						$("#lgListBox_"+id).stop().animate({"left":"-550px"},200);
						if(ing=="min"){ 
							legendBox.attr("data-ing", "max");
							legendBox.addClass("max");
							$("#heatMinLegend_"+id).hide();
							if ($("#typeArea_"+id).attr("class") == "ring") {
								$(".legendLine").show();
							}else if ($("#typeArea_"+id).attr("class") == "color" ||
									$("#typeArea_"+id).attr("class") == "jum") {
								$("#legendColor_"+id).show();
								$("#colorStatus_"+id).find("span").show();
							}
						}else if(ing=="max"){
							legendBox.attr("data-ing", "min");
							legendBox.addClass("min");
							if ($("#typeArea_"+id).attr("class") == "color") {
								$("#colorStatus_"+id).find("span").hide();
							}
							if ($("#typeArea_"+id).attr("class") == "heat") {
								$("#heatMinLegend_"+legend.id).show();
							}
						}	
					});
					
					
					
					var geojson = deepCopy(group[0].geojson);
					for (var i=0; i<geojson.features.length; i++){
						geojson.features[i].info = [];
					}
					
					var geojson = map.combineStatsData(geojson);
					for (var i=0; i<geojson.features.length; i++) {
						var layer = geojson.features[i];
						for (var k=0; k<layer.info.length; k++) {
							layer.info[k]["mapId"] = id;
						}
					}

					var polygonLayer = [];
					polygonLayer.push(map.addPolygonGeoJson(geojson, "data"));
					this.layerGroup.push({
						geojson : geojson,
						layer : polygonLayer,
						legend : {
							legendColor : legend.legendColor,
							valPerSlice : legend.valPerSlice
						},
						param : {
							title : title,
							unit : ""
						},
						id : id,
						admCd : null,
						data : datas,
						legendObj : legend
					});
					
					$("#legendColor_"+legend.id+ " li>a").eq(0).click();
				}
			},
			
			
			/**
			 * 
			 * @name         : checkAdmCode
			 * @description  : 버튼간 행정구역정보를 체크한다.
			 * @date         : 2015. 10.23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkAdmCode : function() {
				var tmpAdmCd = [];
				var isEqual = true;
				$("#btnList").find("input:checked").each(function() {
					var id =$(this).attr("id")[1];
					var admCd = parseInt($(this).attr("id").split("_")[2]);
					tmpAdmCd.push(admCd);
					if ($(this).attr("id").indexOf("combine") != -1) {
						isEqual = false;
					}
					
					for (var i=0; i<$combineMap.ui.layerGroup.length; i++) {
						var layerGroup = $combineMap.ui.layerGroup[i];
						if (layerGroup.id == id) {
							if (layerGroup.type == "multi") {
								isEqual = false;
							}
							break;
						}
					}
					
				});
				
				var length = $("#btnList").find("input:checked").length;
				if (length < 2) {
					isEqual = false;
				}
				
				
				if (isEqual) {
					if (tmpAdmCd.length < 2) {
						isEqual = false;
					}else {		
						for (var i=0; i<tmpAdmCd.length; i++) {
							if (tmpAdmCd[0] != tmpAdmCd[i]) {
								isEqual = false;
								break;
							}
						}
					}
				}
				if (isEqual) {
					$("#combineBtn").addClass("on");
				}else {
					var on = $("#combineBtn").hasClass("on");
					if (on) {
						$("#combineBtn").removeClass("on");
					}
				}
			},
			
			checkHeatMap : function(target) {
				var cnt = 0;
				var isPass = true;
				$("#btnList").find("input:checked").each(function(idx) {
					var className = $(this).parent().attr("class");
					//2016.03.25 수정, 범례결합시 오류문제 수정
					// 2016. 03. 29 j.h.Seok modify
					if (className != undefined && className.indexOf("heat") != -1) {
						cnt++;
					}
				});
				
				if (cnt > 1) {
					target.removeAttr("checked");
					messageAlert.open("알림", "열지도는 동시에 표출할 수 없습니다.");
					isPass = false;
				}
				
				return isPass;
			},
			
			
			/**
			 * 
			 * @name         : doCombineLayer
			 * @description  : 버튼을 범례결합한다.
			 * @date         : 2015. 10.23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCombineLayer : function() {
				var on = $("#combineBtn").hasClass("on");
				if (!on) {
					return;
				}else {
					var tmpData = [];
					$("#btnList").find("input:checked").each(function() {
						var id = parseInt($(this).attr("id").split("_")[1]);
						for (var i=0; i<$combineMap.ui.layerGroup.length; i++) {
							var layer = $combineMap.ui.layerGroup[i];
							if (layer.id == id) {
								tmpData.push(layer);
							}
						}
					});
					$combineMap.ui.createCombineBtn(tmpData);
					$combineMap.ui.addViewBtn("combine", tmpData);
					//$("#combineBtn").attr("disabled", "disabled"); //2016.03.30 수정
					var on = $("#combineBtn").hasClass("on");
					if (on) {
						$("#combineBtn").removeClass("on");
					}
				}
			},
			
			
			/**
			 * 
			 * @name         : doDeleteCombine
			 * @description  : 결합버튼을 삭제한다.
			 * @date         : 2015. 10.23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doDeleteCombine : function(id) {
				if (id.indexOf("combine") != -1) {
					var tmpId = id.split("_")[1];
					var idx = 0; 
					var tmpLayerGroup = [];
					for (var i=0; i<this.layerGroup.length; i++) {
						var layerGroup = this.layerGroup[i];
						if (layerGroup.id == tmpId) {
							idx = i;
							$("#legend_"+layerGroup.legendObj.id).remove();
							for (var k=0; k<layerGroup.layer.length; k++) {
								layerGroup.layer[k].remove();
							}
							break;
						}
						tmpLayerGroup.push(layerGroup);
					}
					this.layerGroup = tmpLayerGroup;
				}
				$("#"+id).parent().remove();
				
				//2016.03.29 수정, 범례결합 버튼 삭제 시, 차트/표 삭제
				$("#viewBtn_"+tmpId).remove();
				$("#dataChart").empty();
				$("#dataGrid").empty();
				
				this.checkAdmCode();
			},
			
			
			/**
			 * 
			 * @name         : doShowChart
			 * @description  : 차트 및 표를 생성한다.
			 * @date         : 2015. 10.26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShowChart : function(id) {
				for (var i=0; i<this.layerGroup.length; i++) {
					var layerGroup = this.layerGroup[i];
					if (layerGroup.id == id) {
						var data = layerGroup.data;
						var title = layerGroup.param.title;
						var unit = layerGroup.param.unit;
						var type = layerGroup.type;
						this.addChart(data, title, unit, id, type);
						this.addGrid(data, title, unit, type);
						break;
					}
				}
				$(".dscList dt>a").addClass("on");
				$(".dscList dt>a").parents("dt").next("dd").show();
			},
			
			
			/**
			 * 
			 * @name         : addViewGraph
			 * @description  : 그래프버튼을 생성한다.
			 * @date         : 2015. 10.26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			addViewBtn : function(type, data) {
				var html = "";
				var viewId = "";
				var btnId = "";
				if (type == "normal") {
					viewId = parseInt(data.id) + 1;
					html += "<a href='javascript:$combineMap.ui.doShowChart(\""+ data.id +"\");' class='btnStyle03' id='viewBtn_"+ data.id +"'>View"+ viewId +"</a>";
				}else {
					for (var i=0; i<data.length; i++) {
						viewId += parseInt(data[i].id) + 1;
						btnId += data[i].id;
						if (i < data.length-1) {
							viewId += "+";
							btnId += "-";
						}
					}
					html += "<a href='javascript:$combineMap.ui.doShowChart(\""+ btnId +"\");' class='btnStyle03' id='viewBtn_"+ btnId +"'>View"+ viewId +"</a>";
				}
				$(".dscEtc01").append(html);
				this.enableEvent();
			},
			
			
			/**
			 * 
			 * @name         : addChart
			 * @description  : 차트를 생성한다.
			 * @date         : 2015. 10.26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			addChart : function(data, title, unit, mapId, type) {
				var length = 0;
				var height = 0;
				var categories = [];
				if (type == "multi") {
					var title = title + " (" + unit + ")";
					var tmpData = [];
					var series = [];
					for (var i=0; i<data.length; i++) {
						var Ldata = data[i].data.result;
						for (var k=0; k<Ldata.length; k++) {
							tmpData.push(parseFloat(Ldata[k][Ldata[k].showData]));
						}
						categories.push(i+1+"");
					}

					var color = "#0070c0";
					switch (parseInt(mapId)) {
						case 0:
							color = "#0070c0";
							break;
						case 1:
							color = "#9ed563";
							break;
						case 2:
							color = "#ff0066";
							break;
					}
					
					series.push({name: title, data: tmpData, color:color});
					length = tmpData.length;
					
					if (length <= 20) {
						height = 500;
					}else {
						height = length * 35;
					}
				}else {
					if ( Object.prototype.toString.call(data) === '[object Array]' ) {
						var ids = mapId.split("-");
						var series = [];
						// 2016. 03. 30 본사수정
						var admCdList = [];
						for (var i=0; i<data.length; i++) {
							var Ldata = data[i].result;
							var tmpData = [];
							categories.push(i+1+"");
							//2016.03.29 수정, 결합시 차트정렬문제
							if (i == 0) {
								for (var k=0; k<Ldata.length; k++) {
									admCdList.push(Ldata[k].adm_cd);
									tmpData.push(parseFloat(Ldata[k][Ldata[k].showData]));
								}
								
							}else {
								for (var x=0; x<admCdList.length; x++) {
									for (var k=0; k<Ldata.length; k++) {
										if (admCdList[x] == Ldata[k].adm_cd) {
											tmpData.push(parseFloat(Ldata[k][Ldata[k].showData]));
											break;
										}
									}
								}
							} 
							/*for (var k=0; k<Ldata.length; k++) {
								tmpData.push(parseFloat(Ldata[k][Ldata[k].showData]));
							}*/
							
							var color = "#0070c0";
							switch (parseInt(ids[i])) {
								case 0:
									color = "#0070c0";
									break;
								case 1:
									color = "#9ed563";
									break;
								case 2:
									color = "#ff0066";
									break;
							}
							series.push({name:title[i], data:tmpData, color:color});
							length = Ldata.length;
						}
						
						// 2016. 03. 29 j.h.Seok modify
						height = length * 40;
						
						if (length <= 20) {
							height = 500;
						}else {
							height = length * 50;
						}
					}else {
						var data = data.result;
						var title = title + " (" + unit + ")";
						var tmpData = [];
						var series = [];
						for (var i=0; i<data.length; i++) {
							tmpData.push(parseFloat(data[i][data[i].showData]));
							categories.push(i+1+"");
						}
						
						var color = "#0070c0";
						switch (parseInt(mapId)) {
							case 0:
								color = "#0070c0";
								break;
							case 1:
								color = "#9ed563";
								break;
							case 2:
								color = "#ff0066";
								break;
						}
						
						series.push({name: title, data: tmpData, color:color});
						length = data.length;
						
						if (length <= 20) {
							height = 500;
						}else {
							height = length * 35;
						}
					}
				}

				$("#dataChart").highcharts({
			        chart: {
			            type: 'bar', 
			            height : height,
			            width : 480
			        },
			        title: {
			            text: title 
			        },
			        subtitle: {
			            text: ''
			        },
			        xAxis: {
			            categories: categories,//['', '', '', '', ''],
			            title: {
			                text: null
			            },
			            enabled : false
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '',  align: 'high'
			            },
			            labels: {
			                overflow: 'justify'
			            }
			        },
			        tooltip: {
			        	enabled : false
			        },
			        plotOptions: {
			            bar: {
			                dataLabels: {
			                    enabled: true
			                }
			            }
			        },
			        legend: {
			        	enabled : false
			        },
			        credits: {
			            enabled: false
			        },
			        series: series
			    });
			},
			
			
			/**
			 * 
			 * @name         : addGrid
			 * @description  : 표를 생성한다.
			 * @date         : 2015. 10.26. 
			 * @author	     : 권차욱
			 * @history 	 :javascript keybalue
			 */
			addGrid : function(data, title, unit, type) {
				var header = null;
				if (type == "multi") {
					var title = title + " (" + unit + ")";
					header = ["행정동", title];
					var tmpData = [];
					
					for (var i=0; i<data.length; i++) {
						var Ldata = data[i].data.result;
						if (i==0) {
							var tmpTitle = title.split("|")[i] + " (" + data[i].data.unit + ")";
							header.push(tmpTitle);
						}
						for (var k=0; k<Ldata.length; k++) {
							var record = [];
							record.push(Ldata[k].adm_cd);
							record.push(Ldata[k][Ldata[k].showData]);
							tmpData.push(record);
						}
					}
				}else {
					if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
						header = [];
						header.push("행정동");
						
						var tmpAdmCd = [];
						for (var i=0; i<data.length; i++) {
							var Ldata = data[i].result;
							var tmpTitle = title.split("|")[i] + " (" + data[i].unit + ")";
							header.push(tmpTitle);
							
							for (var k=0; k<Ldata.length; k++) {
								tmpAdmCd.push(Ldata[k].adm_cd);
							}
						}	
						
						var codeList = tmpAdmCd.reduce(function(a,b){
							if (a.indexOf(b) < 0 ) a.push(b);
							return a;
						  },[]);
						tmpAdmCd = null;
						
						var tmpData = [];
						for (var i=0; i<codeList.length; i++) {
							var tmpRowData = [];
							tmpRowData.push(codeList[i]);
							for (var k=0; k<data.length; k++) {
								var Ldata = data[k].result;
								for (var j=0; j<Ldata.length; j++) {
									if (codeList[i] == Ldata[j].adm_cd) {
										tmpRowData.push(Ldata[j][Ldata[j].showData])
										break;
									}
								}
							}
							tmpData.push(tmpRowData);
						}
						
					}else {	
						var Ldata = data.result;
						var title = title + " (" + unit + ")";
						header = ["행정동", title];
						var tmpData = [];
						for (var i=0; i<Ldata.length; i++) {
							var record = [];
							record.push(Ldata[i].adm_cd);
							record.push(Ldata[i][Ldata[i].showData]);
							tmpData.push(record);
						}
					}
				}

				var columns = [];
				var colWidth = [];
				for (var i=0; i<header.length; i++) {
					columns.push({data:header[i],editor:false});
					colWidth.push(50);
				}
				var dbHeight = $(".dataSideContents").height();
				
				if (tmpData.length > 20) {
					dbHeight = tmpData.length * 25;
				}
				
				$("#dataGrid").empty();
				var container = document.getElementById("dataGrid"); 
				var grid = new Handsontable(container, {
					data : tmpData,
					height : dbHeight,
					colWidths : colWidth,
					colHeaders : header,
					rowHeaders : true,
					stretchH : 'all',
					contextMenu : true,
					autoRowSize: {syncLimit: '100%'},
					autoColumnSize : true,
					className: "htCenter",
				});
				grid.updateSettings({
				    cells: function (row, col, prop) {
				      var cellProperties = {};
				      cellProperties.readOnly = true;
				      return cellProperties;
				    }
				});
			},
			
			/**
			 * 
			 * @name         : drawMarker
			 * @description  : 마커를 생성한다.
			 * @date         : 2016. 02.02. 
			 * @author	     : 권차욱
			 * @history 	 : 
			 */
			drawMarker : function(mapData, type) {
				var map = this.mapList[0];
				var dataList = mapData.rowDataArray;
				var checkList = [];
				var tmpMarkerGroup = sop.featureGroup();
				map.gMap.addLayer(tmpMarkerGroup);
				
				if (type == "POI") {
					for (var i = 0; i < mapData.length; i++) {
						var theme_cd = mapData[i].theme_cd.substring(0, 2) + '_' + mapData[i].theme_cd.substring(2, 4);
						var markerIcon = sop.icon({
							iconUrl: '/img/marker/marker/' + theme_cd + '.png',
							shadowUrl: '/img/marker/theme_shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
						var marker = sop.marker([ mapData[i].x, mapData[i].y ], {
							icon: markerIcon
						});
						
						marker.info = mapData[i];
						
						var tel_num = "";
						if (!sop.Util.isUndefined(mapData[i].tel_no)) {
							tel_num = mapData[i].tel_no;
						}
						var html ="";
						html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
						html += 	'<tr>';
						html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + mapData[i].corp_nm + '</strong></th>';
						html += 		'<td></td>';
						html += 	'</tr>';
						html += 	'<tr>';
						html += 		'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + mapData[i].naddr + '</th>';
						html += 		'<td></td>';
						html += 	'</tr>';
						html += '</table>';
						
						marker.bindInfoWindow(html);
						tmpMarkerGroup.addLayer(marker);
					}
				} else {
					//표출 데이터 인덱스 설정
					for(var i =0; i < mapData.dispData.length;i++){
						if(mapData.dispData[i] == true){
							radio1Index = i;
						}
					}
					
					//툴팁 데이터 설정
					for(var i =0; i < mapData.tooltipSetting.length; i++){
						if(mapData.tooltipSetting[i] == true){
							checkList.push(i);
						}
					}
					
					var markerIcon = sop.icon({
						iconUrl: '/js/plugins/jquery-easyui-1.4/images/marker-icon.png',
						shadowUrl: '/js/plugins/jquery-easyui-1.4/images/marker-shadow.png',
						iconAnchor: [12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					
					//마커 생성 및 표출
					for(var i = 0; i < dataList.length; i ++) {
						x_coord = dataList[i].GEO_X;
						y_coord = dataList[i].GEO_Y;
						var marker = sop.marker([x_coord, y_coord],{
							icon:markerIcon
						});
						
						var html  = "<div style='margin:10px;'>";
							html += "<div style='font-size:14px;font-weight:bold;color:#3792de;'>" + dataList[i].SEQ+". " + this.getFirstKeyValue(dataList[i].USR_DATA[radio1Index]) +"</div>";
							html +=	"<div style='height:5px;'></div>";
							for(var x = 0; x < checkList.length; x ++){
								html += "<div style='font-size:12px;padding-left:5px;'>" + dataList[i].USR_DATA[checkList[x]].COL_NM + " : " + this.getFirstKeyValue(dataList[i].USR_DATA[checkList[x]]) + "</div>";
							}
							html += "</div>";
					
						marker.bindInfoWindow(html);
						tmpMarkerGroup.addLayer(marker);
					}
				}
				return tmpMarkerGroup;
			},
			
			drawHeatMap : function(mapData) {
				var map = this.mapList[0];
				var dataList = mapData.rowDataArray;
				for(var i = 0; i < dataList.length; i ++) {
					x_coord = dataList[i].GEO_X;
					y_coord = dataList[i].GEO_Y;
					map.addHeatMap(x_coord, y_coord, 1000);
				}
			},
			
			getFirstKeyValue : function( data ) {
			    for (elem in data ){ 
			        return data[elem];
			    }
			},
			
			
			/**
			 * 
			 * @name         : enableEvent
			 * @description  : 조회버튼 이벤트 활성화
			 * @date         : 2015. 10.23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			enableEvent : function() {
				$("#btnList").find("input").off("click").click(function() {
					if(!$combineMap.ui.checkHeatMap($(this))) {
						return;
					}
					
					$combineMap.ui.checkAdmCode();
					var isCombine = false;
					var id = $(this).attr("id").split("_")[1];
					var title = "";
					var map = $combineMap.ui.mapList[0];
					if ($(this).attr("id").indexOf("combine_") != -1) {
						isCombine = true;
						title = $(this).parent().attr("title");
					}
					
					var isCheck = $(this).is(":checked");
					if(!isCheck){
						var group = $combineMap.ui.layerGroup;
						for (var i=0; i<group.length; i++) {
							var layerGroup = group[i];
							if (id == layerGroup.id) {
								if (layerGroup.type == "poi") {
									map.gMap.removeLayer(layerGroup.geojson);
								}else if (layerGroup.type == "heat") {
									if (map.heatMap) {
										map.heatMap.setUTMKs([]);
									}
								}else {
									for (var k=0; k<layerGroup.layer.length; k++) {
										layerGroup.layer[k].remove();
									}
									if (layerGroup.legendObj.circleMarkerGroup != null) {
							    		for (var i=0; i<layerGroup.legendObj.circleMarkerGroup.length; i++) {
								    		var marker = layerGroup.legendObj.circleMarkerGroup[i];
								    		marker.remove();
								    	}
							    		layerGroup.legendObj.circleMarkerGroup = null;
							    	}
									if (map.heatMap) {
										// 2016. 03. 29 j.h.Seok modify
										var className = $(this).parent().attr("class");
										if (className != undefined && className.indexOf("heat") != -1) {
											map.heatMap.setUTMKs([]);
										}
							    	}
								}
								$("#legend_"+layerGroup.legendObj.id).hide();
								break;
							}
						}
					}else{
						if (isCombine) {
							$combineMap.ui.addCombineLayer(id, title);
						}else {
							var group = $combineMap.ui.layerGroup;
							var layerGroup = null;
							for (var i=0; i<group.length; i++) {
								if (group[i].id == id) {
									layerGroup = group[i];
									$("#legend_"+layerGroup.legendObj.id).show();
									break;
								}
							}
							
							if (layerGroup.type == "poi") {
								map.gMap.addLayer(layerGroup.geojson);
							}else if (layerGroup.type == "heat") {
								$combineMap.ui.drawHeatMap(layerGroup.data);
							}else {
								//맵 객체는 하나인데, 범례는 여러개를 생성할 수 있는 구조라
								//말이 안되지만, 이렇게 밖에 할 수 없다.
								//layer의 갯수를 판별하여 하나이면 normal 데이터이고,
								//여러개이면 multi 데이터이다.
								if (layerGroup.layer.length > 1) {
									map.dataGeojson = null;
									map.multiLayerControl.dataGeojson = [];
								}else {
									map.multiLayerControl.dataGeojson = null;
								}
								for (var k=0; k<layerGroup.layer.length; k++) {
									layerGroup.layer[k].addTo(map.gMap);
									if (layerGroup.layer.length > 1) {
										map.multiLayerControl.dataGeojson.push(layerGroup.layer[k]);
									}else {
										map.dataGeojson = layerGroup.layer[k];
									}
								}
								
								//타입별로 타입구성(색상, 버블, 점, 히트)
								// 2016. 03. 29 j.h.Seok modify
								if (layerGroup.legendObj != null) {			
									$("#lgTypeList_"+layerGroup.legendObj.id+">li>a").each(function() {
										var type = $(this).attr("data-type");
										if (type == layerGroup.legendObj.selectType) {
											$(this).click();
										}
									});
								}
							}
						}						
					}
				});
				
				$(".btnStyle03").off("click").click(function() {
					$(".btnStyle03").each(function() {
						var on = $(this).hasClass("on");
						if (on) {
							$(this).removeClass("on");
						}
					});
					$(this).addClass("on");
				});
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
				var html = "<div class='tooltip' style='margin:10px;'>";
				var searchYear = "";

				//사용자데이터가 아닐경우만
				if (data.info[0].api_id && data.info[0].api_id != "API_MYDATA") {
					for (var i=0; i<$combineMap.ui.layerGroup.length; i++) {
						var group = $combineMap.ui.layerGroup[i];
						if (group.id == data.info[0].mapId && group.param.params != undefined) {
							for (var k=0; k<group.param.params.length; k++) {
								if (group.param.params[k].key == "year") {
									searchYear = group.param.params[k].value + "년 ";
									break;
								}
							}
							break;
						}
					}
				}		
				
				if (type == "data") {
					if (data.info.length > 0) {
						if(data.info[2] == "kosis") {
							var html = "<div style='margin:10px;'>";
							if (data.properties.adm_nm !== undefined) {
								html += "<div class='admName'>"
									 + data.properties.adm_nm 
									 + "</div>"
									 + "<div style='height:5px'></div>";
							}
							
							if(data.info[0] != null && data.info[0] != undefined && data.info[0] != 'NaN') {
								var value = appendCommaToNumber(data.info[0]);
								html += "<div class='statsData'>"
									 + searchYear + value;
							} else {
								html += "<div class='statsData'>-";
							}
							
							if (data.info[1] != undefined) {
								html += " (" + data.info[1] + ")";
							}
						    html += "</div>";
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
								"fishery_cnt" : "어가수",
								"tot_family" : "총가구",
								"avg_fmember_cnt" : "평균가구원수",
								"tot_house" : "총주택",
								"nongga_cnt" : "농가(가구)",
								"nongga_ppltn" : "농가(인구)",
								"imga_cnt" : "임가(가구)",
								"imga_ppltn" : "임가인구",
								"naesuoga_cnt" : "내수면총어가",
								"naesuoga_ppltn" : "해수면어가인구",
								"haesuoga_cnt" : "해수면총어가",
								"haesuoga_ppltn" : "해수면어가인구",
								"employee_cnt" : "종사자수"
							};
							
							for (var i=0; i<data.info.length; i++) {
								var tmpData = data.info[i];
								if (i == 0) {
									if (tmpData.adm_nm !== undefined) {
										html += "<div class='admName'>"
											 + tmpData.adm_nm 
											 + "</div>"
											 + "<div style='height:5px'></div>";
									}
								}
								
								if (tmpData.showData != undefined && tmpData.showData.length > 0) {
									var filterName = ""; 
									var title = "";
									if (showName[tmpData.showData] != undefined) {
										filterName = showName[tmpData.showData];
									}
									html += "<div>";
									
									//사용자데이터의 경우
									if (tmpData.userData) {
										if (tmpData.userData.length > 0 && tmpData.userData[0].title) {
											title = tmpData.userData[0].title + " : ";
										}
									}else {
										if (filterName.length > 0) {
											title = searchYear +" " + filterName + " : ";
										} else {
											title = searchYear + " : ";
										}
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
										//2016.03.24 수정, 사업체일 경우 5미만 N/A처리로 변경
										//tmpData.showData != "corp_cnt" &&
										tmpData.showData != "tot_worker" &&
										tmpData.showData != "avg_fmember_cnt" &&
										tmpData.showData != "employee_cnt") {
										value = "N/A";
									}else {
										value = appendCommaToNumber(tmpData[tmpData.showData]);
									}
									
									if (value != "N/A" && tmpData.unit != undefined) {
										html += "<div class='statsData'>"+title+value+" ("+tmpData.unit+")</div>";
									}else {
										html += "<div class='statsData'>"+title+value+"</div>";
									}
									
									
								/*	//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위삭제
									if (tmpData.showData != "aged_child_idx" && 
										tmpData.showData != "oldage_suprt_per" &&
										tmpData.showData != "juv_suprt_per" && 
										tmpData.showData != "tot_suprt_per" && value != "N/A") {
										html +=  " ("+ tmpData.unit +")";
									}*/

									html += "</div>";
								}	
							}
						}
					}else {
						html += "<div class='statsData'>N/A</div>";
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

			}
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$combineMap.callbackFunc = {
			
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
					$interactiveMap.ui.doInnerMap(map.id+1);
				}

				//사업체 POI 없애기
				if (map.zoom < 10 && poiControl.isOpenPOI) {
					messageAlert.open("알림", "해당 레벨에서는 사업체 POI정보를 볼 수 없습니다.");
					poiControl.clearPOI();
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
							for (var i=0; i<$combineMap.ui.layerGroup.length; i++) {
								var layer = $combineMap.ui.layerGroup[i];
								if (data.isKosis) {
									if (layer.id == data.info[3]) {
										var legend = layer.legendObj;
										legend.selectLegendRangeData(event.target.options.fillColor);
										break;
									}
								}else {
									if (layer.id == data.info[0].mapId) {
										var legend = layer.legendObj;
										legend.selectLegendRangeData(event.target.options.fillColor);
										break;
									}
								}
							}
						}
					}
					$combineMap.ui.createInfoTooltip(event, data, type, map);
				}
			}
	};
	
	$combineMap.event = {
			
			setUIEvent : function() {
				$(".btnScroll").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
				$(".dataSideScroll").mCustomScrollbar({axis:"xy"});
				$(".btnScroll").find("#mCSB_2_container").css("width", "300px");
				
				$(".interactiveDataBoard").click(function(){ 
					var ck = $(this).hasClass("on");
					if(!ck){
						var full = $(".dataSideBox").hasClass("full");
						$(".dataSideBox").stop().animate({"right":"0"},200);
						if(!full){
							$(this).addClass("on").stop().animate({"right":"426px"},200);
						}else{
							$(this).addClass("on").stop().animate({"right":"370px"},200);
						}
						
					}else{
						$(".dataSideBox").stop().animate({"right":"-1500px"},200);
						$(this).removeClass("on").stop().animate({"right":"0"},200);
					} 
				});
				
				$(".sideQuick.sq03").click(function(){
					var on = $(this).hasClass("on");
					if(!on){
						$(this).next(".sqListBox").stop().animate({"left":"0px"},200);
						$(this).addClass("on");
					}else{
						$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
						$(this).removeClass("on");
					}
				}); 
				
				$(".dataSideBox .bar>a").click(function(){ 
					$(".dataSideBox").stop().animate({"right":"-1500px"},200);
					$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
				});
				
				$(".dscList dt>a").click(function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).parents("dt").next("dd").show();
					}else{
						$(this).removeClass("on");
						$(this).parents("dt").next("dd").hide();
					} 
				});
				
				$(".typeBox>a").click(function(){ 
					$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
					$(this).addClass("on");
					var ck = $(this).index(".typeBox>a")+1;
					if(ck%2){
						$(this).parents(".compareBox").eq(0).find(".combineChart").show();
						$(this).parents(".compareBox").eq(0).find(".combineGrid").hide();
						$("#dataGrid").hide();
						$(".btn_excelDownload").hide();
					}else{
						$(this).parents(".compareBox").eq(0).find(".combineChart").hide();
						$(this).parents(".compareBox").eq(0).find(".combineGrid").show();
						$("#dataGrid").show();
						if ($("#dataGrid").hasClass("handsontable")) {
							$(".btn_excelDownload").show();
						}else {
							$(".btn_excelDownload").hide();
						}
					}
			    });
				
				$("#dataSlider").slider({
			    	range: "min",
			        min: 5,
			        max: 10,
			        value: 10,
			        slide: function( event, ui ) {
			        	$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value*0.1);
				    }
			    });
				$(".dataSideBox, .interactiveDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );

				$(".sideQuick.sq03").click();
				
			}
			
	};
	
}(window, document));
