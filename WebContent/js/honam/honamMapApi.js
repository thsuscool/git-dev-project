/**
 * 인터랙티브맵 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$honamMapApi = W.$honamMapApi || {};
	
	$honamMapApi.request = {
			
			API_0301_URL : "/OpenAPI3/stats/population.json",
			API_0302_URL : "/OpenAPI3/stats/searchpopulation.json",
			API_0303_URL : "/OpenAPI3/stats/industrycode.json",
			API_0304_URL : "/OpenAPI3/stats/company.json",
			API_0305_URL : "/OpenAPI3/stats/household.json",
			API_0306_URL : "/OpenAPI3/stats/house.json",
			API_0307_URL : "/OpenAPI3/stats/farmhousehold.json",
			API_0308_URL : "/OpenAPI3/stats/forestryhousehold.json",
			API_0309_URL : "/OpenAPI3/stats/fisheryhousehold.json",
			API_0310_URL : "/OpenAPI3/stats/householdmember.json",
			API_FUSION_URL : "/ServiceAPI/stats/fusionstats.json",
			
			combineFailCnt : 0,
			
			/**
			 * 
			 * @name         : personInfoList
			 * @description  : 호남청 담당자를 조회한다.
			 * @date         : 2015. 05. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			personInfoList : function(type, categories) {
				var sopOpenApiPersonInfoListObj = new sop.openApi.personInfoList.api();
				sopOpenApiPersonInfoListObj.addParam("code", type);
				sopOpenApiPersonInfoListObj.addParam("categories", categories);
				sopOpenApiPersonInfoListObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/honam/personInfoList.json",
					options : {
						categories : categories,
						office : type
					}
				});
			},
			
			/**
			 * 
			 * @name         : addressInfoList
			 * @description  : 호남청 담당자가 조사할 주소(POI)를 조회한다.
			 * @date         : 2015. 05. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			addressInfoList : function(person_id, category1, category2, no) {
				var sopOpenApiAddressInfoListObj = new sop.openApi.addressInfoList.api();
				sopOpenApiAddressInfoListObj.addParam("person_id", person_id);
//				sopOpenApiAddressInfoListObj.addParam("category1", category1);
				sopOpenApiAddressInfoListObj.addParam("category2", category2);
				sopOpenApiAddressInfoListObj.request({
					method : "POST",
					async :false,
					url : contextPath + "/ServiceAPI/honam/addressInfoList.json",
					options : {
						person_id : person_id,
						category1 : category1,
						category2 : category2,
						no: no
					}
				});
			},
			
			/**
			 * 
			 * @name         : personInfoList
			 * @description  : 세부조사별 호남청 담당자를 조회한다.
			 * @date         : 2015. 06. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			personInfoListForCategory : function(category2, office) {
				var sopOpenApiPersonInfoListObj = new sop.openApi.personInfoListForCategory.api();
				sopOpenApiPersonInfoListObj.addParam("category2", category2);
				sopOpenApiPersonInfoListObj.addParam("offices", office);
				sopOpenApiPersonInfoListObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/honam/personInfoListForCategory.json",
					options : {
						category2 : category2
					}
				});
			},

			/**
			 * 
			 * @name         : openApiTotalPopulation
			 * @description  : OpenAPI 인구통계총괄 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiTotalPopulation : function(params) {
				var sopOpenApiTotalPopulationObj = new sop.openApi.totalPopulation.api();
				sopOpenApiTotalPopulationObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiTotalPopulationObj.addParam(params.param[i].key,
							params.param[i].value);	
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
							
				if ( params.adm_cd != "00") {
					sopOpenApiTotalPopulationObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiTotalPopulationObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiTotalPopulationObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0301_URL,
					options : {
						params : params,
						url : this.API_0301_URL,
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : openApiSearchPopulation
			 * @description  : OpenAPI 인구통계세부조건 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiSearchPopulation : function(params) {
				var sopOpenApiSearchPopulationObj = new sop.openApi.searchPopulation.api();
				sopOpenApiSearchPopulationObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiSearchPopulationObj.addParam(params.param[i].key,
							params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				
				if ( params.adm_cd != "00") {
					sopOpenApiSearchPopulationObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiSearchPopulationObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiSearchPopulationObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0302_URL,
					options : {
						params : params,
						url : this.API_0302_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiHouseHold
			 * @description  : OpenAPI 가구통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiHouseHold : function(params) {
				var sopOpenApiHouseHoldObj = new sop.openApi.houseHold.api();
				sopOpenApiHouseHoldObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				
				if ( params.adm_cd != "00") {
					sopOpenApiHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiHouseHoldObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiHouseHoldObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0305_URL,
					options : {
						params : params,
						url : this.API_0305_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiHouseHoldMember
			 * @description  : OpenAPI 가구원통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiHouseHoldMember : function(params) {
				var sopOpenApiHouseHoldMemberObj = new sop.openApi.houseHoldMember.api();
				sopOpenApiHouseHoldMemberObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiHouseHoldMemberObj.addParam(params.param[i].key,
							params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}

				if ( params.adm_cd != "00") {
					sopOpenApiHouseHoldMemberObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiHouseHoldMemberObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiHouseHoldMemberObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0310_URL,
					options : {
						params : params,
						url : this.API_0310_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiFarmHouseHold
			 * @description  : OpenAPI 통가통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiFarmHouseHold : function(params) {
				var sopOpenApiFarmHouseHoldObj = new sop.openApi.FarmHouseHold.api();
				sopOpenApiFarmHouseHoldObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiFarmHouseHoldObj.addParam(params.param[i].key,
							params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				
				if ( params.adm_cd != "00") {
					sopOpenApiFarmHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiFarmHouseHoldObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiFarmHouseHoldObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0307_URL,
					options : {
						params : params,
						url : this.API_0307_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiForestryHouseHold
			 * @description  : OpenAPI 임가통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiForestryHouseHold : function(params) {
				var sopOpenApiForestryHouseHoldObj = new sop.openApi.ForestryHouseHold.api();
				sopOpenApiForestryHouseHoldObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiForestryHouseHoldObj.addParam(params.param[i].key,
							params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				
				if ( params.adm_cd != "00") {
					sopOpenApiForestryHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiForestryHouseHoldObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiForestryHouseHoldObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0308_URL,
					options : {
						params : params,
						url : this.API_0308_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiFisheryHouseHold
			 * @description  : OpenAPI 어가통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiFisheryHouseHold : function(params) {
				var sopOpenApiFisheryHouseHoldObj = new sop.openApi.FisheryHouseHold.api();
				sopOpenApiFisheryHouseHoldObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiFisheryHouseHoldObj.addParam(params.param[i].key,
							params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				
				if ( params.adm_cd != "00") {
					sopOpenApiFisheryHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiFisheryHouseHoldObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiFisheryHouseHoldObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0309_URL,
					options : {
						params : params,
						url : this.API_0309_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiInterstryCode
			 * @description  : OpenAPI 산업체분류 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 * @param adm_cd : 행정동코드
			 * @param filterParam : 경계레이어 선택 시, 표출된 파라미터(key)정보
			 * @param title : 드랍한 버튼의 타이틀정보am
			 */
			openApiInterstryCode : function(depth, class_deg, class_cd) {
				var sopOpenApiInderstryCodeObj = new sop.openApi.InderstryCode.api();
				sopOpenApiInderstryCodeObj.addParam("accessToken", accessToken);
				sopOpenApiInderstryCodeObj.addParam("class_deg", class_deg);
				if (class_cd != null) {
					sopOpenApiInderstryCodeObj.addParam("class_code", class_cd);
				}

				sopOpenApiInderstryCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + this.API_0303_URL,
					options : {
						depth : depth,
						class_deg : class_deg,
						class_cd : class_cd
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiCompany
			 * @description  : OpenAPI 사업체분류 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 * @param adm_cd : 행정동코드
			 * @param filterParam : 경계레이어 선택 시, 표출된 파라미터(key)정보
			 * @param title : 드랍한 버튼의 타이틀정보am
			 */
			openApiCompany : function(params) {
				var sopOpenApiCompanyObj = new sop.openApi.Company.api();
				sopOpenApiCompanyObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiCompanyObj.addParam(params.param[i].key, params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				
				if ( params.adm_cd != "00") {
					sopOpenApiCompanyObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiCompanyObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiCompanyObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0304_URL,
					options : {
						params : params,
						url : this.API_0304_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiHouse
			 * @description  : OpenAPI 주택통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiHouse : function(params) {
				var sopOpenApiHouseObj = new sop.openApi.House.api();
				sopOpenApiHouseObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiHouseObj.addParam(params.param[i].key, params.param[i].value);
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}

				if ( params.adm_cd != "00") {
					sopOpenApiHouseObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiHouseObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiHouseObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0306_URL,
					options : {
						params : params,
						url : this.API_0306_URL,
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiRegBookmark
			 * @description  : 북마크 및 공유정보를 등록한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 북마크 및 공유정보
			 * @param hist_type : 북마크 및 공유타입
			 */
			openApiRegBookmark : function(params, hist_type, type) {
				var tmpParams = JSON.stringify(params);
				var sopOpenApiRegBookmarkObj = new sop.openApi.regBookmark.api();
				sopOpenApiRegBookmarkObj.addParam("hist_id", makeRandomThirtySevenDigitString());
				sopOpenApiRegBookmarkObj.addParam("hist_type", hist_type);
				sopOpenApiRegBookmarkObj.addParam("map_type", "IMAP");
				sopOpenApiRegBookmarkObj.addParam("params", tmpParams);
				sopOpenApiRegBookmarkObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/member/RegStatisticsHistory.json",
					options : {
						type : type
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : openApiBookmarkParamList
			 * @description  : 북마크 및 공유의 상세파라미터정보를 가져온다.
			 * @date         : 2014. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 : 
			 * @param @param hist_id : 북마크 및 공유정보 key(id)
			 */
			openApiStatisticsHistoryParamInfo : function (hist_id) {
				var sopOpenApiStatisticsHistoryParamInfoObj = new sop.openApi.statisticsHistoryParamInfo.api();
				sopOpenApiStatisticsHistoryParamInfoObj.addParam("hist_id", hist_id);
				sopOpenApiStatisticsHistoryParamInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/member/StatisticsHistoryParamInfo.json"
				});
			},
			
			
			/**
			 * 
			 * @name         : openApiRecentParamInfo
			 * @description  : 메인화면 예시의 상세파라미터정보를 가져온다.
			 * @date         : 2014. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 : 
			 * @param @param hist_id : 북마크 및 공유정보 key(id)
			 */
			openApiMainRecentParamInfo : function (hist_id) {
				var sopOpenApiMainRecentParamInfoObj = new sop.openApi.mainRecentParamInfo.api();
				sopOpenApiMainRecentParamInfoObj.addParam("hist_id", hist_id);
				sopOpenApiMainRecentParamInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/common/MainRecentParamInfo.json"
				});
			},
			
			
			/**
			 * 
			 * @name         : openApiShareForStats
			 * @description  : 공유 또는 북마크된 통계정보를 호출한다.
			 * @date         : 2014. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 통계정보 파라미터
			 */
			openApiShareForStats : function(params) {
				var sopOpenApiShareForStatsObj = new sop.openApi.shareForStats.api();
				var paramInfo = params.param_info.paramInfo;
				for (k in paramInfo) {
					if (k == "adm_cd") {
						if(paramInfo[k] == "00") {
							continue;
						}
					}
					sopOpenApiShareForStatsObj.addParam(k, paramInfo[k]);
				} 
				
				if(params.param_info.isKosis) {
					interactiveMapKosis.org_id = paramInfo.org_id;
					interactiveMapKosis.tbl_id = paramInfo.tbl_id;
//					interactiveMapKosis.gis_se = paramInfo.gis_se;
					interactiveMapKosis.gis_se = params.param_info.gis_se_bak;
					interactiveMapKosis.kosis_data_item = paramInfo.kosis_data_item;
					interactiveMapKosis.kosis_data_period = paramInfo.kosis_data_period;
					interactiveMapKosis.kosis_data_year = paramInfo.kosis_data_year;
					interactiveMapKosis.kosis_data_item_detail = paramInfo.kosis_data_item_detail;
					interactiveMapKosis.pAdmCd = paramInfo.gis_se;
					
					sopOpenApiShareForStatsObj.request({
						method : "GET",
						async : false,
						url : kosisApiPath + params.api_call_url,
						options : {
							params : params,
						}
					});
				} else {
					//조건결합일 경우, post
					var method = "GET";
					var url = openApiPath + params.api_call_url;
					if (params.param_info.btntype == "items") {
						method = "POST";
						url = contextPath + params.api_call_url
					}else {
						sopOpenApiShareForStatsObj.addParam("accessToken", accessToken);	
					}
					
					sopOpenApiShareForStatsObj.request({
						method : method,
						async : false,
						url : url,
						options : {
							params : params,
						}
					});
				}
				
			},
			
			
			/**
			 * 
			 * @name         : openApiUserDrawForStats
			 * @description  : 사용자지정영역 조회를 수행한다.
			 * @date         : 2015. 1. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param params : 해당 통계파라미터 정보
			 * @param @param area   : 사용자 영역
			 * @param @param layer  : 사용자영역 레이어
			 */
			openApiUserDrawForStats : function(params, area, layer) {
				var url = "";
				var method = "GET";

				var sopOpenApiUserDrawForStatsObj = new sop.openApi.userDrawForStats.api();
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiUserDrawForStatsObj.addParam(params.param[i].key, params.param[i].value);
				}
				
				if (Object.prototype.toString.call( params.api_id ) === "[object Array]") {
					url = contextPath + this.API_FUSION_URL;
					method = "POST";
				}else {
					if 		(params.api_id == "API_0301") url = this.API_0301_URL;
					else if (params.api_id == "API_0302") url = this.API_0302_URL;
					else if (params.api_id == "API_0303") url = this.API_0303_URL;
					else if (params.api_id == "API_0304") url = this.API_0304_URL;
					else if (params.api_id == "API_0305") url = this.API_0305_URL;
					else if (params.api_id == "API_0306") url = this.API_0306_URL;
					else if (params.api_id == "API_0307") url = this.API_0307_URL;
					else if (params.api_id == "API_0308") url = this.API_0308_URL;
					else if (params.api_id == "API_0309") url = this.API_0309_URL;
					else if (params.api_id == "API_0310") url = this.API_0310_URL;
					
					url = openApiPath + url;
					method = "GET";
					sopOpenApiUserDrawForStatsObj.addParam("accessToken", accessToken);	
				}
				
				sopOpenApiUserDrawForStatsObj.addParam("area_type", "1");	
				sopOpenApiUserDrawForStatsObj.addParam("area", area);		
				sopOpenApiUserDrawForStatsObj.request({
					method : method,
					async : false,
					url : url,
					options : {
						params : params,
						area : area,
						layer : layer
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : openApiLoginProcess
			 * @description  : 로그인을 수행한다.
			 * @date         : 2014. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 회원 아이디
			 * @param pwd : 회원 비밀번호
			 * @param options : 옵션정보
			 */
			openApiLoginProcess : function(id, pwd) {
				var sopLoginObj = new sop.portal.login.api();
				sopLoginObj.addParam("member_id", id);
				sopLoginObj.addParam("pw", pwd);
				sopLoginObj.request({
					method : "POST",
				    async : false,
				    url : contextPath+"/ServiceAPI/member/login.json",
				    options : {
				    	id : id,
				    	pwd : pwd
				    }
				});
			},
			
			
			/*********** 로그인 프로세스 Start **********/
			openApiDeveloperLoginProcess : function(id, pwd) {
				var sopDeveloperLoginObj = new sop.portal.developerLogin.api();
				sopDeveloperLoginObj.addParam("member_id", id);
				sopDeveloperLoginObj.addParam("pw", pwd);
				sopDeveloperLoginObj.request({
				    method : "POST",
				    async : false,
				    url : developApiPath+"/member/login.json"
				});
			},
			/*********** 로그인 프로세스 End **********/
			
			
			/**
			 * 
			 * @name         : openApiStatBaseYearProcess
			 * @description  : 통계별최신년도 정보를 조회한다.
			 * @date         : 2014. 10. 17. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			openApiStatBaseYearProcess : function() {
				var searchbtnCnt = $honamMap.ui.searchbtnCnt - 1;
				var sopStatBaseYearObj = new sop.portal.statBaseYear.api();
				var param_info = new Array();
				for (var i = 0; i < $honamMap.ui.arParamList.length; i++) {
					if($honamMap.ui.arParamList[i].idx == $honamMap.ui.searchbtnCnt-1) {
						for(var x = 0; x < $honamMap.ui.arParamList[i].params.length; x ++) {
							var params = $honamMap.ui.arParamList[i].params[x];
							param_info.push(params.key);
						}
						break;
					}
				}
				
				sopStatBaseYearObj.addParam("api_id", $honamMap.ui.curSelectedDetailStatsType.substring(0,8));
				sopStatBaseYearObj.addParam("param_info", param_info);
				sopStatBaseYearObj.request({
					method : "POST",
				    async : true,
				    url : contextPath+"/ServiceAPI/map/interactive/statBaseYear.json",
				});
			},
			
			/**
			 * 
			 * @name         : openApiGeocode
			 * @description  : 지역 명칭으로 x, y 좌표를 구한다.
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param address : 검색어
			 */
			openApiGeocode : function(address) {			
				var sopOpenApiGeocodeObj = new sop.openApi.geocode.api();
				sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
				sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent(address)));
				sopOpenApiGeocodeObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath+"/OpenAPI3/addr/geocode.json",
			        options : {
			        	address : address
				    }
			    });
			},
			
			/**
			 * @name         : openApiSOP
			 * @description  : SOP 검색.
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchword 검색어
			 * @param pagenum 페이지
			 */
			openApiSOP : function(searchword, pagenum) {
				var sopOpenApiSOPObj = new sop.openApi.sopsearch.api();
				sopOpenApiSOPObj.addParam("accessToken", accessToken);
				sopOpenApiSOPObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
				sopOpenApiSOPObj.addParam("pagenum", pagenum);
				sopOpenApiSOPObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath+"/OpenAPI3/search/sop.json",
			        options : {
			        	searchword : searchword,
			        	pagenum : pagenum
			        }
			    });
			},
			
			/**
			 * @name         : openApiKOSIS
			 * @description  : KOSIS 검색
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchword 검색어
			 * @param pagenum 페이지
			 */
			openApiKOSIS : function(searchword, pagenum) {
				var sopOpenApiKOSISObj = new sop.openApi.kosissearch.api();
				sopOpenApiKOSISObj.addParam("accessToken", accessToken);
				sopOpenApiKOSISObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
				sopOpenApiKOSISObj.addParam("pagenum", pagenum);
				sopOpenApiKOSISObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath+"/OpenAPI3/search/kosis.json",
			        options : {
			        	searchword : searchword,
			        	pagenum : pagenum
			        }
			    });
			},
			
			openApiItemCombine : function(params) {
				var sopOpenApiItemCombineObj = new sop.openApi.itemcombine.api();
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiItemCombineObj.addParam(params.param[i].key,
							params.param[i].value);	
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
							
				if ( params.adm_cd != "00") {
					sopOpenApiItemCombineObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiItemCombineObj.addParam("bnd_year", params.map.bnd_year);
				sopOpenApiItemCombineObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/stats/fusionstats.json",
					options : {
						btntype : "items",
						params : params,
						url : contextPath + "/ServiceAPI/stats/fusionstats.json",
					}
				});
			},
			
			/**
			 * 
			 * @name         : searchReverseGeoCode
			 * @description  : 좌표 정보로 행정동을 조회한다.(통계표 검색)
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param stat_id API아이디
			 */
			searchReverseGeoCode : function (division, url, title) {
				var sopSearchReverseGeoCodeObj = new sop.openApi.searchReverseGeoCode.api();
				sopSearchReverseGeoCodeObj.addParam("accessToken", accessToken);
				sopSearchReverseGeoCodeObj.addParam("addr_type", "20");
				sopSearchReverseGeoCodeObj.addParam("x_coor", $honamMap.ui.x);
				sopSearchReverseGeoCodeObj.addParam("y_coor", $honamMap.ui.y);
				
				//API 고유 아이디를 뽑아온다.   ex)0301
				var startLen = url.indexOf("?type=");
				var type = url.substring(startLen+6, startLen+10);
				
				sopSearchReverseGeoCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						target : this,
						url : url,
						division : division,
						type : type,
						startLen : startLen,
						title : title
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
				
				//N/A의 경우 0으로 치환
				for (var i=0; i<result.length; i++) {
					if (result[i][params.filter] == "N/A") {
						result[i][params.filter] = "0";
					}
				}

				$honamMap.ui.data = res;
				map.drawControl.removeOverlay();

				//인구총괄일 경우, 사용자지정영역을 그릴수 없다.
				if (res.id == "API_0301") {
					//map.drawControl.disableControl("drawControl"); //draw hide
					$(mapInfo.pieChartObj).hide();
				} else {
					//map.drawControl.enableControl("drawControl"); //draw hide
				}

				// 일반검색 버튼일 경우,
				if ($honamMap.ui.searchBtnType == "normal") {	
					if (mapInfo.isTimeSeriesPlay) {
						mapInfo.timeSeriesPushData.push({
							"res" : res,
							"options": options
						});
						mapInfo.doReqTimeSeries();
						
					} else {
						map.setStatsData("normal", res, params.filter, params.unit);	
						if (params.view_type == "TS") {
							map.openApiReverseGeoCode(map.center);
						}else {
							map.autoDownBoundary();
						}
						
						//사업체 조회일 경우
						if (res.id == "API_0304") {
							if (params.noneParams != undefined && params.noneParams.class_code != undefined && 
								    params.noneParams.class_code.length > 0) {
									var tmpParams = {};
									            
									var bounds = map.gMap.getBounds();
									var area = "RECTANGLE(";
									area += bounds._southWest.x + " " + bounds._southWest.y + ",";
									area += bounds._northEast.x + " " + bounds._northEast.y;
									area += ")";
									
									tmpParams["class_code"] = params.noneParams.class_code;
									tmpParams["area_type"] = "1";
									tmpParams["area"] = area;
									tmpParams["resultcount"] = "500";
									
									for (var i=0; i<params.param.length; i++) {
										if (params.param[i].key == "year") {
											tmpParams["year"] = params.param[i].value;
											break;
										} 
									}

									if (map.zoom < 9) { 
										messageAlert.open(
												"알림", 
												"POI표출 데이터는 집계구 단위에서만 표출됩니다. 지도 레벨을 바꿔 데이터를 보시겠습니까?",  
												function done() {
													map.setZoom(10); //10->9
													setTimeout(function() {
														map.drawControl.controlGroup.poiControl.poi.interactiveMap.requestCompanyPoi(tmpParams, "0", map);
													}, 500);
												},
												function cancel() {}
										);
										
									} else {
										map.drawControl.controlGroup.poiControl.poi.interactiveMap.requestCompanyPoi(tmpParams, "0", map);
									}		
								}
						}
						
						//인구총괄의 경우, 파이차트가 의미가 없어 hide함.
						if ((res.id == "API_0301" && params.filter == "tot_ppltn") ||
							 res.id != "API_0301") {
							mapInfo.updatePieChart(options);
						}
						
						mapInfo.updateBarChart(res, options);
						mapInfo.updateLegendRange(res);
						mapInfo.updateTimeSeries(options);
						mapInfo.updateSearchTitle(options);
					}
						
					// 북마크,공유정보 설정
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "normal";
					$honamMap.ui.setShareInfo(options, "normal", map.id);
					
				} else {
					
					//범례결합시, 하나라도 통신에러나 검색결과가 없을 경우, 초기화한다.
					if ($honamMapApi.request.combineFailCnt > 0) {
						map.clearDataOverlay();
						$honamMap.ui.shareUrlInfoList = [];
						return;
					}
					map.setStatsData("combine", res, params.filter, params.unit);
					
					// 요청된 api정보가 모두 수신되었을 경우,
					if (map.combineData.length == 2) {
						map.autoDownBoundary();
						$(mapInfo.pieChartObj).hide();
						$(mapInfo.barChartObj).hide();
						$(mapInfo.timeSeriesObj).hide();
//						$("#timeSeriesDiv").hide();
						
						//결합일경우, 범례설정
						mapInfo.setLegendRange();
					}

					// 북마크,공유정보 설정
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "combine";
					$honamMap.ui.setShareInfo(options, "normal", map.id);
					
					if (map.combineData.length == 2) {
						var shareUrlInfoList = $honamMap.ui.shareUrlInfoList[map.id];
						var combineTitle = "";
						var api_ids = "";
						for( var i = 0; i < shareUrlInfoList.length; i ++ ) {
							if(i == 0) {
								combineTitle += shareUrlInfoList[i].title;
								api_ids += shareUrlInfoList[i].params.api_id;
							} else {
								combineTitle += " | " + shareUrlInfoList[i].title;
								api_ids += " | " + shareUrlInfoList[i].params.api_id;
							}
						}

						options.params.api_id = api_ids;
						options.params.title = combineTitle;
						mapInfo.updateSearchTitle(options);
					}

				}
			}
			
	};

	/** ********* OpenAPI 인구통계총괄 Start ********* */
	(function() {
		$class("sop.openApi.totalPopulation.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {	
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiTotalPopulation(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 인구통계총괄 End ********* */

	
	/** ********* OpenAPI 인구통계세부조건검색 Start ********* */
	(function() {
		$class("sop.openApi.searchPopulation.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiSearchPopulation(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 인구통계세부조건검색 End ********* */

	
	/** ********* OpenAPI 가구통계검색 Start ********* */
	(function() {
		$class("sop.openApi.houseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiHouseHold(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 가구통계검색 End ********* */

	
	/** ********* OpenAPI 가구원통계검색 Start ********* */
	(function() {
		$class("sop.openApi.houseHoldMember.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiHouseHoldMember(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 가구원통계검색 End ********* */

	
	/** ********* OpenAPI 농가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.FarmHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiFarmHouseHold(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 농가통계검색 End ********* */

	
	/** ********* OpenAPI 임가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.ForestryHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiForestryHouseHold(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 임가통계검색 End ********* */

	
	/** ********* OpenAPI 어가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.FisheryHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiFisheryHouseHold(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 어가통계검색 End ********* */

	
	/** ********* OpenAPI 산업체분류 Start ********* */
	(function() {
		$class("sop.openApi.InderstryCode.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							var tmpData = [];
							for(var i=0; i < result.length; i++) {
								
							}
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiInterstryCode(
											options.depth,
											options.class_deg,
											options.class_cd), 500);
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* OpenAPI 산업체분류 End ********* */

	
	/** ********* OpenAPI 사업체분류 Start ********* */
	(function() {
		$class("sop.openApi.Company.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiCompany(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 사업체분류 End ********* */

	
	/** ********* OpenAPI 주택분류 Start ********* */
	(function() {
		$class("sop.openApi.House.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {	
						if (res.errCd == "0") {
							$honamMapApi.request.setStatsData(res, options);
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiHouse(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							
							var map = options.params.map;
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* OpenAPI 주택분류 End ********* */

	
	/** ********* 북마크 등록시작 ********* */
	(function() {
		$class("sop.openApi.regBookmark.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							if (result.hist_type == "SHARE") {
								$(".deem").show();
								$("#sharedlg").show();
								
								var linkUrl = "";
								if (result.map_type == "IMAP") {
									linkUrl = statsPotalDomain + "/html/interactive/interactiveMap.html?"
								}else {
									linkUrl = statsPotalDomain + "/html/c/cMap.html?"
								}
								
								var urlbox = $("#sharedlg").find($("input"));
								urlbox.val(linkUrl+"key=" + result.hist_id);
								
								//트위터
								window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return}js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs"));
								//트위터
								
								//페이스북
								(function(d, s, id){
									var js, fjs = d.getElementsByTagName(s)[0];
									if (d.getElementById(id)) {return;}
									js = d.createElement(s); js.id = id;
									js.src = "//connect.facebook.net/ko_KR/sdk.js";
									fjs.parentNode.insertBefore(js, fjs);
								}(document, 'script', 'facebook-jssdk'));
							    var elemDiv = document.getElementById("facebookDiv");
							    var markup = '';
							    markup += '<div class="fb-share-button" data-href="'+urlbox.val()+'" data-layout="button"></div>';
							    elemDiv.innerHTML = markup;
							    FB.XFBML.parse(elemDiv);
								//페이스북
							}

						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 북마크 등록종료 ********* */
	
	
	/** ********* 북마크/공유 파라미터정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.statisticsHistoryParamInfo.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res) {
						var result = res.result;
						if (res.errCd == "0") {
							var infoList = result.infoList;
							$honamMap.ui.searchBtnType = "normal";
							if (infoList.length > 1) {
								$honamMap.ui.searchBtnType = "combine";
							}				
							//console.log(result);
							$honamMap.ui.setRevertParams(infoList, "share");
							$honamMapApi.request.combineFailCnt = 0;
							
							for (var i=0; i<infoList.length; i++) {
								var params = JSON.parse(infoList[i].param_info);
								infoList[i]["param_info"] = params;
								if ($honamMap.ui.searchBtnType == "combine") {
									infoList[i]["param_info"]["title"] = infoList[i].hist_nm.split(" | ")[i];
								}else {
									infoList[i]["param_info"]["title"] = infoList[i].hist_nm;
								}
								
								$honamMapApi.request.openApiShareForStats(infoList[i]);
							}	

						}  else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 북마크/공유 파라미터정보조회 종료 ********* */
	
	/** ********* 메인예시 파라미터정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.mainRecentParamInfo.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res) {
						var result = res.result;
						if (res.errCd == "0") {
							var infoList = result.infoList;
							$honamMap.ui.searchBtnType = "normal";
							if (infoList.length > 1) {
								$honamMap.ui.searchBtnType = "combine";
							}		
							
							$honamMap.ui.setRevertParams(infoList, "recent");

							for (var i=0; i<infoList.length; i++) {
								var params = JSON.parse(infoList[i].param_info);
								infoList[i]["param_info"] = params;
								if ($honamMap.ui.searchBtnType == "combine") {
									infoList[i]["param_info"]["title"] = infoList[i].title.split(" | ")[i];
								}else {
									infoList[i]["param_info"]["title"] = infoList[i].title;
								}
								$honamMapApi.request.openApiShareForStats(infoList[i]);
							}	

						}  else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 메인예시 파라미터정보조회 종료 ********* */
	
	
	/** ********* 북마크/공유 통계정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.shareForStats.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var mapId = getMapDivisionId();		//검색 시 적용 될 지도(맵 분할 시)
						var map = $honamMap.ui.mapList[mapId];
						var mapInfo = map.mapInfo;		
						var params = options.params.param_info;
						
						map.drawControl.removeOverlay();
						
						if (res.errCd == "0") {
							//N/A의 경우 0으로 치환
							for (var i=0; i<result.length; i++) {
								if (result[i][params.showData] == "N/A") {
									result[i][params.showData] = "0";
								}
							}
							
							var kosisParams = options.params.param_info;
							if(kosisParams.isKosis) {
								map.clearDataOverlay();
								mapInfo.resetMapInfo();
								
								interactiveMapKosis.tbl_id_linked = kosisParams.paramInfo.tbl_id;
								interactiveMapKosis.map = map;
								
								var year = interactiveMapKosis.kosis_data_year;
								if(year.length > 4) {
									year = year.substring(0, 4);
								}
								map.bnd_year = year;
						
								result = result.kosisData;
								interactiveMapKosis.kosis_result_data = [];
								interactiveMapKosis.kosis_result_data = result;
								interactiveMapKosis.kosis_select_menu_text = decodeURI(options.params.param_info.title);
								interactiveMapKosis.curSelectedTitle = decodeURI(options.params.param_info.title);
								interactiveMapKosis.setKosisStatsData();
								
								options["zoomlevel"] = map.zoom;
								options["center"] = map.center;
								options["dist_level"] = interactiveMapKosis.gis_se;
								
								setTimeout(function() {
									map.mapMove(
											kosisParams.mapInfo.center,
											kosisParams.mapInfo.zoomlevel, false);
								}, 500);

								if (kosisParams.mapInfo.zoomlevel == map.zoom) {
									map.openApiReverseGeoCode(kosisParams.mapInfo.center);
								}else {
									map.curDropPolygonCode = map.curPolygonCode - 1;
								}
								
								mapInfo.updateSearchTitle(decodeURI(options.params.param_info.title));
								$honamMap.ui.setShareInfo(options.params, "share", map.id);
								
								return;
							}
							res["pAdmCd"] = options.params.param_info.paramInfo.adm_cd;
							$honamMap.ui.data = res;			
							map.bnd_year = params.paramInfo.bnd_year;
							
							//인구총괄일 경우, 사용자지정영역을 그릴수 없다.
							if (res.id == "API_0301") {
								//map.drawControl.disableControl("drawControl"); //draw hide
							} else {
								//map.drawControl.enableControl("drawControl"); //draw hide
							}
							
							// 일반검색 버튼일 경우,
							if ($honamMap.ui.searchBtnType == "normal") {
								map.setStatsData("normal", res, params.showData, params.unit);
								
								map.mapMove(
										params.mapInfo.center,
										params.mapInfo.zoomlevel, false);
								if (params.mapInfo.zoomlevel == map.zoom) {
									map.openApiReverseGeoCode(params.mapInfo.center);
								}else {
									map.curDropPolygonCode = map.curPolygonCode - 1;
								}
								
								mapInfo.updateLegendRange(res);

								var params = new Array();
								for (p in options.params.param_info.paramInfo) {
									params.push({
										"key" : p,
										"value" : options.params.param_info.paramInfo[p]
									});
								}
								
								var tmpOptions = {
									params : {
										api_id : options.params.param_info.api_id,
										filter : options.params.param_info.showData,
										map : map,
										param : params,
										title : options.params.param_info.title,
										unit : options.params.param_info.unit,
										adm_cd : options.params.param_info.paramInfo.adm_cd
									},
									btntype : "items"
								}

								if (options.params.param_info.btntype != "items") {
									tmpOptions.btntype = "";
									
									//인구총괄의 경우, 파이차트 표출 x
									if ((res.id == "API_0301" && params.showData == "tot_ppltn") ||
											 res.id != "API_0301") {
										mapInfo.updatePieChart(tmpOptions);
									}
									mapInfo.updateTimeSeries(tmpOptions);
								}

								mapInfo.updateBarChart(res, tmpOptions);
								mapInfo.updateSearchTitle(tmpOptions);
								$honamMap.ui.setShareInfo(options.params, "share", map.id);
								
								//사업체 조회일 경우
								if (res.id == "API_0304") {
									if (options.params.param_info.nonParams != undefined && 
										options.params.param_info.nonParams.class_code != undefined && 
										options.params.param_info.nonParams.class_code.length > 0) {
											var tmpParams = {};
											            
											var bounds = map.gMap.getBounds();
											var area = "RECTANGLE(";
											area += bounds._southWest.x + " " + bounds._southWest.y + ",";
											area += bounds._northEast.x + " " + bounds._northEast.y;
											area += ")";
											
											tmpParams["class_code"] = options.params.param_info.nonParams.class_code;
											tmpParams["area_type"] = "1";
											tmpParams["area"] = area;
											tmpParams["resultcount"] = "500";
											
											for (var p in options.params.param_info.paramInfo) {
												if (p == "year") {
													tmpParams["year"] = options.params.param_info.paramInfo[p];
													break;
												}
											}

											if (map.zoom < 9) { 
												messageAlert.open(
														"알림", 
														"POI표출 데이터는 집계구 단위에서만 표출됩니다. 지도 레벨을 바꿔 데이터를 보시겠습니까?",  
														function done() {
															map.setZoom(10); //10->9
															setTimeout(function() {
																map.drawControl.controlGroup.poiControl.poi.interactiveMap.requestCompanyPoi(tmpParams, "0", map);
															}, 500);
														},
														function cancel() {}
												);
												
											} else {
												map.drawControl.controlGroup.poiControl.poi.interactiveMap.requestCompanyPoi(tmpParams, "0", map);
											}		
										}
								}
								

							} else {
								//범례결합시, 하나라도 통신에러나 검색결과가 없을 경우, 초기화한다.
								if ($honamMapApi.request.combineFailCnt > 0) {
									map.clearDataOverlay();
									$honamMap.ui.shareUrlInfoList = [];
									return;
								}
								map.setStatsData("combine", res, params.showData, params.unit);
								
								var combineParams = new Array();
								for (p in options.params.param_info.paramInfo) {
									combineParams.push({
										"key" : p,
										"value" : options.params.param_info.paramInfo[p]
									});
								}
								
								var tmpOptions = {
									params : {
										api_id : options.params.param_info.api_id,
										filter : options.params.param_info.showData,
										map : map,
										param : combineParams,
										title : options.params.hist_nm,
										unit : options.params.param_info.unit,
										adm_cd : options.params.param_info.paramInfo.adm_cd
									},
									btntype : "combine"
								}

								$honamMap.ui.setShareInfo(options.params, "share", map.id);
								
								// 요청된 api정보가 모두 수신되었을 경우,
								if (map.combineData.length == 2) {
									map.mapMove(
											params.mapInfo.center,
											params.mapInfo.zoomlevel);
									
									map.curDropPolygonCode = map.curPolygonCode - 1;
									$(mapInfo.pieChartObj).hide();
									$(mapInfo.barChartObj).hide();
									$(mapInfo.timeSeriesObj).hide();
									
									var shareUrlInfoList = $honamMap.ui.shareUrlInfoList[map.id];
									var api_ids = "";
									for( var i = 0; i < shareUrlInfoList.length; i ++ ) {
										if(i == 0) {
											api_ids += shareUrlInfoList[i].params.api_id;
										} else {
											api_ids += " | " + shareUrlInfoList[i].params.api_id;
										}
									}

									tmpOptions.params.api_id = api_ids;
									mapInfo.updateSearchTitle(tmpOptions);
//									$("#timeSeriesDiv").hide();
									
									mapInfo.setLegendRange();
								}
								
							}
							
						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiShareForStats(options.params), 500);
						} else {
							$honamMapApi.request.combineFailCnt++;
							messageAlert.open(
									"알림", 
									res.errMsg,
									function done() {
//										$mapNavigation.ui.sidoSelectSet(1);
									}
							);
							
						}
					},
					onFail : function(status, options) {
						var mapId = getMapDivisionId();		//검색 시 적용 될 지도(맵 분할 시)
						var map = $honamMap.ui.mapList[mapId];
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* 북마크/공유 통계정보조회 종료 ********* */

	
	/** ********* 로그인 시작 ********* */
	(function() {
		$class("sop.portal.login.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							var result = res.result;
							sessionInfo();
							$(".deem").hide();
							$(".login_pop").hide();
							
							$honamMapApi.request.openApiRegBookmark(
									$honamMap.ui.shareUrlInfoList[parseInt($honamMap.ui.curMapId)], 
									$honamMap.ui.share_type,
									$honamMap.ui.curMapId+1);
							
							//개발자 로그인
							$honamMapApi.request.openApiDeveloperLoginProcess(options.id, options.pwd);
							
						} else {
							messageAlert.open("알림", res.errMsg);
							
							//비밀번호 초기화
							$(".plogin_pw").val("");
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 로그인 종료 ********* */
	
	/** ********* 개발자 로그인 시작 ********* */
	(function() {
		$class("sop.portal.developerLogin.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
						} else {
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 개발자 로그인 종료 ********* */
	
	
	/** ********* 통계별최신년도정보 조회 시작 ********* */
	(function() {
		$class("sop.portal.statBaseYear.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							var result = res.result;
							if(result.base_year != null) {
								var searchbtnCnt = $honamMap.ui.searchbtnCnt - 1;
								var param_info = null;
								var tmpParamList = null;
								for (var i = 0; i < $honamMap.ui.arParamList.length; i++) {
									if($honamMap.ui.arParamList[i].idx == searchbtnCnt) {
										tmpParamList = $honamMap.ui.arParamList[i];
										param_info = tmpParamList.params;
										break;
									}
								}
								
								var maxYear = "";
								if (param_info != null) {
									for(var i = 0; i < param_info.length; i ++) {
										if(param_info[i].key == "year") {
											param_info[i].value = result.base_year;
											maxYear = result.base_year;
											break;
										}
									}
									if(tmpParamList != null) {
										tmpParamList["maxYear"] = maxYear;
									}
								}
							}
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 통계별최신년도정보 조회 종료 ********* */
	
	/** ********* 사용자지정영역검색 시작 ********* */
	(function() {
		$class("sop.openApi.userDrawForStats.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							var result = res.result[0];
							var radius = 0;
							if (options.layer.layer.layerType == "circle") {
								radius = parseFloat(options.layer.layer._mRadius);
							}else {
								radius = 100;
							}
							var html = "<table style='width:"+ radius +"px; margin-top:-40px; margin-left:-"+radius/2+"px'>";
								
							//사용자 지정데이터가 5미만 일시, N/A로 처리=> 개인정보이슈
							if (parseFloat(result[options.params.filter]) <= 5) {
								html += "<tr>";
								html += 	"<td align='center' style='font-size:2.0em; color:#262626';>";
								html += 	"N/A";
								html += 	"</td>"
								html += "</tr>";
							}else {
								html += "<tr>";
								html += 	"<td align='center' style='font-size:2.0em; color:#262626'; font-weight:bold>";
								html += 	appendCommaToNumber(result[options.params.filter]);
								html += 	"<span style='font-size:12px;'>(" + options.params.unit + ")</span>";
								html += 	"</td>";
								html += "</tr>";	
							} 
							html += "</table>";
							
							options.layer.layer.setCaption({
								title : html,
								showAllZoomLevel : false
							});
							
						} else {
							options.layer.shapeGroup.thisShapeRemove();
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						options.layer.shapeGroup.thisShapeRemove();
					}
				});
	}());
	/** ********* 사용자지정영역검색 종료 ********* */
	
	/*********** (통계표) OpenAPI 지오코딩 검색 Start **********/
	(function() {
	    $class("sop.openApi.geocode.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {	        
	            if(res.errCd == "0") {
	            	var result = res.result;
	            	for(var  i = 0; i < result.resultdata.length; i ++) {
	            		var dongCd = "";
	            		if(result.resultdata[i].addr_type == "1") {		//시도
	            			dongCd = "00";
	            		} else if(result.resultdata[i].addr_type == "2") {	//시군구
	            			dongCd = "00000";
	            		} else {
	            			dongCd = "0000000";	//읍면동
	            		}
	            		
	            		var arrayKey = $honamMap.ui.sKeyword.split(" ");
	            		if(arrayKey.length < 2) {
	            			$honamMap.ui.addressAdmCd = "";
	            			$honamMap.ui.x = "962202";
		            		$honamMap.ui.y = "1839421";
	            		} else {
	            			$honamMap.ui.addressAdmCd = dongCd;
	            			$honamMap.ui.x = result.resultdata[i].x;
		            		$honamMap.ui.y = result.resultdata[i].y;
	            		}
	            		
	            		break;
	            	}
	            } else if (res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($honamMapApi.request.openApiGeocode(options.address), 500);
	            }  else if (res.errCd == "-100") {
	            	$honamMap.ui.addressAdmCd = "";
        			$honamMap.ui.x = "962202";
            		$honamMap.ui.y = "1839421";
	            }
	            else {
	                //messageAlert.open("알림", res.errMsg);
	            }
	            
	            //SOP 검색
	            var arrayKey = $honamMap.ui.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$honamMapApi.request.openApiSOP($honamMap.ui.sKeyword, $honamMap.ui.sopCurrentPageIndex);
	            } else {
	            	$honamMapApi.request.openApiSOP($honamMap.ui.searchKeyword, $honamMap.ui.sopCurrentPageIndex);
	            }
	            //KOSIS 검색
	            $honamMapApi.request.openApiKOSIS($honamMap.ui.sKeyword, $honamMap.ui.kosisCurrentPageIndex);
	        },
	        onFail : function(status) {
	        	//SOP 검색
	        	var arrayKey = $honamMap.ui.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$honamMapApi.request.openApiSOP($honamMap.ui.sKeyword, $honamMap.ui.sopCurrentPageIndex);
	            } else {
	            	$honamMapApi.request.openApiSOP($honamMap.ui.searchKeyword, $honamMap.ui.sopCurrentPageIndex);
	            }
	            //KOSIS 검색
	            $honamMapApi.request.openApiKOSIS($honamMap.ui.sKeyword, $honamMap.ui.kosisCurrentPageIndex);
	        }
	    });
	}());
	/*********** (통계표) OpenAPI 지오코딩 검색 End **********/
	
	/*********** (통계표) OpenAPI SOP 검색 Start **********/
	(function() {
	    $class("sop.openApi.sopsearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
            	$("#sopListTable").empty();
            	$("#sopListTablePage").empty();
	            if(res.errCd == "0") {
	            	var result = res.result;

	            	//SOP
	            	var html = "<div class='search_result_list' style='margin: 10px 10px 10px 10px;'>";
       			 	html += "<p style='font-weight: bold;'>인터랙티브맵 검색결과</p>";
       			 	html += "<ul>";
	            	for(var i = 0; i < result.resultdata.length; i++) {
	            		var elem = result.resultdata[i];            			
	            		html += "<li id='sopList_"+i+"' style='line-height: 30px;'>";
	            		html += "	<div style='float: left; font-size: 5px;'>● </div>"	//리버스지오코딩 : 법정동->행정동
	            		html += "	<div style='cursor: pointer; margin-left: 20px; font-size: 11px;' onclick=\"javascript:$honamMapApi.request.searchReverseGeoCode('sop', '"+elem.url + "','"+elem.nm+"')\">" + elem.nm + "</div>";
	            		html += "</li>";
	            	}
	            	html += "</ul>";
	            	html += "</div>";	            		            
            		$("#sopListTable").html(html);
            		
            		if(result.totalcount > 5){
            			var htmlPage = "<div id='sopPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
            			$("#sopListTablePage").html(htmlPage);
            		}
            		$honamMap.ui.sopPaging(result.totalcount, $honamMap.ui.sopCurrentPageIndex);
            		
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($honamMapApi.request.openApiSOP(options.searchword, options.pagenum), 500);
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** (통계표) OpenAPI SOP 검색 End **********/
	
	/*********** (통계표) OpenAPI KOSIS 검색 Start **********/
	(function() {
	    $class("sop.openApi.kosissearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	$("#kosisListTable").empty();
	        	$("#kosisListTablePage").empty();
	            if(res.errCd == "0") {
	            	var result = res.result;
	            	$honamMap.ui.searchKosisParam = [];
            		//KOSIS
	            	if(result.resultdata != undefined) {
	            		var html = "<div class='search_result_list' style='margin: 10px 10px 10px 10px;'>";
	            			 html += "<p style='font-weight: bold;'>행정구역통계 검색결과</p>";
	            			 html += "<ul>";
	            		for(var x = 0; x < result.resultdata.length; x ++) {
	            			var elem = result.resultdata[x];
	            			elem["type"] = "kosis";
	            			elem["adm_cd"] = $honamMap.ui.addressAdmCd;
	            			elem["x"] = $honamMap.ui.x;
	            			elem["y"] = $honamMap.ui.y;
	            			
	            			html += "<li style='line-height: 30px;'>";
	            			html += 	"<div style='float: left; font-size: 5px;'>● </div>"	//리버스지오코딩 : 법정동->행정동
	        	            html += "	<div style='cursor: pointer; margin-left: 20px; font-size: 11px;' onclick=\"javascript:$honamMapApi.request.searchReverseGeoCode('kosis', '"+x + "', '"+elem.stat_title+"')\">" /*+ elem.menu_level_nm1  + " > " */+ elem.stat_title + "</div>";
	            			html += "</li>";
	            			
	            			$honamMap.ui.searchKosisParam.push(elem);
	            		}
	            		
	            		html += "</ul>";
	            		html += "</div>";
	            		$("#kosisListTable").html(html);
	            		if(result.totalcount > 5){
		            		var htmlPage = "<div id='kosisPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span>";
		            		$("#kosisListTablePage").html(htmlPage);
	            		}
	            		$honamMap.ui.kosisPaging(result.totalcount, $honamMap.ui.kosisCurrentPageIndex);
	            	}
	            	
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($honamMapApi.request.openApiKOSIS(options.searchword, options.pagenum), 500);
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** (통계표) OpenAPI KOSIS 검색 End **********/
	
	/** ********* (통계표) OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.searchReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {		
					var result = res.result[0];
					if ($honamMap.ui.addressAdmCd != "") {
						if (options.division == "sop") {		//SOP
							if($honamMap.ui.addressAdmCd.length == 2) {
								$honamMap.ui.addressAdmCd = result.sido_cd;
							}else if ($honamMap.ui.addressAdmCd.length == 5) {
								$honamMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd;
							}else if ($honamMap.ui.addressAdmCd.length == 7) {
								$honamMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
							}else {
								$honamMap.ui.addressAdmCd = "00";
							}
						} else {	//KOSIS
							$honamMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
						}
					}
					
					
					if(options.division == "sop") {
						var elem = [];
						elem["type"] = options.type;
            			elem["adm_cd"] = $honamMap.ui.addressAdmCd;
            			elem["x"] = $honamMap.ui.x;
            			elem["y"] = $honamMap.ui.y;
            			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
            			elem["title"] = options.title;
            			$honamMap.ui.searchSOPParam = [elem];
            			$honamMap.ui.analysisSearchInfo("sop", 0);
					} else if(options.division == "kosis") {
						var x = options.url;
						$honamMap.ui.searchKosisParam[x]["adm_cd"] = $honamMap.ui.addressAdmCd;
						$honamMap.ui.searchKosisParam[x]["x"] = $honamMap.ui.x;
						$honamMap.ui.searchKosisParam[x]["y"] = $honamMap.ui.y;
						$honamMap.ui.searchKosisParam[x]["title"] = options.title;
						$honamMap.ui.analysisSearchInfo("kosis", x);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(that.searchReverseGeoCode(options.division, options.url, options.title), 500);
				}
				else {
					if(options.division == "sop") {
						var elem = [];
						elem["type"] = options.type;
            			elem["adm_cd"] = $honamMap.ui.addressAdmCd;
            			elem["x"] = $honamMap.ui.x;
            			elem["y"] = $honamMap.ui.y;
            			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
            			elem["title"] = options.title;
            			$honamMap.ui.searchSOPParam = [elem];
            			$honamMap.ui.analysisSearchInfo("sop", 0);
					} else if(options.division == "kosis") {
						var x = options.url;
						$honamMap.ui.searchKosisParam[x]["adm_cd"] = $honamMap.ui.addressAdmCd;
						$honamMap.ui.searchKosisParam[x]["x"] = $honamMap.ui.x;
						$honamMap.ui.searchKosisParam[x]["y"] = $honamMap.ui.y;
						$honamMap.ui.searchKosisParam[x]["title"] = options.title;
						$honamMap.ui.analysisSearchInfo("kosis", x);
					}
				}
			},
			onFail : function (status, options) {
				if(options.division == "sop") {
					var elem = [];
					elem["type"] = options.type;
        			elem["adm_cd"] = $honamMap.ui.addressAdmCd;
        			elem["x"] = $honamMap.ui.x;
        			elem["y"] = $honamMap.ui.y;
        			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
        			elem["title"] = options.title;
        			$honamMap.ui.searchSOPParam = [elem];
        			$honamMap.ui.analysisSearchInfo("sop", 0);
				} else if(options.division == "kosis") {
					var x = options.url;
					$honamMap.ui.searchKosisParam[x]["adm_cd"] = $honamMap.ui.addressAdmCd;
					$honamMap.ui.searchKosisParam[x]["x"] = $honamMap.ui.x;
					$honamMap.ui.searchKosisParam[x]["y"] = $honamMap.ui.y;
					$honamMap.ui.searchKosisParam[x]["title"] = options.title;
					$honamMap.ui.analysisSearchInfo("kosis", x);
				}
			}
		});
	}());
	/** ********* (통계표) OpenAPI 리버스지오코딩. End ********* */
	
	/** ********* 조건결합통계 Start ********* */
	(function() {
		$class("sop.openApi.itemcombine.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {	
						if (res.errCd == "0") {
							var params = options.params;
							var map = params.map;
							var mapInfo = map.mapInfo;
							var result = res.result;
							res["pAdmCd"] = params.adm_cd;
							//map.drawControl.enableControl("drawControl"); //draw hide
							map.drawControl.removeOverlay();
							
							//N/A의 경우 0으로 치환
							for (var i=0; i<result.length; i++) {
								if (result[i][params.filter] == "N/A") {
									result[i][params.filter] = "0";
								}
							}
							
							map.setStatsData("normal", res, params.filter, params.unit);
							map.autoDownBoundary();
							$(mapInfo.pieChartObj).hide();
							$(mapInfo.barChartObj).hide();
							$(mapInfo.timeSeriesObj).hide();
							
							mapInfo.updateSearchTitle(options);
							mapInfo.updateBarChart(res, options);
							mapInfo.updateLegendRange(res);
							
							// 북마크,공유정보 설정
							options["zoomlevel"] = map.zoom;
							options["center"] = map.center;
							options["btntype"] = "items";
							$honamMap.ui.setShareInfo(options, "normal", map.id);

						} else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout($honamMapApi.request.openApiItemCombine(options.params), 500);
						} else {
							var map = options.params.map;
							//map.clearData();
							map.clearDataOverlay();
							map.mapInfo.resetMapInfo();
							//map.mapInfo.updateSearchTitle(options);
							map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* 조건결합통계 End ********* */
	
	/** ********* 호남청 담당자 조회 시작 ********* */
	(function() {
		$class("sop.openApi.personInfoList.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							var map = $honamMap.ui.mapList[0];
							var mapInfo = map.mapInfo;
							
							map.markers.clearLayers();
							for (var i=0; i<$honamMap.ui.markerGroup.length; i++) {
								map.gMap.removeLayer($honamMap.ui.markerGroup[i].marker);
							}
							$honamMap.ui.markerGroup = [];
							
							mapInfo.resetMapInfo();
							mapInfo.showPersonList(res,options.categories, options.office);
							
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 호남청 담당자 조회 종료 ********* */
	
	/** ********* 세부조사별 담당자 조회 시작 ********* */
	(function() {
		$class("sop.openApi.personInfoListForCategory.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							var map = $honamMap.ui.mapList[0];
							var mapInfo = map.mapInfo;
							mapInfo.checkPerson(res.result, options.category2);
							
							
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 세부조사별 담당자 조회 종료 ********* */
	
	/** ********* 호남청 담당자가 조사할 주소 조회 시작 ********* */
	(function() {
		$class("sop.openApi.addressInfoList.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							var map = $honamMap.ui.mapList[0];
							var mapInfo = map.mapInfo;
							var tmpMarkerGroup = [];
							var person = "";
							var info = "";
							var markerGroup = null;
							var isCluster = $("#marcker_cluster").is(":checked");
							
							for (var d in result) {
								
								markerGroup = sop.featureGroup();
								if (!isCluster) {
									map.gMap.addLayer(markerGroup);
								} 
								
								for (var i=0; i<result[d][0].length; i++) {
									var info = result[d][0][i];
									person = info.person;
									
									var html =  "<table style='margin:10px;'>" 
									      + "<tr>" 								
									      + "<td style='width:200px;color:#3792de;font-size:12px;font-weight:bold;'>세부사항</td>"
									      + "</tr>"
									      + "<tr style='height:1px;background-color:#0080c6'></tr>" 
									      + "<tr style='height:10px;'></tr>";
								
										if (info.person != undefined) {
											html += "<tr>"
												+ "<td style='font-size:11px'>" + info.person + "</td>"
												+ "</tr>"
												+ "<tr style='height:5px;'></tr>";	
										}
										
										if (info.category1 != undefined) {
											html += "<tr>"
												+ "<td style='font-size:11px'>" + mapInfo.rsc_nm[info.category1] + ", "+mapInfo.drsc_nm[info.category2]+"</td>"
												+ "</tr>"
												+ "<tr style='height:5px;'></tr>";	
										}

										if (info.office != undefined) {
											html += "<tr>"
												+ "<td style='font-size:11px'>" + mapInfo.office[info.office] + "</td>"
												+ "</tr>"
												+ "<tr style='height:5px;'></tr>";	
										}
										
										if (info.addr != undefined) {
											html += "<tr>"
												+ "<td style='font-size:11px'>" + info.addr + "</td>"
												+ "</tr>"
												+ "<tr style='height:5px;'></tr>";	
										}
							
										html += "</table>";
										
										var icon = null;
										if( map.zoom  <= 5 ) {
					                        icon = new sop.DivIcon({html: '<div class="marker-icon" style="width:7px;height:7px;margin-top:-4px;"><span"></span></div>', className: "marker-"+info.category1+"-small", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
										} else if( map.zoom == 6 ) {
											icon = new sop.DivIcon({html: '<div class="marker-icon" style="width:20px;height:20px;margin-top:-4px;"><span></span></div>', className: "marker-"+info.category2+"-middle", iconSize: new sop.Point(20, 20), iconAnchor: new sop.Point(10,10), infoWindowAnchor: new sop.Point(1,-10)});	
					                    } else if( map.zoom > 6 ) {
					                    	icon = new sop.DivIcon({html: '<div class="marker-icon" style="width:20px;height:20px;margin-top:-4px;"><span>' + options.no + '</span></div>', className: "marker-"+info.category2+"-middle", iconSize: new sop.Point(20, 20), iconAnchor: new sop.Point(10,10), infoWindowAnchor: new sop.Point(1,-10)});
					                    }/* else if( map.zoom > 9 ) {
					                        icon = new sop.DivIcon({html: '<div class="marker-icon"><span>' + options.no + '</span></div>', className: "marker-"+info.category2+"-big", iconSize: new sop.Point(30, 40), iconAnchor: new sop.Point(15,40), infoWindowAnchor: new sop.Point(1,-40)});
					                    }*/

										var curMarker = map.addHonamMarker(info.x_coord, info.y_coord, {
								    		tooltipMsg : html,
								    		visible : false,
								    		icon : icon,
								    		divIconLists : [
							    			                //new sop.DivIcon({html: '<div class="marker-icon"><span>' + options.no + '</span></div>', className: "marker-"+info.category2+"-big", iconSize: new sop.Point(30, 40), iconAnchor: new sop.Point(15,40), infoWindowAnchor: new sop.Point(1,-40)}),
							    			                new sop.DivIcon({html: '<div class="marker-icon" style="width:20px;height:20px;margin-top:-4px;"><span>' + options.no + '</span></div>', className: "marker-"+info.category2+"-middle", iconSize: new sop.Point(20, 20), iconAnchor: new sop.Point(10,10), infoWindowAnchor: new sop.Point(1,-10)}),
									                        new sop.DivIcon({html: '<div class="marker-icon" style="width:20px;height:20px;margin-top:-4px;"><span></span></div>', className: "marker-"+info.category2+"-middle", iconSize: new sop.Point(20, 20), iconAnchor: new sop.Point(10,10), infoWindowAnchor: new sop.Point(1,-10)}),
									                        new sop.DivIcon({html: '<div class="marker-icon" style="width:7px;height:7px;margin-top:-4px;"><span></span></div>', className: "marker-"+info.category1+"-small", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)}),            
							    			],
								    		options : {
								    			addr : info.addr,
								    			adm_cd: info.adm_cd,
								    			category1 : info.category1,
								    			category2 : info.category2,
								    			office : info.office,
								    			person : info.person,
								    			
								    		}
								    	});
										
										if (!isCluster) {
											markerGroup.addLayer(curMarker);
										}else {
											markerGroup.addLayer(curMarker);
											map.markers.addLayer(curMarker);
										}
							    	}
								
									$honamMap.ui.markerGroup.push({
										marker:markerGroup, 
										person:d, 
										category1:options.category1, 
										category2:options.category2
									});
								
								}
								
						    } else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 호남청 담당자가 조사할 주소 조회 종료 ********* */

}(window, document));

function getSession() {

};