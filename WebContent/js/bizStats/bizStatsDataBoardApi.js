/**
 * 생활업종 통계지도 데이터보드 API에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/05  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$bizStatsDataBoardApi = W.$bizStatsDataBoardApi || {};
		
	$bizStatsDataBoardApi.request = {
			
			/**
			 * 
			 * @name         : introSidoPieChart
			 * @description  :	인트로 생활업종 현황 시도 Pie차트
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			introSidoPieChart : function(options) {
				var sopPortalSidoLifeInfoObj = new sop.portal.sidoLifeInfo.api();
				sopPortalSidoLifeInfoObj.addParam("accessToken", accessToken);
				sopPortalSidoLifeInfoObj.addParam("sido_cd", options.params.adm_cd);
				sopPortalSidoLifeInfoObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sidotobinfo.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0611",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : introCountryPieChart
			 * @description  :	인트로 생활업종 현황 전국 Pie차트
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			introCountryPieChart : function(options) {
				var sopPortalCountryLifeInfoObj = new sop.portal.countryLifeInfo.api();
				sopPortalCountryLifeInfoObj.addParam("accessToken", accessToken);
				sopPortalCountryLifeInfoObj.addParam("sido_cd", "00");
				sopPortalCountryLifeInfoObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sidotobinfo.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0611",
			        	params : {
			        		adm_cd : "00",
			        		adm_nm : "전국"
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : introSidoRank
			 * @description  :	인트로 생활업종 현황
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			introSidoRank : function(options) {
				var sopPortalSidoRankObj = new sop.portal.sidoRank.api();
				sopPortalSidoRankObj.addParam("accessToken", accessToken);
				sopPortalSidoRankObj.addParam("sido_cd", options.params.adm_cd);
				sopPortalSidoRankObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sidotobrank.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0612",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		theme_cd : options.params.theme_cd
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : introSidoDetailChart
			 * @description  :	인트로 세부업종별 현황 시도 차트 (꽃모양)
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	:  options
			 * @history 	 :
			 */
			introSidoDetailChart : function(options) {
				var sopPortalSidoDetailChartObj = new sop.portal.sidoDetailChart.api();
				sopPortalSidoDetailChartObj.addParam("accessToken", accessToken);
				sopPortalSidoDetailChartObj.addParam("sido_cd", options.params.adm_cd);
				sopPortalSidoDetailChartObj.addParam("theme_cd", options.params.theme_cd);
				sopPortalSidoDetailChartObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sidotobgroup.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0613",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		theme_cd : options.params.theme_cd
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : introCountyDetailChart
			 * @description  :	인트로 세부업종별 현황 전국 차트 (꽃모양)
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	:  options
			 * @history 	 :
			 */
			introCountryDetailChart : function(options) {
				var sopPortalCountryDetailChartObj = new sop.portal.countryDetailChart.api();
				sopPortalCountryDetailChartObj.addParam("accessToken", accessToken);
				sopPortalCountryDetailChartObj.addParam("sido_cd", "00");
				sopPortalCountryDetailChartObj.addParam("theme_cd", options.params.theme_cd);
				sopPortalCountryDetailChartObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sidotobgroup.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0613",
			        	params : {
			        		adm_cd : "00",
			        		adm_nm : "전국",
			        		theme_cd : options.params.theme_cd
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : introSidoDetailRank
			 * @description  :	인트로 생활업종 세분류 현황
			 * @date         : 2015. 11. 06. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			introSidoDetailRank : function(options) {
				var type = "";
				if(options.params.theme_cd == "10") {	//서비스
					type = "2";
				} else if(options.params.theme_cd == "20") {		//도소매
					type = "1";
				} else if(options.params.theme_cd == "40") {		//숙박
					type = "3";
				} else if(options.params.theme_cd == "50") {		//음식점
					type = "0";
				}
				var sopPortalSidoDetailRankObj = new sop.portal.sidoDetailRank.api();
				sopPortalSidoDetailRankObj.addParam("accessToken", accessToken);
				sopPortalSidoDetailRankObj.addParam("type", type);
				sopPortalSidoDetailRankObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sidoindexorder.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0614",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		theme_cd : options.params.theme_cd
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : jobAreaTotalInfo
			 * @description  :	업종별 지역현황 정보(사업체수, 비율...등등)
			 * @date         : 2015. 12. 01. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			jobAreaTotalInfo : function(options) {
				var sopPortalJobAreaTotalInfoObj = new sop.portal.jobAreaTotalInfo.api();
				sopPortalJobAreaTotalInfoObj.addParam("sgg_cd", options.params.adm_cd);
				sopPortalJobAreaTotalInfoObj.addParam("theme_cd", options.params.theme_cd);
				sopPortalJobAreaTotalInfoObj.addParam("accessToken", accessToken);
				sopPortalJobAreaTotalInfoObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sggtobinfo.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0616",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
							theme_cd : options.params.theme_cd
			        	},
			        	map : options.params.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : jobAreaBarChart
			 * @description  :	업종별 지역현황 차트
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			jobAreaBarChart : function(options) {
				var sopPortalJobAreaBarChartObj = new sop.portal.jobAreaBarChart.api();
				sopPortalJobAreaBarChartObj.addParam("sido_cd", options.params.adm_cd.substring(0, 2));
				sopPortalJobAreaBarChartObj.addParam("theme_cd", options.params.theme_cd);
				sopPortalJobAreaBarChartObj.addParam("accessToken", accessToken);
				sopPortalJobAreaBarChartObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sggtobrank.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0617",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
							theme_cd : options.params.theme_cd
			        	},
			        	map : options.params.map
			        }
				});
			},
			
			/**
			 * 
			 * @name         : jobChangeBarChart
			 * @description  :	업종밀집도 변화 차트
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			jobChangeBarChart : function(options) {
				var sopPortalJobChangeInfoObj = new sop.portal.jobChangeInfo.api();
				sopPortalJobChangeInfoObj.addParam("year", options.params.year);
				sopPortalJobChangeInfoObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalJobChangeInfoObj.addParam("theme_cd", options.params.theme_cd);
				
				sopPortalJobChangeInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poiCompanyTimeSeries.json",
					options : {
			        	btntype : "chart",
			        	api_id : "10016",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		year : options.params.year,
							theme_cd : options.params.theme_cd
			        	},
			        	map : options.params.map,
			        	options : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options
			        }
				});
			},
			
			/**
			 * 
			 * @name         : jobOpenBarChart
			 * @description  : 지자체 인허가 업종별 개업 현황 막대 챠트
			 * @date         : 2017 
			 * @author	     : 
			 * @param	: options
			 * @history 	 :
			 */
			jobOpenBarChart : function(options) {
				var sopPortalJobChangeInfoObj = new sop.portal.jobOpenInfo.api();
				sopPortalJobChangeInfoObj.addParam("year", options.params.year);
				sopPortalJobChangeInfoObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalJobChangeInfoObj.addParam("theme_cd", options.params.theme_cd);
				
				sopPortalJobChangeInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poiOpenTimeSeries.json",
					options : {
			        	btntype : "chart",
			        	api_id : "10023",
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		year : options.params.year,
							theme_cd : options.params.theme_cd
			        	},
			        	map : options.params.map,
			        	options : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options
			        }
				});
			},
			
			/**
			 * 
			 * @name         : jobBestBarChart
			 * @description  : 업종별 뜨는 지역 막대 챠트
			 * @date         : 2017.9.20
			 * @author	     : 
			 * @param	: options
			 * @history 	 : mng_s
			 */
			jobBestBarChart : function(options, what) {
				var sopPortalJobChangeInfoObj = new sop.portal.jobBestInfo.api();
				//sopPortalJobChangeInfoObj.addParam("year", options.params.year);
				sopPortalJobChangeInfoObj.addParam("adm_cd", $bizStatsMap.ui.jobBestAdmCd);
				//sopPortalJobChangeInfoObj.addParam("theme_cd", options.params.theme_cd);
				//sopPortalJobChangeInfoObj.addParam("param_sido_cd", options.params.param_sido_cd);
				//sopPortalJobChangeInfoObj.addParam("param_sgg_cd", options.params.param_sgg_cd);
				sopPortalJobChangeInfoObj.addParam("param_job_best_from", options.params.param_job_best_from);
				sopPortalJobChangeInfoObj.addParam("param_job_best_to", options.params.param_job_best_to);
				
				if (what == undefined ) {
					what ="30"; //식품을 디폴트로
				}
				sopPortalJobChangeInfoObj.addParam("what", what);
				
				sopPortalJobChangeInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poiBestTimeSeries.json",
					options : {
			        	btntype : "chart",
			        	api_id : "10025",
			        	params : {
			        		adm_cd : $bizStatsMap.ui.jobBestAdmCd,
			        		//adm_nm : options.params.adm_nm,
			        		//year : options.params.year,
							//theme_cd : options.params.theme_cd,
							//param_sido_cd : options.params.param_sido_cd,
							//param_sgg_cd : options.params.param_sgg_cd,
							param_job_best_from : options.params.param_job_best_from,
							param_job_best_to : options.params.param_job_best_to,
							what : what
			        	},
			        	map : options.params.map,
			        	options : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options
			        }
				});
			},
			
			/**
			 * 
			 * @name         : allCompanyPplHouse
			 * @description  : 지역 총사업체, 총인구, 총가구, 총주택 조회
			 * @date         : 2015. 12. 03. 
			 * @author	     : 김성현
			 * @param 		: adm_cd
			 * @history 	 :
			 */
			allCompanyPplHouse : function(adm_cd) {
				var sopAllCompanyPplHouseObj = new sop.portal.allCompanyPplHouse.api();
				sopAllCompanyPplHouseObj.addParam("adm_cd", adm_cd);
				sopAllCompanyPplHouseObj.request({
					method : "POST",
				    async : true,
				    url : contextPath+"/ServiceAPI/bizStats/allCompanyPplHouse.json",
				    options : {
				    	api_id : adm_cd,
				    	map : $bizStatsDataBoard.ui.map
				    }
				});
			},
			
			/**
			 * 
			 * @name         : areaInfoSpiderwebChart
			 * @description  :	지역 종합정보 스파이더웹차트
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoSpiderwebChart : function(paramObj) {
				var sopPortalRegionTotalChartDrawObj = new sop.portal.regionTotalChartDraw.api();
				sopPortalRegionTotalChartDrawObj.addParam("accessToken", accessToken);
				sopPortalRegionTotalChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalRegionTotalChartDrawObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/regiontotal.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0610",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoCompanyRate
			 * @description  :	지역 종합정보 업종별 비율
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoCompanyRate : function(paramObj) {
				var sopPortalCorpdistsumChartDrawObj = new sop.portal.corpdistsumChartDraw.api();
				sopPortalCorpdistsumChartDrawObj.addParam("accessToken", accessToken);
				sopPortalCorpdistsumChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalCorpdistsumChartDrawObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/corpdistsummary.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0607",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoCompanyIndecrease
			 * @description  :	지역 종합정보 업종별 증감
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoCompanyIndecrease : function(paramObj) {
				var sopPortalCorpindecreaseChartDrawObj = new sop.portal.corpindecreaseChartDraw.api();
				sopPortalCorpindecreaseChartDrawObj.addParam("accessToken", accessToken);
				sopPortalCorpindecreaseChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalCorpindecreaseChartDrawObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/corpindecrease.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0609",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map,
			        	options : $bizStatsDataBoard.ui.mapData[$bizStatsMap.ui.curMapId].options
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoMainFacility
			 * @description  :	지역 종합정보 주요시설물
			 * @date         : 2015. 12. 29. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoMainFacility : function(paramObj) {
				var sopPortalMainFacilityChartDrawObj = new sop.portal.mainFacilityChartDraw.api();
				sopPortalMainFacilityChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalMainFacilityChartDrawObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath + "/ServiceAPI/bizStats/mainFacilityList.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "10020",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoPopulationAge
			 * @description  :	지역 종합정보 연령별 비율
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoPopulationAge : function(paramObj) {
				var sopPortalPplAgeChartDrawObj = new sop.portal.pplAgeChartDraw.api();
				sopPortalPplAgeChartDrawObj.addParam("accessToken", accessToken);
				sopPortalPplAgeChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalPplAgeChartDrawObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/pplsummary.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0602",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoPopulationGender
			 * @description  :	지역 종합정보 성별 비율
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoPopulationGender : function(paramObj) {
				var sopPortalPplGenderChartDrawObj = new sop.portal.pplGenderChartDraw.api();
				sopPortalPplGenderChartDrawObj.addParam("accessToken", accessToken);
				sopPortalPplGenderChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalPplGenderChartDrawObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/mfratiosummary.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0603",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			
			/**
			 * 
			 * @name         : areaInfoHouseholdOccupy
			 * @description  :	지역 종합정보 점유형태별 가구비율
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoHouseholdOccupy : function(paramObj) {
				var sopPortalOcptnsumChartDrawObj = new sop.portal.ocptnsumChartDraw.api();
				sopPortalOcptnsumChartDrawObj.addParam("accessToken", accessToken);
				sopPortalOcptnsumChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalOcptnsumChartDrawObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/ocptnsummary.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0606",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoHouseholdType
			 * @description  :	지역 종합정보 거처유형별 가구비율
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoHouseholdType : function(paramObj) {
				var sopPortalHousesumChartDrawObj = new sop.portal.housesumChartDraw.api();
				sopPortalHousesumChartDrawObj.addParam("accessToken", accessToken);
				sopPortalHousesumChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalHousesumChartDrawObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/housesummary.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0604",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoHousePrice
			 * @description  :	지역 종합정보 주택 거래가격
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoHousePrice : function(paramObj) {
				var sopPortalHPriceChartDrawObj = new sop.portal.hPriceChartDraw.api();
				sopPortalHPriceChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalHPriceChartDrawObj.request({
			        method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/bizStats/houseprice.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "10008",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map,
			        	options : $bizStatsDataBoard.ui.mapData[$bizStatsMap.ui.curMapId].options
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoHouseTrade
			 * @description  :	지역 종합정보 주택 거래 동향
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoHouseTrade : function(paramObj) {
				var sopPortalHTradeChartDrawObj = new sop.portal.hTradeChartDraw.api();
				sopPortalHTradeChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalHTradeChartDrawObj.request({
			        method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/bizStats/housevolume.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "10009",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map,
			        	options : $bizStatsDataBoard.ui.mapData[$bizStatsMap.ui.curMapId].options
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoHousePnilp
			 * @description  :	지역 종합정보 공시지가
			 * @date         : 2017. 01. 10. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaInfoHousePnilp : function(paramObj) {
				var sopPortalHPnilpChartDrawObj = new sop.portal.hPnilpChartDraw.api();
				sopPortalHPnilpChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalHPnilpChartDrawObj.request({
			        method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/bizStats/housepnilp.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "10021",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map,
			        	options : $bizStatsDataBoard.ui.mapData[$bizStatsMap.ui.curMapId].options
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : compareAreaData
			 * @description  : 창업지역검색 지역 비교하기 데이터 조회 (총사업체, 총인구, 총가구, 총주택)
			 * @date         : 2016. 07. 13. 
			 * @author	     : 김성현
			 * @param 		: 
			 * @history 	 :
			 */
			compareAreaData : function() {
				var sopCompareAreaDataObj = new sop.portal.compareAreaData.api();
				var admCdList = []; 
				
				//체크박스 체크된 지역
				$(".compareSelectList li a.round.on").each(function() {
					admCdList.push($(this).attr('id'));
				});
				
				if (admCdList.length < 2) {
					messageAlert.open("알림","비교 지역을 두개 이상 선택해주세요.");
					return;
				}
				
				for(var i = 0; i < admCdList.length; i ++) {
					if(i == 0) {
						sopCompareAreaDataObj.addParam("adm_cd", admCdList[i]);
					} else if(i == 1) {
						sopCompareAreaDataObj.addParam("sub_adm_cd1", admCdList[i]);
					} else if(i == 2) {
						sopCompareAreaDataObj.addParam("sub_adm_cd2", admCdList[i]);
					}
				}
				
				sopCompareAreaDataObj.request({
					method : "POST",
				    async : true,
				    url : contextPath+"/ServiceAPI/bizStats/allCompanyPplHouse.json",
				    options : {
				    	admCdList : admCdList[i],
				    	map : $bizStatsDataBoard.ui.map
				    }
				});
			},
			
			/**
			 * 
			 * @name         : areaSearchSpiderwebChart
			 * @description  :	창업지역검색 스파이더웹차트
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현
			 * @param	: paramObj	파라미터 오브젝트
			 * @history 	 :
			 */
			areaSearchSpiderwebChart : function(paramObj) {
				var sopPortalMultiRegionTotalChartDrawObj = new sop.portal.multiRegionTotalChartDraw.api();
				sopPortalMultiRegionTotalChartDrawObj.addParam("accessToken", accessToken);
				sopPortalMultiRegionTotalChartDrawObj.addParam("adm_cd", paramObj.adm_cd);
				sopPortalMultiRegionTotalChartDrawObj.request({
			        method : "GET",
			        async : true,
			        url : openApiPath + "/OpenAPI3/startupbiz/regiontotal.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0610",
			        	params : {
			        		adm_cd : paramObj.adm_cd,
			        		adm_nm : paramObj.adm_nm
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : tradeThemeRatioPieChart
			 * @description  :	상권정보 현황 지역, 전국 Pie차트
			 * @date         : 2015. 12. 04. 
			 * @author	     : 김성현
			 * @param	: tradearea_id	상권아이디
			 * @history 	 :
			 */
			tradeThemeRatioPieChart : function(tradearea_id) {
				var sopPortalTradeThemePieChartDrawObj = new sop.portal.tradeThemePieChartDraw.api();
				sopPortalTradeThemePieChartDrawObj.addParam("tradearea_id", tradearea_id);
				sopPortalTradeThemePieChartDrawObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath + "/ServiceAPI/bizStats/tradeareaRatio.json",
			        options : {
			        	tradearea_id : tradearea_id 
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : tradeThemeBarChart
			 * @description  :	상권정보 테마별 현황 Bar차트
			 * @date         : 2015. 12. 04. 
			 * @author	     : 김성현
			 * @param	: tradearea_id	상권아이디, theme_cd
			 * @history 	 :
			 */
			tradeThemeBarChart : function(tradearea_id, theme_cd) {
				var sopPortalTradeThemeBarChartDrawObj = new sop.portal.tradeThemeBarChartDraw.api();
				sopPortalTradeThemeBarChartDrawObj.addParam("tradearea_id", tradearea_id);
				sopPortalTradeThemeBarChartDrawObj.addParam("theme_cd", theme_cd);
				sopPortalTradeThemeBarChartDrawObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath + "/ServiceAPI/bizStats/tradeareacorp.json"
			    });
			},
			
			/**
			 * 
			 * @name         : areaInfoCompareChart
			 * @description  : 후보지역 비교 차트
			 * @date         : 2016. 9. 6. 
			 * @author	     : 김재상
			 * @param		 : 
			 * @history 	 : 
			 */
			areaInfoCompareChart : function() {
				var admList = []; 
				
				//체크박스 체크된 지역
				$(".compareSelectList li a.round.on").each(function() {
					admList.push( { 
						adm_cd : $(this).attr('id'), 
						adm_nm : $(this).find('.ss').text() 
					});
				});
				
				if (admList.length < 2) {
					messageAlert.open("알림","비교 지역을 두개 이상 선택해주세요.");
					return;
				}
				
				var colors = ["#f7cd19", "#e9781a", "#a177f5"];
				
				//표 초기화
				$('#factorTable tr :not([class="bor"])').remove();
				$('#detailTable tr :not([class="bor"])').remove();
				$('#detailTable tr:not([class="adm_nm"])').remove();
				
				//팝업 생성
				$bizStatsDataBoard.ui.areaInfoComparePopup();
				
				//바 차트 세팅
				this.areaInfoCompareBarChart(admList);
				
				//스파이더웹 차트 세팅
				$("#spiderChartArea").text("");
				for(var i=0; i<admList.length; i++){
					this.areaInfoCompareSpiderChart(admList[i].adm_cd, admList[i].adm_nm, "#dcharts0"+(i+1), colors[i]);
				}
				
			},
			
			/**
			 * 
			 * @name         : areaInfoCompareSpiderChart
			 * @description  : 후보지역 비교 스파이더웹 차트
			 * @date         : 2016. 9. 6. 
			 * @author	     : 김재상
			 * @param		 : adm_cd 지역코드, adm_nm 지역 이름, selector 차트 영역 셀렉터
			 * @history 	 : 
			 */
			areaInfoCompareSpiderChart : function(adm_cd, adm_nm, selector, color){
				var sopPortalAreaInfoCompareSpiderChart = new sop.portal.areaInfoCompareSpiderChart.api();
				sopPortalAreaInfoCompareSpiderChart.addParam("accessToken", accessToken);
				sopPortalAreaInfoCompareSpiderChart.addParam("adm_cd", adm_cd);
				
				var chartHtml = '';
				chartHtml += '<div class="dctb">';
				chartHtml += '	<span class="dTitle">' + adm_nm + '</span>';
				chartHtml += '	<div id="' + selector.substring(1) + '"></div>';
				chartHtml += '	<div class="fb">';
				chartHtml += '		<ul class="cateSaupLegend line type0' + selector.substr(-1) + '">';
				chartHtml += '		</ul>';
				chartHtml += '	</div>';
				chartHtml += '</div>';
				$('#spiderChartArea').append($(chartHtml));
				
				sopPortalAreaInfoCompareSpiderChart.request({
			        method : "GET",
			        async : false,
			        url : openApiPath + "/OpenAPI3/startupbiz/regiontotal.json",
			        options : {
			        	btntype : "chart",
			        	api_id : "API_0610",
			        	params : {
			        		adm_cd : adm_cd,
			        		adm_nm : adm_nm,
			        		selector : selector,
			        		color : color
			        	},
			        	map : $bizStatsDataBoard.ui.map
			        }
			    });
				
				
			},
			
			/**
			 * 
			 * @name         : areaInfoCompareBarChart
			 * @description  : 후보지역 비교 바 차트
			 * @date         : 2016. 9. 6. 
			 * @author	     : 김재상
			 * @param		 : admList 지역정보 리스트
			 * @history 	 : 
			 */
			areaInfoCompareBarChart : function(admList){
				
				var arParamList = $bizStatsLeftMenu.ui.getCurSearchParam().one; //생활업종은 첫번째맵만
				var sopPortalAreaInfoCompareBarChartObj = new sop.portal.areaInfoCompareBarChart.api();
				sopPortalAreaInfoCompareBarChartObj.addParam("accessToken", accessToken);
				
				sopPortalAreaInfoCompareBarChartObj.addParam("first_adm_cd", admList[0].adm_cd);
				sopPortalAreaInfoCompareBarChartObj.addParam("second_adm_cd", admList[1].adm_cd);
				if(admList[2]) sopPortalAreaInfoCompareBarChartObj.addParam("third_adm_cd", admList[2].adm_cd);
				
				for(var i=0; i<arParamList.params.length; i++){
					sopPortalAreaInfoCompareBarChartObj.addParam(arParamList.params[i].key, arParamList.params[i].value);
				}
				
				sopPortalAreaInfoCompareBarChartObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/Compareregiontotal.json",
					options : {
						btntype : "chart",
						api_id : "API_0610",
						params : {
							admList : admList,
							names : arParamList.names
						},
						map : $bizStatsDataBoard.ui.map,
					}
				});
			}
	};
	
	$bizStatsDataBoardApi.Util = {
			
			/**
			 * @name         : leadingZeros
			 * @description  : 한자리 숫자를 01,02 로 고정 시켜 표현 두자리 숫자의 경우 그냥 표시
			 * @date         : 2015. 07. 226. 
			 * @author	     : 최재영
			 * @param		: n 변환할 수 , digits 변환할 자리수
			 */
			leadingZeros:function (n, digits) {
				  var zero = '';
				  n = n.toString();

				  if (n.length < digits) {
				    for (var i = 0; i < digits - n.length; i++)
				      zero += '0';
				  }
				  return zero + n;
			},
	
			/**
			 * @name         : tableDataRankSort
			 * @description  : Data를 순서대로 정렬
			 * @date         : 2015. 11. 27. 
			 * @author	     : 김성현
			 * @param		: data
			 */	
			tableDataRankSort : function(data) {
				var totalSum = 0;
			 		data.sort(function(a, b) {
			 			var x = Number(a.rank);
			 			var y = Number(b.rank);
			 			if (x > y) return 1;
			 			if (x < y) return -1;
			 			return 0;
			 		});
			 		return data;
			},
			
			/**
			 * @name         : tableDataValueSort
			 * @description  : Data를 순서대로 정렬
			 * @date         : 2015. 12. 01. 
			 * @author	     : 김성현
			 * @param		: data
			 */	
			tableDataValueSort : function(data) {
				var totalSum = 0;
			 		data.sort(function(a, b) {
			 			var x = Number(a.value);
			 			var y = Number(b.value);
			 			if (x > y) return -1;
			 			if (x < y) return 1;
			 			return 0;
			 		});
			 		return data;
			},
			
			/**
			 * @name         : themeColorSet
			 * @description  : 테마코드별 색상 (최대 11개)
			 * @date         : 2015. 11. 27. 
			 * @author	     : 김성현
			 * @param		: data
			 */	
			themeColorSet : function(theme_cd) {
				var color = "";
				if(theme_cd.substring(2, 4) == "01") {
					color = "#10927f";
				} else if(theme_cd.substring(2, 4) == "02") {
					color = "#dd6796";
				} else if(theme_cd.substring(2, 4) == "03") {
					color = "#e6b966";
				} else if(theme_cd.substring(2, 4) == "04") {
					color = "#98bd66";
				} else if(theme_cd.substring(2, 4) == "05") {
					color = "#66c6f5";
				} else if(theme_cd.substring(2, 4) == "06") {
					color = "#69d798";
				} else if(theme_cd.substring(2, 4) == "07") {
					color = "#a4a9c6";
				} else if(theme_cd.substring(2, 4) == "08") {
					color = "#e19b6c";
				} else if(theme_cd.substring(2, 4) == "09") {
					color = "#8041D9";
				} else if(theme_cd.substring(2, 4) == "10") {
					color = "#CC3D3D";
				} else if(theme_cd.substring(2, 4) == "11") {
					color = "#5D5D5D";
				}
				
				return color;
			},
			
	}

	/** ********* 시도 생활업종 Pie차트 정보 Start ********* */
	$class("sop.portal.sidoLifeInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$("#introSidoPieCharts01").empty();
			var result = res.result;
			if(res.errCd == "0" && result != undefined) {
				var title = options.params.adm_nm + " 비율";
				$("#introSidoPieCharts01").highcharts({
					chart : { type: 'pie', width:256, height:120, options3d: { enabled: true, alpha: 45, beta: 0 } }, 
					exporting: { enabled: false },
					colors: ['#FFC621', '#E8771A', '#019878', '#017967'],
					title : { text : '' },
					tooltip : { enabled : true },
					plotOptions : {
						pie : {
							allowPointSelect : true,
							cursor : 'pointer',
							format : '{point.name}',
							style : {
								color : 'white', 
								"fontSize" : "11px",
								fontWeight: '',
								textShadow: ''
							},
							depth: 35,
							dataLabels : { enabled: false }
						},
						series : {
							allowPointSelect : false,
							point : {
								events : {
									click : function() {
										var themeCd = "";
										switch(this.name) {
											case "음식점" :
												themeCd = "50";
												break;
											case "서비스" :
												themeCd = "10";
												break;
											case "도소매" :
												themeCd = "20";
												break;
											case "숙박업" :
												themeCd = "40";
												break;
										}
										$bizStatsDataBoard.ui.introPieChartClick(themeCd);
									}
								}
							}
						} 
					},
					series : [ {
						name : "사업체 비율", colorByPoint : true,
						data : [{
							name : "음식점",
							y : parseFloat(result.rstrt_per)
						},{
							name : "서비스",
							y : parseFloat(result.srv_per)
						},{
							name : "도소매",
							y : parseFloat(result.whrtlsal_per)
						},{
							name : "숙박업",
							y : parseFloat(result.lodgebiz_per)
						}]
					} ]
				});
				
				//범례 생성.. 2016.08.31
				var legendData = 
					[
					 {
						 name : "음식점", 
						 cnt : result.rstrt_corp_cnt, 
						 per : result.rstrt_per,
						 iconClass : ''
					 },
					 {
						 name : "서비스",
						 cnt : result.srv_corp_cnt,
						 per : result.srv_per,
						 iconClass : 'co'
					 },
					 {
						 name : "도소매",
						 cnt : result.whrtlsal_corp_cnt,
						 per : result.whrtlsal_per,
						 iconClass : 'cg'
					 },
					 {
						 name : "숙박업",
						 cnt : result.lodgebiz_corp_cnt,
						 per : result.lodgebiz_per,
						 iconClass : 'cp'
					 }
					];
				legendCreate('#introSidoPieCharts01', legendData, result.sido_nm);
				
				//보고서 생성을 위한 데이터 저장
				$bizStatsDataBoard.ui.setReportData(
						"intro", 
						"sidoPieChart", 
						result, 
						options.map.id);
				
				//API 로그
				apiLogWrite("B0", options);
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.introSidoPieChart(options);
				});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 시도 생활업종 Pie차트 정보 Start ********* */
	
	/** ********* 전국 생활업종 Pie차트 정보 Start ********* */
	$class("sop.portal.countryLifeInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$("#introSidoPieCharts02").empty();
			var result = res.result;
			if(res.errCd == "0") {
				var title = "전국평균 비율";
				$("#introSidoPieCharts02").highcharts({
					chart : { type: 'pie', width:256, height:120, options3d: { enabled: true, alpha: 45, beta: 0 } }, 
					exporting: { enabled: false },
					colors: ['#FFC621', '#E8771A', '#019878', '#017967'],
					title : { text : '' },
					tooltip : { enabled : true },
					plotOptions : {
						pie : {
							allowPointSelect : true,
							cursor : 'pointer',
							format : '{point.name}',
							style : {
								color : 'white', 
								"fontSize" : "11px",
								fontWeight: '',
								textShadow: ''
							},
							depth: 35,
							dataLabels : { enabled: false }
						},
						series : {
							allowPointSelect : false,
							point : {
								events : {
									click : function() {
										$bizStatsDataBoard.ui.introPieChartClick(this.name);
									}
								}
							}
						} 
					},
					series : [ {
						name : "사업체 비율", colorByPoint : true,
						data : [{
							name : "음식점",
							y : parseFloat(result.rstrt_per)
						},{
							name : "서비스",
							y : parseFloat(result.srv_per)
						},{
							name : "도소매",
							y : parseFloat(result.whrtlsal_per)
						},{
							name : "숙박업",
							y : parseFloat(result.lodgebiz_per)
						}]
					} ]
				}); 
				
				// 범례생성.. 2016.08.31
				var legendData = 
					[
					 {
						 name : "음식점", 
						 cnt : result.rstrt_corp_cnt, 
						 per : result.rstrt_per,
						 iconClass : ''
					 },
					 {
						 name : "서비스",
						 cnt : result.srv_corp_cnt,
						 per : result.srv_per,
						 iconClass : 'co'
					 },
					 {
						 name : "도소매",
						 cnt : result.whrtlsal_corp_cnt,
						 per : result.whrtlsal_per,
						 iconClass : 'cg'
					 },
					 {
						 name : "숙박업",
						 cnt : result.lodgebiz_corp_cnt,
						 per : result.lodgebiz_per,
						 iconClass : 'cp'
					 }
					];
				legendCreate('#introSidoPieCharts02', legendData, result.sido_nm);
				
				//보고서 생성을 위한 데이터 저장
				$bizStatsDataBoard.ui.setReportData(
						"intro", 
						"contryPieChart", 
						result, 
						options.map.id);
				
				//API 로그
				apiLogWrite("B0", options);
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.introCountryPieChart(options);
				});
			}
		},
		onFail : function(status) {
		}
	});
	
	//범례생성.. 2016.08.31
	function legendCreate(targetId, legendData, sidoNm){
		$(targetId).next('.typelabel').remove();
		var legendObj = $("<div class='typelabel'><p class='txtSubj'>" + sidoNm + "<p></div>");
		var valueBox = $("<div class='valuebox'></div>"); 
		for(var k=0; k<legendData.length; k++){
			var value = "";
			value += "<div style='display:block;'>";
			value += 	"<span class='tit "+legendData[k].iconClass+"'>" + legendData[k].name + "</span>";
			value +=	"<div class='val'>";
			value +=		"<p class='t01'>";
			value +=			legendData[k].per + "% ";
			value +=			"<span class='t02'>(" + appendCommaToNumber(legendData[k].cnt) + ")</span>";
			value +=		"</p>";
			value +=	"</div>";
			value += "</div>";
			valueBox.append($(value));
		}
		legendObj.append(valueBox);
		legendObj.insertAfter(targetId);
	}
	/** ********* 전국 생활업종 Pie차트 정보 End ********* */
	
	/** ********* 인트로 생활업종 현황 Start ********* */
	$class("sop.portal.sidoRank.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$(".introRankChart01").empty();
			$(".introRankChart02").empty();
			$(".introRankChart03").empty();
			$(".introRankChart04").empty();
			$(".introRankChart05").empty();
			$(".introRankChart06").empty();
			var result = res.result;
			var theme_cd = options.params.theme_cd;
			
			if(res.errCd == "0") {
				var corpCntList = [];			//사업체 수
				var corpRatioList = [];			//사업체 비율
				var corpIncreaseList = [];		//사업체 증감(전년대비)
				var workerCntList = [];		//업종별 종사자 수
				var workerRatioList = [];		//업종별 종사자 비율
				var workerIncreaseList = [];		//종사자 증감(전년대비)
				
				var totalCnt = 0;
				var workerTotalCnt = 0;
				for(var i = 0; i < result.tob_rank.length; i ++) {
					var elem = result.tob_rank[i];
					var color = "";
					
					if(theme_cd && theme_cd != elem.theme_cd.substring(0, 2)) continue;
					
					if(elem.theme_cd.substring(0, 2) == "10") {	//서비스
						color = "#2980ff";
					} else if(elem.theme_cd.substring(0, 2) == "20") {	//도소매
						color = "#ffb000";
					} else if(elem.theme_cd.substring(0, 2) == "40") {	//숙박
						color = "#ff6666";
					} else if(elem.theme_cd.substring(0, 2) == "50") {	//음식점
						color = "#612a8a";
					}
					
					totalCnt += parseInt(elem.corp_cnt);
					workerTotalCnt += parseInt(elem.worker_cnt);
					corpCntList.push({"theme_nm" : elem.theme_nm, "rank" : elem.corp_cnt_rank, "value" : elem.corp_cnt, "color" : color});
					corpRatioList.push({"theme_nm" : elem.theme_nm, "rank" : elem.corp_per_rank, "value" : elem.corp_per, "color" : color});
					corpIncreaseList.push({"theme_nm" : elem.theme_nm, "rank" : elem.corp_irds_rank, "value" : elem.corp_irdsrate, "color" : color});
					workerCntList.push({"theme_nm" : elem.theme_nm, "rank" : elem.worker_cnt_rank, "value" : elem.worker_cnt, "color" : color});
					workerRatioList.push({"theme_nm" : elem.theme_nm, "rank" : elem.worker_per_rank, "value" : elem.worker_per, "color" : color});
					workerIncreaseList.push({"theme_nm" : elem.theme_nm, "rank" : elem.worker_irds_rank, "value" : elem.worker_irdsrate, "color" : color});
				}
				
				//사업체 비율정보를 수정함.
				//원래는 API에서 변경해야 하나 데이터가 없는 관계로.. 
				for (var i=0; i<corpCntList.length; i++) {
					var tmpCorpPer = parseFloat((corpCntList[i].value /totalCnt) * 100);
					corpRatioList[i].value = tmpCorpPer.toFixed(1);
				}
				
				//종사자 비율정보를 수정함.
				//원래는 API에서 변경해야 하나 데이터가 없는 관계로.. 
				for (var i=0; i<workerCntList.length; i++) {
					var tmpWorkerPer = parseFloat((workerCntList[i].value /workerTotalCnt) * 100);
					workerRatioList[i].value = tmpWorkerPer.toFixed(1);
				}

				//데이터 순위별 정렬
				corpCntList = $bizStatsDataBoardApi.Util.tableDataRankSort(corpCntList);
				corpRatioList = $bizStatsDataBoardApi.Util.tableDataRankSort(corpRatioList);
				corpIncreaseList = $bizStatsDataBoardApi.Util.tableDataRankSort(corpIncreaseList);
				workerCntList = $bizStatsDataBoardApi.Util.tableDataRankSort(workerCntList);
				workerRatioList = $bizStatsDataBoardApi.Util.tableDataRankSort(workerRatioList);
				workerIncreaseList = $bizStatsDataBoardApi.Util.tableDataRankSort(workerIncreaseList);
				
				//사업체 수 
				createSidoRank(".introRankChart01", corpCntList, "개", {});
				
				//사업체 비율
				createSidoRank(".introRankChart02", corpRatioList, "%", {});
				
				//사업체 증감(전년대비)
				createSidoRank(".introRankChart03", corpIncreaseList, "%", {
			        yAxis: {
			            min: -30, title: { text: '', align: 'left' },
			            labels: { overflow: 'justify', format : "{value}%" }
			        }
				});
				
				//업종별 종사자 수
				createSidoRank(".introRankChart04", workerCntList, "명", {});
				
				//업종별 종사자 비율
				createSidoRank(".introRankChart05", workerRatioList, "%", {});
				
				//종사자 증감(전년대비)
				createSidoRank(".introRankChart06", workerIncreaseList, "%", {
					yAxis: {
			            min: -30, title: { text: '', align: 'left' },
			            labels: { overflow: 'justify', format : "{value}%" }
			        }
				});
				
				//보고서 생성을 위한 데이터 저장
				$bizStatsDataBoard.ui.setReportData(
						"intro", 
						"introRank", 
						result, 
						options.map.id);
				
				//API 로그
				apiLogWrite("B0", options);
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.introSidoRank(options);
				});
			}
		},
		onFail : function(status) {
		}
	});
	// 생활업종 현황 그래프 function
	function createSidoRank(id, list, unit, config){
		var data = [];
		var categories = [];
		var colors = [];
		$.each( list, function(i, val){
			categories.push(val.theme_nm)
			data.push(parseFloat(val.value));
			colors.push(val.color);
		});
		
		$(id).highcharts($.extend({
			chart: {
	            type: 'bar', width:500, height: (50+(categories.length*25))
	        },
	        colors: ['#ffc622'],
	        title: { text: '' },
	        subtitle: { text: '' },
			exporting: { enabled: false },
	    	xAxis: {
	    		categories: categories,
				title: { text: null }
	        },
	        yAxis: {
	            min: 0, title: { text: '', align: 'left' },
	            labels: { overflow: 'justify', format : "{value}"+unit }
	        },
	        plotOptions: {
	        	series: {
	                states: { hover: { color:'#017967' } }
	            },
	        	bar: {
	                dataLabels: { enabled: false }
	            }
	        },
	        tooltip: {
	        	style: { padding: 0 },
	        	useHTML: true, 
	        	formatter: function() {
	        		var div = "<div class='tooltipTitle'>" + this.key + "</div>";
	        		div += "<div class='tooltipBlock'><span>" + appendCommaToNumber(this.y) + unit + "</span></div>";
	        		return (""+div+"");
	        	}
	        },
			legend : {enabled : false},
			credits: {  enabled: false },
	        series: [{
	            data: data,
	            name: '',
	            pointWidth: 20,
	        }]
	    }, config));
	}
	/** ********* 인트로 생활업종 현황 End ********* */
	
	/** ********* 인트로 세부업종별 현황 시도 차트 Start ********* */
	$class("sop.portal.sidoDetailChart.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$("#intro3dChart01").empty();
			var result = res.result;
			if(res.errCd == "0") {
				if(result == undefined) {
					return;
				}
				
				var sortedData = $.sort(result.group_attribute, 1, 'corp_cnt');
				var legendData = [];
				var seriesData = [];
				
				var colors = ['#ffc622', '#e8771a', '#019878', '#017967', '#2cd35b', '#40694e', '#f11d77', '#60391b', '#ae097c', '#98f714', '#6878d3'];
				for(var i = 0; i < sortedData.length; i ++) {		//차트 데이터 가공
					if(r = sortedData[i]){
						seriesData.push({name: r.s_theme_cd_nm, y:eval(r.corp_per), color: colors[i%11]});
						legendData.push({theme_nm: r.s_theme_cd_nm, corp_per: r.corp_per, corp_cnt: r.corp_cnt});
					}
				}
				
				$('#intro3dChart01').highcharts({
					chart: {
			            type: 'pie', width:170,height:170, margin:[20,0,0,0]
			        },
			        colors: colors,
			        exporting: {enabled : false},
			        title: { text: '' },
			        plotOptions: {
			            pie: {
			                allowPointSelect: false, cursor: 'pointer', depth: 50,
			                dataLabels: { enabled: false },
			                borderWidth:0
			            }
			        }, 
			        series: [{
			            name: '사업체 비율',
			            data : seriesData
			        }]
			    });
				
				//지역명칭
				$("#intro3dChartTitle01").html(options.params.adm_nm);
				
				//범례 생성
				createLegend("#intro3dChartArea01", legendData, colors);
				
				//API 로그
				apiLogWrite("B0", options);
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.introSidoDetailChart(options);
				});
			}
		},
		onFail : function(status) {
		}
	});
	
	/** ********* 인트로 세부업종별 현황 시도 차트 End ********* */
	
	/** ********* 인트로 세부업종별 현황 전국 차트 Start ********* */
	$class("sop.portal.countryDetailChart.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$("#intro3dChart02").empty();
			var result = res.result;
			if(res.errCd == "0") {
				if(result == undefined) {
					return;
				}

				var sortedData = $.sort(result.group_attribute, 1, 'corp_cnt');
				var legendData = [];
				var seriesData = [];
				var colors = ['#ffc622', '#e8771a', '#019878', '#017967', '#2cd35b', '#40694e', '#f11d77', '#60391b', '#ae097c', '#98f714', '#6878d3'];
				for(var i = 0; i < sortedData.length; i ++) {		//차트 데이터 가공
					if(r = sortedData[i]){
						seriesData.push({name: r.s_theme_cd_nm, y:eval(r.corp_per), color: colors[i%11]});
						legendData.push({theme_nm: r.s_theme_cd_nm, corp_per: r.corp_per, corp_cnt: r.corp_cnt});
					}
				}
				
				$('#intro3dChart02').highcharts({
					chart: {
			            type: 'pie', width:170,height:170, margin:[20,0,0,0]
			        },
			        colors: colors,
			        exporting: {enabled : false},
			        title: { text: '' },
			        plotOptions: {
			            pie: {
			                allowPointSelect: false, cursor: 'pointer', depth: 50,
			                dataLabels: { enabled: false },
			                borderWidth:0
			            }
			        }, 
			        series: [{
			            name: '사업체 비율',
			            data : seriesData
			        }]
			    });
				
				//지역명칭
				$("#intro3dChartTitle02").html(options.params.adm_nm);
				
				//범례 생성
				createLegend("#intro3dChartArea02", legendData, colors);
				
				//API 로그
				apiLogWrite("B0", options);
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.introCountryDetailChart(options);
				});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 인트로 세부업종별 현황 전국 차트 End ********* */
	
	/** ********* 인트로 세부업종별 현황 시도&전국 차트 범례 생성함수 ********* */
	function createLegend(id, sortedData, colors){
		$(id+" .valuebox").remove();
		$(id+" .btn-more").remove();
		$(id+" .hideable").remove();
		var legendHtml = '';
		for(var i=0; i<6; i++){
			if(!sortedData[i]) continue;
			if(i != 0 && i%2 == 0){
				legendHtml += '</div>';
				legendHtml += '<div class="valuebox">';
			}else if(i == 0){
				legendHtml += '<div class="valuebox">';
			}
			legendHtml += '	<div class="values">';
			legendHtml += '		<div class="title">';
			legendHtml += '			<span class="icon" style="background-color:' + colors[i%11] + ';"></span>';
			legendHtml += '			<span class="text">' + sortedData[i].theme_nm + '</span>';
			legendHtml += '		</div>';
			legendHtml += '		<div class="val">';
			legendHtml += '			<p class="t01">' + sortedData[i].corp_per + '%</p>';
			legendHtml += '			<p class="t02">' + appendCommaToNumber(sortedData[i].corp_cnt) + '개</p>';
			legendHtml += '		</div>';
			legendHtml += '	</div>';
			
		}
		legendHtml += '</div>';

		if(sortedData.length > 5){
			legendHtml += '<p class="btn-more"><a href="javascript:$(\'' + id + ' .hideable\').slideToggle();void(0);">더보기..</a></p>';
			var hideable = '';
			hideable += '<div class="typelabel hideable">';
			for(var i=6; i<sortedData.length; i++){
				if(!sortedData[i]) continue;
				if(i != 6 && i%2 == 0){
					hideable += '</div>';
					hideable += '<div class="valuebox">';
				}else if(i == 6){
					hideable += '<div class="valuebox">';
				}
				
				hideable += '<div class="values">';
				hideable += '	<div class="title">';
				hideable += '		<span class="icon" style="background-color:' + colors[i%11] + ';"></span>';
				hideable += '		<span class="text">' + sortedData[i].theme_nm + '</span>';
				hideable += '	</div>';
				hideable += '	<div class="val">';
				hideable += '		<p class="t01">' + sortedData[i].corp_per + '%</p>';
				hideable += '		<p class="t02">' + appendCommaToNumber(sortedData[i].corp_cnt) + '개</p>';
				hideable += '	</div>';
				hideable += '</div>';
			}
			hideable += '	</div>';
			hideable += '</div>';
			$(id).append($(hideable));
		}
		
		$(legendHtml).insertAfter(id+" .txtSubj");
	}
	/** ********* 인트로 세부업종별 현황 시도&전국 차트 범례 End ********* */
	
	/** ********* 인트로 세부업종별 세분류 Start ********* */
	$class("sop.portal.sidoDetailRank.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$("#introRankDetailCharts01").empty();
			$("#introRankDetailCharts02").empty();
			$("#introRankDetailCharts03").empty();
			$("#introRankDetailCharts04").empty();
			$("#introRankDetailCharts05").empty();
			$("#introRankDetailCharts06").empty();
			var result = res.result;
			if(res.errCd == "0") {
				var corpCntList = [];		//업종 수
				var corpRatioList = [];		//업종 비율
				var corpIncreaseList = [];	//업종 증감률
				var workerCntList = [];	//관련 종사자 수
				var workerRatioList = [];	//관련 종사자 비율
				var workerIncreaseList = [];	//관련 종사자 증감률
				for(var i = 0; i < result.corporation.length; i ++) {
					if(result.corporation[i].sido_cd != "00") {
						corpCntList.push({"rank" : result.corporation[i].corp_rank, "sido_cd" : result.corporation[i].sido_cd, "sido_nm" : result.corporation[i].sido_nm, "value" : result.corporation[i].corp_cnt});	
					}
					if(result.percentage[i].sido_cd != "00") {
						corpRatioList.push({"rank" : result.percentage[i].per_rank, "sido_cd" : result.percentage[i].sido_cd, "sido_nm" : result.percentage[i].sido_nm, "value" : result.percentage[i].per});	
					}
					if(result.rate_change[i].sido_cd != "00") {
						corpIncreaseList.push({"rank" : result.rate_change[i].rate_change_rank, "sido_cd" : result.rate_change[i].sido_cd, "sido_nm" : result.rate_change[i].sido_nm, "value" : result.rate_change[i].rate_change});
					}
					if(result.worker[i].sido_cd != "00") {
						workerCntList.push({"rank" : result.worker[i].worker_cnt_rank, "sido_cd" : result.worker[i].sido_cd, "sido_nm" : result.worker[i].sido_nm, "value" : result.worker[i].worker_cnt});
					}
					if(result.worker_percentage[i].sido_cd != "00") {
						workerRatioList.push({"rank" : result.worker_percentage[i].worker_per_rank, "sido_cd" : result.worker_percentage[i].sido_cd, "sido_nm" : result.worker_percentage[i].sido_nm, "value" : result.worker_percentage[i].worker_per});
					}
					if(result.worker_rate_change[i].sido_cd != "00") {
						workerIncreaseList.push({"rank" : result.worker_rate_change[i].worker_rate_change_rank, "sido_cd" : result.worker_rate_change[i].sido_cd, "sido_nm" : result.worker_rate_change[i].sido_nm, "value" : result.worker_rate_change[i].worker_rate_change_per});	
					}
				}
				
				//데이터 순위별 정렬
				corpCntList = $bizStatsDataBoardApi.Util.tableDataRankSort(corpCntList);
				corpRatioList = $bizStatsDataBoardApi.Util.tableDataRankSort(corpRatioList);
				corpIncreaseList = $bizStatsDataBoardApi.Util.tableDataRankSort(corpIncreaseList);
				workerCntList = $bizStatsDataBoardApi.Util.tableDataRankSort(workerCntList);
				workerRatioList = $bizStatsDataBoardApi.Util.tableDataRankSort(workerRatioList);
				workerIncreaseList = $bizStatsDataBoardApi.Util.tableDataRankSort(workerIncreaseList);
				
				//업종 수
				$.each( corpCntList, function( i, val ) {
					var leftValue = parseInt((i*30));
					var color = "";
					//선택한 시도일 경우 색상 변경
					if(val.sido_cd == options.params.adm_cd) {
						color = "#10927f";
						$("#introRankDetailRank01").text(val.rank+"/");
						$("#introRankDetailBarRank01").text(appendCommaToNumber(val.value)+"개");
					} else {
						color = "#8041D9";
					}
					var style ="left:"+leftValue+"px;background:"+color+";";
					var ele = '<a href="javascript:void(0)" data-subj="'+val.sido_nm+'" title="'+appendCommaToNumber(val.value)+'개" data-color='+color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.sido_nm+'</a>';
					$("#introRankDetailCharts01").prepend(ele); 
				});
				
				//업종 비율
				$.each( corpRatioList, function( i, val ) {
					var leftValue = parseInt((i*30));
					var color = "";
					//선택한 시도일 경우 색상 변경
					if(val.sido_cd == options.params.adm_cd) {
						color = "#10927f";
						$("#introRankDetailRank02").text(val.rank+"/");
						$("#introRankDetailBarRank02").text(val.value+"%");
					} else {
						color = "#8041D9";
					}
					var style ="left:"+leftValue+"px;background:"+color+";";
					var ele = '<a href="javascript:void(0)" data-subj="'+val.sido_nm+'" title="'+val.value+'%" data-color='+color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.sido_nm+'</a>';
					$("#introRankDetailCharts02").prepend(ele); 
				});
				
				//업종 증감률
				$.each( corpIncreaseList, function( i, val ) {
					var leftValue = parseInt((i*30));
					var color = "";
					//선택한 시도일 경우 색상 변경
					if(val.sido_cd == options.params.adm_cd) {
						color = "#10927f";
						$("#introRankDetailRank03").text(val.rank+"/");
						$("#introRankDetailBarRank03").text(val.value+"%");
					} else {
						color = "#8041D9";
					}
					var style ="left:"+leftValue+"px;background:"+color+";";
					var ele = '<a href="javascript:void(0)" data-subj="'+val.sido_nm+'" title="'+val.value+'%" data-color='+color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.sido_nm+'</a>';
					$("#introRankDetailCharts03").prepend(ele); 
				});
				
				//관련 종사자 수
				$.each( workerCntList, function( i, val ) {
					var leftValue = parseInt((i*30));
					var color = "";
					//선택한 시도일 경우 색상 변경
					if(val.sido_cd == options.params.adm_cd) {
						color = "#10927f";
						$("#introRankDetailRank04").text(val.rank+"/");
						$("#introRankDetailBarRank04").text(appendCommaToNumber(val.value)+"명");
					} else {
						color = "#8041D9";
					}
					var style ="left:"+leftValue+"px;background:"+color+";";
					var ele = '<a href="javascript:void(0)" data-subj="'+val.sido_nm+'" title="'+appendCommaToNumber(val.value)+'명" data-color='+color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.sido_nm+'</a>';
					$("#introRankDetailCharts04").prepend(ele); 
				});
				
				//관련 종사자 비율
				$.each( workerRatioList, function( i, val ) {
					var leftValue = parseInt((i*30));
					var color = "";
					//선택한 시도일 경우 색상 변경
					if(val.sido_cd == options.params.adm_cd) {
						color = "#10927f";
						$("#introRankDetailRank05").text(val.rank+"/");
						$("#introRankDetailBarRank05").text(val.value+"%");
					} else {
						color = "#8041D9";
					}
					var style ="left:"+leftValue+"px;background:"+color+";";
					var ele = '<a href="javascript:void(0)" data-subj="'+val.sido_nm+'" title="'+val.value+'%" data-color='+color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.sido_nm+'</a>';
					$("#introRankDetailCharts05").prepend(ele); 
				});
				
				//관련 종사자 증감률
				$.each( workerIncreaseList, function( i, val ) {
					var leftValue = parseInt((i*30));
					var color = "";
					//선택한 시도일 경우 색상 변경
					if(val.sido_cd == options.params.adm_cd) {
						color = "#10927f";
						$("#introRankDetailRank06").text(val.rank+"/");
						$("#introRankDetailBarRank06").text(val.value+"%");
					} else {
						color = "#8041D9";
					}
					var style ="left:"+leftValue+"px;background:"+color+";";
					var ele = '<a href="javascript:void(0)" data-subj="'+val.sido_nm+'" title="'+val.value+'%" data-color='+color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.sido_nm+'</a>';
					$("#introRankDetailCharts06").prepend(ele); 
				});
				
				$("a").tooltip({ 
					open: function( event, ui ) {
						$(".ui-tooltip .subj01").text($(this).attr("data-subj"));
					},
					position: {
				        my: "center bottom-40", at: "center top", 
				        using: function( position, feedback ) {
				          $( this ).css( position ).prepend("<span class='subj01'></span>");
				          $( "<div>" )
				            .addClass( "arrow" )
				            .addClass( feedback.vertical )
				            .addClass( feedback.horizontal )
				            .appendTo( this );
				        }
				    } 
				});
				
				var categories = [];			//카테고리
				var corpCntData = [];		//업종 수
				var corpRatioData = [];		//업종 비율
				var corpIncreaseData = [];	//업종 증감률
				var workerCntData = [];	//관련 종사자 수
				var workerRatioData = [];	//관련 종사자 비율
				var workerIncreaseData = [];	//관련 종사자 증감률
				var tmpCategory = [];			//임시 카테고리 저장변수
				//업종 수
				for(var i = 0; i < corpCntList.length; i ++) {
					tmpCategory.push(corpCntList[i].sido_nm);
					corpCntData.push(parseInt(corpCntList[i].value));
				}
				categories.push(tmpCategory);
				tmpCategory = [];
				//업종 비율
				for(var i = 0; i < corpRatioList.length; i ++) {
					tmpCategory.push(corpRatioList[i].sido_nm);
					corpRatioData.push(parseInt(corpRatioList[i].value));
				}
				categories.push(tmpCategory);
				tmpCategory = [];
				//업종 증감률
				for(var i = 0; i < corpIncreaseList.length; i ++) {
					tmpCategory.push(corpIncreaseList[i].sido_nm);
					corpIncreaseData.push(parseInt(corpIncreaseList[i].value));
				}
				categories.push(tmpCategory);
				tmpCategory = [];
				//관련 종사자 수
				for(var i = 0; i < workerCntList.length; i ++) {
					tmpCategory.push(workerCntList[i].sido_nm);
					workerCntData.push(parseInt(workerCntList[i].value));
				}
				categories.push(tmpCategory);
				tmpCategory = [];
				//관련 종사자 비율
				for(var i = 0; i < workerRatioList.length; i ++) {
					tmpCategory.push(workerRatioList[i].sido_nm);
					workerRatioData.push(parseInt(workerRatioList[i].value));
				}
				categories.push(tmpCategory);
				tmpCategory = [];
				//관련 종사자 증감률
				for(var i = 0; i < workerIncreaseList.length; i ++) {
					tmpCategory.push(workerIncreaseList[i].sido_nm);
					workerIncreaseData.push(parseInt(workerIncreaseList[i].value));
				}
				categories.push(tmpCategory);
				tmpCategory = [];
				
				//막대 차트
				for(var i = 1; i <= 6; i ++) {
					$("#introRankDetailBarCharts0"+i).empty();
					$("#introRankDetailBarCharts0"+i).highcharts({
						chart : { 
							type : 'column', width: 500, height: 180, spacingLeft: 40
						},
						exporting: { enabled: false },
						title : {
							text : ''
						},
						subtitle : {
							text : ''
						},
						xAxis : {
							categories : categories[i-1],
							type : 'category',
							labels : {
								rotation : -45,
								style : {
									fontSize : '11px'
								}
							}
						},
						yAxis : {
							min : 0, title : { text : '' },
							enabled : false,
							labels: {
				                enabled: false
				            }
						},
						legend : {
							enabled : false
						},
						tooltip : {
							pointFormat : '{point.y:.1f}'
						}
					});
					
					var charts = $("#introRankDetailBarCharts0"+i).highcharts();
					var idx = 0;
					var tempList = [];
					if(i == 1) {	//업종 수
						charts.addSeries({
							data : corpCntData,
							dataLabels : { enabled : false }
						});
						tempList = corpCntList;
					} else if(i == 2) {	//업종 비율
						charts.addSeries({
							data : corpRatioData,
							dataLabels : { enabled : false }
						});
						tempList = corpRatioList;
					} else if(i == 3) {	//업종 증감률
						charts.addSeries({
							data : corpIncreaseData,
							dataLabels : { enabled : false }
						});
						tempList = corpIncreaseList;
					} else if(i == 4) {	//관련 종사자 수
						charts.addSeries({
							data : workerCntData,
							dataLabels : { enabled : false }
						});
						tempList = workerCntList;
					} else if(i == 5) {	//관련 종사자 비율
						charts.addSeries({
							data : workerRatioData,
							dataLabels : { enabled : false }
						});
						tempList = workerRatioList;
					} else if(i == 6) {	//관련 종사자 증감률
						charts.addSeries({
							data : workerIncreaseData,
							dataLabels : { enabled : false }
						});
						tempList = workerIncreaseList;
					}
					
					//해당 지역 색상 변경
					for(var x = 0; x < tempList.length; x ++) {
						if(options.params.adm_cd == tempList[x].sido_cd) {
							idx = x;
							break;
						}
					}
					charts.series[0].data[idx].update({ color : '#fe5800' });
				}
				
				//API 로그
				apiLogWrite("B0", options);
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.introSidoDetailRank(options);
				});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 인트로 세부업종별 세분류 End ********* */
	
	/** ********* 업종별 지역현황 정보 Start ********* */
	$class("sop.portal.jobAreaTotalInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				if (result != undefined) { //2017.02.23
					$("#jobAreaTitle01").text(appendCommaToNumber(result.corp_cnt)+"개");
					$("#jobAreaTitle02").text(result.upregion_vs_corp_per+"%");
					$("#jobAreaTitle03").text(result.corp_vs_ppltn_rate+"명/1개");
					$("#jobAreaTitle04").text(result.corp_vs_worker_rate+"명/1개");
					$("#jobAreaTitle05").text(result.corp_vs_family_rate+"가구/1개");
					$("#jobAreaTitle06").text(appendCommaToNumber(result.biz_worker_cnt)+"명");
					$("#jobAreaTitle07").text(result.avg_worker_rate+"명");
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"jobArea", 
							"sggTobInfo", 
							result, 
							options.map.id);
					
					//API 로그
					apiLogWrite("B0", options);
				}
				
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.jobAreaTotalInfo(options);
				});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 업종별 지역현황 정보 End ********* */
	
	/** ********* 업종별 지역현황 차트 Start ********* */
	$class("sop.portal.jobAreaBarChart.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$("#jobAreaCharts01").empty();
			$("#jobAreaCharts02").empty();
			$("#jobAreaCharts03").empty();
			$("#jobAreaCharts04").empty();
			$("#jobAreaCharts05").empty();
			$("#jobAreaCharts06").empty();
			$("#jobAreaCharts07").empty();
			var result = res.result;
			if(res.errCd == "0") {
				var sggCdList = []; 				//시군구코드
				var sggNmList = []; 				//시군구명
				var corpCntList = []; 				//업체수
				var corpPerList = []; 				//상위지역대비 업종비율
				var ppltnRateList = []; 			//업체대비 거주인구(인구/업체수)
				var corpWorkerRateList = []; 			//업체대비 직장인구(직장인구/업체수)
				var familyRateList = []; 			//업체대비 가구수(가구수/업체수)
				var workerCntList = []; 			//업종종사자수
				var avgWorkerRateList = []; 			//평균종사자수(종사자수/업체수)
				
				//시군구 개수
				$(".jobAreaChartTotal").text(result.sgg_info.length);
				
				for(var i = 0; i < result.sgg_info.length; i ++) {
					var elem = result.sgg_info[i];
					corpCntList.push({"sgg_cd" : result.sido_cd+elem.sgg_cd, "sgg_nm" : elem.sgg_nm, "value" : parseInt(elem.corp_cnt)});
					corpPerList.push({"sgg_cd" : result.sido_cd+elem.sgg_cd, "sgg_nm" : elem.sgg_nm, "value" : parseFloat(elem.upregion_vs_corp_per)});
					ppltnRateList.push({"sgg_cd" : result.sido_cd+elem.sgg_cd, "sgg_nm" : elem.sgg_nm, "value" : parseFloat(elem.corp_vs_ppltn_rate)});
					corpWorkerRateList.push({"sgg_cd" : result.sido_cd+elem.sgg_cd, "sgg_nm" : elem.sgg_nm, "value" : parseFloat(elem.corp_vs_worker_rate)});
					familyRateList.push({"sgg_cd" : result.sido_cd+elem.sgg_cd, "sgg_nm" : elem.sgg_nm, "value" : parseFloat(elem.corp_vs_family_rate)});
					workerCntList.push({"sgg_cd" : result.sido_cd+elem.sgg_cd, "sgg_nm" : elem.sgg_nm, "value" : parseInt(elem.biz_worker_cnt)});
					avgWorkerRateList.push({"sgg_cd" : result.sido_cd+elem.sgg_cd, "sgg_nm" : elem.sgg_nm, "value" : parseFloat(elem.avg_worker_rate)});
				}
				
				//데이터 순위별 정렬
				corpCntList = $bizStatsDataBoardApi.Util.tableDataValueSort(corpCntList);
				corpPerList = $bizStatsDataBoardApi.Util.tableDataValueSort(corpPerList);
				ppltnRateList = $bizStatsDataBoardApi.Util.tableDataValueSort(ppltnRateList);
				corpWorkerRateList = $bizStatsDataBoardApi.Util.tableDataValueSort(corpWorkerRateList);
				familyRateList = $bizStatsDataBoardApi.Util.tableDataValueSort(familyRateList);
				workerCntList = $bizStatsDataBoardApi.Util.tableDataValueSort(workerCntList);
				avgWorkerRateList = $bizStatsDataBoardApi.Util.tableDataValueSort(avgWorkerRateList);

				//업종 수
				createJobAreaBarChart(1, corpCntList, options, {});
				//상위지역대비 업종비율
				createJobAreaBarChart(2, corpPerList, options, {});
				//업체대비 거주인구(인구/업체수)
				createJobAreaBarChart(3, ppltnRateList, options, {});
				//업체대비 직장인구(직장인구/업체수)
				createJobAreaBarChart(4, corpWorkerRateList, options, {});
				//업체대비 가구수(가구수/업체수)
				createJobAreaBarChart(5, familyRateList, options, {});
				//업종종사자수
				createJobAreaBarChart(6, workerCntList, options, {});
				//평균종사자수(종사자수/업체수)
				createJobAreaBarChart(7, avgWorkerRateList, options, {});
				
				//보고서 생성을 위한 데이터 저장
				$bizStatsDataBoard.ui.setReportData(
						"jobArea", 
						"sggTobRank", 
						result, 
						options.map.id);
						
				//API 로그
				apiLogWrite("B0", options);
				
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					$bizStatsDataBoardApi.request.jobAreaBarChart(options);
				});
			}
		},
		onFail : function(status) {
		}
	});

	//업종별 지역현황 차트 생성
	function createJobAreaBarChart(seq, list, options, config){
		var chart_unit = "개";
		
		if(seq == "1"){
			chart_unit = "개";
		}else if(seq == "2"){
			chart_unit = "%";
		}else if(seq == "3"){
			chart_unit = "명";
		}else if(seq == "4"){
			chart_unit = "명";
		}else if(seq == "5"){
			chart_unit = "가구";
		}else if(seq == "6"){
			chart_unit = "명";
		}else if(seq == "7"){
			chart_unit = "명";
			
		}
		$("#jobAreaCharts0"+seq).highcharts($.extend({
			chart : { 
				type : 'bar', width: 530, height: (50+(list.length*25))
			},
			exporting: { enabled: false },
			title : {
				text : ''
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				type : 'category',
				labels : {
					style : {
						fontSize : '11px'
					}
				}
			},
			yAxis : {
				min : 0, title : { text : '' },
				enabled : false,
				labels: {
	                enabled: true
	            }
			},
			legend : {
				enabled : false
			},
			tooltip : {
				pointFormat : '{point.y:,.0f}'+ chart_unit
			}
		}, config));
		
		var charts = $("#jobAreaCharts0"+seq).highcharts();
		var dataList = [];
		var idx = 0;
		for(var x = 0; x < list.length; x ++) {
			var tmpList = [];
			if(options.params.adm_cd == list[x].sgg_cd) {
				$("#jobAreaChartRank0"+seq).text((x+1));
				idx = x;
			}
			tmpList.push(list[x].sgg_nm);
			tmpList.push(list[x].value);
			dataList.push(tmpList);
		}
		charts.addSeries({
			data : dataList,
			dataLabels : { enabled : false }
		});
		charts.series[0].data[idx].update({ color: '#fe5800' });
		
	}
	/** ********* 업종별 지역현황 차트 End ********* */
	
	/** ********* 업종밀집도 변화 차트 Start ********* */
	$class("sop.portal.jobChangeInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$('#jobChangeBarCharts').empty();
			$(".lineTextBox").empty();
			var result = res.result;
			if(res.errCd == "0") {
				
				var categories = [];
				var dataList = [];

//				for(var i = 0; i < result.companyList.length; i ++) {
//					categories.push(result.companyList[i].base_year);
//					dataList.push(result.companyList[i].cnt);
//				}
				//2017.03.15 데이터 없는경우
				var yearList = ["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016"];
				var companyList_cpy =[0,0,0,0,0,0,0,0,0];
				var year_idx = 0;
				for(var i = 0; i < yearList.length; i ++) {
					categories.push(yearList[i]);
					if(result.companyList[i] != null){
						if(result.companyList[i].base_year == yearList[i]){
							if(result.companyList[i].cnt == null || result.companyList[i].cnt == 0){
								year_idx = yearList.indexOf(result.companyList[i].base_year);
								companyList_cpy[year_idx] = result.companyList[i].cnt;
								dataList.push(companyList_cpy[i]);
							}else{
								dataList.push(result.companyList[i].cnt);
							}						
						}else{
							year_idx = yearList.indexOf(result.companyList[i].base_year);
							companyList_cpy[year_idx] = result.companyList[i].cnt;
							dataList.push(companyList_cpy[i]);
						}
					}else{
						dataList.push(companyList_cpy[i]);
					}
				}
				
				//2014 총사업체 0000개
				$(".lineTextBox").text(options.params.year + " 총사업체 " + appendCommaToNumber(result.cntSum)+"개");
				
				$('#jobChangeBarCharts').highcharts({
			        chart: { zoomType: 'xy'},
			        colors: ['#ffc622','#218b70'],
			        exporting: { enabled: false },
			        title: { text: '' },
			        subtitle: {
			            text: ''
			        },
			        xAxis: [{
			        	categories : categories,
			            crosshair: false
			        }],
			        yAxis: [{ // Primary yAxis
			            labels: { enabled : false },
			            title: {
			                text: '',
			                style: {
			                	
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			        }, { // Secondary yAxis
			            title: {
			                text: '',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            labels: {
			            	enabled : false 
			            },
			        }],
			        tooltip: {
			            shared: false
			        },
			        legend: {
			        	enabled : false
			        },
			        series: [{
			        	name : options.options.dataBoard.themeNm,
			            type: 'column',
			            yAxis: 1,
			            data: dataList,
			            tooltip: {
			            	pointFormat: '{series.name}: <b>{point.y:,.0f}개</b><br/>',
			            },
			            zIndex: 1

			        },{
			        	name : options.options.dataBoard.themeNm,
			            yAxis: 1,
			            type: 'spline',
			            data: dataList,
			            zIndex: 2
			        }]
			    });
				
				// 시군구 조회일때 읍면동 셀렉트박스 생성
				/*$(".emdongSelect").remove();
				if(result.emdongList){
					var html = '<select class="emdongSelect">';
					html += '<option selected>전체</option>';
					for(var i=0; i<result.emdongList.length; i++){
						if(e = result.emdongList[i]){
							html += '<option value="' + e.emdong_cd + '">' + e.emdong_nm + '</option>';
						}
					}
					html += '</select>';
				
					$(".jobChangeTitle").append(html);
				}*/
				
				//보고서 생성을 위한 데이터 저장
				$bizStatsDataBoard.ui.setReportData(
						"jobChange", 
						"companyTimeseries", 
						result, 
						options.map.id);
				
				//API 로그
				//apiLogWrite("B0", options);
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 업종밀집도 변화 차트 End ********* */
	
	
	
	/** ********* 지자체 인허가 업종별 개업 현황 차트 Start ********* */
	$class("sop.portal.jobOpenInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			$('#jobOpenBarCharts').empty();
			$(".lineTextBox").empty();
			var result = res.result;
			
			//alert("지자체 인허가 업종별 개업 현황 차트 Start");
			//alert(result);
			
			if(res.errCd == "0") {
				
				var categories = [];
				var dataList = [];

//				for(var i = 0; i < result.companyList.length; i ++) {
//					categories.push(result.companyList[i].base_year);
//					dataList.push(result.companyList[i].cnt);
//				}
				
				/*
				var yearList = ["2015/1Q","2015/2Q","2015/3Q","2015/4Q"
				               ,"2016/1Q","2016/2Q","2016/3Q","2016/4Q"
				               ,"2017/1Q","2017/2Q","2017/3Q"];
				
				var companyList_cpy =[0,0,0,0,0,0,0,0,0,0,0];
				*/
				
				//mng_s 20180110
				//쿼터 추가시 변경할 파일 리스트
				//============================================================================================
				//D:\workspace_2017\statsPotal_2016\src\main\webapp\WEB-INF\jsp\map\bizStatsLeftMenu.jsp
				//D:\workspace_2017\statsPotal_2016\src\main\webapp\js\bizStats\bizStatsLeftMenu.js
				//D:\workspace_2017\statsPotal_2016\src\main\webapp\js\bizStats\bizStatsDataBoardApi.js
				//============================================================================================
				var yearList = ["2017/1Q","2017/2Q","2017/3Q","2017/4Q","2018/1Q"]; //쿼터 추가시 여기에 기술하면됨
				var companyList_cpy =[0,0,0,0,0]; //막대 그래프 개수
				
				
				var year_idx = 0;
				for(var i = 0; i < yearList.length; i ++) {
					
					//alert(result.companyList[i].base_year);
					
					categories.push(yearList[i]);
					if(result.companyList[i] != null){
						if(result.companyList[i].base_year == yearList[i]){
							
							//alert(result.companyList[i].base_year);
							
							if(result.companyList[i].cnt == null || result.companyList[i].cnt == 0){
								year_idx = yearList.indexOf(result.companyList[i].base_year);
								companyList_cpy[year_idx] = result.companyList[i].cnt;
								dataList.push(companyList_cpy[i]);
							}else{
								dataList.push(result.companyList[i].cnt);
							}						
						}else{
							year_idx = yearList.indexOf(result.companyList[i].base_year);
							companyList_cpy[year_idx] = result.companyList[i].cnt;
							dataList.push(companyList_cpy[i]);
						}
					}else{
						dataList.push(companyList_cpy[i]);
					}
				}
				
				//2015 총사업체 0000개
				$(".lineTextBox").text(options.params.year + " 개업한 총사업체 " + appendCommaToNumber(result.cntSum)+"개");
				//$(".lineTextBox").text(options.params.year + " 총사업체 " );
				
				$('#jobOpenBarCharts').highcharts({
			        chart: { zoomType: 'xy'},
			        colors: ['#ffc622','#218b70'],
			        exporting: { enabled: false },
			        title: { text: '' },
			        subtitle: {
			            text: ''
			        },
			        xAxis: [{
			        	categories : categories,
			            crosshair: false
			        }],
			        yAxis: [{ // Primary yAxis
			            labels: { enabled : false },
			            title: {
			                text: '',
			                style: {
			                	
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			        }, { // Secondary yAxis
			            title: {
			                text: '',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            labels: {
			            	enabled : false 
			            },
			        }],
			        tooltip: {
			            shared: false
			        },
			        legend: {
			        	enabled : false
			        },
			        series: [{
			        	name : options.options.dataBoard.themeNm,
			            type: 'column',
			            yAxis: 1,
			            data: dataList,
			            tooltip: {
			            	pointFormat: '{series.name}: <b>{point.y:,.0f}개</b><br/>',
			            },
			            zIndex: 1

			        },{
			        	name : options.options.dataBoard.themeNm,
			            yAxis: 1,
			            type: 'spline',
			            data: dataList,
			            zIndex: 2
			        }]
			    });
				
				// 시군구 조회일때 읍면동 셀렉트박스 생성
				/*$(".emdongSelect").remove();
				if(result.emdongList){
					var html = '<select class="emdongSelect">';
					html += '<option selected>전체</option>';
					for(var i=0; i<result.emdongList.length; i++){
						if(e = result.emdongList[i]){
							html += '<option value="' + e.emdong_cd + '">' + e.emdong_nm + '</option>';
						}
					}
					html += '</select>';
				
					$(".jobChangeTitle").append(html);
				}*/
				
				//보고서 생성을 위한 데이터 저장
				$bizStatsDataBoard.ui.setReportData(
						"jobOpen", 
						"companyTimeseries", 
						result, 
						options.map.id);
				
				//API 로그
				//apiLogWrite("B0", options);
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 지자체 인허가 업종별 개업 현황 차트 End ********* */
	
	/** ********* mng_s 업종별 뜨는 지역 차트 Start ********* */
	$class("sop.portal.jobBestInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			//$('#jobBestBarCharts').empty();
			$('#jobBestTab10').empty();
			$('#jobBestTab20').empty();
			$('#jobBestTab30').empty();
			$('#jobBestTab40').empty();
			$('#jobBestTab50').empty();
			$(".lineTextBox").empty();
			var result = res.result;
			
			var xAxisCat10 = [];	//X축 카테고리
			var xAxisCat20 = [];	//X축 카테고리
			var xAxisCat30 = [];	//X축 카테고리
			var xAxisCat40 = [];	//X축 카테고리
			var xAxisCat50 = [];	//X축 카테고리
			var xAxisCatFull = [];	//X축 카테고리
			var retDataList10 = [];	//수치 데이터
			var retDataList20 = [];	//수치 데이터
			var retDataList30 = [];	//수치 데이터
			var retDataList40 = [];	//수치 데이터
			var retDataList50 = [];	//수치 데이터
			var retDataListFull = [];	//수치 데이터
			var titleText = "업체수";		//차트 타이틀
			var labelsVisible = true;	//카테고리 표출 여부
			
			if(res.result.jobBestTab10 != undefined) {
				for(var i = 0; i < res.result.jobBestTab10.length; i ++) {
					var jobBestTab10 = res.result.jobBestTab10[i];
					xAxisCat10.push(jobBestTab10.service_nm);
					retDataList10.push(parseFloat(jobBestTab10.cnt));
				}
			}
			
			if(res.result.jobBestTab20 != undefined) {
				for(var i = 0; i < res.result.jobBestTab20.length; i ++) {
					var jobBestTab20 = res.result.jobBestTab20[i];
					xAxisCat20.push(jobBestTab20.service_nm);
					retDataList20.push(parseFloat(jobBestTab20.cnt));
				}
			}
			
			if(res.result.jobBestTab30 != undefined) {
				for(var i = 0; i < res.result.jobBestTab30.length; i ++) {
					var jobBestTab30 = res.result.jobBestTab30[i];
					xAxisCat30.push(jobBestTab30.service_nm);
					retDataList30.push(parseFloat(jobBestTab30.cnt));
				}
			}
			
			if(res.result.jobBestTab40 != undefined) {
				for(var i = 0; i < res.result.jobBestTab40.length; i ++) {
					var jobBestTab40 = res.result.jobBestTab40[i];
					xAxisCat40.push(jobBestTab40.service_nm);
					retDataList40.push(parseFloat(jobBestTab40.cnt));
				}
			}
			if(res.result.jobBestTab50 != undefined) {
				for(var i = 0; i < res.result.jobBestTab50.length; i ++) {
					var jobBestTab50 = res.result.jobBestTab50[i];
					xAxisCat50.push(jobBestTab50.service_nm);
					retDataList50.push(parseFloat(jobBestTab50.cnt));
				}
			}
			
			if(res.result.jobBestTabFull != undefined) {
				for(var i = 0; i < res.result.jobBestTabFull.length; i ++) {
					var jobBestTabFull = res.result.jobBestTabFull[i];
					xAxisCatFull.push(jobBestTabFull.service_nm);
					retDataListFull.push(parseFloat(jobBestTabFull.cnt));
				}
			}
			
			
			//===================================start of 1=========================================
			var length = res.result.jobBestTab10.length;
			height = length * 20;
			width = length * 25; //2017.02.23
			if (height < 303) {
				height = 303;
			}
			
			if (width < 480) {
				width = 480;
			}
			
			$("#jobBestTab10").css("height", height+"px");
			
			//해당지역 데이터 보기 차트 (일반)
			$('#jobBestTab10').highcharts(
			{
				chart : { 
					type : 'bar',height: height, width:500
				},
				exporting: { enabled: false },
				title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					categories: xAxisCat10,
					labels : { 
						rotation : 0,
						enabled: labelsVisible
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				/*
				plotOptions : {
					series : {
						cursor : "pointer",
						point : {
							events : {
								click : function() {
									var map = $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId];
									
									
									var title = this.category;
									map.dataGeojson.eachLayer(function(layer) {
										if (layer.feature) {
											var e = {
													target : layer,
													utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
											};
											map.setPolyLayerMouseout(e);
											layer.unbindToolTip();
											var adm_nm = layer.feature.properties.adm_nm;
											var titleList = adm_nm.split(" ");
											var tmpTitle = titleList[titleList.length-1];
											if (tmpTitle == title) {
												map.setPolyLayerMouseover(e);
												$bizStatsMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map);
											}
										}
									});
									
								}
							}
						}
					}
				},
				*/
				
				legend : {
					enabled : false
				},
				tooltip: {
					valueDecimals: 2,
					formatter: function () {
			        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
			        	} else {
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
			        	}
	                }
		        },
				series : [ {
					name : titleText,
					data : retDataList10,
					color : '#2951f2'
				} ]
			});
			
			if(res.result.jobBestTab10.length == 0) {
				$('#jobBestTab10').html("<div style='z-index:10;'>검색 결과가 존재하지 않습니다.</div>");
			}
			//=================================== end of 1 =========================================
			
			//=====================================start of 2=======================================
			var length = res.result.jobBestTab20.length;
			height = length * 20;
			width = length * 25;
			if (height < 303) {
				height = 303;
			}
			
			if (width < 480) {
				width = 480;
			}
			
			$("#jobBestTab20").css("height", height+"px");
			
			//해당지역 데이터 보기 차트 (일반)
			$('#jobBestTab20').highcharts(
			{
				chart : { 
					type : 'bar',height: height, width:500
				},
				exporting: { enabled: false },
				title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					categories: xAxisCat20,
					labels : { 
						rotation : 0,
						enabled: labelsVisible
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				
				legend : {
					enabled : false
				},
				tooltip: {
					valueDecimals: 2,
					formatter: function () {
			        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
			        	} else {
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
			        	}
	                }
		        },
				series : [ {
					name : titleText,
					data : retDataList20,
					color : '#2951f2'
				} ]
			});
			if(res.result.jobBestTab20.length == 0) {
				$('#jobBestTab20').html("<div style='z-index:10;'>검색 결과가 존재하지 않습니다.</div>");
			}
			//======================================end of 2======================================
			
			//======================================start of 3======================================
			var length = res.result.jobBestTab30.length;
			height = length * 20;
			width = length * 25; //2017.02.23
			if (height < 303) {
				height = 303;
			}
			
			if (width < 480) {
				width = 480;
			}
			
			$("#jobBestTab30").css("height", height+"px");
			
			//해당지역 데이터 보기 차트 (일반)
			$('#jobBestTab30').highcharts(
			{
				chart : { 
					type : 'bar',height: height, width:500
				},
				exporting: { enabled: false },
				title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					categories: xAxisCat30,
					labels : { 
						rotation : 0,
						enabled: labelsVisible
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				
				legend : {
					enabled : false
				},
				tooltip: {
					valueDecimals: 2,
					formatter: function () {
			        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
			        	} else {
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
			        	}
	                }
		        },
				series : [ {
					name : titleText,
					data : retDataList30,
					color : '#2951f2'
				} ]
			});
			if(res.result.jobBestTab30.length == 0) {
				$('#jobBestTab30').html("<div style='z-index:10;'>검색 결과가 존재하지 않습니다.</div>");
			}
			//==================================end of 3==========================================
			
			//===================================start of 4=========================================
			var length = res.result.jobBestTab40.length;
			height = length * 20;
			width = length * 25; //2017.02.23
			if (height < 303) {
				height = 303;
			}
			
			if (width < 480) {
				width = 480;
			}
			
			$("#jobBestTab40").css("height", height+"px");
			
			//해당지역 데이터 보기 차트 (일반)
			$('#jobBestTab40').highcharts(
			{
				chart : { 
					type : 'bar',height: height, width:500
				},
				exporting: { enabled: false },
				title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					categories: xAxisCat40,
					labels : { 
						rotation : 0,
						enabled: labelsVisible
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				
				legend : {
					enabled : false
				},
				tooltip: {
					valueDecimals: 2,
					formatter: function () {
			        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
			        	} else {
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
			        	}
	                }
		        },
				series : [ {
					name : titleText,
					data : retDataList40,
					color : '#2951f2'
				} ]
			});
			if(res.result.jobBestTab40.length == 0) {
				$('#jobBestTab40').html("<div style='z-index:10;'>검색 결과가 존재하지 않습니다.</div>");
			}
			//==================================end of 4==========================================
			
			//====================================start of 5========================================
			var length = res.result.jobBestTab50.length;
			height = length * 20;
			width = length * 25; //2017.02.23
			if (height < 303) {
				height = 303;
			}
			
			if (width < 480) {
				width = 480;
			}
			
			$("#jobBestTab50").css("height", height+"px");
			
			//해당지역 데이터 보기 차트 (일반)
			$('#jobBestTab50').highcharts(
			{
				chart : { 
					type : 'bar',height: height, width:500
				},
				exporting: { enabled: false },
				title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					categories: xAxisCat50,
					labels : { 
						rotation : 0,
						enabled: labelsVisible
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				
				legend : {
					enabled : false
				},
				tooltip: {
					valueDecimals: 2,
					formatter: function () {
			        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
			        	} else {
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
			        	}
	                }
		        },
				series : [ {
					name : titleText,
					data : retDataList50,
					color : '#2951f2'
				} ]
			});
			
			if(res.result.jobBestTab50.length == 0) {
				$('#jobBestTab50').html("<div style='z-index:10;'>검색 결과가 존재하지 않습니다.</div>");
			}
			//===================================end of 5=========================================
			
			
			//해당지역 데이터 보기 차트 (Full)
			$('#fullTargetChart').highcharts({
		        chart : { 
					type : 'column',height: 220, width:width //2017.02.23
				},
				exporting: { enabled: false },
		        title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					categories: xAxisCatFull,
					labels : { 
						rotation : -45,
						enabled: false
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				legend : {
					enabled : false
				},
		        tooltip: {
		        	valueDecimals: 2,
					formatter: function () {
			        	if(this.point.y == 0) {	//0일 경우 N/A로 처리
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">N/A</b>';
			        	} else {
			        		return 	'<span>' + this.point.category + '</span><br/>' +
			        					'<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b style="font-family:NanumBarunGothic;">' + this.point.y + '</b>';
			        	}
	                }
		        },
		        series : [ {
					name : titleText,
					data : retDataListFull,
					color : '#2951f2'
				} ]
		    });
			
			//특정 지표에서 범례가 모두 1로 나와서 초기화 버튼을 한번 클릭해준다.
			//$("#initButton_"+options.options.params.map.legend.id).click();
			//처음에는 잘 나오는데 그 다음부터는 범례를 무한 로딩한다. 이유는 모름... 쓰면 브라우저가 무한로딩에 빠짐
			
			
			//보고서 생성을 위한 데이터 저장
			$bizStatsDataBoard.ui.setReportData(
					"jobBest", 
					"companyTimeseries", 
					result, 
					options.options.params.map.id);
			
			//API 로그
			//apiLogWrite("B0", options);
			
		},
		onFail : function(status) {
		}
	});
	/** ********* mng_e 업종별 뜨는 지역 차트 End ********* */
	
	/** ********* 지역 총사업체, 총인구, 총가구, 총주택 조회 시작 ********* */
	(function() {
		$class("sop.portal.allCompanyPplHouse.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				var result = res.result;
				var map = options.map;
				if(res.errCd == "0") {
					/*2016-03-17 수정*/
					$(".areaInfoTabTotal01").text(appendCommaToNumber(result.corp_cnt) + "(개)");
					$(".areaInfoTabTotal02").text(appendCommaToNumber(result.ppltn_cnt) + "(명)");
					$(".areaInfoTabTotal03").text(appendCommaToNumber(result.family_cnt) + "(가구)");
					$(".areaInfoTabTotal04").text(appendCommaToNumber(result.resid_cnt) + "(호)");
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"allCompanyPplHouse", 
							result, 
							map.id);
				}
			},
			onFail : function(status, options) {
			}
		});
	}());
	/** ********* 지역 총사업체, 총인구, 총가구, 총주택 조회 종료 ********* */
	
	/*********** 지역 종합정보 스파이더웹차트 Start **********/
	(function() {
	    $class("sop.portal.regionTotalChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var listData = new Array();		//인구/거주/주택 특성
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			
	        			var tempData = new Array();
	        			tempData.push(parseInt(elem.resid_ppltn_per));			//거주인구비율
	        			tempData.push(parseInt(elem.job_ppltn_per));			//직장인구비율
	        			tempData.push(parseInt(elem.apart_per));			//아파트비율
	        			tempData.push(parseInt(elem.one_person_family_per));			//1인가구비율
	        			tempData.push(parseInt(elem.sixty_five_more_ppltn_per));			//65세이상인구비율
	        			tempData.push(parseInt(elem.twenty_ppltn_per));			//20대인구비율
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });

	        			//검색 지역	ex) 강남구 / 서울
	        			if(i == 0) {
	        				$("#spyChartsArea01").html(elem.adm_nm);
	        			} else if(i == 1) {
	        				$("#spyChartsArea02").html(elem.adm_nm);
	        			}
	        		}
	        		
	        		var title = '<div class="areaInfoChartTitle">';
	        		title += '	<span class="chartTitle">인구 / 거주 / 주택 특성</span>';
					title += '</div>';
					
	        		
	        		//인구특성 스파이더웹 차트
	        		$("#spyCharts01").highcharts({
	        			chart: { polar: true, type: 'line', width:500, height:300 },
	        	        colors: ['#bee51c', '#e8771a','#738ef5', '#a176f4'],
	        	        exporting: { enabled: false },
	        	        title: {
	        	            text: title,
	        	            useHTML: true,
	        	        }, 
	        	        pane: { size: '70%' }, 
	        	        xAxis: {
	        	            categories: ['거주인구', '직장인구비율', '공시지가', '1인 가구', '65세 이상 인구', '20대 인구'],
	        	            tickmarkPlacement: 'on', lineWidth: 0
	        	        }, 
	        	        yAxis: {
	        	            gridLineInterpolation: 'polygon',
	        	            lineWidth: 0,
	        	            min: 0,
	        	            labels: { enabled: false }
	        	        }, 
	        	        tooltip: {
	        	        	style: { padding: 0 },
	        	        	useHTML: true, 
	        	        	formatter: function() {
	        	        		var div = "<div class='tooltipTitle'>"+this.x+"</div>";
	        	        		div += "<div class='tooltipBlock'><span>"+this.series.name+" : " + this.y + "</span></div>";
	        	        		return (""+div+"");
	        	        	}
	        	        },
	        	        legend: {
	        	        	enabled : false
	        	        }
				    });
	        		
	        		//인구특성 차트 데이터 설정
	        		var charts01 = $("#spyCharts01").highcharts();
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts01.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list,
	        				pointPlacement: 'on'
	        			});
	        		}
	        		
	        		//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"regionTotalChart", 
							result, 
							map.id);
	        		
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoSpiderwebChart(options.params);
	            	});
	        	} else {
	        		$("#spyCharts01").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#spyCharts01").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 스파이더웹차트 End **********/
	
	/*********** 지역 종합정보 사업체비율 차트 Start **********/
	(function() {
	    $class("sop.portal.corpdistsumChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var listData = new Array();
	        		var categoryData = new Array();
	        		
	        		//표 헤더 초기화
	        		$("#areaInfoCompanyRateHeader th").remove();
	        		$("#areaInfoCompanyRateHeader tr").append("<th scope='col'>사업체</th>");
	        		
	        		var chartData = {};
	        		for(var i = 0; i < result.length; i ++) { //지역별
	        			var foodCategories = [], foodData = [];
	        			var salesCategories = [], salesData = [];
	        			var serviceCategories = [], serviceData = [];
	        			var hospitalityCategories = [], hospitalityData = [];

	        			for(var x = 0; x < result[i].theme_list.length; x ++) { //항목별 (업종 소분류별)
	        				var elem = result[i].theme_list[x];
	        				switch(elem.theme_cd.substring(0,2)){
	        					case '50': foodData.push(parseFloat(elem.dist_per)); if(i==0) foodCategories.push(elem.s_theme_cd_nm); break;
	        					case '20': salesData.push(parseFloat(elem.dist_per)); if(i==0) salesCategories.push(elem.s_theme_cd_nm); break;
	        					case '10': serviceData.push(parseFloat(elem.dist_per)); if(i==0) serviceCategories.push(elem.s_theme_cd_nm); break;
	        					case '40': hospitalityData.push(parseFloat(elem.dist_per)); if(i==0) hospitalityCategories.push(elem.s_theme_cd_nm); break;
	        				}
	        			}
	        			
	        			//표 헤더 (사업체, 지역1, 지역2, 지역3)
	        			$("#areaInfoCompanyRateHeader th:eq("+(i+1)+")").html(result[i].adm_nm);
	        			
	        			if(i==0){
	        				chartData = {
	        						food: {
	        							categories: foodCategories,
	        							series: []
	        						},
	        						sales: {
	        							categories: salesCategories,
	        							series: []
	        						},
	        						service: {
	        							categories: serviceCategories,
	        							series: []
	        						},
	        						hospitality: {
	        							categories: hospitalityCategories,
	        							series: []
	        						}
	        				};
	        			}
	        			chartData.food.series.push({name: result[i].adm_nm, data: foodData});
	        			chartData.sales.series.push({name: result[i].adm_nm, data: salesData});
	        			chartData.service.series.push({name: result[i].adm_nm, data: serviceData});
	        			chartData.hospitality.series.push({name: result[i].adm_nm, data: hospitalityData});
	        			$("#areaInfoCompanyRateHeader>tr").append("<th scope='col'>" + result[i].adm_nm + "</th>");
	        		}
	        		
	        		
	        		createAreaInfoCompanyRateChart("#areaInfoFoodRate", chartData.food);
	        		createAreaInfoCompanyRateChart("#areaInfoSalesRate", chartData.sales);
	        		createAreaInfoCompanyRateChart("#areaInfoServiceRate", chartData.service);
	        		createAreaInfoCompanyRateChart("#areaInfoHospitalityRate", chartData.hospitality);
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"corpdistsumChart", 
							result, 
							map.id);
					
					
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoCompanyRate(options.params);
	            	});
	        	} else {
	        		$("#areaInfoCompanyRateChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoCompanyRateChart").html("");
	        }
	    });
	}());
	
	function createAreaInfoCompanyRateChart(id, chartData){
		$(id+"Chart").highcharts({
	        chart: {
	            type: 'column', backgroundColor: 'white', width: 500, height: 300
	        },
	        colors: ["#2CCBF0", "#4FA1D9", "#3570A5"],
	        exporting: { enabled: false },
	        title: {
	        	text : '',
	        },
	        xAxis: {
	        	categories: chartData.categories,
	        	labels: {
	                rotation: -45,
	        	}
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: ''
	            }
	        },
	        tooltip: {
	        	headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
	            pointFormat: '<tr><td style="color:{series.color};padding:0;">{series.name}: </td>' +
	                '<td style="padding:0;"><b>{point.y} %</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                borderWidth: 0
	            }
	        },
	        legend : {
	        	itemStyle: {
	        		fontSize : "10px"
	        	}
	        },
	        series: chartData.series
	    });
		
		//표 그리기
		var html = "";
		for(var k=0; k<chartData.series[0].data.length; k++){
			html += "<tr>";
			html += "<td>" + chartData.categories[k] + "</td>";
			for(var i=0; i<chartData.series.length; i++){
				//2017.02.07 변경
				//if(r = chartData.series[i].data[k]){
					html += "<td>" + chartData.series[i].data[k] + "</td>";
				//}
			}
			html += "</tr>";
		}
		
		$(id+"Table .tBody").html(html);
	}
	
	
	/*********** 지역 종합정보 사업체비율 차트 End **********/

	/*********** 지역 종합정보 사업체증감 차트 Start **********/
	(function() {
	    $class("sop.portal.corpindecreaseChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var categoryData = new Array();
	        		var themeName = options.options.dataBoard.indecreaseThemeNm;
	        		var cntData = new Array();
	        		
	        		for(var i = 0; i < result.length; i ++) {
	        			//2006년부터 보여진다
	        			if(result[i].year > 2005) {
	        				categoryData.push(result[i].year);	//년도
		        			var tmpTheme = new Array();
		        			for(var x = 0; x < result[i].theme_list.length; x ++) {
		        				var elem = result[i].theme_list[x];
		        				if(elem.theme_cd == options.options.dataBoard.indecreaseThemeCd) {
//			        				if(i == 0) {
//			        					themeNmData.push(elem.theme_nm);	//테마명
//			        				}
		        					tmpTheme.push(elem.corp_cnt);	//분포-비율	
		        				}
		        			}
		        			if(tmpTheme.length == 0) {
		        				tmpTheme.push(0);
		        			}
		        			cntData.push(tmpTheme);
	        			}
	        		}
	        		
	        		$("#areaInfoCompanyIndecreaseChart").highcharts({
				        chart: {
				            backgroundColor: 'white', width: 500, height: 200
				        },
				        exporting: { enabled: false },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				        	categories: categoryData,
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: '사업체수(개)'
				            },
				            // leekh : 20180131 천단위 k표출 숫자로 변경함
				            labels:{
				            	format:'{value}'
				            }
				        },
				        legend: {
				        	enabled: false,
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y} (개)</b></td></tr>',
				            footerFormat: '</table>',
				            shared: true,
				            useHTML: true
				        },
				        plotOptions: {
				            column: {
				                borderWidth: 0
				            }
				        }
				    });
	        		
	        		var charts = $("#areaInfoCompanyIndecreaseChart").highcharts();
	        		
	        		/*for(var i = 0; i < themeNmData.length; i ++) {
	        			var tmpData = new Array();
	        			for(var x = 0; x < categoryData.length; x ++) {
	        				tmpData.push(parseInt(cntData[x][i]));
	        			}
	        			charts.addSeries({
	        				name : themeNmData[i],
	        				data : tmpData
	        			});
	        		}*/
	        		
        			var tmpData = new Array();
        			for(var i = 0; i < categoryData.length; i ++) {
        				tmpData.push(parseInt(cntData[i]));
        			}
        			charts.addSeries({
        				name : themeName,
        				data : tmpData
        			});
	        		
	        		
	        		//표 헤더
	        		$("#areaInfoCompanyIndecreaseHeader th:eq(1)").html(themeName);
