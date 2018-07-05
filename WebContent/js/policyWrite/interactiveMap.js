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
	W.$interactiveMap = W.$interactiveMap || {};

	$(document).ready(
		function() {
			$interactiveMap.ui.createMap("mapRgn_1", 0);
			$interactiveMap.ui.createMap("mapRgn_2", 1);
			
			var mapNavi1 = new mapNavigation.UI();
			mapNavi1.firstBoolean = true;
			mapNavi1.create("mapNavi_1", 1, $interactiveMap.ui);	
			
			var mapNavi2 = new mapNavigation.UI();
			mapNavi2.firstBoolean = false;
			mapNavi2.create("mapNavi_2", 2, $interactiveMap.ui);
			
			$interactiveMap.event.setUIEvent();
			$interactiveMap.ui.curTitleReset();
			$("#navi-confirm").click(function(){
				var map = $interactiveMap.ui.mapList[0].gMap;
				var center = map.getCenter();
				$interactiveMap.ui.mapList[1].mapMove([center.x,center.y],map.getZoom());	
			});
	});
	
	$interactiveMap.ui = {
			namespace : "interactiveMap",
			searchBtnType : "normal",
			mapList : [],
			curMapId : 0,
			isInnerMapShow : false,
			curDropParams : [],
			combinePopup : null,
			buildPopup : null,
			reportPopup : null,
			dropBtnInfo : [],
			dataTypeList : [],
			tutoIndex : 0,
			curMenuType : null,//추가(버퍼분석형 dataPoi:data+poi, 연산형 dataData:data+data)
			curDataSelect : null,//추가(기준데이터:left, 추가데이터:right)//오른쪽 눌렀을 경우 왼쪽 데이터 확인
			curTitle : [],//타이틀 정보 
			combineArithmetic : null,//연산자 정보 + - × ÷
			
			/**
			 * @name         : curTitleReset
			 * @description  : 타이틀 정보를 empty 값으로 설정한다.
			 * @date         : 2016. 12. 01. 
			 * @author	     : 송종대
			 * @history 	 :
			 */
			curTitleReset : function(){
				for(var i = 0; i < 2; i ++) {
					$interactiveMap.ui.curTitle.push({
						id : i, 
						title : "",
						mapType : "",
						curDropParams : []
					});
				}
			},
			
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
					this.dataTypeList[mapId] = type;
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
				map.createMap($interactiveMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8, //9->8
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");

				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($interactiveMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "equal";
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				map.tileLayer = map.gMap.statisticTileLayer;
				map.blankLayer = new sop.BuildingLayer();
				var drawControl = new Draw.Control.Manager();
				map.gMap.addControl(drawControl); 
				map.drawControl = drawControl;
				map.gMap.whenReady(function() {
					map.createHeatMap();
					if(1 == seq){
						map.openApiReverseGeoCode(map.center);
					}
				});
				
				return map; //9월 서비스
			},
			
			
			/**
			 * 
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
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 2015. 12. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doDone : function(type) {
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
				}
				else if (type == "bookmarkdlg") {
					map.shareInfo.doBookMark($("#savesubj").val());
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
			 * @name         : updateSearchTitle
			 * @description  : 통계제목을 설정한다. 
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			updateSearchTitle : function(title, unit, mapId) {
				var viewId = mapId+1;
				if (unit != undefined) {
					title = title + "(" + unit + ")";
				}
				var combineTitle = title;
				$("#title_combine_" + viewId).empty();//추가
				$("#title_combine_" + viewId).append(title);//추가
				if(0 == mapId){
					title = "기준 데이터 > "+title;
				}else if(1 == mapId){
					title = "추가 데이터 > "+title;
				}
				$("#helper_" + viewId).hide();
				$("#title_" + viewId).empty();
				$("#title_" + viewId).append(title);
				$("#title_" + viewId).show();
				
				var kosisIs = false;
				var dataType = "normal";
				
				if(null != $interactiveMap.ui.curDropParams[mapId] && "kosis" == $interactiveMap.ui.curDropParams[mapId].paramType){
					kosisIs = true;
					combineTitle = "KOSIS 지역통계";
					dataType = "kosis";
				}
				$interactiveMap.ui.curTitle[mapId]["id"] = mapId;
				$interactiveMap.ui.curTitle[mapId]["title"] = combineTitle;
				$interactiveMap.ui.curTitle[mapId]["unit"] = unit;
				$interactiveMap.ui.curTitle[mapId]["mapType"] = dataType;
				$interactiveMap.ui.curTitle[mapId]["curDropParams"] = $interactiveMap.ui.curDropParams[mapId];
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
			 * @name         : informationPopClose
			 * @description  : SGIS 서비스 이용시 유의사항 팝업 닫기
			 * @date         : 2016. 02. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			informationPopClose : function() {
				$("#notice_mini_pop").hide();
			},
			
			/**
			 * @name         : informationPopOpen
			 * @description  : SGIS 서비스 이용시 유의사항 팝업 열기
			 * @date         : 2016. 02. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			informationPopOpen : function() {
				if($("#notice_mini_pop").css("display") == "none") {
					$("#notice_mini_pop").show();
				} else {
					$("#notice_mini_pop").hide();
				}
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
				var html = "<table style='margin:10px;'>";
				var searchYear = "";

				if(this.curDropParams[map.id] != undefined) {
					if(this.curDropParams[map.id].param){
						for(var i = 0; i < this.curDropParams[map.id].param.length; i ++) {
							if (this.curDropParams[map.id].param[i].key == "year") {
								searchYear = this.curDropParams[map.id].param[i].value + "년 ";
							}
						}	
					}
				}
				
				if (type == "data") {
					if (data.info!=undefined&&data.info.length > 0) {
						//kosis
						if(data.info[2] == "kosis") {
							var html = "<table style='margin:10px;'>";
							if (data.properties.adm_nm !== undefined) {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
							}
							
							if(data.info[0] != null && data.info[0] != undefined && data.info[0] != 'NaN') {
								var value = appendCommaToNumber(data.info[0]);
								html += "<tr><td class='statsData'>"
										+ searchYear + value;
							} else {
								html += "<tr><td class='statsData'>-";
							}
							
							if (data.info[1] != undefined) {
								html += " (" + data.info[1] + ")";
							}
						    html += "</td></tr>";
						}else {
							//나의 데이터일 경우
							if(data.info[0].api_id == "API_MYDATA") {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
								for(var i = 0; i < data.info[0].userData.length; i ++) {
									html += "<tr>";
									html += "<td>" + data.info[0].userData[i].title + " : " + data.info[0].userData[i].data + "</td>";
									html += "</tr>";
								}
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								
							} else {	//일반 조회일 경우
								var showName = {
										"tot_ppltn" : "총인구",
										"tot_ppltn_male" : "총인구(남자)",
										"tot_ppltn_fem" : "총인구(여자)",
										"avg_age" : "평균나이",
										"avg_age_male" : "평균나이(남자)",
										"avg_age_fem" : "평균나이(여자)",
										"ppltn_dnsty" : "인구밀도",
										"aged_child_idx" : "노령화지수",
										"oldage_suprt_per" : "노년부양비",
										"juv_suprt_per" : "유년부양비",
										"tot_suprt_per" : "총부양비",
										"population" : "인구",
										"tot_worker" : "종사자수",
										"corp_cnt" : "사업체수",
										"household_cnt" : "가구수",
										"house_cnt" : "주택수",
										"farm_cnt" : "농가수",
										"forestry_cnt" : "임가수",
										"fishery_cnt" : "어가수",
										"tot_family" : "총가구",
										"avg_fmember_cnt" : "평균가구원수",
										"tot_house" : "총주택",
										"nongga_cnt" : "농가(가구)",
										"nongga_ppltn" : "농가(인구)",
										"imga_cnt" : "임가(가구)",
										"imga_ppltn" : "임가인구",
										"naesuoga_cnt" : "내수면총어가",
										"naesuoga_ppltn" : "해수면어가인구",
										"haesuoga_cnt" : "해수면총어가",
										"haesuoga_ppltn" : "해수면어가인구",
										"employee_cnt" : "종사자수"
									};
									
								for (var i = 0; i < data.info.length; i++) {
									var tmpData = data.info[i];
									if (i == 0) {
										if (data.properties.adm_nm !== undefined) {
											html += "<tr><td class='admName'>"
												 + data.properties.adm_nm
												 + "</td></tr>"
												 + "<tr style='height:5px'></tr>";
										}
										
										//집계구 일경우
										if (data.properties.adm_cd.length > 7) {
											html += "<tr>";
											html += "<td class='statsData'>집계구 : " + data.properties.adm_cd + "</td>";
											html += "</tr>";
										}
									}
									
									if (tmpData.showData != undefined && tmpData.showData.length > 0) {
										var filterName = ""; 
										var title = "";
										if (showName[tmpData.showData] != undefined) {
											filterName = showName[tmpData.showData];
										}else{
											if(tmpData.div_nm!=null && tmpData.div_nm != undefined){
												filterName = tmpData.div_nm;
											}
										}
										html += "<tr style='font-size:12px;padding-left:5px;'>";
										if (filterName.length > 0) {
											title = searchYear +" " + filterName + " : ";
										} else {
											title = searchYear + " : ";
										}
										
										//5미만의 데이터의 경우, N/A처리
										//인구총괄의 경우, 평균나이, 인구밀도, 노령화지수, 노년부양비, 유년부양비, 총부양비는 제외
										var value;
										if (parseFloat(tmpData[tmpData.showData]) < 5 && 
											tmpData.showData != "avg_age" &&
											tmpData.showData != "ppltn_dnsty" &&
											tmpData.showData != "aged_child_idx" && 
											tmpData.showData != "oldage_suprt_per" &&
											tmpData.showData != "juv_suprt_per" && 
											tmpData.showData != "tot_suprt_per" &&
											// 2016. 03. 24 j.h.Seok modify
											//tmpData.showData != "corp_cnt" &&
											tmpData.showData != "tot_worker" &&
											tmpData.showData != "avg_fmember_cnt" &&
											tmpData.showData != "employee_cnt" &&
											tmpData.showData != "cnt") {
											value = "N/A";
										}else {
											value = appendCommaToNumber(tmpData[tmpData.showData]);
										}
										
										if (value != "N/A") {
											html += "<td class='statsData'>"+title+value+" ("+tmpData.unit+")</td>";
										}else {
											html += "<td class='statsData'>"+title+value+"</td>";
										}
										
									/*	//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위삭제
										if (tmpData.showData != "aged_child_idx" && 
											tmpData.showData != "oldage_suprt_per" &&
											tmpData.showData != "juv_suprt_per" && 
											tmpData.showData != "tot_suprt_per" && value != "N/A") {
											html +=  " ("+ tmpData.unit +")";
										}*/

										html += "</td></tr>";
									}	
								}

							}
						}
					}else {
						html += "<tr><td class='statsData'>N/A</td></td>";
					}
					
				}else if (type == "build") {
					var info = data.properties;
					var lowest = "";
					var highest = "지상" + Math.abs(info.highest_flr) + "(층)";
					if(info.lowest_flr < 0) {
						lowest = "지하" + Math.abs(info.lowest_flr) + "(층)";	
					}else {
						lowest = "지상" + Math.abs(info.lowest_flr) + "(층)";	
					}
					
					var bd_nm = "";
					if(info.bd_nm != undefined && info.bd_nm.length > 0 ) {
						bd_nm = info.bd_nm;
					}
					html += "<tr><td class='admName'>" + bd_nm + "</td></tr>" 
					     +  "<tr style='height:10px;'></tr>" 
					     +  "<tr><td class='statsData'>" +lowest + " ~ "+ highest +"</td></tr>" 
					     +	"<tr style='height:5px;'></tr>" 
					     +  "<tr><td class='statsData'>" + info.bd_naddr + "</td></tr>";
				}
				html += "</table>";

				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1,
					pane:"infowindowPane"
				}).addTo(map.gMap)._showToolTip(event);
				
				$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
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
				//9월 서비스
				//options.map.isDrop = true;
				//options.map.undoDropLayerBounds();
				
				//param의 adm_cd가 00(전국)일 경우 adm_cd 삭제
				var tmpOptions = [];
				for (var i = 0; i < options.param.length; i ++) {
					if((options.param[i].key == "adm_cd" && options.param[i].value == "00")|| options.param[i].key == "adm_cd") { //9월 서비스
					} else {
						tmpOptions.push(options.param[i]);
					} 
				}
				options.param = tmpOptions;
				var api_id = options.api_id;
				if 	    (api_id == "API_0301") $interactiveMapApi.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $interactiveMapApi.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $interactiveMapApi.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $interactiveMapApi.request.openApiCompany(options);
				else if (api_id == "API_0305") $interactiveMapApi.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $interactiveMapApi.request.openApiHouse(options);
				else if (api_id == "API_0307") $interactiveMapApi.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $interactiveMapApi.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $interactiveMapApi.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $interactiveMapApi.request.openApiHouseHoldMember(options);
				else if (api_id == "API_4011") $interactiveMapApi.request.openApiItemCombine(options);
				else if (api_id == "local") $interactiveMapApi.request.localGovernment(options);
				pageCallReg();
				
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
			reqSetParams : function (tmpParam, adm_cd, adm_nm, api_id, map, type) {
				//0레벨,2레벨 집계구 조회일 경우,
				//레벨상관없이 집계구가 나와야 하므로, low_search를 강제로 1로 주기위에
				//소스위치를 옮김
				var low_search;
				if (adm_cd.length > 7 || type == "gibgae") {
					low_search = "1";
					adm_cd = adm_cd.substring(0, 7);
				}else {
					low_search = map.boundLevel;
				}
				this.curAdmCode = adm_cd;
				map.curAdmCd = adm_cd;
				map.curDropCd = adm_cd;
				
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
				if(api_id!="local"){
					var has_low_search = false;
					$.each(params.param,function(){
						if(this.key=="low_search"){
							has_low_search = true;
							return false;
						}
					});
					if(has_low_search==false){
						params.param.push({
							key : "low_search",
							value : low_search
						});
					}
				}
				
				return params;
			},
			getCookie : function (name) {				 
				var nameOfCookie = name + "=";  
				var x = 0;  
				while (x <= document.cookie.length)  
				{  
					var y = (x+nameOfCookie.length);  
				    if ( document.cookie.substring( x, y ) == nameOfCookie) {  
				    	if ((endOfCookie=document.cookie.indexOf(";", y)) == -1)  
				    		endOfCookie = document.cookie.length;
				           	return unescape(document.cookie.substring(y, endOfCookie));  
				       	}  
				    	x = document.cookie.indexOf(" ", x) + 1;  
				    	if (x == 0)  
				    		break;  
				}  
				return "";
			 },  	
			
			setCookie : function(name, value, expiredays) {					
				var todayDate = new Date();   
				todayDate.setDate(todayDate.getDate() + expiredays);   
				document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";"				   
			},
			clearIntroData : function(map) {
				map.clearDataOverlay();
				map.multiLayerControl.clear();
				
				if (map.geojson) {
					map.geojson.remove();
					map.geojson = null;
				}
			}
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$interactiveMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				if (map.zoom < 10 && map.isInnerMapShow) {
					$interactiveMap.ui.doInnerMap(map.id+1);
				}
			},

			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
				var api_id = "";
				var index = null;

				// share정보 초기화
				$interactiveMap.ui.curMapId = map.id;
				$interactiveMapApi.request.combineFailCnt = 0;
				
				map.dropInfo = null;
				
				if ($interactiveMap.ui.curDropParams == undefined) {
					$interactiveMap.ui.curDropParams = [];
				}
				
				var id = $("#" + source.prop("id")).find("a").attr("id");
				var atdrcYn = $("#" + source.prop("id")).find(".atdrc_yn").html();
				var tmpParamList = deepCopy($interactiveLeftMenu.ui.arParamList);
				
				//경계고정을 하였을 경우,
				//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
				if (map.isFixedBound) {
					map.setBoundSelectedMoode("multi");
					if (map.selectedBoundList.length == 0) {
						map.setBoundSelectedLayer();
					}
				}
				
				//kosis
				if (id.split("-")[0] == "kosis") {
					map.curAdmCd = data.adm_cd;
					var tempAdmCd = data.adm_cd;
					if (tempAdmCd == "00") {
						tempAdmCd = "1";
					}
					var admCdLen = tempAdmCd.length;
					interactiveMapKosis.map = map;
					index = id.split("-")[1];

					var selParams = [];
					for (var i = 0; i < tmpParamList.length; i++) {
						if (tmpParamList[i].idx == index) {
							interactiveMapKosis.curSelectedTitle = tmpParamList[i].title;
							selParams.push(tmpParamList[i].params);
							break;
						}
					}
					
					//kosis 년도정도 설정
					var kosisYear = null;
					for (var k=0; k<selParams[0].length; k++) {
						if (selParams[0][k].key == "kosis_data_year") {
							kosisYear = selParams[0][k].value;
							if (kosisYear.length > 4) {
								kosisYear = kosisYear.substring(0,4);
							}
							break;
						}
					}
					if (kosisYear != null) {
						$interactiveMap.ui.curDropParams[map.id] = {
								param : [{
									key : "year",
									value : kosisYear
								}]
						};
					}
					
					$interactiveMap.ui.setDataType(map.id, "kosis");
					$interactiveMap.ui.dropBtnInfo[map.id] = tmpParamList[i];
					$interactiveMap.ui.dropBtnInfo[map.id]["isKosis"] = true;
					interactiveMapKosis.reqSetKosisParam(selParams, tempAdmCd, atdrcYn, map);
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					return;
					
				} else {
					//코시스에서 조회된 세부항목설정창을 닫는다.
					$("#kosisArea").hide();
					
					//전국단위에서 경계레벨 0과 2로 조회할 경우
					//데이터를 조회하지 않는다.
					if (map.boundLevel != "1") {
						if (data.adm_cd == "00") {
							map.clearDataOverlay();
							messageAlert.open("알림", "경계레벨 0과 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
							return;
						}
					}
					
					map.bnd_year = map.bnd_year;
					$interactiveMap.ui.setDataType(map.id, "census");
					$interactiveMap.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
	
					var tmpParam = null;
					for (var i = 0; i < tmpParamList.length; i++) {
						if (tmpParamList[i].idx == index) {
							tmpParam = tmpParamList[i];
							$interactiveMap.ui.dropBtnInfo[map.id] = tmpParamList[i];
							break;
						}
					}
				}
				
				// 다중선택일 경우
				if (map.selectedBoundMode == "multi") {
					map.multiLayerControl.clear();
					if (map.selectedBoundList.length > 0) {
						var admList = null;
						if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
							for (var i=0; i<map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								if (admList == null) admList = [];
								admList.push(adm_cd.substring(0,7));
							}
							if (admList.length > 0) {
								//데이터 중복제거
								var tmpData = [];
								$.each(admList, function(k, el){
									if($.inArray(el, tmpData) === -1) tmpData.push(el);
								});
								admList = tmpData;
						
								for (var i=0; i<admList.length; i++) {
									if (tmpParam != null) {
										map.selectedBoundList = admList;
										var params = $interactiveMap.ui.reqSetParams(tmpParam, admList[i], adm_nm, api_id, map, "gibgae");
										$interactiveMap.ui.curDropParams[map.id] = params;
										$interactiveMap.ui.requestOpenApi(params);
									}
								}
							}
							
						}else {
							for (var i = 0; i < map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
			
								if (tmpParam != null) {
									var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
									$interactiveMap.ui.curDropParams[map.id] = params;
									$interactiveMap.ui.requestOpenApi(params);
								}
							}
						}
					}
				} else {
					if (tmpParam != null) {
						var params = $interactiveMap.ui.reqSetParams(tmpParam, data.adm_cd, data.adm_nm, api_id, map);

						//시계열 초기값 세팅
						$interactiveMap.ui.curDropParams[map.id] = params;
						$interactiveMap.ui.requestOpenApi(params);
					}
					map.setBoundSelectedMoode(null);
				}
			},
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
				var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
				var index = null;
				var adm_cd = "";
				var adm_name= "";
				var api_id = "";
								
				// share정보 초기화
				$interactiveMap.ui.curMapId = map.id;
				$interactiveMapApi.request.combineFailCnt = 0;
				
				//공유 (나의 데이터에서는 shareInfo가 null)
				map.dropInfo = null;
				
				//경계고정을 하였을 경우,
				//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
				if (map.isFixedBound) {
					map.setBoundSelectedMoode("multi");
					if (map.selectedBoundList.length == 0) {
						map.setBoundSelectedLayer();
					}
				}
				
				var id = btn_id;
				var atdrcYn = $("#"+id).find(".atdrc_yn").html();

				// kosis
				if (id.split("-")[0] == "kosis") {
					var tempAdmCd = "";
					var tempAdmNm = "";
					
					var center = map.gMap.getCenter();
					map.gMap.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint(center);  
			                    if (layer._containsPoint(point)){
			                    	tempAdmCd = layer.feature.properties.adm_cd;
			                    	tempAdmNm = layer.feature.properties.adm_nm;
			                    }
						 }
					});
					if (tempAdmCd.length == 0) {
						messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
						return;
					}

					if (tempAdmCd.length > 7) {
						tempAdmCd = tempAdmCd.substring(0,7);
					}
					
					if (tempAdmCd == "00") {
						tempAdmCd = "1";
						tempAdmNm = "전국";//추가
					}
					var admCdLen = tempAdmCd.length;
					interactiveMapKosis.map = map;
					index = id.split("-")[1];

					var selParams = [];
					selParams.push(tmpParam.params);
					
					//kosis 년도정도 설정
					var kosisYear = null;
					for (var k=0; k<selParams[0].length; k++) {
						if (selParams[0][k].key == "kosis_data_year") {
							kosisYear = selParams[0][k].value;
							if (kosisYear.length > 4) {
								kosisYear = kosisYear.substring(0,4);
							}
							break;
						}
					}
					if (kosisYear != null) {
						$interactiveMap.ui.curDropParams[map.id] = {
								param : [{
									key : "year",
									value : kosisYear
								}]
						};
					}
					
					$interactiveMap.ui.setDataType(map.id, "kosis");
					interactiveMapKosis.reqSetKosisParam(selParams, tempAdmCd, atdrcYn, map);
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					return;
				} else {
					
					//코시스에서 조회된 세부항목설정창을 닫는다.
					$("#kosisArea").hide();
					
					map.bnd_year = map.bnd_year;
					$interactiveMap.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];
					// 버튼 시각 효과
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					$interactiveMap.ui.dropBtnInfo[map.id] = tmpParam;
					$interactiveMap.ui.setDataType(map.id, "census");
				}
				
				if (map.selectedBoundMode == "multi") {
					map.multiLayerControl.clear();
					
					if (map.selectedBoundList.length > 0) {
						var admList = null;
						if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
							for (var i=0; i<map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel != "1") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 0과 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
								
								if (admList == null) admList = [];
								admList.push(adm_cd.substring(0,7));
							}
							if (admList.length > 0) {
								//데이터 중복제거
								var tmpData = [];
								$.each(admList, function(k, el){
									if($.inArray(el, tmpData) === -1) tmpData.push(el);
								});
								admList = tmpData;
						
								for (var i=0; i<admList.length; i++) {
									if (tmpParam != null) {
										map.selectedBoundList = admList;
										var params = $interactiveMap.ui.reqSetParams(tmpParam, admList[i], adm_nm, api_id, map, "gibgae");
										$interactiveMap.ui.curDropParams[map.id] = params;
										$interactiveMap.ui.requestOpenApi(params);
									}
								}
							}
							
						}else {
							for (var i = 0; i < map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel != "1") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 0과 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
			
								if (tmpParam != null) {
									var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
									$interactiveMap.ui.curDropParams[map.id] = params;
									$interactiveMap.ui.requestOpenApi(params);
								}
							}
						}
					}
					
				}else {
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
					
					if (adm_cd.length == 0) {
						messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
						return;
					}
					
					//전국단위에서 경계레벨 0과 2로 조회할 경우
					//데이터를 조회하지 않는다.
					if (map.boundLevel != "1") {
						if (adm_cd == "00") {
							map.clearDataOverlay();
							messageAlert.open("알림", "경계레벨 0과 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
							return;
						}
					}
					if (tmpParam != null) {				
						var params = $interactiveMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
						//시계열 초기값 세팅
						$interactiveMap.ui.curDropParams[map.id] = params;
						$interactiveMap.ui.requestOpenApi(params);
					}
					map.setBoundSelectedMoode(null);
				}
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
				if (type != "polygon") {
					if (type == "data") {
						if (data.info!=undefined&&data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$interactiveMap.ui.createInfoTooltip(event, data, type, map);
				}
			},

			
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
			didMouseOutPolygon : function(event, data, type, map) {
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					for (var i=0; i<map.selectedBoundList.length; i++) {
						var layer = map.selectedBoundList[i];
						if (event.target == layer) {
							layer.setStyle({
								weight : 3,
								color : "white",
								dashArray : layer.options.dashArray,
								fillOpacity : 0.7,
								fillColor : "#F06292"
							});
						}
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
				if (type == "build") {
					if ($interactiveMap.ui.buildPopup != null) {
						$interactiveMap.ui.buildPopup.close();
					}
					
					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
							   $("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$interactiveMap.ui.buildPopup = 
						window.open(
							"/view/indoor/indoorMap?sufid=" + data.properties.sufid, 
							"건물상세정보",
							"top="+top+", left="+left+", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);
					
				}
				
				//다중경계선택
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					var layer = event.target;
					var boundList = map.selectedBoundList;
					var tmpBoundList = [];
					var isEqualLayer = false;
					
					for (var i=0; i<boundList.length; i++) {
						if (boundList[i].feature.properties.adm_cd == layer.feature.properties.adm_cd) {
							map.clearLayerStyle(layer);
							isEqualLayer = true;
						}else {
							tmpBoundList.push(boundList[i]);
						}
					}
					map.selectedBoundList = tmpBoundList;
					
					if (isEqualLayer) {
						return;
					}
					
					if (boundList.length >= 3) {
						messageAlert.open("알림", "다중경계는 최대 3개까지 선택가능합니다.");
						return;
					}
					
					if (layer.options.origin == undefined) {
						layer.options["origin"] = {
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor	
						};
					}					
					
					layer.setStyle({
						weight : 3,
						color : "white",
						dashArray : layer.options.dashArray,
						fillOpacity : 0.7,
						fillColor : "#F06292"
					});
					map.selectedBoundList.push(layer);
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
			didDrawCreate : function(event, type, map) {
				var layer = event.layer;
				var area = "";
				
				//다각형 및 사각형일때, 특정 영역을 넘어서면 알림 메시지 호출
				if (type == "polygon" || type == "rectangle") {
					var shapeArea = layer._getArea();
					if (shapeArea > 113000000) {
						messageAlert.open('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
						layer._shapeGroup.removeLayer(layer._shape);
						layer._shape = null;
						layer._map.dragging.enable();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
						return;
					}
				}
				
				if(type == "polygon") {
					area = "POLYGON((";
					for(var i = 0; i < layer.getUTMKs()[0].length; i++) {
						area += layer.getUTMKs()[0][i].x + " " + 
								 layer.getUTMKs()[0][i].y + ",";
						
						if(i == layer.getUTMKs()[0].length - 1) {
							area += layer.getUTMKs()[0][0].x + " " + 
							         layer.getUTMKs()[0][0].y;
						}
					}
					area += "))";
				}
				else if(type == "circle") {
					area = "CIRCLE(" + 
						    	layer._utmk.x + " " + 
						    	layer._utmk.y + "," + 
						    	layer.getRadius()+ 
						    ")";
				}
				else if(type == "rectangle") {
					area = "RECTANGLE(" +
								layer._utmks[0][0].x + " " + 
								layer._utmks[0][0].y + "," + 
								layer._utmks[0][2].x + " " +
								layer._utmks[0][2].y + 
							")";
				}
				
				if (map.curPolygonCode == 5) {
					map.setZoom(9);
					map.curPolygonCode = 5;
				}
				map.selectedBoundMode = "multi";
				map.selectedBoundList = [];
				$interactiveMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);	
			},
			
			/**
			 * 
			 * @name         : didFinishedMultidata
			 * @description  : 사용자경계(multi layer data) 조회 후, 콜백
			 * @date         : 2016. 02. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param dataList 표출된 데이터리스트
			 * @param admCdList 행정동코드리스트
			 * @param @param map   델리케이트
			 */
			didFinishedMultidata : function(dataList, admCdList, map) {
				var admNameList = [];
				for (var i=0; i<dataList.length; i++) {
					var layer = dataList[i].layer;
					admNameList.push(layer.features[0].properties.adm_nm);
				}
				var options = {
						params : {
							adm_cd : admCdList.join(","),
							adm_nm : admNameList.join(","),
							title : "사용자영역 통계",
							map : map
						}
				};
				
				//나의 데이터일 경우 데이터보드를 실행하지 않고 멈춘다.
				if($interactiveLeftMenu.ui.curSelectedStatsType == "userData") {
					return;
				}
				
				//$interactiveDataBoard.ui.updateDataBoardMulti(dataList, options);
			}
	};
	function doGetSggBoundary(sidoCdList, index, map, callback) {
		$.ajax({
			type : "GET",
			url : contextPath + "/js/data/geo_sgg_"+map.bnd_year+"/geo_sgg_"+sidoCdList[index].sido_cd+"_"+map.bnd_year+".js",
			async : true,
			success : function(res) {
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
				doGetSggBoundary(sidoCdList, index, map, callback);
			},
			dataType: "json",
			error:function(e){}  
		});
	}
	$interactiveMap.event = {
			
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
						$(".tb_combine").parent().hide();
						$(".viewTitle > span").hide();
					}else if (sceneInx == 2) {
						var tmpView = [];
						var isSameView = false;
						$(".sceneBox.on").each(function() {
							var id = parseInt($(this).attr("id").split("view")[1])-1;
							tmpView.push(id);
							if (id == $interactiveMap.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$interactiveMap.ui.curMapId = tmpView[0];
							}else {
								$interactiveMap.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($interactiveMap.ui.curMapId + 1);
							switch($interactiveMap.ui.curMapId) {
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
							$interactiveMap.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$interactiveMap.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$interactiveMap.ui.curMapId = 2;
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
					
					var curMapId = $interactiveMap.ui.curMapId;
					var dataType = $interactiveMap.ui.dataTypeList[curMapId];		//census, kosis, publicData, userData
					
//					$mydataDataBoard.ui.delegateSetting($interactiveMap.ui);			//나의데이터 세팅
//					$publicDataBoard.ui.delegateSetting($interactiveMap.ui);			//공공데이터 세팅
//
//					//다른 분할맵을 선택할 경우
//					if(curMapId != $interactiveDataBoard.ui.map_id) {
//						if(dataType == "census") {
//							//현재 선택된 맵으로 데이터보드 다시 그리기
//							$interactiveDataBoard.ui.reDraw(curMapId);
//						} else if(dataType == "userData") {
//							//현재 선택된 맵으로 데이터보드 다시 그리기
//							$mydataDataBoard.ui.reDraw(curMapId);
//						} else if(dataType == "publicData") {
//							//현재 선택된 맵으로 데이터보드 다시 그리기
//							$publicDataBoard.ui.reDraw(curMapId);
//						} else {
//							//조회된 데이터가 없으면 데이터보드 삭제
//							$interactiveDataBoard.ui.reset(curMapId);
//						}
//					}
//					$interactiveDataBoard.ui.map_id = curMapId;		//현재 선택된 맵 아이디 저장
					
					//Left Menu 통계표출 연동
					$interactiveLeftMenu.ui.showNumberSetting();
			    });
				
				$(".tb_radio .fl").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_radio .fr").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });

				//작성 취소 버튼
				$("#policyWriteCancel").click(function(){
					location.href = "/view/map/policyWriteMap";
				});
				//좌측 데이터불러오기
				$("#leftMenu").click(function(){
					$(".cont_policy").show();
		        	$("#quickBox-01").stop().animate({"left":"0"},200);
		        	$interactiveMap.ui.curDataSelect = "left";
		        	$interactiveMap.ui.curMapId = 0;
		        });
		        
		        //우측 데이터불러오기
				$("#rightMenu").click(function(){
					$(".cont_policy").hide();
		        	if("dataPoi" == $interactiveMap.ui.curMenuType){
		        		$('.quickBox.step04, .quickBox.step03, .quickBox.step02').css({"left":"-280px"});
		        		$('.quickBox.step01').css({"left":"-280px"});

		        		$("#quickBox-02").stop().animate({"left":"0"},200);
		        	}else if("dataData" == $interactiveMap.ui.curMenuType){
		        		$('.quickBox.step04, .quickBox.step03, .quickBox.step02').css({"left":"-280px"});
		        		$('.quickBox.step01').css({"left":"-280px"});

		        		$("#quickBox-01").stop().animate({"left":"0"},200);
		        		$interactiveMap.ui.curMapId = 1;
		        	}
		        	$interactiveMap.ui.curDataSelect = "right";
		        });
				
			}
	};
	
}(window, document));