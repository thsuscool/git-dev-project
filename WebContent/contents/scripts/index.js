
function main_middle_box_second_search(data){
	document.getElementById('main_middle_box_second_search_content_button_01').style.display="block";
	document.getElementById('main_middle_box_second_search_content_button_02').style.display="block";
	document.getElementById('main_middle_box_second_search_content_button_03').style.display="block";

	document.getElementById('main_middle_box_second_search_content_background_1').style.display="none";
	document.getElementById('main_middle_box_second_search_content_background_2').style.display="none";
	document.getElementById('main_middle_box_second_search_content_background_3').style.display="none";

	document.getElementById('main_middle_box_second_search_content_button_0'+data+'').style.display="none";
	document.getElementById('main_middle_box_second_search_content_background_'+data+'').style.display="block";
}
function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function pop_view(){
		var popCookie = getCookie('notice_pop');

		if(popCookie == 'notOpen')	return false;

	  var rMW    = screen.availWidth;
	  var rMH    = screen.availHeight;
	  var width  = 350;
	  var height = 250;

		var param = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable,titlebar=no,width='+width+',height='+height+',left=' + (rMW-width)/2 + ',top=' + (rMH-height)/2;

		pop_notice = window.open('/contents/pop_notice.jsp','notice_pop',param);
		if(pop_notice)	pop_notice.focus();
}

//공지사항 팝업
function openNotice(count, currindex, sgis_board_seq, sgis_board_pop_width, sgis_board_pop_height){
	var popCookie = getCookie('notice_pop_'+sgis_board_seq);

	if(popCookie == 'notOpen')	return false;

	var rMW    = screen.availWidth;
	var rMH    = screen.availHeight;
	var width  = sgis_board_pop_width;
	var height = sgis_board_pop_height;
	

	if(sgis_board_pop_width == '' || sgis_board_pop_width == 0) width = 350;
	if(sgis_board_pop_height == '' || sgis_board_pop_height == 0) height = 250;
	
	//var left = (rMW/count-width)/2;
	//var offset = rMW/count
	var left = (rMW/count-width)/2 + (currindex * rMW/count);

	var param = 'width='+width+',height='+height+',left=' + left + ',top= 200';

	pop_notice = window.open('/contents/pop_notice2.jsp?sgis_board_seq='+sgis_board_seq,'notice_pop'+sgis_board_seq,param);
	if(pop_notice)	pop_notice.focus();
}

//지식정보검색
function searchProcess(){
  var url = '';

	if(document.fm.sgis_know_service_code.value == '')
		url = '/contents/search/search_04.jsp';
	else
		url = '/contents/search/search_04_01.jsp';
	document.fm.action = url;
	document.fm.target = '_self';

	document.fm.submit();
}

function passEnter(Ev){
	var eaCode = (window.netscape) ? Ev.which : event.keyCode;
	if ( eaCode == 13 ) searchProcess();
}

function openPop() {

	var popCookie = getCookie('approvalPop');
	if(popCookie == 'notOpen')	return false;

	var popFm     = document.popForm;

  var rMW    = screen.availWidth;
  var rMH    = screen.availHeight;
  var width  = 350;
  var height = 347;

	var param = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable,titlebar=no,width='+width+',height='+height+',left=' + (rMW-width)/2 + ',top=' + (rMH-height)/2;
	window.open('about:blank', 'approvalPop', param);

	popFm.action = '/contents/member/approvalInform_pop.jsp';
	popFm.target = 'approvalPop';

	popFm.submit();
}

function funsgis_pop(url){
		if(url==''){
			alert('준비중입니다.');
			return;
		}
		funsgis = window.open(url,'funsgis','width=1024,height=768,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=yes,resizable=yes,left=0,top=0');
		funsgis.focus();

		return;
}

function goSelectedPage(elem) {

	var url = elem.value;

	if(url == '') {

		alert('사이트를 선택해 주십시오.');
		return;
	}
	window.open(url);
}

function link(id, num,rep,code) {
	var fm=document.boardFm;

		fm.sgis_board_seq.value   = num;
		fm.sgis_board_rep_seq.value = rep;
		fm.code.value = code; 

		if(id == "notice") {
			fm.action = '/contents/support/support_01_closeup.jsp';
		} else if(id == "qna"){
			fm.action = '/contents/support/support_02_closeup.jsp';
		}

		fm.submit();
}

