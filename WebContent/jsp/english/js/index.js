$(function(){ 

	var body = $("body");
	//최근 게시물 -통계주제도
	body.on("mouseover focus","#themaLists",
	function(){		
		$(".roundBox").html($(this).html());		
		$("#themaTilte").css("width", "270px");
		$("#themaColor").css("color", "#fff");
	});
	//최근 게시물 -대화형통계지도
	body.on("mouseover focus","#interLists",
	function(){		
		$(".roundBox2").html($(this).html());
		$("#interTilte").css("width", "270px");
		$("#interColor").css("color", "#fff");		
	});
	
	body.on("mouseover focus",".latestList dt ul li a",function(){
		$(this).css("text-decoration", "underline");
		$(this).css("font-weight", "bold");		
	});
	body.on("mouseout focus",".latestList dt ul li a",function(){
		$(this).css("text-decoration", "none");
		$(this).css("font-weight", "normal");		
	});
	
	//활용사례 슬라이드
	$(".icoSlide").slick({  
		slidesToShow: 5,
		slidesToScroll: 2,
		arrows:false,
		infinite:false,
		dots: false
	}); 	
	$("body").on("click",".micoPrev",function(e){	 
		$('.icoSlide').slick("slickPrev");	
	});		
	$("body").on("click",".micoNext",function(e){		
		$('.icoSlide').slick("slickNext");	
	});	 

}); 