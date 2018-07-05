/**
 * 살고싶은 우리동네 검색관련
 * 
 * history : (주)유코아시스템, 1.0, 2015/12/23  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	var activeFillColor = "#c00";
	var activeFillOpacity = "0.7";
	var defaultFillOpacity = "0.2";
	
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	
	$houseAnalysisMap.search = {
		isLimitMax : true,//검색할떄 지표 개수 제한 유무 
		isAbode : null,//주거현황보기 검색인지 유무
		isIndicator : null,//지도에 통계 셋팅한 것이 지표인지 유무
		isCensus : null,//지도에 통계 셋팅한 것이 센서스인지 유무
		isIdealType : null,//지도에 통계 셋팅한 것이 간편동네찾기 유무
		isOverrideBoundary : false,//경계를 임의의 경계로 덮어 씌운지 여부
		activeAdmCd : null,//현재 활성화된 곳의 행정동 코드
		searchAdmCd : null,//검색한 행정동 코드
		isShowDatabaord : null,//데이터보드 보여줄지의 유무
		isStandBy : null,
		lastMapOption : {
			center : null,
			zoom : null
		},
		preLegendType : null,//범례 타입
		/**
		 * @name        : init
		 * @description : 초기화
		 * @date        : 2016. 07. 02.
		 * @author	    : 나광흠
		 * @history 	:
		 */
		init : function(){
			this.isAbode = null;
			this.isIndicator = null;
			this.isCensus = null;
			this.isIdealType = null;
			this.activeAdmCd = null;
			this.searchAdmCd = null;
			this.isShowDatabaord = null;
			this.isStandBy = null;
			this.lastMapOption.center = null;
			this.lastMapOption.zoom = null;
			$houseAnalysisMap.ui.indicatorStatMap = null;
			$houseAnalysisMap.search.mapStat.indicator.clear();
			if($houseAnalysisMap.ui.doRemoveFlag){
				$("#dataBoard>a").addClass("disabled");
			}
			var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
			map.atdrc_yn = null;
			$houseAnalysisMap.ui.doClearMap(function(){
				map.gMap.setMaxZoom(13);
			});
			$houseAnalysisMap.databoard.closeDataBoard();
			$(".dataSideScroll").mCustomScrollbar("scrollTo",0);
			$(".interactiveBar>.helperText>span").empty();
		},
		/**
		 * @name             : setTitle
		 * @description      : 타이틀 셋팅
		 * @date             : 2016. 08. 16.
		 * @author	         : 나광흠
		 * @history 	     :
		 * @param adm_nm     : 행정동명
		 * @param stats_name : 통계명
		 */
		setTitle : function(adm_nm,stats_name){
			if(this.isIndicator===true||this.isCensus===true){
				$(".interactiveBar>.helperText>.location-name").text(adm_nm);
				$(".interactiveBar>.helperText>.map-stats-name").empty().text(" - "+stats_name);
				if(this.isIndicator==true){
					var node = bClassInfoList[$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id].indicator[$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id];
					$(".interactiveBar>.helperText>.map-stats-name").append(
						$("<a/>",{"href":"javascript:void(0)","data-subj":node.m_class_idx_nm,"title":$houseAnalysisMap.ui.hasText(node.det_exp)?node.det_exp.replace(/\n/g,"<br>"):"","style":"margin-left: 10px;background:none;"}).append(
							$("<img/>",{"src":contextPath+"/img/ico/ico_i.gif","alt":"지표설명"})
						).tooltip({ 
							open: function( event, ui ) {
								$(".ui-tooltip .subj").text($(this).attr("data-subj"));
								 ui.tooltip.css("max-width", "400px");
							},
							position: {
							      my: "left+10 top", at: "right top", 
							      using: function( position, feedback ) {
							    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
							    		  $( this ).css( position ).prepend("<span class='subj'></span>");
							    	  }else {
							    		  $( this ).css( position ); 
							    	  }
							    	  
							          $( "<div>" )
							            /*.addClass( "arrow" )*/
							            .addClass( feedback.vertical )
							            .addClass( feedback.horizontal )
							            .appendTo( this );
							      }
							},
							content: function () {
								return $(this).prop("title");
					        }
						})
					);
				}
			}
		},
		/**
		 * @name        : activeLayer
		 * @description : 레이어 활성화
		 * @date        : 2016. 07. 02.
		 * @author	    : 나광흠
		 * @history 	:
		 * @param layer	: layer
		 */
		activeLayer : function(layer){
			if($houseAnalysisMap.ui.recommendDataGeojson){
				$houseAnalysisMap.ui.recommendDataGeojson.eachLayer(function(recommendLayer) {
					recommendLayer.removeCaption();
					if(recommendLayer.options.fillOpacity==activeFillOpacity){
						recommendLayer.setStyle({
							fillOpacity: defaultFillOpacity
						});
					}
				});
				layer.setCaption({title:layer.feature.properties.adm_nm, color:"#000",size:"15px"}, [layer.feature.properties.x,layer.feature.properties.y]);
				if(layer.captionObj&&layer.captionObj._captionspan){
					$(layer.captionObj._captionspan).click(function(e){
						$houseAnalysisMap.ui.recommendDataGeojson.eachLayer(function(recommendLayer) {
							if(recommendLayer._containsPoint ) {
								var point = map.gMap.mouseEventToLayerPoint(e); // 터치 포인트
								if( recommendLayer._containsPoint(point)){
									recommendLayer.fire("click");
								}
							}
						});
					});
					$(layer.captionObj._captionspan).css({
						"font-family": "나눔고딕B",
						"text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
						"-moz-text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
						"-webkit-text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
					});
				}
				layer.setStyle({
					fillOpacity: activeFillOpacity
				});
			}
		},
		asan : {
			/**
			 * @name          : housePoint
			 * @description   : 아산시 고유정보 전원주택 포인트
			 * @date          : 2016. 02. 04.
			 * @author        : 나광흠
			 * @history       :
			 */
			housePoint : function(){
				var obj = new sop.portal.asanHousePointList.api();
				obj.onBlockUIPopup();
				obj.request({
					method: "POST",
					async: true,
					url : contextPath+"/ServiceAPI/house/getAsanHousePointList.json"
				});
			},
			/**
			 * @name          : returnFarm
			 * @description   : 아산시 고유정보 전원주택 포인트
			 * @date          : 2016. 02. 04.
			 * @author        : 나광흠
			 * @history       :
			 */
			returnFarm : function(){
				var obj = new sop.portal.asanReturnFarmPolygonList.api();
				obj.onBlockUIPopup();
				obj.addParam("base_year", $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year);
				obj.request({
					method: "POST",
					async: true,
					url : contextPath+"/ServiceAPI/house/getAsanReturnFarmPolygonList.json"
				});
			}
		},
		
		//============ 2017.11.06 [개발팀] LBDMS데이터연계 START ===========//
		lbdms : {
			/**
			 * @name                : doReqLbdmsData
			 * @description         : LBDMS 데이터 장보을 설정한다.
			 * @date                : 2017. 11. 06.
			 * @author	            : 권차욱
			 * @history 	        :
			 * @param id			: 아이디
			 * @param adm_cd		: 행정동코드
			 */
			doReqLbdmsData : function(data_type, seq, adm_cd, bord_level) {
				var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
				var params = {
						seq : seq,
						type : bord_level,
						adm_cd : adm_cd
				};
				switch (data_type) {
					case "poi":
						this.getLbdmsPoiDataList(params, map);
						break;
					case "color":
						this.getLbdmsPolygonDataList(params, map);
						break;
					default:
						break;
				}
			},
			
			/**
			 * @name                : getLbdmsDataList
			 * @description         : LBDMS 전송데이터 목록을 가져온다.
			 * @date                : 2017. 11. 06.
			 * @author	            : 권차욱
			 * @history 	        :
			 * @param adm_cd		: 행정동코드
			 */
			getLbdmsDataList : function(adm_cd, callback) {
				var obj = new sop.portal.lbdmsDataList.api();
				obj.onBlockUIPopup();
				obj.addParam("adm_cd", adm_cd);
				obj.request({
					method: "POST",
					async: true,
					url : contextPath+"/ServiceAPI/house/getLbdmsDataList.json",
					options : {
						adm_cd : adm_cd,
						callback : callback
					}
				});
			},
			
			/**
			 * @name                : getLbdmsPolygonDataList
			 * @description         : LBDMS 집계데이터를 가져온다.
			 * @date                : 2017. 11. 06.
			 * @author	            : 권차욱
			 * @history 	        :
			 * @param params		: 파라미터정보
			 * @param map			: 맵 정보
			 */
			getLbdmsPolygonDataList : function(params, map) {
				var obj = new sop.portal.lbdmsPolygonDataList.api();
				obj.onBlockUIPopup();
				obj.addParam("seq", params.seq);
				obj.addParam("type", params.type);
				obj.request({
					method: "POST",
					async: true,
					url : contextPath+"/ServiceAPI/house/getLbdmsPolygonDataList.json",
					options : {
						params : params,
						map : map
					}
				});
			},
			
			/**
			 * @name                : getLbdmsPoiList
			 * @description         : LBDMS POI 데이터를 가져온다.
			 * @date                : 2017. 11. 06.
			 * @author	            : 권차욱
			 * @history 	        :
			 * @param params		: 파라미터정보
			 * @param map			: 맵 정보
			 */
			getLbdmsPoiDataList : function(params, map) {
				var obj = new sop.portal.lbdmsPoiDataList.api();
				obj.onBlockUIPopup();
				obj.addParam("seq", params.seq);
				obj.addParam("adm_cd", params.adm_cd);
				obj.request({
					method: "POST",
					async: true,
					url : contextPath+"/ServiceAPI/house/getLbdmsPoiDataList.json",
					options : {
						params : params,
						map : map
					}
				});
			},
			
			/**
			 * @name                : getLbdmsCategoryDataList
			 * @description         : LBDMS 지표 데이터를 가져온다.
			 * @date                : 2017. 11. 06.
			 * @author	            : 권차욱
			 * @history 	        :
			 * @param adm_cd		: 행정동코드
			 */
			getLbdmsCategoryDataList : function(adm_cd) {
				this.getLbdmsDataList(adm_cd, function(res, options) {
					$houseAnalysisMap.search.lbdms.drawLbdmsDataCategoryBtn(res, options)
				});
			},
			
			/**
			 * @name                : drawLbdmsDataSearchBtn
			 * @description         : LBDMS 지표데이터 버튼을 생성한다.
			 * @date                : 2017. 11. 06.
			 * @author	            : 권차욱
			 * @history 	        :
			 * @param res		    : 결과정보
			 * @param options	    : 옵션정보
			 */
			drawLbdmsDataSearchBtn : function(res, options) {
				var result = res.result;
				var adm_cd = options.adm_cd;
				if (result.length > 0) {
					var adm_nm = $("#inter-recommend-sido-select option:selected").html();
					var sgg_nm = $("#inter-recommend-sgg-select option:selected").html();
					if (sgg_nm != "전체") {
						adm_nm += " "+sgg_nm; 
					}
					
					var html = "";
					for (var i=0; i<result.length; i++) {
						var class_nm, img;
						switch(parseInt(result[i].spacial_data_type_cd)) {
							case 1: //poi
								class_nm = "poi";
								img = "/img/house/index_type_poi.png";
								break;
							case 3: //집계
								class_nm = "color";
								img = "/img/house/index_type_color.png";
								break;
							default:
								class_nm = "color";
								img = "/img/house/index_type_color.png";
								break;
						}
						
						html += "<li>";
						html +=		"<a href='#' id='"+class_nm+"_"+result[i].seq+"' class='"+class_nm+"' onclick=\"javascript:$houseAnalysisMap.search.lbdms.doReqLbdmsData(\'"+class_nm+"','"+result[i].seq+"','"+adm_cd+"','"+result[i].bord_level+"');\">";
						html +=			"<img src='/img/house/icon_HML00"+result[i].info_link_srv_realm_cd+"_ov.png' alt=''>"+ result[i].open_data_nm;
						html +=			"<img src='"+img+"' alt=''>";
						html +=		"</a>";
						html +=	"</li>";
					}

					$("#data-board-dt-5 > .areaSpan").html(adm_nm + " 고유정보");
					$("#data-board-dt-5").parent().show();
					$("#data-board-dt-5").parent().next().show();
					$("#lbdms-area").empty();
					$("#lbdms-area").html(html);
					$("#lbdms-area").show();
				}
			},
			
			/**
			 * @name                : drawLbdmsDataCategoryBtn
			 * @description         : LBDMS 지표데이터 지표를 생성한다.
			 * @date                : 2017. 11. 06.
			 * @author	            : 권차욱
			 * @history 	        :
			 * @param res		    : 결과정보
			 * @param options	    : 옵션정보
			 */
			drawLbdmsDataCategoryBtn : function(res, options) {
				$(".lbdms").remove();
				var result = res.result;
				if (result.length > 0) {
					for (var i=0; i<result.length; i++) {
						var category = result[i].info_link_srv_realm_cd;
						var parentId = "HML000" + parseInt(category);
						var parentClass = ".index" + parseInt(category);
						var type = result[i].spacial_data_type_cd;
						var bordLevel = result[i].bord_level;
						var typeNm, type_class;
						switch(parseInt(type)) {
							case 1:
								typeNm = "POI";
								type_class = "poi";
								break;
							case 2:
								typeNm = "색상";
								type_class = "color";
								break;
							default:
								typeNm = "색상";
								type_class = "color"
								break;
						}
						
						if (bordLevel == undefined) {
							bordLevel = "3";
						}

						var html = "";
						html +=	"<li id='"+type_class+"_"+result[i].seq+"' class='sub-class lbdms' title='' data-text='"+result[i].open_data_nm+"'>";
						html +=		"<a data-subj='"+result[i].open_data_nm+"' data-parent-id='"+parentId+"' data-level='"+bordLevel+"' data-text='LBDMS에서 전송된 데이터입니다.'>";
						html +=			"<img src='/img/house/icon_"+parentId+"_ov.png' alt='sss' class='mCS_img_loaded'>"+result[i].open_data_nm+"</a>";
						html +=			"<span class='MapKind type1'>"+typeNm+"</span>";
						html +=	"</li>";
						$("#look-select > "+parentClass).find("ul").append(html);
					}
					
					$("body").on("click", ".lbdms>a", function() {
						if($("#look-select-type").is(":checked")){
							$("#look-abode-box .HouseMap .IndexSelect li[class^=index]>ul>li").removeClass("M_on");
							$(this).parent("li").addClass("M_on");
						}
						$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
						return false;
					});
				}
			}
			
		},
		//============ 2017.11.06 [개발팀] LBDMS데이터연계 END ===========//
		
		/**
		 * @name                : abode
		 * @description         : 주거현황보기
		 * @date                : 2016. 07. 02.
		 * @author	            : 나광흠
		 * @history 	        :
		 */
		abode :{
			b_class_idx_id : null,//데이터보드 대분류
			m_class_idx_id : null,//데이터보드 중분류
			/**
			 * @name         : init
			 * @description  : 설정 초기화
			 * @date         : 2016. 08. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			init : function(){
				$houseAnalysisMap.search.init();
				$houseAnalysisMap.databoard.initSmallLocationRadio();
				$houseAnalysisMap.search.isAbode = true;
				$("#high-location").off("click").hide();
			},
			/**
			 * @name         : setDataboard
			 * @description  : 데이터 보드 검색
			 * @date         : 2016. 08. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			setDataboard : function(){
				$houseAnalysisMap.databoard.areaComplex(this.b_class_idx_id,this.m_class_idx_id);//지역 종합 현황 보기
				$houseAnalysisMap.databoard.databoardViewSetting("current");
				$houseAnalysisMap.chart.smallLocationChartBridge($("#detailChart4>.ThisAreaInfo>ul>li.M_on").children("a").data("type"));
			},
			/**
			 * @name         : search
			 * @description  : 주거현황보기 초기 조회
			 * @date         : 2016. 08. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			search :function(){
				$houseAnalysisMap.noReverseGeoCode = true;
				var abs = new sop.portal.absAPI();
				var mapOption,adm_cd,zoom,searchLevel = 1,map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId],locationSelectBox;
				this.init();
				$houseAnalysisMap.ui.recommendDataGeojson = null;
				$houseAnalysisMap.ui.recommendMarker = null;
				if($("#look-select-location").is(":checked")){
					$houseAnalysisMap.search.mapStat.indicator.adm_cd = $("#current-sido-select").val()+$("#current-sgg-select").val();
					mapOption = $houseAnalysisMap.databoard.getMapOptions($houseAnalysisMap.search.mapStat.indicator.adm_cd);
					locationSelectBox = $("#current-"+(mapOption.adm_cd&&mapOption.adm_cd.length>=5?"sgg":"sido")+"-select option:selected");
				}else{
					$houseAnalysisMap.search.mapStat.indicator.adm_cd = null;
					mapOption = $houseAnalysisMap.databoard.getMapOptions($houseAnalysisMap.search.mapStat.indicator.adm_cd);
				}
				if($houseAnalysisMap.ui.hasText(mapOption.adm_cd)&&mapOption.adm_cd!="00"){
					$houseAnalysisMap.search.searchAdmCd = mapOption.adm_cd;
				}else{
					$houseAnalysisMap.search.searchAdmCd = null;
				}
				
				
				if(mapOption.adm_cd == ""){
					mapOption.adm_cd = "00";
				}
				

				$houseAnalysisMap.api.tmpOptions["map_type"] = "BMAP"
				
				$houseAnalysisMap.api.tmpOptions["url"] = "";
				$houseAnalysisMap.api.tmpOptions["zoomlevel"] = map.zoom;
				$houseAnalysisMap.api.tmpOptions["center"] = map.center;
					
				$houseAnalysisMap.api.paramsArr["adm_cd"] = mapOption.adm_cd;
				
				if(!$("#look-select-location").is(":checked")&&!$("#look-select-type").is(":checked")){
					messageAlert.open("알림","지역선택 또는 지표선택을 해주세요");
					console.error("지역선택 또는 지표선택을 해주세요");
					return;
				}else if($("#look-select-type").is(":checked")){//지표가 선택 되었을때
					
					//=============== 2017.11.06 [개발팀] LBDMS 전송데이연계 START ============//
 					//LBDMS지표가 선택되었을 경우
					var isLbdms = false;
					$(".lbdms").each(function() {
						if ($(this).hasClass("M_on")) {
							isLbdms = true;
							var id = $(this).attr("id");
							var data_type = id.split("_")[0];
							var seq = id.split("_")[1];
							var bord_level = $(this).find("a").attr("data-level");
							$houseAnalysisMap.search.lbdms.doReqLbdmsData(data_type, seq, $houseAnalysisMap.search.searchAdmCd, bord_level);
						}
					});
					if (isLbdms) {
						$houseAnalysisMap.search.activeAdmCd = mapOption.adm_cd;
						if($("#menuAutoClose_radio").attr("checked") === "checked") {
							$houseAnalysisMap.leftmenu.closeAnimate("look-abode");
						}
						return;
					}
					//=============== 2017.11.06 [개발팀] LBDMS 전송데이연계 END ============//
					
					abs.onBlockUIPopup();
					$houseAnalysisMap.search.isShowDatabaord = false;
					var element = $("#look-select>li.M_on .sub-class.M_on>a");
					$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = element.data("parent-id");
					$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = element.data("id");

					var compareLevel = parseInt(element.data("level"));
					if($houseAnalysisMap.search.mapStat.indicator.getSearchLevel($houseAnalysisMap.search.mapStat.indicator.adm_cd)>compareLevel){
						var compareLevelText,resultMessage;
						if(compareLevel==1){
							compareLevelText = "시도";
							resultMessage = "지역선택에서 시도 선택박스를 \"전국\"으로 선택해주세요.";
						}else if(compareLevel==2){
							compareLevelText = "시군구";
							resultMessage = "지역선택에서 시군구 선택박스를 \"전체\"으로 선택해주세요.";
						}
						messageAlert.open("알림","\""+element.data("text")+"\" 지표는 "+compareLevelText+"까지만 조회할 수 있습니다.<br>"+resultMessage);
						abs.onBlockUIClose();
						return;
					}else{
						if($("#look-select-location").is(":checked")){
							map.mapMove([locationSelectBox.data("coor-x"),locationSelectBox.data("coor-y")],mapOption.zoom);
							setTimeout(function(){
								$houseAnalysisMap.search.mapStat.indicator.search(function(){
									abs.onBlockUIClose();
								});
							},500);
						}else{
							map.mapMove([990480.875,1815839.375],2);
							$houseAnalysisMap.search.mapStat.indicator.search(function(){
								abs.onBlockUIClose();
							});
						}
						$houseAnalysisMap.api.paramsArr["b_class_idx_id"] = $houseAnalysisMap.search.mapStat.indicator.b_class_idx_id ;
						$houseAnalysisMap.api.paramsArr["m_class_idx_id"] = $houseAnalysisMap.search.mapStat.indicator.m_class_idx_id ;
					}
				}else{//지역만 선택되어있을때
					abs.onBlockUIPopup();
					map.mapMove([locationSelectBox.data("coor-x"),locationSelectBox.data("coor-y")],mapOption.zoom);
					setTimeout(function(){
						$houseAnalysisMap.search.isShowDatabaord = true;
						$("#dataBoard>a").removeClass("disabled");
						var locationSelectBox = $("#look-abode-"+(mapOption.adm_cd&&mapOption.adm_cd.length>=5?"sgg":"sido")+" option:selected");
						abs.onBlockUIClose();
						var activeRadio = $("#detailChart4>.ThisAreaInfo>ul>li.M_on>.chart>.radio input:radio:checked");
						var censusOptions = activeRadio.data("option");
						$houseAnalysisMap.search.mapStat.census.api = censusOptions.api;
						$houseAnalysisMap.search.mapStat.census.filter = censusOptions.filter;
						$houseAnalysisMap.search.mapStat.census.showData = censusOptions.showData;
						$houseAnalysisMap.search.mapStat.census.data_nm = censusOptions.data_nm;
						$houseAnalysisMap.search.mapStat.census.unit = censusOptions.unit;
						$houseAnalysisMap.search.mapStat.census.parameters = activeRadio.data("parameters");
						if($houseAnalysisMap.ui.hasText(mapOption.adm_cd)&&mapOption.adm_cd!="00"){
							$houseAnalysisMap.search.mapStat.census.parameters.adm_cd= mapOption.adm_cd;
						}
						$houseAnalysisMap.search.mapStat.census.search();
						var bClass = Object.keys(bClassInfoList)[0];
						$houseAnalysisMap.search.abode.b_class_idx_id = bClass;
						$houseAnalysisMap.search.abode.m_class_idx_id = Object.keys(bClassInfoList[bClass].indicator)[0];
						$houseAnalysisMap.search.abode.setDataboard();//데이터 보드 셋팅
					},500);
					
					$houseAnalysisMap.api.paramsArr["b_class_idx_id"] = $houseAnalysisMap.search.abode.b_class_idx_id ;
					$houseAnalysisMap.api.paramsArr["m_class_idx_id"] = $houseAnalysisMap.search.abode.m_class_idx_id ;
				}		
				$houseAnalysisMap.search.activeAdmCd = mapOption.adm_cd;
				if($("#menuAutoClose_radio").attr("checked") === "checked") {
					$houseAnalysisMap.leftmenu.closeAnimate("look-abode");
				}
				if($("#look-select-location").is(":checked") && $("#look-select-type").is(":checked")){
					$houseAnalysisMap.api.paramsArr["chkbox_chk"] = 1;
				}else if($("#look-select-location").is(":checked") && !$("#look-select-type").is(":checked")){
					$houseAnalysisMap.api.paramsArr["chkbox_chk"] = 2;
				}if(!$("#look-select-location").is(":checked") && $("#look-select-type").is(":checked")){
					$houseAnalysisMap.api.paramsArr["chkbox_chk"] = 3;
				}
				$houseAnalysisMap.api.tmpOptions["title"] = "주거현황보기";
				$houseAnalysisMap.api.tmpOptions["params"] = $houseAnalysisMap.api.paramsArr;
				map.shareInfo.setHouseShareInfo($houseAnalysisMap.api.tmpOptions, 1, map.id);
			}
		},
		/**
		 * @name                : recommend
		 * @description         : 추천지역찾기
		 * @date                : 2016. 07. 02.
		 * @author	            : 나광흠
		 * @history 	        :
		 */
		recommend : {
			b_class_idx_id : null,//데이터보드 대분류
			m_class_idx_id : null,//데이터보드 중분류
			now_resid_sido_cd:null,//기준지역 시도 코드
			now_resid_sgg_cd:null,//기준지역 시군구 코드
			now_name:null,//기준지역 지역 명칭
			inter_resid_sido_cd:null,//관심지역 시도 코드
			inter_resid_sgg_cd:null,//관심지역 시군구 코드
			inter_name:null,//관심지역 지역 명칭
			importance_cd : [],//중요도 코드 지표중분류
			importance_val : [],//중요도 값(1 : 하,2 : 중,3 : 상)
			importance_asis_val : [],//기준지역 가중치 값(1 : 하,2 : 중,3 : 상)
			importance_search_val : [],//정렬기준(3:높음 , 1:낮음)
			importance_disp_lev : [],//지표데이터의 데이터기준(1:시도, 2:시군구, 3:읍면동)
			/**
			 * @name         : init
			 * @description  : 설정 초기화
			 * @date         : 2016. 08. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			init : function(){
				$houseAnalysisMap.search.init();
				var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
				$houseAnalysisMap.noReverseGeoCode = true;
				$houseAnalysisMap.search.isAbode = false;
				$houseAnalysisMap.search.isIndicator = false;
				$houseAnalysisMap.search.isShowDatabaord = true;
				$houseAnalysisMap.search.isOverrideBoundary = false;
				$houseAnalysisMap.ui.indicatorStatMap = false;
				if(map.geojson){
					map.geojson.remove();
				}
				if($houseAnalysisMap.ui.recommendDataGeojson){
					$houseAnalysisMap.ui.recommendDataGeojson.remove();
				}
				$houseAnalysisMap.databoard.initSmallLocationRadio();
				map.atdrc_yn = null;
				$("#high-location").off("click").hide();
			},
			/**
			 * @name         : initSearchOptions
			 * @description  : 조회조건 초기화
			 * @date         : 2017. 1. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			initSearchOptions : function(){
				$houseAnalysisMap.search.recommend.importance_cd = [];
				$houseAnalysisMap.search.recommend.importance_val = [];
				$houseAnalysisMap.search.recommend.importance_asis_val = [];
				$houseAnalysisMap.search.recommend.importance_search_val = [];
				$houseAnalysisMap.search.recommend.importance_disp_lev = [];
			},
			/**
			 * @name         : setDataboard
			 * @description  : 데이터 보드 셋팅
			 * @date         : 2016. 08. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			setDataboard : function(){
				$houseAnalysisMap.databoard.areaComplex(this.b_class_idx_id,this.m_class_idx_id);//지역 종합 현황 보기
				$houseAnalysisMap.chart.smallLocationChartBridge($("#detailChart4>.ThisAreaInfo>ul>li.M_on").children("a").data("type"));
			},
			/**
			 * @name           : search
			 * @description    : 추천지역 찾기 초기 조회
			 * @date           : 2016. 08. 10.
			 * @author	       : 나광흠
			 * @history 	   :
			 */
			search : function(){
				this.init();
				this.initSearchOptions();
				$houseAnalysisMap.ui.recommendDataGeojson = null;
				$houseAnalysisMap.ui.recommendMarker = null;
				$("#recommend-search-list li").each(function(){
					$houseAnalysisMap.search.recommend.importance_cd.push($(this).data("id"));
					$houseAnalysisMap.search.recommend.importance_val.push($(this).data("order"));
//					TODO 현재 기준 가중치를 관심 가중치로 넘겨주고있습니다
//					$houseAnalysisMap.search.recommend.importance_asis_val.push($(this).data("asis-order"));
					$houseAnalysisMap.search.recommend.importance_asis_val.push($(this).data("order"));
					$houseAnalysisMap.search.recommend.importance_search_val.push($(this).data("search-st"));
					$houseAnalysisMap.search.recommend.importance_disp_lev.push($(this).data("disp-level"));
				});
				if($houseAnalysisMap.search.recommend.importance_cd.length<1){
					messageAlert.open("알림","지표 설정을 하나이상 해주세요.");
					return;
				}else if($houseAnalysisMap.search.isLifeStyle===true&&$houseAnalysisMap.search.recommend.importance_cd.length > 9){
					messageAlert.open("알림","지표는 최대 9개까지 선택하실 수 있습니다.");
					return;
				}
				this.now_resid_sido_cd = $("#stand-recommend-sido-select").val();
				this.now_resid_sgg_cd = $("#stand-recommend-sgg-select").val();
				this.now_name = $("#stand-recommend-sido-select option:selected").text();
				if(this.now_resid_sido_cd!="00"){
					this.now_name += " "+$("#stand-recommend-sgg-select option:selected").text();
				}
				this.inter_resid_sido_cd = $("#inter-recommend-sido-select").val();
				this.inter_resid_sgg_cd = $("#inter-recommend-sgg-select").val();
				this.inter_name = $("#inter-recommend-sido-select option:selected").text();
				if(this.inter_resid_sido_cd!="00"){
					this.inter_name += " "+$("#inter-recommend-sgg-select option:selected").text();
				}
				$houseAnalysisMap.search.recommend.recommendSearch();
			},
			/**
			 * @name           : recommendSearch
			 * @description    : 추천지역 찾기 조회
			 * @date           : 2016. 12. 01.
			 * @author	       : 나광흠
			 * @history 	   : 
			 * @param callback : callback 
			 */
			recommendSearch : function(callback){
				$houseAnalysisMap.api.recommendAreaLists(
					function(res){
						if(res.errCd=="0"){
							if(res.features.length>0){
								var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
								$houseAnalysisMap.search.getRecommendObject().init();
								$("#interestList").empty();
								function setRecommend(adm_cd,x,y){
									$("#dataBoard>a").removeClass("disabled");
									var mapOption = $houseAnalysisMap.databoard.getMapOptions(adm_cd);
									if($houseAnalysisMap.ui.hasText(mapOption.adm_cd)&&mapOption.adm_cd!="00"){
										if(mapOption.adm_cd.length==5){//시군구
											mapOption.zoom = 5;
										}else if(mapOption.adm_cd.length==7){//읍면동
											mapOption.zoom = 7;
										}
									}
									map.gMap.setMaxZoom(13);
									$houseAnalysisMap.search.activeAdmCd = mapOption.adm_cd;
									$houseAnalysisMap.search.searchAdmCd = mapOption.adm_cd;
									$houseAnalysisMap.ui.recommendMarker = sop.marker([x,y],{adm_cd:adm_cd});
									$houseAnalysisMap.ui.recommendMarker.addTo(map.gMap);
									map.mapMove([x,y], mapOption.zoom, false);
									$.each($houseAnalysisMap.ui.recommendDataGeojson.getLayers(),function(cnt,node){
										if(node.feature.properties.adm_cd==mapOption.adm_cd){
											$houseAnalysisMap.search.activeLayer(node);
											return false;
										}
									});
									$houseAnalysisMap.search.lastMapOption = {
										center : [x,y],
										zoom : mapOption.zoom
									};
									$houseAnalysisMap.search.getRecommendObject().setDataboard();
									//mng_s 20171018_김건민
									$houseAnalysisMap.databoard.databoardViewSetting("recommend");
									//mng_e 20171018_김건민
									
									//============== 2017.11.06 [개발팀] LBDMS 연계 START =============//
									//lbdms연계데이터
									var sido_cd = $houseAnalysisMap.search.recommend.inter_resid_sido_cd;
									var sgg_cd = $houseAnalysisMap.search.recommend.inter_resid_sgg_cd;
									var adm_cd = sido_cd;
									if (sgg_cd != "999") {
										adm_cd += sgg_cd;
									}
									$houseAnalysisMap.search.lbdms.getLbdmsDataList(adm_cd, function(res, options) {
										$houseAnalysisMap.search.lbdms.drawLbdmsDataSearchBtn(res, options);
									});
									//============== 2017.11.06 [개발팀] LBDMS 연계 END =============//
								}
								$.each(res.features,function(cnt,node){
									var naver,daum = $("<a/>",{
										"href":"http://realestate.daum.net/maemul/area/"+node.properties.leg_cd+"/A1A3A4/*/summary",
										"target":"_BLANK",
										"style":"background: none;position: absolute;top: 2px;right: 10px;",
										"title":"다음 부동산으로 바로가기"
									}).append(
										$("<img/>",{"src":contextPath+"/img/house/realestate.daum.net.png","style":"width:20px;height:20px;"})	
									).tooltip();
									if($houseAnalysisMap.ui.hasText(node.properties.leg_cd)){
										naver = $("<a/>",{
											"href":"http://land.naver.com/article/articleList.nhn?rletTypeCd=A01&tradeTypeCd=&hscpTypeCd=A01%3AA03%3AA04&cortarNo="+node.properties.leg_cd,
											"target":"_BLANK",
											"style":"background: none;position: absolute;top: 2px;right: 33px;",
											"title":"네이버 부동산으로 바로가기"
										}).append(
											$("<img/>",{"src":contextPath+"/img/house/land.naver.png","style":"width:20px;height:20px;"})	
										).tooltip();
									}
									$("#interestList").append(
										$("<div/>",{"style":"position: relative;"+(res.features.length>5?"width:50%;float:left;":"")}).append(
											$("<a/>",{
												href:"#",
												"class":"recommend-area",
												html:"<span>"+(cnt+1)+"</span> "+node.properties.adm_nm,
												"data-adm-nm":node.properties.adm_nm,
												"data-coor-x":node.properties.x,
												"data-coor-y":node.properties.y,
												"data-adm-cd":node.properties.adm_cd,
												"data-sido-cd":node.properties.sido_cd,
												"data-sgg-cd":node.properties.sgg_cd,
												"data-emdong-cd":node.properties.emdong_cd,
												"data-sido-nm":node.properties.sido_nm,
												"data-sgg-nm":node.properties.sgg_nm,
												"data-emdong-nm":node.properties.emdong_nm
//												,
//												"style":"width:calc(100% - "+($houseAnalysisMap.ui.hasText(naver)?"55":"35")+"px)"
											}).click(function(){
												$houseAnalysisMap.search.getRecommendObject().init();
												var element = $(this);
												$houseAnalysisMap.ui.doClearMap(function(){
													$houseAnalysisMap.ui.recommendDataGeojson.addTo(map.gMap);
													setRecommend(element.data("adm-cd"),element.data("coor-x"),element.data("coor-y"));
													//mng_s 20180205 주용민
													$houseAnalysisMap.api.paramsArr["layer_chk"]= 2;
													//mng_e 20180205 주용민
													$houseAnalysisMap.api.paramsArr["map_adm_cd"]= element.data("adm-cd");
													$houseAnalysisMap.api.paramsArr["map_coor_x"]= element.data("coor-x");
													$houseAnalysisMap.api.paramsArr["map_coor_y"]= element.data("coor-y");
													$houseAnalysisMap.api.tmpOptions["params"] = $houseAnalysisMap.api.paramsArr;
												});
											})
											,
											naver,
											daum
										)
									);
								});
								drawRegionPolygon(res);
								if($houseAnalysisMap.search.isAbode===false&&$houseAnalysisMap.search.isIdealType!==true){
									$(".dataBoardDiv>.dscList dd:first").empty();
									$(".dataBoardDiv>.dscList dd:first").append('<ul class="indexfine">'+$("#recommend-search-list").html()+'</ul>');
									$(".dataBoardDiv>.dscList dd:first li").css("height","auto");
									$(".dataBoardDiv>.dscList dd:first .indexdelete").remove();
									var firstClassObject = getFirstClass();
									$houseAnalysisMap.search.getRecommendObject().b_class_idx_id = firstClassObject.data("parent-id");
									$houseAnalysisMap.search.getRecommendObject().m_class_idx_id = firstClassObject.data("id");
								}else{
									if($houseAnalysisMap.search.isIdealType===true){
										var classCode = getIdealTypeClassCode();
										$houseAnalysisMap.search.getRecommendObject().b_class_idx_id = classCode.b_class_idx_id;
										$houseAnalysisMap.search.getRecommendObject().m_class_idx_id = classCode.m_class_idx_id;
									}else{
										$houseAnalysisMap.search.getRecommendObject().b_class_idx_id = Object.keys(bClassInfoList)[0];
										$houseAnalysisMap.search.getRecommendObject().m_class_idx_id = Object.keys(bClassInfoList[Object.keys(bClassInfoList)[0]].indicator)[0];
									}
								}
								setRecommend(res.features[0].properties.adm_cd,res.features[0].properties.x,res.features[0].properties.y);
								if($("#menuAutoClose_radio").attr("checked") === "checked") {
									$houseAnalysisMap.leftmenu.closeAnimate("search-recommend");
								}
								//mng_s 주용민
								if($("#LifeStyleSelect>li").hasClass("M_on")){
									var mOnIndex = $("#LifeStyleSelect>li.M_on").index() + 1;
									apiLogWrite2("J0","J06","살고싶은 우리동네","LF"+mOnIndex,"00","없음");
								}
								//mng_e 주용민
							}else{
								messageAlert.open("알림", "검색된 추천지역리스트가 없습니다.");
							}
						}else{
							messageAlert.open("알림",res.errMsg);
						}
						if(typeof callback === "function"){
							callback(res);
						}
					}
				);
			},
			/**
			 * @name         : apiLogWrite
			 * @description  : apiLogWrite
			 * @date         : 2016. 08. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			apiLogWrite : function(){
				var parameter = "";
				parameter += "now_resid_sido_cd=" + $houseAnalysisMap.search.recommend.now_resid_sido_cd + "&";
				parameter += "now_resid_sgg_cd=" + $houseAnalysisMap.search.recommend.now_resid_sgg_cd + "&";
				parameter += "inter_resid_sido_cd=" + $houseAnalysisMap.search.recommend.inter_resid_sido_cd + "&";
				parameter += "inter_resid_sgg_cd=" + $houseAnalysisMap.search.recommend.inter_resid_sgg_cd + "&";
				parameter += "importance_cd=" + $houseAnalysisMap.search.recommend.importance_cd.join()+ "&";
				parameter += "importance_val=" + $houseAnalysisMap.search.recommend.importance_val.join() + "&";
				parameter += "importance_asis_val=" + $houseAnalysisMap.search.recommend.importance_asis_val.join() + "&";
				parameter += "importance_search_val=" + $houseAnalysisMap.search.recommend.importance_search_val.join() + "&";
				parameter += "importance_disp_lev=" + $houseAnalysisMap.search.recommend.importance_disp_lev.join() + "&";
				parameter += "base_year=" + $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year+ "&";
				var title = "";
				$("#recommend-search-list > li").each(function() {
					title += $(this).text().substring(1) + ", ";
				});
				var title_lastIndex = title.lastIndexOf(", ");
				title = title.substring(0,title_lastIndex);
				var adm_nm = $("#stand-recommend-sido-select option:selected").text();
				if($("#stand-recommend-sgg-select").val() != "999") {
					adm_nm += " " + $("#stand-recommend-sgg-select option:selected").text();
				}
				
				adm_nm += ", " + $("#inter-recommend-sido-select option:selected").text();
				if($("#inter-recommend-sgg-select").val() != "999") {
					adm_nm += " " + $("#inter-recommend-sgg-select option:selected").text();
				}
				// 살고싶은 우리동네 대분류 코드 J0
				// 주거현황보기 API 는 J01
				// 추천지역찾기 API 는 J02
				apiLogWrite2("J0", "J02", title, parameter, "null", adm_nm)
			}
		},
		/**
		 * @name         : getRecommendObject
		 * @description  : 추천지역찾기인지 간편동네찾기인지에 따라 오브젝트 반환
		 * @date         : 2016. 12. 01.
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		getRecommendObject : function(){
			return $houseAnalysisMap.search.isAbode===false&&$houseAnalysisMap.search.isIdealType===true?$houseAnalysisMap.search.idealType:$houseAnalysisMap.search.recommend;
		},
		/**
		 * @name                : idealType
		 * @description         : 간편동네찾기
		 * @date                : 2016. 12. 01.
		 * @author	            : 나광흠
		 * @history 	        :
		 */
		idealType : {
			b_class_idx_id : null,//데이터보드 대분류
			m_class_idx_id : null,//데이터보드 중분류
			now_name:"전국",//기준지역 지역 명칭
			now_resid_sido_cd:null,//기준지역 시도 코드
			now_resid_sgg_cd:null,//기준지역 시군구 코드
			inter_name:null,//관심지역 지역 명칭
			inter_resid_sido_cd:null,//관심지역 시도 코드
			inter_resid_sgg_cd:null,//관심지역 시군구 코드
			importance_cd : [],//중요도 코드 지표중분류
			importance_val : [],//중요도 값(1 : 하,2 : 중,3 : 상)
			importance_asis_val : [],//기준지역 가중치 값(1 : 하,2 : 중,3 : 상)
			importance_search_val : [],//정렬기준(3:높음 , 1:낮음)
			importance_disp_lev : [],//지표데이터의 데이터기준(1:시도, 2:시군구, 3:읍면동)
			/**
			 * @name         : init
			 * @description  : 설정 초기화
			 * @date         : 2016. 12. 01.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			init : function(){
				$houseAnalysisMap.search.init();
				var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
				$houseAnalysisMap.noReverseGeoCode = true;
				$houseAnalysisMap.search.isAbode = false;
				$houseAnalysisMap.search.isIdealType = true;
				$houseAnalysisMap.search.isIndicator = false;
				$houseAnalysisMap.search.isShowDatabaord = true;
				$houseAnalysisMap.search.isOverrideBoundary = false;
				$houseAnalysisMap.ui.indicatorStatMap = false;
				if(map.geojson){
					map.geojson.remove();
				}
				if($houseAnalysisMap.ui.recommendDataGeojson){
					$houseAnalysisMap.ui.recommendDataGeojson.remove();
				}
				$houseAnalysisMap.databoard.initSmallLocationRadio();
				map.atdrc_yn = null;
				$("#high-location").off("click").hide();
			},
			/**
			 * @name         : initSearchOptions
			 * @description  : 조회조건 초기화
			 * @date         : 2017. 1. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			initSearchOptions : function(){
				$houseAnalysisMap.search.isLimitMax = false;
				$houseAnalysisMap.search.idealType.importance_cd = [];
				$houseAnalysisMap.search.idealType.importance_val = [];
				$houseAnalysisMap.search.idealType.importance_asis_val = [];
				$houseAnalysisMap.search.idealType.importance_search_val = [];
				$houseAnalysisMap.search.idealType.importance_disp_lev = [];
			},
			/**
			 * @name         : setDataboard
			 * @description  : 데이터 보드 셋팅
			 * @date         : 2016. 08. 10.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			setDataboard : function(){
				$houseAnalysisMap.databoard.areaComplex(this.b_class_idx_id,this.m_class_idx_id);//지역 종합 현황 보기
				$houseAnalysisMap.chart.smallLocationChartBridge($("#detailChart4>.ThisAreaInfo>ul>li.M_on").children("a").data("type"));
			},
			/**
			 * @name           : search
			 * @description    : 간편동네찾기 초기 조회
			 * @date           : 2016. 12. 01.
			 * @author	       : 나광흠
			 * @history 	   : 
			 */
			search : function(){
				if($("#ideal-type-dropzone>div.M_on").length>0){
					this.init();
					this.initSearchOptions();
					$houseAnalysisMap.ui.recommendDataGeojson = null;
					$houseAnalysisMap.ui.recommendMarker = null;
					var indicatorList = $("<ul/>",{"class":"indexfine"});
					$("#ideal-type-dropzone>div.M_on").each(function(cnt,node){
						if($houseAnalysisMap.ui.hasText($(node).data("b_class_search_serial"))&&$houseAnalysisMap.ui.hasText($(node).data("m_class_search_serial"))&&$houseAnalysisMap.ui.hasText($(node).data("s_class_search_serial"))){
							var ideal = idealTypeInfoList[$(node).data("b_class_search_serial")].children[$(node).data("m_class_search_serial")].children[$(node).data("s_class_search_serial")];
							var mClassInfo = bClassInfoList[ideal.b_class_idx_id].indicator[ideal.m_class_idx_id];
							indicatorList.append($("<li/>",{"class":mClassInfo.b_class_idx_id,"style":"height:auto;padding:6px;","text":mClassInfo.m_class_idx_nm}));
							if($houseAnalysisMap.ui.hasText(ideal)){
								var wghtval = $("#ideal-type-dropzone>div").length-cnt;
								$houseAnalysisMap.search.idealType.importance_cd.push(ideal.m_class_idx_id);
								$houseAnalysisMap.search.idealType.importance_val.push(wghtval);
								$houseAnalysisMap.search.idealType.importance_asis_val.push(wghtval);
								$houseAnalysisMap.search.idealType.importance_search_val.push(ideal.order_base);
								$houseAnalysisMap.search.idealType.importance_disp_lev.push(mClassInfo.disp_level);
							}else{
								console.warn("\""+$(node).find(".Text").text()+"\" 지표가 잘못 설정 되어있습니다");
							}
						}else{
							console.warn("\""+$(node).find(".Text").text()+"\" 지표가 설정이 되지 않았습니다");
						}
					});
					this.now_resid_sido_cd = "00";
					this.now_resid_sgg_cd = "999";
					this.inter_resid_sido_cd = $("#ideal-type-sido-select").val();
					this.inter_resid_sgg_cd = $("#ideal-type-sgg-select").val();
					this.inter_name = $("#ideal-type-sido-select option:selected").text();
					if(this.inter_resid_sido_cd!="00"){
						this.inter_name += " "+$("#ideal-type-sgg-select option:selected").text();
					}
					$houseAnalysisMap.search.recommend.recommendSearch(function(){
						$(".dataBoardDiv>.dscList dd:first").empty().append(indicatorList);
					});
					$("#ideal-type-close-button").trigger("click");
				}else{
					messageAlert.open("알림","조회하실 조건을 퍼즐에 담아주세요");
				}
			}
		},
		mapStat : {//지도에 통계 셋팅해주는 부분
			census : {//센서스 데이터
				api : null,//api아이디
				parameters : null,//조회할 파라미터
				filter : null,//필터
				showData : null,//보여줄 데이터
				unit : null,//단위
				data_nm : null,//데이터 이름
				/**
				 * @name           : search
				 * @description    : 센서스 데이터 조회
				 * @date           : 2016. 08. 16.
				 * @author         : 나광흠
				 * @history        :
				 * @param callback : callback
				 */
				search : function(callback){
					var that = this;
					if($houseAnalysisMap.ui.hasText(this.parameters.adm_cd)&&this.parameters.adm_cd!="00"){
						$houseAnalysisMap.api.paramsArr["adm_cd"] = this.parameters.adm_cd;
						$houseAnalysisMap.noReverseGeoCode = false;
						$houseAnalysisMap.search.isIndicator = false;
						$houseAnalysisMap.search.isCensus = true;
						$houseAnalysisMap.search.isStandBy = null;
						$houseAnalysisMap.api.census.getCensusData(this.api,this.parameters,function(res){
							$houseAnalysisMap.ui.doClearMap(function(){
								var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
								map.atdrc_yn = null;
								map.gMap.setMaxZoom(13);
								if(res.errCd=="0"||res.errCd=="-100"){
									var options = {
											params:{
												map : map,
												bnd_year : map.bnd_year,
												adm_cd : that.parameters.adm_cd,
												filter : that.filter,
												showData : that.showData,
												unit : that.unit
											},
											data_nm : that.data_nm
									};
									$houseAnalysisMap.api.setStatsData(res,options);
									setTimeout(function(){
										$houseAnalysisMap.api.getAdmCdToCoor(that.parameters.adm_cd, map.bnd_year,"1",null,function(result){
											$houseAnalysisMap.ui.setLastGeoJsonInfo(result,map,that.parameters.adm_cd,map.bnd_year,map.curPolygonCode);
										});
									},500);
									$("#legend_"+map.legend.id).find("a:first").click();
									if(!$houseAnalysisMap.ui.hasText(that.parameters.adm_cd)||$houseAnalysisMap.ui.hasText(that.parameters.adm_cd)=="00"){
										$houseAnalysisMap.search.setTitle("전국",that.data_nm);
									}else{
										$houseAnalysisMap.api.getAdmCdToCoor(that.parameters.adm_cd, map.bnd_year,"0",null,function(result){
											$houseAnalysisMap.search.setTitle(result.features[0].properties.adm_nm,that.data_nm);
										});
									}
								}else{
									messageAlert.open("알림",res.errMsg);
								}
								var center = map.gMap.getCenter();
								$houseAnalysisMap.search.lastMapOption.center = [center.x,center.y];
								//mng_s 20170720_김건민
								$houseAnalysisMap.search.lastMapOption.zoom = 9;
								$houseAnalysisMap.search.isStandBy = false;
								map.mapMove($houseAnalysisMap.search.lastMapOption.center,$houseAnalysisMap.search.lastMapOption.zoom);
								//mng_e 20170720_김건민
								if($houseAnalysisMap.ui.recommendMarker){
									$houseAnalysisMap.ui.recommendMarker.addTo(map.gMap);
								}
								setTimeout(function(){
									if(typeof callback === "function"){
										callback();
									}
								},500);
							});
						});
					}
				}
			},
			indicator : {//지표
				b_class_idx_id : null,//대분류
				m_class_idx_id : null,//중분류
				adm_cd : null,//행정동 코드
				/**
				 * @name         : init
				 * @description  : 지표 설정 초기화
				 * @date         : 2016. 08. 10.
				 * @author	     : 나광흠
				 * @history 	 :
				 */
				init : function(){
					$houseAnalysisMap.noReverseGeoCode = false;
					$houseAnalysisMap.search.isIndicator = true;
					$houseAnalysisMap.search.isCensus = false;
					$houseAnalysisMap.search.isStandBy = null;
					$houseAnalysisMap.search.isOverrideBoundary = true;
					$houseAnalysisMap.ui.indicatorStatMap = true;
					$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].atdrc_yn = null;
				},
				/**
				 * @name         : clear
				 * @description  : 지표 검색 조건 초기화
				 * @date         : 2016. 08. 10.
				 * @author	     : 나광흠
				 * @history 	 :
				 */
				clear : function(){
					this.b_class_idx_id = null;
					this.m_class_idx_id = null;
					this.adm_cd = null;
				},
				/**
				 * @name         : getSearchLevel
				 * @description  : 행정동 코드로 지표 검색 레벨 얻기
				 * @date         : 2016. 08. 10.
				 * @author	     : 나광흠
				 * @history 	 :
				 * @param adm_cd : 행정동 코드
				 */
				getSearchLevel : function(adm_cd){
					var mapOption = $houseAnalysisMap.databoard.getMapOptions(adm_cd);
					var searchLevel = null;
					if(!$houseAnalysisMap.ui.hasText(mapOption.adm_cd)){
						searchLevel = 1;
					}else if(mapOption.adm_cd.length==2){
						searchLevel = 2;
					}else if(mapOption.adm_cd.length==5){
						searchLevel = 3;
					}else{
						searchLevel = 4;
					}
					return searchLevel;
				},
				/**
				 * @name           : search
				 * @description    : 지표 검색
				 * @date           : 2016. 08. 10.
				 * @author	       : 나광흠
				 * @history 	   :
				 * @param callback : callback
				 */
				search : function(callback){
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					var abs = new sop.portal.absAPI();
					abs.onBlockUIPopup();
					this.init();
					var mapOption = $houseAnalysisMap.databoard.getMapOptions(this.adm_cd);
					var searchLevel = this.getSearchLevel(mapOption.adm_cd);
					var mClassObject = bClassInfoList[this.b_class_idx_id].indicator[$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id];
					var year = bndYear;
					if(this.b_class_idx_id=="HML0005"&&this.m_class_idx_id=="HMM0018"){//대중교통 이용자 비율
						year= "2010";
					}else if(
						(this.b_class_idx_id=="HML0003"&&this.m_class_idx_id=="HMM0012")||//순유입 인구
						(this.b_class_idx_id=="HML0006"&&this.m_class_idx_id=="HMM0020")//교원1인당 학생 수
						){
						year= "2014";
					}
					map.bnd_year = year;
					if(searchLevel>parseInt(mClassObject.disp_level)){
						searchLevel = parseInt(mClassObject.disp_level);
					}
					if(searchLevel==1){
						mapOption = $houseAnalysisMap.databoard.getMapOptions(null);
					}else if(searchLevel==2){
						mapOption = $houseAnalysisMap.databoard.getMapOptions(mapOption.adm_cd.substring(0,2));
					}else if(searchLevel==3){
						mapOption = $houseAnalysisMap.databoard.getMapOptions(mapOption.adm_cd.substring(0,5));
					}else{
						return;
					}
					if(mClassObject.disp_level==1){
						map.gMap.setMaxZoom(3);
					}else if(mClassObject.disp_level==2){
						map.gMap.setMaxZoom(5);
					}else if(mClassObject.disp_level==3){
						map.gMap.setMaxZoom(8);
					}
					this.adm_cd = mapOption.adm_cd;
					$houseAnalysisMap.api.houseAnalysisOrderLists(searchLevel,this.b_class_idx_id,this.m_class_idx_id,year,mapOption.sido_cd,mapOption.sgg_cd,true,function(res){
						var indicator = $houseAnalysisMap.search.mapStat.indicator;
						var options = {
							params:{
								map : map,
								adm_cd : mapOption.adm_cd,
								filter : "value",
								showData : "value",
								b_class_idx_id : indicator.b_class_idx_id,
								m_class_idx_id : indicator.m_class_idx_id,
								isHouseOnly : true,
								bnd_year : year,
								level : searchLevel,
							}
						};
						if(
							indicator.b_class_idx_id=="HML0001"&&
							(indicator.m_class_idx_id=="HMM0001"||indicator.m_class_idx_id=="HMM0002")
						){
							options.params.filter = "z_score";
						}
						if(res.result.length>0){
							options.params.unit = res.result[0].unit;
						}
						options.data_nm = mClassObject.m_class_idx_nm;
						if(
							options.params.m_class_idx_id=="HMM0012"||//순유입 인구
							options.params.m_class_idx_id=="HMM0020"//교원1인당 학생 수
						){
							map.atdrc_yn = "1";
						}
						var isNegative = false;
						$.each(res.result,function(cnt,node){
							if(parseFloat(node[options.params.filter])<0){
								isNegative = true;
								return false;
							}
						});
						$houseAnalysisMap.ui.doClearMap(function(){
							$houseAnalysisMap.api.setStatsData(res, options);
							setTimeout(function(){
								function setGeoJson(result){
									$houseAnalysisMap.ui.setLastGeoJsonInfo(result,map,options.params.adm_cd,map.bnd_year,options.params.level);
								}
								var center = map.gMap.getCenter();
								var result; 
								if(parseInt(searchLevel)==1){//시도 경계
									$houseAnalysisMap.api.getAdmCdToCoor("", options.params.bnd_year,"1",null,function(result){
										setGeoJson(result);
									});
								}else{
									if(options.params.m_class_idx_id=="HMM0012"||options.params.m_class_idx_id=="HMM0020"){//순유입인구,교원1인당 학생 수는 경계가 다르다
										$houseAnalysisMap.api.getAdmCdToCoor(options.params.adm_cd, options.params.bnd_year,"1","1",function(result){
											setGeoJson(result);
										});
									}else{
										$houseAnalysisMap.api.getAdmCdToCoor(options.params.adm_cd, options.params.bnd_year,"1",null,function(result){
											setGeoJson(result);
										});
									}
								}
								var legendColorButton = $("#legend_"+map.legend.id).find("a[data-color=rgb\\("+$houseAnalysisMap.databoard.bClassInfoList[mClassObject.b_class_idx_id].rgbColor.replace(/,/gi,"\\,")+"\\)]");
								var reverseArray = [],startColor,indicatorColor = $houseAnalysisMap.databoard.bClassInfoList[indicator.b_class_idx_id].rgbColor;
								$.each(bClassInfoList,function(bCnt,bNode){
									$.each(bNode.indicator,function(mCnt,mNode){
										if(
											mNode.b_class_idx_id=="HML0004"||//안전 지표
											(
												mNode.b_class_idx_id=="HML0007"&&
												(
													mNode.m_class_idx_id=="HMM0023"||//유치원 및 보육시설
													mNode.m_class_idx_id=="HMM0024"||//병의원 및 약국
													mNode.m_class_idx_id=="HMM0025"||//노인복지시설
													mNode.m_class_idx_id=="HMM0026"//사회복지시설
												)
											)||
											(mNode.default_value=="1"&&mNode.order_base_disp=="2"&&mNode.order_base=="2")||//높음,낮음 선택할 수 있는 지표중 낮음이 기본인 지표
											(mNode.default_value=="1"&&mNode.order_base_disp=="2"&&mNode.order_base=="4")//많음,적음 선택할 수 있는 지표중 적음이 기본인 지표
										){
											reverseArray.push(mNode.m_class_idx_id);
										}
									});
								});
								if(isNegative){
									startColor = "#0066aa";
								}else{
									startColor = "#cccccc";
								}
								$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].legend.reverseOn = reverseArray.indexOf(indicator.m_class_idx_id)>-1;
								$.each($("#legend_"+map.legend.id).find("a[data-color]"),function(){
									$(this).attr("start-color",startColor);
								});
								legendColorButton.trigger("click");
								if(typeof callback === "function"){
									callback();
								}
							},500);
							var center = map.gMap.getCenter();
							$houseAnalysisMap.search.lastMapOption.center = [center.x,center.y];
							$houseAnalysisMap.search.lastMapOption.zoom = map.gMap.getZoom();
							$houseAnalysisMap.search.isStandBy = false;
							if($houseAnalysisMap.ui.recommendMarker){
								$houseAnalysisMap.ui.recommendMarker.addTo(map.gMap);
							}
							abs.onBlockUIClose();
						});
					});
				},
				apiLogWrite : function(title,parameter,adm_nm){
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					apiLogWrite2("J0", "J01", title, parameter, map.zoom, adm_nm);
				}
			}
		}
	};
	/**
	 * @name        : getFirstClass
	 * @description : 추천지역 찾기 할때 처음 셋팅 해줘야할 지표 리턴 
	 * @date        : 2016. 08. 17.
	 * @author	    : 나광흠
	 * @history 	:
	 */
	function getFirstClass(){
		var maxLevel;
		$.each($(".dataBoardDiv>.dscList dd:eq(0)>ul>li"),function(cnt,node){
			if(cnt>0){
				maxLevel = Math.max(maxLevel,parseInt($(node).data("disp-level")));
			}else{
				maxLevel = parseInt($(node).data("disp-level"));
			}
		});
		return $(".dataBoardDiv>.dscList dd:eq(0)>ul>li[data-disp-level="+maxLevel+"]:first");
	}
	/**
	 * @name         : drawRegionPolygon
	 * @description  : 지역에 대한 폴리곤 생성
	 * @date         : 2016. 01. 03.
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param data   : 폴리곤 생성해줄 데이터
	 */
	function drawRegionPolygon(data){
		var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
		var defaultStyle = {
			weight : 1.25,
			opacity : 1,
			color : "white",
			dashArray: "",
			fillOpacity : defaultFillOpacity,
			fillColor : activeFillColor,
			type:"region",
		};
		$houseAnalysisMap.ui.recommendDataGeojson = sop.geoJson(data, {
			style: function (feature) {
				var style = $.extend(true, {}, defaultStyle);
				if(feature.properties.fillColor){
					style.fillColor = feature.properties.fillColor;
				}
				return style;
			},
			onEachFeature: function (feature, layer) {
				layer.on("mouseover",function(e){
					$houseAnalysisMap.search.activeLayer(layer);
				});
				layer.on("click",function(e){
					//mng_s 20180205 주용민
					$houseAnalysisMap.api.paramsArr["layer_chk"] = 1;
					//mng_e 20180205 주용민
					var mapOptions = $houseAnalysisMap.databoard.getMapOptions(layer.feature.properties.adm_cd);
					$houseAnalysisMap.search.activeAdmCd = layer.feature.properties.adm_cd;
					$houseAnalysisMap.search.lastMapOption.center = [layer.feature.properties.x,layer.feature.properties.y];
					$houseAnalysisMap.search.lastMapOption.zoom = mapOptions.zoom;
					map.mapMove([e.utmk.x,e.utmk.y],mapOptions.zoom);
					$houseAnalysisMap.search.mapStat.indicator.adm_cd = mapOptions.adm_cd;
					if($houseAnalysisMap.search.isAbode==false){
						if($houseAnalysisMap.ui.recommendMarker){
							$houseAnalysisMap.ui.recommendMarker.remove();
						}
						$houseAnalysisMap.ui.recommendMarker = sop.marker([layer.feature.properties.x,layer.feature.properties.y],{adm_cd:mapOptions.adm_cd});
						$houseAnalysisMap.ui.recommendMarker.addTo(map.gMap);
					}
					if($houseAnalysisMap.search.isIdealType===true){
						var classCode = getIdealTypeClassCode();
						$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = classCode.b_class_idx_id;
						$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = classCode.m_class_idx_id;
					}else{
						var firstClass = getFirstClass();
						$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = firstClass.data("parent-id");
						$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = firstClass.data("id");
					}
					$houseAnalysisMap.search.mapStat.indicator.search();
				});
			}
		}).addTo(map.gMap);
	}
	/**
	 * @name         : getIdealTypeClassCode
	 * @description  : 간편 동네찾기 지표 얻기
	 * @date         : 2017. 01. 10.
	 * @author	     : 나광흠
	 * @history 	 :
	 */
	function getIdealTypeClassCode(){
		var bClass,mClass;
		$.each($houseAnalysisMap.search.idealType.importance_cd,function(cnt,node){
			if($("#search-recommend-box a[data-id="+node+"]").length>0){
				bClass = $("#search-recommend-box a[data-id="+node+"]").data("parent-id");
				mClass = node;
				return false;
			}
		});
		if(!$houseAnalysisMap.ui.hasText(bClass)||!$houseAnalysisMap.ui.hasText(mClass)){
			bClass = "HML0001";//자연
			mClass = "HMM0003";//녹지비율	
		}
		return {
			"b_class_idx_id" : bClass,
			"m_class_idx_id" : mClass
		};
	}
	/*********** 아산시 고유정보 전원주택 조회 시작 **********/
	(function() {
		$class("sop.portal.asanHousePointList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if (res.errCd == "0") {
					$houseAnalysisMap.ui.addAsanHouseMarker(res);
					$("#pastoralHouse").addClass("on");
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 아산시 고유정보 전원주택 조회 종료 ********* */
	/*********** 아산시 고유정보 귀농 조회 시작 **********/
	(function() {
		$class("sop.portal.asanReturnFarmPolygonList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if (res.errCd == "0") {
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					$houseAnalysisMap.noReverseGeoCode = false;
					map.mapMove([953659.125,1867774.125],6);//아산시 center
					$houseAnalysisMap.ui.doClearMap(function(){
						map.gMap.setMaxZoom(13);
						$("#legendColor_"+map.legend.id+" li:eq(0) a").click();
						var bnd_year = map.bnd_year;
						var options = {
								params:{
									map : map,
									adm_cd : "34040",
									filter : "family_no",
									showData : "family_no",
									isHouseOnly : true,
									bnd_year : map.bnd_year,
									unit : "가구"
								},
								data_nm : "귀농 가구 수" 
						};
						$houseAnalysisMap.api.setStatsData(res,options);
					});
					$houseAnalysisMap.search.setTitle("충청남도 아산시","귀농 가구 수");
					$("#returnToFarming").addClass("on");
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 아산시 고유정보 귀농 조회 종료 ********* */
	
	//================ 2017.11.06 [개발팀] LBDMS 데이터연계 START ================//
	/*********** LBDMS 데이터 목록조회 **********/
	(function() {
		$class("sop.portal.lbdmsDataList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var callback = options.callback;
					if (callback != undefined && typeof callback === "function") {
						callback.call(undefined, res, options);
					}
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** LBDMS 데이터 목록조회 END**********/
	
	/*********** LBDMS 집계데이터 조회 START**********/
	(function() {
		$class("sop.portal.lbdmsPolygonDataList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var map = options.map;
					var bord_level = options.params.type;
					var adm_cd = options.params.adm_cd;
					var low_search = "1";
					//시도일 경우
					if (adm_cd.length == 2) {
						switch(parseInt(bord_level)) {
							case 1: //시도
								low_search = "0";
								break;
							case 2: //시군구
								low_search = "1";
								break;
							case 3: //읍면동
								low_search = "2";
								break;
							default:
								break;
						}
					}else { //시군구일 경우
						switch(parseInt(bord_level)) {
							case 2: //시군구
								low_search = "0";
								break;
							case 3: //읍면동
								low_search = "1";
								break;
							default:
								break;
						}
					}
					
					$houseAnalysisMap.ui.doClearMap(function(){
						map.multiLayerControl.multiData = [];
						map.multiLayerControl.openApiBoundaryHadmarea(adm_cd, map.bnd_year, low_search, res, "0", function(geoData, map) {
							var filter = "cnt"; 
							map.setStatsData("normal", res, filter, "");
							
							var tmpLegendData = [];
							for (var i=0; i<res.result.length; i++) {
								tmpLegendData.push(parseFloat(res.result[i][filter]));
							}
							map.legend.valPerSlice = map.legend.calculateLegend([tmpLegendData]);
							
							map.multiLayerControl.dataGeojson = [];
							var bounds = null;
							for (var k=0; k<map.multiLayerControl.multiData.length; k++) {
								var layer = map.multiLayerControl.multiData[k].layer;
								layer = map.combineStatsData(layer, true);
								map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(layer, "data"));
								
								//경계위치조정
								if (k==0) {
									bounds = map.multiLayerControl.dataGeojson[k].getBounds();
								}else {
									bounds.extend(map.multiLayerControl.dataGeojson[k].getBounds());
								}
							}
							
							if (bounds != null) {
								map.gMap.fitBounds(bounds, {
									animate : false
								});
							}
						});
					});
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** LBDMS 집계데이터 조회 END **********/
	
	/*********** LBDMS POI데이터 조회 START **********/
	(function() {
		$class("sop.portal.lbdmsPoiDataList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var map = options.map;
					var result = res.result;
					
					$houseAnalysisMap.ui.removeAsanHouseMarker();
					$houseAnalysisMap.ui.pastoralHouseMarkers = sop.markerClusterGroup({
						animateAddingMarkers : true
					});
					
					var points = [];
					$.each(result,function(cnt, node){
					    var marker = sop.marker([node.coor_x,node.coor_y],{
					    	icon : sop.icon({
								iconUrl: contextPath+"/img/house/marker-icon-red.png",
								iconSize: [25, 40]
							})
					    });
						marker.addTo($houseAnalysisMap.ui.pastoralHouseMarkers);
						points.push(sop.utmk([node.coor_x,node.coor_y]));
					});
					map.gMap.addLayer($houseAnalysisMap.ui.pastoralHouseMarkers);
					
					//마커영역을 계산하여 화면중앙에 둔다.
					var polygon = new sop.Polygon(sop.QuickHull.getConvexHull(points));
					var bounds = polygon.getBounds();
					if (bounds != null) {
						map.gMap.fitBounds(bounds, {
							animate : false
						});
					}
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** LBDMS POI데이터 조회 END **********/
	//================ 2017.11.06 [개발팀] LBDMS 데이터연계 END ================//
	
}(window, document));