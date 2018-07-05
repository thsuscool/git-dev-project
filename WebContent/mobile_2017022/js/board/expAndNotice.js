(function(W, D) {
	W.$expAndNotice = W.$expAndNotice || {};
	var boardList = {
		"BOARD_001":"공지사항",
		"BOARD_005":"통계용어설명"
	};
	$expAndNotice = {
		pageSize : 10,
		currentPageIndex : 1, // 현재 페이지 인덱스
		prevHtmlSouce : null, // 글 항목 생성 HTML 소스 임시저장
		receiveLists : null, // 조회 항목들
		selectIndex : null, // 사용자 선택 항목 인덱스

		searchType : null, // 검색 항목 ( 제목, 내용, 제목+내용 )
		searchWord : null, // 검색어

		receiveType : null, // 개발자 사이트에서 호출한 파라미터 ( 게시판 종류 )
		receivePostNo : null, // 개발자 사이트에서 호출한 파라미터 ( 게시글 번호 )

		boardCd : null, // 게시판 코드 ( 고정으로 사용 )
		init : function(boardCd){
			this.boardCd = boardCd;
			if(boardList[boardCd]){
				$(".ContArea>h1").text(boardList[boardCd]);
				$expAndNotice.makeLists();
			}else{
				messageAlert.open("알림", "잘못된 접근입니다");
			}
		},
		// 게시판 목록 생성
		makeLists : function() {
			var sopPortalNoticeObj = new sop.portal.expAndNotice.api();
			sopPortalNoticeObj.addParam("board_cd", $expAndNotice.boardCd);
			sopPortalNoticeObj.addParam("page_num", $expAndNotice.currentPageIndex);
			if ($expAndNotice.searchWord != null && $expAndNotice.searchWord.length > 0) {
				sopPortalNoticeObj.addParam($expAndNotice.searchType==undefined?"post_all":$expAndNotice.searchType, $expAndNotice.searchWord.toUpperCase());
			}
			sopPortalNoticeObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardLists.json"
			});
		},

		// 게시판 검색
		searchBoardLists : function() {
			$expAndNotice.currentPageIndex = 1;

			$expAndNotice.searchType = $("#notice_search_select").val();
			$expAndNotice.searchWord = $("#notice_search_title_text").val();

			if ($expAndNotice.searchWord.length != 0 && $expAndNotice.searchWord.length < 2) {
				messageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
				return;
			}

			if (!IsValid("formInput", $expAndNotice.searchWord)) {
				return;
			}

			$expAndNotice.makeLists($expAndNotice.boardCd);
		},

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
			target.attr('value', $expAndNotice.receiveLists[index].file_id);

			target = $('#file_nm');
			target.attr('name', 'file_nm');
			target.attr('value', $expAndNotice.receiveLists[index].file_nm);

			target = $('#file_path');
			target.attr('name', 'file_path');
			target.attr('value', $expAndNotice.receiveLists[index].file_path);

			target = $('#file_extension');
			target.attr('name', 'file_extension');
			target.attr('value', $expAndNotice.receiveLists[index].file_extension);

			target = $('#file_content_type');
			target.attr('name', 'file_content_type');
			target.attr('value', $expAndNotice.receiveLists[index].file_content_type);

			$('#tempForm').submit();
			$('#tempForm').remove();
		}
	};

	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.expAndNotice.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res) {
						var sopAbs = new sop.portal.absAPI();
						var tableName = "board-list";
						if (res.errCd == "0") {
							$expAndNotice.receiveLists = res.result.summaryList;
							sopAbs.onBlockUIPopup();
							$("#"+tableName).empty();
							if($expAndNotice.boardCd=="BOARD_005"){
								$.each(res.result.summaryList,function(cnt,result){
									$("#"+tableName).append(
										$("<dl/>").append($("<dt/>",{text:result.post_title}),$("<dd/>",{html:result.post_content}))		
									);
								});
							}else{
								$.each(res.result.summaryList,function(cnt,result){
									var title = $("<a/>",{html : "<strong>"+result.post_title+"</strong>"+result.reg_ts,href:"#"});
									var fileList = "";
									if(result.file_yn.toLowerCase() == "y"){
										fileList = $("<dd/>",{"class":"File",style:"display:none",html:$("<a/>",{href:"$expAndNotice.downloadFile(" + cnt + ");",text:result.file_nm + "." + result.file_extension})});
									}
									$("#"+tableName).append(
										$("<dl/>",{"class":result.priority_disp_yn.toLowerCase() == "y"?"Important":""}).append(
											$("<dt/>").append(title),
											$("<dd/>",{style:"display:none",html:decodeEntities(result.post_content)}),
											fileList
										)
									);
								});
								$("#"+tableName+" dl dt a").click(function(){
									if($(this).parents("dl").find("dd").is(":visible")){
										$(this).parents("dl").find("dd").slideUp("fast");
									}
									else {
										$("#"+tableName+" dl dd").slideUp("fast");
										$(this).parents("dl").find("dd").slideDown("fast");
									}
									return false;
								});
							}
							$sgisMobile.ui.createPaging(tableName, res.result.total_count, $expAndNotice, "currentPageIndex");
						} else {
							messageAlert.open("알림", res.errMsg);
						}
						sopAbs.onBlockUIClose();
					},
					onFail : function(status) {
					}
				});
	}());
	/*********** Receive Lists End **********/
}(window, document));