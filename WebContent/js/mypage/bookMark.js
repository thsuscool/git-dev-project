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

	W.$bookmarkList = W.$bookmarkList || {};
	
	$(document).ready(function() {			
		$("#memberModifyDlg").dialog("close");
		//bookmarkList.statiscsInfo();		

	});	
	bookmarkList = {
		currentPageIndex : 1,			// 현재 페이지 인덱스	
		
		// 게시판 목록 페이징 처리
		myPagePaging : function (totalCount, currentIndex) {
			console.log(currentIndex);
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
						bookmarkList.currentPageIndex = page;
						bookmarkList.statiscsInfo();
					}
				});	
			}else {
				$('#mypage_lists_paging .pages').html("");
			}					
		},
		
		/*********** 통계조회 히스토리 조회**********/
		statiscsInfo: function () {						
			var sopPortalMemeberObj = new sop.portal.statiscsInfoList.api();			
			sopPortalMemeberObj.addParam("page_num", bookmarkList.currentPageIndex);
			sopPortalMemeberObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/member/StatisticsHistory.json"
			});						
		},					
	
		/*********** 회원탈퇴 Start **********/
		memberInfoDelete: function () {
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
			
		},
		
		/*********** 통계히스토리 삭제 Start **********/
		confirmDelete : function(hist_id) {
			messageConfirm.open(
	    			 "알림", 
	    			 "해당 통계히스토리 정보를 삭제 하시겠습니까?",
	    			 btns = [
						{
						    title : "삭제",
						    fAgm : hist_id,
						    disable : false,
						    func : function(opt) {
						    	var sopPortalDeleteHistoryObj = new sop.portal.deleteStatiscsInfo.api();			
						    	sopPortalDeleteHistoryObj.addParam("hist_id", opt);
						    	sopPortalDeleteHistoryObj.request({
									method : "POST",
									async : false,
									url : contextPath + "/ServiceAPI/member/StatisticsHistoryDelete.json"
								});					
						    }
						 },
						 
	    			     {
						   title : "취소",
						   fAgm : hist_id,
						   disable : false,
						   func : function(opt) {
						   }
	    			     }   
	    			     
	    			 ]
	    	);
		}
		
		
	};	
	
	/*********** 통계조회 히스토리 Start **********/
	(function() {		
		$class("sop.portal.statiscsInfoList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {				
				if(res.errCd == "0") {					
					var result = res.result;									
					mReceiveLists = result.historyList;
						var html = "";
						for(var i = 0; i < result.historyList.length; i ++) {							
							var listItem = result.historyList[i];						
							var hist_nm = listItem.hist_nm;
							var map_type =listItem.map_type;
							var hist_id = listItem.hist_id;
							var reg_ts = listItem.reg_ts.split(".");	
							var data = listItem.reg_ts.split("-");
							var day = data[2].split(" ");							
							var time =  reg_ts[0].split(" ");
							var ts = data[0]+"년 "+data[1]+"월 "+day[0]+"일" +" "+time[1];
							
							var linkUrl = getBookmarkURL(listItem.map_type);
								
							html += "<li>";
							html += "<div style='width:80%;float:left;' onclick=\"statiscsInfoListLink('" + hist_id + "', '"+linkUrl+"');\" style='cursor:pointer;'>";
							html += 	"<div class='mpLink' style='cursor:pointer; width:80%;height:40px;font-weight:bold;'>";
							html +=			"<a>"+hist_nm+"</a>";
							html += 	"</div>";
							html +=		"<div class='mpEtc'>";
							html +=			"<a href='javascript:void(0)'>"+ts+"</a>";
							html +=		"</div>";	
							html +=	"</div>";
							
							html += "<div class='mpSpan' style='width:20%;float:right;'>";
							html += 	"<div class='ar'>";
							html +=			"<a onclick=\"javascript:bookmarkList.confirmDelete('" + hist_id + "');\" class='spbox type02'>삭제</a>";
							html +=		"</div>";
							html +=	"</div>";		
							html += "</li>";
						}			
						
						bookmarkList.myPagePaging(result.total_count, bookmarkList.currentPageIndex);
						$(".mpSearchList").html(html);																							
				} else {
					messageAlert.open("알림",res.errMsg);
				}
			},						
			onFail : function(status) {
			}
		});
	}());
	
	/*********** 통계히스토리정보 삭제 Start **********/
	(function() {		
	    $class("sop.portal.deleteStatiscsInfo.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	        	if(res.errCd == "0") {
	        		bookmarkList.currentPageIndex = 1;
	        		bookmarkList.statiscsInfo();
				} else {
					messageAlert.open("알림", res.errMsg);
				}
	        },
	        onFail : function(status) {
	        }
	    });
	}());
}(window, document));

/***********  통계조회 히스토리 조회 링크 **********/
function statiscsInfoListLink(str, linkUrl) {	
	window.location.href = linkUrl+"id=" + str;
};

function getSession(auth) {
	bookmarkList.statiscsInfo();	
};
	