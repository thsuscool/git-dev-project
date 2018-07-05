/**
 * 갤러리 조회 메소드
 * 
 * history : 
 * author : 
 * version : 1.0
 * see : 
 *
 */

//2017.04.03 중복코드 삭제
/*function supportPahtValue(){
	
	//no	아이콘명	값(insert)	의미						URL
	//1	ico_gwon01	J0			살고싶은 우리동네			/view/house/houseAnalysisMap
	//2	ico_gwon02	B0			생활업종 통계지도(창업통계)		/view/bizStats/bizStatsMap
	//3	ico_gwon03	A0			대화형 통계지도				/view/map/interactiveMap
	//4	ico_gwon04	C0			통계주제도					/view/thematicMap/thematicMapMain
	//5	ico_gwon05	T0			기술업종
	//6 ico_gwon06  E0			활용사례
	
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
		case 'technicalBizMap' : returnStr = "T0";
			break;
		default : returnStr = "E0";
			break;
	
	}
	
	return returnStr;
}

function supportImgValue(codeValue){
	var returnStr = "";
	switch(codeValue){
		case 'B0' : 	returnStr = 'ico_gwon01';
			break;
		case 'J0' : 	returnStr = 'ico_gwon02';
			break;
		case 'A0' : 	returnStr = 'ico_gwon03';
			break;
		case 'C0' : 	returnStr = 'ico_gwon04';
			break;
		default : 		returnStr = 'ico_gwon05'; 
			break;
	
		case 'J0' : 	returnStr = 'gw01';
			break;	
		case 'B0' : 	returnStr = 'gw02';
			break;
		case 'A0' : 	returnStr = 'gw03';
			break;
		case 'C0' : 	returnStr = 'gw04';
			break;
		case 'T0' : 	returnStr = 'gw05';
			break;
		default : 		returnStr = 'gw06'; //2017.03.31
	
	}
	return returnStr;
}*/

