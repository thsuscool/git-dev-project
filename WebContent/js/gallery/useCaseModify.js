/**
 * $useCaseModify 
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
	W.$useCaseModify = W.$useCaseModify || {};
	
	
	$(document).ready(function() {
		$useCaseModify.makeFirstData();
	});
	$useCaseModify.ui = {
			
			
	}; 
	
	$useCaseModify = {
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
				$useCaseModify.mainData = $useCaseModify.mainData.mainResult;
				$useCaseModify.title = $useCaseModify.mainData.title;
				$useCaseModify.survey_surv_end_dt = $useCaseModify.mainData.survey_surv_end_dt.substr(0,10);
				$useCaseModify.tag = $useCaseModify.mainData.tag;
				/*console.log("========================");*/
				console.log($useCaseModify.mainData);
				//나중에 이건 정렬응 하긴 해야겠찌..
				/*console.log("========================");*/
				
				$("#title").val($useCaseModify.title);
				$("#userName").val($useCaseModify.galleryData.userName);
				$("#dataUse1").val($useCaseModify.galleryData.dataUse1);
				$("#dataUse2").val($useCaseModify.galleryData.dataUse2);
				$("#applicationContent").text($useCaseModify.galleryData.content);
				$("#siteUrl").val($useCaseModify.galleryData.siteUrl);
				
				console.log($useCaseModify.galleryData);
				
				//$useCaseModify.galleryData.section
				//$useCaseModify.galleryData.usePurpose
				//$useCaseModify.galleryData.applicationField
				
				$("#section").find('option').each(function(i,e){
					if($useCaseModify.galleryData.section ==$(this).val()){
						$("#section option:eq("+i+")").prop("selected",true);
					}
				});
				
				$("#usePurpose").find('option').each(function(i,e){
					if($useCaseModify.galleryData.usePurpose ==$(this).val()){
						$("#usePurpose option:eq("+i+")").prop("selected",true);
					}
				});
				
				$("#applicationField").find('option').each(function(i,e){
					if($useCaseModify.galleryData.applicationField ==$(this).val()){
						$("#applicationField option:eq("+i+")").prop("selected",true);
					}
				});
				
				
				/*$("#section").each(function(){
					console.log("1");
					if($useCaseModify.galleryData.section ==$(this).val() ){
						console.log($(this).val());
					}
				})*/
				//preViewImage 
					//saveFileName
				
				if($useCaseModify.tag != null){
					var tagStr = $useCaseModify.tag.split(",");
					for(var i = 0; i < tagStr.length; i++){
						$("#hashTag").addTag(tagStr[i]);
						
					}
				}
				for(var i = 0; i < $useCaseModify.surv_data.length;i++){
					var survData = $useCaseModify.surv_data[i];
					if(i == 0){
						$("input[name='surveySubject']").val(survData.survey_title);
						$useCaseModify.survey_surv_id = survData.survey_surv_id;
						if(survData.survey_type == "1"){
						}else{
							$("#selectOther").trigger("click");
						}
					}
					var html = '<li name="ansLi"><input name="ansDetail" type="text" placeholder="항목 입력" value="'+survData.ans_content+'"/></li>';
					$(html).insertBefore("#surveyAdd_1");
				}
				//survData.survey_title
