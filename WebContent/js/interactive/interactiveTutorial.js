// 튜토리얼
function readyTutorial() {
	var confirmMsg = confirm("대화형 통계지도 처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n"
			+ "진행하시겠습니까?");
	if (confirmMsg == 1) {
		// setCookie("confirmMsg", "done", 365);
		var iWidth = $(window).width();
		var iHeight = $(window).height();
		if (iWidth > 1920 || iHeight > 1080) {
			var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
					+ "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n" + "그래도 실행 하시겠습니까?");
			if (warnMsg == 1) {
				$(".tutorialWrapper").show();
				location.href = "/view/map/interactiveMap?tutorial_mode";
			} else {
				alert("대화형 통계지도 화면으로 돌아가겠습니다.");
				return false;
			}
		} else {
			location.href = "/view/map/interactiveMap?tutorial_mode";
		}
	} else {
		// setCookie("confirmMsg", "done", 365);
		return false;
	}
}

function startTutorial() {
	$(".tb_right, #interactive_magni").hide();
	// var board_height_ = $("#dataBoardImgDiv").height();
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
						alert("대화형 통계지도 화면으로 돌아가겠습니다.");
						location.href = "/view/map/interactiveMap";
					}
				}
			});
	// 2017.04.05 튜토리얼apiLogWrite 추가
	tutorial_log();
	$("#tuto_start_btn").hide();
	var addrChk = 0;
	var okChk = 0;
	var zoomOutChk = 0;
	var dbChk = 0;
	var showdbChk = 0;
	var closedbChk = 0;
	var cleanChk = 0;
	var poiBtnChk = 0;
	$(".tutorialWrapper").show();
	$(".step01").css("left", 0);
	/*
	 * if($(window).height()>=1080||$(window).width()>=1920){
	 * $("#tuto_end_btn").css("left", -4); }else{
	 * $("#tuto_end_btn").css("right", 363); }
	 */
	$("#mainIndexImg").show();
	$("#headerTutorial").show();
	$("#tutorialText")
			.append(
					"<div class=\"title\">"
							+ "<p><span style=\"margin-left:5px;\">대화형 통계지도 첫 사용을 환영합니다!</span></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">대화형 통계지도 통계조건과 지역을 선택</strong>하면 "
							+ "<strong style=\"color:#0040ff;  font-weight:bold;\">통계지도</strong>를 "
							+ "보여주는 서비스입니다.</br>손가락이 가리키는 곳을 잘 따라가 보면서 설명을 시작하도록 하겠습니다.<br>"
							+ "</p></div>"
							+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:11px;\">"
							+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>"
							+ "</div>");

	$(".button")
			.click(
					function() {
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>기본적인 사용법 설명을 위해 <strong style=\"color:#0040ff;  font-weight:bold;\">대전 서구지역의 총인구</strong> "
												+ "를 검색해 보겠습니다.<br>"
												+ "먼저 통계메뉴에서 "
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'총조사 주요지표'</strong>를 "
												+ "선택해 주세요.<br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'총조사 주요지표'</strong>는 "
												+ "각 총조사 결과 중 이용자가 주료 이용하는 지표를 정리해 놓은 메뉴입니다."
												+ "</p></div>");
					});

	var posi = "";
	var width = 0;
	var height = 0;

	var tutoImg = [ $("#mainIndexImg"), $("#ptotalImg"), $("#searchImg"),
			$("#addrSearchImg"), $("#okImg"), $("#zoomInImg"),
			$("#dragItemImg"), $("#zoomOutImg"), $("#dataBoardImg"),
			$("#dataBoardPyoImg"), $("#showDataImg"), $("#dataBoardCloseImg"),
			$("#greenLegendImg"), $("#legendOptionImg"), $("#legendTypeImg"),
			$("#legendTypeBubbleImg"), $("#cleanImg"), $("#addrSearchImg"),
			$("#okImg"), $("#zoomOutImg"), $("#zoomOutImg"), $("#mainMenuImg"),
			$("#companyBtnImg"), $("#themaListImg"), $("#themaRestaurantImg"),
			$("#themaCafeImg"), $("#themaButtonImg"), $("#dragItemImg2"),
			$("#dataBoardImg"), $("#showDataImg"), $("#dataBoardCloseImg"),
			$("#poiButtonImg"), $("#poiRestaurantImg"),
			$("#poiSubmenuCafeImg"), $("#poiGroupMarkerImg"),
			$("#poiCleanImg"), $("#poiButtonOnImg"), $("#cleanImg") ];
	var pointImg = [ 1, 1, 3, 4, 4, 2, 4, 2, 2, 2, 2, 2, 4, 3, 3, 3, 2, 4, 4,
			2, 2, 4, 1, 1, 3, 4, 3, 4, 2, 2, 2, 2, 3, 4, 4, 1, 2, 1 ];

	function posiInfo(i) {
		$interactiveMap.ui.tutoIndex = i;

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
			$("#zoomMapImgDiv").css("width", $(window).width());
			// var board_re_height_ = $("#dataBoardImgDiv").height();
			// if (board_re_height_ > board_height_) {
			// $("#dataBoardImgDiv").css("height", board_height_);
			// } else {
			// $("#dataBoardImgDiv").css("height", $(window).height());
			// }
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
			posiInfo($interactiveMap.ui.tutoIndex);
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

	$("#mainIndexImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'총인구'</strong>를 선택하세요. "
												+ "</p></div>");
						$("#mainIndexImg").hide();
						$("#mainIndexBtn").addClass("on");
						$interactiveLeftMenu.ui
								.setDetailStatsPanel("mainIndex");
						$("#ptotalImg").show();
						posiInfo(1);
					});
	$("#ptotalImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'검색조건 생성'</strong> 버튼을 눌러주세요. "
												+ "</p></div>");
						$("#ptotalImg").hide();
						$("#searchImg").show();
						posiInfo(2);
					});
	$("#searchImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>선택항목 메뉴에 방금 선택한 <strong style=\"color:#0040ff; ;  font-weight:bold;\">통계조건</strong>이 올라와 있는 걸 볼 수 있습니다.<br>"
												+ "다음으로 <strong style=\"color:#ee7c1a;  font-weight:bold;\">지역</strong>을 선택하겠습니다. "
												+ "</p></div>");
						$("#mainIndexBtn").removeClass("on");
						$("#searchImg").hide();
						$(".step01").css("left", -280);
						$("#quickBox_2depth").css("left", -1120);
						$(".step03").css("left", -280);
						$("#map_left_btn").removeClass("on");
						$("#map_left_btn").css({
							"left" : "0",
							"width" : "90"
						});
						$("#map_left_btn>span").css("display", "inline");
						$("#dragItemListImg").show();
						addrChk = 1;
						$("#addrSearchImg").css("border-style", "outset");
						$("#addrSearchImg").css("cursor", "pointer");
						$("#addrSearchImg").css("border-width", 3);
						$("#addrSearchImg").css("border-color", "red");
						$("#addrSearchImg").show();
						posiInfo(3);
					});
	$("#addrSearchImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>지역표시 메뉴에서 <strong style=\"color:#ee7c1a;  font-weight:bold;\">대전광역시 전체를 선택 후 확인</strong>을 눌러주세요. "
												+ "</p></div>");
						if (addrChk == 1) {
							$("#addrChoiceImg").show();
							okChk = 1;
							$("#okImg").show();
							$("#addrSearchImg").css("border", 0);
							$("#addrSearchImg").css("margin", 3);
							$("#dragItemListImg").show();
							posiInfo(4);
						}
					});
	$("#okImg")
			.click(
					function() {
						if (okChk == 1) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">대전광역시 경계</strong>가 보입니다.<br> "
													+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">지도를 조금더 확대</strong>하여 "
													+ "<strong style=\"color:#0040ff;  font-weight:bold;\">대전광역시 서구 경계</strong>가 보이게 해주세요."
													+ "</p></div>");
							$("#dragItemListImg").hide();
							$("#addrChoiceImg").hide();
							$("#addrSearchImg").hide();
							$("#okImg").hide();
							$(".tb_right").hide();
							$("#redLegendInfo1").show();
							$("#rightControlImg").show();
							$("#zoomMapImgDiv").show();
							$("#zoomMapImgDiv").css("height",
									$(window).height());
							$("#zoomMapImgDiv").css("width", $(window).width());
							$("#zoomInImg").show();
							posiInfo(5);
						}
					});
	$("#zoomInImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>왼쪽 아래에 <strong style=\"color:#0040ff;  font-weight:bold;\">대전광역시 서구 경계</strong>입니다.<br> "
												+ "이제 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'선택항목'의 총인구 버튼을 끌어서 서구 경계 위로 가져다 놓아 보세요.</strong><br><br>"
												+ "<strong style=\"color:#ff0040;  font-weight:bold;\">(드래그앤드랍을 이용하세요!)</strong>"
												+ "</p></div>");
						$("#dropMapZone").show();
						$("#zoomMapImgDiv").hide();
						$("#zoomInImg").hide();
						$("#zoomInMapImg").show();
						$("#dragItemImg").show();
						$("#dropMap").show();
						$("#toPoint_3_3").css({
							"top" : 300,
							"left" : 950
						});
						$("#toPoint_3_3").show();
						posiInfo(6);
						$("#dragItemImg").draggable({
							helper : "clone"
						});
						$("#dropMapZone")
								.droppable(
										{
											accept : "#dragItemImg",
											drop : function(e) {
												tutorial_log();
												$(
														"#tutorialText .title, #tutorialText .content, #tutorialText #next")
														.empty();
												$("#tutorialText")
														.append(
																"<div class=\"title\">"
																		+ "<p></p>"
																		+ "</div>"
																		+ "<div class=\"content\">"
																		+ "<p>대전광역시 서구 총인구 검색결과가 <strong style=\"color:#0040ff;  font-weight:bold;\">색채지도</strong>로 보입니다.<br>"
																		+ "검색된 색채지도의 각 지역에 마우스를 올리면 해당 지역의 통계치가 툴팁으로 나타납니다.<br>"
																		+ "다음 지역에 마우스를 올려 보세요.(서구 관저동) 지도경계안의 총인구 값이 보입니다.<br> "
																		+ "이제 <strong style=\"color:#ee7c1a;  font-weight:bold;\">우측의 확대 축소 버튼</strong>을 사용하여 지도의 크기를 조정할 수도 있습니다.<br>"
																		+ "지도를 축소하여 한 화면에 보이게 해 주세요."
																		+ "</p></div>");
												$("#toPoint_3_3").hide();
												$("#zoomInMapImg").hide();
												$("#dragItemImg").hide();
												$("#dropMap").hide();
												$("#dropMapZone").hide();
												$("#redLegendInfo1").hide();
												$("#redLegendInfo2").show();
												$("#zoomMapImg2").show();
												zoomOutChk = 1;
												$("#zoomOutImg").show();
												$("#zoomMapInfoImg").show();
												$("#toPoint_2_2").css({
													"top" : 400,
													"left" : 628
												});
												$("#toPoint_2_2").show();
												posiInfo(7);
											}
										});
					});
	$("#zoomMapInfoImg").mouseover(function() {
		$("#MouseoverImg").show();
	});
	$("#zoomMapInfoImg").mouseout(function() {
		$("#MouseoverImg").hide();
	});
	$("#zoomOutImg")
			.click(
					function() {
						if (zoomOutChk == 1) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>검색 결과에 대한 요약 데이터를 <strong style=\"color:#0040ff;  font-weight:bold;\">'데이터보드'</strong>에서 볼 수 있습니다.<br>"
													+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'데이터보드'</strong> 메뉴를 클릭해 주세요."
													+ "</p></div>");
							$("#toPoint_2_2").hide();
							$("#zoomMapInfoImg").hide();
							$("#zoomMapImg2").hide();
							$("#zoomOutImg").hide();
							$("#zoomOutMapImg").show();
							dbChk = 1;
							$("#dataBoardImg").show();
							posiInfo(8);
						}
					});
	$("#dataBoardImg")
			.click(
					function() {
						if (dbChk == 1) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">대전광역시 서구 내의 각 동의 총인구 자료가 그래프로 나타난것을 볼 수 있습니다.</strong><br>"
													+ "좀 더 정확한 수치를 원하신다면 그래프 위의 토글 버튼에서 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'표'</strong>를 눌러 주세요."
													+ "</p></div>");
							$("#dataBoardImg").hide();
							$("#dataBoardDetailImg").show();
							$("#dataBoardPyoImg").show();
							posiInfo(9);
						}
					});
	$("#dataBoardPyoImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'데이터보드'에서는 '데이터 보기' 외에도 다양한 정보를 제공합니다.</strong><br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'데이터 보기'</strong> 메뉴를 닫아 주세요."
												+ "</p></div>");
						$("#dataBoardDetailImg").hide();
						$("#dataBoardPyoImg").hide();
						$("#dataBoardPyoDetailImg").show();
						showdbChk = 1;
						$("#showDataImg").show();
						posiInfo(10);
					});
	$("#showDataImg")
			.click(
					function() {
						if (showdbChk == 1) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'시계열 조회' 메뉴에서는 과거년도 데이터를 볼 수 있습니다.</strong><br>"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">시계열 선택을 하지 않을 시에는 기본적으로 가장 최신 년도 데이터를 표시합니다.</strong><br>"
													+ "이제 다른 기능을 보겠습니다.<br>"
													+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'데이터보드'를 닫아주세요.</strong>"
													+ "</p></div>");
							$("#dataBoardPyoDetailImg").hide();
							$("#showDataImg").hide();
							$("#dataBoardYearImg").show();
							closedbChk = 1;
							$("#dataBoardCloseImg").show();
							posiInfo(11);
						}
					});
	$("#dataBoardCloseImg")
			.click(
					function() {
						if (closedbChk == 1) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">화면 좌측 하단의 범례 창에서 통계지도의 시각화와 다양한 설정을 할 수 있습니다.</strong><br>"
													+ "<p>범례창 우측의 색상표를 클릭해서 통계지도 색상을 변경할 수 있습니다.<br>"
													+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">초록색 동그라미</strong>를 클릭해서 지도의 색상을 바꿔 보겠습니다."
													+ "</p></div>");
							$("#dataBoardYearImg").hide();
							$("#dataBoardCloseImg").hide();
							$("#greenLegendImg").show();
							posiInfo(12);
						}
					});
	$("#greenLegendImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>지도의 형태 자체를 바꿀 수도 있습니다.<br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'범례 환경설정'</strong> 버튼을 클릭하면 다양한 설정이 있습니다."
												+ "</p></div>");
						$("#zoomOutMapImg").hide();
						$("#redLegendInfo2").hide();
						$("#greenLegendImg").hide();
						$("#greenLegendMapImg").show();
						$("#legendOptionImg").show();
						$("#greenLegendInfo1").show();
						posiInfo(13);
					});
	$("#legendOptionImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>설정버튼에서 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'타입설정'</strong>을 눌러주세요."
												+ "</p></div>");
						$("#legendOptionImg").hide();
						$("#greenLegendInfo1").hide();
						$("#legendTypeImg").show();
						$("#bottomControlImg1").show();
						posiInfo(14);
					});
	$("#legendTypeImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'버블지도'</strong>를 선택해 주세요."
												+ "</p></div>");
						$("#bottomControlImg1").hide();
						$("#legendTypeImg").hide();
						$("#bottomControlImg2").show();
						$("#legendTypeBubbleImg").show();
						posiInfo(15);
					});
	$("#legendTypeBubbleImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'버블지도'</strong>는 각 지역의 통계값의 크기에 따라 버블의 크기와 색상이 달라집니다.<br>"
												+ "이외에도 열지도와 점지도 등 다양한 시각화 방식을 선택할 수 있습니다.<br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">지도를 초기화해보겠습니다.</strong>"
												+ "</p></div>");
						$("#bottomControlImg2").hide();
						$("#greenLegendMapImg").hide();
						$("#legendTypeBubbleImg").hide();
						$("#greenLegendInfo2").show();
						$("#legendBubbleMapImg").show();
						cleanChk = 1;
						$("#cleanImg").show();
						posiInfo(16);
					});
	$("#cleanImg")
			.click(
					function() {
						if (cleanChk == 1) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>이제 다른 통계 메뉴를 살펴보기 위해 <strong style=\"color:#ee7c1a;  font-weight:bold;\">지역을 이동합니다.</strong>"
													+ "</p></div>");
							$("#legendBubbleMapImg").hide();
							$("#cleanImg").hide();
							$("#greenLegendInfo2").hide();
							$("#cleanMapImg").show();
							$("#redLegendInfo1").show();
							addrChk = 2;
							$("#addrSearchImg").css("margin", 0);
							$("#addrSearchImg").css("border-style", "outset");
							$("#addrSearchImg").css("cursor", "pointer");
							$("#addrSearchImg").css("border-width", 3);
							$("#addrSearchImg").css("border-color", "red");
							$("#addrSearchImg").show();
							posiInfo(17);
						}
					});
	$("#addrSearchImg")
			.click(
					function() {
						if (addrChk == 2) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">대전광역시 서구 둔산 2동으로 이동해 주세요.</strong>"
													+ "</p></div>");
							$("#addrSearchImg").css("border", 0);
							$("#addrSearchImg").css("margin", 3);
							$("#addrChoice2Img").show();
							okChk = 2;
							$("#okImg").show();
							posiInfo(18);
						}
					});
	$("#okImg")
			.click(
					function() {
						if (okChk == 2) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>지도를 보기 좋게 하기 위해서 <strong style=\"color:#ee7c1a;  font-weight:bold;\">지도를 축소 해주세요.</strong>."
													+ "</p></div>");
							$("#addrSearchImg").hide();
							$("#addrChoice2Img").hide();
							$("#okImg").hide();
							$("#cleanMapImg").hide();
							$("#zoomMapImg3").show();
							zoomOutChk = 2;
							$("#zoomOutImg").show();
							posiInfo(19);
						}
					});
	$("#zoomOutImg")
			.click(
					function() {
						if (zoomOutChk == 2) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">한번 더 지도를 축소 해주세요.</strong>."
													+ "</p></div>");
							$("#zoomMapImg3").hide();
							$("#zoomOutMap2Img").show();
							zoomOutChk = 3;
							posiInfo(20);
						} else if (zoomOutChk == 3) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>이제 다른 통계메뉴를 살펴 보겠습니다.<br>"
													+ " <strong style=\"color:#ee7c1a;  font-weight:bold;\">'통계메뉴'</strong> 버튼을 열어주세요."
													+ "</p></div>");
							$("#zoomOutImg").hide();
							$("#zoomOutMap2Img").hide();
							$("#zoomOutMap3Img").show();
							$("#mainMenuImg").show();
							posiInfo(21);
						}
					});
	$("#mainMenuImg")
			.click(
					function() {
						tutorial_log();
						$("#redLegendInfo1").hide();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'대화형통계지도'</strong>는 3가지 총조사 자료를 중점적으로 제공합니다.<br>"
												+ "5년에 한 번 시행하는 <strong style=\"color:#0040ff;  font-weight:bold;\">인구주택총조사, 농림어업총조사</strong> 및 매년 시행하는 <br>"
												+ "<strong style=\"color:#0040ff;  font-weight:bold;\">전국사업체조사, 인구주택총조사(2015년 이전은 5년단위)및 5년에 한번 시행하는 농립어업총조<br>"
												+ "사</strong> 입니다."
												+ "</p></div>"
												+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:5px;\">"
												+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0;  font-size: 14px;\">다음</button></a>"
												+ "</div>");
						$("body")
								.on(
										"click",
										".button",
										function() {
											$(
													"#tutorialText .title, #tutorialText .content, #tutorialText #next")
													.empty();
											$("#tutorialText")
													.append(
															"<div class=\"title\">"
																	+ "<p></p>"
																	+ "</div>"
																	+ "<div class=\"content\">"
																	+ "<p>이 자료는 전수조사로서 우리나라에 존재하는 모든 가구 및 사업체 정보를 가지고 있으며<br>"
																	+ "읍면동보다 작은 집계구 단위의 통계 검색이 가능합니다.<br>"
																	+ "<strong style=\"color:#0040ff;  font-weight:bold;\">* 집계구: 소지역통계 제공을 위한 최소구역으로 인구 500명 내외 포함(읍면동의 평균 1/24)</strong><br>"
																	+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'KOSIS(지역통계)'</strong>는 국가통계포털의 자료 중 지역자료가 있는 경우 통계지도로 표시하여 줍니다."
																	+ " 표본조사 자료이므로 시도 내지 시군구로만 조회 가능합니다."
																	+ "</p></div>"
																	+ "<div class=\"button1\" id=\"next\" style=\"left:-6px; top:-14px;\">"
																	+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0;  font-size: 14px;\">다음</button></a>"
																	+ "</div>");
										});
						$("body")
								.on(
										"click",
										".button1",
										function() {
											$(
													"#tutorialText .title, #tutorialText .content, #tutorialText #next")
													.empty();
											$("#tutorialText")
													.append(
															"<div class=\"title\">"
																	+ "<p></p>"
																	+ "</div>"
																	+ "<div class=\"content\">"
																	+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">공공데이터</strong>에서 유동인구 자료 등 일부 위치기반 자료를 볼 수 있으며<br>"
																	+ "<strong style=\"color:#0040ff;  font-weight:bold;\">나의 데이터</strong> 메뉴에서 이용자가 보유한 데이터를 업로드하여 시각화 할 수도 있습니다.<br>"
																	+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'전국사업체조사'</strong>를 선택하여 주십시오."
																	+ "</p></div>");
										});
						$("#toPoint_1").hide();
						$("#toPoint_2").hide();
						$("#toPoint_3").hide();
						$("#toPoint_4").hide();
						$(".tb_right").show();
						$("#rightControlImg").hide();
						$("#mainMenuImg").hide();
						$("#zoomOutMap3Img").hide();
						$(".step01").css("left", 0);
						$("#map_left_btn").addClass("on");
						$("#map_left_btn").css("left", 280);
						$("#map_left_btn").css("width", 40);
						$("#map_left_btn>span").css("display", "none");
						$("#slide1Img").show();
						setTimeout(function() {
							$("#slide1Img").hide();
							$("#slide2Img").show();
						}, 2000);
						setTimeout(function() {
							$("#slide2Img").hide();
							$("#slide3Img").show();
						}, 4000);
						setTimeout(function() {
							$("#slide3Img").hide();
							$("#slide4Img").show();
						}, 6000);
						setTimeout(function() {
							$("#slide4Img").hide();
							$("#slide5Img").show();
						}, 8000);
						setTimeout(function() {
							$("#slide5Img").hide();
							$("#slide6Img").show();
						}, 10000);
						setTimeout(function() {
							$("#slide6Img").hide();
							$("#companyBtnImg").show();
							posiInfo(22);
						}, 12000);
					});
	$("#companyBtnImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'전국사업체조사'</strong>는 산업분류별 사업체수 또는 종사자수를 검색할 수 있습니다.<br>"
												+ "다만, 산업분류에 익숙하지 않은 사용자를 위해 주요 업종 61가지를 테마업종으로 따로 검색할 수 있도록 하였습니다.<br>"
												+ "대전 서구 둔산2동의 카페 현황을 살펴 보겠습니다.<br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'테마업종'</strong>을 클릭해 주세요."
												+ "</p></div>");
						$("#buttonMakeBtn").hide();
						$("#companyBtnImg").hide();
						$("#companyBtn").addClass("on");
						$("#quickBox_2depth").css("left", 280);
						$("#companyClassListDiv").css("left", 560);
						$("#map_left_btn").css("left", 840);
						$(".totalResult").css("display", "none");
						$(".totalResult.tr04").css("display", "block");
						$("#themaListImg").show();
						posiInfo(23);
					});
	$("#themaListImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'음식점 카테고리'</strong>를 선택합니다."
												+ "</p></div>");
						$("#themaListImg").hide();
						$interactiveLeftMenu.ui.companyTab('theme');
						$("#themaRestaurantImg").show();
						posiInfo(24);
					});
	$("#themaRestaurantImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>음식점 리스트 중 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'카페'</strong>를 선택합니다."
												+ "</p></div>");
						$("#themaRestaurantImg").hide();
						$("#food").addClass("on");
						$("#foodInfo").css("display", "block");
						$("#themaCafeImg").show();
						posiInfo(25);
					});
	$("#themaCafeImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'테마조건 버튼 생성'</strong>을 눌러주세요."
												+ "</p></div>");
						$("#themaCafeImg").hide();
						$("#theme_5010").prop("checked", true);
						$("label[for=theme_5010").addClass("on");
						$("#themaButtonImg").show();
						posiInfo(26);
					});
	$("#themaButtonImg")
			.click(
					function() {
						tutorial_log();
						$("#map_left_btn").removeClass("on");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>선택항목에 <strong style=\"color:#0040ff;  font-weight:bold;\">카페+사업체수 버튼</strong>이 생성된 것을 볼 수 있습니다.<br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">이 항목을 밝게 표시된 둔산2동 경계 위로 끌어다 놓아 주세요.</strong><br><br>"
												+ "<strong style=\"color:#ff0040;  font-weight:bold;\">(드래그앤드랍을 이용하세요!)</strong>"
												+ "</p></div>");
						$("#companyClassListDiv").css("left", -280);
						$(".step01").css("left", -280);
						$("#quickBox_2depth").css("left", -1120);
						$("#map_left_btn").css({
							"left" : "0",
							"width" : "90"
						});
						$("#map_left_btn>span").css("display", "inline");
						$("#themaButtonImg").hide();
						$(".tb_right").hide();
						$("#redLegendInfo1").show();
						$("#rightControlImg").show();
						$("#zoomMapImg4").show();
						$("#dropMap2").show();
						$("#dragItemImg2").show();
						$("#dropMapZone2").show();
						$("#toPoint_4_4").css({
							"top" : 250,
							"left" : 1000
						});
						$("#toPoint_4_4").show();
						posiInfo(27);
						$("#dragItemImg2").draggable({
							helper : "clone"
						});
						$("#dropMapZone2")
								.droppable(
										{
											accept : "#dragItemImg2",
											drop : function(e) {
												tutorial_log();
												$(
														"#tutorialText .title, #tutorialText .content, #tutorialText #next")
														.empty();
												$("#tutorialText")
														.append(
																"<div class=\"title\">"
																		+ "<p></p>"
																		+ "</div>"
																		+ "<div class=\"content\">"
																		+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">색채지도</strong>가 검색되었습니다.<br>"
																		+ "둔산 2동이 작은 구역으로 쪼개진 것을 볼 수 있습니다.<br>"
																		+ "이 하나하나의 구역이 <strong style=\"color:#ee7c1a;  font-weight:bold;\">집계구입니다.</strong><br>"
																		+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'집계구'</strong>는 인구를 기준으로 쪼개진 영역으로 인구가 많은 지역은 집계구가 작고 인구가 적은 지역은 집계구가 큽니다."
																		+ "</p></div>"
																		+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:-14px;\">"
																		+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0;  font-size: 14px;\">다음</button></a>"
																		+ "</div>");
												$("body")
														.on(
																"click",
																".button",
																function() {
																	$(
																	/*
																	 * "#tutorialText")
																	 * .empty();
																	 */
																	"#tutorialText .title, #tutorialText .content, #tutorialText #next")
																			.empty();
																	$(
																			"#tutorialText")
																			.append(
																					"<div class=\"title\">"
																							+ "<p></p>"
																							+ "</div>"
																							+ "<div class=\"content\">"
																							+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'집계구'</strong>는 읍면동보다 작은 자료 제공을 위해 특별히 만들어졌으며, 매년 업데이트 됩니다.<br>"
																							+ "붉게 표시된 집계구가 아마 시내인가봅니다.<br>"
																							+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">붉은 집계구 위에 마우스를 올려 통계값을 확인해보세요.</strong>"
																							+ "</p></div>"
																							+ "<div class=\"button1\" id=\"next\" style=\"left:-6px; top:24px;\">"
																							+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0;  font-size: 14px;\">다음</button></a>"
																							+ "</div>");
																});
												$("body")
														.on(
																"click",
																".button1",
																function() {
																	$(
																			"#tutorialText .title, #tutorialText .content, #tutorialText #next")
																			.empty();
																	$(
																			"#tutorialText")
																			.append(
																					"<div class=\"title\">"
																							+ "<p></p>"
																							+ "</div>"
																							+ "<div class=\"content\">"
																							+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">하얀 집계구 위에 마우스를 올려보세요.</strong><br>하얀 집계구 통계값은 N/A로 표시됩니다.<br>"
																							+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'N/A'</strong>는 Not Available의 약자로 통계값이 5 미만인 경우 개인정보보호를 위해 값을 직접 제공하는 대신 N/A로 표시합니다.<br>"
																							+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'데이터보드'</strong>를 열어보세요.<br>"
																							+ "</p></div>");
																});
												$("#toPoint_1_1_1").css({
													"top" : 600,
													"left" : 840
												});
												$("#toPoint_2_2_2").css({
													"top" : 450,
													"left" : 550
												});
												$("#toPoint_1_1_1").show();
												$("#toPoint_2_2_2").show();
												$("#redRegionImg").show();
												$("#whiteRegionImg").show();
												$("#redLegendInfo1").hide();
												$("#redLegendInfo3").show();
												$("#toPoint_4_4").hide();
												$("#dragItemImg2").hide();
												$("#dropMap2").hide();
												$("#dropMapZone2").hide();
												$("#zoomMapImg4").hide();
												$("#zoomMapImg5").show();
												dbChk = 2;
												$("#dataBoardImg").show();
												posiInfo(28);
											}
										});
					});
	$("#redRegionImg").mouseover(function() {
		$("#redRegionInfoImg").show();
	});
	$("#redRegionImg").mouseout(function() {
		$("#redRegionInfoImg").hide();
	});
	$("#whiteRegionImg").mouseover(function() {
		$("#whiteRegionInfoImg").show();
	});
	$("#whiteRegionImg").mouseout(function() {
		$("#whiteRegionInfoImg").hide();
	});
	$("#dataBoardImg")
			.click(
					function() {
						if (dbChk == 2) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'집계구'</strong>는 행정구역과 달리 이름이 없기 때문에 대신 집계구 번호로 표시됩니다.<br>"
													+ "이제 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'데이터보기'</strong> 메뉴를 닫아보세요.<br>"
													+ "</p></div>");
							$("#toPoint_1_1_1").hide();
							$("#toPoint_2_2_2").hide();
							$("#redRegionImg").hide();
							$("#whiteRegionImg").hide();
							$("#dataBoardImg").hide();
							$("#companyDataboardImg").show();
							showdbChk = 2;
							$("#showDataImg").show();
							posiInfo(29);
						}
					});
	$("#showDataImg")
			.click(
					function() {
						if (showdbChk == 2) {
							tutorial_log();
							if ($(window).height() >= 1080
									|| $(window).width() >= 1920) {
								$("#dataBoardImgDiv")
										.css(
												{
													"background-image" : "url(/img/tutorial/dataBoard2006Img.png)",
													"background-position" : "top"
												});
								$("#yearChoice2006Img").css({
									"top" : "510px"
								});
							} else {
								$("#dataBoardImgDiv")
										.css(
												{
													"background-image" : "url(/img/tutorial/dataBoard2006Img.png)",
													"background-position" : "bottom"
												});
								$("#yearChoice2006Img").css({
									"bottom" : "312px"
								});
							}
							$("#dataBoardImgDiv").css("height",
									$(window).height());
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'상위지역 비교데이터보기' 메뉴</strong>에서는 카페수가 상위 지역 대비 얼마정도를 차지하는지 볼 수<br>"
													+ "있습니다.<br>"
													+ "대전광역시 카페는 전국 카페의 3.2% 서구 카페는 대전광역시 카페의 33%를 둔산2동 카페는 서구 카페의 16.1%를 차지하고 있습니다."
													+ "</p></div>"
													+ "<div class=\"button\" id=\"next\" style=\"left:-6px; top:5px;\">"
													+ "<a href=\"#\"><button type=\"button\" alt=\"다음\" style=\"width:70px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0;  font-size: 14px;\">다음</button></a>"
													+ "</div>");
							$(".button")
									.click(
											function() {
												$(
														"#tutorialText .title, #tutorialText .content, #tutorialText #next")
														.empty();
												$("#tutorialText")
														.append(
																"<div class=\"title\">"
																+ "<p></p>"
																+ "</div>"
																+ "<div class=\"content\">"
																+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'시계열 조회'</strong> 화면을 보겠습니다.<strong style=\"color:#0040ff;  font-weight:bold;\">'전국사업체조사'</strong>는 매년 데이터가 갱신되어 <br>"
																+ "2000년부터 2014년까지 1년 단위 데이터가 있습니다. 다만 2006년부터 개정된 산업분류가 적용되어 2005년 이전의 자료는<br>"
																+ "2006년 이후의 자료와 자동 시계열연계가 되지 않습니다.(2005년 이전의 자료를 보시려면 통계메뉴 > 전국사업체조사에서 기준년도와 산업분류를 다시 선택해주세요!)"
																+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">2006년</strong>을 클릭해 보세요.<br>"
																+ "</p></div>");
											});
							$("#toPoint_1").hide();
							$("#toPoint_2").hide();
							$("#toPoint_3").hide();
							$("#toPoint_4").hide();
							$("#companyDataboardImg").hide();
							$("#showDataImg").hide();
							$("#dataBoardImgDiv").show();
							$("#yearChoice2006Img").show();
							if ($(window).height() >= 1080
									|| $(window).width() >= 1920) {
								$("#toPoint_db1").css({
									"top" : "435px"
								});
								db1_1();
							} else {
								$("#toPoint_db1").css({
									"bottom" : "385px"
								});
								db1();
							}
							function db1() {
								$("#toPoint_db1").animate({
									right : 375,
									bottom : 385
								}, 500, "", function() {
									$(this).animate({
										right : 375,
										bottom : 395
									}, 500, "", function() {
										db1();
									});
								});
							}
							function db1_1() {
								$("#toPoint_db1").animate({
									right : 375,
									top : 435
								}, 500, "", function() {
									$(this).animate({
										right : 375,
										top : 445
									}, 500, "", function() {
										db1_1();
									});
								});
							}
							$("#toPoint_db1").show();
						}
					});
	$("#yearChoice2006Img")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>이때는 카페가 별로 없네요.<strong style=\"color:#ee7c1a;  font-weight:bold;\">2010년</strong>을 클릭해 보세요.<br>"
												+ "</p></div>");
						if ($(window).height() >= 1080
								|| $(window).width() >= 1920) {
							$("#dataBoardImgDiv")
									.css(
											{
												"background-image" : "url(/img/tutorial/dataBoard2010Img.png)",
												"background-position" : "top"
											});
							$("#yearChoice2010Img").css({
								"top" : "510px"
							});
						} else {
							$("#dataBoardImgDiv")
									.css(
											{
												"background-image" : "url(/img/tutorial/dataBoard2010Img.png)",
												"background-position" : "bottom"
											});
							$("#yearChoice2010Img").css({
								"bottom" : "312px"
							});
						}
						$("#dataBoardImgDiv").css("top", 138);
						$("#toPoint_db1").hide();
						$("#toPoint_db1").clearQueue().stop();
						if ($(window).height() >= 1080
								|| $(window).width() >= 1920) {
							$("#toPoint_db2").css({
								"top" : "435px"
							});
							db2_1();
						} else {
							$("#toPoint_db2").css({
								"bottom" : "385px"
							});
							db2();
						}
						function db2() {
							$("#toPoint_db2").animate({
								right : 40,
								bottom : 385
							}, 500, "", function() {
								$(this).animate({
									right : 40,
									bottom : 395
								}, 500, "", function() {
									db2();
								});
							});
						}
						function db2_1() {
							$("#toPoint_db2").animate({
								right : 40,
								top : 435
							}, 500, "", function() {
								$(this).animate({
									right : 40,
									top : 445
								}, 500, "", function() {
									db2_1();
								});
							});
						}
						$("#toPoint_db2").show();
						$("#zoomMapImg5").hide();
						$("#yearChoice2006Img").hide();
						$("#redLegendInfo3").hide();
						$("#redLegendInfo4").show();
						$("#baseYear2006MapImg").show();
						$("#yearChoice2010Img").show();
					});
	$("#yearChoice2010Img")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>이번에는 다시 <strong style=\"color:#ee7c1a;  font-weight:bold;\">2014년</strong>을 클릭해 보세요.<br>"
												+ "</p></div>");
						if ($(window).height() >= 1080
								|| $(window).width() >= 1920) {
							$("#dataBoardImgDiv")
									.css(
											{
												"background-image" : "url(/img/tutorial/dataBoard2010Img.png)",
												"background-position" : "top"
											});
							$("#yearChoice2014Img").css({
								"top" : "568px"
							});
						} else {
							$("#dataBoardImgDiv")
									.css(
											{
												"background-image" : "url(/img/tutorial/dataBoard2010Img.png)",
												"background-position" : "bottom"
											});
							$("#yearChoice2014Img").css({
								"bottom" : "252px"
							});
						}
						$("#dataBoardImgDiv").css("top", 138);
						$("#toPoint_db2").hide();
						$("#toPoint_db2").clearQueue().stop();
						if ($(window).height() >= 1080
								|| $(window).width() >= 1920) {
							$("#toPoint_db3").css({
								"top" : "480px"
							});
							db3_1();
						} else {
							$("#toPoint_db3").css({
								"bottom" : "320px"
							});
							db3();
						}
						function db3() {
							$("#toPoint_db3").animate({
								right : 130,
								bottom : 320
							}, 500, "", function() {
								$(this).animate({
									right : 130,
									bottom : 330
								}, 500, "", function() {
									db3();
								});
							});
						}
						function db3_1() {
							$("#toPoint_db3").animate({
								right : 130,
								top : 480
							}, 500, "", function() {
								$(this).animate({
									right : 130,
									top : 490
								}, 500, "", function() {
									db3();
								});
							});
						}
						$("#toPoint_db3").show();
						$("#redLegendInfo4").hide();
						$("#redLegendInfo5").show();
						$("#baseYear2006MapImg").hide();
						$("#yearChoice2010Img").hide();
						$("#baseYear2010MapImg").show();
						$("#yearChoice2014Img").show();
					});
	$("#yearChoice2014Img")
			.click(
					function() {
						tutorial_log();
						$("#companyDataboard2Img").css("top", 138);
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>시간이 흐를 수록 도시가 발전하며 카페가 늘어나는 것을 볼 수 있죠?<br>"
												+ "마지막으로 실제 사업체 위치를 조회할 수 있는 기능을 소개해 드리겠습니다.<br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'데이터보드'</strong>를 닫아주세요.<br>"
												+ "</p></div>");
						$("#toPoint_db3").hide();
						$("#toPoint_db3").clearQueue().stop();
						$("#redLegendInfo5").hide();
						$("#redLegendInfo3").show();
						$("#baseYear2010MapImg").hide();
						$("#yearChoice2014Img").hide();
						$("#zoomMapImg5").show();
						$("#companyDataboard2Img").show();
						closedbChk = 2;
						$("#dataBoardImgDiv").hide();
						$("#dataBoardCloseImg").show();
						posiInfo(30);
					});
	$("#dataBoardCloseImg")
			.click(
					function() {
						if (closedbChk == 2) {
							tutorial_log();
							setTimeout(
									function() {
										$(
												"#tutorialText .title, #tutorialText .content, #tutorialText #next")
												.empty();
										$("#tutorialText")
												.append(
														"<div class=\"title\">"
																+ "<p></p>"
																+ "</div>"
																+ "<div class=\"content\">"
																+ "<p>데이터보드 바로 아래의 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'위치표시 마커'</strong>를 클릭해 보세요.<br>"
																+ "</p></div>");
										$("#companyDataboard2Img").hide();
										$("#dataBoardCloseImg").hide();
										poiBtnChk = 1;
										$("#poiButtonImg").show();
										posiInfo(31);
									}, 500);
						}
					});
	$("#poiButtonImg")
			.click(
					function() {
						if (poiBtnChk == 1) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>방금 검색한 음식점>카페를 찾기위해 먼저 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'음식점'</strong>을 선택하세요.<br>"
													+ "</p></div>");
							$("#poiButtonImg").hide();
							$("#rightControlImg").hide();
							$("#rightControlImg2").show();
							$("#poiRestaurantImg").show();
							posiInfo(32);
						}
					});
	$("#poiRestaurantImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'카페'</strong>를 선택해 주세요.<br>"
												+ "</p></div>");
						$("#rightControlImg2").hide();
						$("#rightControlImg3").show();
						$("#poiRestaurantImg").hide();
						$("#poiSubmenuCafeImg").show();
						posiInfo(33);
					});
	$("#poiSubmenuCafeImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>현재 화면 지도 상 존재하는 모든 카페 위치가 표시됩니다.<br>"
												+ "하나의 위치에 많은 사업체가 밀집해 있는 경우 아래와 같이 그룹으로 묶여서 나타납니다.<br>"
												+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'그룹마커'를 클릭하면 지도가 확대되면서 각각의 사업체 위치가 분리되어 보입니다.</strong><br>"
												+ "</p></div>");
						$("#zoomMapImg5").hide();
						$("#rightControlImg3").hide();
						$("#rightControlImg2").show();
						$("#poiSubmenuCafeImg").hide();
						$("#poiMapImg").show();
						$("#poiGroupMarkerImg").show();
						posiInfo(34);
					});
	$("#poiGroupMarkerImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>카페 마커를 클릭하면 사업체명과 주소가 보입니다.<br>"
												+ "검색이 끝났으므로 이제 <strong style=\"color:#ee7c1a;  font-weight:bold;\">'마커' 를 초기화</strong> 하겠습니다.<br>"
												+ "</p></div>");
						$("#poiGroupMarkerImg").hide();
						$("#poiMapImg").hide();
						$("#poiMap2Img").show();
						$("#poiMarkerImg").show();
						$("#poiCleanImg").show();
						$("#toPoint_1_1").css({
							"top" : 390,
							"left" : 780
						});
						$("#toPoint_1_1").show();
						posiInfo(35);
					});
	$("#poiMarkerImg").click(function() {
		$("#poiMarkerInfoImg").show();
	});
	$("#poiMarkerImg").mouseout(function() {
		$("#poiMarkerInfoImg").hide();
	});
	$("#poiCleanImg")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">'위치표시 마커'</strong> 를 클릭하여 카테고리 리스트들을 닫아주세요.<br>"
												+ "</p></div>");
						$("#toPoint_1_1").hide();
						$("#poiMarkerImg").hide();
						$("#poiCleanImg").hide();
						$("#poiMap2Img").hide();
						$("#poiCleanMapImg").show();
						poiBtnChk = 2;
						$("#poiButtonOnImg").css("border", "3px outset red;");
						$("#poiButtonOnImg").show();
						posiInfo(36);
					});
	$("#poiButtonOnImg")
			.click(
					function() {
						tutorial_log();
						if (poiBtnChk == 2) {
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">지도를 초기화</strong> 해주세요.<br>"
													+ "</p></div>");
							$("#rightControlImg2").hide();
							$("#rightControlImg").show();
							$("#poiButtonOnImg").hide();
							cleanChk = 2;
							$("#cleanImg").show();
							posiInfo(37);
						}
					});
	$("#cleanImg")
			.click(
					function() {
						if (cleanChk == 2) {
							tutorial_log();
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p><span style=\"margin-left:5px;\">대화형 통계지도 튜토리얼을 마치신것을 축하합니다.!</span></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'대화형 통계지도'</strong>에는 "
													+ "이 외에도 많은 다양한 기능들이 있습니다.<br>"
													+ "감사합니다.<br>"
													+ "<strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '대화형 통계지도' 로 이동합니다.)");
							$("#poiCleanMapImg").hide();
							$("#cleanImg").hide();
							$("#zoomMapImg7").show();
							posiInfo(-1);
							setTimeout(function() {
								location.href = "/view/map/interactiveMap";
							}, 10000);
						}
					});

	posiInfo(0);
}

function closeTutorial() {
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
		// setCookie("confirmMsg", "done", 365);
		location.href = "/view/map/interactiveMap";
	} else {
		return false;
	}
}

/*
 * function getCookie(name) { var nameOfCookie = name + "="; var x = 0; while (x <=
 * document.cookie.length) { var y = (x + nameOfCookie.length); if
 * (document.cookie.substring(x, y) == nameOfCookie) { if ((endOfCookie =
 * document.cookie.indexOf(";", y)) == -1) endOfCookie = document.cookie.length;
 * return unescape(document.cookie.substring(y, endOfCookie)); } x =
 * document.cookie.indexOf(" ", x) + 1; if (x == 0) break; } return ""; }
 * 
 * function setCookie(name, value, expiredays) { var todayDate = new Date();
 * todayDate.setDate(todayDate.getDate() + expiredays); document.cookie = name +
 * "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";" }
 */

function tutorial_log() {
	apiLogWrite2("A0", "A28", "대화형통계지도 튜토리얼", "없음", "00", "없음");
}