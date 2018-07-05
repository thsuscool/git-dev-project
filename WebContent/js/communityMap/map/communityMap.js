/**
 * 통계 소통지도 화면에 대한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2015/10/19  초기 작성
 * (주)유코아시스템, 1.0, 2015/12/1 디자인 변경으로 안한 수정
 * author : 이기로,나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$communityMap = W.$communityMap || {};

	$(document).ready(function() {
		$communityMap.event.setUIEvent();
	});
	$communityMap.ui = {
		namespace : "communityMap",
		dataGeojson:[],
		mapList: [],//지도 리스트
		curMapId: null,//현재 지도 id
		curDropParams: [],//파라미터
		curCenter: [],//현재 중심 좌표
		curAdmCd:null,//현재 지역 코드
		curZoom:null,//현재 줌
		reportPopup : null,
		dropBtnInfo : [],
		dataTypeList : [],
		mydataMarkers : [],
		mydata:null,
		/**
		 * @name         : $communityMap.ui.createMap
		 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 * @date         : 2015. 12. 1. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param id     : 지도 아이디
		 * @param seq    : 지도 시퀀스
		 * @param view   : 범례,poi,setting,maptype 보여줄지의 여부
		 */
		createMap: function(id, seq, view) {
			var map = new sMap.map();
			if(!/^\/view\/community\/form/.test(location.pathname)&&(!$communityMapCommon.hasText(communityMapInfo.stats)||communityMapInfo.stats.length<=0)){
				$communityMap.noReverseGeoCode = true;
			}
			$communityMap.ui.curMapId = seq;
			map.createMap($communityMap, id, {
				center: [989674, 1818313],
				zoom: 8,
				measureControl: false,
				statisticTileLayer: true
			});
			map.id = seq;
			map.addControlEvent("drop", {accept : ".dragItem"});
			map.addControlEvent("moveend");
			map.addControlEvent("zoomstart");
			map.addControlEvent("zoomend");
			
			//범례 호출 함수 
			var legend = new sLegendInfo.legendInfo(map);
			legend.initialize($communityMap.ui);
			map.legend = legend;
			legend.createLegend();
			
			//버튼 생성
			var btnInfo = new interactiveMapBtnInfo.btnInfo(map);
			map.mapBtnInfo = btnInfo;
			btnInfo.createUI({
				intrPoiControl : false,
				intrSettingControl : true,
				mapTypeControl : true,
				intrZoomControl : true
			});	
			//사용자지정컨트롤설정
			$communityMap.ui.mapList[seq] = map;
			
			map.gMap.whenReady(function() {
				if(/^\/view\/community\/form/.test(location.pathname)){
					$communityForm.event.setUIEvent();
				}else{
					map.createHeatMap();
					var legend = $communityMap.ui.mapList[$communityMap.ui.curMapId].legend;
					var legendBox = $("#legendBox_"+legend.id);
					legendBox.removeClass(legendBox.attr("data-ing"));
					legendBox.attr("data-ing", "max");
					$("#btn_legend_"+legend.id).click();
				}
				try{
					if(defaultCurCenter){
						$communityMap.ui.curAdmCd = defaultCurAdmCd;
						$communityMap.ui.curCenter = defaultCurCenter;
						$communityMap.ui.curZoom = defaultCurZoom;
						
						map.mapMove($communityMap.ui.curCenter,$communityMap.ui.curZoom);
						setTimeout(function(){
							if(defaultMyData){
								$communityMapApi.request.getMyData(defaultMyData);
							}
						}, 500);
					}else{
						map.mapMove([map.gMap.getCenter().x,map.gMap.getCenter().y],8);
					}
				}catch(e){
					map.mapMove([map.gMap.getCenter().x,map.gMap.getCenter().y],8);
				}
				$publicDataBoard.ui.map = map;
				$("#set_"+btnInfo.id+" a.ico_side_reset").parent().remove();
				$("#set_"+btnInfo.id+" a.ico_side_lv").parent().remove();
				$("#set_"+btnInfo.id+" a.ico_side_Select.multi_bound").parent().remove();
				$("#set_"+btnInfo.id+" .rqListBox.rq02").width(50);
			});
		},
		/**
		 * @name         : doMaxSize
		 * @description  : 맵을 최대화한다.
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		doMaxSize : function(type) {
			if(!$(".tb_sizing").hasClass("on")){
				$communityMapCommon.doMax();
			}else{
				$(".tb_sizing").tooltip("close").attr("title","전체 화면 확대").removeClass("on");
				$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png");
				$("header").css({"height":"104px", "width":"970px"});
				$("body").css({"background":""});
				$(".headerEtc, .gnb, .headerContents").show();
				$(".headerContents h1").css({"height":"78px"});
				$(".headerContents h1 img").show();
				$(".containerBox").css({"height":"calc(100% - 104px)", "top":"104px","border-top":""});
			}
			
			for (var i=0; i<this.mapList.length; i++) {
				if (this.mapList[i] != null) {
					this.mapList[i].update();
				}
			}
		},
		
		/**
		 * 
		 * @name           : doClearMap
		 * @description    : 맵의 오버레이를 초기화한다.
		 * @date           : 2015. 11. 21. 
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param callback : 콜백 함수
		 */
		doClearMap : function(callback) {
			if (this.mapList.length > 0) {
				var map = this.mapList[this.curMapId];
				map.clearDataOverlay();
				map.drawControl.removeOverlay();
				if($communityMap.ui.sggMarker!=null){
					$communityMap.ui.sggMarker.remove(map.gMap);
					$communityMap.ui.sggMarker = null;
				}
				if (map.dataGeojson) {
	    			map.dataGeojson.remove();
	    		}
				if(this.dataGeojson.length>0){
					$.map(this.dataGeojson,function(value,key){
						value.remove();
					});
					$communityMap.ui.dataGeojson = [];
				}
			}
			if(typeof callback === "function"){
				callback();
			}
		},
		
		
		/**
		 * 
		 * @name         : createInfoTooltip
		 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
		 * @date         : 2015. 11. 21. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param event  : 선택된 경계레이어
		 * @param data   : 선택된 경계레이어의 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 * @param map    : 지도
		 */
		createInfoTooltip : function(event, data, type, map) {
			if (type == "data") {
				var tooltipBox = $("<div/>");
				var admName = data.properties.adm_cd.length>7?"":$("<div/>",{"class":"admName","style":"font-size:14px;font-weight:bold;color:#3792de;","text":data.properties.adm_nm});
				if (data.info.length > 0) {
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
					var tmpData = data.info[0];
					var dataName = $("<span/>",{"class":"statsData","style":"font-size:12px;padding-left:5px;","text":(tmpData.data_nm?tmpData.data_nm:showName[tmpData.showData])});
					var dataBox = $("<div/>");
					if(tmpData.showData&&tmpData.showData.length>0){
						var value;
						if(!tmpData[tmpData.showData]||(parseFloat(tmpData[tmpData.showData]) < 5 && 
								tmpData.showData != "avg_age" &&
								tmpData.showData != "ppltn_dnsty" &&
								tmpData.showData != "aged_child_idx" && 
								tmpData.showData != "oldage_suprt_per" &&
								tmpData.showData != "juv_suprt_per" && 
								tmpData.showData != "tot_suprt_per" &&
								tmpData.showData != "tot_worker" &&
								tmpData.showData != "avg_fmember_cnt" &&
								tmpData.showData != "employee_cnt")) {
							value = "N/A";
						}else {
							value = appendCommaToNumber(tmpData[tmpData.showData]);
						}
						dataName.text((dataName.text().length>0?dataName.text()+" : ":"")+value+(value!="N/A"&&tmpData.unit?"("+tmpData.unit+")":""));
					}
					tooltipBox.append(admName,dataBox.append(dataName));
				}else {
					tooltipBox.append(admName,"N/A");
				}
			}
			event.target.bindToolTip("<div style='margin:10px'>"+tooltipBox.html()+"</div>", {
				direction: 'right',
				noHide:true,
				opacity: 1,
				pane:"infowindowPane"
			}).addTo(map.gMap)._showToolTip(event);
		},
		/**
		 * @name         : $communityMap.ui.setLastGeoJsonInfo
		 * @description  : 
		 * @date         : 2015. 12. 25.
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param result
		 * @param map
		 * @param adm_cd
		 * @param year
		 * @param curPolygonCode
		 */
		setLastGeoJsonInfo : function(result,map,adm_cd,year,curPolygonCode){
			map.lastGeojsonInfo = {
					adm_cd:adm_cd,
					geojson:result,
					low_search: "1",
					target:map,
					year:year
			};
			result["combine"] = true;
			result["pAdmCd"] = adm_cd;
			map.curPolygonCode = curPolygonCode;
			map.setPolygonDataGeojson(result);
		},
		/**
		 * @name                   : $communityMap.ui.setStats
		 * @description            : 통계 셋팅
		 * @date                   : 2016. 1. 14. 
		 * @author                 : 나광흠
		 * @history                :
		 * @param type             : 통계 값
		 * @param autoDownBoundary : autoDownBoundary 유무
		 * @param callback         : callback
		 */
		setStats : function(type,autoDownBoundary,callback){
			$communityMap.ui.doClearMap(function(){
				var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
				var parameters={
					year : dataYear,
					bnd_year : map.bnd_year,
					low_search : "1",
					adm_cd : $communityMap.ui.curAdmCd
				};
				if(typeof callback ==="function"){
					parameters.callback = callback;
				}
				if(type=="bassStats"){//총인구
					$communityMapApi.request.getStats(openApiPath+$communityMapApi.request.API_0301_URL,false,{
						params:{
							map : map,
							adm_cd : $communityMap.ui.curAdmCd, 
							filter : "tot_ppltn",
							unit : "명",
							data_nm : "총인구"
						},
						parameters:parameters,
						autoDownBoundary:autoDownBoundary
					});
				}else if(type=="bassBsnes"){//사업체
					parameters.year = companyDataYear;
					$communityMapApi.request.getStats(openApiPath+$communityMapApi.request.API_0304_URL,false,{
						params:{
							map : map,
							adm_cd : $communityMap.ui.curAdmCd, 
							filter : "corp_cnt",
							unit : "개",
							data_nm : "총사업체"
						},
						parameters:parameters,
						autoDownBoundary:autoDownBoundary
					});
				}else{
					$communityMapApi.request.openApiStatisticsHistoryParamInfo(type,autoDownBoundary,callback);
				}
			});
		},
		/**
		 * @name         : reportDataSet
		 * @description  : 보고서 데이터 세팅 
		 * @date         : 2016. 01. 19. 
		 * @author	     : 이주혁
		 */
		reportDataSet : function() {
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			$communityMap.ui.reportPopup = window.open(contextPath + "/js/communityMap/report/communityReportForm.html?cmmnty_map_id="+$communityMapCommon.getParameter("cmmnty_map_id"), "reportPrint","width=850, height=700, scrollbars=yes");
		},
		/**
		 * @name         : reportLoad
		 * @description  : 보고서의 데이터를 설정한다.
		 * @date         : 수정
		 * @author	     : 이주혁
		 */
		reportLoad : function() {
			this.reportPopup.$reportForm.ui.CommunityReportList(); // 보고서리스트
			this.reportPopup.$reportForm.ui.CommunityLocation(); //지역설정
			
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			var mapType = "communityMap";
			var divId = "#mapRgn_" + (map.id + 1);
			var title, adm_nm, companyObj, subTitle, dataType, mapData, param, options, poiData, chartId;
			var chart = [];
			var legend = null;
			var param = {};
			var main = "";
			var unit = "";
			if($communityMap.ui.mapList[0].dataForCombine){
				main = $("#history-list .dragItem a.M_on ").text().replace(/(^\s*)|(\s*$)/g, "");
				unit = $communityMap.ui.mapList[0].dataForCombine.unit;
			}
			
			
			var dataList = {
				id : map.id, 
				divId : divId,
				geojson : map.dataGeojsonLayer, 
				title : main,//보고서명
				unit : unit,//보고서명 ()
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
				dataType : dataType
			};
			var options = {
				mapType : mapType,
				mapClone : $(divId).clone(),
				mapWidth : $(divId).width(),
				mapHeight : $(divId).height(),
				chart : chart,
				legend :legend
			};
			var popup = this.reportPopup.$reportForm.ui;
			popup.setData(dataList, options);
		},
		/**
		 * @name         : getSHPfile
		 * @description  : SHP 파일 얻기 
		 * @date         : 2016. 06. 16. 
		 * @author	     : 나광흠
		 */
		getSHPfile : function(){
			if($communityView.ui.markers.length>0){
				location.href=contextPath+"/view/community/fileDownLoadSHP?cmmnty_map_id="+$communityMapCommon.getParameter("cmmnty_map_id");
			}else{
				$communityMapCommon.alert("알림", "등록된 의견이 존재하지 않습니다.");
			}
			return false;
		},
		/**
		 * @name             : getCompanyPoi
		 * @description      : 사업체 POI 셋팅
		 * @date             : 2016. 06. 16. 
		 * @author	         : 나광흠
		 * @param class_code : 코드
		 */
		getCompanyPoi : function(class_code){
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			map.mapBtnInfo.clearPOI();
			if($communityMapCommon.hasText(class_code)){
				class_code = class_code.toString();
				map.mapMove($communityMap.ui.curCenter,10);
				map.mapBtnInfo.isShow = true;
				map.mapBtnInfo.isOpenPOI = true;
				map.mapBtnInfo.reqThemePoiInfo(class_code, "0");
			}
		}
	};	
	// ==============================//
	// map event callback
	// ==============================//
	$communityMap.callbackFunc = {
		// 맵이동 종료시, 콜백 호출
		didMapMoveEnd : function(event, map) {
			var poiControl = map.mapBtnInfo;
			//테마poi조회
			if (poiControl.isOpenPOI &&poiControl.isShow &&poiControl.themeCd != undefined && poiControl.themeCd.length > 0) {
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
		},
		// 맵 줌시작 시, 콜백 호출
		didMapZoomStart : function(event, map) {
		},
		// 맵 줌 종료 시, 콜백 호출
		didMapZoomEnd : function(event, map) {
			var poiControl = map.mapBtnInfo;
			//사업체 POI 없애기
			if (map.zoom < 9 && poiControl.isOpenPOI && poiControl.isShow) {
				poiControl.isShow = false;
				$communityMapCommon.alert("알림","해당 레벨부터는 사업체 POI정보를 볼 수 없습니다.<br>집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.");
			}else if (map.zoom >= 9 && poiControl.isOpenPOI && !poiControl.isShow) {
				poiControl.isShow = true;
			}
		},
		// 드랍종료 시, 콜백 호출
		didMapDropEnd : function(event, source, layer, data, map) {
			$communityMap.ui.curAdmCd = data.adm_cd;
			$communityMap.ui.curCenter = [data.x,data.y];
			if(data.adm_cd){
				if(data.adm_cd=="00"||data.adm_cd.length<2){
					$communityMap.ui.curZoom = 2;
					$communityMap.ui.curCenter = [990485.1664455982,1815841.4483907088];
					$communityMap.ui.curAdmCd = "";
				}else if(data.adm_cd.length==2){
					$communityMap.ui.curZoom = 4;
				}else if(data.adm_cd.length==5){
					$communityMap.ui.curZoom = 6;
				}else if(data.adm_cd.length==7||data.adm_cd.length>7){
					$communityMap.ui.curZoom = 10;
					$communityMap.ui.curAdmCd = data.adm_cd.substring(0,7);
				}else{
					return;
				}
			}else{
				$communityMap.ui.curZoom = 1;
			}
			map.curDropCd = $communityMap.ui.curAdmCd;
			source.parent("ul").find("input:checkbox").prop("checked",false);
			source.parent("ul").find("li>a").removeClass("M_on");
			source.parent("ul").find("li[data-list="+source.data("list")+"]>a").addClass("M_on");
			source.parent("ul").find("li[data-list="+source.data("list")+"] input:checkbox").prop("checked",true);
			var type = source.data("list"),autoDownBoundary = true,callback = function(){
				if($communityMap.ui.mydataMarkerGroup!=null&&$("#defaultMydataBtn").hasClass("on")){
					$.each($communityMap.ui.mydataMarkers,function(cnt,node){
						node.addTo($communityMap.ui.mapList[$communityMap.ui.curMapId].gMap);
					});
				}
			};
			if(source.data("type")=="history"){
				$communityMap.ui.setStats(type,autoDownBoundary,callback);
			}else{
				return;
			}
		},
		/**
		 * 
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
				$communityMap.ui.createInfoTooltip(event, data, type, map);
			}
		},
		/**
		 * 
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
		}
	};
	

	$communityMap.event = {
		/**
		 * 
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			accessTokenInfo(function(){
				$communityMap.ui.createMap("mapRgn_1", 0);
				var mapNavi = new mapNavigation.UI();
				mapNavi.create("mapNavi_1", 1, $communityMap.ui);
				try{
					if($communityLeftMenu){
						if($communityLeftMenu.ui.member){
							$communityLeftMenu.event.member.setUIEvent();
						}
						$communityLeftMenu.event.setUIEvent();
					}
					if($communityView){
						$communityView.event.setUIEvent();
					}
				}catch(e){
					console.warn(e);
				}
			});
		}
	};
}(window, document));
