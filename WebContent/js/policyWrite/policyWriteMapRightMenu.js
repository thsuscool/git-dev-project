/**
 * 대화형 통계지도 Right 메뉴(조회조건)에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2017/09/13  초기 작성
 * author : 권차욱
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyWriteMapRightMenu = W.$policyWriteMapRightMenu || {};
	
	$(document).ready(function() {
		$policyWriteMapRightMenu.event.setUIEvent();			//UI에 사용되는 이벤트를 설정한다.
		$policyWriteMapRightMenu.request.reqIndustryCode(0, 9); //산업분류 목록 조회
		$policyWriteMapRightMenu.request.reqThemeCode(0);	    //테마 목록 조회
		$policyWriteMapRightMenu.request.reqUserDataList();     //나의데이터 조회
	});
	
	$policyWriteMapRightMenu.ui = {
			curSelectedStatsType : "company",
			curSelectedDetailStatsType : null, 
			arParamList : [], 
			companyTree : null,	
			themeThree : null,
			curSelectedCompanyNode : null,		
			curSelectedThemeNode : null,		
			corpClassNum : 0,
			class_deg : null,
			curSelectedPoiList : [],
			checkCnt : 5,

			
			/**
			 * 
			 * @name         : setDetailStatsPanel
			 * @description  : 특정 통계버튼을 생성했을 때, 해당 통계에 대한 세부통계조건선택뷰를 생성한다.
			 * @date         : 2017. 09. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 현재 선택된 통계타입
			 */
			setDetailStatsPanel : function(type) {
				this.curSelectedStatsType = type;
				
				var menuType = {
						"company"	: 0,	//사업체조사 통계
						"local"		: 1,	//협업형 데이터
						"userData"	: 2		//나의 데이터	
				};
				
				var titleType = {
						"company" 	: "산업분류 데이터(POI) 선택하기",	//사업체조사 통계
						"local"		: "협업형 데이터(POI) 선택하기",	//협업형 데이터
						"userData"	: "나의 데이터 (POI) 선택하기",	//사용자데이터업로드
				}
				
				var inx = menuType[type];
				if(inx!=8){
					$("#submenuTitle2").text(titleType[type]);
					$("#depth1Menu2").find("li").removeClass("on");
					$("#depth1Menu2").find("li:eq("+inx+")").addClass("on");
					$(".totalResult").hide();
				}
				
				//2Depth 넓이
				$("#quickBox2_2depth").removeClass("join");
				$(".quickBox2.step02").find(".mCSB_container").css("width", "280px");
				$(".quickBox2.step02").find(".mCSB_container").mCustomScrollbar({setWidth : 280});
				
				//2depth열고, 3depth, 4dpeht 닫기
				$(".quickBox2.step02").stop().animate({"left":"280px"},200);
				$(".quickBox2.step03").stop().animate({"left":"560px"},200);
				$(".quickBox2.step04").stop().animate({"left":"0px"},200);
				
				//2depth 열기
				$(".totalResult2").hide();
				$(".totalResult2.tr0"+parseInt(inx+1)).show();
				$(".normalBox2").mCustomScrollbar("update");
				
				switch (menuType[type]) {
					case 0:  	//사업체통계
						break;
					case 1:     //협업형데이터
						break;
					case 2: 	//나의데이터
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : companyTab
			 * @description  : 사업체탭(산업분류, 테마업종)
			 * @date         : 2017. 09. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 선택된 타입
			 */
			companyTab : function(type) {
				$(".companyTab").removeClass("on");
				$("#"+type+"Tab").addClass("on");
				switch(type) {
					case "industry": //산업분류
						$("#themeArea").hide();
						$("#industryArea").show();
						break;
					case "theme":	 //테마업종
						$("#industryArea").hide();
						$("#themeArea").show();
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : checkPoiSelectedBtn
			 * @description  : 선택된 POI항목을 체크하고, 버튼을 생성 또는 삭제한다.
			 * @date         : 2017. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkPoiSelectedBtn : function() {
				for (var i=0; i<this.curSelectedPoiList.length; i++) {
					var isExist = false;
					var id = this.curSelectedPoiList[i].id;
					$("#poiBtnList li").each(function() {
						btnId = $(this).attr("id");
						if ("poi_"+id == btnId) {
							isExist = true;
						}
					});
					
					if (!isExist) {
						this.createPoiSelectedBtn(id, this.curSelectedPoiList[i].title, this.curSelectedPoiList[i].type);
					}
				}
			},
			
			/**
			 * 
			 * @name         : checkPoiSelectedBtnCnt
			 * @description  : POI버튼의 개수를 제한한다.
			 * @date         : 2017. 09. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkPoiSelectedBtnCnt : function() {
				var isPass = true;
				if (this.curSelectedPoiList.length >= this.checkCnt) {
					messageAlert.open("알림", "위치데이터  한번에 최대 "+this.checkCnt+"건까지만 조회할 수 있습니다.");
					isPass = false;
				}
				return isPass;
			},
			
			/**
			 * 
			 * @name         : createPoiSelectedBtn
			 * @description  : POI 버튼을 생성한다.
			 * @date         : 2017. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id	 : 아이디
			 * @param title  : 항목명
			 * @param type	 : 타입(센서스, 협업형데이터, 나의데이터)
			 */
			createPoiSelectedBtn : function(id, title, type) {
				var html = "";
				html +=	"<li class='poiBtn "+type+"' id='poi_"+id+"'>";
				html += 	"<a href='javascript:void(0)' class='ellipsis drag on'>";
				html +=			"<div class='text'>"+title+"</div>";
				html +=		"</a>";
				html += 	"<a href='javascript:$policyWriteMapRightMenu.ui.deletePoiSelectedBtn(\""+id+"\");' class='sqdel'>";
				html +=			"<img src='/img/um/btn_closel01.png' alt='삭제' /></a>";
				html +=	"</li>";
				$("#poiBtnList ul").append(html);
				
				//통계구분별로 버튼 색상을 변경한다.
				switch (type) {
					case "company": //산업분류
						$("#poi_"+id).css("background", "#00bcd4");
						break;
					case "theme": //테마업종
						$("#poi_"+id).css("background", "#1db869");
						break;
					case "local": //협업형
						$("#poi_"+id).css("background", "#b8651d");
						break;
					case "userData": //나의데이터
						$("#poi_"+id).css("background", "#e55b19");
						break;
				}
			},
			
			/**
			 * 
			 * @name         : deletePoiSelectedBtn
			 * @description  : POI 버튼을 삭제한다.
			 * @date         : 2017. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id	 : 아이디
			 */
			deletePoiSelectedBtn : function(id) {
				$("#poiBtnList li").each(function(idx) {
					var btnId = $(this).attr("id");
					if ("poi_"+id == btnId) {
						$(this).remove();
						$policyWriteMapRightMenu.ui.curSelectedPoiList.splice(idx, 1);
						if ($("#"+id).hasClass("on")) {
							$("#"+id).removeClass("on");
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : setUpdateCheckBox
			 * @description  : 체크박스를 on/off한다
			 * @date         : 2017. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setUpdateCheckBox : function() {
				for (var i=0; i<this.curSelectedPoiList.length; i++) {
        			var elId = this.curSelectedPoiList[i].id;
        			$("#"+elId).addClass("on");
        		}
			},
			
			/**
			 * 
			 * @name         : btnValidationCheck
			 * @description  : 파라미터정보 유효성 검사. 
			 * @date         : 2017. 09. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			btnValidationCheck : function() {
				if (this.curSelectedPoiList.length > 0) {
					return true;
				}else {
					messageAlert.open("알림", "위치데이터를 선택해주세요.");
					return false;
				}
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정한다. 
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			setParams : function() {
				var statsType = null;
				var origin = null;
				var arParamList = [];
				var params = null;
				var title = null;
				for (var i=0; i<this.curSelectedPoiList.length; i++) {
					var type = this.curSelectedPoiList[i].type;
					var id = this.curSelectedPoiList[i].id;
					title = this.curSelectedPoiList[i].title;
					id = id.split("btn_")[1];
					switch(type) {
						case "company":  //산업체분류
							statsType = "census";
							origin = "통계청, 전국사업체조사";
							var ksic_1_cd = id.split("_")[0];
							var ksic_5_cd = id.split("_")[1];
							params = {
									ksic_1_cd : ksic_1_cd,
									ksic_5_cd : ksic_5_cd,
									type : type
							};
							break;
						case "theme":    //테마코드
							statsType = "census";
							origin = "통계청, 전국사업체조사";
							params = {
									theme_cd : id,
									type : type
							};
							break;
						case "local":    //협업형데이터
							statsType = "local";
							origin = "협업형 통계데이터";
							params = {
									div_cd	: id
							};
							break;
						case "userData": //나의데이터
							statsType = "userData";
							origin = "나의데이터";
							params = {
									data_uid : id	
							};
							break;
						case "lbdms": //LBDMS데이터
							statsType = "lbdms";
							origin = "LBDMS 통계데이터";
							params = {
									seq : id	
							};
							break;
						default:
							break;
					}
					
					arParamList.push({
						type : statsType,
						params : params,
						title : title,
						origin : origin
					});
				}

				return arParamList;
			},
			
			/**
			 * 
			 * @name         : doReqStatsData
			 * @description  : 통계정보를 조회한다.
			 * @date         : 2017. 08. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqStatsData : function() {
				if (this.btnValidationCheck()) {
					this.arParamList = this.setParams();
					$policyWriteMap.ui.doReqPoiData(this.arParamList);
					if ($("#quickBox-02").hasClass("on")) {
						$("#quickBox-02").removeClass("on");
					}
					$policyWriteMapRightMenu.event.stepCloseAnimate(1, "pass");
				}
			}

	};
	
	$policyWriteMapRightMenu.request = {
			
			/**
			 * 
			 * @name         : reqIndustryCode
			 * @description  : 산업분류 목록정보를 가져온다.
			 * @date         : 2017. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param depth  : depth
			 * @param class_deg : 차수정보
			 */	
			reqIndustryCode : function(depth, class_deg) {
				$.ajax({
					url : contextPath + "/ServiceAPI/policyWrite/getIndustryCode.json",
					type : "POST",
					data : {class_deg :class_deg},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = res.result;
						var tmpRootData = {};
						var tmpSubData = {};
						for (var i=0; i<result.length; i++) {
							var classCd = result[i].ksic_1_cd;
							var rootData = {};
							var subData = {};
							
							if (tmpSubData[classCd] == undefined) {
								tmpSubData[classCd] = [];
							}
							
							//상위레벨 정보(코드레벨1)
							rootData["id"] = result[i].ksic_1_cd;
							rootData["cd"] = result[i].ksic_1_cd;
							rootData["text"] = result[i].ksic_1_nm;
							rootData["depth"] = depth;
							rootData["state"] = "closed";
							rootData["isExpanded"] = false;
							rootData["children"] = [];
							
							//하위레벨 정보(코드레벨5)
							subData["id"] = result[i].ksic_1_cd + "_" + result[i].ksic_5_cd;
							subData["cd"] = result[i].ksic_5_cd;
							subData["text"] = result[i].ksic_5_nm;
							subData["depth"] = 1;
							subData["checkIcon"] = true;
							subData["childCount"] = 0;
							
							tmpRootData[classCd] = rootData;
							tmpSubData[classCd].push(subData);
						}
						
						var LRootData = [];
						for (var p in tmpSubData) {
							tmpRootData[p].children = tmpSubData[p];
						}
						for (var p in tmpRootData) {
							LRootData.push(tmpRootData[p]);
						}
						
						if ($policyWriteMapRightMenu.ui.companyTree == null) {
							$policyWriteMapRightMenu.ui.companyTree = $("#companyPoiTreeBox").easytree({
								slidingTime:0,
					            building:$policyWriteMapRightMenu.event.companyListTreeWidth("#companyPoiTreeBox"),
					            stateChanged:$policyWriteMapRightMenu.event.companyListTreeWidth("#companyPoiTreeBox"),
					            toggled:$policyWriteMapRightMenu.event.companyListTreeWidth("#companyPoiTreeBox"),
								data : LRootData,
								allowActivate: true,
					            disableIcons: true,
					            toggled : function(event, nodes, node) {
					            	if (node.children != undefined && node.children.length > 0 ) {		
					            		$policyWriteMapRightMenu.ui.companyTree.rebuildTree();
					            		$policyWriteMapRightMenu.ui.companyTree.activateNode(node.id);
					            		$policyWriteMapRightMenu.ui.setUpdateCheckBox();
					            	}
								},
								selected : function(node) {	
									var id= "btn_" + node.id;
									$("#"+id).trigger("click");
								}
							});
							
						}
					},
					error : function(data){
					}
				});
			},
			
			/**
			 * 
			 * @name         : reqThemeCode
			 * @description  : 테마업종 목록정보를 가져온다.
			 * @date         : 2017. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param depth  : depth
			 * @param class_deg : 차수정보
			 */	
			reqThemeCode : function(depth) {
				$.ajax({
					url : contextPath + "/ServiceAPI/policyWrite/getThemeCode.json",
					type : "POST",
					data : {},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = res.result;
						var tmpRootData = {};
						var tmpSubData = {};
						for (var i=0; i<result.length; i++) {
							var classCd = result[i].theme_cd.substring(0,2);
							var rootData = {};
							var subData = {};
							
							if (tmpSubData[classCd] == undefined) {
								tmpSubData[classCd] = [];
							}
							
							//상위레벨 정보(코드레벨1)
							rootData["id"] = "T"+classCd;
							rootData["cd"] = classCd;
							rootData["text"] = result[i].b_theme_cd_nm;
							rootData["depth"] = depth;
							rootData["state"] = "closed";
							rootData["isExpanded"] = false;
							rootData["children"] = [];
							
							//하위레벨 정보(코드레벨5)
							subData["id"] = result[i].theme_cd;
							subData["cd"] = result[i].theme_cd;
							subData["text"] = result[i].s_theme_cd_nm;
							subData["depth"] = 1;
							subData["checkIcon"] = true;
							subData["childCount"] = 0;
							
							tmpRootData[classCd] = rootData;
							tmpSubData[classCd].push(subData);
						}
						
						var LRootData = [];
						for (var p in tmpSubData) {
							tmpRootData[p].children = tmpSubData[p];
						}
						for (var p in tmpRootData) {
							LRootData.push(tmpRootData[p]);
						}
						
						if ($policyWriteMapRightMenu.ui.themeThree == null) {
							$policyWriteMapRightMenu.ui.themeThree = $("#themePoiTreeBox").easytree({
								slidingTime:0,
					            building:$policyWriteMapRightMenu.event.companyListTreeWidth("#themePoiTreeBox"),
					            stateChanged:$policyWriteMapRightMenu.event.companyListTreeWidth("#themePoiTreeBox"),
					            toggled:$policyWriteMapRightMenu.event.companyListTreeWidth("#themePoiTreeBox"),
								data : LRootData,
								allowActivate: true,
					            disableIcons: true,
					            toggled : function(event, nodes, node) {
					            	if (node.children != undefined && node.children.length > 0 ) {		
					            		$policyWriteMapRightMenu.ui.themeThree.rebuildTree();
					            		$policyWriteMapRightMenu.ui.themeThree.activateNode(node.id);
					            		$policyWriteMapRightMenu.ui.setUpdateCheckBox();
					            	}
								},
								selected : function(node) {	
									var id= "btn_" + node.id;
									$("#"+id).trigger("click");
								}
							});
							
						}
					},
					error : function(data){
					}
				});
			},
			
			/**
			 * @name : reqUserDataList
			 * @description : Left메뉴 나의데이터 목록
			 * @date : 2017. 09. 15.
			 * @author : 권차욱
			 * @history :
			 */
			reqUserDataList : function() {
				$.ajax({
					url : contextPath + "/ServiceAPI/mypage/myData/myDataList.json",
					type : "POST",
					data : {
						"pageNum" : "1",
						"resultCount" : "10000"
					},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = res.result;
						switch(parseInt(res.errCd)) {
							case 0:
								var tmpData = [];
								for (var i=0; i<result.list.length; i++) {
									if (result.list[i].MAP_DISP_TYPE == "ratio" || 
										result.list[i].MAP_DISP_TYPE == "location") {
										tmpData.push(result.list[i]);
									}
								}
									
								$("#myDataLoadList2").empty();
								var html = "";
								for (var i=0; i<tmpData.length; i++) {
									var elem = tmpData[i];
									html += "<li class='userData'>";
									html +=		"<label class='checkBtn' id='btn_"+elem.DATA_ID+"' for='"+elem.DATA_ID+"'>"+elem.DATA_TITLE+"</label>";
									html += "</li>";
								}
								$("#myDataLoadList2").html(html);
								break;
							default:
								break;
						}
					},
					error : function(data) {
						
					}
				});
			}
			
	};

	$policyWriteMapRightMenu.event = {
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
				$(".normalBox2").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
				
				var body = $("body");
								
				//산업체항목 선택
				body.on("click", ".easytree-check", function() {
					var id = $(this).attr("id");
					var txtId = id.split("btn_")[1];
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
						for (var i=0; i<$policyWriteMapRightMenu.ui.curSelectedPoiList.length; i++) {
							if ($policyWriteMapRightMenu.ui.curSelectedPoiList[i].id == id) {
								$policyWriteMapRightMenu.ui.deletePoiSelectedBtn(id);
								break;
							}
						}
					}else {
						$(this).addClass("on");
						var title = $("#"+txtId).find(".easytree-title").html();
						var type = "theme";
						if (txtId.length > 4) {
							type = "company";
						}
						
						//poi 버튼 갯수 제한
						if ($policyWriteMapRightMenu.ui.checkPoiSelectedBtnCnt()) {
							$policyWriteMapRightMenu.ui.curSelectedPoiList.push({
								id : id,
								title : title,
								type : type
							});
						}else {
							$(this).removeClass("on");
						}
					}
					$policyWriteMapRightMenu.ui.checkPoiSelectedBtn();
					$(".quickBox2.step03").stop().animate({"left":"560px"},200);
				});
				
				//협업형/나의 데이터 선택
				body.on("click", ".checkBtn", function() {
					var id = $(this).attr("id");
					var type = $(this).parent().attr("class");
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
						for (var i=0; i<$policyWriteMapRightMenu.ui.curSelectedPoiList.length; i++) {
							if ($policyWriteMapRightMenu.ui.curSelectedPoiList[i].id == id) {
								$policyWriteMapRightMenu.ui.deletePoiSelectedBtn(id);
								break;
							}
						}
					}else {
						$(this).addClass("on");
						var title = $(this).html();
						//poi 버튼 갯수 제한
						if ($policyWriteMapRightMenu.ui.checkPoiSelectedBtnCnt()) {
							$policyWriteMapRightMenu.ui.curSelectedPoiList.push({
								id : id,
								title : title,
								type : type
							});
						}else {
							$(this).removeClass("on");
						}
					}
					$policyWriteMapRightMenu.ui.checkPoiSelectedBtn();
					$(".quickBox2.step03").stop().animate({"left":"560px"},200);
				});
				
				//닫기 버튼 클릭 시
				body.on("click",".stepClose2",function(){ 
					//9월 서비스
					var idx = parseInt($(this).index(".stepClose2")+1);
					if (idx > 3) {
						idx = 3;
					}
					if ($("#quickBox-02").hasClass("on")) {
						$("#quickBox-02").removeClass("on");
					}
					$policyWriteMapRightMenu.event.stepCloseAnimate(idx, "pass"); 
			    }); 
			},
			
			/**
			 * 
			 * @name         : stepOpenAnimate
			 * @description  : 왼쪽 메뉴 닫기 애니메이션.
			 * @date         : 2017. 09. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			stepOpenAnimate : function() {
				$("#quickBox-02").stop().animate({"left":"0"}, 200);
			},
			
			/**
			 * 
			 * @name         : stepCloseAnimate
			 * @description  : 왼쪽 메뉴 닫기 애니메이션.
			 * @date         : 2017. 09. 13. 
			 * @author	     : 김성현
			 * @param : inx, type (check : 통계메뉴바 자동닫기 체크,		 pass : 강제 닫기) 
			 * @history 	 :
			 */
			stepCloseAnimate : function(inx, type, ts){
				var time = 300;
				if (ts != undefined) {
					time = ts;
				}
				
			    var fx = '.quickBox2'; 
			 
			    $(fx).queue("step04", function(){ 
			        $(fx+'.step04').animate({"left":"-280px"}, time);    
			    }); 
			    $(fx).queue("step03", function(){
			        $(fx+'.step04').css({"left":"-280px"});
			        $(fx+'.step03').animate({"left":"-280px"}, time);    
			    }); 
			    $(fx).queue("step02", function(){
			        $(fx+'.step04, '+fx+'.step03').css({"left":"-280px"});
			        $(fx+'.step02').animate({"left":"-280px"}, time);
			        $(".quickBox.step02").removeClass("join");
			    }); 
			    $(fx).queue("step01", function(){
			        $(fx+'.step04, '+fx+'.step03, '+fx+'.step02').css({"left":"-280px"});
			        $(fx+'.step02').animate({"left":"-1120px"}, time);
			        $(fx+'.step01').animate({"left":"-280px"}, time);   
			        $(".shadow").hide();
			    }); 
			    $(fx).dequeue("step0"+inx); 
			},
			
			/**
			 * 
			 * @description  : 산업분류 목록 트리 width & scroll.
			 * @date         : 2015. 10. 16. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			companyListTreeWidth : function(id) {
				$(id).css("width","230px"); 
			    var stepWidth = $(id+ " > ul").prop("scrollWidth");
			    $(id).css({"width":parseInt(stepWidth)+"px"});
			},
				
	};
	
	
}(window, document));