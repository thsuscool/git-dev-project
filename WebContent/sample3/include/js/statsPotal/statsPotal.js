$(function(){
	policyObj.start();
	if( $(".dTableScrollArea").length ) $(".dTableScrollArea").mCustomScrollbar({axis:"y"});
});
var policyObj = {
		start:function(){
			$("body").on("click",".slType li",function(){
				$(".slType li").removeClass("on");
				$(this).addClass("on");
			});
			$("body").on("click",".sbType a",function(){
				$(".sbType a").removeClass("on");
				$(this).addClass("on");
			});
			$("body").on("click",".chgCkbox a",function(){
				var ck = $(this).hasClass("on");
				if(ck){
					$(this).removeClass("on");
				}else{
					$(this).addClass("on");
				}
			});
		},
		toggle:function(o){
			var ck = $(o).hasClass("on");
			if(ck){
				$(o).removeClass("on");
				$(o).next("ul").hide();
			}else{
				$(o).addClass("on");	
				$(o).next("ul").show();
			}
		},
		tabs:function(o){
			$(".pcTabs a").removeClass("on");
			var ck = $(o).hasClass("on");
			var id = $(o).attr("data-id");
			$(o).addClass("on");	
			$(".pcTabArea").hide();
			$(id).show();
		},
		tabs01:function(o){
			$(".dTabs a").removeClass("on");
			var ck = $(o).hasClass("on");
			var id = $(o).attr("data-id");
			$(o).addClass("on");	
			$(".dTabArea").css("position","absolute");
			$(id).css("position","static");
		}
}