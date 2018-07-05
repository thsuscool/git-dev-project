/**
 * 통계 소통지도 등록화면에서 즐겨찾기 추가
 * 
 * history : (주)유코아시스템, 1.0, 2016/10/14  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$communityCreateHistory = W.$communityCreateHistory || {};
	$communityCreateHistory = {
		ui:{
			industryTree : null,
			kosisTree : null,
			selectNode : null,
			/**
			 * @name             : majorParameters
			 * @description      : 총조사 주요지표 파라미터 생성
			 * @date             : 2016. 10. 18. 
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param parameters : parameters
			 * @param map        : 지도 객체
			 * @param adm_cd     : 행정동 코드
			 */
			majorParameters : function(parameters,map,adm_cd){
				var item = $("#history-menu-depth-major").find("input[name]:radio:checked");
				if(item.length>0){
					var year;
					if(item.val()==="corp_cnt"){
						parameters.maxYear = $("#mainIndex_corp_year:first").val();
						year = $("#mainIndex_corp_year").val();
					}else{
						parameters.maxYear = $("#mainIndex_year:first").val(); 
						year = $("#mainIndex_year").val();
					}
					parameters.showData = item.val();
					parameters.unit = item.data("unit");
					parameters.title = item.data("show-name");
					parameters.api_id = "API_0301";
					parameters.paramInfo = {
						"low_search":"1",
						"adm_cd":adm_cd,
						"bnd_year":map.bnd_year,
						"year":year
					};
				}else{
					$communityMapCommon.alert("알림","주요지표를 선택하세요.");
					return {"continue":false};
				}
				return {"continue":true,"url":$communityMapApi.request.API_0301_URL};
			},
			/**
			 * @name             : populationParameters
			 * @description      : 인구주택총조사 파라미터 생성
			 * @date             : 2016. 10. 18. 
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param parameters : parameters
			 * @param map        : 지도 객체
			 * @param adm_cd     : 행정동 코드
			 */
			populationParameters : function(parameters,map,adm_cd){
				var api = $("#populationTabDiv>li.on>a").data("id");
				var url;
				if(api==="API_4011"){//결합조건
					url = $communityMapApi.request[$("#populationTabDiv>li.on>a").data("id")+"_URL"];
					var combineBase = $("input[name=rd_combine_base]:checked");
					if($communityMapCommon.hasText(combineBase.val())){
						parameters.btntype = "items";
						parameters.maxYear = $("#population_year_combine>option:first").val();
						parameters.showData = "data_cnt";
						parameters.title = "";
						if(combineBase.val() == "population") {
							parameters.unit = "명";
						} else if(combineBase.val() == "household") {
							parameters.unit = "가구";
						} else if(combineBase.val() == "house") {
							parameters.unit = "호";
						}
						parameters.paramInfo = {
							"area_type":"0",
							"low_search":"1",
							"adm_cd":adm_cd,
							"bnd_year":map.bnd_year,
							"year":$("#population_year_combine").val(),
							"combine_base" : combineBase.val()
						};
						createPopulationOption(true,parameters);
						createHouseholdOption(true,parameters);
						createHouseOption(true,parameters);
					}else{
						$communityMapCommon.alert("알림","조사 기준은 필수입니다.");
						return {"continue":false};
					}
				}else{
					url = $communityMapApi.request[$("#populationTabDiv>li.on>a").data("id")+"_URL"];
					parameters.api_id = api;
					if(api==="API_0302"){//인구조건
						parameters.maxYear = $("#population_year>option:first").val();
						parameters.showData = "population";
						parameters.unit = "명";
						parameters.title = $("input[name=population_gender]:radio:checked").data("show-name");
						parameters.paramInfo = {
							"area_type":"0",
							"low_search":"1",
							"adm_cd":adm_cd,
							"bnd_year":map.bnd_year,
							"year":$("#population_year").val(),
							"gender" : $("input[name=population_gender]:radio:checked").val()
						};
						createPopulationOption(false,parameters);
					}else if(api==="API_0305"){//가구조건
						parameters.maxYear = $("#household_year>option:first").val();
						parameters.showData = "household_cnt";
						parameters.unit = "가구";
						parameters.title = "가구수";
						parameters.paramInfo = {
							"area_type":"0",
							"low_search":"1",
							"adm_cd":adm_cd,
							"bnd_year":map.bnd_year,
							"year":$("#household_year").val()
						};
						createHouseholdOption(false,parameters);
					}else if(api==="API_0306"){//주택조건
						parameters.maxYear = $("#house_year>option:first").val();
						parameters.showData = "house_cnt";
						parameters.unit = "호";
						parameters.title = "주택수"
						parameters.paramInfo = {
							"area_type":"0",
							"low_search":"1",
							"adm_cd":adm_cd,
							"bnd_year":map.bnd_year,
							"year":$("#house_year").val()
						};
						createHouseOption(false,parameters);
					}else{
						return {"continue":false};
					}
				}
				return {"continue":true,"url":url};
			},
			/**
			 * @name             : 3fFishParameters
			 * @description      : 농림어업총조사 파라미터 생성
			 * @date             : 2016. 10. 18. 
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param parameters : parameters
			 * @param map        : 지도 객체
			 * @param adm_cd     : 행정동 코드
			 */
			"3fFishParameters" : function(parameters,map,adm_cd){
				parameters.maxYear = $("#3f_year>option:first").val();
				parameters.showData = "population";
				parameters.unit = "명";
				parameters.title = "인구"
				parameters.paramInfo = {
					"area_type":"0",
					"low_search":"1",
					"adm_cd":adm_cd,
					"bnd_year":map.bnd_year,
					"year":$("#3f_year").val()
				};
				if($("#3fTabDiv>li.on>a").data("id")=="farm"){//농가
					parameters.paramInfo.data_type = "1";
				}else if($("#3fTabDiv>li.on>a").data("id")=="forest"){//임가
					parameters.paramInfo.data_type = "2";
				}else if($("#3fTabDiv>li.on>a").data("id")=="fish"){//어가
					parameters.paramInfo.data_type = $("input[name=3f_fish_ppl]:radio:checked").val();
				}
				addMultipleOption(parameters,"gender","radio","3fGenderTab","3f_gender01");
				if($("#3fAgeTab>input:checkbox").is(":checked")){
					var age_from = $("#3fAgeFrom").val();
					var age_to = parseInt($("#3fAgeTo").val())>100?$("#3fAgeTo").val():(parseInt($("#3fAgeTo").val())-1).toString();
					parameters.paramInfo.age_from = age_from;
					parameters.paramInfo.age_to = age_to;
					parameters.title = age_from+"세~"+age_to+"세 + "+parameters.title;
				}
				return {"continue":true,"url":$communityMapApi.request.API_0310_URL};
			},
			/**
			 * @name             : companyParameters
			 * @description      : 전국사업체조사 파라미터 생성
			 * @date             : 2016. 10. 18. 
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param parameters : parameters
			 * @param map        : 지도 객체
			 * @param adm_cd     : 행정동 코드
			 */
			companyParameters : function(parameters,map,adm_cd){
				var url;
				parameters.paramInfo = {
					"low_search":"1",
					"adm_cd":adm_cd,
					"bnd_year":map.bnd_year,
					"year":$("#company_year").val()
				};
				if($("#companyTabDiv>li.on>a").data("id")==="industry"){
					var item = $("input[name=cDataType]:radio:checked");
					parameters.maxYear = $("#company_year:first").val();
					parameters.showData = item.val();
					parameters.unit = item.data("unit");
					parameters.title = item.data("show-name");
					if($("#company_TreeBox").is(":visible")){
						if($communityCreateHistory.ui.selectNode.cd == null){
							url = $communityMapApi.request.API_0301_URL;
							parameters.api_id = "API_0301";
							parameters.title="전산업 "+parameters.title;
						}else{
							url = $communityMapApi.request.API_0304_URL;
							parameters.api_id = "API_0304";
							parameters.paramInfo.area_type = "0";
							parameters.paramInfo.class_code = $communityCreateHistory.ui.selectNode.cd;
							parameters.title=$communityCreateHistory.ui.selectNode.text+" "+parameters.title;
						}
					}else if($("#company_SearchBox").is(":visible")){
						if($("input[name=rd_company_data]:radio:checked").length>0){
							url = $communityMapApi.request.API_0304_URL;
							parameters.api_id = "API_0304";
							parameters.paramInfo.area_type = "0";
							parameters.paramInfo.class_code = $("input[name=rd_company_data]:radio:checked").val();
							parameters.title=$("input[name=rd_company_data]:radio:checked").parent().children("label").text()+" "+parameters.title;
						}else{
							$communityMapCommon.alert("알림","산업분류 목록을 선택하세요.");
							return {"continue":false};
						}
					}
				}else if($("#companyTabDiv>li.on>a").data("id")==="theme"){
					var item = $("input[name=cDataType1]:radio:checked");
					if($("input[name=theme_codes]:radio:checked").length>0){
						url = $communityMapApi.request.API_0304_URL;
						parameters.api_id = "API_0304";
						parameters.showData = item.val();
						parameters.unit = item.data("unit");
						parameters.title = $("label[for="+$("input[name=theme_codes]:radio:checked").attr("id")+"]").text()+" "+item.data("show-name");
						parameters.paramInfo.area_type = "0";
						parameters.paramInfo.theme_cd = $("input[name=theme_codes]:radio:checked").val();
					}else{
						$communityMapCommon.alert("알림","테마코드를 선택하세요.");
						return {"continue":false};
					}
				}
				return {"continue":true,"url":url};
			},
			/**
			 * @name             : kosistreeParameters
			 * @description      : kosis 파라미터 생성
			 * @date             : 2016. 10. 26. 
			 * @author	         : 나광흠
			 * @history 	     :
			 * @param parameters : parameters
			 * @param map        : 지도 객체
			 * @param adm_cd     : 행정동 코드
			 */
			kosistreeParameters : function(parameters,map,adm_cd){
				parameters.paramInfo = {
					org_id : $("#history-menu-depth-kosis>input[name=org_id]").val(),
					tbl_id : $("#history-menu-depth-kosis>input[name=tbl_id]").val(),
					field_id : $("#history-menu-depth-kosis>input[name=field_id]").val(),
					obj_var_id : $("#history-menu-depth-kosis>input[name=obj_var_id]").val(),
					gis_se : "1",
//					gis_se : parseInt($("#history-menu-depth-kosis>input[name=gis_se]").val()),
					kosis_data_item : $("#history-menu-depth-kosis select[name=kosisDetail]").val(),
					kosis_data_year : $("#history-menu-depth-kosis select[name=kosisYear]").val(),
					kosis_data_period : $("#history-menu-depth-kosis select[name=kosisPeriod]").val()
				};
				parameters.isKosis = true;
				parameters.mapInfo.zoomlevel = 2;
				var optionTitle = [];
				$.each($("#kosisDataFieldTable>p.option"),function(cnt,node){
					optionTitle.push($(node).children("span").text().replace(/^\s+|\s+$/g,'')+"("+$(node).children("select").children("option:selected").data("original-text")+")");
				});
				parameters.title = $("#history-menu-depth-kosis>input[name=title]").val()+" > "+$("#history-menu-depth-kosis select[name=kosisDetail]>option:selected").text().replace(/^\s+|\s+$/g,'')+" > "+optionTitle.join()+"("+$("#history-menu-depth-kosis select[name=kosisYear]>option:selected").text()+")";
				var kosis_data_item_detail = [];
				$.each($("#kosisDataFieldTable>p.option>select"),function(){
					kosis_data_item_detail.push($(this).attr("name")+"::"+$(this).val());
				});
				if($communityMapCommon.hasText(kosis_data_item_detail)){
					parameters.paramInfo.kosis_data_item_detail = kosis_data_item_detail.join();
				}
				$.ajax({
					url : kosisApiPath+"/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do",
					type:"POST",
					data: parameters.paramInfo,
					async: false,
					dataType:"json",
					success: function(res){
						if(res.errCd == "0"){
							if($communityMapCommon.hasText(res.result.kosisData)&&$communityMapCommon.hasText(res.result.kosisData[0].UNIT)){
								parameters.unit = res.result.kosisData[0].UNIT;
							}
						}else{
							$communityMapCommon.alert("알림", res.errMsg);
						}
					},
					error: function(data){
						$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
						return false;
					}
				});
				parameters.paramInfo.adm_cd = "00";
				return {"continue":true,"url":"/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do"};
			}
		}
	};
	$communityCreateHistory.event = {	
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 10. 14. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			//즐겨찾기 만들기 버튼 클릭 이벤트
			$("#create-history").click(function(){
				$("#history-menu-box>div,#history-depth-1-menu>li").removeClass("M_on");
				$("#history-menu-box,#history-depth-1,#history-menu-depth-major,#history-depth-1-menu>li:first").addClass("M_on");
				$(".totalResult").show();
				$("body, html").animate({
					scrollTop: $("#header_cm_step2").offset().top-20
				}, 450);
			});
			
			//대메뉴 선택 이벤트
			$("#history-depth-1-menu a").click(function(){
				$("#history-depth-1-menu>li").removeClass("M_on");
				$(this).parent("li").addClass("M_on");
				$("div[id^=history-menu-depth]").removeClass("M_on");
				var menuEvent = $communityCreateHistory.event[$(this).data("id")];
				if(menuEvent&&menuEvent.init){
					menuEvent.init();
				}
				$("#history-menu-depth-"+$(this).data("id")).addClass("M_on");
				return false;
			});
			var checkboxClick = true;
			//검색 옵션 체크박스 둘러싸고 있는 a 이벤트
			$(".roundTextBox").click(function(e){
				if(!checkboxClick){
					$(this).children("input:checkbox").prop("checked",!$(this).children("input:checkbox").is(":checked")).trigger("change");
				}
				checkboxClick = false;
			});
			//검색 옵션 체크박스 이벤트
			$("#history-menu-box").on("click",".roundTextBox>input:checkbox",function(){
				checkboxClick = true;
			}).on("change",".roundTextBox>input:checkbox",function(){
				var options = $(this).parent("a").next(".joinDefault");
				if($(this).is(":checked")){
					$(this).parent("a").addClass("on").next(".joinDefault").show();
					options.find("input:radio:first").prop("checked",true).trigger("change");
					options.find("input:checked").prop("checked",false).trigger("change");
				}else{
					$(this).parent("a").removeClass("on").next(".joinDefault").hide();
					options.find("input:radio,input:checked").prop("checked",false).trigger("change");
				}
			});
			//툴팁 재설정
			$("#fusionHouse>.joinDefault a[data-subj]").tooltip({
				open: function( event, ui ) {
					$(".ui-tooltip .subj").text($(this).attr("data-subj"));
				},
				position: {my: "right+100 top+30", at: "right top",using: function( position, feedback ) {
					if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
						$( this ).css( position ).prepend("<span class='subj'></span>");
					}else {
						$( this ).css( position ); 
					}
					$( "<div>" ).addClass( feedback.vertical ).addClass( feedback.horizontal ).appendTo( this );
				}}
			});
			
			//검색 아이템 라디오 버튼 이벤트
			$("#history-menu-box").on("change","input[name]:radio",function(){
				$("label[for^="+$(this).attr("name")+"]").removeClass("on");
				$("label[for="+$(this).attr("id")+"]").addClass("on");
			});
			
			//검색 아이템 체크박스 이벤트
			$("#history-menu-box").on("change","input[name]:checkbox",function(){
				if($(this).is(":checked")){
					$("label[for="+$(this).attr("id")+"]").addClass("on");
				}else{
					$("label[for="+$(this).attr("id")+"]").removeClass("on");
				}
			});
			
			//슬라이드 세팅
			slideValue("populationAgeFrom", "populationAgeTo", "#slider-range2", "세", 105);
			slideValue("houseBdspaceFrom", "houseBdspaceTo", "#slider-range3", "㎡", 9); 
			slideValue("3fAgeFrom", "3fAgeTo", "#slider-range4", "세", 105);
			slideValue("populationAgeFrom_combine", "populationAgeTo_combine", "#slider-range2_combine", "세", 105);
			slideValue("houseBdspaceFrom_combine", "houseBdspaceTo_combine", "#slider-range3_combine", "㎡", 9);
			
			//년도 추가 시작
			createSelectYear();
			//메뉴에 대한 초기 이벤트
			$communityCreateHistory.event.major.event();
			$communityCreateHistory.event.population.event();
			$communityCreateHistory.event["3fFish"].event();
			$communityCreateHistory.event.company.event();
			$communityCreateHistory.event.companytree.event();
			$communityCreateHistory.event.kosistree.event();
			
			//즐겨찾기 버튼 클릭 이벤트
			$("#history-menu-box .Finish").click(function(){
				var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
				var center = map.gMap.getCenter();
				var adm_cd = $communityMapCommon.hasText($communityMap.ui.curAdmCd)?$communityMap.ui.curAdmCd:"00";
				var url,parameters = {
					"mapInfo": {
						"center": $communityMap.ui.curCenter,
						"zoomlevel": $communityMap.ui.curZoom
					},
					"legend": {
						"level": map.legend.lv,
						"color": map.legend.legendColor,
						"type": map.legend.selectType
					},
					"btntype": "normal",
					"isKosis": false,
				};
				if($communityCreateHistory.ui[$("#history-depth-1-menu li.M_on>a").data("id")+"Parameters"]){
					var obj = $communityCreateHistory.ui[$("#history-depth-1-menu li.M_on>a").data("id")+"Parameters"](parameters,map,adm_cd);
					url = obj.url;
					if(!obj["continue"]){
						return false;
					}
				}else{
					return false;
				}
				var title = parameters.title.split("+");
				var titleArray = [];
				$.each(title,function(cnt,node){
					if(node.replace(/ /gi,"")!=""){
						titleArray.push(node);
					}
				});
				parameters.title = titleArray.join("+");
				$("#bookmarkdlg").css({"top":$(document).scrollTop()+100});
				$(".deem,#bookmarkdlg").show();
				$("#savesubj").val(parameters.title).focus();
				$("#history-save-button").off("click").click(function(){
					var params = [{
						url : url,
						params : parameters
					}];
					if($communityMapCommon.hasText($("#savesubj").val())){
						$.ajax({
							url : contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							type:"POST",
							data: {
								hist_id : makeRandomThirtySevenDigitString(),
								hist_type : "BMARK",
								map_type : "IMAP",
								params : JSON.stringify(params),
								hist_nm : $("#savesubj").val()
							},
							async: false,
							dataType:"json",
							success: function(res){
								if(res.errCd == "0"){
									var today = new Date();
									$("#map-history").prepend(
										$("<li/>").append(
											$("<label/>",{"title":res.result.hist_nm}).append(
												$("<input/>",{
													"id":"history-row-"+res.result.hist_id,
													"data-title":res.result.hist_nm,
													"name":"stats",
													"type":"checkbox",
													"value":res.result.hist_id
												}),
												res.result.hist_nm.substring(0,14)+(res.result.hist_nm.length>14?"...":"")
											),
											$("<span/>",{"text":today.getFullYear()+"."+((today.getMonth()+1)<10?"0":"")+(today.getMonth()+1)+"."+today.getDate()})
										)
									);
									$(".deem,#bookmarkdlg").hide();
									$("#history-menu-box,#history-menu-box>div").removeClass("M_on");
									$communityMapCommon.alert("알림", "저장되었습니다",function(){
										$("#history-row-"+res.result.hist_id).focus();
									});
								}else{
									$communityMapCommon.alert("알림", res.errMsg);
								}
							},
							error: function(data){
								$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
								return false;
							}
						});
					}else{
						$communityMapCommon.alert("알림","즐겨찾기 저장 제목을 작성해주세요",function(){
							$("#savesubj").focus();
						});
					}
				});
			});
		},
		//총조사 주요지표
		major : {
			init : function(){
				changeFirstSelectOption($("#mainIndex_year"));
				changeFirstSelectOption($("#mainIndex_corp_year"));
				$("#mainIndex_box1 input[name=mainIndex_radio]:radio:first").prop("change",true).trigger("change");
			},
			event : function(){
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
						
						$("#mainIndex_radio12").closest('li').hide();
						$("#mainIndex_radio13").closest('li').hide();

					}else {
						$("#mainIndex_box2").show();
						$("#mainIndex_radio12").closest('li').show();
						$("#mainIndex_radio13").closest('li').show();
					}
				});
			}
		},
		//인구주택총조사
		population : {
			init : function(){
				$("#populationTabDiv a:first").trigger("click");
			},
			event : function(){
				//인구주택 총조사 탭 이벤트
				$("#populationTabDiv a").off("click").click(function(){
					changeFirstSelectOption($("#"+$(this).data("id")).find("select[id$=year]"));
					$("#history-menu-depth-population .totalResult>div[id^=API_]").hide();
					$("#"+$(this).data("id")).show();
					$("#populationTabDiv>li").removeClass("on");
					$(this).parent("li").addClass("on");
					$("#history-menu-depth-population .roundTextBox input:checkbox").prop("checked",false).trigger("change");
					if($(this).data("id")==="API_4011"){
						$("#history-menu-depth-population").addClass("join");
					}else{
						$("#history-menu-depth-population").removeClass("join");
					}
					return false;
				});
				//인구조건>성별 라디오 버튼 
				$("input[name=mainIndex_radio]:radio").off("change").change(function(){
					$("#API_0301 label[for^=mainIndex_radio]").removeClass("on");
					$("label[for="+$(this).attr("id")+"]").addClass("on");
				});
				//인구조건 조사년도 변경 이벤트
				$("#population_year").off("change").change(function(){
					if (parseInt($(this).val()) > 2010){
						$("#populationEduTab,#populationMarryTab").hide().find("input:checkbox").prop("checked",false).trigger("change");
					}else {
						$("#populationEduTab,#populationMarryTab").show().find("input:checkbox").prop("checked",false).trigger("change");
					}
				});
				//가구조건 조사년도 변경 이벤트
				$("#household_year").off("change").change(function(){
					if (parseInt($(this).val()) > 2010){
						$("#householdOcptnTab").hide().find("input:checkbox").prop("checked",false).trigger("change");
					}else {
						$("#householdOcptnTab").show().find("input:checkbox").prop("checked",false).trigger("change");
					}
				});
				//주택조건 조사년도 변경 이벤트
				$("#house_year").off("change").change(function(){
					if (parseInt($(this).val()) > 2010){
						$("#householdOcptnTab,#houseConstYearTab").hide().find("input:checkbox").prop("checked",false).trigger("change");
						$("#houseUsePeriodTab").show().find("input:checkbox").prop("checked",false).trigger("change");
					}else {
						$("#householdOcptnTab,#houseConstYearTab").show().find("input:checkbox").prop("checked",false).trigger("change");
						$("#houseUsePeriodTab").hide().find("input:checkbox").prop("checked",false).trigger("change");
					}
				});
				//결합조건 검색 조건 체크박스 변경 이벤트
				$("#API_4011 a.roundTextBox input:checkbox").off("change").change(function(){
					var div = $(this).parents("div.joinStepBox");
					if(div.find(".roundTextBox").children("input:checkbox:checked").length>0){
						$("#rd_combine_base label:eq("+div.index()+")").show();
					}else{
						$("#rd_combine_base label:eq("+div.index()+")").hide();
					}
					if($("#rd_combine_base label:visible:first").length>0){
						$("#rd_combine_base input[id="+$("#rd_combine_base label:visible:first").attr("for")+"]").prop("checked",true).trigger("change");
					}else{
						$("#rd_combine_base input").prop("checked",false).trigger("change");
					}
				});
				//결합조건 조사년도 변경 이벤트
				$("#population_year_combine").off("change").change(function(){
					if (parseInt($(this).val()) > 2010) {
						$("#populationEduTab_combine,#populationMarryTab_combine,#householdOcptnTab_combine,#houseConstYearTab_combine").hide().find("input:checkbox").prop("checked",false).trigger("change");
						$("#houseUsePeriodTab_combine").show().find("input:checkbox").prop("checked",false).trigger("change");
					}else{
						$("#populationEduTab_combine,#populationMarryTab_combine,#householdOcptnTab_combine,#houseConstYearTab_combine").show().find("input:checkbox").prop("checked",false).trigger("change");
						$("#houseUsePeriodTab_combine").hide().find("input:checkbox").prop("checked",false).trigger("change");
					}
				});
			}
		},
		//농림어업총조사
		"3fFish" : {
			init : function(){
				$("#3fTabDiv a:first").trigger("click");
			},
			event : function(){
				//농림어업총조사 탭 이벤트
				$("#3fTabDiv a").off("click").click(function(){
					$("#3fTabDiv>li").removeClass("on");
					$(this).parent("li").addClass("on");
					changeFirstSelectOption($("#3f_year"));
					$("#history-menu-depth-3fFish .roundTextBox input:checkbox").prop("checked",false).trigger("change");
					if($(this).data("id")==="fish"){
						$("#3fFishTab-title,#3fFishTab-content").show();
					}else{
						$("#3fFishTab-title,#3fFishTab-content").hide();
					}
					return false;
				});
			}
		},
		//전국사업체조사
		company : {
			init : function(){
				$("#companyTabDiv a:first").trigger("click");
			},
			event : function(){
				//전국사업체조사 탭 이벤트
				$("#companyTabDiv a").off("click").click(function(){
					$("#companyTabDiv>li").removeClass("on");
					$(this).parent("li").addClass("on");
					$("input[name=cDataType]:first,input[name=cDataType1]:first").prop("checked",true).trigger("change");
					if($(this).data("id")==="industry"){
						$("#API_0304-b").show();
						$("#API_0304-a").hide();
						$("#history-menu-depth-companytree").addClass("M_on");
						changeFirstSelectOption($("#company_year"));
						$communityCreateHistory.event.companytree.init();
					}else{
						$("#API_0304-b").hide();
						$("#API_0304-a").show();
						$("#history-menu-depth-companytree").removeClass("M_on");
					}
					return false;
				});
			}
		},
		companytree : {
			init : function(){
				$("#themeCodeList>.subRoundTextBox").addClass("on").trigger("click");
				$("input[name=theme_codes]:checkbox").prop("checked",false).trigger("change");
				$("#company_TreeBox").show();
				$("#company_SearchBox").hide();
			},
			event : function(){
				var class_deg = "9";
				function setClassDeg(){
					if($("#company_year").val() <= 2005) {
						class_deg = "8";
					} else if($("#company_year").val() > 2005) {
						class_deg = "9";
					}
				}
				setClassDeg();
				createIndustryTree(class_deg);
				//조사년도 변경 이벤트
				$("#company_year").off("change").change(function(){
					$("#company_TreeBox").show();
					$("#company_SearchBox").hide();
					$("#companySearchText").val(null);
					setClassDeg();
					createIndustryTree(class_deg);
				});
				//전국사업체 조사에서 테마 업종의 옵션메뉴 클릭 이벤트
				$("#themeCodeList>.subRoundTextBox").off("click").click(function(){
					$(this).toggleClass("on");
					if($(this).hasClass("on")){
						$(this).next(".joinDefault").show();
					}else{
						$(this).next(".joinDefault").hide();
					}
					return false;
				});
				//사업체 검색 엔터 버튼 이벤트
				$("#companySearchText").off("keypress").on("keypress",function(e){
					if(e.which == 13){
						searchIndustry(class_deg);
						return false;
					}
				});
				//사업체 검색 버튼 클릭 이벤트
				$("#companySearchButton").off("click").click(function(){
					searchIndustry(class_deg);
					return false;
				});
			}
		},
		kosis : {
			init : function(){
				$("#history-menu-depth-kosis").removeClass("M_on");
				$("#history-menu-depth-kosis>input,#kosisSearchText").val(null);
				$("#kosis_TreeBox").show();
				$("#kosis_SearchBox").hide();
				$("#kosisDataFieldTable,#kosisSearchCount,#kosisSearchDataList,#kosisTablePage").empty();
			}
		},
		kosistree : {
			init : function(){
				$communityCreateHistory.event.kosis.init();
				createKosisTree();
			},
			event : function(){
				//kosis 검색 엔터 버튼 이벤트
				$("#kosisSearchText").off("keypress").on("keypress",function(e){
					if(e.which == 13){
						searchKosis();
						return false;
					}
				});
				//kosis 검색 버튼 클릭 이벤트
				$("#kosisSearchButton").off("click").click(function(){
					searchKosis();
					return false;
				});
			}
		}
	}
	
	/**
	 * @name        : createSelectYear
	 * @description : 년도 추가
	 * @date        : 2016. 10. 14. 
	 * @author      : 나광흠
	 * @history     :
	 */
	function createSelectYear(){
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
		
		for(var year = parseInt(companyDataYear); year >= 2000; year --) {
			//사업체 조사년도
			$("#company_year").append("<option value="+year+">"+year+"년도</option>");
			
			//사업체 주요지표 조사년도
			$("#mainIndex_corp_year").append("<option value="+year+">"+year+"년도</option>");
		}
		for(var year = parseInt(companyDataYear); year >= 2006; year --) {
			$("#company_year_theme").append("<option value="+year+">"+year+"년도</option>");
		}
		
	}
	/**
	 * @name        : changeFirstSelectOption
	 * @description : 년도 셀렉트 박스 첫번째 인자 선택
	 * @date        : 2016. 10. 14. 
	 * @author      : 나광흠
	 * @history     :
	 */
	function changeFirstSelectOption(element){
		element.val(element.children("option:first").val());
		element.trigger("change");
	}
	/**
	 * @name            : createIndustryTree
	 * @description     : 사업체 트리 생성
	 * @date            : 2016. 10. 16. 
	 * @author          : 나광흠
	 * @history         :
	 * @param class_deg : 산업분류체계 차수
	 */
	function createIndustryTree(class_deg){
		$communityMapApi.request.getIndustrycode(class_deg,null,function(res){
			if(res.errCd=="0"){
				var root = {
					id : "industryRootNode",
					cd : null,
					text : "전산업",
					children : [],
					depth : 1,
					isExpanded : true
				};
				$.each(res.result,function(){
					root.children.push({
						cd : this.class_code,
						text : this.class_nm,
						children : [{"loading": true, "iconCls": "icon-tree-loading", "text": "Loading"}],
						depth : 2,
						isExpanded : false
					});
				});
				$communityCreateHistory.ui.industryTree = $("#company_TreeBox").empty().easytree({
					slidingTime:0,
					data : [root],
					allowActivate: true,
					disableIcons: true,
					toggled : function(event, nodes, node) {
						if(node.isExpanded&&$communityMapCommon.hasText(node.children)&&node.children.length>0) {
							$.each(node.children,function(){
								if(this.loading===true){
									var loadingId = this.id;
									$communityMapApi.request.getIndustrycode(class_deg,node.cd,function(res){
										if(res.errCd=="0"){
											$.each(res.result,function(){
												var nodeOption = {
													cd : this.class_code,
													text : this.class_nm,
													depth : node.depth+1,
													isExpanded : false,
													infoIcon : true
												};
												if(node.depth<4){
													nodeOption.children = [{"loading": true, "iconCls": "icon-tree-loading", "text": "Loading"}] 
												}
												$communityCreateHistory.ui.industryTree.addNode(nodeOption, node.id);
											});
											$communityCreateHistory.ui.industryTree.removeNode(loadingId);
											$communityCreateHistory.ui.industryTree.rebuildTree();
										}else{
											$communityMapCommon.alert("알림",res.errMsg);
										}
									});
									return false;
								}
							});
						}
					},
					selected : function(node) {
						$communityCreateHistory.ui.selectNode = node;
					},
					iconSelected : function(e, id, node) {
						var cd = node.cd.substring(1,node.cd.length);
						window.open(
							"https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=0"+ class_deg +"&strCategoryCode="+ cd,
							//"http://kostat.go.kr/kssc/stclass/StClassAction.do?method=ksscTree&classKind=1&catgrp=&code=" + id + "&kssc=popup", 
							"통계분류 홈페이지에 오신것을 환경합니다.",
							"width=420, height=400, menubar=no, status=no, toolbar=no, location=no"
						);
					}
				});
				$communityCreateHistory.ui.selectNode = $communityCreateHistory.ui.industryTree.getNode("industryRootNode");
				$communityCreateHistory.ui.industryTree.activateNode("industryRootNode");
			}else{
				$communityMapCommon.alert("알림",res.errMsg);
			}
		});
	}
	/**
	 * @name             : createKosisTree
	 * @description      : KOSIS 트리 생성
	 * @date             : 2016. 10. 26. 
	 * @author           : 나광흠
	 * @history          :
	 * @param up_list_id : up_list_id
	 */
	function createKosisTree(){
		$communityMapApi.request.getKosisTreeMenu("ROOT",function(res){
			if(res.errCd=="0"){
				var root = [];
				$.each(res.result.kosis_menu,function(){
					root.push({
						cd : this.list_id,
						text : this.list_nm,
						child_cnt : this.child_cnt,
						children : [{"loading": true, "iconCls": "icon-tree-loading", "text": "Loading"}],
						depth : 1,
						nodeOptions : this,
						isExpanded : false
					});
				});
				$communityCreateHistory.ui.kosisTree = $("#kosis_TreeBox").empty().easytree({
					slidingTime:0,
					data : root,
					allowActivate: true,
					disableIcons: true,
					toggled : function(event, nodes, node) {
						if(node.isExpanded&&$communityMapCommon.hasText(node.child_cnt)&&parseInt(node.child_cnt)>0) {
							$.each(node.children,function(){
								if(this.loading===true){
									var loadingId = this.id;
									$communityMapApi.request.getKosisTreeMenu(node.cd,function(res){
										if(res.errCd=="0"){
											if(res.result.kosis_menu.length<1){
												$communityMapCommon.alert("알림","해당 항목은 서비스 준비중입니다.");
											}else{
												$.each(res.result.kosis_menu,function(){
													var text=this.list_nm;
													if(this.gis_se=="1"){
														text+= "<img src='"+contextPath+"/img/ico/kosis_gis_se_sido.png' style='width:4px;height:13px;'/>";
													}else if(this.gis_se=="2"){
														text+= "<img src='"+contextPath+"/img/ico/kosis_gis_se_sido.png' style='width:4px;height:13px;'/>";
														text+= "<img src='"+contextPath+"/img/ico/kosis_gis_se_sgg.png' style='width:4px;height:13px;'/>";
													}else if(this.gis_se=="3"){
														text+= "<img src='"+contextPath+"/img/ico/kosis_gis_se_sido.png' style='width:4px;height:13px;'/>";
														text+= "<img src='"+contextPath+"/img/ico/kosis_gis_se_sgg.png' style='width:4px;height:13px;'/>";
														text+= "<img src='"+contextPath+"/img/ico/kosis_gis_se_adm.png' style='width:4px;height:13px;'/>";
													}
													var nodeOption = {
														cd : this.list_id,
														child_cnt : this.child_cnt,
														text : text,
														depth : node.depth+1,
														nodeOptions : this,
														isExpanded : false
													};
													if(parseInt(this.child_cnt)>0){
														nodeOption.children = [{"loading": true, "iconCls": "icon-tree-loading", "text": "Loading"}] 
													}
													$communityCreateHistory.ui.kosisTree.addNode(nodeOption, node.id);
												});
											}
											$communityCreateHistory.ui.kosisTree.removeNode(loadingId);
											$communityCreateHistory.ui.kosisTree.rebuildTree();
										}else{
											$communityMapCommon.alert("알림",res.errMsg);
										}
									});
									return false;
								}
							});
						}
					},
					selected : function(node) {
						if(parseInt(node.child_cnt)>0){
							$("#history-menu-depth-kosis").removeClass("M_on");
						}else{
							setKosisDetailSearchBox(node.nodeOptions);
						}
					}
				});
			}else{
				$communityMapCommon.alert("알림",res.errMsg);
			}
		});
	}
	/**
	 * @name            : searchIndustry
	 * @description     : 산업분류 검색
	 * @date            : 2016. 10. 26. 
	 * @author          : 나광흠
	 * @history         :
	 * @param class_deg : 산업분류체계 차수
	 * @param pagenum   : 페이지 번호
	 */
	function searchIndustry(class_deg,pagenum){
		var searchword = $("#companySearchText").val();
		if(!$.isNumeric(class_deg)||!/^8|9$/.test(class_deg)){
			class_deg = 9;
		}
		if(!$.isNumeric(pagenum)){
			pagenum = 0;
		}
		if($communityMapCommon.hasText(searchword)){
			$.ajax({
				url : contextPath+"/ServiceAPI/map/interactive/corpClassSearch.json",
				type:"POST",
				data: {
					class_deg : class_deg,
					searchword : searchword,
					pagenum : pagenum
				},
				async: false,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						$("#company_TreeBox").hide();
						$("#company_SearchBox").show();
						$("#companySearchCount").text(res.result.totalcount);
						$("#companySearchDataList,#companyTablePage").empty();
						$.each(res.result.dataList,function(cnt,node){
							$("#companySearchDataList").append($("<li/>").append(
								$("<input/>",{"type":"radio","id":"rd_company_data_"+cnt,"name":"rd_company_data","value":node.class_code}),
								$("<label/>",{"for":"rd_company_data_"+cnt,"text":node.class_nm})
							));
						});
						if(res.result.totalcount > 5){
			    			$("#companyTablePage").append($("<div/>",{"id":"corpClassPaging","class":"pagenation","align":"center","style":"width:100%;"}).append($("<span/>",{"class":"pages"})));
			    		}
						var totalPage = Math.ceil( res.result.totalcount / 5);
						$('#corpClassPaging .pages').paging({
							current:pagenum+1,
							max:totalPage,
							itemClass : 'page',
							itemCurrent : 'current',
							format : '{0}',
							next : '&gt;',
							prev : '&lt;',
							first : '&lt;&lt;',
							last : '&gt;&gt;',
							onclick:function(e,page){
								searchIndustry(class_deg,page-1);
							}
						});
					}else{
						$communityMapCommon.alert("알림", res.errMsg);
					}
				},
				error: function(data){
					$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					return false;
				}
			});
		}else{
			$communityMapCommon.alert("알림","검색어를 입력하세요.");
		}
	}
	/**
	 * @name            : searchKosis
	 * @description     : 년도 셀렉트 박스 첫번째 인자 선택
	 * @date            : 2016. 10. 27. 
	 * @author          : 나광흠
	 * @history         :
	 * @param pagenum   : 페이지 번호
	 */
	function searchKosis(pagenum){
		var resultcount = 10;
		var searchword = $("#kosisSearchText").val();
		if(!$.isNumeric(pagenum)){
			pagenum = 0;
		}
		if($communityMapCommon.hasText(searchword)){
			$communityMapApi.request.searchKosis(pagenum,resultcount,searchword,function(res){
				if(res.errCd=="0"){
					$("#kosis_TreeBox").hide();
					$("#kosis_SearchBox").show();
					$("#kosisSearchCount,#kosisSearchDataList,#kosisTablePage").empty();
					$("#kosisSearchCount").text("검색결과 : "+res.result.totalcount+"개");
					$.each(res.result.resultdata,function(cnt,node){
						$("#kosisSearchDataList").append(
							$("<li/>").append(
								$("<table/>").append(
									$("<tbody/>").append(
										$("<tr/>").append(
											$("<td/>",{"style":"vertical-align:top;"}).append($("<div/>",{"style":"cursor: pointer;margin-top:1px;","text":"● "})),	
											$("<td/>",{"style":"width:10px;"}),	
											$("<td/>").append($("<a/>",{"href":"#","style":"font-size:13px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 200px;display: inline-block;","text":node.kosis_menu_nm,"title":node.kosis_menu_nm}).click(function(){
												setKosisDetailSearchBox(
													{
														org_id : node.kosis_inst_cd,
														list_id : node.kosis_menu_id,
														field_id : node.field_id,
														obj_var_id : node.administzone_item_cd,
														list_nm : node.kosis_menu_nm,
														gis_se : node.gis_se
													}
												);
												return false;
											}))	
										)	
									)
								)
							)
						);
					});
					$("#kosisSearchDataList a[title]").tooltip({
						position: {my: "left-100 top+30", at: "right top"}
					});
					if(res.result.totalcount > resultcount){
		    			$("#kosisTablePage").append($("<div/>",{"id":"kosisClassPaging","class":"pagenation","align":"center","style":"width:100%;"}).append($("<span/>",{"class":"pages"})));
		    		}
					var totalPage = Math.ceil( res.result.totalcount / resultcount);
					$('#kosisClassPaging .pages').paging({
						current:pagenum+1,
						max:totalPage,
						itemClass : 'page',
						itemCurrent : 'current',
						format : '{0}',
						next : '&gt;',
						prev : '&lt;',
						first : '&lt;&lt;',
						last : '&gt;&gt;',
						onclick:function(e,page){
							searchKosis(page-1);
						}
					});
				}else{
					$communityMapCommon.alert("알림", res.errMsg);
				}
			});
		}else{
			$communityMapCommon.alert("알림","검색어를 입력하세요.");
		}
	}
	/**
	 * @name        : setKosisDetailSearchBox
	 * @description : kosis 검색 상세 정보 셋팅
	 * @date        : 2016. 10. 27. 
	 * @author      : 나광흠
	 * @history     :
	 * @param obj   : obj
	 */
	function setKosisDetailSearchBox(obj){
		$("#history-menu-depth-kosis>input[name=org_id]").val(obj.org_id);
		$("#history-menu-depth-kosis>input[name=tbl_id]").val(obj.list_id);
		$("#history-menu-depth-kosis>input[name=field_id]").val(obj.field_id);
		$("#history-menu-depth-kosis>input[name=obj_var_id]").val(obj.obj_var_id);
		$("#history-menu-depth-kosis>input[name=title]").val(obj.list_nm);
		$("#history-menu-depth-kosis>input[name=gis_se]").val(obj.gis_se);
		var nodeAbs = new sop.portal.absAPI();
		nodeAbs.onBlockUIPopup();
		$.ajax({
			url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataStaticFields.do",
			type:"GET",
			data: {
				org_id : obj.org_id,
				tbl_id : obj.list_id,
				obj_var_id : obj.obj_var_id
			},
			async: true,
			dataType:"json",
			success: function(res){
				if(res.errCd=="0"){
					$("#kosisTitle").text(obj.list_nm);
					$("#kosisOrigin").empty().append("출처 : KOSIS(",$("<a/>",{"href":"#","text":"통계표보기"}).click(function(){
						window.open("http://kosis.kr/statHtml/statHtml.do?orgId="+obj.org_id+"&tblId="+obj.list_id+"&conn_path=I2");
						return false;
					}),")");
					$("#kosisDataFieldTable").empty();
					//세부항목
					var kosisDetail = $("<select/>",{"name":"kosisDetail","style":"font-size:13px;width:100px;"});
					var kosisPeriod = $("<select/>",{"name":"kosisPeriod","style":"font-size:13px;width:100px;"});
					var kosisYear = $("<select/>",{"name":"kosisYear","style":"font-size:13px;width:100px;"});
					$.each(res.result.dataItem,function(){
						kosisDetail.append($("<option/>",{"value":this.ITM_ID,"text":this.ITM_NM}));
					});
					//주기
					$.each(res.result.staticFields,function(staticCnt,staticNode){
						var text = staticNode.PRD_SE_NM;
						if(
							staticNode.PRD_SE_NM == "부정기" && 
							staticNode.PRD_SE == 'F' &&
							$communityMapCommon.hasText(staticNode.PRD_DETAIL)) {
							if(staticNode.PRD_DETAIL.length>2){
								var lastIndex = staticNode.PRD_DETAIL.length - 1;
								text = staticNode.PRD_DETAIL.substring(0, lastIndex);
								if((staticNode.PRD_DETAIL.substring(lastIndex)).toUpperCase == 'Y') {
									text += "년";
								} else if((staticNode.PRD_DETAIL.substring(lastIndex)).toUpperCase == 'M') {
									text += "월";
								} else if((staticNode.PRD_DETAIL.substring(lastIndex)).toUpperCase == 'D') {
									text += "일";
								}
							}else{
								var period = (staticNode.PRD_DETAIL.substring(1)).toUpperCase();
								text = staticNode.PRD_DETAIL.substring(0, 1);
								if(period == 'Y') {
									text += "년";
								} else if(period == 'M') {
									text += "월";
								} else if(period == 'D') {
									text += "일";
								}
							}
						}
						kosisPeriod.append($("<option/>",{"value":staticNode.PRD_SE,"text":text}));
						function setOption(){
							$.each(staticNode.periodValue,function(){
								kosisYear.append($("<option/>",{"value":this.PRD_DE,"text":this.PRD_DE_NM}));
							});
						}
						kosisPeriod.change(function(){
							kosisYear.empty();
							setOption();
						});
						if(staticCnt==0){
							setOption();
						}
					});
					$("#kosisDataFieldTable").append(
						$("<p/>",{"class":"off"}).append($("<span/>",{"text":"세부항목","title":"세부항목"}),kosisDetail),
						$("<p/>",{"class":"off"}).append($("<span/>",{"text":"주기","title":"주기"}),kosisPeriod),
						$("<p/>",{"class":"off"}).append($("<span/>",{"text":"년도","title":"년도"}),kosisYear)
					);
					if($communityMapCommon.hasText(res.result.dataFieldList)){
						$.each(res.result.dataFieldList,function(){
							if($communityMapCommon.hasText(this.details)){
								var dataField = $("<select/>",{"name":this.FIELD_ID,"style":"font-size:13px;width:100px;"});
								$.each(this.details,function(){
									var treeAppendText = "";
									if($communityMapCommon.hasText(this.LEV)&&parseInt(this.LEV)>1){
										for(var i = 1; i < parseInt(this.LEV); i++) {
											treeAppendText += "&nbsp;&nbsp;ㄴ";
										}
									}
									dataField.append($("<option/>",{"value":this.ITM_ID,"html":treeAppendText+this.ITM_NM,"data-original-text":this.ITM_NM}));
								});
								$("#kosisDataFieldTable").append($("<p/>",{"class":"off option"}).append($("<span/>",{"text":this.SCR_KOR,"title":this.SCR_KOR}),dataField));
							}
						});
					}
					$("#kosisDataFieldTable>p.off>span").tooltip({
						position: {my: "left-100 top+30", at: "right top"}
					});
					$("#history-menu-depth-kosis").addClass("M_on");
				}else{
					$communityMapCommon.alert("알림", res.errMsg);
				}
				nodeAbs.onBlockUIClose();
			},
			error: function(data){
				$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
				nodeAbs.onBlockUIClose();
				return false;
			}
		});
	}
	/**
	 * 
	 * @name         : slideValue
	 * @description  : 슬라이드 바 컨트롤.
	 * @date         : 2015. 10. 08. 
	 * @author	     : 김성현
	 * @history 	 :
	 */
	function slideValue(from, to, slider, etc, limit) {
	    var domFrom = "#"+from;
	    var domTo = "#"+to;
	    var domSlider = slider;
	    var min = 1;
	    var step = 1;
	    var tmpValues = null;
	    var tmpHouseSpaceList = [0, 20, 40, 60, 85, 100, 130, 165, 230, 300];
	    var values = null;
	    
	    if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
	    	min = 0;
	    	step = 5;
	    	values = [10, 65];
	    }else if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
	    	min = 0;
	    	step = 1;
	    	values = [0, 1];
	    }
	    
	    var data = 0;
		for (var i=min; i<=limit; i++) {
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
				tmpText = limit+"+";
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
		
		if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
			$(domFrom).val("10");
	    	$(domTo).val("65");
		}else {
			$(domFrom).val("0");
	    	$(domTo).val("20");
	    	$("."+from).text("약 "+(0/3.3).toFixed(1)+"평");
		    $("."+to).text("약 "+(20/3.3).toFixed(1)+"평");
		}
		
	    $(domFrom).change(function(){
	    	var spaceTo = $(domTo).val();
	    	var id = $(this).attr("id");

	    	if (id == "populationAgeFrom" || id == "populationAgeFrom_combine" || id == "3fAgeFrom") {
		        if (parseInt($(this).val()) >= parseInt(spaceTo)) {
		        	 $(this).val(parseInt(spaceTo)-5);
		        }
		        $(domSlider).slider("values", 0, $(this).val());
	    	}else if (id == "houseBdspaceFrom" || id == "houseBdspaceFrom_combine") {
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

	        var fromData = $(this).val();
	        $(domTo+ " option").each(function() {
	        	$(this).show();
	        	if (parseInt(fromData) >= parseInt($(this).val())) {
	        		$(this).hide();
	        	}
	        });
	    });
	    $(domTo).change(function(){
	        var spaceFrom = $(domFrom).val();
	        var id = $(this).attr("id");
	        
	        if (id == "populationAgeTo"|| id == "populationAgeTo_combine" || id == "3fAgeTo") {
	        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
		            $(this).val(parseInt(spaceFrom)+5);
		        }
	        	$(domSlider).slider("values", 1,  $(this).val());
	        }else if (id == "houseBdspaceTo" || id == "houseBdspaceTo_combine") {
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
	        step : step,
	        values : values,
	        slide : function(e, ui) {
	        	if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom" ) {
	        		if (ui.values[1] == limit) {
	        			$(domTo).hide();
				    	$("#ageToText").hide();
				    	$("#ageToText_combine").hide();
				    	$("#3fAgeToText").hide();
	        		}else {
	        			$(domTo).show();
				    	$("#ageToText").show();
				    	$("#ageToText_combine").show();
				    	$("#3fAgeToText").show();
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
	}
	/**
	 * @name             : addMultipleOption
	 * @description      : 옵션 추가하기
	 * @date             : 2016. 10. 18. 
	 * @author	         : 나광흠
	 * @history 	     :
	 * @param parameters : parameters
	 * @param paramName  : 파라미터 이름
	 * @param type       : radio or checkbox
	 * @param tabId      : 탭 아이디
	 * @param name       : inputbox 이름
	 */
	function addMultipleOption(parameters,paramName,type,tabId,name){
		if($("#"+tabId+">input:checkbox").is(":checked")){
			parameters.paramInfo[paramName] = $("input[name="+name+"]:"+type+":checked").map(function(){
				return $(this).val();
			}).get().join();
			parameters.title = $("input[name="+name+"]:checkbox:checked").map(function(){
				return $("label[for="+$(this).attr("id")+"]").text();
			}).get().join()+" + "+parameters.title;
		}
	}
	/**
	 * @name             : createPopulationOption
	 * @description      : 인구주택총조사 인구조건 생성
	 * @date             : 2016. 10. 18. 
	 * @author	         : 나광흠
	 * @history 	     :
	 * @param is_combine : 결합조건 유무
	 * @param parameters : parameters
	 */
	function createPopulationOption(is_combine,parameters){
		var addId = is_combine?"_combine":"";
		if($("#populationAgeTab"+addId+">input:checkbox").is(":checked")){
			var age_to = parseInt($("#populationAgeTo"+addId).val())>100?$("#populationAgeTo"+addId).val():(parseInt($("#populationAgeTo"+addId).val())-1).toString();
			parameters.paramInfo.age_from = $("#populationAgeFrom"+addId).val();
			parameters.paramInfo.age_to = age_to;
			parameters.title = $("#populationAgeFrom"+addId).val()+"세~"+age_to+"세 + "+parameters.title
		}
		if(parseInt($("#"+(is_combine?"population_year_combine":"population_year")).val())<=2010){
			addMultipleOption(parameters,"edu_level","checkbox","populationEduTab"+addId,"edulevel_1"+addId);
			addMultipleOption(parameters,"mrg_state","checkbox","populationMarryTab"+addId,"mrg_state_1"+addId);
		}
	}
	/**
	 * @name             : createHouseholdOption
	 * @description      : 인구주택총조사 가구조건 생성
	 * @date             : 2016. 10. 18. 
	 * @author	         : 나광흠
	 * @history 	     :
	 * @param is_combine : 결합조건 유무
	 * @param parameters : parameters
	 */
	function createHouseholdOption(is_combine,parameters){
		var addId = is_combine?"_combine":"";
		addMultipleOption(parameters,"household_type"+addId,"checkbox","householdTypeTab"+addId,"household_type"+addId);
		if(parseInt($("#"+(is_combine?"population_year_combine":"household_year")).val())<=2010){
			addMultipleOption(parameters,"ocptn_type"+addId,"checkbox","householdOcptnTab"+addId,"ocptn_type"+addId);
		}
	}
	/**
	 * @name             : createHouseOption
	 * @description      : 인구주택총조사 주택조건 생성
	 * @date             : 2016. 10. 18. 
	 * @author	         : 나광흠
	 * @history 	     :
	 * @param is_combine : 결합조건 유무
	 * @param parameters : parameters
	 */
	function createHouseOption(is_combine,parameters){
		var addId = is_combine?"_combine":"";
		addMultipleOption(parameters,"house_type","checkbox","houseTypeTab"+addId,"house_type"+addId);
		var title = [];
		if($("#houseBdspaceTab"+addId+">input:checkbox").is(":checked")){
			var houseBdspaceFrom = $("#houseBdspaceFrom"+addId+" option:selected");
			var houseBdspaceTo = $("#houseBdspaceTo"+addId+" option:selected");
			var tmpHouseBdspaceTo = houseBdspaceTo.val();
			var tmpHouseBdspaceFrom = houseBdspaceFrom.val();
			var tmpHouseBdspaceToText = houseBdspaceTo.val();
			var houseAreaCd = [];
			
			if (parseInt(houseBdspaceFrom.val()) >= 230) {
				tmpHouseBdspaceFrom = 230;
			}
			if (parseInt(houseBdspaceTo.val()) >= 300) {
				tmpHouseBdspaceTo = 9999;
				tmpHouseBdspaceToText = houseBdspaceTo.val() + "㎡ 이상";
				title.push(tmpHouseBdspaceFrom + "㎡ 이상");
			}else {
				title.push(tmpHouseBdspaceFrom + "㎡ 이상 ~" + tmpHouseBdspaceToText + "㎡ 미만");
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
			parameters.paramInfo.house_area_cd = houseAreaCd.join();
			 
		}
		if(parseInt($("#"+(is_combine?"population_year_combine":"house_year")).val())<=2010){
			if($("#houseConstYearTab"+addId+">input:checkbox").is(":checked")){
				parameters.paramInfo.const_year = $("#houseConstYear"+addId).val();
				title.push($("#houseConstYear"+addId+" option:selected").text()+" 건축");
			}
		}else{
			if($("#houseUsePeriodTab"+addId+">input:checkbox").is(":checked")){
				parameters.paramInfo.house_use_prid_cd = $("#houseUsePeriod"+addId).val();
				title.push($("#houseUsePeriod"+addId+" option:selected").text());
			}
		}
		if($communityMapCommon.hasText(parameters.title)){
			title.push(parameters.title);
		}
		parameters.title = title.join(" + ");
	}
}(window, document));