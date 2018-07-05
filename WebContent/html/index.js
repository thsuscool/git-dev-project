/**
 * 메인화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
$(document).ready(function () {
	openDiv("div_laypopup_main");
});

var slider = null;

$(function(){
	function changeElements(){    
		if ($(window).width() <= 625) {
			$("#div_laypopup_main").hide();
			$(".main #container .main_section01").show();
			$(".main #container .main_section02").hide();
			
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

//				function fixDiv() {
//				  var $cache = $('.gnbbox'); 
//				  if ($(window).scrollTop() > 60) {
//					$cache.css({
//						'position': 'fixed',
//						'top': '0',
//						'left': '0',
//						'margin-left': '0',
//						'opacity' : '1',
//						'width': '100%',
//						'z-index': '120'
//					}); 
//				}else
//					$cache.css({
//						'top': '50px',
//						'left': '0',
//						'margin-left': '0',
//						'opacity' : '1',
//						'position': 'absolute',
//						'clear' : 'both',
//						'width' : '100%',
//						'height' : '50px',
//						'font-size' : '0',
//						'z-index': '120'
//					});
//				}
//				$(window).scroll(fixDiv);
//				fixDiv();

		} else {
			$(".main #container .main_section01").show();
			$(".main #container .main_section02").show();
			
			$(".main_contents").mouseover(function(){
				$(this).addClass("off");
			});

			$(".main_contents > div").mouseover(function(){
				var mcdiv = $(this).attr("class");

				if ( mcdiv == "main_section01" ){

					$(".main_contents > div").removeClass("over");
					$(this).addClass("over");

				} else if ( mcdiv == "main_section02" ){

					$(".main_contents > div").removeClass("over");
					$(this).addClass("over");

				} 
			});

			$(".main_contents > div > div").mouseover(function(){
				var mcdiv2 = $(this).attr("class");

				if ( mcdiv2 == "main_con1" ){

					$(".main_contents > div > div").removeClass("over");
					$(this).addClass("over");

				} else if ( mcdiv2 == "main_con2" ){

					$(".main_contents > div > div").removeClass("over");
					$(this).addClass("over");

				} else {
					$(".main_contents > div > div").removeClass("over");
					$(this).addClass("over");
				}
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
			
			/////
			if (slider != null) {
				slider.stopAuto();
		        setTimeout(function(){
		            slider.startAuto();
		        },200);
			}

		}
	};

    $(window).resize(function() {
        changeElements();
    });
	changeElements();

	$(".mobile_btn > a").click(function(){
		var mobilebtn =  $(this).attr("class");
		if ( mobilebtn == "btn_left_slide1" ){
			if($('#main_section01').is(':visible')) {
				$(".main #container .main_section01").hide();
				$(".main #container .main_section02").fadeIn();
			} else {
				$(".main #container .main_section01").fadeIn();
				$(".main #container .main_section02").hide();
			}
//			$(".main #container .main_section01").fadeIn();
//			$(".main #container .main_section02").hide();
		} else {
			if($('#main_section01').is(':visible')) {
				$(".main #container .main_section01").hide();
				$(".main #container .main_section02").fadeIn();
			} else {
				$(".main #container .main_section01").fadeIn();
				$(".main #container .main_section02").hide();
			}
//			$(".main #container .main_section02").fadeIn();
//			$(".main #container .main_section01").hide();
		}
	});
	
//	$(".main_contents").mouseover(function(){
//		$(this).addClass("off");
//	});
//
//	$(".main_contents > div").mouseover(function(){
//		var mcdiv = $(this).attr("class");
//
//		if ( mcdiv == "main_section01" ){
//
//			$(".main_contents > div").removeClass("over");
//			$(this).addClass("over");
//
//		} else if ( mcdiv == "main_section02" ){
//
//			$(".main_contents > div").removeClass("over");
//			$(this).addClass("over");
//
//		} 
//	});
//
//	$(".main_contents > div > div").mouseover(function(){
//		var mcdiv2 = $(this).attr("class");
//
//		if ( mcdiv2 == "main_con1" ){
//
//			$(".main_contents > div > div").removeClass("over");
//			$(this).addClass("over");
//
//		} else if ( mcdiv2 == "main_con2" ){
//
//			$(".main_contents > div > div").removeClass("over");
//			$(this).addClass("over");
//
//		} else {
//			$(".main_contents > div > div").removeClass("over");
//			$(this).addClass("over");
//		}
//	});
//
//	$(".main_contents > div").mouseleave(function(){
//		$(".main_contents > div").removeClass("off");
//		$(".main_contents > div").removeClass("over");
//	});
//
//	$(".main_contents > div > div").mouseleave(function(){
//		$(".main_contents > div > div").removeClass("over");
//		$(".main_contents > div > div").removeClass("over");
//	});
//
//	$(".main_contents").mouseleave(function(){
//		$(".main_contents").removeClass("off");
//	});
	
	slider = $('.bxslider').bxSlider({
		auto : true,
		autoStart : true,
		stopAuto: false,
		captions: true
	});
	
	//개발자-openApi 신청
	$(".bxslider > #goDevHome").click(function() {
		window.open("/developer/html/openApi/app/myApp.html");
	});
	
	//개발자-jit
	$(".bxslider > #goDevJIT").click(function() {
		window.open("/developer/html/develop/dvp.html");
	});
	
	//개발자-data api
	$(".bxslider > #goDevDataAPI").click(function() {
		window.open("/developer/html/openApi/api/data.html");
	});
	
	//개발자-지도 api
	$(".bxslider > #goDevMapAPI").click(function() {
		window.open("/developer/html/openApi/api/map.html");
	});
	
	/*
	//개발자-openApi 신청
	$("#goDevHome").click(function() {
		window.open("/developer/html/openApi/app/myApp.html");
	});
	
	//개발자-jit
	$("#goDevJIT").click(function() {
		window.open("/developer/html/develop/dvp.html");
	});
	
	//개발자-data api
	$("#goDevDataAPI").click(function() {
		window.open("/developer/html/openApi/api/data.html");
	});
	
	//개발자-지도 api
	$("#goDevMapAPI").click(function() {
		window.open("/developer/html/openApi/api/map.html");
	});
	*/
	
	// Mobile ver.
	//개발자-openApi 신청
	$("#goMobileDevMyapp").click(function() {
		window.open("/developer/html/openApi/app/myApp.html");
	});
	
	//개발자-jit
	$("#goMobileDevJIT").click(function() {
		window.open("/developer/html/develop/dvp.html");
	});
	
	//개발자-data api
	$("#goDevMobileDataAPI").click(function() {
		window.open("/developer/html/openApi/api/data.html");
	});
	
	//개발자-지도 api
	$("#goDevMobileMapAPI").click(function() {
		window.open("/developer/html/openApi/api/map.html");
	});
	
	$("#dev_title, #dev_title_mobile").click(function() {
		  window.open("/developer/index.html");
	}); 
	
	$(".bx-pager-link").click(function(){
		slider.stopAuto();
        setTimeout(function(){
            slider.startAuto();
        },200);
	});
});

function getSession() {
}