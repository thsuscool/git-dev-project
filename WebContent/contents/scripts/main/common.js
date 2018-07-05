/**
* 설명 : 화면 좌측상단에 jquery debugging을 수행하는 창을 표시합니다.
* 
* 사용방식 : 자바스크립트 최상단영역에 아래와 같이 한줄 구현
* 구현    : JQ_degugconsoleView();
*/
function JQ_degugconsoleView(){
	$('body').append('<div id="inputConsole" style="position:absolute; left:800px; top:1px; width:400px; border: 1px solid blue"><table><tr><textarea id="opField" cols=42" rows="3" style="font-size:11pt"/></tr><tr><td><input type="button" id="executeButton" value="실행" onclick="fncExecute();"/></td><td><input type="button" id="deleteContext" value="삭제" onclick="fncDelete();"/></td></tr></table></div>');
	$('body').append('<div id="debugConsole" style="position:absolute; left:800px; top:110px; width:400px; border: 1px solid green" ></div>');
}

/**
* 설명 : 콘솔창에 로그를 표시합니다.
* 
*/

function log(msg){
	var console = $("#debugConsole");
	
	if (console != null){
		console.innerHTML += msg + "<br/>";
	}
}

function applySelector( operation ){
	$('*').removeClass('redBorder');
	eval('var wrappedSet = ' + operation + ';');
	wrappedSet.addClass('redBorder');
	return wrappedSet;
}

function fncExecute(){
	var operation = $('#opField').val();
	log(operation);
	try {
		if ( operation.length > 0 ){
			var wrappedSet = applySelector(operation);
			$('#debugConsole').html(wrappedSet.formatForDisplay());
		}
	} catch(e){
		log('error : ' + e);
	}
}

function fncDeleteContext(){
	var console = $("#debugConsole");

	if (console != null){
		console.innerHTML = "";
	}
}

$.fn.formatForDisplay = function(){
	if ( this.size() == 0 ){
		return "<em>wrappedSet is empty</em>";
	}
	var text = '';
	this.each(function(){
		text += '<div>' + this.tagName;
		if ( this.id ){
			text += '#' + this.id;
		}
		text += '</div>'
	});
	return text;
}