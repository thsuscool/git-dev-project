<%@ page language="java" contentType="text/html;charset=utf-8"  pageEncoding="utf-8"%>
<%@ page import="kr.co.offton.jdf.cfg.ConfigManager"%>
<%
ConfigManager.getInstance();
String sidoCd = request.getParameter( "sidoCd" );
if( sidoCd == null ) sidoCd = "";

String sigunguCd = request.getParameter( "sigunguCd" );
if( sigunguCd == null ) sigunguCd = "";

String sigungu = request.getParameter( "sigungu" );
if( sigungu == null ) sigungu = "";

String admDrCd = request.getParameter( "admDrCd" );
if( admDrCd == null ) admDrCd = "";

String adminCd = "";

if( !sidoCd.equals("") && sigunguCd.equals("") ) {
  adminCd = sidoCd;
} else if( !sidoCd.equals("") && !sigunguCd.equals("") ) {
  adminCd = sigunguCd;
}
%>


<script type="text/javascript">
<!--
function MM_showHideLayers() { //v9.0
    var i,p,v,obj,args=MM_showHideLayers.arguments;
    for (i=0; i<(args.length-2); i+=3)
    with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
      if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
      obj.visibility=v; }
  }

function main_middle_box_second_mapbox_menu_click(data){
  document.getElementById('main_middle_box_second_mapbox_menu_01').src= "./images/main_middle_box_second_mapbox_menu_button_01.gif"
  document.getElementById('main_middle_box_second_mapbox_menu_02').src= "./images/main_middle_box_second_mapbox_menu_button_02.gif"
  document.getElementById('main_middle_box_second_mapbox_menu_03').src= "./images/main_middle_box_second_mapbox_menu_button_03.gif"

  if(data==1){document.getElementById('main_iframe').src="http://www.naver.com";}
  if(data==2){document.getElementById('main_iframe').src="http://www.daum.net";}
  if(data==3){document.getElementById('main_iframe').src="http://www.paran.com";}

document.getElementById('main_middle_box_second_mapbox_menu_0'+data+'').src= "./images/main_middle_box_second_mapbox_menu_button_0"+data+"_over.gif"
}

function main_middle_box_second_search(data){
  document.getElementById('main_middle_box_second_search_content_button_01').style.display="block";
  document.getElementById('main_middle_box_second_search_content_button_02').style.display="block";
  document.getElementById('main_middle_box_second_search_content_button_03').style.display="block";

  document.getElementById('main_middle_box_second_search_content_background_1').style.display="none";
  document.getElementById('main_middle_box_second_search_content_background_2').style.display="none";
  document.getElementById('main_middle_box_second_search_content_background_3').style.display="none";

  document.getElementById('main_middle_box_second_search_content_button_0'+data+'').style.display="none";
  document.getElementById('main_middle_box_second_search_content_background_'+data+'').style.display="block";
}

//행정구역코드
var cd1 = "<%= sidoCd %>";
var cd2 = "<%= sigunguCd %>";
var cd3 = "<%= admDrCd %>";
var adminCd = "<%= adminCd %>";

var searchAreaMode = 1;

function strUtilTrim(pm_sStr){
     return pm_sStr.replace(/^\s+|\s+$/g,"");
}

/**
 * xml parser
 * IE와 기타 브라우져들간의 파싱구분 및
 * 기타 브라우져의 xml 파일형태와 xml String 형태의 처리 구분
 */
function xmlParse(xml) {
    var dom;
    try {
        if(window.ActiveXObject){
            //IE일 경우 xml 파일 및 xml String 형태의 parsing 처리가 동일하다.
            dom = new ActiveXObject("Microsoft.XMLDOM");
            dom.async = false;
            dom.loadXML(xml);
        }else{
            //기타 브라우져의 xml 파일형태일경우
            if(xml.lastIndexOf('.xml') > -1) {
                dom = document.implementation.createDocument("", "", null);
                dom.load(xml);
            }else {
                //xml String 형태일경우
                var parser = new DOMParser();
                dom = parser.parseFromString(xml, "text/xml");
            }
        }
    } catch (error) {
        alert("Browser does not support XML parsing.\n" + "error message : "+error.message);
    }
    return dom;
}

// 기존 리스트 삭제
function deleteSelectBoxList(tbox)
{
  for (j = 1; j < tbox.options.length; j++)
  {
    tbox.options[j] = null;
  }
  tbox.options.length = 1;
}

