(function(W, D) {
	W.$sgisMobileInteractive = W.$sgisMobileInteractive || {};
	var doit,timeoutId;
	var pageSize = 100;
	$(window).resize(function() {
		clearTimeout(doit);
		doit = setTimeout($interactiveMap.ui.mapResize(), 500);
	}).load(function() {
		$("a.NoneAction").off("click");
	}).scroll(function(){
		if(timeoutId ){
			clearTimeout(timeoutId );  
		}
		timeoutId = setTimeout(function(){
			var path = contextPath+"/mobile/img/mobile/";
			if($(window).scrollTop()>0){
				$("#up-and-down-button img").attr("src",path+"icon_up.png");
			}else{
				$("#up-and-down-button img").attr("src",path+"icon_down.png");
			}
		}, 100);
	});
	$(document).ready(function() {
		$("#up-and-down-button").click(function(){
			var scrollTop = 0;
			if($(this).children("img").attr("src")==contextPath+"/mobile/img/mobile/icon_down.png"){
				scrollTop = $(window).height()/2;
			}
			$("html,body").animate({
				scrollTop: scrollTop
			}, 300);
		});
		$("#find_search").submit(function(){
			var keywords = $(this).find("input[name=keywords]").val();
			$(this).find(".FindBox").addClass("Hidden");
			if(keywords.length>0){
				var companySearchList = $("#company-list li[data-text^="+keywords+"]");
				if(companySearchList.length>0){
					$("#company-list li").hide();
					companySearchList.show();
				}else{
					messageAlert.open("알림", "찾으시는 산업분류는 해당 깊이에서 존재하지 않습니다.");
					$("#company-list li").show();
				}
			}else{
				$("#company-list li").show();
			}
			return false;
		});
		$interactiveMap.ui.mapResize();
		$sgisMobileInteractive.ui.initialize();
		$("#Btn_Search_Detail>button").off().click(function() {
			$interactiveMap.ui.curSelectedStatsType = $(".DetailBox>div[class^=Detail2_]:visible").data("subject");
			if ($(".DetailBox>div[class^=Detail2_]:visible").data("id") == undefined) {
				$interactiveMap.ui.curSelectedDetailStatsType = $(".DetailBox>div[class^=Detail2_]:visible>.TabArea:visible").data("id");
			} else {
				$interactiveMap.ui.curSelectedDetailStatsType = $(".DetailBox>div[class^=Detail2_]:visible").data("id");
			}
			if($interactiveMap.ui.curSelectedDetailStatsType=="API_0304-a"&&$("input[name=theme-code]:radio:checked").length<=0){
				messageAlert.open("알림","테마유형을 선택하세요");
				return false;
			}else{
				$interactiveMap.ui.addSearchBtn();
				$("#interactiveMap .Open_Type1").hide();
				$(".Wrap>.Content").removeAttr("style");
			}
		});
		$("div[class^=Detail2_] .Info").click(function() {
			$("#" + $(this).data("id") + "_INFO_BOX").show();
			return false;
		});
		$(".InfoBox .BtnClose,.InfoBox .InfoBg").click(function() {
			$(this).parents(".InfoBox").hide();
		});
		$("input[data-able]:checkbox").change(function() {
			if($(this).data("type")==="checkbox"||$(this).data("type")==="radio"){
				var checked = $(this).is(":checked");
				var type = $(this).data("type");
				$("#"+$(this).data("able")).find("li").each(function(cnt,node){
					$(this).find("input:"+type).prop("disabled",!checked);
					if(checked){
						$(this).removeClass("disabled");
					}else{
						$(this).addClass("disabled");
					}
				});
			}else{
				$(this).parents("div[class^=Detail2_]").find("[id^="+$(this).data("able")+"]").prop("disabled", !$(this).is(":checked"));
			}
		});
	});
	$sgisMobileInteractive.ui = {
		initialize: function() {
			//검색 주제 열기
			$("#openSubject").click(function() {
				$("#interactiveMap .Open_Type1").show();
                $(".Wrap>.Content").attr("style","height:"+$("#interactiveMap .Open_Type1").height()+"px;overflow:hidden;");
				return false;
			});
			//검색 주제 클릭시 해당 상세 검색 나타내기
			$("#interactiveMap .Open_Type1 nav a").click(function() {
				$interactiveMap.ui.setDetailStatsPanel($(this).attr("id"));
				$("#interactiveMap .Open_Type1 nav a").removeClass("M_on");
				$(this).addClass("M_on");
				$(".DetailBox>div[class^=Detail2_]").hide();
				$(".DetailBox>div[class^=Detail2_]:eq(" + $(this).index() + ")").show();
                $("#interactiveMap .Open_Type1 .DetailBox").scrollTop(0);
			});
			$sgisMobileInteractive.ui.multipleChange();
			$(".tab .tab-item").click(function() {
				var getDetailDiv = $(this).parents("div[class^=Detail2_]");
				getDetailDiv.find(".tab").removeClass("M_on");
				$(this).parent("div").addClass("M_on");
				getDetailDiv.find(".TabArea").addClass("Hidden");
				getDetailDiv.find(".TabArea[data-id=" + $(this).attr("id") + "]").removeClass("Hidden");
                $("#interactiveMap .Open_Type1 .DetailBox").scrollTop(0);
			});
		},
		multipleChange: function() {
			$(".DetailBox input:radio,.DetailBox input:checkbox").change(function() {
				$sgisMobileInteractive.ui.multipleInitialize($(this));
			});
		},
		//상세 검색에서 라디오,체크박스의 부모 li에 Check class 넣기 
		multipleInitialize: function(element) {
			$(element).parents("ul").children("li").removeClass("Check");
			if ($(element).attr("type") == "checkbox") {
				$(element).parents("ul").find($("input:checkbox:checked")).each(function() {
					$(this).parents("li").addClass("Check");
				});
			} else {
				$(element).parents("li").addClass("Check");
			}
		},
		search: function() {
			$interactiveMap.callbackFunc.didMapDropEnd(
				$interactiveMap.ui.saveObject.event,
				$($interactiveMap.ui.saveObject.element),
				"",
				$interactiveMap.ui.saveObject.center,
				$interactiveMap.ui.saveObject.preThat
			);
			//지도를 움직여서 실제적으로 데이터를 지도에 오버라이드
			$interactiveMap.ui.saveObject.preThat.mapMove(
				[$interactiveMap.ui.saveObject.center.x - 100, $interactiveMap.ui.saveObject.center.y - 100],
				$interactiveMap.ui.saveObject.preThat.zoom
			);
			$interactiveMap.ui.saveObject.preThat.mapMove(
				[$interactiveMap.ui.saveObject.center.x, $interactiveMap.ui.saveObject.center.y],
				$interactiveMap.ui.saveObject.preThat.zoom
			);
		}
	}
}(window, document));