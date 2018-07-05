// 튜토리얼
function readyTutorial() {
	var confirmMsg = confirm("지역현안 소통지도 처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n"
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
				location.href = "/view/community/intro?tutorial_mode";
			} else {
				alert("지역현안 소통지도 화면으로 돌아가겠습니다.");
				return false;
			}
		} else {
			location.href = "/view/community/intro?tutorial_mode";
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
	$(window).on('resizeEnd',function() {
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
						alert("지역현안 소통지도 화면으로 돌아가겠습니다.");
						location.href = "/view/community/intro";
					}
				}
			});
//	apiLogWrite2('', '', '지역현안 소통지도', '없음', '00', '없음'); //"(NULL)", "(NULL)", "(NULL)"
	$("#tuto_start_btn").hide();
	var posi = "";
	var width = 0;
	var height = 0;
	var tutoImg = [$("#comm_1"), $("#comm_2"), $("#comm_3"), $("#comm_4"),$("#comm_5"), 
	               $("#comm_6"), $("#comm_7"), $("#comm_8"), $("#comm_24"), $("#comm_25"),
	               $("#comm_26"), $("#comm_27"), $("#comm_28"), $("#comm_29"), $("#comm_30"),
	               $("#comm_31"), $("#comm_32")];
	var pointImg = [2,2,2,4,4,
	                4,1,1,2,4,
	                4,4,4,4,4,
	                4,4,4];
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
	var urlPath = $(location).attr('pathname') + $(location).attr('search');
	if(urlPath == '/view/community/intro?tutorial_mode'){
		$("#tutorialText").css({"height":"120px","margin":"-20px auto 0 auto"});
		$(".tutorialWrapper, #headerTutorial, #comm_0").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p><span style=\"margin-left:5px;\">지역현안 소통지도 첫 사용을 환영합니다!</span></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">통계소통지도</strong>는 지역사회 <strong style=\"color:#0040ff;  font-weight:bold;\">구성원이 직접 참여</strong>하여 지역현안 해결을 위해<br>"
				+ "생활하는 <strong style=\"color:#0040ff;  font-weight:bold;\">지역의 소소한 이야기를 지도에 그려보는 서비스</strong>입니다.<br>"
				+ "손가락이 가리키는 곳을 따라가며 설명을 시작하겠습니다."
				+ "</p></div>");
		$("#toPoint_2").css({"top":"390px","left":"-70px"});
		$("#toPoint_2").show();
		tPoint_2();
		function tPoint_2() {
			$("#toPoint_2").animate({
				top : 390,
				left : -70
			}, 500, "", function() {
				$(this).animate({
					top : 390,
					left : -80
				}, 500, "", function() {
					tPoint_2();
				});
			});
		}
		$("#comm_0").click(function(){
			$("comm_0").hide();
			location.href="/jsp/board/communityMapViewTutorial1.jsp?tutorial_mode";
		});
	}else if(urlPath == '/jsp/board/communityMapViewTutorial1.jsp?tutorial_mode'){
		if($(window).height()<=768){
			$(".tutorialWrapper, #headerTutorial, #comm_1, #comm_bg1, #comm_bg1_1").show();
			$("#comm_1").css("top","528px");
		}else{
			$(".tutorialWrapper, #headerTutorial, #comm_1, #comm_bg1").show();			
			$("#comm_1").css("top","630px");
		}
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>선택한 소통지도가 보이고 <strong style=\"color:#0040ff;  font-weight:bold;\">등록된 자료들이 지도에 표시</strong>가 되어있는 걸 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘등록자료’</strong>를 클릭해 주세요.</p></div>");
			posiInfo(0);
