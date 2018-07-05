/**
 * 게시판 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 석진혁
 * version : 1.0
 * see : 
 *
 */

/*function init() {
	expAndNoticeView.receiveType = getParameter("type");
	expAndNoticeView.receivePostNo = getParameter("board_no");
	expAndNoticeView.makeNoticeLists();
}*/

(function(W, D) {
	//"use strict";

	W.$expAndNoticeView = W.$expAndNoticeView || {};

	// 최초 페이지 실행 시 최근 항목 가져옴
	$(document).ready(function() {
		
		//맨위로 버튼///////
		var scrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
		$("#topScrollTag").css("left", scrollWidthVal)
		$(window).scroll(function(){
		    var currentScrollY = $(this).scrollTop();
		    if(currentScrollY >= 500){
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

		/*board.init(expAndNotice.noticeCd);

		$(".board_tabs > a").click(function() {
			$(".board_tabs > a").removeClass("active");
			$(this).addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($(".board_tabs > a").index(this)).show();
		});*/
		
		expAndNoticeView.receiveType = getParameter("type");
		expAndNoticeView.receivePostNo = getParameter("post_no");
		
		expAndNoticeViewObj = {board_cd : expAndNoticeView.noticeCd, post_no : expAndNoticeView.receivePostNo };
		expAndNoticeView.modifyPostHits(expAndNoticeViewObj);
		
		expAndNoticeView.makeNoticeLists();
	})

	expAndNoticeView = {
		currentPageIndex : 1, // 현재 페이지 인덱스
		prevHtmlSouce : null, // 글 항목 생성 HTML 소스 임시저장
		receiveLists : null, // 조회 항목들
		selectIndex : null, // 사용자 선택 항목 인덱스

		searchType : null, // 검색 항목 ( 제목, 내용, 제목+내용 )
		searchWord : null, // 검색어

		receiveType : null, // 개발자 사이트에서 호출한 파라미터 ( 게시판 종류 )
		receivePostNo : null, // 개발자 사이트에서 호출한 파라미터 ( 게시글 번호 )

		noticeCd : "BOARD_001", // 게시판 코드 ( 고정으로 사용 )

		/*setTab : function() {
			$(".board_tabs > a").removeClass("active");
			$("#board_tabs_notice").addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($("#board_tabs_notice").index(this)).show();
		},*/

		// 게시판 목록 페이징 처리
		/*expAndNoticePaging : function(totalCount, currentIndex) {
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
		},*/

		// 게시판 상세 목록 생성
		makeNoticeLists : function () {			
			var sopPortalexpAndNoticeObj = new sop.portal.expAndNoticeView.api();
			sopPortalexpAndNoticeObj.addParam("post_no", expAndNoticeView.receivePostNo);
			sopPortalexpAndNoticeObj.addParam("board_cd", expAndNoticeView.noticeCd);
			sopPortalexpAndNoticeObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardListsView.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},
		
		// 게시판 목록 생성
		/*makeNoticeLists : function() {
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
		},*/

		// 게시판 검색
		/*searchNoticeLists : function() {
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
		},*/

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

		downloadFile : function(index) {
			var target;

			target = $('body');
			target.prepend("<form id='tempForm'></form>");

			target = $('#tempForm');
			target.attr("method", "post");
			target.attr("style", "top:-3333333333px;");
			target.attr("action", contextPath + "/ServiceAPI/board/downloadFile.download");
			target.attr("enctype", "multipart/form-data");
			target.append("<input type='hidden' id='file_id'>");
			target.append("<input type='hidden' id='file_nm'>");
			target.append("<input type='hidden' id='file_path'>");
			target.append("<input type='hidden' id='file_extension'>");
			target.append("<input type='hidden' id='file_content_type'>");

			target = $('#file_id');
			target.attr('name', 'file_id');
			target.attr('value', expAndNoticeView.receiveLists[0].file_id);

			target = $('#file_nm');
			target.attr('name', 'file_nm');
			target.attr('value', expAndNoticeView.receiveLists[0].file_nm);

			target = $('#file_path');
			target.attr('name', 'file_path');
			target.attr('value', expAndNoticeView.receiveLists[0].file_path);

			target = $('#file_extension');
			target.attr('name', 'file_extension');
			target.attr('value', expAndNoticeView.receiveLists[0].file_extension);

			target = $('#file_content_type');
			target.attr('name', 'file_content_type');
			target.attr('value', expAndNoticeView.receiveLists[0].file_content_type);

			$('#tempForm').submit();
			$('#tempForm').remove();
		},
		
		// 게시글 조회수 수정
		modifyPostHits : function (obj) {
			if(obj == null || obj == undefined) {
				return;
			}
			
			var sopPortalExpAndNoticeObj = new sop.portal.expAndNoticeModifyPostHits.api();
			sopPortalExpAndNoticeObj.addParam("board_cd", obj.board_cd);
			sopPortalExpAndNoticeObj.addParam("post_no", obj.post_no);
			
			sopPortalExpAndNoticeObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsHitAdd.json"
			});
		},
		
		/*controlListItem : function(post_no) {			
			window.location.href = contextPath + "/view/board/expAndNoticeView?post_no="+post_no;
			if (index < 0) {
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
			}
		},*/
	};
	
	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.expAndNoticeView.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					
					expAndNoticeView.receiveLists = result.summaryList;

					var html = "";
					var htmlTitle="";
					html += "<ul style='padding-top:0px;'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						
						html += "<li id='exp_list_" + i + "'>";
						html += "<p style='background:none; text-align: right; padding-top:0px;'>";
						if(!listItem.post_hits){
							listItem.post_hits = 0;
						}
						html += "<span>" + listItem.reg_ts + "</span>";
						html += "&nbsp;&nbsp;&nbsp;<span>조회수 " + listItem.post_hits + "</span>";
						html += "</p>";
						if (listItem.priority_disp_yn == 'y' || listItem.priority_disp_yn == "Y") {
							html += "<img style='width: 28px; height: 28px;' src='/img/nm/icon_notice_priority.png'> ";
						}
						html +=  "</a>";
						html += "<dl>";
						html += "<div>";
						html += "<dd class='list_con'><p><textarea id='POST_CONTENT" + i
								+ "' style='width:930px;height:auto;' ></textarea>";
						html += "</div>"
						if (listItem.file_yn == 'y' || listItem.file_yn == 'Y') {
							html += "</BR>";
							html += "<a style='font-size:12px;' href='javascript:expAndNoticeView.downloadFile(" + i + ");' align='center'>";
							html += "<img src='/img/board/attachment.jpg'></br>";
							html += listItem.file_nm + "." + listItem.file_extension;
							html += "</a>";
						}
						html += "</p></dd>";
						html += "</dl>";
						html += "</li>";
						
						htmlTitle += title;
						
					}
					html += "<a href='/view/board/expAndNotice;' class='anc-btn black qnaboardclose' style='width:80px; margin-left: 880px'>목록</a>";
					html += "</ul>";
					$(".ptit").html(htmlTitle);
					$("#notice_list").empty();
					$("#notice_list").html(html);					
					$(".list_con").css("height", "auto");
					
					
					var editorlist=[];
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
					}
					
					
					//CKEDITOR 적용
					/*
	            	CKEDITOR.replace('POST_CONTENT0', {
	            		resize_enabled : false,									
						readOnly : true,
						removePlugins : 'toolbar,elementspath,resize',
						extraPlugins : 'autogrow',
						autoGrow_onStartup :true,
						contentsCss : 'body {overflow:hidden}'
					});
	            	
					var content = result.summaryList[0].post_content.replace(/&quot;/gi, "'");  //이걸 사용하면 링크가 않됨
					$('#POST_CONTENT0').html(content);
					CKEDITOR.instances.POST_CONTENT0.setData($('#POST_CONTENT0').text());
					*/
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}
		
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Lists End **********/
	/*********** modify post hits Start **********/
	(function() {
		$class("sop.portal.expAndNoticeModifyPostHits.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					console.log("success");
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** modify post hits End **********/
	/*********** Receive Lists Start **********/
/*	(function() {
		$class("sop.portal.expAndNoticeReply.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					console.log(result);
					faqView.receiveLists = result.summaryList;

					var html = "";
					var htmlTitle="";
					html += "<ul style='padding-top:0px;'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						
						html += "<li id='exp_list_" + i + "'>";
						html += "<p style='background:none; padding-left:850px;padding-top:0px;'>";
						html += listItem.reg_ts;
						html += "</p>";
						html += "<p style='background:none;padding-top:0px;'>";
						html += content;
						html += "</p>";
						html += "</li>";
						
						htmlTitle += title;
					}
					html += "<a href='javascript:history.back();' class='anc-btn black qnaboardclose' style='width:80px; margin-left: 880px'>목록</a>";
					html += "</ul>";
					$(".ptit").html(htmlTitle);
					$("#notice_list").empty();
					$("#notice_list").html(html);
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}
		
			},
			onFail : function(status) {
			}
		});
	}());*/
	/*********** Receive Lists End **********/
	
	// 2016.12.02 시큐어코딩 삭제

	/*********** Receive Replies Start **********/
	/*(function() {
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
	}());*/
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