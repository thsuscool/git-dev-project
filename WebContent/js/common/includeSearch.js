/**
 * 상단 검색에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/22  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */ 
(function(W, D) {
	W.$includeSearch = W.$includeSearch || {};
	
	$(document).ready(function() {
		
		//mng_s 주용민
		$("#search_magni").click(function(e){
			e.stopPropagation();
			if(!$("#search_magni").hasClass("on")){
				$("#search_magni").addClass("on");
				$("#searchBtn").attr("src","/img/common/btn_search_minus.png");
				$(".headerContents form fieldset").css({"height":"46px","margin-top":"-8px","border-radius":"40px"});
				$(".headerContents form").css({"overflow":"visible","width":"345px"});
				$(".headerContents form #searchKeyword").css({"font-size":"16px","width":"100%","height":"47px","padding-left":"40px"});
			}else{
				$("#search_magni").removeClass("on");
				$("#searchBtn").attr("src","/img/common/btn_search_plus.png");
				$(".headerContents form fieldset").css({"height":"30px","margin-top":"","border-radius":"15px"});
				$(".headerContents form").css("height","30px");
				$(".headerContents form").css({"overflow":"hidden","width":""});
				$(".headerContents form #searchKeyword").css({"font-size":"12px","width":"150px","height":"30px","padding-left":""});
			}
		});
		//mng_e 주용민
		 
		$includeSearch.log.headerClick();
		
		$includeSearch.log.mainClick();
		
		$includeSearch.event.setUIEvent();
		
		//현재 화면에 따른 대메뉴 강조
		$includeSearch.ui.menuUnderline();
		
	});
	
	$includeSearch.ui = {
			
			//현재 화면에 따른 대메뉴 강조
			menuUnderline : function() {
				var url = document.location.href;
				
				if(url.indexOf("/view/thematicMap") > -1) {	//통계주제도
					$(".gnb").find("li:eq(0)").addClass("on");	
				} else if(url.indexOf("/view/map/interactiveMap") > -1) {	//대화형통계지도
					$(".gnb").find("li:eq(1)").addClass("on");	
				} else if(url.indexOf("/view/bizStats/") > -1 || url.indexOf("/view/community") > -1 || url.indexOf("/view/house/houseAnalysisMap") > -1) {					//활용사례, 통계커뮤니티맵
					$(".gnb").find("li:eq(2)").addClass("on");
				} else if(url.indexOf("/view/board/") > -1) {					//알림마당
					$(".gnb").find("li:eq(4)").addClass("on");	
				}
			},
			
			//연관검색 화면으로 이동
			moveSearchList : function() {
				apiLogWrite2("F0","F60","Header 메뉴 클릭 로그","검색","00","없음");
				var val = $("#searchKeyword").val();
				var arrayKey = val.split(" ");
				if(val == "") { 
					messageAlert.open("알림", "검색어를 입력하세요.");
				} else {
					window.location.href = contextPath + "/view/common/searchList?searchKeyword=" + val;
				}
			},
			
			searchHide : function() {
				$(".searchPop").slideUp(10);	
				$(".headerContents form").removeClass("on"); 
			}
	};
	
	$includeSearch.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 06. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				/*-----------------------상단 스크립트 ---------------------*/
				var placeholderSelector ="#searchKeyword";
				$(placeholderSelector).placeholder();
				
				var body = $("body");
				body.on("keydown","#searchKeyword",function(){
					$(".searchPop").slideDown(200);	
				});
//				body.on("blur","#searchKeyword",function(){
//					$(".searchPop").slideUp(200);	
//				});
				
				//대메뉴 마우스 오버 시
				body.on("mouseover focus",".gnb>li>a",function(){
					$(".gnb>li").removeClass("on");
					$includeSearch.ui.menuUnderline();
					$(this).parent("li").addClass("on");
					var inx = $(this).parent().index(); 
					$(".submenuBox").stop().animate({"height":"180px"},200).css({"border-top-width":"1px","border-bottom-width":"1px"});
				}); 
				body.on("mouseover focus",".submenuBox li a",function(){					
					var inx = $(this).parents("ul").eq(0).index(".submenuBox ul");
					$(".gnb>li").removeClass("on"); 
					$includeSearch.ui.menuUnderline();
					$(".gnb>li").eq(inx).addClass("on");  					
				});
				body.on("mouseleave",".submenuBox",function(){
					$(".gnb>li").removeClass("on"); 
					$includeSearch.ui.menuUnderline();
					$(this).css({"border-top-width":"0px","border-bottom-width":"0px"})
					.stop().animate({"height":"0"},200);
				});
				body.on("mouseenter",".headerEtc, .submenuBox .etc, .headerContents form, .headerContents h1",function(e){
					$(".gnb>li").removeClass("on");
					$includeSearch.ui.menuUnderline();
					$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px"})
					.stop().animate({"height":"0"},200);
				}); 
				$(window).on("scroll",function(){
					$(".gnb>li").removeClass("on");
					$includeSearch.ui.menuUnderline();
					$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px", "height":"0"});
				}); 
				body.on("mouseover focus",".headerContents form a",function(e){
					//e.stopPropagation();
					$(".headerContents form").addClass("on");
					//mng_s 주용민
					$(".headerContents form fieldset").css("border","1px solid #2f4d6a");
					//mng_e 주용민
				});
				//mng_s 주용민
				body.on("mouseover focus","#search_keyword",function(e){
					$(".headerContents form").addClass("on");
					$(".headerContents form fieldset").css("border","1px solid #2f4d6a");
				});
				//mng_e 주용민
				body.on("focus","#searchKeyword", function(e){
					$(".headerContents form").addClass("on");  
					//mng_s 주용민
					$(".headerContents form fieldset").css("border","1px solid #2f4d6a");
					//mng_e 주용민
				}); 
				body.on("focus",".submenuBox .ulDiv ul li a",function(e){					
					$(".headerContents form").removeClass("on");   
				});
				body.on("focus",".latestList dt a",function(e){  
					$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px", "height":"0"});
				});
				body.on("mouseleave",".headerContents form",function(e){
					e.stopPropagation();
					//mng_s 주용민
					if($(".headerContents form").hasClass("on")){
						if($("#search_magni").hasClass("on")){
							$(".headerContents form fieldset").css("border","1px solid #2f4d6a");
						}else{
							$(".headerContents form fieldset").css("border","none");
						}
					}
					//mng_e 주용민
					$("#searchKeyword").blur();  
					$("#searchKeyword").css("display","block");
					$(".searchPop").slideUp(10);	
					$(".headerContents form").removeClass("on");
				});
				
				/*-----------------------상단 스크립트 ---------------------*/
				
				$("#searchKeyword").keydown(function(e){
					if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
						$includeSearch.ui.moveSearchList();
					}
				});
			}
	};
	
	$includeSearch.log = {
		headerClick : function(){
			var title = "Header 메뉴 클릭 로그";
			var zoomLevel = "00"; 
			var adm_nm = "없음";
			$(".gnb a").unbind().bind("click",function(){
				var id = $(this).attr("id");
				if(id == "themaList"){
					apiLogWrite2("F0", "F10", title, $(this).text(), zoomLevel, adm_nm);	//통계주제도		
				}else if(id == "interList"){
					apiLogWrite2("F0", "F20", title, $(this).text(), zoomLevel, adm_nm);	//대화형통계지도
				}else if(id == "serviceList"){
					apiLogWrite2("F0", "F30", title, $(this).text(), zoomLevel, adm_nm);	//활용서비스
				}else if(id == "analList"){
					apiLogWrite2("F0", "F40", title, $(this).text(), zoomLevel, adm_nm);	//분석지도
				}else if(id == "sopList"){
					apiLogWrite2("F0", "F50", title, $(this).text(), zoomLevel, adm_nm);	//알림마당
				}
			});
			
			$(".ulDiv a").bind("click",function(){
				var id = $(this).attr("id");
				if(id == "human"){
					apiLogWrite2("F0", "F11", title, $(this).text(), zoomLevel, adm_nm);	//인구와가구
				}else if(id == "welfare"){
					apiLogWrite2("F0", "F12", title, $(this).text(), zoomLevel, adm_nm);	//복지와문화
				}else if(id == "work"){
					apiLogWrite2("F0", "F13", title, $(this).text(), zoomLevel, adm_nm);	//노동과경제
				}else if(id == "envi"){
					apiLogWrite2("F0", "F14", title, $(this).text(), zoomLevel, adm_nm);	//환경과안전
				}else if(id == "house"){
					apiLogWrite2("F0", "F15", title, $(this).text(), zoomLevel, adm_nm);	//주거와교통
				}
				
				else if(id == "comp"){
					apiLogWrite2("F0", "F24", title, $(this).text(), zoomLevel, adm_nm);	//전국사업체조사
				}else if(id == "3fv"){
					apiLogWrite2("F0", "F25", title, $(this).text(), zoomLevel, adm_nm);	//농림어업총조사
				}else if(id == "kosi"){
					apiLogWrite2("F0", "F26", title, $(this).text(), zoomLevel, adm_nm);	//KOSIS(지역통계)
				}else if(id == "mainDex"){
					apiLogWrite2("F0", "F27", title, $(this).text(), zoomLevel, adm_nm);	//총조사주요지표
				}else if(id == "popHouse"){
					apiLogWrite2("F0", "F28", title, $(this).text(), zoomLevel, adm_nm);	//인구주택총조사
				}else if(id == "pubData"){
					apiLogWrite2("F0", "F29", title, $(this).text(), zoomLevel, adm_nm);	//공공데이터
				}else if(id == "uData"){
					apiLogWrite2("F0", "F2A", title, $(this).text(), zoomLevel, adm_nm);	//나의 데이터
				}
				
				else if(id == "bizMap"){
					apiLogWrite2("F0", "F31", title, $(this).text(), zoomLevel, adm_nm);	//우리동네생활업종
				}
//				else if(id == "useBoard"){
//					apiLogWrite2("F0", "F32", title, $(this).text(), zoomLevel, adm_nm);
//				}
				else if(id == "statexp"){
					apiLogWrite2("F0", "F33", title, $(this).text(), zoomLevel, adm_nm);	//통계지도체험
				}else if(id == "houseAnal"){
					apiLogWrite2("F0", "F34", title, $(this).text(), zoomLevel, adm_nm);	//살고싶은우리동네
				}else if(id == "comIntro"){
					apiLogWrite2("F0", "F35", title, $(this).text(), zoomLevel, adm_nm);	//지역현안소통지동
				}
				
				else if(id == "technicalBizMap"){
					apiLogWrite2("F0", "F55", title, $(this).text(), zoomLevel, adm_nm);	//기술업종지도
				}else if(id == "static"){
					apiLogWrite2("F0", "F56", title, $(this).text(), zoomLevel, adm_nm);	//정책통계지도
				}else if(id == "gallery"){
					apiLogWrite2("F0", "F57", title, $(this).text(), zoomLevel, adm_nm);	//통계갤러리
				}
				
				else if(id == "statbdFuture"){
					apiLogWrite2("F0", "F41", title, $(this).text(), zoomLevel, adm_nm);	//지방의변화보기
				}else if(id == "staMonth"){
					apiLogWrite2("F0", "F42", title, $(this).text(), zoomLevel, adm_nm);	//월간통계
				}else if(id == "pubModel"){
					apiLogWrite2("F0", "F43", title, $(this).text(), zoomLevel, adm_nm);	//고령화현황보기
				}else if(id == "pyra"){
					apiLogWrite2("F0", "F44", title, $(this).text(), zoomLevel, adm_nm);	//인구피라미드
				}else if(id == "statbdFam"){
					apiLogWrite2("F0", "F45", title, $(this).text(), zoomLevel, adm_nm);	//성씨분포
				}
				
				else if(id == "sopIn"){
					apiLogWrite2("F0", "F51", title, $(this).text(), zoomLevel, adm_nm);	//SGIS플러스소개
				}else if(id == "ean"){
					apiLogWrite2("F0", "F52", title, $(this).text(), zoomLevel, adm_nm);	//설명과공지
				}else if(id == "qar"){
					apiLogWrite2("F0", "F53", title, $(this).text(), zoomLevel, adm_nm);	//질문과개선요청
				}else if(id == "shortc"){
					apiLogWrite2("F0", "F54", title, $(this).text(), zoomLevel, adm_nm);	//자료신청
				}
			});
		},
	
		mainClick : function(){
			var title = "메인페이지 화면";
			var zoomLevel = "00"; 
			var adm_nm = "없음";
			$(".im p a").unbind().bind("click",function(){
				apiLogWrite2("G0", "G00", title, $(this).text(), zoomLevel, adm_nm);	//통계주제도
			});
			$(".im ul li").unbind().bind("click",function(){
				var x = $(this).index();
				if(x == 0){
					apiLogWrite2("G0", "G05", title, $(this).text(),zoomLevel,adm_nm);	//인구와가구
				}else if(x==1){
					apiLogWrite2("G0", "G1C", title, $(this).text(), zoomLevel, adm_nm);	//주거와교통			
				}else if(x==2){
					apiLogWrite2("G0", "G06", title, $(this).text(), zoomLevel, adm_nm);	//복지와문화
				}else if(x==3){
					apiLogWrite2("G0", "G07", title, $(this).text(), zoomLevel, adm_nm);	//노동과경제							
				}else if(x==4){
					apiLogWrite2("G0", "G08", title, $(this).text(), zoomLevel, adm_nm);	//환경과안전		
				}
			});
			
			$(".tm h3 a").unbind().bind("click",function(){
				apiLogWrite2("G0", "G10", title, $(this).text(), zoomLevel, adm_nm);	//대화형통계지도
			});
			
			$(".tm ul li").unbind().bind("click",function(){
				var x = $(this).index();
				if(x == 0){
					apiLogWrite2("G0", "G1D", title, $(this).text(), zoomLevel, adm_nm);	//주요지표
				}else if(x==1){
					apiLogWrite2("G0", "G1E", title, $(this).text(), zoomLevel, adm_nm);	//인구주택총조사		
				}else if(x==2){
					apiLogWrite2("G0", "G18", title, $(this).text(), zoomLevel, adm_nm);	//전국사업체조사
				}else if(x==3){
					apiLogWrite2("G0", "G1A", title, $(this).text(), zoomLevel, adm_nm);	//KOSIS(지역통계)						
				}else if(x==4){
					apiLogWrite2("G0", "G1F", title, $(this).text(), zoomLevel, adm_nm);	//나의통계
				}
			});
			
			$(".ca p a").unbind().bind("click",function(){
					apiLogWrite2("G0", "G27", title,  $(this).text(), zoomLevel, adm_nm);	//활용서비스			
			});

			$(".ca .item").unbind().bind("click",function(){
				var x = $(this).index();
				if(x == 0){
					apiLogWrite2("G0", "G46", title, $(this).text(), zoomLevel, adm_nm);	//정책통계지도				
				}else if(x==1){
					apiLogWrite2("G0", "G45", title, $(this).text(), zoomLevel, adm_nm);	//기술업종통계지도	
				}else if(x==2){
					apiLogWrite2("G0", "G28", title, $(this).text(), zoomLevel, adm_nm);	//살고싶은우리동네
				}else if(x==3){
					apiLogWrite2("G0", "G29", title, $(this).text(), zoomLevel, adm_nm);	//우리동네생활업종
				}else if(x==4){
					apiLogWrite2("G0", "G2A", title, $(this).text(), zoomLevel, adm_nm);	//지역현안소통지도					
				}else if(x==5){
					apiLogWrite2("G0", "G25", title, $(this).text(), zoomLevel, adm_nm);	//통계지도체험
				}else if(x==6){					
					apiLogWrite2("G0", "G47", title, $(this).text(), zoomLevel, adm_nm);	//통계갤러리
				}
			});
			
			$(".ma p a").unbind().bind("click",function(){
					apiLogWrite2("G0", "G20", title,  $(this).text(), zoomLevel, adm_nm);	//분석지도			
			});
			
			$(".ma ul li").unbind().bind("click",function(){
				var x = $(this).index();
				if(x == 0){
					apiLogWrite2("G0", "G21", title, $(this).text(), zoomLevel, adm_nm);	//월간통계				
				}else if(x==1){
					apiLogWrite2("G0", "G22", title, $(this).text(), zoomLevel, adm_nm);	//움직이는인구피라미드		
				}else if(x==2){
					apiLogWrite2("G0", "G26", title, $(this).text(), zoomLevel, adm_nm);	//고령화현황보기
				}else if(x==3){
					apiLogWrite2("G0", "G23", title, $(this).text(), zoomLevel, adm_nm);	//성씨분포						
				}else if(x==4){
					apiLogWrite2("G0", "G24", title, $(this).text(), zoomLevel, adm_nm);	//지방의변화보기	
				}
			});
			
			$(".sideGuide h3 a").unbind().bind("click",function(){
				apiLogWrite2("G0","G50",title,$(this).text(), zoomLevel, adm_nm);	//SGIS+소개
			});
			$(".sideGuide ul li").unbind().bind("click",function(){				
				var x = $(this).index();
				if(x == 0){
					// 2017.06.12 SGIS+ 공개강의실 apiLogWrite 추가
//					apiLogWrite2("G0", "G51", title, $(this).text(), zoomLevel, adm_nm);	//통계용어설명					
					apiLogWrite2("U0", "U01", title, $(this).text(), zoomLevel, adm_nm);	//SGIS+ 공개강의실				
				}else if(x==1){
					apiLogWrite2("G0", "G52", title, $(this).text(), zoomLevel, adm_nm);	//언론소개자료	
				}else if(x==2){
					apiLogWrite2("G0", "G53", title, $(this).text(), zoomLevel, adm_nm);	//SGIS+홍보동영상
				}else if(x==3){
					apiLogWrite2("G0", "G54", title, $(this).text(), zoomLevel, adm_nm);	//서비스사용법											
				}
			});
		}
	};
}(window, document));