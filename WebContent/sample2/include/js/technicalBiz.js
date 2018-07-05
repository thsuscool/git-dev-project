$(function(){  
	var body = $("body");
	body.on("click",".introCommonTabs",function(){
		$(".introCommonTabs").removeClass("on");
		$(this).addClass("on");
		var inx = $(this).index(".introCommonTabs")+1;
		$(".iaDefault").hide();
		$("#iadBox0"+inx).show();  
	});
	body.on("click",".iaTabs01 a",function(){
		$(".iaTabs01 a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click",".iaTabs02 a",function(){
		$(".iaTabs02 a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click", ".techType01 li a", function(){    
		$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
		$(".quickBox.step02").stop().animate({"left":"280px"},200);
		$(".quickBox.step03").stop().animate({"left":"0"},200); 
	});
	body.on("click", ".techType02 li label", function(){     
		$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
		$(".quickBox.step03").stop().animate({"left":"560px"},200);
	});
	body.on("click",".radioType label",function(e){
		var ck = $(this).hasClass("on"); 
		$(this).parents(".radioType").eq(0).find("label").removeClass("on");
		$(this).parents(".radioType").eq(0).find("input").prop("checked", false); 
		$(this).addClass("on");
		$(this).prev("input").eq(0).prop("checked", true); 
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
	body.on("click",".abBtnRight",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on").text("신설법인 ON"); 
		}else{
			$(this).removeClass("on").text("신설법인 OFF"); 
		}
	});
	body.on("click",".chartAreaRela .ckbtn",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on"); 
		}else{
			$(this).removeClass("on"); 
		}
	});
	if($(".poiView .relaScroll").length) $(".poiView .relaScroll").mCustomScrollbar({axis:"xy"});
	body.on("click",".rowDel",function(){
		var ck = $(this).parent().parent().attr("colspan");
		if(ck == 2){
			$(this).parents("tr").eq(0).next("tr").remove();
			$(this).parents("tr").eq(0).remove();
		}else{
			$(this).parents("tr").eq(0).remove();
		}
		
	});
}); 
