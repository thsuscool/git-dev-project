<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%> 

<%
  String leftMenu="shortcut";



  GeneralBroker broker = null;
  DbManager dmg = null;
  RecordModel rm = null;
  RecordModel rm1 = null;
  RecordModel rm2 = null;

  String sgis_census_id = "";
  String sgis_census_name = "";
  String sgis_census_data_id = "";
  String sgis_census_data_name = "";
  String sgis_census_req_company = "";
  
  String sgis_census_req_email = "";
  String sgis_census_req_sosok = "";
  String sgis_census_req_mokjuk = "";
  String sgis_census_req_kwaje = "";
  
  String sgis_census_req_tel = "";
  String sgis_census_req_goal = "";
  String sgis_census_req_file = "";
  String sgis_census_req_status = "";
  String sgis_census_req_reject = "";
  String sgis_census_location = "";
  String sgis_census_req_app_date = "";
  
  String sgis_census_req_year = "";
  String sgis_census_sido_id = "";
  String sgis_census_sido_nm = "";
  String sgis_census_sigungu_id = "";
  String sgis_census_sigungu_nm = "";
  
  String years = "";
  String cnt = "0";

  //CODE
  String r_sgis_census_id = "";
  String r_sgis_census_name = "";
  
  int count = 0;
  
  //if(StringUtil.isEmpty(sc_company_name)) sc_company_name = "";

  /**************************************/
  /* 조회일 경우 */
  /**************************************/
  if(lData.getString("aT").equals("RET")) {
    try {

      broker = new GeneralBroker("ceaa00");
      lData.setString("PARAM", "CENSUS_APPLY_INFO");
      rm = broker.getList(lData);

              if(rm.next()) {
                sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
                sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
                sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
                sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
                sgis_census_req_company = StringUtil.verify((String)rm.get("sgis_census_req_company"));
                sgis_census_req_company = sgis_census_req_company.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
                
                sgis_census_req_email = StringUtil.verify((String)rm.get("sgis_census_req_email"));
                sgis_census_req_sosok = StringUtil.verify((String)rm.get("sgis_census_req_sosok"));
                sgis_census_req_mokjuk = StringUtil.verify((String)rm.get("sgis_census_req_mokjuk"));
                sgis_census_req_kwaje = StringUtil.verify((String)rm.get("sgis_census_req_kwaje"));
                
                sgis_census_req_tel = StringUtil.verify((String)rm.get("sgis_census_req_tel"));
                sgis_census_req_goal = StringUtil.verify((String)rm.get("sgis_census_req_goal"));
                sgis_census_req_goal = sgis_census_req_goal.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
                sgis_census_req_file = StringUtil.verify((String)rm.get("sgis_census_req_file"));
                sgis_census_location = StringUtil.verify((String)rm.get("sgis_census_location"));
                if(sgis_census_req_file.equals("null")) sgis_census_req_file="";
                sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));	//A : 승인 , B : 반려
                sgis_census_req_reject = StringUtil.verify((String)rm.get("sgis_census_req_reject"));
                sgis_census_req_reject = sgis_census_req_reject.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
                sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
                
                sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
                sgis_census_sido_id = StringUtil.verify((String)rm.get("sgis_census_req_sido"));
                sgis_census_sido_nm = StringUtil.verify((String)rm.get("sido_nm"));
                sgis_census_sigungu_id = StringUtil.verify((String)rm.get("sgis_census_req_sigungu"));
                sgis_census_sigungu_nm = StringUtil.verify((String)rm.get("sigungu_nm"));
                
              }
				// 센서스 신청 자료 개수
				lData.setString("PARAM", "CENSUS_REQ_DATA_CNT");
				rm2 = broker.getList(lData);
				if(rm2.next()) cnt = StringUtil.verify((String)rm2.get("cnt"));
              

    } catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    }
  }

  //승인 또는 반려인경우 수정불가
  String tag="";
  if(sgis_census_req_status.equals("A") || sgis_census_req_status.equals("B")) {
    tag = "readonly=\"readonly\"";
  }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>센서스 공간통계 자료신청:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/quick/style.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/main/global.css" />
