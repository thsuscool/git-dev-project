/**
 * 갤러리 수정
 * 
 * history : 2016-10-12 
 * author : 최재영
 * version : 1.0
 * see : 
 *
 */

function dragImageOn(){
	$(".imgIcon").draggable({
		containment : "#mapArea",
		zIndex : 22000,
		helper: "clone",
	});
	
	
	$(".imgTextArea").draggable({
		containment : "#mapArea",
		zIndex : 22000,
		helper: "clone",
	});
	
	//이게 캔버스가 되는게 좋을듯 싶다.
	$("#mapArea").droppable({
		drop:function(e,ui){	
			var imgObj = new Object();
			var margin = ($("#mapArea").width() - $(".gcMap").width())/2 + 21; //2017.04.03 아이콘 위치 마진계산
			var idx = $collectionModify.targetIconArray.length;
			var positionTop = Number(ui.position.top+204);
			var positionLeft = Number(ui.position.left+margin); //2017.04.03 말풍선 위치보정
			var imgSrc, imgSrcSplit;
			
			var className = ui.draggable.attr("class");
			
			//처음 아이콘영역에서 특정 아이콘 드래그 시
			if(className.indexOf("imgIcon") != -1 || className.indexOf("imgTextArea") != -1){
				imgSrcSplit = ui.draggable.attr('src').split("/");
				srcFileName = imgSrcSplit[imgSrcSplit.length-1];
				var html="";
				if(srcFileName =="ico_mal01.png" || srcFileName =="ico_mal02.png"){
					imgObj.type =2;
					if(srcFileName =="ico_mal01.png"){
						html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'">'
						html +='<div class="mal01">';
						html +='<textarea class="malType"></textarea></div>';
						html +='<a href="javascript:$collectionModify.deleteIcon('+idx+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a></div>';
							
						
					}else{
						html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'">'
						html +='<div class="mal02">';
						html +='<textarea class="malType"></textarea></div>';
						html +='<a href="javascript:$collectionModify.deleteIcon('+idx+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a></div>';
					}
				}else{
					imgObj.type =1;
					html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'">';
					html +='<img src="';
					html +=ui.draggable.attr('src');
					html +='" class="mapIconCont"/>';
					html +='<a href="javascript:$collectionModify.deleteIcon('+idx+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>'
					html +="</div>";
				}
				
				
				
				$("#mapArea").append(html);
				$("#ico_"+idx).css({
					"z-index" : "20000",
					"position" : "absolute",
					"top" : positionTop + "px",
					"left" : positionLeft + "px"
				});
				
				imgObj.icon_type = imgObj.type;
				/*imgObj.positionTop = positionTop;
				imgObj.positionLeft = positionLeft;*/
				imgObj.x_coor = positionTop;
				imgObj.y_coor = positionLeft;
				imgObj.imgSrc = ui.draggable.attr('src');
				/*imgObj.srcFileName = srcFileName;*/
				imgObj.icon_nm = srcFileName;
				imgObj.seqId = idx;
				imgObj.html_src = html;
				imgObj.exp = '';
		
				$collectionModify.targetIconArray.push(imgObj);
			}else{//드랍한 후에 드래그 시
				for (var i=0; i<$collectionModify.targetIconArray.length; i++) {
					//비교식이 idx가 아닌
					if ("ico_"+i == ui.draggable.attr('id')) {
						$collectionModify.targetIconArray[i].x_coor = positionTop -204;
						$collectionModify.targetIconArray[i].y_coor = positionLeft -21;
						break;
					}
				}
			}
			dropImageEvent("#ico_"+idx);
		}
	});
	
	$("#mapArea").removeAttr("onclick");
}

function dropImageEvent(id){
	if ($(id).data("draggable")) {
		$(id).draggable("destroy");
	}
	
	$(id).draggable({
		containment : "parent",
	});
}