//	        		$("#areaInfoCompanyIndecreaseHeader th:eq(1)").html(themeNmData);
	        		
	        		//표 그리기
	        		var tableTmpList = [];
        			for(var  i = 0; i < categoryData.length; i ++) {
        				var tmpObj = [];
        				tmpObj.push(categoryData[i]);
        				tmpObj.push(cntData[i][0]);
        				tableTmpList.push(tmpObj);
        			}
        			
	        		var html = "";
					for(var  i = 0; i < tableTmpList.length; i ++) {
						html += "<tr>";
						for(var  x = 0; x < tableTmpList[i].length; x ++) {
							if(x == 0) {
								html += "	<td class='al'>"+tableTmpList[i][x]+"</td>";
							} else {
								html += "	<td>"+tableTmpList[i][x]+"</td>";
							}
						}
						html += "</tr>";
					}
					$("#areaInfoCompanyIndecreaseTable").html(html);
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"corpindecreaseChart", 
							result, 
							map.id);
					
	        		
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoCompanyIndecrease(options.params);
	            	});
	        	} else {
	        		$("#areaInfoCompanyIndecreaseChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoCompanyIndecreaseChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 사업체증감 차트 End **********/
	
	/*********** 지역 종합정보 주요시설물 현황 차트 Start **********/
	(function() {
	    $class("sop.portal.mainFacilityChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var themeInfo = result.themeInfo;
	        		var themeNmInfo = result.themeNmInfo;
//	        		console.log(themeNmInfo);
	        		var listData = new Array();
	        		var map = options.map;
	        		
//	        		var tempList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
//	        		var categories = 
//	        			[ '교육시설', '공공기관', '금융시설', '의료시설', '대중교통', '방범/방재', '백화점/중대형마트', '편의점', '극장/영화관', '도서관/박물관'];
	        		$("#areaInfoMainFacilityChart").highcharts({
	        			chart : {
							type : 'column', backgroundColor: 'white', width: 500, height: 300
						},
						exporting: { enabled: false },
						title : {
							text : '반경 내 주요 시설물 수'
						},
						subtitle : {
							text : ''
						},
						xAxis : {
							type : 'category',
							labels : {
								rotation : -45,
								style : {
									fontSize : '11px'
								}
							}
						},
						yAxis : {
							min : 0,
							title : {
								text : ''
							}
						},
						legend : {
							enabled : false
						},
						
						
						tooltip : {
							formatter: function() {
								//var seriel = this.series.index;
								//var index = categories.indexOf(this.x);
								
//								console.log(themeNmInfo["themeNm_"+$bizStatsDataBoardApi.Util.leadingZeros(this.x+1,2)]);
								var themeNmArray = themeNmInfo["themeNm_"+$bizStatsDataBoardApi.Util.leadingZeros(Number(this.x)+1,2)];
								/*var comment = this.point.y + '개<br>' + categories[this.x];*/
								var comment = '<b>' + this.point.y + '개<br>' + '';
								for(var key in themeNmArray){
									if(key !="isEmpty"){
										comment = comment + themeNmArray[key] + "<br>";
									}
								}
				                return comment + '<b>';
							}
//							pointFormat : '<b>{point.y}개<br>'+comment+'</b>'
						},
						series : [ {
							name : 'Population',
							data : [ 
							         	[ '교육시설', themeInfo.theme_sum_01 ],
							         	[ '공공기관', themeInfo.theme_sum_02 ],
							         	[ '금융시설', themeInfo.theme_sum_03 ],
							         	[ '의료시설', themeInfo.theme_sum_04 ],
							         	[ '방범/방재', themeInfo.theme_sum_06 ],
							         	[ '백화점/중대형마트', themeInfo.theme_sum_07 ],
							         	[ '편의점', themeInfo.theme_sum_08 ],
							         	[ '극장/영화관', themeInfo.theme_sum_09 ],
							         	[ '도서관/박물관', themeInfo.theme_sum_10 ]
							         ],
							dataLabels : {
								enabled : false
							}
						} ]
				    });
	        		
	        		var charts = $("#areaInfoMainFacilityChart").highcharts();
	        		var tooltip = '';
//	        		for(var i = 0; i < themeNmInfo.length; i ++) {
//	        			
//	        			
//	        			charts.tooltip.options.formatter = function() {
//		        		    var xyArr=[];
//		        		    $.each(this.points,function(){
//		        		    	console.log(this.points);
//		        		    	console.log(this.series);
//		        		        xyArr.push('Series: ' + this.series.name + ', ' +'X: ' + this.x + ', Y: ' +this.y);
//		        		    });
//		        		    return xyArr.join('<br/>');
//		        		}
//	        			
//	        			
//	        			
//	        			
//	        			charts.addSeries({
//	        				name : listData[i].adm_nm,
//	        				data : listData[i].list
//	        			});
//	        			if(i == 0) {
//	        				charts.series[i].update({ color: '#2CCBF0' });
//	        			} else if(i == 1) {
//	        				charts.series[i].update({ color: '#4FA1D9' });
//	        			} else if(i == 2) {
//	        				charts.series[i].update({ color: '#3570A5' });
//	        			}
//	        		}
	        		
	        		
	        		
	        		//표 그리기
	        		var html = "";
	        		html += "<tr>";
	        		html += "	<td class='al'>교육시설</td>";
	        		html += "	<td>"+themeInfo.theme_sum_01+"</td>";
					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>공공기관</td>";
	        		html += "	<td>"+themeInfo.theme_sum_02+"</td>";
					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>금융시설</td>";
	        		html += "	<td>"+themeInfo.theme_sum_03+"</td>";
					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>의료시설</td>";
	        		html += "	<td>"+themeInfo.theme_sum_04+"</td>";
					html += "</tr>";
					//대중교통 삭제
//					html += "<tr>";
//	        		html += "	<td class='al'>대중교통</td>";
//	        		html += "	<td>"+themeInfo.theme_sum_05+"</td>";
//					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>방범/방재</td>";
	        		html += "	<td>"+themeInfo.theme_sum_06+"</td>";
					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>백화점/중대형마트</td>";
	        		html += "	<td>"+themeInfo.theme_sum_07+"</td>";
					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>편의점</td>";
	        		html += "	<td>"+themeInfo.theme_sum_08+"</td>";
					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>극장/영화관</td>";
	        		html += "	<td>"+themeInfo.theme_sum_09+"</td>";
					html += "</tr>";
					html += "<tr>";
	        		html += "	<td class='al'>도서관/박물관</td>";
	        		html += "	<td>"+themeInfo.theme_sum_10+"</td>";
					html += "</tr>";
					$("#areaInfoMainFacilityTable").html(html);
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"mainFacilityChart", 
							result, 
							map.id);
					
					//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoMainFacility(options.params);
	            	});
	        	} else {
	        		$("#areaInfoMainFacilityChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoMainFacilityChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 주요시설물 현황 차트 End **********/
	
	/*********** 지역 종합정보 연령별 인구 차트 표출 Start **********/
	(function() {
	    $class("sop.portal.pplAgeChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		var extraListData = new Array();
	        		var map = options.map;
	        		
	        		//표 헤더 초기화
	        		$("#areaInfoPopulationAgeHeader th").html("");
	        		$("#areaInfoPopulationAgeHeader th:eq(0)").html("연령대");
	        		
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			var tmpExtraData = new Array();
	        			tempData.push(parseInt(elem.teenage_less_than_per));	//10대 미만 비율
	        			tempData.push(parseInt(elem.teenage_per));				//10대 비율
	        			tempData.push(parseInt(elem.twenty_per));					//20대 비율
	        			tempData.push(parseInt(elem.thirty_per));					//30대 비율
	        			tempData.push(parseInt(elem.forty_per));					//40대 비율
	        			tempData.push(parseInt(elem.fifty_per));						//50대 비율
	        			tempData.push(parseInt(elem.sixty_per));					//60대 비율
	        			tempData.push(parseInt(elem.seventy_more_than_per));	//70대 이상 비율
	        			
	        			tmpExtraData.push(parseInt(elem.teenage_less_than_cnt));	//10대 미만 비율
	        			tmpExtraData.push(parseInt(elem.teenage_cnt));				//10대 비율
	        			tmpExtraData.push(parseInt(elem.twenty_cnt));					//20대 비율
	        			tmpExtraData.push(parseInt(elem.thirty_cnt));					//30대 비율
	        			tmpExtraData.push(parseInt(elem.forty_cnt));					//40대 비율
	        			tmpExtraData.push(parseInt(elem.fifty_cnt));						//50대 비율
	        			tmpExtraData.push(parseInt(elem.sixty_cnt));					//60대 비율
	        			tmpExtraData.push(parseInt(elem.seventy_more_than_cnt));	//70대 이상 비율
	        			
	        			//표 헤더 (연령대, 지역1, 지역2, 지역3)
	        			$("#areaInfoPopulationAgeHeader th:eq("+(i+1)+")").html(elem.adm_nm);
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData, "extra": tmpExtraData});
	        		}
	        		
	        		$("#areaInfoPopulationAgeChart").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 500, height: 300
				        },
				        exporting: { enabled: false },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				            categories: [ '10세 이하', '10', '20', '30', '40', '50', '60', '70세 이상']
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ''
				            }
				        },
				        tooltip: {
				        	formatter : function() {
				        		var idx = 0;
				        		switch(this.x) {
					        		case "10세 이하":
					        			idx = 0;
					        			break;
					        		case "10":
					        			idx = 1;
					        			break;
					        		case "20":
					        			idx = 2;
					        			break;
					        		case "30":
					        			idx = 3;
					        			break;
					        		case "40":
					        			idx = 4;
					        			break;
					        		case "50":
					        			idx = 5;
					        			break;
					        		case "60":
					        			idx = 6;
					        			break;
					        		case "70세 이상":
					        			idx = 7;
					        			break;
				        				
				        		}
				        		var html = '<span style="font-size:10px">'+this.x+'</span><table style="width:220px;">';
				        		$.each(this.points, function(i, point) {
				        			html += '<tr><td style="color:'+this.series.color+';padding:0;font-size:12px;">'+this.series.name+': </td>' +
					                '<td style="padding:0;font-size:12px;"><b>'+point.y+' %('+appendCommaToNumber(this.series.userOptions.extra[idx])+'명)</b></td></tr>';
				        		});
				        		html += '</table>';
				        		return html;

				        	},
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y} %</b></td></tr>' +
				                '<tr><td>인구수:</td><td style="padding:0"><b>{series.userOptions.extra}명</b></td></tr>',
				            footerFormat: '</table>',
				            shared: true,
				            useHTML: true
				        },
				        plotOptions: {
				            column: {
				                borderWidth: 0
				            }
				        },
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $("#areaInfoPopulationAgeChart").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list,
	        				extra : listData[i].extra,
	        			});
	        			if(i == 0) {
	        				charts.series[i].update({ color: '#2CCBF0' });
	        			} else if(i == 1) {
	        				charts.series[i].update({ color: '#4FA1D9' });
	        			} else if(i == 2) {
	        				charts.series[i].update({ color: '#3570A5' });
	        			}
	        		}
	        		
	        		//표 그리기
	        		var categoryData = [ '10세 이하', '10', '20', '30', '40', '50', '60', '70세 이상'];
	        		var tableTmpList = [];
        			for(var  i = 0; i < listData[0].list.length; i ++) {	//사업체 수만큼 먼저 for문
        				var tmpObj = [];
        				tmpObj.push(categoryData[i]);
        				for(var x = 0; x < listData.length; x ++) {		//지역 수만큼 for문
        					tmpObj.push(listData[x].list[i]);
        				}
        				tableTmpList.push(tmpObj);
        			}
	        		
	        		var html = "";
					for(var  i = 0; i < tableTmpList.length; i ++) {
						html += "<tr>";
						for(var  x = 0; x < tableTmpList[i].length; x ++) {
							if(x == 0) {
								html += "	<td class='al'>"+tableTmpList[i][x]+"</td>";	
							} else {
								html += "	<td>"+tableTmpList[i][x]+"</td>";
							}
						}
						
						//시군구일 경우 화면을 맞추기 위해 빈공란 열 추가
						if(result.length == 2) {
							html += "	<td>&nbsp;</td>";
						}
						
						html += "</tr>";
					}
					$("#areaInfoPopulationAgeTable").html(html);
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"pplAgeChart", 
							result, 
							map.id);
					
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoPopulationAge(options.params);
	            	});
	        	} else {
	        		$("#areaInfoPopulationAgeChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoPopulationAgeChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 연령별 인구 차트 표출 End **********/
	
	/*********** 지역 종합정보 성별 인구 차트 Start **********/
	(function() {
	    $class("sop.portal.pplGenderChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var f_ppl = 0;
	        		var f_per = 0;
	        		var m_ppl = 0;
	        		var m_per = 0;
	        		var adm_nm = "";
	        		for(var i = 0; i < result.length; i ++) {
	        			if(result[i].adm_cd == options.params.adm_cd) {
	        				f_ppl = result[i].f_ppl;
	        				f_per = parseFloat(result[i].f_per);
	        				m_ppl = result[i].m_ppl;
	        				m_per = parseFloat(result[i].m_per);
	        				adm_nm = result[i].adm_nm;
	        			}
	        		}
	        		
	        		$("#areaInfoPopulationGenderChart").highcharts({
	    				chart: { backgroundColor:"#fff", borderWidth:0, margin: [0, 0, 0, 0], height: 220, width: 220 },
	    				exporting: { enabled: false },
	    				colors: ['#E64C2C', '#4C9AD3'],
	    				tooltip: { enabled: false },
	    				navigation: { buttonOptions: { enabled: false } }, 
	    		        title: {
	    		            text: ''
	    		        },
	    		        plotOptions: {
	    		            pie: {
	    		                dataLabels: {
	    		                    enabled: true,
	    		                    distance: -50,
	    		                    style: {
	    		                        fontWeight: 'bold',
	    		                        color: 'white',
	    		                        textShadow: '0px 1px 2px black'
	    		                    }
	    		                },
	    		                startAngle: 0,
	    		                endAngle: 360,
	    		                center: ['50%', '50%'], borderWidth: 0
	    		            }
	    		        }, 
	    		        series: [{
	    			        type: 'pie',
	    		            name: '비율',
	    		            innerSize: '91%',
	    		            data: [
	    		                ['여자 인구비율',  f_per],
	    		                ['남자 인구비율',  m_per]
	    		            ],
	    					dataLabels: {
	    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
	    					}
	    		        }],
	    		        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
	    		        
	    		    });
	        		$("#areaInfoPopulationGenderChart > div").css("margin", "auto");
	        		
	        		$("#areaInfoPopulationGenderChart_male > span").html("남, " + m_per + "% <br/>(" + appendCommaToNumber(m_ppl) + "명)");		//남자
	        		$("#areaInfoPopulationGenderChart_female > span").html("여, " + f_per  + "% <br/>(" + appendCommaToNumber(f_ppl) + "명)");		//여자
	        		
	        		//표 그리기
	        		var html = "";
	        		html += "<tr>";
	        		html += "	<td class='al'>"+adm_nm+"</td>";
	        		html += "	<td>"+appendCommaToNumber(m_ppl)+"</td>";
	        		html += "	<td>"+m_per+"%</td>";
	        		html += "	<td>"+appendCommaToNumber(f_ppl)+"</td>";
	        		html += "	<td>"+f_per+"%</td>";
	        		html += "</tr>";
					$("#areaInfoPopulationGenderTable").html(html);
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"pplGenderChart", 
							result, 
							map.id);
					
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoPopulationGender(options.params);
	            	});
	        	} else {
	        		$("#areaInfoPopulationGenderChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoPopulationGenderChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 성별 인구 차트 End **********/
	
	/*********** 지역 종합정보 점유형태 가구 차트 Start **********/
	(function() {
	    $class("sop.portal.ocptnsumChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		var map = options.map;
	        		
	        		//2017.03.21 2015년 점유형태 추가에 따른 그래프 수정-읍면동 삭제
	        		var tmpResult = [];
	        		for (var i=0; i<result.length; i++) {
	        			if (result[i].adm_cd != undefined && result[i].adm_cd.length != 7) {
	        				tmpResult.push(result[i]);
	        			}
	        		}
	        		result = tmpResult;
	        		
	        		
	        		//표 헤더 초기화
	        		$("#areaInfoHouseholdOccupyHeader th").html("");
	        		$("#areaInfoHouseholdOccupyHeader th:eq(0)").html("점유형태");
	        		
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			tempData.push(parseFloat(elem.self_per));			//자가비율
	        			tempData.push(parseFloat(elem.lease_per));		//전세비율
	        			tempData.push(parseFloat(elem.mrp_per));		//월세비율
	        			
	        			//표 헤더 (점유형태, 지역1, 지역2, 지역3)
	        			$("#areaInfoHouseholdOccupyHeader th:eq("+(i+1)+")").html(elem.adm_nm);
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });
	        		}
	        		
//	        		console.log("listdata"+listData);
	        		
	        		$("#areaInfoHouseholdOccupyChart").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 500, height: 300
				        },
				        exporting: { enabled: false },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				        	categories: [ '자가', '전세(월세없음)', '보증금 있는 월세' ]
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ''
				            }
				        },
				        tooltip: {
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
				            footerFormat: '</table>',
				            shared: true,
				            useHTML: true
				        },
				        plotOptions: {
				            column: {
				                borderWidth: 0
				            }
				        },
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $("#areaInfoHouseholdOccupyChart").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list
	        			});
	        			if(i == 0) {
	        				charts.series[i].update({ color: '#4F81BD' });
	        			} else if(i == 1) {
	        				charts.series[i].update({ color: '#C0504D' });
	        			} else if(i == 2) {
	        				charts.series[i].update({ color: '#9BBB59' });
	        			}
	        		}