<link rel="stylesheet" type="text/css" href="/contents/inc/style.css" />
<script type="text/javascript" language="javascript" src="/contents/scripts/quickLink.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/divwriter.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/main/jquery-1.5.1.min.js"></script>

<script type="text/javascript" language="javascript">

function selectDetailData(val, val2, val3, val4) {
	document.getElementById(val).src ="shortcut_05_03_02.jsp?sgis_census_id="+document.getElementById(val2).value+"&sgis_census_data_name="+val+"&sgis_census_year="+val3+"&sgis_census_data_id="+val4;
   //detailMenuIfr.location.href ="shortcut_05_03_02.jsp?sgis_census_id="+document.censusFm.sgis_census_id.value;
   //resetData();	//관련하위메뉴들 reset
	if(val4 == ''){
		resetData(val3);	//관련하위메뉴들 reset
	}
   //openSendStatus();
}

function selectDetailData2(val, val2, val3, val4) {
	
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_data.jsp",
		data:{"sgis_census_id": document.getElementById(val2).value, "sgis_census_data_name": val,
			  "sgis_census_year": val3, "sgis_census_data_id":val4},
		success:function(data){
			$('#option_data').html(data);//alert(data);
		},
		error:function(data) {
			
		}
	});
   
}


//년도 선택
function yearClose() {
  var yd = document.getElementById("yearDiv");
  yd.style.display = "none";
}

var ison="0";


//연도 콤보박스
function yearView2(val1,val2,val3,val4,val5) {

		jQuery.ajax({
			type:"POST",
			url: "gsks_01_04_03_year.jsp",
			data:{"sgis_census_id": document.getElementById(val1).value, "sgis_census_data_id": document.getElementById(val2).value,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3,
				  "inUse": val4, "years": val5},
			success:function(data){
				
				$('#option_year').html(data);//alert(data);
			},
			error:function(data) {
				
			}
		});
}


//지역표시 및 해당 년도 리스트 표시
function locationChanged(val) {
	var fm=document.censusFm;
	<% if(!lData.getString("aT").equals("RET")) {%>
	var num = eval(document.getElementById(val).name+".document.censusFm.sgis_census_data_id.selectedIndex");
	document.getElementsByName(val)[0].value = eval(document.getElementById(val).name+".document.censusFm.sgis_census_data_id.value");
	//eval("fm."+val+".value") = eval(document.getElementById(val).name+".document.censusFm.sgis_census_data_id.value");
	//fm.sgis_census_data_id.value = detailMenuIfr.document.censusFm.sgis_census_data_id.value;
	<%}else{%>
	var num = -1;
	<%}%>

}


//관련자료 reset
function resetData(val3) {
	document.getElementById(val3).value = "";	//연도 reset
  //document.censusFm.sgis_census_location.value = "";	//지역 reset
  //document.censusFm.sgis_census_year.value = "";	//연도 reset
  //yearIfr.location.href="shortcut_05_03_03.jsp";
}

