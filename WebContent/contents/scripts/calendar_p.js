/**
 * @fileoverview 날짜를 선택할 수 있도록 팝업형식의 달력을 제공한다.
 * @author OFFTON
 * @version 1.0
 */

/**
 * 지역변수 선언
 */
var _CAL_SEPERATOR  = null;                                 /** 년월 사이 구분자                         */
var _CAL_VIEW_TYPE  = null;                                 /** 달력 타입(팝업&레이어)                    */
var _CAL_CSS_SRC    = '/contents/css/layout/layout.css';    /** 달력 CSS 파일                            */
var _CAL_JS_SRC     = '/contents/scripts/calendar_p.js';    /** 달력 JS 파일                                */
var _CAL_START_ELEM = null;                                 /** 시작일 엘리먼트 이름 또는 엘리먼트        */
var _CAL_END_ELEM   = null;                                 /** 종료일 엘리먼트 이름    또는 엘리먼트        */
var _CAL_WINDOW     = null;                                 /** 달력 윈도우 오브젝트                        */
var _CAL_IMG_PATH   = '/contents/images/new/';              /** 달력 이미지 경로                        */
var _CAL_USE_OPTION = false;                                /** 달력 삭제 및 닫기 옵션 사용 유무            */
var _CAL_WEEK_CNT   = null;                                 /** 해당 월의 주 카운트                        */

/**
 * 화면에 달력을 표시한다.
 * 파라메터 개수에 따라  실제 달력을 처리하는 Calendar()에 디폴트 값을 설정하여 호출한다.<br/>
 * 파라메터 1개 : showCal(시작엘리먼트이름 또는 INPUT엘리먼트);<br/>
 * 파라메터 2개 : showCal(시작엘리먼트이름 또는 INPUT엘리먼트, 시작일);<br/>
 * 파라메터 3개 : showCal(시작엘리먼트이름 또는 INPUT엘리먼트, 시작일, 달력타입);<br/>
 * 파라메터 4개 : showCal(시작엘리먼트이름 또는 INPUT엘리먼트, 시작일, 달력타입, 년월일사이구분자);<br/>
 * 파라메터 5개 : showCal(시작엘리먼트이름 또는 INPUT엘리먼트, 시작일, 달력타입, 년월일사이구분자, 종료엘리먼트이름 또는 INPUT엘리먼트);<br/>
 * 파라메터 6개 : showCal(시작엘리먼트이름 또는 INPUT엘리먼트, 시작일, 달력타입, 년월일사이구분자, 종료엘리먼트이름 또는 INPUT엘리먼트, 이벤트);<br/>
 * @public
 * @author OFFTON
 * @return 출력완료를 나타내는 boolean 값
 * @see
 */
function showCal() {
    switch (arguments.length) {
        case 0 : alert('파라메터 입력이 잘못되었습니다.'); break;
        case 1 : Calendar(arguments[0],'','','','','',''); break;
        case 2 : Calendar(arguments[0],arguments[1],'','','',''); break;
        case 3 : Calendar(arguments[0],arguments[1],arguments[2],'','',''); break;
        case 4 : Calendar(arguments[0],arguments[1],arguments[2],arguments[3],'',''); break;
        case 5 : Calendar(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],''); break;
        case 6 : Calendar(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]); break;
    }
}

/*
 * 실제 달력을 출력하는 함수.
 * @public
 * @author OFFTON
 * @param {String} sDayNm 시작일 엘리먼트 이름    : <code>&lt;input type='text' name='str_date'&gt;</code>    ==>    str_date
 * @param {String} sDate  달력 시작일            : 2007년 12월 5일                            ==>    2007-12-05 *
 * @param {String} type   달력 타입(팝업&레이어): 팝업 => (P), 레이어 => (D)
 * @param {String} sep    년월 사이 구분자         : 2007년 12월 5일, 구분자 '.'                ==> 2007.12.05
 * @param {String} eDayNm 종료일 엘리먼트 이름     : &lt;input type='text' name='end_date'&gt;    ==>    end_date
 * @param {String} eVnt   이벤트
 */
