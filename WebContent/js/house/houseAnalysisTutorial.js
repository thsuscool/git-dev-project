// 튜토리얼
function readyTutorial() {
	var confirmMsg = confirm("살고싶은 우리동네 처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n"
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
				location.href = "/view/house/houseAnalysisMap?tutorial_mode";
			} else {
				alert("살고싶은 우리동네 화면으로 돌아가겠습니다.");
				return false;
			}
		} else {
			location.href = "/view/house/houseAnalysisMap?tutorial_mode";
		}
	} else {
	//	setCookie("confirmMsg", "done", 365);
		return false;
	}
}

function startTutorial() {
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
	$(window).on(
			'resizeEnd',
			function() {
				$(".tutorialWrapper_1").css("top", 172);
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
						alert("살고싶은 우리동네 화면으로 돌아가겠습니다.");
						location.href = "/view/house/houseAnalysisMap";
					}
				}
			});
	// 2017.04.05 튜토리얼apiLogWrite 추가
/*	apiLogWrite2("A0", "A28", "대화형통계지도 튜토리얼", "(NULL)", "(NULL)", "(NULL)");*/
	$("#tuto_start_btn").hide();
	var btChk = 0;
	
	$("#tutorialText").append("<div class=\"title\">"
			+ "<p><span style=\"margin-left:5px;\">살고싶은 우리동네 첫 사용을 환영합니다!</span></p>"
			+ "</div>"
			+ "<div class=\"content\">"
			+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">살고싶은 우리동네</strong>는 생활편의 시설, 교육환경, 자연환경 등 주거지 선정 조건에서<br>"
			+ "<strong style=\"color:#0040ff;  font-weight:bold;\">사용자가 원하는 조건에 맞는 주거지역을 추천해 주는 서비스</strong> 입니다.<br>"
			+ "손가락이 가리키는 곳을 따라가며 설명을 시작하겠습니다."
			+ "</p></div>");
	
	$(".tutorialWrapper").show();
	$("#bt_01").show();
	$("#headerTutorial").show();

	var posi = "";
	var width = 0;
	var height = 0;
	var tutoImg = [$("#bt_01"),
	               $("#bt_02"), $("#bt_03"), $("#bt_04"), $("#bt_05"), $("#bt_06"),
	               $("#bt_07"), $("#bt_08"), $("#bt_09"), $("#bt_10"), $("#bt_11"), 
	               $("#bt_12"), $("#bt_13"), $("#bt_14"), $("#bt_15"), $("#bt_16"), 
	               $("#bt_17"), $("#bt_18"), $("#bt_19"), $("#bt_20"), $("#bt_21"), 
	               $("#bt_22"), $("#bt_23"), $("#bt_24"), $("#bt_25"),$("#bt_11"), 
	               $("#bt_26"), $("#bt_27"), $("#bt_28"), $("#bt_29"), $("#bt_30"),
	               $("#bt_31"), $("#bt_32"), $("#bt_33"), $("#bt_34"), $("#bt_35"), 
	               $("#bt_36"), $("#bt_37"), $("#bt_38")
	               ];
	var pointImg = [1, 
	                4, 4, 4, 4, 4, 
	                2, 2, 2, 2, 4, 
	                4, 4, 4, 4, 4, 
	                4, 4, 2, 2, 2,
	                2, 2, 2, 2, 4, 
	                4, 4, 4, 4, 4, 
	                4, 4, 4, 4, 4, 
	                4, 4, 2];
	
	function posiInfo(i) {
		$houseAnalysisMap.ui.tutoIndex = i;

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
			posiInfo($houseAnalysisMap.ui.tutoIndex);
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
	$("#bt_01").click(function() {
		$("#quick-box-sub-title").text($("#look-abode").data("title"));
		$(".stepClose").data("id",$("#look-abode").attr("id"));
		$(".menu-box").hide();
		$("#look-abode-box").show();
		$(".sideQuick").removeClass("on");
		$(".quickBox").css('width','345px');
		$(".scrollBox").css('width','345px');
		$(".scrollBox .mCSB_container").css('width','345px');
		$(".IndexSelect ul").css('left','50%');
		$(".IndexSelect ul").css('width','150px');
		$(".quickBox").stop().animate({"left":"0"},200);
		$("#look-abode").addClass("on");
		$houseAnalysisMap.leftmenu.setSubmitTooltipContent();	
		$("#bt_01").hide();
		$("#bt_02").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">‘주거현황보기’에서 지역별 주거현황, 지표별 주거현황을 조회</strong>하실 수 있습니다.<br>"
				+ "현황을 보고자 하는 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘지역’</strong>을 선택해 주세요.</p></div>");
		posiInfo(1);
	});
	$("#bt_02").click(function() {
		$("#bt_02").hide();
		$("#left_01").show();
		$("#bt_03").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘대전광역시’</strong>를 선택해 주세요.</p></div>");
		posiInfo(2);
	});
	$("#bt_03").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#bt_03").hide();
			$("#left_01").hide();
			$("#current-sido-select").val(25);
			$("#bt_04").show();			
		}else{
			$("#look-abode-box .HouseMap").css("margin-top","-135px");
			$("#bt_04").css("top","464px");
			$("#bt_03").hide();
			$("#left_01").hide();
			$("#current-sido-select").val(25);
			$("#bt_04").show();	
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">7개 카테고리의 지표를 선택하여 통계현황</strong>을 볼  수 있습니다.<br>"
				+ "여기에서는 대전광역시의 학원 수 현황을 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘교육’</strong>을 선택해 주세요.</p></div>");
		posiInfo(3);
	});
	$("#bt_04").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#bt_04").hide();
			$(".index1").removeClass("M_on");
			$(".IndexSelect .index6").addClass("M_on");
			$("#look-select>li>ul>li>a").append({
				"data-parent-id" : "HML0006",
				"data-id" : "HML0020",
				"data-level" : "2"
			});
			$(".IndexSelect .index6>ul>li:eq(0)").addClass("M_on");
			$("#bt_05").show();			
		}else{
			$("#bt_04").hide();
			$(".index1").removeClass("M_on");
			$(".IndexSelect .index6").addClass("M_on");
			$("#look-select>li>ul>li>a").append({
				"data-parent-id" : "HML0006",
				"data-id" : "HML0020",
				"data-level" : "2"
			});
			$(".IndexSelect .index6>ul>li:eq(0)").addClass("M_on");
			$("#bt_05").css("top","498px");
			$("#bt_05").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘학원수’</strong>를 선택해 주세요.</p></div>");
		posiInfo(4);
	});
	$("#bt_05").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#bt_05").hide();
			$("#bt_06").show();
			$(".IndexSelect .index6>ul>li").removeClass("M_on");
			$(".IndexSelect .index6>ul>li:eq(2)").addClass("M_on");
		}else{
			$("#look-abode-box .HouseMap").css("margin-top","-235px");
			$("#bt_06").css("top","501px");
			$("#bt_05").hide();
			$("#bt_06").show();
			$(".IndexSelect .index6>ul>li").removeClass("M_on");
			$(".IndexSelect .index6>ul>li:eq(2)").addClass("M_on");
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘보기’</strong>버튼을 클릭해 주세요.</p></div>");
		posiInfo(5);
	});
	$("#bt_06").click(function() {
		$("#bt_06").hide();
		$(".sq01_02").removeClass("on");
		$("#map_01").show();
		$("#map_10").show();
		$("#map_12").show();
		$("#bt_07").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">대전광역시 학원 수 검색결과가 지도에 표시</strong>됩니다.<br>"
				+ "각 지역에 마우스를 올리면 해당 지역의 <strong style=\"color:#0040ff;  font-weight:bold;\">통계치가 툴팁으로 나타납니다.</strong><br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">대전광역시 서구를 클릭해 주세요.</strong></p></div>");
		posiInfo(6);
	});
	$("#bt_07").mouseover(function(){
		$("#map_13").show();
	});
	$("#bt_07").mouseout(function(){
		$("#map_13").hide();
	});
	$("#map_14").mouseover(function(){
		$("#map_15").show();
	});
	$("#map_14").mouseout(function(){
		$("#map_15").hide();
	});
	$("#bt_07").click(function() {
		$("#map_01").hide();
		$("#bt_07").hide();
		$("#map_12").hide();
		$("#map_14").show();
		$("#toPoint_2_2").css({
			"top" : 450,
			"left" : 800
		});
		$("#toPoint_2_2").show();
		$("#map_12_1").show();
		$("#map_02").show();
		$("#bt_08").show();
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">대전광역시 서구의 동 단위로 학원 수를 확인</strong>할 수 있습니다.<br>"
				+ "화면 우측 상단에서는 통계수치 외에도 이사를 갈 때 고려할 주요 시설 위치정보를 볼 수 있는 버튼이 있습니다.<br>"
				+ "이 중 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘학구도’</strong>를 살펴보겠습니다.</p></div>");
		posiInfo(7);
	});
	$("#bt_08").click(function() {
		$("#bt_08").hide();
		$("#map_02").hide();
		$("#map_10").hide();
		$("#map_15").hide();
		$("#map_14").hide();
		$("#toPoint_2_2").hide();
		$("#map_11").show();
		$("#map_02").show();
		$("#bt_09").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘초등학교’</strong>를 클릭해 주세요.</p></div>");
		posiInfo(8);
	});
	$("#bt_09").click(function() {
		$("#bt_09").hide();
		$("#map_11").hide();
		$("#toPoint_2_2").hide();
		$("#map_14").hide();
		$("#map_40").hide();
		$("#map_02").hide();
		$("#map_22").hide();
		$("#map_10").show();
		$("#map_03").show();
		$("#bt_10").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>현재화면 지도상 존재하는 <strong style=\"color:#0040ff;  font-weight:bold;\">초등학교의 위치가 표시</strong>됩니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">초등학교 마커</strong>를 클릭해 주세요.</p></div>");
		posiInfo(9);
	});
	$("#bt_10").click(function() {
		$("#bt_10").hide();
		$("#map_02").hide();
		$("#map_03").hide();
		$("#map_04").show();
		$("#bt_11").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>학교명을 확인 할 수 있습니다.<br>"
				+ "주거현황을 조회해 보았고 다음으로 <strong style=\"color:#0040ff;  font-weight:bold;\">추천지역 찾기</strong>를 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘추천지역찾기’</strong> 버튼을 클릭해 주세요.</p></div>");
		posiInfo(10);
	});
	$("#bt_11").click(function() {
		$("#quick-box-sub-title").text($("#search-recommend").data("title"));
		$(".stepClose").data("id",$("#search-recommend").attr("id"));
		$(".menu-box").hide();
		$("#search-recommend-box").show();
		$(".sideQuick").removeClass("on");
		$(".quickBox").css('width','478px')
		$(".scrollBox").css('width','478px');
		$(".scrollBox .mCSB_container").css('width','478px');
		$(".IndexSelect ul").css('left','140px');
		$(".IndexSelect ul").css('width','310px');
		$(".quickBox").stop().animate({"left":"0"},200);
		$("#search-recommend").addClass("on");
		$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
						
		if(btChk == 0 ){
			$("#map_12_1").hide();
			$("#bt_11").hide();
			$("#bt_12").hide();
			$("#map_04").hide();
			$("#map_10").hide();
			$("#bt_12").show();
			btChk += 1;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘관심지역’</strong>에서 이사 가고자 하는 지역을 선택할 수 있습니다.</p>" 
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘기준지역’</strong>은 관심지역과 비교하여 통계를 살펴볼 지역으로, "
					+ "현재 살고 있는 지역으로 설정하거나 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'전국'</strong>으로 설정하시면 됩니다.<br>"
					+ "여기서는 기준지역을 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'전국'</strong> 으로 두고 관심지역을 "
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'대전'</strong>으로 설정해 보겠습니다.</p></div>");
						
			posiInfo(11);
		}else if(btChk == 1){
			$("#bt_11").hide();
			$("#map_08").hide();
			$("#map_12_4").hide();
			$("#map_10").hide();
			$("#bt_26").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘‘라이프스타일별 지표 설정’</strong>을 선택해 주세요.</p></div>");
			posiInfo(26);
		}
	});
	
	