function applyClicked() {
	var fm=document.censusFm;
	var myTable = document.getElementById("sgis_census_table");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	var len = myTbody.rows.length;
  //var cfm = yearIfr.document.censusFm;

  //var tel = fm.sgis_census_req_tel.value.replace("-","");
  //tel = tel.replace("-","");

  if(fm.sgis_census_req_tel_1.value.trim() == "" || fm.sgis_census_req_tel_2.value.trim() == "" || fm.sgis_census_req_tel_3.value.trim() == "") {
    alert("연락처를 입력하세요.");
    fm.sgis_census_req_tel_1.focus();
    return false;
  } else 	if(fm.sgis_census_req_company.value.trim() == "") {
    alert("회사명을 입력하세요.");
    fm.sgis_census_req_company.focus();
    return false;
  } else if(len < 1) {
			alert("자료를 하나이상 선택하세요.");
			addTable();
			return false;
  } 
  
  	
  	
  	if(document.getElementById("sgis_census_req_email").value == "") {
		alert("메일주소를 입력하세요.");
		document.getElementById("sgis_census_req_email").focus();
		return false;
	}
  	
  	if(document.getElementById("sgis_census_req_sosok").value == "") {
		alert("소속구분을 선택하세요.");
		document.getElementById("sgis_census_req_sosok").focus();
		return false;
	}
  	if(document.getElementById("sgis_census_req_mokjuk").value == "") {
		alert("요청목적을 선택하세요.");
		document.getElementById("sgis_census_req_mokjuk").focus();
		return false;
	}
  	if(document.getElementById("sgis_census_req_kwaje").value == "") {
		alert("수행과제를 입력하세요.");
		document.getElementById("sgis_census_req_kwaje").focus();
		return false;
	}
  	
  	
  	
	 
	if(fm.sgis_census_req_goal.value.trim() == "") {
	  alert("활용목적을 입력하세요.");
	  fm.sgis_census_req_goal.focus();
	  return false;
	
	} else if (getLength(fm.sgis_census_req_goal.value) > 500) {
	  alert("입력가능한 글자수는 한글 250자, 영문 500자로 제한되어 있습니다.");
	  fm.sgis_census_req_goal.focus();
	  return false;
	}
    
	
	//if(!lData.getString("aT").equals("RET")) {
	  	if(fm.census_file.value.trim() == ""){
			alert("첨부파일은 필수입니다.");
			return false;
	  	}
	//}
  
	/*
   //년도 사용처리
   var cnt = cfm.inUse.length;
   if(cnt == undefined) {
     cfm.inUse.value = "Y";
     fm.inUse.value = "Y";
     fm.years.value = cfm.years.value;
   }

   for(i=0; i < cnt; i++) {
     if(cfm.yearchk[i].checked) cfm.inUse[i].value="Y";
     else cfm.inUse[i].value="N";

     fm.inUse.value += cfm.inUse[i].value + ",";
     fm.years.value += cfm.years[i].value + ",";
   }
	*/

	/*
	var sgis_census_data_id = "";
	for(var j= 1; j <= len; j++){
		if (j==1) {
			sgis_census_data_id = eval(document.censusFm.getElementsByTagName("iframe")[j-1].name+".document.censusFm.sgis_census_data_id.value");
	 	}else{
		 	sgis_census_data_id = sgis_census_data_id + "-" +eval(document.censusFm.getElementsByTagName("iframe")[j-1].name+".document.censusFm.sgis_census_data_id.value");
	 	} 
	 	fm.sgis_census_data_id.value= sgis_census_data_id;
	}
	*/
	
	//수정일 경우
	 if(fm.aT.value == "RET") {
	    var c = confirm("저장하시겠습니까?");
	    if(c == 1) {
	      fm.aT.value = "RET";
	      if(fm.census_file.value != ""){
	      	fm.old_census_file.value = "";
	      }
	      fm.action="/contents/shortcut/shortcut_05_03_apply.jsp";
	      fm.submit();
	    }else{
	        return false;
	    }
	   
	 //신청일 경우
	 } else {
		if(document.getElementById("concur").checked){
		    var c = confirm("신청하시겠습니까?");
		    if(c == 1) {
		      fm.aT.value = "INS";
		      fm.action="/contents/shortcut/shortcut_05_03_apply.jsp";
		      //fm.submit();
		      return true;
		    }else{
		        return false;
		    }
		}else{
			alert("제출 동의에 동의하셔야 신청하실 수 있습니다.");
			return false;
		}
	 }
}

function census_list(retUrl) {

  if(retUrl != '' && retUrl) {
    location.href = retUrl
  }else {
    location.href = "shortcut_05_03_01.jsp";
  }
}

function chkNumber(elem) {

  if(!elem.value.isInteger() && elem.value != '') {
    alert("숫자만 입력가능합니다.");
    elem.value = "";
    return;
  }
}
function len_chk2(len){
  var fm=document.censusFm.sgis_census_req_goal;
    if(getLength(fm.value) > len ){
       alert("입력가능한 글자수는 한글 "+len/2+"자, 영문 " +len+ "자로 제한되어 있습니다.")
       fm.value = fm.value.substring(0, len / 2);
       fm.focus();
    }
}
// 2010.2.10

