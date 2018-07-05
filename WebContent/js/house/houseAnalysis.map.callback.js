/**
 * 살고싶은 우리동네 화면에 대한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2015/10/19  초기 작성
 * (주)유코아시스템, 1.0, 2015/12/01 디자인 변경으로 안한 수정
 * author : 이기로,나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$houseAnalysisMap.callbackFunc = {
		/**
		 * @name         : didMapMoveEnd
		 * @description  : 맵이동 종료시, 콜백 호출
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param map    : 지도
		 */
		didMapMoveEnd: function(event, map) {
			var poiControl = map.mapBtnInfo;
			var poiHouseControl = map.mapHouseBtnInfo;
			//테마poi조회
			if (poiControl.isOpenPOI && poiControl.isShow && poiControl.themeCd != undefined && poiControl.themeCd.length > 0) {
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
			if (poiControl.isOpenPOI && poiControl.isShow && poiControl.class_cd != undefined && poiControl.class_cd.length > 0) {
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
			//버스poi 조회
			if (poiHouseControl.isBusOpenPOI && poiHouseControl.isShowBus) {
				if (poiHouseControl.mapBounds == null) {
					map.markers.clearLayers();
					poiHouseControl.busStopPoi();
				}else {
					if (!poiHouseControl.mapBounds.contains(map.gMap.getCenter())) {
						map.markers.clearLayers();
						poiHouseControl.busStopPoi();
					}
				}	
			}
			//학구도poi조회
			if (poiHouseControl.isOpenPOI && poiHouseControl.isShow && poiHouseControl.schoolType != undefined && poiHouseControl.schoolType != null) {
				if (poiHouseControl.mapBounds == null) {
					poiHouseControl.clearPOI();
					poiHouseControl.schoolZone();
				}else {
					if (!poiHouseControl.mapBounds.contains(map.gMap.getCenter())) {
						poiHouseControl.clearPOI();
						poiHouseControl.schoolZone();
					}
				}
			}
		},
		/**
		 * @name         : didMapZoomEnd
		 * @description  : 맵 줌 종료 시, 콜백 호출
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param map    : 지도
		 */
		didMapZoomEnd: function(event, map) {
			var poiControl = map.mapBtnInfo;
			var poiHouseControl = map.mapHouseBtnInfo;
			//사업체 POI 없애기
			if (map.zoom < 10 && poiControl.isOpenPOI && poiControl.isShow) {
				poiControl.isShow = false;
				messageConfirm.open(
					"알림", 
					"해당 레벨부터는 사업체 POI정보를 볼 수 없습니다.<br>" +
					"유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
					btns = [{
						title : "그만보기",
						fAgm : null,
						disable : false,
						func : function(opt) {
							poiControl.clearPOI();
						}
					},{title : "유지하기"}   
				]);
			}else if (map.zoom >= 10 && poiControl.isOpenPOI && !poiControl.isShow) {
				poiControl.isShow = true;
			}
			//버스poi 조회
			if (map.zoom < 10 && poiHouseControl.isBusOpenPOI && poiHouseControl.isShowBus) {
				poiHouseControl.isShowBus = false;
				messageConfirm.open(
					"알림", 
					"해당 레벨부터는 버스 POI정보를 볼 수 없습니다..<br>" +
					"유지하기 버튼을 누르면 읍면동레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
					btns = [{
						title : "그만보기",
						fAgm : null,
						disable : false,
						func : function(opt) {
							poiHouseControl.clearPOI();
						}
					},{title : "유지하기"}   
				]);
			}else if (map.zoom >= 10 && poiHouseControl.isBusOpenPOI && !poiHouseControl.isShowBus) {
				poiHouseControl.isShowBus = true;
			}
			if(map.zoom < 6&&poiHouseControl.isOpenPOI&&poiHouseControl.isShow){
				poiHouseControl.isShow = false;
				messageConfirm.open(
					"알림", 
					"해당 레벨부터는 학구도 정보를 볼 수 없습니다..<br>" +
					"유지하기 버튼을 누르면 읍면동레벨로 이동할 시 다시 학구도를 볼 수 있습니다.",
					btns = [{
						title : "그만보기",
						fAgm : null,
						disable : false,
						func : function(opt) {
							poiHouseControl.clearPOI();
						}
					},{title : "유지하기"}   
				]);
			}else if (map.zoom >= 6 && poiHouseControl.isOpenPOI&&!poiHouseControl.isShow) {
				poiHouseControl.isShow = true;
			}
		},
		/**
		 * @name         : didMouseOverPolygon
		 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param data   : 해당 레이어 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 * @param map    : 지도
		 */
		didMouseOverPolygon: function(event, data, type, map) {
		},
		/**
		 * @name         : didMouseOverPolygon
		 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param data   : 해당 레이어 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 * @param map    : 지도
		 */
		didMouseOverPolygon: function(event, data, type, map) {
			if (type != "polygon") {
				if (type == "data") {
					if (data.info.length > 0) {
						map.legend.selectLegendRangeData(event.target.options.fillColor);
					}
				}
				$houseAnalysisMap.ui.createInfoTooltip(event, data, type, map);
				if(data.properties&&data.properties.adm_cd){
					$houseAnalysisMap.chart.selectChartData(data.properties.adm_cd);
				}
			}
		},
		/**
		 * @name         : didMouseOutPolygon
		 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param data   : 해당 레이어 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 * @param map    : 지도
		 */
		didMouseOutPolygon: function(event, data, type, map) {
			$houseAnalysisMap.chart.unSelectChartData();
		},
		/**
		 * @name         : didSelectedPolygon
		 * @description  : 해당경계 선택 시, 발생하는 콜백함수
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param data   : 해당 레이어 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 * @param map    : 지도
		 */
		didSelectedPolygon: function(event, data, type, map) {
			if(type=="data"||type=="region"){
				if($houseAnalysisMap.search.isAbode==true||$houseAnalysisMap.search.isAbode==false){
					if(data.properties.adm_cd&&data.properties.adm_cd.length<=7){
						var mapOptions = $houseAnalysisMap.databoard.getMapOptions(data.properties.adm_cd);
						if($houseAnalysisMap.search.isIndicator==true){
							var mClassObject=bClassInfoList[$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id].indicator[$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id];
							var searchLevel = $houseAnalysisMap.search.mapStat.indicator.getSearchLevel(mapOptions.adm_cd);
							if($houseAnalysisMap.ui.hasText(mapOptions.adm_cd)&&mapOptions.adm_cd.length<7){
								if(searchLevel<=mClassObject.disp_level){
									$houseAnalysisMap.noReverseGeoCode = true;
									map.mapMove([data.properties.x,data.properties.y],mapOptions.zoom);
									setTimeout(function(){
										search(map);
									},500);
								}
							}
							$houseAnalysisMap.search.setTitle(data.properties.adm_nm,mClassObject.m_class_idx_nm);
						}else if($houseAnalysisMap.search.isCensus==true){
							if($houseAnalysisMap.ui.hasText(mapOptions.adm_cd)&&mapOptions.adm_cd.length<=7){
								$houseAnalysisMap.noReverseGeoCode = true;
								map.mapMove([data.properties.x,data.properties.y],mapOptions.zoom);
								setTimeout(function(){
									search(map);
								},500);
							}
							$houseAnalysisMap.search.setTitle(data.properties.adm_nm,$houseAnalysisMap.search.mapStat.census.data_nm);
						}
					}
				}
			}
		},
		/**
		 * @name         : boundaryCallback
		 * @description  : 경계 그린 후 콜백함수
		 * @date         : 2016. 8. 16. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param map    : 지도
		 * @param res    : 경계 response
		 */
		boundaryCallback : function(map,res){
			if($houseAnalysisMap.search.isAbode===true&&$houseAnalysisMap.search.isShowDatabaord===false&&$houseAnalysisMap.search.isIndicator==true){
				if($houseAnalysisMap.search.isStandBy===true){
					if(map.geojson&&map.dataGeojson){
						if(map.geojson.getBounds().equals(map.dataGeojson.getBounds())){
							map.geojson.remove();
						}else{
							search(map);
						}
					}else{
						search(map);
					}
				}else if($houseAnalysisMap.search.isStandBy===false){
					$houseAnalysisMap.search.isStandBy = true;
					return;
				}
			}else{
				if(map.geojson){
					map.geojson.remove();
				}
			}
		}
	};
	/**
	 * @name         : search
	 * @description  : 재조회
	 * @date         : 2016. 08. 22. 
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param map    : 지도
	 */
	function search(map){
		var adm_cd = $houseAnalysisMap.databoard.getPolygonCodeToAdmCd();
		var search_adm_cd = $houseAnalysisMap.search.searchAdmCd;
		adm_cd = adm_cd?adm_cd:"00";
		if($houseAnalysisMap.ui.hasText(search_adm_cd)&&search_adm_cd!="00"&&search_adm_cd!=adm_cd.substring(0,search_adm_cd.length)){
			$("#high-location").hide()
			if(map.geojson){
				map.geojson.remove();
			}
			return;
		}
		if($houseAnalysisMap.ui.hasText(search_adm_cd)&&search_adm_cd!="00"){
			if(search_adm_cd==adm_cd){
				$("#high-location").off("click").hide();
			}else{
				highButtonEvent(map,adm_cd);
			}
		}else{
			if($houseAnalysisMap.search.isAbode==true&&$houseAnalysisMap.search.isShowDatabaord==false&&adm_cd!="00"){
				highButtonEvent(map,adm_cd);
			}else{
				$("#high-location").off("click").hide();
			}
		}
		$houseAnalysisMap.search.activeAdmCd = adm_cd;
		if($houseAnalysisMap.search.isIndicator==true){
			$houseAnalysisMap.search.mapStat.indicator.adm_cd = adm_cd;
			$houseAnalysisMap.search.mapStat.indicator.search();
		}else if($houseAnalysisMap.search.isCensus==true){
			if($houseAnalysisMap.ui.hasText(adm_cd)&&adm_cd!="00"){
				$houseAnalysisMap.search.mapStat.census.parameters.adm_cd = adm_cd;
				$houseAnalysisMap.search.mapStat.census.search();
			}
		}else{
			return;
		}
		if($houseAnalysisMap.search.isShowDatabaord==true&&$houseAnalysisMap.search.isOverrideBoundary==false){//데이터 보드 셋팅
			if($houseAnalysisMap.search.isAbode){
				$houseAnalysisMap.search.abode.setDataboard();
			}else{
				$houseAnalysisMap.search.getRecommendObject().setDataboard();
			}
		}
	}
	/**
	 * @name         : highButtonEvent
	 * @description  : 상위 지역 이동 버튼 이벤트
	 * @date         : 2016. 08. 22. 
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param map    : 지도
	 * @param adm_cd : 행정동 코드
	 */
	function highButtonEvent(map,adm_cd){
		$("#high-location").off("click").show().click(function(){
			if($houseAnalysisMap.search.lastMapOption.center&&$houseAnalysisMap.search.lastMapOption.zoom){
				$houseAnalysisMap.noReverseGeoCode = true;
				var zoom;
				if($houseAnalysisMap.ui.hasText(adm_cd)&&adm_cd!="00"){
					if(adm_cd.length==2){
						zoom = 2;
					}else if(adm_cd.length==5){
						zoom = 4;
					}else if(adm_cd.length>=7){
						zoom = 6;
					}
				}else{
					zoom = 2;
				}
				map.mapMove($houseAnalysisMap.search.lastMapOption.center,zoom);
				setTimeout(function(){
					search(map);
				},500);
			}
		});
	}
}(window, document));