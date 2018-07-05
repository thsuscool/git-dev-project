/**
* 아이디 찾기에 관한 메소드
* 
* history : 네이버시스템(주), 1.0, 2014/09/15  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
 */
(function(W, D) {
	//"use strict";
	
	$(document).ready(function() {		
		configInfo("IDNO");	//common.js 실명인증 정보조회
		$(function(){
			 // tabmenu
			 $(".board_tabs-quad > span").click(function(){
				 window.location.href = contextPath+"/view/member/PWFind";
				 /*$("#reqPCCForm").trigger('reset');
				$(".board_tabs-quad > span").removeClass("active");
				$(this).addClass("active");
				$("#content > div").hide();
				$("#content > div").eq($(".board_tabs-quad > span").index(this)).show();*/
				return false;
			 });
			 	$("#cp_no1").change(function() {			
					$("#cp_no2").focus();			
				});
				$("#cp_no4").change(function() {			
					$("#cp_no5").focus();			
				});
		});	
		
	});
	
	W.$findID = W.$findID || {};
	
	findID = {
			
			//실명인증 팝업 호출
			nameCheckFnc : function() {
				if($("#member_nm").val() == "") {
					messageAlert.open("알림","이름을 입력하세요.");
				} else if($("#cp_no2").val() == "") {
					messageAlert.open("알림","핸드폰 번호를 입력하세요.");
				} else {
					openPCCWindow();
				}
			}
	};	
}(window, document));

/*********** 아이디 찾기 Start **********/
(function() {
    $class("sop.portal.findID.api").extend(sop.portal.absAPI).define({
        onSuccess : function(status, res) {        	
        	var result = res.result;
            if(res.errCd == "0") {
            	$("#findIDSpan").html("회원님의 아이디는 " + result.member_id + " 입니다.");
            } else {
                messageAlert.open("알림",res.errMsg);
            }
        },
        onFail : function(status) {
        }
    });
}());
function siche_next() {	
	if ($("#cp_no2").val().length==4) {
		$("#cp_no3").focus();	
	return;
	}
	if ($("#cp_no5").val().length==4) {
		$("#cp_no6").focus();	
	return;
	}
	}

function submitOnEnter(inputElement, event, keyPressNo) {	
    if (event.keyCode == 13) {
    	//아이디찾기
    	if(keyPressNo === 0){
    		findID.nameCheckFnc();
    	}
    	if(keyPressNo === 1){
    		findPW.nameCheckFnc();
    	}
    }   
}
function nameInfoGet(member_key) {	
	var sopPortalFindIDObj = new sop.portal.findID.api();
	sopPortalFindIDObj.addParam("member_key", member_key);
	sopPortalFindIDObj.addParam("gubun", "30210");
	sopPortalFindIDObj.addParam("member_nm", $("#member_nm").val());
	sopPortalFindIDObj.addParam("cp_no", $("#cp_no1").val() +"-"+ $("#cp_no2").val() +"-" + $("#cp_no3").val());	
	sopPortalFindIDObj.request({
        method : "POST",
        async : false,
        url : contextPath+"/ServiceAPI/member/findID.json"
    });	
}
/*********** 아이디 찾기 End **********/