//				if($("input[name='surveySubject']").val() != ""){
//					$("#end_dt_button").trigger("click");
//					$("#survey_surv_end_dt").val($useCaseModify.survey_surv_end_dt);
//				}
				
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
				
				if($useCaseModify.mainData.srv_type =="2"){
					$("#publicType").addClass("on");
				}else{
					
				}
				//preView
				if($useCaseModify.galleryData.imgFileName !="" || $useCaseModify.galleryData.imgFileName !="."){
					$('#target').attr('src',"/upload/gallery/preView/"+$useCaseModify.galleryData.preViewImg.saveFileName);
					var obj = new Object();
					obj.saveFileName = $useCaseModify.galleryData.preViewImg.saveFileName;
					obj.imgFileName = $useCaseModify.galleryData.preViewImg.imgFileName;
					$("#preViewImage").show();
	            	$("#preViewImage").css("position","absolute");
	            	$("#preViewImage").css("display","block");
	            	$("#preViewImage").css("top","0px");
	            	
					$useCaseModify.oriPreViewImg = obj;
					$('#preViewImage').show();
					
				}
				
				//file
				//refFileList
				//	fileName
				//  saveName
				var refFileList = $useCaseModify.galleryData.refFileList;
				console.log(refFileList);
				for(var i =0; i <refFileList.length; i++){
					var html = "";
					html +='<li>';
					html +='<a href="javascript:void(0)" onclick="$useCaseModify.oriFileDel(this)"><img src="/img/ico/ico_del01.png" /></a>';
					html +='<span>' + refFileList[i].fileName + '</span>';
					html +='</li>';
					var obj = new Object();
					obj.fileName = refFileList[i].fileName;
					obj.saveName = refFileList[i].saveName;
					$useCaseModify.oriRefFileList.push(obj); 
					$("#referenceFileList").append(html);
				}
				
				if($(".josaListBoxScroll").length) $(".josaListBoxScroll").mCustomScrollbar({axis:"y"});
				if($(".gdContScrollBox").length) $(".gdContScrollBox").mCustomScrollbar({axis:"xy"});
				
				$("body").on("focus","input[name='surveySubject']",function(){
					//endSurveyTime
					var ck = $("#end_dt_button").hasClass("on");
					if(!ck){
						$("#end_dt_button").addClass("on");
						$(".calendarEtcBox").show();
						
						if($("#survey_surv_end_dt").val() == "" || $("#survey_surv_end_dt").val() == null || $("#survey_surv_end_dt").val() =="1900-01-01"){
							var date = new Date();
							date.setDate(date.getDate() + 7);
							var end_dt_str = date.getFullYear() + "-" + leadingZeros((date.getMonth()+1),2) +"-" + leadingZeros(date.getDate(),2);
							$("#survey_surv_end_dt").val(end_dt_str);
						}
					}
				});
			},
			
			addPollDetail : function(){
				var html = '<li name="ansLi"><input  type="text" name="ansDetail" placeholder="항목 입력" value=""/><a name="removePoll" href="javascript:void(0)" onclick="$useCaseModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>'
				$(html).insertBefore("#surveyAdd_1");
				$("#surveyDetailUl").mCustomScrollbar('destroy');
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
				/*if($(".josaListBoxScroll").length) $(".josaListBoxScroll").mCustomScrollbar({axis:"y"});*/
				
			},
			
			oriFileDel : function(o){
				var delIdx = $(o).parents("li").eq(0).index();
				/*$('input[name="refFiles[]"]').eq(delIdx).remove();*/
				$(o).parents("li").eq(0).remove();
				//mng_s 20170720_김대보(첨부파일 삭제 오류수정)
				$useCaseModify.oriRefFileList.splice(delIdx,1);
				//mng_e 20170720_김대보(첨부파일 삭제 오류수정)
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
				var calcId = $useCaseModify.calcIdxNumber("refFiles[]" ,"ref")
				var html = '<input type="file" name="refFiles[]" onchange="dataItemAdd(this)" class="hidden"/>';
				$("#refFiles").append(html);
				$('input[name="refFiles[]"]:last').trigger("click");
			},
			
			removeIcon : function(idx){
				$("#ico_"+idx).remove();
				for(var i =0; i < $useCaseModify.iconArray.length; i++){
					var object = $useCaseModify.iconArray[i];
					console.log(object);
					if(object.seqId == idx){
						$useCaseModify.iconArray.splice(i,1);
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
		            $useCaseModify.bChangeImg = true
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
				var html ='<li name="ansLi"><input type="text" name="ansDetail" placeholder="항목 입력" value=""/><a name="removePoll" href="javascript:void(0)" onclick="$useCaseModify.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>'; 
				$(html).insertBefore("#surveyAdd_"+idx);
				$("#surveyDetailUl").mCustomScrollbar('destroy');
				$("#surveyDetailUl").mCustomScrollbar({axis:"y"});
				/*$('<li><input type="text" placeholder="항목 입력"/></li>').insertBefore("#surveyAdd_"+idx);*/
			},
			
			removePollDetail : function(o){
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
				
				if($useCaseModify.bChangeImg == true){
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
					preViewImage = $useCaseModify.oriPreViewImg;
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
						//var temp = liList[i].childNodes[0].value;
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
				//mng_s 20170720_김대보(수정시 Confirm 추가)
				messageConfirm.open(
		    			 "알림", 
		    			 "수정하시겠습니까?",
		    			 btns = [
							{
							    title : "수정",
							    fAgm : null,
							    disable : false,
							    func : function(opt) {
							    	var jsonParam = $useCaseModify.usecaseCrateParam();
									//var surveyData = $useCaseModify.usecaseCreateSurvey();
									var date = new Date();
									
									var srv_type = "";
									if($("#publicType").hasClass("on")){
										srv_type=2;
									}else{
										srv_type=4;
									}
									
									$("#fileForm").ajaxForm({
										async : false,
										type : "POST",
										url : "/view/gallery/useCaseUpdate", //usecaseSave가 되면 되지용 용 ^^
										contentType : "application/json",
										dataType : "json",
										data : {
											title : $("#title").val(),
											content : $("#applicationContent").val(),
											tag : $("#hashTag").val(),
											srv_type : srv_type,
											survey_surv_start_dt : date.getFullYear() + "-" + Number(date.getMonth()+1) + "-" + date.getDate(),
											survey_surv_end_dt : $("#survey_surv_end_dt").val(),
											surveyData : surveyData,
											param : jsonParam,
											data_id : $useCaseModify.data_id,
											img_id : $useCaseModify.img_id,
											survey_surv_id : $useCaseModify.survey_surv_id,
											oriRefFileList : JSON.stringify($useCaseModify.oriRefFileList),
											bChangeImg : $useCaseModify.bChangeImg
										},
										
										success : function(data){
											
										},
										error : function(xhr,textStatus,error){
											
										},
										complete : function(data){
											//messageAlert.open("알림","수정되었습니다.");
											location.href = "/view/gallery/collectionGallery";
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
		    	//mng_e 20170720_김대보(수정시 Confirm 추가)
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