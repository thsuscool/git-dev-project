var tooltipArrX = [];
var tooltipArrY = [];
$(function(){
	var body = $("body");
	slideValue(".sliderDefault");  
    scrollWidth(); 
    quickEvent();

    sideEvent(); 

    mapClick();
    
	linkTooltip();
	
	//통계선택에서 증감(left)으로 초기화한다. (sqList아래)
//	$("#leftValue").addClass("on");
//	$("#selectValue").val("leftValue");
	
	//통계선택에서 경계를 초기화한다.
	$("#autoRegion").addClass("on");
	// 2017. 03. 10 개발팀 수정요청
	$("#selectValue").val("rightValue");
	
	//지도유형에서 색상을 초기화한다.
	$("#color").addClass("on");
	
	//caption on/off 에서 off로 초기화한다.
	$("#default_switch").addClass("on");
     
    if($('.stepTreeBox').length){
    	$('.stepTreeBox').easytree({
            slidingTime:0, 
            building:treeWidth,
            stateChanged:treeWidth,
            toggled:treeWidth
        }); 
    } 
    if ($(".jumSlide").length){
    	jumSlider();
    }
//    if ($(".heatTable").length){
//    	heatTable();
//    }
    if ($(".popBox").length){
    	popClose();
    }
//    if ($(".goganList").length){ 
//    	lvSelect();
//    	goganConfirm();
//    } 
    if ($(".tabs.only").length){
    	userColorSetting(); 
    }
    if ($(".thematicCharts").length){
//    	thematicCharts(); 
    }
    
//    popEvent();
//    $(".normalBox").mCustomScrollbar({axis:"xy"}); 
//    $(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({axis:"xy"});
//  
    //데이터보드를 미리 연다.
    
	Highcharts.setOptions({
		lang: {
			thousandsSep: ','
		}
	});
    
});
function mapClick(){
	var body = $("body");
	body.on("click",".sop-interactive",function(){ 
		var ck = $(".interactiveDataBoard").hasClass("on");
		if(!ck){
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({"right":"0"},200);
			if(!full){
				$(".interactiveDataBoard").addClass("on").stop().animate({"right":"280px"},200);
			}else{
				$(".interactiveDataBoard").addClass("on").stop().animate({"right":"670px"},200);
			}
			
		}
	});
}
function thematicCharts(selectedAdmCd, isFirst){

	var map = $thematicMapFrame04.ui.mapList[0];
	
	console.log(map.dataBoardData);
	
	var xAxisCat = [];	//X축 카테고리
	var retDataList = [];	//수치 데이터
	var colorList = [];
	var titleText;		//차트 타이틀
	var labelsVisible = true;	//카테고리 표출 여부
	
	//2017.03.17 데이터보드 이슈 - 그래프 sort문제
	//===========================START==========================//
	if (map.dataBoardData != null) {
		map.dataBoardData = map.dataBoardData.sort(function(a,b){
			return parseInt(a.base_year) - parseInt(b.base_year);
		});
	}
	
	if (isFirst != undefined && selectedAdmCd == "00") {
		if (isFirst) {
			map.dataBoardData.sort(function(a,b){
				return b.left_data_val - a.left_data_val;
			});
		}else {
			map.dataBoardData.sort(function(a,b){
				return b.right_data_val - a.right_data_val;
			});
		}
	}
	//===========================END==========================//
	
	for(var i=0;i<map.dataBoardData.length;i++){
		if(map.dataBoardData[i].adm_cd == selectedAdmCd){
			xAxisCat.push(map.dataBoardData[i].irds_year+'년');
			//'#3BBEE3', '#E91E63'
			
			if(parseFloat(map.dataBoardData[i].chart_value) <0){
				colorList.push("#FFA333");
			}else{
				colorList.push("#3BBEE3");
				
			}
			
			retDataList.push(parseFloat(map.dataBoardData[i].chart_value));			
		}else {
			if (selectedAdmCd == "00") {
				map.dataGeojson.eachLayer(function(layer) {
					if  (map.dataBoardData[i].adm_cd == layer.feature.properties.adm_cd) {
						xAxisCat.push(layer.feature.properties.adm_nm);
					}
				});
				
				var color = "";
				
				
				
				if($("#selectValue").val() == "leftValue" || $("#selectValue").val() == "etcValue"){
					if(parseFloat(map.dataBoardData[i].left_data_val) <0){
						colorList.push("#FFA333");
					}else{
						colorList.push("#3BBEE3");
					}
					retDataList.push(parseFloat(map.dataBoardData[i].left_data_val));
				}else{
					if(parseFloat(map.dataBoardData[i].right_data_val) <0){
						colorList.push("#FFA333");
					}else{
						colorList.push("#3BBEE3");
					}
					retDataList.push(parseFloat(map.dataBoardData[i].right_data_val));
				}
				
			}
		}	
	}
	
	//2017.03.17 데이터보드 수정 - 차트타이틀이 두줄이 될 경우, 전국시도 데이터가 짤리는 현상
	var title = map.left_sep_chart_title;
	if (selectedAdmCd == "00") {
		title = $.trim(title.replace("연도별", ""));
	}
	
	$("#stat_sel > a").each(function() {
		if($(this).hasClass("on")) {
			if($(this).html().indexOf("증감률") != -1) {
				//2017.03.21 그래프 타이틀 이슈
				title = title.replace("수(", "증감률(");
				title = title.split("(")[0];
				title += "(%)";
			}
		}
	});
	
	
	if(isFirst != undefined && isFirst || selectedAdmCd == "00") {
		
		//2017.03.23 연평균 증감율일 경우, 그래프 텍스트 변경 - 전국 일때만
		if (title.indexOf("증감률") != -1) {
			title = title.replace("증감률", map.left_sep_ttip_title);
		}
		
		var idx = 0;
		$('.thematicCharts').highcharts({
			chart: {zoomType: 'xy', type: 'bar'},
			title: {text: title},
			subtitle: {text: ""}, //2017.03.21 그래프 타이틀 이슈 - 전국 그래프에서 타이틀 보임
			colors: colorList,
			xAxis: [{
				categories: xAxisCat,
				crosshair: true
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					},
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					enabled: false
				},
				title: {
					text: '', align: 'high',//map.left_sep_chart_title,
				
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				}
			}, { // Secondary yAxis
				title: {
					text: '',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				}
			,
				labels: {
					enabled : false,
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					items:[
						       {
						    	   style:{
						    		   left:'100px',
						    		   top:'200px'
						    	   }
						       }
					       ]
				},
				opposite: true
			}],
			tooltip: {
				//formatter: function () {
				//		fillMinusRect(retDataList);
	             //   },
				shared: true
			},
			legend: {
				enabled : false 
			},
			plotOptions: {
				column: {
					colorByPoint : true,
					//2017.03.09 데이터보드 수정
					//============START==============//
					grouping: false,
					pointPadding: 0,
					dataLabels: {
						allowOverlap: true,
						//inside: true,
						enabled: true,
						//useHTML: true,
						//align: 'high',
						verticalAlign: 'middle',
						formatter: function () {
							return appendCommaToNumber(this.y); //2017.03.23 그래프 텍스트 천단위 콤마
						 }
					}
					//============END==============//
				}   
			},       		        
			series: [{
				name: title, //map.left_sep_chart_title,	//2017.03.17	      
				type: 'column',
	//		            yAxis: 1,
				data: retDataList,
				tooltip: {
					valueSuffix: ''
				}

			}
			]
		}, 
		//2017.03.09 데이터보드 수정
		//2017.03.17 데이터보드 이슈 - 막대옆에 텍스트가 나오도록 수정
		//============START==============//
		function(chart) {
			var prevTranslateY = 0;
			var margin = chart.series[0].xAxis.translationSlope;
			var totalWidth = chart.series[0].xAxis.width;
			$.each(chart.series[0].data, function(i, point) {
				if (point.y < 0) {
					var textWidth = point.dataLabel.width;
					var agent = navigator.userAgent.toLowerCase();
                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
                 		textWidth -= 10;
                 	}
					point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
         			if (point.dataLabel.translateX < -1) {
         				point.dataLabel.translateX = -1;
         			}
				}
				if (i == 0) {
					point.dataLabel.translateY = -point.dataLabel.padding;
					point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
					prevTranslateY = point.dataLabel.translateY;
				}else {
                 	prevTranslateY += margin;
                 	point.dataLabel.translateY = prevTranslateY;
             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
				}
         			
		    });
			
		});
		//============END==============//
		$("#container").mCustomScrollbar({axis:"y",advanced: { autoExpandHorizontalScroll: true }});
		
		//fillMinusRect(retDataList);

		
		
		
		
	} else {
		var idx = 0;
		$('.thematicCharts').highcharts({
			chart: {zoomType: 'xy'},
			title: {text: title}, //2017.03.17
		 
			subtitle: {text: map.adm_nm},
			colors: [
					 '#3BBEE3', '#E91E63'
			],
			xAxis: [{
				categories: xAxisCat,
				crosshair: true
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					},
					style: {
						color: Highcharts.getOptions().colors[1]
					},
		            overflow: 'justify'

				},
				title: {
					text: '',//map.left_sep_chart_title,
				
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				}
			}, { // Secondary yAxis
				title: {
					text: '',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				}
			,
				labels: {
					enabled : false,
					format: '',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: true
			}],
			tooltip: {
				//2017.03.17 데이터보드 툴팁정보 수정-추가요구사항
				//==================START=================//
				enable : true,
				shared: true,
				useHtml : true,
				formatter : function( evt){ 
					var isShow = false;
					var etcText = ""; 
					var title = this.points[0].series.name;
					$("#stat_sel > a").each(function() {
						if($(this).hasClass("on")) {
							if($(this).html().indexOf("증감률") != -1) {
								isShow = true;
							}
						}
					});
					
					var html = "";
					html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
					html += "<span>" + title;
					
					if (isShow) {
						var tooltipStr = "";
						for(i=0; i<tooltipArrX.length; i++){
							if(this.x == tooltipArrX[i] ){
								tooltipStr = tooltipArrY[i];
							}
						}
						html += " : " + "<b>" + $(tooltipStr).html() + "<b></span>";
					}else {
						html += " : " + "<b>" + appendCommaToNumber(this.y) + "</b></span>";
					}
					return html;
				}
				//==================END=================//
			},
			legend: {
				enabled : false 
			},
			plotOptions: {
				spline: {
					dataLabels: {
						enabled: true,
						allowOverlap: true,
						//mng_s 20171031 leekh 100만자리 이상의 숫자 겹치는 현상 수정
						useHTML:true,
						formatter: function () {
							if(this.y>=1000000){
								return "<span style='font-size:9px;'>" + appendCommaToNumber(this.y) + "</span>"
							}else{
								return "<span style='font-size:11px;'>" + appendCommaToNumber(this.y) + "</span>"
							}
						 }
						//mng_e 20171031 leekh 100만자리 이상의 숫자 겹치는 현상 수정
					},
					enableMouseTracking: false
				},
				column: {
					grouping: false,
					pointPadding: 0,
					dataLabels: {
						inside: true,
						enabled: true,
						useHTML: true,
						formatter: function () {
							var isShow = false;
							$("#stat_sel > a").each(function() {
								if($(this).hasClass("on")) {
									if($(this).html().indexOf("증감률") != -1) {
										isShow = true;
									}
								}
							});
							if (isShow) {
								var tempX = this.x;
								if (tempX.indexOf("년") != -1) {
									var html = "<div style='color:#ffffff;font-size:9px;'>"; //2017.03.17 중감률 폰트사이즈 변경
									if (idx == 0) {
										html += "0%";
									}else {
										// 2017. 03. 16 j.h.Seok
										html += ((this.y-this.series.yData[idx-1])/this.series.yData[idx-1]*100).toFixed(2) + "%";
									}
									idx++;
									if (idx == retDataList.length) {
										idx = 0;
									} 
									html += "</div>";
									tooltipArrX[idx] = this.x;
									tooltipArrY[idx] = html;
									return html;
								}
							}
						 }
					}
				}   
			},       		        
			series: [{
				name: title, //2017.03.17,		      
				type: 'column',
	//		            yAxis: 1,
				data: retDataList,
				tooltip: {
					valueSuffix: ''
				}

			}
			, {
				name: 'b',
				type: 'spline',
	//		            yAxis: 1,
				data: retDataList,
				tooltip: {
					valueSuffix: ''
				}
			}
			]
		});
	}
}


