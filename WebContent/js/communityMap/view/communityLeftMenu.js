/**
 * 침여형소통지도 Left 메뉴에 관한 클래스
 * 
 * history : 
 * (주)유코아시스템, 1.0, 2016/01/14 초기작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$communityLeftMenu = W.$communityLeftMenu || {};
	
	$communityLeftMenu.ui = {
		curAddressSearchType:null,//주소 등록 타입 (map:위치선택,popup:주소선택)
		curAddressCenter:null,//등록될 주소 중심
		scrollOptions : {//스크롤 공통 옵션
        	axis:"xy",
        	callbacks: {
        		whileScrolling:function() {
        			//3Detph 가 안보이는 버그 해결책
        			if($(".quickBox.step03").find(".mCSB_container").position() != undefined) {
        				if($(".quickBox.step03").find(".mCSB_container").position().left >= 1000) {
        					$(".quickBox.step03").find(".mCSB_container").css("left", "0px");
	    				}	
        			}
        		}
        	}
        },
		/**
		 * @name         : $communityLeftMenu.ui.leftLayerPopupAllClose
		 * @description  : 레이어 팝업 전체 닫기
		 * @date         : 2016. 01. 17.
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		leftLayerPopupAllClose : function(){
			$("div[data-layer=true]").removeClass("M_on");
			if($communityMapCommon.hasText($communityView.ui.markersObject)){
				$.each($communityView.ui.markersObject,function(cnt,node){
					if($(node._icon).hasClass("community-on")&&$communityMapCommon.hasText(node.originalMargin)){
						$(node._icon).css({
							"margin-left" : node.originalMargin["margin-left"],
							"margin-top" : node.originalMargin["margin-top"]
						}).removeClass("community-on");
					}
				});
			}
		},
		/**
		 * @name         : $communityLeftMenu.ui.closeCommunity
		 * @description  : 소통지도 폐쇄
		 * @date         : 2016. 01. 17.
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		closeCommunity : function(){
			$communityMapCommon.confirm(
				"알림","폐쇄 하시겠습니까?",[{
					title : "확인",
					func : function(opt) {
						var obj = new sop.portal.closeCommunity.api();
						obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
						obj.request({
							method : "POST",				
							async : true,
							url : contextPath + "/ServiceAPI/community/communityClose.json"
						});
					}
				},{title : "취소"}   
			]);
		},
		/**
		 * @name         : $communityLeftMenu.ui.outCommunity
		 * @description  : 소통지도 탈퇴
		 * @date         : 2016. 02. 05.
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		outCommunity : function(){
			$communityMapCommon.confirm(
				"알림","탈퇴 하시겠습니까?",[{
					title : "탈퇴요청",
					func : function(opt) {
						var obj = new sop.portal.outCommunity.api();
						obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
						obj.request({
							method : "POST",				
							async : true,
							url : contextPath + "/ServiceAPI/community/communityMemberApprovalOut.json"
						});
					}
				},{title : "취소"}   
			]);
		},
		/**
		 * @name         : $communityLeftMenu.ui.joinCommunity
		 * @description  : 소통지도 가입
		 * @date         : 2016. 01. 17.
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		joinCommunity : function(){
			var obj = new sop.portal.joinCommunity.api();
			obj.addParam("cmmnty_map_id", $communityMapCommon.getParameter("cmmnty_map_id"));
			obj.request({
				method : "POST",				
				async : true,
				url : contextPath + "/ServiceAPI/community/communityMemberApprovalRegist.json"
			});
		},
		/**
		 * 
		 * @name         : showNumberClick
		 * @description  : 통계값 표출유무 버튼 클릭 시
		 * @date         :  
		 * @author	     : 
		 * @history 	 :
		 */
		showNumberClick : function() {
			var map_id = $communityMap.ui.curMapId;
			var legend = $communityMap.ui.mapList[map_id].legend;
			//통계표출 on일 경우 off로 변경
			if(legend.numberData) {
				$("#showNumberBtn").removeClass("on");
				$("#showNumberBtn").text("off");
			} else {	//통계표출 off일 경우 on으로 변경
				$("#showNumberBtn").addClass("on");
				$("#showNumberBtn").text("on");
			}
			//통계값 표출유무 설정 호출
			legend.showNumberData();
		},
		/**
		 * @name         : defaultMydata
		 * @description  : 통계값 표출유무 버튼 클릭 시
		 * @date         :  
		 * @author	     : 이주혁 
		 * @history 	 :
		 */
		defaultMydata : function() {
			if($("#defaultMydataBtn").hasClass("on")) {
				$("#defaultMydataBtn").removeClass("on");
				$("#defaultMydataBtn").text("off");
				
				$.each($communityMap.ui.mydataMarkers,function(cnt,node){
					node.remove();
				});
			} else {
				$("#defaultMydataBtn").addClass("on");
				$("#defaultMydataBtn").text("on");
				$.each($communityMap.ui.mydataMarkers,function(cnt,node){
					node.addTo($communityMap.ui.mapList[$communityMap.ui.curMapId].gMap);
				});
			}
		},
		/**
		 * @name           : getStats
		 * @description    : 현재위치로 통계값 얻기
		 * @date           : 2016.06.14
		 * @author	       : 나광흠 
		 * @history 	   :
		 * @param callback : callback
		 */
		getStats : function(callback){
			var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
			if(map.curPolygonCode>2){
				var center = map.gMap.getCenter();
				$communityMap.ui.curCenter = [center.x, center.y];
				if(map.curPolygonCode==3){
					$communityMap.ui.curAdmCd = map.curSidoCd;
					$communityMap.ui.curZoom = 4;
				}else if(map.curPolygonCode==4){
					$communityMap.ui.curAdmCd = map.curSidoCd+map.curSiggCd;
					$communityMap.ui.curZoom = 6;
				}else{
					$communityMap.ui.curZoom = 10;
					$communityMap.ui.curAdmCd = map.curSidoCd+map.curSiggCd+map.curDongCd;
				}
			}else{
				$communityMap.ui.curAdmCd = "";
				$communityMap.ui.curZoom = 2;
				$communityMap.ui.curCenter = [989594, 1818429];
				map.gMap.setZoom(2);
			}
			var currentList = $("#history-list .dragItem>a.M_on").parent("li");
			var type = currentList.data("list"),autoDownBoundary = false,setStatCallback = function(){
				if($communityMap.ui.mydataMarkers.length>0&&$("#defaultMydataBtn").hasClass("on")){
					$.each($communityMap.ui.mydataMarkers,function(cnt,node){
						node.addTo($communityMap.ui.mapList[$communityMap.ui.curMapId].gMap);
					});
				}
				if($("#poi-list a.M_on").length>0){
					$communityMap.ui.getCompanyPoi($("#poi-list a.M_on").parent("li").data("list"));
				}
				if(typeof callback === "function"){
					callback();
				}
			};
			if(currentList.data("type")=="history"){
				$communityMap.ui.setStats(type,autoDownBoundary,true,setStatCallback);
			}else{
				return;
			}
		},
		/**
		 * @name         : showNumberSetting
		 * @description  : 통계값 표출유무 연동 (범례에서 선택 시, 지도 선택 시)
		 * @date         :  
		 * @author	     : 이주혁
		 * @history 	 :
		 */
		showNumberSetting : function() {
			var map_id = $communityMap.ui.curMapId;
			var legend = $communityMap.ui.mapList[map_id].legend;
			//통계표출 on일 경우
			if(legend.numberData) {
				$("#showNumberBtn").addClass("on");
				$("#showNumberBtn").text("on");
			} else {	//통계표출 off일 경우
				$("#showNumberBtn").removeClass("on");
				$("#showNumberBtn").text("off");
			}
		}
	};

	$communityLeftMenu.event = {
		/**
		 * 
		 * @name         : $communityLeftMenu.event.setUIEvent
		 * @description  : Left 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2015. 10. 26. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			$communityLeftMenu.event.poi.setUIEvent();
			$communityLeftMenu.event.notice.setUIEvent();
			
			$.cssHooks.backgroundColor = {
				get: function(elem) {
					if (elem.currentStyle)
						var bg = elem.currentStyle["backgroundColor"];
					else if (window.getComputedStyle)
						var bg = document.defaultView.getComputedStyle(elem,
							null).getPropertyValue("background-color");
					if (bg.search("rgb") == -1)
						return bg;
					else {
						bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

						function hex(x) {
							return ("0" + parseInt(x).toString(16)).slice(-2);
						}
						if (bg != null) {
							return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
						} else {
							return "#fff";
						}
					}
				}
			};

			$.cssHooks.color = {
				get: function(elem) {
					if (elem.currentStyle)
						var bg = elem.currentStyle["color"];
					else if (window.getComputedStyle)
						var bg = document.defaultView.getComputedStyle(elem,
							null).getPropertyValue("color");
					if (bg.search("rgb") == -1)
						return bg;
					else {
						bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

						function hex(x) {
							return ("0" + parseInt(x).toString(16)).slice(-2);
						}
						if (bg != null) {
							return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
						} else {
							return "#fff";
						}
					}
				}
			};
			
			var body = $("body");
			
			//datepicker
			$("#periodDateStart,#periodDateEnd").datepicker({
				dateFormat : "yy.mm.dd",
				showButtonPanel : true,
				dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
				monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
				monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
				changeYear : true,
				changeMonth : true,
				minDate : '-1y',
				onSelect:function (value, element){
					if(element.id=="periodDateStart"){
						$("#periodDateEnd").datepicker("option", "minDate", value);
					}else{
						$("#periodDateStart").datepicker("option", "maxDate", value);
					}
				}
			});
			//탭 클릭
			$("#poi-list-tab>li>a").click(function(){
				var type = $(this).data("id");
				$("#poi-list-tab>li").removeClass("M_on");
				$(this).parent().addClass("M_on");
				$("div[id$=-community-box]").hide();
				$("#"+type+"-community-box").show();
				$("#searchWord").val($communityLeftMenu.ui.communityPoi[type].searchWord);
			});
			
			//스크롤 생성
	    	$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
	    	$(".scrollBox, .dataSideScroll, .scrolls, .mapResultList,#layer-popup-box .detail_box").mCustomScrollbar($communityLeftMenu.ui.scrollOptions);
			
			//하단 패밀리사이트
			body.on("click","#bottomService",function(){
				var ck = $(this).hasClass("on");
				if(!ck){
					$(this).addClass("on");
					$("#bottomServiceLayer").show();
				}else{
					$(this).removeClass("on");
					$("#bottomServiceLayer").hide();
				}
			});
			
			//닫기 버튼 animate
			$(".LayerClose").hover(function() {
				$(this).animateRotate(90);
			}, function() {
				$(this).animateRotate(-90);
			});
			
			//통계리스트 클릭시
			body.on("click",".sideQuick.sq03",function(){
				if(!$(this).hasClass("on")){
					$(this).addClass("on");
					$(".sqListBox.sq03").stop().animate({"left":"430px"},200);
				}else{
					$(this).removeClass("on");
					$(".sqListBox.sq03").stop().animate({"left":"-640px"},200);
				}
			});
			$(".cm_basic a[data-move=true]").click(function(){
				var zoom,adm_cd=$(this).data("adm-cd").toString();
				if(adm_cd.length<2||adm_cd=="00"){
					zoom = 2;
				}else if(adm_cd.length==2){
					zoom = 4;
				}else if(adm_cd.length==5){
					zoom = 6;
				}else if(adm_cd.length==7){
					zoom = 10;
				}
				$communityMap.ui.mapList[$communityMap.ui.curMapId].mapMove([parseFloat($(this).data("x-coor")),parseFloat($(this).data("y-coor"))],zoom,false);
				if($("#showMapStatBtn").text()=="on"){
					setTimeout(function(){
						$communityLeftMenu.ui.getStats();
					},500);
				}
			});
			function mydata(){
				if($communityMap.ui.mydataMarkers.length>0){
					if($("#defaultMydataBtn").hasClass("on")) {
						$.each($communityMap.ui.mydataMarkers,function(cnt,node){
							node.addTo($communityMap.ui.mapList[$communityMap.ui.curMapId].gMap);
						});
						$("#defaultMydataBtn").addClass("on");
						$("#defaultMydataBtn").text("on");
					}
				}
			}
			
			function setStats(element){
				console.log(element);
				element.parent("ul").find("input:checkbox").prop("checked",false);
				element.find("input:checkbox").prop("checked",true);
				element.parent("ul").find("li>a").removeClass("M_on");
				element.parent("ul").find("li[data-list="+element.data("list")+"]>a").addClass("M_on");
				if(element.data("type")=="history"){
					$communityLeftMenu.ui.getStats(function(){
						mydata();
					});
					var legend = $communityMap.ui.mapList[$communityMap.ui.curMapId].legend;
					var legendBox = $("#legendBox_"+legend.id);
					legendBox.removeClass(legendBox.attr("data-ing"));
					legendBox.attr("data-ing", "min");
					$("#btn_legend_"+legend.id).click();
				}else if(element.data("type")=="company"){
					$communityMap.ui.getCompanyPoi(element.data("list"));
				}
			}
			//버튼 드래그설정
			$("#searchBtnResultRgn .dragItem").draggable({ 
				revert : "invalid",
				helper : "clone",
				cursor : "pointer",
				zIndex : 100,
				cursorAt : {left : -5},
				appendTo : "body",
				drag : function(e, ui) {
					$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
				},
				stop : function(e, ui) {
					$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
				}
			}).dblclick(function(e){
				setStats($(e.currentTarget));
			});
			
			$("#searchBtnResultRgn input:checkbox").change(function(){
				var dragItem = $(this).parents("li");
				var map = $communityMap.ui.mapList[$communityMap.ui.curMapId];
				if($(this).is(":checked")){
					setStats(dragItem);
				}else{
					$(this).parent("a").removeClass("M_on");
					if(dragItem.data("type")=="history"){
						var legend = $communityMap.ui.mapList[$communityMap.ui.curMapId].legend;
						var legendBox = $("#legendBox_"+legend.id);
						legendBox.removeClass(legendBox.attr("data-ing"));
						map.dataGeojson.remove();
						mydata();
						legendBox.attr("data-ing", "max");
						if($("#map-stat .chart").highcharts()){
							$("#map-stat .chart").highcharts().destroy();
						}
						$("dt[data-id=map-chart],dd[data-id=map-chart]").hide();
						$("#btn_legend_"+legend.id).click();
					}else if(dragItem.data("type")=="company"){
						var poiControl = map.mapBtnInfo;
						poiControl.isShow = false;
						$("#poi-list a").removeClass("M_on");
				    	poiControl.clearPOI();
					}
				}
			});
			//공유
			$("#share-facebook").click(function(){
				if($communityLeftMenu.ui.poiRegist.checkStartDate()){
					window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href), "_blank"); 
				}
			});
			$("#share-twitter").click(function(){
				if($communityLeftMenu.ui.poiRegist.checkStartDate()){
					window.open("https://twitter.com/intent/tweet?url="+encodeURIComponent(location.href), "_blank"); 
				}
			})
			$(".cm_info>.cm_info_s>.cn_tab_btn:not(.no_tab),.cm_info>.cm_basic>h3:not(.no_tab),.cn_tab_btn:not(.no_tab),.cm_info:not(.no_tab)>.cm_basic>.btn_cm_more:not(.no_tab)").click(function(){
				$communityLeftMenu.ui.leftLayerPopupAllClose();
				$(".menu-box>.cm_info>.cm_info_s").removeClass("M_on").css({"min-height":""});
				$(this).parents(".cm_info_s").addClass("M_on");
				$("#community-left-menu").mCustomScrollbar("scrollTo",$(this).parents(".cm_info_s"),{scrollInertia:0});
				return false;
			});
			function changeSymbol(){
				$communityView.ui.searchSymbol = $("#symbol-list>a[class!=disabled]").map(function(){
					return $(this).data("id");
				}).get().join();
				$communityLeftMenu.ui.communityPoi.all.currentPageIndex = 1;
				$communityLeftMenu.ui.communityPoi.all.getList();
				$communityLeftMenu.ui.communityPoi.my.currentPageIndex = 1;
				$communityLeftMenu.ui.communityPoi.my.getList();
				$communityView.ui.mapMarksLists();
			}
			$("#symbol-list>a").click(function(){
				$(this).toggleClass("disabled");
				changeSymbol();
				return false;
			});
			$("#symbol-all").click(function(){
				if($("#symbol-list>a.disabled").length>0){
					$("#symbol-list>a").removeClass("disabled");
				}else{
					$("#symbol-list>a").addClass("disabled");
				}
				changeSymbol();
				return false;
			});
			body.on("click","#poi-detail-image-list>span",function(){
				if($(this).data("thumbnail-path")!="none"){
					$("#poi-detail-image-list>span").removeClass("M_on");
					$(this).addClass("M_on");
					$("#poi-detail-image").css({"background-image":"url("+$(this).data("thumbnail-path")+")"}).data("original-path",$(this).data("original-path"));
				}
				return false;
			});
			$("#poi-detail-image").click(function(){
				//mng_s 20180103 leekh
				window.open($(this).data("original-path"),"_blank");
				//mng_e 20180103 leekh
				return false;
			});
			$(".write_icon>label[title]").tooltip({
				position: {
					my: "top+28", at: "right top"
				}
			});
		}
	};
	/*********** 폐쇄 시작 **********/
	(function() {
		$class("sop.portal.closeCommunity.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == "0") {
					if(res.result.success){
						$communityMapCommon.alert("알림", "폐쇄되었습니다",function(){
							location.href=contextPath+"/view/community/intro";
						});
					}else{
						$communityMapCommon.alert("알림", "실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			}, 
			onFail : function(status) {
			}
		});
	}());
	/*********** 폐쇄 종료 **********/
	/*********** 소통지도 탈퇴 시작 **********/
	(function() {
		$class("sop.portal.outCommunity.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == "0") {
					if(res.result.success){
						$communityMapCommon.alert("알림", "탈퇴 신청이 되었습니다",function(){
							location.reload(true);
						});
					}else{
						$communityMapCommon.alert("알림", "실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 소통지도 탈퇴 종료 **********/
	/*********** 소통지도 가입 시작 **********/
	(function() {
		$class("sop.portal.joinCommunity.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == "0") {
					if(res.result.success){
						$communityMapCommon.alert("알림", "가입 승인요청 되었습니다.",function(){
							location.reload(true);
						});
					}else if(res.result.cmmntyapp){
						$communityMapCommon.alert("알림", "가입 되었습니다.",function(){
							location.reload(true);
						});
					}else{
						$communityMapCommon.alert("알림", "실패하였습니다");
					}
				} else {
					$communityMapCommon.alert("알림", res.errMsg);
				}				
			},
			onFail : function(status) {
			}
		});
	}());
	/*********** 소통지도 가입 종료 **********/
	$.fn.animateRotate = function(angle, duration, easing, complete) {
		var args = $.speed(duration, easing, complete);
		var step = args.step;
		return this.each(function(i, e) {
			args.complete = $.proxy(args.complete, e);
			args.step = function(now) {
				$.style(e, 'transform', 'rotate(' + now + 'deg)');
				if (step) return step.apply(e, arguments);
			};

			$({
				deg: 0
			}).animate({
				deg: angle
			}, args);
		});
	};
}(window, document));