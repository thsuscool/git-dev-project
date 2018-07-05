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
	W.$bizStatsMap = W.$bizStatsMap || {};

	$(document).ready(
		function() {	
			$bizStatsMap.ui.createMap("mapRgn_1", 0);
			$bizStatsMap.event.setUIEvent();
			var mapNavi1 = new mapNavigation.UI();
			mapNavi1.firstBoolean = true;
			mapNavi1.create("mapNavi_1", 1, $bizStatsMap.ui);
			//mng_s 20180412_김건민 Default 팝업 안뜨게 하기 위해 주석해놈 
			//commonPopupObj.openWin("bizStats_laypopup");
			//mng_s 20180412_김건민
	});
	
	$bizStatsMap = {
			noReverseGeoCode : false
	};
	
	$bizStatsMap.Popup = {
			show : function () {
				this.blockUI = document.createElement("DIV");
				this.blockUI.style.backgroundColor = "#D3D3D3";
				this.blockUI.style.border = "0px solid black";
				this.blockUI.style.position = "absolute";
				this.blockUI.style.left = '0px';
				this.blockUI.style.top = '0px';
				if (window.innerHeight == undefined) {
					this.blockUI.style.height = document.documentElement.clientHeight + 'px';
					this.blockUI.style.width = document.documentElement.clientWidth + 'px';
				}
				else {
					this.blockUI.style.height = window.innerHeight + 'px';
					this.blockUI.style.width = window.innerWidth + 'px';
				}
				this.blockUI.style.zIndex = "10000";
				this.blockUI.style.filter = "alpha(opacity=60);";
				this.blockUI.style.MozOpacity = 0.6;
				this.blockUI.style.opacity = 0.6;
				this.blockUI.style.KhtmlOpacity = 0.6;
				document.body.appendChild(this.blockUI);
				
				this.popupUI = document.createElement("DIV");
				this.popupUI.style.position = "absolute";
                this.popupUI.style.height = '10px';
                this.popupUI.style.lineHeight = '50px';
                this.popupUI.style.paddingBottom='40px';
                this.popupUI.style.width ='400px';
                this.popupUI.style.top ='50%';
                this.popupUI.style.left = '50%';
                this.popupUI.style.zIndex = "11000";

				var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
				this.popupUI.innerHTML = errorMsg;
				
				document.body.appendChild(this.popupUI);
			},
			close : function () {
				if (!sop.Util.isUndefined(this.blockUI)) {
					document.body.removeChild(this.blockUI);
					delete this.blockUI;
				}
				if (!sop.Util.isUndefined(this.popupUI)) {
					D.body.removeChild(this.popupUI);
					delete this.popupUI;
				}
			}
		
	};
	
	$bizStatsMap.ui = {
			namespace : "bizStatsMap",
			mapList : [],
			curMapId : 0,
			curDropParams : [],
			dropBtnInfo : [],	//==>임시변수
			introMarkerManageInfo : [],
			introJobAreaMarkers : null,
			heatMapList : [],
			reportPopup : null,
			dataTypeList : [],
			quickBoxShowYn : "" ,
			menuType : "",
			tmpMarkerGroup2 : [],
			
			bookmark_mapcenter : [],
			bookmark_zoom_level : "",
			share_info_type : "",
			
			jobBestCnt : 0, //mng_s
			jobBestAdmCd : "", //mng_s
			jobBestTitle : "", //mng_s
			
			
			/**
			 * 
			 * @name         : setDataType
			 * @description  : 현재 조회한 데이터타입을 설정한다.
			 * @date         : 2016. 01. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setDataType : function(mapId, type) {
				if (this.dataTypeList != null && 
						Object.prototype.toString.call(this.dataTypeList) === "[object Array]") {
						if (type == "poi") {
							if (this.dataTypeList[mapId] != "" && this.dataTypeList[mapId] != null) {
								return;
							}
						}
						this.dataTypeList[mapId] = type;
						if (type == "userData") {
							$bizStatsMap.ui.curSelectedStatsType = "userData";
						}
						
					}
			},
			
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
				map.createMap($bizStatsMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8, //9->8
					measureControl : false,
					miniMap : true,
					statisticTileLayer: true
				});
				map.gMap.setMinZoom(2);
				
				map.id = seq;
				map.addControlEvent("drop", {accept : ".dragItem"});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");	
				
				//미니맵 추가
				//$bizStatsDataBoard.ui.createMiniMap(map, seq);
				
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($bizStatsMap.ui);
				map.legend = legend;
				legend.createLegend();
				//작업부분 끝
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map);
				btnInfo.delegate = $bizStatsMap;
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					intrPoiControl : true,
					bizSettingControl : true,
					mapTypeControl : true,
					bizZoomControl : true
				});	
				
				map.tileLayer = map.gMap.statisticTileLayer;
				map.blankLayer = new sop.BuildingLayer();
		
				//공유
				var shareInfo = new share.shareInfo(map, $bizStatsMap.ui);
				map.shareInfo = shareInfo;
				
				//갤러리 등록
				$galleryAdd.delegate = this;
		
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				map.gMap.whenReady(function() {
					map.createHeatMap();
				});
				
			},
			
			/**
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function(type) {
				var ck = $(".tb_sizing").hasClass("on"); 
				if(!ck){
					$(".tb_sizing").addClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
					$("header").css({"height":"10px", "width":"100%"}); 
					$(".headerEtc, .gnb, .headerContents form").hide();
					$(".headerContents h1").css({"height":"10px"});
					$(".headerContents h1 img").hide();
					$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
				}else{
					$(".tb_sizing").removeClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png");
					$("header").css({"height":"104px", "width":"970px"}); 
					$(".headerEtc, .gnb, .headerContents form").show();
					$(".headerContents h1").css({"height":"78px"});
					$(".headerContents h1 img").show();
					$(".containerBox").css({"height":"calc(100% - 104px)", "top":"104px"});
				}
				
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].update();
					}
				}
			},
			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doClearMap : function(type) {
				$bizStatsMap.noReverseGeoCode = false;
				this.curMapId = parseInt(type)-1;
				if (this.mapList.length > 0) {
					var map = this.mapList[this.curMapId];
					map.clearDataOverlay();
					map.drawControl.removeOverlay();
					if(map.shareInfo != null) {
						map.shareInfo.clearShareData();
					}
					map.legend.legendInit();
					map.mapBtnInfo.isOpenPOI = false; //2016.10.04 추가
					var markerGroup = this.introMarkerManageInfo[map.id];
					if (markerGroup != undefined) {
						for (var i=0; i<markerGroup.markers.length; i++) {
							var marker = markerGroup.markers[i].marker;
							marker.remove();
						}
						markerGroup = undefined;
					}
				}
				this.dropBtnInfo[this.curMapId] = [];
				
				if (this.introJobAreaMarkers != null && this.introJobAreaMarkers.length > 0) {
					for (var i=0; i<this.introJobAreaMarkers.length; i++) {
						var markers = this.introJobAreaMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
					this.introJobAreaMarkers = null;
				}
				this.heatMapList[this.mapList[this.curMapId].id] = null;
				this.dataTypeList[this.curMapId] = null;
				
				
				//데이터보드 초기화
				$bizStatsDataBoard.ui.reset(this.curMapId);
				$publicDataBoard.ui.remove(this.curMapId);
				$mydataDataBoard.ui.remove(this.curMapId);
				
				//시군구별 생활업종 현황일 경우
				if ($bizStatsLeftMenu.ui.curSelectedStatsType == "jobArea") {
					this.doCompanySidoIntro();
				}
				
				//초기화한 지도정보와 매핑되는 버튼 Effect 수정
				$bizStatsLeftMenu.ui.updateSearchBtnEffect("", this.curMapId);
				$("#view"+type).find(".tb_report").parent().hide();
				this.setTitle("아래 메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요.", type);
			},
			
			/**
			 * 
			 * @name         : doInnerMap
			 * @description  : 
			 * @date         : 2016. 07. 13. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param  type(MapId), isShow (true, false)
			 */
			doInnerMap : function(type, isShow) {
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				var isShow = $("#btnList_"+type).find(".tb_inner").hasClass("on");
				map.setZoom(10);
				map.setInnerMap(isShow);
				
				if (isShow) {
					$("#btnList_"+type).find("ul").hide();
					$("#btnList_"+type).find(".tb_trade").hide();				//상권정보 숨기기
					
					$("#btnList_"+type).find(".tb_inner").removeClass("on");	//이미지 변경
					$("#btnList_"+type).find(".tb_inner").addClass("off");		//이미지 변경
					
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
				}else {
					$("#btnList_"+type).find("ul").show();
					$("#btnList_"+type).find(".tb_trade").show();				//상권정보 보이기
					
					$("#btnList_"+type).find(".tb_inner").removeClass("off");	//이미지 변경
					$("#btnList_"+type).find(".tb_inner").addClass("on");		//이미지 변경
					
					map.mapBtnInfo.controlShow("poi");
					map.mapBtnInfo.controlShow("setting");
				}
			},
			
			/**
			 * 
			 * @name         : doTradeMap
			 * @description  : 상권조회정보를 표출한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 맵 타입
			 */
			doTradeMap : function(type, isShow) {
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				var isShow = $("#btnList_"+type).find(".tb_trade").hasClass("on");
				map.setZoom(10);
				map.setTradeMap(isShow);
				
				if (isShow) {
					$("#btnList_"+type).find("ul").hide();
					$("#btnList_"+type).find(".tb_inner").hide();				//사업체전개도 숨기기
					
					$("#btnList_"+type).find(".tb_trade").removeClass("on");	//이미지 변경
					$("#btnList_"+type).find(".tb_trade").addClass("off");		//이미지 변경
					
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
				}else {
					$("#btnList_"+type).find("ul").show();
					$("#btnList_"+type).find(".tb_inner").show();				//사업체전개도 보이기
					
					$("#btnList_"+type).find(".tb_trade").removeClass("off");	//이미지 변경
					$("#btnList_"+type).find(".tb_trade").addClass("on");		//이미지 변경
					
					map.mapBtnInfo.controlShow("poi");
					map.mapBtnInfo.controlShow("setting");
				}	
			},
			
			//mng_s 업종별 뜨는 지역 데이터 보드에서 해당 지역 클릭시 그 지역으로 가기
			goJobBestArea : function(x,y, map, what, jobBestAdmCd, param_job_best_from, param_job_best_to) {
				var center = [x,y];
				var map = this.mapList[0];
				map.mapMove(center , 7);
				
				//$(".compareSelectList li a.round").removeClass("on");
				$(".compareSelectList li a.round").each(function(){
					$(this).removeClass("on");
				});
				$("#goJobBestFirstArea" + what).addClass("on");
				$bizStatsMap.ui.jobBestAdmCd = jobBestAdmCd;
				
				var paramObj = {
						params : {
							adm_cd : $bizStatsMap.ui.jobBestAdmCd, 
							param_job_best_from : param_job_best_from,
							param_job_best_to : param_job_best_to
						}
				};
				$bizStatsDataBoardApi.request.jobBestBarChart(paramObj);
			},
			
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 데이터 세팅
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @param  res 결과데이터
			 * @param  options  기타데이터
			 */
			reportDataSet : function(mapId) {
				this.curMapId = parseInt(mapId)-1;
				var map = this.mapList[this.curMapId];
				
				if (this.dataTypeList[map.id] == "publicData") {
					if ($publicDataBoard.ui.mapData[map.id].options.result.length == 0) {
						messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.</br>POI를 선택해주세요.");
						return;
					}
				}
				else if ($bizStatsLeftMenu.ui.curSelectedStatsType == "userData" &&
					$mydataDataBoard.ui.mapData[map.id].options.handsonTable == null) {
					messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
					return;
				}else if (this.dataTypeList[map.id] == "userData") {
					if ($("#searchMethodBox").find("input:checked").length == 0) {
						messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
						return;
					}
				}else if (this.dataTypeList[map.id] == "poi") {
					if (map.markers == null) {
						messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다");
						return;
					}else {
						var cnt =0;
						map.markers.eachLayer(function(layer) {
							cnt++;
						});
						if (cnt == 0) {
							messageAlert.open("알림", "보고서를 출력할 정보가 없습니다.");
							return;
						}
					}
				}else if ($bizStatsDataBoard.ui.chartDataList[map.id] == undefined || 
						$bizStatsDataBoard.ui.mapData[map.id].options.params == undefined) {
					messageAlert.open("알림", "보고서 출력은 데이터보드 출력 후 이용할 수 있습니다.");
					return;
				}
				
				$bizStatsMap.ui.reportPopup = 
					window.open("/js/bizStats/report/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
			},
			
			
			//============ 2017.06.26 [개발팀] kcu 공공데이터 추가 START ============//
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 3o. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				var map = this.mapList[this.curMapId];
				var mapType = "bizStatsMap";
				var divId = "#mapRgn_" + (map.id + 1);
				var adm_nm, chart, legend, theme_cd, origin, companyObj, subTitle, dataType, mapData, options, poiData, chartId, chartLegend; //2017.03.13 pdf저장 이슈
				var param = {};
				var menuType = {
						"intro"	     : 0,	//Intro) 17개 시도별 생활업종현황
						"jobArea"    : 1,	//업종별 지역현황
						"jobChange"  : 2,	//업종밀집도 변화
						"areaInfo" 	 : 3,	//지역 종합정보
						"areaSearch" : 4,	//창업지역검색
						"publicData" : 5,	//공공데이터
						"userData"	 : 6,	//나의 데이터
						"publicData" : 7,	//공공데이터
						"poi"		 : 8,   //poi
						"jobOpen"	 : 9    //지자체 인허가 업종별 개업 현황
				};
				
				dataType = $bizStatsLeftMenu.ui.curSelectedStatsType;
				
				switch(menuType[$bizStatsLeftMenu.ui.curSelectedStatsType]) {
					case 0:
						mapData = $bizStatsDataBoard.ui.chartDataList[map.id];
						adm_nm = $bizStatsDataBoard.ui.mapData[map.id].options.params.adm_nm;
						param = {
							title : "17개 시도별 생활업종현황" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							year : $(".seoulBox>span").html()
						};
						legend = $("#introSidoDiv").find(".fb").clone();
						chart = [
						    {
						    	title : adm_nm + " " + "생활편의업종(36종) 분류별 사업체 비율", 
						    	data : $("#introSidoDiv").find(".introChart:visible").clone(),
						    },
						    {
						    	title : adm_nm + " " + "지표별 생활편의업종(36종) 순위",
						    	data : $("#introSidoDiv").find(".introRankChart:visible").clone()
						    }
						];
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+")"; //2017.03.13 pdf저장 이슈
						break;
					case 1:
						mapData = $bizStatsDataBoard.ui.chartDataList[map.id];
						adm_nm = $bizStatsDataBoard.ui.mapData[map.id].options.params.adm_nm;
						theme_cd = $bizStatsDataBoard.ui.mapData[map.id].options.dataBoard.jobAreaThemeCd;
						param = {
							title : "생활업종별 지역 시군구 현황" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							theme_nm : $("#jobArea_"+theme_cd).html() ,
							year : $(".jobAreaTitle>span").html()
						};
						var chart = [];
						for (var i=1; i<=7; i++) {
							var title, data, tmpChart;
							
							switch(i) {
								case 1:
									title = adm_nm + " " + param.theme_nm +" 업종의 사업체수"; 
									break;
								case 2:
									title = "상위지역 대비 " + adm_nm + " " + param.theme_nm + " 업종의 비율";
									break;
								case 3:
									title = adm_nm + " " + param.theme_nm + " 업종 수 대비 거주인구";
									break;
								case 4:
									title = adm_nm + " " + param.theme_nm + " 업종 수 대비 직장인구";
									break;
								case 5:
									title = adm_nm + " " + param.theme_nm + " 업종 수 대비 가구수"
									break;
								case 6:
									title = adm_nm + " " + param.theme_nm + " 업종 수 대비 종사자수";
									break;
								case 7:
									title = adm_nm + " " + param.theme_nm + " 업종 수 대비 평균 종사자수";
									break;
							}
							
							tmpChart = $("#jobAreaCharts0"+i).highcharts();
							
							//2017.03.13 pdf저장 이슈
							var doc = document.querySelector("#jobAreaCharts0"+i);
							var svg = doc.querySelector("svg");
							var xml  = new XMLSerializer().serializeToString(svg);
				            var canvas = document.createElement("canvas");
				            canvg(canvas, xml);
				            data = canvas.toDataURL();
							chart.push({title:title, data:data});
						}
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						break;
					case 2:
						mapData = $bizStatsDataBoard.ui.chartDataList[map.id];
						adm_nm = $bizStatsDataBoard.ui.mapData[map.id].options.params.adm_nm;
						theme_cd = $bizStatsDataBoard.ui.mapData[map.id].options.dataBoard.themeCd;
						theme_nm = $bizStatsDataBoard.ui.mapData[map.id].options.dataBoard.themeNm;
						param = {
							title : "업종밀집도 변화" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							theme_nm : theme_nm,
							year : $bizStatsDataBoard.ui.mapData[map.id].options.params.year
						};
						var chart = null;
						tmpChart = $("#jobChangeBarCharts").highcharts();
						
						//2017.03.13 pdf저장 이슈
						if (tmpChart != undefined) {
							var doc = document.querySelector("#jobChangeBarCharts");
							var svg = doc.querySelector("svg");
							var xml  = new XMLSerializer().serializeToString(svg);
				            var canvas = document.createElement("canvas");
				            canvg(canvas, xml);
				            data = canvas.toDataURL();
						}
						chart = {title:"시계열 그래프", data:data};
						origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						break;
						
					case 9: //지자체 인허가 리포트
						mapData = $bizStatsDataBoard.ui.chartDataList[map.id];
						adm_nm = $bizStatsDataBoard.ui.mapData[map.id].options.params.adm_nm;
						theme_cd = $bizStatsDataBoard.ui.mapData[map.id].options.dataBoard.themeCd;
						theme_nm = $bizStatsDataBoard.ui.mapData[map.id].options.dataBoard.themeNm;
						param = {
							title : "업종별 개업 현황" + " ("+adm_nm+")",
							adm_nm : adm_nm,
							theme_nm : theme_nm,
							year : $bizStatsDataBoard.ui.mapData[map.id].options.params.year
						};
						var chart = null;
						tmpChart = $("#jobOpenBarCharts").highcharts();
						
						//2017.03.13 pdf저장 이슈
						if (tmpChart != undefined) {
							var doc = document.querySelector("#jobOpenBarCharts");
							var svg = doc.querySelector("svg");
							var xml  = new XMLSerializer().serializeToString(svg);
				            var canvas = document.createElement("canvas");
				            canvg(canvas, xml);
				            data = canvas.toDataURL();
						}
						chart = {title:"시계열 그래프", data:data};
						//origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						origin = "한국지역정보개발원"; //출처 설정을 어디로 할 것인지 확정되면 여기에 기술하면 됨.
						
						break;
						
					case 3:
						chart = [];
						mapData = $bizStatsDataBoard.ui.chartDataList[map.id];
						adm_nm = $bizStatsDataBoard.ui.mapData[map.id].options.params.adm_nm;
						param = {
								title : "생활업종후보지정보" + " ("+adm_nm+")",
								adm_nm : adm_nm,
								year : $bizStatsDataBoard.ui.mapData[map.id].options.params.year,
								chartType: '',
						};
						chartLegend = $("#areaInfoDiv").find(".fb").clone(); //2017.03.13 pdf저장 이슈
						
						//인구특성그래프
						tmpChart = $("#spyCharts01").highcharts();
						
						//2017.03.13 pdf저장 이슈
						if (tmpChart != undefined) {
							var doc = document.querySelector("#spyCharts01");
							var svg = doc.querySelector("svg");
							var xml  = new XMLSerializer().serializeToString(svg);
				            var canvas = document.createElement("canvas");
				            canvg(canvas, xml);
				            data = canvas.toDataURL();
						}
						chart.push({title:"지역특성그래프", data:data});
						
						var chartSummary = [
		                     { selector: '#areaInfoFoodRateChart', chartNm: 'corpdistsumChart', title: '소상공인 업종별 사업체 비율(%)'},
		                     { selector: '#areaInfoSalesRateChart', chartNm: 'corpdistsumChart', title: '소상공인 업종별 사업체 비율(%)'},
		                     { selector: '#areaInfoServiceRateChart', chartNm: 'corpdistsumChart', title: '소상공인 업종별 사업체 비율(%)'},
		                     { selector: '#areaInfoHospitalityRateChart', chartNm: 'corpdistsumChart', title: '소상공인 업종별 사업체 비율(%)'},
		                     { selector: '#areaInfoCompanyIndecreaseChart', chartNm: 'corpindecreaseChart', title: '소상공인 업종별 증감(개)'},
		                     { selector: '#areaInfoMainFacilityChart', chartNm: 'mainFacilityChart', title: '주요시설물 현황(개)'},
					         { selector: '#areaInfoPopulationAgeChart', chartNm: 'pplAgeChart', title: '연령별 인구비율(%)' },
					         { selector: '#areaInfoPopulationGenderChart', chartNm: 'pplGenderChart', title: '성별 인구비율(%)'},
					         { selector: '#areaInfoHouseholdOccupyChart', chartNm: 'ocptnsumChart', title: '점유형태별 가구비율(%)'},
					         { selector: '#areaInfoHouseholdTypeChart', chartNm: 'housesumChart', title: '거처유형별 가구비율(%)'},
					         { selector: '#areaInfoHousePriceChart', chartNm: 'hPriceChart', title: 'm²당 주택 거래가격(만원)'},
					         { selector: '#areaInfoHouseTradeChart', chartNm: 'hTradeChart', title: '주택 거래동향(건)'},
					         { selector: '#areaInfoHousePnilpChart', chartNm: 'hPnilpChart', title: '공시지가 (원/㎡)'}
				         ];
						
						// 엑스트라 차트
						$.each(chartSummary, function(i, v){
							if($(v.selector).is(":visible")){
								tmpChart = $(v.selector).highcharts();
								//2017.03.13 pdf저장 이슈
								if (tmpChart != undefined) {
									var doc = document.querySelector(v.selector);
									var svg = doc.querySelector("svg");
									var xml  = new XMLSerializer().serializeToString(svg);
						            var canvas = document.createElement("canvas");
						            canvg(canvas, xml);
						            data = canvas.toDataURL();
								}
								chart.push({title:v.title, chartNm:v.chartNm, data:data});
								param.expertChartType = v.chartNm;
							}
						});
						
						if ($(".areaInfoTab_company").hasClass("on")){
							origin = "통계청, 통계청전국사업체조사("+companyDataYear+")";
						}else {
							origin = "통계청, 인구주택총조사("+dataYear+")";
						}
						break;
					case 4:
						chart = [];
						mapData = $bizStatsDataBoard.ui.mapData[map.id].options.dataBoard;
						var tmpAdmList = [];
						for (var i=0; i<mapData.candidateList.length; i++) {
							var adm_nm = mapData.candidateList[i].adm_nm;
							tmpAdmList.push(adm_nm);
						}
						adm_nm = tmpAdmList.join(",");
						param = {
								title : "후보지역 특성정보",
								adm_nm : adm_nm
						};

						//후보지역 특성정보 비교하기

						// 지역 비교 팝업창 검사
						if($(".dialogbox").css("left") == "0px"){
							//스파이더웹 차트
							var spiderCharts = $('.dialogBox #spiderChartArea [id^="dcharts"]').toArray();
							for(var i=0; i<spiderCharts.length; i++){
								var exported = exportChart("#"+$(spiderCharts[i]).attr("id"));
								if(exported)
									chart.push({title: tmpAdmList[i], data: exported, type: 'spider'});
							}
							// 바 차트
							var barCharts = $('.dialogBox #barChartArea [id$="Chart"]').toArray();
							for(var i=0; i<barCharts.length; i++){
								var exported = exportChart("#"+$(barCharts[i]).attr("id"));
								var title = $(barCharts[i]).prev("span.dTitle").text();
								if(exported)
									chart.push({title: tmpAdmList[i], data: exported, type: 'bar', title: title});
							}
							// 범례
							chartLegend = $(".dialogbox").find(".fb").clone();
							chartLegend.find("ul").append($(".dialogbox .dctb:gt(0) ul li:nth-child(2)").clone());
						}else{
							chart.push({title: "후보지역 특성정보", data: exportChart("#spyCharts02")});
							chartLegend = $("#areaSearchDiv").find(".fb").clone();
						}
						
						origin = "";
						
						function exportChart(selector){
							var sourceChart = $(selector).highcharts();
							if(sourceChart){
								//2017.03.13 pdf저장 이슈
								var doc = document.querySelector(selector);
								var svg = doc.querySelector("svg");
								var xml  = new XMLSerializer().serializeToString(svg);
						        var canvas = document.createElement("canvas");
						        canvg(canvas, xml);
						        return canvas.toDataURL();
							}else{
								return null;
							}
							
						}
						
						break;
					case 5:
						break;
					case 6:
						mapType = "userData";
						dataType = mapType;
						mapData = $mydataDataBoard.ui.mapData[map.id].options;
						if ($mydataDataBoard.ui.selectedMyData != null) {
							subTitle = $mydataDataBoard.ui.selectedMyData.title;
						}
						param = {
								title : "나의 데이터",
								subTitle: subTitle
							};
						break;
					case 7:
						mapType = "publicData";
						var subMenu = {
							"population" : 0,	//유동인구
							"school"	 : 1,	//학교인구
							"metro"		 : 2,	//지하철승하차
							"busStop"	 : 3,	//버스정류장
							"cctv"		 : 4	//cctv 2017.06.26 [개발팀] kcu 공공데이터 추가
						};
						
						var chart = [];
						options = $publicDataBoard.ui.mapData[map.id].options;
						dataType = $publicDataBoard.ui.mapData[map.id].type;
						switch (subMenu[$publicDataBoard.ui.mapData[map.id].type]) {
							case 0:
								var idx = options.viewIndex;
								chartId = "publicPopulationChart";
								poiData = options.result.target.info.resultList[idx];
								adm_nm = options.result.target.info.resultList[0].adm_nm;
								$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info.resultList[idx]};
								mapData = $publicDataBoard.ui.chartDataList[map.id];
								title = "유동인구 정보" + "  ("+adm_nm+")"; 
								subTitle = poiData.surv_region+ " 유동인구 ("+makeYYYYMMDDString(poiData.surv_dt)+ " "+poiData.surv_time+")";
								origin = "중소기업청, 전국 주요상권 유동인구 DB(2010)";
								break;
							case 1:
								adm_nm = "";
								chartId = "publicSchoolChart";
								poiData = options.result.target.info.resultList;
								$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info.resultList};
								mapData = $publicDataBoard.ui.chartDataList[map.id];
								title = "학교인구 정보" + "  ("+poiData.school_nm+")"; 
								subTitle = poiData.school_nm;
								origin = "한국교육개발원, 교육기본통계(유초중등통계,고등통계)(2013)";
								break;
							case 2:
								adm_nm = "";
								chartId = $(".metroChartDiv:visible").attr("id");
								poiData = options.result.target.info;
								$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info};
								var tmpChartData = [];
								if (chartId == "publicMetroChart01") {
									for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
										if ($publicDataBoard.ui.chartDataList[map.id][i].type == "poiInfo" || 
											$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
											tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
										}
									}
								}else if (chartId == "publicMetroChart02") {
									for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
										if ($publicDataBoard.ui.chartDataList[map.id][i].type == "metro_month" || 
											$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
											tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
										}
									}
								}else {
									for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
										if ($publicDataBoard.ui.chartDataList[map.id][i].type == "metro_dayofweek" || 
											$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
											tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
										}
									}
								}
								
								mapData = tmpChartData;
								title = "지하철 승하차인구 정보" + "  ("+poiData.sido_nm+" "+poiData.station_nm+"역)"; 
								subTitle = poiData.sido_nm+" "+poiData.station_nm+"역";
								origin = "지자체 지하철 관리기관,지하철 이용현황(2013,2014)";
								break;
							case 3:
								adm_nm = "";
								poiData = options.result.target.info;
								mapData = $publicDataBoard.ui.chartDataList[map.id];
								title = "버스정류장 정보" + "  ("+poiData.busstop_nm+")"; 
								subTitle = poiData.busstop_nm;
								origin = "국토교통부,버스정류장 위치정보(2014)";
								break;
								//2017.06.26 [개발팀] kcu 공공데이터 추가 
							case 4:
								var tmpChart = null;
								var isCCTV = true;
								var curMarker = null;
								var name = "";
								adm_nm = "";
								poiData = options.result;
								mapData = $publicDataBoard.ui.chartDataList[map.id];
								curMarker = $publicDataBoard.ui.selectedCctvObj;
								title = "세종권역 통행흐름정보";
								if (curMarker.cctv_lc_id != undefined) {
									subTitle = curMarker.lc_nm;
									isCCTV = true;
								}else {
									subTitle = curMarker.busstop_nm;
									isCCTV = false;
								}
								origin = "충청청,세종권역정보(2017)";
								
								if (isCCTV) {
									//월별통계 차트정보 - 주말/주중 그래프
									var data = getChartSvgData("#weekendChart");
									if (data != undefined) {
										chart.push({title:"월별통계정보(주중/주말)", data:data});
									}

									//월별통계 차트정보 - 출퇴근시간대별 그래프
									var data = getChartSvgData("#rushHoursChart");
									if (data != undefined) {
										chart.push({title:"월별통계정보(출퇴근시간)", data:data});
									}

									//시간대별 차트정보 - 시간대별 그래프
									var data = getChartSvgData("#timeseriesChart");
									if (data != undefined) {
										chart.push({title:"시간대별통계정보(시간대별)", data:data});
									}
									
									//시간대별 차트정보 - 시간대별 그래프
									var data = getChartSvgData("#dayOfWeekChart");
									if (data != undefined) {
										chart.push({title:"시간대별통계정보(요일별)", data:data});
									}
	
								}else {
									//월별통계정보 - 주중 승하차
									var data = getChartSvgData("#brtMonthDayOfWeekChart");
									if (data != undefined) {
										chart.push({title:"월별통계정보(주중 승하차)", data:data});
									}
									
									//월별통계정보 - 주말 승하차
									var data = getChartSvgData("#brtMonthWeekendChart");
									if (data != undefined) {
										chart.push({title:"월별통계정보(주말 승하차)", data:data});
									}
									
									//월별통계정보 - 출근시간 승하차
									var data = getChartSvgData("#brtMonthOnWorkGraphArea");
									if (data != undefined) {
										chart.push({title:"월별통계정보(출근시간 승하차)", data:data});
									}
									
									//월별통계정보 - 퇴근시간 승하차
									var data = getChartSvgData("#brtMonthOffWorkChart");
									if (data != undefined) {
										chart.push({title:"월별통계정보(퇴근시간 승하차)", data:data});
									}
									
									//시간대별통계정보 - 주중 시간대별
									var data = getChartSvgData("#brtTimeSeriesDayOfWeekChart");
									if (data != undefined) {
										chart.push({title:"시간대별통계정보(주중 시간대별)", data:data});
									}
									
									//시간대별통계정보 - 주말 시간대별
									var data = getChartSvgData("#brtTimeSeriesWeekendChart");
									if (data != undefined) {
										chart.push({title:"시간대별통계정보(주말 시간대별)", data:data});
									}
									
									//시간대별통계정보 - 출근 시간대별
									var data = getChartSvgData("#brtTimeSeriesOnWorkChart");
									if (data != undefined) {
										chart.push({title:"시간대별통계정보(출근 시간대별)", data:data});
									}
									
									//시간대별통계정보 - 퇴근 시간대별
									var data = getChartSvgData("#brtTimeSeriesOffWorkChart");
									if (data != undefined) {
										chart.push({title:"시간대별통계정보(퇴근 시간대별)", data:data});
									}
								}
								break;
							default:
								break;
						}
							
						param = {
							title : title,
							subTitle: subTitle,
							adm_nm : adm_nm
						};
						
						//POI통계정보
						//2017.06.26 [개발팀] kcu 공공데이터 추가 
						var data = getChartSvgData("#"+chartId);
						if (data != undefined) {
							chart.push({title:subTitle, data:data});
						}
						
						
						//반경내 사업체정보
						//2017.06.26 [개발팀] kcu 공공데이터 추가 
						var data = getChartSvgData("#publicDataThemeChart");
						if (data != undefined) {
							chart.push({title:"반경 내 주요시설물 수", data:data});
						}
						break;
					case 8:
						mapType = "poi";
						dataType = mapType;
						mapData = map.markers;
						param = {
								title : "POI 데이터",
								subTitle: map.mapBtnInfo.selectedPoiTitle
						};
						break;
						
						
					default:
						break;
				};
				
				//2017.06.26 [개발팀] kcu 공공데이터 추가 
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
				
				var dataList = {
					id : map.id, 
					divId : divId,
					geojson : null, 
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
					dataType : dataType,
					origin : origin
				};
				
				//2017.02.22 이미지캡쳐 수정
				//==================================================================================================================================//
				setTimeout(function() {
					html2canvas($(divId), {
						logging: true,
	                    useCORS: false,
	                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
		 				onrendered: function(canvas) {
		 					//익스플로러 예외처리
		 					//2017.03.14 svg처리
		 					/*var agent = navigator.userAgent.toLowerCase();
	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	                     		var doc = document.querySelector(divId); 
	                     		var mapContainer = null;
	                     		for (var i=0; i<doc.childNodes.length; i++) {
	                     			var tmpClassName = doc.childNodes[i].className;
	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
	                     				mapContainer = doc.childNodes[i];
	                     				break;
	                     			}
	                     		}
	                     		if (mapContainer != null) {
	                     			var svgList = mapContainer.querySelectorAll("svg");
		                     		for (var i=0; i<svgList.length; i++) {
		                     			var svg = svgList[i];
		                     			var xml  = new XMLSerializer().serializeToString(svg);
			                            var tmpCanvas = document.createElement("canvas");
			                            canvg(tmpCanvas, xml);
			                            var marginLeft = (tmpCanvas.width - canvas.width)/2;
			                            var marginTop = (tmpCanvas.height - canvas.height)/2;
			                            var ctx = canvas.getContext("2d");
			                            ctx.drawImage(tmpCanvas, -marginLeft, -marginTop, tmpCanvas.width, tmpCanvas.height);
		                     		}
	                     		}
	                     	}*/
		 					var data = canvas.toDataURL();
		 					var options = {
		 							mapType : mapType,
		 							mapClone : $(divId).clone(),
		 							mapWidth : $(divId).width(),
		 							mapHeight : $(divId).height(),
		 							chart : chart,
		 							chartLegend : chartLegend, //2017.03.13 pdf저장 이슈
		 							legend :legend,
		 							mapData : data
		 					};
		 					var popup = $bizStatsMap.ui.reportPopup.$reportForm.ui;
		 					popup.delegate = $bizStatsMap.ui;
		 					popup.map = map;
		 					//'공공데이터'를 제외한 메뉴들만 변경된 보고서디자인 적용을 위해
		 					popup.setNewDiv(mapType);
		 					popup.setData(dataList, options);
		 					
		 				}
		 			});
				}, 300)
				//==================================================================================================================================//
			},
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function(type) {				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				var createMapId, updateId;
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					createMapId = 2;
					updateId = 1;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					createMapId = 1;
					updateId = 2;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					createMapId = 0;
					updateId = 3;
				}else if (isMap1ContentShow) {
					createMapId = 1;
					updateId = 4;
				}else if (isMap2ContentShow) {
					createMapId = 0;
					updateId = 5;
				}else if (isMap3ContentShow) {
					createMapId = 0;
					updateId = 6;
				}

				var sceneInx = $(".sceneBox.on").length; 
				$(".sceneBox").eq(createMapId).show().addClass("on");
				if(sceneInx==1){ 
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$bizStatsMap.ui.mapList.length; i++) {
							if ($bizStatsMap.ui.mapList[i] != null) {
								$bizStatsMap.ui.mapList[i].update();
							}
						}
					});
					$(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneRela").eq(0).css({"border-left":"0"});
				}else if(sceneInx==2){ 
					$(".sceneBox").css({"position":"absolute"});
					$(".sceneBox").stop().animate({"width":"600px", "height":"500px"},200, function() {
						for (var i=0; i<$bizStatsMap.ui.mapList.length; i++) {
							if ($bizStatsMap.ui.mapList[i] != null) {
								$bizStatsMap.ui.mapList[i].update();
							}
						}
					}); 
					$(".sceneRela").css({"border-left":"0"});
					$(".resizeIcon").show();
					$(".sceneBox").each(function(i){
						$(this).css({"z-index":parseInt(10-i), "border":"3px solid #333"})
						.animate({"top":parseInt(50*(i+1))+"px", "left":parseInt(150*(i+1))+"px"},200);
					});
					$( ".sceneBox" ).draggable({containment: ".containerBox>.rela"}).resizable();
					$( ".sceneBox" ).on("resize", function() {
						for (var i=0; i<$bizStatsMap.ui.mapList.length; i++) {
							if ($bizStatsMap.ui.mapList[i] != null) {
								$bizStatsMap.ui.mapList[i].update();
							}
						}
					});
				} 
				
				//지도생성
				//heatMap 생성에 버그가 있음
				//맵이 완전히 생성되어 화면에 표출된 다음, heatMap을 생성해야 오류가 안남
				this.createMap("mapRgn_" + (createMapId+1), createMapId);
				var mapNavi = new mapNavigation.UI();
				mapNavi.firstBoolean = false;
				mapNavi.create("mapNavi_" + (createMapId+1), createMapId+1, $bizStatsMap.ui);
				
				$(".sceneBox.on").each(function(index) {
					$(this).find(".tb_radio").hide();
				});				
			
				//기존지도정보 복사
				switch(updateId) {
					case 1:
						this.mapList[2].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 2:
					case 4:
						this.mapList[1].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 3:
					case 5:
						this.mapList[0].mapMove(this.mapList[1].center, this.mapList[1].zoom);
						break;
					case 6:
						this.mapList[0].mapMove(this.mapList[2].center, this.mapList[2].zoom);
						break;
				}
				
				$(".interactiveView").css("display","inline-block");
				$(".tb_close").show();
				$(".interactiveView").each(function(i){
					$(".tb_mapAdd").text("VIEW"+parseInt(i+1));
				}); 
				
				var sceneInx = $(".sceneBox.on").length;
				if (sceneInx > 1) {
					$(".viewTitle > span").show();
				}else {
					$(".viewTitle > span").hide();
				}
				
			},
			
			/**
			 * 
			 * @name         : doRemoveMap
			 * @description  : 맵을 삭제한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 1:1번맵, 2:2번맵, 3:3번맵
			 */
			doRemoveMap : function(type) {
				this.doClearMap(type);
				this.curMapId = parseInt(type)-1;
				if (this.mapList[this.curMapId] !== undefined) {
					this.mapList[this.curMapId].gMap.remove();
					this.mapList[this.curMapId] = null;
				}
				
				$(".sceneBox").eq(this.curMapId).removeClass("on").hide();
				var sceneInx = $(".sceneBox.on").length;  
				if(sceneInx==1){  
					$(".sceneBox").stop().animate({"width":"100%"},200, function() {
						for (var i=0; i<$bizStatsMap.ui.mapList.length; i++) {
							if ($bizStatsMap.ui.mapList[i] != null) {
								$bizStatsMap.ui.mapList[i].update();
							}
						}
					}); 
					$(".tb_close, .interactiveView").hide();
					$(".interactiveDataBoard").show();
					$(".sceneBox.on").eq(0).find(".sceneRela").css({"border-left":"0px"});
					$(".sceneBox.on").each(function(index) {
						$(this).find(".tb_radio").show();
					});
				}else if(sceneInx==2){
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$bizStatsMap.ui.mapList.length; i++) {
							if ($bizStatsMap.ui.mapList[i] != null) {
								$bizStatsMap.ui.mapList[i].update();
							}
						}
					});
					$(".sceneBox").draggable("destroy").resizable("destroy").css({"position":"static", "border":"0", "height":"100%"});
					$(".sceneBox.on").eq(1).find(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneBox.on").each(function(index) {
						$(this).find(".tb_radio").hide();
					});
				}
				
				$(this).hide(); 
				$(".resizeIcon").hide();
				$(".interactiveView").each(function(i){
					$(this).text("VIEW"+parseInt(i+1));
				});
				
				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//삭제한 지도정보와 매핑되는 버튼 Effect 수정
				$("#title_"+type).empty();
				$("#title_"+type).hide();
				$("#helper_"+type).show();
				
				//삭제한 지도정보와 매핑되는 버튼 Effect 수정
