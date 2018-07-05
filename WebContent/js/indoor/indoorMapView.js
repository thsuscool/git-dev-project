/**
 * 국가DB 전개도 화면
 * 
 * history : 네이버시스템(주), 1.0, 2014/11/20 초기 작성 author : wodus version : 1.0 see :
 * 
 */
(function (W, D) {
	W.$indoorMapView = W.$indoorMapView || {};
	
	$(document).ready(function () {
		// get Params
		var param = getAllParameter();
		
		if (param.sufid == undefined) {
			alert('bed request!');
			return;
		}
		else{
			$indoorMapView.ui.buildInfo.sufid = param.sufid;
		}
		
		// UI 초기화
		$indoorMapView.ui.initialize(); 
		
		// Map 생성
		$indoorMapView.ui.createMap('map'); 
		
		// building info request
		$indoorMapView.request.getBuildingindoorMapView($indoorMapView.ui.buildInfo.sufid);

	});
	
	$indoorMapView.ui = {
			sMap 			: null, // map.js의 map객체
			_figureType		: { "dev" : "01", "front" : "10", "hybrid" : "11", "none" : "0" }, // AB : 앞자리(정면도 0 or 1), 뒷자리(평면도 0 or 1)

			buildInfo		: {
				totalInfo : {},
				sufid			: '',
				buildName		: '',
				mainFloor		: 0,
				lowestFlr		: 0,
				highestFlr		: 0,
				devFigureType	: 0,
				defaultImg		: '',
				selectImg		: '',
				bdAdmAddr : '',
				arFloorAll		: new Array(),  /*floorsInfoList*/
				arThemeAll		: new Array()   /*pieChartList*/
			},
			curFloor		: 0,
			baseFloor : 0,
			
			floorInfo		: {
				arCompany 	: new Array(),	/*flrThemeList*/
				arTheme		: new Array(),	/*flrCompanyList*/
				arFacility	: new Array()
			},
			
			geoJsonObj		: {
				FigureFloor		: {},
				FigureCompany	: {},
				FigureEtc		: {}
			},
			isfloorGeoJson 		: false,
			isCompanyGeoJson 	: false,
			isEtcGeoJson 		: false,

			isMapCreated 		: false,
			isMarkerCompany		: false,
			isMarkerFacility	: false,
			
			minLevel		: 12,
			maxLevel		: 17,
			baseZoomLevel	: 14,
			
			addedLayerGroup : {
				buildingLayers : {},
				markers : {}
			},
			
			initialize : function () {
				this.initWindow();
				this.sMap = new sMap.map();
			},
			
			createMap : function (target) {

				var maxBounds = sop.utmkBounds(sop.utmk([951495, 1950977]), sop.utmk([951618, 1951079]));
				
				if (!this.isMapCreated) {
					// 최초 로딩시
					this.sMap.createMap($indoorMapView, target, {
						zoom : this.baseZoomLevel,
						maxZoom : this.maxLevel,
						minZoom : this.minLevel,
						buildingLayer: false
					} )
					this.sMap.MainObj = $indoorMapView;
					this.isMapCreated = true;
					
					// 이벤트 등록
					this.sMap.addControlEvent("zoomend zoomlevelschange");
					
				}
				this.initializeMap();
			},
			
			/**
			 * 
			 * @name         : initializeMap
			 * @description  : Map 관련 info 초기화
			 * @date         : 2014. 11. 28. 
			 * @author	     : 
			 * @history 	 :
			 */
			initializeMap : function () {
				if (this.isGeoJsonCreated) {
					
					this.geoJsonObj.FigureFloor		= {};
					this.geoJsonObj.FigureCompany	= {};
					this.geoJsonObj.FigureEtc		= {};
					
					this.isfloorGeoJson		= false,
					this.isCompanyGeoJson	= false,
					this.isEtcGeoJson		= false,
					
					//console.log('this.sMap.gMap: ',this.sMap.gMap);
					this.sMap.geojson.onRemove(this.sMap.gMap); // sop.geojson 
					this.sMap.geojson = {}; // sop.geojson 
					this.sMap.clearDataOverlay();
					this.isGeoJsonCreated = false;
					
					this.clearAll();
				
//					console.log('initializeMap!!');
				}
			},
			
			//건물 정보 (result는 따로 조회한 값)
			setBuildingInfo : function(result) {
				//OpenAPI에서 가져온 정보
				var openApiInfo = $indoorMapView.ui.buildInfo.totalInfo;
				
//				this.buildInfo.sufid			= result.sufid;
//				this.buildInfo.buildName		= result.bd_nm;
//				this.buildInfo.lowestFlr		= result.lowest_flr;
//				this.buildInfo.highestFlr		= result.highest_flr;
//				this.buildInfo.devFigureType	= result.dev_figure_type;
//				this.buildInfo.floorCnt			= Math.abs(result.highest_flr) + Math.abs(result.lowest_flr);
				
				this.buildInfo.sufid			= openApiInfo.sufid;
				this.buildInfo.buildName		= openApiInfo.bd_nm;
				this.buildInfo.lowestFlr		= openApiInfo.lowest_flr;
				this.buildInfo.highestFlr		= openApiInfo.highest_flr;
				this.buildInfo.devFigureType	= openApiInfo.dev_figure_type;
				this.buildInfo.floorCnt			= Math.abs(openApiInfo.highest_flr) + Math.abs(openApiInfo.lowest_flr);
				this.buildInfo.bdAdmAddr	= openApiInfo.bd_adm_addr;
				this.buildInfo.defaultImg		= result.default_img;
				this.buildInfo.selectImg		= result.select_img;
				this.buildInfo.arFloorAll		= result.floors;
				this.buildInfo.arThemeAll		= result.distribution;
				
				//지하부터 지상까지 총 합이 10층이 넘을 경우 기본층을 맨 밑으로
				if(this.buildInfo.floorCnt > 10) {
					this.baseFloor = this.buildInfo.floorCnt - 10;	
				}
				
				$.each(this.buildInfo.arFloorAll, function(i){
		            if (this.main_yn.trim() == 'Y') {
		            	$indoorMapView.ui.buildInfo.mainFloor = this.flr_no;
		            	$indoorMapView.ui.curFloor = this.flr_no;
						
						$(".planar_sectionc .planar_section01 .planar_sec01_tit").html(this.flr_no + "층 평면도");
						$(".planar_sectionb .planar_section01 .planar_sec01_tit").html(this.flr_no + "층 업종별 사업체");
						
						$indoorMapView.ui.initializeMap();
						// main-floor info request
						$indoorMapView.request.getFloorindoorMapView($indoorMapView.ui.buildInfo.sufid, $indoorMapView.ui.curFloor);
					}
		        });
				
				var floorImgHtml = $indoorMapView.formatter.getFloorImgListHtml(this.buildInfo, result.lowest_flr, result.highest_flr);
				var floorImgJs = $indoorMapView.formatter.getFloorImgListJs(this.buildInfo.arFloorAll, this.buildInfo.floorCnt);
				$indoorMapView.formatter.setChartListHtml(this.buildInfo.arThemeAll);

				$(".planar_tit").html(this.buildInfo.buildName);
				$(".va-wrapper").html(floorImgHtml);
				$(".planar_sec02box_c").html(floorImgJs);
				
				// default floor addClass on
				this.setCurrentFlrForAux(this.buildInfo.mainFloor);
				
				//스크롤 맨 밑으로 내리기
				$(".va-wrapper").scrollTop((this.buildInfo.floorCnt * 25) - 250);
			},
			
			setFloorInfo : function(result) {
				this.floorInfo.arCompany = result.companylist;
				this.floorInfo.arTheme = result.theme_cd_list;
				this.floorInfo.arFacility = result.facilitylist;
				
				var fltThemeMain_cd = '';
				
				if(this.floorInfo.arCompany.length >0) {
					fltThemeMain_cd		= this.floorInfo.arCompany[this.floorInfo.arCompany.length-1].theme_cd;
				}
				
				var floorThemeHtml = $indoorMapView.formatter.getFlrThemeListHtml(this.floorInfo.arTheme);
				var floorCompanyAllHtml = $indoorMapView.formatter.getFlrCompanyAllListHtml(this.floorInfo.arCompany ,this.floorInfo.arTheme);
				var floorCompanyHtml = $indoorMapView.formatter.getFlrCompanyListHtml(this.floorInfo.arCompany , fltThemeMain_cd);
				
				$("#planar_select01_b").html(floorThemeHtml);
				$("#planar_sec02box_t").html(floorCompanyAllHtml);
				$("#planar_select02_b").html(floorCompanyHtml);

				// 정면도만
				if(this.buildInfo.devFigureType == this._figureType.front) {
					
//					console.log(this.buildInfo.arFloorAll);
					
					//$(".planar_sectionb .open_info_modify").find(">a").toggleClass("on");
					$(".layer_pop_planar").show();
					$(".open_info_modify").hide();
				}
				// 평면도만
				else if(this.buildInfo.devFigureType == this._figureType.dev) {
					if(this.isDevfigure(this.curFloor) == true) {
						// selected-floor vector request
						this.initializeMap();
						$indoorMapView.request.getFigureFloorindoorMapView(this.buildInfo.sufid, this.curFloor);
						$(".open_info_modify").show();
					}
				}
				// 혼합
				else if(this.buildInfo.devFigureType == this._figureType.hybrid) {
					if(this.isDevfigure(this.curFloor) == true) {
						// selected-floor vector request
						this.initializeMap();
						$indoorMapView.request.getFigureFloorindoorMapView(this.buildInfo.sufid, this.curFloor);
						$(".planar_sectionb .planar_section01 .open_info_modify").show();
					}else{
						$(".open_info_modify").hide();
						$(".layer_pop_planar").show();
					}
				}
				
				this.setMarkerFacility(this.floorInfo.arFacility);
				
			},
			setFigureFloor : function(features) {
				$(".layer_pop_planar").hide();
				
				if(features.length > 0){
					this.geoJsonObj.FigureFloor = features;
					this.setGeoJson(features, 'floor', {fit: true});
				}
				
				this.baseZoomLevel = this.sMap.gMap.getZoom();
//				console.log("baseZoomLevel: ", this.baseZoomLevel);
				$indoorMapView.request.getFigureEtcindoorMapView(this.buildInfo.sufid, this.curFloor);
				$indoorMapView.request.getFigureCompanyindoorMapView(this.buildInfo.sufid, this.curFloor);
			},
			
			setMarkerCompany : function(obj) {
				var layerGroup = sop.layerGroup().addTo(this.sMap.gMap);
				
				for ( var i = 0; i < obj.length; i++) {
					var x = obj[i].center_x;
					var y = obj[i].center_y;
					var comp_nm = obj[i].corp_nm;
					var theme_cd = obj[i].theme_cd;
					var iconUrl = "";
					
					if(theme_cd != undefined) {
						var tmp = theme_cd.toString();
						var theme_cd_front = tmp.substring(0,2);
						var theme_cd_rear = tmp.substring(2,4);
						iconUrl = '/img/marker/circleMarker/c_'+theme_cd_front+'_'+theme_cd_rear+'_on.png';
					} else {
						iconUrl = '/img/marker/circleMarker/c_10_00_on.png';
					}
//					var tmp = theme_cd.toString();
//					var theme_cd_front = tmp.substring(0,2);
//					var theme_cd_rear = tmp.substring(2,4);
//					var iconUrl = '/img/marker/circleMarker/c_'+theme_cd_front+'_'+theme_cd_rear+'_on.png';
					
					layerGroup.addLayer(this.addIconMarker(sop.utmk([x,y]), iconUrl));
				}
				
				this.removeMarkerLayer('company');
				this.addedLayerGroup.markers['company'] = layerGroup;
				isMarkerCompany = true;
			},
			
			setMarkerFacility : function(obj) {
				var layerGroup = sop.layerGroup().addTo(this.sMap.gMap);
				
				for ( var i = 0; i < obj.length; i++) {
					var x = obj[i].center_x;
					var y = obj[i].center_y;
					var fac_type = obj[i].fac_type;
					
					var iconUrl = '/img/marker/facilityMarker/'+fac_type.trim().toLowerCase()+'_on.png';
					layerGroup.addLayer(this.addIconMarker(sop.utmk([x,y]), iconUrl));
				}
				
				this.removeMarkerLayer('facility');
				this.addedLayerGroup.markers['facility'] = layerGroup;
				isMarkerFacility = true;
			},
			
			setFigureCompany : function(features) {
				if(features.length > 0){
					this.geoJsonObj.FigureCompany = features;
					
					var theme_cd_nm
					var themeGeojson = new Array();
					
					//테마별 layer 분류
					var tempThemeCd = null;
					for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
						// loop 시작
						if( j == 0) {
							tempThemeCd = this.geoJsonObj.FigureCompany[j].properties.theme_cd_front;
						}else if(j == this.geoJsonObj.FigureCompany.length -1 ) {
							if( tempThemeCd == this.geoJsonObj.FigureCompany[j].properties.theme_cd_front) {
								themeGeojson.push(this.geoJsonObj.FigureCompany[j]);
								this.setGeoJson(themeGeojson, 'company_theme_' + tempThemeCd);
							}
						}else{
							if( tempThemeCd == this.geoJsonObj.FigureCompany[j].properties.theme_cd_front) {
								themeGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}else if( tempThemeCd !== this.geoJsonObj.FigureCompany[j].properties.theme_cd_front) {
								this.setGeoJson(themeGeojson, 'company_theme_' + tempThemeCd);
								
								tempThemeCd = this.geoJsonObj.FigureCompany[j].properties.theme_cd_front;
								themeGeojson = [];
								themeGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}
						}
					}
				}
			},
			setFigureEtc : function(features) {
				if(features.length > 0){
					this.geoJsonObj.FigureEtc = features;
					this.setGeoJson(features, 'etc');
				}
			},

			setGeoJson : function (geoJsonObj, type, opt) {
				this.isGeoJsonCreated = true;
				
				var layerGroup = sop.layerGroup().addTo(this.sMap.gMap);

				if(this.addedLayerGroup.buildingLayers[type]) {
//					console.log('remove buildingLayers type: ', type);
					this.sMap.gMap.removeLayer(this.addedLayerGroup.buildingLayers[type]);
				}
				layerGroup.addLayer(this.sMap.addPolygonGeoJson(geoJsonObj, type, opt));
				this.addedLayerGroup.buildingLayers[type] = layerGroup;
				
			},
			
			addIconMarker : function (utmkPoint, iconUrl) {
					
				busIcon = sop.icon({
					iconUrl: iconUrl,
					//shadowUrl: 'bus-shadow.png',
					iconSize:     [23, 23],
					//shadowSize:   [32, 32],
					iconAnchor:   [11, 11],
					//shadowAnchor: [5, 0],
					//popupAnchor:  [-3, -76]
				});

				return this.sMap.addMarker(utmkPoint,{icon: busIcon});
			},
			
			clearAll : function() {
				this.clearBuildingLayer();
				this.clearMarkers();
			},

			clearBuildingLayer : function() {
				var key;
				for (key in this.addedLayerGroup.buildingLayers) {
					this.addedLayerGroup.buildingLayers[key].remove();
				}
			},

			clearMarkers : function() {
				var key;
				for (key in this.addedLayerGroup.markers) {
					this.addedLayerGroup.markers[key].remove();
				}
				isMarkerFacility = false;
			},
			
			removeMarkerLayer : function(key) {
				if(this.addedLayerGroup.markers[key]) {
					this.addedLayerGroup.markers[key].remove();
				}
			},
			
	
			/*info화면 function*/
			
			// html ui 호출 함수
			getFloor : function(floor) {
				$indoorMapView.request.getFloorindoorMapView(this.buildInfo.sufid,floor);
				
				$(".planar_sectionc .planar_section01 .planar_sec01_tit").html(floor + "층 평면도");
				$(".planar_sectionb .planar_section01 .planar_sec01_tit").html(floor + "층 업종별 사업체");
				
				//$(".layer_pop_planar").hide();
				//기능이 안 먹음 확인 필요
				$(".planar_sectionc .open_info_modify").find(">a").toggleClass("on");
				
				// default floor addClass on
				this.setCurrentFlrForAux(floor);
				this.setPastFlrForAux(this.curFloor);
				
				this.curFloor = floor;
				
			},
	
			getCompanyOnTheme : function(theme) {
				var floorCompanyHtml = $indoorMapView.formatter.getFlrCompanyListHtml(this.floorInfo.arCompany, theme);
				$("#planar_select02_b").html(floorCompanyHtml);
				// 해당 폴리곤을 하이라이트
				this.selectThemeCorp(theme);
			},
			
			//층 클릭 시
			getOnlyCompanyList : function(floor) {
				this.curFloor = floor;
				/*
				$(".planar_sectionb .open_info_modify").find(">a").toggleClass("on");
				//$(".layer_pop_planar").show();
				console.log("getOnlyCompanyList css('display'): ", $(".layer_pop_planar").css('display'));
				if($(".layer_pop_planar").css('display') == 'none') {
					$(".layer_pop_planar").show();
				}

				$indoorMapView.request.getFloorindoorMapView(this.buildInfo.sufid,floor);
				*/
			},
			
			isDevfigure : function(floor) {
				var rtn = false;
				if(this.buildInfo.arFloorAll !== null){
					$.each(this.buildInfo.arFloorAll, function(i){
						if (this.flr_no == Number(floor)) {
							//혼합층인 경우 정면도층(N1), 평면도층(N0), 메인층(Y) 분기
							if (this.main_yn.trim() != 'N1') {
								console.log("***********평면도 층*******************");
								rtn = true;
							}else{
								console.log("***********정면도 층*******************");
							}
						}
			        });
				}
				return rtn;
			},
			
			setZoom : function() {
				var curZoom = this.sMap.gMap.getZoom();

				if(Number(curZoom) == Number(this.maxLevel)){
					this.sMap.gMap.setZoom(Number(this.minLevel));
				}else{
					this.sMap.gMap.setZoom(curZoom + 1);
				}
			},
			
			changeZoom : function() {
				var curZoom = Number(this.sMap.gMap.getZoom());

				if(curZoom == Number(this.maxLevel)){
					$(".planar_sectionc .planar_section01 .planar_sec01box").html('<a href="#"><img src="/img/idm/btn_glass.gif" alt="" /> 축소</a>');
				}else{
					$(".planar_sectionc .planar_section01 .planar_sec01box").html('<a href="#"><img src="/img/idm/btn_glass.gif" alt="" /> 확대</a>');
				}
				if(curZoom <= this.baseZoomLevel || this.baseZoomLevel == 0) {
					this.removeMarkerLayer('company');
				} else {
					if(this.isMarkerCompany == false) {
						this.setMarkerCompany(this.floorInfo.arCompany);
					}
				}
			},
			goMainFloor : function() {
				if(this.curFloor !== this.buildInfo.mainFloor) {
					this.getFloor(this.buildInfo.mainFloor);
				}
			}, 
			
			setCurrentFlrForAux : function(flr) {
				// default floor addClass on
				var aux_id = 'va-slice-';
				var aux_class = 'va-slice va-slice-';
				
				if(flr > 0) {
					aux_id += 'F' + Math.abs(flr).toString();
					aux_class += 'F' + Math.abs(flr).toString() + ' on';
				}else{
					aux_id += 'B' + Math.abs(flr).toString();
					aux_class += 'B' + Math.abs(flr).toString() + ' on';
				}
			
				if(document.getElementById(aux_id)) { document.getElementById(aux_id).className = aux_class; }
				
			},
			
			setPastFlrForAux : function(flr) {
				// default floor addClass on
				var aux_id = 'va-slice-';
				var aux_class = 'va-slice va-slice-';
				
				if(flr > 0) {
					aux_id += 'F' + Math.abs(flr).toString();
					aux_class += 'F' + Math.abs(flr).toString();
				}else{
					aux_id += 'B' + Math.abs(flr).toString();
					aux_class += 'B' + Math.abs(flr).toString();
				}
				
				if(document.getElementById(aux_id)) { document.getElementById(aux_id).className = aux_class; }

			},
			
			removeSelectedPolygon : function() {
				
			},
			
			selectThemeCorp : function(theme_cd) {
				var corpGeojson = new Array();
				
				for(var i = 0; i < this.floorInfo.arCompany.length; i++) {
					if(theme_cd == undefined){
						if(this.floorInfo.arCompany[i].theme_cd == undefined){
							
							for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
								if( this.floorInfo.arCompany[i].decilist_serial == this.geoJsonObj.FigureCompany[j].properties.decilist_serial) {
									corpGeojson.push(this.geoJsonObj.FigureCompany[j]);
								}
							}
						}
					}else if(theme_cd.toString() == this.floorInfo.arCompany[i].theme_cd) {
						for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
							if( this.floorInfo.arCompany[i].decilist_serial == this.geoJsonObj.FigureCompany[j].properties.decilist_serial) {
								corpGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}
						}
					}
				}
				
				this.setGeoJson(corpGeojson, 'selectCompany');
				this.sMap.gMap.fitBounds(this.sMap.geojson.getBounds());
			},
			
			//평면도 사업체 선택
			selectCorp : function(corp_sn) {
				var corpGeojson = new Array();
				
				for(var i = 0; i < this.floorInfo.arCompany.length; i++) {
					if(Number(corp_sn) == Number(this.floorInfo.arCompany[i].decilist_serial)) {
						for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
							if( this.floorInfo.arCompany[i].decilist_serial == this.geoJsonObj.FigureCompany[j].properties.decilist_serial) {
								corpGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}
						}
					}
				}
				var tmpGeojson = this.setGeoJson(corpGeojson, 'selectCompany',{fit: true});
			},
			
			getCompanyInfo : function(corp_sn) {
				var retVal = {};
				for(var i = 0; i < this.floorInfo.arCompany.length; i++) {
					if(Number(corp_sn) == Number(this.floorInfo.arCompany[i].decilist_serial)) {
						var theme_cd_nm = this.getThemeInfo(this.floorInfo.arCompany[i].theme_cd);
						retVal = {decilist_serial: this.floorInfo.arCompany[i].decilist_serial
								, corp_nm: this.floorInfo.arCompany[i].corp_nm
//								, tel_no: this.floorInfo.arCompany[i].tel_no
								, theme_cd_nm: theme_cd_nm
						}
					}
				}
				return retVal;
			},
			
			getThemeInfo : function(theme_cd) {
				var retVal = '';
				for(var i = 0; i < this.floorInfo.arTheme.length; i++) {
					if(Number(theme_cd) == Number(this.floorInfo.arTheme[i].theme_cd)) {
						retVal = this.floorInfo.arTheme[i].theme_cd_nm;
					}
				}
				return retVal;
			},
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				var html = "";
				
				if (type.substring(0,13) == "company_theme" || type == "selectCompany") {
					if (data && data.properties) {
						if (data.properties.decilist_serial) {
							var companyInfo = this.getCompanyInfo(data.properties.decilist_serial);
							if(companyInfo.corp_nm != undefined) {
								html += "<table width=150px height=40px style='margin:10px; background:#FFFFFF'>"
									 +  "<tr ><td class='admName'>" + companyInfo.corp_nm  + "</td></tr>";	
							}
						}
						else {
							var html = "<div style='padding: 3px;'>해당 사업체의 정보가 없습니다.</div>";
						}
					}
				}else if (type == "etc") {
					// fac_type : X(공실), S(계단), E(엘리베이터), T(화장실)
					if (data && data.properties) {
						if (data.properties.fac_type) {
							if (data.properties.fac_type.trim() != "X") {
								html += "<table width=150px height=40px style='margin:10px; background:#FFFFFF'>";

//								if (data.properties.fac_type.trim() == "X") {
//									html += "<tr ><td class='admName'>공실</td></tr>";
//								}
								if (data.properties.fac_type.trim() == "S") {
									html += "<tr ><td class='admName'>계단</td></tr>";
								}
								if (data.properties.fac_type.trim() == "E") {
									html += "<tr ><td class='admName'>엘리베이터</td></tr>";
								}
								if (data.properties.fac_type.trim() == "T") {
									html += "<tr ><td class='admName'>화장실</td></tr>";
								}
								if (data.properties.fac_type.trim() == "D") {
									html += "<tr ><td class='admName'>출입구</td></tr>";
								}
								if (data.properties.fac_type.trim() == "M") {
									html += "<tr ><td class='admName'>무빙워크</td></tr>";
								}
							}
						}
					}
				}else{
					var html = "<div style='padding: 3px;'>해당 위치의 정보가 없습니다.</div>";
				}
				html += "</table>";

				event.target.bindToolTip(html, {
					pane : 'infowindowPane',
					direction : 'right',
					noHide : true,
					opacity : 0.8
				}).addTo(this.sMap.gMap)._showToolTip(event);
				
				$(".admName")
				.css("font-size", "15px")
				.css("font-weight", "bold")
				.css("color", "#3792de")
				.css("background", "#FFFFFF");
				$(".statsData")
				.css("font-size", "12px")
				.css("padding-left", "5px")
				.css("background", "#FFFFFF");
			},
			
			initWindow : function() {
				var planarheight = $(".planar_sectionc").height(); 
				$(".va-container").css("margin-top", (planarheight / 2) - 150);

				var windowsHeight = $(window).height();
				if(windowsHeight > 620) {
					$(".planar_sectionc .planar_section01 .planar_sec02 .planar_sec02box #map").css("height", windowsHeight - 300);
				}else{
					$(".planar_sectionc .planar_section01 .planar_sec02 .planar_sec02box #map").css("min-height", 350);
				}
			}
	
	};
	
	$indoorMapView.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
				//console.log('didMapZoomStart');
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				$indoorMapView.ui.changeZoom();
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
			 * @param type   : 층경계(floor), 사업체경계(company), 기타시설물(etc)
			 */
			didMouseOverPolygon : function(event, data, type, map) {	
				if (type == "floor") {
				}else {
					$indoorMapView.ui.createInfoTooltip(event, data, type, map);
				}
			},

	};
	
	$indoorMapView.event = {
			
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

			}
		};
			
	
	
	$indoorMapView.request = {
			
		SvcAPI_7001_URL : "/ServiceAPI/figure/building.json",
		SvcAPI_7002_URL : "/ServiceAPI/figure/floor.json",
		//SvcAPI_7003_URL : "/ServiceAPI/figure/floorfigure.geojson",
		SvcAPI_7004_URL : "/ServiceAPI/figure/figurefloor.geojson",
//		SvcAPI_7005_URL : "/ServiceAPI/figure/figurecompany.geojson",
		SvcAPI_7006_URL : "/ServiceAPI/figure/figureetc.geojson",
		
		//개별건물속성 호출 (OpenAPI)
		getBuildingindoorMapView : function (sufid) {
			var sopPortalBuildingIndoorObj = new sop.portali.buildingIndoor.api();
			sopPortalBuildingIndoorObj.addParam("accessToken", accessToken);
			sopPortalBuildingIndoorObj.addParam("sufid", sufid);
			sopPortalBuildingIndoorObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/buildingattribute.json",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0802",
		        	params : {
		        		sufid : sufid
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//건물 업종분포도, 입체도 호출
		getBuildingInfoView : function (res, sufid) {
			var requestParam = {
				sufid : sufid,
				base_year : $indoorMapView.ui.sMap.bnd_year
			};
			$indoorMapView.ui.buildInfo.totalInfo = res;		//기본값 저장
			$.ajax({
				url: this.SvcAPI_7001_URL,
				data: requestParam,
				type: 'POST',
				dataType: 'json',
				success: $indoorMapView.response.successBuildingindoorMapView,
				error:function(e){ 
					console.log("e");
				}
			});
		},
		
		//개별 건물의 층 별 사업체 정보 호출 (OpenAPI)
		getFloorindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorIndoorObj = new sop.portali.floorIndoor.api();
			sopPortalFloorIndoorObj.addParam("accessToken", accessToken);
			sopPortalFloorIndoorObj.addParam("sufid", sufid);
			sopPortalFloorIndoorObj.addParam("flr_no", flr_no);
			sopPortalFloorIndoorObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/floorcompanyinfo.json",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0806",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//개별 건물의 층별 외각 공간정보 (OpenAPI)
		getFigureFloorindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorBoundaryObj = new sop.portali.floorBoundary.api();
			sopPortalFloorBoundaryObj.addParam("accessToken", accessToken);
			sopPortalFloorBoundaryObj.addParam("sufid", sufid);
			sopPortalFloorBoundaryObj.addParam("flr_no", flr_no);
			sopPortalFloorBoundaryObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/floorboundary.geojson",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0803",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//개별 건물의 층별 사업체 공간정보 (OpenAPI)
		getFigureCompanyindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorCompanyObj = new sop.portali.floorCompany.api();
			sopPortalFloorCompanyObj.addParam("accessToken", accessToken);
			sopPortalFloorCompanyObj.addParam("sufid", sufid);
			sopPortalFloorCompanyObj.addParam("flr_no", flr_no);
			sopPortalFloorCompanyObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/floorcompany.geojson",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0804",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//개별 건물의 층별 기타시설물 공간정보 (OpenAPI)
		getFigureEtcindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorEtcFacilityObj = new sop.portali.floorEtcFacility.api();
			sopPortalFloorEtcFacilityObj.addParam("accessToken", accessToken);
			sopPortalFloorEtcFacilityObj.addParam("sufid", sufid);
			sopPortalFloorEtcFacilityObj.addParam("flr_no", flr_no);
			sopPortalFloorEtcFacilityObj.request({
				method : "GET",
				async : false,
				url : openApiPath + "/OpenAPI3/figure/flooretcfacility.geojson",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0805",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		}
	};
	
	$indoorMapView.response = {
		successBuildingindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response BuildingindoorMapView', res);
				$indoorMapView.ui.setBuildingInfo(res.result);
			}
			else{
				alert( res.errMsg + '(error code:'+ res.errCd +', trId:' + res.trId + ')' );
			}
		},
		successFloorindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FloorindoorMapView', res);
				$indoorMapView.ui.setFloorInfo(res.result);
			}
			else{
				alert( res.errMsg + '(error code:'+ res.errCd +', trId:' + res.trId + ')' );
			}
		},
		successFigureFloorindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FigureFloorindoorMapView', res);
				$indoorMapView.ui.setFigureFloor(res.features);
			}
			else{
				console.log('<<< response FigureFloorindoorMapView: ', 'errCd('+ res.errCd +'), trId(' + res.trId + ')' );
			}
		},
		successFigureCompanyindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FigureCompanyindoorMapView', res);
				$indoorMapView.ui.setFigureCompany(res.features);
			}
			else{
				console.log('<<< response FigureCompanyindoorMapView: ', 'errCd('+ res.errCd +'), trId(' + res.trId + ')' );
			}
		},
		successFigureEtcindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FigureEtcindoorMapView', res);
				$indoorMapView.ui.setFigureEtc(res.features);
			}
			else{
				console.log('<<< response FigureEtcindoorMapView: ', 'errCd('+ res.errCd +'), trId(' + res.trId + ')' );
			}
		}
	};

	$indoorMapView.formatter = {
		/**
		 * 
		 * @name         			: getFloorImgListHtml
		 * @description  			: building info API (7002) 성공시 콜백, 
		 * 				   				건물전체 입체도 html 생성
		 * @history 	 			:
		 * @param flooorInfoListObj	: 전개도 있는 층정보 List
		 * @param lowest_flr   		: 최저층
		 * @param highest_flr   	: 최고층
		 */
		getFloorImgListHtml : function (pBuildInfo, lowest_flr, highest_flr) {
			var obj = pBuildInfo.arFloorAll
			var flooorInfoListObjHtml = '';
			
			flooorInfoListObjHtml += '<style type="text/css">';
			var commonDefaultImg = $indoorMapView.ui.buildInfo.defaultImg;
			var commonSelectImg = $indoorMapView.ui.buildInfo.selectImg;
			
			//10층 미만인 경우 더미층 추가
			var total_flr = Math.abs(lowest_flr) + Math.abs(highest_flr);
			//지하층이 없을 경우 1층을 뺀 더미층 추가
			if(lowest_flr > 0) {
				total_flr = Math.abs(highest_flr);
			}
			var dummy_flr = 10 - total_flr;
			
			if(total_flr < 10){
				for ( var i = 0; i < dummy_flr; i++) {
					flooorInfoListObjHtml += '		.va-slice-D'+ i +' .bg_data span { background: url("images/im/data_02.png") no-repeat left top; display: block; width: 137px; height: 25px;} ';
					flooorInfoListObjHtml += '		.va-slice-D'+ i +'.on .bg_data span { background: url("images/im/data_02.png") no-repeat left top; display: block; width: 137px; height: 25px;} ';
//					console.log('flooorInfoListObjHtml: ', flooorInfoListObjHtml);
				}
			}

			//전층에 대한 이미지
			// break. outerloop:   // This is the label name 사용하기
			for ( var i = eval(highest_flr); i >= lowest_flr; i--) {
				var bSearch = '0';
				
				//지하층인 경우
				if(i <= 0){
					for ( var j = 0; j < obj.length; j++) {
						if ((i-1) == obj[j].flr_no){
							bSearch = '1';
							flooorInfoListObjHtml += '		.va-slice-B'+ Math.abs(i-1) +' .bg_data span { background: url("http://sgis.kostat.go.kr/img/devfigure/'+ obj[j].default_img +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
							flooorInfoListObjHtml += '		.va-slice-B'+ Math.abs(i-1) +'.on .bg_data span { background: url("http://sgis.kostat.go.kr/img/devfigure/'+ obj[j].select_img +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
						}
					}
					
					if(bSearch == '0'){
						flooorInfoListObjHtml += '		.va-slice-B'+ Math.abs(i-1) +' .bg_data span { background: url("http://sgis.kostat.go.kr/img/devfigure/'+ commonDefaultImg +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
//						flooorInfoListObjHtml += '		.va-slice-B'+ Math.abs(i-1) +'.on .bg_data span { background: url("/img/devfigure/'+ commonSelectImg +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
					}
				}
				//지상층인 경우
				else if(i > 0){
					for ( var k = 0; k < obj.length; k++) {
						if (i == obj[k].flr_no){
							bSearch = '1';
							flooorInfoListObjHtml += '		.va-slice-F'+ Math.abs(i) +' .bg_data span { background: url("http://sgis.kostat.go.kr/img/devfigure/'+ obj[k].default_img +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
							flooorInfoListObjHtml += '		.va-slice-F'+ Math.abs(i) +'.on .bg_data span { background: url("http://sgis.kostat.go.kr//img/devfigure/'+ obj[k].select_img +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
						}
					}
					
					if(bSearch == '0'){
						//console.log('전개도 없는 지상층 i: ', i);
							flooorInfoListObjHtml += '		.va-slice-F'+ Math.abs(i) +' .bg_data span { background: url("http://sgis.kostat.go.kr/img/devfigure/'+ commonDefaultImg +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
//							flooorInfoListObjHtml += '		.va-slice-F'+ Math.abs(i) +'.on .bg_data span { background: url("/img/devfigure/'+ commonSelectImg +'") no-repeat left top; display: block; width: 137px; height: 25px;} ';
					}
					
				}
			}
			
			flooorInfoListObjHtml += '</style>';
			
			var tot_floor = 0;
			
			if(total_flr < 10){
				for ( var i = 0; i < dummy_flr; i++) {
					console.log(i);
					flooorInfoListObjHtml += '<div id="va-none" class="va-slice va-slice-1" style="top: '+ (tot_floor*25) +'px; height: 25px; opacity: 1;">';
					flooorInfoListObjHtml += '	<h3 class="va-title">&nbsp;</h3>';
					flooorInfoListObjHtml += '	<div class="va-content bg_data">';
					flooorInfoListObjHtml += '		<span></span>';
					flooorInfoListObjHtml += '	</div>';
					flooorInfoListObjHtml += '</div>';
				}
			}
			
			for ( var n = eval(highest_flr); n >= eval(lowest_flr); n--) {
				var bSearch = '0';	
				//지하층인 경우
				if(n <= 0){
					for ( var m = 0; m < obj.length; m++) {
						if ((n-1) == obj[m].flr_no){
							var tmpFigureClass = "";
							if(pBuildInfo.devFigureType == "01") {	//평면도
								tmpFigureClass = "devFigure";
							} else if(pBuildInfo.devFigureType == "11") {	//혼합도
								if(obj[m].main_yn.trim() != "N1") {	//혼합도의 평면도
									tmpFigureClass = "devFigure";
								}
							}
							bSearch = '1';
							flooorInfoListObjHtml += '<div id="va-slice-B'+ Math.abs(n-1) +'" class="va-slice va-slice-B'+ Math.abs(n-1) +'" onclick="$indoorMapView.ui.getFloor('+ (n-1) +');" style="top: '+ (tot_floor*25) +'px; height: 25px; opacity: 1;">';
							flooorInfoListObjHtml += '	<h3 class="va-title ' + tmpFigureClass + '">'+ (n-1) +'층</h3>';
							flooorInfoListObjHtml += '	<div class="va-content bg_data">';
							flooorInfoListObjHtml += '		<span></span>';
							flooorInfoListObjHtml += '	</div>';
							flooorInfoListObjHtml += '</div>';
						}
					}
					
					if(bSearch == '0'){
						flooorInfoListObjHtml += '<div id="va-none" class="va-slice va-slice-B'+ Math.abs(n-1) +'" style="top: '+ (tot_floor*25) +'px; height: 25px; opacity: 1;">';
//						flooorInfoListObjHtml += '<div id="va-slice-B'+ Math.abs(n-1) +'" class="va-slice va-slice-B'+ Math.abs(n-1) +'" onclick="$indoorMapView.ui.getOnlyCompanyList('+ (n-1) +');" style="top: '+ (tot_floor*25) +'px; height: 25px; opacity: 1;">';
						flooorInfoListObjHtml += '	<h3 class="va-title">'+ (n-1) +'층</h3>';
						flooorInfoListObjHtml += '	<div class="va-content bg_data">';
						flooorInfoListObjHtml += '		<span></span>';
						flooorInfoListObjHtml += '	</div>';
						flooorInfoListObjHtml += '</div>';
					}
					tot_floor++;
				}
				//지상층인 경우
				else if(n > 0){
					for ( var p = 0; p < obj.length; p++) {
						if (n == obj[p].flr_no){
							var tmpFigureClass = "";
							if(pBuildInfo.devFigureType == "01") {	//평면도
								tmpFigureClass = "devFigure";
							} else if(pBuildInfo.devFigureType == "11") {	//혼합도
								if(obj[p].main_yn.trim() != "N1") {	//혼합도의 평면도
									tmpFigureClass = "devFigure";
								}
							}
							bSearch = '1';
							flooorInfoListObjHtml += '<div id="va-slice-F'+ Math.abs(n) +'" class="va-slice va-slice-F'+ Math.abs(n) + '" onclick="$indoorMapView.ui.getFloor('+ n +');" style="top: '+ (tot_floor*25) +'px; height: 25px; opacity: 1;">';
							flooorInfoListObjHtml += '	<h3 class="va-title ' + tmpFigureClass + '">'+ n +'층</h3>';
							flooorInfoListObjHtml += '	<div class="va-content bg_data">';
							flooorInfoListObjHtml += '		<span></span>';
							flooorInfoListObjHtml += '	</div>';
							flooorInfoListObjHtml += '</div>';
						}
					}
					
					if(bSearch == '0'){
						flooorInfoListObjHtml += '<div id="va-none" class="va-slice va-slice-F'+ Math.abs(n) +'" style="top: '+ (tot_floor*25) +'px; height: 25px; opacity: 1;">';
//						flooorInfoListObjHtml += '<div id="va-slice-F'+ Math.abs(n) +'" class="va-slice va-slice-F'+ Math.abs(n) +'" onclick="$indoorMapView.ui.getOnlyCompanyList('+ n +');" style="top: '+ (tot_floor*25) +'px; height: 25px; opacity: 1;">';
						flooorInfoListObjHtml += '	<h3 class="va-title">'+ n +'층</h3>';
						flooorInfoListObjHtml += '	<div class="va-content bg_data">';
						flooorInfoListObjHtml += '		<span></span>';
						flooorInfoListObjHtml += '	</div>';
						flooorInfoListObjHtml += '</div>';
					}
					tot_floor++;
				}

			}
			
			return flooorInfoListObjHtml;
		},
		getFloorImgListJs : function (obj, total_flr_Num) {
			var flooorInfoListObjHtml = '';
			var visibleSlices = (total_flr_Num > 10) ? 10 : 10/*total_flr_Num*/ ;
//			var expandedHeight = (total_flr_Num > 10) ? total_flr_Num : 10 ;
			var expandedHeight = 25;
			flooorInfoListObjHtml += '<script type="text/javascript">';
			flooorInfoListObjHtml += '$(function() {';
			flooorInfoListObjHtml += '	$("#va-accordion").vaccordion({';
			flooorInfoListObjHtml += '		visibleSlices	: 10,';
			flooorInfoListObjHtml += '		expandedHeight	: '+ expandedHeight +',';
			flooorInfoListObjHtml += '		animOpacity		: 1,';
			flooorInfoListObjHtml += '		contentAnimSpeed: 1,';
			flooorInfoListObjHtml += '		baseFloor: ' + $indoorMapView.ui.baseFloor;
			flooorInfoListObjHtml += '	});';
			flooorInfoListObjHtml += '});';
			flooorInfoListObjHtml += '</script>';

			return flooorInfoListObjHtml;
		},
		setChartListHtml : function (BuildChartListObj) {
			var results = [];
			
			for(var i=0; i<BuildChartListObj.length; i++){
				var array = [ BuildChartListObj[i].b_theme_cd_nm , Number(BuildChartListObj[i].corp_per) ] ;
				results.push(array);
			}
				
			// Build the chart
	        $('#container').highcharts({
	            chart: {
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false,
					margin: [10, 70, 60, 0]
	            },

				legend: {
					width: 100,
					align: 'right',
					verticalAlign: 'top',
					itemMarginBottom: 5,
					layout: 'vertical',
					x: 20,
					y: 0,
					symbolWidth: 6,
					symbolHeight: 6,
					floating: true
				},

	            title: {
	                text: ''
	            },
	            tooltip: {
	                pointFormat: '{series.data.name}:<b>{point.percentage:.1f}%</b>'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false
	                    },
	                    showInLegend: true
	                }
	            },
	            series: [{
	                type: 'pie',
	                data: results
	            }]
	        });        
		},
		
		//평면도 테마코드 목록
		getFlrThemeListHtml : function (obj) {
			var result = '<ul>';
			
			for ( var i = obj.length-1; i >= 0; i--) {
				var theme_name = '';
				if(obj[i].theme_cd_nm.length > 11){
					theme_name = obj[i].theme_cd_nm.substring(0,11)+'...';
				}else{
					theme_name = obj[i].theme_cd_nm;
				}
				result += '<li onclick="$indoorMapView.ui.getCompanyOnTheme('+ obj[i].theme_cd +');"><a href="#">'+ theme_name +'</a></li>';
			}
			result += '</ul>';
			
			return result;
		},
		
		//평면도 사업체 목록
		getFlrCompanyListHtml : function (obj, themeCd) {
			var result = '';
			if(themeCd != null && (themeCd.length != 0)) {
				result += '<dl>';
				
				for ( var i = 0; i < obj.length; i++) {
					if(Number(obj[i].theme_cd) == Number(themeCd)){
						result += '<dt onclick="$indoorMapView.ui.selectCorp(\''+ obj[i].decilist_serial +'\');"><a href="#">'+ obj[i].corp_nm.trim() +'</a></dt>';
//						result += '<dd onclick="$indoorMapView.ui.selectCorp('+ obj[i].decilist_serial +');"><a href="#">'+ obj[i].tel_no +'</a></dd>';
					}
				}
				result += '</dl>';
			}else{
				result += '<dl>';
				for ( var i = 0; i < obj.length; i++) {
					if(obj[i].theme_cd == themeCd){
						result += '<dt onclick="$indoorMapView.ui.selectCorp(\''+ obj[i].decilist_serial +'\');"><a href="#">'+ obj[i].corp_nm.trim() +'</a></dt>';
					}
				}
				result += '</dl>';
			}
			
			return result;
		},
		getFlrCompanyAllListHtml : function (companyObj, themeObj) {
			var result = '<ul>';
			
			if (companyObj.length == 0) {
				result += "<li>해당 층의 사업체 정보가 없습니다.</li>";
			}else {
				for ( var i = 0; i < companyObj.length; i++) {
					var theme_cd_nm = '';
					for ( var j = 0; j < themeObj.length; j++) {
						if(companyObj[i].theme_cd == themeObj[j].theme_cd){
							theme_cd_nm = themeObj[j].theme_cd_nm;
						}
					}
//					result += '<li><a href="#"><span>'+ companyObj[i].corp_nm.trim() +'</span> / '+ companyObj[i].tel_no +'&nbsp;'+ theme_cd_nm +'</a></li>';
					result += '<li><a href="#"><span>'+ companyObj[i].corp_nm.trim() +'</span> '+ theme_cd_nm +'</a></li>';
				}
			}
			result += '</ul>';
			
			return result;
		}
	};
	
	/** ********* 개별건물속성 Start ********* */
	$class("sop.portali.buildingIndoor.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			console.log(options);
			if(res.errCd == "0") {
				//건물 업종분포도, 입체도 호출
				$indoorMapView.request.getBuildingInfoView(result, options.params.sufid);
				//API 로그
				options.adm_nm = result.bd_adm_addr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getBuildingindoorMapView(options.params.sufid);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별건물속성 End ********* */
	
	/** ********* 개별 건물의 층 별 사업체 정보 호출 Start ********* */
	$class("sop.portali.floorIndoor.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFloorindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFloorindoorMapView(options.params.sufid, options.params.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층 별 사업체 정보 호출 End ********* */
	
	/** ********* 개별 건물의 층별 외각 공간정보 호출 Start ********* */
	$class("sop.portali.floorBoundary.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFigureFloorindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFigureFloorindoorMapView(options.params.sufid, options.params.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층별 외각 공간정보 호출 End ********* */
	
	/** ********* 개별 건물의 층별 사업체 공간정보 호출 Start ********* */
	$class("sop.portali.floorCompany.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFigureCompanyindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFigureCompanyindoorMapView(options.params.sufid, options.params.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층별 사업체 공간정보 호출 End ********* */
	
	/** ********* 개별 건물의 층별 기타시설물 공간정보 호출 Start ********* */
	$class("sop.portali.floorEtcFacility.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFigureEtcindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFigureEtcindoorMapView(options.sufid, options.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층별 기타시설물 공간정보 호출 End ********* */
	
}(window, document));