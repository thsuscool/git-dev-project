/**
 * 북마크갤러리 조회 메소드
 * 
 * history : 
 * author : 
 * version : 1.0
 * see : 
 *
 */

function supportPahtValue(){
	
	//no	아이콘명	값(insert)	의미						URL
	//1	ico_gwon01	J0			살고싶은 우리동네			/view/house/houseAnalysisMap
	//2	ico_gwon02	B0			생활업종 통계지도(창업통계)		/view/bizStats/bizStatsMap
	//3	ico_gwon03	A0			대화형 통계지도				/view/map/interactiveMap
	//4	ico_gwon04	C0			통계주제도					/view/thematicMap/thematicMapMain
	//5	ico_gwon05	T0			기술업종
	
	var path = $(location).attr('pathname');
	var pathSplit = path.split("/");
	var returnStr = "";
	
	switch(pathSplit[2]){
		case 'bizStatsMap' : returnStr = "B0";
			break;
		case 'houseAnalysisMap' : returnStr = "J0"; 
			break;
		case 'interactiveMap' : returnStr = "A0";
			break;
		case 'thematicMapMain' : returnStr = "C0";
			break;
		default : returnStr = "T0";
			break;
	
	}
	
	return returnStr;
}

function supportImgValue(codeValue){
	var returnStr = "";
	switch(codeValue){
/*		case 'B0' : 	returnStr = 'ico_gwon01';
			break;
		case 'J0' : 	returnStr = 'ico_gwon02';
			break;
		case 'A0' : 	returnStr = 'ico_gwon03';
			break;
		case 'C0' : 	returnStr = 'ico_gwon04';
			break;
		default : 		returnStr = 'ico_gwon05'; 
			break;*/
	
		case 'J0' : 	returnStr = 'gw01';
			break;
		case 'B0' : 	returnStr = 'gw02';
			break;
		case 'A0' : 	returnStr = 'gw03';
			break;
		case 'C0' : 	returnStr = 'gw04';
			break;
		default : 		returnStr = 'gw05'; 
			break;
	
	}
	return returnStr;
}

function getImagekBookMarkPath(paramType){
	if(paramType == "interactiveMap"){
		return("/view/map/interactiveMap/bookmark");
	}else if(paramType == "technicalBizMap"){
		return("/view/technicalBiz/technicalBizMap/bookmark");
	}else if(paramType == "houseAnalysisMap"){
		return("/view/house/houseAnalysisMap/bookmark");
	}

}

function goImage(){
	var bg = $("#mapArea").css('background-image');
	//error 처리를 위한 내용
	bg = bg.split(",");
	bg = bg[0];
	bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
	bg = bg.split("/");
	bg = bg[bg.length-1];
	bg = bg.split(".")[0];
	
	var imgObject = $bookMarkGallery.galleryImgList[$bookMarkGallery.selectImgIdx];
	//api_call_url
	//param_info.type
	
	var paramInfo = JSON.parse(imgObject.param_info);
	var imagePath =""
	if(paramInfo.type =="bookMark"){
		var histId = paramInfo.hist_id;	
		$bookMarkGallery.selectBookMarkData(histId);
	}else{
		imagePath = getImagekBookMarkPath(imgObject.api_call_url);
		if(bg != "pic_testmap02" ){
			location.href = imagePath+"?id=" + bg;
		}
	}
					
}