function fillMinusRect(retDataList){
	for(i=0; i<retDataList.length; i++){
		if(retDataList[i] <= 0){
			$("rect:eq(" + (i+2) +")").attr("fill", "red");
		}
	}
}


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
//function userColorSetting(){
//	$("body").on("click",".tabs .btnStyle01",function(){
//		$(this).parents(".tabs").eq(0).find(".btnStyle01").removeClass("on");
//		$(this).addClass("on");
//	});
//	$("body").on("click",".tabs.only>a",function(){
//		$("#colorSetting").hide();
//		$(".colorSettingList01").css({"width":"380px"});
//		$(".colorbarBox>a").css("top","-5000px");
//		var inx = $(this).index(".tabs.only>a");
//		if(inx==0){
//			$("#colorSetting").show();
//			legendColor("#666", "#890e4f", ".colorSettingList01", 10);
//		}else if(inx==1){
//			legendColor("#ff1b00", "#048cfc", ".colorSettingList01", 10);
//		}else{
//			$(".colorbarBox>a").css("top","5px");
//			$(".colorSettingList01").css({"width":"300px"});
//			legendColor("#193b70", "#00b051", ".colorSettingList01", 10);
//		}
//	});
//	$('.colorbarBox>a').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
//	 
//	$('body').on('click', ".legendPopEvent", function(){
//		var ck = $("#typeArea").attr("class");
//		if(ck == "jum"){
//			$("#jumSettingLayer").show(); 
//		}else{
//			var id = $(this).attr("data-id"); 
//			$("#"+id).show(); 
//			if(id=="guganSettingLayer"){
//				goganListResize();
//			}
//		}
//		
//	});
//	
//	$('body').on('click', ".markerLib ul li a", function(){
//		$(".markerLib ul li a").removeClass("on");
//		$(this).addClass("on");
//	});
//	$('body').on('click', "#markerPopup", function(){
//		$("#markerLibLayer").show(); 
//	});
//	$('body').on('click', ".markerList li a", function(){
//		$(".markerList li a").removeClass("on");
//		$(this).addClass("on");
//		$(".jumMarkerLink").empty().html($(this).html());
//	});
//	$('body').on('click', ".opacityBox .colorck li a", function(){ 
//		$(".jumColorLink").css("background",$(this).text());
//	});
//	
//	$('.jumColorLink').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
//	$('body').on('change sliderup sliderdown slidermove', ".jumColorLink", function(){
//		$(".opacityBox .colorck li a.on").css("background",$(this).val()).text($(this).val()); 
//	});
//	$('body').on('change', "#opacitySel01", function(){
//		var val = $(this).val(); 
//		$("#colorSetting01").css("opacity", val);  
//	});
//	
//	$('body').on('change', "#opacitySel", function(){
//		var val = $(this).val(); 
//		$("#colorSetting").css("opacity", val);  
//	});
//	
//	
//	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fl", function(){
//		var colorEnd = $(".colorbarBox>.fr").text();
//		$(".colorbarBox>.fl").text($(this).val());
//		legendColor(colorEnd, $(this).val(), ".colorSettingList01", 10);
//	});
//	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fr", function(){
//		var colorStart = $(".colorbarBox>.fl").text();
//		$(".colorbarBox>.fr").text($(this).val());
//		legendColor($(this).val(), colorStart, ".colorSettingList01", 10);
//	});
//} 
//function heatTable(){
//	$('.heatTable').wheelColorPicker({
//		layout: 'block',
//		format: 'css'
//	}); 
//	$('.heatTable').on('slidermove', function() {
//		$('#color-label').text($(this).val());
//	}); 
//}
//function jumSlider(){
//	$(".jumSlide").slider({
//    	range: false, 
//		min : 0,
//		max : 10,
//		values : [10],
//        slide : function(e, ui) { //ui.values[0]
//        	$("#typeArea .colorck>li>a").css({"width":parseInt(ui.values[0]+7)+"px",
//        		"height":parseInt(ui.values[0]+7)+"px",
//        		"margin-top":parseInt(10-ui.values[0])+"px"}); 
//        }
//	});
//} 
//function dragAppend(selector, bgColor){ 
//	$(selector).css("background-color", bgColor);
//	$(selector).append("<span class='mask'></span><span class='color'></span>");  
//} 
//function colorck(){ 
//	$(".colorck li").each(function(i){ 
//		var selector = $(this).children("a");
//		selector.css("background",selector.text());
//	});
//	$("body").on("click",".colorck li>a",function(){
//		$(this).parents(".colorck").eq(0).find("a").removeClass("on");
//		$(this).addClass("on");
//		var id = $(this).parents(".colorck").eq(0).attr("id");
//		var color = $(this).text();
//		var listLegnth = $(".lvSelect").val(); 
//		if(id=="colorSetting"){
//			legendColor("#ccc", color, ".colorSettingList01", listLegnth);
//		}else if(id=="legendColor"){
//			legendColor("#ccc", color, ".colorbar", listLegnth);
//			resizeColor("#ccc", color, ".goganList tr", listLegnth);
//		} 
//		$(".JCLRgrips").remove();
//		goganListResize();
//		 
//	}); 
//}
//var onSampleResized = function(e){ // 범례구간설정 구간리사이즈 드래그할때 value 값 호출 
//	var columns = $(e.currentTarget).find("td");
//	var msg="";
//	columns.each(function(i){ msg += "td("+i+ "):"+ parseInt($(this).width()*0.267) + " / "; })
//	alert(msg);
//	//$(".goganListValue").html(msg);
//	
//};	
//var goganListResize = function(){ // 범례구간설정 구간리사이즈 플러그인 호출
//	$(".goganList").colResizable({
//		liveDrag:true, 
//		gripInnerHtml:"<div class='grip'></div>", 
//		draggingClass:"dragging", 
//		partialRefresh:true,
//		onResize:onSampleResized
//	}); 
//}
// 
//function goganConfirm(){  // 범례구간설정 적용버튼
//	$("body").on("click","#goganEvent", function(){
//		var lv = $(".popBox .lvSelect").val();  
//		var color = $(".colorck li>a.on").css("background-color");
//		legendColor("#ccc", color, ".colorbar", lv);
//	});
//}
//function lvSelect(){ // 범례구간설정 셀렉트 체인지 이벤트
//	$("body").on("change",".popBox .lvSelect",function(){
//		var lv = $(this).val();
//		var color = $(".colorck li>a.on").css("background-color");
//		resizeColor("#ccc", color, ".goganList tr", lv); 
//		$(".JCLRgrips").remove();
//		goganListResize();
//		
//	}); 
//}
//function resizeColor(c01, c02, cls, max){  // 범례구간설정 색지정
//	var arrColor = new Array();
//	var paramColor1 = c01;
//	var paramColor2 = c02;
//	
//	for ( var i = 0; i < max; i++) {
//		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
//		arrColor.push(paramColor);
//	} 
//	$(cls).empty();
//	for ( var i = 0; i < arrColor.length; i++) { 
//		$(cls).prepend("<td style='background:" + arrColor[i] + ";'></td>");	
//	}
//}
//function legendColor(c01, c02, cls, max){
//	var arrColor = new Array();
//	var paramColor1 = c01;
//	var paramColor2 = c02;
//	
//	for ( var i = 0; i < max; i++) {
//		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
//		arrColor.push(paramColor);
//	} 
//	$(cls).empty();
//	for ( var i = 0; i < arrColor.length; i++) {
//		var txt = i+1;
//		if(txt<10){
//			txt = "0"+txt;
//		}
//		$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");	
//	}
//	if($("#typeArea").attr("class")=="color"){
//		var liHeight = parseInt(220/max); 
//		$(cls+" li").css("height",liHeight+"px");
//		$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*max))+"px");
//	}
//	
//}
function linkTooltip(){
	$("a, .stepBox label").tooltip({ 
		content: function () {
            return $(this).prop('title');
        },
		open: function( event, ui ) {
			$(".ui-tooltip .subj").text($(this).attr("data-subj"));
		},
		position: {
			my: "left+10 top", at: "right top",
	        using: function( position, feedback ) {
	        	if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
		    		$( this ).css( position ).prepend("<span class='subj'></span>");
		    	}else {
		    		$( this ).css( position ); 
		    	}
	        	$( "<div>" )
	            	//.addClass( "arrow" )
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
    $(fx).queue("step02", function(){ 
        $(btn).stop().animate({"left":"280px"},time);
        $(fx+'.step02').animate({"left":"-680px"}, time);       
    }); 
    $(fx).queue("step01", function(){
        $(fx+'.step02').css({"left":"-680px"});
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
//}
//function legendEvent(){
//	var body = $("body"); 
//	body.on("click",".lgTypeList li a", function(){
//		var cls = $(this).attr("data-type");
//		$("#typeArea").removeClass().addClass(cls);
//		var lv = $(".popBox .lvSelect").val();  
//		var color = $(".colorck li>a.on").css("background-color");
//		legendColor("#ccc", color, ".colorbar", lv);
//	});
//	body.on("click",".btn_legendSetting", function(){
//		var on = $(this).hasClass("on");
//		if(!on){
//			$(".lgListBox").stop().animate({"left":"220px"},200);
//			$(this).addClass("on");
//		}else{
//			$(".lgListBox").stop().animate({"left":"-550px"},200);
//			$(this).removeClass("on");
//		}
//	});
//	var settingList = ".lgListBox>li>a";
//	body.on("click", settingList, function(){
//		var on = $(this).hasClass("on");
//		if(!on){
//			$(this).siblings("ul").show();
//			$(this).addClass("on");
//		}else{
//			$(this).siblings("ul").hide();
//			$(this).removeClass("on");
//		}
//	});
//	var optionList = ".lgListBox>li>ul>li>a";
//	body.on("click", optionList, function(){ 
//		var html = $(this).html();
//		$(this).parents("ul").eq(0).siblings("a").empty().html(html).removeClass("on");
//		$(this).parents("ul").eq(0).hide();
//	});
//	body.on("click", ".btn_legend", function(){ 
//		var legendBox = $(".legendBox");
//		var ing = legendBox.attr("data-ing");
//		legendBox.removeClass(ing); 
//		$(".btn_legendSetting").removeClass("on");
//		$(".lgListBox").stop().animate({"left":"-550px"},200);
//		if(ing=="hide"){  
//			legendBox.attr("data-ing", "min");
//			legendBox.addClass("min");
//		}else if(ing=="min"){ 
//			legendBox.attr("data-ing", "max");
//			legendBox.addClass("max");
//		}else if(ing=="max"){
//			legendBox.attr("data-ing", "hide");
//			legendBox.addClass("hide");
//		}
//		
//	});
	
}
function sideEvent(){
	var body = $("body");
	body.on("click",".dscList dt>a",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");
			$(this).parents("dt").next("dd").show();
		}else{
			$(this).removeClass("on");
			$(this).parents("dt").next("dd").hide();
		} 
	});
	body.on("click",".dataSideBox .bar>a",function(){ 
		$(".dataSideBox").stop().animate({"right":"-1500px"},200);
		$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
	});
	body.on("click",".interactiveDataBoard",function(){ 
		var ck = $(this).hasClass("on");
		if(!ck){
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({"right":"0"},200);
			if(!full){
				$(this).addClass("on").stop().animate({"right":"280px"},200);
			}else{
				$(this).addClass("on").stop().animate({"right":"670px"},200);
			}
			
		}else{
			$(".dataSideBox").stop().animate({"right":"-1500px"},200);
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
//	body.on("click",".rightQuick.rq06", function(){
//		var on = $(this).hasClass("on");
//		$(".rightQuick").removeClass("on");
//		if(!on){
//			$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
//			$(this).addClass("on");
//		}else{
//			$(this).next(".rqListBox").stop().animate({"right":"-550px"},200);
//			$(this).removeClass("on");
//		} 
//	}); 
	
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
			//$(".shadow").show(); 
			$(this).find("span").hide();
			$(this).addClass("on").css("width","40px");
		}else{ 
			stepCloseAnimate(1); 
			$(this).find("span").show();
			$(this).removeClass("on").css("width","90px");
		} 
	});  
	body.on("click",".sqList #stat_sel a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
				
		if( $("#selectValue").val()=="leftValue"){
			$("#selectValue").val("rightValue");
		}else{
			$("#selectValue").val("leftValue");
		}
				
	}); 
	
	
	
	
	body.on("click",".sqList #region_boundary a", function(){
		
		
		
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
				
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		if($(this).attr('id') == "autoRegion"){
			$("#selectValue2").val("auto");
		}else if($(this).attr('id') == "sido"){
			$("#selectValue2").val("1");
		}else if($(this).attr('id') == "sigungu"){
			$("#selectValue2").val("2");
		}else if($(this).attr('id') == "eupmyundong"){
			$("#selectValue2").val("3");
		}
		
//		if($(this).text()=="자동"){
//			$("#selectValue2").val("auto");
//			
//		}else if($(this).text()=="시도"){
//			$("#selectValue2").val("1");
//			
//		}else if($(this).text()=="시군구"){
//			$("#selectValue2").val("2");
//			
//		}else if($(this).text()=="읍면동"){
//			$("#selectValue2").val("3");
//			
//		}
				
	}); 
	
	body.on("click",".sqList #map_type a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
				
		if( $("#dataMode").val()=="color"){
			$("#dataMode").val("bubble");
		}else{
			$("#dataMode").val("color");
		}
				
	}); 
	
	body.on("click",".sqList #data_type a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		if( $("#dataMode2").val()=="dataOff"){
			$("#dataMode2").val("dataOn");
		}else{
			$("#dataMode2").val("dataOff");
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
	body.on("click",".stepClose2",function(){ 
		$(".sideQuick.sq03").click(); 
    }); 
	body.on("click", ".qmdl dd ul>li>a", function(){   
		var inx = $(this).parent("li").index();
		var qm = $(this).parents("ul").eq(0).attr("class");
		$(".qmdl dd ul>li").removeClass("on");
		$(this).parent("li").addClass("on");
		$(".totalResult").hide();
		if(qm=="qmIcon01"){
			$(".totalResult.tr0"+parseInt(inx+1)).show();
		}else if(qm=="qmIcon02"){
			$(".totalResult.tr0"+parseInt(inx+5)).show();
		} 
		
		$(".sideQuick.sq02").stop().animate({"left":"640px"},200);
		$(".quickBox.step02").stop().animate({"left":"280px"},200); 
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
		$(".sideQuick.sq02").stop().animate({"left":"640px"},200);
		$(".quickBox.step03").stop().animate({"left":"560px"},200);
	});
	body.on("click", "#btnSample02", function(){    
		$(".sideQuick.sq02").stop().animate({"left":"1120px"},200);
		$(".quickBox.step04").stop().animate({"left":"640px"},200);
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
			$("header").css({"height":"26px", "width":"100%"}); 
			$(".headerEtc, .gnb, .headerContents form").hide();
			$(".headerContents h1").css({"height":"26px"});
			$(".headerContents h1 img").css({"height":"26px", "margin":"0 0 0 10px"});
			$(".containerBox").css({"height":"calc(100% - 26px)", "top":"26px"});
		}else{
			$(this).removeClass("on");
			$("header").css({"height":"104px", "width":"970px"}); 
			$(".headerEtc, .gnb, .headerContents form").show();
			$(".headerContents h1").css({"height":"78px"});
			$(".headerContents h1 img").css({"height":"45px", "margin":"18px 0 0 0"});
			$(".containerBox").css({"height":"calc(100% - 50px)", "top":"104px"});
		}
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

