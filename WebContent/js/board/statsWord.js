/**
 * 게시판 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 석진혁
 * version : 1.0
 * see : 
 *
 */


(function(W, D) {
	//"use strict";

	W.$statsWord = W.$statsWord || {};

	// 최초 페이지 실행 시 최근 항목 가져옴
	$(document).ready(function() {
//		board.init(statsWord.qnaCd);
		statsWord.makeStatsWordLists();
	})

	statsWord = {
		currentPageIndex : 1,			// 현재 페이지 인덱스
		receiveLists : null,			// 조회 항목들
		selectIndex : null,				// 사용자 선택 항목 인덱스

		searchWord : null,				// 검색어

		statsWordCd : "BOARD_005",			// 게시판 코드 ( 고정으로 사용 )
		
		// 게시판 목록 페이징 처리
		statsWordPaging : function (totalCount, currentIndex) {
			var pageSize = 10;										// 페이지 당 항목 개수
			var totalPage = Math.ceil( totalCount / pageSize);		// 전체 페이지 수
			$('.pagenation .pages').paging({
				current : currentIndex,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function(e,page){							// 페이지 선택 시
					statsWord.currentPageIndex = page
					statsWord.makeStatsWordLists();
				}
			});
		},

		// 게시판 목록 생성
		makeStatsWordLists : function () {
			var sopPortalStatsWordObj = new sop.portal.statsWord.api();
			sopPortalStatsWordObj.addParam("board_cd", statsWord.statsWordCd);
			sopPortalStatsWordObj.addParam("page_num", statsWord.currentPageIndex);
			if(statsWord.searchWord != null && statsWord.searchWord.length > 0) {
				sopPortalStatsWordObj.addParam("post_all", statsWord.searchWord.toUpperCase());
			}
			sopPortalStatsWordObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardLists.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},

		// 게시판 검색
		searchWordLists : function () {
			statsWord.currentPageIndex = 1;

			statsWord.searchWord = $("#statsWord_search_title_text").textbox('getValue');
			
			if(statsWord.searchWord.length != 0 && statsWord.searchWord.length < 2) {
				messageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
				return;
			}
			
			if (!IsValid("formInput", statsWord.searchWord)) {
                return;
			}

			statsWord.makeStatsWordLists();
		},
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.statsWord.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					$("#statsWord_title_text").html("&nbsp;&nbsp;&nbsp;총" + result.total_count + " 건");
					statsWord.statsWordPaging(result.total_count, statsWord.currentPageIndex);

					statsWord.receiveLists = result.summaryList;

					var html = "";
					html += "<ul>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						
						html += "<li>";
						html += "<div class='inner'>";
						html += "<p class='subject'>" + title + "</p></br>";
//						if(listItem.post_title_en != null && listItem.post_title_en != undefined) {
//							html += "<p class='term'>" + listItem.post_title_en + "</p>";
//						}
						html += "<p class='summary'>" + content + "</p>";
						html += "</li>";
					}

					html += "</ul>";
					$("#statsWord_list").empty();
					$("#statsWord_list").html(html);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Lists End **********/
}(window, document));