function link2(seq, scode) {
	var fm=document.boardFm;
	fm.sgis_know_seq.value = seq;
	fm.sgis_know_service_code.value = scode;
	fm.action="/contents/search/search_04_02.jsp";
	fm.submit();
}

function doInsertPageLog(id, url, pop_yn, h_id) {

	var menuFm = document.menuForm;

	menuFm.sgis_menu_d_code_id.value = id;
	menuFm.sgis_menu_url.value       = url;
	menuFm.sgis_menu_pop_chk.value   = pop_yn;
	menuFm.sgis_menu_h_id.value      = h_id;

	menuFm.action = '/contents/include/pageLog_process.jsp';
	menuFm.target = 'prcFrame';

	menuFm.submit();
}

//공간통계 Open API
   	var api_state = 1;
    var api_element_id = "";
    var apiArrayLen = "";
   	function apiPrev() {
   		api_state = api_state - 1;
		/*20090615  api 에서 기본그룹으로 설정되어 있는 항목만 나오도록 수정
		if(api_state == 0) {
			api_state = 11;
		}else if (api_state == 2) {
		        api_state = api_state - 1;
		}
		  
   		*/   
   		    if(api_state == 0) {
  				api_state = api_element_id.length -1 ;
   		    }
   		    //alert(api_state+":::"+api_element_id[api_state]+"::"+api_element_id.length);
   		    if(apiArrayLen >0)
   		document.getElementById("apiImg").src = "/contents/images/api/openAPI_banner"+api_element_id[api_state]+".gif";
   		
  	}

   	function apiNext() {
  		api_state = api_state + 1;
	    /*20090615  api 에서 기본그룹으로 설정되어 있는 항목만 나오도록 수정
  		if(api_state == 12) {
  			api_state = 1;
   		}else if (api_state == 2) {
   		    api_state = api_state + 1;
   		}
   		
	   */   	
   		//alert("api_element_id::"+api_element_id[api_state]+"::api_state::"+api_state);
   		if(api_state == api_element_id.length) {
  			api_state = 1;
   		}
   		if(apiArrayLen >0)
   		document.getElementById("apiImg").src = "/contents/images/api/openAPI_banner"+api_element_id[api_state]+".gif";
   	}
   	
   	function apiSetleng(flag,reqapiArrayLen) {
   	    apiArrayLen = reqapiArrayLen;
 		api_element_id = new Array(flag.length);
 		for(var i=0;i<flag.length;i++){
 			api_element_id[i] = flag[i];
 			//alert(flag[i]+"::"+api_element_id[i]);
 		}
 		
   		//alert(flag+"::"+api_element_id.length+"::"+flag.length);
   	
   	}

   	//통계청관련사이트
   	var sgis_state = 1;

   	function sgisPrev() {
   		var fm=document.siteFm;
   		var lastRow = fm.sgisRowCnt.value;
   		var sgislink = document.getElementById("sgisImg");
   		sgis_state = sgis_state - 1;
   		
 		if(sgis_state == 0) {
  				sgis_state = lastRow;
   		}
   		fm.sgisSite.selectedIndex=sgis_state-1;
   		sgislink.src = "/contents/images/main_middle_box_three_sitebox_site_banner_"+sgis_state+".gif";
   	}

   	function sgisNext() {
   		var fm=document.siteFm;
   		var lastRow = fm.sgisRowCnt.value;
   		var sgislink = document.getElementById("sgisImg");
   		sgis_state = Number(sgis_state) + 1;

   		if(sgis_state > lastRow) {
   			sgis_state = 1;
   		}
   		fm.sgisSite.selectedIndex=sgis_state-1;
   		sgislink.src = "/contents/images/main_middle_box_three_sitebox_site_banner_"+sgis_state+".gif";
   	}

   	//부동산관련사이트
   	var land_state = 1;
   	function landPrev() {
   		var fm=document.siteFm;
   		var lastRow = fm.landRowCnt.value;
   		var landlink = document.getElementById("landImg");
   		land_state = land_state - 1;

 		if(land_state == 0) {
  				land_state = lastRow;
   		}
   		fm.landSite.selectedIndex=land_state-1;
   		landlink.src = "/contents/images/main_middle_box_four_sitebox_site_banner_"+land_state+".gif";
   	}

   	function landNext() {
   		var fm=document.siteFm;
   		var lastRow = fm.landRowCnt.value;
   		var landlink = document.getElementById("landImg");
   		land_state = Number(land_state) + 1;

 		if(land_state > lastRow) {
  				land_state = 1;
   		}
   		fm.landSite.selectedIndex=land_state-1;
   		landlink.src = "/contents/images/main_middle_box_four_sitebox_site_banner_"+land_state+".gif";
   	}

   	function chgSite(no) {
	   	var fm=document.siteFm;
	   	var sgislink = document.getElementById("sgisImg");
	   	var landlink = document.getElementById("landImg");
   		if(no == 1) {
   			sgis_state = fm.sgisSite.selectedIndex+1;
	   		sgislink.src = "/contents/images/main_middle_box_three_sitebox_site_banner_"+sgis_state+".gif";
   		} else if(no == 2) {
   			land_state = fm.landSite.selectedIndex+1;
	   		landlink.src = "/contents/images/main_middle_box_four_sitebox_site_banner_"+land_state+".gif";
   		}
   	}

		//사이트 퀵링크
   	function quickLink(no) {
   		var fm=document.siteFm;
   		if(no == 1) {
   			var url = fm.sgisSite.value;
   			window.open(url);
   		} else if(no == 2) {
  			var url = fm.landSite.value;
   			window.open(url);
   		}
   	}

   	//api link
   	function apiLink() {
   		var fm=document.menuForm;
		if(api_state == 1) {
   		  api_state = api_element_id[1];
   		}else if(api_state == 2) {
   		  api_state = api_element_id[2];
   		}
   		else if(api_state == 3) {
   		  api_state = api_element_id[3];
   		}
   		else if(api_state == 4) {
   		  api_state = api_element_id[4];
   		}
   		else if(api_state == 5) {
   		  api_state = api_element_id[5];
   		}   		
   		else if(api_state == 6) {
   		  api_state = api_element_id[6];
   		}
   		else if(api_state == 7) {
   		  api_state = api_element_id[7];
   		}
   		else if(api_state == 8) {
   		  api_state = api_element_id[8];
   		}
   		else if(api_state == 9) {
   		  api_state = api_element_id[9];
   		}
   		else if(api_state == 10) {
   		  api_state = api_element_id[10];
   		}
   		else if(api_state == 11) {
   		  api_state = api_element_id[11];
   		}
   		else if(api_state == 12) {
   		  api_state = api_element_id[12];
   		}
   		if(api_state == 0) {
   			alert("API 를 선택하세요.");
   			return;
   		} else {
	   		fm.api_element_id.value = api_state;
	   		fm.action="/contents/shortcut/shortcut_06_04.jsp";
				fm.submit();
			}
   	}

   	function frontPrev() {
   		var fm=document.fm;
   		front_state = front_state - 1;
   		if(front_state == 0) front_state = frontLastRow;
   		main_middle_box_second_mapbox_menu_click(front_state);
   	}

   	function frontNext() {
  		var fm=document.fm;
   		front_state = front_state + 1;
   		if(front_state > frontLastRow) front_state = 1;
   		main_middle_box_second_mapbox_menu_click(front_state);
   	}
   	
   	var subMenu = Array("lnb101_over","lnb201_over","lnb301_over","lnb401_over");
   	
   	function menuOverOut(id){

   	 var menu1=document.getElementById("imgMenu1");
   	 var menu2=document.getElementById("imgMenu2");
   	 var menu3=document.getElementById("imgMenu3");
   	 var menu4=document.getElementById("imgMenu4");
   	 
   	 imgName1=menu1.src;
   	 imgName2=menu2.src;
   	 imgName3=menu3.src;
   	 imgName4=menu4.src;

   	 if(id == "lnb101_over"){
   		menu1.src = "/contents/images/new/main_menu01_over.gif";
   		menu2.src = "/contents/images/new/main_menu02.gif";
   		menu3.src = "/contents/images/new/main_menu03.gif";
   		menu4.src = "/contents/images/new/main_menu04.gif";
	}else if(id == "lnb201_over"){
		menu1.src = "/contents/images/new/main_menu01.gif";
   		menu2.src = "/contents/images/new/main_menu02_over.gif";
   		menu3.src = "/contents/images/new/main_menu03.gif";
   		menu4.src = "/contents/images/new/main_menu04.gif"; 	 	
	}else if(id == "lnb301_over"){
		menu1.src = "/contents/images/new/main_menu01.gif";
   		menu2.src = "/contents/images/new/main_menu02.gif";
   		menu3.src = "/contents/images/new/main_menu03_over.gif";
   		menu4.src = "/contents/images/new/main_menu04.gif"; 	 	
	}else if(id == "lnb401_over"){
		menu1.src = "/contents/images/new/main_menu01.gif";
   		menu2.src = "/contents/images/new/main_menu02.gif";
   		menu3.src = "/contents/images/new/main_menu03.gif";
   		menu4.src = "/contents/images/new/main_menu04_over.gif"; 	 	    		
	}
   	 
   	 for(i=0; i<subMenu.length; i++){
   		 if(subMenu[i] == id){
   		 	eval("document.getElementById('"+id+"')").style.display = "block";
   		 }else{
   		 	document.getElementById(subMenu[i]).style.display = "none";
   		 }
   	 }
   }    	
   	
   	//메인 공지사항탭처리
	function showHideNotice(id) {
    	if(id == 1) {
        	document.getElementById("notice_img_tab1").src="/contents/images/new/left_h4_01_over.gif";
        	document.getElementById("notice_img_tab2").src="/contents/images/new/left_h4_02.gif";
        	document.getElementById("notice_img_tab3").src="/contents/images/new/left_h4_03.gif";
        	document.getElementById("notice_img_tab4").src="/contents/images/new/left_h4_04.gif";
        	document.getElementById("notice_con_tab1").style.display="block";
        	document.getElementById("notice_con_tab2").style.display="none";
        	document.getElementById("notice_con_tab3").style.display="none";
        	document.getElementById("notice_con_tab4").style.display="none";
        	document.getElementById("notice_more_tab1").style.display="block";
        	document.getElementById("notice_more_tab2").style.display="none";
        	document.getElementById("notice_more_tab3").style.display="none";
        	document.getElementById("notice_more_tab4").style.display="none";
    	} else if(id == 2) {
        	document.getElementById("notice_img_tab1").src="/contents/images/new/left_h4_01.gif";
        	document.getElementById("notice_img_tab2").src="/contents/images/new/left_h4_02_over.gif";
        	document.getElementById("notice_img_tab3").src="/contents/images/new/left_h4_03.gif";
        	document.getElementById("notice_img_tab4").src="/contents/images/new/left_h4_04.gif";
        	document.getElementById("notice_con_tab1").style.display="none";
        	document.getElementById("notice_con_tab2").style.display="block";
        	document.getElementById("notice_con_tab3").style.display="none";
        	document.getElementById("notice_con_tab4").style.display="none";
        	document.getElementById("notice_more_tab1").style.display="none";
        	document.getElementById("notice_more_tab2").style.display="block";
        	document.getElementById("notice_more_tab3").style.display="none";
        	document.getElementById("notice_more_tab4").style.display="none";
    	} else if(id == 3) {        	
        	document.getElementById("notice_img_tab1").src="/contents/images/new/left_h4_01.gif";
        	document.getElementById("notice_img_tab2").src="/contents/images/new/left_h4_02.gif";
        	document.getElementById("notice_img_tab3").src="/contents/images/new/left_h4_03_over.gif";
        	document.getElementById("notice_img_tab4").src="/contents/images/new/left_h4_04.gif";
        	document.getElementById("notice_con_tab1").style.display="none";
        	document.getElementById("notice_con_tab2").style.display="none";
        	document.getElementById("notice_con_tab3").style.display="block";
        	document.getElementById("notice_con_tab4").style.display="none";
        	document.getElementById("notice_more_tab1").style.display="none";
        	document.getElementById("notice_more_tab2").style.display="none";
        	document.getElementById("notice_more_tab3").style.display="block";  
        	document.getElementById("notice_more_tab4").style.display="none";
        } else if(id == 4) {        	
        	document.getElementById("notice_img_tab1").src="/contents/images/new/left_h4_01.gif";
        	document.getElementById("notice_img_tab2").src="/contents/images/new/left_h4_02.gif";
        	document.getElementById("notice_img_tab3").src="/contents/images/new/left_h4_03.gif";
        	document.getElementById("notice_img_tab4").src="/contents/images/new/left_h4_04_over.gif";
        	document.getElementById("notice_con_tab1").style.display="none";
        	document.getElementById("notice_con_tab2").style.display="none";
        	document.getElementById("notice_con_tab3").style.display="none";
        	document.getElementById("notice_con_tab4").style.display="block";
        	document.getElementById("notice_more_tab1").style.display="none";
        	document.getElementById("notice_more_tab2").style.display="none";
        	document.getElementById("notice_more_tab3").style.display="none";
        	document.getElementById("notice_more_tab4").style.display="block";        	
        }
    }   	
	
	function showHideKnowlege(id) {
    	if(id == 1) {
        	document.getElementById("know_img_tab1").src="/contents/images/new/information_tab_01_over.gif";
        	document.getElementById("know_img_tab2").src="/contents/images/new/information_tab_02.gif";
        	document.getElementById("know_img_tab3").src="/contents/images/new/information_tab_03.gif";
        	document.getElementById("know_con_tab1").style.display="block";
        	document.getElementById("know_con_tab2").style.display="none";
        	document.getElementById("know_con_tab3").style.display="none";
    	} else if(id == 2){
        	document.getElementById("know_img_tab1").src="/contents/images/new/information_tab_01.gif";
        	document.getElementById("know_img_tab2").src="/contents/images/new/information_tab_02_over.gif";
        	document.getElementById("know_img_tab3").src="/contents/images/new/information_tab_03.gif";
        	document.getElementById("know_con_tab1").style.display="none";
        	document.getElementById("know_con_tab2").style.display="block";                	
        	document.getElementById("know_con_tab3").style.display="none";
        } else {
        	document.getElementById("know_img_tab1").src="/contents/images/new/information_tab_01.gif";
        	document.getElementById("know_img_tab2").src="/contents/images/new/information_tab_02.gif";
        	document.getElementById("know_img_tab3").src="/contents/images/new/information_tab_03_over.gif";
        	document.getElementById("know_con_tab1").style.display="none";
        	document.getElementById("know_con_tab2").style.display="none";
        	document.getElementById("know_con_tab3").style.display="block";        	
        }		
	}
	
