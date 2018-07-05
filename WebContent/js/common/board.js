/**
 * 게시판 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/10/01  초기 작성
 * author : 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	//"use strict";

	W.$board = W.$board || {};

	board = {
		boardCd : null,						// 게시판 코드
		boardNm : null,						// 게시판 명칭
		boardExp : null,					// 게시판 설명
		fileUploadYn : null,				// 파일 업로드 가능 여부
		fileUploadSz : null,					// 파일 업로드 제한 용량
		commentRegYn : null,				// 답변 등록 가능 여부
		commentRegLimitCnt : null,				// 답변 등록 제한 개수
		replyRegYn : null,					// 댓글 등록 가능 여부
		regAuthorityClass : null,			// 등록 권한 분류
		lowRankBClassCd : null,				// 게시판 대분류 코드
		lowRankSClassCd : [],				// 게시판 소분류 리스트
//		currentBoardObj : null,
		
		keyList : "0123456789",
		generateCode : null,
		
//		init : function(board_cd, boardObj) {
		init : function(board_cd) {
			this.boardCd = board_cd;
//			this.currentBoardObj = boardObj;
			
//			console.log(this.boardCd);
//			console.log(this.currentBoardObj);
			
			var boardCommonSetting = new sop.serviceAPI.BoardcommonSet.api();
			boardCommonSetting.addParam("board_cd", this.boardCd);
			boardCommonSetting.request({
				method : "POST",
				async : false,
				url : contextPath+"/ServiceAPI/board/boardCommonSetting.json"
			});
		},
		
		generateSecretCode : function() {
			board.generateCode = "";
			for(var i = 0; i < 5; i++) {
				board.generateCode += board.keyList.charAt(Math.floor(Math.random() * board.keyList.length));
			}
		},
		
		checkSecretCode : function(inputCode) {
			if(board.generateCode == inputCode) {
				return true;
			} else {
				return false;
			}
		},
		
		// 게시글 조회수 수정
		modifyPostHits : function (obj) {
			if(obj == null || obj == undefined) {
				return;
			}
			
			var sopPortalFaqObj = new sop.portal.modifyPostHits.api();
			sopPortalFaqObj.addParam("board_cd", obj.board_cd);
			sopPortalFaqObj.addParam("post_no", obj.post_no);
			
			sopPortalFaqObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/board/boardListsHitAdd.json"
			});
		},
		
		refreshSecretCode : function() {
			var qnaCaptchaImage = document.getElementById("qna_regist_secret_code_show");
	        var themaCaptchaImage = document.getElementById("thema_regist_secret_code_show");
	        
	        var tempCaptcha = "/jcaptcha?" + Math.random();
	        qnaCaptchaImage.src = tempCaptcha;
	        themaCaptchaImage.src = tempCaptcha;
		}
	};
	
	/*********** 게시판 분류 값 설정 Start **********/
	(function() {
	    $class("sop.serviceAPI.BoardcommonSet.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	            if(res.errCd == "0") {
	            	var result = res.result.board_common;
	            	
	            	var tempArr = [];
	            	for(var i = 0; i < result.length; i++) {
	            		if(i == 0) {
	            			board.boardNm = result[0].board_nm;
	            			board.boardExp = result[0].board_exp;
	            			board.fileUploadYn = result[0].file_upload_yn;
	            			board.fileUploadSz = result[0].file_upload_sz;
	            			board.commentRegYn = result[0].comment_reg_yn;
	            			board.commentRegLimitCnt = result[0].comment_reg_limit_cnt;
	            			board.replyRegYn = result[0].reply_reg_yn;
	            			board.regAuthorityClass = result[0].reg_authority_class;
	            			board.lowRankBClassCd = result[0].low_rank_b_class_cd;
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
	            	board.lowRankSClassCd = tempArr;
	            	init();
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
	/*********** 게시판 분류 값 설정 End **********/
	
	/*********** modify post hits Start **********/
	(function() {
		$class("sop.portal.modifyPostHits.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					console.log("seccess");
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