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
	
	$(document).ready(function() {
		login.validateSetting();
		var returnUrl = getParameter("returnPage");
		if (returnUrl != undefined && returnUrl != null && returnUrl.length > 0) {
			login.returnUrl = decodeURI(returnUrl);
		}
	});
	
	W.$login = W.$login || {};
	
	login = {

			returnUrl : null,
				
			//validatebox 값 세팅
			validateSetting : function() {
				$('#member_id').textbox({
					//prompt: '아이디'
				});
				$('#member_id').textbox('clear').textbox('textbox').focus();
				
				$('#pw').textbox({});
				
				var pw = $('#pw');
				pw.textbox('textbox').bind('keydown', function(e){
					if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
						pw.textbox('setValue', $(this).val());
						login.loginProcess();
					}
				});
			},
			
			//입력값 체크
			validate : function() {
				if($("#member_id").val() == "") {
					messageAlert.open("알림","아이디를 입력하세요.");
					return false;
				} else if($("#pw").val() == "") {
					messageAlert.open("알림","비밀번호를 입력하세요.");
					return false;
				} else {
					return true;
				}
			},			
			//회원가입
			memberJoin : function() {
				window.location.href = contextPath+"/view/member/agree";
			},

			//아이디 찾기
			findID : function() {
				window.location.href = contextPath+"/view/member/findID";
			},

			//비밀번호 찾기
			findPW : function() {
				window.location.href = contextPath+"/view/member/findPW";
			},
			
			//아이디 찾기
			find_ID : function() {
				window.location.href = contextPath+"/view/member/IDFind";
			},
			
			//아이디 찾기
			find_PW : function() {
				window.location.href = contextPath+"/view/member/PWFind";
			},
			
			//<!-- //2015-09-10 수정 -->			
			//기존사용자 탈퇴여부, 통합인증에서 체크
			checkLogin : function() {
				$("#originLoginCheckForm").find("#SYS_USR_ID").val($("#member_id").val());
				$("#originLoginCheckForm").find("#SYS_USR_PW").val($("#pw").val());
				$("#originLoginCheckForm").attr("target", "originloginCheckFrame");
				$("#originLoginCheckForm").submit();
			},
			
			/*********** 로그인 프로세스 Start **********/
			loginProcess : function() {
				if(login.validate()) {
				    var sopPortalMemInfoRegObj = new sop.portal.memInfoReg.api();
				    sopPortalMemInfoRegObj.addParam("member_id", $("#member_id").val());
				    sopPortalMemInfoRegObj.addParam("pw", $("#pw").val());
				    sopPortalMemInfoRegObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath+"/ServiceAPI/member/login.json"
				    });
				}
			},
			/*********** 로그인 프로세스 End **********/
			
			/*********** 로그인 프로세스 Start **********/
			loginDeveloperProcess : function(options) {
				if(login.validate()) {
				    var sopPortalMemInfoRegDeveloperObj = new sop.portal.memInfoRegDeveloper.api();
				    sopPortalMemInfoRegDeveloperObj.addParam("member_id", $("#member_id").val());
				    sopPortalMemInfoRegDeveloperObj.addParam("pw", $("#pw").val());
				    sopPortalMemInfoRegDeveloperObj.request({
				        method : "POST",
				        async : false,
				        url : developApiPath+"/member/login.json",
				        options : options
				    });
				}
			},
			/*********** 로그인 프로세스 End **********/
	};
	
	/*********** 로그인 프로세스 Start **********/
	(function() {
	    $class("sop.portal.memInfoReg.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") {
	            	//최종 접속아이피, 접속시간 알림
	            	if(result.last_access_dt != null) {	  
	            		//분기 1회이상 비밀번호 변경 여부 알림
    	            	if(result.pwChgCnt > 0) {
    	            		messageConfirm.open(
    				    			 "알림", 
    				    			 "3개월 이상 비밀번호를 변경하지 않으셨습니다.\r\n 비밀번호를 변경하여 주시기 바랍니다.",
    				    			 btns = [
        				    			 {
        				    			   title : "나중에 변경하기",
          				    			   fAgm : null,
          				    			   disable : false,
          				    			   style : {
          				    				   "width" : "120px"  
          								   },
          				    			   func : function(opt) {
          				    				   if (login.returnUrl != null) {
          	    	            				//window.location.href = login.returnUrl;
          				    					   login.loginDeveloperProcess({
          				    						   returnUrl : login.returnUrl
          				    					   });	 //개발 사이트 동시 로그인
          				    				   }else {
          				    					   login.loginDeveloperProcess();
          				    				   }
          				    			   }
          				    			 },
          				    			 
    				    			     {
    									   title : "비밀번호변경",
    									   fAgm : null,
    									   disable : false,
    									   style : {
    										 "width" : "120px"  
    									   },
    									   func : function(opt) {
    										   window.location.href = contextPath+"/view/mypage/mysubpage";
    									   }
    				    			     },    

    				    			 ]
    				    	);
    	            		
    	            		

    	            	}else {
    	            		login.loginDeveloperProcess({
    	            			returnUrl : login.returnUrl
    	            		});	 //개발 사이트 동시 로그인
    	            	}
	            	}
	            	
	            	
	            	
	            } else {
	            	messageConfirm.open(
			    			 "알림",
			    			 res.errMsg,
			    			 btns = [
								{
								    title : "확인",
								    fAgm : null,
								    disable : false,
								    func : function(opt) {
								    	$('#member_id').textbox('textbox').focus();
								    }
								 }
							]
			    	);
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** 로그인 프로세스 End **********/
	
	/*********** 개발자 로그인 프로세스 Start **********/
	(function() {
	    $class("sop.portal.memInfoRegDeveloper.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	var result = res.result;
	            if(res.errCd == "0") {	            	
	            } else {
	            }
	            if (options != undefined && 
	            		options.returnUrl != undefined &&
	            		options.returnUrl != null) {
	            			window.location.href = options.returnUrl;
	            }else {
	            	window.location.href = contextPath+"/view/index";
	            }
	            	
            	
	        },
	        onFail : function(status, options) {
	        	if (options != undefined && 
	            		options.returnUrl != undefined &&
	            		options.returnUrl != null) {
	            			window.location.href = options.returnUrl;
	            }else {
	            	window.location.href = contextPath+"/view/index";
	            }
	        }
	    });
	}());
	/*********** 개발자 로그인 프로세스 End **********/
}(window, document));