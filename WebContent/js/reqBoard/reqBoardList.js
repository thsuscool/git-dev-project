/**
 * 게시판 조회 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2018/02/06  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 *
 */


var pageNum = getParameter( 'pageNum ');
var interval;
var intervalCnt = 0;

function init() {
	$reqBoard.makeReqList();
	
	var searchWordType = getParameter('searchWordType');
	var searchWord = getParameter('searchWord');
	
	$reqBoard.searchWordType = ( searchWordType ? searchWordType : '' );
	$reqBoard.searchWord = ( searchWord ? decodeURI(searchWord) : '' );
}

(function(W, D) {
	//"use strict";

	W.$reqBoard = W.$reqBoard || {};
	
	$(document).ready(function() {
		init();
		
		var scrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
		$("#topScrollTag").css("left", scrollWidthVal)
		$(window).scroll(function(){
		    var currentScrollY = $(this).scrollTop();
		    if(currentScrollY >= 10){
		    	$("#topScrollTag").fadeIn("fast");
		    }else{
		    	$("#topScrollTag").fadeOut("fast");
		    }
		});
		
		$(window).resize(function(){
			var resizeScrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
			$("#topScrollTag").css("left", resizeScrollWidthVal)
		}).resize();
		
		//검색조건 셋팅
		$("#searchWordType").val( ( $reqBoard.searchWordType ? $reqBoard.searchWordType : 'REQ_ALL' )  );
		$("#searchWord").val( $reqBoard.searchWord ? $reqBoard.searchWord : '' );
	});

	$reqBoard = {
		currentPageIndex : ( pageNum ? pageNum : 1 ),
		searchWordType : '',
		searchWord : '',

		// 게시판 목록 페이징 처리
		listPaging : function(totalCount, currentIndex) {
			var pageSize = 10; // 페이지 당 항목 개수
			var totalPage = Math.ceil(totalCount / pageSize); // 전체 페이지 수
			$('.pagenation1 .pages').paging({
				current : currentIndex,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function(e, page) { // 페이지 선택 시
					$reqBoard.currentPageIndex = page
					$reqBoard.makeReqList();
				}
			});
		},

		// 게시판 목록 생성
		makeReqList : function() {
			var sopPortalReqObj = new sop.portal.reqBoard.api();
			sopPortalReqObj.addParam("page_num", $reqBoard.currentPageIndex);
			if( $reqBoard.searchWordType ) sopPortalReqObj.addParam("searchWordType", $reqBoard.searchWordType);
			if( $reqBoard.searchWord ) sopPortalReqObj.addParam("searchWord", $reqBoard.searchWord);
			
			sopPortalReqObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/req/reqBoardList.json"
			});

			$('body, html').animate({
				scrollTop : 0
			}, 450);
		},

		// 게시판 검색
		searchReqList : function() {
			$reqBoard.currentPageIndex = 1;
			$reqBoard.searchWord = $("#searchWord").textbox('getValue');
			$reqBoard.searchWordType = $("#searchWordType").combobox('getValue');
			
			if (!IsValid("formInput", $reqBoard.searchWord)) {
				return;
			}
			
			$reqBoard.makeReqList();
		},
		// 오토리로드
		autoReload : function() {
			if(intervalCnt == 0){
				intervalCnt++;
				interval = setInterval(function(){
					$reqBoard.makeReqList()
				},5000);
			}
		},
		// 오토리로드
		stopReload : function() {
			clearInterval(interval);
			intervalCnt = 0;
		},

		controlListItem : function(req_seq) {			
			var parameters = "&page_num="+$reqBoard.currentPageIndex+"&searchWordType="+$reqBoard.searchWordType+"&searchWord="+$reqBoard.searchWord;
			window.location.href = contextPath + "/view/req/reqBoardView?REQ_SEQ=" + req_seq + parameters;
		},
	};

	(function() {
		$class("sop.portal.reqBoard.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {							
					var result = res.result;
					var reqBoardTotalCnt = result.total_count;
					var pageSize = result.pageSize;
					var curPage = result.curPage;
					
					$reqBoard.listPaging( result.total_count, $reqBoard.currentPageIndex );
					$reqBoard.reqList = result.reqList;
					
					var html = "";
					html += "<table class='boardTb'>";
					html += "<colgroup><col width='5%'/><col width='30%'/><col width='10%'/><col width='10%'/><col width='20%'/><col width='15%'/><col width='10%'/>";
					html += "</colgroup>";
					html += "<thead><tr>";
					html += "<th>순번</th><th>제목</th><th>작업구분</th><th>진행상태</th><th>접수자/진행자/작업자</th><th>요청일</th><th>작성자</th>";
					html += "</tr><thead>";
					html += "<tbody>";
					if( result.reqList.length > 0 ){
						for (var i = 0; i < result.reqList.length; i++) {
							var listItem = result.reqList[i];								
							var title = listItem.req_title.replace(/\n/gi, "</br>");
							var user_nm = '';
							var color = '';
							
							switch( listItem.req_prgrs_stats_cd ){
								case "01" : color = "red"; break;
								case "02" : color = "green"; break;
								case "03" : color = "red"; break;
								case "04" : color = "blue"; break;
								case "05" : color = "green"; break;
								case "06" : color = "red"; break;
								case "07" : color = "blue"; break;
								default : color = "#666";
							}
							
							user_nm += ( listItem.recv_user_nm ? listItem.recv_user_nm : '' );
							user_nm += ( listItem.prgrs_user_nm ? "/"+listItem.prgrs_user_nm : '' );
							user_nm += ( listItem.work_user_nm ? "/"+listItem.work_user_nm : '' );
								
							html += "<tr>";
							html += "<td style='text-align:center;'>"+listItem.rnum+"</td>";
							html += "<td class='titleTd'>";
							
							
							html += "<a style='cursor: pointer;' href='javascript:$reqBoard.controlListItem(" + listItem.req_seq + ");'>";
							//일련번호
							//html += listItem.boardnum;
							html += "&nbsp;&nbsp;&nbsp;" +title;
							html += "</a>";
							html += "</td>";
							//작성일
							html += "<td style='text-align:center;'>&nbsp;&nbsp;" + listItem.req_div_cd_nm + "</td>";
							html += "<td style='text-align:center; color:"+color+";'>&nbsp;&nbsp;" + listItem.req_prgrs_stats_cd_nm + "</td>";
							html += "<td style=''>&nbsp;&nbsp;" + user_nm + "</td>";
							html += "<td style='text-align:center;'>&nbsp;&nbsp;" + listItem.req_dt + "</td>";
							html += "<td style='text-align:center;'>&nbsp;&nbsp;" + listItem.req_user_nm + "</td>";
							html += "</tr>";		
						}
					} else {
						html += "<tr><td colspan='6' style='text-align:center;'>등록된 데이터가 없습니다.</td></tr>";
					}
					
					html += "</tbody>";
					html += "</table>";
						
					$("#req_list").empty();
					$("#req_list").html(html);
				}
			},
			onFail : function(status) {
			}
		
		});
	}());

}(window, document));