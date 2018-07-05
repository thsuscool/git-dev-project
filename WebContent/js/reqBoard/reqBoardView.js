/**
 * 게시판 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2018/02/06  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 *
 */

function init() {
	$reqBoard.makeReqView();
}

var msg = '';

(function(W, D) {
	//"use strict";

	W.$reqBoard = W.$reqBoard || {};
	
	var REQ_SEQ = getParameter("REQ_SEQ");
	
	$(document).ready(function() {
		init();
		
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
		
		$(window).resize(function(){
			var resizeScrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
			$("#topScrollTag").css("left", resizeScrollWidthVal)
		}).resize();
		
		
		$(".listBtn").click(function(){
			var parameters = "page_num="+$reqBoard.currentPageIndex+"&searchWordType="+$reqBoard.searchWordType+"&searchWord="+$reqBoard.searchWord;
			location.href = contextPath + "/view/req/reqBoardList?" + parameters;
		});
		
		$(".reqBtn").click(function(){
			var REQ_PRGRS_STATS_CD = $(this).data('statscd');
			msg = $( this ).text();
			
			if( REQ_PRGRS_STATS_CD == '02' ){
				if( $("#RECV_USER_NM").val().trim() == '' ){
					alert('접수자를 입력하세요.');
					return false;
				}
			} else if( REQ_PRGRS_STATS_CD == '03' ){
				if( $("#_MOD_REQ_CONTENT").val().trim() == '' ){
					alert('변경요청 내용을 입력하세요.');
					return false;
				}
				
				if( $("#MOD_REQ_USER_NM").val().trim() == '' ){
					alert('변경요청자를 입력하세요.');
					return false;
				}
			} else if( REQ_PRGRS_STATS_CD == '05' ){
				if( $("#PRGRS_USER_NM").val().trim() == '' ){
					alert('진행자를 입력하세요.');
					return false;
				}
			} else if( REQ_PRGRS_STATS_CD == '06' ){
				if( $("#_WORK_CONTENT").val().trim() == '' ){
					alert('확인요청 내용을 입력하세요.');
					return false;
				}
				
				if( $("#WORK_USER_NM").val().trim() == '' ){
					alert('확인요청자를 입력하세요.');
					return false;
				}
			}
			
			var c = confirm( msg + "하시겠습니까?");
			if( c == 1 ){
				$reqBoard.updateReqBoard( REQ_SEQ, REQ_PRGRS_STATS_CD );
			}
			
		});
		
		$(".toggleBtn").click(function(){
			var $btn = $( this );
			var $next = $( this ).closest('div').next();
				
			if( $btn.hasClass('toggle-on') ){
				$next.addClass('display-none').hide();
				$btn.text("+");
				$btn.removeClass('toggle-on');
			} else {
				$next.removeClass('display-none').attr("style", "display:block;").show();
				$btn.text("-");
				$btn.addClass('toggle-on');
			}
		});
		
	})

	$reqBoard = {
		currentPageIndex : getParameter( 'page_num' ),
		searchWordType : getParameter( 'searchWordType' ),
		searchWord : getParameter( 'searchWord' ),

		// 게시판 목록 생성
		makeReqView : function() {
			var sopPortalReqObj = new sop.portal.reqBoardView.api();
			
			sopPortalReqObj.addParam("REQ_SEQ", REQ_SEQ);
			sopPortalReqObj.addParam("page_num", $reqBoard.currentPageIndex);
			if( $reqBoard.searchWordType ) sopPortalReqObj.addParam("searchWordType", $reqBoard.searchWordType);
			if( $reqBoard.searchWord ) sopPortalReqObj.addParam("searchWord", $reqBoard.searchWord);
			
			sopPortalReqObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/req/reqBoardView.json"
			});

			$('body, html').animate({
				scrollTop : 0
			}, 450);
		},
		
		updateReqBoard : function( REQ_SEQ, REQ_PRGRS_STATS_CD ){
			var len = 0;
			
			var sopPortalReqObj = new sop.portal.updateReqBoard.api();
			sopPortalReqObj.addParam('REQ_SEQ', REQ_SEQ);
			sopPortalReqObj.addParam('REQ_PRGRS_STATS_CD', REQ_PRGRS_STATS_CD);
			
			if( REQ_PRGRS_STATS_CD == '02' ){
				sopPortalReqObj.addParam('RECV_USER_NM', $("#RECV_USER_NM").val());
			} else if( REQ_PRGRS_STATS_CD == '03' ){
				sopPortalReqObj.addParam('MOD_REQ_CONTENT', $("#_MOD_REQ_CONTENT").val());
				sopPortalReqObj.addParam('MOD_REQ_USER_NM', $("#MOD_REQ_USER_NM").val());
				len = this.byteCheck( [$("#MOD_REQ_CONTENT").html(), $("#_MOD_REQ_CONTENT").val(), $("#MOD_REQ_USER_NM").val()], 24 );
				
			} else if( REQ_PRGRS_STATS_CD == '05' ){
				sopPortalReqObj.addParam('PRGRS_USER_NM', $("#PRGRS_USER_NM").val());
			} else if( REQ_PRGRS_STATS_CD == '06' ){
				sopPortalReqObj.addParam('WORK_CONTENT', $("#_WORK_CONTENT").val());
				sopPortalReqObj.addParam('WORK_USER_NM', $("#WORK_USER_NM").val());
				len = this.byteCheck( [$("#WORK_CONTENT").html(), $("#_WORK_CONTENT").val(), $("#WORK_USER_NM").val()], 24 );
			}
			
			if( len > 4000 ){
				alert('입력할 수 있는 글자 수가 '+ Math.abs(4000-len) +'Byte 초과하였습니다. 관리자에게 문의하시기 바랍니다.');
			} else {
				sopPortalReqObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/req/updateReqBoard.json"
				});
			}
		},
		
		downloadFile : function( FILE_PATH, FILE_ID, FILE_EXTENSION, FILE_CONTENT_TYPE ) {
			var openNewWindow = window.open("about:blank");
			const cnmUrl = "/upload/reqBoard/";

			openNewWindow.location.href= cnmUrl + FILE_ID + "." + FILE_EXTENSION;
		},
		
		byteCheck : function( strs, dflt ){
			var l = 0;
			
			for( var i=0; i<strs.length; i++ ){
				if( strs[i] ){
					for( var j=0; j<strs[i].length; j++ ){
						var str = strs[i];
						var c = escape( str.charAt(j) );
						
						if( c.length == 1 ) l++;
						else if( c.indexOf("%u") != -1 ) l += 3;
						else if( c.indexOf("%") != -1 ) l += c.length/3;
					}
				}
			}
			
			l = ( l + dflt );
			return l;
		}
		
	};

	(function() {
		$class("sop.portal.reqBoardView.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {							
					var result = res.result;
					var reqBoardTotalCnt = result.total_count;
					var pageSize = result.pageSize;
					var curPage = result.curPage;
					
					if( result != null && result.data != null ){
						$.each( res.result.data, function( key, val ){
							var key = key.toUpperCase();
							
							if( $("#" + key).length > 0 ){
								if( $("#" + key).prop('tagName').toUpperCase() == 'SPAN' ){
									val = val.replace(/\n/gi,'<br/>').replace(/\\n/gi,'<br/>');
									$("#" + key).html( val );
								} else {
									$("#" + key).val( val );
								}
							}
						});
						
						var today = new Date();
						var reg_de = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
						
						$("#RECV_DT,#PRGRS_DT,#WORK_COMPLETE_DT").each(function(a,b){
							if( $( this ).text().trim() == '' ){
								$( this ).text( reg_de );
							}
						});
						
						var file = '무';
						if (result.data.file_nm != null && result.data.file_nm != '') {
							file = "<a onclick='$reqBoard.downloadFile(\""
									+ result.data.file_path
									+ "\",\""
									+ result.data.file_save_nm
									+ "\",\""
									+ result.data.file_extn
									+ "\",\""
									+ result.data.file_content_type
									+ "\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"
									+ result.data.file_nm + "." + result.data.file_extn + "</a>";
						
							$('#reqFile').html(file);
						}
						
						var prgrs_cd = result.data.req_prgrs_stats_cd;
						
						if( prgrs_cd >= '02' ){
							$(".step1:not('.prgrs')").find("input,textarea").prop("readonly", "readonly");
							$(".step1").find(".recv").addClass("display-none").hide();
							
							$(".step2-1,.step2-2").removeClass("display-none").show();
							
							if( ( ( prgrs_cd == '03' || prgrs_cd == '04' ) && prgrs_cd != '05' ) || prgrs_cd >= '08' ){
								$(".step2-2").find(".toggleBtn").click();
							}
							
							if( prgrs_cd >= '03' ){
								if( prgrs_cd == '03' ){
									$(".step2-1").find("input,textarea").prop("readonly", "readonly");
									$(".step2-1").find(".reqBtnBox").addClass("display-none").hide();
								}
								
								if( prgrs_cd != '04' ){
									$(".step2-2").find("input,textarea").prop("readonly", "readonly");
									$(".step2-2").find(".reqBtnBox").addClass("display-none").hide();
								}
								
								if( prgrs_cd >= '05' ){
									if( !result.data.mod_req_dt && !result.data.mod_after_req_dt ){
										$(".step2-2").addClass("display-none").hide();
									}
									
									$(".step2-1").find("input,textarea").prop("readonly", "readonly");
									$(".step2-1").find(".reqBtnBox").addClass("display-none").hide();
									
									if( prgrs_cd < '08' || result.data.work_complete_dt ){
										$(".step3").removeClass("display-none").show();
										$(".step3").find(".toggleBtn").click();
									}
									
									if( prgrs_cd >= '06' ){
										if( prgrs_cd != '07' ){
											$(".step3").find("input,textarea").prop("readonly", "readonly");
											$(".step3").find(".reqBtnBox").addClass("display-none").hide();
										}
									}
								}
							}
							
						}
					} else {
						alert('데이터가 없습니다.');
						$(".listBtn").click();
					}
				}
			},
			onFail : function(status) {
			}
		});
		
		$class("sop.portal.updateReqBoard.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					alert( msg + '(이)가 완료되었습니다.');
					$(".listBtn").click();
				} else {
					alert( res.errMsg );
				}
			},
			onFail : function(status) {
				alert( '오류가 발생하였습니다.');
			}
		});
	}());

}(window, document));


