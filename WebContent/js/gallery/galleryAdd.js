/**
 * galleryAdd 
 * history : 네이버시스템(주), 1.0, 2016/08/29  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 */

$(function(){  
	datePicker();
	dragImageOn();
	$('#hashTag').tagsInput({width:'auto'});
	if($(".gcSlideArea").length) popSlide01();
	//surveySubject
	$("body").on("focus","input[name='surveySubject']",function(){
		//endSurveyTime
		var ck = $("#endSurveyTime").hasClass("on");
		if(!ck){
			$("#endSurveyTime").addClass("on");
			$(".calendarEtcBox").show();
		}
	});
});

function datePicker(){
	$( ".date" ).datepicker({
      showOn: "button",
      buttonImage: "/img/ico/ico_calendar.png",
      buttonImageOnly: true,
      buttonText: "Select date",
      dateFormat : "yy-mm-dd"
    });
	
	
	if($("#survey_surv_end_dt").val() == "" || $("#survey_surv_end_dt").val() == null || $("#survey_surv_end_dt").val() =="1900-01-01"){
		var ck = $("#endSurveyTime").hasClass("on");
		/*if(!ck){
			$("#endSurveyTime").addClass("on");
			$(".calendarEtcBox").show();
		}*/
		
		var evt = $("#endSurveyTime").attr("data-event");
		var date = new Date();
		date.setDate(date.getDate() + 7);
		var end_dt_str = date.getFullYear() + "-" + leadingZeros((date.getMonth()+1),2) +"-" + leadingZeros(date.getDate(),2);
		$("#survey_surv_end_dt").val(end_dt_str);
	}
}

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
			var idx = $galleryAdd.iconArray.length;
			var positionTop = Number(ui.position.top+204); //원래값 173
			var positionLeft = Number(ui.position.left + margin); //원래값 20 //2017.04.03 말풍선 위치보정
			var imgSrc, imgSrcSplit;
			
			
			
			var className = ui.draggable.attr("class");
			
			//처음 아이콘영역에서 특정 아이콘 드래그 시
			if (className.indexOf("imgIcon") != -1 || className.indexOf("imgTextArea") != -1) {
				imgSrc = ui.draggable.attr("src");
				imgSrcSplit = imgSrc.split("/");	
				srcFileName = imgSrcSplit[imgSrcSplit.length-1];
	
				var html="";
				if(srcFileName =="ico_mal01.png" || srcFileName =="ico_mal02.png"){
					imgObj.type =2;
					if(srcFileName =="ico_mal01.png"){
						html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
						html +='<div class="mal01">';
						html +='<textarea class="malType" style="overflow:hidden"></textarea></div>';
						html +='<a href="javascript:$galleryAdd.removeIcon('+idx+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a></div>';
							
						
					}else{
						html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
						html +='<div class="mal02">';
						html +='<textarea class="malType" style="overflow:hidden"></textarea></div>';
						html +='<a href="javascript:$galleryAdd.removeIcon('+idx+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a></div>';
					}
				}else{
					imgObj.type =1;
					html = '<div class="mapIconBox" name="ico" id="ico_'+idx+'" >';
					html +='<img src="';
					html += imgSrc;
					html +='" class="mapIconCont"/>';
					html +='<a href="javascript:$galleryAdd.removeIcon('+idx+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>';
					html +="</div>";
				}
				
				//console.log("positionTop = "+positionTop);
				//console.log("positionLeft = "+positionLeft);
				$("#mapArea").append(html);
				$("#ico_"+idx).css({
					"z-index" : "20000",
					"position" : "absolute",
					"top" : positionTop + "px",
					"left" : positionLeft + "px"
				});
				
				imgObj.positionTop = positionTop;
				imgObj.positionLeft = positionLeft;
				imgObj.imgSrc = ui.draggable.attr('src');
				imgObj.srcFileName = srcFileName;
				imgObj.seqId = idx;
				imgObj.html = html;
				imgObj.exp = '';
				
				
				$galleryAdd.iconArray.push(imgObj);
			}else { //드랍한 후에 드래그 시
				for (var i=0; i<$galleryAdd.iconArray.length; i++) {
					/*if ($galleryAdd.iconArray[i].seqId == idx) {*/
					if ("ico_"+i == ui.draggable.attr('id')) {
						$galleryAdd.iconArray[i].positionTop = positionTop-204;
						$galleryAdd.iconArray[i].positionLeft = positionLeft-21;
						break;
					}
				}
			}

			dropImageEvent("#ico_"+idx);
		}
	})
}

function dropImageEvent(id){
	if ($(id).data("draggable")) {
		$(id).draggable("destroy");
	}
	
	$(id).draggable({
		containment : "parent",
	});
}

//2017.04.03 중복코드 삭제
/*function supportPahtValue(){
	
	//no	아이콘명	값(insert)	의미						URL
	//1	ico_gwon01	B0			생활업종 통계지도(창업통계)		/view/bizStats/bizStatsMap
	//2	ico_gwon02	J0			살고싶은 우리동네			/view/house/houseAnalysisMap
	//3	ico_gwon03	A0			대화형 통계지도				/view/map/interactiveMap
	//4	ico_gwon04	C0			통계주제도					/view/thematicMap/thematicMapMain
	//5	ico_gwon05	T0			기술업종
	//6 ico_gwon06  E0			활용사례
	
	var path = $(location).attr('pathname');
	var pathSplit = path.split("/");
	var returnStr = "";

	if (path.indexOf("thematicMap") != -1) {
		returnStr = "C0"
	}else {
		switch(pathSplit[3]){
			case 'bizStatsMap' : returnStr = "B0";
				break;
			case 'houseAnalysisMap' : returnStr = "J0"; 
				break;
			case 'interactiveMap' : returnStr = "A0";
				break;
			case "technicalBizMap" : returnStr = "T0"; //2017.04.03
				break;
			case "resultGallery" : returnStr = "G0" //2107.04.03
				break;
			case 'thematicMapMain' : returnStr = "C0";
				break;
			default : returnStr = "E0";
				break;
		}
	}
	
	
	
	return returnStr;
}*/