(function(W, D) {
	W.$collectionModify = W.$collectionModify || {};
	
	$collectionModify = {
			srv_type : null,
			selectId : null,
			selectImgList : new Array(),
			selectIconList : new Array(),
			targetIconArray : new Array(),
			selectTitle : null,
			selectContent : null,
			selectTag : null,
			selectSurvey : null,
			selectSurvey_type : null,
			publicType : null,
			selectImgIdx : 0,
			intervalContent : null,
			that : null,
			sortableImgIndex : null,
			//현재 상세보기 수정 
			modifyData : function(){
				
				//statsGalleryDialog
				
				$("#penButton").show();
				//titleTxt
				$(".gvInfo").hide();
				$(".gvIconEventBox").hide();
				$(".gvReplyForm").hide();
				$(".gvReplyListBox").hide();
				$("#gvTag").hide();
				$("#titleTxt").html("<input class='inp' id='modifyTitle' type='text' value='"+$collectionModify.selectTitle+"'/>");
				$("#postContentTxt").html("<textArea class='gvTextArea'>"+$collectionModify.selectContent+"</textArea>");
				
				if($collectionModify.selectSurvey.survey_title == undefined){
					$collectionModify.selectSurvey.survey_title = "";
				}
				
				var html ="";
					html +='<div class="usForm">';
					html +='<input name="surveySubject" id="surveySubject" type="text" placeholder="설문제목" value="'+$collectionModify.selectSurvey.survey_title+'" />';
					html +='</div>';
					html +='<div class="josaListBox">';
					html +='<div id="surveyDetail" class="josaListBoxScroll">';
					html +='<ul id="surveyDetailUl">';
					for(var i = 0; i < $collectionModify.selectSurvey.surveyList.length; i ++){
						html +='<li name="ansLi"><div class="rela"><input type="text" name="ansDetail" placeholder="항목 입력" value="'+$collectionModify.selectSurvey.surveyList[i].ans_content+'"/><a style="display:none;"name="removePoll" href="javascript:void(0)" onclick="$collectionModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></div></li>';
					}
					
					html +='<li id="surveyAdd_1"><a href="javascript:$collectionModify.addPollDetail()">+ 항목추가</a></li>';
					html +='</ul>';
					html +='</div>';
					
					if($collectionModify.selectSurvey.survey_title != ""){
						var dtStr = $collectionModify.selectSurvey.end_dt.replace(/\"/gi,""); 
						dtStr = dtStr.replace(/\s/g,'');
						dtStr = dtStr.replace("년","-");
						dtStr = dtStr.replace("월","-");
						dtStr = dtStr.replace("일","");
						if(dtStr == "1900-01-01"){
							var date = new Date();
							date.setDate(date.getDate() + 7);
							dtStr = date.getFullYear() + "-" + leadingZeros((date.getMonth()+1),2) +"-" + leadingZeros(date.getDate(),2);
						}
						html +='<a href="javascript:void(0)" class="radioLink on"';
						html +='onclick="radioCross(this);" data-event="toggle" id="endSurveyTime">마감시간 설정</a>';
						html +='<div class="calendarEtcBox" style="display: block;">';
						html +='<input id="survey_surv_end_dt" type="text" class="date" value="'+dtStr+'"/>';
						html +='</div>';
					}else{
						var date = new Date();
						date.setDate(date.getDate() + 7);
						dtStr = date.getFullYear() + "-" + leadingZeros((date.getMonth()+1),2) +"-" + leadingZeros(date.getDate(),2);
						
						html +='<a href="javascript:void(0)" class="radioLink"';
						html +='onclick="radioCross(this);" data-event="toggle" id="endSurveyTime">마감시간 설정</a>';
						html +='<div class="calendarEtcBox">';
						html +='<input id="survey_surv_end_dt" type="text" class="date" value="'+dtStr+'"/>';
						html +='</div>';
					}
					
					if($collectionModify.selectSurvey_type =="1"){
						html +='<a href="javascript:void(0)" class="radioLink"';
						html +='onclick="radioCross(this)" id="surveyType">복수선택</a>';
					}else{
						html +='<a href="javascript:void(0)" class="radioLink on"';
						html +='onclick="radioCross(this)" id="surveyType">복수선택</a>';
					}
					
					if($collectionModify.publicType =="1"){
						html +='<a href="javascript:void(0)" class="radioLink on"';
						html +='onclick="radioCross(this)" id="publicType">공개여부</a>';
					}else{
						html +='<a href="javascript:void(0)" class="radioLink"';
						html +='onclick="radioCross(this)" id="publicType">공개여부</a>';
					}
					
					html +='</div>';

				//$collectionModify.selectImgIdx = collectionGallery.selectImgIdx;
				
				$collectionModify.selectImgIdx = $collectionModify.that.selectImgIdx;
					
				
				$(".gvVote").show();
				$("#gvVote").html(html);		
				$("#gvVote").css("border","1px");
				datePicker();
				var oriTag ="";
				var tagStr ="";
				$(".hashTag").show();
				
				if($collectionModify.selectTag != null && $collectionModify.selectTag !=""){
					tagStr= $collectionModify.selectTag.split(",");
					for(var i = 0 ; i < tagStr.length;i++){
						//2017.03.08 ie에서 해시태그 하나만 나오는 이슈
						var d = new Date();
						var tmpId = d.getMilliseconds();
						var html  = "<span class='tag' id='tag_id_"+tmpId+"-"+tagStr[i]+"'>";
							html += 	"<span>" + tagStr[i] + "&nbsp; &nbsp;</span>";
							html += 	"<a href='#' title='Removing tag' class='Removing' id='tags_"+tmpId+"-"+tagStr[i]+"'>x</a>";
							html += "</span>";
						$("#hashTag_tagsinput").prepend(html);	
						$("#hashTag_tag").focus();
						$("#hashTag_tag").blur();
					}
				}
				
				//2017.03.08 ie에서 해시태그 하나만 나오는 이슈
				//======================START=========================//
				$(".Removing").click(function() {
					var id = $(this).attr("id");
					id = id.split("_")[1];
					$("#tag_id_"+id).remove();
					$("#hashTag_tagsinput").scrollTop(0);
				});
				
				$("#hashTag_tag").change(function() {
					var value = this.value;
					setTimeout(function() {
						var hashTags = $("#hashTag_tagsinput > span").last();
						var d = new Date();
						var tmpId = d.getMilliseconds();
						$(hashTags).attr("id", "tag_id_"+tmpId+"_"+value);
						$(hashTags).find("a").attr("class", "Removing");
						$(hashTags).find("a").attr("id", "tags_"+tmpId+"-"+value);
					}, 100);
				});
				
				$("#hashTag_tag").keydown(function(e) {
					if (e.which == 13) {
						var value = this.value;
						setTimeout(function() {
							var hashTags = $("#hashTag_tagsinput > span").last();
							var d = new Date();
							var tmpId = d.getMilliseconds();
							$(hashTags).attr("id", "tag_id_"+tmpId+"_"+value);
							$(hashTags).find("a").attr("class", "Removing");
							$(hashTags).find("a").attr("id", "tags_"+tmpId+"-"+value);
						}, 100);
					}
				});
				//======================END=========================//
				
				//2017.03.22 수정시, 해시태그가 보이지 않는 현상
				$("#hashTag_tagsinput").scrollTop(0);
				
				
				//이미지 생성
				/*$("div[name='slickImage']").remove();*/
				
				//jsp 구조 변경 시작
				//2017.03.22 수정시 썸네일 슬라이더 prev/next 동작안하는 이슈
				//이파일 내, gcSlideArea -> gvSlideArea로 모두 변경
				$("#imgSlideBox").attr('class','gcSlideBox');
				$("#gvSlideArea").css('margin','0 auto');
				$("#gvPrev").css({
					"position" : "absolute",
					"left" : "5px",
					"top" : "30px"
				});
				$("#gvNext").css({
					"position" : "absolute",
					"right" : "5px",
					"top" : "30px"
				});
				$(".gvController").hide();
				
				//jsp 구조변경 끝gcSlideArea
				
				var slickDiv = $(".gvSlideArea").find(".item");
				if(slickDiv.length == 0){
					//imgSlide
					/*if($(".gvSlideArea").length) popSlide02();*/
				}else{
					for(var i =slickDiv.length; i > 0 ; i--){
						/*$('.gvSlideArea').slick('slickRemove',i-1);*/
						$('.gvSlideArea').slick('slickRemove',i-1);
					}
				}
				
				for(var i = 0; i < $collectionModify.selectImgList.length;i++){
					var paramInfo = JSON.parse($collectionModify.selectImgList[i].param_info);
					var item = '<div class="item" name="slickImage">';
					item += 		'<div class="rela">';
					item += 			'<a href="javascript:void(0)" class="showImg" onclick="$collectionModify.selectShowImage(this);"><img src="/upload/gallery/galleryView/'+paramInfo.fileName+'" onerror="this.src=\'/img/common/testimg01.png\'" width="100" height="62"/></a>'; //2017.03.22 수정모드일 때, 이미지가 작게 나오는 문제
					item += 			'<a href="javascript:void(0)" class="gdel" onclick="$collectionModify.galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
					item += 		'</div>';
					item += 	'</div>';
					
					$("#gvSlideArea").slick('slickAdd',item);
				}
				
				//이미지 추가 아이콘
				$("#imgSlideBox").after('<a href="javascript:void(0)" class="gadd" onclick="gadd();$collectionModify.selectBookMarkList();">맵추가</a>');
				$(".useSide").append('<div class="josaListEtcBox"><a onclick="javascript:$collectionModify.modifyUpdateDataSave();" class="btnGtype on" style="cursor:pointer;">저장</a></div>'); //2017.03.22 커서설정
				//현재 선택 이미지 조회
				$collectionModify.getImgIconList($collectionModify.selectId);
				
				if($(".josaListBoxScroll").length) $(".josaListBoxScroll").mCustomScrollbar({axis:"y"});
				if($(".gdContScrollBox").length) $(".gdContScrollBox").mCustomScrollbar({axis:"xy"});
				if($("#hashTag").length) $('#hashTag').tagsInput({width:'auto'});
				
				dragImageOn();
				
				$(".slick-track").sortable({
					connectWith :".slick-track",
					start : function(ev, ui){
						$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						$collectionModify.sortableImgIndex =$(ui.item).index(); // 시작 인덱스 
					},
					
					update : function(ev,ui){
						
						//바뀌게 될 selectIdx의 값을 구한다.
						if($collectionModify.selectImgIdx == $collectionModify.sortableImgIndex){
							//보여주고 있는 대상을 옮길 경우
							$collectionModify.selectImgIdx = $(ui.item).index();
						}else{
							//보여주고 있는 대상이 아닐경우
							if($(ui.item).index() > $collectionModify.sortableImgIndex){
								//뒤로 밀었을 경우
								if($collectionModify.selectImgIdx > $(ui.item).index()){
									//변경 없음
								}else{
									if($collectionModify.selectImgIdx != 0){
										$collectionModify.selectImgIdx = $collectionModify.selectImgIdx -1;
									}
								}
							}else if($(ui.item).index() < $collectionModify.sortableImgIndex){
								//앞으로 밀었을 경우
								if($collectionModify.selectImgIdx != $collectionModify.selectImgList.length-1){
									$collectionModify.selectImgIdx = $collectionModify.selectImgIdx +1;
								}else{
									
								}
							}
						}
						//ex 1 ) 0 1 2 3 4 5 의 배열에 4번이 2번의 위치에 들어갈때						
						//sortableImgIndex에 해당 하는 image와 iconList를 swap공간에 넣는다. 
						var swapImage = $collectionModify.selectImgList[$collectionModify.sortableImgIndex];
						var swapIconArray = $collectionModify.selectIconList[$collectionModify.sortableImgIndex];
						//ex 2 ) 0 1 2 3 5  //옮겨지는 곳의 배열을 제거						
						//해당 index의 배열을 제거 한다.
						$collectionModify.selectImgList.splice($collectionModify.sortableImgIndex,1);
						$collectionModify.selectIconList.splice($collectionModify.sortableImgIndex,1);

						//ex 3 ) 0 1 | 2 3 5 // 옮겨지는곳까지의 인덱스를 기준으로 배열을 짜른다.
						var firstImageArray = new Array();
						var firstIconArray = new Array();
						for(var i = 0; i <$(ui.item).index(); i++){
							firstImageArray.push($collectionModify.selectImgList[i]);
							firstIconArray.push($collectionModify.selectIconList[i]);
						}
						
						var secondImageArray = new Array();
						var secondIconArray = new Array();
						for(var i = $(ui.item).index(); i < $collectionModify.selectImgList.length; i++){
							secondImageArray.push($collectionModify.selectImgList[i]);
							secondIconArray.push($collectionModify.selectIconList[i]);
						}
						
						//ex 4) 가른곳에서 firstArray의 끝에 swapData를 삽입한다.
						firstImageArray.push(swapImage);
						firstIconArray.push(swapIconArray);
						
						//ex 5) 두개로 갈라진 배열을 하나로 합친다.
						$collectionModify.selectImgList = firstImageArray.concat(secondImageArray);
						$collectionModify.selectIconList = firstIconArray.concat(secondIconArray);
						
						//배열이 완성이 되었을경우 해당 IMG와 ICON에 넣어진 img_id들을 바꾸어준다.
						//기준 : 해당 Object의 data_id + _ + i
						for(var i = 0; i < $collectionModify.selectImgList.length; i++){
							var oriId = $collectionModify.selectImgList[i].data_id;
							$collectionModify.selectImgList[i].img_id = oriId +"_" + i;
							//이미지에 해당하는 icon의 img_id 역시 변경 한다.
							for(var j = 0; j < $collectionModify.selectIconList[i].length; j++){
								$collectionModify.selectIconList[i][j].img_id = oriId +"_" + i;
							}
						}
						
						$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						
						//$galleryAdd.selectIdx를 showGalleryImage 할때 문제 발생 .. 떨어진 ui.item.index 앞에 이미지의 아이콘이 덮침당함
						
						
					}
				});
				$("body").on("focus","input[name='surveySubject']",function(){
					//endSurveyTime
					var ck = $("#endSurveyTime").hasClass("on");
					if(!ck){
						$("#endSurveyTime").addClass("on");
						$(".calendarEtcBox").show();
					}
				});
				
				
				//2017.03.31 
				$("body").on("mouseover", ".gvSlideArea .item .rela", function() {
					$(this).find(".gdel").show();
					if ($collectionModify.selectImgList != undefined && $collectionModify.selectImgList.length == 1) {
						$(".gdel").hide();
					}
				});
				
				$("body").on("mouseout", ".gvSlideArea .item .rela", function() {
					$(this).find(".gdel").hide();
				});

			},
			
			//갤러리 추가할 목록
			selectBookMarkList : function(){
				var selectBook = new sop.portal.collectionBookMarkList.api();
				selectBook.request({
					method: "POST",
					async : false,
					url : contextPath +"/ServiceAPI/gallery/selectBookMarkList.json"
				});
			},
			//갤러리 목록 추가
			galleryItemAdd : function(amugerna,hist_id){
				var object = new Object();
				var param_info = new Object();
			
				object.fileName = $.trim(hist_id)+".png";
				object.api_call_url="";
				param_info.hist_id = $.trim(hist_id);
				param_info.type = "bookMark";
				param_info.fileName = $.trim(hist_id)+".png";
				object.param_info = JSON.stringify(param_info);
				object.data_id = $collectionModify.selectId;
				object.img_id = $collectionModify.selectId + "_"+$collectionModify.selectImgList.length;
				//object.data_id
				//object.img_id
				$collectionModify.selectImgList.push(object);
				$collectionModify.selectIconList.push(new Array());
				var item = '<div class="item" name="slickImage">';
				item += 		'<div class="rela">';
				item += 			'<a href="javascript:void(0)" class="showImg" onclick="$collectionModify.selectShowImage(this);"><img src="/upload/gallery/galleryView/'+param_info.fileName+'" onerror="this.src=\'/img/common/testimg01.png\'" width="100px" height="62px;" /></a>';
				item += 			'<a href="javascript:void(0)" class="gdel" onclick="$collectionModify.galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
				item += 		'</div>';
				item += 	'</div>';
				$('#gvSlideArea').slick('slickAdd', item);
				$(".gcFavBox").hide();
				$(".fovScrollBox").mCustomScrollbar('destroy');
				
				$(".slick-track").sortable({
					connectWith :".slick-track",
					start : function(ev, ui){
						$collectionModify.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						$collectionModify.sortableImgIndex =$(ui.item).index(); // 시작 인덱스 
					},
					update : function(ev,ui){
						//바뀌게 될 selectIdx의 값을 구한다.
						if($collectionModify.selectImgIdx == $collectionModify.sortableImgIndex){
							//보여주고 있는 대상을 옮길 경우
							$collectionModify.selectImgIdx = $(ui.item).index();
						}else{
							//보여주고 있는 대상이 아닐경우
							if($(ui.item).index() > $collectionModify.sortableImgIndex){
								//뒤로 밀었을 경우
								if($collectionModify.selectImgIdx > $(ui.item).index()){
									//변경 없음
								}else{
									if($collectionModify.selectImgIdx != 0){
										$collectionModify.selectImgIdx = $collectionModify.selectImgIdx -1;
									}
								}
							}else if($(ui.item).index() < $collectionModify.sortableImgIndex){
								//앞으로 밀었을 경우
								if($collectionModify.selectImgIdx != $collectionModify.selectImgList.length-1){
									$collectionModify.selectImgIdx = $collectionModify.selectImgIdx +1;
								}else{
									
								}
							}
						}
						
						//ex 1 ) 0 1 2 3 4 5 의 배열에 4번이 2번의 위치에 들어갈때						
						//sortableImgIndex에 해당 하는 image와 iconList를 swap공간에 넣는다. 
						var swapImage = $collectionModify.selectImgList[$collectionModify.sortableImgIndex];
						var swapIconArray = $collectionModify.selectIconList[$collectionModify.sortableImgIndex];
						console.log("swapArray ========");
						console.log(swapIconArray);
						//ex 2 ) 0 1 2 3 5  //옮겨지는 곳의 배열을 제거						
						//해당 index의 배열을 제거 한다.
						$collectionModify.selectImgList.splice($collectionModify.sortableImgIndex,1);
						$collectionModify.selectIconList.splice($collectionModify.sortableImgIndex,1);

						//ex 3 ) 0 1 | 2 3 5 // 옮겨지는곳까지의 인덱스를 기준으로 배열을 짜른다.
						var firstImageArray = new Array();
						var firstIconArray = new Array();
						console.log("firstArray ========");
						for(var i = 0; i <$(ui.item).index(); i++){
							firstImageArray.push($collectionModify.selectImgList[i]);
							console.log($collectionModify.selectIconList[i]);
							firstIconArray.push($collectionModify.selectIconList[i]);
						}
						
						var secondImageArray = new Array();
						var secondIconArray = new Array();
						console.log("secondArray ========");
						for(var i = $(ui.item).index(); i < $collectionModify.selectImgList.length; i++){
							secondImageArray.push($collectionModify.selectImgList[i]);
							console.log($collectionModify.selectIconList[i]);
							secondIconArray.push($collectionModify.selectIconList[i]);
						}
						
						//ex 4) 가른곳에서 firstArray의 끝에 swapData를 삽입한다.
						firstImageArray.push(swapImage);
						firstIconArray.push(swapIconArray);
						
						//ex 5) 두개로 갈라진 배열을 하나로 합친다.
						$collectionModify.selectImgList = firstImageArray.concat(secondImageArray);
						$collectionModify.selectIconList = firstIconArray.concat(secondIconArray);
						
						$galleryAdd.selectShowImage($(".showImg").eq($collectionModify.selectImgIdx));
						
						//$galleryAdd.selectIdx를 showGalleryImage 할때 문제 발생 .. 떨어진 ui.item.index 앞에 이미지의 아이콘이 덮침당함
						
						
					}
				});
			},
			
			//이미지 삭제
			galleryItemDel : function(o){
				var inx = $(o).index(".gdel");
				var slickImages = $("div[name='slickImage']");
				
				$(".gvSlideArea").slick("slickRemove",inx);
				$collectionModify.selectImgList.splice(inx,1);
				$collectionModify.selectIconList.splice(inx,1);
				
				//2017.03.31 썸네일 삭제 시, 이미지가 없을 때 default 이미지로 표출
				if ($collectionModify.selectImgList.length > 0) {
					if ($collectionModify.selectImgList[0].param_info != undefined) {
						var paramInfo = JSON.parse($collectionModify.selectImgList[0].param_info);
						var imageUrl;
						if (imageUrl != undefined && imageUrl.indexOf("data:image/") != -1) {
							$("#mapArea").attr("src", imageUrl);
							imageUrl = paramInfo.fileName;
						}else {
							imageUrl = "/upload/gallery/galleryView/" + paramInfo.fileName;
						}
						var image = new Image();
						image.src = imageUrl;
						image.onload = function() {
							var pWidth = $(".gcMap").width();
							var pHeight = $(".gcMap").height();
							this.width = (this.width * pHeight)/this.height;
							var margin = -(this.width - pWidth)/2;
							$("#mapArea").css("background-image", "url("+this.src+")");
							$("#mapArea").css({"width" : this.width + "px", "margin-left" : margin + "px"});
						};
						image.onerror = function() {
							$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
							$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
						};
					}
				}else {
					$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
					$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
				}
			},
			
			getImgIconList : function(data_id){
				var iconList = new sop.portal.getImgIconList.api();
				
				iconList.addParam("data_id", data_id);
				/*iconList.addParam("img_id", img_id);*/
				
				iconList.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/gallery/galleryImgIconListAll.json"
				});
			},
			selectShowImage : function(o){
				var idx = $(o).index(".showImg");
				if(idx == -1){
					idx =0;
				}
				//기존에 있던거 저장
				//아이콘을 저장하기
				for(var i = 0; i < $collectionModify.targetIconArray.length;i++){
					if($collectionModify.targetIconArray[i].icon_type=="2"){
						if($("#ico_"+i+" > div > textArea").val() != undefined){
							$collectionModify.targetIconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
						}
					}
				}
				$collectionModify.selectIconList[$collectionModify.selectImgIdx] = $collectionModify.targetIconArray;
				var selectImg = $collectionModify.selectImgList[idx];
				$collectionModify.selectImgIdx = idx;
				
				//2017.03.31 이미지 선택시, 찌그러짐 보정
				if (selectImg.param_info != undefined) {
					var paramInfo = JSON.parse(selectImg.param_info);	
					var image = new Image();
					image.src = "/upload/gallery/galleryView/" + paramInfo.fileName;
					image.onload = function() {
						var pWidth = $(".gcMap").width();
						var pHeight = $(".gcMap").height();
						this.width = (this.width * pHeight)/this.height;
						var margin = -(this.width - pWidth)/2;
						$("#mapArea").css("background-image", "url("+this.src+")");
						$("#mapArea").css({"width" : this.width + "px", "margin-left" : margin + "px"});
					};
					image.onerror = function() {
						$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
						$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
					};
				}else {
					$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
					$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
				}
				
				$("div[name='ico']").remove();
				$collectionModify.gridModifyIcon($collectionModify.selectIconList[idx]);
			},
			
			saveModifyIcon : function(){
				
			},
			
			gridModifyIcon : function(galleryImgIconListItem){
				$(".gviewMap").find(".imgIcon").each(function(){
					$(this).remove();
				})
				$collectionModify.targetIconArray = galleryImgIconListItem;
				for(var i = 0; i < galleryImgIconListItem.length; i++) {
					var imgIconSrc = "/img/ico/"+galleryImgIconListItem[i].icon_nm;
					var html ="";
					if("1" ==galleryImgIconListItem[i].icon_type){
						html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor)) +'px;left:'+Number(Number(galleryImgIconListItem[i].y_coor))+'px">';
						html +='<img src="';
						html +=imgIconSrc;
						html +='" class="mapIconCont"/>';
						html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>';
						html +="</div>";
						
					}else if("2" ==galleryImgIconListItem[i].icon_type){
						html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;top:'+galleryImgIconListItem[i].x_coor+'px;left:'+galleryImgIconListItem[i].y_coor+'px">'
						if(galleryImgIconListItem[i].icon_nm =="mal01" ){
							html +='<div class="mal01">';
						}else{
							html +='<div class="mal02">';
						}
						
						if(galleryImgIconListItem[i].exp != undefined){
							html +='<textarea class="malType">'+galleryImgIconListItem[i].exp+'</textarea></div>';
						}else{
							html +='<textarea class="malType">'+''+'</textarea></div>';
						}
						
						html +='<a href="javascript:$collectionModify.deleteIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>';
						html +='</div>';
					}
					
					$(".gviewMap").append(html);	
				}
				
				for(var i =0; i < galleryImgIconListItem.length; i++){
					dropImageEvent("#ico_"+i);
				}
				
			},
			
			deleteIcon : function(idx){
				$("#ico_"+idx).remove();
				for(var i =0; i < $collectionModify.targetIconArray.length; i++){
					var object = $collectionModify.targetIconArray[i];
					
					if(i== idx){
						$collectionModify.targetIconArray.splice(i,1);
					}
				}
			},
	
			makeModifyData : function(){
				//surveyData 정리
				//selectSurvey
				
				//imgList 정리
				//삭제 한거만 반영
				//현재 ICON 정리 start
				//기존에 있던거 저장
				//아이콘을 저장하기
				for(var i = 0; i < $collectionModify.targetIconArray.length;i++){
					if($collectionModify.targetIconArray[i].icon_type=="2"){
						if($("#ico_"+i+" > div > textArea").val() != undefined){
							$collectionModify.targetIconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
						}
					}
				}
				$collectionModify.selectIconList[$collectionModify.selectImgIdx] = $collectionModify.targetIconArray;
				//ICON 정리 END
				
				//설문조사 START
				
				if($.trim($("#surveySubject").val()) !=""){
					$collectionModify.selectSurvey.survey_title = $("#surveySubject").val();
					$collectionModify.selectSurvey.end_dt = $("#survey_surv_end_dt").val();
					
					$collectionModify.selectSurvey.surveyList = new Array();
					var ansList = $("input[name='ansDetail']");
					for(var i = 0; i < ansList.length ; i++ ){
						var ansObject = new Object;
						ansObject.ans_serial = i;
						ansObject.ans_content =ansList[i].value;
						$collectionModify.selectSurvey.surveyList[i] = ansObject;
					}
				}
				
				//설문조사 END
			},
			
			/**
			 * 
			 * @name         :insertDataValidate
			 * @description  :입력할데이터의 유효성 검사
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			insertDataValidate : function(){
				if($("#gallery_title").val() ==""){
					return false;
				}else if($("#applicationContent").val ==""){
					return false;
				}else if($collectionModify.selectImgList.length < 1){
					//이미지가 하나 이상 있는가?
					return false;
				}else{
					return true;
				}
					
			},
			
			
			/**
			 * 
			 * @name         :surveyDataValidate
			 * @description  :입력할데이터의 유효성 검사
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			surveyDataValidate : function(){
				//설문조사 제목
				//설문상세항목
				//설문항목에서 공백이 있는데이터는 지울까?
				var ansDetail = $("input[name='ansDetail']");
				if(ansDetail.length == 0 ){
					if($.trim($("input[name='surveySubject']").val()) ==""){
						return true;
					}
				}else{
					for(var i = 0; i < ansDetail.length; i++){
						if($.trim(ansDetail.val()) == ""){
							if(ansDetail.length > 1 && $.trim($("input[name='surveySubject']").val() != "")){
								return false;
							}
						}
					}
				}
				return true;
				
			},
			

			modifyUpdateDataSave : function(){
				$collectionModify.makeModifyData();
				var jsonImgList = new Object();
				jsonImgList.imgList = $collectionModify.selectImgList;
				var jsonIconList = new Object();
				jsonIconList.iconList = $collectionModify.selectIconList;
				
				
				var dataValidate = $collectionModify.insertDataValidate();
				if(dataValidate == false){
					messageAlert.open("알림","제목과 컨텐츠를 올바르게 입력 해주세요.");
					return;
				}
				
				var surveyValidate = $collectionModify.surveyDataValidate();
				if(surveyValidate == false){
					messageAlert.open("알림","설문조사 내용을 올바르게 입력해주세요.");
					return;
				}
				
				
				var srv_type = "";
				if($("#publicType").hasClass("on")){
					srv_type=1;
				}else{
					srv_type=3;
				}
				var surveyduplication = $("#surveyType").hasClass("on");
				
				var updateData = new sop.portal.modifyUpdateDataSave.api();
				updateData.addParam("data_id", $collectionModify.selectId);
				updateData.addParam("title",$("#modifyTitle").val());
				updateData.addParam("content",$(".gvTextArea").val());
				if($("#hashTag").val() !=""){
					updateData.addParam("tag",$("#hashTag").val());
				}
				
				if($("#endSurveyTime").hasClass("on")){
					if($.trim($("#survey_surv_end_dt").val()) != "" || $.trim($("#survey_surv_end_dt").val()) != null){
						updateData.addParam("survey_surv_end_dt",$("#survey_surv_end_dt").val());
					}else{
						updateData.addParam("survey_surv_end_dt","");
					}
				}
				
				
				
				updateData.addParam("survey",JSON.stringify($collectionModify.selectSurvey));
				updateData.addParam("imgList",JSON.stringify(jsonImgList));
				updateData.addParam("iconList",JSON.stringify(jsonIconList));
				updateData.addParam("srv_type",srv_type);
				updateData.addParam("surveyduplication",surveyduplication);
				//복수선택
				//공개여부
				
				updateData.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/gallery/updateGalleryData.json"
				});
				
			},
			
			removePollDetail : function(o){
				var delIdx = $(o).parents("li").eq(0).index();
				$('li[name="ansLi"]').eq(delIdx).remove();
				
				$collectionModify.selectSurvey.surveyList.splice(delIdx,1);
				
			},
			addPollDetail : function(){
				var html = "";
				html +='<li name="ansLi"><input type="text" name="ansDetail" placeholder="항목 입력" value=""/><a name="removePoll" href="javascript:void(0)" onclick="$collectionModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>';
				$(html).insertBefore("#surveyAdd_1");
				$("#surveyDetailUl").mCustomScrollbar('destroy');
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
			}
			
	
	};
	
	(function() {
		$class("sop.portal.getImgIconList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status,res){
				if(res.errCd =="0"){
					var result = res.result;
					
					$collectionModify.selectIconList = result;

					$collectionModify.targetIconArray = $collectionModify.selectIconList[$collectionModify.selectImgIdx];
					$collectionModify.selectShowImage($collectionModify.selectImgIdx);

				}
			},
			onFail : function(status){
				
			}
		});
	}());
	
	(function() {	
		$class("sop.portal.modifyUpdateDataSave.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status,res){
				/*collectionGallery.selectGalleryList();*/
				$collectionModify.that.selectGalleryList();
				$collectionModify.that.selectGalleryAllCountList(); //2017.03.24 조회수 수정
				$(".rightClose").trigger("click");
			},
			onFail : function(status){
				
			}
		});
		
	}());
	
	
	(function(){
		$class("sop.portal.collectionBookMarkList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				switch(parseInt(res.errCd)){
					case 0 : 
						/*
						 * 	hist_id : "5uIHoEqMGo20160902145104676MHwtnIGCzL"
							hist_nm : "사업체수"
							hist_type : "BMARK"
							map_type : "IMAP"
							member_id : "choijy"
							reg_ts : "2016-09-02 14:42:07.4976"
						 * */
						
						/*
						 * <tr>
								<td><img src="/img/pic/pic_testmap02.jpg" width="30"
										height="20" /></td>
								<td class="al"><a href="javascript:void(0)" class="gwon02"
										onclick="galleryItemAdd('경기도-65세 남자인구')">경기도-65세 남자인구</a></td>
								<td>2016.08.12</td>
							</tr>
								
						 * */
						$("#bookMarkList >tbody> tr").html('');
						var resList = res.result.resultList;
						for(var i = 0 ; i < resList.length; i++ ){
							var object = resList[i];
							var html = "<tr>";
							/*html +='<td><img src="/img/pic/pic_testmap02.jpg" width="30" height="20" /></td>';*/
							html +='<td><img src="/upload/gallery/galleryView/'+$.trim(object.hist_id)+'.png" onerror="/img/pic/pic_testmap02.jpg" width="30" height="20" /></td>';
							html +='<td class="al"><a href="javascript:void(0)" class="gwon02" onclick="$collectionModify.galleryItemAdd(\''+object.hist_nm+'\',\''+object.hist_id+'\')">'+object.hist_nm+'</a></td>'
							html +='<td>'+object.reg_ts.substring(0,4)+'.'+object.reg_ts.substring(5,7)+'.'+object.reg_ts.substring(8,10)+'</td>';
							html +='</tr>';
							$("#bookMarkList > tbody").append(html);
						}
						
						
						break;
					case -401 : 
						break;
					case -100 : 
						break;
					default : 
						break;
				}
			},
			onFail : function(status,option){
				
			}
		})
	}());
	
	
}(window, document));