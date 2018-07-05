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
	qnaAndRequest.receiveType = getParameter("type");
	qnaAndRequest.receiveCategoryCd = getParameter("categoryCd");
	
	qnaAndRequest.makeQnaLists();
	//qnaAndRequest.readyRegistQna();
	
	setTimeout(
			function(){
				settingTab();
			}, 1000
	);
}

function settingTab(){
	
	//2015.07.16 
	// 미니게시판을 통해 데이터가 넘어온 경우 setting
	var param = unescape(location.search).substring(1).split(/\&|\=/g);
	param = String(param).split(",");
	if(param[0] == "gubun"){
		if(param[1] == "BOARD_003"){
			
			if(qnaAndRequest.receiveType == undefined){
				qnaAndRequest.receiveType = "qna";
			}
			
			qnaAndRequest.setTab(qnaAndRequest.receiveType);
			if(param[2] != null){
				//alert(param[3]);
				qnaAndRequest.controlListItem(param[3]);
			}
		}
		if(param[1] == "BOARD_002"){
			if(param[2] != null){
				//alert(param[3]);
				faq.controlListItem(param[3]);
			}
		}
	}
}


function getSession() {
	board.init(qnaAndRequest.qnaCd);
	
	if(AuthInfo.authStatus) {
		$("#qna_login_box").hide();
		$("#qna_input_form_btn").show();
		//$("#qna_input_form").show();
		
		$("#thema_login_box").hide();
		$("#thema_input_form_btn").show();
		//$("#thema_input_form").show();
		
//		qnaAndRequest.addSecretCode();
	} else {
	//	$("#qna_login_box").show();
	//	$("#qna_input_form_btn").hide();
		$("#qna_login_box").hide();
		$("#qna_input_form").hide();
		
		$("#thema_login_box").show();
		$("#thema_input_form_btn").hide();
		$("#thema_input_form").hide();
	}
}

