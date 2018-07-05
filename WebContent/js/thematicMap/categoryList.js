/**
 * 통계주제도
 * 
 * history : 네이버시스템(주), 1.0, 2014/10/08 초기 작성 author : 윤지혜 version : 1.0 see :
 * 
 */
(function (W, D) {
	W.$categoryList = W.$categoryList || {};
	var pageSize=4;
	var categoryList = [];
	
	$(document).ready(function () {
		$categoryList.request.getCategory();
		$categoryList.request.getCategoryList();
//		$("#container").css("min-width","970px");
		
		var url = statsPotalDomain + "/view/board/qnaAndRequest?type=thema&categoryCd=THEMRQ";
		var tempHtml = "<div align='right'><a href=" + url + " style='color: #3c9cd7;'><img src='/img/tm/img_thematicUser.png' alt='요청하기' style='width:40px; height:33px; margin: 0px 0px -10px 0px;'/><b> 통계주제도 요청하기</a></b></div>";
		//var tempHtml = "<div align='right' style='width: 80px;height: 20px;font-size: 10px;border: none;background: none;color: #fff;background-color: #ee7200;font-weight: bold;'><a href=" + url + "'>통계주제도 요청하기</a></div>";
		$('.smr').append(tempHtml);
		
		$categoryList.isSearch = false;
		
		// 검색 버튼
		$(".sbm input").click(function () {
			$categoryList.isSearch = true;
			var searchText = $("#atc-kwd").val();
			var validation = $categoryList.formatter.searchWordValidation(searchText);
			if (validation) {
				$categoryList.search = {
					title : searchText,
				};
				$categoryList.request.getCategoryList();
			}
			
		});
		
		//검색어 input
		$("#atc-kwd").mousedown(function () {
			$(this).val("");
		});
		
		$(".article-search .f-el .el-b input").bind("keydown", function (event) {
			if (event.which === 13) {
				$("#themeSearchBtn").click();
			}
		});
	});
	
	$categoryList.ui = {
		pageSize : pageSize,
		currendPageIndex : 0,
		pagenation1 : function (totalCnt, pageSize, currentPageNum) {
			var resNum = totalCnt % pageSize ? 1 : 0;
			var showPageSize = parseInt(totalCnt / pageSize) + resNum;
			
			if(showPageSize < 2) {
				$('.pagenation1 .pages').hide();
			} else {
				$('.pagenation1 .pages').show();
			}
			
			$('.pagenation1 .pages').paging({
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
					$categoryList.ui.currendPageIndex = page;
					$categoryList.request.getCategoryList1("CTGR_001", page);
				}
			});
		},
		
		pagenation2 : function (totalCnt, pageSize, currentPageNum) {
			var resNum = totalCnt % pageSize ? 1 : 0;
			var showPageSize = parseInt(totalCnt / pageSize) + resNum;
			
			if(showPageSize < 2) {
				$('.pagenation2 .pages').hide();
			} else {
				$('.pagenation2 .pages').show();
			}
			
			$('.pagenation2 .pages').paging({
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
					$categoryList.ui.currendPageIndex = page;
					$categoryList.request.getCategoryList1("CTGR_002", page);
				}
			});
		},
		
		pagenation3 : function (totalCnt, pageSize, currentPageNum) {
			var resNum = totalCnt % pageSize ? 1 : 0;
			var showPageSize = parseInt(totalCnt / pageSize) + resNum;
			
			if(showPageSize < 2) {
				$('.pagenation3 .pages').hide();
			} else {
				$('.pagenation3 .pages').show();
			}
			
			$('.pagenation3 .pages').paging({
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
					$categoryList.ui.currendPageIndex = page;
					$categoryList.request.getCategoryList1("CTGR_003", page);
				}
			});
		},
		
		pagenation4 : function (totalCnt, pageSize, currentPageNum) {
			var resNum = totalCnt % pageSize ? 1 : 0;
			var showPageSize = parseInt(totalCnt / pageSize) + resNum;
			
			if(showPageSize < 2) {
				$('.pagenation4 .pages').hide();
			} else {
				$('.pagenation4 .pages').show();
			}
			
			$('.pagenation4 .pages').paging({
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
					$categoryList.ui.currendPageIndex = page;
					$categoryList.request.getCategoryList1("CTGR_004", page);
				}
			});
		}
	};
	
	$categoryList.search = {};
	$categoryList.request = {
		
		// 테마리스트 정보
		getCategoryList : function () {
			var requestParam = {
				resultCnt : pageSize,
			};
			
			if ($categoryList.isSearch) {
				if (!sop.Util.isUndefined($categoryList.search.title) && $categoryList.search.title.length > 0) {
					requestParam.title = encodeURIComponent($categoryList.search.title);
				}
			}
			
			$statsPotal.api.thematicMap.getStatsThemeMapList({
				param : requestParam,
				method : 'POST',
				success : $categoryList.response.successThemaStatList
			});
		},
		
		getCategoryList1 : function (cate_id, p) {
			var requestParam = {
				cate_id : cate_id,
				resultCnt : pageSize,
			};
			
			if (p!= 0) {
				requestParam.p = p - 1;
			}
			else {
				requestParam.p = p;
			}
			
			if ($categoryList.isSearch) {
				if (!sop.Util.isUndefined($categoryList.search.title) && $categoryList.search.title.length > 0) {
					requestParam.title = encodeURIComponent($categoryList.search.title);
				}
			}
			
			$statsPotal.api.thematicMap.getStatsThemeMapList({
				param : requestParam,
				method : 'POST',
				success : $categoryList.response.successThemaStatList1
			});
		},
		
		// 테마 정보
		getCategory : function () {
			$statsPotal.api.thematicMap.getCategory({
				method : 'POST',
				success : $categoryList.response.successCateList
			});
		}
	
	};
	
	$categoryList.response = {
		successCateList : function (stats, res) {
			if (res.errCd === 0) {
				var cateList = res.result.cateList;
				// $(".summary").css("margin-right","45px");
				
				for ( var i = 0; i < cateList.length; i++) {
					if (cateList[i].category == 'CTGR_001') {
						var lifeCateInfoHtml = $categoryList.formatter.getCateHtml(cateList[i]);
						$(".life .category").html(lifeCateInfoHtml);
					}
					if (cateList[i].category == 'CTGR_002') {
						var healthCateInfoHtml = $categoryList.formatter.getCateHtml(cateList[i]);
						$(".health .category").html(healthCateInfoHtml);
					}
					if (cateList[i].category == 'CTGR_003') {
						var cultureCateInfoHtml = $categoryList.formatter.getCateHtml(cateList[i]);
						$(".culture .category").html(cultureCateInfoHtml);
					}
					if (cateList[i].category == 'CTGR_004') {
						var environmentCateInfoHtml = $categoryList.formatter.getCateHtml(cateList[i]);
						$(".environment .category").html(environmentCateInfoHtml);
						
					}
				}
			}
		},
		
		successThemaStatList : function (stats, res) {
			if (res.errCd === 0) {
				if(res.result.returnOnlyPage) {
					$categoryList.ui.pagenation1(res.result.lifeCateListCount, $categoryList.ui.pageSize, res.result.currentPage);
					$categoryList.ui.pagenation2(res.result.healthCateListCount, $categoryList.ui.pageSize, res.result.currentPage);
					$categoryList.ui.pagenation3(res.result.cultureCateListCount, $categoryList.ui.pageSize, res.result.currentPage);
					$categoryList.ui.pagenation4(res.result.saftyCateListCount, $categoryList.ui.pageSize, res.result.currentPage);
					
					$categoryList.request.getCategoryList1("CTGR_001", res.result.currentPage);
					$categoryList.request.getCategoryList1("CTGR_002", res.result.currentPage);
					$categoryList.request.getCategoryList1("CTGR_003", res.result.currentPage);
					$categoryList.request.getCategoryList1("CTGR_004", res.result.currentPage);
				} else {
					var lifeCateHtml = "";
					var resultList = res.result;
					
					var lifeCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#lifeList").html(lifeCateListHtml);
					var tempHeight = $(".life").find(".section").height() + $(".life").find(".pagenation1").height();
					$(".life").find(".category").height(tempHeight);

					var healthCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#healthList").html(healthCateListHtml);
					
					tempHeight = $(".health").find(".section").height() + $(".health").find(".pagenation2").height();
					$(".health").find(".category").height(tempHeight);
					
					var cultureCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#cultureList").html(cultureCateListHtml);
					
					tempHeight = $(".culture").find(".section").height() + $(".culture").find(".pagenation3").height();
					$(".culture").find(".category").height(tempHeight);
					
					var saftyCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#saftyList").html(saftyCateListHtml);
					
					tempHeight = $(".environment").find(".section").height() + $(".environment").find(".pagenation4").height();
					$(".environment").find(".category").height(tempHeight);
				}
			}
		},
		
		successThemaStatList1 : function (stats, res) {
			if (res.errCd === 0) {
				var lifeCateHtml = "";
				var resultList = res.result;
				var category = resultList.category;
				
				if(category == "CTGR_001") {
					var lifeCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#lifeList").html(lifeCateListHtml);
					if (resultList.themeMapInfoList.length < 1) {
						$(".life").find(".pagenation1").hide();
						$(".life").find(".section").height(230);
						$(".life").find(".category").height(230);
						$("#lifeList > div").css("margin-top", "20%");
					}else {
						$(".life").find(".pagenation1").show();
						var tempHeight = $("#lifeList").height() + $("#life_lists_paging").height() + 20;
						$(".life").find(".category").height(tempHeight);
					}
				} else if(category == "CTGR_002") {
					var healthCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#healthList").html(healthCateListHtml);
					if (resultList.themeMapInfoList.length < 1) {
						$(".health").find(".pagenation2").hide();
						$(".health").find(".section").height(230);
						$(".health").find(".category").height(230);
						$("#healthList > div").css("margin-top", "20%");
					}else {
						$(".health").find(".pagenation2").show();
						var tempHeight = $("#healthList").height() + $("#health_lists_paging").height() + 20;
						$(".health").find(".category").height(tempHeight);
					}
				} else if(category == "CTGR_003") {
					var cultureCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#cultureList").html(cultureCateListHtml);
					if (resultList.themeMapInfoList.length < 1) {
						$(".culture").find(".pagenation3").hide();
						$(".culture").find(".section").height(230);
						$(".culture").find(".category").height(230);
						$("#cultureList > div").css("margin-top", "20%");
					}else {
						$(".culture").find(".pagenation3").show();
						var tempHeight = $("#cultureList").height() + $("#culture_lists_paging").height() + 20;
						$(".culture").find(".category").height(tempHeight);
					}
				} else if(category == "CTGR_004") {
					var saftyCateListHtml = $categoryList.formatter.getThemeListHtml(resultList.themeMapInfoList);
					$("#saftyList").html(saftyCateListHtml);
					if (resultList.themeMapInfoList.length < 1) {
						$(".environment").find(".pagenation4").hide();
						$(".environment").find(".section").height(230);
						$(".environment").find(".category").height(230);
						$("#saftyList > div").css("margin-top", "20%");
					}else {
						$(".environment").find(".pagenation4").show();
						var tempHeight = $("#saftyList").height() + $("#environment_lists_paging").height() + 20;
						$(".environment").find(".category").height(tempHeight);
					}
				}
			}
		}
	};
	$categoryList.formatter = {
		searchWordValidation : function (text) {
			if (!sop.Util.isUndefined(text) && text.length < 1) {
				$categoryList.isSearch = false;
				$categoryList.request.getCategoryList();
				return false;
			}
			
			if (sop.Util.isUndefined(text) || !text.length > 0) {				
				messageAlert.open('', '검색어가 입력되지 않습니다.');
				return false;
			}
			
			if (sop.Util.isUndefined(text) || !text.length > 1) {				
				messageAlert.open('', '최소 2자 이상의 검색어가 필요합니다.');
				return false;
			}
			
			if (!IsValid("formInput", text)) {
				return false;
			}
			return true;
		},
			
		getCateHtml : function (cateObj) {
//			console.log('cateObj', cateObj);
			var cateListHtml = '';
			var exp = '';
			if (cateObj.exp.length > 22) {
				exp = cateObj.exp.substring(0, 22);
				exp += '</br>';
				exp += cateObj.exp.substring(22, cateObj.exp.length);
			}
			else {
				exp = cateObj.exp;
			}
			cateListHtml += '<h4>';
			cateListHtml += cateObj.category_nm + '</h4>';
			cateListHtml += '<p class="en-tit">';
			cateListHtml += cateObj.en + '</p>';
			cateListHtml += '<p class="summary">';
			cateListHtml += exp;
			cateListHtml += '</p>';
			cateListHtml += ' ';
			
			return cateListHtml;
		},
		
		getThemeListHtml : function (themeListObj) {
			if(themeListObj.length < 1) {
				return "<div align='center'>검색 결과가 없습니다.</div>";
				
			} else {
				var themeListObjHml = "";
				
				var root = $("<ul class='lst-analysis'>"), tmp;
				
				for ( var i = 0; i < themeListObj.length; i++) {
					themeListObjHml = "<li>";
					
					themeListObjHml += '<div class="details"><p class="subject" align="center" style="float:left">';
					themeListObjHml += '<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
					themeListObjHml += themeListObj[i].title;
					themeListObjHml += '</a></p>';
					themeListObjHml += '<img src="/img/tm/theme_list_info.png" width="20" height="20" style="cursor: pointer; margin:-2px 0 0 10px;" title="" />'; 
					
					var str = "· 지역범위 : ";
					
					if(themeListObj[i].stat_disp_level == '01') {
						str += "시도";
					} else if(themeListObj[i].stat_disp_level == '02') {
						str += "시도 + 시군구";
					} else if(themeListObj[i].stat_disp_level == '03') {
						str += "시도 + 시군구 + 읍면동";
					} else {
						str += "시도 + 시군구 + 읍면동 + 집계구";
					}
					
					str += "</br>";
					str += "· 표현방법 : " + themeListObj[i].disp_method;
					str += "</br>";
					
					if(themeListObj[i].rel_stat_info == "통계개발원, 생애주기별 주요특성 및 변화분석(2014. 11)") {
						str += '<a href="http://kostat.go.kr/portal/korea/kor_nw/2/1/index.board?bmode=read&bSeq=&aSeq=332081&pageNo=1&rowNum=10&navCount=10&currPg=&sTarget=title&sTxt=%EC%83%9D%EC%95%A0%EC%A3%BC%EA%B8%B0" target="_blank">';
						str += "· 출처 : " + themeListObj[i].rel_stat_info;
						str += '</a>';
					} else {
						str += "· 출처 : " + themeListObj[i].rel_stat_info;
					}
					
					themeListObjHml += '<p class="date" style="margin-left: 10px;">' + str + ' </p>';
					themeListObjHml += '</div>';
					themeListObjHml += '</li>';
					
					tmp = $(themeListObjHml);
					root.append(tmp);
					
					$categoryList.formatter.createInfoTooltip(tmp, themeListObj[i]);
					
//					function c(tmp, val, idx){
//						return function () {
//							$categoryList.formatter.createInfoTooltip(tmp, val[idx]);
//						}
//					}
//					var data = c(tmp.find("img"), themeListObj, i);
//					
//					tmp.find("img").mouseover(data);
				}
				
				return root;
			}
		},
		
		createInfoTooltip : function(tmp, obj) {
			/*$(tmp).tooltip({
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
			});*/
			
			$(tmp).tooltip({ 
				open: function( event, ui ) {
					var target = $(this);
					setTimeout(function() {
						$(".ui-tooltip .subj").text(target.attr("data-subj"));
						 ui.tooltip.css("max-width", "400px");
						 ui.tooltip.css("top", event.clientY);
					},100);
					
				},
				position: {
				      my: "left+10 top", at: "right top", 
				      collision : "flip",
				      using: function( position, feedback ) {
				    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
				    		  $( this ).css( position ).prepend("<span class='subj'></span>");
				    	  }else {
				    		  $( this ).css( position ); 
				    	  }
				    	  
				          $( "<div>" )
				           /* .addClass( "arrow" )*/
				            .addClass( feedback.vertical )
				            .addClass( feedback.horizontal )
				            .appendTo( this );
				      }
				},
				content: function () {
					var title = $(this).attr("title");
					title = title.replace(/&lt;p&gt;/gi, '');
					title = title.replace(/&lt;p&gt;/gi, '');
					title = title.replace(/&lt;/gi, '<');
					title = title.replace(/&gt;/gi, '>');
					title = title.replace(/&quot;/gi, '');
					$(this).attr("title", title); 
					return $(this).prop('title');
		        }
			});
		}
	};
}(window, document));
