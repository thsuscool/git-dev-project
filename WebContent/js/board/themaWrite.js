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

	W.$themaWrite = W.$$themaWrite || {};

	// 최초 페이지 실행 시 최근 항목 가져옴
	$(document).ready(function() {		
		themaWrite.init(themaWrite.qnaCd);
		$("#thema_regist_title_input").val("");
	});

	themaWrite = {
		qnaCd : "BOARD_003",			// 게시판 코드 ( 고정으로 사용 )
		receiveLists : null,			// 조회 항목들
		selectIndex : null,				// 사용자 선택 항목 인덱스
		
		init : function(board_cd) {
			this.boardCd = board_cd;
			
			var themaboard = new sop.serviceAPI.themaboard.api();
			themaboard.addParam("board_cd", this.boardCd);
			themaboard.request({
				method : "POST",
				async : false,
				url : contextPath+"/ServiceAPI/board/boardCommonSetting.json"
			});
		},
		
		// 게시판 목록 생성
		makeQnaLists : function (obj) {
			themaWrite.removeFileOnModifyMode();
			$("#qna_regist_title_input").val("");
			$("#qna_regist_content_input").val("");
			
			var tempObj = obj;
			$("#qna_regist_category_selects").combobox({
				data : tempObj,
			});
			
			if(browserFnc() != -1 && browserFnc() < 10) {
				document.forms["qnaFileUploadForm"].reset();
			}
			
			$("#qna_regist_category_selects").combobox('select', tempObj[0].value);
			$("#qna_regist_file").val("");
			$("#qna_file").val("");
			
		},
		
		removeFileOnModifyMode : function() {
			$("#thema_file").prop('disabled', false);
			$("#themaFileTr").hide();
		},
		readyRegistQna : function(obj) {
			themaWrite.isRegistMode = true;
			
			$("#qna_regist_title_input").val("");
			$("#qna_regist_content_input").val("");
			$("#qna_regist_secret_code_input").val("");
			
			board.refreshSecretCode();
			
			var tempObj = obj;
			$("#qna_regist_category_selects").combobox({
				data : tempObj,
			});
			$("#qna_regist_category_selects").combobox('select', tempObj[0].value);
			
			//ie8,9일 경우, 파일업로드 폼 구성
		    if(browserFnc() != -1 && browserFnc() < 10) {
		    	$(".file_input_textbox").remove();
		    	$(".file_input_button").remove();
		    	$(".file_input_hidden").remove();
		    }else {
		    	$(".file_input_ie9").remove();
		    }
		},
		
		openFileBrowser : function() {
			$("#thema_file").click();
		},
		
		setFileName : function(value) {
			var fileName = value.substring(value.lastIndexOf('\\') + 1);
			$("#thema_regist_file").val(fileName);
			
			var file = $("#thema_file").val();
		},
	
		checkSecretCode : function() {
			var title = $("#thema_regist_title_input").val();
			var content = $("#thema_regist_content_input").val();
			
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
			
			var inputStr = $("#thema_regist_secret_code_input").val();
			if(inputStr == null || inputStr.length < 1) {
				messageAlert.open("알림", "보안코드를 입력하여 주세요.");
				return;
			}
			
			var file = $("#thema_file").val();
			if(file != null && file.length > 1 && file.trim().length > 1) {
				if(browserFnc() != -1 && browserFnc() < 10) {
					$("#themaFileUploadForm").ajaxForm({
						async: false,
						type : "POST",
						url : contextPath + "/ServiceAPI/board/fileUploadCheck.form",
						dataType: "json",
						encoding: "utf-8",
						beforeSubmit: function(data, frm, opt) {
							var ext = $('#thema_file').val().split('.').pop().toLowerCase();
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
								themaWrite.submitData();
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
					var name = $("#thema_file")[0].files[0].name;
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
					
					if($("#thema_file")[0].files[0].size > 22020096) {
						if($("#thema_file")[0].files[0].name != 'neighbor_pass_file.zip') {
							messageAlert.open("알림", "첨부파일 제한 용량은 20MB 입니다.");
							return;
						}
					}
					themaWrite.submitData();
				}
			} else {
				
				themaWrite.submitData();
			}
		},
		
		submitData : function() {
			if(themaWrite.isRegistMode) {
				themaWrite.themaRegist();
			} else {
				themaWrite.themaModify();
			}
			$("#thema_regist_secret_code_input").val("");
		},
		themaRegist : function () {
			var inputStr = $("#thema_regist_secret_code_input").val();
			var file = $("#thema_file").val();
			if(file != null && file.length > 1 && file.trim().length > 1) {
				themaWrite.themaRegistForm();
			} else {
				var title = encodeURIComponent($("#thema_regist_title_input").val());
				var content = encodeURIComponent($("#thema_regist_content_input").val());
				var sopPortalThemaObj = new sop.portal.themaRegist.api();
				/*sopPortalThemaObj.addParam("board_cd", themaAndRequest.themaCd);*/
				sopPortalThemaObj.addParam("post_depth", 0);
				sopPortalThemaObj.addParam("post_order", 0);
				sopPortalThemaObj.addParam("post_title", title);
				sopPortalThemaObj.addParam("post_content", content);
				sopPortalThemaObj.addParam("low_rank_s_class_cd", "THEMRQ");
				sopPortalThemaObj.addParam("priority_disp_yn", "N");
				sopPortalThemaObj.addParam("input_code", inputStr);
				sopPortalThemaObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/board/boardRegist.json"
				});
			}
		},
		
		themaRegistForm : function () {			
			$("#themaFileUploadForm").ajaxForm({
				async: false,
				type : "POST",
				url : contextPath + "/ServiceAPI/board/boardRegistForm.form",
				data : {
					input_code : $("#thema_regist_secret_code_input").val(),
					board_cd : themaWrite.themaCd,
					post_depth : 0,
					post_order : 0,
					post_title : $("#thema_regist_title_input").val(),
					post_content : $("#thema_regist_content_input").val(),
					low_rank_s_class_cd : "THEMRQ",
					priority_disp_yn : "N",
					file_yn : 'Y'
				},
				dataType: "json",
				beforeSend: function(xhr) {
//					console.log("beforeSend");
				},
				success: function(data) {
					if(data.errCd == "0") {
						window.location = contextPath+ "/view/board/qnaAndRequest?type=thema";
//						window.history.back();
						/*themaAndRequest.selectIndex = null;
						themaAndRequest.prevHtmlSouce = null;
						board.refreshSecretCode();
						themaAndRequest.makeThemaLists();
						qnaAndRequest.makeQnaLists();*/
					} else {
						messageAlert.open("알림", data.errMsg);
					}
		        },
		        complete: function() {
//		        	console.log("complete");
		        },
		        error: function(xhr, textStatus, error) {
					board.refreshSecretCode();
		        }
			}).submit();
		},
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.faq.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					console.log(result);
					themaWrite.receiveLists = result.summaryList;

					var html = "";
					var htmlTitle="";
					html += "<ul style='padding-top:0px;'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						
						html += "<li id='faq_list_" + i + "'>";
						html += "<p style='background:none; padding-left:850px;padding-top:0px;'>";
						html += listItem.reg_ts;
						html += "</p>";
						html += "<p style='background:none;padding-top:0px;'>";
						html += content;
						html += "</p>";
						html += "</li>";
						
						htmlTitle += title;
						html += "<dl>";
						if(listItem.low_rank_s_class_cd == "REQST") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type1.gif' alt='개선요청'></dt>";
						} else if(listItem.low_rank_s_class_cd == "QUERY") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type2.gif'  alt='일반문의'></dt>";
						} else if(listItem.low_rank_s_class_cd == "THEMRQ") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type3.gif' alt='통계주제도 요청'></dt>";
						}
					
						if(listItem.file_yn == 'y' || listItem.file_yn == 'Y') {
							html += "</BR>";
//							html += "첨부파일 : ";
							html += "<a href='javascript:qnaView.downloadFile(" + i + ");' align='center'>"
							html += "<img src='/img/board/attachment.jpg'></br>"
							html += listItem.file_nm + "." + listItem.file_extension;
							html += "</img></a>";
						}
						console.log("modifyMode ", listItem.modifyMode);
						if(listItem.modifyMode) {
							html += "</br>";
							html += "<table id='qna_btn_table_" + i + "' align='right'><th>";
							html += "<td>";
							html += "<button class='modify' style='width: 100px;height: 30px;font-size: 11px;color: #fff;background-color: #4e86b5;font-weight: bold; margin-bottom: 20px;' onclick='javascript:qnaAndRequest.setQnaData();'>수정</button>";
							html += "</td>";
							html += "<td>";
							html += "<button class='delete' style='width: 100px;height: 30px;font-size: 11px;color: #fff;background-color: #ee7200;font-weight: bold; margin-bottom: 20px;' onclick='javascript:qnaAndRequest.confirmDelete();'>삭제</button>";
							html += "</td>";
							html += "</th></table>";
							html += "</br>";
						}
						html += "</dd>";
						html += "</dl>";
					}
					html += "<a href='/view/board/qnaAndRequest?type=thema' class='anc-btn black qnaboardclose' style='width:80px; margin-left: 880px'>목록</a>";
					html += "</ul>";
					
					$(".ptit").html(htmlTitle);
					$("#qna_list").empty();
					$("#qna_list").html(html);
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}
		
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Lists End **********/
	
	/*********** 게시판 분류 값 설정 Start **********/
	(function() {
	    $class("sop.serviceAPI.themaboard.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	            if(res.errCd == "0") {
	            	var result = res.result.board_common;
	            	
	            	var tempArr = [];
	            	for(var i = 0; i < result.length; i++) {
	            		if(i == 0) {
	            			themaWrite.boardNm = result[0].board_nm;
	            			themaWrite.boardExp = result[0].board_exp;
	            			themaWrite.fileUploadYn = result[0].file_upload_yn;
	            			themaWrite.fileUploadSz = result[0].file_upload_sz;
	            			themaWrite.commentRegYn = result[0].comment_reg_yn;
	            			themaWrite.commentRegLimitCnt = result[0].comment_reg_limit_cnt;
	            			themaWrite.replyRegYn = result[0].reply_reg_yn;
	            			themaWrite.regAuthorityClass = result[0].reg_authority_class;
	            			themaWrite.lowRankBClassCd = result[0].low_rank_b_class_cd;
	            		}
	            		
	            		if(result[i].s_class_cd != null && result[i].s_class_cd != "THEMRQ") {
	            			var tempObj = {};
		            		tempObj.value = result[i].s_class_cd;
		            		tempObj.text = result[i].s_class_cd_nm;
		            		
		            		if(i == 0) {
		            			tempObj.selected = true;
		            		}
		            		tempArr.push(tempObj);
	            		}
	            	}
	            	themaWrite.lowRankSClassCd = tempArr;
	            	console.log("themaWrite.lowRankSClassCd ::", themaWrite.lowRankSClassCd);
	            	themaWrite.makeQnaLists(themaWrite.lowRankSClassCd);
	            	themaWrite.readyRegistQna(themaWrite.lowRankSClassCd);
	            } else if(res.errCd == "-401") {
	            	accessTokenInfo();
	            	setTimeout(map.openApiBoundaryStatsarea(map.apiBoundaryStatsareaParam[0]), 500);
	            } else {
//	            	messageAlert.open("알림", res.errMsg);
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** Regist Start **********/
	(function() {
		$class("sop.portal.themaRegist.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					window.location = contextPath+ "/view/board/qnaAndRequest?type=thema";
//					window.history.back();
					/*themaAndRequest.selectIndex = null;
					themaAndRequest.prevHtmlSouce = null;
					board.refreshSecretCode();
					themaAndRequest.makeThemaLists();
					qnaAndRequest.makeQnaLists();*/
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
	/*********** Regist End **********/
	/*********** 게시판 분류 값 설정 End **********/
}(window, document));