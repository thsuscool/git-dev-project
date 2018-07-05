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
	//"use strict";
	
	W.$bizStatsChart = W.$bizStatsChart || {};
	
	sBizStatsChart = {
			bizStatsChart : function(map){
				var that = this;
				this.delegate = null;
				this.map = map;
				this.id = null;
				this.bizStatsChartObj = null;									// 창업통계차트 Object
				this.userChartObj = null;										// 사용자 영역설정 Object
				this.userChartErrMsg = null,								//사용자 영역 오류문구
				this.currLargeTab = 0;								//창업통계 현재 보고있는 차트 탭 (0, 1, 2)
				this.currSecondTab = "pplsummary";			//현재 보고있는 지역특성정보 차트 탭
				this.currThirdTab = "housePrice";								//현재 보고있는 주택동향정보 차트 탭
				this.currThemeCdFirst = "1001";						//현재 선택한 테마코드	 (업종별 업력)
				this.currThemeCdSecond = "1001";						//현재 선택한 테마코드	 (업종별 증감)
				this.currUserTab = "corp";								//현재 보고있는 사용자 영역설정 탭
				this.curAdmCd = null;
				this.curAdmNm = null;
				this.curArea = null;
				this.tooltipTitle = "총인구";										//지도 툴팁 타이틀
				
				this.initialize = function(delegate) {					
					this.delegate = delegate;
					
					var currentdate = new Date();
					this.id = makeStamp(currentdate);
				};
				
				//창업통계차트 추가
				this.createChart = function() {
					var infoBizStatsChart = sop.control({position: 'topright'});
					infoBizStatsChart.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'bizStatsChart_' +that.id);
					    that.bizStatsChartObj = this._div;
					    return this._div;
					};
					infoBizStatsChart.update = function (props) {
						this._div.innerHTML = 	"<div>" +
														"<a class='btn_graph_bar_biz'><img class='rollover' src='/img/im/btn_graphplot_off.png' alt='' /></a>" +
														"<div class='pop_layer_con03' style='width: 450px; z-index: 15; display: block;'>" +
															"<div class='pop_contents_tab'>" +
																"<ul>" +
																	"<li>" +
																		"<a id='bizStatsChart1'>지역종합현황</a>" +
														
																		"<div class='tab_con' style='display: none;'>" +
														
																			"<div class='graph_conbox' id='bizStatsChart1_1' style='height: 270px;'>" +
																				"지역종합현황" +
																			"</div>" +
																		"</div>" +
																		
																		"<p class='origin_txt_1'>" +
																			"출처 : 통계청, 인구주택총조사 (2016)" +
																		"</p>" +
																	"</li>" +
																	"<li>" +
																		"<a id='bizStatsChart2'>지역특성정보 </a>" +
														
																		"<div class='tab_con' style='display: none;'>" +
														
																			"<ul class='tab_areainfo'>" +
																				"<li class='first' id='pplsummary'><a class='on' style='z-index: 2;'><span>총인구</span></a></li>" +
																				"<li id='housesummary'><a><span>거처종류</span></a></li>" +
																				"<li id='ocptnsummary'><a><span>점유형태</span></a></li>" +
																				"<li id='corpdistsummary' class='last'><a><span>사업체</span></a></li>" +
																			"</ul>" +
														
																			"<div class='slider_areainfo'>" +
																				"<div class='areainfo_01' style=''>" +
																					"<p class='radio_style'>" +
																						"<input type='radio' name='populationRadio_"+that.id+"' value='age' checked='checked' /> 연령별 &nbsp;" +
																						"<input type='radio' name='populationRadio_"+that.id+"' value='gender' /> 성별 &nbsp;" +
																						"<span style='display:none;'><input type='radio' name='populationRadio_"+that.id+"' value='foreigner' /> 거주외국인</span>" +
																					"</p>" +
																					
																					"<div id='pplDivAge'>" +
																						"<div class='txt_boxtit' >" +
																							"&lt; 연령별 인구비율 (%) &gt;" +
																						"</div>" +
																						
																						"<div class='graph_conbox' id='bizStatsChart2_1_1' style='height: 195px;'>" +
																							"연령별 인구비율" +
																						"</div>" +
																						
																						"<p class='origin_txt_2'>" +
																							"출처 : 통계청, 인구주택총조사 (2016)" +
																						"</p>" +
																					"</div>" +
																					
																					"<div id='pplDivGender' style='display: none;'>" +
																						"<div class='txt_boxtit' >" +
																							"&lt; 성별 인구비율 &gt;" +
																						"</div>" +
																						
																						"<div class='graph_conbox' id='bizStatsChart2_1_2' style='height: 195px;'>" +
																							"성별 인구비율" +
																						"</div>" +
																						"<div id='bizStatsChart2_1_male'><img src='/img/im/male.png' /><br/><span></span></div>" +
																						"<div id='bizStatsChart2_1_female'><img src='/img/im/female.png' /><br/><span></span></div>" +
																						
																						"<p class='origin_txt_2'>" +
																							"출처 : 통계청, 인구주택총조사 (2016)" +
																						"</p>" +
																					"</div>" +
																					
																					"<div id='pplDivForeigner' style='display: none;'>" +
																						"<div class='txt_boxtit' >" +
																							"&lt; 국적별 외국인 거주비율 &gt;" +
																						"</div>" +
																						
																						"<div class='graph_conbox' id='bizStatsChart2_1_3' style='height: 195px;'>" +
																							"국적별 외국인 거주비율" +
																						"</div>" +
																						"<div id='bizStatsChart2_1_dong'></div>" +
																						
																						"<p class='origin_txt_2'>" +
																							"출처 : 통계청, 인구주택총조사 (2016)" +
																						"</p>" +
																					"</div>" +
																					"<div class='bizStatsChartSpec' id='bizStatsChart2_1_spec'></div>" +
																				"</div>" +
																				"<div class='areainfo_02' style='top: -5000px; left: -5000px;'>" +
																					"<div class='txt_boxtit'>" +
																						"&lt; 거처 유형별 주택비율 (%) &gt;" +
																					"</div>" +
														
																					"<div class='graph_conbox' id='bizStatsChart2_2' style='height: 210px;'>" +
																						"거처 유형별 주택비율" +
																					"</div>" +
																					"<div class='bizStatsChartSpec_2' id='bizStatsChart2_2_spec'></div>" +
																					
																					"<p class='origin_txt_2'>" +
																						"출처 : 통계청, 인구주택총조사 (2016)" +
																					"</p>" +
																				"</div>" +
																				"<div class='areainfo_03' style='top: -5000px; left: -5000px;'>" +
																					"<div class='txt_boxtit'>" +
																						"&lt; 점유형태별 가구비율 (%) &gt;" +
																					"</div>" +
														
																					"<div class='graph_conbox' id='bizStatsChart2_3' style='height: 210px;'>" +
																						"점유형태별 가구비율" +
																					"</div>" +
																					"<div class='bizStatsChartSpec_2' id='bizStatsChart2_3_spec'></div>" +
																					
																					"<p class='origin_txt_2'>" +
																						"출처 : 통계청, 인구주택총조사 (2016)" +
																					"</p>" +
																				"</div>" +
																				"<div class='areainfo_04' style='top: -5000px; left: -5000px;'>" +
																					"<p class='radio_style'>" +
																						"<input type='radio' name='businessRadio_"+that.id+"' value='ratio' checked='checked' /> 업종별 비율 &nbsp;" +
																						"<span style='display:none;'><input type='radio' name='businessRadio_"+that.id+"' value='power' /> 업종별 업력 &nbsp; </span>" +
																						"<input type='radio' name='businessRadio_"+that.id+"' value='incDec' /> 업종별 증감" +
																					"</p>" +
																					
																					"<div id='businessDivAge'>" +
																						"<div class='txt_boxtit'>" +
																							"&lt; 소상공인 업종별 사업체 비율 (%) &gt;" +
																						"</div>" +
																						
																						"<div class='graph_conbox' id='bizStatsChart2_4_1' style='height: 195px;'>" +
																							"소상공인 업종별 사업체 비율" +
																						"</div>" +
																						
																						"<p class='origin_txt_2'>" +
																							"출처 : 통계청, 전국사업체조사 (2016)" +
																						"</p>" +
																					"</div>" +
																					
																					"<div id='businessDivPower' style='display: none;'>" +
																						"<ul class='bxslider'>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1001.gif' alt='' /></em>인테리어</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_2004.gif' alt='' /></em>식료품점</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_2006.gif' alt='' /></em>의류</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1002.gif' alt='' /></em>철물점</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1003.gif' alt='' /></em>서점</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1004.gif' alt='' /></em>문구점</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1005.gif' alt='' /></em>화장품/방향제</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1006.gif' alt='' /></em>꽃집</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_4002.gif' alt='' /></em>여관</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5001.gif' alt='' /></em>한식</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5002.gif' alt='' /></em>중식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5003.gif' alt='' /></em>일식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5005.gif' alt='' /></em>서양식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5011.gif' alt='' /></em>기타 외국식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5006.gif' alt='' /></em>제과점</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5007.gif' alt='' /></em>패스트푸드</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5008.gif' alt='' /></em>치킨</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5004.gif' alt='' /></em>분식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5009.gif' alt='' /></em>호프</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5010.gif' alt='' /></em>카페</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1013.gif' alt='' /></em>PC방/노래방</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1007.gif' alt='' /></em>이발소</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1008.gif' alt='' /></em>미용실</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1009.gif' alt='' /></em>세탁소</span>" +
																							"</p>" +
																						  "</li>" +
																						"</ul>" +
															
																						"<div class='graph_conbox' id='bizStatsChart2_4_2' style='height: 140px;'>" +
																							"소상공인 업종별 업력" +
																						"</div>" +
																						
																						"<p class='origin_txt_2'>" +
																							"출처 : 통계청, 전국사업체조사 (2016)" +
																						"</p>" +
																					"</div>" +
																					
																					"<div id='businessDivIncDec' style='display: none;'>" +
																					
																						"<ul class='bxslider'>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_chg_1001.gif' alt='' /></em>인테리어</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_2004.gif' alt='' /></em>식료품점</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_2006.gif' alt='' /></em>의류</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1002.gif' alt='' /></em>철물점</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1003.gif' alt='' /></em>서점</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1004.gif' alt='' /></em>문구점</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1005.gif' alt='' /></em>화장품/방향제</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1006.gif' alt='' /></em>꽃집</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_4002.gif' alt='' /></em>여관</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5001.gif' alt='' /></em>한식</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5002.gif' alt='' /></em>중식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5003.gif' alt='' /></em>일식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5005.gif' alt='' /></em>서양식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5011.gif' alt='' /></em>기타 외국식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5006.gif' alt='' /></em>제과점</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5007.gif' alt='' /></em>패스트푸드</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5008.gif' alt='' /></em>치킨</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5004.gif' alt='' /></em>분식</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5009.gif' alt='' /></em>호프</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_5010.gif' alt='' /></em>카페</span>" +
																							"</p>" +
																						  "</li>" +
																						  "<li>" +
																							"<p>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1013.gif' alt='' /></em>PC방/노래방</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1007.gif' alt='' /></em>이발소</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1008.gif' alt='' /></em>미용실</span>" +
																								"<span class='theme_icon'><em><img src='/img/im/icon_slider_img_1009.gif' alt='' /></em>세탁소</span>" +
																							"</p>" +
																						  "</li>" +
																						"</ul>" +
																						
																						"<div class='graph_conbox' id='bizStatsChart2_4_3' style='height: 140px;'>" +
																							"소상공인 업종별 증감률" +
																						"</div>" +
																						
																						"<p class='origin_txt_2'>" +
																							"출처 : 통계청, 전국사업체조사 (2016)" +
																						"</p>" +
																					"</div>" +
																					"<div class='bizStatsChartSpec' id='bizStatsChart2_4_spec'></div>" +
																				"</div>" +
																			"</div>" +
																		"</div>" +
																	"</li>" +
																	"<li class='last'>" +
																		"<a id='bizStatsChart3'>주택동향정보</a>" +
														
																		"<div class='tab_con' style='display: none;'>" +
														
																			"<ul class='tab_areainfo2'>" +
																				"<li class='first' id='housePrice'><a class='on' style='z-index: 2;'><span>주택 거래가격</span></a></li>" +
																				"<li class='last' id='houseTrade'><a><span>주택 거래량</span></a></li>" +
																			"</ul>" +
														
																			"<div class='slider_areainfo2'>" +
																				"<div class='areainfo_01'>" +
																					"<p class='radio_style'>" +
																						"<input type='radio' name='priceRadio_"+that.id+"' value='apt' checked='checked' /> 아파트 &nbsp;" +
																						"<input type='radio' name='priceRadio_"+that.id+"' value='villa' /> 다세대/연립 &nbsp;" +
																						"<input type='radio' name='priceRadio_"+that.id+"' value='house' /> 단독" +
																					"</p>" +
														
																					"<div class='txt_boxtit'>" +
																						"㎡당 주택 거래가격 (만원)" +
																					"</div>" +
														
																					"<div class='graph_conbox' id='bizStatsChart3_1' style='height: 140px;'>" +
																						"㎡당 주택 거래가격" +
																					"</div>" +
																					
																					"<p class='origin_txt_3'>" +
																						"출처 : 국토교통부, 주택실거래가 (2013)" +
																					"</p>" +
																				"</div>" +
																				"<div class='areainfo_02' style='display: none;'>" +
																					"<p class='radio_style'>" +
																						"<input type='radio' name='tradeRadio_"+that.id+"' value='apt' checked='checked' /> 아파트 &nbsp;" +
																						"<input type='radio' name='tradeRadio_"+that.id+"' value='villa' /> 다세대/연립 &nbsp;" +
																						"<input type='radio' name='tradeRadio_"+that.id+"' value='house' /> 단독" +
																					"</p>" +
														
																					"<div class='txt_boxtit'>" +
																						"주택 거래 동향 (건)" +
																					"</div>" +
														
																					"<div class='graph_conbox' id='bizStatsChart3_2' style='height: 140px;'>" +
																						"주택 거래 동향" +
																					"</div>" +
																					
																					"<p class='origin_txt_3'>" +
																						"출처 : 국토교통부, 주택실거래가 (2013)" +
																					"</p>" +
																				"</div>" +
																			"</div>" +
														
																		"</div>" +
																	"</li>" +
																"</ul>" +
															"</div>" +
														
															"<a class='pop_layer_close'><img class='rollover' src='/img/im/icon_arrow_graph_off.png' alt='close' /></a>" +
														"</div>" +
													"</div>";
					};
					infoBizStatsChart.addTo(this.map.gMap);
					
					// image rollover
					$(that.bizStatsChartObj).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//graph layer
					$(that.bizStatsChartObj).find(".btn_graph_bar_biz").click(function(){
						$(that.bizStatsChartObj).find(".btn_graph_bar_biz").hide();
						$(that.bizStatsChartObj).find(".pop_layer_con03").show();
					});
					
					//숨기기
					$(that.bizStatsChartObj).find(".pop_layer_close").click(function(){
						$(that.bizStatsChartObj).find(".btn_graph_bar_biz").show();
						$(that.bizStatsChartObj).find(".pop_layer_con03").hide();
					});
					
					//3개 탭
					$(that.bizStatsChartObj).find(".pop_layer_con03 .pop_contents_tab > ul > li > a").click(function(){
						if($(this).parent().attr("class") == "on" || $(this).parent().attr("class") == "last on") {
							$(this).parent().removeClass("on");
						} else {
							$(that.bizStatsChartObj).find(".pop_layer_con03 .pop_contents_tab > ul > li").removeClass("on");
							$(this).parent().addClass("on");
						}
						
						if($(this).attr("id") == "bizStatsChart1") {		//지역종합현황
							that.currLargeTab = 0;
						} else if($(this).attr("id") == "bizStatsChart2") {		//지역특성정보
							that.currLargeTab = 1;
						} else if($(this).attr("id") == "bizStatsChart3") {		//주택동향정보
							that.currLargeTab = 2;
						}
						
						//3개 탭 선택 이벤트
						that.bizStatsLargeTabSelect(that.currLargeTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});

					//두번째 탭
					$(that.bizStatsChartObj).find(".tab_areainfo > li > a").click(function(){
						$(that.bizStatsChartObj).find(".tab_areainfo > li > a").css("zIndex", "1");
						$(that.bizStatsChartObj).find(".tab_areainfo > li > a").removeClass("on");
						$(this).addClass("on");
						$(this).css("zIndex", "2");

						$(that.bizStatsChartObj).find(".slider_areainfo > div").css({
							"top": "-5000px",
							"left": "-5000px"
						});

						$(that.bizStatsChartObj).find(".slider_areainfo > div").eq($(that.bizStatsChartObj).find(".tab_areainfo > li > a").index(this)).css({
							"top":"",
							"left":""
						});
						
						//선택된 두번째 탭의 아이디
						that.currSecondTab = $(this).parent().attr("id");
						
						that.bizStatsChartSecondTabSelect(that.currSecondTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
						that.delegate.requestStatsOpenApi({adm_cd : that.curAdmCd, adm_nm : that.curAdmNm}, that.map);
					});

					//세번째 탭
					$(that.bizStatsChartObj).find(".tab_areainfo2 > li > a").click(function(){
						$(that.bizStatsChartObj).find(".tab_areainfo2 > li > a").css("zIndex", "1");
						$(that.bizStatsChartObj).find(".tab_areainfo2 > li > a").removeClass("on");
						$(this).addClass("on");
						$(this).css("zIndex", "2");

						$(that.bizStatsChartObj).find(".slider_areainfo2 > div").hide();

						$(that.bizStatsChartObj).find(".slider_areainfo2 > div").eq($(that.bizStatsChartObj).find(".tab_areainfo2 > li > a").index(this)).show();
						
						//선택된 세번째 탭의 아이디
						that.currThirdTab = $(this).parent().attr("id");
						that.bizStatsChartThirdTabSelect(that.currThirdTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});
					
					//지역특성정보 - 인구 라디오버튼
					$(that.bizStatsChartObj).find("input:radio[name='populationRadio_"+that.id+"']").click(function() {
						if($(this).val() == "age") {	//연령별
							$(that.bizStatsChartObj).find("#pplDivAge").show();
							$(that.bizStatsChartObj).find("#pplDivGender").hide();
							$(that.bizStatsChartObj).find("#pplDivForeigner").hide();
						} else if($(this).val() == "gender") {	//성별
							$(that.bizStatsChartObj).find("#pplDivAge").hide();
							$(that.bizStatsChartObj).find("#pplDivGender").show();
							$(that.bizStatsChartObj).find("#pplDivForeigner").hide();
						} else if($(this).val() == "foreigner") {	//거주외국인
							$(that.bizStatsChartObj).find("#pplDivAge").hide();
							$(that.bizStatsChartObj).find("#pplDivGender").hide();
							$(that.bizStatsChartObj).find("#pplDivForeigner").show();
						}
						that.bizStatsChartSecondTabSelect(that.currSecondTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});
					
					//지역특성정보 - 사업체 라디오버튼
					$(that.bizStatsChartObj).find("input:radio[name='businessRadio_"+that.id+"']").click(function() {
						if($(this).val() == "ratio") {	//업종별 비율
							$(that.bizStatsChartObj).find("#businessDivAge").show();
							$(that.bizStatsChartObj).find("#businessDivPower").hide();
							$(that.bizStatsChartObj).find("#businessDivIncDec").hide();
						} else if($(this).val() == "power") {	//업종별 업력
							$(that.bizStatsChartObj).find("#businessDivAge").hide();
							$(that.bizStatsChartObj).find("#businessDivPower").show();
							$(that.bizStatsChartObj).find("#businessDivIncDec").hide();
						} else if($(this).val() == "incDec") {	//업종별 증감
							$(that.bizStatsChartObj).find("#businessDivAge").hide();
							$(that.bizStatsChartObj).find("#businessDivPower").hide();
							$(that.bizStatsChartObj).find("#businessDivIncDec").show();
						}
						that.bizStatsChartSecondTabSelect(that.currSecondTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});
					
					//주택동향정보 - 주택거래가격 라디오버튼
					$(that.bizStatsChartObj).find("input:radio[name='priceRadio_"+that.id+"']").click(function() {
						that.bizStatsChartThirdTabSelect(that.currThirdTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});
					
					//주택동향정보 - 주택거래량 라디오버튼
					$(that.bizStatsChartObj).find("input:radio[name='tradeRadio_"+that.id+"']").click(function() {
						that.bizStatsChartThirdTabSelect(that.currThirdTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});
					
					//테마코드 클릭 이벤트 (업종별 업력)
					$(that.bizStatsChartObj).find("#businessDivPower").find(".theme_icon").click(function() {
						var imgLen = $(this).find("img").attr("src").length;
						that.currThemeCdFirst = $(this).find("img").attr("src").substring(imgLen-8, imgLen-4);
						that.bizStatsChartSecondTabSelect(that.currSecondTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});
					
					//테마코드 클릭 이벤트 (업종별 증감)
					$(that.bizStatsChartObj).find("#businessDivIncDec").find(".theme_icon").click(function() {
						var imgLen = $(this).find("img").attr("src").length;
						that.currThemeCdSecond = $(this).find("img").attr("src").substring(imgLen-8, imgLen-4);
						var imgName = $(this).find("img").attr("src");
						$(that.bizStatsChartObj).find("#businessDivIncDec").find("img").each(function(i, b){
							$(b).attr("src", $(b).attr("src").replace("_chg_", "_img_"));
						});
						$(this).find("img").attr("src", imgName.replace("_img_", "_chg_"));
						that.bizStatsChartSecondTabSelect(that.currSecondTab, {adm_cd : that.curAdmCd, adm_nm : that.curAdmNm});
					});
					
					//테마 슬라이더 (IE10 이하일 경우 fade
					if(browserFnc() != -1 && browserFnc() < 11) {
						$(that.bizStatsChartObj).find('.bxslider').bxSlider({
							infiniteLoop: false,
							hideControlOnEnd: true,
							mode : 'fade'
						});
					} else {
						//테마 슬라이더
						$(that.bizStatsChartObj).find('.bxslider').bxSlider({
							infiniteLoop: false,
							hideControlOnEnd: true
						});
					}
					
					$(that.bizStatsChartObj).hide();
				};
				
				//사용자 영역설정 보고 추가
				this.createUserChart = function() {
					var infoUserChart = sop.control({position: 'bottomright'});
					infoUserChart.onAdd = function (map) {
					    this._div = sop.DomUtil.create('div', 'info');
					    sop.DomEvent.disableClickPropagation(this._div);
					    this.update();
					    $(this._div).attr("id", 'userChart_' +that.id);
					    that.userChartObj = this._div;
					    return this._div;
					};
					infoUserChart.update = function (props) {
						this._div.innerHTML =	"<div>" +
														"<a class='btn_graph_bar_user'><img class='rollover' src='/img/im/btn_remarks_off.png' alt='' /></a>" +	
														"<div class='pop_layer_con04' style='width: 450px; z-index: 15; display: block; left: 40%; top: 50%;'>" +
															"<div class='pop_contents_tab'>" +
																"<ul>" +
																	"<li class='on'>" +
																		"<a>사용자 영역설정 보고 <span></span></a>" +
																		"<div class='tab_con' style='display: none;'>" +
																			"<ul class='tab_areainfo3'>" +
																				"<li class='first' id='corp'><a class='on' style='z-index: 2;'><span>사업체</span></a></li>" +
																				"<li id='population'><a><span>거주인구</span></a></li>" +
																				"<li id='corpworker'><a><span>직장인구</span></a></li>" +
																				"<li id='household'><a><span>세대구성</span></a></li>" +
																				"<li class='last' id='housetype'><a><span>주택유형</span></a></li>" +
																			"</ul>" +
																			"<div class='slider_areainfo3'>" +
																				"<div class='areainfo_01' style=''>" +
																					"<div class='graph_conbox' id='userChart1'>" +
																					"</div>" +
																					"<p class='origin_txt_user'>" +
																						"출처 : 통계청, 전국사업체조사 (2016)" +
																					"</p>" +
																				"</div>" +
																				"<div class='areainfo_02' style='display: none;'>" +
																					"<div class='graph_conbox' id='userChart2'>" +
																					"</div>" +
																					"<p class='origin_txt_user'>" +
																						"출처 : 통계청, 인구주택총조사 (2016)" +
																					"</p>" +
																				"</div>" +
																				"<div class='areainfo_03' style='display: none;'>" +
																					"<div class='graph_conbox' id='userChart3'>" +
																						"<div class='txt_boxtit'>" +
																							"영역 내 사업체 종사자 수" +
																						"</div>" +
																						"<div id='userChart3_cnt'>" +
																						"</div>" +
																					"</div>" +
																					"<p class='origin_txt_user'>" +
																						"출처 : 통계청, 인구주택총조사 (2016)" +
																					"</p>" +
																				"</div>" +
																				"<div class='areainfo_04' style='display: none;'>" +
																					"<div class='graph_conbox' id='userChart4'>" +
																					"</div>" +
																					"<p class='origin_txt_user'>" +
																						"출처 : 통계청, 인구주택총조사 (2016)" +
																					"</p>" +
																				"</div>" +
																				"<div class='areainfo_05' style='display: none;'>" +
																					"<div class='graph_conbox' id='userChart5'>" +
																					"</div>" +
																					"<p class='origin_txt_user'>" +
																						"출처 : 통계청, 인구주택총조사 (2016)" +
																					"</p>" +
																				"</div>" +
																			"</div>" +
																		"</div>" +
																	"</li>" +
																"</ul>" +
																
																"<ul style='display: none;'>" +
																	"<li class='on'>" +
																		"<a style='text-align: center;'><span></span></a>" +
																		"<div class='tab_con'>" +
																			"<div class='slider_areainfo4'>" +
																				"<div style=''>" +
																					"<div class='graph_conbox' id='commercialChart' style='height: 220px;'>" +
																					"</div>" +
																					
																					"<p class='origin_txt_user'>" +
																						"출처 : 통계청, 전국사업체조사 (2016)" +
																					"</p>" +
																				"</div>" +
																			"</div>" +
																		"</div>" +
																	"</li>" +
																"</ul>" +
															"</div>" +
															"<a class='pop_layer_close'><img class='rollover' src='/img/im/icon_arrow_graph_off.png' alt='close' /></a>" +
														"</div>" +
													"</div>";
					};
					infoUserChart.addTo(this.map.gMap);
					
					// image rollover
					$(that.userChartObj).find("img.rollover").hover( 
						function() { this.src = this.src.replace("_off", "_on"); 
						}, 
						function() { this.src = this.src.replace("_on", "_off"); 
					});
					
					//graph layer
					$(that.userChartObj).find(".btn_graph_bar_user").click(function(){
						$(that.userChartObj).find(".btn_graph_bar_user").hide();
						$(that.userChartObj).find(".pop_layer_con04").show();
					});
					
					//숨기기
					$(that.userChartObj).find(".pop_layer_close").click(function(){
						$(that.userChartObj).find(".btn_graph_bar_user").show();
						$(that.userChartObj).find(".pop_layer_con04").hide();
					});
					
					this.userChartErrMsg = "<div class='warningbox'>" +
													"<p><img src='/img/im/icon_warning.gif' alt='' /></p>" +
													"<dl>" +
														"<dt>설정된 조회 영역이 없습니다.</dt>" +
														"<dd>영역 그리기를 통해 원하는 통계조회 영역을 그려보세요.<br />상단의 통계항목 탭에 따라 직접 설정한 영역 안의 다양한<br />통계값을 확인 하실 수 있습니다.</dd>" +
													"</dl>" +
												"</div>";
					
					$(that.userChartObj).find(".tab_areainfo3 > li > a").click(function(){
						$(that.userChartObj).find(".tab_areainfo3 > li > a").css("zIndex", "1");
						$(that.userChartObj).find(".tab_areainfo3 > li > a").removeClass("on");
						$(this).addClass("on");
						$(this).css("zIndex", "2");
						
						$(that.userChartObj).find(".slider_areainfo3 > div").hide();

						$(that.userChartObj).find(".slider_areainfo3 > div").eq($(that.userChartObj).find(".tab_areainfo3 > li > a").index(this)).show();
						
						//선택된 사용자 영역 탭의 아이디
						that.currUserTab = $(this).parent().attr("id");
						that.bizStatsChartUserTabSelect(that.currUserTab);
					});
					
					$(that.userChartObj).hide();
				},
				
				//창업통계차트 업데이트
				this.updateBizStatsChart = function(properties) {
					//초기화
					this.resetCharts();
					
					this.curAdmCd = properties.adm_cd;
					this.curAdmNm = properties.adm_nm;
					$(that.bizStatsChartObj).show();
					if($(that.bizStatsChartObj).find(".pop_layer_con03 .pop_contents_tab > ul > li > .tab_con").css("display") == "none") {
						$(that.bizStatsChartObj).find(".pop_layer_con03 .pop_contents_tab > ul > li > a:eq(0)").trigger("click");
					} else {
						$(that.bizStatsChartObj).find(".pop_layer_con03 .pop_contents_tab > ul > li > a:eq(0)").trigger("click");
						$(that.bizStatsChartObj).find(".pop_layer_con03 .pop_contents_tab > ul > li > a:eq(0)").trigger("click");
					}
				},
				
				//사용자 영역설정 차트 업데이트
				this.updateUserChart = function(area) {
					this.curArea = area;
					$(that.userChartObj).show();
					$(that.userChartObj).find(".pop_layer_con04 .pop_contents_tab > ul:eq(0)").show();
					$(that.userChartObj).find(".pop_layer_con04 .pop_contents_tab > ul:eq(1)").hide();
					$(that.userChartObj).find(".tab_areainfo3 > li > a:eq(0)").trigger("click");
				},
				
				//상권정보 차트 업데이트
				this.updateCommercialChart = function(data) {
					$(that.userChartObj).show();
					$(that.userChartObj).find(".pop_layer_con04 .pop_contents_tab > ul:eq(0)").hide();
					$(that.userChartObj).find(".pop_layer_con04 .pop_contents_tab > ul:eq(1)").show();
					$(that.userChartObj).find(".pop_layer_con04 .pop_contents_tab > ul:eq(1) > li > a").html(data.tradearea_nm + " 상권정보");
					
					$(that.userChartObj).find(".btn_graph_bar_user").hide();
					$(that.userChartObj).find(".pop_layer_con04").show();
					
					var sopPortalTradeAreaChartDrawObj = new sop.portal.tradeAreaChartDraw.api();
					sopPortalTradeAreaChartDrawObj.addParam("tradearea_id", data.tradearea_id);
					sopPortalTradeAreaChartDrawObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath + "/ServiceAPI/bizStats/tradeareacorp.json",
				        options : {
				        	target : this
				        }
				    });
				},
				
				//창업통계차트 대메뉴 선택 (지역종합현황, 지역특성정보, 주택동향정보)
				this.bizStatsLargeTabSelect = function(idx, paramObj) {
					switch (idx) {
						//지역종합현황
						case 0:
							this.bizStatsChartFirstTabSelect(paramObj);
							break;
						
						//지역특성정보
						case 1:
							this.bizStatsChartSecondTabSelect(this.currSecondTab, paramObj);
							this.delegate.requestStatsOpenApi({adm_cd : that.curAdmCd, adm_nm : that.curAdmNm}, that.map);
							break;
						
						//주택동향정보
						case 2:
							this.bizStatsChartThirdTabSelect(this.currThirdTab, paramObj);
							break;
					}
				},
				
				//창업통계차트 지역종합현황
				this.bizStatsChartFirstTabSelect = function(paramObj) {
					var sopPortalRegionTotalChartDrawObj = new sop.portal.regionTotalChartDraw.api();
					sopPortalRegionTotalChartDrawObj.addParam("accessToken", accessToken);
					sopPortalRegionTotalChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
					sopPortalRegionTotalChartDrawObj.request({
				        method : "GET",
				        async : false,
				        url : openApiPath + "/OpenAPI3/startupbiz/regiontotal.json",
				        options : {
				        	btntype : "chart",
				        	api_id : "API_0610",
				        	params : {
				        		adm_cd : paramObj.adm_cd,
				        		adm_nm : paramObj.adm_nm
				        	},
				        	target : this
				        }
				    });
				}
				
				//창업통계차트 인구/가구/사업체 요약정보 탭 선택 (거주인구, 거처종류, 점유형태, 거주외국인, 사업체비율, 업종별업력)
				this.bizStatsChartSecondTabSelect = function(idx, paramObj) {
					if(idx == "pplsummary") {		//인구
						var populRadio = $("input:radio[name='populationRadio_"+that.id+"']:checked").val();
						if(populRadio == "age") {		//연령별
							var sopPortalPplAgeChartDrawObj = new sop.portal.pplAgeChartDraw.api();
							sopPortalPplAgeChartDrawObj.addParam("accessToken", accessToken);
							sopPortalPplAgeChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
							sopPortalPplAgeChartDrawObj.request({
						        method : "GET",
						        async : false,
						        url : openApiPath + "/OpenAPI3/startupbiz/pplsummary.json",
						        options : {
						        	btntype : "chart",
						        	api_id : "API_0602",
						        	params : {
						        		adm_cd : paramObj.adm_cd,
						        		adm_nm : paramObj.adm_nm
						        	},
						        	target : this
						        }
						    });
						} else if(populRadio == "gender") {		//성별
							var sopPortalPplGenderChartDrawObj = new sop.portal.pplGenderChartDraw.api();
							sopPortalPplGenderChartDrawObj.addParam("accessToken", accessToken);
							sopPortalPplGenderChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
							sopPortalPplGenderChartDrawObj.request({
						        method : "GET",
						        async : false,
						        url : openApiPath + "/OpenAPI3/startupbiz/mfratiosummary.json",
						        options : {
						        	btntype : "chart",
						        	api_id : "API_0603",
						        	params : {
						        		adm_cd : paramObj.adm_cd,
						        		adm_nm : paramObj.adm_nm
						        	},
						        	target : this
						        }
						    });
						} else if(populRadio == "foreigner") {		//거주외국인
							var sopPortalPplForeignerChartDrawObj = new sop.portal.pplForeignerChartDraw.api();
							sopPortalPplForeignerChartDrawObj.addParam("accessToken", accessToken);
							sopPortalPplForeignerChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
							sopPortalPplForeignerChartDrawObj.request({
						        method : "GET",
						        async : false,
						        url : openApiPath + "/OpenAPI3/startupbiz/foreignsummary.json",
						        options : {
						        	btntype : "chart",
						        	api_id : "API_0605",
						        	params : {
						        		adm_cd : paramObj.adm_cd,
						        		adm_nm : paramObj.adm_nm
						        	},
						        	target : this
						        }
						    });
						}
						
					} else if(idx == "housesummary") {		//거처종류
						var sopPortalHousesumChartDrawObj = new sop.portal.housesumChartDraw.api();
						sopPortalHousesumChartDrawObj.addParam("accessToken", accessToken);
						sopPortalHousesumChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
						sopPortalHousesumChartDrawObj.request({
					        method : "GET",
					        async : false,
					        url : openApiPath + "/OpenAPI3/startupbiz/housesummary.json",
					        options : {
					        	btntype : "chart",
					        	api_id : "API_0604",
					        	params : {
					        		adm_cd : paramObj.adm_cd,
					        		adm_nm : paramObj.adm_nm
					        	},
					        	target : this
					        }
					    });
						
					} else if(idx == "ocptnsummary") {		//점유형태
						var sopPortalOcptnsumChartDrawObj = new sop.portal.ocptnsumChartDraw.api();
						sopPortalOcptnsumChartDrawObj.addParam("accessToken", accessToken);
						sopPortalOcptnsumChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
						sopPortalOcptnsumChartDrawObj.request({
					        method : "GET",
					        async : false,
					        url : openApiPath + "/OpenAPI3/startupbiz/ocptnsummary.json",
					        options : {
					        	btntype : "chart",
					        	api_id : "API_0606",
					        	params : {
					        		adm_cd : paramObj.adm_cd,
					        		adm_nm : paramObj.adm_nm
					        	},
					        	target : this
					        }
					    });
	
					} else if(idx == "corpdistsummary") {		//사업체
						var bnRadio = $("input:radio[name='businessRadio_"+that.id+"']:checked").val();
						if(bnRadio == "ratio") {		//업종별 비율
							var sopPortalCorpdistsumChartDrawObj = new sop.portal.corpdistsumChartDraw.api();
							sopPortalCorpdistsumChartDrawObj.addParam("accessToken", accessToken);
							sopPortalCorpdistsumChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
							sopPortalCorpdistsumChartDrawObj.request({
						        method : "GET",
						        async : false,
						        url : openApiPath + "/OpenAPI3/startupbiz/corpdistsummary.json",
						        options : {
						        	btntype : "chart",
						        	api_id : "API_0607",
						        	params : {
						        		adm_cd : paramObj.adm_cd,
						        		adm_nm : paramObj.adm_nm
						        	},
						        	target : this
						        }
						    });
						} else if(bnRadio == "power") {		//업종별 업력
							var sopPortalCorpyearsumChartDrawObj = new sop.portal.corpyearsumChartDraw.api();
							sopPortalCorpyearsumChartDrawObj.addParam("accessToken", accessToken);
							sopPortalCorpyearsumChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
							sopPortalCorpyearsumChartDrawObj.addParam("theme_cd", this.currThemeCdFirst);
							sopPortalCorpyearsumChartDrawObj.request({
						        method : "GET",
						        async : false,
						        url : openApiPath + "/OpenAPI3/startupbiz/corpyearsummary.json",
						        options : {
						        	btntype : "chart",
						        	api_id : "API_0608",
						        	params : {
						        		adm_cd : paramObj.adm_cd,
						        		adm_nm : paramObj.adm_nm
						        	},
						        	target : this
						        }
						    });
						} else if(bnRadio == "incDec") {		//업종별 증감
							var sopPortalCorpindecreaseChartDrawObj = new sop.portal.corpindecreaseChartDraw.api();
							sopPortalCorpindecreaseChartDrawObj.addParam("accessToken", accessToken);
							sopPortalCorpindecreaseChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
							sopPortalCorpindecreaseChartDrawObj.request({
						        method : "GET",
						        async : false,
						        url : openApiPath + "/OpenAPI3/startupbiz/corpindecrease.json",
						        options : {
						        	btntype : "chart",
						        	api_id : "API_0609",
						        	params : {
						        		adm_cd : paramObj.adm_cd,
						        		adm_nm : paramObj.adm_nm
						        	},
						        	target : this
						        }
						    });
						}
					}
					
					//지역특성 업데이트
	        		that.regionalSpecUpdate();
				},
				
				//창업통계차트 주택 동향정보 탭 선택 (주택거래가격, 주택거래량)
				this.bizStatsChartThirdTabSelect = function(idx, paramObj) {
					//주택거래가격
					if(idx == "housePrice") {
						var sopPortalHPriceChartDrawObj = new sop.portal.hPriceChartDraw.api();
						sopPortalHPriceChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
						sopPortalHPriceChartDrawObj.request({
					        method : "POST",
					        async : false,
					        url : contextPath + "/ServiceAPI/bizStats/houseprice.json",
					        options : {
					        	btntype : "chart",
					        	api_id : "10008",
					        	params : {
					        		adm_cd : paramObj.adm_cd,
					        		adm_nm : paramObj.adm_nm
					        	},
					        	target : this
					        }
					    });
						
					} else if(idx == "houseTrade") {	//주택 거래량
						var sopPortalHTradeChartDrawObj = new sop.portal.hTradeChartDraw.api();
						sopPortalHTradeChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
						sopPortalHTradeChartDrawObj.request({
					        method : "POST",
					        async : false,
					        url : contextPath + "/ServiceAPI/bizStats/housevolume.json",
					        options : {
					        	btntype : "chart",
					        	api_id : "10009",
					        	params : {
					        		adm_cd : paramObj.adm_cd,
					        		adm_nm : paramObj.adm_nm
					        	},
					        	target : this
					        }
					    });
					}
				},
				
				//창업통계차트 사용자 영역설정 보고
				this.bizStatsChartUserTabSelect = function(idx) {
					if(idx == "corp") {	//영역내 사업체
						var sopPortalUserCorpChartDrawObj = new sop.portal.UserCorpChartDraw.api();
						sopPortalUserCorpChartDrawObj.addParam("area", this.curArea);
						sopPortalUserCorpChartDrawObj.request({
					        method : "POST",
					        async : false,
					        url : contextPath + "/ServiceAPI/bizStats/areacorp.json",
					        options : {
					        	target : this
					        }
					    });
					} else if(idx == "population") {		//영역내 거주인구
						var sopPortalUserPplChartDrawObj = new sop.portal.UserPplChartDraw.api();
						sopPortalUserPplChartDrawObj.addParam("area", this.curArea);
						sopPortalUserPplChartDrawObj.request({
					        method : "POST",
					        async : false,
					        url : contextPath + "/ServiceAPI/bizStats/areapopulation.json",
					        options : {
					        	target : this
					        }
					    });
						
					}  else if(idx == "corpworker") {		//영역내 직장인구
						var sopPortalUserWorkerChartDrawObj = new sop.portal.UserWorkerChartDraw.api();
						sopPortalUserWorkerChartDrawObj.addParam("area", this.curArea);
						sopPortalUserWorkerChartDrawObj.request({
					        method : "POST",
					        async : false,
					        url : contextPath + "/ServiceAPI/bizStats/areacorpworker.json",
					        options : {
					        	target : this
					        }
					    });
						
					}  else if(idx == "household") {		//영역내 세대구성
						var sopPortalUserHholdChartDrawObj = new sop.portal.UserHholdChartDraw.api();
						sopPortalUserHholdChartDrawObj.addParam("area", this.curArea);
						sopPortalUserHholdChartDrawObj.request({
					        method : "POST",
					        async : false,
					        url : contextPath + "/ServiceAPI/bizStats/areahousehold.json",
					        options : {
					        	target : this
					        }
					    });
						
					}  else if(idx == "housetype") {		//영역내 주택유형
						var sopPortalUserHtypeChartDrawObj = new sop.portal.UserHtypeChartDraw.api();
						sopPortalUserHtypeChartDrawObj.addParam("area", this.curArea);
						sopPortalUserHtypeChartDrawObj.request({
					        method : "POST",
					        async : false,
					        url : contextPath + "/ServiceAPI/bizStats/areahousetype.json",
					        options : {
					        	target : this
					        }
					    });
					}
				},
				
				//지역특성 업데이트
				this.regionalSpecUpdate = function() {
					var data_type = "";
					
					$(that).find("#bizStatsChart2_1_spec").html("");
					$(that).find("#bizStatsChart2_2_spec").html("");
					$(that).find("#bizStatsChart2_3_spec").html("");
					$(that).find("#bizStatsChart2_4_spec").html("");
					
					var sopPortalRegionalSpecObj = new sop.portal.regionalSpec.api();
					sopPortalRegionalSpecObj.addParam("adm_cd", this.curAdmCd);
					
					if(that.currSecondTab == "pplsummary") {		//인구
						data_type = "10";
					} else if(that.currSecondTab == "housesummary") {	//거처종류
						data_type = "20";
					} else if(that.currSecondTab == "ocptnsummary") {		//점유형태
						data_type = "30";
					} else if(that.currSecondTab == "corpdistsummary") {	//사업체
						data_type = "40";
						
						var bnRadio = $("input:radio[name='businessRadio_"+that.id+"']:checked").val();
						$(that.bizStatsChartObj).find("#bizStatsChart2_4_spec").removeClass();
						if(bnRadio == "ratio") {		//업종별 비율
							$(that.bizStatsChartObj).find("#bizStatsChart2_4_spec").addClass("bizStatsChartSpec");
						} else if(bnRadio == "power") {		//업종별 업력
							$(that.bizStatsChartObj).find("#bizStatsChart2_4_spec").addClass("bizStatsChartSpec");
						} else if(bnRadio == "incDec") {		//업종별 증감
							$(that.bizStatsChartObj).find("#bizStatsChart2_4_spec").addClass("bizStatsChartSpec_3");
						}
					}
					
					sopPortalRegionalSpecObj.addParam("data_type", data_type);
					sopPortalRegionalSpecObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath + "/ServiceAPI/bizStats/regionalSpec.json",
				        options : {
				        	target : this
				        }
				    });
				},
				
				//초기화
				this.resetCharts = function() {
					this.currLargeTab = 0;
					this.currUserTab = "corp";
					$(that.bizStatsChartObj).find("input:radio[name='populationRadio_"+that.id+"']:input[value='age']").attr("checked", true);
					$(that.bizStatsChartObj).find("input:radio[name='businessRadio_"+that.id+"']:input[value='ratio']").attr("checked", true);
					$(that.bizStatsChartObj).find("input:radio[name='priceRadio_"+that.id+"']:input[value='apt']").attr("checked", true);
					$(that.bizStatsChartObj).find("input:radio[name='tradeRadio_"+that.id+"']:input[value='apt']").attr("checked", true);
					$(that.bizStatsChartObj).hide();
					$(that.userChartObj).hide();
				}
			},
	};
	
	/*********** 창업통계 지역종합현황 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.regionTotalChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			tempData.push(parseInt(elem.apart_per));			//아파트비율
	        			tempData.push(parseInt(elem.lease_family_per));			//전세가구비율
	        			tempData.push(parseInt(elem.monrent_family_per));			//월세가구비율
	        			tempData.push(parseInt(elem.sixty_five_more_ppltn_per));			//65세이상인구비율
	        			tempData.push(parseInt(elem.twenty_ppltn_per));			//20대인구비율
	        			tempData.push(parseInt(elem.resid_ppltn_per));			//거주인구비율
	        			tempData.push(parseInt(elem.job_ppltn_per));			//직장인구비율
	        			tempData.push(parseInt(elem.one_person_family_per));			//1인가구비율
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart1_1").highcharts({
				        chart: {
				        	polar: true, type: 'line', width: 430, height: 280
				        },
				        title: {
				        	text : ''
				        },
				        pane: {
				            size: '80%'
				        },
				        xAxis: {
				        	categories: ['아파트', '전세가구', '월세가구', '65세이상인구', '20대인구', '거주인구', '직장인구', '1인가구'],
				        	tickmarkPlacement: 'on',
				            lineWidth: 0
				        },
				        yAxis: {
					        gridLineInterpolation: 'polygon',
				            lineWidth: 0,
				            min: 0,
				            labels : {
				            	enabled : false
				            }
				        },
				        tooltip: {
				            enabled: false
				        },
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $(options.target.bizStatsChartObj).find("#bizStatsChart1_1").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list,
	        				pointPlacement: 'on'
	        			});
	        		}
	        		
	        		//API 로그
					apiLogWrite("B0", options);
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart1_1").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart1_1").html("");
	        }
	    });
	}());
	/*********** 창업통계 지역종합현황 차트 표출 End **********/
	
	/*********** 창업통계 지역특성 문구 표출 Start **********/
	(function() {
	    $class("sop.portal.regionalSpec.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		if(options.target.currSecondTab == "pplsummary") {		//인구
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_spec").html(result.text);	
	        		} else if(options.target.currSecondTab == "housesummary") {		//거처종류
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_2_spec").html(result.text);	
	        		} else if(options.target.currSecondTab == "ocptnsummary") {		//점유형태
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_3_spec").html(result.text);
	        		} else if(options.target.currSecondTab == "corpdistsummary") {		//사업체
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_spec").html(result.text);	
	        		}
	        	} else {
					if(options.target.currSecondTab == "pplsummary") {		//인구
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_spec").html("");	
	        		} else if(options.target.currSecondTab == "housesummary") {		//거처종류
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_2_spec").html("");	
	        		} else if(options.target.currSecondTab == "ocptnsummary") {		//점유형태
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_3_spec").html("");
	        		} else if(options.target.currSecondTab == "corpdistsummary") {		//사업체
	        			$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_spec").html("");	
	        		}
	        		//messageAlert.open("알림", res.errMsg);
	        	}
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** 창업통계 지역특성 문구 표출 End **********/
	
	/*********** 창업통계 연령별 인구 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.pplAgeChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			tempData.push(parseInt(elem.teenage_less_than_per));	//10대 미만 비율
	        			tempData.push(parseInt(elem.teenage_per));				//10대 비율
	        			tempData.push(parseInt(elem.twenty_per));					//20대 비율
	        			tempData.push(parseInt(elem.thirty_per));					//30대 비율
	        			tempData.push(parseInt(elem.forty_per));					//40대 비율
	        			tempData.push(parseInt(elem.fifty_per));						//50대 비율
	        			tempData.push(parseInt(elem.sixty_per));					//60대 비율
	        			tempData.push(parseInt(elem.seventy_more_than_per));	//70대 이상 비율
	        			//총 인구수 표시
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_1").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 180
				        },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				            categories: [ '10세 이하', '10', '20', '30', '40', '50', '60', '70세 이상']
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
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $(options.target.bizStatsChartObj).find("#bizStatsChart2_1_1").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list
	        			});
	        			if(i == 0) {
	        				charts.series[i].update({ color: '#2CCBF0' });
	        			} else if(i == 1) {
	        				charts.series[i].update({ color: '#4FA1D9' });
	        			} else if(i == 2) {
	        				charts.series[i].update({ color: '#3570A5' });
	        			}
	        		}
	        		
	        		options.target.tooltipTitle = "총인구";
	        		
	        		//API 로그
					apiLogWrite("B0", options);
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_1").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_1").html("");
	        }
	    });
	}());
	/*********** 창업통계 연령별 인구 차트 표출 End **********/
	
	/*********** 창업통계 성별 인구 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.pplGenderChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var f_ppl = 0;
	        		var f_per = 0;
	        		var m_ppl = 0;
	        		var m_per = 0;
	        		for(var i = 0; i < result.length; i ++) {
	        			if(result[i].adm_cd == options.target.curAdmCd) {
	        				f_ppl = result[i].f_ppl;
	        				f_per = parseFloat(result[i].f_per);
	        				m_ppl = result[i].m_ppl;
	        				m_per = parseFloat(result[i].m_per);
	        			}
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_2").highcharts({
	    				chart: { backgroundColor:"#fff", borderWidth:0, margin: [0, 0, 0, 0], height: 170, width: 170 },
	    				colors: ['#E64C2C', '#4C9AD3'],
	    				tooltip: { enabled: false },
	    				navigation: { buttonOptions: { enabled: false } }, 
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
	    		                center: ['50%', '50%'], borderWidth: 0
	    		            }
	    		        }, 
	    		        series: [{
	    			        type: 'pie',
	    		            name: '비율',
	    		            innerSize: '91%',
	    		            data: [
	    		                ['여자 인구비율',  f_per],
	    		                ['남자 인구비율',  m_per]
	    		            ],
	    					dataLabels: {
	    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
	    					}
	    		        }],
	    		        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
	    		        
	    		    });
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_2 > div").css("margin", "auto");
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_male > span").html("남, " + m_per + "% <br/>(" + appendCommaToNumber(m_ppl) + "명)");		//남자
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_female > span").html("여, " + f_per  + "% <br/>(" + appendCommaToNumber(f_ppl) + "명)");		//여자
	        		
	        		options.target.tooltipTitle = "총인구";
	        		
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_2").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_2").html("");
	        }
	    });
	}());
	/*********** 창업통계 성별 인구 차트 표출 End **********/
	
	/*********** 창업통계 거주외국인 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.pplForeignerChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		var adm_nm = "";
	        		var ppltn = 0;
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			if(i == 0) {
	        				adm_nm = elem.adm_nm;					//동이름
	        			}
	        			var tempData = new Array();
	        			tempData.push(elem.nation_nm);				//국가명
	        			tempData.push(parseFloat(elem.per));				//비율
	        			listData.push(tempData);
	        			
	        			ppltn += parseInt(elem.ppltn);				//총인구
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_3").highcharts({
	        			chart: {
	        	            plotBackgroundColor: null,
	        	            plotBorderWidth: null,
	        	            plotShadow: false,
	        	            backgroundColor: 'white', width: 430, height: 180
	        	        },
	        	        tooltip: { enabled : false },
	        	        title: {
	        	            text: ''
	        	        },
	        	        plotOptions: {
	        	            pie: {
	        	                allowPointSelect: true,
	        	                cursor: 'pointer',
	        	                dataLabels: {
	        	                    enabled: true,
	        	                    distance: 0,
	        	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	        	                    style: {
	        	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	        	                    },
	        	                    connectorColor: 'silver'
	        	                }
	        	            }
	        	        },
	        	        series: [{
	        	        	innerSize: '50%',
	        	            type: 'pie',
	        	            name: 'Foreign',
	        	            data: listData
	        	        }],
	        	        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
	        	    });
	        		
	        		$("#bizStatsChart2_1_dong").html(adm_nm);		//동이름
	        		
	        		options.target.tooltipTitle = "총인구";
	        		
	        		//API 로그
					apiLogWrite("B0", options);
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_3").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_1_3").html("");
	        }
	    });
	}());
	/*********** 창업통계 거주외국인 차트 표출 End **********/
	
	/*********** 창업통계 거처종류 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.housesumChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			tempData.push(parseInt(elem.apart_per));			//아파트-  비율
	        			tempData.push(parseInt(elem.row_multi_house_per));	//연립/다세대 - 비율
	        			tempData.push(parseInt(elem.officetel_per));		//오피스텔 - 비율
	        			tempData.push(parseInt(elem.detach_house_per));		//단독주택 - 비율
	        			tempData.push(parseInt(elem.dom_soc_fac_per));		//기숙사 및 사회시설 - 비율
	        			tempData.push(parseInt(elem.etc_per));		//기타 - 비율
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_2").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 230
				        },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				        	categories: [ '아파트', '연립/다세대', '오피스텔', '단독주택', '기숙사및사회시설', '기타']
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
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $(options.target.bizStatsChartObj).find("#bizStatsChart2_2").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list
	        			});
	        			if(i == 0) {
	        				charts.series[i].update({ color: '#2CCBF0' });
	        			} else if(i == 1) {
	        				charts.series[i].update({ color: '#4FA1D9' });
	        			} else if(i == 2) {
	        				charts.series[i].update({ color: '#3570A5' });
	        			}
	        		}
	        		
	        		options.target.tooltipTitle = "주택수";
	        		
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_2").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_2").html("");
	        }
	    });
	}());
	/*********** 창업통계 거처종류 차트 표출 End **********/
	
	/*********** 창업통계 점유형태 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.ocptnsumChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			tempData.push(parseInt(elem.self_per));			//자가비율
	        			tempData.push(parseInt(elem.lease_per));		//전세비율
	        			tempData.push(parseInt(elem.monrent_per));		//월세비율
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_3").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 230
				        },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				        	categories: [ '자가', '전세(월세없음)', '보증금 있는 월세' ]
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
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $(options.target.bizStatsChartObj).find("#bizStatsChart2_3").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list
	        			});
	        			if(i == 0) {
	        				charts.series[i].update({ color: '#4F81BD' });
	        			} else if(i == 1) {
	        				charts.series[i].update({ color: '#C0504D' });
	        			} else if(i == 2) {
	        				charts.series[i].update({ color: '#9BBB59' });
	        			}
	        		}
	        		
	        		options.target.tooltipTitle = "가구수";
	        		
	        		//API 로그
					apiLogWrite("B0", options);
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_3").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_3").html("");
	        }
	    });
	}());
	/*********** 창업통계 점유형태 차트 표출 End **********/
	
	/*********** 창업통계 사업체비율 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.corpdistsumChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		var categoryData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var tempData = new Array();
	        			for(var x = 0; x < result[i].theme_list.length; x ++) {
	        				var elem = result[i].theme_list[x];
	        				tempData.push(parseFloat(elem.dist_per));		//분포-비율
	        				if(i == 0) {
	        					categoryData.push(elem.theme_nm);			//테마명(업종명)
	        				}
	        			}
	        			
	        			listData.push({ "adm_nm" : result[i].adm_nm, "list" : tempData });
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_1").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 180
				        },
				        title: {
				        	text : ''
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
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $(options.target.bizStatsChartObj).find("#bizStatsChart2_4_1").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list
	        			});
	        			if(i == 0) {
	        				charts.series[i].update({ color: '#2CCBF0' });
	        			} else if(i == 1) {
	        				charts.series[i].update({ color: '#4FA1D9' });
	        			} else if(i == 2) {
	        				charts.series[i].update({ color: '#3570A5' });
	        			}
	        		}
	        		
	        		options.target.tooltipTitle = "사업체수";
	        		
	        		//API 로그
					apiLogWrite("B0", options);
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_1").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_1").html("");
	        }
	    });
	}());
	/*********** 창업통계 사업체비율 차트 표출 End **********/
	
	/*********** 창업통계 사업체업력 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.corpyearsumChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var categoryData = new Array();
	        		var listData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			categoryData.push(result[i].adm_nm);	//지역명
	        			listData.push(parseInt(result[i].corp_year));		//업력
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_2").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 130
				        },
				        title: {
				        	text : ''
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
					        	fontSize : "10px"
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
	        		
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_2").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_2").html("");
	        }
	    });
	}());
	/*********** 창업통계 사업체업력 차트 표출 End **********/
	
	/*********** 창업통계 사업체증감 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.corpindecreaseChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var categoryData = new Array();
	        		var themeNmData = new Array();
	        		var cntData = new Array();
	        		
	        		for(var i = 0; i < result.length; i ++) {
	        			categoryData.push(result[i].year);	//년도
	        			var tmpTheme = new Array();
	        			for(var x = 0; x < result[i].theme_list.length; x ++) {
	        				var elem = result[i].theme_list[x];
	        				if(elem.theme_cd == options.target.currThemeCdSecond) {
		        				if(i == 0) {
		        					themeNmData.push(elem.theme_nm);	//테마명
		        				}
	        					tmpTheme.push(elem.corp_cnt);	//분포-비율	
	        				}
	        			}
	        			cntData.push(tmpTheme);
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_3").highcharts({
				        chart: {
				            backgroundColor: 'white', width: 430, height: 130
				        },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				        	categories: categoryData,
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: '사업체수(개)'
				            }
				        },
				        legend: {
				        	enabled: false,
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y} (개)</b></td></tr>',
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
	        		
	        		var charts = $(options.target.bizStatsChartObj).find("#bizStatsChart2_4_3").highcharts();
	        		
	        		for(var i = 0; i < themeNmData.length; i ++) {
	        			var tmpData = new Array();
	        			for(var x = 0; x < categoryData.length; x ++) {
	        				tmpData.push(parseInt(cntData[x][i]));
	        			}
	        			charts.addSeries({
	        				name : themeNmData[i],
	        				data : tmpData
	        			});
	        		}
	        		
	        		options.target.tooltipTitle = "사업체수";
	        		
	        		//API 로그
					apiLogWrite("B0", options);
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_3").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart2_4_3").html("");
	        }
	    });
	}());
	/*********** 창업통계 사업체증감 차트 표출 End **********/
	
	/*********** 창업통계 주택동향정보 주택거래가격 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.hPriceChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var maxData = new Array();
        			var minData = new Array();
        			var categoryData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var pcRadio = $("input:radio[name='priceRadio_"+options.target.id+"']:checked").val();
						if(pcRadio == "apt") {		//아파트
							maxData.push(parseInt(elem.apart_highest_price));
							minData.push(parseInt(elem.apart_lowest_price));
						} else if(pcRadio == "villa") {		//다세대/연립
							maxData.push(parseInt(elem.row_multi_house_highest_price));
							minData.push(parseInt(elem.row_multi_house_lowest_price));
						} else if(pcRadio == "house") {		//단독주택
							maxData.push(parseInt(elem.single_highest_price));
							minData.push(parseInt(elem.single_lowest_price));
						}
						
						if (elem.year_month != undefined && elem.year_month.length >= 6) {
							var tmpDate = elem.year_month;
							var year = tmpDate.substring(0,4);
							var month = tmpDate.substring(4,6);
							var date = year + "." + month;
							categoryData.push(date);
						}
	
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart3_1").highcharts({
				        chart: {
				        	backgroundColor: 'white', width: 430, height: 160
				        },
				        title: {
				        	text : ''
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
				        series:[{
				        	name : '최고가',
				        	data : maxData
				        }, {
				        	name : '최저가',
				        	data : minData
				        }],
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart3_1").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart3_1").html("");
	        }
	    });
	}());
	/*********** 창업통계 주택동향정보 주택거래가격 차트 표출 End **********/
	
	/*********** 창업통계 주택동향정보 주택거래량 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.hTradeChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var maxData = new Array();
        			var minData = new Array();
        			var categoryData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tdRadio = $("input:radio[name='tradeRadio_"+options.target.id+"']:checked").val();
						if(tdRadio == "apt") {		//아파트
							maxData.push(parseInt(elem.apart_deal_volume));
							minData.push(parseInt(elem.apart_lease_volume));
						} else if(tdRadio == "villa") {		//다세대/연립
							maxData.push(parseInt(elem.row_multi_dealvolume));
							minData.push(parseInt(elem.row_multi_leasevolume));
						} else if(tdRadio == "house") {		//단독주택
							maxData.push(parseInt(elem.single_deal_volume));
							minData.push(parseInt(elem.single_lease_volume));
						}
						
						if (elem.year_month != undefined && elem.year_month.length >= 6) {
							var tmpDate = elem.year_month;
							var year = tmpDate.substring(0,4);
							var month = tmpDate.substring(4,6);
							var date = year + "." + month;
							categoryData.push(date);
						}
						
						//categoryData.push(elem.year_month.substring(0, 4) + "." + elem.year_month.substring(5, 2));
	        		}
	        		
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart3_2").highcharts({
				        chart: {
				        	backgroundColor: 'white', width: 430, height: 160
				        },
				        title: {
				        	text : ''
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
				        series:[{
				        	name : '매매',
				        	data : maxData
				        }, {
				        	name : '전세',
				        	data : minData
				        }],
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		//API 로그
					apiLogWrite("B0", options);
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.bizStatsChartObj).find("#bizStatsChart3_2").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.bizStatsChartObj).find("#bizStatsChart3_2").html("");
	        }
	    });
	}());
	/*********** 창업통계 주택동향정보 주택거래량 차트 표출 End **********/
	
	/*********** 창업통계 사용자 영역설정 사업체 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.UserCorpChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var categoryData = new Array();
	        		var cntData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			categoryData.push(result[i].theme_nm);			//테마명
	        			cntData.push(parseInt(result[i].corp_cnt));		//업체 수
	        		}
	        		
	        		$(options.target.userChartObj).find("#userChart1").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 180
				        },
				        title: {
				        	text : '영역 내 사업체 24종 : (개)'
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
				                text: '사업체(개)'
				            }
				        },
				        legend: {
				        	enabled: false,
					        itemStyle: {
					        	fontSize : "10px"
					        }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="padding:0"><b>{point.y} 개</b></td></tr>',
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
				            name: '',
				            data: cntData
				        }]
				    });
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.userChartObj).find("#userChart1").html(options.target.userChartErrMsg);
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.userChartObj).find("#userChart1").html("");
	        }
	    });
	}());
	/*********** 창업통계 사용자 영역설정 사업체 차트 표출 End **********/
	
	/*********** 창업통계 사용자 영역설정 거주인구 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.UserPplChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var maleData = new Array();
	        		var femaleData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			maleData.push(parseInt(result[i].m_00_age)*-1);
	        			maleData.push(parseInt(result[i].m_10_age)*-1);
	        			maleData.push(parseInt(result[i].m_20_age)*-1);
	        			maleData.push(parseInt(result[i].m_30_age)*-1);
	        			maleData.push(parseInt(result[i].m_40_age)*-1);
	        			maleData.push(parseInt(result[i].m_50_age)*-1);
	        			maleData.push(parseInt(result[i].m_60_age)*-1);
	        			femaleData.push(parseInt(result[i].w_00_age));
	        			femaleData.push(parseInt(result[i].w_10_age));
	        			femaleData.push(parseInt(result[i].w_20_age));
	        			femaleData.push(parseInt(result[i].w_30_age));
	        			femaleData.push(parseInt(result[i].w_40_age));
	        			femaleData.push(parseInt(result[i].w_50_age));
	        			femaleData.push(parseInt(result[i].w_60_age));
	        		}
	        		
	        		var minValue = Math.min.apply(null, maleData);
	        		var maxValue = Math.max.apply(null, femaleData);
	        		
	        		$(options.target.userChartObj).find("#userChart2").highcharts({
				        chart: {
				            type: 'bar', backgroundColor: 'white', width: 430, height: 180
				        },
				        title: {
				        	text : '영역 내 거주인구 남, 여 :: (명)'
				        },
				        xAxis: [{
				            categories: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60 +'],
				            reversed: false,
				            labels: {
			                    step: 1
			                }
				        }, { // mirror axis on right side
			                opposite: true,
			                reversed: false,
			                categories: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60 +'],
			                linkedTo: 0,
			                labels: {
			                    step: 1
			                }
			            }],
				        yAxis: {
				        	title: {
			                    text: null
			                },
			                labels: {
			                    formatter: function () {
			                        return (Math.abs(this.value) / 100) + 'M';
			                    }
			                },
			                min: minValue,
			                max: maxValue
				        },
				        plotOptions: {
			                series: {
			                    stacking: 'normal'
			                }
			            },
			            tooltip: {
			                formatter: function () {
			                    return '<b>' + this.series.name + ', 연령대 ' + this.point.category + '</b><br/>' +
			                        '인구: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
			                }
			            },
				        series: [{
				            name: '남자',
				            data: maleData
				        }, {
				            name: '여자',
				            data: femaleData
				        }],
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.userChartObj).find("#userChart2").html(options.target.userChartErrMsg);
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.userChartObj).find("#userChart2").html("");
	        }
	    });
	}());
	/*********** 창업통계 사용자 영역설정 거주인구 차트 표출 End **********/
	
	/*********** 창업통계 사용자 영역설정 직장인구 표출 Start **********/
	(function() {
	    $class("sop.portal.UserWorkerChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		$(options.target.userChartObj).find("#userChart3_cnt").html(appendCommaToNumber(result[0].worker_sum) + "명");
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.userChartObj).find("#userChart3").html(options.target.userChartErrMsg);
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.userChartObj).find("#userChart3").html("");
	        }
	    });
	}());
	/*********** 창업통계 사용자 영역설정 직장인구 표출 End **********/
	
	/*********** 창업통계 사용자 영역설정 세대구성 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.UserHholdChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var cntData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			cntData.push(parseInt(result[i].household_01_type));		//1세대
	        			cntData.push(parseInt(result[i].household_02_type));		//2세대
	        			cntData.push(parseInt(result[i].household_03_type));		//3세대
	        			cntData.push(parseInt(result[i].household_04_type));		//4세대
	        			cntData.push(parseInt(result[i].household_05_type));		//1인
	        			cntData.push(parseInt(result[i].household_b0_type));		//비혈연
	        		}
	        		
	        		$(options.target.userChartObj).find("#userChart4").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 180
				        },
				        title: {
				        	text : '세대구성 유형 : (가구)'
				        },
				        xAxis: {
				            categories: ['1세대', '2세대', '3세대', '4세대', '1인', '비혈연'],
				            labels: {
				                rotation: -45,
				        	}
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: '가구(가구)'
				            }
				        },
				        legend: {
				        	enabled: false,
					        itemStyle: {
					        	fontSize : "10px"
					        }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="padding:0"><b>{point.y} 가구</b></td></tr>',
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
				            name: '',
				            data: cntData
				        }]
				    });
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.userChartObj).find("#userChart4").html(options.target.userChartErrMsg);
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.userChartObj).find("#userChart4").html("");
	        }
	    });
	}());
	/*********** 창업통계 사용자 영역설정 세대구성 차트 표출 End **********/
	
	/*********** 창업통계 사용자 영역설정 주택유형 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.UserHtypeChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var cntData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			cntData.push(parseInt(result[i].detach_house_per));		//단독주택 비율
	        			cntData.push(parseInt(result[i].row_multi_house));		//연립/다세대 비율
	        			cntData.push(parseInt(result[i].officetel_per));		//오피스텔 비율
	        			cntData.push(parseInt(result[i].dom_soc_fac_per));		//기숙사 비율
	        			cntData.push(parseInt(result[i].apart));		//아파트 비율
	        			cntData.push(parseInt(result[i].etc));		//기타
	        		}
	        		
	        		$(options.target.userChartObj).find("#userChart5").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 190
				        },
				        title: {
				        	text : '주택유형 : (호)'
				        },
				        xAxis: {
				            categories: ['단독주택', '연립/다세대', '오피스텔', '기숙사', '아파트', '기타'],
				            labels: {
				                rotation: -45,
				        	}
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: '주택(호)'
				            }
				        },
				        legend: {
				        	enabled: false,
					        itemStyle: {
					        	fontSize : "10px"
					        }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="padding:0"><b>{point.y} 호</b></td></tr>',
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
				            name: '',
				            data: cntData
				        }]
				    });
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.userChartObj).find("#userChart5").html(options.target.userChartErrMsg);
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.userChartObj).find("#userChart5").html("");
	        }
	    });
	}());
	/*********** 창업통계 사용자 영역설정 주택유형 차트 표출 End **********/
	
	/*********** 창업통계 상권정보 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.tradeAreaChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var categoryData = new Array();
	        		var cntData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			categoryData.push(result[i].theme_nm);
	        			cntData.push(parseInt(result[i].corp_cnt));
	        		}
	        		
	        		$(options.target.userChartObj).find("#commercialChart").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 430, height: 210
				        },
				        title: {
				        	text : '영역 내 사업체'
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
				                text: '사업체(개)'
				            }
				        },
				        legend: {
				        	enabled: false,
					        itemStyle: {
					        	fontSize : "10px"
					        }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				            pointFormat: '<tr><td style="padding:0"><b>{point.y} 개</b></td></tr>',
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
				            name: '',
				            data: cntData
				        }]
				    });
	        		
	        	} else {
	        		//messageAlert.open("알림", res.errMsg);
	        		$(options.target.userChartObj).find("#commercialChart").html(options.target.userChartErrMsg);
	        	}
	        },
	        onFail : function(status, options) {
	        	$(options.target.userChartObj).find("#commercialChart").html("");
	        }
	    });
	}());
	/*********** 창업통계 상권정보 차트 표출 End **********/
	
}(window, document));