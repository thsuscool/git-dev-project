/*********************************************************************
* @source      : divwriter.js
* @description : HTML 화면에서 정의된 특정 영역(DIV)에 테이블, 차트 등을
                 Ajax를 이용하여 동적으로 Display하는 메소드를 정의
**********************************************************************
* DATE       AUTHOR   VERSION DESCRIPTION
* ---------- -------- ------- ----------------------------------------
* 2008-02-11 OFFTON   1.0     최초 작성
* 2008-03-20 sim sun woo   수정 ( alert message 뺌) - include xxx_message.js 참고.
*********************************************************************/

//====================================================================
// Hash Class Define
//====================================================================
function Hash(){

    Hash.prototype.set     = jf_set;        //set('key','value')
    Hash.prototype.get     = jf_get;        //get('key')
    Hash.prototype.length  = jf_length;        //length()
    Hash.prototype.keys    = jf_keys;        //keys()
    Hash.prototype.values  = jf_values;        //values()
    Hash.prototype.extend  = jf_extend;        //extend(['key1:value1','key2:value2'])

    this.keyIndex  = new Array();
    this.keyValues = new Array();

    function jf_set(key,value) {
        var keyNum;
        for(i=0; i<this.keyIndex.length; i++){ if(this.keyIndex[i]==key) { keyNum=i; break; } }
        if(keyNum == null) {this.keyIndex[this.keyIndex.length]=key;}
        this.keyValues[key]=value;
    }
    function jf_get(key){ return this.keyValues[key]; }
    function jf_length(){ return this.keyIndex.length;}
    function jf_keys() {
        var keys = '';
        for(i=0;i<this.keyIndex.length;i++) {
            keys += (i==0) ? this.keyIndex[i] : ','+this.keyIndex[i];
        }
        return keys;
    }
    function jf_values() {
        var values = '';
        for(i=0;i<this.keyIndex.length;i++) {
            values += (i==0) ? this.keyValues[this.keyIndex[i]] : ','+this.keyValues[this.keyIndex[i]];
        }
        return values;
    }
    function jf_extend(list) {
        for(var i=0;i<Number(list.length);i++) {
            var keyValues = list[i].split(':');
            if(keyValues.length==2)this.set(keyValues[0],keyValues[1]);
        }
    }
}

//====================================================================
// Variable Define
//====================================================================
var paramObject = new Hash();


//====================================================================
// Method Define
//====================================================================
/*
  function name : getParam
  description   : paramObject에서 해당 Key값을 리턴
  parameters    : p_key - [필수] 가져올 값의 키
  return value  : 키에 해당하는 값
*/
function getParam(p_key){

    //alert("divwriter 1111: "+paramObject.get(p_key));
    return paramObject.get(p_key);
}


/*
  function name : setParam
  description   : paramObject에 파라메터를 저장
  parameters    : 인수1개 : ['Key:Value','Key:Value'...]
                                    인수2개 : 'key','value'
*/
function setParam(){
    try{
        if(arguments.length == 1){
            paramObject.extend(arguments[0]);
        }else if(arguments.length == 2){
            paramObject.set(arguments[0], arguments[1]);
        }
    }catch (e){ alert('setParam():'+e);}
};

/**
 * @desc  기존의 key, value조합의 parameter를 초기화한다.
 */
function clear() {

    paramObject = new Hash();
}

/*
  function name : writeDiv
  description   : Div 내용을 동적으로 생성
  parameters    : 인수타입 String : 'divId'
                                    인수타입 list   : ['divID','divID']
*/
function writeDiv(p_div, callback){
    var divType   = '';
    var paramType = typeof(p_div);

    if(paramType == 'string'){
        divType = document.getElementById(p_div).getAttribute('type');
        if(divType=='html'){
            writeHtml(p_div);
        }else if(divType=='table'){
            writeTable(p_div, callback);
        }else if(divType=='chart'){
            writeChart(p_div);
        }else if(divType=='field'){
            writeField(p_div);
        }
    }else if(paramType == 'object'){
        for(var i=0; i<p_div.length; i++){
            divType = document.getElementById(p_div[i]).getAttribute('type');

            if(divType=='html'){
                writeHtml(p_div[i]);
            }else if(divType=='table'){
                writeTable(p_div[i], callback);
            }else if(divType=='chart'){
                writeChart(p_div[i]);
            }else if(divType=='field'){
                writeField(p_div[i]);
            }
        }
    }
}