function Calendar(sDayNm, sDate, type, sep, eDayNm, eVnt) {
    /** Set Parameters */
    if(sep=='' || sep==null) {
        _CAL_SEPERATOR    = '-';
    } else {
        _CAL_SEPERATOR    = sep;
    }
    if(type=='' || type==null) {
        _CAL_VIEW_TYPE    = 'P';
    } else {
        _CAL_VIEW_TYPE    = type;
    }

    _CAL_START_ELEM    = sDayNm;
    _CAL_END_ELEM    = eDayNm;

    /** Write Calender */
    var html = getHeader() + getBody(sDate);

    /** Calendar Position : width,height,left,top 순서 */
    var pos = getPosition(eVnt).split(',');

    /** 달력 타입이 레이어일 경우 document의 사이즈가 달력 사이즈보다 작을 경우 강제로 팝업으로 띄움 */
    if (_CAL_VIEW_TYPE == 'D') {
        var docW = (navigator.appName == 'Microsoft Internet Explorer') ? Number(document.body.offsetWidth) : Number(document.documentElement.clientWidth);
        var docH = (navigator.appName == 'Microsoft Internet Explorer') ? Number(document.body.offsetHeight) : Number(document.documentElement.clientHeight);
        var popW = Number(pos[0]) + Number(pos[2]);
        var popH = Number(pos[1]) + Number(pos[3]);

        if (Number(pos[3]) < 0 || !(docW > popW && docH > popH)) {
            _CAL_VIEW_TYPE = 'P';
            html = getHeader() + getBody(sDate);
            pos  = getPosition(eVnt).split(',');
        }
    }

    if (_CAL_VIEW_TYPE == 'P') {            //popup
        _CAL_WINDOW = window.open('', '', 'width='+pos[0]+'px,height='+pos[1]+'px,status=yes,resizable=yes,left='+pos[2]+'px,top='+pos[3]+'px');
        _CAL_WINDOW.opener = self;
        _CAL_WINDOW.document.write(html);

    } else if(_CAL_VIEW_TYPE == 'D') {        //div

        if(document.getElementById('winBody') == null) {

            _CAL_WINDOW = document.createElement('div'); //div 엘리먼트 생성

            _CAL_WINDOW.id            = 'winBody'; //id 설정

            _CAL_WINDOW.style.background = 'white';
            _CAL_WINDOW.style.width   = pos[0] + 'px';    //div 크기 및 위치 설정
            _CAL_WINDOW.style.height  = pos[1] + 'px';
            _CAL_WINDOW.style.top     = pos[3] + 'px';
            _CAL_WINDOW.style.left    = pos[2] + 'px';

            _CAL_WINDOW.style.position = 'absolute';
            _CAL_WINDOW.style.display = 'block';

            _CAL_WINDOW.innerHTML     = html;

            document.body.appendChild(_CAL_WINDOW);
        }else {
            _CAL_WINDOW.style.display = 'none';
            document.body.removeChild(_CAL_WINDOW);
            _CAL_WINDOW = null;
        }
    }
}

/**
 * 헤더 부분의  HTML 코드를 생성
 * @private
 * @author OFFTON
 * @return 헤더 부분의  HTML 코드
 * @type String
 */
function getHeader() {
    var header = '';

    header += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">    \n';
    header += '<html xmlns="http://www.w3.org/1999/xhtml">      \n';
    header += '<head>       \n';
    header += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />        \n';
    header += '<title>달력보기:통계지리정보서비스</title>     \n';
    header += '<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />     \n';
        if (_CAL_VIEW_TYPE == 'P') {
            header += '<script type="text/javascript" src="'+_CAL_JS_SRC+'"></script>        \n';
        }
    header += '</head>      \n';
    return header;
}

/**
 * 바디 부분의  HTML 코드를 생성
 * @private
 * @author OFFTON
 * @param {String} sDate 달력 시작일 : 2007년 12월 5일 ==> 2007-12-05
 * @return 바디 부분의  HTML 코드
 * @type String
 */
