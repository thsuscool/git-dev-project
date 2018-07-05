$(function(){
	if( $(".navi").length ) naviEvent();  // 상단메뉴
	if( $(".main_banner").length ) banner01();  // 메인 상단바로밑 배너
	if( $(".main_latest01").length ) banner02(); // 메인 사이드 배너
	if( $(".latestTabs").length ) latestTabs(); // 메인 탭
	if( $(".main_icoList").length ) main_icoList(); // 메인 아이콘리스트
	if( $(".rsEvent").length ) scrollArea(); // 메인 스크롤
	if( $(".listArea01").length ) $(".listArea01").mCustomScrollbar({ "autoExpandScrollbar":"true" }); 
	if( $(".listArea02").length ) $(".listArea02").mCustomScrollbar({ "autoExpandScrollbar":"true" }); 
	if( $(".listArea03").length ) $(".listArea03").mCustomScrollbar({ "autoExpandScrollbar":"true" }); 
	if( $(".adressLayer").length ) $(".adressLayer").mCustomScrollbar({ "autoExpandScrollbar":"true" }); 
	if( $(".mapbox").length ) mapLayout();  // 맵 동적 레이아웃
	if( $(".btn_service").length ) footerService();
	if( $("#browser").length ) treeMenu();
	if( $(".swichbox").length ) swichbox();
	if( $(".ngdList").length ) ngdList();
	if( $(".maptoolbar .tabs").length ) mapTabs();
	if( $(".mapSetting").length ) mapSetting();
	if( $("#treecontrol").length ) treecontrol();

	
	$(document).mousedown(function(event){   // 필요외 부분 클릭시 레이어 숨김 이벤트
		var hidden = $(".footerService").is(":hidden");
		if(hidden == false){ 
			if( event.target.className == "ne" ){ 
				return;
			}else if( event.target.className == "btn_service" ){ 
				return;
			}else{  
				$(".btn_service").css("background","#EAEAEA url(/contents/css/2014_css/img/ico/ico_plus.png) no-repeat 175px center");
				$(".footerService").hide();
			}
		}  
	});
});

