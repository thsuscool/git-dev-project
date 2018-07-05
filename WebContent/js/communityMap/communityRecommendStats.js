(function(W, D) {
	$(document).ready(function(){
		$communityRecommendStats.event.setUIEvent();
	});
	W.$communityRecommendStats = W.$communityRecommendStats || {};
	var currentPageIndex = 1,pageSize = 6,search_word = null,search_type = null,recommend_community = null;
	/**
	 * @name           : communityList
	 * @description    : 소통지도 리스트
	 * @date           : 2017. 03. 15.
	 * @author	       : 나광흠
	 * @history 	   :
	 */
	function communityList(){
		var obj = new sop.portal.recommend.communityList.api();
		obj.onBlockUIPopup();
		obj.addParam("type", "all");
		obj.addParam("page_num", currentPageIndex);
		obj.addParam("pageSize", pageSize);
		obj.addParam("bnd_year", bndYear);
		if($communityMapCommon.hasText(search_type)){
			obj.addParam("search_type", search_type);
		}
		if($communityMapCommon.hasText(search_word)){
			obj.addParam("search_word", search_word);
		}
		if($communityMapCommon.hasText($communityMapCommon.getParameter("sido_cd"))){
			obj.addParam("sido_cd", $communityMapCommon.getParameter("sido_cd"));
			if($communityMapCommon.hasText($communityMapCommon.getParameter("sgg_cd"))){
				obj.addParam("sgg_cd", $communityMapCommon.getParameter("sgg_cd"));
				if($communityMapCommon.hasText($communityMapCommon.getParameter("emdong_cd"))){
					obj.addParam("emdong_cd", $communityMapCommon.getParameter("emdong_cd"));
				}
			}
		}
		if($communityMapCommon.hasText($communityMapCommon.getParameter("tags"))){
			obj.addParam("tags", $communityMapCommon.getParameter("tags"));
		}
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/community/communityList.json"
		});
	}
	function recommendList(cmmnty_map_id){
		var obj = new sop.portal.recommend.recommendList.api();
		obj.onBlockUIPopup();
		obj.addParam("cmmnty_map_id", cmmnty_map_id);
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/community/communityRecommendStatsList.json"
		});
	}
	$communityRecommendStats.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2017. 3. 15. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			communityList();
			$("#recommend-reset").click(function(){
				recommendList(recommend_community.cmmnty_map_id);
			});
			$("#bookmark-all,#recommend-all").change(function(){
				$(this).parents("table").find("tbody input:not(:disabled)").prop("checked",$(this).is(":checked"));
			});
			$("#recommend-add,#recommend-delete").click(function(){
				$("#bookmark-all,#recommend-all").prop("checked",false);
				var selector,target;
				if($(this).attr("id")=="recommend-add"){
					selector = "recommend-stats-bookmark-list";
					target = "recommend-stats-bookmark-map-list";
				}else{
					selector = "recommend-stats-bookmark-map-list";
					target = "recommend-stats-bookmark-list";
				}
				var checkbox = $("#"+selector+" input:checked");
				checkbox.parents("tr").appendTo($("#"+target));
				checkbox.prop("checked",false);
				checkbox.parents("tr").css("background-color","#eee").animate({backgroundColor: "#fff"}, "slow");
				$("#"+target).parents(".setList").scrollTop($("#"+target).height());
			});
			$("#recommend-submit").click(function(){
				if($communityMapCommon.hasText(recommend_community)&&$.isNumeric(recommend_community.cmmnty_map_id)){
					var obj = new sop.portal.recommend.submit.api();
					obj.onBlockUIPopup();
					obj.addParam("cmmnty_map_id", recommend_community.cmmnty_map_id);
					if($("#recommend-stats-bookmark-map-list input:checkbox:not(:disabled)").length>0){
						obj.addParam("list", $("#recommend-stats-bookmark-map-list input:checkbox:not(:disabled)").map(function(){return this.value;}).get().join());
					}
					obj.request({
						method : "POST",				
						async : true,
						url : contextPath + "/ServiceAPI/community/communityRecommendStatsModify.json"
					});
				}else{
					$communityMapCommon.alert("알림", "잘못된 접근입니다");
				}
			});
			$("#recommend-stats form").submit(function(){
				currentPageIndex = 1;
				search_word = $("#recommend-stats-search-word").val();
				search_type = $("#recommend-stats-search-type").val();
				communityList();
				return false;
			});
			$("#recommend-button").click(function(){
				$("#recommend-stats").show();
				return false;
			});
		}
	};
	/*********** 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.portal.recommend.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$("#recommend-stats-list,#recommend-stats-paging .pages").empty();
					if(res.result.summaryList.length>0){
						$.each(res.result.summaryList,function(cnt,node){
							var communityIcon = "";
							if(node.cmmnty_partcptn_grant_yn=="A"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_detail_icon_all.png","alt":"로그인 없이 모든 웹 사용자 등록 가능","title":"로그인 없이 모든 웹 사용자 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="N"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_detail_icon_login.png","alt":"로그인 후 모든 웹 사용자 등록 가능","title":"로그인 후 모든 웹 사용자 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="Y"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_detail_icon_check.png","alt":"로그인 후 개설자가 승인한 사용자만 등록 가능","title":"로그인 후 개설자가 승인한 사용자만 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="P"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_detail_icon_pw.png","alt":"로그인 없이 개설자가 공유한 비밀번호로만 등록 가능","title":"로그인 없이 개설자가 공유한 비밀번호로만 등록 가능"})
							}else if(node.cmmnty_partcptn_grant_yn=="M"){
								communityIcon = $("<img/>",{"src":contextPath+"/img/community/cm_detail_icon_onetime.png","alt":"로그인 없이 개설자가 등록한 아이디로만 등록 가능","title":"로그인 없이 개설자가 등록한 아이디로만 등록 가능"})
							}
							$("#recommend-stats-list").append($("<tr/>").append(
								$("<td/>",{"scope":"row"}).append(communityIcon),
								$("<td/>").append($("<a/>",{"href":"#","text":node.cmmnty_map_nm}).click(function(){
									recommend_community= node;
									recommendList(node.cmmnty_map_id);
									return false;
								})),
								$("<td/>",{"text":node.usr_id}),
								$("<td/>",{"text":node.reg_date})
							));
						});
						var totalPage = Math.ceil(res.result.total_count / pageSize); // 전체 페이지 수
						if(res.result.total_count > pageSize){
							$("#recommend-stats-paging .pages").paging({
								current : currentPageIndex,
								max : totalPage,
								itemClass : "page",
								itemCurrent : "current",
								format : "{0}",
								next : "&gt;",
								prev : "&lt;",
								first : "&lt;&lt;",
								last : "&gt;&gt;",
								onclick : function(e, page) { // 페이지 선택 시
									currentPageIndex = page;
									communityList();
								}
							});
						}
					}else{
						var emptyText;
						if($communityMapCommon.hasText(search_word)){
							emptyText = "검색결과가 존재하지 않습니다";
						}else{
							emptyText = "데이터가 존재하지 않습니다";
						}
						$("#recommend-stats-list").append($("<tr/>").append(
							$("<td/>",{"scope":"row","colspan":"4"}).append(emptyText)
						));
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
	/*********** 추천통계 리스트 시작 **********/
	(function() {
		$class("sop.portal.recommend.recommendList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$("#bookmark-all,#recommend-all").prop("checked",false);
					$("#recommend-stats-bookmark-name").text(recommend_community.cmmnty_map_nm);
					$("#recommend-stats-bookmark-list,#recommend-stats-bookmark-map-list").empty();
					function setList(id,list,isDisabled){
						$.each(list,function(){
							$("#"+id).append($("<tr/>").append(
								$("<th/>",{"scope":"row"}).append($("<input/>",{"type":"checkbox","id":"recommend-stats-bookmark"+this.list,"value":this.list,"readonly":isDisabled,"disabled":isDisabled})),
								$("<td/>").append($("<label/>",{"for":"recommend-stats-bookmark"+this.list,"text":this.hist_nm}))
							));
						});
					}
					setList("recommend-stats-bookmark-list",res.result.hist,false);
					setList("recommend-stats-bookmark-map-list",res.result.map,true);
					setList("recommend-stats-bookmark-map-list",res.result.recommend,false);
					$(".popup_recommend").hide();
					$("#recommend-stats-bookmark").show();
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
	/*********** 추천통계 리스트 종료 **********/
	/*********** 추천통계 리스트 시작 **********/
	(function() {
		$class("sop.portal.recommend.submit.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$communityMapCommon.confirm(
						"알림","완료되었습니다<br>해당 소통지도로 이동하시겠습니까?",[{
							title : "이동",
							func : function(opt) {
								location.href = contextPath+"/view/community/view?cmmnty_map_id="+recommend_community.cmmnty_map_id+$communityMapCommon.addQuery(); 
							}
						},{title : "취소"}
					]);
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
	/*********** 추천통계 리스트 종료 **********/
}(window, document));
