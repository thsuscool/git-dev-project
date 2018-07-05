/**
 * 생활업종 통계지도 Left 메뉴(조회조건)에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/03  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$technicalBizLeftMenu = W.$technicalBizLeftMenu || {};
	
	$(document).ready(function() {
		$technicalBizLeftMenu.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$technicalBizLeftMenu.ui.commonDataList();		//공공데이터, 나의데이터 목록
		
		$.cssHooks.backgroundColor = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["backgroundColor"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("background-color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
		
		$.cssHooks.color = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["color"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
	});
	
	$technicalBizLeftMenu.ui = {
			searchbtnCnt : 0, // 버튼생성 카운트
			curSelectedStatsType : null, // 현재 선택된 통계분류 (sido, sigugun 등)
			curSelectedStatsNm : null, // 현재 선택된 통계분류 이름
			arParamList : [], // 생성된 조회버튼에 매칭된 파라미터 정보배열
			mapColor : ["#0478cb", "#9ED563", "#FF0066"],		//지도 별 고유 색상
			curSearchBtnArray : { "one":"", "two":"", "three":"" },	//지도를 조회한 버튼 아이디
			curSelectedCompany : "food",		//사업체 업종선택
			//2017.09.01 개발팀 추가 시작
			curSelectStandard : "company",
			curSelectSggThemeCd : 00,
			curSelectSggThemeNm : "기술업종전체현황",
			//2017.09.01 개발팀 추가 종료
			
			/**
			 * 
			 * @name         : doCharacteristicIntro
			 * @description  : 기술업종 특성 현황을 보여준다
			 * @date         : 2016. 10. 03
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doCharacteristicIntro : function(){
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$technicalBizMap.ui.doCharacteristicIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doSidoIntro
			 * @description  : 시도별 기술업종 현황을 보여준다
			 * @date         : 2016. 10. 03
			 * @author	     : 김재상
			 * @history 	 :
			 */
			doSidoIntro : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$technicalBizMap.ui.doSidoIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doSigunguIntro
			 * @description  : 시군구별 기술업종 현황을 보여준다.
			 * @date         : 2016. 10. 03
			 * @author	     : 김재상
			 * @history 	 :
			 */
			doSigunguIntro : function () {
				var defer = $.Deferred();
				
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$technicalBizMap.ui.doCompanySidoIntro();
					defer.resolve();
				}, 300);
				
				return defer.promise();
			},
			
			/**
			 * 
			 * @name         : doBookMarkSigunguIntro
			 * @description  : 지역찾기 시군구 맵 생성
			 * @date         : 2017. 12. 12
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doBookMarkSigunguIntro : function(callback){
				var defer = $.Deferred();
				
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$technicalBizMap.ui.doCompanySidoIntro(callback);
					defer.resolve();
				}, 300);
				
				return defer.promise();
			},
			
			/**
			 * 
			 * @name         : doCompanyDensityIntro
			 * @description  : 업종밀집도 정보를 보여준다.
			 * @date         : 2016. 10. 03
			 * @author	     : 김재상
			 * @history 	 :
			 */
			doCompanyDensityIntro : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				setTimeout(function() {
					$technicalBizMap.ui.doCompanyDensityIntro();
				}, 300);
			},
			

			
			/**
			 * 
			 * @name         : doSupplyFacilitiesIntro
			 * @description  : 지원시설 정보를 보여준다
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 */
			doSupplyFacilitiesIntro : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				setTimeout(function() {
					$technicalBizMap.ui.doSupplyFacilitiesIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doIndustrialComplex
			 * @description  : 산업단지 정보를 보여준다
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 */
			doIndustrialComplexIntro : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				setTimeout(function() {
					$technicalBizMap.ui.doIndustrialComplexIntro();
				}, 300);
			},
			/**
			 * 
			 * @name         : doNormalMapInit
			 * @description  : 지도를 노말지도로 초기화한다.
			 * @date         : 2015. 11. 05.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doNormalMapInit : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId);
				var map = $technicalBizMap.ui.mapList[mapId];
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				setTimeout(function() {
					$technicalBizMap.ui.doNormalMapInit();
				}, 200);
			},

			/**
			 * 
			 * @name         : addSearchBtn
			 * @description  : 조건검색버튼을 생성한다.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			addSearchBtn : function() {
				//조회버튼은 최대 10개만 가능
				if(this.btnLimitCnt()) {
					//일반 버튼일 경우 파라미터 유효성 검사
					if(this.btnValidationCheck(this.curSelectedStatsType)) {
						var api_id = this.setParams(this.curSelectedStatsType);
						this.createSearchBtn(api_id); // 버튼생성
						this.searchbtnCnt++;
						$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
					}
				}
			},
			
			/**
			 * 
			 * @name         : btnLimitCnt
			 * @description  : 버튼갯수 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			btnLimitCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
				if(cnt > 9) {
					messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
					return false;
				}
				return true;
			},
			
			/**
			 * 
			 * @name         : getBtnCnt
			 * @description  : 버튼갯수 
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			getBtnCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
			},
			
			/**
			 * 
			 * @name         : createSearchBtn
			 * @description  : 조건버튼을 실제로 생성한다.(버튼 타이틀생성/버튼생성)
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			createSearchBtn : function(curSelectedStatsType) {
				// 버튼타이틀생성
				var btnTitle = null;
				var unit = null;
				var showData = null;
				
				//통계버튼 보이기
				var sq03 = $(".sideQuick.sq03");
				if(!sq03.hasClass("on")){
					$(".sideQuick.sq03").click();
				}

				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == this.searchbtnCnt) {
						var names = this.arParamList[i].names;
						if (Object.prototype.toString.call(names) === "[object Array]") {
							btnTitle = names.join(" + ");
						}else {
							btnTitle = names;
						}
						unit = this.arParamList[i].unit;
						showData = this.arParamList[i].filterParam;
						this.arParamList[i]["title"] = btnTitle;
						break;
					}
				}
				
				//타이틀
				var tmpTitle = btnTitle + " ("+ unit +")";
				
				//버튼생성
				var html = "<li class='dragItem' id='dragItem_"+this.searchbtnCnt+"'>" +
									"<a href='javascript:void(0)' id='"+this.curSelectedStatsType + "-" + this.searchbtnCnt+"' class='ellipsis drag on' title='"+tmpTitle+"'>" +
										"<div class='text'>"+tmpTitle+"</div>" +
									"</a>" +
									"<a href='javascript:$technicalBizLeftMenu.ui.deleteSearchBtn("+this.searchbtnCnt+");' class='sqdel'><img src='/img/um/btn_closel01.png' alt='삭제' /></a>" +
								"</li>";
				$("#searchBtnResultRgn ul").prepend(html);
				
				//버튼 드래그설정
				$(".dragItem").draggable({ 
					revert : "invalid",
					helper : "clone",
					cursor : "pointer",
					zIndex : 100,
					cursorAt : {left : -5},
					appendTo : "body",
					start : function(e, ui) {
					},
					drag : function(e, ui) {
						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
					},
					stop : function(e, ui) {
						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
					}
				});
				
				//조건버튼 드래그, 더블클릭 설정
				this.searchModeSetting();
				
				//버튼 카운트
				this.getBtnCnt();
			},
			
			/**
			 * 
			 * @name         : searchModeSetting
			 * @description  : 조건버튼 드래그, 더블클릭 설정. 
			 * @date         : 2015. 11. 10.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type : drag, doubleClick
			 */
			searchModeSetting : function(type) {
				$(".dragItem").draggable( "enable" );	//드랍 허용
				$(".ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled").css({"opacity":1});	//disabled일때 흐려짐현상 없앰
				//더블클릭 이벤트
				$(".dragItem").dblclick(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var index = id.split("-")[1];
					var tmpParam = "";
					for(var i = 0; i < $technicalBizLeftMenu.ui.arParamList.length; i ++) {
						if($technicalBizLeftMenu.ui.arParamList[i].idx == index) {
							tmpParam = $technicalBizLeftMenu.ui.arParamList[i];
						}
					}
					// 더블클릭 시, 콜백 호출
					$technicalBizMap.callbackFunc.didMapDoubleClick(id, tmpParam);
				});
				
				//원클릭 이벤트	/*2016-03-17 수정*/
				$(".dragItem").mousedown(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var name = id.split("-")[0];
					//업종밀집도 변화, 지역 종합정보, 창업지역검색 일 경우 줌레벨을 시군구 레벨로 변경
					if(name == "jobChange" || name == "areaInfo" || name == "areaSearch") {
						if($technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId].zoom < 4) {	//시도 레벨일 경우
							$technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId].setZoom(4);	//시군구 레벨로 변경
						}
					}
				});
				
				this.updateSearchBtnEffect(this.curSearchBtnArray["one"], 0);
				this.updateSearchBtnEffect(this.curSearchBtnArray["two"], 1);
				this.updateSearchBtnEffect(this.curSearchBtnArray["three"], 2);
			},
			
			/**
			 * 
			 * @name         : updateSearchBtnEffect
			 * @description  : 해당 조건버튼의 색상 및 깜빡임 효과. 
			 * @date         : 2015. 11. 10.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param btn_id : 조회 버튼 아이디 (element id)
			 * @param map_id : 지도 번호 (0, 1, 2)
			 */
			updateSearchBtnEffect : function(btn_id, map_id) {
				//모든 버튼 색상 초기화
				$("#searchBtnResultRgn ul li").each(function() {
					$(this).find("a").removeClass("M_on");
					$(this).find("a").css("background-color", "");	//해당 버튼 배경 없애기
				});
				
				//드랍된 버튼 아이디 저장
				if(map_id == "0") {
					this.curSearchBtnArray["one"] = btn_id;
				} else if(map_id == "1") {
					this.curSearchBtnArray["two"] = btn_id;
				} else if(map_id == "2") {
					this.curSearchBtnArray["three"] = btn_id;
				}
				
				//원래 드랍됐었던 조회버튼
				if(this.curSearchBtnArray["one"] != "") {
					$technicalBizLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], this.mapColor[0]);
				}
				if(this.curSearchBtnArray["two"] != "") {
					$technicalBizLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], this.mapColor[1]);
				}
				if(this.curSearchBtnArray["three"] != "") {
					$technicalBizLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], this.mapColor[2]);
				}
				
				//분할 화면에 같은 버튼을 조회했을 경우
				if(this.curSearchBtnArray["one"] != "" && (this.curSearchBtnArray["one"] == this.curSearchBtnArray["two"])) {
					$technicalBizLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], "#394955");
				}
				if(this.curSearchBtnArray["two"] != "" && (this.curSearchBtnArray["two"] == this.curSearchBtnArray["three"])) {
					$technicalBizLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], "#394955");
				}
				if(this.curSearchBtnArray["three"] != "" && (this.curSearchBtnArray["three"] == this.curSearchBtnArray["one"])) {
					$technicalBizLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], "#394955");
				}
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정한다. 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			setParams : function(curSelectedStatsType) {
				var tmpArParams = new Array();
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				var filterParam = null;
				var unit = null;
				var filterName = null;
				
				//업종밀집도 변화
				if (curSelectedStatsType == "jobChange") {
					var fullName = null;
					var tmpNames = [];
					
					filterParam = $(".jobArea_stepBox label.on").prev("input").val();
					fullName = $(".jobArea_stepBox label.on").text();
					tmpNames.push($.trim(fullName));
					unit = "개";
					
					if (tmpNames.length > 0) {
						tmpArParamName.push(tmpNames.join());
					}
					
					tmpArParams.push({
						key : "theme_cd",
						value : $(".jobArea_stepBox label.on").prev("input").val()
					});
					
					tmpArParams.push({
						key : "year",
						value : dataYear
					});
				}
				
				//지역 종합정보
				else if (curSelectedStatsType == "areaInfo") {
					tmpArParamName.push("지역 종합정보");
					unit = "개";
				}
				
				//조건 설정에 따른 지역 검색
				else if (curSelectedStatsType == "areaSearch") {
					unit = "개";
					
					// 사업체 업종
					if($("#companyTabDiv").is(":visible")) {
						var tmpThemeCd = "";
						var tmpThemeNm = "";
						
 						//요식업
						if(this.curSelectedCompany == "food") {
							$("input[name='rd_sch_food']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "요식업-"+$(this).next().text();
								}
							});
							
						//도소매
						} else if(this.curSelectedCompany == "retail") {
							$("input[name='rd_sch_retail']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "도소매-"+$(this).next().text();
								}
							});
							
						//서비스
						} else if(this.curSelectedCompany == "service") {
							$("input[name='rd_sch_service']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "서비스-"+$(this).next().text();
								}
							});
							
						//숙박업
						} else if(this.curSelectedCompany == "hotel") {
							$("input[name='rd_sch_hotel']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "숙박업-"+$(this).next().text();
								}
							});
						}
						
						tmpArParamName.push(tmpThemeNm);
						tmpArParams.push({
							key : "theme_cd",
							value : tmpThemeCd
						});
					}
					
					// 사업체 수
					if($("#companyCountDiv").is(":visible")) {
						var corp_cnt = $("#companyCount").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(corp_cnt);

						tmpArParamName.push("사업체 수-"+tmpNm);
						tmpArParams.push({
							key : "corp_cnt",
							value : corp_cnt
						});
					}
					
					// 사업체 증감
					if($("#companyIncreaseDiv").is(":visible")) {
						var rate_change = $("#companyIncrease").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderLowAvgHigh(rate_change);
						
						tmpArParamName.push("사업체 증감-"+tmpNm);
						tmpArParams.push({
							key : "rate_change",
							value : rate_change
						});
					}
					
					// 직장인구
					if($("#jobPeopleDiv").is(":visible")) {
						var ppl_val = $("#jobPeople").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(ppl_val);
						
						tmpArParams.push({
							key : "ppl_type",
							value : "2"
						});
						
						tmpArParamName.push("직장인구-"+tmpNm);
						tmpArParams.push({
							key : "ppl_val",
							value : ppl_val
						});
					}
					
					// 거주인구
					if($("#stayPeopleDiv").is(":visible")) {
						var ppl_val = $("#stayPeople").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(ppl_val);
						
						tmpArParams.push({
							key : "ppl_type",
							value : "1"
						});
						
						tmpArParamName.push("거주인구-"+tmpNm);
						tmpArParams.push({
							key : "ppl_val",
							value : ppl_val
						});
					}
					
					// 성별인구
					if($("#genderPeopleDiv").is(":visible")) {
						var pplGender = $("input[name='population_gender']:checked");
						var pplGenderVal = $("#genderPeople").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(pplGenderVal);
						
						tmpArParamName.push($(pplGender).next().text());
						tmpArParams.push({
							key : "ppl_gender_type",
							value : $(pplGender).val()
						});
						
						tmpArParamName.push("성별인구-"+tmpNm);
						tmpArParams.push({
							key : "ppl_gender_val",
							value : pplGenderVal
						});
					}
					
					// 연령별인구
					if($("#agePeopleDiv").is(":visible")) {
						var pplAgeVal = $("#agePeople").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(pplAgeVal);
						
						var pplAge = [];						
						var tmpNames = [];
						$("input[name='rd_age']").each(function() {
							if($(this).attr("checked") == "checked") {
								pplAge.push($(this).val());
								tmpNames.push($(this).next().text());
							}
						});
						
						tmpArParamName.push(tmpNames.join(","));
						tmpArParams.push({
							key : "ppl_age_type",
							value : pplAge.join(",")
						});
						
						tmpArParamName.push("인구연령-"+tmpNm);
						tmpArParams.push({
							key : "ppl_age_val",
							value : pplAgeVal
						});
					}
					
					// 가구유형
					if($("#householdDiv").is(":visible")) {
						var familyType = "";
						var familyVal = $("#household").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(familyVal);
						
						$("input[name='household_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								familyType = $(this);
							}
						});
						
						tmpArParamName.push($(familyType).next().text());
						tmpArParams.push({
							key : "family_type",
							value : $(familyType).val()
						});
						
						tmpArParamName.push("가구-"+tmpNm);
						tmpArParams.push({
							key : "family_val",
							value : familyVal
						});
					}
					
					// 점유형태
					if($("#occupyTypeDiv").is(":visible")) {
						var occupyType = "";
						var occupyVal = $("#occupyType").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(occupyVal);
						
						$("input[name='ocptn_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								occupyType = $(this);
							}
						});
						
						tmpArParamName.push($(occupyType).next().text());
						tmpArParams.push({
							key : "occupy_type",
							value : $(occupyType).val()
						});
						
						tmpArParamName.push("점유형태-"+tmpNm);
						tmpArParams.push({
							key : "occupy_val",
							value : occupyVal
						});
					}
					
					// 거주 주택
					if($("#houseLivingTypeDiv").is(":visible")) {
						var houseType = "";
						$("input[name='house_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								houseType = $(this);
							}
						});
						
						tmpArParamName.push($(houseType).next().text());
						tmpArParams.push({
							key : "house_type",
							value : $(houseType).val()
						});
					}
					
					//해당 주택 수
					if($("#houseTypeDiv").is(":visible")) {
						var houseVal = $("#houseType").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(houseVal);
						
						tmpArParamName.push("주택 수-"+tmpNm);
						tmpArParams.push({
							key : "house_val",
							value : houseVal
						});
					}
					
					//아파트 시세
					if($("#apartPriceDiv").is(":visible")) {
						var apartPrice = $("#apartPrice").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(apartPrice);
						
						tmpArParamName.push("아파트 시세정도-"+tmpNm);
						tmpArParams.push({
							key : "apartprice",
							value : apartPrice
						});
					}
					
					//노후 주택
					if($("#oldHouseDiv").is(":visible")) {
						var oldHouse = $("#oldHouse").slider("value");
						var tmpNm = $technicalBizLeftMenu.Util.sliderSmallAvgBig(oldHouse);
						
						tmpArParamName.push("노후주택 수-"+tmpNm);
						tmpArParams.push({
							key : "house_old_val",
							value : oldHouse
						});
					}
				}
				
				this.arParamList.push({
					idx : this.searchbtnCnt,
					params : tmpArParams,
					noneParams : tmpArNoneParams,
					names : tmpArParamName,
					filterParam : filterParam,
					unit : unit
				});
				
				return curSelectedStatsType;
			},
			
			/**
			 * 
			 * @name         : setDetailStatsPanel
			 * @description  : 특정 통계버튼을 생성했을 때, 해당 통계에 대한 세부통계조건선택뷰를 생성한다.
			 * @date         : 2015. 11. 03. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 통계타입
			 */
			setDetailStatsPanel : function(type) {
				
				//데이터보드 초기화
				$technicalBizDataBoard.ui.initDataBoard();
				
				$("#standardButton").removeClass("off");
				//2017.09.25 개발팀 수정 menuType titleType 수정
				/*var menuType = {
						"sido"			: 0,	//시도별 기술업종 현황
						"sigungu"		: 1,	//시군구별 기술업종 현황
						"density"	 	: 2,	//업종밀집도 변화
						"supply" 	 	: 3,	//지원시설 조회
						"industry"		: 4,		//산업단지 조회
						  
				};*/
				
				
				var menuType = {
						"sido"			: 0,	//시도별 기술업종 현황
						"sigungu"		: 1,	//시군구별 기술업종 현황
						"density"	 	: 2,	//업종밀집도 변화
						"lq"			: 3,	//업종별 입지계수 지도			
						"search"		: 4,	//조건별 지역찾기
						"supply" 	 	: 5,	//지원시설 조회
						"industry"		: 6,		//산업단지 조회
						  
				};
				
				/*var titleType = {
						"sido"		: "시도별 기술업종 현황",
						"sigungu"	: "시군구별 기술업종 현황",
						"density"	: "업종밀집도 변화",
						"supply"	: "지원시설 조회",				
						"industry"	: "산업단지 조회",	
				}*/
				
				var titleType = {
						"sido"		: "시도별 기술업종 현황",
						"sigungu"	: "시군구별 기술업종 현황",
						"density"	: "업종밀집도 변화",
						"lq"		: "업종별 입지계수 지도",
						"search"	: "조건별 지역찾기",
						"supply"	: "지원시설 조회",				
						"industry"	: "산업단지 조회",	
				}
				
				
				//2017.09.25 개발팀 수정 종료

				this.curSelectedStatsType = type;
				this.curSelectedStatsNm = titleType[type];
				
				var inx = menuType[type];
				$("#submenuTitle").text(titleType[type]);
				$(".quickBox.step01").find("li").removeClass("on");
				$(".quickBox.step01").find("li:eq("+inx+")").addClass("on");
				$(".totalResult").hide();
				
				//버튼생성 삭제
				$(".buttonMakeBtnClass").hide();
				
				//Intro 제외 2depth열기, 3depth, 4dpeht 닫기
				//2017.10.13 개발팀 수정
				/*if(menuType[type] != 0 && menuType[type] != 3 && menuType[type] != 4) {
					$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
					$(".quickBox.step02").stop().animate({"left":"280px"},200);
					$(".quickBox.step03").stop().animate({"left":"-280px"},200);
				} else {
					$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
					$(".quickBox.step03").stop().animate({"left":"-280px"},200);
				}*/
				
				if(menuType[type] != 0 && menuType[type] != 5 && menuType[type] != 6  && menuType[type] != 4) {
					$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
					$(".quickBox.step02").stop().animate({"left":"280px"},200);
					$(".quickBox.step03").stop().animate({"left":"-280px"},200);
					
					$(".quickBox.step04").stop().animate({"left":"-560px"},200);
				}else if(menuType[type] == 4){
					//기존 창 닫고 새로운 창 열기
					//조건 검색 quickBox step04
					//
					/*$technicalBizLeftMenu.event.stepCloseAnimate(2, "check");*/
					$(".quickBox.step02").stop().animate({"left":"-280px"},200);
					$(".quickBox.step03").stop().animate({"left":"-280px"},200);
					$(".quickBox.dubble.step04").stop().animate({"left":"280px"},200);
				} else {
					$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
					$(".quickBox.step03").stop().animate({"left":"-280px"},200);
					
					$(".quickBox.step04").stop().animate({"left":"-560px"},200);
				}
				
				if(menuType[type] == 3){
					$(".quickBox.step02 > .normalBox01 > .stepBox.xWidth > a").eq(0).hide();
					$(".quickBox.step02 > .normalBox01 > .stepBox.xWidth > a").removeClass("on");
					$(".quickBox.step02 > .normalBox01 > .stepBox.xWidth > .joinDefault").hide();
				}else{
					$(".quickBox.step02 > .normalBox01 > .stepBox.xWidth > a").eq(0).show();
					$(".quickBox.step02 > .normalBox01 > .stepBox.xWidth > a").removeClass("on");
					$(".quickBox.step02 > .normalBox01 > .stepBox.xWidth > .joinDefault").hide();
				}
				//2017.10.13 개발팀 수정 종료
				//2017.09.25 개발팀 수정 case 유형 추가
				switch(menuType[type]) {
					// 시도별 기술업종 현황
					case 0:
						this.doSidoIntro();
						$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
						$technicalBizMap.ui.whiteMap = true;
						$("#mapDataStandard").show();
						break;
						
					// 시군구별 기술업종 현황
					case 1:
						this.doSigunguIntro();
						$(".quickBox.step02 .radioType label").removeClass("on");
						$(".quickBox.step02 .radioType label").removeAttr("checked");
						$(".totalResult.tr01").show();
						$technicalBizMap.ui.whiteMap = true;
						$("#mapDataStandard").show();
						break;
						
					// 업종밀집도 변화
					case 2:
						this.doNormalMapInit();
						this.doCompanyDensityIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						$technicalBizMap.ui.whiteMap = false;
						$("#mapDataStandard").hide();
						break;
					
					//업종별 입지계수 지도
					case 3 : 
						this.doNormalMapInit();
						$(".quickBox.step02 .radioType label").removeClass("on");
						$(".quickBox.step02 .radioType label").removeAttr("checked");
						//실행 함수
						var dataBoard = $technicalBizDataBoard.ui;
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						$technicalBizMap.ui.setTitle(titleType[type], viewId);
						/*$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");*/
						$technicalBizMap.ui.whiteMap = false;
						$("#mapDataStandard").show();						
						
						break;
					
					//조건별 지역찾기
					case 4 :
						this.doSigunguIntro();

						var dataBoard = $technicalBizDataBoard.ui;
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						$technicalBizMap.ui.setTitle(titleType[type], viewId);		
						/*$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");*/
						$technicalBizMap.ui.whiteMap = true;
						
						$technicalBizLeftMenu.ui.searchSliderBoxCreate("#slider01", 0, 2.1);
						$technicalBizLeftMenu.ui.searchSliderBoxCreate("#slider02", 0, 2.1);
						$technicalBizLeftMenu.ui.searchSliderBoxCreate("#slider03", -100, 100.1);
						$technicalBizLeftMenu.ui.searchSliderBoxCreate("#slider04", -100, 100.1);
						$("#mapDataStandard").hide();
					//	$(".step04").mCustomScrollbar({axis:"xy",advanced : {autoExpandHorizontaScroll:true}})
						
						
						$technicalBizLeftMenu.ui.searchSelectThemeCd($("#searchSelectThemeCd > li:eq(0) > input"));
						if(!$("#chk_saup01").attr("checked")){
							$technicalBizLeftMenu.ui.searchStandard('chk_saup01');
						}
						if(!$("#chk_jongsa01").attr("checked")){
							$technicalBizLeftMenu.ui.searchStandard('chk_jongsa01');
						}
						
						//2018.01.15 [개발팀] 초기화
						if(!$("#chk_saup02").attr("checked")){
							$technicalBizLeftMenu.ui.searchStandard('chk_saup02');
						}
						if(!$("#chk_jongsa02").attr("checked")){
							$technicalBizLeftMenu.ui.searchStandard('chk_jongsa02');
						}
						
						if($("#rd_inFac01").attr("checked")){
							$technicalBizLeftMenu.ui.searchStandard('rd_inFac01');
						}
						if($("#rd_inFac02").attr("checked")){
							$technicalBizLeftMenu.ui.searchStandard('rd_inFac02');
						}
						
						$technicalBizLeftMenu.ui.changeSliderTab("0"); //2018.01.15 [개발팁] 초기화 
						break;
						
					// 지원시설 조회
					case 5:
						this.doNormalMapInit();
						this.doSupplyFacilitiesIntro();				
						var dataBoard = $technicalBizDataBoard.ui;
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}

						$technicalBizMap.ui.setTitle(titleType[type], viewId);		
						$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
						$technicalBizMap.ui.whiteMap = false;
						$("#mapDataStandard").show();
						break;
						
					// 산업단지 조회
					case 6:
						this.doNormalMapInit();
						this.doIndustrialComplexIntro();
						var dataBoard = $technicalBizDataBoard.ui;
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						$technicalBizMap.ui.setTitle(titleType[type], viewId);
						$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
						$technicalBizMap.ui.whiteMap = false;
						$("#mapDataStandard").show();
						break;
				}
				
			},
			
			
			//2017.09.01 개발팀 추가 시작
			/**
			 * 
			 * @name         : mapDataStandardChange
			 * @description  : 지도 데이터 기준 변경
			 * @date         : 2017. 09. 01. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param type   : 
			 */
			mapDataStandardChange : function(){
				//type
				//btn
				
				var type="";
				var ck = $("#standardButton").hasClass("off");
				var _timer = parseInt($(".timeSelect").val())*1000;
				if(ck){
					$("#standardButton").removeClass("off");
					$("#standardButton").find(".ball").stop().animate({"left":"48px"},200,'easeOutExpo');
					$("#standardButton").find(".txt").stop().animate({"left":"4px"},200,'easeOutExpo');
					/*_introTable = setInterval(function(){
						fnObj.introTable();
					},_timer);*/
					
					type = 'company';
				}else{
					$("#standardButton").addClass("off");
					$("#standardButton").find(".ball").stop().animate({"left":"2px"},200,'easeOutExpo');
					$("#standardButton").find(".txt").stop().animate({"left":"34px"},200,'easeOutExpo');
					/*clearInterval(_introTable);*/
					type = 'worker';
				}
				
				
				
				var menuType = {
						"sido"			: 0,	//시도별 기술업종 현황
						"sigungu"		: 1,	//시군구별 기술업종 현황
						"density"	 	: 2,	//업종밀집도 변화
						"lq"			: 3,	//업종별 입지계수 지도			
						"search"		: 4,	//조건별 지역찾기
						"supply" 	 	: 5,	//지원시설 조회
						"industry"		: 6,		//산업단지 조회
						  
				};
				//2017.09.25 개발팀 수정 종료
				
				switch(menuType[$technicalBizLeftMenu.ui.curSelectedStatsType]) {

				// 시도별 기술업종 현황
				case 0:
					var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
					$technicalBizMap.ui.clearIntroData(map);
					map.mapMode = "intro";
					map.mapMove([1007770, 1855549], 2);
					
					//시도별 기술업종현황 조회 
					if(type == "company"){
						$technicalBizMapApi.request.openApiTechSidoCompanyInfo(map);
					}else{
						$technicalBizMapApi.request.openApiTechSidoWorkerInfo(map);
					}
					break;
					
				// 시군구별 기술업종 현황
				case 1:
					var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
					map.mapMode = "intro";
					map.mapMove([1007770, 1855549], 2);
					map.gMap.removeLayer(map.tileLayer);
					map.blankLayer.addTo(map.gMap);
					map.setFixedBoundLevel(true);
					map.isLayerMouseEventDisabled = true;
					map.legend.legendInit();
					map.gMap.setMaxZoom(7);
					
					setTimeout(function() {
						if (map.geojson != null) {
							
							//시도별 기술업종현황 조회 
							if(type == "company"){
								//techRank_corp_cnt
								$technicalBizMap.ui.doReqSidoCompany($technicalBizLeftMenu.ui.curSelectSggThemeCd, $technicalBizLeftMenu.ui.curSelectSggThemeNm, "0", function() {
									//지도정보 기준을 선택할 경우, 무조건 색상지도로 초기화함.
									$(".techLegend_color").click();
								});
								//$technicalBizMap.ui.changeSigunguRankType('corp_cnt');
							}else{
								//techRank_worker_cnt
								$technicalBizMap.ui.doReqSidoCompany($technicalBizLeftMenu.ui.curSelectSggThemeCd, $technicalBizLeftMenu.ui.curSelectSggThemeNm, "3", function() {
									//지도정보 기준을 선택할 경우, 무조건 색상지도로 초기화함.
									$(".techLegend_color").click();
								});
								//$technicalBizMap.ui.changeSigunguRankType('worker_cnt');
							}
						}
					},200);
					
					
					break;
					
				// 업종밀집도 변화
				case 2:
					break;
				
				//업종별 입지계수 지도
				case 3:
					 var adm_cd = $("#technicalLqDivAreaBox").data("admcd");
					 var techbiz_m_class_cd = $("#technicalLqDivAreaBox").data("classCd");
					 
					 if(adm_cd == "00"){
						 
						$technicalBizMap.ui.doReqAllLq(techbiz_m_class_cd,'','0','country',type);
					 }else{
						 $technicalBizMap.ui.doGetSggLq(adm_cd,'',techbiz_m_class_cd,null);
					 }
					break;
				
				//조건검색
				case 4:
					
					var adm_cd =  $("#technicalSearchDetail").data("admCd");
					var adm_nm = $("#technicalSearchDetail").data("adm_nm");
					
					$technicalBizDataBoard.ui.searchDetailArea(adm_cd,adm_nm);
					
					break;
					
				// 지원시설 조회
				case 5:
					var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
					if($("#supplyDetailDiv > .mapBefore").css('display') != "none"){
						if(type == "company"){
							$technicalBizDataBoard.ui.changeSupplyMap('1');
							$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab01('1');
						}else{
							$technicalBizDataBoard.ui.changeSupplyMap('2');
							$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab01('2');
						}
					}else{
						if(type == "company"){
							$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab01('1');
						}else{
							$technicalBizDataBoard.ui.changeSupplyAreaSynthesizeStatsInfoTab01('2');
						}
					}
					
					
					break;
					
				// 산업단지 조회
				case 6 :
					if($("#industryDetailDiv").is(":visible")){
						if(type == "company"){
							$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab01('1');
						}else{
							$technicalBizDataBoard.ui.changeIndustryAreaSynthesizeStatsInfoTab01('2');
						}
					}else{
						
						$technicalBizDataBoardApi.request.industryAreaStateBarChartDraw($technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["induscomm"]);
					}
					if(type == "company"){
						$technicalBizDataBoard.ui.changeIndustryMap('1');
					}else{
						$technicalBizDataBoard.ui.changeIndustryMap('2');
					}
					break;
			}
				
				
			},
			//2017.09.01 개발팀 추가 종료
			
			//2017.10.25 개발팀 추가
			/**
			 * 
			 * @name         : searchSliderBoxCreate
			 * @description  : 조건별 지역 찾기 슬라이더 생성
			 * @date         : 2017. 10. 25. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			searchSliderBoxCreate : function(id,_v1,_v2){
				var tooltipmin = $('<div class="tooltip">'+_v1+'</div>').css({
				    position: 'absolute',
				    top: 0,
				    left: 50
				});
				var tooltipmax = $('<div class="tooltip">이상</div>').css({
				    position: 'absolute',
				    top: 0,
				    left: 50
				});
				
				//입지계수
				//slider01
				//slider02
				//증감률
				//slider03
				//slider04
				var maxValue = 0;
				var minValue = 0;
				if(id == "#slider01" || id == "#slider02"){
					maxValue = 2.1;
					minValue = 0;
				}else{
					maxValue = 101;
					minValue = -100;
				}
				
				var slideritem = $(id).slider({
					orientation: "vertical",
					values: [_v1, _v2],
				    min: minValue,
				    max: maxValue,
				    step: 0.1,
				    range: true,
				    slide: function(event, ui) {
				        tooltipmin.text(ui.values[0]);
						tooltipmax.text(ui.values[1]);
						
						var setValue1 = ui.values[0];
						var setValue2 = ui.values[1];
						
						if(id == "#slider01"){
							if(setValue2 > 2){
								setValue2 = "이상";
							}
						}
						if(id == "#slider02"){
							if(setValue2 > 2){
								setValue2 = "이상";
							}
						}
						if(id == "#slider03"){
							if(setValue2 > 100){
								setValue2 = "이상";
							}
						}
						if(id == "#slider04"){
							if(setValue2 > 100){
								setValue2 = "이상";
							}
						}
						
						/*$("#"+event.target.id).parents(".slideArea10").eq(0).find(".val01").text(ui.values[0]);
						$("#"+event.target.id).parents(".slideArea10").eq(0).find(".val02").text(ui.values[1]);*/
						tooltipmin.text(setValue1);
						tooltipmax.text(setValue2);
						$("#"+event.target.id).parents(".slideArea10").eq(0).find(".val01").text(setValue1);
						$("#"+event.target.id).parents(".slideArea10").eq(0).find(".val02").text(setValue2);
						
				    },
				    change: function(event, ui) {
				    	var setValue1 = ui.values[0];
						var setValue2 = ui.values[1];
						/*var id = event.currentTarget.id;
						console.log(event);*/
						
				    	if(id == "#slider01"){
				    		if(setValue2 > 2){
								setValue2 = "이상";
							}
				    	}
				    	if(id == "#slider02"){
				    		if(setValue2 > 2){
								setValue2 = "이상";
							}
				    	}
				    	
				    	if(id == "#slider03"){
				    		if(setValue2 > 100){
								setValue2 = "이상";
							}
				    	}
				    	
				    	if(id == "#slider04"){
				    		if(setValue2 > 100){
								setValue2 = "이상";
							}
				    	}
				    	
				    	
				    	tooltipmin.text(setValue1);
						tooltipmax.text(setValue2);
						
						/*tooltipmin.text(ui.values[0]);
						tooltipmax.text(ui.values[1]);*/
					}
				});
				slideritem.find(".ui-slider-handle").first().append(tooltipmin);
				slideritem.find(".ui-slider-handle").last().append(tooltipmax);
				
				$(id).parents(".slideArea10").eq(0).find(".val01").text(_v1);
				/*$(id).parents(".slideArea10").eq(0).find(".val02").text(_v2);*/
				$(id).parents(".slideArea10").eq(0).find(".val02").text('이상');
				
				
			},
			
			
			/**
			 * 
			 * @name         : changeSliderTab
			 * @description  : 조건별 지역 찾기 슬라이더 교체
			 * @date         : 2017. 10. 25. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			changeSliderTab : function(selectTabId){
				//infoSetArea on
				
				
				$("#selectSliderTab > .half > .s01").removeClass("on");
				$("#selectSliderTab > .half > .s01").eq(selectTabId).addClass("on");
				
				/*$('input:radio[name="infoSet"]').each(function(){
					this.checked = false;
				});*/
				
				$('input:radio[name="infoSet"]').attr("checked",false);
				
				$('input:radio[name="infoSet"]').eq(selectTabId).attr("checked",true);
				
				$(".infoSetArea").removeClass("on");
				$("#infoSetArea"+selectTabId).addClass("on");
				
			},
			
			/**
			 * 
			 * @name         : searchStandard
			 * @description  : 조건별 지역 찾기 마커 체크
			 * @date         : 2017. 10. 25. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			searchStandard : function(id){
				//조건 체크시
				//업종선택이냐 
				//계수냐 증감률이냐, 사업체기준이냐 종사자 기준이냐
				//지역내 지원시설
				var checked = $("#"+id).attr("checked");
				if(checked){
					$("#"+id).attr("checked",false);
					$("label[for='"+id+"']").removeClass("on");
				}else{
					$("#"+id).attr("checked",true);
					$("label[for='"+id+"']").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : searchSelectThemeCd
			 * @description  : 조건별 지역 찾기 업종 선택
			 * @date         : 2017. 10. 25. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param type   : 현재 선택된 테마업종
			 */
			searchSelectThemeCd : function(obj){
				$("#searchSelectThemeCd > li > input").attr("checked",false);
				$("#searchSelectThemeCd > li > label").removeClass("on");
				$(obj).attr("checked",true);
				$("label[for='"+$(obj).attr("id")+"']").addClass("on");
			},
			
			/**
			 * 
			 * @name         : lqStandardSearch
			 * @description  : 조건별 지역 찾기 버튼 클릭
			 * @date         : 2017. 10. 26. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param type   : 현재 선택된 것들을 기준으로 검색
			 */
			lqStandardSearch : function(){
				//선택된 업종
				//입지계수냐 증감률이냐
				//사업체 기준 || 종사자 기준
				//창업지원센터 여부 || 산업단지 여부
				
				var themeCd = checkedVal('sectors');
				var infoType = checkedVal('infoSet');
				
				var option1 = false;
				var option2 = false;
				var selectCheckBox = new Array();
				var etcCheckBoxArray = new Array();
				
				var param = {};
				
				//증감율 전년대비 검색은 .. 아직 테스트중
				if(infoType == "lq"){
					
					//2018.01.15 [개발팀]
					if (!$("#chk_saup01").attr("checked") && !$("#chk_jongsa01").attr("checked")) {
						messageAlert.open("알림", "사업체 기준 또는 종사자 기준 중에 반드시 하나 이상의 항목을 선택해야 합니다.");
						return;
					}
					
					if($("#chk_saup01").attr("checked")){
						param.from_corp_lq = $("#slider01").parents(".slideArea10").eq(0).find(".val01").text();
						param.to_corp_lq = $("#slider01").parents(".slideArea10").eq(0).find(".val02").text();
						option1 = true;
					}
					
					if($("#chk_jongsa01").attr("checked")){
						param.from_worker_lq = $("#slider02").parents(".slideArea10").eq(0).find(".val01").text();
						param.to_worker_lq = $("#slider02").parents(".slideArea10").eq(0).find(".val02").text();
						option2 = true;
					}

				}else{
					
					//2018.01.15 [개발팀]
					if (!$("#chk_saup02").attr("checked") && !$("#chk_jongsa02").attr("checked")) {
						messageAlert.open("알림", "사업체 기준 또는 종사자 기준 중에 반드시 하나 이상의 항목을 선택해야 합니다.");
						return;
					}
					
					if($("#chk_saup02").attr("checked")){
						param.from_corp_lq = $("#slider03").parents(".slideArea10").eq(0).find(".val01").text();
						param.to_corp_lq = $("#slider03").parents(".slideArea10").eq(0).find(".val02").text();
						option1 = true;
					}
					
					if($("#chk_jongsa02").attr("checked")){
						param.from_worker_lq = $("#slider04").parents(".slideArea10").eq(0).find(".val01").text();
						param.to_worker_lq = $("#slider04").parents(".slideArea10").eq(0).find(".val02").text();
						option2 = true;
					}
					
				}
				var is_contain_bizfac = false;
				var is_contain_induscom = false;
				if($("#rd_inFac01").attr("checked")){
					is_contain_bizfac = true;
				}
				
				if($("#rd_inFac02").attr("checked")){
					is_contain_induscom = true;
				}
				
				var option = {
					lq_base_region	: "country",
					techbiz_class_cd : themeCd,
					selectInfoType : infoType,
					option1 : option1, 
					option2 : option2,
					param : param,
					is_contain_bizfac : is_contain_bizfac,
					is_contain_induscom : is_contain_induscom
					
				};
				$technicalBizMap.ui.searchLqSgg(option);
				
				function checkedVal(nm){
					var radioArray =  $("input:radio[name='"+nm+"']");
					var rVal = null;
					for(var i = 0; i < radioArray.length; i ++){
						
						if($(radioArray[i]).attr("checked")){
							rVal = $(radioArray[i]).val();
						}
					}
					return rVal;
				}
				$technicalBizLeftMenu.event.stepCloseAnimate(4, "check");
				$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
				apiLogWrite2("T0", "T08", "조건별 지역찾기", "techbiz_class_cd="+themeCd+"&from_corp_lq="+param.from_corp_lq+"&from_worker_lq="+param.from_worker_lq+"to_corp_lq="+param.to_corp_lq+"&to_worker_lq="+param.to_worker_lq, "00", "전국");
			},
			
			//2017.10.25 개발팀 추가 종료
			
			/**
			 * 
			 * @name         : companyTab
			 * @description  : 사업체 업종선택 탭 선택시.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			companyTab : function(type) {
				this.curSelectedCompany = type;
			},
			
			/**
			 * 
			 * @name         : deleteSearchBtn
			 * @description  : 생성된 조건검색버튼을 삭제한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchbtnCnt   : 조회버튼 고유값
			 */
			deleteSearchBtn : function(value) {
				var btn_id = $("#dragItem_" + value).find("a").attr("id");
				$("#dragItem_" + value).remove();

				// 삭제된 조회버튼의 파라미터정보를 삭제한다.
				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == value) {
						this.arParamList.splice(this.arParamList.indexOf(this.arParamList[i]), 1);
						break;
					}
				}
				
				//지도를 조회한 버튼 아이디 초기화
				if(this.curSearchBtnArray["one"] == btn_id) {
					this.curSearchBtnArray["one"] = "";
				}
				if(this.curSearchBtnArray["two"] == btn_id) {
					this.curSearchBtnArray["two"] = "";
				}
				if(this.curSearchBtnArray["three"] == btn_id) {
					this.curSearchBtnArray["three"] = "";
				}

				//버튼 카운트
				this.getBtnCnt();
			},
			
			/**
			 * 
			 * @name         : btnValidationCheck
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보 유효성 검사. 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			btnValidationCheck : function(curSelectedStatsType) {
				//창업지역검색
				if (curSelectedStatsType == "areaSearch") {
					
					if($(".wonList01").find(".on").length > 5) {
						messageAlert.open("알림", "최대 5개까지만 선택 가능합니다.");
						return false;
					}else if ($(".wonList01").find(".on").length == 0) {
						messageAlert.open("알림", "최소 1개이상 조건을 선택하세요.");
						return false;
					}
					
					//사업체수, 사업체증감이 선택되어 있을경우
					if($("#companyCountAtag").hasClass("on") || $("#companyIncreaseAtag").hasClass("on")) {
						var str = "";
						//요식업
						if(this.curSelectedCompany == "food") {
							$("input[name='rd_sch_food']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							
						//도소매
						} else if(this.curSelectedCompany == "retail") {
							$("input[name='rd_sch_retail']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						
						//서비스
						} else if(this.curSelectedCompany == "service") {
							$("input[name='rd_sch_service']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						
						//숙박업
						} else if(this.curSelectedCompany == "hotel") {
							$("input[name='rd_sch_hotel']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						}
					
						if(str == "") {
							messageAlert.open("알림", "사업체 업종은 필수입니다.");
							return false;
						}
					}
					
					// 성별인구
					if($("#genderPeopleAtag").hasClass("on")) {
						var str = "";
						$("input[name='population_gender']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "성별은 필수입니다.");
							return false;
						}
					}
					
					// 연령별인구
					if($("#agePeopleAtag").hasClass("on")) {
						var str = "";
						$("input[name='rd_age']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "연령은 필수입니다.");
							return false;
						}
					}
					
					// 가구유형
					if($("#householdAtag").hasClass("on")) {
						var str = "";
						$("input[name='household_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "세대구성은 필수입니다.");
							return false;
						}
					}
					
					//점유형태
					if($("#occupyTypeAtag").hasClass("on")) {
						var str = "";
						$("input[name='ocptn_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "점유형태는 필수입니다.");
							return false;
						}
					}
					
					//거주주택, 노후주택이 선택되어 있을 경우
					if($("#houseTypeAtag").hasClass("on") || $("#oldHouseAtag").hasClass("on") ) {
						var str = "";
						$("input[name='house_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "거주주택 유형은 필수입니다.");
							return false;
						}
					}
				}
				
				//창업지역검색
				else if (curSelectedStatsType == "jobChange") {
					var str = "";
					$(".jobArea_stepBox input").each(function() {
						if($(this).attr("checked") == "checked") {
							str = "check";
						}
					});
					if(str == "") {
						messageAlert.open("알림", "생활업종을 선택하세요.");
						return false;
					}
				}
					
				return true;
			},
			
			/**
			 * 
			 * @name         : areaSearchCondition
			 * @description  : 창업지역 찾기 선택
			 * @date         : 2015. 11. 04.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type : 선택된 통계정보 타입
			 */
			areaSearchCondition : function(type) {
				if($("#"+type+"Atag").hasClass("on")) {
					$("#"+type+"Div").show();
					//직장인구일 경우 거주인구, 성별, 연령별 해제
					if(type == "jobPeople") {
						$("#stayPeopleAtag").removeClass("on");
						$("#genderPeopleAtag").removeClass("on");
						$("#agePeopleAtag").removeClass("on");
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						
					//거주인구, 성별, 연령별일 경우 직장인구 해제
					} else if(type == "stayPeople" || type == "genderPeople" || type == "agePeople") {
						$("#jobPeopleAtag").removeClass("on");
						$("#jobPeopleDiv").hide();
					}
				} else {
					$("#"+type+"Div").hide();
				}
				
				//사업체수, 사업체증감이 선택되어 있을경우
				if($("#companyCountAtag").hasClass("on") || $("#companyIncreaseAtag").hasClass("on")) {
					$("#companyTabDiv").show();		//사업체 업종 선택 필수
				} else {
					$("#companyTabDiv").hide();
				}
					
				//거주주택, 노후주택이 선택되어 있을 경우
				if($("#houseTypeAtag").hasClass("on") || $("#oldHouseAtag").hasClass("on") ) {
					$("#houseLivingTypeDiv").show();		//사업체 업종 선택 필수
				} else {
					$("#houseLivingTypeDiv").hide();
				}
				
				//3Depth 열기
				this.viewThreeDepth();
			},
			
			/**
			 * 
			 * @name         : viewThreeDepth
			 * @description  : 3Depth 메뉴를 show
			 * @date         : 2015. 11. 03. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			viewThreeDepth : function() {
				//메뉴버튼
				$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
				$("#areaSearchDetailDiv").stop().animate({"left":"560px"},200);
			},
			
			/**
			 * 
			 * @name         : commonDataList
			 * @description  : 공공데이터, 나의데이터 목록 가져오기
			 * @date         : 2015. 12. 09. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			commonDataList : function() {
				//2017.12.12 [개발팀] 접근성 조치 - 불필요한파일
				//$publicDataBoard.ui.leftMenuList($technicalBizMap.ui);		//공공데이터 목록
				//$mydataDataBoard.ui.delegateSetting($technicalBizMap.ui);			//나의데이터 세팅
				//$publicDataBoard.ui.delegateSetting($technicalBizMap.ui);				//공공데이터 세팅
			},
			
			/**
			 * 
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function() {
				$technicalBizMap.ui.doMaxSize();
			},
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function() {
				$technicalBizMap.ui.doAddMap();
			},
			
			/**
			 * 
			 * @name         : doCombineMap
			 * @description  : 범례결합창을 표출한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCombineMap : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId) + 1;
				$technicalBizMap.ui.doCombineMap(mapId);
			},
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId) + 1;
				$technicalBizMap.ui.doBookMark(mapId);
			},
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShare : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId) + 1;
				$technicalBizMap.ui.doShare(mapId);
			},
			
			/**
			 * 
			 * @name         : doReport
			 * @description  : 보고서를 생성한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReport : function() {
				var mapId = parseInt($technicalBizMap.ui.curMapId) + 1;
				$technicalBizMap.ui.reportDataSet(mapId);
			},
			
			/**
			 * 
			 * @name         : doHelp
			 * @description  : 도움말 페이지로 링크한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doHelp : function() {
				messageAlert.open("알림", "준비중입니다.");
			},
			
			/**
			 * 
			 * @name         : showNumberClick
			 * @description  : 통계값 표출유무 버튼 클릭 시
			 * @date         : 2016. 01. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberClick : function() {
				var map_id = $technicalBizMap.ui.curMapId;
				var legend = $technicalBizMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우 off로 변경
				if(legend.numberData) {
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				} else {	//통계표출 off일 경우 on으로 변경
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				}
				//통계값 표출유무 설정 호출
				legend.showNumberData();
			},
			
			/**
			 * 
			 * @name         : showNumberSetting
			 * @description  : 통계값 표출유무 연동 (범례에서 선택 시, 지도 선택 시)
			 * @date         : 2016. 01. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberSetting : function() {
				var map_id = $technicalBizMap.ui.curMapId;
				var legend = $technicalBizMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우
				if(legend.numberData) {
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				} else {	//통계표출 off일 경우
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				}
			},
			
			/**
			 * 
			 * @name         : doReqDensityInfo
			 * @description  : 기술업종 밀집도변화를 조회한다.
			 * @date         : 2016. 120. 27. 
			 * @author	     : 김성현
			 * @param 		 : 
			 * @history 	 :
			 */
			doReqDensityInfo : function(themeCd, themeNm, viewId) {
				//데이터보드 조회조건이 undefined일 경우 초기화
				var dataBoard = $technicalBizDataBoard.ui;
				if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
					dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
				}
				dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
				//$technicalBizMap.ui.doReqCompanyDensity(themeCd, themeNm);
				$technicalBizMap.ui.setTitle("업종밀집도 변화 > "+themeNm, viewId);
				$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
				
				var adm_nm = "전국";
				var adm_cd = null;
				if ($technicalBizMap.ui.isLocalGov) {
					adm_nm = "경기도 성남시";
					adm_cd = "31020";
				}
				
				//최초조회 시 전국정보 팝업
				var options = {
						params : {
							adm_cd : adm_cd,
							adm_nm : adm_nm,
							map : $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId],
							year : companyDataYear
						},
						dataBoard : {
							jobAreaThemeCd : $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
							themeCd : themeCd,
							themeNm : themeNm
						},
						etc : {
							themeCd : $technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
							curPolygonCode : $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId].curPolygonCode,
							year : companyDataYear,
						}
				}
				$technicalBizDataBoard.ui.updateDataBoard(options, "density");
			}
	};
	
	$technicalBizLeftMenu.Util = {
			/**
			 * 
			 * @name         : sliderSmallAvgBig
			 * @description  : 적은지역, 평균지역, 많은지역
			 * @date         : 2015. 12. 08. 
			 * @author	     : 김성현
			 * @param 		: type	1:적은지역, 2:평균지역, 3:많은지역
			 * @history 	 :
			 */
			sliderSmallAvgBig : function(type) {
				var returnStr = "";
				if(type == "1") {
					returnStr = "적은지역";
				} else if(type == "2") {
					returnStr = "평균지역";
				} else if(type == "3") {
					returnStr = "많은지역";
				}
				return returnStr;
			},
	
			/**
			 * 
			 * @name         : sliderLowAvgHigh
			 * @description  : 낮은지역, 평균지역, 높은지역
			 * @date         : 2015. 12. 09. 
			 * @author	     : 김성현
			 * @param 		: type	1:낮은지역, 2:평균지역, 3:높은지역
			 * @history 	 :
			 */
			sliderLowAvgHigh : function(type) {
				var returnStr = "";
				if(type == "1") {
					returnStr = "낮은지역";
				} else if(type == "2") {
					returnStr = "평균지역";
				} else if(type == "3") {
					returnStr = "높은지역";
				}
				return returnStr;
			}
	};

	$technicalBizLeftMenu.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : Left 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 06. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				//슬라이드 세팅
				this.slideValue(".sliderDefault");
				
		    	//스크롤 생성
				$(".searchAreaBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
		    	$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
		    	$(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({axis:"xy"});
		    	$(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({
		        	axis:"xy",
		        	callbacks: {
		        		whileScrolling:function() {
		        			//3Detph 가 안보이는 버그 해결책
		        			if($(".quickBox.step03").find(".mCSB_container").position() != undefined) {
		        				if($(".quickBox.step03").find(".mCSB_container").position().left >= 1000) {
		        					$(".quickBox.step03").find(".mCSB_container").css("left", "0px");
			    				}	
		        			}
		        		}
		        	}
		        });
		        
		        //조건설정 항목 선택하기 클릭 시
		        body.on("click", ".wonList01 li:not(.disabled) a", function(){    
		    		var ck = $(this).hasClass("on");
		    		if(!ck){
		    			$(this).addClass("on");
		    		}else{
		    			$(this).removeClass("on");
		    		}
		    	});
				
				//통계메뉴 클릭 시
				body.on("click", ".sideQuick.sq02", function(){ 
					var on = $(this).hasClass("on");
					if(!on){
						$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
						$(".quickBox.step01").stop().animate({"left":"0"},200);
						//$(".shadow").show(); 
						$(this).find("span").hide();
						$(this).addClass("on").css("width","40px");
						$(this).find("img").css("padding-top", "4px");
					}else{ 
						$technicalBizLeftMenu.event.stepCloseAnimate(1, "pass"); 
						$(this).find("span").show();
						$(this).removeClass("on").css("width","90px");
						 $(".quickBox.step02").removeClass("join");
						 $(this).find("img").css("padding-top", "");
					} 
				}); 
				
				//선택항목 클릭 시
				body.on("click",".sideQuick.sq03", function(){
					var on = $(this).hasClass("on");
					if(!on){
						$(this).next(".sqListBox").stop().animate({"left":"0px"},200);
						$(this).addClass("on");
					}else{
						$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
						$(this).removeClass("on");
					}
				}); 
				
				//닫기 버튼 클릭 시
				body.on("click",".stepClose",function(){ 
					$technicalBizLeftMenu.event.stepCloseAnimate(parseInt($(this).index(".stepClose")+1), "pass"); 
			    }); 
				
				//조건 상세설정 열고 닫기
				body.on("click","a.roundTextBox",function(){
					var ck = $(this).hasClass("on"); 
					if(!ck){
						$(this).addClass("on");
						$(this).children("input").prop("checked", true);
						$(this).next(".joinDefault").show();
					}else{
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide(); 
					} 
			    });
				
				//업종별 지역현황 - 생활업종 선택하기
				body.on("click",".quickBox.step02 .radioType label",function(){
					$(".quickBox.step02 .radioType label").removeClass("on");
					$(".quickBox.step02 .radioType input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					
					// 시군구 기술업종 현황일 때
					if($technicalBizLeftMenu.ui.curSelectedStatsType == "sigungu") {
						var dataBoard = $technicalBizDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var themeNm = $(this).text();
						//2017.09.13 개발팀 추가
						$technicalBizLeftMenu.ui.curSelectSggThemeCd = themeCd;
						$technicalBizLeftMenu.ui.curSelectSggThemeNm = themeNm;
						//2017.09.13 개발팀 추가 종료
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						$technicalBizMap.ui.setTitle("시군구 기술업종 현황 > "+themeNm, viewId);
						
						var type = "0";
						$("#standardButton").removeClass("off");
						$technicalBizMap.ui.doReqSidoCompany(themeCd, themeNm, type);
						$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
					}
					// 업종밀집도일 때
					else if ($technicalBizLeftMenu.ui.curSelectedStatsType == "density") {
						var mapId = parseInt($technicalBizMap.ui.curMapId);
						var map = $technicalBizMap.ui.mapList[mapId];
						
						//지자체-성남시
						if (!$technicalBizMap.ui.isLocalGov) {
							map.mapMove([1007770, 1855549], 2);
						}
						
						$(".quickBox.step03 .radioType label").removeClass("on");
						$(".quickBox.step03 .radioType input").removeAttr("checked");
						
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						var techCdList = ["11", "12", "13", "14", "21", "22", "23"];
						
						for (var i=0; i<techCdList.length; i++) {
							var tmpThemeCd = techCdList[i];
							if (themeCd == tmpThemeCd) {
								$("#densityMenu3Depth_"+themeCd).show();
							}else {
								$("#densityMenu3Depth_"+tmpThemeCd).hide();
							}
						}
						
						//기술업종 전체현황 조회
						if (themeCd == "00") {
							var themeNm = "전체 기술업종";
							$technicalBizLeftMenu.ui.doReqDensityInfo(themeCd, themeNm);
							return;
						}
						
						$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
						$(".quickBox.step03").stop().animate({"left":"560px"},200);
						$("#densityBaseYearList > li > a").removeClass("on");
						$("#densityBaseYearList > li > a").last().addClass("on");
					}
					//업종별 입지계수 지도 일때
					else if($technicalBizLeftMenu.ui.curSelectedStatsType == "lq"){
						//2017.10.13 개발팀 추가
						
						var mapId = parseInt($technicalBizMap.ui.curMapId);
						var map = $technicalBizMap.ui.mapList[mapId];
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var themeNm = $(this).text();
						
						var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
						
						$technicalBizMap.ui.setTitle("업종별 입지계수 > "+themeNm, viewId);
						//$technicalBizMap.ui.doReqSidoCompany(themeCd, themeNm, "0");
						//type 0 일경우 시도 전체 1 일경우 해당 시군구
						
						//$technicalBizDataBoardApi.request.getInnerTechCd(themeCd,"subTechnicalList");
						
						//changeLqInfo
						/*$technicalBizDataBoard.ui.changeLqInfo(themeCd);*/
						$("#technicalDbTabs > a").removeClass("on");
						$("#lqInfoYearSettingList > li > a").removeClass("on");
						$("#lqInfoYearSettingList > li > a").last().addClass("on");
						$("#standardButton").removeClass("off");

						$technicalBizMap.ui.doReqAllLq(themeCd, themeNm, "0", "country","company");
						$("#technicalDbTab_"+themeCd).addClass("on")
						$technicalBizDataBoardApi.request.getInnerTechCd(themeCd,"subTechnicalList");
						$("#lqIncreaseTab").hide();
						$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
						
						//2017.10.13 개발팀 추가 종료
					}
			    });
				
				//위치중심 공공데이터 선택
				body.on("click",".publicData_stepBox label",function(){
					$(".publicData_stepBox label").removeClass("on");
					$(".publicData_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$technicalBizLeftMenu.event.stepCloseAnimate(1, "check");
					
					//조회 실행
					var type = $(this).prev().val();
					//$publicDataBoard.ui.updatePublicData(type); //2017.12.12 [개발팀] 접근성 
			    });
				
				//단일 라디오버튼 선택 (li 안에 input 여러개)
				body.on("click",".radioStepBox label",function(){
					var ck = $(this).hasClass("on");
					
					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
					var elParent = $(this).parent().parent();
					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
						if (ck) {
							return;
						}
					}
					
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//단일 라디오버튼 선택 (li 안에 input 한개, 두개)
				body.on("click",".radioStepOneBox label",function(){
					var ck = $(this).hasClass("on");
					
					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
					var elParent = $(this).parent().parent();
					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
						if (ck) {
							return;
						}
					}
					
					$(this).parent().parent().find("label").removeClass("on");
					$(this).parent().parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//다중 라디오버튼 선택
				body.on("click",".multiCheckBox label",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					
					//2016.03.21 수정, 다중선택에서 최소 하나는 disable되지 않도록 변경
					if ($(".multiCheckBox .on").length == 0) {
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}
					
			    });
				
				//하단 패밀리사이트
				body.on("click","#bottomService",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$("#bottomServiceLayer").show();
					}else{
						$(this).removeClass("on");
						$("#bottomServiceLayer").hide();
					}
				});
				
				//통계메뉴바 자동 닫기
				body.on("click",".menuAutoClose label",function(){
					var ck = $(this).hasClass("on");
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//업종밀집도 변화 3단계 메뉴 선택 이벤트
				body.on("click",".quickBox.step03 .radioType label",function(e){
					var ck = $(this).hasClass("on"); 
					$(this).parents(".radioType").eq(0).find("label").removeClass("on");
					$(this).parents(".radioType").eq(0).find("input").prop("checked", false); 
					$(this).addClass("on");
					$(this).prev("input").eq(0).prop("checked", true); 
					
					var dataBoard = $technicalBizDataBoard.ui;
					var id = $(this).attr("for");
					var themeCd = $("#"+id).val();
					var themeNm = $(this).text();
					var viewId = parseInt($technicalBizMap.ui.curMapId)+1;
					$technicalBizLeftMenu.ui.doReqDensityInfo(themeCd, themeNm, viewId);
			    });
				
				//========== 2017.12.21 [개발팀] 접근성 시정조치 START =============//
				body.on("focus",".quickBox a",function(e){
					$(".quickBox li").each(function(idx) {
						$(".quickBox li").eq(idx).removeClass("on");
					});
					$(this).parent().addClass("on");
					
				});
				
				body.on("keydown", ".quickBox.step02 .radioType label, .interactiveBar a",function(e) {
					if (e.keyCode == 13) {
						$(this).trigger("click");
					}
				});
				
				body.on("focus", ".roundTextBox, .radioType label", function() {
					$(".radioType label").each(function(idx) {
						$(".radioType label").eq(idx).css("opacity", "1");
					});
					$(this).css({
						"outline" : "none",
						"opacity" : "0.7"
					});
				});
				
				body.on("focus", ".containerBox", function() {
					$(".ulDiv").trigger("mouseout");
				});
				//========== 2017.12.21 [개발팀] 접근성 시정조치 END =============//
			},
			
			/**
			 * 
			 * @name         : stepCloseAnimate
			 * @description  : 왼쪽 메뉴 닫기 애니메이션.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 김성현
			 * @param : inx, type (check : 통계메뉴바 자동닫기 체크,		 pass : 강제 닫기) 
			 * @history 	 :
			 */
			stepCloseAnimate : function(inx, type){  
				if(type == "check") {
					//통계메뉴바 자동 닫기 선택이 안되어 있을 경우
					if (!$(".menuAutoClose label").hasClass("on")) {
						return;
					}
					
					
				}
			    var time = 300;
			    var fx = '.quickBox';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
			    var btn = '.sideQuick.sq02';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
			    $(fx).queue("step04", function(){ 
			    	$(btn).stop().animate({"left":"840px"},time);
			        /*$(fx+'.step04').animate({"left":"-280px"}, time);*/
			    	$(fx+'.step04').animate({"left":"-560px"}, time);
			    }); 
			    $(fx).queue("step03", function(){
			        /*$(fx+'.step04').css({"left":"-280px"});*/
			    	$(fx+'.step04').css({"left":"-560px"});
			        $(btn).stop().animate({"left":"560px"},time);
			        $(fx+'.step03').animate({"left":"-280px"}, time);    
			    }); 
			    $(fx).queue("step02", function(){
			        /*$(fx+'.step04, '+fx+'.step03').css({"left":"-280px"});*/
			    	$(fx+'.step03').css({"left":"-280px"});
			    	$(fx+'.step04').css({"left":"-560px"});
			    	
			        $(btn).stop().animate({"left":"280px"},time);
			        $(fx+'.step02').animate({"left":"-280px"}, time);
			        $(".quickBox.step02").removeClass("join");
			    }); 
			    $(fx).queue("step01", function(){
			        /*$(fx+'.step04, '+fx+'.step03, '+fx+'.step02').css({"left":"-280px"});*/
			    	$(fx+'.step03, '+fx+'.step02').css({"left":"-280px"});
			    	$(fx+'.step04').css({"left":"-560px"});
			    	
			        $(btn).stop().animate({"left":"0"},time).removeClass("on");
			        $(fx+'.step02').animate({"left":"-1120px"}, time);
			        $(fx+'.step01').animate({"left":"-280px"}, time);
			        $(btn).find("span").show();
			        $(btn).css("width","90px");
			        $(".shadow").hide();
			    }); 
			    $(fx).dequeue("step0"+inx); 
			},
			
			/**
			 * 
			 * @name         : slideValue
			 * @description  : 슬라이드 바 컨트롤.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			slideValue : function(selector) { 
			    $(selector).slider({ 
			        min: 1,
			        max: 3
			    });
			    $(selector).slider("value", 2);
			},
			
			/**
			 * 
			 * @description  : 통계버튼 그라데이션 효과.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			dragAppend : function(selector, bgColor) {
				$(selector).css("background-color", bgColor);
				$(selector).addClass("M_on");
			},
			
			dragAnimate : function(btn_id, bgColor) {
				var selector = $("#"+btn_id);
				this.dragAppend(selector, bgColor);
			},
			
			toggle:function(o){
				var ck = $(o).hasClass("on");
				if(ck){
					$(o).removeClass("on");
					$(o).next("ul").hide();
				}else{
					$(o).addClass("on");	
					$(o).next("ul").show();
				}
			},
			
			toggle01:function(o){
				var ck = $(o).hasClass("on");
				if(ck){
					$(o).removeClass("on");
					$(o).next("div").hide();
				}else{
					$(o).addClass("on");	
					$(o).next("div").show();
				}
			}
	};
	
}(window, document));