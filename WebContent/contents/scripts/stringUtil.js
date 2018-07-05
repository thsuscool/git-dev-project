/**
* @PGM_NAME: stringUtil
* @DESC: 문자열관련 Javascript
* @author: (주)옵톤 Offton Co., Ltd.
* @since:
* @history:
* @see:
**/


//================================================
// Function Prototypes
//================================================
String.prototype.isEmail                = jf_string_isEmail;
String.prototype.isPSN                  = jf_string_isPSN;
String.prototype.unSplit                = jf_string_unSplit;
String.prototype.unSplitDash            = jf_string_unSplitDash;
String.prototype.left                   = jf_string_left;
String.prototype.right                  = jf_string_right;
String.prototype.lPad                   = jf_string_lPad;
String.prototype.rPad                   = jf_string_rPad;
String.prototype.replaceAll             = jf_string_replaceAll;


//================================================
// Functions
//================================================

/**
*  메일형식에 맞는지 체크. 올바른 메일형식일 경우 true, 아닐경우 false를 리턴
* @param
* @return boolean
*/
function jf_string_isEmail() {
  return (/^\w+((-|\.)\w+)*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]{2,4}$/.test(this));
}

/**
*  올바른 주민등록번호인지 체크, 올바른 주민등록번호일 경우 true, 아닐경우 false
* @param
* @return boolean
*/
function jf_string_isPSN() {

  var psn;
  var i = 0, j = 0, sum = 0, checkVal = 0;

  psn = this.replace('-', '');

  if (psn == '1111111111118') {         //올바르지 않은 주민등록번호
    return false;
  }
  if (!/^[0-9]+$/.test(psn)) {          //숫자가 아닐경우 return false
    return false;
  }

  for (i = 0, j = 2; j < 10; i++, j++) {
    sum += (psn.charAt(i) * j);
  }
  for (i = 8, j = 2; j < 6; i++, j++) {
    sum += (psn.charAt(i) * j);
  }

  checkVal = 11 - (sum % 11);
  checkVal = (checkVal >= 10) ? checkVal - 10 : checkVal;

  if (psn.charAt(12) != checkVal) {
    return false;
  }

  return true;
}

/**
*  구분자를 제거
* @param delimiter	구분자
* @return ret	구분자를 제거한 문자열
*/
function jf_string_unSplit(delimiter){
  var ret;
  var reg_exp_split;

  delimiter = (delimiter == null) ? '-' : delimiter;

  reg_exp_split = new RegExp('\\' + delimiter, 'gi');
  ret = this.replace(reg_exp_split, '');

  return ret;
}

/**
*  구분자 dash('-')를 제거
* @param
* @return dash('-')를 제거한 문자열을 리턴
*/
function jf_string_unSplitDash(){
  return (this.unSplit('-'));
}

/**
* 왼쪽부터 문자열을 잘라 리턴해주는 함수
* @param len		자를 문자열의 길이
* @return 왼쪽으로 부터 len만큼 자른 문자열
*/
function jf_string_left(len) {
  if (len <= 0) {
    return '';
  } else if (len > this.length) {
    return this;
  } else {
    return this.substring(0, len);
  }
}

/**
* 오른쪽부터 문자열을 잘라 리턴해주는 함수
* @param len	 자를 문자열의 길이
* @return 오른쪽으로 부터 len만큼 자른 문자열
*/
function jf_string_right(len) {
  if (len <= 0) {
    return "";
  } else if (len > this.length) {
    return this;
  } else {
    var str_len = this.length;
    return this.substring(str_len, str_len - len);
  }
}

/**
* 길이만큼 왼쪽에 빈 공간을 특정 문자로 채워주는 함수
* @param len	 최종 문자열의 길이
* @param charchar	빈 문자를 길이만큼 채워줄 문자
* @return ret
*/
function jf_string_lPad(len, ch) {
  var ret      = this;
  var this_len = this.length;

  if (len < this_len) return ret;

  for (i = 0; i<len-this_len; i++) {
    ret = ch + ret;
  }

  return ret;
}

/**
* 길이만큼 오른쪽 빈 공간을 특정 문자로 채워주는 함수
* @param len		최종 문자열의 길이
* @param char	빈 문자를 길이만큼 채워줄 문자
* @return ret
*/
function jf_string_rPad(len, ch) {
  var ret      = this;
  var this_len = this.length;

  if (len < this_len) return ret;

  for (i = 0; i<len-this_len; i++) {
    ret = ret + ch;
  }

  return ret;
}