(function(W, D) {

	W.$bookMarkGallery = W.$bookMarkGallery || {};

	$(document).ready(function() {
		// 최초 페이지 실행 시 갤러리 목록 가져옴
		$bookMarkGallery.selectGalleryList();
		$bookMarkGallery.selectGalleryAllCountList();
		
		/*$("body").on("click",".writeGalleryListItem li", function(){
			if(!$(this).parents("ul").hasClass("openSelect")){
				var dataId = $(this).attr("id");
				var linkUrl = getBookmarkURL($(this).attr("data-id"));
				statiscsInfoListLink(dataId,linkUrl);
			}
			
		});*/
    	
    	/*$("body").on("click",".rightClose", function(){
    		$('#dialogDiv').attr("class","");
    		$('#dialogDiv').html("");
    		$(".dialogGtype").fadeOut("fast");
    	});*/
    	
    	/*$('body').on("keyup keypress", function(e){ 
    		if("none" != $(".dialogGtype").css("display") && "27" == e.keyCode){
    			$('#dialogDiv').attr("class","");
    			$('#dialogDiv').html("");
    			$(".dialogGtype").fadeOut("fast");
    		}
    	
    	})*/
    	    	
	});

	$bookMarkGallery = {
		selectDataId : null,
		currentPageIndex : 1,		// 현재 페이지 인덱스
		searchType : null,			// 검색 항목 ( 해시태그, 제목, 작성자 )
		searchWord : null,			// 검색어
		orderType : 'dt',				//조회 정렬		
		srvType : null,				//갤러리 서비스타입
		galleryImgList : new Array(), // 상세조회 이미지 리스트
		survey_type : null, //설문조사타입
		selectImgIdx : 0,//상세조회 이미지 선택 배열
		intervalContent : null,

		// 갤러리 목록 페이징 처리
		collectionGalleryPaging : function (totalCount, currentIndex) {
			var pageSize = 9;										// 페이지 당 항목 개수
			var totalPage = Math.ceil( totalCount / pageSize);		// 전체 페이지 수
			$('.pagenation .paging').paging({
				current : currentIndex,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '<img src="/img/ico/ico_next01.png" alt="다음" />',
				prev : '<img src="/img/ico/ico_prev01.png" alt="이전" />',
				first : '<img src="/img/ico/ico_first01.png" alt="처음" />',
				last : '<img src="/img/ico/ico_last01.png" alt="마지막" />',
				onclick : function(e,page){							// 페이지 선택 시
					$bookMarkGallery.currentPageIndex = page;
					$bookMarkGallery.selectGalleryList();
				}
			});
		},
		selectListInitClick : function(){
			
			$("body").off("click",".writeGalleryListItem li");
			$("body").off("click",".rightClose");
			
			$("body").on("click",".writeGalleryListItem li", function(){
				if(!$(this).parents("ul").hasClass("openSelect")){
					var dataId = $(this).attr("id");
					var linkUrl = getBookmarkURL($(this).attr("data-id"));
					statiscsInfoListLink(dataId,linkUrl);
				}else{
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");	
					}else{
						$(this).removeClass("on");
					}
				}
				
			});
			
			$("body").on("click",".rightClose", function(){
				$("#myGalleryDialog").hide();
	    		$('#dialogDiv').attr("class","");
	    		$(".dialogGtype").fadeOut("fast");
	    	});
			
			etcGalleryEvent();
			
			
		},
		//즐겨찾기 데이터 가져오기 
		selectBookMarkData : function(hist_id){
			var bookMarkData = new sop.portal.selectBookMarkData.api();
			bookMarkData.addParam("hist_id",hist_id);
			bookMarkData.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/gallery/selectBookMarkData.json"
			});
		},
		
		// 갤러리 목록 조회
		selectGalleryList : function () {
			
			var sopPortalGalleryObj = new sop.portal.bookMarkGallery.api();
			sopPortalGalleryObj.addParam("page_num", $bookMarkGallery.currentPageIndex);
			
			/*if($bookMarkGallery.orderType != null && $bookMarkGallery.orderType.length >0){
				sopPortalGalleryObj.addParam("orderType", $bookMarkGallery.orderType);
			}*/
			if($bookMarkGallery.searchWord != null && $bookMarkGallery.searchWord.length > 0) {
				sopPortalGalleryObj.addParam("searchWord", $bookMarkGallery.searchWord);
			}
			sopPortalGalleryObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/gallery/selectBookMarkList.json"
			});
			
			$('body, html').animate({scrollTop: 0}, 450);
		},
		
		//즐겨찾기개수 ,작성갤러리 개수 , 수집갤러리 개수 가져오기
		selectGalleryAllCountList : function(){
			var allCountList = new sop.portal.galleryAllCountList.api();
			allCountList.request({
				method : "POST",
				async : true, //2017.03.22
				url : contextPath + "/ServiceAPI/gallery/galleryAllCountList.json"
			});
		},
		
		
		
		
