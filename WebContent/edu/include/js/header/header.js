document.write("<meta http-equiv='X-UA-Compatible' content='IE=edge' />");
document.write("<div class='header' id='header'>");
document.write("<h1><a href='/'><img src='/edu/include/img/etc/etc_logo.png' alt='SGIS' /></a>" +
		"<a href='/edu/jsp/main.jsp'><img src='/edu/include/img/etc/edu_home.png' alt='SGIS' style='margin-left:-10px;'/></a></h1>");
document.write("<ul class='gnb'>");
document.write("<li><a id='tit01' href='/edu/jsp/sub01.jsp'>SGIS에듀가 알려주는 사회변화</a></li>");
document.write("<li><a id='tit02' href='/edu/jsp/sub05.jsp'>생활에 유익한 SGIS에듀 체험</a></li>");
document.write("<li><a href='/edu/jsp/board/edu_board_list.jsp'>이벤트게시판</a></li>");
document.write("<li><a id='tit04' href='/edu/jsp/game01.jsp'>카드뒤집기</a></li>");
document.write("<li><a id='tit05' href='/edu/jsp/game02.jsp'>OX퀴즈</a></li>");
document.write("</ul>");
//document.write("<a href='/edu/jsp/main.jsp' class='topRight'><img src='/edu/include/img/etc/etc_total.png' alt='' /></a>");
document.write("</div>");


titHighLight();		


function titHighLight(){
	var curPage = document.location.href;
	var pageNum = curPage.length;
	var pageName = curPage.substring(pageNum-10, pageNum-4);
	pageNum = curPage.substring(pageNum-6, pageNum-4);

	if(pageName == "game01"){
		$("#tit04").addClass("on");
	} else if(pageName == "game02"){
		$("#tit05").addClass("on");
	} else if(pageNum == "01" || pageNum == "02" || pageNum == "03" || pageNum == "04" || pageNum == "09" || pageNum == "10"){		//SGIS에듀가 알려주는 사회변화
		$("#tit01").addClass("on");
		apiLogWrite("Q02","SGIS 에듀가 알려주는 사회변화");
	}else if(pageNum == "05" || pageNum == "06" || pageNum == "07" || pageNum == "08"){		//생활에 유익한 SGIS에듀 실험
		$("#tit02").addClass("on");
		apiLogWrite("Q03","생활에 유익한 SGIS에듀 체험");
	} else{
		apiLogWrite("Q01","SGIS 에듀 메인페이지");
	}
	
}





//mng_s  20170801 로그 추가
function apiLogWrite(api_id, title){
	//type, api_id, title, parameter, zoomLevel, adm_nm
	jQuery.ajax({
 		type:"POST",
 		url: "/ServiceAPI/common/APILogWrite.json",
 		data:{	"type": "Q0",
 			"api_id" : api_id,
 			"title" : title,
 			"parameter" : "없음",
 			"zoomLevel" : "00",
 			"adm_nm" : "전국"
 		},
		async: true,
 		success:function(data){ 
 		//	alert("success");
 		},
 		error:function(data) {
 		//	alert(data);
 		}
	});
	
}
//mng_e  20170801 로그 추가







