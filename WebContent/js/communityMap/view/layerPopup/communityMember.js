/**
 * 침여형소통지도 참여자 관한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2016/01/17 초기작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	function initMemberList(){
		$communityLeftMenu.ui.member.list.all.currentPageIndex = 1;
		$communityLeftMenu.ui.member.list.waitAccess.currentPageIndex = 1;
		$communityLeftMenu.ui.member.list.waitSecede.currentPageIndex = 1;
		$communityLeftMenu.ui.member.list.all.searchMemberWord = null;
		$communityLeftMenu.ui.member.list.waitAccess.searchMemberWord = null;
		$communityLeftMenu.ui.member.list.waitSecede.searchMemberWord = null;
		$communityLeftMenu.ui.member.list.getList("all");
		if(communityMapInfo.cmmnty_partcptn_grant_yn=="Y"){
			$communityLeftMenu.ui.member.list.getList("waitAccess");
			$communityLeftMenu.ui.member.list.getList("waitSecede");
		}
	}
	$communityLeftMenu.ui.member = {
		list : {//참여자 리스트
			getList : function(type){
				if(communityMapInfo.cmmnty_partcptn_grant_yn=="Y"||communityMapInfo.cmmnty_partcptn_grant_yn=="M"){
					var obj = new sop.portal.communityMemberList.api();
					obj.onBlockUIPopup();
					obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
					obj.addParam("page_num", $communityLeftMenu.ui.member.list[type].currentPageIndex);
					obj.addParam("bnd_year", $communityMap.ui.mapList[$communityMap.ui.curMapId].bnd_year);
					obj.addParam("pageSize", $communityLeftMenu.ui.member.list[type].pageSize);
					if($communityMapCommon.hasText($communityLeftMenu.ui.member.list[type].searchMemberType)){
						obj.addParam("search_member_type", $communityLeftMenu.ui.member.list[type].searchMemberType);
					}
					if($communityMapCommon.hasText($communityLeftMenu.ui.member.list[type].searchMemberWord)){
						obj.addParam("search_member_word", $communityLeftMenu.ui.member.list[type].searchMemberWord);
					}
					obj.request({
						method : "POST",				
						async : true,
						url : contextPath + "/ServiceAPI/community/communityMemberList.json",
						options : {
							type : type
						}
					});
				}
			},
			all : {
				currentPageIndex : 1,
				searchMemberType : null,
				searchMemberWord : null,
				pageSize : 5,
				getList : function(){
					$communityLeftMenu.ui.member.list.getList("all");
				}
			},
			waitAccess : {
				currentPageIndex : 1,
				searchMemberType : "WA",
				searchMemberWord : null,
				pageSize : 5,
				getList : function(){
					$communityLeftMenu.ui.member.list.getList("waitAccess");
				}
			},
			waitSecede : {
				currentPageIndex : 1,
				searchMemberType : "WS",
				searchMemberWord : null,
				pageSize : 5,
				getList : function(){
					$communityLeftMenu.ui.member.list.getList("waitSecede");
				}
			}
		},
		open : function(id){
			$communityLeftMenu.ui.leftLayerPopupAllClose();
			$(".cm_admin>.cn_tab_btn").click();
			id = id.indexOf("#")>-1?id:"#"+id;
			$(id).addClass("M_on");
			return false;
		}
	};
	
	$communityLeftMenu.event.member = {
		setUIEvent : function(){
			initMemberList();
			//회원관리 보여주기
			$("#member-manager-button").click(function(){
				$communityLeftMenu.ui.member.open("community-member-box");
			});
			//회원등록 보여주기
			$("#member-regist-button").click(function(){
				popupId = "#community-member-regist";
				$(popupId+"-id").prop("disabled",false).css("color","");
				$(popupId+"-form").data("id",null);
				$(popupId+" .password-button-box").hide();
				$(popupId+" .password-input-box").show();
				$(popupId+"-form input").val(null);
				$(popupId+" button[type=submit]").text("등록완료");
				$communityLeftMenu.ui.member.open(popupId);
			});
			//회원엑셀 업로드 보여주기
			$("#member-regist-excel-button").click(function(){
				popupId = "#community-member-excel-regist";
				$(popupId+" input").val(null);
				$(popupId+"-submit").parent().hide();
				$(popupId+"-box").handsontable("destroy");
				$communityLeftMenu.ui.member.open(popupId);
			});
			//회원 등록
			$("#community-member-regist-form").heumValidation({autoValidation:false,visibleOnly:true},function(errors){
				var popupId = "community-member-regist";
				var modifyMemberId = $("#community-member-regist-form").data("id");
				var isModify = modifyMemberId!=null&&modifyMemberId!=undefined;
				var url = contextPath + "/ServiceAPI/community/communityMemberRegist.json";
				var parameters = {
					cmmnty_map_id:$communityMapCommon.getParameter("cmmnty_map_id"),
					nm:$("#"+popupId+"-nm").val()&&$("#"+popupId+"-nm").val().replace(/ /gi,"")!=""?$("#"+popupId+"-nm").val():undefined
				};
				if(isModify){
					url = contextPath + "/ServiceAPI/community/communityMemberModify.json";
					parameters.cmmnty_ipcd=modifyMemberId;
					if($("#"+popupId+"-pw").is(":visible")){
						parameters.cmmnty_ppcd = $("#"+popupId+"-pw").val();
					}
				}else{
					parameters.cmmnty_ppcd = $("#"+popupId+"-pw").val();
					parameters.cmmnty_ipcd=$("#"+popupId+"-id").val();
				}
				if(errors.length>0){
					var labelName = "";
					if($(errors[0].element).data("error-message")){
						labelName = $(errors[0].element).data("error-message");
					}
					$communityMapCommon.alert("알림", labelName+errors[0].message,function(){
						$(errors[0].element).focus();
					});
						
					$(errors[0].element).focus();
					return false;
				}
				
				$.ajax({
					type: "POST",
					url : url,
					data:parameters,
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							if(res.result.success){
								if(isModify){
									$communityMapCommon.alert("알림","수정되었습니다");
								}else{
									$communityMapCommon.alert("알림","등록되었습니다");
								}
								initMemberList();
								$communityLeftMenu.ui.member.open("#community-member-box");
							}else{
								$communityMapCommon.alert("알림","등록을 실패하였습니다");
							}
						}else{
							$communityMapCommon.alert("알림",res.errMsg);
						}
					},
					error: function(xhr, status, errorThrown) {
						$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					}
				});
			});
			$("#community-member-regist-change-password-button").click(function(){
				$("#community-member-regist .password-button-box").hide();
				$("#community-member-regist .password-input-box").show();
				$("#community-member-regist-pw").focus();
			});
			$("#community-member-excel-regist input:file").change(function(){
				$(this).parents("div.file").find(".file_input_textbox").val($(this)[0].files[0].name);
				var formData = new FormData();
				formData.append("mpsFile", $(this)[0].files[0]);
				$.ajax({
					url: contextPath+"/view/community/getData",
					data: formData,
					processData: false,
					contentType: false,
					async: true,
					type: 'POST',
					success: function(res) {
						if(res.errCd=="0"){
							$("#community-member-excel-regist-box").height($("#community-member-excel-regist").height()-250).handsontable({
								data: res.data,
								rowHeaders: true,
								colHeaders: true,
								contextMenu: false
							});
							$("#community-member-excel-regist-submit").parent().show();
						}else{
							$communityMapCommon.alert("알림",res.message);
						}
					},
					error: function(data){
						$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					}
				});
			});
			$("#community-member-excel-regist-submit").click(function(){
				$communityMapCommon.confirm(
					"알림","등록하시겠습니까?",[{
						title : "확인",
						func : function(opt) {
							var excelBox = "community-member-excel-regist-box";
							var getData = $("#"+excelBox).handsontable("getData");
							var paramData = [];
							$.each(getData.slice(1),function(cnt,node){
								$("#"+excelBox).handsontable("setDataAtCell", cnt+1, 0, "");
								paramData.push(node);
							});
							$.ajax({
								type: "POST",
								url : contextPath + "/view/community/member/regist",
								data:{
									cmmnty_map_id:$communityMapCommon.getParameter("cmmnty_map_id"),
									data:JSON.stringify(paramData)
								},
								dataType: "json",
								async : false,
								success: function(res) {
									if(res.success){
										$communityMapCommon.alert("알림","등록되었습니다",function(){
											$communityLeftMenu.ui.member.open("#community-member-box");
											initMemberList();
										});
									}else{
										if(res.message){
											$communityMapCommon.alert("알림",res.message);
										}
										if(res.error){
											$.map(res.error,function(value,key){
												$("#"+excelBox).handsontable("setDataAtCell", key, 0, value.join("\n"));
											});
										}
										if($communityMapCommon.hasText(res.duplication)||$communityMapCommon.hasText(res.duplicationExcelData)){
											$.each(getData.slice(1),function(cnt,node){
												var setText = function(text){
													var inMessage = $("#"+excelBox).handsontable("getDataAtCell", cnt+1, 0);
													inMessage = inMessage&&inMessage.replace(/ /gi,"")!=""?inMessage+"\n"+text:text;
													$("#"+excelBox).handsontable('setDataAtCell', cnt+1, 0, inMessage);
												}
												if(res.duplication&&res.duplication.indexOf(node[3])>=0){
													setText("이미 등록된 아이디입니다");
												}
												if(res.duplicationExcelData&&res.duplicationExcelData.indexOf(node[3])>=0){
													setText("엑셀에 동일한 아이디가 존재합니다");
												}
											});
										}
										if(res.errCd!=-201){
											$.each(getData.slice(1),function(cnt,node){
												var inMessage = $("#"+excelBox).handsontable('getDataAtCell', cnt+1, 0);
												if(inMessage==undefined||inMessage==null||inMessage.replace(/ /gi,"")==""){
													$("#"+excelBox).handsontable('setDataAtCell', cnt+1, 0, "O");
												}
											});
										}
									}
								},
								error: function(xhr, status, errorThrown) {
									$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
								}
							});
						}
					},{
						title : "취소"
					}
				]);
			});
			//회원관리 탭 클릭 이벤트
			$("#community-member-box .detail_box .member_tab a").click(function(){
				$("#community-member-box .detail_box .member_tab>li").removeClass("M_on");
				$(this).parent("li").addClass("M_on");
				$("#community-member-box .detail_box div[id$=-community-member]").hide();
				$("#"+$(this).data("id")+"-community-member").show();
				return false;
			});
		}
	};
	/*********** 참여자 리스트 시작 **********/
	(function() {
		$class("sop.portal.communityMemberList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				var ul = $("<ul/>");
				var popupId = options.type+"-community-member";
				$("#"+popupId+"-list").empty();
				if(res.errCd == "0") {
					if(communityMapInfo.cmmnty_partcptn_grant_yn=="Y"){
						var mCnt = 0;
						if(res.result.approval){
							$.map(res.result.approval,function(value,key){
								if(/^wait_/.test(key)&&$.isNumeric(value)){
									mCnt+=parseInt(value);
								}
							});
							if($.isNumeric(res.result.approval.wait_access)){
								$("#community-member-wait-access-count").text(res.result.approval.wait_access);
							}else{
								$("#community-member-wait-access-count").text(0);
							}
							if($.isNumeric(res.result.approval.wait_secede)){
								$("#community-member-wait-secede-count").text(res.result.approval.wait_secede);
							}else{
								$("#community-member-wait-secede-count").text(0);
							}
						}
						if(mCnt>0){
							$(".cm_admin>.cn_tab_btn>.member").text(mCnt).show();
						}else{
							$(".cm_admin>.cn_tab_btn>.member").text("").hide();
						}
						$("#member-manager-button>span").text(mCnt);
					}
					if(options.type=="all"){
						$("#community-member-all-count").text(res.result.total_count);
					}
					if(res.result.total_count>0){
						var page_number = res.result.total_count - (($communityLeftMenu.ui.member.list[options.type].currentPageIndex-1)*$communityLeftMenu.ui.member.list[options.type].pageSize);
						var changeConfirm = function(message,cmmnty_approval_id,approval_distinct,reject){
							$communityMapCommon.confirm(
								"알림",message,[{
									title : "승인",
									func : function(opt) {
										var obj = new sop.portal.communityMemberApproval.api();
										obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
										obj.addParam("cmmnty_approval_id", cmmnty_approval_id);
										obj.addParam("approval_distinct", approval_distinct);
										obj.addParam("bnd_year", $communityMap.ui.mapList[$communityMap.ui.curMapId].bnd_year);
										obj.request({
											method : "POST",				
											async : true,
											url : contextPath + "/ServiceAPI/community/communityMemberApprovalModify.json"
										});
									}
								},{
									title : reject?"반려":"취소",
									func : function(opt) {
										if(reject){
											var obj = new sop.portal.communityMemberApproval.api();
											obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
											obj.addParam("cmmnty_approval_id", cmmnty_approval_id);
											obj.addParam("approval_distinct", "D");
											obj.addParam("bnd_year", $communityMap.ui.mapList[$communityMap.ui.curMapId].bnd_year);
											obj.request({
												method : "POST",
												async : true,
												url : contextPath + "/ServiceAPI/community/communityMemberApprovalModify.json"
											});
										}
									}
								}
							]);
						};
						
						$.each(res.result.summaryList,function(cnt,node){
							var li = $("<li/>");
							if(res.result.cmmnty_partcptn_grant_yn==="M"){
								li.append(
									$("<span/>",{"class":"no","text":page_number-cnt}),
									$("<span/>",{"class":"id","text":node.id+(node.nm?"("+node.nm+")":"")}),
									$("<span/>",{"class":"date","text":"등록일 : "+node.reg_date}),
									$("<button/>",{"class":"in","type":"button","text":"수정","data-id":node.id,"style":"top:3px;"}).click(function(){
										var popupId = "#community-member-regist";
										$(popupId+"-form").data("id",$(this).data("id"));
										$(popupId+"-id").prop("disabled",true).css("color","#ddd");
										$(popupId+" .password-input-box").hide();
										$(popupId+" .password-button-box").show();
										$(popupId+" button[type=submit]").text("수정완료");
										$communityLeftMenu.ui.member.open(popupId);
										$(popupId+"-id").val(node.id);
										$(popupId+"-nm").val(node.nm);
									}),
									$("<button/>",{"class":"out","type":"button","text":"삭제","data-id":node.id,"style":"top:28px;"}).click(function(){
										var member_id = $(this).data("id");
										$communityMapCommon.confirm(
											"알림","삭제하시겠습니까?",[{
												title : "삭제",
												func : function(opt) {
													$.ajax({
														type: "POST",
														url : contextPath + "/ServiceAPI/community/communityMemberDelete.json",
														data:{
															cmmnty_map_id:$communityMapCommon.getParameter("cmmnty_map_id"),
															cmmnty_ipcd:member_id
														},
														dataType: "json",
														async : false,
														success: function(res) {
															if(res.errCd=="0"){
																if(res.result.success){
																	$communityMapCommon.alert("알림","삭제되었습니다");
																	initMemberList();
																}else{
																	$communityMapCommon.alert("알림","삭제를 실패하였습니다");
																}
															}else{
																$communityMapCommon.alert("알림",res.errMsg);
															}
														},
														error: function(xhr, status, errorThrown) {
															$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
														}
													});
												}
											},{title : "취소"}
										]);
									})
								);
							}else{
								li.append(
									$("<span/>",{"class":"no","text":page_number-cnt}),
									$("<span/>",{"class":"id","text":node.usr_id+($communityMapCommon.hasText(node.member_nm)&&node.usr_id!=node.member_nm?"("+node.member_nm+")":"")})
								);
								if(node.approval_distinct=="WA"){
									li.append(
										$("<span/>",{"class":"date","text":"참여신청 : "+node.approval_watie_date}),
										$("<button/>",{"class":"in","type":"button","text":"참여승인","data-id":node.cmmnty_approval_id}).click(function(){
											changeConfirm("참여승인 하시겠습니까?",$(this).data("id"),"A",true);
										})
									);
								}else if(node.approval_distinct=="A"){
									li.append(
										$("<span/>",{"class":"date","text":"참여신청 : "+node.approval_watie_date+" , 참여승인 : "+node.approval_date})
									);
								}else if(node.approval_distinct=="WS"){
									li.append(
										$("<span/>",{"class":"date","text":"탈퇴신청 : "+node.sscession_watie_date}),
										$("<button/>",{"class":"out","type":"button","text":"탈퇴승인","data-id":node.cmmnty_approval_id}).click(function(){
											changeConfirm("탈퇴승인 하시겠습니까?",$(this).data("id"),"S",false);
										})
									);
								}else if(node.approval_distinct=="S"){
									li.append(
										$("<span/>",{"class":"date","text":"탈퇴신청 : "+node.sscession_watie_date+" , 탈퇴승인 : "+node.sscession_date})
									);
								}else if(node.approval_distinct=="D"){
									li.append(
										$("<span/>",{"class":"date","text":"참여반려 : "+node.restoration_date}),
										$("<button/>",{"class":"return_cancel","type":"button","text":"반려취소","data-id":node.cmmnty_approval_id}).click(function(){
											changeConfirm("참여승인 하시겠습니까?",$(this).data("id"),"A",true);
										})
									);
								}
							}
							ul.append(li);
						});
						$("#"+popupId+"-list").append(ul);
						$communityMapCommon.createPaging(popupId+"-list", res.result.total_count, $communityLeftMenu.ui.member.list[options.type]);
					}else{
						var text;
						if($communityMapCommon.hasText($communityLeftMenu.ui.notice.list.searchWord)){
							text = "검색된 등록자료가 존재하지 않습니다";
						}else{
							text = "등록자료가 존재하지 않습니다 ";
						}
						ul.append($("<li/>").append($("<a/>",{"href":"javascript:void(0);"}).append($("<span/>",{"class":"position","style":"font-size:12px;","text":text}))));
						$("#"+popupId+"-list").append(ul);
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail : function(status) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 참여자 리스트 종료 **********/
	/*********** 참여자 승인/탈퇴 변경 시작 **********/
	(function() {
		$class("sop.portal.communityMemberApproval.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					if(res.result.success){
						initMemberList();
						$communityMapCommon.alert("알림", "변경되었습니다");
					}else{
						$communityMapCommon.alert("알림", "변경을 실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 참여자 승인/탈퇴 변경 종료 **********/
}(window, document));