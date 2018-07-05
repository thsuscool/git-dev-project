/**
 * 살고싶은 우리동네 검색관련
 * 
 * history : (주)유코아시스템, 1.0, 2015/12/23  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$(document).ready(function() {
		$houseAnalysisMap.event.setUIEvent();
	});
	$houseAnalysisMap.event = {
		/**
		 * @name		 : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date		 : 2015. 11. 21. 
		 * @author		 : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			//지도 생성
			$houseAnalysisMap.ui.createMap("mapRgn_1", 0);
			$("a").tooltip({ 
				open: function( event, ui ) {
					var target = $(this);
					setTimeout(function() {
						$(".ui-tooltip .subj").text(target.attr("data-subj"));
						 ui.tooltip.css("max-width", "1200px");
						 ui.tooltip.css("top", event.clientY);
					},100);
					
				},
				position: {
				      my: "left+10 top", at: "right top", 
				      collision : "flip",
				      using: function( position, feedback ) {
				    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
				    		  $( this ).css( position ).prepend("<span class='subj'></span>");
				    	  }else {
				    		  $( this ).css( position ); 
				    	  }
				    	  
				          $( "<div>" )
				            .addClass( feedback.vertical )
				            .addClass( feedback.horizontal )
				            .appendTo( this );
				      }
				},
				content: function () {
					var title = $(this).attr("title");
					title = title.replace(/&lt;p&gt;/gi, '');
					title = title.replace(/&lt;p&gt;/gi, '');
					title = title.replace(/&lt;/gi, '<');
					title = title.replace(/&gt;/gi, '>');
					title = title.replace(/&quot;/gi, '');
					$(this).attr("title", title); 
					return $(this).prop('title');
		        }
			});
			//navigator 생성
			var mapNavi = new mapNavigation.UI();
			mapNavi.create("mapNavi_1", 1, $houseAnalysisMap.ui);
			$houseAnalysisMap.event.leftMenu();
			$houseAnalysisMap.event.databoard();
			$houseAnalysisMap.event.lifeStyle();
			$houseAnalysisMap.event.idealtype();
			if($houseAnalysisMap.ui.getParameter("type")==="full"){
				$houseAnalysisMap.ui.doMax();
			}
			
			//========== 2017.11.06 [개발팀] LBDMS 전송데이터 연계 START ==========//
			$("#current-sido-select").change(function() {
				var sido_cd = $(this).val();
				if (sido_cd != "00") {
					$houseAnalysisMap.search.lbdms.getLbdmsCategoryDataList(sido_cd);
				}
			});
			
			$("#current-sgg-select").change(function() {
				var sido_cd = $("#current-sido-select option:selected").val();
				var sgg_cd = $(this).val();
				var adm_cd;
				if (sido_cd != "00") {
					adm_cd = sido_cd;
					if (sgg_cd != "999") {
						adm_cd = sido_cd + sgg_cd;
					}
					$houseAnalysisMap.search.lbdms.getLbdmsCategoryDataList(adm_cd);
				}
			});
			//========== 2017.11.06 [개발팀] LBDMS 전송데이터 연계 END ==========//
			
		},
		/**
		 * @name		 : leftMenu
		 * @description  : 메뉴 이벤트. 
		 * @date		 : 2016. 8. 16. 
		 * @author		 : 나광흠
		 * @history 	 :
		 * @param
		 */
		leftMenu : function(){
			//스크롤 생성
			$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
			$(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({axis:"xy"});
			$(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({
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
			});
			//좌표이동 스타트
			if($houseAnalysisMap.ui.getParameter("x_cord")){
				
			}
			//좌표이동 end
			if($houseAnalysisMap.ui.getParameter("sido_cd")){
				$houseAnalysisMap.leftmenu.defaultSidoCd=$houseAnalysisMap.ui.getParameter("sido_cd");
			}else{
				$houseAnalysisMap.leftmenu.defaultSidoCd="00";
			}
			if($houseAnalysisMap.ui.getParameter("sgg_cd")){
				$houseAnalysisMap.leftmenu.defaultSggCd=$houseAnalysisMap.ui.getParameter("sgg_cd");
			}else{
				$houseAnalysisMap.leftmenu.defaultSggCd="999";
			}
			
			$houseAnalysisMap.leftmenu.getSidoList("current",$houseAnalysisMap.leftmenu.defaultSidoCd,$houseAnalysisMap.leftmenu.defaultSggCd,function(){
				var changeZoom = 0;
				if($.isNumeric($houseAnalysisMap.ui.getParameter("zoom"))){
					changeZoom = parseInt($houseAnalysisMap.ui.getParameter("zoom"));
				}
				
				//위치정보 들어왔을때 처리 start 2017.05.16 leekh 추가 start
				var coord_x = $("#current-sgg-select option:selected").data("coor-x");
				var coord_y = $("#current-sgg-select option:selected").data("coor-y");
				if($houseAnalysisMap.ui.getParameter("coord_x")||$houseAnalysisMap.ui.getParameter("coord_y")){
					coord_x = $houseAnalysisMap.ui.getParameter("coord_x");
					coord_y = $houseAnalysisMap.ui.getParameter("coord_y");
				}
				
					//위치정보 들어왔을때 처리 start 2017.05.16 leekh 추가 end
					
				if($houseAnalysisMap.ui.getParameter("sgg_cd")){
					var zoom = 6+changeZoom;
					
					//$("#current-sgg-select option:selected").data("coor-x")
					//$("#current-sgg-select option:selected").data("coor-y")
					$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].mapMove([coord_x,coord_y],(zoom>1?zoom:1));
				}else if($houseAnalysisMap.ui.getParameter("sido_cd")){
					var zoom = 4+changeZoom;
					$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].mapMove([coord_x,coord_y],(zoom>1?zoom:1));
				}
			});
			$houseAnalysisMap.leftmenu.getSidoList("stand-recommend","00","999");
			$houseAnalysisMap.leftmenu.getSidoList("inter-recommend",$houseAnalysisMap.leftmenu.defaultSidoCd,$houseAnalysisMap.leftmenu.defaultSggCd);
			$houseAnalysisMap.leftmenu.getSidoList("ideal-type",$houseAnalysisMap.leftmenu.defaultSidoCd,$houseAnalysisMap.leftmenu.defaultSggCd);
			//시도 이벤트
			$("body").on("change","select[id$=-sido-select]",function(){
				$houseAnalysisMap.leftmenu.getSggList($(this).data("type"),$(this).val(),"");
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
			});
			//주거현황보기에서 시군구 바뀌면 동작하는 이벤트
			$("body").on("change","#current-sgg-select",function(){
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
			});
			//추천지역찾기에서 기준지역 바뀌면 동작하는 이벤트
			$("body").on("change","#stand-recommend-sido-select,#stand-recommend-sgg-select",function(){
				$houseAnalysisMap.leftmenu.getStandardAreaList($("#stand-recommend-sido-select").val(),$("#stand-recommend-sgg-select").val());
			});
			//주거현황보기, 추천지역찾기, 위치보기 클릭시
			$("body").on("click", "#look-abode,#search-recommend,#search-poi", function(){
				var title;
				$("#quick-box-sub-title").text($(this).data("title"));
				$(".stepClose").data("id",$(this).attr("id"));
				var on = $(this).hasClass("on");
				$(".menu-box").hide();
				$("#"+$(this).attr("id")+"-box").show();
				$(".sideQuick").removeClass("on");
				if(!on){
					//추천지역찾기, 주거현황보기 사이즈 달리하기 위하여 적용
					if($(this).attr("id")=="look-abode"){
						$(".quickBox").css('width','345px');
						$(".scrollBox").css('width','345px');
						$(".scrollBox .mCSB_container").css('width','345px');
						$(".IndexSelect ul").css('left','50%');
						$(".IndexSelect ul").css('width','150px');
					}else{
						$(".quickBox").css('width','478px')
						$(".scrollBox").css('width','478px');
						$(".scrollBox .mCSB_container").css('width','478px');
						$(".IndexSelect ul").css('left','140px');
						$(".IndexSelect ul").css('width','310px');
					}
					$(".quickBox").stop().animate({"left":"0"},200);
					$(this).addClass("on");
				}else{ 
					$houseAnalysisMap.leftmenu.closeAnimate($(this).attr("id"));
				}
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
			});
			//닫기 버튼 클릭 시
			$("body").on("click",".stepClose",function(){ 
				$houseAnalysisMap.leftmenu.closeAnimate($(this).data("id"));
			});
			//지역선택 체크박스 이벤트
			$("#look-select-location").change(function(){
				$("#current-location-select select").prop("disabled",!$(this).is(":checked"));
				if($(this).is(":checked")){
					$("#current-location-select").css("opacity","1");
					if($("#look-select-type").is(":checked")&&$("#current-sido-select option[value=00]").length<=0){
						$("#current-sido-select").prepend($("<option/>",{"value":"00","text":"전국","data-coor-x":"955128.1534205126","data-coor-y":"1950426.3473409272"}));
					}
				}else{
					$("#current-location-select").css("opacity","0.5");
				}
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
			});
			//지표선택 체크박스 이벤트
			$("#look-select-type").change(function(){
				var allLocation = $("#current-sido-select").val()=="00";
				$("#current-sido-select option[value=00]").remove();
				if($(this).is(":checked")){
					$("#look-select>li>ul>li>a").tooltip("enable");
					$("#look-select").removeClass("UnSelect");
					$("#current-sido-select").prepend($("<option/>",{"value":"00","text":"전국","data-coor-x":"955128.1534205126","data-coor-y":"1950426.3473409272"}));
				}else{
					$("#look-select>li>ul>li>a").tooltip("disable");
					$("#look-select").addClass("UnSelect");
					if(allLocation){
						$("#current-sido-select").trigger("change");
					}
				}
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
			});
			//대분류 클릭
			$(".HouseMap .IndexSelect li[class^=index]>a").click(function(){
				var continueStatus = true;
				if($(this).parents(".menu-box").attr("id")=="look-abode-box"&&!$("#look-select-type").is(":checked")){
					continueStatus = false;
				}
				if(continueStatus){
					$(this).parents(".menu-box").find(".HouseMap .IndexSelect li[class^=index]").removeClass("M_on");
					$(this).parent("li").addClass("M_on");
					if($(this).parents(".menu-box").attr("id")!="search-recommend-box"){
						$(this).parents(".menu-box").find(".HouseMap .IndexSelect li[class^=index]>ul>li").removeClass("M_on");
						//TODO 오승찬 주무관이 주거현황보기 지표선택에서 자연은 디폴트로 녹지비율로 해달라고 해서 현재 이렇게 개발 되어있음 필요 없으면 else 안에 있는 녀석만 밖으로 빼주고 if else 지워주시면 됩니다.
						if($(this).parents("li.index1").children("a").data("id")=="HML0001"){
							$(this).parents(".menu-box").find(".HouseMap .IndexSelect li[class^=index].M_on>ul>li:eq(2)").addClass("M_on");
						}else{
							$(this).parents(".menu-box").find(".HouseMap .IndexSelect li[class^=index].M_on>ul>li:eq(0)").addClass("M_on");
						}
					}
				}
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
				return false;
			});
			//주거현황보기 중분류 클릭
			$("#look-abode-box .HouseMap .IndexSelect li[class^=index]>ul>li>a").click(function(){
				if($("#look-select-type").is(":checked")){
					$("#look-abode-box .HouseMap .IndexSelect li[class^=index]>ul>li").removeClass("M_on");
					$(this).parent("li").addClass("M_on");
				}
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
				return false;
			});
			//설정된 지표 전체 삭제
			$("body").on("click","#recommend-search-list-delete",function(event,callback){
				$("#LifeStyleSelect>li").removeClass("M_on");
				$("#search-recommend-box .HouseMap .IndexSelect li[class^=index]>ul>li").removeClass("M_on");//중분류 class 제거
				$("#search-recommend-box .HouseMap .IndexSelect li[class^=index]>ul>li").addClass("UnSelect");//중분류 class 추가
				$("#recommend-search-list").empty();//recommend-search-list 영역 삭제 처리
				if(typeof callback === "function"){
					callback();
				}
			});
			function percentCalculate(number){
				var left = "50%",text="중",order="2";
				if(number<390){
					left = "0%";
					text = "하";
					order = "1";
				}else if(number>423){
					left = "100%";
					text = "상";
					order = "3";
				}
				return {left:left,text:text,order:order};
			}
			//관심지 가중치 변경시 기준지 가중치도 같이 변경토록 변경
			function moveBar(event,element){
				var result = $(element).parents("li.sub-class").hasClass("M_on");
				if(result){
					var type = percentCalculate(event.pageX);
					var typeId = element.parents(".sub-class").children("a").data("id");
					$("#recommend-search-list li[data-id="+typeId+"]>span.step").text(type.text);
					$("#recommend-search-list li[data-id="+typeId+"]").data("order",type.order);
					$("#recommend-search-list li[data-id="+typeId+"]").data("asis-order",type.order);
					$(element).css("left",type.left).attr("title","중요도 "+type.text);
					$(element).tooltip({"position":{ my: "center top", at: "center bottom+10"}});
				}
				return result;
			}
			//추천지역찾기에서 지표설정의 막대기 클릭시
			$(".SetStepBar1>span").click(function(event,x){
				if($.isNumeric(x)){
					event.pageX = x;
				}
				moveBar(event,$(this).find(".SetStopPoint"));
			});
			//추천지역찾기에서 지표설정의 막대기 드래그 이벤트
			$("#search-recommend-box .IndexSelect>li").each(function(cnt,node){
				$(node).find(".SetStopPoint").draggable({
					containment:$(node).find(".SetStepBar1>span"),
					axis: "x",
					start: function(){
						$(this).tooltip("destroy");
					},
					stop: function(e) {
						moveBar(e,$(this));
					}
				});
			});
			$("#search-recommend-box .IndexSelect>li .SetStopPoint").tooltip().draggable("disable");
			//추천지역찾기 삭제버튼 이벤트
			$("body").on("click","#recommend-search-list .indexdelete",function(){
				var subClass = $(this).parent("li");
				$("#search-recommend-box .IndexSelect .sub-class>a[data-id="+subClass.data("id")+"]").parents(".sub-class").removeClass("M_on");
				$("#search-recommend-box .IndexSelect .sub-class>a[data-id="+subClass.data("id")+"]").parents(".sub-class").addClass("UnSelect");
				subClass.remove();
			});
			//추천지역찾기 중분류 클릭
			$("#search-recommend-box .HouseMap .IndexSelect li[class^=index]>ul>li>a").click(function(e,isLimitMax){
				if(isLimitMax===false){
					$houseAnalysisMap.search.isLimitMax = false;
				}else{
					$houseAnalysisMap.search.isLimitMax = true;
				}
				if($(this).parent("li").hasClass("M_on")){
					$(this).parents(".sub-class").find(".SetStopPoint").draggable("disable");
					$(this).parents(".sub-class").find(".SetStopPoint").tooltip("destroy");
					$("#recommend-search-list li[data-id="+$(this).data("id")+"]").remove();
					$(this).parent("li").removeClass("M_on");
					$(this).parent("li").addClass("UnSelect");
				}else{
					var max_length = 9;
					if($houseAnalysisMap.search.isLimitMax===true&&$("#recommend-search-list").children().length>=max_length){
						messageAlert.open("알림", "최대 "+max_length+"개까지 선택하실 수 있습니다");
					}else{
						//기준지역지표 표시및 데이터 추가
						var tempOrderText = $(this).parent().find(".SetStart>button.M_on").text();
						var tempSearchST = $(this).parent().find(".SetStart>button.M_on").val();
						$(this).parents(".sub-class").find(".SetStopPoint").draggable("enable");
						var pointElement = parseInt($(this).parents(".sub-class").find(".SetStopPoint")[0].style.left.replace("%",""));
						var typeText="중",typeOrder="2";
						if(pointElement<50){
							typeText="하";
							typeOrder="1";
						}else if(pointElement>50){
							typeText="상";
							typeOrder="3";
						}
						$("#recommend-search-list li[data-id="+$(this).data("id")+"]").remove();
						$("#recommend-search-list").append(
							$("<li/>",{
								"data-parent-id":$(this).data("parent-id"),
								"data-id":$(this).data("id"),
								"data-order":typeOrder, 
								"data-search-st":tempSearchST, 
								"data-asis-order":typeOrder,//관심지 가중치 변경시 기준지 가중치도 같이 변경토록 변경
								"data-disp-level":$(this).attr("data-level"), 
								"class":$(this).data("parent-id")
							}).append(
								$("<span/>",{"class":"bagic","text":tempOrderText}),
								$("<span/>",{"class":"step","text":typeText}),
								$(this).text().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
								$("<a/>",{href:"#","class":"indexdelete","html":'<img src="/img/house/set_delete.png" alt="설정된 지표 항목 삭제">'})
							)
						);
						$(this).parent("li").addClass("M_on");
						$(this).parent("li").removeClass("UnSelect");
						try{
							$(this).parents(".sub-class").find(".SetStopPoint").tooltip("enable");
						}catch(e){
							$(this).parents(".sub-class").find(".SetStopPoint").tooltip();
						}
					}
				}
				$houseAnalysisMap.leftmenu.setSubmitTooltipContent();
				return false;
			});
			//정렬기준 버튼 클릭 이벤트
			$("#search-recommend-box .SetStart button").click(function(){
				if($(this).parents("li.sub-class").hasClass("M_on")){
					$(this).parent().find("button").removeClass("M_on");
					$(this).addClass("M_on");
					$("#recommend-search-list li[data-id="+$(this).data("id")+"]").data("search-st",$(this).val()).find(".bagic").text($(this).text());
				}
			});
			//통계메뉴바 자동 닫기
			$("body").on("click",".menuAutoClose label",function(){
				var ck = $(this).hasClass("on");
				$(this).parent().find("label").removeClass("on");
				$(this).parent().find("input").removeAttr("checked");
				if(!ck){
					$(this).addClass("on");
					$(this).prev().attr("checked", "checked");
				}else{ 
					$(this).removeClass("on");
					$(this).prev().removeAttr("checked");
				}
			});
			//하단 패밀리사이트
			$("body").on("click","#bottomService",function(){
				var ck = $(this).hasClass("on");
				if(!ck){
					$(this).addClass("on");
					$("#bottomServiceLayer").show();
				}else{
					$(this).removeClass("on");
					$("#bottomServiceLayer").hide();
				}
			});
		},
		/**
		 * @name		 : databoard
		 * @description  : 데이터보드 이벤트. 
		 * @date		 : 2016. 8. 16. 
		 * @author		 : 나광흠
		 * @history 	 :
		 * @param
		 */
		databoard : function(){
			var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
			
			//투명도 설정 바
			$("#dataSlider").slider({
				range: "min",
				min: 5,
				max: 10,
				value: 10,
				slide: function( event, ui ) {  //ui.value
					$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value*0.1);
				}
			});
			$(".dataSideBox, .interactiveDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
			//닫기 버튼
			$("body").on("click",".dataSideBox .bar>a",function(){ 
				$(".dataSideBox").stop().animate({"right":"-1500px"},200);
				$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
			});
			//데이터보드 열고 닫기
			$("body").on("click",".interactiveDataBoard",function(){
				if(!$(this).hasClass("disabled")){
					var ck = $(this).hasClass("on");
					if(!ck){
						//일반 데이터보드
						$houseAnalysisMap.databoard.openDataBoard();
					}else{
						//데이터보드 닫기
						$houseAnalysisMap.databoard.closeDataBoard();
					}
				}
			});
			//탭 열고 닫기
			$("body").on("click",".dscList dt>a",function(){
				var ck = $(this).hasClass("on");
				if(!ck){
					$(this).addClass("on");
					$(this).parents("dt").next("dd").show();
				}else{
					$(this).removeClass("on");
					$(this).parents("dt").next("dd").hide();
				}
			});
			//지표 네비게이터 마우스 오버
			$("#indicator-navigator>li>a").mouseover(function(){
				$("#indicator-navigator>li").removeClass("M_on");
				$(this).parent().addClass("M_on");
			});
			//지표 네비게이터 툴팁 위로 올림
			$("#indicator-navigator ul a").tooltip("destroy");
			$("#indicator-navigator ul a").tooltip({
				content: function () {
					return $(this).prop('title');
				},
				"position":{ my: "center top", at: "center top+20"}
			});
			//지역 종합현황 보기 스파이더 차트 네비게이터 이벤트
			$("#spider-web-slide-navigator>a").click(function(){
				if($("#detailChart1").is(":visible")){
					$("#detailChart1").hide();
					$("#detailChart2").show();
				}else{
					$("#detailChart1").show();
					$("#detailChart2").hide();
				}
			});
			//지표 중분류 클릭시 이벤트
			$("#indicator-navigator a[data-m-class]").click(function(){
				var b_class_idx_id = $(this).data("b-class");
				var m_class_idx_id = $(this).data("m-class");
				$houseAnalysisMap.api.paramsArr["b_class_idx_id"]= b_class_idx_id;
				$houseAnalysisMap.api.paramsArr["m_class_idx_id"]= m_class_idx_id;
				$houseAnalysisMap.api.paramsArr["databoardChk"]= 0;
				$houseAnalysisMap.api.tmpOptions["params"] = $houseAnalysisMap.api.paramsArr;
				$("#interestList>div:eq(0)>a:eq(0)").data("coor-y");
					$("#detailChart1 .highcharts-axis-labels>span>span,#detailChart2 .highcharts-axis-labels>span>span").each(function(cnt,node){
					$(node).removeClass();
					if($(node).data("id")==b_class_idx_id){
						$(node).addClass("spider_on Spider_"+b_class_idx_id);
					}else{
						$(node).addClass("Spider_default");
					}
				});
				if($houseAnalysisMap.search.lastMapOption.center&&$houseAnalysisMap.search.lastMapOption.zoom){
					$houseAnalysisMap.noReverseGeoCode = true;
					var mClassObject=bClassInfoList[b_class_idx_id].indicator[m_class_idx_id],zoom;
					if(mClassObject.disp_level==1){
						zoom = 3
					}else if(mClassObject.disp_level==2){
						zoom = 5;
					}else if(mClassObject.disp_level==3){
						zoom = 8;
					}else{
						zoom = $houseAnalysisMap.search.lastMapOption.zoom;
					}
					map.gMap.setMaxZoom(13);
					map.mapMove($houseAnalysisMap.search.lastMapOption.center,zoom);				
					$houseAnalysisMap.api.tmpOptions["center"] = $houseAnalysisMap.search.lastMapOption.center;
					$houseAnalysisMap.api.tmpOptions["params"] = $houseAnalysisMap.api.paramsArr;
					setTimeout(function(){
						$houseAnalysisMap.chart.indicatorChart(mClassObject);
						if($houseAnalysisMap.search.isAbode==true){
							$houseAnalysisMap.search.abode.b_class_idx_id = b_class_idx_id;
							$houseAnalysisMap.search.abode.m_class_idx_id = m_class_idx_id;
						}else{
							$houseAnalysisMap.search.getRecommendObject().b_class_idx_id = b_class_idx_id;
							$houseAnalysisMap.search.getRecommendObject().m_class_idx_id = m_class_idx_id;
						}
						$houseAnalysisMap.search.mapStat.indicator.adm_cd = $houseAnalysisMap.search.activeAdmCd;
						$houseAnalysisMap.search.mapStat.indicator.b_class_idx_id = b_class_idx_id;
						$houseAnalysisMap.search.mapStat.indicator.m_class_idx_id = m_class_idx_id;
						$houseAnalysisMap.search.mapStat.indicator.search();
						return false;
					},500);
				}
			});
			//소지역정보 탭 버튼 이벤트
			$("#detailChart4 .ThisAreaInfo a.Title").click(function(){
				$houseAnalysisMap.chart.smallLocationChartBridge($(this).data("type"));
				$("#detailChart4 .ThisAreaInfo>ul>li").removeClass("M_on");
				$(this).parent("li").addClass("M_on");
				var firstRadio = $(this).parent("li").find(".chart>.radio>label:eq(0)>input:radio");
				firstRadio.prop("checked",true);
				firstRadio.trigger("change");
			});
			//소지역정보 라디오 버튼 변경 이벤트
			var isTrigger = false;
			$("#detailChart4 .radio>label").mouseup(function(){//중복 호출 방지
				isTrigger = $(this).children("input:radio").is(":checked");
			});
			$("#detailChart4 input:radio").click(function(e){//중복 호출 방지
				if(isTrigger){
					$(this).trigger("change");
				}
			});
			$("#detailChart4 input:radio").change(function(){
				if($houseAnalysisMap.search.lastMapOption.center&&$houseAnalysisMap.search.lastMapOption.zoom){
					var element = $(this);
					$houseAnalysisMap.noReverseGeoCode = true;
					map.mapMove($houseAnalysisMap.search.lastMapOption.center,$houseAnalysisMap.search.lastMapOption.zoom);
					setTimeout(function(){
						$houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId].legend.reverseOn = false;
						$houseAnalysisMap.search.mapStat.census.api = element.data("option").api;
						$houseAnalysisMap.search.mapStat.census.filter = element.data("option").filter;
						$houseAnalysisMap.search.mapStat.census.showData = element.data("option").showData;
						$houseAnalysisMap.search.mapStat.census.data_nm = element.data("option").data_nm;
						$houseAnalysisMap.search.mapStat.census.unit = element.data("option").unit;
						var commonParameters = {
							accessToken : accessToken,
							low_search : "1",
							bnd_year : map.bnd_year,
							adm_cd : $houseAnalysisMap.search.activeAdmCd
						};
						$houseAnalysisMap.search.mapStat.census.parameters = $.extend(true, commonParameters, element.data("parameters"));
						$houseAnalysisMap.search.mapStat.census.search();
					},500);
					for (var i=0;i<$(".ThisAreaInfo>ul>li").length;i++){
						if($(".ThisAreaInfo>ul>li:eq("+i+")").hasClass("M_on")){
							$houseAnalysisMap.api.paramsArr["radioIndex"]= i;
							$houseAnalysisMap.api.tmpOptions["params"] = $houseAnalysisMap.api.paramsArr;
							for(var j=0; j<$(".ThisAreaInfo>ul>li.M_on>div.chart>div.radio>label").length; j++){
								if($(".ThisAreaInfo>ul>li.M_on>div.chart>div.radio>label:eq("+[j]+")").children("input:radio").is(":checked")){
									$houseAnalysisMap.api.paramsArr["center"]= $houseAnalysisMap.search.lastMapOption.center;
									$houseAnalysisMap.api.paramsArr["radioSubIndex"]= j;
									$houseAnalysisMap.api.paramsArr["databoardChk"]= 1;
									$houseAnalysisMap.api.tmpOptions["params"] = $houseAnalysisMap.api.paramsArr;
								}
							}
						}
					}
				}
			});
			
			//아산시 고유정보 전원주택단지 이벤트
			$("#pastoralHouse").click(function(){
				if($(this).hasClass("on")){
					$houseAnalysisMap.ui.removeAsanHouseMarker();
					$(this).removeClass("on");
				}else{
					$houseAnalysisMap.search.asan.housePoint();
				}
			});
			//아산시 고유정보 전원주택단지 이벤트
			$("#returnToFarming").click(function(){
				if($(this).hasClass("on")){
					$("#returnToFarming,#pastoralHouse").removeClass("on");
					$("#detailChart4 .ThisAreaInfo>ul>li.M_on .radio input:radio:checked").trigger("change");
				}else{
					$houseAnalysisMap.search.asan.returnFarm();
				}
			});
		},
		/**
		 * @name		 : lifeStyle
		 * @description  : 라이프스타일 이벤트
		 * @date		 : 2016. 11. 30. 
		 * @author		 : 차수아
		 * @history 	 :
		 * @param
		 */
		lifeStyle : function(){
			$("#LifeStyleSelect>li>a").click(function(){
				if($(this).parent("li").hasClass("M_on")){
					$("#recommend-search-list-delete").trigger("click");
				}else{
					$houseAnalysisMap.search.isLimitMax = false;
					var aTag = $(this);
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
				}
				return false;
			});
			$("#LifeStyleBtn").click(function(){
				$(".Btn_lifestyle").toggleClass('open');
				$(".LifeStyleGuide").toggleClass('open');
			});
		},
		/**
		 * @name		 : idealtype
		 * @description  : 간편동네찾기 이벤트
		 * @date		 : 2016. 11. 30. 
		 * @author		 : 나광흠
		 * @history 	 :
		 * @param
		 */
		idealtype : function(){
			//간편동네찾기 검색 툴팁 추가
			$("#ideal-type-step1 a[title]").tooltip("destroy");
			$("#ideal-type-step1 a[title]").tooltip({ 
				position: {
					my: "top+50", at: "right top", 
					using: function( position, feedback ) {
						$(this).css( position );
						$("<div>").addClass( "arrow" ).addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
					}
				},
				content: function () {
					return $(this).prop('title');
				}
			});
			//간편동네찾기 열기
			$("#ideal-type").click(function(){
				$houseAnalysisMap.idealtype.init();
				$("#ideal-type-step").addClass("open");
				$("#ideal-type-step2").hide();
				$("#ideal-type-step1").show();
				return false;
			});
			//간편동네찾기 닫기
			$("#ideal-type-close-button").click(function(){
				$("#ideal-type-step").removeClass("open");
				$houseAnalysisMap.leftmenu.getSidoList("ideal-type",$houseAnalysisMap.leftmenu.defaultSidoCd,$houseAnalysisMap.leftmenu.defaultSggCd);
			});
			//a 태그 라디오 이벤트
			$("#ideal-type-step a[data-type=radio]").click(function(){
				var element = $(this);
				$.each($("#ideal-type-step a[data-type=radio][data-name="+$(this).data("name")+"]"),function(){
					var addImagePath = "";
					if($(this).is(element)){
						$(this).addClass("M_on");
						addImagePath = "_f";
					}else{
						$(this).removeClass("M_on");
					}
					$(this).children("span").css("background-image","url("+contextPath+"/img/house/liketown_icon"+$(this).data("parent-id")+"_"+$(this).data("id")+addImagePath+".png)");
				});
				return false;
			}).mouseover(function(){
				$(this).children("span").css("background-image","url("+contextPath+"/img/house/liketown_icon"+$(this).data("parent-id")+"_"+$(this).data("id")+"_f.png)");
			}).mouseout(function(){
				if(!$(this).hasClass("M_on")){
					$(this).children("span").css("background-image","url("+contextPath+"/img/house/liketown_icon"+$(this).data("parent-id")+"_"+$(this).data("id")+".png)");
				}
			});
			//라디오,체크박스 라디오 이벤트
			$("#ideal-type-step input:radio,#ideal-type-step input[data-type=radio]:checkbox").change(function(){
				$("#ideal-type-step label[data-name="+$(this).attr("name")+"]").removeClass("on");
				if($(this).is(":checked")){
					$("#ideal-type-step label[for="+$(this).attr("id")+"]").addClass("on");
					if($(this).is(":checkbox")){
						$("#ideal-type-step input[name="+$(this).attr("name")+"]:checkbox").not($(this)).prop("checked",false);
					}
				}
			});
			//다음 이벤트
			$("#ideal-type-next").click(function(){
				$houseAnalysisMap.idealtype.setSearchItem();
			});
			//이전 이벤트
			$("#ideal-type-prev").click(function(){
				$("#ideal-type-step1").show();
				$("#ideal-type-step2").hide();
			});
			//퍼즐 삭제
			$("#ideal-type-dropzone .Puzzle_close").click(function(){
				$houseAnalysisMap.idealtype.defaultPuzzleBox($(this).parent());
			});
			//퍼즐에 드랍시 이벤트
			$("#ideal-type-dropzone>div").droppable({
				accept: "#ideal-type-step2 li[data-drag=true]",
				over: function(event, ui) {
					console.log($("#ideal-type-puzzle>path:eq("+$(this).index()+")"));
					console.log(ui.draggable.data("over-color"));
					$("#ideal-type-puzzle>path:eq("+$(this).index()+")").attr("fill",ui.draggable.data("over-color"));
				},
				out: function(event, ui) {
					$("#ideal-type-puzzle>path:eq("+$(this).index()+")").attr("fill",$(this).data("original-color"));
				},
				drop: function(event, ui) {
					$houseAnalysisMap.idealtype.activePuzzleBox($(this),ui.draggable);
				}
			}).contextmenu(function(e){
				if($(this).hasClass("M_on")){
					$(this).find(".Puzzle_close").trigger("click");
				}
				return false;
			});
		}
	}
}(window, document));