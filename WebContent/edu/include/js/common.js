$(function(){  
	//common.mainSlide(); 
	common.event();  
	$('#nav').localScroll(800);
	$('#btnTop').localScroll(800);
	$('.topMenuList').localScroll(800);
	
	//$('#mbox01').parallax("50%", 0.1); 
	//$('#mbox02').parallax("50%", 0.1); 
	//$('#mbox04').parallax("50%", 0.4);
	//$('#mbox03').parallax("50%", 0.3);
});   
common = {     
	event:function(){  
		var body = $("body");
		var topList = [];
		$(".mboxArea").each(function(i){
			var t = $(this).offset().top;
			topList.push(t);
		}); 
		$(window).on("scroll", function(){
			var t = $(this).scrollTop()+150; 
			$.each(topList, function(i, v){ 
				if(t > v){ 
					$("#nav li a").removeClass("on");
					$("#nav li:eq("+i+") a").addClass("on");
					var propBot = $("body").prop("scrollHeight");
					var bot = $(window).height() + $(window).scrollTop();
					if(propBot == bot){
						$("#nav li a").removeClass("on");
						$("#nav li:last a").addClass("on");
					}

				} 
			}); 
		});
		/*
		body.on("click","#nav li a",function(){ 
			$("#nav li a").removeClass("on");
			$(this).addClass("on");
		});
		body.on("click",".btnTop",function(){  
			$("#nav li a").removeClass("on");
			$("#nav li:eq(0) a").addClass("on");
		});
		*/
		  
	} 
}  


//mng_s  20170801 로그 추가
function apiLogWrite3(api_id, title){
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
//	
	
}
//mng_e  20170801 로그 추가
