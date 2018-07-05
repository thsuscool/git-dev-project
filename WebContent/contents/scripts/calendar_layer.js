/*
*	최초 재작자 : 모름
*  @author      :  leewoosung / @since 2008-11-06
*  @editor      :
*  @version     :  0.0.0.1
*  lws00778@gmail.com
*	prototype.js
*/

var target;                                                                    // 호출한 Object의 저장
var stime;
    document.write("<div id=\"temp_minical\" oncontextmenu=\"return false\" ondragstart=\"return false\" onselectstart=\"return false\" style=\"background:buttonface; margin:0px; padding:0px; margin-top:2px; border-top:0px solid buttonshadow;border-left: 0px solid buttonshadow;border-right: 0px solid buttonshadow;border-bottom:0px solid buttonshadow;width:160px;display:none;position: absolute; z-index: 99\"><iframe width=\"150\" height=\"130\" border=\"0\" frameborder=\"0\" ></iframe></div>");
    document.write("<div id=\"minical\" oncontextmenu=\"return false\" ondragstart=\"return false\" onselectstart=\"return false\" style=\"background:buttonface; margin:5px; padding:5px; margin-top:2px; border-top:1px solid buttonshadow;border-left: 1px solid buttonshadow;border-right: 1px solid buttonshadow;border-bottom:1px solid buttonshadow;width:160px; display:none;position: absolute; z-index: 99\"></div>");

function Calendar(obj,event) {                                                        // jucke
    var now = obj.value.split("-");
    var x, y;

    target = obj;                                                                // Object 저장;

    x = (document.layers) ? loc.pageX : event.clientX;
    y = (document.layers) ? loc.pageY : event.clientY;

    x = Event.pointer(event).x;                                            // 스크롤 영역 보정
    y = Event.pointer(event).y;

    $('minical').style.top    = (y+7)+"px";
    $('minical').style.left    = (x-50)+"px";
    $('minical').style.display = ($('minical').style.display == "block") ? "none" : "block";

    $('temp_minical').style.top    = (y+7)+"px";
    $('temp_minical').style.left    =(x-50)+"px";
    $('temp_minical').style.display = ($('temp_minical').style.display == "block") ? "none" : "block";

    if (now.length == 3) {                                                        // 정확한지 검사
        Show_cal(now[0],now[1],now[2]);                                            // 넘어온 값을 년월일로 분리
    } else {
        now = new Date();
        Show_cal(now.getFullYear(), now.getMonth()+1, now.getDate());            // 현재 년/월/일을 설정하여 넘김.
    }
}

function doOver(event) {                                                                // 마우스가 칼렌다위에 있으면
    var el = (document.layers) ? loc : event;
    cal_Day = el.title;
    if(cal_Day)
    {
        if (cal_Day.length > 7) {                                                    // 날자 값이 있으면.
            el.style.borderTopColor = el.style.borderLeftColor = "buttonhighlight";
            el.style.borderRightColor = el.style.borderBottomColor = "buttonshadow";
        }
    }
    window.clearTimeout(stime);                                                    // Clear
}

function doClick(event) {                                                            // 날자를 선택하였을 경우
     var el = (document.layers) ? loc : event;
    cal_Day = el.title;
    el.style.borderColor = "red";                            // 테두리 색을 빨간색으로
    if(cal_Day)
    {
        if (cal_Day.length > 7) {                                                    // 날자 값이있으면
            target.value= conv_date(cal_Day);                                                    // 값 설정
            target.focus();
        }
    }
    $('minical').style.display='none';                                                // 화면에서 지움
    $('temp_minical').style.display='none';                                                // 화면에서 지움
}

function conv_date (time) {

    var year  = time.substr(0,4);
    var month = time.substr(4,2);
    var day   = time.substr(6,2);

    return year+"-"+month+"-"+day;
}

function doOut(event) {
    var el = (document.layers) ? loc : event;
    cal_Day = el.title;
    if(cal_Day)
    {
        if (cal_Day.length > 7) {
            el.style.borderColor = "white";
        }
    }
    //stime=window.setTimeout("minical.style.display='none';", 200);
}

