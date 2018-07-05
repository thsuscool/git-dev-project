/**
 * 통계 소통지도 초기 화면
 * 
 * history : (주)유코아시스템, 1.0, 2016/1/12  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$(document).ready(function(){
		$communityIntro.event.setUIEvent();
		pageCallReg();
	});
	W.$communityIntro = W.$communityIntro || {};
	var currentPageIndex = 1,pageSize = 6,search_word = null,firstSort=null,secondSort=null,last_cmmnty_map_id=null,tags=null;
	/**
	 * @name         : noticeList
	 * @description  : 공지사항 리스트
	 * @date         : 2016. 01. 17.
	 * @author	     : 나광흠
	 * @history 	 :
	 */
	function noticeList(){
		var obj = new sop.portal.noticeList.api();
		obj.onBlockUIPopup();
		obj.addParam("board_cd","BOARD_008");
		obj.addParam("page_num","1");
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/board/boardLists.json"
		});
	}
	/**
	 * @name           : hotCommunityList
	 * @description    : 핫 소통지도 리스트
	 * @date           : 2016. 01. 17.
	 * @author	       : 나광흠
	 * @history 	   :
	 */
	function hotCommunityList(){
		var obj = new sop.portal.type.communityList.api();
		obj.onBlockUIPopup();
		obj.addParam("type", "hot");
		obj.addParam("bnd_year", bndYear);
		if($communityMapCommon.hasText($communityMapCommon.getParameter("sido_cd"))){
			obj.addParam("sido_cd", $communityMapCommon.getParameter("sido_cd"));
			if($communityMapCommon.hasText($communityMapCommon.getParameter("sgg_cd"))){
				obj.addParam("sgg_cd", $communityMapCommon.getParameter("sgg_cd"));
				if($communityMapCommon.hasText($communityMapCommon.getParameter("emdong_cd"))){
					obj.addParam("emdong_cd", $communityMapCommon.getParameter("emdong_cd"));
				}
			}
		}
		if($communityMapCommon.hasText(tags)){
			obj.addParam("tags", $communityMapCommon.getParameter("tags"));
		}
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/community/communityList.json",
			options : {
				type:"hot"
			}
		});
	}
	/**
	 * @name           : newCommunityList
	 * @description    : 최신 소통지도 리스트
	 * @date           : 2016. 01. 17.
	 * @author	       : 나광흠
	 * @history 	   :
	 */
	function newCommunityList(callback){
		var obj = new sop.portal.type.communityList.api();
		obj.onBlockUIPopup();
		obj.addParam("type", "new");
		obj.addParam("page_num", 1);
		obj.addParam("pageSize", 4);
		obj.addParam("bnd_year", bndYear);
		if($communityMapCommon.hasText($communityMapCommon.getParameter("sido_cd"))){
			obj.addParam("sido_cd", $communityMapCommon.getParameter("sido_cd"));
			if($communityMapCommon.hasText($communityMapCommon.getParameter("sgg_cd"))){
				obj.addParam("sgg_cd", $communityMapCommon.getParameter("sgg_cd"));
				if($communityMapCommon.hasText($communityMapCommon.getParameter("emdong_cd"))){
					obj.addParam("emdong_cd", $communityMapCommon.getParameter("emdong_cd"));
				}
			}
		}
		if($communityMapCommon.hasText(tags)){
			obj.addParam("tags", $communityMapCommon.getParameter("tags"));
		}
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/community/communityList.json",
			options : {
				type:"new"
			}
		});
	}
	/**
	 * @name           : communityList
	 * @description    : 소통지도 리스트
	 * @date           : 2016. 01. 17.
	 * @author	       : 나광흠
	 * @history 	   :
	 */
	function communityList(){
		var obj = new sop.portal.communityList.api();
		obj.onBlockUIPopup();
		obj.addParam("type", "all");
		obj.addParam("page_num", currentPageIndex);
		obj.addParam("pageSize", pageSize);
		obj.addParam("bnd_year", bndYear);
		if(last_cmmnty_map_id!=null){
			obj.addParam("last_cmmnty_map_id", last_cmmnty_map_id);
		}
		if($communityMapCommon.hasText(search_word)){
			obj.addParam("search_word", search_word);
		}
		obj.addParam("first_sort", firstSort);
		secondSort=$("#community-second-sort").val();
		obj.addParam("second_sort", secondSort);
		if($communityMapCommon.hasText($communityMapCommon.getParameter("sido_cd"))){
			obj.addParam("sido_cd", $communityMapCommon.getParameter("sido_cd"));
			if($communityMapCommon.hasText($communityMapCommon.getParameter("sgg_cd"))){
				obj.addParam("sgg_cd", $communityMapCommon.getParameter("sgg_cd"));
				if($communityMapCommon.hasText($communityMapCommon.getParameter("emdong_cd"))){
					obj.addParam("emdong_cd", $communityMapCommon.getParameter("emdong_cd"));
				}
			}
		}
		if($communityMapCommon.hasText(tags)){
			obj.addParam("tags", $communityMapCommon.getParameter("tags"));
		}
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/community/communityList.json"
		});
	}
	$communityIntro.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 1. 12. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			if($communityMapCommon.hasText($communityMapCommon.getParameter("tags"))){
				tags = $communityMapCommon.getParameter("tags");
			}
			communityList();
			hotCommunityList();
			newCommunityList();
			noticeList();
			$("#list-more-button").click(function(){
				communityList();
				return false;
			});
			$("#community-search-form").submit(function(){
				currentPageIndex = 1;
				search_word = $("#community_search_word").val();
				communityList();
				return false;
			});
			$("#community-sort-form").submit(function(){
				currentPageIndex = 1;
				firstSort=$("#community-first-sort").val();
				secondSort=$("#community-second-sort").val();
				communityList();
				return false;
			});
			$("#organ-anonymous-create-community-button").click(function(){
				$communityMapCommon.confirm(
					"알림","로그인 하시겠습니까?",[{
						title : "확인",
						func : function(opt) {
							 window.open("about:blank","_self").close();
						}
					},
					{title : "취소"}   
				]);
			});
		}
	};
	/*********** 공지사항 리스트 시작 **********/
	(function() {
		$class("sop.portal.noticeList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				$("#notice-list").empty();
				if(res.errCd == "0") {
					$.each(res.result.summaryList,function(cnt,node){
						$("#notice-list").append($("<li/>").append($("<a/>",{"href":contextPath+"/view/community/notice/view?post_no="+node.post_no+$communityMapCommon.addQuery(["post_no"]),"text":node.post_title})));
						if(cnt>=5){
							return false;
						}
					});
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
	/*********** 공지사항 리스트 종료 **********/
	/*********** 타입 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.portal.type.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				$("#"+options.type+"-community-list").empty();
				if(res.errCd == "0") {
					if(res.result.summaryList.length>0){
						$.each(res.result.summaryList,function(cnt,node){
							$("#"+options.type+"-community-list").append($("<li/>").append($("<a/>",{"href":"#"}).click(function(){
								apiLogWriteAndMoveUrl("/view/community/view?cmmnty_map_id="+node.cmmnty_map_id+$communityMapCommon.addQuery(),node.cmmnty_map_id+$communityMapCommon.addQuery(),node.cmmnty_map_nm);
								return false;
							}).append($("<span/>",{"text":(cnt+1)}),node.cmmnty_map_nm)));
						});
					}else{
						$("#"+options.type+"-community-list").append($("<li/>").append($("<a/>",{"href":"#"}).click(function(){
							return false;
						}).append("데이터가 존재하지 않습니다")));
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
	/*********** 타입 소통지도 리스트 종료 **********/
	/*********** 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.portal.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(currentPageIndex==1){
					last_cmmnty_map_id = null;
					$("#community-list").empty();
				}
				if(res.errCd == "0") {
					if(res.result.summaryList.length>0){
						last_cmmnty_map_id = res.result.summaryList[res.result.summaryList.length-1].cmmnty_map_id;
						var today = parseInt($communityMapCommon.getToday());
						$.each(res.result.summaryList,function(cnt,node){
							var hot = (node.is_hot=='Y'?$("<img/>",{"src":contextPath+"/img/community/cm_intro_list_hot.png","alt":"Hot소통지도"}):"");
							var newest = (node.is_new=='Y'?$("<img/>",{"src":contextPath+"/img/community/cm_intro_list_new.png","alt":"New소통지도"}):"");
							var isWait = parseInt(node.prid_estbs_start_date.replace(/\./gi,""))>today;
							var communityIcon = "";
							if(node.cmmnty_partcptn_grant_yn=="A"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_intro_icon_all.png","alt":"로그인 없이 모든 웹 사용자 등록 가능","title":"로그인 없이 모든 웹 사용자 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="N"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_intro_icon_login.png","alt":"로그인 후 모든 웹 사용자 등록 가능","title":"로그인 후 모든 웹 사용자 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="Y"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_intro_icon_check.png","alt":"로그인 후 개설자가 승인한 사용자만 등록 가능","title":"로그인 후 개설자가 승인한 사용자만 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="P"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_intro_icon_pw.png","alt":"로그인 없이 개설자가 공유한 비밀번호로만 등록 가능","title":"로그인 없이 개설자가 공유한 비밀번호로만 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="M"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_intro_icon_onetime.png","alt":"로그인 없이 개설자가 등록한 아이디로만 등록 가능","title":"로그인 없이 개설자가 등록한 아이디로만 등록 가능"})
							}
						
							var type = $("<span/>",{"class":"Type"});
							if(node.temp_save_yn=="Y"){
								type.append($("<img/>",{"src":contextPath+"/img/community/cm_intro_list_temp.png","alt":"임시소통지도"}));
							}else if(isWait){
								type.append($("<img/>",{"src":contextPath+"/img/community/cm_intro_list_wait.png","alt":"대기소통지도"}));
							}else{
								type.append(hot,newest,communityIcon);
							}
							$("#community-list").append(
								$("<div/>",{"class":"sum"}).append(
									type,
									$("<span/>",{"class":"TitleImg","style":"background-image:url("+(node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm)+");cursor: pointer;"}).click(function(){
										apiLogWriteAndMoveUrl("/view/community/"+(node.temp_save_yn=='N'?'view':'form')+"?cmmnty_map_id="+node.cmmnty_map_id+$communityMapCommon.addQuery(),node.cmmnty_map_id+$communityMapCommon.addQuery(),node.cmmnty_map_nm);
										return false;
									}),
									$("<span/>",{"class":"Name"}).append($("<strong/>",{"text":node.usr_id})," - ",node.reg_date),
									$("<h3/>",{"text":node.cmmnty_map_nm}),
									$("<p/>",{"text":node.intrcn}),
									$("<div/>",{"class":"ListInfo"}).append(
										$("<span/>",{"class":"member","text":node.join_cnt+"명"}),
										$("<span/>",{"class":"reply","text":node.poi_cnt+"건"}),
										$("<a/>",{"class":"more","href":"#","text":"더보기"}).click(function(){
											apiLogWriteAndMoveUrl("/view/community/"+(node.temp_save_yn=='N'?'view':'form')+"?cmmnty_map_id="+node.cmmnty_map_id+$communityMapCommon.addQuery(),node.cmmnty_map_id+$communityMapCommon.addQuery(),node.cmmnty_map_nm);
											return false;
										})
									)
								)
							);
						});
						$("#community-list .Type>img[title]").tooltip({position: {my: "left0 top-8", at: "right top"}});
						var totalPage = Math.ceil(res.result.total_count/pageSize);
						$("#list-more-button").text("더보기 ("+currentPageIndex+"/"+totalPage+")");
						if(currentPageIndex==totalPage){
							$("#list-more-button").hide();
						}else{
							$("#list-more-button").show();
						}
						currentPageIndex++;
					}else{
						var emptyText;
						if($communityMapCommon.hasText(search_word)){
							emptyText = "검색결과가 존재하지 않습니다";
						}else{
							emptyText = "데이터가 존재하지 않습니다";
						}
						$("#community-list").empty().append($("<div/>",{"class":"sum","style":"width:100%;"}).append($("<div/>",{"class":"NoneResult","text":emptyText})));
						$("#list-more-button").hide();
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
	/*********** 소통지도 리스트 종료 **********/
	function apiLogWriteAndMoveUrl(url, api_id, tit){
		apiLogWrite2("K0", api_id, tit, "없음" , "00", "전국");
		location.href = contextPath + url;
	}
}(window, document));