//		fullMode(document.documentElement);	
		$("#comm_1").click(function(){
			$("#comm_1").hide();
			$("#comm_2, #comm_bg2").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>전체등록자료가 왼쪽에 리스트로 보이고 지도에 위치가 표시됩니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘데이터보드’</strong> 메뉴를 클릭해 주세요.</p></div>");
			posiInfo(1);
		});
		$("#comm_2").click(function(){
			$("#comm_2").hide();
			$("#comm_3, #comm_bg3").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">‘데이터보드’</strong>에서는 "
					+ "<strong style=\"color:#0040ff;  font-weight:bold;\">‘소통지도 의견’ </strong>"
					+ "통계를 보여주며 <strong style=\"color:#0040ff;  font-weight:bold;\">각종 차트 및 표로 통계를 확인</strong>할 수<br>"
					+ "있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘모든데이터표’</strong>를 클릭해 주세요. </p></div>");
			posiInfo(2);
		});
		$("#comm_3").click(function(){
			$("#comm_3").hide();
			$("#comm_4, #comm_bg4").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지도에 표시된 별모양 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘아이콘’을 선택해 주세요</strong></p></div>");
			posiInfo(3);
		});
		$("#comm_4").click(function(){
			$("#comm_4").hide();
			$("#comm_5, #comm_bg5").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>선택한 아이콘에 대한 정보가 표시됩니다</br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘상세보기’</strong>를 클릭해 주세요.</p></div>");
			posiInfo(4);
		});
		$("#comm_5").click(function(){
			$("#comm_5, #comm_bg2, #comm_bg5").hide();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>등록된 자료의 <strong style=\"color:#0040ff;  font-weight:bold;\">상세정보를 조회</strong> 할 수 있습니다.<br>"
					+ "다른 사진도 볼 수 있도록 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘사진’</strong>을 클릭해 주세요 </p></div>");
			$("#comm_6, #comm_bg6").show();
			posiInfo(5);
		});
		$("#comm_6").click(function(){
			$("#comm_6, #comm_bg6").hide();
			$("#comm_7, #comm_bg7").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">상세보기를 닫아주세요.</strong></p></div>");
			posiInfo(6);
		});
		$("#comm_7").click(function(){
			$("#comm_7, #comm_bg7").hide();
			$("#comm_8, #comm_bg8").show();
			$("#tutorialText").css("height","100px");
			$("#tuto_end_btn").css("top","70px");
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">첫 화면</strong>으로 돌아갑니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">홈 버튼을 눌러주세요.</strong></p></div>");
			posiInfo(7);
		});
		$("#comm_8").click(function(){
			$("#comm_8").hide();
			posiInfo(-1);
			location.href = '/view/community/intro?tutorial_mode_2';
		});	
	}else if(urlPath == '/view/community/intro?tutorial_mode_2'){
		$("#tutorialText").css({"height":"120px","margin":"-20px auto 0 auto"});
		$(".tutorialWrapper, #headerTutorial, #comm_9").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>다음으로 직접 <strong style=\"color:#0040ff;  font-weight:bold;\">통계소통지도</strong>를 만들어 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘통계소통지도 만들기’</strong> 메뉴를 선택해 주세요.</p></div>");
		setTimeout(function() {
			$("#toPoint_2").show();
		}, 1000);		
		tPoint_1();
		function tPoint_1() {
			$("#toPoint_2").animate({
				top : 220,
				left : 690
			}, 500, "", function() {
				$(this).animate({
					top : 220,
					left : 700
				}, 500, "", function() {
					tPoint_1();
				});
			});
		}
		$("#comm_9").click(function(){
			$("#comm_9").hide();
			location.href = "/jsp/board/communityMapFormTutorial.jsp?tutorial_mode";
		});
	}else if(urlPath == '/jsp/board/communityMapFormTutorial.jsp?tutorial_mode'){
		$("#tutorialText").css({"height":"100px","margin":"-20px auto 0 auto"});
		var body_Height =$("body").height();
		$(".tutorialWrapper").css("height",body_Height);
		$("#toPoint_2").hide();
		$(".tutorialWrapper, #headerTutorial, #comm_10").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">통계소통지도 개설</strong>은 개설 기본정보, 배경통계 만들기 2단계로 진행됩니다.<br>"
				+ "개설 기본정보부터 등록하겠습니다. "
				+ "<strong style=\"color:#0040ff;  font-weight:bold;\">대표사진</strong>을 설정할 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘샘플 이미지’</strong>를 선택해 주세요.</p></div>");
		tPointAct(1, true);
	
		$("#comm_10").click(function(){
			$("#fileSearch").val(null);
			$("#imageView").css({"background-image":$(".SampleImg>li:eq(0) a").css("background-image")});
			$("input[name=fileSearchSample]").val($(this).data("id"));
			$("#filePathField").val("샘플 이미지.png");
			$("#main-image-sample>li").removeClass("M_on");
			$(this).parent("li").addClass("M_on");
			$("#comm_10").hide();
			$("#comm_11").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘맵이름’</strong>을 클릭해 주세요.</p></div>");
			tPointAct(2, true);
		});
		$("#comm_11").click(function(){
			$("#comm_11").hide();
			$("#comm_12").show();
			$("#cmmnty_map_nm").val("서울시 송파구 쇼핑정보");
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">지역설정</strong>을 통해 소통지도의"
					+ "<strong style=\"color:#0040ff;  font-weight:bold;\">초기화면에 보이는 지역</strong>을 설정할 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘시도 지역’</strong>을 클릭해 주세요.</p></div>");
			tPointAct(3, true);
		});
		$("#comm_12").click(function(){
			$("#comm_12").hide();
			$("#comm_13").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'서울특별시'</strong>를 클릭해 주세요.</p></div>");
			tPointAct(3, true);
		});
		$("#comm_13").click(function(){
			$("#comm_13").hide();
			$("#comm_14").show();
			$("#sidoSelect>option:eq(0)").text("서울특별시");
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'시군구 지역'</strong>을 클릭해 주세요.</p></div>");
			tPointAct(4, true);
		});
		$("#comm_14").click(function(){
			$("#comm_14").hide();
			$("#comm_15").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'송파구'</strong>를 클릭해 주세요.</p></div>");
			$("#toPoint_2").show();
			tPointAct(4, true);
		});
		$("#comm_15").click(function(){
			$("#toPoint_2").hide();
			$("#comm_15").hide();
			$("#sggSelect>option:eq(0)").text("송파구");
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a; font-size:13px; font-weight:bold;\">의견등록 참여방법</strong>을 선택할 수 있습니다."
					+ "<strong style=\"color:#0040ff; font-size:13px; font-weight:bold;\">'모든 사용자 의견 등록 가능'</strong>은 로그인 없이도 누구나<br>"
					+ "익명으로 간단히 의견/댓글을 달 수 있는 지도를 만드는 것입니다."
					+ "<strong style=\"color:#0040ff; font-size:13px; font-weight:bold;\">'로그인 사용자 의견등록 가능'</strong>은 로그인을 한 사용자에 한해 누구나 의견/댓글을 달 수 있는 기능입니다.<br>"
					+ "<div class=\"button\" id=\"next\" style=\"left:10px; top:-6px;\">"
					+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
					+ "</div>");
			//$(".button").css("bottom","3px");
			$("body").on("click",".button",	function() {
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff; font-size:13px; font-weight:bold;\">'승인된 사용자 의견등록 가능'</strong>은 통계지도 관리자가 지정한 사람만 의견/댓글을 달 수 있는 기능입니다."
					+ "사전에 비밀번호를 설정해 비밀번호를 아는 사람만 의견을 등록하게 하거나, 개설자가 특정 id와 비밀번호를 지정하여 참여하게 하는 방법이 있습니다.<br>"
					+ "<div class=\"button1\" id=\"next\" style=\"left:10px; top:-6px;\">"
					+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
					+ "</div>");
			});
			$("body").on("click",".button1",function() {
				$("#comm_16").show();
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>혹은 통계지도 참여를 신청한 회원에 대해 개설자가 승인/거부 할 수도 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘모든 사용자 의견등록 가능’</strong>을 선택해 주세요.</p></div>");
				tPointAct(5, true);
			});
		});
		$("#comm_16").click(function(){
			$("#comm_16, #headerTutorial").hide();
			$("#comm_17, #comm_bg9, #headerTutorial2").show();			
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText2").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>다음 단계로 <strong style=\"color:#0040ff;  font-weight:bold;\">‘배경통계 만들기’</strong> 입니다.<br>"
					+ "소통지도 주제와 <strong style=\"color:#0040ff;  font-weight:bold;\">관련된 통계를 추가</strong>할 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">스크롤을 아래로 </strong>내린 다음 추천통계의 <strong style=\"color:#ee7c1a;  font-weight:bold;\">‘총인구’</strong>를 선택해 주세요.</p></div>");
			tPointAct(6, true);
		});
		$("#comm_17").click(function(){
			$("#comm_17, #comm_bg9").hide();
			$("#comm_18, #comm_bg10").show();
			$("#tutorialText2 .title, #tutorialText2 .content, #tutorialText2 #next").empty();
			$("#tutorialText2").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지도에 <strong style=\"color:#0040ff;  font-weight:bold;\">총인구 통계가 추가</strong>되는 것을 볼 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘총인구’</strong>를 다시 선택을 해제하여 주세요.</p></div>");
			tPointAct(6, true);
		});
		$("#comm_18").click(function(){
			$("#comm_18, #comm_bg10").hide();
			$("#comm_19, #comm_bg11").show();
			$("#tutorialText2 .title, #tutorialText2 .content, #tutorialText2 #next").empty();
			$("#tutorialText2").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>내가 <strong style=\"color:#0040ff;  font-weight:bold;\">즐겨찾기에 등록한 통계도 추가</strong>할 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘슈퍼마켓 사업체수’</strong>를 선택해 주세요.</p></div>");
			tPointAct(7, true);
		});
		$("#comm_19").click(function(){
			$("#comm_19, #comm_bg11").hide();
			$("#comm_20, #comm_bg12").show();
			$("#tutorialText2 .title, #tutorialText2 .content, #tutorialText2 #next").empty();
			$("#tutorialText2").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지도에 <strong style=\"color:#0040ff;  font-weight:bold;\">선택한 통계가 추가</strong>되는 것을 볼 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘슈퍼마켓 사업체수’</strong>를 다시 선택을 해제하여 주세요.</p></div>");
			tPointAct(7, true);
		});
		$("#comm_20").click(function(){
			$("#comm_20, #comm_bg12").hide();
			$("#comm_21, #comm_bg13").show();
			$("#tutorialText2 .title, #tutorialText2 .content, #tutorialText2 #next").empty();
			$("#tutorialText2").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">나의데이터도 추가</strong>가 가능합니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘나의데이터’</strong> 탭을 클릭해 주세요.</p></div>");
			tPointAct(8, true);
		});
		$("#comm_21").click(function(){
			$("#comm_21").hide();
			$("#comm_22").show();
			$("#poi-tab>li").removeClass("M_on");
			$("#poi-tab a:eq(1)").parent("li").addClass("M_on");
			$("#mydata-list,#theme-list").hide();
			$("#mydata-list").show();
			$("#tutorialText2 .title, #tutorialText2 .content, #tutorialText2 #next").empty();
			$("#tutorialText2").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘서울시 전통시장’</strong>을 선택해 주세요.</p></div>");
			tPointAct(9, true);
		});
		$("#comm_22").click(function(){
			$("#mydata-list #history-row-0").attr("checked",true);
			$("#comm_22, #comm_bg13").hide();
			$("#comm_23, #comm_bg14").show();
			var li = $("<li/>",{"data-type":"mydata"}).append(
					$("<button/>",{"type":"button","class":"delete","title":"삭제"}),
					$("<span/>",{"text":"나의데이터","style":"position: relative;font-size: 8px;color: #fff;border-radius: 5px;padding: 2px 5px;margin-right: 5px; background: #c2c851;border: #ada65b solid 1px"}),
					$("<span/>",{"text":"서울시 전통시장","style":"position: relative;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;vertical-align: middle; width: 123px;"})
				);
			$("#select-list").append(li);
			$("#tutorialText2 .title, #tutorialText2 .content, #tutorialText2 #next").empty();
			$("#tutorialText2").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지도에 <strong style=\"color:#0040ff;  font-weight:bold;\">선택한 통계가 추가</strong>되는 것을 볼 수 있습니다.<br>"
					+ "<strong style=\"color:#0040ff;  font-weight:bold;\">통계소통지도 만들기가 완료</strong>되었습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘개설완료’</strong>를 선택해주세요.</p></div>");
			tPointAct(10, true);			
		});
		$("#comm_23").click(function(){
			$("#toPoint_2, #comm_23, #comm_bg14").hide();
			location.href = "/jsp/board/communityMapViewTutorial2.jsp?tutorial_mode";
		});
	}else if(urlPath == '/jsp/board/communityMapViewTutorial2.jsp?tutorial_mode'){
		$(".tutorialWrapper, #headerTutorial, #comm_24").show();
		$("#headerTutorial2").hide();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>통계소통지도안에서 <strong style=\"color:#0040ff;  font-weight:bold;\">소통하는 방법</strong>을 알아보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘의견등록하기’</strong> 버튼을 클릭해 주세요.</p></div>");
		posiInfo(8);
		
		$("#comm_24").click(function(){
			$("#comm_24").hide();
			$("#comm_bg16, #comm_25").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘제목’</strong>을 선택해 주세요.</p></div>");
			posiInfo(9);
		});
		$("#comm_25").click(function(){
			$("#comm_25").hide();
			$("#comm_26, #comm_bg17").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘위치선택’</strong>을 클릭해 주세요.</p></div>");
			posiInfo(10);
		});
		$("#comm_26").click(function(){
			$("#comm_26").hide();
			$("#comm_27").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">지도에 위치를 선택해 주세요.</strong></p></div>");
			posiInfo(11);
		});
		$("#comm_27").click(function(){
			$("#comm_27").hide();
			$("#comm_28, #comm_bg18, #comm_bg19").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘의견’</strong>을 선택해 주세요.</p></div>");
			posiInfo(12);
		});
		$("#comm_28").click(function(){
			$("#comm_28").hide();
			$("#comm_29, #comm_bg20").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">입력이 완료</strong> 되었습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘등록완료’</strong> 버튼을 눌러주세요.</p></div>");
			posiInfo(13);
		});
		$("#comm_29").click(function(){
			$("#comm_29, #comm_bg16, #comm_bg17, #comm_bg18, #comm_bg19, #comm_bg20").hide();
			$("#comm_30, #comm_bg21, #comm_bg22").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>등록된 의견에 <strong style=\"color:#ee7c1a;  font-weight:bold;\">댓글등록</strong>을 해보겠습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘상세보기’</strong>를 클릭해 주세요.</p></div>");
			posiInfo(14);
		});
		$("#comm_30").click(function(){
			$("#comm_30, #comm_bg15, #comm_bg21, #comm_bg22").hide();
			$("#comm_31, #comm_bg23, #comm_bg26").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘댓글’</strong>을 클릭해 주세요.</p></div>");
			posiInfo(15);
		});
		$("#comm_31").click(function(){
			$("#comm_31").hide();
			$("#comm_32, #comm_bg24").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">‘댓글등록’</strong> 버튼을 클릭해 주세요.</p></div>");
			posiInfo(16);
		});
		$("#comm_32").click(function(){
			$("#comm_32, #comm_bg23, #comm_bg24, #comm_bg15").hide();
			$("#comm_bg25").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p><span style=\"margin-left:5px;\">지역현안 소통지도 튜토리얼을 마치신것을 축하합니다.!</span></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '지역현안 소통지도' 으로 이동합니다.)</p></div>");
			posiInfo(-1);
			setTimeout(function() {
				location.href = "/view/community/intro";
			}, 10000);
		});
	}
}