(function(W, D) {
	//"use strict";

	W.$qnaAndRequest = W.$qnaAndRequest || {};

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
		
		$("#faq_search_title_text").keydown(function(e){
			if( $(".alertPopupWrapper").length > 0 ) {
				return false;
			};
			if( e.keyCode == 13 ){
				faq.searchFaqLists();
				return false;
			}
		});
		
		$("#qna_search_title_text").keydown(function(e){
			if( $(".alertPopupWrapper").length > 0 ) {
				return false;
			};
			if( e.keyCode == 13 ){
				qnaAndRequest.searchQnaLists();
				return false;
			}
		});
		
		var obj = [{
		    "value":"post_title",
		    "label":"제목",
		    "text":"제목"
		},{
		    "value":"post_content",
		    "label":"내용",
		    "text":"내용"
		},{
		    "value":"post_all",
		    "label":"제목 + 내용",
		    "text":"제목 + 내용",
		    "selected":true
		}];
		
		$("#qna_search_select").combobox({
			data : obj,
			onSelect: function (event, ui) { 	            
				$(".article-search2:eq(1)").find("a").text($('#qna_search_select').combobox('getText'));
	    }
		});
		$("#thema_search_select").combobox({
			data : obj,
			onSelect: function (event, ui) { 	            
				$(".article-search2:eq(2)").find("a").text($('#thema_search_select').combobox('getText'));
	    }
		});
		$(".article-search2:eq(1)").find("a").text($('#qna_search_select').combobox('getText'));
		$(".article-search2:eq(2)").find("a").text($('#qna_search_select').combobox('getText'));
		$("#qna_input_form").find("a").text("-");
		$("#thema_input_form").find("a").text("-");
		
		 var x = document.createElement("LABEL");
		/*$(".article-search2:eq(0)").find("input:eq(0)").insertBefore(x);*/
		$(".article-search2:eq(1)").find("input:eq(0)").insertBefore(x);
		$(".article-search2:eq(2)").find("input:eq(0)").insertBefore(x);
		
		$('#board_tabs_qna').keydown(function(e){
			if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
				qnaAndRequest.makeQnaLists();
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
	})

	qnaAndRequest = {
		currentPageIndex : 1,			// 현재 페이지 인덱스
		prevHtmlSouce : null,			// 글 항목 생성 HTML 소스 임시저장
		receiveLists : null,			// 조회 항목들
		selectIndex : null,				// 사용자 선택 항목 인덱스
		searchType : null,				// 검색 항목 ( 제목, 내용, 제목+내용 )
		searchWord : null,				// 검색어
		qnaCd : "BOARD_003",			// 게시판 코드 ( 고정으로 사용 )
		isRegistMode : true,			// 작성 / 수정 모드 	true : 작성, false : 수정
		isListNotClose : false,			// 항목에서 수정/삭제 버튼 선택 시 리스트 접히지 않게 함
		receiveType : null,				// 개발자 사이트에서 호출한 파라미터 ( 게시판 종류 )
		receiveCategoryCd : null,			// 개발자 사이트에서 호출한 파라미터 ( 게시글 번호 )
		
		setTab : function(type) {
			$(".board_tabs1 > a").removeClass("active");
			$(".tab_contents > div").hide();
			if(qnaAndRequest.receiveType =="qna"){
				$("#board_tabs_qna").addClass("active");
				$(".qna_list").show();
			}else if(qnaAndRequest.receiveType =="thema"){
				$("#board_tabs_thema").addClass("active");
				$(".thema_list").show();
			}
			
		},
		// 게시판 목록 페이징 처리
		qnaAndRequestPaging : function (totalCount, currentIndex) {
			var pageSize = 10;										// 페이지 당 항목 개수
			var totalPage = Math.ceil( totalCount / pageSize);		// 전체 페이지 수
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
				onclick : function(e,page){							// 페이지 선택 시
					console.log(page);
					qnaAndRequest.currentPageIndex = page;
					console.log("PageIdx1", qnaAndRequest.currentPageIndex);
					qnaAndRequest.makeQnaLists();
				}
			});
		},
		
		moveLogin : function() {
			var url = statsPotalDomain + "/view/board/qnaAndRequest?type=qna"
			if(statsPotalDomain == "https://sgis.kostat.go.kr") {
				url = statsPotalDomain + "/view/board/qnaAndRequest?type=qna"
			}
			//window.location.href = contextPath + "/view/member/login?returnPage=" + url;
			goSelectLogin(url); //통합/기존 로그인 선택 페이지 이동
		},
		
		moveAgree : function() {
			window.location.href = contextPath + "/view/member/agree";
		},
		
		/*openFileBrowser : function() {
			$("#qna_file").click();
		},
		
		setFileName : function(value) {
			var fileName = value.substring(value.lastIndexOf('\\') + 1);
			$("#qna_regist_file").val(fileName);
			var file = $("#qna_file").val();
		},*/
		
		addSecretCode : function() {
			board.generateSecretCode();
			var tempStr = board.generateCode;
			var html = "";
			$("#qna_regist_secret_code_show").html(html);
			
			Holder.addTheme("new", {
				  foreground: "#ccc",
				  background: "#000",
				  size: 15,
				  text: tempStr
				}).addImage("holder.js/80x35/new", "#qna_regist_secret_code_show").run();
		},
		// 게시판 목록 생성
		makeQnaLists : function () {
			//qnaAndRequest.removeFileOnModifyMode();
			/*$("#qna_regist_title_input").val("");
			$("#qna_regist_content_input").val("");*/
			
			/*var tempObj = board.lowRankSClassCd;			
			$("#qna_regist_category_select").combobox('select', tempObj[0].value);
			$("#qna_regist_file").val("");
			$("#qna_file").val("");*/
			//console.log("PageIdx2", qnaAndRequest.currentPageIndex);
			if(browserFnc() != -1 && browserFnc() < 10) {
				document.forms["qnaFileUploadForm"].reset();
			}
			
			var sopPortalQnaObj = new sop.portal.qnaAndRequest.api();
			sopPortalQnaObj.addParam("board_cd", qnaAndRequest.qnaCd);
			sopPortalQnaObj.addParam("page_num", qnaAndRequest.currentPageIndex);			
			if(qnaAndRequest.searchWord != null && qnaAndRequest.searchWord.length > 0) {
				sopPortalQnaObj.addParam(qnaAndRequest.searchType, qnaAndRequest.searchWord.toUpperCase());
			}
			sopPortalQnaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardLists.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},
		
		// 게시판 검색
		searchQnaLists : function () {
			qnaAndRequest.currentPageIndex = 1;
			qnaAndRequest.searchType = $("#qna_search_select").combobox('getValue');
			qnaAndRequest.searchWord = $("#qna_search_title_text").val();
			
			if(qnaAndRequest.searchWord.length != 0 && qnaAndRequest.searchWord.length < 2) {
				$(".popupWrapper").attr("tabindex", -1).focus();
				messageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
				return;
			}
			
			if (!IsBoardValid("formInput", qnaAndRequest.searchWord, "#qna_search_title_text")) {
				$(".popupWrapper").attr("tabindex", -1).focus();
                return;
			}
			qnaAndRequest.makeQnaLists();
		},

		// 항목 선택 시 답변 글 가져오기
		getQnaListsReply : function () {
			var sopPortalQnaObj = new sop.portal.qnaAndRequestReply.api();
			sopPortalQnaObj.addParam("board_cd", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].board_cd);
			sopPortalQnaObj.addParam("post_no", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].post_no);
			sopPortalQnaObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsReply.json"
			});
		},

		// 항목 선택 시 작성자 확인하여 본인 글 일 경우 수정, 삭제 버튼 생성
		makeModifyAndDeleteBtn : function (index) {
			if(index == qnaAndRequest.selectIndex) {
				return;
			}

			if(qnaAndRequest.prevHtmlSouce != null) {
				$("#list_" + qnaAndRequest.selectIndex).html(qnaAndRequest.prevHtmlSouce);
			}

			qnaAndRequest.selectIndex = index;
			qnaAndRequest.prevHtmlSouce = $("#list_" + qnaAndRequest.selectIndex).html();

			var sopPortalQnaObj = new sop.portal.qnaCheckRegister.api();
			sopPortalQnaObj.addParam("board_cd", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].board_cd);
			sopPortalQnaObj.addParam("post_no", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].post_no);
			sopPortalQnaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardSessionRegisterInfo.json"
			});
		},
		
		/*readyRegistQna : function() {
			qnaAndRequest.isRegistMode = true;
			
			$("#qna_regist_title_input").val("");
			$("#qna_regist_content_input").val("");
			$("#qna_regist_secret_code_input").val("");
			
			board.refreshSecretCode();
			
			var tempObj = board.lowRankSClassCd;
			$("#qna_regist_category_select").combobox({
				data : tempObj,
			})
			$("#qna_regist_category_select").combobox('select', tempObj[0].value);
			
			//ie8,9일 경우, 파일업로드 폼 구성
		    if(browserFnc() != -1 && browserFnc() < 10) {
		    	$(".file_input_textbox").remove();
		    	$(".file_input_button").remove();
		    	$(".file_input_hidden").remove();
		    }else {
		    	$(".file_input_ie9").remove();
		    }
		},*/
		
		/*qnaRegist : function () {
			var inputStr = $("#qna_regist_secret_code_input").val();
			var file = $("#qna_file").val();
			if(file != null && file.length > 1 && file.trim().length > 1) {
				qnaAndRequest.qnaRegistForm();
			} else {
				var title = encodeURIComponent($("#qna_regist_title_input").val());
				var content = encodeURIComponent($("#qna_regist_content_input").val());
				
				var sopPortalQnaObj = new sop.portal.qnaRegist.api();
				//sopPortalQnaObj.addParam("board_cd", qnaAndRequest.qnaCd);
				sopPortalQnaObj.addParam("post_depth", 0);
				sopPortalQnaObj.addParam("post_order", 0);
				sopPortalQnaObj.addParam("post_title", title);
				sopPortalQnaObj.addParam("post_content", content);
				sopPortalQnaObj.addParam("low_rank_s_class_cd", $("#qna_regist_category_select").combobox('getValue'));
				sopPortalQnaObj.addParam("priority_disp_yn", "N");
				sopPortalQnaObj.addParam("input_code", inputStr);
				sopPortalQnaObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/board/boardRegist.json"
				});
			}
		},*/
		
		/*qnaRegistForm : function () {
			$("#qnaFileUploadForm").ajaxForm({
				async: false,
				type : "POST",
				url : contextPath + "/ServiceAPI/board/boardRegistForm.form",
				data : {
					input_code : $("#qna_regist_secret_code_input").val(),
					post_depth : 0,
					post_order : 0,
					post_title : $("#qna_regist_title_input").val(),
					post_content : $("#qna_regist_content_input").val(),
					low_rank_s_class_cd : $("#qna_regist_category_select").combobox('getValue'),
					priority_disp_yn : "N",
					file_yn : 'Y',
				},
				dataType: "json",
				beforeSend: function(xhr) {
//					console.log("beforeSend");
				},
				success: function(data) {
					if(data.errCd == "0") {
						qnaAndRequest.selectIndex = null;
						qnaAndRequest.prevHtmlSouce = null;
						board.refreshSecretCode();
						qnaAndRequest.makeQnaLists();
						themaAndRequest.makeThemaLists();
					} else {
						messageAlert.open("알림", data.errMsg);
						board.refreshSecretCode();
					}
		        },
		        complete: function() {
//		        	console.log("complete");
		        },
		        error: function(xhr, textStatus, error) {
					board.refreshSecretCode();
		        }
			}).submit();
		},*/
		
		/*// 게시판 항목 수정 시 입력 내용 설정
		setQnaData : function () {
			$("#qna_file").val("");
			$("#qna_regist_file").val("")
			
			qnaAndRequest.isListNotClose = true;
			var fl = $(".qnaboardclose").attr("class");
			
			if(fl == "anc-btn black qnaboardclose on") {
				qnaAndRequest.readyRegistQna();
				
				$("#qnaboardclose").html("입력폼닫기");
				$(".qnaboardclose").removeClass("on");
				$("#qna_input_form").slideDown();
			}
			
			$("#qnaRegistBtn").html("글 수정");
			
			window.scrollTo(0, 500);
			qnaAndRequest.isRegistMode = false;
			
			var selectObj = qnaAndRequest.receiveLists[qnaAndRequest.selectIndex];
			
			if(selectObj.file_nm != null && selectObj.file_nm != undefined) {
				$("#qna_file").prop('disabled', true);
				$("#qnaFileTrName").html(selectObj.file_nm + "." + selectObj.file_extension);
				$("#qnaFileTr").show();
			}
			
			$("#qna_regist_title_input").html(selectObj.post_title);
			$("#qna_regist_title_input").val($("#qna_regist_title_input").text());
			$("#qna_regist_content_input").html(selectObj.post_content);
			$("#qna_regist_content_input").val($("#qna_regist_content_input").text());
			$("#qna_regist_category_select").combobox('select', (selectObj.low_rank_s_class_cd).trim());
			$("#qna_regist_priority_select").combobox('select', (selectObj.priority_disp_yn).trim());
		},*/
		
		/*removeFileOnModifyMode : function() {
			$("#qna_file").prop('disabled', false);
			$("#qnaFileTr").hide();
		},*/
		
		/*checkSecretCode : function() {
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
			console.log(inputStr);
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
								qnaAndRequest.submitData();
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
					qnaAndRequest.submitData();
				}
			}else {
				qnaAndRequest.submitData();
			}
		},
		
		submitData : function() {		
			if(qnaAndRequest.isRegistMode) {
				qnaAndRequest.qnaRegist();
			} else {
				qnaAndRequest.qnaModify();
			}
			
			$("#qna_regist_secret_code_input").val("");
		},*/

		// 게시판 항목 수정
		/*qnaModify : function () {
			var inputStr = $("#qna_regist_secret_code_input").val();
			var file = $("#qna_file").val();
			
			if(file != null && file.length > 1 && file.trim().length > 1) {
				qnaAndRequest.qnaModifyForm();
			} else {
				var title = encodeURIComponent($("#qna_regist_title_input").val());
				var content = encodeURIComponent($("#qna_regist_content_input").val());
				
				var sopPortalQnaObj = new sop.portal.qnaModify.api();
				sopPortalQnaObj.addParam("board_cd", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].board_cd);
				sopPortalQnaObj.addParam("post_no", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].post_no);
				sopPortalQnaObj.addParam("post_title", title);
				sopPortalQnaObj.addParam("post_content", content);
				sopPortalQnaObj.addParam("low_rank_s_class_cd", $("#qna_regist_category_select").combobox('getValue'));
				sopPortalQnaObj.addParam("priority_disp_yn", 'N');
				sopPortalQnaObj.addParam("input_code", inputStr);
				sopPortalQnaObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/board/boardModify.json"
				});
			}
		},
		
		qnaModifyForm : function () {
			$("#qnaFileUploadForm").ajaxForm({
				async: false,
				type : "POST",
				url : contextPath + "/ServiceAPI/board/boardModifyForm.form",
				data : {
					input_code : $("#qna_regist_secret_code_input").val(),
					post_no : qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].post_no,
					post_title : $("#qna_regist_title_input").val(),
					post_content : $("#qna_regist_content_input").val(),
					low_rank_s_class_cd : $("#qna_regist_category_select").combobox('getValue'),
					priority_disp_yn : "N",
					file_yn : 'Y',
				},
				dataType: "json",
				encoding: "utf-8",
				beforeSend: function(xhr) {
//					console.log("beforeSend");
				},
				success: function(data) {
					if(data.errCd == "0") {
						$("#qnaRegistBtn").html("질문등록");
						qnaAndRequest.isRegistMode = true;
						qnaAndRequest.selectIndex = null;
						qnaAndRequest.prevHtmlSouce = null;
						board.refreshSecretCode();
						qnaAndRequest.makeQnaLists();
						themaAndRequest.makeThemaLists();
					} else {
						messageAlert.open("알림", data.errMsg);
						board.refreshSecretCode();
					}
		        },
		        complete: function() {
//		        	console.log("complete");
		        },
		        error: function(xhr, textStatus, error) {
					board.refreshSecretCode();
		        }
			}).submit();
		},*/

		/*// 게시판 항목 삭제 시 확인 팝업
		confirmDelete : function () {
			qnaAndRequest.isListNotClose = true;
			if(confirm(qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].post_no + " 번 글을 삭제 하시겠습니까?\r\n댓글도 함께 삭제 됩니다.")) {
				qnaAndRequest.qnaDelete()
			}
		},

		// 게시판 항목 삭제
		qnaDelete : function () {
			var sopPortalQnaObj = new sop.portal.qnaDelete.api();
			sopPortalQnaObj.addParam("board_cd", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].board_cd);
			sopPortalQnaObj.addParam("post_no", qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].post_no);
			sopPortalQnaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardDelete.json"
			});
		},*/
		
		// 게시글 조회수 수정
