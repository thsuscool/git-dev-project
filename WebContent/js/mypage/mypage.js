/**
 * mypage 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/10/01  초기 작성
 * author : 이동형
 * version : 1.0
 * see : 
 *
 */
var stat = "3";
(function(W, D) {
	//"use strict";	

	W.$mypageList = W.$mypageList || {};
	
	$(document).ready(function() {			
		$("#memberModifyDlg").dialog("close");
		//mypageList.statiscsInfo();		

	});	
	mypageList = {
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
						mypageList.currentPageIndex = page;
						mypageList.statiscsInfo();
					}
				});	
			}else {
				$('#mypage_lists_paging .pages').html("");
			}					
		},
		
		/*********** 통계조회 히스토리 조회**********/
		statiscsInfo: function () {						
			var sopPortalMemeberObj = new sop.portal.statiscsInfoList.api();			
			sopPortalMemeberObj.addParam("page_num", mypageList.currentPageIndex);
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
						html += "<li>";
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
	
							if(map_type === 'IMAP'){								
								map_type = '인터랙티브 맵';
								html += "<div class='inner'>";
								html += 	"<table style='width:100%'>";
								html += 		"<tr>";
								html += 			"<td class='list' ";							
								html += 				"onclick=\"statiscsInfoListLink('" + hist_id + "', \""+linkUrl+"\");\" style='cursor:pointer; width:80%;'>";								
								html += 				"<p class='date'>" + ts + "</p>";
								html += 				"<p class='mf_history'><img src='/img/um/icon_type_01.gif' alt="+ map_type +" />" + "</p>";		
								if(hist_nm[0] !== undefined){
									html += "<p class='condition'>"+ hist_nm +"</p>";
								}
						/*		if(hist_nm[1] !== undefined){
									html += "<p class='locale'>" +hist_nm[1] + "</p>";
								}	*/							
								//html += "<p class='locale'>" + listItem.hist_type + "</p>";								
								html += 			"</td>";
								html += 			"<td>";
								html += 				"<button class='delete' onclick=\"javascript:mypageList.confirmDelete('" + hist_id + "');\">삭제</button>";
								html += 			"</td>";
								html += 		"</tr>";
								html += 	"</table>";
								html += "</div>";
								html += "</li>";																							
							}else if(map_type === 'CMAP'){								
								map_type = '창업지원 맵';
								html += "<div class='inner'>";
								html += 	"<table style='width:100%'>";
								html += 		"<tr>";
								html += 			"<td class='list' ";																
								html += 					"onclick=\"statiscsInfoListLink('" + hist_id + "');\" style='cursor:pointer;'>";								
								html += 				"<p class='date'>" + ts + "</p>";								
								html += 				"<p class='mf_history'><img src='/img/um/icon_type_02.gif' alt="+ map_type +" />" + "</p>";								
								if(hist_nm[0] !== undefined){
									html += "<p class='condition'>"+ hist_nm +"</p>";
								}
			/*					if(hist_nm[1] !== undefined){
									html += "<p class='locale'>" +hist_nm[1] + "</p>";
								}	*/							
								//html += "<p class='locale'>" + listItem.hist_type + "</p>";								
								html += 			"</td>";
								html += 			"<td>";
								html += 				"<button class='delete' onclick=\"javascript:mypageList.confirmDelete('" + hist_id + "');\">삭제</button>";
								html += 			"</td>";
								html += 		"</tr>";
								html += 	"</table>";
								html += "</div>";
								html += "</li>";										
							}else if(map_type === 'HMAP'){								
//								map_type = '살고싶은 우리동네';
								html += "<div class='inner'>";
								html += 	"<table style='width:100%'>";
								html += 		"<tr>";
								html += 			"<td class='list' ";																
								html += 					"onclick=\"statiscsInfoListLink('" + hist_id + "');\" style='cursor:pointer;'>";								
								html += 				"<p class='date'>" + ts + "</p>";								
//								html += 				"<p class='mf_history'><img src='/img/um/icon_type_02.gif' alt="+ map_type +" />" + "</p>";								
								if(hist_nm[0] !== undefined){
									html += "<p class='condition'>"+ hist_nm +"</p>";
								}
								/*					if(hist_nm[1] !== undefined){
										html += "<p class='locale'>" +hist_nm[1] + "</p>";
									}	*/							
								//html += "<p class='locale'>" + listItem.hist_type + "</p>";								
								html += 			"</td>";
								html += 			"<td>";
								html += 				"<button class='delete' onclick=\"javascript:mypageList.confirmDelete('" + hist_id + "');\">삭제</button>";
								html += 			"</td>";
								html += 		"</tr>";
								html += 	"</table>";
								html += "</div>";
								html += "</li>";										
							}														
						}			
						mypageList.myPagePaging(result.total_count, mypageList.currentPageIndex);
						$("#mypage_lists_div3").html(html);																							
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
	        		mypageList.currentPageIndex = 1;
	        		mypageList.statiscsInfo();
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
	window.open(linkUrl+'?key=' + str);
};

function getSession(auth) {
	$("#uid").val(auth.member_id);
	mypageList.statiscsInfo();	
};
	