function day2(d) {                                                                // 2자리 숫자료 변경
    var str = new String();

    if (parseInt(d) < 10) {
        str = "0" + parseInt(d);
    } else {
        str = "" + parseInt(d);
    }
    return str;
}

function Show_cal(sYear, sMonth, sDay) {
    var Months_day = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31)
    var Weekday_name = new Array("일", "월", "화", "수", "목", "금", "토");
    var intThisYear = new Number(), intThisMonth = new Number(), intThisDay = new Number();
    $('minical').innerHTML = "";
    datToday = new Date();                                                    // 현재 날자 설정

    intThisYear = parseInt(sYear);
    intThisMonth = parseInt(sMonth);
    intThisDay = parseInt(sDay);

    if (intThisYear == 0) intThisYear = datToday.getFullYear();                // 값이 없을 경우
    if (intThisMonth == 0) intThisMonth = parseInt(datToday.getMonth())+1;    // 월 값은 실제값 보다 -1 한 값이 돼돌려 진다.
    if (intThisDay == 0) intThisDay = datToday.getDate();

    switch(intThisMonth) {
        case 1:
                intPrevYear = intThisYear -1;
                intPrevMonth = 12;
                intNextYear = intThisYear;
                intNextMonth = 2;
                break;
        case 12:
                intPrevYear = intThisYear;
                intPrevMonth = 11;
                intNextYear = intThisYear + 1;
                intNextMonth = 1;
                break;
        default:
                intPrevYear = intThisYear;
                intPrevMonth = parseInt(intThisMonth) - 1;
                intNextYear = intThisYear;
                intNextMonth = parseInt(intThisMonth) + 1;
                break;
    }

    NowThisYear = datToday.getFullYear();                                        // 현재 년
    NowThisMonth = datToday.getMonth()+1;                                        // 현재 월
    NowThisDay = datToday.getDate();                                            // 현재 일

    datFirstDay = new Date(intThisYear, intThisMonth-1, 1);                        // 현재 달의 1일로 날자 객체 생성(월은 0부터 11까지의 정수(1월부터 12월))
    intFirstWeekday = datFirstDay.getDay();                                        // 현재 달 1일의 요일을 구함 (0:일요일, 1:월요일)

    intSecondWeekday = intFirstWeekday;
    intThirdWeekday = intFirstWeekday;

    datThisDay = new Date(intThisYear, intThisMonth, intThisDay);                // 넘어온 값의 날자 생성
    intThisWeekday = datThisDay.getDay();                                        // 넘어온 날자의 주 요일

    varThisWeekday = Weekday_name[intThisWeekday];                                // 현재 요일 저장

    intPrintDay = 1                                                                // 달의 시작 일자
    secondPrintDay = 1
    thirdPrintDay = 1

    Stop_Flag = 0

    if ((intThisYear % 4)==0) {                                                    // 4년마다 1번이면 (사로나누어 떨어지면)
        if ((intThisYear % 100) == 0) {
            if ((intThisYear % 400) == 0) {
                Months_day[2] = 29;
            }
        } else {
            Months_day[2] = 29;
        }
    }
    intLastDay = Months_day[intThisMonth];                                        // 마지막 일자 구함
    Stop_flag = 0

    Cal_HTML = "<table width=\"150\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" onmouseover=\"doOver(event);\" onmouseout=\"doOut(event);\" style=\"font-size:8pt;font-family:Tahoma;\">"
            + "<tr align=\"center\"><td colspan=\"7\" nowrap=\"nowrap\" align=\"center\"><span title=\"이전달\" style=\"cursor:pointer;\" onclick=\"Show_cal("+intPrevYear+","+intPrevMonth+","+intThisDay+");\"><font color=\"Navy\">◀</font></span> "
            + "<b style=\"color:red\">"+get_Yearinfo(intThisYear,intThisMonth,intThisDay)+"년"+get_Monthinfo(intThisYear,intThisMonth,intThisDay)+"월</b>"
            + " <span title=\"다음달\" style=\"cursor:pointer;\" onclick='Show_cal("+intNextYear+","+intNextMonth+","+intThisDay+");'><font color=\"Navy\">▶</font></span></td></tr>"
            + "<tr align=\"center\" bgcolor=\"ThreedFace\" style=\"color:White;font-weight:bold;\"><td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>";

    for (intLoopWeek=1; intLoopWeek < 7; intLoopWeek++) {                        // 주단위 루프 시작, 최대 6주
        Cal_HTML += "<tr align=\"right\" bgcolor=\"white\">"
        for (intLoopDay=1; intLoopDay <= 7; intLoopDay++) {                        // 요일단위 루프 시작, 일요일 부터
            if (intThirdWeekday > 0) {                                            // 첫주 시작일이 1보다 크면
                Cal_HTML += "<td onclick=\"doClick(event);\">";
                intThirdWeekday--;
            } else {
                if (thirdPrintDay > intLastDay) {                                // 입력 날짝 월말보다 크다면
                    Cal_HTML += "<td onclick=\"doClick(event);\">";
                } else {                                                        // 입력날짜가 현재월에 해당 되면
                   Cal_HTML += "<td onclick=\"doClick(this);\" title=\""+intThisYear+day2(intThisMonth).toString()+day2(thirdPrintDay).toString()+"\" style=\"cursor:pointer;border:1px solid white;";
                    if (intThisYear == NowThisYear && intThisMonth==NowThisMonth && thirdPrintDay==intThisDay) {
                        Cal_HTML += "background-color:cyan;";
                    }

                    switch(intLoopDay) {
                        case 1:                                                    // 일요일이면 빨간 색으로
                            Cal_HTML += "color:red;"
                            break;
                        case 7:
                            Cal_HTML += "color:blue;"
                            break;
                        default:
                            Cal_HTML += "color:black;"
                            break;
                    }

                    Cal_HTML += "\">"+thirdPrintDay;

                }
                thirdPrintDay++;

                if (thirdPrintDay > intLastDay) {                                // 만약 날짜 값이 월말 값보다 크면 루프문 탈출
                    Stop_Flag = 1;
                }
            }
            Cal_HTML += "</td>";
        }
        Cal_HTML += "</tr>";
        if (Stop_Flag==1) break;
    }

    Cal_HTML += "<tr>";
    Cal_HTML += "<td><a href=\"#\" onclick=\"closeC(); return false;\">닫기</a></td>";
    Cal_HTML += "</TR>";
    Cal_HTML += "</TABLE>";

    $('minical').innerHTML = Cal_HTML;
}
function closeC() {
    $('minical').style.display='none';                                                // 화면에서 지움
    $('temp_minical').style.display='none';                                                // 화면에서 지움
}
function get_Yearinfo(year,month,day) {                                            // 년 정보를 콤보 박스로 표시

    datToday = new Date();

    var min = parseInt(year) - 100;
    var max = parseInt(datToday.getFullYear());

    var i = new Number();
    var str = new String();

    str = "<select onchange=\"Show_cal(this.value,"+month+","+day+");\" onmouseover=\"doOver(event);\">";
    for (i=min; i<=max; i++) {
        if (i == parseInt(year)) {
            str += "<option value=\""+i+"\" selected=\"selected\" onmouseover=\"doOver(event);\">"+i+"</option>";
        } else {
            str += "<option value=\""+i+"\" onmouseover=\"doOver(event);\">"+i+"</option>";
        }
    }
    str += "</select>";
    return str;
}


function get_Monthinfo(year,month,day) {                                        // 월 정보를 콤보 박스로 표시
    var i = new Number();
    var str = new String();


    str = "<select onchange=\"Show_cal("+year+",this.value,"+day+");\" onmouseover=\"doOver(event);\">";
    for (i=1; i<=12; i++) {
        if (i == parseInt(month)) {
            str += "<option value=\""+i+"\" selected=\"selected\" onmouseover=\"doOver(event);\">"+i+"</option>";
        } else {
            str += "<option value=\""+i+"\" onmouseover=\"doOver(event);\">"+i+"</option>";
        }
    }
    str += "</select>";
    return str;
}

function checkEvent(event) {
    if (!event) { //IE일 경우
      event = window.event;
      event.target = event.srcElement;
    }
    return event;
  }