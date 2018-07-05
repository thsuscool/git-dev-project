$(document).ready(function() {
	var body = $("body");
	
	//패밀리사이트
	body.on("click",".btnService",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			mainSeriveShow();
		}else{
			mainServiceHide();
		}
	});
	
	//패밀리사이트 목록 클릭시 최소화
	body.on("click",".serviceLayer > ol",function(){
		$(".btnService").removeClass("on");
		$(".serviceLayer").hide();
	});
	
	$(".btnService").keydown(function(e) {
		if (e.keyCode == "9") {
			mainSeriveShow();
		}
	});
	
	mainSeriveShow = function() {
		$(".btnService").addClass("on");
		$(".serviceLayer").show();
	};
	
	mainServiceHide = function() {
		$(".btnService").removeClass("on");
		$(".serviceLayer").hide();
	}
	
	isMainServiceHide = function() {
		console.log("1111");
	}
	
})