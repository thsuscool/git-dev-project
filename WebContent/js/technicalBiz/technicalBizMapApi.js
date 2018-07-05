/**
 * 창업지원 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/11/05  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$technicalBizMapApi = W.$technicalBizMapApi || {};
	
	$technicalBizMapApi.request = {
			
			API_0301_URL : "/OpenAPI3/stats/population.json",
			API_0302_URL : "/OpenAPI3/stats/innersearchpopulation.json",	
			API_0303_URL : "/OpenAPI3/stats/industrycode.json",
			API_0304_URL : "/OpenAPI3/stats/company.json",
			API_0305_URL : "/OpenAPI3/stats/household.json",
			API_0306_URL : "/OpenAPI3/stats/house.json",
			API_0307_URL : "/OpenAPI3/stats/farmhousehold.json",
			API_0308_URL : "/OpenAPI3/stats/forestryhousehold.json",
			API_0309_URL : "/OpenAPI3/stats/fisheryhousehold.json",
			API_0310_URL : "/OpenAPI3/stats/householdmember.json",
			API_0601_URL : "/OpenAPI3/startupbiz/startupbiz.json",
			//API_0615_URL : "/OpenAPI3/technicalbiz/sggcompanyinfo.json",
			API_1101_URL : "/OpenAPI3/technicalbiz/sidocompanyinfo.json",
			API_1104_URL : "/OpenAPI3/technicalbiz/startupbizfac.json",
			API_1108_URL : "/OpenAPI3/technicalbiz/induscom.json",					//전국 산업단지정보조회 
			API_100650_URL : "/ServiceAPI/technicalBiz/getPoiCompanyDensity.json",	//업종밀집도변화
			API_100640_URL : "/ServiceAPI/technicalBiz/getTechSggCorpCount.json",	//시군구별 기술업종현황-전체 기술업종조회
			API_100652_URL : "/ServiceAPI/technicalBiz/supplyRegionInfo.json",
			API_100654_URL : "/ServiceAPI/technicalBiz/industryBoundary.geojson",	//산업단지경계
			API_100655_URL : "/ServiceAPI/technicalBiz/newCorpInfoList.json",		//지역별 신설법인정보
			API_100656_URL : "/ServiceAPI/technicalBiz/supplyPoiInIndustry.json",	//산업단지 내 지원시설정보조회
			API_100657_URL : "/ServiceAPI/technicalBiz/sggCompanyMapInfo.json",		//시군구별 기술업종정보
			API_1111_URL : "/OpenAPI3/technicalbiz/sidoworkerinfo.json",
			//2017.09.04 개발팀 추가 API_1111_URL
			/**
			 * 
			 * @name         : openApiPplSummary
			 * @description  : 창업통계
			 * @date         : 2014. 11. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param : options
			 */
			openApiPplSummary : function(options) {
				var sopOpenApiPplSummaryObj = new sop.openApi.pplsummary.api();
				sopOpenApiPplSummaryObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < options.params.length; i++) {
					sopOpenApiPplSummaryObj.addParam(options.params[i].key, options.params[i].value);
				}
				
				if ( options.adm_cd != "00") {
					sopOpenApiPplSummaryObj.addParam("adm_cd", options.adm_cd);
				}
				
				sopOpenApiPplSummaryObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0601_URL,
					options : {
						btntype : "areaSearch",
						params : options,
						url : this.API_0601_URL,
					}
				});
			},
			
			/**
			 * 
			 * @name         : openApiStatBaseYearProcess
			 * @description  : 통계별최신년도 정보를 조회한다.
			 * @date         : 2014. 10. 17. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			openApiStatBaseYearProcess : function(api_id, params, options) {
				var sopStatBaseYearObj = new sop.portal.statBaseYear.api();
				var param_info = new Array();
				for (key in params) {
					param_info.push(key);
				}
				sopStatBaseYearObj.addParam("api_id", api_id);
				sopStatBaseYearObj.addParam("param_info", param_info);
				sopStatBaseYearObj.request({
					method : "POST",
				    async : true,
				    url : contextPath+"/ServiceAPI/map/interactive/statBaseYear.json",
				    options : {
				    	api_id : api_id,
				    	params : params,
				    	options : options
				    }
				});
			},
			
			/**
			 * 
			 * @name         : openApiBizStats
			 * @description  : 창업통계정보를 호출한다.
			 * @date         : 2014. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 통계정보 파라미터
			 */
			openApiBizStats : function(params) {
				var sopOpenApiBizStatsObj = new sop.openApi.bizStats.api();
				var paramInfo = params.param_info.paramInfo;
				for (k in paramInfo) {
					if (k == "adm_cd") {
						if(paramInfo[k] == "00") {
							continue;
						}
					}
					sopOpenApiBizStatsObj.addParam(k, paramInfo[k]);
				} 
				
				sopOpenApiBizStatsObj.addParam("accessToken", accessToken);		
				sopOpenApiBizStatsObj.request({
					method : "GET",
					async : false,
					url : openApiPath + params.api_call_url,
					options : {
						btntype : "normal",
						params : params,
					}
				});
			},
			
			/**
			 * 
			 * @name         : openApiSggCompanyCnt
			 * @description  : 전국 시군구 사업체 정보를 호출한다.
			 * @date         : 2015. 11. 20. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param themeCd : 테마코드
			 */
			openApiSggCompanyCnt : function(themeCd, themeNm, map, type, callback) {
				
				apiLogWrite2("T0", "T02", "시군구 기술업종 현황", "themeCd="+themeCd+"&themeNm="+themeNm+"sggCd="+map.curSidoCd+ map.curSiggCd , map.zoom, map.curSidoNm + " " + map.curSiggNm);
				var sopOpenApiSggCompanyCntObj = new sop.openApi.sggCompanyCnt.api();
				sopOpenApiSggCompanyCntObj.addParam("techbiz_m_class_cd", themeCd);
				sopOpenApiSggCompanyCntObj.addParam("type", type);
				sopOpenApiSggCompanyCntObj.addParam("year", companyDataYear);	
				sopOpenApiSggCompanyCntObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_100657_URL,
					options : {
			        	btntype : "chart",
			        	api_id : "API_0615",
			        	params : {
							theme_cd : themeCd,
							adm_nm : "전국"
			        	},
			        	map : map,
			        	themeCd : themeCd,
						themeNm : themeNm,
						url : this.API_100657_URL,
						callback : callback,
						type : type
			        }
				});
			},
			
			/**
			 * 
			 * @name         : openApiSggAllCompanyCnt
			 * @description  : 전국 시군구 전체기술업종 정보를 호출한다.
			 * @date         : 2016. 10. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			openApiSggAllCompanyCnt : function(themeNm, year, map, callback) {
				var sopOpenApiSggAllCompanyCntObj = new sop.openApi.sggAllCompanyCnt.api();
				sopOpenApiSggAllCompanyCntObj.addParam("base_year", year);
				sopOpenApiSggAllCompanyCntObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_100640_URL,
					options : {
			        	map : map,
						themeNm : themeNm,
						year : year,
						url : this.API_100640_URL,
						callback : callback
			        }
				});
			},
			
			//2017.10.16 개발팀 추가 시작
			/**
			 * 
			 * @name         : openApiGetAllLq
			 * @description  : 전국 업종별 입지계수를 검색 한다.
			 * @date         : 2017.10.16
			 * @author	     : 최재영
			 * @history 	 :
			 * @param
			 */
			openApiGetAllLq : function (themeCd,themeNm,type,base_region,year,map,standard,callback){
				var sopApiGetAllLq = new sop.portal.getAllLq.api();
				sopApiGetAllLq.addParam("base_year",year);
				sopApiGetAllLq.addParam("techbiz_class_cd",themeCd);
				sopApiGetAllLq.addParam("lower_search",'1');
				
				//http://localhost:8080/ServiceAPI/technicalBiz/getRegionLq.json?base_year=2015&techbiz_class_cd=111&lower_search=1
				
				
				sopApiGetAllLq.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getRegionLq.json",
					options : {
			        	map : map,
						themeNm : themeNm,
						themeCd : themeCd,
						year : year,
						base_region : base_region,
						standard : standard,
						callback : callback,
						url : "/ServiceAPI/technicalBiz/getRegionLq.json"
			        }
				});
				apiLogWrite2("T0", "T07", "업종별 입지계수 지도", "themeNm="+ themeNm + "&year="+ year, map.zoom, "전국");
			},
			
			/**
			 * 
			 * @name         : openApiGetSggLq
			 * @description  : 시군구 업종별 입지계수를 검색 한다.
			 * @date         : 2017.10.17
			 * @author	     : 최재영
			 * @history 	 :
			 * @param
			 */
			openApiGetSggLq : function(params,themeCd,map,callback){
				//임시로 base_region 하드코딩
				var base_region = "country";
				if($("#lqInfoChartStandardButton > a").eq(1).hasClass("on")){
					base_region = "sido";
				}
				var sopApiGetSggLq = new sop.portal.getSggLq.api();
				/*sopApiGetSggLq.addParam("lq_base_region",base_region);*/
				sopApiGetSggLq.addParam("base_year",params.year);
				sopApiGetSggLq.addParam("adm_cd",params.adm_cd);
				sopApiGetSggLq.addParam("techbiz_class_cd",themeCd);
				sopApiGetSggLq.addParam("lower_search",'1');
				//http://localhost:8080/ServiceAPI/technicalBiz/getFindRegionSgg.json?base_year=2015&techbiz_m_class_cd=11&lq_base_region=country&sido_cd=25
				sopApiGetSggLq.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getRegionLq.json",
					options : {
			        	map : map,
						params : params,
						themeCd : themeCd,
						year : params.year,
						base_region : base_region,
						callback : callback,
						standard : params.standard,
						url : "/ServiceAPI/technicalBiz/getRegionLq.json"
			        }
				});
				
			},
			//2017.10.16 개발팀 추가 종료
			//2017.10.27 개발팀 추가
			/**
			 * 
			 * @name         : openApiSearchLq
			 * @description  : 시군구 업종별 입지계수를 검색 한다.
			 * @date         : 2017.10.17
			 * @author	     : 최재영
			 * @history 	 :
			 * @param
			 */
			openApiSearchLq : function(options){
				var sopApiSearchLq = new sop.portal.getSearchLq.api();
				if(options.techbiz_class_cd != "00"){
					sopApiSearchLq.addParam("techbiz_class_cd",options.techbiz_class_cd);
				}
				
				if(options.option1 == true){
					sopApiSearchLq.addParam("from_corp_lq",options.param.from_corp_lq);
					sopApiSearchLq.addParam("to_corp_lq",options.param.to_corp_lq);
					
				}
				if(options.option2 == true){
					sopApiSearchLq.addParam("from_worker_lq",options.param.from_worker_lq);
					sopApiSearchLq.addParam("to_worker_lq",options.param.to_worker_lq);
				}
				
				
				
				if(options.is_contain_bizfac == true){
					sopApiSearchLq.addParam("is_contain_bizfac","Y");
				}
				
				if(options.is_contain_induscom == true){
					sopApiSearchLq.addParam("is_contain_induscom","Y");
				}
				sopApiSearchLq.addParam("base_year",companyDataYear);
				sopApiSearchLq.addParam("lq_base_region",options.lq_base_region);
				var url = contextPath + "/ServiceAPI/technicalBiz/getFindRegionSgg.json";
				sopApiSearchLq.request({
					method : "POST",
					async : false,
					url : url,
					options : options
				});
				//base_year,
				//lq_base_region
				//from_corp_lq
				//to_corp_lq
				//from_worker_lq
				//to_worker_lq
				//is_contain_bizfac
				//is_contain_induscom
				//techbiz_class_cd 00 이면 전체이니 넣지 않도록
			},
			
			/**
			 * 
			 * @name         : openApiSearchIrds
			 * @description  : 시군구 업종별 입지계수를 검색 한다.
			 * @date         : 2017.10.17
			 * @author	     : 최재영
			 * @history 	 :
			 * @param
			 */
			openApiSearchIrds : function(options){
				var sopApiSearchLq = new sop.portal.getSearchLq.api();
				if(options.techbiz_class_cd != "00"){
					sopApiSearchLq.addParam("techbiz_class_cd",options.techbiz_class_cd);
				}
				
				if(options.option1 == true){
					sopApiSearchLq.addParam("from_corp_lq",options.param.from_corp_lq);
					sopApiSearchLq.addParam("to_corp_lq",options.param.to_corp_lq);
				}
				if(options.option2 == true){
					sopApiSearchLq.addParam("from_worker_lq",options.param.from_worker_lq);
					sopApiSearchLq.addParam("to_worker_lq",options.param.to_worker_lq);
				}
				
				
				
				if(options.is_contain_bizfac == true){
					sopApiSearchLq.addParam("is_contain_bizfac","Y");
				}
				
				if(options.is_contain_induscom == true){
					sopApiSearchLq.addParam("is_contain_induscom","Y");
				}
				sopApiSearchLq.addParam("base_year",companyDataYear);
				sopApiSearchLq.addParam("lq_base_region",options.lq_base_region);
				var url = contextPath + "/ServiceAPI/technicalBiz/getFindRegionSggIrds.json";
				sopApiSearchLq.request({
					method : "POST",
					async : false,
					url : url,
					options : options
				});
				//base_year,
				//lq_base_region
				//from_corp_lq
				//to_corp_lq
				//from_worker_lq
				//to_worker_lq
				//is_contain_bizfac
				//is_contain_induscom
				//techbiz_class_cd 00 이면 전체이니 넣지 않도록
			},
			
			//2017.10.27 개발팀 추가 종료
			
			/**
			 * 
			 * @name         : openApiPoiCompanyDensity
			 * @description  : 업종별 밀집도정보를 조회한다. - 업종별 poi정보
			 * @date         : 2016. 06. 15. 
			 * @author	     : 최재영
			 * @history 	 : 열지도를 집계데이터로 뿌리기 위해 별도로 생성한 정보
			 * @param themeCd : 테마코드
			 * @param admCd : 행정동코드
			 * @param year	: 데이터년도
			 * @param pageNum : 조회시작 인덱스
			 * @param resultCount : 조회갯수
			 */
			openApiPoiCompanyDensity : function(type, params, map, callback) {
				//map.theme_cd, map.year, type
				
				apiLogWrite2("T0", "T03", "업종 밀집도 변화", "theme_cd=" + params.theme_cd+"&type="+type+ "&year=" + params.year+ "&sgg_cd=" + map.curSidoCd + map.curSiggCd, map.zoom, map.curSidoNm + " "+ map.curSiggNm);
				
				$technicalBizMap.Popup.show(); //2018.01.18 [개발팀]
				var sopOpenApiPoiCompanyDensityObj = new sop.openApi.poiCompanyDensity.api();
				for (var p in params) {
					sopOpenApiPoiCompanyDensityObj.addParam(p, params[p]);
				}
				sopOpenApiPoiCompanyDensityObj.addParam("data_type", type);
				sopOpenApiPoiCompanyDensityObj.request({
					method : "POST",
					async : true, //2018.01.18 [개발팀]
					url : contextPath + this.API_100650_URL,
					options : {
						type : type,
						params : params,
						url : this.API_100650_URL,
						map : map,
						callback : callback
					}
				});
			},
			
			/**
			 * 
			 * @name         : openApiTechCharacterisCompanyInfo
			 * @description  : 기술업종 특성 전국기술업종현황 정보 조회
			 * @date         : 2017. 7. 14. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param params : 조회 파라미터 정보
			 * @param map    : 맵정보 
			 */
			openApiTechCharacterisInfo : function(map){
				/*apiLogWrite2("T0", "T01", "기술업종 특성", "bnd_year=" + map.bnd_year , map.zoom, "전국");
				var sopOpenApiTechSidoCompanyInfoObj = new sop.openApi.techSidoCompanyInfo.api();
				sopOpenApiTechSidoCompanyInfoObj.addParam("accessToken", accessToken);
				sopOpenApiTechSidoCompanyInfoObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_1101_URL,
					options : {
						url : this.API_1101_URL,
						map : map
					}
				}); */
			},
			
			/**
			 * 
			 * @name         : openApiTechSidoCompanyInfo
			 * @description  : 기술창업통계지도 전국기술업종현황 정보 조회
			 * @date         : 2016. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 조회 파라미터 정보
			 * @param map    : 맵정보 
			 */
			openApiTechSidoCompanyInfo : function(map) {
				apiLogWrite2("T0", "T01", "시도별 기술업종 현황", "bnd_year=" + map.bnd_year , map.zoom, "전국");
				var sopOpenApiTechSidoCompanyInfoObj = new sop.openApi.techSidoCompanyInfo.api();
				sopOpenApiTechSidoCompanyInfoObj.addParam("accessToken", accessToken);
				sopOpenApiTechSidoCompanyInfoObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_1101_URL,
					options : {
						url : this.API_1101_URL,
						map : map
					}
				}); 
			},
			
			//2017.09.04 개발팀 추가
			/**
			 * 
			 * @name         : openApiTechSidoWorkerInfo
			 * @description  : 기술창업통계지도 전국기술업종현황 종사자 정보 조회
			 * @date         : 2017. 09. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 조회 파라미터 정보
			 * @param map    : 맵정보 
			 */
			openApiTechSidoWorkerInfo : function(map){
				apiLogWrite2("T0", "T01", "시도별 기술업종 현황", "bnd_year=" + map.bnd_year , map.zoom, "전국");
				//현재 지도데이터 기준이 사업체 company , 종사자 worker 기준인지에 대한 선택 파라미터 추가 전송
				
				var sopOpenApiTechSidoWorkerInfoObj = new sop.openApi.techSidoWorkerInfo.api();
				sopOpenApiTechSidoWorkerInfoObj.addParam("accessToken", accessToken);
				sopOpenApiTechSidoWorkerInfoObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_1111_URL,
					options : {
						url : this.API_1111_URL,
						map : map
					}
				}); 
				
			},
			//2017.09.04 개발팀 추가 종료
			
			/**
			 * 
			 * @name         : openApiTechSidoCompanyInfo
			 * @description  : 기술창업통계지도 전국기술업종현황 정보 조회
			 * @date         : 2016. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 조회 파라미터 정보
			 * @param map    : 맵정보 
			 */
			openApiTotalSupplyFacilityPoi : function(map) {
				
				var sopOpenApiTotalSupplyFacilityPoiObj = new sop.openApi.totalSupplyFacilityPoi.api();
				sopOpenApiTotalSupplyFacilityPoiObj.addParam("accessToken", accessToken);
				sopOpenApiTotalSupplyFacilityPoiObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_1104_URL,
					options : {
						url : this.API_1104_URL,
						map : map
					}
				}); 
			},
			
			/**
			 * 
			 * @name         : openApiSupplyRegionInfo
			 * @description  : 지원시설 지역별 총사업체/종사자수 정보 조회
			 * @date         : 2016. 11. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 조회 파라미터 정보
			 * @param map    : 맵정보 
			 */
			openApiSupplyRegionInfo : function(params, map, callback) {
				
				if(params.menuType== "supply"){
					apiLogWrite2("T0", "T04", "지원시설 조회", "menuType="+ params.menuType + "&year="+ params.year, map.zoom, "전국");
				}else if(params.menuType == "industry"){
					apiLogWrite2("T0", "T05", "산업단지 조회", "menuType="+ params.menuType + "&year="+ params.year, map.zoom, "전국");
				}
				var sopOpenApiSupplyRegionInfoObj = new sop.openApi.supplyRegionInfo.api();
				for (p in params) {
					if (p == "year" || p == "adm_cd" || p == "type" || p == "bnd_year" || p == "techbiz_class_cd") {
						if ($technicalBizMap.ui.isLocalGov) {
							if (p == "adm_cd" && params[p] == "31020") {
								sopOpenApiSupplyRegionInfoObj.addParam(p, params[p].substring(0,4));
								continue;
							}
						}
						sopOpenApiSupplyRegionInfoObj.addParam(p, params[p]);
					}
				}

				sopOpenApiSupplyRegionInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_100652_URL,
					options : {
						url : this.API_100652_URL,
						params : params,
						callback : callback,
						map : map
					}
				}); 
			},
			
			/**
			 * 
			 * @name         : openApiAllIndustryPoiInfo
			 * @description  : 전국 산업단지 POI 정보 조회
			 * @date         : 2016. 11. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵정보 
			 */
			openApiAllIndustryPoi : function(map) {
				var sopOpenApiAllIndustryPoiInfoObj = new sop.openApi.allIndustryPoi.api();
				sopOpenApiAllIndustryPoiInfoObj.addParam("accessToken", accessToken);
				sopOpenApiAllIndustryPoiInfoObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_1108_URL,
					options : {
						url : this.API_1108_URL,
						map : map
					}
				}); 
			},	
			
			/**
			 * 
			 * @name         : OpenApiIndustryBoundary
			 * @description  : 산업단지 경계조회 
			 * @date         : 2016. 11. 24. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵정보 
			 */
			OpenApiIndustryBoundary: function(data, map) {
				var sopOpenApiIndustryBoundaryObj = new sop.openApi.industryBoundary.api();
				sopOpenApiIndustryBoundaryObj.addParam("complex_no", data.complex_no);
				sopOpenApiIndustryBoundaryObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_100654_URL,
					options : {
						url : this.API_100654_URL,
						map : map,
						data : data
					}
				}); 
			},
			
			/**
			 * 
			 * @name         : OpenApiNewCorpInfoList
			 * @description  : 지역별 신설법인정보 
			 * @date         : 2016. 12. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map    : 맵정보 
			 */
			OpenApiNewCorpInfoList: function(params, year, map) {
				var sopOpenApiNewCorpInfoListObj = new sop.openApi.newCorpInfoList.api();
				if (params != undefined) {
					for (var p in params) {
						if (p == "adm_cd") {
							sopOpenApiNewCorpInfoListObj.addParam(p, params[p]);
						}
					}
				}
				sopOpenApiNewCorpInfoListObj.addParam("year", year);
				sopOpenApiNewCorpInfoListObj.request({
					method : "POST",
					async : true,
					url : contextPath + this.API_100655_URL,
					options : {
						url : this.API_100655_URL,
						map : map,
						params : params
					}
				}); 
			},
			
			openApiSupplyPoiInIndustyBoundary : function(data, map) {
				var sopOpenApiSupplyPoiInIndustryBoundaryObj = new sop.openApi.supplyPoiInIndustryBoundaryObj.api();
				sopOpenApiSupplyPoiInIndustryBoundaryObj.addParam("complex_no", data.complex_no);
				sopOpenApiSupplyPoiInIndustryBoundaryObj.request({
					method : "POST",
					async : true,
					url : contextPath + this.API_100656_URL,
					options : {
						url : this.API_100656_URL,
						map : map,
						data : data
					}
				}); 
			},
			
			/**
			 * 
			 * @name         : setStatsData
			 * @description  : 
			 * @date         : 2014. 10. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsData : function (res, options) {		
				var result = res.result;
				var params = options.params;
				var map = params.map;
				var mapInfo = map.mapInfo;
				
				res["pAdmCd"] = params.adm_cd;

//				$bizStatsMap.ui.data = res;
//				map.isMiniMapDraw = true;
//				map.mapInfo.updateMiniMap();
				//데이터보드 업데이트
//				$bizStatsDataBoard.ui.updateDataBoard(options, "areaSearch");
				
				map.setStatsData("bizStats", res, "bizStats", params.unit);	
				map.autoDownBoundary();
				
				options["zoomlevel"] = map.zoom;
				options["btntype"] = "normal";
				options.params.api_id = "API_0601";
				
				//API 로그
				apiLogWrite("B0", options);
			},
			
			/**
			 * @name         : popupIntroChart
			 * @description  : 기술업종 인트로 팝업창 차트 초기화
			 * @date         : 2016. 10. 13. 
			 * @author	     : 김재상
			 */
			popupIntroChart : function(){
				// 2017. 03. 24 개발팀 수정요청
				var base_year = companyDataYear;
				var sopPortalPopupIntroChart = new sop.portal.popupIntroChart.api();
				sopPortalPopupIntroChart.addParam("base_year", base_year);
				sopPortalPopupIntroChart.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getIntroData.json",
					options : {
						params: {
							base_year : base_year
						}
					}
				});
			},
			
			
			/**
			 * @name         : getTechCd
			 * @description  : 기술업종 인트로 팝업창 코드 조회
			 * @date         : 2016. 10. 12. 
			 * @author	     : 김재상
			 */
			getTechCd : function(m_class_cd){
				var sopPortalGetTechCd = new sop.portal.getTechCd.api();
				sopPortalGetTechCd.addParam("b_class_cd", undefined);
				sopPortalGetTechCd.addParam("m_class_cd", m_class_cd);
				sopPortalGetTechCd.addParam("s_class_cd", undefined);
				
				sopPortalGetTechCd.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getTechCd.json",
					options : {
						params : {
							m_class_cd : m_class_cd
						}
					}
				});
			},
			
			
			/**
			 * @name         : areaFilterSearch
			 * @description  : 지역 필터 검색
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			areaFilterSearch : function(techCd,admCodeArray, option){
				var areaFilterSearch = new sop.portal.getAreaFilterSearch();
				areaFilterSearch.addParam("techCd",techCd);
				areaFilterSearch.addParam("admCodeArray",admCodeArray);
				areaFilterSearch.addParam("base_year", companyDataYear); //2018.01.18 [개발팀] 년도 하드코딩 수정
				areaFilterSearch.addParam("base_region",option.base_region);
				
				areaFilterSearch.addParam("ppltn",option.ppltn);
				if(option.ppltn == true){
					areaFilterSearch.addParam("fromPpltn",option.fromPpltn);
					areaFilterSearch.addParam("toPpltn",option.toPpltn);
				}
				
				areaFilterSearch.addParam("areaStat",option.areaStat);
				if(option.areaStat == true){
					areaFilterSearch.addParam("fromAreaStat",option.fromAreaStat);
					areaFilterSearch.addParam("toAreaStat",option.toAreaStat);
				}
				
				areaFilterSearch.addParam("areaPrice",option.areaPrice);
				if(option.areaPrice == true){
					areaFilterSearch.addParam("fromAreaPrice",option.fromAreaPrice);
					areaFilterSearch.addParam("toAreaPrice",option.toAreaPrice);
				}
				
				areaFilterSearch.addParam("financial",option.financial);
				if(option.financial == true){
					areaFilterSearch.addParam("fromFinancial",option.fromFinancial);
					areaFilterSearch.addParam("toFinancial",option.toFinancial);
				}
				
				
				areaFilterSearch.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getAreaFilterSearch.json",
					options : option
				});
			},
			
			
			/**
			 * @name         : searchAdmNm
			 * @description  : 지역 
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			searchAdmNm : function(admCodeArray,id,callback){ //2018.01.22 [개발팀]
				var searchAdmNm = new sop.portal.searchAdmNm();
				searchAdmNm.addParam("admCodeArray",admCodeArray);
				searchAdmNm.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/searchAdmNm.json",
					options : { //2018.01.22 [개발팀]
						id : id, 
						callback : callback
					}
				});
			},
			/**
			 * @name         : searchTechTotalInfo
			 * @description  : 지역 특성 정보 검색
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			searchTechTotalInfo : function(admCodeArray,techCd,base_region){
				var searchTechInfo = new sop.portal.searchTechTotalInfo();
				searchTechInfo.addParam("admCodeArray",admCodeArray);
				searchTechInfo.addParam("techCd",techCd);
				searchTechInfo.addParam("base_region",base_region);
				searchTechInfo.addParam("base_year", companyDataYear); //2018.01.18 [개발팀] 년도 하드코딩 수정
				
				$("#chtBox01").html('');
				$("#chtBox02").html('');
				$("#chtBox03").html('');
				$("#areaDetailInfoAdmList1").html('');
				$("#areaDetailInfoAdmList2").html('');
				$("#areaDetailInfoAdmList3").html('');
				
				searchTechInfo.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getTechTotalInfo.json",
					options : {base_region : base_region}
				});
			},
			
			
			/**
			 * @name         : searchTechDetailInfo
			 * @description  : 지역 특성 정보 검색
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			searchTechDetailInfo : function(admCodeArray,techCd,base_region,option1,option2){
				var searchTechInfo = new sop.portal.searchTechDetailInfo();
				searchTechInfo.addParam("admCodeArray",admCodeArray);
				searchTechInfo.addParam("techCd",techCd);
				searchTechInfo.addParam("base_region",base_region);
				searchTechInfo.addParam("base_year", companyDataYear); //2018.01.18 [개발팀] 년도 하드코딩 수정 
				searchTechInfo.addParam("option1",option1);
				searchTechInfo.addParam("option2",option2);
				
				searchTechInfo.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getTechDetailInfo.json",
					options : {}
				});
			},
			
			/**
			 * @name         : searchDetailCntInfo
			 * @description  : 검색지역 사업체수 종사자수 정보 검색
			 * @date         : 2017.11.07
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			searchDetailCntInfo : function(params, map, callback){
				var searchCntInfo = new sop.portal.searchDetailCntInfo();
				searchCntInfo.addParam("adm_cd",params.adm_cd);
				searchCntInfo.addParam("year",params.year);
				searchCntInfo.addParam("type",params.type);
				params.callback = callback;
				searchCntInfo.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/supplyRegionInfo.json",
					options : params
				});
				
			}
			
			
	};
	
	(function(){
		$class("sop.portal.areaStateData.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options){
					var map = options.params.map;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result.chartData;
							var tmpData = [];
							var data = [];
							var sidoCdList = [];
							for (var i=0; i<result.length; i++) {
								if("00" != result[i].sido_cd){
									tmpData.push(parseFloat(result[i].corp_cnt));
									sidoCdList.push(result[i].sido_cd);
								}
							}
							data.push(tmpData);
							map.legend.calculateLegend(data);
							
							if (map.legend.circleMarkerGroup == null) {
								map.legend.circleMarkerGroup = [];
							}
							
							//시도별로 그룹핑
							var tmpSidoList = [];
							$.each(sidoCdList, function (i, el) {
								if ($.inArray(el, tmpSidoList) === -1) {
									tmpSidoList.push(el);
								}
							});
							
							//시도별 총 사업체수
							var totalCntInfo = {};
							for (var k=0; k<tmpSidoList.length; k++) {
								var totalCnt = 0;
								var adm_cd = tmpSidoList[k];
								for (var i=0; i<result.length; i++) {
									if (result[i].sido_cd == tmpSidoList[k]) {
										totalCnt += parseFloat(result[i].corp_cnt);
										continue;
									}
								}
								totalCntInfo[adm_cd] = totalCnt;
							}
							
//							서클 마커 초기화
							if ($technicalBizMap.ui.sigunguMarkers != null && $technicalBizMap.ui.sigunguMarkers.length > 0) {
								for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
									var markers = $technicalBizMap.ui.sigunguMarkers[i].markers;
									for (var k=0; k<markers.length; k++) {
										markers[k].remove();
									}
								}
							}
							$technicalBizMap.ui.sigunguMarkers = [];
							
							var tmpGroup = {};
							for (var i=0; i<tmpSidoList.length; i++) {
								tmpGroup[tmpSidoList[i]] = [];
								for (var j=0; j<result.length; j++) {
									if (result[j].sido_cd == tmpSidoList[i]) {
										tmpGroup[result[j].sido_cd].push(result[j]);
									}
								}
							}
							
//							for (var k=0; k<tmpSidoList.length; k++) {
//								var markerInfo = {};
//								markerInfo["sido_cd"] = tmpSidoList[k];
//								var tmpMarkers = [];
//								
//								for (var i=0; i<result.length; i++) {
//									if (result[i].sido_cd == tmpSidoList[k]) {
//										var sggGroup = [];   
//										sggGroup.push(tmpGroup[result[i].sido_cd]);
//										var rate = ((parseFloat(result[i].corp_cnt)/totalCntInfo[result[i].sido_cd]) * 100).toFixed(2);
//										var summary =		"<div>";
//											summary += 			"<div class='bar'>";
//											summary +=				result[i].sido_nm + " " +result[i].sgg_nm+" 해당 업종 현황 (2015)";
//											summary +=			"</div>";
//											summary +=			"<div class='text01' style='margin-left:10px;'>";
//											summary += 				"<p style=''>"+options.themeNm+" : "+appendCommaToNumber(result[i].corp_cnt)+" (개)</p>";
//											summary += 				"<p style=''>비율 : "+rate+"% ("+result[i].sido_nm+" 기준)</p>";
//											summary +=			"</div>"; 	
//											summary +=		"</div>";
//							    			
//						    			var sggGroupHtml =		"<div class='parScroll' id='sigunguTooltipTable'>";
//					    					sggGroupHtml +=			"<table>";
//					    					sggGroupHtml +=				"<tr>";
//							    			for (var j=0; j<sggGroup[0].length; j++) {
//							    				if(j%3 	== 0 && j != 0)
//							    					sggGroupHtml += "</tr><tr>";
//							    				var sido_cd = sggGroup[0][j].sido_cd;
//							    				var adm_cd = sggGroup[0][j].sido_cd + sggGroup[0][j].sgg_cd;
//							    				$technicalBizMap.callbackFunc.sigunguTooltipOptions = options;
//							    				sggGroupHtml +=	"<td class='" + (result[i].sgg_cd == sggGroup[0][j].sgg_cd ? "on" : "") + "' id='" + adm_cd + "'>";
//							    				sggGroupHtml +=		"<a onclick='javascript:$technicalBizMap.callbackFunc.sigunguTooltipFunc(\"" + sido_cd + "\", \"" + adm_cd + "\");'>";
//							    				sggGroupHtml += 		sggGroup[0][j].sgg_nm;
//							    				sggGroupHtml += 	"</a>";
//							    				sggGroupHtml +=	"</td>";
//						    				}
//							    			sggGroupHtml += 			"</tr>";
//							    			sggGroupHtml += 		"</table>";
//							    			sggGroupHtml += 	"</div>";
//					    					
//										var tooltipMsg = $("<div></div>").append(
//												$("<div class='popAreaResult'></div>").append(summary).append(sggGroupHtml)
//										).html();
//							    			
//							    		var colorInfo = map.legend.getColor(parseFloat(result[i].corp_cnt), map.legend.valPerSlice[0]);
//							    		var marker = map.addCircleMarker(result[i].x_coor, result[i].y_coor, {
//							    			radius : map.legend.legendCircleRadius[colorInfo[1]],
//							    			color : colorInfo[0],
//							    			fillColor : "#fff",
//							    			weight : 4,
//							    			tooltipMsg : tooltipMsg
//							    		});
//							    		marker.options["sido_cd"] = result[i].sido_cd;
//							    		marker.options["bFillColor"] = "#fff";
//							    		marker.options["adm_cd"] = result[i].sido_cd+result[i].sgg_cd;
//							    		marker.options["adm_nm"] = result[i].sido_nm +" " +result[i].sgg_nm;
//							    		tmpMarkers.push(marker);
//							    		marker.on("mouseover", function(e) {
//							    			var markers = null;
//							    			for (var i=0; i<$technicalBizMap.ui.sigunguMarkers.length; i++) {
//							    				if ($technicalBizMap.ui.sigunguMarkers[i].sido_cd == e.target.options.sido_cd) {
//							    					markers = $technicalBizMap.ui.sigunguMarkers[i].markers;
//							    					break;
//							    				}
//							    			}
//							    			$technicalBizMap.callbackFunc.didMouseOverPolygon(e, markers, "sigungu", options.map);
//							    		});
//							    		marker.on("mouseout", function(e) {
//							    			$technicalBizMap.callbackFunc.didMouseOutPolygon(e, $technicalBizMap.ui.sigunguMarkers, "sigungu", options.map);
//							    		});
//							    		marker.on("click", function(e) {
//							    			$technicalBizMap.callbackFunc.didSelectedPolygon(e, $technicalBizMap.ui.sigunguMarkers, "sigungu", options.map);
//							    		});
//										continue;
//									} 
//								}
//								markerInfo["markers"] = tmpMarkers;
//								$technicalBizMap.ui.sigunguMarkers.push(markerInfo);
//							}
							tmpData = null;
							data = null;
							
							//API 로그
//							apiLogWrite("B0", options);
							break;
						case -401:
							accessTokenInfo(function() {
								$technicalBizMapApi.request.openApiSggCompanyCnt(options.themeCd, options.themeNm, options.map, options.callback);
							});
							break;
						default:
							break;
					}
				},
				onFail : function(status, options) {
				}
			});
}());
///////////////////////////////////////////////////////////////////////	
	/** ******** 기술업종 인트로 팝업창 차트 Start ******** */
	(function(){
		$class("sop.portal.popupIntroChart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options){
				if(res.errCd == 0){
					var introData = res.result.introData;
					var base_year = parseInt(options.params.base_year);
					var techbizRatio = $.pick(introData, {base_year: base_year}); // 중분류별 전국 기술업종 사업체 비율
					var techbizIncrease = []; // 중분류별, 년도별 사업체 비율 
					var techbizIncreaseRatio = []; // 중분류별 년도별 사업체 증감률
					var categories = [];
					
					// 중분류별, 년도별 사업체 데이터 (비율, 증감률)
					for(var i=0; i<techbizRatio.length; i++){
						var m_class_cd = techbizRatio[i].m_class_cd;
						var m_class_nm = techbizRatio[i].m_class_nm;
						if(p = $.pick(introData, {m_class_cd: m_class_cd})){
							var temp_per = { m_class_cd: m_class_cd, m_class_nm: m_class_nm };
							var temp_irds = { m_class_cd: m_class_cd, m_class_nm: m_class_nm };
							for(var k=base_year-4; k<=base_year; k++){
								if(r = $.pick(p, {base_year: k})){
									temp_per[k] = parseFloat(r.corp_per || 0);
									temp_irds[k] = parseFloat(r.corp_irdsrate || 0);
									if(i == 0) categories.push(k);
								}
							}
							techbizIncrease.push(temp_per);
							techbizIncreaseRatio.push(temp_irds);
						}
					}
					
					// 사업체 비율 (Pie)
					var pieData = [];
					var legend = '';
					
					var totalCorpCnt = 0;
					for (var i=0; i<techbizRatio.length; i++) {
						totalCorpCnt += parseFloat(techbizRatio[i].corp_cnt);
					}
					
					
					for(var i=0; i<techbizRatio.length; i++){
						//2018.01.11 [개발팀] 기술업종 색상 설정
						var cls = "";
						switch(parseInt(techbizRatio[i].m_class_cd)) {
							case 11: //첨단기술
								cls = "ico01";
								break;
							case 12: //고기술
								cls = "ico05";
								break;
							case 13: //중기술
								cls = "ico02";
								break;
							case 14: //저기술
								cls = "ico06";
								break;
							case 21: //창의 및 디지털
								cls = "ico03";
								break;
							case 22: //ICT
								cls = "ico04";
								break;
							case 23: //전문서비스
								cls = "ico07";
								break;
						}
						
						var corp_per = ((parseFloat(techbizRatio[i].corp_cnt)/totalCorpCnt)*100).toFixed(1);
						legend += '<li class="'+cls+'">'; //2018.01.11 [개발팀]
						legend += '	<div class="valuebox">';
						legend += '	<span class="tit">'+techbizRatio[i].m_class_nm+'</span>';
						legend += '	<div class="val">';
						legend += '		<p class="t01" style="margin-left:0px;">'+corp_per+'%</p>';
						legend += '		<p class="t02" style="margin-left:0px;">'+appendCommaToNumber(techbizRatio[i].corp_cnt)+'개</p>';
						legend += '	</div>';
						legend += '</li>';
						pieData.push([techbizRatio[i].m_class_nm, parseFloat(corp_per)]);
					}
					
					$(".iaChartLeft .typelabel").empty();
					$(".iaChartLeft .typelabel").append(legend);
					
					$('#iaChartBox01').highcharts({
						chart: {
							type: 'pie'
						},
						//colors: ['#f0356c', '#f7c701', '#1578cb', '#454a5e', '#f89337', '#b2cb17', '#5b3eb2'], title: { text: '' },
						colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], title: { text: '' }, //2018.01.11 [개발팀] 컬러수정
						exporting: { enabled: false },
						tooltip: { enabled: true },
						plotOptions: {
							pie: {
								allowPointSelect: false, cursor: 'pointer', depth: 35,
								borderWidth: 0,
								dataLabels: { enabled: false }
							}
						},
						series: [{
							type: 'pie',
							name: '전국 기술업종 사업체 비율',
							data: pieData
						}]
					});
					
					// 사업체 증감 (bar)
					var barSeries = [];
					for(var i=0; i<techbizIncrease.length; i++){
						var data = [];
						for(var k=0; k<categories.length; k++){
							data.push(parseFloat(techbizIncrease[i][categories[k]]));
						}
						barSeries.push({
							name: techbizIncrease[i].m_class_nm,
							data: data
						});
					}
					
					$('#iaChartBox02').highcharts({
						chart: {
							type: 'column', margin:[50,30,60,80]
						},
						colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
						tooltip: { enabled: true, shared: true },
						title: { text: '' },
						subtitle: { text: '' },
						exporting: { enabled: false },
						xAxis: {
							categories: categories,
							title: { text: '연도' }
						},
						yAxis: {
							min: 0, title: { text: '사업체증감'},
							labels: { overflow: 'justify' }
						}, 
						plotOptions: {
							series: {
								states: { }
							},
							bar: {
								dataLabels: { enabled: false }
							}
						},
						legend: { enabled: false },
						credits: {  enabled: false },
						series: barSeries
					});
					
					// 사업체 증감률 (line)
					var lineSeries = [];
					for(var i=0; i<techbizIncreaseRatio.length; i++){
						var data = [];
						for(var k=0; k<categories.length; k++){
							data.push(parseFloat(techbizIncreaseRatio[i][categories[k]]));
						}
						lineSeries.push({
							name: techbizIncreaseRatio[i].m_class_nm,
							data: data
						});
					}
					
					$('#iaChartBox03').highcharts({
						chart: {
							margin:[50,30,60,80]
						},
						colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
						tooltip: { enabled: true, shared: true },
						title: { text: '' },
						subtitle: { text: '' },
						exporting: { enabled: false },
						xAxis: {
							categories: categories,
							title: { text: '연도' }
						},
						yAxis: {
							min: 0, title: { text: '사업체증감률'},
							labels: { overflow: 'justify' }
						}, 
						plotOptions: {
							series: {
								states: { }
							},
							bar: {
								dataLabels: { enabled: false }
							}
						},
						legend: { enabled: false },
						credits: {  enabled: false },
						series: lineSeries
					});
				}
			}
		});
	}());
	
	/** ******** 기술업종 인트로 팝업창 차트 End ******** */
	
	
	/** ******** 기술업종 코드 조회 Start ******** */
	(function(){
		$class("sop.portal.getTechCd.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options){
				
				var techCdList = res.result.techCdList;
				
				$(".iatcTable tbody").empty();
				
//							"	<td>" + techCdList[i].s_class_cd + "</td>" +
				for(var i=0; i<techCdList.length; i++){
					$(".iatcTable tbody").append(
							"<tr>" +
							"	<td>" +  techCdList[i].s_class_nm + "</td>" +
							"	<td>" +  techCdList[i].class_exp + "</td>" +
							"</tr>"
					);
				}
				
			}
		});
	}());
	
	/** ******** 기술업종 코드 조회 End ******** */
	
	/** ********* OpenAPI 창업통계 Start ********* */
	(function() {
		$class("sop.openApi.pplsummary.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch(parseInt(res.errCd)) {
							case 0:
								$technicalBizMapApi.request.setStatsData(res, options);
								break;
							case -401:
								accessTokenInfo(function() {
									$technicalBizMapApi.request.openApiPplSummary(options.params);
								});
								break;
							default:
								map.clearData();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
					}
				});
	}());
	/** ********* OpenAPI 창업통계 End ********* */
	
	/** ********* 통계별최신년도정보 조회 시작 ********* */
	(function() {
		$class("sop.portal.statBaseYear.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var info = options.options.info;
						switch(parseInt(res.errCd)) {
							case 0:
								//사업체일 경우 
								if(options.api_id == "API_0301") {
									$technicalBizMapApi.request.openApiBizStats(info);
								} else {	//기타
									if(result.base_year != null) {
										info.param_info.paramInfo["year"] = result.base_year;
										$technicalBizMapApi.request.openApiBizStats(info);
									}else {
										$technicalBizMapApi.request.openApiBizStats(info);
									}
								}
								break;
							default:
								$technicalBizMapApi.request.openApiBizStats(info);
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 통계별최신년도정보 조회 종료 ********* */
	
	/** ********* 창업통계정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.bizStats.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var map = options.params.map;
						var params = options.params.param_info;
						switch(parseInt(res.errCd)) {
							case 0:
								res["pAdmCd"] = options.params.param_info.paramInfo.adm_cd;
								//N/A의 경우 0으로 치환
								for (var i=0; i<result.length; i++) {
									if (result[i][params.showData] == "N/A") {
										result[i][params.showData] = "0";
									}
								}
								
								$bizStatsMap.ui.data = res;			
								
								// 일반검색 버튼일 경우,
								map.setStatsData("normal", res, params.showData, params.unit);
								map.autoDownBoundary();
								if (params.mapInfo.zoomlevel == map.zoom) {
									map.openApiReverseGeoCode(params.mapInfo.center);
								}
								
								//API 로그
								apiLogWrite("B0", options);
								
								break;
							case -401:
								accessTokenInfo(function() {
									$technicalBizMapApi.request.openApiBizStats(options);
								});
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
					}
				});
	}());
	/** ********* 창업통계정보조회 종료 ********* */
	
	/** ********* 전국시도별 사업체수 시작 ********* */
	(function() {
		$class("sop.openApi.sggCompanyCnt.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var showData = "corp_cnt";
								var unit = "개"; 
								switch(parseInt(options.type)) {
									case 0:
										showData = "corp_cnt";
										unit = "개";
										break;
									case 1:
										showData = "corp_per";
										unit = "%";
										break;
									case 2:
										showData = "resid_ppltn_cnt";
										unit = "명";
										break;
									case 3:
										showData = "worker_cnt";
										unit = "명";
										break;
									case 4:
										showData = "avg_worker_cnt";
										unit = "명";
										break;
								};
								
								var result = res.result;
								var tmpData = [];
								var data = [];
								var sidoCdList = [];
								
								for (var i=0; i<result.length; i++) {
									tmpData.push(parseFloat(result[i][showData]));
									sidoCdList.push(result[i].sido_cd);
									result[i]["type"] = "sigungu";
									result[i]["showData"] = showData;
									result[i]["unit"] = unit;
									result[i]["techbiz_nm"] = options.themeNm;
								}
								data.push(tmpData);
								
								map.data = null;
								map.legend.valPerSlice = map.legend.calculateLegend(data);
								map.setStatsData("normal", res, showData, unit);
								
								if ($("#techLegend_bubble").hasClass("on")) {
									$technicalBizMap.ui.setChangeBubbleMode();
								}else {
									map.mapMode = "";
									$technicalBizMap.ui.setChangeColorMode();
								}
								data = null;
								tmpData = null;
								
								//공유등록
								map.shareInfo.setTechnicalBizShareInfo(options, "sigungu", map.id);
								
								if (options.callback != null && options.callback instanceof Function) {
									options.callback.call(undefined, res);
								}
								
								//API 로그
								//apiLogWrite("B0", options);
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 전국 시도별 사업체수 종료 ********* */

	/** ********* 업종별 사업체 밀집도 새로 Test ********* */
	(function() {
		$class("sop.openApi.poiCompanyDensity.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if ($technicalBizLeftMenu.ui.curSelectedStatsType != "density") {
							//2018.01.18 [개발팀]
							var map = options.map;
							if (map.heatMap) {
								map.heatMap.setUTMKs([]);
							}
							return;
						}
						
						switch(parseInt(res.errCd)) {
							case 0:
								var map = options.map;
								if (map.heatMap) {
									map.heatMap.setUTMKs([]);
								}
								
								map.legend.setLegendParams("heat", map.legend.legendColor, map.legend.lv);
								
								if ($technicalBizMap.ui.heatMapList[options.map.id] == null) {
									$technicalBizMap.ui.heatMapList[options.map.id] = {
											type : "heatMap",
											data : [],
											theme_cd : options.params.theme_cd,
											year : options.params.year,
											data_type : options.type,
											adm_cd : options.params.adm_cd
									};
								}else{
									$technicalBizMap.ui.heatMapList[options.map.id]["data"]=[];
									$technicalBizMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
									$technicalBizMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
								}
								
								var companyList = res.result;
								//heatMap 생성
								var tmpData = [];
								for (var i=0; i<companyList.length; i++) {
									tmpData.push(companyList[i].cnt);
								}
								var max = null;
								
								//타입별 열지도 표출
								//1:전국시도, 2:시군구, 3:읍면동, 4:성남시(지자체)
								//1,2일 경우, 가중치 열지도(집계), 3일경우, 기본 열지도(POI)
								switch(parseInt(options.type)) {
									case 1:
									case 2:
									case 4:
										max = Math.max.apply(null, tmpData);
										map.zoomLevelHeat = false;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur, max);
										$technicalBizMap.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$technicalBizMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, companyList[i].cnt);
										}
										break;
									case 3:
										map.zoomLevelHeat = true;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur,1);
										$technicalBizMap.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$technicalBizMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, 1);
										}
										break;
								}
								
								//공유등록
								map.shareInfo.setTechnicalBizShareInfo(options, "density", map.id);
								
								break;
							default:
								if ($technicalBizMap.ui.heatMapList[options.map.id] != null) {
									$technicalBizMap.ui.heatMapList[options.map.id]["data"]=[];
									$technicalBizMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
									$technicalBizMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
								}
								break;
						}
						
						if (options.callback != null && options.callback instanceof Function) {
							options.callback.call(undefined, res);
						}
						
						$technicalBizMap.Popup.close(); //2018.01.18 [개발팀]
					},
					onFail : function(status, options) {
						if ($technicalBizMap.ui.heatMapList[options.map.id] != null) {
							$technicalBizMap.ui.heatMapList[options.map.id]["data"]=[];
							$technicalBizMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
							$technicalBizMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
						}
						$technicalBizMap.Popup.close(); //2018.01.18 [개발팀]
					}
				});
	}());
	/** ********* 업종별 사업체 밀집도 종료 ********* */
	
	/** ********* 기술업종통계지도 시도기술업종정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.techSidoCompanyInfo.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								//pie차트 크기설정을 위한 범례계산
								var corpData = [];
								var tmpCorpData = [];
								for (var i=0;i <result.length; i++) {
									tmpCorpData.push(parseInt(result[i].techbiz_corp_total_cnt));
								}
								corpData.push(tmpCorpData);
								map.legend.calculateLegend(corpData);
								tmpCorpData = null;
								
								//파이차트 마커 초기화
								if ($technicalBizMap.ui.sidoPieChartMarkers == null) {
									$technicalBizMap.ui.sidoPieChartMarkers = [];
								}else {
									for (var i=0; i<$technicalBizMap.ui.sidoPieChartMarkers.length; i++) {
										$technicalBizMap.ui.sidoPieChartMarkers[i].remove();
									}
								}
								
								//범례기준크기 설정
								var pieChartWidth = [60, 70, 80, 90, 98, 106, 114];
								/*var colorList = {
										"11" : "#ef356b",	//첨단기술
										"12" : "#f79339",	//고기술
										"13" : "#f7cb00",	//중기술
										"14" : "#b2cc19",	//저기술
										"21" : "#1778cc",	//창의 및 디지털				
										"22" : "#5b3fb2",	//ICT
										"23" : "#000000"	//전문서비스
								};*/
								var colorList = {
										"11" : "#ef356b",	//첨단기술
										"12" : "#f79339",	//고기술
										"13" : "#f7cb00",	//중기술
										"14" : "#b2cc19",	//저기술
										"21" : "#00AAFF",	//창의 및 디지털				
										"22" : "#0000FF",	//ICT
										"23" : "#9900FF"	//전문서비스
								};
								
								var type = "sido";
								
								//파이차트마커 생성
								if (map.geojson) {
									map.geojson.eachLayer(function(layer) {
										var tmpData = [];
										for (var i=0; i<result.length; i++) {
											var tmpResult = result[i];
											if (tmpResult.sido_cd == layer.feature.properties.adm_cd) {
												var x_coord = layer.feature.properties.x;
												var y_coord = layer.feature.properties.y;
												var adm_cd = layer.feature.properties.adm_cd;
												var adm_nm = layer.feature.properties.adm_nm;
												var calcInfo = map.legend.getColor(parseFloat(tmpResult.techbiz_corp_total_cnt), map.legend.valPerSlice[0]);
												var width = pieChartWidth[calcInfo[1]];
												var margin = -(width/2) + "px";
												var html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"'></div>";
												    html += "</div>";

												var icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
												var marker = sop.marker([ x_coord, y_coord ], {
													icon : icon
												});
												marker.addTo(map.gMap);
												
												
												
												var tooltipMsg = "<div class='techSidoTooltipBox'>";
													tooltipMsg += 	"<div class='tech_topbar'>"+adm_nm+" 비율</div>";
													tooltipMsg += 	"<div class='tech_popContents'>";
													tooltipMsg += 		"<div class='tech_typelabel'>";
													tooltipMsg +=   		"<p class='tech_txtSubj'>총사업체 수 : "+appendCommaToNumber(tmpResult.techbiz_corp_total_cnt)+"개</p>";	
												
												for (var k=0; k<tmpResult.techbiz_list.length; k++) {
													var data = tmpResult.techbiz_list[k];
													var cls, techNm;
													switch(parseInt(data.techbiz_cd)) {
														case 11:	//첨단기술
															cls = "ico01";
															techNm = "첨단기술";
															break;
														case 12:	//고기술
															cls = "ico05";
															techNm = "고기술";
															break;	
														case 13:	//중기술
															cls = "ico02";
															techNm = "중기술";
															break;
														case 14:	//저기술
															cls = "ico06";
															techNm = "저기술";
															break;
														case 21:	//창의 및 디지털
															cls = "ico03";
															techNm = "창의및<br>디지털";
															break;
														case 22:	//ICT
															/*cls = "ico07";*/
															cls = "ico04";
															techNm = "ICT";
															break;
														case 23:	//전문서비스
															/*cls = "ico04";*/
															cls = "ico07";
															techNm = "전문<br>서비스";
															break;
														}
													
													if (k%2==0) {
														tooltipMsg += "<div class='tech_valuebox'>";
													}
													tooltipMsg += 	"<span class='tech_tit "+cls+"'>"+techNm+"</span>";
													tooltipMsg +=	"<div class='tech_val'>";
													tooltipMsg +=  		"<p class='t01'>"+data.techbiz_corp_per+"%</p>";
													tooltipMsg += 		"<p class='t02'>"+appendCommaToNumber(data.techbiz_corp_cnt)+"개</p>";
													tooltipMsg +=	"</div>";
													
													
													if (k != 0 && k%2!=0) {
														tooltipMsg += "</div>";
													}
													
													if (k == 3) {
														tooltipMsg += "<hr style='color:#888;'/>";
													}
												}
												
												tooltipMsg += 	"</div>";
												tooltipMsg +=		"<div class='tech_btnBox'>";
												tooltipMsg +=			"<a href='javascript:$technicalBizMap.ui.doUpdateDataboard(\""+adm_cd+"\", \""+adm_nm+"\", \""+type+"\");' class='tech_btnGtype t01' style='color:#5b5b5b;'>지역통계 데이터보기</a>";
												tooltipMsg +=		"</div>";
												tooltipMsg +=	"</div>";
												tooltipMsg += "</div>";
												marker.bindInfoWindow(tooltipMsg);
												
												//파이차트 데이터 생성
												for (var k=0; k<tmpResult.techbiz_list.length; k++) {
													var data = tmpResult.techbiz_list[k];
													tmpData.push({
														name : data.techbiz_nm,
														y : parseFloat(data.techbiz_corp_per),
														color : colorList[data.techbiz_cd]
													});
												}
												
												$technicalBizMap.ui.sidoPieChartMarkers.push(marker);
												
												
												//파이차트 생성
												$("#pieChart_"+adm_cd).highcharts({
										            chart: {
										                type: 'pie',
										                width : width,
										                height : width,
										                backgroundColor:'rgba(255, 255, 255, 0)',
										                margin : [-3, 0, 0, 0],
										                //2017.10.17 [개발팀] 라이브러리 버전업그레이드로 인한 이벤트 오동작 오류 수정
										                /*events: {
										                    click: function(event) {
										                        marker.openInfoWindow();
										                    }
										                }*/
										            },
										            exporting: { enabled: false },
										            title: {
										                text: ''
										            },
										            tooltip: {
										                 pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
										            },
										            plotOptions: {
										            	series: {
										                    dataLabels: {
										                        enabled: false,
										                        format: '{point.name}: {point.y:.1f}%'
										                    },
										                    enableMouseTracking: false
										                },
										                pie : {
										                	shadow : false,
										                	borderWidth: 0
										                }
										            },
										            series: [{
										                name: 'Brands',
										                colorByPoint: true,
										                data: tmpData
										            }]
										        });	
												
												
												if(adm_cd == "37"){
													html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"독도"+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"'></div>";
												    html += "</div>";
												    
												    icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
													var marker2 = sop.marker([ x_coord+290000, y_coord+90000], {
														icon : icon2
													});
													marker2.addTo(map.gMap);
													$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
											//		$technicalBizMap.ui.sidoPieChartMarkers.push(marker);
													html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"울릉도"+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"'></div>";
												    html += "</div>";

												    
												    
												    icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
													marker2 = sop.marker([ x_coord+200000, y_coord+120000 ], {
														icon : icon2
													});
													marker2.addTo(map.gMap);
													$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
												//	$technicalBizMap.ui.sidoPieChartMarkers.push(marker);
												}
												
												break;
											} 
										}
									});
									//공유등록
									map.shareInfo.setTechnicalBizShareInfo(options, "sido", map.id);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$technicalBizMapApi.request.openApiTechSidoCompanyInfo(options.map);
								});
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 기술업종통계지도 시도기술업종정보조회 종료 ********* */
	
	//2017.09.04 개발팀 추가
	/** ********* 기술업종통계지도 시도기술업종정보 종사자 조회 시작 ********* */
	(function() {
		$class("sop.openApi.techSidoWorkerInfo.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								//pie차트 크기설정을 위한 범례계산
								var workerData = [];
								var tmpWorkerData = [];
								for (var i=0;i <result.length; i++) {
									tmpWorkerData.push(parseInt(result[i].techbiz_worker_total_cnt));
								}
								workerData.push(tmpWorkerData);
								map.legend.calculateLegend(workerData);
								tmpCorpData = null;
								
								//파이차트 마커 초기화
								if ($technicalBizMap.ui.sidoPieChartMarkers == null) {
									$technicalBizMap.ui.sidoPieChartMarkers = [];
								}else {
									for (var i=0; i<$technicalBizMap.ui.sidoPieChartMarkers.length; i++) {
										$technicalBizMap.ui.sidoPieChartMarkers[i].remove();
									}
								}
								
								//범례기준크기 설정
								var pieChartWidth = [60, 70, 80, 90, 98, 106, 114];
								/*var colorList = {
										"11" : "#ef356b",	//첨단기술
										"12" : "#f79339",	//고기술
										"13" : "#f7cb00",	//중기술
										"14" : "#b2cc19",	//저기술
										"21" : "#1778cc",	//창의 및 디지털				
										"22" : "#5b3fb2",	//ICT
										"23" : "#000000"	//전문서비스
								};*/
								
								/*var colorList = {
										"11" : "#FF0000",	//첨단기술
										"12" : "#FF9900",	//고기술
										"13" : "#FFFF00",	//중기술
										"14" : "#00FF00",	//저기술
										"21" : "#00AAFF",	//창의 및 디지털				
										"22" : "#0000FF",	//ICT
										"23" : "#9900FF"	//전문서비스
								};*/
								
								var colorList = {
										"11" : "#ef356b",	//첨단기술
										"12" : "#f79339",	//고기술
										"13" : "#f7cb00",	//중기술
										"14" : "#b2cc19",	//저기술
										"21" : "#00b0f0",	//창의 및 디지털			
										"22" : "#0000FF",	//ICT
										"23" : "#9900FF"	//전문서비스
								};
								
								
								var type = "sido";
								
								//파이차트마커 생성
								if (map.geojson) {
									map.geojson.eachLayer(function(layer) {
										var tmpData = [];
										for (var i=0; i<result.length; i++) {
											var tmpResult = result[i];
											if (tmpResult.sido_cd == layer.feature.properties.adm_cd) {
												var x_coord = layer.feature.properties.x;
												var y_coord = layer.feature.properties.y;
												var adm_cd = layer.feature.properties.adm_cd;
												var adm_nm = layer.feature.properties.adm_nm;
												var calcInfo = map.legend.getColor(parseFloat(tmpResult.techbiz_worker_total_cnt), map.legend.valPerSlice[0]);
												var width = pieChartWidth[calcInfo[1]];
												var margin = -(width/2) + "px";
												var html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"'></div>";
												    html += "</div>";

												var icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
												var marker = sop.marker([ x_coord, y_coord ], {
													icon : icon
												});
												marker.addTo(map.gMap);
												
												
												
												var tooltipMsg = "<div class='techSidoTooltipBox'>";
													tooltipMsg += 	"<div class='tech_topbar'>"+adm_nm+" 비율</div>";
													tooltipMsg += 	"<div class='tech_popContents'>";
													tooltipMsg += 		"<div class='tech_typelabel'>";
													tooltipMsg +=   		"<p class='tech_txtSubj'>총종사자 수 : "+appendCommaToNumber(tmpResult.techbiz_worker_total_cnt)+"명</p>";	
												
												for (var k=0; k<tmpResult.techbiz_list.length; k++) {
													var data = tmpResult.techbiz_list[k];
													var cls, techNm;
													switch(parseInt(data.techbiz_cd)) {
														case 11:	//첨단기술
															cls = "ico01";
															techNm = "첨단기술";
															break;
														case 12:	//고기술
															cls = "ico05";
															techNm = "고기술";
															break;	
														case 13:	//중기술
															cls = "ico02";
															techNm = "중기술";
															break;
														case 14:	//저기술
															cls = "ico06";
															techNm = "저기술";
															break;
														case 21:	//창의 및 디지털
															cls = "ico03";
															techNm = "창의및<br>디지털";
															break;
														case 22:	//ICT
															/*cls = "ico07";*/
															cls = "ico04";
															techNm = "ICT";
															break;
														case 23:	//전문서비스
															/*cls = "ico04";*/
															cls = "ico07";
															techNm = "전문<br>서비스";
															break;
														}
													
													if (k%2==0) {
														tooltipMsg += "<div class='tech_valuebox'>";
													}
													tooltipMsg += 	"<span class='tech_tit "+cls+"'>"+techNm+"</span>";
													tooltipMsg +=	"<div class='tech_val'>";
													tooltipMsg +=  		"<p class='t01'>"+data.techbiz_worker_per+"%</p>";
													tooltipMsg += 		"<p class='t02'>"+appendCommaToNumber(data.techbiz_worker_cnt)+"명</p>";
													tooltipMsg +=	"</div>";
													
													
													if (k != 0 && k%2!=0) {
														tooltipMsg += "</div>";
													}
													
													if (k == 3) {
														tooltipMsg += "<hr style='color:#888;'/>";
													}
												}
												
												
												
												

												
												

												tooltipMsg += 	"</div>";
												tooltipMsg +=		"<div class='tech_btnBox'>";
												tooltipMsg +=			"<a href='javascript:$technicalBizMap.ui.doUpdateDataboard(\""+adm_cd+"\", \""+adm_nm+"\", \""+type+"\");' class='tech_btnGtype t01' style='color:#5b5b5b;'>지역통계 데이터보기</a>";
												tooltipMsg +=		"</div>";
												tooltipMsg +=	"</div>";
												tooltipMsg += "</div>";
												marker.bindInfoWindow(tooltipMsg);
												
												//파이차트 데이터 생성
												for (var k=0; k<tmpResult.techbiz_list.length; k++) {
													var data = tmpResult.techbiz_list[k];
													tmpData.push({
														name : data.techbiz_nm,
														y : parseFloat(data.techbiz_worker_per),
														color : colorList[data.techbiz_cd]
													});
												}
												
												$technicalBizMap.ui.sidoPieChartMarkers.push(marker);
												
												
												//파이차트 생성
												$("#pieChart_"+adm_cd).highcharts({
										            chart: {
										                type: 'pie',
										                width : width,
										                height : width,
										                backgroundColor:'rgba(255, 255, 255, 0)',
										                margin : [-3, 0, 0, 0],
										                //2017.10.17 [개발팀] 라이브러리 버전업그레이드로 인한 이벤트 오동작 오류 수정
										                /*events: {
										                    click: function(event) {
										                        marker.openInfoWindow();
										                    }
										                }*/
										            },
										            exporting: { enabled: false },
										            title: {
										                text: ''
										            },
										            tooltip: {
										                 pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
										            },
										            plotOptions: {
										            	series: {
										                    dataLabels: {
										                        enabled: false,
										                        format: '{point.name}: {point.y:.1f}%'
										                    },
										                    enableMouseTracking: false
										                },
										                pie : {
										                	shadow : false,
										                	borderWidth: 0
										                }
										            },
										            series: [{
										                name: 'Brands',
										                colorByPoint: true,
										                data: tmpData
										            }]
										        });	
												
												
												if(adm_cd == "37"){
													html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"독도"+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"'></div>";
												    html += "</div>";
												    
												    icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
													var marker2 = sop.marker([ x_coord+290000, y_coord+90000], {
														icon : icon2
													});
													marker2.addTo(map.gMap);
													$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
											//		$technicalBizMap.ui.sidoPieChartMarkers.push(marker);
													html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"울릉도"+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"'></div>";
												    html += "</div>";

												    
												    
												    icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
													marker2 = sop.marker([ x_coord+200000, y_coord+120000 ], {
														icon : icon2
													});
													marker2.addTo(map.gMap);
													$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
												//	$technicalBizMap.ui.sidoPieChartMarkers.push(marker);
												}
												
												
												
												
												
												
												
												break;
											} 
										}
									});
									//공유등록
									map.shareInfo.setTechnicalBizShareInfo(options, "sido", map.id);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$technicalBizMapApi.request.openApiTechSidoWorkerInfo(options.map);
								});
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 기술업종통계지도 시도기술업종정보조회 종료 ********* */
	//2017.09.04 개발팀 추가 종료
	
	/** ********* 전국시군구별 전체 기술업종수조회 시작 ********* */
	(function() {
		$class("sop.openApi.sggAllCompanyCnt.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result;
								var tmpData = [];
								var data = [];
								var sidoCdList = [];
								for (var i=0; i<result.length; i++) {
									tmpData.push(parseFloat(result[i].techbiz_corp_cnt));
									sidoCdList.push(result[i].sido_cd);
									result[i]["techbiz_nm"] = "기술업종수";
								}
								data.push(tmpData);
								map.data = null;
								map.legend.valPerSlice = map.legend.calculateLegend(data);
								map.setStatsData("normal", res, "techbiz_corp_cnt", "개");
								
								if ($("#techLegend_bubble").hasClass("on")) {
									$technicalBizMap.ui.setChangeBubbleMode();
								}else {
									map.mapMode = "";
									$technicalBizMap.ui.setChangeColorMode();
								}
								data = null;
								tmpData = null;
								
								//공유등록
								options["params"] = {
										theme_nm : options.themeNm,
										year : options.year
								};
								map.shareInfo.setTechnicalBizShareInfo(options, "sigungu", map.id);
								
								if (options.callback != null && options.callback instanceof Function) {
									options.callback.call(undefined, res);
								}
								
								//API 로그
								//apiLogWrite("B0", options);
								break;
							case -401:
								accessTokenInfo(function() {
									$technicalBizMapApi.request.openApiSggCompanyCnt(options.themeCd, options.themeNm, options.map, options.callback);
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 전국시군구별 전체 기술업종수조회 종료 ********* */
	
	//2017.10.16 개발팀 추가
	/** ********* 전국시군구별 전체 입지계수 시작 ********* */
	(function() {
		$class("sop.portal.getAllLq.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var featureData = res.result.featureData;
								if (featureData.length > 0) {
									var data = [];
									var tmpData = [];
									var sidoCdList = [];
									var showData ="";
									var statsData = new Array();
									var unit = "LQ";
									
									for(var i =0; i < featureData.length; i++){
										sidoCdList.push(featureData[i].sido_cd);
										featureData[i].adm_cd = featureData[i].sido_cd;
										featureData[i].adm_nm = featureData[i].sido_nm;
										if(options.standard == "company"){
											if(options.base_region == "country"){
												tmpData.push(featureData[i].country_vs_corp_lq);
												showData = "country_vs_corp_lq";
											}else{
												tmpData.push(featureData[i].sido_vs_corp_lq);
												showData = "sido_vs_corp_lq";
											}
										}else{
											if(options.base_region == "country"){
												tmpData.push(featureData[i].country_vs_worker_lq);
												showData = "country_vs_worker_lq";
											}else{
												tmpData.push(featureData[i].sido_vs_worker_lq);
												showData = "sido_vs_worker_lq";
											}
										}
										
										featureData[i][showData] = Number(featureData[i][showData]);
										featureData[i].unit = unit;
										featureData[i].showData = showData;
										featureData[i].type = "lq";
									}
									data.push(tmpData);
									map.data = null;
									
									map.legend.valPerSlice = map.legend.calculateLegend(data);
									res.result = featureData;
									res.pAdmCd = "00";
									map.setStatsData("normal",res,showData,unit);
									
									$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["data"] = res.result;
									
									//업종별 입지계수 > 고기술업종
									if(featureData[0].techbiz_m_class_cd_nm == undefined){
										$(".helperText").text("업종별 입지계수 > " + featureData[0].techbiz_s_class_cd_nm+"업종");
									}else{
										$(".helperText").text("업종별 입지계수 > " + featureData[0].techbiz_m_class_cd_nm+"업종");
									}
									if (options.callback != null && options.callback instanceof Function) {
										options.callback.call(undefined, res, options);
									}
								}
								
								break;
							case -401:
								accessTokenInfo(function() {
									
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	
	
	/** ********* 전국시군구별 전체 입지계수 시작 ********* */
	(function() {
		$class("sop.portal.getSggLq.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var featureData = res.result.featureData;
								var data = [];
								var tmpData = [];
								var sidoCdList = [];
								var showData ="";
								var statsData = new Array();
								var unit = "LQ";
								var standard = options.standard;
								
								if (featureData.length > 0) {
									for(var i =0; i < featureData.length; i++){
										sidoCdList.push(featureData[i].sido_cd);
										/*featureData[i].adm_cd = featureData[i].sido_cd;
										featureData[i].adm_nm = featureData[i].sido_nm;*/
										if(featureData[i].adm_cd.length =="5"){
											featureData[i].adm_nm = featureData[i].sgg_nm;
										}else{
											featureData[i].adm_nm = featureData[i].emdong_nm;
										}
										
										if(standard == "company"){
											if(options.base_region == "country"){
												tmpData.push(featureData[i].country_vs_corp_lq);
												showData = "country_vs_corp_lq";
											}else{
												tmpData.push(featureData[i].sido_vs_corp_lq);
												showData = "sido_vs_corp_lq";
											}
										}else{
											if(options.base_region == "country"){
												tmpData.push(featureData[i].country_vs_worker_lq);
												showData = "country_vs_worker_lq";
											}else{
												tmpData.push(featureData[i].sido_vs_worker_lq);
												showData = "sido_vs_worker_lq";
											}
										}
										
										featureData[i][showData] = Number(featureData[i][showData]);
										featureData[i].unit = unit;
										featureData[i].showData = showData;
										featureData[i].type = "lq";
									}
									data.push(tmpData);
									map.data = null;
									
									map.legend.valPerSlice = map.legend.calculateLegend(data);
									res.result = featureData;
									if(res.result[0].adm_cd.length =="5"){
										res.pAdmCd = res.result[0].adm_cd.substring(0,2);
									}else{
										res.pAdmCd = res.result[0].adm_cd.substring(0,5);
									}
									
									map.setStatsData("normal",res,showData,unit);
									
									if (options.callback != null && options.callback instanceof Function) {
										options.callback.call(undefined, res);
									}
									
									var dataBoardOption = {
											featureData : featureData,
											standard : options.standard,
											adm_cd : res.result[0].adm_cd, 
											year : options.year,
											selectThemeCd : options.themeCd,
											base_region : options.base_region,
											params : {
												map : map
											}
									}
									//업종별 입지계수 > 고기술업종
									if(featureData[0].techbiz_m_class_cd_nm == undefined){
										$(".helperText").text("업종별 입지계수 > " + featureData[0].techbiz_s_class_cd_nm+"업종");
									}else{
										$(".helperText").text("업종별 입지계수 > " + featureData[0].techbiz_m_class_cd_nm+"업종");
									}
									
									
									$technicalBizDataBoard.ui.updateDataBoard(dataBoardOption,"lq");
								}
								break;
							case -401:
								accessTokenInfo(function() {
									
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	
	/** ********* 전국시군구별 전체 기술업종수조회 종료 ********* */
	//2017.10.16 개발팀 추가 종료
	
	//2017.10.27 개발팀 추가
	/** ********* 전국시군구별 전체 입지계수 검색시작 ********* */
	(function() {
		$class("sop.portal.getSearchLq.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								
								var featureData = res.result.featureData;
								var map = options.map;
								var selectTechCd = options.techbiz_class_cd;
								var selectTab = options.selectInfoType;
								var selectedDataArray = new Array();
								var tmpData = new Array();
								if(selectTechCd == "00"){
									//adm_cd 로 묶어야
									var tempArray = new Array();
									tempArray.push(featureData[0]);
									for(var i =1; i < featureData.length; i++){
										if(tempArray[tempArray.length-1].adm_cd == featureData[i].adm_cd){
											tempArray.push(featureData[i]);
										}else{
											var corp_lq = new Array();
											var work_lq = new Array();
											var corp_irds = new Array();
											var worker_irds = new Array();
											var techBizArray = new Array();
											
											for(var j = 0; j < tempArray.length; j++){
												corp_lq.push(tempArray[j].country_vs_corp_lq);
												work_lq.push(tempArray[j].country_vs_worker_lq);
												corp_irds.push(tempArray[j].corp_irdsrate);
												worker_irds.push(tempArray[j].worker_irdsrate);
												techBizArray.push(tempArray[j].techbiz_m_class_cd);
											}
											
											var obj = {
													country_vs_corp_lq : corp_lq,
													country_vs_worker_lq : work_lq,
													corp_irds : corp_irds,
													worker_irds : worker_irds,
													techBiz : techBizArray,
													count : tempArray.length,
													sgg_cd : tempArray[0].sgg_cd,
													sido_cd : tempArray[0].sido_cd,
													adm_cd : tempArray[0].adm_cd,
													sido_nm : tempArray[0].sido_nm,
													sgg_nm : tempArray[0].sgg_nm,
													pAdmCd : tempArray[0].adm_cd,
													bizfac_cnt : tempArray[0].bizfac_cnt,
													induscom_cnt : tempArray[0].induscom_cnt,
													showData : "count",
													unit : "개"
											}
											
											var insertBoolean = true;
											if(options.is_contain_bizfac == true){
												if(obj.bizfac_cnt == 0 || obj.bizfac_cnt == undefined){
													insertBoolean = false;
												}
											}
											if(options.is_contain_induscom == true){
												if(obj.induscom_cnt == 0 || obj.induscom_cnt == undefined){
													insertBoolean = false;
												}
											}
											
											if(insertBoolean == true){
												tmpData.push(tempArray.length);
												selectedDataArray.push(obj);
											}
											
											tempArray = new Array();
											tempArray.push(featureData[i]);
										}
									}
									
									//lastArray 처리
									var corp_lq = new Array();
									var work_lq = new Array();
									var corp_irds = new Array();
									var worker_irds = new Array();
									var techBizArray = new Array();
									
									for(var j = 0; j < tempArray.length; j++){
										corp_lq.push(tempArray[j].country_vs_corp_lq);
										work_lq.push(tempArray[j].country_vs_worker_lq);
										corp_irds.push(tempArray[j].corp_irdsrate);
										worker_irds.push(tempArray[j].worker_irdsrate);
										techBizArray.push(tempArray[j].techbiz_m_class_cd);
									}
									
									var obj = {
											country_vs_corp_lq : corp_lq,
											country_vs_worker_lq : work_lq,
											corp_irds : corp_irds,
											worker_irds : worker_irds,
											techBiz : techBizArray,
											count : tempArray.length,
											sgg_cd : tempArray[0].sgg_cd,
											sido_cd : tempArray[0].sido_cd,
											adm_cd : tempArray[0].adm_cd,
											sido_nm : tempArray[0].sido_nm,
											sgg_nm : tempArray[0].sgg_nm,
											pAdmCd : tempArray[0].adm_cd,
											bizfac_cnt : tempArray[0].bizfac_cnt,
											induscom_cnt : tempArray[0].induscom_cnt,
											showData : "count",
											unit : "개"
									}
									
									var insertBoolean = true;
									if(options.is_contain_bizfac == true){
										if(obj.bizfac_cnt == 0 || obj.bizfac_cnt == undefined){
											insertBoolean = false;
										}
									}
									if(options.is_contain_induscom == true){
										if(obj.induscom_cnt == 0 || obj.induscom_cnt == undefined){
											insertBoolean = false;
										}
									}
									
									if(insertBoolean == true){
										tmpData.push(tempArray.length);
										selectedDataArray.push(obj);
									}
									//lastArray처리
									
									
								}else{
									for(var i = 0; i < featureData.length; i ++){
											var insertBoolean = true;
											/*if(options.option1 == true){
												var bottomVal = options.param.from_corp_lq;
												var topVal = options.param.to_corp_lq;
												
												if(featureData[i].country_vs_corp_lq <= bottomVal &&  featureData[i].country_vs_corp_lq >=topVal){
													insertBoolean = false;
												}
												
											}
											
											if(options.option2 == true){
												var bottomVal = options.param.from_worker_lq;
												var topVal = options.param.to_worker_lq;
												
												if(featureData[i].country_vs_worker_lq <= bottomVal &&  featureData[i].country_vs_worker_lq >=topVal){
													insertBoolean = false;
												}
											}*/
											
											if(options.is_contain_bizfac == true){
												if(featureData[i].bizfac_cnt == 0 || featureData[i].bizfac_cnt == undefined){
													insertBoolean = false;
												}
											}
											if(options.is_contain_induscom == true){
												if(featureData[i].induscom_cnt == 0 || featureData[i].induscom_cnt == undefined){
													insertBoolean = false;
												}
											}
											
											if(insertBoolean == true){
												var obj = {
														country_vs_corp_lq : [featureData[i].country_vs_corp_lq],
														country_vs_worker_lq : [featureData[i].country_vs_worker_lq],
														corp_irds : [featureData[i].corp_irdsrate],
														worker_irds : [featureData[i].worker_irdsrate],
														techBiz : [selectTechCd],
														count : 1,
														sgg_cd : featureData[i].sgg_cd,
														sido_cd : featureData[i].sido_cd,
														adm_cd : featureData[i].adm_cd,
														sido_nm : featureData[i].sido_nm,
														sgg_nm : featureData[i].sgg_nm,
														pAdmCd : featureData[i].adm_cd,
														bizfac_cnt : featureData[i].bizfac_cnt,
														induscom_cnt : featureData[i].induscom_cnt,
														showData : "count",
														unit : "개"
												}
												tmpData.push(1);
												selectedDataArray.push(obj);
											}
									}
								}
								
								if(selectedDataArray.length != 0){
									var data = new Array();
									data.push(tmpData);
									
									map.data = null;
									map.legend.valPerSlice = map.legend.calculateLegend(data);
									res.result = selectedDataArray;
									res.pAdmCd = res.result[0].adm_cd;
									map.setStatsData("normal",res,"count","개");
									if ($("#techLegend_bubble").hasClass("on")) {
										$technicalBizMap.ui.setChangeBubbleMode();
									}else {
										map.mapMode = "";
										$technicalBizMap.ui.setChangeColorMode();
									}
									
									//필요 파라미터
									//업종선택 여부 
									//사업체입지계수 선택여부
									//종사자입지계수 선택여부
									//창업 지원시설 선택여부
									//산업단지 선택여부
									
									var dataBoardOption = {
											dataArray : selectedDataArray,
											standardOption : options,
											params : {
												map : map,
											}
									}
									$technicalBizDataBoard.ui.updateDataBoard(dataBoardOption,"search");
								}
								
								break;
							case -401:
								accessTokenInfo(function() {
									
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	
	/** ********* 전국시군구별 전체 기술업종검색 종료 ********* */
	//2017.10.27 개발팀 추가종료
	
	/** ********* 전국 지원시설 POI 조회 시작 ********* */
	(function() {
		$class("sop.openApi.totalSupplyFacilityPoi.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if ($technicalBizLeftMenu.ui.curSelectedStatsType != "supply") {
							return;
						}
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								
								$technicalBizMap.ui.doSupplyMarkerClear();
								$technicalBizMap.ui.doIndustryMarkerClear();
								
								var result = res.result;
								var tmpMarkerGroup1 = sop.featureGroup();
								var tmpMarkerGroup2 = sop.featureGroup();
								var tmpMarkerGroup3 = sop.featureGroup();
								var tmpMarkerGroup4 = sop.featureGroup();
								map.gMap.addLayer(tmpMarkerGroup1);
								map.gMap.addLayer(tmpMarkerGroup2);
								map.gMap.addLayer(tmpMarkerGroup3);
								map.gMap.addLayer(tmpMarkerGroup4);
									
								var result = result.sort(function (a, b) { return parseInt(a.lct_type) - parseInt(b.lct_type); });
								
								for (var i=0; i<result.length; i++) {
									var iconUrl = "";
									switch(parseInt(result[i].lct_type)) {
										case 1:
											iconUrl = "/img/tech/ico_supply_marker01.png";
											break;
										case 2:
											iconUrl = "/img/tech/ico_supply_marker02.png";
											break;
										case 3:
											iconUrl = "/img/tech/ico_supply_marker03.png";
											break;
										case 4:
											iconUrl = "/img/tech/ico_supply_marker04.png";
											break;
									}

									var markerIcon = sop.icon({
										iconUrl: iconUrl,
										shadowUrl: "/img/marker/theme_shadow.png",
										iconAnchor: [24.5, 64 ],
										iconSize: [ 49, 64 ],
										infoWindowAnchor: [-90, -66]
									});
									
									result[i].x_coor = parseFloat(result[i].x_coor).toFixed(2);
									result[i].y_coor = parseFloat(result[i].y_coor).toFixed(2);
									var marker = sop.marker([ result[i].x_coor, result[i].y_coor ], {
										icon: markerIcon
									});
									
									marker.info = result[i];
									
									switch(parseInt(result[i].lct_type)) {
										case 1:
											tmpMarkerGroup1.addLayer(marker);
											break;
										case 2:
											tmpMarkerGroup2.addLayer(marker);
											break;
										case 3:
											tmpMarkerGroup3.addLayer(marker);
											break;
										case 4:
											tmpMarkerGroup4.addLayer(marker);
											break;
									}
									
									var tel_num = "";
									if (!sop.Util.isUndefined(result[i].tel_no)) {
										tel_num = result[i].tel_no;
									}

									var html ="";
									html += "<div style='width:480px;'>";
									html += 	"<div class='cont'>"; 
									html +=			"<p class='dabSubj'>"+result[i].inst_nm+"</p>";
									html += 		"<div class='mDetailArea'>";
									html +=				"<div class='img'><img src='/img/tech/bg_dab01.png' /></div>";
									html +=				"<div class='mCont' style='width:350px;'>"; 
									html +=					"<table class='mContTable t01'>"; 
									html +=						"<colgroup>";
									html +=							"<col width='100' />";
									html +=						"</colgroup>";
									html +=						"<tr>";
									html +=							"<th>입지유형</th>";
									html +=							"<td>"+result[i].lct_type_nm+"</td>"; 
									html +=						"</tr>";
									html +=						"<tr>";
									html +=							"<th>소재지</th>";
									html +=							"<td>"+result[i].addr+"</td>";
									html +=						"</tr>";
									html +=						"<tr>";
									html +=							"<th>전화</th>";
									html +=							"<td>"+tel_num+"</td>"; 
									html +=						"</tr>";
									html +=					"</table>";
									html +=				"</div>";
									html +=			"</div>"; 
									html +=		"<div class='btnbox'>";
									html +=			"<a href='javascript:$technicalBizMap.ui.doSupplyDetailInfo(\""+result[i].x_coor+"\", \""+ result[i].y_coor+"\");' class='btnType01 w200'>해당지역 상세정보 보기</a>";

									if (result[i].lct_type == "4") {//창업투자회사
										var url = result[i].url;
										if (url != undefined && url.length > 0) {
											if (url.indexOf("http") == -1 && url.indexOf("https") == -1) {
												url = "http://"+url;
												
											}
											html +=	"<a href='"+url+"' target='_blank' class='btnType02 w200'>홈페이지 이동</a>";
										}
									}else {
										html +=	"<a href='"+result[i].url+"' target='_blank' class='btnType02 w200' title='새창으로 열림'>벤처창업입지114 이동</a>";
									}
									
									html += 	"</div>";
									html += 	"</div>";
								    html += "</div>";
									
									marker.bindInfoWindow(html);

									marker.on("click",function() {
										$(".sop-infowindow-content").css("width", "auto");
									});
								}
								
								$technicalBizMap.ui.markerGroup1 = tmpMarkerGroup1;
								$technicalBizMap.ui.markerGroup2 = tmpMarkerGroup2;
								$technicalBizMap.ui.markerGroup3 = tmpMarkerGroup3;
								$technicalBizMap.ui.markerGroup4 = tmpMarkerGroup4;
								
								$technicalBizDataBoard.ui.setReportData(
										"supply", 
										"supplyMarker", 
										result, 
										map.id);
								
								break;
							case -401:
								accessTokenInfo(function() {
									$technicalBizMapApi.request.openApiTotalSupplyFacilityPoi(options.map);
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 전국 지원시설 POI 조회 종료 ********* */
	
	/** ********* 지원시설 지역별 총사업체/종사자수 조회 시작 ********* */
	(function() {
		$class("sop.openApi.supplyRegionInfo.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result;
								var showData = "corp_cnt";
								var unit = "개";
								var type = "";
								
								switch(options.params.menuType) {
									case "supply": //지원시설
										if ($("#supplyDetailDiv").is(":visible")) {
											if (!$("#standardButton").hasClass("off")) {
												showData = "corp_cnt";
												unit = "개";
											}else {
												showData = "worker_cnt";
												unit = "수";
											}
										}else if  ($("#supplyDiv").is(":visible")) {
											if (!$("#standardButton").hasClass("off")) {
												showData = "corp_cnt";
												unit = "개";
											}else {
												showData = "corp_cnt";
												unit = "개";
											}
										}
										
										for (var i=0; i<result.length; i++) {
											result[i]["type"] = "supply";
											type = "supply";
										}
										break;
									case "industry": //산업단지
										if ($("#industryDetailDiv").is(":visible")) {
											/*if ($("#changeIndustryAreaSynthesizeStatsInfoTab01_Btn01").hasClass("on")) {
												showData = "corp_cnt";
												unit = "개";
											}else {
												showData = "worker_cnt";
												unit = "수";
											}*/
											if (!$("#standardButton").hasClass("off")) {
												showData = "corp_cnt";
												unit = "개";
											}else {
												showData = "worker_cnt";
												unit = "수";
											}
											
										}else{
											if (!$("#standardButton").hasClass("off")) {
												$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").show();
												$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").hide();
											}else {
												$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").hide();
												$("#changeSupplyAreaSynthesizeStatsInfoTab01_Btn01").show();
											}
										}
										
										for (var i=0; i<result.length; i++) {
											result[i]["type"] = "industry";
											type = "industry";
										}
										break;
									default:
										break;
								}
								
								res["pAdmCd"] = options.params.adm_cd;
								if (options.params.pass == undefined || !options.params.pass) {
									map.clearDataOverlay();
								}
								map.setStatsData("normal", res, showData, unit);
								$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options.params = options.params;
								$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["data"] = result;
								
								//공유등록
								map.shareInfo.setTechnicalBizShareInfo(options, type, map.id);
								
								$technicalBizDataBoard.ui.setReportData(
										options.params.menuType, 
										"supplyRegionChart", 
										result, 
										map.id);
								if (options.callback != null && options.callback instanceof Function) {
									options.callback.call(undefined, res);
								}
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());	
	/*********** 전국 산업단지정보 조회 시작 ********* */
	(function() {
		$class("sop.openApi.allIndustryPoi.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if ($technicalBizLeftMenu.ui.curSelectedStatsType != "industry") {
							return;
						}
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result;
								
								//시도별 산업단지 그룹핑
								var sidoList = map.mapNavigation.sidoList;
								var tmpData = {};
								for (var i=0; i<sidoList.length; i++) {
									tmpData[sidoList[i].sido_cd] = [];
									for (var k=0; k<result.length; k++) {
										if (sidoList[i].sido_cd == result[k].sido_cd) {
											tmpData[sidoList[i].sido_cd].push(result[k]);
										}
									}
								}
								
								//마커그룹생성
								$technicalBizMap.ui.doSupplyMarkerClear();
								$technicalBizMap.ui.doIndustryMarkerClear();
								if ($technicalBizMap.ui.industryMarkerGroup == null) {
									$technicalBizMap.ui.industryMarkerGroup = [];
								}
								var zoom = map.zoom;
								for (var p in tmpData) {
									var tmpMarkerGroup = sop.markerClusterGroup({
										animateAddingMarkers: true,
										maxClusterRadius : function(zoom){
											if (zoom <= 4) {
												return 400;
											}else {
												return 80;
											}
										} 
									});
									map.gMap.addLayer(tmpMarkerGroup);
									
									var iconUrl, iconAnchor, iconSize, infoWindowAnchor;
									for (var i=0; i<tmpData[p].length; i++) {
										switch(parseInt(tmpData[p][i].complex_type)) {
											case 1:
												iconUrl = "/img/tech/ico_poiList02.png";
												iconSize = [49, 67];
												iconAnchor = [24.5, 67];
												infoWindowAnchor = [-90, -66];
												break;
											case 2:
												iconUrl = "/img/tech/ico_poiList04.png";
												iconSize = [49, 57];
												iconAnchor = [24.5, 57];
												infoWindowAnchor = [-90, -61];
												break;
											case 3:
												iconUrl = "/img/tech/ico_poiList01.png";
												iconSize = [49, 60];
												iconAnchor = [24.5, 60];
												infoWindowAnchor = [-90, -62];
												break;
											case 4:
												iconUrl = "/img/tech/ico_poiList03.png";
												iconSize = [49, 52];
												iconAnchor = [24.5, 52];
												infoWindowAnchor = [-87, -61];
												break;
										}
										
										var markerIcon = sop.icon({
											iconUrl: iconUrl,
											shadowUrl: "/img/marker/theme_shadow.png",
											iconAnchor: iconAnchor,
											iconSize: iconSize,
											infoWindowAnchor: infoWindowAnchor
										});
										
										tmpData[p][i].x_coor = parseFloat(tmpData[p][i].x_coor).toFixed(2);
										tmpData[p][i].y_coor = parseFloat(tmpData[p][i].y_coor).toFixed(2);
										var marker = sop.marker([ tmpData[p][i].x_coor, tmpData[p][i].y_coor ], {
											icon: markerIcon
										});
										marker.info = tmpData[p][i];
										tmpMarkerGroup.addLayer(marker);
										
										var html ="";
										html += "<div style='width:480px;'>";
										html += 	"<div class='cont'>"; 
										html +=			"<p class='dabSubj' style='font-weight:bold;'>"+tmpData[p][i].complex_nm+"</p>";
										html += 		"<div class='mDetailArea'>";
										html +=				"<div class='img'><img src='/img/tech/bg_dab01.png' /></div>";
										html +=				"<div class='mCont' style='width:350px;'>"; 
										html +=					"<table class='mContTable t01'>"; 
										html +=						"<colgroup>";
										html +=							"<col width='100' />";
										html +=						"</colgroup>";
										html +=						"<tr>";
										html +=							"<th>사업시행자/관리기관</th>";
										html +=							"<td>"+tmpData[p][i].implementer_mgmt_inst+"</td>"; 
										html +=						"</tr>";
										html +=						"<tr>";
										html +=							"<th>위치</th>";
										html +=							"<td>"+tmpData[p][i].lc+"</td>";
										html +=						"</tr>";
/*										html +=						"<tr>";
										html +=							"<th>입주업종</th>";
										html +=							"<td>"+tmpData[p][i].mvn_biz+"</td>"; 
										html +=						"</tr>";*/
										html +=					"</table>";
										html +=				"</div>";
										html +=			"</div>"; 
										html +=			"<div class='btnbox industryDetailInfoBtn'>";
										html +=				"<a onclick='javascript:$technicalBizMap.ui.goIndustryDetailInfo(\""+p+"\", \""+i+"\");' class='btnType02 w200' style='float:left;'>해당지역 상세정보 보기</a>";
										html +=				"<a onclick='javascript:$technicalBizMap.ui.goLinkIndustryDetailInfo(\""+p+"\", \""+i+"\");' class='btnType02 w200'>산업단지 상세정보 보기</a>";
										html +=			"</div>";
										
										
										marker.bindInfoWindow(html);
										
										marker.on("click",function(e) {
											$(".sop-infowindow-content").css("width", "auto");
											$(".dimAreaScroll").mCustomScrollbar({axis:"xy"}); 
											map.mapMove([e.target._utmk.x, e.target._utmk.y], map.zoom, true);
										});
									}
									$technicalBizMap.ui.industryMarkerGroup.push(tmpMarkerGroup);
									$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["marker"] = tmpData;
								}
								
								$technicalBizDataBoard.ui.setReportData(
										"industry", 
										"IndustryPoi", 
										result, 
										map.id);
								
								break;
							case -401:
								accessTokenInfo(function() {
									$technicalBizMapApi.request.openApiAllIndustryPoi(options.map);
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 지원시설 지역별 총사업체/종사자수 조회 시작 종료 ********* */
	
	/*********** 산업단지경계 조회 시작 ********* */
	(function() {
		$class("sop.openApi.industryBoundary.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								if (map.geojson) {
									map.geojson.remove();
								}
								map.clearDataOverlay();
								map.mapMove([options.data.x_coor, options.data.y_coor], 8);
								map.addPolygonGeoJson(res, "industry");
								
								//공유등록
								options["params"] = {};
								options.params["complex_no"] = options.data.complex_no;
								options.params["complex_nm"] = options.data.complex_nm;
								options.params["x_coor"] = options.data.x_coor;
								options.params["y_coor"] = options.data.y_coor;
								map.shareInfo.setTechnicalBizShareInfo(options, "industry", map.id);
								
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 산업단지경계 조회 시작 종료 ********* */

	/*********** 지역별 신설법인정보 조회 시작 ********* */
	(function() {
		$class("sop.openApi.newCorpInfoList.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result;
								var tmpData = [];
								var data = [];
								for (var i=0; i<result.length; i++) {
									result[i].corp_cnt = parseInt(result[i].corp_cnt);
									tmpData.push(parseInt(result[i].corp_cnt));
								}
								data.push(tmpData);
								map.legend.calculateLegend(data);
								map.setStatsData("normal", res, "corp_cnt", "개");
								$technicalBizMap.ui.setNewCorpInfoList(map);
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 지역별신설법인정보 조회 시작 종료 ********* */

	/*********** 산업단지 내 지원시설 조회 시작 ********* */
	(function() {
		$class("sop.openApi.supplyPoiInIndustryBoundaryObj.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if ($technicalBizLeftMenu.ui.curSelectedStatsType != "industry") {
							return;
						}
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result;
								//마커생성
								var tmpMarkerGroup = sop.featureGroup();
								map.gMap.addLayer(tmpMarkerGroup);
								
								for(var i=0; i<result.length; i++) {
										var iconUrl = "";
										switch(parseInt(result[i].lct_type)) {
											case 1:
												iconUrl = "/img/tech/ico_supply_marker01.png";
												break;
											case 2:
												iconUrl = "/img/tech/ico_supply_marker02.png";
												break;
											case 3:
												iconUrl = "/img/tech/ico_supply_marker03.png";
												break;
											case 4:
												iconUrl = "/img/tech/ico_supply_marker04.png";
												break;
										}

										var markerIcon = sop.icon({
											iconUrl: iconUrl,
											shadowUrl: "/img/marker/theme_shadow.png",
											iconAnchor: [24.5, 64 ],
											iconSize: [ 49, 64 ],
											infoWindowAnchor: [-90, -66]
										});
										
										var marker = sop.marker([ result[i].x_coor, result[i].y_coor ], {
											icon: markerIcon
										});
										
										marker.info = result[i];
										tmpMarkerGroup.addLayer(marker);

										var tel_num = "";
										if (!sop.Util.isUndefined(result[i].tel_no)) {
											tel_num = result[i].tel_no;
										}
										
										var html ="";
										html += "<div style='width:480px;'>";
										html += 	"<div class='cont'>"; 
										html +=			"<p class='dabSubj'>"+result[i].inst_nm+"</p>";
										html += 		"<div class='mDetailArea'>";
										html +=				"<div class='img'><img src='/img/tech/bg_dab01.png' /></div>";
										html +=				"<div class='mCont' style='width:350px;'>"; 
										html +=					"<table class='mContTable t01'>"; 
										html +=						"<colgroup>";
										html +=							"<col width='100' />";
										html +=						"</colgroup>";
										html +=						"<tr>";
										html +=							"<th>입지유형</th>";
										html +=							"<td>"+result[i].lct_type_nm+"</td>"; 
										html +=						"</tr>";
										html +=						"<tr>";
										html +=							"<th>소재지</th>";
										html +=							"<td>"+result[i].addr+"</td>";
										html +=						"</tr>";
										html +=						"<tr>";
										html +=							"<th>전화</th>";
										html +=							"<td>"+tel_num+"</td>"; 
										html +=						"</tr>";
										html +=					"</table>";
										html +=				"</div>";
										html +=			"</div>"; 
										html +=		"<div class='btnbox'>";
										//html +=			"<a href='javascript:$technicalBizMap.ui.doSupplyDetailInfo(\""+result[i].x_coor+"\", \""+result[i].y_coor+"\");' class='btnType01 w200'>해당지역 상세정보 보기</a>";
										
										if (result[i].lct_type == "4") {//창업투자회사
											var url = result[i].url;
											if (url != undefined && url.length > 1) {
												if (url.indexOf("http") == -1 || url.indexOf("https") == -1) {
													url = "http://"+url;
													
												}
												html +=	"<a href='"+url+"' target='_blank' class='btnType02 w200'>홈페이지 이동</a>";
											}
										}else {
											html +=	"<a href='"+result[i].url+"' target='_blank' class='btnType02 w200'>벤처창업입지114 이동</a>";
										}
										
										html += 	"</div>";
										html += 	"</div>";
									    html += "</div>";
										
										marker.bindInfoWindow(html);

										marker.on("click",function(e) {
											$(".sop-infowindow-content").css("width", "auto");
											map.mapMove([e.target._utmk.x, e.target._utmk.y], map.zoom, true);
										});
										
										$technicalBizMap.ui.markerGroup1 = tmpMarkerGroup;
									}	

								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 산업단지 내 지원시설 조회 시작 종료 ********* */
	
	/** ********* 지역검색 필터 ********* */
	(function() {
		$class("sop.portal.getAreaFilterSearch").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var resultArray = res.result;
						
						if(resultArray.length != 0){
							var admCodeArray = new Array();
							for(var i = 0; i < resultArray.length; i++){
								var adm_code = resultArray[i].sido_cd + resultArray[i].sgg_cd;
								admCodeArray.push(adm_code);
							}
							
							$technicalBizMap.ui.setSelectAdmCode(admCodeArray,options);
						}else{
							messageAlert.open("알림", "검색된 지역이 존재 하지 않습니다.");
						}
					
						//선정된 adm_cd 를 option과 함께 호출 한다.
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 지역검색 필터 ********* */
	
	/** ********* 지역 이름 검색  ********* */
	(function(){
		$class("sop.portal.searchAdmNm").extend(sop.portal.absAPI).define({
			onSuccess : function(status,res,options){
				var id = options.id;
				var array = res.result;
				
				//2018.01.22 [개발팀] 성능이슈 - 로직수정
				var colorList = $technicalBizDataBoardApi.example.colorList[3];
				$technicalBizMap.ui.compareAreaSelectedList = [];
				$technicalBizMap.ui.compareAreaSelectedColorList = [];
								
				var html  =	'<div id="wrap_legendPage" style="height:170px;">';
					html += '<ul class="selList02" id="'+id+'_ul">';
					
				for(var i = 0; i < array.length; i++){
					html += '<li>';
					
					//2018.01.18 [개발팀] 기능수정
					if (i < $technicalBizMap.ui.compareAreaSelectedCnt) {
						html +=	'<a id="selectTextBox_'+i+'" href="javascript:$technicalBizMap.ui.areaDetailChartSetAdmCode(\'selectTextBox_'+i+'\', \''+array[i].adm_cd+'\');void(0);" adm_cd="'+array[i].adm_cd+'" style="background-color:'+colorList[i]+'"class="on">'; //2018.01.22 [개발팀] 성능이슈 - 로직변경
						$technicalBizMap.ui.compareAreaSelectedList.push({adm_cd:array[i].adm_cd, color:colorList[i]}); //2018.01.22 [개발팀]
					}else {
						html +=	'<a id="selectTextBox_'+i+'" href="javascript:$technicalBizMap.ui.areaDetailChartSetAdmCode(\'selectTextBox_'+i+'\', \''+array[i].adm_cd+'\');void(0);" adm_cd="'+array[i].adm_cd+'">'; //2018.01.22 [개발팀] 성능이슈 - 로직변경
					}
					
					html +=			'<span class="t01">'+array[i].sido_nm+'</span><span class="t02">'+array[i].sgg_nm+'</span>'
					html +=		'</a>'
					html += '</li>';
				}
				
				html +='</ul>';
				html += "</div>" //2018.01.22 [개발팀]
					
				$("#"+id+"_count").html('<p>선택된 지역 : '+array.length+'개</p>')
				$("#"+id).html(html);
				
				if(array.length > 5){
					$("#wrap_legendPage").mCustomScrollbar({axis:"y"});
				}
				
				//2018.01.22 [개발팀]
				if (options.callback != undefined && typeof options.callback === "function") {
					options.callback.call(undefined);
				}
				
			},
			onFail : function(status, options) {
			}
		});
	}());
	/** ********* 지역 이름 검색  ********* */
	
	/** ********* 지역 종합 정보  ********* */
	(function() {
		$class("sop.portal.searchTechTotalInfo").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var resultArray = res.result;
						
						var infoArray1 = new Array();
						var infoArray2 = new Array();
						var infoArray3 = new Array();
						var infoArray4 = new Array();
						for(var i = 0; i < resultArray.length; i++){
							var info1 = resultArray[i].info1;
							var info2 = resultArray[i].info2;
							var info3 = resultArray[i].info3;
							var info4 = resultArray[i].info4;
							
							infoArray1.push(info1);
							infoArray2.push(info2);
							infoArray3.push(info3);
							infoArray4.push(info4);
						}
						
						//$technicalBizDataBoardApi.example.colorList[0]
						var html1 ="<li>&nbsp;</li>";
						html1 +="<li class='c00'>시도별  평균</li>";
						html1 +="<li>&nbsp;</li>";
						var html2 = "";
						for(var i = 0 ; i < infoArray4.length; i++){
							html2 += "<li class='c0"+i+"'>";
							html2 += infoArray4[i].addr;
							html2 += "</li>";
						}
						html1 = html1+ html2;
						/*$("#areaDetailInfoAdmList1").html(html1);
						$("#areaDetailInfoAdmList2").html(html2);
						$("#areaDetailInfoAdmList3").html(html2);*/
						
						
						
						//graph1
						//adm_cd
						//area_price
						//areapricez
						//areastatz
						//corp_cnt
						//corp_irdsrate
						//corp_per
						//corpcntz
						//financialz
						//fnidpr
						//ppltnz
						//techcd
						//worker_cnt
						//worker_irdsrate
						//worker_per
						//workercntz
						
						var zScoreArray = ['corpcntz','workercntz','ppltnz','financialz','areapricez','areastatz'];
						var tooltipData = ['corp_cnt','worker_cnt','ppltnCnt','fnidpr','area_price','areastatz'];
						
						$("#chtBox01").highcharts({ 
					        chart: { polar: true, type: 'line', margin:[0,60,0,60] },
					        colors: $technicalBizDataBoardApi.example.colorList[3],
					        title: {
					            text: ''
					        }, 
					        pane: { size: '100%' }, 
					        xAxis: {
					            categories: ['종사자 수', '인구', '재정자립도', '지가변동률', '면적', '사업체수'],
					            tickmarkPlacement: 'on', lineWidth: 0,
					        }, 
					        yAxis: {
					            gridLineInterpolation: 'polygon',
					            lineWidth: 0,
					            min: 0,
					            max : 10,
					            labels: { enabled: false }
					        
					        }, 
					        tooltip: {
					            shared: true,
					            //2018.01.22 [개발팀] 로직수정
					            formatter: function () {
									var html = "";
									var symbol = '●';
									html += '<span style="font-weight:bold;">'+this.x+'</span>';
									html += '<br/>';
									for (var i=0; i<this.points.length; i++) {
										html += '<span style="color:' + this.points[i].series.color + '">' + symbol + '</span>';
										html += ' ' + this.points[i].series.name + ': <b>' + this.points[i].y + '</b>';
										if (i < this.points.length-1) {
											html += "<br/>";
										}
									}
									return html;
					            }
					        },
					        legend: {
					        	enabled : false
					        }, 
					       
					    });
						
						$("#chtBox02").highcharts({ 
					        chart: { type: 'bubble', plotBorderWidth: 1 },
					        legend: {enabled: false},
					        title: {text: ''},
					        subtitle: {text: ''},
					        xAxis: {
					            gridLineWidth: 1,
					            title: {text: ''},
					            labels: {
					                format: '{value}'
					            },
					            plotLines: [{
					                color: 'red',
					                dashStyle: 'solid',
					                width: 2,
					                value: 65,
					                label: {
					                    rotation: 0,
					                    y: 15,
					                    style: {
					                        fontStyle: 'italic'
					                    },
					                    /*text: '종사자'*/
					                },
					                zIndex: 3
					            }]
					        },

					        yAxis: {
					            startOnTick: false,
					            endOnTick: false,
					            title: {
					                text: ''
					            },
					            labels: {
					                format: '{value}'
					            },
					            maxPadding: 0.2,
					            plotLines: [{
					                color: 'red',
					                dashStyle: 'solid',
					                width: 2,
					                value: 50,
					                label: {
					                    align: 'right',
					                    style: {
					                        fontStyle: 'italic'
					                    },
					                    /*text: '사업체',*/
					                    x: -10
					                },
					                zIndex: 3
					            }]
					        },

					        tooltip: {
					        	//2018.01.22 [개발팀] 툴팁 수정 
					        	shared : true,
					        	formatter: function () {
					                var x = this.point.x;
					                var y = this.point.y;
					                var html = "";
					                $.each(this.series.chart.series, function (i, serie) {
					                    $.each(serie.data, function (j, p) {
					                        if (p.x === x && p.y === y) {
					                        	html += '<table">';
					                        	html +=	'<tr>';
					                        	html += 	'<td><span style="color:'+p.color+'">●</span><span>'+p.name+':</span><span style="font-weight:bold;">사업체:'+p.x+' 종사자:'+p.y+'</span></td>';
					                        	html += '</tr>';
								                html += '</table>';
								                html += '<br/><br/>';
					                        }
					                    });
					                });
					                return html;
					            }
					        },

					        plotOptions: {
					            series: {
					                dataLabels: {
					                    enabled: true,
					                    format: '{point.name}',
					                    //2018.01.08 [개발팀]
					                    //입지계수 차트 텍스트변경
					                    style:{
			                                   color:"#000",
			                                   textOutline : "0px"
			                                }
					                }
					            }
					        },
					    });
						var yearList = new Array();
						for(var j = 0; j < infoArray3[0].length; j++){
							yearList.push(infoArray3[0][j].base_year);
						}
						$('#chtBox03').highcharts({
							chart: { zoomType: 'xy' },
					        colors: $technicalBizDataBoardApi.example.colorList[3],
					        title: { text: '' },
					        subtitle: {
					            text: ''
					        },
					        xAxis: [{
					            categories: yearList,
					            crosshair: true
					        }],
					        yAxis: [{ // Secondary yAxis
					            title: {
					                text: ''
					            }
					        }],
					        tooltip: {
					            shared: true
					        },
					        legend: {
					        	enabled : false
					        },
					    });
						
						for(var i = 0; i < infoArray1.length; i ++){
							if (infoArray1[i] == null) {
								continue;
							}
							var inputArray = new Array();
							for(var j = 0; j < zScoreArray.length; j++){
								inputArray.push(infoArray1[i][zScoreArray[j]]);
							}
							addSeries1("#chtBox01",inputArray,infoArray4[i].addr, $.trim(infoArray1[i].adm_cd)); //2018.01.18 [개발팀] 행정동코드 파라미터 추가
						}
						
						for(var i =0; i < infoArray2.length; i++){
							//2017.11.10 전국 시도 분기 필요
							addSeries2("#chtBox02",infoArray2[i].country_vs_corp_lq,infoArray2[i].country_vs_worker_lq,infoArray4[i].addr,$technicalBizDataBoardApi.example.colorList[3][i], $.trim(infoArray2[i].adm_cd)); //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
						}
						
						for(var i = 0; i < infoArray3.length; i++){
							//corp냐 worker냐 
							var yearData = new Array();
							for(var j =0; j < infoArray3[i].length; j++){
								yearData.push(Number(infoArray3[i][j].corp_irdsrate));
							}
							addSeries3(yearData,infoArray4[i].addr, $.trim(infoArray3[i][0].adm_cd));  //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
						}
						
						//chtBox01,chtBox02,chtBox03
						var chart1 = $("#chtBox01").highcharts();
						var chart2 = $("#chtBox02").highcharts();
						var chart3 = $("#chtBox03").highcharts();
						
						//2018.01.18 [개발팀] 기능변경
						//최초에 후보지역을 다 보여주지 않고, 최대 갯수에 한정에서 표출 
						for (var i=1; i<=3; i++) {
							var charts = $("#chtBox0"+i).highcharts();
							//차트의 모든 데이터 hide
							for (var j=0; j<charts.series.length; j++) {
								charts.series[j].setVisible(false, false);
							}
							//선택된 정보만 show
							if ($technicalBizMap.ui.compareAreaSelectedList.length > 0) {
								for (var v=0; v<$technicalBizMap.ui.compareAreaSelectedList.length; v++) {
									for (var k=0; k<charts.series.length; k++) {
										if (charts.series[k].userOptions.adm_cd == $technicalBizMap.ui.compareAreaSelectedList[v].adm_cd) { //2018.01.22 [개발팀]
											charts.series[k].options.color = $technicalBizMap.ui.compareAreaSelectedList[v].color; //2018.01.22 [개발팀]
											charts.series[k].update(charts.series[k].options);
											charts.series[k].setVisible(true, true);
											break;
										}
									}	
								}
							}
						}
						
						
						//2018.01.18 [개발팀]
						//버블차트 라이브러리 버그 대응
						setTimeout(function() {
							chart2.zoom();
						},100);
						
						function addSeries1(id,valArray,name,adm_cd){ //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
							var charts = $(id).highcharts();
							charts.addSeries({
								type : 'line',
								data : valArray,
								name : name,
								adm_cd : adm_cd //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
							});
							
						}
						
						function addSeries2(id,company_lct,worker_lct,nameVal,colorVal,adm_cd){ //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
							var xVal = Number(company_lct);
							var yVal = Number(worker_lct);
							var charts = $(id).highcharts();
							
							charts.addSeries({
								data :[{x :xVal, y :yVal, z:50, name : nameVal }], 
								color : colorVal,
								adm_cd : adm_cd //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
							});
							
						}
						
						function addSeries3(valueArray,name,adm_cd){ //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
							var charts = $("#chtBox03").highcharts();
							
							charts.addSeries({
					            name: name,
					            type: '',
					            data: valueArray,
					            tooltip: {
					                valueSuffix: '%'
					            },
					            adm_cd : adm_cd //2018.01.18 [개발팀] 행정동코드 파라미터 추가 
					        });
							
						}
					
						//선정된 adm_cd 를 option과 함께 호출 한다.
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 지역 종합 정보  ********* */
	/** ********* 지역 상세 정보  ********* */
	(function() {
		$class("sop.portal.searchTechDetailInfo").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var resultArray = res.result;
						
						/*//#chtBox04
						//#chtBox05
						//#chtBox06
						//#chtBox07
						var checkAdmList = $("#legendPage_ul > li");
						var checkList = new Array();
						var selectColorList = new Array();
						for(var i = 0 ; i < checkAdmList.length; i++){
							//2018.01.18 [개발팀]
							selectColorList.push($technicalBizDataBoardApi.example.colorList[3][i]);
						}
						*/
						
						var infoArray1 = new Array();
						var infoArray2 = new Array();
						var infoArray3 = new Array();
						var infoArray4 = new Array();
						var infoArray5 = new Array();
						for(var i = 0; i < resultArray.length; i++){
							var info1 = resultArray[i].info1;
							var info2 = resultArray[i].info2;
							var info3 = resultArray[i].info3;
							var info4 = resultArray[i].info4;
							var info5 = resultArray[i].info5;
							
							infoArray1.push(info1);
							infoArray2.push(info2);
							infoArray3.push(info3);
							infoArray4.push(info4);
							infoArray5.push(info5);
						}
						
						var admArray = new Array();
						for(var i = 0; i < infoArray5.length; i ++){
							//2018.01.22 [개발팀] 로직수정
							for (var k=0; k<$technicalBizMap.ui.compareAreaSelectedList.length; k++) {
								if ($technicalBizMap.ui.compareAreaSelectedList[k].adm_cd == $.trim(infoArray5[i].adm_cd)) {
									admArray.push(infoArray5[i].sido_nm + "<br />" + infoArray5[i].sgg_nm);
									break;
								}
							}
						}
						columnCht("#chtBar01",admArray);
						columnCht("#chtBar02",admArray);
						columnCht("#chtBar03",admArray);
						columnCht("#chtBar04",admArray);
						
						var dataArray1 = new Array();
						var dataArray2 = new Array();
						var dataArray3 = new Array();
						var dataArray4 = new Array();
						
						for(var i=0; i < infoArray1.length; i++){
							//2018.01.22 [개발팀] 로직수정
							var color = "#ff000";
							for (var k=0; k<$technicalBizMap.ui.compareAreaSelectedList.length; k++) {
								if ($technicalBizMap.ui.compareAreaSelectedList[k].adm_cd == $.trim(infoArray5[i].adm_cd)) {
									color = $technicalBizMap.ui.compareAreaSelectedList[k].color;
									break;
								}
							}
							
							//2018.01.18 [개발팀] 행정동 파라미터 추가
							//2018.01.22 [개발팀] 로직수정
							dataArray1.push({y:Number(infoArray1[i].cnt), adm_cd:$.trim(infoArray5[i].adm_cd), color:color}); 
							dataArray2.push({y:Number(infoArray2[i].cnt), adm_cd:$.trim(infoArray5[i].adm_cd), color:color});
							dataArray3.push({y:Number(infoArray3[i].cnt), adm_cd:$.trim(infoArray5[i].adm_cd), color:color});
							dataArray4.push({y:Number(infoArray4[i].cnt), adm_cd:$.trim(infoArray5[i].adm_cd),  color:color});
						}
									
						addSeries("#chtBar01",dataArray1);
						addSeries("#chtBar02",dataArray2);
						addSeries("#chtBar03",dataArray3);
						addSeries("#chtBar04",dataArray4);
						
						//2018.01.18 [개발팀] 기능변경
						//최초에 후보지역을 다 보여주지 않고, 최대 갯수에 한정에서 표출 
						for (var i=1; i<=4; i++) {
							var charts = $("#chtBar0"+i).highcharts();
							//차트의 모든 데이터 hide
							charts.series[0].setData([]);
							
							//선택된 정보만 show
							if ($technicalBizMap.ui.compareAreaSelectedList.length > 0) {
								var tmpData = [];
								for (var v=0; v<$technicalBizMap.ui.compareAreaSelectedList.length; v++) {
									for (var k=0; k<charts.series[0].userOptions.originData.length; k++) {
										if (charts.series[0].userOptions.originData[k].adm_cd == $technicalBizMap.ui.compareAreaSelectedList[v].adm_cd) { //2018.01.22 [개발팀]
											tmpData.push(charts.series[0].userOptions.originData[k]);
											break;
										}
									}	
								}
								charts.series[0].setData(tmpData);
							}
						}
						
						function columnCht(id,admList){
							$(id).highcharts({
						        chart: {
						            type: 'column',
						            height:280
						        },
						        tooltip: { enabled: false },
						        title: { text: '' },
						        subtitle: { text: '' },
						        xAxis: {
						            categories: admList,
						            labels: { overflow: 'justify', enabled: false }
						        },
						        yAxis: {
						            min: 0, title: { text: '', align: 'left' },
						            labels: { overflow: 'justify', enabled: false }
						        }, 
						        plotOptions: { 
						        	bar: {
						                dataLabels: { enabled: false }
						            }
						        },
						        legend: { enabled: false },
						        credits: {  enabled: false },
						        /*series: [
						            { 
						            	colorByPoint: true,
						            	name: '경기도 화성시',
						            	data: [50,40,30],
						            	dataLabels: {
						    				enabled: true,
						    				rotation: 0,
						    				color: '#333',
						    				align: 'center',
						    				format: '{point.y}', // one decimal
						    				y: 0
						    			}
						        	}
						        ]*/
						    });
							
							
						}
						
						
						function addSeries(id,dataArray){
							var charts = $(id).highcharts();
							
							charts.addSeries({
								colorByPoint: true,
								data : dataArray,
								dataLabels: {
				    				enabled: true,
				    				rotation: 0,
				    				color: '#333',
				    				align: 'center',
				    				format: appendCommaToNumber('{point.y}'), // one decimal //2018.01.18 [개발팀] 천단위콤마 추가
				    				y: 0
				    			},
				    			originData : dataArray //2018.01.18 [개발팀]
								
							});
							/*charts.addSeries({
					            name: name,
					            type: '',
					            data: valueArray,
					            tooltip: {
					                valueSuffix: '%'
					            }
					        });*/
							
							/*series: [
				            { 
				            	colorByPoint: true,
				            	name: '경기도 화성시',
				            	data: [50,40,30],
				            	dataLabels: {
				    				enabled: true,
				    				rotation: 0,
				    				color: '#333',
				    				align: 'center',
				    				format: '{point.y}', // one decimal
				    				y: 0
				    			}
				        	}
				        ]*/
							
						}
						
					
						//선정된 adm_cd 를 option과 함께 호출 한다.
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 지역 상세 정보  ********* */
	
	
	/** ********* 지역 상세 정보  ********* */
	(function() {
		$class("sop.portal.searchDetailCntInfo").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var map = options.map;
						var showData = "corp_cnt";
						var unit = "개";
						if($("#standardButton").hasClass("off")){
							showData = "worker_cnt";
							unit = "명";
						}
						
						res["pAdmCd"] = options.adm_cd;
						map.setStatsData("normal",res,showData,unit);
						
						
						if (options.callback != null && options.callback instanceof Function) {
							options.callback.call(undefined, res);
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 지역 상세 정보  ********* */
	
	
}(window, document));