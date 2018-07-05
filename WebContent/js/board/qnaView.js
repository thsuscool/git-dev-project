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

	W.$qnaView = W.$qnaView || {};

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
		
		qnaView.receivePostNo = getParameter("post_no");
		qnaView.receiveBoardCd = getParameter("board_cd");
		
		qnaViewObj = {board_cd : qnaView.receiveBoardCd, post_no : qnaView.receivePostNo };
		qnaView.modifyPostHits(qnaViewObj);
		
		qnaView.makeFaqLists();
		//console.log(qnaView.receivePostNo);
	});

	qnaView = {
	
		receiveLists : null,			// 조회 항목들
		selectIndex : null,				// 사용자 선택 항목 인덱스
		receiveBoardCd : 'BOARD_003',
		receivePostNo : null,
		
		// 게시판 상세 목록 생성
		makeFaqLists : function () {			
			var sopPortalFaqObj = new sop.portal.faq.api();
			sopPortalFaqObj.addParam("post_no", qnaView.receivePostNo);
			sopPortalFaqObj.addParam("board_cd", qnaView.receiveBoardCd);
			sopPortalFaqObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardListsView.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},
		downloadFile : function(index) {
			
			//mng_s 20171012 보안조치
			/*
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
	        
	        target.attr('value', qnaView.receiveLists[0].file_id);

	        target = $('#file_nm');
	        target.attr('name', 'file_nm');
	        target.attr('value', qnaView.receiveLists[0].file_nm);
	        
	        target = $('#file_path');
	        target.attr('name', 'file_path');
	        target.attr('value', qnaView.receiveLists[0].file_path);

	        target = $('#file_extension');
	        target.attr('name', 'file_extension');
	        target.attr('value', qnaView.receiveLists[0].file_extension);
	        
	        target = $('#file_content_type');
	        target.attr('name', 'file_content_type');
	        target.attr('value', qnaView.receiveLists[0].file_content_type);

	        $('#tempForm').submit();
	        $('#tempForm').remove();
	        */
			
			var what_board = "";
			if(qnaView.receiveLists[0].file_path.indexOf("BOARD_001") != -1) {
				what_board =  "BOARD_001";
			} else if(qnaView.receiveLists[0].file_path.indexOf("BOARD_002") != -1) {
				what_board =  "BOARD_002";
			} else if(qnaView.receiveLists[0].file_path.indexOf("BOARD_003") != -1) {
				what_board =  "BOARD_003";
			} else if(qnaView.receiveLists[0].file_path.indexOf("BOARD_004") != -1) {
				what_board =  "BOARD_004";
			}
			
			var openNewWindow = window.open("about:blank");
			openNewWindow.location.href= contextPath + "/upload/board/" + what_board + "/" + qnaView.receiveLists[0].file_id + "." + qnaView.receiveLists[0].file_extension;
	   
		},
		// 게시판 항목 삭제 시 확인 팝업
		confirmDelete : function () {
			qnaView.isListNotClose = true;
			if(confirm(qnaView.receivePostNo + " 번 글을 삭제 하시겠습니까?\r\n댓글도 함께 삭제 됩니다.")) {
				qnaView.qnaDelete(qnaView.receivePostNo, qnaView.receiveBoardCd);
			}
		},

		// 게시판 항목 삭제
		qnaDelete : function (post_no, board_cd) {
			var sopPortalQnaObj = new sop.portal.qnaDelete.api();
			sopPortalQnaObj.addParam("board_cd", board_cd);
			sopPortalQnaObj.addParam("post_no", post_no);
			sopPortalQnaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardDelete.json"
			});
		},
		
		// 게시판 항목 수정 시 입력 내용 설정
		setQnaData : function (obj) {
			
			window.location.href = contextPath + "/view/board/qnaModify?post_no="+qnaView.receivePostNo+"&board_cd="+qnaView.receiveBoardCd;
			
			/*$("#qna_file").val("");
			$("#qna_regist_file").val("")
			
			qnaView.isListNotClose = true;
			var fl = $(".qnaboardclose").attr("class");
			
			if(fl == "anc-btn black qnaboardclose on") {
				qnaView.readyRegistQna();
				
				$("#qnaboardclose").html("입력폼닫기");
				$(".qnaboardclose").removeClass("on");
				$("#qna_input_form").slideDown();
			}
			
			$("#qnaRegistBtn").html("글 수정");
			
			window.scrollTo(0, 500);
			qnaView.isRegistMode = false;
			
			var selectObj = qnaView.receiveLists[qnaView.selectIndex];
			
			if(selectObj.file_nm !== null && selectObj.file_nm !== undefined) {
				$("#qna_file").prop('disabled', true);
				$("#qnaFileTrName").html(selectObj.file_nm + "." + selectObj.file_extension);
				$("#qnaFileTr").show();
			}*/
			
			/*$("#qna_regist_title_input").html(selectObj.post_title);
			$("#qna_regist_title_input").val($("#qna_regist_title_input").text());
			$("#qna_regist_content_input").html(selectObj.post_content);
			$("#qna_regist_content_input").val($("#qna_regist_content_input").text());
			$("#qna_regist_category_select").combobox('select', (selectObj.low_rank_s_class_cd).trim());
			$("#qna_regist_priority_select").combobox('select', (selectObj.priority_disp_yn).trim());*/
		},
		getQnaListsReply : function () {
			var sopPortalQnaObj = new sop.portal.qnaAndRequestReply.api();
			sopPortalQnaObj.addParam("board_cd", qnaView.receiveBoardCd);
			sopPortalQnaObj.addParam("post_no", qnaView.receivePostNo);
			sopPortalQnaObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsReply.json"
			});
		},
		
		// 게시글 조회수 수정
		modifyPostHits : function (obj) {
			if(obj == null || obj == undefined) {
				return;
			}
			
			var sopPortalQnaObj = new sop.portal.qnaModifyPostHits.api();
			sopPortalQnaObj.addParam("board_cd", obj.board_cd);
			sopPortalQnaObj.addParam("post_no", obj.post_no);
			
			sopPortalQnaObj.request({
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
					qnaView.receiveLists = result.summaryList;
					var html = "";
					var htmlTitle="";
					html += "<ul style='padding-top:0px;'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						
						var reply = "";
						if ( listItem.reply_content != null ) {
							reply = listItem.reply_content.replace(/\n/gim, "</br>");
						}
						
						var id = listItem.reg_member_id;
						var ast = id.slice(1, id.length-1);
						var user_id = "";
						for ( var i=0; i <ast.length; i++){
							user_id = user_id.concat(ast[i].replace(ast[i], "*"));
						}
						user_id =id.charAt().concat(user_id.concat(id.charAt(id.length-1)));
						html += "<li id='qna_list_" + i + "'>";
						html += "<p style='background:none; padding-top:0px; text-align: right;'>";
						if(!listItem.post_hits){
							listItem.post_hits = 0;
						}
						html += "&nbsp;&nbsp;&nbsp;<span>" + user_id + "</span>";
						html += "&nbsp;&nbsp;&nbsp;<span>" + listItem.reg_ts + "</span>";
						html += "&nbsp;&nbsp;&nbsp;<span>조회수 " + listItem.post_hits + "</span>";
						html += "<div sytle='height:100px;'>";
						html += "</div>";
						html += "<p style='background:none;padding-top:0px;'>";
						html += content;
						html += "</p>";
						html += "</li>";
						
						if ( listItem.reply_content != null ) {
							html += "<li>";
							html += "<p style='background:none; padding-left:850px;padding-top:0px;'>";
							html += "";
							html += "</p>";
							html += "<p style='background:none;padding-top:0px;'>";
							html += "</br></br>";
							html += "" + reply;
							html += "</p>";
							html += "</li>";
						}
						
						htmlTitle += title;
						html += "<dl>";
						if(listItem.low_rank_s_class_cd == "REQST") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type1.gif'  alt='개선요청'></dt>";
						} else if(listItem.low_rank_s_class_cd == "QUERY") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type2.gif' alt='일반문의'></dt>";
						} else if(listItem.low_rank_s_class_cd == "THEMRQ") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type3.gif' alt='통계주제도 요청'></dt>";
						}
					
						if(listItem.file_yn == 'y' || listItem.file_yn == 'Y') {
							html += "</BR>";
//							html += "첨부파일 : ";
							html += "<a style='font-size:12px;' href='javascript:qnaView.downloadFile(" + i + ");' align='center'>"
							html += "<img src='/img/board/attachment.jpg'></br>"
							html += listItem.file_nm + "." + listItem.file_extension;
							html += "</img></a>";
						}
						if(listItem.modifyMode) {
							html += "</br>";
							html += "<table id='qna_btn_table_" + i + "' align='right'><th>";
							html += "<td>";
							html += "<button class='modify' style='width: 100px;height: 30px;font-size: 11px;color: #fff;background-color: #4e86b5;font-weight: bold; margin-bottom: 20px;' onclick='javascript:qnaView.setQnaData();'>수정</button>";
							html += "</td>";
							html += "<td>";
							html += "<button class='delete' style='width: 100px;height: 30px;font-size: 11px;color: #fff;background-color: #ee7200;font-weight: bold; margin-bottom: 20px;' onclick='javascript:qnaView.confirmDelete();'>삭제</button>";
							html += "</td>";
							html += "</th></table>";
							html += "</br>";
						}
						html += "</dd>";
						html += "</dl>";
						
						var replyItem = listItem.reply;
						for(var j = 0; j < replyItem.length; j++) {
							var tempObj = replyItem[j];
							
							html += "<p style='display: none;'>";
							html += tempObj.post_content.replace(/\n/gim, "</br>");
							html += "</p>";
						}
					}
					
					var type = "qna";
					if(listItem.low_rank_s_class_cd == "THEMRQ"){
						type = "thema";
					}
					
					html += "<a href='/view/board/qnaAndRequest?type="+type+"' class='anc-btn black qnaboardclose' style='width:80px; margin-left: 880px'>목록</a>";
					html += "</ul>";
					
					$(".ptit").html(htmlTitle);
					$("#qna_list").empty();
					$("#qna_list").html(html);
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}
				qnaView.getQnaListsReply();
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Lists End **********/
	/*********** Delete Start **********/
	(function() {
		$class("sop.portal.qnaDelete.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					qnaView.selectIndex = null;
					qnaView.prevHtmlSouce = null;
					//board.refreshSecretCode();
					window.history.back();
					/*qnaAndRequest.makeQnaLists();
					themaAndRequest.makeThemaLists();*/
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Delete End **********/
	/*********** Receive Replies Start **********/
	(function() {
		$class("sop.portal.qnaAndRequestReply.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					var html = $("#qna_list_0").html();
					for(var i = 0; i < result.summaryListReply.length; i ++) {
						var listItem = result.summaryListReply[i];

						html += "</br></br>";
						html += "==========================================</br>";
						html += "==========================================</br>";
						html += "</br></br>" + listItem.post_title + "</br></br>";
						html += listItem.reg_ts + "</br></br>";
						html += listItem.post_content + "</br></br></td>";
					}

					$("#qna_list_0").html(html);
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
	(function() {
		$class("sop.portal.qnaModifyPostHits.api").extend(sop.portal.absAPI).define({
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