/*
  function name : writeChart
  description   : Chart Object 생성 후 Div에 추가
  parameters    : p_key - [필수] div 아이디
*/
function writeChart(p_div){
    var divObj = document.getElementById(p_div);

    if(divObj.getAttribute('data')==''){
        alert(p_div+'의 데이터 파일이 존재하지 않습니다.');
        return;
    }
    if(divObj.design== ''){
        alert(p_div+'의 디자인 파일이 존재하지 않습니다.');
        return;
    }

    //파라메터 처리
    var params    = '';
    var keyArrObj = paramObject.keys().split(',');
    var valArrObj = paramObject.values().split(',');
    for(i=0; i<keyArrObj.length; i++) {
        params += (i==0) ? '"'+keyArrObj[i].replace(reg_exp_table.getHashValue('REGEXP_TRIM'), '')+'":"'+valArrObj[i]+'"' : ',"'+keyArrObj[i].replace(reg_exp_table.getHashValue('REGEXP_TRIM'), '')+'":"'+valArrObj[i]+'"';
    }

    if(params!='') params = '{' + params + '}';

    //플래시 OBJECT HTML 생성
    var newHtml = getWriteFlashHTML('/_chart/'+divObj.chart+'.swf' + '?' + createRandomCode()
                              , divObj.wid, divObj.hei, p_div, ''
                              , 'designxml='+divObj.design+'&'+'dataxml='+divObj.getAttribute('data')+'&'+'param='+params
                              , 'transparent');

    //플래시 차트를 출력
    divObj.innerHTML = newHtml;
}


/*
  function name : createHttpRequest
  description   : Ajax를 사용하기 위해 XMLHttpRequest 오브젝트 생성
  return value  : XMLHttpRequest 오브젝트
*/
function createHttpRequest(){
    if(window.ActiveXObject){
        try{
            // IE6
            return new ActiveXObject("Msxml2.XMLHTTP");
        }catch(e){
            try{
                // IE4, IE5
                return new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e2){
                return null;
            }
        }
    }else if (window.XMLHttpRequest){
        // Mozilla, FireFox, Opera, Safari, Konqueror3
        return new XMLHttpRequest();
    }else{
        return null;
    }
}