/**
* 문자열에 포함된 특정 문자를 다른 문자로 변경한다.
* @param symbol1	 	바꿀문자
* @param symbol2		바뀔문자
* @return ret	문자를 치환하여 리턴한다.
*/
function jf_string_replaceAll( symbol1, symbol2 ) {
  var spt = this.split( symbol1 );
  var ret = '';

  for ( var i = 0; i < spt.length; i++ ) {
    if ( i > 0 ) ret += symbol2;
    ret += spt[i];
  }

  return ret == '' ? this : ret;
}

/**
* 법인번호에 구분자 '-' 추가
* @param elm
* @return
*/
function bubin_noInput(elm) {
	if(elm.value.length == 6)
		elm.value += "-";
}

/**
*
* @param elm
* @param notify
* @return boolean
*/
function emailCheck(elm,notify) {
	var avail_form=eval(form);
	var form_value=avail_form.value;

	if (!form_value.isEmpty()) {
		if (!form_value.isEmail()) {
			focusSelect(e);
			alert(notify);
			return false;
		}
	}
	return true;
}

/**
*
* @param
* @param
* @return
*/
function formatInput(elm,format) {
	var ar = format.split("-");
	for(var i = 0; i < ar.length; i++) {
		var index = Number(ar[i]);
		if(elm.value.length == index) {
			elm.value += '-';
			return;
		}
		index++;
	}
}

/**
* 주민번호 체크
* @param elm
* @param notify
* @return boolean
*/
function reginumRequsite(elm,notify) {

	if(!notNullCheck(elm,notify,13))
		return false;

	if(!elm.value.isPSN()) {
		alert(MSG_COM_ERR_016.replace('@',notify));
		//alert(notify + " 올바른 주민번호로 기입하여 주십시오!");
		return false;
	}
	return true;
}

/**
* 문자열에 포함된 기준 구분자를 새로운 구분자로 변환
* 문자열이 공백이면 그대로 리턴
* @param str	변환될 문자열
* @param symbol1	 기존 구분자
* @param symbol2	 새로운 구분자
* @return val	새로운 구분자로 변환된 문자열
*/
function replace(str,symbol1,symbol2) {
  var spt = str.split(symbol1);
  var val = '';

  for(var i=0; i< spt.length; i++) {
    if(i > 0) val += symbol2;
    val += spt[i];
  }

  return val == '' ? str : val;
}

/**
* 우편번호에 구분자 '-' 추가
* @param elm
* @return
*/
function zipcodeInput(elm) {
	if(elm.value.length == 3)
		elm.value += '-';
}

/**
* 사업번호에 구분자 '-' 추가
* @param elm	사업번호
* @return
*/
function saup_noInput(elm) {
	if(elm.value.length == 3)
		elm.value += "-";
	if(elm.value.length == 6)
		elm.value += "-";
}



/*
' ------------------------------------------------------------------
' Function    : checkByte()
' Description : 입력한 글자수를 체크
' Argument    : Object Name(글자수를 제한할 컨트롤)
' Return      :
* 사용방법    :  onkeyup="checkByte(this,10);
' ------------------------------------------------------------------
*/
function checkByte(obj,ari_max)
{
   var ls_str     = obj.value; // 이벤트가 일어난 컨트롤의 value 값
   var li_str_len = ls_str.length;  // 전체길이

   // 변수초기화
   var li_max      = ari_max; // 제한할 글자수 크기
   var i           = 0;  // for문에 사용
   var li_byte     = 0;  // 한글일경우는 2 그밗에는 1을 더함
   var li_len      = 0;  // substring하기 위해서 사용
   var ls_one_char = ""; // 한글자씩 검사한다
   var ls_str2     = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

   var last_btye  =  0;

   for(i=0; i< li_str_len; i++)
   {
      // 한글자추출
      ls_one_char = ls_str.charAt(i);

      // 한글이면 2를 더한다.
      if (escape(ls_one_char).length > 4) li_byte  += 2;
      // 그밗의 경우는 1을 더한다.
      else li_byte++;

      // 전체 크기가 li_max를 넘지않으면
      if(li_byte <= li_max) li_len = i + 1;
   }

   // 전체길이를 초과하면
   if(li_byte > li_max)
   {
      alert( MSG_COM_WRN_028.replace('@', li_max ));
      ls_str2 = ls_str.substr(0, li_len);

      obj.value = ls_str2;
      //obj.focus();
   }
}
