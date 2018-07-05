$(function() {
	var body = $("body");
	if ($("#basic_handson01").length) {
		// handsonTable01();
	}
	body.on("click", ".dbTypeCk label", function() {
		$(".dbTypeCk label").removeClass("on");
		$(this).addClass("on");
	});
	body.on("mouseover", ".latest li h4 a", function() {
		$(this).parents("li").eq(0).addClass("on");
	});
	body.on("mouseout", ".latest li h4 a", function() {
		$(this).parents("li").eq(0).removeClass("on");
	});
	body.on("click", ".editTitle", function() {
		var target = $(this).parents("li").eq(0).find(".mpLink");
		var val = target.children("a").text();
		var form = "<input type='text' class='inp' value='" + val + "' />";
		form += "<input type='button' class='saveTitle' value='저장' />";
		target.children("a").hide();
		target.append(form);
	});
	body.on("change", ".fileEvent", function() {
		var val = $(this).val();
		$(this).next("input").val(val);
	});
	body.on("click", ".saveTitle", function() {
		var target = $(this).parents("li").eq(0).find(".mpLink");
		var val = target.children(".inp").val();
		target.children("input").remove();
		target.children("a").text(val).show();
	});
	$("a").tooltip(
			{
				content : function() {
					return $(this).prop('title');
				},
				open : function(event, ui) {
					if ($(this).attr("data-subj") == "나의 데이터 목록") {
						$(".ui-tooltip .subj01")
								.text($(this).attr("data-subj"));
					} else {
						$(".ui-tooltip .subj").text($(this).attr("data-subj"));
					}

				},
				position : {
					my : "left+10 top",
					at : "right top",
					using : function(position, feedback) {
						// 2016.03.17 수정
						if ($(feedback.target)[0].element[0].outerHTML
								.indexOf("data-subj") != -1) {
							if ($(feedback.target)[0].element[0].outerHTML
									.indexOf("나의 데이터 목록")) {
								$(this).css(position).prepend(
										"<span class='subj01'></span>");
							} else {
								$(this).css(position).prepend(
										"<span class='subj'></span>");
							}
						} else {
							$(this).css(position);
						}

						$("<div>")
						// .addClass( "arrow" )
						.addClass(feedback.vertical).addClass(
								feedback.horizontal).appendTo(this);
					}
				}
			});

	slideValue01("rbs01", "rbs02", "#rbSlide", "No.");

	if (stat != "3") {
		inputEvent();
	}
});
/*
 * function inputEvent(){ $("body").on("click",".radio label",function(){
 * 
 * $(this).parents("ul").eq(0).find("label").removeClass("on");
 * $(this).addClass("on");
 * 
 * }); $("body").on("click",".ckbox label",function(){
 * 
 * var ck = $(this).hasClass("on"); if(!ck){ $(this).addClass("on"); }else{
 * $(this).removeClass("on"); }
 * 
 * var ckName = $(this).attr("for"); var ckStr = ckName.split("_");
 * if(ckStr.length >1){ if(stat =="1"){
 * $myDataModify.pck(ckStr.replace(/[^0-9]/g,'')); } }
 * 
 * }); }
 */
function slideValue01(from, to, slider, etc) {
	var domFrom = "#" + from;
	var domTo = "#" + to;
	var domSlider = slider;
	for (var i = 1; i <= 301; i++) {
		var tmpText = etc + " " + i;
		if (i == 301) {
			tmpText = "300+"
		}
		$(domFrom).append($("<option>", {
			value : i,
			text : tmpText
		}));
		$(domTo).append($("<option>", {
			value : i,
			text : tmpText
		}));
	}
	$(domFrom).val("60");
	$("." + from).text("No. " + (60 / 3.3).toFixed(1));
	$(domTo).val("85");
	$("." + to).text("No. " + (85 / 3.3).toFixed(1));
	$(domFrom).change(function() {
		var spaceTo = $(domTo).val();
		if (parseInt($(this).val()) > parseInt(spaceTo)) {
			$(this).val(spaceTo);
		}
		$(domSlider).slider("values", 0, $(this).val());
		$("." + from).text("No. " + ($(this).val() / 3.3).toFixed(1));

	});
	$(domTo).change(function() {
		var spaceFrom = $(domFrom).val();
		if (parseInt($(this).val()) < parseInt(spaceFrom)) {
			$(this).val(spaceFrom);
		}
		$(domSlider).slider("values", 1, $(this).val());
		$("." + to).text("No. " + ($(this).val() / 3.3).toFixed(1));
	});
	$(domSlider).slider({
		range : true,
		min : 1,
		max : 300,
		values : [ 60, 85 ],
		slide : function(e, ui) {
			$(domFrom).val(ui.values[0]);
			$(domTo).val(ui.values[1]);
			$("." + from).text("No. " + (ui.values[0] / 3.3).toFixed(1));
			$("." + to).text("No. " + (ui.values[1] / 3.3).toFixed(1));
		}
	});
}
/*
 * function handsonTable01(){ var container =
 * document.getElementById('basic_handson01'); var data = function() { return
 * Handsontable.helper.createSpreadsheetData(100, 12); }; var data = [ ["결과",
 * "No", "명칭", "주소", "A(권리금)", "B(월세)"], ["O", 1, "대호갈비 옆 상가", "서울특별시 송파구 문정동
 * 122", 30000, 500], ["O", 2, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500],
 * ["O", 3, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500], ["O", 4, "대호갈비 옆 상가",
 * "서울특별시 송파구 문정동 122", 30000, 500], ["O", 5, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122",
 * 30000, 500], ["O", 6, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500], ["O", 7,
 * "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500], ["O", 8, "대호갈비 옆 상가", "서울특별시
 * 송파구 문정동 122", 30000, 500], ["O", 9, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000,
 * 500], ["O", 10, "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500], ["O", 11,
 * "대호갈비 옆 상가", "서울특별시 송파구 문정동 122", 30000, 500], ["O", 12, "대호갈비 옆 상가", "서울특별시
 * 송파구 문정동 122", 30000, 500]
 *  ] var hot = new Handsontable(container, { data : data, height : 300,
 * colHeaders : true, rowHeaders : true, stretchH : 'all', columnSorting : true,
 * contextMenu:true }); //$.contextMenu("Alignment", false); }
 */

