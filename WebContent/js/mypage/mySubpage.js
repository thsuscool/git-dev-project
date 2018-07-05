/**
 * mypage 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/10/01  초기 작성
 * author : 이동형
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	//"use strict";	

	W.$mySubpageList = W.$mySubpageList || {};
	
	$(document).ready(function() {			
		$("#memberModifyDlg").dialog("close");
		
		//<!-- //2015-09-10 수정 -->
		$("#cp_no").blur(function() {
			$("#cp_no").val(appendHyphenToPhoneNumber($("#cp_no").val()));
		});
	});	
	mySubpageList = {
		intgrLoginYN : "",
		//validatebox 값 세팅
		validateSetting : function() {
			
			$('#member_pw').validatebox({
				required: true,
				validType: 'length[9,20]',
				missingMessage: '기존 비밀번호를 입력해주세요.',
				invalidMessage: '9자리이상 20자리이하까지 입력 가능합니다.'
			});
			$('#pw').validatebox({
				required: true,
				validType: 'length[9,20]',
				missingMessage: '비밀번호는 필수 입력값입니다.',
				invalidMessage: '9자리이상 20자리이하까지 입력 가능합니다.'
			});
			$("#pw2").validatebox({
				required: true,
				validType: 'length[9,20]',
				missingMessage: '비밀번호는 필수 입력값입니다.',
				invalidMessage: '9자리이상 20자리이하까지 입력 가능합니다.'
			});
			$("#email").validatebox({
				required: true,
				validType: ['email','length[0,40]'],
				missingMessage: '이메일은 필수 입력값입니다.',
				invalidMessage: '이메일 형식이 맞지 않습니다.'
			});
		},
		
		//입력값 체크
		validate : function() {				
			if(!$("#member_pw").validatebox('isValid')) {
				messageAlert.open("알림","기존 비밀번호를 확인하세요");
				$("#member_pw").focus();
				return false;
			}
			
			if(!$("#pw").validatebox('isValid')) {
				messageAlert.open("알림","비밀번호를 확인하세요");
				$("#pw").focus();
				return false;
			}
			
			if(!$("#pw2").validatebox('isValid')) {
				messageAlert.open("알림","비밀번호를 확인하세요");
				$("#pw2").focus();
				return false;
			}
			
			 if(passwd_check2($("#pw").val())){
		     	messageAlert.open("알림","허용되지 않는 특수문자를  사용할 수 없습니다. \n ( &%<>) 특수문자를 다시 설정해주십시오.");
		     	$("#pw").focus();
		     	return false;
			 }
			 
			 if(!passwd_check($("#pw").val())){
		     	messageAlert.open("알림","비밀번호는  9~20자리의 숫자와 영문자, 특수문자(!@#$*^(){}) 등을 혼합하여 설정하셔야 합니다.");
		     	$("#pw").focus();
		     	return false;
			 }
			 
			 if($("#pw").val() != $("#pw2").val()) {
				messageAlert.open("알림","비밀번호를 동일하게 입력하셔야 합니다.");
				$("#pw2").focus();
			    return false;
			 }
			
			if(!$("#email").validatebox('isValid')) {
				messageAlert.open("알림","이메일 형식에 어긋납니다.");
				$("#email").focus();
				return false;
			}
			
			return true;
		},
		

		/***********  MyPage 회원 정보관리 **********/
		memberInfo: function () {		
			var sopPortalMemeberObj = new sop.portal.memberInfoList.api();			
			sopPortalMemeberObj.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/member/memberInfo.json"
			});						
		},			
						
				
		/*********** 정보변경 확인 Start **********/
		memberInfoUpdate : function() {
			if (mySubpageList.intgrLoginYN == "Y") {
				memberModify();
			}else {
				if(mySubpageList.validate()){
					var sopPortalMemberInfoObj = new sop.portal.memberInfoUpdate.api();			   
					sopPortalMemberInfoObj.addParam("member_pw", $("#member_pw").val());
					sopPortalMemberInfoObj.addParam("pw", $("#pw").val());
					sopPortalMemberInfoObj.addParam("cp_no", $("#cp_no").val());
					sopPortalMemberInfoObj.addParam("email", $("#email").val());				
					sopPortalMemberInfoObj.request({
				        method : "POST",
				        async : true,
				        url : contextPath+"/ServiceAPI/member/memberInfoModify.json"
				    });
				};
			}											   
		},		
		/*********** 회원탈퇴 Start **********/
		memberInfoDelete: function () {
			if (mySubpageList.intgrLoginYN == "Y") {
				memberUnRegister();
			}else {
				var answer = confirm("탈퇴하시겠습니까?");						
				if (answer){
					var sopPortalMemeberObj = new sop.portal.memberInfoDelete.api();			
					sopPortalMemeberObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/member/memberInfoDelete.json"
					});	
				}
				else{
				       messageAlert.open("알림",'취소되었습니다.');
				}
			}
		}
	};	
	
	/*********** 회원정보 수정 Start **********/
	(function() {		
		$class("sop.portal.memberInfoList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;					
					for(var i = 0; i < result.memberInfo.length; i ++) {
						var listItem = result.memberInfo[i];						
						var cp_no = listItem.cp_no;
						cp_no.replace(/-/gi, "");
						$("#uid").val(listItem.member_id);
						$("#member_id").val(listItem.member_id);
						$("#member_nm").val(listItem.member_nm);
						$("#cp_no").val(listItem.cp_no);
						$("#email").val(listItem.email);
						$("#intgr_cpNo").val(listItem.cp_no);
						$("#intgr_email").val(listItem.email);
						/*$("#delID").val(listItem.member_nm);*/
						
						var html = "<div class='account-draw'>";
							 html += "<h3>회원 탈퇴</h3>";						
							 html += "<p><em>"+ listItem.member_nm+"</em>님의 아이디 및 관련된 모든 정보가 삭제됩니다.<br />SGIS 오픈 플랫폼의 회원탈퇴를 원하시면 아래의 버튼을 클릭하세요.</p>";
							 html += "<a href='javascript:mySubpageList.memberInfoDelete()'>회원탈퇴</a>";
							 html += "</div>";						
							 $("#mypage_memberDel").html(html);	
						configInfo("ModifyNO");	//common.js 실명인증 정보조회
						mySubpageList.validateSetting();
					}
					
					//<!-- //2015-09-10 수정 -->
					///////////////////////////////////////////
					if (AuthInfo.intgrLoginYN == "Y") {
						$("#originPwd").hide();
						$("#modifyPwd").hide();
						$("#checkPwd").hide();
						$("#modifyCpNo").hide();
						$("#modifyEmail").hide();
						$("#intgrCpNo").show();
						$("#intgrEmail").show();
					}else {
						$("#originPwd").show();
						$("#modifyPwd").show();
						$("#checkPwd").show();
						$("#modifyCpNo").show();
						$("#modifyEmail").show();
						$("#intgrCpNo").hide();
						$("#intgrEmail").hide();
					}	
					
					$("#memberId").show();
					$("#memberName").show();
					/////////////////////////////////////////
					
				} else {
					messageAlert.open("알림",res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	
	/*********** 회원정보 수정 Start **********/
	(function() {		
	    $class("sop.portal.memberInfoUpdate.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	        	var result = res.result;	
	            if(result.memberInfoModify == "0") {
	            	messageAlert.open(
	            			"알림",
	            			"회원정보가 수정되었습니다.",
	            			function succ(){
	            				var memberInfo = result.memberInfo[0];
	            				console.log(memberInfo);
//	            				$("#originModfyForm").find($("#SYS_URL")).val(statsPotalDomain + "/view/authorization/modifyOriginMember?returnPage="+statsPotalDomain + "/view/index");
	            				$("#originModfyForm").find($(".SYS_URL")).val(statsPotalDomain + "/view/authorization/modifyOriginMember?returnPage="+statsPotalDomain + "/view/index");
//	            				$("#originModfyForm").find($("#SYS_USR_ID")).val(memberInfo.member_id);
	            				$("#originModfyForm").find($(".SYS_USR_ID")).val(memberInfo.member_id);
	            				$("#originModfyForm").find($("#SYS_USR_NAME")).val(memberInfo.member_nm);
	            				$("#originModfyForm").find($("#SYS_USR_MOBILE")).val(memberInfo.ch_cp_no);
	            				$("#originModfyForm").find($("#SYS_USR_EMAIL")).val(memberInfo.email);
	            				$("#originModfyForm").find($("#SYS_USR_OPENAPI_YN")).val(memberInfo.opneapi_yn);
	            				$("#originModfyForm").find($("#SYS_USR_BIRTHDAY")).val(memberInfo.ch_birth);
	            				$("#originModfyForm").find($("#SYS_USR_SEX")).val(memberInfo.gender);
	            				$("#originModfyForm").find($("#SYS_USR_PHONE")).val("");
	            				$("#originModfyForm").find($("#SYS_USR_DI_INFO")).val(memberInfo.member_key);
	            				$("#originModfyForm").find($("#SYS_USR_JOIN_DT")).val(memberInfo.reg_ts);
	            				$("#originModfyForm").find($("#SYS_USR_PRE_DI_INFO")).val("");

	            				$("#originModfyForm").submit();
	            			}
	            			);	            	
	            } else {
	            	messageAlert.open("알림","기존 비밀번호를 확인해 주세요.");
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	
	/*********** 회원정보 삭제 Start **********/
	(function() {		
	    $class("sop.portal.memberInfoDelete.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	        	var result = res.result;	        		        
	            if(result.memberInfoDelete == "0") {
	            	messageAlert.open("알림","회원정보가 삭제되었습니다.");
	            	$("#originDeletForm").find("#SYS_URL").val(statsPotalDomain + "/view/authorization/originUnRegister?returnPage="+statsPotalDomain + "/view/index");
//    				$("#originDeletForm").find("#SYS_USR_ID").val(result.memberId);
    				$("#originDeletForm").find(".SYS_USR_ID").val(result.memberId);
    				$("#originDeletForm").submit();
	            } else {	            	
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	
}(window, document));

function getSession(auth) {
	//<!-- //2015-09-10 수정 -->
	mySubpageList.intgrLoginYN = auth.intgrLoginYN;
	mySubpageList.memberInfo();
};
	