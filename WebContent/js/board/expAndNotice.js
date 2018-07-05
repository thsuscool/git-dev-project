/**
 * 게시판 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 석진혁
 * version : 1.0
 * see : 
 *
 */

function init() {
	expAndNotice.receiveType = getParameter("type");
	expAndNotice.receivePostNo = getParameter("board_no");
	expAndNotice.makeNoticeLists();
}

(function(W, D) {
	//"use strict";

	W.$expAndNotice = W.$expAndNotice || {};

	// 최초 페이지 실행 시 최근 항목 가져옴
	$(document).ready(function() {
		
		//맨위로 버튼///////
		var scrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
		$("#topScrollTag").css("left", scrollWidthVal)
		$(window).scroll(function(){
		    var currentScrollY = $(this).scrollTop();
		    if(currentScrollY >= 10){
		    	$("#topScrollTag").fadeIn("fast");
		    }else{
		    	$("#topScrollTag").fadeOut("fast");
		    }
		});
		
		$(window).resize(function(){
			var resizeScrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
			$("#topScrollTag").css("left", resizeScrollWidthVal)
		}).resize();
		///////////////////////
		
		board.init(expAndNotice.noticeCd);
		
		var param = unescape(location.search).substring(1).split(/\&|\=/g);
		param = String(param).split(",");
		if(param[0] == "gubun"){
			if(param[1] == "BOARD_001"){				
				expAndNotice.setTab();		//main Page 통계용어 설명 Click 시 탭 변경(2015.11.17) 
			}
		}
		$(".board_tabs > a").click(function() {
			$(".board_tabs > a").removeClass("active");
			$(this).addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($(".board_tabs > a").index(this)).show();
		});
		
		//============ 2017.12.21 [개발팀] 접근성시정조치 START ============//
		$("body").on("focus", "#container", function() {
			$(".ulDiv").trigger("mouseout");
		});
		//============ 2017.12.21 [개발팀] 접근성시정조치 END ============//
	})

	expAndNotice = {
		currentPageIndex : 1, // 현재 페이지 인덱스
		prevHtmlSouce : null, // 글 항목 생성 HTML 소스 임시저장
		receiveLists : null, // 조회 항목들
		selectIndex : null, // 사용자 선택 항목 인덱스

		searchType : null, // 검색 항목 ( 제목, 내용, 제목+내용 )
		searchWord : null, // 검색어

		receiveType : null, // 개발자 사이트에서 호출한 파라미터 ( 게시판 종류 )
		receivePostNo : null, // 개발자 사이트에서 호출한 파라미터 ( 게시글 번호 )

		noticeCd : "BOARD_001", // 게시판 코드 ( 고정으로 사용 )

		setTab : function() {
			$(".board_tabs > a").removeClass("active");
			$("#board_tabs_exp").addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($("#board_tabs_exp").index()).show();
//			$(".tab_contents > div").eq($("#board_tabs_exp").index(this)).show();
		},

		// 게시판 목록 페이징 처리
		expAndNoticePaging : function(totalCount, currentIndex) {
			var pageSize = 10; // 페이지 당 항목 개수
			var totalPage = Math.ceil(totalCount / pageSize); // 전체 페이지 수
			$('.pagenation1 .pages').paging({
				current : currentIndex,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function(e, page) { // 페이지 선택 시
					expAndNotice.currentPageIndex = page
					expAndNotice.makeNoticeLists();
				}
			});
		},

		// 게시판 목록 생성
		makeNoticeLists : function() {
			var sopPortalNoticeObj = new sop.portal.expAndNotice.api();
			sopPortalNoticeObj.addParam("board_cd", expAndNotice.noticeCd);
			sopPortalNoticeObj.addParam("page_num", expAndNotice.currentPageIndex);
			if (expAndNotice.searchWord != null && expAndNotice.searchWord.length > 0) {
				sopPortalNoticeObj.addParam(expAndNotice.searchType, expAndNotice.searchWord.toUpperCase());
			}
			sopPortalNoticeObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardLists.json"
			});

			$('body, html').animate({
				scrollTop : 0
			}, 450);
		},

		// 게시판 검색
		searchNoticeLists : function() {
			expAndNotice.currentPageIndex = 1;

			expAndNotice.searchType = $("#notice_search_select").combobox('getValue');
			//			expAndNotice.searchType = $("#notice_search_select").val();
			expAndNotice.searchWord = $("#notice_search_title_text").textbox('getValue');

			if (expAndNotice.searchWord.length != 0 && expAndNotice.searchWord.length < 2) {
				messageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
				return;
			}

			if (!IsValid("formInput", expAndNotice.searchWord)) {
				return;
			}

			expAndNotice.makeNoticeLists();
		},

		// 항목 선택 시 답변 글 가져오기
		getNoticeListsReply : function() {
			var sopPortalNoticeObj = new sop.portal.expAndNoticeReply.api();
			sopPortalNoticeObj.addParam("board_cd", expAndNotice.receiveLists[expAndNotice.selectIndex].board_cd);
			sopPortalNoticeObj.addParam("post_no", expAndNotice.receiveLists[expAndNotice.selectIndex].post_no);
			sopPortalNoticeObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsReply.json"
			});
		},

		// 항목 선택 시 작성자 확인하여 본인 글 일 경우 수정, 삭제 버튼 생성
		makeModifyAndDeleteBtn : function(index) {
			if (index == expAndNotice.selectIndex) {
				return;
			}

			if (expAndNotice.prevHtmlSouce != null) {
				$("#list_" + expAndNotice.selectIndex).html(expAndNotice.prevHtmlSouce);
			}

			expAndNotice.selectIndex = index;
			expAndNotice.prevHtmlSouce = $("#list_" + expAndNotice.selectIndex).html();

			expAndNotice.getNoticeListsReply();
		},

		// 게시글 조회수 수정
		//		modifyPostHits : function (obj) {
		//			if(obj == null || obj == undefined) {
		//				return;
		//			}
		//			
		//			var sopPortalNoticeObj = new sop.portal.modifyPostHits.api();
		//			sopPortalNoticeObj.addParam("board_cd", obj.board_cd);
		//			sopPortalNoticeObj.addParam("post_no", obj.post_no);
		//			
		//			sopPortalNoticeObj.request({
		//				method : "POST",
		//				async : true,
		//				url : contextPath + "/ServiceAPI/board/boardListsHitAdd.json"
		//			});
		//		},

		downloadFile : function(index) {
			var target;

			target = $('body');
			target.prepend("<form id='tempForm'></form>");

			target = $('#tempForm');
			target.attr("method", "post");
			target.attr("style", "top:-3333333333px;");
			target.attr("action", contextPath + "/ServiceAPI/board/downloadFile.download");
			target.append("<input type='hidden' id='file_id'>");
			target.append("<input type='hidden' id='file_nm'>");
			target.append("<input type='hidden' id='file_path'>");
			target.append("<input type='hidden' id='file_extension'>");
			target.append("<input type='hidden' id='file_content_type'>");

			target = $('#file_id');
			target.attr('name', 'file_id');
			target.attr('value', expAndNotice.receiveLists[index].file_id);

			target = $('#file_nm');
			target.attr('name', 'file_nm');
			target.attr('value', expAndNotice.receiveLists[index].file_nm);

			target = $('#file_path');
			target.attr('name', 'file_path');
			target.attr('value', expAndNotice.receiveLists[index].file_path);

			target = $('#file_extension');
			target.attr('name', 'file_extension');
			target.attr('value', expAndNotice.receiveLists[index].file_extension);

			target = $('#file_content_type');
			target.attr('name', 'file_content_type');
			target.attr('value', expAndNotice.receiveLists[index].file_content_type);

			$('#tempForm').submit();
			$('#tempForm').remove();
		},

		controlListItem : function(post_no) {			
			window.location.href = contextPath + "/view/board/expAndNoticeView?post_no="+post_no;
			/*if (index < 0) {
				$(".exp_list ul li").removeClass("on");
				$(".exp_list ul li").find(" > p ").slideUp();

				$(".exp_list ul li").find(".list_con").animate({
					opacity : 1,
					height : "16px"
				}, 30, function() {
					// Animation complete.
				});

				return;
			}

			var fl = $("#exp_list_" + index).attr("class");
			var heightqnalist = $("#exp_list_" + index).find(".list_con > p").height();
			heightqnalist += $("#exp_list_" + index).find(".list_con > table").height();

			$(".exp_list ul li").removeClass("on");
			$("#exp_list_" + index).addClass("on");

			if (fl == "on") {
				$(".exp_list ul li").removeClass("on");
				$(".exp_list ul li").find(" > p ").slideUp();

				$("#exp_list_" + index).find(".list_con").animate({
					opacity : 1,
					height : "16px"
				}, 300, function() {
					// Animation complete.
				});
			} else {
				//				expAndNotice.modifyPostHits(expAndNotice.receiveLists[index])
				board.modifyPostHits(expAndNotice.receiveLists[index])

				$(".exp_list ul li").find(".list_con").animate({
					opacity : 1,
					height : "17px"
				}, 300, function() {
					// Animation complete.
				});
				$(".exp_list ul li").find(" > p ").slideUp();

				$("#exp_list_" + index).find(".list_con").animate({
					opacity : 1,
					height : heightqnalist + "px"
				}, 300, function() {
					// Animation complete.
				});
				$("#exp_list_" + index).find(" > p ").slideDown();
			}*/
		},
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.expAndNotice.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res) {
						if (res.errCd == "0") {							
							var result = res.result;
							var expAndNoticeTotalCnt = result.total_count;
							var pageSize = result.pageSize;
							var curPage = result.curPage;
							$("#notice_title_text").html("&nbsp;&nbsp;&nbsp;총" + expAndNoticeTotalCnt + " 건");
							expAndNotice.expAndNoticePaging(result.total_count, expAndNotice.currentPageIndex);

							expAndNotice.receiveLists = result.summaryList;

							var html = "";
							
						//2017.12.12 [개발팀] 접근성 캡션삽입
						html += "<table class='boardTb' summary='공지사항'>";
						html += "<caption>공지사항 목록</caption>";
						html += "<tr style='display:none;'>";
						html +=	"<th scope='col'>순번</th>";
						html +=	"<th scope='col'>제목</th>";
						html +=	"<th scope='col'>등록일시</th>";
						html +=	"<th scope='col'>조회수</th>";
						html += "</tr>";
						for (var i = 0; i < result.summaryList.length; i++) {
							var listItem = result.summaryList[i];								
							var title = listItem.post_title.replace(/\n/gim, "</br>");
							var content = listItem.post_content.replace(/\n/gim, "</br>");

							html += "<tr>";
							html += "<td style='width:10%;text-align:center;'>"+listItem.boardnum+"</td>";
							html += "<td class='titleTd' style='width: 60%;'>";
							html += "<a style='cursor: pointer;' href='javascript:expAndNotice.controlListItem(" + listItem.post_no + ");'>";
							//일련번호
							//html += listItem.boardnum;
							html += "&nbsp;&nbsp;&nbsp;" +title;
							html += "</a>";
							html += "</td>";
							//작성일
							html += "<td style='width: 15%;'>&nbsp;&nbsp;" + listItem.reg_ts + "</td>";
							//조회수
							var postHits = listItem.post_hits;
							if(!postHits){
								postHits = '0';
							}
							html += "<td style='width: 10%;'>&nbsp;&nbsp조회 "+ postHits + "</td>";
							html += "</tr>";		
						}

						html += "</table>";
							
						$("#notice_list").empty();
						$("#notice_list").html(html);
							
							/*var editorlist=[];
							for (var i = 0; i < result.summaryList.length; i++) {
								editorlist[i]=CKEDITOR.replace('POST_CONTENT'+i, {
									resize_enabled : false,									
									readOnly : true,
									removePlugins : 'toolbar,elementspath,resize',
									extraPlugins : 'divarea,autogrow',
									autoGrow_onStartup :true,
									contentsCss : 'body {overflow:hidden}'
								});
								
								var content = result.summaryList[i].post_content;//.replace(/\n/gim, "</br>");
								$('#POST_CONTENT'+i).html(content);								
								editorlist[i].setData($('#POST_CONTENT'+i).text());
							}*/
							
							//editorlist[i]CKEDITOR.instances.POST_CONTENT.setData(content);
							//expAndNotice.controlListItem(-1);
						} else {
							messageAlert.open("알림", res.errMsg);
						}
						if (expAndNotice.receiveType != undefined && expAndNotice.receiveType != null && expAndNotice.receiveType.length > 0) {
							if (expAndNotice.receiveType = 'notice') {
								expAndNotice.setTab();
							}
						}

						if (expAndNotice.receivePostNo != undefined && expAndNotice.receivePostNo != null && expAndNotice.receivePostNo.length > 0) {
							for (var i = 0; i < expAndNotice.receiveLists.length; i++) {
								if (expAndNotice.receivePostNo == expAndNotice.receiveLists[i].post_no) {
									expAndNotice.controlListItem(i);
									var position = $("#exp_list_" + i).offset();
									$('html, body').animate({
										scrollTop : position.top - 200
									}, 500);
									return;
								}
							}
						}
						
						
						//2015.07.16 
						// 미니게시판을 통해 데이터가 넘어온 경우 setting
						
						setTimeout(
								function(){
									var param = unescape(location.search).substring(1).split(/\&|\=/g);
									param = String(param).split(",");
									//alert(param[3]);
									if(param[0] == "gubun"){
										if(param[1] == "BOARD_001"){
											//expAndNotice.setTab();		//20150827 이선희 사무관 요청에 의해 탭순서 변경. 공지사항/통계용어 설명 
										}
									}if(param[2] != null){
										expAndNotice.controlListItem(param[3]);
									}
								}, 1000
						);
						
						
						
						
						
						
						
						
					},
					onFail : function(status) {
					}
				});
	}());
	/*********** Receive Lists End **********/

	/*********** Receive Search Lists Start **********/
	(function() {
		$class("sop.portal.searchLists.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;

					$("#notice_title_text").html("&nbsp;&nbsp;&nbsp;총" + result.total_count + " 건");
					expAndNotice.expAndNoticePaging(result.total_count, expAndNotice.currentPageIndex);

					expAndNotice.receiveLists = result.summaryList;

					var html = "<table border='1' style='width:500px' align='center'>";
					for (var i = 0; i < result.summaryList.length; i++) {
						var listItem = result.summaryList[i];
						html += "<tr>";
						html += "<td id='list_" + i + "' ";
						html += "onclick='javascript:expAndNotice.makeModifyAndDeleteBtn(" + i + ")' style='cursor:pointer;'>";
						html += "</br><b>Title : " + listItem.post_title + "</b></br></br>";
						html += "Date : " + listItem.reg_ts + "</br></br>";
						html += "Content : " + listItem.post_content + "</br></br></td>";
						html += "</tr>";
					}
					html += "</table>";

					$("#notice_lists_div").empty();
					$("#notice_lists_div").html(html);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Search Lists End **********/

	/*********** Receive Replies Start **********/
	(function() {
		$class("sop.portal.expAndNoticeReply.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;

					var html = $("#list_" + expAndNotice.selectIndex).html();

					for (var i = 0; i < result.summaryListReply.length; i++) {
						var listItem = result.summaryListReply[i];

						html += "</br></br>";
						html += "==========================================</br>";
						html += "==========================================</br>";
						html += "</br></br>" + listItem.post_title + "</br></br>";
						html += listItem.reg_ts + "</br></br>";
						html += listItem.post_content + "</br></br></td>";
					}

					$("#list_" + expAndNotice.selectIndex).html(html);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Replies End **********/

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