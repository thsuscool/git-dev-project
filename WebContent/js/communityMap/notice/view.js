(function(W, D) {
	$(document).ready(function() {
		$.ajax({
			type: "POST",
			url : contextPath+"/ServiceAPI/board/boardListsHitAdd.json",
			data:{
				"post_no": $communityMapCommon.getParameter("post_no"),
				"board_cd":"BOARD_008"
			},
			dataType: "json",
			async : true
		});
		getDetail();
	});
	function getDetail(){
		$.ajax({
			type: "POST",
			url : contextPath+"/ServiceAPI/board/boardListsView.json",
			data:{
				"post_no": $communityMapCommon.getParameter("post_no"),
				"board_cd":"BOARD_008"
			},
			dataType: "json",
			async : true,
			success: function(res) {
				if(res.errCd=="0"){
					$("#notice_list,.ptit").empty();
					var ul = $("<ul/>",{"style":"padding-top:0px;"});
					$.each(res.result.summaryList,function(cnt,node){
						$(".ptit").append(node.post_title.replace(/\n/gim, "<br>"));
						var priority_disp_yn="",files="";
						if (/y/i.test(node.file_yn)){
							files = $("<a/>",{"style":"font-size:12px;cursor:pointer;"}).append($("<img/>",{"src":contextPath+"/img/board/attachment.jpg"}),"<br>",node.file_nm+"."+node.file_extension).click(function(){
								var fileForm = 
								$("<form/>",{"action":contextPath + "/ServiceAPI/board/downloadFile.download","style":"display:none;"}).append(
									$("<input/>",{"type":"hidden","name":"file_id","value":node.file_id}),
									$("<input/>",{"type":"hidden","name":"file_nm","value":node.file_nm}),
									$("<input/>",{"type":"hidden","name":"file_path","value":node.file_path}),
									$("<input/>",{"type":"hidden","name":"file_extension","value":node.file_extension}),
									$("<input/>",{"type":"hidden","name":"file_content_type","value":node.file_content_type})
								).submit().remove();
								return false;
							});
						}
						if(/y/i.test(node.priority_disp_yn)){
							priority_disp_yn = $("<img/>",{"style":"width: 28px; height: 28px;","src":contextPath+"/img/nm/icon_notice_priority.png"});
						}
						ul.append(
							$("<li/>").append(
								$("<p/>",{"style":"background:none; text-align: right; padding-top:0px;","html":/*"조회수 "+($.isNumeric(node.post_hits)?node.post_hits:"0")+"&nbsp;&nbsp;&nbsp;"+*/node.reg_ts}),
								priority_disp_yn,
								$("<dl/>").append(
									$("<dd/>",{"class":"list_con","style":"height:auto;"}).append(
										$("<div/>",{"style":"min-height:100px;"}).append(
											$("<textarea/>",{"id":"POST_CONTENT"+cnt,"style":"width:930px;height:auto;"})	
										),
										files
									)
								)
							)
						);
						var addQuery = $communityMapCommon.addQuery(["post_no"]);
						if(/^&/.test(addQuery)){
							addQuery = "?"+addQuery.substring(1,addQuery.length);
						}
						$("#notice_list").append(ul,$("<a/>",{"href":contextPath+"/view/community/notice/list"+addQuery,"class":"anc-btn black qnaboardclose","style":"width:80px; margin-left: 880px;","text":"목록"}));
						
						var editor = CKEDITOR.replace('POST_CONTENT' + cnt, {
							resize_enabled: false,
							readOnly: true,
							removePlugins: 'toolbar,elementspath,resize',
							extraPlugins: 'divarea,autogrow',
							autoGrow_onStartup: true,
							contentsCss: 'body {overflow:hidden}'
						});
						
						var content = node.post_content;
						$('#POST_CONTENT' + cnt).html(content);
						editor.setData($('#POST_CONTENT' + cnt).text());
					});
				}else{
					$communityMapCommon.alert("알림",res.errMsg);
				}
			},
			error: function(xhr, status, errorThrown) {
				$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
			}
		});

		$('body, html').animate({
			scrollTop: 0
		}, 450);
	}
}(window, document));