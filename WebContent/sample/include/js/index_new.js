/**
 * 메인화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */ 
 
$(function(){ 
	/*-----------------------상단 스크립트 ---------------------*/
	var placeholderSelector ="#totalSearchBox";
	$(placeholderSelector).placeholder();
	var body = $("body");
	body.on("keydown","#totalSearchBox",function(){
		$(".searchPop").slideDown(200);	
	});
	body.on("blur","#totalSearchBox",function(){
		$(".searchPop").slideUp(200);	
	});
	body.on("mouseover focus",".gnb>li>a",function(){
		$(".gnb>li").removeClass("on");
		$(this).parent("li").addClass("on");
		var inx = $(this).parent().index(); 
		$(".submenuBox")
		.stop().animate({"height":"150px"},200).css({"border-top-width":"1px","border-bottom-width":"1px"});
	});  
	body.on("mouseover focus",".submenuBox li a",function(){
		var inx = $(this).parents("ul").eq(0).index(".submenuBox ul");
		$(".gnb>li").removeClass("on"); 
		$(".gnb>li").eq(inx).addClass("on");   
	});
	body.on("mouseleave",".submenuBox",function(){
		$(".gnb>li").removeClass("on"); 	
		$(this).css({"border-top-width":"0px","border-bottom-width":"0px"})
		.stop().animate({"height":"0"},200);
	});
	body.on("mouseenter",".headerEtc, .submenuBox .etc, .headerContents form, .headerContents h1",function(e){
		e.stopPropagation();
		$(".gnb>li").removeClass("on"); 	
		$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px"})
		.stop().animate({"height":"0"},200);
	}); 
	$(window).on("scroll",function(){
		$(".gnb>li").removeClass("on"); 	
		$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px", "height":"0"});
	}); 
	body.on("mouseover focus",".headerContents form a",function(e){
		//e.stopPropagation();
		$(".headerContents form").addClass("on");  
	});
	body.on("focus","#totalSearchBox",function(e){ 
		$(".headerContents form").addClass("on");  
	}); 
	body.on("focus",".submenuBox .rela ul li a",function(e){ 
		$(".headerContents form").removeClass("on");   
	});
	body.on("focus",".latestList dt a",function(e){  
		$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px", "height":"0"});
	});
	
	body.on("mouseleave",".headerContents form",function(e){
		e.stopPropagation();
		$(".headerContents form").removeClass("on"); 
	});
	/*-----------------------상단 스크립트 ---------------------*/
	
	$('.exList01, .exList02, .sbList').slick({dots:true,autoplay:true,autoplaySpeed:3000});
	body.on("mouseover focus",".evtLatest",function(){
		var ck = $(this).parents("dt").attr("class");
		$(".latestList dd.tm, .latestList dd.im").css("z-index","1");
		$(".latestList dd."+ck).css("z-index","2");
	}); 
	body.on("click",".btnService",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");
			$(".serviceLayer").show();
		}else{
			$(this).removeClass("on");
			$(".serviceLayer").hide();
		}
	});
	/*
	body.on("mouseleave",".serviceLayer",function(e){
		e.stopPropagation();
		$(".btnService").removeClass("on");
		$(this).hide(); 	
	});
	*/
	$(".icoSlide").slick({  
		slidesToShow: 5,
		arrows:false, 
		autoplay:true,
		autoplaySpeed: 3000,
		pauseOnHover : false,
		dots: false
	}); 	
	$("body").on("click",".micoPrev",function(e){	 
		$('.icoSlide').slick("slickPrev");	
	});		
	$("body").on("click",".micoNext",function(e){		
		$('.icoSlide').slick("slickNext");	
	});	 
	
});
 