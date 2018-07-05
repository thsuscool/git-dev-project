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
		qnaModify.receivePostNo = getParameter("post_no");
		qnaModify.receiveBoardCd = getParameter("board_cd");
		qnaModify.makeFaqLists();
		//console.log(qnaView.receivePostNo);
	});

	qnaModify = {
	
		receiveLists : null,			// 조회 항목들
		selectIndex : null,				// 사용자 선택 항목 인덱스
		
		// 게시판 상세 목록 생성
		makeFaqLists : function () {			
			var sopPortalFaqObj = new sop.portal.faq.api();
			sopPortalFaqObj.addParam("post_no", qnaModify.receivePostNo);
			sopPortalFaqObj.addParam("board_cd", qnaModify.receiveBoardCd);
			sopPortalFaqObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardListsView.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},
		removeFileOnModifyMode : function() {
			$("#qna_file").prop('disabled', false);
			$("#qnaFileTr").hide();
		},
		openFileBrowser : function() {
			$("#qna_file").click();
		},
		setFileName : function(value) {
			var fileName = value.substring(value.lastIndexOf('\\') + 1);
			$("#qna_regist_file").val(fileName);
			var file = $("#qna_file").val();
		},
		qnaModify : function () {
		var inputStr = $("#qna_regist_secret_code_input").val();
		var file = $("#qna_file").val();
		var low_rank_s_class_cd;
		if($("#qna_regist_category_selects").combobox('getValue') == "개선 요청"){
			low_rank_s_class_cd = "REQST";
		}else{
			low_rank_s_class_cd = "QUERY";
		}
		
		if(file != null && file.length > 1 && file.trim().length > 1) {
			qnaModify.qnaModifyForm(low_rank_s_class_cd);
		} else {
			var title = encodeURIComponent($("#qna_regist_title_input").val());
			var content = encodeURIComponent($("#qna_regist_content_input").val());
		
			var sopPortalQnaModifyObj = new sop.portal.qnaModify.api();
			//sopPortalQnaModifyObj.addParam("board_cd",  qnaModify.receiveBoardCd);
			sopPortalQnaModifyObj.addParam("post_no", qnaModify.receivePostNo);
			sopPortalQnaModifyObj.addParam("post_title", title);
			sopPortalQnaModifyObj.addParam("post_content", content);
			sopPortalQnaModifyObj.addParam("low_rank_s_class_cd", low_rank_s_class_cd);
			sopPortalQnaModifyObj.addParam("priority_disp_yn", 'N');
			sopPortalQnaModifyObj.addParam("input_code", inputStr);
			sopPortalQnaModifyObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardModify.json"
			});
		}
	},
	
	qnaModifyForm : function (low_rank_s_class_cd) {		
		$("#qnaFileUploadForm").ajaxForm({
			async: false,
			type : "POST",
			url : contextPath + "/ServiceAPI/board/boardModifyForm.form",
			data : {
				input_code : $("#qna_regist_secret_code_input").val(),
				post_no : qnaModify.receivePostNo,
				post_title : $("#qna_regist_title_input").val(),
				post_content : $("#qna_regist_content_input").val(),
				low_rank_s_class_cd : low_rank_s_class_cd,
				priority_disp_yn : "N",
				file_yn : 'Y',
			},
			dataType: "json",
			encoding: "utf-8",
			beforeSend: function(xhr) {
//				console.log("beforeSend");
			},
			success: function(data) {
				if(data.errCd == "0") {					
					/*$("#qnaRegistBtn").html("질문등록");
					qnaAndRequest.isRegistMode = true;
					qnaAndRequest.selectIndex = null;
					qnaAndRequest.prevHtmlSouce = null;
					board.refreshSecretCode();
					qnaAndRequest.makeQnaLists();
					themaAndRequest.makeThemaLists();*/
					window.history.back();
				} else {
					messageAlert.open("알림", data.errMsg);
					board.refreshSecretCode();
				}
	        },
	        complete: function() {
//	        	console.log("complete");
	        },
	        error: function(xhr, textStatus, error) {
				board.refreshSecretCode();
	        }
		}).submit();
	},
	checkSecretCode : function() {
		var title = $("#qna_regist_title_input").val();
		var content = $("#qna_regist_content_input").val();
		
		if(title.length < 1) {
			messageAlert.open("알림", "제목을 입력하여 주세요.");
			return;
		} else if(title.length > 65) {
			messageAlert.open("알림", "제목은 65자 까지만 입력 가능 합니다.");
			return;
		}
		
		if(content.length < 1) {
			messageAlert.open("알림", "내용을 입력하여 주세요.");
			return;
		} else if(content.length > 1330) {
			messageAlert.open("알림", "내용은 1330자 까지만 입력 가능 합니다.");
			return;
		}
		
		var inputStr = $("#qna_regist_secret_code_input").val();
		if(inputStr == null || inputStr.length < 1) {
			messageAlert.open("알림", "보안코드를 입력하여 주세요.");
			return;
		}
		var file = $("#qna_file").val();
		if(file != null && file.length > 1 && file.trim().length > 1) {
			
			if(browserFnc() != -1 && browserFnc() < 10) {
				$("#qnaFileUploadForm").ajaxForm({
					async: false,
					type : "POST",
					url : contextPath + "/ServiceAPI/board/fileUploadCheck.form",
					dataType: "json",
					encoding: "utf-8",
					beforeSubmit: function(data, frm, opt) {
						var ext = $('#qna_file').val().split('.').pop().toLowerCase();
						if($.inArray(ext, mimeTypeList.extension) == -1) {
							var html = "<h2>업로드가 제한된 파일 입니다.</h2>";
							html += "</br>"
							html += "<table align='center' style='font-size:17px;'>";
							html += "<tr><td align='left'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※&nbsp;업로드 가능 파일</b></td></tr>";
							html += "<tr>";
							html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;압축 파일 (zip)</td>";
							html += "</tr>";
							html += "<tr>";
							html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;이미지 파일 (jpg, png, bmp, gif)</td>";
							html += "</tr>";
							html += "<tr>";
							html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;문서 파일 (한글, 워드, 엑셀, 파워포인트, PDF)</td>";
							html += "</tr>";
							html += "</table>";
							messageAlert.open("알림", html);
							return false;
						}
						return true;
					},
					success: function(data) {
						if (data.result.size < 22020096) {
							qnaModify.submitData();
						}else {
							messageAlert.open("알림", "첨부파일 제한 용량은 20MB 입니다.");
						}
			        },
			        complete: function() {
			        },
			        error: function(xhr, textStatus, error) {
			        	alert("실패")
			        	return;
			        }
				}).submit();
				
				
			} else {
				var name = $("#qna_file")[0].files[0].name;
				name = name.toLowerCase();
				var extension = name.substring(name.lastIndexOf(".") + 1);
				
				if(!isPossibleMimeType("extension", extension)){ //확장자를 확인합니다.
					var html = "<h2>업로드가 제한된 파일 입니다.</h2>";
					html += "</br>"
					html += "<table align='center' style='font-size:17px;'>";
					html += "<tr><td align='left'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※&nbsp;업로드 가능 파일</b></td></tr>";
					html += "<tr>";
					html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;압축 파일 (zip)</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;이미지 파일 (jpg, png, bmp, gif)</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;문서 파일 (한글, 워드, 엑셀, 파워포인트, PDF)</td>";
					html += "</tr>";
					html += "</table>";
					
					messageAlert.open("알림", html);
					return;
				}
				
				if($("#qna_file")[0].files[0].size > 22020096) {
					if($("#qna_file")[0].files[0].name != 'neighbor_pass_file.zip') {
						messageAlert.open("알림", "첨부파일 제한 용량은 20MB 입니다.");
						return;
					}
				}
				qnaModify.submitData();
			}
		}else {
			qnaModify.submitData();
		}
	},
	
	submitData : function() {		
		
		qnaModify.qnaModify();
		
		$("#qna_regist_secret_code_input").val("");
	},
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.faq.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					console.log(result);
					qnaModify.receiveLists = result.summaryList;

					var html = "";
					html += "<ul style='padding-top:0px;'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/<\/br\s*\/?>/mg, "\n");						
						var content = listItem.post_content.replace(/<\/br\s*\/?>/mg, "\n");
						/*var title = listItem.post_title.replace(/\n/gim, "</br>");						
						var content = listItem.post_content.replace(/\n/gim, "</br>");*/
						$("#qna_regist_title_input").val(title);
						$("#qna_regist_content_input").val(content);
						
						if(listItem.file_nm !== null && listItem.file_nm !== undefined) {
							$("#qna_file").prop('disabled', true);
							$("#qnaFileTrName").html(listItem.file_nm + "." + listItem.file_extension);
							$("#qnaFileTr").show();
						}
					}
					html += "<a href='/view/board/qnaAndRequest?type=qna' class='anc-btn black qnaboardclose' style='width:80px; margin-left: 880px'>목록</a>";
					html += "</ul>";
					
					var low_rank;
					if(listItem.low_rank_s_class_cd == "REQST")
						low_rank ="개선 요청";
						else
							low_rank ="일반 문의";
								
					$("#qna_regist_category_selects").combobox('select', low_rank);
					
					
					$("#qna_list").empty();
					$("#qna_list").html(html);
					//ie8,9일 경우, 파일업로드 폼 구성
				    if(browserFnc() != -1 && browserFnc() < 10) {
				    	$(".file_input_textbox").remove();
				    	$(".file_input_button").remove();
				    	$(".file_input_hidden").remove();
				    }else {
				    	$(".file_input_ie9").remove();
				    }
				} else {
					messageAlert.open("알림", res.errMsg);
				}
		
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Lists End **********/
	/*********** Modify Start **********/
	(function() {
		$class("sop.portal.qnaModify.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					
					$("#qnaRegistBtn").html("질문등록");
					
					qnaModify.isRegistMode = true;
					qnaModify.selectIndex = null;
					qnaModify.prevHtmlSouce = null;
					board.refreshSecretCode();
					window.history.back();
					//qnaModify.makeQnaLists();
					//themaAndRequest.makeThemaLists();
				} else {
					messageAlert.open("알림", res.errMsg);
					board.refreshSecretCode();
				}
			},
			onFail : function(status) {
				board.refreshSecretCode();
			}
		});
	}());
	/*********** Modify End **********/
}(window, document));