//원고보기	
var paper1_on=0;
var paper2_on=0;

function showHidePaper(id) {
	if(id == 1) {
			document.getElementById("paper1").style.visibility="visible";
			document.getElementById("paper2").style.visibility="hidden";
			document.getElementById("imgp1").src="/contents/images/new/a_text_01_ov.gif";
			document.getElementById("imgp2").src="/contents/images/new/a_text_02.gif";
	} else if(id == 2) {	
			document.getElementById("imgp1").src="/contents/images/new/a_text_01.gif";
			document.getElementById("imgp2").src="/contents/images/new/a_text_02_ov.gif";
			document.getElementById("paper1").style.visibility="hidden";
			document.getElementById("paper2").style.visibility="visible";
	}
}	

function engPopOpen() {
	window.open('http://sgis1.kostat.go.kr/statistics_eng/html/index.jsp','eng','width=1024, height=698, toolbars=1, menubars=1, location=1, status=1, toolbar=1, scrollbars=1, resizable=1');
}

function movieView() {
	document.getElementById("movie_area").style.display="block";
}

function popzoneShowHide(id, tot) {

	for(i=1; i <= tot; i++) {
		if(i == id) {
			document.getElementById("popzone_"+i).style.display="block";
			document.getElementById("imgPop"+i).src="/contents/images/new/num0"+i+"_ov.gif";
		} else {
			document.getElementById("popzone_"+i).style.display="none";
			document.getElementById("imgPop"+i).src="/contents/images/new/num0"+i+".gif";
		}
	}
 	document.getElementById("movie_area").style.display="none";
 }

function showHideNavi(c) {
	if(c == 0) {	//내비선택버튼 감추기
		document.getElementById("switch_navi_select").style.visibility="hidden";
	} else if(c == 1) {	//내비선택버튼 보이기
		document.getElementById("switch_navi_select").style.visibility="visible";
	}
}