function getBody(sDate) {
    var body = '';
    var cd   = (_CAL_VIEW_TYPE=='P')? '' : '';

    /** 시작일 설정 : 직접 시작일을 입력할 경우 지정된 날짜로 세팅. 시작엘리먼트의 값이 존재할 경우 해당 날짜로 세팅. 없을 경우 해당일로 세팅*/
    var dt_datetime;
    if (sDate != '' && (dt_datetime = sDate.split(_CAL_SEPERATOR)).length==3) {
        dt_datetime = new Date(Number(dt_datetime[0]),Number(dt_datetime[1])-1,Number(dt_datetime[2]));
    } else if ((dt_datetime = sDate.split(_CAL_SEPERATOR)).length==2) {
        dt_datetime = new Date(Number(dt_datetime[0]),Number(dt_datetime[1])-1,1);
    } else {
        var sElem         = (typeof(_CAL_START_ELEM) == 'object' ? _CAL_START_ELEM : document.getElementsByName(_CAL_START_ELEM)[0]);
        var sElemValue     = sElem.value;
        if (sElemValue != '' && (dt_datetime = sElemValue.split(_CAL_SEPERATOR)).length==3) {
            dt_datetime = new Date(Number(dt_datetime[0]),Number(dt_datetime[1])-1,Number((dt_datetime[2]=='' ? 1 : dt_datetime[2])));
        } else if ((dt_datetime = sElemValue.split(_CAL_SEPERATOR)).length==2) {
            dt_datetime = new Date(Number(dt_datetime[0]),Number(dt_datetime[1])-1,1);
        } else {
            dt_datetime = new Date();
        }
    }

    var dt_next_year  = new Date(dt_datetime);
    var dt_next_month = new Date(dt_datetime);
    var dt_prev_year  = new Date(dt_datetime);
    var dt_prev_month = new Date(dt_datetime);

    //2008 2 29 내년 2009 2 28이 되야함
    if (isValidDay(dt_datetime.getFullYear()+1, dt_datetime.getMonth()+1, dt_datetime.getDate())) {
        dt_next_year.setYear(dt_datetime.getFullYear()+1);
    } else {
        dt_next_year = new Date(dt_datetime.getFullYear()+1, dt_datetime.getMonth(), lastDay(dt_datetime.getFullYear()+1, dt_datetime.getMonth()+1));
    }

    if(isValidDay(dt_datetime.getFullYear()-1, dt_datetime.getMonth()+1, dt_datetime.getDate())) {
        dt_prev_year.setYear(dt_datetime.getFullYear()-1);
    } else {
        dt_prev_year = new Date(dt_datetime.getFullYear()-1, dt_datetime.getMonth(), lastDay(dt_datetime.getFullYear()-1, dt_datetime.getMonth()+1));
    }

    //다음달 : 2008 10 31 의 다음 달은 11월 30일이 되어야함
    if (isValidDay(dt_datetime.getFullYear(), dt_datetime.getMonth()+2, dt_datetime.getDate())) {
        dt_next_month.setMonth(dt_datetime.getMonth()+1);
    } else {
        if(dt_datetime.getMonth() == 11) {
            //해가 바뀌는경우
            dt_next_month = new Date(dt_datetime.getFullYear()+1,0,dt_datetime.getDate());
        } else {
            dt_next_month = new Date(dt_datetime.getFullYear(), dt_datetime.getMonth()+1, lastDay(dt_datetime.getFullYear(), dt_datetime.getMonth()+2));
        }
    }

    //이전달 : 2008 10 31 의 이전 달은 9월 30일이 되어야함
    if (isValidDay(dt_datetime.getFullYear(), dt_datetime.getMonth(), dt_datetime.getDate())) {
        dt_prev_month.setMonth(dt_datetime.getMonth()-1);
    } else {
        if (dt_datetime.getMonth() == 0) {
            //해가 바뀌는경우
            dt_prev_month = new Date(dt_datetime.getFullYear()-1,11,dt_datetime.getDate());
        } else {
            dt_prev_month = new Date(dt_datetime.getFullYear(), dt_datetime.getMonth()-1, lastDay(dt_datetime.getFullYear(), dt_datetime.getMonth()));
        }
    }

    var n_weekstart   = 1;
    var dt_firstday   = new Date(dt_datetime);
    var dt_lastday    = new Date(dt_datetime);
    dt_firstday.setDate(1);
    dt_firstday.setDate(-(7+dt_firstday.getDay()-n_weekstart)%7);
    dt_lastday.setDate(0);
    var dt_current_day = new Date(dt_firstday);
    j = 1;

    body += '<body>                 \n';
    body += '<div id="wrap">        \n';
    body += '    <h1 class="hid">검색일자달력선택</h1>  \n';
    body += '        <hr />         \n';
    body += '    <div class="tc">   \n';
    body += '        <div class="cal_date mb10 mt5">    \n';
    body += '            <ul>   \n';
    body += '                <li class="vm"><a href="#" onclick="javascript:'+cd+'selectDate(\''+dt2dtstr(dt_prev_month)+'\'); return false;"><img src="/contents/images/new/last_year.gif" alt="이전달" /></a></li>  \n';
    body += '                <li><select name="_cal_year" id="_cal_year" onchange="javascript:'+cd+'selectDate(this.value + \'' + _CAL_SEPERATOR + dt2month(dt_datetime) + _CAL_SEPERATOR + dt2day(dt_datetime) +'\')"> \n';
        var thisYear = Number(dt2year(dt_datetime));

        var min = new Date().getFullYear()-100;
        var max = sDate != '' ? sDate.split(_CAL_SEPERATOR)[0] : new Date().getFullYear();

        for (var i = min; i <= max; i++) {
            var selected     = (i == thisYear) ? 'selected="selected"' : '';
            body += '            <option value="'+i+'" '+selected+'>'+i+'</option>    \n';
        }
    body += '                </select>  \n';
    body += '                 년&nbsp;  \n';
    body += '                <select name="_cal_month" id="_cal_month" onchange="javascript:'+cd+'selectDate(\''+ dt2year(dt_datetime) + _CAL_SEPERATOR + '\'+ this.value + \'' + _CAL_SEPERATOR + dt2day(dt_datetime) +'\')">  \n';
        for (var i = 1; i < 13; i++) {
            var month         = (i < 10 ? '0' + i : i + '');
            var selected     = (i == Number(dt2month(dt_datetime))) ? 'selected="selected"' : '';
            body += '            <option value="'+month+'" '+selected+'>'+month+'</option>   \n';
        }
    body += '                </select>  \n';
    body += '                 월</li>   \n';
    body += '                <li class="vm"><a href="#" onclick="javascript:'+cd+'selectDate(\''+dt2dtstr(dt_next_month)+'\'); return false;"><img src="/contents/images/new/next_year.gif"  alt="다음달" /></a></li> \n';
    body += '            </ul>  \n';
    body += '        </div>     \n';
    body += '        <div class="calendar tc">                  \n';
    body += '            <table summary="검색일자달력">         \n';
    body += '                <caption>검색일자달력</caption>    \n';
    body += '                <thead>    \n';
    body += '                    <tr>   \n';
    body += '                        <th scope="col" class="red">일</th>    \n';
    body += '                        <th scope="col">월</th>                \n';
    body += '                        <th scope="col">화</th>                \n';
    body += '                        <th scope="col">수</th>                \n';
    body += '                        <th scope="col">목</th>                \n';
    body += '                        <th scope="col">금</th>                \n';
    body += '                        <th scope="col" class="sky">토</th>    \n';
    body += '                    </tr>  \n';
    body += '                </thead>   \n';
    body += '                <tbody>    \n';
    while (dt_current_day.getMonth() == dt_datetime.getMonth() || dt_current_day.getMonth() == dt_firstday.getMonth()) {
        body += '                    <tr>   \n';

        var aClass   = '';
        var spanTagS = '';
        var spanTagE = '';
        var tdClass  = '';
        for (var n_current_wday=0; n_current_wday<7; n_current_wday++) {
            if (dt_current_day.getDate() == dt_datetime.getDate() && dt_current_day.getMonth() == dt_datetime.getMonth()) {
                //선택일자
                aClass   = '';
                tdClass  = 'cal_bg';
                spanTagS = '<span class="fb">';
                spanTagE = '</span>';
            } else if(dt_current_day.getMonth() != dt_datetime.getMonth()) {
                aClass   = '';   //이전 이후 달의 날짜
                tdClass  = '';
                spanTagS = '<span class="gray01">';
                spanTagE = '</span>';
            } else if(dt_current_day.getDay() == 0 ) {
                aClass   = 'sun';   //주일
                tdClass  = '';
                spanTagS = '';
                spanTagE = '';
            } else if(dt_current_day.getDay() == 6) {
                aClass   = 'sat';   //주말
                tdClass  = '';
                spanTagS = '';
                spanTagE = '';
            } else {
                aClass = 'day';    //평일
                tdClass = '';
                spanTagS = '';
                spanTagE = '';
            }
            body += '                        <td class="'+tdClass+'"><a href="#" class="'+aClass+'" onclick="javascript:'+cd+'selectDay(\''+dt2year(dt_current_day)+'\',\''+dt2month(dt_current_day)+'\',\''+dt2day(dt_current_day)+'\')">'+spanTagS+dt_current_day.getDate()+spanTagE+'</a></td> \n';
            dt_current_day.setDate(dt_current_day.getDate()+1);
        }
        body += '                    </tr>  \n';
        j++;
    }
    body += '                </tbody>   \n';
    body += '            </table>       \n';
    body += '</body>            \n';
    body += '</html>            \n';

    _CAL_WEEK_CNT = j-1;
    return body;
}

