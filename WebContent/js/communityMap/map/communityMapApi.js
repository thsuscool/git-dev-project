/**
 * 통계 소통지도 화면에 대한 클래스
 * 
 * history : (주)유코아시스템, 1.0, 2016/01/14  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$communityMapApi = W.$communityMapApi || {};
	$communityMapApi.request = {
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
		API_FUSION_URL : "/ServiceAPI/stats/fusionstats.json",
		/**
		 * @name          : $communityMapApi.request.setStatsData
		 * @description   : 데이터 셋팅
		 * @date          : 2015. 12. 9. 
		 * @author	      : 나광흠
		 * @history 	  :
		 * @param res     : 데이터
		 * @param options : 옵션
		 * @param isKosis : kosis 유무
		 */
		setStatsData: function(res, options,isKosis) {
			if(options.params.adm_cd == undefined || options.params.adm_cd.length<=0){
				options.params.adm_cd = "00";
				options.params.adm_nm = "대한민국";
			}
			var result = res.result;
			var params = options.params;
			var map = params.map;

			res["pAdmCd"] = params.adm_cd;
			$.each(result,function(cnt,node){
				//N/A의 경우 0으로 치환
				if (node[params.filter] == "N/A") {
					node[params.filter] = "0";
				}
				if(isKosis){
					if(options.parameters.kosis_data_year){
						node["data_nm"] = options.parameters.kosis_data_year+"년";
					}
				}else{
					if(params.data_nm){
						node["data_nm"] = params.data_nm;
					}
				}
			});
			map.drawControl.removeOverlay();
			map.setStatsData("normal", res, params.filter, params.unit);
			if(options.autoDownBoundary){
				map.autoDownBoundary();
			}
			if(typeof options.parameters.callback === "function"){
				options.parameters.callback();
			}
			if(W.$communityDataBoard){
				$communityDataBoard.ui.setMapstatChartData(res);
			}
		},
		/**
		 * @name             : $communityMapApi.request.getAjaxAccessTokenData
		 * @description      : ajax로 url 호출시 accessToken이 커넥션이 종료일 경우 accessTokenInfo 메소드를 호출하여 재발행 후 다시 조회
		 * @date             : 2016. 1. 7
		 * @author	         : 나광흠
		 * @history 	     :
		 * @param url        : 호출 url
		 * @param data       : 옵션들
		 */
		getAjaxAccessTokenData:function(url,data){
			var result;
			accessTokenInfo();
			data.accessToken = accessToken;
			$.ajax({
				url : url,
				type:"GET",
				data: data,
				async: false,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						result = res;
					}else if (res.errCd == "-100") {
						console.log(res.errMsg);
					}else{
						$communityMapCommon.alert("알림", res.errMsg);
					}
				},
				error: function(data){
					$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					return false;
				}
			});
			return result;
		},
		/**
		 * @name             : $communityMapApi.request.getRealServerAjaxAccessTokenData
		 * @description      : 상용서버 바라보는 ajax
		 * @date             : 2016. 1. 7
		 * @author	         : 나광흠
		 * @history 	     :
		 * @param url        : 호출 url
		 * @param data       : 옵션들
		 */
		getRealServerAjaxAccessTokenData:function(url,data){
			var result;
			var sopPortalAccessTokenObj = new sop.portal.accessToken.api();
			$.ajax({
				url : "//sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
				type:"GET",
				data: {
					consumer_key:"590a2718c58d41d9ae3b",
					consumer_secret:"ab7fe94f9fb64336abd3"
				},
				async: false,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						data.accessToken = res.result.accessToken;
					}else if (res.errCd == "-100") {
						console.log(res.errMsg);
					}else{
						$communityMapCommon.alert("알림", res.errMsg);
					}
				},
				error: function(data){
					$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					return false;
				}
			});
			$.ajax({
				url : url,
				type:"GET",
				data: data,
				async: false,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						result = res;
					}else if (res.errCd == "-100") {
						console.log(res.errMsg);
					}else{
						$communityMapCommon.alert("알림", res.errMsg);
					}
				},
				error: function(data){
					$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					return false;
				}
			});
			return result;
		},
		/**
		 * @name             : $communityMapApi.request.getAdmCdToCoor
		 * @description      : 행정구역경계
		 * @date             : 2015. 12. 9 
		 * @author	         : 나광흠
		 * @history 	     :
		 * @param adm_cd     : adm_cd
		 * @param year       : 년도
		 * @param low_search : 행정구역코드에 해당하는 정보만 요청 : 0,하위 행정구역 정보 요청 : 1
		 */
		getAdmCdToCoor:function(adm_cd,year,low_search){
			var result = null,type = "hadmarea";
			var data = {
				"year" : year
			};
			if($communityMapCommon.hasText(adm_cd)){
				data.adm_cd = adm_cd;
				if(adm_cd.length>=7){
					type = "statsarea";
				}
			}
			if($communityMapCommon.hasText(low_search)){
				if(adm_cd.length<=5){
					data.low_search = low_search;
				}
			}
			result = this.getAjaxAccessTokenData(openApiPath + "/OpenAPI3/boundary/"+type+".geojson",data);
			return result;
		},
		/**
		 * @name            : $communityMapApi.request.getAddressFromCoordinate
		 * @description     : 리버스 지오코딩
		 * @date            : 2015. 12. 9 
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param adm_cd    : adm_cd
		 * @param x         : x 좌표
		 * @param y         : y 좌표
		 * @param addr_type : 주소종류
		 */
		getAddressFromCoordinate : function(x,y,addr_type){
			return this.getRealServerAjaxAccessTokenData("//sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json",{
				"x_coor": x,
				"y_coor": y,
				"addr_type":addr_type
			});
		},
		/**
		 * @name              : $communityMapApi.request.getAddressFromAddressName
		 * @description       : 지오코딩
		 * @date              : 2015. 12. 9 
		 * @author	          : 나광흠
		 * @history 	      :
		 * @param address     : 주소명
		 * @param pagenum     : 페이지
		 * @param resultcount : 한페이지당 표시해줄 개수
		 */
		getAddressFromAddressName : function(address,pagenum,resultcount){
			var data={address : address};
			if($communityMapCommon.hasText(pagenum)){
				data.pagenum = pagenum; 
			}
			if($communityMapCommon.hasText(resultcount)){
				data.resultcount = resultcount; 
			}
			return this.getRealServerAjaxAccessTokenData("//sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json",data);
		},
		/**
		 * @name          : $communityMapApi.request.openApiStatisticsHistoryParamInfo
		 * @description   : 즐겨찾기 상세파라미터정보를 가져온다.
		 * @date          : 2016. 1. 12. 
		 * @author	      : 나광흠
		 * @history 	  : 
		 * @param hist_id : key
		 */
		openApiStatisticsHistoryParamInfo : function (hist_id,autoDownBoundary,callback) {
			var obj = new sop.openApi.statisticsHistoryParamInfo.api();
			obj.addParam("hist_id", hist_id);
			obj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/member/StatisticsHistoryParamInfo.json",
				options : {
					hist_id : hist_id,
					autoDownBoundary:autoDownBoundary,
					callback : callback
				}
			});
		},
		/**
		 * @name          : $communityMapApi.request.getStats
		 * @description   : 통계값을 얻는다
		 * @date          : 2016. 1. 14. 
		 * @author	      : 나광흠
		 * @history 	  : 
		 * @param url     : 통계 url
		 * @param isKosis : kosis 데이터 유무
		 * @param options : options
		 */
		getStats : function(url,isKosis,options){
			//전 산업일 경우 주요지표로 변경
			if (options.parameters.class_code == null && options.parameters.theme_cd == null && url.indexOf("company.json")!=-1  ) {
				url = openApiPath + "/OpenAPI3/stats/population.json";
			}
			var obj = new sop.openApi.statistics.api();
			if(!isKosis){
				obj.addParam("accessToken", accessToken);
			}
			$.map(options.parameters,function(value,key){
				if(typeof value!="function"&&value!=undefined&&value!=null){
					if( key != 'area_type' ){
						if( key == 'bnd_year' ){
							value = '2016';
							obj.addParam(key, value);
						} else {
							if(key!="adm_cd"||(key=="adm_cd"&&value.replace(/ /gi,"")!="")){
								obj.addParam(key, value);
							}
						}
					}
				}
			});
			obj.request({
				method : "GET",
				async : false,
				url : url,
				options : {
					url : url,
					isKosis : isKosis,
					options : options
				}
			});
		},
		// 나의데이터에 저장된 내용 불러오기 
		getMyData : function(data_uid){
			var sopPortalGetMyDataApi = new sop.portal.getMyData.api();
			sopPortalGetMyDataApi.addParam("data_uid", data_uid);
			sopPortalGetMyDataApi.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/mypage/myData/getMyData.json"
			});
		},
		/**
		 * @name             : $communityMapApi.request.getIndustrycode
		 * @description      : 산업분류 리스트 얻기
		 * @date             : 2016. 7. 26. 
		 * @author	         : 나광흠
		 * @history 	     : 
		 * @param class_deg  : 산업분류체계 차수
		 * @param class_code : 산업분류 코드
		 * @param callback   : callback
		 */
		getIndustrycode : function(class_deg,class_code,callback){
			var obj = new sop.portal.industrycode.api();
			obj.addParam("accessToken", accessToken);
			if(!$.isNumeric(class_deg)||!/^8|9$/.test(class_deg)){
				class_deg = 9;
			}
			obj.addParam("class_deg", class_deg);
			if($communityMapCommon.hasText(class_code)){
				obj.addParam("class_code", class_code);
			}
			obj.request({
				method : "GET",
				async : true,
				url : openApiPath + $communityMapApi.request.API_0303_URL,
				options : {
					class_code : class_code,
					callback : callback
				}
			});
		},
		/**
		 * @name             : getKosisTreeMenu
		 * @description      : KOSIS 트리메뉴
		 * @date             : 2016. 10. 26
		 * @author	         : 나광흠
		 * @history 	     :
		 * @param up_list_id : up_list_id
		 * @param callback   : callback
		 */
		getKosisTreeMenu : function(up_list_id,callback) {
			if($communityMapCommon.hasText(up_list_id)){
				var obj = new kosis.serviceApi.kosisTreeMenu.api();
				obj.addParam("up_list_id", up_list_id);
				obj.request({
					method : "GET",
					async : true,
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisTreeMenu.do",
					options : {
						callback : callback
					}
				});
			}
		},
		/**
		 * @name              : searchKosis
		 * @description       : KOSIS 검색
		 * @date              : 2016. 10. 27
		 * @author	          : 나광흠
		 * @history 	      :
		 * @param pagenum     : 페이지
		 * @param resultcount : 페이지 개수
		 * @param searchword  : 검색어
		 * @param callback    : callback
		 */
		searchKosis : function(pagenum,resultcount,searchword,callback){
			var obj = new kosis.openApi.kosissearch.api();
			obj.addParam("accessToken", accessToken);
			obj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			obj.addParam("pagenum", pagenum);
			obj.addParam("resultcount", resultcount);
			obj.request({
		        method : "GET",
		        async : true,
		        url : openApiPath+"/OpenAPI3/search/kosis.json",
		        options : {
		        	pagenum:pagenum,
		        	resultcount:resultcount,
		        	searchword:searchword,
		        	callback:callback
		        }
		    });
		}
	};

	/*********** 북마크/공유 파라미터정보조회 시작 **********/
	(function() {
		$class("sop.openApi.statisticsHistoryParamInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == "0") {
					var result = res.result;
					if(result.infoList.length>1){
						$communityMapCommon.alert("알림", "결합된 데이터는사용하실 수 없습니다");
						$("input[name=stats][value="+options.hist_id+"]").prop("checked",false);
					}else{
						var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
						var info = result.infoList[0];
						var parameters = JSON.parse(info.param_info);
						var zoom = map.gMap.getZoom(),changeZoomLevel = false,changeAreaText=null;
						var adm_cd = $communityMap.ui.curAdmCd;
						if(parameters.isKosis){
							if(parameters.dist_level=="01"){
								var min=2,max=3;
								if(options.autoDownBoundary===true){
									min=0,max=1;
								}
								if(zoom>max){
									changeZoomLevel = true;
									changeAreaText = "시도";
									adm_cd = null;
									zoom = min;
								}
							}else if(parameters.dist_level=="02"){
								var min=4,max=5;
								if(options.autoDownBoundary===true){
									min=2,max=3;
								}
								if(zoom>max){
									changeZoomLevel = true;
									changeAreaText = "시군구";
									adm_cd = map.curSidoCd;
									zoom = min;
								}
							}else if(parameters.dist_level=="03"){
								var min=6,max=9;
								if(options.autoDownBoundary===true){
									min=4,max=5;
								}
								if(zoom>max){
									changeZoomLevel = true;
									changeAreaText = "읍면동";
									adm_cd = map.curSidoCd+map.curSiggCd;
									zoom = min;
								}
							}
						}
						function search(zoomlevel){
							parameters.mapInfo.center = $communityMap.ui.curCenter;
							parameters.mapInfo.zoomlevel = zoomlevel;
							parameters.paramInfo.adm_cd = adm_cd;
							var thisContextPath = "";
							if(parameters.isKosis){
								thisContextPath = kosisApiPath;
								parameters.showData = "data";
								parameters.paramInfo.gis_se = $communityMapCommon.hasText(adm_cd)?adm_cd:"1";
								delete parameters.paramInfo.adm_cd;
							}else{
								thisContextPath = openApiPath;
							}
							if(typeof options.callback === "function"){
								parameters.paramInfo.callback = options.callback;
							}
							$communityMapApi.request.getStats(thisContextPath+info.api_call_url,parameters.isKosis,{
								params:{
									map : map,
									adm_cd : adm_cd, 
									filter : parameters.showData,
									unit : parameters.unit,
									data_nm : parameters.title
								},
								parameters:parameters.paramInfo,
								autoDownBoundary : options.autoDownBoundary
							});
						}
						if(changeZoomLevel){
							$communityMapCommon.confirm(
								"알림","현재 데이터는 "+changeAreaText+" 단위의 통계입니다.<br>지도를 "+changeAreaText+"레벨로 축소하여 보시겠습니까?",[{
									title : "확인",
									func : function(opt) {
										map.mapMove([map.gMap.getCenter().x,map.gMap.getCenter().y],zoom);
										setTimeout(function(){
											search($communityMap.ui.curZoom);
										},1000);
									}
								},{title : "취소"}
							]);
						}else{
							search($communityMap.ui.curZoom);
						}
					}
					
				}else if(res.errCd == "-401") {
					accessTokenInfo(function() {
						$communityMapApi.request.openApiStatisticsHistoryParamInfo(options.hist_id);
					});
				}else{
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 북마크/공유 파라미터정보조회 종료 **********/
	/*********** 통계 조회 시작 **********/
	(function() {
		$class("sop.openApi.statistics.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				$communityMap.ui.doClearMap(function(){
					if (res.errCd == "0") {
						if(options.isKosis){
							var kosisData = new Array();
							$.each(res.result.kosisData,function(cnt,node){
								kosisData.push({
									adm_cd : node.CODE,
									adm_nm : node.NAME,
									data : node.DATA
								});
							});
							res.result = kosisData;
						}
						$communityMapApi.request.setStatsData(res, options.options, options.isKosis);
					} else if (res.errCd == "-401") {
						accessTokenInfo(function() {
							$communityMapApi.request.getStats(options.url,options.isKosis,options.options);
						});
					} else {
						$communityMapCommon.alert("알림", res.errMsg);
					}
				});
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 통계 조회 종료 **********/
	/**
	 * @name         : 나의 데이터 저장 목록 가져오기
	 * @description  : 나의데이터목록을 지도에 마커생성 및 표출 
	 * @date         : 2016. 3. 3. 
	 * @author	     : 이주혁
	 * @history 	 :
	 * @param
	 */
	(function() {
	    $class("sop.portal.getMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if(res.errCd == "0") {
	        		if($communityMapCommon.hasText($communityMap.ui.mydataMarkers)){
	        			$.each($communityMap.ui.mydataMarkers,function(){
	        				this.remove();
	        			});
	        		}
	        		var dataName,dataNameColumn,data=[],dataColumn=[];
	        		$.each(res.result[0].metaData,function(cnt,node){
	        			if(node.CHECK_TYPE=="1"){
	        				dataName = node.COL_NM;
	        				dataNameColumn = node.COL_ID;
	        			}else if(node.CHECK_TYPE=="2"){
	        				data.push(node.COL_NM);
	        				dataColumn.push(node.COL_ID);
	        			}else if(node.CHECK_TYPE=="3"){
	        				dataName = node.COL_NM;
	        				dataNameColumn = node.COL_ID;
	        				data.push(node.COL_NM);
	        				dataColumn.push(node.COL_ID);
	        			}
	        		});
	        		$communityMap.ui.mydata = {
        				dataName:dataName,
        				dataNameColumn:dataNameColumn,
        				data:data,
        				dataColumn:dataColumn
	        		};
    				var uploadData = res.result[0].uploadData;
	        		var markerIcon = sop.icon({
						iconUrl: '/img/community/mydata-marker.png',
						iconSize: [ 20, 20 ]
					});
	        		
	        		var markerGroup = new sop.MarkerClusterGroup();
	        		var markers = [];
	        		
	        		for(var i=0; i< uploadData.length; i++){
	        			var x_coord = uploadData[i].GEO_X;
	        			var y_coord = uploadData[i].GEO_Y;
	        			
	        			var marker = sop.marker([x_coord, y_coord],{
	        				icon:markerIcon
	        			});
	        			var dataList = $.parseJSON(uploadData[i].USR_DATA);
	        			var html  = "<table style='margin:10px;'>";
						html += 	"<tr>";
						html += 		"<td style='font-size:14px;font-weight:bold;color:#3792de;'>"+$communityMap.ui.mydata.dataName +" : "+dataList[$communityMap.ui.mydata.dataNameColumn]+"</td>";
						html +=			"<td></td>";
						html +=		"</tr>";
						html +=		"<tr style='height:5px;'></tr>";
						for(var x = 0; x < $communityMap.ui.mydata.dataColumn.length; x ++){
							html += 	"<tr>";
							html +=     	"<td style='font-size:12px;padding-left:5px;'>"+$communityMap.ui.mydata.data[x]+" : "+dataList[$communityMap.ui.mydata.dataColumn[x]]+"</td>";
							html +=		"</tr>";
						}
						html += "</table>"; 
	        			marker.bindInfoWindow(html,{
							minWidth:200,
							maxWidth:200,
							maxHeight:500
						});
        				markers.push(marker);
	        			markerGroup.addLayer(marker);
	        			marker.addTo($communityMap.ui.mapList[$communityMap.ui.curMapId].gMap);
	        		}
	        		$communityMap.ui.mydataMarkers = markers;
    			};
	        },
	        onFail : function(status, options) {

	        }
	    });
	}());
	/*********** 산업분류 시작 **********/
	(function() {
		$class("sop.portal.industrycode.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				this.onBlockUIClose();
				if(res.errCd=="-401"){
					accessTokenInfo(function() {
						$communityMapApi.request.getIndustrycode(options.class_code,options.callback);
					});
				}else{
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}
			},
			onFail : function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 산업분류 종료 **********/
	/*********** kosis 트리 메뉴 시작 **********/
	(function() {
		$class("kosis.serviceApi.kosisTreeMenu.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				this.onBlockUIClose();
				if(typeof options.callback === "function"){
					options.callback(res);
				}
			},
			onFail : function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** kosis 트리 메뉴 종료 **********/
	/*********** kosis 검색 시작 **********/
	(function() {
		$class("kosis.openApi.kosissearch.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				this.onBlockUIClose();
				if(res.errCd=="-401"){
					accessTokenInfo(function() {
						$communityMapApi.request.searchKosis(options.pagenum,options.resultcount,options.searchword,options.callback);
					});
				}else{
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}
			},
			onFail : function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 산업분류 종료 **********/
}(window, document));