function treecontrol(){
	$(".tree_close").on({
		click:function(){
			$(".tree_open").show();
			$(this).hide();
		}
	});
	$(".tree_open").on({
		click:function(){
			$(".tree_close").show();
			$(this).hide();
		}
	});
}
function mapSetting(){
	$(".mapSetting p").on({
		click:function(){
			var hidden = $(".msArea").is(":hidden");
			if(hidden){
				$(".msArea").show();
				$(this).children('img').attr("src","/contents/css/2014_css/img/ico/ico_up01.png");
			}else{
				$(".msArea").hide();
				$(this).children('img').attr("src","/contents/css/2014_css/img/ico/ico_down01.png");
			}
		}
	});
}
function mapTabs(){
	$(".maptoolbar .tabs li").on({
		click:function(){
			$(".maptoolbar .tabs li").removeClass("on"); 
			$(this).addClass("on"); 
		}
	});
}
function ngdList(){
	$(".ngdList dt").on({
		click:function(){
			$(".ngdList dt").removeClass("on");
			$(".ngdList dd").hide();
			$(this).addClass("on").next("dd").show(); 
		}
	});
}
function swichbox(){
	$(".swichbox a:eq(0)").click(function(){ 
		$(".swichbox").css("background","url(/contents/css/2014_css/img/bg/bg_swich_on.png) no-repeat left top");
	});
	$(".swichbox a:eq(1)").click(function(){ 
		$(".swichbox").css("background","url(/contents/css/2014_css/img/bg/bg_swich_off.png) no-repeat left top");
	});
}
function treeMenu(){
	$("#browser").treeview({
		animated: "fast",
		collapsed: true,
		control: "#treecontrol"
		//unique: true
	});
}
function footerService(){
	$(".btn_service").on({
		click:function(){
			var fs = $(".footerService").is(":hidden");
			if(fs == true){
				$(this).css("background","#EAEAEA url(/contents/css/2014_css/img/ico/ico_x.png) no-repeat 175px center");
				$(".footerService").show();

			}else{
				$(this).css("background","#EAEAEA url(/contents/css/2014_css/img/ico/ico_plus.png) no-repeat 175px center");
				$(".footerService").hide();
			}
		}
	});

	$(".btn_service").on({
		keypress:function(){
			var fs = $(".footerService").is(":hidden");
			if(fs == true){
				$(this).css("background","#EAEAEA url(/contents/css/2014_css/img/ico/ico_x.png) no-repeat 175px center");
				$(".footerService").show();
				
			}else{
				$(this).css("background","#EAEAEA url(/contents/css/2014_css/img/ico/ico_plus.png) no-repeat 175px center");
				$(".footerService").hide();
			}
		}
	});
}
function mapLayout(){
	var navigatorWidth = $(".navigator").width();
	var sideAreaWidth = $(".sideArea").width();
	$(".mlControll .rela img").on({
		click:function(){
			var hideen = $(".navigator").is(":hidden");
			if(hideen){
				navigatorWidth = 322;
				$(".navigator").show();
			}else{
				navigatorWidth = 0;
				$(".navigator").hide();
			}
			var mapWidth = parseInt($(".contents").width() - navigatorWidth - sideAreaWidth);
			var mapHeight = parseInt($(window).height() - 150);
			$(".contents").css("height",mapHeight+"px");
			$(".mapbox").css("width",mapWidth+"px");
			$(".mlControll .rela img, .mrControll .rela img").css("top",parseInt(mapHeight/2-28)+"px"); 
		}
	});
	$(".mrControll .rela img").on({
		click:function(){
			var hideen = $(".sideArea").is(":hidden");
			if(hideen){
				sideAreaWidth = 322;
				$(".sideArea").show();
			}else{
				sideAreaWidth = 0;
				$(".sideArea").hide();
			}
			var mapWidth = parseInt($(".contents").width() - navigatorWidth - sideAreaWidth);
			var mapHeight = parseInt($(window).height() - 150);
			$(".contents").css("height",mapHeight+"px");
			$(".mapbox").css("width",mapWidth+"px");
			$(".mlControll .rela img, .mrControll .rela img").css("top",parseInt(mapHeight/2-28)+"px"); 
		}
	});
	var mapWidth = parseInt($(".contents").width() - navigatorWidth - sideAreaWidth);
	var mapHeight = parseInt($(window).height() - 150);
	$(".contents").css("height",mapHeight+"px");
	$(".mapbox").css("width",mapWidth+"px"); 
	$(".mlControll .rela img, .mrControll .rela img").css("top",parseInt(mapHeight/2-28)+"px");
	$(window).resize(function(){
		var mapWidth = parseInt($(".contents").width() - navigatorWidth - sideAreaWidth);
		var mapHeight = parseInt($(window).height() - 150);
		$(".contents").css("height",mapHeight+"px");
		$(".mapbox").css("width",mapWidth+"px");
		$(".mlControll .rela img, .mrControll .rela img").css("top",parseInt(mapHeight/2-28)+"px"); 
	});
}
function banner01(){
	$('.main_banner').slidesjs({
		width: 980,
		height: 96,
		navigation: false,
		play: {
			active: true,
			auto: true,
			interval:9000, 
			pauseOnHover: true,
			swap: true
		}
	});
}
function banner02(){
	
	if($(".imgbox img").length>1){
		$('.imgbox').slidesjs({
			width: 191,
			height: 131,
			navigation: false,
			play: {
				active: true,
				auto: true,
				interval: 7000,
				pauseOnHover: true,
				swap: true
			}
		});
	}
}
function scrollArea(){
	$(".main_result").hover(function(){
		$(".scrollArea").show();
		$(".scrollArea").mCustomScrollbar({ "autoExpandScrollbar":"true" }); 

	},function(){
		$(".scrollArea").hide();
	});
	
	
	$(".main_result").on({
		keypress:function(){
				$(".scrollArea").show();
			$(".scrollArea").mCustomScrollbar({ "autoExpandScrollbar":"true" }); 
		}});
		
	
}
function naviEvent(){ 
	$(".navi li a").mouseover(function(){
		var inx = $(this).parent().index(); 
		$(".navi li a").removeClass("on");
		$(this).addClass("on"); 
		if(inx == 0){
			var submenu = [
				{ "subj":"SGIS란", "link":"/contents/shortcut/shortcut_11.jsp" },	
				{ "subj":"서비스 소개", "link":"/contents/shortcut/shortcut_02.jsp" },	
				{ "subj":"용어 설명", "link":"/contents/support/support_04.jsp" }	
			//	{ "subj":"알림마당", "link":"/contents/support/support_01.jsp?code=N" }
			], posleft = 0;
		}else if(inx == 1){
			var submenu = [
				{ "subj":"소지역 통계", "link":"/sgisnavigator/index.jsp?initialMode=join"},	
				{ "subj":"행정구역 통계", "link":"/statbd/statbd_02.vw" },	
				{ "subj":"월간 통계", "link":"/funny_month","pop":"Y" },
				{ "subj":"주요지표", "link":"/statbd/statbd_01.vw" }	
			], posleft = 170;
		}else if(inx == 2){
			var submenu = [
				{ "subj":"통계지도 시계열서비스", "link":"http://time.nso.go.kr/kostat","pop":"Y" },	
				{ "subj":"지방의 변화보기", "link":"http://sgis.nso.go.kr/project/future/futue_main.asp","pop":"Y" },	
				{ "subj":"고령화 현황보기", "link":"/publicsmodel","pop":"Y" },	
				{ "subj":"인구이동 통계", "link":"http://kogis.nso.go.kr/popmservice","pop":"Y" }
			], posleft = 130;
		}else if(inx == 3){
			var submenu = [
				{ "subj":"사업체 위치찾기", "link":"/sgisComp2"  },	
				{ "subj":"생활관심 지역찾기", "link":"/msgis/index.vw"  },	
				{ "subj":"움직이는 인구피라미드", "link":"http://sgis.nso.go.kr/pyramid/view_country.asp","pop":"Y"  },	
				{ "subj":"성씨분포", "link":"http://sgis.nso.go.kr/pyramid/view_familyname.asp","pop":"Y"  },
				{ "subj":"이슈통계", "link":"/statbd/issue_01.vw" },
				{ "subj":"통계지도 체험", "link":"/statexp/index.jsp","pop":"Y"  }	
			], posleft = 200;
		}else if(inx == 4){
			var submenu = [
				{ "subj":"자료신청", "link":"/contents/shortcut/shortcut_05_02.jsp" },	
//				{ "subj":"OpenAPI", "link":"/OpenAPI2/contents/index.vw" },	
				{ "subj":"S-Open API", "link":"/contents/shortcut/shortcut_06_01.jsp" },	
				{ "subj":"활용갤러리", "link":"/share"}
			], posleft = 560;
		}else if(inx == 5){
			var submenu = [
				{ "subj":"최근자료", "link":"/contents/support/support_07.jsp" },	
				{ "subj":"공지사항", "link":"/contents/support/support_01.jsp?code=Y" },	
				{ "subj":"자주묻는 질문", "link":"/contents/support/support_03.jsp" },	
				{ "subj":"질문과 답변", "link":"/contents/support/support_02.jsp" },
				{ "subj":"서비스 개선 의견", "link":"/contents/support/support_05.jsp" }
			], posleft = 470;
		}
		var ul = "<ul style='left:"+posleft+"px'>";
		for(i=0; i<submenu.length; i++){
		//	if(submenu[i].subj == "움직이는 인구피라미드"){
		//		ul += "<li><a href='#' onclick='notice()'>";
		//		ul += submenu[i].subj+"</a></li>";
		//	}else{
				ul += "<li><a href="+submenu[i].link;
				if(submenu[i].pop == "Y"){
					ul += " target='_blank'";
				}
				ul += ">"+submenu[i].subj+"</a>";
		//	}
		}
		ul += "</ul>"; 
		$(".mapGuide").hide();
		$(".subMenu").show().empty().append(ul);

		$(".contents, .defaultbox").mouseenter(function(){
			$(".mapGuide").show();
			$(".subMenu").hide();
			$(".navi li a").removeClass("on");
		});
	});
	
	
	$(".navi li a").keypress(function(){
		var inx = $(this).parent().index(); 
		$(".navi li a").removeClass("on");
		$(this).addClass("on"); 
		if(inx == 0){
			var submenu = [
				{ "subj":"SGIS란", "link":"/contents/shortcut/shortcut_11.jsp" },	
				{ "subj":"서비스 소개", "link":"/contents/shortcut/shortcut_02.jsp" },	
				{ "subj":"용어 설명", "link":"/contents/support/support_04.jsp" }	
			//	{ "subj":"알림마당", "link":"/contents/support/support_01.jsp?code=N" }
			], posleft = 0;
		}else if(inx == 1){
			var submenu = [
				{ "subj":"소지역 통계", "link":"/sgisnavigator/index.jsp?initialMode=join"},	
				{ "subj":"행정구역 통계", "link":"/statbd/statbd_02.vw" },	
				{ "subj":"월간 통계", "link":"/funny_month","pop":"Y" },
				{ "subj":"주요지표", "link":"/statbd/statbd_01.vw" }	
			], posleft = 170;
		}else if(inx == 2){
			var submenu = [
				{ "subj":"통계지도 시계열서비스", "link":"http://time.nso.go.kr/kostat","pop":"Y" },	
				{ "subj":"지방의 변화보기", "link":"http://sgis.nso.go.kr/project/future/futue_main.asp","pop":"Y" },	
				{ "subj":"고령화 현황보기", "link":"/publicsmodel","pop":"Y" },	
				{ "subj":"인구이동 통계", "link":"http://kogis.nso.go.kr/popmservice","pop":"Y" }
			], posleft = 130;
		}else if(inx == 3){
			var submenu = [
				{ "subj":"사업체 위치찾기", "link":"/sgisComp2"  },	
				{ "subj":"생활관심 지역찾기", "link":"/msgis/index.vw"  },	
				{ "subj":"움직이는 인구피라미드", "link":"http://sgis.nso.go.kr/pyramid/view_country.asp","pop":"Y"  },	
				{ "subj":"성씨분포", "link":"http://sgis.nso.go.kr/pyramid/view_familyname.asp","pop":"Y"  },
				{ "subj":"이슈통계", "link":"/statbd/issue_01.vw" },
				{ "subj":"통계지도 체험", "link":"/statexp/index.jsp","pop":"Y"  }	
			], posleft = 200;
		}else if(inx == 4){
			var submenu = [
				{ "subj":"자료신청", "link":"/contents/shortcut/shortcut_05_02.jsp" },	
//				{ "subj":"OpenAPI", "link":"/OpenAPI2/contents/index.vw" },	
				{ "subj":"S-Open API", "link":"/contents/shortcut/shortcut_06_01.jsp" },	
				{ "subj":"활용갤러리", "link":"/share"}
			], posleft = 560;
		}else if(inx == 5){
			var submenu = [
				{ "subj":"최근자료", "link":"/contents/support/support_07.jsp" },	
				{ "subj":"공지사항", "link":"/contents/support/support_01.jsp?code=Y" },	
				{ "subj":"자주묻는 질문", "link":"/contents/support/support_03.jsp" },	
				{ "subj":"질문과 답변", "link":"/contents/support/support_02.jsp" },
				{ "subj":"서비스 개선 의견", "link":"/contents/support/support_05.jsp" }
			], posleft = 470;
		}
		var ul = "<ul style='left:"+posleft+"px'>";
		for(i=0; i<submenu.length; i++){
			ul += "<li><a href="+submenu[i].link;
			if(submenu[i].pop == "Y"){
				ul += " target='_blank'";
			}
			ul += ">"+submenu[i].subj+"</a>";
		}
		ul += "</ul>"; 
		$(".mapGuide").hide();
		$(".subMenu").show().empty().append(ul);

		$(".contents, .defaultbox").mouseenter(function(){
			$(".mapGuide").show();
			$(".subMenu").hide();
			$(".navi li a").removeClass("on");
		});
	});
	
	
	
}
function notice(){
	alert("새로운 추계인구발표로 데이터 정비중입니다. \n\n 이용해 불편을 드려 죄송합니다. ");
}
function latestTabs(){
	$(".latestTabs li").hover(function(){
		$(".latestTabs li").removeClass("on");
		$(this).addClass("on");
	});
	
	$(".latestTabs li").on({
		keypress:function(){
			$(".latestTabs li").removeClass("on");
			$(this).addClass("on");
		}});
}
function main_icoList(){
	$(".main_icoList li").hover(function(){
		$(this).children('a').children('img').attr("src","/contents/css/2014_css/img/ico/ico_main0"+parseInt($(this).index()+1)+"_on.png");
	},function(){
		$(this).children('a').children('img').attr("src","/contents/css/2014_css/img/ico/ico_main0"+parseInt($(this).index()+1)+".png");
	});
}

 