(function(W, D) {
	W.$communityRegistDetail = W.$communityRegistDetail || {};
	$sgis.ready(function(){
		hasCommunity(function(res){
			$communityRegistDetail.communityInfo = res;
			$communityRegistDetail.registInfo();
			$("#close-detail-bnt").click(function(){
				location.href=contextPath+"/mobile/html/community/mapPrtcpntRegistResult.html?cmmnty_map_id="+getParameter("cmmnty_map_id")+"&center="+getParameter("center");
			});
			$("#reply-write").submit(function(){
				if(/M|P|A/.test(res.result.summary.cmmnty_partcptn_grant_yn)&&res.result.summary.usr_id!==AuthInfo.member_id){
					var ok = {
						title:"등록",
						func : function(opt) {
							var id=$(this).parents(".popupWrapper").find("input[type=text]").val();
							var pw=$(this).parents(".popupWrapper").find("input[type=password]").val();
							if(id==undefined||id==null||id.replace(/ /gi,"")==""){
								messageAlert.open("알림", "아이디를 입력해주세요",function(){
									$("#reply-write").submit();
								});
							}else if(pw==undefined||id==null||pw.replace(/ /gi,"")==""){
								messageAlert.open("알림", "비밀번호를 입력해주세요",function(){
									$("#reply-write").submit();
								});
							}else{
								if($("#reply_content").val()!=undefined&&$("#reply_content").val().replace(/ /gi,'')!=''){
									var obj = new sop.portal.replyActions.api();
									obj.addParam("cmmnty_ipcd", id);
									obj.addParam("cmmnty_ppcd", pw);
									obj.addParam("reply_content", $("#reply_content").val());
									obj.addParam("cmmnty_poi_id", getParameter("cmmnty_poi_id"));
									obj.request({
										method : "POST",				
										async : false,
										url : contextPath + "/ServiceAPI/community/communityPoiReplyRegist.json"
									});	
								}else{
									messageAlert.open("알림","댓글 내용을 입력해주세요",function(){
										$("#reply_content").focus();
									});
									return false;
								}
							}
						}
					};
					var cancel = {
						title:"취소",
						func : function(opt) {}
					};
					var stamp = makeStamp(new Date());
					var html ="";
					html+='<div style="text-align: left;font-size:15px;">';
					html+='	<label for="id-'+stamp+'">아이디</label><input type="text" id="id-'+stamp+'" class="alertInputBox" placeholder="아이디를 입력하세요">';
					html+='</div>';
					html+='<div style="text-align: left;font-size:15px;">';
					html+='	<label for="pw-'+stamp+'">비밀번호</label><input type="password" id="pw-'+stamp+'" class="alertInputBox" placeholder="비밀번호를 입력하세요">';
					html+='</div>';
					messageConfirm.open("알림",html,[ok,cancel]);
				}else{
					$communityRegistDetail.makeReplyRegister();
				}
				return false;
			});
			$(".DetailInfo").height($(window).height()-$("header").outerHeight());
		});
		$("body").on("click","#regist-info-photo-box-navigator button",function(){
			$("#regist-info-photo-box img").hide();
			$("#regist-info-photo-box img:eq("+$(this).index()+")").show();
			$("#regist-info-photo-box-navigator button").removeClass("M_on");
			$(this).addClass("M_on");
		});
	});
	$communityRegistDetail = {
		registInfo : function(){
			var sopPortalPoiInfoObj = new sop.portal.poiInfo.api();		
			sopPortalPoiInfoObj.addParam("cmmnty_poi_id", getParameter("cmmnty_poi_id"));
			sopPortalPoiInfoObj.request({
				method : "POST",				
				async : false,
				url : contextPath + "/ServiceAPI/community/communityPoi.json"
			});
		},
		//댓글 리스트
		replyList : function (res) {
			$("#reply-list").empty();
			if(res.errCd == "0") {
				$("#report-count").text(res.result.summary.sttemnt_cnt);
				$("#reply-count").text(res.result.summary.reply_cnt);
				if(res.result.replyList.length>0){
					$.each(res.result.replyList,function(){
						var html = "";
						html+='<li>';
						html+='	<span id="'+this.poi_reply_id+'-contents" class="comment_cont">'+this.reply_content+'</span>';
						html+='	<span class="name">'+this.usr_id+'</span>';
						html+='	<span class="date">'+this.reg_date+'</span>';
						if(this.is_register=="Y"||(/M|P|A/.test($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id)){
							html+='	<button class="modify" type="button" onclick="$communityRegistDetail.makeReplyModify(\''+this.poi_reply_id+'\');">댓글수정</button>';
							html+='	<button class="delete" type="button" onclick="$communityRegistDetail.makeReplyDelete(\''+this.poi_reply_id+'\');">댓글삭제</button>';
						}
						html+='</li>';
						$("#reply-list").append(html);
					});
				}else{
					$("#reply-list").append('<li><a class="NoData">등록된 댓글이 존재하지 않습니다.</a></li>');
				}
			} else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		//댓글 write				
		makeReplyRegister : function () {
			if($("#reply_content").val()!=undefined&&$("#reply_content").val().replace(/ /gi,'')!=''){
				var obj = new sop.portal.replyActions.api();
				obj.addParam("reply_content", $("#reply_content").val());
				obj.addParam("cmmnty_poi_id", getParameter("cmmnty_poi_id"));
				obj.request({
					method : "POST",				
					async : false,
					url : contextPath + "/ServiceAPI/community/communityPoiReplyRegist.json"
				});	
			}else{
				messageAlert.open("알림","댓글 내용을 입력해주세요",function(){
					$("#reply_content").focus();
				});
				return false;
			}
		},
		//댓글 삭제
		makeReplyDelete : function (reply_id) {
			var html = "";
			var stamp = makeStamp(new Date());
			if($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn=="P"&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
				html+='<div style="text-align: left;font-size:15px;">';
				html+='	<input type="text" id="id-'+stamp+'" class="alertInputBox" placeholder="아이디를 입력하세요">';
				html+='</div>';
			}
			if(/M|P|A/.test($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
				html+='<div style="text-align: left;font-size:15px;">';
				html+='	<input type="password" id="pw-'+stamp+'" class="alertInputBox" placeholder="비밀번호를 입력하세요">';
				html+='</div>';
			}
			messageConfirm.open(
				"알림", 
				"댓글을 삭제하시겠습니까?"+html,
				[{
					title : "삭제하기",
					fAgm : null,
					disable : false,
					func : function(opt) {
						var register=$(this).parents(".popupWrapper").find("#id-"+stamp).val();
						var pw=$(this).parents(".popupWrapper").find("#pw-"+stamp).val();
						if(($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn=="P"&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id)&&(register==undefined||register==null||register.replace(/ /gi,"")=="")){
							messageAlert.open("알림", "아이디를 입력해주세요",function(){
								$communityRegistDetail.makeReplyDelete(reply_id);
							});
						}else if((/M|P|A/.test($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id)&&(pw==undefined||pw==null||pw.replace(/ /gi,"")=="")){
							messageAlert.open("알림", "비밀번호를 입력해주세요",function(){
								$communityRegistDetail.makeReplyDelete(reply_id);
							});
						}else{
							var sopPortalReplyObj = new sop.portal.replyActions.api();
							if($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn=="P"&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
								sopPortalReplyObj.addParam("cmmnty_ipcd", register);
							}
							if(/M|P|A/.test($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
								sopPortalReplyObj.addParam("cmmnty_ppcd", pw);
							}
							sopPortalReplyObj.addParam("poi_reply_id", reply_id);
							sopPortalReplyObj.request({
								method : "POST",				
								async : false,
								url : contextPath + "/ServiceAPI/community/communityPoiReplyDelete.json"
							});
						}
					}
				},
				{
					title : "취소하기",
					fAgm : null,
					disable : false,
					func : function(opt) {}
				}]
			);
		},
		//댓글 modify
		makeReplyModify : function (reply_id) {
			var html = "";
			var stamp = makeStamp(new Date());
			html+='<div style="text-align: left;font-size:15px;">';
			html+='	<input type="text" id="content-'+stamp+'" class="alertInputBox" placeholder="댓글을 입력하세요" value="'+$("#"+reply_id+"-contents").text()+'">';
			html+='</div>';
			if($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn=="P"&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
				html+='<div style="text-align: left;font-size:15px;">';
				html+='	<input type="text" id="id-'+stamp+'" class="alertInputBox" placeholder="아이디를 입력하세요">';
				html+='</div>';
			}
			if(/M|P|A/.test($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
				html+='<div style="text-align: left;font-size:15px;">';
				html+='	<input type="password" id="pw-'+stamp+'" class="alertInputBox" placeholder="비밀번호를 입력하세요">';
				html+='</div>';
			}
			messageConfirm.open(
				"알림", 
				html,
				[{
					title : "수정",
					fAgm : null,
					disable : false,
					func : function(opt) {
						var register=$(this).parents(".popupWrapper").find("#id-"+stamp).val();
						var pw=$(this).parents(".popupWrapper").find("#pw-"+stamp).val();
						var text = $(this).parents(".alertPopupWrapper").find("#content-"+stamp).val();
						if(text==undefined&&text.replace(/ /gi,'')!=''){
							messageAlert.open("알림", "댓글 내용을 입력해주세요",function done() {
								$communityRegistDetail.makeReplyModify(reply_id);
							});
						}else if(($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn=="P"&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id)&&(pw==undefined||pw==null||pw.replace(/ /gi,"")=="")){
							messageAlert.open("알림", "아이디를 입력해주세요",function(){
								$communityRegistDetail.makeReplyModify(reply_id);
							});
						}else if((/M|P|A/.test($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id)&&(pw==undefined||pw==null||pw.replace(/ /gi,"")=="")){
							messageAlert.open("알림", "비밀번호를 입력해주세요",function(){
								$communityRegistDetail.makeReplyModify(reply_id);
							});
						}else{
							var obj = new sop.portal.replyActions.api();
							obj.addParam("reply_content", text);
							obj.addParam("poi_reply_id", reply_id);
							if($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn=="P"&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
								obj.addParam("cmmnty_ipcd", register);
							}
							if(/M|P|A/.test($communityRegistDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)&&$communityRegistDetail.communityInfo.result.summary.usr_id!==AuthInfo.member_id){
								obj.addParam("cmmnty_ppcd", pw);
							}
							obj.request({
								method : "POST",
								async : false,
								url : contextPath + "/ServiceAPI/community/communityPoiReplyModify.json"
							});
						}
					}
				},
				{
					title : "취소",
					fAgm : null,
					disable : false,
					func : function(opt) {}
				}]
			);
		}
	};
	/*********** 상세정보 시작 **********/
	(function() {
		$class("sop.portal.poiInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var file = "";
					if(res.result.fileList.length>0){
						file+='<div id="regist-info-photo-box" style="height:140px;float:left;position: relative;">';
						var navigator = "";
						$.each(res.result.fileList,function(cnt,node){
							file+='<img id="regist-info-photo'+cnt+'" src="'+contextPath+'/mobile/img/community/img_no.png" alt="" style="'+(cnt==0?'':'display:none;')+'">';
							navigator+='<button class="'+(cnt==0?'M_on':'')+'">';
						});
						if(res.result.fileList.length>1){
							file+='<div id="regist-info-photo-box-navigator" class="navigator">'+navigator+'</div>';
						}
						file+='</div>';
					}
					var tagsToReplace = {'"': '&quot;','&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#039;'};
					function replaceTag(tag) {
						var s = tagsToReplace[tag] || tag;
						return s;
					}
					$("#regist-info").html(
						'<dt>'+res.result.summary.title+'</dt>'+
						'<dd class="SubInfo">'+
						file+
						'	<span class="date">등록일: '+res.result.summary.reg_date+'</span>'+
						'	<span class="add"><strong>위치</strong>'+res.result.summary.reg_lc+'</span>'+
						'	<span class="comment"><strong>의견</strong>'+res.result.summary.opinion_state.replace(/[&<>\"\'\{\}]/g, replaceTag).replace(/\n/g, "<br/>")+'</span>'+
						'</dd>'
					);
					$.each(res.result.fileList,function(cnt,node){
						$("<img/>",{src:contextPath+node.path_nm+node.save_file_nm}).load(function(){
							$("#regist-info-photo"+cnt).attr("src",contextPath+node.path_nm+node.save_file_nm);
						});
					});
					$communityRegistDetail.replyList(res);
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {}
		});
	}());
	/*********** 상세정보 끝 **********/
	/*********** 댓글 시작 **********/
	(function() {
		$class("sop.portal.replyActions.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$("#reply_content").val('');
					$communityRegistDetail.registInfo();
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {}
		});
	}());
	/*********** 댓글 끝 **********/
}(window, document));