//		modifyPostHits : function (obj) {
//			if(obj == null || obj == undefined) {
//				return;
//			}
//			
//			var sopPortalQnaObj = new sop.portal.qnaModifyPostHits.api();
//			sopPortalQnaObj.addParam("board_cd", obj.board_cd);
//			sopPortalQnaObj.addParam("post_no", obj.post_no);
//			
//			sopPortalQnaObj.request({
//				method : "POST",
//				async : true,
//				url : contextPath + "/ServiceAPI/board/boardListsHitAdd.json"
//			});
//		},
		
		/*downloadFile : function(index) {
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
	        target.attr('value', qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].file_id);

	        target = $('#file_nm');
	        target.attr('name', 'file_nm');
	        target.attr('value', qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].file_nm);
	        
	        target = $('#file_path');
	        target.attr('name', 'file_path');
	        target.attr('value', qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].file_path);

	        target = $('#file_extension');
	        target.attr('name', 'file_extension');
	        target.attr('value', qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].file_extension);
	        
	        target = $('#file_content_type');
	        target.attr('name', 'file_content_type');
	        target.attr('value', qnaAndRequest.receiveLists[qnaAndRequest.selectIndex].file_content_type);

	        $('#tempForm').submit();
	        $('#tempForm').remove();
	   
		},*/
		
		controlListItem : function(post_no) {
			
			console.log("Q&A", post_no);
			
			window.location.href = contextPath + "/view/board/qnaView?post_no="+post_no+"&board_cd="+qnaAndRequest.qnaCd;
			/*if(qnaAndRequest.isListNotClose) {
				qnaAndRequest.isListNotClose = false;
				return;
			}
			
			if(index < 0) {
				$(".qna_list ul li").removeClass("on");
				$(".qna_list ul li").find(" > p ").slideUp();
				
				$(".qna_list ul li").find(".list_con").animate({
					opacity: 1,
					height: "16px"
				}, 30, function() {
					// Animation complete.
				});
				
				return;
			}
			
			qnaAndRequest.selectIndex = index;
			
			var fl = $("#qna_list_" + index).attr("class");
			var heightqnalist = $("#qna_list_" + index).find(".list_con > p").height();
			heightqnalist += $("#qna_list_" + index).find(".list_con > table").height();

			$(".qna_list ul li").removeClass("on");
			$("#qna_list_" + index).addClass("on");
			
			if ( fl == "on" ){
				$(".qna_list ul li").removeClass("on");
				$(".qna_list ul li").find(" > p ").slideUp();
				
				$("#qna_list_" + index).find(".list_con").animate({
					opacity: 1,
					height: "16px"
				}, 300, function() {
					// Animation complete.
				});
			} else {
				board.modifyPostHits(qnaAndRequest.receiveLists[index])
				
				$(".qna_list ul li").find(".list_con").animate({
					opacity: 1,
					height: "16px"
				}, 300, function() {
					// Animation complete.
				});
				$(".qna_list ul li").find(" > p ").slideUp();
				
				$("#qna_list_" + index).find(".list_con").animate({
					opacity: 1,
					height: heightqnalist + "px"
				}, 300, function() {
					// Animation complete.
				});
				$("#qna_list_" + index).find(" > p ").slideDown();
			}*/
		},
		controlInputWrite : function(){
			
			
			if(AuthInfo.authStatus){
				window.location.href = contextPath + "/view/board/qnaWrite";
			}else{
				if(confirm("로그인 하시겠습니까? \n 취소버튼 클릭시 글쓰기 모드로 글을 쓸수 있습니다")){
					qnaAndRequest.moveLogin();
				}else{
					window.location.href = contextPath + "/view/board/qnaWrite";
				}
			}
			
			
			
		},
		
		controlInputForm : function() {
			/*var fl = $(".qnaboardclose").attr("class");
			
			$("#qna_file").val("");
			$("#qna_regist_file").val("");
			qnaAndRequest.removeFileOnModifyMode();
			
			if(fl == "anc-btn black qnaboardclose on") {
				qnaAndRequest.readyRegistQna();
				
				$("#qnaboardclose").html("입력폼닫기");
				$(".qnaboardclose").removeClass("on");
				$("#qna_input_form").slideDown();
			} else {
				$("#qnaboardclose").html("입력폼열기");
				$(".qnaboardclose").addClass("on");
				$("#qna_input_form").slideUp();
				$("#qnaRegistBtn").html("질문등록");
			}*/
		},
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.qnaAndRequest.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					var qnaAndRequestTotalCnt = result.total_count;
					var pageSize = result.pageSize;
					var curPage = result.curPage;
					$("#qna_title_text").html("&nbsp;&nbsp;&nbsp;총" + qnaAndRequestTotalCnt + " 건");
					
					qnaAndRequest.qnaAndRequestPaging(result.total_count, qnaAndRequest.currentPageIndex);

					qnaAndRequest.receiveLists = result.summaryList;
					
					var html = "";
					
					html += "<table class='boardTb' summary='질문과 개선게시판입니다.'>";
					html +=	"<caption style='display:none;'>질문과 개선</caption>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var replyyn = listItem.replyyn;
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						var id = result.summaryList[i].reg_member_id;
						if(id == "ysjh8501"){
							id = "guest";
						}
						var ast = id.slice(1, id.length-1);
						
						var user_id = "";
						for ( var j=0; j <ast.length; j++){
							user_id = user_id.concat(ast[j].replace(ast[j], "*"));
						}
						user_id =id.charAt().concat(user_id.concat(id.charAt(id.length-1)));
						var tempStr = content.split("</br>");
						html += "<tr>";
						html += "<td style='width:5%;text-align:center;'>"+listItem.boardnum+"</td>";
						html += "<td class='titleTd' style='width: 55%;'>";
						html += "<a style='cursor: pointer;' href='javascript:qnaAndRequest.controlListItem(" + listItem.post_no + ");'>";
						//일련번호
						//html += listItem.boardnum;
						html += title;
						html += "</a>";
						//첨부파일 유무
						if(listItem.file_yn && listItem.file_yn == "Y"){
							html += "<img src='/img/ico/fileIcon.png' style='vertical-align: bottom;'/>";
						}
						
						html += "<dl style='margin-top: 10px;'>";
						
						
						var replyYnStr = "";
						if(replyyn == "Y") {
							replyYnStr += "<img src='/img/nm/answer_ok.png' alt='답변완료'>";
						}
						
						
						
						
						if(listItem.low_rank_s_class_cd == "REQST") {
							html += "<dt class=''>";
							html += "<img src='/img/nm/icon_qa_type1.gif' alt='개선요청'> &nbsp;" + replyYnStr;
							if(AuthInfo.member_id == listItem.reg_member_id){
								html += "<span style='vertical-align:bottom; margin-left: 10px; font-size: 12px; height: 35px; line-height: 35px; background: #1778cc; border-radius: 3px; color: #fff;padding: 7px 10px;'>내가 작성한 글</span>";
							}
							html += "</dt>";
						} else if(listItem.low_rank_s_class_cd == "QUERY") {
							html += "<dt class=''>";
							html += "<img src='/img/nm/icon_qa_type2.gif' alt='일반문의'> &nbsp;" + replyYnStr;
							if(AuthInfo.member_id == listItem.reg_member_id){
								html += "<span style='vertical-align:bottom; margin-left: 10px; font-size: 12px; height: 35px; line-height: 35px; background: #1778cc; border-radius: 3px; color: #fff;padding: 7px 10px;'>내가 작성한 글</span>";
							}
							html += "</dt>";
						} else if(listItem.low_rank_s_class_cd == "THEMRQ") {
							html += "<dt class=''>";
							html += "<img src='/img/nm/icon_qa_type3.gif' alt='통계주제도 요청'> &nbsp;" + replyYnStr;
							if(AuthInfo.member_id == listItem.reg_member_id){
								html += "<span style='vertical-align:bottom; margin-left: 10px; font-size: 12px; height: 35px; line-height: 35px; background: #1778cc; border-radius: 3px; color: #fff;padding: 7px 10px;'>내가 작성한 글</span>";
							}
							html += "</dt>";
						}
						html += "</dl>";
						
						html += "</td>";
						//작성자
						html += "<td style='width: 15%;'>&nbsp;&nbsp;" + user_id + "</td>";
						
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

					$("#qna_list").empty();
					$("#qna_list").html(html);
					
