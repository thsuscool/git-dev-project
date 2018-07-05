// 튜토리얼
function readyTutorial() {
	var confirmMsg = confirm("우리동네 생활업종 처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n"
			+ "진행하시겠습니까?");
	if (confirmMsg == 1) {
	//	setCookie("confirmMsg", "done", 365);
		var iWidth = $(window).width();
		var iHeight = $(window).height();
		if (iWidth > 1920 || iHeight > 1080) {
			var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
					+ "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n" + "그래도 실행 하시겠습니까?");
			if (warnMsg == 1) {
				$(".tutorialWrapper").show();
				location.href = "/view/bizStats/bizStatsMap?tutorial_mode";
			} else {
				alert("우리동네 생활업종 화면으로 돌아가겠습니다.");
				return false;
			}
		} else {
			location.href = "/view/bizStats/bizStatsMap?tutorial_mode";
		}
	} else {
	//	setCookie("confirmMsg", "done", 365);
		return false;
	}
}

function startTutorial() {
	if($(window).height()>=1080||$(window).width()>=1920){
		$("#toPoint_db3").css("top","540px");
	}else{
		$("#toPoint_db3").css("bottom","320px");		
	}
//	var board_height_ = $("#dataBoardImgDiv").height();
	$(document).keyup(function(event) {
		if (window.event.keyCode == 27) {
			closeTutorial();
		}
	})

	$(window).resize(function() {

		if (this.resizeTO) {
			clearTimeout(this.resizeTO);
		}
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		}, 100);

	});
	$(window).on('resizeEnd',function() {
				$("#dataBoardImgDiv").css("top", 138);
				var iWidth_ = $(window).width();
				var iHeight_ = $(window).height();
				if (iWidth_ > 1920 || iHeight_ > 1080 || iWidth_ < 800
						|| iHeight_ < 600) {
					var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
							+ "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n"
							+ "그래도 실행 하시겠습니까?");
					if (warnMsg == 1) {
						return false;
					} else {
						alert("우리동네 생활업종 화면으로 돌아가겠습니다.");
						location.href = "/view/bizStats/bizStatsMap";
					}
				}
			});
	tutorial_log();	
	$("#tuto_start_btn").hide();
	$(".tutorialWrapper").show();
	$("#mainMenuImg").show();
	$("#headerTutorial").show();

	var mainMenuChk = 0;
	var cleanChk = 0;
	var addrChk = 0;
	var okChk = 0;
	var clipChk = 0;

	$("#tutorialText").append("<div class=\"title\">"
					+ "<p><span style=\"margin-left:5px;\">우리동네 생활업종 첫 사용을 환영합니다!</span></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">우리동네 생활업종</strong>은 음식점 등 36종의 주요 생활업종에 대해 지역별 통계를 보여줍니다.</strong><br>"
					+ "우리동네에 대해 더 자세히 알고 싶을 때, 생활업종의 전망을 알고 싶을 때,또는 창업 시 입지선정까지 다방면으로 활용하실 수 있습니다.<br>"
					+ "먼저 전체적인 경향성을 살펴보겠습니다. <strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
					+ "</p></div>");
	
	var posi = "";
	var width = 0;
	var height = 0;
	var tutoImg = [$("#mainMenuImg"),
	               $("#sidoBizMainImg"),$("#sidoBizPoiImg1"),$("#sidoBizDbFoodImg"),$("#pageClipImg"),$("#mainMenuImg"),
	               $("#sggBizMainImg"),$("#restaurantImg"),$("#cafeImg"),$("#addrSearchImg"),$("#okImg"),
	               $("#sggMapInfoImg"),$("#chickenImg"),$("#mainMenuImg"),$("#areaBizMainImg"),$("#restaurantOnImg"),
	               $("#serviceImg"),$("#pcImg"),$("#areaHeatSido"),$("#areaHeatSgg"),$("#heatRadiusImg"),
	               $("#pcInfoImg1"),$("#mainMenuImg"),$("#searchBizMainImg"),$("#companyCntImg"),$("#ccOption"),
	               $("#employeeImg"),$("#searchBtnImg"),$("#addrSearchImg"),$("#okImg"),$("#dragBizImg"),
	               $("#compareImg"),$("#galmaDetailBtn"),$("#pageClipImg"),$("#pageClipImg"),$("#searchJobGraphImg"),
	               $("#mainMenuImg"),$("#jobOpenImg"),$("#jobOpenImg2"),$("#jobOpenImg3")];
	var pointImg = [4,
	                4,2,1,2,4,
	                4,2,2,4,1,
	                2,1,4,4,4,
	                4,2,2,2,4, 
	                1,4,4,4,2,
	                4,4,4,1,4,
	                2,2,2,2,1,
	                4,4,4,4];
	var tutoIndex = 0;
	function posiInfo(i) {
		tutoIndex = i;

		if (i < 0) {
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();
		} else {
			posi = tutoImg[i].position();
			width = tutoImg[i].width() / 2;
			height = tutoImg[i].height() / 2;
			pointInfo(i, true);
		}

		$(window).resize(function() {
//			var board_re_height_ = $("#dataBoardImgDiv").height();
//			if (board_re_height_ > board_height_) {
//				$("#dataBoardImgDiv").css("height", board_height_);
//			} else {
//				$("#dataBoardImgDiv").css("height", $(window).height());
//			}
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();

			if (this.resizeTO) {
				clearTimeout(this.resizeTO);
			}
			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 300);

		});
		$(window).on('resizeEnd', function() {
			posiInfo(tutoIndex);
		});
	}

	function pointInfo(i, clicked) {
		if (clicked) {
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();

			$("#toPoint_1").clearQueue().stop();
			$("#toPoint_2").clearQueue().stop();
			$("#toPoint_3").clearQueue().stop();
			$("#toPoint_4").clearQueue().stop();

			switch (pointImg[i]) {
			case 1:
				$("#toPoint_1").css("top", posi.top + (height * 2));
				$("#toPoint_1").css("left", posi.left + width);
				$("#toPoint_2").css("top", posi.top + (height * 2));
				$("#toPoint_2").css("left", posi.left + width);
				$("#toPoint_3").css("top", posi.top + (height * 2));
				$("#toPoint_3").css("left", posi.left + width);
				$("#toPoint_4").css("top", posi.top + (height * 2));
				$("#toPoint_4").css("left", posi.left + width);
				break;
			case 2:
				$("#toPoint_1").css("top", posi.top - 15);
				$("#toPoint_1").css("left", posi.left - 70);
				$("#toPoint_2").css("top", posi.top - 15);
				$("#toPoint_2").css("left", posi.left - 70);
				$("#toPoint_3").css("top", posi.top - 15);
				$("#toPoint_3").css("left", posi.left - 70);
				$("#toPoint_4").css("top", posi.top - 15);
				$("#toPoint_4").css("left", posi.left - 70);
				break;
			case 3:
				$("#toPoint_1").css("top", posi.top - (height * 4));
				$("#toPoint_1").css("left", posi.left + width);
				$("#toPoint_2").css("top", posi.top - (height * 4));
				$("#toPoint_2").css("left", posi.left + width);
				$("#toPoint_3").css("top", posi.top - (height * 4));
				$("#toPoint_3").css("left", posi.left + width);
				$("#toPoint_4").css("top", posi.top - (height * 4));
				$("#toPoint_4").css("left", posi.left + width);
				break;
			case 4:
				$("#toPoint_1").css("top", posi.top - 15);
				$("#toPoint_1").css("left", posi.left + (width * 2));
				$("#toPoint_2").css("top", posi.top - 15);
				$("#toPoint_2").css("left", posi.left + (width * 2));
				$("#toPoint_3").css("top", posi.top - 15);
				$("#toPoint_3").css("left", posi.left + (width * 2));
				$("#toPoint_4").css("top", posi.top - 15);
				$("#toPoint_4").css("left", posi.left + (width * 2));
				break;
			}
		}

		var pointId = "#toPoint_" + pointImg[i];

		switch (pointImg[i]) {
		case 1:
			$(pointId).animate({
				top : posi.top + (height * 2),
				left : posi.left + width
			}, 500, "", function() {
				$(this).animate({
					top : posi.top + (height * 2) + 10,
					left : posi.left + width
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		case 2:
			$(pointId).animate({
				top : posi.top - 15,
				left : posi.left - 70
			}, 500, "", function() {
				$(this).animate({
					top : posi.top - 15,
					left : posi.left - 80
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		case 3:
			$(pointId).animate({
				top : posi.top - (height * 4),
				left : posi.left + width
			}, 500, "", function() {
				$(this).animate({
					top : posi.top - (height * 4) - 10,
					left : posi.left + width
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		case 4:
			$(pointId).animate({
				top : posi.top - 15,
				left : posi.left + (width * 2)
			}, 500, "", function() {
				$(this).animate({
					top : posi.top - 15,
					left : posi.left + (width * 2) + 10
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		}
		if (clicked) {
			$(pointId).show();
		}
	}

	$("#mainMenuImg").click(function(){
		tutorial_log();
		fullMode(document.documentElement);
		if(mainMenuChk == 0){
			$("#mainMenuImg").hide();
			$(".sq02").addClass("on");
			$("#map_left_btn").css("left","280px");
			$("#map_left_btn").css("width","40px");
			$("#map_left_btn>span").css("display","none");
			$(".step01").css("left",0);
			$("#sidoBizMainImg").show();
			mainMenuChk = 1;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">시도별 생활업종 현황을 클릭해 보세요.</strong>"
							+ "</p></div>");
			posiInfo(1);
		}else if(mainMenuChk == 1){
			$("#sidoBizDataBoardImg3").hide();
			$("#bizMapImg2").hide();
			
			$("#mainMenuImg").hide();
			$("#sggBizMainImg").show();
			$(".sq02").addClass("on");
			$("#map_left_btn").css("left","280px");
			$("#map_left_btn").css("width","40px");
			$("#map_left_btn>span").css("display","none");
			$(".step01").css("left",0);
			mainMenuChk = 2;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">시군구별 생활업종 현황을 클릭해 주세요.</strong>"
							+ "</p></div>");
			posiInfo(6);
		}else if(mainMenuChk == 2){
			$("#bizRedLegend1").hide();
			$("#bizMapImg5").hide();
			$("#sggMapInfoImg2").hide();
			$("#sggBizDataBoardImg2").hide();
			
			$(".icon02").removeClass("on");
			$(".stepBox>a:eq(0)").removeClass("on");
			$("#mainMenuImg").hide();
			$("#areaBizMainImg").show();
			$(".sq02").addClass("on");
			$("#map_left_btn").css("left","280px");
			$("#map_left_btn").css("width","40px");
			$("#map_left_btn>span").css("display","none");
			$(".step01").css("left",0);
			mainMenuChk = 3;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">업종 밀집도 현황을 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(14);
		}else if(mainMenuChk == 3){
			$("#areaBizDataBoardImg5").hide();
			$("#bizMapImg14").hide();
			$("#areaHeatLegend2").hide();
			$("#pcInfoImg2").hide();

			$("#mainMenuImg").hide();
			$(".icon03").removeClass("on");
			$(".stepBox>a:eq(0)").removeClass("on");
			$(".sq02").addClass("on");
			$("#map_left_btn").css("left","280px");
			$("#map_left_btn").css("width","40px");
			$("#map_left_btn>span").css("display","none");
			$(".step01").css("left",0);
			$("#searchBizMainImg").show();
			mainMenuChk = 4;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">생활업종 후보지 검색 메뉴를 선택해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(23);
		}else if(mainMenuChk == 4){
			$("#searchBizDataBoardImg5, #bizMapImg13, #redLegendInfo1").hide();
			
			$("#mainMenuImg").hide();
			$(".icon05").removeClass("on");
			$(".stepBox>a:eq(0)").removeClass("on");
			$(".sq02").addClass("on");
			$("#map_left_btn").css("left","280px");
			$("#map_left_btn").css("width","40px");
			$("#map_left_btn>span").css("display","none");
			$(".step01").css("left",0);
			$("#jobOpenImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">업종별 개업현황은</strong>지자체 인허가 업종(문화체육,관광,식품,소상공인,<br> "
					+ "산업고용 등 5개분류)에 대한 업종별 개업 현황을 제공합니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">업종별 개업 현황을 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(37);
		}
	});
	$("#sidoBizMainImg").click(function(){
		tutorial_log();
		$(".tb_right").hide();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#sidoBizMainImg").hide();
		$("#bizMapImg1").show();
		$("#sidoBizPoiImg1").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">서울을 클릭해 보세요.</strong>"
						+ "</p></div>");
		posiInfo(2);
	});
	$("#sidoBizPoiImg1").click(function(){
		tutorial_log();
		$("#sidoBizPoiImg1").hide();
		$("#bizMapImg1").hide();
		$("#bizMapImg2").show();
		$("#sidoBizDataBoardImg").show();
		$("#sidoBizDbFoodImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서울의 생활업종현황을 요약하여 볼 수 있습니다.<br>"
				+ "데이터보드에서 <strong style=\"color:#ee7c1a;  font-weight:bold;\">음식점을 클릭해 보세요.</strong>"
				+ "</p></div>");
		posiInfo(3);
	});
	$("#sidoBizDbFoodImg").click(function(){
		tutorial_log();
		$("#sidoBizDataBoardImg").hide();
		$("#sidoBizDbFoodImg").hide();
		$("#sidoBizDataBoardImg2").show();
		$("#pageClipImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>생활업종 구성을 파이그래프로 간단히 파악할 수 있습니다.<br>"
				+ "역시 한식이 가장 많네요."
				+ "이제 메뉴를 눌러 <strong style=\"color:#ee7c1a;  font-weight:bold;\">파이그래프를 닫아주세요.</strong>"
				+ "</p></div>");
		posiInfo(4);
	});
	$("#pageClipImg").click(function(){
		tutorial_log();
		if(clipChk == 0){
			$("#sidoBizDataBoardImg2").hide();
			$("#pageClipImg").hide();
			$("#sidoBizDataBoardImg3").show();
//			$("#cleanImg").show();
//			$("#cleanImg").css("right","122px");
			
			$("#mainMenuImg").show();
			
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>사업체 수, 비율, 종사자 등 지표별로 어떤 업종이 서울에서 가장 많은지 순위를 볼 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
					+ "</p></div>");
			clipChk = 1;
			posiInfo(5);
		}else if(clipChk == 1){
			$("#pageClipImg").css("top","616px");
			$("#searchBizDataBoardImg2").hide();
			$("#searchBizDataBoardImg3").show();
			clipChk = 2;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">한번더 메뉴를 클릭하여 닫아 주세요.</strong>"
					+ "</p></div>");
			posiInfo(34);
		}else if(clipChk == 2){
			$("#pageClipImg").hide();
			$("#searchBizDataBoardImg3").hide();
			$("#searchBizDataBoardImg4").show();
			$("#searchJobGraphImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지역 종합현황정보 보기에서는 선택한 지역의 다양한 생활업종 현황을 그래프로 볼 수 있습니다.<br>"
					+ "데이터보드에서 각 지표를 클릭하면 됩니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">소상공인 업종별 증감을 눌러 주세요.</strong>"
					+ "</p></div>");
			posiInfo(35);
		}
	});
	$("#sggBizMainImg").click(function(){
		tutorial_log();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');
		$("#sggBizMainImg").hide();
		$("#restaurantImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서울에서 카페가 가장 많은 지역은 어디일까요?.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식점을 클릭해 주세요.</strong>"
				+"</p></div>");
		posiInfo(7);
	});
	$("#restaurantImg").click(function(){
		tutorial_log();
		$(".stepBox>a:eq(0)").addClass("on");		
		$(".stepBox>div:eq(0)").css("display","block");		
		$("#restaurantImg").hide();
		$("#cafeImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">카페를 클릭해 주세요.</strong>"
				+"</p></div>");
		posiInfo(8);
	});
	$("#cafeImg").click(function(){
		tutorial_log();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#cafeImg").hide();
		$("#bizRedLegend1").show();
		$("#bizMapImg3").show();
		$("#addrSearchImg").show();
		$("#addrSearchImg").css("border-style", "outset");
		$("#addrSearchImg").css("cursor", "pointer");
		$("#addrSearchImg").css("border-width", 3);
		$("#addrSearchImg").css("border-color", "red");
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서울시 강남구를 찾아보겠습니다."
				+ "좌측 상단의<strong style=\"color:#ee7c1a;  font-weight:bold;\"> 지역선택 콤보박스를 클릭해 주세요.</strong>"
				+"</p></div>");
		posiInfo(9);
	});
	$("#addrSearchImg").click(function(){
		tutorial_log();
		if(addrChk == 0){
			$("#addrChoiceImg3").show();
			$("#addrSearchImg").css("border", 0);
			$("#addrSearchImg").css("margin", 3);
			$("#okImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">서울특별시 강남구를 선택해 주세요.</strong>"
					+"</p></div>");
			posiInfo(10);
			addrChk = 1;
		}else if(addrChk == 1){
			$("#addrChoiceImg4").show();
			$("#addrSearchImg").css("border", 0);
			$("#addrSearchImg").css("margin", 3);
			$("#okImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">대전광역시 서구를 선택해 주세요.</strong>"
					+"</p></div>");
			posiInfo(29);
		}
	});
	$("#okImg").click(function(){
		tutorial_log();
		if(okChk == 0){
			$("#okImg").hide();
			$("#bizMapImg3").hide();
			$("#addrSearchImg").hide();
			$("#addrChoiceImg3").hide();
			$("#bizMapImg4").show();
			$("#sggMapInfoImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">강남구를 클릭해 주세요.</strong>"
					+"</p></div>");
			posiInfo(11);
			okChk = 1;
		}else if(okChk == 1){
			$("#addrSearchImg").hide();
			$("#addrChoiceImg4").hide();
			$("#okImg").hide();
			$("#dragBizImg").show();
			$("#dropZone").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">통계버튼을 대전 서구로 끌어다 놓아주세요.</strong>"
					+ "</p></div>");
			posiInfo(30);
		}
	});
	$("#sggMapInfoImg").mouseover(function(){
		$("#sggMapInfoTooltip").show();
	});
	$("#sggMapInfoImg").mouseout(function(){
		$("#sggMapInfoTooltip").hide();
	});
	$("#sggMapInfoImg").click(function(){
		tutorial_log();
		$("#okImg").hide();
		$("#sggBizDataBoardImg1").show();
		$("#chickenImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>강남구 카페 수가 1,629개로 서울시에서 제일 많은 것을 확인할 수 있습니다.<br>"
				+ "사업체수 뿐만 아니라 업종비율, 거주인구, 종사자수 등 다양한 지표로 비교해 볼 수 있습니다.<br>"
				+ "데이터보드에서 클릭하여 다른 생활업종을 간단히 조회할 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">치킨을 클릭해 보세요.</strong>"
				+"</p></div>");
		posiInfo(12);
	});
	$("#chickenImg").click(function(){
		tutorial_log();
		$("#mainMenuImg").show();
		$("#chickenImg").hide();
		$("#bizMapImg4").hide();
		$("#sggBizDataBoardImg1").hide();
		$("#sggMapInfoImg").hide();
		$("#bizMapImg5").show();
		$("#sggMapInfoImg2").show();
		$("#sggBizDataBoardImg2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>이제 시간에 따른 업종의 변화를 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭하세요.</strong>"
				+"</p></div>");
		posiInfo(13);
	});
	$("#sggMapInfoImg2").mouseover(function(){
		$("#sggMapInfoTooltip2").show();
	});
	$("#sggMapInfoImg2").mouseout(function(){
		$("#sggMapInfoTooltip2").hide();
	});
	$("#areaBizMainImg").click(function(){
		tutorial_log();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');
		$("#areaBizMainImg").hide();
		$("#restaurantOnImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">음식점을 닫아주세요.</strong>"
				+"</p></div>");
		posiInfo(15);
	});
	$("#restaurantOnImg").click(function(){
		tutorial_log();
		$("#restaurantOnImg").hide();
		$(".stepBox>a:eq(0)").removeClass("on");		
		$(".stepBox>div:eq(0)").css("display","none");	
		$("#serviceImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">서비스를 클릭해 주세요.</strong>"
				+"</p></div>");
		posiInfo(16);
	});
	$("#serviceImg").click(function(){
		tutorial_log();
		$("#serviceImg").hide();
		$(".stepBox>a:eq(2)").addClass("on");		
		$(".stepBox>div:eq(2)").css("display","block");	
		$("#pcImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">pc방을 선택해 주세요.</strong>"
				+"</p></div>");
		posiInfo(17);
	});
	$("#pcImg").click(function(){
		tutorial_log();
		$("#pcImg").hide();
		$("#bizMapImg6").show();
		$("#areaHeatLegend").show();
		$("#areaBizDataBoardImg1").show();
		$("#areaHeatSido").show();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>대도시를 중심으로 골고루 분포되어 있는 것을 볼 수 있습니다.<br> "
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">서울을 클릭해 보겠습니다.</strong>"
				+"</p></div>");
		posiInfo(18);
	});
	$("#areaHeatSido").click(function(){
		tutorial_log();
		$("#bizMapImg6").hide();
		$("#areaBizDataBoardImg1").hide();
		$("#areaHeatSido").hide();
		$("#areaBizDataBoardImg2").show();
		$("#bizMapImg7").show();
		$("#areaHeatSgg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서울내에서의 분포가 더 세밀한 열지도로 그려집니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">강남구를 클릭하여 한 번 더 지도를 확대해 보세요.</strong>"
				+"</p></div>");
		posiInfo(19);
	});
	$("#areaHeatSgg").click(function(){
		tutorial_log();
		$("#areaBizDataBoardImg2").hide();
		$("#bizMapImg7").hide();
		$("#areaHeatSgg").hide();
		$("#bizMapImg8").show();
		$("#heatRadiusImg").show();
		$("#areaBizDataBoardImg3").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>열지도의 시각화 정도를 좌측 하단 범례에서 조절할 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">반지름을 40으로 키워볼까요?.</strong>"
				+"</p></div>");
		posiInfo(20);
	});
	$("#heatRadiusImg").click(function(){
		tutorial_log();
		$("#areaBizDataBoardImg3").hide();
		$("#bizMapImg8").hide();
		$("#heatRadiusImg").hide();
		$("#areaHeatLegend").hide();
		$("#bizMapImg9").show();
		$("#areaHeatLegend2").show();
		$("#area2006Img").show();
		$("#dataBoardImgDiv").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#dataBoardImgDiv").css({"background-image":"url(/img/tutorial/areaBizDataBoardImg4.png)","background-position":"top"});
			$("#area2006Img").css("top","627px");
		}else{
			$("#dataBoardImgDiv").css({"background-image":"url(/img/tutorial/areaBizDataBoardImg4.png)","background-position":"bottom"});
			$("#area2006Img").css("bottom","234px");
		}
		if($(window).height()>=1080||$(window).width()>=1920){
			tPoint1_1();
		}else{
			tPoint1();
		}
		function tPoint1() {
			$("#toPoint_db3").animate({
				right : 450,
				bottom : 320
			}, 500, "", function() {
				$(this).animate({
					right : 450,
					bottom : 340
				}, 500, "", function() {
					tPoint1();
				});
			});
		}
		function tPoint1_1() {
			$("#toPoint_db3").animate({
				right : 450,
				top : 540
			}, 500, "", function() {
				$(this).animate({
					right : 450,
					top : 550
				}, 500, "", function() {
					tPoint1_1();
				});
			});
		}
		$("#toPoint_db3").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>우측 데이터보드에는 시간에 따른 PC방의 증감을 볼 수 있는데,<br>"
				+ " 조회년도에서 연도를 선택하면 과거 데이터를 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">2006년을 선택해 보세요.</strong>"
				+"</p></div>");
		posiInfo(-1);
	});
	$("#area2006Img").click(function(){
		tutorial_log();
		$("#dataBoardImgDiv").hide();
		$("#areaBizDataBoardImg5").show();
		$("#toPoint_db3").hide();
		$("#bizMapImg9").hide();
		$("#area2006Img").hide();
		$("#bizMapImg10").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>현재에 비해 PC방이 많죠?<br>"
				+ "이 상태에서 지도를 더 확대하면 개별 PC방의 위치를 확인할 수 있습니다.<br>"
				+ "<strong style=\"color:#ff0000;  font-weight:bold;\">휠을 돌려 지도를 확대해 주세요.</strong>"
				+"</p></div>");
		posiInfo(-1);
	});
	
	$("body").on("mousewheel DOMMouseScroll",function(e){
		if($("#bizMapImg10").is(":visible")){	
			var E = e.originalEvent;
			if(E.deltaY < 0){
				tutorial_log();
				$("#bizMapImg10").hide();
				$("#bizMapImg14, #pcInfoImg1").show();					
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">점을 클릭하면 사업체 이름을 볼 수 있습니다.</strong></p></div>");
				posiInfo(21);
			}
		}
	});
	
	$("#pcInfoImg1").click(function(){
		tutorial_log();
		$("#pcInfoImg1").hide();
		$("#pcInfoImg2").show();
		$("#mainMenuImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>이제 생활업종 창업을 고려하는 경우 후보지 선정에 참고할 수 있는 기능을 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong></p></div>");
		posiInfo(22);
	});
	
	$("#searchBizMainImg").click(function(){
		tutorial_log();
		$("#searchBizMainImg").hide();
		$("#companyCntImg").show();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">생활업종 후보지 검색</strong>은 창업시 고려할 요소를 지정해 선택하면, 해당 지역에서 가장 지표에 부합하는 지역을 3개까지 추천해 주는 기능입니다.<br>"
				+ "한식의 경우를 예로 들어보겠습니다. 전략에 따라 한식업종이 몰려있는 지역 또는 없는 지역을 선택할 수 있겠지요."
				+ "이 튜토리얼에서는 한식업종이 없는 지역으로 고르겠습니다.<br>"
				+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘사업체수’를 클릭해 보겠습니다.</strong>"
				+ "</p></div>");
		posiInfo(24);
	});
	$("#companyCntImg").click(function(){
		tutorial_log();
		$("#companyCntImg").hide();
		$("#companyCountAtag").addClass("on");
		$bizStatsLeftMenu.ui.areaSearchCondition('companyCount');
		$("#ccOption").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">업종에서 ‘한식’을 선택하고 사업체수가 적은지역으로 선택하겠습니다.</strong>"
				+ "</p></div>");
		posiInfo(25);
	});
	$("#ccOption").click(function(){
		tutorial_log();
		$("#ccOption").hide();
		$("#companyCount>a").css("left",0);
		$("#employeeImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>수요자가 많은 지역을 선정하는 것도 중요하지요.<br>"
				+ "직장인에게 점심을 주로 파는 식당의 경우 직장인구가 많은 지역이 유리할 것입니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">직장인구를 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(26);
	});
	$("#employeeImg").click(function(){
		tutorial_log();
		$("#employeeImg").hide();
		$("#jobPeopleAtag").addClass("on");
		$bizStatsLeftMenu.ui.areaSearchCondition('jobPeople');
		$("#searchBtnImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">이제 조건버튼 생성을 눌러주세요.</strong>"
				+ "</p></div>");
		posiInfo(27);
	});
	$("#searchBtnImg").click(function(){
		tutorial_log();
		$("#searchBtnImg").hide();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#redLegendInfo1").show();
		$("#bizMapImg11").show();
		$("#addrSearchImg").show();
		$("#addrSearchImg").css({"top":"102px","left":"144px","cursor":"pointer"});
		$("#addrSearchImg").css("border-style", "outset");
		$("#addrSearchImg").css("border-width", 3);
		$("#addrSearchImg").css("border-color", "red");
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">지역선택 콤보박스를 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(28);
	});
	$("#dragBizImg").draggable({
		helper : "clone"
	});
	$("#dropZone").droppable({
		accept : "#dragBizImg",
		drop : function(e){
			tutorial_log();
			$("#bizMapImg11").hide();
			$("#dragBizImg").hide();
			$("#dropZone").hide();
			$("#bizMapImg12").show();
			$("#searchBizDataBoardImg1").show();
			$("#redLegendInfo1").show();
			$("#compareImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>대전 서구에서 조건에 가장 맞는 지역이 3개까지 추천되었습니다.<br>" 
					+ "데이터보드에서 ‘비교하기’ 버튼을 눌러 세 지역의 특성을 비교해 보겠습니다<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">비교하기 버튼을 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(31);
		}
	});
	$("#compareImg").click(function(){
		tutorial_log();
		$("#searchBizDataBoardImg1").hide();
		$("#redLegendInfo1").hide();
		$("#bizMapImg12").hide();
		$("#compareImg").hide();
		$("#tuto_dimbox").show();
		$("#compareInfoImg").show();
		$("#xxImg").show();
		tPoint2();
		function tPoint2() {
			$("#toPoint_db2").animate({
				left : 1080,
				top : 0
			}, 500, "", function() {
				$(this).animate({
					left : 1100,
					top : 0
				}, 500, "", function() {
					tPoint2();
				});
			});
		}
		$("#toPoint_db2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>세 지역의 특성을 방사형 그래프로 간단히 비교해 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">창을 닫아 주세요.</strong>"
				+ "</p></div>");
		posiInfo(-1);
	});
	$("#xxImg").click(function(){
		tutorial_log();
		$("#tuto_dimbox").hide();
		$("#compareInfoImg").hide();
		$("#xxImg").hide();
		$("#redLegendInfo1").show();
		$("#searchBizDataBoardImg1").show();
		$("#bizMapImg12").show();
		$("#galmaMapImg").show();
		$("#galmaDetailBtn").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>추천된 지역을 하나씩 클릭하여 현황을 볼 수도 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">갈마2동을 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(32);
	});
	$("#galmaDetailBtn").click(function(){
		tutorial_log();
		$("#searchBizDataBoardImg1").hide();
		$("#bizMapImg12").hide();
		$("#galmaMapImg").hide();
		$("#galmaDetailBtn").hide();
		$("#bizMapImg13").show();
		$("#searchBizDataBoardImg2").show();
		$("#pageClipImg").show();
		$("#pageClipImg").css("top","343px");
		$("#redBizLegend1").hide();
		$("#redBizLegend2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>후보지 검색결과와 지역특성정보가 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">메뉴를 클릭하여 닫아 주세요.</strong>"
				+ "</p></div>");
		posiInfo(33);
	});
	$("#galmaMapImg").mouseover(function(){
		$("#galmaTooltip").show();
	});
	$("#galmaMapImg").mouseout(function(){
		$("#galmaTooltip").hide();
	});
	
	$("#searchJobGraphImg").click(function(){
		tutorial_log();
		$("#searchJobGraphImg").hide();
		$("#searchBizDataBoardImg4").hide();
		$("#searchBizDataBoardImg5").show();
		$("#mainMenuImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
				+ "</p></div>"); 
		posiInfo(36);
	});

	$("#jobOpenImg").click(function(){
		tutorial_log();
		$("#jobOpenImg").hide();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');
		$("#jobOpenImg2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">산업고용(3종)을 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(38);
	});
	
	$("#jobOpenImg2").click(function(){
		tutorial_log();
		$("#jobOpenImg2").hide();
		$(".tr08 .stepBox>a").last().addClass("on");
		$(".tr08 .stepBox>div").last().css("display","block");
		$("#jobOpenImg3").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">석유판매업(주유소)을 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(39);
	});
	
	$("#jobOpenImg3").click(function(){
		tutorial_log();
		$("#jobOpenImg3").hide();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#bizMapImg15, #areaHeatLegend, #jobOpenDataBoardImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p><span style=\"margin-left:5px;\">우리동네 생활업종 튜토리얼을 마치신것을 축하합니다.!</span></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p> 지자체 인허가 업종 분류는 통계청의 표준상업분류와 체계가 다르며,<br>"
				+ "지자체 인허가 데이터는매일 업데이트 되며, 2017년 데이터는 2017년 1월 1일부터 현재까지의 데이터입니다."
				+ "<strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '우리동네 생활업종' 으로 이동합니다.)"
				+ "</p></div>"); 
		posiInfo(-1);
		setTimeout(function() {
			location.href = "/view/bizStats/bizStatsMap";
		}, 10000);
	});
	
	posiInfo(0);
}

function closeTutorial() {
	$("#tuto_start_btn").show();
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
	//	setCookie("confirmMsg", "done", 365);
		location.href = "/view/bizStats/bizStatsMap";
	} else {
		return false;
	}
}

/*function getCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires="
			+ todayDate.toUTCString() + ";"
}*/

function tutorial_log(){
	apiLogWrite2('B0', 'B37', '우리동네 생활업종 튜토리얼', '없음', '00', '없음');
}

function fullMode(element)
{
    if("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) 
    {
        if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
        {
            if("requestFullscreen" in element) 
            {
                element.requestFullscreen();
            } 
            else if ("webkitRequestFullscreen" in element) 
            {
                element.webkitRequestFullscreen();
            } 
            else if ("mozRequestFullScreen" in element) 
            {
                element.mozRequestFullScreen();
            } 
            else if ("msRequestFullscreen" in element) 
            {
                element.msRequestFullscreen();
            }
        }
    }
    else
    {
        console.log("User doesn't allow full screen");
    }
}