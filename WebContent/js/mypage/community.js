/**
 * mypage 커뮤니티 리스트 조회 메소드
 * 
 * history : (주)유코아시스템, 1.0, 2016/07/27  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$(document).ready(function(){
		$community.event.setUIEvent();
	});
	W.$community = W.$community || {};
	$community = {
		currentPageIndex : 1,			// 현재 페이지 인덱스	
		
		// 게시판 목록 페이징 처리
		myPagePaging : function (totalCount, currentIndex) {
			var pageSize = 5;										// 페이지 당 항목 개수
			var totalPage = Math.ceil( totalCount / pageSize);		// 전체 페이지 수
			if(totalPage > 1){
				$('#mypage_lists_paging .pages').paging({
					current : currentIndex,
					max : totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick : function(e,page){							// 페이지 선택 시
						$community.currentPageIndex = page;
						$community.getList();
					}
				});	
			}else {
				$('#mypage_lists_paging .pages').html("");
			}					
		},
		getList : function(){
			var obj = new sop.portal.communityList.api();
			obj.addParam("type", "join");
			obj.addParam("page_num", $community.currentPageIndex);
			obj.addParam("bnd_year", bndYear);
			obj.request({
				method : "POST",				
				async : true,
				url : contextPath + "/ServiceAPI/community/communityList.json"
			});
		}
	};
	
	$community.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 7. 27. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			$community.getList();
		}
	};
	
	/*********** 커뮤니티 리스트 시작 **********/
	(function() {
		$class("sop.portal.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$(".mpSearchList").empty();
					var result = res.result;									
					var html = "";
					$.each(res.result.summaryList,function(cnt,node){
						var date = node.reg_date.split(".");
						var dropBtn;
						if(node.is_master=="Y"){
							dropBtn = $("<div/>",{"style":"width:20%;float:right;"}).append(
								$("<div/>",{"class":"ar"}).append($("<a/>",{"href":"#","text":"폐쇄","class":"spbox type02"}).click(function(){
									messageConfirm.open(
										"알림","폐쇄 하시겠습니까?",[{
											title : "확인",
											fAgm : null,
											disable : false,
											func : function(opt) {
												var obj = new sop.portal.closeCommunity.api();
												obj.addParam("cmmnty_map_id", node.cmmnty_map_id);
												obj.request({
													method : "POST",				
													async : true,
													url : contextPath + "/ServiceAPI/community/communityClose.json"
												});
											}
										},{
											title : "취소"
										}   
									]);
								}))
							)
						}
						$(".mpSearchList").append(
							$("<li/>").append(
								$("<div/>",{"style":"width:80%;float:left;"}).append(
									$("<div/>",{"class":"mpLink","style":"cursor:pointer; width:80%;height:40px;font-weight:bold;"}).append($("<a/>",{"text":node.cmmnty_map_nm})),
									$("<div/>",{"class":"mpEtc"}).append($("<a/>",{"text":date[0]+"년 "+date[1]+"월 "+date[2]+"일"}))
								).click(function(){
									location.href = contextPath+"/view/community/view?cmmnty_map_id="+node.cmmnty_map_id;
								}),
								dropBtn
							)
						);
					});
					$community.myPagePaging(result.total_count, $community.currentPageIndex);
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 커뮤니티 리스트 종료 **********/
	/*********** 폐쇄 시작 **********/
	(function() {
		$class("sop.portal.closeCommunity.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == "0") {
					if(res.result.success){
						$community.getList();
						messageAlert.open("알림", "폐쇄되었습니다");
					}else{
						messageAlert.open("알림", "실패하였습니다");
					}
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			}, 
			onFail : function(status) {
			}
		});
	}());
	/*********** 폐쇄 종료 **********/
}(window, document));
	