//					for(var i = 0; i < result.summaryList.length; i ++) {
//						$("#qna_btn_table_" + i).hide();
//					}
					
					qnaAndRequest.isListNotClose = false;
					//qnaAndRequest.controlListItem(-1);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
				
				if (qnaAndRequest.receiveType != undefined && qnaAndRequest.receiveType != null && qnaAndRequest.receiveType.length > 0) {
					console.log(qnaAndRequest.receiveType);
					if(qnaAndRequest.receiveType == 'qna') {
						qnaAndRequest.setTab("qna");
					}else if(qnaAndRequest.receiveType == 'thema'){
						qnaAndRequest.setTab("thema");
					}
					qnaAndRequest.receiveType = null;
				}
				
//				if (qnaAndRequest.receiveCategoryCd != undefined && qnaAndRequest.receiveCategoryCd != null && qnaAndRequest.receiveCategoryCd.length > 0) {
//					$("#qna_regist_category_select").combobox('select', board.lowRankSClassCd[0].value);
//					for(var i = 0; i < board.lowRankSClassCd.length; i++) {
//						if(board.lowRankSClassCd[i].value == qnaAndRequest.receiveCategoryCd) {
//							$("#qna_regist_category_select").combobox('select', qnaAndRequest.receiveCategoryCd);
//							return;
//						}
//					}
//				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Lists End **********/

	/*********** Receive Search Lists Start **********/
	(function() {
		$class("sop.portal.qnaSearchLists.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					$("#qna_title_text").html("&nbsp;&nbsp;&nbsp;총" + result.total_count + " 건");
					qnaAndRequest.qnaAndRequestPaging(result.total_count, qnaAndRequest.currentPageIndex);

					qnaAndRequest.receiveLists = result.summaryList;

					var html = "<table border='1' style='width:500px' align='center'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						html += "<tr>";
						html += "<td id='list_" + i + "' ";
						html += "onclick='javascript:qnaAndRequest.makeModifyAndDeleteBtn(" + i + ")' style='cursor:pointer;'>";
						html += "</br><b>Title : " + listItem.post_title + "</b></br></br>";
						html += "Date : " + listItem.reg_ts + "</br></br>";
						html += "Content : " + listItem.post_content + "</br></br></td>";
						html += "</tr>";
					}
					html += "</table>";

					$("#qna_lists_div").empty();
					$("#qna_lists_div").html(html);
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
	/*(function() {
		$class("sop.portal.qnaAndRequestReply.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					var html = $("#list_" + qnaAndRequest.selectIndex).html();

					for(var i = 0; i < result.summaryListReply.length; i ++) {
						var listItem = result.summaryListReply[i];

						html += "</br></br>";
						html += "==========================================</br>";
						html += "==========================================</br>";
						html += "</br></br>" + listItem.post_title + "</br></br>";
						html += listItem.reg_ts + "</br></br>";
						html += listItem.post_content + "</br></br></td>";
					}

					$("#list_" + qnaAndRequest.selectIndex).html(html);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());*/
	/*********** Receive Replies End **********/

	/*********** check Register id, Login id Start **********/
	(function() {
		$class("sop.portal.qnaCheckRegister.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					if(result.is_member_login && result.register_id == result.login_id) {
						var html = $("#list_" + qnaAndRequest.selectIndex).html();
						html += "<div>";
						html += "<button id='motidy_" + qnaAndRequest.selectIndex + "' ";
						html += "onclick='javascript:qnaAndRequest.setQnaData()' style='cursor:pointer;'>";
						html += "수정하기";
						html += "</button>";
						html += "<button id='delete_" + qnaAndRequest.selectIndex + "' ";
						html += "onclick='javascript:qnaAndRequest.confirmDelete()' style='cursor:pointer;'>";
						html += "삭제하기";
						html += "</button>";
						html += "</div>";

						$("#list_" + qnaAndRequest.selectIndex).html(html);
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}

				qnaAndRequest.getQnaListsReply();
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** check Register id, Login id End **********/

	/*********** Regist Start **********//*
	(function() {
		$class("sop.portal.qnaRegist.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					qnaAndRequest.selectIndex = null;
					qnaAndRequest.prevHtmlSouce = null;
					board.refreshSecretCode();
					qnaAndRequest.makeQnaLists();
					themaAndRequest.makeThemaLists();
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
	*//*********** Regist End **********/
	
	/*********** Modify Start **********/
	/*(function() {
		$class("sop.portal.qnaModify.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$("#qnaRegistBtn").html("질문등록");
					
					qnaAndRequest.isRegistMode = true;
					qnaAndRequest.selectIndex = null;
					qnaAndRequest.prevHtmlSouce = null;
					board.refreshSecretCode();
					qnaAndRequest.makeQnaLists();
					themaAndRequest.makeThemaLists();
				} else {
					messageAlert.open("알림", res.errMsg);
					board.refreshSecretCode();
				}
			},
			onFail : function(status) {
				board.refreshSecretCode();
			}
		});
	}());*/
	/*********** Modify End **********/

	/*********** Delete Start **********//*
	(function() {
		$class("sop.portal.qnaDelete.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					qnaAndRequest.selectIndex = null;
					qnaAndRequest.prevHtmlSouce = null;
					board.refreshSecretCode();
					qnaAndRequest.makeQnaLists();
					themaAndRequest.makeThemaLists();
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	*//*********** Delete End **********/
	
	/*********** modify post hits Start **********/
//	(function() {
//		$class("sop.portal.qnaModifyPostHits.api").extend(sop.portal.absAPI).define({
//			onSuccess : function(status, res) {
//				if(res.errCd == "0") {
//					console.log("success");
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