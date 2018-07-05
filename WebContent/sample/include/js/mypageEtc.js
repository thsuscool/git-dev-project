$(function(){  
	var body = $("body"); 
    if ($("#basic_handson01").length){
    	handsonTable01(); 
    } 
    body.on("click",".dbTypeCk label",function(){
		$(".dbTypeCk label").removeClass("on");
		$(this).addClass("on");
    });
    body.on("mouseover",".latest li h4 a",function(){ 
		$(this).parents("li").eq(0).addClass("on");
    });
    body.on("mouseout",".latest li h4 a",function(){ 
		$(this).parents("li").eq(0).removeClass("on");
    });
    body.on("click",".editTitle",function(){
		var target = $(this).parents("li").eq(0).find(".mpLink");
		var val = target.children("a").text(); 
		var form = "<input type='text' class='inp' value='"+val+"' />";
		form += "<input type='button' class='saveTitle' value='저장' />";
		target.children("a").hide();
		target.append(form); 
	});
    body.on("change",".fileEvent",function(){
		var val = $(this).val();
		$(this).next("input").val(val);
	});
    body.on("click",".saveTitle",function(){
		var target = $(this).parents("li").eq(0).find(".mpLink");
		var val = target.children(".inp").val();  
		target.children("input").remove();
		target.children("a").text(val).show();
	});
    $("a").tooltip({ 
    	content: function () {
            return $(this).prop('title');
        },
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
    
    slideValue01("rbs01", "rbs02", "#rbSlide", "No.");
    inputEvent();
}); 
function inputEvent(){
	$("body").on("click",".radio label",function(){
		$(this).parents("ul").eq(0).find("label").removeClass("on");
		$(this).addClass("on");
    });
	$("body").on("click",".ckbox label",function(){ 
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		} 
    });
}
function slideValue01(from, to, slider, etc){
    var domFrom = "#"+from;
    var domTo = "#"+to;
    var domSlider = slider;
	for (var i=1; i<=301; i++) {
        var tmpText = etc + " " + i;
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
    $("."+from).text("No. "+(60/3.3).toFixed(1));
    $(domTo).val("85");
    $("."+to).text("No. "+(85/3.3).toFixed(1));
    $(domFrom).change(function(){
        var spaceTo = $(domTo).val();
        if (parseInt($(this).val()) > parseInt(spaceTo)) {
            $(this).val(spaceTo);
        }
        $(domSlider).slider("values", 0, $(this).val());
        $("."+from).text("No. "+($(this).val()/3.3).toFixed(1));
        
    });
    $(domTo).change(function(){
        var spaceFrom = $(domFrom).val();
        if (parseInt($(this).val()) < parseInt(spaceFrom)) {
            $(this).val(spaceFrom);
        }
        $(domSlider).slider("values", 1,  $(this).val());
        $("."+to).text("No. "+($(this).val()/3.3).toFixed(1));
    });
    $(domSlider).slider({
        range: true,
        min: 1,
        max: 300,
        values : [60, 85],
        slide : function(e, ui) {
            $(domFrom).val(ui.values[0]);
            $(domTo).val(ui.values[1]);	
            $("."+from).text("No. "+(ui.values[0]/3.3).toFixed(1));
            $("."+to).text("No. "+(ui.values[1]/3.3).toFixed(1));
        }
    });
}
function handsonTable01(){
	var container = document.getElementById('basic_handson01'); 
		  var data = function() {
		return Handsontable.helper.createSpreadsheetData(100, 12);
	}; 
	var data = [
		           ["결과", "No", "명칭", "주소", "A(권리금)", "B(월세)"],
		           ["O", 1, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 2, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 3, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 4, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 5, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 6, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 7, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 8, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 9, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 10, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 11, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
		           ["O", 12, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500]
		           
		         ] 
	var hot = new Handsontable(container, {
		data : data,
		height : 300,
		colHeaders : true,
		rowHeaders : true,
		stretchH : 'all',
		columnSorting : true,
		contextMenu:true
	}); 
	//$.contextMenu("Alignment", false);
}