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
	W.$technicalBizDataBoardApi = W.$technicalBizDataBoardApi || {};
	
	// --------------- 예시 값 ------------------ //
	$technicalBizDataBoardApi.example = {

            m_class_nm : {
            	"00": "전체",
				"11": "첨단기술",
				"12": "고기술",
				"13": "중기술",
				"14": "저기술",
				"21": "창의 및 디지털",
				"22": "ICT",
				"23": "전문 서비스"
			},
            
           /* colorList : {
				0: ["#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#00AAFF", "#0000FF", "#9900FF"], // 통합 색(7종)
				1: ["#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#D6EB7A", "#CCFF99", "#EBFFAD", "#E0FFB8", "#D6FFC2", "#CCFFCC", "#99FFCC"], // 기술혁신 색 (빨강-노랑 계통)
				2: ["#00AAFF", "#0000FF", "#9900FF", "#8FADEB", "#7AA3F5", "#6699FF", "#7A8FF5", "#8F85EB", "#A37AE0", "#B870D6", "#CC66CC"] // 지식집약 색 (파랑 계통)
			},*/
			 colorList : {
					0: ["#FF0000", "#F99339", "#FFC000", "#92D050", "#00b0f0", "#0000FF", "#7030A0"], // 통합 색(7종)
					1: ["#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#D6EB7A", "#CCFF99", "#EBFFAD", "#E0FFB8", "#D6FFC2", "#CCFFCC", "#99FFCC"], // 기술혁신 색 (빨강-노랑 계통)
					2: ["#00AAFF", "#0000FF", "#9900FF", "#8FADEB", "#7AA3F5", "#6699FF", "#7A8FF5", "#8F85EB", "#A37AE0", "#B870D6", "#CC66CC"], // 지식집약 색 (파랑 계통)
					3: ["#FF0000", "#F99339", "#FFC000", "#92D050", "#00b0f0", "#0000FF", "#7030A0","#FF9900","#0000FF","#FFFF00","#9900FF","#00FF00","#8FADEB","#D6EB7A","#7AA3F5", "#CCFF99","#6699FF","#EBFFAD","#7A8FF5","#E0FFB8","#8F85EB","#D6FFC2","#A37AE0","#CCFFCC","#B870D6","#99FFCC","#CC66CC"]
			
				},
			
			checkClassCd : [11,12,13,14,21,22,23],
            
	}
		
	$technicalBizDataBoardApi.request = {
			
			/**
			 * @name		: sidoFeatureChart
			 * @description	: 업종별 지역 특성정보(spider)
			 * @date		: 2016.09.29
			 * @author		: 김재상
			*/
			//2017.08.29 개발팀 파라미터 type 추가
			sidoFeatureChart : function(options,type){
				var sopPortalSidoFeatureObj = new sop.portal.sidoFeature.api();
				sopPortalSidoFeatureObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalSidoFeatureObj.addParam("base_year", companyDataYear);
				sopPortalSidoFeatureObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getSidoFeature.json",
					options : {
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		chartSeq : options.params.chartSeq,
			        		//2017.08.30 개발팀 파라미터 추가
			        		type : type
			        	},
			        	map : $technicalBizDataBoard.ui.map,
			        	options : options
			        }
				});
			},
			
			/**
			 * @name		: sidoFeatureDetailChart
			 * @description	: 업종별 특성정보(spider)
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			sidoFeatureDetailChart : function(options){
				var sopPortalSidoFeatureDetailObj = new sop.portal.sidoFeatureDetail.api();
				sopPortalSidoFeatureDetailObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalSidoFeatureDetailObj.addParam("base_year", companyDataYear);
				sopPortalSidoFeatureDetailObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getSidoFeatureDetail.json",
					options : {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							chartSeq : options.params.chartSeq,
						},
						map : $technicalBizDataBoard.ui.map
					}
				});
			},
			
			// 2017.08.24 개발팀 수정 시작
			/**
			 * @name		: sidoFeatureLctChart
			 * @description	: 업종별 입지계수현황
			 * @date		: 2016.09.29
			 * @author		: 최재영
			 */
			
			sidoFeatureLctChart : function(options){
				var sopPortalSidoFeatureDetailObj = new sop.portal.sidoFeatureLct.api();
				sopPortalSidoFeatureDetailObj.addParam("adm_cd", options.params.adm_cd);
				sopPortalSidoFeatureDetailObj.addParam("base_year", companyDataYear);
				
				//2017.09.01 개발팀 수정
				sopPortalSidoFeatureDetailObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getSidoFeature.json",
					options : {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							chartSeq : options.params.chartSeq,
						},
						map : $technicalBizDataBoard.ui.map
					}
				});
				
			},
			// 2017.08.24 개발팀 수정 종료
			
			/**
			 * @name		: sidoEconomyChart
			 * @description	: 경제총조사 현황(bar)
			 * @date		: 2016.09.29
			 * @author		: 김재상
			*/
			sidoEconomyChart : function(options){
				var sopPortalSidoEconomyChart = new sop.portal.sidoEconomy.api();
				sopPortalSidoEconomyChart.addParam("b_class_cd", options.params.b_class_cd);
				sopPortalSidoEconomyChart.addParam("sido_cd", options.params.adm_cd);
				/*sopPortalSidoEconomyChart.addParam("base_year", "2010");*/
				sopPortalSidoEconomyChart.addParam("base_year", companyDataYear); //2018.01.15 [개발팀] 년도 하드코딩 수정
				sopPortalSidoEconomyChart.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/technicalBiz/getSidoEconomyList.json",
					options : {
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		type : options.params.economyChartType,
			        		b_class_cd : options.params.b_class_cd
			        	},
			        	map : $technicalBizDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * @name		: sigunguClassChart
			 * @description	: 시군구 기술업종 분류별 사업체 현황차트
			 * @date		: 2016.09.29
			 * @author		: 김재상
			*/
			sigunguClassChart : function(options){
				var sopPortalSigunguClassChart = new sop.portal.sigunguClassChart.api();
				sopPortalSigunguClassChart.addParam("sido_cd", options.params.adm_cd.substring(0,2));
				sopPortalSigunguClassChart.addParam("sgg_cd", options.params.adm_cd);
				sopPortalSigunguClassChart.addParam("m_class_cd", options.params.m_class_cd);
				sopPortalSigunguClassChart.addParam("base_year", companyDataYear);
				sopPortalSigunguClassChart.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getSigunguClassList.json",
					options : {
			        	params : {
			        		adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		m_class_cd : options.params.m_class_cd
			        	},
			        	map : $technicalBizDataBoard.ui.map
			        }
				});
			},
			
			/**
			 * @name		: sigunguRankChart
			 * @description	: 시군구 기술업종 분류별 사업체 현황차트
			 * @date		: 2016.09.29
			 * @author		: 김재상
			 */
			sigunguRankChart : function(options){
				var sopPortalSigunguRankChart = new sop.portal.sigunguRankChart.api();
				sopPortalSigunguRankChart.addParam("adm_cd", options.params.adm_cd);
				sopPortalSigunguRankChart.addParam("m_class_cd", options.params.m_class_cd);
				sopPortalSigunguRankChart.addParam("base_year", companyDataYear); // ppltn 데이터는 2010년밖에 없어서 null이 나올것 
				sopPortalSigunguRankChart.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getSigunguRankList.json",
					options : {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							type_nm : options.params.type_nm,
							type_cd : options.params.type_cd, 
							m_class_cd : options.params.m_class_cd,
						},
						map : $technicalBizDataBoard.ui.map
					}
				});
			},
			
			//2017.09.20 개발팀 추가 함수 sigunguLctChart
			/**
			 * @name		: sigunguLctChart
			 * @description	: 시군구 입지계수 현황
			 * @date		: 2017.09.20
			 * @author		: 최재영
			 */
			addLctSeriesChart : function(options,year,base_region,id){
				var sopPortalSigunguLctChart = new sop.portal.sigunguLctChart.api();
				sopPortalSigunguLctChart.addParam("base_year",year);
				/*sopPortalSigunguLctChart.addParam("lq_base_region",base_region);*/
				/*sopPortalSigunguLctChart.addParam("sido_cd",options.params.adm_cd.substring(0,2));
				sopPortalSigunguLctChart.addParam("sgg_cd",options.params.adm_cd.substring(2));*/
				sopPortalSigunguLctChart.addParam("adm_cd",options.params.adm_cd);
				sopPortalSigunguLctChart.addParam("lower_search",0);
				/*sopPortalSigunguLctChart.addParam("emdong_cd","00");*/
				sopPortalSigunguLctChart.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getRegionLq.json",
					options : {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : year,
							base_region : base_region,
						},
						map : $technicalBizDataBoard.ui.map,
						id : id
					}
				});
			},
			/**
			 * @name		: densityCombinedChart
			 * @description	: 업종밀집도 시계열별 차트
			 * @date		: 2016.10.20
			 * @author		: 김재상
			 */
			densityCombinedChart : function(options){
				var sopPortalDensityCombinedChart = new sop.portal.densityCombinedChart.api();
				sopPortalDensityCombinedChart.addParam("adm_cd", options.params.adm_cd == null ? undefined : options.params.adm_cd);
				sopPortalDensityCombinedChart.addParam("m_class_cd", options.params.m_class_cd);
				sopPortalDensityCombinedChart.addParam("s_class_cd", options.params.s_class_cd);
				sopPortalDensityCombinedChart.addParam("base_year", options.params.base_year);
				sopPortalDensityCombinedChart.request({
					method: "POST",
					async: false,
					url: contextPath + "/ServiceAPI/technicalBiz/getDensityCombinedList.json",
					options : {
						params : options.params,
						dataBoard : options.dataBoard,
						map : $technicalBizDataBoard.ui.map,
					},
				});
			},
			
			/**
			 * @name		: densityCombinedNewCorpChart
			 * @description	: 업종밀집도 업종별 성남시 신설업종 차트
			 * @date		: 2016.11.15
			 * @author		: 김재상
			 */
			densityCombinedNewCorpChart : function(adm_cd, options){
				var sopPortalDensityCombinedNewCorpChart = new sop.portal.densityCombinedNewCorpChart.api();
				sopPortalDensityCombinedNewCorpChart.addParam("adm_cd", adm_cd);
				sopPortalDensityCombinedNewCorpChart.request({
					method: "POST",
					async: false,
					url: contextPath + "/ServiceAPI/technicalBiz/getDensitySeongnamList.json",
					options : {
						adm_cd : adm_cd,
						options : options,
						map : $technicalBizDataBoard.ui.map,
					},
				});
			},
			
			
			/**
			 * 
			 * @name         : supplyAreaStateBarChart
			 * @description  :	지원시설 - 지역통계 현황 Bar차트
			  * @date         :  2016.10.17
			 * @author	     : 이정운 
			 * @param	: 
			 * @history 	 :
			 */
			supplyAreaStateBarChart : function (options){
				var sopPortalSupplyAreaStateBarChartDrawObj = new sop.portal.supplyAreaStateBarChartDraw.api();
				sopPortalSupplyAreaStateBarChartDrawObj.addParam("year", companyDataYear);
				sopPortalSupplyAreaStateBarChartDrawObj.request({
			        method : "POST",
			        options : options,
			        async : false,
			        url : contextPath + "/ServiceAPI/technicalBiz/areaStateBarChart.json"
			    });
				
			},
			
			/**
			 * 
			 * @name         : industryAreaStateBarChart
			 * @description  :	사업단지 - 지역통계 현황 Bar차트(산업단지 데이터)
			  * @date         :  2016.10.17
			 * @author	     : 이정운 
			 * @param	: 
			 * @history 	 :
			 */
			industryAreaStateBarChart : function (options){
				var sopPortalIndustryBarChartDataObj = new sop.portal.industryBarChartData.api();
				sopPortalIndustryBarChartDataObj.addParam("accessToken", accessToken); 	//엑세스토큰
				sopPortalIndustryBarChartDataObj.request({
			        method : "GET",
			        options : options,
			        async : false,
			        url : openApiPath + "/OpenAPI3/technicalbiz/sidoinduscomcount.json" // openAPI
			    });
				
			},
			
			/**
			 * 
			 * @name         : industryBarChartData
			 * @description  :	사업단지 - 지역통계 현황 Bar차트
			  * @date         :  2016.10.17
			 * @author	     : 이정운 
			 * @param	: 
			 * @history 	 :
			 */
			industryAreaStateBarChartDraw : function(chartData){
			
				var sopPortalndustryAreaStateBarChartDrawObj = new sop.portal.industryAreaStateBarChartDraw.api();
				sopPortalndustryAreaStateBarChartDrawObj.addParam("year", companyDataYear);
				sopPortalndustryAreaStateBarChartDrawObj.request({
			        method : "POST",
			        options : chartData,
			        async : false,
			        url : contextPath + "/ServiceAPI/technicalBiz/areaStateBarChart.json"
			    });
			},
			
			/**
			 * 
			 * @name         : startUpSupplyBarChart
			 * @description  :	지원시설 - 창업지원시설 현황 Bar차트
			 * @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param	: 
			 * @history 	 :
			 */
			startUpSupplyBarChart : function (lct_type){
				if(lct_type == "0"){
					//2017.03.14j 기술업종통계지도 -지원시설조회 - 창업시설현황을 모두 다 Disable 할 경우			
					var categoriesArr = ["전국평균", "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];
					var dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
					
					startUpSupplyBarChart_fnc(categoriesArr, dataArr);
				}else{
					var sopPortalStartUpSupplyBarChartDrawObj = new sop.portal.startUpSupplyBarChartDraw.api();
					sopPortalStartUpSupplyBarChartDrawObj.addParam("accessToken", accessToken); 	//엑세스토큰
					sopPortalStartUpSupplyBarChartDrawObj.addParam("lct_type", lct_type); 	//엑세스토큰
					sopPortalStartUpSupplyBarChartDrawObj.request({
	//					method : "POST",
						method : "GET",
				        async : true,
	//			        url : contextPath + "/ServiceAPI/technicalBiz/supplyStartUpSupplyBarChart.json"
				        url : openApiPath + "/OpenAPI3/technicalbiz/sidostartupbizfaccount.json"
				    });
				}
			},
			
			/**
			 * 
			 * @name         : initSupplyDetailCharts
			 * @description  :	지원시설 - 창업지원시설 현황 상세보기(초기화면)
			 * @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param	: 
			 * @history 	 :
			 */
			initSupplyDetailCharts : function (options){
				
				//2017.03.23 지역선택 시, 주요시설 쿼리가 늦어 이전 그래프가 보이는 현상 이슈
				$("#supplyMajorFacilityBarChart").empty();
				
				this.detailRegionInfo(options);
				this.areaSynthesizeStatsInfo(options , "1", "1", "0");				
				this.majorFacilityBarChart(options);
				this.supplyStartUpSupplyList("0", options);
			},
			
			/**
			 * 
			 * @name         : areaSynthesizeStatsInfo
			 * @description  :	지원시설 - 지역 종합 통계 정보
			 * @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param	: options
			 * @param	: type01 - 사업체[1]/종사자[2] 구분
			 * @param	: type02 - 사업체/종사자 수[1], 사업체/종사자 비율[2], 사업체/종사자 증감[3] 구분
			 * @param	: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */
			areaSynthesizeStatsInfo : function (options, type01, type02, type03){
				if(!type01){
					type01 = "1";
				}
				if(!type02){
					type02 = "1";
				}
				if(!type03){
					type03 = "0";
				}
				
				switch (parseInt(type02)) {
					case 1:
						this.technicalBizCntBarChart(options, type01, type03);
						break;
					case 2:
						this.technicalBizPercentPieChart(options, type01, type03);
						break;
					case 3:
						this.technicalBizVariateLineChart(options, type01, type03);
						break;
					//2017.09.27 개발팀 추가
					case 4: 
						if(options.params["menuType"] == "industry"){
							//산업단지일 경우 타는 함수 변경
							//options.params.adm_cd.length
							this.technicalBizIndustryLctChart(options, type01, type03);
						}else{
							this.technicalBizLctChart(options, type01, type03);
						}
						break;
					//2017.09.27 개발팀 추가 종료
				}
			},
			
			/**
			 * 
			 * @name         : technicalBizReturnCode
			 * @description  :	기술업종 중분류 코드값
			 * @date         :  2016.11.01
			 * @author	     : 이정운
			 * @param	: type - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */
			technicalBizReturnCode : function(type){
				var code = '';
				
				switch(Number(type)){
					case 1:
						code = '11';
						break;
					case 2:
						code = '12';
						break;
					case 3:
						code = '13';
						break;
					case 4:
						code = '14';
						break;
					case 5:
						code = '21';
						break;
					case 6:
						code = '22';
						break;
					case 7:
						code = '23';
						break;	
					default :
						code = "00";
						break;
				}
				
				return code;
			},
			
			/**
			 * 
			 * @name         : technicalBizCntBarChart
			 * @description  :	지원시설/산업단지 - 기술업종별 사업체/종사자 수 통계 정보 차트
			 * @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param	: options
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @param 		: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */
			technicalBizCntBarChart  : function(options, type01, type03){
				var sopPortalTechnicalBizCntBarChartDrawObj = new sop.portal.technicalBizCntBarChartDraw.api();
				if (options.params != undefined) {
					for (var p in options.params) {
						if (p == "adm_cd" || p == "year") {
							sopPortalTechnicalBizCntBarChartDrawObj.addParam(p, options.params[p]);
						}
					}
				}
				sopPortalTechnicalBizCntBarChartDrawObj.addParam("techbiz_class_cd", this.technicalBizReturnCode(type03));
				sopPortalTechnicalBizCntBarChartDrawObj.request({
			        method : "POST",
			        options : options,
			        async : true,
			        url : contextPath + "/ServiceAPI/technicalBiz/technicalBizCntBarChart.json"
			    });
			},
			
			/**
			 * 
			 * @name         : technicalBizPercentPieChart
			 * @description  :	지원시설/산업단지 - 기술업종별 사업체/종사자 비율 통계 정보 차트
			 * @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param	: options
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @param 		: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */			
			technicalBizPercentPieChart : function(options, type01, type03){
				var sopPortalTechnicalBizPercentPieChartDrawObj = new sop.portal.technicalBizPercentPieChartDraw.api();
				if (options.params != undefined) {
					for (var p in options.params) {
						if (p == "adm_cd" || p == "year") {
							sopPortalTechnicalBizPercentPieChartDrawObj.addParam(p, options.params[p]);
						}
					}
				}
				sopPortalTechnicalBizPercentPieChartDrawObj.addParam("techbiz_class_cd", this.technicalBizReturnCode(type03));
				sopPortalTechnicalBizPercentPieChartDrawObj.request({
			        method : "POST",
			        options : options,
			        async : true,
			        url : contextPath + "/ServiceAPI/technicalBiz/technicalBizPercentPieChart.json"
			    });
			},
			
			/**
			 * 
			 * @name         : technicalBizVariateLineChart
			 * @description  :	지원시설산업단지 - 기술업종별 사업체/종사자 증감 통계 정보 차트
			* @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param	: options
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @param 		: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */	
			technicalBizVariateLineChart : function(options, type01, type03){ 
				var sopPortalTechnicalBizVariateLineChartDrawObj = new sop.portal.technicalBizVariateLineChartDraw.api();
				if (options.params != undefined) {
					for (var p in options.params) {
						if (p == "adm_cd" || p == "year") {
							sopPortalTechnicalBizVariateLineChartDrawObj.addParam(p, options.params[p]);
						}
					}
				}
				sopPortalTechnicalBizVariateLineChartDrawObj.addParam("techbiz_class_cd", this.technicalBizReturnCode(type03));
				sopPortalTechnicalBizVariateLineChartDrawObj.request({
			        method : "POST",
			        options : options,
			        async : false,
			        url : contextPath + "/ServiceAPI/technicalBiz/technicalBizVariateLineChart.json"
			    });
			},
			
			
			//2017.09.27 개발팀 추가
			/**
			 * 
			 * @name         : technicalBizLctChart
			 * @description  :	지원시설 - 기술업종별 업종별 입지계수 차트
			 * @date         :  2017.09.27
			 * @author	     : 최재영
			 * @param	: options
			 * @history 	 :
			 */	
			technicalBizLctChart : function(options, type01, type03, regionType){ //2018.01.15 [개발팀]
				//=========== 2018.01.15 [개발팀] function 내 로직 변경 -통으로 머지 요망 START =============//
				var id = "supplyAreaSynthesizeStatsInfoChart04";
				var url = "/ServiceAPI/technicalBiz/getRegionLq.json";
				var base_region = "country";
				
				if (options.params.adm_cd != undefined && options.params.adm_cd.length > 2) {
					if (regionType != undefined && regionType != null) {
						base_region = regionType;
					}
					
					var sido_nm = "시도";
					if (options.params.adm_nm != undefined) {
						sido_nm = options.params.adm_nm.split(" ")[0];
					}
					
					var html = "";
						html +='<a href="javascript:$technicalBizDataBoard.ui.supplyIndustryChangeLqChart(\''+options.params.adm_cd+'\', \''+sido_nm+'\', \'country\', \'supply\');">전국 대비</a>';
						html +='<a href="javascript:$technicalBizDataBoard.ui.supplyIndustryChangeLqChart(\''+options.params.adm_cd+'\', \''+sido_nm+'\', \'sido\', \'supply\');">'+sido_nm+' 대비</a>';	
					$("#supplyLqInfoChartStandardButton").html(html);	
					
					if (base_region == "country") {
						$("#supplyLqInfoChartStandardButton > a").eq(0).addClass("on");
					}else {
						$("#supplyLqInfoChartStandardButton > a").eq(1).addClass("on");
					}
					
				
					$("#supplyLqInfoChartStandard").show();
					$("#supplyLqInfoChartStandard").next().css({
						"position" : "absolute",
						"top": "2px"
					});
				}else {
					$("#supplyLqInfoChartStandard").hide();
					$("#supplyLqInfoChartStandard").next().css({
						"position" : "relative",
						"top": "5px"
					});
				}
				
				var sopPortalTechnicalBizLctChart = new sop.portal.technicalBizLctChart.api();
				sopPortalTechnicalBizLctChart.addParam("base_year", options.params.year);
				sopPortalTechnicalBizLctChart.addParam("lower_search", '0');
				sopPortalTechnicalBizLctChart.addParam("adm_cd", options.params.adm_cd);
				//=========== 2018.01.15 [개발팀] function 내 로직 변경  END =============//
				
				
				sopPortalTechnicalBizLctChart.request({
					method : "POST",
					async : true, //2018.01.15 [개발팀]
					url : contextPath + url,
					options : {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : options.params.year,
							base_region : base_region,
						},
						map : options.params.map,
						id : id,
						type : base_region //2018.01.15 [개발팀]
					}
				});
				
			},
			
			/**
			 * 
			 * @name         : technicalBizIndustryLctChart
			 * @description  :	산업단지 - 기술업종별 업종별 입지계수 차트
			 * @date         :  2017.10.11
			 * @author	     : 최재영
			 * @param	: options
			 * @history 	 :
			 */	
			technicalBizIndustryLctChart : function(options, type01, type03, regionType){ //2018.01.15 [개발팀])
				//=========== 2018.01.15 [개발팀] function 내 로직 변경 -통으로 머지 요망 START =============//
				var id = "industryAreaSynthesizeStatsInfoLctChart";
				var url = "/ServiceAPI/technicalBiz/getRegionLq.json";
				var base_region = "country";
				
				if (options.params.adm_cd != undefined && options.params.adm_cd.length > 2) {
					if (regionType != undefined && regionType != null) {
						base_region = regionType;
					}
					
					var sido_nm = "시도";
					if (options.params.adm_nm != undefined) {
						sido_nm = options.params.adm_nm.split(" ")[0];
					}
					
					var html = "";
						html +='<a href="javascript:$technicalBizDataBoard.ui.supplyIndustryChangeLqChart(\''+options.params.adm_cd+'\', \''+sido_nm+'\', \'country\', \'industry\');">전국 대비</a>';
						html +='<a href="javascript:$technicalBizDataBoard.ui.supplyIndustryChangeLqChart(\''+options.params.adm_cd+'\', \''+sido_nm+'\', \'sido\', \'industry\');">'+sido_nm+' 대비</a>';	
					$("#industryLqInfoChartStandardButton").html(html);	
					
					if (base_region == "country") {
						$("#industryLqInfoChartStandardButton > a").eq(0).addClass("on");
					}else {
						$("#industryLqInfoChartStandardButton > a").eq(1).addClass("on");
					}
					
				
					$("#industryLqInfoChartStandard").show();
					$("#industryLqInfoChartStandard").next().css({
						"position" : "absolute",
						"top": "2px"
					});
				}else {
					$("#industryLqInfoChartStandard").hide();
					$("#industryLqInfoChartStandard").next().css({
						"position" : "relative",
						"top": "5px"
					});
				}
				
				var sopPortalTechnicalBizIndustryLctChart = new sop.portal.technicalBizIndustryLctChart.api();
				sopPortalTechnicalBizIndustryLctChart.addParam("base_year", options.params.year);
				sopPortalTechnicalBizIndustryLctChart.addParam("lower_search", '0');
				sopPortalTechnicalBizIndustryLctChart.addParam("adm_cd", options.params.adm_cd);
				//=========== 2018.01.15 [개발팀] function 내 로직 변경  END =============//
				
				
				sopPortalTechnicalBizIndustryLctChart.request({
					method : "POST",
					async : true, //2018.01.15 [개발팀]
					url : contextPath + url,
					options : {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : options.params.year,
							base_region : base_region,
						},
						map : options.params.map,
						id : id,
						type : base_region, //2018.01.15 [개발팀]
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : technicalBizIndustryDetailLctChart
			 * @description  :	산업단지 - 기술업종 해당 산업단지 입지계수 차트
			 * @date         :  2017.10.11
			 * @author	     : 최재영
			 * @param	: options
			 * @history 	 :
			 */	
			technicalBizIndustryDetailLctChart : function(options,data){
				var id = "industryAreaSynthesizeStatsInfoDetailLctChart";
				var url = "/ServiceAPI/technicalBiz/getInduscomLq.json";
				var sopPortalTechnicalBizIndustryLctChart = new sop.portal.technicalBizIndustryDetailLctChart.api();
				var base_region = "country";
				/*sopPortalTechnicalBizIndustryLctChart.addParam("base_year",options.params.year);*/
				sopPortalTechnicalBizIndustryLctChart.addParam("base_year", companyDataYear); //2018.01.15 [개발팀] 년도 하드코딩 수정
				sopPortalTechnicalBizIndustryLctChart.addParam("complex_no",data.complex_no);
				
				//전국 대비냐 시도 대비냐에 따라 값이 바뀜
				if($("#industryLctDetailStandard > a").eq(0).hasClass("on")){
					base_region = "country";
				}else{
					base_region = "sido";
				}
				
				sopPortalTechnicalBizIndustryLctChart.request({
					method : "POST",
					async : false,
					url : contextPath + url,
					options : {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : options.params.year,
							base_region : base_region,
							complex_nm : data.complex_nm,
							complex_no : data.complex_no
						},
						map : options.params.map,
						id : id,
						type : "sgg",
						base_region : base_region
					}
				});
			},
			
			/**
			 * 
			 * @name         : majorFacilityBarChart
			 * @description  :	지원시설, 산업단지 - 주요지원시설 현황 통계 정보 차트
			 * @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param	: options
			 * @history 	 :
			 */	
			majorFacilityBarChart : function(options){
				var sopPortalMajorFacilityBarChartDrawObj = new sop.portal.majorFacilityBarChartDraw.api();
				if (options.params != undefined) {
					for (var p in options.params) {
						if (p == "adm_cd" || p == "year") {
							sopPortalMajorFacilityBarChartDrawObj.addParam(p, options.params[p]);
						}
					}
				}
				sopPortalMajorFacilityBarChartDrawObj.request({
			        method : "POST",
			        async : true,
			        options : options,
			        url : contextPath + "/ServiceAPI/technicalBiz/majorFacilityBarChart.json"
			    });
			},
			
			/**
			 * 
			 * @name         : supplyStartUpSupplyList
			 * @description  :	지원시설 - 창업지원시설 목록
			 * @date         :  2016.10.17
			 * @author	     : 이정운
			 * @param		: type - 창업지원시설 구분
			 * @history 	 :
			 */	
			supplyStartUpSupplyList : function(type, options){
				var sopPortalstartUpSupplyListObj = new sop.portal.supplyStartUpSupplyListData.api();
				if (options.params != undefined) {
					for (var p in options.params) {
						if (p == "adm_cd") {
							sopPortalstartUpSupplyListObj.addParam(p, options.params[p]); 
						}
					}
				}
				//2017.09.26 개발팀 수정 시작
				
				/*if (type != "0") {
					sopPortalstartUpSupplyListObj.addParam("lct_type", type); 
				}*/
				if(type.constructor === Array){
					sopPortalstartUpSupplyListObj.addParam("lct_type", type);
				}else{
					if (type != "0") {
						/*sopPortalstartUpSupplyListObj.addParam("lct_type", type);*/
						var tempVal = type;
						type = new Array();
						type.push(tempVal);
						sopPortalstartUpSupplyListObj.addParam("lct_type", type);
					}else{
						type = new Array();
						type.push("1");
						type.push("2");
						type.push("3");
						type.push("4");
						sopPortalstartUpSupplyListObj.addParam("lct_type", type);
					}
					
				}
				
				
				//2017.09.26 개발팀 수정 종료
				
				
				sopPortalstartUpSupplyListObj.addParam("page", "1");
				sopPortalstartUpSupplyListObj.addParam("count", "1000"); 
				sopPortalstartUpSupplyListObj.addParam("accessToken", accessToken); 	//엑세스토큰
				sopPortalstartUpSupplyListObj.request({
					method : "GET",
					async : true,
					options : {
						type : type,
						options : options
					},
					url : openApiPath + "/OpenAPI3/technicalbiz/sidosggstartupbizfac.json"
				});
				
//=====================================================
			},
			
			//창업지원시설 정보 더보기 팝업
			supplyStartUpSupplyDetailData : function(resultData){
				
//TODO 데이터 처리(테스트 데이터 삽입, 데이터 컬럼 추가 확인 후)
				//기관명(inst_nm)
				//입지유형(lct_type)
				//주력분야
				//지역
				//소재지(addr)
				//전화(tel_no)	
				//팩스	
				//홈페이지(url)
				//보유장비현황	
				//센터
				$(".popUpSupply").show();
				
			},
			
			
			
			/**
			 * 
			 * @name         : initIndustryDetailCharts
			 * @description  :	산업단지 상세조회
			 * @date         :  2016.10.18
			 * @author	     : 이정운
			 * @param		: options
			 * @history 	 :
			 */	
			initIndustryDetailCharts : function(options, callback){
				$.each($(".industryDetailStep01").find("dt"), function(i){
					$(this).children("a").removeClass("on");
				});
				$.each($(".industryDetailStep01").find("dd"), function(){
					$(this).css("display","block");
				});
				$(".industryDetailStep02").hide();
				
				//2017.03.23 지역선택 시, 주요시설 쿼리가 늦어 이전 그래프가 보이는 현상 이슈
				$("#industryMajorFacilityBarChart").empty();
				
				this.detailRegionInfo(options);
				this.areaSynthesizeStatsInfo(options, "1", "1", "0");				
				this.majorFacilityBarChart(options);
				this.industryList("0", options, callback);
			},
			
			/**
			 * 
			 * @name         : industryList
			 * @description  :	산업단지 목록
			 * @date         :  2016.10.18
			 * @author	     : 이정운
			 * @param		 : type - 산업단지 목록 구분
			 * @history 	 :
			 */	
			industryList : function(type, options, callback){
				var sopPortalIndustryListObj = new sop.portal.industryListData.api();
				if (options.params != undefined) {
					for (var p in options.params) {
						if (p == "adm_cd") {
							sopPortalIndustryListObj.addParam(p, options.params[p]); 
						}
					}
				}
				//2017.09.30 개발팀 수정
				/*if (type != "0"){
					sopPortalIndustryListObj.addParam("induscom_cd", type);
				}*/
				
				if(type.constructor === Array){
					sopPortalIndustryListObj.addParam("induscom_cd", type);
				}else{
					if (type != "0") {
						var tempVal = type;
						type = new Array();
						type.push(tempVal);
						sopPortalIndustryListObj.addParam("induscom_cd", type);
					}else{
						type = new Array();
						type.push("1");
						type.push("2");
						type.push("3");
						type.push("4");
						sopPortalIndustryListObj.addParam("induscom_cd", type);
					}
					
				}
				
				sopPortalIndustryListObj.addParam("accessToken", accessToken);
				sopPortalIndustryListObj.addParam("page", "1");
				sopPortalIndustryListObj.addParam("count", "1000");
				sopPortalIndustryListObj.request({
					method : "GET",
					async : true,
					options : {
						type : type,
						options : options,
						callback : callback
					},
					url : openApiPath + "/OpenAPI3/technicalbiz/sidosgginduscom.json"
				});		
			},
			
			//산업단지 정보 더보기 팝업
			industryDetailData : function(resultData){
				
//TODO 데이터 처리(API에러 확인, 테스트 데이터 삽입 후 주석 해제)
//				$("#complexNmTxt").html(resultData.complex_nm);				//산업단지 명				
//				$("#makePurpsChartrTxt").html(resultData.make_purps_chartr);				//1. 조성목적 및 특징
//				$("#implementerMgmtInstTxt").html(resultData.implementer_mgmt_inst);	//2. 사업시행자/관리기관
//				$("#lcTxt").html(resultData.lc);														//3. 위치
//				$("#totAreaTxt").html(resultData.tot_area);										//4. 관리면적 - 총면적
//				$("#indutyFacZoneAreaTxt").html(resultData.induty_fac_zone_area);			//4. 관리면적 - 산업시설구역
//				$("#upportFacZoneAreaTxt").html(resultData.support_fac_zone_area);		//4. 관리면적 - 지원시설구역
//				$("#pubFacZoneAreaTxt").html(resultData.pub_fac_zone_area);				//4. 관리면적 - 공동시설구역
//				$("#greenZoneAreaTxt").html(resultData.green_zone_area);					//4. 관리면적 - 녹지구역
//				$("#residZoneAreaTxt").html(resultData.resid_zone_area);						//4. 관리면적 - 주거구역
//				$("#etcZoneAreaTxt").html(resultData.etc_zone_area);							//4. 관리면적 - 기타
//				$("#mvnBizTxt").html(resultData.mvn_biz);										//5. 입지조건 - 입주업종
//				$("#mvnQualfTxt").html(resultData.mvn_qualf);									//5. 입지조건 - 입주자격
//				$("#mvnLimitTxt").html(resultData.mvn_limit);									//5. 입지조건 - 입주제한
				
				$(".popUpIndustry").show();
				
			},
			

			/**
			 * 
			 * @name         : industryVariationStateLineChart
			 * @description  :	산업단지 내 기술업종 증감현황 꺽은선 차트
			 * @date         :  2016.10.18
			 * @author	     : 이정운
			 * @param		: type - 산업단지 목록 구분
			 * @history 	 :
			 */	
			industryVariationStateLineChart : function(type, complex_no, complex_nm){
				var sopPortalIndustryVariationStateLineChartDrawObj = new sop.portal.industryVariationStateLineChartDraw.api();
				sopPortalIndustryVariationStateLineChartDrawObj.addParam("complex_no", complex_no);
				sopPortalIndustryVariationStateLineChartDrawObj.request({
			        method : "POST",
			        async : true,
			        options : {
			        	complex_no : complex_no,
			        	complex_nm : complex_nm,
			        	type : type
			        },
			        url : contextPath + "/ServiceAPI/technicalBiz/industryVariationStateLineChart.json"
			    });
			},
			
			/**
			 * 
			 * @name         : industryDistributionStateRadialShapeChart
			 * @description  :	산업단지 내 기술업종 분포현황 방사형 차트
			 * @date         :  2016.10.18
			 * @author	     : 이정운
			 * @param		: 
			 * @history 	 :
			 */	
			industryDistributionStateRadialShapeChart : function(complex_no, complex_nm){
				var sopPortalIndustryDistributionStateRadialShapeChartDrawObj = new sop.portal.industryDistributionStateRadialShapeChartDraw.api();
				sopPortalIndustryDistributionStateRadialShapeChartDrawObj.addParam("complex_no", complex_no);
				sopPortalIndustryDistributionStateRadialShapeChartDrawObj.request({
			        method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/technicalBiz/industryDistributionStateRadialShapeChart.json",
			        options : {
			        	complex_no : complex_no,
			        	complex_nm : complex_nm
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : industryDetailStateBarChart
			 * @description  :	산업단지 내 기술업종 상세현황 막대차트
			 * @date         :  2016.10.18
			 * @author	     : 이정운
			 * @param		: type - 기술 구분
			 * @history 	 :
			 */	
			industryDetailStateBarChart : function(type, complex_no, complex_nm){
				var sopPortalIndustryDetailStateBarChartDrawObj = new sop.portal.industryDetailStateBarChartDraw.api();			
				sopPortalIndustryDetailStateBarChartDrawObj.addParam("techbiz_m_class_cd", this.technicalBizReturnCode(type));
				sopPortalIndustryDetailStateBarChartDrawObj.addParam("complex_no", complex_no);
				sopPortalIndustryDetailStateBarChartDrawObj.request({
			        method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/technicalBiz/industryDetailStateBarChart.json",
			        options :{
			        	complex_no : complex_no,
			        	tech_cd : this.technicalBizReturnCode(type),
			        	complex_nm : complex_nm
			        	
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  :	산업단지 내 주요시설 현황 꺽은선,막대차트
			 * @date         :  2016.10.18
			 * @author	     : 이정운
			 * @param		: 
			 * @history 	 :
			 */	
			industryImportantFacilityStateBarChart : function(complex_no, complex_nm){
				var sopPortalIndustryImportantFacilityStateBarChartDrawObj = new sop.portal.industryImportantFacilityStateBarChartDraw.api();
				sopPortalIndustryImportantFacilityStateBarChartDrawObj.addParam("complex_no", complex_no);
				sopPortalIndustryImportantFacilityStateBarChartDrawObj.request({
			        method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/technicalBiz/industryImportantFacilityStateBarChart.json",
			        options : {
			        	complex_no : complex_no,
			        	complex_nm : complex_nm
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : detailRegionInfo
			 * @description  : 지원시설- 지역종합상제정보
			 * @date         : 2016.11.19
			 * @author	     : 권차욱
			 * @param		 : 
			 * @history 	 :
			 */
			detailRegionInfo : function(options) {
				var sopPortalDetailRegionInfoObj = new sop.portal.detailRegionInfo.api();
				if(options.params != undefined) {
					for (var p in options.params) {
						if (p == "adm_cd" || p == "year") {
							sopPortalDetailRegionInfoObj.addParam(p, options.params[p])
						}
					}
				}
				sopPortalDetailRegionInfoObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/technicalBiz/detailRegionInfo.json",
					options : options
				 });
			},
			
			updateEconomyChartData : function (options) {
				var res = options.data;
				var b_class_cd = options.params.b_class_cd || 0;
				var colorList = $technicalBizDataBoardApi.example.colorList;
				var type = options.params.economyChartType;
				
				var sidoResult = (b_class_cd == 0) ? res.result.sidoEconomyList : $.pick(res.result.sidoEconomyList, {b_class_cd: b_class_cd});
				var totalResult = (b_class_cd == 0) ? res.result.totalEconomyList : $.pick(res.result.totalEconomyList, {b_class_cd: b_class_cd});
				
				var categories = [];
				var colors = [];
				var sidoData = [];
				var totalData = [];
				
				//전국 경제총조사
				for(var i=0; i<totalResult.length; i++){
					//2017.08.30 개발팀 수정 시작
					var checkAble = false;
					for(var j = 0; j < $technicalBizDataBoardApi.example.checkClassCd.length;j++){
						if($technicalBizDataBoardApi.example.checkClassCd[j] == totalResult[i].m_class_cd ){
							checkAble = true;
						}
					}
					if(checkAble == true){
						//sales 매출액
						//lbcst 인건비
						//rntchrg 임대료
						//business_profit 영업이익
						totalData.push(parseFloat(totalResult[i][type]));
					}
					//2017.08.30 개발팀 수정 종료
					//totalData.push(parseFloat(totalResult[i][type]));
				}
				// 지역 경제총조사
				for(var i=0; i<sidoResult.length; i++){
					//2017.08.30 개발팀 수정시작
					var checkAble = false;
					for(var j = 0; j < $technicalBizDataBoardApi.example.checkClassCd.length;j++){
						if($technicalBizDataBoardApi.example.checkClassCd[j] == sidoResult[i].m_class_cd ){
							checkAble = true;
						}
					}
					if(checkAble == true){
						colors.push(colorList[b_class_cd][i]);
						categories.push(sidoResult[i].m_class_nm);
						sidoData.push(parseFloat(sidoResult[i][type]));
					}
					
					//colors.push(colorList[b_class_cd][i]);
					//categories.push(sidoResult[i].m_class_nm);
					//sidoData.push(parseFloat(sidoResult[i][type]));
					//2017.08.30 개발팀 수정완료					
				}
				var series = [
				  {
					  type: 'bar',
					  pointWidth: 10,
					  // 2017. 03. 09 개발팀 수정 요청
					  name: '17개 시도 평균',
					  data: totalData,
				  },
		          {
		        	  type: 'bar',
		        	  pointWidth: 10,
		        	  name: options.params.adm_nm,
		        	  data: sidoData
		          }
		        ];
				
				createSidoEconomyChart("#sidoEconomyChart0"+b_class_cd, categories, series, colors);
				$technicalBizDataBoard.ui.setReportData(
						"sido", 
						"sidoEconomyChart", 
						sidoResult, 
						options.params.map.id);
			},
			
			
			//2017.10.20 개발팀 추가
			/**
			 * @name		: lqInfoYearDataBoardGrid
			 * @description	: 업종별 년도 입지계수 데이터보드 오픈
			 * @date		: 2017.10.20
			 * @author		: 최재영
			 */
			lqInfoYearDataBoardGrid : function(options,lower_search,callback){
				var sopPortalLqInfoYearDataBoardGridObj = new sop.portal.lqInfoYearDataBoardGrid.api();
				sopPortalLqInfoYearDataBoardGridObj.addParam("techbiz_class_cd",options.techiBiz_class_cd);
				sopPortalLqInfoYearDataBoardGridObj.addParam("adm_cd",options.adm_cd);
				sopPortalLqInfoYearDataBoardGridObj.addParam("lower_search",lower_search);
				
				sopPortalLqInfoYearDataBoardGridObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/technicalBiz/getRegionLq.json",
					options : {
						techbiz_class_cd : options.techiBiz_class_cd,
						adm_cd	: options.adm_cd,
						lower_search :lower_search,
						selectThemeCd : options.techiBiz_class_cd,
						callback : callback
					}
				 });
			},
			
			//2017.10.20 개발팀 추가 종료
			
			//2017.10.24 개발팀 추가
			/**
			 * @name         : getInnerTechCd
			 * @description  : 기술업종 하위 클래스 시디 가져오기
			 * @date         : 2016. 10. 12. 
			 * @author	     : 김재상
			 */
			getInnerTechCd : function(m_class_cd,id){
				var sopPortalGetTechCd = new sop.portal.getInnerTechCd.api();
				sopPortalGetTechCd.addParam("b_class_cd", undefined);
				sopPortalGetTechCd.addParam("m_class_cd", m_class_cd.substring(0,2));
				sopPortalGetTechCd.addParam("s_class_cd", undefined);
				
				sopPortalGetTechCd.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getTechCd.json",
					options : {
						params : {
							m_class_cd : m_class_cd,
							id : id
						}
					}
				});
			},
			
			/**
			 * @name         : searchDetailArea
			 * @description  : 검색 지역 상세 보기
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			searchDetailAreaSggCnt : function(params){
				
				var searchDetailInfoOpen = new sop.openApi.searchDetailAreaSggCnt();
				searchDetailInfoOpen.addParam("adm_cd",params.adm_cd);
				searchDetailInfoOpen.addParam("year",params.year);
				searchDetailInfoOpen.addParam("type","2");
				
				searchDetailInfoOpen.request({
					method : "POST",
					async : false,
					url : contextPath +  "/ServiceAPI/technicalBiz/supplyRegionInfo.json",
					options : params
				}); 
			},
			
			/**
			 * @name         : searchDetailSupplyIndustryPerInfo
			 * @description  : 검색 산업단지 보기
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @param		 : 
			 * @history 	 :
			 */
			searchDetailSupplyIndustryPerInfo: function(params){
				var searchDetailSupplyIndustryPerInfoObj = new sop.portal.searchDetailPerInfoObj();
				searchDetailSupplyIndustryPerInfoObj.addParam("year",params.year);
				searchDetailSupplyIndustryPerInfoObj.addParam("adm_cd",params.adm_cd);
				
				searchDetailSupplyIndustryPerInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/detailRegionInfo.json",
					options : params
				});
				
			},
			
			
			/**
			 * @name         : searchDetailAreaTechnical
			 * @description  : 검색 지역 상세 기술업종 보기
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @param 		: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */
			searchDetailAreaTechnical : function(params,type01,type03){
				var searchDetailTechnicalOpen = new sop.portal.searchDetailAreaTechnical();
				searchDetailTechnicalOpen.addParam("year",params.year);
				searchDetailTechnicalOpen.addParam("adm_cd",params.adm_cd);
				searchDetailTechnicalOpen.addParam("techbiz_class_cd", $technicalBizDataBoardApi.request.technicalBizReturnCode(type03));
				
				searchDetailTechnicalOpen.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/technicalBizCntBarChart.json",
					options : params
				});
				
			},
			/**
			 * @name         : searchDetailAreaPieChart
			 * @description  : 검색 지역 상세 파이차트 보기
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @param 		: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */
			searchDetailAreaPieChart : function(params,type01,type03){
				var searchDetailTechnicalOpen = new sop.portal.searchDetailAreaTechnical();
				searchDetailTechnicalOpen.addParam("year",params.year);
				searchDetailTechnicalOpen.addParam("adm_cd",params.adm_cd);
				searchDetailTechnicalOpen.addParam("techbiz_class_cd", $technicalBizDataBoardApi.request.technicalBizReturnCode(type03));
				
				searchDetailTechnicalOpen.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/technicalBizPercentPieChart.json",
					options : params
				});
			},
			
			/**
			 * @name         : searchDetailAreaVariateLineChart
			 * @description  : 검색 지역 증감차트
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @param 		: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */
			searchDetailAreaVariateLineChart : function(params,type01,type03){
				var searchDetailTechnicalOpen = new sop.portal.searchDetailAreaTechnical();
				searchDetailTechnicalOpen.addParam("year",params.year);
				searchDetailTechnicalOpen.addParam("adm_cd",params.adm_cd);
				searchDetailTechnicalOpen.addParam("techbiz_class_cd", $technicalBizDataBoardApi.request.technicalBizReturnCode(type03));
				
				searchDetailTechnicalOpen.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/technicalBizVariateLineChart.json",
					options : params
				});
			},
			
			/**
			 * @name         : searchDetailAreaBizLctChart
			 * @description  : 검색 지역 증감차트
			 * @date         : 2017.11.20
			 * @author	     : 최재영
			 * @param		: type01 - 사업체[1]/종사자[2] 구분
			 * @param 		: type03 - 기술(첨단기술[1], 고기술[2], 중기술[3], 저기술[4], 창의/디지털[5], ICT[6], 전문서비스[7]) 구분
			 * @history 	 :
			 */
			searchDetailAreaBizLctChart : function(params,type01,type03){
				var searchDetailTechnicalOpen = new sop.portal.searchDetailAreaTechnical();
				searchDetailTechnicalOpen.addParam("base_year",params.year);
				searchDetailTechnicalOpen.addParam("lower_search",'0');
				searchDetailTechnicalOpen.addParam("adm_cd",params.adm_cd);
				/*searchDetailTechnicalOpen.addParam("techbiz_class_cd", $technicalBizDataBoardApi.request.technicalBizReturnCode(type03));*/
				
				searchDetailTechnicalOpen.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/technicalBiz/getRegionLq.json",
					options : params
				});
			}
	};
	
	$technicalBizDataBoardApi.Util = {
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
			}
	};
	
	/** 시도별 기술업종현황 - 업종별 지역 특성정보(spider) */
	
	(function() {
		$class("sop.portal.sidoFeature.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				
				if(res.errCd == 0){ // 정상 수행
					//2017.08.29 개발팀 추가 증감 표현식 변경
					var featureData = res.result.featureData;
					var totData = [];
					var sidoData = [];
					var categories = [];
					//2017.08.28 개발팀 추가
					var categoriesCd = [];
					var workerData = [];
					//2017.08.28 개발팀 완료
					//2017.08.28 개발팀 수정 기존로직 if문 분기 추가
					if(options.params.type == "cnt"){
						for(var i=0; i<featureData.length; i++){
							if(r = featureData[i]){
								categories.push(r.m_class_nm);
								totData.push(parseFloat(r.tot_z_score));
								sidoData.push(parseFloat(r.sido_z_score));
								//2017.08.28 개발팀 추가
								categoriesCd.push(r.m_class_cd);
								workerData.push(parseFloat(r.worker_per_avg));
								//2017.08.28 개발팀 완료
							}
						}
						
						var series = [{
							type: 'line',
							color: '#0085ff',
							name: '17개 시도 평균',
							data: totData
						},{
							type: 'line',
							color: '#f6b64e',
							/*name: options.params.adm_nm + " 사업체 수",*/
							name: "사업체 수",
							data: sidoData
						},{
							//2017.08.28 개발팀 추가
							type: 'line',
							color: '#666',
							name: '종사자 수', //2018.01.18 [개발팀] 띄어쓰기
							data: workerData
							//2017.08.28 개발팀 완료
						}];
						
						createSidoFeatureChart("#sidoFeatureChart01", categories, series);
						
						$technicalBizDataBoard.ui.options.params.featureType = "basic";
						
						//보고서 정보 저장
						$technicalBizDataBoard.ui.setReportData(
								"sido", 
								"sidoFeatureChart", 
								featureData, 
								options.map.id);
					}else{
						for(var i=0; i<featureData.length; i++){
							if(r = featureData[i]){
								categories.push(r.m_class_nm);
								totData.push(parseFloat(r.tot_z_score));//해당숫자문의 필요
								sidoData.push(parseFloat(r.corp_irdsrate_avg));
								//2017.08.28 개발팀 추가
								categoriesCd.push(r.m_class_cd);
								workerData.push(parseFloat(r.worker_irdsrate_avg));
								//2017.08.28 개발팀 완료
							}
						}
						
						var series = [{
							type: 'line',
							color: '#0085ff',
							name: '17개 시도 평균',
							data: totData
						},{
							type: 'line',
							color: '#f6b64e',
							/*name: options.params.adm_nm + " 사업체 증감",*/
							name:"사업체 증감",
							data: sidoData
						},{
							//2017.08.28 개발팀 추가
							type: 'line',
							color: '#666',
							name: '종사자 증감', //2018.01.18 [개발팀] 띄어쓰기
							data: workerData
							//2017.08.28 개발팀 완료
						}];
						
						createSidoFeatureChart("#sidoFeatureChart02", categories, series);
						
						$technicalBizDataBoard.ui.options.params.featureType = "basic";
						
						//보고서 정보 저장
						$technicalBizDataBoard.ui.setReportData(
								"sido", 
								"sidoFeatureChart", 
								featureData, 
								options.map.id);
					}
					
					//하단 탭 생성
					//categories
					//categoriesCd
					$technicalBizDataBoardApi.example.checkClassCd = [11,12,13,14,21,22,23];
					var checkHtml = "<p>";
					var tabHtml = "";
					/*var colorList = $technicalBizDataBoardApi.example.colorList;*/
					var colorList = ["#ff0000","#f99339","#ffc000","#92d050","#00b0f0","#0000FF","#7030a0"];
					
					for(var i = 0; i < categories.length; i++){
						checkHtml +="<a href='javascript:$technicalBizDataBoard.event.checkClass("+categoriesCd[i]+");' class='ckbtn on' id='check_"+categoriesCd[i]+"'><span class='ico'></span></a>"; //2018.01.22 [개발팀] 
						tabHtml +="<a href='javascript:$technicalBizDataBoard.event.checkClass("+categoriesCd[i]+");' style='background:"+colorList[i]+";border:1px solid #fff;'>"+categories[i]+"</a>"; //2018.01.22 [개발팀]
					}
					checkHtml +="</p>";
					$("#techBizGraphCheck").html(checkHtml);
					$("#techBizGraphList").html(tabHtml);
					
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){ // 오류 발생 (OpenAPI)
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.sidoFeatureChart(options.options);
					});
				}
			}
		});
	}());
	
	(function() {
		$class("sop.portal.sidoFeatureDetail.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
//					var detail_categories = ["사업체 수", "사업체 비율", "사업체 증감", "종사자 수", "종사자 비율", "종사자 증감"];
					
					//leekh 20170429 요청에 의해 사업체비율, 종사자 비율 제거
					
					var detail_categories = ["사업체 수",  "사업체 증감", "종사자 수", "종사자 증감"];
					
					var chartSeq = options.params.chartSeq;
					var id = "#sidoFeatureChart0"+chartSeq;
					
					var featureDetail = [];
					var colorList = [];
					var series = [];
					
					switch(chartSeq){
						case 2: //전체현황
							colorList = ["#0085ff", "#f6b64e"]; //$technicalBizDataBoardApi.example.colorList[0];
							featureDetail = $.pick(res.result.featureDetail, {m_class_cd : "00"});
							for (var i=0; i<featureDetail.length; i++) {
								if (featureDetail[i].b_class_cd == "1") {
									featureDetail[i].b_class_nm = "기술혁신";
									featureDetail[i].m_class_nm = "기술혁신";
								}else {
									featureDetail[i].b_class_nm = "지식집약";
									featureDetail[i].m_class_nm = "지식집약";
								}
							}
						break;
						case 3: //기술혁신
							var tmpData = [];
							for (var i=0; i<res.result.featureDetail.length; i++) {
								if (res.result.featureDetail[i].m_class_cd != "00") {
									tmpData.push(res.result.featureDetail[i]);
								}
							}
							colorList = ["#FF0000", "#FF9900", "#FFFF00", "#00FF00"];  //$technicalBizDataBoardApi.example.colorList[1];
							featureDetail = $.pick(tmpData, {b_class_cd : "1"});
						break;
						case 4: //지식집약
							var tmpData = [];
							for (var i=0; i<res.result.featureDetail.length; i++) {
								if (res.result.featureDetail[i].m_class_cd != "00") {
									tmpData.push(res.result.featureDetail[i]);
								}
							}
							colorList = ["#00AAFF", "#0000FF", "#9900FF"]; //$technicalBizDataBoardApi.example.colorList[2]; 
							featureDetail = $.pick(tmpData, {b_class_cd : "2"});
						break;
					}

					if(featureDetail){
						if(featureDetail.length){
							$.each(featureDetail, function(idx, val){
								series.push({
									type: 'line',
									name: val.m_class_nm,
									color: colorList[idx],
//									data: [ parseFloat(val.corp_cnt_z_score), parseFloat(val.corp_per_z_score), parseFloat(val.corp_irds_z_score), 
//									        parseFloat(val.worker_cnt_z_score), parseFloat(val.worker_per_z_score), parseFloat(val.worker_irds_z_score) ]
									////leekh 20170429 요청에 의해 사업체비율, 종사자 비율 제거
									data: [ parseFloat(val.corp_cnt_z_score),  parseFloat(val.corp_irds_z_score), 
								        parseFloat(val.worker_cnt_z_score),  parseFloat(val.worker_irds_z_score) ]
								});
							});
							
							createSidoFeatureChart(id, detail_categories, series);
							
							$technicalBizDataBoard.ui.options.params.featureType = "detail";
							
							$technicalBizDataBoard.ui.setReportData(
									"sido", 
									"sidoFeatureChart", 
									featureDetail, 
									options.map.id);
						}
					}
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){ // 오류 발생 (OpenAPI)
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.sidoFeatureChartDetail(options.options);
					});
				}
			}
		});
	}());
	
	// 2017.08.24 개발팀 수정 시작
	(function() {
		$class("sop.portal.sidoFeatureLct.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행	
					var chartSeq = options.params.chartSeq;
					var id = "#sidoFeatureChart0"+chartSeq;
					var featureDataList = res.result.featureData;
					$("#sidoLctCorpTextAdmNm").text(options.params.adm_nm);
					$("#sidoLctWorkerTextAdmNm").text(options.params.adm_nm);
					$(id).highcharts({ 
				        chart: { type: 'bubble', plotBorderWidth: 1, zoomType : 'x' }, //2018.01.15 [개발팀] 줌기능 추가
				        legend: {enabled: false},
				        title: {text: ''},
				        subtitle: {text: ''},
				        xAxis: {
				            gridLineWidth: 1,
				            title: {text: '사업체 LQ'},
				            labels: {
				                format: '{value}'
				            },
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
				                label: {
				                    rotation: 0,
				                    y: 15,
				                    style: {
				                        fontStyle: 'italic'
				                    },
				                },
				                zIndex: 3
				            }]
				        },

				        yAxis: {
				            startOnTick: false,
				            endOnTick: false,
				            title: {
				                text: '종사자 LQ',
				                
				                
				            },
				            labels: {
				                format: '{value}'
				            },
				            maxPadding: 0.2,
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
				                label: {
				                    align: 'right',
				                    style: {
				                        fontStyle: 'italic'
				                    },
				                    x: -10
				                },
				                zIndex: 3
				            }]
				        },

				        tooltip: {
				        	//2018.01.22 [개발팀] 툴팁로직 변경
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
	                                style:{
	                                   color:"#000",
	                                   textOutline : "0px"
	                                }
	                            }
	                        }
	                    },
				    });

					//addSeries 홓출하기
					//corp_lct
					//worker_lct 종사자입지계수
					$("#sidoLctCorpMclassNm").empty();
					$("#sidoLctWorkerMclassNm").empty();
					
					var lctCorpOverList = new Array();
					var lctWorkerOverList = new Array();
					
					var tableHtml = "<table class='pcTable02' id='sidoLctChartTable'>";
					tableHtml +="<tr><td class='addSideLine th'>업종명</td><td class='addSideLine th'>사업자 입지계수</td><td class='addSideLine th'>종사자 입지계수</td></tr>";
					
					var techClass = {
							11 : "c01",
							12 : "c02",
							13 : "c03",
							14 : "c04",
							21 : "c05",
							22 : "c06",
							23 : "c07"
					};
					
					
					for(var i = 0; i < featureDataList.length; i++){
						addSeries(id,Number(featureDataList[i].corp_lct),Number(featureDataList[i].worker_lct),featureDataList[i].m_class_nm,$technicalBizDataBoardApi.example.colorList[0][i]);
						/*tableHtml +="<tr><td class='addSideLine "+techClass[featureDataList[i].m_class_cd]+"'><font color='#fff'>"+featureDataList[i].m_class_nm+"</td><td class='addSideLine'>"+Number(featureDataList[i].corp_lct)+"</td><td class='addSideLine'>"+Number(featureDataList[i].worker_lct)+"</td></tr>";*/
						tableHtml +="<tr><td class='addSideLine'>"+featureDataList[i].m_class_nm+"</td><td class='addSideLine'>"+Number(featureDataList[i].corp_lct)+"</td><td class='addSideLine'>"+Number(featureDataList[i].worker_lct)+"</td></tr>";
						if(Number(featureDataList[i].corp_lct) >= 1){
							var corpLctObj = {
									name : featureDataList[i].m_class_nm,
									val : featureDataList[i].corp_lct
							};
							lctCorpOverList.push(corpLctObj);
							
							/*var oriText = $("#sidoLctCorpMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ", ";
							}
							appendText += featureDataList[i].m_class_nm;
							$("#sidoLctCorpMclassNm").append(appendText);*/
						}
						
						if(Number(featureDataList[i].worker_lct) >= 1){
							var workerLctObj = {
									name : featureDataList[i].m_class_nm,
									val : featureDataList[i].worker_lct
							};
							lctWorkerOverList.push(workerLctObj);
							/*var oriText = $("#sidoLctWorkerMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ", ";
							}
							appendText += featureDataList[i].m_class_nm;
							
							$("#sidoLctWorkerMclassNm").append(appendText);*/
						}
					}
					
					
					lctArrayWrite(lctCorpOverList , "sidoLctCorpMclassNm");
					lctArrayWrite(lctWorkerOverList,"sidoLctWorkerMclassNm");
					tableHtml +="</table>";
					$("#sidoFeatureChart03_2").html(tableHtml);
					
					//2018.01.15 [개발팀] 테이블 정렬추가
					$technicalBizDataBoard.util.tableSortable("#sidoLctChartTable");
					
					/*$technicalBizDataBoard.ui.options.params.featureType = "basic";*/
					//보고서 정보 저장
					/*$technicalBizDataBoard.ui.setReportData(
							"sido", 
							"sidoFeatureChart", 
							featureDataList, 
							options.map.id);*/
					/*$technicalBizDataBoard.ui.setReportData(
							"sido", 
							id, 
							featureDataList, 
							options.map.id);*/
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){ // 오류 발생 (OpenAPI)
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.sidoFeatureLctChart(options.options);
					});
				}
			}
		});
	}());
	// 2017.08.24 개발팀 수정 종료
	function lctArrayWrite(lctList , id){
		var parent = $("#"+id).parent();
		parent.css("line-height", "");
		parent.css("height", "");
		
		lctList.sort(function(a,b){
			/*return a["val"] -b["val"];*/
			return b["val"] -a["val"];
		});
		
		lctList.sort();
		for(var i = 0 ; i < lctList.length; i ++){
			var oriText = $("#"+id).text();
			var appendText = "";
			if(oriText != ""){
				appendText = ", ";
			}
			appendText += lctList[i].name;
			$("#"+id).append(appendText);
		}
		
		if(lctList.length == 0){
			$("#"+id+"_append").html(" 초과 하는 업종이 존재 하지 않습니다.");
		}else{
			//업종이 전국과 비교하여 집적도가 높음
			$("#"+id+"_append").html(" 업종의 집적도가 높음");
		}		
		
		if (parent.height() < 25) {
			parent.css({
				"line-height" : "40px",
				"height" : "40px"
			});
		}else {
			parent.css({
				"line-height" : "20px",
				"height" : "20px"
			});
		}
	}
	//2017.09.05 개발팀 추가
	function addSeries(id,company_lct,worker_lct,nameVal,colorVal){
		var xVal = company_lct;
		var yVal = worker_lct;
		var charts = $(id).highcharts();
		
		if(id == "#lqInfoLctChart"){
			charts.addSeries({
				data :[{x :xVal, y :yVal, z:10, name : nameVal }],
				color : colorVal
			});
		}else{
			charts.addSeries({
				data :[{x :xVal, y :yVal, z:50, name : nameVal }],
				color : colorVal
			});
		}
		
	}
	//2017.09.05 개발팀 추가 종료
	
	
	
	// 2017.08.24 개발팀 수정 시작
	function columChs(id, color, category, data1, data2){
		$(id).highcharts({
	        chart: {
	            type: 'bar', width:500, height:45, margin:[0,0,0,100]
	        },
	        colors: ['#cccccc', color], tooltip: { enabled: false },
	        title: { text: '' },
	        subtitle: { text: '' },
	        xAxis: {
	            categories: [category],
	            title: { text: null },
	            labels: {
	                align: 'left', x:-100
	            }
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
	        series: [
	            {
	            	pointWidth: 12,
	            	name: '경기도 평균',
	            	data: [data1]
	        	},
	        	{
	        		pointWidth: 12,
	        		name: '남동 산7업단지',
	            	data: [data2]
	        	}
	        ]
	    });
	}
	
	// 2017.08.24 개발팀 수정 종료
	
	// 2017.08.30 개발팀 수정 시작
	function leadingZeros(n, digits) {
		var zero = '';
		n = n.toString();

		if (n.length < digits) {
			for (var i = 0; i < digits - n.length; i++)
				zero += '0';
		}
		return zero + n;
	}
	// 2017.08.30 개발팀 수정 종료
	
	function createSidoFeatureChart(id, categories, series){
		$(id).empty();
		$(id).highcharts({ 
	        chart: { polar: true, type: 'line', margin:[0,60,0,60] },
	        exporting: { enabled: false },
	        title: {
	            text: ''
	        }, 
	        pane: { size: '70%' }, 
	        xAxis: {
	            categories: categories,
	            tickmarkPlacement: 'on', lineWidth: 0
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
	        series: series 
	    });
		
		// 범례 생성 (동적).. 색상정보는 css 파일에
		$(id).parent().find(".cateSaupLegend").empty();
		for (var i=0; i<series.length; i++) {
			console.log(series[i]);
			$(id).parent().find(".cateSaupLegend").append("<li>" + series[i].name + "</li>");
		}
	}
	/** 시도별 기술업종현황 - 업종별 지역 특성정보(spider) end */
	
	/** 시도별 기술업종현황 - 업종별 경제총조사 현황(bar) */
	(function() {
		$class("sop.portal.sidoEconomy.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				switch (parseInt(res.errCd)) {
					case 0:
						$technicalBizDataBoard.ui.options["data"] = res;
						$technicalBizDataBoardApi.request.updateEconomyChartData($technicalBizDataBoard.ui.options);	
						break;
					case -100:
						break;
				}
			}
		}); 
	}());
	
	function createSidoEconomyChart(id, categories, series, colors){
		$(id).empty();
		$(id).highcharts({
	        chart: {
	        	type: 'bar', width:500, marginLeft:100
	        },
	        colors: colors,
	        tooltip: { enabled: true },
	        title: { text: '' },
	        subtitle: { text: '' },
	        exporting: { enabled: false },
	        xAxis: {
	        	categories: categories,
	        	title: { text: null, },
	            labels: {
	                align: 'left', x:-100
	            }
	        },
	        yAxis: {
	            min: 0, title: { text: '', align: 'right' },
	            labels: { overflow: 'justify', enabled: true }
	        }, 
	        plotOptions: { 
	        	bar: {
	                dataLabels: { enabled: false }
	            },
	            series: {
	                colorByPoint: true
	            }
	        },
	        legend: { enabled: false },
	        credits: {  enabled: false },
	        series: series
	    });
		// 전국 차트 바 색변경
		var charts = $(id).highcharts();
		$.each(charts.series[0].data, function(i,v){ v.update({color: "#ccc"}); });
	}
	/** 시도별 기술업종현황 - 업종별 경제총조사 현황(bar) end */
	
	/** 시군구별 기술업종현황 - 업종별 사업체 비율(pie) start */
	(function() {
		$class("sop.portal.sigunguClassChart.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					var m_class_cd = options.params.m_class_cd;
					var b_class_cd = String(m_class_cd).substr(0,1);
					var colors = $technicalBizDataBoardApi.example.colorList[b_class_cd];
					var adm_nm = options.params.adm_nm;
					
					var sigunguClassResult = res.result.sigunguClassList;
					var sidoClassResult = res.result.sidoClassList;
					
					//전체현황
					//============ 2018.01.11 [개발팀] 전체현황 정보 수정 START =========//
					if (m_class_cd == "00") {
						var totalCnt = 0;
						var totalWorkerCnt = 0; 
						for (var i=0; i<sigunguClassResult.length; i++) {
							totalCnt += parseFloat(sigunguClassResult[i].corp_cnt);
							totalWorkerCnt += parseFloat(sigunguClassResult[i].worker_cnt);
						}
						for (var i=0; i<sigunguClassResult.length; i++) {
							sigunguClassResult[i].corp_per = ((parseFloat(sigunguClassResult[i].corp_cnt)/totalCnt)*100).toFixed(1);
							sigunguClassResult[i].worker_per = ((parseFloat(sigunguClassResult[i].worker_cnt)/totalWorkerCnt)*100).toFixed(1);
						}
						totalCnt = 0;
						totalWorkerCnt = 0;
						for (var i=0; i<sidoClassResult.length; i++) {
							totalCnt += parseFloat(sidoClassResult[i].corp_cnt);
							totalWorkerCnt += parseFloat(sidoClassResult[i].worker_cnt);
						}
						for (var i=0; i<sidoClassResult.length; i++) {
							sidoClassResult[i].corp_per = ((parseFloat(sidoClassResult[i].corp_cnt)/totalCnt)*100).toFixed(1);
							sidoClassResult[i].worker_cnt = ((parseFloat(sidoClassResult[i].worker_cnt)/totalWorkerCnt)*100).toFixed(1);
						}
					}
					//============ 2018.01.11 [개발팀] 전체현황 정보 수정 END =========//
					
					//선택한 시군구
					createSigunguClassChart("#sigunguClassChart01", colors, sigunguClassResult,"corp");
					createSigunguLegend("#sigunguClassChartArea01", colors, sigunguClassResult,"corp");
					createSigunguClassChart("#sigunguClassChart02", colors, sigunguClassResult,"worker");
					createSigunguLegend("#sigunguClassChartArea02", colors, sigunguClassResult,"worker");
					//상위
					createSigunguClassChart("#sigunguClassChart03", colors, sidoClassResult,"corp");
					createSigunguLegend("#sigunguClassChartArea03", colors, sidoClassResult,"corp");
					createSigunguClassChart("#sigunguClassChart04", colors, sidoClassResult,"worker");
					createSigunguLegend("#sigunguClassChartArea04", colors, sidoClassResult,"worker");
					
					//corp_cnt,corp_irdsrate,corp_per
					//worker_cnt,worker_irdsrate,worker_per
					
					//2017.09.13 개발팀 수정 종료
					
					// 보고서 데이터 저장
					$technicalBizDataBoard.ui.setReportData(
							"sigungu", 
							"sigunguClassChart", 
							sigunguClassResult, 
							options.map.id);
					
					$technicalBizDataBoard.ui.setReportData(
							"sigungu", 
							"sidoClassChart", 
							sidoClassResult, 
							options.map.id);
				
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){ // 오류 발생 (OpenAPI)
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.sigunguClassChart(options);
					});
				}
			}
		});
	}());
	//2017.09.13 개발팀 type 파라미터 추가
	function createSigunguClassChart(id, colors, result,type){
		var data = [];
		var adm_nm = "";
		
		for(var i=0; i<result.length; i++){
			if(r = result[i]){
				//2017.09.13 개발팀 수정
				//data.push([ r.s_class_nm, parseFloat(r.corp_cnt) ]);
				if(type == "corp"){
					data.push([ r.s_class_nm, parseFloat(r.corp_cnt) ]);
				}else{
					data.push([ r.s_class_nm, parseFloat(r.worker_cnt) ]);
				}
				//2017.09.13 개발팀 수정 종료
				adm_nm = r.sido_nm + (r.sgg_nm ?  (" " + r.sgg_nm) : "");
			}
		}
		
		var series = [{
			type: 'pie',
			name: adm_nm,
			data: data
		}];
		//2017.09.12 개발팀 수정
		/*$(id).highcharts({
	        chart: {
	            type: 'pie', width:170,height:170, margin:[20,0,0,0]
	        },
	        colors: colors, 
	        title: { text: '' },
	        tooltip: { enabled: true },
	        exporting: { enabled: false },
	        plotOptions: {
	            pie: {
	                allowPointSelect: false, cursor: 'pointer', depth: 50,
	                dataLabels: { enabled: false },
	                borderWidth:0
	            }
	        },
	        series: series
	    });*/
		
		$(id).highcharts({
	        chart: {
	            type: 'pie' , margin:[20,0,0,20]
	        },
	        colors: colors, 
	        title: { text: '' },
	        /*tooltip: { enabled: true },*/
	        tooltip: {
				shared : true,
				valueDecimals: 2,
				formatter: function () {
					var html = "";
					var symbol = '●';
					html += "<span style='font-size:7px;'>" + this.series.name +  "</span><br>";
					html += '<span style="color:' + this.point.color + '">' + symbol + '</span>';
					html += ' ' + this.point.name + ': <b>' + appendCommaToNumber(this.point.y) + '</b>';
					return html;
                }
	        },

	        exporting: { enabled: false },
	        plotOptions: {
	            pie: {
	                allowPointSelect: false, cursor: 'pointer', depth: 50,
	                dataLabels: { enabled: false },
	                borderWidth:0
	            }
	        },
	        series: series
	    });
		//2017.09.12 개발팀 수정 종료
	}
	//2017.09.13 개발팀 type 파라미터 추가
	function createSigunguLegend(id, colors, result,type){
		var adm_nm = "";
		var legend = '<div class="valuebox">';
		// sereies.data 세팅 및 범례 생성
		// 범례 생성부분은 맵 마우스오버 툴팁에서 재사용될듯
		for(var i=0; i<4; i++){
			if( r = result[i] ){
				adm_nm = r.sido_nm + (r.sgg_nm ?  (" " + r.sgg_nm) : "");
				if(i%2 == 0 && i != 0){
					legend += '</div>';
					legend += '<div class="valuebox">';
				}
				legend += '</div>';
				legend += '<div class="valuebox">';
				//2017.09.13 개발팀 수정
				//legend += printLegendItem(colors[i], r.s_class_nm,  r.corp_per+'%', appendCommaToNumber(r.corp_cnt)+'개');
				if(type == "corp"){
					legend += printLegendItem(colors[i], r.s_class_nm,  r.corp_per+'%', appendCommaToNumber(r.corp_cnt)+'개');
				}else{
					legend += printLegendItem(colors[i], r.s_class_nm,  r.worker_per+'%', appendCommaToNumber(r.worker_cnt)+'명');
				}
				//2017.09.13 개발팀 수정 종료
			}
		}
		legend += '</div>';
		
		var hideable = '';
		if(result.length > 4){
			//2017.09.13 개발팀 수정
			//legend += '<p class="btn-more"><a href="javascript:$(\'' + id + ' .hideable\').slideToggle();void(0);">더보기..</a></p>';
			if(type == "worker"){
				if(id == "#sigunguClassChartArea02"){
					legend += '<p class="btn-more"><a href="javascript:$(\'' + id + ' .hideable\').slideToggle();$(\'#sigunguClassChartArea01' + ' .hideable\').slideToggle();">더보기..</a></p>';
				}else{
					legend += '<p class="btn-more"><a href="javascript:$(\'' + id + ' .hideable\').slideToggle();$(\'#sigunguClassChartArea03' + ' .hideable\').slideToggle();">더보기..</a></p>';
				}
			}
			//2017.09.13 개발팀 수정 종료
			hideable += '<div class="typelabel hideable">';
			hideable += '<div class="valuebox">';
			for(var i=4; i<result.length; i++){
				if( r = result[i] ){
					//2017.09.12 개발팀 수정
					/*if(i != 4 && i%2 == 0){
						hideable += '</div>';
						hideable += '<div class="valuebox">';
					}*/
					
					hideable += '</div>';
					hideable += '<div class="valuebox">';
					//2017.09.12 개발팀 수정 종료
					legend += '</div>';
					legend += '<div class="valuebox">';
					//2017.09.13 개발팀 수정
					//hideable += printLegendItem(colors[i], r.s_class_nm, r.corp_per+'%', appendCommaToNumber(r.corp_cnt)+'개');
					if(type == "corp"){
						hideable += printLegendItem(colors[i], r.s_class_nm, r.corp_per+'%', appendCommaToNumber(r.corp_cnt)+'개');
					}else{
						hideable += printLegendItem(colors[i], r.s_class_nm, r.worker_per+'%', appendCommaToNumber(r.worker_cnt)+'명'); //2018.01.12 [개발팀] 단위수정
					}
					//2017.09.13 개발팀 수정 종료
					
				}
			}
			hideable += '	</div>'; // valuebox
			hideable += '</div>'; // typelabel
		}
		
		function printLegendItem(color, text, t01, t02){
			var item = '';
			item += '	<div class="values"> ';
			item += '		<div class="title"> ';
			//item += '			<span class="icon" style="background-color: '+color+';"></span>';
			//item += '			<span class="text">' + text + '</span> ';
			item +=	'<table style="margin:auto;width:130px;">'; //2017.10.24 [개발팀]
			item +=	'	<tr>';
			item += '		<td style="width:10px;"><span class="icon" style="background-color: '+color+';"></span></td>'; //2017.10.24 [개발팀]
			item += '		<td class="text" style="font-size:12px;">' + text + '</td>';
			item +=	'   </tr>';  
			item += '</table>';
			item += '		</div> ';
			item += '		<div class="val">';
			item += '			<p class="t01">' + t01 + '</p>';
			item += '			<p class="t02">' + t02 + '</p>';
			item += '		</div>';
			item += '	</div> ';
			return item;
		}
		
		$(id + " .typelabel").empty();
		//2017.09.12 개발팀 수정
		/*$(id + " .typelabel").append('<p class="txtSubj">' + adm_nm + '<p>');*/
		if(type =="corp"){
			$(id+"Subj").text("<" +adm_nm+ " 사업체 비율>");
		}else{
			$(id+"Subj").text("<" +adm_nm+ " 종사자 비율>");
		}
		
		if(id == "#sigunguClassChartArea04"){
			$("#moreSidoInfoButton").text(">> " +adm_nm+ " 평균 보기");
			
		}
		
		//2017.09.12 개발팀 수정 종료
		$(id + " .typelabel").append(legend);
		$(id + " .hideable").remove();
		$(id).append(hideable);
		
	}
	
	/** 시군구별 기술업종현황 - 업종별 사업체 비율(pie) end */
	
	/** 시군구별 기술업종현황 - 업종별 시군구 순위(bar) start */
	(function() {	
		$class("sop.portal.sigunguRankChart.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				if(res.errCd == 0){ // 정상 수행
					var showDataList = {
							"corp_cnt" : ["사업체 수", "개"] ,
							"corp_per" : ["업종 비율", "%"],
							"resid_ppltn_cnt" : ["거주인구", "명"],
							"worker_cnt" : ["업종 종사자 수", "명"],
							"avg_worker_cnt" : ["평균 종사자 수", "명"]	
					};
					
					for (var typeCd in showDataList) {
						console.log(typeCd);
						$("#typeCharts_"+typeCd).empty();
						
						var typeCd = typeCd;
						var typeNm = showDataList[typeCd][0];
						var classNm = $technicalBizDataBoardApi.example.m_class_nm[options.params.m_class_cd];
						
						switch(typeCd) {
							case "corp_per":
								classNm = "상위지역 대비 " + classNm;
								break;
							case "resid_ppltn_cnt":
								classNm = classNm + " 업종의 수 대비";
								break;
							case "avg_worker_cnt":
								classNm = classNm + " 업종의 수 대비";
								break;
						}
						
						var sortedRankResult = res.result.sigunguRankList.sort(function(a, b) {
							return parseFloat(b[typeCd]) - parseFloat(a[typeCd]);
						});
						//var sortedRankResult = $.sort(res.result.sigunguRankList, 1, typeCd);
						var sggCd = options.params.adm_cd.substring(2,6);
						
						var selectedSggRank = -1;
						var selectVal = null;
						for(var i=0; i<sortedRankResult.length; i++){
							if(sortedRankResult[i].sgg_cd == sggCd){
								selectedSggRank = (i+1);
								selectVal = sortedRankResult[i][typeCd]; 
							}
						}
						
						var selectedTypeCnt = 0;				
						var sggNm = options.params.adm_nm;
						var sggCnt = sortedRankResult.length;
						
						var data = [];
						var categories = [];
						var tmpTotal = 0;
						var perTotal = 0;
						for(var i=0; i<sortedRankResult.length; i++){
							//2017.09.15 개발팀 수정
							//tmpTotal += parseFloat(sortedRankResult[i].corp_cnt);
							if(typeCd == "corp_per"){
								tmpTotal += parseFloat(sortedRankResult[i].corp_cnt);
								perTotal += parseFloat(sortedRankResult[i][typeCd]);
							}else{
								tmpTotal += parseFloat(sortedRankResult[i][typeCd]);
							}
							//2017.09.15 개발팀 종료
						}
						for(var i=0; i<sortedRankResult.length; i++){
							categories.push(sortedRankResult[i].sgg_nm);
							if (typeCd == "corp_per") {
								//현재 사업체 비율이 맞지 않아 이렇게 임시로 corp_cnt로 계산을 실시한다.
								//2018.01.11 [개발팀] 주석처리
								//var tmpData = parseFloat(parseFloat(sortedRankResult[i].corp_cnt/tmpTotal*100).toFixed(1));
								//sortedRankResult[i].corp_per = tmpData;
								//data.push(tmpData);
								data.push(parseFloat(sortedRankResult[i].corp_per));
								data.sort(function(a, b) {
									return b-a;
								});
								if (sortedRankResult[i].sido_cd+sortedRankResult[i].sgg_cd == options.params.adm_cd) {
									selectedTypeCnt = sortedRankResult[i][typeCd];
								}
							}else {
								if(sortedRankResult[i][typeCd] == undefined){
									sortedRankResult[i][typeCd] = 0;
								}
								data.push(parseFloat(sortedRankResult[i][typeCd].toFixed(2)));
								if (sortedRankResult[i].sido_cd+sortedRankResult[i].sgg_cd == options.params.adm_cd) {
									selectedTypeCnt = parseFloat(sortedRankResult[i][typeCd].toFixed(2));
								}
							}
							
						}	
						//2017.09.15 개발팀 수정
						/*$("#techRank_"+typeCd).find(".classNm").text(classNm);
						$("#techRank_"+typeCd).find(".typeNm").text(typeNm);
						$("#techRank_"+typeCd).find(".sggNm").text(sggNm.split(" ")[0]);
						$("#techRank_"+typeCd).find(".sggCnt").text(sggCnt);	
						
						$("#techRank_"+typeCd).find("#sggNm02").text(sggNm.split(" ")[1]);
						$("#techRank_"+typeCd).find(".selectedSggRank").text(selectedSggRank);
						$("#techRank_"+typeCd).find(".selectedTypeCnt").text(appendCommaToNumber(selectedTypeCnt) + showDataList[typeCd][1]);
						$("#typeCharts_"+typeCd).css("height", (50 + (data.length * 17))+"px");*/
						
						var total_avg = null;
						if(typeCd != "corp_per"){
							total_avg =  Math.floor(tmpTotal / sggCnt);
						}else{
							total_avg =  parseFloat(parseFloat(perTotal / sggCnt).toFixed(1)); //2018.01.11 [개발팀] 형변환
						}
						
						if(selectVal == undefined){
							selectVal = 0;
						}
						
						if(total_avg == undefined || isNaN(total_avg)){
							total_avg = 0;
						}
						$("#techRank_"+typeCd).find(".jcate").text(typeNm);
						$("#techRank_"+typeCd).find(".jsubj").text(sggNm.split(" ")[0] + " " + sggCnt + "시군구 중 " + selectedSggRank + "위");
						$("#techRank_"+typeCd).find(".jnum").html(appendCommaToNumber(selectVal) + showDataList[typeCd][1] + "<br>" +"(" + sggNm.split(" ")[0] + " 평균 " + appendCommaToNumber(total_avg) + showDataList[typeCd][1] + ")"); //2018.01.15 [개발팀] 콤마
						
						
						//classNm - > 사업분류
						//typeNm - > 사업체수냐 종사자수냐 
						//sggNm 
						//sggCnt 
						//selectedSggRank
						//
						
						//typeCharts_corp_cnt 이렇게 되어 있는데  각 타입별로 하나씩 다 그려줘야 할듯
						//corp_cnt 사업체수
						//corp_per 업종비율
						//worker_cnt 업종종사자수
						//avg_worker_cnt 평균종사자 수
						//resid_ppltn_cnt 거주인구
						
						//추가 할것
						//사업체증감률 , 종사자 증감률
						//조건 
						//가장 높은것 1위 하나
						//선택된 지역 하나
						//평균 하나
						//최 하위 하나
						//선택된 지역이 최상위 이거나 최하위일경우 3개 리스트만 표충
						
						//sortedRankResult 데이터를 필터링 해야 한다
						//showDataList[typeCd][0] showDataList[typeCd][1]
						var topSgg = sortedRankResult[0];
						var bottomSgg = sortedRankResult[sortedRankResult.length-1];
						
						var selectSgg = {};
						var avgSgg = {};
						var sggTotalVal = 0;
						
						for(var i = 0; i < sortedRankResult.length; i++){
							//2018.01.11 [개발팀] 주석처리
							/*if(topSgg[typeCd] <  sortedRankResult[i][typeCd]){
								topSgg = sortedRankResult[i];
							}else if(bottomSgg[typeCd] >  sortedRankResult[i][typeCd]){								
								bottomSgg = sortedRankResult[i];
							}*/
							if(sortedRankResult[i].sgg_cd == sggCd ){
								selectSgg = sortedRankResult[i];
								selectSgg.rank = i+1;
							}
						}
						
						if(selectSgg == null){
							selectSgg = sortedRankResult[0];
							selectSgg.sgg_cd  = sggCd;
							selectSgg.sgg_nm =  sggNm.split(" ")[1];
							selectSgg[typeCd] = null;
							//선택된 시군구의 순위 필요
						}
						
						avgSgg[typeCd] = total_avg;
						avgSgg.sgg_nm = sggNm.split(" ")[0];
						
						
						var seriesData = new Array();
						var seriesCategory = new Array();
						
						seriesData.push(parseFloat(topSgg[typeCd])); //2018.01.11 [개발팀] 형변환
						if(selectSgg.sgg_cd != topSgg.sgg_cd && selectSgg.sgg_cd != bottomSgg.sgg_cd){
							//해당 시군구 값이 평균값 보다 낮은가?
							if(parseFloat(selectSgg[typeCd]) < avgSgg[typeCd]){ //2018.01.11 [개발팀] 형변환
								seriesData.push(avgSgg[typeCd]);
								seriesData.push(parseFloat(selectSgg[typeCd])); //2018.01.11 [개발팀] 형변환
							}else{
								seriesData.push(parseFloat(selectSgg[typeCd])); //2018.01.11 [개발팀] 형변환
								seriesData.push(avgSgg[typeCd]);
							}
							
						}else{
							seriesData.push(avgSgg[typeCd]);
						}
						/*seriesData.push(avgSgg[typeCd]);*/
						seriesData.push(parseFloat(bottomSgg[typeCd])); //2018.01.11 [개발팀] 형변환
						
						seriesCategory.push(topSgg.sgg_nm + "(1위)");
						if(selectSgg.sgg_cd != topSgg.sgg_cd && selectSgg.sgg_cd != bottomSgg.sgg_cd){
							if(selectSgg[typeCd] < avgSgg[typeCd]){
								seriesCategory.push(avgSgg.sgg_nm + " 평균");
								seriesCategory.push(selectSgg.sgg_nm +"("+selectSgg.rank+"위)");
							}else{
								seriesCategory.push(selectSgg.sgg_nm +"("+selectSgg.rank+"위)");
								seriesCategory.push(avgSgg.sgg_nm + " 평균");
							}
							/*seriesCategory.push(selectSgg.sgg_nm +"("+selectSgg.rank+"위)");*/	
						}else{
							seriesCategory.push(avgSgg.sgg_nm + " 평균");
						}
						/*seriesCategory.push(avgSgg.sgg_nm + " 평균");*/
						
						seriesCategory.push(bottomSgg.sgg_nm + "("+sggCnt+"위)");
						console.log(seriesCategory);
						$('#typeCharts_'+typeCd).highcharts({
					        chart: {
					            type: 'bar', width:500, marginLeft:100
					        },
					        colors: ['#ffc622'], tooltip: { enabled: true },
					        title: { text: '' },
					        subtitle: { text: '' },
					        exporting: { enabled: false },
					        xAxis: {
					            categories: seriesCategory,
					            title: { text: null },
					            labels: { align: 'left', x:-100}
					        },
					        yAxis: {
					            min: 0, title: { text: '', align: 'left' },
					            labels: { overflow: 'justify' }
					        }, 
					        plotOptions: {
					        	bar: {
					                dataLabels: { enabled: false }
					            }
					        },
					        legend: { enabled: false },
					        credits: {  enabled: false },
					        series: [{
					        	pointWidth: 15,
					            name: typeNm,
					            data: seriesData,
					        }]
					    });
						
						var charts = $("#typeCharts_"+typeCd).highcharts();
						$.each(charts.series[0].data, function(i,v){
							var cateogryAdmNm = v.category.split("(")[0];
							if(options.params.adm_nm.indexOf(cateogryAdmNm) > 0)
								v.update({color: "#1778cc"});
						});
						

						//2017.09.15 개발팀 종료
						//수정
						//2017.09.14 개발팀 기존 차트 주석 처리
						/*$('#typeCharts_'+typeCd).highcharts({
					        chart: {
					            type: 'bar', width:500, marginLeft:100
					        },
					        colors: ['#ffc622'], tooltip: { enabled: true },
					        title: { text: '' },
					        subtitle: { text: '' },
					        exporting: { enabled: false },
					        xAxis: {
					            categories: categories,
					            title: { text: null },
					            labels: { align: 'left', x:-100}
					        },
					        yAxis: {
					            min: 0, title: { text: '', align: 'left' },
					            labels: { overflow: 'justify' }
					        }, 
					        plotOptions: {
					        	bar: {
					                dataLabels: { enabled: false }
					            }
					        },
					        legend: { enabled: false },
					        credits: {  enabled: false },
					        series: [{
					        	pointWidth: 15,
					            name: typeNm,
					            data: data,
					        }]
					    });
						
						var charts = $("#typeCharts_"+typeCd).highcharts();
						$.each(charts.series[0].data, function(i,v){
							if(options.params.adm_nm.indexOf(v.category) > 0)
								v.update({color: "#1778cc"});
						});*/
						
						
					}

					// 보고서 데이터 저장
					$technicalBizDataBoard.ui.setReportData(
							"sigungu", 
							"sigunguRankChart", 
							sortedRankResult, 
							options.map.id);
				
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){ // 오류 발생 (OpenAPI)
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.sigunguRankChart(options);
					});
				}
			}
		});
	}());
	
	
	//2017.09.20 개발팀 추가
	/** 시군구별 기술업종현황 - 업종별 입지계수 순위(bar) start */
	(function() {	
		$class("sop.portal.sigunguLctChart.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				if(res.errCd == 0){ // 정상 수행
					var data = res.result.featureData;
					//country_vs_corp_lq
					//country_vs_worker_lq
					//sido_vs_corp_lq
					//sido_vs_worker_lq
					//techbiz_m_class_cd_nm
					
					//2018.01.11 [개발팀] 주석처리
					/*var shiftIdx = 0;
					for(var i =0; i < data.length; i ++){
						if(data[i].techbiz_m_class_cd == '00'){
							shiftIdx = i;
						}
					}
					data.splice(shiftIdx,1);*/
					
					var lctCorpOverList = new Array();
					var lctWorkerOverList = new Array();
					
					var tableHtml = "<table class='pcTable02' id='sigunguLctChartTable'>";
					tableHtml +="<tr><td class='addSideLine th'>업종명</td><td class='addSideLine th'>사업체 입지계수</td><td class='addSideLine th'>종사자 입지계수</td></tr>";
					var techClass = {
							11 : "c01",
							12 : "c02",
							13 : "c03",
							14 : "c04",
							21 : "c05",
							22 : "c06",
							23 : "c07"
					};
					
					var techIdx = {
							11 : 0,
							12 : 1,
							13 : 2,
							14 : 3,
							21 : 4,
							22 : 5,
							23 : 6
					}
					
					for(var i =0; i < data.length; i ++){
						if(options.params.base_region == "country"){ //2018.01.11 [개발팀] 변수수정
							/*tableHtml +="<tr><td class='addSideLine "+techClass[data[i].techbiz_m_class_cd]+"'><font color='#fff'>"+data[i].techbiz_m_class_cd_nm+"</td><td class='addSideLine'>"+data[i].country_vs_corp_lq+"</td><td class='addSideLine'>"+data[i].country_vs_worker_lq+"</td></tr>";*/
							tableHtml +="<tr><td class='addSideLine'>"+data[i].techbiz_m_class_cd_nm+"</td><td class='addSideLine'>"+data[i].country_vs_corp_lq+"</td><td class='addSideLine'>"+data[i].country_vs_worker_lq+"</td></tr>";
							/*addSeries("#"+options.id,Number(data[i].country_vs_corp_lq),Number(data[i].country_vs_worker_lq),data[i].techbiz_m_class_cd_nm,$technicalBizDataBoardApi.example.colorList[0][i]);*/
							addSeries("#"+options.id,Number(data[i].country_vs_corp_lq),Number(data[i].country_vs_worker_lq),data[i].techbiz_m_class_cd_nm,$technicalBizDataBoardApi.example.colorList[0][techIdx[data[i].techbiz_m_class_cd]]);
							if(Number(data[i].country_vs_corp_lq) >= 1){
								var corpLctObj = {
										name : data[i].techbiz_m_class_cd_nm,
										val : data[i].country_vs_corp_lq
								};
								lctCorpOverList.push(corpLctObj);
								
							}
							if(Number(data[i].country_vs_worker_lq) >= 1){
								
								
								var workerLctObj = {
										name : data[i].techbiz_m_class_cd_nm,
										val : data[i].country_vs_worker_lq
								};
								lctWorkerOverList.push(workerLctObj);
							}
						}else{
							/*tableHtml +="<tr><td class='addSideLine "+techClass[data[i].techbiz_m_class_cd]+"'><font color='#fff'>"+data[i].techbiz_m_class_cd_nm+"</td><td class='addSideLine'>"+data[i].sido_vs_corp_lq+"</td><td class='addSideLine'>"+data[i].sido_vs_worker_lq+"</td></tr>";*/
							tableHtml +="<tr><td class='addSideLine'>"+data[i].techbiz_m_class_cd_nm+"</td><td class='addSideLine'>"+data[i].sido_vs_corp_lq+"</td><td class='addSideLine'>"+data[i].sido_vs_worker_lq+"</td></tr>";
							addSeries("#"+options.id,Number(data[i].sido_vs_corp_lq),Number(data[i].sido_vs_worker_lq),data[i].techbiz_m_class_cd_nm,$technicalBizDataBoardApi.example.colorList[0][techIdx[data[i].techbiz_m_class_cd]]);
							
							if(Number(data[i].sido_vs_corp_lq) >= 1){
								/*var oriText = $("#sigunguLctCorpMclassNm").text();
								if(oriText != ""){
									$("#sigunguLctCorpMclassNm").append(", ");
								}
								$("#sigunguLctCorpMclassNm").append(data[i].techbiz_m_class_cd_nm);*/
								var corpLctObj = {
										name : data[i].techbiz_m_class_cd_nm,
										val : data[i].sido_vs_corp_lq
								};
								lctCorpOverList.push(corpLctObj);
							}
							
							if(Number(data[i].sido_vs_worker_lq) >= 1){
								/*var oriText = $("#sigunguLctWorkerMclassNm").text();
								if(oriText != ""){
									$("#sigunguLctWorkerMclassNm").append(", ");
								}
								$("#sigunguLctWorkerMclassNm").append(data[i].techbiz_m_class_cd_nm);*/
								var workerLctObj = {
										name : data[i].techbiz_m_class_cd_nm,
										val : data[i].sido_vs_worker_lq
								};
								lctWorkerOverList.push(workerLctObj);
							}
							
						}
					}
					
					lctArrayWrite(lctCorpOverList , "sigunguLctCorpMclassNm");
					lctArrayWrite(lctWorkerOverList,"sigunguLctWorkerMclassNm");
					tableHtml +="</table>";
					$("#sigunguLctChart_2").html(tableHtml);
					
					//2018.01.15 [개발팀] 테이블 정렬추가
					$technicalBizDataBoard.util.tableSortable("#sigunguLctChartTable");
					
					if(options.params.lq_base_region == "country"){
						$("#sigunguLctChart_2 > table > tr > td").eq(1).show();
						$("#sigunguLctChart_2 > table > tr > td").eq(2).show();
						$("#sigunguLctChart_2 > table > tr > td").eq(3).hide();
						$("#sigunguLctChart_2 > table > tr > td").eq(4).hide();
					}else{
						$("#sigunguLctChart_2 > table > tr > td").eq(1).hide();
						$("#sigunguLctChart_2 > table > tr > td").eq(2).hide();
						$("#sigunguLctChart_2 > table > tr > td").eq(3).show();
						$("#sigunguLctChart_2 > table > tr > td").eq(4).show();
					}
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){ // 오류 발생 (OpenAPI)
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.addLctSeriesChart(options,options.params.year,options.params.base_region,options.id);
					});
				}
			}
		});
	}());
	/** 시군구별 기술업종현황 - 업종별 입지계수 순위(bar) end */
	
	/** 업종밀집도 현황 - 시계열별 데이터 조회(bar&line) start */
	(function() {	
		$class("sop.portal.densityCombinedChart.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				if(res.errCd == 0){ // 정상 수행
					if(!res.result) return;
					if(!res.result.densityCombined) return;
					var densityCombined = res.result.densityCombined;
					
					var cntData = [];
					var perData = [];
					var categories = [];
					for(var i=0; i<densityCombined.length; i++){
						cntData.push(densityCombined[i].corp_cnt);
						perData.push(parseFloat(densityCombined[i].corp_per));
						categories.push(densityCombined[i].base_year);
					}
					var mainTitle = "";
					$("a[id ^= m_class_]").each(function(){
						if($(this).hasClass("on")){
							mainTitle = $(this).text();
						}
					});
					var title =  options.params.adm_nm+"<span>("+mainTitle+"-"+options.dataBoard.themeNm+")"+options.params.year+"</span>";
					$("#densityAdmTitle").html(title);
					
					//================ 2018.01.08 [개발팀] 년도별 사업체수 표시 START =============//
					//상용소스보고 적용
					var corpCnt = 0;
					for(var i=0; i<res.result.densityCombined.length; i++){
						if(options.params.base_year == undefined){
							options.params.base_year = companyDataYear;
						}
						if(res.result.densityCombined[i].base_year == options.params.base_year){
							corpCnt = res.result.densityCombined[i].corp_cnt;
							if(corpCnt == null || corpCnt == undefined){
								corpCnt = 0;
							}
						}
					}
					$("#densitySummaryTitle").text((options.params.base_year || companyDataYear) + " 총사업체 " + appendCommaToNumber(corpCnt) + "개" );
					//================ 2018.01.08 [개발팀] 년도별 사업체수 표시 END =============//		
					
					$('#timeAreaCharts01').highcharts({
				        chart: { zoomType: 'xy' },
				        colors: ['#ffc622','#1778cc'],
				        title: { text: '' },
				        exporting: { enabled: false },
				        subtitle: {
				            text: ''
				        },
				        xAxis: [{
				            categories: categories,
				            crosshair: false
				        }],
				        yAxis: [{ // Primary yAxis
				            labels: { enabled : true },
				            title: { text: '', style: { color: Highcharts.getOptions().colors[0] } },
				            opposite: true
				        }, { // Secondary yAxis
				            title: { text: '', style: { color: Highcharts.getOptions().colors[1] } },
				            min: 0, max: 100,
				            labels: { enabled : false  },
				        }],
				        tooltip: {
				            shared: false
				        },
				        legend: {
				        	enabled : false
				        },
				        series: [{
				            name: '사업체 수',
				            type: 'column',
				            data: cntData,
				            tooltip: {
				                valueSuffix: ' 개'
				            },
				            zIndex: 1
				        },{
				        	name : "사업체 수",
				            type: 'spline',
				            data: cntData,
				            zIndex: 2
				        }]
				    });
					
					// 보고서 데이터 저장
					$technicalBizDataBoard.ui.setReportData(
							"density", 
							"densityCombinedChart", 
							densityCombined, 
							options.map.id);
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){ // 오류 발생 (OpenAPI)
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.densityCombinedChart(options);
					});
				}
			}
		});
	}());
	/** 업종밀집도 현황 - 시계열별 데이터 조회(bar&line) end */
	
	/** 업종밀집도 현황 - 업종별 성남시 사업체 현황 조회(bar&line) end */
	$class("sop.portal.densityCombinedNewCorpChart.api").extend(sop.portal.absAPI).define({
		onSuccess: function(status, res, options){
			
			if(res.errCd == 0){
				var tmpOption = options.options;
				var allCorpList = $.sort(res.result.allCorp, 0, 'base_year');
				var newCorpList = $.sort(res.result.sClassDensity, 0, 'base_year');
				var newCorpData = [];
				var allCorpData = [];
				var categories = [];
				
				var title =  tmpOption.params.adm_nm+"<span>("+tmpOption.dataBoard.themeNm+")"+tmpOption.params.year+"</span>";
				$("#densityAdmTitle").html(title);
				
				for(var i=0; i<newCorpList.length; i++){
					newCorpData.push(parseFloat(newCorpList[i].corp_cnt));
					categories.push(newCorpList[i].base_year);
				}
				
				for (var i=0; i<newCorpList.length; i++) {
					var isExist = false;
					for (var k=0; k<allCorpList.length; k++) {
						if (newCorpList[i].base_year == allCorpList[k].base_year) {
							allCorpData.push(allCorpList[k].corp_cnt);
							isExist = true;
						}
					}
					if (!isExist) {
						allCorpData.push(0);
					}
				}
				
				$('#timeAreaCharts01').highcharts({
			        chart: { zoomType: 'xy' },
			        colors: ['#ffc622','#1778cc', '#ccc'],
			        title: { text: '' },
			        exporting: { enabled: false },
			        subtitle: {
			            text: ''
			        },
			        xAxis: [{
			            categories: categories,
			            crosshair: true
			        }],
			        yAxis: [{ // Primary yAxis
			            labels: { enabled : true },
			            title: { text: '', style: { color: Highcharts.getOptions().colors[0] } },
			            opposite: true
			        }, { // Secondary yAxis
			            title: { text: '', style: { color: Highcharts.getOptions().colors[1] } },
			            labels: { enabled : false  },
			        }],
			        tooltip: {
			            shared: true
			        },
			        legend: {
			        	enabled : true
			        },
			        series: [{
			            name: '신설법인 사업체 수',
			            type: 'column',
			            data: newCorpData,
			            tooltip: {
			                valueSuffix: ' 개'
			            },
			            zIndex: 1
			        }, {
			            name: '전체사업체수',
			            type: 'column',
			            yAxis: 1,
			            data: allCorpData,
			            color : "#a0a0a0",
			            tooltip: {
			                valueSuffix: '개'
			            },
				        zIndex: 2
			        }]
				});
				
				// 보고서 데이터 저장
				$technicalBizDataBoard.ui.setReportData(
						"density", 
						"newCorpDensityChart", 
						allCorpList, 
						options.map.id);
				
				$technicalBizDataBoard.ui.setReportData(
						"density", 
						"sClassDensityChart", 
						newCorpList,
						options.map.id);
				
			}else if(res.errCd == -100){ // 데이터 없음
				
			}
		}
	});
	/** 업종밀집도 현황 - 업종별 성남시 사업체 현황 조회(bar&line) end */
	
	
	
	/** ********* 지원시설 조회 - 지역통계 현황 barCharts Start ********* */
	(function() {
		$class("sop.portal.supplyAreaStateBarChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					var result = res.result.chartData;		
					var id1 = "enterpriseBarCharts01";
					var id2 = "professionalBarCharts02";
					
					var colors1 = ['#5b3fb2','#ffffff']
					var colors2 = ['#444b5b', '#ffffff'];
					var categoriesArr = [];
					var dataArr1 = [];
					var dataArr2 = [];
					var chartLabeHtml = "";

					for(var i = 0; i < result.length; i++){
						categoriesArr.push(result[i].sido_nm);
						chartLabeHtml += "<li>" +result[i].sido_nm + "</li>";
						dataArr1.push(parseFloat(result[i].corp_cnt.toFixed(2)));
						dataArr2.push(parseFloat(result[i].worker_cnt.toFixed(2)));
					}
					
					$(".supplyAreaStateChartLabel").html(chartLabeHtml);
					
					var xAxis1 = {
			        	gridLineWidth:0,
			        	categories: categoriesArr,
			            title: { text: null },
			            labels: { enabled: false },
			            reversed: true
			        };
			       var xAxis2= {
			        	gridLineWidth:0,
			        	lineWidth:0,
			        	categories: categoriesArr,
			            title: { text:'', align: 'center' },
			            labels: {
			                align: 'center', x: -60
			            }
			        };
					var name1 = "기술업종 사업체";
					var name2 = "기술업종 종사자";
					
					$(".startUpSupplyDiv").hide();
					$(".supplyAreaStateDiv").show();
					
					
					// 기술업종 사업체
					areaStateBarChart_fnc(id1 , colors1, xAxis1, name1, dataArr1, true);
					
					// 기술업종 종사자/산업단지
					areaStateBarChart_fnc(id2, colors2, xAxis2, name2, dataArr2, false);
					
					var tmpResult = [];
					for (var i=1; i<result.length; i++) {
						result[i]["adm_cd"] = result[i].sido_cd;
						tmpResult.push(result[i]);
					}
					
					$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["data"] = tmpResult;
					
					//색상지도
					if ($("#supplyMapBtn01").hasClass("on")) {
						$technicalBizDataBoard.ui.changeSupplyMap("1");
					}else {
						$technicalBizDataBoard.ui.changeSupplyMap("2");
					}
					
					$technicalBizDataBoard.ui.setReportData(
							"supply", 
							"supplyRegionChart", 
							result, 
							$technicalBizDataBoard.ui.map_id);
				
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	/** 지원시설 조회 - 지역통계 현황 barCharts end */
	
	/** ********* 산업단지 조회 - 전국 시도별 현황 barCharts Start ********* */
	(function() {
		$class("sop.portal.industryBarChartData.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					var map = options.params.map;
					var industryChartData = res.result;
					$technicalBizDataBoardApi.request.industryAreaStateBarChartDraw(industryChartData);
					
					if (map.dataGeojson) {
						var tmpMarkerGroup = sop.featureGroup();
						map.gMap.addLayer(tmpMarkerGroup);
						map.dataGeojson.eachLayer(function(layer) {
							for (var k=0; k<industryChartData.length; k++) {
								if (industryChartData[k].sido_cd == layer.feature.properties.adm_cd) {
									var html  = "<div>";
										html +=	    "<span style='text-align:center;width:61px;height:61px;font-size:11px;font-weight:bold;color:#fff;line-height:61px;position:absolute;'>"+industryChartData[k].induscom_cnt+"</span>";
										html += 	"<img src='/js/plugins/jquery-easyui-1.4/images/markercluster/markercluster-7.png' style='width:61px;height:61px;' />";
										html += "</div>";
									var markerIcon = new sop.DivIcon({
													html:html, 
													iconSize: new sop.Point(61, 61), 
													iconAnchor: new sop.Point(30.5, 61), 
													infoWindowAnchor: new sop.Point(1,-61)
									});
									
									var marker = sop.marker([layer.feature.properties.x, layer.feature.properties.y], {
										icon : markerIcon
									});
									marker.info = industryChartData[k];
									tmpMarkerGroup.addLayer(marker);
									
									marker.on("click", function() {
										$technicalBizMap.ui.doSupplyMarkerClear();
										$technicalBizMap.ui.doIndustryMarkerClear();
										$technicalBizMap.ui.doIndustryDetailRegionInfo(layer, map);
									});
									break;
								}
							}
						});
						$technicalBizMap.ui.markerGroup1 = tmpMarkerGroup;
						
						$technicalBizDataBoard.ui.setReportData(
								"industry", 
								"industryPoiCnt", 
								industryChartData, 
								map.id);
					}
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}else if(res.errCd == -401){
					accessTokenInfo(function() {
						$technicalBizDataBoardApi.request.industryAreaStateBarChart(options);
					});
				}
			}
		});
	}());
	/** ********* 산업단지 조회 - 전국 시도별 현황 barCharts End ********* */
	
	/** 산업단지 조회 - 전국 시도별 현황 barCharts start */
	(function() {
		$class("sop.portal.industryAreaStateBarChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행

					var enterpriseData = res.result.chartData;
					var induscomData = options;
					
					var id1 = "industryBarCharts01";
					var id2 = "industryBarCharts02";
					
					var colors1 = ['#5b3fb2','#ffffff']
					var colors2 = ['#444b5b', '#ffffff'];
					var categoriesArr = [];
					var dataArr1 = [];
					var dataArr2 = [];
					var chartLabeHtml = "";
					var name1 = "사업체";
					var name2 = "산업단지";
					
					
					
					var type = "corp_cnt";
					if ($("#standardButton").hasClass("off")) {
						type = "worker_cnt";
						name1 = "종사자";
					}
					
					$(".industySidoDataboardTitle").html("기술업종 "+name1+" 수 / 산업단지 수 현황");
					$(".industySidoDataBoardGraphTitle").html(name1);

					for(var i = 0; i < enterpriseData.length; i++){
						enterpriseData[i]["adm_cd"] = enterpriseData[i].sido_cd;
						categoriesArr.push(enterpriseData[i].sido_nm);
						chartLabeHtml += "<li>" +enterpriseData[i].sido_nm + "</li>";
						dataArr1.push(parseFloat(enterpriseData[i][type].toFixed(2)));

						for(var j = 0; j < induscomData.length; j++){
							if(enterpriseData[i].sido_cd == induscomData[j].sido_cd){
								dataArr2.push(parseFloat(induscomData[j].induscom_cnt.toFixed(2)));
							}
						}
					}
					
					$(".industryBarChartLabel").html(chartLabeHtml);
					
					var xAxis1 = {
			        	gridLineWidth:0,
			        	categories: categoriesArr,
			            title: { text: null },
			            labels: { enabled: false },
			            reversed: true
			        };
			       var xAxis2= {
			        	gridLineWidth:0,
			        	lineWidth:0,
			        	categories: categoriesArr,
			            title: { text:'', align: 'center' },
			            labels: {
			                align: 'center', x: -60
			            }
			        };
					
					
					//사업체
					areaStateBarChart_fnc(id1 , colors1, xAxis1, name1, dataArr1, true);
					
					//산업단지
					areaStateBarChart_fnc(id2, colors2, xAxis2, name2, dataArr2, false);	
					
					$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map.id].options["data"] = enterpriseData;
					$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map.id].options["induscomm"] = induscomData;
					
					
					var tmpData = {
							categories : categoriesArr,
							seriesData : [{"data" : dataArr1}, {"data" : dataArr2}]
					}
					$technicalBizDataBoard.ui.setReportData(
							"industry", 
							"industryRegionChart", 
							tmpData, 
							$technicalBizDataBoard.ui.map.id);
					
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	/** 산업단지 조회 - 전국 시도별 현황 barCharts end */

	/** ********* 지원시설 조회 - 창업지원시설 현황 barCharts Start ********* */
	(function() {
		$class("sop.portal.startUpSupplyBarChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					$(".supplyAreaStateDiv").hide();
					$(".startUpSupplyDiv").show();
		//TODO DB데이터 값으로 변경, 차트 함수 변경
					// 창업지원시설 현황
					var result = res.result;
					var categoriesArr = [];
					var dataArr = [];

					if(result.length > 1){
						for(var i = 0; i < result.length; i++){
							if("00" != result[i].sido_cd){
								categoriesArr.push(result[i].sido_nm);
								dataArr.push(parseFloat(result[i].startupbizfac_cnt.toFixed(1)));
							}else{
								//배열 맨앞에 추가
								categoriesArr.unshift(result[i].sido_nm);
								dataArr.unshift(parseFloat(result[i].startupbizfac_cnt.toFixed(1)));
							}
						}
					}else{
						categoriesArr = ["전국평균", "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];
						dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
					}

					startUpSupplyBarChart_fnc(categoriesArr, dataArr);
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	/** ********* 지원시설 조회 - 창업지원시설 현황 barCharts end ********* */
	
	
	/** 지원시설/산업단지 - 지역 종합 통계 정보 Start */
	/** ********* 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 수 barCharts Start ********* */
	(function() {
		$class("sop.portal.technicalBizCntBarChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					var chartData = res.result.chartData;
					var techRate = res.result.techRate;
					var regionCnt = techRate.region_cnt;
					var techNm = "";
					var upperTechTite = "";
					var upperAdmNm, curAdmNm, id;
					
					//================= 막대 차트 내 중분류 개수 설정   start ==================//
					$(".changeSupplyAreaSynthesizeStatsInfoTab03").each(function() {
						if ($(this).hasClass("on")) {
							techNm = $(this).html();
						}
					});
					
					switch(parseInt(options.params.corp_worker_type)) {
						case 1:
							upperTechTite = techNm + " 사업체 수 : " + appendCommaToNumber(techRate.corp_cnt) + " (개)"; //2017.03.24 천단위 콤마, 2018.01.18 [개발팀] 띄어쓰기
							break;
						case 2:
							upperTechTite = techNm + " 종사자 수 : " + appendCommaToNumber(techRate.worker_cnt) + " (명)"; //2017.03.24 천단위 콤마, 2018.01.18 [개발팀] 띄어쓰기
							break;
					}
					//================= 막대 차트 내 중분류 개수 설정   end ==================//
					
					//막대차트 범례설정
					if (options.params.adm_cd != undefined &&
						options.params.adm_cd != "00" &&
						options.params.adm_cd.length == 2) {
						upperAdmNm = "17개 시도 평균";
					}else {
						switch (parseInt(options.params.adm_cd.length)) {
							case 5:
								upperAdmNm = options.params.adm_nm.split(" ")[0] + " 평균";
								break;
							case 7:
								upperAdmNm = options.params.adm_nm.split(" ")[0]+ " " +options.params.adm_nm.split(" ")[1] + " 평균";
								break;
						}
					}
					curAdmNm = options.params.adm_nm;
					
					switch(options.params.menuType) {
						case "supply": //지원시설
							id = "supplyAreaSynthesizeStatsInfoChart01";
							$(".supplyAreaSynthesizeStatsInfoChart").hide();
							$("#supplyAreaSynthesizeStatsInfoChart01Div > .etcText05").html(upperTechTite);
							$("#supplyAreaSynthesizeStatsInfoChart01Div > .techLegend02 li:eq(0)").html(upperAdmNm);
							$("#supplyAreaSynthesizeStatsInfoChart01Div > .techLegend02 li:eq(1)").html(curAdmNm);
							break;
						case "industry": //산업단지
							id = "industryAreaSynthesizeStatsInfoChart01"
							$(".industryAreaSynthesizeStatsInfoChart").hide();
							$("#industryAreaSynthesizeStatsInfoChart01Div > .etcText05").html(upperTechTite);
							$("#industryAreaSynthesizeStatsInfoChart01Div > .techLegend02 li:eq(0)").html(upperAdmNm);
							$("#industryAreaSynthesizeStatsInfoChart01Div > .techLegend02 li:eq(1)").html(curAdmNm);
							break;
					};
								
					$("#"+id+"Div").show();
					
					var categoriesArr = [];
					var dataArr1 = [];	//시도 카운트 데이터
					var dataArr2 = [];	//시군구 카운트 데이터					
					
					for(var i = 0; i < chartData.length; i++){
						categoriesArr.push(chartData[i].techbiz_s_class_cd_nm);
						if(options.params.corp_worker_type == 1){	//사업체
							dataArr1.push(parseFloat(chartData[i].corp_cnt));
							dataArr2.push(parseFloat((chartData[i].upper_corp_cnt/regionCnt).toFixed(2)));
						}else if(options.params.corp_worker_type == 2){	//종사자
							dataArr1.push(parseFloat(chartData[i].worker_cnt));
							dataArr2.push(parseFloat((chartData[i].upper_worker_cnt/regionCnt).toFixed(2))); //2017.03.24 괄호처리 추가
						}
					}
					
					 var chartHeight = chartData.length * 40;
					 $('#'+id).attr("height", chartHeight);
					
					technicalBizCntBarChart_fnc(id, categoriesArr, curAdmNm, dataArr1, upperAdmNm, dataArr2, chartHeight);
					
					var tmpSeriesData, tmpAdmNmList;
					var tmpData = {
							categories : categoriesArr,
							admNmList : tmpAdmNmList = [curAdmNm, upperAdmNm],
							seriesData : tmpSeriesData = [dataArr1, dataArr2]
					}
					$technicalBizDataBoard.ui.setReportData(
							options.params.menuType, 
							"technicalBizInfoChart", 
							chartData, 
							$technicalBizDataBoard.ui.map_id);
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	
	/** ********* 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 비율 pieCharts Start ********* */
	(function() {
		$class("sop.portal.technicalBizPercentPieChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					var chartData = res.result.chartData;
					var techRate = res.result.techRate;
					var techNm = "";
					var upperTechTite = "";
					var upperAdmNm, curAdmNm;
					
					//================= 차트 내 중분류 비율 설정   start ==================//
					$(".changeSupplyAreaSynthesizeStatsInfoTab03").each(function() {
						if ($(this).hasClass("on")) {
							techNm = $(this).html();
						}
					});
					
					switch(parseInt(options.params.corp_worker_type)) {
						case 1:
							upperTechTite = techNm + " 사업체비율 : " + appendCommaToNumber(techRate.corp_cnt) + " (개)"; //2017.03.24 천단위 콤마
							
							//2017.03.24 비율정보 수정
							//==========================START=============================//
							var totalCnt = 0;
							for (var i=0; i<chartData.length; i++) {
								totalCnt += parseFloat(chartData[i].corp_cnt);
							}
							
							for (var i=0; i<chartData.length; i++) {
								chartData[i].corp_per = ((parseFloat(chartData[i].corp_cnt) / totalCnt) *100).toFixed(1);
							}
							//==========================END=============================//
							
							chartData = chartData.sort(function(a, b) {
								return parseFloat(b.corp_per) - parseFloat(a.corp_per)
							});
							
							break;
						case 2:
							upperTechTite = techNm + " 종사자비율 : " + appendCommaToNumber(techRate.worker_cnt) + " (명)"; //2017.03.24 천단위 콤마
							
							//2017.03.24 종사자 비율정보 수정
							//==========================START=============================//
							var totalWorkerCnt = 0;
							for (var i=0; i<chartData.length; i++) {
								totalWorkerCnt += parseFloat(chartData[i].worker_cnt);
							}
							
							for (var i=0; i<chartData.length; i++) {
								chartData[i].worker_per = ((parseFloat(chartData[i].worker_cnt) / totalWorkerCnt) *100).toFixed(1);
							}
							//==========================END=============================//
							
							break;
					}
					//================= 차트 내 중분류 비율 설정   end ==================//
					
					var id = "supplyAreaSynthesizeStatsInfoChart02";
					if("supply" == options.params.menuType){
						$(".supplyAreaSynthesizeStatsInfoChart").hide();
						$("#supplyAreaSynthesizeStatsInfoChart01Div > .etcText05").html(upperTechTite);
					}else if("industry" == options.params.menuType){
						id = "industryAreaSynthesizeStatsInfoChart02"
						$(".industryAreaSynthesizeStatsInfoChart").hide();
						//industryAreaSynthesizeStatsTitleData_fnc(titleData);
					}
					$("#"+id+"Div").show();

					var dataArr = [];
					var legendTitleNm = "첨단기술업종 정보" 
						
					if(chartData[0]) {
						legendTitleNm = chartData[0].techbiz_m_class_cd_nm+"업종 정보";
					}
					var legendArr = {
							legendTitleNm : legendTitleNm,
							legendData : []
					};
					
					var name = options.params.adm_nm;
					
					for(var i = 0; i < chartData.length; i++){
						var tempData = [];
						tempData.push(chartData[i].techbiz_s_class_cd_nm);
						if(options.params.corp_worker_type == 1){	//사업체
								tempData.push(parseFloat(chartData[i].corp_per));
								legendArr.legendData.push({
									legendNm : chartData[i].techbiz_s_class_cd_nm,
									legendPer : chartData[i].corp_per,
									legendCnt : appendCommaToNumber(chartData[i].corp_cnt),
									legendUnit : "개"}); //2017.03.24
						}else if(options.params.corp_worker_type == 2){	//종사자
								tempData.push(Number(chartData[i].worker_per));
								legendArr.legendData.push({
									legendNm : chartData[i].techbiz_s_class_cd_nm,
									legendPer : chartData[i].worker_per,
									legendCnt : appendCommaToNumber(chartData[i].worker_cnt),
									legendUnit : "명"}); //2017.03.24
						}
						dataArr.push(tempData);
					}
					
					technicalBizPercentPieChart_fnc(id, name, dataArr, legendArr);
					
					var tmpSeriesData, tmpAdmNmList;
					var tmpData = {
							categories : name,
							seriesData : dataArr
					}
					$technicalBizDataBoard.ui.setReportData(
							options.params.menuType, 
							"technicalBizInfoChart", 
							chartData, 
							$technicalBizDataBoard.ui.map_id);
					
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	/** ********* 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 비율 pieCharts end ********* */
	
	/** ********* 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 증감 lineCharts Start ********* */
	(function() {
		$class("sop.portal.technicalBizVariateLineChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					var chartData = res.result.chartData;
					var techRate = res.result.techRate;
					var techNm = "";
					var upperTechTite = "";
					var origin = "";
					var unit, showName, tagName, showData = [];
					
					if("supply" == options.params.menuType){
						tagName = "Supply";
					}else {
						tagName = "Industry";
					}
					
					//=================  차트 내 중분류 개수 설정   start ==================//
					$(".change"+tagName+"AreaSynthesizeStatsInfoTab03").each(function() {
						if ($(this).hasClass("on")) {
							techNm = $(this).html();
						}
					});
					
					if ($("#change"+tagName+"AreaSynthesizeStatsInfoTab02_Btn01").hasClass("on")) {
						showName = "수";
						showData = ["corp_cnt" , "worker_cnt"];
						unit = " (개)";
					}else if ($("#change"+tagName+"AreaSynthesizeStatsInfoTab02_Btn02").hasClass("on")) {
						showName = "비율";
						showData = ["corp_per" , "worker_per"];
						unit = " (%)";
					}else if ($("#change"+tagName+"AreaSynthesizeStatsInfoTab02_Btn03").hasClass("on")) {
						showName = "증감";
						showData = ["corp_irdsrate" , "worker_irdsrate"];
						unit = " (%)";
					}
					switch(parseInt(options.params.corp_worker_type)) {
						case 1:
							if( ($("#change"+tagName+"AreaSynthesizeStatsInfoTab02_Btn03").hasClass("on")) ){
								upperTechTite = techNm + " 사업체 "+ showName + " : 전년대비 " + techRate[showData[parseInt(options.params.corp_worker_type)-1]] + unit;
							} else {
								upperTechTite = techNm + " 사업체 "+ showName + " : " + techRate[showData[parseInt(options.params.corp_worker_type)-1]] + unit;
							}
							break;
						case 2:
							if( ($("#change"+tagName+"AreaSynthesizeStatsInfoTab02_Btn03").hasClass("on")) ){
								upperTechTite = techNm + " 종사자 "+ showName + " : 전년대비 " + techRate[showData[parseInt(options.params.corp_worker_type)-1]] + unit;
							} else {
								upperTechTite = techNm + " 종사자 " + showName + " : " + techRate[showData[parseInt(options.params.corp_worker_type)-1]] + unit;
							}
							break;
					}
					//================= 차트 내 중분류 개수 설정   end ==================//
					
					//출처
					origin = "출처 : 통계청, 전국사업체조사("+options.params.year+")";
					
					var id="supplyAreaSynthesizeStatsInfoChart03";
					
					if("supply" == options.params.menuType){
						$(".supplyAreaSynthesizeStatsInfoChart").hide();
						$("#supplyAreaSynthesizeStatsInfoChart01Div > .etcText05").html(upperTechTite);
						$("#supplyAreaSynthesizeStatsInfoChart03Div > .etcText05").html(upperTechTite);
						$("#supplyAreaSynthesizeStatsInfoChart03 > .etcRight05").html(origin);
					}else if("industry" == options.params.menuType){
						id = "industryAreaSynthesizeStatsInfoChart03"
						$(".industryAreaSynthesizeStatsInfoChart").hide();
						$("#industryAreaSynthesizeStatsInfoChart01Div > .etcText05").html(upperTechTite);
						$("#industryAreaSynthesizeStatsInfoChart03Div > .etcText05").html(upperTechTite);
						$("#industryAreaSynthesizeStatsInfoChart03 > .etcRight05").html(origin);
					}
					$("#"+id+"Div").show();
					
					
					var categoriesArr = [];
					var title = "";
					var name = "";
					
					if(options.params.corp_worker_type == 1){	//사업체
						title = "사업체 증감(개)";
						name = "기술업종별 사업체 증감";
					}else if(options.params.corp_worker_type == 2){	//종사자
						title = "종사자 증감(명)";
						name = "기술업종별 종사자 증감";
					}
					
					var dataArr = [];
					for(var i = 0; i < chartData.length; i++){
						categoriesArr.push(chartData[i].base_year);
						if(options.params.corp_worker_type == 1){	//사업체
//							dataArr.push(parseFloat(chartData[i].corp_irdsrate || 0));
							dataArr.push(parseFloat(chartData[i].corp_cnt || 0));
						}else if(options.params.corp_worker_type == 2){	//종사자
//							dataArr.push(parseFloat(chartData[i].worker_irdsrate || 0));
							dataArr.push(parseFloat(chartData[i].worker_cnt || 0));
						}
					}
					
					technicalBizVariateLineChart_fnc(id, categoriesArr, title, name, dataArr);
					
					var tmpSeriesData, tmpAdmNmList;
					var tmpData = {
							categories : categoriesArr,
							admNmList : name,
							seriesData : dataArr
					}
					$technicalBizDataBoard.ui.setReportData(
							options.params.menuType, 
							"technicalBizInfoChart", 
							chartData, 
							$technicalBizDataBoard.ui.map_id);
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	/** ********* 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 증감 lineCharts end ********* */
	
	
	//2017.09.27 개발팀 추가
	/** ********* 지원시설/산업단지 조회 시도 - 기술업종별 입지계수 Charts Start ********* */
	(function() {
		$class("sop.portal.technicalBizLctChart.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					/*var detail_categories = ["첨단기술",  "고기술", "중기술", "저기술", "창의디지털", "ICT", "전문섬비스"];*/
					//ex
					//종목명		사업자입지계수 		종사자입지계수
					//첨단기술		1.5				1
					//고기술		0.5				0.2
					//중기술		0.4				1.0
					//창의디지털	1.0				1.0
					//ICT		1.2				2.0
					//전문성서비스	3.0				3.0
					//사업자 x축
					//종사자 y축
					
					
					//sido_vs_corp_lq
					//sido_vs_worker_lq
					
					//country_vs_corp_lq
					//country_vs_worker_lq
					
					$(".supplyAreaSynthesizeStatsInfoChart").hide();
					var id = "#"+ options.id;
					$("#supplyAreaSynthesizeStatsInfoChart04Div").show();
					var featureDataList = res.result.featureData;
					/*var featureDetail = [];
					var colorList = [];
					var series = [];*/
					/*$("#sidoLctCorpTextAdmNm").text(options.params.adm_nm);
					$("#sidoLctWorkerTextAdmNm").text(options.params.adm_nm);*/
					$(id).highcharts({ 
				        chart: { type: 'bubble', plotBorderWidth: 1, zoomType:'x' }, //2018.01.15 [개발팀] 줌기능 추가
				        legend: {enabled: false},
				        title: {text: ''},
				        subtitle: {text: ''},
				        xAxis: {
				            gridLineWidth: 1,
				            title: {text: '사업체 LQ'},
				            labels: {
				                format: '{value}'
				            },
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
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
				                text: '종사자 LQ'
				            },
				            labels: {
				                format: '{value}'
				            },
				            maxPadding: 0.2,
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
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
				        	//2018.01.22 [개발팀] 툴팁로직 변경
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

				        /*plotOptions: {
				            series: {
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.name}'
				                }
				            }
				        },*/
				        plotOptions: {
	                        series: {
	                            dataLabels: {
	                                enabled: true,
	                                format: '{point.name}',
	                                style:{
	                                   color:"#000",
	                                   textOutline : "0px"
	                                }
	                            }
	                        }
	                    },
				    });
					
					//addSeries 홓출하기
					//corp_lct
					//worker_lct 종사자입지계수
					$("#technicalLctCorpTextAdmNm").text(options.params.adm_nm);
					$("#technicalLctWorkerTextAdmNm").text(options.params.adm_nm);
					//00이 전체 이기 때문에 1부터
					var lctCorpOverList = new Array();
					var lctWorkerOverList = new Array();
					
					var techClass = {
							11 : "c01",
							12 : "c02",
							13 : "c03",
							14 : "c04",
							21 : "c05",
							22 : "c06",
							23 : "c07"
					};
					var tableHtml = "<table class='pcTable02' id='supplyLctChartTable'>";
					tableHtml +="<tr><td class='addSideLine th'>업종명</td><td class='addSideLine th'>사업자 입지계수</td><td class='addSideLine th'>종사자 입지계수</td></tr>";
					for(var i = 0; i < featureDataList.length; i++){
						
						var corp_lct = null;
						var worker_lct = null;
						var m_class_nm = null;
						
						//======= 2018.01.15 [개발팀] 로직수정-통으로 머지 요망 START =======//
						if(options.type == "country"){
							corp_lct = Number(featureDataList[i].country_vs_corp_lq);
							worker_lct = Number(featureDataList[i].country_vs_worker_lq);
							m_class_nm = featureDataList[i].techbiz_m_class_cd_nm;
							tableHtml +="<tr><td class='addSideLine'>"+m_class_nm+"</td><td class='addSideLine'>"+corp_lct+"</td><td class='addSideLine'>"+worker_lct+"</td></tr>";
						}else{
							corp_lct = Number(featureDataList[i].sido_vs_corp_lq);
							worker_lct = Number(featureDataList[i].sido_vs_worker_lq);
							m_class_nm = featureDataList[i].techbiz_m_class_cd_nm;
							tableHtml +="<tr><td class='addSideLine'>"+m_class_nm+"</td><td class='addSideLine'>"+corp_lct+"</td><td class='addSideLine'>"+worker_lct+"</td></tr>";
						}
						//======= 2018.01.15 [개발팀] 로직수정 END =======//
						
						addSeries(id,corp_lct,worker_lct,m_class_nm,$technicalBizDataBoardApi.example.colorList[0][i]);
						if(corp_lct >= 1){
							/*var oriText = $("#technicalLctCorpMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ",";
							}
							appendText += m_class_nm;
							$("#technicalLctCorpMclassNm").append(appendText);*/
							var corpLctObj = {
									name : m_class_nm,
									val : corp_lct
							};
							lctCorpOverList.push(corpLctObj);
						}
						
						if(worker_lct >= 1){
							var workerLctObj = {
									name : m_class_nm,
									val : workerLctObj
							};
							lctWorkerOverList.push(workerLctObj);
							/*var oriText = $("#technicalLctWorkerMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ",";
							}
							appendText += m_class_nm;
							
							$("#technicalLctWorkerMclassNm").append(appendText);*/
						}
					}
					$("#technicalLctCorpMclassNm").text('');
					$("#technicalLctWorkerMclassNm").text('');
					tableHtml +="</table>";
					$("#supplyAreaSynthesizeStatsInfoChart04_2").html(tableHtml);
					
					//2018.01.15 [개발팀] 테이블 정렬추가
					$technicalBizDataBoard.util.tableSortable("#supplyLctChartTable");
					
					lctArrayWrite(lctCorpOverList , "technicalLctCorpMclassNm");
					lctArrayWrite(lctWorkerOverList,"technicalLctWorkerMclassNm");
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	
	
	/** ********* 지원시설/산업단지 조회 - 기술업종별 입지계수 Charts end ********* */
	
	
	/** ********* 산업단지 조회 시도 - 기술업종별 입지계수 Charts Start ********* */
	(function() {
		$class("sop.portal.technicalBizIndustryLctChart.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					/*var detail_categories = ["첨단기술",  "고기술", "중기술", "저기술", "창의디지털", "ICT", "전문섬비스"];*/
					//ex
					//종목명		사업자입지계수 		종사자입지계수
					//첨단기술		1.5				1
					//고기술		0.5				0.2
					//중기술		0.4				1.0
					//창의디지털	1.0				1.0
					//ICT		1.2				2.0
					//전문성서비스	3.0				3.0
					//사업자 x축
					//종사자 y축
					
					
					//sido_vs_corp_lq
					//sido_vs_worker_lq
					
					//country_vs_corp_lq
					//country_vs_worker_lq
					
					$(".industryAreaSynthesizeStatsInfoChart").hide();
					var id = "#"+ options.id;
					$("#industryAreaSynthesizeStatsInfoChart04Div").show();
					
					var featureDataList = res.result.featureData;
					/*var featureDetail = [];
					var colorList = [];
					var series = [];*/
					/*$("#sidoLctCorpTextAdmNm").text(options.params.adm_nm);
					$("#sidoLctWorkerTextAdmNm").text(options.params.adm_nm);*/
					
					$(id).highcharts({ 
				        chart: { type: 'bubble', plotBorderWidth: 1, zoomType: 'x' }, //2018.01.15 [개발팀] 줌기능 추가
				        legend: {enabled: false},
				        title: {text: ''},
				        subtitle: {text: ''},
				        xAxis: {
				            gridLineWidth: 1,
				            title: {text: '사업체 LQ'},
				            labels: {
				                format: '{value}'
				            },
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
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
				                text: '종사자 LQ'
				            },
				            labels: {
				                format: '{value}'
				            },
				            maxPadding: 0.2,
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
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
				        	//2018.01.22 [개발팀] 툴팁로직 변경
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

				        /*plotOptions: {
				            series: {
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.name}'
				                }
				            }
				        },*/
				        plotOptions: {
	                        series: {
	                            dataLabels: {
	                                enabled: true,
	                                format: '{point.name}',
	                                style:{
	                                   color:"#000",
	                                   textOutline : "0px"
	                                }
	                            }
	                        }
	                    },
	                    
				    });
					
					//addSeries 홓출하기
					//corp_lct
					//worker_lct 종사자입지계수
					
					$("#industryLctCorpMclassNm").text(""); 
					$("#industryLctWorkerMclassNm").text("");
					 
					$("#industryLctCorpTextAdmNm").text(options.params.adm_nm);
					$("#industryLctWorkerTextAdmNm").text(options.params.adm_nm);
					
					var tableHtml = "<table class='pcTable02' id='industryAreLctChartTable'>";
					tableHtml +="<tr><td class='addSideLine th'>업종명</td><td class='addSideLine th'>사업체 입지계수</td><td class='addSideLine th'>종사자 입지계수</td></tr>";
					var techClass = {
							11 : "c01",
							12 : "c02",
							13 : "c03",
							14 : "c04",
							21 : "c05",
							22 : "c06",
							23 : "c07"
					};
					
					//00이 전체 이기 때문에 1부터
					var lctCorpOverList = new Array();
					var lctWorkerOverList = new Array();
					for(var i = 0; i < featureDataList.length; i++){
						var corp_lct = null;
						var worker_lct = null;
						var m_class_nm = null;

						//======= 2018.01.15 [개발팀] 로직수정-통으로 머지 요망 START =======//
						if(options.type == "country"){
							corp_lct = Number(featureDataList[i].country_vs_corp_lq);
							worker_lct = Number(featureDataList[i].country_vs_worker_lq);
							m_class_nm = featureDataList[i].techbiz_m_class_cd_nm;
							tableHtml +="<tr><td class='addSideLine'>"+m_class_nm+"</td><td class='addSideLine'>"+Number(corp_lct)+"</td><td class='addSideLine'>"+Number(worker_lct)+"</td></tr>";
						}else{
							corp_lct = Number(featureDataList[i].sido_vs_corp_lq);
							worker_lct = Number(featureDataList[i].sido_vs_worker_lq);
							m_class_nm = featureDataList[i].techbiz_m_class_cd_nm;
							tableHtml +="<tr><td class='addSideLine'>"+m_class_nm+"</td><td class='addSideLine'>"+Number(corp_lct)+"</td><td class='addSideLine'>"+Number(worker_lct)+"</td></tr>";
						}
						//======= 2018.01.15 [개발팀] 로직수정 END=======//
						 
						 
						addSeries(id,corp_lct,worker_lct,m_class_nm,$technicalBizDataBoardApi.example.colorList[0][i]);
						
						if(corp_lct >= 1){
							/*var oriText = $("#industryLctCorpMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ",";
							}
							appendText += m_class_nm;
							$("#industryLctCorpMclassNm").append(appendText);*/
							var obj = {
									name : m_class_nm,
									val : Number(corp_lct)
							}
							lctCorpOverList.push(obj);
						}
						
						if(worker_lct >= 1){
							
							/*var oriText = $("#industryLctWorkerMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ",";
							}
							appendText += m_class_nm;
							
							$("#industryLctWorkerMclassNm").append(appendText);*/
							
							var obj = {
									name : m_class_nm,
									val : Number(worker_lct)
							};
							lctWorkerOverList.push(obj);
						}
						
					}
					lctArrayWrite(lctCorpOverList , "industryLctCorpMclassNm");
					lctArrayWrite(lctWorkerOverList,"industryLctWorkerMclassNm");
					tableHtml +="</table>";
					$("#industryAreaSynthesizeStatsInfoLctChart_2").html(tableHtml);
					
					//2018.01.15 [개발팀] 테이블 정렬추가
					$technicalBizDataBoard.util.tableSortable("#industryAreLctChartTable");
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	
	
	/** ********* 산업단지 조회 - 기술업종별 입지계수 Charts end ********* */
	
	//2017.10.12 개발팀 추가
	/** ********* 산업단지상세 조회 - 기술업종별 입지계수 Charts ********* */
	(function() {
		$class("sop.portal.technicalBizIndustryDetailLctChart.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					/*var detail_categories = ["첨단기술",  "고기술", "중기술", "저기술", "창의디지털", "ICT", "전문섬비스"];*/
					//ex
					//종목명		사업자입지계수 		종사자입지계수
					//첨단기술		1.5				1
					//고기술		0.5				0.2
					//중기술		0.4				1.0
					//창의디지털	1.0				1.0
					//ICT		1.2				2.0
					//전문성서비스	3.0				3.0
					//사업자 x축
					//종사자 y축
					
					
					//sido_vs_corp_lq
					//sido_vs_worker_lq
					
					//country_vs_corp_lq
					//country_vs_worker_lq
					//industryAreaSynthesizeStatsInfoDetailLctChart
					
					var id = "#"+ options.id;
					var featureDataList = res.result.featureData;
					
					$(id).highcharts({ 
				        chart: { type: 'bubble', plotBorderWidth: 1, zoomType : 'x' }, //2018.01.15 [개발팀] 줌기능 추가
				        legend: {enabled: false},
				        title: {text: ''},
				        subtitle: {text: ''},
				        xAxis: {
				            gridLineWidth: 1,
				            title: {text: '사업체 LQ'},
				            labels: {
				                format: '{value}'
				            },
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
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
				                text: '종사자 LQ'
				            },
				            labels: {
				                format: '{value}'
				            },
				            maxPadding: 0.2,
				            plotLines: [{
				                color: 'red',
				                dashStyle: 'solid',
				                width: 2,
				                value: 1,
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
				        	//2018.01.22 [개발팀] 툴팁로직 변경
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

				       /* plotOptions: {
				            series: {
				                dataLabels: {
				                    enabled: true,
				                    format: '{point.name}'
				                }
				            }
				        },*/
				        plotOptions: {
	                        series: {
	                            dataLabels: {
	                                enabled: true,
	                                format: '{point.name}',
	                                style:{
	                                   color:"#000",
	                                   textOutline : "0px"
	                                }
	                            }
	                        }
	                    },
				    });
					
					//addSeries 홓출하기
					//corp_lct
					//worker_lct 종사자입지계수
					$("#industryLctDetailCorpTextAdmNm").text(options.params.complex_nm);
					$("#industryLctDetailWorkerTextAdmNm").text(options.params.complex_nm);
					//00이 전체 이기 때문에 1부터
					
					var tableHtml = "<table class='pcTable02' id='sidoLctChartTable'>";
					tableHtml +="<tr><td class='addSideLine th'>업종명</td><td class='addSideLine th'>사업자 입지계수</td><td class='addSideLine th'>종사자 입지계수</td></tr>";
					var techClass = {
							11 : "c01",
							12 : "c02",
							13 : "c03",
							14 : "c04",
							21 : "c05",
							22 : "c06",
							23 : "c07"
					};
					
					var overCrtList = new Array();
					var workerCrtList = new Array();
					
					var colorList = {
							"11" : "#ef356b",	//첨단기술
							"12" : "#f79339",	//고기술
							"13" : "#f7cb00",	//중기술
							"14" : "#b2cc19",	//저기술
							"21" : "#1778cc",	//창의 및 디지털				
							"22" : "#5b3fb2",	//ICT
							"23" : "#000000"	//전문서비스
					};
					
					for(var i = 0; i < featureDataList.length; i++){
						var corp_lct = null;
						var worker_lct = null;
						var m_class_nm = null;
						if(options.base_region == "sido"){
							corp_lct = Number(featureDataList[i].sido_vs_corp_lq);
							worker_lct = Number(featureDataList[i].sido_vs_worker_lq);
							m_class_nm = featureDataList[i].techbiz_m_class_cd_nm;
						}else{
							corp_lct = Number(featureDataList[i].country_vs_corp_lq);
							worker_lct = Number(featureDataList[i].country_vs_worker_lq);
							m_class_nm = featureDataList[i].techbiz_m_class_cd_nm;
						}
						/*tableHtml +="<tr><td class='addSideLine "+techClass[featureDataList[i].techbiz_class_cd]+"'><font color='#fff'>"+m_class_nm+"</td><td class='addSideLine'>"+Number(corp_lct)+"</td><td class='addSideLine'>"+Number(worker_lct)+"</td></tr>";*/
						tableHtml +="<tr><td class='addSideLine'>"+m_class_nm+"</td><td class='addSideLine'>"+Number(corp_lct)+"</td><td class='addSideLine'>"+Number(worker_lct)+"</td></tr>";
						
						/*addSeries(id,corp_lct,worker_lct,m_class_nm,$technicalBizDataBoardApi.example.colorList[0][i]);*/
						
						addSeries(id,corp_lct,worker_lct,m_class_nm,colorList[featureDataList[i].techbiz_class_cd]);
						
						if(corp_lct >= 1){
							/*var oriText = $("#industryLctDetailCorpMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ",";
							}
							appendText += m_class_nm;
							$("#industryLctDetailCorpMclassNm").append(appendText);*/
							
							var obj = {
									name : m_class_nm,
									val : corp_lct
							};
							overCrtList.push(obj)
							
						}
						
						if(worker_lct >= 1){
							/*var oriText = $("#industryDetailLctWorkerMclassNm").text();
							var appendText = "";
							if(oriText != ""){
								appendText = ",";
							}
							appendText += m_class_nm;
							
							$("#industryDetailLctWorkerMclassNm").append(appendText);*/
							
							var obj = {
								name : m_class_nm,
								val : worker_lct
							};
							workerCrtList.push(obj);
						}
					}
					tableHtml +="</table>";
					$("#industryLctDetailCorpMclassNm").text('');
					$("#industryDetailLctWorkerMclassNm").text('');
					$("#industryAreaSynthesizeStatsInfoDetailLctChart_2").html(tableHtml);
					lctArrayWrite(overCrtList,"industryLctDetailCorpMclassNm");
					lctArrayWrite(workerCrtList,"industryDetailLctWorkerMclassNm");
					
					//2018.01.15 [개발팀] 테이블 정렬추가
					$technicalBizDataBoard.util.tableSortable("#sidoLctChartTable");
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	/** ********* 산업단지상세 조회 - 기술업종별 입지계수 Charts end ********* */
	//2017.10.12개발팀 추가 종료
	
	/** ********* 지원시설/산업단지 조회 - 주요지원시설 현황 barCharts Start ********* */
	(function() {
		$class("sop.portal.majorFacilityBarChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == 0){ // 정상 수행
					var id = "supplyMajorFacilityBarChart";
					if("industry" == options.params.menuType){
						id = "industryMajorFacilityBarChart";
					}
					
					var result = res.result.chartData;
					var dataArr = [];
					
					if(result[0]){
						dataArr.push([ '공공기관', Number(result[0].theme_sum_01) ]);
						dataArr.push([ '금융기관', Number(result[0].theme_sum_03) ]);
						dataArr.push([ '대학', Number(result[0].theme_sum_04) ]);
						dataArr.push([ '창업지원센터', Number(result[0].theme_sum_05) ]);
					}
					majorFacilityBarChart_fuc(id, dataArr);
					
					$technicalBizDataBoard.ui.setReportData(
							options.params.menuType, 
							"majorFacilityBarChart", 
							dataArr, 
							$technicalBizDataBoard.ui.map_id);
					
				}else if(res.errCd == -100){ // 데이터 없음
					
				}
			}
		});
	}());
	/** ********* 지원시설/산업단지 조회 - 주요지원시설 현황 barCharts End ********* */
	
	/** ********* 지원시설 상세조회 - 창업지원시설 목록 조회 Start ********* */
	(function() {
		$class("sop.portal.supplyStartUpSupplyListData.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if ($technicalBizLeftMenu.ui.curSelectedStatsType != "supply") {
					return;
				}
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result;
						var startUpSupplyListsCnt = result.count;
						var startUpSupplyListsTitleTxt = "";
						var map = options.options.params.map;
						
						$technicalBizMap.ui.doSupplyMarkerClear();
						$technicalBizMap.ui.doIndustryMarkerClear();
						
						//타이틀 설정
						switch(parseInt(options.type)) {
							case 0:	//종합
								startUpSupplyListsTitleTxt = "해당 지역 전체 지원시설 개수";
								break;
							case 1: //기업직접시설
								startUpSupplyListsTitleTxt = "해당 지역 기업직접시설 개수";
								break;
							case 2: //비즈니스센터
								startUpSupplyListsTitleTxt = "해당 지역 비즈니스센터 개수";
								break;
							case 3: //창업보육센터
								startUpSupplyListsTitleTxt = "해당 지역 창업보육센터 개수";
								break;
							case 4: //창업투자사
								startUpSupplyListsTitleTxt = "해당 지역 창업투자회사 개수";
								break;
						}
						
						var html = "";
						html +=	'<span>' + startUpSupplyListsTitleTxt + ' :</span> <strong>' + startUpSupplyListsCnt + '</strong><span>개</span>';
						$(".startUpSupplyListsTitle").html(html);
						$(".startUpSupplyLists").empty();
						
						//페이지처리
						var pageSize = 5;										// 페이지 당 항목 개수
						var totalPage = Math.ceil( result.count / pageSize);	// 전체 페이지 수	
						var tmpData = {};
						var pageIndex = 1;
						if(result.community_list != undefined){
							for (var i=0; i<result.community_list.length; i++) {
								if (i < pageSize*pageIndex) {
									if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
										tmpData[pageIndex] = [];
									}
									tmpData[pageIndex].push(result.community_list[i]);
								}else {
									pageIndex++;
									if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
										tmpData[pageIndex] = [];
									}
									tmpData[pageIndex].push(result.community_list[i]);
								}
							}
						}
						
						if (result.count == 0) {
							$("#startUpSupplyListPaging").hide();
						} else {
							$("#startUpSupplyListPaging").show();
						}
						$technicalBizDataBoard.ui.startUpSupplyListPaging(result.count, totalPage, pageSize, tmpData);
						//리스트 생성
						html = "";
						if (tmpData.length != 0 && Object.prototype.toString.call(tmpData["1"]) === "[object Array]" ) {
							var data = tmpData["1"];
							for (var i=0; i<data.length; i++) {
								//2017.09.27 개발팀 수정 시작
								/*html += '<li id="supply_'+i+'" class="supplyList" style="cursor:pointer;">';
								html += 	'<div class="rela">';
								html += 		'<div class="img"><img src="/img/tech/ico_listType01.png" /></div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">' + data[i].inst_nm + '</p>';
								html += 			'<div style="height:5px;"></div>';
								html +=				'<table>';
								html += 			'<tr class="t02"><td class="td01">연락처</td><td class="td02">'+ data[i].tel_no + '</td></tr>';
								html += 			'<tr style="height:3px;"></tr>';
								html += 			'<tr class="t02"><td class="td01">위치</td><td class="td02">'+ data[i].addr + '</td></tr>';
								html += 			'<tr style="height:3px;"></tr>';
								
								var url = data[i].url;
								if (url != undefined && url.length > 1) {
									if (url.indexOf("http") == -1 && url.indexOf("https") == -1) {
										url = "http://"+url;
									}
									html += '<tr class="t02"><td class="td01">링크</td><td class="td02"><a href="' + url + '" target="_blank">정보더보기>></td></tr>';
								}
								
								html +=				'</table>';
								html += 		'</div>';	
								html += 	'</div>';
								html += '</li>';*/
								html += '<li id="supply_'+i+'">';
								html += 	'<div class="rela">';
								html += 		'<div class="img">';
								if(data[i].lct_type == '1'){
									html += 			'<span class="c01">기업<br />직접</span>';
								}else if(data[i].lct_type == '2'){
									html += 			'<span class="c02">비즈<br />니스</span>';
								}else if(data[i].lct_type == '3'){
									html += 			'<span class="c03">창업<br />보육</span>';
								}else if(data[i].lct_type == '4'){
									html += 			'<span class="c04">창업<br />투자</span>';
								}
								
								html += 		'</div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">'+data[i].inst_nm+'</p>';
								html += 			'<p class="t02"><span>연락처</span>'+data[i].tel_no+'</p>';
								html += 			'<p class="t02"><span>위치</span> '+data[i].addr+'</p>';
								var url = data[i].url;
								if (url != undefined && url.length > 1) {
									if (url.indexOf("http") == -1 && url.indexOf("https") == -1) {
										url = "http://"+url;
									}
									html +=			'<p class="t02"><span>링크</span> <a href="'+url+'" target="_blank">정보 더보기&gt;&gt;&gt;</a></p>'
								}
								html += 		'</div>';
								
								
								
								html += 	'</div>';
								html += '</li>';
							}		
							$(".startUpSupplyLists").append(html);
							
							//마커생성
							var tmpMarkerGroup = sop.featureGroup();
							map.gMap.addLayer(tmpMarkerGroup)
							
							for (var p in tmpData) {
								for(var i=0; i<tmpData[p].length; i++) {
									var iconUrl = "";
									switch(parseInt(tmpData[p][i].lct_type)) {
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
									
									tmpData[p][i].x_coor = parseFloat(tmpData[p][i].x_coor).toFixed(2);
									tmpData[p][i].y_coor = parseFloat(tmpData[p][i].y_coor).toFixed(2);
									var marker = sop.marker([ tmpData[p][i].x_coor, tmpData[p][i].y_coor ], {
										icon: markerIcon
									});
									
									var marker_no = (parseInt(p)*pageSize) + (i-pageSize);
									marker.info = tmpData[p][i];
									marker.no = marker_no;
									tmpMarkerGroup.addLayer(marker);

									var tel_num = "";
									if (!sop.Util.isUndefined(tmpData[p][i].tel_no)) {
										tel_num = tmpData[p][i].tel_no;
									}
									
									var html ="";
									html += "<div style='width:480px;'>";
									html += 	"<div class='cont'>"; 
									html +=			"<p class='dabSubj'>"+tmpData[p][i].inst_nm+"</p>";
									html += 		"<div class='mDetailArea'>";
									html +=				"<div class='img'><img src='/img/tech/bg_dab01.png' /></div>";
									html +=				"<div class='mCont' style='width:350px;'>"; 
									html +=					"<table class='mContTable t01'>"; 
									html +=						"<colgroup>";
									html +=							"<col width='100' />";
									html +=						"</colgroup>";
									html +=						"<tr>";
									html +=							"<th>입지유형</th>";
									html +=							"<td>"+tmpData[p][i].lct_type_nm+"</td>"; 
									html +=						"</tr>";
									html +=						"<tr>";
									html +=							"<th>소재지</th>";
									html +=							"<td>"+tmpData[p][i].addr+"</td>";
									html +=						"</tr>";
									html +=						"<tr>";
									html +=							"<th>전화</th>";
									html +=							"<td>"+tel_num+"</td>"; 
									html +=						"</tr>";
									html +=					"</table>";
									html +=				"</div>";
									html +=			"</div>"; 
									html +=		"<div class='btnbox'>";
									
									if (options.options.params.adm_cd.length < 5) {
										html +=	"<a href='javascript:$technicalBizMap.ui.doSupplyDetailInfo(\""+tmpData[p][i].x_coor+"\", \""+tmpData[p][i].y_coor+"\");' class='btnType01 w200'>해당지역 상세정보 보기</a>";
									}
									
									if (tmpData[p][i].lct_type == "4") {//창업투자회사
										var url = tmpData[p][i].url;
										if (url != undefined && url.length > 1) {
											if (url.indexOf("http") == -1 || url.indexOf("https") == -1) {
												url = "http://"+url;
												
											}
											html +=	"<a href='"+url+"' target='_blank' class='btnType02 w200'>홈페이지 이동</a>";
										}
									}else {
										html +=	"<a href='"+tmpData[p][i].url+"' target='_blank' class='btnType02 w200'>벤처창업입지114 이동</a>";
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
							}
						}
						
						$technicalBizDataBoard.ui.setReportData(
								"supply", 
								"supplyMarker", 
								result.community_list, 
								$technicalBizDataBoard.ui.map_id);
						
						break;
					case -100:
						messageAlert.open("알림", res.errMsg);
						break;
					case -401:
						accessTokenInfo(function() {
							$technicalBizDataBoardApi.request.supplyStartUpSupplyList(options.type, options.options);
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
	/** 지원시설 상세조회 - 창업지원시설 목록 조회 end */	
	
	/** ********* 산업단지 목록 조회 Start ********* */
	(function() {
		$class("sop.portal.industryListData.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if ($technicalBizLeftMenu.ui.curSelectedStatsType != "industry") {
					return;
				}
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result;
						var industryListsCnt = result.count;
						var industryListsTitleTxt = "";
						var map = options.options.params.map;
						
						$technicalBizMap.ui.doSupplyMarkerClear();
						$technicalBizMap.ui.doIndustryMarkerClear();
						
						//타이틀설정
						switch(parseInt(options.type)) {
							case 0:
								industryListsTitleTxt = "해당 지역 전체 산업단지 개수";
								break;
							case 1:
								industryListsTitleTxt = "해당 지역 국가 산업단지 개수";
								break;
							case 2:
								industryListsTitleTxt = "해당 지역 일반 산업단지 개수";
								break;
							case 3:
								industryListsTitleTxt = "해당 지역 도시첨단 산업단지 개수";
								break;
							case 4:
								industryListsTitleTxt = "해당 지역 농공 산업단지 개수";
								break;
						}
						var html = '<span>' + industryListsTitleTxt + ' :</span> <strong>' + industryListsCnt + '</strong><span>개</span>';
						$(".industryListsTitle").html(html);
						$(".industryLists").empty();
						
						//페이지처리
						var pageSize = 5;										// 페이지 당 항목 개수
						var totalPage = Math.ceil( result.count / pageSize);	// 전체 페이지 수	
						var tmpData = {};
						var pageIndex = 1;
						if (result.community_list != undefined) {
							for (var i=0; i<result.community_list.length; i++) {
								if (i < pageSize*pageIndex) {
									if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
										tmpData[pageIndex] = [];
									}
									tmpData[pageIndex].push(result.community_list[i]);
								}else {
									pageIndex++;
									if (Object.prototype.toString.call(tmpData[pageIndex]) != "[object Array]" ) {
										tmpData[pageIndex] = [];
									}
									tmpData[pageIndex].push(result.community_list[i]);
								}
							}
						}
						
						
						if (result.count == 0) {
							$("industryListPaging").hide();
						} else {
							$("#industryListPaging").show();
						}
						$technicalBizDataBoard.ui.industryListPaging(result.count, totalPage, pageSize, tmpData);
						
						html = "";
						if (tmpData.length != 0 && Object.prototype.toString.call(tmpData["1"]) === "[object Array]" ) {
							var data = tmpData["1"];
							for (var i=0; i<data.length; i++) {
								//2017.09.30 개발팀 수정
									/*html += '<li id="industry_'+i+'" class="industryList" style="cursor:pointer;">';
									html += 	'<div class="rela">';
									html += 		'<div class="img"><img src="/img/tech/ico_listType01.png" /></div>';
									html += 		'<div class="txt">';
									html += 			'<p class="t01">' + data[i].complex_nm + '</p>';
									html += 			'<div style="height:5px;"></div>';
									html +=				'<table>';
									html += 			'<tr class="t02"><td class="td01">사업 시행자</td><td class="td02">' + data[i].implementer_mgmt_inst + '</td></tr>';
									html += 			'<tr style="height:3px;"></tr>';
									html += 			'<tr class="t02"><td class="td01">위치</td><td class="td02">' + data[i].lc + '</td></tr>';
									html += 			'<tr style="height:3px;"></tr>';
									html += 			'<tr class="t02"><td class="td01">유치업종</td><td class="td02">' + data[i].mvn_biz + '</td></tr>';
									html += 			'<tr style="height:3px;"></tr>';
									html +=				'</table>';
									html += 		'</div>';
									html += 	'</div>';
									html += '</li>';*/
								
								html += '<li id="industry_'+i+'">';
								html += 	'<div class="rela">';
								html += 		'<div class="img">';
								if(data[i].complex_type == '1'){
									html += 			'<span class="c04">국가</span>';
								}else if(data[i].complex_type == '2'){
									html += 			'<span class="c02">일반</span>';
								}else if(data[i].complex_type == '3'){
									html += 			'<span class="c03">도시<br />첨단</span>';
								}else if(data[i].complex_type == '4'){
									html += 			'<span class="c01">농공</span>';
								}
								
								html += 		'</div>';
								html += 		'<div class="txt">';
								html += 			'<p class="t01">'+data[i].complex_nm+'</p>';
								html += 			'<p class="t02"><span>사업 시행자</span>'+data[i].implementer_mgmt_inst+'</p>';
								html += 			'<p class="t02"><span>위치</span> '+data[i].lc+'</p>';
								html += 			'<p class="t02"><span>유치업종</span> '+data[i].mvn_biz+'</p>';
								html += 	'</div>';
								html += '</li>';
								
								//2017.09.30 개발팀 수정 종료
							}
							$(".industryLists").append(html);
							
							//마커생성
							var tmpMarkerGroup = sop.featureGroup();
							map.gMap.addLayer(tmpMarkerGroup)
							
							var iconUrl, iconSize, iconAnchor, infoWindowAnchor;
							for (var p in tmpData) {
								for(var i=0; i<tmpData[p].length; i++) {
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
									
									var marker = sop.marker([ tmpData[p][i].x_coor, tmpData[p][i].y_coor ], {
										icon: markerIcon
									});
									
									var marker_no = (parseInt(p)*pageSize) + (i-pageSize);
									marker.info = tmpData[p][i];
									marker.no = marker_no;
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
/*									html +=						"<tr>";
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
									
									$technicalBizMap.ui.industryMarkerGroup = [];
									$technicalBizMap.ui.industryMarkerGroup.push(tmpMarkerGroup);
									$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["marker"] = tmpData;
								}
							}
						}
						
						$technicalBizDataBoard.ui.setReportData(
								"industry", 
								"indutryMarker", 
								result.community_list, 
								$technicalBizDataBoard.ui.map_id);
						
						if (options.callback != null && options.callback instanceof Function) {
							options.callback.call(undefined, res);
						}
						
						break;
					case -401:
						accessTokenInfo(function() {
							$technicalBizDataBoardApi.request.industryList(options.type, options.options, options.callback);
						});
						break;
					case -100:
						break;
					default:
						break;
				}
			},
			onFail : function(status, options) {
			}
		});
	}());
	/** 산업단지 목록 조회 end */	
	
	/** ********* 산업단지 내 기술업종 증감현황 꺽은선 차트 조회 Start ********* */
	(function() {
		$class("sop.portal.industryVariationStateLineChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				switch (parseInt(res.errCd)) {
					case 0:
						var result = res.result.chartData;						
						var titleTxt = '';
						var nameTxt = '';
						var valueSuffixTxt ='';
						var categoriesArr = [];
						var dataArr = [];
						
						$("#industryTimeseriesOrigin").html("출처 : 전국사업체조사("+companyDataYear+")");
						
						switch (parseInt(options.type)) {
							case 1:
								titleTxt = '사업체 수(개)';
								nameTxt = '사업체';
								valueSuffixTxt = '개'
								break;
							case 2:
								titleTxt = '종사자 수(명)';
								nameTxt = '종사자';
								valueSuffixTxt = '명';
								break;
							default:
								break;
						}

						//시계열 설정
						for (var i = 0; i < result.length; i ++) {
							categoriesArr.push(result[i].base_year);
							switch (parseInt(options.type)) {
								case 1:
									dataArr.push(Number(result[i].corp_cnt));
									break;
								case 2:
									dataArr.push(Number(result[i].worker_cnt));
									break;
							}
						}
						
						industryVariationStateLineChart_fnc(titleTxt, nameTxt, valueSuffixTxt, categoriesArr, dataArr);	
						
						$technicalBizDataBoard.ui.setReportData(
								"industry", 
								"industryVariationStateLineChart", 
								result, 
								$technicalBizDataBoard.ui.map_id);
						break;
					case -100:
						break;
					default:
						break;
				}
				$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["curInfo"] = {
						complex_no : options.complex_no,
						complex_nm : options.complex_nm
				};
			},
			onFail : function(status, options) {
				$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["curInfo"] = {
						complex_no : options.complex_no,
						complex_nm : options.complex_nm
				};
			}
		});
	}());
	/** ********* 산업단지 내 기술업종 증감현황 꺽은선 차트 조회 End ********* */
	
	/** ********* 산업단지 내 기술업종 분포현황 방사형 차트 조회 Start ********* */
	(function() {
		$class("sop.portal.industryDistributionStateRadialShapeChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result.chartData;
						var categoriesArr = ["첨단기술", "ICT", "창의 및 디지털", "전문서비스", "저기술", "중기술", "고기술"];
						var dataArr1 =  [5, 5, 5, 5, 5, 5, 5];
						var dataArr2 = [];
						var name1 = '산업단지 평균';
						var name2 = options.complex_nm;
						
						$("#industryShapeChartLegend").html(name2);

						if (result[0]){
							dataArr2.push(Number(result[0].uptode_tech));
							dataArr2.push(Number(result[0].ict));
							dataArr2.push(Number(result[0].orgidea_dgtl));
							dataArr2.push(Number(result[0].spclty_srv));
							dataArr2.push(Number(result[0].low_tech));
							dataArr2.push(Number(result[0].mid_tech));
							dataArr2.push(Number(result[0].high_tech));
						}
						industryDistributionStateRadialShapeChart_fnc(categoriesArr, name1, name2, dataArr1, dataArr2);
						
						$technicalBizDataBoard.ui.setReportData(
								"industry", 
								"industryDistributionStateRadialShapeChart", 
								result, 
								$technicalBizDataBoard.ui.map_id);
						
						break;
					case -100:
						break;
					default:
						break;
				}
			},
			onFail : function(status, options) {
			}
		});
	}());
	/** ********* 산업단지 내 기술업종 분포현황 방사형 차트 조회 End ********* */
	
	/** ********* 산업단지 내 기술업종 상세현황 막대차트 조회 Start ********* */
	(function() {
		$class("sop.portal.industryDetailStateBarChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result.chartData;
						var categoriesArr = [];
						var dataArr1 = [];
						var dataArr2 = [];
						var name1 = '산업단지 평균';
						var name2 = options.complex_nm;
						
						var totalCnt = 0;
						for (var i = 0; i < result.length; i ++) {
							categoriesArr.push(result[i].techbiz_s_class_cd_nm);
							dataArr1.push(Number(result[i].corp_avg));
							dataArr2.push(Number(result[i].corp_cnt));
							totalCnt += parseInt(result[i].corp_cnt);
						}
						
						var title = "";
						for (var i=1; i<=7; i++) {
							if ($("#industryDetailStateTab_Btn0"+i).hasClass("on")) {
								title = $("#industryDetailStateTab_Btn0"+i).html()
								break;
							}
						}
						
						title += " 사업체수 : "+totalCnt+" (개)";
						$("#industryDetailInfoUpperTitle").html(title);
						$("#industryDetailInfoLegend").html(name2);
						
						var chartHeight = result.length * 40;
						$('#industryDetailStateChart').attr("height", chartHeight); 
						industryDetailStateBarChart_fnc(categoriesArr, name1, name2, dataArr1, dataArr2, chartHeight);
						
						$technicalBizDataBoard.ui.setReportData(
								"industry", 
								"industryDetailStateBarChart", 
								result, 
								$technicalBizDataBoard.ui.map_id);
						
						break;
					case -100:
						break;
					default:
						break;
				}
				$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["curInfo"] = {
						complex_no : options.complex_no,
						complex_nm : options.complex_nm
				};
			},
			onFail : function(status, options) {
				$technicalBizDataBoard.ui.mapData[$technicalBizDataBoard.ui.map_id].options["curInfo"] = {
						complex_no : options.complex_no,
						complex_nm : options.complex_nm
				};
			}
		});
	}());
	
	/** ********* 산업단지 내 주요시설 현황 막대차트 조회 Start ********* */
	(function() {
		$class("sop.portal.industryImportantFacilityStateBarChartDraw.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result.chartData;
						var categoriesArr = ['공공기관', '금융기관', '대학', '창업지원센터'];
//						var categoriesArr = ['공공기관', '교통시설', '금융기관', '대학', '창업지원센터'];
						var dataArr1 = [];
						var dataArr2 = [];
						var name1 = options.complex_nm;
						var name2 = '산업단지 평균';
						
						$("#industryImportantFacilityLegend").html(name1);
						
						for (var i = 0; i < result.length; i ++) {
							if("cnt" == result[i].type){
								dataArr1.push(Number(result[i].pub_inst));
								// 2017. 03. 23 오류수정
								//dataArr1.push(Number(result[i].transport_fac));
								dataArr1.push(Number(result[i].fnnc_inst));
								dataArr1.push(Number(result[i].univ));
								dataArr1.push(Number(result[i].found_support_fac));
								
							}else if("avgCnt" == result[i].type){
								dataArr2.push(Math.round(Number(result[i].pub_inst) * 10) / 10);
								// 2017. 03. 23 오류수정
								//dataArr2.push(Math.round(Number(result[i].transport_fac) * 10) / 10);
								dataArr2.push(Math.round(Number(result[i].fnnc_inst) * 10) / 10);
								dataArr2.push(Math.round(Number(result[i].univ) * 10) / 10);
								dataArr2.push(Math.round(Number(result[i].found_support_fac) * 10) / 10);
							}
						}
						industryImportantFacilityStateBarChart_fnc(categoriesArr, name1, name2, dataArr1, dataArr2);
						
						$technicalBizDataBoard.ui.setReportData(
								"industry", 
								"industryImportantFacilityStateBarChart", 
								result, 
								$technicalBizDataBoard.ui.map_id);
						
						break;
					case -100:
						break;
					default:
						break;
				}
			},
			onFail : function(status, options) {
			}
		});
	}());
	/** ********* 산업단지 내 주요시설 현황 막대차트 조회 End ********* */
	
	/** ********* 지원시설 지역종합상세정보 조회(사업체/종사자) 영역 Start ********* */
	(function() {
		$class("sop.portal.detailRegionInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result;
						var regionInfo = result.regionInfo;
						var perInfo = result.perInfo;
						
						if (regionInfo == null || regionInfo == undefined) {
							return;
						}
 						
						for (var p in perInfo) {
							regionInfo[p] = perInfo[p];
						}
						
						switch(options.params.menuType) {
							case "supply":	//지원시설
								supplyAreaSynthesizeStatsTitleData_fnc(regionInfo);
								break;
							case "industry": //산업단지
								industryAreaSynthesizeStatsTitleData_fnc(regionInfo);
								break;
						}						
						break;
					case -100:
						break;
					default:
						break;
				}
			},
			onFail : function(status, options) {
			}
		});
	}());
	/** ********* 지원시설 지역종합상세정보 조회(사업체/종사자) 영역 End ********* */
	
	//2017.10.20 개발팀 추가
	/** ********* 업종 밀집도 년도별 데이터 차트 Start ********* */
	(function() {
		$class("sop.portal.lqInfoYearDataBoardGrid.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result;
						
						var id = "#lqColumCharts02";
						var charts = $(id).highcharts();
						if(options.adm_cd.length == 2){
							var featureData = result.featureData;
							var yearList = new Array();
							var companyLqList = new Array();
							var workerLqList = new Array();
							
							var colorList = [];
							
							var adm_nm = "";
							var adm_cd = "";
							
							for(var i = 0; i < featureData.length; i++){
								yearList.push(featureData[i].base_year);
								companyLqList.push(Number(featureData[i].country_vs_corp_lq));
								workerLqList.push(Number(featureData[i].country_vs_worker_lq));
							}
							
							
							if(featureData[0].adm_cd.length == 2){
								adm_nm = featureData[0].sido_nm;
								adm_cd = featureData[0].adm_cd;
							}

							
							//addCategory
							charts.xAxis[0].update({categories:yearList,crosshair: true},true);
							
							//addSeries
							charts.addSeries({
								 name: adm_nm + ' 사업체',
						         type: '',
						         data: companyLqList,
						         tooltip: {
						             valueSuffix: 'LQ'
						         }
							});
							
							charts.addSeries({
								name: adm_nm + ' 종사자',
					            type: '',
					            data: workerLqList,
					            tooltip: {
					                valueSuffix: 'LQ'
					            }
							});
							
							//lqChartCheckZone
							var html = "";
							
							html +=	'<div class="chtChkArea">';
							html +=		'<a id="ckbtn_0" href="javascript:$technicalBizDataBoard.ui.lqColumnHide(0,1);" class="ckbtn on">';
							html +=			'<span class="ico"></span>';
							html +=			'<span class="txt">'+adm_nm+'</span>';
							html +=		'</a>';
							html +=		'<div class="item i01">사업체</div>';
							html +=		'<div class="item i02">종사자</div>';
							html +=	'</div>';
							
							$("#lqChartCheckZone").html(html);
							
						}else{
							//시군구에 대한 데이터 뿌려주기
							var featureData = result.featureData;
							/*var yearList = new Array();*/
							var companyLqList = new Array();
							var workerLqList = new Array();
							
							var colorList = [];
							
							var adm_nm = "";
							var adm_cd = "";
							
							for(var i = 0; i < featureData.length; i++){
								/*yearList.push(featureData[i].base_year);*/
								companyLqList.push(Number(featureData[i].country_vs_corp_lq));
								workerLqList.push(Number(featureData[i].country_vs_worker_lq));
							}
							
							adm_nm = featureData[0].sgg_nm;
							adm_cd = featureData[0].adm_cd;
							
							
							//addCategory
							/*charts.xAxis[0].update({categories:yearList,crosshair: true},true);*/
							
							//addSeries
							charts.addSeries({
								 name: adm_nm + ' 사업체',
						         type: '',
						         data: companyLqList,
						         tooltip: {
						             valueSuffix: 'LQ'
						         }
							});
							
							charts.addSeries({
								name: adm_nm + ' 종사자',
					            type: '',
					            data: workerLqList,
					            tooltip: {
					                valueSuffix: 'LQ'
					            }
							});
							
							//lqChartCheckZone
							var html = "";
							
							html +=	'<div class="chtChkArea">';
							html +=		'<a id="ckbtn_2" href="javascript:$technicalBizDataBoard.ui.lqColumnHide(2,3);" class="ckbtn on">';
							html +=			'<span class="ico"></span>';
							html +=			'<span class="txt">'+adm_nm+'</span>';
							html +=		'</a>';
							html +=		'<div class="item i03">사업체</div>';
							html +=		'<div class="item i04">종사자</div>';
							html +=	'</div>';
							
							$("#lqChartCheckZone").append(html);
							
						}
						
						
						if (options.callback != null && options.callback instanceof Function) {
							options.callback.call(undefined, res);
						}
						
						break;
					case -100:
						break;
					default:
						break;
				}
			},
			onFail : function(status, options) {
			}
		});
	}());
	/** ********* 업종 밀집도 년도별 데이터 차트 end ********* */
	
	//2017.10.24 개발팀 추가
	/** ******** 기술업종 코드 조회 Start ******** */
	(function(){
		$class("sop.portal.getInnerTechCd.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options){
				
				var techCdList = res.result.techCdList;
				var id = options.params.id
				$("#"+id).empty();
				console.log(res);
//							"	<td>" + techCdList[i].s_class_cd + "</td>" +
				for(var i=0; i<techCdList.length; i++){
					if(i==0){
						if(id == "subTechnicalList"){
							$("#"+id).append('<li id="subTechnicalList_00"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfo(\''+options.params.m_class_cd+'\')" >전체현황</a></li>');
						}else{
							$("#"+id).append('<li id="subTechnicalYearList_00"><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(\''+options.params.m_class_cd+'\')" >전체현황</a></li>');
						}
					}
					if(id == "subTechnicalList"){
						$("#"+id).append('<li id=\'subTechnicalList_'+techCdList[i].s_class_cd+'\'><a href="javascript:$technicalBizDataBoard.ui.changeLqInfo(\''+techCdList[i].s_class_cd+'\')" >'+  techCdList[i].s_class_nm +'</a></li>');
					}else{
						$("#"+id).append('<li id=\'subTechnicalYearList_'+techCdList[i].s_class_cd+'\'><a href="javascript:$technicalBizDataBoard.ui.changeLqInfoYearDataBoardGrid(\''+techCdList[i].s_class_cd+'\')">'+  techCdList[i].s_class_nm +'</a></li>');
					}
				}
				
				var mClassCd = options.params.m_class_cd
				if(mClassCd.toString().length == 2){
					$("#"+id+"_00 > a").addClass("on");
				}else{
					$("#"+id+"_"+mClassCd+" > a").addClass("on");
				}
				
			}
		});
	}());
	
	/** ******** 기술업종 코드 조회 End ******** */
	//2017.10.24 개발팀 추가 종료
	
	//2017.10.20 개발팀 추가 종료
	function technicalBizPercentPieChart_fnc(id, name, dataArr, legendArr){
		console.log(name);
		console.log(dataArr);
		var colors = ['#ffc622', '#e8771a', '#019878', '#017967', '#2cd35b', '#40694e', '#f11d77', '#60391b', '#ae097c', '#98f714', '#6878d3'];
		
		$('#'+id).highcharts({
	        chart: {
	            type: 'pie', width:170,height:170, margin:[20,0,0,0]
	        },
	        colors: colors, 
	        title: { text: '' },
	        exporting: { enabled: false },
	        tooltip: { enabled: true },
	        tooltip: {
				shared : true,
				valueDecimals: 2,
				formatter: function () {
					var html = "";
					var symbol = '●';
					html += "<span style='font-size:7px;'>" + name +  "</span><br>";
					html += '<span style="color:' + this.point.color + '">' + symbol + '</span>';
					html += ' ' + this.point.name + ': <b>' + appendCommaToNumber(this.point.y) + '</b>';
					return html;
                }
	        },
	        
	        plotOptions: {
	            pie: {
	                allowPointSelect: false, cursor: 'pointer', depth: 50,
	                dataLabels: { enabled: false },
	                borderWidth:0
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: name,
	            data: dataArr 
	        }]
	    });
		
		var legend = '<div class="valuebox">';

		//차트  범례
		for(var i=0; i<4; i++){
			if( r = dataArr[i] ){
				if(i%2 == 0 && i != 0){
					legend += '</div>';
					legend += '<div class="valuebox">';
				}
				
				legend += '	<div class="values"> ';
				legend += '		<div class="title"> ';
				legend += '			<span class="icon" style="background-color: '+colors[i]+';"></span>';
				legend += '			<span class="text">' + legendArr.legendData[i].legendNm + '</span> ';
				legend += '		</div> ';
				legend += '		<div class="val" style="float:left;width:62px;">';
				legend += '			<p class="t01">' + legendArr.legendData[i].legendPer + '%</p>';
//				legend += '			<p class="t02">' + appendCommaToNumber(legendArr.legendData[i].legendCnt) + '개</p>';
				legend += '			<p class="t02">' + legendArr.legendData[i].legendCnt + legendArr.legendData[i].legendUnit+'</p>'; //2017.03.24 천단위 콤마 중복 삭제
				legend += '		</div>';
				legend += '	</div> ';
			}
		}
		legend += '</div>';
		
		var hideable = '';
		if(dataArr.length > 4){
			hideable += '<br/><p class="btn-more"><a href="javascript:$(\'#' + id + 'Div .hideable\').slideToggle()">더보기..</a></p>';
			hideable += '<div class="typelabel hideable" style="height: auto;">';
			for(var i=4; i<dataArr.length; i++){
				if( r = dataArr[i] ){
					if(i != 4 && i%2 == 0){
						hideable += '</div>';
						hideable += '<div class="valuebox">';
					}else if(i == 4){
						hideable += '<div class="valuebox">';
					}
					hideable += '<div class="values">';
					hideable += '	<div class="title">';
					hideable += '		<span class="icon" style="background-color:' + colors[i] + ';"></span>';
					hideable += '		<span class="text">' + legendArr.legendData[i].legendNm + '</span>';
					hideable += '	</div>';
					hideable += '	<div class="val" style="float:left;width:62px;">';
					hideable += '		<p class="t01">' + legendArr.legendData[i].legendPer + '%</p>';
					hideable += '		<p class="t02">' + legendArr.legendData[i].legendCnt + legendArr.legendData[i].legendUnit+ '</p>'; //2017.03.24 천단위 콤마 중복 삭제
					hideable += '	</div>';
					hideable += '</div>';
				}
			}
			hideable += '	</div>'; // valuebox
			hideable += '</div>'; // typelabel
		}
		
		$("#"+id).next(".typelabel").empty();
		$("#"+id).next(".typelabel").append('<p class="txtSubj">' + legendArr.legendTitleNm + '<p>');
		$("#"+id).next(".typelabel").append(legend);
		$("#"+id).next(".typelabel").append(hideable);
	}
	/** 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 비율 pieCharts end */
	
	function majorFacilityBarChart_fuc(id, dataArr){
		$("#"+id).highcharts({
			chart : {type : 'column' },
			title : {text : ''	 },
			exporting : { enabled: false },
			colors: ['#ffc622'],
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
				min : 0, title : { text : '지원시설 수(개)' },
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
	}
	/** 지원시설/산업단지 조회 - 주요지원시설 현황 barCharts end */	
	
	function industryDistributionStateRadialShapeChart_fnc(categoriesArr,  name1, name2, dataArr1, dataArr2){
		$("#industryDistributionStateChart").highcharts({ 
	        chart: { polar: true, type: 'line', margin:[0,60,0,60] },
	        colors: ["#f7c200", "#0067c6"],
	        title: {
	            text: ''
	        }, 
	        exporting : { enabled: false },
	        pane: { size: '70%' }, 
	        xAxis: {
	            categories: categoriesArr,
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
	        series: [{
	        	type: 'line',
	        	name: name1,
	            data: dataArr1
	        }, {
	        	type: 'line',
	        	name: name2,
	            data: dataArr2
	        }] 
	    });
	}
	/** 산업단지 내 기술업종 분포현황 방사형 차트 조회 end */	
	
	function industryDetailStateBarChart_fnc(categoriesArr, name1, name2, dataArr1, dataArr2, chartHeight){
		$('#industryDetailStateChart').highcharts({
	        chart: {
	            type: 'bar', width:500, marginLeft:270, height : chartHeight
	        },
	        colors: ['#f7c800','#1778cc'], tooltip: { enabled: true },
	        title: { text: '' },
	        exporting : { enabled: false },
	        subtitle: { text: '' },
	        xAxis: {
	            categories: categoriesArr,
	            title: { text: null },
	            labels: {
	                align: 'left', x:-270
	            }
	        },
	        yAxis: {
	            min: 0, title: { text: '', align: 'left' },
	            labels: { overflow: 'justify', enabled: true }
	        }, 
	        plotOptions: { 
	        	bar: {
	                dataLabels: { enabled: false }
	            }
	        },
	        legend: { enabled: false },
	        credits: {  enabled: false },
	        series: [
	            {
	            	pointWidth: 12,
	            	name: name1,
	            	data: dataArr1
	        	},
	        	{
	        		pointWidth: 12,
	        		name: name2,
	            	data: dataArr2
	        	}
	        ]
	    });
	}
	/** 산업단지 내 기술업종 상세현황 막대차트 조회 end */	
	
	function industryImportantFacilityStateBarChart_fnc(categoriesArr, name1, name2, dataArr1, dataArr2){
		$('#industryImportantFacilityStateChart').highcharts({
	        chart: { zoomType: 'xy' },
	        colors: ['#1778cc', '#ffc622'],
	        title: { text: '' },
	        exporting : { enabled: false },
	        subtitle: {
	            text: ''
	        },
	        xAxis: [{
	            categories: categoriesArr,
	            crosshair: true
	        }],
	        yAxis: [{ // Primary yAxis
	            labels: {  },
	            title: {
	                text: '지원시설 수(개)',
	                style: {
	                    color: Highcharts.getOptions().colors[1]
	                }
	            }
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
	            opposite: true
	        }],
	        tooltip: {
	            shared: true
	        },
	        legend: {
	        	enabled : false
	        },
	        series: [
	                 {
			            name: name1,
			            type: 'column',
			            pointWidth: 40,
			            yAxis: 1, 
			            zIndex:2,
			            data: dataArr1,
			            tooltip: {
			                valueSuffix: ' 개'
			            }
	                 }
	                 , 
	                 {
			            name: name2,
			            type: 'column',
			            pointWidth: 40,
			            yAxis: 1,
			            zIndex:1,
			            data: dataArr2,
			            tooltip: {
			                valueSuffix: ' 개'
			            }
			        }
		           ]
	    });
	}
	/** 산업단지 내 주요시설 현황 막대차트 조회 end */	
	
	/** ********* [지원시설 조회 - 지역통계 현황], [산업단지 조회 - 전국 시도별 현황] barCharts fnc Start ********* */
	function 	areaStateBarChart_fnc(id, colors, xAxis, name, data, reversed){
		$('#'+id).highcharts({
	        chart: {
	            type: 'bar', width:200, height:460, marginLeft:0
	        },
	        colors: colors,
	        tooltip: { enabled: true },
	        title: { text: '' },
	        exporting : { enabled: false },
	        subtitle: { text: '' },
	        xAxis: xAxis,
	        yAxis:[ 
		        {  
		        	gridLineWidth:1,
		        	min: 0, title: { text: ''},
		            labels: { style:{textOverflow:'none'} },
		            reversed: reversed  
		        },
		        {
		        	gridLineWidth:1,
		        	min: 0, title: { text: ''},
		        	labels: { y:0, style:{textOverflow:'none'} },
		            reversed: reversed,  
		        	opposite: true 
		        }		 
	        ], 
	        plotOptions: {
	        	series: {
	                states: {  }
	            },
	        	bar: {
	                dataLabels: { enabled: false }
	            }
	        },
	        legend: { enabled: false },
	        credits: {  enabled: false },
	        series: [{
	        	pointWidth: 15,
	            name: name,
	            data: data
	        },
	        {
	        	/*차트 디자인땜에 생성 데이터 동일하게 넣어야함 */
	        	pointWidth: 0,
	            name: name,
	            data: data,
	            yAxis:1
	        }]
	    });
		
	}
	/**  [지원시설 조회 - 지역통계 현황], [산업단지 조회 - 전국 시도별 현황] barCharts fnc End */
	
	function startUpSupplyBarChart_fnc(categoriesArr, dataArr){
		$('#startUpSupplyBarChart01').highcharts({
	        chart: {
	            type: 'bar', width:530, height:460 , margin:[0,0,0,100]
	        },
	        colors: ['#444b5b', '#ffffff'], 
	        tooltip: { enabled: true },
	        title: { text: '' },
	        exporting : { enabled: false },
	        subtitle: { text: '' },
	        xAxis: {
	        	gridLineWidth:0,
	        	lineWidth:0,
	        	categories: categoriesArr,
	            title: { text:'', align: 'center' },
	            labels: {
	                align: 'center', x: -60
	            }
	        },
	        yAxis:[ 
		        {  
		        	gridLineWidth:1, 
		        	min: 0, title: { text: ''},
		            labels: { overflow: 'justify' }
		        },
		        {
		        	gridLineWidth:1, 
		        	min: 0, title: { text: ''},
		            labels: { overflow: 'justify', y:0 },
		        	opposite: true 
		        }		 
	        ],
	        plotOptions: {
	        	series: {
	                states: {  }
	            },
	        	bar: {
	                dataLabels: { enabled: false }
	            }
	        },
	        legend: { enabled: false },
	        credits: {  enabled: false },
	        series: [
		        {
		        	pointWidth: 15,
		            name: '',
		            data: dataArr
		        },
		        {
		        	/*차트 디자인땜에 생성 데이터 동일하게 넣어야함 */
		        	pointWidth: 0,
		            name: '',
		            data: dataArr,
		            yAxis:1
		        }
	        ]
	    });
		
	}
	/** 지원시설 조회 - 창업지원시설 현황 barCharts end */
	
	
	function technicalBizCntBarChart_fnc(id, categoriesArr, name1, dataArr1, name2, dataArr2, chartHeight){
		$('#'+id).highcharts({
	        chart: {
	            type: 'bar', width:500, marginLeft:270, height : chartHeight
	        },
	        colors: ['#f7c800','#1778cc'], tooltip: { enabled: true },
	        title: { text: '' },
	        exporting: { enabled: false },
	        subtitle: { text: '' },
	        xAxis: {
	            categories: categoriesArr,
	            title: { text: null },
	            labels: {
	                align: 'left', x:-270
	            }
	        },
	        yAxis: {
	            min: 0, title: { text: '', align: 'left' },
	            labels: { overflow: 'justify', enabled: true }
	        }, 
	        plotOptions: { 
	        	bar: {
	                dataLabels: { enabled: false }
	            }
	        },
	        legend: { enabled: false },
	        credits: {  enabled: false },
	        series: [
	            {
	            	pointWidth: 12,
	            	name: name1,
	            	data: dataArr1
	        	},
	        	{
	        		pointWidth: 12,
	        		name: name2,
	            	data: dataArr2
	        	}
	        ]
	    });
	}
	/** 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 수 barCharts end */	
	
	
	
	function technicalBizVariateLineChart_fnc(id, categoriesArr, title, name, dataArr){
		$('#'+id).highcharts({
			chart: { zoomType: 'xy' },
	        colors: ['#1778cc'],
	        title: { text: '' },
	        exporting: { enabled: false },
	        subtitle: {
	            text: ''
	        },
	        xAxis: [{
	            categories: categoriesArr,
	            crosshair: true
	        }],
	        yAxis: [{ // Secondary yAxis
	            title: {
	                text: title
	            },
	            labels: {
	            	enabled : false 
	            }
	        }],
	        tooltip: {
	            shared: true
	        },
	        legend: {
	        	enabled : false
	        },
	        series: [{
	            name: name,
	            type: '',
	            data: dataArr,
/*	            tooltip: {
	                valueSuffix: '%'
	            }*/
	        }]
	    });
	}
	/** 지원시설/산업단지 조회 - 기술업종별 사업체/종사자 증감 lineCharts end */	
	
	/** *********검색 지역 상세 보기  ********* */
	(function() {
		$class("sop.openApi.searchDetailAreaSggCnt").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						console.log(res);
						console.log(options);
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result[0];
								$("#technicalSearch").hide();
								$("#technicalSearchDetail").show();
								$("#standardButton").show();
								if($("#standardButton").hasClass("off")){
									$("#searchDetailStatsInfoTab01_Btn01").hide();
									$("#searchDetailStatsInfoTab01_Btn02").show();
									$("#totalSearchWorkerCnt").text(result.worker_cnt + "(명)");
								}else{
									$("#searchDetailStatsInfoTab01_Btn01").show();
									$("#searchDetailStatsInfoTab01_Btn02").hide();
									$("#totalSearchCorpCnt").text(result.corp_cnt + "(개)");
								}
								
								
								$("#technicalSearchAdmNm").text(result.adm_nm);
								$technicalBizMap.ui.doGetSggSearchDetailInfo(options.adm_cd,options.adm_nm,options.map.id,options.x,options.y);
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());	
	/** *********검색 지역 상세 보기 end  ********* */
	
	/** *********검색 지역 detail 보기  ********* */
	(function() {
		$class("sop.portal.searchDetailPerInfoObj").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						console.log(res);
						console.log(options);
						switch(parseInt(res.errCd)) {
							case 0:
								//searchTechbizAvgTxt
								//supplyWorkerAvgTxt
								
								var worker_cnt = res.result.regionInfo.worker_cnt;
								var corp_cnt = res.result.regionInfo.corp_cnt;
								var industry_cnt = res.result.perInfo.industry_cnt;
								var supply_cnt = res.result.perInfo.supply_cnt;
								
								var corptxt = ""
								var workertxt = ""
								if(industry_cnt == 0 ){
									corptxt = appendCommaToNumber(Math.floor(corp_cnt)) + "개당  0개소" ;
									workertxt = appendCommaToNumber(Math.floor(worker_cnt)) + "개당  0개소" ;
								}else{
									corptxt = appendCommaToNumber(Math.floor(corp_cnt/industry_cnt)) + "개당  1개소" ;
									workertxt = appendCommaToNumber(Math.floor(worker_cnt/industry_cnt)) + "개당  1개소" ;
								}
								$("#searchTechbizAvgTxt").text(corptxt);
								$("#supplyWorkerAvgTxt").text(workertxt);
								
								
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());	
	/** *********검색 지역 detail 보기 end  ********* */
	
	/** *********검색 지역 상세 보기 chart ********* */
	(function() {
		$class("sop.portal.searchDetailAreaTechnical").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						$("#searchDetailInfoTab03").show();
						switch(parseInt(res.errCd)) {
							case 0:
								//사업체 , 종사자
								//비율
								//증감
								//입지계수
								
								
								//corp_cnt
								//corp_per
								//techbiz_m_class_cd_nm
								//techbiz_s_class_cd_nm
								//techbiz_s_class_cd
								//worker_cnt
								//worker_per
								
								$(".searchDetailStatsInfoTab02").removeClass("on");
								$("#searchDetailStatsInfoTab02_Btn0"+options.type01).addClass("on");
								$(".searchDetailStatsInfoTab03").removeClass("on");
								$("#searchDetailStatsInfoTab03_Btn0"+options.type03).addClass("on");
								$(".searchDetailStatsInfoChart").hide();
								
								if($("#standardButton").hasClass("off")){
									$(".searchDetailStatsInfoTab02").attr("style" ,"background : #1778cc" );
									$(".searchDetailSynthesizeStatsInfo02_type").text("종사자");
								}else{
									//사업체수
									$(".searchDetailStatsInfoTab02").attr("style" ,"background : #e05858" );
									$(".searchDetailSynthesizeStatsInfo02_type").text("사업체");
								}
								
								switch(parseInt(options.type01)){
									case 1 :
										
										$("#searchDetailStatsInfo01Div").show();
										var unit, showName, tagName, showData = [];
										var chartData = res.result.chartData;
										
										var id = "searchDetailStatsInfoChart01";
										showName = "수";
										showData = ["corp_cnt", "worker_cnt"];
										unit = "(개)";
										var upperAdmNm = options.adm_nm.split(" ")[0];
										var curAdmNm = options.adm_nm;
										
										var corpDataArr1 = new Array();
										var corpDataArr2 = new Array();
										
										var workerDataArr1 = new Array();
										var workerDataArr2 = new Array();
										var chartHeight = chartData.length * 40;
										var categoriesArr = new Array();
										for(var i = 0; i < chartData.length; i++){
											categoriesArr.push(chartData[i].techbiz_s_class_cd_nm);
											
											corpDataArr1.push(Number(chartData[i].corp_cnt));
											corpDataArr2.push(Number(chartData[i].upper_corp_cnt));
											
											workerDataArr1.push(Number(chartData[i].worker_cnt));
											workerDataArr2.push(Number(chartData[i].upper_worker_cnt));
											
										}
										
										if($("#standardButton").hasClass("off")){
											technicalBizCntBarChart_fnc(id, categoriesArr, curAdmNm, workerDataArr1, upperAdmNm, workerDataArr2, chartHeight);
										}else{
											technicalBizCntBarChart_fnc(id, categoriesArr, curAdmNm, corpDataArr1, upperAdmNm, corpDataArr2, chartHeight);
										}
										
										/*technicalBizCntBarChart_fnc(id, categoriesArr, curAdmNm, dataArr1, upperAdmNm, dataArr2, chartHeight);*/
										
										
									break;
									
									case 2 : 
										$("#searchDetailStatsInfoChart02Div").show();
										var chartData = res.result.chartData;
										var id = "searchDetailStatsInfoChart02";
										var legendTitleNm = "기술업종 정보" 
										var dataArr = [];
										
										if(options.type03 != "0"){
											if(chartData[0]) {
												legendTitleNm = chartData[0].techbiz_m_class_cd_nm+"업종 정보";
											}
										}
										
										var legendArr = {
												legendTitleNm : legendTitleNm,
												legendData : []
										};
										for(var i = 0; i < chartData.length; i++){
											var tempData = [];
											tempData.push(chartData[i].techbiz_s_class_cd_nm);
											if(!$("#standardButton").hasClass("off")){	//사업체
													tempData.push(parseFloat(chartData[i].corp_per));
													legendArr.legendData.push({
														legendNm : chartData[i].techbiz_s_class_cd_nm,
														legendPer : chartData[i].corp_per,
														legendCnt : appendCommaToNumber(chartData[i].corp_cnt),
														legendUnit : "개"}); //2017.03.24
											}else{	//종사자
													tempData.push(Number(chartData[i].worker_per));
													legendArr.legendData.push({
														legendNm : chartData[i].techbiz_s_class_cd_nm,
														legendPer : chartData[i].worker_per,
														legendCnt : appendCommaToNumber(chartData[i].worker_cnt),
														legendUnit : "명"}); //2017.03.24
											}
											dataArr.push(tempData);
										}
										
										//technicalBizPercentPieChart_fnc(id, name, dataArr, legendArr);
										technicalBizPercentPieChart_fnc(id, options.adm_nm, dataArr, legendArr);
										
									break;
									
									case 3 : 
										$("#searchDetailStatsInfoChart03Div").show();
										var id = "searchDetailStatsInfoChart03";
										
										var chartData = res.result.chartData;
										var techRate = res.result.techRate;
										var techNm = "";
										var upperTechTite = "";
										var origin = "";
										var unit, showName, tagName, showData = [];
										
										showName = "증감";
										showData = ["corp_irdsrate" , "worker_irdsrate"];
										unit = " (%)";
										
										var categoriesArr = [];
										var title = "";
										var name = "";
										
										if(!$("#standardButton").hasClass("off")){
											title = "사업체 증감(개)";
											name = "기술업종별 사업체 증감";
										}else{
											title = "종사자 증감(명)";
											name = "기술업종별 종사자 증감";
										}
										var dataArr = new Array();
										for(var i = 0; i < chartData.length; i++){
											categoriesArr.push(chartData[i].base_year);
											if(!$("#standardButton").hasClass("off")){	//사업체
												dataArr.push(parseFloat(chartData[i].corp_cnt || 0));
											}else{	//종사자
												dataArr.push(parseFloat(chartData[i].worker_cnt || 0));
											}
										}
										technicalBizVariateLineChart_fnc(id, categoriesArr, title, name, dataArr);
										
										
									break;
								
									case 4 :
										
										$("#searchDetailInfoTab03").hide();
										$("#searchDetailStatsInfoChart04Div").show();
										
										
										$("#searchDetailStatsInfoChart04").highcharts({
											chart: { type: 'bubble', plotBorderWidth: 1, zoomType : 'x' }, //2018.01.15 [개발팀] 줌기능 추가
									        legend: {enabled: false},
									        title: {text: ''},
									        subtitle: {text: ''},
									        xAxis: {
									            gridLineWidth: 1,
									            title: {text: '사업체 LQ'},
									            labels: {
									                format: '{value}'
									            },
									            plotLines: [{
									                color: 'red',
									                dashStyle: 'solid',
									                width: 2,
									                value: 1,
									                label: {
									                    rotation: 0,
									                    y: 15,
									                    style: {
									                        fontStyle: 'italic'
									                    },
									                    text: '종사자'
									                },
									                zIndex: 3
									            }]
									        },

									        yAxis: {
									            startOnTick: false,
									            endOnTick: false,
									            title: {
									                text: '종사자 LQ'
									            },
									            labels: {
									                format: '{value}'
									            },
									            maxPadding: 0.2,
									            plotLines: [{
									                color: 'red',
									                dashStyle: 'solid',
									                width: 2,
									                value: 1,
									                label: {
									                    align: 'right',
									                    style: {
									                        fontStyle: 'italic'
									                    },
									                    text: '사업체',
									                    x: -10
									                },
									                zIndex: 3
									            }]
									        },

									        tooltip: {
									        	//2018.01.22 [개발팀] 툴팁로직 변경
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
						                                style:{
						                                   color:"#000",
						                                   textOutline : "0px"
						                                }
						                            }
						                        }
						                    },
											
										});
										
										
										
										
										var featureDataList = res.result.featureData;
										var overCorp = new Array();
										var workerCorp = new Array();
										
										$("#searchDetailLctCorpTextAdmNm").text(options.adm_nm);
										$("#searchDetailLctWorkerTextAdmNm").text(options.adm_nm);
										
										var techClass = {
												11 : "c01",
												12 : "c02",
												13 : "c03",
												14 : "c04",
												21 : "c05",
												22 : "c06",
												23 : "c07"
										};
										
										var tableHtml = "<table class='pcTable02' id='searchDetailStatsInfoChartTable'>";
										tableHtml +="<tr><td class='addSideLine'>업종명</td><td class='addSideLine'>사업체 입지계수</td><td class='addSideLine'>종사자 입지계수</td></tr>";
										
										for(var i = 0; i < featureDataList.length; i++){
											
											if($("#searchDetailStatsInfoChart04Div >.chartAreaRela >.compareBox > .noneAreaBox > .dbTabs > a").eq(0).hasClass("on")){
												addSeries("#searchDetailStatsInfoChart04",Number(featureDataList[i].country_vs_corp_lq),Number(featureDataList[i].country_vs_worker_lq),featureDataList[i].techbiz_m_class_cd_nm,$technicalBizDataBoardApi.example.colorList[0][i]);
												tableHtml +="<tr><td class='addSideLine'>"+featureDataList[i].techbiz_m_class_cd_nm+"</td><td class='addSideLine'>"+Number(featureDataList[i].country_vs_corp_lq)+"</td><td class='addSideLine'>"+Number(featureDataList[i].country_vs_worker_lq)+"</td></tr>";
												
												if(Number(featureDataList[i].country_vs_corp_lq) >= 1){
													
													var obj = {
															name : featureDataList[i].techbiz_m_class_cd_nm,
															val : Number(featureDataList[i].country_vs_corp_lq),
													}
													overCorp.push(obj);
												}
												
												if(Number(featureDataList[i].country_vs_worker_lq) >= 1){
													var obj = {
															name : featureDataList[i].techbiz_m_class_cd_nm,
															val : Number(featureDataList[i].country_vs_worker_lq),
													}
													workerCorp.push(obj);
												}
											}else{
												addSeries("#searchDetailStatsInfoChart04",Number(featureDataList[i].sido_vs_corp_lq),Number(featureDataList[i].sido_vs_worker_lq),featureDataList[i].techbiz_m_class_cd_nm,$technicalBizDataBoardApi.example.colorList[0][i]);
												tableHtml +="<tr><td class='addSideLine'>"+featureDataList[i].techbiz_m_class_cd_nm+"</td><td class='addSideLine'>"+Number(featureDataList[i].sido_vs_corp_lq)+"</td><td class='addSideLine'>"+Number(featureDataList[i].sido_vs_worker_lq)+"</td></tr>";
												
												if(Number(featureDataList[i].sido_vs_corp_lq) >= 1){
													
													var obj = {
															name : featureDataList[i].techbiz_m_class_cd_nm,
															val : Number(featureDataList[i].sido_vs_corp_lq),
													}
													overCorp.push(obj);
												}
												
												if(Number(featureDataList[i].sido_vs_worker_lq) >= 1){
													var obj = {
															name : featureDataList[i].techbiz_m_class_cd_nm,
															val : Number(featureDataList[i].sido_vs_worker_lq),
													}
													workerCorp.push(obj);
												}
											}
											
										}
										$("#searchDetailLctCorpMclassNm").text('');
										$("#searchDetailLctWorkerMclassNm").text('');
										/*$("#searchDetailLctCorpMclassNm").text(overCorp);
										$("#searchDetailLctWorkerMclassNm").text(workerCorp);*/
										lctArrayWrite(overCorp , "searchDetailLctCorpMclassNm");
										lctArrayWrite(workerCorp,"searchDetailLctWorkerMclassNm");
										tableHtml +="</table>";
										$("#searchDetailStatsInfoChart04_2").html(tableHtml);
									break;								
								}
								
								$("#btnList_1 > ul > li").eq(4).show();
								var map = $technicalBizMap.ui.mapList[$technicalBizMap.ui.curMapId];
								
								
								
								var searchOption = $technicalBizDataBoard.ui.searchOption;
								var searchDataArray = $technicalBizDataBoard.ui.searchDataArray;
								
								
								var reportData = {
										result : res.result,
										dataArray : searchDataArray,
										param : searchOption
								}
								reportData.param.idx = 1;
								reportData.param.subIdx = parseInt(options.type01);
									
								$technicalBizDataBoard.ui.setReportData(
										"search", 
										"", 
										reportData, 
										map.id);
								
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** *********검색 지역 상세 보기  chart end ********* */
	
	
	
	
	
	function supplyAreaSynthesizeStatsTitleData_fnc(titleData){		
		//총사업체수
		$("#totalSupplyCorpCnt").html(appendCommaToNumber(titleData.corp_cnt) + "(개)");
		//총종사자수
		$("#totalSupplyWorkerCnt").html(appendCommaToNumber(titleData.worker_cnt) + "(명)");
		
		//평균지원시설
		var supplyTechbizAvgTxt = "";
		var supplyWorkerAvgTxt = "";
		var supplyResidPpltnAvgTxt = "";

//TODO 결과값 확인				
		if(0 == Number(titleData.supply_cnt)){
			supplyTechbizAvgTxt = "기술업종 " + appendCommaToNumber(titleData.corp_cnt) + "개당 0개소";
			supplyWorkerAvgTxt = "종사자 " + appendCommaToNumber(titleData.worker_cnt) + "명당 0개소";
			supplyResidPpltnAvgTxt = "인구 " + appendCommaToNumber(titleData.resid_ppltn_cnt) + "명당 0개소";
		}else{
			supplyTechbizAvgTxt = "기술업종 " + appendCommaToNumber(Math.floor(titleData.corp_cnt / titleData.supply_cnt)) + "개당 1개소";
			supplyWorkerAvgTxt = "종사자 " + appendCommaToNumber(Math.floor(titleData.worker_cnt / titleData.supply_cnt)) + "명당 1개소";
			supplyResidPpltnAvgTxt = "인구 " + appendCommaToNumber(Math.floor(titleData.resid_ppltn_cnt / titleData.supply_cnt)) + "명당 1개소";
		}			
		
		$("#supplyTechbizAvgTxt").html(supplyTechbizAvgTxt);
		$("#supplyWorkerAvgTxt").html(supplyWorkerAvgTxt);
		//2017.09.28 개발팀 수정
		//$("#supplyResidPpltnAvgTxt").html(supplyResidPpltnAvgTxt);
	}
	
	function industryAreaSynthesizeStatsTitleData_fnc(titleData){
		//총사업체수
		$("#totalIndustryCorpCnt").html(appendCommaToNumber(titleData.corp_cnt) + "(개)");
		//총종사자수
		$("#totalIndustryWorkerCnt").html(appendCommaToNumber(titleData.worker_cnt) + "(명)");
		
		//평균지원시설
		var industryTechbizAvgTxt = "";
		var industryWorkerAvgTxt = "";
		var industryResidPpltnAvgTxt = "";

//TODO 결과값 확인				
		if(0 == Number(titleData.industry_cnt)){
			industryTechbizAvgTxt = "기술업종 " + appendCommaToNumber(titleData.corp_cnt) + "개당 0개소";
			industryWorkerAvgTxt = "종사자 " + appendCommaToNumber(titleData.worker_cnt) + "명당 0개소";
			industryResidPpltnAvgTxt = "인구 " + appendCommaToNumber(titleData.resid_ppltn_cnt) + "명당 0개소";
		}else{
			industryTechbizAvgTxt = "기술업종 " + appendCommaToNumber(Math.floor(titleData.corp_cnt / titleData.industry_cnt)) + "개당 1개소";
			industryWorkerAvgTxt = "종사자 " + appendCommaToNumber(Math.floor(titleData.worker_cnt / titleData.industry_cnt)) + "명당 1개소";
			industryResidPpltnAvgTxt = "인구 " + appendCommaToNumber(Math.floor(titleData.resid_ppltn_cnt / titleData.industry_cnt)) + "명당 1개소";
		}			
		
		$("#industryTechbizAvgTxt").html(industryTechbizAvgTxt);
		$("#industryWorkerAvgTxt").html(industryWorkerAvgTxt);
		$("#industryResidPpltnAvgTxt").html(industryResidPpltnAvgTxt);
	}
	/** 지원시설/산업단지 - 지역 종합 통계 정보 end */
	function industryVariationStateLineChart_fnc(titleTxt, nameTxt, valueSuffixTxt, categoriesArr, dataArr){
		$('#industryVariationStateChart').highcharts({
			chart: { zoomType: 'xy' },
	        colors: ['#f79339'],
	        title: { text: '' },
	        exporting : { enabled: false },
	        subtitle: {
	            text: ''
	        },
	        xAxis: [{
	            categories: categoriesArr,
	            crosshair: true
	        }],
	        yAxis: [{ // Secondary yAxis
	            title: {
	                text: titleTxt
	            },
	            labels: {
	            	enabled : false 
	            }
	        }],
	        tooltip: {
	            shared: true
	        },
	        legend: {
	        	enabled : false
	        },
	        series: [{
	            name: nameTxt,
	            type: '',
	            data: dataArr,
	            tooltip: {
	                valueSuffix: valueSuffixTxt
	            }
	        }]
	    });
	}
	/** 산업단지 내 기술업종 증감현황 꺽은선 차트 조회 end */	
	
}(window, document));