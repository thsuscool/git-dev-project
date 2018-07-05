/**
 * 인터랙티브맵 화면에 대한 클래스
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
	$("#API_0301").show();
	$("#API_0302").show();
	
	//첫번째 메뉴만 open한다.
	$("#API_0301").find($(".map_ct_controll")).eq(0).show();
	$("#API_0305").find($(".map_ct_controll")).eq(0).show();
	$("#API_0306").find($(".map_ct_controll")).eq(0).show();
	$("#API_0310").find($(".map_ct_controll")).eq(0).show();
	$("#API_0304-a").find($(".map_ct_controll")).eq(0).show();
	$("#kosisStatsPanel").find($(".map_ct_controll")).eq(0).show();
	
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
//	$(".btn_map_sel").click(function(){
//		$(this).toggleClass("on");
//	});

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
			$("#map_area, #map_area2").css("zIndex", "1");
			$("#map_area .area_cont .map_remark .map_location").css("marginLeft", "0px");
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
				$("#map_area2 .area_cont .map_remark .map_location").css("marginLeft", "0px");
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
		for (var i=0; i<$interactiveMap.ui.mapList.length; i++) {
			$interactiveMap.ui.mapList[i].update();
		}

	});


	// 국가DB 연계 서비스
	$(".btn_mapinfo_close").click(function(){
		$(".map_info").hide();
	});
	
	//인구총괄
	$("#API_0301 .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>인구총조사 결과 중 주요지표에 대한 통계 조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
								"<p>" +
									"<font size='3' style='font-weight: bold;'>·</font> <b>인구밀도</b> : 1㎢(1㎞ Ⅹ 1㎞)면적에 거주하는 인구<br>" +
					          		"<font size='3' style='font-weight: bold;'>·</font> <b>노령화지수</b> : 유소년(14세 이하) 인구 1백명 당 고령(65세 이상) 인구<br>" +
					          		"<font size='3' style='font-weight: bold;'>·</font> <b>노년부양비</b> : 생산가능(15세 ~ 64세) 인구 1백명 당 고령(65세 이상) 인구<br>" +
					          		"<font size='3' style='font-weight: bold;'>·</font> <b>유년부양비</b> : 생산가능(15세 ~ 64세) 인구 1백명 당 유소년(14세 이하) 인구<br>" +
					          		"<font size='3' style='font-weight: bold;'>·</font> <b>총부양비</b> : 노년부양비 + 유년부양비<br>" +
					          		"※ 특별조사구(해외주재공관, 교도소 · 소년원, 군부대, 전투경찰대, <br /> &nbsp;&nbsp;&nbsp; 의무소방대 등) 및 외국인 제외" +
					          	"</p>" +
								"</div>" +
						    "</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "400px");
	    }
	});
	
	//인구세부조건
	$("#API_0302 .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>인구총조사 항목 중 상세조건 설정에 따른 인구통계 조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
								"<p>" +
									"<font size='3' style='font-weight: bold;'>·</font> <b>성별</b> : 남성/여성 (필수)<br>" +
					          		"<font size='3' style='font-weight: bold;'>·</font> <b>연령</b> : 0세 ~ 100세 이상 (선택)<br>" +
					          		"<font size='3' style='font-weight: bold;'>·</font> <b>교육</b> : 미취학 ~ 박사 (선택)<br>" +
								"</p>" +
								"</div>" +
						    "</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "400px");
	    }
	});
	
	//가구통계
	$("#API_0305 .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>인구총조사 항목 중 상세조건 설정에 따른 가구통계 조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
								"<p>" +
									"<font size='3' style='font-weight: bold;'>·</font> <b>세대구성</b><br>" +
									"<div style='margin-left:5px;'>" +
									"<p>" +
										"일반가구에 한하여 가구주와 그 가족의 친족관계에 따라 구분" +
									"</p>" +
									"</div>" +
									"<div style='margin-left:10px;'>" +
									"<p>" +
										"<font size='2' style='font-weight: bold;'>&#45;</font> <b>1세대가구</b> : 부부가구, 형제자매가구 등 한세대가 가구를 구성한 경우<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>2세대가구</b> : 부모를 모시고 사는 부부가구 등 두세대가 가구를 구성한 경우<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>3세대가구</b> : 부모를 모시면서 자식도 같이 가구를 구성하는 경우<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>1인가구</b> : 혼자서 살림하는 가구<br><br>" +
						          	"</p>" +
									"</div>" +
								"</p>" +
								"<p>" +
						          	"<font size='3' style='font-weight: bold;'>·</font> <b>점유형태</b><br>" +
						          	"<div style='margin-left:5px;'>" +
									"<p>" +
										"일반가구에 대하여 현재 사는 집을 점유하는 형태<br>" +
									"</p>" +
									"</div>" +
						          	"<div style='margin-left:10px;'>" +
									"<p>" +
										"<font size='2' style='font-weight: bold;'>&#45;</font> <b>자 기 집</b> : 법률상 소유 여하를 불문하고 실제 거주자 소유로 되어 있는 집<br>" +
										"<font size='2' style='font-weight: bold;'>&#45;</font> <b>전 세</b> : 일정액의 현금 또는 기타 방법으로 전세금을 내고 계약기간 세 들어 사는 경우<br>" +
										"<font size='2' style='font-weight: bold;'>&#45;</font> <b>보증금 있는 월세</b> : 일정액의 보증금을 내고 매월 집세를 내는 경우<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>보증금 없는 월세</b> : 일정액의 보증금 없이 매월 집세(또는 월세)를 내는 경우<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>사 글 세</b> : 세입자가 집세를 한꺼번에 내고 매월 1개월분의 집세를 공제하는 경우<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>무 상</b> : 다른 사람 소유의 건물 등을 사용하지만 임차료 등 대가를 지불하지 않는 경우" +
									"</p>" +
									"</div>" +
								"</p>" +
								"<p>" +
					          		"<b>※ 특별조사구, 집단가구, 외국인가구 제외</b>" +
					          	"</p>" +
								"</div>" +
						    "</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "500px");
	    }
	});
	
	//주택통계
	$("#API_0306 .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>주택총조사 항목 중 상세조건 설정에 따른 주택통계 조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
								"<p>" +
									"<font size='3' style='font-weight: bold;'>·</font> <b>유형</b><br>" +
									"<div style='margin-left:10px;'>" +
									"<p>" +
										"<font size='2' style='font-weight: bold;'>&#45;</font> <b>단독주택</b> : 한 가구가 생활할 수 있도록 건축된 일반 단독주택과 여러 가구가 살 수 있도록 설계된 다가구 단독주택<br>" +
										"<font size='2' style='font-weight: bold;'>&#45;</font> <b>아 파 트</b> : 한 건물 내에 여러 가구가 거주할 수 있도록 지은 5층 이상의 영구건물로서, 구조적으로 한 가구씩 독립하여 살 수 있도록 건축된 주택<br>" +
										"<font size='2' style='font-weight: bold;'>&#45;</font> <b>연립주택</b> : 한 건물 안에 여러 가구가 살 수 있도록 지은 4층 이하의 영구건물로서 건축 당시 ‘연립주택’으로 허가받은 주택<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>다세대 주택</b> : 한 건물 내에 여러 가구가 살 수 있도록 건축된 4층 이하의 영구건물로서 건물의 연면적이 660㎡이하이면서 건축 당시 다세대주택으로 허가받은 주택<br>" +
						          		"<font size='2' style='font-weight: bold;'>&#45;</font> <b>비거주용 건물 내 주택 </b> : 비거주용 건물에 사람이 살되, 그 거주 부분이 주택의 요건(방, 부엌, 독립된 출입구)을 갖추고 있는 경우<br>" +
//						          		"<b>※ 독립된 주거</b> : 세대별로 독립된 현관, 부엌, 화장실등을 갖추는것<br>" +
						          	"</p>" +
									"</div>" +
								"</p>" +
								"<p>" +
					          		"<b>※ 특별조사구, 외국인, 빈집 제외</b>" +
					          	"</p>" +
								"</div>" +
						    "</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "800px");
	    }
	});
	
	//사업체통계-산업분류검색
	$("#API_0304-b .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>전국사업체조사 항목 중 산업분류에 따른 사업체통계 조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
								"<p>" +
									"<font size='3' style='font-weight: bold;'>·</font> <b>산업분류</b> : 9차(2006년 이후), 8차(2005년 이전)<br>" +
					          		"<b>※ 장소가 일정치 않은 개인운수(개인택시 등)업체 제외</b>" +
					          	"</p>" +
								"</div>" +
						    "</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "500px");
	    }
	});
	
	//사업체통계-테마업종
	$("#API_0304-a .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>전국사업체조사 결과 중 생활밀접업종 대해 쉽게 통계조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
									"<p>" +
										"<font size='3' style='font-weight: bold;'>·</font> <b>테마유형(선택)</b><br>" +
										"<div style='margin-left:10px;'>" +
											"<p>" +
												"<font size='2' style='font-weight: bold;'>&#45;</font> 생활편의, 쇼핑, 교통, 숙박, 음식점, 공공, 교육, 기업<br>" +
											"</p>" +
										"</div>" +
									"</p>" +
								"</div>" +
						    "</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "500px");
	    }
	});
	
	//농림어가-가구원검색
	$("#API_0310 .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>농림어업총조사 항목 중 상세조건 설정에 따른 인구통계 조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
									"<p>" +
										"<font size='3' style='font-weight: bold;'>·</font> <b>대상 (필수)</b><br>" +
										"<div style='margin-left:10px;'>" +
											"<p>" +
												"<font size='2' style='font-weight: bold;'>&#45;</font> 농가, 임가, 해수면어가, 내수면어가 중 택1<br>" +
								          	"</p>" +
										"</div>" +
									"</p>" +
								"</div>" +
								"<div style='margin-left:5px;'>" +
									"<p>" +
										"<font size='3' style='font-weight: bold;'>·</font> <b>성별 (필수)</b><br>" +
										"<div style='margin-left:10px;'>" +
											"<p>" +
												"<font size='2' style='font-weight: bold;'>&#45;</font> 전체, 남성, 여성 중 택1<br>" +
								          	"</p>" +
										"</div>" +
									"</p>" +
									"<p>" +
										"<font size='3' style='font-weight: bold;'>·</font> <b>연령 (필수)</b><br>" +
										"<div style='margin-left:10px;'>" +
											"<p>" +
												"<font size='2' style='font-weight: bold;'>&#45;</font> 가구원 나이에 대한 조건 설정<br>" +
								          	"</p>" +
										"</div>" +
									"</p>" +
								"</div>" +
						    "</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "500px");
	    }
	});
	
	//농림어가-가구검색
	$("#API_0307 .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>농림어업총조사 항목 중 상세조건 설정에 따른 가구통계 조회가 가능합니다.</font><br>" +
								"<div style='margin-left:5px;'>" +
									"<p>" +
										"<font size='3' style='font-weight: bold;'>·</font> <b>대상</b><br>" +
										"<div style='margin-left:10px;'>" +
										"<p>" +
											"<font size='2' style='font-weight: bold;'>&#45;</font> <b>농가</b> : 생계, 영리, 연구를 목적으로 농업을 경영하거나 농업에 종사하는 가구<br>" +
											"<font size='2' style='font-weight: bold;'>&#45;</font> <b>임가</b> : 산림면적을 3ha 이상 보유하면서 지난 5년간 육림작업 실적이 있거나 지난 1년간 벌목업, 양묘업을 경영하였거나, 직접 생산한 임산물 판매대금이 120만 원 이상인 가구<br>" +
											"<font size='2' style='font-weight: bold;'>&#45;</font> <b>어가</b> : 지난 1년간 판매 목적으로 1개월 이상 어선어업, 마을어업, 양식어업을 직접 경영한 가구이거나, 지난 1년간 직접 잡거나 양식한 수산물을 판 금액이 120만 원 이상인 가구<br>" +
							          	"</p>" +
										"</div>" +
									"</p>" +
								"</div>" +
							"</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "1000px");
	    }
	});
	
	//kosis 통계
	$("#kosisStatsPanel .lpop_alarm").find("img").tooltip({
		position : {my: "left+25 top-10"},
		track: true,
		tooltipClass : "layer_alarm_pop",
		content : function() {
			var html =  "<div class='layer_alarm_pop'>" +
							"<p>" +
								"<font size='2' style='font-weight: bold;'>국가승인통계 중 KOSIS에서 서비스 되고 있는 행정구역단위 통계조회가 가능합니다.</font>" +
							"</p>" +
					    "</div>" +
					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";

			return html;
		},
		open: function (event, ui) {
	        ui.tooltip.css("max-width", "500px");
	    }
	});
	
	
	$("#API_0301 .lpop_alarm").find("img").click(false);
	$("#API_0302 .lpop_alarm").find("img").click(false);
	$("#API_0305 .lpop_alarm").find("img").click(false);
	$("#API_0306 .lpop_alarm").find("img").click(false);
	$("#API_0304-b .lpop_alarm").find("img").click(false);
	$("#API_0304-a .lpop_alarm").find("img").click(false);
	$("#API_0310 .lpop_alarm").find("img").click(false);
	$("#API_0307 .lpop_alarm").find("img").click(false);
	$("#kosisStatsPanel .lpop_alarm").find("img").click(false);
	
	
	//kosis 통계-상세조회조건
//	$("#kosisDataField .lpop_alarm").find("img").tooltip({
//		position : {my: "left+25 top-10"},
//		track: true,
//		tooltipClass : "layer_alarm_pop",
//		content : function() {
//			var html =  "<div class='layer_alarm_pop'>" +
//							"<p>" +
//								"<font size='2' style='font-weight: bold;'>선택된 조회조건의 주기, 년도, 세부항목, 분류 등 상세조건을 제공</font>" +
//							"</p>" +
//					    "</div>" +
//					    "<span><img src='/img/im/icon_alarm_view.png' alt='' /></span>";
//
//			return html;
//		},
//		open: function (event, ui) {
//	        ui.tooltip.css("max-width", "500px");
//	    }
//	});
	
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