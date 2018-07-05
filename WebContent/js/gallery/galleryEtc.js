$(function(){  
	/*if($(".gcSlideArea").length) popSlide01();
	if($(".gvSlideArea").length) popSlide02(); */
	if($(".gdContScrollBox").length) $(".gdContScrollBox").mCustomScrollbar({axis:"xy"});
	if($(".gvText").length) $(".gvText").mCustomScrollbar({axis:"xy"}); 
	if($(".gvReplyListBox").length) $(".gvReplyListBox").mCustomScrollbar({axis:"xy"});
	if($(".josaListBoxScroll").length) $(".josaListBoxScroll").mCustomScrollbar({axis:"y"});
	etcGalleryEvent();
	datePicker();
	if($("#hashTag").length) $('#hashTag').tagsInput({width:'auto'});
	$("body").on("click",".selectItem",function(){
		$(this).next("ul").show();
	});
	$("body").on("click",".selectItemList a",function(){
		var v = $(this).text();
		$(this).parents(".selectDiv").eq(0).find(".selectItem").text(v);
		$(".selectItemList").hide();
	});
	$("body").on("mouseleave",".selectItemList",function(){
		$(this).hide();
	});
	$("body").on("keyup","textarea.malType",function(){
		var h = $(this).prop("scrollHeight");
		console.log(h);
		if(h >= 56){
			
		}else{
			$(this).css('height', 'auto' );
			$(this).css('max-height',"56px");
		    $(this).height( this.scrollHeight );
		    $(this).parent().height( this.scrollHeight );
		}
	    
		if(this.value.length > 100){
			/*messageAlert.open("알림", "영문 100자 한글 50자로 제한 됩니다");*/
			this.value = this.value.substring(0,100);
		}
	    //$(this).css('display', 'inline' ).css('display', 'inline-block' );
	});
	
	if($("#applicationContent").length){
		$("body").on("keyup","#applicationContent",function(){
			console.log(this.value.length + "/2000");
			if(this.value.length > 2000){
				messageAlert.open("알림", "영문 2000자 한글 1000자로 제한 됩니다");
				this.value = this.value.substring(0,2000);
			}
		});
	}
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

function replaceAll(str, target, replacement){
	 return str.split(target).join(replacement);
};
function etcGalleryEvent(){
	/*$("body").on("click",".writeGalleryListItem li", function(){
		if($(this).parents("ul").hasClass("openSelect")){
			var ck = $(this).hasClass("on");
			if(!ck){
				$(this).addClass("on");	
			}else{
				$(this).removeClass("on");
			}
		}
	});*/
	$("body").on("click",".myGalleryListItem li", function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");	
		}else{
			$(this).removeClass("on");
		}
	});
	/*$("body").on("click",".like", function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");	
		}else{
			$(this).removeClass("on");
		}
	}); */
	
	/*$("body").on("mouseover",".galleryListItem li", function(){
		$(this).addClass("on");	
	});
	$("body").on("mouseout",".galleryListItem li", function(){
		$(this).removeClass("on");	
	});*/
	$("body").on("mouseover",".gsbRight", function(){
		$(this).addClass("on");	
	});
	$("body").on("mouseout",".gsbRight", function(){
		$(this).removeClass("on");	
	}); 
	
}
function dataItemAdd(o){    
	var html = '<li>';
	html += '<a href="javascript:void(0)" onclick="dataFileDel(this)"><img src="/img/ico/ico_del01.png" /></a>';
	html += ' <a href="javascript:void(0)" onclick="dataFileUp(this)"><img src="/img/ico/ico_add01.png" /></a>';
	html += ' <span>'+$(o).val()+'</span>';
	html += '</li>';
	$(".usListBox ul").append(html);
}
function dataFileUp(o){
	var t = $(o).parents("li").eq(0);
	t.insertBefore(t.prev("li"));
}
function dataFileDel(o){  
	var delIdx = $(o).parents("li").eq(0).index();
	$('input[name="refFiles[]"]').eq(delIdx).remove();
	$(o).parents("li").eq(0).remove();
}
function fileEvent(o){  
	$(o).trigger("click");
}
function josaItemAdd(o){
	var html = '<li><input type="text" placeholder="항목 입력"/></li> ';
	$("."+o).prepend(html);
}
function galleryItemDel(o){
	var inx = $(o).index(".gdel")+1; 
	$('.gcSlideArea').slick('slickRemove', inx);  
}
function galleryItemAdd(amugerna){
	var item = '<div class="item">';
	item += 		'<div class="rela">';
	item += 			'<a href="javascript:void(0)"><img src="/img/pic/pic_testmap01.png" /></a>';
	item += 			'<a href="javascript:void(0)" class="gdel" onclick="galleryItemDel(this);"><img src="/img/ico/ico_del02.png" /></a>';
	item += 		'</div>';
	item += 	'</div>';
	$('.gcSlideArea').slick('slickAdd', item);
	$(".gcFavBox").hide();
	$(".fovScrollBox").mCustomScrollbar('destroy');
} 
function gadd(){
	$(".gcFavBox").show();
	$(".fovScrollBox").mCustomScrollbar({axis:"xy"}); 
}
function popSlide01(){
	
	/*if($(".gcSlideArea").slick == undefined){
		console.log("undefined");
	}else{
		console.log("defined");
	}*/
	
	$(".gcSlideArea").slick({  
		slidesToShow: 5,
		arrows:false,
		infinite:false,
		dots: false
	}); 	
	$("body").on("click",".gcPrev",function(e){	 
		$('.gcSlideArea').slick("slickPrev");	
	});		
	$("body").on("click",".gcNext",function(e){		
		$('.gcSlideArea').slick("slickNext");	
	});	 	
}
function popSlide02(){ 	 
	$(".gvSlideArea").slick({  
		slidesToShow: 5,
		infinite:false,
		arrows:false,
		dots: false
		/*autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover : false*/
	}); 
	/*$("body").on("click",".gvPlay",function(e){	 
		$('.gvSlideArea').slick("slickPlay");	
	});*/		
	/*$("body").on("click",".gvStop",function(e){		
		$('.gvSlideArea').slick("slickPause");	
	});*/
	$("body").on("click",".gvPrev",function(e){	 
		$('.gvSlideArea').slick("slickPrev");	
	});		
	$("body").on("click",".gvNext",function(e){		
		$('.gvSlideArea').slick("slickNext");	
	});	 
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

function radioCross(o){
	var ck = $(o).hasClass("on");
	var evt = $(o).attr("data-event");
	if(!ck){
		$(o).addClass("on");
		if(evt == "toggle"){
			$(".calendarEtcBox").show();
			if($("#survey_surv_end_dt").val() == "" || $("#survey_surv_end_dt").val() == null || $("#survey_surv_end_dt").val() =="1900-01-01"){
				var date = new Date();
				date.setDate(date.getDate() + 7);
				var end_dt_str = date.getFullYear() + "-" + leadingZeros((date.getMonth()+1),2) +"-" + leadingZeros(date.getDate(),2);
				$("#survey_surv_end_dt").val(end_dt_str);
			}
		} 
	}else{
		$(o).removeClass("on");
		if(evt == "toggle"){
			$(".calendarEtcBox").hide();
		} 
	}  
}
function penCross(o, t){
	var ck = $(o).hasClass("on"); 
	if(!ck){
		$(o).addClass("on");
		$(t).show();
	}else{
		$(o).removeClass("on");
		$(t).hide();
	} 
}

//2017.04.03 중복코드 변경
function supportPahtValue(){
	
	//no	아이콘명	값(insert)	의미						URL
	//1	ico_gwon01	B0			생활업종 통계지도(창업통계)		/view/bizStats/bizStatsMap
	//2	ico_gwon02	J0			살고싶은 우리동네			/view/house/houseAnalysisMap
	//3	ico_gwon03	A0			대화형 통계지도				/view/map/interactiveMap
	//4	ico_gwon04	C0			통계주제도					/view/thematicMap/thematicMapMain
	//5	ico_gwon05	T0			기술업종
	//6 ico_gwon06  E0			활용사례
	//6 ico_gwon06  G0			공통 - 북마크 등록 등
	
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
			case 'interactiveMap'   : returnStr = "A0";
				break;
			case "technicalBizMap"  : returnStr = "T0";
				break;
			case "resultGallery"    : returnStr = "G0" 
				break;
			case "bookMarkGallery"  : returnStr = "G0";
				break;
			default : returnStr = "E0";
				break;
		}
	}
	return returnStr;
}

//2017.03.31 중복코드 삭제
//2017.04.03 중복코드 재정의
function supportImgValue(codeValue){
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
		case 'T0' :     returnStr = 'gw05';
			break;
		default : 		returnStr = 'gw06'; 
		
	}
	return returnStr;
}

//2017.04.03 심볼정의 추가
function supportDetailImgValue(codeValue){
	var returnStr = "";
	switch(codeValue){
		case 'B0' : 	returnStr = 'gwon01';
			break;
		case 'J0' : 	returnStr = 'gwon02';
			break;
		case 'A0' : 	returnStr = 'gwon03';
			break;
		case 'C0' : 	returnStr = 'gwon04';
			break;
		case 'T0' :     returnStr = 'gwon05';
			break;
		default : 		returnStr = 'gwon06'; 
		
	}
	return returnStr;
}