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

	W.$faq = W.$faq || {};

	// 최초 페이지 실행 시 최근 항목 가져옴
	$(document).ready(function() {
		//board.init(faq.qnaCd);
		faq.receiveType = getParameter("type");
		faq.receivePostNo = getParameter("board_no");
		faq.makeFaqLists();
		
		$('#board_tabs_faq').keydown(function(e){
			if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
				faq.makeFaqLists();
				$(".board_tabs1 > a").removeClass("active");
				$(this).addClass("active");
				$(".tab_contents > div").hide();
				$(".tab_contents > div").eq($(".board_tabs1 > a").index(this)).show();
			}
		});
		
		$(".board_tabs1 > a").click(function() {
			$(".board_tabs1 > a").removeClass("active");
			$(this).addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($(".board_tabs1 > a").index(this)).show();
		});
	});

	faq = {
		currentPageIndex : 1,			// 현재 페이지 인덱스
		receiveLists : null,			// 조회 항목들
		selectIndex : null,				// 사용자 선택 항목 인덱스

		searchWord : null,				// 검색어
		
		receiveType : null,				// 개발자 사이트에서 호출한 파라미터 ( 게시판 종류 )
		receivePostNo : null,			// 개발자 사이트에서 호출한 파라미터 ( 게시글 번호 )

		faqCd : "BOARD_002",			// 게시판 코드 ( 고정으로 사용 )
		
		setTab : function() {
			$(".board_tabs1 > a").removeClass("active");
			$("#board_tabs_faq").addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($("#board_tabs_faq").index(this)).show();
		},
		
		// 게시판 목록 페이징 처리
		faqPaging : function (totalCount, currentIndex) {
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
					faq.currentPageIndex = page
					faq.makeFaqLists();
				}
			});
		},

		// 게시판 목록 생성
		makeFaqLists : function () {
			var sopPortalFaqObj = new sop.portal.faq.api();
			sopPortalFaqObj.addParam("board_cd", faq.faqCd);
			sopPortalFaqObj.addParam("page_num", faq.currentPageIndex);
			if(faq.searchWord != null && faq.searchWord.length > 0) {
				sopPortalFaqObj.addParam("post_all", faq.searchWord.toUpperCase());
			}
			sopPortalFaqObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardLists.json"
			});
			
			//$('body, html').animate({scrollTop: 0}, 450);
		},
		
		// 게시글 조회수 수정
//		modifyPostHits : function (obj) {
//			if(obj == null || obj == undefined) {
//				return;
//			}
//			
//			var sopPortalFaqObj = new sop.portal.modifyPostHits.api();
//			sopPortalFaqObj.addParam("board_cd", obj.board_cd);
//			sopPortalFaqObj.addParam("post_no", obj.post_no);
//			
//			sopPortalFaqObj.request({
//				method : "POST",
//				async : true,
//				url : contextPath + "/ServiceAPI/board/boardListsHitAdd.json"
//			});
//		},

		// 게시판 검색
		searchFaqLists : function () {
			faq.currentPageIndex = 1;

			faq.searchWord = $("#faq_search_title_text").val();
			
			if(faq.searchWord.length != 0 && faq.searchWord.length < 2) {
				messageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
				return;
			}
			
			if (!IsBoardValid("formInput", faq.searchWord, "#faq_search_title_text")) {				
                return;
			}

			faq.makeFaqLists();
		},
		
		controlListItem : function(post_no) {
			console.log(post_no);
			console.log(faq.faqCd);
			window.location.href = contextPath + "/view/board/faqView?post_no="+post_no+"&board_cd="+faq.faqCd;
			/*if(index < 0) {
				$(".faq_list ul li").removeClass("on");
				$(".faq_list ul li").find(" > p ").slideUp();
				
				$(".faq_list ul li").find(".list_con").animate({
					opacity: 1,
					height: "16px"
				}, 30, function() {
					// Animation complete.
				});
				
				return;
			}
			
			var fl = $("#faq_list_" + index).attr("class");
			
			$(".faq_list ul li").removeClass("on");
			$("#faq_list_" + index).addClass("on");
	
			if ( fl == "on" ){
				$(".faq_list ul li").removeClass("on");
				$(".faq_list ul li").find(" > p ").slideUp();
			} else {
//				faq.modifyPostHits(faq.receiveLists[index])
				board.modifyPostHits(faq.receiveLists[index])
				
				$(".faq_list ul li").find(" > p ").slideUp();
				$("#faq_list_" + index).find(" > p ").slideDown();
			}*/
//			return false;
		},
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.faq.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					var faqTotalCnt = result.total_count;
					var pageSize = result.pageSize;
					var curPage = result.curPage;
					$("#faq_title_text").html("&nbsp;&nbsp;&nbsp;총" + faqTotalCnt + " 건");
					faq.faqPaging(result.total_count, faq.currentPageIndex);

					faq.receiveLists = result.summaryList;

					var html = "";
					html += "<ul>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						html += "<li id='faq_list_" + i + "'>";
						html += "<table style='width:100%;'>";
						html +=	"<tr>";
						html += "<td style='width:10%;text-align:center;'>"+listItem.boardnum+"</td>";
						html += "<td style='width:80%;'><a href='javascript:faq.controlListItem("+listItem.post_no+");'>&nbsp;&nbsp;&nbsp;" + title+"</td>";
						html += "</tr>"
						html += "</table>";

						
						//html += "<a href='javascript:faq.controlListItem("+listItem.post_no+");'>";
						//일련번호
						//html += listItem.boardnum;
						//html +=  "&nbsp;&nbsp;&nbsp;" + title;
						//html += "</a>";
						//html += "<p style='display: none;'>";
						//html += content;
						//html += "</p>";
						html += "</li>";
					}

					html += "</ul>";
					$("#faq_list").empty();
					$("#faq_list").html(html);
					
					$('.faq_list ul li a').keydown(function(e) {						  
						  var key = e.keyCode;						  
							switch(key){
							case 37:
								$(this).parent().prev().find("a").focus();
						        break;
							case 39:
								$(this).parent().next().find("a").focus();
						        break;
						    default:
						    }	
						});					
					
					//faq.controlListItem();
				} else {
					messageAlert.open("알림", res.errMsg);
				}
				
//				if (faq.receiveType != undefined && faq.receiveType != null && faq.receiveType.length > 0) {
//					if(faq.receiveType = 'faq') {
//						faq.setTab();
//					}
//				}
				
				/*if (faq.receivePostNo != undefined && faq.receivePostNo != null && faq.receivePostNo.length > 0) {
					for(var i = 0; i < faq.receiveLists.length; i++) {
						if(faq.receivePostNo == faq.receiveLists[i].post_no) {
							faq.controlListItem(i);
							var position = $("#faq_list_" + i).offset();
							$('html, body').animate({scrollTop : position.top - 200}, 500);
							return;
						}
					}
				}*/
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Lists End **********/
	
	/*********** modify post hits Start **********/
//	(function() {
//		$class("sop.portal.modifyPostHits.api").extend(sop.portal.absAPI).define({
//			onSuccess : function(status, res) {
//				if(res.errCd == "0") {
//					console.log("seccess");
//				} else {
//					messageAlert.open("알림", res.errMsg);
//				}
//			},
//			onFail : function(status) {
//			}
//		});
//	}());
	/*********** modify post hits End **********/
	
}(window, document));