//	        		console.log(listData);
	        		//표 그리기
	        		var categoryData = [ '자가', '전세(월세없음)', '보증금 있는 월세' ];
	        		var tableTmpList = [];
        			for(var  i = 0; i < listData[0].list.length; i ++) {	//점유형태 수만큼 먼저 for문
        				var tmpObj = [];
        				tmpObj.push(categoryData[i]);
        				for(var x = 0; x < listData.length; x ++) {		//지역 수만큼 for문
        					tmpObj.push(listData[x].list[i]);
        				}
        				tableTmpList.push(tmpObj);
        			}
	        		
	        		var html = "";
					for(var  i = 0; i < tableTmpList.length; i ++) {
						html += "<tr>";
						for(var  x = 0; x < tableTmpList[i].length; x ++) {
							if(x == 0) {
								html += "	<td class='al'>"+tableTmpList[i][x]+"</td>";	
							} else {
								html += "	<td>"+tableTmpList[i][x]+"</td>";
							}
						}
						//시군구일 경우 화면을 맞추기 위해 빈공란 열 추가
						if(result.length == 2) {
							html += "	<td>&nbsp;</td>";
						}
						html += "</tr>";
					}
					$("#areaInfoHouseholdOccupyTable").html(html);
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"ocptnsumChart", 
							result, 
							map.id);
					
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoPopulationGender(options.params);
	            	});
	        	} else {
	        		$("#areaInfoHouseholdOccupyChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoHouseholdOccupyChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 점유형태 가구 차트 End **********/
	
	/*********** 지역 종합정보 거처종류 차트 Start **********/
	(function() {
	    $class("sop.portal.housesumChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var listData = new Array();
	        		var map = options.map;
	        		
	        		//표 헤더 초기화
	        		$("#areaInfoHouseholdTypeHeader th").html("");
	        		$("#areaInfoHouseholdTypeHeader th:eq(0)").html("거처종류");
	        		
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			var tempExtraData = new Array();
	        			tempData.push(parseFloat(elem.apart_per));			//아파트-  비율
	        			tempData.push(parseFloat(elem.row_house_per));	//연립/다세대 - 비율
	        			tempData.push(parseFloat(elem.officetel_per));		//오피스텔 - 비율
	        			tempData.push(parseFloat(elem.detach_house_per));		//단독주택 - 비율
	        			tempData.push(parseFloat(elem.dom_soc_fac_per));		//기숙사 및 사회시설 - 비율
	        			tempData.push(parseFloat(elem.etc_per));		//기타 - 비율
	        			
	        			tempExtraData.push(parseFloat(elem.apart_cnt));			//아파트-  비율
	        			tempExtraData.push(parseFloat(elem.row_house_cnt));	//연립/다세대 - 비율
	        			tempExtraData.push(parseFloat(elem.officetel_cnt));		//오피스텔 - 비율
	        			tempExtraData.push(parseFloat(elem.detach_house_cnt));		//단독주택 - 비율
	        			tempExtraData.push(parseFloat(elem.dom_soc_fac_cnt));		//기숙사 및 사회시설 - 비율
	        			tempExtraData.push(parseFloat(elem.etc_cnt));		//기타 - 비율
	        			
	        			//표 헤더 (거처종류, 지역1, 지역2, 지역3)
	        			$("#areaInfoHouseholdTypeHeader th:eq("+(i+1)+")").html(elem.adm_nm);
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData, extra : tempExtraData});
	        		}
	        		
	        		$("#areaInfoHouseholdTypeChart").highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', width: 500, height: 300
				        },
				        exporting: { enabled: false },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				        	categories: [ '아파트', '연립/다세대', '오피스텔', '단독주택', '기숙사및사회시설', '기타']
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ''
				            }
				        },
				        tooltip: {
				        	formatter : function() {
				        		var idx = 0;
				        		switch(this.x) {
					        		case "아파트":
					        			idx = 0;
					        			break;
					        		case "연립/다세대":
					        			idx = 1;
					        			break;
					        		case "오피스텔":
					        			idx = 2;
					        			break;
					        		case "단독주택":
					        			idx = 3;
					        			break;
					        		case "기숙사및사회시설":
					        			idx = 4;
					        			break;
					        		case "기타":
					        			idx = 5;
					        			break;		
				        		}
				        		var html = '<span style="font-size:10px">'+this.x+'</span><table style="width:170px;">';
				        		$.each(this.points, function(i, point) {
				        			html += '<tr><td style="color:'+this.series.color+';padding:0;font-size:12px;">'+this.series.name+': </td>' +
					                '<td style="padding:0;font-size:12px;"><b>'+point.y+' %('+appendCommaToNumber(this.series.userOptions.extra[idx])+'개)</b></td></tr>';
				        		});
				        		html += '</table>';
				        		return html;

				        	},
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
				            footerFormat: '</table>',
				            shared: true,
				            useHTML: true
				        },
				        plotOptions: {
				            column: {
				                borderWidth: 0
				            }
				        },
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		var charts = $("#areaInfoHouseholdTypeChart").highcharts();
	        		
	        		for(var i = 0; i < listData.length; i ++) {
	        			charts.addSeries({
	        				name : listData[i].adm_nm,
	        				data : listData[i].list,
	        				extra : listData[i].extra
	        			});
	        			if(i == 0) {
	        				charts.series[i].update({ color: '#2CCBF0' });
	        			} else if(i == 1) {
	        				charts.series[i].update({ color: '#4FA1D9' });
	        			} else if(i == 2) {
	        				charts.series[i].update({ color: '#3570A5' });
	        			}
	        		}
	        		
	        		//표 그리기
	        		var categoryData = [ '아파트', '연립/다세대', '오피스텔', '단독주택', '기숙사및사회시설', '기타'];
	        		var tableTmpList = [];
        			for(var  i = 0; i < listData[0].list.length; i ++) {	//거처유형 수만큼 먼저 for문
        				var tmpObj = [];
        				tmpObj.push(categoryData[i]);
        				for(var x = 0; x < listData.length; x ++) {		//지역 수만큼 for문
        					tmpObj.push(listData[x].list[i]);
        				}
        				tableTmpList.push(tmpObj);
        			}
	        		
	        		var html = "";
					for(var  i = 0; i < tableTmpList.length; i ++) {
						html += "<tr>";
						for(var  x = 0; x < tableTmpList[i].length; x ++) {
							if(x == 0) {
								html += "	<td class='al'>"+tableTmpList[i][x]+"</td>";	
							} else {
								html += "	<td>"+tableTmpList[i][x]+"</td>";
							}
						}
						//시군구일 경우 화면을 맞추기 위해 빈공란 열 추가
						if(result.length == 2) {
							html += "	<td>&nbsp;</td>";
						}
						html += "</tr>";
					}
					$("#areaInfoHouseholdTypeTable").html(html);
	        		
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"housesumChart", 
							result, 
							map.id);
					
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoHouseholdType(options.params);
	            	});
	        	} else {
	        		$("#areaInfoHouseholdTypeChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoHouseholdTypeChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 거처종류 차트 End **********/
	
	/*********** 지역 종합정보 주택거래가격 차트 Start **********/
	(function() {
	    $class("sop.portal.hPriceChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var maxData = new Array();
        			var minData = new Array();
        			var categoryData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var pcRadio = options.options.dataBoard.priceRadio;
						if(pcRadio == "apt") {		//아파트
							maxData.push(parseInt(elem.apart_highest_price));
							minData.push(parseInt(elem.apart_lowest_price));
						} else if(pcRadio == "villa") {		//다세대/연립
							maxData.push(parseInt(elem.row_multi_house_highest_price));
							minData.push(parseInt(elem.row_multi_house_lowest_price));
						} else if(pcRadio == "house") {		//단독주택
							maxData.push(parseInt(elem.single_highest_price));
							minData.push(parseInt(elem.single_lowest_price));
						}
						
						if (elem.year_month != undefined && elem.year_month.length >= 6) {
							var tmpDate = elem.year_month;
							var year = tmpDate.substring(0,4);
							var month = tmpDate.substring(4,6);
							var date = year + "." + month;
							categoryData.push(date);
						}
	
	        		}
	        		
	        		$("#areaInfoHousePriceChart").highcharts({
				        chart: {
				        	backgroundColor: 'white', width: 500, height: 300
				        },
				        exporting: { enabled: false },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				            categories: categoryData,
				            labels: {
				                rotation: -45,
				        	}
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ''
				            },  // leekh : 20180131 천단위 k표출 숫자로 변경함
				            labels:{
				            	format:'{value}'
				            	/*	//leekh 이렇게 해도 format과 동일한 결과가 나옮. 데이터 편집이 필요하면 return 값을 수정하면 됨
				            	 * formatter:function(){
				            		return this.value 
				            	}*/
				            }
				            
				            
				        },
				        tooltip: {
				        	formatter : function() {
				        		var extraData = 0;
				        		var html = '<span style="font-size:10px">'+this.x+'</span><table style="width:170px;">';
				        		$.each(this.points, function(i, point) {
				        			html += '<tr><td style="color:'+this.series.color+';padding:0;font-size:12px;">'+this.series.name+': </td>' +
					                '<td style="padding:0;font-size:12px;"><b>'+point.y+' 만원</b></td></tr>';
				        			extraData += parseInt(point.y);
				        		});
				        		extraData = extraData/2;
				        		html += '<tr><td style="padding:0;font-size:12px;">평균거래가격</td>' +
				                '<td style="padding:0;font-size:12px;"><b>'+extraData+' 만원</b></td></tr>';
				        		
				        		html += '</table>';
				        		return html;

				        	},
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y} 만원</b></td></tr>',
				            footerFormat: '</table>',
				            shared: true,
				            useHTML: true
				        },
				        plotOptions: {
				            column: {
				                borderWidth: 0
				            }
				        },
				        series:[{
				        	name : '최고가',
				        	data : maxData
				        }, {
				        	name : '최저가',
				        	data : minData
				        }],
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		//표 그리기
	        		var tableTmpList = [];
        			for(var  i = 0; i < maxData.length; i ++) {	//데이터 수만큼 먼저 for문
        				var tmpObj = [];
        				tmpObj.push(categoryData[i]);
        				tmpObj.push(maxData[i]);
        				tmpObj.push(minData[i]);
        				tableTmpList.push(tmpObj);
        			}
	        		
	        		var html = "";
					for(var  i = 0; i < tableTmpList.length; i ++) {
						html += "<tr>";
						for(var  x = 0; x < tableTmpList[i].length; x ++) {
							if(x == 0) {
								html += "	<td class='al'>"+tableTmpList[i][x]+"</td>";	
							} else {
								html += "	<td>"+tableTmpList[i][x]+"</td>";
							}
						}
						html += "</tr>";
					}
					$("#areaInfoHousePriceTable").html(html);

					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"hPriceChart", 
							result, 
							map.id);
					
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoHousePrice(options.params);
	            	});
	        	} else {
	        		$("#areaInfoHousePriceChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoHousePriceChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 주택거래가격 차트 End **********/
	
	/*********** 지역 종합정보 주택거래동향 차트 Start **********/
	(function() {
	    $class("sop.portal.hTradeChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var maxData = new Array();
        			var minData = new Array();
        			var categoryData = new Array();
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tdRadio = options.options.dataBoard.tradeRadio;
						if(tdRadio == "apt") {		//아파트
							maxData.push(parseInt(elem.apart_deal_volume));
							minData.push(parseInt(elem.apart_lease_volume));
						} else if(tdRadio == "villa") {		//다세대/연립
							maxData.push(parseInt(elem.row_multi_dealvolume));
							minData.push(parseInt(elem.row_multi_leasevolume));
						} else if(tdRadio == "house") {		//단독주택
							maxData.push(parseInt(elem.single_deal_volume));
							minData.push(parseInt(elem.single_lease_volume));
						}
						
						if (elem.year_month != undefined && elem.year_month.length >= 6) {
							var tmpDate = elem.year_month;
							var year = tmpDate.substring(0,4);
							var month = tmpDate.substring(4,6);
							var date = year + "." + month;
							categoryData.push(date);
						}
	        		}
	        		
	        		$("#areaInfoHouseTradeChart").highcharts({
				        chart: {
				        	backgroundColor: 'white', width: 500, height: 300
				        },
				        exporting: { enabled: false },
				        title: {
				        	text : ''
				        },
				        xAxis: {
				            categories: categoryData,
				            labels: {
				                rotation: -45,
				        	}
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: ''
				            }
				        },
				        tooltip: {
				        	formatter : function() {
				        		var extraData = 0;
				        		var html = '<span style="font-size:10px">'+this.x+'</span><table style="width:170px;">';
				        		$.each(this.points, function(i, point) {
				        			html += '<tr><td style="color:'+this.series.color+';padding:0;font-size:12px;">'+this.series.name+': </td>' +
					                '<td style="padding:0;font-size:12px;"><b>'+point.y+' 건</b></td></tr>';
				        			extraData += parseInt(point.y);
				        		});
				        		extraData = extraData;
				        		html += '<tr><td style="padding:0;font-size:12px;">총거래건수</td>' +
				                '<td style="padding:0;font-size:12px;"><b>'+extraData+' 건</b></td></tr>';
				        		
				        		html += '</table>';
				        		return html;

				        	},
				            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
				            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				                '<td style="padding:0"><b>{point.y} 건</b></td></tr>',
				            footerFormat: '</table>',
				            shared: true,
				            useHTML: true
				        },
				        plotOptions: {
				            column: {
				                borderWidth: 0
				            }
				        },
				        series:[{
				        	name : '매매',
				        	data : maxData
				        }, {
				        	name : '전세',
				        	data : minData
				        }],
				        legend : {
				        	itemStyle: {
				        		fontSize : "10px"
				        	}
				        }
				    });
	        		
	        		//표 그리기
	        		var tableTmpList = [];
        			for(var  i = 0; i < maxData.length; i ++) {	//데이터 수만큼 먼저 for문
        				var tmpObj = [];
        				tmpObj.push(categoryData[i]);
        				tmpObj.push(maxData[i]);
        				tmpObj.push(minData[i]);
        				tableTmpList.push(tmpObj);
        			}
	        		
	        		var html = "";
					for(var  i = 0; i < tableTmpList.length; i ++) {
						html += "<tr>";
						for(var  x = 0; x < tableTmpList[i].length; x ++) {
							if(x == 0) {
								html += "	<td class='al'>"+tableTmpList[i][x]+"</td>";	
							} else {
								html += "	<td>"+tableTmpList[i][x]+"</td>";
							}
						}
						html += "</tr>";
					}
					$("#areaInfoHouseTradeTable").html(html);
					
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"hTradeChart", 
							result, 
							map.id);
					
	        		//API 로그
					apiLogWrite("B0", options);
					
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaInfoHouseTrade(options.params);
	            	});
	        	} else {
	        		$("#areaInfoHouseTradeChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoHouseTradeChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 주택거래동향 차트 End **********/
	
	/*********** 지역 종합정보 공시지가 차트 Start **********/
	(function() {
	    $class("sop.portal.hPnilpChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var map = options.map;
	        		if (res.result.length > 0) {
	        			var result = res.result[0];
	        			var type = "house";
		        		$("input[name='pnilpRadio']").each(function() {
		        			if ($(this).is(":checked")) {
		        				type = $(this).val();
		        			}
		        		});
		        		
		        		var dataArr = [];
		        		if (type == "house") { //주거용
		        			dataArr.push([ '단독주택', parseFloat(result.single_price)]);
							dataArr.push([ '연립/다세대', parseFloat(result.rmhouse_price) ]);
							dataArr.push([ '아파트', parseFloat(result.apt_price) ]);
		        		}else { //산업용
		        			dataArr.push([ '상업', parseFloat(result.cmrc_price)]);
							dataArr.push([ '업무', parseFloat(result.job_price)]);
							dataArr.push([ '주상복합', parseFloat(result.rccomplex_price)]);
		        		}
		        		
		        		$("#areaInfoHousePnilpChart").highcharts({
		        			chart : {type : 'column', width: 500, height: 300 },
		        			title : {text : ''	 },
		        			exporting : { enabled: false },
		        			colors: ['#bee51c', '#e8771a','#738ef5'],
		        			subtitle : {text : ''},
		        			xAxis : {
		        				gridLineWidth:0,
		        				type : 'category',
		        				labels : {rotation :0,
		        					style : {fontSize : '9px'}
		        				}
		        			},
		        			yAxis : {
		        				gridLineWidth:1,
		        				min : 0, title : { text : '공시지가 (만원)' },
		        				enabled : false,
		        				labels: {}
		        			},
		        			plotOptions: {
		        	        },
		        			legend : {enabled : false},
		        			tooltip : {pointFormat : '{point.y:.1f}'},
		        			series : [ {
		        				pointWidth:60,
		        				name : '',
		        				colorByPoint: true,
		        				data : dataArr,
		        				dataLabels : {enabled : false}
		        			} ]
		        		});
		        		
		        		//표 그리기
		        		var tableTmpList = [];
	        			for(var  i = 0; i < dataArr.length; i ++) {	//데이터 수만큼 먼저 for문
	        				var tmpObj = [];
	        				tmpObj.push(dataArr[i][0]);
	        				tmpObj.push(result.base_year);
	        				tmpObj.push(dataArr[i][1]);
	        				tableTmpList.push(tmpObj);
	        			}
		        		
		        		var html = "";
						for(var  i = 0; i < tableTmpList.length; i ++) {
							html += "<tr>";
							for(var  x = 0; x < tableTmpList[i].length; x ++) {
								if(x == 0) {
									html += "	<td class='al'>"+tableTmpList[i][x]+"</td>";	
								} else {
									html += "	<td>"+tableTmpList[i][x]+"</td>";
								}
							}
							html += "</tr>";
						}
						$("#areaInfoHousePnilpTable").html(html);

						//보고서 생성을 위한 데이터 저장
						$bizStatsDataBoard.ui.setReportData(
								"areaInfo", 
								"hPnilpChart", 
								result, 
								map.id);
						
		        		//API 로그
						apiLogWrite("B0", options);
	        		}
	        	} else {
	        		$("#areaInfoHousePriceChart").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#areaInfoHousePriceChart").html("");
	        }
	    });
	}());
	/*********** 지역 종합정보 공시지가 차트 End **********/
	
	/*********** 창업지역검색 지역 비교하기 데이터 조회 Start **********/
	(function() {
		$class("sop.portal.compareAreaData.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				var result = res.result;
				var map = options.map;
				var listData = new Array();
//				console.log(res);
				/*
				var familyCntList = [];
				var residCntList = [];
				var corpCntList = [];
				var pplCntList = [];
				for(var i = 0; i < result.compareList.length; i ++) {
					var rData = result.compareList[i];
					corpCntList.push(rData.corp_cnt);
					pplCntList.push(rData.ppltn_cnt);
					familyCntList.push(rData.family_cnt);
					residCntList.push(rData.resid_cnt);
				}
				*/
				for(var i = 0; i < result.compareList.length; i ++) {
        			//var elem = result[i];
        			var tempData = new Array();
        			var rData = result.compareList[i];
        			tempData.push(rData.corp_cnt);			//자가비율
        			tempData.push(rData.ppltn_cnt);		//전세비율
        			tempData.push(rData.family_cnt);		//월세비율
        			tempData.push(rData.resid_cnt);
        			//표 헤더 (점유형태, 지역1, 지역2, 지역3)
        			//$("#areaInfoHouseholdOccupyHeader th:eq("+(i+1)+")").html(elem.adm_nm);
        			
        			listData.push({ "adm_nm" : rData.adm_nm, "list" : tempData });
        		}
				
//				console.log(listData);
				
				$("#areaSearchCompareBarChart").highcharts({
			        chart: {
			            type: 'column', backgroundColor: 'white', width: 500, height: 300
			        },
			        exporting: { enabled: false },
			        title: {
			        	text : ''
			        },
			        xAxis: {
			        	categories: [ '총사업체', '총인구', '총가구', '총주택']
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 170px;">',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y}</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                borderWidth: 0
			            }
			        },
			        legend : {
			        	itemStyle: {
			        		fontSize : "10px"
			        	}
			        }
			    });
        		
        		var charts = $("#areaSearchCompareBarChart").highcharts();
        		
        		for(var i = 0; i < listData.length; i ++) {
        			charts.addSeries({
        				name : listData[i].adm_nm,
        				data : listData[i].list
        			});
        			if(i == 0) {
        				charts.series[i].update({ color: '#2CCBF0' });
        			} else if(i == 1) {
        				charts.series[i].update({ color: '#4FA1D9' });
        			} else if(i == 2) {
        				charts.series[i].update({ color: '#3570A5' });
        			}
        		}
        		
				
				/*
					//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaInfo", 
							"allCompanyPplHouse", 
							result, 
							map.id);
				}*/
			},
			onFail : function(status, options) {
			}
		});
	}());
	/*********** 창업지역검색 지역 비교하기 데이터 조회 End **********/

	/*********** 창업지역검색 스파이더웹차트 Start **********/
	(function() {
	    $class("sop.portal.multiRegionTotalChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var listData = new Array();		//인구/거주/주택 특성
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			tempData.push(parseInt(elem.resid_ppltn_per));			//거주인구비율
	        			tempData.push(parseInt(elem.job_ppltn_per));			//직장인구비율
	        			tempData.push(parseInt(elem.apart_per));			//아파트비율
	        			tempData.push(parseInt(elem.one_person_family_per));			//1인가구비율
	        			tempData.push(parseInt(elem.sixty_five_more_ppltn_per));			//65세이상인구비율
	        			tempData.push(parseInt(elem.twenty_ppltn_per));			//20대인구비율
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });
	        		}
	        		
	        		//스파이더웹 차트를 저장
	        		var dataBoard = $bizStatsDataBoard.ui.mapData[$bizStatsMap.ui.curMapId].options.dataBoard;
        			dataBoard.spyChartList.push(listData);
	        		
	        		//후보지역 수만큼 호출 됐을 경우 차트를 그린다.
	        		if(dataBoard.candidateList.length == dataBoard.spyChartList.length) {
		        		//인구/거주/주택특성 스파이더웹 차트
		        		$("#spyCharts02").highcharts({
					        chart: { polar: true, type: 'line', width:500, height:450, margin:[0,0,0,0] },
					        exporting: { enabled: false },
					        colors: ['#bee51c', '#e8771a','#738ef5', '#a176f4'],
					        title: {
		        	            text: '인구 / 거주 / 주택특성', useHTML: true,
		        	            style : { color : '#ffffff', "fontSize" : "12px", 'background-color': '#e8771a', 'widith':'110px', 
		        					'textAlign':'center', 'padding':'4px 10px 4px 10px', 'borderRadius':'11px'}
		        	        }, 
					        pane: { size: '70%' },
					        xAxis: {
					        	categories: ['거주인구', '직장인구비율', '공시지가', '1인 가구', '65세 이상 인구', '20대 인구'],
					        	tickmarkPlacement: 'on', lineWidth: 0
					        },
					        yAxis: {
						        gridLineInterpolation: 'polygon',
					            lineWidth: 0,
					            min: 0,
					            labels: { enabled: false }
					        },
					        tooltip: {
					        	style: { padding: 0 },
					        	useHTML: true, 
					        	formatter: function() {
					        		var div = "<div class='tooltipTitle'>"+this.x+"</div>";
					        		div += "<div class='tooltipBlock'><span>"+this.series.name+" : " + this.y + "</span></div>";
					        		return (""+div+"");
					        	}
		        	        },
		        	        legend: {
		        	        	enabled : false
		        	        },
					    });
		        		
		        		//인구특성 차트 데이터 설정
		        		var charts = $("#spyCharts02").highcharts();
		        		
	        			$("#spyChartsArea04").hide();
	        			$("#spyChartsArea05").hide();
	        			$("#spyChartsArea06").hide();
		        		for(var i = 0; i < dataBoard.spyChartList.length; i ++) {
		        			for(var x = 0; x < dataBoard.spyChartList[i].length; x ++) {
		        				//첫번째 데이터는 상위 지역까지 표출
		        				if( (i == 0 && x == 0) || x == 1 ) {
		        					charts.addSeries({
		        						name : dataBoard.spyChartList[i][x].adm_nm,
		        						data : dataBoard.spyChartList[i][x].list,
		        						pointPlacement: 'on'
		        					});
		        				}
		        			}
		        			
		        			//검색 지역
		        			
		        			if(i == 0) {
		        				$("#spyChartsArea03").html(charts.series[0].name);	//상위 지역
		        				$("#spyChartsArea04").html(charts.series[1].name);	//첫번째 후보지역
		        				$("#spyChartsArea04").show();
		        			} else if(i == 1) {
		        				$("#spyChartsArea05").html(charts.series[2].name);		//두번째 후보지역
		        				$("#spyChartsArea05").show();
		        			} else if(i == 2) {
		        				$("#spyChartsArea06").html(charts.series[3].name);		//세번째 후보지역
		        				$("#spyChartsArea06").show();
		        			}
		        		}
		        		
		        		//보고서 생성을 위한 데이터 저장
						$bizStatsDataBoard.ui.setReportData(
								"areaSearch", 
								"multiRegionTotalChart", 
								result, 
								map.id);
		        		
		        		//API 로그
						apiLogWrite("B0", options);
						
	        		}
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaSearchSpiderwebChart(options.params);
	            	});
	        	} else {
	        		$("#spyCharts02").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#spyCharts02").html("");
	        }
	    });
	}());
	/*********** 창업지역검색 스파이더웹차트 End **********/
	
	/*********** 상권정보 현황 지역, 전국 Pie차트 Start **********/
	(function() {
	    $class("sop.portal.tradeThemePieChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		//선택영역 비율
					$("#tradePieCharts01").highcharts({
						chart : { width :225, height :255, type : 'pie', margin:[40,0,0,0] }, 
						exporting: { enabled: false },
						colors: ['#612a8a', '#2980ff', '#ffb000', '#ff6666'],
						title : { text : '선택영역 비율',  useHTML: true,
							style : { color : '#ffffff', "fontSize" : "12px", 'background-color': '#2f4d6a', 'widith':'110px', 
								'textAlign':'center', 'padding':'2px 10px 2px 10px', 'borderRadius':'11px'}
						},
						legend: {  enabled: false },
						tooltip : {  
							style: { padding: 0 },
	        	        	useHTML: true, 
	        	        	formatter: function() {
	        	        		return "<div class='tooltipTitle-sm'>" + this.point.name + "</div><div class='tooltipBlock-sm'>" + appendCommaToNumber(this.point.y) + "개 (" + this.percentage.toFixed(2) + "%)</div>";
	        	        	}
						},
						plotOptions : {
							pie : {
								allowPointSelect : false,
								cursor : 'pointer',
								dataLabels : { enabled: false },
								point : {
									events : {
										click : function() {
											$bizStatsDataBoard.ui.tradePieChartClick(options.tradearea_id, this.name);
										}
									}
								}
							}
						},
						series : [ {
							name : "Brands", colorByPoint : true,
							data:[{
								name : "음식점",
								y : result.selectArea.rstrt_cnt
							},{
								name : "서비스",
								y : result.selectArea.srv_corp_cnt
							},{
								name : "도소매",
								y : result.selectArea.whrtlsal_corp_cnt
							},{
								name : "숙박업",
								y : result.selectArea.lodge_corp_cnt
							}]
						} ]
					});
					
					//전국평균 비율
					$("#tradePieCharts02").highcharts({
						chart : { width :200, height :230, type : 'pie', margin:[40,0,0,0] }, 
						exporting: { enabled: false },
						colors: ['#612a8a', '#2980ff', '#ffb000', '#ff6666'],
						title : { text : '전국평균 비율',  useHTML: true,
							style : { color : '#ffffff', "fontSize" : "12px", 'background-color': '#2f4d6a', 'widith':'110px', 
								'textAlign':'center', 'padding':'2px 10px 2px 10px', 'borderRadius':'11px'}
						},
						legend: {  enabled: false },
						tooltip : {  
							style: { padding: 0 },
	        	        	useHTML: true, 
	        	        	formatter: function() {
	        	        		return "<div class='tooltipTitle-sm'>" + this.point.name + "</div><div class='tooltipBlock-sm'>" + appendCommaToNumber(this.point.y) + "개 (" + this.percentage.toFixed(2) + "%)</div>";
	        	        	}
						},
						plotOptions : {
							pie : {
								allowPointSelect : false,
								cursor : 'pointer',
								dataLabels : { enabled: false },
								point : {
									events : {
										click : function() {
											$bizStatsDataBoard.ui.tradePieChartClick(options.tradearea_id, this.name);
										}
									}
								}
							}
						},
						series : [ {
							name : "Brands", colorByPoint : true,
							data:[{
								name : "음식점",
								y : result.countryAvg.rstrt_cnt
							},{
								name : "서비스",
								y : result.countryAvg.srv_corp_cnt
							},{
								name : "도소매",
								y : result.countryAvg.whrtlsal_corp_cnt
							},{
								name : "숙박업",
								y : result.countryAvg.lodge_corp_cnt
							}]
						} ]
					}); 
	        	}
	        },
	        onFail : function(status, options) {
	        }
	    });
	}());
	/*********** 상권정보 현황 지역, 전국 Pie차트 End **********/
	
	/*********** 상권정보 테마 Bar 차트 Start **********/
	(function() {
	    $class("sop.portal.tradeThemeBarChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var dataList = [];
	        		for(var i = 0; i < result.length; i ++) {
	        			var tmpList = [];
	        			tmpList.push(result[i].s_theme_cd_nm);
	        			tmpList.push(result[i].corp_cnt);
	        			dataList.push(tmpList);
	        		}
	        		
	        		$("#tradeBarCharts").highcharts({
	        			chart : { 
	        				type : 'column', width: 530, height: 230
	        			},
	        			exporting: { enabled: false },
	        			title : {
	        				text : ''
	        			},
	        			subtitle : {
	        				text : ''
	        			},
	        			xAxis : {
	        				type : 'category',
	        				labels : {
	        					rotation : -45,
	        					style : {
	        						fontSize : '11px'
	        					}
	        				}
	        			},
	        			yAxis : {
	        				min : 0, title : { text : '' },
	        				enabled : false,
	        				labels: {
	        	                enabled: false
	        	            }
	        			},
	        			legend : {
	        				enabled : false
	        			},
	        			tooltip : {
	        				pointFormat : '{point.y:,.0f} 개'
	        			},
	        			series: [{
	        	            name: '업종',
	        	            data: dataList
	        	        }]
	        		});
	          	}
	        },
	        onFail : function(status, options) {
	        }
	    });
	}());
	/*********** 상권정보 테마 Bar 차트 End **********/
	
	/*********** 후보지역 비교 팝업 차트 **********/
	// 스파이더웹 차트 
	(function() {
	    $class("sop.portal.areaInfoCompareSpiderChart.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if (res.errCd == "0") {
	        		var result = res.result;
	        		var map = options.map;
	        		var listData = new Array();		//인구/거주/주택 특성
	        		for(var i = 0; i < result.length; i ++) {
	        			var elem = result[i];
	        			var tempData = new Array();
	        			tempData.push(parseInt(elem.resid_ppltn_per));			//거주인구비율
	        			tempData.push(parseInt(elem.job_ppltn_per));			//직장인구비율
	        			tempData.push(parseInt(elem.apart_per));			//아파트비율
	        			tempData.push(parseInt(elem.one_person_family_per));			//1인가구비율
	        			tempData.push(parseInt(elem.sixty_five_more_ppltn_per));			//65세이상인구비율
	        			tempData.push(parseInt(elem.twenty_ppltn_per));			//20대인구비율
	        			
	        			listData.push({ "adm_nm" : elem.adm_nm, "list" : tempData });
	        		}
	        		
	        		//인구/거주/주택특성 스파이더웹 차트
	        		var selector = options.params.selector;
	        		var title = options.params.adm_nm;
	        		
	    			$(selector).highcharts({ 
	    		        chart: { polar: true, type: 'line', width:340, height:340, margin:[0,10,0,10] },
	    		        colors: ["#585657", options.params.color],
	    		        exporting: { enabled: false },
	    		        title: {
	    		            text: ''
	    		        }, 
	    		        pane: { size: '70%' }, 
	    		        xAxis: {
	    		            categories: ['거주인구', '직장인구비율', '공시지가', '1인 가구', '65세 이상 인구', '20대 인구'],
	    		            tickmarkPlacement: 'on', lineWidth: 0
	    		        }, 
	    		        yAxis: {
	    		            gridLineInterpolation: 'polygon',
	    		            lineWidth: 0,
	    		            min: 0,
	    		            labels: { enabled: false }
	    		        }, 
	    		        tooltip: {
	    		            shared: true,
	    		            pointFormat: "<span>{series.name} : {point.y}</span><br />"
	    		        },
	    		        legend: {
	    		        	enabled : false
	    		        }
	    		    });
	    			
	    			var charts = $(selector).highcharts();
	    			for(var i=0; i<listData.length; i++){
	    				
	    				$(selector).next(".fb").find('.cateSaupLegend')
	    						.append($("<li>" + listData[i].adm_nm + "</li>"));
	    				
	    				charts.addSeries({
	    					type: 'area',
	    					name: listData[i].adm_nm,
	    					data: listData[i].list
	    				});
	    			}
	    			
	    			//표 채우기.. 선택지역만, 상위지역 제외
	    			$.each(result[1], function(key, val){
    					$("#factorTable ."+key).append((key == "adm_nm") ? ("<th>" + val + "</th>") : ("<td>"+val+"</td>"));
	    			});
	        		
	        		//보고서 생성을 위한 데이터 저장
	    			//보고서 생성을 위한 데이터 저장
					$bizStatsDataBoard.ui.setReportData(
							"areaCompare", 
							"compareSpiderChart", 
							result, 
							map.id);
	        		//API 로그
	        		apiLogWrite("B0", options);
	        		
	        	} else if (res.errCd == "-401") {
	        		accessTokenInfo(function() {
	            		$bizStatsDataBoardApi.request.areaSearchSpiderwebChart(options.params);
	            	});
	        	} else {
	        		$("#spyCharts02").html("");
	        	}
	        },
	        onFail : function(status, options) {
	        	$("#spyCharts02").html("");
	        }
	    });
	}());
	// 바 차트
	(function(){
		$class("sop.portal.areaInfoCompareBarChart.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {

	        	$('#barChartArea').html("");
	        	if(!res.result) return;
	        	var result = res.result;
        		var map = options.map;
	        	
	        	$.each(res.result, function(key, value){
	        		var selectType = value[0].selecttype;
	        		var resultData = value[0].resultdata;
	        		
	        		// 타이틀 생성
	        		var title = null;
	        		switch( key ){
	        			case 'companyIncrease': title = "사업체 증감 (" + selectType + ")"; break;
	        			case 'companyCount': title = "사업체 수 (" + selectType + ")"; break;
	        			case 'genderpeople': title = "성별인구 (" + selectType + ")"; break;
	        			case 'household': title = "가구 (" + selectType + ")"; break;
	        			case 'jobpeople': title = "직장인구"; break;
	        			case 'agepeople':
	        				var tmpSelectType = selectType.replace("_under", "세 미만").replace("_over", "세 이상").split(",").join("대, ");
	        				title = "연령별 인구 (" + tmpSelectType + ")"; 
	        				break;
	        			case 'staypeople': title = "거주인구"; break;
	        			case 'apartprice': title = "아파트 시세"; break;
	        			case 'oldhouse': title = "노후주택 (" + selectType + ")"; break;
	        			case 'housetype': title = selectType; break;
	        		}
	        		
	        		var chartHtml = '';
	        		chartHtml += '<div class="dctb">';
					chartHtml += '	<span class="dTitle">' + title + '</span>';
					chartHtml += '	<div id="' + key + 'Chart"></div>';
					chartHtml += '</div>';
					
					$("#barChartArea").append($(chartHtml));
					
					// 보고서용 차트 데이터 저장
	        		var dataBoard = $bizStatsDataBoard.ui.mapData[$bizStatsMap.ui.curMapId].options.dataBoard;
	        		dataBoard.barChartList.push({type: key, title: title, data: resultData});
					
					// 차트 생성
					comparePopUpBarChart("#"+key+"Chart", resultData);
					
					// 표 세팅
					var tr = $("<tr id='" + key + "'><td class='bor'>" + title + "</td></tr>");
					$.each(resultData, function(i, v){
						if($("#detailTable .adm_nm #"+v.adm_cd).length == 0)
							$("#detailTable .adm_nm").append($("<th id='" + v.adm_cd + "'>" + v.adm_nm + "</th>")); 
						tr.append($("<td id='" + key + "_" + v.adm_cd + "'>" + appendCommaToNumber(v.value) + "</td>"));
					});
					$("#detailTable").append(tr);
	        	});
	        	
	        	//보고서 생성을 위한 데이터 저장
				$bizStatsDataBoard.ui.setReportData(
						"areaCompare", 
						"compareBarChart", 
						result, 
						map.id);
	        }
		});
		
		function comparePopUpBarChart(selector, seriesData){
			
			var data = new Array();
			for(var i=0; i<seriesData.length; i++){
				data.push([seriesData[i].adm_nm, parseFloat(seriesData[i].value)]);
			}
			
			$(selector).highcharts({
				chart : { type : 'column', width:340, height:180 },
				title : { text : '' },
				exporting: { enabled: false },
				colors: ['#595758','#f7cd19','#e87719','#a076f4'],
				subtitle : {text : ''},
				xAxis : {
					gridLineWidth:0,
					type : 'category',
					labels : {rotation :0,
						style : {fontSize : '9px'}
					}
				},
				yAxis : {
					gridLineWidth:0,
					min : 0, title : { text : '' },
					enabled : false,
					labels: {enabled: false}
				},
				plotOptions: {
		        },
				legend : {enabled : false},
				tooltip : {pointFormat : '{point.y:,.0f}'},
				series : [ {
					pointWidth:75,
					name : '',
					colorByPoint: true,
					data : data,
					dataLabels : {enabled : false}
				} ]
			});
		}
		
	}());
	/*********** 후보지역 비교 팝업 차트 End **********/
	
	
}(window, document));