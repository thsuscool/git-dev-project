(function(W, D) {
	W.$localMap = W.$localMap || {};
	var doit,timeoutId,titleActionDoit;
	$(window).resize(function() {
		clearTimeout(doit);
		doit = setTimeout(function(){
			$localMap.ui.mapResize(false);
		}, 500);
	}).scroll(function(){
		if(timeoutId ){
			clearTimeout(timeoutId );  
		}
		timeoutId = setTimeout(function(){
			var path = "/mobile/img/mobile/";
			if($(window).scrollTop()>0){
				$("#up-and-down-button img").attr("src",path+"icon_up.png");
			}else{
				$("#up-and-down-button img").attr("src",path+"icon_down.png");
				$("#barchart-area").hide();
				$(".Content>.Btn_Top>nav>a[class^=Btn_Top]").removeClass("M_on");
				$(".Content>.Btn_Top>nav>a.Btn_Top2").addClass("M_on");
			}
		}, 100);
	});
	var localMapChart = new $localMapChart.chart();
	$(document).ready(function() {
		$("#up-and-down-button").click(function(){
			var path = $(this).find("img").attr("src"); 
			var scrollTopPosition = 0;
			if($(".SubjectC>nav>.M_on").index()==0){
				scrollTopPosition = $("#map-table").offset().top;
			}else if($(".SubjectC>nav>.M_on").index()==4){
				scrollTopPosition = $("#areainfo_04").offset().top;
			}
			$("html,body").animate({
				scrollTop: path.substring(path.lastIndexOf("/")+1).indexOf("icon_up")>-1?0:scrollTopPosition
			}, 300);
		});
		$localMap.ui.mapResize(true);
		$localMap.ui.chartAreaHeight();
		$(".Subject.SubjectC nav a").click(function() {
			var map = $localMap.ui.mapList[$localMap.ui.curMapId];
			$("#poiRemoveControl_"+map.id).click();
			$(".Subject.SubjectC nav a").removeClass("M_on");
			$(this).addClass("M_on");
			$("#category-list>div").hide();
			var div = $("#category-list>div:eq(" + ($(this).index()+1) + ")");
			$localMap.ui.setTitle(div.data("title"));
			div.show();
			localMapChart.updateChart($(this).index(), $localMap.ui.curAdmCode);
			if ($(this).index() == 0||$(this).index()==4) {
				var marginTop = 0;
				if($(this).index()==4){
					map.clickPolygonDisabled = true;
					if(map.preLayer!=null){
						map.preLayer.setStyle({
							weight: 3,
							color: "white",
							dashArray: map.preLayer.options.dashArray,
							fillOpacity: map.preLayer.options.fillOpacity,
							fillColor: map.preLayer.options.fillColor
						});
					}
					marginTop = "34";
				}else{
					map.clickPolygonDisabled = false;
					if(map.preLayer!=null){
						map.preLayer.setStyle({
							weight: 5,
							color: "#0086c6",
							dashArray: map.preLayer.options.dashArray,
							fillOpacity: map.preLayer.options.fillOpacity,
							fillColor: map.preLayer.options.fillColor
						});
					}
				}
				$("#map .sop-top.sop-left,#map .sop-top.sop-right").css({"margin-top":marginTop+"px"});
				$("#map-group").show();
				$sgisMobile.ui.mapResize($localMap.ui.mapList);
			}else{
				$("#map-group").hide();
			}
		});
		$localMap.ui.createMap("map", 0);
		$("div[id^=areainfo_0] input:radio").change(function() {
			$localMap.ui.setMutipleTitle($(this));
			localMapChart.updateChart(parseInt($(this).parents("div[id^=areainfo_]").attr("id").replace("areainfo_", "")), $localMap.ui.curAdmCode);
		});
		$("div[id^=businessDiv] em>img").click(function() {
			var areainfo = $(this).parents("div[id^=areainfo_]");
			var divId = $(this).parents("div[id^=businessDiv]").attr("id");
			var imgNumber = $(this).attr("src").match(/\d+/)[0];
			if (divId == "businessDivPower") {
				localMapChart.currThemeCdFirst = imgNumber;
			} else if (divId == "businessDivIncDec") {
				localMapChart.currThemeCdSecond = imgNumber;
			}
			localMapChart.updateChart(parseInt(areainfo.attr("id").replace("areainfo_", "")), $localMap.ui.curAdmCode);
		});
		$("#areainfo_05>.tab").click(function() {
			$("#areainfo_05>.tab").removeClass("M_on");
			$(this).addClass("M_on");
			$localMap.ui.setMutipleTitle($(this));
			$("#areainfo_05>div[class^=areainfo_0]").hide();
			$("#areainfo_05>div[data-house=" + $(this).attr("id") + "]").show();
			localMapChart.updateChart(5, $localMap.ui.curAdmCode);
		});
	});
	$localMap.ui = {
		abs : null,
		mapList: [],
		curMapId: null,
		data: null,
		curSelectedAdmCode: null,
		curSelectedMapCenter: null,
		curAdmCode: null,
		id:null,
		createMap: function(id, seq) {
			this.abs = new sop.portal.absAPI();
			this.id = id;
			this.curMapId = seq;
			var map = new sMap.map();
			map.createMap($localMap, id, {
				center: [989674, 1818313],
				zoom: 8,
				measureControl: false,
				zoomControl: true
			});
			map.id = seq;
			map.addControlEvent("movestart");
			map.addControlEvent("moveend");
			map.addControlEvent("zoomstart");
			map.addControlEvent("zoomend");
			map.gMap.doubleClickZoom.disable();
			
			
			map.createCurrentLocationButton();// 현재위치
			var zoomControl = map.gMap.zoomControl;
			zoomControl.setPosition("topleft");
			map.createPoiControl("interactive");//poi 표출 및 삭제
			map.createMapSizeControlButton("biz");//지도 확대 및 축소 
			this.mapList[seq] = map;
			var mapInfo = new sMapInfo.mapInfo(map);
			map.mapInfo = mapInfo;
			mapInfo.initialize($localMap.ui);

			var mapNavi1 = new mapNavigation.UI("biz");
			mapNavi1.create("mapNavi_1", seq+1, $localMap.ui);
			if(!this.abs.blockUI){
				this.abs.onBlockUIPopup();
			}
			mapNavi1.setCurrentMarker($localMap.ui, function(center, marker) {
				$localMap.ui.curSelectedMapCenter = center;
				$localMap.ui.getStatTimer();
			});
		},
		getStatTimer: function() {
			if (getAdmCd()) {
				$localMap.ui.getStat();
			} else {
				setTimeout(function() {
					$localMap.ui.getStatTimer();
				}, 500);
			}
		},
		getStat: function() {
			var map = $localMap.ui.mapList[$localMap.ui.curMapId];
			var statAdmCd = getAdmCd().substring(0, 7);
			var params = {
				param: {
					ppl_type: "1",
					ppl_val:"3"
				},
				adm_cd: statAdmCd,
				map: map
			};
			map.dropInfo = null;
			map.curDropCd = statAdmCd;
			$localMap.ui.curSelectedAdmCode = statAdmCd;
			$localMap.ui.curSelectedMapCenter = map.center;
			$localMap.ui.curAdmCode = statAdmCd;
			if (map.tradeGeojson) {
				map.tradeGeojson.remove();
				map.tradeGeojson = null;
			}
			var center = map.gMap.getCenter();
			this.setMapStats(map,statAdmCd,[center.x,center.y]);
			$localMap.ui.getPopulation("", "data");
		},
		getPopulation: function(data, type) {
			var html = "";
			if (type == "data") {
				var adm_cd = getAdmCd();
				if (data.properties) {
					adm_cd = data.properties.adm_cd;
				}
				$localMapApi.request.requestStatsOpenApi("API_0301", adm_cd, $localMap.ui.mapList[$localMap.ui.curMapId], {});
				$localMap.ui.curAdmCode = adm_cd;
			}
		},
		setMapStats : function(map,adm_cd,center){
			var option = {
				filter: "population",
				unit: "명",
				url: $localMapApi.request.API_0302_URL
			}
			$localMap.ui.curSelectedAdmCode = adm_cd;
			$localMap.ui.curSelectedMapCenter = center;
			$localMapApi.request.requestStatsOpenApi("API_0302", adm_cd, map, option);
			$localMap.ui.curAdmCode = adm_cd;
		},
		setTable: function(data, compare_adm_cd) {
			var bnd_year = data.bnd_year;
			var param = {
				accessToken: accessToken,
				year: data.year,
				low_search: data.low_search,
				bnd_year: bnd_year
			};
			if(compare_adm_cd.length>2){
				param.adm_cd = data.adm_cd;
			}
			$.ajax({
				url: openApiPath + $localMapApi.request.API_0301_URL,//인구,평균연령
				type: "GET",
				data: param,
				async: false,
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						$.each(res.result, function(cnt, node) {
							if (node.adm_cd == compare_adm_cd) {
								$("#map-table-" + (node.adm_cd.length > 7 ? "o" : node.adm_cd.length)).append(
									'<table class="TableSt">' +
										'<caption>' + (node.adm_cd.length > 7 ? "집계구("+node.adm_cd+")" : node.adm_nm) +
										'<thead>' +
											'<tr>' +
												'<th scope="col">구분</th>' +
												'<th scope="col">값</th>' +
											'</tr>' +
										'</thead>' +
										'<tbody>' +
											'<tr>' +
												'<td scope="row">인구(명)</td>' +
												'<td>' + $localMap.ui.setNumber(node.tot_ppltn) + '</td>' +
											'</tr>' +
											'<tr>' +
												'<td scope="row">평균연령(세)</td>' +
												'<td>' + $localMap.ui.setNumber(node.avg_age) + '</td>' +
											'</tr>' +
                                            '<tr>' +
												'<td scope="row">가구수(개)</td>' +
												'<td>' + $localMap.ui.setNumber(node.tot_family) + '</td>' +
											'</tr>' +
                                            '<tr>' +
												'<td scope="row">사업체수(개)</td>' +
												'<td>' + $localMap.ui.setNumber(node.corp_cnt) + '</td>' +
											'</tr>' +
										'</tbody>' +
									'</table>'
								);
							}
						});
					}else if(res.errCd == "-401"){
						accessTokenInfo(function(){
							$localMap.ui.setTable(data, compare_adm_cd);
						});
					}
				}
			});
			$("#map-table .origin_txt").text("출처 : 인구주택총조사("+data.year+"), 사업체조사 (2014)");
			$("#map-table .desc_txt").text("* N/A(Not Available) : 결과값이 5 이하인 경우 개인정보노출 우려료 N/A로 표시");
		},
		setNumber: function(d) {
			if(d!=undefined&&d!=null&&d.toString().length>0){
				return d < 5 ? "N/A" : appendCommaToNumber(d);
			}else{
				return "N/A";
			}
		},
		setMutipleTitle: function(element) {
			$localMap.ui.setTitle($(element).data("title"));
			var areainfo = $(element).parents("div[id^=areainfo_]");
			areainfo.data("title", $(element).data("title"));
		},
		setTitle: function(title) {
			if (title) {
				$(".MapTitle>h3").text(title);
				clearTimeout(titleActionDoit);
				var titleAction = function(){
					clearTimeout(titleActionDoit);
					$(".MapTitle>h3").css({"width":"","padding-left":""});
					if($(".MapTitle>h3").width()>$(".MapTitle").width()){
						$(".MapTitle>h3").css({"padding-left":"10px"});
						titleActionDoit = setTimeout(function(){
							$(".MapTitle>h3").animate({
								"margin-left":"-"+($(".MapTitle>h3").width()+10)
							},6000,function(){
								$(".MapTitle>h3").css({"margin-left":"0"});
								titleAction();
							});
						}, 3000);
					}else{
						$(".MapTitle>h3").css({"width":"100%"});
					}
				};
				titleAction();
				$(".MapTitle").show();
			} else {
				$(".MapTitle").hide();
			}
		},
		chartAreaHeight: function() {
			var titleHeight = (getTopHeight() + getTitleHeight() + parseInt($(".chart-area").css("margin-top").replace("px", "")));
			var radioHeight = (titleHeight + 41);
			var swiperHeight = (radioHeight + 70);
			var tabHeight = (radioHeight + 36);
			$("#bizStatsChart1_1").css({height: getHeight(titleHeight)});
			$("#bizStatsChart2_1_2").css({height: getHeight(radioHeight)});
            $("#bizStatsChart2_4_2,#bizStatsChart2_4_3").css({height: getHeight(swiperHeight)});
			$("#bizStatsChart3_1,#bizStatsChart3_2").css({height: getHeight(tabHeight)});
			if ($("div[id^=areainfo]:visible").length > 0) {
				localMapChart.updateChart(parseInt($("div[id^=areainfo]:visible").attr("id").replace("areainfo_", "")), $localMap.ui.curAdmCode);
			}
		},
		/**
		 * 
		 * @name         : doClearMap
		 * @description  : 맵의 오버레이를 초기화한다.(데이터오버레이만 해당)
		 * @date         : 2014. 10. 11. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		doClearMap : function(type) {
			var curMapId = this.curMapId?this.curMapId:0;
			this.curMapId = parseInt(type)-1;
			if (this.mapList.length > 0) {
				this.mapList[curMapId].clearDataOverlay();
				this.mapList[curMapId].preLayer = null;
				if(this.mapList[curMapId].gPoi){
					this.mapList[curMapId].gPoi.removeOverlay();
				}
				this.mapList[curMapId].isTradeMapShow = false;
			}
		},
		enableResearch: function(){
			var map = this.mapList[this.curMapId];
			map.preLayer = null;
			if($("#admSelect_mapNavi_1").val()&&$("#admSelect_mapNavi_1").val().replace(/ /gi,'')==""){
				messageAlert.open("알림", "읍면동을 선택해주시길 바랍니다.");
				return false;
			}
			if(map.mapNavigation.changeLocation){
				var admIdArray = $("#admSelect_mapNavi_1 option:selected").val().split("/");
				map.mapNavigation.curMap.mapMove([admIdArray[1], admIdArray[2]], map.gMap.getZoom()); //지도 위치 이동
			}
			map.mapNavigation.changeLocation = false;
            map.clearDataOverlay(function(){
                var adm_cd = getAdmCd();
                var doneEvent = function done() {
                	if(!$localMap.ui.abs.blockUI){
        				$localMap.ui.abs.onBlockUIPopup();
        			}
                    setTimeout(function() {
                        $localMap.ui.getStat();
                    }, 1000);
                }
                if (adm_cd) {
                	if(adm_cd.length<7){
                		messageAlert.open(
                            "알림",
                            "읍면동을 선택해주세요"
                        );
                        return;
                	}else if (map.zoom<9) {
                        messageAlert.open(
                            "알림",
                            "내주변통계 정보는 읍면동 단위에서 조회할수 있습니다.</br>지도 레벨을 변경하여 데이터를 확인합니다.",
                            doneEvent
                        );
                        return;
                    }else{
                        $localMap.ui.getStat();
                        localMapChart.updateChart($(".SubjectC>nav>.M_on").index(), $localMap.ui.curAdmCode);
                    }
                } else {
                    messageAlert.open("알림", "오류가 발생하였습니다");
                }
            });
            var title = $(".gnb h2").text();
            var adm_nm = $("#sidoSelect_mapNavi_1 option:selected").text() + " " + $("#sggSelect_mapNavi_1 option:selected").text() + " " + $("#admSelect_mapNavi_1 option:selected").text();
            apiLogWrite2("L0", "L01", title, "없음", "8", adm_nm);
		},
		mapResize : function(top) {
			if($("div[id^=mapSizeControl_]").hasClass("downscale")){
				$("#map,#business-map").height($(window).height());
			}else{
				$("#map,#business-map").height(($(window).outerHeight(true) - getTopHeight())*80*0.01);
			}
			$sgisMobile.ui.mapResize($localMap.ui.mapList);
			if(top===undefined||top){
				clearTimeout(doit);
				doit = setTimeout(function(){$(window).scrollTop(0)}, 100);
			}
		}
	};
	$localMap.callbackFunc = {
		// 맵이동 시작시, 콜백 호출
		didMapMoveStart: function(event, map) {
			$("div[id^=researchControl_]").addClass("disabled");
		},

		// 맵이동 종료시, 콜백 호출
		didMapMoveEnd: function(event, map) {},

		// 맵 줌시작 시, 콜백 호출
		didMapZoomStart: function(event, map) {},

		// 맵 줌 종료 시, 콜백 호출
		didMapZoomEnd: function(event, map) {},
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
		didMouseOverPolygon: function(event, data, type, map) {},


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
		didMouseOutPolygon: function(event, data, type, map) {},


		/**
		 * 
		 * @name         : didSelectedPolygon
		 * @description  : 해당경계 선택 시, 발생하는 콜백함수
		 * @date         : 2014. 10. 11. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param data   : 해당 레이어 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 */
		didSelectedPolygon: function(event, data, type, map) {
			if($(".SubjectC>nav>.subject5").hasClass("M_on")){
				return;
			}
			if(type == "data"){
				$localMap.ui.getPopulation(data, type);
			}
			if (Math.abs(map.curDropPolygonCode - map.curPolygonCode) > 1 || map.curPolygonCode == 5) {
				return;
			}
			if (type == "data" && data.info && data.info.length > 0) {
				if(!$localMap.ui.abs.blockUI){
					$localMap.ui.abs.onBlockUIPopup();
				}
				var adm_cd = data.properties.adm_cd;
				this.setMapStats(map,statAdmCd,[event.target.getCenter().x, event.target.getCenter().y]);
			}
			if($localMap.ui.abs.blockUI){
				$localMap.ui.abs.onBlockUIClose();
			}
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
		didDrawCreate: function(event, type, map) {},
		didFinishedHadmaArea : function(data, map){
			$("div[id^=researchControl_]").removeClass("disabled");
		}
	};

	function getHeight(h) {
		return ($(window).outerHeight(true) > 400 ? ($(window).height() - h) : $(window).height());
	}

	function getTopHeight() {
		return $("header:visible").outerHeight(true) + $(".Subject.SubjectC").outerHeight(true) + $("p.SelectArea").outerHeight(true);
	}

	function getTitleHeight() {
		return $(".MapTitleBg").outerHeight(true);
	}
	function getAdmCd(){
		var adm_cd = "";
		var sido = $("select[data-id=sidoSelect_mapNavi_1]").val();
		var sgg = $("select[data-id=sggSelect_mapNavi_1]").val();
		var adm = $("select[data-id=admSelect_mapNavi_1]").val();
		if(sido){
			adm_cd+=$("select[data-id=sidoSelect_mapNavi_1]").val().split("/")[0];
			if(sgg){
				adm_cd+=$("select[data-id=sggSelect_mapNavi_1]").val().split("/")[0];
				if(adm){
					adm_cd+=$("select[data-id=admSelect_mapNavi_1]").val().split("/")[0];
				}
			}
		}
		return adm_cd;
	}
	window.onorientationchange = function() {
		$(window).scrollTop(0);
		$localMap.ui.chartAreaHeight();
	}
}(window, document));