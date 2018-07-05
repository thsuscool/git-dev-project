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
			'z-index': '120'
		}); 
	}else
		$cache.css({
			'top': '103px',
			'left': '0',
			'margin-left': '0',
			'opacity' : '1',
			'position': 'absolute',
			'clear' : 'both',
			'width' : '100%',
			'height' : '50px',
			'font-size' : '0',
			'z-index': '120'
		});
	}
	$(window).scroll(fixDiv);
	fixDiv();

	// width 640
	function changeElements(){    
		if ($(window).width() <= 625) {

			$(".main #container .main_section01").show();
			$(".main #container .main_section02").hide();

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
					'z-index': '120'
				}); 
			}else
				$cache.css({
					'top': '50px',
					'left': '0',
					'margin-left': '0',
					'opacity' : '1',
					'position': 'absolute',
					'clear' : 'both',
					'width' : '100%',
					'height' : '50px',
					'font-size' : '0',
					'z-index': '120'
				});
			}
			$(window).scroll(fixDiv);
			fixDiv();

			$(".main_contents > div").mouseover(function(){
				$(".main_contents > div").removeClass("off");
				$(".main_contents > div").removeClass("over");
			});

			$(".main_contents > div > div").mouseover(function(){
				$(".main_contents > div > div").removeClass("over");
				$(".main_contents > div > div").removeClass("over");
			});

			$(".main_contents").mouseover(function(){
				$(".main_contents").removeClass("off");
			});

			$(".main_contents > div").mouseleave(function(){
				$(".main_contents > div").removeClass("off");
				$(".main_contents > div").removeClass("over");
			});

			$(".main_contents > div > div").mouseleave(function(){
				$(".main_contents > div > div").removeClass("over");
				$(".main_contents > div > div").removeClass("over");
			});

			$(".main_contents").mouseleave(function(){
				$(".main_contents").removeClass("off");
			});

		} else {

			$(".main #container .main_section01").show();
			$(".main #container .main_section02").show();

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
					'z-index': '120'
				}); 
			}else
				$cache.css({
					'top': '103px',
					'left': '0',
					'margin-left': '0',
					'opacity' : '1',
					'position': 'absolute',
					'clear' : 'both',
					'width' : '100%',
					'height' : '50px',
					'font-size' : '0',
					'z-index': '120'
				});
			}
			$(window).scroll(fixDiv);
			fixDiv();

		}

	}

    $(window).resize(function() {
        changeElements();
    });
	changeElements();

});

function submitsearchForm(){
	alert("all submit");
}
