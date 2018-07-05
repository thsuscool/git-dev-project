// 튜토리얼
function readyTutorial() {
	var confirmMsg = confirm("기술업종 통계지도 처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n"
			+ "진행하시겠습니까?");
	if (confirmMsg == 1) {
	//	setCookie("confirmMsgTc", "done", 365);
		
		var iWidth = $(window).width();
		var iHeight = $(window).height();
		
		if (iWidth > 1920 || iHeight > 1080) {
			var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
					+ "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n" + "그래도 실행 하시겠습니까?");
			
			if (warnMsg == 1) {
				$(".tutorialWrapper").show();
				location.href = "/view/technicalBiz/technicalBizMap?tutorial_mode";
			} else {
				alert("기술업종 통계지도 화면으로 돌아가겠습니다.");
				return false;
			}
		} else {
			location.href = "/view/technicalBiz/technicalBizMap?tutorial_mode";
		}
	} else {
	//	setCookie("confirmMsgTc", "done", 365);
		return false;
	}
}

function startTutorial() {
	commonPopupObj.closeWin('technicalBiz_laypopup',7);
	var menuClick = 0;
//	var btnClick = 1;
	
	var board_height_ = $("#tt_ImgDiv").height();
	$(document).keyup(function(event) {
		if (window.event.keyCode == 27) {
			closeTutorial();
		}
	})
	
	$(window).resize(function() {
		var board_re_height_ = $("#tt_ImgDiv").height();
		if (board_re_height_ > board_height_) {
			$("#tt_ImgDiv").css("height", board_height_);
		} else {
			$("#tt_ImgDiv").css("height", $(window).height());
		}
	});
	
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
			$("#mCSB_4_container").css("top","-200px");
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
					alert("기술업종 통계지도 화면으로 돌아가겠습니다.");
					location.href = "/view/technicalBiz/technicalBizMap";
				}
			}
		}
	);
	
	var posi = "";
	var width = 0;
	var height = 0;

	var menuChk = 0;
	
	var tutoImg = [$("#tt_introduce_btn_1"), $("#tt_introduce_btn_2"), $("#tt_introduce_btn_3"), $("#tt_menu_1"), $("#tt_sido_btn_1"),
	               $("#tt_sido_btn_2"), $("#tt_pop_btn_1"), $("#tt_sido_btn_3"), $("#tt_sido_btn_4"), $("#tt_menu_0"),
	               $("#tt_menu_2"), $("#tt_menu_2_1"), $("#tt_menu_2_2"), $("#tt_sigungu_btn_1"), $("#tt_sigungu_btn_2"),
	               $("#tt_menu_0"), $("#tt_menu_3"), $("#tt_menu_3_1"), $("#tt_menu_3_2"),
	               $("#tt_density_btn_1"), $("#tt_density_btn_2"), $("#tt_density_btn_3"), $("#tt_density_btn_4"), $("#tt_density_btn_5"),
	               $("#tt_menu_0"), $("#tt_menu_4"), $("#tt_menu_4_1"), $("#tt_menu_4_2"), $("#tt_lq_btn_1"), 
	               $("#tt_lq_btn_2"), $("#tt_menu_0"), $("#tt_menu_5"), $("#tt_menu_5_1"), $("#tt_menu_5_2"),
	               $("#tt_menu_5_3"), $("#tt_menu_5_4"), $("#tt_ls_btn_1"), $("#tt_ls_btn_9"), $("#tt_menu_0"),
	               $("#tt_menu_6"), $("#tt_supply_btn_1"), $("#tt_menu_0"), $("#tt_menu_7"), $("#tt_industry_btn_1")];
	var pointImg = [2, 2, 2, 4, 2,
	                3, 2, 2, 2, 4,
	                4, 4, 4, 2, 2,
	                4, 4, 4, 4,
	                2, 2, 3, 3, 2,
	                4, 4, 4, 4, 2,
	                3, 4, 4, 4, 4,
	                3, 3, 2, 2, 4,
	                4, 2, 4, 4, 2 ];
	var tutoIndex = 0;
	
	apiLogWrite2('T0', 'T06', '기술업종 통계지도 튜토리얼', '없음', '00', '없음');
	$("#tuto_start_btn").hide();
	$(".tutorialWrapper").show();
	$("#headerTutorial").show();
	$("#tutorialText").append(
			"<div class=\"title\">"
			+ "<p><span style=\"margin-left:5px;\">기술업종 통계지도 첫 사용을 환영합니다!</span></p>"
			+ "</div>"
			+ "<div class=\"content\">"
			+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">기술업종이란 신기술을 기반으로 수익을 창출하는 기술집약적 업종</strong>으로 총 7개 업종으로 분류합니다."
			+ "'기술업종통계지도'에서는 각 기술업종별 현황과 변화를 알아볼 수 있습니다.<br>"
			+ "기술업종의 전반적 현황을 알아보기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">그래프 아이콘을 클릭해 주세요.</strong><br>"
			+ "</p></div>");
	
	$("#tt_introduce_btn_1").addClass("tutobtnOn").show();
	
	$("#tt_introduce_btn_1").click(function( evt ){
		fullMode(document.documentElement);
		$("#tt_introduce_1").hide();
		$("#tt_introduce_2").show();
		$("#tt_introduce_btn_2").addClass("tutobtnOn").show();
		
		var content = "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'각 분류별 기술업종 사업체'가 전체 기술업종 사업체에서 차지하는 비율과 증감 연도별 증감률</strong>을 "
			+ "한눈에 보실 수 있습니다.<br>"
			+ "<strong style=\"color:#0040ff;  font-weight:bold;\">기술업종은 산업분류표의 관련코드를 가진 사업체들로 구성</strong>되어 있습니다.<br>"
			+ " 각 기술업종에 어떤 사업체들이 속해 있는지를 보려면 현재 화면에서 우측 상단의<br>" 
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">말풍선 버튼을 클릭하면 보실 수 있습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(1);
	});
	
	$("#tt_introduce_btn_2").click(function( evt ){
		$("#tt_introduce_2").hide();
		$("#tt_introduce_3").show();
		$("#tt_introduce_btn_3").addClass("tutobtnOn").show();
		
		var content = "<p>예를 들어 기술혁신정보군의 첨단기술업종은 의료용 물질 및 의약품 제조업 등<br>"
			+ " 4개 세부업종으로 구성된 것을 보실 수 있습니다.<br>"
			+ "<strong style=\"color:#0040ff;  font-weight:bold;\">기술업종소개창은 지도 상단의 '기술업종현황'버튼에서 언제든지 다시 보실 수 있습니다.</strong><br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">이제 창을 닫아주세요.<br>";
		clickEvent( evt, content );
		posiInfo(2);
	});
	
	$("#tt_introduce_btn_3").click(function( evt ){
		$("#tt_introduce_3").hide();
		$("#tt_menu_1").addClass("tutobtnOn").show();
		
		$(".sq02").addClass("on");
		$("#map_left_btn").css("left","280px");
		$("#map_left_btn").css("width","40px");
		$("#map_left_btn>span").css("display","none");
		$(".step01").css("left",0);
		
		var content = "<p>이제 지역별로 상세한 통계를 살펴보도록 하겠습니다.<br>"
			+ "<strong style=\"color:#0040ff;  font-weight:bold;\">시도별 및 시군구 기술업종 현황에서는"
			+ " 각 지역을 클릭하여 요약정보를 볼 수 있습니다.</strong><br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'시도별 기술업종현황'을 클릭하여 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(3);
	});
	
	$("#tt_menu_1").click(function( evt ){
		$("#tt_menu1").hide();
		$("#map_left_btn").click().prop("style", "left:0px;width:90px;");
		$("#tt_bg_1").show();
		$("#tt_sido_btn_1").addClass("tutobtnOn").show();
		
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">각 시도별 기술업종의 수와 구성을 파이그래프로 한눈에 볼 수 있습니다.</strong><br>"
			+ "<strong style=\"color:#0040ff;  font-weight:bold;\">기술업종의 전체 사업체수는 파이의 크기로 나타나는데요.</strong><br>"
			+ " 서울, 경기도, 경상북도, 경상남도, 대구, 부산 등의 파이가 특히 큰 것을 볼 수 있습니다.<br>"
			+ "파이의 구성을 보면 지역별 차이가 확연히 나타납니다.<br>"
			+ "<div class=\"tt_button01\" id=\"next\" style=\"left:10px; top:5px; \">"
			+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
			+ "</div>";
			clickEvent( evt, content );
			posiInfo(4);
	});
	$("body").on("click",".tt_button01",function( evt ){
//		$("#tt_sido_btn_1").addClass("tutobtnOn").show();
		var content = "<p>경상북도 등 대부분의 지역이 저기술, 중기술로 주로 구성되는데 비해 서울특별시는 거의 절반이<br>"
			+ "지식집약적 업종으로 구성되어 있으며 특히 ICT와 전문서비스 업종의 강세를 볼 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">경기도지역의 파이를 클릭해 보겠습니다.</strong>";
		clickEvent( evt, content );
//		posiInfo(4);
	})
	$("#tt_sido_btn_1").click(function( evt ){
		$("#tt_bg_1, #tt_sido_btn_1").hide();
		$("#tt_bg_2").show();
		$("#tt_sido_btn_2").addClass("tutobtnOn").show();
		
		var content = "<p>각 파이를 클릭하면 구체적인 <strong style=\"color:#0040ff;  font-weight:bold;\">기술업종 사업체 숫자와 비율</strong>을 볼 수 있습니다.<br>"
			+ "경기도의 경우 다른 지역과 마찬가지로 중기술, 저기술 비율이 높게 나타나고 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">지역통계 데이터보기 버튼을 클릭하면 더 상세한 내용을 볼 수 있습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(5);
	});
	$("#tt_sido_btn_2").click(function( evt ){
		$("#tt_sido_board_1").show();
		$("#tt_pop_btn_1").addClass("tutobtnOn").show();
		$("#tt_sido_btn_2").hide();
		var content = "<p>제일 먼저 보이는 그래프는 선택한 지역(경기도)의 기술업종분포현황을 방사형 그래프로 나타낸 것입니다."
			+ "<strong style=\"color:#0040ff;  font-weight:bold;\">방사형 그래프는 기준지역(전국)의 각 기술업종 사업체 수를 5라고 잡았을 때 선택한 지역(경기도)의 기술업종 사업체수가 몇이 될지를 표시한 겁니다.</strong><br>"
			+ "전국 평균(전국총합/17개시도)과 비교했을 때 이 지역의 기술업종 구성이 어떤지, 상대적으로 특정 업종이 많은 편인지 적은 편인지를 한 눈에 보기 위한 그래프입니다.<br>"
			+ "<div class=\"tt_button02\" id=\"next\" style=\"left:10px; top: -14px;\">"
			+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
			+ "</div>";
		clickEvent( evt, content );
		posiInfo(6);
	});
	$("body").on("click",".tt_button02",function( evt ){
		var content = "<p>경기도의 경우 모든 기술업종 사업체수가 평균보다 많은 편인 걸 볼 수 있습니다. <br>"
			+ "그 중에도 첨단기술, 고기술, 중기술, 저기술이 특히 두루 많은데 ICT나 창의 및 디지털은 특별히 다른 지역보다 많지는 않네요.<br>"
			+ "상단의 사업체와 종사자수로 구성된 토글 버튼이 있네요.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">토글버튼을 종사자수로 바꿔보겠습니다.</strong>";
		clickEvent( evt, content );
	})
	$("#tt_pop_btn_1").click(function( evt ){
		$("#tt_pop_btn_1").hide();
		$("#tt_pop_btn_2, #tt_bg_3").show();
		$("#tt_sido_btn_3").addClass("tutobtnOn").show();
		$("#tt_bg_2").hide();
		var content = "<p>사업체, 종사자 토글 버튼을 이용해서 지도화면의 기준정보를 바꿀 수 있는데, 이전의 사업체 기준에서 종사자수 기준으로 바뀌었습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">경기도지역 파이를 클릭해보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(7);
	});
	$("#tt_sido_btn_3").click(function( evt ){
		$("#tt_bg_3, #tt_sido_btn_3").hide();
		$("#tt_sido_btn_4").addClass("tutobtnOn").show();
		$("#tt_bg_4").show();
		var content = "<p>선택한 지역(경기도)의 기술업종별 종사자 수와 비율정보가 보여집니다.<br>"
			+ "첨단기술, 고기술, 중기술, 저기술의 사업체 비율이 높은만큼 종사자수도 같은 업종에서 비율이 높은 것을 확인 할 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드의 업종별 입지계수 현황 버튼을 클릭해 보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(8);
	});
	$("#tt_sido_btn_4").click(function( evt ){
		$("#tt_sido_btn_4,#tt_sido_board_1").hide();
		$("#tt_menu_0").addClass("tutobtnOn").show();
		$("#tt_sido_board_2").show();
		menuChk = 0;
		var content = "<p><strong style=\"color:#0040ff;  font-weight:bold;\">입지계수란 상대적 특화도 지수로 불리며, 어떤 산업이 특정 지역에 상대적으로 특화된 정도를 측정하는 지표입니다.</strong><br>"
			+ "입지계수 차트를 보면 가로축이 사업체 기준 입지계수, 세로축이 종사자 기준 입지계수로 값이 1이상인 경우 평균보다 높음을 의미합니다.<br>"
			+ "<div class=\"tt_button03\" id=\"next\" style=\"left:10px; top:5px; \">"
			+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
			+ "</div>";
		clickEvent( evt, content );
		posiInfo(9);
	});
	$("body").on("click",".tt_button03",function( evt ){
		var content = "<p>데이터 보드를 보면 경기도는 사업체기준으로 첨단기술,고기술,중기술 업종의 집적도가 높으며,<br>"
			+ "종사자가 기준으로는 첨단기술,고기술, 중기술, 저기술 업종의 집적도가 높고, 중기술, 저기술 업종은 평균에 가까운 것을 볼 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">다음으로 통계메뉴를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
	})
	$("#tt_menu_0").click(function( evt ){
		$("#map_left_btn").click();
		if(menuChk == 0){
			$("#tt_menu_0,#tt_bg_4,#tt_pop_btn_2,#tt_sido_board_2,#tt_menu_0").hide();
			$("#tt_menu_2").addClass("tutobtnOn").show();
			var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">시군구 단위의 기술업종 현황을 살펴보기 위해서 시군구 기술업종 현황 메뉴를 선택해주세요.</strong>";
			clickEvent( evt, content );
			posiInfo(10);
		}else if(menuChk == 1){
			$(".icon02").removeClass("on");
			$("#tt_bg_5, #tt_sigungu_board_2, #tt_menu_0, #tt_legend_1").hide();
			$("#tt_menu_3").addClass("tutobtnOn").show();
			var content = "<p>이제 기술업종 시계열조회를 통해 기술업종이 어떻게 성장하고 있는지 살펴보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">업종밀집도 변화를 클릭해 주세요.</strong>";
			clickEvent( evt, content );
			posiInfo(16);
		}else if(menuChk == 2){
			$(".icon03").removeClass("on");
			$("#tt_bg_11, #tt_density_board_5, #tt_menu_0, #tt_legend_3").hide();
			$("#tt_menu_4").addClass("tutobtnOn").show();
			var content = "<p>다음으로 기술업종에 대한 지역별 입지계수 정보를 조회해보겠습니다.<br>"
				+ "지도상에서 입지계수 정보를 확인할 수 있고, 사업체/종사자 기준으로 조회할 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">업종별 입지계수 지도 메뉴를 클릭해 주세요.</strong>";
			clickEvent( evt, content );
			posiInfo(25);
		}else if(menuChk == 3){
			$(".icon06").removeClass("on");
			$("#tt_menu_0 ,#tt_lq_board_2, #tt_bg_14, #tt_legend_5").hide();
			$("#tt_menu_5").addClass("tutobtnOn").show();
			var content = "<p>다음으로 기술업종 검색조건을 설정하여 조건에 맞는 지역을 조회하는 기능을 살펴보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">조건별 지역찾기를 클릭해 주세요.</strong>";
			clickEvent( evt, content );
			posiInfo(31);
		}else if(menuChk == 4){
			$(".icon07").removeClass("on");
			$("#tt_menu_0, #tt_legend_7, #tt_bg_22, #tt_ls_board_2").hide();
			$("#tt_menu_6").addClass("tutobtnOn").show();
			var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">지원시설 조회를 클릭해 주세요.</strong>";
			clickEvent( evt, content );
			posiInfo(39);
		}else if(menuChk == 5){
			$(".icon04").removeClass("on");
			$("#tt_menu_0 ,#tt_supply_board_2, #tt_bg_24, #tt_legend_9").hide();
			$("#tt_menu_7").addClass("tutobtnOn").show();
			var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">산업단지 조회 메뉴를 클릭해 주세요.</strong>";
			clickEvent( evt, content );
			posiInfo(42);
		}
	});
	$("#tt_menu_2").click(function( evt ){
		$technicalBizLeftMenu.ui.setDetailStatsPanel('sigungu');
		$("#tt_menu_2").hide();
		$("#tt_menu_2_1").addClass("tutobtnOn").show();
		var content = "<p>이 메뉴에서는 먼저 기술업종 종류를 선택하여 분포현황을 시군구별 색상지도로 볼 수 있습니다.<br>"
			+ "우리는 고기술 현황을 살펴보도록 하겠습니다. ‘고기술’은 화학제품, 전기장비, 자동차 및 기계  등 제조업으로 구성되어 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">기술혁신 정도를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(11);
	});
	$("#tt_menu_2_1").click(function( evt ){
		$("#tt_menu_2_1").hide();
		$(".roundTextBox")[1].click();
		$("#tt_menu_2_2").addClass("tutobtnOn").show();
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">고기술업종을 클릭해주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(12);
	});
	$("#tt_menu_2_2").click(function( evt ){
		$("#tt_menu_2_2").hide();
		$(".roundTextBox")[1].click();
		$("#map_left_btn").click().prop("style", "left:0px;width:90px;");
		$("#tt_bg_5").show();
		$("#tt_sigungu_btn_1").addClass("tutobtnOn").show();
		$("#tt_legend_1").show();
		var content = "<p>전국의 고기술 산업 분포를 한눈에 볼 수 있습니다.<br>"
			+ "경기도 화성시가 가장 사업체가 많네요.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">화성시를 클릭해보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(13);
	});
	$("#tt_sigungu_btn_1").click(function( evt ){
		$("#tt_sigungu_btn_1").hide();
		$("#tt_sigungu_board_1").show();
		$("#tt_sigungu_btn_2").addClass("tutobtnOn").show();
		var content = "<p>경기도가 전체적으로 고기술 사업체가 많지만, 화성시는 그 중에서도 특히 기타 기계 및 장비 제조업이 많아 고기술 산업을 이끄는 것을 볼 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드 하단의 정보를 살펴보기 위해 상단 영역을 닫아주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(14);
	});	
	$("#tt_sigungu_btn_2").click(function( evt ){
		$("#tt_sigungu_btn_2, #tt_sigungu_board_1, #tt_sigungu_board_1_1").hide();
		$("#tt_sigungu_board_2").show();
		$("#tt_menu_0").addClass("tutobtnOn").show();
		menuChk = 1;
		var content = "<p>각 항목의 우측 버튼을 누르면 항목별 상세그래프를 확인할 수 있습니다."
			+ "항목별로 1위와 최하위 선택한 지역의 순위와 그 상위지역의 평균을 볼 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">이제 통계메뉴를 클릭해 보세요.</strong>";
		clickEvent( evt, content );
		posiInfo(15);
	});	
	$("#tt_menu_3").click(function( evt ){
		$("#tt_menu_3, #tt_sigungu_board_2").hide();
		$technicalBizLeftMenu.ui.setDetailStatsPanel('density');
		$("#tt_menu_3_1").addClass("tutobtnOn").show();
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">전체현황을 선택해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(17);
	});	
	$("#tt_menu_3_1").click(function( evt ){
		$("#tt_menu_3_1").hide();
		$(".roundTextBox")[0].click();
		$("#tt_menu_3_2").addClass("tutobtnOn").show();
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">기술업종 전체현황을 선택해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(18);
	});
	$("#tt_menu_3_2").click(function( evt ){
		$("#tt_menu_3_2").hide();
		$("#map_left_btn").click().prop("style", "left:0px;width:90px;");
		$("#tt_bg_6, #tt_legend_2,#tt_density_board_1").show();
		$("#tt_density_btn_1").addClass("tutobtnOn").show();
		var content = "<p>주요 대도시를 중심으로 기술업종이 분포해 있는 것을 볼 수 있습니다.<br>"
			+ "역시 서울과 경기도 지역에 사업체가 가장 많네요.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">경기도 지역을 클릭해 보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(19);
	});	
	$("#tt_density_btn_1").click(function( evt ){
		$("#tt_density_btn_1, #tt_bg_6, #tt_density_board_1").hide();
		$("#tt_bg_7, #tt_density_board_2").show();
		$("#tt_density_btn_2").addClass("tutobtnOn").show();
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">이제 성남시를 클릭해 보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(20);
	});	
	$("#tt_density_btn_2").click(function( evt ){
		$("#tt_density_btn_2, #tt_bg_7, #tt_density_board_2").hide();
		$("#tt_bg_8, #tt_density_board_3").show();
		$("#tt_density_btn_3").addClass("tutobtnOn").show();
		var content = "<p>최근 조성되고 있는 산업단지의 영향으로 기술업종 사업체 수가 늘어나고 있는 경향을 볼 수<br>"
			+ "있습니다.<br>"
			+ "보다 자세히 알아보기 위해<strong style=\"color:#ee7c1a;  font-weight:bold;\"> ICT를 클릭해 보세요.</strong>";
		clickEvent( evt, content );
		posiInfo(21);
	});	
	$("#tt_density_btn_3").click(function( evt ){
		$("#tt_density_btn_3,#tt_bg_8,#tt_density_board_3").hide();
		$("#tt_bg_9").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#tt_density_board_4").show();
		}else{
			$("#tt_density_board_4_1").show();
			$("#tt_density_btn_5").css({"top":"311px","right":"462px"});
		}
		$("#tt_density_btn_4").addClass("tutobtnOn").show();
		var content = "<p>ICT업종 사업체의 증가 폭이 상당히 큰 것을 알 수 있습니다.<br>"
			+ "<strong style=\"color:#0040ff  font-weight:bold;\">열지도는 화면 좌측 하단에 시각화 정도를 조절할 수 있는 범례가 있습니다.</strong><br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">반지름을 드래그하여 30까지 올려보세요.</strong>";
		clickEvent( evt, content );
		posiInfo(22);
	});	
	$("#tt_density_btn_4").click(function( evt ){
		$("#tt_density_btn_4, #tt_bg_9, #tt_legend_2").hide();
		$("#tt_bg_10, #tt_legend_3, #tt_density_btn_5").show();
		$("#tt_density_btn_5").addClass("tutobtnOn").show();
		$("#tt_density_btn_5").css("z-index","10003");
		var content = "<p>이와 같이 반지름과 흐림도를 조절하여 시각화 정도를 조절할 수 있습니다.<br>"
			+ "이제 과거 데이터를 보겠습니다.<br><strong style=\"color:#ee7c1a;  font-weight:bold;\">우측 하단의 시계열 버튼 중 2006년을 클릭해 보세요.</strong>";
		clickEvent( evt, content );
		posiInfo(23);
	});	
	$("#tt_density_btn_5").click(function( evt ){
		$("#tt_density_btn_5, #tt_bg_10, #tt_density_board_4, #tt_density_board_4_1").hide();
		$("#tt_bg_11,#tt_density_board_5").show();
		$("#tt_menu_0").addClass("tutobtnOn").show();
		menuChk = 2;
		var content = "<p>2006년에는 지금보다 업체 수가 작은 것을 볼 수 있습니다.<br>"
			+ "이 상태에서 화면을 확대하면 하나하나의 사업체 위치와 이름을 볼 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">이제 통계메뉴를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(24);
	});	
	$("#tt_menu_4").click(function( evt ){
		$technicalBizLeftMenu.ui.setDetailStatsPanel('lq');
		$("#tt_menu_4").hide();
		$("#tt_menu_4_1").addClass("tutobtnOn").show();
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">기술혁신정도를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(26);
	});	
	$("#tt_menu_4_1").click(function( evt ){
		$("#tt_menu_4_1").hide();
		$(".roundTextBox")[1].click();
		$("#tt_menu_4_2").addClass("tutobtnOn").show();
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">참단기술업종을 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(27);
	});
	$("#tt_menu_4_2").click(function( evt ){
		$("#tt_menu_4_2").hide();
		$("#map_left_btn").click().prop("style", "left:0px;width:90px;");
		$("#tt_bg_12, #tt_lq_board_1, #tt_legend_4").show();
		$("#tt_lq_btn_1").addClass("tutobtnOn").show();
		var content = "<p>앞에서 선택한 첨단기술업종에 대한 입지계수 정보가 색상지도로 표출되고 있습니다."
			+ "기본적으로 전국 시도기준의 입지계수 정보가 표출되고, 시군구 또는 읍면동 레벨까지 조회할 수 있습니다. 데이터보드에는 각 지역별 입지계수 정보가 사업체/종사자로 구분되어 차트로 표출되고 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">좀 더 자세히 보기 위해 대전광역시를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(28);
	});	
	$("#tt_lq_btn_1").click(function( evt ){
		$("#tt_lq_btn_1, #tt_bg_12").hide();
		$("#tt_bg_13").show();
		$("#tt_lq_btn_2").addClass("tutobtnOn").show();
		var content = "<p>선택한 대전지역에 대한 상세 현황정보가 팝업형태로 보여집니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">좀 더 자세히 알아보기 위해서 해당지역 상세정보 보기 버튼을 클릭해 보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(29);
	});	
	$("#tt_lq_btn_2").click(function( evt ){
		$("#tt_lq_btn_2, #tt_bg_13, #tt_lq_board_4, #tt_legend_4").hide();
		$("#tt_bg_14, #tt_lq_board_2, #tt_legend_5").show();
		$("#tt_menu_0").addClass("tutobtnOn").show();
		menuChk = 3;
		var content = "<p>지도화면이 선택한 대전지역 기준의 입지계수 지도로 변경되었습니다.<br>"
			+ "데이터보드에서는 대전지역의 연도별 입지계수 변화 그래프가 추가되었고, 하단에는 대전지역 내 시군구 단위의 입지계수 차트가 보여집니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(30);
	});	
	$("#tt_menu_5").click(function( evt ){
		$technicalBizLeftMenu.ui.setDetailStatsPanel('search');
		$("#tt_menu_5").hide();
		$("#tt_menu_5_1").addClass("tutobtnOn").show();
		setTimeout(function(){
			if(!($(window).height()>=1080||$(window).width()>=1920)){
				$("#mCSB_4_container").css("top","-200px");
				$("#tt_menu_5_1").css("top","195px");
			}
		},500);
		var content = "조건별 지역찾기에서는 기술업종, 입지계수, 증감률, 지원시설정보 등의 조건을 선택할 수 있습니다. 업종은 기본적으로 기술업종 전체로 선택되어 있습니다.<br>"
			+ "업종선택은 전체로 한 후에 <strong style=\"color:#ee7c1a;  font-weight:bold;\">사업체 기준 입지계수를 1.5 이상으로 변경해보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(32);
	});	
	$("#tt_menu_5_1").click(function( evt ){
		$("#tt_menu_5_1").hide();
		$("#slider01 a:eq(0)").css("bottom","70%");
		$("#slider01 div:eq(0)").css({"bottom":"70%","height":"30%"});
		$("#slider01 .tooltip:eq(0)").text("1.5");
		$(".slideArea10:eq(0) .resultValue01 .val01").text("1.5");
		$("#tt_menu_5_2").addClass("tutobtnOn").show();
		if(!($(window).height()>=1080||$(window).width()>=1920)){
			$("#mCSB_4_container").css("top","-200px");
			$("#tt_menu_5_2").css("top","195px");
		}
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">종사자 기준 입지계수도 1.5 이상으로 변경하겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(33);
	});	
	$("#tt_menu_5_2").click(function( evt ){
		$("#tt_menu_5_2").hide();
		$("#slider02 a:eq(0)").css("bottom","70%");
		$("#slider02 div:eq(0)").css({"bottom":"70%","height":"30%"});
		$("#slider02 .tooltip:eq(0)").text("1.5");
		$(".slideArea10:eq(1) .resultValue01 .val01").text("1.5");
		$("#tt_menu_5_3").addClass("tutobtnOn").show();
		if(!($(window).height()>=1080||$(window).width()>=1920)){
			$("#mCSB_4_container").css("top","-200px");
			$("#tt_menu_5_3").css("top","565px");
		}
		var content = "<p>지원시설 조건에는 창업지원센터 또는 산업단지가 있는 지역인지 여부를 설정합니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">산업단지가 있는 지역에 체크를 해보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(34);
	});	
	$("#tt_menu_5_3").click(function( evt ){
		$("#tt_menu_5_3").hide();
		$("label[for='rd_inFac02']").addClass("on");
		$("#tt_menu_5_4").addClass("tutobtnOn").show();
		
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">조건 선택 완료 후 지역 검색 버튼을 클릭해주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(35);
	});	
	$("#tt_menu_5_4").click(function( evt ){
		$("#tt_menu_5_4").hide();
		$("#map_left_btn").click().prop("style", "left:0px;width:90px;");
		$("#tt_legend_6, #tt_ls_board_1, #tt_bg_15").show();
		$("#tt_ls_btn_1").addClass("tutobtnOn").show();
		var content = "<p>조건에 맞는 후보지역이 지도에 표출되었네요. <strong style=\"color:#0040ff;  font-weight:bold;\">색상은 후보지역 내에 조건에 맞는 기술업종의 개수를 나타냅니다.</strong>"
			+ "데이터보드에는 설정한 조건정보가 표출이 되며, 비교지역 목록에는 검색된 후보지역의 검색지역 리스트, "
			+ "사업체/종사자 입지계수 그래프, 창업지원시설/산업단지 수 그래프 등의 정보를 탭을 구분하여 보여줍니다."
			+ "후보지역간 상세비교를 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">지역 비교하기 버튼을 클릭해 보겠습니다.</strong>";
			clickEvent( evt, content );
			posiInfo(36);
	});
	$("#tt_ls_btn_1").click(function( evt ){
		$("#toPoint_2_1").clearQueue().stop();
		$("#tt_ls_btn_1").hide();
		$("#toPoint_2_1").css({"top":"446px","left":"525px"});
		$(".popWrapper, #tt_bg_16").show();
		$("#tt_ls_btn_2").addClass("tutobtnOn").show();
		$("#tt_ls_btn_2").css("z-index","20001");
		var content = "<p>지역 비교하기에서는 선택지역 직접비교하기와 지역 필터링하여 비교하기로 구성되어있습니다.<br>"
			+ "<strong style=\"color:#0040ff;  font-weight:bold;\">선택지역 직접 비교하기는 검색된 후보지를 사용자가 직접 선택하여 비교하는 방법이고,<br>"
			+ "지역 필터링하여 비교하기는 1차로 검색한 후보지를 2차 필터링을 통해 후보지를 재 검출 하는 방법입니다.</strong><br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">이 중에서 선택지역 직접 비교하기를 시작해 보겠습니다.</strong>";
		clickEvent( evt, content );
		posiInfo(-1);
		$("#toPoint_2_1").show();
		tPoint_1();
		function tPoint_1() {
			$("#toPoint_2_1").animate({
				top : 446,
				left : 525
			}, 500, "", function() {
				$(this).animate({
					top : 446,
					left : 535
				}, 500, "", function() {
					tPoint_1();
				});
			});
		}
	});	
	$("#tt_ls_btn_2").click(function( evt ){
		$("#toPoint_2_1").clearQueue().stop();
		$("#toPoint_2_1").hide();
		$("#toPoint_2_1").css({"top":"150px","left":"255px"});
		$("#tt_ls_btn_2, #tt_bg_16").hide();
		$("#tt_bg_17").show();
		$("#tt_ls_btn_3").addClass("tutobtnOn").show();
		$("#tt_ls_btn_3").css("z-index","20001");
		var content = "<p>기존에 검색된 후보지역입니다. 이중에 최대 5개가 선택가능 합니다.<br>"
				+ " 우선 서울 특별시 강서구와 대구광역시 달성군 2개의 후보지를 검색해보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">서울특별시 강서구를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(-1);
		$("#toPoint_2_1").show();
		tPoint_2();
		function tPoint_2() {
			$("#toPoint_2_1").animate({
				top : 150,
				left : 255
			}, 500, "", function() {
				$(this).animate({
					top : 150,
					left : 265
				}, 500, "", function() {
					tPoint_2();
				});
			});
		}
	});	
	$("#tt_ls_btn_3").click(function( evt ){
		$("#toPoint_2_1").clearQueue().stop();
		$("#toPoint_2_1").hide();
		$("#toPoint_2_1").css({"top":"230px","left":"540px"});
		$("#tt_ls_btn_3, #tt_bg_17").hide();
		$("#tt_bg_18").show();
		$("#tt_ls_btn_4").addClass("tutobtnOn").show();
		$("#tt_ls_btn_4").css("z-index","20001");
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">대구광역시 달성군을 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(-1);
		$("#toPoint_2_1").show();
		tPoint_3();
		function tPoint_3() {
			$("#toPoint_2_1").animate({
				top : 230,
				left : 540
			}, 500, "", function() {
				$(this).animate({
					top : 230,
					left : 550
				}, 500, "", function() {
					tPoint_3();
				});
			});
		}
	});	
	$("#tt_ls_btn_4").click(function( evt ){
		$("#toPoint_2_1").clearQueue().stop();
		$("#toPoint_2_1").hide();
		$("#toPoint_2_1").css({"top":"495px","left":"525px"});
		$("#tt_ls_btn_4, #tt_bg_18").hide();
		$("#tt_bg_19").show();
		if(!($(window).height()>=1080||$(window).width()>=1920)){
			$("#tt_bg_19").css("top","-47px");
			$("#tt_ls_btn_5").css("top","490px");
		}
		$("#tt_ls_btn_5").addClass("tutobtnOn").show();
		$("#tt_ls_btn_5").css("z-index","20001");
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">해당지역 비교하기를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(-1);
		$("#toPoint_2_1").show();
		tPoint_4();
		function tPoint_4() {
			$("#toPoint_2_1").animate({
				top : 495,
				left : 525
			}, 500, "", function() {
				$(this).animate({
					top : 495,
					left : 535
				}, 500, "", function() {
					tPoint_4();
				});
			});
		}
	});	
	$("#tt_ls_btn_5").click(function( evt ){
		$("#toPoint_2_1").clearQueue().stop();
		$("#toPoint_2_1").hide();
		$("#toPoint_2_1").css({"top":"40px","left":"710px"});
		$("#tt_bg_19").css("top","15px");
		$("#tt_ls_btn_5, #tt_bg_19").hide();
		$("#tt_bg_20").show();
		$("#tt_ls_btn_6").addClass("tutobtnOn").show();
		$("#tt_ls_btn_6").css("z-index","20001");
		var content = "<p>선택지역 비교하기 결과 화면입니다."
			+ "종합통계정보에서는 업종별로 지역특성 정보, 입지계수 정보, 증감추이 등의 그래프를 지역별로 비교해서 보여줍니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">상세통계정보를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(-1);
		$("#toPoint_2_1").show();
		tPoint_5();
		function tPoint_5() {
			$("#toPoint_2_1").animate({
				top : 40,
				left : 710
			}, 500, "", function() {
				$(this).animate({
					top : 40,
					left : 720
				}, 500, "", function() {
					tPoint_5();
				});
			});
		}
	});	
	$("#tt_ls_btn_6").click(function( evt ){
		$("#toPoint_2_1").clearQueue().stop();
		$("#toPoint_2_1").hide();
		$("#toPoint_2_1").css({"top":"0px","left":"1175px"});
		$("#tt_ls_btn_6, #tt_bg_20").hide();
		$("#tt_bg_21").show();
		$("#tt_ls_btn_7").addClass("tutobtnOn").show();
		$("#tt_ls_btn_7").css("z-index","20001");
		var content = "<p>상세통계정보에서는 업종별로 창업지원시설, 산업단지현황, 기술업종통계현황, 지역통계현황에 대해서 막대그래프로 비교해서 보여줍니다<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">화면을 닫아주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(-1);
		$("#toPoint_2_1").show();
		tPoint_6();
		function tPoint_6() {
			$("#toPoint_2_1").animate({
				top : 0,
				left : 1175
			}, 500, "", function() {
				$(this).animate({
					top : 0,
					left : 1185
				}, 500, "", function() {
					tPoint_6();
				});
			});
		}
	});	
	$("#tt_ls_btn_7").click(function( evt ){
		$("#toPoint_2_1").clearQueue().stop();
		$("#toPoint_2_1").hide();
		$("#toPoint_2_1").css({"top":"0px","left":"955px"});
		$("#tt_ls_btn_7, #tt_bg_21").hide();
		$("#tt_bg_19").show();
		$("#tt_ls_btn_8").addClass("tutobtnOn").show();
		$("#tt_ls_btn_8").css("z-index","20001");
		var content = "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">한번 더 화면을 닫아주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(-1);
		$("#toPoint_2_1").show();
		tPoint_7();
		function tPoint_7() {
			$("#toPoint_2_1").animate({
				top : 0,
				left : 955
			}, 500, "", function() {
				$(this).animate({
					top : 0,
					left : 965
				}, 500, "", function() {
					tPoint_7();
				});
			});
		}
	});	
	$("#tt_ls_btn_8").click(function( evt ){
		$(".popWrapper, #tt_ls_btn_8, #tt_bg_19").hide();
		$("#tt_ls_btn_9").addClass("tutobtnOn").show();
		var content = "<p>앞에서 보았던 조건별 지역찾기 결과 화면입니다."
			+ "데이터보드의 검색지역리스트 목록에 있는 각각의 시군구별로 상세정보를 조회할 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">서울특별시 구로구의 상세정보 버튼을 클릭해주세요. </strong>";
		clickEvent( evt, content );
		posiInfo(37);
	});	
	$("#tt_ls_btn_9").click(function( evt ){
		$("#tt_ls_btn_9, #tt_bg_15, #tt_ls_board_1, #tt_legend_6").hide();
		$("#tt_ls_board_2, #tt_bg_22, #tt_legend_7").show();
		$("#tt_menu_0").addClass("tutobtnOn").show();
		menuChk = 4;
		var content = "<p>지역 상세보기 화면에서는 선택한 지역의 읍면동 단위 상세지도가 표출됩니다. 데이터보드에서는 기술업종별 사업체 수, 비율, 증감 그리고, 입지계수 정보가 표출됩니다."
			+ "여기서 지도정보 기준을 사업체에서 종사자로 바꾸면 지도화면과 데이터보드 정보가 모두 종사자 기준으로 변경됩니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(38);
	});	
	$("#tt_menu_6").click(function( evt ){
		$technicalBizLeftMenu.ui.setDetailStatsPanel('supply');
		$("#tt_menu_6").hide();
		$("#tt_bg_23, #tt_supply_board_1, #tt_legend_8").show();
		$("#tt_supply_btn_1").addClass("tutobtnOn").show();
		var content = "<p> 시도별 지원시설 현황을 볼 수 있는 메뉴입니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">충청남도를 클릭해 보세요.</strong>";
		clickEvent( evt, content );
		posiInfo(40);
	});	
	$("#tt_supply_btn_1").click(function( evt ){
		$("#tt_supply_btn_1, #tt_bg_23, #tt_supply_board_1, #tt_legend_8").hide();
		$("#tt_bg_24,#tt_supply_board_2, #tt_legend_9").show();
		$("#tt_menu_0").addClass("tutobtnOn").show();
		menuChk = 5;
		var content = "<p>지도 상에 표시된 지원시설 정보를 클릭하면 지원시설에 대한 상세한 정보를 볼 수 있습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(41);
	});	
	$("#tt_menu_7").click(function( evt ){
		$("#tt_menu_7").hide();
		$technicalBizLeftMenu.ui.setDetailStatsPanel('industry');
		$("#tt_bg_25, #tt_industry_board_1, #tt_legend_10").show();
		$("#tt_industry_btn_1").addClass("tutobtnOn").show();
		var content = "<p> 산업단지 조회 메뉴에서는 전국의 산업단지 현황을 볼 수 있습니다. <br>"
			+ "전라북도의 산업단지 현황을 알아보도록 하겠습니다.<br>"
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">POI 그룹마커를 클릭해 주세요.</strong>";
		clickEvent( evt, content );
		posiInfo(43);
	});
	$("#tt_industry_btn_1").click(function( evt ){
		$("#tt_industry_btn_1, #tt_legend_10").hide();
		$("#tt_bg_26, #tt_industry_board_2, #tt_legend_11").show();
		$("#tt_industry_btn_1").addClass("tutobtnOn").show();

			var content = "<span style=\"margin-left:5px;\">기술업종 통계지도 튜토리얼을 마치신것을 축하합니다.!</span><br>"
			+ "지도 상에 표시된 산업단지 정보를 클릭하면 산업단지에 대한 상세한 정보를 볼 수 있습니다.<br>"
			+ "<br><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '기술업종 통계지도' 로 이동합니다.)</strong>";
		clickEvent( evt, content );
		setTimeout(function() {
			location.href = "/view/technicalBiz/technicalBizMap";
		}, 10000);
		posiInfo(-1);
	});
	
	
	
	
	
	
	
	
	posiInfo(0);

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

	function clickEvent( evt, content){
		apiLogWrite2('T0', 'T06', '기술업종 통계지도 튜토리얼', '없음', '00', '없음'); 
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append(
			"<div class=\"title\">"
			+ "<p></p>"
			+ "</div>"
			+ "<div class=\"content\">"
			+ content
			+ "</p></div>");
		
		$( evt.currentTarget ).hide();
	}
	
//	posiInfo( 0 );
}

function closeTutorial() {
	$("#tuto_start_btn").show();
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
	//	setCookie("confirmMsg", "done", 365);
		location.href = "/view/technicalBiz/technicalBizMap";
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