var idx = 9999;
//자료선택추가
function addTable(){
	
	//alert( jQuery('#sgis_census_id1').val() );
	if ( jQuery('#sgis_census_id1').val() == "") {
		alert("자료구분을 선택하세요.");
		jQuery('#sgis_census_id1').focus();
		return false;
	} 
	
	if ( jQuery('#sgis_census_data_id1').val() == "") {
		alert("대상자료명을 선택하세요.");
		return false;
	}

	if ( jQuery('#sgis_census_year1').val() == "") {
		alert("년도를 선택하세요. \n\n년도가 나오지 않을 경우 데이터가 \n제공되지 않으므로 신청하실 수 없습니다.");
		return false;
	}

	if ( jQuery('#sgis_census_sido1').val() == "") {
		alert("시도를 선택하세요.");
		return false;
	}

	if ( jQuery('#sgis_census_sigungu1').val() == "") {
		alert("시군구를 선택하세요.");
		return false;
	}
	
	var myTable = document.getElementById("sgis_census_table");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	
	
	//idx = (myTbody.rows.length)+1;
	idx++;
	
	var row = document.createElement("tr");
	
	var cell = document.createElement("td");
	//cell.setAttribute("rowSpan", "2");
	var input;
	var iframeName = "detailMenuIfr"+idx;
	var iframeId = "sgis_census_data_id"+idx;
	var selectId = "sgis_census_id"+idx;
	var yearId = "sgis_census_year"+idx;
	var inUseId = "inUse"+idx;
	var yearsId = "years"+idx;
	
	try{
		input = document.createElement("<input type='checkbox' name='cbox' id='a"+idx+"' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "checkbox");
		input.setAttribute("name", "cbox");
		input.setAttribute("id", "a"+idx);
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	
	
	//============================== 시작 자료구분 ====================================
	cell = document.createElement("td");
	cell.setAttribute("class","tl ");
	cell.setAttribute("className","tl ");

	try{
		//input = document.createElement("<select name='sgis_census_id' id='"+selectId+"' class='w40' title='자료구분' onchange='selectDetailData2(\""+iframeId+"\",\""+selectId+"\",\""+yearId+"\",\"\")'>");
		input = document.createTextNode(document.censusFm.sgis_census_id.options[document.censusFm.sgis_census_id.selectedIndex].text);
		
	}catch(e){
		/*
		input = document.createElement("select");
		input.setAttribute("name", "sgis_census_id");
		input.setAttribute("id", selectId);
		input.setAttribute("title", "자료구분");
		input.setAttribute("class", "w40");
		input.onchange=function(){selectDetailData2(iframeId,selectId,yearId,'')};
		*/
		input = document.createTextNode(document.censusFm.sgis_census_id.options[document.censusFm.sgis_census_id.selectedIndex].text);
	}
	
	cell.appendChild(input);
	
	try{
		input = document.createElement("<input type='hidden' name='sgis_census_id_new' id='sgis_census_id" + idx + "' value='" + document.censusFm.sgis_census_id.options[document.censusFm.sgis_census_id.selectedIndex].value + "' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "sgis_census_id_new");
		input.setAttribute("id", "sgis_census_id"+idx);
		input.setAttribute("value", document.censusFm.sgis_census_id.options[document.censusFm.sgis_census_id.selectedIndex].value);
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	//============================== 끝 자료구분 ====================================

		
	//============================== 시작 대상자료명 ====================================
	cell = document.createElement("td");
	cell.setAttribute("class","tl ");
	cell.setAttribute("className","tl ");

	try{
		input = document.createTextNode(document.censusFm.sgis_census_data_id.options[document.censusFm.sgis_census_data_id.selectedIndex].text);
		
	}catch(e){
		input = document.createTextNode(document.censusFm.sgis_census_data_id.options[document.censusFm.sgis_census_data_id.selectedIndex].text);
	}
	
	cell.appendChild(input);
	
	try{
		input = document.createElement("<input type='hidden' name='sgis_census_data_id_new' id='sgis_census_data_id" + idx + "' value='" + document.censusFm.sgis_census_data_id.options[document.censusFm.sgis_census_data_id.selectedIndex].value + "' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "sgis_census_data_id_new");
		input.setAttribute("id", "sgis_census_data_id"+idx);
		input.setAttribute("value", document.censusFm.sgis_census_data_id.options[document.censusFm.sgis_census_data_id.selectedIndex].value);
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	//============================== 끝 대상자료명 ====================================
	
	// ================= 시작 년도  ===================
	cell = document.createElement("td");
	cell.setAttribute("class","tl ");
	cell.setAttribute("className","tl ");

	try{
		input = document.createTextNode(document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].text);
		
	}catch(e){
		input = document.createTextNode(document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].text);
	}
	
	cell.appendChild(input);
	
	try{
		input = document.createElement("<input type='hidden' name='sgis_census_year_id_new' id='sgis_census_year_id" + idx + "' value='" + document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].value + "' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "sgis_census_year_id_new");
		input.setAttribute("id", "sgis_census_year_id"+idx);
		input.setAttribute("value", document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].value);
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	// ================= 끝 년도   ===================
	
		
	// ================= 시도 td 시작 ===================
	cell = document.createElement("td");
	cell.setAttribute("class","tl ");
	cell.setAttribute("className","tl ");

	try{
		input = document.createTextNode(document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].text);
		
	}catch(e){
		input = document.createTextNode(document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].text);
	}
	
	cell.appendChild(input);
	
	try{
		input = document.createElement("<input type='hidden' name='sgis_census_sido_id_new' id='sgis_census_sido_id" + idx + "' value='" + 
										document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].value + "' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "sgis_census_sido_id_new");
		input.setAttribute("id", "sgis_census_sido_id"+idx);
		input.setAttribute("value", document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].value);
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	// ================= 시도 td 끝 ===================


	// ================= 시군구 td 시작 ===================
	cell = document.createElement("td");
	cell.setAttribute("class","tl ");
	cell.setAttribute("className","tl ");

	try{
		input = document.createTextNode(document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].text);
		
	}catch(e){
		input = document.createTextNode(document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].text);
	}
	
	cell.appendChild(input);
	
	try{
		input = document.createElement("<input type='hidden' name='sgis_census_sigungu_id_new' id='sgis_census_sigungu_id" + idx + "' value='" + 
										document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].value + "' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "sgis_census_sigungu_id_new");
		input.setAttribute("id", "sgis_census_sigungu_id"+idx);
		input.setAttribute("value", document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].value);
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	// ================= 시군구 td 끝 ===================
		
	// ================= 추가/삭제 시작 ===================
	cell = document.createElement("td");
	cell.setAttribute("class","tl t_end");
	cell.setAttribute("className","tl t_end");

	
	try{
		input = document.createElement("<img src='/contents/images/button_delete2.gif' style='cursor:hand;' alt='삭제' onclick=\"document.getElementById('a" + idx + "').checked = true; delTable(); return false;\" />");
		
		
	}catch(e){
		
		input = document.createElement("img");
		input.setAttribute("src", "/contents/images/button_delete2.gif");
		input.setAttribute("alt", "삭제");
		input.setAttribute("style", "cursor:hand");
		input.setAttribute("onclick", "document.getElementById('a" + idx + "').checked = true; delTable(); return false;");
		//input.setAttribute("onclick", "delTable(); return false;");
	}
	
	cell.appendChild(input);
	
	

	
	row.appendChild(cell);
	// ================= 추가/삭제 끝 ===================
		
	myTbody.appendChild(row);
	

  
}
function delTable(){
	var mss = true;
	var myTable = document.getElementById("sgis_census_table");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	var len = myTbody.rows.length; 

	//alert(document.getElementsByName("cbox")[0]);
	
	if( document.getElementsByName("cbox")[0] == "undefined" || document.getElementsByName("cbox")[0] == null) {
		alert("자료추가 후 삭제할 체크박스를 선택하세요");
		
		return false;
	}
	
	for(var i=1; i < len; i++){
		//alert(document.getElementsByName("cbox")[i-1].checked);
		if (document.getElementsByName("cbox")[i-1].checked == true) {
			myTbody.deleteRow(i);
			//myTbody.deleteRow(i*2-2);
			i--;
			len--;
			mss = false;
		}
	
	}

	document.getElementById("sgis_all").checked = false;
	
	if(mss == true){
		alert("삭제할 체크박스를 선택하세요");
	}

	
}