///////////////////////////////////// 추천지역찾기 루트 1 시작
	
	$("#bt_12").click(function() {
		$("#search-recommend-box .HouseMap").css("margin-top","0px");
		$("#bt_12").hide();
		$("#left_02").show();
		$("#bt_13").show();	
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘대전광역시’</strong>를 선택해 주세요.</p></div>");
		posiInfo(12);
	});
	$("#bt_13").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#inter-recommend-sido-select").val(25);
			$("#left_02").hide();
			$("#bt_13").hide();
			$("#bt_14").show();
		}else{
			$("#search-recommend-box .HouseMap").css("margin-top","-135px");
			$("#inter-recommend-sido-select").val(25);
			$("#bt_14").css("top","446px");
			$("#left_02").hide();
			$("#bt_13").hide();
			$("#bt_14").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'살고싶은 우리동네'</strong>에서는 7개 카테고리 32개 지표를 사용하여 이사갈 지역의 조건을 정할 수 있습니다.<br>"
				+ "지표는 최대 9개 까지 선택할 수 있으며, 여기에서는 이 중 두 가지 지표를 선택하여 추천지역을 찾아보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘생활 편의 교통’</strong>을 선택해 주세요.</p></div>");
		posiInfo(13);
	});
	$("#bt_14").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#bt_14").hide();
			$(".index6").removeClass("M_on");
			$(".index5").addClass("M_on");
			$("#bt_15").show();					
		}else{
			$("#bt_14").hide();
			$(".index6").removeClass("M_on");
			$(".index5").addClass("M_on");
			$("#bt_15").css("top","292px");
			$("#bt_15").show();		
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘편의시설 수’</strong>를 선택해 주세요.</p></div>");
		posiInfo(14);
	});
	$("#bt_15").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#bt_15").hide();
			$("#bt_16").show();
			$(".SetStep .index5>ul>li:eq(0)").addClass("M_on");
			$("#recommend-search-list").append(
					$("<li/>",{
						"data-parent-id":$(".SetStep .index5>ul>li:eq(0)>a").data("parent-id"),
						"data-id":$(".SetStep .index5>ul>li:eq(0)>a").data("id"),
						"data-order":"2", 
						"data-search-st":"3", 
						"data-asis-order":"2",
						"data-disp-level":$(".SetStep .index5>ul>li:eq(0)>a").attr("data-level"), 
						"class":$(".SetStep .index5>ul>li:eq(0)>a").data("parent-id")
					}).append(
							$("<span/>",{"class":"bagic","text":"많음"}),
							$("<span/>",{"class":"step","text":"중"}),
							$(".SetStep .index5>ul>li:eq(0)>a").text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
							$("<a/>",{href:"#","class":"indexdelete","html":'<img src="/img/house/set_delete.png" alt="설정된 지표 항목 삭제">'})
					)
			);
		}else{
			$("#search-recommend-box .HouseMap").css("margin-top","-245px");
			$("#bt_15").hide();
			$("#bt_16").css("top","433px");
			$("#bt_16").show();
			$(".SetStep .index5>ul>li:eq(0)").addClass("M_on");
			$("#recommend-search-list").append(
					$("<li/>",{
						"data-parent-id":$(".SetStep .index5>ul>li:eq(0)>a").data("parent-id"),
						"data-id":$(".SetStep .index5>ul>li:eq(0)>a").data("id"),
						"data-order":"2", 
						"data-search-st":"3", 
						"data-asis-order":"2",
						"data-disp-level":$(".SetStep .index5>ul>li:eq(0)>a").attr("data-level"), 
						"class":$(".SetStep .index5>ul>li:eq(0)>a").data("parent-id")
					}).append(
							$("<span/>",{"class":"bagic","text":"많음"}),
							$("<span/>",{"class":"step","text":"중"}),
							$(".SetStep .index5>ul>li:eq(0)>a").text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
							$("<a/>",{href:"#","class":"indexdelete","html":'<img src="/img/house/set_delete.png" alt="설정된 지표 항목 삭제">'})
					)
			);
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘복지문화’</strong>를 선택해 주세요.</p></div>");
		posiInfo(15);
	});
	$("#bt_16").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$(".index5").removeClass("M_on");
			$(".index7").addClass("M_on");
			$("#bt_16").hide();
			$("#bt_17").show();
		}else{
			$(".index5").removeClass("M_on");
			$(".index7").addClass("M_on");
			$("#bt_16").hide();
			$("#bt_17").css("top","227px");
			$("#bt_17").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘병의원 및 약국’</strong>을 선택해 주세요.</p></div>");
		posiInfo(16);
	});
	$("#bt_17").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#bt_17").hide();
			$("#bt_18").show();
			$(".SetStep .index7>ul>li:eq(1)").addClass("M_on");
			$("#recommend-search-list").append(
					$("<li/>",{
						"data-parent-id":$(".SetStep .index7>ul>li:eq(1)>a").data("parent-id"),
						"data-id":$(".SetStep .index7>ul>li:eq(1)>a").data("id"),
						"data-order":"2", 
						"data-search-st":"3", 
						"data-asis-order":"2",
						"data-disp-level":$(".SetStep .index7>ul>li:eq(1)>a").attr("data-level"), 
						"class":$(".SetStep .index7>ul>li:eq(1)>a").data("parent-id")
					}).append(
							$("<span/>",{"class":"bagic","text":"많음"}),
							$("<span/>",{"class":"step","text":"중"}),
							$(".SetStep .index7>ul>li:eq(1)>a").text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
							$("<a/>",{href:"#","class":"indexdelete","html":'<img src="/img/house/set_delete.png" alt="설정된 지표 항목 삭제">'})
					)
			);
		}else{
			$("#search-recommend-box .HouseMap").css("margin-top","-300px");
			$("#bt_17").hide();
			$("#bt_18").css("top","538px");
			$("#bt_18").show();
			$(".SetStep .index7>ul>li:eq(1)").addClass("M_on");
			$("#recommend-search-list").append(
					$("<li/>",{
						"data-parent-id":$(".SetStep .index7>ul>li:eq(1)>a").data("parent-id"),
						"data-id":$(".SetStep .index7>ul>li:eq(1)>a").data("id"),
						"data-order":"2", 
						"data-search-st":"3", 
						"data-asis-order":"2",
						"data-disp-level":$(".SetStep .index7>ul>li:eq(1)>a").attr("data-level"), 
						"class":$(".SetStep .index7>ul>li:eq(1)>a").data("parent-id")
					}).append(
							$("<span/>",{"class":"bagic","text":"많음"}),
							$("<span/>",{"class":"step","text":"중"}),
							$(".SetStep .index7>ul>li:eq(1)>a").text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
							$("<a/>",{href:"#","class":"indexdelete","html":'<img src="/img/house/set_delete.png" alt="설정된 지표 항목 삭제">'})
					)
			);
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">지표설정이 완료되었습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘추천지역찾기’</strong>버튼을 클릭해 주세요.</p></div>");
		posiInfo(17);
	});
	$("#bt_18").click(function() {
		$("#search-recommend-box .HouseMap").css("margin-top","0px");
		$("#bt_18").hide();
		$("#map_04").hide();
		$(".sq01_01").removeClass("on");
		$("#map_05").show();
		$("#map_12_1").show();
		$("#dataBoard_01").show();
		$("#bt_19").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>편의시설 수와 병의원 및 약국 수가 많은 순서대로 대전지역의 읍면동이 1순위에서 10순위까지 추천된 것을 볼 수 있습니다.<br>"
				+ "지도에는 그 중 1순위인 둔산2동이 먼저 보입니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">해당지역을 클릭해 주세요.</strong></p></div>");
		posiInfo(18);
	});
	$("#map_16").mouseover(function(){
		$("#map_17").show();
	});
	$("#map_16").mouseout(function(){
		$("#map_17").hide();
	});
	$("#bt_19").click(function() {
		$("#bt_19").hide();
		$("#map_12_1").hide();
		$("#map_05").hide();
		$("#dataBoard_01").show();
		$("#map_16").show();
		$("#toPoint_2_2").show();
		$("#toPoint_2_2").css({
			"top" : 395,
			"left" : 400
		});
		$("#map_12_2").show();
		$("#map_06").show();
		$("#bt_20").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>추천된 지역의 상세정보를 보실 수 있습니다.<br>"
				+ "데이터보드에서는 <strong style=\"color:#0040ff;  font-weight:bold;\">해당 지역의 주변 통계를 조회</strong>할 수 있습니다.<br>"
				+ "다른 정보를 잘 볼 수 있도록 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘추천지역 리스트’</strong>를 닫아주세요.</p></div>");
		posiInfo(19);
	});
	$("#bt_20").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#dataBoard_01").hide();
			$("#map_17").hide();
			$("#map_16").hide();
			$("#toPoint_2_2").hide();
			$("#bt_20").hide();
			$("#dataBoard_02").show();
		}else{
			$("#dataBoard_01").hide();
			$("#bt_20").hide();
			$("#map_17").hide();
			$("#map_16").hide();
			$("#toPoint_2_2").hide();
			$("#dataBoard_02_1").show();
			$("#bt_21").css("top","571px");
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>상단의 방사형 그래프에서는 관심지역의 7개 각 카테고리별 점수를 기준지역(전국)과 비교하여 지역의 특성을 파악할 수 있습니다.<br>" 
				+ "둔산2동은 전국에 비해 복지문화, 생활편의교통 지표는 좋지만 주택 점수는 낮은 것을 볼 수 있습니다." 
				+ "교통시설 또는 편의시설은 많지만 주택가격 등 주택관련지표는 전국 평균보다 낮기 때문입니다.<br>"
				+ "</p></div>" 
				+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:-13px;\">"
				+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
				+ "</div>");
		posiInfo(-1);
	});
	$("body").on("click",".button",function(){
		$("#bt_21").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>각 세부지표별 현황은 하단의 바그래프에서 보다 자세하게 비교하여 볼 수 있습니다.<br>"
				+ "예를 들어 편의시설 수의 경우 둔산2동이 대전 전지역에서 가장 많음을 알 수 있습니다.<br> "
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'복지문화'</strong>를 보겠습니다.</p></div>");
		posiInfo(20);
	});
	$("#bt_21").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#dataBoard_02").hide();
			$("#bt_21").hide();
			$("#dataBoard_03").show();
			$("#bt_22").show();			
		}else{
			$("#dataBoard_02_1").hide();
			$("#bt_21").hide();
			$("#dataBoard_03_1").show();
			$("#bt_22").css("top","607px");
			$("#bt_22").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘유치원 및 보육시설’</strong>을 클릭해 보겠습니다.</p></div>");
		posiInfo(21);
	});
	$("#bt_22").click(function(){
		$("#bt_22").hide();
		$("#dataBoard_03").hide();
		$("#dataBoard_03_1").hide();
		$("#map_12_2").hide();
		$("#map_06").hide();
		$("#map_16").hide();
		$("#toPoint_2_2").hide();
		$("#dataBoard_04").show();
		$("#map_12_3").show();
		$("#map_07").show();
		$("#bt_23").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>이 지표는 보육시설 기관 대비 5세 이하 인구로, 일반적으로 수치가 낮을수록 좋은 지표라 볼 수 있습니다.<br>"
				+ "둔산2동은 32명으로 전국 평균보다 낮아, 보육시설이 충분함을 알 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">이제 ‘지역 종합현황 보기’를 접어주세요.</strong></p></div>");
		posiInfo(22);
	});
	$("#bt_23").click(function() {
		$("#bt_23").hide();
		$("#dataBoard_04").hide();
		$("#dataBoard_05").show();
		$("#bt_24").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'소지역정보'</strong>에서는 추천지역에 살고 있는 인구 구성을 알 수 있습니다.<br>"
				+ "둔산2동은 다른 지역보다 40대와 10대가 많아, 주로 자녀와 함께 사는 40대 학부모가 사는 동네라 추측할 수 있습니다.<br>"
				+ "구체적인 연령대를 선택하면 좌측 지도에서 해당 연령 인구의 분포를 지도로 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘연령대별 인구’</strong>에서 10대를 선택해 주세요.</p></div>");
		posiInfo(23);
	});
	$("#bt_24").click(function() {
		$("#map_07").hide();
		$("#bt_24").hide();
		$("#dataBoard_05").hide();
		$("#map_12_3").hide();
		$("#map_12_4").show();
		$("#dataBoard_06").show();
		$("#map_08").show();
		$("#bt_25").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>주변의 10대 인구가 조회됩니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드를 닫아주세요.</strong></p></div>");
		posiInfo(24);
	});
	$("#bt_25").click(function() {
		$("#bt_25").hide();
		$("#dataBoard_06").hide();
		$("#map_10").show();
		$("#bt_11").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>이사 조건으로 직접 지표를 선택하는 게 번거로우시다면 라이프스타일에 따라 간단하게 추천지표를 선택할 수도 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘추천지역찾기’</strong>를 선택해 주세요.</p></div>");
		posiInfo(25);
	});
	
