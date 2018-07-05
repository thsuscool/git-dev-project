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

	W.$themaView = W.$themaView || {};

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
		
		$(".board_tabs1 > a").click(function() {
			$(".board_tabs1 > a").removeClass("active");
			$(this).addClass("active");
			$(".tab_contents > div").hide();
			$(".tab_contents > div").eq($(".board_tabs1 > a").index(this)).show();
		});
		
		themaView.receiveType = getParameter("post_no");
		themaView.receiveCategoryCd = getParameter("board_cd");
		
		themaViewObj = {board_cd : themaView.themaCd, post_no : themaView.receiveType };
		themaView.modifyPostHits(themaViewObj);
		
		themaView.makeThemaLists();
		//themaView.readyRegistThema();
	})

	themaView = {
		currentPageIndex : 1,			// 현재 페이지 인덱스
		prevHtmlSouce : null,			// 글 항목 생성 HTML 소스 임시저장
		receiveLists : null,			// 조회 항목들
		selectIndex : null,				// 사용자 선택 항목 인덱스
		searchType : null,				// 검색 항목 ( 제목, 내용, 제목+내용 )
		searchWord : null,				// 검색어
		themaCd : "BOARD_003",			// 게시판 코드 ( 고정으로 사용 )
		low_rank_s_class_cd : "THEMRQ",
		isRegistMode : true,			// 작성 / 수정 모드 	true : 작성, false : 수정
		isListNotClose : false,			// 항목에서 수정/삭제 버튼 선택 시 리스트 접히지 않게 함
		receiveType : null,				// 개발자 사이트에서 호출한 파라미터 ( 게시판 종류 )
		receiveCategoryCd : null,			// 개발자 사이트에서 호출한 파라미터 ( 게시글 번호 )
		
		setTab : function() {
			$(".board_tabs1 > a").removeClass("active");
			$("#board_tabs_thema").addClass("active");
			$(".tab_contents > div").hide();
			$(".thema_list").show();
		},
		
		// 게시판 목록 페이징 처리
		themaViewPaging : function (totalCount, currentIndex) {
			var pageSize = 10;										// 페이지 당 항목 개수
			var totalPage = Math.ceil( totalCount / pageSize);		// 전체 페이지 수
			$('.pagenation2 .pages').paging({
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
					themaView.currentPageIndex = page
					themaView.makeThemaLists();
				}
			});
		},
		
		moveLogin : function() {
			var url = statsPotalDomain + "/view/board/qnaAndRequest?type=thema"
			if(statsPotalDomain == "https://sgis.kostat.go.kr") {
				url = statsPotalDomain + "/view/board/qnaAndRequest?type=thema"
			}
			//window.location.href = contextPath + "/view/member/login?returnPage=" + url;
			goSelectLogin(url); //통합/기존 로그인 선택 페이지 이동
		},
		
		moveAgree : function() {
			window.location.href = contextPath + "/view/member/agree";
		},
		
		/*openFileBrowser : function() {
			$("#thema_file").click();
		},
		
		setFileName : function(value) {
			var fileName = value.substring(value.lastIndexOf('\\') + 1);
			$("#thema_regist_file").val(fileName);
			
			var file = $("#thema_file").val();
		},*/
		
		addSecretCode : function() {
			board.generateSecretCode();
			var tempStr = board.generateCode;
			
			var html = "";
			$("#thema_regist_secret_code_show").html(html);
			
			Holder.addTheme("new", {
				  foreground: "#ccc",
				  background: "#000",
				  size: 15,
				  text: tempStr
				}).addImage("holder.js/80x35/new", "#thema_regist_secret_code_show").run();
		},

		// 게시판 목록 생성
		makeThemaLists : function () {
			themaView.removeFileOnModifyMode();
			
			$("#thema_regist_title_input").val("");
			$("#thema_regist_content_input").val("");
			$("#thema_regist_file").val("");
			$("#thema_file").val("");
			
			if(browserFnc() != -1 && browserFnc() < 10) {
				document.forms["themaFileUploadForm"].reset();
			}

			var sopPortalThemaObj = new sop.portal.themaView.api();
			sopPortalThemaObj.addParam("board_cd", themaView.receiveCategoryCd);
			sopPortalThemaObj.addParam("post_no", themaView.receiveType);
			//sopPortalThemaObj.addParam("low_rank_s_class_cd", themaView.low_rank_s_class_cd);
			if(themaView.searchWord != null && themaView.searchWord.length > 0) {
				sopPortalThemaObj.addParam(themaView.searchType, themaView.searchWord.toUpperCase());
			}
			sopPortalThemaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardListsView.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},
		
		// 항목 선택 시 답변 글 가져오기
		getThemaListsReply : function () {
			var sopPortalThemaObj = new sop.portal.themaViewReply.api();
			sopPortalThemaObj.addParam("board_cd", themaView.receiveLists[themaView.selectIndex].board_cd);
			sopPortalThemaObj.addParam("post_no", themaView.receiveLists[themaView.selectIndex].post_no);
			sopPortalThemaObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsReply.json"
			});
		},

		// 항목 선택 시 작성자 확인하여 본인 글 일 경우 수정, 삭제 버튼 생성
		makeModifyAndDeleteBtn : function (index) {
			if(index == themaView.selectIndex) {
				return;
			}

			if(themaView.prevHtmlSouce != null) {
				$("#list_" + themaView.selectIndex).html(themaView.prevHtmlSouce);
			}

			themaView.selectIndex = index;
			themaView.prevHtmlSouce = $("#list_" + themaView.selectIndex).html();

			var sopPortalThemaObj = new sop.portal.themaCheckRegister.api();
			sopPortalThemaObj.addParam("board_cd", themaView.receiveLists[themaView.selectIndex].board_cd);
			sopPortalThemaObj.addParam("post_no", themaView.receiveLists[themaView.selectIndex].post_no);
			sopPortalThemaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardSessionRegisterInfo.json"
			});
		},
		
		readyRegistThema : function() {
			themaView.isRegistMode = true;
			
			$("#thema_regist_title_input").val("");
			$("#thema_regist_content_input").val("");
			$("#thema_regist_secret_code_input").val("");
			
			board.refreshSecretCode();
		},
		
		// 게시판 항목 수정 시 입력 내용 설정
		setThemaData : function () {
			$("#thema_file").val("");
			$("#thema_regist_file").val("")
			
			themaView.isListNotClose = true;
			var fl = $(".themaboardclose").attr("class");
			
			if(fl == "anc-btn black themaboardclose on") {
				themaView.readyRegistThema();
				
				$("#themaboardclose").html("입력폼닫기");
				$(".themaboardclose").removeClass("on");
				$("#thema_input_form").slideDown();
			}
			
			$("#themaRegistBtn").html("글 수정");
			
			window.scrollTo(0, 500);
			themaView.isRegistMode = false;
			
			var selectObj = themaView.receiveLists[themaView.selectIndex];
			
			if(selectObj.file_nm != null && selectObj.file_nm != undefined) {
				$("#thema_file").prop('disabled', true);
				$("#themaFileTrName").html(selectObj.file_nm + "." + selectObj.file_extension);
				$("#themaFileTr").show();
			}
			
			$("#thema_regist_title_input").html(selectObj.post_title);
			$("#thema_regist_title_input").val($("#thema_regist_title_input").text());
			$("#thema_regist_content_input").html(selectObj.post_content);
			$("#thema_regist_content_input").val($("#thema_regist_content_input").text());
			$("#thema_regist_priority_select").combobox('select', (selectObj.priority_disp_yn).trim());
		},
		
		removeFileOnModifyMode : function() {
			$("#thema_file").prop('disabled', false);
			$("#themaFileTr").hide();
		},
		
		/*checkSecretCode : function() {
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
								themaView.submitData();
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
					themaView.submitData();
				}
			} else {
				
				themaView.submitData();
			}
		},*/
		
		/*submitData : function() {
			if(themaView.isRegistMode) {
				themaView.themaRegist();
			} else {
				themaView.themaModify();
			}
			$("#thema_regist_secret_code_input").val("");
		},*/

		// 게시판 항목 수정
		/*themaModify : function () {
			var inputStr = $("#thema_regist_secret_code_input").val();
			var file = $("#thema_file").val();
			if(file != null && file.length > 1 && file.trim().length > 1) {
				themaView.themaModifyForm();
			} else {
				var title = encodeURIComponent($("#thema_regist_title_input").val());
				var content = encodeURIComponent($("#thema_regist_content_input").val());
				
				var sopPortalThemaObj = new sop.portal.themaModify.api();
				sopPortalThemaObj.addParam("board_cd", themaView.receiveLists[themaView.selectIndex].board_cd);
				sopPortalThemaObj.addParam("post_no", themaView.receiveLists[themaView.selectIndex].post_no);
				sopPortalThemaObj.addParam("post_title", title);
				sopPortalThemaObj.addParam("post_content", content);
				sopPortalThemaObj.addParam("low_rank_s_class_cd", themaView.low_rank_s_class_cd);
				sopPortalThemaObj.addParam("priority_disp_yn", 'N');
				sopPortalThemaObj.addParam("input_code", inputStr);
				sopPortalThemaObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/board/boardModify.json"
				});
			}
		},*/
		
		/*themaModifyForm : function () {
			$("#themaFileUploadForm").ajaxForm({
				async: false,
				type : "POST",
				url : contextPath + "/ServiceAPI/board/boardModifyForm.form",
				data : {
					board_cd : themaView.themaCd,
					input_code : $("#thema_regist_secret_code_input").val(),
					post_no : themaView.receiveLists[themaView.selectIndex].post_no,
					post_title : $("#thema_regist_title_input").val(),
					post_content : $("#thema_regist_content_input").val(),
					low_rank_s_class_cd : themaView.low_rank_s_class_cd,
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
						$("#themaRegistBtn").html("질문등록");
						themaView.isRegistMode = true;
						themaView.selectIndex = null;
						themaView.prevHtmlSouce = null;
						board.refreshSecretCode();
						themaView.makeThemaLists();
						qnaAndRequest.makeQnaLists();
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

		// 게시판 항목 삭제 시 확인 팝업
		confirmDelete : function () {
			themaView.isListNotClose = true;
			if(confirm(themaView.receiveType + " 번 글을 삭제 하시겠습니까?\r\n댓글도 함께 삭제 됩니다.")) {
				themaView.themaDelete();
			}
		},

		// 게시판 항목 삭제
		themaDelete : function () {
			var sopPortalThemaObj = new sop.portal.themaDelete.api();
			sopPortalThemaObj.addParam("board_cd", themaView.receiveCategoryCd);
			sopPortalThemaObj.addParam("post_no", themaView.receiveType);
			sopPortalThemaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardDelete.json"
			});
		},
		
		// 보안코드 확인
		getSecretCodeCorrect : function (inputStr) {
			var sopPortalThemaObj = new sop.portal.themaGetSecretCodeCorrect.api();
			sopPortalThemaObj.addParam("input_code", inputStr);
			sopPortalThemaObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/checkSecretCodeImage.json"
			});
		},
		// 게시판 항목 수정 시 입력 내용 설정
		setThemaData : function () {
			
			window.location.href = contextPath + "/view/board/qnaThemaModify?post_no="+themaView.receiveType+"&board_cd="+themaView.receiveCategoryCd;
			
		},
		// 게시글 조회수 수정
		modifyPostHits : function (obj) {
			if(obj == null || obj == undefined) {
				return;
			}
			
			var sopPortalThemaObj = new sop.portal.themaModifyPostHits.api();
			sopPortalThemaObj.addParam("board_cd", obj.board_cd);
			sopPortalThemaObj.addParam("post_no", obj.post_no);
			
			sopPortalThemaObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsHitAdd.json"
			});
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
	        target.attr('value', themaView.receiveLists[0].file_id);

	        target = $('#file_nm');
	        target.attr('name', 'file_nm');
	        target.attr('value', themaView.receiveLists[0].file_nm);
	        
	        target = $('#file_path');
	        target.attr('name', 'file_path');
	        target.attr('value', themaView.receiveLists[0].file_path);

	        target = $('#file_extension');
	        target.attr('name', 'file_extension');
	        target.attr('value', themaView.receiveLists[0].file_extension);
	        
	        target = $('#file_content_type');
	        target.attr('name', 'file_content_type');
	        target.attr('value', themaView.receiveLists[0].file_content_type);

	        $('#tempForm').submit();
	        $('#tempForm').remove();
	        
//			var sopPortalThemaObj = new sop.portal.themaGetSecretCodeCorrect.api();
//			sopPortalThemaObj.addParam("file_id", themaView.receiveLists[themaView.selectIndex].file_id);
//			sopPortalThemaObj.addParam("file_nm", themaView.receiveLists[themaView.selectIndex].file_nm);
//			sopPortalThemaObj.addParam("file_path", themaView.receiveLists[themaView.selectIndex].file_path);
//			sopPortalThemaObj.addParam("file_extension", themaView.receiveLists[themaView.selectIndex].file_extension);
//			sopPortalThemaObj.request({
//				method : "POST",
//				async : false,
//				url : contextPath + "/ServiceAPI/board/downloadFile.download"
//			});
		},
		
		controlListItem : function(post_no) {
			if(themaView.isListNotClose) {
				themaView.isListNotClose = false;
				return;
			}
			window.location.href = contextPath + "/view/board/qnaThemaView?post_no="+post_no+"&board_cd="+themaView.themaCd;
			/*if(index < 0) {
				$(".thema_list ul li").removeClass("on");
				$(".thema_list ul li").find(" > p ").slideUp();
				
				$(".thema_list ul li").find(".list_con").animate({
					opacity: 1,
					height: "16px"
				}, 30, function() {
					// Animation complete.
				});
				
				return;
			}
			
			themaView.selectIndex = index;
			
			var fl = $("#thema_list_" + index).attr("class");
			var heightthemalist = $("#thema_list_" + index).find(".list_con > p").height();
			heightthemalist += $("#thema_list_" + index).find(".list_con > table").height();

			$(".thema_list ul li").removeClass("on");
			$("#thema_list_" + index).addClass("on");
			
			if ( fl == "on" ){
				$(".thema_list ul li").removeClass("on");
				$(".thema_list ul li").find(" > p ").slideUp();
				
				$("#thema_list_" + index).find(".list_con").animate({
					opacity: 1,
					height: "16px"
				}, 300, function() {
					// Animation complete.
				});
			} else {
				themaView.modifyPostHits(themaView.receiveLists[index])
				
				$(".thema_list ul li").find(".list_con").animate({
					opacity: 1,
					height: "16px"
				}, 300, function() {
					// Animation complete.
				});
				$(".thema_list ul li").find(" > p ").slideUp();
				
				$("#thema_list_" + index).find(".list_con").animate({
					opacity: 1,
					height: heightthemalist + "px"
				}, 300, function() {
					// Animation complete.
				});
				$("#thema_list_" + index).find(" > p ").slideDown();
			}*/
		},
		controlInputWrite : function(){
			window.location.href = contextPath + "/view/board/qnaThemaWrite";
		},
		/*controlInputForm : function() {
			var fl = $(".themaboardclose").attr("class");
			
			$("#thema_file").val("");
			$("#thema_regist_file").val("");
			themaView.removeFileOnModifyMode();
			
			if(fl == "anc-btn black themaboardclose on") {
				themaView.readyRegistThema();
				
				$("#themaboardclose").html("입력폼닫기");
				$(".themaboardclose").removeClass("on");
				$("#thema_input_form").slideDown();
			} else {
				$("#themaboardclose").html("입력폼열기");
				$(".themaboardclose").addClass("on");
				$("#thema_input_form").slideUp();
				$("#themaRegistBtn").html("질문등록");
			}
		},*/
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.themaView.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					console.log(result);
					$("#thema_title_text").html("&nbsp;&nbsp;&nbsp;총" + result.total_count + " 건");
					themaView.themaViewPaging(result.total_count, themaView.currentPageIndex);
					themaView.receiveLists = result.summaryList;

					var html = "";
					html += "<ul>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						var title = listItem.post_title.replace(/\n/gim, "</br>");
						var content = listItem.post_content.replace(/\n/gim, "</br>");
						
						var reply = "";
						if ( listItem.reply_content != null ) {
							reply = listItem.reply_content.replace(/\n/gim, "</br>");
						}
						
						var tempStr = content.split("</br>");
						
						html += "<li id='thema_list_" + i + "'>";
						html += "<p style='background:none; text-align: right; padding-top:0px;'>";
						if(!listItem.post_hits){
							listItem.post_hits = 0;
						}
						html += "<span>조회수 " + listItem.post_hits + "</span>";
						html += "&nbsp;&nbsp;&nbsp;<span>" + listItem.reg_ts + "</span>";
						html += "<div sytle='height:100px;'>";
						html += "</div>";
						html += "<p style='background:none;padding-top:0px;'>";
						html += content;
						html += "</p>";
						html += "</li>";
						if(listItem.low_rank_s_class_cd == "REQST") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type1.gif' alt='개선요청'></dt>";
						} else if(listItem.low_rank_s_class_cd == "QUERY") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type2.gif' alt='일반문의'></dt>";
						} else if(listItem.low_rank_s_class_cd == "THEMRQ") {
							html += "<dt class='request'><img src='/img/nm/icon_qa_type3.gif' alt='통계주제도 요청'></dt>";
						}
						var html = "";
						var htmlTitle="";
						html += "<ul style='padding-top:0px;'>";
						for(var i = 0; i < result.summaryList.length; i ++) {
							var listItem = result.summaryList[i];
							var title = listItem.post_title.replace(/\n/gim, "</br>");
							var content = listItem.post_content.replace(/\n/gim, "</br>");
							var id = listItem.reg_member_id;
							var ast = id.slice(1, id.length-1);
							var user_id = "";
							for ( var i=0; i <ast.length; i++){
								user_id = user_id.concat(ast[i].replace(ast[i], "*"));
							}
							user_id =id.charAt().concat(user_id.concat(id.charAt(id.length-1)));
							html += "<li id='qna_list_" + i + "'>";
							html += "<p style='background:none; text-align: right; padding-top:0px;'>";
							if(!listItem.post_hits){
								listItem.post_hits = 0;
							}
							html += "<span>조회수 " + listItem.post_hits + "</span>";
							html += "&nbsp;&nbsp;&nbsp;<span>" + listItem.reg_ts + "</span>";
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
							
							htmlTitle += title + "("+listItem.reg_ts+",  "+user_id+")";
							
							html += "<dl>";
							if(listItem.low_rank_s_class_cd == "REQST") {
								html += "<dt class='request'><img src='/img/nm/icon_qa_type1.gif' alt='개선요청'></dt>";
							} else if(listItem.low_rank_s_class_cd == "QUERY") {
								html += "<dt class='request'><img src='/img/nm/icon_qa_type2.gif' alt='일반문의'></dt>";
							} else if(listItem.low_rank_s_class_cd == "THEMRQ") {
								html += "<dt class='request'><img src='/img/nm/icon_qa_type3.gif' alt='통계주제도 요청'></dt>";
							}
						
							if(listItem.file_yn == 'y' || listItem.file_yn == 'Y') {
								html += "</BR>";
//								html += "첨부파일 : ";
								html += "<a style='font-size:12px;' href='javascript:themaView.downloadFile(" + i + ");' align='center'>";
								html += "<img src='/img/board/attachment.jpg'></br>";
								html += listItem.file_nm + "." + listItem.file_extension;
								html += "</img></a>";
							}
							if(listItem.modifyMode) {
								html += "</br>";
								html += "<table id='qna_btn_table_" + i + "' align='right'><th>";
								html += "<td>";
								html += "<button class='modify' style='width: 100px;height: 30px;font-size: 11px;color: #fff;background-color: #4e86b5;font-weight: bold; margin-bottom: 20px;' onclick='javascript:themaView.setThemaData();'>수정</button>";
								html += "</td>";
								html += "<td>";
								html += "<button class='delete' style='width: 100px;height: 30px;font-size: 11px;color: #fff;background-color: #ee7200;font-weight: bold; margin-bottom: 20px;' onclick='javascript:themaView.confirmDelete();'>삭제</button>";
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
						html += "<a href='/view/board/qnaAndRequest?type=thema' class='anc-btn black qnaboardclose' style='width:80px; margin-left: 880px'>목록</a>";
						html += "</ul>";
					$(".ptit").html(htmlTitle);
					$("#thema_list").empty();
					$("#thema_list").html(html);
					
//					for(var i = 0; i < result.summaryList.length; i ++) {
//						$("#thema_btn_table_" + i).hide();
//					}
					}
					themaView.isListNotClose = false;
					//themaView.controlListItem(-1);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
				
				if (themaView.receiveType != undefined && themaView.receiveType != null && themaView.receiveType.length > 0) {
					if(themaView.receiveType == 'thema') {
						themaView.setTab();
						themaView.receiveType = null;
					}
				}
				
//				if (themaView.receiveCategoryCd != undefined && themaView.receiveCategoryCd != null && themaView.receiveCategoryCd.length > 0) {
//					$("#thema_regist_category_select").combobox('select', board.lowRankSClassCd[0].value);
//					for(var i = 0; i < board.lowRankSClassCd.length; i++) {
//						if(board.lowRankSClassCd[i].value == themaView.receiveCategoryCd) {
//							$("#thema_regist_category_select").combobox('select', themaView.receiveCategoryCd);
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
		$class("sop.portal.themaSearchLists.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					$("#thema_title_text").html("&nbsp;&nbsp;&nbsp;총" + result.total_count + " 건");
					themaView.themaViewPaging(result.total_count, themaView.currentPageIndex);

					themaView.receiveLists = result.summaryList;

					var html = "<table border='1' style='width:500px' align='center'>";
					for(var i = 0; i < result.summaryList.length; i ++) {
						var listItem = result.summaryList[i];
						html += "<tr>";
						html += "<td id='list_" + i + "' ";
						html += "onclick='javascript:themaView.makeModifyAndDeleteBtn(" + i + ")' style='cursor:pointer;'>";
						html += "</br><b>Title : " + listItem.post_title + "</b></br></br>";
						html += "Date : " + listItem.reg_ts + "</br></br>";
						html += "Content : " + listItem.post_content + "</br></br></td>";
						html += "</tr>";
					}
					html += "</table>";

					$("#thema_lists_div").empty();
					$("#thema_lists_div").html(html);
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
		$class("sop.portal.themaViewReply.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					var html = $("#list_" + themaView.selectIndex).html();

					for(var i = 0; i < result.summaryListReply.length; i ++) {
						var listItem = result.summaryListReply[i];

						html += "</br></br>";
						html += "==========================================</br>";
						html += "==========================================</br>";
						html += "</br></br>" + listItem.post_title + "</br></br>";
						html += listItem.reg_ts + "</br></br>";
						html += listItem.post_content + "</br></br></td>";
					}

					$("#list_" + themaView.selectIndex).html(html);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Receive Replies End **********/

	/*********** check Register id, Login id Start **********/
	(function() {
		$class("sop.portal.themaCheckRegister.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;

					if(result.is_member_login && result.register_id == result.login_id) {
						var html = $("#list_" + themaView.selectIndex).html();
						html += "<div>";
						html += "<button id='motidy_" + themaView.selectIndex + "' ";
						html += "onclick='javascript:themaView.setThemaData()' style='cursor:pointer;'>";
						html += "수정하기";
						html += "</button>";
						html += "<button id='delete_" + themaView.selectIndex + "' ";
						html += "onclick='javascript:themaView.confirmDelete()' style='cursor:pointer;'>";
						html += "삭제하기";
						html += "</button>";
						html += "</div>";

						$("#list_" + themaView.selectIndex).html(html);
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}

				themaView.getThemaListsReply();
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** check Register id, Login id End **********/

	/*********** Regist Start **********/
	/*(function() {
		$class("sop.portal.themaRegist.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					themaView.selectIndex = null;
					themaView.prevHtmlSouce = null;
					board.refreshSecretCode();
					themaView.makeThemaLists();
					qnaAndRequest.makeQnaLists();
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
	/*********** Regist End **********/
	
	/*********** Modify Start **********/
	/*(function() {
		$class("sop.portal.themaModify.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$("#themaRegistBtn").html("질문등록");
					
					themaView.isRegistMode = true;
					themaView.selectIndex = null;
					themaView.prevHtmlSouce = null;
					board.refreshSecretCode();
					themaView.makeThemaLists();
					qnaAndRequest.makeQnaLists();
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

	/*********** Delete Start **********/
	(function() {
		$class("sop.portal.themaDelete.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					/*themaView.selectIndex = null;
					themaView.prevHtmlSouce = null;
					board.refreshSecretCode();
					themaView.makeThemaLists();
					qnaAndRequest.makeQnaLists();*/
					window.history.back();
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** Delete End **********/
	
	/*********** check secretcode Start **********/
	(function() {
		$class("sop.portal.themaGetSecretCodeCorrect.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					if(result.isCorrect) {
						themaView.submitData();
					} else {
						messageAlert.open("알림", "보안코드를 다시 입력하여 주세요.");
						board.refreshSecretCode();
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** check secretcode End **********/
	
	/*********** modify post hits Start **********/
	(function() {
		$class("sop.portal.themaModifyPostHits.api").extend(sop.portal.absAPI).define({
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