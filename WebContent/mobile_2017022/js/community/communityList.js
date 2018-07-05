(function(W, D) {
	W.$communityList = W.$communityList || {};
	var doit;
	$sgis.ready(function(){
		$("#hot-community-number a").click(function(){
			var page = $(this).index()+1;
			$communityList.hotCommunity.currentPageIndex = page;
			$communityList.hotCommunity.makeLists(page);
		});
		$("#community-tab a").click(function(){
			$communityList.type = $(this).data("type"); 
			$communityList.list_id = $(this).data("list-id");
			$("#community-tab a").removeClass("M_on");
			$(this).addClass("M_on");
			$(".List div[id$=-community]").hide();
			$("#"+$(this).data("type")+"-community").show();
			$("#community-keyword").val($communityList[$(this).data("type")+"SearchWord"]);
		});
		$("#community-search").submit(function(){
			$communityList[$communityList.type+"CurrentPageIndex"] = 1;
			$communityList[$communityList.type+"SearchWord"] = $("#community-keyword").val();
			$communityList.makeLists();
			return false;
		});
		//개설
		$communityList.type = "open";
		$communityList.makeLists();
		//가입
		$communityList.type = "join";
		$communityList.makeLists();
		//전체
		$communityList.type = "all";
		$communityList.makeLists();
		//핫 소통지도
		$communityList.hotCommunity.makeLists();
		$communityList.hotCommunity.loof();
	});
	$communityList = {
		//소통지도 리스트
		allCurrentPageIndex : 1, // 전체 현재 페이지 인덱스
		openCurrentPageIndex : 1, // 개설 현재 페이지 인덱스
		joinCurrentPageIndex : 1, // 가입 현재 페이지 인덱스
		allSearchWord : null, //검색
		openSearchWord : null, //검색
		joinSearchWord : null, //검색
		pageSize : 3,//페이지 사이즈
		type : "all",
		list_id : "1",
		// 소통지도목록 전체 생성
		makeLists: function() {
			var sopPortalCommunityObj = new sop.portal.community.api();
			sopPortalCommunityObj.addParam("page_num", this[this.type+"CurrentPageIndex"]);
			sopPortalCommunityObj.addParam("type", this.type);
			sopPortalCommunityObj.addParam("pageSize", this.pageSize);
			sopPortalCommunityObj.addParam("bnd_year", bndYear);
			if(this[this.type+"SearchWord"]&&this[this.type+"SearchWord"].length>0){
				sopPortalCommunityObj.addParam("search_word", this[this.type+"SearchWord"]);
			}
			sopPortalCommunityObj.request({
				method: "POST",
				async: false,
				url: contextPath + "/ServiceAPI/community/communityList.json",
				options: {
					type: this.type
				}
			});
		},
		communityListItem : function(node,img_id){
			var html="";
			html+='	<dt>';
//			html+='		<a href="/mobile/html/community/mapPrtcpntRegistResult.html?cmmnty_map_id='+node.cmmnty_map_id+'">'+node.cmmnty_map_nm+'</a>';
			html+="<a onclick=\"javascript:apiLogWriteAndMoveUrl('";
			html+= contextPath+'/mobile/html/community/mapPrtcpntRegistResult.html?cmmnty_map_id='+node.cmmnty_map_id;
			html+= "','" + node.cmmnty_map_id+ "','" + node.cmmnty_map_nm;
			html+= "')\" style=\"cursor: pointer;\">"+node.cmmnty_map_nm+"</a>";
			if(node.approvalText){
				html+=node.approvalText;
			}
			html+='	</dt>';
			html+='	<dd class="InfoMember">';
			html+='		<p class="subtitle">'+(node.intrcn?node.intrcn:'&nbsp;')+'</p>';
			html+='		<p class="Info"> ';
			html+='			<span class="InfoBasic">개설자:'+node.usr_id+' | 개설일:'+node.reg_date+'</span>';
			html+='			<span class="Member"><strong>참여인원</strong> '+node.join_cnt+' 명</span>';
			html+='			<span class="Count"><strong>게시글</strong> '+node.poi_cnt+' 건</span>';
			html+='		</p>';
			html+='	</dd>';
			html+='	<dd '+(img_id?'id="'+img_id+'"':'')+' class="Image" style="background-image:url('+contextPath+'/mobile/img/community/img_no.png);">'+node.cmmnty_map_nm+' 대표이미지';
			html+=' </dd>';
			return html;				
		},
		
		
		hotCommunity : {
			doit : null,
			/**
			 * @name         : $communityList.hotCommunity.loof
			 * @description  : 핫 소통지도 루프
			 * @date         : 2016. 01. 17.
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			loof: function(){
				clearTimeout(this.doit);
				this.doit = setTimeout(function(){
					if($("#hot-community-number>a.M_on").is("#hot-community-number>a:last")){
						$("#hot-community-number>a").removeClass("M_on");
						$("#hot-community>dl").removeClass("M_on").hide();
						$("#hot-community-number>a:eq(0),#hot-community>dl:eq(0)").addClass("M_on").show();
					}else{
						$communityList.hotCommunity.slider("next");
					}
					$communityList.hotCommunity.loof();
				}, 5000);
			},
			/**
			 * @name         : $communityList.hotCommunity.slider
			 * @description  : 핫 소통지도 슬라이드
			 * @date         : 2016. 01. 17.
			 * @author	     : 나광흠
			 * @history 	 :
			 * @param type   : type
			 * @param clear  : clearTimeout 유무
			 */
			slider: function(type,clear){
				var item = $("#hot-community>dl.M_on")[type]();
				if(item.length>0){
					$("#hot-community-number>a").removeClass("M_on");
					$("#hot-community>dl").removeClass("M_on").hide();
					item.addClass("M_on").show();
					$("#hot-community-number>a:eq("+item.index()+")").addClass("M_on");
				}
				if(clear){
					clearTimeout(this.doit);
					this.loof();
				}
			},
			makeLists: function() {
				var obj = new sop.portal.communityHot.api();
				obj.addParam("type", "hot");
				obj.addParam("bnd_year", bndYear);
				obj.request({
					method: "POST",
					async: false,
					url: contextPath + "/ServiceAPI/community/communityList.json",
					options: {
						type: this.type
					}
				});
			}
		}
	};
	/*********** 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.portal.community.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var tableName = options.type+"-community-list";
					$("#"+options.type+"-count").text(res.result.total_count);
					$("#"+tableName).empty();
					if(res.result.total_count>0){
						$.each(res.result.summaryList,function(cnt,node){
							var approvalText = "";
							if(node.cmmnty_partcptn_grant_yn=="Y"){
								if(node.approval_distinct){
									if(node.approval_distinct=='WA'){
										approvalText = "<img src='/img/community/icon_approve_standby.png' alt='승인대기'>";
									}else if(node.approval_distinct=='A'){//승인
										approvalText = "<img src='/img/community/icon_approve_finish.png' alt='승인완료'>";
									}else if(node.approval_distinct=='D'){//탈퇴
										approvalText = "<img src='/img/community/icon_approve_return.png' alt='승인반려'>";
									}
									node.approvalText = approvalText;
								}
								$("#"+tableName).append("<dl class='lock'>"+$communityList.communityListItem(node,tableName+"-photo-"+cnt)+"</dl>")
							}else{
								$("#"+tableName).append("<dl>"+$communityList.communityListItem(node,tableName+"-photo-"+cnt)+"</dl>")
							}
							$("<img/>",{src:contextPath+node.path_nm+node.save_file_nm}).load(function(){
								$("#"+tableName+"-photo-"+cnt).css({"background-image":"url("+contextPath+node.path_nm+node.save_file_nm+")"});
							});
						});	
					}else{
						
						var emptyText = "등록된 소통지도가 없습니다.";
						if(options.type=="open"){
							emptyText = "개설한 소통지도가 존재하지 않습니다";
						}else if(options.type=="join"){
							emptyText = "가입한 소통지도가 존재하지 않습니다";
						}
						$("#"+tableName).append('<dl><dd style="padding-left:0px;"><a class="NoData">'+emptyText+'</a></dd></dl>');
					}
					$sgisMobile.ui.createPaging(tableName, res.result.total_count, $communityList, options.type+"CurrentPageIndex");
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 소통지도 리스트 끝 **********/
	/*********** 핫 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.portal.communityHot.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				$("#hot-community-number,#hot-community").empty();
				if (res.errCd == "0") {
					if(res.result.summaryList.length>0){
						$.each(res.result.summaryList,function(cnt,node){
							$("#hot-community").append(
								'<dl '+(cnt==0?'class="M_on"':'style="display:none;"')+'>'+
								'	<dt><a href="/mobile/html/community/mapPrtcpntRegistResult.html?cmmnty_map_id='+node.cmmnty_map_id+'">'+node.cmmnty_map_nm+'</a></dt>'+
								'	<dd>'+
								'		<p class="subtitle">'+(node.intrcn?node.intrcn:'&nbsp;')+'</p>'+
								'		<p class="Info">'+
								'			<span class="InfoBasic">개설자: '+node.usr_id+'  |  개설일: '+node.reg_date+'</span>'+
								'			<span class="Member"><strong>참여인원</strong> '+node.join_cnt+' 명</span>'+
								'			<span class="Count"><strong>게시글</strong> '+node.poi_cnt+' 건</span>'+
								'		</p>'+
								'	</dd>'+
								'	<dd id="hot-community-photo" class="Image" style="background-image:url('+contextPath+node.path_nm+node.save_file_nm+');">'+node.cmmnty_map_nm+' 대표이미지</dd>'+
								'</dl>'
							);
							$("#hot-community-number").append($("<a/>",{"class":(cnt==0?'M_on':''),"text":(cnt+1)}).click(function(){
								clearTimeout($communityList.hotCommunity.doit);
								$communityList.hotCommunity.loof();
								$("#hot-community-number a").removeClass("M_on");
								$("#hot-community dl").removeClass("M_on").hide();
								$("#hot-community dl:eq("+$(this).index()+")").show().addClass("M_on");
								$(this).addClass("M_on");
							}));
						});
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** 핫 소통지도 리스트 끝 **********/
}(window, document));

function apiLogWriteAndMoveUrl(url, api_id, title){
	apiLogWrite2("K1", api_id, title, "없음" , "00", "전국");
	location.href = url;
}