//		//검색 조회 기능
//		searchGalleryList : function (orderType) {
//			$bookMarkGallery.currentPageIndex = 1;
//			$bookMarkGallery.searchType = $("#gallery_search_select option:selected").val();
//			$bookMarkGallery.searchWord = $("#gallery_search_title_text").val();
//			if(orderType ==''){
//				$bookMarkGallery.orderType = 'hits';
//			}else{
//				$bookMarkGallery.orderType = orderType;
//			}
//			
//			if($bookMarkGallery.searchWord.length != 0 && $bookMarkGallery.searchWord.length < 2) {
//				messageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
//				return;
//			}
//			
//			if (!IsBoardValid("formInput", $bookMarkGallery.searchWord, "#gallery_search_title_text")) {
//                return;
//			}
//			$bookMarkGallery.selectGalleryList();
//		},
		
		// 선택/취소 버튼 클릭
		selectGalleryYn : function (type) {
			if("Y" == type){
				$("#selectBtn").css("display", "none");
				$("#deleteBtn").css("display", "inline-block");
				$("#cancelBtn").css("display", "inline-block");
				$(".writeGalleryListItem").addClass("openSelect");
			}else if("N" == type){
				$("#selectBtn").css("display", "inline-block");
				$("#deleteBtn").css("display", "none");
				$("#cancelBtn").css("display", "none");
				$(".writeGalleryListItem").removeClass("openSelect");
				$(".temp").each(function(){
					$(this).removeClass("on");
				});
			}
		},
		
		// 갤러리 추가
		addGallery : function () {
			if(AuthInfo.authStatus == true){
				var dataIdList = new Array(); 
				$(".temp").each(function(){
					if($(this).hasClass("on")){
						dataIdList.push($(this).attr("id"));
					}
				});
				$("#dialogDiv").show();
				/*var nDate = new Date();*/
				/*$('#dialogDiv').load(window.location.protocol+"//"+window.location.host+"/view/gallery/insertGallaryDialog.jsp",{"dataIdList" : dataIdList},function(){
					
				});*/
				$galleryAdd.selectIdx = 0;
				$galleryAdd.addBookMarkList(dataIdList);
				
			}else{
				var shareMessage = "갤러리 등록 기능은 로그인 후 이용하실 수 있습니다.<br>로그인 하시겠습니까?";
				var linkUrl = "/view/gallery/bookMarkGallery";
				messageConfirm.open(
		    			 "알림", 
		    			 shareMessage,
		    			 btns = [
							{
							    title : "로그인",
							    fAgm : null,
							    disable : false,
							    func : function(opt) {
							    	var curUrl = linkUrl;
							    	goSelectLogin(curUrl); 
							    }
							 },
							 
		    			     {
							   title : "취소",
							   fAgm : null,
							   disable : false,
							   func : function(opt) {}
		    			     }   
		    			     
		    			 ]
		    	);
			}
			
			
			
			if(dataIdList.length <= 0){
				messageAlert.open("알림", "갤러리를 선택하여 주세요.");
				return;
			}
			
			
			
		},
		
		
		addMyGallery : function(){
			
			var addMyGallery = new sop.portal.addMyGallery.api();
			addMyGallery.addParam("data_id",$(".dialogGtype").attr("id"));
			addMyGallery.addParam("collect_id",makeRandomThirtySevenDigitString());
			addMyGallery.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/gallery/addMyGallery.json"
			});
		},
		
		
		
		
			