//				$bizStatsLeftMenu.ui.updateSearchBtnEffect("", this.curMapId);
				
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					this.curMapId = 0;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					this.curMapId = 1;
				}else if (isMap1ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow) {
					this.curMapId = 1;
				}else if (isMap3ContentShow) {
					this.curMapId = 2;
				}
				
				$mydataDataBoard.ui.delegateSetting($bizStatsMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($bizStatsMap.ui);			//공공데이터 세팅
				
				//현재 선택된 맵으로 데이터보드 다시 그리기
				$bizStatsDataBoard.ui.reDraw(this.curMapId);
			},
			
			/**
			 * 
			 * @name         : doSidoIntro
			 * @description  : 인트로화면으로 전환한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSidoIntro : function() {
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				map.mapMode = "intro";
				map.mapMove([1007770, 1855549], 2);
				map.gMap.removeLayer(map.tileLayer);
				map.blankLayer.addTo(map.gMap);
				map.setFixedBoundLevel(true);
				map.isLayerMouseEventDisabled = false;
				map.legend.legendInit();
				$bizStatsDataBoard.ui.mapData[map.id].type = "";
				$bizStatsMap.noReverseGeoCode = true;
				
				setTimeout(function() {
					map.openApiBoundarySido(map.bnd_year, function() {
						if (map.geojson != null) {
							var tmpMarkerGroup = [];
							map.geojson.eachLayer(function(layer) {
								var utmk_x = layer.feature.properties.x;
								var utmk_y = layer.feature.properties.y;
								var markerIcon = sop.icon({
									iconUrl : '/img/ico/ico_mapIcon.png',
									iconAnchor : [ 16.5, 45 ],
									iconSize : [ 33, 45 ],
									infoWindowAnchor : [ 1, -34 ]
								});
								var marker = sop.marker([ utmk_x, utmk_y ], {
									icon : markerIcon
								});
								marker.bindInfoWindow("<div>"+ layer.feature.properties.adm_nm +"</div>");
								marker.addTo(map.gMap);
								tmpMarkerGroup.push({
									adm_cd : layer.feature.properties.adm_cd,
									marker : marker
								});
								
								

								var adm_cd = layer.feature.properties.adm_cd;
								var x_coord = utmk_x;
								var y_coord = utmk_y;
								if(adm_cd == "37"){
									html  = "<div id='chart_"+adm_cd+"' style='width:"+"111"+"px;height:"+"22"+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+"22"+";margin-top:"+"22"+";'>";
									html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"독도"+"</div>";
									html += 	"<div id='pieChart_"+adm_cd+"'></div>";
								    html += "</div>";

								    icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
									marker = sop.marker([ x_coord+270000, y_coord+110000], {
										icon : icon
									});
									marker.addTo(map.gMap);
									tmpMarkerGroup.push({adm_cd : adm_cd, marker:marker}); 
									html  = "<div id='chart_"+adm_cd+"' style='width:"+"111"+"px;height:"+"22"+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+"22"+";margin-top:"+"22"+";'>";
									html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"울릉도"+"</div>";
									html += 	"<div id='pieChart_"+adm_cd+"'></div>";
								    html += "</div>";

								    icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
									marker = sop.marker([ x_coord+180000, y_coord+140000 ], {
										icon : icon
									});
									marker.addTo(map.gMap); 
									tmpMarkerGroup.push({adm_cd : adm_cd, marker:marker}); 
								}
								
								
								
								
								
								
								
								
								
								
								
								
								marker.on("click", function(e) {
									e.target = layer;
									$bizStatsMap.callbackFunc.didSelectedPolygon(e, layer.feature, layer.options.type, map);
									
									
									
									html  = "<div id='chart_"+adm_cd+"' style='width:"+"111"+"px;height:"+"22"+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+"22"+";margin-top:"+"22"+";'>";
									html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"독도"+"</div>";
									html += 	"<div id='pieChart_"+adm_cd+"'></div>";
								    html += "</div>";

								    icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
									marker = sop.marker([ 1371466, 1933037], {
										icon : icon
									});
									marker.addTo(map.gMap);
									tmpMarkerGroup.push({adm_cd : adm_cd, marker:marker}); 
									html  = "<div id='chart_"+adm_cd+"' style='width:"+"111"+"px;height:"+"22"+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+"22"+";margin-top:"+"22"+";'>";
									html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"울릉도"+"</div>";
									html += 	"<div id='pieChart_"+adm_cd+"'></div>";
								    html += "</div>";

								    icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
									marker = sop.marker([ 1281466,	1963037 ], {
										icon : icon
									});
									marker.addTo(map.gMap); 
									tmpMarkerGroup.push({adm_cd : adm_cd, marker:marker}); 
								});
							});
							var tmpMarkers = {
								markers : tmpMarkerGroup,
								deselectedMarker : null
							}
							$bizStatsMap.ui.introMarkerManageInfo[map.id] = tmpMarkers;
		
							var options = {
									params : {
										adm_cd : "",
										adm_nm : "",
										map : map
									}
							}
									
							$bizStatsMapApi.request.setStatsData("", options);
								
						}
					});
				},200);
				
				this.setTitle("시도별 생활업종현황", viewId);
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_inner").hide();
				$("#view"+viewId).find(".tb_report").parent().show();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$("#legend_"+map.legend.id).hide();
			},
			
			/**
			 * 
			 * @name         : doCompanySidoIntro
			 * @description  : 업종별 지역현황정보를 조회한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanySidoIntro : function() {
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				map.mapMode = "intro";
				map.mapMove([1007770, 1855549], 2);
				map.gMap.removeLayer(map.tileLayer);
				map.blankLayer.addTo(map.gMap);
				map.setFixedBoundLevel(true);
				map.isLayerMouseEventDisabled = true;
				map.legend.legendInit();
				map.gMap.setMaxZoom(7);
				map.gMap.scrollWheelZoom.enable();
				map.multiLayerControl.clear();
				map.multiLayerControl.dataGeojson = null;
				$bizStatsDataBoard.ui.mapData[map.id].type = "";
				$bizStatsMap.noReverseGeoCode = true;
				
				setTimeout(function() {
					$bizStatsMap.Popup.show();
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetSidoCodeList.json",
						async : true,
						success: function(res) {
							if (res.errCd == "0") {
								sidoList = res.result.sidoCodeList;
								$bizStatsMap.ui.doGetSggBoundary(sidoList, 0, map, function() {
									$bizStatsMap.Popup.close();
								});
							}else {
								$bizStatsMap.Popup.close();
							}
						},									 
						dataType: "json",
						error:function(e){
							$bizStatsMap.Popup.close();
						}  
					});
				}, 200);
				
				
				$("#view"+viewId).find(".helperText").html("시군구 생활업종 현황");
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_inner").hide();
				$("#view"+viewId).find(".tb_report").parent().show();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$(".btn_legendSetting").hide();
				$("#legend_"+map.legend.id).show();
				
				$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "bubble") {
						$(this).find("a").click();
					}
				});
			},
			
			/**
			 * 
			 * @name         : doGetSggBoundary
			 * @description  : 전국 시군구경계를 조회한다.
			 * @date         : 2016. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doGetSggBoundary : function(sidoCdList, index, map, callback) {
				$.ajax({
					type : "GET",
					url : contextPath + "/js/data/geo_sgg_"+map.bnd_year+"/geo_sgg_"+sidoCdList[index].sido_cd+"_"+map.bnd_year+".js",
					async : true,
					success : function(res) {
						if ($bizStatsLeftMenu.ui.curSelectedStatsType == "jobArea") {
							var geojson = map.addPolygonGeoJson(res, "polygon");
							if (map.multiLayerControl.dataGeojson == null) {
								map.multiLayerControl.dataGeojson = [];
							}
							map.multiLayerControl.dataGeojson.push(geojson);
							if (index >= sidoCdList.length-1) {
								if (callback != null && callback instanceof Function) {
									callback.call(undefined, null);
								}
								return;
							}
							index++;
							$bizStatsMap.ui.doGetSggBoundary(sidoCdList, index, map, callback);
						}
					},
					dataType: "json",
					error:function(e){}  
				});
			},
			
			
			/**
			 * 
			 * @name         : doCompanySidoIntro
			 * @description  : 업종밀집도정보를 조회한다.
			 * @date         : 2016. 06. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanyDensityIntro : function() {
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				$bizStatsMap.noReverseGeoCode = true;
				
				if ($bizStatsMap.ui.share_info_type == "bookmark") {
					//alert("[bizStatsMap.js] doCompanyDensityIntro $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
					map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]],10);
				} else {
					map.mapMove([1007770, 1855549], 2);
				}
				
				
				map.gMap.setMaxZoom(12);
				map.gMap.setMinZoom(2);
				map.gMap.scrollWheelZoom.enable();
				/*map.multiLayerControl.clear();
				map.multiLayerControl.dataGeojson = null;
				$bizStatsDataBoard.ui.mapData[map.id].type = "";*/
				
				$("#view"+viewId).find(".helperText").html("업종밀집도 변화");
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_inner").hide();
				$("#view"+viewId).find(".tb_report").parent().show();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$(".btn_legendSetting").hide();
				$("#legend_"+map.legend.id).show();
				
				$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "heat") {
						$(this).find("a").click();
					}
				});
				
				map.openApiBoundarySido(map.bnd_year);
			},
			
			
			/**
			 * 
			 * @name         : doCompanyOpenIntro
			 * @description  : 지자체 인허가 지도 초기화
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 */
			doCompanyOpenIntro : function() {
				
				//alert("[bizStatsMap.js] doCompanyOpenIntro 시작======");
				
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				$bizStatsMap.noReverseGeoCode = true;
				
				
				if ($bizStatsMap.ui.share_info_type == "bookmark") {
					//alert("[bizStatsMap.js] doCompanyOpenIntro $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
					map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]],10);
				} else {
					map.mapMove([1007770, 1855549], 2);
				}
				
				//alert("[bizStatsMap.js] $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
				//alert("[bizStatsMap.js] doCompanyOpenIntro() $bizStatsMap.ui.bookmark_mapcenter[0] [" + $bizStatsMap.ui.bookmark_mapcenter[0]);
				//alert("[bizStatsMap.js] doCompanyOpenIntro() map.center[0] [" + map.center[0]);
				
				
				//map.mapMove([1007770, 1855549], 2);
				
				map.gMap.setMaxZoom(12);
				map.gMap.setMinZoom(2);
				map.gMap.scrollWheelZoom.enable();
				/*map.multiLayerControl.clear();
				map.multiLayerControl.dataGeojson = null;
				$bizStatsDataBoard.ui.mapData[map.id].type = "";*/
				
				$("#view"+viewId).find(".helperText").html("업종별 개업 현황");
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_inner").hide();
				$("#view"+viewId).find(".tb_report").parent().show();
				$("#poi_"+map.mapBtnInfo.id).hide();
				$("#set_"+map.mapBtnInfo.id).hide();
				$("#map_"+map.mapBtnInfo.id).hide();
				$(".btn_legendSetting").hide();
				$("#legend_"+map.legend.id).show();
				
				$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "heat") {
						$(this).find("a").click();
					}
				});
				
				map.openApiBoundarySido(map.bnd_year);
				
				//alert("[bizStatsMap.js] doCompanyOpenIntro() map.center[0] [" + map.center[0]);
				
			},
			
			/**
			 * 
			 * @name         : doCompanyBestIntro
			 * @description  : 업종별 뜨는 지역 지도 초기화
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 */
			doCompanyBestIntro : function() {
				
				//console.log("[bizStatsMap.js] doCompanyBestIntro 시작======");
				
				var map = this.mapList[this.curMapId];
				var viewId = this.curMapId+1;
				this.clearIntroData(map);
				$bizStatsMap.noReverseGeoCode = true;
				
				
				if ($bizStatsMap.ui.share_info_type == "bookmark") {
					//alert("[bizStatsMap.js] doCompanyOpenIntro $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
					map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]],7);
				} else {
					map.mapMove([1007770, 1855549], 2);
				}
				
				//alert("[bizStatsMap.js] $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
				//alert("[bizStatsMap.js] doCompanyOpenIntro() $bizStatsMap.ui.bookmark_mapcenter[0] [" + $bizStatsMap.ui.bookmark_mapcenter[0]);
				//alert("[bizStatsMap.js] doCompanyOpenIntro() map.center[0] [" + map.center[0]);
				
				
				//map.mapMove([1007770, 1855549], 2);
				
				map.gMap.setMaxZoom(12);
				map.gMap.setMinZoom(2);
				map.gMap.scrollWheelZoom.enable();
				/*map.multiLayerControl.clear();
				map.multiLayerControl.dataGeojson = null;
				$bizStatsDataBoard.ui.mapData[map.id].type = "";*/
				
				$("#view"+viewId).find(".helperText").html("업종별 뜨는 지역");
				$("#view"+viewId).find(".tb_trade").hide();
				$("#view"+viewId).find(".tb_inner").hide();
				
				$("#bizStatsMapUrlShare").hide(); //URL공유하기 하이드
				$("#bizStatsMapBookmark").hide(); //북마크 하이드
				$("#view"+viewId).find(".tb_report").parent().hide(); //리포트 버튼
				$("#poi_"+map.mapBtnInfo.id).hide(); //POI
				$("#set_"+map.mapBtnInfo.id).hide(); //지도 오른쪽 상단의 설정버튼
				$("#map_"+map.mapBtnInfo.id).show(); //위성지도
				$(".btn_legendSetting").show(); //범례 설정버튼
				$("#legend_"+map.legend.id).show();
				
				/*
				$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					if ($(this).find("a").attr("data-type") == "heat") {
						$(this).find("a").click();
					}
				});
				*/
				
				map.openApiBoundarySido(map.bnd_year);
				
				//alert("[bizStatsMap.js] doCompanyOpenIntro() map.center[0] [" + map.center[0]);
				
			},
			
			/**
			 * 
			 * @name         : doNormalMapInit
			 * @description  : 노말지도로 초기화한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doNormalMapInit : function() {
				
				//alert("[bizStatsMap.js] doNormalMapInit 시작======");
				
				var map = this.mapList[this.curMapId];
				var id = this.curMapId+1;
				map.mapMode = "normal";
				this.clearIntroData(map);
				this.checkBlankLayer(map);
				map.isLayerMouseEventDisabled = false;
				map.legend.legendInit();
				$bizStatsDataBoard.ui.mapData[map.id].type = "";
				$bizStatsMap.noReverseGeoCode = false;
				$(".btn_legendSetting").show();
				
				//2016.09.06 9월 서비스
				$("#legendColor_"+map.legend.id).show();
				$("#everseBtn_"+map.legend.id).show();
				
				/*$("#lgTypeList_"+map.legend.id).find("li").each(function() {
					console.log($(this).find("a").attr("data-type"));
					if ($(this).find("a").attr("data-type") == "heat") {
						$(this).find("a").click();
					}
				});*/
	    		if ($bizStatsLeftMenu.ui.curSelectedStatsType == "userData") {
	    			$("#view"+id).find(".tb_report").parent().show();
	    		}else {
	    			$("#view"+id).find(".tb_report").parent().hide();
	    		}
			},
			
			/**
			 * 
			 * @name          : doReqSidoCompany
			 * @description   : 업종별 지역현황 정보를 요청한다.
			 * @date          : 2015. 11. 20. 
			 * @author	      : 권차욱
			 * @history 	  :
			 * @param themeCd : 테마코드
			 */
			doReqSidoCompany : function(adm_cd, themeCd, themeNm, idx) {
				var map = this.mapList[this.curMapId];
				$bizStatsMapApi.request.openApiSggCompanyCnt(adm_cd, themeCd, themeNm, map, idx);
			},
			
			/**
			 * 
			 * @name          : doReqCompanyDensity
			 * @description   : 업종밀집도변화 정보를 요청한다.
			 * @date          : 2015. 11. 20. 
			 * @author	      : 권차욱
			 * @history 	  :
			 * @param themeCd : 테마코드
			 */
			doReqCompanyDensity : function(themeCd, themeNm, year, params) {
				var tmpYear = "";
				var tmpParams;
				if (year == null || year == undefined) {
					 tmpYear = companyDataYear;
				}else {
					tmpYear = year
				}
				
				if (params != null && params != undefined) {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear
					};
					for (p in params) {
						if  (p == "adm_cd" || p == "sido_cd" || p == "sgg_cd") {
							if (p == "adm_cd" && params[p] == null) {
								break;
							}
							tmpParams[p] = params[p];
						}
					}
				}else {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear
					};
				}
				
				var map = this.mapList[this.curMapId];
				var type = "1";
				
				if (params != null && params != undefined) {
					if (params.adm_cd != undefined || params.adm_cd != null) {
						switch (params.adm_cd.length) {
							case 2:
								type = "2";
								map.gMap.setMaxZoom(7);
								break;
							case 5:
								type = "3";
								map.gMap.setMaxZoom(13);
								break;
							case 7:
								map.gMap.setMaxZoom(13);
								//2017.03.23 읍면동 레벨에서 데이터보드의 테마를 선택했을 시, 열지도가 변하지 않는 현상 수정
								if ($bizStatsDataBoard.ui.mapData[map.id].options.preLayer.theme_cd == themeCd && 
									$bizStatsDataBoard.ui.mapData[map.id].options.preLayer.year == year) {
									return;
								}else {
									tmpParams["adm_cd"] = params.adm_cd.substring(0,5);
									type = "3";
								}
								break;
							default:
								type = "1";
							map.gMap.setMaxZoom(3);
								break;
						}
						$("#jobChangeDiv > .mapBefore").show();
					}else {
						map.gMap.setMaxZoom(3);
						$("#jobChangeDiv > .mapBefore").hide();
					}
				}
				
				//alert("[bizStatsMap.js] type [" + type);
				//alert("[bizStatsMap.js] tmpParams [" + tmpParams);
				//alert("[bizStatsMap.js] map [" + map);
				
				$bizStatsMapApi.request.openApiPoiCompanyDensity(type, tmpParams, map, function() {
					
					if (map.zoom >= 9) {
						$bizStatsMap.ui.doConvertHeatMap(map, "dotMap");
					}
				});
			},
			
			
			/**
			 * 
			 * @name          : doReqCompanyOpen
			 * @description   : 지자체 인허가 업종별 개업 현황 정보를 요청한다.
			 * @date          : 2017. 5. 10. 
			 * @author	      : 김준하
			 * @history 	  :
			 * @param themeCd : 테마코드
			 */
			doReqCompanyOpen : function(themeCd, themeNm, year, params) {
				var tmpYear = "";
				var tmpParams;
				if (year == null || year == undefined) {
					 tmpYear = companyDataYear;
				}else {
					tmpYear = year
				}
				
				//alert("[bizStatsMap.js] params [" + params);
				
				if (params != null && params != undefined) {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear
					};
					for (p in params) {
						if  (p == "adm_cd" || p == "sido_cd" || p == "sgg_cd") {
							if (p == "adm_cd" && params[p] == null) {
								break;
							}
							tmpParams[p] = params[p];
						}
					}
				}else {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear
					};
				}
				
				var map = this.mapList[this.curMapId];
				var type = "1";
				
				if (params != null && params != undefined) {
					if (params.adm_cd != undefined || params.adm_cd != null) {
						switch (params.adm_cd.length) {
							case 2:
								type = "2";
								map.gMap.setMaxZoom(7);
								break;
							case 5:
								type = "3";
								map.gMap.setMaxZoom(13);
								break;
							case 7:
								map.gMap.setMaxZoom(13);
								
								//갤러리에서 넘어올때 $bizStatsDataBoard.ui.mapData[map.id].options.preLayer가 undefined이다.
								if($bizStatsDataBoard.ui.mapData[map.id].options.preLayer!=null && $bizStatsDataBoard.ui.mapData[map.id].options.preLayer!=undefined){
									//2017.03.23 읍면동 레벨에서 데이터보드의 테마를 선택했을 시, 열지도가 변하지 않는 현상 수정
									if ($bizStatsDataBoard.ui.mapData[map.id].options.preLayer.theme_cd == themeCd && 
										$bizStatsDataBoard.ui.mapData[map.id].options.preLayer.year == year) {
										return;
									}else {
										tmpParams["adm_cd"] = params.adm_cd.substring(0,5);
										type = "3";
									}
								} else {
									tmpParams["adm_cd"] = params.adm_cd.substring(0,5);
									type = "3";
								}
								
								break;
							default:
								type = "1";
							map.gMap.setMaxZoom(3);
								break;
						}
						$("#jobOpenDiv > .mapBefore").show();
					}else {
						map.gMap.setMaxZoom(3);
						$("#jobOpenDiv > .mapBefore").hide();
					}
				}
				
				$bizStatsMapApi.request.openApiPoiCompanyOpen(type, tmpParams, map, function() {
					
					//alert(map.center[0]);
					
					if (map.zoom >= 9) {
						
						if ("bookmark" == $bizStatsMap.ui.share_info_type) {
							//mapMove 후 콜백으로 doConvertHeatMap이 호출된다.
							map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
							//alert(map.center[0]);
							$bizStatsMap.ui.doConvertHeatMap(map, "dotMap");
						} else {
							$bizStatsMap.ui.doConvertHeatMap(map, "dotMap");
						}
						
						/*
						setTimeout(function() {
							if ("bookmark" == $bizStatsMap.ui.share_info_type) {
								map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
							}
						},300);
						*/
					}
					
					
				});
			},
			
			/**
			 * 
			 * @name          : doReqCompanyBest
			 * @description   : 업종별 뜨는 지역을 요청한다.
			 * @date          : 2017. 9. 18. 
			 * @author	      : 김준하
			 * @history 	  :
			 * @param themeCd : 테마코드
			 */
			doReqCompanyBest : function(themeCd, themeNm, year, params) {
				var tmpYear = "";
				var tmpParams;
				if (year == null || year == undefined) {
					 tmpYear = companyDataYear;
				}else {
					tmpYear = year
				}
				
				console.log("[bizStatsMap.js] doReqCompanyBest() params [" + params);
				/*
				if (params != null && params != undefined) {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear
					};
					for (p in params) {
						if  (p == "adm_cd" || p == "sido_cd" || p == "sgg_cd") {
							if (p == "adm_cd" && params[p] == null) {
								break;
							}
							tmpParams[p] = params[p];
						}
					}
				}else {
					tmpParams = {
							theme_cd : themeCd,
							year : tmpYear,
							
					};
				}
				*/
				
				tmpParams = {
						theme_cd : themeCd,
						year : tmpYear
				};
				for (p in params) {
					tmpParams[p] = params[p];
					
				}
				
				
				
				var map = this.mapList[this.curMapId];
				var type = "1";
				
				
				
				if (params != null && params != undefined) {
					if (params.adm_cd != undefined || params.adm_cd != null) {
						switch (params.adm_cd.length) {
							case 2:
								type = "2";
								map.gMap.setMaxZoom(7);
								break;
							case 5:
								type = "3";
								map.gMap.setMaxZoom(13);
								break;
							case 7:
								map.gMap.setMaxZoom(13);
								
								/*
								//갤러리에서 넘어올때 $bizStatsDataBoard.ui.mapData[map.id].options.preLayer가 undefined이다.
								if($bizStatsDataBoard.ui.mapData[map.id].options.preLayer!=null && $bizStatsDataBoard.ui.mapData[map.id].options.preLayer!=undefined){
									//2017.03.23 읍면동 레벨에서 데이터보드의 테마를 선택했을 시, 열지도가 변하지 않는 현상 수정
									if ($bizStatsDataBoard.ui.mapData[map.id].options.preLayer.theme_cd == themeCd && 
										$bizStatsDataBoard.ui.mapData[map.id].options.preLayer.year == year) {
										return;
									}else {
										tmpParams["adm_cd"] = params.adm_cd.substring(0,5);
										type = "3";
									}
								} else {
									tmpParams["adm_cd"] = params.adm_cd.substring(0,5);
									type = "3";
								}
								*/
								tmpParams["adm_cd"] = params.adm_cd.substring(0,5);
								type = "3";
								
								break;
							default:
								type = "1";
							map.gMap.setMaxZoom(13);
								break;
						}
						$("#jobBestDiv > .mapBefore").show();
					}else {
						map.gMap.setMaxZoom(12);
						$("#jobBestDiv > .mapBefore").hide();
					}
				}
				
				
				//mng_s 3개 지역 얻어오기
				$bizStatsMapApi.request.getCompanyBestArea(type, tmpParams, map);
				
				//$("#goJobBestFirstArea0").click();
			},
			
			/**
			 * 
			 * @name         : doPrevRegionInfo
			 * @description  : 이전 정보로 이동한다.
			 * @date         : 2016. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type	 : 메뉴타입
			 */
			doPrevRegionInfo : function(type) {
				var map = this.mapList[this.curMapId];
				var options = $bizStatsDataBoard.ui.mapData[map.id].options;
				switch (type) {
					case "jobChange":
						if (options != undefined && options != null) {
							var adm_cd, type;
							if (map.heatMap) {
								map.heatMap.setUTMKs([]);
							}
							if (map.geojson) {
								map.geojson.remove();
								map.geojson = null;
							}
							map.lastGeojsonInfo = null;
							switch (options.params.adm_cd.length) {
								case 2:
									$("#jobChangeDiv > .MapBefore").hide(); //2017.02.24
									type = "1";
									adm_cd = null;
									adm_nm = "전국";
									map.mapMove([options.preLayer.x, options.preLayer.y], 2, true);
									setTimeout(function() {
										map.openApiBoundarySido(map.bnd_year);
										var params = {
												theme_cd : options.dataBoard.themeCd,
												adm_cd : adm_cd,
												year : options.params.year
										};
										options.params.adm_cd = adm_cd;
										options.params.adm_nm = adm_nm;
										$bizStatsDataBoard.ui.updateDataBoard(options, "jobChange");
									},300);
									break;
								case 5:
								case 7:
									type = "2";
									adm_cd = options.preLayer.adm_cd;
									adm_nm = options.preLayer.adm_nm;
									map.mapMove([options.preLayer.x, options.preLayer.y], 5, true);
									setTimeout(function() {
										map.openApiBoundaryHadmarea (adm_cd, map.bnd_year, "1", null);
										var params = {
												theme_cd : options.dataBoard.themeCd,
												adm_cd : adm_cd,
												year : options.params.year
										};
										options.params.adm_cd = adm_cd;
										options.params.adm_nm = adm_nm;
										$bizStatsDataBoard.ui.updateDataBoard(options, "jobChange");
									},300);
									break;
							}
						}
						break;
						
						
					case "jobOpen": //지자체 인허가
						if (options != undefined && options != null) {
							var adm_cd, type;
							if (map.heatMap) {
								map.heatMap.setUTMKs([]);
							}
							if (map.geojson) {
								map.geojson.remove();
								map.geojson = null;
							}
							map.lastGeojsonInfo = null;
							switch (options.params.adm_cd.length) {
								case 2:
									$("#jobOpenDiv > .MapBefore").hide(); //2017.02.24
									type = "1";
									adm_cd = null;
									adm_nm = "전국";
									map.mapMove([options.preLayer.x, options.preLayer.y], 2, true);
									setTimeout(function() {
										map.openApiBoundarySido(map.bnd_year);
										var params = {
												theme_cd : options.dataBoard.themeCd,
												adm_cd : adm_cd,
												year : options.params.year
										};
										options.params.adm_cd = adm_cd;
										options.params.adm_nm = adm_nm;
										$bizStatsDataBoard.ui.updateDataBoard(options, "jobOpen");
									},300);
									break;
								case 5:
								case 7:
									type = "2";
									adm_cd = options.preLayer.adm_cd;
									adm_nm = options.preLayer.adm_nm;
									map.mapMove([options.preLayer.x, options.preLayer.y], 5, true);
									setTimeout(function() {
										map.openApiBoundaryHadmarea (adm_cd, map.bnd_year, "1", null);
										var params = {
												theme_cd : options.dataBoard.themeCd,
												adm_cd : adm_cd,
												year : options.params.year
										};
										options.params.adm_cd = adm_cd;
										options.params.adm_nm = adm_nm;
										$bizStatsDataBoard.ui.updateDataBoard(options, "jobOpen");
									},300);
									break;
							}
						}
						break;
					
					
				}
				
				
			},
			
			/**
			 * 
			 * @name         : clearIntroData
			 * @description  : 업종별 지역현황정보를 조회한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			clearIntroData : function(map) {
				var markerGroup = this.introMarkerManageInfo[map.id];
				var viewId = map.id+1;
				if (markerGroup != undefined) {
					for (var i=0; i<markerGroup.markers.length; i++) {
						var marker = markerGroup.markers[i].marker;
						marker.remove();
					}
					markerGroup = undefined;
				}
				
				
				if (this.introJobAreaMarkers != null && this.introJobAreaMarkers.length > 0) {
					for (var i=0; i<this.introJobAreaMarkers.length; i++) {
						var markers = this.introJobAreaMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
					this.introJobAreaMarkers = null;
				}
				
				//시군구별 생활업종 현황 독도 울릉도 추가
				if($bizStatsMap.ui.menuType == 1){
					html = "";
					html +=     "<div style='width:100px; text-align:center;font-weight:bold;font-size:12px;'>"+"독도"+"</div>";
					
					icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
					marker = sop.marker([1372094, 1927430], {
						icon : icon
					});
					marker.addTo(map.gMap);
					$bizStatsMap.ui.tmpMarkerGroup2.push({adm_cd : "37", marker:marker}); 
					
					
					
					html = "";
					html +=     "<div style='width:100px; text-align:center;font-weight:bold;font-size:12px;'>"+"울릉도"+"</div>";
					
					icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
					marker = sop.marker([ 1292094, 1969430 ], {
						icon : icon
					});
					marker.addTo(map.gMap); 
					$bizStatsMap.ui.tmpMarkerGroup2.push({adm_cd : "37", marker:marker});
					
					
					var tmpMarkers = {
							markers : $bizStatsMap.ui.tmpMarkerGroup2,
							deselectedMarker : null
						}
					$bizStatsMap.ui.introMarkerManageInfo[map.id] = tmpMarkers;
					
					
				} 
				
				map.clearDataOverlay();
				map.multiLayerControl.clear();
				if(map.geojson) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
				$publicDataBoard.ui.remove(this.curMapId);
				$mydataDataBoard.ui.remove(this.curMapId);
			},
			
			/**
			 * 
			 * @name         : checkBlankLayer
			 * @description  : blank 레이어를삭제한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkBlankLayer : function(map) {
				if (!map.isBlankLayer) {
					var viewId = map.id + 1;
					map.openApiBoundarySido(map.bnd_year);
					map.mapMode = "normal";
					map.gMap.removeLayer(map.blankLayer);
					map.tileLayer.addTo(map.gMap);
					map.setFixedBoundLevel(false);

					$("#view"+viewId).find(".tb_trade").show();
					$("#view"+viewId).find(".tb_inner").show();
					$("#view"+viewId).find(".tb_clear").parent().show();
					$("#view"+viewId).find(".tb_report").parent().show();
					$("#poi_"+map.mapBtnInfo.id).show();
					$("#set_"+map.mapBtnInfo.id).show();
					$("#map_"+map.mapBtnInfo.id).show();
					$("#legend_"+map.legend.id).show();
				}
			},
			
			
			/**
			 * 
			 * @name         : doAnalysisShareInfo
			 * @description  : 공유된 정보를 분석하여, 통계정보를 조회한다.
			 * @date         : 2016. 12. . 
			 * @author	     : 이정운
			 * @history 	 :
			 */
			doAnalysisShareInfo : function (type, data) {
				var dataArr = JSON.parse(data.param_info);
				var paramInfoArr = dataArr.paramInfo;
				var legendArr = dataArr.legend;
				var centerArr = dataArr.mapInfo.center;
				var zoomlevel = dataArr.mapInfo.zoomlevel;
				
				var curSelectedStatsType = dataArr.paramInfo.curSelectedStatsType;
				
				//북마크에서 넘어온 지도의 센터를 저장
				$bizStatsMap.ui.share_info_type = type;
				$bizStatsMap.ui.bookmark_mapcenter[0] = centerArr[0];
				$bizStatsMap.ui.bookmark_mapcenter[1] = centerArr[1];
				$bizStatsMap.ui.bookmark_zoom_level = zoomlevel;
				
				
				if (type == "bookmark" && legendArr.type == undefined) {
					legendArr.type = "color";
				}
				
				
				//alert("[bizStatsMap.js] curSelectedStatsType [" + curSelectedStatsType);
				//alert("[bizStatsMap.js] doAnalysisShareInfo() type [" + type);
				//alert("[bizStatsMap.js] doAnalysisShareInfo() legendArr.type [" + legendArr.type);
				
				var typeList = {
					"intro"  		: 0,	//시도별 생활업종 현황
					"jobArea" 		: 1,	//시군구별 생활업종 현활
					"jobChange"		: 2,	//업종 밀집도 현황
					"areaInfo"		: 3,	//생활업종 후보지 검색
					"areaSearch"	: 4,	//생활업종 후보지 정보 보기
					"publicData"	: 5,	//공공데이터
					"userData"		: 6,	//사용자데이터
					"jobOpen"		: 7		//지자체 인허가 업종별 개업 현황
				};
				
				this.quickBoxShowYn = "N"
				$bizStatsLeftMenu.ui.setDetailStatsPanel(curSelectedStatsType);
				this.quickBoxShowYn = "";
				var map = this.mapList[0];
				$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
				
				if ( type == "bookmark" ) {
					map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
					centerArr = [$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]];
				}
				//alert("[bizStatsMap.js] map.center[0] [" + map.center[0]);
				//alert("[bizStatsMap.js] curSelectedStatsType [" + curSelectedStatsType);
				//alert("[bizStatsMap.js] doAnalysisShareInfo() type [" + type);
				//alert("[bizStatsMap.js] doAnalysisShareInfo() legendArr.type [" + legendArr.type);
				
				setTimeout(function() {
					switch(typeList[curSelectedStatsType]) {
						case 0:
							setTimeout(function() {
								var adm_cd = dataArr.paramInfo.adm_cd;
								
								if (map.geojson != null) {
									map.geojson.eachLayer(function(layer) {
										if (layer.feature.properties.adm_cd == adm_cd) {
											var event = { target: layer };
											$bizStatsMap.callbackFunc.didSelectedPolygon(event, layer.feature,  layer.options.type, map);
										}
									});
								}
							}, 2000);
							break;
						case 1:
							//시군구별 생활업종 현황
							
							var title = dataArr.title;
							var themeCd = dataArr.paramInfo.theme_cd;
							var themeNm = dataArr.paramInfo.theme_nm;
							var admCd = dataArr.paramInfo.adm_cd;
							var admNm = dataArr.paramInfo.adm_nm;
							var jobAreaThemeCd = "";
							
							map.zoom = zoomlevel;
							map.center[0] = centerArr[0];
							map.center[1] = centerArr[1];
							
							var bizLegend_type = legendArr.type;
							
							
							//alert("[bizStatsMap.js] doAnalysisShareInfo() title [" + title);
							//alert("[bizStatsMap.js] doAnalysisShareInfo() themeCd [" + themeCd);
							//alert("[bizStatsMap.js] doAnalysisShareInfo() themeNm [" + themeNm);
							//alert("[bizStatsMap.js] doAnalysisShareInfo() admCd [" + admCd);
							//alert("[bizStatsMap.js] doAnalysisShareInfo() admNm [" + admNm);
							
							
							$(".bizLegendBox > div").each(function(){
								if($(this).hasClass("bizLegend_"+bizLegend_type)){
									if(!$(this).hasClass("on")){
										$(this).addClass("on");
									}
								}else{
									if($(this).hasClass("on")){
										$(this).removeClass("on");
									}
								}
							});
							
							//Left메뉴 선택
							$("input[name='rd_service']").each(function() {		//서비스
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='rd_retail']").each(function() {		//도소매
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='rd_hotel']").each(function() {		//숙박업
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='rd_food']").each(function() {		//음식점
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							
							setTimeout(function() {
								
								var dataBoard = $bizStatsDataBoard.ui;
								var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
								
								
								
								//데이터보드 조회조건이 undefined일 경우 초기화
								if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
									dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
								}
							
								
								dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = jobAreaThemeCd !=""? jobAreaThemeCd : themeCd;	//테마코드
								setTimeout(function() {
									$bizStatsMap.ui.doReqSidoCompany(jobAreaThemeCd, themeCd, themeNm);
									$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+themeNm, viewId);
								}, 2000);
								if("bubble" == bizLegend_type){ //버블차트	
									setTimeout(function() {
										if(dataArr.paramInfo.jobAreaThemeCd){
											jobAreaThemeCd = dataArr.paramInfo.jobAreaThemeCd;
										}
										var adm_cd = dataArr.paramInfo.adm_cd;
											if (map.multiLayerControl.dataGeojson != null) {
												for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
													map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
														if (layer.feature.properties.adm_cd == adm_cd) {
															layer.options.adm_cd = layer.feature.properties.adm_cd;
															layer.options.adm_nm = layer.feature.properties.adm_nm;
															var event = { target: layer };
															$bizStatsMap.callbackFunc.didSelectedPolygon(event, $bizStatsMap.ui.introJobAreaMarkers, "jobArea", map);
														}
													});
												}
											}
//											if (dataArr.paramInfo.adm_cd != undefined) {	
//												for (var i=0; i<$bizStatsMap.ui.introJobAreaMarkers.length; i++) {
//													var group = $bizStatsMap.ui.introJobAreaMarkers[i];
//													if (group.sido_cd == dataArr.paramInfo.adm_cd.substring(0,2)) {
//														for (var k=0; k<group.markers.length; k++) {
//															var marker = group.markers[k];
//															if (marker.options.adm_cd = dataArr.paramInfo.adm_cd) {
//																marker.fire("click");
//																break;
//															}
//														}
//														break;
//													}
//												}
//											}
									}, 2000);
								}else if("color" == bizLegend_type){	//색상차트
									setTimeout(function() {
										//지역 클릭 - 시군구별 데이터 보드 차트
										if(dataArr.paramInfo.jobAreaThemeCd){
											jobAreaThemeCd = dataArr.paramInfo.jobAreaThemeCd;
										}
											if(jobAreaThemeCd !="" && admCd != ""){
												if(admCd==undefined || admCd =="") admCd = jobAreaThemeCd;
												
												var options = {
														params : {
															map : map,
															theme_cd : themeCd,
															theme_nm : themeNm,
															adm_cd : admCd,
															adm_nm : admNm,
															x : centerArr[0],
															y : centerArr[1]
														},
														themeCd : themeCd,
														themeNm : themeNm
												}
												$bizStatsDataBoard.ui.updateDataBoard(options, "jobArea");
												$("#view"+(map.id+1)).find(".tb_report").parent().show();
											}
									}, 2000);
								}
							}, 3000);
							break;
						case 2:
							//업종 밀집도 현황
							var themeCd = dataArr.paramInfo.theme_cd;
							var themeNm = dataArr.paramInfo.theme_nm;
							//Left메뉴 선택
							$("input[name='rd_service']").each(function() {		//서비스
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='rd_retail']").each(function() {		//도소매
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='rd_hotel']").each(function() {		//숙박업
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='rd_food']").each(function() {		//음식점
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							
							map.zoom = zoomlevel;
							map.center[0] = centerArr[0];
							map.center[1] = centerArr[1];
							
							setTimeout(function() {
								
								var dataBoard = $bizStatsDataBoard.ui;
								var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
								//데이터보드 조회조건이 undefined일 경우 초기화
								if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
									dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
								}
								dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
								$bizStatsMap.ui.doReqCompanyDensity(themeCd, themeNm);
								$bizStatsMap.ui.setTitle("업종밀집도 변화 > "+themeNm, viewId);
								$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
								//최초조회 시 전국정보 팝업
								var options = {
										params : {
											adm_cd : dataArr.paramInfo.adm_cd,
											adm_nm : dataArr.paramInfo.adm_nm,
											map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
											year : dataArr.paramInfo.year
										},
										dataBoard : {
											jobAreaThemeCd : themeCd
										},
										etc : {
											themeCd : themeCd,
											curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
											year : dataArr.paramInfo.year
										}
								}
																
								$bizStatsDataBoard.ui.updateDataBoard(options, "jobChange");
							}, 2000);
							break;
						case 3:
							var tmpOption = {
								api_call_url : "/OpenAPI3/stats/population.json",
								map : map,
								param_info : {
									adm_nm : paramInfoArr.adm_nm,
									api_id : dataArr.api_id,
									isKosis : paramInfoArr.isKosis,
									mapInfo : {
										center : centerArr,
										zoomlevel : zoomlevel 										
									},
									paramInfo : {
										adm_cd : paramInfoArr.adm_cd,
										bnd_year : paramInfoArr.bnd_year,
										low_search : paramInfoArr.low_search,
										year : paramInfoArr.year
									},
									showData : dataArr.paramInfo.showData,
									title : paramInfoArr.title,
									unit : paramInfoArr.unit
								}
							}
							
							var params = {
									params : {
										adm_cd : paramInfoArr.adm_cd,
										adm_nm : paramInfoArr.adm_nm,
										map : map,
										year : paramInfoArr.year,
										center : centerArr,
										zoom : map.zoom
									},
									type : "areaInfo"
							};
							
							
							$bizStatsMap.ui.curDropParams[map.id] = params;
							$bizStatsDataBoard.ui.updateDataBoard(params, "areaInfo");
							$("#view"+(map.id+1)).find(".tb_report").parent().show();

							setTimeout(function() {
								$bizStatsMapApi.request.openApiBizStats(tmpOption);
								if ($bizStatsMap.ui.share_info_type == "bookmark") {
									map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
								}
							}, 3000);
							break;
						case 4:
							
							map.zoom = zoomlevel;
							map.center[0] = centerArr[0];
							map.center[1] = centerArr[1];
							
							var namesArr = paramInfoArr.title.split("   ");
							
							var tmpOption = {
									adm_cd : paramInfoArr.adm_cd,
									adm_nm: paramInfoArr.adm_nm,
									api_id: dataArr.api_id,
									filterParam: {},
									idx : 0,
									map : map,
									names : namesArr,
									noneParams : {},
									params : paramInfoArr.codeParams,
									title: paramInfoArr.title.replace("   ", " + "),
									type: paramInfoArr.type,
									unit: paramInfoArr.unit,
									view_type: paramInfoArr.view_type
								}
							
							var tmpArParam = {
									filterParam: {},
									idx : 0,
									names : namesArr,
									noneParams : {},
									params : paramInfoArr.codeParams,
									title: paramInfoArr.title.replace("   ", " + "),
									unit: paramInfoArr.unit
								}
							
							setTimeout(function() {
								
								$bizStatsLeftMenu.ui.arParamList = [];
								$bizStatsLeftMenu.ui.arParamList.push(tmpArParam);
								
								$bizStatsLeftMenu.ui.createSearchBtn(curSelectedStatsType);
								$bizStatsLeftMenu.ui.searchbtnCnt++;
								
								$bizStatsMapApi.request.openApiPplSummary(tmpOption);
							}, 2000);
							break;
						case 5:
							break;
						case 6:
							break;
							
						case 7:
							//지자체 인허가 업종별 개업 현황
							var themeCd = dataArr.paramInfo.theme_cd;
							var themeNm = dataArr.paramInfo.theme_nm;
							
							//Left메뉴 선택
							$("input[name='jj_culture']").each(function() {		//문화
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='jj_tour']").each(function() {		//관광
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='jj_food']").each(function() {		//식품
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='jj_service']").each(function() {		//소상공인
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							$("input[name='jj_sanup']").each(function() {		//산업
								if($(this).val() == themeCd ) {
									$(this).attr("checked", "checked");
								}else{
									$(this).removeAttr("checked");
								}
							});
							
							map.zoom = zoomlevel;
							
							//alert("[bizStatsMap.js] type [" + type);
							//alert("[bizStatsMap.js] centerArr[0] [" + centerArr[0]);
							//alert("[bizStatsMap.js] centerArr[1] [" + centerArr[1]);
							
							map.center[0] = centerArr[0];
							map.center[1] = centerArr[1];
							
							/*
							//북마크에서 넘어온 지도의 센터를 저장
							$bizStatsMap.ui.share_info_type = type;
							$bizStatsMap.ui.bookmark_mapcenter[0] = centerArr[0];
							$bizStatsMap.ui.bookmark_mapcenter[1] = centerArr[1];
							$bizStatsMap.ui.bookmark_zoom_level = zoomlevel;
							*/
							
							setTimeout(function() {
								
								var dataBoard = $bizStatsDataBoard.ui;
								var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
								//데이터보드 조회조건이 undefined일 경우 초기화
								if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
									dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
								}
								dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
								
								if (type == "bookmark") {
									
								} else {
									$bizStatsMap.ui.doReqCompanyOpen(themeCd, themeNm);
								}
								
								
								$bizStatsMap.ui.setTitle("업종별 개업 현황 > "+themeNm, viewId);
								$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
								//최초조회 시 전국정보 팝업
								var options = {
										params : {
											adm_cd : dataArr.paramInfo.adm_cd,
											adm_nm : dataArr.paramInfo.adm_nm,
											map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
											year : dataArr.paramInfo.year
										},
										dataBoard : {
											jobAreaThemeCd : themeCd
										},
										etc : {
											themeCd : themeCd,
											curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
											year : dataArr.paramInfo.year
										}
								}
																
								$bizStatsDataBoard.ui.updateDataBoard(options, "jobOpen");
							}, 2000);
							break;

					}
				}, 300);
			},   //end of doAnalysisShareInfo()
			
			/**
			 * 
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 2015. 12. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doDone : function(type) {
				
				//alert("[bizStatsMap.js] doDone() 시작 =====");
				
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
					map.shareInfo.doBookMark($("#savesubj").val(), "BMAP");
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
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
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
							title = $.trim(shareData[i].title);
							
							//2017.02.22 이미지캡쳐 수정
							var captureTargetId = "#mapRgn_"+type;
							
							//2016.10.25 lbdms 캡쳐를 위한 정보 수정
							if (shareData[i].params != undefined) {
								if (shareData[i].params.mapInfo != undefined) {
									shareData[i].params.mapInfo.center = map.center;
									shareData[i].params.mapInfo.zoomlevel = map.zoom;
								}
								//2017.02.22 이미지캡쳐 수정
								shareData[i].params["mapCaptureId"] = captureTargetId;
							}
							
							//나의 데이터인 경우
							if (shareData[i].params.type == "userData") {
								var value = "";
								for (var k=1; k<=4; k++) {
									$("#dbTypeCk0"+k).each(function() {
										if ($(this).is(":checked")) {
											value = $(this).val();
										}
									});
								}
								shareData[i].params.paramInfo["type"] = value;
							}
						}
						
						//갤러리 등록일 경우
						if (srvType != undefined && srvType != "BMAP") {
							switch (srvType) {
								case "gallary":
									var captureTargetId = "#mapRgn_"+type;
									$galleryAdd.map = map;
									$galleryAdd.makeImageURL("BMAP", captureTargetId);
									break;
								case "report":
									this.reportPopup.$reportFormEvent.UI.makeImageURL("BMAP");
									break;
							}
							return;
						} 
						
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
			 * @name         : shareToKakaoStory
			 * @description  : 카카오스토리 공유를 수행한다.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param		 : 
			 * @param    	 : 
			 */
			shareToKakaoStory : function() {
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var linkUrl = $("#sharedlg").find($("input")).val();
				shareInfo.doShareToKakaoStory(linkUrl);
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
				if (type == "mini") {
					return;
				}
				
				var html = "<div style='margin:10px;'>";
				if (type == "data") {
					if (data.info.length > 0) {
						for (var i = 0; i < data.info.length; i++) {
							var tmpData = data.info[i];	
							if (i == 0) {
								if (tmpData.adm_nm !== undefined) {
									html += "<div class='admName'>"
											+ tmpData.adm_nm 
											+ "</div>"
								}
							}
							for (key in tmpData) {
								if (key == tmpData.showData) {
									var value;
									// 2016. 03. 24 j.h.Seok modify
									//2017.02.23 N/A제거
									/*if (parseFloat(tmpData[tmpData.showData]) < 5 && (tmpData.showData != "corp_cnt" && tmpData.showData != "tot_worker")) {
										value = "N/A";
									}else {*/
										value = appendCommaToNumber(tmpData[tmpData.showData]);
									//}
									html += "<tr><td class='statsData'>"
											+ value;
									if (value != "N/A") {
										html += " ("+ tmpData.unit +")";
									}
									html +=	"</td></tr>";
								}
							}				
						}

					} else {
						html += "<div class='statsData'>N/A</div>";
					}
				} else if (type == "intro") {
					html += "<span style='font-size:11px;'>해당 지역을 누르면, 상세정보를 보실 수 있습니다.<span>";
				} else if (type == "jobChange") {
					html += "<span style='font-size:11px;'>해당 지역을 누르면, 밀집도정보를 보실 수 있습니다.<span>";
				} else if (type == "jobOpen") {
					
					if(data.properties.adm_cd.length<=2) { //전국 지도일 때만 보여준다.
						html += "<span style='font-size:11px;'>해당 지역을 누르면, 개업 현황 정보를 보실 수 있습니다.<span>";
					} else {
						html += "<div class='admName'>"
							+ data.properties.adm_nm 
							+ "</div>";
					}
				}
				html += "</div>";
				
				// 2017.03.27j 업종밀집도변화 선택시 조건검색안했는데도 지도에 tooltip 뜨는것을 방지
				if($(".jobArea_stepBox li input[type=checkbox]").is(":checked") || type == "intro" || type == "data" || type == "jobOpen"){ //mng_s				
					event.target.bindToolTip(html, {
						direction: 'right',
						noHide:true,
						opacity: 1
	
					}).addTo(map.gMap)._showToolTip(event);
				}
				
				$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
				$(".admName_mini")
					.css("font-size", "10px")
					.css("color", "#3792de");
			},
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			requestOpenApi : function(options) {
				var type = {
						"jobChange"  : 0,	//업종밀집도
						"jobOpen"  : 7,	//지자체 인허가
						"jobBest"  : 8,	//업종별 뜨는 지역
						"areaInfo"	 : 1,	//지역종합정보
						"areaSearch" : 2	//지역찾기
				};
				var reqType = {
						"company" 	 : 0,	//사업체검색
						"population" : 1,	//인구검색
						"household"  : 2,	//가구검색
						"house"  	 : 3	//주택검색
				};
				
				var map = options.params.map;
				if(options.type == "areaSearch") {	//지역찾기일 경우 options 아래 map이 있음
					map = options.map;
				}
				
				switch(type[options.type]) {
					case 0:
						var tmpType = "1";
						var params = {};
						switch (parseInt(map.curPolygonCode)) {
							case 2:
								tmpType = "1";
								params  = {
										theme_cd : options.dataBoard.themeCd,
										year : options.params.year
								};
								break;
							case 3:
								tmpType = "2";
								params  = {
										theme_cd : options.dataBoard.themeCd,
										year : options.params.year,
										adm_cd : map.curSidoCd
								};
								break;
							default:
								tmpType = "3";
								params  = {
										theme_cd : options.dataBoard.themeCd,
										year : options.params.year,
										adm_cd : map.curSidoCd + map.curSiggCd
								};
								break;
						}
						
						map.legend.removeDataOverlay();
						$bizStatsMapApi.request.openApiPoiCompanyDensity(tmpType, params, map, function() {
							if (map.zoom >= 9) {
								$bizStatsMap.ui.doConvertHeatMap(map, "dotMap");
							}
						});
						break;
					
					case 7:
						var tmpType = "1";
						var params = {};
						switch (parseInt(map.curPolygonCode)) {
							case 2:
								tmpType = "1";
								params  = {
										theme_cd : options.dataBoard.themeCd,
										year : options.params.year
								};
								break;
							case 3:
								tmpType = "2";
								params  = {
										theme_cd : options.dataBoard.themeCd,
										year : options.params.year,
										adm_cd : map.curSidoCd
								};
								break;
							default:
								tmpType = "3";
								params  = {
										theme_cd : options.dataBoard.themeCd,
										year : options.params.year,
										adm_cd : map.curSidoCd + map.curSiggCd
								};
								break;
						}
						
						map.legend.removeDataOverlay();
						$bizStatsMapApi.request.openApiPoiCompanyOpen(tmpType, params, map, function() {
							if (map.zoom >= 9) {
								$bizStatsMap.ui.doConvertHeatMap(map, "dotMap");
							}
						});
						break;
						
					case 1:
						var params = {
							"adm_cd" : options.params.adm_cd,
							"year" : dataYear, //"2010", 2016.09.06 9월 서비스
							"bnd_year" : bndYear,
							"area_type" : 0,
							"low_search" : 1
						};
						var url = null;
						var api_id = null;
						var filter = null;
						var unit = null;
						var zoom = null;
						switch(reqType[options.reqType]) {
							case 0:
								params = {
									"adm_cd" : options.params.adm_cd,
									"year" : companyDataYear,//"2014", 2016.09.06 9월 서비스
									"bnd_year" : bndYear,
									"low_search" : 1
								};
								api_id = "API_0301";
								filter = "corp_cnt";
								unit = "개";
								url = $bizStatsMapApi.request.API_0301_URL;
								break;
							case 1:
								api_id = "API_0302";
								filter = "population";
								unit = "명"; 
								url = $bizStatsMapApi.request.API_0302_URL;
								break;
							case 2:
								api_id = "API_0305";
								filter = "household_cnt";
								unit = "가구";
								url = $bizStatsMapApi.request.API_0305_URL;
								break;
							case 3:
								api_id = "API_0306";
								filter = "house_cnt";
								unit = "호"; 
								url = $bizStatsMapApi.request.API_0306_URL;
								break;
						}
						var statInfo = {
								api_call_url : url,
								param_info : {
									api_id : api_id,
									isKosis : false,
									mapInfo : {
										center : options.params.center,
										zoomlevel : options.params.zoom
									},
									paramInfo : params,
									showData : filter,
									title : "",
									unit : unit,
									adm_nm : options.params.adm_nm
								},
								map : map
						}
						map.lastGeojsonInfo = null;
						this.curDropParams[map.id] = statInfo;
						$bizStatsMapApi.request.openApiStatBaseYearProcess(api_id, params, {info:statInfo});
						
						break;
						
					case 2:
						$bizStatsMapApi.request.openApiPplSummary(options);
						break;
				}
			},
			
			/**
			 * 
			 * @name         : reqSetParams
			 * @description  : 통계정보 파라미터를 설정한다.
			 * @date         : 2015. 10. 30. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			reqSetParams : function (tmpParam, adm_cd, adm_nm, api_id, map) {
				var params = {
						param : tmpParam.params,
						noneParams : tmpParam.noneParams,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						filter : tmpParam.filterParam,
						unit : tmpParam.unit,
						title : tmpParam.title,
						api_id : api_id,
						map : map,
						view_type : "NM",
						maxYear : tmpParam.maxYear
				};	
				params.param.push({
					key : "low_search",
					value : map.boundLevel
				});
				
				return params;
			},
			
			/**
			 * 
			 * @name         : deSelectedIntroMarker
			 * @description  : 인트로화면의 경계 deselected 시 마커를 다시 설정한다.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			deSelectedIntroMarker : function(layer, map) {
				var markerGroup = this.introMarkerManageInfo[map.id];
				if (markerGroup.deselectedMarker != null) {
					var marker = markerGroup.deselectedMarker.marker;
					var adm_cd = markerGroup.deselectedMarker.adm_cd;
					var tmpMarkerList = [];
					for (var i=0; i<markerGroup.markers.length; i++) {
						var tmpLayer = markerGroup.markers[i];
						if (tmpLayer.adm_cd == adm_cd) {
							tmpLayer.marker.remove();
							var utmk_x = tmpLayer.marker._utmk.x;
							var utmk_y = tmpLayer.marker._utmk.y;
							var markerIcon = sop.icon({
								iconUrl: '/img/ico/ico_mapIcon.png',
								iconAnchor: [16.5, 45 ],
								iconSize: [ 33, 45 ],
								infoWindowAnchor: [1, -45]
							});
							var marker = sop.marker([utmk_x, utmk_y], {
								icon: markerIcon
							});
							marker.addTo(map.gMap);	
							tmpMarkerList.push({
								adm_cd : tmpLayer.adm_cd,
								marker : marker
							});
						}else {
							tmpMarkerList.push(tmpLayer);
						}
					}
					this.introMarkerManageInfo[map.id].markers = tmpMarkerList;
				}
			},
			
			/**
			 * 
			 * @name         : selectedIntroMarker
			 * @description  : 인트로화면의 경계 selected 시 마커를 다시 설정한다.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			selectedIntroMarker : function(layer, map) {
				var tmpMarkerList = [];
				var markerGroup = this.introMarkerManageInfo[map.id];
				for (var i=0; i<markerGroup.markers.length; i++) {
					var tmpLayer = markerGroup.markers[i];
					if (tmpLayer.adm_cd == layer.feature.properties.adm_cd) {
						tmpLayer.marker.remove();
						var utmk_x = layer.feature.properties.x;
						var utmk_y = layer.feature.properties.y;
						var markerIcon = sop.icon({
							iconUrl: '/img/ico/ico_mapIcon_on.png',
							iconAnchor: [16.5, 45 ],
							iconSize: [ 33, 45 ],
							infoWindowAnchor: [1, -45]
						});
						var tmpMarker = sop.marker([utmk_x, utmk_y], {
							icon: markerIcon
						});
						tmpMarker.bindInfoWindow("<div>"+ layer.feature.properties.adm_nm +"</div>");
						tmpMarker.addTo(map.gMap);
						tmpMarker.openInfoWindow();

						var markerInfo = {
							adm_cd : tmpLayer.adm_cd,
							marker : tmpMarker
						};
						markerGroup.deselectedMarker = markerInfo;
						tmpMarkerList.push(markerInfo);
					}else {
						tmpMarkerList.push(tmpLayer);
					}

				}
				this.introMarkerManageInfo[map.id].markers = tmpMarkerList;
				map.curSelectedLayer = layer;
			},
			
			/**
			 * 
			 * @name         : doConvertHeatMap
			 * @description  : 줌레벨에 따라 heatMap <-> dotMap을 수행한다.
			 * @date         : 2015. 11. 24. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param map    : map 객체
			 * @param type	 : heatMap, dotMap
			 */
			doConvertHeatMap : function(map, type) {
				/*if (type != this.heatMapList[map.id].type) {*/
					//map.legend.removeDataOverlay();
				/*
				if ("bookmark" == $bizStatsMap.ui.share_info_type) {
					map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
				}
				*/
				
				//alert("[bizStatsMap.js] doConvertHeatMap $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
				//alert("[bizStatsMap.js] doConvertHeatMap type [" + type);
				//alert("[bizStatsMap.js] doConvertHeatMap() this.curMapId [" + this.curMapId);
				
				
					if (map.legend.circleMarkerGroup != null) {
			    		for (var i=0; i<map.legend.circleMarkerGroup.length; i++) {
				    		var marker = map.legend.circleMarkerGroup[i];
				    		marker.remove();
				    	}
			    		map.legend.circleMarkerGroup = null;
			    	}
					if (map.legend.circleMarkerGroup == null) {
						map.legend.circleMarkerGroup = [];
					}
					this.heatMapList[map.id].type = type;
					if (map.heatMap) {
						map.heatMap.setUTMKs([]);
					}
					var dataList = this.heatMapList[map.id];
					
					
					//alert("map.center[0] [" + map.center[0]);
					//alert("this.heatMapList[map.id] [" + this.heatMapList[map.id]);
					//alert("[bizStatsMap.js] type [" + type);
					//alert("[bizStatsMap.js] dataList.data.length [" + dataList.data.length);
					
					if (type == "dotMap") {
						
						//alert("[bizStatsMap.js] doConvertHeatMap $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
						//alert("[bizStatsMap.js] dataList.data.length [" + dataList.data.length);
						
						for (var i=0; i<dataList.data.length; i++) {
							var x = dataList.data[i].x;
							var y = dataList.data[i].y;
							var toolTip  = "<div style='margin:10px;'>";
				    			toolTip += 		"<div>";
				    			toolTip += 			"<a style='font-size:14px;font-weight:bold;color:#3792de;'>"+ dataList.data[i].corp_nm +"</a>";
				    			toolTip +=		"</div>";
				    			toolTip +=		"<div style='height:5px;'></div>";
				    			//toolTip += 		"<div style='font-size:12px;'>";
				    			//toolTip += 			"<a>"+ dataList.data[i].naddr +"</a>";
				    			//toolTip +=		"</div>";
				    			toolTip += 		"<div style='font-size:12px;'>";
				    			toolTip += 			"<a>"+ dataList.data[i].theme_nm +"</a>";
				    			toolTip +=		"</div>";
				    			toolTip += "</div>";
			    				
				    		var marker = map.addCircleMarker(x, y, {
				    			radius : map.legend.legendDotRadius,
				    			color : map.legend.legendColor1,
				    			fillColor : map.legend.legendColor1,
				    			tooltipMsg : toolTip 
				    		});
				    		map.legend.circleMarkerGroup.push(marker);
						}
						map.legend.setLegendParams("dot", map.legend.legendColor, map.legend.lv);
					}else {
						for (var i=0; i<dataList.data.length; i++) {
							var x = dataList.data[i].x;
							var y = dataList.data[i].y;
							map.addHeatMap(x, y, 1);
						}
						map.legend.setLegendParams("heat", map.legend.legendColor, map.legend.lv);
					}
				/*}*/
					
					
					
					
			},
			
			/**
			 * 
			 * @name         : companyDensityClick
			 * @description  : 업종별 밀집도보기 선택시, 설정을 수행한다.
			 * @date         : 2015. 11. 25. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param themeCd: 테마코드
			 * @param admCd	 : 행정동코드
			 * @param admNm  : 행정동이름
			 * @param x_coord: 행정동 x좌표
			 * @param y_coord: 행정동 y좌표
			 */
			companyDensityClick : function(themeCd, admCd, admNm, x_coord, y_coord, type) {
				var map = this.mapList[this.curMapId];
				var tmpEtc = null;
				if ($bizStatsDataBoard.ui.mapData[map.id].etc != undefined) {
					tmpEtc = deepCopy($bizStatsDataBoard.ui.mapData[map.id].options.etc);
				}else {
					tmpEtc = {
							themeCd : themeCd
					}
				}
				var params = {
						params : {
							adm_cd : admCd,
							theme_cd : themeCd,
							adm_nm : admNm,
							map : map,
						},
						etc : tmpEtc,
						type : "jobChange"
				};
				
				if (type != undefined && type == "jobArea") {
					//intro 백지도에서 일반지도로 변경한다.
					map.mapMode = "normal";
					map.isBlankLayer = false;
					map.isMultiSelectedBound = false;
					map.isLayerMouseEventDisabled = false;
					this.clearIntroData(map);
					this.checkBlankLayer(map);
					map.mapMove([x_coord, y_coord], 7);
				}
				
					
				//선택된 테마코드를 left메뉴에 강제로 선택되게 한다.
				$("input[name='rd_service']").each(function() {		//서비스
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				$("input[name='rd_retail']").each(function() {		//도소매
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				$("input[name='rd_hotel']").each(function() {		//숙박업
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				$("input[name='rd_food']").each(function() {		//음식점
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				
				//무조건 시군구데이터 이므로 강제로 줌레벨을 시군구레벨로 이동시킨다.
				//drop할때와 마찬가지로 drop정보를 설정한다.
				//map.setZoom(5);
				/*map.dropInfo = {
						center : [x_coord, y_coord],
						zoom : 5
				};
				this.curDropParams[map.id] = params;*/
				$bizStatsDataBoard.ui.updateDataBoard(params, "jobChange");
			},
			
			/**
			 * 
			 * @name         : companyOpenClick
			 * @description  : 지자체 인허가 업종별 개업 현황 선택시, 설정을 수행한다.
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 * @param themeCd: 테마코드
			 * @param admCd	 : 행정동코드
			 * @param admNm  : 행정동이름
			 * @param x_coord: 행정동 x좌표
			 * @param y_coord: 행정동 y좌표
			 */
			companyOpenClick : function(themeCd, admCd, admNm, x_coord, y_coord, type) {
				
				//alert("[bizStatsMap.js] companyOpenClick() type [" + type);
				
				var map = this.mapList[this.curMapId];
				var tmpEtc = null;
				if ($bizStatsDataBoard.ui.mapData[map.id].etc != undefined) {
					tmpEtc = deepCopy($bizStatsDataBoard.ui.mapData[map.id].options.etc);
				}else {
					tmpEtc = {
							themeCd : themeCd
					}
				}
				var params = {
						params : {
							adm_cd : admCd,
							theme_cd : themeCd,
							adm_nm : admNm,
							map : map,
						},
						etc : tmpEtc,
						type : "jobOpen"
				};
				
				if (type != undefined && type == "jobArea") {
					//intro 백지도에서 일반지도로 변경한다.
					map.mapMode = "normal";
					map.isBlankLayer = false;
					map.isMultiSelectedBound = false;
					map.isLayerMouseEventDisabled = false;
					this.clearIntroData(map);
					this.checkBlankLayer(map);
					map.mapMove([x_coord, y_coord], 7);
				}
				
					
				//선택된 테마코드를 left메뉴에 강제로 선택되게 한다.
				$("input[name='jj_culture']").each(function() {		//문화체육
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				$("input[name='jj_tour']").each(function() {		//관광
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				$("input[name='jj_food']").each(function() {		//식품
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				$("input[name='jj_service']").each(function() {		//소상공인
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				$("input[name='jj_sanup']").each(function() {		//산업고용
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				
				//무조건 시군구데이터 이므로 강제로 줌레벨을 시군구레벨로 이동시킨다.
				//drop할때와 마찬가지로 drop정보를 설정한다.
				//map.setZoom(5);
				/*map.dropInfo = {
						center : [x_coord, y_coord],
						zoom : 5
				};
				this.curDropParams[map.id] = params;*/
				$bizStatsDataBoard.ui.updateDataBoard(params, "jobOpen");
			},
			
			/**
			 * 
			 * @name         : regionComplexClick
			 * @description  : 지역 종합현황보기 선택시, 설정을 수행한다.
			 * @date         : 2015. 11. 25. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param admCd	 : 행정동코드
			 * @param admNm  : 행정동이름
			 * @param x_coord: 행정동 x좌표
			 * @param y_coord: 행정동 y좌표
			 */
			regionComplexClick : function(admCd, admNm, x_coord, y_coord) {
				var map = this.mapList[this.curMapId];
				var params = {
						params : {
							adm_cd : admCd,
							adm_nm : admNm,
							zoom : 5,
							center : [x_coord, y_coord],
							map : map
						},
						type : "areaInfo"
				};
				
				//intro 백지도에서 일반지도로 변경한다.
				map.mapMode = "normal";
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				map.isLayerMouseEventDisabled = false;
				this.clearIntroData(map);
				this.checkBlankLayer(map);
				
				//무조건 시군구데이터 이므로 강제로 줌레벨을 시군구레벨로 이동시킨다.
				//drop할때와 마찬가지로 drop정보를 설정한다.
				map.setZoom(5);
				map.dropInfo = {
						center : [x_coord, y_coord],
						zoom : 5
				};

				map.legend.legendInit();
				this.curDropParams[map.id] = params;
				setTimeout(function() {
					$bizStatsDataBoard.ui.updateDataBoard(params, "areaInfo");
				}, 500);
				
				
				
			},
			
			
			/**
			 * 
			 * @name         : regionSelectClick
			 * @description  : 지역을 선택한다.
			 * @date         : 2016. 06. 23. 
			 * @author	     : 민준홍.
			 * @history 	 :
			 * @param admCd	 : 행정동코드
			 * @param admNm  : 행정동이름
			 * @param x_coord: 행정동 x좌표
			 * @param y_coord: 행정동 y좌표
			 */
			regionSelectClick : function(admCd, admNm, x_coord, y_coord) {
				var map = this.mapList[this.curMapId];
				var params = {
						params : {
							adm_cd : admCd,
							adm_nm : admNm,
							zoom : 5,
							center : [x_coord, y_coord],
							map : map
						},
						type : "areaInfo"
				};
				
				//intro 백지도에서 일반지도로 변경한다.
				map.mapMode = "normal";
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				map.isLayerMouseEventDisabled = false;
				this.clearIntroData(map);
				this.checkBlankLayer(map);
				
				//무조건 시군구데이터 이므로 강제로 줌레벨을 시군구레벨로 이동시킨다.
				//drop할때와 마찬가지로 drop정보를 설정한다.
				map.setZoom(5);
				map.dropInfo = {
						center : [x_coord, y_coord],
						zoom : 5
				};

				map.legend.legendInit();
				this.curDropParams[map.id] = params;
				setTimeout(function() {
					$bizStatsDataBoard.ui.updateDataBoard(params, "areaInfo");
				}, 500);
			},
			
			
			/**
			 * 
			 * @name         : setTitle
			 * @description  : 타이틀을 설정한다.
			 * @date         : 2015. 12. 31. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param title	 : 제목
			 */
			setTitle :function(title, viewId) {
				$("#view"+viewId).find(".helperText").html(title);
			},
			
			/**
			 * 
			 * @name         : setChangeColorMode
			 * @description  : 버블지도를 색상지도로 변경한다.
			 * @date         : 2016. 10. 18. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param 	     : 
			 */
			setChangeColorMode : function() {
				var map = this.mapList[this.curMapId];
				var result = map.data[0].result;
				var showData = map.data[0].showData;
				var unit = map.data[0].unit;
				map.isLayerMouseEventDisabled = false;
				//map.setFixedBoundLevel(true);
				map.gMap.setMaxZoom(7);
				map.gMap.scrollWheelZoom.enable();
				map.legend.selectType = "color";
				
				// validation
				if (map.mapMode == "data") {
					return;
				}
				
				map.mapMode = "data";
				
				//범례설정
				$("#legendPopEvent01_"+map.legend.id).parent().show();
				$("#legendPopEvent02_"+map.legend.id).parent().show();
    			$("#bubbleLegendLine_"+map.legend.id).hide();
    			if ($("#legendBox_"+map.legend.id).hasClass("min")) {
    				$("#legendColor_"+map.legend.id).hide();
    			}else if ($("#legendBox_"+map.legend.id).hasClass("max")) {
    				$("#legendColor_"+map.legend.id).show();
    			}else {
    				$("#legendColor_"+map.legend.id).hide();
    			}
    			$("#typeArea_"+map.legend.id).removeClass().addClass("color");
    			legendColor(map.legend.legendColor2, map.legend.legendColor1, "#colorStatus_"+map.legend.id, map.legend.lv, map.legend.id, map.legend);
    			$(".btn_legendSetting").show(); //2017.02.23
						
				//서클 마커 초기화
				if ($bizStatsMap.ui.introJobAreaMarkers != null && $bizStatsMap.ui.introJobAreaMarkers.length > 0) {
					for (var i=0; i<$bizStatsMap.ui.introJobAreaMarkers.length; i++) {
						var markers = $bizStatsMap.ui.introJobAreaMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
				}
				$bizStatsMap.ui.introJobAreaMarkers = [];
				
				if (map.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
							layer.options.type = "data";
							layer.setStyle(map.setPolygonGeoJsonStyle("data"));
							layer.feature["info"] = []; //2017.02.23
							for (var k=0; k<result.length; k++) {
								var tmpAdmCd = result[k].sido_cd + result[k].sgg_cd;
								if (layer.feature.properties.adm_cd == tmpAdmCd) {
									result[k]["showData"]= showData;
									result[k]["unit"] = unit;
									result[k]["api_id"] = "";
									result[k]["adm_cd"] = tmpAdmCd;
									result[k]["adm_nm"] = layer.feature.properties.adm_nm;
									layer.feature.info.push(result[k]);
									layer.setStyle({
										weight : layer.options.weight,
										color : layer.options.color,
										dashArray : layer.options.dashArray,
										fillOpacity : layer.options.fillOpacity,
										fillColor : map.legend.getColor(parseFloat(result[k][showData]), map.legend.valPerSlice[0])[0]
									}); 
								}	
							}
						});
					}
				}
			},
			
			/**
			 * 
			 * @name         : setChangeBubbleMode
			 * @description  : 색상지도를 버블지도로 변경한다.
			 * @date         : 2016. 10. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param 	     : 
			 */
			setChangeBubbleMode : function() {
				var map = this.mapList[this.curMapId];
				var result = map.data[0].result;
				var showData = map.data[0].showData;
				var unit = map.data[0].unit;
				map.isLayerMouseEventDisabled = true;
				//map.setFixedBoundLevel(true);
				map.gMap.setMaxZoom(7);
				map.gMap.scrollWheelZoom.enable();
				map.legend.selectType = "bubble";
				
				// validation
				/*if (map.mapMode == "intro" && 
					$bizStatsMap.ui.introJobAreaMarkers != null && 
					$bizStatsMap.ui.introJobAreaMarkers.length > 0) {
					if ($bizStatsMap.ui.introJobAreaMarkers[0].theme_cd == result[0].theme_cd) {
						return;
					}
				}*/
				
				//범례설정
				$("#legendColor_"+map.legend.id).hide();
    			if ($("#legendBox_"+map.legend.id).hasClass("min")) {
    				$("#bubbleLegendLine_"+map.legend.id).hide();
    			}else if ($("#legendBox_"+map.legend.id).hasClass("max")) {
    				$("#bubbleLegendLine_"+map.legend.id).show();
    			}else {
    				$("#bubbleLegendLine_"+map.legend.id).hide();
    			}
    			$("#typeArea_"+map.legend.id).removeClass().addClass("ring");
    			legendColor(map.legend.legendColor2, map.legend.legendColor1, "#colorStatus_"+map.legend.id, map.legend.lv, map.legend.id, map.legend);
    			$(".btn_legendSetting").hide(); //2017.02.23
    			
				var tmpData = [];
				var data = [];
				var sidoCdList = [];
				var options = null;

				for (var i=0; i<result.length; i++) {
					tmpData.push(parseFloat(result[i][showData]));
					sidoCdList.push(result[i].sido_cd);
				}
				data.push(tmpData);
				map.legend.valPerSlice = map.legend.calculateLegend(data);
				map.mapMode = "intro";
				
				if (map.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
							layer.options.type = "polygon";
							layer.setStyle(map.setPolygonGeoJsonStyle("polygon"));
						});
					}
				}
				
				if (map.legend.circleMarkerGroup == null) {
					map.legend.circleMarkerGroup = [];
				}
				
				//시도별로 그룹핑
				var tmpSidoList = [];
				$.each(sidoCdList, function (i, el) {
					if ($.inArray(el, tmpSidoList) === -1) {
						tmpSidoList.push(el);
					}
				});
				
				//시도별 총 사업체수
				var totalCntInfo = {};
				for (var k=0; k<tmpSidoList.length; k++) {
					var totalCnt = 0;
					var adm_cd = tmpSidoList[k];
					for (var i=0; i<result.length; i++) {
						if (result[i].sido_cd == tmpSidoList[k]) {
							totalCnt += parseFloat(result[i][showData]);
							continue;
						}
					}
					totalCntInfo[adm_cd] = totalCnt;
				}
				
				//서클 마커 초기화
				if ($bizStatsMap.ui.introJobAreaMarkers != null && $bizStatsMap.ui.introJobAreaMarkers.length > 0) {
					for (var i=0; i<$bizStatsMap.ui.introJobAreaMarkers.length; i++) {
						var markers = $bizStatsMap.ui.introJobAreaMarkers[i].markers;
						for (var k=0; k<markers.length; k++) {
							markers[k].remove();
						}
					}
				}
				$bizStatsMap.ui.introJobAreaMarkers = [];
				
				var tmpGroup = {};
				for (var i=0; i<tmpSidoList.length; i++) {
					tmpGroup[tmpSidoList[i]] = [];
					for (var j=0; j<result.length; j++) {
						if (result[j].sido_cd == tmpSidoList[i]) {
							tmpGroup[result[j].sido_cd].push(result[j]);
						}
					}
				}
				
				
				//alert("[bizStatsMap.js] setChangeBubbleMode() ==> result[0].theme_cd [" + result[0].theme_cd);
				
				
				var type = "jobArea"; 
				for (var k=0; k<tmpSidoList.length; k++) {
					var markerInfo = {};
					markerInfo["sido_cd"] = tmpSidoList[k];
					markerInfo["theme_cd"] = result[0].theme_cd;
					var tmpMarkers = [];
					
					
					for (var i=0; i<result.length; i++) {
						if (result[i].sido_cd == tmpSidoList[k]) {
							var sggGroup = [];   
							sggGroup.push(tmpGroup[result[i].sido_cd]);
							var rate = ((parseFloat(result[i][showData])/totalCntInfo[result[i].sido_cd]) * 100).toFixed(2);
							var summary =		"<div>";
								summary += 			"<div class='bar'>";
								summary +=				result[i].sido_nm + " " +result[i].sgg_nm+" 해당 업종 현황 ("+companyDataYear+")";
								summary +=			"</div>";
								summary +=			"<div class='text01' style='margin-left:10px;'>";
								summary += 				"<p style=''>"+result[i].theme_cd_nm+" : "+appendCommaToNumber(result[i][showData])+" ("+unit+")</p>";
								summary += 				"<p style=''>비율 : "+rate+"% ("+result[i].sido_nm+" 기준)</p>";
								summary +=			"</div>"; 	
								summary +=		"</div>";
				    			
			    			var sggGroupHtml =		"<div class='parScroll' id='introTooltipTable'>";
		    					sggGroupHtml +=			"<table>";
		    					sggGroupHtml +=				"<tr>";
				    			for (var j=0; j<sggGroup[0].length; j++) {
				    				if(j%3 	== 0 && j != 0)
				    					sggGroupHtml += "</tr><tr>";
				    				var sido_cd = sggGroup[0][j].sido_cd;
				    				var adm_cd = sggGroup[0][j].sido_cd + sggGroup[0][j].sgg_cd;
				    				options = {
				    						map : map,
				    						params : {
				    							theme_nm : result[i].theme_cd_nm,
				    							theme_cd : result[i].theme_cd
				    						},
				    						themeCd : result[i].theme_cd,
				    						themeNm : result[i].theme_nm
				    				};
				    				$bizStatsMap.callbackFunc.introTooltipOptions = options;
				    				sggGroupHtml +=	"<td class='" + (result[i].sgg_cd == sggGroup[0][j].sgg_cd ? "on" : "") + "' id='" + adm_cd + "'>";
				    				sggGroupHtml +=		"<a onclick='javascript:$bizStatsMap.callbackFunc.introTooltipFunc(\"" + sido_cd + "\", \"" + adm_cd + "\", \""+sggGroup[0][j].theme_cd+"\", \""+sggGroup[0][j].sido_nm +" "+sggGroup[0][j].sgg_nm+"\", \""+sggGroup[0][j].x_coor+"\", \""+sggGroup[0][j].y_coor+"\", \""+type+"\");'>";
				    				sggGroupHtml += 		sggGroup[0][j].sgg_nm;
				    				sggGroupHtml += 	"</a>";
				    				sggGroupHtml +=	"</td>";
			    				}
				    			sggGroupHtml += 			"</tr>";
				    			sggGroupHtml += 		"</table>";
				    			sggGroupHtml += 	"</div>";
		    					
			    			var companyDensity =		"<div class='introTooltip_btn_wrapper' style='margin-top: 10px;'>";
				    			companyDensity += 			"<dl>";
				    			companyDensity +=				"<dt id='density'>";
				    			companyDensity +=					"<a onclick='javascript:$bizStatsMap.ui.companyDensityClick(\""+result[i].theme_cd+"\", \""+result[i].sido_cd+result[i].sgg_cd +"\", \""+result[i].sido_nm +" "+result[i].sgg_nm+"\", \""+result[i].x_coor+"\", \""+result[i].y_coor+"\", \""+type+"\");'>업종 밀집도 변화</a>"
				    			companyDensity +=				"</dt>";
				    			companyDensity += 			"</dl>";
								companyDensity +=		"</div>";
								
							var tooltipMsg = $("<div></div>").append(
									$("<div class='popAreaResult'></div>").append(summary).append(sggGroupHtml).append(companyDensity)
							).html();
				    			
				    		var colorInfo = map.legend.getColor(parseFloat(result[i][showData]), map.legend.valPerSlice[0]);
				    		var marker = map.addCircleMarker(result[i].x_coor, result[i].y_coor, {
				    			radius : map.legend.legendCircleRadius[colorInfo[1]],
				    			color : colorInfo[0],
				    			fillColor : "white",
				    			weight : 4,
				    			tooltipMsg : tooltipMsg
				    		});
				    		marker.options["sido_cd"] = result[i].sido_cd;
				    		marker.options["bFillColor"] = colorInfo[0];
				    		marker.options["adm_cd"] = result[i].sido_cd+result[i].sgg_cd;
				    		marker.options["adm_nm"] = result[i].sido_nm +" " +result[i].sgg_nm;
				    		marker.options["theme_cd"] = result[i].theme_cd;
				    		tmpMarkers.push(marker);
				    		marker.on("mouseover", function(e) {
				    			var markers = null;
				    			for (var i=0; i<$bizStatsMap.ui.introJobAreaMarkers.length; i++) {
				    				if ($bizStatsMap.ui.introJobAreaMarkers[i].sido_cd == e.target.options.sido_cd) {
				    					markers = $bizStatsMap.ui.introJobAreaMarkers[i].markers;
				    					break;
				    				}
				    			}
				    			$bizStatsMap.callbackFunc.didMouseOverPolygon(e, markers, "jobArea", map);
				    		});
				    		marker.on("mouseout", function(e) {
				    			$bizStatsMap.callbackFunc.didMouseOutPolygon(e, $bizStatsMap.ui.introJobAreaMarkers, "jobArea", map);
				    		});
				    		marker.on("click", function(e) {
				    			$bizStatsMap.callbackFunc.didSelectedPolygon(e, $bizStatsMap.ui.introJobAreaMarkers, "jobArea", map);
				    		});
							continue;
						} 
					}
					markerInfo["markers"] = tmpMarkers;
					$bizStatsMap.ui.introJobAreaMarkers.push(markerInfo);
				}
				tmpData = null;
				data = null;
			}
			
			
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$bizStatsMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				var poiControl = map.mapBtnInfo;
				
				console.log("[bizStatsMap.js] didMapMoveEnd() 콜백 호출 $bizStatsDataBoard.ui.mapData[map.id].type [" + $bizStatsDataBoard.ui.mapData[map.id].type);
				console.log("[bizStatsMap.js] didMapMoveEnd() map.zoom [" + map.zoom);
				console.log("[bizStatsMap.js] didMapMoveEnd() map.center [" + map.center);
				
				if(map.zoom >= 9 && $bizStatsMap.ui.jobBestAdmCd != "") { //mng_s 업종별 뜨는 지역 줌레벨이 10부터 POI보여주기
					map.markers.clearLayers();
					$bizStatsMapApi.request.getCompanyBestAreaPOI(map);
				}
				
				//테마poi조회
				if (poiControl.isOpenPOI &&
					poiControl.isShow &&
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
						poiControl.isShow &&
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
				
				//공공데이터 조회
				var publicDataBoard = $publicDataBoard.ui.mapData[map.id];
				if (publicDataBoard.type != undefined && 
					publicDataBoard.type.length > 0 && 
					$publicDataBoard.ui.isShow) {
					//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
					if (publicDataBoard.type != "cctv") {
						if(publicDataBoard.options.mapBounds == null) {
							map.markers.clearLayers();
							$publicDataBoard.ui.reqPoi();
						} else {
							if (!publicDataBoard.options.mapBounds.contains(map.gMap.getCenter())) {
								map.markers.clearLayers();
								$publicDataBoard.ui.reqPoi();
							}
						}	
					}
				}
				
				//업종밀집도 변화
				setTimeout(function() {
					if ($bizStatsDataBoard.ui.mapData[map.id] != null && $bizStatsDataBoard.ui.mapData[map.id].type == "jobChange") {
						var options = $bizStatsDataBoard.ui.mapData[map.id].options;
						if (options.params.adm_cd != null && options.params.adm_cd.length >= 5) {
							if (map.zoom < 10) {
								$bizStatsMap.ui.doConvertHeatMap(map, "heatMap");
							}else {
								$bizStatsMap.ui.doConvertHeatMap(map, "dotMap");
							}
						}
					}
				}, 300);
				
				//지자체 인허가 업종별 개업 현황
				setTimeout(function() {
					if ($bizStatsDataBoard.ui.mapData[map.id] != null && $bizStatsDataBoard.ui.mapData[map.id].type == "jobOpen") {
						
						//alert("[bizStatsMap.js] mapMove 콜백호출됨.");
						
						//if($bizStatsMap.ui.share_info_type != "bookmark") {
						
							var options = $bizStatsDataBoard.ui.mapData[map.id].options;
							if (options.params.adm_cd != null && options.params.adm_cd.length >= 5) {
								if (map.zoom < 10) {
									$bizStatsMap.ui.doConvertHeatMap(map, "heatMap");
								}else {
									$bizStatsMap.ui.doConvertHeatMap(map, "dotMap");
								}
							}
							
						//} //end of if
						
					}
				}, 300);
				
				//나의데이터
				if ($mydataDataBoard && 
						$mydataDataBoard.callbackFunc &&
						$mydataDataBoard.callbackFunc.didMapMoveEnd) {
					$mydataDataBoard.callbackFunc.didMapMoveEnd(event, map);
				}
			
			},
			
			didMapZoomIn : function(map) {
				if ($bizStatsLeftMenu.ui.curSelectedStatsType == "jobArea") {
					map.gMap.zoomIn(1);
				}
			},
			
			didMapZoomOut : function(map) {
				if ($bizStatsLeftMenu.ui.curSelectedStatsType == "jobArea") {
					map.gMap.zoomOut(1);
				}
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				
				var poiControl = map.mapBtnInfo;
				if (map.zoom < 10 && map.isInnerMapShow) {
					$bizStatsMap.ui.doInnerMap(map.id+1);
				}
				
				//mng_s
				if(map.zoom < 9 && $bizStatsMap.ui.jobBestAdmCd != "") { //mng_s 업종별 뜨는 지역 줌레벨이 8부터 POI삭제
					map.markers.clearLayers();
				}
				
				//사업체 POI 없애기
				if (map.zoom < 9 && poiControl.isOpenPOI && poiControl.isShow) {
					poiControl.isShow = false;
					messageConfirm.open(
			    			 "알림", 
			    			 "해당 레벨부터는 사업체 POI정보를 볼 수 없습니다.<br>" +
			    			 "유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
			    			 btns = [
								{
								    title : "그만보기",
								    fAgm : null,
								    disable : false,
								    func : function(opt) {
								    	poiControl.clearPOI();
								    }
								 },
								 
			    			     {
								   title : "유지하기",
								   fAgm : null,
								   disable : false,
								   func : function(opt) {}
			    			     }   
			    			 ]
			    	);
				}else if (map.zoom > 9 && poiControl.isOpenPOI && !poiControl.isShow) {
					poiControl.isShow = true;
				}
				
				//공공데이터 POI  없애기
				var publicDataBoard = $publicDataBoard.ui.mapData[map.id];
				
				//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
				if (publicDataBoard.type != "cctv") {
					if (map.zoom < 9 && publicDataBoard.options.map != null && $publicDataBoard.ui.isShow) {
						$publicDataBoard.ui.isShow = false;
						messageConfirm.open(
				    			 "알림", 
				    			 "해당 레벨부터는 공공데이터 POI정보를 볼 수 없습니다.<br>" +
				    			 "유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
				    			 btns = [
									{
									    title : "그만보기",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
									    	$publicDataBoard.ui.remove(map.id);
									    }
									 },
									 
				    			     {
									   title : "유지하기",
									   fAgm : null,
									   disable : false,
									   func : function(opt) {}
				    			     }   
				    			 ]
				    	);
					}else if (map.zoom > 9 && 
							  publicDataBoard.options.map != null && 
							  !$publicDataBoard.ui.isShow) {
						$publicDataBoard.ui.isShow = true;
					}
				}
	
			},

			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
				var id = $("#" + source.prop("id")).find("a").attr("id");
				var tmpParamList = deepCopy($bizStatsLeftMenu.ui.arParamList);
				var adm_cd = data.adm_cd;
				var index = id.split("-")[1];
				var selParams = null;
				var filterParam = null;
				var unit = null;
				var title = null;
				var type = "";
				
				//지도 초기화
				$bizStatsMap.noReverseGeoCode = false;
				$bizStatsMap.ui.doClearMap(map.id+1);
				
				var tmpParam = null
				for (var i=0; i<tmpParamList.length; i++) {
					if (tmpParamList[i].idx == index) { 
						tmpParam = tmpParamList[i];
						break;
					}
				}
				
				if (adm_cd.length > 7) {
					adm_cd = adm_cd.substring(0, 7);
				}
				
				var params = null;
				
				//업종밀집도 변화
				if (id.indexOf("jobChange") != -1) {
					params = {
							params : {
								adm_cd :adm_cd,
								adm_nm : data.adm_nm,
								map : map
							},
							type : "jobChange"
					};
					
					/*2016-03-17 수정*/
					if($bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].zoom < 4) {	//시도 레벨일 경우
						messageAlert.open(
								"알림", 
								"시도 검색시에는 선택된 사업체에 대한 개별 위치정보를 모두 조회하므로," +
								"다소 시간이 소요될 수 있으며, 시군구 단위 조회를 추천 드립니다." +
								"시간이 걸리더라도 계속 조회 하시겠습니까?",
								function done(){
									//데이터보드 호출
									map.setDroppedInfo();
									$bizStatsMap.ui.curDropParams[map.id] = params;
									$bizStatsDataBoard.ui.updateDataBoard(params, "jobChange");
									$("#view"+(map.id+1)).find(".tb_report").parent().show();
								},
								function cancel() {}
						);
					}else{
						map.setDroppedInfo();
						$bizStatsMap.ui.curDropParams[map.id] = params;
						$bizStatsDataBoard.ui.updateDataBoard(params, "jobChange");
						$("#view"+(map.id+1)).find(".tb_report").parent().show();
					}
				}
				
				//지자체 인허가 업종별 개업 현황
				else if (id.indexOf("jobOpen") != -1) {
					params = {
							params : {
								adm_cd :adm_cd,
								adm_nm : data.adm_nm,
								map : map
							},
							type : "jobOpen"
					};
					
					/*2016-03-17 수정*/
					if($bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].zoom < 4) {	//시도 레벨일 경우
						messageAlert.open(
								"알림", 
								"시도 검색시에는 선택된 사업체에 대한 개별 위치정보를 모두 조회하므로," +
								"다소 시간이 소요될 수 있으며, 시군구 단위 조회를 추천 드립니다." +
								"시간이 걸리더라도 계속 조회 하시겠습니까?",
								function done(){
									//데이터보드 호출
									map.setDroppedInfo();
									$bizStatsMap.ui.curDropParams[map.id] = params;
									$bizStatsDataBoard.ui.updateDataBoard(params, "jobOpen");
									$("#view"+(map.id+1)).find(".tb_report").parent().show();
								},
								function cancel() {}
						);
					}else{
						map.setDroppedInfo();
						$bizStatsMap.ui.curDropParams[map.id] = params;
						$bizStatsDataBoard.ui.updateDataBoard(params, "jobOpen");
						$("#view"+(map.id+1)).find(".tb_report").parent().show();
					}
				}
				//지역 종합정보
				else if (id.indexOf("areaInfo") != -1) {
					//전국 또는 시도일 경우 리턴
					if (adm_cd.length == 2) {
						messageAlert.open("알림","생활업종후보지정보는 시/군/구, 읍/면/동 단위에서 조회할수 있습니다.");
						return;
					}
					
					params = {
							params : {
								adm_cd : adm_cd,
								adm_nm : data.adm_nm,
								map : map,
								year : dataYear,
								center : map.center,
								zoom : map.zoom
							},
							type : "areaInfo"
					};
					map.setDroppedInfo();
					$bizStatsMap.ui.curDropParams[map.id] = params;
					$bizStatsDataBoard.ui.updateDataBoard(params, "areaInfo");
					$("#view"+(map.id+1)).find(".tb_report").parent().show();
				}
				//창업지역검색
				else if (id.indexOf("areaSearch") != -1) {
					type = "areaSearch";
					$bizStatsMap.ui.setTitle($("#"+id).attr("title"), map.id+1);
					$bizStatsLeftMenu.ui.curSelectedStatsType = type;
					
					//전국일 경우
					if (adm_cd == "00") {
						messageAlert.open("알림","우리동네 생활업종은 시/도 또는 시/군/구 단위에서 조회할수 있습니다.");
						return;
					}
					
					//읍면동, 집계구일 경우
					if (adm_cd.length >= 7) {
						adm_cd = adm_cd.substring(0,5);
						
						messageAlert.open(
								"알림",
								"지역검색은 시/도 또는 시/군/구 단위에서 조회할수</br>있습니다.지도 레벨을 변경하여 데이터를</br>확인합니다.",
								function done() {
									map.setZoom(5);
									setTimeout(function() {
										tmpParam.adm_cd = adm_cd;
										tmpParam.adm_nm = data.adm_nm;
										tmpParam.api_id = id;
										tmpParam.map = map; 
										tmpParam.type = "areaSearch";
										tmpParam.view_type = "NM";
										
										params = tmpParam;
										// openApi 호출
										$bizStatsMap.ui.requestOpenApi(params);
									}, 1000);
								}
						);
						
					} else {	//시군구 레벨
						if (adm_cd.length >= 5) {
							adm_cd = adm_cd.substring(0,5);
							map.setZoom(5);
						} else if (adm_cd.length = 2) {	//시도 레벨
							adm_cd = adm_cd.substring(0,2);
							map.setZoom(2);
						}
						setTimeout(function() {
							tmpParam.adm_cd = adm_cd;
							tmpParam.adm_nm = data.adm_nm;
							tmpParam.api_id = id;
							tmpParam.map = map; 
							tmpParam.type = "areaSearch";
							tmpParam.view_type = "NM";
							
							params = tmpParam;
							// openApi 호출
							$bizStatsMap.ui.requestOpenApi(params);
						}, 1000);
					}
				}else {
					return;
				}
				
				//버튼 색상 변경
				$bizStatsLeftMenu.ui.updateSearchBtnEffect(id, map.id);
				// 현재 드랍된 행정동코드 저장
				$bizStatsMap.ui.curAdmCode = adm_cd;		
				
			},
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
				var map = $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId];		
				var id = btn_id;
				var tmpParamList = deepCopy($bizStatsLeftMenu.ui.arParamList);
				var adm_cd = null;
				var index = id.split("-")[1];
				var selParams = null;
				var filterParam = null;
				var unit = null;
				var title = null;
				var type = "";
				
				$bizStatsMap.noReverseGeoCode = false;
				
				var tmpParam = null
				for (var i=0; i<tmpParamList.length; i++) {
					if (tmpParamList[i].idx == index) { 
						tmpParam = tmpParamList[i];
						break;
					}
				}
				
				var center = map.gMap.getCenter();
				map.gMap.eachLayer(function(layer){
					 if( layer._containsPoint) {
						 var point = map.gMap.utmkToLayerPoint(center);  
		                    if (layer._containsPoint(point)){
		                    	adm_cd = layer.feature.properties.adm_cd;
		                    	adm_nm = layer.feature.properties.adm_nm;
		                    }
					 }
				});
				
				if(adm_cd == null) {
					return;
				}
				
				if (adm_cd.length == 0) {
					messageAlert.open("알림", "조회할 경게정보가 없습니다.<br/>경계를 조회해주세요.");
					return;
				}
				
				if (adm_cd.length > 7) {
					adm_cd = adm_cd.substring(0, 7);
				}
				
				//지도 초기화
				$bizStatsMap.ui.doClearMap(map.id+1);
				
				//업종밀집도 변환
				if (id.indexOf("jobChange") != -1) {
					params = {
							params : {
								adm_cd :adm_cd,
								adm_nm : adm_nm,
								map : map
							},
							type : "jobChange"
					};
					
					//데이터보드 호출
					map.setDroppedInfo();
					$bizStatsMap.ui.curDropParams[map.id] = params;
					$bizStatsDataBoard.ui.updateDataBoard(params, "jobChange");
					$("#view"+(map.id+1)).find(".tb_report").parent().show();
				}
				
				//지자체 인허가
				if (id.indexOf("jobOpen") != -1) {
					params = {
							params : {
								adm_cd :adm_cd,
								adm_nm : adm_nm,
								map : map
							},
							type : "jobOpen"
					};
					
					//데이터보드 호출
					map.setDroppedInfo();
					$bizStatsMap.ui.curDropParams[map.id] = params;
					$bizStatsDataBoard.ui.updateDataBoard(params, "jobOpen");
					$("#view"+(map.id+1)).find(".tb_report").parent().show();
				}
				
				//지역 종합정보
				else if (id.indexOf("areaInfo") != -1) {
					//전국 또는 시도일 경우 리턴
					if (adm_cd.length == 2) {
						messageAlert.open("알림","생활업종후보지정보는 시/군/구, 읍/면/동 단위에서 조회할수 있습니다.");
						return;
					}
					
					params = {
							params : {
								adm_cd : adm_cd,
								adm_nm : adm_nm,
								map : map,
								year : dataYear,
								center : map.center,
								zoom : map.zoom
							},
							type : "areaInfo"
					};
					map.setDroppedInfo();
					$bizStatsMap.ui.curDropParams[map.id] = params;
					$bizStatsDataBoard.ui.updateDataBoard(params, "areaInfo");
					$("#view"+(map.id+1)).find(".tb_report").parent().show();
				}
				
				//창업지역검색
				else if (id.indexOf("areaSearch") != -1) {
					type = "areaSearch";
					$bizStatsMap.ui.setTitle($("#"+id).attr("title"), map.id+1);
					$bizStatsLeftMenu.ui.curSelectedStatsType = type;
					
					//전국일 경우
					if (adm_cd == "00") {
						messageAlert.open("알림","우리동네 생활업종은 시/도 또는 시/군/구 단위에서 조회할수 있습니다.");
						return;
					}
					
					//읍면동, 집계구일 경우
					if (adm_cd.length >= 7) {
						adm_cd = adm_cd.substring(0,5);
						
						messageAlert.open(
								"알림",
								"지역검색은 시/도 또는 시/군/구 단위에서 조회할수</br>있습니다.지도 레벨을 변경하여 데이터를</br>확인합니다.",
								function done() {
									map.setZoom(5);
									setTimeout(function() {
										tmpParam.adm_cd = adm_cd;
										tmpParam.adm_nm = adm_nm;
										tmpParam.api_id = id;
										tmpParam.map = map; 
										tmpParam.type = "areaSearch";
										tmpParam.view_type = "NM";
										
										params = tmpParam;
										// openApi 호출
										$bizStatsMap.ui.requestOpenApi(params);
									}, 1000);
								}
						);
						
					} else {	//시군구 레벨
						if (adm_cd.length >= 5) {
							adm_cd = adm_cd.substring(0,5);
							map.setZoom(5);
						} else if (adm_cd.length = 2) {	//시도 레벨
							adm_cd = adm_cd.substring(0,2);
							map.setZoom(2);
						}
						setTimeout(function() {
							tmpParam.adm_cd = adm_cd;
							tmpParam.adm_nm = adm_nm;
							tmpParam.api_id = id;
							tmpParam.map = map; 
							tmpParam.type = "areaSearch";
							tmpParam.view_type = "NM";
							
							params = tmpParam;
							// openApi 호출
							$bizStatsMap.ui.requestOpenApi(params);
						}, 1000);
					}
				}
				//업종별 뜨는 지역
				else if (id.indexOf("jobBest") != -1) {
					type = "jobBest";
					$bizStatsMap.ui.setTitle($("#"+id).attr("title"), map.id+1);
					$bizStatsLeftMenu.ui.curSelectedStatsType = type;
					
					//전국일 경우
					if (adm_cd == "00") {
						messageAlert.open("알림","우리동네 생활업종은 시/도 또는 시/군/구 단위에서 조회할수 있습니다.");
						return;
					}
					
					//읍면동, 집계구일 경우
					if (adm_cd.length >= 7) {
						adm_cd = adm_cd.substring(0,5);
						
						messageAlert.open(
								"알림",
								"지역검색은 시/도 또는 시/군/구 단위에서 조회할수</br>있습니다.지도 레벨을 변경하여 데이터를</br>확인합니다.",
								function done() {
									map.setZoom(5);
									setTimeout(function() {
										tmpParam.adm_cd = adm_cd;
										tmpParam.adm_nm = adm_nm;
										tmpParam.api_id = id;
										tmpParam.map = map; 
										tmpParam.type = "areaSearch";
										tmpParam.view_type = "NM";
										
										params = tmpParam;
										// openApi 호출
										$bizStatsMap.ui.requestOpenApi(params);
									}, 1000);
								}
						);
						
					} else {	//시군구 레벨
						if (adm_cd.length >= 5) {
							adm_cd = adm_cd.substring(0,5);
							map.setZoom(5);
						} else if (adm_cd.length = 2) {	//시도 레벨
							adm_cd = adm_cd.substring(0,2);
							map.setZoom(2);
						}
						setTimeout(function() {
							tmpParam.adm_cd = adm_cd;
							tmpParam.adm_nm = adm_nm;
							tmpParam.api_id = id;
							tmpParam.map = map; 
							tmpParam.type = "areaSearch";
							tmpParam.view_type = "NM";
							
							params = tmpParam;
							// openApi 호출
							$bizStatsMap.ui.requestOpenApi(params);
						}, 1000);
					}
				}
				
				else {
					return;
				}
				
				//버튼 색상 변경
				$bizStatsLeftMenu.ui.updateSearchBtnEffect(id, map.id);
				// 현재 드랍된 행정동코드 저장
				$bizStatsMap.ui.curAdmCode = adm_cd;				
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
				if (type == "jobArea") {
					for (var i=0; i<data.length; i++) {
						var marker = data[i];
						marker.setStyle({
							fillColor : "#FF9100"
						});
					}
				}
				else {
					if (type != "polygon") {
						if (type == "data") {
							if (data.info.length > 0) {
								//지역찾기일 경우 제외
								if(data.info.showData != "bizStats") {
									map.legend.selectLegendRangeData(event.target.options.fillColor);	
								}
							}
							$bizStatsMap.ui.createInfoTooltip(event, data, type, map);
						}
					}else {
						switch($bizStatsLeftMenu.ui.curSelectedStatsType) {
							case "intro":
								$bizStatsMap.ui.createInfoTooltip(event, data, "intro", map);
								break;
							case "jobChange":
								$bizStatsMap.ui.createInfoTooltip(event, data, "jobChange", map);
								var layer = event.target;
								layer.setStyle({
									fillColor : "#1e90ff",
									fillOpacity : 0.1
								});
								break;
							case "jobOpen":
								$bizStatsMap.ui.createInfoTooltip(event, data, "jobOpen", map);
								var layer = event.target;
								layer.setStyle({
									fillColor : "#1e90ff",
									fillOpacity : 0.1
								});
								break;
						}
					}
				}
			},
			
			/**
			 * 
			 * @name         : didMouseOutPolygon
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
				if (type == "jobArea") {
					for (var i=0; i<data.length; i++) {
						var markers = data[i].markers;
						for (var k=0; k<markers.length; k++) {
							var marker = markers[k];
							marker.setStyle({
								color : marker.options.bFillColor,
								fillColor : "white"
							});
						}
					}
				}else if (type == "polygon") {
					if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobChange"){
						var layer = event.target;
						layer.setStyle({
							fillColor : "#1e90ff",
							fillOpacity : 0
						});
					} else if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobOpen"){
						var layer = event.target;
						layer.setStyle({
							fillColor : "#1e90ff",
							fillOpacity : 0
						});
					}
				}
			},

			
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
			didSelectedPolygon : function(event, data, type, map) {
				if (type == "data") {
					if (data.info) {
						if (data.info.length > 0) {
							switch ($bizStatsLeftMenu.ui.curSelectedStatsType) {
								case "areaSearch":
									$bizStatsDataBoard.ui.areaSearchDetailInfo("first", data.properties.adm_cd, data.properties.adm_nm, data.properties.x, data.properties.y);
									break;
								case "jobArea":
									var layer = event.target;
									var options = {
											params : {
												adm_cd : layer.feature.properties.adm_cd,
												adm_nm : layer.feature.properties.adm_nm,
												map : map
											},
											dataBoard : {
												jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
											}
									};
								
									$bizStatsMapApi.request.setStatsData("", options);

									//데이터 보드 호출 (options, type)
									$bizStatsDataBoard.ui.updateDataBoard(options, "jobArea");      
									break;
							}
							
							if(data.info[0].showData == "bizStats"){
								$("#view"+(map.id+1)).find(".tb_report").parent().show();
							}
						}
					}
				}else if (type == "polygon") {
					switch($bizStatsLeftMenu.ui.curSelectedStatsType) {
						case "intro": //시도별 생활업종현황
							var id = map.id+1;
							var layer = event.target;
							$bizStatsMap.ui.setTitle("시도별 생활업종현황 > "+data.properties.adm_nm, id);
							$("#view"+id).find(".tb_report").parent().show();
							
							layer.setStyle({
								color : "#ebb410",
								fillColor: "#fcbe47",
								fillOpacity : 1,
								opacity : layer.options.opacity,
								weight: 2.5,
								dashArray : ""
							});
							
							if (map.curSelectedLayer) {
								if (layer != map.curSelectedLayer) {
									map.curSelectedLayer.setStyle({
										color : "#cccccc",
										fillColor: "#F1F1F1",
										fillOpacity : 1,
										opacity : layer.options.opacity,
										weight: 1.5,
										dashArray : ""
									});
								}
							}
							$bizStatsMap.ui.deSelectedIntroMarker(layer, map);
							$bizStatsMap.ui.selectedIntroMarker(layer, map);
							
							var options = {
									params : {
										adm_cd : layer.feature.properties.adm_cd,
										adm_nm : layer.feature.properties.adm_nm,
										map : map
									}
							};
							$bizStatsMapApi.request.setStatsData("", options);
							
							//데이터보드 호출 (options, type)
							$bizStatsDataBoard.ui.updateDataBoard(options, "intro");
							break;
						case "jobArea": //시군구별 생활업종 현황
							var layer = event.target;
							var options = {
									params : {
										adm_cd : layer.options.adm_cd,
										adm_nm : layer.options.adm_nm,
										map : map
									},
									dataBoard : {
										jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
									}
							};
							$bizStatsMapApi.request.setStatsData("", options);

							//데이터 보드 호출 (options, type)
							$bizStatsDataBoard.ui.updateDataBoard(options, "jobArea");      
							break;
						case "jobChange": //업종밀집도변화
							
							var filterParam = $(".jobArea_stepBox label.on").prev("input").val();
							var fullName = $(".jobArea_stepBox label.on").text();
							
							if(filterParam && fullName){
								var options = $bizStatsDataBoard.ui.mapData[map.id].options;
								if ($bizStatsDataBoard.ui.mapData[map.id].type.length == 0) {
									return;
								}
								var adm_cd = data.properties.adm_cd;
								var adm_nm = data.properties.adm_nm;
								var type = "1";
								
								switch (adm_cd.length) {
								case 2:
									map.clearDataOverlay();
									setTimeout(function() { //2017.02.23
										map.mapMove([data.properties.x, data.properties.y], 5, true);
									},1000)
									
									break;
								case 5:
									map.clearDataOverlay();
									setTimeout(function() {
										map.mapMove([data.properties.x, data.properties.y], 7, true);
									},1000);
									break;
								case 7:
									map.mapMove([data.properties.x, data.properties.y], map.zoom);
									options.params.adm_cd = adm_cd;
									options.params.adm_nm = adm_nm;
									$bizStatsDataBoard.ui.updateDataBoard(options, "jobChange");
									return;
									break;
								}
								
								setTimeout(function() {
									$("#jobChangeDiv > .MapBefore").show(); //2017.02.23 추가
									map.openApiBoundaryHadmarea(adm_cd, map.bnd_year, "1", null, function(map, res) { //2017.02.23
										if (map.geojson) {
											map.geojson.remove();
											map.geojson = null;
										}
										map.addPolygonGeoJson(res, "polygon");
									});
									options["preLayer"] = {
											adm_cd : options.params.adm_cd,
											adm_nm : options.params.adm_nm,
											x : data.properties.x,
											y : data.properties.y
									};
									options.params.adm_cd = adm_cd;
									options.params.adm_nm = adm_nm;
									$bizStatsDataBoard.ui.updateDataBoard(options, "jobChange");
								}, 300);
							}
							break;
						
						case "jobOpen": //지자체 인허가
							
							var filterParam = $(".jobArea_stepBox label.on").prev("input").val();
							var fullName = $(".jobArea_stepBox label.on").text();
							
							if(filterParam && fullName){
								var options = $bizStatsDataBoard.ui.mapData[map.id].options;
								if ($bizStatsDataBoard.ui.mapData[map.id].type.length == 0) {
									return;
								}
								var adm_cd = data.properties.adm_cd;
								var adm_nm = data.properties.adm_nm;
								var type = "1";
								
								switch (adm_cd.length) {
								case 2:
									map.clearDataOverlay();
									setTimeout(function() { //2017.02.23
										map.mapMove([data.properties.x, data.properties.y], 5, true);
									},1000)
									
									break;
								case 5:
									map.clearDataOverlay();
									setTimeout(function() {
										map.mapMove([data.properties.x, data.properties.y], 7, true);
									},1000);
									break;
								case 7:
									map.mapMove([data.properties.x, data.properties.y], map.zoom);
									options.params.adm_cd = adm_cd;
									options.params.adm_nm = adm_nm;
									$bizStatsDataBoard.ui.updateDataBoard(options, "jobOpen");
									return;
									break;
								}
								
								setTimeout(function() {
									$("#jobOpenDiv > .MapBefore").show(); //2017.02.23 추가
									map.openApiBoundaryHadmarea(adm_cd, map.bnd_year, "1", null, function(map, res) { //2017.02.23
										if (map.geojson) {
											map.geojson.remove();
											map.geojson = null;
										}
										map.addPolygonGeoJson(res, "polygon");
									});
									options["preLayer"] = {
											adm_cd : options.params.adm_cd,
											adm_nm : options.params.adm_nm,
											x : data.properties.x,
											y : data.properties.y
									};
									options.params.adm_cd = adm_cd;
									options.params.adm_nm = adm_nm;
									$bizStatsDataBoard.ui.updateDataBoard(options, "jobOpen");
								}, 300);
							}
							break;
						
					}
				}
				
				//미니맵 선택 (지역종합정보)
				else if(type == "mini") {
					if (data.info) {
						if (data.info.length > 0) {
							var property = data.properties;
							//데이터보드 지역상세정보 보기 호출
							$bizStatsDataBoard.ui.areaSearchDetailInfo("none", property.adm_cd, property.adm_nm, property.x, property.y);
						}
					}
				}
				
				//사업체전개도
				else if (type == "build") {
					if ($bizStatsMap.ui.buildPopup != null) {
						$bizStatsMap.ui.buildPopup.close();
					}
					
					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
							   $("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$bizStatsMap.ui.buildPopup = 
						window.open(
							"/view/indoor/indoorMap?sufid=" + data.properties.sufid, 
							"건물상세정보",
							"top="+top+", left="+left+", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);
				}
				
				else if (type == "trade") {	//생활업종지도 상권정보 업데이트
					//데이터보드 상권정보
					var options = {
							params : {
								map : map,
								data : data
							}
					}
					$bizStatsDataBoard.ui.updateDataBoard(options, "trade");
				}
			},
			
			//업종별 지역현황 (introTooltip 사용)
			introTooltipOptions : null,
			
			/**
			 * 
			 * @name         : introTooltipFunc
			 * @description  : introTooltip 화면 시군구 리스트 클릭 기능
			 * @date         : 2016. 06. 30. 
			 * @author	     : 민준홍
			 * @history 	 :
			 * @param @param sido_cd 시도코드 
			 * @param @param adm_cd  주소값
			 */
			//introTooltip_title 인근 시군구 폴리곤 클릭 기능
			introTooltipFunc : function(sido_cd, adm_cd, theme_cd, adm_nm, x_coord, y_coord, type) {
				$("#introTooltipTable td").removeClass("on");
				$("#introTooltipTable #"+adm_cd).addClass("on");
				var markers = null;
    			for (var i=0; i<$bizStatsMap.ui.introJobAreaMarkers.length; i++) {
    				if ($bizStatsMap.ui.introJobAreaMarkers[i].sido_cd == sido_cd) {
    					markers = $bizStatsMap.ui.introJobAreaMarkers[i].markers;
    					for(var j = 0; j < markers.length; j++) {
    						if(markers[j].options.adm_cd == adm_cd) {
    							var temp = $(markers[j]);
    							temp.on("click", function(e) {
					    			$bizStatsMap.callbackFunc.didSelectedPolygon(e, $bizStatsMap.ui.introJobAreaMarkers, "polygon", $bizStatsMap.callbackFunc.introTooltipOptions.map);
					    		});
    							temp.trigger("click");
    							break;
    						}
    					}
    				}
    			}
    			
    			//업종밀집도변화 버튼 재설정
    			$("#density").empty();
    			$("#density").html("<a onclick='javascript:$bizStatsMap.ui.companyDensityClick(\""+theme_cd+"\", \""+adm_cd+"\", \""+adm_nm+"\", \""+x_coord+"\", \""+y_coord+"\", \""+type+"\");'>업종 밀집도 변화</a>");
    			
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
			didDrawCreate : function(event, type, map) {
			}

	};
	
	$bizStatsMap.event = {
			
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
				Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
				
				var isClose = false;
				$(".tb_close").click(function(){ 
					isClose = true;
					$(this).hide(); 
					$(".resizeIcon").hide();
					$(".interactiveView").each(function(i){
						$(this).text("VIEW"+parseInt(i+1));
					});
					
					var sceneInx = $(".sceneBox.on").length;
					if (sceneInx == 1) {
						$(".viewTitle > span").hide();
					}else if (sceneInx == 2) {
						var tmpView = [];
						var isSameView = false;
						$(".sceneBox.on").each(function() {
							var id = parseInt($(this).attr("id").split("view")[1])-1;
							tmpView.push(id);
							if (id == $bizStatsMap.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$bizStatsMap.ui.curMapId = tmpView[0];
							}else {
								$bizStatsMap.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($bizStatsMap.ui.curMapId + 1);
							switch($bizStatsMap.ui.curMapId) {
								case 0:
									$("#"+id).find(".toolBar").css("background", "#0070c0");
									break;
								case 1:
									$("#"+id).find(".toolBar").css("background", "#9ed563");
									break;
								case 2:
									$("#"+id).find(".toolBar").css("background", "#ff0066");
									break;
							}
						}	
					}
			    }); 
				
				$(".sceneBox").click(function(){
					var sceneInx = $(".sceneBox.on").length; 
					var id = $(this).attr("id");
					if (sceneInx > 1) {
						if (!isClose) {
							$(".sceneBox").find(".toolBar").css("background", "#ffffff");
						}
						if (id == "view1") {
							$bizStatsMap.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$bizStatsMap.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$bizStatsMap.ui.curMapId = 2;
							$(this).find(".toolBar").css("background", "#ff0066");
						}
						$(".sceneBox").find(".tb_mapAdd").parent().show();
						
						if (sceneInx == 3) {
							$(".sceneBox").find(".tb_mapAdd").parent().hide();
							$(".sceneBox").css({"z-index":"8", "border":"2px solid #333"});
							$(this).css({"z-index":"10"});
							
						}
					}else {
						$(".sceneBox").find(".toolBar").css("background", "#ffffff");
					}
					isClose = false;
					
					//현재 선택된 맵으로 데이터보드 다시 그리기
					$bizStatsDataBoard.ui.reDraw($bizStatsMap.ui.curMapId);
					
					//Left Menu 통계표출 연동
					$bizStatsLeftMenu.ui.showNumberSetting();
			    });
				/*
				//사업체전개도 토글버튼
				$(".tb_inner .fl").click(function(){ 
					$(".tb_inner").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_inner .fr").click(function(){ 
					$(".tb_inner").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });
				
				//상권정보 토글버튼
				$(".tb_trade .fl").click(function(){ 
					$(".tb_trade").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_trade .fr").click(function(){ 
					$(".tb_trade").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });
				*/
				//투명도 설정 바
				$("#dataSlider_item").slider({
			    	range: "min",
			        min: 0.2,
			        max: 1,
			        value: 1,
			        step : 0.2,
			        slide: function( event, ui ) {  //ui.value
			        	$(".sqListBox.sq03").css("background-color", "rgba(255,255,255,"+ui.value+")");
				    }
			    });

			},
			
			
	};
	
}(window, document));