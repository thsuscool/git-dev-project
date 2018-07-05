// 튜토리얼
function readyTutorial() {
	var confirmMsg = confirm("정체통계지도 처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n"
			+ "진행하시겠습니까?");
	if (confirmMsg == 1) {
//		setCookie("confirmMsg", "done", 365);
		var iWidth = $(window).width();
		var iHeight = $(window).height();
		if (iWidth > 1920 || iHeight > 1080) {
			var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
					+ "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n" + "그래도 실행 하시겠습니까?");
			if (warnMsg == 1) {
				$(".tutorialWrapper").show();
				location.href = "/view/map/policyStaticMap?tutorial_mode";
			} else {
				alert("정체통계지도 화면으로 돌아가겠습니다.");
				return false;
			}
		} else {
			location.href = "/view/map/policyStaticMap?tutorial_mode";
		}
	} else {
//		setCookie("confirmMsg", "done", 365);
		return false;
	}
}

function startTutorial() {
	if($(window).height()>=1080||$(window).width()>=1920){
		$("#toPoint_db1_1").css({"top":"165px"});
		$("#toPoint_db1_2").css({"top":"-30px"});
		$("#toPoint_db2_1").css({"top":"-30px"});
	}else{
		$("#toPoint_db1").css({"top":"150px"});
		$("#toPoint_db2").css({"top":"-40px"});
		$("#toPoint_db3").css({"top":"-40px"});
	}
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
						alert("정책통계지도 화면으로 돌아가겠습니다.");
						location.href = "/view/map/policyStaticMap";
					}
				}
			});
	// 2017.04.05 튜토리얼apiLogWrite 추가