/*
  function name : writeTable
  description   : Ajax를 이용하여 Table HTML을 동적으로 생성
  parameters    : p_key - [필수] div 아이디
*/
function writeTable(p_div, callback){
    var divObj     = document.getElementById(p_div);
    var divPadding = '';
    if(divObj.getAttribute('data')==''){
        alert(p_div+'의 데이터 파일이 존재하지 않습니다.');
        return;
    }

    //메시지처리 & 로딩 메시지 세로정렬
    divObj.innerHTML = "<table width='100%' height='90%'><tr><td align='center'><img src='/contents/images/indicator_medium.gif' border='0'></td></tr></table>";
    divPadding       = divObj.style.padding;
    var wid = (Number(divObj.style.width.replace('px',''))-180)/2;
    var hei = (Number(divObj.style.height.replace('px',''))-80)/2;
    wid = (wid>0)? wid+'px ' : '0px ';
    hei = (hei>0)? hei+'px ' : '0px ';

    /* DIV 사이즈가 변경되므로 패딩 스타일 비활성 */
    //divObj.style.padding=hei+wid+hei+wid;

    //파라메터 처리
    var params    = '';
    var keyArrObj = paramObject.keys().split(',');
    var valArrObj = paramObject.values().split(',');
    for(i=0; i<keyArrObj.length; i++)
        params += (i==0) ? keyArrObj[i].replace(reg_exp_table.getHashValue('REGEXP_TRIM'), '')+'='+encodeURL(valArrObj[i]) : '&'+keyArrObj[i].replace(reg_exp_table.getHashValue('REGEXP_TRIM'), '')+'='+encodeURL(valArrObj[i]);

    //Table HTML을 동적으로 생성
    var request = createHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){

            var divStr = request.responseText;
            var sessionScript = '';

            try
            {
                if(divStr.indexOf("<script id='sessionChk'") >-1)
                {
                    sessionScript = divStr.substring(divStr.lastIndexOf('<script')+7,divStr.lastIndexOf('</script>'));
                    sessionScript = "<scr"+"ipt"+sessionScript+"<\/scr"+"ipt>";
                    document.write(sessionScript);
                }

                //if(request.status == 200)
                //{
                    divObj.innerHTML = divStr;
                    //if(typeof callback == 'function') callback();
                    //setTimeout(function(){
                        try{onLoadAjax(p_div, divStr, divObj.getAttribute('data'));}catch(e){alert(e.message);}
                    //}, 200);
                //}
                //else
                //{
                //    alert(divStr);
                //}


            }catch(e){alert(divStr);}

            divObj.style.padding = divPadding
        }
    }


    request.open('POST', divObj.getAttribute('data'), true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset='utf-8'; ");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}


/*
  function name : writeField
  description   : Ajax를 이용하여 FieldHTML을 동적으로 생성
  parameters    : p_key - [필수] div 아이디
*/
function writeField(p_div){
    var divObj     = document.getElementById(p_div);
    var divPadding = '';
    if(divObj.getAttribute('data')==''){
        alert(p_div+'의 데이터 파일이 존재하지 않습니다.');
        return;
    }

    //메시지처리 & 로딩 메시지 세로정렬
    //divObj.innerHTML = "<table width='100%' height='100%'><tr><td align='center'><img src='/_img/indicator_small.gif' border='0'></td></tr></table>";
    divPadding       = divObj.style.padding;
    var wid = (Number(divObj.style.width.replace('px',''))-180)/2;
    var hei = (Number(divObj.style.height.replace('px',''))-80)/2;

    wid = (wid>0)? wid+'px ' : '0px ';
    hei = (hei>0)? hei+'px ' : '0px ';
    divObj.style.padding=hei+wid+hei+wid;

    //파라메터 처리
    var params    = '';
    var keyArrObj = paramObject.keys().split(',');
    var valArrObj = paramObject.values().split(',');
    for(i=0; i<keyArrObj.length; i++)
        params += (i==0) ? keyArrObj[i].replace(reg_exp_table.getHashValue('REGEXP_TRIM'), '')+'='+encodeURL(valArrObj[i]) : '&'+keyArrObj[i].replace(reg_exp_table.getHashValue('REGEXP_TRIM'), '')+'='+encodeURL(valArrObj[i]);

    //Table HTML을 동적으로 생성
    var request = createHttpRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){

            var divStr = request.responseText;
            var sessionScript = '';

            try
            {
                if(divStr.indexOf("<script id='sessionChk'") >-1)
                {
                    sessionScript = divStr.substring(divStr.lastIndexOf('<script')+7,divStr.lastIndexOf('</script>'));
                    sessionScript = "<scr"+"ipt"+sessionScript+"<\/scr"+"ipt>";
                    document.write(sessionScript);
                }
                divObj.innerHTML = divStr;
                onLoadAjax(p_div, divStr, divObj.getAttribute('data'));

            }catch(e){alert(e.message);}

            divObj.style.padding = divPadding
        }
    }


    request.open('POST', divObj.getAttribute('data'), true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset='utf-8'; ");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}


/*
  function name : showDiv
  description   : DIV를 보임 처리
  parameters    : 인수타입 String : 'divId'
                                    인수타입 list   : ['divID','divID']
*/
function showDiv(p_div){
    var paramType = typeof(p_div);

    if(paramType == 'string'){
        document.getElementById(p_div).style.display='block';
    }else if(paramType == 'object'){
        for(var i=0; i<p_div.length; i++){
            document.getElementById(p_div[i]).style.display='block';
        }
    }
}


/*
  function name : hideDiv
  description   : DIV를 숨김 처리
  parameters    : 인수타입 String : 'divId'
                                    인수타입 list   : ['divID','divID']
*/
function hideDiv(p_div){
    var paramType = typeof(p_div);

    if(paramType == 'string'){
        document.getElementById(p_div).style.display='none';
    }else if(paramType == 'object'){
        for(var i=0; i<p_div.length; i++){
            document.getElementById(p_div[i]).style.display='none';
        }
    }
}


/*
  function name : linkScrollX
  description   : 두 DIV간의 스크롤 LEFT 이벤트를 링크한다
  parameters    : p_fromDivId - [필수] 스크롤 이벤트 발생 DIV
                : p_toDivId   - [필수] 스크롤 이벤트 적용 DIV
*/
function linkScrollX(p_fromDivId, p_toDivId){
    document.getElementById(p_toDivId).scrollLeft = document.getElementById(p_fromDivId).scrollLeft;
}


/*
  function name : linkScrollY
  description   : 두 DIV간의 스크롤 TOP 이벤트를 링크한다.
  parameters    : p_fromDivId - [필수] 스크롤 이벤트 발생 DIV
                : p_toDivId   - [필수] 스크롤 이벤트 적용 DIV
*/
function linkScrollY(p_fromDivId, p_toDivId){
    document.getElementById(p_toDivId).scrollTop = document.getElementById(p_fromDivId).scrollTop;
}


/*
  function name : setColor
  description   : Row의 Color 지정
  parameters    : p_targetDiv - [필수] 대상 Row 상위 DIV
                : p_trId      - [필수] 대상 Row
*/
function setColor(p_targetDiv, p_trId){
    if(p_trId != "")
    {
        var elementsArray = document.getElementById(p_targetDiv).getElementsByTagName('tr');
        for(var i=0; i<elementsArray.length; i++)
            elementsArray[i].style.background = 'white';

        document.getElementById('TR'+p_trId).style.background = 'silver';
    }
}


/**
 * 특정 FORM 안에 선언된 태그들(input, select, checkbox, radio)중
 * 태그 내에 p_property가 선언된 객체의  유효성을 체크한다.
 * @param {String} Form_ID     - 대상 Form
 * @param {String} Property_ID - 대상 Property
 */
checkFormValue = function(p_form, p_property)
{
    if(!checkField( p_form, '')) return false;
    return true;
};


/**반드시 필요로 하는 Field들에 대한 alert 창**/
function checkField(form , frame)
{
    var emptyElement;
    var obj_fm;
    var obj_frame;
    var pre_obj;
    var j= 0;

    if(form  == null) form = 'listForm';
    if(frame == null) frame = 'listFrame';

    if(frame != '')
    {
        obj_frame = eval('parent.'+frame);
        obj_fm  = eval('parent.'+frame+'.document.'+form);
    }
    else
    {
        obj_fm  = eval('document.'+form);
    }

   var objArr = obj_fm.elements;

    for(var i=0 ; i<objArr.length; i++)
    {
       if(objArr[i].required == 'required')
       {
           if(objArr[i].type == 'radio')
           {
               var radioArr = '';
               var radioCheck = false;
               var radioElem;

               if(frame !='') radioArr = obj_frame.document.getElementsByName(objArr[i].name);
               else radioArr = document.getElementsByName(objArr[i].name);

               for(var j=0; j<radioArr.length; j++)
               {
                    if(!radioCheck)
                    {
                        radioCheck = radioArr[j].checked;

                        if(!radioCheck && radioElem == undefined)
                            radioElem = radioArr[j];
                    }
               }

                if(!radioCheck)
                {
                    emptyElement = radioElem;
                    break;
                }

           }
            //체크박스
            else if(objArr[i].type == 'checkbox')
            {
                if(!objArr[i].checked)
                {
                    emptyElement = objArr[i];
                    break;
                }
            }
            //텍스트 및 콤보박스
            else if(objArr[i].value == '')
            {
                emptyElement = objArr[i];
                break;
            }
       }
    }

   if(emptyElement != undefined)
    {
        alert(emptyElement.rename+'을(를) 입력하십시오.');
        emptyElement.focus();
        return false;
    }

    return true;
}



