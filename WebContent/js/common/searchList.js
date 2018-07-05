/**
 * 상단 검색에 관한 메소드
* 
* history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
 */
(function(W, D) {
	//"use strict";
	
	W.$searchList = W.$searchList || {};
	
	var poiCurrentPageIndex = 0;			//POI 현재 페이지
	var sopCurrentPageIndex = 0;		//SOP 현재 페이지
	var themeCurrentPageIndex = 0;		//통계주제도 현재 페이지
	var kosisCurrentPageIndex = 0;		//KOSIS 현재 페이지	
	var emptyRequestCnt = 0;

	$(document).ready(function() {
		//$searchList.sKeyword = decodeURIComponent(getParameter("searchKeyword")); //20170622 보안조치
		$searchList.sKeyword = XssSearchKeyword; //20170622 보안조치
		
		//alert($searchList.sKeyword);
			
		$("#searchKeyword").val($searchList.sKeyword);
		
		$('#searchKeyword').select();
		
		//검색어 자르기
		$searchList.keywordSplit();
		
		$("#poiTable").hide();
	}),

	$searchList = {
			
		sKeyword : null,					//전체 검색어
		addressKeyword : null,		//검색어의 앞단어(주소)
		searchKeyword : null,			//검색어의 뒷단어(검색어)
		addressAdmCd : "00",			//검색어의 앞단어(주소) code
		markerGroup : [],					//마커그룹
		x : "989674",					//X좌표
		y : "1818313",					//Y좌표
		
		openApiRelSearchParam : [],		//OpenAPI 연관검색어 검색 파라미터
		openApiSOPParam : [],			//OpenAPI SOP 검색 파라미터
		serviceApiThemeParam : [],			//ServiceAPI 통계주제도 검색 파라미터
		openApiKOSISParam : [],			//OpenAPI KOSIS 검색 파라미터
		openApiGeocodeParam : [],		//OpenAPI 지오코딩 검색 파라미터
		openApiPoiParam : [],			//OpenAPI POI 검색 파라미터
		map : null,
		resultData : null,
		firstBoolean : true,				//최초 여부
		
		createMap : function() {
			this.map = new sMap.map();
			this.map.createMap($searchList, "miniMap",  {											
				center: [989674, 1818313],
				zoom: 9,
				zoomSliderControl : false,
				measureControl : false
			});
		},
		
		//마커를 생성한다.
		addMarker : function(data) {
			this.markerGroup = new Array();
			for(var  i = 0; i < data.length; i ++) {
				var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
	            html += '<tr>';
	            html += '<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:12px;"><strong>' + data[i].nm + '</strong></th>';
	            html += '<td >';
	            html += '</td>';
	            html += '</tr>';
	            html += '<tr>';
	            html += ' <th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:11px;">&nbsp;' + data[i].adm_addr + '</th>';
	            html += '<td >';
	            html += '</td>';
	            html += '</tr>';            
	            html += '</table>';					
				var marker = this.map.addHoverMarker(data[i].x, data[i].y, {tooltipMsg : html, visible:false},i);				            
				this.markerGroup.push(marker);
				
				
				if (i==0) {																				
					this.map.mapMove([data[i].x, data[i].y], 5);
				}
			}			
		},
		
		//마커위 POI를 보여준다.
		hoverMarker : function(data,idx) {
			this.map.mapMove([data.x, data.y], this.map.poiZoomLevel());   
		},
		
		
		//마커를 삭제한다.
		removeMarker : function() {
			if(this.markerGroup != "") {
				for (var i=0; i<this.markerGroup.length; i++) {
					this.map.removeMarker(this.markerGroup[i]);
				}
				this.markerGroup = null;	
			}
		},
		
		//검색어 자르기
		keywordSplit : function() {
			if(this.searchValidate()) {
				this.sKeyword =$("#searchKeyword").val();
				this.sKeyword = this.sKeyword.replace(/(^\s*)|(\s*$)/gi, "");
				this.sKeyword = this.sKeyword.replace(/ +/g, " "); 
				var arrayKey = this.sKeyword.split(" ");
				
				this.addressKeyword = arrayKey[0];				 
				this.searchKeyword = arrayKey[1];
				
				//결과없음 카운트 초기화
				emptyRequestCnt = 0;
				
				if(arrayKey.length < 2) {
					//연관검색어 검색
					$searchList.openApiRelSearch(this.sKeyword);
					//지오코딩 검색
					$searchList.openApiGeocode(this.sKeyword);
					this.searchKeyword = this.sKeyword;
				} else {
					//연관검색어 검색
					$searchList.openApiRelSearch(this.searchKeyword);
					//지오코딩 검색
					$searchList.openApiGeocode(this.addressKeyword);	
				}
			}
		},
		
		//검색 시 페이지 이동
		goSearchList : function() {
			if($searchList.searchValidate()) {
				window.location.href = contextPath + "/view/common/searchList?searchKeyword=" + $("#searchKeyword").val();
			}
		},
		
		//연관검색어 클릭 시 페이지 이동
		goRelSearchWordList : function(searchword) {
			window.location.href = contextPath + "/view/common/searchList?searchKeyword=" + searchword;
		},
		
		//POI 페이징 처리
		poiPaging : function(totalCount, currentIndex) {
			var pageSize = 10;
			var totalPage = Math.ceil( totalCount / pageSize);			
			$('#poiPaging .pages').paging({
				current:currentIndex+1,
				max:totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick:function(e,page){					
					poiCurrentPageIndex = page-1;					
					$searchList.openApiPoi(page-1);
				}
			});
		},
		
		//SOP 페이징 처리
		sopPaging : function(totalCount, currentIndex) {
			var pageSize = 5;						
			var totalPage = Math.ceil( totalCount / pageSize);			
			$('#sopPaging .pages').paging({
				current:currentIndex+1,
				max:totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick:function(e,page){
					sopCurrentPageIndex = page-1;
					$searchList.openApiSOP($searchList.searchKeyword, page-1);
				}
			});
		},
		
		//통계주제도 페이징 처리
		themePaging : function(totalCount, currentIndex) {
			var pageSize = 5;
			var totalPage = Math.ceil( totalCount / pageSize);			
			$('#themePaging .pages').paging({
				current:currentIndex+1,
				max:totalPage,
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick:function(e,page){
					themeCurrentPageIndex = page-1;
					$searchList.serviceApiThemetic($searchList.searchKeyword, page-1);
				}
			});
		},
		
		//KOSIS 페이징 처리
		kosisPaging : function(totalCount, currentIndex) {
			var pageSize = 5;
			var totalPage = Math.ceil( totalCount / pageSize);
			$('#kosisPaging .pages').paging({
				current:currentIndex+1,
				max:totalPage,
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick:function(e,page){
					kosisCurrentPageIndex = page-1;
					$searchList.openApiKOSIS($searchList.sKeyword, page-1);
				}
			});
		},
		
		//검색어 유효성 검사
		searchValidate : function() {
			var searchword = $("#searchKeyword").val();
			var arrayKey = searchword.split(" ");
			if(searchword == "") {
				messageAlert.open("알림", "검색어를 입력하세요.");
				return false;
			/*} else if(arrayKey.length < 2) {
				alert("지역(공백)검색어 형식으로 입력하세요.");
				return false;*/
			}
			return true;
		},
		
		// OpenAPI 연관검색어 검색
		openApiRelSearch : function(searchword) {
			var sopOpenApiRelsearchObj = new sop.openApi.relsearch.api();
			sopOpenApiRelsearchObj.addParam("accessToken", accessToken);
			sopOpenApiRelsearchObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			sopOpenApiRelsearchObj.request({
		        method : "GET",
		        async : true,
		        url : openApiPath+"/OpenAPI3/search/relword.json",
		        options : {
		        	btntype : "search",
		        	api_id : "API_0501",
		        	params : {
		        		searchword : searchword
		        	}
		        }
		    });
			this.openApiRelSearchParam = [];
			this.openApiRelSearchParam.push(searchword);
		},
		
		// OpenAPI SOP 검색
		openApiSOP : function(searchword, pagenum) {
			var sopOpenApiSOPObj = new sop.openApi.sopsearch.api();
			sopOpenApiSOPObj.addParam("accessToken", accessToken);
			sopOpenApiSOPObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			sopOpenApiSOPObj.addParam("pagenum", pagenum);
			sopOpenApiSOPObj.request({
		        method : "GET",
		        async : true,
		        url : openApiPath+"/OpenAPI3/search/sop.json",
		        options : {
		        	btntype : "search",
		        	api_id : "API_0502",
		        	params : {
		        		searchword : searchword,
		        		pagenum : pagenum
		        	}
		        }
		    });
			this.openApiSOPParam = [];
			this.openApiSOPParam.push(searchword);
			this.openApiSOPParam.push(pagenum);
		},
		
		// ServiceAPI 통계주제도 검색
		serviceApiThemetic : function(searchword, pagenum) {
			var sopServiceApiThemeticObj = new sop.openApi.themeticsearch.api();
			sopServiceApiThemeticObj.addParam("title", encodeURIComponent(searchword));
			sopServiceApiThemeticObj.addParam("resultCnt", 5);
			sopServiceApiThemeticObj.addParam("p", pagenum);
			sopServiceApiThemeticObj.request({
		        method : "POST",
		        async : true,
		        url : contextPath+"/ServiceAPI/thematicMap/GetThematicMapList.json",
		        options : {
		        	btntype : "search",
		        	api_id : "9030",
		        	params : {
		        		title : searchword,
		        		resultCnt : 5,
		        		p : pagenum
		        	}
		        }
		    });
			this.serviceApiThemeParam = [];
			this.serviceApiThemeParam.push(searchword);
			this.serviceApiThemeParam.push(pagenum);
		},
		
		// OpenAPI KOSIS 검색
		openApiKOSIS : function(searchword, pagenum) {
			var sopOpenApiKOSISObj = new sop.openApi.kosissearch.api();
			sopOpenApiKOSISObj.addParam("accessToken", accessToken);
			sopOpenApiKOSISObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			sopOpenApiKOSISObj.addParam("pagenum", pagenum);
			sopOpenApiKOSISObj.request({
		        method : "GET",
		        async : true,
		        url : openApiPath+"/OpenAPI3/search/kosis.json",
		        options : {
		        	btntype : "search",
		        	api_id : "API_0503",
		        	params : {
		        		searchword : searchword,
		        		pagenum : pagenum
		        	},
		        	that : this
		        }
		    });
			this.openApiKOSISParam = [];
			this.openApiKOSISParam.push(searchword);
			this.openApiKOSISParam.push(pagenum);
		},
		
		// OpenAPI 지오코딩 검색
		openApiGeocode : function(address) {			
			var sopOpenApiGeocodeObj = new sop.openApi.geocode.api();
			sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
			sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent(address)));
			sopOpenApiGeocodeObj.request({
		        method : "GET",
		        async : true,
		        url : openApiPath+"/OpenAPI3/addr/geocode.json"
		    });
			this.openApiGeocodeParam = [];
			this.openApiGeocodeParam.push(address);
		},
		
		// OpenAPI POI 검색
		openApiPoi : function(pagenum) {
			var sopOpenApiPoiObj = new sop.openApi.poi.api();
			sopOpenApiPoiObj.addParam("accessToken", accessToken);
			sopOpenApiPoiObj.addParam("searchword", encodeURIComponent(encodeURIComponent(this.sKeyword)));
			sopOpenApiPoiObj.addParam("pagenum", pagenum);
			sopOpenApiPoiObj.addParam("resultcount", 10);
			sopOpenApiPoiObj.request({
		        method : "GET",
		        async : true,
		        url : openApiPath+"/OpenAPI3/search/poi.json",
		        options : {
		        	btntype : "search",
		        	api_id : "API_0504",
		        	params : {
		        		searchword : this.sKeyword,
		        		pagenum : pagenum,
		        		resultcount : 10
		        	},
		        	that : this
		        }
		    });
			this.openApiPoiParam = [];
			this.openApiPoiParam.push(pagenum);
		},
		
		openApiReverseGeoCode : function (division, url, title) {
			var sopOpenApiReverseGeoCodeObj = new sop.openApi.ReverseGeoCodeSearch.api();
			sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
			sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
			sopOpenApiReverseGeoCodeObj.addParam("x_coor", this.x);
			sopOpenApiReverseGeoCodeObj.addParam("y_coor", this.y);
			
			sopOpenApiReverseGeoCodeObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
				options : {
					target : this,
					url : url,
					title : title,
					division : division
				}
			});
		},
		
		
		// POI 선택시
		poiClick : function(index) {			
			var tempObj = $searchList.resultData[index];			        	
			var marker = this.markerGroup[index];
			marker.openInfoWindow();
			this.map.mapMove([tempObj.x, tempObj.y], this.map.poiZoomLevel());			
		},
		
		//KOSIS 클릭 시
		kosisClick : function(data, i) {
			var html = "/view/map/interactiveMap/kosis?params=kosis_tb_id=" + data[i].kosis_menu_id + 
				"&gis_se=" + data[i].gis_se + "&kosis_org_id=" + data[i].kosis_inst_cd + "&atdrc_yn=" + data[i].atdrc_yn;
			this.openApiReverseGeoCode('kosis', html, data[i].kosis_menu_nm);
		},
		
		marker_tooltipshow : function(index){										
			var tempObj = $searchList.resultData[index];			
			var html = tempObj.nm;			
			$searchList.hoverMarker(tempObj,index);
			//$('#maptooltip').append('<div id="tooltip"><div class="tipBody">' + tempObj.nm + '</div></div>');						
		},
		marker_tooltiphide : function(index){			
			$('.tipBody').remove();			
		},
		map_move : function(x,y,zoomLeval){
			this.map.mapMove([x, y], zoomLeval);	
		},
		getLocation : function () {			
			if (navigator.geolocation) {				
				navigator.geolocation.getCurrentPosition(function (position) {					
					var data = new sop.LatLng (position.coords.latitude, position.coords.longitude);					
					$searchList.map_move(data.x, data.y, 7);
				});
			}
			else {
				console.log("브라우져가 기능을 제공하지 않습니다.");
			}			
		},
		getsidoLocation : function (x, y, zoomLeval) {			
			$searchList.map_move(x, y, zoomLeval);						
		},
		
		checkRequestEmptyCnt : function() {
			emptyRequestCnt++;
			if (emptyRequestCnt < 5) {
				return;
			}
			
			var searchKeyword = $("#searchKeyword").val();
			var html  = "<div id='emptySearchKeyword'>";
				html += "	<div><p><em>'"+ searchKeyword +"'</em> 에 대한 검색결과가 없습니다.</p></div>";
				html += "	<ul>";
				html += "		<li>&middot; 단어의 철자가 정확한지 확인해 보세요.</li>";
				html += "		<li>&middot; 한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>";
				html += "		<li>&middot; 검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색어 보세요.</li>";
				html += "		<li>&middot; [지역명] 띄워쓰기 [키워드]로 검색어를 입력해 보세요.</li>";
				html += "	</ul>";
				html += "</div>";
			$("#article-wrap").html(html);
		}
		
	};
	
	/*********** OpenAPI 연관검색어 검색 Start **********/
	(function() {
	    $class("sop.openApi.relsearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {	        	
	        	$("#relWordSpan1").empty();
            	$("#relWordSpan2").empty();
            	$("#relWordSpan3").empty();
            	$("#relWordSpan4").empty();
            	$("#relWordSpan5").empty();
            	
	            if(res.errCd == "0") {
	            	$(".drop_search").show();
	            	
	            	var result = res.result;	  
	            	for(var  i = 0; i < result.length; i ++) {
            			if(i == 0) {
            				$("#relWordSpan1").text(result[i].rel_search_word);
            			} else if(i == 1) {
            				$("#relWordSpan2").text(result[i].rel_search_word);
            			} else if(i == 2) {
            				$("#relWordSpan3").text(result[i].rel_search_word);
            			} else if(i == 3) {
            				$("#relWordSpan4").text(result[i].rel_search_word);
            			} else if(i == 4) {
            				$("#relWordSpan5").text(result[i].rel_search_word);
            			}
            			
            			//연관 검색어 클릭 시 이동
            			$("#relWordSpan"+(i+1)).css("cursor", "pointer");
        				$("#relWordSpan"+(i+1)).attr("onclick", "$searchList.goRelSearchWordList('"+result[i].rel_search_word+"')");
	            	}
	            	
	            	//API 로그
	            	apiLogWrite("H0", options);
	            	
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($searchList.openApiRelSearch($searchList.openApiRelSearchParam[0]), 500);
	            }else if(res.errCd == -100){	
	            	setTimeout($searchList.checkRequestEmptyCnt(), 700);
	            	var html = "<div class='drop_search_section_fail'>";
	        		html += res.errMsg;
	        		html += "</div>";	        		
	        		$("#relWordSpan1").html(html);
	            }
	            else {
	            	//messageAlert.open("알림", res.errMsg);
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** OpenAPI 연관검색어 검색 End **********/
	
	/*********** OpenAPI SOP 검색 Start **********/
	(function() {
	    $class("sop.openApi.sopsearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
            	$("#sopListTable").empty();
	            if(res.errCd == "0") {
	            	var result = res.result;
	            	//SOP
	            	var html = "<div class='search_result_list'>";
       			 	html += "<p>대화형 통계지도 검색결과</p>";
       			 	html += "<ul>";
	            	for(var i = 0; i < result.resultdata.length; i++) {
	            		var elem = result.resultdata[i];			//리버스지오코딩 : 법정동->행정동            			
	            		html += "<li id='sopList_"+i+"'><a style='margin-left:20px;' href=\"javascript:$searchList.openApiReverseGeoCode('sop', '"+elem.url + "', '"+elem.nm+"' )\">" + elem.nm + "-"+elem.data_base_year+"년</a>";
	            		html += "</li>";
	            	}
	            	html += "</ul>";
	            	html += "</div>";	            		            
            		$("#sopListTable").html(html);
            		
            		if(result.totalcount > 5){
            			var htmlPage = "<br><br><br><div id='sopPaging' class='pagenation searchPagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
            			$("#sopListTablePage").html(htmlPage);
            		}            		
            		$searchList.sopPaging(result.totalcount, sopCurrentPageIndex);
            		
            		//API 로그
	            	apiLogWrite("H0", options);
            		
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($searchList.openApiSOP($searchList.openApiSOPParam[0], $searchList.openApiSOPParam[1]), 500);
	            } else if (res.errCd == "-100"){
	            	setTimeout($searchList.checkRequestEmptyCnt(), 700);
	            } else {
	            	
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** OpenAPI SOP 검색 End **********/
	
	/*********** ServiceAPI 통계주제도 검색 Start **********/
	(function() {
	    $class("sop.openApi.themeticsearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
            	$("#themeListTable").empty();
	            if(res.errCd == "0") {
	            	var result = res.result;
	            	//통계주제도
	            	if(result.themeMapInfoListCount > 0) {
	            		var html = ""; 
	            		html += "<div class='search_result_list'>";
		      			html += "<p>통계주제도 검색결과</p>";
		      			html += "<ul>";
		      			
		      			for(var i = 0; i < result.themeMapInfoList.length; i++) {
		           			var elem = result.themeMapInfoList[i];            			
		           			html += "<li id='themeList_"+i+"'>";
		           			if(elem.thema_map_type == '02') {
		           				html += "		<a style='margin-left:20px;' href='/view/thematicMap/thematicMapMainOld?theme="+elem.category+"&stat_thema_map_id="+elem.stat_thema_map_id+"&mapType="+elem.thema_map_type+"'>" + elem.category_nm + " > " + elem.title + "</a>";
		           			} else {
		           				html += "		<a style='margin-left:20px;' href='/view/thematicMap/thematicMapMain?theme="+elem.category+"&stat_thema_map_id="+elem.stat_thema_map_id+"&mapType="+elem.thema_map_type+"'>" + elem.category_nm + " > " + elem.title + "</a>";
		           			}
		           			
		           			html += "</li>";
		           		}
			            html += "</ul>";
			            html += "</div>";	            		            
		           		$("#themeListTable").html(html);
		           		
		           		if(result.themeMapInfoListCount > 5){
		           			var htmlPage = "<br><br><br><div id='themePaging' class='pagenation searchPagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
		           			$("#themeListTablePage").html(htmlPage);
		           		}            		
		           		$searchList.themePaging(result.themeMapInfoListCount, themeCurrentPageIndex);
	            	}else {
	            		setTimeout($searchList.checkRequestEmptyCnt(), 700);
	            	}
	            	
	            	//API 로그
	            	apiLogWrite("H0", options);
            		
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($searchList.serviceApiThemetic($searchList.serviceApiThemeParam[0], $searchList.serviceApiThemeParam[1]), 500);
	            } else if (res.errCd == "-100"){
	            	setTimeout($searchList.checkRequestEmptyCnt(), 700);
	            } 
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** ServiceAPI 통계주제도 검색 End **********/
	
	/*********** OpenAPI KOSIS 검색 Start **********/
	(function() {
	    $class("sop.openApi.kosissearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	$("#kosisListTable").empty();
	            if(res.errCd == "0") {
	            	var that = options.that;
	            	var result = res.result;
            		//KOSIS
	            	if(result.resultdata != undefined) {
	            		var html = "<div class='search_result_list'>";
	            			 html += "<p>행정구역통계 검색결과</p>";
	            			 html += "<ul>";
	            		for(var x = 0; x < result.resultdata.length; x ++) {
	            			 var elem = result.resultdata[x];	            										
	            			html += "<li>";
	            			//html += 	"<span><img src='/img/pm/pm_icon_type01.gif' alt='' /></span>";
	            			html += 	"<a style='cursor: pointer;margin-left:20px;'>" /*+ elem.menu_level_nm1 + '  > '*/ + elem.kosis_menu_nm + "</a>";
	            			html += "</li>";
	            		}
	            		html += "</ul>";
	            		html += "</div>";
	            		$("#kosisListTable").append(html);
	            		
	            		//KOSIS 클릭 시 리버스지오코딩을 호출 하기 위해
            			$("#kosisListTable").find("li > a").on('click', function() {
            				that.kosisClick(result.resultdata, $(this).parent().index());
            			});
	            		
	            		if(result.totalcount > 5){
	            		var htmlPage = "<br><div id='kosisPaging' class='pagenation searchPagenation' align='center' style='width: 100%;'><span class='pages'></span>";
	            		$("#kosisListTablePage").html(htmlPage);
	            		}
	            		$searchList.kosisPaging(result.totalcount, kosisCurrentPageIndex);
	            	}
	            	
	            	//API 로그
	            	apiLogWrite("H0", options);
	            	
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($searchList.openApiKOSIS($searchList.openApiKOSISParam[0], $searchList.openApiKOSISParam[1]), 500);
	            } else if (res.errCd == "-100"){
	            	setTimeout($searchList.checkRequestEmptyCnt(), 700);
	            } else {
	                //messageAlert.open("알림", res.errMsg);
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** OpenAPI KOSIS 검색 End **********/
	
	/*********** OpenAPI 지오코딩 검색 Start **********/
	(function() {
	    $class("sop.openApi.geocode.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {	        	
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
	            		
	            		var arrayKey = $searchList.sKeyword.split(" ");
	            		if(arrayKey.length < 2) {
	            			$searchList.addressAdmCd = "";
	            			$searchList.x = "962202";
		            		$searchList.y = "1839421";
	            		} else {
	            			$searchList.addressAdmCd = dongCd;
	            			$searchList.x = result.resultdata[i].x;
		            		$searchList.y = result.resultdata[i].y;
	            		}
	            		
	            		break;
	            	}
	            } else if (res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($searchList.openApiGeocode($searchList.openApiGeocodeParam[0]), 500);
	            	return;
	            }  else if (res.errCd == "-100") {
	            	$searchList.addressAdmCd = "";
        			$searchList.x = "962202";
            		$searchList.y = "1839421";
	            }
	            else {
	                //messageAlert.open("알림", res.errMsg);
	            }
	            
	            var html = "<div class='search_Result_fail'>" +
     		   			   "검색중입니다..." +
     		   			   "</div>";
	            $("#poiListTable").html(html);
	            
	            //SOP 검색
	            var arrayKey = $searchList.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$searchList.openApiSOP($searchList.sKeyword, sopCurrentPageIndex);
	            } else {
	            	$searchList.openApiSOP($searchList.searchKeyword, sopCurrentPageIndex);
	            }
	            
	            //통계주제도 검색
	            if(arrayKey.length < 2) {
	            	$searchList.serviceApiThemetic($searchList.sKeyword, themeCurrentPageIndex);
	            } else {
	            	$searchList.serviceApiThemetic($searchList.searchKeyword, themeCurrentPageIndex);
	            }
	            
	            //KOSIS 검색
	            $searchList.openApiKOSIS($searchList.sKeyword, kosisCurrentPageIndex);
	            
	            //POI 검색 
	            $searchList.openApiPoi(poiCurrentPageIndex);
	        },
	        onFail : function(status) {
	        	//SOP 검색
	        	var arrayKey = $searchList.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$searchList.openApiSOP($searchList.sKeyword, sopCurrentPageIndex);
	            } else {
	            	$searchList.openApiSOP($searchList.searchKeyword, sopCurrentPageIndex);
	            }
	            
	            //통계주제도 검색
	            if(arrayKey.length < 2) {
	            	$searchList.serviceApiThemetic($searchList.sKeyword, themeCurrentPageIndex);
	            } else {
	            	$searchList.serviceApiThemetic($searchList.searchKeyword, themeCurrentPageIndex);
	            }
	            
	            //KOSIS 검색
	            $searchList.openApiKOSIS($searchList.sKeyword, kosisCurrentPageIndex);
	            
	        	//POI 검색
	            $searchList.openApiPoi(poiCurrentPageIndex);
	        }
	    });
	}());
	/*********** OpenAPI 지오코딩 검색 End **********/
	
	/*********** OpenAPI POI 검색 Start **********/
	(function() {
	    $class("sop.openApi.poi.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {	        
	        	$("#poiListTable").empty();
	        	
	        	var searchKeyword = $("#searchKeyword").val();
        		var Keyword = searchKeyword.replace(/(^\s*)|(\s*$)/gi, "");
				var sKeyword = Keyword.replace(/ +/g, " "); 
				var arrayKey = sKeyword.split(" ");					
				var addressKeyword = arrayKey[0];				 
				var searchKeyword = arrayKey[1];	
				
	            if(res.errCd == "0") {
	            	//맵생성
	            	if($searchList.firstBoolean) {
	            		$(".search_map").show();
	            		$searchList.createMap();
	            	}
	            	$searchList.removeMarker();	//마커삭제
	            	$searchList.firstBoolean = false;
	            	
	            	var result = res.result;	            	
					
	            	var htmlSearch = "<div class='drop_search_result'>";	            	
	            		 if(arrayKey.length == 1){	            			 
	            			 htmlSearch += "<p class='result_type1'><span>'"+ addressKeyword +"'</span> 검색결과 <strong>"+ appendCommaToNumber(result.totalcount) +"</strong>개</p></div>";  
	            		 }else {
	            			 htmlSearch += "<p class='result_type1'><span>'"+ addressKeyword +" "+ searchKeyword +"'</span> 검색결과 <strong>"+ appendCommaToNumber(result.totalcount) +"</strong>개</p></div>";
	            			 //htmlSearch += "<p class='result_type1'><span>'"+ addressKeyword +"'</span> 의 <span>'"+ searchKeyword +"'</span> 검색결과 <strong>"+ appendCommaToNumber(result.totalcount) +"</strong>개</p></div>"; 
	            		 }	            		            		 	            		 	            		            		 
	            		 $("#search_result").html(htmlSearch);
	            		
	            		 if(result.totalcount > 10){
	            			var htmlPage = "<div id='poiPaging' class='pagenation searchPagenation' align='center' style='position:absolute; top: 500px; left: 650px;'><span class='pages'></span></div>";
		            		$("#poiListTablePage").html(htmlPage);
		            		
		            		//연관 검색어가 있을 경우 top 픽셀을 변경한다.
		            		if($(".drop_search").is(":visible")) {
//		            			$("#poiPaging").css("top", "575px");
		            			$("#poiPaging").css("top", "610px");
		            		}
	            		} 		            		
	            		 	            							
	            	var html = "";
	            	$searchList.resultData = result.resultdata;
	            	for(var  i = 0; i < result.resultdata.length; i ++) {
	            		var markercount = i+1+".png";	            		
	            		html += "<div calss='poiList' style='margin-top:3px;margin-left:3px; height:45px;'><img src='/img/marker/" + markercount + "' style='margin-top:7px;'/></div>";
	            		html += "<div><li><a href='javascript:$searchList.poiClick(" + i + ")' onmouseover='$searchList.marker_tooltipshow(" + i + ");return false;' onmouseout='$searchList.marker_tooltiphide(" + i + ");return false;'>" + result.resultdata[i].nm +"</a></div>";	
	            		html += "<div style='height:5px;'></div>"
            			html += "<div class='poiAddr'><p style=margin-top:-10px;margin-left:53px>" +result.resultdata[i].adm_addr+"</P></div></li>";
            			html += "<div style='height:10px;'></div>"
            			//$searchList.getHtml(result.resultdata[i], html);
	            	}	            	
	            	$("#poiListTable").html(html);	            	
	            	
	            	$searchList.poiPaging(result.totalcount, poiCurrentPageIndex);
	            	
	            	if (result.resultdata.length > 0) {
	            		//마커생성
	        			$searchList.addMarker(result.resultdata);
	        			$("#poiTable").show();
	            	}else {
	            		$("#poiTable").hide();
	            	}
	            	
	            	//API 로그
	            	apiLogWrite("H0", options);
	            	
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout($searchList.openApiPoi($searchList.openApiPoiParam[0]), 500);
	            } else if(res.errCd == "-100"){
	            	setTimeout($searchList.checkRequestEmptyCnt(), 700);
	            	var html = "<div class='search_Result_fail'>";
	        		html += res.errMsg;
	        		html += "</div>";	        		
	        		$("#poiListTable").html(html);
	        		
//	        		var html = "<div class='sopListTablefail'>";
//	        		html += "'" + sKeyword + "' 에 대한 POI " + res.errMsg;
//	        		html += "</div>";	        		
//	        		$("#search_result").html(html);
	        		
//	            	var arrayKey = $searchList.sKeyword.split(" ");
//            		if(arrayKey.length < 2) {            			
//            			$searchList.getLocation();
//            		} else {            			
//            			$searchList.getsidoLocation($searchList.x, $searchList.y, 4);
//            		}
	            }	        	
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** OpenAPI POI 검색 End **********/
	
	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.ReverseGeoCodeSearch.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {					
					var result = res.result[0];
					if($searchList.addressAdmCd != "") {
						if (options.division == "sop") {		//SOP
							if($searchList.addressAdmCd.length == 2) {
								$searchList.addressAdmCd = result.sido_cd;
							}else if ($searchList.addressAdmCd.length == 5) {
								$searchList.addressAdmCd = result.sido_cd + result.sgg_cd;
							}else if ($searchList.addressAdmCd.length == 7) {
								$searchList.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
							}else {
								$searchList.addressAdmCd = "00";
							}
						} else {	//KOSIS
							$searchList.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
						}
					}
					
					if ($searchList.addressAdmCd == "") {
						$searchList.addressAdmCd = "00";
					}
					
					if (options.url.indexOf("?params") != -1) {
						window.location.href = options.url+
						   "&adm_cd="+$searchList.addressAdmCd+
						   "&x="+$searchList.x+
						   "&y="+$searchList.y+
//						   "&title=" + decodeURIComponent(options.title);
						   "&title=" + encodeURIComponent(options.title);
					}else {
						window.location.href = options.url;
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiReverseGeoCode(options.division, options.url, options.title);
					});
					
				}
				else {
					if ($searchList.addressAdmCd == "") {
						$searchList.addressAdmCd = "00";
					}
					if (options.url.indexOf("?params") != -1) {
						window.location.href = options.url+
						   "&adm_cd="+$searchList.addressAdmCd+
						   "&x="+$searchList.x+
						   "&y="+$searchList.y+
//						   "&title="+options.title;
						   "&title="+encodeURIComponent(options.title);
					}else {
						window.location.href = options.url;
					}
				}
			},
			onFail : function (status) {
				if ($searchList.addressAdmCd == "") {
					$searchList.addressAdmCd = "00";
				}
				if (options.url.indexOf("?params") != -1) {
					window.location.href = options.url+
					   "&adm_cd="+$searchList.addressAdmCd+
					   "&x="+$searchList.x+
					   "&y="+$searchList.y+
//					   "&title="+options.title;
					   "&title="+encodeURIComponent(options.title);
				}else {
					window.location.href = options.url;
				}
			}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩. End ********* */
	
}(window, document));