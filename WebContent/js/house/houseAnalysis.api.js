/**
 * 살고싶은 우리동네 API
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2015/12/01  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$houseAnalysisMap.api = {
			tmpOptions : {},
			paramsArr : {},
		/**
		 * @name          : setStatsData
		 * @description   : 데이터 셋팅
		 * @date          : 2015. 12. 09. 
		 * @author	      : 나광흠
		 * @history 	  :
		 * @param res     : 데이터
		 * @param options : 옵션
		 */
		setStatsData: function(res, options) {
			var result = res.result;
			var params = options.params;
			var map = params.map;
			if($houseAnalysisMap.ui.hasText(params.adm_cd)){
				res["pAdmCd"] = params.adm_cd;
			}else{
				res["pAdmCd"] = "00";
			}
			if(result){
				$.each(result,function(cnt,node){
					//N/A의 경우 0으로 치환
					if (node[params.filter] == "N/A") {
						node[params.filter] = "0";
					}
					node["isHouseMap"] = $houseAnalysisMap.search.isIndicator;
					if(options.data_nm){
						node["data_nm"] = options.data_nm;
					}
					if(params.level){
						node["level"] = params.level;
					}
				});
			}else{
				res.result = [];
			}
			map.setStatsData("normal", res, params.filter, params.unit);
			setTimeout(function(){
				$houseAnalysisMap.api.tmpOptions["zoomlevel"] = map.zoom;
				$houseAnalysisMap.api.tmpOptions["center"] = map.center;
			},3000);
		},
		/**
		 * @name                 : houseAnalysisOrderLists
		 * @description          : 주거지분석맵 지표순위 가져오기
		 * @date                 : 2016. 07. 04.
		 * @author	             : 나광흠
		 * @history 	         :
		 * @param level          : 찾을 레벨(1 : 시도, 2 : 시군구, 3 : 읍면동)
		 * @param b_class_idx_id : 대분류
		 * @param m_class_idx_id : 중분류
		 * @param year           : 년도
		 * @param sido_cd        : 시도 코드
		 * @param sgg_cd         : 시군구 코드
		 * @param isMapSetting	 : 타이틀 셋팅 유무
		 * @param callback       : callback
		 */
		houseAnalysisOrderLists : function(level,b_class_idx_id,m_class_idx_id,year,sido_cd,sgg_cd,isMapSetting,callback){
			if(!level||!b_class_idx_id||!m_class_idx_id||!year){
				messageAlert.open("알림","파라미터값이 잘못 되었습니다");
				console.error("파라미터값이 잘못 되었습니다");
				return;
			}
			var obj = new sop.portal.houseAnalysisOrderLists.api();
			var parameters="";
			//자치구 경계
			if(
				(b_class_idx_id=="HML0003"&&m_class_idx_id=="HMM0012")||//순유입인구
				(b_class_idx_id=="HML0006"&&m_class_idx_id=="HMM0020")//교원 1인당 학생수
			){
				obj.addParam("borough", "1");
				parameters+="borough=1&";
			}
			if(sido_cd&&sido_cd!="00"){
				obj.addParam("sido_cd", sido_cd);
				parameters+="sido_cd="+sido_cd+"&";
				if(sgg_cd&&sgg_cd!="999"){
					obj.addParam("sgg_cd", sgg_cd);
					parameters+="sgg_cd="+sgg_cd+"&";
				}
			}
			obj.addParam("b_class_idx_id", b_class_idx_id);
			obj.addParam("m_class_idx_id", m_class_idx_id);
			obj.addParam("level", level);
			obj.addParam("year", year);
			parameters+="b_class_idx_id="+b_class_idx_id+"&";
			parameters+="m_class_idx_id="+m_class_idx_id+"&";
			parameters+="level="+level+"&";
			parameters+="year="+year+"&";
			if(isMapSetting===true){
				var node = bClassInfoList[b_class_idx_id].indicator[m_class_idx_id];
				if(level==1){
					$houseAnalysisMap.search.setTitle("전국",node.m_class_idx_nm);
					$houseAnalysisMap.search.mapStat.indicator.apiLogWrite(node.m_class_idx_nm,parameters,"전국");
				}else{
					$houseAnalysisMap.api.getAdmCdToCoor($houseAnalysisMap.search.activeAdmCd, year,"0",null,function(result){
						$houseAnalysisMap.search.setTitle(result.features[0].properties.adm_nm,node.m_class_idx_nm);
						$houseAnalysisMap.search.mapStat.indicator.apiLogWrite(node.m_class_idx_nm,parameters,result.features[0].properties.adm_nm);
					});
				}
			}
			obj.request({
				method : "POST",
				async : true,
				url : contextPath+"/ServiceAPI/house/houseAnalysisOrderLists.json",
				options : {
					callback : callback
				}
			});
		},
		/**
		 * @name            : areaIndexChartLists
		 * @description     : 지역 종합현황 가져오기
		 * @date            : 2016. 07. 04.
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param sido_cd   : 시도 코드
		 * @param sgg_cd    : 시군구 코드
		 * @param emdong_cd : 읍면동 코드
		 * @param type		: 일반경계 및 데이터경계 타입
		 * @param callback  : callback
		 */
		areaIndexChartLists : function(sido_cd,sgg_cd,emdong_cd,type,callback){
			if(!$houseAnalysisMap.ui.hasText(sido_cd)){
				sido_cd="00";
			}
			if(!$houseAnalysisMap.ui.hasText(sgg_cd)){
				sgg_cd="999";
			}
			var obj = new sop.portal.areaIndexChartLists.api();
			obj.addParam("bnd_year", $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year);
			obj.addParam("sido_cd", sido_cd);
			obj.addParam("sgg_cd", sgg_cd);
			if(emdong_cd){
				obj.addParam("emdong_cd", emdong_cd);
			}
			if(type){
				obj.addParam("type", type);
			}
			obj.request({
				method : "POST",
				async : true,
				url : contextPath+"/ServiceAPI/house/areaIndexChartLists.json",
				options : {
					callback : callback
				}
			});
		},
		/**
		 * @name           : recommendAreaLists
		 * @description    : 추천지역 찾기 조회
		 * @date           : 2016. 08. 18.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param callback : callback
		 */
		recommendAreaLists:function(callback){
			var obj = new sop.portal.recommendAreaLists.api();
			obj.addParam("base_year", $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year);
			obj.addParam("now_resid_sido_cd", $houseAnalysisMap.search.getRecommendObject().now_resid_sido_cd);
			obj.addParam("now_resid_sgg_cd", $houseAnalysisMap.search.getRecommendObject().now_resid_sgg_cd);
			obj.addParam("inter_resid_sido_cd", $houseAnalysisMap.search.getRecommendObject().inter_resid_sido_cd);
			obj.addParam("inter_resid_sgg_cd", $houseAnalysisMap.search.getRecommendObject().inter_resid_sgg_cd);
			obj.addParam("importance_cd", $houseAnalysisMap.search.getRecommendObject().importance_cd.join());
			obj.addParam("importance_val", $houseAnalysisMap.search.getRecommendObject().importance_val.join());
			obj.addParam("importance_asis_val", $houseAnalysisMap.search.getRecommendObject().importance_asis_val.join());
			obj.addParam("importance_search_val", $houseAnalysisMap.search.getRecommendObject().importance_search_val.join());
			obj.addParam("importance_disp_lev", $houseAnalysisMap.search.getRecommendObject().importance_disp_lev.join());
			
			var tab3Flag = true;
			if($houseAnalysisMap.search.isAbode===false&&$houseAnalysisMap.search.isIdealType!==true){
				$houseAnalysisMap.search.recommend.apiLogWrite();
				tab3Flag = false;
			}
			
			if(tab3Flag){
				var parameter = "";
				parameter += "base_year=" + $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year+ "&";
				parameter += "now_resid_sido_cd=" + $houseAnalysisMap.search.getRecommendObject().now_resid_sido_cd + "&";
				parameter += "now_resid_sgg_cd=" + $houseAnalysisMap.search.getRecommendObject().now_resid_sgg_cd + "&";
				parameter += "inter_resid_sido_cd=" + $houseAnalysisMap.search.getRecommendObject().inter_resid_sido_cd + "&";
				parameter += "inter_resid_sgg_cd=" + $houseAnalysisMap.search.getRecommendObject().inter_resid_sgg_cd + "&";
				parameter += "importance_cd=" + $houseAnalysisMap.search.getRecommendObject().importance_cd.join()+ "&";
				parameter += "importance_val=" + $houseAnalysisMap.search.getRecommendObject().importance_val.join() + "&";
				parameter += "importance_asis_val=" + $houseAnalysisMap.search.getRecommendObject().importance_asis_val.join() + "&";
				parameter += "importance_search_val=" + $houseAnalysisMap.search.getRecommendObject().importance_search_val.join() + "&";
				parameter += "importance_disp_lev=" +$houseAnalysisMap.search.getRecommendObject().importance_disp_lev.join() + "&";
				apiLogWrite2("J0", "J05", "간편동네찾기", parameter, "7", "NULL");
				
				var tmpOptions = $houseAnalysisMap.api.tmpOptions;
				var paramsArr = $houseAnalysisMap.api.paramsArr;
				
				tmpOptions["map_type"] = "BMAP"
				
				tmpOptions["title"] = "간편동네찾기",
				tmpOptions["url"] = "";
				tmpOptions["zoomlevel"] = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].zoom;
				tmpOptions["center"] = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].center;
					
				paramsArr["bnd_year"] = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year;
				paramsArr["now_resid_sido_cd"] = $houseAnalysisMap.search.getRecommendObject().now_resid_sido_cd;
				paramsArr["now_resid_sgg_cd"] =  $houseAnalysisMap.search.getRecommendObject().now_resid_sgg_cd;
				paramsArr["inter_resid_sido_cd"] = $houseAnalysisMap.search.getRecommendObject().inter_resid_sido_cd;
				paramsArr["inter_resid_sgg_cd"] = $houseAnalysisMap.search.getRecommendObject().inter_resid_sgg_cd;
				paramsArr["importance_cd"] = $houseAnalysisMap.search.getRecommendObject().importance_cd.join();
				paramsArr["importance_val"] =  $houseAnalysisMap.search.getRecommendObject().importance_val.join();
				paramsArr["importance_asis_val"] = $houseAnalysisMap.search.getRecommendObject().importance_asis_val.join();
				paramsArr["importance_search_val"] = $houseAnalysisMap.search.getRecommendObject().importance_search_val.join();
				paramsArr["importance_disp_lev"] = $houseAnalysisMap.search.getRecommendObject().importance_disp_lev.join();

				paramsArr["liketown_1"] = $("a[data-name='liketown_1'].M_on").data("id");
				paramsArr["liketown_2"] = $(".RadioGroup>label[data-name='liketown_2'].on").attr("for");
				paramsArr["liketown_3"] = $("a[data-name='liketown_3'].M_on").data("id");
				paramsArr["liketown_5"] = $(".RadioGroup>label[data-name='liketown_5'].on").attr("for");
				
				var drop_string;
				var drop_text;
				var drop_arr = new Array;

				for(var i=0; i<$("#ideal-type-dropzone>div.M_on").length; i++){
					drop_string = $("#ideal-type-dropzone>div.M_on:eq("+i+")")[0].innerText;
					drop_text = drop_string.substring(1,drop_string.length-2).trim().replace(/ /g, ''); 
					drop_arr.push(drop_text);
				}

				var b_serial = new Array;
				var m_serial = new Array;
				var s_serial = new Array;
