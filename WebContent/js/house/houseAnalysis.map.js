/**
 * 살고싶은 우리동네 화면에 대한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2015/10/19 초기 작성
 * (주)유코아시스템, 1.0, 2015/12/01 디자인 변경으로 안한 수정
 * author : 이기로,나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$houseAnalysisMap.noReverseGeoCode = true;
	$houseAnalysisMap.ui = {
		reportPopup : null,
		namespace : "houseAnalysisMap",
		mapList: [],//지도 리스트
		recommendDataGeojson : null,//추천지역 geojson
		recommendMarker : null,//추천지역 marker
		indicatorStatMap : null,//현재 지표 통계 인지 유무
		doRemoveFlag : true,
		
		bookmark_mapcenter : [],
		bookmark_zoom_level : "",
		share_info_type : "",
		
		/**
		 * @name         : $houseAnalysisMap.ui.createMap
		 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 * @date         : 2015. 12. 01. 
		 * @author	     : 이기로,나광흠
		 * @history 	 :
		 * @param id     : 지도 아이디
		 * @param seq    : 지도 시퀀스
		 */
		createMap: function(id, seq) {
			var map = new sMap.map();
			map.dataPolygonFillOpacity = 0.8;
			this.curMapId = seq;
			map.createMap($houseAnalysisMap, id, {
				center: [989674, 1818313],
				zoom: 8,
				measureControl: false,
				statisticTileLayer: true
			});
			map.id = seq;
			map.addControlEvent("moveend");
			map.addControlEvent("zoomend");
			
			//범례 호출 함수 
			var legend = new sLegendInfo.legendInfo(map);
			legend.initLv = 5; 
			legend.defaultLegendColor = ["#953266","rgb(127,173,62)","rgb(25,126,191)","rgb(219,76,96)","rgb(222,170,0)","rgb(229,99,47)","rgb(126,56,116)","rgb(28,44,129)","#f6564a"];
			legend.initialize($houseAnalysisMap.ui);
			map.legend = legend;
			legend.createLegend();

			//버튼 생성
			var btnInfo = new interactiveMapBtnInfo.btnInfo(map);
			map.mapBtnInfo = btnInfo;
			var housePoi = new $houseAnalysisMap.btninfo.poi(map);
			map.mapHouseBtnInfo = housePoi;
			housePoi.initialize();
			btnInfo.createUI({
				intrPoiControl : false,
				bizSettingControl : true,
				mapTypeControl : true,
				bizZoomControl : true
			});	
			map.boundaryCallback = function(map,res){
				$houseAnalysisMap.callbackFunc.boundaryCallback(map,res);
			}
			//사용자지정컨트롤설정
			this.mapList[seq] = map;
			
			map.gMap.whenReady(function() {
				map.createHeatMap();
				map.mapMove([map.gMap.getCenter().x,map.gMap.getCenter().y],2);
			});
			
			//공유
			var shareInfo = new share.shareInfo(map, $houseAnalysisMap.ui);
			map.shareInfo = shareInfo;
		},
		/**
		 * @name         : doMaxSize
		 * @description  : 맵을 최대,최소화한다.
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		doMaxSize : function() {
			var ck = $(".tb_sizing").hasClass("on"); 
			if(!ck){
				this.doMax();
			}else{
				$(".tb_sizing").removeClass("on");
				$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png");
				$("header").css({"height":"104px", "width":"970px"}); 
				$(".headerEtc, .gnb, .headerContents form,.headerContents h1").show();
				$(".headerContents h1").css({"height":"78px"});
				$(".headerContents h1 img").css({"height":"45px", "margin":"18px 0 0 0"});
				$(".containerBox").css({"height":"calc(100% - 104px)", "top":"104px"});
			}
			
			for (var i=0; i<this.mapList.length; i++) {
				if (this.mapList[i] != null) {
					this.mapList[i].update();
				}
			}
		},
		/**
		 * @name         : doMax
		 * @description  : 맵을 최대화한다.
		 * @date         : 2015. 11. 21. 
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		doMax : function(){
			$(".tb_sizing").addClass("on");
			$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
			$("header").css({"height":"10px", "width":"100%"}); 
			$(".headerEtc, .gnb, .headerContents form,.headerContents h1").hide();
			$(".headerContents h1").css({"height":"10px"});
			$(".headerContents h1 img").css({"height":"26px", "margin":"0 0 0 10px"});
			$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
		},

		/**
		 * 
		 * @name           : doReset
		 * @description    : 초기화한다.
		 * @date           : 2015. 11. 21. 
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param callback : 콜백 함수
		 */
		doReset : function(callback) {
			this.doClearMap(function(){
				if($houseAnalysisMap.ui.doRemoveFlag){
					$houseAnalysisMap.databoard.databoardViewSetting();
					$(".interactiveBar>.helperText>span").empty();
					$(".interactiveBar>.helperText>a").hide();
					$(".interactiveDataBoard").addClass("disabled");
					$houseAnalysisMap.databoard.closeDataBoard();
					$houseAnalysisMap.search.init();
					$(".stepClose").click();
					$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].gMap.setMaxZoom(13);
				}
				if(typeof callback==="function"){
					callback();
				}
			});
		},
		/**
		 * @name         : $houseAnalysisMap.ui.hasText
		 * @description  : 문자열 유무
		 * @date         : 2015. 12. 01. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param str    : 텍스트
		 */
		hasText : function(str){
			if(str==null||str==undefined){
				return false;
			}else if(typeof str === "number"){
				return true;
			}else if(typeof str === "boolean"){
				return str;
			}else if(typeof str === "string"||$.isArray(str)){
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
		},
		/**
		 * @name         : $houseAnalysisMap.ui.getParameter
		 * @description  : 파라미터 추출 없으면 null
		 * @date         : 2016. 02. 20. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param name   : 파라미터 명
		 */
		getParameter :function(name) {
			search = location.search;
			if (search) {
				var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
				if (results==null){
					return null;
				}
				else{
					return results[1] || 0;
				}
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
				var admName = $("<div/>",{"class":"admName","style":"font-size:14px;font-weight:bold;color:#3792de;","text":data.properties.adm_nm});
				if (data.info.length > 0) {
					var filterNames = {
						"order":"",
						"order_no":"순위",
						"value":""
					};
					var tmpData = data.info[0];
					var dataNameText = tmpData.data_nm;
					if($houseAnalysisMap.ui.indicatorStatMap){
						if(tmpData.m_class_idx_id=="HMM0023"){
							dataNameText = "보육시설 대비 5세이하 인구 수";
						}else if(tmpData.m_class_idx_id=="HMM0024"){
							dataNameText = "병의원 및 약국 대비 인구 수";
						}else if(tmpData.m_class_idx_id=="HMM0025"){
							dataNameText = "노인복지시설 대비 65세 이상 인구 수";
						}else if(tmpData.m_class_idx_id=="HMM0026"){
							dataNameText = "사회복지시설 대비 인구 수";
						}
					}
					var dataName = $("<span/>",{"class":"statsData","style":"font-size:12px;padding-left:5px;","text":dataNameText});
					var filterName = filterNames[tmpData.showData];
					if(filterName){
						dataName.text(dataName.text()+(filterName?" "+filterName:""));
					}
					var dataBox = $("<div/>");
					if(tmpData.showData&&tmpData.showData.length>0){
						var value;
						if(tmpData.showData == "order"){
							if(value == 0){
								value = "N/A";
							}else if(value == 1){
								value = "중요도 하";
							}else if(value == 2){
								value = "중요도 중";
							}else if(value == 3){
								value = "중요도 상"
							}
						}else{
							if($.isNumeric(tmpData[tmpData.showData])){
								var number = parseFloat(tmpData[tmpData.showData]);
								if(tmpData.isHouseMap===true){
									var pointIndexOf = number.toString().indexOf(".");
									if(pointIndexOf > -1&&number.toString().substring(pointIndexOf+1).length>=2){
										number = number.toFixed(2);
									}
								}
								value = appendCommaToNumber(number);
							}else{
								value = tmpData[tmpData.showData];
							}
						}
						if(tmpData.isHouseMap===false){
							if(parseFloat(tmpData[tmpData.showData]) < 5 && 
									tmpData.showData != "avg_age" &&
									tmpData.showData != "ppltn_dnsty" &&
									tmpData.showData != "aged_child_idx" && 
									tmpData.showData != "oldage_suprt_per" &&
									tmpData.showData != "juv_suprt_per" && 
									tmpData.showData != "tot_suprt_per" &&
									tmpData.showData != "tot_worker" &&
									tmpData.showData != "avg_fmember_cnt" &&
									tmpData.showData != "employee_cnt"){
								value = "N/A";
							}
						}
						dataName.text(dataName.text()+" : "+value+(value!="N/A"&&tmpData.unit?"("+tmpData.unit+")":""));
					}
					if(data.properties.adm_cd.length>7){
						var addAdmCd = $("<span/>",{"class":"statsData","style":"font-size:12px;padding-left:5px;","text":"집계구 : "+data.properties.adm_cd});
						tooltipBox.append(admName,dataBox.append(addAdmCd,"<br>",dataName));
					}else{
						tooltipBox.append(admName,dataBox.append(dataName));
					}
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
				if($houseAnalysisMap.ui.recommendDataGeojson){
					if($houseAnalysisMap.ui.doRemoveFlag){
						$houseAnalysisMap.ui.recommendDataGeojson.remove();
					}	
				}
				if($houseAnalysisMap.ui.recommendMarker){
					$houseAnalysisMap.ui.recommendMarker.remove();
				}
				$houseAnalysisMap.ui.removeAsanHouseMarker();
				map.clearDataOverlay();
				map.mapBtnInfo.clearPOI();
				map.mapHouseBtnInfo.clearPOI();
			} 
			if(typeof callback === "function"){
				callback();
			}
		},
		/**
		 * @name                 : setLastGeoJsonInfo
		 * @description          : 
		 * @date                 : 2015. 12. 25.
		 * @author	             : 나광흠
		 * @history 	         : 
		 * @param result         : 경계 조회한 result
		 * @param map            : 지도 객체
		 * @param adm_cd         : 행정동 코드
		 * @param year           : 년도
		 * @param curPolygonCode : 폴리곤 코드
		 */
		setLastGeoJsonInfo : function(result,map,adm_cd,year,curPolygonCode){
			var tempPolygonCode = map.curPolygonCode;
			if(!$houseAnalysisMap.ui.hasText(adm_cd)){
				adm_cd = "00";
			}
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
			map.curPolygonCode = tempPolygonCode;
			setTimeout(function(){
				if(map.geojson){
					map.geojson.remove();
				}
			});
		},
		/**
		 * @name          : addAsanHouseMarker
		 * @description   : 아산시 고유정보 전원주택 포인트 추가
		 * @date          : 2016. 02. 04.
		 * @author        : 나광흠
		 * @history       :
		 * @param data    : 포인트
		 */
		addAsanHouseMarker : function(data){
			var map = this.mapList[this.curMapId];
			this.removeAsanHouseMarker();
			this.pastoralHouseMarkers = sop.markerClusterGroup({
				animateAddingMarkers : true
			});
			$.each(data.result,function(cnt,node){
			    var marker = sop.marker([node.x,node.y],{
			    	icon : sop.icon({
						iconUrl: contextPath+"/img/house/marker-icon-red.png",
						iconSize: [25, 40]
					})
			    });
				marker.addTo($houseAnalysisMap.ui.pastoralHouseMarkers);
			});
			map.gMap.addLayer(this.pastoralHouseMarkers);
		},
		/**
		 * @name          : removeAsanHouseMarker
		 * @description   : 아산시 고유정보 전원주택 포인트 삭제
		 * @date          : 2016. 02. 04.
		 * @author        : 나광흠
		 * @history       :
		 */
		removeAsanHouseMarker : function(){
			var map = this.mapList[this.curMapId];
			if($houseAnalysisMap.ui.pastoralHouseMarkers!=null){
				$houseAnalysisMap.ui.pastoralHouseMarkers.removeFrom(map.gMap);
			}
			$("#pastoralHouse").removeClass("on");
			$houseAnalysisMap.ui.pastoralHouseMarkers = null;
		},
		/**
		 * @name		  : getUniqName
		 * @description   : 원하는 엘리먼트 타입 갖고오기
		 * @date		  : 2016. 12. 05. 
		 * @author		  : 나광흠
		 * @history 	  :
		 * @param element : jquery selector
		 * @param getType : html attribute name
		 */
		getUniqName : function(element,getType){
			var names = element.map(function() {
				if(/^data-/.test(getType)){
					return $(this).data(getType.replace("data-",""));
				}else{
					return $(this).attr(getType);
				}
			}).get();
			var unique = $.grep(names, function(v, i) {
			    return $.inArray(v, names) === i
			});
			return unique;
		},
		/**
		 * @name         : reportDataSet
		 * @description  : 보고서 데이터 세팅
		 * @date         : 2017. 01. 31. 
		 * @author	     : 나광흠
		 */
		reportDataSet : function(){
			if($houseAnalysisMap.search.isAbode===false){
				$houseAnalysisMap.ui.reportPopup = window.open(contextPath+"/js/house/report/houseAnalysis.report.html", "reportPrint","width=850, height=700, scrollbars=yes");
			}else{
				messageAlert.open("알림", "추천지역 찾기 또는 간편 동네 찾기를 해주세요");
			}
		},
		
		/**
		 * 
		 * @name         : doShare
		 * @description  : 공유를 수행한다.
		 * @date         : 
		 * @author	     : 
		 * @history 	 :
		 */
		doShare : function(type) {
			this.curMapId = parseInt(type)-1;
			var shareInfo = this.mapList[this.curMapId].shareInfo;
			var map = this.mapList[this.curMapId];
			if(shareInfo == null) {
				messageAlert.open("알림", "공유할 수 없는 데이터입니다.");
			} else {
				if (shareInfo.checkShare("SHARE")) {
					var shareData = shareInfo.shareUrlInfo;
					
					var title = "";
					for (var i=0; i<shareData.length; i++) {
						title = $.trim(shareData[i].title);
						
						//2016.10.25 lbdms 캡쳐를 위한 정보 수정
						if (shareData[i].params != undefined) {
							if (shareData[i].params.mapInfo != undefined) {
								shareData[i].params.mapInfo.center = map.center;
								shareData[i].params.mapInfo.zoomlevel = map.zoom;
							}
						}
					}	
					
					shareInfo.doShare(title, "BMAP");
				}
			}
			
		},
		
		/**
		 * 
		 * @name         : doBookMark
		 * @description  : 북마크를 수행한다.
		 * @date         : 
		 * @author	     : 
		 * @history 	 :
		 */
//		//mng_s 20171010_주용민	
		doBookMark : function(type, srvType) {
			this.curMapId = parseInt(type)-1;
			var shareInfo = this.mapList[this.curMapId].shareInfo;
			var map = this.mapList[this.curMapId];
			
			if(shareInfo == null) {
				messageAlert.open("알림", "저장할 수 없는 데이터입니다.");
			} else {
				if (shareInfo.checkShare("BMARK", srvType)) {
					var shareData = shareInfo.shareUrlInfo;
					var title = "";
					for (var i=0; i<shareData.length; i++) {
						title += $.trim(shareData[i].title);
						if (shareData.length > 1 && i==0) {
							title += " | ";
						}
						
						var captureTargetId = "#mapRgn_"+type;
						
						if (shareData[i].params != undefined) {
							if (shareData[i].params.mapInfo != undefined) {
								shareData[i].params.mapInfo.center = map.center;
								shareData[i].params.mapInfo.zoomlevel = map.zoom;
							}
							shareData[i].params["mapCaptureId"] = captureTargetId;
						}
						
						//나의 데이터인 경우
//						if (shareData[i].params.type == "userData") {
//							var value = "";
//							for (var k=1; k<=4; k++) {
//								$("#dbTypeCk0"+k).each(function() {
//									if ($(this).is(":checked")) {
//										value = $(this).val();
//									}
//								});
//							}
//							shareData[i].params.paramInfo["type"] = value;
//						}
							
						
					}
					
					//갤러리 등록일 경우
//					if (srvType != undefined && srvType != "HMAP") {
//						switch (srvType) {
//							case "gallary":
//								var captureTargetId = "#mapRgn_"+type;
//								$galleryAdd.map = map;
//								$galleryAdd.makeImageURL("IMAP", captureTargetId);
//								break;
//							case "report":
//								this.reportPopup.$reportFormEvent.UI.makeImageURL("IMAP");
//								break;
//						}
//						return;
//					} 
					
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
		 * @date         : 2017. 08. 31. 
		 * @author	     :
		 * @history 	 :
		 * @param
		 */
		doDone : function(type) {
			
			var map = this.mapList[this.curMapId];
			if (type == "settings") {
				if ($("#bndYear").val() != map.bnd_year) {
					map.bnd_year = $("#bndYear").val();
					map.openApiReverseGeoCode(map.center);
				}	
				map.bnd_year = $("#bndYear").val();
			}
			else if (type == "sharedlg") {
				copyToClipboard($("#sharedlg").find($("input")).val());
			}else if (type == "bookmarkdlg") {
				map.shareInfo.doBookMark($("#savesubj").val(), "HMAP");
			}
			else if (type == "uploadFile") {
				$("#fileSearch").val("");
				$("#filePathField").val("");
			}
			
			if (type != "sharePeriodSetting") {
				$(".deem").hide();
			}
			$("#"+type).hide();
			
		},
		
		/**
		 * 
		 * @name         : doCancel
		 * @description  : 경계정보 설정을 취소한다.
		 * @date         : 2017. 08. 31. 
		 * @author	     : 
		 * @history 	 :
		 * @param
		 */
		doCancel : function(type) {
			if (type == "settings") {
				$("#bndYear").val(this.mapList[this.curMapId].bnd_year);
			}else if (type == "uploadFile") {
				$("#fileSearch").val("");
				$("#filePathField").val("");
			}
			
			if (type != "sharePeriodSetting") {
				$(".deem").hide();
			}
			$("#"+type).hide();
			
		},
		
		/**
		 * 
		 * @name         : doAnalysisShareInfo
		 * @description  : 공유된 정보를 분석하여, 통계정보를 조회한다.
		 * @date         : 
		 * @author	     : 
		 * @history 	 :
		 */
		doAnalysisShareInfo : function (type, data) {
			var dataArr = JSON.parse(data.param_info);
			var paramInfoArr = dataArr.paramInfo;
			var legendArr = dataArr.legend;
			var centerArr = dataArr.mapInfo.center;
			var zoomlevel = dataArr.mapInfo.zoomlevel;
			var map = this.mapList[0];
			
			$("#houseAnalysis_webtoon_laypopup").hide();
			//mng_s 20180205 주용민
			if (dataArr != undefined) {
				switch (dataArr.type) {
				case 0 :
					var now_sidoCd = paramInfoArr.now_resid_sido_cd;
					var now_sggCd = paramInfoArr.now_resid_sgg_cd;
					var inter_sidoCd = paramInfoArr.inter_resid_sido_cd;
					var inter_sggCd = paramInfoArr.inter_resid_sgg_cd;
					var life_index = paramInfoArr.life_index;
					var importance_cd = paramInfoArr.importance_cd.split(',');			//중분류코드
					var importance_val = paramInfoArr.importance_val.split(',');			//기준지역 가중치
					var importance_asis_val = paramInfoArr.importance_asis_val.split(',');	//관심지역 가중치
					var importance_search_val = paramInfoArr.importance_search_val.split(',');	//정렬기준 좋음,높음,많음:3, 나쁨,낮음,적음:1
					var importance_disp_lev = paramInfoArr.importance_disp_lev.split(',');	//지도레벨 시도:1,시군구2,읍면동3

					$houseAnalysisMap.leftmenu.getSidoList("stand-recommend","00","999",function(){
						$("#stand-recommend-sido-select").val(now_sidoCd).attr("selected","selected");
						$houseAnalysisMap.leftmenu.getSggList("stand-recommend",now_sidoCd,"999",function(){
							$("#stand-recommend-sgg-select").val(now_sggCd).attr("selected","selected");
						$houseAnalysisMap.leftmenu.getSidoList("inter-recommend","00","999",function(){
								$("#inter-recommend-sido-select").val(inter_sidoCd).attr("selected","selected");
							$houseAnalysisMap.leftmenu.getSggList("inter-recommend",inter_sidoCd,"999",function(){
								$("#inter-recommend-sgg-select").val(inter_sggCd).attr("selected","selected");
								if(life_index > -1){
									$(".LifeStyleGuide").addClass("open");
									$houseAnalysisMap.search.isLimitMax = false;
									var aTag = $("#LifeStyleSelect>li:eq(" + life_index +")>a");
									$("#recommend-search-list-delete").trigger("click",function(){
										$("#LifeStyleSelect>li").removeClass("M_on");
										aTag.parent().addClass("M_on");
										var items = aTag.data("items");
										var allLi = "#search-recommend-box .HouseMap .IndexSelect li[class^=index]";
										$.each(items,function(cnt,node){
											if(cnt==0){
												$(allLi+">a[data-id="+node.b_class_idx_id+"]").trigger("click");
											}
											$(allLi+">ul>li>a[data-id="+node.m_class_idx_id+"]").trigger("click",false);
											$(allLi+">ul>li>a[data-id="+node.m_class_idx_id+"]").parent().find(".SetStepBar1>span").trigger("click",parseInt(node.wghtval)*200);
											$(allLi+">ul>li>span:"+(node.order_base_disp=='2'&&node.default_value=='0'?'first':'last')).trigger("click");
										});
										$houseAnalysisMap.search.recommend.search();
//										return false;
										});
									}else{
										var tempOrderText, tempSearchST;
										for(var i=0; i<importance_cd.length; i++ ){
											$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").addClass("M_on");
											$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").removeClass("UnSelect");
											$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').attr("data-level",importance_disp_lev[i]);
											$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').attr("data-asis-order",importance_asis_val[i]);
											for(var j=0; j<$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStart>button").length; j++){
												$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStart>button:eq("+j+")").attr("value",importance_search_val[i]);
												$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStart>button").removeClass("M_on");
												$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStart>button:eq("+j+")").addClass("M_on");
												if($('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStart>button:eq("+j+")").hasClass("M_on")){
													tempOrderText = $('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStart>button:eq("+j+")").text();
													tempSearchST = $('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStart>button:eq("+j+")").val();
												}
											}
											var pointElement = parseInt($('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStopPoint")[0].style.left.replace("%",""));
											var asisVal = parseInt($('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').attr("data-asis-order"));
											var pointVal;
											if(asisVal == 1){
												pointVal = pointElement - 50; 
											}else if(asisVal == 2){
												pointVal = pointElement;
											}else if(asisVal == 3){
												pointVal = pointElement + 50;
											}
											$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents(".sub-class").find(".SetStopPoint:eq(0)").css({"left":pointVal+"%","opacity":"1"});
											var typeText="중",typeOrder="2";
											if(pointVal<50){
												typeText="하";
												typeOrder="1";
											}else if(pointVal>50){
												typeText="상";
												typeOrder="3";
											}
											$("#recommend-search-list").append(
													$("<li/>",{
														"data-parent-id":$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').parents().parents().children("a").data("id"),
														"data-id":$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').data("id"),
														"data-order":typeOrder, 
														"data-search-st":tempSearchST, 
														"data-asis-order":typeOrder,//관심지 가중치 변경시 기준지 가중치도 같이 변경토록 변경
														"data-disp-level":$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').attr("data-level"), 
														"class":$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').data("parent-id")
													}).append(
														$("<span/>",{"class":"bagic","text":tempOrderText}),
														$("<span/>",{"class":"step","text":typeText}),
														$('.SetStep>li>ul>li>a[data-id='+importance_cd[i]+']').text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
														$("<a/>",{href:"#","class":"indexdelete","html":'<img src="/img/house/set_delete.png" alt="설정된 지표 항목 삭제">'})
													)
												);
										}
										var array = new Array();
										for(var i=1; i<=$(".SetStep>li").length; i++){
											if($(".SetStep>li.index" + i + "").hasClass("M_on")){
												array.push(i);
											}
										}
										var temp = array[0];
										for(var i= 0; i<array.length; i++){
											if(temp >= array[i] ){
												temp = array[i];
											}else{
												$(".SetStep>li.index" + array[i] + "").removeClass("M_on");
											}
										}
										$(".SetStep>li.index" + temp + "").addClass("M_on");
										$houseAnalysisMap.search.recommend.search();
									}
									setTimeout(function() {
										if(paramInfoArr.databoardChk == 0){
											$("#indicator-navigator a[data-m-class="+paramInfoArr.m_class_idx_id+"]").trigger("click");
											for (var i=0; i<$("#detailChart1 .highcharts-axis-labels>span>span,#detailChart2 .highcharts-axis-labels>span>span").length; i++){
												if($("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").data("id")==paramInfoArr.b_class_idx_id){
													$("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").addClass("spider_on Spider_"+paramInfoArr.b_class_idx_id);
												}else{
													$("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").addClass("Spider_default");
												}
												if($("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").data("id")==paramInfoArr.b_class_idx_id){
													$("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").addClass("spider_on Spider_"+paramInfoArr.b_class_idx_id);
												}else{
													$("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").addClass("Spider_default");
												}
											}
										}
										if(paramInfoArr.databoardChk == 1){
											var type;
											if(paramInfoArr.radioIndex == 0){
												type = "age";
											}else if(paramInfoArr.radioIndex == 1){
												type = "house";													
											}else if(paramInfoArr.radioIndex == 2){
												type = "company";													
											}
											$houseAnalysisMap.chart.smallLocationChartBridge(type);
											$(".ThisAreaInfo>ul>li").removeClass("M_on");
											$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+")").addClass("M_on");
											var firstRadio = $(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq(0)>input:radio");
											firstRadio.prop("checked",true);
											firstRadio.trigger("change");
											$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label>input").prop("checked",false);
											$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq("+paramInfoArr.radioSubIndex+")>input").prop("checked",true);
											$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq("+paramInfoArr.radioSubIndex+")>input").trigger("change");
										}
										var interList_admCd, interList_coorX, interList_coorY;
										if(interList_admCd == undefined){
											$("#interestList>div:eq(0)>a:eq(0)").trigger("click");
											interList_admCd = $("#interestList>div:eq(0)>a:eq(0)").data("adm-cd");
										}
										map.mapMove([centerArr[0],centerArr[1]], zoomlevel);
										setTimeout(function(){
											if(paramInfoArr.layer_chk == 2 && paramInfoArr.layer_chk != undefined){
											$houseAnalysisMap.ui.doClearMap(function(){
												$houseAnalysisMap.search.getRecommendObject().init();
												$houseAnalysisMap.ui.recommendDataGeojson.addTo(map.gMap);
												for(var i=0; i<$("#interestList>div").length; i++){
													if($("#interestList>div:eq("+i+")>a:eq(0)").data("adm-cd") == paramInfoArr.map_adm_cd &&
															$("#interestList>div:eq("+i+")>a:eq(0)").data("coor-x") == paramInfoArr.map_coor_x &&
															$("#interestList>div:eq("+i+")>a:eq(0)").data("coor-y") == paramInfoArr.map_coor_y){
														$("#interestList>div:eq("+i+")>a:eq(0)").trigger("click");
														map.mapMove([centerArr[0],centerArr[1]], zoomlevel);
														interList_admCd = $("#interestList>div:eq("+i+")>a:eq(0)").data("adm-cd");
														break;
													}
												}
											});
										}else if(paramInfoArr.layer_chk == 1 && paramInfoArr.layer_chk != undefined){
											map.mapMove([centerArr[0],centerArr[1]], zoomlevel);
											if($houseAnalysisMap.search.isAbode==false){
												if($houseAnalysisMap.ui.recommendMarker){
													$houseAnalysisMap.ui.recommendMarker.remove();
												}
												$houseAnalysisMap.ui.recommendMarker = sop.marker([centerArr[0],centerArr[1]],{adm_cd:interList_admCd});
												$houseAnalysisMap.ui.recommendMarker.addTo(map.gMap);
											}
											if($houseAnalysisMap.search.isIdealType===true){
												var classCode = getIdealTypeClassCode();
												$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = classCode.b_class_idx_id;
												$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = classCode.m_class_idx_id;
												$houseAnalysisMap.search.mapStat.indicator.adm_cd = interList_admCd;
											}else{
												var firstClass = getFirstClass();
												$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = firstClass.data("parent-id");
												$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = firstClass.data("id");
												$houseAnalysisMap.search.mapStat.indicator.adm_cd = interList_admCd;
											}
											$houseAnalysisMap.search.mapStat.indicator.search();
											}
										},2000);
									},2000);
								});
							});
						});
					});
					break;
				case 1 :
					var sidoCd = paramInfoArr.adm_cd.substring(0,2);
					var sggCd = paramInfoArr.adm_cd.substring(2,5);
					if(sggCd == ""){
						sggCd = "999";
					}
					var bclass = paramInfoArr.b_class_idx_id;
					var mclass = paramInfoArr.m_class_idx_id;
					var chkbox_chk= paramInfoArr.chkbox_chk;
					$houseAnalysisMap.leftmenu.getSidoList("current","00","999",function(){
						$("#current-sido-select").val(sidoCd).attr("selected","selected");
						$houseAnalysisMap.leftmenu.getSggList("current",sidoCd,"",function(){
							$("#current-sgg-select").val(sggCd).attr("selected","selected");
							
							$("#quick-box-sub-title").text($("#look-abode").data("title"));
							$(".stepClose").data("id",$("#look-abode").attr("id"));
							$(".menu-box").hide();
							$("#look-abode-box").show();
							$(".sideQuick").removeClass("on");
							$(".quickBox").css('width','345px');
							$(".scrollBox").css('width','345px');
							$(".scrollBox .mCSB_container").css('width','345px');
							$(".IndexSelect ul").css('left','50%');
							$(".IndexSelect ul").css('width','150px');
							$(".quickBox").stop().animate({"left":"0"},200);
							$("#look-abode").addClass("on");
							
							$("#look-select>li").removeClass("M_on");
							$('#look-select>li>a[data-id='+bclass+']').parents("li").addClass("M_on");
							$("#look-select>li>ul>li").removeClass("M_on");
							$('#look-select>li>ul>li>a[data-id='+mclass+']').parents("li").addClass("M_on");

							if(chkbox_chk == 1){
								$("#look-select-location").attr("checked","checkd");
								$("#look-select-type").attr("checked","checkd");
							}else if(chkbox_chk == 2){
								$("#look-select-location").attr("checked","checkd");
								$("#look-select-type").removeAttr("checked","checkd");
								$("#look-select>li").removeClass("M_on");
								$('#look-select>li>a[data-id=HML0001]').parents("li").addClass("M_on");
								$("#look-select>li>ul>li").removeClass("M_on");
								$('#look-select>li>ul>li>a[data-id=HMM0003]').parents("li").addClass("M_on");
								$("#look-select").addClass("UnSelect");
							}else if(chkbox_chk == 3){
								$("#look-select-location").removeAttr("checked","checkd");
								$("#current-location-select select").prop("disabled",true);
								$("#current-location-select").css("opacity","0.5");
								$("#look-select-type").attr("checked","checkd");
							}
							
							$houseAnalysisMap.search.abode.search();
							setTimeout(function() {
								if(paramInfoArr.databoardChk == 0){
									$("#indicator-navigator a[data-m-class="+paramInfoArr.m_class_idx_id+"]").trigger("click");
									for (var i=0; i<$("#detailChart1 .highcharts-axis-labels>span>span,#detailChart2 .highcharts-axis-labels>span>span").length; i++){
										if($("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").data("id")==paramInfoArr.b_class_idx_id){
											$("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").addClass("spider_on Spider_"+paramInfoArr.b_class_idx_id);
										}else{
											$("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").addClass("Spider_default");
										}
										if($("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").data("id")==paramInfoArr.b_class_idx_id){
											$("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").addClass("spider_on Spider_"+paramInfoArr.b_class_idx_id);
										}else{
											$("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").addClass("Spider_default");
										}
									}
								}
								if(paramInfoArr.databoardChk == 1){
									var type;
									if(paramInfoArr.radioIndex == 0){
										type = "age";
									}else if(paramInfoArr.radioIndex == 1){
										type = "house";													
									}else if(paramInfoArr.radioIndex == 2){
										type = "company";													
									}
									$houseAnalysisMap.chart.smallLocationChartBridge(type);
									$(".ThisAreaInfo>ul>li").removeClass("M_on");
									$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+")").addClass("M_on");
									var firstRadio = $(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq(0)>input:radio");
									firstRadio.prop("checked",true);
									firstRadio.trigger("change");
										$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label>input").prop("checked",false);
										$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq("+paramInfoArr.radioSubIndex+")>input").prop("checked",true);
										$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq("+paramInfoArr.radioSubIndex+")>input").trigger("change");
								}
								map.mapMove([centerArr[0],centerArr[1]], zoomlevel);
								if(paramInfoArr.b_class_idx_id == null && paramInfoArr.m_class_idx_id == null){
									if($houseAnalysisMap.search.mapStat.census.parameters.adm_cd!="00"){
										$houseAnalysisMap.search.mapStat.census.parameters.adm_cd = paramInfoArr.adm_cd;
									}
									$houseAnalysisMap.search.mapStat.census.search();									
								}else{
									$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = paramInfoArr.b_class_idx_id;
									$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = paramInfoArr.m_class_idx_id;
									$houseAnalysisMap.search.mapStat.indicator.adm_cd = paramInfoArr.adm_cd;
									$houseAnalysisMap.search.mapStat.indicator.search();									
								}
							},2000);
						});
					});
					break;
				case 2 :
					$("a[data-type=1]").children("span").css("background-image","url(/img/house/liketown_icon1_1.png)");
					$("a[data-type=3]").children("span").css("background-image","url(/img/house/liketown_icon1_2.png)");
					$("a[data-name=liketown_1").removeClass("M_on");
					$("label[data-name=liketown_2").removeClass("on");
					$("a[data-name=liketown_3").removeClass("M_on");
					$("label[data-name=liketown_5").removeClass("on");
					
					$("a[data-id="+paramInfoArr.liketown_1+"]").addClass("M_on");
					$("a[data-id="+paramInfoArr.liketown_1+"]").children("span").css("background-image","url("+contextPath+"/img/house/liketown_icon"+$("a[data-id="+paramInfoArr.liketown_1+"]").data("parent-id")+"_"+$("a[data-id="+paramInfoArr.liketown_1+"]").data("id")+"_f.png)");
					$("label[for="+paramInfoArr.liketown_2+"]").addClass("on");
					$("a[data-id="+paramInfoArr.liketown_3+"]").addClass("M_on");
					$("a[data-id="+paramInfoArr.liketown_3+"]").children("span").css("background-image","url("+contextPath+"/img/house/liketown_icon"+$("a[data-id="+paramInfoArr.liketown_3+"]").data("parent-id")+"_"+$("a[data-id="+paramInfoArr.liketown_3+"]").data("id")+"_f.png)");
					$("label[for="+paramInfoArr.liketown_5+"]").addClass("on");
					
					$houseAnalysisMap.search.idealType.init();
					$houseAnalysisMap.search.idealType.initSearchOptions();
					$houseAnalysisMap.ui.recommendDataGeojson = null;
					$houseAnalysisMap.ui.recommendMarker = null;
						
					var b_serial = paramInfoArr.b_serial;
					var m_serial = paramInfoArr.m_serial;
					var s_serial = paramInfoArr.s_serial;

					var indicatorList = $("<ul/>",{"class":"indexfine"});
					for(var i=0; i<b_serial.length; i++){
						if($houseAnalysisMap.ui.hasText(b_serial[i])&&$houseAnalysisMap.ui.hasText(m_serial[i])&&$houseAnalysisMap.ui.hasText(s_serial[i])){
							var ideal = idealTypeInfoList[b_serial[i]].children[m_serial[i]].children[s_serial[i]];
							var mClassInfo = bClassInfoList[ideal.b_class_idx_id].indicator[ideal.m_class_idx_id];
							indicatorList.append($("<li/>",{"class":mClassInfo.b_class_idx_id,"style":"height:auto;padding:6px;","text":mClassInfo.m_class_idx_nm}));
							if($houseAnalysisMap.ui.hasText(ideal)){
								var wghtval = $("#ideal-type-dropzone>div").length-i;
								$houseAnalysisMap.search.idealType.importance_cd.push(ideal.m_class_idx_id);
								$houseAnalysisMap.search.idealType.importance_val.push(wghtval);
								$houseAnalysisMap.search.idealType.importance_asis_val.push(wghtval);
								$houseAnalysisMap.search.idealType.importance_search_val.push(ideal.order_base);
								$houseAnalysisMap.search.idealType.importance_disp_lev.push(mClassInfo.disp_level);
							}
						}
					}
					$houseAnalysisMap.search.idealType.now_resid_sido_cd = "00";
					$houseAnalysisMap.search.idealType.now_resid_sgg_cd = "999";
					$("#ideal-type-sido-select").val(paramInfoArr.inter_resid_sido_cd).attr("selected","selected");
					$("#ideal-type-sgg-select").val(paramInfoArr.inter_resid_sgg_cd).attr("selected","selected");
					$houseAnalysisMap.search.idealType.inter_resid_sido_cd = paramInfoArr.inter_resid_sido_cd;
					$houseAnalysisMap.search.idealType.inter_resid_sgg_cd = paramInfoArr.inter_resid_sgg_cd;
					$houseAnalysisMap.search.idealType.inter_name = $("#ideal-type-sido-select").val(paramInfoArr.inter_resid_sido_cd).text();
					if($houseAnalysisMap.search.idealType.inter_resid_sido_cd!="00"){
						$houseAnalysisMap.search.idealType.inter_name += " "+$("#ideal-type-sgg-select").val(paramInfoArr.inter_resid_sgg_cd).text();
					}
					$houseAnalysisMap.search.recommend.recommendSearch(function(){
						$(".dataBoardDiv>.dscList dd:first").empty().append(indicatorList);
					});
					$("#ideal-type-close-button").trigger("click");
					setTimeout(function() {
						if(paramInfoArr.databoardChk == 0){
							$("#indicator-navigator a[data-m-class="+paramInfoArr.m_class_idx_id+"]").trigger("click");
							for (var i=0; i<$("#detailChart1 .highcharts-axis-labels>span>span,#detailChart2 .highcharts-axis-labels>span>span").length; i++){
								if($("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").data("id")==paramInfoArr.b_class_idx_id){
									$("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").addClass("spider_on Spider_"+paramInfoArr.b_class_idx_id);
								}else{
									$("#detailChart1 .highcharts-axis-labels>span>span:eq("+i+")").addClass("Spider_default");
								}
								if($("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").data("id")==paramInfoArr.b_class_idx_id){
									$("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").addClass("spider_on Spider_"+paramInfoArr.b_class_idx_id);
								}else{
									$("#detailChart2 .highcharts-axis-labels>span>span:eq("+i+")").addClass("Spider_default");
								}
							}
						}
						if(paramInfoArr.databoardChk == 1){
							var type;
							if(paramInfoArr.radioIndex == 0){
								type = "age";
							}else if(paramInfoArr.radioIndex == 1){
								type = "house";													
							}else if(paramInfoArr.radioIndex == 2){
								type = "company";													
							}
							$houseAnalysisMap.chart.smallLocationChartBridge(type);
							$(".ThisAreaInfo>ul>li").removeClass("M_on");
							$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+")").addClass("M_on");
							var firstRadio = $(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq(0)>input:radio");
							firstRadio.prop("checked",true);
							firstRadio.trigger("change");
							$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label>input").prop("checked",false);
							$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq("+paramInfoArr.radioSubIndex+")>input").prop("checked",true);
							$(".ThisAreaInfo>ul>li:eq("+paramInfoArr.radioIndex+") .radio>label:eq("+paramInfoArr.radioSubIndex+")>input").trigger("change");
						}
						var interList_admCd, interList_coorX, interList_coorY;
						if(interList_admCd == undefined){
							$("#interestList>div:eq(0)>a:eq(0)").trigger("click");
							interList_admCd = $("#interestList>div:eq(0)>a:eq(0)").data("adm-cd");
						}
						map.mapMove([centerArr[0],centerArr[1]], zoomlevel);
						setTimeout(function(){
							if(paramInfoArr.layer_chk == 2 && paramInfoArr.layer_chk != undefined){
							$houseAnalysisMap.ui.doClearMap(function(){
								$houseAnalysisMap.search.getRecommendObject().init();
								$houseAnalysisMap.ui.recommendDataGeojson.addTo(map.gMap);
								for(var i=0; i<$("#interestList>div").length; i++){
									if($("#interestList>div:eq("+i+")>a:eq(0)").data("adm-cd") == paramInfoArr.map_adm_cd &&
											$("#interestList>div:eq("+i+")>a:eq(0)").data("coor-x") == paramInfoArr.map_coor_x &&
											$("#interestList>div:eq("+i+")>a:eq(0)").data("coor-y") == paramInfoArr.map_coor_y){
										$("#interestList>div:eq("+i+")>a:eq(0)").trigger("click");
										map.mapMove([centerArr[0],centerArr[1]], zoomlevel);
										interList_admCd = $("#interestList>div:eq("+i+")>a:eq(0)").data("adm-cd");
										break;
									}
								}
							});
						}else if(paramInfoArr.layer_chk == 1 && paramInfoArr.layer_chk != undefined){
							map.mapMove([centerArr[0],centerArr[1]], zoomlevel);
							if($houseAnalysisMap.search.isAbode==false){
								if($houseAnalysisMap.ui.recommendMarker){
									$houseAnalysisMap.ui.recommendMarker.remove();
								}
								$houseAnalysisMap.ui.recommendMarker = sop.marker([centerArr[0],centerArr[1]],{adm_cd:interList_admCd});
								$houseAnalysisMap.ui.recommendMarker.addTo(map.gMap);
							}
							if($houseAnalysisMap.search.isIdealType===true){
								var classCode = getIdealTypeClassCode();
								$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = classCode.b_class_idx_id;
								$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = classCode.m_class_idx_id;
								$houseAnalysisMap.search.mapStat.indicator.adm_cd = interList_admCd;
							}else{
								var firstClass = getFirstClass();
								$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = firstClass.data("parent-id");
								$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = firstClass.data("id");
								$houseAnalysisMap.search.mapStat.indicator.adm_cd = interList_admCd;
							}
							$houseAnalysisMap.search.mapStat.indicator.search();
							}
						},2000);
					},2000);
					//mng_e 20180205 주용민
					break;
				}
			}
		}   //end of doAnalysisShareInfo()
		
//		//mng_e 20171010_주용민	
	};
	
	/**
	 * @name        : getFirstClass
	 * @description : 추천지역 찾기 할때 처음 셋팅 해줘야할 지표 리턴 
	 * @date        : 
	 * @author	    : 
	 * @history 	:
	 */
	function getFirstClass(){
		var maxLevel;
		$.each($(".dataBoardDiv>.dscList dd:eq(0)>ul>li"),function(cnt,node){
			if(cnt>0){
				maxLevel = Math.max(maxLevel,parseInt($(node).data("disp-level")));
			}else{
				maxLevel = parseInt($(node).data("disp-level"));
			}
		});
		return $(".dataBoardDiv>.dscList dd:eq(0)>ul>li[data-disp-level="+maxLevel+"]:first");
	}
	
	/**
	 * @name         : getIdealTypeClassCode
	 * @description  : 간편 동네찾기 지표 얻기
	 * @date         : 
	 * @author	     : 
	 * @history 	 :
	 */
	function getIdealTypeClassCode(){
		var bClass,mClass;
		$.each($houseAnalysisMap.search.idealType.importance_cd,function(cnt,node){
			if($("#search-recommend-box a[data-id="+node+"]").length>0){
				bClass = $("#search-recommend-box a[data-id="+node+"]").data("parent-id");
				mClass = node;
				return false;
			}
		});
		if(!$houseAnalysisMap.ui.hasText(bClass)||!$houseAnalysisMap.ui.hasText(mClass)){
			bClass = "HML0001";//자연
			mClass = "HMM0003";//녹지비율	
		}
		return {
			"b_class_idx_id" : bClass,
			"m_class_idx_id" : mClass
		};
	}
	
}(window, document));