/**
 * 달력 팝업 및 DIV의 위치 및 사이즈 설정
 * (년월일 달력)
 * @private
 * @author OFFTON
 * @return 달력의 위치 및 사이즈 문자열. 예)100,100,10,10 (가로,세로,왼쪽여백,위쪽여백)
 * @type String
 */
function getPosition(eVnt) {
    var width    = 0;
    var height    = 0;
    var left    = 0;
    var top        = 0;
    var sElem     = (typeof(_CAL_START_ELEM) == 'object' ? _CAL_START_ELEM : document.getElementsByName(_CAL_START_ELEM)[0]);
    var webeVnt = (navigator.appName == 'Microsoft Internet Explorer') ? window.event : eVnt ;

    /** set position */
    if (!(webeVnt == null || webeVnt == '')) {
        if (_CAL_VIEW_TYPE == 'P') {
            top  = (webeVnt.screenY > screen.height - 250) ? webeVnt.screenY - 250 : webeVnt.screenY+20;
            left = (webeVnt.screenX > screen.width - 250)  ? screen.width - 250  : webeVnt.screenX+20;

        } else if(_CAL_VIEW_TYPE == 'D') {
            top  = document.body.clientTop  + GetObjectTop(sElem)  - document.body.scrollTop;
            left = document.body.clientLeft + GetObjectLeft(sElem) - document.body.scrollLeft;
        }
    }

    /** set width & height */
    var optionSize = _CAL_USE_OPTION ? 20 : 0;
    var webPHei    = (navigator.appName == 'Microsoft Internet Explorer') ? 114 : 110;
    var webDHei    = (navigator.appName == 'Microsoft Internet Explorer') ? 70 : 90;

    if (_CAL_VIEW_TYPE == 'P') {
        width    = 252;
        height    = webPHei+(_CAL_WEEK_CNT*20) + optionSize;
    } else if(_CAL_VIEW_TYPE == 'D') {
        width    = 180;
        height    = webDHei+(_CAL_WEEK_CNT*20) + optionSize;

        // 그리드의 하위 로우에 위치될 경우 달력  DIV가 숨겨질수 있으므로, 하단 여백이 없을 경우 엘리먼트 위쪽으로 출력함
        var doc_height = (navigator.appName == 'Microsoft Internet Explorer') ? Number(document.body.offsetHeight) : Number(document.documentElement.clientHeight);
        if (top + height > doc_height) {
            top = top - height - 20;
        }
    }
    return width+','+height+','+left+','+top;
}

