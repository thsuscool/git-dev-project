(function(W, D) {
	W.$mypageList = W.$mypageList || {};
	var sopAbs = new sop.portal.absAPI();
	$(document).ready(function() {	
		$mypageList.statiscsInfo();
	});	
	$mypageList = {
		currentPageIndex : 1,			// 현재 페이지 인덱스
		//통계조회 히스토리 조회
		statiscsInfo: function () {
			sopAbs.onBlockUIPopup();
			var sopPortalMemeberObj = new sop.portal.statiscsInfoList.api();			
			sopPortalMemeberObj.addParam("page_num", $mypageList.currentPageIndex);
			sopPortalMemeberObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/member/StatisticsHistory.json"
			});						
		},		
		//페이징 만들기
		createPaging : function(tableName, totalCount, currentIndexName) {
			$("#"+tableName+"Page").empty();
			var pageSize = 5;						
			var totalPage = Math.ceil( totalCount / pageSize);
			var firstPage = $("<a/>",{
				"class" : "PasingFst "+($mypageList[currentIndexName]>1?"":"PasingOff"),
				href : "#",
				title : "맨앞",
				text : "◀◀"
			}).click(function(){
				if($mypageList[currentIndexName]>1){
					$mypageList[currentIndexName] = 1;
					$mypageList.statiscsInfo();
				}
			});
			var prePage = $("<a/>",{
				"class" : "PasingForward "+($mypageList[currentIndexName]>1?"":"PasingOff"),
				href : "#",
				title : "이전",
				text : "◀"
			}).click(function(){
				if($mypageList[currentIndexName]>1){
					$mypageList[currentIndexName] = $mypageList[currentIndexName]-1;
					$mypageList.statiscsInfo();
				}
			});
			var currentPage = $("<span/>",{
				html : '<strong>'+($mypageList[currentIndexName])+'</strong>&#47;'+totalPage
			});
			var nextPage = $("<a/>",{
				"class" : "PasingNext "+($mypageList[currentIndexName]<totalPage?"":"PasingOff"),
				href : "#",
				title : "다음",
				text : "▶"
			}).click(function(){
				if($mypageList[currentIndexName]<totalPage){
					$mypageList[currentIndexName] = $mypageList[currentIndexName]+1;
					$mypageList.statiscsInfo();
				}
			});
			var lastPage = $("<a/>",{
				"class" : "PasingLst "+($mypageList[currentIndexName]<totalPage?"":"PasingOff"),
				href : "#",
				title : "맨끝",
				text : "▶▶"
			}).click(function(){
				if($mypageList[currentIndexName]<totalPage){
					$mypageList[currentIndexName] = totalPage;
					$mypageList.statiscsInfo();
				}
			});
			$("#"+tableName+"Page").append(firstPage,prePage,currentPage,nextPage,lastPage);
		},
		formatDate : function(date){
			var getDate = date.split(" ");
			var newDate = new Date(getDate[0]);
			return newDate.getFullYear()+"년 "+formatDate(newDate.getMonth()+1)+"월 "+formatDate(newDate.getDate())+"일 "+getDate[1].substring(0,getDate[1].indexOf("."));  
		}
	};	
	/*********** 통계조회 히스토리 Start **********/
	(function() {		
		$class("sop.portal.statiscsInfoList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {				
				if(res.errCd == "0") {
					var tableName = "SearchHistory";
					$("#"+tableName).empty();
					$.each(res.result.historyList,function(cnt,node){
						var mapName = "";
						if(node.map_type=="IMAP"){
							mapName="대화형 통계지도";
						}else if(node.map_type=="CMAP"){
							mapName="창업지원 맵";
						}else{
							mapName="알 수 없는 형태의 지도";
						}
						$("#"+tableName).append(
							$("<a/>",{href:"/mobile/html/interactive/interactiveMap.html?key="+node.hist_id}).append(
								$("<span/>",{"class":"Part Part1","text":mapName}),
								$("<span/>",{"class":"Date","text":$mypageList.formatDate(node.reg_ts)}),
								$("<span/>",{"class":"SearchTerms","text":node.hist_nm})
							)
						);
					});
					$mypageList.createPaging(tableName, res.result.total_count, "currentPageIndex");
					sopAbs.onBlockUIClose();
				} else {
					sopAbs.onBlockUIClose();
					messageAlert.open("알림",res.errMsg);
				}
			},						
			onFail : function(status) {
			}
		});
	}());
}(window, document));