function closeTutorial() {
	$("#tuto_start_btn").show();
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
	//	setCookie("confirmMsg", "done", 365);
		location.href = "/view/community/intro";
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

function tPointAct(i, clicked){
	if(clicked){
		$("#toPoint_2").hide();
		$("#toPoint_2").clearQueue().stop();
		
		switch(i){
		case 1:
			$("#toPoint_2").css({"top":"570px","left":"-60px"});
			break;
		case 2:
			$("#toPoint_2").css({"top":"250px","left":"320px"});
			break;
		case 3:
			$("#toPoint_2").css({"top":"345px","left":"320px"});
			break;
		case 4:
			$("#toPoint_2").css({"top":"345px","left":"445px"});
			break;
		case 5:
			$("#toPoint_2").css({"top":"470px","left":"320px"});
			break;
		case 6:
			$("#toPoint_2").css({"top":"915px","left":"-60px"});
			break;
		case 7:
			$("#toPoint_2").css({"top":"1015px","left":"-60px"});
			break;
		case 8:
			$("#toPoint_2").css({"top":"1220px","left":"60px"});
			break;
		case 9:
			$("#toPoint_2").css({"top":"1260px","left":"-60px"});
			break;
		case 10:
			$("#toPoint_2").css({"top":"1695px","left":"340px"});
			break;
		}
	}
		switch(i){
		case 1:
			$("#toPoint_2").animate({
				top : 570,
				left : -60
			}, 500, "", function() {
				$(this).animate({
					top : 570,
					left : -70
				}, 500, "", function() {
					tPointAct(1, false);
				});
			});
			break;
		case 2:
			$("#toPoint_2").animate({
				top : 250,
				left : 320
			}, 500, "", function() {
				$(this).animate({
					top : 250,
					left : 330
				}, 500, "", function() {
					tPointAct(2, false);
				});
			});
			break;
		case 3:
			$("#toPoint_2").animate({
				top : 345,
				left : 320
			}, 500, "", function() {
				$(this).animate({
					top : 345,
					left : 330
				}, 500, "", function() {
					tPointAct(3, false);
				});
			});
			break;
		case 4:
			$("#toPoint_2").animate({
				top : 345,
				left : 445
			}, 500, "", function() {
				$(this).animate({
					top : 345,
					left : 455
				}, 500, "", function() {
					tPointAct(4, false);
				});
			});
			break;
		case 5:
			$("#toPoint_2").animate({
				top : 470,
				left : 320
			}, 500, "", function() {
				$(this).animate({
					top : 470,
					left : 330
				}, 500, "", function() {
					tPointAct(5, false);
				});
			});
			break;
		case 6:
			$("#toPoint_2").animate({
				top : 915,
				left : -60
			}, 500, "", function() {
				$(this).animate({
					top : 915,
					left : -70
				}, 500, "", function() {
					tPointAct(6, false);
				});
			});
			break;
		case 7:
			$("#toPoint_2").animate({
				top : 1015,
				left : -60
			}, 500, "", function() {
				$(this).animate({
					top : 1015,
					left : -70
				}, 500, "", function() {
					tPointAct(7, false);
				});
			});
			break;
		case 8:
			$("#toPoint_2").animate({
				top : 1220,
				left : 60
			}, 500, "", function() {
				$(this).animate({
					top : 1220,
					left : 70
				}, 500, "", function() {
					tPointAct(8, false);
				});
			});
			break;
		case 9:
			$("#toPoint_2").animate({
				top : 1260,
				left : -60
			}, 500, "", function() {
				$(this).animate({
					top : 1260,
					left : -70
				}, 500, "", function() {
					tPointAct(9, false);
				});
			});
			break;
		case 10:
			$("#toPoint_2").animate({
				top : 1695,
				left : 340
			}, 500, "", function() {
				$(this).animate({
					top : 1695,
					left : 350
				}, 500, "", function() {
					tPointAct(10, false);
				});
			});
			break;
		}
		if(clicked){
			$("#toPoint_2").show();
		}
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