/*	apiLogWrite2("A0", "A28", "대화형통계지도 튜토리얼", "(NULL)", "(NULL)", "(NULL)");*/
	$("#tuto_start_btn").hide();
	var btChk = 0;
	var dbChk = 0;
	var popChk = 0;
	var leftChk = 0;
	
	$("#tutorialText").append("<div class=\"title\">"
			+ "<p><span style=\"margin-left:5px;\">정책통계지도 첫 사용을 환영합니다!</span></p>"
			+ "</div>"
			+ "<div class=\"content\">"
			+ "<p>정책통계지도는 <strong style=\"color:#0040ff; font-weight:bold;\">인구, 가구, 주택, 사업체 등 주요 통계지표에 대해서 과거와 현재의 통계<br>"
			+ "변화를 보여주고 이를 통해 지역사회의 정책 결정에 도움을 주기 위한 서비스</strong>입니다.<br>"
			+ "손가락이 가리키는 곳을 따라가 보면서 설명을 시작하도록 하겠습니다.</p></div>"
			+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:-8px;\">"
			+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
			+ "</div>");
	$("body").on("click",".button",function(){
		$("#bt_21").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>정책통계지도의 통계조회를 위해 먼저 대상지역을 선택하고, 정책분야와 세부지표를 선택하면<br>"
				+ "통계를 조회할 수 있습니다.<br>"
				+ "기본적인 사용법 설명을 위해 대전광역시의 ‘전체인구의 변화’ 지표를 검색해 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">대상지역을 대전광역시 전체로 설정해 보겠습니다.</strong></p></div>");
	});
	
	$(".tutorialWrapper").show();
	$(".quickBox.step01").stop().animate({"left":"0"},200);
	$policyStaticMapLeftmenu.ui.getCategoryCnt(11); 
	$("#headerTutorial").show();
	$("#btn_01").show();

	var posi = "";
	var width = 0;
	var height = 0;
	var tutoImg = [$("#btn_01"), $("#btn_03"), $("#btn_04"), $("#btn_05"), $("#btn_06"), 
	               $("#btn_07"), $("#btn_08"), $("#btn_11"), $("#btn_13"), $("#btn_08"),
	               $("#btn_14"), $("#btn_15"), $("#btn_17"), $("#btn_04"), $("#btn_05"),
	               $("#btn_18"), $("#btn_20"), $("#btn_14"), $("#btn_21"), $("#btn_23"),
	               $("#btn_24"), $("#btn_25"), $("#btn_06"), $("#btn_07"), $("#btn_08"),
	               $("#btn_14"), $("#btn_24"), $("#btn_26"), $("#btn_08")];
	var pointImg = [1, 4, 4, 4, 2,
	                2, 4, 4, 4, 4,
	                4, 4, 4, 4, 4,
	                4, 4, 4, 4, 4,
	                4, 4, 2, 2, 4,
	                4, 4, 4, 4];
	
	function posiInfo(i) {
		$policyStaticMap.ui.tutoIndex = i;

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
			posiInfo($policyStaticMap.ui.tutoIndex);
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
	$("#btn_01").click(function() {
		$("#btn_01").hide();
		$("#btn_02").show();
		$("#btn_03").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a; font-weight:bold;\">‘대전광역시’</strong>를 선택해 주세요.</p></div>");
		posiInfo(1);
	});
	$("#btn_03").click(function() {
		$("#btn_03").hide();
		$("#btn_02").hide();
		$("#btn_04").show();
		$("#current-sido-select").val(25);
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>대상지역을 선택한 후에 정책분야를 선택해야 합니다.<br>"
				+ "정책분야는 화면에서와 같이 총 7가지의 항목이 있고, 항목 우측에 해당 정책분야에 포함된 통계<br>"
				+ "지표 개수를 같이 보여줍니다.<br>"
				+ "‘전체인구의 변화’ 지표를 조회하기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘인구∙가구∙주택’</strong> 항목을 선택해주세요.</p></div>");
		posiInfo(2);
	});
	$("#btn_04").click(function() {
		if(btChk == 0){
			$("#btn_04").hide();
			$(".icon01").addClass("on");
			$(".quickBox.step02").stop().animate({"left":"280px"},200);
			$policyStaticMapLeftmenu.ui.getDetailCategoryList("CTGR_001");
			$("#btn_05").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>통계지표의 타입은 <strong style=\"color:#0040ff;  font-weight:bold;\">수요변화 지표, 통계연산형 지표, 시설분석형 지표</strong> 등 3가지로 구분됩니다.<br>"
					+ "수요변화 지표는 <strong style=\"color:#0040ff;  font-weight:bold;\">하나의 통계를 기준으로 시계열로 조회하는 지표로 대부분의 통계지표가 수요<br>"
					+ "변화 지표</strong>에 해당합니다.<br>"
					+ "수요변화 지표 항목 중 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘전체인구의 변화’</strong> 지표를 선택해주세요.</p></div>");
			posiInfo(3);
		}else{
		  	$("#btn_04").hide();
			$(".icon01").addClass("on");
			$(".quickBox.step02").stop().animate({"left":"280px"},200);
			$("#cateDetailList01 .idxNmCls").removeClass("on");
			btChk = 2;
			$("#btn_05").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>수요변화 지표 타입의 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘전체인구의 변화’</strong> 통계지표를 선택해주세요.</p></div>");
			posiInfo(14);	
		}

	});
	$("#btn_05").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			if(btChk == 0){
				$("#btn_05").hide();
				$(".sideQuick").removeClass("on");
				$("#cateDetailList01 .idxNmCls").addClass("on");
				$(".icon01").removeClass("on");
				$(".policyStaticMapDataBoard").removeClass("disabled");
				$("#sTitle").text("지역별 수요변환형 > 대전광역시 전체 전체인구의 변화");
				$("#naviTitle").text("대전광역시");
				$("#naviTitle").show();
				$("#boundLevelTitle").val("1");
				$("#boundLevelTitle").html("<option value='1'>시군구경계</option><option value='2'>읍면동경계</option>");
				$("#boundLevelTitle").show();
				$policyStaticMapLeftmenu.event.closeAnimate(1);
				$("#map_01").show();
				$("#map_01_1").show();
				$("#map_02").show();
				$("#map_02_1").show();
				$("#map_03").show();
				$("#map_03_1").show();
				$("#map_06").show();
				$("#map_07").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>선택한 통계지표에 대해 2개의 통계색상지도가 분할맵 형태로 화면에 표출됩니다.<br>"
						+ "기본적으로 좌측에는 가장 오래된 년도가 선택되고, 우측에는 가장 최신 년도가 선택되어 통계를 표출하게"
						+ "됩니다. 색상지도 위에 마우스를 올리면 통계값을 볼 수 있습니다.<br>"
						+ "조회년도는 <strong style=\"color:#0040ff;  font-weight:bold;\">분할맵 각각의 콤보박스에서 변경할 수 있으며, 년도 선택 시 해당년도로<br>"
						+ "통계</strong>가 재 조회 됩니다.</p></div>"
						+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:-14px;\">"
						+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
						+ "</div>");
				posiInfo(-1);
				$("body").on("click",".button",function(){
					$("#btn_05").hide();
					$("#btn_06").show();
					$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
					$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p>범례는 좌측의 통계지도를 기준으로 양쪽에 동일하게 적용되어 있습니다.<br>"
							+ "통계지도를 자세히 보면 대전광역시의 5개 구 중 좌측의 유성구 지역이 인구가 많이 증가한 <br>"
							+ "것으로 보입니다.<br>"
							+ "‘데이터보드’에서는 <strong style=\"color:#0040ff;  font-weight:bold;\">통계지도의 요약된 정보</strong>를 알기 쉽게 볼 수 있습니다.<br>"
							+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘데이터보드’</strong>를 선택해주세요.</p></div>");
					posiInfo(4);
				});
				
			}else{
				$("#btn_05").hide();
				$(".sideQuick").removeClass("on");
				$(".icon01").removeClass("on");
				$(".policyStaticMapDataBoard").removeClass("disabled");
				$("#sTitle").text("지역별 수요변환형 > 대전광역시 서구 전체인구의 변화");
				$("#naviTitle").text("대전광역시");
				$("#naviTitle").show();
				$("#boundLevelTitle").val("1");
				$("#boundLevelTitle").html("<option value='1'>읍면동경계</option>");
				$("#boundLevelTitle").show();
				$policyStaticMapLeftmenu.event.closeAnimate(1);
				$("#map_08").show();
				$("#map_08_1").show();
				$("#map_02").show();
				$("#map_02_1").show();
				$("#map_09").show();
				$("#map_09_1").show();
				$("#map_06").show();
				$("#map_07").show();
				$("#btn_18").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>이전과 달리 시도 기준이 아닌 시군구 기준으로 통계지도가 표출됩니다.<br>"
						+ "여기서 현재의 대상지역이 시군구 단위이므로 경계레벨을 2레벨인 집계구경계까지 설정할 수<br>"
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">경계레벨 버튼을 선택해주세요.</strong> </p></div>");
				posiInfo(15);
			}
		}else{
			if(btChk == 0){
				$("#btn_05").hide();
				$(".sideQuick").removeClass("on");
				$(".policyStaticMapDataBoard").removeClass("disabled");
				$("#sTitle").text("지역별 수요변환형 > 대전광역시 전체 전체인구의 변화");
				$policyStaticMapLeftmenu.event.closeAnimate(1);
				$("#naviTitle").text("대전광역시");
				$("#naviTitle").show();
				$("#boundLevelTitle").val("1");
				$("#boundLevelTitle").html("<option value='1'>시군구경계</option><option value='2'>읍면동경계</option>");
				$("#boundLevelTitle").show();
				$("#map_01").css({"top":"172px","left":"-275px"});
				$("#map_01").show();
				$("#map_01_1").css({"top":"172px","left":"683px"});
				$("#map_01_1").show();
				$("#map_02").css({"top":"172px","left":"492px"});
				$("#map_02").show();
				$("#map_02_1").show();
				$("#map_03").show();
				$("#map_03_1").css({"bottom":"5px","left":"697px"});
				$("#map_03_1").show();
				$("#map_06").css({"top":"328px","left":"623px"});
				$("#map_06").show();
				$("#map_07").css({"top":"262px","left":"663px"});
				$("#map_07").show();				
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>선택한 통계지표에 대해 2개의 통계색상지도가 분할맵 형태로 화면에 표출됩니다.<br>"
						+ "기본적으로 좌측에는 가장 오래된 년도가 선택되고, 우측에는 가장 최신 년도가 선택되어 통계를 표출하게"
						+ "됩니다. 색상지도 위에 마우스를 올리면 통계값을 볼 수 있습니다.<br>"
						+ "조회년도는 <strong style=\"color:#0040ff;  font-weight:bold;\">분할맵 각각의 콤보박스에서 변경할 수 있으며, 년도 선택 시 해당년도로<br>"
						+ "통계</strong>가 재 조회 됩니다.</p></div>"
						+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:-14px;\">"
						+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
						+ "</div>");
				posiInfo(-1);
				$("body").on("click",".button",function(){
					$("#btn_05").hide();
					$("#btn_06").show();
					$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
					$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p>범례는 좌측의 통계지도를 기준으로 양쪽에 동일하게 적용되어 있습니다.<br>"
							+ "통계지도를 자세히 보면 대전광역시의 5개 구 중 좌측의 유성구 지역이 인구가 많이 증가한 <br>"
							+ "것으로 보입니다.<br>"
							+ "‘데이터보드’에서는 <strong style=\"color:#0040ff;  font-weight:bold;\">통계지도의 요약된 정보</strong>를 알기 쉽게 볼 수 있습니다.<br>"
							+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘데이터보드’</strong>를 선택해주세요.</p></div>");
					posiInfo(4);
				});
			}else{
				$("#btn_05").hide();
				$(".sideQuick").removeClass("on");
				$(".icon01").removeClass("on");
				$(".policyStaticMapDataBoard").removeClass("disabled");
				$("#sTitle").text("지역별 수요변환형 > 대전광역시 서구 전체인구의 변화");
				$("#naviTitle").text("대전광역시");
				$("#naviTitle").show();
				$("#boundLevelTitle").val("1");
				$("#boundLevelTitle").html("<option value='1'>읍면동경계</option>");
				$("#boundLevelTitle").show();
				$policyStaticMapLeftmenu.event.closeAnimate(1);
				$("#map_08").css({"top":"172px","left":"-275px"});
				$("#map_08").show();
				$("#map_08_1").css({"top":"172px","left":"683px"});
				$("#map_08_1").show();
				$("#map_02").show();
				$("#map_02_1").show();
				$("#map_09").show();
				$("#map_09_1").css({"bottom":"5px","left":"697px"});
				$("#map_09_1").show();				
				$("#map_06").show();
				$("#map_07").show();
				$("#btn_18").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>이전과 달리 시도 기준이 아닌 시군구 기준으로 통계지도가 표출됩니다.<br>"
						+ "여기서 현재의 대상지역이 시군구 단위이므로 경계레벨을 2레벨인 집계구경계까지 설정할 수<br>"
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">경계레벨 버튼을 선택해주세요.</strong> </p></div>");
				posiInfo(15);
			}
			
		}
	});
	$("#btn_06").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			if(dbChk == 0){
				$("#btn_06").hide();
				$("#dataBoard_01").show();
				$("#btn_07").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>대전광역시 각 구의 2개 조회년도 ‘전체인구 자료’ 통계가 그래프로 표출된 것을 볼 수 있습니다.<br>" 
						+ "그래프 위에 마우스를 올리면 해당 지역의 통계값이 툴팁으로 나타납니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘데이터보드’</strong>를 닫아주세요.</p></div>");
				posiInfo(5);
			}else{
				$("#btn_06").hide();
				$("#dataBoard_02").show();
				dbChk = 2;
				$("#btn_07").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>데이터보드에서 서로 다른 통계정보가 지역별 그래프로 알기 쉽게 포출되는 것을 볼 수 <br>"
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드를 닫아주세요.</strong></p></div>");
				posiInfo(23);
			}
			
		}else{
			if(dbChk == 0){
				$("#btn_06").hide();
				$("#dataBoard_01").show();
				$("#btn_07").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>대전광역시 각 구의 2개 조회년도 ‘전체인구 자료’ 통계가 그래프로 표출된 것을 볼 수 있습니다.<br>" 
						+ "그래프 위에 마우스를 올리면 해당 지역의 통계값이 툴팁으로 나타납니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘데이터보드’</strong>를 닫아주세요.</p></div>");
				posiInfo(5);
			}else{
				$("#btn_06").hide();
				$("#dataBoard_02").show();
				dbChk = 2;
				$("#btn_07").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>데이터보드에서 서로 다른 통계정보가 지역별 그래프로 알기 쉽게 포출되는 것을 볼 수 <br>" 
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드를 닫아주세요.</strong></p></div>");
				posiInfo(23);
			}
		}
		
	});
	$("#btn_07").click(function() {	
		if($(window).height()>=1080||$(window).width()>=1920){
			if(dbChk == 0){
				$("#dataBoard_01").hide();
				$("#btn_07").hide();
				$("#btn_08").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>정책통계지도는 1차로 2개 지도의 개별데이터를 확인한 후에 2차로 융합된 결과 데이터를 볼 수 있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 보기'</strong> 버튼을 선택해주세요.</p></div>");
				posiInfo(6);
			}else{
				$("#dataBoard_02").hide();
				$("#btn_07").hide();
				btChk = 7;
				$("#btn_08").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>통계연산형 지표 타입의 경우 융합된 통계가 어떻게 표출되는지 확인해보겠습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 보기'</strong> 버튼을 선택해주세요.</p></div>");
				posiInfo(24);
			}
			
		}else{
			if(dbChk == 0){
				$("#dataBoard_01").hide();
				$("#btn_07").hide();
				$("#btn_08").css({"top":"325px","left":"620px"});
				$("#btn_08").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>정책통계지도는 1차로 2개 지도의 개별데이터를 확인한 후에 2차로 융합된 결과 데이터를 볼 수 있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 보기'</strong> 버튼을 선택해주세요.</p></div>");
				posiInfo(6);
			}else{
				$("#dataBoard_02").hide();
				$("#btn_07").hide();
				btChk = 7;
				$("#btn_08").css({"top":"325px","left":"620px"});
				$("#btn_08").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>통계연산형 지표 타입의 경우 융합된 통계가 어떻게 표출되는지 확인해보겠습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 보기'</strong> 버튼을 선택해주세요.</p></div>");
				posiInfo(24);
			}

		}
	});

	$("#btn_08").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			if(btChk == 0){
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_01").show();
				$("#popup_01_1").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>융합결과 화면에서는 현재의 지도화면에서와 같이 2개의 통계지도가 융합된 하나의 통계지도가<br>"
						+ "생성됩니다. 화면 우측에서는 <strong style=\"color:#0040ff;  font-weight:bold;\">정책스토리, 융합결과데이터, 지역별 순위, 연관 정책통계지도 </strong><br>"
						+ "링크 등의 정보를 제공합니다.<br>"
						+ "그리고, 수요변화 지표 타입의 경우는 <strong style=\"color:#0040ff;  font-weight:bold;\">‘정책내용’ 부분에 정책스토리의 자동문구</strong>를<br>"
						+ "생성해서 보여줍니다.</p></div>"
						+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:-14px;\">"
						+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
						+ "</div>");
				$("body").on("click",".button",function(){
					$("#btn_06").hide();
					db1_1();
					$("#toPoint_db1_1").show();		
					$("#btn_09").show();
					$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
					$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p>융합결과 화면은 통계지표의 타입에 따라 다르게 나타나는데 현재의 ‘전체인구의 변화’ 지표는 <br>"
							+ "수요변화 지표 타입으로 2개의 통계에 대한 증감 및 증감률 정보를 보여줍니다.<br>"
							+ "융합결과를 자세히 살펴보기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 데이터'</strong> 버튼을 선택해주세요.</p></div>");
					posiInfo(-1);
				});
			}else if (btChk == 1){
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_03").show();
				$("#popup_03_1").show();
				popChk = 1;
				$("#btn_10").show();
				$("#btn_10").css({"top":"-7px","left":"1416px"});
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>융합결과 화면이 이전의 ‘구’ 단위 화면이 아닌 ‘동’ 단위 화면으로 표출되는 것을 알 수 있습니다. <br>"
						+ "그리고, 우측의 정책스토리 정보들도 모두 ‘동’ 단위 정보로 표출되고 있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘융합결과 보기’</strong> 팝업창을 닫아주세요.</p></div>");
				posiInfo(-1);
			}else if(btChk == 7){
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_06").show();
				$("#popup_06_1").show();
				popChk = 4;
				$("#btn_10").show();
				$("#btn_10").css({"top":"-7px","left":"1417px"});
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>통계연산형  지표의 경우 융합결과 화면에서는 2개의 통계에 대한 연산결과값을 보여주는 하나의 통계지도가 생성됩니다.<br>"
						+ "현재의 지표에서는 지역별로 ‘전체인구’와 ‘도서관별 도서자료 수’가 융합된 ‘인구 1명당도서보유<br>"
						+ "권수’ 통계지도를 생성하여 보여줍니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">융합결과 팝업창을 닫아주세요.</strong></p></div>");
				posiInfo(-1);
			}else{
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_07").show();
				$("#popup_07_1").show();
				popChk = 5;
				$("#btn_10").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>시설분석형  지표의 경우 융합결과 화면에서는 색상지도와 POI정보를 하나의 통계지도에 같이<br>"
						+ "표출합니다.<br>"
						+ "현재의 지표에서는 지역별로 ‘전체인구’와 도서관 위치를 지역별로 구분하여 한눈에 확인할 수<br>"
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">융합결과 팝업창을 닫아주세요.</strong></p></div>");
				posiInfo(-1);
			}
			
			
		}else{
			if(btChk == 0){
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_01").show();
				$("#popup_01").css({"left":"800px","top":"-20px"});
				$("#popup_01_1").show();
				$("#popup_01_1").css({"bottom":"370px","left":"805px"});
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>융합결과 화면에서는 현재의 지도화면에서와 같이 2개의 통계지도가 융합된 하나의 통계지도가<br>"
						+ "생성됩니다. 화면 우측에서는 <strong style=\"color:#0040ff;  font-weight:bold;\">정책스토리, 융합결과데이터, 지역별 순위, 연관 정책통계지도 </strong><br>"
						+ "링크 등의 정보를 제공합니다.<br>"
						+ "그리고, 수요변화 지표 타입의 경우는 <strong style=\"color:#0040ff;  font-weight:bold;\">‘정책내용’ 부분에 정책스토리의 자동문구</strong>를<br>"
						+ "생성해서 보여줍니다.</p></div>"
						+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:-14px;\">"
						+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
						+ "</div>");
				$("body").on("click",".button",function(){
					$("#btn_06").hide();
					db1();
					$("#toPoint_db1").show();
					$("#btn_09").css({"top":"172px","left":"1574px"});
					$("#btn_09").show();
					$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
					$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p>융합결과 화면은 통계지표의 타입에 따라 다르게 나타나는데 현재의 ‘전체인구의 변화’ 지표는 <br>"
							+ "수요변화 지표 타입으로 2개의 통계에 대한 증감 및 증감률 정보를 보여줍니다.<br>"
							+ "융합결과를 자세히 살펴보기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 데이터'</strong> 버튼을 선택해주세요.</p></div>");
					posiInfo(-1);
				});
			}else if (btChk == 1){
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_03").show();
				$("#popup_03").css({"left":"800px","top":"-20px"});
				$("#popup_03_1").show();
				$("#popup_03_1").css({"bottom":"370px","left":"805px"});
				popChk = 1;
				$("#btn_10").show();
				db3();
				$("#toPoint_db3").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>융합결과 화면이 이전의 ‘구’ 단위 화면이 아닌 ‘동’ 단위 화면으로 표출되는 것을 알 수 있습니다. <br>"
						+ "그리고, 우측의 정책스토리 정보들도 모두 ‘동’ 단위 정보로 표출되고 있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘융합결과 보기’</strong> 팝업창을 닫아주세요.</p></div>");
				posiInfo(-1);
			}else if(btChk == 7){
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_06").show();
				$("#popup_06").css({"left":"800px","top":"-20px"});
				$("#popup_06_1").show();
				$("#popup_06_1").css({"bottom":"370px","left":"805px"});
				popChk = 4;
				$("#btn_10").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>통계연산형  지표의 경우 융합결과 화면에서는 2개의 통계에 대한 연산결과값을 보여주는 하나의 통계지도가 생성됩니다.<br>"
						+ "현재의 지표에서는 지역별로 ‘전체인구’와 ‘도서관별 도서자료 수’가 융합된 ‘인구 1명당도서보유<br>"
						+ "권수’ 통계지도를 생성하여 보여줍니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">융합결과 팝업창을 닫아주세요.</strong></p></div>");
				posiInfo(-1);
			}else{
				$("#btn_08").hide();
				$("#popupImgDiv").show();
				$("#popup_07").show();
				$("#popup_07").css({"left":"800px","top":"-20px"});
				$("#popup_07_1").show();
				$("#popup_07_1").css({"bottom":"370px","left":"805px"});
				popChk = 5;
				$("#btn_10").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>시설분석형  지표의 경우 융합결과 화면에서는 색상지도와 POI정보를 하나의 통계지도에 같이<br>"
						+ "표출합니다.<br>"
						+ "현재의 지표에서는 지역별로 ‘전체인구’와 도서관 위치를 지역별로 구분하여 한눈에 확인할 수<br>"
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">융합결과 팝업창을 닫아주세요.</strong></p></div>");
				posiInfo(-1);
			}

		}
		function db1() {
			$("#toPoint_db1").animate({
				right : 140,
				top : 150
			}, 500, "", function() {
				$(this).animate({
					right : 150,
					top : 150
				}, 500, "", function() {
					db1();
				});
			});
		}
		function db1_1(){
			$("#toPoint_db1_1").animate({
				right : 490,
				top : 165
			}, 500, "", function() {
				$(this).animate({
					right : 500,
					top : 165
				}, 500, "", function() {
					db1_1();
				});
			});
		}
		function db3() {
			$("#toPoint_db3").animate({
				right : 130,
				top : -40
			}, 500, "", function() {
				$(this).animate({
					right : 140,
					top : -40
				}, 500, "", function() {
					db3();
				});
			});
		}
	});
	$("#btn_09").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
				$("#btn_09").hide();
				$("#popup_01").hide();
				$("#toPoint_db1_1").hide();		
				$("#popup_01_1").show();
				$("#popup_02").show();
				$("#btn_10").show();
				db2_1();
				$("#toPoint_db2_1").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>‘융합결과 데이터’ 화면에서는 융합된 통계지도에 대한 지역별 증감 및 증감률 통계값을 그래프 <br>"
						+ "또는 표 형태로 확인할 수 있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘융합결과 보기’</strong> 팝업창을 닫아주세요.</p></div>");
				posiInfo(-1);
		}else{
				$("#btn_09").hide();
				$("#popup_01").hide();
				$("#toPoint_db1").hide();
				$("#popup_01_1").show();
				$("#popup_01_1").css({"bottom":"370px","left":"805px"});
				$("#popup_02").show();
				$("#popup_02").css({"left":"800px","top":"-20px"});
				$("#btn_10").show();
				$("#btn_10").css({"top":"-20px","left":"1767px"});
				db2();
				$("#toPoint_db2").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>‘융합결과 데이터’ 화면에서는 융합된 통계지도에 대한 지역별 증감 및 증감률 통계값을 그래프 <br>"
						+ "또는 표 형태로 확인할 수 있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘융합결과 보기’</strong> 팝업창을 닫아주세요.</p></div>");
				posiInfo(-1);
		}
		function db2() {
			$("#toPoint_db2").animate({
				right : 130,
				top : -40
			}, 500, "", function() {
				$(this).animate({
					right : 140,
					top : -40
				}, 500, "", function() {
					db2();
				});
			});
		}
		function db2_1(){
			$("#toPoint_db2_1").animate({
				right : 480,
				top : -30
			}, 500, "", function() {
				$(this).animate({
					right : 490,
					top : -30
				}, 500, "", function() {
					db2_1();
				});
			});
		}
	});
	$("#btn_10").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			if(popChk == 0){
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_01_1").hide();
				$("#popup_02").hide();
				$("#btn_11").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>정책통계지도에서는 경계레벨을 대상지역 기준으로 최대 2레벨까지 설정할 수 있고, 기본값<br>"
						+ "은 1레벨입니다. 현재의 대상지역이 ‘대전광역시’ 이므로 1레벨인 ‘시군구경계’로 설정되어<br>"
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">2레벨로 바꾸기 위해 경계레벨 버튼을 선택해주세요.</strong></p></div>");
				posiInfo(7);
			}else if(popChk == 1){
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_03_1").hide();
				$("#popup_03").hide();
				$("#btn_14").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>이제 대상지역을 시도 단위가 아닌 시군구 단위로 설정해보겠습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'정책통계지도 메뉴'</strong> 버튼을 선택해주세요.</p></div>");
				posiInfo(10);
			}else if(popChk == 4){
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_06_1").hide();
				$("#popup_06").hide();
				btChk = 8;
				$("#btn_14").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'정책통계지도 메뉴'</strong>버튼을 선택해주세요.</p></div>");
				posiInfo(25);
			}else{
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_07_1").hide();
				$("#popup_07").hide();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p>정책통계지도 튜토리얼을 마치신것을 축하합니다.!</p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '정책통계지도'로 이동합니다.)</p></div>");
				posiInfo(-1);
				setTimeout(function(){
					location.href = "/view/map/policyStaticMap"
				}, 10000)
			}
		}else{
			if(popChk == 0){
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_01_1").hide();
				$("#popup_02").hide();
				$("#btn_11").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>정책통계지도에서는 경계레벨을 대상지역 기준으로 최대 2레벨까지 설정할 수 있고, 기본값<br>"
						+ "은 1레벨입니다. 현재의 대상지역이 ‘대전광역시’ 이므로 1레벨인 ‘시군구경계’로 설정되어<br>"
						+ "있습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">2레벨로 바꾸기 위해 경계레벨 버튼을 선택해주세요.</strong></p></div>");
				posiInfo(7);
			}else if(popChk == 1){
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_03_1").hide();
				$("#popup_03").hide();
				$("#btn_14").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>이제 대상지역을 시도 단위가 아닌 시군구 단위로 설정해보겠습니다.<br>"
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'정책통계지도 메뉴'</strong> 버튼을 선택해주세요.</p></div>");
				posiInfo(10);
			}else if(popChk == 4){
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_06_1").hide();
				$("#popup_06").hide();
				btChk = 8;
				$("#btn_14").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'정책통계지도 메뉴'</strong>버튼을 선택해주세요.</p></div>");
				posiInfo(25);
			}else{
				$("#btn_10").hide();
				$("#toPoint_db2").hide();
				$("#popupImgDiv").hide();
				$("#popup_07_1").hide();
				$("#popup_07").hide();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p>정책통계지도 튜토리얼을 마치신것을 축하합니다.!</p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '정책통계지도'로 이동합니다.)</p></div>");
				posiInfo(-1);
				setTimeout(function(){
					location.href = "/view/map/policyStaticMap"
				}, 10000)
			}
			
		}
	
	});
	$("#btn_11").click(function() {

			$("#btn_11").hide();
			$("#btn_12").show();
			$("#btn_13").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>2레벨인 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘읍면동경계’</strong> 항목을 선택해주세요.</p></div>");
			posiInfo(8);
	});
	$("#btn_13").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
				$("#btn_12").hide();
				$("#btn_13").hide();
				$("#map_01").hide();
				$("#map_01_1").hide();
				$("#map_03").hide();
				$("#map_03_1").hide();
				$("#boundLevelTitle").val("2");
				$("#boundLevelTitle").html("<option value='2'>읍면동경계</option>");
				$("#boundLevelTitle").show();
				$("#map_04").show();
				$("#map_04_1").show();
				$("#map_05").show();
				$("#map_05_1").show();
				btChk = 1;
				$("#btn_08").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>대전광역시 기준으로 구 단위 경계가 아닌 동경계로 통계지도가 표출되는 것을 볼 수 있습니다.<br>"
						+ "역시 통계지도 좌측에 있는 유성구의 '동'지역들이 인구가 많이 증가된 것으로 보입니다.<br>"
						+ "융합통계지도를 보기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 보기'</strong> 버튼을 선택해주세요.</p></div>");
							
				posiInfo(9);
		}else{
				$("#btn_12").hide();
				$("#btn_13").hide();
				$("#map_01").hide();
				$("#map_01_1").hide();
				$("#map_03").hide();
				$("#map_03_1").hide();
				$("#boundLevelTitle").val("2");
				$("#boundLevelTitle").html("<option value='2'>읍면동경계</option>");
				$("#boundLevelTitle").show();
				$("#map_04").css({"top":"172px","left":"-275px"});
				$("#map_04").show();
				$("#map_04_1").css({"top":"172px","left":"683px"});
				$("#map_04_1").show();
				$("#map_02").css({"top":"172px","left":"492px"});
				$("#map_02").show();
				$("#map_02_1").show();
				$("#map_05_1").show();
				$("#map_05_1").css({"bottom":"5px","left":"697px"});
				$("#map_05").show();
				$("#map_06").css({"top":"328px","left":"623px"});
				$("#map_06").show();
				$("#map_07").css({"top":"262px","left":"663px"});
				$("#map_07").show();
				btChk = 1;
				$("#btn_08").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>대전광역시 기준으로 구 단위 경계가 아닌 동경계로 통계지도가 표출되는 것을 볼 수 있습니다.<br>"
						+ "역시 통계지도 좌측에 있는 유성구의 '동'지역들이 인구가 많이 증가된 것으로 보입니다.<br>"
						+ "융합통계지도를 보기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'융합결과 보기'</strong> 버튼을 선택해주세요.</p></div>");
							
				posiInfo(9);
		}
	});
	
	$("#btn_14").click(function() {
			if(btChk == 1){
				$("#btn_14").hide();
				$("#map_02").hide();
				$("#map_02_1").hide();			
				$("#map_04").hide();
				$("#map_04_1").hide();
				$("#map_05").hide();
				$("#map_05_1").hide();
				$("#map_06").hide();
				$("#map_07").hide();
				$(".quickBox.step01").stop().animate({"left":"0"},200);
				$(".sq01_01").addClass("on");
				$(".icon01").addClass("on");
				$("#btn_15").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'대전광역시 서구'로 설정하기 위해 시군구 버튼을 선택해주세요.</strong></p></div>");
							
			posiInfo(11);
			}else if(btChk == 4){
				$("#btn_14").hide();
				$("#map_02").hide();
				$("#map_02_1").hide();			
				$("#map_10").hide();
				$("#map_10_1").hide();
				$("#map_11").hide();
				$("#map_11_1").hide();
				$("#map_06").hide();
				$("#map_07").hide();
				$(".quickBox.step01").stop().animate({"left":"0"},200);
				$(".sq01_01").addClass("on");
				$(".icon01").addClass("on");
				$("#btn_21").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>대상지역을 기본값인 '대전광역시 전체'로 설정하겠습니다.<br>" 
						+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'시군구'</strong> 버튼을 선택해주세요.</p></div>");
				posiInfo(18);
			}else if(btChk == 8){
				$("#btn_14").hide();
				$("#map_12").hide();
				$("#map_12_1").hide();
				$("#map_13").hide();
				$("#map_13_1").hide();
				$("#map_06").hide();
				$("#map_07").hide();
				$(".quickBox.step01").stop().animate({"left":"0"},200);
				$(".sq01_01").addClass("on");
				btChk = 9;
				$("#btn_24").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>정책분야 항목 중에서 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘교육∙문화’</strong> 항목을 선택해주세요.</p></div>");
				posiInfo(26);
			}

	});
	$("#btn_15").click(function() {
			$("#btn_15").hide();
			$("#btn_16").show();
			$("#btn_17").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘서구’</strong> 항목을 선택해주세요.</p></div>");
			posiInfo(12);				
	});
	$("#btn_17").click(function() {
		
		$("#btn_16").hide();
		$("#btn_17").hide();
		$("#current-sgg-select").val("030");
		$("#current-sgg-select").html("<option value='030'>서구</option>");
		$("#current-sgg-select").show();
		btChk = 6;
		$("#btn_04").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>대상지역을 변경하면 통계지표를 다시 선택해야 합니다.<br>" 
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘인구∙가구∙주택’</strong> 정책분야 항목을 선택해주세요.</p></div>");
		posiInfo(13);
	});
	$("#btn_18").click(function() {
			$("#btn_18").hide();
			$("#btn_19").show();
			$("#btn_20").show();
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘집계구경계’</strong> 항목을 선택해주세요.</p></div>");
		posiInfo(16);
	});
	$("#btn_20").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#btn_19").hide();
			$("#btn_20").hide();
			$("#map_08").hide();
			$("#map_08_1").hide();
			$("#map_09").hide();
			$("#map_09_1").hide();
			$("#map_06").hide();
			$("#map_07").hide();
			$policyStaticMapLeftmenu.event.closeAnimate(1);
			$("#naviTitle").text("대전광역시");
			$("#naviTitle").show();
			$("#boundLevelTitle").val("1");
			$("#boundLevelTitle").html("<option value='1'>집계구경계</option>");
			$("#boundLevelTitle").show();
			$(".policyStaticMapDataBoard").removeClass("disabled");
			$(".sq01_01").removeClass("on");
			$("#map_02").show();
			$("#map_02_1").show();
			$("#map_06").show();
			$("#map_07").show();
			$("#map_10").show();
			$("#map_10_1").show();
			$("#map_11").show();
			$("#map_11_1").show();
			btChk = 4;
			$("#btn_14").show();
		}else{
			$("#btn_19").hide();
			$("#btn_20").hide();
			$("#map_08").hide();
			$("#map_08_1").hide();
			$("#map_09").hide();
			$("#map_09_1").hide();
			$("#map_06").hide();
			$("#map_07").hide();
			$("#naviTitle").text("대전광역시");
			$("#naviTitle").show();
			$("#boundLevelTitle").val("1");
			$("#boundLevelTitle").html("<option value='1'>집계구경계</option>");
			$("#boundLevelTitle").show();
			$(".policyStaticMapDataBoard").removeClass("disabled");
			$(".sq01_01").removeClass("on");
			$("#map_06").show();
			$("#map_06").css({"top":"328px","left":"623px"});
			$("#map_07").show();
			$("#map_07").css({"top":"262px","left":"663px"});
			$("#map_10").show();
			$("#map_10").css({"top":"172px","left":"-275px"});
			$("#map_10_1").show();
			$("#map_10_1").css({"top":"172px","left":"683px"});
			$("#map_11").show();
			$("#map_11_1").show();
			$("#map_11_1").css({"bottom":"5px","left":"697px"});
			btChk = 4;
			$("#btn_14").show();
			
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>대전광역시 서구 기준으로 집계구경계 단위의 통계지도가 표출되는 것을 볼 수 있습니다.<br>"
				+ "이제 수요변화 지표 이외의 다른 타입의 통계지표를 검색해보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘정책통계지도 메뉴’</strong> 버튼을 선택해주세요.</p></div>");
		posiInfo(17);
	});
	
	$("#btn_21").click(function() {
		
		$("#btn_21").hide();
		$("#btn_22").show();
		$("#btn_23").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘전체’</strong> 항목을 선택해주세요.</p></div>");
		posiInfo(19);
	});
	
	$("#btn_23").click(function() {

		$("#btn_22").hide();
		$("#btn_23").hide();
		$("#current-sgg-select").val("999");
		$("#current-sgg-select").html("<option value='999'>전체</option>");
		$("#current-sgg-select").show();
		$("#current-sgg-select option:selected").attr("data-adm_cd","25");
		btChk = 5;
		$("#btn_24").show();
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>정책분야 항목 중에서 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'교육∙문화'</strong> 항목을 선택해주세요.</p></div>");
		posiInfo(20);
	
	});
	
	$("#btn_24").click(function() {
		if(btChk == 5){
			$("#btn_24").hide();
			$(".icon03").addClass("on");
			$(".icon01").removeClass("on");
			$(".quickBox.step02").stop().animate({"left":"280px"},200);
			$("#cateDetailList01 .idxNmCls").removeClass("on");
			$policyStaticMapLeftmenu.ui.getDetailCategoryList("CTGR_003");
			$("#btn_25").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>통계지표 타입 중 '통계연산형 지표'에 대해서 알아보겠습니다.<br>" 
					+ "'통계연산형 지표'는 <strong style=\"color:#0040ff;  font-weight:bold;\">서로 다른 두개의 통계를 조회하고 융합하는 통계지표</strong>입니다.<br>"
					+ "세부지표 목록에서 '통계연산형 지표' 타입의 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'인구 대비 도서관 평균 도서 보유 현황'</strong> 지표를 선택해주세요.</p></div>");
			posiInfo(21);
		}else{
			$("#btn_24").hide();
			$(".icon03").addClass("on");
			$(".quickBox.step02").stop().animate({"left":"280px"},200);
			$("#current-sgg-select option:selected").attr("data-adm_cd","25");
			$policyStaticMapLeftmenu.ui.getDetailCategoryList("CTGR_003");
			$("#btn_26").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>통계지표 타입 중 ‘시설분석형 지표’에 대해서 알아보겠습니다.<br>"
					+ "'시설분석형 지표'는 <strong style=\"color:#0040ff;  font-weight:bold;\">서로 다른 두개의 통계(색상지도, 시설물POI)를 조회하고 융합하는 통계지표</strong>입니다.<br>"
					+ "세부지표 목록에서 ‘시설분석형 지표’ 타입의 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'도서관 운영 현황'</strong> 지표를 선택해주세요.</p></div>");
			posiInfo(27);
		}

	});
	$("#btn_25").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#btn_25").hide();
			$("#sTitle").text("지역별 수요변환형 > 대전광역시 전체 인구 대비 도서관 평균 도서 보유 현황");
			$policyStaticMapLeftmenu.event.closeAnimate(1);
			$("#boundLevelTitle").val("1");
			$("#boundLevelTitle").html("<option value='1'>시군구경계</option>");
			$("#boundLevelTitle").show();
			$(".sq01_01").removeClass("on");
			$("#map_06").show();
			$("#map_07").show();
			$("#map_12").show();
			$("#map_12_1").show();
			$("#map_13").show();
			$("#map_13_1").show();
			dbChk = 1;
			$("#btn_06").show();		
		}else{
			$("#btn_25").hide();
			$("#sTitle").text("지역별 수요변환형 > 대전광역시 전체 인구 대비 도서관 평균 도서 보유 현황");
			$policyStaticMapLeftmenu.event.closeAnimate(1);
			$("#boundLevelTitle").val("1");
			$("#boundLevelTitle").html("<option value='1'>시군구경계</option>");
			$("#boundLevelTitle").show();
			$(".sq01_01").removeClass("on");
			$("#map_06").show();
			$("#map_06").css({"top":"328px","left":"623px"});
			$("#map_07").show();
			$("#map_07").css({"top":"262px","left":"663px"});
			$("#map_12").show();
			$("#map_12").css({"top":"172px","left":"-275px"});
			$("#map_12_1").show();
			$("#map_12_1").css({"top":"172px","left":"683px"});
			$("#map_13").show();
			$("#map_13_1").show();
			$("#map_13_1").css({"bottom":"5px","left":"697px"});
			dbChk = 1;
			$("#btn_06").show();
		

		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서로 다른 두 개의 통계에 대해 각각 최신년도 기준의 통계색상지도가 분할맵으로 표출됩니다.<br>"
				+ "여기서는 좌측에 ‘인구’ 통계가 표출되고, 우측에 ‘도서관별 도서자료 수’ 통계가 표출됩니다.<br>"
				+ "통계를 좀 더 자세히 살펴보기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘데이터보드’</strong>를 선택해주세요.</p></div>");
		posiInfo(22);
	});
	$("#btn_26").click(function() {
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#btn_26").hide();
			$(".sq01_01").removeClass("on");
			$("#sTitle").text("지역별 수요변환형 > 대전광역시 전체 도서관 운영 현황");
			$("#map_06").show();
			$("#map_07").show();
			$("#map_14").show();
			$("#map_14_1").show();
			$("#map_15").show();
			btChk = 10;
			$("#btn_08").show();
			
		}else{
			$("#btn_26").hide();
			$(".sq01_01").removeClass("on");
			$("#sTitle").text("지역별 수요변환형 > 대전광역시 전체 도서관 운영 현황");
			$("#map_06").show();
			$("#map_06").css({"top":"328px","left":"623px"});
			$("#map_07").show();
			$("#map_07").css({"top":"262px","left":"663px"});
			$("#map_14").show();
			$("#map_14").css({"top":"172px","left":"-275px"});
			$("#map_14_1").show();
			$("#map_14_1").css({"top":"172px","left":"683px"});
			$("#map_15").show();
			btChk = 10;
			$("#btn_08").show();
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서로 다른 두 개의 통계에 대해 각각 최신년도 기준의 통계지도가 분할맵으로 표출됩니다.<br>"
				+ "여기서는 좌측에 ‘인구’ 통계가 표출되고, 우측에 도서관 시설물의 위치가 점 형태로 지도 위에<br>"
				+ "표출됩니다.<br>"
				+ "시설물 위치를 선택하면 시설물의 명칭을 툴팁으로 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘융합결과 보기’</strong> 버튼을 선택해서 융합결과를 확인해보겠습니다.</p></div>");
		posiInfo(28);
	});
	posiInfo(0);
}

function closeTutorial() {
	$("#tuto_start_btn").show();
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
	//	setCookie("confirmMsg", "done", 365);
		location.href = "/view/map/policyStaticMap";
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
