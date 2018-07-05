/**
 * 
 */
(function (W, D) {
	W.$thematicMapMain = W.$thematicMapMain || {};
	W.setRemarkBoxListSize = function(){
		if($(".map_dummy").contents().find("div[id^=mapRgn_]").length>1){
			$(".map_dummy").contents().find("div[id^=mapRgn_]").each(function(){
				$(this).find(".remarkbox").width($(this).width());
			});
		}else{
			$(".map_dummy").contents().find(".remarkbox").width($(window).width())
		}
		$(".map_dummy").contents().find(".remarkbox li").height("");
		var remarkboxListHeight = 0;
		$(".map_dummy").contents().find(".remarkbox li").each(function(){
			remarkboxListHeight = Math.max(remarkboxListHeight,$(this).height());
		});
		$(".map_dummy").contents().find(".remarkbox li").height(remarkboxListHeight>0?remarkboxListHeight:"");
	};
	$(document).ready(function () {
		var titleActionDoit;
		if($sgisMobile.ui.parameters.stat_thema_map_id!=undefined){
			// thematicMap.html 파라미터 갖고오기
			$thematicMapMain.param = getAllParameter();
			
			// StatthemamappLists 조회
			$thematicMapMain.request.getStatsThemeMapList($thematicMapMain.param);
			
			var widthSize = $(window).width();
			if (widthSize > 1260) {
				var value = parseInt(widthSize / 2 - 500);
				if (value < 0) {
					value = 0;
				}
				$("#mapNavi2").css("margin-left", value);
				
			}else{
				$("#mapNavi2").css("margin-left", '100px');
			}
			
			// map size
			var mapheight = $("body").height();
			
			$(".map_dummy").load(function(){
				setRemarkBoxListSize();
				clearTimeout(titleActionDoit);
				var titleAction = function(){
					clearTimeout(titleActionDoit);
					$(".MapTitle>h3").css({"width":"","padding-left":""});
					if($(".MapTitle>h3").width()>$(".MapTitle").width()){
						$(".MapTitle>h3").css({"padding-left":"10px"});
						titleActionDoit = setTimeout(function(){
							$(".MapTitle>h3").animate({
								"margin-left":"-"+($(".MapTitle>h3").width()+10)
							},6000,function(){
								$(".MapTitle>h3").css({"margin-left":"0"});
								titleAction();
							});
						}, 3000);
					}else{
						$(".MapTitle>h3").css({"width":"100%"});
					}
				};
				titleAction();
			});
			$("#header").css("margin-bottom", "0px");
			$(window).resize(function () {
				setRemarkBoxListSize();
				var widthSize = $(window).width();
				if (widthSize > 1260) {
					var value = parseInt(widthSize / 2 - 500);
					if (value < 0) {
						value = 0;
					}
					
					$("#mapNavi2").css("margin-left", value);
					
				}else{
					$("#mapNavi2").css("margin-left", '100px');
				}
				
			});
		}
	});
	$thematicMapMain.request = {
		getStatsThemeMapList : function (paramObj, searchParam) {
			
			var requestParam = {
				stat_thema_map_id : paramObj.stat_thema_map_id
			};
			
			$statsPotal.api.thematicMap.getStatsThemeMapListByThematicId({
				param : requestParam,
				method : 'POST',
				success : $thematicMapMain.response.successStatsThemeMapList
			});
		}
	};
	$thematicMapMain.response = {
		successStatsThemeMapList : function (status, res) {
			if (res.errCd === 0) {
				var themaInfo = res.result.themeMapInfoList;
				$thematicMapMain.themaInfo = themaInfo;
				
				$(".MapTitle h3").html(themaInfo.title);
				
				// Frame URL 설정
				if ($thematicMapMain.param.mapType == '01') {
					$("#themeticFrame").attr("src", "/mobile"+themaInfo.stat_thema_map_file_url + "?stat_thema_map_id=" + themaInfo.stat_thema_map_id + '&stat_disp_level=' + themaInfo.stat_disp_level + '&area_set=' + themaInfo.area_set);
				}else if ($thematicMapMain.param.mapType == '02') {
					$("#themeticFrame").attr("src", "/mobile"+themaInfo.stat_thema_map_file_url);
				}else if ($thematicMapMain.param.mapType == '06') {
					$("#themeticFrame").attr("src", "/mobile/html/thematicMap/frame/thematicMapPartitionFrame.html" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id);
				}else if (/0[3-5]/.test($thematicMapMain.param.mapType)) {
					// 03:색상형,04:증감형,05:시계열형,06:분할형
					$("#themeticFrame").attr("src", "/mobile/html/thematicMap/frame/thematicMapFrame.html" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id);
				}else{
					messageAlert.open("알림", "잘못된 지도 타입입니다");
				}
			}
		},
		
		createInfoTooltip : function(tmp, obj) {
			$(tmp).tooltip({
				position : {my: "left+25 top-10"},
				track: true,
				tooltipClass : "layer_alarm_pop",
				content : function() {
					var html =  "<div class='layer_alarm_pop'>" +
									"<p>" +
										"<font size='2' style='font-weight: bold;'>" + obj + "</font><br>" +
								    "</p>" +
							    "</div>" +
							    "<span><img src='/mobile/img/im/icon_alarm_view.png' alt='' /></span>";

					return html;
				},
				
				open: function (event, ui) {
			        ui.tooltip.css("max-width", "400px");
			    },
			});
		}
		
	};
	/* window console.log 문제해결 */
	if (!window.console) {
		console = {
			log : function () {
			}
		};
	}
}(window, document));