function allCheck(){
	var len = document.getElementsByName("cbox").length;
	if(document.getElementById("sgis_all").checked == true){
		for(var i=0; i<len; i++){
			document.getElementsByName("cbox")[i].checked = true;
		}	
	}else{
		for(var i=0; i<len; i++){
			document.getElementsByName("cbox")[i].checked = false;
		}
	}
}

function updateMemberInfoTel() {
	var sgis_telephone = document.censusFm.sgis_census_req_tel_1.value + "-" +
							document.censusFm.sgis_census_req_tel_2.value + "-" +
							document.censusFm.sgis_census_req_tel_3.value ;
	
	jQuery.ajax({
		type:"POST",
		url:"shortcut_05_03_upd_tel.jsp",
		data:{"sgis_telephone": sgis_telephone, "sgis_member_id": "<%=sc_userid%>" },
		success:function(data){
			alert("회원정보에 반영되었습니다.");
		},
		error:function(data) {
			
		}
	});
	
}

function saveClicked() {
	var fm=document.censusFm;
	
	
	if ( jQuery('#sgis_census_id1').val() == "") {
		alert("자료구분을 선택하세요.");
		jQuery('#sgis_census_id1').focus();
		return ;
	} 
	
	if ( jQuery('#sgis_census_data_id1').val() == "") {
		alert("대상자료명을 선택하세요.");
		return ;
	}
	
	if(fm.census_public_format.value.trim() == "") {
		alert("배포포맷을 선택하세요.");
		return;
	}
	
	if(fm.census_price.value.trim() == "") {
		alert("가격을 입력하세요.");
		return;
	}

	if ( jQuery('#sgis_census_year1').val() == "") {
		alert("년도를 선택하세요. ");
		return ;
	}

	if ( jQuery('#sgis_census_sido1').val() == "") {
		alert("시도를 선택하세요.");
		return ;
	}

	if ( jQuery('#sgis_census_sigungu1').val() == "") {
		alert("시군구를 선택하세요.");
		return ;
	}
	

	
	
	
	if(fm.census_file.value.trim() == ""){
		alert("첨부파일은 필수입니다.");
		return ;
  	}
	
	var fileName = fm.census_file.value.trim().substring(fm.census_file.value.trim().lastIndexOf("\\")+1 );
	
	//alert(jQuery('#census_file').val());
	//alert(fileName);
	
	var chk_file_flag = "1";
	
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_get_filename.jsp",
		data:{"sgis_census_id":jQuery('#sgis_census_id1').val() , "sgis_census_data_id":jQuery('#sgis_census_data_id1').val() ,
			  "sgis_census_year" : $('#sgis_census_year1').val() ,  "sgis_census_sido" : $('#sgis_census_sido1').val() ,  
			  "sgis_census_sigungu" : $('#sgis_census_sigungu1').val()    },
		success:function(data){
			//jQuery('#search_result').html(data);
			//alert(data.replace(/(^\s*)|(\s*$)/g, "").trim() );
			if ( fileName == data.replace(/(^\s*)|(\s*$)/g, "").trim() ) {
				//alert(data.replace(/(^\s*)|(\s*$)/g, "").trim());
				chk_file_flag = "1";
			} else {
				//alert(data.replace(/(^\s*)|(\s*$)/g, "").trim());
				alert('첨부하신 파일이 네이밍 룰과 불일치합니다.\n첨부파일 : '+fileName+'\n네이밍룰 : '+ data.replace(/(^\s*)|(\s*$)/g, "").trim() +'\n파일명을 확인해주세요.');
				chk_file_flag = "2";
				//return;
			}
		},
		error:function(data) {
			
		}
	});
	
	alert('첨부하신 파일명 : ' + fileName);
	
	if (chk_file_flag == "2") {
		//alert(chk_file_flag);
		return ;
	}
	
	
	//저장할 디렉토리를 불러온다.
	/*
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_get_dir.jsp",
		data:{"sgis_census_id":jQuery('#sgis_census_id1').val() , "sgis_census_data_id":jQuery('#sgis_census_data_id1').val() ,
			  "sgis_census_year" : $('#sgis_census_year1').val() ,  "sgis_census_sido" : $('#sgis_census_sido1').val() ,  
			  "sgis_census_sigungu" : $('#sgis_census_sigungu1').val()    },
		success:function(data){
			fm.what_dir.value = data.replace(/(^\s*)|(\s*$)/g, "").trim();
		},
		error:function(data) {
			
		}
	});
	*/
	
	var c = confirm("저장하시겠습니까?");
	if(c == 1) {

		
		fm.aT.value="INS";
		
		fm.sido_nm.value 	= document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].text;
		fm.sigungu_nm.value = document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].text;
		
		//alert(fm.sido_nm.value);
		
		fm.action="gsks_01_04_03_popup_prc2.jsp";
		fm.submit();
	}
	
}


