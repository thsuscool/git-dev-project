/**
 * 통계주제도에서 공통적으로 쓰는 곳입니다.
 * 
 * 카테고리리스트,통계주제도리스트,페이징
 */
(function (W, D) {
	var doit,pageSize = 100;
	W.$sgisMobileThematic = W.$sgisMobileThematic || {};
	$(document).ready(function(){
		$sgisMobileThematic.ui.initialize();
		var windowWidth = $(window).width();
		$(window).resize(function() {
			if ($(window).width() != windowWidth) {
				windowWidth = $(window).width();
				clearTimeout(doit);
				doit = setTimeout(mapResize, 500);
			}
		}).load(function(){
			mapResize();
		});
	});
	function mapResize(){
		var isUpscale = true;
		if($("#themeticFrame").length>0){
			var mapWindow = $("#themeticFrame")[0].contentWindow;
			if(mapWindow.$thematicMap){
				if(mapWindow.$thematicMap.rightMap){
					isUpscale = $("#mapSizeControl_"+mapWindow.$thematicMap.rightMap.sMap.id).hasClass("upscale");	
				}else{
					isUpscale = $("#mapSizeControl_"+mapWindow.$thematicMap.ui.sMap.id).hasClass("upscale");	
				}
			}
		}
		if(isUpscale){
			$(".MapArea,.Map,#themeticFrame").height($(window).height()-111);
		}else{
			$(".MapArea,.Map,#themeticFrame").height($(window).height());
		}
		$(window).scrollTop(0);
	}
	/**
	 * 통계주제도
	 */
	$sgisMobileThematic.ui = {
		categoryInfo : {},
		currentCategory : "",
		resNum : 0,
		showPageSize : 0,
		currentPageNum : 0,
		initialize : function(){
			$sgisMobileThematic.ui.currentCategory = $sgisMobile.ui.parameters.theme!=undefined&&$sgisMobile.ui.parameters.theme!=""?$sgisMobile.ui.parameters.theme:"CTGR_001";
		},
		getThematicMapList : function(currentPage){
			var sopAbs = new sop.portal.absAPI();
			sopAbs.onBlockUIPopup();
			currentPage = !$.isNumeric(currentPage)||currentPage>$sgisMobileThematic.ui.resNum?0:currentPage;
			$.ajax({
				url : contextPath + "/ServiceAPI/thematicMap/GetStatsThemeMapList.json",
				type:"POST",
				data: {
					cate_id:$sgisMobileThematic.ui.currentCategory,
					resultCnt:pageSize,
					p:currentPage
				},
				async: true,
				dataType:"json",
				success: function(data){
					if(data.errCd===0){
						$(".SubjectList").children().remove();
						if($(data.result.themeMapInfoList).size()>0){
							$.each(data.result.themeMapInfoList,function(cnt,themeMapInfo){
								var titleOption = {
									title : themeMapInfo.thema_exp,
									html : themeMapInfo.title,
									"class" : "List"
								};
								if(themeMapInfo.thema_map_type=="02"){
									titleOption.href = "javascript:apiLogWriteAndMoveUrl('"+contextPath+"/mobile/html/thematicMap/thematicMapMain.html?theme="+themeMapInfo.category+"&stat_thema_map_id="+themeMapInfo.stat_thema_map_id+"&mapType="+themeMapInfo.thema_map_type +"','" 
														+themeMapInfo.category+"','"+themeMapInfo.stat_thema_map_id+"','"+themeMapInfo.thema_map_type+"','"+titleOption.html+"')";
								}else{
									titleOption.href = "javascript:apiLogWriteAndMoveUrl('"+contextPath+"/mobile/html/thematicMap/frame/thematicMapMain.html?theme="+themeMapInfo.category+"&stat_thema_map_id="+themeMapInfo.stat_thema_map_id+"&mapType="+themeMapInfo.thema_map_type +"','" 
														+themeMapInfo.category+"','"+themeMapInfo.stat_thema_map_id+"','"+themeMapInfo.thema_map_type+"','"+titleOption.html+"')";
								}
								var subjectTitle = $("<a/>",titleOption);
								$(".SubjectList").append($("<li/>").append(subjectTitle,$("<a/>",{href:"#","class":"Info",text:"도움말"}).click(function(){
									$("#helf-text-box .Description").html(themeMapInfo.thema_exp.replace(/&lt;br&gt;/gi,'</br>'));
									$("#helf-text-box").fadeIn("fast");
								})));
							});
						}else{
							var subjectTitle = $("<a/>",{
								href : "#",
								text : "데이터가 존재하지않습니다",
								"class" : "List"
							});
							$(".SubjectList").append($("<li/>").append(subjectTitle));
						}
						var resNum = data.result.themeMapInfoListCount % pageSize ? 1 : 0;;
						var showPageSize = parseInt(data.result.themeMapInfoListCount / pageSize) + resNum;
						var currentPageNum = data.result.currentPage-1>resNum||data.result.currentPage-1<1?1:data.result.currentPage;
						
						$sgisMobileThematic.ui.resNum = resNum;
						$sgisMobileThematic.ui.showPageSize = showPageSize;
						$sgisMobileThematic.ui.currentPageNum = currentPageNum;
						
					}else{
						messageAlert.open("알림",data.errMsg);
					}
					sopAbs.onBlockUIClose();
				},
				error: function(data){
					sopAbs.onBlockUIClose();
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2248)로 문의하시기 바랍니다.");
					return false;
				}
			});
		},
		setSubmenu : function (division) {
			$("#thematicSubmenu").append(
				'<div class="Open_Type1" style="'+(division===1?'display:none;':'')+'">'+
					'<h3>주제선택</h3>'+
					(division===1?'<button class="BtnClose" id="closeSubject">주제닫기</button>':'')+
					'<div class="Subject">'+
						'<nav><a href="#" id="CTGR_001" class="subject1 M_on" >인구와 가구</a><a href="#" id="CTGR_002" class="subject2">주거와 교통</a><a href="#" id="CTGR_003" class="subject3">복지와 문화</a><a href="#" id="CTGR_004" class="subject4">노동과 경제</a><a href="#" id="CTGR_005" class="subject5">환경과 안전</a></nav>'+
					'</div>'+
					'<ul class="SubjectList"></ul>'+
				'</div>'+
				'<div id="helf-text-box" class="InfoBox" style="display:none;">'+
					'<div class="InfoText">'+
						'<div class="Description"></div>'+
                    '</div>'+
					'<div class="InfoBg">&nbsp;</div>'+	
                '<button class="BtnClose" type="button">도움말닫기</button>'+
				'</div>'
			);
			$("#thematicSubmenu>.Open_Type1").height(Math.max(($(window).outerHeight(true)-35),$("#thematicSubmenu>.Open_Type1").outerHeight(true)));
			$(".InfoBg,.BtnClose").click(function(){
				$("#helf-text-box").fadeOut("fast");
			});
			$(".Subject > nav > a").click(function(){
				$(".Subject > nav > a").removeClass("M_on");
				$(this).addClass("M_on");
				$sgisMobileThematic.ui.currentCategory = $(this).attr('id')
				$sgisMobileThematic.ui.getThematicMapList(0);
			});
		},
		pagenation : function () {
			$('.pagenation .pages').paging({
				current : $sgisMobileThematic.ui.currentPageNum,
				max : $sgisMobileThematic.ui.showPageSize,
				itemClass : 'page',
				itemCurrent : 'current',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				onclick : function (e, page) { // 페이지 선택 시
					$sgisMobileThematic.ui.getThematicMapList(page-1);
				}
			});
		},
	}
}(window, document));

function apiLogWriteAndMoveUrl(url,param1,param2,param3,title){
	var parameter = "theme="+param1+"&stat_thema_map_id="+param2+"&mapType="+param3;
	apiLogWrite2("L0", "L02", title, parameter , "00", "전국");
	location.href = url;
}