/**
 * 날짜 변경
 * @private
 * @param {String} pDate 달력 시작일 : 2007년 12월 5일 ==> 2007-12-05
 * @author OFFTON
 */
function selectDate(pDate) {
    /** 초기 설정값을 세팅 */
    setCalenderEnv();

    var dayarr = pDate.split(_CAL_SEPERATOR);
    if (!isValidDay(dayarr[0], dayarr[1], dayarr[2])) {
        pDate = dayarr[0] + _CAL_SEPERATOR + dayarr[1] + _CAL_SEPERATOR + lastDay(dayarr[0], Number(dayarr[1]));
    }

    var optionSize     = _CAL_USE_OPTION ? 20 : 0;
    var sElem         = (typeof(_CAL_START_ELEM) == 'object' ? _CAL_START_ELEM : document.getElementsByName(_CAL_START_ELEM)[0]);

    var webDHei    = (navigator.appName == 'Microsoft Internet Explorer') ? 55 : 100;
    var webPHei    = (navigator.appName == 'Microsoft Internet Explorer') ? 150 : 170;

    if (_CAL_VIEW_TYPE=='P') {
        document.body.innerHTML = getHeader()+getBody(pDate);
        _CAL_WINDOW.resizeTo(262, webPHei+(_CAL_WEEK_CNT*20)+optionSize);

    } else if(_CAL_VIEW_TYPE=='D') {

        _CAL_WINDOW.style.background = 'white';
        _CAL_WINDOW.style.height      = webDHei+(_CAL_WEEK_CNT*20)+optionSize + 'px';
        _CAL_WINDOW.style.position     = 'absolute';
        _CAL_WINDOW.style.display     = 'block';
        _CAL_WINDOW.innerHTML         = getHeader() + getBody(pDate);

    }
}

