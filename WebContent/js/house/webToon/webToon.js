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





var imgCnt = 28;		//로테이션 이미지 갯수-1
var selectImg = 1;


$(function () {
	getRotationCookey();
//	$('#slides').slidesjs({});
	
//	$("#preViewBtn2").hide();
//	$("#nextViewBtn2").hide();
//	$(".slidesjs-container").css("height", "520px");
	
//	for(var i=0; i<=imgCnt; i++){
//		$("#pgBtn" + i).hide();
//	}

	
	//링크별로 이미지를 만든다.
	//$("#rotationTip").click(function(){
	//	$("#houseAnalysis_webtoon_laypopup").show();
	//});
	
	//이전, 다음, 페이징의 ui를 수정하기가 힘듬.
	//슬라이드 라이브러리를 수정하여 id값을 부여후 trigger 처리함
	//이전 이후버튼 trigger start
	$("#preViewBtn").click(function(){
		
//		if(selectImg != 1){
//			$("#preViewBtn2").trigger("click");
//		}
		//moveHighFunction(selectImg);
	});
	$("#nextViewBtn").click(function(){
	//	if(selectImg != 28){
//			selectImg = selectImg + 1;
//			$("#nextViewBtn2").trigger("click");
//		}
	//	moveHighFunction(selectImg);
	});
	
	$("#webToonBtn1").click(function(){
		$("#webDiv2").hide();
		$("#webDiv1").show();
		
		
		$("#webToonBtn1").attr("src","/img/house/webtoon/K-003.png");
		$("#webToonBtn2").attr("src","/img/house/webtoon/K-002.png");
		$("#webToonBtn3").attr("src","/img/house/webtoon/K-003.png");
		$("#webToonBtn4").attr("src","/img/house/webtoon/K-002.png");
	});
	$("#webToonBtn2").click(function(){
		$("#webDiv1").hide();
		$("#webDiv2").show();
		$("#webToonBtn1").attr("src","/img/house/webtoon/K-001.png");
		$("#webToonBtn2").attr("src","/img/house/webtoon/K-004.png");
		$("#webToonBtn3").attr("src","/img/house/webtoon/K-001.png");
		$("#webToonBtn4").attr("src","/img/house/webtoon/K-004.png");
	});
	$("#webToonBtn3").click(function(){
		$("#webDiv2").hide();
		$("#webDiv1").show();
		$("#webToonBtn1").attr("src","/img/house/webtoon/K-003.png");
		$("#webToonBtn2").attr("src","/img/house/webtoon/K-002.png");
		$("#webToonBtn3").attr("src","/img/house/webtoon/K-003.png");
		$("#webToonBtn4").attr("src","/img/house/webtoon/K-002.png");
	});
	$("#webToonBtn4").click(function(){
		$("#webDiv1").hide();
		$("#webDiv2").show();
		$("#webToonBtn1").attr("src","/img/house/webtoon/K-001.png");
		$("#webToonBtn2").attr("src","/img/house/webtoon/K-004.png");
		$("#webToonBtn3").attr("src","/img/house/webtoon/K-001.png");
		$("#webToonBtn4").attr("src","/img/house/webtoon/K-004.png");
	});
	//trigger end
	
//		getRotationCookey();
});

function openWebtoon(){
	//mng_s 20180412_김건민
	$("#houseAnalysis_webtoon_laypopup").show();
	//mng_e 20180412_김건민
	$("#houseAnalysis_webtoon_laypopup").css("height", "100%");
	$("#houseAnalysis_webtoon_laypopup").css("width", "100%");
}

function openRotationTip(){
	$("#houseAnalysis_webtoon_laypopup").css("height", "100%");
	$("#houseAnalysis_webtoon_laypopup").css("width", "100%");
}

function closeRotationTip(winName, expiredays) {
	$("#houseAnalysis_webtoon_laypopup").css("height", "0px");
	$("#houseAnalysis_webtoon_laypopup").css("width", "0px");
	
	if($("#"+winName).find("input[name='close']").is(":checked")) {
		this.setCookie(winName, "done" , expiredays);   
	}
}




function getRotationCookey(){
	var blnCookie = this.getCookie("houseAnalysis_webtoon_laypopup");  
	if(!blnCookie) {  
		$("#houseAnalysis_webtoon_laypopup").css("height", "100%");
	}else{
		$("#houseAnalysis_webtoon_laypopup").css("height", "0px");
		$("#houseAnalysis_webtoon_laypopup").css("width", "0px");
		
	}
}


function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires="
			+ todayDate.toUTCString() + ";"
} 