//]]>
</script>
</head>

<body >
<div id="wrap">


      

        <h4 class="left_ball_01">개별업로드</h4>
        <!-- view-->
        
       
            <form name="censusFm" method="post" enctype="MULTIPART/FORM-DATA" action="gsks_01_04_03_popup_prc2.jsp" >
              <input type="hidden" name="aT" value="<%=lData.getString("aT") %>" />
              <input type="hidden" name="sgis_census_req_id" value="<%=lData.getString("sgis_census_req_id") %>" />
              <!-- <input type="hidden" name="sgis_census_data_id" value="" /> -->
              <input type="hidden" name="old_census_file" value="<%=sgis_census_req_file %>" />
              
              <!-- <input type="hidden" name="sc_userid" value="<%=sc_userid %>" /> -->
              <input type="hidden" name="sido_nm" value="" />
              <input type="hidden" name="sigungu_nm" value="" />
              <input type="hidden" name="what_dir" value="" />
              
        <fieldset class="form_wrap01">
            <legend>센서스 공간통계 자료 신청</legend>
                <dl class="form2">
                <dt>구분</dt>
                <dd>
					<select name="sgis_census_id" id="sgis_census_id1" class="w100" title="자료구분" 
						onchange="selectDetailData2('sgis_census_data_id1', 'sgis_census_id1', 'sgis_census_year1', ''); "> 
						
						<option value="">= 선택 =</option>
	                   <%
	                       /******************************/
	                       /* 자료구분 */
	                       /******************************/
	                       try {                   	 
	                    	 
	                         broker = new GeneralBroker("ceaa00");
	                         lData.setString("PARAM", "CODE");
	                         rm = broker.getList(lData);
	
	                         while(rm != null && rm.next()) {
	                           r_sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
	                           r_sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
	                   %>
	                     <option value="<%=r_sgis_census_id %>" <%if(sgis_census_id.equals(r_sgis_census_id)) { %>selected="selected"<%} %>><%=r_sgis_census_name %></option>
	                   <%
	                         }
	                       } catch(Exception e) {
	                           System.out.print("sgisWebError : ");
	                         //2015-12-03 시큐어코딩
	                         //e.printStackTrace();
	                         logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	                       }
	                   %>
					</select>
						                   
                </dd>

                

                
                
                <dt><label for="sgis_census_req_company">대상자료명</label></dt>
                <dd>
                	<!-- 대상자료명 -->     		
                	<span id="option_data">
           				<select name="sgis_census_data_id" id="sgis_census_data_id1" class="w200" title="대상자료명">
							<option value="" >= 선택 =</option>
						</select>
					</span>
                
				</dd>
				
				
				<!-- 배포포맷 -->
				<dt><label for="sgis_census_req_sosok">배포포맷</label></dt>
                <dd>	
                		<select name="census_public_format" id="census_public_format" class="w100" title="소속구분" >
							<option value="">= 선택 =</option>
		                    <option value="txt" >txt</option>
		                    <option value="SHP" >SHP</option>
		                    <option value="hwp" >hwp</option>
						</select>
            		
				</dd>
				
				<!-- 가격 -->
				<dt><label for="sgis_census_req_mokjuk">가격</label></dt>
                <dd>
                	<input type="text" name="census_price" size="10" value="무료" />
				</dd>
				
				
				
				
            	<%-- 2010.2.10 --%>	
            	<dt>대상지역</dt>
                <dd>
                	<table id="sgis_census_table" class="bbs_list_02"  summary="센서스경계 자료제공의  자료구분, 대상자료명, 년도를  보여드립니다.">
		            	<caption>자료선택</caption>
		            	<colgroup>
		            		<col width="width:20px" />
		            		<col width="width:100px" />
		            		<col width="width:100px" />
		            		<col width="width:100px" />
		            		<col width="width:100px" />
		            		<col width="width:100px" />
		            		<col width="width:100px" />
		            	</colgroup>
		            	<thead>
		            		<tr>
		            			<th scope="col" class="tc">년도</th>
		            			<th scope="col" class="tc">시도</th>
		            			<th scope="col" class="tc">시군구</th>
		            			
		            		</tr>
		            	</thead>
		            	<tbody>
		            	
			            		<!-- 처음 신청시 보여주는 화면 -->
			            		<tr>
				                   
			            			<td class="tl "><!-- 년도 -->
			            				<span id="option_year">
				            				<!-- <select name="sgis_census_id" id="sgis_census_id1" class="w100" title="자료구분" onClick="yearView2('sgis_census_id1','sgis_census_data_id1','sgis_census_year1','inUse1','years1'); return false;" > -->
				            				<select name="sgis_census_year_id" id="sgis_census_year1" class="w100" title="년도">
												<option value="" >=선택=</option>
											</select>
										</span>
										
										<input type="hidden" name="inUse" id="inUse1" />
										<input type="hidden" name="years" id="years1" />
			            			</td>
			            			<td class="tl "><!-- 시도 -->
			            				<span id="option_sido">
			            					<select name="sgis_census_sido_id" id="sgis_census_sido1" class="w100" title="시도">
												<option value="" >=선택=</option>
												<option value="999900" >전체</option>
											</select>
			            				</span>
			            				<!-- 
										<input type="text" name="sgis_census_year" id="sgis_census_year1" title="시도" class="inp w50" value="<%=years %>" readonly="readonly" />
										<input type="hidden" name="inUse" id="inUse1" />
										<input type="hidden" name="years" id="years1" />
										 -->
			            			</td>
			            			<td class="tl "><!-- 시군구 -->
			            				<span id="option_sigungu">
			            					<select name="sgis_census_sigungu_id" id="sgis_census_sigungu1" class="w100" title="시군구">
												<option value="" >=선택=</option>
												<option value="00000" >전체</option>
											</select>
			            				</span>
			            				<!-- 
										<input type="text" name="sgis_census_year" id="sgis_census_year1" title="시군구" class="inp w50" value="<%=years %>" readonly="readonly" />
										<input type="hidden" name="inUse" id="inUse1" />
										<input type="hidden" name="years" id="years1" />
										 -->
			            			</td>
			            			
			            		</tr>
					            	
	            		</tbody>
	            	</table>
	            	
           	  	</dd>

                
                <dt><label for="census_file">첨부파일</label></dt>
                <dd>
                	<br />
                  	<input type="file" name="census_file" id="census_file" value="첨부파일 찾아보기" class="inp w400 h22" />
                  	<br />
                  	<br />
                </dd>
                  
            </dl>
            <p class="cb tc pt10">
        
            <table width="100%" border=0>
				<tr>
					<td align="center">
						<a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0 align="absmiddle"></a>
						<a href="javascript:window.close();"><img src="images/admin_01_03_tab_page_01_button_03.gif" border=0 align="absmiddle"></a>
					</td>
				</tr>
			</table>
        
            </p>
            </fieldset>
            </form>
          </div>
           
        <!-- /view-->
      
  <!--/container-->
  <hr />
<!--/wrap-->
</body>




</html>