// 구 리스트 쿼리 및 리스트 박스 생성
function secondItemList(fBox, sBox, dBox)
{
  if(fBox.options[fBox.selectedIndex].value != "")
  {
    var im_oStringUtil = new StringUtil();
    var url = "/contents/search/getAjaxData.jsp?protId=Sido&sidoCode=" + fBox.options[fBox.selectedIndex].value;

    var selectElement = document.getElementById(sBox);

    // 기존  구 리스트 삭제
    deleteSelectBoxList(selectElement);
    // 기존  동 리스트 삭제
    deleteSelectBoxList(dBox);

    return sendRequest(callBackChangeSido, '', 'GET', url, false, true);
  }
}

// 동 리스트 쿼리 및 리스트 박스 생성
function thirdItemList(fBox, sBox, tBox)
{
  if(sBox.options[sBox.selectedIndex].value != "" && fBox.options[fBox.selectedIndex].value != "")
  {
    var im_oStringUtil = new StringUtil();
    var url = "/contents/search/getAjaxData.jsp?protId=Sigungu&sidoCode=" + fBox.options[fBox.selectedIndex].value + "&guCode=" + sBox.options[sBox.selectedIndex].value;

    var selectElement = document.getElementById(tBox);

    // 기존  동 리스트 삭제
    deleteSelectBoxList(selectElement);

    return sendRequest(callBackChangeSigungu, '', 'GET', url, false, true);
  }
}

function callBackChangeSido(oj) {
    try {
        var xmlTxt = strUtilTrim(oj.responseText);	//ajax요청 후 return된 xml형태의 text

        //responseText의 개행문자와 tab 제거
        while(xmlTxt.indexOf('\n') > -1 || xmlTxt.indexOf('\t') > -1) {
            xmlTxt = xmlTxt.replace('\n', '').replace('\t', '');
        }
        var lm_oXML    = xmlParse(xmlTxt);	//xml parsing - parsing 후 document의 object와 같이 접근할수 있음(ex : lm_oXML.getElementsByTagName('result'))
        var lm_sResult = lm_oXML.documentElement.firstChild;

        if ( searchAreaMode == 1 )
        var selectElement = document.getElementById('guSelectBox');
        else if ( searchAreaMode == 2 )
        var selectElement = document.getElementById('guSelectBox2');
        else
        var selectElement = document.getElementById('guSelectBox3');
        var lm_sResultS = lm_sResult.nextSibling;

        for(i = 0; i < lm_sResult.nodeValue; i++) {

          selectElement.options[i] = new Option(strUtilTrim(lm_sResultS.getAttribute("text")));
          if (i==0) {
            selectElement.options[i].value = "";
          } else {
            selectElement.options[i].value = lm_sResultS.getAttribute("value");
          }
          if( cd2 == selectElement.options[i].value ) {
             selectElement.options[i].selected = true;
          }
          lm_sResultS = lm_sResultS.nextSibling;
        }
    }catch(e){
        alert('지역조회 시 오류가 발생하였습니다.\n 오류내용 : '+e.message);
    }
}

function callBackChangeSigungu(oj) {
    try {
        if ( searchAreaMode == 1 )
          var sidoCd = document.getElementById('siDoSelectBox');
        else if ( searchAreaMode == 2 )
          var sidoCd = document.getElementById('siDoSelectBox2');
        else
          var sidoCd = document.getElementById('siDoSelectBox3');
        if ( searchAreaMode == 1 )
          var sigunguCd = document.getElementById('guSelectBox');
        else if ( searchAreaMode == 2 )
          var sigunguCd = document.getElementById('guSelectBox2');
        else
          var sigunguCd = document.getElementById('guSelectBox3');

        var xmlTxt = strUtilTrim(oj.responseText);	//ajax요청 후 return된 xml형태의 text

        //responseText의 개행문자와 tab 제거
        while(xmlTxt.indexOf('\n') > -1 || xmlTxt.indexOf('\t') > -1) {
            xmlTxt = xmlTxt.replace('\n', '').replace('\t', '');
        }
        var lm_oXML = xmlParse(xmlTxt);
        var lm_sResult = lm_oXML.documentElement.firstChild;

        if ( searchAreaMode == 1 )
          var selectElement = document.getElementById('dongSelectBox');
        else if ( searchAreaMode == 2 )
          var selectElement = document.getElementById('dongSelectBox2');
        else
          var selectElement = document.getElementById('dongSelectBox3');
        var lm_sResultS = lm_sResult.nextSibling;

        // 기존  동 리스트 삭제
        deleteSelectBoxList(selectElement);

        for(i = 0; i < lm_sResult.nodeValue; i++) {

          selectElement.options[i] = new Option(strUtilTrim(lm_sResultS.getAttribute("text")));
          if (i==0) {
            selectElement.options[i].value = "";
          } else {
            selectElement.options[i].value = lm_sResultS.getAttribute("value");

          }

          if( cd3 == selectElement.options[i].value ) {
             selectElement.options[i].selected = true;
          }
          lm_sResultS = lm_sResultS.nextSibling;
        }
    }catch(e){
        alert('지역조회 시 오류가 발생하였습니다.\n 오류내용 : '+e.message);
    }
}

