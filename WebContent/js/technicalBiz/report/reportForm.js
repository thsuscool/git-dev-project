/**
 * 
 */
(function(W, D) {
	W.$reportForm = W.$reportForm || {}
	
	$(document).ready(function() {	
		/*function LockF5() { 
	        if (event.keyCode == 116) { 
	            event.keyCode = 0; 
	            return false; 
	        }	
	    } 
	    document.onkeydown = LockF5;*/
	});
	
	$(window).load(function() {
		setTimeout(function() {
			if(window.opener != null && window.opener.$technicalBizMap){
				$("#interactiveTopDiv").remove();
				window.opener.$technicalBizMap.ui.reportLoad();
			}
		}, 500);
	});

	$reportForm.ui = {
				map : null,
				datas : null,
				mapType : null,
				totalDataList : null,
				dataGeojson : [],
				delegate : null,
				/*menuType : {
					"sido"			: 0,
					"sigungu"		: 1,
					"density"		: 2,
					"supply"		: 3,
					"industry"		: 4,
				},*/
				menuType : {
						"sido"			: 0,	//시도별 기술업종 현황
						"sigungu"		: 1,	//시군구별 기술업종 현황
						"density"	 	: 2,	//업종밀집도 변화
						"lq"			: 3,	//업종별 입지계수 지도			
						"search"		: 4,	//조건별 지역찾기
						"supply" 	 	: 5,	//지원시설 조회
						"industry"		: 6,		//산업단지 조회
						  
				},
				
				
				companyName : {
					theme_sum_01 : "교육시설",
					theme_sum_02 : "공공기관",
					theme_sum_03 : "금융시설",
					theme_sum_04 : "의료시설",
					theme_sum_05 : "대중교통",
					theme_sum_06 : "방범/방재",
					theme_sum_07 : "백화점/중대형마트",
					theme_sum_08 : "편의점",
					theme_sum_09 : "극장/영화관",
					theme_sum_10 : "도서관/박물관"
				},
				
				/**
				 * @name         : createMap
				 * @description  : 맵을 생성한다.
				 * @date         : 2015. 11. 10. 
				 * @author	     : 권차욱
				 * @param divId  : 맵 엘리먼트 아이디
				 * @param seq	 : 맵의 순번
				 */
				createMap : function(divId, seq) {
					var map = new sMap.map();
					map.createMap($reportForm, divId, {
						center : [ 989674, 1818313 ],
						zoom : 8,
						measureControl : false,
						statisticTileLayer: false
					});
					map.id = seq;
					this.map = map;
					map.gMap.whenReady(function() {
						window.opener.$interactiveMap.ui.reportLoad();
					});
					map.gMap.dragging.disable();
					map.gMap.scrollWheelZoom.disable();
					map.gMap.doubleClickZoom.disable();
				},
				
				/**
				 * @name         : setData
				 * @description  : 보고서를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 * @param maType : 보고서타입
				 */
				setData : function(data, options) {
					this.datas = data;
					this.mapType = options.mapType;
					this.drawMap(options);			//지도생성
					this.setMainReportInfo(data);	//보고서 제목, 출처, 일자 등 생성
					this.setLegend(data, options);	//범례생성
					this.setChart(data, options);	//차트생성
					this.setGrid(data, options);	//표생성
				},
				
				/**
				 * @name         : drawMap
				 * @description  : 보고서의 지도화면을 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param options: 옵션파라미터
				 */
				drawMap : function(options) {
					/*var clone = options.mapClone;
					var originWidth = options.mapWidth;
					var originHeight = options.mapHeight;
					var w = $(".pntMap").width();
					var h = $(".pntMap").height();
					
					//지도 크기, 배율 설정
		 			var scaleWidthValue = (originWidth / w).toFixed(2);
	 	 			var scaleHeightValue = (originHeight / h).toFixed(2);
	 	 			var scaleWidth = (w / originWidth) + 0.15;
	 	 			var scaleHeight = (h / originHeight);
	 	 			
	 	 			var reportMapCss = {
		 	 				"width" : originWidth+"px",
			 	 			"height" : originHeight+"px",
			 	 			"overflow":"hidden",
			 	 			"margin-left" : ((originWidth -w)*-1) / 2 + "px",
			 	 			"margin-top" : ((originHeight - h)*-1) / 2 + "px"
		 	 		};
	 	 			
	 	 			if(originWidth < w) {
	 	 				reportMapCss["transform"] = "scale("+scaleHeight+", "+scaleHeight+")";
	 	 			} else {
	 	 				reportMapCss["transform"] = "scale("+scaleWidth+", "+scaleHeight+")";
	 	 			}
					
					$(clone).find(".sop-control").hide();*/
					
					var originWidth = options.mapWidth;
					var originHeight = options.mapHeight;
					var rate = originWidth/originHeight;
					var height = 472;
					var width = parseInt(height*rate);
					var marginLeft = parseInt((798-width)/2);
		
					var reportMapCss = {
		 	 				"width" : width+"px",
			 	 			"height" : height+"px",
			 	 			"margin-left" : marginLeft+"px",
			 	 			"overflow":"hidden"
		 	 		};
					
					$("#reportMapDiv").attr("src", options.mapData);
					$("#reportMapDiv").css(reportMapCss);
					
					//열지도의 경우, 
					//canvas에 열지도를 그리는 것이라 html을 clone할 때,
					//데이터는 복사되지 않아 그려지지 않는다.
					//따라서 기존의 canvas를 다시 redraw하여 표출한다.
					/*if ($(clone).find(".sop-heatmap-layer").length) {
						var originCanvas = $(window.opener.document).find(".sop-heatmap-layer")[0]
						var image = new Image();
						image.src = originCanvas.toDataURL("image/png");
						
						var canvas = $(".sop-heatmap-layer")[0];
						canvas.width = image.width;
						canvas.height = image.height;
						canvas.getContext("2d").drawImage(image, 0, 0);
					}*/
				},
				
				/**
				 * @name         : drawPolygon
				 * @description  : 맵에 폴리곤을 그린다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				drawPolygon : function(data) {
					var legend = new sLegendInfo.legendInfo(this.map);			
					legend.initialize($reportForm.ui);
					this.map.legend = legend;
					this.map.legend.valPerSlice = data.legend.valPerSlice;
					this.map.legend.legendColor = data.legend.legendColor;
					this.map.legend.legendType = data.legend.legendType;
					this.map.legend.numberData = data.isCaption;
					this.map.legend.selectType = data.dataType;
					legend.valPerSlice = data.legend.valPerSlice;
					legend.legendColor = data.legend.legendColor;
					
					var adm_cd = "";
					if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
						for (var i=0; i<data.geojson.length; i++) {
							if (i==0) {
								adm_cd = data.geojson[i].features[0].properties.adm_cd;
							}					
							this.dataGeojson.push(this.map.addPolygonGeoJson(data.geojson[i], "data"));
						}
					}else {
						adm_cd = data.geojson.features[0].properties.adm_cd;
						this.dataGeojson.push(this.map.addPolygonGeoJson(data.geojson, "data"));
					}	
					this.map.legend.changeDataMode(data.dataType);
					
					//layer의 이벤트를 제거한다.
					this.map.gMap.eachLayer(function(layer) {
						layer.off("mouseover");
						layer.off("mouseout");
					});
				},
				
				/**
				 * @name         : setMainReportInfo
				 * @description  : 보고서의 기본적인 정보를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setMainReportInfo : function(data) {
					var date = $reportForm.Util.getToday();
					$("#reportTitle").val("보고서명 : " + data.param.title);
					$("#searchItem").html(data.param.searchClassNm);
					$("#date").html(date);
					if (data.origin != undefined && data.origin != null) {
						if (data.origin.indexOf(":") != -1) {
							var html = "";
							var originList = data.origin.split(":");
							for (var i=0; i<originList.length; i++) {
								html += originList[i];
								if (i < originList.length-1) {
									html += "<br>";
								}
							}
							$("#origin").html(html);
						}else {
							$("#origin").html(data.origin);
						}
					}
					
				},
				
				/**
				 * @name         : setLegend
				 * @description  : 보고서의 범례를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setLegend : function(data, options) {
					var map, legend, title, unit;
					if(window.opener.$technicalBizMap != undefined){
						map = window.opener.$technicalBizMap.ui.mapList[data.id];
					}
					
					switch(this.menuType[data.dataType]) {
						case 0:
							/*legend = options.legend;
							$(".pntLeft").css("width", "130px");
							$(".pntRight").css("width", "660px");
							$("#legend").append($(legend).html());
							$("#legendTitle").html("범례");
							$(".cateSaupLegend.line.type01").css("width", "130px");
							$(".cateSaupLegend.line.type02").css("width", "130px");
							$(".cateSaupLegend.line.type03").css("width", "130px");
							$(".cateSaupLegend.line.type04").css("width", "130px");*/
							//2017.03.13 pdf저장 이슈
							$("#pntLegend").hide();
							break;
						case 1://시군구별 기술업종 현황
						case 2://업종밀집도 변화
						case 3://업종별 입지계수 지도	
						case 4://조건별 지역찾기
						case 5://지원시설 조회
						case 6://산업단지 조회
							legend = $(map.legend.legendObj).clone().removeClass("min");
							title = "범례"; 
							$("#legend").append($(legend).html());
							$("#legendTitle").html(title);
							$("#legend").find(".legendRound").hide();
							$("#legend").find(".lgListBox").hide();
							$("#legend").css("width", "205px");
							break;
					}
				},
				
				/**
				 * @name         : setChart
				 * @description  : 차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setChart : function(data, options) {	
					var charts = options.chart;
					switch(this.menuType[data.dataType]){
					case 0: // 시도
						//2017.03.13 pdf저장 이슈
						var legend = options.chartLegend;
						//2017.11.24 개발팀 수정
						/*$("#summayDiv").find(".pntLeft").css("width", "130px");
						$("#summayDiv").find(".pntRight").css("width", "660px");
						$("#summayDiv").find("#legend").append($(legend).html());
						$("#summayDiv").find("#legendTitle").html("범례");*/
						if(charts[0].chartTab == 1){
							$("#summayDiv").find(".pntLeft").show();
							$("#summayDiv").find(".pntLeft").css("width", "130px");
							$("#summayDiv").find(".pntRight").css("width", "660px");
							$("#summayDiv").find("#legend").append($(legend).html());
							$("#summayDiv").find("#legendTitle").html("범례");
						}else{
							$("#summayDiv").find(".pntLeft").hide()
							/*$("#summayDiv").find(".pntLeft").css("width", "130px");*/
							$("#summayDiv").find(".pntRight").css("width", "800px");
							/*$("#summayDiv").find("#legend").append($(legend).html());*/
							/*$("#summayDiv").find("#legendTitle").html("입지계수");*/
						}
						
						//2017.11.24 개발팀 수정 종료
						$(".cateSaupLegend.line.type01").css("width", "130px");
						$(".cateSaupLegend.line.type02").css("width", "130px");
						$(".cateSaupLegend.line.type03").css("width", "130px");
						$(".cateSaupLegend.line.type04").css("width", "130px");
						createChartDiv("#summaryChartArea", charts[0]); // 업종별 지역특성정보
						createChartDiv("#firstChartDiv", charts[1]); // 경제총조사 현황
						$("#summayDiv").find(".chartContent").find("img").css("height", "240px");
						break;
					case 1: // 시군구
						//2017.03.13 pdf저장 이슈
						$("#summayDiv").hide();
						if(charts.length >3){
							createChartDiv("#firstChartDiv", $.extend(charts[0], {title: charts[0].title}));
							createChartDiv("#secondChartDiv", $.extend(charts[1], {title: charts[1].title}));
							//2017.11.30 개발팀 추가
							createChartDiv("#3rdChartDiv", $.extend(charts[2], {title: charts[2].title}));
							createChartDiv("#4thChartDiv", $.extend(charts[3], {title: charts[3].title}));
							
							$("#firstChartDiv").find(".typelabel").css("height","auto");
							$("#secondChartDiv").find(".typelabel").css("height","auto");
							$("#3rdChartDiv").find(".typelabel").css("height","auto");
							$("#4thChartDiv").find(".typelabel").css("height","auto");
							/*$(".btn-more").hide();*/
							//3rdChartDiv_show
							//"4thChartDiv_show"
						}else{
							createChartDiv("#firstChartDiv", $.extend(charts[0], {title: charts[0].title}));
						}
						
						
						break;
					case 2: // 밀집도
						//2017.03.13 pdf저장 이슈
						$("#summayDiv").hide();
						createChartDiv("#firstChartDiv", $.extend(charts[0], {title: charts[0].title}));
						break;
					
					case 3: //업종별 입지계수 지도
						console.log(charts);
						$("#summayDiv").hide();
						/*("#firstChartDiv").find(".typelabel").css("height","auto");*/
						console.log(charts);
						createChartDiv("#firstChartDiv", charts[0]);
						if(charts.length > 1){
							createChartDiv("#secondChartDiv", $.extend(charts[1],{title : charts[1].title}));
						}
						break;
					case 4: //조건별 지역찾기
						$("#summayDiv").hide();
						if(charts.length > 2){
							if(charts[2].idx == 1){
								createChartDiv("#firstChartDiv", charts[2]);
							}else if(charts[2].idx == 2){
								createChartDiv("#firstChartDiv", $.extend(charts[2],{title : charts[2].title}));
								$("#firstChartDiv").find(".typelabel").css("height","auto");
								$("#firstChartDiv").find(".btn-more").hide();
								$(".typelabel ").removeClass("hideable");
							}else if(charts[2].idx == 3){
								createChartDiv("#firstChartDiv", charts[2]);
							}else if(charts[2].idx == 4){
								createChartDiv("#firstChartDiv", charts[2]);
							}
						}
						break;
					
					case 5: // 지원
						$("#summayDiv").hide(); //2017.03.13 pdf저장 이슈
						for (var i=0; i<data.data.length; i++) {
							switch(data.data[i].type) {
								case "supplyRegionChart":
									var tmpData = data.data[i];
									var tmpCorpCntData = [], tmpWorkerCntData = [], tmpSeriesData = [], tmpCategories = [];
									var removeSidoNmFlag = 0;
									for (var k=0; k<tmpData.data.length; k++) {
										tmpCorpCntData.push(parseFloat(tmpData.data[k].corp_cnt.toFixed(2)));
										tmpWorkerCntData.push(parseFloat(tmpData.data[k].worker_cnt.toFixed(2)));
										if (tmpData.data[k].sido_nm != undefined) {
											tmpCategories.push(tmpData.data[k].sido_nm);	
										}else {
											
											
										//2017.04.13 읍면동의 경우 시도 시군구 삭제 leekh 
											var tmpAdmNm = tmpData.data[k].adm_nm;
											for(i=0; i<tmpAdmNm.length; i++){
												if(tmpAdmNm.charAt(i) == " "){
													removeSidoNmFlag = i;
												}
											}
											tmpAdnNm = tmpAdmNm.substring(removeSidoNmFlag);
											
											
											//tmpCategories.push(tmpData.data[k].adm_nm);
											tmpCategories.push(tmpAdnNm);
										}
									}
									tmpSeriesData.push({data:tmpCorpCntData});
									tmpSeriesData.push({data:tmpWorkerCntData});
									var seriesData = {
											categories : tmpCategories,
											series : tmpSeriesData,
											isLabel : true
									};
									
									//2017.03.13 pdf저장 이슈
									this.addBarChart("#firstChart", seriesData, 780, 230);
									$("#firstChart").css("margin", "0");
									$("#firstChartDiv").find(".chartTitle").html("전국시도별 현황 그래프");
									
									
									//2017.04.13 전국이 아닐때는 나오지 않음 leekh
									if(removeSidoNmFlag == 0){
										$("#firstChartDiv").show();
									}
									break;
								case "technicalBizInfoChart":
									//2017.03.13 pdf저장 이슈
									createChartDiv("#secondChartDiv", charts[0]); // 시군구별 기술업종 중분류별 점유율
									break;
								case "majorFacilityBarChart":
									//2017.03.13 pdf저장 이슈
									createChartDiv("#3rdChartDiv", charts[1]); // 시군구별 기술업종 중분류별 점유율
									break;
								default:
									break;
							}
						}
						break;
					case 6: // 산업
						//2017.03.13 pdf저장 이슈
						//=================================== START ======================================//
						$("#summayDiv").hide(); 
						for (var i=0; i<data.data.length; i++) {
							switch(data.data[i].type) {
								case "industryRegionChart":
									var tmpData = data.data[i];
									var seriesData = {
											categories : tmpData.data.categories,
											series : tmpData.data.seriesData,
											isLabel : true
									};
									//2017.03.13 pdf저장 이슈
									this.addBarChart("#firstChart", seriesData, 780, 230);
									$("#firstChart").css("margin", "0");
									$("#firstChartDiv").find(".chartTitle").html("전국시도별 현황 그래프");
									$("#firstChartDiv").show();
									break;
								case "technicalBizInfoChart":
									createChartDiv("#firstChartDiv", charts[0]); // 시군구별 기술업종 중분류별 점유율
									break;
								case "majorFacilityBarChart":
									createChartDiv("#secondChartDiv", charts[1]); // 시군구별 기술업종 중분류별 점유율
									break;
								case "industryVariationStateLineChart":
									createChartDiv("#3rdChartDiv", charts[2]); // 산업단지 내 기술업종 증감현황
									break;
								case "industryDistributionStateRadialShapeChart":
									createChartDiv("#4thChartDiv", charts[3]); // 산업단지 내 기술업종 분포현황
									break;	
								case "industryDetailStateBarChart":	// 산업단지 내 기술업종 상세현황
									createChartDiv("#5thChartDiv", charts[4]); // 산업단지 내 기술업종 분포현황
									break;
								case "industryImportantFacilityStateBarChart":
									createChartDiv("#6thChartDiv", charts[5]); // 산업단지 내 기술업종 주요시설현황
									break;
								default:
									break;
							}
						}
						//=================================== END ======================================//
						break;
					}
					
					function createChartDiv(id, chartData){
						if(!id || !chartData.data || !chartData.title) return;

						$(id).show();
						$(id).find(".chartTitle").html(chartData.title);
						
						if(chartData.legend){
							if(chartData.legend.length){
								var chartInfo = $("<div class='chartAreaType02 t01'></div>");
								chartInfo.append("<img src='" + chartData.data + "'>");
								chartInfo.append(chartData.legend[0].outerHTML);
								
								$(id).find(".chartContent").append(chartInfo);
							}else{
								$(id).find(".chartContent").append("<img src='" + chartData.data + "'>");
							}
						}else{
							$(id).find(".chartContent").append("<img src='" + chartData.data + "'>");
						}
					}
				},
				
				/**
				 * @name         : setGrid
				 * @description  : 표를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setGrid : function(data, options) {
					var chartData = data.data;
					switch(this.menuType[data.dataType]){
					case 0: // 시도
						var sidoFeatureChartData = $.pick(chartData, {type: "sidoFeatureChart"});
						var sidoEconomyChartData = $.pick(chartData, {type: "sidoEconomyChart"});
						
						//시도 기술업종 분포현황
						switch(data.param.featureType){
							case 'basic':
								for (var i=0; i<sidoFeatureChartData.data.length; i++) {
									var tmpData = sidoFeatureChartData.data[i]["corp_per_avg"];
									sidoFeatureChartData.data[i]["corp_per_avg"] = parseFloat(tmpData).toFixed(2);
								}
								var featureColumn = ["m_class_nm", "corp_per", "sido_z_score", "corp_per_avg", "tot_z_score"];
								gridSetting("#sidoFeatureGrid", sidoFeatureChartData.data, featureColumn);
								break;
							case 'detail':
								var featureDetailColumn = ["m_class_nm", "corp_cnt_z_score", "corp_per_z_score", "corp_irds_z_score", 
								                           "worker_cnt_z_score", "worker_per_z_score", "worker_irds_z_score"];
								gridSetting("#sidoFeatureDetailGrid", sidoFeatureChartData.data, featureDetailColumn);
								break;
						}
						
						//경제총조사
						var economyColumn = ["m_class_nm", "sales", "lbcst", "rntchrg", "business_profit"];
						gridSetting("#sidoEconomyGrid", sidoEconomyChartData.data, economyColumn);
						
						$(".sidoNm").html(data.param.adm_nm);
						
						break;
					case 1: // 시군구
						var sigunguClassChartData = $.pick(chartData, {type: "sigunguClassChart"});
						var sidoClassChartData = $.pick(chartData, {type: "sidoClassChart"});
						var sigunguRankChartData = $.pick(chartData, {type: "sigunguRankChart"});
						
						var classColumn = ["s_class_nm", "corp_cnt", "corp_per", "corp_irdsrate", "worker_cnt", "worker_per", "worker_irdsrate"];
						var rankColumn = ["sgg_nm", "corp_cnt", "corp_per", "resid_ppltn_cnt", "worker_cnt", "avg_worker_cnt"];

						$("#sigunguClassGrid #sClassNm").html(sigunguClassChartData.data[0].sido_nm + " " + (sigunguClassChartData.data[0].sgg_nm || ""));
						gridSetting("#sigunguClassGrid", sigunguClassChartData.data, classColumn);
						
						$("#sidoClassGrid #sClassNm").html(sidoClassChartData.data[0].sido_nm + " " + (sidoClassChartData.data[0].sgg_nm || ""));
						gridSetting("#sidoClassGrid", sidoClassChartData.data, classColumn);
						
						$("#sigunguRankGrid #sidoNm").html(sigunguRankChartData.data[0].sido_nm);
						gridSetting("#sigunguRankGrid", sigunguRankChartData.data, rankColumn);
						
						break;
					case 2: // 밀집도
						var densityCombinedChartData = $.pick(chartData, {type: "densityCombinedChart"});
						var column = ["base_year", "corp_cnt"];
						
						$("#densityCombinedGrid #mClassNm").html("(" + data.param.m_class_nm + ")");
						$("#densityCombinedGrid #sClassNm").html("(" + data.param.s_class_nm + ")");
						
						gridSetting("#densityCombinedGrid", densityCombinedChartData.data, column);
						break;
					case 3: //업종별 입지계수
						var column = ["adm_nm", "country_vs_corp_lq", "country_vs_worker_lq"];
						
						$reportForm.ui.onOffDiv('upjongGrid');
						
						$("#upjongGrid #sClassNm").html("업종별 입지계수");
						
						var lqInfoLctChartData = $.pick(chartData, {type: "lqInfoLctChart"});
						gridSetting("#upjongGrid", lqInfoLctChartData.data, column);
						
						break;
					case 4: //조건별 지역찾기
						console.log(data);
						console.log(options)
						
						var charts = options.chart;
						var optionStandard = charts[0].data;
						
						$reportForm.ui.onOffDiv('searchOptionGrid');
						var techbiz_cd = {
								"00" : "전체",
								"11" : "첨단기술", 
								"12" : "고기술",
								"13" : "중기술",
								"14" : "저기술",
								"21" : "창의 및 디지털",
								"22" : "ICT",
								"23" : "전문서비스업종"
							}
						var selectInfoType = optionStandard.selectInfoType;
						var option1 = optionStandard.option1;
						var option2 = optionStandard.option2;
						var selectInfoName = "입지계수";
						var oFromVal1 = optionStandard.param.from_corp_lq;
						var oToVal1 = optionStandard.param.to_corp_lq;
						var oFromVal2 = optionStandard.param.from_worker_lq;
						var oToVa2 = optionStandard.param.to_worker_lq;
						
						if(selectInfoType != "lq"){
							selectInfoName = "증감률";
				    	}
						

						var html = 	'<div class="btListBox t01" id="technicalSearcParamInfo">'
				    	html += 		'<a href="javascript:void(0)" style="width:143px">'
				    	html += 			'<span class="t01">업종선택</span>'
				    	html += 			'<span class="t02">'+techbiz_cd[optionStandard.techbiz_class_cd]+'</span>'
				    	html += 		'</a>'
				    	html += 		'<a href="javascript:void(0)" style="width:143px">'
				    	
				    	html += 			'<span class="t01">사업체 '+selectInfoName+'</span>'
				    	if(option1 == true){
				    		html += 			'<span class="t02">'+oFromVal1+'~'+oToVal1+'</span>'
				    	}else{
				    		html += 			'<span class="t02">미선택</span>'
				    	}
				    	
				    	html += 		'</a>'
				    	html += 		'<a href="javascript:void(0)" style="width:143px">'
				    	html += 			'<span class="t01">종사자 '+selectInfoName+'</span>'
				    	if(option2 == true){
				    		html += 			'<span class="t02">'+oFromVal2+'~'+oToVa2+'</span>'
				    	}else{
				    		html += 			'<span class="t02">미선택</span>'
				    	}
				    	html += 		'</a>'
				    	html += 		'<a href="javascript:void(0)" style="width:143px">'
				    	html += 			'<span class="t01">창업  지원시설</span>'
				    	if(optionStandard.is_contain_bizfac){
				    		html += 			'<span class="t02">포함</span>'
				    	}else{
				    		html += 			'<span class="t02">미포함</span>'
				    	}
				    	html += 		'</a>'
				    	html += 		'<a href="javascript:void(0)" style="width:143px">'
				    	html += 			'<span class="t01">산업단지</span>'
				    	if(optionStandard.is_contain_bizfac){
				    		html += 			'<span class="t02">포함</span>'
				    	}else{
				    		html += 			'<span class="t02">미포함</span>'
				    	}
				    	html += 		'</a>' 
				    	/*html += '</div>'*/
				    
						
						var dataArray = charts[1].data;
						$reportForm.ui.onOffDiv('searchData');
						//$("#searchOptionDiv").html(html);
						//searchData
						console.log(dataArray);
						html +="<div style='margin-left:13px'>";
						html += "<table width='730px'>";
						html += "<tr>";
						html += "<td>지역명</td>";
						html += "<td>기술업종 명</td>";
						html += "<td>사업체 증감률</td>";
						html += "<td>종사자 증감률</td>";
						html += "<td>사업체 입지계수</td>";
						html += "<td>종사자 입지계수</td>";
						html += "<td>지원시설 수</td>";
						html += "<td>산업단지 수</td>";
						html += "</tr>";
						for(var i =0; i < dataArray.length; i++){
							var rowSpanNumber = Number(dataArray[i].techBiz.length)+1;
							html += "<tr>";
							html += "<td rowspan='"+rowSpanNumber+"'>"+dataArray[i].adm_nm+"</td>";
							html += "</tr>";
							
							for(var j = 0; j < dataArray[i].techBiz.length; j++){
								html +="<tr>";
								html +="<td>";
								html +=techbiz_cd[dataArray[i].techBiz[j]];
								html +="</td>";
								html +="<td>";
								html +=dataArray[i].corp_irds[j];
								html +="</td>";
								html +="<td>";
								html +=dataArray[i].worker_irds[j];
								html +="</td>";
								html +="<td>";
								html +=dataArray[i].country_vs_corp_lq[j];
								html +="</td>";
								html +="<td>";
								html +=dataArray[i].country_vs_worker_lq[j];
								html +="</td>";
								
								if(j == 0){
									html += "<td rowSpan='"+rowSpanNumber+"'>"+dataArray[i].bizfac_cnt+"</td>";
									html += "<td rowSpan='"+rowSpanNumber+"'>"+dataArray[i].induscom_cnt+"</td>";
									
								}
								
								
								html +="</tr>";
							
							}
						
						}
						
						
						
						html += "</table>";
						html+="</div>";
						html += '</div>'
						$("#searchOptionDiv").html(html);
						
						//searchOptionGrid
						
						if(charts.length >2){
							$("#searchOptionGrid").hide();
						}else{
							$("#searchOptionGrid").show();
						}
						//검색 지역 찾기
						break;
					case 5: // 지원
						var column,  markerColumn, majorColumn, regionColumn;
						for (var i=0; i<chartData.length; i++) {
							switch(chartData[i].type) {
								case "supplyRegionChart":
									column = ["sido_nm", "corp_cnt", "worker_cnt"];
									var supplyRegionChartData = $.pick(chartData, {type: "supplyRegionChart"});
									if (supplyRegionChartData != undefined) {
										for (var k=0; k<supplyRegionChartData.data.length; k++) {
											supplyRegionChartData.data[k].corp_cnt = parseFloat(parseFloat(supplyRegionChartData.data[k].corp_cnt).toFixed(2));
											supplyRegionChartData.data[k].worker_cnt = parseFloat(parseFloat(supplyRegionChartData.data[k].worker_cnt).toFixed(2));
										}
										if (supplyRegionChartData.data[0].sido_nm == undefined) {
											column[0] = "adm_nm";
										}
										gridSetting("#supplyRegionGrid", supplyRegionChartData.data, column);
									}
									break;
								case "supplyMarker":
									markerColumn = ["lct_type_nm", "inst_nm", "addr"];
									var supplyPoiData = $.pick(chartData, {type: "supplyMarker"});
									if (supplyPoiData != undefined) {
										gridSetting("#poiRegion", supplyPoiData.data, markerColumn);
									}
									break;
								case "technicalBizInfoChart":
									regionColumn = ["base_year", "techbiz_s_class_cd_nm", "upper_corp_cnt", "upper_corp_per", "corp_cnt", "corp_per"];
									var regionData = $.pick(chartData, {type: "technicalBizInfoChart"});
									if (regionData != undefined) {
										gridSetting("#gridRegionInfo", regionData.data, regionColumn);
									}
									break;
								case "majorFacilityBarChart":
									majorColumn = ["0", "1"];
									var majorData = $.pick(chartData, {type: "majorFacilityBarChart"});
									if (majorData != undefined) {
										gridSetting("#majorInfo", majorData.data, majorColumn);
									}
									break;
							}
							
						}
						break;
					case 6: // 산업
						var column,  markerColumn, majorColumn, regionColumn, variationLineColumn, distributionColumn, detailStateBarColumn, importantFacilityBarColumn;
						for (var i=0; i<chartData.length; i++) {
							switch(chartData[i].type) {
								case "supplyRegionChart":
									column = ["sido_nm", "corp_cnt", "worker_cnt"];
									var supplyRegionChartData = $.pick(chartData, {type: "supplyRegionChart"});
									if (supplyRegionChartData != undefined) {
										if (supplyRegionChartData.data[0].sido_nm == undefined) {
											column[0] = "adm_nm";
										}
										gridSetting("#supplyRegionGrid", supplyRegionChartData.data, column);
									}
								break;
								case "industryRegionChart":
									column = ["adm_nm", "corp_cnt", "induscom_cnt"];
									var industryRegionChartData = $.pick(chartData, {type: "industryRegionChart"});
									if (industryRegionChartData != undefined) {
										var tmpDataList = [];
										var categoryData = industryRegionChartData.data.categories;
										for (var k=0; k<categoryData.length; k++) {
											var tmpData = {
													adm_nm : categoryData[k],
													corp_cnt : industryRegionChartData.data.seriesData[0].data[k],
													induscom_cnt : industryRegionChartData.data.seriesData[1].data[k]
											}
											tmpDataList.push(tmpData);
										}
										gridSetting("#industryRegionGrid", tmpDataList, column);
									}
									break;
								case "industryMarker":
									markerColumn = ["complex_nm", "sido_nm", "sgg_nm", "x_coor", "y_coor"];
									var supplyPoiData = $.pick(chartData, {type: "industryMarker"});
									if (supplyPoiData != undefined) {
										gridSetting("#poiIndustyRegion", supplyPoiData.data, markerColumn);
									}
									break;
								case "technicalBizInfoChart":
									regionColumn = ["base_year", "techbiz_s_class_cd_nm", "upper_corp_cnt", "upper_corp_per", "corp_cnt", "corp_per"];
									var regionData = $.pick(chartData, {type: "technicalBizInfoChart"});
									if (regionData != undefined) {
										gridSetting("#gridRegionInfo", regionData.data, regionColumn);
									}
									break;
								case "majorFacilityBarChart":
									majorColumn = ["0", "1"];
									var majorData = $.pick(chartData, {type: "majorFacilityBarChart"});
									if (majorData != undefined) {
										gridSetting("#majorInfo", majorData.data, majorColumn);
									}
									break;
								case "industryVariationStateLineChart":
									variationLineColumn = ["base_year", "corp_cnt", "worker_cnt"];
									var variationLineData = $.pick(chartData, {type: "industryVariationStateLineChart"});
									if (variationLineData != undefined) {
										gridSetting("#variationLineInfo", variationLineData.data, variationLineColumn);
									}
									break;
								case "industryDistributionStateRadialShapeChart":
									distributionColumn = ["uptode_tech", "high_tech", "mid_tech", "low_tech", "orgidea_dgtl", "ict", "spclty_srv"];
									var distributionData = $.pick(chartData, {type: "industryDistributionStateRadialShapeChart"});
									if (distributionData != undefined) {
										gridSetting("#distributionInfo", distributionData.data, distributionColumn);
									} 
									break;	
								case "industryDetailStateBarChart":
									detailStateBarColumn = ["techbiz_s_class_cd_nm", "corp_cnt", "corp_avg"];
									var detailStateBarData = $.pick(chartData, {type: "industryDetailStateBarChart"});
									if (detailStateBarData != undefined) {
										gridSetting("#detailStateBarInfo", detailStateBarData.data, detailStateBarColumn);
									} 
									break;
								case "industryImportantFacilityStateBarChart":
									importantFacilityBarColumn = ["category", "pub_inst", "transport_fac", "fnnc_inst", "univ", "found_support_fac"];
									var categoryList = ["평균주요시설수", "주요시설수"];
									var importantFacilityBarData = $.pick(chartData, {type: "industryImportantFacilityStateBarChart"});
									for (var k=0; k<importantFacilityBarData.data.length; k++) {
										importantFacilityBarData.data[k]["category"] = categoryList[k];
										for (var p in importantFacilityBarData.data[k]) {
											if (p != "category") {
												importantFacilityBarData.data[k][p] = parseFloat(parseFloat(importantFacilityBarData.data[k][p]).toFixed(2));
											}
										}
									}
									if (importantFacilityBarData != undefined) {
										gridSetting("#importantFacilityStateBarInfo", importantFacilityBarData.data, importantFacilityBarColumn);
									} 
									break;
							}
							
						}
						break;
					}
					
					// 값 세팅.. 컬럼명 맞아야 함
					function gridSetting(id, data, columns){
						if(!id || !data || !columns) return;
						if(!$.isArray(data)) gridSetting(id, [data], columns);
						$(id).show();
						for(var i=0; i<data.length; i++){
							var html = "<tr>";
							for(var k=0; k<columns.length; k++){
								if(v = data[i][columns[k]])
									html += "<td>" + ((v%1 == 0 && columns[k] != "base_year") ? appendCommaToNumber(v) : v)   + "</td>";
								else {
									if (data[i][columns[k]] == 0) {
										html += "<td>"+data[i][columns[k]]+"</td>";
									}else {
										html += "<td></td>";
									}
								}
							}
							html += "</tr>";
							
							$(id).find("#tBody").append(html);
						}
						
						// 2016.12.02 시큐어코딩
						return;
					}
					
					$("#mask").hide();
				},
				
				/**
				 * @name         : getGridData
				 * @description  : 표 정보를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				getGridData : function(geojson, tmpDataList, adm_cd, options) {
					var adm_nm, coord_x, coord_y;
					var value = 0;
					var rate = 0;
					var color = "#F0FFF0";
					for (var i=0; i<geojson.features.length; i++) {
						var feature = geojson.features[i];
						adm_nm = feature.properties.adm_nm;
						coord_x = feature.properties.x;
						coord_y = feature.properties.y;
						value = 0;
						rate = 0;
						color = "#F0FFF0";
													
						if (feature.info.length > 0) {
							var tmpValue = null;
							if (feature.isKosis != undefined && feature.isKosis) {
								info = feature.info;
								tmpValue = info[0];
							}else {
								info = feature.info[0];
								tmpValue = info[info.showData];
								adm_cd = info.adm_cd;
							}
							value = parseFloat(tmpValue);
							rate = (parseFloat(tmpValue) / options.total) * 100;
							color = options.legend.getColor(value, options.legend.valPerSlice[0])[0];
						}
						var param = {
								adm_cd : adm_cd,
								adm_nm :adm_nm,
								value : value,
								rate : rate,
								color : color,
								x : coord_x,
								y : coord_y
						}
						tmpDataList.push(param);
					}
				},
				
				/**
				 * @name         : drawGrid
				 * @description  : 표를 표출한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				drawGrid : function(data) {
					var gridList = data.dataList;
					var total = data.total;
					var unit = data.unit;
					var adm_nm = data.adm_nm;
					var html = "";
					for (var i=0; i<gridList.length; i++) {
						html += "<tr>";
		 				html += 	"<td class='al' id='adm_nm_"+i+"'>"+gridList[i].adm_nm+"</td>";
		 				html += 	"<td class='ar'><div class='valueBox'><span class='bg' style='background:"+gridList[i].color+"'></span><span class='txt'>"+(i+1)+"</span></div></td>";

		 				if(gridList[i].value == 0) {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>N/A</span></td>";
		 				} else {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(gridList[i].value/gridList[0].value*100)+"%; background:rgba(76,139,253,1); '></span><span class='txt'>"+appendCommaToNumber(gridList[i].value)+"</span></td>";
		 				}
		 				
		 	 			html += "<td class='ar'><div class='valueBox'><span class='txt'>"+gridList[i].rate.toFixed(2)+"</span></div></td>";
		 				html += "</tr>";
					}
					$("#mask").hide();
					$("#interactiveMapTableRegion").find("#tBody").append(html);
					//$("#tAdmName").html(adm_nm);
					$("#tUnit").html(unit);
					$("#tTotal").html(appendCommaToNumber(total));
				},
				
				/**
				 * @name         : addBarChart
				 * @description  : 바차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				addBarChart : function(divId, param, width, height) {
					$(divId).highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', height: height, width:width
				        },
				        exporting: { enabled: false }, //2017.03.13 pdf저장 이슈
				        title: {
				            text: ''
				        },
				        xAxis: {
				            categories: param.categories,
				            labels : {
				            	rotation: -45,
				            	enabled: param.isLabel
				            }
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ""
				            }
				        },
				        legend: {
				        	enabled: false
				        },
				        plotOptions: {
				            column: {
				                pointPadding: 0.2,
				                borderWidth: 0
				            }
				        },
				        series: param.series
				    });
					
					//2017.03.13 pdf저장 이슈
					setTimeout(function() {
						$reportForm.Util.chartToImage(divId, "#firstChart", width, height);
					}, 300);
					
				},
				
				/**
				 * @name         : onOffDiv
				 * @description  : 보고서 항목을 on/off한다.
				 * @date         : 2016. 08. 29. 
				 * @author	     : 
				 * @param data   : 보고서 div
				 */
				onOffDiv : function(value) {
					if($("#" + value).css("display") == "none"){
						$("#" + value + "_show").hide();
						$("#" + value).show();
					}else{
						$("#" + value).hide();
						$("#" + value + "_show").show();
					}
				},
				
				/**
				 * @name         : setNewDiv
				 * @description  : 변경된 보고서디자인을 적용한다(공공데이터 제외)
				 * @date         : 2016. 08. 29. 
				 * @author	     : 
				 * @param data   : 보고서데이터(mapType)
				 */
				setNewDiv : function(data) {
					if(data == 'publicData'){
						$("#interactiveTopDiv").remove();
					}else{
						$("#bizStatsTopDiv").remove();
					}
				}
				
				
		 		
		 		
		 		
	},

	$reportForm.Util = {
				//Data를 순서대로 정렬하고, 비율 삽입
				tableDataSort : function(data) {
					var totalSum = 0;
		 	 		data.sort(function(a, b){
		 	 			var x = Number(a.value);
		 	 			var y = Number(b.value);
		 	 			if (x > y) return -1;
		 	 			if (x < y) return 1;
		 	 			return 0;
		 	 		});
		 	 		
		 	 		totalSum = this.tableDataSum(data);
		 	 		for(var i = 0; i < data.length; i ++) {	//비율 구하기
		 	 			if(data[i].value == 0) {
		 	 				data[i].rate = 0;
		 	 			} else {
		 	 				data[i].rate = (data[i].value / totalSum * 100).toFixed(1);
		 	 			}
		 	 		}
		 	 		return data;
				},
				
				//지역과 데이터 매핑
				admCdSet : function(admCdList, data) {
					var dataList = [];
					var tmpObj = {};
					//지역 데이터
					for(var i = 0; i < admCdList.length; i ++) {
						var admNm = admCdList[i].adm_nm;
						var admCd = admCdList[i].adm_cd;
						//기본값
						tmpObj = {
								item : admNm,
								itemCd : admCd,
								value : 0,
								color : "#fff"
						}
						//정보 데이터
						for(var x = 0; x < data.length; x ++) {
							//지역코드와 매핑
							if(data[x].itemCd == admCd) {
								data[x].item = admNm;
								if(data[x].value == undefined) { data[x].value = 0; }
								tmpObj =data[x];
							}
						}
						dataList.push(tmpObj);
					}
					return dataList;
				},
				
				//Data 총 합계 구하기
				tableDataSum : function(data) {
					var totalSum = 0;
					for(var i = 0; i < data.length; i ++) {
		 	 			totalSum += Number(data[i].value);
		 	 		}
					return totalSum;
				},
				
				//오늘날짜 가져오기
				getToday : function() {
					var today = new Date();
	 	 			var y = today.getFullYear();
	 	 			var m = today.getMonth()+1;
	 	 			var d = today.getDate();
	 	 			var h = today.getHours();
	 	 			var mn = today.getMinutes();
	 	 			
	 	 			var returnDate = "";
	 	 			if(m < 10) {
	 	 				m = "0" + m;
	 	 			}
	 	 			if(d < 10) {
	 	 				d = "0" + d;
	 	 			}
	 	 			if(h < 10) {
	 	 				h = "0" + h;
	 	 			}
	 	 			if(mn < 10) {
	 	 				mn = "0" + mn;
	 	 			}
	 	 			returnDate = y + "년 " + m + "월 " + d + "일 " + h + "시 " + mn + "분";
	 	 			
	 	 			return returnDate;
				},
				
				//천단위 콤마
				addComma : function(num) {
					var len, point, str;
					
					num = num + "";
					var tmpNum = null;
					var tmpMod = null;
					if (num.indexOf(".") == -1) {
						tmpNum = num;
					}else {
						tmpNum = num.split(".")[0];
						tmpMod = "." + num.split(".")[1];
					}

					point = tmpNum.length % 3;
					len = tmpNum.length;
					
					str = tmpNum.substring(0, point);
					while (point < len) {
						if (str != "")
							str += ",";
						str += tmpNum.substring(point, point + 3);
						point += 3;
					}

					if (tmpMod != null && tmpMod.length > 0) {
						str = str + tmpMod;
					}
					return str;
				},
				
				chartToImage : function(srcDiv, dscDiv, width, height) {
/*					if (width == undefined) {
						width = 770;
					}
					if (height == undefined) {
						height = 220;
					}
					var chart = $(srcDiv).highcharts();
					var render_width = width;
				    var render_height = height;

				    var svg = chart.getSVG({
				        exporting: {
				            sourceWidth: chart.chartWidth,
				            sourceHeight: chart.chartHeight
				        }
				    });

				    $(dscDiv).empty();
				    var image = document.createElement('img');
				    image.height = render_height;
				    image.width = render_width;
				    $(dscDiv).append(image);
				    $(image).attr("src",  'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))));*/
				    
				   //2017.03.13 pdf저장 이슈
				    if (width == undefined) {
						width = 770;
					}
					if (height == undefined) {
						height = 220;
					}
				    var image = document.createElement('img');
				    image.height = height;
				    image.width = width;
				    setTimeout(function() {
				    	 var doc = document.querySelector(srcDiv);
						 var svg = doc.querySelector("svg");
						 var xml  = new XMLSerializer().serializeToString(svg);
		                 var canvas = document.createElement("canvas");
		                 canvg(canvas, xml);
		                 $(image).attr("src", canvas.toDataURL());
		                 $(dscDiv).empty();
		                 $(dscDiv).append(image);
				    }, 500);  
				    
				    
				}
				
	},
	
	$reportForm.Request = {
			/**
			 * @name         : reportReverseGeoCode
			 * @description  : OpenAPI 리버스지오코딩 (집계구 주소 변환)
			 * @date         : 2015. 07. 30. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param  center
			 * @param  options
			 */
			reportReverseGeoCode : function (x, y, optData, idx) {
				var sopReportReverseGeoCodeObj = new sop.report.ReverseGeoCode.api();
				sopReportReverseGeoCodeObj.addParam("accessToken", accessToken);
				sopReportReverseGeoCodeObj.addParam("addr_type", "10");
				sopReportReverseGeoCodeObj.addParam("x_coor", x);
				sopReportReverseGeoCodeObj.addParam("y_coor", y);
				
				sopReportReverseGeoCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						data : optData,
						idx : idx,
						x : x,
						y : y
					}
				});
			}
	};
	
	/** ********* OpenAPI 보고서용 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.report.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var idx = options.idx;
				var data = options.data;
				var coord_x = options.x;
				var coord_y = options.y;
				var length = data.dataList.length;
				var adm_nm = "";
				
				switch(res.errCd) {
					case 0:
						if (idx < length) {
							var fullAddr = result[0].full_addr.split(" ");
							var roadNm = "";
							if(fullAddr.length < 4) {
								roadNm = "";
							} else {
								roadNm = fullAddr[fullAddr.length - 2] + " " + fullAddr[fullAddr.length - 1] + " 부근 " ;
							}		
							adm_nm = "(집계구 - " + data.dataList[idx].adm_cd + ") " + roadNm;
							data.dataList[idx].adm_nm = adm_nm;
							$("#adm_nm_"+idx).html(adm_nm);
							
							/*idx++;
							if (idx < length) {
								$reportForm.Request.reportReverseGeoCode(data.dataList[idx].x, data.dataList[idx].y, data, idx);
							}*/
						}
						break;
					case -401:
						accessTokenInfo(function() {
							$reportForm.Request.reportReverseGeoCode(coord_x, coord_y, data, idx);
						});
						break;
					case -100:
						adm_nm = "(집계구 - " + data.dataList[idx].adm_cd + ") ";
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
											
						idx++;
						if (idx < length) {
							$reportForm.
							Request.reportReverseGeoCode(data.dataList[idx].x, data.dataList[idx].y, data, idx);
						}
						break;
					default:
						adm_nm = "(집계구 - " + data.dataList[idx].adm_cd + ")";
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
						break;
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 보고서용 리버스지오코딩. End ********* */
	
}(window, document));


