(function(W, D) {
	var page_num = 1,search_type=null,search_word=null,pageSize=10;
	$(document).ready(function() {
		setNoticeList();
	});
	W.$notice = W.$notice || {};
	$notice.ui = {
		search : function(){
			search_word = $("#notice_search_title_text").textbox('getValue');
			search_type = $("#notice_search_select").combobox('getValue');
			page_num = 1;
			setNoticeList();
			return false;
		}
	};
	function setNoticeList(){
		var parameters = {
			board_cd : "BOARD_008",
			page_num : page_num
		};
		if($communityMapCommon.hasText(search_type)&&$communityMapCommon.hasText(search_word)){
			parameters[search_type] = search_word.toUpperCase();
		}
		
		$.ajax({
			type: "POST",
			url : contextPath+"/ServiceAPI/board/boardLists.json",
			data:parameters,
			dataType: "json",
			async : false,
			success: function(res) {
				if(res.errCd=="0"){
					var page_number = res.result.total_count - ((page_num-1)*pageSize);
					var ul = $("<ul/>");
					var addQuery = $communityMapCommon.addQuery(["post_no"]);
					if(/^&/.test(addQuery)){
						addQuery = "&"+addQuery.substring(1,addQuery.length);
					}
					$.each(res.result.summaryList,function(cnt,node){
						ul.append($("<li/>").append(
							$("<a/>",{"href":contextPath + "/view/community/notice/view?post_no=" + node.post_no+addQuery,"html":(page_number-cnt)+"&nbsp;&nbsp;&nbsp;"+node.post_title.replace(/\n/gim, "<br>")}).append(
								$("<span/>",{"text":node.reg_ts,"style":"padding-left: 10px;"})
//								,$("<span/>",{"text":"조회 "+($.isNumeric(node.post_hits)?node.post_hits:"0"),"style":"padding-left: 10px;"})
							)
						));
					})
					$("#notice_list").empty().append(ul);
					var totalPage = Math.ceil(parseInt(res.result.total_count) /parseInt(pageSize)); // 전체 페이지 수
					$(".pagenation1 .pages").paging({
						current: page_num,
						max: totalPage,
						itemClass: 'page',
						itemCurrent: 'current',
						format: '{0}',
						next: '&gt;',
						prev: '&lt;',
						first: '&lt;&lt;',
						last: '&gt;&gt;',
						onclick: function(e, page) { // 페이지 선택 시
							page_num = page
							setNoticeList();
						}
					});
				}else{
					$communityMapCommon.alert("알림",res.errMsg);
				}
			},
			error: function(xhr, status, errorThrown) {
				$communityMapCommon.alert("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
			}
		});
	}
}(window, document));