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

		
		pageNum = pageNum-1;
		if(pageNum < 1){
		}else{
		}
		
		moveHighFunction2(pageNum);
	});
	$("#nextViewBtn").click(function(){

		pageNum = pageNum + 1;
		if(pageNum > parseInt(imgCnt)){
		}else{
		}
		moveHighFunction2(pageNum);
	});
	
});

function moveHighFunction(pageNum){
		pageNum = pageNum-1;
	$("#pgBtn" + pageNum).trigger("click");
	pageNum = pageNum+1;
	
	
	
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