function statItem(rBox)
{
  if(rBox=="SecondType"){
    var qBox= document.getElementById("query").options[document.getElementById("query").selectedIndex].text;
    var parendID= document.getElementById("query").options[document.getElementById("query").selectedIndex].value;
    var nBox ="snd1Type";
    var title="title"
  }
  if(rBox=="SecondType2"){
    var qBox= document.getElementById("query2").options[document.getElementById("query2").selectedIndex].text;
    var parendID= document.getElementById("query2").options[document.getElementById("query2").selectedIndex].value;
    var nBox ="snd1Type2";
    var title="title2"
  }
  if(qBox!= "")
  {
    var im_oStringUtil = new StringUtil();
    var lm_sURL ="<%= ConfigManager.getStatisticsResourceURL()%>/statistics/item/stepItemValue.jsp?parentidentifier="+parendID+"&gubun=step2&userid=Guest"
    //alert(lm_sURL);

    var loadRequest = sendHttpRequest("GET", lm_sURL);
    var lm_oXML = parse(im_oStringUtil.trim(loadRequest.responseText));

    var lm_sResult = lm_oXML.getElementsByTagName("record");

    var selectElement = document.getElementById(rBox);

    // 기존 리스트 삭제
    deleteSelectBoxList(selectElement);

    //콤보박스 만들기
    var inner_text = document.getElementById(nBox);
    var label_text,data_value;
    var i_text = "<select name=\""+rBox+"\" id=\""+rBox+"\" class\"inp w130\" onchange=\"statSecondType('"+title+"')\" ><option>선택<\/oprion>";
    for (i = 0; i < lm_sResult.length; i++)
    {
      var childlNode=lm_sResult[i].childNodes[0];
      var childlNode2=lm_sResult[i].childNodes[1];

      if(childlNode.tagName == "label"){
        var label_text = childlNode.childNodes[0].nodeValue;
      }
      if(childlNode2.tagName == "data"){
        var data_value =childlNode2.childNodes[0].nodeValue;
      }

      i_text +="<option value="+data_value+">"+label_text+"<\/option>";
    }

    i_text +="<\/select>";

    inner_text.innerHTML = i_text;
  }
}

// 통계 3단계 리스트 쿼리 및 리스트 박스 생성
function statSecondType(rBox)
{
  if(rBox=="title"){
    var qBox= document.getElementById("query").options[document.getElementById("query").selectedIndex].text;
    var parendID= document.getElementById("SecondType").options[document.getElementById("SecondType").selectedIndex].value;
    var nBox ="snd2Type";
  }
  if(rBox=="title2"){
    var qBox= document.getElementById("query2").options[document.getElementById("query2").selectedIndex].text;
    var parendID= document.getElementById("SecondType2").options[document.getElementById("SecondType2").selectedIndex].value;
    var nBox ="snd2Type2";
  }

  if(rBox!= "")
  {
    var im_oStringUtil = new StringUtil();
    var lm_sURL ="<%= ConfigManager.getStatisticsResourceURL()%>/statistics/item/stepItemValue.jsp?parentidentifier="+parendID+"&gubun=step3&userid=Guest"

    var loadRequest = sendHttpRequest("GET", lm_sURL);
    var lm_oXML = parse(im_oStringUtil.trim(loadRequest.responseText));

    var lm_sResult = lm_oXML.getElementsByTagName("record");

    var selectElement = document.getElementById(rBox);

    // 기존 리스트 삭제
    deleteSelectBoxList(selectElement);

    //콤보박스 만들기
    var inner_text = document.getElementById(nBox);

    var label_text,data_value;
    var i_text = "<select name=\""+rBox+"\" id=\""+rBox+"\" class=\"inp w130\" onchange=\"setCurrentType(siDoSelectBox, guSelectBox,dongSelectBox)\"><option>선택<\/oprion>";
    for (i = 0; i < lm_sResult.length; i++)
    {
      var childlNode=lm_sResult[i].childNodes[0];
      var childlNode2=lm_sResult[i].childNodes[1];

      if(childlNode.tagName == "label"){
        var label_text = childlNode.childNodes[0].nodeValue;
      }

      if(childlNode2.tagName == "data"){
        var data_value =childlNode2.childNodes[0].nodeValue;
      }

      i_text +="<option value="+data_value+">"+label_text+"<\/option>";
    }

    i_text +="<\/select>";

    inner_text.innerHTML = i_text;
  }
}

