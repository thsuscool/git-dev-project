// 수정
function updateProcess(url,code) {
    var f = document.fm;
	if(!borardCheck()) return;
	if(!confirm('저장하시겠습니까?')) return;

	f.aT.value = code;
	f.action   = url;
	f.submit();
}

function listProcess(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_02.jsp';

	formElem.action = url;  //리스트 조회
	formElem.target = '_self';
	formElem.submit();
}

function cancelProcess(){
    alert("111");
	document.fm.reset();
}

function borardCheck() {

    var f = document.fm;
    myEditor.saveHTML();
	//The var html will now have the contents of the textarea
	var html = myEditor.get('element').value;

	f.sgis_know_desc.value = html;

	if(f.sgis_know_title.value.trim() == "") {
		alert("제목을 입력하세요.");
		f.sgis_know_title.focus();
		return false;
	}

	if(html == "") {
		alert("내용을 입력하세요.");
		f.sgis_know_desc.focus();
		return false;
	}
	if(getLength(html) > 4000) {
		alert("내용 글자수는 4000자로 제한되어 있습니다 .\n현재글자수 : "+getLength(html));
		f.sgis_know_desc.focus();
		return false;
	}

	//파일 확장자 필터링
	var extend = true;
	if(f.file.value.trim() != "") {
		extend = fileExtendFilter(f.file.value);
		if(!extend) {
			f.file.value = '';
			f.file.focus();
			return false;
		}
	}	
	return true;
}