function getImagekBookMarkPath(paramType){
	if(paramType == "interactiveMap"){
		return("/view/map/interactiveMap/bookmark");
	}else if(paramType == "technicalBizMap"){
		return("/view/technicalBiz/technicalBizMap/bookmark");
	}else if(paramType == "bizStatsMap"){
		return("/view/bizStats/bizStatsMap/bookmark");
	}else if(paramType == "houseAnalysisMap"){
		return("/view/house/houseAnalysisMap/bookmark");
	}else {
		if (paramType.indexOf("thematicMap") != -1) {
			return("/view/thematicMap/thematicMapMain");
		}
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
	
	var imgObject = collectionGallery.galleryImgList[collectionGallery.selectImgIdx];
	//api_call_url
	//param_info.type
	
	var paramInfo = JSON.parse(imgObject.param_info);
	var imagePath =""
	if(paramInfo.type =="bookMark"){
		var histId = paramInfo.hist_id;	
		collectionGallery.selectBookMarkData(histId);
		
		
	}else{
		imagePath = getImagekBookMarkPath(imgObject.api_call_url);
		if(bg != "pic_testmap02" ){
			location.href = imagePath+"?id=" + bg;
		}
	}
					
}


(function(W, D) {

	W.$collectionGallery = W.$collectionGallery || {};

	$(document).ready(function() {
		// 최초 페이지 실행 시 갤러리 목록 가져옴
		collectionGallery.selectGalleryList();
		collectionGallery.selectGalleryAllCountList();
		Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
		//Kakao.init('8e948243dde3004186d166fcb43ff5ea');
	});

	collectionGallery = {
		selectDataId : null,
		currentPageIndex : 1,		// 현재 페이지 인덱스
		searchType : null,			// 검색 항목 ( 해시태그, 제목, 작성자 )
		searchWord : null,			// 검색어
		orderType : 'dt',				//조회 정렬		
		srvType : null,				//갤러리 서비스타입
		galleryImgList : new Array(), // 상세조회 이미지 리스트
		survey_type : null, //설문조사타입
		//iconList : new Array(),
		selectImgIdx : 0,//상세조회 이미지 선택 배열
		intervalContent : null,
		//title : null,
		//content : null,
		//surveyList : new Array(),
		//selectTag : null,

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
					collectionGallery.currentPageIndex = page;
					collectionGallery.selectGalleryList();
				}
			});
		},
		//페이지 리스트 조회시 기능 초기화
		selectListInitClick : function(){
			
			//먼저 있는 기능을 제거 하고
			$("body").off("click",".writeGalleryListItem li");
			$("body").off("click",".rightClose");
			$("body").off("click","keyup keypress");
			//나중에 기능을 추가한다.
			$("body").on("click",".writeGalleryListItem li", function(){
	    		var dataId = $(this).attr("id");
	    		collectionGallery.selectDataId = dataId;
	    		if(!$(this).parents("ul").hasClass("openSelect")){
	    			if($(this).hasClass("statsGalleryDialog")){
	    				$('#dialogDiv').attr("class", "statsGalleryDialog");
	    				$('#dialogDiv').load("/view/gallery/statsGalleryDialog.jsp");
	    			}else if($(this).hasClass("useGalleryDialog")){
	    				$('#dialogDiv').attr("class", "useGalleryDialog");
	    				$('#dialogDiv').load("/view/gallery/useGalleryDialog.jsp");
	    			}else if($(this).hasClass("sgisCensusReq")){
	    				$('#dialogDiv').attr("class","sgisCensusReq")
	    				$('#dialogDiv').load("/view/gallery/sgisCensusReq.jsp");
	    			}
	    			
		    		$("#mCSB_1_container").css("width", "689px");
		    		$("#mCSB_2_container").css("width", "270px");
		    		
		    		//2017.03.24 갤러리 선택 시, 무한로딩되는 현상 
		    		collectionGallery.loadTimer = setInterval(function(){
		    			if ($('#dialogDiv').children().length > 0) {
		    				clearInterval(collectionGallery.loadTimer);
		    				collectionGallery.loadTimer = null;
		    				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
				    		sopPortalGalleryViewObj.addParam("data_id", dataId);
				    		sopPortalGalleryViewObj.request({
								method : "POST",
								async : true, //2017.03.28
								url : contextPath + "/ServiceAPI/gallery/galleryView.json"
							});
		    			}
					},200); //2017.03.31
		    		
					$('body, html').animate({scrollTop: 0}, 450);
		    		$(".dialogGtype").fadeIn("slow");
		    		
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
	    		$('#dialogDiv').attr("class","");
	    		$('#dialogDiv').html("");
	    		$(".dialogGtype").fadeOut("fast");
	    	});
			
			
			$('body').on("keyup keypress", function(e){ 
	    		if("none" != $(".dialogGtype").css("display") && "27" == e.keyCode){
	    			$('#dialogDiv').attr("class","");
	    			$('#dialogDiv').html("");
	    			$(".dialogGtype").fadeOut("fast");
	    		}
	    	
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
			
			var sopPortalGalleryObj = new sop.portal.collectionGallery.api();
			sopPortalGalleryObj.addParam("page_num", collectionGallery.currentPageIndex);
			
			if(collectionGallery.searchType != null && collectionGallery.searchType.length >0){
				sopPortalGalleryObj.addParam("searchType", collectionGallery.searchType);
			}	
			if(collectionGallery.srvType != null && collectionGallery.srvType.length >0){
				sopPortalGalleryObj.addParam("srv_type", collectionGallery.srvType);
			}			
			if(collectionGallery.orderType != null && collectionGallery.orderType.length >0){
				sopPortalGalleryObj.addParam("orderType", collectionGallery.orderType);
			}
			if(collectionGallery.searchWord != null && collectionGallery.searchWord.length > 0) {
				sopPortalGalleryObj.addParam("searchWord", collectionGallery.searchWord);
			}
			sopPortalGalleryObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/gallery/galleryListAll.json"
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
		
		
		//SNS팝업창
		shareInfoOpen : function(){
			
			var srvType = "";
			if($("#dialogDiv").hasClass("statsGalleryDialog")){
				srvType = "statsGalleryDialog";
			}else{
				srvType = "useGalleryDialog";
			}
				
				
			var domain = window.location.protocol+"//"+window.location.host;
			var linkUrl = domain + "/view/gallery/resultGallery?shareDataId="+collectionGallery.selectDataId+"&srvType="+srvType;
			var urlbox = $("#sharedlg").find($("input"));
			urlbox.val(linkUrl);
			
			var elemDiv = document.getElementById("facebookDiv");
			var markup = '<div class="fb-share-button" data-href="'+urlbox.val()+'" data-layout="button"></div>';
			elemDiv.innerHTML = markup;
			FB.XFBML.parse(elemDiv);
			
			//트위터위젯
			$("#twitterDiv").html("<a class='twitter-share-button' href='//twitter.com/share' data-url='"+urlbox.val()+"' data-count='none'></a>");
			twttr.widgets.load();
			
			//$(".deem").show();
			$("#sharedlg").show();
		},
		
		//공유주소 복사
		doDone : function(type){
			copyToClipboard($("#sharedlg").find($("input")).val());
		},
		
		doCancel : function(type){
			$("#sharedlg").hide();
		},
		
		//kakao공유
		shareToKakaoStory : function(){
			var srvType = "";
			if($("#dialogDiv").hasClass("statsGalleryDialog")){
				srvType = "statsGalleryDialog";
			}else{
				srvType = "useGalleryDialog";
			}
			var domain = window.location.protocol+"//"+window.location.host;
			var linkUrl = domain + "/view/gallery/resultGallery?shareDataId="+$resultGallery.selectDataId+"&srvType="+srvType;
			/*$bookmarkAndShareInfo.share.shareInfo.doShareToKakaoStory();*/
			
			Kakao.Auth.login({
				success : function(authObj) {
					var linkURL = linkUrl;
					Kakao.API.request({
						url : '/v1/api/story/linkinfo',
						data : {
							url : linkURL
						},
					}).then(function(res) {
						res.description = that.shareUrlInfo[0].title;
						return Kakao.API.request( {
							url : '/v1/api/story/post/link',
							data : {
								link_info : res
							}
						});
					}).then(function(res) {
						return Kakao.API.request( {
							url : '/v1/api/story/mystory',
							data : { id : res.id },
							success: function(res) {
								messageAlert.open("알림", "카카오스토리에 정상적으로 공유하였습니다.");
							},
							fail : function(error) {
								messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
							}
						});
					});
				},
				fail : function(error) {
					messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
				}
			})
			
		},
		
		//댓글수정 준비
		modifyReply : function(data_id,replyOrder,obj){
			var tValue = $(obj).parent().parent().find("span[name=replyContent]").text();
			$("#replyContent").val(tValue);
			//btnGesi
			$(".btnGesi").prop('href', 'javascript:collectionGallery.updateReply(\''+data_id+'\',\''+replyOrder+'\')');
			$(".btnGesi").text("수정");
		},
		//댓글수정
		updateReply : function(data_id,replyOrder){
			var tValue = $("#replyContent").val();
			
			var updateReply = new sop.portal.updateReply.api();
			updateReply.addParam("data_id",data_id);
			updateReply.addParam("reply_order",replyOrder);
			updateReply.addParam("reply_content",tValue);
			updateReply.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/gallery/updateReply.json"
			});
		},
		
		
//		//검색 조회 기능
//		searchGalleryList : function (orderType) {
//			collectionGallery.currentPageIndex = 1;
//			collectionGallery.searchType = $("#gallery_search_select option:selected").val();
//			collectionGallery.searchWord = $("#gallery_search_title_text").val();
//			if(orderType ==''){
//				collectionGallery.orderType = 'hits';
//			}else{
//				collectionGallery.orderType = orderType;
//			}
//			
//			if(collectionGallery.searchWord.length != 0 && collectionGallery.searchWord.length < 2) {
//				messageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
//				return;
//			}
//			
//			if (!IsBoardValid("formInput", collectionGallery.searchWord, "#gallery_search_title_text")) {
//                return;
//			}
//			collectionGallery.selectGalleryList();
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
		
		// 갤러리 삭제
		deleteGallery : function () {
			messageConfirm.open(
					"알림",
					"해당 갤러리 정보를 삭제 하시겠습니까?",
					btns = [
						{
							title : "삭제",
							disable : false,
							func : function(){
								var dataIdList = new Array(); 
								$(".temp").each(function(){
									if($(this).hasClass("on")){
										dataIdList.push($(this).attr("id"));
									}
								});
								
								if(dataIdList.length <= 0){
									messageAlert.open("알림", "갤러리를 선택하여 주세요.");
									return;
								}
								
								var sopPortalDeleteGalleryObj = new sop.portal.deleteGallery.api();
								sopPortalDeleteGalleryObj.addParam("dataIdList", dataIdList);
								
								sopPortalDeleteGalleryObj.request({
									method : "POST",
									async : false,
									url : contextPath + "/ServiceAPI/gallery/deleteGallery.json"
								});
							}
						},
						{
							title : "취소",
							disable : false,
							func : function(){
								
							}
						}
					]
			);
			
			
		},
		
		// 갤러리 댓글 등록
		insertGalleryReply : function () {
			var dataId = $(".dialogGtype").attr("id");
			var replyContent = $("#replyContent").val();
			if("" == replyContent || null == replyContent){
				messageAlert.open("알림", "내용을 입력하여 주세요.");
				return;
			}
			var sopPortalInsertGalleryReplyObj = new sop.portal.insertGalleryReply.api();
			sopPortalInsertGalleryReplyObj.addParam("data_id", dataId);
			sopPortalInsertGalleryReplyObj.addParam("reply_content", replyContent);
			
			sopPortalInsertGalleryReplyObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/gallery/insertGalleryReply.json"
			});
		},
		
		// 추천 클릭
		clickGalleryLikeInfo : function (){
			var type = "Y";
			var ck = $("#likeInfo").hasClass("on");
			if(!ck){
				/*$(this).addClass("on");*/
				type = "N";
			}else{
				/*$(this).removeClass("on");*/
				
			}
			
			/*var type = "Y";
			if($(".like").hasClass("on")){
				type = "N";
			}*/
			
			var dataId = $(".dialogGtype").attr("id");
			
			if("N" == type){
				var sopPortalInsertGalleryLikeInfoObj = new sop.portal.insertGalleryLikeInfo.api();
				sopPortalInsertGalleryLikeInfoObj.addParam("data_id", dataId);
				
				sopPortalInsertGalleryLikeInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/gallery/insertGalleryLikeInfo.json"
				});
			}else if("Y" == type){
				var sopPortalDeleteGalleryLikeInfoObj = new sop.portal.deleteGalleryLikeInfo.api();
				sopPortalDeleteGalleryLikeInfoObj.addParam("data_id", dataId);
				
				sopPortalDeleteGalleryLikeInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/gallery/deleteGalleryLikeInfo.json"
				});
			}
		},
		
		//설문조사 투표
		clickVoteInfo : function(type){
			var surveySurvId = $(".gvVoteSubj").attr("id");
			var dataId = $(".dialogGtype").attr("id");
			/*var ansSerial = "";*/
			var ansSerial = new Array();
			if($( "div" ).hasClass( "gvVoteBox01" )){
				/*ansSerial = $( "div .gvVoteBox01" ).attr("id");*/
				$("div[name='vote']").each(function(){
					if($(this).attr("class") == "gvVoteBox01"){
						ansSerial.push($(this).attr("id"));
					}
				})
			}else{
					messageAlert.open("알림", "설문항목을 선택하여 주세요.");
					return;
			}
			if("R" == type){
				//설문조사 재투표
				var sopPortalUpdateGalleryPollVoteInfoObj = new sop.portal.updateGalleryPollVoteInfo.api();
				sopPortalUpdateGalleryPollVoteInfoObj.addParam("survey_surv_id", surveySurvId);
				sopPortalUpdateGalleryPollVoteInfoObj.addParam("data_id", dataId);
				sopPortalUpdateGalleryPollVoteInfoObj.addParam("ans_serial", ansSerial);
				
				sopPortalUpdateGalleryPollVoteInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/gallery/updateGalleryPollVoteInfo.json"
				});
			}else if("" == type){
				//설문조사 투표
				var sopPortalInsertGalleryPollVoteInfoObj = new sop.portal.insertGalleryPollVoteInfo.api();
				sopPortalInsertGalleryPollVoteInfoObj.addParam("data_id", dataId);
				sopPortalInsertGalleryPollVoteInfoObj.addParam("survey_surv_id", surveySurvId);
				sopPortalInsertGalleryPollVoteInfoObj.addParam("ans_serial", ansSerial);
				
				sopPortalInsertGalleryPollVoteInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/gallery/insertGalleryPollVoteInfo.json"
				});
			}
			
		},
		//리플 제거
		delReply : function(data_id,replyOrder){
			var sopGalleryDelReply = new sop.portal.DelReply();
			sopGalleryDelReply.addParam("data_id",data_id);
			sopGalleryDelReply.addParam("replyOrder",replyOrder);
			sopGalleryDelReply.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/gallery/deleteReply.json"
			});
		},
		
		//imgIcon 조회
		selectImgIconList : function(data_id, img_id){
			$(".mapIconBox").remove();
			var sopPortalImgIconListObj = new sop.portal.imgIconList.api();
			sopPortalImgIconListObj.addParam("data_id", data_id);
			sopPortalImgIconListObj.addParam("img_id", img_id);
			
			sopPortalImgIconListObj.request({
				method : "POST",
				async : true, //2017.03.22
				url : contextPath + "/ServiceAPI/gallery/galleryImgIconList.json"
			});
		},
		
		//선택된 이미지 조회
		selectShowImage : function(idx){
			var selectImg = collectionGallery.galleryImgList[idx];
			collectionGallery.selectImgIdx = idx;
			var paramInfo = JSON.parse(selectImg.param_info);
			
			//2017.03.31 익스에서 썸네일 클릭시, 이미지 변경 안되는 이슈
			var image = new Image();
			image.src = "/upload/gallery/galleryView/"+paramInfo.fileName;
			image.onload = function() {
				var pWidth = $(".gcMap").width();
				var pHeight = $(".gcMap").height();
				this.width = (this.width * pHeight)/this.height;
				var margin = -(this.width - pWidth)/2;
				$("#mapArea").css("background-image", "url("+this.src+")");
				$("#mapArea").css({
					"width" : this.width + "px",
					"margin-left" : margin + "px"
				});
			};
			image.onerror = function() {
				$("#mapArea").css("background-image",'url("/img/pic/pic_testmap02.jpg")');
				$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
			};
			collectionGallery.selectImgIconList(selectImg.data_id, selectImg.img_id);
			
		},
		
		
		//활용사례 수정 페이지 이동  
		getModifyUseCasePage : function(){
			var selectUseCaseId = $(".dialogGtype").attr("id");
			location.href="/view/gallery/getUseCaseModifyPage?id="+selectUseCaseId;
		},
		//자료제공 수정
		getCensusReqModifyPage : function(){
			var selectUseCaseId = $(".dialogGtype").attr("id");
			/*location.href="/view/gallery/getCensusReqModifyPage?id="+selectUseCaseId;*/
			//2017.03.15 최재영 수정
			location.href="/view/gallery/getUseCaseModifyPage?id="+selectUseCaseId;
		},
		
		
		//설문조사 클릭 이벤트
		setSurvClickEvent : function(o){
			if("1" == collectionGallery.survey_type){
		    		if("gvVoteBox02" == $(o).attr("class")){
		    			
		    			$("div[name='vote']").each(function(){
		    				$(this).attr("class", "gvVoteBox02");
		    			});
		    			
		    			$(o).attr("class", "gvVoteBox01");
		    			
		    		}else{				
						$("div[class^=gvVoteBox]").each(function(){
		    				$(o).attr("class", "gvVoteBox02");
		    			});
		    		}
					
			}else{
		    		if("gvVoteBox02" == $(o).attr("class")){
		    			
		    			/*$("div[class^=gvVoteBox]").each(function(){
		    				$(this).attr("class", "gvVoteBox02");
		    			});*/
		    			
		    			$(o).attr("class", "gvVoteBox01");
		    			
		    		}else{				
						$("div[class^=gvVoteBox]").each(function(){
		    				$(o).attr("class", "gvVoteBox02");
		    			});
		    		}
			}
	    	
		},
		
		fileDownLoad : function(fileRealName,fileName){
			var url = "/view/gallery/refFileDownLoad?fileRealName="+fileRealName+"&fileName="+fileName;
			window.open(url,"_self","enabled");
		},
		
		preViewDownLoad : function(){
			var shareMessage = "해당 이미지를 저장 하시겠습니까?";
			messageConfirm.open(
	    			 "알림", 
	    			 shareMessage,
	    			 btns = [
						{
						    title : "저장",
						    fAgm : null,
						    disable : false,
						    func : function(opt) {
						    	 html2canvas($("#mapArea"),{
						    		 onrendered : function(canvas){
						    			 var myImage = canvas.toDataURL("image/png");
						    			 var target = $('body');
						    			 var url = "/ServiceAPI/gallery/preViewDownLoad.download";
						    			 target.prepend("<form id='preViewDowForm'><input type='hidden' id='preViewDownLoad' name='preViewDownLoad' value='"+myImage+"'/></form>");
						    			 target = $("#preViewDowForm");
						    			 target.attr("method", "post");
						 		         target.attr("style", "top:-3333333333px;");
						 		         target.attr("action", url);
						 		         $("#preViewDowForm").submit();
						 		         $("#preViewDowForm").remove();
						    		 }
						    	 });
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
		
		
		playGallery : function(){
			$(".gvDownloadPreView").hide(); //2017.03.31 플레이시, 이미지 다운로드 숨김
			collectionGallery.selectImgIdx = 0;
			collectionGallery.selectShowImage(collectionGallery.selectImgIdx);
			collectionGallery.intervalContent = setInterval(function(){
				collectionGallery.intervalPlayGallery();
			},3000);
			
		},
		stopPlay : function(){
			$(".gvDownloadPreView").show(); //2017.03.31 플레이시, 이미지 다운로드 숨김
			clearInterval(collectionGallery.intervalContent);
		},
		
		intervalPlayGallery : function(){
			collectionGallery.selectImgIdx = Number(collectionGallery.selectImgIdx +1);
			
			//2017.03.22 갤러리 상세화면에서 시계열 플레이 한번만 되는 현상 제거
			if (collectionGallery.selectImgIdx >  collectionGallery.galleryImgList.length-1){
				collectionGallery.selectImgIdx = 0;
			}
			collectionGallery.selectShowImage(collectionGallery.selectImgIdx);
		},
		
		
		serarchTagName : function(searchStr){
			var linkUrl ="/view/gallery/resultGallery?searchTagName="+searchStr;
			location.href = linkUrl;
		},
		
		linkTooltip : function() {
			$(".tempSave").tooltip({ 
				open: function( event, ui ) {					
				},
				position: {
				      my: "left+10 top", at: "right top", 
				      using: function( position, feedback ) {
				    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
				    		  $( this ).css( position ).prepend("<span class='subj'></span>");
				    	  }else {
				    		  $( this ).css( position ); 
				    	  }
				    	  
				          $( "<div>" )
				           /* .addClass( "arrow" )*/
				            .addClass( feedback.vertical )
				            .addClass( feedback.horizontal )
				            .appendTo( this );
				      }
				},
				content: function () {
					var title = $(this).attr("title");
					title = title.replace(/&lt;p&gt;/gi, '');
					title = title.replace(/&lt;p&gt;/gi, '');
					title = title.replace(/&lt;/gi, '<');
					title = title.replace(/&gt;/gi, '>');
					title = title.replace(/&quot;/gi, '');
					$(this).attr("title", title); 
					return $(this).prop('title');
		        }
			});
		}
	};

	/*********** Receive Lists Start **********/
	(function() {
		//갤러리 목록 조회
		$class("sop.portal.collectionGallery.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					collectionGallery.collectionGalleryPaging(result.totalCount, collectionGallery.currentPageIndex);
					
					$("#memberNmTxt").html(result.memberNm);
					var html = "";
					for(var i = 0; i < result.list.length; i ++) {
						var listItem = result.list[i];
						
						if(listItem.param_info != undefined){
							////console.log("=================");
							////console.log(listItem);
							var paramInfoObj = $.parseJSON(listItem.param_info);
							var title = listItem.title.replace(/\n/gim, "</br>");
							var content = listItem.content.replace(/\n/gim, "</br>");
							var srvType = listItem.srv_type;
							var tempStr = content.split("</br>");
							///////////////////////////////////////////////////////////
							var dialogType = "statsGalleryDialog";
							if('2' == srvType || '4' == srvType){
								dialogType = "useGalleryDialog";
							}else if('5' == srvType || '6' == srvType){
								dialogType = "sgisCensusReq";
							}
							html += '<li class="temp ' + dialogType + '" id="' +  listItem.data_id + '">';
							html += 	'<div class="rela">';
		
							if('1' == srvType || '3' == srvType){
								html += 		'<img src="/img/ico/ico_ygallery.png" alt="통계갤러리" class="etcTp" />';
							}else if('2' == srvType || '4' == srvType){
								html += 		'<img src="/img/ico/ico_bgallery.png" alt="활용갤러리" class="etcTp" />';
							}
							
							if(listItem.excellent =="Y"){
								html +=			'<img src="/img/ico/hotIcon.png" alt="우수사례" class="etcExcellent"/>';
							}
							html += 		'<div class="map">';

							//2017.03.22 갤러리 이미지 찌그러짐 보정
							if (dialogType == "useGalleryDialog"){
								if(paramInfoObj.preViewImg != null && paramInfoObj.preViewImg != 'undefined') {
									html +=	'<img id="img_' +  listItem.data_id + '" src="/img/common/testimg01.png" onerror="this.src=\'/img/common/testimg01.png\'" width="100%" height="100%" />';
								}
							}else {
								html +=	'<img id="img_' +  listItem.data_id + '" src="/img/common/testimg01.png" onerror="this.src=\'/img/common/testimg01.png\'" width="100%" height="100%" />';
							}
							
				
							html +=		'</div>';
							html += 		'<div class="cont">';

							var supportType = supportImgValue(listItem.support_type);
							html += 			'<div class="conBar '+supportType+'">';
							html += 				'<p class="t01">' + title + '</p>';
							html += 				'<p class="t02">작성일 : ' + listItem.reg_dt + '</p>';
							html += 				'<a href="javascript:void(0)" class="num">' + listItem.img_cnt + '</a>';
							html += 			'</div>';
							html += 		'</div>';
							if(listItem.survey_title == undefined){
								html += 		'<div class="tailTxt">' + "" + '</div>';
							}else{
								html += 		'<div class="tailTxt">' + listItem.survey_title + '</div>';
							}
							html += 		'<div class="tailIcon">';
							html += 			'<span class="t01">' + listItem.hits + '</span>';
							html += 			'<span class="t02">' + listItem.like_cnt + '</span>';
							html += 			'<span class="t03">' + listItem.reply_cnt + '</span>';
							
							var tagHtml = "";
							var tagHtml = "";
							if(null == listItem.tag || listItem.tag  =="" || listItem.tag == undefined ){
								listItem.tag = "";
							}
							var tagArr = listItem.tag.split(",");
							//요구사항은 2개까지만 보여주기로
							var tagLength = tagArr.length;
							if(tagLength > 2){
								tagLength = 2;
							}
							/*for(var j = 0; j < tagArr.length; j++) {
								tagHtml += '#'+$.trim(tagArr[j])+' ';
							}*/
							for(var j = 0; j < tagLength; j++) {
								tagHtml += '#'+$.trim(tagArr[j])+' ';
							}
							html += 			'<span class="t04">' + tagHtml + '</span>';
							html += 		'</div>';
							html += 		'<div class="maskbox"></div>';
							//임시저장 구분(1:통계갤러리, 2:활용갤러리, 3:통계갤러리 임시저장, 4:활용갤러리 임시저장)
							//console.log("dndndndn");
							//console.log(srvType);
							if('3' == srvType || '4' == srvType || '6' == srvType){
								//html += 		'<div class="tempSave">' + '임시 저장 중' + '</div>';
								html += 		'<div class="tempSave" title="비공개"><img src="/img/common/icon_temp_sseok.png" width=25 height=25></div>';
							}
							
							html += 	'</div>';
							html += '</li>';
						//////////////////////////////////////////////////////////////////////
						}
						
					}

					$(".writeGalleryListItem").empty();
					$(".writeGalleryListItem").html(html);
					
					//2017.03.22 갤러리 이미지 찌그러짐 보정
					for(var i = 0; i < result.list.length; i ++) {
						var listItem = result.list[i];
						if (listItem.param_info != undefined){
							
							var dialogType = "statsGalleryDialog";
							switch(parseInt(listItem.srv_type)) {
								case 2:
								case 4:
									dialogType = "useGalleryDialog";
									break;
								default:
									dialogType = "statsGalleryDialog";
									break;
							}
							
							var paramInfoObj = $.parseJSON(listItem.param_info);
							var url = "";
							if (dialogType == "useGalleryDialog"){
								url = "/upload/gallery/preView/"+paramInfoObj.preViewImg.saveFileName ;
							}else {
								url = "/upload/gallery/galleryView/"+paramInfoObj.fileName;
							}
							
							var image = new Image();
							image.src = url;
							image.id = "img2_"+listItem.data_id;
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
					}
					
					collectionGallery.selectListInitClick();
					collectionGallery.linkTooltip();
					
				} else if(res.errCd == "-100") {
					$(".writeGalleryListItem").empty();
					$(".writeGalleryListItem").html(html);
					collectionGallery.selectListInitClick();
					collectionGallery.linkTooltip();
				}
				else {
					messageAlert.open("알림", res.errMsg);
					
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
		//갤러리 상세조회
	(function(){
		$class("sop.portal.galleryView.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					
					//2017.03.22 갤러리 선택 시, 무한로딩되는 현상 
					$(".dialogGtype").show();
					
					var result = res.result;
					collectionGallery.galleryImgList = result.galleryImgList;
					var galleryImgListItem = result.galleryImgList;
					var galleryItem = result.gallery;
					var galleryPollDetailListItem = result.galleryPollDetailList;

					if("useGalleryDialog" == $('#dialogDiv').attr("class")){
						if(galleryImgListItem[0]){
							var galleryImgItem = galleryImgListItem[0];
							var galleryImgHtml = "";
							
							var apiCallUrl = galleryImgItem.api_call_url;
							var paramInfo = JSON.parse(galleryImgItem.param_info);
							
							if(paramInfo.userName){$("#userName").html(paramInfo.userName);}
							if(paramInfo.section){ $("#sectionTxt").html(paramInfo.section); }
							if(paramInfo.usePurpose){ $("#usePurposeTxt").html(paramInfo.usePurpose); }
							if(paramInfo.applicationField){ $("#applicationFieldTxt").html(paramInfo.applicationField); }
							if(paramInfo.dataUse1){ $("#dataUse1Txt").html(paramInfo.dataUse1); }
							if(paramInfo.dataUse2){ $("#dataUse2Txt").html(paramInfo.dataUse2); }
							if(paramInfo.content){
								paramInfo.content = replaceAll(paramInfo.content, '\n', '<br/>');
								$("#contentTxt").html(paramInfo.content); 
								}
							
							
							if(paramInfo.siteUrl){
								var siteUrl = paramInfo.siteUrl;
								var href = ( ( siteUrl.indexOf("http://") == 0 || siteUrl.indexOf("https://") == 0 ) ? "" : "http://");
								
								$("#siteUrlTxt").html("<a href='"+ href + siteUrl +"' target='_blank'>"+siteUrl+"</a>");
							}
							
							if(paramInfo.refFileList){
								var fileListHtml = '<span class="t01">참고자료</span><br>';
								for(var i = 0; i < paramInfo.refFileList.length; i ++) {
									fileListHtml += '<a onclick="collectionGallery.fileDownLoad(\''+ paramInfo.refFileList[i].saveName +'\',\''+paramInfo.refFileList[i].fileName+'\');" class="t02">'+paramInfo.refFileList[i].fileName+'</a>';
								}
								$("#fileList").html(fileListHtml);
							}
							
							if(paramInfo.preViewImg){
								var preViewImgHtml = "";	
								preViewImgHtml += '<img src="/upload/gallery/preView/' + paramInfo.preViewImg.saveFileName + '" width="100%" height="100%" onerror="this.src=\'/img/common/testimg01.png\'" />';
								preViewImgHtml +='<a href="/upload/gallery/preView/' + paramInfo.preViewImg.saveFileName + '" class="gdDownload"></a>';
								$(".gdMapArea").html(preViewImgHtml);
							}
						}
					}else if("statsGalleryDialog" == $('#dialogDiv').attr("class")){
						var slickDiv = $(".gvSlideArea").find(".item");
						if(slickDiv.length == 0){
							//imgSlide
							//2017.03.22 썸네일 슬라이더 이동 이벤트 수정
							if ($(".gvSlideArea").length) {
								$(".gvSlideArea").slick({  
									slidesToShow: 5,
									infinite:false,
									arrows:false,
									dots: false
								}); 
								$("body").on("click",".gvPrev",function(e){	 
									console.log("prev");
									$('.gvSlideArea').slick("slickPrev");	
								});		
								$("body").on("click",".gvNext",function(e){		
									console.log("next");
									$('.gvSlideArea').slick("slickNext");	
								});	 
							}
						}else{
							for(var i =slickDiv.length; i > 0 ; i--){
								$('.gvSlideArea').slick('slickRemove',i-1);  
							}
						}
						
						for(var i = 0; i < galleryImgListItem.length;i++){							
							var paramInfo = JSON.parse(galleryImgListItem[i].param_info);
							var item = '<div class="item" name="slickImage">';
							item += 		'<div class="rela">';
							item += 			'<a href="javascript:void(0)" class="showImg" onclick="collectionGallery.selectShowImage('+i+');"><img src="/upload/gallery/galleryView/'+paramInfo.fileName+'" onerror="this.src=\'/img/common/testimg01.png\'" width="100px" height="62px;"  /></a>';
							item += 		'</div>';
							item += 	'</div>';
							if(i == 0){
								//2017.03.22 갤러리 이미지 찌그러짐 보정
								//===============================START===================================//
								$("#mapArea").css("background-image",'url("/img/pic/pic_testmap02.jpg")');
								
								var image = new Image();
								image.src = '/upload/gallery/galleryView/'+paramInfo.fileName;
								image.onload = function() {
									var pWidth = $(".gcMap").width();
									var pHeight = $(".gcMap").height();
									this.width = (this.width * pHeight)/this.height;
									var margin = -(this.width - pWidth)/2;
									$("#mapArea").css("background-image", "url("+this.src+")");
									$("#mapArea").css({
										"width" : this.width + "px",
										"margin-left" : margin + "px"
									});
								};
								//===============================END===================================//
							}
							$("#gvSlideArea").slick('slickAdd',item);
							
						}
						
						//mapArea 설정
						if(galleryImgListItem[0]){
							collectionGallery.selectImgIconList(galleryImgListItem[0].data_id, galleryImgListItem[0].img_id);
						}
						
						
						
						//수정시 설문조사
						var surveyObject = new Object();
						var surveyList = new Array();
						for(var i = 0; i < result.galleryPollDetailList.length; i ++){
							var poll = result.galleryPollDetailList[i];
							if(i == 0){
								surveyObject.surveyId = poll.survey_surv_id;
								surveyObject.survey_title = poll.survey_title;
								surveyObject.end_dt = poll.survey_surv_end_dt;
								surveyObject.surv_type = poll.survey_type;
								$collectionModify.selectSurvey_type = poll.survey_type;
							}
							var pollDetail = new Object();
							//기존 설문조사가 없을경우 undefined
							if(poll.ans_serial != undefined){
								pollDetail.ans_serial = poll.ans_serial;
								pollDetail.ans_content = poll.ans_content;
								surveyList.push(pollDetail);
							}
							
						}
						
						surveyObject.surveyList = surveyList;
						
						//res.result
						$collectionModify.srv_type = $('#dialogDiv').attr("class");
						$collectionModify.selectId =result.gallery.data_id;
						$collectionModify.selectImgList = result.galleryImgList;
						$collectionModify.selectTitle = result.gallery.title;
						$collectionModify.selectContent = result.gallery.content;
						$collectionModify.selectTag = result.gallery.tag;
						$collectionModify.publicType = result.gallery.srv_type;
						$collectionModify.that = collectionGallery;
						$collectionModify.selectSurvey = surveyObject;
					}else if("sgisCensusReq" == $('#dialogDiv').attr("class")){
						if(galleryImgListItem[0]){
							var galleryImgItem = galleryImgListItem[0];
							var galleryImgHtml = "";
							
							var paramInfo = JSON.parse(galleryImgItem.param_info);
							//console.log("paramInfo=======");
							//console.log(paramInfo);
							if(paramInfo.sgis_census_req_kwaje){$("#titleTxt").html(paramInfo.sgis_census_req_kwaje);}
							if(paramInfo.sgis_census_req_goal){$("#contentTxt").html(paramInfo.sgis_census_req_goal);}
							/*var apiCallUrl = galleryImgItem.api_call_url;*/
							//2017.03.15 최재영 수정
							if(paramInfo.sgis_census_req_mokjuk){$("#usePurposeTxt").html(paramInfo.usePurpose);}
							if(paramInfo.section){$("#sectionTxt").html(paramInfo.section)}
							if(paramInfo.applicationField){$("#applicationFieldTxt").html(paramInfo.applicationField)}
							//if(paramInfo.sgis_census_req_kwaje){$("#sgis_census_req_kwaje").html(paramInfo.sgis_census_req_kwaje);}
							//if(paramInfo.sgis_census_req_goal){$("#sgis_census_req_goal").html(paramInfo.sgis_census_req_goal);}
							//if(paramInfo.sgis_census_req_tel){$("#sgis_census_req_tel").html(paramInfo.sgis_census_req_tel);}
							//if(paramInfo.sgis_census_req_company){$("#sgis_census_req_company").html(paramInfo.sgis_census_req_company);}
							//if(paramInfo.sgis_census_req_email){$("#sgis_census_req_email").html(paramInfo.sgis_census_req_email);}
							//if(paramInfo.sgis_census_req_sosok){$("#sgis_census_req_sosok").html(paramInfo.sgis_census_req_sosok);}
							
							/*if(paramInfo.sgisCensusList){
								var sgisCensusList = paramInfo.sgisCensusList;
								var tableHtml = "<table border='1'>";
								tableHtml += "<tr><td>자료구분</td><td>대상자료명</td><td>년도</td><td>시도</td><td>시군구</td></tr>";
								for(var i = 0; i < sgisCensusList.length; i++){
									tableHtml +="<tr>";
									tableHtml +=	"<td>" +sgisCensusList[i].sgis_census_id+"</td>"
									tableHtml +=	"<td>" +sgisCensusList[i].sgis_census_data_id+"</td>"
									tableHtml +=	"<td>" +sgisCensusList[i].sgis_census_year_id+"</td>"
									tableHtml +=	"<td>" +sgisCensusList[i].sgis_census_sido_id+"</td>"
									tableHtml +=	"<td>" +sgisCensusList[i].sgis_census_sigungu_id+"</td>"
									tableHtml +="</tr>";
								}
								tableHtml +="</table>";
								
								$("#sgisCensusList").html(tableHtml);
							}*/					
							
							/*$(".gdTitle .t02 .s02 a").hide();*/
							/*$(".useSide").hide();*/
							$(".popGalleryCreate .gcLeft").mCustomScrollbar({axis:"y"});
							
						}
					}
					
					
					$(".dialogGtype").attr("id", galleryItem.data_id);
					//TODO #titleTxt의 클래스 값(gwon01 ~ gwon05) 변경, gvTitle는 남기고
					
					//2017.04.03 상세팝업창 서비스 심볼 수정
					var supportType = supportDetailImgValue(galleryItem.support_type);
					$("#titleTxt").addClass(supportType);
					
					$("#titleTxt").html(galleryItem.title);
					$("#titleTxt").attr("title",galleryItem.title);
					$("#regDtTxt").html(galleryItem.reg_dt);
					$("#writerTxt").html(galleryItem.member_nm);
					galleryItem.content = replaceAll(galleryItem.content, '\n', '<br/>');
					var postContent = "<div id='contentField' style='height:70px;overflow:hidden;'>"
						postContent += "<div style='width:265px;'>"
						postContent += galleryItem.content;
						postContent += "</div>"
						postContent += "</div>"
					$("#postContentTxt").html(postContent);
					$("#contentField").mCustomScrollbar({axis:"y"});
					if("Y" == galleryItem.like_yn){
						$(".like").addClass("on")
					}else{
						$(".like").removeClass("on")
					}

					var tagHtml = "";
					if(galleryItem.tag =="" ||galleryItem.tag == null ||galleryItem.tag == undefined ){
						galleryItem.tag = "";
					}
					var tagArr = galleryItem.tag.split(",");
					for(var i = 0; i < tagArr.length; i++) {
						tagHtml += '<span style="cursor:pointer" onclick="collectionGallery.serarchTagName(\''+$.trim(tagArr[i])+'\');">#'+$.trim(tagArr[i])+'</span>'
					}
					
					$(".gvTag").html(tagHtml);

					var galleryHtml = "";					
					galleryHtml += '<span class="s01">' + galleryItem.hits + '</span>';
					galleryHtml += '<span class="s02">' + galleryItem.like_cnt  + '</span>';
					galleryHtml += '<span class="s03">' + galleryItem.reply_cnt + '</span>';

					$(".gvIconEventBox .t01").html(galleryHtml)
					
					//설문조사//////////////////////////
					//TODO 설문조사 데이터 없을 경우 여백처리는?(min-height 처리?)
					if(galleryPollDetailListItem.length > 0){
						//2017.03.24 validation 처리
						if (galleryPollDetailListItem[0].survey_surv_end_dt != undefined) {
							var surveyTitle = galleryPollDetailListItem[0].survey_title;
							var surveySurvId = galleryPollDetailListItem[0].survey_surv_id;
							var surveySurvEndDt = galleryPollDetailListItem[0].survey_surv_end_dt.replace(/"/gim, "");
							collectionGallery.survey_type = galleryPollDetailListItem[0].survey_type;
							var totalVoteCnt = 0;
							var totalVoteYn = false;
							for(var i = 0; i < galleryPollDetailListItem.length; i++) {
								var galleryPollDetailItem = galleryPollDetailListItem[i];
								totalVoteCnt += galleryPollDetailItem.vote_cnt;
								if(totalVoteYn == false && "Y" == galleryPollDetailItem.vote_yn){
									totalVoteYn = true;
								}
							}
							
							//날짜를 가져와서 안지났으면 온클릭 이벤트 지났을경우 온클릭 이벤트 제거
							var endDtFull = surveySurvEndDt.replace(/\s/g, "")
							endDtFull = endDtFull.replace("년","-");
							endDtFull = endDtFull.replace("월","-");
							endDtFull = endDtFull.replace("일","");
							
							var endDay = new Date(endDtFull);
							var toDay = new Date();
							
							var btMs = endDay.getTime() - toDay.getTime();
							var btDay = btMs / (1000*60*60*24);
							btDay = Math.ceil(btDay);
							btDay = Number(btDay);
							
							var galleryPollDetailHtml = "";
								
							galleryPollDetailHtml += '<div class="gvVoteSubj" id="' + surveySurvId + '">';
							galleryPollDetailHtml += 	'<span class="t01">' + surveyTitle + '</span>';
							if(btDay >= -1){
								galleryPollDetailHtml += 	'<span class="t02">' + surveySurvEndDt + '까지 설문완료</span>';
							}else{
								galleryPollDetailHtml += 	'<span class="t02">' + '설문완료</span>';
							}
							
							galleryPollDetailHtml += '</div>';
							galleryPollDetailHtml += '<div id="voteBox" style="height:70px;overflow:hidden;">'
							for(var i = 0; i < galleryPollDetailListItem.length; i ++) {
								var galleryPollDetailItem = galleryPollDetailListItem[i];
								
								var voteYn = "01";							
								if("Y" != galleryPollDetailItem.vote_yn){
									voteYn = "02";
								}
								
								var votePer = 0;
								if(0 != totalVoteCnt){
									/*votePer = Math.round(galleryPollDetailItem.vote_cnt / totalVoteCnt);*/
									votePer = galleryPollDetailItem.vote_cnt / totalVoteCnt;
									votePer = votePer * 100;
								}
								
								
								
								if(btDay <= -1){
									galleryPollDetailHtml += '<div name="vote" class="gvVoteBox' + voteYn + '" id="' + galleryPollDetailItem.ans_serial + '" style="background-size:'+votePer+'%" onclick="">';
									galleryPollDetailHtml += 	'<span class="t01">' + galleryPollDetailItem.ans_content + '</span>';
									galleryPollDetailHtml += 	'<span class="t02">' + galleryPollDetailItem.vote_cnt+ ' 명(' + votePer + '%)</span>';
									galleryPollDetailHtml += '</div>';
								}else{
									galleryPollDetailHtml += '<div name="vote" class="gvVoteBox' + voteYn + '" id="' + galleryPollDetailItem.ans_serial + '" style="background-size:'+votePer+'%" onclick="collectionGallery.setSurvClickEvent(this)">';
									galleryPollDetailHtml += 	'<span class="t01">' + galleryPollDetailItem.ans_content + '</span>';
									galleryPollDetailHtml += 	'<span class="t02">' + galleryPollDetailItem.vote_cnt+ ' 명(' + votePer + '%)</span>';
									galleryPollDetailHtml += '</div>';
								}
								
								
							}
							galleryPollDetailHtml += '</div>';
							
							if(btDay >= -1){
								if(totalVoteYn){
									galleryPollDetailHtml += '<a href="javascript:collectionGallery.clickVoteInfo(\'R\')" class="btnVote">다시 투표하기</a>';
								}else{
									galleryPollDetailHtml += '<a href="javascript:collectionGallery.clickVoteInfo(\'\')" class="btnVote">투표하기</a>';
								}
							}else{
								galleryPollDetailHtml += '<a href="javascript:void(0)" class="btnVote">설문 종료</a>';
							}
							
							$(".gvVote").empty();
							$(".gvVote").html(galleryPollDetailHtml);
							$("#voteBox").mCustomScrollbar({axis:"y"});
						}
						
					}
					
					var galleryReplyHtml = "";
					for(var i = 0; i < result.galleryReplyList.length; i ++) {
						var galleryReplyListItem = result.galleryReplyList[i];
						var content = galleryReplyListItem.reply_content.replace(/\n/gim, "</br>");
						var writer = galleryReplyListItem.reply_writer.replace(/\n/gim, "</br>");
						var memberNm = galleryReplyListItem.member_nm.replace(/\n/gim, "</br>");

						galleryReplyHtml += '<li>';
						galleryReplyHtml += 		'<span class="t01">' + memberNm +'</span>';
						if(writer ==result.viewMember){
							galleryReplyHtml += 		'<span class="t02"><span name="replyContent" style="vertical-align:5px;">' + content+'</span> &nbsp;';
							galleryReplyHtml +=				'<span style="cursor:auto"><a name="removeReply" href="javascript:void(0)" onclick="collectionGallery.delReply(\''+result.galleryReplyList[i].data_id+'\',\''+result.galleryReplyList[i].reply_order+'\')" >';
							galleryReplyHtml +=				'<img src="/img/ico/ico_close04.png"  height=\'14px;\' "></a>';
							
							galleryReplyHtml +=				'<a href="javascript:void(0);" onclick="collectionGallery.modifyReply(\''+result.galleryReplyList[i].data_id+'\',\''+result.galleryReplyList[i].reply_order+'\',this)"><img src="/img/ico/ico_edit01.png" alt="수정"></a></span>';
							
						}else{
							galleryReplyHtml += 		'<span class="t02"><span name="replyContent">' + content+'</span>';
						}
						
						galleryReplyHtml +='</span>';
						
						galleryReplyHtml += '</li>';
					}

					$(".gvReplyList").empty();
					$(".gvReplyList").html(galleryReplyHtml);
					$(".gvReplyListBox").mCustomScrollbar({axis:"y"});
					
					if (galleryPollDetailItem) {
						if(galleryPollDetailItem.ans_serial == undefined){
							$(".gvVote").hide();
						}else{
							$(".gvVote").show();
						}
					}else {
						$(".gvVote").hide();
					}
					
					
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());	
		
		//댓글 등록
	(function(){
		$class("sop.portal.insertGalleryReply.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					$("#replyContent").val("");
					
					var dataId = $(".dialogGtype").attr("id");
					var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
		    		sopPortalGalleryViewObj.addParam("data_id", dataId);
		    		sopPortalGalleryViewObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/gallery/galleryView.json"
					});
					
					$('body, html').animate({scrollTop: 0}, 450);
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
		//추천 등록
	(function(){
		$class("sop.portal.insertGalleryLikeInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;				
					var dataId = $(".dialogGtype").attr("id");
					var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
		    		sopPortalGalleryViewObj.addParam("data_id", dataId);
		    		sopPortalGalleryViewObj.request({
						method : "POST",
						async : true, //2017.03.28
						url : contextPath + "/ServiceAPI/gallery/galleryView.json"
					});
					$('body, html').animate({scrollTop: 0}, 450);
					collectionGallery.selectGalleryAllCountList(); //2017.03.28 추천했을 때, 카운트 설정
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
		//추천 삭제
	(function(){
		$class("sop.portal.deleteGalleryLikeInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;				
					var dataId = $(".dialogGtype").attr("id");
					var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
		    		sopPortalGalleryViewObj.addParam("data_id", dataId);
		    		sopPortalGalleryViewObj.request({
						method : "POST",
						async : true, //2017.03.28
						url : contextPath + "/ServiceAPI/gallery/galleryView.json"
					});
					$('body, html').animate({scrollTop: 0}, 450);
					collectionGallery.selectGalleryAllCountList(); //2017.03.28 추천했을 때, 카운트 설정
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
	//설문조사 재투표
	(function(){
		$class("sop.portal.updateGalleryPollVoteInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;					
					var dataId = $(".dialogGtype").attr("id");
					var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
		    		sopPortalGalleryViewObj.addParam("data_id", dataId);
		    		sopPortalGalleryViewObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/gallery/galleryView.json"
					});
					
					$('body, html').animate({scrollTop: 0}, 450);
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
	//설문조사 투표
	(function(){
		$class("sop.portal.insertGalleryPollVoteInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;				
					var dataId = $(".dialogGtype").attr("id");
					var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
		    		sopPortalGalleryViewObj.addParam("data_id", dataId);
		    		sopPortalGalleryViewObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/gallery/galleryView.json"
					});
					
					$('body, html').animate({scrollTop: 0}, 450);
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
	(function(){
		$class("sop.portal.deleteGallery.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					collectionGallery.selectGalleryList();
					collectionGallery.selectGalleryAllCountList(); //2017.03.22 갤러리 삭제 시, 갤러리 갯수 재조회
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
	//댓글 삭제
	(function(){
		$class("sop.portal.DelReply").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;				
					var dataId = $(".dialogGtype").attr("id");
					var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
		    		sopPortalGalleryViewObj.addParam("data_id", dataId);
		    		sopPortalGalleryViewObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/gallery/galleryView.json"
					});
					
					$('body, html').animate({scrollTop: 0}, 450);
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
	//imgIcon 조회
	(function(){
		$class("sop.portal.imgIconList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					var galleryImgIconListItem = result.galleryImgIconList;

					if(galleryImgIconListItem){
							$(".gviewMap").find(".imgIcon").each(function(){
								$(this).remove();
							})
							for(var i = 0; i < galleryImgIconListItem.length; i++) {
								var imgIconSrc = "/img/ico/"+galleryImgIconListItem[i].icon_nm;
								var html ="";
								if("1" ==galleryImgIconListItem[i].icon_type){
									html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor)) +'px;left:'+Number(Number(galleryImgIconListItem[i].y_coor))+'px">';
									html +='<img src="';
									html +=imgIconSrc;
									html +='" class="mapIconCont"/>';
									html +="</div>";
									
								}else if("2" ==galleryImgIconListItem[i].icon_type){
									html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;top:'+galleryImgIconListItem[i].x_coor+'px;left:'+galleryImgIconListItem[i].y_coor+'px">'
									if(galleryImgIconListItem[i].icon_nm =="mal01" ){
										html +='<div class="mal01">';
									}else{
										html +='<div class="mal02">';
									}
									/*html +='<textarea class="malType"></textarea></div>';*/
									html +='<div class="malType">'+galleryImgIconListItem[i].exp+'</div></div>';
									html +='</div>';
									
								}

								$(".gviewMap").append(html);
								/*$(".gviewMap").append('<img class="imgIcon" src="' + imgIconSrc + '" style="position:absolute; left:' + galleryImgIconListItem[i].x_coor + 'px; top:' + galleryImgIconListItem[i].y_coor + 'px;">');*/
							}
							$(".malType").mCustomScrollbar({axis:"y"});
					}
					
				} else {
					messageAlert.open("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
		
	(function(){
		$class("sop.portal.addMyGallery.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status,res){
				messageAlert.open("알림","해당 갤러리를 수집갤러리로 저장 하였습니다.");
				collectionGallery.selectGalleryAllCountList(); //2017.03.28 수집갤러리 등록 시, 카운트 재설정
			},
			onFail : function(status){
				
			}
		
		});
	}());
		
	//갤러리 즐겨찾기 개수, 작성 갤러리 개수, 수집 갤러리 개수
	(function(){
		$class("sop.portal.galleryAllCountList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					$("#bookMarkCount").html("즐겨찾기 " +result.bookmarkcount+"개");
					$("#writeGalleryCount").html("작성 갤러리 " +result.writecount+"개");
					$("#nowCount").html("작성 갤러리 " +result.writecount+"개");
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
	
	
	//댓글 수정
	(function(){
		$class("sop.portal.updateReply.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$("#replyContent").val("");
					$(".btnGesi").prop('href', 'javascript:collectionGallery.insertGalleryReply()');
					$(".btnGesi").text("게시");
					
					var dataId = $(".dialogGtype").attr("id");
					var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
		    		sopPortalGalleryViewObj.addParam("data_id", dataId);
		    		sopPortalGalleryViewObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/gallery/galleryView.json"
					});
					
					$('body, html').animate({scrollTop: 0}, 450);
					
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
	(function(){
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
		});
	}());
}(window, document));