// 통계 2단계 리스트 쿼리 및 리스트 박스 생성
// 검색식
var hangeongCode, Title, type, Query,fullTitle,hangeongTitle,sndTiltle ;

function setCurrentType(fBox, sBox, tBox)
{
  hangeongCode = tBox.options[tBox.selectedIndex].value ;
  hangeongTitle = fBox.options[fBox.selectedIndex].text+" " +sBox.options[sBox.selectedIndex].text+" "+tBox.options[tBox.selectedIndex].text ;

  if(fBox.id=="siDoSelectBox"){
     Title=document.getElementById("title").options[document.getElementById("title").selectedIndex].text;
     sndTiltle=document.getElementById("SecondType").options[document.getElementById("SecondType").selectedIndex].text;
     Query=document.getElementById("query").options[document.getElementById("query").selectedIndex].text;
  }
  if(fBox.id=="siDoSelectBox2"){
     Title=document.getElementById("title2").options[document.getElementById("title2").selectedIndex].text;
     sndTiltle=document.getElementById("SecondType2").options[document.getElementById("SecondType2").selectedIndex].text;
     Query=document.getElementById("query2").options[document.getElementById("query2").selectedIndex].text;
  }

  fullTitle=Query+" > "+sndTiltle+" > "+Title;
}

function goMap()
{
  //setCurrentType(siDoSelectBox, guSelectBox, dongSelectBox);

   var sName=document.getElementById("siDoSelectBox").options[document.getElementById("siDoSelectBox").selectedIndex].text;
   var gName=document.getElementById("guSelectBox").options[document.getElementById("guSelectBox").selectedIndex].text;
   var dName=document.getElementById("dongSelectBox").options[document.getElementById("dongSelectBox").selectedIndex].text;
   var dCode=document.getElementById("dongSelectBox").options[document.getElementById("dongSelectBox").selectedIndex].value;

   var qCode=document.getElementById("title").options[document.getElementById("title").selectedIndex].value; //query
   var qName=document.getElementById("title").options[document.getElementById("title").selectedIndex].text; //쿼리명
  /*
  if(sName==""){
    alert("광역시/도을 선택하여 주십시오.");
    return;
   }
   if(gName==""){
    alert("시/군/구를 선택하여 주십시오.");
    return;
   }
   */
   if(dCode==""){
    alert("행정구역을 선택하여 주십시오.");
    return;
   }

   if(qName==""){
     alert("통계 항목을 선택하여 주십시오");
     return;
   }

  hangeongTitle =sName+" "+gName+" "+dName;

  var url="<%= ConfigManager.getStatisticsResourceURL()%>/statistics/index.jsp?";
    url +=  "hangeongTitle="+hangeongTitle;
    url +=  "&hangeongCode="+dCode;
    url +=  "&title="+qName;
    url +=  "&type=1&query="+qCode;
    url +=  "&fullTitle="+fullTitle;
  //alert(url);
  openwin("statNav",url,1024,768,"");
}

