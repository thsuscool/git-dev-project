(function(W, D) {
	W.$communityDetail = W.$communityDetail || {};
	$sgis.ready(function(){
		hasCommunity(function(community){
			$communityDetail.communityInfo = community;
			$communityDetail.cmmnityMainList(community);
			$communityDetail.poiList.type="my";
			$communityDetail.poiList.makeLists();
			$communityDetail.poiList.type="all";
			$communityDetail.poiList.makeLists();
			$("#community-tab a").click(function(){
				$("#community-tab a").removeClass("M_on");
				$(this).addClass("M_on");
				$communityDetail.poiList.type=$(this).data("type");
				$("div[id$=-community]").hide();
				$("#"+$(this).data("type")+"-community").show();
				$("#community-keyword").val($communityDetail.poiList[$(this).data("type")+"SearchWord"]);
				return false;
			});
			$("#community-search").submit(function(){
				$communityDetail.poiList[$communityDetail.poiList.type+"CurrentPageIndex"] = 1;
				$communityDetail.poiList[$communityDetail.poiList.type+"SearchWord"] = $("#community-keyword").val();
				$communityDetail.poiList.makeLists();
				return false;
			});
		});
	});
	function addParam(obj,name,value){
		if(value!=null&&value!=undefined){
			obj.addParam(name,value);
		}
	}
	$communityDetail = {
		//개설된 소통지도 목록 조회	
		cmmnityMainList: function(res) {
			$("#community-info").empty();
			if (res.errCd == "0") {
				if(res.result.summary){
					var loginGo = function(){
						messageConfirm.open(
							"알림", 
							"로그인 후 사용하실 수 있습니다<br>로그인페이지로 이동하시겠습니까?",
							btns = [{
								title : "이동하기",
								fAgm : null,
								disable : false,
								func : function(opt) {
									location.href=contextPath+"/mobile/html/member/login.html?returnPage="+encodeURIComponent("/mobile/html/community/mapPrtcpntRegistResult.html?cmmnty_map_id="+getParameter("cmmnty_map_id"))
									return false;
								}
							},
							{
								title : "취소하기",
								fAgm : null,
								disable : false,
								func : function(opt) {}
							}]
						);
					};
					var result = res.result.summary;
					var join = false;
					var joinBtn = '<button class="btn_insert" id="btn_insert" type="button">소통지도 참여하기</button>';
					if (result.regist_yn == "Y" || result.regist_yn =="W"||/M|P|A/.test($communityDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)) {
						join = true;
						joinBtn = '<button class="btn_register" id="btn_register" type="button">의견 등록하기</button>';
					}
					var shareUrl = encodeURIComponent(location.href);
					$("#community-info").html(
							'<h3>'+result.cmmnty_map_nm+'</h3>'+
							'<p class="subtitle">'+(result.intrcn?result.intrcn:'&nbsp;')+'</p>'+
							'<p class="detail">'+
							'	개설자: '+result.usr_id+' | 개설일: '+result.reg_date+
							'	<br> 참여인원: '+result.join_cnt+'명'+
							'</p>'+
							'<span id="community-info-photo" class="Image" style="background-image:url('+contextPath+"/mobile/img/community/img_no.png"+');">이미지</span>'+
							'<span class="Social">'+
							'	<a href="https://www.facebook.com/sharer/sharer.php?u='+shareUrl+'" class="sns_fb" target="_BLANK">페이스북</a>'+
							'	<a href="https://twitter.com/intent/tweet?text='+encodeURIComponent(result.intrcn)+'&url='+shareUrl+'" class="sns_tw" target="_BLANK">트위터</a>'+
							'</span>'+
							joinBtn
					);
					$("<img/>",{src:contextPath+result.path_nm+result.save_file_nm}).load(function(){
						$("#community-info-photo").css({"background-image":"url("+contextPath+result.path_nm+result.save_file_nm+")"});
					});
					if(join){
						if(result.cmmnty_partcptn_grant_yn=="N"||result.cmmnty_partcptn_grant_yn=="M"||result.cmmnty_partcptn_grant_yn=="P"){
							$("#user-drop").parent(".Btn_Group").remove();
						}else{
							$("#user-drop").parent(".Btn_Group").show();
							$("#user-drop").off("click").click(function(){
								messageConfirm.open(
										"알림", 
										'<span class="community_name">'+result.cmmnty_map_nm+'</span><br/>소통지도에 탈퇴 하시겠습니까?',
										btns = [{
											title : "탈퇴하기",
											fAgm : null,
											disable : false,
											func : function(opt) {
												$communityDetail.regLockPrtcpnt();
												return false;
											}
										},
										{
											title : "취소하기",
											fAgm : null,
											disable : false,
											func : function(opt) {}
										}]
								);
							});
						}
						$("#btn_register").off().click(function() {
							if(AuthInfo.authStatus||/M|P|A/.test($communityDetail.communityInfo.result.summary.cmmnty_partcptn_grant_yn)){
								if (result.regist_yn=="W") {
									messageAlert.open("알림", "현재 승인 대기중입니다.");
									return false;
								}else{
									var mapCenter=$interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].gMap.getCenter();
									var backCenter = "&center="+(encodeURIComponent(mapCenter.x+","+mapCenter.y));
									location.href=contextPath+"/mobile/html/community/mapPrtcpntRegistForm.html?cmmnty_map_id="+getParameter("cmmnty_map_id")+backCenter;
								}
							}else{
								loginGo();
							}
						});
					}else{
						$("#user-drop").parent(".Btn_Group").remove();
						$("#btn_insert").off("click").click(function() {
							if(AuthInfo.authStatus){
								messageConfirm.open(
										"알림", 
										'<span class="community_name">'+result.cmmnty_map_nm+'</span><br/>소통지도에 참여하시겠습니까?',
										btns = [{
											title : "참여하기",
											fAgm : null,
											disable : false,
											func : function(opt) {
												$communityDetail.regPersonlPrtcpnt();
												return false;
											}
										},
										{
											title : "취소하기",
											fAgm : null,
											disable : false,
											func : function(opt) {}
										}]
								);
							}else{
								loginGo();
							}
						});
					}
					$interactiveMap.ui.mapResize();
				}
			}else{
				messageAlert.open("알림", "존재하지 않는 페이지입니다",function done(){
					location.href=contextPath+"/mobile/html/community/intro.html";
				});
			}
		},
		//소통지도에 등록된 자료 리스트
		poiList :{
			allCurrentPageIndex : 1,// 전체 현재 페이지 인덱스
			myCurrentPageIndex : 1,// 나의 등록자료 현재 페이지 인덱스
			allSearchWord: "", //검색어
			mySearchWord: "", //검색어
			pageSize : 3,//페이지 사이즈
			periodDateStart: null, //기간검색 시작일자
			periodDateEnd: null, //기간검색 종료일자
			type:"all",
			makeLists: function() {
				var obj = new sop.portal.communityPoiList.api();
				obj.addParam("page_num", this[this.type+"CurrentPageIndex"]);
				addParam(obj,"prid_estbs_start_date",this.periodDateStart);
				addParam(obj,"prid_estbs_end_date",this.periodDateEnd);
				if(this[this.type+"SearchWord"]&&this[this.type+"SearchWord"].length>0){
					addParam(obj,"search_word",this[this.type+"SearchWord"]);
				}
				obj.addParam("type", this.type);
				obj.addParam("pageSize", this.pageSize);
				obj.addParam("cmmnty_map_id", getParameter("cmmnty_map_id"));
				obj.request({
					method: "POST",
					async: false,
					url: contextPath + "/ServiceAPI/community/communityPoiList.json",
					options: {
						type: this.type
					}
				});
			}
		},
		//참여등록하기
		regPersonlPrtcpnt: function() {
			var obj = new sop.portal.RegPersonPrtcpnt.api();
			obj.addParam("cmmnty_map_id", getParameter("cmmnty_map_id"));
			obj.request({
				method: "POST",
				async: false,
				url: contextPath + "/ServiceAPI/community/communityMemberApprovalRegist.json"
			});
		},
		//탈퇴하기
		regLockPrtcpnt: function() {
			var sopPortalNoticeObj = new sop.portal.RegLockPrtcpnt.api();
			sopPortalNoticeObj.addParam("cmmnty_map_id", getParameter("cmmnty_map_id"));
			sopPortalNoticeObj.request({
				method: "POST",
				async: false,
				url: contextPath + "/ServiceAPI/community/communityMemberApprovalOut.json"
			});
		}
	};
	/*********** 소통지도 poi 검색 시작 **********/
	(function() {
		$class("sop.portal.communityPoiList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {				
				if (res.errCd == "0") {
					if (res.errCd == "0") {
						var tableName = options.type+"-poi-list";
						$("#"+tableName).empty();
						var count = res.result.total_count;
						$("#"+options.type+"-poi-count").text(count);
						if(count>0){
							$.each(res.result.summaryList,function(cnt,node){
								var symbol,backgroundsize="";
								if(node.reg_symbol){
									symbol = '/img/community/iconset_'+node.reg_symbol+node.symbol+'.png';
								}else{
									symbol = node.symbol_path;
									backgroundsize="background-size:23px 28px;";
								}
								$("#"+tableName).append(
									$("<li/>").append(
										$("<a/>",{"href":"#","style":'background-image:url('+contextPath+symbol+');'+backgroundsize}).click(function(){
											var map = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
											map.mapMove([node.x_loc,node.y_loc],map.gMap.getZoom());
											$interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].gMap.closeInfoWindow();
											$communityRegistResult.markersObject[node.cmmnty_poi_id].fire("click");
											return false;
										}).append(
											$("<span/>",{"class":"title","text":node.title}),
											$("<span/>",{"class":"position","text":node.reg_lc}),
											$("<span/>",{"class":"date","text":node.reg_date}),
											$("<span/>",{"class":"comment","text":"댓글 "+node.reply_cnt})
										)
									)	
								);
							});
						}else{
							$("#"+tableName).append('<li><a class="NoData">등록된 자료가 존재하지 않습니다.</a></li>');
						}
						$sgisMobile.ui.createPaging(tableName, count, $communityDetail.poiList, options.type+"CurrentPageIndex");
					} else {
						messageAlert.open("알림", res.errMsg);
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 소통지도 poi 끝 **********/
	/*********** 참여자 등록하기 시작 **********/
	(function() {
		$class("sop.portal.RegPersonPrtcpnt.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if(res.errCd == "0") {
					if(res.result.success){
						messageAlert.open("알림", "가입 승인요청 되었습니다.",function done(){
							location.reload(true);
						});
					}else{
						messageAlert.open("알림", "실패하였습니다");
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}	
			},
			onFail: function(status) {}
		});
	}());
	/*********** 참여자 등록하기 끝    **********/
	/*********** 탈퇴 등록하기 시작 **********/
	(function() {
		$class("sop.portal.RegLockPrtcpnt.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if(res.errCd == "0") {
					if(res.result.success){
						messageAlert.open("알림", "탈퇴 신청이 되었습니다",function done(){
							location.reload(true);
						});
					}else{
						messageAlert.open("알림", "실패하였습니다");
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}	
			},
			onFail: function(status) {}
		});
	}());

	/*********** 탈퇴 등록하기 끝 **********/
}(window, document));