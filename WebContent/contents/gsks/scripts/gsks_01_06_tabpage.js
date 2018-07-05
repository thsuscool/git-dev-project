//등록
function saveProcess1() {
	var fm=document.fm;

    if(!borardCheck()) return;
	if(!confirm('등록하시겠습니까?')) return;

	document.fm.aT.value="ins";
	document.fm.action="gsks_01_06_tabpage_prc.jsp";
	document.fm.submit();
}
// 수정
function updateProcess1(url) {

	if(!url)	url          = 'gsks_01_06_tabpage_prc.jsp';
	var fm=document.fm;

	if(!borardCheck()) return;

	if(!confirm('저장하시겠습니까?')) return;

	document.fm.aT.value = "upd";
	document.fm.action   = url;
	document.fm.submit();
}
/**
 * @param formElem - target form Element
 *        url      - form action
 */
function listProcess(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_06_tabpage01.jsp';

	formElem.action = url;  //리스트 조회
	formElem.submit();
}

function deleteProcess1(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_06_tappage_prc_del.jsp';

	if(!confirm('삭제하시겠습니까?')) return;

	formElem.aT.value = "del";
	formElem.action   = url;
	formElem.submit();
}

function modifyProcess1(formElem, url){
	
	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_06_tabpage01_update.jsp';


	if(!confirm('수정하시겠습니까?')) return;

	formElem.action = url;
	formElem.submit();
}

function cancelProcess(){
	document.fm.reset();
}

function borardCheck() {

	if(fm.sgis_board_title.value.trim() == "") {
		alert("제목을 입력하세요.");
		fm.sgis_board_title.focus();
		return false;
	}

	if(getLength(fm.sgis_board_title.value) > 50) {
		alert("제목 글자수는 한글 25자, 영문 50자로 제한되어 있습니다.")
		fm.sgis_board_title.focus();
		return false;
	}		

	if (fm.sgis_board_pop_start.value != ""){
	   if (!isDate(fm.sgis_board_pop_start.value) || !is_valid_date(fm.sgis_board_pop_start.value)) {
	       alert("입력한 날짜 형식(YYYY-MM-DD)에 안맞습니다.");
	       fm.sgis_board_pop_start.focus();
	       return false;
	   }
	}

	if (fm.sgis_board_pop_end.value != ""){
	   if (!isDate(fm.sgis_board_pop_end.value) || !is_valid_date(fm.sgis_board_pop_end.value)) {
	       alert("입력한 날짜 형식(YYYY-MM-DD)에 안맞습니다.");
	       fm.sgis_board_pop_end.focus();
	       return false;
	   }
	}


   if (fm.sgis_board_pop_start.value == "" || fm.sgis_board_pop_end.value == "" ){
       alert("게시기간을 입력하세요.");
       fm.sgis_board_pop_start.focus();
       return false;
   }else{
       if (!date_comp(fm.sgis_board_pop_start.value, fm.sgis_board_pop_end.value)){
          fm.sgis_board_pop_end.focus();
          return false;
       }
   }
   
   if(document.fm.zone.checked) {
	   
	   if(document.fm.aT.value=="ins" && document.fm.sgis_board_file_zone.value=="") {
		   alert("알림존 이미지를 선택하세요.");
		   return false;
	   } else if(document.fm.aT.value=="upd" && document.fm.sgis_board_file_zone_name.value == "" && document.fm.sgis_board_file_zone.value == "") {
		   alert("알림존 이미지를 선택하세요.");
		   return false;		   
	   }
   }

    myEditor.saveHTML();
	//The var html will now have the contents of the textarea
	var html = myEditor.get('element').value;
	fm.sgis_board_desc.value = html;
		
	if(html == "") {
		alert("내용을 입력하세요.");
		//fm.sgis_board_desc.focus();
		return false;
	}
	if(getLength(html) > 4000) {
		alert("내용 글자수는 4000자로 제한되어 있습니다.\n현재 글자수 : "+getLength(html));
		//fm.sgis_board_desc.focus();
		return false;
	}	

	return true;
}