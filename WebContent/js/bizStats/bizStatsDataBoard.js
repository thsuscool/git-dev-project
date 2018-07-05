/**
 * 생활업종 통계지도 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/05  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$bizStatsDataBoard = W.$bizStatsDataBoard || {};
	
	$(document).ready(function() {
		$bizStatsDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$bizStatsDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅
		
		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			}
		});
		
	});
	
	$bizStatsDataBoard.ui = {
			mapData : [],				//지도별 데이터
			map : null,				//지도 (sMap.map)
			map_id : "0",				//지도 ID (0, 1, 2)
			chartDataList : [],
			miniGeojson : null,
			
			/**
			 * 
			 * @name         : mapDataSetting
			 * @description  : 지도별 데이터 형식 세팅
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			mapDataSetting : function() {
				var tempObj = {};
				for(var i = 0; i < 3; i ++) {
					tempObj = {
							"options" : {},
							"type" : ""
					}
					this.mapData.push(tempObj);					
				}
			},
			
			/**
			 * 
			 * @name         : reDraw
			 * @description  : 데이터보드 다시 그리기 (지도 삭제, 보고있는 지도 변경일 경우)
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reDraw : function(map_id) {
				//데이터가 조회되지 않은 지도는 데이터보드를 열지 않음
				if (map_id != this.map_id) {
					if(this.mapData[map_id].options != "") {
						var sceneInx = $(".sceneBox.on").length;
						if(sceneInx > 1) {
							this.updateDataBoard(this.mapData[map_id].options, this.mapData[map_id].type);	
						}
					}
				}
			},
			
			/**
			 * @name		: initDataBoard
			 * @description	: 데이터보드 초기화
			 * @date		: 2016.11.22
			 * @author		: 김재상 
			*/
			initDataBoard : function(){
				$(".dataBoardDiv").hide();
				
				// 집어넣기.. 추가할지말지 고민
				$(".dataSideBox").stop().animate({"right":"-1500px"},200);
				$(".bizStatsDataBoard").removeClass("on").stop().animate({"right":"0"},200);
			},
			
			/**
			 * 
			 * @name         : updateDataBoard
			 * @description  : 데이터보드 업데이트
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @param	: options, type
			 * @history 	 :
			 */
			/**
			 * @param options
			 * @param type
			 */
			updateDataBoard : function(options, type) {
				
				//2016.04.14 주용민
				//버블 지도 시각화시 타 경계 클릭 막기
				$bizStatsLeftMenu.ui.curSelectedStatsType = type;
				
				//메모리에 저장
				this.map = options.params.map;
				this.map_id = options.params.map.id;
				this.mapData[this.map_id].type = type;
				
				//창업지역검색이 아닐 경우만 options를 저장
				if(type != "areaSearch") {
					//데이터보드의 조회조건은 여기에 모두 저장
					this.mapData[this.map_id].options = options;
				} else {	//창업지역검색일 경우 params를 저장
					this.mapData[this.map_id].options.params = options.params;
				}
				
				//데이터보드 조회조건이 undefined일 경우 초기화
				if(this.mapData[this.map_id].options.dataBoard == undefined) {
					this.mapData[this.map_id].options.dataBoard = {};
				}
				
				//보고서 차트정보 초기화
				this.chartDataList[options.params.map.id] = null;
				
				//데이터보드 열기
				var sceneInx = $(".sceneBox.on").length;
				if(sceneInx == 1) {
					$bizStatsDataBoard.event.dataBoardOpen();	
				}
				
				//Intro) 17개 시도별 생활업종현황
				if(type == "intro") {
					this.updateIntro(options);
					
				//업종별 지역현황
				} else if(type == "jobArea") {
					this.updateJobArea(options);
					
				//업종밀집도 변화
				} else if(type == "jobChange") {
					this.updateJobChange(options);
				
				//지자체 인허가 업종별 개업 현황
				} else if(type == "jobOpen") {
					this.updateJobOpen(options);
					
				//업종별 뜨는 지역
				} else if(type == "jobBest") {
					this.updateJobBest(options);
					
				//지역 종합정보
				} else if(type == "areaInfo") {
					this.updateAreaInfo(options);
					
				//창업지역검색
				} else if(type == "areaSearch") {
					this.updateAreaSearch(options);
					
				//상권정보
				} else if(type == "trade") {
					this.updateTrade(options);
				}
				
				
			},
			
			/**
			 * 
			 * @name         : updateIntro
			 * @description  :	인트로 데이터보드
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateIntro : function(options) {
				$(".dataBoardDiv").hide();
				$("#introSidoDiv").show();
				$("#introSidoDetailChart").hide();
				$("#introSidoChart").show();
				
				//테마코드 초기화
				options.params.theme_cd = null;
				
				//명칭
			//	$(".seoulBox").html(options.params.adm_nm+" <span>2015</span>");
				
				//사업체 2016 반영 20180220 leekh
				$(".seoulBox").html(options.params.adm_nm+" <span>2016</span>");
				$(".areaSpan").text(options.params.adm_nm);
				
				//생활편의업종 분류별 사업체 비율 차트
				$bizStatsDataBoardApi.request.introSidoPieChart(options);	//시도 Pie차트
				$bizStatsDataBoardApi.request.introCountryPieChart(options);	//전국 Pie차트
				//생활편의업종 현황
				$bizStatsDataBoardApi.request.introSidoRank(options);
				
				this.changeIntroChartType(1);
			},
			
			changeIntroChartType : function(idx){
				$("#introChartType a").removeClass("on");
				$("#introChartType a:eq("+(idx-1)+")").addClass("on");
				
				this.changeIntroChartContent(1);
			},
			
			changeIntroChartContent : function(idx){
				$("#introChartContent a").removeClass("on");
				$("#introChartContent a:eq("+(idx-1)+")").addClass("on");
				
				var activateChartNum = 0;
				var id = $("#introChartType a.on").attr("id");
				
				switch(id){
					case "icType01": activateChartNum = idx; break;
					case "icType02": activateChartNum = idx + 3; break;
					default: activateChartNum = 1; break;
				}
				
				$(".introRankChart").hide();
				$(".introRankChart0"+activateChartNum).show();
				
			},
			
			/**
			 * 
			 * @name         : introPieChartClick
			 * @description  :	인트로 데이터보드 Pie차트 선택 시
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: themeNm 테마
			 * @history 	 :
			 */
			introPieChartClick : function(themeCd) {
				$(".dataBoardDiv").hide();
				$("#introSidoDiv").show();
				$("#introSidoChart").hide();
				$("#introSidoDetailChart").show();
				
				//탭 선택 삭제
				$("#introTabDiv").find("a").removeClass("on");

				switch (themeCd) {
					case "10":	//서비스
						$("#introTabDiv").find("a:eq(3)").addClass("on");
						this.introSidoThemeTabClick(3);
						break;
					case "20":	//도소매
						$("#introTabDiv").find("a:eq(2)").addClass("on");
						this.introSidoThemeTabClick(2);
						break;
					case "40":	//숙박업
						$("#introTabDiv").find("a:eq(4)").addClass("on");
						this.introSidoThemeTabClick(4);
						break;
					case "50":	//음식점
						$("#introTabDiv").find("a:eq(1)").addClass("on");
						this.introSidoThemeTabClick(1);
						break;
					default:
						break;
				}
				
				this.mapData[this.map_id].options.params.theme_cd = themeCd;	//테마코드
				
				var options = this.mapData[this.map_id].options;
				$bizStatsDataBoardApi.request.introSidoDetailChart(options);	//시도 세부업종 차트
				$bizStatsDataBoardApi.request.introCountryDetailChart(options);	//전국 세부업종 차트
//				$bizStatsDataBoardApi.request.introSidoDetailRank(options);	//세부업종 세분류
				$bizStatsDataBoardApi.request.introSidoRank(options);	//세부업종 세분류
				
				this.changeIntroChartType(1);
			},
			
			/**
			 * @name         : introSidoThemeTabClick
			 * @description  : 시도별 생활업종현황 테마 탭 클릭시 호출
			 * @date         : 2016. 06. 22.
			 * @author	     : 김성현
			 * @param :	 idx	(1:음식점, 2:도소매, 3:서비스, 4:숙박업) 
			 */
			introSidoThemeTabClick : function(idx) {
				//탭 초기화 후 선택
				$(".bizCateMenu").find("a").removeClass("on");
				$(".bizCateMenu").find("a:eq("+(idx)+")").addClass("on");
				//업종별 탭 show/hide
				$(".introSidoThemeTab").hide();
				$("#introSidoThemeTab0"+idx).show();
			},
	
			/**
			 * 
			 * @name         : introSidoThemeDetailClick
			 * @description  :	인트로 데이터보드 시도에서 테마 선택 시
			 * @date         : 2016. 06. 22. 
			 * @author	     : 김성현
			 * @param	: themeCd, themeNm
			 */
			introSidoThemeDetailClick : function(themeCd, themeNm) {
				this.mapData[this.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
				$bizStatsLeftMenu.ui.doCompanySidoIntro();	//업종별 지역현황 정보를 보여준다.
				//업종별 지역현황 정보를 요청한다.
				setTimeout(function() {
					$bizStatsMap.ui.doReqSidoCompany(adm_cd, themeCd, themeNm);
				}, 1000);
			},
			
			/**
			 * 
			 * @name         : pageBack
			 * @description  :	세부현황에서 뒤로 가기 버튼 클릭 시
			 * @date         : 2015. 11. 06. 
			 * @author	     : 김성현
			 * @param	: type
			 * @history 	 :
			 */
			pageBack : function(type) {
				//탭 선택 삭제
				$("#introMainTabDiv").find("a").removeClass("on");
				//종합현황 탭 선택
				$("#introMainTabDiv").find("a:eq(0)").addClass("on");
				//데이터보드 재 호출
				this.introSidoThemeTabClick(0);
				this.updateDataBoard(this.mapData[this.map_id].options, type);
			},
			
			/**
			 * 
			 * @name         : updateJobArea
			 * @description  :	업종별 지역현황 데이터보드
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateJobArea : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobAreaDiv").show();
				
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.dataBoard.jobAreaThemeCd != undefined) {
					$(".totalResult.tr01 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.dataBoard.jobAreaThemeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				var themeCd = "";
				var themeNm = "";
				var jobAreaTab = "";
				var tab = 0;
				
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				$("input[name='rd_service']").each(function() {		//서비스
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab03";
						tab = '10';
					}
				});
				$("input[name='rd_retail']").each(function() {		//도소매
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab02";
						tab = '20';
					}
				});
				$("input[name='rd_hotel']").each(function() {		//숙박업
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab04";
						tab = '40';
					}
				});
				$("input[name='rd_food']").each(function() {		//음식점
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab01";
						tab = '50';
					}
				});
				
				//전체 탭 숨기고 선택한 탭만 열기
				$(".jobAreaTab").hide();
				$("#"+jobAreaTab).show();

				// 탭 초기화
				this.jobAreaTypeClick(0);
				
				//업종별 지역현황 테마코드별 조회
				this.jobAreaThemeClick("circleClick", themeCd, themeNm);
			},
			
			/**
			 * @name         : jobAreaTabClick
			 * @description  : 시도별 생활업종현황 테마 탭 클릭시 호출
			 * @date         : 2016. 06. 22.
			 * @author	     : 김성현
			 * @param 		 : themeCd 
			 */
			jobAreaTabClick : function(themeCd) {
				if(!themeCd) themeCd = "5001"; //기본값 한식
				var cateCd = themeCd.substring(0,2);
				
				// 대분류 탭 초기화 후 선택
				$(".bizCateMenu").find("a").removeClass("on");
				$(".bizCateMenu").find("a#bizCateMenu"+cateCd).addClass("on");
				// 중분류 탭 show/hide
				$(".jobAreaTab").hide();
				$("#jobAreaTab"+cateCd).show();
				// 중분류 선택 (한식, 중식, 일식 ...)
				/*$(".jobAreaTab li a").removeClass("on");
				$("#jobArea_"+themeCd).addClass("on");*/
			},
			
			/**
			 * 
			 * @name		: jobAreaTypeClick
			 * @description	: 시도별 생활업종현황 차트 타입 클릭이벤트
			 * @date		: 2016.08.24
			 * @author		: 김재상
			*/
			jobAreaTypeClick : function(idx) {
				//탭 초기화 후 선택
				$(".jobAreaType").find("a").removeClass("on");
				$(".jobAreaType").find("a:eq("+(idx)+")").addClass("on");
				//업종별 탭 show/hide
				$(".jobAreaTypeCont").hide();
				$("#jobAreaTypeCont0"+(idx+1)).show();
				
				var options = this.mapData[this.map_id].options;
				$bizStatsMap.ui.doReqSidoCompany(options.params.adm_cd, options.dataBoard.themeCd, options.dataBoard.themeNm, idx);
			},
			
			/**
			 * 
			 * @name         : jobAreaThemeClick
			 * @description  :	업종별 지역현황 테마코드별 조회
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: type (circleClick : 지도 서클 클릭 시,		 tabClick : 테마코드 탭 클릭 시) 
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			jobAreaThemeClick : function(type, themeCd, themeNm) {		
				if(!themeNm) themeNm = $("#jobArea_"+themeCd).html(); 
				
				$(".jobAreaTab li a").removeClass("on");
				$("#jobArea_"+themeCd).addClass("on");
				
				var themeNm = $("#jobArea_"+themeCd).html();
				
				var title = "시군구 생활업종 현황 > " + themeNm;
				$(".helperText").html(title);
				
				// 레프트메뉴 테마 체크박스 동기화
				$(".totalResult.tr01 input").each(function() {
					$(this).removeAttr("checked");
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				
				// 명칭
				var options = this.mapData[this.map_id].options;
				$(".jobAreaTitle").html(themeNm+"/"+options.params.adm_nm+" <span>"+companyDataYear+"</span>");
				$(".sggSpan").html(options.params.adm_nm.split(" ")[0]);
				$(".sggSpan02").html(options.params.adm_nm.split(" ")[1]);
				$(".jobAreaThemeNmSpan").html(themeNm);
				
				this.mapData[this.map_id].options.dataBoard.jobAreaThemeCd = themeCd;
				this.mapData[this.map_id].options.dataBoard.themeCd = themeCd;
				this.mapData[this.map_id].options.dataBoard.themeNm = themeNm;
				
				// 파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							theme_cd : themeCd,
							map : options.params.map
						}
				}
				
				//지도 서클 클릭 시
				if(type == "circleClick") {
					//시군구 생활업종정보 정보
					$bizStatsDataBoardApi.request.jobAreaTotalInfo(paramObj);
					//시군구 생활업종정보 Bar차트 호출
					$bizStatsDataBoardApi.request.jobAreaBarChart(paramObj);	
				}

				//데이터보드의 테마를 선택 시에 지도 재호출
				if(type == "tabClick") {
					//$bizStatsMap.ui.doReqSidoCompany(options.params.adm_cd, themeCd, themeNm);
					//시군구 생활업종정보 정보
					$bizStatsDataBoardApi.request.jobAreaTotalInfo(paramObj);
					//시군구 생활업종정보 Bar차트 호출
					$bizStatsDataBoardApi.request.jobAreaBarChart(paramObj);
				}
				
				// 선택된 테마코드로 탭 활성화
				this.jobAreaTabClick(themeCd);
				this.jobAreaTypeClick(0);
				
				setTimeout(function() {
					var tmpOptions = {
								url: "none",
								api_id : "none",
								themeCd : themeCd,
								themeNm : themeNm,
								dataBoard : {
									jobAreaThemeCd : options.dataBoard.jobAreaThemeCd
								},
								params : {
									adm_cd : options.params.adm_cd,
									adm_nm : options.params.adm_nm
								}
					}
					$bizStatsMapApi.request.setStatsData("", tmpOptions);
				},2000);
				
			},
			
			/**
			 * @name         : jobChangeTabClick
			 * @description  : 업종밀집도 탭 클릭시 호출
			 * @date         : 2016. 06. 22.
			 * @author	     : 김성현
			 * @param :	 idx	(50:음식점, 20:도소매, 10:서비스, 40:숙박업) 
			 */
			jobChangeTabClick : function(themeCd) {
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobChangeType"+themeCd).addClass("on");
				//업종별 탭 show/hide
				$(".jobChangeTab").hide();
				$("#jobChangeTab"+themeCd).show();
			},
			
			/**
			 * 
			 * @name         : updateJobChange
			 * @description  :	업종밀집도 변화 데이터보드
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateJobChange : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobChangeDiv").show();
				
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.etc.themeCd != undefined) {
					$(".totalResult.tr01 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.etc.themeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				//default
				var themeCd = "";
				var themeNm = "";
				var jobChangeTab = "";
				
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				$("input[name='rd_service']").each(function() {		//서비스
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab03";
					}
				});
				$("input[name='rd_retail']").each(function() {		//도소매
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab02";
					}
				});
				$("input[name='rd_hotel']").each(function() {		//숙박업
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab04";
					}
				});
				$("input[name='rd_food']").each(function() {		//음식점
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab01";
					}
				});
				
				//전체 탭 숨기고 선택한 탭만 열기
				$(".jobChangeTab").hide();
				$("#"+jobChangeTab).show();
				
				//최신년도 설정
				/*$(".ysettingList a").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
					}
				})*/
				//$(".ysettingList>li:last").find("input").attr("checked", "checked");
				//$(".ysettingList a:last").addClass("on");
				
				//업종밀집도 변화 테마코드 탭 선택
				this.jobChangeTabClick(themeCd.substring(0,2));
				this.jobChangeThemeClick(themeCd, themeNm);
				$bizStatsMap.ui.setTitle("업종밀집도 변화 > "+themeNm, this.map.id+1);

				
			},
			
			/**
			 * 
			 * @name         : jobChangeThemeClick
			 * @description  :	업종밀집도 변화 테마코드 탭 선택 시
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			jobChangeThemeClick : function(themeCd, themeNm, callback) {
				//탭 선택된 상태로 만들기
				$(".jobChangeTab li a").removeClass("on");
				$("#jobChange_"+themeCd).addClass("on");

				var themeNm = $("#jobChange_"+themeCd).html();
				
				var title = "업종밀집도 변화 > " + themeNm;
				$(".helperText").html(title);
				
				var options = this.mapData[this.map_id].options;
				var year = companyDataYear;
				
				
				$(".ysettingList a").each(function() {
					if ($(this).hasClass("on")) {
						year = $(this).html();
						
						//alert("[bizStatsDataBoard.js] $(this).html() [" + $(this).html());
						
						// 우측 데이터 보드의 ==> 한식/전국 2014 와 같이 [지표/시도시군구 년도] 형태로 나오는데
						// 이 부분에서 년도가 companyDataYear보다 크면 companyDataYear로 세팅한다.
						// .ysettingList 는 데이터 보드의 맨 아래 동그라미 안의 년도이다.
						if(year > companyDataYear) {
							year = companyDataYear;
							$("#div_y"+year).addClass("on");
						}
						
					}
				});
				
				//파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : year,
							theme_cd : themeCd,
							theme_nm : themeNm,
							map : options.params.map
						}
				};
				
				
				//열지도 조회
				options.etc.themeCd = deepCopy(themeCd);
				options.etc.curPolygonCode = deepCopy(options.params.map.curPolygonCode);
				options.etc.year = deepCopy(options.params.year);;
				options.dataBoard.themeCd = themeCd;
				options.dataBoard.themeNm = themeNm;
				options.etc.themeCd = themeCd;
				options.params.year = year;
  				$bizStatsMap.ui.doReqCompanyDensity (themeCd, themeNm, year, options.params);
				
  				
  				//타이틀
				$(".jobChangeTitle").html(themeNm+"/"+options.params.adm_nm+" <span>"+options.params.year+"</span>");
  				
				//시계열별 데이터 Bar차트 호출
				$bizStatsDataBoardApi.request.jobChangeBarChart(paramObj);
				
				if (callback != null && callback instanceof Function) {
					callback.call(undefined, null);
				}
				
				setTimeout(function() {
					$bizStatsMapApi.request.setStatsData("", paramObj);
				},2000);
				
			},
			
			
			//======================================== start of 지자체 ==============================================
			/**
			 * @name         : jobOpenTabClick
			 * @description  : 왼쪽 메뉴에서 처음으로 메뉴 클릭해서 오른쪽 데이터 보드의 탭 하일라이트 하는 부분을 처리함.
			 * @date         : 2017. 05. 10.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			jobOpenTabClick : function(themeCd) {
				
				var tab_open_cd = "";
				
				if(    themeCd == "41_36_01_P" 
					|| themeCd == "21_06_01_P" 
					|| themeCd == "23_11_01_P" 
					|| themeCd == "23_12_01_P" 
					|| themeCd == "22_09_01_P" 
					|| themeCd == "22_14_01_P" 
					|| themeCd == "23_06_01_P" 
					
				  ) {
						tab_open_cd = "10";
					}
					
					
				if(    themeCd == "16_19_01_P" 
					|| themeCd == "41_43_01_P" 
					|| themeCd == "41_13_01_P" 
					|| themeCd == "41_16_01_P" 
					|| themeCd == "41_17_01_P" 
					|| themeCd == "41_14_01_P" 
					|| themeCd == "41_15_01_P" 
					
				  ) {
						tab_open_cd = "20";
					}
					
					
				if(    themeCd == "24_68_01_P" 
					|| themeCd == "24_70_01_P" 
					|| themeCd == "24_71_01_P" 
					|| themeCd == "24_32_01_P" 
					|| themeCd == "24_76_01_P" 
					|| themeCd == "24_30_01_P" 
					|| themeCd == "24_03_01_P" 
					|| themeCd == "24_15_01_P" 
					|| themeCd == "24_20_01_P" 
					|| themeCd == "24_14_01_P" 
					|| themeCd == "24_05_01_P" 
					|| themeCd == "24_06_01_P" 
					|| themeCd == "24_16_01_P" 
					|| themeCd == "24_18_01_P" 
					|| themeCd == "24_04_01_P" 
					|| themeCd == "24_45_01_P" 
					|| themeCd == "24_07_01_P" 
					|| themeCd == "24_02_01_P" 
					|| themeCd == "24_19_01_P" 
					|| themeCd == "24_12_01_P" 
					|| themeCd == "24_43_01_P" 
					|| themeCd == "24_01_01_P" 
					|| themeCd == "24_48_01_P" 
					|| themeCd == "24_81_01_P" 
					|| themeCd == "24_44_01_P" 
					|| themeCd == "24_42_01_P" 
				  ) {
						tab_open_cd = "30";
					}
					
					
				if(    themeCd == "41_19_01_P" 
					|| themeCd == "41_22_01_P" 
					|| themeCd == "41_21_01_P" 
					|| themeCd == "41_20_01_P" 
					|| themeCd == "41_40_01_P" 
					|| themeCd == "41_42_01_P" 
					|| themeCd == "41_41_01_P" 
					|| themeCd == "41_24_01_P"
					
					|| themeCd == "41_40_02_P"
					|| themeCd == "41_40_03_P"
					|| themeCd == "41_40_04_P"
					|| themeCd == "41_40_05_P"
					|| themeCd == "41_40_06_P"
					|| themeCd == "41_41_05_P"
					|| themeCd == "41_40_08_P"
					|| themeCd == "41_40_09_P"
					|| themeCd == "41_41_02_P"
					|| themeCd == "41_41_03_P"
					|| themeCd == "41_41_04_P"
					|| themeCd == "41_40_07_P"
					
				  ) {
						tab_open_cd = "40";
					}
					
					
				if(    themeCd == "42_03_01_P" 
					|| themeCd == "42_08_07_P" 
					|| themeCd == "42_08_06_P" 
					|| themeCd == "42_08_05_P" 
					|| themeCd == "42_08_03_P" 
					|| themeCd == "42_08_04_P" 
					|| themeCd == "42_08_02_P" 
					
				  ) {
						tab_open_cd = "50";
					}
				
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobOpenType"+tab_open_cd).addClass("on");
				//업종별 탭 show/hide
				$(".jobOpenTab").hide();
				$("#jobOpenTab"+tab_open_cd).show();
			},
			
			//======================================== start of 뜨는 지역 ==============================================
			/**
			 * @name         : jobBestTabClick
			 * @description  : 왼쪽 메뉴에서 처음으로 메뉴 클릭해서 오른쪽 데이터 보드의 탭 하일라이트 하는 부분을 처리함.
			 * @date         : 2017. 095. 18.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			jobBestTabClick : function(themeCd) {
				
				var tab_open_cd = "";
				
				if(    themeCd == "41_36_01_P" 
					|| themeCd == "21_06_01_P" 
					|| themeCd == "23_11_01_P" 
					|| themeCd == "23_12_01_P" 
					|| themeCd == "22_09_01_P" 
					|| themeCd == "22_14_01_P" 
					|| themeCd == "23_06_01_P" 
					
				  ) {
						tab_open_cd = "10";
					}
					
					
				if(    themeCd == "16_19_01_P" 
					|| themeCd == "41_43_01_P" 
					|| themeCd == "41_13_01_P" 
					|| themeCd == "41_16_01_P" 
					|| themeCd == "41_17_01_P" 
					|| themeCd == "41_14_01_P" 
					|| themeCd == "41_15_01_P" 
					
				  ) {
						tab_open_cd = "20";
					}
					
					
				if(    themeCd == "24_68_01_P" 
					|| themeCd == "24_70_01_P" 
					|| themeCd == "24_71_01_P" 
					|| themeCd == "24_32_01_P" 
					|| themeCd == "24_76_01_P" 
					|| themeCd == "24_30_01_P" 
					|| themeCd == "24_03_01_P" 
					|| themeCd == "24_15_01_P" 
					|| themeCd == "24_20_01_P" 
					|| themeCd == "24_14_01_P" 
					|| themeCd == "24_05_01_P" 
					|| themeCd == "24_06_01_P" 
					|| themeCd == "24_16_01_P" 
					|| themeCd == "24_18_01_P" 
					|| themeCd == "24_04_01_P" 
					|| themeCd == "24_45_01_P" 
					|| themeCd == "24_07_01_P" 
					|| themeCd == "24_02_01_P" 
					|| themeCd == "24_19_01_P" 
					|| themeCd == "24_12_01_P" 
					|| themeCd == "24_43_01_P" 
					|| themeCd == "24_01_01_P" 
					|| themeCd == "24_48_01_P" 
					|| themeCd == "24_81_01_P" 
					|| themeCd == "24_44_01_P" 
					|| themeCd == "24_42_01_P" 
				  ) {
						tab_open_cd = "30";
					}
					
					
				if(    themeCd == "41_19_01_P" 
					|| themeCd == "41_22_01_P" 
					|| themeCd == "41_21_01_P" 
					|| themeCd == "41_20_01_P" 
					|| themeCd == "41_40_01_P" 
					|| themeCd == "41_42_01_P" 
					|| themeCd == "41_41_01_P" 
					|| themeCd == "41_24_01_P"
					
					|| themeCd == "41_40_02_P"
					|| themeCd == "41_40_03_P"
					|| themeCd == "41_40_04_P"
					|| themeCd == "41_40_05_P"
					|| themeCd == "41_40_06_P"
					|| themeCd == "41_41_05_P"
					|| themeCd == "41_40_08_P"
					|| themeCd == "41_40_09_P"
					|| themeCd == "41_41_02_P"
					|| themeCd == "41_41_03_P"
					|| themeCd == "41_41_04_P"
					|| themeCd == "41_40_07_P"
					
				  ) {
						tab_open_cd = "40";
					}
					
					
				if(    themeCd == "42_03_01_P" 
					|| themeCd == "42_08_07_P" 
					|| themeCd == "42_08_06_P" 
					|| themeCd == "42_08_05_P" 
					|| themeCd == "42_08_03_P" 
					|| themeCd == "42_08_04_P" 
					|| themeCd == "42_08_02_P" 
					
				  ) {
						tab_open_cd = "50";
					}
				
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobBestType"+tab_open_cd).addClass("on");
				//업종별 탭 show/hide
				$(".jobBestTab").hide();
				$("#jobBestTab"+tab_open_cd).show();
			},
			
			
			
			/**
			 * @name         : jobOpenTabClick2
			 * @description  : 데이터 보드의 탭 클릭시 호출
			 * @date         : 2017. 05. 10.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			jobOpenTabClick2 : function(tabCd) {
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobOpenType"+tabCd).addClass("on");
				//업종별 탭 show/hide
				$(".jobOpenTab").hide();
				$("#jobOpenTab"+tabCd).show();
			},
			
			/**
			 * @name         : jobBestTabClick2
			 * @description  : 업종별 뜨는 지역 데이터 보드의 탭 클릭시 호출
			 * @date         : 2017. 09. 20.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			//mng_s
			jobBestTabClick2 : function(tabCd) {
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobBestType"+tabCd).addClass("on");
				//업종별 탭 show/hide
				$(".jobBestTab").hide();
				$("#jobBestTab"+tabCd).show();
			},
			
			/**
			 * 
			 * @name         : updateJobOpen
			 * @description  : 지자체 인허가 업종별 개업현황 데이터보드
			 * @date         : 2017. 5. 10. 
			 * @author	     : 
			 * @param	: options
			 * @history 	 :
			 */
			updateJobOpen : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobOpenDiv").show();
				
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.etc.themeCd != undefined) {
					$(".totalResult.tr08 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.etc.themeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				//default
				var themeCd = "";
				var themeNm = "";
				var jobOpenTab = "";
				
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				//bizStatsLeftMenu.jap에서 jj_ 이름을 맞추어 주어야 한다.
				$("input[name='jj_culture']").each(function() {		//문화체육
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab01";
					}
				});
				$("input[name='jj_tour']").each(function() {		//관광
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab02";
					}
				});
				$("input[name='jj_food']").each(function() {		//식품
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab03";
					}
				});
				$("input[name='jj_service']").each(function() {		//소상공인
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab04";
					}
				});
				$("input[name='jj_sanup']").each(function() {		//산업고용
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab05";
					}
				});
				
				//전체 탭 숨기고 선택한 탭만 열기
				$(".jobOpenTab").hide();
				$("#"+jobOpenTab).show();
				
				//최신년도 설정
				/*$(".ysettingList a").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
					}
				})*/
				//$(".ysettingList>li:last").find("input").attr("checked", "checked");
				//$(".ysettingList a:last").addClass("on");
				
				//업종밀집도 변화 테마코드 탭 선택
				//this.jobOpenTabClick(themeCd.substring(0,2)); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				this.jobOpenTabClick(themeCd); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				
				this.jobOpenThemeClick(themeCd, themeNm);
				$bizStatsMap.ui.setTitle("업종별 개업 현황 > "+themeNm, this.map.id+1);

				
			},
			
			/**
			 * 
			 * @name         : jobOpenThemeClick
			 * @description  : 업종별 개업 현황 탭 선택 시, 좌측 메뉴에서 들어갈 때도 이 함수가 호출됨.
			 * @date         : 2017. 5. 10. 
			 * @author	     : 김준하
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			jobOpenThemeClick : function(themeCd, themeNm, callback) {
				//탭 선택된 상태로 만들기
				$(".jobOpenTab li a").removeClass("on");
				$("#jobOpen_"+themeCd).addClass("on");

				var themeNm = $("#jobOpen_"+themeCd).html();
				
				var title = "업종별 개업 현황 > " + themeNm;
				$(".helperText").html(title);
				
				var options = this.mapData[this.map_id].options;
				
				var year = parseInt(companyDataYear,10) + 1; //companyDataYear는 common.js에 세팅하는데, 지자체는 companyDataYear + 1 이다.
				/*
				var year = '2015'; //지자체 새로 만들면서 2015로 일단 세팅함.
				if( year < '2015' ) {
					year = '2015';
				}
				*/
				
				//alert("[bizStatsDataBoard.js] options.params.year [" + options.params.year);
				//alert("[bizStatsDataBoard.js] this.map_id [" + this.map_id);
				
				
				$(".ysettingList a").each(function() {
					if ($(this).hasClass("on")) {
						
						//alert("[bizStatsDbataBoard.js] $(this).hasClass(\"on\") [" + $(this).hasClass("on"));
						
						year = $(this).html();
						
						// 우측 데이터 보드의 ==> 한식/전국 2015 와 같이 [지표/시도시군구 년도] 형태로 나오는데
						// 이 부분에서 년도가 companyDataYear+1보다 작으면 companyDataYear+1로 세팅한다.
						if(year < (parseInt(companyDataYear,10)+1)) {
							year = parseInt(companyDataYear,10)+1;
							$("#div_y"+year).addClass("on");
						}
						
					}
				});
				
				//alert("[bizStatsDataBoard.js] year [" + year);
				
				//파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : year,
							theme_cd : themeCd,
							theme_nm : themeNm,
							map : options.params.map
						}
				};
				
				
				
				//열지도 조회
				options.etc.themeCd = deepCopy(themeCd);
				options.etc.curPolygonCode = deepCopy(options.params.map.curPolygonCode);
				options.etc.year = deepCopy(options.params.year);;
				options.dataBoard.themeCd = themeCd;
				options.dataBoard.themeNm = themeNm;
				options.etc.themeCd = themeCd;
				options.params.year = year;
				
				//타이틀
				$(".jobOpenTitle").html(themeNm+"/"+options.params.adm_nm+" <span>"+options.params.year+"</span>");
  				
				$bizStatsMap.ui.doReqCompanyOpen (themeCd, themeNm, year, options.params);
				
				//시계열별 데이터 Bar차트 호출
				$bizStatsDataBoardApi.request.jobOpenBarChart(paramObj);
				
				if (callback != null && callback instanceof Function) {
					callback.call(undefined, null);
				}
				
				setTimeout(function() {
					$bizStatsMapApi.request.setStatsData("", paramObj);
				},2000);
				
			},
			//======================================== end of 지자체 ==============================================
			
			//======================================== start of 업종별 뜨는 지역 ==============================================
			/**
			 * 
			 * @name         : updateJobBest
			 * @description  : 업종별 뜨는 지역 데이터보드
			 * @date         : 2017. 9. 18. 
			 * @author	     : 
			 * @param	: options
			 * @history 	 :
			 */
			updateJobBest : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobBestDiv").show();
				
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.etc.themeCd != undefined) {
					$(".totalResult.tr10 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.etc.themeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				//default
				var themeCd = "";
				var themeNm = "";
				var jobBestTab = "";
				
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				//bizStatsLeftMenu.jap에서 jj_ 이름을 맞추어 주어야 한다.
				$("input[name='jj_culture']").each(function() {		//문화체육
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab01";
					}
				});
				$("input[name='jj_tour']").each(function() {		//관광
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab02";
					}
				});
				$("input[name='jj_food']").each(function() {		//식품
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab03";
					}
				});
				$("input[name='jj_service']").each(function() {		//소상공인
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab04";
					}
				});
				$("input[name='jj_sanup']").each(function() {		//산업고용
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab05";
					}
				});
				
				//전체 탭 숨기고 선택한 탭만 열기
				$(".jobBestTab").hide();
				$("#"+jobBestTab).show();
				
				//최신년도 설정
				/*$(".ysettingList a").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
					}
				})*/
				//$(".ysettingList>li:last").find("input").attr("checked", "checked");
				//$(".ysettingList a:last").addClass("on");
				
				//업종밀집도 변화 테마코드 탭 선택
				//this.jobOpenTabClick(themeCd.substring(0,2)); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				this.jobBestTabClick(themeCd); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				
				this.jobBestThemeClick(themeCd, themeNm);
				$bizStatsMap.ui.setTitle("업종별 뜨는 지역 > "+themeNm, this.map.id+1);

				
			},
			
			/**
			 * 
			 * @name         : jobBestThemeClick
			 * @description  : 업종별 뜨는 지역 탭 선택 시, 좌측 메뉴에서 들어갈 때도 이 함수가 호출됨.
			 * @date         : 2017. 9. 18. 
			 * @author	     : 김준하
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			jobBestThemeClick : function(themeCd, themeNm, callback) {
				//탭 선택된 상태로 만들기
				$(".jobBestTab li a").removeClass("on");
				$("#jobBest_"+themeCd).addClass("on");

				var themeNm = $("#jobBest_"+themeCd).html();
				
				var title = "업종별 뜨는 지역 > " + themeNm;
				$(".helperText").html(title);
				
				var options = this.mapData[this.map_id].options;
				
				var year = parseInt(companyDataYear,10) + 1; //companyDataYear는 common.js에 세팅하는데, 지자체는 companyDataYear + 1 이다.
				/*
				var year = '2015'; //지자체 새로 만들면서 2015로 일단 세팅함.
				if( year < '2015' ) {
					year = '2015';
				}
				*/
				
				//alert("[bizStatsDataBoard.js] options.params.year [" + options.params.year);
				//alert("[bizStatsDataBoard.js] this.map_id [" + this.map_id);
				
				
				$(".ysettingList a").each(function() {
					if ($(this).hasClass("on")) {
						
						//alert("[bizStatsDbataBoard.js] $(this).hasClass(\"on\") [" + $(this).hasClass("on"));
						
						year = $(this).html();
						
						// 우측 데이터 보드의 ==> 한식/전국 2015 와 같이 [지표/시도시군구 년도] 형태로 나오는데
						// 이 부분에서 년도가 companyDataYear+1보다 작으면 companyDataYear+1로 세팅한다.
						if(year < (parseInt(companyDataYear,10)+1)) {
							year = parseInt(companyDataYear,10)+1;
							$("#div_y"+year).addClass("on");
						}
						
					}
				});
				
				//alert("[bizStatsDataBoard.js] year [" + year);
				
				//파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : year,
							theme_cd : themeCd,
							theme_nm : themeNm,
							map : options.params.map,
							param_sido_cd : options.params.param_sido_cd,
							param_sgg_cd : options.params.param_sgg_cd,
							param_job_best_from : options.params.param_job_best_from,
							param_job_best_to : options.params.param_job_best_to
						}
				};
				
				
				
				//열지도 조회
				/*
				options.etc.themeCd = deepCopy(themeCd);
				options.etc.curPolygonCode = deepCopy(options.params.map.curPolygonCode);
				options.etc.year = deepCopy(options.params.year);;
				options.dataBoard.themeCd = themeCd;
				options.dataBoard.themeNm = themeNm;
				options.etc.themeCd = themeCd;
				options.params.year = year;
				*/
				
				
				$bizStatsMap.ui.doReqCompanyBest (themeCd, themeNm, year, options.params);
				
				
				//타이틀
				$(".jobBestTitle").html(themeNm+" 뜨는 지역");
				//개업기간
				$(".areaEtcTextBox").html("개업기간 : " 
						+ options.params.param_job_best_from.substr(0,4)+ "년 " 
						+ options.params.param_job_best_from.substr(4,2)+ "월 " 
						+ options.params.param_job_best_from.substr(6,2)+ "일" 
						+ " ~ " 
						+ options.params.param_job_best_to.substr(0,4)+ "년 " 
						+ options.params.param_job_best_to.substr(4,2)+ "월 "
						+ options.params.param_job_best_to.substr(6,2)+ "일");
				
				$("#jb_interest_area").html("관심지역 : " +  $bizStatsLeftMenu.ui.jobBestSido + " " + $bizStatsLeftMenu.ui.jobBestSgg );
				//$bizStatsDataBoardApi.request.jobBestBarChart(paramObj);
				
				/*
				//시계열별 데이터 Bar차트 호출
				$bizStatsDataBoardApi.request.jobBestBarChart(paramObj);
				
				if (callback != null && callback instanceof Function) {
					callback.call(undefined, null);
				}
				
				setTimeout(function() {
					$bizStatsMapApi.request.setStatsData("", paramObj);
				},2000);
				*/
				
				
			},
			//======================================== end of 업종별 뜨는 지역 ==============================================
			
			
			
			/**
			 * 
			 * @name         : updateAreaInfo
			 * @description  :	지역 종합정보 데이터보드
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateAreaInfo : function(options) {
				$(".dataBoardDiv").hide();
				$("#areaInfoDiv").show();
				
				//후보지 검색결과 숨김 (지역검색에서 넘어올 경우만 보여진다.)
				$("#areaSearchMinimap01").hide();
				$("#areaSearchMinimap02").hide();
				
				//default 총사업체
				var areaInfoTab = "company";
				this.mapData[this.map_id].options.dataBoard.indecreaseThemeCd = "5001";		//사업체 증감 테마코드 (한식) 2017.04.05 수정
				this.mapData[this.map_id].options.dataBoard.indecreaseThemeNm = "한식";		//사업체 증감 테마명 (한식) 2017.04.05 수정
				this.mapData[this.map_id].options.dataBoard.priceRadio = "apt";		//주택 거래가격 (아파트)
				this.mapData[this.map_id].options.dataBoard.tradeRadio = "apt";		//주택 거래동향 (아파트)
				
				//지역 종합정보 탭 선택
				this.areaInfoTabClick(areaInfoTab);
				
				//지역 총사업체, 총인구, 총가구, 총주택 조회
				$bizStatsDataBoardApi.request.allCompanyPplHouse(options.params.adm_cd);
				
				//지역 특성정보 스파이더웹차트 호출
				$bizStatsDataBoardApi.request.areaInfoSpiderwebChart(options.params);
				$bizStatsMap.ui.setTitle("지역종합정보 > "+options.params.adm_nm, this.map.id+1);
			},
			
			/**
			 * 
			 * @name         : areaInfoTabClick
			 * @description  :	지역 종합정보 탭 선택 시
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @param	: type (company, population, household, house)
			 * @history 	 :
			 */
			areaInfoTabClick : function(type) {
				
				//탭 선택된 상태로 만들기
				$(".areaInfoTab li a").removeClass("on");
				$(".areaInfoTab_"+type).addClass("on");
				
				//명칭
				var options = this.mapData[this.map_id].options;
				if(options.params.x && options.params.y && options.params.zoomLevel){
					this.map.mapMove([options.params.x, options.params.y], options.params.zoomLevel);
				}
				$(".areaInfoTitle").html(options.params.adm_nm);
				
				//지역 종합현황정보 전체 숨김
				$(".areaInfoAllDiv").hide();
				$(".areaInfoDT").hide();
				
				//총사업체일 경우
				if(type == "company") {
					$("#areaInfoCompanyDiv").prev().show();
					$("#areaInfoCompanyDiv").show();
					//업종별 비율
					$bizStatsDataBoardApi.request.areaInfoCompanyRate(options.params);
					//업종별 증감
					$bizStatsDataBoardApi.request.areaInfoCompanyIndecrease(options.params);
					//주요시설물 현황
					$bizStatsDataBoardApi.request.areaInfoMainFacility(options.params);
				}
				
				//총인구
				else if(type == "population") {
					$("#areaInfoPopulationDiv").prev().show();
					$("#areaInfoPopulationDiv").show();
					//연령별 인구비율
					$bizStatsDataBoardApi.request.areaInfoPopulationAge(options.params);
					//성별 인구비율
					$bizStatsDataBoardApi.request.areaInfoPopulationGender(options.params);
				}
				
				//총가구
				else if(type == "household") {
					$("#areaInfoHouseholdDiv").prev().show();
					$("#areaInfoHouseholdDiv").show();
					//점유형태별 가구비율
					$bizStatsDataBoardApi.request.areaInfoHouseholdOccupy(options.params);
					//가구유형별 가구비율
					$bizStatsDataBoardApi.request.areaInfoHouseholdType(options.params);
				}
				
				//총주택
				else if(type == "house") {
					$("#areaInfoHouseDiv").prev().show();
					$("#areaInfoHouseDiv").show();
					//주택 거래가격
					$bizStatsDataBoardApi.request.areaInfoHousePrice(options.params);
					//주택 거래 동향
					$bizStatsDataBoardApi.request.areaInfoHouseTrade(options.params);
					//공시지가
					$bizStatsDataBoardApi.request.areaInfoHousePnilp(options.params);
				}
				
				//통계조회
				options["year"] = $(".ysettingList").find("input:checked").val();
				options["reqType"] = type;
				if (this.map.geojson) {
					this.map.geojson.remove();
				}
				this.map.undoDropLayerBounds();
				$bizStatsMap.ui.requestOpenApi(options);
				
				
				//this.map.openApiReverseGeoCode(this.map.center);
				
			},
			
			/**
			 * 
			 * @name         : areaInfoChartTab
			 * @description  :	지역 종합현황정보 보기 탭 선택 시
			 * @date         : 2016. 06. 22. 
			 * @author	     : 김성현
			 * @param	: type (company, population, household, house)
			 * @param	: idx 차트순번
			 */
			areaInfoChartTab : function(type, idx) {
				$('.bizCateMenu').hide();
				$('.areaInfoChangeTab').hide();
				if(type == "company") {	//총사업체
					$("#areaInfoChartTabDiv01 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv01 .dbTabs").find("a:eq("+idx+")").addClass("on");
					$(".areaInfoCompany").hide();
					if(idx == 0) {
						$("#areaInfoCompanyChartTitle").html("소상공인 업종별 사업체 비율(%)");
						$("#areaInfoCompanyDiv01").show();
						$('.bizCateMenu').show();
						this.areaInfoCateClick(1);
					} else if(idx == 1) {
						$("#areaInfoCompanyChartTitle").html("소상공인 업종별 증감 (개)");	
						$("#areaInfoCompanyDiv02").show();
						$('.bizCateMenu').show();
						this.areaInfoCateClick(1);
					} else if(idx == 2) {
						$("#areaInfoCompanyChartTitle").html("주요시설물 현황 (개)");	
						$("#areaInfoCompanyDiv03").show();
					}
					
				} else if(type == "population") {		//총인구
					$("#areaInfoChartTabDiv02 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv02 .dbTabs").find("a:eq("+idx+")").addClass("on");
					if(idx == 0) {
						$("#areaInfoPopulationChartTitle").html("연령별 인구비율(%)");
						$("#areaInfoPopulationDiv01").show();
						$("#areaInfoPopulationDiv02").hide();
					} else if(idx == 1) {
						$("#areaInfoPopulationChartTitle").html("성별 인구비율");
						$("#areaInfoPopulationDiv01").hide();
						$("#areaInfoPopulationDiv02").show();
					}
					
				} else if(type == "household") {		//총가구
					$("#areaInfoChartTabDiv03 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv03 .dbTabs").find("a:eq("+idx+")").addClass("on");
					if(idx == 0) {
						$("#areaInfoHouseholdChartTitle").html("점유형태별 가구비율(%)");
						$("#areaInfoHouseholdDiv01").show();
						$("#areaInfoHouseholdDiv02").hide();
					} else if(idx == 1) {
						$("#areaInfoHouseholdChartTitle").html("거처유형별 가구비율(%)");
						$("#areaInfoHouseholdDiv01").hide();
						$("#areaInfoHouseholdDiv02").show();
					}
					
				} else if(type == "house") {		//총주택
					$("#areaInfoChartTabDiv04 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv04 .dbTabs").find("a:eq("+idx+")").addClass("on");
					if(idx == 0) {
						$("#areaInfoHouseChartTitle").html("㎡당 주택 거래가격 (만원)");
						$("#areaInfoHouseDiv01").show();
						$("#areaInfoHouseDiv02").hide();
						$("#areaInfoHouseDiv03").hide();
					} else if(idx == 1) {
						$("#areaInfoHouseChartTitle").html("주택 거래 동향 (건)");
						$("#areaInfoHouseDiv01").hide();
						$("#areaInfoHouseDiv02").show();
						$("#areaInfoHouseDiv03").hide();
					} else if(idx == 2) { //공시지가
						$("#areaInfoHouseChartTitle").html("공시지가 (원/㎡)");
						$("#areaInfoHouseDiv01").hide();
						$("#areaInfoHouseDiv02").hide();
						$("#areaInfoHouseDiv03").show();
					}
				}
			},
			
			/**
			 * @name         : areaInfoCompanyPrev
			 * @description  :	지역 종합정보 총사업체 차트 (이전 버튼 클릭 시)
			 * @date         : 2015. 12. 31. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoCompanyPrev : function() {
				$("#areaInfoChartTabDiv01 ul").find("li > a").removeClass("on");
				if($("#areaInfoCompanyDiv01").is(":visible")) {	//사업체 비율이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("주요시설물 현황 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv03").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(2) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv02").is(":visible")) {	//업종별 증감이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 사업체 비율(%)");
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv01").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(0) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv03").is(":visible")) {	//주요시설물 현황이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 증감 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv02").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(1) > a").addClass("on");
				}
			},
			
			/**
			 * @name         : areaInfoCompanyNext
			 * @description  :	지역 종합정보 총사업체 차트 (다음 버튼 클릭 시)
			 * @date         : 2015. 12. 31. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoCompanyNext : function() {
				$("#areaInfoChartTabDiv01 ul").find("li > a").removeClass("on");
				if($("#areaInfoCompanyDiv01").is(":visible")) {	//사업체 비율이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 증감 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv02").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(1) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv02").is(":visible")) {	//업종별 증감이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("주요시설물 현황 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv03").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(2) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv03").is(":visible")) {	//주요시설물 현황이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 사업체 비율(%)");
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv01").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : areaInfoPopulationChange
			 * @description  :	지역 종합정보 총인구 차트 (이전, 다음 버튼)
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoPopulationChange : function() {
				$("#areaInfoChartTabDiv02 ul").find("li > a").removeClass("on");
				if($("#areaInfoPopulationDiv01").is(":visible")) {	//연령 비율이 열려있을 경우
					$("#areaInfoPopulationChartTitle").html("성별 인구비율");
					$("#areaInfoPopulationDiv01").hide();
					$("#areaInfoPopulationDiv02").show();
					$("#areaInfoChartTabDiv02 ul").find("li:eq(1) > a").addClass("on");
				} else {
					$("#areaInfoPopulationChartTitle").html("연령별 인구비율(%)");
					$("#areaInfoPopulationDiv01").show();
					$("#areaInfoPopulationDiv02").hide();
					$("#areaInfoChartTabDiv02 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : areaInfoHouseholdChange
			 * @description  :	지역 종합정보 총가구 차트 (이전, 다음 버튼)
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoHouseholdChange : function() {
				$("#areaInfoChartTabDiv03 ul").find("li > a").removeClass("on");
				if($("#areaInfoHouseholdDiv01").is(":visible")) {	//점유형태별 가구비율이 열려있을 경우
					$("#areaInfoHouseholdChartTitle").html("거처유형별 가구비율(%)");
					$("#areaInfoHouseholdDiv01").hide();
					$("#areaInfoHouseholdDiv02").show();
					$("#areaInfoChartTabDiv03 ul").find("li:eq(1) > a").addClass("on");
				} else {
					$("#areaInfoHouseholdChartTitle").html("점유형태별 가구비율(%)");
					$("#areaInfoHouseholdDiv01").show();
					$("#areaInfoHouseholdDiv02").hide();
					$("#areaInfoChartTabDiv03 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : areaInfoHouseChange
			 * @description  :	지역 종합정보 총주택 차트 (이전, 다음 버튼)
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoHouseChange : function() {
				$("#areaInfoChartTabDiv04 ul").find("li > a").removeClass("on");
				if($("#areaInfoHouseDiv01").is(":visible")) {	//주택 거래가격이 열려있을 경우
					$("#areaInfoHouseChartTitle").html("주택 거래 동향 (건)");
					$("#areaInfoHouseDiv01").hide();
					$("#areaInfoHouseDiv02").show();
					$("#areaInfoChartTabDiv04 ul").find("li:eq(1) > a").addClass("on");
				} else {
					$("#areaInfoHouseChartTitle").html("㎡당 주택 거래가격 (만원)");
					$("#areaInfoHouseDiv01").show();
					$("#areaInfoHouseDiv02").hide();
					$("#areaInfoChartTabDiv04 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : updateAreaSearch
			 * @description  :	창업지역검색 데이터보드
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateAreaSearch : function(options) {
				$(".dataBoardDiv").hide();
				$("#areaSearchDiv").show();
				$(".optionListInfo").empty();
				
				var conditions = $bizStatsLeftMenu.ui.getCurSearchParam().one.conditions;
				
				for(var i=0; i<conditions.length; i++){
					var html = '';
					html += '<div class="condition">';
					html += '	<p class="on">'+conditions[i].category+'</p>';
					html += '	<p>'+conditions[i].value+'</p>';
					html += '</div>';
					$(".optionListInfo").append(html);
				}
				
				//메모리에 있는 후보지역
				var candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				
				//후보 지역이 없을경우 초기화
				if(candidateList == undefined) {
					this.mapData[this.map_id].options.dataBoard.candidateList = [];
				} /*else if(candidateList.length > 3) {
					messageAlert.open("알림", "최대 3개까지 가능합니다.");
					return;
				}*/
				
				//중복 체크
				/*if(candidateList != undefined) {
					for(var  i = 0; i < candidateList.length; i ++) {
						if(candidateList[i].adm_cd == options.params.adm_cd) {
//							messageAlert.open("알림", options.params.adm_nm + " 은(는) 중복입니다.");
							return; 	//중복일 경우 리턴
						}
					}
				}
				*/
				//후보지역 초기화
				$(".huboAreaList").empty();
				$(".spyChartTitleClass").empty();
				this.mapData[this.map_id].options.dataBoard.spyChartList = [];		//차트 초기화
				this.mapData[this.map_id].options.dataBoard.barChartList = [];		//차트 초기화

				//메모리에 저장 (최대 3개)
				//this.mapData[this.map_id].options.dataBoard.candidateList.push(options.params);
				
				candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				for(var  i = 0; i < candidateList.length; i ++) {
					this.areaSearchCandidateAdd((i+1), candidateList[i]);
				}
				
			},
			
			/**
			 * 
			 * @name         : areaSearchCandidateAdd
			 * @description  :	후보지역 추가
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현

			 * @param	: idx 순번, paramObj 파라미터
			 * @history 	 :
			 */
			areaSearchCandidateAdd : function(idx, paramObj) {
				
				var html = "";
				html += "<li>";
				html += "	<div class='rela'>";
				html += "		<a class='round on' id='" + paramObj.adm_cd + "' ";
				html += "			href='javascript:$bizStatsDataBoard.ui.areaSearchToggle(\""+paramObj.adm_cd+"\",\""+paramObj.adm_nm+"\",\""+paramObj.total+"\");'>";
				html += "			<span class='ss'>" + paramObj.adm_nm + "</span>";
				html += "			<span class='es' ";
				html += "				onclick='$bizStatsDataBoard.ui.areaSearchDetailInfo(\"first\", \""+paramObj.adm_cd+"\", \""+paramObj.adm_nm+"\", \""+paramObj.x+"\", \""+paramObj.y+"\");'>";
				html += "				지역상세정보보기";
				html += "			</span>";
				html += "		</a>";
				html += "	</div>";
				html += "</li>";
				$(".huboAreaList").append(html);
				
				//창업지역검색 스파이더웹차트 호출
				$bizStatsDataBoardApi.request.areaSearchSpiderwebChart(paramObj);
			},
			
			/**
			 * 
			 * @name         : areaSearchDetailInfo
			 * @description  :	지역 상세정보 보기
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @param	: type(first-최초검색, none-이후검색), adm_cd, adm_nm, x, y
			 * @history 	 :
			 */
			areaSearchDetailInfo : function(type, adm_cd, adm_nm, x, y) {
				var zoomLevel = 0;
				if(adm_cd.length >= 7) {
					zoomLevel = 8;
				} else if(adm_cd.length >= 5) {
					zoomLevel = 5;
				}
				//지도 이동
				// 2016. 04. 25 j.h.Seok
//				this.map.mapMove([x, y], zoomLevel);
				
				if (x == "undefined" || y == "undefined") {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.eachLayer(function(layer) {
							if (layer.feature.properties.adm_cd == adm_cd) {
								x = layer.feature.properties.x;
								y = layer.feature.properties.y;
							}
						});
					}
				}
				
				if (x == "undefined" || y == "undefined") {
					return;
				}
				
				this.map.dropInfo = {
						center : [x, y],
						zoom : zoomLevel
				};
				
				this.mapData[this.map_id].options.type = "areaInfo";
				this.mapData[this.map_id].options.params.adm_cd = adm_cd;
				this.mapData[this.map_id].options.params.adm_nm = adm_nm;
				this.mapData[this.map_id].options.params.x = x;
				this.mapData[this.map_id].options.params.y = y;
				this.mapData[this.map_id].options.params.zoomLevel = zoomLevel
				
				//최초 한번만 레이어 저장
				if(type == "first") {
					this.miniGeojson = this.map.dataGeojsonLayer;	
				}
				
				//데이터보드 호출
				this.updateDataBoard(this.mapData[this.map_id].options, "areaInfo");
				
				//후보지 검색결과 표출
				$("#areaSearchMinimap01").show();
				$("#areaSearchMinimap02").show();	
				
				//후보지 초기화
				$("#areaInfoCandidateCnt").text("0");
				$("#areaInfoCandidateList").html("");
				
				//미니맵 생성
				this.createMiniMap(this.map, 0);
			},
			
			/**
			 * 
			 * @name         : areaSearchToggle
			 * @description  : 후보지역 선택 토글
			 * @date         : 2016. 12. 22
			 * @author	     : 김재상
			 * @param		 : adm_cd, adm_nm, total
			 * @history 	 :
			 */
			areaSearchToggle : function(adm_cd, adm_nm, total){
				$('#'+adm_cd).toggleClass('on');
				
				var candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				var tmpList = [];

				if($('#'+adm_cd).hasClass('on')){
					//선택한 객체 추가
					candidateList.push({
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						total : total
					});
					tmpList = $.sort(candidateList, 1, "adm_cd");
				}else{
					//지우려는 객체를 제외하고 나머지를 push해서 새로운 리스트를 만든다.
					for(var  i = 0; i < candidateList.length; i ++) {
						if(adm_cd != candidateList[i].adm_cd) {
							tmpList.push(candidateList[i]);
						}
					}
				}
				
				this.mapData[this.map_id].options.dataBoard.candidateList = tmpList;
				this.mapData[this.map_id].options.dataBoard.spyChartList = [];
				this.mapData[this.map_id].options.dataBoard.barChartList = [];
				//남은 후보지역으로 차트를 다시 그린다.
				candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				for(var  i = 0; i < candidateList.length; i ++) {
					$bizStatsDataBoardApi.request.areaSearchSpiderwebChart(candidateList[i]);
				}
				
				if (candidateList.length == 0) {
					var chart = $("#spyCharts02").highcharts();
					console.log(chart);
					if (chart.series.length > 1) {
						chart.series[1].hide();
						$("#spyChartsArea04").hide();
					}
				}
			},
			
			/**
			 * 
			 * @name         : createMiniMap
			 * @description  :	미니맵 생성
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @param	: map, map_id
			 * @history 	 :
			 */
			createMiniMap : function(map, map_id) {
				if (map.miniMap.gMap == null) {
					//첫 지도만 미니맵 생성
					if(map_id == 0) {
						var miniMap = map.miniMap;
						miniMap.id = map_id;
						miniMap.createMap(map.delegate, "miniMap_01");
					}
					//더블클릭 줌 막기
					miniMap.gMap.doubleClickZoom.disable();
				} else {
					this.map.miniMap.geojson.remove();
				}
				
				//지도 이동
				this.map.miniMap.mapMove([989674, 1818313], 8, false);
				this.map.miniMap.addPolygonGeoJson(this.miniGeojson, "mini");
				
				//레이어만큼 each
				var html = "";
				var dataCnt = 0;
				this.map.miniMap.geojson.eachLayer(function(layer) {
					//데이터가 있는 레이어만 추출
					if(layer.feature.info.length > 0) {
						var property = layer.feature.properties;
						html += "<li><a href='javascript:$bizStatsDataBoard.ui.areaSearchDetailInfo(" +
										"\"none\"," +
										"\"" + property.adm_cd +"\"," +
										"\"" + property.adm_nm +"\"," +
										"\"" + property.x +"\"," +
										"\"" + property.y +"\"" +
									")'>"+property.adm_nm+"</a></li>";
						
						dataCnt++;
					}
				});
				
				//후보지 개수
				$("#areaInfoCandidateCnt").text(dataCnt);
				//후보지 리스트
				$("#areaInfoCandidateList").html(html);
			},
			
			/**
			 * 
			 * @name         : updateTrade
			 * @description  :	상권정보 데이터보드
			 * @date         : 2015. 12. 04. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateTrade : function(options) {
				$(".dataBoardDiv").hide();
				$("#tradeDiv").show();
				//지역상권 타이틀
				$(".tradeAreaTitle").text(options.params.data.properties.tradearea_nm + " 상권");
				
				var tradearea_id = options.params.data.properties.tradearea_id;
				//영역 내 업종 비율
				$bizStatsDataBoardApi.request.tradeThemeRatioPieChart(tradearea_id);
				//상권정보 데이터보드 Pie차트 선택
				$bizStatsDataBoard.ui.tradePieChartClick(tradearea_id, "음식점");
			},
			
			/**
			 * 
			 * @name         : tradePieChartClick
			 * @description  :	상권정보 데이터보드 Pie차트 선택 시
			 * @date         : 2015. 12. 04. 
			 * @author	     : 김성현
			 * @param	: tradearea_id, themeNm
			 * @history 	 :
			 */
			tradePieChartClick : function(tradearea_id, themeNm) {
				var themeCd = "";
				if(themeNm == "서비스") {
					themeCd = "10";
				} else if(themeNm == "도소매") {
					themeCd = "20";
				} else if(themeNm == "숙박업") {
					themeCd = "40";
				} else if(themeNm == "음식점") {
					themeCd = "50";
				}
				this.mapData[this.map_id].options.params.theme_cd = themeCd;	//테마코드
				
				//명칭
				$("#tradeThemeNmSpan").text(themeNm);
				//테마별 상권 상세정보 Bar 차트 조회
				$bizStatsDataBoardApi.request.tradeThemeBarChart(tradearea_id, themeCd);
			},
			
			/**
			 * @name         : reset
			 * @description  :	생활업종지도 데이터보드 초기화
			 * @date         : 2015. 11. 26.
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reset : function(map_id) {
				$(".dataBoardDiv").hide();
				this.chartDataList[map_id] = null;
				
				this.mapData[map_id].options = {};
				this.mapData[map_id].type = "";
				if(this.map != null) {
					if (this.map.miniMap) {
//						this.map.miniMap = null;
						if(this.map.miniMap.geojson) {
							this.map.miniMap.geojson.remove();
						}
					}
				}
			},
			
			/**
			 * @name         : setReportData
			 * @description  : 보고서 데이터를 저장한다.
			 * @date         : 2015. 11. 26.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setReportData : function(category, type, data, id) {
				if ($bizStatsDataBoard.ui.chartDataList[id] == null) {
					$bizStatsDataBoard.ui.chartDataList[id] = [];
				}
				
				var e = {
						category: category,
						type: type,
						data: data
				};
				
				if(p = $.pick($bizStatsDataBoard.ui.chartDataList[id], {category: category, type: type})){
					var idx = $.indexOf($bizStatsDataBoard.ui.chartDataList[id], p);
					$bizStatsDataBoard.ui.chartDataList[id][idx].data = data;
				}else{
					$bizStatsDataBoard.ui.chartDataList[id].push(e);
				}
			},
			
			areaInfoCateClick : function(idx) {
				//탭 초기화 후 선택
				$(".bizCateMenu").find("a").removeClass("on");
				$(".bizCateMenu").find("a:eq("+(idx-1)+")").addClass("on");
				
				
				// 소상공인 업종별 사업체 비율
				if($("#areaInfoCompanyDiv01").is(":visible")){
					$(".areaInfoChart").hide();
					$(".areaInfoTable").hide();

					$(".chartsSizingBox:eq("+(idx-1)+")").show();
					$(".areaInfoTable:eq("+(idx-1)+")").show();
				// 소상공인 업종별 증감
				}else if($("#areaInfoCompanyDiv02").is(":visible")){
					//업종별 탭 show/hide
					$(".areaInfoChangeTab").hide();
					$("#areaInfoChangeTab0"+idx).show();
				}
				
			},
			
			areaInfoThemeClick : function(themeCd, themeNm){
				$(".areaInfoChangeTab li>a").removeClass("on");
				$("#areaInfo_"+themeCd).addClass("on");
				
				$(".chartsTitleBox img").attr("src", "/img/ico/bizStats/ico_sector_img_"+themeCd+".png");
				$(".chartsTitleBox span").text(themeNm);
				
				//선택한 테마코드를 메모리에 저장
				$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeCd = themeCd;
				$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeNm = themeNm;
				
				//업종별 증감 차트 재 호출
				$bizStatsDataBoardApi.request.areaInfoCompanyIndecrease($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
			},
			
			/**
			 * @name         : areaInfoComparePopup
			 * @description  : 후보지역 비교 다이얼로그 팝업
			 * @date         : 2016. 9. 6.
			 * @author	     : 김재상
			 * @history 	 :
			 */
			areaInfoComparePopup : function(){
				$('.dialogbox').css('left', '0px');
				$(".dialogbox .dimAreaScroll").mCustomScrollbar({axis:"xy"});
	        	
				//후보지역 비교 팝업 표/차트 전환 이벤트
				$(".dialogbox .typeBox>a").click(function(){
					$(".dialogbox .typeBox>a").removeClass('on');
					$(this).addClass("on");
					var idx = $(this).index(".dialogbox .typeBox>a");
					$(".dialogbox .tables").css("position", "absolute");
					$(".dialogbox .charts").css("position", "absolute");
					if(idx == 0){
						$(".dialogbox .tables").css("position", "static");
					}else if(idx == 1){
						$(".dialogbox .charts").css("position", "static");
					}
				});
			},
			
			areaInfoComparePopupClose : function(){
				$('.dialogbox').css('left', '-20000px');
			},
			
			/**
			 * @name         : changeLegend
			 * @description  : 시군구별 생활업종현황 범례설정 버블<->색상
			 * @date         : 2016. 10. 13.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			changeLegend : function(type) {
				if (type == "color") {
					$bizStatsMap.ui.setChangeColorMode();
				}else {
					$bizStatsMap.ui.setChangeBubbleMode();
				}
			}
	};

	$bizStatsDataBoard.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				//투명도 설정 바
				$("#dataSlider").slider({
			    	range: "min",
			        min: 5,
			        max: 10,
			        value: 10,
			        slide: function( event, ui ) {  //ui.value
			        	$(".dataSideBox, .bizStatsDataBoard").css("opacity", ui.value*0.1);
				    }
			    });
				$(".dataSideBox, .bizStatsDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
				
				//닫기 버튼
				body.on("click",".dataSideBox .bar>a",function(){ 
					$(".dataSideBox").stop().animate({"right":"-1500px"},200);
					$(".bizStatsDataBoard").removeClass("on").stop().animate({"right":"0"},200);
				});
				
				//탭 열고 닫기
				body.on("click",".dscList dt>a",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).parents("dt").next("dd").show();
					}else{
						$(this).removeClass("on");
						$(this).parents("dt").next("dd").hide();
					}
				});
				
				//데이터보드 열고 닫기
				body.on("click",".bizStatsDataBoard",function(){ 
					var ck = $(this).hasClass("on");
					if(!ck){
						//일반 데이터보드
						$(".dataSideBox").stop().animate({"right":"0"},200);
						$(this).addClass("on").stop().animate({"right":"426px"},200);
					}else{
						//데이터보드 닫기
						$(".dataSideBox").stop().animate({"right":"-1500px"},200);
						$(this).removeClass("on").stop().animate({"right":"0"},200);
					}
				});
				
				//차트/표 토글
				body.on("click",".typeBox>a",function(){ 
					$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
					$(this).addClass("on");
					var ck = $(this).index(".typeBox>a")+1;
					$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
					$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
					if(ck%2){
						$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
					}else{
						$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
					}
			    });
				
				//업종밀집도 변화 년도 설정
				body.on("click", ".ysettingList a", function() {
					//전체 체크 해제
					$(".ysettingList input").prop("checked", false);
					$(this).prev().prop("checked", true);
					
					//선택 체크
					$(".ysettingList a").removeClass("on");
					$(this).addClass("on");
					
					//메모리에 있는 조회정보 가져오기
					var themeCd = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.themeCd;
					var themeNm = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.themeNm;
					var params = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params;
					var year = $(".ysettingList").find("input:checked").val();
					
					//alert("[bizStatsDataBoard.js] themeCd.length [" + themeCd.length);
					if (themeCd.length == 10) { //지자체 코드 길이는 10
						//지자체 인허가 재 조회
						$bizStatsDataBoard.ui.jobOpenThemeClick(themeCd, themeNm);
					} else {
						//업종밀집도 변화 재 조회
						$bizStatsDataBoard.ui.jobChangeThemeClick(themeCd, themeNm);
					}
				});
				
				//업종별 증감 테마 슬라이더 (IE10 이하일 경우 fade)
				if(browserFnc() != -1 && browserFnc() < 11) {
					$(".bxslider").bxSlider({
						infiniteLoop: false,
						hideControlOnEnd: true,
						mode : "fade"
					});
				} else {
					//테마 슬라이더
					$(".bxslider").bxSlider({
						infiniteLoop: false,
						hideControlOnEnd: true
					});
				}
				
				//테마코드 클릭 이벤트 (업종별 증감)
				$(".theme_icon").click(function() {
					var imgLen = $(this).find("img").attr("src").length;
					var currThemeCd = $(this).find("img").attr("src").substring(imgLen-8, imgLen-4);
					var currThemeNm = $(this).find(".themeIconSpan").text();
					$("#areaInfoCompanyBxslider").find("span").each(function(i, b){
						$(b).css("color", "#999999");
					});
					$(this).css("color", "#00bcd4");
					
					//선택한 테마코드를 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeCd = currThemeCd;
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeNm = currThemeNm;
					
					//업종별 증감 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoCompanyIndecrease($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//주택 거래가격 라디오버튼 선택 시
				$("input:radio[name='priceRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.priceRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoHousePrice($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//주택 거래 동향 라디오버튼 선택 시
				$("input:radio[name='tradeRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.tradeRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoHouseTrade($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//공시지가 라디오버튼 선택 시
				$("input:radio[name='pnilpRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.pnilpRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoHousePnilp($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//인트로 시도별 생활업종의 테마를 선택 시
				body.on("click", ".introSidoThemeTab li", function() {
					$(".introSidoThemeTab li a").removeClass("on");
					$(this).find("a").addClass("on");
				});
				
				//시군구별 생활업종현황 데이터보드 색상<->버블
				body.on("click", ".bizLegendBox>div", function() {
					var id = $(this).attr("id");
					$(this).addClass("on");
					if (id == "bizLegend_color") {
						if ($(".bizLegend_bubble").hasClass("on")) {
							$(".bizLegend_bubble").removeClass("on");
						}
						$bizStatsDataBoard.ui.changeLegend("color");
					}else {
						if ($(".bizLegend_color").hasClass("on")) {
							$(".bizLegend_color").removeClass("on");
						}
						$bizStatsDataBoard.ui.changeLegend("bubble");
					}
				});
				
				//업종밀집도 읍면동 셀렉트박스 이벤트 
				body.on("change", ".emdongSelect", function(e){
					var emdong_cd = $(this).find(":selected").val();
					var emdong_nm = $(this).find(":selected").text();
					var curMapData = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id];
					
					if(curMapData.options && curMapData.type){
						if(curMapData.options.params){
							var params = curMapData.options.params;
							if(params.adm_cd.length > 4){
								curMapData.options.params.adm_cd = params.adm_cd.substr(0,5) + emdong_cd;
								curMapData.options.params.adm_nm = params.adm_nm + " " + emdong_nm;
								$bizStatsDataBoard.ui.updateDataBoard(curMapData.options, curMapData.type);
							}
						}
					}
				});
				
			},
			
			/**
			 * 
			 * @name         : dataBoardOpen
			 * @description  : 데이터보드를 오픈한다. 
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			dataBoardOpen : function() {
				pageCallReg();
				//데이터 보드가 닫혀있을 경우 오픈한다.
				if(!$(".bizStatsDataBoard").hasClass("on")) {
					$(".bizStatsDataBoard").click();
					$("#dataBoard").show();
				}
			}
	};
}(window, document));