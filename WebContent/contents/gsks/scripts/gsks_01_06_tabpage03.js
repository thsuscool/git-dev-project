//등록
function saveProcess(url) {
	var fm=document.fm;

	if(!url) url = 'gsks_01_06_tabpage03_prc.jsp';

    // 체크
    if(!borardCheck()) return;
    
	if(!confirm('등록하시겠습니까?')) return;

	document.fm.aT.value="ins";
	document.fm.action= url;
	document.fm.submit();
}




//답변
function repProcess(url) {
	var fm=document.fm;

	if(!url)	url = 'gsks_01_06_tabpage03_prc.jsp';

    // 체크
    

    if(!borardCheck()) return;
	if(!confirm('등록하시겠습니까?')) return;
    document.fm.aT.value="rep";
	document.fm.action= url;
    document.fm.submit();
	
}

/**
 * @param formElem - target form Element
 *        url      - form action
 */
function listProcess(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_06_tabpage03.jsp';

	formElem.action = url;  //리스트 조회
	formElem.submit();
}

function deleteProcess(url){

		if(!url)	url          = 'gsks_01_06_tabpage03_prc.jsp';
	
		if(!confirm('삭제하시겠습니까?')) return;
	
		document.fm.aT.value = "del";
		document.fm.action   = url;
		document.fm.submit();

}

function modifyProcess(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_06_tabpage03_modify.jsp';
    
    // 체크
    if(!borardCheck()) return;
   	if(!confirm('수정하시겠습니까?')) return;
    formElem.action = url;
	formElem.submit();
	
}

function cancelProcess(){
	document.fm.reset();
}

function updateProcess(url) {

	if(!url)	url          = 'gsks_01_06_tabpage03_prc.jsp';
	var fm=document.fm;

    // 체크
    if(!borardCheck()) return;
	if(!confirm('저장하시겠습니까?')) return;

	document.fm.aT.value = "upd";
	document.fm.action   = url;
	document.fm.submit();
}

function borardCheck() {
	if(fm.sgis_board_title.value.trim() == "") {
		alert("제목을 입력하세요.");
		fm.sgis_know_title.focus();
		return false;
	}
	if(getLength(fm.sgis_board_title.value) > 500) {
		alert("제목 글자수는 한글 250자, 영문 500자로 제한되어 있습니다.")
		fm.sgis_board_title.focus();
		return false;
	}		
	if(fm.sgis_board_desc.value.trim() == "") {
		alert("내용을 입력하세요.");
		fm.sgis_know_desc.focus();
		return false;
	}
	if(getLength(fm.sgis_board_desc.value) > 4000) {
		alert("내용 글자수는 한글 2000자, 영문 4000자로 제한되어 있습니다.")
		fm.sgis_board_desc.focus();
		return false;
	}
	return true;
}