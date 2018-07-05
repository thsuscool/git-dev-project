/**
 * 
 */
(function (W, D) {
	W.$thematicMapList = W.$thematicMapList || {};
	var pageSize=5;
	$(document).ready(function () {
		$thematicMapList.param = getAllParameter();
		
		// 통계주제도 리스트 API 호출
		$thematicMapList.request.getStatsThemeMapList($thematicMapList.param);
		
		// 통계주제도 카테고리 API 호출
		$thematicMapList.request.getCategory($thematicMapList.param.theme);
		$thematicMapList.isSearch = false;
		
		// 검색버튼 클릭이벤트
		$(".sbm input").click(function () {
			$thematicMapList.isSearch = true;
//			var statusType = $("#atc-sel2").val();
			var statusType = "";
			var searchText = $("#atc-kwd").val();
			var validation = $thematicMapList.formatter.searchWordValidation(statusType, searchText);
			$thematicMapList.ui.currendPageIndex = 0;
			if (validation) {
				$thematicMapList.search = {
					title : searchText,
					article_div : statusType
				};
				$thematicMapList.request.getStatsThemeMapList($thematicMapList.param, $thematicMapList.search);
			}
			
		});
		
		$("#atc-kwd").mousedown(function () {
			$(this).val("");
		});
		$(".article-search .f-el .el-b input").bind("keydown", function (event) {
			if (event.which === 13) {
				$("#themeSearchBtn").click();
			}
		});
		
	});
	
	$thematicMapList.ui = {
		pageSize : pageSize,
		currendPageIndex : 0,
		pagenation : function (totalCnt, pageSize, currentPageNum) {
			var resNum = totalCnt % pageSize ? 1 : 0;
			var showPageSize = parseInt(totalCnt / pageSize) + resNum;
			$('.pagenation .pages').paging({
				current : currentPageNum,
				max : showPageSize,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function (e, page) { // 페이지 선택 시
					$thematicMapList.ui.currendPageIndex = page;
					$thematicMapList.request.getStatsThemeMapList($thematicMapList.param, $thematicMapList.search);
				}
			});
			
		}
	};
	$thematicMapList.search = {};
	$thematicMapList.request = {
		getStatsThemeMapList : function (paramObj, searchParam) {
			var requestParam = {
				cate_id : paramObj.theme,
				resultCnt : $thematicMapList.ui.pageSize
			};
			
			if (!sop.Util.isUndefined(paramObj.resultCnt) && paramObj.resultCnt.length > 0) {
				requestParam.resultCnt = paramObj.resultCnt;
			}
			
			if ($thematicMapList.ui.currendPageIndex != 0) {
				requestParam.p = $thematicMapList.ui.currendPageIndex - 1;
			}
			else {
				requestParam.p = $thematicMapList.ui.currendPageIndex;
			}
			if ($thematicMapList.isSearch) {
				if (!sop.Util.isUndefined(searchParam.title) && searchParam.title.length > 0) {
					requestParam.title = encodeURIComponent(searchParam.title);
				}
				
				if (!sop.Util.isUndefined(searchParam.article_div) && searchParam.article_div.length > 0) {
					requestParam.article_div = encodeURIComponent(searchParam.article_div);
				}
			}
			$statsPotal.api.thematicMap.getStatsThemeMapList({
				param : requestParam,
				method : 'POST',
				success : $thematicMapList.response.successStatsThemeMapList
			});
		},
		getSearchWordStatsThemeMapList : function (theme, title, article_div) {
			var requestParam = {
				cate_id : theme,
				resultCnt : pageSize
			};
			
			if (!sop.Util.isUndefined(title) && title.length > 0) {
				requestParam.title = encodeURIComponent(title);
			}
			
			if (!sop.Util.isUndefined(article_div) && article_div.length > 0) {
				requestParam.article_div = encodeURIComponent(article_div);
			}
			$statsPotal.api.thematicMap.getStatsThemeMapList({
				param : requestParam,
				method : 'POST',
				success : $thematicMapList.response.successStatsThemeMapList
			});
		},
		// 테마 정보
		getCategory : function (theme) {
			$statsPotal.api.thematicMap.getCategory({
				method : 'POST',
				param : {
					cate_id : theme
				},
				success : $thematicMapList.response.successCateList
			});
		}
	};
	
	$thematicMapList.response = {
		successStatsThemeMapList : function (status, res) {
			if (res.errCd === 0) {				
				var statsThemeHtml = $thematicMapList.formatter.getStatsThemeListHtml(res.result.themeMapInfoList);
				$("#themeStatsList").html(statsThemeHtml);
				
				$thematicMapList.ui.pagenation(res.result.themeMapInfoListCount, $thematicMapList.ui.pageSize, res.result.currentPage);
				
				if ($thematicMapList.isSearch) {
					var resultCntHtml = $thematicMapList.formatter.resultCountHtml(res.result.themeMapInfoListCount, $thematicMapList.search.title);
					$(".search-result").html(resultCntHtml);
				}
				else {
					var resultCntHtml = $thematicMapList.formatter.resultCountHtml(res.result.themeMapInfoListCount);
					$(".search-result").html(resultCntHtml);
				}
			}
		},
		successCateList : function (status, res) {
			if (res.errCd === 0) {
				var cateInfo = res.result.cateList[0];
				$('.ctit').html(cateInfo.category_nm);
				var url = statsPotalDomain + "/view/board/qnaAndRequest?type=thema&categoryCd=THEMRQ";
				var tempHtml = "<div align='right'><a href=" + url + " style='color: #3c9cd7;'><img src='/img/tm/img_thematicUser.png' alt='요청하기' style='width:40px;margin: 0px 0px -7px 0px;'/><b> 통계주제도 요청하기</b></a></div>";
				$('.smr').html(cateInfo.exp + tempHtml);				
				var html='/view/thematicMap/thematicMapList?theme='+ cateInfo.category;
				$('#currentCateNm').html(cateInfo.category_nm);
				$('#currentPageHref').attr('href',html);
			}
		}
	};
	
	$thematicMapList.formatter = {
		getStatsThemeListHtml : function (statsThemeListObj) {
			var statsThemeListObjHtml = '';
			
			var themeListObjHml = "";
			var root = $("<ul>"), tmp;
			
			for ( var i = 0; i < statsThemeListObj.length; i++) {
				statsThemeListObjHtml = '<li>';
				statsThemeListObjHtml += '<div class="inner"><p class="subject1" align="center" style="float:left">';
				statsThemeListObjHtml += '<a href="/view/thematicMap/thematicMapMain.view?theme=' + statsThemeListObj[i].category + '&stat_thema_map_id=' + statsThemeListObj[i].stat_thema_map_id + '&mapType=' + statsThemeListObj[i].thema_map_type + '" style="font-size:18px">';
				statsThemeListObjHtml += statsThemeListObj[i].title;
				statsThemeListObjHtml += '</a></p>';
				statsThemeListObjHtml += '<img src="/img/tm/theme_list_info.png" width="20" height="20" style="cursor: pointer; margin:-2px 0 0 10px;" title="" />'; 
				
				var str = "· 지역범위 : ";
				
				if(statsThemeListObj[i].stat_disp_level == '01') {
					str += "시도";
				} else if(statsThemeListObj[i].stat_disp_level == '02') {
					str += "시도 + 시군구";
				} else if(statsThemeListObj[i].stat_disp_level == '03') {
					str += "시도 + 시군구 + 읍면동";
				} else {
					str += "시도 + 시군구 + 읍면동 + 집계구";
				}
				
				str += "</br>";
				str += "· 표현방법 : " + statsThemeListObj[i].disp_method;
				str += "</br>";
				
				if(statsThemeListObj[i].rel_stat_info == "통계개발원, 생애주기별 주요특성 및 변화분석(2014. 11)") {
					str += '<a href="http://kostat.go.kr/portal/korea/kor_nw/2/1/index.board?bmode=read&bSeq=&aSeq=332081&pageNo=1&rowNum=10&navCount=10&currPg=&sTarget=title&sTxt=%EC%83%9D%EC%95%A0%EC%A3%BC%EA%B8%B0" target="_blank">';
					str += "· 출처 : " + statsThemeListObj[i].rel_stat_info;
					str += '</a>';
				} else {
					str += "· 출처 : " + statsThemeListObj[i].rel_stat_info;
				}
				
				statsThemeListObjHtml += '<p class="date" style="margin-left: 10px;">' + str + ' </p>';
				statsThemeListObjHtml += '</div>';
				statsThemeListObjHtml += '</li>';
				
				tmp = $(statsThemeListObjHtml);
				root.append(tmp);
				
				$thematicMapList.formatter.createInfoTooltip(tmp, statsThemeListObj[i]);
				
			}
			
			return root;
		},
		
		createInfoTooltip : function(tmp, obj) {
			$(tmp).tooltip({
				position : {my: "left+25 top-10"},
//				position : "center right",
				track: true,
				tooltipClass : "layer_alarm_pop",
				content : function() {
					var html =  "<div class='layer_alarm_pop'>" +
									"<p>" +
										"<font size='2' style='font-weight: bold;'>" + obj.thema_exp + "</font><br>" +
								    "</p>" +
							    "</div>" +
							    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

					return html;
				},
				
				open: function (event, ui) {
			        ui.tooltip.css("max-width", "400px");
			    },
			});
		},
		
		searchWordValidation : function (data, text) {
			if (sop.Util.isUndefined(text) || !text.length > 0) {				
				messageAlert.open('', '검색어가 입력되지 않습니다.');
				return false;
			}
			if (!IsValid("formInput", text)) {
				return false;
			}
			return true;
		},
		resultCountHtml : function (count, searchWord) {
			var resultCountHtml = '';
			if (searchWord) {
				resultCountHtml += '<span class="keyword">"' + searchWord + '"</span> ';
				resultCountHtml += '검색결과 ';
			}
			resultCountHtml += '<span class="count">' + count + '</span>';
			resultCountHtml += '건을 찾았습니다.';
			return resultCountHtml;
		}
	};
	
}(window, document));
