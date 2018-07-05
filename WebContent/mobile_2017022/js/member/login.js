/**
 * 로그인에 관한 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/09/15  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	//"use strict";
	$sgis.ready(function(){
		if(AuthInfo&&AuthInfo.authStatus) {
			location.href=contextPath+"/mobile";
		}
	});
	$(document).ready(function() {
		var returnUrl = getParameter("returnPage");
		if(getParameter("k")!=undefined&&getParameter("k")=="Y"){
			$("#intro-login").hide();
			$("#sso-login").show();
		}
		if (returnUrl != undefined && returnUrl != null && returnUrl.length > 0) {
			$login.returnUrl = decodeURIComponent(returnUrl);
			$("#sso-login input[name=CUR_URL]").val($login.returnUrl);
		}
		$("#sso-login input[name=SYS_URL]").val(window.location.protocol+"//"+window.location.host + "/view/mobile/service");
		$("button[id$=-login-button]").click(function(){
			$("#intro-login").hide();
			$("#"+$(this).attr("id").replace("-button","")).show();
		});
		$("#original-login").parents("form").submit(function(){
			$login.loginProcess();
			return false;
		});
		$("#sso-login").parent("form").submit(function(){
			var result = false;
			if($login.validate()){
				$.ajax({
					url : contextPath + "/view/authorization/pwencoding",
					type:"POST",
					data: {
						pw : $("#sso-pw").val()
					},
					async: false,
					dataType:"json",
					success: function(data){
						if(data.result){
							$("#sso-login").find($("input[name=USR_PW]")).remove();
							$("#sso-login").append($("<input/>",{"type":"hidden","name":"USR_PW","value":data.pw}));
							result = true;
						}else{
							messageAlert.open("알림",data.message);
						}
					},
					error: function(data){
						messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					}
				});
			}
			return result;
		});
	});

	W.$login = W.$login || {};

	$login = {
		returnUrl: "/mobile",
		//입력값 체크
		validate: function() {
			if ($(".validation-id:visible").val()==undefined||$(".validation-id:visible").val().replace(/ /gi,"") == "") {
				messageAlert.open("알림", "아이디를 입력하세요.",function done(){
					$(".validation-id:visible").focus();
				});
				return false;
			} else if ($(".validation-pw:visible").val()==undefined||$(".validation-pw:visible").val().replace(/ /gi,"") == "") {
				messageAlert.open("알림", "비밀번호를 입력하세요.",function done(){
					$(".validation-pw:visible").focus();
				});
				return false;
			} else {
				return true;
			}
		},

		/*********** 로그인 프로세스 Start **********/
		loginProcess: function() {
			if ($login.validate()) {
				var sopPortalMemInfoRegObj = new sop.portal.memInfoReg.api();
				sopPortalMemInfoRegObj.addParam("member_id", $("#member_id").val());
				sopPortalMemInfoRegObj.addParam("pw", $("#pw").val());
				sopPortalMemInfoRegObj.request({
					method: "POST",
					async: false,
					url: contextPath + "/ServiceAPI/member/login.json"
				});
			}
		},
		/*********** 로그인 프로세스 End **********/
	};

	/*********** 로그인 프로세스 Start **********/
	(function() {
		$class("sop.portal.memInfoReg.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					//최종 접속아이피, 접속시간 알림
					if (result.last_access_dt != null) {
						location.href=$login.returnUrl;
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 로그인 프로세스 End **********/
}(window, document));