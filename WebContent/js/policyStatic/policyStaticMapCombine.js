/**
 * 대화형 통계지도 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2010/09/10  초기 작성
 *           변경하여 정책통계지도 작성 2016.10.22
 * author :  송종대
 * version : 1.0
 * see : 
 */
(function(W, D) {
	W.$policyStaticMapCombine = W.$policyStaticMapCombine || {};
	$policyStaticMapCombine.noReverseGeoCode = true;
	$(document).ready(function() {
	//	var abs = new sop.portal.absAPI();
	//	abs.onBlockUIPopup();
	
			$policyStaticMapCombine.ui.createMap("mapRgn", 0);
			$policyStaticMapCombine.event.setUIEvent();
		
	});
	
	$policyStaticMapCombine.ui = {
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

			/**
			 * @name         : createMap
			 * @description  : 지도를 생성한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			createMap : function(id, seq) {
				var map = new sMap.map();
				map.createMap($policyStaticMapCombine, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				map.id = seq;
				map.isMultiSelectedBound = true;
				
				this.mapList[seq] = map;
				
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($policyStaticMapCombine.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "negative";//negative legend 사용을 위한 namespace
				
				//2017.05.29 [개발팀] 융합창 수정
				var dWidth = window.opener.$policyStaticMap.ui.combinePopupWidth;
				var dHeight = window.opener.$policyStaticMap.ui.combinePopupHeight;
				console.log(dWidth);
				console.log(dHeight);
				$(".FuseResult").css({
					"width" : dWidth + "px",
					"height" : dHeight + "px",
					"left" : "calc(50% - " + parseInt(dWidth/2) + "px)",
					"top" : "2px"
				});
				$(".FR_MapArea").css({
					"width" : (dWidth-390) + "px",
					"height" : (dHeight-45) + "px"
				});
				
				map.gMap.whenReady(function() {
					map.createHeatMap();
					map.update(); 	//2017.05.29 [개발팀] 융합창 수정
					$(".negativeDefaultColor").show();//negative legend 사용을 위한 namespace
					$(".negativeDefaultColor > a").click();//negative legend 사용을 위한 namespace
					
					//색상설정>혼합색상 적용 (위 nagative 적용 대신 사용 가능)
					//$(".ac").click();
					//$("#colorConfirm_"+$policyStaticMapCombine.ui.mapList[0].legend.id).click();
					
					window.opener.$policyStaticMap.ui.mapLoad();
					$policyStaticMapCombine.ui.doShowChart('data','1');
					$policyStaticMapCombine.ui.setTitle($policyStaticMapCombine.ui.combineDataSet);
				});
			},
			
			
			/**
			 * @name         : setTitle
			 * @description  : 팝업창 타이틀 정보를 전달한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			setTitle : function(dataSet){
				var titleNm = "<span>융합결과</span>"+dataSet.adm_nm+" "+dataSet.sideQuickText+" ["+dataSet.menuText+"] 통계지도 ("+dataSet.selectYears[0] +"~"+dataSet.selectYears[1]+"년 "+dataSet.subMenuText+")"; 
				var menuNm = "<span>주요지표</span>"+dataSet.subMenuText +" ("+dataSet.selectYears[0] +"~"+dataSet.selectYears[1]+")"; 
				var sidoSggNm = "<span>대상지역</span>"+dataSet.adm_nm;
				$("#combineTitle").empty();
				$("#combineTitle").append(titleNm);
				
				$("#openerMenu,#combineMenu").empty();
				$("#openerMenu,#combineMenu").append(menuNm);
				
				$("#openerSidoSgg,#combineSidoSgg").empty();
				$("#openerSidoSgg,#combineSidoSgg").append(sidoSggNm);
				
				$("#openerorigin,#combineorigin").empty();
				$("#openerorigin,#combineorigin").append("<span>출&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;처</span><span>"+window.opener.$("#dataBoardOrigin>span").text()+"</span>");
			},
			
			/**
			 * @name         : setCombineData
			 * @description  : 융합된 정보를 전달한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			setCombineData : function(cdgLayer, combineDataSet, openerMapList, openerArParamList) {
				$policyStaticMapCombine.ui.combineDataSet = combineDataSet;
				$policyStaticMapCombine.ui.openerMapList = openerMapList;
				$policyStaticMapCombine.ui.openerArParamList = openerArParamList;
				$policyStaticMapCombine.ui.cdgLayer = cdgLayer;
				
				var map = this.mapList[0];
				map.dataGeojson = null;
				map.multiLayerControl.dataGeojson = null;
				
				var tmpLegendData = [];
				for (var i=0; i<cdgLayer.features.length; i++) {
					var _showData = cdgLayer.features[i].info[0].showData;
					if(null != _showData){
						var showData = cdgLayer.features[i].info[0][_showData];
						if("N/A" != showData) tmpLegendData.push(parseFloat(showData));
					}
				}
				var legendData = [];
				legendData.push(tmpLegendData);
				map.legend.valPerSlice = map.legend.calculateLegend(legendData);
				
				var polygonLayer = [];
				polygonLayer.push(map.addPolygonGeoJson(cdgLayer, "data"));
				
				map.mapMove(openerMapList[0].center, openerMapList[0].zoom);
			},
			
			/**
			 * @name         : createInfoTooltip
			 * @description  : 지도 툴팁 정보를 제공한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			createInfoTooltip : function(event, data, type, map) {
				var _showData = data.info[0].showData;
				var html = "<table style='margin:10px;'>";
				if(data.info[0][_showData]){
					html += "<tr><td class='admName'>" + data.properties.adm_nm + "</td></tr>"
					if(data.info[0].unit){
						html += "<tr><td class='statsData'>"+(_showData=="arithmeticRate"?"증감률":"증감")+" : "+appendCommaToNumber(data.info[0][_showData])+" ("+data.info[0].unit+")</td>";
					}else{
						html += "<tr><td class='statsData'>"+(_showData=="arithmeticRate"?"증감률":"증감")+" : "+appendCommaToNumber(data.info[0][_showData])+"</td>";
					}
					html += "</td></tr></table>";
				}else{
					html += "<tr><td class='statsData'>N/A</td></td></table>";
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
			 * @name         : doShowChart
			 * @description  : 차트 정보를 제공한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			doShowChart : function(dataType, mapType) {
				
				var title = "기준데이터";
				var showData = "data1";
				var showUnit = "data1Unit";
				switch (parseInt(mapType)) {
					case 0:
						title = "기준데이터";
						showData = "data1";
						showUnit = "unit1";
						break;
					case 1:
						title = "최종데이터";
						showData = "data2";
						showUnit = "unit2";
						break;
					case 2:
						if("data" == dataType){
							showData = "arithmeticData";
							showUnit = "arithmeticDataUnit";
							title = "융합데이터(증감)";
						}else if("rate" == dataType){
							showData = "arithmeticRate";
							showUnit = "arithmeticRateUnit";
							title = "융합데이터(증감률)";
						}
						break;
				}
				
				$("#step1 .DataBox").hide();
				if("2" == mapType){//융합, 융합율 차트 그리드
					$(".FR_fuse").show();
					$policyStaticMapCombine.ui.addChart($policyStaticMapCombine.ui.combineDataSet.combineData, title, mapType, showData, showUnit);
				}else{//기준지, 추가지 융합된 차트 그리드
					$(".FR_single").show();
					$policyStaticMapCombine.ui.openerMapLoad();
					var layerGroup = $policyStaticMapCombine.ui.layerGroup[2];
					var data = layerGroup.data;
					var title = layerGroup.param.title;
					var unit = layerGroup.param.unit;
					var type = layerGroup.type;
					title = layerGroup.param.subTitle[0]+"|"+layerGroup.param.subTitle[1];
					
					$policyStaticMapCombine.ui.addOpenerChart(data, layerGroup.param.years, unit, "0-1", type);
				}
			},
			
			
			/**
			 * @name         : openerMapLoad
			 * @description  : 2중 차트 - mapList 정보를 data로 변경한다. 호출
			 *                 결합차트 생성 호출
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			openerMapLoad : function() {
				var data = [];
				for (var i=0; i< $policyStaticMapCombine.ui.openerMapList.length; i++) {
					if ($policyStaticMapCombine.ui.openerMapList[i]) {
						var map = $policyStaticMapCombine.ui.openerMapList[i];
						if (map.dataGeojsonLayer == null 
							) {
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
						//============ 2017.05.29 비자치구 추가-데이터정제 END ==============//
						
						data.push({
							id : map.id, 
							geojson : null,
							data : map.dataForCombine,
							legend : {
								valPerSlice : map.legend.valPerSlice,
								legendColor : map.legend.legendColor,
								type : map.legend.selectType
							},
							param:$policyStaticMapCombine.ui.openerArParamList[map.id],
							zoom:map.zoom,
							center:map.center,
							adm_cd : map.curDropCd,
							type : "census"
						});
					}
					
				}
				$policyStaticMapCombine.ui.setData(data);
				$policyStaticMapCombine.ui.addCombineLayer("0-1", "결합차트");
			},
			
			/**
			 * @name         : setData
			 * @description  : 2중 차트 - data 정보를 layerGroup 로 변경한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			setData : function(data) {
				//초기화
				$policyStaticMapCombine.ui.layerGroup = [];
				
				var layer = null;
				for (var i=0; i<data.length; i++) {
					layer = {
							geojson : null,
							layer : [],
							legend : data[i].legend,
							param : data[i].param,
							id : data[i].id,
							admCd : data[i].adm_cd,
							data : data[i].data,
							legendObj : null,
							type : "normal"
					};
					$policyStaticMapCombine.ui.layerGroup.push(layer);
				}
			},
			
			/**
			 * @name         : addCombineLayer
			 * @description  : 2중 차트 - layerGroup 정보를 2중 정보로 취합후 push한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			addCombineLayer : function(id, title) {
				var map = $policyStaticMapCombine.ui.openerMapList[0];
				var layer = null;
				var ids = id.split("-");
				var datas = [];
				var years = [];
				var subTitles = [];
				var units = [];
				
				for (var i=0; i<ids.length; i++) {
					var group = $policyStaticMapCombine.ui.layerGroup;
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
				
				$policyStaticMapCombine.ui.layerGroup.push({
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
			},
			
			/**
			 * @name         : addOpenerChart
			 * @description  : 기준/추가 데이터 차트를 그린다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			addOpenerChart : function(data, title, unit, mapId, type) {
				var xAxisCat = [];	//X축 카테고리
				
				var length = 0;
				var height = 0;

				var ids = mapId.split("-");
				var series = [];
				// 2016. 03. 30 본사수정
				var admCdList = [];
				for (var i=0; i<data.length; i++) {
					var Ldata = data[i].chartResult;
					var tmpData = [];
					//2016.03.29 수정, 결합시 차트정렬문제
					if (i == 0) {
						for (var k=0; k<Ldata.length; k++) {
							admCdList.push(Ldata[k].adm_cd);
							if("N/A" == Ldata[k][data[i].showData]){
								tmpData.push(0);
							}else{
								tmpData.push(parseFloat(Ldata[k][data[i].showData]));
							}
							xAxisCat.push(Ldata[k].adm_nm);
						}
						
					}else {
						for (var x=0; x<admCdList.length; x++) {
							for (var k=0; k<Ldata.length; k++) {
								if (admCdList[x] == Ldata[k].adm_cd) {
									if("N/A" == Ldata[k][data[i].showData]){
										tmpData.push(0);
									}else{
										tmpData.push(parseFloat(Ldata[k][data[i].showData]));
									}
									break;
								}
							}
						}
					} 
					
					var color = "#0070c0";
					switch (parseInt(ids[i])) {
						case 0:
							color = "#002660";
							break;
						case 1:
							color = "#FFA333";
							break;
						case 2:
							color = "#ff0066";
							break;
					}
					series.push({name:title[i]+"년", data:tmpData, color:color, unit:unit[i]});
					length = Ldata.length;
				}
				
				// 2016. 03. 29 j.h.Seok modify
				height = length * 30;
				
				if (length <= 5) {
					height = 350;
				}else {
					height = length * 60; //2017.05.29 [개발팀] 40 -> 60
				}

				$("#targetOpenerCharts").css("height", height+"px");
				
				$("#targetOpenerCharts").highcharts({
				chart: {
				    type: 'bar', 
				    height : height,
				    width : 350,
				    events:{
				    	load: function(event) {
				    		$psmCombine.ui.chartLegend("targetOpenerCharts");
				    	}
				    }
				},
				exporting: { enabled: false },
				title: {
				    text: '' 
				},
				subtitle: {
				    text: ''
				},
				xAxis: {
				    categories: xAxisCat,
//				    title: {
//				    	text: null
//				    },
				    //enabled : false
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
		                step: 2,
		                align: 'center',
		                overflow : 'justify'
		                //rotation : -45
		            },
//				    showFirstLabel: true,
				    showLastLabel: false
				},
				
				legend: {
					enabled : true,
					verticalAlign: "top"
				},
				tooltip: {
					valueDecimals: 2,
					formatter: function () {
						if(this.point.y == 0) {	//0일 경우 N/A로 처리
							return 	'<span>' + this.point.category + '</span><br/>' +
										'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
						} else {
							return 	'<span>' + this.point.category + '</span><br/>' +
										'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: ' +
										'<b style="font-family:NanumBarunGothic;">' + appendCommaToNumber(this.point.y) + '(' +this.series.userOptions.unit+ ')</b>';
						}
					}
				},
				series: series
			    });
			},
			/**
			 * @name         : addChart
			 * @description  : 융합정보(증감,증감률) 차트를 그린다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			addChart : function(data, title, mapType, showData, showUnit) {
				
				var color = "#002660";
				
				if("arithmeticDataUnit" == showUnit){
					color = "#002660";
				}else{
					color = "#FFA333";
				}
				
				var xAxisCat = [];//X축 카테고리
				var tmpData = [];
				var length = 0;
				var height = 0;

				var series = [];
				// 2016. 03. 30 본사수정
				var admCdList = [];
				for (var i=0; i<data.length; i++) {
					
					if("N/A" == data[i][showData]){
						tmpData.push(0);
					}else{
						tmpData.push(parseFloat(data[i][showData]));
					}
					xAxisCat.push(data[i].adm_nm);
				}
				
				series.push({name:title, data:tmpData, color:color, unit:data[0][showUnit]});
				length = data.length;
				
				// 2016. 03. 29 j.h.Seok modify
				height = length * 30;
				
				if (length <= 5) {
					height = 350;
				}else {
					height = length * 40;
				}

				$("#targetCharts").css("height", height+"px");
				
				$("#targetCharts").highcharts({
				chart: {
				    type: 'bar', 
				    height : height,
				    width : 350,
				    events:{
				    	load: function(event) {
				    		$psmCombine.ui.chartLegend("targetCharts");
				    	}
				    }
				},
				exporting: { enabled: false },
				title: {
				    text: '' 
				},
				subtitle: {
				    text: ''
				},
				xAxis: {
				    categories: xAxisCat,
				    labels : { 
						rotation : 0,
						enabled: true
					}
				},
				yAxis: {
				    title: {
				    	text: ''//,  align: 'high'
				    },
				    labels: {
		                formatter:function(){return appendCommaToNumber(this.value);},
		                step: 2,
		                align: 'center',
		                overflow : 'justify'
		                //rotation : -45
		            },
					showLastLabel: false
				},
				
				legend: {
					enabled : true,
					verticalAlign: "top"
				},
				tooltip: {
					valueDecimals: 2,
					formatter: function () {
						if(this.point.y == 0) {	//0일 경우 N/A로 처리
							return 	'<span>' + this.point.category + '</span><br/>' +
										'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
						} else {
							var _html = "";
							if(this.series.userOptions.unit){
								_html = '<span>' + this.point.category + '</span><br/>' +
										'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: ' +
										'<b style="font-family:NanumBarunGothic;">' + appendCommaToNumber(this.point.y) + '(' +this.series.userOptions.unit+ ')</b>';
							}else{
								_html = '<span>' + this.point.category + '</span><br/>' +
								'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: ' +
								'<b style="font-family:NanumBarunGothic;">' + appendCommaToNumber(this.point.y) + '</b>';
							}
							return _html; 
						}
					}
				},
				series: series
			    });
			},
			setMapData : function(showData,unit){
				var map = $policyStaticMapCombine.ui.mapList[0];
				map.clearLayer();
				var tmpLegendData = [];
				for (var i=0; i<$policyStaticMapCombine.ui.cdgLayer.features.length; i++) {
					var layer = $policyStaticMapCombine.ui.cdgLayer.features[i].info[0];
					layer.showData = showData;
					layer.unit = layer[unit];
					if($.isNumeric(layer[showData])){
						tmpLegendData.push(parseFloat(layer[showData]));
					} 
				}
				var legendData = [];
				legendData.push(tmpLegendData);
				map.legend.valPerSlice = map.legend.calculateLegend(legendData);
				
				map.addPolygonGeoJson($policyStaticMapCombine.ui.cdgLayer, "data");
			},
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 데이터 세팅
			 * @date         : 2017. 01. 31. 
			 * @author	     : 나광흠
			 */
			reportDataSet : function(){
				$policyStaticMapCombine.ui.reportPopup = window.open(contextPath+"/js/policyStatic/report/policyStaticMap.report.html", "reportPrint","width=850, height=700, scrollbars=yes");
			}
	};
	
	$policyStaticMapCombine.event = {
			setUIEvent : function() {
				//스크롤바  (디자인 - 추후 변경)
				$(".DataBoxScroll").mCustomScrollbar({axis:"y"});
				
				var body = $("body");
				
				body.on("click","#step1>ul.Tab>li",function(){
					$("#step1>ul.Tab>li").removeClass("M_on");
					$(this).addClass("M_on");
					
					if("1" == $(this).attr("id")){
						$policyStaticMapCombine.ui.doShowChart('data','1');
					}else if("2" == $(this).attr("id")){
						$policyStaticMapCombine.ui.doShowChart('data','2');
					}
					$(".DataBoxScroll").mCustomScrollbar("update");
					$(".DataBoxScroll").mCustomScrollbar("scrollTo", "top", {
						scrollInertia: 0
					});
				});
				
				body.on("click",".DataSetup input",function(){
					if("data" == $(this).attr("id")){
						$policyStaticMapCombine.ui.doShowChart('data','2');
						$policyStaticMapCombine.ui.setMapData("arithmeticData","arithmeticDataUnit");
					}else if("rate" == $(this).attr("id")){
						$policyStaticMapCombine.ui.doShowChart('rate','2');
						$policyStaticMapCombine.ui.setMapData("arithmeticRate","arithmeticRateUnit");
					}
				});
				
				body.on("click","#closePopup",function(){
					self.close();
				});
				
			}
			
	};
	
	$policyStaticMapCombine.callbackFunc = {
			didMouseOverPolygon : function(event, data, type, map) {
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$policyStaticMapCombine.ui.createInfoTooltip(event, data, type, map);
				}
			}
			
	};
}(window, document));