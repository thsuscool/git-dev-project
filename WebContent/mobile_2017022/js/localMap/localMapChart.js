/**
 * 창업통계 차트 기능에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/11/20  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$localMapChart = W.$localMapChart || {};

	$localMapChart = {
		chart: function() {
			var that = this;
			this.curAdmCd = null;
			this.currThemeCdFirst = null;
			this.currThemeCdSecond = null;
			this.powerSwiper = false;
			this.incDec = false;
			this.updateChart = function(idx, adm_cd) {
				if (adm_cd && adm_cd.length > 7) {
					adm_cd = adm_cd.substring(0, 7);
				}
				if (idx == 1) {
					this.localTotalChart(adm_cd); //지역종합 차트
				} else if (idx == 2) {
					this.populationChart(adm_cd); //인구 차트
				} else if (idx == 3) {
					this.housesummaryChart(adm_cd); //거처 차트
				} else if (idx == 4) {
					this.corpdistsummaryChart(adm_cd);//사업체 차트
				} else if (idx == 5) {
					this.houseChart($("#areainfo_05>div[class^=areainfo_0]:visible").data("house"), adm_cd);//주택동향 차트
				}
			}
			//지역종합 통계
			this.localTotalChart = function(adm_cd) {
				this.curAdmCd = adm_cd;
				var sopPortalRegionTotalChartDrawObj = new sop.portal.regionTotalChartDraw.api();
				sopPortalRegionTotalChartDrawObj.addParam("accessToken", accessToken);
				sopPortalRegionTotalChartDrawObj.addParam("adm_cd", adm_cd);
				sopPortalRegionTotalChartDrawObj.request({
					method: "GET",
					async: false,
					url: openApiPath + "/OpenAPI3/startupbiz/regiontotal.json",
					options: {
						target: this,
						adm_cd : adm_cd
					}
				});
			}
			//인구 통계
			this.populationChart = function(adm_cd) {
				this.curAdmCd = adm_cd;
				var populRadio = $("input:radio[name=populationRadio]:checked").val();
				$("#areainfo_02>div[id^=pplDiv]").hide();
				$("#pplDiv" + populRadio).show();
				if (populRadio == "Age") {
					var sopPortalPplAgeChartDrawObj = new sop.portal.pplAgeChartDraw.api();
					sopPortalPplAgeChartDrawObj.addParam("accessToken", accessToken);
					sopPortalPplAgeChartDrawObj.addParam("adm_cd", adm_cd);
					sopPortalPplAgeChartDrawObj.request({
						method: "GET",
						async: false,
						url: openApiPath + "/OpenAPI3/startupbiz/pplsummary.json",
						options: {
							target: this,
							adm_cd : adm_cd
						}
					});
				} else {
					var sopPortalPplGenderChartDrawObj = new sop.portal.pplGenderChartDraw.api();
					sopPortalPplGenderChartDrawObj.addParam("accessToken", accessToken);
					sopPortalPplGenderChartDrawObj.addParam("adm_cd", adm_cd);
					sopPortalPplGenderChartDrawObj.request({
						method: "GET",
						async: false,
						url: openApiPath + "/OpenAPI3/startupbiz/mfratiosummary.json",
						options: {
							target: this,
							adm_cd : adm_cd
						}
					});
				}
			}
			//거처 통계
			this.housesummaryChart = function(adm_cd) {
				this.curAdmCd = adm_cd;
				var sopPortalHousesumChartDrawObj = new sop.portal.housesumChartDraw.api();
				sopPortalHousesumChartDrawObj.addParam("accessToken", accessToken);
				sopPortalHousesumChartDrawObj.addParam("adm_cd", adm_cd);
				sopPortalHousesumChartDrawObj.request({
					method: "GET",
					async: false,
					url: openApiPath + "/OpenAPI3/startupbiz/housesummary.json",
					options: {
						target: this,
						adm_cd : adm_cd
					}
				});
			}
			//사업체 통계
			this.corpdistsummaryChart = function(adm_cd) {
				$("#poiRemoveControl_"+$localMap.ui.mapList[$localMap.ui.curMapId].id).click();
				this.curAdmCd = adm_cd;
				var bnRadio = $("input:radio[name=businessRadio]:checked").val();
				$("#areainfo_04>div[id^=businessDiv]").hide();
				$("#businessDiv" + bnRadio).show();
				var activeItem = function(currentTheme){
					$poi.setPoiMarker(currentTheme);
					$("#businessDiv"+bnRadio+" div.swiper-slide").removeClass("swiper_m_on");
					$("#businessDiv"+bnRadio+" img[src=\\/img\\/ico\\/bizStats\\/ico_sector_img_"+currentTheme+"\\.png]").parents("div.swiper-slide").addClass("swiper_m_on");
				}
				if (bnRadio == "Ratio") { //업종별 비율
					var sopPortalCorpdistsumChartDrawObj = new sop.portal.corpdistsumChartDraw.api();
					sopPortalCorpdistsumChartDrawObj.addParam("accessToken", accessToken);
					sopPortalCorpdistsumChartDrawObj.addParam("adm_cd", adm_cd);
					sopPortalCorpdistsumChartDrawObj.request({
						method: "GET",
						async: false,
						url: openApiPath + "/OpenAPI3/startupbiz/corpdistsummary.json",
						options: {
							target: this,
							adm_cd : adm_cd
						}
					});
				} else if (bnRadio == "Power") { //업종별 업력
					if (!this.powerSwiper) {
						this.powerSwiper = true;
						new Swiper("#powerSwiper", {
							scrollbar: '#businessDivPowerScrollbar',
							nextButton: '#businessDivPowerNext',
							prevButton: '#businessDivPowerPrev',
							scrollbarHide: true,
							centeredSlides: false,
							slidesPerView: 3,
							spaceBetween: 30,
							grabCursor: true
						});
					}
					if (!this.currThemeCdFirst) {
						this.currThemeCdFirst = $("#businessDivPower em>img:eq(0)").attr("src").match(/\d+/)[0];
					}
					activeItem(this.currThemeCdFirst);
					var sopPortalCorpyearsumChartDrawObj = new sop.portal.corpyearsumChartDraw.api();
					sopPortalCorpyearsumChartDrawObj.addParam("accessToken", accessToken);
					sopPortalCorpyearsumChartDrawObj.addParam("adm_cd", adm_cd);
					sopPortalCorpyearsumChartDrawObj.addParam("theme_cd", this.currThemeCdFirst);
					sopPortalCorpyearsumChartDrawObj.request({
						method: "GET",
						async: false,
						url: openApiPath + "/OpenAPI3/startupbiz/corpyearsummary.json",
						options: {
							target: this,
							adm_cd : adm_cd
						}
					});
				} else if (bnRadio == "IncDec") { //업종별 증감
					if (!this.currThemeCdSecond) {
						this.currThemeCdSecond = $("#businessDivIncDec em>img:eq(0)").attr("src").match(/\d+/)[0];
					}
					activeItem(this.currThemeCdSecond);
					if (!this.incDecSwiper) {
						this.incDecSwiper = true;
						new Swiper("#incDecSwiper", {
							scrollbar: '#businessDivIncDecScrollbar',
							nextButton: '#businessDivIncNext',
							prevButton: '#businessDivIncPrev',
							scrollbarHide: true,
							centeredSlides: false,
							slidesPerView: 3,
							spaceBetween: 30,
							grabCursor: true
						});
					}
					var sopPortalCorpindecreaseChartDrawObj = new sop.portal.corpindecreaseChartDraw.api();
					sopPortalCorpindecreaseChartDrawObj.addParam("accessToken", accessToken);
					sopPortalCorpindecreaseChartDrawObj.addParam("adm_cd", adm_cd);
					sopPortalCorpindecreaseChartDrawObj.request({
						method: "GET",
						async: false,
						url: openApiPath + "/OpenAPI3/startupbiz/corpindecrease.json",
						options: {
							target: this,
							adm_cd : adm_cd
						}
					});
				}
			}
				//주택동향
			this.houseChart = function(idx, adm_cd) {
				//주택거래가격
				if (idx == "housePrice") {
					var sopPortalHPriceChartDrawObj = new sop.portal.hPriceChartDraw.api();
					sopPortalHPriceChartDrawObj.addParam("adm_cd", adm_cd);
					sopPortalHPriceChartDrawObj.request({
						method: "POST",
						async: false,
						url: contextPath + "/ServiceAPI/bizStats/houseprice.json",
						options: {
							target: this,
							idx : idx,
							adm_cd : adm_cd
						}
					});

				} else if (idx == "houseTrade") { //주택 거래량
					var sopPortalHTradeChartDrawObj = new sop.portal.hTradeChartDraw.api();
					sopPortalHTradeChartDrawObj.addParam("adm_cd", adm_cd);
					sopPortalHTradeChartDrawObj.request({
						method: "POST",
						async: false,
						url: contextPath + "/ServiceAPI/bizStats/housevolume.json",
						options: {
							target: this,
							idx : idx,
							adm_cd : adm_cd
						}
					});
				}
			}
		}
	};

	function getChartHeight(id) {
		return $(window).outerHeight(true) > 400 ? $("#" + id).outerHeight(true) : $(window).height();
	}
	function getChartHeightYaxis(yAxisCount) {
		return yAxisCount*80;
	}
	/*********** 창업통계 지역종합현황 차트 표출 Start **********/
	(function() {
		$class("sop.portal.regionTotalChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var listData = new Array();
					for (var i = 0; i < result.length; i++) {
						var elem = result[i];
						var tempData = new Array();
						tempData.push(elem.apart_per?parseInt(elem.apart_per):0); //아파트비율
//						tempData.push(elem.lease_family_per?parseInt(elem.lease_family_per):0); //전세가구비율
//						tempData.push(elem.monrent_family_per?parseInt(elem.monrent_family_per):0); //월세가구비율
						tempData.push(elem.sixty_five_more_ppltn_per?parseInt(elem.sixty_five_more_ppltn_per):0); //65세이상인구비율
						tempData.push(elem.twenty_ppltn_per?parseInt(elem.twenty_ppltn_per):0); //20대인구비율
						tempData.push(elem.resid_ppltn_per?parseInt(elem.resid_ppltn_per):0); //거주인구비율
						tempData.push(elem.job_ppltn_per?parseInt(elem.job_ppltn_per):0); //직장인구비율
						tempData.push(elem.one_person_family_per?parseInt(elem.one_person_family_per):0); //1인가구비율

						listData.push({
							"adm_nm": elem.adm_nm,
							"list": tempData
						});
					}
					var chartHeight = getChartHeight("bizStatsChart1_1");
					$("#bizStatsChart1_1").highcharts({
						chart: {
							polar: true,
							type: 'line',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						pane: {
							size: '80%'
						},
						xAxis: {
//							categories: ['아파트', '전세가구', '월세가구', '65세이상인구', '20대인구', '거주인구', '직장인구', '1인가구'],
							categories: ['아파트', '65세이상인구', '20대인구', '거주인구', '직장인구', '1인가구'],
							tickmarkPlacement: 'on',
							lineWidth: 0
						},
						yAxis: {
							gridLineInterpolation: 'polygon',
							lineWidth: 0,
							min: 0,
							labels: {
								enabled: false
							}
						},
						tooltip: {
							enabled: false
						},
						legend: {
							itemStyle: {
								fontSize: "10px"
							}
						}
					});

					var charts = $("#bizStatsChart1_1").highcharts();

					for (var i = 0; i < listData.length; i++) {
						charts.addSeries({
							name: listData[i].adm_nm,
							data: listData[i].list,
							pointPlacement: 'on'
						});
					}

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.localTotalChart(options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart1_1").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart1_1").html("");
			}
		});
	}());
	/*********** 창업통계 지역종합현황 차트 표출 End **********/

	/*********** 창업통계 연령별 인구 차트 표출 Start **********/
	(function() {
		$class("sop.portal.pplAgeChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var listData = new Array();
					for (var i = 0; i < result.length; i++) {
						var elem = result[i];
						var tempData = new Array();
						tempData.push(parseInt(elem.teenage_less_than_per)); //10대 미만 비율
						tempData.push(parseInt(elem.teenage_per)); //10대 비율
						tempData.push(parseInt(elem.twenty_per)); //20대 비율
						tempData.push(parseInt(elem.thirty_per)); //30대 비율
						tempData.push(parseInt(elem.forty_per)); //40대 비율
						tempData.push(parseInt(elem.fifty_per)); //50대 비율
						tempData.push(parseInt(elem.sixty_per)); //60대 비율
						tempData.push(parseInt(elem.seventy_more_than_per)); //70대 이상 비율

						listData.push({
							"adm_nm": elem.adm_nm,
							"list": tempData
						});
					}
					var chartHeight = getChartHeightYaxis(8);
//					var chartHeight = getChartHeight("bizStatsChart2_1_1");
					$("#bizStatsChart2_1_1").highcharts({
						chart: {
							type: 'bar',
							backgroundColor: 'white',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						xAxis: {
							categories: ['10세 이하', '10대', '20대', '30대', '40대', '50대', '60대', '70세 이상']
						},
						yAxis: {
							min: 0,
							title: {
								text: ''
							}
						},
						tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
								'<td style="padding:0"><b>{point.y} %</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
						},
						plotOptions: {
							column: {
								borderWidth: 0
							}
						},
						legend: {
							itemStyle: {
								fontSize: "10px"
							}
						}
					});

					var charts = $("#bizStatsChart2_1_1").highcharts();

					for (var i = 0; i < listData.length; i++) {
						charts.addSeries({
							name: listData[i].adm_nm,
							data: listData[i].list
						});
						if (i == 0) {
							charts.series[i].update({
								color: '#2CCBF0'
							});
						} else if (i == 1) {
							charts.series[i].update({
								color: '#4FA1D9'
							});
						} else if (i == 2) {
							charts.series[i].update({
								color: '#3570A5'
							});
						}
					}

					options.target.tooltipTitle = "총인구";

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.populationChart(options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart2_1_1").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart2_1_1").html("");
			}
		});
	}());
	/*********** 창업통계 연령별 인구 차트 표출 End **********/

	/*********** 창업통계 성별 인구 차트 표출 Start **********/
	(function() {
		$class("sop.portal.pplGenderChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var f_ppl = 0;
					var f_per = 0;
					var m_ppl = 0;
					var m_per = 0;
					for (var i = 0; i < result.length; i++) {
						if (result[i].adm_cd == options.target.curAdmCd) {
							f_ppl = result[i].f_ppl;
							f_per = parseFloat(result[i].f_per);
							m_ppl = result[i].m_ppl;
							m_per = parseFloat(result[i].m_per);
						}
					}
					$("#bizStatsChart2_1_2").highcharts({
						chart: {
							backgroundColor: "#fff",
							borderWidth: 0,
							margin: [0, 0, 0, 0],
							height: 170,
							width: 170
						},
						colors: ['#E64C2C', '#4C9AD3'],
						tooltip: {
							enabled: false
						},
						navigation: {
							buttonOptions: {
								enabled: false
							}
						},
						title: {
							text: ''
						},
						plotOptions: {
							pie: {
								dataLabels: {
									enabled: true,
									distance: -50,
									style: {
										fontWeight: 'bold',
										color: 'white',
										textShadow: '0px 1px 2px black'
									}
								},
								startAngle: 0,
								endAngle: 360,
								center: ['50%', '50%'],
								borderWidth: 0
							}
						},
						series: [{
							type: 'pie',
							name: '비율',
							innerSize: '91%',
							data: [
								['여자 인구비율', f_per],
								['남자 인구비율', m_per]
							],
							dataLabels: {
								enabled: true,
								rotation: -45,
								color: '#333333',
								align: 'right',
								x: -4004,
								y: 20,
								style: {
									fontSize: '15px',
									fontWeight: 'normal'
								}
							}
						}],
						legend: {
							itemStyle: {
								fontSize: "10px"
							}
						}

					});
					$("#bizStatsChart2_1_2 > div").css("margin", "auto");

					$("#bizStatsChart2_1_male > span").html("남, " + m_per + "% <br/>(" + appendCommaToNumber(m_ppl) + "명)"); //남자
					$("#bizStatsChart2_1_female > span").html("여, " + f_per + "% <br/>(" + appendCommaToNumber(f_ppl) + "명)"); //여자

					options.target.tooltipTitle = "총인구";

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.populationChart(options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart2_1_2").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart2_1_2").html("");
			}
		});
	}());
	/*********** 창업통계 성별 인구 차트 표출 End **********/

	/*********** 창업통계 거처종류 차트 표출 Start **********/
	(function() {
		$class("sop.portal.housesumChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var listData = new Array();
					for (var i = 0; i < result.length; i++) {
						var elem = result[i];
						var tempData = new Array();
						tempData.push(parseInt(elem.apart_per)); //아파트-  비율
						tempData.push(parseInt(elem.row_house_per)); //연립/다세대 - 비율
						tempData.push(parseInt(elem.effi_apart_per)); //오피스텔 - 비율
						tempData.push(parseInt(elem.detach_house_per)); //단독주택 - 비율
						tempData.push(parseInt(elem.dom_soc_fac_per)); //기숙사 및 사회시설 - 비율
						tempData.push(parseInt(elem.etc_per)); //기타 - 비율

						listData.push({
							"adm_nm": elem.adm_nm,
							"list": tempData
						});
					}
					var chartHeight = getChartHeightYaxis(6);
//					var chartHeight = getChartHeight("bizStatsChart2_2");
					$("#bizStatsChart2_2").highcharts({
						chart: {
							type: 'bar',
							backgroundColor: 'white',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						xAxis: {
							categories: ['아파트', '연립/다세대', '오피스텔', '단독주택', '기숙사및사회시설', '기타']
						},
						yAxis: {
							min: 0,
							title: {
								text: ''
							}
						},
						tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
								'<td style="padding:0"><b>{point.y} %</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
						},
						plotOptions: {
							column: {
								borderWidth: 0
							}
						},
						legend: {
							itemStyle: {
								fontSize: "10px"
							}
						}
					});

					var charts = $("#bizStatsChart2_2").highcharts();

					for (var i = 0; i < listData.length; i++) {
						charts.addSeries({
							name: listData[i].adm_nm,
							data: listData[i].list
						});
						if (i == 0) {
							charts.series[i].update({
								color: '#2CCBF0'
							});
						} else if (i == 1) {
							charts.series[i].update({
								color: '#4FA1D9'
							});
						} else if (i == 2) {
							charts.series[i].update({
								color: '#3570A5'
							});
						}
					}

					options.target.tooltipTitle = "주택수";

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.housesummaryChart(options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart2_2").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart2_2").html("");
			}
		});
	}());
	/*********** 창업통계 거처종류 차트 표출 End **********/

	/*********** 창업통계 사업체비율 차트 표출 Start **********/
	(function() {
		$class("sop.portal.corpdistsumChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var listData = new Array();
					var categoryData = new Array();
					for (var i = 0; i < result.length; i++) {
						var tempData = new Array();
						for (var x = 0; x < result[i].theme_list.length; x++) {
							var elem = result[i].theme_list[x];
							tempData.push(parseFloat(elem.dist_per)); //분포-비율
							if (i == 0) {
								categoryData.push(elem.theme_nm); //테마명(업종명)
							}
						}

						listData.push({
							"adm_nm": result[i].adm_nm,
							"list": tempData
						});
					}
					var chartHeight = getChartHeightYaxis(categoryData.length);
                    //var chartHeight = getChartHeight("bizStatsChart2_4_1");
					$("#bizStatsChart2_4_1").highcharts({
						chart: {
							type: 'bar',
							backgroundColor: 'white',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						xAxis: {
							categories: categoryData
						},
						yAxis: {
							min: 0,
							title: {
								text: ''
							}
						},
						tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
								'<td style="padding:0"><b>{point.y} %</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
						},
						plotOptions: {
							column: {
								borderWidth: 0
							}
						},
						legend: {
							itemStyle: {
								fontSize: "10px"
							}
						}
					});

					var charts = $("#bizStatsChart2_4_1").highcharts();

					for (var i = 0; i < listData.length; i++) {
						charts.addSeries({
							name: listData[i].adm_nm,
							data: listData[i].list
						});
						if (i == 0) {
							charts.series[i].update({
								color: '#2CCBF0'
							});
						} else if (i == 1) {
							charts.series[i].update({
								color: '#4FA1D9'
							});
						} else if (i == 2) {
							charts.series[i].update({
								color: '#3570A5'
							});
						}
					}

					options.target.tooltipTitle = "사업체수";

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.corpdistsummaryChart(options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart2_4_1").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart2_4_1").html("");
			}
		});
	}());
	/*********** 창업통계 사업체비율 차트 표출 End **********/

	/*********** 창업통계 사업체업력 차트 표출 Start **********/
	(function() {
		$class("sop.portal.corpyearsumChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var categoryData = new Array();
					var listData = new Array();
					for (var i = 0; i < result.length; i++) {
						categoryData.push(result[i].adm_nm); //지역명
						listData.push(parseInt(result[i].corp_year)); //업력
					}
					var chartHeight = getChartHeight("bizStatsChart2_4_2");
					$("#bizStatsChart2_4_2").highcharts({
						chart: {
							type: 'column',
							backgroundColor: 'white',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						xAxis: {
							categories: categoryData,
						},
						yAxis: {
							min: 0,
							title: {
								text: '업력(년)'
							}
						},
						legend: {
							enabled: false,
							itemStyle: {
								fontSize: "10px"
							}
						},
						tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
								'<td style="padding:0"><b>{point.y}</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
						},
						plotOptions: {
							column: {
								borderWidth: 0
							}
						},
						series: [{
							name: '업력',
							data: listData
						}]
					});

					options.target.tooltipTitle = "사업체수";

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.corpdistsummaryChart(options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart2_4_2").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart2_4_2").html("");
			}
		});
	}());
	/*********** 창업통계 사업체업력 차트 표출 End **********/

	/*********** 창업통계 사업체증감 차트 표출 Start **********/
	(function() {
		$class("sop.portal.corpindecreaseChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
	        		var map = options.map;
	        		var categoryData = new Array();
	        		var themeName = $("#businessDivIncDec div.swiper_m_on").text();
	        		var cntData = new Array();
	        		
	        		for(var i = 0; i < result.length; i ++) {
	        			categoryData.push(result[i].year);	//년도
	        			var tmpTheme = new Array();
	        			for(var x = 0; x < result[i].theme_list.length; x ++) {
	        				var elem = result[i].theme_list[x];
	        				if(elem.theme_cd == options.target.currThemeCdSecond) {
	        					tmpTheme.push(elem.corp_cnt);	//분포-비율	
	        				}
	        			}
	        			if(tmpTheme.length == 0) {
	        				tmpTheme.push(0);
	        			}
	        			cntData.push(tmpTheme);
	        		}
					var chartHeight = getChartHeight("bizStatsChart2_4_3");
					$("#bizStatsChart2_4_3").highcharts({
						chart: {
							backgroundColor: 'white',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						xAxis: {
							categories: categoryData,
						},
						yAxis: {
							min: 0,
							title: {
								text: '증감률(%)'
							}
						},
						legend: {
							enabled: false,
							itemStyle: {
								fontSize: "10px"
							}
						},
						tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
								'<td style="padding:0"><b>{point.y} %</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
						},
						plotOptions: {
							column: {
								borderWidth: 0
							}
						}
					});

					var charts = $("#bizStatsChart2_4_3").highcharts();
        			var tmpData = new Array();
        			for(var i = 0; i < categoryData.length; i ++) {
        				tmpData.push(parseInt(cntData[i]));
        			}
        			charts.addSeries({
        				name : themeName,
        				data : tmpData
        			});
	        		
	        		//표 그리기
	        		var tableTmpList = [];
        			for(var  i = 0; i < categoryData.length; i ++) {
        				var tmpObj = [];
        				tmpObj.push(categoryData[i]);
        				tmpObj.push(cntData[i][0]);
        				tableTmpList.push(tmpObj);
        			}

					options.target.tooltipTitle = "사업체수";

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.corpdistsummaryChart(options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart2_4_3").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart2_4_3").html("");
			}
		});
	}());
	/*********** 창업통계 사업체증감 차트 표출 End **********/

	/*********** 창업통계 주택동향정보 주택거래가격 차트 표출 Start **********/
	(function() {
		$class("sop.portal.hPriceChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var maxData = new Array();
					var minData = new Array();
					var categoryData = new Array();
					for (var i = 0; i < result.length; i++) {
						var elem = result[i];
						var pcRadio = $("input:radio[name=priceRadio]:checked").val();
						if (pcRadio == "apt") { //아파트
							maxData.push(parseInt(elem.apart_highest_price));
							minData.push(parseInt(elem.apart_lowest_price));
						} else if (pcRadio == "villa") { //다세대/연립
							maxData.push(parseInt(elem.row_multi_house_highest_price));
							minData.push(parseInt(elem.row_multi_house_lowest_price));
						} else if (pcRadio == "house") { //단독주택
							maxData.push(parseInt(elem.single_highest_price));
							minData.push(parseInt(elem.single_lowest_price));
						}

						if (elem.year_month != undefined && elem.year_month.length >= 6) {
							var tmpDate = elem.year_month;
							var year = tmpDate.substring(0, 4);
							var month = tmpDate.substring(4, 6);
							var date = year + "." + month;
							categoryData.push(date);
						}

					}
					var chartHeight = getChartHeight("bizStatsChart3_1");
					$("#bizStatsChart3_1").highcharts({
						chart: {
							backgroundColor: 'white',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						xAxis: {
							categories: categoryData,
							labels: {
								rotation: -45,
							}
						},
						yAxis: {
							min: 0,
							title: {
								text: ''
							}
						},
						tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
								'<td style="padding:0"><b>{point.y} 만원</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
						},
						plotOptions: {
							column: {
								borderWidth: 0
							}
						},
						series: [{
							name: '최고가',
							data: maxData
						}, {
							name: '최저가',
							data: minData
						}],
						legend: {
							itemStyle: {
								fontSize: "10px"
							}
						}
					});

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.houseChart(options.idx, options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart3_1").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart3_1").html("");
			}
		});
	}());
	/*********** 창업통계 주택동향정보 주택거래가격 차트 표출 End **********/

	/*********** 창업통계 주택동향정보 주택거래량 차트 표출 Start **********/
	(function() {
		$class("sop.portal.hTradeChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var result = res.result;
					var maxData = new Array();
					var minData = new Array();
					var categoryData = new Array();
					for (var i = 0; i < result.length; i++) {
						var elem = result[i];
						var tdRadio = $("input:radio[name=tradeRadio]:checked").val();
						if (tdRadio == "apt") { //아파트
							maxData.push(parseInt(elem.apart_deal_volume));
							minData.push(parseInt(elem.apart_lease_volume));
						} else if (tdRadio == "villa") { //다세대/연립
							maxData.push(parseInt(elem.row_multi_dealvolume));
							minData.push(parseInt(elem.row_multi_leasevolume));
						} else if (tdRadio == "house") { //단독주택
							maxData.push(parseInt(elem.single_deal_volume));
							minData.push(parseInt(elem.single_lease_volume));
						}

						if (elem.year_month != undefined && elem.year_month.length >= 6) {
							var tmpDate = elem.year_month;
							var year = tmpDate.substring(0, 4);
							var month = tmpDate.substring(4, 6);
							var date = year + "." + month;
							categoryData.push(date);
						}

						//categoryData.push(elem.year_month.substring(0, 4) + "." + elem.year_month.substring(5, 2));
					}
					var chartHeight = getChartHeight("bizStatsChart3_2");
					$("#bizStatsChart3_2").highcharts({
						chart: {
							backgroundColor: 'white',
							width: $(window).width(),
							height: chartHeight
						},
						title: {
							text: ''
						},
						xAxis: {
							categories: categoryData,
							labels: {
								rotation: -45,
							}
						},
						yAxis: {
							min: 0,
							title: {
								text: ''
							}
						},
						tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
								'<td style="padding:0"><b>{point.y} 건</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
						},
						plotOptions: {
							column: {
								borderWidth: 0
							}
						},
						series: [{
							name: '매매',
							data: maxData
						}, {
							name: '전세',
							data: minData
						}],
						legend: {
							itemStyle: {
								fontSize: "10px"
							}
						}
					});

				}else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$localMapChart.chart.houseChart(options.idx, options.adm_cd);
					});
				}else {
					messageAlert.open("알림", res.errMsg);
					$("#bizStatsChart3_2").html("");
				}
			},
			onFail: function(status, options) {
				$("#bizStatsChart3_2").html("");
			}
		});
	}());
	/*********** 창업통계 주택동향정보 주택거래량 차트 표출 End **********/


}(window, document));