///////////////////////////////////// 추천지역찾기 루트 1 끝
	
	
///////////////////////////////////// 추천지역찾기 루트 2 시작
	$("#bt_26").click(function() {
		$("#bt_26").hide();
		$("#LifeStyleBtn").removeClass("open");
		$("#LifeStyleSelect").addClass("open");
		$("#bt_27").show();				
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>7가지의 라이프 스타일을 선택할 수 있습니다.<br>"
				+ "이 중 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘아이를  키우는 맞벌이 부부’</strong>를 선택해 보세요.</p></div>");
		posiInfo(27);
	});
	$("#bt_27").click(function() {
		$("#bt_27").hide();
		$("#LifeStyleSelect").removeClass("M_on");
		$("#LifeStyleSelect>li:eq(3)").addClass("M_on");
		
		$houseAnalysisMap.search.isLimitMax = false;
		var aTag = $("#LifeStyleSelect>li:eq(3)>a");
		$("#recommend-search-list-delete").trigger("click",function(){
			$("#LifeStyleSelect>li").removeClass("M_on");
			aTag.parent().addClass("M_on");
			var items = aTag.data("items");
			var allLi = "#search-recommend-box .HouseMap .IndexSelect li[class^=index]";
			$.each(items,function(cnt,node){
				if(cnt==0){
					$(allLi+">a[data-id="+node.b_class_idx_id+"]").trigger("click");
				}
				$(allLi+">ul>li>a[data-id="+node.m_class_idx_id+"]").trigger("click",false);
				$(allLi+">ul>li>a[data-id="+node.m_class_idx_id+"]").parent().find(".SetStepBar1>span").trigger("click",parseInt(node.wghtval)*200);
				$(allLi+">ul>li>span:"+(node.order_base_disp=='2'&&node.default_value=='0'?'first':'last')).trigger("click");
			});
			return false;
		});
		$("#bt_28").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">공동주택비율 등 7가지 대표지표가 추천되었습니다.</strong><br>"
				+ "이 지표를 참고하여 다른 지표를 추가하거나 수정할 수 있습니다<br>"
				+ "지표를 직접 선택하기 어려울 경우를 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'간편동네찾기'</strong> 기능도 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘간편동네찾기’</strong>를 클릭해 주세요.</p></div>");
		posiInfo(28);
	});

	
