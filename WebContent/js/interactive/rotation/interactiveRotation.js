/**   
 *
 * @JSName: interactiveRotation.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/07/06/ 11:20:00    
 * @version V1.0      
 *    
 */



var imgCnt = 20;		//로테이션 이미지 갯수-1
var pageNum = 1;

$(function () {
	
	randomImg();
	//링크별로 이미지를 만든다.
	$("#rotationDiv li a").click(function(){
		pageNum = this.text;
		
		pageNum = parseInt(pageNum);
		
		
		moveHighFunction(pageNum);
	});
	//링크별로 이미지를 만든다.
	
	$("#rotationTip").click(function(){
		randomImg();
	});
	
	//링크별로 이미지를 만든다.
	$("#rotationTip").click(function(){
		randomImg();
	});
	
	//링크별로 이미지를 만든다.
	$("#rotationTip").click(function(){
		$("#interactive_laypopup").show();
	});
	
	//이전, 다음, 페이징의 ui를 수정하기가 힘듬.
	//슬라이드 라이브러리를 수정하여 id값을 부여후 trigger 처리함
	//이전 이후버튼 trigger start
	$("#preViewBtn").click(function(){

//		$("#rotationPageText" + selectImg +" a").attr("style", "font-size:12px;");
//		$("#rotationPageText" + selectImg +" a").attr("style", "color:#454545;");
		
		pageNum = pageNum-1;
		if(pageNum < 1){
//			selectImg = imgCnt;
//			$("#rotationPageText" + selectImg +" a").attr("style", "font-size:13px;");
//			$("#rotationPageText" + selectImg +" a").attr("style", "color:red;");
//			selectImg = 0;
		}else{
//			$("#rotationPageText" + selectImg +" a").attr("style", "font-size:13px;");
//			$("#rotationPageText" + selectImg +" a").attr("style", "color:red;");
		}
		
//		$("#preViewBtn2").trigger("click");
		moveHighFunction2(pageNum);
	});
	$("#nextViewBtn").click(function(){

//		$("#rotationPageText" + selectImg +" a").attr("style", "font-size:12px;");
//		$("#rotationPageText" + selectImg +" a").attr("style", "color:#454545;");
		pageNum = pageNum + 1;
		if(pageNum > parseInt(imgCnt)){
//			selectImg = 1;
//			$("#rotationPageText" + (selectImg) +" a").attr("style", "font-size:13px;");
//			$("#rotationPageText" + (selectImg) +" a").attr("style", "color:red;");
//			selectImg = 20;
		}else{
//			$("#rotationPageText" + (selectImg) +" a").attr("style", "font-size:13px;");
//			$("#rotationPageText" + (selectImg) +" a").attr("style", "color:red;");			
		}
//		$("#nextViewBtn2").trigger("click");
		moveHighFunction2(pageNum);
	});
	//trigger end
	
		getRotationCookey();
});

function moveHighFunction(pageNum){
	apiLogWrite2('A0', 'A29', '로테이션 팁', '없음', '0', '없음');
		pageNum = pageNum-1;
	$("#pgBtn" + pageNum).trigger("click");
	pageNum = pageNum+1;
//	for(i=0; i<imgCnt; i++){
//		if(pageNum == i){
//			$("#rotationPageText" + (pageNum+1) +" a").attr("style", "font-size:13px;");
//			$("#rotationPageText" + (pageNum+1) +" a").attr("style", "color:red;");
//		}else{
//			$("#rotationPageText" + (i+1) +" a").attr("style", "font-size:12px;");
//			$("#rotationPageText" + (i+1) +" a").attr("style", "color:#454545;");
			
//		}
//	}
	
	
	
		for(i=1; i<=imgCnt; i++){
			
			if(i == pageNum){
				$("#rotationPageText" + (i) +" a").attr("style", "font-size:13px;");
				$("#rotationPageText" + (i) +" a").attr("style", "color:red;");
			}else{
				$("#rotationPageText" + (i) +" a").attr("style", "font-size:12px;");
				$("#rotationPageText" + (i) +" a").attr("style", "color:#454545;");
			}
			
		}
	
}

function moveHighFunction2(pageNum2){
	pageNum = pageNum2;
	apiLogWrite2('A0', 'A29', '로테이션 팁', '없음', '0', '없음');
	if(pageNum >= 21){
		pageNum = 1;
	}else if(pageNum <= 0){
		pageNum = 20;
	}
	
	$("#pgBtn" + (pageNum-1)).trigger("click");
	
		for(i=1; i<=imgCnt; i++){
			
			if(i== pageNum){
				$("#rotationPageText" + (i) +" a").attr("style", "font-size:13px;");
				$("#rotationPageText" + (i) +" a").attr("style", "color:red;");
			}else{
				$("#rotationPageText" + (i) +" a").attr("style", "font-size:12px;");
				$("#rotationPageText" + (i) +" a").attr("style", "color:#454545;");
			}
			
		}
	
}


function randomImg(){
	apiLogWrite2('A0', 'A29', '로테이션 팁', '없음', '0', '없음');
	$('#slides').slidesjs({});
	
	$("#preViewBtn2").hide();
	$("#nextViewBtn2").hide();
	
	for(var i=0; i<=imgCnt; i++){
		$("#pgBtn" + i).hide();
	}
	
	pageNum =  parseInt(imgCnt * Math.random());
	 moveHighFunction(pageNum);
	 
}

function openRotationTip(){	
	$("#interactive_laypopup").css("height", "100%");
	$("#interactive_laypopup").css("width", "100%");
	randomImg();
}

function closeRotationTip(winName, expiredays) {
	if($("#"+winName).find("input[name='close']").is(":checked")) {
		setCookie(winName, "done" , expiredays);
	}
	$("#interactive_laypopup").css("height", "0px");
	$("#interactive_laypopup").css("width", "0px");
}

function setCookie(name, value, expiredays) {					
   var todayDate = new Date();   
   todayDate.setDate(todayDate.getDate() + expiredays);   
   document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";"				   
}




function getRotationCookey(){
	var blnCookie = this.getCookie("interactive_laypopup");  
	if(!blnCookie) { 
		//mng_s 20180412_김건민	
		//$("#interactive_laypopup").css("height", "0%");
		$("#interactive_laypopup").css("height", "0px");
		$("#interactive_laypopup").css("width", "0px");
		//mng_e 20180412_김건민
	}else{
		$("#interactive_laypopup").css("height", "0px");
		$("#interactive_laypopup").css("width", "0px");
		
	}
}

/*
$(document).ready(
	function() {
		$(".containerBox").css("height", ($(window).height()*(100/100))-104);
		$(".scrollBox").css("height", ($(window).height()*(100/100))-82);
		
		 $(window).resize(function(){
			 $(".containerBox").css("height", ($(window).height()*(100/100))-104);
			 $(".scrollBox").css("height", ($(window).height()*(100/100))-82);
	 	});
	});
	*/

