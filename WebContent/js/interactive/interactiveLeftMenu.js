/**
 * 대화형 통계지도 Left 메뉴(조회조건)에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/08  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$interactiveLeftMenu = W.$interactiveLeftMenu || {};
	
	$(document).ready(function() {
		$interactiveLeftMenu.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$interactiveLeftMenu.ui.bndYearSelectbox();		//조사년도 설정
		$interactiveLeftMenu.ui.commonDataList();		//공공데이터, 나의데이터 목록
		//$(".sideQuick.sq02").click();	//Left 메뉴 오픈
		
		
		//mng_s leekh 20171018 주요지표
		if(parseInt($("#mainIndex_year").val()) == 2016){
			$("#mainIndex_box2").hide();
		}
		//mng_e leekh 20171018 주요지표

		
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
		
		
			$("[name='mainIndex_radio']").on('click',(function(e){ 

				//$("#mainIndex_year").val()
				
				//mng_s 20180109 leekh 년도 초기화 방지
				var tempVal = $("#mainIndex_year").val();
				
				if($(this).attr("id") == "mainIndex_radio12" || $(this).attr("id") == "mainIndex_radio13"){
					$("#mainIndex_year option[value='2000']").remove();
				}else{
					$("#mainIndex_year option[value='2000']").remove();
					$("#mainIndex_year").append("<option value='2000'>2000년도</option>");
				}
				$("#mainIndex_year").val(tempVal);
				
				//mng_e 20180109 leekh 년도 초기화 방지

			}));
		
	});
	
	$interactiveLeftMenu.ui = {
			searchbtnCnt : 0, // 버튼생성 카운트
			curSelectedStatsType : "population", // 현재 선택된 통계분류(인구, 가구, 사업체통계 등)
			curSelectedDetailStatsType : null, // 현재 선택된 통계상세분류(인구총괄, 인구세부조건검색 등)
			arParamList : [], // 생성된 조회버튼에 매칭된 파라미터 정보배열 ==> maxYear(기준년도) 변경시 DB에서 srv_dt_statbaseyearinfo 년도+1 해주어야함(테이블은 srv_dt_statbaseyearinfo)
			mapColor : ["#0478cb", "#9ED563", "#FF0066"],		//지도 별 고유 색상
			curSearchBtnArray : { "one":"", "two":"", "three":"" },	//지도를 조회한 버튼 아이디
			companyTree : null,						//산업분류 트리
			curSelectedCompanyNode : null,		//산업분류 트리 선택된 노드
			curSelectedThemeNode : null,			//테마업종 트리 선택된 노드
			corpClassNum : 0,		//산업분류 현재 페이지
			sqlListBoxLeft: "0px",	//
			
			isInnerMapShow2: false, //mng_s 그리드 메뉴일 경우 레프트메뉴 하이드시 사용
			isInnerMapShow3: false, //mng_s 행정구역 그리드 메뉴일 경우 레프트메뉴 하이드시 사용
			
			/**
			 * 
			 * @name         : addSearchBtn
			 * @description  : 조건검색버튼을 생성한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			addSearchBtn : function() {
				//조회버튼은 최대 10개만 가능
				if(this.btnLimitCnt()) {
					//KOSIS일 경우
					if (this.curSelectedStatsType == "kosis") {
						if(interactiveMapKosis.curSelectNodeCheck == false) {
							messageAlert.open("알림", "항목을 선택하여 주세요.");
							return false;
						} else {
							interactiveMapKosis.checkSubMenu(interactiveMapKosis.curSelectNode);
						}
					}
					
					//일반 버튼일 경우 파라미터 유효성 검사
					else if(this.btnValidationCheck(this.curSelectedStatsType, this.curSelectedDetailStatsType)) {
						var api_id = this.setParams(this.curSelectedStatsType, this.curSelectedDetailStatsType); // 선택된 패널의 파라미터 세팅
						this.createSearchBtn(api_id, "0"); // 버튼생성
						this.searchbtnCnt++;
						$interactiveMapApi.request.openApiStatBaseYearProcess();	//통계별 최신년도 가져오기
						$interactiveLeftMenu.event.stepCloseAnimate(1, "check");	
					}
				}
			},
			
			/**
			 * 
			 * @name         : btnLimitCnt
			 * @description  : 버튼갯수 
			 * @date         : 2015. 10. 23. 
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
			 * @date         : 2015. 10. 01. 
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
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 * @params atdrc_yn : 자치구여부(kosis만 해당)
			 */
			createSearchBtn : function(curSelectedStatsType, atdrc_yn) {
				// 버튼타이틀생성
				var btnTitle = null;
				var unit = null;
				var showData = null;
				var year = null; //9월 서비스
				
				//통계버튼 보이기
				var sq03 = $(".sideQuick.sq03");
				if(!sq03.hasClass("on")){
					$(".sideQuick.sq03").click();
				}else{
					//2017.07.07 추가
					$(".sideQuick.sq03").removeClass("on");
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
						//9월 서비스
						for(var j=0; j<this.arParamList[i].params.length; j++) {
							var key = this.arParamList[i].params[j].key;
							if (key == "year") {
								year = this.arParamList[i].params[j].value;
								break;
							}
						}
						unit = this.arParamList[i].unit;
						showData = this.arParamList[i].filterParam;
						this.arParamList[i]["title"] = btnTitle;
						this.arParamList[i]["year"] = year;
						break;
					}
				}
				
				//사업체 apiid 분기
				var curSelectedDetailStatsType = curSelectedStatsType.substring(0,8);
				var tmpTitle = "";
				
				//KOSIS일 경우
				if(curSelectedStatsType == "kosis") {
					tmpTitle = interactiveMapKosis.curSelectedTitle;
					for (var i = 0; i < this.arParamList.length; i++) {
						if (this.arParamList[i].idx == this.searchbtnCnt) {
							this.arParamList[i]["title"] = tmpTitle;
							break;
						}
					}
					//세부조건설정 버튼 제목
					//$("#kosisTitle").text(tmpTitle);
				} else {	//일반 버튼일 경우
					//9월 서비스
					if (year != null) {
						tmpTitle = btnTitle + " ("+ unit +")" + "-"+year+"년";
					}else {
						tmpTitle = btnTitle + " ("+ unit +")";
					}
				}
				
				//버튼생성
				var html = "<li class='dragItem' id='dragItem_"+this.searchbtnCnt+"'>" +
								"<a href='javascript:void(0)' id='"+curSelectedDetailStatsType + "-" + this.searchbtnCnt+"' class='ellipsis drag on' title='"+tmpTitle+"'>" +
									"<div class='text'>"+tmpTitle+"</div>" +
									"<div class='atdrc_yn' style='display:none;'>"+atdrc_yn+"</div>"+
								"</a>" +
								"<a href='javascript:$interactiveLeftMenu.ui.deleteSearchBtn("+this.searchbtnCnt+");' class='sqdel'><img src='/img/um/btn_closel01.png' alt='삭제' /></a>" +
						   "</li>";
				$("#searchBtnResultRgn ul").prepend(html);
				
				 //툴팁
