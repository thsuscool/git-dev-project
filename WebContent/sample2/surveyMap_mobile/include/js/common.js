$(function(){    
	 common.event(); 
	 //common.calendar();
	 quickEvent();
	 if($(".normalBox").length ){
		$('.treeBox01').easytree();
		$('.treeBox02').easytree();
	 }
	 
}); 
common = {     
	calendar:function(){
		$(".inpDate").datepicker({ 
			dateFormat: "yy년mm월dd일"
		});
	},
	event:function(){      
		$(".mClose").hammer().on("tap", function(ev){// 전체메뉴 닫기
			$('.totalMenu').stop().animate({"background-color":"rgba(0,0,0,0)"},0, 'easeOutQuad', function(){
				$('.totalMenu').stop().animate({"right":"-2000px"},2500, 'easeOutQuad');  
			});  
		});  
		$(".mtabs02 li").hammer().on("tap", function(ev){ // 탭메뉴
			var inx = $(this).index()+1;   
			$(".tabArea01, .tabArea02, .tabArea03").hide();
			$(".tabArea0"+inx).show();
			$(".mtabs02 li").removeClass("on");
			$(this).addClass("on"); 
		}); 
		 
		$(".quickEvt02").hammer().on("tap", function(ev){  //메인 TOP버튼
			$(".container").stop().animate({scrollTop: 0},300, 'easeOutQuad');
		});   
		$(".totalMenu").hammer().on("dragend", function(ev){ 
			ev.gesture.stopPropagation(); 
			var deltaX = ev.gesture.deltaX;
			var direction = ev.gesture.direction;  
			if(direction == "left"){
				$('.totalMenu').stop().animate({"right":"-2000px"},1000, 'easeOutQuad'); 
			}
		});
		$(".aMenu").hammer().on("tap", function(ev){// 전체메뉴 열기 
			$('#totalMenu').stop().animate({"right":"0"},600, 'easeOutQuad', function(){
				$('#totalMenu').stop().animate({"background-color":"rgba(0,0,0,.5)"},800, 'easeOutQuad');  
			}); 
		}); 
		$(".dialog .dialogBar>a").hammer().on("tap", function(ev){
			$('.dialog').hide();   
		});  
	}
	 
}  
function quickEvent(){
	var body = $("body"); 
	body.on("click",".rightQuick.rq01", function(){
		var on = $(this).hasClass("on");
		$(".rightQuick").removeClass("on");
		$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
		$(".rqListBox>li>a").removeClass("on");
		$(".rqListBox").stop().animate({"right":"-550px"},200);
		if(!on){
			$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
			$(this).addClass("on");
		}else{
			$(this).next(".rqListBox").stop().animate({"right":"-550px"},200);
			$(this).removeClass("on");
		}
	});
	body.on("click",".rightQuick.rq02", function(){
		var on = $(this).hasClass("on");
		$(".rightQuick").removeClass("on");
		$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
		$(".rqListBox>li>a").removeClass("on");
		$(".rqListBox").stop().animate({"right":"-550px"},200);
		if(!on){
			$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
			$(this).addClass("on");
		}else{
			$(this).next(".rqListBox").stop().animate({"right":"-550px"},200);
			$(this).removeClass("on");
		}
	});
	body.on("click",".rightQuick.rq06", function(){
		var on = $(this).hasClass("on");
		$(".rightQuick").removeClass("on");
		if(!on){
			$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
			$(this).addClass("on");
		}else{
			$(this).next(".rqListBox").stop().animate({"right":"-550px"},200);
			$(this).removeClass("on");
		} 
	}); 
	body.on("click",".rightQuick.rq07", function(){
		var on = $(this).hasClass("on");
		if(!on){
			$(this).addClass("on");
			$(this).css("background-image","url(../../include/img/ico/ico_moveType02.png)");
		}else{
			$(this).removeClass("on");
			$(this).css("background-image","url(../../include/img/ico/ico_moveType01.png)");
		} 
	}); 
	
	var settingList = ".rqListBox a";
	body.on("click", ".rqListBox>li>a", function(){
		var on = $(this).hasClass("on"); 
		if(!on){
			$(".rqListBox>li>a").removeClass("on");
			$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
			$(this).next("ul").show();
			$(this).next("ol").show();
			$(this).addClass("on");
		}else{
			$(this).next("ul").hide();
			$(this).next("ol").hide();
			$(this).removeClass("on");
		}
	});
	 
	var optionList = ".rqListBox>li>ul>li>a";
	body.on("click", optionList, function(){ 
		var val = $(this).html();
		$(this).parents("ul").eq(0).prev("a").empty().html(val).removeClass("on");
		$(this).parents("ul").eq(0).hide();
	});
	body.on("click", ".sideQuick.sq02", function(){ 
		var on = $(this).hasClass("on");
		if(!on){
			$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
			$(".quickBox.step01").stop().animate({"left":"0"},200);
			$(".shadow").show(); 
			$(this).find("span").hide();
			$(this).addClass("on").css("width","40px");
		}else{ 
			stepCloseAnimate(1); 
			$(this).find("span").show();
			$(this).removeClass("on").css("width","90px");
		} 
	}); 
	body.on("click",".sideQuick.sq03", function(){
		var on = $(this).hasClass("on");
		if(!on){
			$(this).next(".sqListBox").stop().animate({"left":"0px"},200);
			$(this).addClass("on");
		}else{
			$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
			$(this).removeClass("on");
		}
	}); 
	 
}