/**
 * 침여형소통지도 공지사항에 관한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2016/01/17 초기작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$communityLeftMenu.ui.notice = {
		curNotice : null,
		/**
		 * @name          : $communityLeftMenu.ui.notice.initForm
		 * @description   : 공지사항 form 초기화
		 * @date          : 2016. 01. 17.
		 * @author	      : 나광흠
		 * @history 	  :
		 */
		initForm : function(){
			$communityLeftMenu.ui.notice.curNotice = null;
			var popupId = "#layer-popup-notice";
			$(popupId+"-form-file-list,"+popupId+"-form-hidden-file-list").empty();
			$(popupId+"-form-hidden-file-list").append($("<input/>",{"type":"file","style":"display:none;","name":"fileSearch"}));
			$(popupId+"-title").val("");
			$(popupId+"-content").val("");
			$communityMapCommon.setContentLength("layer-popup-notice-content",1300);
			$communityMapCommon.setContentLength("layer-popup-notice-title",30);
		},
		modify : {
			/**
			 * @name          : $communityLeftMenu.ui.notice.modify.setForm
			 * @description   : 
			 * @date          : 2016. 01. 17.
			 * @author	      : 나광흠
			 * @history 	  :
			 */
			setForm : function(){
				if($communityLeftMenu.ui.poiRegist.checkDate()){
					var popupId = "#layer-popup-notice";
					$(".cm_notice>.cn_tab_btn").click();
					$(popupId+"-form-box").addClass("M_on");
					if($communityLeftMenu.ui.notice.curNotice!=null){
						if($communityLeftMenu.ui.notice.curNotice.summary.is_register){
							$(popupId+"-title").val($communityLeftMenu.ui.notice.curNotice.summary.title);
							$(popupId+"-content").val($communityLeftMenu.ui.notice.curNotice.summary.content);
							$(popupId+"-form-file-list,"+popupId+"-form-hidden-file-list").empty();
							$(popupId+"-form-hidden-file-list").append($("<input/>",{"type":"file","style":"display:none;","name":"fileSearch"}));
							if($communityLeftMenu.ui.notice.curNotice.fileList.length>0){
								$.each($communityLeftMenu.ui.notice.curNotice.fileList,function(cnt,node){
									$(popupId+"-form-file-list").append($("<li/>").append(
											$("<span/>",{"class":"filename","text":node.ori_file_nm,"title":node.ori_file_nm}),
											$("<button/>",{"type":"button","data-id":node.cmmnty_map_indvdlz_notice_atch_file_id,"style":"margin-left:5px;"}).click(function(){
												var element = $(this);
												$communityMapCommon.confirm(
													"알림","삭제하시겠습니까?",[{
														title : "확인",
														func : function(opt) {
															element.parent().remove();
															$(popupId+"-form-file-list").append($("<input/>",{"type":"hidden","name":"delete-file-id","value":$(element).data("id")}));
														}
													},{title : "취소"}   
												]);
											})
									));
								});
								$(popupId+"-view-file-box").show();
							}else{
								$(popupId+"-view-file-box").hide();
							}
						}
						$communityMapCommon.setContentLength("layer-popup-notice-content",1300);
						$communityMapCommon.setContentLength("layer-popup-notice-title",30);
					}else{
						$communityLeftMenu.ui.notice.initForm();
					}
				}
			}
		},
		list : {//공지사항리스트
			currentPageIndex : 1,
			pageSize : 5,
			searchWord : null,
			getList : function(){
				var obj = new sop.portal.communityNoticeList.api();
				obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
				obj.addParam("pageSize", this.pageSize);
				obj.addParam("page_num", this.currentPageIndex);
				if($communityMapCommon.hasText(this.searchWord)){
					obj.addParam("search_word", this.searchWord);
				}
				obj.request({
					method : "POST",				
					async : true,
					url : contextPath + "/ServiceAPI/community/communityNoticeList.json"
				});
			}
		}
	};
	
	$communityLeftMenu.event.notice = {
		setUIEvent : function(){
			$communityLeftMenu.ui.notice.list.getList();
			//공지사항,공지사항 수정하기 보여주기
			$("#layer-popup-notice-modify-button").click(function(){
				$communityLeftMenu.ui.notice.modify.setForm();
			});
			
			$("#layer-popup-notice-delete-button").click(function(){
				$communityMapCommon.confirm(
					"알림","삭제하시겠습니까?",[{
					    title : "확인",
					    func : function(opt) {
					    	var obj = new sop.portal.communityDeleteNotice.api();
							obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
							obj.addParam("cmmnty_map_indvdlz_notice_id", $communityLeftMenu.ui.notice.curNotice.summary.cmmnty_map_indvdlz_notice_id);
							obj.request({
								method : "POST",				
								async : true,
								url : contextPath + "/ServiceAPI/community/communityNoticeDelete.json"
							});
					    }
					 },{title : "취소"}   
    			 ]);
			});

			//공지사항 검색
			$("#layer-popup-notice-list-search-form").submit(function(){
				$communityLeftMenu.ui.notice.list.currentPageIndex = 1;
				$communityLeftMenu.ui.notice.list.searchWord = $(this).find("input[name=search_word]").val();
				$communityLeftMenu.ui.notice.list.getList();
				return false;
			});
			//공지사항 파일 변경 이벤트
			$("body").on("change","#layer-popup-notice-form-hidden-file-list input[name^=fileSearch]",function(){
				var files = $(this)[0].files;
				var file = $(this);
				var popupId = "#layer-popup-notice";
				$(popupId+"-form-file-list").append($("<li/>").append(
					$("<span/>",{"class":"name","text":files[0].name,"title":files[0].name}),
					$("<button/>",{"type":"button","style":"margin-left:5px;"}).click(function(){
						var element = $(this);
						$communityMapCommon.confirm(
							"알림","삭제하시겠습니까?",[{
							    title : "확인",
							    func : function(opt) {
							    	file.remove();
							    	element.parent().remove();
							    }
							 },{title : "취소"}   
		    			 ]);
					})
				));
				$(popupId+"-form-hidden-file-list").prepend($("<input/>",{"type":"file","name":"fileSearch"+($(popupId+"-form-hidden-file-list input:file").length+1),"style":"display:none"}));
			});

			//공지사항 등록 이벤트
			$("#layer-popup-notice-regist-form").heumValidation({autoValidation:false},function(errors){
				if(errors.length>0){
					var labelName = "";
					if($(errors[0].element).data("error-message")){
						labelName = $(errors[0].element).data("error-message");
					}
					$communityMapCommon.alert("알림", labelName+errors[0].message,function(){
						$(errors[0].element).focus();
					});
				}else{
					var popupId = "#layer-popup-notice-form-box";
					var formData = new FormData();
					formData.append("title", $(popupId+" input[name=title]").val());
					formData.append("content", $(popupId+" textarea[name=content]").val());
					$.each($("#layer-popup-notice-form-hidden-file-list input:file"),function(cnt,node){
						if($(node)[0].files.length>0){
							formData.append("fileSearch"+cnt, $(node)[0].files[0]);
						}
					});
					var url;
					if($communityLeftMenu.ui.notice.curNotice!=null){
						url = contextPath+"/ServiceAPI/community/communityNoticeModify.json";
						formData.append("cmmnty_map_indvdlz_notice_id", $communityLeftMenu.ui.notice.curNotice.summary.cmmnty_map_indvdlz_notice_id);
						var deleteFileArray = new Array();
						$.each($("input[name=delete-file-id]"),function(cnt,node){
							deleteFileArray.push($(node).val());
						});
						if(deleteFileArray.length>0){
							formData.append("deleteFileIdArray", deleteFileArray);
						}
					}else{
						url = contextPath+"/ServiceAPI/community/communityNoticeRegist.json";
						formData.append("bnd_year", $communityMap.ui.mapList[$communityMap.ui.curMapId].bnd_year);
					}
					formData.append("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
					$.ajax({
						url: url,
						data: formData,
						processData: false,
						contentType: false,
						async: true,
						type: 'POST',
						success: function(res) {
							if(res.errCd=="0"){
								if(res.result.success){
									$communityLeftMenu.ui.notice.list.getList();
									$(".cm_notice>.cn_tab_btn").click();
									$communityMapCommon.alert("알림", ($communityLeftMenu.ui.notice.curNotice==null?"등록":"수정")+"되었습니다",function(){
										if($communityLeftMenu.ui.notice.curNotice==null){
											$("#layer-popup-notice-list a[data-id="+res.result.cmmnty_map_indvdlz_notice_id+"]").trigger("click");
										}else{
											getNoticeDetail($communityLeftMenu.ui.notice.curNotice.summary.cmmnty_map_indvdlz_notice_id);
										}
									});
								}else{
									$communityMapCommon.alert("알림", ($communityLeftMenu.ui.notice.curNotice==null?"등록":"수정")+"을 실패하였습니다");
								}
							}else{
								$communityMapCommon.alert("알림", res.errMsg);
							}
						},
						error: function(data){
							$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
						}
					});
				}
				return false;
			});
			$("#layer-popup-notice-content").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("layer-popup-notice-content",1300,true,"내용","은","는");
			});
			$("#layer-popup-notice-title").on("keyup keydown keypress",function(){
				return $communityMapCommon.setContentLength("layer-popup-notice-title",30,true,"제목","은","는");
			});
		}
	};
	/**
	 * @name         : getNoticeDetail
	 * @description  : 공지사항 상세정보
	 * @date         : 2016. 10. 19. 
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param id     : 공지사항 아이디
	 */
	function getNoticeDetail(id){
		$communityLeftMenu.ui.notice.curNotice = null;
		var obj = new sop.portal.communityNotice.api();
		obj.addParam("cmmnty_map_indvdlz_notice_id", id);
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/community/communityNotice.json"
		});
	}
	/*********** 공지사항 리스트 시작 **********/
	(function() {
		$class("sop.portal.communityNoticeList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				var popupId = "layer-popup-notice";
				$("#"+popupId+"-list").empty();
				if(res.errCd == "0") {
					if(res.result.total_count>0){
						$.each(res.result.summaryList,function(cnt,node){
							$("#"+popupId+"-list").append($("<li/>").append(
								$("<a/>",{"href":"#","data-id":node.cmmnty_map_indvdlz_notice_id}).click(function(){
									getNoticeDetail($(this).data("id"));
								}).append(
									$("<span/>",{"class":"no","text":((res.result.total_count-($communityLeftMenu.ui.notice.list.pageSize * ($communityLeftMenu.ui.notice.list.currentPageIndex - 1))))-cnt}),
									$("<span/>",{"class":"title","text":node.title}),
									$("<span/>",{"class":"date","text":node.reg_date}),
									$("<span/>",{"class":"cont","text":node.content})
								)	
							));
						});
						$communityMapCommon.createPaging(popupId, res.result.total_count, $communityLeftMenu.ui.notice.list);
					}else{
						var text;
						if($communityMapCommon.hasText($communityLeftMenu.ui.notice.list.searchWord)){
							text = "검색된 등록자료가 존재하지 않습니다";
						}else{
							text = "등록자료가 존재하지 않습니다 ";
						}
						$("#"+popupId+"-list").append($("<li/>").append($("<a/>",{"href":"javascript:void(0);","style":"text-align: center;padding: 27px 0px 0px 0px;font-size: 12px;","text":text})));
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 공지사항 리스트 종료 **********/
	/*********** 공지사항 상세정보 시작 **********/
	(function() {
		$class("sop.portal.communityNotice.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				var popupId = "layer-popup-notice-view-box";
				if(res.errCd == "0") {
					$communityLeftMenu.ui.leftLayerPopupAllClose();
					$("#"+popupId+" .detail_box .file").empty();
					$communityLeftMenu.ui.notice.curNotice = res.result;
					$("#"+popupId+" .detail_box h2").text(res.result.summary.title);
					$("#"+popupId+" .detail_box .listinfo").text("작성자 : "+res.result.summary.usr_id+" 등록일 : "+res.result.summary.reg_date);
					var tagsToReplace = {'"': '&quot;','&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#039;'};
					function replaceTag(tag) {
						var s = tagsToReplace[tag] || tag;
						return s;
					}
					$("#"+popupId+" .detail_box .notice_cont").html(res.result.summary.content.replace(/[&<>\"\'\{\}]/g, replaceTag).replace(/\n/g, "<br/>"));
					if(res.result.fileList.length>0){
						$.each(res.result.fileList,function(cnt,node){
							var file_id = node.save_file_nm.substring(0,node.save_file_nm.lastIndexOf("."));
							var file_extension = node.save_file_nm.substring(node.save_file_nm.lastIndexOf(".")+1);
							$("#"+popupId+" .detail_box .file").append($("<a/>",{
								"href":contextPath+"/ServiceAPI/community/notice/file.download?cmmnty_map_indvdlz_notice_atch_file_id="+node.cmmnty_map_indvdlz_notice_atch_file_id,
								"text":node.ori_file_nm,
								"title":node.ori_file_nm
							})).show();
						});
					}else{
						$("#"+popupId+" .detail_box .file").hide();
					}
					$("#layer-popup-notice-view-box").addClass("M_on");
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 공지사항 상세정보 종료 **********/
	/*********** 공지사항 삭제 시작 **********/
	(function() {
		$class("sop.portal.communityDeleteNotice.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$communityLeftMenu.ui.notice.list.getList();
					$communityLeftMenu.ui.notice.curNotice=null;
					$(".cm_notice>.cn_tab_btn").click();
					$communityMapCommon.alert("알림", "삭제되었습니다");
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 공지사항 상세정보 종료 **********/
}(window, document));