function hangeongSearchMap()
{
  setCurrentType(siDoSelectBox, guSelectBox, dongSelectBox);
   var siName=document.getElementById("siDoSelectBox2").value;
   var guName=document.getElementById("guSelectBox2").value;
   var dongName=document.getElementById("dongSelectBox2").value;
   var tName=document.getElementById("title2").options[document.getElementById("title2").selectedIndex].value;
   var qName=document.getElementById("query2").options[document.getElementById("query2").selectedIndex].value;
/*
   if(siName==""){
     alert("광역시/도을 선택하여 주십시오.");
     return;
     }

     if(guName==""){
     alert("시/군/구를 선택하여 주십시오.");
    return;
   }
 */
   if(dongName==""){
    alert("행정구역을 선택하여 주십시오.");
    return;
   }

   if(tName==""){
     alert("통계 항목을 선택하여 주십시오");
     return;
   }
  openwin("statNav","<%= ConfigManager.getStatisticsResourceURL()%>/statistics/index.jsp?"+"userInitAreaMode=KOSIS"+"&hangeongTitle="+hangeongTitle+"&hangeongCode="+hangeongCode+"&title="+Title+"&type=1&query="+Query+"&fullTitle="+fullTitle+"",1024,768,"");
}

function comSearchMap()
{
   var cName=document.getElementById("cName").value;
   var doName=document.getElementById("dongSelectBox3").value;
   var siName=document.getElementById("siDoSelectBox3").value;
   var guName=document.getElementById("guSelectBox3").value;
   /*
   if(siName==""){
    alert("광역시/도을 선택하여 주십시오.");
    return;
   }
   if(guName==""){
    alert("시/군/구를 선택하여 주십시오.");
    return;
   }
   */
   if(doName==""){
    alert("행정구역을 선택하여 주십시오.");
    return;
   }

   if(cName==""){
     alert("사업체명을 입력하여 주십시오");
     return;
   }
   //window.top.location="http://123.212.190.115/contents/search/search_03.jsp?hangeongCode="+hangeongCode+"&cName="+cName+"&type=1&siName="+siName+"&guName="+guName+"&doName="+doName;
   window.top.location="/contents/search/search_03.jsp?hangeongCode="+hangeongCode+"&cName="+cName+"&type=1&siName="+siName+"&guName="+guName+"&doName="+doName;
}

function goSearch(num) {
  var dBox="";
  var gBox="";
  var sBox="";
  var hTitle="";
  var listID="";
  var listNm="";

  if(num==1){
    hTitle = "hangeongTitle";
    dBox="dongSelectBox";
    sBox="siDoSelectBox";
    gBox="guSelectBox";
  }

  if(num==2){
    hTitle = "hangeongTitle2" ;
    dBox="dongSelectBox2";
    sBox="siDoSelectBox2";
    gBox="guSelectBox2";
    listID =document.getElementById("srvcListBox").options[document.getElementById("srvcListBox").selectedIndex].value;
    listNm =document.getElementById("srvcListBox").options[document.getElementById("srvcListBox").selectedIndex].text;
  }

  //alert(dBox+":"+hTitle);

  hangeongCode=document.getElementById(""+dBox+"").options[document.getElementById(""+dBox+"").selectedIndex].value;

var dName =document.getElementById(""+dBox+"").options[document.getElementById(""+dBox+"").selectedIndex].text;
var gName =document.getElementById(""+gBox+"").options[document.getElementById(""+gBox+"").selectedIndex].text;
var sName =document.getElementById(""+sBox+"").options[document.getElementById(""+sBox+"").selectedIndex].text;

document.getElementById(""+hTitle+"").value = sName+" "+gName+" "+dName;

hangeongTitle=document.getElementById(""+hTitle+"").value;
//alert(hangeongTitle);
  if(hangeongCode=="")
  {
    alert("행정구역을 선택하여 주십시오.");
    return;
  }

  if(hangeongTitle=="") {

    alert("통계타이틀을 입력하져주십시오.");
    return;
    }
//alert(listID);
//alert(hangeongCode);

    var url = "/contents/search/search_frame0"+num+".jsp?hangeongCode="+hangeongCode+"&hangeongTitle="+hangeongTitle+"&listID="+listID+"&listNm="+listNm;
// alert(url);

  if(num==1){
    var url = "/contents/search/search_frame0"+num+".jsp?hangeongCode="+hangeongCode+"&hangeongTitle="+hangeongTitle; // 임시 수정
    }

    var height="447" ;
    var width="686";
    var winx=(screen.width -width)/2;
    var winy=(screen.height-height)/2;
    var settings ="dialogHeight: "+height+"px;";
    settings+="dialogWidth:  "+width+"px;";
    settings+="dialogTop:  "+winy+";";
    settings+="dialogLeft:   "+winx+";";
    settings+="scroll: no  ";
    settings+="resizable: no ";
    settings+="help:    no ";
    settings+="status:    no ";
    settings+="unadorned: yes";

    window.showModalDialog(url,"search", settings);
}


//-->
</script>