//				var serial_color = new Array;
				var serial_text = new Array;
				for(var i=0; i<$("#facilities-list>li").length; i++){
					serial_text = $("#facilities-list>li:eq("+i+")").text().trim().replace(/ /g, ''); 
					for(var j=0; j<drop_arr.length; j++){
						if(drop_arr[j] == serial_text){
								b_serial.push($("#facilities-list>li:eq("+i+")").data("b_class_search_serial"));
								m_serial.push($("#facilities-list>li:eq("+i+")").data("m_class_search_serial"));
								s_serial.push($("#facilities-list>li:eq("+i+")").data("s_class_search_serial"));
//								serial_color.push($("#facilities-list>li:eq("+i+")").data("color"));
						}
					}
				}
				for(var i=0; i<$("#neighbor-list>li").length; i++){
					serial_text = $("#neighbor-list>li:eq("+i+")").text().trim().replace(/ /g, ''); 
					for(var j=0; j<drop_arr.length; j++){
						if(drop_arr[j] == serial_text){
								b_serial.push($("#neighbor-list>li:eq("+i+")").data("b_class_search_serial"));
								m_serial.push($("#neighbor-list>li:eq("+i+")").data("m_class_search_serial"));
								s_serial.push($("#neighbor-list>li:eq("+i+")").data("s_class_search_serial"));
//								serial_color.push($("#neighbor-list>li:eq("+i+")").data("color"));
						}
					}
				}
				for(var i=0; i<$("#situation-list>li").length; i++){
					serial_text = $("#situation-list>li:eq("+i+")").text().trim().replace(/ /g, ''); 
					for(var j=0; j<drop_arr.length; j++){
						if(drop_arr[j] == serial_text){
								b_serial.push($("#situation-list>li:eq("+i+")").data("b_class_search_serial"));
								m_serial.push($("#situation-list>li:eq("+i+")").data("m_class_search_serial"));
								s_serial.push($("#situation-list>li:eq("+i+")").data("s_class_search_serial"));
//								serial_color.push($("#situation-list>li:eq("+i+")").data("color"));
						}
					}
				}

				paramsArr["b_serial"] = b_serial;
				paramsArr["m_serial"] = m_serial;
				paramsArr["s_serial"] = s_serial;
				
				tmpOptions["params"] = paramsArr;
				$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].shareInfo.setHouseShareInfo(tmpOptions, 2, $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].id);
				
			}else{
				var tmpOptions = $houseAnalysisMap.api.tmpOptions;
				var paramsArr = $houseAnalysisMap.api.paramsArr;
				tmpOptions["map_type"] = "BMAP"
				
				tmpOptions["title"] = "추천지역찾기",
				tmpOptions["url"] = "";
				tmpOptions["zoomlevel"] = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].zoom;
				tmpOptions["center"] = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].center;
					
				paramsArr["bnd_year"] = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].bnd_year;
				paramsArr["now_resid_sido_cd"] = $houseAnalysisMap.search.getRecommendObject().now_resid_sido_cd;
				paramsArr["now_resid_sgg_cd"] =  $houseAnalysisMap.search.getRecommendObject().now_resid_sgg_cd;
				paramsArr["inter_resid_sido_cd"] = $houseAnalysisMap.search.getRecommendObject().inter_resid_sido_cd;
				paramsArr["inter_resid_sgg_cd"] = $houseAnalysisMap.search.getRecommendObject().inter_resid_sgg_cd;
				paramsArr["importance_cd"] = $houseAnalysisMap.search.getRecommendObject().importance_cd.join();
				paramsArr["importance_val"] =  $houseAnalysisMap.search.getRecommendObject().importance_val.join();
				paramsArr["importance_asis_val"] = $houseAnalysisMap.search.getRecommendObject().importance_asis_val.join();
				paramsArr["importance_search_val"] = $houseAnalysisMap.search.getRecommendObject().importance_search_val.join();
				paramsArr["importance_disp_lev"] = $houseAnalysisMap.search.getRecommendObject().importance_disp_lev.join();
				paramsArr["life_index"] = $("#LifeStyleSelect>li.M_on").index();
				
				tmpOptions["params"] = paramsArr;
				$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].shareInfo.setHouseShareInfo(tmpOptions, 0, $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].id);
			}
			
			obj.onBlockUIPopup();
			obj.request({
				method : "POST",
				async : true,
				url : contextPath+"/ServiceAPI/house/recommendAreaLists.geojson",
				options : {
					callback : callback
				}
			});
		},
		/**
		 * @name             : getAdmCdToCoor
		 * @description      : 행정구역경계
		 * @date             : 2015. 12. 09 
		 * @author	         : 나광흠
		 * @history 	     :
		 * @param adm_cd     : 행정동 코드
		 * @param year       : 년도
		 * @param low_search : 행정구역코드에 해당하는 정보만 요청 : 0,하위 행정구역 정보 요청 : 1
		 * @param borough    : 자치구
		 * @param callback   : callback 
		 */
		getAdmCdToCoor:function(adm_cd,year,low_search,borough,callback){
			if($houseAnalysisMap.ui.hasText(adm_cd)&&adm_cd!="00"){
				var type = "hadmarea"
				if(adm_cd.length>=7){
					type = "statsarea";
				}
				var obj = new sop.openApi.boundary.api();
				if($houseAnalysisMap.ui.hasText(low_search)&&adm_cd.length<=5){
					obj.addParam("low_search", low_search);
				}
				if($houseAnalysisMap.ui.hasText(borough)){
					obj.addParam("borough", borough);
				}
				obj.addParam("accessToken", accessToken);
				obj.addParam("year", year);
				obj.addParam("adm_cd", adm_cd);
				obj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/boundary/"+type+".geojson",
					options : {
						adm_cd:adm_cd,
						year:year,
						low_search:low_search,
						borough:borough,
						callback:callback
					}
				});
				
			}else{
				$.ajax({
					type: "GET",
					url: contextPath+"/js/data/geo_sido_" + year + ".js",
					async: false,
					success: function(res) {
						callback(res);
					} ,
					dataType: "json",
					error:function(e){}  
				});
			}
		},
		census : {
			API_0301 : {
				url : "/OpenAPI3/stats/population.json",
				showName : {
					"tot_ppltn" : "총인구",
					"avg_age" : "평균나이",
					"ppltn_dnsty" : "인구밀도",
					"aged_child_idx" : "노령화지수",
					"oldage_suprt_per" : "노년부양비",
					"juv_suprt_per" : "유년부양비",
					"tot_family" : "총가구",
					"avg_fmember_cnt" : "평균가구원수",
					"tot_house" : "총주택",
					"nongga_cnt" : "농가",
					"nongga_ppltn" : "농가 인구",
					"imga_cnt" : "임가",
					"imga_ppltn" : "임가 인구",
					"naesuoga_cnt" : "내수면 어가",
					"naesuoga_ppltn" : "내수면 어가 인구",
					"haesuoga_cnt" : "해수면 어가",
					"haesuoga_ppltn" : "해수면 어가인구",
					"employee_cnt" : "종업원수",
					"corp_cnt" : "사업체수"
				}
			},
			API_0302 : {
				url : "/OpenAPI3/stats/innersearchpopulation.json",
				showName : {
					"population" : "인구수",
					"avg_age" : "평균나이"
				}
			},
			API_0303 : {
				url : "/OpenAPI3/stats/industrycode.json",
				showName : {
					"class_code" : "코드",
					"class_nm" : "코드명"
				}
			},
			API_0304 : {
				url : "/OpenAPI3/stats/company.json",
				showName : {
					"corp_cnt" : "사업체 수",
					"tot_worker" : "총 종사자 수"
				}
			},
			API_0305 : {
				url : "/OpenAPI3/stats/household.json",
				showName : {
					"household_cnt" : "가구수",
					"family_member_cnt" : "총 가구원 수",
					"avg_family_member_cnt" : "평균가구원수"
				}
			},
			API_0306 : {
				url : "/OpenAPI3/stats/house.json",
				showName : {
					"house_cnt" : "주택수"
				}
			},
			API_0307 : {
				url : "/OpenAPI3/stats/farmhousehold.json",
				showName : {
					"farm_cnt" : "농가 수",
					"population" : "농가인구 수",
					"avg_population" : "농가 평균 인구 수"
				}
			},
			API_0308 : {
				url : "/OpenAPI3/stats/forestryhousehold.json",
				showName : {
					"forestry_cnt" : "가구 수",
					"population" : "임가 인구 수",
					"avg_population" : "임가 평균인구 수"
				}
			},
			API_0309 : {
				url : "/OpenAPI3/stats/fisheryhousehold.json",
				showName : {
					"fishery_cnt" : "어가 수",
					"population" : "어가인구 수",
					"avg_population" : "어가 평균 인구 수"
				}
			},
			API_0310 : {
				url : "/OpenAPI3/stats/householdmember.json",
				showName : {
					"population" : "인구 수"
				}
			},
			API_0602 : {
				url :"/OpenAPI3/startupbiz/pplsummary.json",
				showName : {
					"apart_per" : "아파트",
					"row_house_per" : "연립/다세대",
					"effi_apart_per" : "오피스텔",
					"detach_house_per" : "단독주택",
					"dom_soc_fac_per" : "기숙사 및 사회시설",
					"etc_per" : "기타"
				}
			},
			API_0604 : {
				url : "/OpenAPI3/startupbiz/housesummary.json",
				showName : {
					"teenage_less_than_per" : "10대 미만",
					"teenage_per" : "10대",
					"twenty_per" : "20대",
					"thirty_per" : "30대",
					"forty_per" : "40대",
					"fifty_per" : "50대",
					"sixty_per" : "60대",
					"seventy_more_than_per" : "70대 이상"
				}
			},
			API_0606 : {
				url : "/OpenAPI3/startupbiz/ocptnsummary.json",
				showName : {
					"self_per" : "자가", 
					"lease_per" : "전세", 
					"monrent_per" : "월세" 
				}
			},
			/**
			 * @name            : getCensusData
			 * @description     : 센서스 데이터
			 * @date            : 2016. 03. 16. 
			 * @author          : 나광흠
			 * @history         :
			 * @param api       : api id
			 * @param parameter : parameter
			 * @param callback  : callback
			 */
			getCensusData : function(api,parameter,callback){
				var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
				var url = openApiPath+this[api].url;
				if(api=="API_0304"&&!parameter.class_code){//사업체 검색이고 전산업일 경우는 API_0301 로 바라보게 변경 
					url = openApiPath+this["API_0301"].url;
				}
				if(url){
					var obj = new sop.openApi.map.census.api();
					obj.addParam("accessToken", accessToken);
					if(/^API_03/.test(api)&&!$houseAnalysisMap.ui.hasText(parameter.low_search)){
						obj.addParam("low_search", 1);
					}
					$.map(parameter,function(value,key){
						if(value){
							if(key=="adm_cd"){
								if($houseAnalysisMap.ui.hasText(value)&&value!="00"){
									obj.addParam(key, value);
								}
							}else{
								obj.addParam(key, value);
							}
						}
					});
					obj.request({
						method : "GET",
						async : false,
						url : url,
						options : {
							api : api,
							parameter : parameter,
							callback : callback
						}
					});
				}else{
					messageAlert.open("알림", "API가 잘못 되었습니다");
				}
			}
		}
	};
	/*********** 주거지분석 순위 정보 조회 시작 **********/
	(function() {
		$class("sop.portal.houseAnalysisOrderLists.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(typeof options.callback==="function"){
					options.callback(res);
				}
			},
			onFail: function(status, options) {
			}
		});
	}());
	/*********** 주거지분석 순위 정보 조회 종료 **********/
	/*********** 지역종합 리스트 정보 조회 시작 **********/
	(function() {
		$class("sop.portal.areaIndexChartLists.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(typeof options.callback==="function"){
					options.callback(res);
				}
			},
			onFail: function(status, options) {
			}
		});
	}());
	/*********** 지역종합 리스트 정보 조회 종료 **********/
	/*********** 추천지역 리스트 정보 조회 시작**********/
	(function () {
		$class("sop.portal.recommendAreaLists.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				this.onBlockUIClose();
				if(typeof options.callback === "function"){
					options.callback(res);
				}
			},
			onFail : function (status) {
				messageAlert.open("알림", errorMessage);
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 추천지역 리스트 정보 조회 종료 **********/
	/*********** OpenAPI 경계 데이터 조회 시작 **********/
	(function () {
		$class("sop.openApi.boundary.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$houseAnalysisMap.api.getAdmCdToCoor(options.adm_cd,options.year,options.low_search,options.borough,options.callback);
					});
				}else{
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}
			},
			onFail : function (status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** OpenAPI 경계 데이터 조회 종료 **********/
	/*********** OpenAPI 센서스 데이터 조회 시작 **********/
	(function () {
		$class("sop.openApi.map.census.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$houseAnalysisMap.api.census.getCensusData(options.api,options.parameter,options.callback);
					});
				}else{
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}
			},
			onFail : function (status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** OpenAPI 센서스 데이터 조회 종료 **********/
}(window, document));