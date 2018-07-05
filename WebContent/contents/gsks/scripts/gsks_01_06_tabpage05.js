//등록
function saveProcess() {
	var fm=document.fm;

	if(fm.sgis_term_name.value.trim() == "") {
		alert("제목을 입력하세요.");
		fm.sgis_term_name.focus();
		return;
	}
	if(fm.sgis_term_desc.value.trim() == "") {
		alert("내용을 입력하세요.");
		fm.sgis_term_desc.focus();
		return;
	}

	if(!confirm('등록하시겠습니까?')) return;

	document.fm.aT.value="ins";
	document.fm.action="gsks_01_06_tabpage05_prc.jsp";
	document.fm.submit();
}

/**
 * @param formElem - target form Element
 *        url      - form action
 */
function listProcess(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_06_tabpage05.jsp';

	formElem.action = url;  //리스트 조회
	formElem.submit();
}

function delProc(){
	var obj = document.getElementsByTagName("input");
	var fm = document.fm;  
	var i = 0;
	var t = 0;
	var tmp = 0;
	while(obj[t]){
		if(obj[t].checked == true){
		tmp++;
		}
	t++;
	}
	if(tmp==0){
		alert('삭제 목록을 선택해 주세요');
		
	}else{
		if(confirm("삭제하시겠습니까?")==0){} 
		else{
			var msg="";
			while(obj[i]){
				if(obj[i].checked == true){
					msg+=obj[i].value+"-";
				}
				i++;
			}
		}
		fm.aT.value = "del";
		fm.check_ID.value = msg;
		fm.action = 'gsks_01_06_tabpage05_prc.jsp';
		fm.submit();
	}
}

function modifyProcess(seq){
	var fm = document.fm;
	fm.sgis_term_id.value = seq;

	if(!confirm('수정하시겠습니까?')) return;

	fm.action = 'gsks_01_06_tabpage05_modify.jsp';
	fm.submit();
}

function cancelProcess(){
	document.fm.reset();
}

function updateProcess(url) {

	if(!url)	url          = 'gsks_01_06_tabpage05_prc.jsp';
	var fm=document.fm;

	if(fm.sgis_term_name.value.trim() == "") {
		alert("제목을 입력하세요.");
		fm.sgis_term_name.focus();
		return;
	}
	if(fm.sgis_term_desc.value.trim() == "") {
		alert("내용을 입력하세요.");
		fm.sgis_term_desc.focus();
		return;
	}

	if(!confirm('저장하시겠습니까?')) return;

	document.fm.aT.value = "upd";
	document.fm.action   = url;
	document.fm.submit();
}