//2017.04.03 중복코드 삭제
/*function supportImgValue(codeValue){
	var returnStr = "";
	switch(codeValue){
		case 'B0' : 	returnStr = 'gw01';
			break;
		case 'J0' : 	returnStr = 'gw02';
			break;
		case 'A0' : 	returnStr = 'gw03';
			break;
		case 'C0' : 	returnStr = 'gw04';
			break;
		default : 		returnStr = 'gw05'; 
		
	}
	return returnStr;
}*/

(function(W,D){
	W.$galleryAdd = W.$galleryAdd || {};
	
	$galleryAdd.ui = {
			
			
	}; 
	
	$galleryAdd = {
			selectIdx : 0,
			imageArray : new Array(),
			iconArray : new Array(),
			iconList : new Array(),
			hist_id : null,
			delegate : null,
			map : null,
			sortableImgIndex : null,
			
			/**
			 * 
			 * @name         : 북마크 리스트 추가 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			addBookMarkList : function(dataList){
				$galleryAdd.writeGalleryPopOpen();
				for(var i = 0 ; i < dataList.length ; i ++ ){
					//console.log(dataList[i]);
					$galleryAdd.galleryItemAdd("",dataList[i]);
				}
				$galleryAdd.showGalleryImage($(".showImg").eq(0));
				
			},
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			houseGalleryPopOpen : function(){
				$("#myGalleryPop").show();
			},
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			interactiveGalleryPopOpen : function(){
				$("#myGalleryPop").show();
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			interactiveGalleryPopHide : function(){
				$("#myGalleryPop").hide();
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			interactiveMyGalleryDialogPopOpen : function(){
				//$("#myGalleryDialog").show();
				$galleryAdd.writeGalleryPopOpen();
			},
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			writeGalleryPopOpen : function(type){
				
				
				//첫번째 이미지 관련 URL 생성후 전송
				//분기문 만들기
				
				var path = $(location).attr('pathname');
				var pathSplit = path.split("/");
				
				if(pathSplit.length >3 && pathSplit[3] == "resultGallery"){
					$("#myGalleryDialog").hide();
					$("#galleryWritePop").show();
				}else if(pathSplit.length >3 && pathSplit[3] == "bookMarkGallery"){
					$("#myGalleryDialog").hide();
					$("#galleryWritePop").show();
				}else{
					if(this.delegate.mapList[this.delegate.curMapId].shareInfo.shareUrlInfo.length != 0){
						$("#myGalleryDialog").hide();
						if (AuthInfo.authStatus){
							$("#galleryWritePop").show();
						}
						var id = parseInt(this.delegate.curMapId)+1;
						this.delegate.doBookMark(id, "gallary");
					}else{
						messageAlert.open("알림", "통계조회후 사용하실수 있습니다.");
					}
					
					//$galleryAdd.makeImageURL();
					
				}
				
			
				/*$galleryAdd.makeFirstData();*/
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			writeGalleryHide : function(){
				$("#galleryWritePop").hide();
				$galleryAdd.refreshGalleryPop();
			},
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			refreshGalleryPop : function(){
				$galleryAdd.selectIdx = 0;
				$galleryAdd.imageArray = new Array();
				$galleryAdd.iconArray = new Array();
				$galleryAdd.iconList = new Array();
				
				/*$("#gcSlideArea").html('');*/
				var slickDiv = $("#gcSlideArea").find(".item");
				for(var i =slickDiv.length; i > 0 ; i--){
					$('.gcSlideArea').slick('slickRemove',i-1);  
				}
				
				
				$("#gallery_title").val('');
				$("#applicationContent").val('');
				$("#hashTag_tagsinput").val('');
				$("#surveySubject").val('');
				$("#surveyDetailUl").html("<li><input type='text' placeholder='항목 입력'/></li><li id='surveyAdd_1'><a href='javascript:$galleryAdd.addSurveyDetail(1)'>+ 항목추가</a></li>");
				
				$("#survey_surv_end_dt").html('');
				$("#calendarEtcBox").hide();
				$("#endSurveyTime").removeClass("on");
				$("#surveyType").removeClass("on");
				
				
			},
			
			deleteCaptureImage : function(){
				//생성되었던 미리보기 파일과 id를 삭제
				//$galleryAdd.hist_id
				var deleteHist = new sop.openApi.deleteHist.api();
				deleteHist.addParam("hist_id",$galleryAdd.hist_id);
				deleteHist.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/gallery/DeleteGalleryHist.json",
					options : {}
				});
			},
			
			
			
			makeImageURL : function(type, captureTargetId){
				$galleryAdd.onBlockUIPopup();
				
				var shareInfo = this.map.shareInfo;
				var shareData = shareInfo.shareUrlInfo;
				var title = "갤러리등록";	
				
				var hist_id = makeRandomThirtySevenDigitString();
				var hist_type = "gcap";
				var map_type = type;
				var params = JSON.stringify(shareData);
				var hist_nm = title;
				
				if (map_type == null || map_type == undefined) {
					map_type = "IMAP";
				}
				
				var captureImage = new sop.openApi.imageCapture.api();
				captureImage.addParam("hist_id",hist_id);
				captureImage.addParam("hist_type",hist_type);
				captureImage.addParam("map_type",map_type);
				captureImage.addParam("params",params);
				captureImage.addParam("hist_nm",hist_nm);
				captureImage.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/member/RegStatisticsHistory.json",
					options : {
						shareData : shareData,
						captureTargetId : captureTargetId
					}
				});
			},
			
			doCapture : function(targetId, fileName, callback) {
				var center = this.map.gMap.getCenter();
            	var zoom = this.map.gMap.getZoom();
            	this.map.gMap._resetView(center, zoom);
            	
            	//2017.03.14 svg처리
				//시도별 기술업종지도 차트가 i.e에서 제대로 처리되지 않는 문제 해결
         		var mapContainer = $(targetId).find(".sop-marker-pane");		
				var svgElements = $(mapContainer).find('svg');
			    svgElements.each(function() {
			        var canvas, xml;
			        canvas = document.createElement("canvas");
			        canvas.className = "screenShotTempCanvas";
			        xml = (new XMLSerializer()).serializeToString(this);
			        xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
			        canvg(canvas, xml);
			        
			        var marginLeft = (canvas.width - $(targetId).width())/2;
                    var marginTop = (canvas.height - $(targetId).height())/2;
                    
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(canvas, -marginLeft, -marginTop, canvas.width, canvas.height);
			        
			        $(canvas).insertAfter(this);
			        $(this).attr('class', 'tempHide');
			        $(this).hide();
			     });

            	//2017.02.22 이미지캡쳐 수정
				//==================================================================================================================================//
            	setTimeout(function() {
            		if( Object.prototype.toString.call(targetId) === '[object Array]' ) {
            			var canvasList = [];
            			for (var i=0; i<targetId.length; i++) {
            				var capture = html2canvas($(targetId[i]), {
                                logging: false,
                                useCORS: false,
                                proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
                                onrendered : function(canvas, id) {
                                	//익스플로러 예외처리
                                	//2017.03.14 svg처리
                                	/*var agent = navigator.userAgent.toLowerCase();
        	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        	                     		var doc = document.querySelector(id.selector); //2017.03.09 보고서 수정
        	                     		var mapContainer = null;
        	                     		for (var x=0; x<doc.childNodes.length; x++) {
        	                     			var tmpClassName = doc.childNodes[x].className;
        	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
        	                     				mapContainer = doc.childNodes[x];
        	                     				break;
        	                     			}
        	                     		}
        	                     		if (mapContainer != null) {
        	                     			var svgList = mapContainer.querySelectorAll("svg");
        		                     		for (var x=0; x<svgList.length; x++) {
        		                     			var svg = svgList[x];
        		                     			var xml  = new XMLSerializer().serializeToString(svg);
        			                            var tmpCanvas = document.createElement("canvas");
        			                            canvg(tmpCanvas, xml);
        			                            var marginLeft = (tmpCanvas.width - canvas.width)/2;
        			                            var marginTop = (tmpCanvas.height - canvas.height)/2;
        			                            var ctx = canvas.getContext("2d");
        			                            ctx.drawImage(tmpCanvas, -marginLeft, -marginTop, tmpCanvas.width, tmpCanvas.height);
        		                     		}
        	                     		}
        	                     	}*/
                                	canvasList.push(canvas); 
                                	if (canvasList.length == targetId.length) {
                                		var targetCanvas = document.createElement("canvas");
                                		var width = canvas.width;
                                		var height = canvas.height;
                                		var dx = 0, dy = 0;
                                		targetCanvas.width = canvas.width *2;
                                		targetCanvas.height = canvas.height;
                                		var ctx = targetCanvas.getContext("2d");
                            			for (var x=0; x<canvasList.length; x++) {
                            				if (x != 0) {
                            					dx += width;
                            				}
                            				ctx.drawImage(canvasList[x], dx, dy, width, height);
                            			}
                            			
                            			var data = targetCanvas.toDataURL();  
                            			$galleryAdd.makeFirstData(data, fileName, canvas);
                                       	$galleryAdd.onBlockUIClose();
                                       	if (callback != undefined && callback != null && callback instanceof Function) {
                   							callback.call(undefined, data);
                   						}
                                	}
                                	
                                }
                            });
            			}
            		}else {
            			var capture = html2canvas($(targetId), {
                            logging: false,
                            useCORS: false,
                            proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
                            onrendered : function(canvas) {
                            	//익스플로러 예외처리
                            	//2017.03.14 svg처리
                            	/*var agent = navigator.userAgent.toLowerCase();
    	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
    	                     		var doc = document.querySelector(targetId); 
    	                     		var mapContainer = null;
    	                     		for (var i=0; i<doc.childNodes.length; i++) {
    	                     			var tmpClassName = doc.childNodes[i].className;
    	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
    	                     				mapContainer = doc.childNodes[i];
    	                     				break;
    	                     			}
    	                     		}
    	                     		if (mapContainer != null) {
    	                     			var svgList = mapContainer.querySelectorAll("svg");
    		                     		for (var i=0; i<svgList.length; i++) {
    		                     			var svg = svgList[i];
    		                     			var xml  = new XMLSerializer().serializeToString(svg);
    			                            var tmpCanvas = document.createElement("canvas");
    			                            canvg(tmpCanvas, xml);
    			                            var marginLeft = (tmpCanvas.width - canvas.width)/2;
    			                            var marginTop = (tmpCanvas.height - canvas.height)/2;
    			                            var ctx = canvas.getContext("2d");
    			                            ctx.drawImage(tmpCanvas, -marginLeft, -marginTop, tmpCanvas.width, tmpCanvas.height);
    		                     		}
    	                     		}
    	                     	}
                            	*/
	                           	var data = canvas.toDataURL();  
	                           	$galleryAdd.makeFirstData(data, fileName, canvas);
	                           	$galleryAdd.onBlockUIClose();
	                           	if (callback != undefined && callback != null && callback instanceof Function) {
	       							callback.call(undefined, data);
	       						}
                            }
                        });
            		}
            	}, 300);
				//==================================================================================================================================//
                
			},
			
			
			makeFirstData : function(base64Str, fileName, canvas){
				var object = new Object();
				var paramInfo = new Object();
				var path = $(location).attr('pathname');
				var pathSplit = path.split("/");
				
				object.fileName = base64Str;
				object.APIURL = pathSplit[3];
				paramInfo.type = pathSplit[3];
				paramInfo.fileName = fileName+".png";
				object.paramInfo = paramInfo;
				$galleryAdd.imageArray.push(object);
								
				var item = '<div class="item" name="slickImage">';
				item += 		'<div class="rela">';
				item += 			'<a href="javascript:void(0)" class="showImg" onclick="$galleryAdd.showGalleryImage(this);"><img src="/img/pic/pic_testmap01.png" onerror="this.src=\'/img/common/testimg01.png\'" width="100px" height="62px;" /></a>';
				item += 			'<a href="javascript:void(0)" class="gdel" onclick="$galleryAdd.galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
				item += 		'</div>';
				item += 	'</div>';

				$('#gcSlideArea').slick('slickAdd', item);
				$("div[name='slickImage']:eq(0) .rela .showImg img").attr('src',base64Str);
				
				var originWidth = canvas.width;
            	var originHeight = canvas.height;
            	var w = $("#mapArea").parent().width();
            	var h = $("#mapArea").parent().height();
            	
            	/*var scaleWidthValue = (originWidth / w).toFixed(2);
 	 			var scaleHeightValue = (originHeight / h).toFixed(2);
 	 			var scaleWidth = (w / originWidth) + 0.15;
 	 			var scaleHeight = (h / originHeight);
 	 			
 	 			var captureCss = {
	 	 				"width" : originWidth+"px",
		 	 			"height" : originHeight+"px",
		 	 			"overflow":"hidden",
		 	 			"margin-left" : ((originWidth -w)*-1) / 2 + "px",
		 	 			"margin-top" : ((originHeight - h)*-1) / 2 + "px"
	 	 		};
 	 			
 	 			if(originWidth < w) {
 	 				captureCss["transform"] = "scale("+scaleHeight+", "+scaleHeight+")";
 	 			} else {
 	 				captureCss["transform"] = "scale("+scaleWidth+", "+scaleHeight+")";
 	 			}
 	 			$("#mapArea").css(captureCss);
 	 			$("#mapArea").attr("src", base64Str);*/
            	
            	//2017.03.31 갤러리 등록팝업창에서 썸네일 이미지 클릭시, 이미지 변경 안되는 현상
				var originWidth = canvas.width;
            	var originHeight = canvas.height;
            	var w = $("#mapArea").parent().width();
            	var h = $("#mapArea").parent().height();

            	var tmpWidth = (originWidth * h) / originHeight;
            	var margin = -(tmpWidth - w)/2;
				$("#mapArea").css("background-image", "url("+base64Str+")");
				$("#mapArea").css({
					"width" : tmpWidth + "px",
					"margin-left" : margin + "px"
				});
            	
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			galleryItemAdd : function(amugerna,hist_id){
				var object = new Object();
				var paramInfo = new Object();
			
				object.fileName = $.trim(hist_id)+".png";
				object.APIURL="";
				paramInfo.hist_id = $.trim(hist_id);
				paramInfo.type = "bookMark";
				paramInfo.fileName = $.trim(hist_id)+".png";
				object.paramInfo = paramInfo;
				
				$galleryAdd.imageArray.push(object);
				
				var item = '<div class="item" name="slickImage">';
				item += 		'<div class="rela">';
				item += 			'<a href="javascript:void(0)" class="showImg" onclick="$galleryAdd.showGalleryImage(this);"><img src="/upload/gallery/galleryView/'+paramInfo.fileName+'" onerror="this.src=\'/img/common/testimg01.png\'" width="100px" height="62px;" /></a>';
				item += 			'<a href="javascript:void(0)" class="gdel" onclick="$galleryAdd.galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
				item += 		'</div>';
				item += 	'</div>';
				/*$('.gcSlideArea').slick('slickAdd', item);*/
				/*$('#gcSlideArea').append(item);*/
				$('#gcSlideArea').slick('slickAdd', item);
				$(".gcFavBox").hide();
				$(".fovScrollBox").mCustomScrollbar('destroy');
				
				$(".slick-track").sortable({
					connectWith :".slick-track",
					start : function(ev, ui){
						$galleryAdd.showGalleryImage($(".showImg").eq($galleryAdd.selectIdx));
						$galleryAdd.sortableImgIndex =$(ui.item).index(); // 시작 인덱스 
					},
					update : function(ev,ui){
						
						//바뀌게 될 selectIdx의 값을 구한다.
						//console.log("selectIDx = " + $galleryAdd.selectIdx + "선택된 IDX = " +$galleryAdd.sortableImgIndex +" 장소 IDX = " + $(ui.item).index());
						if($galleryAdd.selectIdx == $galleryAdd.sortableImgIndex){
							//보여주고 있는 대상을 옮길 경우
							$galleryAdd.selectIdx = $(ui.item).index();
						}else{
							//보여주고 있는 대상이 아닐경우
							if($(ui.item).index() > $galleryAdd.sortableImgIndex){
								//뒤로 밀었을 경우
								if($galleryAdd.selectIdx > $(ui.item).index()){
									//변경 없음
								}else{
									if($galleryAdd.selectIdx != 0){
										$galleryAdd.selectIdx = $galleryAdd.selectIdx -1;
									}
								}
							}else if($(ui.item).index() < $galleryAdd.sortableImgIndex){
								//앞으로 밀었을 경우
								if($galleryAdd.selectIdx != $galleryAdd.imageArray.length-1){
										$galleryAdd.selectIdx = $galleryAdd.selectIdx +1;
								}else{
									
								}
							}
						}
						//console.log("바뀐 Index =" + $galleryAdd.selectIdx);
						//ex 1 ) 0 1 2 3 4 5 의 배열에 4번이 2번의 위치에 들어갈때						
						//sortableImgIndex에 해당 하는 image와 iconList를 swap공간에 넣는다. 
						var swapImage = $galleryAdd.imageArray[$galleryAdd.sortableImgIndex];
						var swapIconArray = $galleryAdd.iconList[$galleryAdd.sortableImgIndex];
						//console.log("swapArray ========");
						//console.log(swapIconArray);
						//ex 2 ) 0 1 2 3 5  //옮겨지는 곳의 배열을 제거						
						//해당 index의 배열을 제거 한다.
						$galleryAdd.imageArray.splice($galleryAdd.sortableImgIndex,1);
						$galleryAdd.iconList.splice($galleryAdd.sortableImgIndex,1);

						//ex 3 ) 0 1 | 2 3 5 // 옮겨지는곳까지의 인덱스를 기준으로 배열을 짜른다.
						var firstImageArray = new Array();
						var firstIconArray = new Array();
						//console.log("firstArray ========");
						for(var i = 0; i <$(ui.item).index(); i++){
							firstImageArray.push($galleryAdd.imageArray[i]);
							//console.log($galleryAdd.iconList[i]);
							firstIconArray.push($galleryAdd.iconList[i]);
						}
						
						var secondImageArray = new Array();
						var secondIconArray = new Array();
						//console.log("secondArray ========");
						for(var i = $(ui.item).index(); i < $galleryAdd.imageArray.length; i++){
							secondImageArray.push($galleryAdd.imageArray[i]);
							//console.log($galleryAdd.iconList[i]);
							secondIconArray.push($galleryAdd.iconList[i]);
						}
						
						//ex 4) 가른곳에서 firstArray의 끝에 swapData를 삽입한다.
						firstImageArray.push(swapImage);
						firstIconArray.push(swapIconArray);
						
						//ex 5) 두개로 갈라진 배열을 하나로 합친다.
						$galleryAdd.imageArray = firstImageArray.concat(secondImageArray);
						$galleryAdd.iconList = firstIconArray.concat(secondIconArray);
						
						$galleryAdd.showGalleryImage($(".showImg").eq($galleryAdd.selectIdx));
						
						//$galleryAdd.selectIdx를 showGalleryImage 할때 문제 발생 .. 떨어진 ui.item.index 앞에 이미지의 아이콘이 덮침당함
						
						
						
						
					}
				});
				
				//console.log($galleryAdd.imageArray);
				
				if($galleryAdd.imageArray.length == 1){
					//showImg
					//$galleryAdd.showGalleryImage(this);
					$galleryAdd.showGalleryImage($(".showImg").eq(0));
				}
				
				
				/*if($(".gcSlideArea").length){
					popSlide01();
				}*/ 
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			galleryItemDel : function(o){
				var inx = $(o).index(".gdel");
				var slickImages = $("div[name='slickImage']");

				$("#gcSlideArea").slick("slickRemove",inx);
				$galleryAdd.imageArray.splice(inx,1);
				$galleryAdd.iconList.splice(inx,1);
				
				//2017.03.31 썸네일 삭제 시, 이미지가 없을 때 default 이미지로 표출
				if ($galleryAdd.imageArray.length > 0) {
					var imageUrl;
					if (imageUrl != undefined && imageUrl.indexOf("data:image/") != -1) {
						$("#mapArea").attr("src", imageUrl);
						imageUrl = $galleryAdd.imageArray[0].fileName;
					}else {
						imageUrl = "/upload/gallery/galleryView/"+$galleryAdd.imageArray[0].fileName;
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
				}else {
					$("#mapArea").css("background-image", "url('/img/pic/pic_testmap02.jpg')");
					$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
				}
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			showGalleryImage : function(o){
				var inx = $(o).index(".showImg");
				var slickImages = $("div[name='slickImage']");				
				//현재 있는것을 selectIdx의 배열에
				//그리고 넣기전에 exp 설정
				for(var i = 0; i < $galleryAdd.iconArray.length; i ++){
					if($galleryAdd.iconArray[i].type =="2"){
						$galleryAdd.iconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
					}
				}
				$galleryAdd.iconList[$galleryAdd.selectIdx] = $galleryAdd.iconArray;
				//삭제
				$("div[name='ico']").remove();
				$galleryAdd.iconArray = new Array();
				$galleryAdd.selectIdx = inx;
				
				var showIconList = $galleryAdd.iconList[inx];
				if(showIconList != undefined){
					for(var i = 0; i<showIconList.length; i ++){
						var pointObject = showIconList[i];
						var html ="";
						if(pointObject.type =="2"){
							if(pointObject.srcFileName =="ico_mal01.png"){
								html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;margin-top:'+pointObject.positionTop+'px;margin-left:'+pointObject.positionLeft+'px">'
								html +='<div class="mal01">';
								html +='<textarea class="malType">'+pointObject.exp+'</textarea></div>';
								html +='<a href="javascript:$galleryAdd.removeIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a></div>';
							}else{
								html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;margin-top:'+pointObject.positionTop+'px;margin-left:'+pointObject.positionLeft+'px">'
								html +='<div class="mal02">';
								html +='<textarea class="malType">'+pointObject.exp+'</textarea></div>';
								html +='<a href="javascript:$galleryAdd.removeIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a></div>';
							}
						}else{							
							html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;margin-top:'+pointObject.positionTop+'px;margin-left:'+pointObject.positionLeft+'px">';
							html +='<img src="';
							
							//imgSrc
							/*html +=pointObject.srcFileName;*/
							html +=pointObject.imgSrc;
							html +='" class="mapIconCont"/>';
							html +='<a href="javascript:$galleryAdd.removeIcon('+i+');" class="mapIconClose"><img src="/img/ico/ico_del02.png" /></a>'
							html +="</div>";
						}
						$("#mapArea").append(html);
					}
					$galleryAdd.iconArray = $galleryAdd.iconList[inx];
					
				}
				
				//console.log($galleryAdd.imageArray);
				//console.log("inx = " + inx);
				var imageUrl = $galleryAdd.imageArray[inx].fileName;
				
				
				
				var path = $(location).attr('pathname');
				var pathSplit = path.split("/");
				var tmpImageURL;
				
				//2017.03.31 썸네일 이미지 선택 시, 이미지 변경 안되는 현상
				//==================================START===================================//
				if (pathSplit.length > 3){
					if (pathSplit[3] == "resultGallery" || pathSplit[3] == "bookMarkGallery"){
						$(".btnPen").show();
						tmpImageURL = "/upload/gallery/galleryView/"+imageUrl;
					}else {
						if (imageUrl != undefined && imageUrl.indexOf("data:image/") != -1) {
							tmpImageURL = imageUrl;
						}else {
							tmpImageURL = "/upload/gallery/galleryView/"+imageUrl;
						}
					}
				}else {
					if (imageUrl != undefined && imageUrl.indexOf("data:image/") != -1) {
						tmpImageURL = imageUrl;
					}else {
						tmpImageURL = "/upload/gallery/galleryView/"+imageUrl;
					}
				}
				
				var image = new Image();
				image.src = tmpImageURL;
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
				//==================================END===================================//
			},
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			writeGalleryUseCase : function(){
				location.href="/view/gallery/writeGalleryUseCase";
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			referenceFileEvent : function(){
				var calcId = $galleryAdd.calcIdxNumber("refFiles[]" ,"ref")
				var html = '<input type="file" name="refFiles[]" onchange="dataItemAdd(this)" class="hidden"/>';
				$("#refFiles").append(html);
				$('input[name="refFiles[]"]:last').trigger("click");
			},
			
			removeIcon : function(idx){
				$("#ico_"+idx).remove();
				for(var i =0; i < $galleryAdd.iconArray.length; i++){
					var object = $galleryAdd.iconArray[i];
					
					if(object.seqId == idx){
						$galleryAdd.iconArray.splice(i,1);
					}
				}
			},
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			calcIdxNumber : function(selectName,selectId){
				var nameArrayLength = $("input[name='"+selectName+"']").length;
				return nameArrayLength;
			},
			
			
			
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			imageUploadAndPreView : function(input){
				if (input.files && input.files[0]) {
		            var reader = new FileReader();            
		            reader.onload = function (e) {
		            	$("#viewText").remove();
		            	$("#preViewImage").show();
		            	$("#preViewImage").css("position","absolute");
		            	$("#preViewImage").css("display","block");
		            	$("#preViewImage").css("top","0px");
		                $('#target').attr('src', e.target.result);
		            }
		            
		            reader.readAsDataURL(input.files[0]);
		        }
			},
			
			screenCapture : function(){
				 /*var myImage = $("canvas");
				 myImage.src = canvas.toDataUrl();
				 //console.log(myImage);*/
				/*var canvas = $("canvas");*/
				
				var slides = $("img[name='slide']");
				var slideSrc = new Array();
				/*for(var i =0; i < slides.length; i ++){
					//console.log(slides[i]);
					var reader = new FileReader();
				}*/
				slideSrc.push("/img/pic/pic_testmap02.jpg");
			} ,
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			gridUploadView : function(saveName){
				$("#preViewImage").append("<img src='/upload/gallery/preView/"+saveName+"'></img>");
			},
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			addSurveyDetail : function(idx){
				var html ='<li name="ansLi"><input type="text" name="ansDetail" placeholder="항목 입력" value=""/><a name="removePoll" href="javascript:void(0)" onclick="$galleryAdd.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>'; 
				$(html).insertBefore("#surveyAdd_"+idx);
				$("#surveyDetailUl").mCustomScrollbar('destroy');
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
				/*$('<li><input type="text" placeholder="항목 입력"/></li>').insertBefore("#surveyAdd_"+idx);*/
			},
			
			removePollDetail : function(o){
				var delIdx = $(o).parents("li").eq(0).index();
				/*$('li[name="ansLi"]').eq(delIdx).remove();*/
				$('li[name="ansLi"]').eq(delIdx).remove();
			},
			
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			usecaseCrateParam : function(){
				var dt = new Date();
				
				var object = new Object();
				object.userName = $("#userName").val();
				object.section = $("#section").val();
				object.usePurpose = $("#usePurpose").val();
				object.applicationField = $("#applicationField").val();
				object.dataUse1 = $("#dataUse1").val();
				object.dataUse2 = $("#dataUse2").val();
				object.content = $("#applicationContent").val();
				object.siteUrl = $("#siteUrl").val();
				
				var preViewImage= new Object();
				
				var imgFileFullPath  = $("#imgFile").val();
				var imgPathHeader = imgFileFullPath.lastIndexOf("\\");
	            var imgPathMiddle = imgFileFullPath.lastIndexOf(".");
	            var imgPathEnd = imgFileFullPath.length;
	            var imgOriFileName = imgFileFullPath.substring(imgPathHeader+1, imgPathMiddle);
				var imgExtName = imgFileFullPath.substring(imgPathMiddle+1, imgPathEnd);
				var imgFileName = imgOriFileName +"."+imgExtName;
				var imgSaveName = imgOriFileName+"_"+dt.getFullYear()+Number(dt.getMonth()+1)+dt.getDate()+dt.getHours()+dt.getMinutes()+dt.getSeconds()+"."+imgExtName;
				
				preViewImage.imgFileName = imgFileName;
				preViewImage.saveFileName = imgSaveName;
				
				var fileList = new Array();
				
				var fileNameList = $("input[name='refFiles[]']");
				for(var i=0; i < fileNameList.length; i++){
					
					var fileObject = new Object();
					
					var selectObject = fileNameList[i];
					/*var selectFileFullPath = $("#"+selectObject.id).val();*/
					var selectFileFullPath = $("input[name='refFiles[]']").eq(i).val();
					var pathHeader = selectFileFullPath.lastIndexOf("\\");
		            var pathMiddle = selectFileFullPath.lastIndexOf(".");
		            var pathEnd = selectFileFullPath.length;
		            var fileName = selectFileFullPath.substring(pathHeader+1, pathMiddle);
					var selectExtName = selectFileFullPath.substring(pathMiddle+1, pathEnd);
					
					
					
					fileObject.fileName = fileName +"."+selectExtName;
					fileObject.saveName = fileName+"_"+dt.getFullYear()+Number(dt.getMonth()+1)+dt.getDate()+dt.getHours()+dt.getMinutes()+dt.getSeconds()+"."+selectExtName;
					fileList[i] = fileObject;
				}
				object.refFileList = fileList;
				object.preViewImg = preViewImage;
				//파일명도 추가 해야 함
				//fileName 파일 저장될때의 이름
				//fileRealName 실제 파일 원본 이름
				
				return JSON.stringify(object);
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			galleryCreateParam : function(){
				var dt = new Date();
				
				var slideImageList = new Array();
				
				var slides = $("img[name='slide']");
				
				
				
				for(var i = 0; i < $galleryAdd.imageArray.length; i++){
					var obj = $galleryAdd.imageArray[i];
					var imageObject = new Object();
					imageObject.fileName = obj.fileName;
					imageObject.APIURL = obj.APIURL;
					imageObject.paramInfo = obj.paramInfo;
					slideImageList.push(imageObject);
				}
				return JSON.stringify(slideImageList);
				
			},
			
			galleryIconCreateParam : function(){
				/*iconArray : new Array(),
				iconList : new Array(),
				imgObj.positionTop
				imgObj.positionLeft
				imgObj.imgSrc
				imgObj.type =1;
				*/
				
				if($galleryAdd.iconArray.length > 0 ){
					for(var i =0; i < $galleryAdd.iconArray.length;i++){
						if($galleryAdd.iconArray[i].type =="2"){
							$galleryAdd.iconArray[i].exp = $("#ico_"+i+" > div > textArea").val();
						}
					}
					$galleryAdd.iconList.push($galleryAdd.iconArray);
					
				}
				
				return JSON.stringify($galleryAdd.iconList);
				
				
			},
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			usecaseCreateSurvey : function(){
				//중복 타입 및 여러개 생성시 관련 설계 필요
				var surveySubjectList = $('input[name="surveySubject"]');
				/*var liList = $("#surveyDetail > ul > li");*/
				/*var liList = $("#surveyDetailUl > li");*/
				var liList = $("input[name='ansDetail']");
				
				
				
				var surveyArray = new Array();
				var surveyData = new Object();
				var surveyDataDetail = new Array();
				
				if($.trim(surveySubjectList[0].value) != ""){
					surveyData.survery_title =surveySubjectList[0].value;
					for(var i = 0; i < liList.length; i++){
						/*var temp = liList[i].childNodes[0].value;*/
						var temp = $("input[name='ansDetail']").eq(i).val();
						if(temp != undefined){
							surveyDataDetail.push(temp);
						}
					}
					
					if(surveyDataDetail.length ==0){
						//질문이 하나도 없을경우 그냥 빈 공백으로 리턴
						surveyArray = new Array();
					}else{
						surveyData.surveyDetail = surveyDataDetail;
						surveyArray.push(surveyData);
					}
					
				}

				
				
				
				
				
				
				
				
				return JSON.stringify(surveyArray);
				
			},
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			saveFormSubmit : function(){
				var jsonParam = $galleryAdd.usecaseCrateParam();
				var surveyData = $galleryAdd.usecaseCreateSurvey();
				var dataValidate = $galleryAdd.insertDataValidate();
				if(dataValidate == false){
					messageAlert.open("알림","제목과 컨텐츠를 올바르게 입력 해주세요.");
					return;
				}
				
				var surveyValidate = $galleryAdd.surveyDataValidate();
				if(surveyValidate == false){
					messageAlert.open("알림","설문조사 내용을 올바르게 입력해주세요.");
					return;
				}

				// mng_s 20170720_김대보(등록시 Confirm 추가)
				messageConfirm.open(
		    			 "알림", 
		    			 "등록하시겠습니까?",
		    			 btns = [
							{
							    title : "등록",
							    fAgm : null,
							    disable : false,
							    func : function(opt) {
							    	var supportType = supportPahtValue();
									var surveyduplication = $("#surveyType").hasClass("on");
									
									if($("#publicType").hasClass("on")){
										srv_type=2;
									}else{
										srv_type=4;
									}
									
									var date = new Date();
									$("#fileForm").ajaxForm({
										async : false,
										type : "POST",
										url : "/view/gallery/galleryAdd",
										contentType : "application/json",
										dataType : "json",
										data : {
											title : $("#gallery_title").val(),
											content : $("#applicationContent").val(),
											tag : $("#hashTag").val(),
											srv_type : srv_type,
											survey_surv_start_dt : date.getFullYear() + "-" + Number(date.getMonth()+1) + "-" + date.getDate(),
											survey_surv_end_dt : $("#survey_surv_end_dt").val(),
											surveyData : surveyData,
											param : jsonParam,
											supportType : supportType,
											surveyduplication : surveyduplication
										},
										
										success : function(data){
											
										},
										error : function(xhr,textStatus,error){
											
										},
										complete : function(data){
											if (location.href.indexOf("thematicMap") != -1) {
												window.parent.location.href = "/view/gallery/collectionGallery";
											}else {
												window.location.href = "/view/gallery/collectionGallery";
											}
										}
									
									}).submit(); 
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
				//mng_e 20170720_김대보(등록시 Confirm 추가)
				
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

				//saveFormSubmit();
				//gallerySaveForm
				
				//title
				
				if($("#gallery_title").val() ==""){
					return false;
				}else if($("#applicationContent").val ==""){
					return false;
				}else if($galleryAdd.imageArray.length < 1){
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
					/*if($.trim($("input[name='surveySubject']").val()) ==""){
						return false;
					}*/
					
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
			
			
			/**
			 * 
			 * @name         : 
			 * @description  : 
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param params : 
			 */
			gallerySaveForm : function(){
				
				var dataValidate = $galleryAdd.insertDataValidate();
				if(dataValidate == false){
					messageAlert.open("알림","제목과 컨텐츠를 올바르게 입력 해주세요.");
					return;
				}
				
				var surveyValidate = $galleryAdd.surveyDataValidate();
				if(surveyValidate == false){
					messageAlert.open("알림","설문조사 내용을 올바르게 입력해주세요.");
					return;
				}
				
				var jsonParam = $galleryAdd.galleryCreateParam();
				var iconParam = $galleryAdd.galleryIconCreateParam();
				var surveyData = $galleryAdd.usecaseCreateSurvey();
				var supportType = supportPahtValue();
				var date = new Date();
				
				var surveyduplication = $("#surveyType").hasClass("on");				
				//유효성검사
				
				var srv_type ="";
				
				if($("#publicType").hasClass("on")){
					srv_type=1;
				}else{
					srv_type=3;
				}
				
				//2017.03.27 빈스트링 null참조 오류
				var tempContent = $("#applicationContent").val();
				if (tempContent == null || tempContent == '') {
					tempContent = ' ';
				}
				
				$("#gallerySaveForm").ajaxForm({
					async : false,
					type : "POST",
					url : "/view/gallery/galleryAdd",
					contentType : "application/json",
					dataType : "json",
					encoding: "utf-8",
					data : {
						title : $("#gallery_title").val(),
						content : tempContent,
						tag : $("#hashTag").val(),
						srv_type : srv_type,
						survey_surv_start_dt : date.getFullYear() + "-" + Number(date.getMonth()+1) + "-" + date.getDate(),
						survey_surv_end_dt : $("#survey_surv_end_dt").val(),
						surveyData : surveyData,
						param : jsonParam,
						iconParam : iconParam,
						supportType : supportType,
						surveyduplication : surveyduplication
						
					},
					
					success : function(data){
						
					},
					error : function(xhr,textStatus,error){
						
					},
					complete : function(data){
						$galleryAdd.writeGalleryHide();
						if (location.href.indexOf("thematicMap") != -1) {
							window.parent.location.href = "/view/gallery/collectionGallery";
						}else {
							window.location.href = "/view/gallery/collectionGallery";
						}
						
					}
				
				}).submit();
				
				
			},
			
			selectBookMarkList : function(){
				var selectBook = new sop.portal.selectBookMarkList.api();
				selectBook.request({
					method: "POST",
					async : false,
					url : contextPath +"/ServiceAPI/gallery/selectBookMarkList.json"
				});
			},
			
			 onBlockUIPopup : function(){
		        var elements = document.getElementById("durianMask");
		        var id = null;
		        if (elements != null) {
		        	id = elements.getAttribute('id');
		        }
		        	
		        if (id != "durianMask") {
		        	 this.blockUI = document.createElement("DIV");
		             this.blockUI.id = "durianMask";
		             this.blockUI.style.backgroundColor = "#D3D3D3";
		             this.blockUI.style.border = "0px solid black";
		             this.blockUI.style.position = "absolute";
		             this.blockUI.style.left = '0px';
		             this.blockUI.style.top = '0px';

		             if(window.innerHeight == undefined){
		                this.blockUI.style.height = document.body.scrollHeight + 'px';
		                this.blockUI.style.width = document.documentElement.clientWidth + 'px';
		             }else{
		                 this.blockUI.style.height = document.body.scrollHeight + 'px';
		                 this.blockUI.style.width = document.documentElement.clientWidth + 'px';
		             }
		             this.blockUI.style.zIndex = "10000";
		             this.blockUI.style.filter = "alpha(opacity=60);";
		             this.blockUI.style.MozOpacity = 0.6;
		             this.blockUI.style.opacity = 0.6;
		             this.blockUI.style.KhtmlOpacity = 0.6;
		             document.body.appendChild(this.blockUI);
		        	
		             this.popupUI=document.createElement("DIV");

		             this.popupUI.style.position = "absolute";
		             this.popupUI.style.height = '10px';
		             this.popupUI.style.lineHeight = '50px';
		             this.popupUI.style.paddingBottom='40px';
		             this.popupUI.style.width ='400px';
		             this.popupUI.style.top ='50%';
		             this.popupUI.style.left = '50%';
		             this.popupUI.style.zIndex = "11000";
		                 
		             var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
		             this.popupUI.innerHTML=errorMsg;
		             document.body.appendChild(this.popupUI);
		        	}
		           
		        },
		        
		        
		        onBlockUIClose : function() {
		        	
					if(!$d.util.isUndefined(this.blockUI)) {
						D.body.removeChild(this.blockUI);
						delete this.blockUI;
					}
					if(!$d.util.isUndefined(this.popupUI)) {
						D.body.removeChild(this.popupUI);
						delete this.popupUI;
					}
				},
				
				//자료신청
				goApplyData : function() {
					window.location.href = "/contents/shortcut/shortcut_05_03.jsp";
				},
				
				//OpenAPI 신청
				goApplyOpenApi : function() {
					window.open(developApiPath+"/html/openApi/app/myApp.html", '_blank');
				},
				
				base64ToBlob : function(base64, mime) 
				{
				    mime = mime || '';
				    var sliceSize = 1024;
				    var byteChars = window.atob(base64);
				    var byteArrays = [];

				    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
				        var slice = byteChars.slice(offset, offset + sliceSize);

				        var byteNumbers = new Array(slice.length);
				        for (var i = 0; i < slice.length; i++) {
				            byteNumbers[i] = slice.charCodeAt(i);
				        }

				        var byteArray = new Uint8Array(byteNumbers);

				        byteArrays.push(byteArray);
				    }

				    return new Blob(byteArrays, {type: mime});
				}
		        
			
		
	};
	
	(function(){
		$class("sop.portal.selectBookMarkList.api").extend(sop.portal.absAPI).define({
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
							html +='<td><img src="/upload/gallery/galleryView/'+$.trim(object.hist_id)+'.png" onerror="/img/pic/pic_testmap02.jpg" width="30" height="20" /></td>';
							html +='<td class="al"><a href="javascript:void(0)" class="gwon02" onclick="$galleryAdd.galleryItemAdd(\''+object.hist_nm+'\',\''+object.hist_id+'\')">'+object.hist_nm+'</a></td>'
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
	
	
	/* openApi Example*/
	(function(){
		$class("sop.openApi.imageCapture.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				switch(parseInt(res.errCd)){
					case 0 : 
						var result = res.result;
						var hist_id = result.hist_id;
						var linkUrl = "";
						var makeUrl = "";
						$galleryAdd.hist_id = hist_id;
						
						$galleryAdd.doCapture(options.captureTargetId, hist_id, function(data) {
							var saveData =  data.replace(/^data:image\/(png|jpg);base64,/, '');
							var base64ImageContent = saveData.replace(/^data:image\/(png|jpg);base64,/, "");				
							var formData = new FormData();
							formData.append('fileName', hist_id);
							formData.append('type', 'gallery');
							formData.append('data', base64ImageContent); 
							
							$.ajax({
							    url: contextPath +"/ServiceAPI/gallery/urlMakeBase64.json",
							    data: formData,
							    type: 'POST',
							    contentType: false,
							    processData: false,
							    success : function() {
							    	//console.log("11");
							    }
							})
						});
					
						break;
					case -401 : 
						//console.log("400 err");
						break;
					case -100 :
						//console.log("100 err");
						break;
					default : 
						
						break;
				}
			},
			onFail : function(status,option){
				
			}
		})
	}());
	
	/* openApi Example*/
	(function(){
		$class("sop.openApi.urlMakeBase64.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				$galleryAdd.makeFirstData(options.data,options.fileName);
				$galleryAdd.onBlockUIClose();
				
			},
			onFail : function(status,option){
				
				$galleryAdd.onBlockUIClose();
			}
		})
	}());
	
	(function(){
		$class("sop.openApi.deleteHist.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status,res,options){
				//console.log("성공");
			},
			onFail : function(status,option){
				//console.log("실패");
			}
		})
	}())
	
}(window, document));