///////////////////////////////////// 추천지역찾기 루트 2 끝	
	
	$("#bt_28")	.click(function() {
		$(".sq01_01").removeClass("on");
		$("#bt_28").hide();				
		$("#popup_01").show();
		$("#bt_29").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>관심사를 선택합니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘20대’</strong>를 선택해 주세요.</p></div>");
		posiInfo(29);
	});
	$("#bt_29").click(function() {
		$("#bt_29").hide();
		$("#popup_01").hide();
		$("#popup_02").show();
		$("#bt_30").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘열공 동네’</strong>를 선택해 주세요.</p></div>");
		posiInfo(30);
	});
	$("#bt_30").click(function() {
		if($(window).height()<=768){
			$("#bt_30").hide();
			$("#popup_02").hide();
			$("#popup_03").css("top","-70px");
			$("#popup_03").show();
			$("#bt_31").css({"top":"380px","left":"430px"});
			$("#bt_31").show();			
		}else if(900>=$(window).height() && $(window).height()>=769){
			$("#bt_30").hide();
			$("#popup_02").hide();
			$("#popup_03").css("top","40px");
			$("#popup_03").show();
			$("#bt_31").css({"top":"490px","left":"430px"});
			$("#bt_31").show();			
		}else if($(window).height()>=901){
			$("#bt_30").hide();
			$("#popup_02").hide();
			$("#popup_03").show();
			$("#bt_31").css({"top":"623px","left":"430px"});
			$("#bt_31").show();			
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘관심거주지’</strong>를 선택해 주세요.</p></div>");
		posiInfo(31);
	});
	$("#bt_31").click(function() {
		if($(window).height()<=768){		
			$("#bt_31").hide();
			$("#left_03").css({"top":"380px","left":"430px"});
			$("#left_03").show();
			$("#bt_32").css({"top":"527px","left":"430px"});
			$("#bt_32").show();
		}else if(900>=$(window).height() && $(window).height()>=769){	
			$("#bt_31").hide();
			$("#left_03").css({"top":"490px","left":"430px"});
			$("#left_03").show();
			$("#bt_32").css({"top":"637px","left":"430px"});
			$("#bt_32").show();
		}else if($(window).height()>=901){
			$("#bt_31").hide();
			$("#left_03").css({"top":"623px","left":"430px"});
			$("#left_03").show();
			$("#bt_32").css({"top":"770px","left":"430px"});
			$("#bt_32").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘대전광역시’</strong>를 선택해 주세요.</p></div>");
		posiInfo(32);
	});
	$("#bt_32").click(function() {
		if($(window).height()<=768){
			$("#bt_32").hide();
			$("#left_03").hide();
			$("#popup_03").hide();
			$("#popup_04").css("top","-70px");
			$("#popup_04").show();
			$("#bt_33").css({"top":"461px","left":"427px"});
			$("#bt_33").show();
		}else if(900>=$(window).height() && $(window).height()>=769){
			$("#bt_32").hide();
			$("#left_03").hide();
			$("#popup_03").hide();
			$("#popup_04").css("top","40px");
			$("#popup_04").show();
			$("#bt_33").css({"top":"571px","left":"427px"});
			$("#bt_33").show();
		}else if($(window).height()>=901){
			$("#bt_32").hide();
			$("#left_03").hide();
			$("#popup_03").hide();
			$("#popup_04").show();
			$("#bt_33").css({"top":"703px","left":"427px"});
			$("#bt_33").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘아파트’</strong>를 선택해 주세요.</p></div>");
		posiInfo(33);
	});
	$("#bt_33").click(function() {
		if($(window).height()<=768){
			$("#bt_33").hide();
			$("#popup_04").hide();
			$("#popup_05").css("top","-70px");
			$("#popup_05").show();
			$("#bt_34").css({"top":"584px","left":"680px"});
			$("#bt_34").show();
		}else if(900>=$(window).height() && $(window).height()>=769){
			$("#bt_33").hide();
			$("#popup_04").hide();
			$("#popup_05").css("top","40px");
			$("#popup_05").show();
			$("#bt_34").css({"top":"694px","left":"680px"});
			$("#bt_34").show();
		}else if($(window).height()>=901){
			$("#bt_33").hide();
			$("#popup_04").hide();
			$("#popup_05").show();
			$("#bt_34").css({"top":"827px","left":"680px"});
			$("#bt_34").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘다음’</strong>버튼을 선택해 주세요.</p></div>");
		posiInfo(34);
	});
	$("#bt_34").click(function() {
		if($(window).height()<=768){
			$("#popup_06").css("top","75px");
			$("#bt_35").css({"top":"336px","left":"267px"});
			$("#popup_07").css("top","75px");
			$("#bt_36").css({"top":"399px","left":"597px"});
			$("#popup_08").css("top","-80px");
			$("#bt_37").css({"top":"575px","left":"722px"});
			$("#popup_09").css({"top":"526px","left":"272px"});
			$("#popup_10").css({"top":"526px","left":"591px"});
		}else if(900>=$(window).height() && $(window).height()>=769){
			$("#popup_06").css("top","75px");
			$("#bt_35").css({"top":"336px","left":"267px"});
			$("#popup_07").css("top","75px");
			$("#bt_36").css({"top":"399px","left":"597px"});
			$("#popup_08").css("top","75px");
			$("#bt_37").css({"top":"730px","left":"722px"});
			$("#popup_09").css({"top":"526px","left":"272px"});
			$("#popup_10").css({"top":"526px","left":"591px"});
		}else if($(window).height()>=901){
			$("#bt_35").css({"top":"433px","left":"267px"});
			$("#bt_36").css({"top":"496px","left":"597px"});
			$("#bt_37").css({"top":"827px","left":"722px"});
			$("#popup_09").css({"top":"623px","left":"273px"});
			$("#popup_10").css({"top":"623px","left":"590px"});
		}
		
		$("#bt_34").hide();
		$("#popup_05").hide();
		$("#popup_06").show();
		$("#popup_09").show();
		$("#bt_35").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>설정한 관심사에 따라 추천지표를 다음과 같이 보여줍니다.<br>"
				+ "이 중 가장 마음에 드는 지표를 선택하여 최대 6개까지 우선순위를 줄 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘학원 수가 많은 지역’</strong>을 끌어서 아래로 가져다 놓아주세요.<br>"
				+ "<strong style=\"color:#ff0000;  font-weight:bold;\">(드래그앤드랍을 이용하세요!)</p></div>");
		posiInfo(35);
		$("#bt_35").draggable({
			helper : "clone"	
		});
		$("#popup_09").droppable({
			accept: "#bt_35",
			drop : function(e) {
			$("#bt_35").hide();
			$("#popup_06").hide();
			$("#popup_09").hide();
			$("#toPoint_2_2").hide();
			$("#popup_07").show();
			$("#popup_10").show();
			$("#bt_36").show();
			$("#bt_36").draggable({
				helper : "clone"		
			});
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘2인이상 가구 비율이 높은지역’</strong>을 끌어서 아래로 가져다 놓아주세요.<br>"
					+ "<strong style=\"color:#ff0000;  font-weight:bold;\">(드래그앤드랍을 이용하세요!)</p></div>");
			posiInfo(36);
			$("#popup_10").droppable({
				accept: "#bt_36",
				drop : function(e) {
					$("#bt_36").hide();
					$("#popup_07").hide();
					$("#popup_10").hide();
					$("#popup_08").show();
					$("#bt_37").show();
					$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
					$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘간편 동네 찾기’</strong>버튼을 클릭해 주세요.</p></div>");
					posiInfo(37);
					}
				});
			}
		});
	});
	
	$("#bt_37").click(function() {
		$("#bt_37").hide();
		$("#bt_38").show();
		$("#popup_08").hide();
		$("#map_09").show();
		$("#map_12_4").show();
		$("#dataBoard_07").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">선택한 지표에 가장 잘 맞는 10개 지역이 추천된 것을 보실 수있습니다.</strong><br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드 창을 닫아주세요.</strong></p></div>");
		posiInfo(38);
	});
	$("#bt_38").click(function() {
		$("#bt_38").hide();
		$("#dataBoard_07").hide();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p><span style=\"margin-left:5px;\">살고싶은 우리동네 튜토리얼을 마치신것을 축하합니다.!</span></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '살고싶은 우리동네'로 이동합니다.)</strong></p></div>");
		posiInfo(-1);
		setTimeout(function(){
			location.href = "/view/house/houseAnalysisMap"
		}, 10000)
	});

	posiInfo(0);
}

function closeTutorial() {
	$("#tuto_start_btn").show();
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
	//	setCookie("confirmMsg", "done", 365);
		location.href = "/view/house/houseAnalysisMap";
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
