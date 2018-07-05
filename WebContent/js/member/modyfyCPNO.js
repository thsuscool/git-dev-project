/**
* 회원정보 변경에 관한 메소드
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
		configInfo("ModifyNO");	//common.js 실명인증 정보조회
	});
	
	W.modyfyCPNO = W.modyfyCPNO || {};	
	modyfyCPNO = {			
			//실명인증 팝업 호출
			nameCheckFnc : function() {
				openPCCWindow();				
			}
	};
}(window, document));

/*********** 본인정보 찾기 Start **********/
(function() {
    $class("sop.portal.findPW.api").extend(sop.portal.absAPI).define({
        onSuccess : function(status, res) {
        	var result = res.result;
            if(res.errCd == "0") {            	
            	//$("#ModidyCPNO").html("본인확인완료~!!");
            } else {
                messageAlert.open("알림",res.errMsg);
            }
        },
        onFail : function(status) {
        }
    });
}());

function nameInfoGet(member_key) {	
	var sopPortalFindPWObj = new sop.portal.findPW.api();
	sopPortalFindPWObj.addParam("member_key", member_key);
	sopPortalFindPWObj.addParam("member_id", $("#member_id").val());	
	sopPortalFindPWObj.addParam("cp_no", $("#cp_no").val());
	sopPortalFindPWObj.request({
        method : "POST",
        async : false,
        url : contextPath+"/ServiceAPI/member/ModifyCPNO.json"
    });
}
/*********** 본인정보 찾기 End **********/