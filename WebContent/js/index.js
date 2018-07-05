/**
 * 메인화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */ 
$(function(){ 
//	 openWin('Popup_main');
	$(window).on("keydown.disableScroll", function(e) {
		var eventKeyArray = [38, 40];
		for (var i = 0; i < eventKeyArray.length; i++) {
			if (e.keyCode === eventKeyArray [i]) {
				e.preventDefault();
				return;
			}
		}
	});
	var body = $("body");
	$('.exList01, .exList02, .sbList').slick({dots:true,autoplay:true,autoplaySpeed:3000,pauseOnDotsHover:true});
	body.on("mouseover focus",".evtLatest",function(){
		var ck = $(this).parents("dt").attr("class");
		$(".latestList dd.tm, .latestList dd.im").css("z-index","1");
		$(".latestList dd."+ck).css("z-index","2");		
	});
	//배너 재생/일시정지
	$(".bannerPlayer").on('click',function(){
		if($(".bannerPlayer").hasClass("on")){
			$(".bannerPlayer").removeClass("on");
			$(".bannerPlayer").css("background-image","url('/img/ico/play_on.png')");
			$(".sbList").slick('slickSetOption','autoplay', false).slick('slickPause');
		}else{
			$(".bannerPlayer").addClass("on");
			$(".bannerPlayer").css("background-image","url('/img/ico/play.png')");
			$(".sbList").slick('slickSetOption','autoplay', true).slick('slickPlay');
		}
	});
	//최근 게시물 -통계주제도
	body.on("mouseover focus","#themaLists",
	function(){		
		$(".roundBox").html($(this).html());		
		$("#themaTilte").css("width", "270px");
		$("#themaColor").css("color", "#fff");
	});
	//최근 게시물 -대화형통계지도
	body.on("mouseover focus","#interLists",
	function(){		
		$(".roundBox2").html($(this).html());
		$("#interTilte").css("width", "270px");
		$("#interColor").css("color", "#fff");		
	});
	
	body.on("mouseover focus",".latestList dt ul li a",function(){
		$(this).css("text-decoration", "underline");
		$(this).css("font-weight", "bold");		
	});
	body.on("mouseout focus",".latestList dt ul li a",function(){
		$(this).css("text-decoration", "none");
		$(this).css("font-weight", "normal");		
	});
	
	body.on("mouseover focus",".cbwBox ul li a",function(){
		var cbwBoxId = $(this).parent("li").parent("ul").parent(".cbwBox").attr("id");
		switch(cbwBoxId){
		case 'board001':
		case 'board003':
		case 'board002':
		case 'board000':
		case 'board004':
		case 'shareTable':
		case 'shortcut':
		case 'eduKidz':
		case 'developer':
			$(this).css("text-decoration", "underline");
			$(this).css("font-weight", "bold");		
			break;
		 default:
		}
	});
	
	body.on("mouseout focus",".cbwBox ul li a",function(){
		$(this).css("text-decoration", "none");
		$(this).css("font-weight", "normal");				
	});
		
	body.on("keydown",".ulDiv ul li a",function(e){
		var key = e.keyCode;
		switch(key){
		case 37:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 38:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 39:
	        $(this).parent().next().find("a").focus();
	        break;
	    case 40:
	    	 $(this).parent().next().find("a").focus();
	        break;
	    default:
	    }	
	});
	
	body.on("keydown",".gnb li a",function(e){
		var key = e.keyCode;
		switch(key){
		case 37:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 38:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 39:
	        $(this).parent().next().find("a").focus();
	        break;
	    case 40:
	    	 $(this).parent().next().find("a").focus();
	        break;
	        break;
	    default:
	    }	
	});
	
	body.on("keydown",".headerEtc a",function(e){
		var key = e.keyCode;
		switch(key){
		case 37:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 38:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 39:
	        $(this).parent().next().find("a").focus();
	        break;
	    case 40:
	    	 $(this).parent().next().find("a").focus();
	        break;
	    default:
	    }	
	});
	
	body.on("keydown",".ca ul li a",function(e){
		var key = e.keyCode;
		switch(key){
		case 37:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 38:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 39:
	        $(this).parent().next().find("a").focus();
	        break;
	    case 40:
	    	 $(this).parent().next().find("a").focus();
	        break;
	    default:
	    }	
	});
	
	body.on("keydown",".ma ul li a",function(e){		
		var key = e.keyCode;
		switch(key){
		case 37:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 38:
	        $(this).parent().prev().find("a").focus();
	        break;
		case 39:
	        $(this).parent().next().find("a").focus();
	        break;
	    case 40:
	    	 $(this).parent().next().find("a").focus();
	        break;
	    default:
	    }	
	});
	body.on("click","#developer h3 a",function(e){		
		apiLogWrite2("G0","G40","메인페이지 화면",$(this).text(),"00","없음");
		window.open("/developer/html/home.html");
	});
	body.on("click","#developer .type02 a:eq(0)",function(e){		
		apiLogWrite2("G0","G41","메인페이지 화면",$(this).text(),"00","없음");
		window.open("/developer/html/develop/dvp_2.html");
	});
	body.on("click","#developer .type02 a:eq(1)",function(e){		
		apiLogWrite2("G0","G43","메인페이지 화면",$(this).text(),"00","없음");
		window.open("/developer/html/openApi/api/data.html");
	});
	body.on("click","#developer .type02 a:eq(2)",function(e){		
		apiLogWrite2("G0","G42","메인페이지 화면",$(this).text(),"00","없음");
		window.open("/developer/html/openApi/api/map.html");
	});
	
	body.on("click","#shortcut h3",function(e){
		apiLogWrite2("G0","G30","메인페이지 화면",$(this).text(),"00","없음");
		window.location.href = contextPath + "/contents/shortcut/shortcut_05_02.jsp";
	});
	body.on("click","#shortcut a:eq(0)",function(e){
		apiLogWrite2("G0","G31","메인페이지 화면",$(this).text(),"00","없음");
		e.stopPropagation();
		window.location.href = contextPath + "/contents/shortcut/shortcut_05.jsp";
	});
	body.on("click","#shortcut a:eq(1)",function(e){
		apiLogWrite2("G0","G32","메인페이지 화면",$(this).text(),"00","없음");
		e.stopPropagation();
		window.location.href = contextPath + "/contents/shortcut/shortcut_05_03.jsp";
	});
	body.on("click","#shortcut a:eq(2)",function(e){
		apiLogWrite2("G0","G33","메인페이지 화면",$(this).text(),"00","없음");
		e.stopPropagation();
		window.location.href = contextPath + "/contents/shortcut/shortcut_05_01.jsp";
	});
	body.on("click",".Popup_close1",function(e){		
		$(".Popup_main").remove();
	});
	body.on("click",".Popup_close2",function(e){		
		$(".Popup_main").remove();
	});
	body.on("click",".Popup_close3",function(e){	
		closeWin('Popup_main', 1);
	});
	
	//활용사례 슬라이드
	$(".icoSlide").slick({  
		slidesToShow: 5,
		slidesToScroll: 2,
		arrows:false,
		infinite:false,
		dots: false
	}); 	
	$("body").on("click",".micoPrev",function(e){	 
		$('.icoSlide').slick("slickPrev");	
	});		
	$("body").on("click",".micoNext",function(e){		
		$('.icoSlide').slick("slickNext");	
	});	 
	
	// 메인화면 최근목록 조회
	getMainRecentLists();
	
	//메인화면 통계주제도 최근목록 조회
	//getMainRecentThemaLists();
	
	//최근 게시물 - 인터렉티브맵
	setBoardView("BOARD_000");
	
	//최근 게시물 - 우수활용사례
	//setBoardView("Share");
	setBoardView("gallery");
	
	//최근 게시물 - 활용사례
	setBoardView("BOARD_004");
	
	//최근 게시물 - 공지사항 
	setBoardView("BOARD_001");
	
	//최근 게시물 - FAQ 
	setBoardView("BOARD_002");
	
	//최근 게시물 - Q&A
	setBoardView("BOARD_003");
	
	
	
	function setBoardView(gubun, type){
		if(gubun == "BOARD_000"){
			jQuery.ajax({
		 		type:"POST",
		 		url: "/ServiceAPI/community/communityList.json",
		 		data:{	
		 				"type"	: "all",
		 				"bnd_year" 		: 2014,	 				
		 				"pageSize" 		: 5
		 			  },
		 		success:function(data){
		 			console.log(data);
		 			var cont = getBoardTitle(gubun);
		 			cont = cont + "<ul>";
		 			//최근게시물 관련
			 			for(var i=0; i<data.result.summaryList.length; i++){
			 				var map_id = data.result.summaryList[i].cmmnty_map_id;
			 				var map_nm = data.result.summaryList[i].cmmnty_map_nm;
			 				var open_date = data.result.summaryList[i].reg_date;
			 				cont = cont + "<li>";
			 				var url = "/view/community/view?cmmnty_map_id=" + map_id;
			 				cont = cont + "<a href=\"" + url + "\">" + map_nm +"( "+ open_date +")</a>";
			 				cont = cont + "</li>";
			 				cont = cont + "</ui>";
			 				cont = cont + getMoreUrl(gubun);
			 			}
			 			$("#board000").html(cont);
		 		},
		 		error:function(data) {
		 		}
			});
		}else if(gubun == "BOARD_004"){
			jQuery.ajax({
		 		type:"POST",
		 		url: "/view/mypage/MainUpload/getMainUploadList",
		 		data:{	
		 				"last_num" 		: 5	 				
		 			  },
		 		success:function(data){
		 			if(data != "") {
		 				var cont = getBoardTitle(gubun);
			 			  cont = cont + "<ul>";
			 			var jsonData = JSON.parse(data);		 			
			 			for (var i = 0; i < jsonData.data.length; i++) {
			 				cont = cont + "<li>";
			 				var url = "/view/map/interactiveMap/userdata?id=" + jsonData.data[i].DATA_ID + "&title="+jsonData.data[i].DATA_TITLE;
			 				cont = cont + "<a href=\"" + url + "\">" + jsonData.data[i].DATA_TITLE +"( "+  jsonData.data[i].UPLOAD_DT +")</a>";
			 				cont = cont + "</li>";
			 				cont = cont + "</ui>";
			 				
			 			}
			 				cont = cont + getMoreUrl(gubun);
				 			$("#board004").html(cont);
		 			}
		 		},
		 		error:function(data) {
		 		}
			});
		}else{
			jQuery.ajax({
		 		type:"POST",
		 		url: "/ServiceAPI/main/mainBBoardInfo.json",
		 		data:{	
		 				"gubun" 		: gubun	 				
		 			  },
		 		success:function(data){
		 			var cont = getBoardTitle(gubun);
		 			//alert(cont);
		 			cont = cont + "<ul>";
		 			
		 			//최근게시물 관련
		 			if(gubun.substring(0,5) == "BOARD"){
			 			for(var i=0; i<data.result.length; i++){
			 				var board_cd = data.result[i].board_cd;
			 				var post_no = data.result[i].post_no;
			 				var post_title = data.result[i].post_title;			 			
			 			/*	
			 				if(post_title.length> 20){
			 					post_title = post_title.substring(0, 17) + "...";
			 				}*/
			 				
			 				var reg_ts = data.result[i].reg_ts;
			 				
			 				cont = cont + "<li>";
			 				var url = "";
			 				if(gubun == "BOARD_001"){
			 					url = "/view/board/expAndNoticeView?post_no="+post_no;
			 				}else if(gubun == "BOARD_002"){
			 					url = "/view/board/faqView?post_no="+post_no+"&board_cd=BOARD_002";
			 				}else if(gubun == "BOARD_003"){
			 					if(data.result[i].low_rank_s_class_cd == "THEMRQ")			 					
			 						url = "/view/board/qnaThemaView?post_no="+post_no+"&board_cd=BOARD_003";
			 					else
			 						url = "view/board/qnaView?post_no="+post_no+"&board_cd=BOARD_003";
			 				}
			 				
			 				cont = cont + "<a href=\"" + url + "\">" + post_title +"( "+ reg_ts +")</a>";
			 				//cont = cont + "<span>" + reg_ts + "</span>";
			 				cont = cont + "</li>";
			 				cont = cont + "</ui>";
			 			}
			 			cont = cont + getMoreUrl(gubun);
			 			if(gubun == "BOARD_001"){
			 				$("#board001").html(cont);
		 				}else if(gubun == "BOARD_002"){
		 					$("#board002").html(cont);
		 				}else if(gubun == "BOARD_003"){
		 					$("#board003").html(cont);
		 				}
		 				
		 				
		 			}else if(gubun=="gallery"){
		 				//우수활용사례활용 
		 				//var cont = "";
		 				var cont = getBoardTitle(gubun);
		 				//alert(data.result.length);
			 			if(data.result != null && data.result.length != 0) {
			 				cont = cont + "<ul>";
			 				for(var i=0; i<data.result.length; i++){
			 					var sgis_use_board_seq = data.result[i].data_id;
								var sgis_use_board_title = data.result[i].title;
								//var regist_date = data.result[i].regist_date;
								
								if(sgis_use_board_title != null){
									if(sgis_use_board_title.length> 40){
										sgis_use_board_title = sgis_use_board_title.substring(0, 38) + "";
									}
								}
					 			cont = cont + "<li>";
				 				var url = "/view/gallery/resultGallery?id=" + data.result[i].data_id + "&srv_type=" +  data.result[i].srv_type ;
				 				cont = cont + "<a href=\"" + url + "\">" + sgis_use_board_title; // +"( "+ regist_date +")</a>";
				 				cont = cont + "</li>";
			 				}
			 				cont = cont + "</ul>";
			 				cont = cont + getMoreUrl(gubun);
			 				$("#shareTable").html(cont);
			 			}
		 			}else if(gubun=="notice"){
		 				//공지사항 슬라이드 관련
		 				
		 			//	alert(data.result.length); 
		 				
		 				for(var i=0; i<data.result.length; i++){
		 					var post_content = data.result[i].post_content;
		 					post_content = replaceAll('&lt;p&gt;', '', post_content);
		 					post_content = replaceAll('&lt;/p&gt;', '', post_content);
		 					post_content = replaceAll('&lt;', '<', post_content);
		 					post_content = replaceAll('&gt;', '>', post_content);
		 					post_content = replaceAll('&quot;', '\'', post_content);
		 					
		 					slideCont = slideCont + post_content;
							
		 				}
		 		//		$("#mainNotice").(cont);
		 				if(slideCont != ""){
		 			//		 alert(cont);
		 			//		cont = "<img src='/img/common/ico_plus02.png' />"
		 					$("#mainNotice").html(slideCont);
		 					startSlide();
		 				}
		 			}
		 		},
		 		error:function(data) {
		 		}
			});
		}
		
	}
	
	function getBoardTitle(board) {
		switch (board) {
		case "BOARD_000":
			return "<h3>지역현안 소통지도</h3>";
		case "BOARD_004":
			return "<h3>사용자 공유마당</h3>";
		case "BOARD_003":
			return "<h3>Q&A</h3>";
//		case "Share":
		case "gallery":
			return "<h3>통계갤러리</h3>";
		case "BOARD_001":
			return "<h3>공지사항</h3>";
		case "BOARD_002":
			return "<h3>FAQ</h3>";
		}
	}
	
	function getMoreUrl(board) {
		switch (board) {
		case "BOARD_000":
			return "<a href='/view/community/intro' class='btnMore'><img src='/img/ico/ico_more.png' alt='더보기' /></a>";
		case "BOARD_004":
			return "<a style='cursor:pointer' class='btnMore'><img src='/img/ico/ico_more.png' alt='더보기' /></a>";
		case "BOARD_003":
			return "<a href='/view/board/qnaAndRequest?gubun=BOARD_003' class='btnMore'><img src='/img/ico/ico_more.png' alt='더보기' /></a>";
		case "Share":
			return "<a href='/jsp/share/useBoardList.jsp' class='btnMore'><img src='/img/ico/ico_more.png' alt='더보기' />";
		case "gallery":
			return "<a href='/view/gallery/resultGallery' class='btnMore'><img src='/img/ico/ico_more.png' alt='더보기' />";
		case "BOARD_001":
			return "<a href='/view/board/expAndNotice' class='btnMore'><img src='/img/ico/ico_more.png' alt='더보기' /></a>";
		case "BOARD_002":
			return "<a href='/view/board/qnaAndRequest?gubun=BOARD_002' class='btnMore'><img src='/img/ico/ico_more.png' alt='더보기' /></a>";
		}
	}
	// 창열기  
	function openWin( winName ) {		
	   var blnCookie = getCookie( winName );  
	   var obj = eval( "window." + winName );  
	   if( !blnCookie ) {  
	       obj.style.display = "block";  
	   }  
	}  
	  
	// 창닫기  
	function closeWin(winName, expiredays) {
	   setCookie( winName, "done" , expiredays);   
	   var obj = eval( "window." + winName );  
	   obj.style.display = "none";  
	}  
	function closeWinAt00(winName, expiredays) {   
	   setCookieAt00( winName, "done" , expiredays);   
	   var obj = eval( "window." + winName );  
	   obj.style.display = "none";  
	}  
	  
	// 쿠키 가져오기  
	function getCookie( name ) {  
	   var nameOfCookie = name + "=";  
	   var x = 0;  
	   while ( x <= document.cookie.length )  
	   {  
	       var y = (x+nameOfCookie.length);  
	       if ( document.cookie.substring( x, y ) == nameOfCookie ) {  
	           if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )  
	               endOfCookie = document.cookie.length;  
	           return unescape( document.cookie.substring( y, endOfCookie ) );  
	       }  
	       x = document.cookie.indexOf( " ", x ) + 1;  
	       if ( x == 0 )  
	           break;  
	   }  
	   return "";  
	}  
	  
	  
	// 24시간 기준 쿠키 설정하기  
	// expiredays 후의 클릭한 시간까지 쿠키 설정  
	function setCookie( name, value, expiredays ) {   
	   var todayDate = new Date();   
	   todayDate.setDate( todayDate.getDate() + expiredays );   
	   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
	}  
	  
	// 00:00 시 기준 쿠키 설정하기  
	// expiredays 의 새벽  00:00:00 까지 쿠키 설정  
	function setCookieAt00( name, value, expiredays ) {   
	    var todayDate = new Date();   
	    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
	    if ( todayDate > new Date() )  
	    {  
	    expiredays = expiredays - 1;  
	    }  
	    todayDate.setDate( todayDate.getDate() + expiredays );   
	     document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
	  } 

}); 