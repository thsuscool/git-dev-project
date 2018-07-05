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
		.stop().animate({"height":"190px"},200).css({"border-top-width":"1px","border-bottom-width":"1px"});
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
	body.on("mouseenter",".headerEtc",function(){
		$(".gnb>li").removeClass("on"); 	
		$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px"})
		.stop().animate({"height":"0"},200);
	}); 
	$(window).on("scroll",function(){
		$(".gnb>li").removeClass("on"); 	
		$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px", "height":"0"});
	});  
	/*-----------------------상단 스크립트 ---------------------*/ 
});
 