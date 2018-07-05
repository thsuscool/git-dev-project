$(function(){  
	var body = $("body");
	slideValue("houseBdspaceFrom", "houseBdspaceTo", "#slider-range2", "세");
	slideValue("houseBdspaceFrom01", "houseBdspaceTo01", "#slider-range3", "㎥");
	slideValue("houseBdspaceFrom03", "houseBdspaceTo03", "#slider-range5", "㎥");
	slideValue("houseBdspaceFrom02", "houseBdspaceTo02", "#slider-range4", "세");
	slideValue("houseBdspaceFrom10", "houseBdspaceTo10", "#slider-range10", "세");
	slideValue("houseBdspaceFrom11", "houseBdspaceTo11", "#slider-range11", "세");
    scrollWidth(); 
    quickEvent();
    legendEvent();
    sideEvent();
    
    
    resizeColor("#ccc", "#890e4f", ".goganList tr", 10);
    legendColor("#ccc", "#890e4f", ".colorbar", 10);
    legendColor("#ccc", "#890e4f", ".colorSettingList01", 10);
    legendColor("#ccc", "#fde3ec", ".dbColorbar", 4);
    clickAnimate("#0478cb");
	dragAnimate("#0478cb");
	colorck();
	linkTooltip();
     
	if($('.stepTreeBox02').length){
    	$('.stepTreeBox02').easytree({
            slidingTime:0, 
            building:treeWidth,
            stateChanged:treeWidth,
            toggled:treeWidth
        }); 
    }
	if($('.stepTreeBox01').length){
    	$('.stepTreeBox01').easytree({
            slidingTime:0, 
            building:treeWidth,
            stateChanged:treeWidth,
            toggled:treeWidth
        }); 
    }
	if($('.stepTreeBox').length){
    	$('.stepTreeBox').easytree({
            slidingTime:0, 
            building:treeWidth,
            stateChanged:treeWidth,
            toggled:treeWidth
        }); 
    }
	if($('#treeArea').length){ 
		$('.treeBox03').easytree({slidingTime:0, building:treeWidth, stateChanged:treeWidth, toggled:treeWidth}); 
		$('.treeBox04').easytree({slidingTime:0, building:treeWidth, stateChanged:treeWidth, toggled:treeWidth}); 
		$('.treeBox05').easytree({slidingTime:0, building:treeWidth, stateChanged:treeWidth, toggled:treeWidth}); 
		$('.treeBox06').easytree({slidingTime:0, building:treeWidth, stateChanged:treeWidth, toggled:treeWidth}); 
    }
	
	if($('.norTreeBox').length){
    	easytree = $('.treeBox01').easytree({
            slidingTime:0, building:treeWidth, stateChanged:treeWidth, toggled:treeWidth
        }); 
    	$('.treeBox02').easytree({
            slidingTime:0, building:treeWidth, stateChanged:treeWidth, toggled:treeWidth
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
    $(".etcPopScroll").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
    $(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }}); 
    $(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({axis:"xy"});
    $(".scrollBox, .scrolls, .mapResultList").mCustomScrollbar({axis:"xy"});
	$(".dataSideScroll").mCustomScrollbar({
		axis:"xy",
		callbacks:{
			whileScrolling:function(){ 
				var top01 = 373 + this.mcs.top;
				var top02 = 776 + this.mcs.top;
				var top03 = 368 + this.mcs.top;
				var top04 = 686 + this.mcs.top;
				var top05 = 525 + this.mcs.top;
				var top06 = 435 + this.mcs.top;
				var top07 = 485 + this.mcs.top;
				var top08 = 468 + this.mcs.top;
				var top09 = 382 + this.mcs.top;
				var top10 = 707 + this.mcs.top;
				$(".dataSideBox.on .yScrollArea01.type05 .mCSB_scrollTools_vertical").css("top", top01+"px");
				$(".dataSideBox.on .yScrollArea01.type06 .mCSB_scrollTools_vertical").css("top",  top02+"px");
				$(".dataSideBox.on .yScrollArea01.type07 .mCSB_scrollTools_vertical").css("top",  top03+"px");
				$(".dataSideBox.on .yScrollArea01.type08 .mCSB_scrollTools_vertical").css("top",  top04+"px");
				
				$(".dataSideBox.on .yScrollArea01.type01 .mCSB_scrollTools_vertical").css("top",  top05+"px"); 
				$(".tables.on .yScrollArea01.type02 .mCSB_scrollTools_vertical").css("top",  top06+"px");  
				$(".tables.on .yScrollArea01.type04 .mCSB_scrollTools_vertical").css("top",  top07+"px");   
				$(".dataSideBox.on .yScrollArea02.type03 .mCSB_scrollTools_vertical").css("top",  top08+"px"); 

				$(".dataSideBox.on .yScrollArea01.type09 .mCSB_scrollTools_vertical").css("top",  top09+"px"); 
				$(".dataSideBox.on .yScrollArea01.type10 .mCSB_scrollTools_vertical").css("top",  top10+"px");  
				
				
				/*add*/
				var top11 = 438 + this.mcs.top;
				var top12 = 376 + this.mcs.top;
				var top13 = 423 + this.mcs.top;
				var top14 = 826 + this.mcs.top;
				var top15 = 365 + this.mcs.top;
				var top16 = 720 + this.mcs.top;
				var top17 = 431 + this.mcs.top;
				$(".dataSideBox.on .yScrollArea02.type11 .mCSB_scrollTools_vertical").css("top",  top11+"px"); 
				$(".dataSideBox.on .yScrollArea02.type12 .mCSB_scrollTools_vertical").css("top",  top12+"px");
				$(".dataSideBox.on .yScrollArea01.type13 .mCSB_scrollTools_vertical").css("top",  top13+"px");
				$(".dataSideBox.on .yScrollArea01.type14 .mCSB_scrollTools_vertical").css("top",  top14+"px");
				$(".dataSideBox.on .yScrollArea01.type15 .mCSB_scrollTools_vertical").css("top",  top15+"px");
				$(".dataSideBox.on .yScrollArea01.type16 .mCSB_scrollTools_vertical").css("top",  top16+"px");
				$(".dataSideBox.on .yScrollArea01.type17 .mCSB_scrollTools_vertical").css("top",  top17+"px");
			}
		}
		
		
	});
    
    gnbEvent();
    researchEvent();
	selectData(".dyear", dyear);
	selectData(".dmonth", dmonth);
	selectData(".dday", dday);
	selectData(".dhour", dhour);
	selectData(".dmin", dmin);

	$("body").on("click",".rdCheckType",function(){
		var ck = $(this).prop("checked");  
		if(ck){
			$(".rdCheckType").prop("checked", false);	
			$(this).prop("checked", true);	
		}else{
			$(this).prop("checked", false);
		} 
	});
	$(".selectForm").attr("active","off");
	$("body").on("click", ".selectForm", function(ev){  
		var sltActive = $(this).attr("active");
		if(sltActive=="off"){
			$(".selectForm").attr("active","off").removeClass("on");
			$(".selectOtion").hide();
			$(this).attr("active", "on").addClass("on");
			var sltName = $(this).attr("name");
			var sltWidth = $(this).innerWidth();
			var sltLeft = $(this).position().left;
			var sltTop = $(this).position().top+28;
			$("#"+sltName+"").css({"position":"absolute", "left":sltLeft+"px", "top":sltTop+"px", "width":sltWidth+"px"});
			$("#"+sltName+"").show(); 
			$(".selectOtion .scrollbox").mCustomScrollbar({axis:"y"});
		}else if(sltActive=="on"){ 
			$(this).attr("active", "off").removeClass("on");
			var sltName = $(this).attr("name"); 
			$("#"+sltName+"").hide(); 
			
		} 
	});  
	$("body").on("click", ".selectOtion ul li", function(ev){
		$(this).parents(".selectOtion").eq(0).prev('div.selectForm').attr("active", "off").removeClass("on");
		var sltValue = $(this).text();    
		$(this).parents(".selectOtion").eq(0).prev('div.selectForm').text(sltValue);
		$(".selectOtion").hide();    
	});  
	$(document).mousedown(function(){   
		for(a=0; a<$(".selectForm").length; a++){
			var selectActive = $(".selectForm:eq("+a+")").attr("active");
			if(selectActive == "on"){ 
				if(event.srcElement.tagName == "LI"){ 
					return;
				}if(event.srcElement.tagName == "UL"){ 
					return;
				}else if( event.srcElement.className == "selectForm"){
					return;
				}else if( event.srcElement.className == "selectOtion"){
					return;
				}else if( event.srcElement.className == "scrollbox"){
					return;
				}else if( event.srcElement.className == "mCustomScrollBox"){
					return;
				}else if( event.srcElement.className == "mCSB_container"){
					return;
				}else{
					$(".selectForm").attr("active","off").removeClass("on");
					$(".selectOtion").hide();
				}
			}
		}     
	}); 
 
	 
     
});
var dyear = ["2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005"];
var dmonth = ["1","2","3","4","5","6","7","8","9","10","11","12"];
var dday = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
var dhour = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
var dmin = ["0", "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
function selectData(o, v){
	$.each(v, function(i, v){
		$(o).append("<li>"+v+"</li>");
	});
}
function addCell(){
	cellNum++;
	var cell = "<tr>";
	cell += '<th>추가문항 '+cellNum+'</th>';
	cell += '<td><input type="text" class="inp w100" /></td> ';
	cell += '<th>필수여부</th>';
	cell += '<td>'; 
	cell += '<input type="radio" id="norRd01'+cellNum+'" name="norRd0'+cellNum+'" /> ';
	cell += '<label for="norRd01'+cellNum+'">필수</label> '; 
	cell += '<input type="radio" id="norRd02'+cellNum+'" name="norRd0'+cellNum+'"  class="ml10" /> ';
	cell += '<label for="norRd02'+cellNum+'">옵션</label> ';
	cell += '</td>';
	cell += '<td><a href="javascript:void(0)" onclick="cellDel(this)" class="chogaDel"><img src="/img/ico/ico_del.png" /></a></td>';
	cell += '</tr>'; 
	$("#addAppend tbody").append(cell);
	$("#addAppend").parents(".norSmallScroll").eq(0).mCustomScrollbar('scrollTo',{y:"5000"}); 
}
var cellNum = 3;
function cellDel(o){
	$(o).parents("tr").eq(0).remove();
	cellNum--;
}
function loginChg(o){
	var v = $(o).val();
	if(v == 2){
		$("#josabox").show();
	}else{
		$("#josabox").hide();
	}
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
function fileValue(o){
	var v = $(o).val();
	$(o).next("label").text(v); 
}
function selectEach(){
	$(".popTableScrollArea .cketc").each(function(i){
		var ck = $(this).prop("checked");
		if(ck){
			var tid = $(this).parents("tr").eq(0).find(".tid").text();
			var tname = $(this).parents("tr").eq(0).find(".tname").text();
			var li = "<li><p>"+tname+" <span>("+tid+")</span></p><a href='javascript:void(0)' onclick='itemDelete(this)'><img src='../../include../../include/img/ico/ico_close01.png' /></a></li>"; 
			$(".rlist").append(li);
		} 
	});
}
function rdTabs(o){
	var target = $(o).attr("id");
	$(".cateRd01, .cateRd02").hide();
	$("."+target).show();
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
function checkall01(o){
	var ck = $(o).prop("checked");
	var target = $(o).parents("table").eq(0).find(".cketc");
	if(ck){
		target.prop("checked", true);	
	}else{
		target.prop("checked", false);
	} 
} 
function checkall02(o, t){
	var ck = $(o).prop("checked");
	var target = $(t).find(".cketc");
	if(ck){
		target.prop("checked", true);	
	}else{
		target.prop("checked", false);
	} 
} 
function itemDelete(o){
	$(o).parents("li").eq(0).remove();
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
function popLink(target){
	$("#"+target).show();
	if($(".popTableScrollArea").length){
		$(".popTableScrollArea").mCustomScrollbar("destroy");
		$(".popTableScrollArea").mCustomScrollbar({axis:"y"});
	} 
}
function popCloseTarget(target){
	$("#"+target).hide(); 
}
function popClose(){
	$("body").on("click",".topbar>a.close01",function(){
		$(this).parents(".dialogbox").eq(0).hide(); 
		if($(".popTableScrollArea").length){
			$(".popTableScrollArea").mCustomScrollbar("destroy");
			$(".popTableScrollArea").mCustomScrollbar({axis:"x"});
		} 
	});
	$("body").on("click",".topbar>a.close02",function(){
		$(this).parents(".popBox").eq(0).hide(); 
		if($(".popTableScrollArea").length){
			$(".popTableScrollArea").mCustomScrollbar("destroy");
			$(".popTableScrollArea").mCustomScrollbar({axis:"x"});
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
		$(".colorbarBox").css("opacity", val);  
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
      buttonImage: "../../include/img/ico/ico_calendar.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
}
function clickAppend(selector, bgColor){ 
	$(selector).append("<span class='mask'></span><span class='color'></span>");
	$(selector).children(".color").css("background-color", bgColor);
}
function clickListColor(bgColor){
	var selector = ".sqListBox.sq03 .sqList ul li a.on .color";
	$(selector).animate({"opacity": "1"}, 1500)
	.animate({"opacity": ".5"}, 1500, null, clickListColor);
} 
function clickAnimate(bgColor){
	var selector = ".sqListBox.sq03 .sqList ul li a.on"; 
	clickAppend(selector, bgColor);
	clickListColor();
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
function slideValue(from, to, slider, etc){
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
			$(this).prev("ul").show();
			$(this).addClass("on");
		}else{
			$(this).prev("ul").hide();
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
	body.on("click",".btnService",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");
			$(".serviceLayer").show();
		}else{
			$(this).removeClass("on");
			$(".serviceLayer").hide();
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
		$(".dataSideBox").stop().animate({"right":"-1500px"},200).removeClass("on");
		$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
	});
	body.on("click",".interactiveDataBoard",function(){ 
		var ck = $(this).hasClass("on");
		if(!ck){
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({"right":"0"},200);
			if(!full){
				$(this).addClass("on").stop().animate({"right":"426px"},200);
				$(".dataSideBox").addClass("on");
			}else{
				$(this).addClass("on").stop().animate({"right":"670px"},200);
				$(".dataSideBox").addClass("on");
			}
			
		}else{
			$(".dataSideBox").stop().animate({"right":"-1500px"},200).removeClass("on");
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
	body.on("click",".listdel",function(){ 
        $(this).parents("li").eq(0).remove();
    }); 
	body.on("click", ".qmdl dd ul>li>a", function(){   
		var inx = $(this).parent("li").index(); 
		var qm = $(this).parents("ul").eq(0).attr("class"); 
		$(".qmdl dd ul>li").removeClass("on");
		$(this).parent("li").addClass("on");
		$(".totalResult").hide();
		
		if(qm=="qmIcon01"){
			if(inx == 4){
				stepCloseAnimate(2);
				$(".lnbDataList").show();
			}else{
				$(".lnbDataList").hide();
				$(".totalResult.tr0"+parseInt(inx+1)).show();
				$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
				$(".quickBox.step02").stop().animate({"left":"280px"},200); 
			} 
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
		$(this).parents(".totalResult").eq(0).find(".cm0"+parseInt(inx+1)).show();
        $(this).parents(".cateMenu").eq(0).children("li").removeClass("on");
        $(this).parents("li").eq(0).addClass("on");
    });  
	body.on("click",".tb_close",function(){ 
		$(this).hide(); 
		$(this).parents(".sceneBox").eq(0).removeClass("on").hide().insertAfter(".sceneBox:last");
		$(".resizeIcon").hide();
		var sceneInx = $(".sceneBox.on").length;  
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
		$(".tb_radio").css("background","url(../../include/img/bg/bg_tbradio_on.png)");  
    });
	body.on("click",".tb_radio .fr",function(){ 
		$(".tb_radio").css("background","url(../../include/img/bg/bg_tbradio_off.png)");  
    });
	body.on("click",".tb_sizing",function(){ 
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
			$(this).children().attr("src","../../include/img/ico/ico_toolbars12.png");
			$("header").css({"height":"26px", "width":"100%"}); 
			$(".headerEtc, .gnb, .headerContents form").hide();
			$(".headerContents h1").css({"height":"26px"});
			$(".headerContents h1 img").css({"height":"26px", "margin":"0 0 0 10px"});
			$(".containerBox").css({"height":"calc(100% - 26px)", "top":"26px"});
		}else{
			$(this).removeClass("on");
			$(this).children().attr("src","../../include/img/ico/ico_toolbars01.png");
			$("header").css({"height":"104px", "width":"970px"}); 
			$(".headerEtc, .gnb, .headerContents form").show();
			$(".headerContents h1").css({"height":"78px"});
			$(".headerContents h1 img").css({"height":"45px", "margin":"18px 0 0 0"});
			$(".containerBox").css({"height":"calc(100% - 50px)", "top":"104px"});
		}
    });
	body.on("click",".tb_mapAdd",function(){ 
		var sceneInx = $(".sceneBox.on").length; 
		$(".sceneBox").eq(sceneInx).show().addClass("on");
		if(sceneInx==1){ 
			$(".sceneBox").stop().animate({"width":"50%"},200);
			$(".sceneRela").css({"border-left":"5px solid #000"});
			$(".sceneRela").eq(0).css({"border-left":"0"});
		}else if(sceneInx==2){ 
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
		var sceneInx = $(".sceneBox.on").length; 
		if(sceneInx==3){
			$(".sceneBox").css({"z-index":"8", "border":"3px solid #333"});
			$(this).css({"z-index":"10", "border":"3px solid red"});
		}
		
    });
	body.on("click",".stepBox label",function(){
		var cls = $(this).parents("ul").eq(0).attr("class");
		if(cls != "dbTypeCk"){
			var ck = $(this).hasClass("on"); 
			if(!ck){
				$(this).addClass("on");
			}else{
				$(this).removeClass("on");
			} 
		} 
    });
	body.on("click","a.roundTextBox",function(){
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
			$(this).children("input").prop("checked", true);
			$(this).next(".joinDefault").show();
		}else{
			$(this).removeClass("on");
			$(this).children("input").prop("checked", false);
			$(this).next(".joinDefault").hide(); 
		} 
    }); 
	body.on("click",".dbTypeCk label",function(e){
		var ck = $(this).hasClass("on"); 
		if(ck == false){  
			$(".dbTypeCk label").removeClass("on");
			$(this).addClass("on");
			$(this).prev("input").eq(0).prop("checked", true);
		}else{ 
			$(this).removeClass("on");
			$(this).prev("input").eq(0).prop("checked", false);
		}
		
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
		$(this).parents(".compareBox").eq(0).find("a").removeClass("first on");
		$(this).addClass("first on");
		var ck = $(this).index(".typeBox>a")+1;
		$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute").removeClass("on");
		$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute").removeClass("on");
		if(ck%2){
			$(this).parents(".compareBox").eq(0).find(".charts").css("position","static").addClass("on");
		}else{
			$(this).parents(".compareBox").eq(0).find(".tables").css("position","static").addClass("on");
			if($("#basic_handson03").length){
				handsonTable03();
			}
		}
		$(".popTableScrollArea").mCustomScrollbar("destroy");
		$(".popTableScrollArea").mCustomScrollbar({axis:"x"});
		
		$(".yearList input").css("position","static");
    });
	body.on("click","#nShow>a",function(){ 
		$(this).parents("#nShow").find("a").removeClass("first on");
		$(this).addClass("first on"); 
    });
	body.on("click",".poiSetting",function(){  
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(".popPoi ").show();
			$(this).addClass("on");
		}else{ 
			$(".popPoi ").hide();
			$(this).removeClass("on");
		} 
    });
	body.on("click","#nSelect>a",function(){ 
		$(this).parents("#nSelect").find("a").removeClass("first on");
		$(this).addClass("first on"); 
    });
	
}

function gnbEvent(){
	var body = $("body");
	body.on("mouseover focus",".gnb>li>a",function(){
		$(".gnb>li").removeClass("on");
		$(this).parent("li").addClass("on");
		var inx = $(this).parent().index(); 
		$(".submenuBox")
		.stop().animate({"height":"150px"},200).css({"border-top-width":"1px","border-bottom-width":"1px"});
	});  
	body.on("mouseover focus",".submenuBox li a",function(){
		var inx = $(this).parents("ul").eq(0).index(".submenuBox ul");
		$(".gnb>li").removeClass("on"); 
		$(".gnb>li").eq(inx).addClass("on");   
	});
	body.on("mouseleave",".submenuBox",function(){
		$(".gnb>li").removeClass("on"); 	
		$(this).css({"border-top-width":"0px","border-bottom-width":"0px"})
		.stop().animate({"height":"0"},200);
	});
	body.on("mouseenter",".headerEtc, .submenuBox .etc, .headerContents form, .headerContents h1",function(e){
		e.stopPropagation();
		$(".gnb>li").removeClass("on"); 	
		$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px"})
		.stop().animate({"height":"0"},200);
	}); 
	$(window).on("scroll",function(){
		$(".gnb>li").removeClass("on"); 	
		$(".submenuBox").css({"border-top-width":"0px","border-bottom-width":"0px", "height":"0"});
	}); 
}
function sizeControll(o){
	var ck = $(o).hasClass("on");
	if(ck){
		$(o).removeClass("on").text("확대하기");
		//$(".dataSideBox").css("width","550px");
		$(".dataSideBox").removeClass("full");
		$(".interactiveDataBoard.on").css("right","426px");
	}else{
		$(o).addClass("on").text("축소하기");
		$(".dataSideBox").addClass("full");
		$(".interactiveDataBoard.on").css("right","670px"); 
	}
	$(".popTableScrollArea").mCustomScrollbar("destroy");
	$(".popTableScrollArea").mCustomScrollbar({axis:"x"});
	if( $("#tCharts01").length) {
		chart = $('#tCharts01').highcharts();
		chart.reflow();
	}
}
var easytree;
var treeItem=[];
function researchEvent(){
	if( $(".norTableScrollArea").length ) $(".norTableScrollArea").mCustomScrollbar({axis:"xy"});
	if( $(".popTableScrollArea").length ) $(".popTableScrollArea").mCustomScrollbar({axis:"x"});
	if( $(".yScrollArea01").length ) $(".yScrollArea01").mCustomScrollbar({axis:"y"});
	if( $(".yScrollArea02").length ) $(".yScrollArea02").mCustomScrollbar({axis:"y"});
	
	if( $(".dataWriteScroll").length ) $(".dataWriteScroll").mCustomScrollbar({axis:"xy"});
	if( $(".parScroll").length ) $(".parScroll").mCustomScrollbar({axis:"xy"});
	
	
	if( $(".norSmallScroll").length ) $(".norSmallScroll").mCustomScrollbar({axis:"xy"}); 
	$(".crud").prop("readonly", true).removeClass("on");
	$("body").on("click",".crud",function(){
		$(this).prop("readonly", false).addClass("on").focus();
	});
	$("body").on("blur",".crud",function(){
		$(this).prop("readonly", true).removeClass("on");
	});
	$("body").on("click", ".dbnTabs a", function(){   
		$(this).parents(".dbnTabs").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
	});
	$("body").on("click", ".dbnTabs a", function(){   
		$(this).parents(".dbnTabs").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
	});

	$("body").on("click", "#multi ul.easytree-container li>span", function(){    
		var ck = $(this).parents("li").eq(0).find("ul").get().length; 
		//console.log(ck);
		if(ck == 0){
			var sck = $(this).hasClass("on"); 
			if(!sck){ 
				var childId = $(this).attr("id");
				var parentId = childId.substring(0, childId.length-2); 
				var a = easytree.getNode(parentId);
				console.log(a);
				$(this).addClass("on");
				var treeId = $(this).attr("id"); 
				treeItem.push(treeId);
			}else{
				$(this).removeClass("easytree-active on");
				var removeItem = $(this).attr("id"); 
				treeItem.splice($.inArray(removeItem, treeItem),1);
			} 
		}else{
			 $(this).removeClass("easytree-active on");
			 var removeItem = $(this).attr("id"); 
			 treeItem.splice($.inArray(removeItem, treeItem),1);
		} 
	});
	$("body").on("click", "#single ul.easytree-container li>span", function(){   
		var sck = $(this).hasClass("on"); 
		if(!sck){
			$("#single ul.easytree-container li>span").removeClass("easytree-active on");
			$(this).addClass("on");
		}else{
			$(this).removeClass("easytree-active on");
		} 
	});
	$( ".selectMapArea" ).draggable({ containment: "parent" });
 
}
function rowDel(o){
	$("."+o+" table .cketc").each(function(i){
		var ck = $(this).prop("checked");
		if(ck){
			$(this).parents("tr").eq(0).remove();
		}
	});
}
function rowAdd(o){ 
	var item = "<tr>";
	item     += '<td><input type="checkbox" class="cketc" name="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td> ';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '</tr>';
	$("."+o+ " table").append(item);
 
	$("."+o).mCustomScrollbar('scrollTo',{y:"5000",x:"0"}); 
}
function insertValue(o, t){
	var v = $(o).text();
	$("#"+t).val(v);
	$("#popList").hide();
}
function moveItem(o, t){
	$("."+o+" .popTableScrollArea .cketc").each(function(i){
		var ck = $(this).prop("checked");
		if(ck){ 
			$("."+t+" .popTableScrollArea table").append("<tr>"+$(this).parents("tr").eq(0).html()+"</tr>");
			$(this).parents("tr").eq(0).remove();
		}
	});
} 
function moveItem01(o, t){
	$("."+o+" .popTableScrollArea .cketc").each(function(i){
		var ck = $(this).prop("checked");
		if(ck){ 
			if(o == "caLeft"){
				$("."+t+" .popTableScrollArea table").append("<tr>"+$(this).parents("tr").eq(0).html()+"<td><select class='select'><option>조사원</option></select></td></tr>");
			}else{
				var td = $(this).parents("tr").eq(0).html();  
				$("."+t+" .popTableScrollArea table").append("<tr>"+td+"</tr>");
				$(".caLeft table tr:last td:eq(6)").remove();
			}
			
			$(this).parents("tr").eq(0).remove();
		}
	});
} 
 
function rowAdd01(o){ 
	var item = "<tr>";
	item     += '<td><input type="checkbox" class="cketc" name="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td> ';
	item     += '<td class="al"><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="password" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '<td><input type="text" class="inp crud" name="" value="" /></td>';
	item     += '</tr>';
	$("."+o+ " table").append(item);
 
	$("."+o).mCustomScrollbar('scrollTo',{y:"5000",x:"0"}); 
	$("."+o+ " table tr:last .crud:eq(0)").focus();
}