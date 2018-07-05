/**
 * 게시판 작성 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/25  초기 작성
 * author : 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	//"use strict";

	W.$boardRegist = W.$boardRegist || {};

	var mBoard_cd = "BOARD_001";
	
	$(document).ready(function() {
		boardRegist.addSecretCode();
	})
	
	boardRegist = {
			// 게시판 항목 등록
			retgistNotice : function (post_depth, post_order) {
				var title = $("#board_title_input").textbox('getValue');
				var content = $("#board_content_input").textbox('getValue');
				var inputStr = $("#board_security_code_input").textbox('getValue');
				
				if(title.length < 1) {
					alert("제목을 입력하여 주세요.");
					return;
				}
				
				if(content.length < 1) {
					alert("내용을 입력하여 주세요.");
					return;
				}
				
				if(board.checkSecretCode(inputStr)) {
//					console.log("regist submit");
				} else {
					alert("보안코드를 다시 입력하여 주세요.");
					return;
				}
				
				var sopPortalBoardObj = new sop.portal.boardRegist.api();
				sopPortalBoardObj.addParam("board_cd", mBoard_cd);
				sopPortalBoardObj.addParam("post_depth", post_depth);
				sopPortalBoardObj.addParam("post_order", post_order);
				sopPortalBoardObj.addParam("post_title", title);
				sopPortalBoardObj.addParam("post_content", content);
				sopPortalBoardObj.addParam("low_rank_s_class_cd", $("#board_category_select").combobox('getValue'));
				sopPortalBoardObj.addParam("priority_disp_yn", $("#board_priority_select").combobox('getValue'));
				sopPortalBoardObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/board/boardRegist.json"
				});
			},
			
			addSecretCode : function() {
				board.generateSecretCode();
				var tempStr = board.generateCode;
				$("#board_security_code_show").html(tempStr);
			},
			
	};
	
	/*********** Regist Start **********/
	(function() {
		$class("sop.portal.boardRegist.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					history.go(-1);
				} else {
					alert(res.errMsg);
				}
			},
			onFail : function(status) {
				alert("로그인 팝업 처리 필요");
			}
		});
	}());
	/*********** Regist End **********/
}(window, document));
