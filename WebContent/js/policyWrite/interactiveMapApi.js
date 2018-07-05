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
	W.$interactiveMapApi = W.$interactiveMapApi || {};
	
	$interactiveMapApi.request = {
			
			API_0301_URL : "/OpenAPI3/stats/population.json",
			API_0302_URL : "/OpenAPI3/stats/innersearchpopulation.json",	//9월서비스 권차욱 api명 변경
			API_0303_URL : "/OpenAPI3/stats/industrycode.json",
			API_0304_URL : "/OpenAPI3/stats/company.json",
			API_0305_URL : "/OpenAPI3/stats/household.json",
			API_0306_URL : "/OpenAPI3/stats/house.json",
			API_0307_URL : "/OpenAPI3/stats/farmhousehold.json",
			API_0308_URL : "/OpenAPI3/stats/forestryhousehold.json",
			API_0309_URL : "/OpenAPI3/stats/fisheryhousehold.json",
			API_0310_URL : "/OpenAPI3/stats/householdmember.json",
			API_FUSION_URL : "/ServiceAPI/stats/fusionstats.json",
			API_USERAREA_URL : "/ServiceAPI/map/userAreaBoundInfo.geojson",
			local_URL : "/ServiceAPI/policyWrite/getLocalGovernmentPolygonData.json",
			combineFailCnt : 0,
			
			//9월 서비스
			mask : {
				show : function () {
					this.blockUI = document.createElement("DIV");
					this.blockUI.style.backgroundColor = "#D3D3D3";
					this.blockUI.style.border = "0px solid black";
					this.blockUI.style.position = "absolute";
					this.blockUI.style.left = '0px';
					this.blockUI.style.top = '0px';
					if (window.innerHeight == undefined) {
						this.blockUI.style.height = document.documentElement.clientHeight + 'px';
						this.blockUI.style.width = document.documentElement.clientWidth + 'px';
					}
					else {
						this.blockUI.style.height = window.innerHeight + 'px';
						this.blockUI.style.width = window.innerWidth + 'px';
					}
					this.blockUI.style.zIndex = "10000";
					this.blockUI.style.filter = "alpha(opacity=60);";
					this.blockUI.style.MozOpacity = 0.6;
					this.blockUI.style.opacity = 0.6;
					this.blockUI.style.KhtmlOpacity = 0.6;
					document.body.appendChild(this.blockUI);
					
					this.popupUI = document.createElement("DIV");
					this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
					this.popupUI.style.border = "3px solid rgb(0,0,0)";
					this.popupUI.style.position = "absolute";
					this.popupUI.style.height = '10px';
					this.popupUI.style.lineHeight = '50px';
					this.popupUI.style.paddingBottom = '40px';
					this.popupUI.style.width = '400px';
					this.popupUI.style.top = '50%';
					this.popupUI.style.left = '50%';
					this.popupUI.style.zIndex = "11000";
					this.popupUI.style.cursor = 'wait';
					var divHeight = this.popupUI.style.height.replace('px', '');
					var divWidth = this.popupUI.style.width.replace('px', '');
					this.popupUI.style.margin = '-' + divHeight / 2 + 'px 0 0 -' + divWidth / 2 + 'px';
					this.popupUI.style.textAlign = 'center';
					
					 var errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
					//var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
					this.popupUI.innerHTML = errorMsg;
					
					document.body.appendChild(this.popupUI);
				},
				close : function () {
					if (!sop.Util.isUndefined(this.blockUI)) {
						document.body.removeChild(this.blockUI);
						delete this.blockUI;
					}
					if (!sop.Util.isUndefined(this.popupUI)) {
						D.body.removeChild(this.popupUI);
						delete this.popupUI;
					}
				}
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
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiTotalPopulationObj.addParam(params.param[i].key, params.param[i].value);	
					}
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
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiTotalPopulationObj.request({
					method : "GET",
					async : async, //9월 서비스
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
					
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiSearchPopulationObj.addParam(params.param[i].key,
								params.param[i].value);						
					}
					
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
				
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiSearchPopulationObj.request({
					method : "GET",
					async : async, //9월 서비스
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
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
					}
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
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
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
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiHouseHoldMemberObj.addParam(params.param[i].key, params.param[i].value);
					}
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
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiHouseHoldMemberObj.request({
					method : "GET",
					async : async,	//9월 서비스
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
			 * @description  : OpenAPI 농가통계 정보를 조회한다.
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
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiFarmHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
					}
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
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiFarmHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
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
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiForestryHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
					}
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
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiForestryHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
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
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiFisheryHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
					}
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
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiFisheryHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
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
				
				var api_url = "";
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiCompanyObj.addParam(params.param[i].key, params.param[i].value);
					}
					
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
					
					//전산업인지 아닌지 체크 (전산업으로 선택했을 경우 총조사주요지표 API로 검색한다.)
					if(params.param[i].key == "class_code" || params.param[i].key == "theme_cd") {	//class_code값이 있으면 전산업이 아님
						api_url = this.API_0304_URL;
					}
				}
				
				//api_url 값이 없으면 전산업이다. (총조사주요지표 API로 검색)
				if(api_url == "") {
					api_url = this.API_0301_URL;
					for (var i = 0; i < params.param.length; i++) {
						if (params.param[i].key == "area_type") {
							params.param.splice(params.param.indexOf(params.param[i]), 1);		//area_type 파라미터 삭제
						}
					}
					sopOpenApiCompanyObj.removeParam("area_type");
				}
				
				//api_url 값이 없으면 전산업이다. (총조사주요지표 API로 검색)
				if(api_url == "") {
					api_url = this.API_0301_URL;
					for (var i = 0; i < params.param.length; i++) {
						if (params.param[i].key == "area_type") {
							params.param.splice(params.param.indexOf(params.param[i]), 1);		//area_type 파라미터 삭제
						}
					}
					sopOpenApiCompanyObj.removeParam("area_type");
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				
				if ( params.adm_cd != "00") {
					sopOpenApiCompanyObj.addParam("adm_cd", params.adm_cd);
				}
				
				sopOpenApiCompanyObj.addParam("bnd_year", params.map.bnd_year);
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiCompanyObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + api_url,
					options : {
						params : params,
						url : api_url,
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
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiHouseObj.addParam(params.param[i].key, params.param[i].value);
					}
					
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
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				sopOpenApiHouseObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + this.API_0306_URL,
					options : {
						params : params,
						url : this.API_0306_URL,
					}
				});
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
					method = "POST"; //9월 서비스
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
				var searchbtnCnt = $interactiveLeftMenu.ui.searchbtnCnt - 1;
				var sopStatBaseYearObj = new sop.portal.statBaseYear.api();
				var param_info = new Array();
				param_info.push("low_search");
				for (var i = 0; i < $interactiveLeftMenu.ui.arParamList.length; i++) {
					if($interactiveLeftMenu.ui.arParamList[i].idx == $interactiveLeftMenu.ui.searchbtnCnt-1) {
						for(var x = 0; x < $interactiveLeftMenu.ui.arParamList[i].params.length; x ++) {
							var params = $interactiveLeftMenu.ui.arParamList[i].params[x];
							param_info.push(params.key);
						}
						break;
					}
				}
				
				sopStatBaseYearObj.addParam("api_id", $interactiveLeftMenu.ui.curSelectedDetailStatsType.substring(0,8));
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
			
			//9월 서비스
			/**
			 * @name         : openApiItemCombine
			 * @description  : 결합조건 검색 API
			 * @date         : 2015. 01. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param params
			 */
			openApiItemCombine : function(params) {
				var sopOpenApiItemCombineObj = new sop.openApi.itemcombine.api();
				var api_url = contextPath + $interactiveMapApi.request.API_FUSION_URL;		//초기값은 기본 결합조건api주소
				var methodType = "POST";
				
				for (var i = 0; i < params.noneParams.length; i++) {	//조회조건이 아닌 파라미터중에서 fusion_query_type 값 확인
					if(params.noneParams[i].key == "fusion_query_type") {	
						if(params.noneParams[i].value == "population" || params.noneParams[i].value == "household" || params.noneParams[i].value == "house") {		//인구, 가구, 주택 조건
							if(params.noneParams[i].value == "population") {
								api_url = openApiPath + $interactiveMapApi.request.API_0302_URL;		//인구 OPENAPI 호출
							} else if(params.noneParams[i].value == "household") {
								api_url = openApiPath + $interactiveMapApi.request.API_0305_URL;		//가구 OPENAPI 호출
							} else if(params.noneParams[i].value == "house") {
								api_url = openApiPath + $interactiveMapApi.request.API_0306_URL;		//주택 OPENAPI 호출
							}
							methodType = "GET";
							sopOpenApiItemCombineObj.addParam("accessToken", accessToken);
						}
					}
				}
				
				var isBndYear = false;
				if(params.adm_cd == "00"){
					var result = confirm("인구, 가구, 주택 조건결합인 경우 \n 속도가 지연될 수도 있습니다. \n 계속 조회하시겠습니까? ");
					if(result == true){
						for (var i = 0; i < params.param.length; i++) {
							if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
								
							}else{
								sopOpenApiItemCombineObj.addParam(params.param[i].key, params.param[i].value);	
							}
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
							method : methodType,
							async : false,
							url : api_url,
							options : {
								btntype : "items",
								params : params,
								url : api_url
							}
						});
					}
				}else{
					for (var i = 0; i < params.param.length; i++) {
						if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
							
						}else{
							sopOpenApiItemCombineObj.addParam(params.param[i].key, params.param[i].value);	
						}
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
						method : methodType,
						async : false,
						url : api_url,
						options : {
							btntype : "items",
							params : params,
							url : api_url
						}
					});
				}
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
				sopSearchReverseGeoCodeObj.addParam("x_coor", $interactiveMap.ui.x);
				sopSearchReverseGeoCodeObj.addParam("y_coor", $interactiveMap.ui.y);
				
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
			 * @name         : userAreaBoundInfo
			 * @description  : 사용자영역 경계정보를 조회한다.
			 * @date         : 2015. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param area   : 영역정보
			 * @param type	 : 영역타입(circle, rectangle, polygon)
			 */
			userAreaBoundInfo : function (area, type, code, layer, map) {
				var userAreaBoundObj = new sop.openApi.userAreaBoundObj.api();
				userAreaBoundObj.addParam("area", area);
				userAreaBoundObj.addParam("type", type);
				userAreaBoundObj.addParam("code", code);
				userAreaBoundObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_USERAREA_URL,
					options : {
						target : this,
						url : contextPath + this.API_USERAREA_URL,
						type : type,
						area : area,
						layer : layer,
						map : map
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
				
				//=================================================================//
				//2016.03.29 수정, N/A일 경우, 데이터에서 제외
				//2016.06.07 kcu 수, 인구밀도, 노령화지수, 노년부양비, 유년부양비, 평균나이, 평균가구원이 0일 경우 데이터에서 제외
				var tmpResult = [];
				for (var i=0; i<result.length; i++) {
					if (!(result[i][params.filter] == "N/A"   ||	
					     (params.filter == "ppltn_dnsty"      ||	//인구밀도		
					      params.filter == "aged_child_idx"   ||	//노령화지수
					      params.filter == "oldage_suprt_per" ||	//노년부양비
					      params.filter == "juv_suprt_per"    ||	//유년부양비
					      params.filter == "avg_age" 	  ||	//평균나이
					      params.filter == "avg_fmember_cnt"        //평균가구원    
					     ) && result[i][params.filter] == "0") ) {
						tmpResult.push(result[i]);
					}
				}
				res.result = tmpResult;
				
				map.clearLayer();
				map.multiLayerControl.clear();
				
				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[params.filter])-parseFloat(a[params.filter])
					});
				}
				
				//인구총괄일 경우, 사용자지정영역을 그릴수 없다.
				if (res.id == "API_0301") {
					//총조사일 경우 설명 문구 보여줌
					$("#noticeTextPopup0"+(parseInt(map.id)+1)).show();
					//사업체의 전산업일 경우 API_0301을 API_0304로 변경
					if(params.api_id == "API_0304") {
						res.id = "API_0304";
						options.params.param.push({"key" : "area_type", "value" : "0"});
					}
				} else {
					//나머지는 설명 문구 숨김
					$("#noticeTextPopup0"+(parseInt(map.id)+1)).hide();
				}

				// 일반검색 버튼일 경우,
				if ($interactiveMap.ui.searchBtnType == "normal") {	
					$interactiveMap.ui.updateSearchTitle(options.params.title, options.params.unit, map.id);
					// 북마크,공유정보 설정
					//9월 서비스
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "normal";
					options.params.param.push({"key" : "adm_cd", "value" : params.adm_cd});
					map.setStatsData("normal", res, params.filter, params.unit);	
					if (params.view_type == "TS") {
						//2016.03.18 수정, 경계레벨 0,2일 때, 시계열조회 문제
						if (map.boundLevel == "1") {
							map.openApiReverseGeoCode(map.center);
						}else {
							map.autoDownBoundary();
						}
					}else {
						map.autoDownBoundary();
					}
//					apiLogWrite("A0", options);
				} else {
					
					//범례결합시, 하나라도 통신에러나 검색결과가 없을 경우, 초기화한다.
					if ($interactiveMapApi.request.combineFailCnt > 0) {
						map.clearDataOverlay();
						return;
					}
					map.setStatsData("combine", res, params.filter, params.unit);
					
					// 요청된 api정보가 모두 수신되었을 경우,
					if (map.combineData.length == 2) {
						map.autoDownBoundary();
						//결합일경우, 범례설정
						mapInfo.setLegendRange();
					}

					// 북마크,공유정보 설정
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "combine";
					options.params.param.push({"key" : "adm_cd", "value" : params.adm_cd});
					
					if (map.combineData.length == 2) {
						var combineTitle = "";
						var api_ids = "";
						options.params.api_id = api_ids;
						options.params.title = combineTitle;
						$interactiveMap.ui.updateSearchTitle(combineTitle, map.id);
						
						//API 로그
//						apiLogWrite("A0", options);
					}

				}
				map.setDroppedInfo();
			},
			
			
			/**
			 * 
			 * @name         : setMultiStatsData
			 * @description  : 
			 * @date         : 2015. 10. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setMultiStatsData : function (res, options) {
				var result = res.result;
				var params = options.params;
				var map = params.map;
				res["pAdmCd"] = params.adm_cd;
				
				//2016.03.29 수정, N/A일 경우, 데이터에서 제외
				var tmpResult = [];
				for (var i=0; i<result.length; i++) {
					if (result[i][params.filter] != "N/A") {
						tmpResult.push(result[i]);
					}
				}
				res.result = tmpResult;
				
				//2016.03.30 수정, sort 추가
				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[params.filter])-parseFloat(a[params.filter])
					});
				}
				
				map.drawControl.removeOverlay();
				map.multiLayerControl.setStatsData("normal", res, options, false);
				$interactiveMap.ui.updateSearchTitle(options.params.title, options.params.unit, map.id);
			},
			
			localGovernment : function(params) {
				var map = params.map;
				var obj = new sop.openApi.localGovernment.api();
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					obj.addParam(params.param[i].key, params.param[i].value);	
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}
				obj.addParam("bnd_year", params.map.bnd_year);
				if ( params.adm_cd!=null && params.adm_cd != undefined && params.adm_cd.replace(/ /gi,"")!="" &&params.adm_cd != "00") {
					obj.addParam("adm_cd", params.adm_cd);
					process();
				}else{
					process();
				}
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}
				function process(type){
					obj.request({
						method : "POST",
						async : async,
						url : contextPath + $interactiveMapApi.request.local_URL,
						options : {
							params : params,
							url : $interactiveMapApi.request.local_URL,
							type : type
						}
					});
				}
			}
	};

	/** ********* OpenAPI 인구통계총괄 Start ********* */
	(function() {
		$class("sop.openApi.totalPopulation.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiTotalPopulation(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
									//시계열에서 검색값이 없을 경우
//									$interactiveDataBoard.ui.emptyTimerBaseInsert(res, options);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른것으로 대체
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
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiSearchPopulation(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								
								//시계열에서 검색값이 없을 경우
//								$interactiveDataBoard.ui.emptyTimerBaseInsert(res, options);	
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른것으로 대체
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
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른 것으로 대체
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
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiHouseHoldMember(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른 것으로 대체
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
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiFarmHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른 것으로 대체
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
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiForestryHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른 것으로 대체
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
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiFisheryHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른 것으로 대체
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
								var tmpObj = {};
								tmpObj.id = result[i].class_code + "_" + options.depth;
								tmpObj.cd = result[i].class_code;
 								tmpObj.text = result[i].class_nm;
								tmpObj.depth = options.depth + 1;
								
								if (tmpObj.depth > 1) {
									tmpObj.infoIcon = true;
								} 
							
								if (options.depth < 3) {
									tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
									tmpObj.state = "closed";
								}else {
									tmpObj.childCount = 0;
								}
								tmpData.push(tmpObj);
								
							}

							if ($interactiveLeftMenu.ui.companyTree == null) {
								if (options.depth == 0) {
									
									//산업체분류 최상위 '산업체 총괄' 추가
									//=============================================================================================//
									var rootData = [];
									var root = {
											id : "root",
											cd : "",
											text : "전산업",
											state : "closed",
											children : [{"id": "root_progress", "iconCls": "icon-tree-loading", "text": "Loading"}],
											isExpanded : true
									};
									rootData.push(root);
									//=============================================================================================//
									
									$interactiveLeftMenu.ui.companyTree = $("#company_TreeBox").easytree({
										slidingTime:0,
							            building:$interactiveLeftMenu.event.companyListTreeWidth,
							            stateChanged:$interactiveLeftMenu.event.companyListTreeWidth,
							            toggled:$interactiveLeftMenu.event.companyListTreeWidth,
										data : rootData,
										allowActivate: true,
							            disableIcons: true,
							            toggled : function(event, nodes, node) {
											if (node.childCount == null) {
												if (node.children.length > 0 ) {
													if(node.children[0].id == node.id + "_progress") {
														if (node.isExpanded) {
															$interactiveMapApi.request.openApiInterstryCode(
																	node.depth,
																	options.class_deg,
																	node.cd);
														}
													}
												}
											}
										},
										selected : function(node) {	
											$interactiveLeftMenu.ui.curSelectedCompanyNode = node;
										},
										iconSelected : function(e, id) {
											var id = id.split("_")[1];
											id = id.substring(1, id.length);
											window.open(
													"https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=0"+ options.class_deg +"&strCategoryCode="+ id,
													//"http://kostat.go.kr/kssc/stclass/StClassAction.do?method=ksscTree&classKind=1&catgrp=&code=" + id + "&kssc=popup", 
													"통계분류 홈페이지에 오신것을 환경합니다.",
													"width=420, height=400, menubar=no, status=no, toolbar=no, location=no"
											);
										}
									});
									$interactiveLeftMenu.ui.companyTree.activateNode(tmpData[0].id);
									$interactiveLeftMenu.ui.curSelectedCompanyNode = $interactiveLeftMenu.ui.companyTree.getNode(tmpData[0].id);
									
									//=============================================================================================//
									for (var i=0; i<tmpData.length; i++) {
										$interactiveLeftMenu.ui.companyTree.addNode(tmpData[i], "root");
									}
									$interactiveLeftMenu.ui.companyTree.removeNode("root_progress");
									$interactiveLeftMenu.ui.companyTree.rebuildTree();
									$interactiveLeftMenu.ui.companyTree.activateNode("root");
									$interactiveLeftMenu.ui.curSelectedCompanyNode = $interactiveLeftMenu.ui.companyTree.getNode("root");
									//=============================================================================================//
								} 
							}else {
								for (var i=0; i<tmpData.length; i++) {
									$interactiveLeftMenu.ui.companyTree.addNode(tmpData[i], options.class_cd + "_" +(options.depth-1));
								}
								$interactiveLeftMenu.ui.companyTree.removeNode(options.class_cd + "_" + (options.depth-1) + "_progress");
								$interactiveLeftMenu.ui.companyTree.rebuildTree();
								$interactiveLeftMenu.ui.companyTree.activateNode(options.class_cd + "_" + (options.depth-1));
							}
						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								$interactiveMapApi.request.openApiInterstryCode(
										options.depth,
										options.class_deg,
										options.class_cd);
							});
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
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiCompany(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른 것으로 대체
					}
				});
	}());
	/** ********* OpenAPI 사업체분류 End ********* */

	
	/** ********* OpenAPI 주택분류 Start ********* */
	(function() {
		$class("sop.openApi.House.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {	
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$interactiveMapApi.request.openApiHouse(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
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
	/** ********* OpenAPI 주택분류 End ********* */
	
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
							
							$interactiveMapApi.request.openApiRegBookmark(
									$interactiveMap.ui.shareUrlInfoList[parseInt($interactiveMap.ui.curMapId)], 
									$interactiveMap.ui.share_type,
									$interactiveMap.ui.curMapId+1);
							
							//개발자 로그인
							$interactiveMapApi.request.openApiDeveloperLoginProcess(options.id, options.pwd);
							
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
								var searchbtnCnt = $interactiveLeftMenu.ui.searchbtnCnt - 1;
								var param_info = null;
								var tmpParamList = null;
								for (var i = 0; i < $interactiveLeftMenu.ui.arParamList.length; i++) {
									if($interactiveLeftMenu.ui.arParamList[i].idx == searchbtnCnt) {
										tmpParamList = $interactiveLeftMenu.ui.arParamList[i];
										param_info = tmpParamList.params;
										break;
									}
								}
								
								var maxYear = "";
								if (param_info != null) {
									/*for(var i = 0; i < param_info.length; i ++) {
										if(param_info[i].key == "year") {
											param_info[i].value = result.base_year;
											maxYear = result.base_year;
											break;
										}
									}*/
									maxYear = result.base_year;
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
	            		
	            		var arrayKey = $interactiveMap.ui.sKeyword.split(" ");
	            		if(arrayKey.length < 2) {
	            			$interactiveMap.ui.addressAdmCd = "";
	            			$interactiveMap.ui.x = "962202";
		            		$interactiveMap.ui.y = "1839421";
	            		} else {
	            			$interactiveMap.ui.addressAdmCd = dongCd;
	            			$interactiveMap.ui.x = result.resultdata[i].x;
		            		$interactiveMap.ui.y = result.resultdata[i].y;
	            		}
	            		
	            		break;
	            	}
	            } else if (res.errCd == "-401") {
	            	accessTokenInfo(function() {
	            		$interactiveMapApi.request.openApiGeocode(options.address);
	            	});
	            }  else if (res.errCd == "-100") {
	            	$interactiveMap.ui.addressAdmCd = "";
        			$interactiveMap.ui.x = "962202";
            		$interactiveMap.ui.y = "1839421";
	            }
	            else {
	                //messageAlert.open("알림", res.errMsg);
	            }
	            
	            //SOP 검색
	            var arrayKey = $interactiveMap.ui.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$interactiveMapApi.request.openApiSOP($interactiveMap.ui.sKeyword, $interactiveMap.ui.sopCurrentPageIndex);
	            } else {
	            	$interactiveMapApi.request.openApiSOP($interactiveMap.ui.searchKeyword, $interactiveMap.ui.sopCurrentPageIndex);
	            }
	            //KOSIS 검색
	            $interactiveMapApi.request.openApiKOSIS($interactiveMap.ui.sKeyword, $interactiveMap.ui.kosisCurrentPageIndex);
	        },
	        onFail : function(status) {
	        	//SOP 검색
	        	var arrayKey = $interactiveMap.ui.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$interactiveMapApi.request.openApiSOP($interactiveMap.ui.sKeyword, $interactiveMap.ui.sopCurrentPageIndex);
	            } else {
	            	$interactiveMapApi.request.openApiSOP($interactiveMap.ui.searchKeyword, $interactiveMap.ui.sopCurrentPageIndex);
	            }
	            //KOSIS 검색
	            $interactiveMapApi.request.openApiKOSIS($interactiveMap.ui.sKeyword, $interactiveMap.ui.kosisCurrentPageIndex);
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
       			 	html += "<p style='font-weight: bold;'>대화형 통계지도 검색결과</p>";
       			 	html += "<ul>";
	            	for(var i = 0; i < result.resultdata.length; i++) {
	            		var elem = result.resultdata[i];            			
	            		html += "<li id='sopList_"+i+"' style='line-height: 30px;'>";
	            		html += "	<div style='float: left; font-size: 5px;'>● </div>"	//리버스지오코딩 : 법정동->행정동
	            		html += "	<div style='cursor: pointer; margin-left: 20px; font-size: 11px;' onclick=\"javascript:$interactiveMapApi.request.searchReverseGeoCode('sop', '"+elem.url + "','"+elem.nm+"')\">" + elem.nm + "</div>";
	            		html += "</li>";
	            	}
	            	html += "</ul>";
	            	html += "</div>";	            		            
            		$("#sopListTable").html(html);
            		
            		if(result.totalcount > 5){
            			var htmlPage = "<div id='sopPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
            			$("#sopListTablePage").html(htmlPage);
            		}
            		$interactiveMap.ui.sopPaging(result.totalcount, $interactiveMap.ui.sopCurrentPageIndex);
            		
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo(function() {
	            		$interactiveMapApi.request.openApiSOP(options.searchword, options.pagenum);
	            	});
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
	            	$interactiveMap.ui.searchKosisParam = [];
            		//KOSIS
	            	if(result.resultdata != undefined) {
	            		var html = "<div class='search_result_list' style='margin: 10px 10px 10px 10px;'>";
	            			 html += "<p style='font-weight: bold;'>행정구역통계 검색결과</p>";
	            			 html += "<ul>";
	            		for(var x = 0; x < result.resultdata.length; x ++) {
	            			var elem = result.resultdata[x];
	            			elem["type"] = "kosis";
	            			elem["adm_cd"] = $interactiveMap.ui.addressAdmCd;
	            			elem["x"] = $interactiveMap.ui.x;
	            			elem["y"] = $interactiveMap.ui.y;
	            			
	            			html += "<li style='line-height: 30px;'>";
	            			html += 	"<div style='float: left; font-size: 5px;'>● </div>"	//리버스지오코딩 : 법정동->행정동
	        	            html += "	<div style='cursor: pointer; margin-left: 20px; font-size: 11px;' onclick=\"javascript:$interactiveMapApi.request.searchReverseGeoCode('kosis', '"+x + "', '"+elem.stat_title+"')\">" /*+ elem.menu_level_nm1  + " > " */+ elem.stat_title + "</div>";
	            			html += "</li>";
	            			
	            			$interactiveMap.ui.searchKosisParam.push(elem);
	            		}
	            		
	            		html += "</ul>";
	            		html += "</div>";
	            		$("#kosisListTable").html(html);
	            		if(result.totalcount > 5){
		            		var htmlPage = "<div id='kosisPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span>";
		            		$("#kosisListTablePage").html(htmlPage);
	            		}
	            		$interactiveMap.ui.kosisPaging(result.totalcount, $interactiveMap.ui.kosisCurrentPageIndex);
	            	}
	            	
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo(function() {
	            		$interactiveMapApi.request.openApiKOSIS(options.searchword, options.pagenum);
	            	});
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
					if ($interactiveMap.ui.addressAdmCd != "") {
						if (options.division == "sop") {		//SOP
							if($interactiveMap.ui.addressAdmCd.length == 2) {
								$interactiveMap.ui.addressAdmCd = result.sido_cd;
							}else if ($interactiveMap.ui.addressAdmCd.length == 5) {
								$interactiveMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd;
							}else if ($interactiveMap.ui.addressAdmCd.length == 7) {
								$interactiveMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
							}else {
								$interactiveMap.ui.addressAdmCd = "00";
							}
						} else {	//KOSIS
							$interactiveMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
						}
					}
					
					
					if(options.division == "sop") {
						var elem = [];
						elem["type"] = options.type;
            			elem["adm_cd"] = $interactiveMap.ui.addressAdmCd;
            			elem["x"] = $interactiveMap.ui.x;
            			elem["y"] = $interactiveMap.ui.y;
            			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
            			elem["title"] = options.title;
            			$interactiveMap.ui.searchSOPParam = [elem];
            			$interactiveMap.ui.analysisSearchInfo("sop", 0);
					} else if(options.division == "kosis") {
						var x = options.url;
						$interactiveMap.ui.searchKosisParam[x]["adm_cd"] = $interactiveMap.ui.addressAdmCd;
						$interactiveMap.ui.searchKosisParam[x]["x"] = $interactiveMap.ui.x;
						$interactiveMap.ui.searchKosisParam[x]["y"] = $interactiveMap.ui.y;
						$interactiveMap.ui.searchKosisParam[x]["title"] = options.title;
						$interactiveMap.ui.analysisSearchInfo("kosis", x);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.searchReverseGeoCode(options.division, options.url, options.title);
					});
				}
				else {
					if(options.division == "sop") {
						var elem = [];
						elem["type"] = options.type;
            			elem["adm_cd"] = $interactiveMap.ui.addressAdmCd;
            			elem["x"] = $interactiveMap.ui.x;
            			elem["y"] = $interactiveMap.ui.y;
            			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
            			elem["title"] = options.title;
            			$interactiveMap.ui.searchSOPParam = [elem];
            			$interactiveMap.ui.analysisSearchInfo("sop", 0);
					} else if(options.division == "kosis") {
						var x = options.url;
						$interactiveMap.ui.searchKosisParam[x]["adm_cd"] = $interactiveMap.ui.addressAdmCd;
						$interactiveMap.ui.searchKosisParam[x]["x"] = $interactiveMap.ui.x;
						$interactiveMap.ui.searchKosisParam[x]["y"] = $interactiveMap.ui.y;
						$interactiveMap.ui.searchKosisParam[x]["title"] = options.title;
						$interactiveMap.ui.analysisSearchInfo("kosis", x);
					}
				}
			},
			onFail : function (status, options) {
				if(options.division == "sop") {
					var elem = [];
					elem["type"] = options.type;
        			elem["adm_cd"] = $interactiveMap.ui.addressAdmCd;
        			elem["x"] = $interactiveMap.ui.x;
        			elem["y"] = $interactiveMap.ui.y;
        			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
        			elem["title"] = options.title;
        			$interactiveMap.ui.searchSOPParam = [elem];
        			$interactiveMap.ui.analysisSearchInfo("sop", 0);
				} else if(options.division == "kosis") {
					var x = options.url;
					$interactiveMap.ui.searchKosisParam[x]["adm_cd"] = $interactiveMap.ui.addressAdmCd;
					$interactiveMap.ui.searchKosisParam[x]["x"] = $interactiveMap.ui.x;
					$interactiveMap.ui.searchKosisParam[x]["y"] = $interactiveMap.ui.y;
					$interactiveMap.ui.searchKosisParam[x]["title"] = options.title;
					$interactiveMap.ui.analysisSearchInfo("kosis", x);
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
							var result = res.result;
							var resId = res.id; //9월 서비스
							res["pAdmCd"] = params.adm_cd;
//							map.drawControl.removeOverlay();//변경
							
							//API ID가 인구, 가구, 주택 조회일 경우 결합조건으로 변경
							//9월 서비스
							if(resId == "API_0302" || resId == "API_0305" || resId == "API_0306") {
								res.id = "4011";
								var tmpData = [];
								for(var i = 0; i < result.length; i ++) {	//population 데이터를 data_cnt로 옮기는 작업
									var tmpDataCnt = "";
									if(resId == "API_0302") {
										tmpDataCnt = result[i].population;
									} else if(resId == "API_0305") {
										tmpDataCnt = result[i].household_cnt;
									} else if(resId == "API_0306") {
										tmpDataCnt = result[i].house_cnt;
									}
									tmpData.push({
										"adm_cd" : result[i].adm_cd,
										"adm_nm" : result[i].adm_nm,
										"data_cnt" : tmpDataCnt
									});
								}
								res.result = tmpData;
							}
							
							$interactiveMapApi.request.setStatsData(res, options);
							map.autoDownBoundary();
														
							// 북마크,공유정보 설정
							options["zoomlevel"] = map.zoom;
							options["center"] = map.center;
							options["btntype"] = "items";
//							$interactiveMap.ui.setShareInfo(options, "normal", map.id);
//							map.shareInfo.setShareInfo(options, "normal", map.id);

						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								$interactiveMapApi.request.openApiItemCombine(options.params);
							});
						} else {
							var map = options.params.map;
							map.clearDataOverlay();
							//map.mapInfo.resetMapInfo();
							//map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* 조건결합통계 End ********* */
	
	/** ********* 사용자영역 경계조회 Start ********* */
	(function() {
		$class("sop.openApi.userAreaBoundObj.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						var layer = options.layer;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.geojson) {
									map.geojson.remove();
								}
								layer.shapeGroup.thisShapeRemove();
								map.addPolygonGeoJson(res, "polygon");
								if (map.geojson) {
									map.geojson.eachLayer(function(layer) {
										layer.setStyle({
											weight : 3,
											color : "white",
											dashArray : layer.options.dashArray,
											fillOpacity : 0.7,
											fillColor : "#F06292"
										});
										map.selectedBoundList.push(layer);
									});
								}
								break;
							default:
								layer.shapeGroup.thisShapeRemove();
								map.mapBtnInfo.doClearSelectedBound();
								map.mapBtnInfo.setFixedBoundBtn(false);
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.map;
						var layer = options.layer;
						layer.shapeGroup.thisShapeRemove();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
					}
				});
	}());
	/** ********* 사용자영역 경계조회 End ********* */
	/** ********* 협엽형 데이터 조회 Start ********* */
	(function() {
		$class("sop.openApi.localGovernment.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.selectedBoundMode == "multi") {
									$interactiveMapApi.request.setMultiStatsData(res, options);		
								}else {
									$interactiveMapApi.request.setStatsData(res, options);		
								}
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$interactiveMapApi.request.setMultiStatsData(res, options);	
								}else {
									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$interactiveMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
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
	/** ********* 협엽형 데이터 조회 End ********* */
}(window, document));