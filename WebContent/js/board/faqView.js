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
	W.$faqView = W.$faqView || {};

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
		
		faqView.receivePostNo = getParameter("post_no");
		faqView.receiveBoardCd = getParameter("board_cd");
		
		faqViewObj = {board_cd : faqView.board_cd, post_no : faqView.receivePostNo };
		faqView.modifyPostHits(faqViewObj);
		
		faqView.makeFaqLists();
	});

	faqView = {
	
		receiveLists : null,			// 조회 항목들
		board_cd : 'BOARD_002',
		// 게시판 상세 목록 생성
		makeFaqLists : function () {			
			var sopPortalFaqObj = new sop.portal.faq.api();
			sopPortalFaqObj.addParam("post_no", faqView.receivePostNo);
			sopPortalFaqObj.addParam("board_cd", faqView.receiveBoardCd);
			sopPortalFaqObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardListsView.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},
		
		// 게시글 조회수 수정
		modifyPostHits : function (obj) {
			if(obj == null || obj == undefined) {
				return;
			}
			
			var sopPortalFaqObj = new sop.portal.faqModifyPostHits.api();
			sopPortalFaqObj.addParam("board_cd", obj.board_cd);
			sopPortalFaqObj.addParam("post_no", obj.post_no);
			
			sopPortalFaqObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsHitAdd.json"
			});
		},
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.faq.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					faqView.receiveLists = result.summaryList;

					var html = "";
					var htmlTitle="";
					html += "<ul style='padding-top:0px;'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var contents = listItem.post_content.replace(/\n/gim, "</br>");
						
						html += "<li id='faq_list_" + i + "'>";
						html += "<p style='background:none; padding-top:0px; text-align: right;'>";
						if(!listItem.post_hits){
							listItem.post_hits = 0;
						}
						html += "<span>조회수 " + listItem.post_hits + "</span>";
						html += "&nbsp;&nbsp;&nbsp;<span>" + listItem.reg_ts + "</span>";
						html += "<div sytle='height:100px;'>";
						html += "<dd class='list_con'><p><textarea id='POST_CONTENT"
								+ "' style='width:930px;height:auto;' ></textarea></P>";
						html += "</div>";
						html += "<p style='background:none;padding-top:0px;'>";
//						html += content;
						html += "</p>";
						html += "</li>";
						
						htmlTitle += title;
					}
					
					
					html += "<a href='/view/board/qnaAndRequest' class='anc-btn black qnaboardclose' style='width:80px; margin-left: 880px'>목록</a>";
					html += "</ul>";
					$(".ptit").html(htmlTitle);
					$("#faq_list").empty();
					
					
					$("#faq_list").html(html);
					
//					var editorlist=[];
//					editorlist[0]=CKEDITOR.replace('POST_CONTENT', {
//						resize_enabled : false,									
//						readOnly : true,
//						removePlugins : 'toolbar,elementspath,resize',
//						extraPlugins : 'divarea,autogrow',
//						autoGrow_onStartup :true,
//						contentsCss : 'body {overflow:hidden}'
//					});
					
					//editorlist[0].setData(contents);
					
					
					//관리자에서 등록하면 링크가 않걸리는 문제 있음.
//					var content = contents.replace(/&lt;/gi, "<").replace(/&gt;/gi,">");
					
					//관리자에서 등록해도 링크가 걸리도록 변경==> 이경우 기존에 임의로 onclick이벤트를 주어서 링크를 걸었던 부분을 관리자에서 다시 등록해주면됨.
					//두가지가 있었는데 adm_code(2013).xls하고 다른것 하나가 더있음. DB에서 검색해 보면 될것임
					//일단 주석처리해놓고 관리자에서 문제있다고 연락오면 주석 해제하고 위에 링크걸은 부분 관리자에서 다시 걸어주고 이 코드 사용하면됨.(20160406)
					/*
					var content = contents.replace(/&lt;/gi, "<").replace(/&gt;/gi,">").replace(/&quot;/gi, "\"")
										  .replace(/&#40;/gi, "(").replace(/&#39;/gi, "'").replace(/&#41;/gi, ")")  ;
					*/
					
//					editorlist[0].setData(content);
					
					//CKEDITOR 적용
	            	CKEDITOR.replace('POST_CONTENT', {
						resize_enabled : false,									
						readOnly : true,
						removePlugins : 'toolbar,elementspath,resize',
						extraPlugins : 'autogrow',
						autoGrow_onStartup :true,
						contentsCss : 'body {overflow:hidden}'
					});
	            	
					var content = result.summaryList[0].post_content.replace(/&quot;/gi, "'"); 
					$('#POST_CONTENT').html(content);
					CKEDITOR.instances.POST_CONTENT.setData($('#POST_CONTENT').text());
					
					
					
					//iFrame이 언제 열릴지 몰라서 아래와 같이 적용. 좋은 방법 있으면 수정필요
					setInterval(function(){
						fontModify();
						}, 100);
					
					
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
		$class("sop.portal.faqModifyPostHits.api").extend(sop.portal.absAPI).define({
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
	
	
	
	
	
}(window, document));

function fontModify(){

		$("iframe").contents().find(".CSS1Compat").css("font-size", "13px");
		$("iframe").contents().find(".CSS1Compat").css("font-family", "나눔고딕");
		$("iframe").contents().find(".CSS1Compat").css("color", "#666666");

	
}