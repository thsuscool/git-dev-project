/**
 * 정책지도 작성 페이지의 융합에 대한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2016/12/01  초기 작성
 * author : 송종대
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyWriteMapCombine = W.$policyWriteMapCombine || {};
	$(document).ready(function(){
		if(getParameter("type")==="static"){
			window.top.popupMapLoad();
		}else{
			window.opener.popupMapLoad();
		}
	});
	
	$policyWriteMapCombine.noReverseGeoCode = true;
	
	$policyWriteMapCombine.ui = {
			layerGroup : null,
			namespace : "policyWriteMap",
			mapList : [],
			data : null,
			layerGroup : [],
			isSameHeatMapType : false,
			heatMapIdx : [],
			combineDataSet : null,
			openerMapList : [],
			openerArParamList : [],
			curDropParams : [],
			openerMarkerList : [],
			cdgLayer : [],
			curMenuType : null,
			combineArithmetic : null,
			openerCurTitle : [],
			openerPoiRadius : 0,
			openerLeft : null,
			openerRight : null,
			
			/**
			 * @name         : createMap
			 * @description  : 지도를 생성한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			createMap : function(id, seq,callback) {
				var map = new sMap.map();
				map.createMap($policyWriteMapCombine, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				map.id = seq;
				map.isMultiSelectedBound = true;
				
				this.mapList[seq] = map;
				
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($policyWriteMapCombine.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "equal";
				
				map.gMap.whenReady(function() {
					map.createHeatMap();
					if(typeof callback === "function"){
						callback();
					}
				});
			},
			
			
			/**
			 * @name         : createNagativeMap
			 * @description  : NAGATIVE Legend 지도를 생성한다.
			 * @date         : 2016. 12.02. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			createNagativeMap : function(id, seq, callback) {
				$policyWriteMapCombine.ui.namespace = "thematicMap04";//negative legend 사용을 위한 namespace
				var map = new sMap.map();
				map.createMap($policyWriteMapCombine, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				map.id = seq;
				map.isMultiSelectedBound = true;
				
				this.mapList[seq] = map;
				
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($policyWriteMapCombine.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "negative";//negative legend 사용을 위한 namespace
				map.gMap.whenReady(function() {
					map.createHeatMap();
					
					$(".negativeDefaultColor").show();//negative legend 사용을 위한 namespace
					$(".negativeDefaultColor > a").click();//negative legend 사용을 위한 namespace
					
					//색상설정>혼합색상 적용 (위 nagative 적용 대신 사용 가능)
					//$(".ac").click();
					//$("#colorConfirm_"+$policyWriteMapCombine.ui.mapList[0].legend.id).click();
					
					if(typeof callback === "function"){
						callback();
					}
				});
			},
			
			/**
			 * @name         : setMarkerList
			 * @description  : Marker를 지도에 생성한다.
			 * @date         : 2016. 12.02. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param poiList
			 * @param radius
			 */
			setMarkerList : function(poiList, radius){
				if (poiList.length > 0) {
					var map = $policyWriteMapCombine.ui.mapList[0];
					for (var i = 0; i < poiList.length; i++) {
						var markerIconImgPath = "/img/policyStatic/circle_img.png";
						
						var markerIcon = sop.icon({
							iconUrl: markerIconImgPath,
							iconSize: [ 7, 7 ],
							infoWindowAnchor: [1, -34]
						});
						
						var marker = sop.marker([ poiList[i].info.x, poiList[i].info.y ], {
							icon: markerIcon
						});
						marker.info = poiList[i].info;
						marker.addTo(map.gMap);
						
						marker.bindInfoWindow(poiList[i].getInfoWindow()._content,poiList[i].getInfoWindow().options);
						
						//marker에 circle을 생성한다.
						if(null != poiList[i].info) $policyWriteMapCombine.ui.addCircle(poiList[i].info.x, poiList[i].info.y, radius , poiList[i].info.corp_nm);
					}
				}
			},
			
			/**
			 * @name         : addCircle
			 * @description  : marker 위치에 circle을 생성한다.
			 * @date         : 2016. 12.02. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param x
			 * @param y
			 * @param radius
			 * @param info
			 * @returns
			 */
			addCircle : function(x, y, radius, info) {
				var map = $policyWriteMapCombine.ui.mapList[0];
				var circle = null;
				if (map.gMap) {
					circle = sop.circle([x, y]);
					circle.setRadius(radius);
					circle.setStyle({
						color : "#8C9D88",
						weight : 2,
						opacity : 0.5,
						fillColor : "#8C9D88",
						fillOpacity : 0.3
					});
					if(info) circle.bindInfoWindow(info);
					
					circle.addTo(map.gMap);
				}
				return circle;
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
				$("#openerorigin,#openerorigin").empty();
				$("#combineorigin,#openerorigin").append("<span>출&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;처</span><span>통계청, 센서스데이터</span>");
			},
			
			/**
			 * @name         : setDataPoiTitle
			 * @description  : data-poi 팝업창 타이틀 정보를 전달한다.(버퍼형)
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			setDataPoiTitle : function(openerCurTitle){
				var titleNm = "";
				var poiNm = "";
				var menuNm = "";
				var sidoSggNm = "";
				var poiSpan = "";
				
				var adm_nm = "";
				var year = "";
				var gis_se = "";
				
				for (var i=0; i<openerCurTitle.length; i++) {
					if("0" == openerCurTitle[i].id){
						titleNm = "<span>버퍼 분석 데이터</span> [ 주요지표 : "+openerCurTitle[i].title+" ] ";
						menuNm = "<span>주요지표</span>"+openerCurTitle[i].title;
						
						var curParams = openerCurTitle[i].curDropParams;
						if("kosis" == openerCurTitle[i].mapType){
							for(var j = 0; j < curParams.param.length; j++) {
								if(curParams.param[j].key == "adm_nm"){
									adm_nm = curParams.param[j].value;
								}else if(curParams.param[j].key == "year"){
									year = curParams.param[j].value;
								}else if(curParams.param[j].key == "gis_se"){
									gis_se = curParams.param[j].value;
								}
							}
							if("1" == gis_se){
								adm_nm = "전국";//시도
							}
						}else{
							adm_nm = openerCurTitle[i].curDropParams.adm_nm;
						}
						sidoSggNm = "<span>대상지역</span>"+adm_nm;
					}else if("1" == openerCurTitle[i].id){
						poiNm = ", [ 시설정보 : "+openerCurTitle[i].title+" ]";
						poiSpan = "<span>시설종류</span>"+openerCurTitle[i].title;
					}
				}
				$("#combineTitle").empty();
				$("#combineTitle").append(titleNm+poiNm);
				$("#openerMenu").empty();
				$("#openerMenu").append(menuNm);
				$("#openerSidoSgg").empty();
				$("#openerSidoSgg").append(sidoSggNm);
				$("#openerPoi").empty();
				$("#openerPoi").append(poiSpan);
				$("#openerorigin,#combineorigin").empty();
				function getYear(){
					if(openerCurTitle[0].curDropParams.param){
						$.each(openerCurTitle[0].curDropParams.param,function(){
							if(this.key=="year"&&$.isNumeric(this.value)){
								year="("+this.value+"년)";
								return year;
							}
						});
					}
					return year;
				}
				var origin = "";
				if($policyWriteMapCombine.ui.openerCurTitle[0].mapType=="kosis"||($policyWriteMapCombine.ui.openerLeft&&$policyWriteMapCombine.ui.openerLeft.api_id=="kosis")){
					origin = "KOSIS(지역통계)";
				}else 
					if(openerCurTitle[0].curDropParams.api_id=="local"){
					origin = "지방자치단체";
				}else if(openerCurTitle[0].curDropParams.filter=="corp_cnt"||openerCurTitle[0].curDropParams.api_id=="API_0304"){
					origin = "전국사업체조사"+getYear();
				}else if(/^(API_0302|API_0305|API_0306|API_4011)$/.test(openerCurTitle[0].curDropParams.api_id)){
					origin = "인구주택총조사"+getYear();
				}else if(/^(API_0307|API_0308|API_0309)$/.test(openerCurTitle[0].curDropParams.api_id)){
					origin = "농림어업총조사"+getYear();
				}else{
					origin = "통계청, 센서스데이터"+getYear();
				}
				if(origin){
					$("#openerorigin,#combineorigin").append("<span>출&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;처</span><span>"+origin+"</span>");
				}
			},
			
			/**
			 * @name         : setDataDataTitle
			 * @description  : data-data 팝업창 타이틀 정보를 전달한다.(융합형)
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param openerCurTitle
			 */
			setDataDataTitle : function(openerCurTitle){
				var titleNm = "";
				var titleLeftNm = "";
				var titleRightNm = "";
				var menuNm = "";
				var menuLeftNm = "";
				var menuRightNm = "";
				var sidoSggNm = "";
				
				var adm_nm = "";
				var year = "";
				var gis_se = "";
				
				for (var i=0; i<openerCurTitle.length; i++) {
					if("0" == openerCurTitle[i].id){
						titleLeftNm = "<span>융합결과</span> [ 기준데이터 : "+openerCurTitle[i].title+" ] ";
						menuLeftNm = "<span>주요지표</span>"+openerCurTitle[i].title;
						
						var curParams = openerCurTitle[i].curDropParams;
						if("kosis" == openerCurTitle[i].mapType){
							for(var j = 0; j < curParams.param.length; j++) {
								if(curParams.param[j].key == "adm_nm"){
									adm_nm = curParams.param[j].value;
								}else if(curParams.param[j].key == "year"){
									year = curParams.param[j].value;
								}else if(curParams.param[j].key == "gis_se"){
									gis_se = curParams.param[j].value;
								}
							}
							if("1" == gis_se){
								adm_nm = "전국";//시도
							}
						}else{
							adm_nm = openerCurTitle[i].curDropParams.adm_nm;
						}
						sidoSggNm = "<span>대상지역</span>"+adm_nm;
						
					}else if("1" == openerCurTitle[i].id){
						titleRightNm = ", [ 추가데이터 : "+openerCurTitle[i].title+" ]";
						menuRightNm = " , "+openerCurTitle[i].title;
					}
				}
				$("#combineTitle").empty();
				$("#combineTitle").append(titleLeftNm+titleRightNm);
				$("#openerMenu,#combineMenu").empty();
				$("#openerMenu,#combineMenu").append(menuLeftNm+menuRightNm);
				$("#openerSidoSgg,#combineSidoSgg").empty();
				$("#openerSidoSgg,#combineSidoSgg").append(sidoSggNm);
				$("#openerorigin,#combineorigin").empty();
				var origin = [];
				function pushOrigin(curTitle){
					var api_id = curTitle.curDropParams.api_id;
					function getYear(){
						if(curTitle.curDropParams.param){
							$.each(curTitle.curDropParams.param,function(){
								if(this.key=="year"&&$.isNumeric(this.value)){
									year="("+this.value+"년)";
									return year;
								}
							});
						}
						return year;
					}
					var originText = "";
					if(api_id=="local"){
						originText = "지방자치단체";
					}else if(curTitle.curDropParams.filter=="corp_cnt"||api_id=="API_0304"){
						originText = "전국사업체조사"+getYear();
					}else if(/^(API_0302|API_0305|API_0306|API_4011)$/.test(api_id)){
						originText = "인구주택총조사"+getYear();
					}else if(/^(API_0307|API_0308|API_0309)$/.test(api_id)){
						originText = "농림어업총조사"+getYear();
					}else if(api_id=="kosis"){
						originText = "kosis";
					}else{
						originText = "통계청, 센서스데이터";
					}
					if(origin.indexOf(originText)==-1){
						origin.push(originText)
					}
				}
				if($policyWriteMapCombine.ui.openerCurTitle[0].mapType=="kosis"||($policyWriteMapCombine.ui.openerLeft&&$policyWriteMapCombine.ui.openerLeft.api_id=="kosis")){
					origin.push("KOSIS(지역통계)");
				}else{
					pushOrigin(openerCurTitle[0]);
				}
				if($policyWriteMapCombine.ui.openerCurTitle[1].mapType=="kosis"||($policyWriteMapCombine.ui.openerRight&&$policyWriteMapCombine.ui.openerRight.api_id=="kosis")){
					if(origin.indexOf("kosis")==-1){
						origin.push("KOSIS(지역통계)");
					}
				}else{
					pushOrigin(openerCurTitle[1]);
				}
				$("#openerorigin,#combineorigin").append("<span>출&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;처</span><span>"+origin.join(" , ")+"</span>");
			},
			
			/**
			 * @name         : setCombineData
			 * @description  : 융합된 정보를 전달한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			setCombineData : function(curMenuType, curDropParams, combineDataSet, combineArithmetic, cdgLayer, openerMapList, openerMarkerList, openerPoiRadius, openerCurTitle,left,right) {
				if(openerMapList[0].isFixedBound==true){
					$.each(openerMapList,function(){
						if(this.multiLayerControl&&this.multiLayerControl.multiData){
							this.multiLayerControl.multiData = this.multiLayerControl.multiData.sort(dynamicSort("data.pAdmCd",true));
						}
					});
				}
				$policyWriteMapCombine.ui.curMenuType = curMenuType;
				$policyWriteMapCombine.ui.curDropParams = curDropParams;
				$policyWriteMapCombine.ui.openerCurTitle = openerCurTitle;
				$policyWriteMapCombine.ui.openerPoiRadius = openerPoiRadius;
				$policyWriteMapCombine.ui.cdgLayer = cdgLayer;
				$policyWriteMapCombine.ui.openerMapList = openerMapList;
				$policyWriteMapCombine.ui.openerLeft = left;
				$policyWriteMapCombine.ui.openerRight = right;
				
				if("dataPoi" == curMenuType){
					$policyWriteMapCombine.ui.openerMarkerList = openerMarkerList;
					$policyWriteMapCombine.ui.setDataPoiTitle(openerCurTitle);
				}else if("dataData" == curMenuType){
					$policyWriteMapCombine.ui.combineDataSet = combineDataSet;
					$policyWriteMapCombine.ui.combineArithmetic = combineArithmetic;
					$policyWriteMapCombine.ui.setDataDataTitle(openerCurTitle);
				}
				function setEvent(){
					$policyWriteMapCombine.event.setUIEvent();
					if("dataPoi" == curMenuType){
						$policyWriteMapCombine.ui.addDataPoiChart($policyWriteMapCombine.ui.openerMapList[0]);
					}else if("dataData" == curMenuType){
						$policyWriteMapCombine.ui.addOpenerChart();
					}
					
					var kosisIs = false;
					var map = $policyWriteMapCombine.ui.mapList[0];
					map.dataGeojson = null;
					map.multiLayerControl.dataGeojson = null;
					
					var tmpLegendData = [];
					if($policyWriteMapCombine.ui.openerMapList[0].isFixedBound==true){
						$.each($policyWriteMapCombine.ui.cdgLayer.multiData,function(){
							for (var i=0; i<this.layer.features.length; i++) {
								setData(this.layer.features[i]);
							}
						});
					}else{
						for (var i=0; i<cdgLayer.features.length; i++) {
							setData(cdgLayer.features[i]);
						}
					}
					function setData(features){
						if(features.isKosis){
							kosisIs = true;
							if("N/A" != features.info[0] && undefined != features.info[0]){
								tmpLegendData.push(parseFloat(features.info[0]));
							}
						}else{
							if(0 < features.info.length){
								if(null != features.info[0].showData){
									var _showData = features.info[0].showData;
									if(null != _showData){
										var showData = features.info[0][_showData];
										if("N/A" != showData) tmpLegendData.push(parseFloat(showData));
									}
								}
							}
						}
					}
					var legendData = [];
					legendData.push(tmpLegendData);
					map.legend.valPerSlice = map.legend.calculateLegend(legendData);
					
					
					var _geojson = [];
					if(kosisIs){
						map.dataType = "kosis";
					}
					if($policyWriteMapCombine.ui.openerMapList[0].isFixedBound==true){
						map.multiLayerControl = $policyWriteMapCombine.ui.cdgLayer;
						map.multiLayerControl.dataGeojson = [];
						$.each($policyWriteMapCombine.ui.cdgLayer.multiData,function(){
							map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(this.layer, "data"));
						});
						map.updatePolygonGeoJson();
					}else{
						map.addPolygonGeoJson(cdgLayer, "data");
					}
					
					map.mapMove(openerMapList[0].center, openerMapList[0].zoom);
					
					if("dataPoi" == curMenuType){
						$policyWriteMapCombine.ui.setMarkerList(openerMarkerList, openerPoiRadius);//marker 작성
					}
				}
				if("-" == combineArithmetic){
					$policyWriteMapCombine.ui.createNagativeMap("mapRgn", 0, setEvent);
				}else{
					$policyWriteMapCombine.ui.createMap("mapRgn", 0, setEvent);
				}
			},
			
			/**
			 * @name         : createInfoTooltip
			 * @description  : 지도 툴팁 정보를 제공한다.(버퍼형)
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			createInfoTooltip : function(event, data, type, map) {
				var html = "<table style='margin:10px;'>";
				var searchYear = "";
				
				var _curDropParams = $policyWriteMapCombine.ui.curDropParams;//추가
				if(_curDropParams[map.id] != undefined) {
					for(var i = 0; i < _curDropParams[map.id].param.length; i ++) {
						if (_curDropParams[map.id].param[i].key == "year") {
							searchYear = _curDropParams[map.id].param[i].value + "년 ";
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
										if (data.properties.adm_cd.length > 7) {
											html += "<tr>";
											html += "<td class='statsData'>집계구 : " + data.properties.adm_cd + "</td>";
											html += "</tr>";
										}
									}
									
									if (tmpData.showData != undefined && tmpData.showData.length > 0) {
										var filterName = ""; 
										var title = "";
										if (showName[tmpData.showData] != undefined) {
											filterName = showName[tmpData.showData];
										}else{
											if(tmpData.div_nm!=null && tmpData.div_nm != undefined){
												filterName = tmpData.div_nm;
											}
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
											tmpData.showData != "employee_cnt"&&
											tmpData.showData != "cnt") {
											value = "N/A";
										}else {
											value = appendCommaToNumber(tmpData[tmpData.showData]);
										}
										
										if (value != "N/A") {
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
			 * @name         : createDataDataInfoTooltip
			 * @description  : 지도 툴팁 정보를 제공한다.(융합형)
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param event
			 * @param data
			 * @param type
			 * @param map
			 */
			createDataDataInfoTooltip : function(event, data, type, map) {
				if(data.isKosis){
					var html = "<table style='margin:10px;'>";
					if(data.info[0]){
						html += "<tr><td class='admName'>" + data.properties.adm_nm + "</td></tr>"
						html += "<tr><td class='statsData'>융합데이터 : "+appendCommaToNumber(data.info[0])+"</td>";
						html += "</td></tr></table>";
					}else{
						html += "<tr><td class='statsData'>N/A</td></td></table>";
					}
				}else{
					var _showData = data.info[0].showData;
					var html = "<table style='margin:10px;'>";
					if(data.info[0][_showData]){
						html += "<tr><td class='admName'>" + data.properties.adm_nm + "</td></tr>"
						//집계구 일경우
						if (data.properties.adm_cd.length > 7) {
							html += "<tr>";
							html += "<td class='statsData'>집계구 : " + data.properties.adm_cd + "</td>";
							html += "</tr>";
						}
						html += "<tr><td class='statsData'>융합데이터 : "+appendCommaToNumber(data.info[0][_showData])+"</td>";
						html += "</td></tr></table>";
					}else{
						html += "<tr><td class='statsData'>N/A</td></td></table>";
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
			 * @name         : doShowChart
			 * @description  : 차트 정보를 제공한다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			doShowChart : function(dataType, mapType) {
				var combineArithmetic = $policyWriteMapCombine.ui.combineArithmetic;
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
						showData = "arithmeticData";
						showUnit = "arithmeticDataUnit";
						title = "융합데이터";
						break;
				}
				
				$("#step1 .DataBox").hide();
				if("2" == mapType){//융합, 융합율 차트 그리드
					$(".FR_fuse").show();
					$policyWriteMapCombine.ui.addChart($policyWriteMapCombine.ui.combineDataSet.combineData, title, mapType, showData, showUnit);
				}else{//기준지, 추가지 융합된 차트 그리드
					$(".FR_single").show();
					$policyWriteMapCombine.ui.addOpenerChart();
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
				for (var i=0; i< $policyWriteMapCombine.ui.openerMapList.length; i++) {
					if ($policyWriteMapCombine.ui.openerMapList[i]) {
						var map = $policyWriteMapCombine.ui.openerMapList[i];
						if (map.dataGeojsonLayer == null 
							) {
							continue;
						}
						data.push({
							id : map.id, 
							geojson : null,
							data : map.dataForCombine,
							legend : {
								valPerSlice : map.legend.valPerSlice,
								legendColor : map.legend.legendColor,
								type : map.legend.selectType
							},
							param:$policyWriteMapCombine.ui.openerArParamList[map.id],
							zoom:map.zoom,
							center:map.center,
							adm_cd : map.curDropCd,
							type : "census"
						});
					}
					
				}
				$policyWriteMapCombine.ui.setData(data);
				$policyWriteMapCombine.ui.addCombineLayer("0-1", "결합차트");
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
				$policyWriteMapCombine.ui.layerGroup = [];
				
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
					$policyWriteMapCombine.ui.layerGroup.push(layer);
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
				var map = $policyWriteMapCombine.ui.openerMapList[0];
				var layer = null;
				var ids = id.split("-");
				var datas = [];
				var years = [];
				var subTitles = [];
				var units = [];
				
				for (var i=0; i<ids.length; i++) {
					var group = $policyWriteMapCombine.ui.layerGroup;
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
				
				$policyWriteMapCombine.ui.layerGroup.push({
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
			addOpenerChart : function() {
				var xAxisCat = [];	//X축 카테고리
				
				var length = 0;
				var height = 0;

				var series = [];
				// 2016. 03. 30 본사수정
				var admCdList = [];
				if($policyWriteMapCombine.ui.openerMapList[0].isFixedBound==true){
					$.each($policyWriteMapCombine.ui.cdgLayer.dataGeojson,function(){
						$.each(this.getLayers(),function(cnt,layer){
							setAdmData(layer.feature);
						});
					});
				}else{
					for(var i = 0; i < $policyWriteMapCombine.ui.cdgLayer.features.length; i++){
						setAdmData($policyWriteMapCombine.ui.cdgLayer.features[i]);
					}
				}
				function setAdmData(_features){
					var adm_cd = _features.properties.adm_cd;
					admCdList.push(adm_cd);
					if(8 < adm_cd.length){
						xAxisCat.push(adm_cd);
					}else{
						var adm_name = _features.properties.adm_nm;
						var adm_nm_split = adm_name.split(" ");
						var admNm = "";
						if(0 < adm_nm_split.length&&$policyWriteMapCombine.ui.openerMapList[0].isFixedBound!=true){
							admNm = adm_nm_split[adm_nm_split.length - 1];
						}else{
							admNm = _features.properties.adm_nm;
						}
						xAxisCat.push(admNm);
					}
				}
				length = admCdList.length;
				
				var map1 = $policyWriteMapCombine.ui.openerMapList[0];
				var tmpData = [];
				if("kosis" == map1.dataType){
					if(map1.isFixedBound==true){
						$.each(map1.multiLayerControl.multiData,function(){
							var layer = this.layer;
							for(var j = 0; j < layer.features.length; j++){
								setKosisData(layer.features[j]);
							}
						});
					}else{
						for(var j = 0; j < map1.dataGeojsonLayer.features.length; j++){
							setKosisData(map1.dataGeojsonLayer.features[j]);
						}
					}
					function setKosisData(_features){
						if(null == _features.info || 0 == _features.info.length){
							tmpData.push(0);
						}else{
							tmpData.push(parseFloat(_features.info[0]));
						}
					}
				}else{
					if(map1.isFixedBound==true){
						$.each(map1.multiLayerControl.multiData,function(){
							var layer = this.layer;
							for(var j = 0; j < layer.features.length; j++){
								setCensusData(layer.features[j]);
							}
						});
					}else{
						for(var j = 0; j < map1.dataGeojsonLayer.features.length; j++){
							setCensusData(map1.dataGeojsonLayer.features[j]);
						}
					}
					function setCensusData(_features){
						if(null == _features.info[0] || 0 == _features.info[0].length){
							tmpData.push(0);
						}else{
							var _showData = _features.info[0].showData;
							if(null == _showData || "N/A" == _features.info[0][_showData] || null == _features.info[0][_showData]){
								tmpData.push(0);
							}else{
								tmpData.push(parseFloat(_features.info[0][_showData]));
							}
						}
					}
				}
				var unit1 = null;
				if(null != $policyWriteMapCombine.ui.openerCurTitle[0].unit){
					unit1 = $policyWriteMapCombine.ui.openerCurTitle[0].unit;
				}
				series.push({name:"기준데이터", data:tmpData, color:"#002660", unit:unit1});

				var map2 = $policyWriteMapCombine.ui.openerMapList[1];
				var tmpData = [];
				if("kosis" == map2.dataType){
					if(map2.isFixedBound==true){
						$.each(map2.multiLayerControl.multiData,function(){
							var layer = this.layer;
							for(var j = 0; j < layer.features.length; j++){
								setKosis2Data(layer.features[j]);
							}
						});
					}else{
						for(var j = 0; j < map2.dataGeojsonLayer.features.length; j++){
							setKosis2Data(map2.dataGeojsonLayer.features[j]);
						}
					}
					function setKosis2Data(_features){
						if(null == _features.info || 0 == _features.info.length){
							tmpData.push(0);
						}else{
							tmpData.push(parseFloat(_features.info[0]));
						}
					}
				}else{
					if(map2.isFixedBound==true){
						$.each(map2.multiLayerControl.multiData,function(){
							var layer = this.layer;
							for(var j = 0; j < layer.features.length; j++){
								setCensus2Data(layer.features[j]);
							}
						});
					}else{
						for(var j = 0; j < map2.dataGeojsonLayer.features.length; j++){
							setCensus2Data(map2.dataGeojsonLayer.features[j]);
						}
					}
					function setCensus2Data(_features){
						if(null == _features.info[0] || 0 == _features.info[0].length){
							tmpData.push(0);
						}else{
							var _showData = _features.info[0].showData;
							if(null == _showData || "N/A" == _features.info[0][_showData] || null == _features.info[0][_showData]){
								tmpData.push(0);
							}else{
								tmpData.push(parseFloat(_features.info[0][_showData]));
							}
						}
					}
				}
				var unit2 = null;
				if(null != $policyWriteMapCombine.ui.openerCurTitle[1].unit){
					unit2 = $policyWriteMapCombine.ui.openerCurTitle[1].unit;
				}
				series.push({name:"추가데이터", data:tmpData, color:"#FFA333", unit:unit2});
				
				if (length <= 5) {
					height = 400;
				}else {
					height = length * 40;
				}

				$("#targetOpenerCharts").css("height", (height+50)+"px");
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
										'<b style="font-family:NanumBarunGothic;">' + appendCommaToNumber(this.point.y) + (this.series.userOptions.unit?'(' +this.series.userOptions.unit+ ')':'')+'</b>';
						}
					}
				},
				series: series
			    });
			},
			
			
			/**
			 * @name         : addDataPoiChart
			 * @description  : 버퍼형 차트를 그린다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param map
			 */
			addDataPoiChart : function(map) {
				var color = "#002660";
				var xAxisCat = [];//X축 카테고리
				var tmpData = [];
				var length = 0;
				var height = 0;
				var series = [];
				var _data = map.dataForCombine;
				var _dataLayer = map.dataGeojsonLayer;
				var title = "";
				var unit = "";
				if("kosis" == map.dataType){
					length = _data.length;
					title = "KOSIS 지역통계";
					for (var i=0; i<_data.length; i++) {
						tmpData.push(parseFloat(_data[i].DATA));
						xAxisCat.push(_data[i].NAME);
						unit = _data[i].UNIT;
					}
				}else{
					if(map.isFixedBound==true){
						$.each(_data,function(){
							length+=this.data.result.length;
							setData(this.data);
						});
					}else{
						length = _data.result.length;
						setData(_data);
					}
					function setData(d){
						for (var i=0; i<d.result.length; i++) {
							tmpData.push(parseFloat(d.result[i][d.result[i].showData]));
							if(8 < d.result[i].adm_cd.length){
								xAxisCat.push(d.result[i].adm_cd);
							}else{
								xAxisCat.push(d.result[i].adm_nm);
							}
						}
					}
					var _curDropParams = $policyWriteMapCombine.ui.curDropParams;
					title = _curDropParams[0].title;
					unit = _curDropParams[0].unit;
				}
				
				series.push({name:title, data:tmpData, color:color, unit:unit});
				
				if (length <= 10) {
					height = 370;
				}else {
					height = length * 40;
				}

				$("#targetCharts").css("height", (height+50)+"px");
				
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
			
			/**
			 * @name         : addDataPoi
			 * @description  : 버퍼형 POI 목록 GRID를 그린다.
			 * @date         : 2016. 10.22. 
			 * @author	     : 송종대
			 * @history 	 :
			 * @param data
			 */
			addDataPoi : function(data) {
				var header = null;
				var tmpData = null;
				
				if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
					header = [];
					header.push("명칭");
					tmpData = [];
					for (var i=0; i<(data.length>100?100:data.length); i++) {
						var record = [];
						record.push(data[i].info.corp_nm);
						tmpData.push(record);	
					}
				}
	
				var columns = [];
				var colWidth = [];
				for (var i=0; i<header.length; i++) {
					columns.push({data:header[i],editor:false});
				}
				colWidth.push(100);
				var dbHeight = $("#targetGrid").height(380);
				
				if (tmpData.length > 15) {
					dbHeight = (tmpData.length * 23) + 50;
				}
				
				$("#targetGrid").empty();
				var container = document.getElementById("targetGrid");
				var grid = new Handsontable(container, {
					data : tmpData,
					height : dbHeight,
					colWidths : colWidth,
					colHeaders : header,
					rowHeaders : true,
					stretchH : 'all',
					contextMenu : true,
	//				autoRowSize: {syncLimit: '100%'},
					autoColumnSize : true,
					className: "htCenter htMiddle"
					//rowHeights: 30
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
					if(8 < data[i].adm_cd.length){
						xAxisCat.push(data[i].adm_cd);
					}else{
						xAxisCat.push(data[i].adm_nm);
					}
				}
				
				series.push({name:title, data:tmpData, color:color, unit:data[0][showUnit]});
				length = data.length;
				
				if (length <= 5) {
					height = 400;
				}else {
					height = length * 40;
				}

				$("#targetCharts").css("height", (height+50)+"px");
				
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
			/**
			 * @name           : communityList
			 * @description    : 소통지도 리스트
			 * @date           : 2016. 01. 17.
			 * @author	       : 나광흠
			 * @history 	   :
			 */
			communityList : function(id,page_num,last_cmmnty_map_id){
				var pageSize = 100;
				if(!$.isNumeric(page_num)){
					page_num = 1;
				}
				if(page_num<=1){
					$("#"+id).empty();
				}
				var data = {
					"type":"all",
					"page_num" : page_num,
					"pageSize" : pageSize,
					"bnd_year" : $policyWriteMapCombine.ui.openerMapList[0].bnd_year
				};
				if(last_cmmnty_map_id!=null){
					data.last_cmmnty_map_id = last_cmmnty_map_id;
				}
				var abs = new sop.portal.absAPI();
				abs.onBlockUIPopup();
				$.ajax({
					url : contextPath + "/ServiceAPI/community/communityList.json",
					type:"POST",
					data: data,
					async: false,
					dataType:"json",
					success: function(res){
						if(res.errCd == "0") {
							if(Math.ceil(res.result.total_count/pageSize)>page_num){
								$policyWriteMapCombine.ui.communityList(id,page_num+1,res.result.summaryList[res.result.summaryList.length-1].cmmnty_map_id);
							}
							if(res.result.summaryList.length>0){
								$.each(res.result.summaryList,function(cnt,node){
									$("#"+id).append(
										$("<li/>").append(
											$("<label/>",{"for":"community-"+node.cmmnty_map_id}).append(
												node.cmmnty_map_nm,
												$("<input/>",{
													"type":"checkbox",
													"id":"community-"+node.cmmnty_map_id,
													"value":node.cmmnty_map_id,
													"name":id
												}).change(function(){
													if($(this).is(":checked")){
														$("#"+id+" label[for="+$(this).attr("id")+"]").addClass("on");
													}else{
														$("#"+id+" label[for="+$(this).attr("id")+"]").removeClass("on");
													}
												})
											)	
										)	
									);
								});
							}
						} else {
							messageAlert.open("알림", res.errMsg);
						}
						abs.onBlockUIClose();
					},
					error: function(data){
						abs.onBlockUIClose();
						messageAlert.open("알림", "서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
						return false;
					}
				});
			}
	};
	$policyWriteMapCombine.event = {
		setUIEvent : function() {
			//스크롤바  (디자인 - 추후 변경)
			$(".DataBoxScroll").mCustomScrollbar({axis:"y"});
			
			var body = $("body");
			
			body.on("click","#step1>ul.Tab>li",function(){
				$("#step1>ul.Tab>li").removeClass("M_on");
				$(this).addClass("M_on");
				$("#step1").show();
				$("#step1 .DataBox").hide();
				if("0"==$(this).attr("id")){
					$("#policy-info").show();
				}else if("1" == $(this).attr("id")){
					$("#step1 .FR_single").show();
					if("dataPoi" == $policyWriteMapCombine.ui.curMenuType){//버퍼형
						$policyWriteMapCombine.ui.addDataPoiChart($policyWriteMapCombine.ui.openerMapList[0]);
					}else if("dataData" == $policyWriteMapCombine.ui.curMenuType){//연산자
						$policyWriteMapCombine.ui.addOpenerChart();
					}
				}else if("2" == $(this).attr("id")){
					$("#step1 .FR_fuse").show();
					if("dataPoi" == $policyWriteMapCombine.ui.curMenuType){//버퍼형
						$policyWriteMapCombine.ui.addDataPoi($policyWriteMapCombine.ui.openerMarkerList);
					}else if("dataData" == $policyWriteMapCombine.ui.curMenuType){//연산자
						$policyWriteMapCombine.ui.doShowChart('data','2');
					}
				}
				$(".DataBoxScroll").mCustomScrollbar("update");
				$(".DataBoxScroll").mCustomScrollbar("scrollTo", "top", {
					scrollInertia: 0
				});
			});
			
			body.on("click","#closePopup",function(){
				self.close();
			});
			$("#btn-write").click(function(){
				$("#step1").hide();
				$("#step2").show();
				$(this).hide();
			});
			$("#btn-cancel").click(function(){
				$("#step2").hide();
				$("#step1").show();
				$("#btn-write").show();
			});
			$("#btn-done").click(function(){
				if(hasText(opener)&&hasText($policyWriteMapCombine.ui.openerLeft)&&hasText($policyWriteMapCombine.ui.openerRight)&&($policyWriteMapCombine.ui.curMenuType=="dataData"||$policyWriteMapCombine.ui.curMenuType=="dataPoi")){
					if(hasText($("#policy-title").val())){
						var obj = new sop.portal.policy.write.api();
						var community = $("input[name=community-list]:checkbox:checked").map(function(){return this.value;}).get().join();
						obj.addParam("title",$("#policy-title").val());
						if(hasText($("#policy-content").val())){
							obj.addParam("exp",$("#policy-content").val());
						}
						if(hasText($("#policy-url").val())){
							obj.addParam("url",$("#policy-url").val());
						}
						if(community){
							obj.addParam("community",community);
						}
						if($policyWriteMapCombine.ui.openerLeft.api_id=="kosis"){
							$.each($policyWriteMapCombine.ui.openerLeft.params,function(){
								if(this.key=="gis_se"){
									obj.addParam("region_cd",this.value);
									return false;
								}
							});
						}else{
							//console.log('####debug');
		
							
							//추후 수정해야 함 ($policyWriteMapCombine.ui.openerMapList[0].curAdmCd
							//	var curDropParams = $policyWriteMapCombine.ui.curDropParams;
							//	var openerLeft = $policyWriteMapCombine.ui.openerLeft;
							obj.addParam("region_cd",$policyWriteMapCombine.ui.curDropParams[0].adm_cd);
							
						}
							
						obj.addParam("left",JSON.stringify($policyWriteMapCombine.ui.openerLeft));
						obj.addParam("right",JSON.stringify($policyWriteMapCombine.ui.openerRight));
						if($policyWriteMapCombine.ui.curMenuType=="dataData"){
							obj.addParam("nomfrm",encodeURIComponent($policyWriteMapCombine.ui.combineArithmetic));
							obj.addParam("div_cd","02");
							obj.addParam("right_disp_type","01");
						}else{
							obj.addParam("srv_distance",$policyWriteMapCombine.ui.openerPoiRadius);
							obj.addParam("div_cd","01");
							if($policyWriteMapCombine.ui.openerRight.api_id=="poi"){
								obj.addParam("right_disp_type","02");
							}else if($policyWriteMapCombine.ui.openerRight.api_id=="mydata"){
								obj.addParam("right_disp_type","03");
							}else if($policyWriteMapCombine.ui.openerRight.api_id=="local"){
								obj.addParam("right_disp_type","04");
							}else{
								return false;
							}
						}
						obj.onBlockUIPopup();
						obj.request({
							method : "POST",				
							async : true,
							url : contextPath+"/ServiceAPI/policyWrite/write.json"
						});
					}else{
						messageAlert.open("알림","제목을 입력해주세요");
					}
				}else{
					messageAlert.open("알림","비정상적인 접근입니다");
				}
				return false;
			});
			$("#policy-title").on("keyup keydown keypress",function(){
				return $policyWriteMapCombine.event.setContentLength($(this).attr("id"),40,true,"제목은");
			});
			$("#policy-content").on("keyup keydown keypress",function(){
				return $policyWriteMapCombine.event.setContentLength($(this).attr("id"),1000,true,"내용은");
			});
			$("#policy-url").on("keyup keydown keypress",function(){
				return $policyWriteMapCombine.event.setContentLength($(this).attr("id"),100,true,"URL은");
			});
			$("#policy-title-update").on("keyup keydown keypress",function(){
				return $policyWriteMapCombine.event.setContentLength($(this).attr("id"),40,true,"제목은");
			});
			$("#policy-content-update").on("keyup keydown keypress",function(){
				return $policyWriteMapCombine.event.setContentLength($(this).attr("id"),1000,true,"내용은");
			});
			$("#policy-url-update").on("keyup keydown keypress",function(){
				return $policyWriteMapCombine.event.setContentLength($(this).attr("id"),100,true,"URL은");
			});
			$policyWriteMapCombine.ui.communityList("community-list",1,null);
		},
		/**
		 * @name              : setContentLength
		 * @description       : 글자수 셋팅
		 * @date              : 2016.11.2
		 * @author	          : 나광흠
		 * @history 	      :
		 * @param selector    : jquery selector
		 * @param length      : 길이
		 * @param isAlert     : 경고창 보여주기 유무
		 * @param name        : 이름
		 */
		setContentLength : function(selector,length,isAlert,name){
			var str = $("#"+selector).val();
			var enter_length = str.split(/\r\n|\r|\n/).length-1;
			var str_length = str.length+enter_length;
			if(str_length>length){
				$("#"+selector+"_length span").css({"color":"#c00","font-weight":"bold"});
			}else{
				$("#"+selector+"_length span").css({"color":"","font-weight":""});
			}
			$("#"+selector+"_length span").text(str_length);
			var success = str_length<=length;
			if(isAlert===true&&success===false){
				$("#"+selector).val($("#"+selector).val().substring(0,length-enter_length));
				$policyWriteMapCombine.event.setContentLength(selector,length);
				$("#"+selector).blur();
				messageAlert.open("알림",name+" 최대 "+length+"글자까지 쓸 수 있습니다");
			}
			return success;
		}
	};
	
	$policyWriteMapCombine.callbackFunc = {
			didMouseOverPolygon : function(event, data, type, map) {
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					if("dataPoi" == $policyWriteMapCombine.ui.curMenuType){
						$policyWriteMapCombine.ui.createInfoTooltip(event, data, type, map);
					}else if("dataData" == $policyWriteMapCombine.ui.curMenuType){
						$policyWriteMapCombine.ui.createDataDataInfoTooltip(event, data, type, map);
					}
				}
			}
			
	};
	
	/*********** 정책통계지도 등록 시작 **********/
	(function() { 
		$class("sop.portal.policy.write.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd=="0"){
					messageAlert.open("알림","등록되었습니다",function(){
						self.close();
					});
				}else{
					messageAlert.open("알림",res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail : function(status) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 정책통계지도 등록 종료 **********/
	function hasText(str){
		if(str==null||str==undefined){
			return false;
		}else if(typeof str === "number"){
			return true;
		}else if(typeof str === "boolean"){
			return str;
		}else if(typeof str === "string"){
			return !undefined&&!null&&str.replace(/ /gi,"")!="";
		}else if($.isArray(str)){
			return str&&str.length>0;
		}else if(typeof str === "object"){
			var result = false;
			$.map(str,function(){
				result = true;
				return false;
			});
			return result;
		}else{
			return false;
		}
	}
	function getParameter(name) {
		search = location.search;
		if(search) {
			if(hasText(name)){
				var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
				if (results==null){
					return null;
				}
				else{
					return results[1] || 0;
				}
			}else{
				var query = [];
				$.each(location.search.substring(1,location.search.length).split("&"),function(cnt,node){
					query.push({
						"key":node.substring(0,node.indexOf("=")),
						"value":node.substring(node.indexOf("=")+1,node.length)
					})
				});
				return query;
			}
		}
	}
	//정렬
	function dynamicSort(property,isNumber) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			var compareA = isNumber?parseFloat(a[property]):a[property];
			var compareB = isNumber?parseFloat(b[property]):b[property];
			if(property.indexOf(".")>-1){
				function setClass(obj,property){
					var result = obj;
					var propertySplit = property.split(".");
					for(var i =0; i<propertySplit.length;i++){
						result = result[propertySplit[i]];
					}
					return result;
				}
				var ao = setClass(a,property);
				var bo = setClass(b,property);
				compareA = isNumber?parseFloat(ao):ao;
				compareB = isNumber?parseFloat(bo):bo;
			}else{
				compareA = isNumber?parseFloat(a[property]):a[property];
				compareB = isNumber?parseFloat(b[property]):b[property];
			}
			var result = (compareA < compareB) ? -1 : (compareA > compareB) ? 1 : 0;
			return result * sortOrder;
		}
	}
}(window, document));