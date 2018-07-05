$(function(){
	fnObj.guideLink();
	$('pre.code').highlight({source:1, zebra:1, indent:'space', list:'ol'});
}); 
var fnObj  = {
	guideLink:function(){ 
		$("body").on("click",".guideList a",function(){
			$(".guideList a").removeClass("on");
			$(this).addClass("on");
			var _id = $(this).attr("href");
			$('.wrapper.sub .container .article').stop().animate({scrollTop: $(_id).offset().top }, 500);
		});
	},
	mainQuick:function(){
		var ck = $(".sideMenu").is(":hidden");
		if(!ck){
			$(".sideMenu").hide();
		}else{
			$(".sideMenu").show();
		}
	}
}