function changeWord(word) {

	switch (word) {
	case 'a':
		return 0;
		break;
	case 'b':
		return 1;
		break;
	case 'c':
		return 2;
		break;
	case 'd':
		return 3;
		break;
	case 'e':
		return 4;
		break;
	case 'f':
		return 5;
		break;
	case 'g':
		return 6;
		break;
	case 'h':
		return 7;
		break;
	case 'i':
		return 8;
		break;
	case 'j':
		return 9;
		break;
	case 'k':
		return 10;
		break;
	case 'l':
		return 11;
		break;
	case 'm':
		return 12;
		break;
	case 'n':
		return 13;
		break;
	case 'o':
		return 14;
		break;
	case 'p':
		return 15;
		break;
	case 'q':
		return 16;
		break;
	case 'r':
		return 17;
		break;
	case 's':
		return 18;
		break;
	case 't':
		return 19;
		break;
	case 'u':
		return 20;
		break;
	case 'v':
		return 21;
		break;
	case 'w':
		return 22;
		break;
	case 'x':
		return 23;
		break;
	case 'y':
		return 24;
		break;
	case 'z':
		return 25;
		break;

	}
}

function changeNumber(idx) {

	switch (idx) {
	case 0:
		return 'a';
		break;
	case 1:
		return 'b';
		break;
	case 2:
		return 'c';
		break;
	case 3:
		return 'd';
		break;
	case 4:
		return 'e';
		break;
	case 5:
		return 'f';
		break;
	case 6:
		return 'g';
		break;
	case 7:
		return 'h';
		break;
	case 8:
		return 'i';
		break;
	case 9:
		return 'j';
		break;
	case 10:
		return 'k';
		break;
	case 11:
		return 'l';
		break;
	case 12:
		return 'm';
		break;
	case 13:
		return 'n';
		break;
	case 14:
		return 'o';
		break;
	case 15:
		return 'p';
		break;
	case 16:
		return 'q';
		break;
	case 17:
		return 'r';
		break;
	case 18:
		return 's';
		break;
	case 19:
		return 't';
		break;
	case 20:
		return 'u';
		break;
	case 21:
		return 'v';
		break;
	case 22:
		return 'w';
		break;
	case 23:
		return 'x';
		break;
	case 24:
		return 'y';
		break;
	case 25:
		return 'z';
		break;

	}
}

function getFirstKeyValue(data) {
	for (elem in data) {
		/*
		 * console.log(elem); console.log(data[elem]);
		 */
		return data[elem];
	}
}

function getFirstKey(data) {
	for (elem in data) {
		/*
		 * console.log(elem); console.log(data[elem]);
		 */
		return elem;
	}
}

function toObject(arr) {
	var rv = {};
	for (var i = 0; i < arr.length; ++i)
		if (arr[i] !== undefined)
			rv[i] = arr[i];
	return rv;
}

//2017 07 31 [개발팀] 수정
function arrayLikeToObject(arr){
	var rv = {};
	for(var i in arr){
		if(arr[i] !== undefined) {
			rv[i] = arr[i];
		}
	}
	
	return rv
}
//2017 08 01 [개발팀] 수정
//jsonString을 json으로 변환후 arrayLike로 변환
//1:1 패밍만 가능 "{"c":"2015","d":"2016"}"
function jsonStringToArrayLike(jStr){
	var array = new Array();
	if(jStr != undefined){
		var jObj = JSON.parse(jStr);
		for(var i in jObj){
			array[i] = jObj[i];
		}
	}

	return array;
}

//2017 08 01 [개발팀] 수정
//jsonString을 json으로 변환후 arrayLike로 변환
//1:1 패밍만 가능 "{"c":"2015","d":"2016"}"
function arrayLikeDeleteCol(object,val){
	var array = new Array();
	for(var i in object){
		if(i != val && i != "isEmpty"){
			array[i] = object[i];
		}
	}
	return array;
}

function sortHashKeys(cat) {
	var keys = new Array();

	for (key in cat) {
		keys[keys.length] = key
	}
	keys.sort();
	return keys;
}

//2017.11.30 개발팀 추가
function arrayLikeKeyDuplication(arr , val){
	var rVal = true;
	for(key in arr){
		if(arr[key] == val){
			rVal = false;
			return rVal;
		}
	}
	return rVal;
}

function toUpperStr(str) {
	return str.toUpperCase();
}

function getType(val) {
	if (typeof val === 'undefined')
		return 'undefined';
	if (typeof val === 'object' && !val)
		return 'null';
	return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function customRenderer(instance, td) {
	Handsontable.renderers.TextRenderer.apply(this, arguments);
	/*
	 * if (isChecked) { td.style.backgroundColor = 'yellow'; } else {
	 * td.style.backgroundColor = 'white'; }
	 */
	td.style.backgroundColor = 'yellow';
	return td;
}
