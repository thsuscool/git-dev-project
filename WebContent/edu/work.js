var work = [  
	/*etc*/
	{ "cate":"m01", "dep01":"기타", "dep02":"메인", "url":"html/etc/main.html", "date":"2016-10-23" }, 
	{ "cate":"m01", "dep01":"기타", "dep02":"저출산 고령화문제", "url":"html/etc/sub01.html", "date":"2016-10-23" },  
	{ "cate":"m01", "dep01":"기타", "dep02":"대도시 쏠림현상", "url":"html/etc/sub02.html", "date":"2016-10-23" },
	{ "cate":"m01", "dep01":"기타", "dep02":"사회와 가정의 변화", "url":"html/etc/sub03.html", "date":"2016-10-23" },
	{ "cate":"m01", "dep01":"기타", "dep02":"도시의 성장에 따른 거주공간의 변화", "url":"html/etc/sub04.html", "date":"2016-10-23" },

	{ "cate":"m01", "dep01":"기타", "dep02":"통계커뮤니티맵", "url":"html/etc/sub05.html", "date":"2016-10-25" },
	{ "cate":"m01", "dep01":"기타", "dep02":"통계지도만들기", "url":"html/etc/sub06.html", "date":"2016-10-25" },
	{ "cate":"m01", "dep01":"기타", "dep02":"나의데이터", "url":"html/etc/sub07.html", "date":"2016-10-25" },
	{ "cate":"m01", "dep01":"기타", "dep02":"살고싶은우리동네", "url":"html/etc/sub08.html", "date":"2016-10-25" }
	
	
];

 
$(function(){   
	listTable(".siteNavi li", ".siteNavi li .num");
}); 
 
function listTable(cls, num){   
	var tr;
	for(i=0; i<work.length; i++){
		tr += "<tr class="+work[i].cate+">";
		tr += "<td>"+work[i].dep01+"</td>";
		tr += "<td>"+work[i].dep02+"</td>";
		tr += "<td><a href='./"+work[i].url+"' target='_blank'>"+work[i].url+"</a></td>";
		tr += "<td class='ac'>"+work[i].date+"</td>";
		tr += "</tr>"; 
	}  
	$("table tbody").append(tr);  
	
	$(num).each(function(z){
		if(z===0){
			$(num).eq(z).text("("+work.length+"p)");
		}else{
			$(num).eq(z).text("("+$('.m0'+z).length+"p)");
		} 
	}); 
	$("body").on("click",cls, function(){
		$(cls).removeClass("on"); 
		$(this).addClass("on");
		$("table tbody tr").hide();
		if($(this).index() === 0){
			$("table tbody tr").show();
		}else{
			$(".m0"+$(this).index()).show();
		} 
	});  
}