//TODO 작성자 수정버튼
//TODO 공유버튼
//TODO 수집버튼
		
	};

	/*********** Receive Lists Start **********/
	(function() {
		//갤러리 목록 조회
		$class("sop.portal.bookMarkGallery.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					var resultList = result.resultList;
					var totalCount = result.totalCount;
					$bookMarkGallery.collectionGalleryPaging(result.totalCount, $bookMarkGallery.currentPageIndex);
					$("#memberNmTxt").html(result.memberNm);
					
					var html = "";
					for(var i = 0; i < resultList.length; i++){
						/*hist_id:"GMFEvyH1DC20170116191139585LuyJpKHMon"
						hist_nm:"총인구"
						hist_type:"BMARK"
						map_type:"IMAP"
						member_id:"choijy"
						reg_ts:"2017-01-16 19:10:31.5648"*/
						
						var listItem = resultList[i];
						var title = listItem.hist_nm;
						
						html +='<li class="temp" id="'+listItem.hist_id+'" data-id="'+listItem.map_type+'">';
						html +=	'<div class="rela">';
						html += 	'<div class="map">';
						
						//2017.03.22 갤러리 이미지 찌그러짐 보정
						html +=			'<img id="img_'+listItem.hist_id+'" src="/img/common/testimg01.png" onerror="this.src=\'/img/common/testimg01.png\'" width="100%" height="100%"/>';
						
						html +=		'</div>';
						html += 		'<div class="cont">';
						html += 			'<div class="conBar '+'">';
						html += 				'<p class="t01">' + title + '</p>';
						html += 				'<p class="t02">작성일 : ' + listItem.reg_ts + '</p>';
						html += 			'</div>';
						html += 		'<div class="tailTxt">' +'</div>';
						html += 		'<div class="tailIcon">';
						html += 			'<span class="t01">' +'</span>';
						html += 			'<span class="t02">' +'</span>';
						html += 			'<span class="t03">' +'</span>';
						html += 			'<span class="t04">' +'</span>';
						html += 		'<div class="maskbox"></div>';
						html += 	'</div>';
						html += '</li>';
					}
					$(".writeGalleryListItem").empty();
					$(".writeGalleryListItem").html(html);
					
					//2017.03.22 갤러리 이미지 찌그러짐 보정
					for(var i = 0; i < resultList.length; i ++) {
						var listItem = resultList[i];
						var image = new Image();
						image.src = "/upload/gallery/galleryView/"+listItem.hist_id + ".png";
						image.id = "img2_"+listItem.hist_id;
						image.onload = function() {
							var pWidth = 308;
							var pHeight = 200;
							this.width = (this.width*pHeight)/this.height;
							var margin = -(this.width - pWidth)/2;
							var id = this.id.split("_")[1];
							$("#img_"+id).attr("src", this.src);
							$("#img_"+id).css({
								"width" : this.width + "px",
								"margin-left" : margin + "px"
							});

						};
	
							
							

					}
					
					
					
					$bookMarkGallery.selectListInitClick();
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		})
	}());
		
		
		
		
	(function() {		
		//갤러리 즐겨찾기 개수, 작성 갤러리 개수, 수집 갤러리 개수
		$class("sop.portal.galleryAllCountList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					//console.log(result);
					$("#bookMarkCount").html("즐겨찾기 " +result.bookmarkcount+"개");
					$("#writeGalleryCount").html("작성 갤러리 " +result.writecount+"개");
					$("#nowCount").html("즐겨찾기 " +result.bookmarkcount+"개"); //2017.03.28 즐겨찾기 뷰일때 카운트 설정
					$("#collectGalleryCount").html("수집 갤러리" + result.collectcount+"개");
					$("#likeCount").html("추천 수" + result.likecount+"개");
					/*$("#tempCount").html("임시저장 "+result.tempwrite);*/ //2017.03.28 비공개 카운트 제거
					//tempwrite
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	
	
	
	
	/*********** Receive Lists End **********/
	//즐겨찾기 데이터 가져오기
	(function() {
	$class("sop.portal.selectBookMarkData.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;
				
				var linkUrl = "";
				var domain = window.location.protocol+"//"+window.location.host;
				
				switch (result.bookMarkData.map_type) {
					case "IMAP":
						linkUrl =  domain + "/view/map/interactiveMap/bookmark?"
						break;
					case "BMAP":
						linkUrl = domain + "/view/bizStats/bizStatsMap/bookmark?"
						break;
					case "TECH":
						linkUrl = domain + "/view/technicalBiz/technicalBizMap/bookmark?"
						break;
					case "HMAP":
						linkUrl = domain + "/view/house/houseAnalysisMap/bookmark?"
						break;
					case "THEME":
						break;
				}
				
				
				var url = linkUrl+"id=" + result.bookMarkData.hist_id;
				location.href = url;
				
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	})
	}());
}(window, document));