$(function(){

	// gnb
	$(".gn-lst li").mouseover(function(){
		$(".gn-lst li").removeClass("on");
		$(this).addClass("on");
		$(".dpeth_menu").stop(true, true).slideDown(200);
		$(".depth2 > ul > li > div").removeClass("on");
		$(".depth2 > ul > li > div").eq($(".gn-lst li").index(this)).addClass("on");
	});

	$(".gnbbox").mouseleave(function(){
		$(".gn-lst li").removeClass("on");
		$(".dpeth_menu").slideUp(200);
	});

	$(".dpeth_menu > div > ul > li").mouseover(function(){
		$(".gn-lst li").removeClass("on");
		$(".gn-lst li").eq($(".dpeth_menu > div > ul > li").index(this)).addClass("on");
		$(".dpeth_menu > div > ul > li > div").removeClass("on");
		$(this).find(">div").addClass("on");
	});

	// gnb fixed
	function fixDiv() {
	  var $cache = $('.gnbbox'); 
	  if ($(window).scrollTop() > 60) {
		$cache.css({
			'position': 'fixed',
			'top': '0',
			'left': '0',
			'margin-left': '0',
			'opacity' : '1',
			'width': '100%',
			'z-index': '100'
		}); 
	}else
		var topvalue = $(".gnb h1").outerHeight();  // 2015-07-08 추가
		$cache.css({
			'top': topvalue+'px', //2015-07-08수정
			'left': '0',
			'margin-left': '0',
			'opacity' : '1',
			'position': 'absolute',
			'clear' : 'both',
			'width' : '100%',
			'height' : '50px',
			'font-size' : '0',
			'z-index': '100',
			'min-width': '0px'//2015-07-07수정
		});
	}
	//$(window).scroll(fixDiv);
	$(window).on('scroll resize', fixDiv); //2015-07-08수정
	fixDiv();
});

function submitsearchForm(){
	alert("all submit");
}
