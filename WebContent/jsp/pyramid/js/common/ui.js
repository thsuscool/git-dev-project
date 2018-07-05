$(function(){

	// gnb
	$(".gn-lst li").mouseover(function(){
		var inx = $(this).index();
		$(".gn-lst li").removeClass("on");
		$(this).addClass("on");
		$(".dpeth_menu").stop(true, true).slideDown(200);
		
		$(".dpeth_menu > div > ul").hide();
		$(".dpeth_menu > div > ul").eq(inx).show();
	});

	$(".gnbbox").mouseleave(function(){
		$(".gn-lst li").removeClass("on");
		$(".dpeth_menu").slideUp(200);
	});
	
	// gnb fixed
	function fixDiv() {
	  var $cache = $('.gnbbox'); 
	  if ($(window).scrollTop() > 85) {
		$cache.css({
			'position': 'fixed',
			'top': '0',
			'left': '0',
			'margin-left': '0',
			'opacity' : '1',
			'width': '100%',
			'z-index': '100',
			'min-width': '960px'
		}); 
	}else
		$cache.css({
			'top': '83px',
			'left': '0',
			'margin-left': '0',
			'opacity' : '1',
			'position': 'absolute',
			'clear' : 'both',
			'width' : '100%',
			'height' : '40px',
			'font-size' : '0',
			'z-index': '100',
			'min-width': '960px'
		});
	  
	  //현재 URL
		var nowLocationUrl = window.location.href;
		if(nowLocationUrl.indexOf("/html/index.html") > -1) {
			$cache.css("min-width", "100px");
		}
	}
	
	$(window).scroll(fixDiv);
	fixDiv();
});

function submitsearchForm(){
	alert("all submit");
}
