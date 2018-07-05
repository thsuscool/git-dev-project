/**
 * 창업통계맵 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
$(document).ready(function () {
	$(".mapareaboxd").css("marginLeft", "80px");
	$(".map_left_btn").addClass("on");
	$(".map_left_btn").css("left", "80px");
	$("#map_area").css("zIndex", "1");
	$("#map_area .area_cont .map_remark .map_location").css("marginLeft", "-80px");
	$("#layer_map").css("zIndex", "");
	$(".map #layer_map .interactive_box").css({
		"marginTop" : "44px",
		"paddingTop" : "0px",
	});
	
	// tab open
	$(".interactive_category ul li:eq(0)").removeClass("on");
	$(".interactive_category ul li:eq(0) a").parent().addClass("on");
	$(".tabcon > div").show();
	$(".btn_box").show();
	$(".controll_section02").show();
	$(".controll_section03").show();
	$(".interactive_ct").hide();
	
	//첫번째 메뉴만 open한다.
	$(".interactive_category ul li:eq(0)").removeClass("on");
	$(".interactive_category ul li:eq(0) a").parent().addClass("on");
	
	$("#API_0601").find($(".map_ct_controll")).eq(0).show();
	$("#API_0601").find($(".map_ct_controll")).eq(0).find(".box_down_dpeth").show();
	
	// option open
	$(".mapareaboxd").css("marginLeft", "382px");
	$("#map_area .area_cont .map_remark .map_location").css("marginLeft", "0");
	$(".interactive_tit").show();
	$(".interactive_box").css("width", "381px");
	$(".map_left_btn").css("left", "381px");

	
});

$(function(){
	
	var baseTopHeight = $(".tabcon").height();
	var baseDragHeight = $("#lineDragDiv").position().top;
	var baseBottomHeight = $(".controll_section03").height();
	$( "#lineDragDiv" ).draggable({
		axis: "y",
		containment: [0, 350, 0, 800],
		drag: function(event) {
			var movePixel = $(this).css("top").replace("px","") - baseDragHeight;
			$(".tabcon").css("height", eval(baseTopHeight) + eval(movePixel) + "px");
			$(".statsDetailRgn").css("height", eval(baseTopHeight) + eval(movePixel) + "px");
			$(".controll_section03").css("height", eval(baseBottomHeight) - eval(movePixel) + "px");
		}
	});
	
	$("#header").css("margin-bottom", "0px")
	
	// map size
	var mapheight = $(window).height();
	$(".map_img").css("height", "743px");

	// layer pop
	$(".layer_l01").click(function(){
		$(".map_layer_location01").toggle();
	});

	$(".layer_l02").click(function(){
		$(".map_layer_location02").toggle();
	});

	$(".layer_l03").click(function(){
		$(".map_layer_location03").toggle();
	});

	// 사업체전개도
	$(".btn_map_sel2").click(function(){
		$(this).toggleClass("on");
	});

	$(".map_area_category ul li a").click(function(){
		$(".map_area_category ul li a").removeClass("on");
		$(this).addClass("on");
	});

	// 알림팝업
	$(".alarm_pop").hover( 
		function() { $(".layer_alarm_pop").show();
		}, 
		function() { $(".layer_alarm_pop").hide();
	});

	$(".map_ct_controll .list_type01 li a > em").mouseover(function(){
		$(".layer_alarm_pop2").hide();
		$(".alarm_content > div").eq($(".map_ct_controll .list_type01 li a > em").index(this)).show();
	});

	$(".map_ct_controll .list_type01 li a > em").mouseleave(function(){
		$(".layer_alarm_pop2").hide();
	});

	// 기능팝업_좌측상단 물음표 TIP 클릭시
	$(".alarm_pop2").click(function(){
		$(".deem").show();
		$(".pop_001").show();
	});


	// 버튼바구니
	$(".pocket_in > p").click(function(){
		$(this).toggleClass("on");
	});

	// left menu
	$(".interactive_category ul li").click(function(){
		$(".interactive_category ul li").removeClass("on");
		$(this).addClass("on");
		$(".tabcon > div").show();
		$(".btn_box").show();
		$(".controll_section02").show();
		$(".controll_section03").show();
		$(".controll_section04").show();
		$(".mapareaboxd").css("marginLeft", "382px");

		// option open
		$("#map_area .area_cont .map_remark .map_location").css("marginLeft", "0");
		$(".interactive_tit").show();
		$(".interactive_box").css("width", "381px");
		$(".map_left_btn").css("left", "381px");
		$("#layer_map").css("zIndex", "10");

		$(".interactive_tit").css({
			"width":"382px",
			"display":"block",
			"zIndex":"3"
		});
		$(".interactive_tit > p").show();
	});


	// list type
	$(".list_type01 li a").click(function(){
		$(this).parent().toggleClass("on");
		$(this).next().toggle();
	});
	
	$(".list_type02 li a").click(function(){
		$(this).parent().toggleClass("on");
		$(this).next().toggle();
	});

	// left menu btn
	$(".map_left_btn").click(function(){
		var mlb = $(".map_left_btn").css("left");
		if ( mlb == "0px" ){
			$(".mapareaboxd").css("marginLeft", "80px");
			$(this).addClass("on");
			$(".map_left_btn").css("left", "80px");
			$("#map_area, #map_area2").css("zIndex", "2");
			$("#map_area .area_cont .map_remark .map_location").css("marginLeft", "-80px");
			$("#layer_map").css("zIndex", "");
			$(".map #layer_map .interactive_box").css({
				"marginTop" : "44px",
				"paddingTop" : "0px",
			});
			$(".interactive_box").css("width", "80px");
			$(".interactive_tit").css({
				"width":"80px",
				"display":"block",
				"zIndex":"0"
			});
			$(".interactive_tit > p").hide();

			var m2ml = $("#map_area2 .area_cont .map_remark .map_location").css("marginLeft");
			if ( m2ml == "0" ){
				$("#map_area2 .area_cont .map_remark .map_location").css("marginLeft", "-80px");
			} else {
				$("#map_area2 .area_cont .map_remark .map_location").css("marginLeft", "0");
			}

		} else {
			$(".tabcon > div").hide();
			$(".btn_box").hide();
			$(".controll_section02").hide();
			$(".controll_section03").hide();
			$(".controll_section04").hide();
			
			$(".mapareaboxd").css("marginLeft", "0");
			$(this).removeClass("on");
			$(".map_left_btn").css("left", "0");
			$("#map_area, #map_area2").css("zIndex", "2");
			$("#map_area .area_cont .map_remark .map_location").css("marginLeft", "0");
			$("#layer_map").css("zIndex", "");
			$(".map #layer_map .interactive_box").css({
				"marginTop" : "44px",
				"paddingTop" : "0px",
			});
			$(".interactive_box").css("width", "80px");
			$(".interactive_box").css("width", "80px");
			$(".interactive_tit").css({
				"width":"80px",
				"display":"none",
				"zIndex":"0"
			});
			$(".interactive_tit > p").hide();

			var m2ml = $("#map_area2 .area_cont .map_remark .map_location").css("marginLeft");
			if ( m2ml == "0" ){
				$("#map_area2 .area_cont .map_remark .map_location").css("marginLeft", "-80px");
			} else {
				$("#map_area2 .area_cont .map_remark .map_location").css("marginLeft", "0");
			}
		}
		
		//맵 업데이트
		for (var i=0; i<$bizStatsMap.ui.mapList.length; i++) {
			$bizStatsMap.ui.mapList[i].update();
		}

	});


	// 국가DB 연계 서비스
	$(".btn_mapinfo_close").click(function(){
		$(".map_info").hide();
	});

	$(".lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =	"<div class='layer_alarm_pop'>" +
								"<p>" +
									"<font size='2' style='font-weight: bold;'>인구, 주택종류, 아파트 시세, 사업체 종류에 선택된 조건에 따라 지역을 찾습니다.<br>" +
									"(최소 한가지 조건은 선택되어야 합니다.)</font><br>" +
									"<div style='margin-left:5px;'>" +
										"<p>" +
											"<font size='3' style='font-weight: bold;'>·</font> <b>인구 (상위 30%에 해당하는 지역 검색)</b><br>" +
											"<div style='margin-left:10px;'>" +
												"<p>" +
													"거주인구 비율, 직장인구 비율중 선택 - 거주인구<br/>" +
													"성별(선택, 남성/여성)과 연령 (선택, 다중선택)으로 세부 설정 가능<br/>" +
												"</p>" +
											"</div>" +
										"</p>" +
									"</div>" +
									"<div style='margin-left:5px;'>" +
										"<p>" +
											"<font size='3' style='font-weight: bold;'>·</font> <b>주택종류 (상위 30%에 해당하는 지역 검색)</b><br>" +
										"</p>" +
									"</div>" +
									"<div style='margin-left:5px;'>" +
										"<p>" +
											"<font size='3' style='font-weight: bold;'>·</font> <b>아파트 시세</b><br>" +
											"<div style='margin-left:10px;'>" +
												"<p>" +
													"<font size='2' style='font-weight: bold;'>&#45;</font> <b>상위</b> : 아파트 시세 상위 30% 지역<br>" +
													"<font size='2' style='font-weight: bold;'>&#45;</font> <b>중위</b> : 아파트 시세 상위 31% ~ 70%지역<br>" +
													"<font size='2' style='font-weight: bold;'>&#45;</font> <b>하위</b> : 아파트 시세 하위 30% 지역<br>" +
									          	"</p>" +
											"</div>" +
										"</p>" +
									"</div>" +
									"<div style='margin-left:5px;'>" +
										"<p>" +
											"<font size='3' style='font-weight: bold;'>·</font> <b>사업체 (사업체수가 많은 상위 30% 지역)</b><br>" +
											"<div style='margin-left:10px;'>" +
												"<p>" +
													"<font size='2' style='font-weight: bold;'>&#45;</font> 종류 (택1)<br>" +
													"<font size='2' style='font-weight: bold;'>&#45;</font> 사업체수 (많은지역, 적은지역 택1)<br>" +
													"<font size='2' style='font-weight: bold;'>&#45;</font> 증감 (증가한 지역, 감소한 지역 택1)<br>" +
									          	"</p>" +
											"</div>" +
										"</p>" +
									"</div>" +
							    "</p>" +
						    "</div>" +
						    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		}
	});
	
	$(".lpop_alarm").find("img").click(false);
	
});



$(function() {
	// 인구 slider
	$( "#slider-range" ).slider({
	  range: true,
	  min: 0,
	  max: 500,
	  values: [ 75, 300 ],
	  slide: function( event, ui ) {
		$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	  }
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	  " - $" + $( "#slider-range" ).slider( "values", 1 ) );

	// 주택 slider
	$( "#slider-range2" ).slider({
	  range: true,
	  min: 0,
	  max: 500,
	  values: [ 75, 300 ],
	  slide: function( event, ui ) {
		$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	  }
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	  " - $" + $( "#slider-range" ).slider( "values", 1 ) );

	$( "#slider-range3" ).slider({
	  range: true,
	  min: 0,
	  max: 500,
	  values: [ 75, 300 ],
	  slide: function( event, ui ) {
		$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	  }
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	  " - $" + $( "#slider-range" ).slider( "values", 1 ) );

	// 농림어업 slider
	$( "#slider-range4" ).slider({
	  range: true,
	  min: 0,
	  max: 500,
	  values: [ 75, 300 ],
	  slide: function( event, ui ) {
		$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	  }
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	  " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	
	
	
});