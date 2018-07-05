/**
* 비밀번호 찾기에 관한 메소드
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
		configInfo("PWNO");	//common.js 실명인증 정보조회		
		$(function(){			 
			 $(".board_tabs-quad > span").click(function(){
				 window.location.href = contextPath+"/view/member/IDFind";
				/*$(".board_tabs-quad > span").removeClass("active");
				$(this).addClass("active");
				$("#content > div").hide();
				$("#content > div").eq($(".board_tabs-quad > span").index(this)).show();
				return false;*/
			 });		
		});
		$("#cp_no1").change(function() {			
			$("#cp_no2").focus();			
		});
		$("#cp_no4").change(function() {			
			$("#cp_no5").focus();			
		});
	});
	
	W.$findPW = W.$findPW || {};
	
	
	findPW = {			
			//실명인증 팝업 호출
			nameCheckFnc : function() {				
				if($("#member_id").val() == "") {
					messageAlert.open("알림","아이디를 입력하세요.");
				} else if($("#member_nm2").val() == "") {
					messageAlert.open("알림","이름을 입력하세요.");
				} /*else if($("#cp_no2").val() == "") {
					messageAlert.open("알림","핸드폰 번호를 입력하세요!.");
				}*/ else {
					openPCCWindow();
				}
			}
	};
		
}(window, document));

/*********** 비밀번호 찾기 Start **********/
(function() {
    $class("sop.portal.findPW.api").extend(sop.portal.absAPI).define({
        onSuccess : function(status, res) {        	
        	var result = res.result;
            if(res.errCd == "0") {
            	messageAlert.open("알림","회원님의 임시비밀번호는 "+ result.password + " 입니다.");
            	//$("#findPWSpan").html("회원님의 임시비밀번호는"+result.password+"입니다.");
            } else {
                messageAlert.open("알림",res.errMsg);
            }
        },
        onFail : function(status) {
        }
    });
}());
function siche_next() {	
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
/*********** 비밀번호 찾기 End **********/

function nameInfoGet(member_key) {	
	var sopPortalFindIDObj = new sop.portal.findPW.api();
	sopPortalFindIDObj.addParam("member_key", member_key);
	sopPortalFindIDObj.addParam("gubun", "20100");
	sopPortalFindIDObj.addParam("member_nm", $("#member_nm2").val());
	sopPortalFindIDObj.addParam("cp_no", $("#cp_no4").val() +"-"+ $("#cp_no5").val() +"-" + $("#cp_no6").val());		
	sopPortalFindIDObj.request({
        method : "POST",
        async : false,
        url : contextPath+"/ServiceAPI/member/findID.json"
    });
}
/*********** 비밀번호 찾기 End **********/