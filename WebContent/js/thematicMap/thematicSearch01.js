/**
 * 통계주제도
 * 
 * 
 * 
 */

(function (W, D) {
	W.$thematicSearch01 = W.$thematicSearch01 || {};
	var pageSize=4;
//	var $thematicSearch01 = [];
	var categoryList = [];
	
	$(document).ready(function () {
		console.log(makeRandomThirtySevenDigitString ());
		//카테고리 정보를 가져온다.
		$thematicSearch01.request.getCategory();
//		$thematicSearch01.request.getCategoryList();
		
		var url = statsPotalDomain + "/view/board/qnaAndRequest?type=thema&categoryCd=THEMRQ";
		var tempHtml = "<div align='right'><a href=" + url + " style='color: #3c9cd7;'><img src='/img/tm/img_thematicUser.png' alt='요청하기' style='width:40px; height:33px; margin: 0px 0px -10px 0px;'/><b> 통계주제도 요청하기</a></b></div>";
		
		$('.thematicSubTitle').append(tempHtml);
		
		//서치 flag
		$thematicSearch01.isSearch = false;
		
		$("#themeSearchBtn").click(function () {
			$thematicSearch01.ui.isFirst = false;
			$thematicSearch01.isSearch = true;
			var searchText = $("#atc-kwd").val();
			var validation = $thematicSearch01.formatter.searchWordValidation(searchText);
			if (validation) {
				$thematicSearch01.search = {
					title : searchText,
				};
				$thematicSearch01.request.getCategoryList();
			}
			
		});
		
		//mousedown 마우스버튼 눌렀을때
		$("#atc-kwd").mousedown(function () {
			$(this).val("");
		});
		
		//text입력 후 엔터를 쳤을때
		$("#atc-kwd").bind("keydown", function (event) {
			//event.which는 키보드키 또는 마우스 이벤트를 나타낸다.
			if (event.which === 13) {
				$("#themeSearchBtn").click();
			}
		});	
		
		$thematicSearch01.formatter.createInfoTooltip(".theme_tooltip");
		
	}); //onload 끝
	
	$thematicSearch01.ui = {
			pageSize : pageSize,
			currendPageIndex : 0,
			calledType : "01",
			isFirst : true,
			
			pagenation : function (totalCnt, pageSize, currentPageNum, thema_map_category) {
				var resNum = totalCnt % pageSize ? 1 : 0;
				var showPageSize = parseInt(totalCnt / pageSize) + resNum;
				
				//ex) CTGR_001 이면 뒤의 두자리를 때서 pagenation 테그 넘버링을 한다.
				var num = thema_map_category.substring(6,8);				
				
				if(showPageSize < 2) {
					$('#list'+num+' .pages').hide();
				} else {
//					$('.pagenation'+num+' .pages').show();
					$('#list'+num+' .pages').show();
				}
				
//				$('.pagenation'+num+' .pages').paging({
					$('#list'+num+' .pages').paging({
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
						$thematicSearch01.ui.isFirst = false;
						$thematicSearch01.ui.currendPageIndex = page;
						$thematicSearch01.request.getCategoryList1(thema_map_category, page);
						
					}
				});
			},
			
			setThemaType : function(type) {
				$thematicSearch01.ui.calledType = type;
			}
		
		}; //$thematicSearch01.ui end
	
	
	//search에는 null 값 입력
	$thematicSearch01.search = {};
	
	$thematicSearch01.request = {
			
			// 초기 테마리스트 정보 
			getCategoryList : function () {
				var requestParam = {
				//초기값 = 4;
					resultCnt : pageSize,
					categoryList : JSON.stringify(categoryList)
					
				};
				
				if ($thematicSearch01.isSearch) {
					if (!sop.Util.isUndefined($thematicSearch01.search.title) && $thematicSearch01.search.title.length > 0) {
						//특수문자까지 encode한다. ex) "/" 이러면 서버에서는 인식을 하지 못한다. 
						requestParam.title = encodeURIComponent($thematicSearch01.search.title);
					}
				}
				
				$statsPotal.api.thematicMap.getStatsThemeMapList({
					param : requestParam,
					method : 'POST',
					success : $thematicSearch01.response.successThemaStatList
				});
			},
			
			// 해당 cate_id의 page의 리스트를 가져온다.
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
				
				if ($thematicSearch01.isSearch) {
					if (!sop.Util.isUndefined($thematicSearch01.search.title) && $thematicSearch01.search.title.length > 0) {
						requestParam.title = encodeURIComponent($thematicSearch01.search.title);
					}
				}
				
				$statsPotal.api.thematicMap.getStatsThemeMapList({
					param : requestParam,
					method : 'POST',
					success : $thematicSearch01.response.successThemaStatList1
				});
			},
			
			// 테마 정보 (좌측 큰 주제) 
			//
			getCategory : function () {
				$statsPotal.api.thematicMap.getCategory({
					method : 'POST',
					success : $thematicSearch01.response.successCateList
				});
			}
		
		}; //request end
	
	$thematicSearch01.response = {
			successCateList : function (stats, res) {
				// 좌측 카탈로그 리스트 받아서 붙이기 
				if (res.errCd === 0) {
					categoryList = res.result.cateList;
					
					
					for ( var i = 0; i < categoryList.length; i++) {
							var html = $thematicSearch01.formatter.getCateHtml(categoryList[i]);
							//searchResultBox에 생성한 html을 붙인다.							
							$('#searchResultBox').append(html);
						
					}	
					
					$thematicSearch01.request.getCategoryList();
				}
			},

			sleepForScroll : function (num){
				var now = new Date();
				var stop = now.getTime() + num;
				while(true){
					now = new Date();
					if(now.getTime() > stop)return;
				}
			},
			
			successThemaStatList : function (stats, res) {
				if (res.errCd === 0) {
					if(res.result.returnOnlyPage) {
						// 처음 페이지 만들때
						
						for(var i=0;i<categoryList.length;i++){
							$thematicSearch01.ui.pagenation(res.result.count[i], $thematicSearch01.ui.pageSize, res.result.currentPage,res.result.categoryList[i]);
						}
						
						//ctgr_001의 count를 조회하고
						
						//getCategoryList1 은 무엇인지?? 페이지를 눌렀을때 리스트를 띄움.
						
						
						for(var i=0;i<categoryList.length;i++){
							$thematicSearch01.request.getCategoryList1(res.result.categoryList[i], res.result.currentPage);							
						}
					} else {
						// 얘는 뭐냐?

//						var resultList = res.result;			     
//						//리스트붙이고
//						var lifeCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#lifeList").html(lifeCateListHtml);
//						//공간만들고
//						var tempHeight = $(".life").find(".section").height() + $(".life").find(".pagenation1").height();
//						$(".life").find(".category").height(tempHeight);
//		
//						var healthCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#healthList").html(healthCateListHtml);
//						
//						tempHeight = $(".health").find(".section").height() + $(".health").find(".pagenation2").height();
//						$(".health").find(".category").height(tempHeight);
//						
//						var cultureCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#cultureList").html(cultureCateListHtml);
//						
//						tempHeight = $(".culture").find(".section").height() + $(".culture").find(".pagenation3").height();
//						$(".culture").find(".category").height(tempHeight);
//						
//						var saftyCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#saftyList").html(saftyCateListHtml);
//						
//						tempHeight = $(".environment").find(".section").height() + $(".environment").find(".pagenation4").height();
//						$(".environment").find(".category").height(tempHeight);
					}
				}
			},

			successThemaStatList1 : function (stats, res) {
				if (res.errCd === 0) {
					var lifeCateHtml = "";
					var resultList = res.result;
					var category = resultList.category;
					
					var num = category.substring(6,8);
					
					var html = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
					
					//List를 붙인다.
					$("#"+num).html(html);
					
					if (resultList.themeMapInfoList.length < 1) {
						$('#list'+num).hide();
						var tempHeight = $("#"+num).height() + $("#list"+num).height() + 100;
					}else {						
						$('#list'+num).show();
						var tempHeight = $("#"+num).height() + $("#list"+num).height() + 100;					
					}				
				}
				
				var tempId = '#icon';
				var tempIndex = $thematicSearch01.ui.calledType;
				tempId += tempIndex;
				
				
				//상단 메뉴 클릭시 해당 주제로 스크롤해서 내려가는 기능
				var tempScroll = $(tempId).offset().top;
				if($thematicSearch01.ui.isFirst) {
					$('body,html').animate({
						scrollTop: tempScroll
				    }, 300);
				}
				
				
			}
		}; //response end
	
	
	
	
	$thematicSearch01.formatter = {
			searchWordValidation : function (text) {
				if (!sop.Util.isUndefined(text) && text.length < 1) {
					$thematicSearch01.isSearch = false;
					$thematicSearch01.request.getCategoryList();
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
				var cateListHtml = '';
				var num = cateObj.thema_map_category.substring(6,8);
				var exp = '';
				if (cateObj.exp.length > 22) {
					exp = cateObj.exp.substring(0, 22);
					exp += '</br>';
					exp += cateObj.exp.substring(22, cateObj.exp.length);
				}
				else {
					exp = cateObj.exp;
				}
				// 2016. 12. 22 수정
				var imgUrl = cateObj.category_icon_url;
				cateListHtml += '<div class="fl" style="background-image: url('+imgUrl+');" id="icon'+num+'" >';
				cateListHtml += '<h4 class="tit">'+cateObj.category_nm+'</h4>';
				cateListHtml += '<p class="txt01">'+cateObj.en+'</p>';
				cateListHtml += '<p class="txt02">'+exp+'</p>';
				cateListHtml += '</div>';
					
				// 앞의 숫자가 0이면 01->1로 바꿔 넣는다.
				if(num.substring(0,1)=='0'){
					cateListHtml += '<div class="fr" id="fr'+num+'">';
				}else{
					cateListHtml += '<div class="fr" id="fr'+num+'">';
				}
				cateListHtml += '<ul class="thematicSearchList">';
				cateListHtml += '<li>';
				cateListHtml += '<div class="section">';					
				cateListHtml += '<div id="'+num+'"></div>';
				cateListHtml += '<div id="list'+num+'" class="pagenation" align="center" style="width: 100%;height:30px;">';
				cateListHtml += '<span class="pages"> <a href="" class="page">1</a></span></div></div</li></ul></div>';				
				
				return cateListHtml;
			},
			// 리스트 뿌리기
			getThemeListHtml : function (themeListObj) {
				if(themeListObj.length < 1) {
					return "<div align='center'>검색 결과가 없습니다.</div>";					
				} else {
					var themeListObjHml = "";
					var root = $("<ul class='lst-analysis'>"), tmp;						
					 
					for ( var i = 0; i < themeListObj.length; i++) {
						themeListObjHml = "<li>";
						
						themeListObjHml += '<div class="thematicLink">';
						if(themeListObj[i].thema_map_type=="02"){
							themeListObjHml += '<a id="'+themeListObj[i].stat_thema_map_id+'" href="/view/thematicMap/thematicMapMainOld?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
						}else{
							// mapType이 2가 아니면
							themeListObjHml += '<a id="'+themeListObj[i].stat_thema_map_id+'" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
						}
						themeListObjHml += themeListObj[i].title;
						themeListObjHml += '</a>';
						themeListObjHml += '<a class="theme_tooltip" title="'+$.trim(themeListObj[i].thema_exp)+'"><img  src="/img/ico/ico_help05.png" width="20" height="20" alt="' + themeListObj[i].title + ' 도움말 팝업" style="cursor: pointer; margin:-2px 0 0 10px;"/></a><br><br>';
						
						var str = "";
						
						// 시도,시군구,읍면동,집계구 설정(공통)
						if(themeListObj[i].max_expnsn_level == '01') {
							str += '<span class="spbox type01" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">시도</span>';
						} else if(themeListObj[i].max_expnsn_level == '02') {
							str += '<span class="spbox type02" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">시군구</span>';
						} else if(themeListObj[i].max_expnsn_level == '03') {
							str += '<span class="spbox type03" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">읍면동</span>';
						} else if(themeListObj[i].max_expnsn_level == '04'){
							str += '<span class="spbox type04" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">집계구</span>';
						}
						
						// 주제도 유형 정보
						if(themeListObj[i].thema_map_type=='02'){
							
							var classType = 'type05';
							if(themeListObj[i].disp_method == '색상'){
								classType = 'type05';
							}else if(themeListObj[i].disp_method == '증감'){
								classType = 'type06';
							}else if(themeListObj[i].disp_method == '시계열'){
								classType = 'type07';
							}else if(themeListObj[i].disp_method == '분할뷰'){
								classType = 'type09';
							}else if(themeListObj[i].disp_method == 'POI'){
								classType = 'type10';
							}	
							// 예전 데이터의 경우 disp_mthd 와 max_expnsn으로 박스표시
							str += '<span class="spbox ' + classType + '" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">'+themeListObj[i].disp_method+'</span>';
					
						}else{
							// theme_map_type이 다른경우 max_expnsn
							if(themeListObj[i].thema_map_type == '03'){
								str += '<span class="spbox type05" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">색상</span>'
							}else if(themeListObj[i].thema_map_type == '04'){
								str += '<span class="spbox type06" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">증감</span>';
							}else if(themeListObj[i].thema_map_type == '05'){
								str += '<span class="spbox type07" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">시계열</span>';
							}else if(themeListObj[i].thema_map_type == '06'){
								str += '<span class="spbox type09" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">분할뷰</span>';
							}else if(themeListObj[i].thema_map_type == '07'){
								str += '<span class="spbox type10" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">POI</span>';
							}			
						}			
						
						//데이터 년도
						str += '<span class="spbox type08" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">'+themeListObj[i].year_info+'</span>';
						str += "</br></br>";
						
						if(themeListObj[i].rel_stat_info == "통계개발원, 생애주기별 주요특성 및 변화분석(2014. 11)") {
							//2017.03.17 통계주제도 ie에서 출처 잘리는 현상 : margin-top:5px 추가
							//실제 ie에서 재현이 안됨
							str += '<div class="thematicEtc" style="margin-left:0px;margin-top:-5px;"><a href="http://kostat.go.kr/portal/korea/kor_nw/2/1/index.board?bmode=read&bSeq=&aSeq=332081&pageNo=1&rowNum=10&navCount=10&currPg=&sTarget=title&sTxt=%EC%83%9D%EC%95%A0%EC%A3%BC%EA%B8%B0" target="_blank">';
							str += '<span style="font-size: 12px;margin-top:-5px;">';
							str += "출처 : " + themeListObj[i].rel_stat_info;
							str += '</span>';
							str += '</a></div>';
						} else {
							str += "출처 : " + themeListObj[i].rel_stat_info;
						}
						
						themeListObjHml += '<p class="date" style="margin-left: 30px;">' + str + ' </p>';
						themeListObjHml += '</div>';
						themeListObjHml += '</li>';
						
						tmp = $(themeListObjHml);
						root.append(tmp);
					}
					
					return root;
				}
			},
			
			createInfoTooltip : function(tmp) {
				$(document).tooltip({ 
					open: function( event, ui ) {
					},
					position: {
						     my: "left+10 top", at: "right top", 
						     using: function( position, feedback ) {
						    	 if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
						    		 $( this ).css( position ).prepend("<span class='subj'></span>");
						    	 }else {
						    		 $( this ).css( position ); 
						    	 }
						    	  
						         $( "<div>" )
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

			},
			
			goThematicMapPage : function(cls) {
				window.location.href = $("#"+cls).attr("href");
			}
		};
	
	
	
}(window, document));
