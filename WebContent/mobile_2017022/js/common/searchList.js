(function(W, D) {
	W.$searchList = W.$searchList || {};
	$(document).ready(function() {
		$("#search-form").submit(function() {
			if ($searchList.searchValidate()) {
				location.href = "/mobile/html/common/searchList.html?searchKeyword=" + $("#searchKeyword").val();
			}
			return false;
		});
		$searchList.initialize();
	});
	$searchList = {
		openApiSOPParam: [], //OpenAPI SOP 검색 파라미터
		openApiRelSearchParam: [], //OpenAPI 연관검색어 검색 파라미터
		serviceApiThemeParam: [], //ServiceAPI 통계주제도 검색 파라미터
		openApiGeocodeParam: [], //OpenAPI 지오코딩 검색 파라미터
		sopCurrentPageIndex: 0, //SOP 현재 페이지
		themeCurrentPageIndex: 0, //통계주제도 현재 페이지
		emptyRequestCnt: 0,
		sKeyword: null, //전체 검색어
		addressKeyword: null, //검색어의 앞단어(주소)
		searchKeyword: null, //검색어의 뒷단어(검색어)
		x: "989674", //X좌표
		y: "1818313", //Y좌표
		initialize: function() {
			if (getParameter("searchKeyword") != undefined) {
				$searchList.sKeyword = decodeURIComponent(getParameter("searchKeyword"));
				$("#searchKeyword").val($searchList.sKeyword);
				$("#searchKeyword").select();
				$searchList.keywordSplit();
			}
		},
		//검색어 자르기
		keywordSplit: function() {
			if (this.searchValidate()) {
				this.sKeyword = $("#searchKeyword").val();
				this.sKeyword = this.sKeyword.replace(/(^\s*)|(\s*$)/gi, "");
				this.sKeyword = this.sKeyword.replace(/ +/g, " ");
				var arrayKey = this.sKeyword.split(" ");

				this.addressKeyword = arrayKey[0];
				this.searchKeyword = arrayKey[1];

				//결과없음 카운트 초기화
				$searchList.emptyRequestCnt = 0;

				if (arrayKey.length < 2) {
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
		//검색어 유효성 검사
		searchValidate: function() {
			var searchword = $("#searchKeyword").val();
			var arrayKey = searchword.split(" ");
			if (searchword == "") {
				messageAlert.open("알림", "검색어를 입력하세요.");
				return false;
			}
			return true;
		},
		checkRequestEmptyCnt: function() {
			$searchList.emptyRequestCnt++;
			if ($searchList.emptyRequestCnt < 3) {
				return;
			}
			var searchKeyword = $("#searchKeyword").val();
			$("#article-wrap").html(
				'<div class="SearchCount NoResult">' +
				'<strong class="Word">' + searchKeyword + '</strong>에 대한 검색결과가 없습니다.' +
				'<ul>' +
				'<li>단어의 철자가 정확한지 확인해 보세요.</li>' +
				'<li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>' +
				'<li>검색어의 단어 수를 주링거나, 보다 일반적인 검색어로 다시 검색해 보세요.</li>' +
				'<li>[지역명] 띄워쓰기 [키워드]로 검색어를 입력해 보세요.</li>' +
				'</ul>' +
				'</div>'
			);
		},
		// OpenAPI 지오코딩 검색
		openApiGeocode: function(address) {
			var sopOpenApiGeocodeObj = new sop.openApi.geocode.api();
			sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
			sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent(address)));
			sopOpenApiGeocodeObj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/addr/geocode.json"
			});
			this.openApiGeocodeParam = [];
			this.openApiGeocodeParam.push(address);
		},
		openApiReverseGeoCode: function(division, url, title) {
			var sopOpenApiReverseGeoCodeObj = new sop.openApi.ReverseGeoCodeSearch.api();
			sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
			sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
			sopOpenApiReverseGeoCodeObj.addParam("x_coor", this.x);
			sopOpenApiReverseGeoCodeObj.addParam("y_coor", this.y);

			sopOpenApiReverseGeoCodeObj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/addr/rgeocode.json",
				options: {
					target: this,
					url: url,
					title: title,
					division: division
				}
			});
		},
		// OpenAPI 연관검색어 검색
		openApiRelSearch: function(searchword) {
			var sopOpenApiRelsearchObj = new sop.openApi.relsearch.api();
			sopOpenApiRelsearchObj.addParam("accessToken", accessToken);
			sopOpenApiRelsearchObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			sopOpenApiRelsearchObj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/search/relword.json"
			});
			this.openApiRelSearchParam = [];
			this.openApiRelSearchParam.push(searchword);
		},
		//인터렉티브맵 검색결과
		openApiSOP: function(searchword, pagenum) {
			var sopOpenApiSOPObj = new sop.openApi.sopsearch.api();
			sopOpenApiSOPObj.addParam("accessToken", accessToken);
			sopOpenApiSOPObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			sopOpenApiSOPObj.addParam("pagenum", pagenum);
			sopOpenApiSOPObj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/search/sop.json"
			});
			this.openApiSOPParam = [];
			this.openApiSOPParam.push(searchword);
			this.openApiSOPParam.push(pagenum);
		},
		// ServiceAPI 통계주제도 검색
		serviceApiThemetic: function(searchword, pagenum) {
			var sopServiceApiThemeticObj = new sop.openApi.themeticsearch.api();
			sopServiceApiThemeticObj.addParam("title", encodeURIComponent(searchword));
			sopServiceApiThemeticObj.addParam("resultCnt", 5);
			sopServiceApiThemeticObj.addParam("p", pagenum);
			sopServiceApiThemeticObj.request({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/thematicMap/GetThematicMapList.json"
			});
			this.serviceApiThemeParam = [];
			this.serviceApiThemeParam.push(searchword);
			this.serviceApiThemeParam.push(pagenum);
		},
		//페이징 만들기
		createPaging: function(tableName, totalCount, currentIndexName) {
			var pageSize = 5;
			var totalPage = Math.ceil(totalCount / pageSize);
			var firstPage = $("<a/>", {
				"class": "PasingFst " + ($searchList[currentIndexName] > 0 ? "" : "PasingOff"),
				href: "#",
				title: "맨앞",
				text: "◀◀"
			}).click(function() {
				if ($searchList[currentIndexName] > 0) {
					$searchList[currentIndexName] = 0;
					if(currentIndexName=="sopCurrentPageIndex"){
						$searchList.openApiSOP($searchList.searchKeyword, 0);
					}else if(currentIndexName=="themeCurrentPageIndex"){
						$searchList.serviceApiThemetic($searchList.searchKeyword, 0);
					}
				}
				return false;
			});
			var prePage = $("<a/>", {
				"class": "PasingForward " + ($searchList[currentIndexName] > 0 ? "" : "PasingOff"),
				href: "#",
				title: "이전",
				text: "◀"
			}).click(function() {
				if ($searchList[currentIndexName] > 0) {
					$searchList[currentIndexName] = $searchList[currentIndexName] - 1;
					if(currentIndexName=="sopCurrentPageIndex"){
						$searchList.openApiSOP($searchList.searchKeyword, $searchList[currentIndexName]);
					}else if(currentIndexName=="themeCurrentPageIndex"){
						$searchList.serviceApiThemetic($searchList.searchKeyword, $searchList[currentIndexName]);
					}
				}
				return false;
			});
			var currentPage = $("<span/>", {
				html: '<strong>' + ($searchList[currentIndexName] + 1) + '</strong>&#47;' + totalPage
			});
			var nextPage = $("<a/>", {
				"class": "PasingNext " + ($searchList[currentIndexName] < (totalPage - 1) ? "" : "PasingOff"),
				href: "#",
				title: "다음",
				text: "▶"
			}).click(function() {
				if ($searchList[currentIndexName] < (totalPage - 1)) {
					$searchList[currentIndexName] = $searchList[currentIndexName] + 1;
					if(currentIndexName=="sopCurrentPageIndex"){
						$searchList.openApiSOP($searchList.searchKeyword, $searchList[currentIndexName]);
					}else if(currentIndexName=="themeCurrentPageIndex"){
						$searchList.serviceApiThemetic($searchList.searchKeyword, $searchList[currentIndexName]);
					}
				}
				return false;
			});
			var lastPage = $("<a/>", {
				"class": "PasingLst " + ($searchList[currentIndexName] < (totalPage - 1) ? "" : "PasingOff"),
				href: "#",
				title: "맨끝",
				text: "▶▶"
			}).click(function() {
				if ($searchList[currentIndexName] < (totalPage - 1)) {
					$searchList[currentIndexName] = totalPage - 1;
					if(currentIndexName=="sopCurrentPageIndex"){
						$searchList.openApiSOP($searchList.searchKeyword, totalPage - 1);
					}else if(currentIndexName=="themeCurrentPageIndex"){
						$searchList.serviceApiThemetic($searchList.searchKeyword, totalPage - 1);
					}
				}
				return false;
			});
			$("#" + tableName + "Page").append(firstPage, prePage, currentPage, nextPage, lastPage);
		}
	};
	/*********** OpenAPI 연관검색어 검색 Start **********/
	(function() {
		$class("sop.openApi.relsearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				$("#related-word").empty().hide();
				if (res.errCd == "0") {
					var result = res.result;
					for (var i = 0; i < (result.length > 4 ? 4 : result.length); i++) {
						$("#related-word").append(
							i > 0 ? "," : "",
							$("<a/>", {
								href: "/mobile/html/common/searchList.html?searchKeyword=" + result[i].rel_search_word,
								text: result[i].rel_search_word,
							})
						);
					}
					if (result.length > 0) {
						$("#related-word").prepend("연관검색어 : ").show();
					}
				} else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout($searchList.openApiRelSearch($searchList.openApiRelSearchParam[0]), 500);
				} else if (res.errCd == -100) {
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				} else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** OpenAPI 연관검색어 검색 End **********/
	/*********** OpenAPI SOP 검색 Start **********/
	(function() {
		$class("sop.openApi.sopsearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				var tableName = "sopListTable";
				$("#" + tableName).empty();
				if (res.errCd == "0") {
					var result = res.result;
					if (result.totalcount > 0) {
						var elementList = $("<dd/>", {
							"class": "ResultList"
						});
						$.each(result.resultdata, function() {
							var url = this.url.substring(0,this.url.indexOf("?"));
							var type = {
								totalindex:"0301",
								population:"0302",
								company:"0304",
								household:"0305",
								house:"0306",
								farmhousehold:"0307",
								forestryhousehold:"0308",
								fisheryhousehold:"0309",
								householdmember:"0310",
								kosis:"kosis"
							};
							var typeParameter = encodeURIComponent("type="+type[url.substring(url.lastIndexOf("/")+1,url.length)]+"&");
							var javascriptFunction = "$searchList.openApiReverseGeoCode('sop', '/mobile/html/interactive/interactiveMap.html?"+typeParameter + this.url.substring(this.url.indexOf("?")+1) + "','" + this.nm + "' )"; 
							if(type[url.substring(url.lastIndexOf("/")+1,url.length)]=="kosis"){
								javascriptFunction = 'messageAlert.open("알림", "kosis데이터는 모바일에서 조회할 수 없습니다");';
							}
							$(elementList).append(
								$("<a/>", {
									href:"javascript:"+javascriptFunction ,
									html: this.nm
								})
							);
						});
						$("#" + tableName).append(
							$("<dt/>", {
								html: "대화형 통계지도 검색결과 <span>(" + result.totalcount + ")</span>"
							}),
							elementList,
							$("<dd/>", {
								id: tableName + "Page",
								"class": "Pasing"
							})
						);
						$searchList.createPaging(tableName, result.totalcount, "sopCurrentPageIndex");
					}
				} else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout($searchList.openApiSOP($searchList.openApiSOPParam[0], $searchList.openApiSOPParam[1]), 500);
				} else if (res.errCd == "-100") {
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** OpenAPI SOP 검색 End **********/
	/*********** ServiceAPI 통계주제도 검색 Start **********/
	(function() {
		$class("sop.openApi.themeticsearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				var tableName = "themeListTable";
				$("#" + tableName).empty();
				if (res.errCd == "0") {
					var result = res.result;
					//통계주제도
					if (result.themeMapInfoListCount > 0) {
						var result = res.result;
						var elementList = $("<dd/>", {
							"class": "ResultList"
						});
						$.each(result.themeMapInfoList, function() {
							$(elementList).append(
								$("<a/>", {
									href: "/mobile/html/thematicMap/thematicMapMain.html?theme=" + this.category + "&stat_thema_map_id=" + this.stat_thema_map_id + "&mapType=" + this.thema_map_type,
									html: this.title
								})
							);
						});
						$("#" + tableName).append(
							$("<dt/>", {
								html: "통계주제도 검색결과 <span>(" + result.themeMapInfoListCount + ")</span>"
							}),
							elementList,
							$("<dd/>", {
								id: tableName + "Page",
								"class": "Pasing"
							})
						);
						$searchList.createPaging(tableName, result.themeMapInfoListCount, "themeCurrentPageIndex");
					} else {
						setTimeout($searchList.checkRequestEmptyCnt(), 300);
					}

				} else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout($searchList.serviceApiThemetic($searchList.serviceApiThemeParam[0], $searchList.serviceApiThemeParam[1]), 500);
				} else if (res.errCd == "-100") {
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** ServiceAPI 통계주제도 검색 End **********/
	/*********** OpenAPI 지오코딩 검색 Start **********/
	(function() {
		$class("sop.openApi.geocode.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;
					for (var i = 0; i < result.resultdata.length; i++) {
						var dongCd = "";
						if (result.resultdata[i].addr_type == "1") { //시도
							dongCd = "00";
						} else if (result.resultdata[i].addr_type == "2") { //시군구
							dongCd = "00000";
						} else {
							dongCd = "0000000"; //읍면동
						}

						var arrayKey = $searchList.sKeyword.split(" ");
						if (arrayKey.length < 2) {
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
				} else if (res.errCd == "-100") {
					$searchList.addressAdmCd = "";
					$searchList.x = "962202";
					$searchList.y = "1839421";
				} else {
					//messageAlert.open("알림", res.errMsg);
				}

				var html = "<div class='search_Result_fail'>" +
					"검색중입니다..." +
					"</div>";
				$("#poiListTable").html(html);

				//SOP 검색
				var arrayKey = $searchList.sKeyword.split(" ");
				if (arrayKey.length < 2) {
					$searchList.openApiSOP($searchList.sKeyword, $searchList.sopCurrentPageIndex);
				} else {
					$searchList.openApiSOP($searchList.searchKeyword, $searchList.sopCurrentPageIndex);
				}

				//통계주제도 검색
				if (arrayKey.length < 2) {
					$searchList.serviceApiThemetic($searchList.sKeyword, $searchList.themeCurrentPageIndex);
				} else {
					$searchList.serviceApiThemetic($searchList.searchKeyword, $searchList.themeCurrentPageIndex);
				}
			},
			onFail: function(status) {
				//SOP 검색
				var arrayKey = $searchList.sKeyword.split(" ");
				if (arrayKey.length < 2) {
					$searchList.openApiSOP($searchList.sKeyword, $searchList.sopCurrentPageIndex);
				} else {
					$searchList.openApiSOP($searchList.searchKeyword, $searchList.sopCurrentPageIndex);
				}

				//통계주제도 검색
				if (arrayKey.length < 2) {
					$searchList.serviceApiThemetic($searchList.sKeyword, $searchList.themeCurrentPageIndex);
				} else {
					$searchList.serviceApiThemetic($searchList.searchKeyword, $searchList.themeCurrentPageIndex);
				}
			}
		});
	}());
	/*********** OpenAPI 지오코딩 검색 End **********/

	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function() {
		$class("sop.openApi.ReverseGeoCodeSearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					var result = res.result[0];
					if ($searchList.addressAdmCd != "") {
						if (options.division == "sop") { //SOP
							if ($searchList.addressAdmCd.length == 2) {
								$searchList.addressAdmCd = result.sido_cd;
							} else if ($searchList.addressAdmCd.length == 5) {
								$searchList.addressAdmCd = result.sido_cd + result.sgg_cd;
							} else if ($searchList.addressAdmCd.length == 7) {
								$searchList.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
							} else {
								$searchList.addressAdmCd = "00";
							}
						} else { //KOSIS
//							$searchList.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
							messageAlert.open("알림", "모바일에선 kosis데이터를 조회할 수 없습니다");
							return;
						}
					}

					window.location.href = options.url +
						"&adm_cd=" + $searchList.addressAdmCd +
						"&x=" + $searchList.x +
						"&y=" + $searchList.y +
						"&title=" + options.title;

				} else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(that.openApiReverseGeoCode(options.division, options.url, options.title), 500);
				} else {
					window.location.href = options.url +
						"&adm_cd=" + $searchList.addressAdmCd +
						"&x=" + $searchList.x +
						"&y=" + $searchList.y +
						"&title=" + options.title;
				}
			},
			onFail: function(status) {}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩. End ********* */
}(window, document));