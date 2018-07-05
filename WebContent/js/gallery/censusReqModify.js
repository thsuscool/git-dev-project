/**
 * $censusReqModify 
 * history : 네이버시스템(주), 1.0, 2016/08/29  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 */

$(function(){  
	datePicker();
	$('#hashTag').tagsInput({width:'auto'});
	
});

function datePicker(){
	$( ".date" ).datepicker({
      showOn: "button",
      buttonImage: "/img/ico/ico_calendar.png",
      buttonImageOnly: true,
      buttonText: "Select date",
      dateFormat : "yy-mm-dd"
    });
}



(function(W,D){
	W.$censusReqModify = W.$censusReqModify || {};
	
	
	$(document).ready(function() {
		$censusReqModify.makeFirstData();
	});
	$censusReqModify.ui = {
			
			
	}; 
	
	$censusReqModify = {
			data_id : null,
			img_id : null,
			title : null,
			mainData : null,
			galleryData : null,
			survey_surv_end_dt : null,
			tag : null,
			survey_surv_id : null,
			surv_data : null,
			surv_title : null,
			surv_list : null,
			calcIdxNumber : null,
			oriPreViewImg : null,
			oriRefFileList : new Array(),
			bChangeImg : false,
			
			makeFirstData : function(){
				$censusReqModify.mainData = $censusReqModify.mainData.mainResult;
				$censusReqModify.title = $censusReqModify.mainData.title;				
				$("#title").val($censusReqModify.title);
				$("#applicationContent").text($censusReqModify.galleryData.sgis_census_req_goal);
				//preView
				//file
				//refFileList
				//	fileName
				//  saveName
				
			},
			
			addPollDetail : function(){
				var html = '<li name="ansLi"><input  type="text" name="ansDetail" placeholder="항목 입력" value=""/><a name="removePoll" href="javascript:void(0)" onclick="$censusReqModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>'
				$(html).insertBefore("#surveyAdd_1");
				$("#surveyDetailUl").mCustomScrollbar('destroy');
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
				/*if($(".josaListBoxScroll").length) $(".josaListBoxScroll").mCustomScrollbar({axis:"y"});*/
				
			},
			
			oriFileDel : function(o){
				var delIdx = $(o).parents("li").eq(0).index();
				$(o).parents("li").eq(0).remove();
				$useCaseModifty.oriRefFileList.splice(oriRefFileList,1);
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
				var calcId = $censusReqModify.calcIdxNumber("refFiles[]" ,"ref")
				var html = '<input type="file" name="refFiles[]" onchange="dataItemAdd(this)" class="hidden"/>';
				$("#refFiles").append(html);
				$('input[name="refFiles[]"]:last').trigger("click");
			},
			
			removeIcon : function(idx){
				$("#ico_"+idx).remove();
				for(var i =0; i < $censusReqModify.iconArray.length; i++){
					var object = $censusReqModify.iconArray[i];
					console.log(object);
					if(object.seqId == idx){
						$censusReqModify.iconArray.splice(i,1);
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
		            $censusReqModify.bChangeImg = true
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
/*			gridUploadView : function(saveName){
				$("#preViewImage").append("<img src='/upload/gallery/preView/"+saveName+"'></img>");
			},
			*/
			
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
				var html ='<li name="ansLi"><input type="text" name="ansDetail" placeholder="항목 입력" value=""/><a name="removePoll" href="javascript:void(0)" onclick="$censusReqModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>'; 
				$(html).insertBefore("#surveyAdd_"+idx);
				$("#surveyDetailUl").mCustomScrollbar('destroy');
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
				/*$('<li><input type="text" placeholder="항목 입력"/></li>').insertBefore("#surveyAdd_"+idx);*/
			},
			
			removePollDetail : function(o){
				console.log("아 왜 안타냐");
				var delIdx = $(o).parents("li").eq(0).index();
				console.log("delIdx = " + delIdx);
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
				
				if($censusReqModify.bChangeImg == true){
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
				}else{
					preViewImage = $censusReqModify.oriPreViewImg;
				}
				
				
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
				console.log(object);
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
			usecaseCreateSurvey : function(){
				//중복 타입 및 여러개 생성시 관련 설계 필요
				var surveySubjectList = $('input[name="surveySubject"]');
				/*var liList = $("#surveyDetail > ul > li");*/
				var liList = $("input[name='ansDetail']");
				
				var surveyArray = new Array();
				var surveyData = new Object();
				var surveyDataDetail = new Array();
				
				if($.trim(surveySubjectList[0].value) !=""){
					surveyData.survery_title =surveySubjectList[0].value;
					if($("#selectOther").hasClass("on")){
						surveyData.survey_type = 2; 
					}else{
						surveyData.survey_type = 1;
					}
					
					for(var i = 0; i < liList.length; i++){
						/*var temp = liList[i].childNodes[0].value;*/
						var temp =  liList[i].value;
						if(temp != undefined){
							surveyDataDetail.push(temp);
						}
					}
					
				}
				
				surveyData.surveyDetail = surveyDataDetail;
				surveyArray.push(surveyData);
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
				$censusReqModify.galleryData.sgis_census_req_kwaje = $("#title").val();
				$censusReqModify.galleryData.sgis_census_req_goal = $("#applicationContent").val();
				
				$("#fileForm").ajaxForm({
					async : false,
					type : "POST",
					url : "/view/gallery/updateReqCensusModify", 
					contentType : "application/json",
					dataType : "json",
					data : {
						title : $("#title").val(),
						content : $("#applicationContent").val(),
						param : JSON.stringify($censusReqModify.galleryData),
						data_id : $censusReqModify.data_id,
						img_id : $censusReqModify.img_id,
					},
					
					success : function(data){
						
					},
					error : function(xhr,textStatus,error){
						
					},
					complete : function(data){
						location.href = "/view/gallery/collectionGallery";
					}
				
				}).submit();
			}
			
		
	},
	
	
	
	/* openApi Example*/
	(function(){
		$class("sop.openApi.example.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options){
				switch(parseInt(res.errCd)){
					case 0 : 
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