/**
 * 초기 설정값을 세팅
 * @private
 * @author OFFTON
 */
function setCalenderEnv() {
    if (_CAL_VIEW_TYPE == null) {
        _CAL_VIEW_TYPE  = opener._CAL_VIEW_TYPE;
        _CAL_SEPERATOR  = opener._CAL_SEPERATOR;
        _CAL_START_ELEM = opener._CAL_START_ELEM;
        _CAL_END_ELEM   = opener._CAL_END_ELEM;
        _CAL_WINDOW        = opener._CAL_WINDOW;
    }
}

/**
 * 선택된 날짜를 document의 element에 출력한다.
 * @private
 * @param {String} y_gab 년도
 * @param {String} m_gab 월
 * @param {String} d_gab 일
 * @author OFFTON
 */
function selectDay(y_gab, m_gab, d_gab) {
    /** 초기 설정값을 세팅 */
    setCalenderEnv();
    var st_date = y_gab + _CAL_SEPERATOR + m_gab + _CAL_SEPERATOR + d_gab;
    var elem    = null;
    var sElem      = null;

    if (_CAL_VIEW_TYPE=='P') {
        sElem     = (typeof(_CAL_START_ELEM) == 'object' ? _CAL_START_ELEM : window.opener.document.getElementsByName(_CAL_START_ELEM)[0]);

        sElem.value = st_date;
        _CAL_WINDOW.close();
    } else if(_CAL_VIEW_TYPE=='D') {
        sElem     = (typeof(_CAL_START_ELEM) == 'object' ? _CAL_START_ELEM : document.getElementsByName(_CAL_START_ELEM)[0]);

        sElem.value = st_date;
        _CAL_WINDOW.style.display = 'none';
        document.body.removeChild(_CAL_WINDOW);
        _CAL_WINDOW = null;
    }

    /* 선택된 날짜를 출력한 후 처리 */
    try{
        Calendar_Click_after(elem);
    } catch(e){}
}

/**
 * 달력의 형식(팝업 / DIV)에 따라서 왼쪽 여백 크기를 리턴
 * @private
 * @param {Object} obj 윈도우 Object
 * @return 왼쪽 여백 크기
 * @author OFFTON
 */