//				$("#"+curSelectedDetailStatsType + "-" + this.searchbtnCnt).tooltip({
//					position : {my: "left+10 top-40"},
//					track: true
//				});
				
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
					},
					helper : function() {	//드래그시 폰트 색상 변경
						var cloneElem = $(this).clone();	//버튼 클론
						var btnId = $(cloneElem).find("a").attr("id");	//버튼 아이디
						//아직 조회가 안된 버튼은 검정글씨
						if($interactiveLeftMenu.ui.curSearchBtnArray["one"] != btnId &&
							$interactiveLeftMenu.ui.curSearchBtnArray["two"] != btnId &&
							$interactiveLeftMenu.ui.curSearchBtnArray["three"] != btnId) {
							$(cloneElem).find("a > div:eq(0)").css("color", "#000");
						} else {	//조회가 된 버튼은 흰글씨
							$(cloneElem).find("a > div:eq(0)").css("color", "#fff");
						}
						return cloneElem;
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
			 * @date         : 2015. 10. 14.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			searchModeSetting : function() {
				
				console.log("[interactiveLeftMenu.js] searchModeSetting 호출");
				
				//mng_s
				if($interactiveLeftMenu.ui.isInnerMapShow2!=undefined && $interactiveLeftMenu.ui.isInnerMapShow2) {
					$(".dragItem").draggable( "disable" );	//드랍 차단
					//$("#sqlListBox").draggable( "disable" ); //선택항목 패널 고정시 사용
				} else {
					$(".dragItem").draggable( "enable" );	//드랍 허용
				}
				
				//$(".dragItem").draggable( "enable" );	//드랍 허용 //mng_s
				$(".ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled").css({"opacity":1});	//disabled일때 흐려짐현상 없앰
				//더블클릭 이벤트
				// 2016. 04. 01 j.h.Seok
				$(".dragItem").off("dblclick").dblclick(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var index = id.split("-")[1];
					var tmpParam = "";
					for(var i = 0; i < $interactiveLeftMenu.ui.arParamList.length; i ++) {
						if($interactiveLeftMenu.ui.arParamList[i].idx == index) {
							tmpParam = $interactiveLeftMenu.ui.arParamList[i];
						}
					}
					// 더블클릭 시, 콜백 호출
					$interactiveMap.callbackFunc.didMapDoubleClick(id, tmpParam);
				});
				
				this.updateSearchBtnEffect(this.curSearchBtnArray["one"], 0);
				this.updateSearchBtnEffect(this.curSearchBtnArray["two"], 1);
				this.updateSearchBtnEffect(this.curSearchBtnArray["three"], 2);
			},
			
			/**
			 * 
			 * @name         : updateSearchBtnEffect
			 * @description  : 해당 조건버튼의 색상 및 깜빡임 효과. 
			 * @date         : 2015. 10. 14.
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
					$interactiveLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], this.mapColor[0]);
				}
				if(this.curSearchBtnArray["two"] != "") {
					$interactiveLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], this.mapColor[1]);
				}
				if(this.curSearchBtnArray["three"] != "") {
					$interactiveLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], this.mapColor[2]);
				}
				
				//분할 화면에 같은 버튼을 조회했을 경우
				if(this.curSearchBtnArray["one"] != "" && (this.curSearchBtnArray["one"] == this.curSearchBtnArray["two"])) {
					$interactiveLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], "#394955");
				}
				if(this.curSearchBtnArray["two"] != "" && (this.curSearchBtnArray["two"] == this.curSearchBtnArray["three"])) {
					$interactiveLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], "#394955");
				}
				if(this.curSearchBtnArray["three"] != "" && (this.curSearchBtnArray["three"] == this.curSearchBtnArray["one"])) {
					$interactiveLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], "#394955");
				}
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정한다. 
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 * @param api_id : 선택된 통계정보의 API ID(element id)
			 */
			setParams : function(curSelectedStatsType, api_id) {
				var tmpArParams = new Array();
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				var filterParam = null;
				var unit = null;
				var filterName = null;
				
				// 주요지표 목록보기
				if (curSelectedStatsType == "mainIndex") {
					if (api_id == "API_0301") {
						var fullName = null;
						var tmpNames = [];
						
						filterParam = $("#"+api_id).find(".dbTypeCk label.on").prev("input").val();
						fullName = $("#"+api_id).find(".dbTypeCk label.on").text();
						
						if($("#"+api_id).find(".dbTypeCk label.on").text().indexOf("(") > -1) {
							var lastLen = fullName.indexOf("(");
							fullName = fullName.substring(0, lastLen);
						}
						tmpNames.push($.trim(fullName));
						
						//단위설정
						if(filterParam == "tot_ppltn" ||
							filterParam == "avg_fmember_cnt" ||
							filterParam == "nongga_ppltn" ||
							filterParam == "imga_ppltn" ||
							filterParam == "naesuoga_ppltn" ||
							filterParam == "haesuoga_ppltn") {
							unit = "명";
						}
						else if(filterParam == "avg_age") {
							unit = "세";
						}
						else if(filterParam == "ppltn_dnsty") {
							unit = "명/㎢";
						}
						else if(filterParam == "aged_child_idx" ||
								filterParam == "oldage_suprt_per" ||
								filterParam == "juv_suprt_per") {
							unit = "일백명당 명";
						}
						else if(filterParam == "tot_family" ||
								filterParam == "nongga_cnt" ||
								filterParam == "imga_cnt" ||
								filterParam ==  "naesuoga_cnt" ||
								filterParam ==  "haesuoga_cnt") {
							unit = "가구";
						}
						else if(filterParam == "tot_house") {
							unit = "호";
						}
						else if(filterParam == "corp_cnt") {
							unit = "개";
						}
							
						if (tmpNames.length > 0) {
							tmpArParamName.push(tmpNames.join());
						}
						
						//사업체 주요지표
						if(filterParam == "corp_cnt") {
							tmpArParams.push({
								key : "year",
								value : $("#mainIndex_corp_year").val()
							});	
						} else {	//나머지 주요지표
							tmpArParams.push({
								key : "year",
								value : $("#mainIndex_year").val()
							});
						}
					}
				}
				
				// 인구주택총조사
				else if (curSelectedStatsType == "populationHouse") {
					//인구조건
					if (api_id == "API_0302") {
						filterParam = "population";
						unit = "명";
						
						var gender = $("input[name='population_gender']:checked");
						var ageFrom = $("#populationAgeFrom");
						var ageTo = $("#populationAgeTo");
						var eduLevel = $("#populationEduLevel option:selected");
						
						//9월서비스 권차욱 수정
						// 연령별인구
						if($("#populationAgeTab").hasClass("on")) {
							var tmpAgeTo = parseInt(ageTo.val())-1;
							var tmpAgeFrom = ageFrom.val();
							var tmpAgeToText = tmpAgeTo + "세";

							if (parseInt(ageFrom.val()) >= 100) {
								tmpAgeFrom = "100";
							}
							if (parseInt(ageTo.val()) >= 101) {
								tmpAgeTo = "150";
								tmpAgeToText = ageTo.val() + "세 이상";
								tmpArParamName.push(tmpAgeFrom + "세 이상");
							}else {
								tmpArParamName.push(tmpAgeFrom + "세~" + tmpAgeToText);
							}
							
							tmpArParams.push({
								key : "age_from",
								value : tmpAgeFrom
							});
							tmpArParams.push({
								key : "age_to",
								value : tmpAgeTo
							});
						}
						
						//2016.08.30 권차욱 9월 서비스
						var tmpYear = parseInt($("#population_year").val());
						if (tmpYear <= 2010) {
							// 교육정도별인구
							if($("#populationEduTab").hasClass("on")) {
								/*var name = eduLevel.text();
								//교육정도
								tmpArParams.push({
									key : "edu_level",
									value : eduLevel.val()
								});
								tmpArParamName.push(name);*/
								var edulevel = [];
								var tmpNames = [];
								$("input[name='edulevel_1']").each(function() {
									if($(this).attr("checked") == "checked") {
										edulevel.push($(this).val());
										tmpNames.push($(this).next().text());
									}
								});
								
								if (edulevel.length > 0) {
									tmpArParams.push({
										key : "edu_level",
										value : edulevel.join(",")
									});
									tmpArParamName.push(tmpNames.join(","));
								}
							}
							
							// 혼인상태별인구
							if($("#populationMarryTab").hasClass("on")) {
								var mrgState = [];
								var tmpNames = [];
								$("input[name='mrg_state_1']").each(function() {
									if($(this).attr("checked") == "checked") {
										mrgState.push($(this).val());
										tmpNames.push($(this).next().text());
									}
								});
								
								if (mrgState.length > 0) {
									tmpArParams.push({
										key : "mrg_state",
										value : mrgState.join(",")
									});
									tmpArParamName.push(tmpNames.join(","));
								}
							}
						}
												
						var gValue = "0";
						if (gender.val() == "0") {
							gValue = "0";
							tmpArParamName.push("남여인구");
						}else {
							gValue = gender.val();
							tmpArParamName.push($.trim(gender.next().text()));
						}
						
						tmpArParams.push({
							key : "gender",
							value : gValue
						});
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "year",
							value : $("#population_year").val()
						});
					}
					
					//가구조건
					else if (api_id == "API_0305") {
						filterParam = "household_cnt";
						unit = "가구";
						
						// 세대구성
						if($("#householdTypeTab").hasClass("on")) {
							var householdType = [];
							var tmpNames = [];
							$("input[name='household_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									householdType.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});
							
							if (householdType.length > 0) {
								tmpArParams.push({
									key : "household_type",
									value : householdType.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}
						
						//2016.08.30 권차욱 9월 서비스
						var tmpYear = parseInt($("#household_year").val());
						if (tmpYear <= 2010) {
							// 점유형태별가구
							if($("#householdOcptnTab").hasClass("on")) {
								var ocptnType = [];
								var tmpNames = [];
								$("input[name='ocptn_type']").each(function() {
									if($(this).attr("checked") == "checked") {
										ocptnType.push($(this).val());
										tmpNames.push($(this).next().text());
									}
								});
								
								if (ocptnType.length > 0) {
									tmpArParams.push({
										key : "ocptn_type",
										value : ocptnType.join(",")
									});
									tmpArParamName.push(tmpNames.join(","));
								}
							}
						}
						
						//아무 조건도 선택 안했을 경우
						if(tmpArParamName.length == 0) {
							tmpArParamName.push("총가구");
							tmpArNoneParams.push({"noneParam" : true});
						}

						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "year",
							value : $("#household_year").val()
						});
					}
					
					//주택조건
					else if (api_id == "API_0306") {
						filterParam = "house_cnt";
						unit = "호";
						
						var houseConstYear = $("#houseConstYear option:selected");
						
						//2016.08.30 권차욱 9월 서비스 - 주석처리
						//var houseBdspaceFrom = $("#houseBdspaceFrom option:selected");
						//var houseBdspaceTo = $("#houseBdspaceTo option:selected");
						
						//2016.08.30 권차욱 9월 서비스
						var houseUsePeriod = $("#houseUsePeriod option:selected");
						var houseAreaCd = $("#house_area_cd option:selected");
						
						// 주택유형
						if($("#houseTypeTab").hasClass("on")) {
							var houseType = [];
							var tmpNames = [];
							$("input[name='house_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									houseType.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});
							
							if (houseType.length > 0) {
								tmpArParams.push({
									key : "house_type",
									value : houseType.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}
						
						//2016.08.30 권차욱 9월 서비스
						var tmpYear = parseInt($("#house_year").val());
						if (tmpYear > 2010) {
							//건축기간
							if($("#houseUsePeriodTab").hasClass("on")) {
								var name = houseUsePeriod.text();
								tmpArParams.push({
									key : "house_use_prid_cd",
									value : houseUsePeriod.val()
								});
								tmpArParamName.push(name);
							}
						}else {
							// 건축년도
							if($("#houseConstYearTab").hasClass("on")) {
								var name = houseConstYear.text() + "건축";
								tmpArParams.push({
									key : "const_year",
									value : houseConstYear.val()
								});
								tmpArParamName.push(name);
							}
						}
						
						// 건축범위
						if($("#houseBdspaceTab").hasClass("on")) {
							//2016.09.08 권차욱 9월 서비스 : 주거면적 변경
							var houseBdspaceFrom = $("#houseBdspaceFrom option:selected");
							var houseBdspaceTo = $("#houseBdspaceTo option:selected");
							var tmpHouseBdspaceTo = houseBdspaceTo.val();
							var tmpHouseBdspaceFrom = houseBdspaceFrom.val();
							var tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎡";
							var houseAreaCd = [];
							
							if (parseInt(houseBdspaceFrom.val()) >= 230) {
								tmpHouseBdspaceFrom = 230;
							}
							
							if (parseInt(houseBdspaceTo.val()) >= 300) {
								tmpHouseBdspaceTo = 9999;
								tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎡ 이상";
								tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상");
							}else {
								//tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상 ~" + tmpHouseBdspaceToText + "㎡ 미만");
								tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상 ~" + tmpHouseBdspaceToText + " 미만");
							}
							
							var dataSet = {
									 0 : "01",
									20 : "02",
									40 : "03",
									60 : "04",
									85 : "05",
								   100 : "06",
								   130 : "07",
								   165 : "08",
								   230 : "09",
								  9999 : "10"
							};
							
							var fromData = parseInt(dataSet[tmpHouseBdspaceFrom]);
							var toData = parseInt(dataSet[tmpHouseBdspaceTo]);
							
							for (var i=0; i<toData-fromData; i++) {
								var code = "0"+(fromData+i);
								houseAreaCd.push(code);
							}
							
							tmpArParams.push({
								key : "house_area_cd",
								value : houseAreaCd.join(",")
							});
						}
						
						//아무 조건도 선택 안했을 경우
						if(tmpArParamName.length == 0) {
							tmpArParamName.push("총주택");
							tmpArNoneParams.push({"noneParam" : true});
						}
						
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "year",
							value : $("#house_year").val()
						});
					}
					
					//결합조건
					else if (api_id == "API_4011") {
						filterParam = "data_cnt";
						var combineBase = $("input[name='rd_combine_base']:checked");
						if(combineBase.val() == "population") {
							unit = "명";	
						} else if(combineBase.val() == "household") {
							unit = "가구";
						} else if(combineBase.val() == "house") {
							unit = "호";
						}
						
						tmpArParams.push({
							key : "combine_base",
							value : combineBase.val()
						});
						
						//****결합조건(인구)****//
						var gender = $("input[name='population_gender_combine']:checked");
						var ageFrom = $("#populationAgeFrom_combine");
						var ageTo = $("#populationAgeTo_combine");
						var eduLevel = $("#populationEduLevel_combine option:selected");
						
						// 성별인구
						if($("#populationGenderTab_combine").hasClass("on")) {
							var gender = "";
							var genderName = "";
							$("input[name='population_gender_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									gender = $(this).val();
									genderName = $(this).next().text();
								}
							});
							
							tmpArParams.push({
								key : "gender",
								value : gender
							});
							tmpArParamName.push("성별 : " + genderName);
						}
						
						//9월서비스 권차욱 수정
						// 연령별인구
						if($("#populationAgeTab_combine").hasClass("on")) {
							var tmpAgeTo = parseInt(ageTo.val())-1;
							var tmpAgeFrom = ageFrom.val();
							var tmpAgeToText = tmpAgeTo + "세";

							if (parseInt(ageFrom.val()) >= 100) {
								tmpAgeFrom = "100";
							}
							if (parseInt(ageTo.val()) >= 101) {
								tmpAgeTo = "150";
								tmpAgeToText = ageTo.val() + "세 이상";
								tmpArParamName.push(tmpAgeFrom + "세 이상");
							}else {
								tmpArParamName.push(tmpAgeFrom + "세~" + tmpAgeToText);
							}
							
							tmpArParams.push({
								key : "age_from",
								value : tmpAgeFrom
							});
							tmpArParams.push({
								key : "age_to",
								value : tmpAgeTo
							});
						}
						
						//2016.08.30 권차욱 9월 서비스 
						var tmpYear = parseInt($("#population_year_combine").val());
						if (tmpYear <= 2010) {
							// 교육정도별인구
							if($("#populationEduTab_combine").hasClass("on")) {
								var edulevel = [];
								var tmpNames = [];
								$("input[name='edulevel_combine']").each(function() {
									if($(this).attr("checked") == "checked") {
										edulevel.push($(this).val());
										tmpNames.push($(this).next().text());
									}
								});
								
								if (edulevel.length > 0) {
									tmpArParams.push({
										key : "edu_level",
										value : edulevel.join(",")
									});
									tmpArParamName.push(tmpNames.join(","));
								}
							}
							
							// 혼인상태별인구
							if($("#populationMarryTab_combine").hasClass("on")) {
								var mrgState = [];
								var tmpNames = [];
								$("input[name='mrg_state_combine']").each(function() {
									if($(this).attr("checked") == "checked") {
										mrgState.push($(this).val());
										tmpNames.push($(this).next().text());
									}
								});
								
								if (mrgState.length > 0) {
									tmpArParams.push({
										key : "mrg_state",
										value : mrgState.join(",")
									});
									tmpArParamName.push(tmpNames.join(","));
								}
							}
						}
						
						//****결합조건(가구)****//
						// 세대구성
						if($("#householdTypeTab_combine").hasClass("on")) {
							var householdType = [];
							var tmpNames = [];
							$("input[name='household_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									householdType.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});
							
							if (householdType.length > 0) {
								tmpArParams.push({
									key : "household_type",
									value : householdType.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}
						
						//2016.08.30 권차욱 9월 서비스 
						var tmpYear = parseInt($("#population_year_combine").val());
						if (tmpYear <= 2010) {
							// 점유형태별가구
							if($("#householdOcptnTab_combine").hasClass("on")) {
								var ocptnType = [];
								var tmpNames = [];
								$("input[name='ocptn_type_combine']").each(function() {
									if($(this).attr("checked") == "checked") {
										ocptnType.push($(this).val());
										tmpNames.push($(this).next().text());
									}
								});
								
								if (ocptnType.length > 0) {
									tmpArParams.push({
										key : "ocptn_type",
										value : ocptnType.join(",")
									});
									tmpArParamName.push(tmpNames.join(","));
								}
							}
						}
						
						//****결합조건(주택)****//
						var houseConstYear = $("#houseConstYear_combine option:selected");
						
						//2016.08.30 권차욱 9월 서비스 - 주석처리
						//var houseBdspaceFrom = $("#houseBdspaceFrom_combine option:selected");
						//var houseBdspaceTo = $("#houseBdspaceTo_combine option:selected");
						
						//2016.08.30 권차욱 9월 서비스
						var houseUsePeriod = $("#houseUsePeriod_combine option:selected");
						var houseAreaCd = $("#house_area_cd_combine option:selected");
						
						// 주택유형
						if($("#houseTypeTab_combine").hasClass("on")) {
							var houseType = [];
							var tmpNames = [];
							$("input[name='house_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									houseType.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});
							
							if (houseType.length > 0) {
								tmpArParams.push({
									key : "house_type",
									value : houseType.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}
						
						//2016.08.30 권차욱 9월 서비스 
						var tmpYear = parseInt($("#population_year_combine").val());
						if (tmpYear > 2010) {
							//건축기간
							if($("#houseUsePeriodTab_combine").hasClass("on")) {
								var name = houseUsePeriod.text();
								tmpArParams.push({
									key : "house_use_prid_cd",
									value : houseUsePeriod.val()
								});
								tmpArParamName.push(name);
							}
						}else {
							// 건축년도
							if($("#houseConstYearTab_combine").hasClass("on")) {
								var name = houseConstYear.text() + "건축";
								tmpArParams.push({
									key : "const_year",
									value : houseConstYear.val()
								});
								tmpArParamName.push(name);
							}
						}
						
						// 건축범위
						//2016.08.30 권차욱 9월 서비스
						if($("#houseBdspaceTab_combine").hasClass("on")) {
							//2016.09.08 권차욱 9월 서비스 : 주거면적 변경
							var houseBdspaceFrom = $("#houseBdspaceFrom_combine option:selected");
							var houseBdspaceTo = $("#houseBdspaceTo_combine option:selected");
							var tmpHouseBdspaceTo = houseBdspaceTo.val();
							var tmpHouseBdspaceFrom = houseBdspaceFrom.val();
							var tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎡";
							var houseAreaCd = [];
							
							//alert('aa');
							
							if (parseInt(houseBdspaceFrom.val()) >= 230) {
								tmpHouseBdspaceFrom = 230;
							}
							
							if (parseInt(houseBdspaceTo.val()) >= 300) {
								tmpHouseBdspaceTo = 9999;
								//tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎡ 이상";
								tmpHouseBdspaceToText = houseBdspaceTo.val() + " 이상";
								tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상");
							}else {
								//tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상 ~" + tmpHouseBdspaceToText + "㎡ 미만");
								tmpArParamName.push(tmpHouseBdspaceFrom + "㎡ 이상 ~" + tmpHouseBdspaceToText + " 미만");
							}
							
							var dataSet = {
									 0 : "01",
									20 : "02",
									40 : "03",
									60 : "04",
									85 : "05",
								   100 : "06",
								   130 : "07",
								   165 : "08",
								   230 : "09",
								  9999 : "10"
							};
							
							var fromData = parseInt(dataSet[tmpHouseBdspaceFrom]);
							var toData = parseInt(dataSet[tmpHouseBdspaceTo]);
							
							for (var i=0; i<toData-fromData; i++) {
								var code = "0"+(fromData+i);
								houseAreaCd.push(code);
							}
							
							tmpArParams.push({
								key : "house_area_cd",
								value : houseAreaCd.join(",")
							});
						}
						
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "year",
							value : $("#population_year_combine").val()
						});
						
						//***결합조건 분기처리***//
						var fusionQueryType = "";		//결합쿼리 구분값
						var populationFlag = false;		//인구플래그
						var householdFlag = false;		//가구플래그
						var houseFlag = false;				//주택플래그
						// 인구 조건이 선택되어 있을 경우
						if(combineBase.val() == "population") {
							populationFlag = true;
							for(var  i = 0; i < tmpArParams.length; i ++) {
								// 세대구성 또는 점유형태별가구가 선택되어 있을 경우
								if(tmpArParams[i].key == "household_type" || tmpArParams[i].key == "ocptn_type") {
									householdFlag = true;		//가구플래그
								}
								// 주택유형 또는 건축년도 또는 건축범위가 선택되어 있을 경우
								if(tmpArParams[i].key == "house_type" || tmpArParams[i].key == "const_year"
									|| tmpArParams[i].key == "bdspace_from" || tmpArParams[i].key == "bdspace_to") {
									houseFlag = true;			//주택플래그
								}
							}
							
							//인구, 가구, 주택 조건이 모두 선택되었을 경우
							if(householdFlag && houseFlag) {
								fusionQueryType = "population_household_house";
							} else if(householdFlag) {		//인구, 가구 조건
								fusionQueryType = "population_household";
							} else if(houseFlag) {		//인구, 주택 조건
								fusionQueryType = "population_house";
							} else {		//인구조건만 선택
								fusionQueryType = "population";
								for (var i = 0; i < tmpArParams.length; i++) {
									if (tmpArParams[i].key == "combine_base") {		//인구조회 API를 호출하기 때문에, combine_base 파라미터 삭제
										tmpArParams.splice(tmpArParams.indexOf(tmpArParams[i]), 1);
										break;
									}
								}
								tmpArNoneParams.push({
									key : "fusion_query_type",
									value : "population"
								});
							}
							
							//가구 조건이 선택되어 있을 경우
						} else if(combineBase.val() == "household") {
							for(var  i = 0; i < tmpArParams.length; i ++) {
								//성별 또는 연령 또는 교육정도별 또는 혼인정도별이 선택되어 있을 경우
								if(tmpArParams[i].key == "gender" || tmpArParams[i].key == "age_from" || tmpArParams[i].key == "age_to"
									|| tmpArParams[i].key == "edu_level" || tmpArParams[i].key == "mrg_state") {
									populationFlag = true;
								}
								// 주택유형 또는 건축년도 또는 건축범위가 선택되어 있을 경우
								if(tmpArParams[i].key == "house_type" || tmpArParams[i].key == "const_year"
									|| tmpArParams[i].key == "bdspace_from" || tmpArParams[i].key == "bdspace_to") {
									houseFlag = true;			//주택플래그
								}
							}
							//인구, 가구, 주택 조건이 모두 선택되었을 경우
							if(populationFlag && houseFlag) {
								fusionQueryType = "population_household_house";
							} else if(populationFlag) {		//인구, 가구 조건
								fusionQueryType = "population_household";
							} else if(houseFlag) {		//가구, 주택 조건
								fusionQueryType = "household_house";
							} else {		//가구 조건만 선택
								fusionQueryType = "household";
								for (var i = 0; i < tmpArParams.length; i++) {
									if (tmpArParams[i].key == "combine_base") {		//가구조회 API를 호출하기 때문에, combine_base 파라미터 삭제
										tmpArParams.splice(tmpArParams.indexOf(tmpArParams[i]), 1);
										break;
									}
								}
								tmpArNoneParams.push({
									key : "fusion_query_type",
									value : "household"
								});
							}
							
							//주택 조건이 선택되어 있을 경우
						} else if(combineBase.val() == "house") {
							for(var  i = 0; i < tmpArParams.length; i ++) {
								//성별 또는 연령 또는 교육정도별 또는 혼인정도별이 선택되어 있을 경우
								if(tmpArParams[i].key == "gender" || tmpArParams[i].key == "age_from" || tmpArParams[i].key == "age_to"
									|| tmpArParams[i].key == "edu_level" || tmpArParams[i].key == "mrg_state") {
									populationFlag = true;
								}
								// 세대구성 또는 점유형태별가구가 선택되어 있을 경우
								if(tmpArParams[i].key == "household_type" || tmpArParams[i].key == "ocptn_type") {
									householdFlag = true;		//가구플래그
								}
							}
							//인구, 가구, 주택 조건이 모두 선택되었을 경우
							if(populationFlag && householdFlag) {
								fusionQueryType = "population_household_house";
							} else if(populationFlag) {		//인구, 주택 조건
								fusionQueryType = "population_house";
							} else if(householdFlag) {		//가구, 주택 조건
								fusionQueryType = "household_house";
							} else {		//주택 조건만 선택
								fusionQueryType = "house";
								for (var i = 0; i < tmpArParams.length; i++) {
									if (tmpArParams[i].key == "combine_base") {		//주택조회 API를 호출하기 때문에, combine_base 파라미터 삭제
										tmpArParams.splice(tmpArParams.indexOf(tmpArParams[i]), 1);
										break;
									}
								}
								tmpArNoneParams.push({
									key : "fusion_query_type",
									value : "house"
								});
							}
						}
						
						//인구, 가구, 주택만 조회하는게 아닐 경우
						if(fusionQueryType != "population" && fusionQueryType != "household" && fusionQueryType != "house") {
							tmpArParams.push({
								key : "fusion_query_type",
								value : fusionQueryType
							});
						}
					}
				}
				
				// 농림어업총조사
				else if (curSelectedStatsType == "3f") {
					// 가구원검색
					if (api_id == "API_0310") {
						filterParam = "population";
						unit = "명";
						
						var dataType = "";
						var dataTypeName = "";
						if($("#3fTabDiv li:eq(0)").hasClass("on")) {		//농가
							dataType = "1";
							dataTypeName = "농가";
						} else if($("#3fTabDiv li:eq(1)").hasClass("on")) {	//임가
							dataType = "2";
							dataTypeName = "임가";	
						} else if($("#3fTabDiv li:eq(2)").hasClass("on")) {		//해수면어가, 내수면어가
							// 2017. 03. 20 오류 수정
							dataType = $("input[name='3f_fish_ppl']:checked").val() == "1" ? "4" : "3";
							dataTypeName = $("input[name='3f_fish_ppl']:checked").next().text();
						}
						var gender = $("input[name='3f_gender']:checked");
						var ageFrom = $("#3fAgeFrom option:selected");
						var ageTo = $("#3fAgeTo option:selected");
						
						// 가구원유형
						var tmpNames = [];
						tmpNames.push(dataTypeName);

						if (tmpNames.length > 0) {
							tmpArParamName.push(tmpNames.join());
						}

						// 가구별연령별 인구
						if($("#3fAgeTab").hasClass("on")) {
							//9월서비스 권차욱 수정
							var tmpAgeTo = parseInt(ageTo.val())-1;
							var tmpAgeFrom = ageFrom.val();
							var tmpAgeToText = tmpAgeTo + "세"; //9월서비스 권차욱 수정 

							if (parseInt(ageFrom.val()) >= 100) {
								tmpAgeFrom = "100";
							}
							if (parseInt(ageTo.val()) >= 101) {
								tmpAgeTo = "150";
								tmpAgeToText = ageTo.val() + "세 이상";
								tmpArParamName.push(tmpAgeFrom + "세 이상");
							}else {
								tmpArParamName.push(tmpAgeFrom + "세~"
										+ tmpAgeToText);
							}
							
							tmpArParams.push({
								key : "age_from",
								value : tmpAgeFrom
							});
							tmpArParams.push({
								key : "age_to",
								value : tmpAgeTo
							});
						}
							
						// 가구원성별
						var gValue = "0";
						if (gender.val() == "0") {
							gValue = "0";
							tmpArParamName.push("남여인구");
						}else {
							gValue = gender.val();
							tmpArParamName.push($.trim(gender.next().text()));
						}
						
						tmpArParams.push({
							key : "gender",
							value : gValue
						});
						tmpArParams.push({
							key : "data_type",
							value : dataType
						});
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "year",
							value : $("#3f_year").val()
						});
					} 
					
					//농가가구검색
					else if (api_id == "API_0307") {
						var dataType = "";
						var dataTypeName = "";
						var ogaType = "";
						if($("#3fTabDiv li:eq(0)").hasClass("on")) {		//농가가구
							dataTypeName = "농가가구";
							api_id = "API_0307";
							filterParam = "farm_cnt";
						} else if($("#3fTabDiv li:eq(1)").hasClass("on")) {	//임가가구
							dataTypeName = "임가가구";
							api_id = "API_0308";
							filterParam = "forestry_cnt";
						} else if($("#3fTabDiv li:eq(2)").hasClass("on")) {		//어가가구
							dataType = $("input[name='3f_fish_ppl']:checked").val();
							dataTypeName = $("input[name='3f_fish_ppl']:checked").next().text();
							api_id = "API_0309";
							filterParam = "fishery_cnt";
							
							tmpArParams.push({
								key : "oga_div",
								value : dataType
							});
						}
						
						unit = "가구";
						
						tmpArParamName.push(dataTypeName);
						
						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						tmpArParams.push({
							key : "year",
							value : $("#3f_year").val()
						});
						
					}
				}
				
				// 전국사업체조사
				else if (curSelectedStatsType == "company") {
					// 사업체통계 - 산업분류
					if (api_id == "API_0304-b") {
						var companyDataType = $("input[name='cDataType']:checked");
						var companyClassType = "";
						//2000년~2005년 :8차, 2006년~현재 :9차
						if($("#company_year").val() <= 2005) {
							companyClassType = "8";
						} else if($("#company_year").val() > 2005) {
							companyClassType = "9";
						}
						//산업분류 트리일 경우
						if($("#company_TreeBox").is(":visible")) {
							// 산업체유형 선택
							if ($interactiveLeftMenu.ui.curSelectedCompanyNode != null && $interactiveLeftMenu.ui.curSelectedCompanyNode.cd.length > 0) {
								tmpArParams.push({
									key : "class_code",
									value : $interactiveLeftMenu.ui.curSelectedCompanyNode.cd
								});
								tmpArParamName.push($interactiveLeftMenu.ui.curSelectedCompanyNode.text);
							}
						}
						
						else if($("#company_SearchBox").is(":visible")) {
							//산업분류 검색일 경우
							var class_code = "";
							$("input[name='rd_company_data']").each(function() {
								if($(this).attr("checked") == "checked") {
									class_code = $(this).val();
									tmpArParamName.push($(this).next().text());
								}
							});
							tmpArParams.push({
								key : "class_code",
								value : class_code
							});
						}
						
						//산업체분류 차수
						/*
						// 2016. 03. 28 j.h.Seok modify 
						if (companyClassType == "8") {	
							tmpArParams.push({
								key : "class_deg",
								value : companyClassType
							});
						}
						*/
						
						tmpArParams.push({
							key : "year",
							value : $("#company_year").val()
						});
						
						// 조회대상 선택 구분
						$("input[name='cDataType']").each(function() {
							if($(this).attr("checked") == "checked") {
								filterParam = $(this).val();
								tmpArParamName.push($.trim($(this).next().text()));
							}
						});
						
						//단위설정
						if (filterParam == "corp_cnt") {
							unit = "개";
						}else {
							unit = "명";
						}
						
						//전산업인지 아닌지 체크 (전산업으로 선택했을 경우 총조사주요지표 API로 검색한다.)
						if(($interactiveLeftMenu.ui.curSelectedCompanyNode == null || $interactiveLeftMenu.ui.curSelectedCompanyNode.cd == "" )&& !$("#company_SearchBox").is(":visible")) {
							if(filterParam == "tot_worker") {
								filterParam = "employee_cnt";
							}
						} else {
							tmpArParams.push({
								key : "area_type",
								value : "0"
							});
						}
					}
					
					// 사업체통계 - 테마검색
					else if (api_id == "API_0304-a") {
						var companyThemaCode, companyThemaName;
						$("#themeCodeList").find("input").each(function() {
							if ($(this).attr("checked") == "checked") {
								companyThemaCode = $(this).val();
								companyThemaName = $.trim($(this).next().text());
							}
						});
						
						//테마유형 검색
						tmpArParams.push({
							key : "theme_cd",
							value : companyThemaCode
						});
						tmpArParamName.push(companyThemaName);
						
						/*var companyDataType = $("input[name='cDataType1']:checked");
						var companyThemaCode = this.curSelectedThemeNode.id.split("_")[0];
						var companyDetailThemaCode = this.curSelectedThemeNode.id.split("_")[1];
						
						//테마유형 검색
						tmpArParams.push({
							key : "theme_cd",
							value : companyThemaCode
						});
						tmpArParamName.push($("#" + companyThemaCode).text());
						console.log($("#" + companyThemaCode).text());
						for (var i = 0; i < tmpArParams.length; i++) {
							if (tmpArParams[i].key == "theme_cd") {
								tmpArParams[i].value = companyThemaCode+companyDetailThemaCode;
							}
						}
						tmpArParamName.push($("#" + this.curSelectedThemeNode.id).text());*/
						console.log(tmpArParamName);
						// 조회대상 선택 구분
						$("input[name='cDataType1']").each(function() {
							if($(this).attr("checked") == "checked") {
								filterParam = $(this).val();
								tmpArParamName.push($.trim($(this).next().text()));
							}
						});
						
						//단위설정
						if (filterParam == "corp_cnt") {
							unit = "개";
						}else {
							unit = "명";
						}

						tmpArParams.push({
							key : "area_type",
							value : "0"
						});
						
						// mng_s 2017. 12. 05 j.h.Seok
						tmpArParams.push({
							key : "year",
							//value : companyDataYear
							value : $("#company_year_theme").val()
						});
						// mng_e 2017. 12. 05 j.h.Seok
					}
				}
				
				// KOSIS
				else if (curSelectedStatsType == "kosis") {
					tmpArParams.push({
						key : "org_id",
						value : interactiveMapKosis.org_id
					});
					tmpArParams.push({
						key : "tbl_id",
						value : interactiveMapKosis.tbl_id
					});
					
					tmpArParams.push({
						key : "obj_var_id",
						value : interactiveMapKosis.kosis_obj_var_id
					});
					
					tmpArParams.push({
						key : "field_id",
						value : interactiveMapKosis.kosis_field_id
					});
					
					if (interactiveMapKosis.kosis_data_item_detail != null
							&& interactiveMapKosis.kosis_data_item_detail.length > 2) {
						tmpArParams.push({
							key : "kosis_data_item_detail",
							value : interactiveMapKosis.kosis_data_item_detail
						});
					} else {
						tmpArParams.push({
							key : "kosis_data_item_detail",
							value : " "
						});
					}
					tmpArParams.push({
						key : "kosis_data_item",
						value : interactiveMapKosis.kosis_data_item
					});
					tmpArParams.push({
						key : "kosis_data_period",
						value : interactiveMapKosis.kosis_data_period
					});
					tmpArParams.push({
						key : "kosis_data_year",
						value : interactiveMapKosis.kosis_data_year
					});
					tmpArParams.push({
						key : "gis_se",
						value : interactiveMapKosis.gis_se
					});
				}
				this.arParamList.push({
					idx : this.searchbtnCnt,
					params : tmpArParams,
					noneParams : tmpArNoneParams,
					names : tmpArParamName,
					filterParam : filterParam,
					unit : unit
				});
				console.log(this.arParamList);
				return api_id;
			},
			
			/**
			 * 
			 * @name         : setRevertParams
			 * @description  : 파라미터정보를 가지고 조건버튼을 생성한다,.
			 * @date         : 2015. 11. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param api_id
			 * @param @param data
			 */
			setRevertParams : function(data, type) {
				console.log(data);
				//일단 공유/검색 데이터일 경우
				if (data.length == 1) {
					var data = data[0];
					
					//adm_cd 및 low_search는 추후 
					var tmpParam = [];
					for (p in data.param_info.paramInfo) {
						if (p != "adm_cd" &&
							p != "low_search") {
							tmpParam.push({
								key : p,
								value : data.param_info.paramInfo[p]
							});
						}
					}
					
					// 2016. 03. 29 j.h.Seok
					if(data.param_info.isKosis) {
						var tmpGisSe = data.param_info.gis_se_bak;
						
						for(var i = 0; i < tmpParam.length; i++) {
							var temp = tmpParam[i];
							
							if(temp.key == "gis_se") {
								temp.value = tmpGisSe;
								break;
							}
						}
					}
					
					this.arParamList.push({
						idx : this.searchbtnCnt,
						params : tmpParam,
						noneParams : [],
						names : data.param_info.title.split(" + "),
						filterParam : data.param_info.showData,
						unit : data.param_info.unit
					});
					
					//버튼생성 및 애니메이션효과 적용
					this.createSearchBtn(data.param_info.api_id, "0");
					this.updateSearchBtnEffect(data.param_info.api_id + "-" + this.searchbtnCnt, 0);
					this.searchbtnCnt++;
					
					//버튼메뉴 Open
					$(".sideQuick.sq03").next(".sqListBox").stop().animate({"left":"0px"},200);
					$(".sideQuick.sq03").addClass("on");
					
				}
			},
			
			/**
			 * 
			 * @name         : setDetailStatsPanel
			 * @description  : 특정 통계버튼을 생성했을 때, 해당 통계에 대한 세부통계조건선택뷰를 생성한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 통계타입
			 */
			setDetailStatsPanel : function(type) {
				this.curSelectedStatsType = type;
				
				var menuType = {
					"mainIndex" : 0,				//주요지표 목록보기
					"populationHouse"  : 1,	//인구주택조사 통계
					"3f" 	 : 2,					//농림어가조사 통계
					"company" 		 : 3,		//사업체조사 통계
					"kosis" 	 : 4,				//KOSIS(지역통계)
					"publicData" 	 : 5,		//공공데이터
					"userData"	 : 6,			//나의 데이터
					"poi"	 : 7,					//사업체 위치조회(POI)
					"company2"		:8
				};
				
				var titleType = {
					"mainIndex" : "주요지표 선택",				//주요지표 목록보기
					"populationHouse"  : "인구주택총조사 조건설정하기",	//인구주택조사 통계
					"3f" 	 : "농림어업총조사 검색조건",					//농림어가조사 통계
					"company" 		 : "전국사업체조사 검색조건",		//사업체조사 통계
					"kosis" 	 : "KOSIS(지역통계) 목록보기",				//행정구역 통계목록보기
					"publicData" 	 : "공공데이터 목록 선택",		//공공데이터 목록 보기
					"userData"	 : "나의 데이터 불러오기",			//사용자데이터업로드
					"poi"	 : "POI",					//POI
					"company2"	 : "전국사업체조사 검색조건"					//사업체조사 통계
				}
				var inx = menuType[type];
				if(inx!=8){
					$("#submenuTitle").text(titleType[type]);
					$("#depth1Menu").find("li").removeClass("on");
					$("#depth1Menu").find("li:eq("+inx+")").addClass("on");
					$(".totalResult").hide();
				}else{
					$("#submenuTitle").text(titleType[type]);
					$("#depth1Menu").find("li").removeClass("on");
					$("#depth1Menu").find("li:eq("+3+")").addClass("on");
					$(".totalResult").hide();
					
				}
					
				
				//2Depth 넓이
				$("#quickBox_2depth").removeClass("join");
				$(".quickBox.step02").find(".mCSB_container").css("width", "280px");
				$(".quickBox.step02").find(".mCSB_container").mCustomScrollbar({setWidth : 280});
				
				//버튼생성 보이기
				$("#buttonMakeBtn").show();
				$("#menuAutoClose2Lev").show();
				//2depth열고, 3depth, 4dpeht 닫기
				$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
				$(".quickBox.step02").stop().animate({"left":"280px"},200);
				$(".quickBox.step03").stop().animate({"left":"0px"},200);
				$(".quickBox.step04").stop().animate({"left":"0px"},200);
				
				switch(menuType[type]) {
					//주요지표 목록보기
					case 0:
						this.curSelectedDetailStatsType = "API_0301";
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						$("#buttonMakeBtn").html("검색조건 생성");
						break;
						
					//인구주택조사 통계
					case 1:
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						if($(".cm01").is(":visible")) {		//인구조건
							this.populationTab("population");
						} else if($(".cm02").is(":visible")) {		//가구조건
							this.populationTab("household");
						} else if($(".cm03").is(":visible")) {		//주택조건
							this.populationTab("house");
						} else if($(".cm04").is(":visible")) {		//결합조건
							this.populationTab("combine");
						}
						break;
						
					//농림어가조사 통계
					case 2:
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						if($("#3fTabDiv > li:eq(0)").hasClass("on")) {
							this.tripleFTab("farm");
						} else if($("#3fTabDiv > li:eq(1)").hasClass("on")) {
							this.tripleFTab("forest");
						} else if($("#3fTabDiv > li:eq(2)").hasClass("on")) {
							this.tripleFTab("fish");
						}
						$("#buttonMakeBtn").html("검색조건 생성");
						
						break;
						
					//사업체조사 통계
					case 3:
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						if($(".cm01").is(":visible")) {
							this.companyTab("industry");
						} else if($(".cm02").is(":visible")) {
							this.companyTab("theme");
						}
						
						//2000년~2005년 :8차, 2006년~현재 :9차 
						var class_deg = "";
						if($("#company_year").val() <= 2005) {
							class_deg = "8";
						} else if($("#company_year").val() > 2005) {
							class_deg = "9";
						}
						$interactiveMap.ui.companyTree = null;
						$interactiveLeftMenu.ui.curSelectedCompanyNode = null;
						$interactiveMapApi.request.openApiInterstryCode(0, class_deg, null);
						break;
						
					//행정구역 통계목록보기
					case 4:
						this.curSelectedDetailStatsType = "kosis";
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						// 2016. 03. 23 j.h.Seok 수정
//						$("#buttonMakeBtn").html("세부 조건창 열기");
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();
						$interactiveLeftMenu.event.kosisTreeWidth();
						//9월 서비스
						if (interactiveMapKosis.checkKosisBtn()) {
							$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
							$("#kosisDetailDiv").stop().animate({"left":"560px"},200);
						}
						break;
						
					//공공데이터 목록 보기
					case 5:
						this.curSelectedDetailStatsType = "API_0301";
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						//공공데이터 목록보기에서는 버튼생성 삭제
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();
						break;
						
					//사용자데이터업로드
					case 6:
						this.curSelectedDetailStatsType = "API_0301";
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						//사용자데이터업로드에서는 버튼생성 삭제
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();
						break;
						
					//POI
					case 7:
						this.curSelectedDetailStatsType = "API_0301";
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						break;
					case 8:
						$interactiveLeftMenu.ui.companyTree = null;
						inx = 3;
						
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						
						if($(".cm01").is(":visible")) {
							this.companyTab("industry");
						} else if($(".cm02").is(":visible")) {
							this.companyTab("theme");
						}
						
						//2000년~2005년 :8차, 2006년~현재 :9차 
						var class_deg = "";
						if($("#company_year").val() <= 2005) {
							class_deg = "8";
						} else if($("#company_year").val() > 2005) {
							class_deg = "9";
						}
						$interactiveMap.ui.companyTree = null;
						$interactiveLeftMenu.ui.curSelectedCompanyNode = null;
						$interactiveMapApi.request.openApiInterstryCode(0, class_deg, null);
						
						$("#companyBtn").trigger("click");
						break;
						
					//행정구역 통계목록보기
				}
			},
			
			/**
			 * 
			 * @name         : populationTab
			 * @description  : 인구주택조사 통계에서 인구조건, 가구조건, 주택조건, 결합조건 탭 선택시 호출.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			populationTab : function(type) {
				var tabType = {
					"population" : 0,				//인구조건
					"household"  : 1,				//가구조건
					"house" 	 : 2,					//주택조건
					"combine"	 : 3				//결합조건
				};
				
				var inx = tabType[type];
				$(".population_tab").hide();
				$("#populationTabDiv li").removeClass("on");
				$("#populationTabDiv > li:eq("+inx+")").addClass("on");
				
				$("#quickBox_2depth").removeClass("join");
				
				//통계메뉴 버튼 위치
				$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
				
				//2Depth 넓이
				$(".quickBox.step02").find(".mCSB_container").css("width", "280px");
				
				if(tabType[type] == 0) {
					$("#API_0302").show();
					this.curSelectedDetailStatsType = "API_0302";
					$("#buttonMakeBtn").html("인구조건 버튼생성");
				} else if(tabType[type] == 1) {
					$("#API_0305").show();
					this.curSelectedDetailStatsType = "API_0305";
					$("#buttonMakeBtn").html("가구조건 버튼생성");
				} else if(tabType[type] == 2) {
					$("#API_0306").show();
					this.curSelectedDetailStatsType = "API_0306";
					$("#buttonMakeBtn").html("주택조건 버튼생성");
				} else if(tabType[type] == 3) {	//결합조건
					$("#API_4011").show();
					this.curSelectedDetailStatsType = "API_4011";
					//통계메뉴 버튼 위치
					$(".sideQuick.sq02").stop().animate({"left":"1120px"},200);
					
					$("#quickBox_2depth").addClass("join");
					//2Depth 넓이
					$(".quickBox.step02").find(".mCSB_container").css("width", "840px");
					$("#buttonMakeBtn").html("인구+가구+주택 결합조건 버튼생성");
				}
			},
			
			/**
			 * 
			 * @name         : tripleFTab
			 * @description  : 농림어업총조사 통계에서 농가, 임가, 어가 탭 선택시 호출.
			 * @date         : 2015. 10. 15. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			tripleFTab : function(type) {
				var tabType = {
					"farm" : 0,				//농가
					"forest"  : 1,				//임가
					"fish" 	 : 2			//어가
				};
				
				var inx = tabType[type];
				$("#3fTabDiv li").removeClass("on");
				$("#3fTabDiv > li:eq("+inx+")").addClass("on");
				
				if(inx == 2) {		//어가일 경우만 해수면,내수면 선택
					$("#3fFishTab-title").show();
					$("#3fFishTab-content").show();
					
					$("#3f_year option[value='2000']").remove();
					$("#3f_year").append("<option value='2000'>2000년도</option>");
				} else if(inx == 1){		// 임가일 경우 2000년 없음
					$("#3f_year option[value='2000']").remove();
					$("#3fFishTab-title").hide();
					$("#3fFishTab-content").hide();
				} else{		//농가, 임가일 경우 숨김
					$("#3f_year option[value='2000']").remove();
					$("#3f_year").append("<option value='2000'>2000년도</option>");
					$("#3fFishTab-title").hide();
					$("#3fFishTab-content").hide();
				}
			},
			
			/**
			 * 
			 * @name         : companyTab
			 * @description  : 전국사업체조사에서 산업분류, 테마업종 탭 선택시 호출.
			 * @date         : 2015. 10. 16. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			companyTab : function(type) {
				var tabType = {
					"industry" : 0,			//산업분류
					"theme"  : 1				//테마업종
				};
				
				var inx = tabType[type];
				$(".company_tab").hide();
				$("#companyTabDiv li").removeClass("on");
				$("#companyTabDiv > li:eq("+inx+")").addClass("on");
				
				if(tabType[type] == 0) {		//산업분류
					$("#API_0304-b").show();
					this.curSelectedDetailStatsType = "API_0304-b";
					
					//mng_s
					if($interactiveLeftMenu.ui.isInnerMapShow2!=undefined && $interactiveLeftMenu.ui.isInnerMapShow2) {
						//버튼생성 보이기
						//기존 산업분류에서는 3뎁스에서 버튼이 존재하고 그리드에서는 2뎁스에 존재해야하므로 여기다 세팅한다.
						$("#buttonMakeBtn").text("사업체조사 버튼생성");
						$("#buttonMakeBtn").show();
						$("#menuAutoClose2Lev").show();
					} else if($interactiveLeftMenu.ui.isInnerMapShow3!=undefined && $interactiveLeftMenu.ui.isInnerMapShow3) {
						//버튼생성 보이기
						//기존 산업분류에서는 3뎁스에서 버튼이 존재하고 그리드에서는 2뎁스에 존재해야하므로 여기다 세팅한다.
						$("#buttonMakeBtn").text("사업체조사 버튼생성");
						$("#buttonMakeBtn").show();
						$("#menuAutoClose2Lev").show();
					} else {
						//산업분류에서는 버튼생성 삭제
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();
						
						//산업분류를 선택했을 때, 강제로 3depth창을 연다.
						$interactiveLeftMenu.ui.companyClassView();
					}
					
				} else if(tabType[type] == 1) {	//테마업종
					$("#API_0304-a").show();
					this.curSelectedDetailStatsType = "API_0304-a";
					
					//테마업종에서는 버튼생성 보이기
					$("#buttonMakeBtn").text("테마조건 버튼생성");
					$("#buttonMakeBtn").show();
					$("#menuAutoClose2Lev").show();
					
					
					//3Depth 닫기
					$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
					$("#companyClassSearchDiv").stop().animate({"left":"0px"},200);
					$("#companyClassListDiv").stop().animate({"left":"0px"},200);
				}
			},
			
			/**
			 * 
			 * @name         : companyClassView
			 * @description  : 표준산업분류목록 검색 클릭 시.
			 * @date         : 2015. 10. 16. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 버튼
			 */
			companyClassView : function(type) {
				//메뉴버튼
				$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
				$("#companyClassSearchDiv").stop().animate({"left":"0px"},200);
				$("#companyClassListDiv").stop().animate({"left":"560px"},200);
			},
			
			/**
			 * 
			 * @name         : companySearch
			 * @description  : 표준산업분류 검색 시
			 * @date         : 2015. 12. 18. 
			 * @author	     : 김성현
			 * @param 		: pageNum 조회할 페이지
			 * @history 	 :
			 */
			companySearch : function(pageNum) {
				if($("#companySearchText").val() == "") {
					messageAlert.open("알림", "검색어를 입력하세요.");
					return;
					
				} else {
					var companyClassType = "";
					//2000년~2005년 :8차, 2006년~현재 :9차
					if($("#company_year").val() <= 2005) {
						companyClassType = "8";
					} else if($("#company_year").val() > 2005) {
						companyClassType = "9";
					}
					
					var sopPortalCorpClassSearchObj = new sop.portal.corpClassSearch.api();
					sopPortalCorpClassSearchObj.addParam("class_deg", companyClassType);
					sopPortalCorpClassSearchObj.addParam("searchword", $("#companySearchText").val());
					sopPortalCorpClassSearchObj.addParam("pagenum", pageNum);
					sopPortalCorpClassSearchObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/map/interactive/corpClassSearch.json"
					});
				}
			},
			
			/**
			 * @name         : companyPaging
			 * @description  :	Left메뉴 산업분류 데이터 페이징 처리
			 * @date         : 2015. 12. 18.
			 * @author	     : 김성현
			 * @param 		: totalCount 전체개수,  currentIndex 조회페이지
			 * @history 	 :
			 */
			companyPaging : function(totalCount, currentIndex) {
				var pageSize = 5;
				var totalPage = Math.ceil( totalCount / pageSize);
				$('#corpClassPaging .pages').paging({
					current:currentIndex+1,
					max:totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						$interactiveLeftMenu.ui.corpClassNum = page-1;
						$interactiveLeftMenu.ui.companySearch(page-1);
					}
				});
			},
			
			/**
			 * 
			 * @name         : companyTreeShow
			 * @description  : 표준산업분류목록 보이기
			 * @date         : 2015. 10. 27. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			companyTreeShow : function() {
				$("#company_TreeBox").show();
				$("#company_SearchBox").hide();
			},
			
			/**
			 * 
			 * @name         : deleteSearchBtn
			 * @description  : 생성된 조건검색버튼을 삭제한다.
			 * @date         : 2015. 10. 06. 
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
			 * @name         : bndYearSelectbox
			 * @description  : 조사년도 셀렉트박스 생성.
			 * @date         : 2015. 10. 07. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			bndYearSelectbox : function() {
				//mng_s 20171018 leekh
				$("#mainIndex_year").append("<option value='2016'>2016년도</option>");
				$("#population_year").append("<option value='2016'>2016년도</option>");
				$("#household_year").append("<option value='2016'>2016년도</option>");
				$("#house_year").append("<option value='2016'>2016년도</option>");
				$("#population_year_combine").append("<option value='2016'>2016년도</option>");
				//mng_s 20171017 leekh
				for(var year = 2015; year >= 2000; year--) { //2016.08.23 권차욱 9월서비스 2010->2015
					if((year % 5) == 0) {
						//주요지표 조사년도
						$("#mainIndex_year").append("<option value="+year+">"+year+"년도</option>");
						
						//인구조건 조사년도
						$("#population_year").append("<option value="+year+">"+year+"년도</option>");
					
						//가구조건 조사년도
						$("#household_year").append("<option value="+year+">"+year+"년도</option>");
						
						//주택조건 조사년도
						$("#house_year").append("<option value="+year+">"+year+"년도</option>");
						
						//인구+가구+주택 결합조건 조사년도
						$("#population_year_combine").append("<option value="+year+">"+year+"년도</option>");
						
						//농림어업 조사년도
						$("#3f_year").append("<option value="+year+">"+year+"년도</option>");
	
					}
				}
				
				/*
				for (var year = 2015; year >= 2000; year--) {
					if((year % 5) == 0) {
						//농림어업 조사년도
						$("#3f_year").append("<option value="+year+">"+year+"년도</option>");
					}
				}
				*/
				
				//2016.09.01 권차욱 9월 서비스
				for(var year = parseInt(companyDataYear); year >= 2000; year --) {
					//사업체 조사년도
					$("#company_year").append("<option value="+year+">"+year+"년도</option>");
					
					// mng_s 2017. 12. 05 j.h.Seok
//					$("#company_year_theme").append("<option value="+year+">"+year+"년도</option>");
					// mng_e 2017. 12. 05 j.h.Seok
					
					//사업체 주요지표 조사년도
					$("#mainIndex_corp_year").append("<option value="+year+">"+year+"년도</option>");
				}
				// mng_s 2017.12.06 주용민
				for(var year = parseInt(companyDataYear); year >= 2006; year --) {
					$("#company_year_theme").append("<option value="+year+">"+year+"년도</option>");
				}
				// mng_e 2017.12.06 주용민
			},
			
			/**
			 * 
			 * @name         : btnValidationCheck
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보 유효성 검사. 
			 * @date         : 2015. 10. 13. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 * @param api_id : 선택된 통계정보의 API ID(element id)
			 */
			btnValidationCheck : function(curSelectedStatsType, api_id) {
				//총조사 주요지표
				if(curSelectedStatsType == "mainIndex") {
					var str = "";
					$("input[name='mainIndex_radio']").each(function() {
						if($(this).attr("checked") == "checked") {
							str = "check";
						}
					});
					if(str == "") {
						messageAlert.open("알림", "주요지표를 선택하세요.");
						return false;
					}
				}
				
				// 인구주택총조사
				else if (curSelectedStatsType == "populationHouse") {
					//인구조건
					if (api_id == "API_0302") {
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
						
						// 교육정도탭을 열고 미선택 시
						if($("#populationEduTab").hasClass("on")) {
							var eduLevel = $("#populationEduLevel option:selected").val();
							if(eduLevel == "") {
								$("#populationEduTab").click();
							}
						}
						
						// 혼인정도별 열고 미선택 시
						if($("#populationMarryTab").hasClass("on")) {
							var mrgState = [];
							$("input[name='mrg_state_1']").each(function() {
								if($(this).attr("checked") == "checked") {
									mrgState.push($(this).val());
								}
							});
							if (mrgState.length == 0) {
								$("#populationMarryTab").click();
							}
						}
					}
					
					//가구조건
					else if (api_id == "API_0305") {
						// 세대구성 열고 미선택 시
						if($("#householdTypeTab").hasClass("on")) {
							var householdType = [];
							$("input[name='household_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									householdType.push($(this).val());
								}
							});
							if (householdType.length == 0) {
								$("#householdTypeTab").click();
							}
						}
						
						// 점유형태 열고 미선택 시
						if($("#householdOcptnTab").hasClass("on")) {
							var ocptnType = [];
							$("input[name='ocptn_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									ocptnType.push($(this).val());
								}
							});
							if (ocptnType.length == 0) {
								$("#householdOcptnTab").click();
							}
						}
					}
					
					//주택조건
					else if (api_id == "API_0306") {
						// 주택유형 열고 미선택 시
						if($("#houseTypeTab").hasClass("on")) {
							var houseType = [];
							$("input[name='house_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									houseType.push($(this).val());
								}
							});
							if (houseType.length == 0) {
								$("#houseTypeTab").click();
							}
						}
					}
					
					//결합조건
					else if(api_id == "API_4011") {
						var str = "";
						$("input[name='rd_combine_base']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "조사 기준은 필수입니다.");
							return false;
						}
						
						//성별탭을 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#populationGenderTab_combine").hasClass("on")) {
							$("input[name='population_gender_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "성별을 선택하세요.");
								return false;
							}
						}
						
						// 교육정도탭을 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#populationEduTab_combine").hasClass("on")) {
							var eduLevel = [];
							$("input[name='edulevel_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									eduLevel.push($(this).val());
								}
							});
							if (eduLevel.length == 0) {
								messageAlert.open("알림", "교육정도를 선택하세요.");
								return false;
							}
						}
						
						// 혼인정도별 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#populationMarryTab_combine").hasClass("on")) {
							var mrgState = [];
							$("input[name='mrg_state_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									mrgState.push($(this).val());
								}
							});
							if (mrgState.length == 0) {
								messageAlert.open("알림", "혼인정도를 선택하세요.");
								return false;
							}
						}
						
						// 세대구성 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#householdTypeTab_combine").hasClass("on")) {
							var householdType = [];
							$("input[name='household_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									householdType.push($(this).val());
								}
							});
							if (householdType.length == 0) {
								messageAlert.open("알림", "세대구성을 선택하세요.");
								return false;
							}
						}
						
						// 점유형태 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#householdOcptnTab_combine").hasClass("on")) {
							var ocptnType = [];
							$("input[name='ocptn_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									ocptnType.push($(this).val());
								}
							});
							if (ocptnType.length == 0) {
								messageAlert.open("알림", "점유형태를 선택하세요.");
								return false;
							}
						}
						
						// 주택유형 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#houseTypeTab_combine").hasClass("on")) {
							var houseType = [];
							$("input[name='house_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									houseType.push($(this).val());
								}
							});
							if (houseType.length == 0) {
								messageAlert.open("알림", "주택유형을 선택하세요.");
								return false;
							}
						}
					}
				}
				
				// 농림어업총조사
				else if (curSelectedStatsType == "3f") {
					//선택항목이 하나라도 있을 경우 API_0310(가구원 검색)
					if($("#3fGenderTab").hasClass("on") || $("#3fAgeTab").hasClass("on")) {
						api_id = "API_0310";
					} else {	//아닐 경우 API_0307(가구검색)
						api_id = "API_0307";
					}
					this.curSelectedDetailStatsType = api_id;
					
					//인구조건
					if (api_id == "API_0310") {
						//어가일 경우 해수면, 내수면이 선택되어 있어야 함
						if($("#3fTabDiv > li:eq(2)").hasClass("on")) {
							var str = "";
							$("input[name='3f_fish_ppl']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "해수면어가, 내수면어가 중 하나를 선택하세요.");
								return false;
							}
						}
						
						if($("#3fGenderTab").hasClass("on")) {
							var str = "";
							$("input[name='3f_gender']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "성별을 선택하세요.");
								return false;
							}
						}
					}
				}
				
				// 전국사업체조사
				else if (curSelectedStatsType == "company") {
					//산업분류
					if (api_id == "API_0304-b") {
						//사업체수, 종사자수 선택
						var str = "";
						$("input[name='cDataType']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "대상은 필수입니다.");
							return false;
						}
						
						//산업분류 검색일 경우
						str = "";
						if($("#company_SearchBox").is(":visible")) {
							$("input[name='rd_company_data']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "산업분류 목록을 선택하세요.");
								return false;
							}
						}
					}
					
					//테마업종
					else if (api_id == "API_0304-a") {
						//사업체수, 종사자수 선택
						var str = "";
						$("input[name='cDataType1']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "대상은 필수입니다.");
							return false;
						}
						
						//테마업종 트리 미선택 시
						var isChecked = false;
						$("#themeCodeList").find("input").each(function() {
							if ($(this).attr("checked") == "checked") {
								isChecked = true;
							}
						});
						if (!isChecked) {
							messageAlert.open("알림", "테마코드를 선택하세요.");
							return false;
						}
/*						if(this.curSelectedThemeNode == null || this.curSelectedThemeNode.id.length != 5) {
							messageAlert.open("알림", "테마코드를 선택하세요.");
							return false;
						}*/
						
						
					}
				}
				
				// KOSIS
				else if (curSelectedStatsType == "kosis") {
//					if(interactiveMapKosis.curSelectNodeCheck == false) {
//						messageAlert.open("알림", "항목을 선택하여 주세요.");
//						return false;
//					}
				}
				
				return true;
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
				$publicDataBoard.ui.leftMenuList($interactiveMap.ui);		//공공데이터 목록
				$mydataDataBoard.ui.delegateSetting($interactiveMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($interactiveMap.ui);			//공공데이터 세팅
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
				$interactiveMap.ui.doMaxSize();
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
				$interactiveMap.ui.doAddMap();
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
				var mapId = parseInt($interactiveMap.ui.curMapId) + 1;
				$interactiveMap.ui.doCombineMap(mapId);
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
				var mapId = parseInt($interactiveMap.ui.curMapId) + 1;
				$interactiveMap.ui.doBookMark(mapId);
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
				var mapId = parseInt($interactiveMap.ui.curMapId) + 1;
				$interactiveMap.ui.doShare(mapId);
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
				var mapId = parseInt($interactiveMap.ui.curMapId) + 1;
				$interactiveMap.ui.reportDataSet(mapId);
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
			 * @name         : updateToolTip
			 * @description  : 툴팁의 메시지를 업데이트한다.
			 * @date         : 2015. 12. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			updateToolTip : function(id, msg) {
				$("#"+id).tooltip({
				    content: msg
				});
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
				var map_id = $interactiveMap.ui.curMapId;
				var legend = $interactiveMap.ui.mapList[map_id].legend;
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
				var map_id = $interactiveMap.ui.curMapId;
				//9월 서비스
				if ($interactiveMap.ui.mapList[map_id] == null) {
					return;
				}
				var legend = $interactiveMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우
				if(legend.numberData) {
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				} else {	//통계표출 off일 경우
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				}
			},
			
			//2016.08.23 권차욱 9월 서비스 
			/**
			 * 
			 * @name         : checkFusionItem
			 * @description  : 조건결합 조건 선택에 따른 기준정보 show/hide
			 * @date         : 2016. 08. 23. 
			 * @author	     : 김성현, 권차욱
			 * @history 	 :
			 */
			checkFusionItem : function(e, type) {
				//결합조건 데이터 선택 시 기준 활성화
				var pplFlag = false;		//인구기준 활성화 true/false
				var holdFlag = false;		//가구기준 활성화 true/false
				var houseFlag = false;		//주택기준 활성화 true/false

				//인구기준 활성화 여부
				$("#fusionPopulation").find(".roundTextBox").each(function() {
					var ck = $(this).hasClass("on");
					if ($(this).attr("id") == "populationGenderTab_combine" || 
						$(this).attr("id") == "populationAgeTab_combine"    || 
						$(this).attr("id") == "populationEduTab_combine"    || 
						$(this).attr("id") == "populationMarryTab_combine") {
						if(ck) {
							pplFlag = true;
						}
					}
				});
				if (pplFlag) {
					$("#rd_combine_base01").next().show();
				}else {
					$("#rd_combine_base01").next().hide();
				}
				
				//가구기준 활성화 여부
				$("#fusionHousehold").find(".roundTextBox").each(function() {
					var ck = $(this).hasClass("on");
					if($(this).attr("id") == "householdTypeTab_combine" || $(this).attr("id") == "householdOcptnTab_combine") {
						if(ck) {
							holdFlag = true;
						}
					}
				});
				if (holdFlag) {
					$("#rd_combine_base02").next().show();
				}else {
					$("#rd_combine_base02").next().hide();
				}
					
				//주택기준 활성화 여부
				$("#fusionHouse").find(".roundTextBox").each(function() {
					var ck = $(this).hasClass("on");
					if($(this).attr("id") == "houseTypeTab_combine" || $(this).attr("id") == "houseConstYearTab_combine"
							|| $(this).attr("id") == "houseBdspaceTab_combine") {
						if(ck) {
							houseFlag = true;
						}
					}
				});
				if (houseFlag) {
					$("#rd_combine_base03").next().show();
				}else {
					$("#rd_combine_base03").next().hide();
				}
				
				if (type == "tab") {
					$("#rd_combine_base01").removeAttr("checked");
					$("#rd_combine_base02").removeAttr("checked");
					$("#rd_combine_base03").removeAttr("checked");
					$("#rd_combine_base01").prop("checked", false);
					$("#rd_combine_base02").prop("checked", false);
					$("#rd_combine_base03").prop("checked", false);
					$("#rd_combine_base01").next().removeClass("on");
					$("#rd_combine_base02").next().removeClass("on");
					$("#rd_combine_base03").next().removeClass("on");
					
					//인구기준 설정
					if ((pplFlag && !holdFlag && !houseFlag) || 
						(pplFlag &&  holdFlag && !houseFlag) ||
						(pplFlag && !holdFlag && houseFlag)  ||
						(pplFlag &&  holdFlag && houseFlag)) {
						$("#rd_combine_base01").attr("checked", "checked");
						$("#rd_combine_base01").prop("checked", true);
						$("#rd_combine_base01").next().addClass("on");
					}
					//가구기준 설정
					else if ((!pplFlag &&  holdFlag && !houseFlag) || 
							  (!pplFlag &&  holdFlag &&  houseFlag)) {
						$("#rd_combine_base02").attr("checked", "checked");
						$("#rd_combine_base02").prop("checked", true);
						$("#rd_combine_base02").next().addClass("on");
					}
					//주택기준 설정
					else {
						$("#rd_combine_base03").attr("checked", "checked");
						$("#rd_combine_base03").prop("checked", true);
						$("#rd_combine_base03").next().addClass("on");
					}
				}
				
				if (!pplFlag && !holdFlag && !houseFlag) {
					return false;
				}else {
					//체크된 라이오 버튼이 하나밖에 없을 때, 같은 라이오버튼을 누를때 항상 체크되도록 변경
					if ($("input[name='rd_combine_base']:checked").length == 1) {
						if ($("input[name='rd_combine_base']:checked").attr("id") == $(e.target).prev().attr("id")) {
							return false;
						}else {
							return true;
						}
					}else {
						return true;
					}
				}
			},
			
			/**
			 * 
			 * @name         : checkMustItem
			 * @description  : 필수항목에 대한 라이오 버튼처리
			 * @date         : 2016. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkMustItem : function(e, el) {
				//체크된 라이오 버튼이 하나밖에 없을 때, 같은 라이오버튼을 누를때 항상 체크되도록 변경
				if ($("input[name='"+el+"']:checked").length == 1) {
					if ($("input[name='"+el+"']:checked").attr("id") == $(e.target).prev().attr("id")) {
						return false;
					}else {
						return true;
					}
				}else {
					return true;
				}
			},
			/**
			 * 
			 * @name         : sqlListBoxPosition
			 * @description  : sqlListBox 위치 처리
			 * @date         : 2017. 04. 21. 
			 * @author	     : 이경현
			 * @history 	 :
			 */
			sqlListBoxPosition : function(left) {
				$("#sqlListBox").stop().animate({"left":left},200);
			},
			/**
			 * 
			 * @name         : sqlListBoxPosition2
			 * @description  : sqlListBox 위치 처리
			 * @date         : 2017. 04. 21. 
			 * @author	     : 이경현
			 * @history 	 :
			 */
			sqlListBoxPosition2 : function(left) {
				if($("#menuAutoClose_radio").attr("checked") != "checked") {
					$interactiveLeftMenu.ui.sqlListBoxPosition(left);
					$interactiveLeftMenu.ui.sqlListBoxLeft = left;
				}else{
					$interactiveLeftMenu.ui.sqlListBoxPosition("0px");
					$interactiveLeftMenu.ui.sqlListBoxLeft = "0px";
				}
			}
	};

	$interactiveLeftMenu.event = {
			
			marker : null,
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
				this.slideValue("populationAgeFrom", "populationAgeTo", "#slider-range2", "세", 105); //9월서비스 20160729 권차욱 수정 101->105
				this.slideValue("houseBdspaceFrom", "houseBdspaceTo", "#slider-range3", "㎡", 9); //2016.09.08 9월 추가분 
				this.slideValue("3fAgeFrom", "3fAgeTo", "#slider-range4", "세", 105); //9월서비스 권차욱 수정
				this.slideValue("populationAgeFrom_combine", "populationAgeTo_combine", "#slider-range2_combine", "세", 105); //9월서비스 20160729 권차욱 수정 101->105
				this.slideValue("houseBdspaceFrom_combine", "houseBdspaceTo_combine", "#slider-range3_combine", "㎡", 9); //2016.09.08 9월 추가분 

		    	//스크롤 생성
		    	$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
		    	$(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({axis:"xy"});
		        $(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({
		        	axis:"xy",
		        	callbacks: {
		        		whileScrolling:function() {
		        			//2Detph 가 안보이는 버그 해결책
		        			if($(".quickBox.step02").find(".mCSB_container").position() != undefined) {
		        				if($(".quickBox.step02").find(".mCSB_container").position().left >= 1000) {
		        					$(".quickBox.step02").find(".mCSB_container").css("left", "0px");
			    				}	
		        			}
		        		}
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
						//2017.07.06 추가
						$(".sideQuick.sq03").addClass("on");
					}else{ 
						$interactiveLeftMenu.event.stepCloseAnimate(1, "pass"); 
						$(this).find("span").show();
						$(this).removeClass("on").css("width","90px");
						 $(".quickBox.step02").removeClass("join");
					} 
				}); 
				
				//선택항목 클릭 시
				body.on("click",".sideQuick.sq03", function(){
					var isDrag = $(this).hasClass("dragStart");
					var on = $(this).hasClass("on");
					if(!on){
						$(this).addClass("on");
						if (isDrag) {
							if ($(this).next(".sqListBox").is(":visible")) {
								$(".sqListBox.sq03").hide();
							}else {
								$(".sqListBox.sq03").show();
								$("#mCSB_3_container").width("292px");
								$("#mCSB_4_container").width("292px");
							}
						}else {
							$(".sqListBox.sq03").show();
							$(this).next(".sqListBox").stop().animate({"left":$interactiveLeftMenu.ui.sqlListBoxLeft},200);
						}
					}else{
						$(this).removeClass("on");
						if (isDrag) {
							if ($(this).next(".sqListBox").is(":visible")) {
								$(".sqListBox.sq03").hide();
							}else {
								$(".sqListBox.sq03").show();
								$("#mCSB_3_container").width("292px");
								$("#mCSB_4_container").width("292px");
							}
						}else {
							$(".sqListBox.sq03").show();
							$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
						}
					}
				}); 
				
				//닫기 버튼 클릭 시
				body.on("click",".stepClose",function(){ 
					//9월 서비스
					var idx = parseInt($(this).index(".stepClose")+1);
					if (idx > 3) {
						idx = 3;
					}
					$interactiveLeftMenu.event.stepCloseAnimate(idx, "pass"); 
			    }); 
				
				//조건 상세설정 열고 닫기
				body.on("click","a.roundTextBox",function(e){
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
					
					//2016.08.23 김성현, 권차욱 9월 서비스 
					var fusionCk = $(this).parent().hasClass("joinStepBox");		//조건결합인지 true/false
					if(fusionCk) {
						$interactiveLeftMenu.ui.checkFusionItem(e, "tab");
					}
			    });
				
				//전국사업체조사 테마업종
				body.on("click","a.subRoundTextBox",function(){
					var idx = $("a.subRoundTextBox").index(this);
					$("a.subRoundTextBox").each(function(index) {
						if (idx != index) {
							var ck = $(this).hasClass("on");
							if (ck) {
								$(this).removeClass("on");
								$(this).children("input").prop("checked", false);
								$(this).next(".joinDefault").hide(); 
							}
						}
					});
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
				
				//주요지표 목록보기 - 주요지표 선택하기
				body.on("click",".mainIndex_stepBox label",function(){
					$(".mainIndex_stepBox label").removeClass("on");
					$(".mainIndex_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$(".qmdl dd ul>li").removeClass("on");
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
					$(".qmdl2 dd ul>li").removeClass("on");
					$interactiveLeftMenu.event.stepCloseAnimate(1, "check");	
					
					//조회 실행
					var type = $(this).prev().val();
					$publicDataBoard.ui.updatePublicData(type);
			    });
				
				//단일 라디오버튼 선택 (li 안에 input 여러개)
				body.on("click",".radioStepBox label",function(e){
					//2016.08.23 권차욱 9월 서비스
					if ($(this).prev().attr("name") == "rd_combine_base") {
						if (!$interactiveLeftMenu.ui.checkFusionItem(e)) {
							return;
						}
					}else if ($(this).prev().attr("name") == "population_gender" ||
						      $(this).prev().attr("name") == "cDataType"         ||
						      $(this).prev().attr("name") == "cDataType1") {
						var el = $(this).prev().attr("name");
						if (!$interactiveLeftMenu.ui.checkMustItem(e, el)) {
							return;
						}
					}
					var ck = $(this).hasClass("on");
					
					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
//					var elParent = $(this).parent().parent();
//					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
//						if (ck) {
//							return;
//						}
//					}
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
				
				//단일 라디오버튼 선택 (li 안에 input 한개)
				body.on("click",".radioStepOneBox label",function(){
					var ck = $(this).hasClass("on");
					$(this).parent().parent().find("label").removeClass("on");
					$(this).parent().parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().prev().removeAttr("checked");
					}
			    });
				
				//단일 라디오버튼 선택2 (li 안에 input 한개)
				body.on("click",".radioStepOneBox2 label",function(){
					var ck = $(this).hasClass("on");
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
					
					//mng_s
					if($interactiveLeftMenu.ui.isInnerMapShow2!=undefined && $interactiveLeftMenu.ui.isInnerMapShow2) {
						//주택조건 탭이고 그리드일 경우 단일 선택한다. 가구조건에서는 다중선택임
						if( $interactiveLeftMenu.ui.curSelectedDetailStatsType == "API_0306" ) {
							$(this).parent().parent().find("label").removeClass("on");
							$(this).parent().parent().find("input").removeAttr("checked");
							$(this).addClass("on");
							$(this).prev().attr("checked", "checked");
						} else { //다중선택
							var ck = $(this).hasClass("on");
							if(!ck){
								$(this).addClass("on");
								$(this).prev().attr("checked", "checked");
							}else{
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						}
						
					} else if($interactiveLeftMenu.ui.isInnerMapShow3!=undefined && $interactiveLeftMenu.ui.isInnerMapShow3) {
						//주택조건 탭이고 그리드일 경우 단일 선택한다. 가구조건에서는 다중선택임
						if( $interactiveLeftMenu.ui.curSelectedDetailStatsType == "API_0306" ) {
							$(this).parent().parent().find("label").removeClass("on");
							$(this).parent().parent().find("input").removeAttr("checked");
							$(this).addClass("on");
							$(this).prev().attr("checked", "checked");
						} else { //다중선택
							var ck = $(this).hasClass("on");
							if(!ck){
								$(this).addClass("on");
								$(this).prev().attr("checked", "checked");
							}else{
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						}
						
					} else {
						var ck = $(this).hasClass("on");
						if(!ck){
							$(this).addClass("on");
							$(this).prev().attr("checked", "checked");
						}else{
							$(this).removeClass("on");
							$(this).prev().removeAttr("checked");
						}
					}
					
					/*
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					*/
					
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
				
				//KOSIS 세부조건 확장/축소
				body.on("click",".hangjungArea .resizeIcon",function(){
					var cls = $(".hangjungArea");
					var ck = cls.hasClass("on");
					if(!ck){
						cls.addClass("on");
					}else{
						cls.removeClass("on");
					}
				});
				
				//전국사업체조사-테마업종
				body.on("click",".subRadioStepBox label",function(){
					var idx = $(".subRadioStepBox label").index(this);
					$(".subRadioStepBox label").each(function(index) {
						if (idx != index) {
							var ck = $(this).hasClass("on");
							$(this).parent().find("label").removeClass("on");
							$(this).parent().find("input").removeAttr("checked");
						}
					});
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
				
				$('#companySearchText').keydown(function(e){
					if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
						$interactiveLeftMenu.ui.companySearch(0);
					}
				});
				
				//통계메뉴바 자동 닫기
				body.on("click",".menuAutoClose label",function(){
					var ck = $(this).hasClass("on");
					$(".menuAutoClose label").parent().find("label").removeClass("on");
					$(".menuAutoClose label").parent().find("input").removeAttr("checked");
					if(!ck){
						$(".menuAutoClose label").addClass("on");
						$(".menuAutoClose label").prev().attr("checked", "checked");
					}else{ 
						$(".menuAutoClose label").removeClass("on");
						$(".menuAutoClose label").prev().removeAttr("checked");
					}
			    });
				
				//통계버튼창 드래그
				var top = $(".buttonBar").offset().top - 104;
				$(".buttonBar").draggable({
					containment : [0, 100, $(".containerBox").width()-100, $(".containerBox").height()-100],
					start : function(e, ui) {
						var left = $(".sqListBox.sq03").offset().left;
						if (!$(".sideQuick.sq03").hasClass("dragStart") && parseInt(left) < 0) {
							$(".sqListBox.sq03").hide();
						}
						$(".sideQuick.sq03").addClass("dragStart");
						$(".sqListBox.sq03").stop().animate({"left":"0px"},0);
					}
				});
				$(".sqListBox > .sqTabs").dblclick(function() {
					$(".buttonBar").animate({"left":"0px","top":""+top+""}, 50);
					if ($(".sideQuick.sq03").hasClass("dragStart")) {
						$(".sideQuick.sq03").removeClass("dragStart");
					}
				});
				
				//2016.08.23 권차욱 9월 서비스 -주요지표
				/*$("#mainIndex_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#mainIndex_box2").hide();
						$("#mainIndex_box2 li").each(function() {
							if ($(this).find("label").hasClass("on")) {
								$(this).find("label").removeClass("on");
								$(this).find("label").prev().removeAttr("checked");
							}
						});
					}else {
						$("#mainIndex_box2").show();
					}
				});*/
				
				
				//mng_s 20171019 leekh 주요지표 선택
				$("#mainIndex_year").change(function() {
					if (parseInt(this.value) == 2016) {
						$("#mainIndex_box2").hide();
						$("#mainIndex_box2 li").each(function() {
							if ($(this).find("label").hasClass("on")) {
								$(this).find("label").removeClass("on");
								$(this).find("label").prev().removeAttr("checked");
							}
						});
					}else if(parseInt(this.value) == 2000){
						$("#mainIndex_box2").show();
						
						$("#li_mainIndex_radio12").hide();
						$("#li_mainIndex_radio13").hide();

					}else {
						$("#mainIndex_box2").show();
						$("#li_mainIndex_radio12").show();
						$("#li_mainIndex_radio13").show();
					}
				});
				//mng_e 20171019 leekh 주요지표 선택
				
				
				
				//2016.08.23 권차욱 9월 서비스 - 인구통계
				$("#population_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#populationEduTab").hide();
						$("#populationEduTab").next().hide();
						$("#populationMarryTab").hide();
						$("#populationMarryTab").next().hide();
						$("#populationEduTab").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						$("#populationMarryTab").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						if ($("#populationEduTab").hasClass("on")) {
							$("#populationEduTab").click();
						}
						if ($("#populationMarryTab").hasClass("on")) {
							$("#populationMarryTab").click();
						}
					}else {
						
						//mng_s
						if( $interactiveLeftMenu.ui.isInnerMapShow2!=undefined && $interactiveLeftMenu.ui.isInnerMapShow2 ) { //mng_s 그리드일 경우
							//교육정도별 및 혼인정도별 메뉴는 하이드 상태그래도 유지한다.
							$("#populationEduTab").hide();
							$("#populationMarryTab").hide();
						} else if( $interactiveLeftMenu.ui.isInnerMapShow3!=undefined && $interactiveLeftMenu.ui.isInnerMapShow3 ) { //mng_s 그리드일 경우
							//교육정도별 및 혼인정도별 메뉴는 하이드 상태그래도 유지한다.
							$("#populationEduTab").hide();
							$("#populationMarryTab").hide();
						} else {
							$("#populationEduTab").show();
							$("#populationMarryTab").show();
						}
						
					}
				});
				
				//2016.08.23 권차욱 9월 서비스 - 가구통계
				$("#household_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#householdOcptnTab").hide();
						$("#householdOcptnTab").next().hide();
						$("#householdOcptnTab").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						if ($("#householdOcptnTab").hasClass("on")) {
							$("#householdOcptnTab").click();
						}
					}else {
						
						//mng_s
						if( $interactiveLeftMenu.ui.isInnerMapShow2!=undefined && $interactiveLeftMenu.ui.isInnerMapShow2 ) { //mng_s 그리드일 경우
							
							$("#householdOcptnTab").hide();
							
						} else if( $interactiveLeftMenu.ui.isInnerMapShow3!=undefined && $interactiveLeftMenu.ui.isInnerMapShow3 ) { //mng_s 그리드일 경우
							
							$("#householdOcptnTab").hide();
							
						} else {
							$("#householdOcptnTab").show();
							
						}
						
					}
				});
				
				//2016.08.23 권차욱 9월 서비스 - 주택통계
				$("#house_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#householdOcptnTab").hide();
						$("#houseConstYearTab").hide();
						$("#houseConstYearTab").next().hide();
						$("#houseUsePeriodTab").show();
						$("#houseUsePeriodTab").next().hide();
						if ($("#houseConstYearTab").hasClass("on")) {
							$("#houseConstYearTab").click();
						}
						if ($("#houseUsePeriodTab").hasClass("on")) {
							$("#houseUsePeriodTab").click();
						}
					}else {
						var html = "";
						$("#houseConstYear").empty();
						switch(parseInt(this.value)) {
							case 2005:
                               	html  = '<option value="06">2005년</option>';
                               	html += '<option value="07">2000년~2004년</option>';
                               	html += '<option value="08">1995년~1999년</option>';
                               	html += '<option value="09">1990년~1994년</option>';
                               	html += '<option value="10">1980년~1989년</option>';
                               	html += '<option value="11">1970년~1979년</option>';
                               	html += '<option value="12">1960년~1969년</option>';
                               	html += '<option value="13">1959년 이전</option>';
                               	$("#houseConstYear").append(html);
                               	$("#houseConstYear").val("06"); //2005
								break;
							case 2000:
								html += '<option value="07">2000년~2004년</option>';
                               	html += '<option value="08">1995년~1999년</option>';
                               	html += '<option value="09">1990년~1994년</option>';
                               	html += '<option value="10">1980년~1989년</option>';
                               	html += '<option value="11">1970년~1979년</option>';
                               	html += '<option value="12">1960년~1969년</option>';
                               	html += '<option value="13">1959년 이전</option>';
                               	$("#houseConstYear").append(html);
                               	$("#houseConstYear").val("07"); //2000
								break;
							default:
								html += '<option value="01">2010년</option>';
                               	html += '<option value="02">2009년</option>';
                               	html += '<option value="03">2008년</option>';
                               	html += '<option value="04">2007년</option>';
                               	html += '<option value="05">2006년</option>';
                               	html += '<option value="06">2005년</option>';
                               	html += '<option value="07">2000년~2004년</option>';
                               	html += '<option value="08">1995년~1999년</option>';
                               	html += '<option value="09">1990년~1994년</option>';
                               	html += '<option value="10">1980년~1989년</option>';
                               	html += '<option value="11">1970년~1979년</option>';
                               	html += '<option value="12">1960년~1969년</option>';
                               	html += '<option value="13">1959년 이전</option>';
                               	$("#houseConstYear").append(html);
                               	$("#houseConstYear").val("01"); //2010
								break;
						}
	
						$("#householdOcptnTab").show();
						$("#houseConstYearTab").show();
						$("#houseConstYearTab").next().hide();
						$("#houseUsePeriodTab").hide();
						$("#houseUsePeriodTab").next().hide();
						if ($("#houseConstYearTab").hasClass("on")) {
							$("#houseConstYearTab").click();
						}
						if ($("#houseUsePeriodTab").hasClass("on")) {
							$("#houseUsePeriodTab").click();
						}
					}
				});
				
				//2016.08.23 권차욱 9월 서비스 - 결합통계
				$("#population_year_combine").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#populationEduTab_combine").hide();
						$("#populationMarryTab_combine").hide();
						$("#householdOcptnTab_combine").hide();
						$("#householdOcptnTab_combine").hide();
						$("#houseConstYearTab_combine").hide();
						$("#houseUsePeriodTab_combine").show();
						$("#populationEduTab_combine").next().hide();
						$("#populationMarryTab_combine").next().hide();
						$("#houseConstYearTab_combine").next().hide();
						$("#houseUsePeriodTab_combine").next().hide();
						
						$("#populationEduTab_combine").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						
						$("#populationMarryTab_combine").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						
						$("#householdOcptnTab_combine").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						
						if ($("#populationEduTab_combine").hasClass("on")) {
							$("#populationEduTab_combine").click();
						}
						
						if ($("#populationMarryTab_combine").hasClass("on")) {
							$("#populationMarryTab_combine").click();
						}
						
						if ($("#houseConstYearTab_combine").hasClass("on")) {
							$("#houseConstYearTab_combine").click();
						}
						
						if ($("#houseUsePeriodTab_combine").hasClass("on")) {
							$("#houseUsePeriodTab_combine").click();
						}
						
						if ($("#householdOcptnTab_combine").hasClass("on")) {
							$("#householdOcptnTab_combine").click();
						}
					}else {
						$("#populationEduTab_combine").show();
						$("#populationMarryTab_combine").show();
						$("#householdOcptnTab_combine").show();
						$("#householdOcptnTab_combine").show();
						$("#houseConstYearTab_combine").show();
						$("#houseConstYearTab_combine").next().hide();
						$("#houseUsePeriodTab_combine").hide();
						$("#houseUsePeriodTab_combine").next().hide();
						if ($("#houseConstYearTab_combine").hasClass("on")) {
							$("#houseConstYearTab_combine").click();
						}
						if ($("#houseUsePeriodTab_combine").hasClass("on")) {
							$("#houseUsePeriodTab_combine").click();
						}
					}
					var html = "";
					$("#houseConstYear_combine").empty();
					switch(parseInt(this.value)) {
						case 2005:
                           	html  = '<option value="06">2005년</option>';
                           	html += '<option value="07">2000년~2004년</option>';
                           	html += '<option value="08">1995년~1999년</option>';
                           	html += '<option value="09">1990년~1994년</option>';
                           	html += '<option value="10">1980년~1989년</option>';
                           	html += '<option value="11">1970년~1979년</option>';
                           	html += '<option value="12">1960년~1969년</option>';
                           	html += '<option value="13">1959년 이전</option>';
                           	$("#houseConstYear_combine").append(html);
                           	$("#houseConstYear_combine").val("06"); //2005
							break;
						case 2000:
							html += '<option value="07">2000년~2004년</option>';
                           	html += '<option value="08">1995년~1999년</option>';
                           	html += '<option value="09">1990년~1994년</option>';
                           	html += '<option value="10">1980년~1989년</option>';
                           	html += '<option value="11">1970년~1979년</option>';
                           	html += '<option value="12">1960년~1969년</option>';
                           	html += '<option value="13">1959년 이전</option>';
                           	$("#houseConstYear_combine").append(html);
                           	$("#houseConstYear_combine").val("07"); //2000
							break;
						default:
							html += '<option value="01">2010년</option>';
                           	html += '<option value="02">2009년</option>';
                           	html += '<option value="03">2008년</option>';
                           	html += '<option value="04">2007년</option>';
                           	html += '<option value="05">2006년</option>';
                           	html += '<option value="06">2005년</option>';
                           	html += '<option value="07">2000년~2004년</option>';
                           	html += '<option value="08">1995년~1999년</option>';
                           	html += '<option value="09">1990년~1994년</option>';
                           	html += '<option value="10">1980년~1989년</option>';
                           	html += '<option value="11">1970년~1979년</option>';
                           	html += '<option value="12">1960년~1969년</option>';
                           	html += '<option value="13">1959년 이전</option>';
                           	$("#houseConstYear_combine").append(html);
                           	$("#houseConstYear_combine").val("01"); //2010
							break;
					}
				});
		
				$("#mCSB_4_container").width("292px");
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
					if($("#menuAutoClose_radio").attr("checked") != "checked") {
						return;
					}
				}
				var time = 300;
			    var fx = '.quickBox'; 
			    var btn = '.sideQuick.sq02';
			    $(fx).queue("step04", function(){ 
			    	$(btn).stop().animate({"left":"840px"},time);
			        $(fx+'.step04').animate({"left":"-280px"}, time);    
			    }); 
			    $(fx).queue("step03", function(){
			        $(fx+'.step04').css({"left":"-280px"});
			        $(btn).stop().animate({"left":"560px"},time);
			        $(fx+'.step03').animate({"left":"-280px"}, time);    
			    }); 
			    $(fx).queue("step02", function(){
			        $(fx+'.step04, '+fx+'.step03').css({"left":"-280px"});
			        $(btn).stop().animate({"left":"280px"},time);
			        $(fx+'.step02').animate({"left":"-280px"}, time);
			        $(".quickBox.step02").removeClass("join");
			    }); 
			    $(fx).queue("step01", function(){
			        $(fx+'.step04, '+fx+'.step03, '+fx+'.step02').css({"left":"-280px"});
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
			 * @date         : 2015. 10. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			//2016.09.08 9월 추가분 
			slideValue : function(from, to, slider, etc, limit) {
			    var domFrom = "#"+from;
			    var domTo = "#"+to;
			    var domSlider = slider;
			    var min = 1;
			    //9월서비스 20160729 권차욱 수정
			    var step = 1;
			    var tmpValues = null;
			    var tmpHouseSpaceList = [0, 20, 40, 60, 85, 100, 130, 165, 230, 300];
			    var values = null;
			    
			    if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
			    	min = 0;
			    	
			    	//9월서비스 20160729 권차욱 수정
			    	step = 5;
			    	values = [10, 65];
			    }else if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
			    	min = 0;
			    	
			    	//9월서비스 20160729 권차욱 수정
			    	step = 1;
			    	values = [0, 1];
			    }
			    
			    var data = 0;
				for (var i=min; i<=limit; i++) {
					//9월서비스 20160729 권차욱 수정
					if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
						data = i;
						if (i != 0 && i%5 != 0) {
							continue;
						}
					}
					var tmpText = i + etc;
					if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
						data = tmpHouseSpaceList[i];
					    tmpText = tmpHouseSpaceList[i]+etc;
					}
					if (i == limit) {
						tmpText = (limit-5)+"+"; //2016.10.19 lbdms
						if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
							tmpText = tmpHouseSpaceList[i-1]+"+";
						}
					} 
					
			        $(domFrom).append($("<option>", { 
			            value: data,
			            text : tmpText
			        }));
			        $(domTo).append($("<option>", { 
			            value: data,
			            text : tmpText
			        }));
			    }
				
				if (from == "populationAgeFrom" 		|| 
					from == "populationAgeFrom_combine" || 
					from == "3fAgeFrom") {
					$(domFrom).val("10");
			    	$(domTo).val("65");
				}else {
					$(domFrom).val("0");
			    	$(domTo).val("20");
			    	$("."+from).text("약 "+(0/3.3).toFixed(1)+"평");
				    $("."+to).text("약 "+(20/3.3).toFixed(1)+"평");
				}
				
				//2016.09.09 9월 서비스
			    $(domFrom).change(function(){
			    	var spaceTo = $(domTo).val();
			    	var id = $(this).attr("id");

			    	if (id == "populationAgeFrom" 		  || 
			    		id == "populationAgeFrom_combine" || 
			    		id == "3fAgeFrom") {
				        if (parseInt($(this).val()) >= parseInt(spaceTo)) {
				        	 $(this).val(parseInt(spaceTo)-5);
				        	 
				        }
				        $(domSlider).slider("values", 0, $(this).val());
			    	}else if (id == "houseBdspaceFrom" || 
			    			  id == "houseBdspaceFrom_combine") {
			    		if (parseInt($(this).val()) >= parseInt(spaceTo)) {
			    			var idx = $(domTo).prop("selectedIndex");
				    		idx = idx-1;
				    		var toData = $(domTo+ " option:eq("+idx+")").val();
				        	$(this).val(toData);
				        }
			    		var idx = 0;
			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
			    			if (tmpHouseSpaceList[i] == $(this).val()) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    		$(domSlider).slider("values", 0, idx);
			    		$("."+from).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
			    	}

			    	//2016.09.09 9월 서비스 
			        var fromData = $(this).val();
			        $(domTo+ " option").each(function() {
			        	$(this).show();
			        	if (parseInt(fromData) >= parseInt($(this).val())) {
			        		$(this).hide();
			        	}
			        });
			    });
			    //2016.09.09 9월 서비스
			    $(domTo).change(function(){
			        var spaceFrom = $(domFrom).val();
			        var id = $(this).attr("id");
			        
			        if (id == "populationAgeTo" 		|| 
				    	id == "populationAgeTo_combine" || 
				    	id == "3fAgeTo") {
			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
				            $(this).val(parseInt(spaceFrom)+5);
				        }
			        	
			        	//2016.10.19 lbdms
			        	if (parseInt($(this).val()) > 100) {
			        		$(domTo).hide();
			        		if (id == "populationAgeTo") {
			        			$("#ageToText").hide();
			        		}else if (id == "populationAgeTo_combine") {
			        			$("#ageToText_combine").hide();
			        		}else {
			        			$("#3fAgeToText").hide();
			        		}
			        	}else {
			        		$(domTo).show();
			        		if (id == "populationAgeTo") {
			        			$("#ageToText").show();
			        		}else if (id == "populationAgeTo_combine") {
			        			$("#ageToText_combine").show();
			        		}else {
			        			$("#3fAgeToText").show();
			        		}
			        	}
			        	$(domSlider).slider("values", 1,  $(this).val());
			        }else if (id == "houseBdspaceTo" || 
			    			  id == "houseBdspaceTo_combine") {
			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
			        		var idx = $(domFrom).prop("selectedIndex");
				    		idx = idx+1;
				    		var fromData = $(domFrom+ " option:eq("+idx+")").val();
				        	$(this).val(fromData);
			        	}
			        	var idx = 0;
			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
			    			if (tmpHouseSpaceList[i] == $(this).val()) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    		$(domSlider).slider("values", 1, idx);
			        	$("."+to).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
			        }
			    });
			    
			    //2016.09.09 9월 서비스 
			    $(domTo).click(function(){
			    	 var fromData = $(domFrom).val();
			    	 $(domTo+ " option").each(function() {
				        $(this).show();
				        if (parseInt(fromData) >= parseInt($(this).val())) {
				        	$(this).hide();
				        }
				      });
			    });
			    $(domSlider).slider({
			        range: true,
			        min: min,
			        max: limit,
			        
			        //9월서비스 20160729 권차욱 수정
			        step : step,
			        
			        values : values,
			        slide : function(e, ui) {
			        	if (from == "populationAgeFrom" 		|| 
			        		from == "populationAgeFrom_combine" || 
			        		from == "3fAgeFrom" ) {
			        		//2016.10.19 lbdms
			        		if (ui.values[1] == limit) {
			        			$(domTo).hide();
			        			if (from == "populationAgeFrom") {
			        				$("#ageToText").hide();
			        			}else if (from == "populationAgeFrom_combine") {
			        				$("#ageToText_combine").hide();
			        			}else {
			        				$("#3fAgeToText").hide();
			        			}					    	
			        		}else {
			        			$(domTo).show();
			        			if (from == "populationAgeFrom") {
			        				$("#ageToText").show();
			        			}else if (from == "populationAgeFrom_combine") {
			        				$("#ageToText_combine").show();
			        			}else {
			        				$("#3fAgeToText").show();
			        			}					    	
			        		}
			        		
			        		$(domFrom).val(ui.values[0]);
						    $(domTo).val(ui.values[1]);	
						    
			        	}else if (from == "houseBdspaceFrom"  || from == "houseBdspaceFrom_combine") {
				        	if (ui.values[1] == limit) {
				        		$(domTo).hide();
				        		if (from == "houseBdspaceFrom") {
				        			$("#houseBdspaceToText").hide();
								    $(".houseBdspaceToText").hide();
								    $(".houseBdspaceTo").hide();
				        		}else {
				        			$("#houseBdspaceToText_combine").hide();
								    $(".houseBdspaceToText_combine").hide();
								    $(".houseBdspaceTo_combine").hide();
				        		}
				        	}else {
				        		$(domTo).show();
				        		if (from == "houseBdspaceFrom") {
				        			$("#houseBdspaceToText").show();
								    $(".houseBdspaceToText").show();
								    $(".houseBdspaceTo").show();
				        		}else {
				        			$("#houseBdspaceToText_combine").show();
								    $(".houseBdspaceToText_combine").show();
								    $(".houseBdspaceTo_combine").show();
				        		}
				        	}
				        		
				        	$(domFrom).val(tmpHouseSpaceList[ui.values[0]]);
							$(domTo).val(tmpHouseSpaceList[ui.values[1]]);	
							$("."+from).text("약 "+(tmpHouseSpaceList[ui.values[0]]/3.3).toFixed(1)+"평");
					        $("."+to).text("약 "+(tmpHouseSpaceList[ui.values[1]]/3.3).toFixed(1)+"평");
				        }
			        },
			        //9월서비스 20160729 권차욱 수정
			        start : function(e, ui) {
			        	if (from == "populationAgeFrom" 		|| 
				        	from == "populationAgeFrom_combine" || 
				        	from == "3fAgeFrom"         		|| 
				        	from == "houseBdspaceFrom"  		|| 
				        	from == "houseBdspaceFrom_combine") {
			        		tmpValues = ui.values;
			        	}
			        },
			        stop : function(e, ui) {
			        	if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
			        		if (ui.values[0] == ui.values[1]) {
			        			if (tmpValues[0] != ui.values[0]) {
			        				$(domSlider).slider("values", 0, ui.values[1]-5);
			        				$(domFrom).val(ui.values[1]-5);
								    $(domTo).val(ui.values[1]);	
			        			}else {
			        				$(domSlider).slider("values", 1, ui.values[0]+5);
			        				$(domTo).val(ui.values[0]+5);
								    $(domFrom).val(ui.values[0]);	
			        			}
				        	}
			        	}else if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
			        		if (ui.values[0] == ui.values[1]) {
			        			if (tmpValues[0] != ui.values[0]) {
			        				$(domSlider).slider("values", 0, ui.values[1]-1);
			        				$(domFrom).val(tmpHouseSpaceList[ui.values[1]-1]);
								    $(domTo).val(tmpHouseSpaceList[ui.values[1]]);	
			        			}else {
			        				$(domSlider).slider("values", 1, ui.values[0]+1);
			        				$(domTo).val(tmpHouseSpaceList[ui.values[0]+1]);
								    $(domFrom).val(tmpHouseSpaceList[ui.values[0]]);	
			        			}
				        	}
			        	}
			        }
			    });
 			},
			
			/**
			 * 
			 * @description  : 통계버튼 색상 효과.
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
			
			/**
			 * 
			 * @description  : 산업분류 목록 트리 width & scroll.
			 * @date         : 2015. 10. 16. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			companyListTreeWidth : function() {
				$("#company_TreeBox").css("width","230px"); 
			    var stepWidth = $("#company_TreeBox > ul").prop("scrollWidth");
			    $("#company_TreeBox").css({"width":parseInt(stepWidth)+"px"});
			    $(".normalBox").mCustomScrollbar("update");
			},
			
			/**
			 * 
			 * @description  : 테마 목록 트리 width & scroll.
			 * @date         : 2015. 10. 16. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			companyThemeTreeWidth : function() {
				$("#company_themeTreeBox").css("width","230px"); 
			    var stepWidth = $("#company_themeTreeBox > ul").prop("scrollWidth");
			    $("#company_themeTreeBox").css({"width":parseInt(stepWidth)+"px"});  
			    $(".normalBox").mCustomScrollbar("update");
			},
			
			/**
			 * 
			 * @description  : 테마 목록 트리 width & scroll.
			 * @date         : 2015. 10. 16. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			kosisTreeWidth : function() {
				$("#kosisStatsTree").css("width","230px");
				var stepWidth = $("#kosisStatsTree > ul").prop("scrollWidth");
			    $("#kosisStatsTree").css({"width":parseInt(stepWidth)+"px"});  
			    $(".normalBox").mCustomScrollbar("update");
			    //IE에서 width가 50이 되는 현상 수정
			    if(stepWidth == 0 || stepWidth == undefined) {
			    	$(".quickBox.step02").find(".mCSB_container").css({"width":"270px"});	
			    } else {
			    	$(".quickBox.step02").find(".mCSB_container").css({"width":(parseInt(stepWidth)) + 50 + "px"});
			    }
			    $(".quickBox.step02").find(".mCSB_container").mCustomScrollbar("update");
			},
			
			//집계구 번호 검색
			outputAreaSearch : function() {
				if($interactiveLeftMenu.event.marker != null){
					$interactiveLeftMenu.event.marker.remove();
					$interactiveLeftMenu.event.marker = null;
				}
				var tot_reg_cd = $("#outputArea").val().replace(/ /gi,"");
				var regNumber = /^[0-9]*$/;
				if(!regNumber.test(tot_reg_cd)){
					alert('숫자를 입력해주세요.');
					return;
				}
				if(tot_reg_cd.length > 13 || tot_reg_cd.length < 13){
					alert('13자리의 숫자가 맞는지 확인해주세요.');
					return;
				}
				jQuery.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/map/interactive/outputAreaSearch.json",
			 		data:{	
			 				"tot_reg_cd": tot_reg_cd	 				
			 			  },
			 		success:function(res){
			 			var result = res.result;
			 			if(result == undefined){
			 				alert("없는 집계구코드 입니다.");
			 				return;
			 			}
			 			var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
			 			map.mapMove([ result.x_coor, result.y_coor ], 10);
			 			
// 						//색상지도 표시
//			 			setTimeout(function(){
//							map.geojson.eachLayer(function(layer) {
//								if(layer.feature.properties.adm_cd == tot_reg_cd){
//									layer.setStyle({
//										weight : 5,
//										color : "#0086c6",
//										fillOpacity : 0.5,
//										fillColor : "#9adbf9"
//									});
//								}
//							});
//			 			},500);
			 			
			 			// poi 표시
						setTimeout(function(){
							map.geojson.eachLayer(function(layer) {
								if(layer.feature.properties.adm_cd == tot_reg_cd){
									$interactiveLeftMenu.event.marker = sop.marker([ result.x_coor, result.y_coor ]);		
									$interactiveLeftMenu.event.marker.addTo(map.gMap);
									var toolTip  = "<table style='margin:10px;'>";
									toolTip += 		"<tr><td style='font-size: 14px; font-weight:bold; color:#3792DE;'>" + layer.feature.properties.adm_nm+"</td></tr>";
									toolTip += 		"<tr style='height:5px;'></tr>";
									toolTip += 		"<tr><td style='font-size: 12px; padding-left: 5px;'>집계구 : " + layer.feature.properties.adm_cd+"</td></tr>";
									toolTip +=		"</table>";
									$interactiveLeftMenu.event.marker.bindToolTip(toolTip,{
										minWidth:200,
										maxWidth:200,
										maxHeight:500
									});
								}
							});
						},500);
			 		}
				});
			}
	};
	
	/** ********* 산업분류 검색 목록 Start ********* */
	$class("sop.portal.corpClassSearch.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			$("#company_TreeBox").hide();
			$("#company_SearchBox").show();
			if(res.errCd == "0") {
				//총 개수
				$("#companySearchCount").text(result.totalcount);
				$("#companySearchDataList").html("");
				var html = "";
				for(var i = 0; i < result.dataList.length; i ++) {
					var data = result.dataList[i];
					html += "<li>";
					html += "	<input type='checkbox' name='rd_company_data' id='rd_company_data_"+(i+1)+"' value='"+data.class_code+"' />";
					html += "	<label for='rd_company_data_"+(i+1)+"'>"+data.class_nm+"</label>";
					html += "</li>";
				}
				$("#companySearchDataList").html(html);
				
				if(result.totalcount > 5){
	    			var htmlPage = "<br><br><br><div id='corpClassPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
	    			$("#companyTablePage").html(htmlPage);
	    		}
	    		$interactiveLeftMenu.ui.companyPaging(result.totalcount, $interactiveLeftMenu.ui.corpClassNum);
			} else {
				//총 개수
				$("#companySearchCount").text(0);
				$("#companySearchDataList").html("");
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* 산업분류 검색 목록 End ********* */
	
}(window, document));