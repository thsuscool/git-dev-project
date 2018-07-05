$(function(){  
	var body = $("body");
	slideValue(".sliderDefault");  
    scrollWidth(); 
    quickEvent();
    legendEvent();
    sideEvent(); 
    
    resizeColor("#ccc", "#890e4f", ".goganList tr", 10);
    legendColor("#ccc", "#890e4f", ".colorbar", 10);
    legendColor("#ccc", "#890e4f", ".colorSettingList01", 10);
    legendColor("#ccc", "#fde3ec", ".dbColorbar", 4);
	clickListColor("#0478cb");
	dragAnimate("#0478cb");
	colorck();
	linkTooltip();
     
    if($('.stepTreeBox').length){
    	$('.stepTreeBox').easytree({
            slidingTime:0, 
            building:treeWidth,
            stateChanged:treeWidth,
            toggled:treeWidth
        }); 
    }
    if ($(".date").length){
    	datePicker();
    }
    if ($(".jumSlide").length){
    	jumSlider();
    }
    if ($(".heatTable").length){
    	heatTable();
    }
    if ($(".popBox").length){
    	popClose();
    }
    if ($(".goganList").length){ 
    	lvSelect();
    	goganConfirm();
    } 
    if ($(".tabs.only").length){
    	userColorSetting(); 
    } 
    if ($(".pvContents>.charts").length){
    	pvcCharts(); 
    } 
    
    popEvent();
    $(".normalBox").mCustomScrollbar({axis:"xy"}); 
    $(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({axis:"xy"});
    
    /*0803*/
    newEvent();
   
});
function slideValue01(from, to, slider, etc){
    var domFrom = "#"+from;
    var domTo = "#"+to;
    var domSlider = slider;
	for (var i=1; i<=301; i++) {
        var tmpText = i + etc;
        if (i == 301) {
            tmpText = "300+"
        } 
        $(domFrom).append($("<option>", { 
            value: i,
            text : tmpText
        }));
        $(domTo).append($("<option>", { 
            value: i,
            text : tmpText
        }));
    }
    $(domFrom).val("60");
    $("."+from).text("약 "+(60/3.3).toFixed(1)+"평");
    $(domTo).val("85");
    $("."+to).text("약 "+(85/3.3).toFixed(1)+"평");
    $(domFrom).change(function(){
        var spaceTo = $(domTo).val();
        if (parseInt($(this).val()) > parseInt(spaceTo)) {
            $(this).val(spaceTo);
        }
        $(domSlider).slider("values", 0, $(this).val());
        $("."+from).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
        
    });
    $(domTo).change(function(){
        var spaceFrom = $(domFrom).val();
        if (parseInt($(this).val()) < parseInt(spaceFrom)) {
            $(this).val(spaceFrom);
        }
        $(domSlider).slider("values", 1,  $(this).val());
        $("."+to).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
    });
    $(domSlider).slider({
        range: true,
        min: 1,
        max: 300,
        values : [60, 85],
        slide : function(e, ui) {
            $(domFrom).val(ui.values[0]);
            $(domTo).val(ui.values[1]);	
            $("."+from).text("약 "+(ui.values[0]/3.3).toFixed(1)+"평");
            $("."+to).text("약 "+(ui.values[1]/3.3).toFixed(1)+"평");
        }
    });
}
function pvcCharts(){
	$('.pvContents>.charts').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        legend: {
            borderWidth:0,
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 50
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
                name: "기업",
                y: 56.33
            }, {
                name: "쇼핑",
                y: 24.03
            }, {
                name: "음식점",
                y: 10.38
            }, {
                name: "생활/편의",
                y: 4.77
            }, {
                name: "교육",
                y: 0.91
            }]
        }]
    });
}
function popEvent(){
	$("body").on("click",".hangjungArea .resizeIcon",function(){
		var cls = $(".hangjungArea");
		var ck = cls.hasClass("on");
		if(!ck){
			cls.addClass("on");
		}else{
			cls.removeClass("on");
		}
	});
}
function popClose(){
	$("body").on("click",".topbar>a, .hanClose",function(){
		$(this).parents(".popBox").eq(0).hide();
		var id = $(this).parents(".popBox").eq(0).attr("id");
		if(id=="guganSettingLayer"){
			$(".legendPopEvent").eq(0).removeClass("on");
			$(".JCLRgrips").remove();
			goganListResize(); 
		}else if(id=="colorSettingLayer"){
			$(".legendPopEvent").eq(1).removeClass("on");
		}
	});
}
function userColorSetting(){
	$("body").on("click",".tabs .btnStyle01",function(){
		$(this).parents(".tabs").eq(0).find(".btnStyle01").removeClass("on");
		$(this).addClass("on");
	});
	$("body").on("click",".tabs.only>a",function(){
		$("#colorSetting").hide();
		$(".colorSettingList01").css({"width":"380px"});
		$(".colorbarBox>a").css("top","-5000px");
		var inx = $(this).index(".tabs.only>a");
		if(inx==0){
			$("#colorSetting").show();
			legendColor("#666", "#890e4f", ".colorSettingList01", 10);
		}else if(inx==1){
			legendColor("#ff1b00", "#048cfc", ".colorSettingList01", 10);
		}else{
			$(".colorbarBox>a").css("top","5px");
			$(".colorSettingList01").css({"width":"300px"});
			legendColor("#193b70", "#00b051", ".colorSettingList01", 10);
		}
	});
	$('.colorbarBox>a').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
	 
	$('body').on('click', ".legendPopEvent", function(){
		var ck = $("#typeArea").attr("class");
		if(ck == "jum"){
			$("#jumSettingLayer").show(); 
		}else{
			var id = $(this).attr("data-id"); 
			$("#"+id).show(); 
			if(id=="guganSettingLayer"){
				goganListResize();
			}
		}
		
	});
	
	$('body').on('click', ".markerLib ul li a", function(){
		$(".markerLib ul li a").removeClass("on");
		$(this).addClass("on");
	});
	$('body').on('click', "#markerPopup", function(){
		$("#markerLibLayer").show(); 
	});
	$('body').on('click', ".markerList li a", function(){
		$(".markerList li a").removeClass("on");
		$(this).addClass("on");
		$(".jumMarkerLink").empty().html($(this).html());
	});
	$('body').on('click', ".opacityBox .colorck li a", function(){ 
		$(".jumColorLink").css("background",$(this).text());
	});
	
	$('.jumColorLink').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
	$('body').on('change sliderup sliderdown slidermove', ".jumColorLink", function(){
		$(".opacityBox .colorck li a.on").css("background",$(this).val()).text($(this).val()); 
	});
	$('body').on('change', "#opacitySel01", function(){
		var val = $(this).val(); 
		$("#colorSetting01").css("opacity", val);  
	});
	
	$('body').on('change', "#opacitySel", function(){
		var val = $(this).val(); 
		$("#colorSetting").css("opacity", val);  
	});
	
	
	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fl", function(){
		var colorEnd = $(".colorbarBox>.fr").text();
		$(".colorbarBox>.fl").text($(this).val());
		legendColor(colorEnd, $(this).val(), ".colorSettingList01", 10);
	});
	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fr", function(){
		var colorStart = $(".colorbarBox>.fl").text();
		$(".colorbarBox>.fr").text($(this).val());
		legendColor($(this).val(), colorStart, ".colorSettingList01", 10);
	});
} 
function heatTable(){
	$('.heatTable').wheelColorPicker({
		layout: 'block',
		format: 'css'
	}); 
	$('.heatTable').on('slidermove', function() {
		$('#color-label').text($(this).val());
	}); 
}
function jumSlider(){
	$(".jumSlide").slider({
    	range: false, 
		min : 0,
		max : 10,
		values : [10],
        slide : function(e, ui) { //ui.values[0]
        	$("#typeArea .colorck>li>a").css({"width":parseInt(ui.values[0]+7)+"px",
        		"height":parseInt(ui.values[0]+7)+"px",
        		"margin-top":parseInt(10-ui.values[0])+"px"}); 
        }
	});
}
function datePicker(){
	$( ".date" ).datepicker({
      showOn: "button",
      buttonImage: "/img/ico/ico_calendar.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
}
function clickListColor(bgColor){
	var selector = ".sqListBox.sq03 .sqList ul li a.on";
	$(selector).css("background", bgColor).animate({"opacity": "1"}, 1500)
	.animate({"opacity": ".5"}, 1500, null, clickListColor);
} 
function dragAppend(selector, bgColor){ 
	$(selector).css("background-color", bgColor);
	$(selector).append("<span class='mask'></span><span class='color'></span>");  
}
function dragListColor(){  
	var selector = ".sqListBox.sq03 .sqList ul li a.drag>.color";
	$(selector).animate({"background-position-x":"260px"}, 1200) 
	.animate({"background-position-x":"0"}, 0, null, dragListColor);   
}
function dragAnimate(bgColor){
	var selector = ".sqListBox.sq03 .sqList ul li a.drag"; 
	dragAppend(selector, bgColor);
	dragListColor();
}
function colorck(){ 
	$(".colorck li").each(function(i){ 
		var selector = $(this).children("a");
		selector.css("background",selector.text());
	});
	$("body").on("click",".colorck li>a",function(){
		$(this).parents(".colorck").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		var id = $(this).parents(".colorck").eq(0).attr("id");
		var color = $(this).text();
		var listLegnth = $(".lvSelect").val(); 
		if(id=="colorSetting"){
			legendColor("#ccc", color, ".colorSettingList01", listLegnth);
		}else if(id=="legendColor"){
			legendColor("#ccc", color, ".colorbar", listLegnth);
			resizeColor("#ccc", color, ".goganList tr", listLegnth);
		} 
		$(".JCLRgrips").remove();
		goganListResize();
		 
	}); 
}
var onSampleResized = function(e){ // 범례구간설정 구간리사이즈 드래그할때 value 값 호출 
	var columns = $(e.currentTarget).find("td");
	var msg="";
	columns.each(function(i){ msg += "td("+i+ "):"+ parseInt($(this).width()*0.267) + " / "; })
	alert(msg);
	//$(".goganListValue").html(msg);
	
};	
var goganListResize = function(){ // 범례구간설정 구간리사이즈 플러그인 호출
	$(".goganList").colResizable({
		liveDrag:true, 
		gripInnerHtml:"<div class='grip'></div>", 
		draggingClass:"dragging", 
		partialRefresh:true,
		onResize:onSampleResized
	}); 
}
 
function goganConfirm(){  // 범례구간설정 적용버튼
	$("body").on("click","#goganEvent", function(){
		var lv = $(".popBox .lvSelect").val();   
		var color = $(".colorck li>a.on").css("background-color");
		legendColor("#ccc", color, ".colorbar", lv);
	});
}
function lvSelect(){ // 범례구간설정 셀렉트 체인지 이벤트
	$("body").on("change",".popBox .lvSelect",function(){
		var lv = $(this).val();
		var color = $(".colorck li>a.on").css("background-color");
		resizeColor("#ccc", color, ".goganList tr", lv); 
		$(".JCLRgrips").remove();
		goganListResize();
		
	}); 
}
function resizeColor(c01, c02, cls, max){  // 범례구간설정 색지정
	var arrColor = new Array();
	var paramColor1 = c01;
	var paramColor2 = c02;
	
	for ( var i = 0; i < max; i++) {
		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
		arrColor.push(paramColor);
	} 
	$(cls).empty();
	for ( var i = 0; i < arrColor.length; i++) { 
		$(cls).prepend("<td style='background:" + arrColor[i] + ";'></td>");	
	}
}
function legendColor(c01, c02, cls, max){
	var arrColor = new Array();
	var paramColor1 = c01;
	var paramColor2 = c02;
	
	for ( var i = 0; i < max; i++) {
		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
		arrColor.push(paramColor);
	} 
	$(cls).empty();
	for ( var i = 0; i < arrColor.length; i++) {
		var txt = i+1;
		if(txt<10){
			txt = "0"+txt;
		}
		$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");	
	}
	if($("#typeArea").attr("class")=="color"){
		var liHeight = parseInt(220/max); 
		$(cls+" li").css("height",liHeight+"px");
		$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*max))+"px");
	}
	
}
function linkTooltip(){
	$("a").tooltip({ 
		open: function( event, ui ) {
			$(".ui-tooltip .subj").text($(this).attr("data-subj"));
		},
		position: {
	        my: "center bottom-40", at: "center top", 
	        using: function( position, feedback ) {
	          $( this ).css( position ).prepend("<span class='subj'></span>");
	          $( "<div>" )
	            .addClass( "arrow" )
	            .addClass( feedback.vertical )
	            .addClass( feedback.horizontal )
	            .appendTo( this );
	        }
	    } 
	});
}
function slideValue(selector){ 
    $(selector).slider({ 
        min: 1,
        max: 3,
        values : [1]
    });
}
function slideValue02(selector){ 
    $(selector).slider({ 
        range:true,
    	min: 1,
        max: 10,
        values : [1,3]
    });
}
function stepCloseAnimate(inx){  
    var time = 300;
    var fx = '.quickBox'; 
    var btn = '.sideQuick.sq02';
    $(fx).queue("step04", function(){ 
    	$(btn).stop().animate({"left":"840px"},time);
        $(fx+'.step04').animate({"left":"-280px"}, time);    
    }); 
    $(fx).queue("step03", function(){
        $(fx+'.step04').css({"left":"-280px"});
        $(btn).stop().animate({"left":"560px"},time);
        $(fx+'.step03').animate({"left":"-280px"}, time);    
    }); 
    $(fx).queue("step02", function(){
        $(fx+'.step04, '+fx+'.step03').css({"left":"-280px"});
        $(btn).stop().animate({"left":"280px"},time);
        $(fx+'.step02').animate({"left":"-280px"}, time);       
    }); 
    $(fx).queue("step01", function(){
        $(fx+'.step04, '+fx+'.step03, '+fx+'.step02').css({"left":"-280px"});
        $(btn).stop().animate({"left":"0"},time).removeClass("on");
        $(fx+'.step01').animate({"left":"-280px"}, time);   
        $(btn).find("span").show();
        $(btn).css("width","90px");
        $(".shadow").hide();
    }); 
    $(fx).dequeue("step0"+inx);  
}
function scrollWidth(){
    var defaultSize = 0;
    $(".xWidth li").each(function(i){
        var bigSize = $(this).find("label").width();  
        if(defaultSize<bigSize){
            defaultSize = bigSize;
            $(".xWidth").css("width",parseInt(defaultSize+80)+"px");
        }
    }); 
}
function treeWidth(){ 
    $(".stepTreeBox").css("width","230px"); 
    var stepWidth = $(".stepTreeBox>ul").prop("scrollWidth"); 
    $(".stepTreeBox").css({"width":parseInt(stepWidth)+"px"});  
    $(".normalBox").mCustomScrollbar("update");
}
function legendEvent(){
	var body = $("body"); 
	body.on("click",".lgTypeList li a", function(){
		var cls = $(this).attr("data-type");
		$("#typeArea").removeClass().addClass(cls);
		var lv = $(".popBox .lvSelect").val();  
		var color = $(".colorck li>a.on").css("background-color");
		legendColor("#ccc", color, ".colorbar", lv);
	});
	body.on("click",".btn_legendSetting", function(){
		var on = $(this).hasClass("on");
		if(!on){
			$(".lgListBox").stop().animate({"left":"220px"},200);
			$(this).addClass("on");
		}else{
			$(".lgListBox").stop().animate({"left":"-550px"},200);
			$(this).removeClass("on");
		}
	});
	var settingList = ".lgListBox>li>a";
	body.on("click", settingList, function(){
		var on = $(this).hasClass("on");
		if(!on){
			$(this).siblings("ul").show();
			$(this).addClass("on");
		}else{
			$(this).siblings("ul").hide();
			$(this).removeClass("on");
		}
	});
	var optionList = ".lgListBox>li>ul>li>a";
	body.on("click", optionList, function(){ 
		var html = $(this).html();
		$(this).parents("ul").eq(0).siblings("a").empty().html(html).removeClass("on");
		$(this).parents("ul").eq(0).hide();
	});
	body.on("click", ".btn_legend", function(){ 
		var legendBox = $(".legendBox");
		var ing = legendBox.attr("data-ing");
		legendBox.removeClass(ing); 
		$(".btn_legendSetting").removeClass("on");
		$(".lgListBox").stop().animate({"left":"-550px"},200);
		if(ing=="hide"){  
			legendBox.attr("data-ing", "min");
			legendBox.addClass("min");
		}else if(ing=="min"){ 
			legendBox.attr("data-ing", "max");
			legendBox.addClass("max");
		}else if(ing=="max"){
			legendBox.attr("data-ing", "hide");
			legendBox.addClass("hide");
		}
		
	});
	
}
function sideEvent(){
	var body = $("body");
	body.on("click",".dscList dt>a",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");
			$(this).parents("dt").next("dd").hide();
		}else{
			$(this).removeClass("on");
			$(this).parents("dt").next("dd").show();
		} 
	});
	body.on("click",".dataSideBox .bar>a",function(){ 
		$(".dataSideBox").stop().animate({"right":"-1500px"},200);
		$(".colorMapLegend").stop().animate({"right":"130px"},200);
		$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
	});
	body.on("click",".interactiveDataBoard",function(){ 
		var ck = $(this).hasClass("on");
		if(!ck){
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({"right":"0"},200);
			$(".colorMapLegend").stop().animate({"right":"560px"},200);
			if(!full){
				$(this).addClass("on").stop().animate({"right":"430px"},200);
			}else{
				$(this).addClass("on").stop().animate({"right":"670px"},200);
			}
			
		}else{
			$(".dataSideBox").stop().animate({"right":"-1500px"},200);
			$(".colorMapLegend").stop().animate({"right":"130px"},200);
			$(this).removeClass("on").stop().animate({"right":"0"},200);
		} 
	});
	$("#dataSlider").slider({
    	range: "min",
        min: 5,
        max: 10,
        value: 10,
        slide: function( event, ui ) {  //ui.value
        	//$(".interactiveSelect").text(ui.value*0.1);
        	$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value*0.1);
	    }
    });
	$(".dataSideBox, .interactiveDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
	$("#leftSlider").slider({
    	range: "min",
        min: 5,
        max: 10,
        value: 10,
        slide: function( event, ui ) {  //ui.value
        	//$(".interactiveSelect").text(ui.value*0.1);
        	$(".sqListBox.sq03").css("opacity", ui.value*0.1);
	    }
    });
	$(".sqListBox.sq03").css( "opacity", $("#leftSlider").slider( "value" ) );
	
	
}
function quickEvent(){
	var body = $("body");
	body.on("click",".sqTabs a",function(){
		$(".sqTabs a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click",".sqdel",function(){ 
		$(this).parents("li").eq(0).remove();
	});
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
	body.on("mouseover", settingList, function(){
		$(this).addClass("over");
	});
	body.on("mouseout", settingList, function(){
		$(this).removeClass("over");
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
	/*quick step*/
	body.on("click",".stepClose",function(){ 
        stepCloseAnimate(parseInt($(this).index(".stepClose")+1)); 
    }); 
	body.on("click", ".qmdl dd ul>li>a", function(){   
		var inx = $(this).parent("li").index();
		var qm = $(this).parents("ul").eq(0).attr("class");
		$(".qmdl dd ul>li").removeClass("on");
		$(this).parent("li").addClass("on");
		$(".totalResult").hide();
		/*
		if(qm=="qmIcon01"){
			//$(".totalResult.tr0"+parseInt(inx+1)).show();
		}else if(qm=="qmIcon02"){
			$(".totalResult.tr0"+parseInt(inx+5)).show();
		}else if(qm=="qmIcon03"){
			$(".totalResult.tr0"+parseInt(inx+6)).show();
		}else if(qm=="qmIcon04"){
			$(".totalResult.tr0"+parseInt(inx+7)).show();
		}
		
		
		$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
		$(".quickBox.step02").stop().animate({"left":"280px"},200);
		$(".quickBox.step03").stop().animate({"left":"0px"},200);
		$(".quickBox.step04").stop().animate({"left":"0px"},200);
		*/
	});   
	body.on("click", ".wonList01 li:not(.disabled) a", function(){    
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
	});
	
	body.on("click", "#btnSample01", function(){    
		$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
		$(".quickBox.step03").stop().animate({"left":"560px"},200);
	});
	body.on("click", "#btnSample02", function(){    
		$(".sideQuick.sq02").stop().animate({"left":"1120px"},200);
		$(".quickBox.step04").stop().animate({"left":"840px"},200);
	});  
	
	body.on("click",".cateMenu li a",function(){
		var inx = $(this).parent("li").index();
		$(this).parents(".cateMenu").eq(0).nextAll("div").hide();
		$(this).parents(".stepBox").eq(0).find(".cm0"+parseInt(inx+1)).show();
        $(this).parents(".cateMenu").eq(0).children("li").removeClass("on");
        $(this).parents("li").eq(0).addClass("on");
    });  
	body.on("click",".tb_close",function(){ 
		$(this).hide(); 
		$(this).parents(".sceneBox").eq(0).remove();
		$(".resizeIcon").hide();
		var sceneInx = $(".sceneBox").length;  
		if(sceneInx==1){  
			$(".sceneBox").stop().animate({"width":"100%"},200); 
			$(".tb_close, .interactiveView").hide();
			$(".interactiveDataBoard").show();
		}else if(sceneInx==2){
			$(".sceneBox").stop().animate({"width":"50%"},200);
			$(".sceneBox").draggable("destroy").resizable("destroy").css({"position":"static", "border":"0", "height":"100%"});
		}
		$(".sceneRela").css({"border-left":"5px solid #000"});
		$(".sceneRela").eq(0).css({"border-left":"0"});
		$(".interactiveView").each(function(i){
			$(this).text("VIEW"+parseInt(i+1));
		});
    }); 
	
	body.on("click",".tb_radio .fl",function(){ 
		$(".tb_radio").css("background","url(/img/bg/bg_tbradio_on.png)");  
    });
	body.on("click",".tb_radio .fr",function(){ 
		$(".tb_radio").css("background","url(/img/bg/bg_tbradio_off.png)");  
    });
	body.on("click",".tb_sizing",function(){ 
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
			$(this).children().attr("src","/img/ico/ico_toolbars12.png");
			$("header").css({"height":"26px", "width":"100%"}); 
			$(".headerEtc, .gnb, .headerContents form").hide();
			$(".headerContents h1").css({"height":"26px"});
			$(".headerContents h1 img").css({"height":"26px", "margin":"0 0 0 10px"});
			$(".containerBox").css({"height":"calc(100% - 26px)", "top":"26px"});
		}else{
			$(this).removeClass("on");
			$(this).children().attr("src","/img/ico/ico_toolbars01.png");
			$("header").css({"height":"104px", "width":"970px"}); 
			$(".headerEtc, .gnb, .headerContents form").show();
			$(".headerContents h1").css({"height":"78px"});
			$(".headerContents h1 img").css({"height":"45px", "margin":"18px 0 0 0"});
			$(".containerBox").css({"height":"calc(100% - 50px)", "top":"104px"});
		}
    });
	body.on("click",".tb_mapAdd",function(){ 
		var sceneInx = $(".sceneBox").length; 
		var clone = $(".sceneBox").eq(0).clone(); 
		if(sceneInx==1){ 
			$(".rela").prepend(clone); 
			$(".sceneBox").stop().animate({"width":"50%"},200);
			$(".sceneRela").css({"border-left":"5px solid #000"});
			$(".sceneRela").eq(0).css({"border-left":"0"});
		}else if(sceneInx==2){
			$(".rela").prepend(clone);
			$(".sceneBox").css({"position":"absolute"});
			$(".sceneBox").stop().animate({"width":"600px", "height":"500px"},200); 
			$(".sceneRela").css({"border-left":"0"});
			$(".resizeIcon").show();
			$(".sceneBox").each(function(i){
				$(this).css({"z-index":parseInt(10-i), "border":"3px solid #333"})
				.animate({"top":parseInt(50*(i+1))+"px", "left":parseInt(150*(i+1))+"px"},200);
			});
			$( ".sceneBox" ).draggable({containment: ".containerBox>.rela"}).resizable();
		} 
		$(".interactiveDataBoard").hide();
		$(".interactiveView").css("display","inline-block");
		$(".tb_close").show();
		$(".interactiveView").each(function(i){
			$(this).text("VIEW"+parseInt(i+1));
		}); 
    });
	body.on("click",".sceneBox",function(){
		var sceneInx = $(".sceneBox").length; 
		if(sceneInx==3){
			$(".sceneBox").css({"z-index":"8", "border":"3px solid #333"});
			$(this).css({"z-index":"10", "border":"3px solid red"});
		}
		
    });
	body.on("click",".stepBox label",function(){
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		} 
    });
	body.on("click",".stepBox .radioType label",function(){
		$(this).parents("ul").eq(0).find("label").removeClass("on");
		$(this).addClass("on");
		var ck = $(this).parents("li").eq(0).hasClass("half");
		if(ck){
			var n = $(this).parents("li").index();
			$(".infoSetArea").removeClass("on");
			$(".infoSetArea").eq(n).addClass("on");
		}
    });
	body.on("click","a.roundTextBox",function(){
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
			$(this).next(".joinDefault").show();
		}else{
			$(this).removeClass("on");
			$(this).next(".joinDefault").hide();
		} 
    });
	body.on("click",".stepBox .dbTypeCk label,  .dbTypeCk label",function(){
		$(".dbTypeCk label").removeClass("on");
		$(this).addClass("on");
    });
	body.on("click",".fileFind",function(){ //사용자데이터업로드 파일불러오기
		$(".fileInput").click();
		
    });
	body.on("change",".fileInput",function(){ 
		var val = $(this).val();
		$(this).next(".inp").val(val);
    });
	body.on("click",".btn_clockTypeSetting",function(){ 
		$(this).addClass("on");
		$(".yearList li").show();
		$(".yearList input").css("position","static");
    });
	body.on("click",".btn_clockTypeOk",function(){ 
		$(".btn_clockTypeSetting").removeClass("on");
		$(".yearList li").each(function(i){
			var ck = $(this).find("input").prop("checked");
			if(!ck){
				$(this).hide();
			}
		});
		$(".yearList input").css("position","absolute");
    });
	body.on("click",".typeBox>a",function(){ 
		$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		var ck = $(this).index(".typeBox>a")+1;
		$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
		$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
		if(ck%2){
			$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
		}else{
			$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
		}
		
		$(".yearList input").css("position","static");
    }); 
}

/*0803*/
function newEvent(){
	var body = $("body");
	body.on("click", ".qmdl dt>a", function(){   
		var ck = $(this).parent("dt").hasClass("on");
		if(!ck){
			$(this).parent("dt").addClass("on");
			$(this).parents(".qmdl").eq(0).css("padding-bottom","0").find("dd").hide();
		}else{
			$(this).parent("dt").removeClass("on");
			$(this).parents(".qmdl").eq(0).css("padding-bottom","10px").find("dd").show();
		} 
	});
	body.on("click", ".dbTabs a", function(){   
		$(this).parents(".dbTabs").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click", ".dbTabs01 li a", function(){   
		$(".dbTabs01 li a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click", ".ysettingList li a", function(){   
		var ck = $(this).hasClass("on");
		$(this).parents(".ysettingList").eq(0).find("a").removeClass("on");
		if(ck){
			return;
		}else{
			$(this).addClass("on");
		}
		
		
	});
	body.on("click", ".etcTabs a", function(){   
		$(this).parents(".etcTabs").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click", ".compareSelectList li a.round", function(){   
		var ck = $(this).hasClass("on");
		if(ck){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
		
	});
	body.on("click", ".compareSelectList li a.del", function(){   
		$(this).parents("li").eq(0).remove();
	});
	body.on("click", ".parScroll td", function(){   
		$(".parScroll td").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click",".typeBox>a",function(){ 
		$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		var ck = $(this).index(".typeBox>a")+1;
		$(".dimAreaScroll .charts").css("position","absolute");
		$(".dimAreaScroll .tables").css("position","absolute");
		if(ck%2){
			$(".dimAreaScroll .charts").css("position","static");
		}else{
			$(".dimAreaScroll .tables").css("position","static");
		}
    }); 
	body.on("click", ".dimClose", function(){   
		$(".dialogbox").hide();
	});
	$(".parScroll, .dimAreaScroll").mCustomScrollbar({axis:"xy"}); 
	if( $(".popTableScrollArea").length ) $(".popTableScrollArea").mCustomScrollbar({axis:"xy"});
	$(".crud").prop("readonly", true).removeClass("on");
	$("body").on("click",".crud",function(){
		$(this).prop("readonly", false).addClass("on").focus();
	});
	$("body").on("blur",".crud",function(){
		$(this).prop("readonly", true).removeClass("on");
	});
}
function checkall(o){
	var ck = $(o).prop("checked");
	var target = $(o).parents("table").eq(0).next().find(".cketc");
	if(ck){
		target.prop("checked", true);	
	}else{
		target.prop("checked", false);
	} 
} 