function GetObjectLeft(obj) {
    if (obj.offsetParent == document.body) {
        return obj.offsetLeft;
    } else {
        return obj.offsetLeft + GetObjectLeft(obj.offsetParent);
    }
}

/**
 * 달력의 형식(팝업 / DIV)에 따라서 위쪽 여백 크기를 리턴
 * @private
 * @param {Object} obj 윈도우 Object
 * @return 위쪽 여백  크기
 * @author OFFTON
 */
function GetObjectTop(obj) {
    if (obj.offsetParent == document.body) {
        return obj.offsetTop;
    } else {
        return obj.offsetTop + GetObjectTop(obj.offsetParent);
    }
}


/**
 * "YYYY-MM-DD" 또는  "YYYY.MM.DD" 포맷의 문자열을 입력받아 Date형으로 변환
 * @private
 * @param {String} str_datetime 해당일자의 Date타입 일자
 * @return 입력 받은 날짜의 Date Object
 * @author OFFTON
 */
function str2dt(str_datetime) {
    var re_date1 = /^(\d+)\-(\d+)\-(\d+)/;
    var re_date2 = /^(\d+)\.(\d+)\.(\d+)/;

    //정규표현식을 이용
    if(!re_date1.exec(str_datetime))
    {
        if(!re_date2.exec(str_datetime))
            return alert("Invalid Datetime format: "+ str_datetime);
    }
    return (new Date (RegExp.$1,RegExp.$2-1,RegExp.$3));
}

/**
 * Date Object형의 날짜를 입력받아 해당 일자의 연도를 문자열로 변환
 * @private
 * @param {Date} dt_datetime 날짜
 * @return 년도를 string 타입으로 리턴
 * @type String
 * @author OFFTON
 */
function dt2year(dt_datetime) {
    return (new String (dt_datetime.getFullYear()));
}


/**
 * Date Object형의 날짜를 입력받아 해당 일자의 달(month)을 문자열로 변환
 * @private
 * @param {Date} dt_datetime 날짜
 * @return 월을 string 타입으로 리턴
 * @type String
 * @author OFFTON
 */
function dt2month(dt_datetime) {
    a_month = dt_datetime.getMonth() + 1;
    if ((parseInt(a_month)) < 10) {
        a_month = "0" + a_month;
    }
    return (new String(a_month));
}

/**
 * Date Object형의 날짜를 입력받아 해당 일자의 일자(day)를 문자열로 변환
 * @private
 * @param {Date} dt_datetime 날짜
 * @return 일자을 string 타입으로 리턴
 * @type String
 * @author OFFTON
 */
function dt2day(dt_datetime) {
    a_day   = dt_datetime.getDate();
    if ((parseInt(a_day)) < 10) {
        a_day = "0" + a_day;
    }
    return (new String (a_day));
}

/**
 * Date Date Object형의 날짜를 입력 받아 해당 일자를 구분자와 조합된 년월일 문자열로 변환
 * @private
 * @param {Date} dt_datetime 날짜
 * @return 구분자와 조합된 년월일 문자열
 * @type String
 * @author OFFTON
 */
function dt2dtstr(dt_datetime) {
    return dt2year(dt_datetime)+_CAL_SEPERATOR+dt2month(dt_datetime)+_CAL_SEPERATOR+dt2day(dt_datetime);
}

/**
 * 유효한(존재하는) 일(日)인지 체크
 * @private
 * @param {String} yyyy 년도
 * @param {String} mm 월
 * @param {String} dd 일
 * @return 유효한 일이면 true, 유효하지 않은 일이면 false
 * @type Boolean
 * @author OFFTON
 */
function isValidDay(yyyy, mm, dd) {
    var m   = parseInt(mm,10) - 1;
    var d   = parseInt(dd,10);
    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[1] = 29;
    }

    return (d >= 1 && d <= end[m]);
}

/**
 * 해당 년월의 마지막 날짜 구함
 * @private
 * @param {String} yyyy 년도
 * @param {String} mm 월
 * @return 해당 년월의 마지막 날짜
 * @type String
 * @author OFFTON
 */
function lastDay(yyyy, mm) {
    var end = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[2] = 29;
    }
    return end[mm];
}