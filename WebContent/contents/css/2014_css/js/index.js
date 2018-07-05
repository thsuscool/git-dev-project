function moveTab(gb){
	for(i=1; i<5; i++){
		if(gb != i){
			$("#notice0"+i).hide();
		}else{ 
			$("#notice0"+i).show();
			 
		}
		
	}
	if(gb == 1){
		$("#noticeGb").attr("href", "/contents/support/support_07.jsp");		//최근자료 나오면 url 달아야함
		$("#newDataViewMore").attr("alt", "최근자료 더보기");
	}else if(gb == 2){
		$("#noticeGb").attr("href", "/contents/support/support_01.jsp?code=Y");
		$("#newDataViewMore").attr("alt", "공지사항 더보기");
	}else if(gb == 3){
		$("#noticeGb").attr("href", "/contents/support/support_03.jsp");
		$("#newDataViewMore").attr("alt", "자주묻는 질문 더보기");
	}else if(gb == 4){
		$("#noticeGb").attr("href", "/contents/support/support_02.jsp");
		$("#newDataViewMore").attr("alt", "질문과 답 더보기");
	}
}


function popUpMenu(url, name){
	//움직이는 피라미드 막는 url
//	if(url == "http://sgis.nso.go.kr/pyramid/view_country.asp"){
//		alert("새로운 추계인구발표로 데이터 정비중입니다. \n\n 이용해 불편을 드려 죄송합니다. ");
//		return false;
//	}
	window.open(url, name, 'width=1600,height=800,status=yes,scrollbars=yes');
}

function topLogin(){
	var httpCode = location.href.substr(0,5);
//  pop_login = window.open('https://sgis1.kostat.go.kr/contents/member/pop_login.jsp','','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
  pop_login = window.open('https://'+location.host+'/contents/member/pop_login.jsp?httpCode='+httpCode+'','','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
}

function popEmailReject(url){
  pop_login = window.open(url,'','width=550,height=450,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
}

function popPrivate(url){
	pop_login = window.open(url,'','width=580,height=800,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=1,resizable=0');
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


function getCookie(name)
{
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0; while(i< clen)
  {
    var j = i + alen;
    if(document.cookie.substring(i,j)==arg)
      {
      var end = document.cookie.indexOf(";",j);
      if(end == -1) end = document.cookie.length;
      return unescape(document.cookie.substring(j,end));
      }
    i=document.cookie.indexOf(" ",i)+1;
    if (i==0) break;
  }
  return null;
}

//쿠키저장
function setCookie( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

  
//로그인 여부 체크
function loginClick(url){

    if(!checkLogin2014(url)) return;
    window.location.replace(url);
  }

function moveNewData(stat_nm, reg_date){
	document.getElementById("statNm").value= stat_nm;
	document.getElementById("regDate").value= reg_date;
	document.getElementById("fromGroupBy").value= 'fromGroupBy';
	
	var form = document.recentForm;
	
	form.submit();
	return false;
}