<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%-- <%@ include file="/contents/include/logger.jsp"%> --%>
<%
  String leftMenu="shortcut";

if(loginYn.equals("N")) {
    //return URL
    session.setAttribute("returnUrl", "/contents/shortcut/shortcut_05_03.jsp");out.print("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
		out.print("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>");
		out.print("<head>");
		out.print("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
		out.print("<title>센서스 공간통계 자료신청:통계지리 정보서비스</title>");
		out.print("</head>");
		out.print("<body>");
    	out.print("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); location.href='/view/member/login_new?returnPage=/contents/shortcut/shortcut_05_03.jsp'; </script> ");
   
} else {

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
  String census_output_area_year = request.getParameter("census_output_area_year")==null? "":request.getParameter("census_output_area_year");
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
  
  // 2017.11.03 [개발팀] 추가
  String sgis_census_detail_data_id = "";
  String sgis_census_detail_data_nm = "";
  
  String years = "";
  String cnt = "0";

  //CODE
  String r_sgis_census_id = "";
  String r_sgis_census_name = "";
  
  int count = 0;
  
  //if(StringUtil.isEmpty(sc_company_name)) sc_company_name = "";
  String sc_company_name = "";

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
                census_output_area_year = StringUtil.verify((String)rm.get("census_output_area_year"));
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
                
                // 2017.11.03 [개발팀] 추가
                sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
                sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
                
              }
				// 센서스 신청 자료 개수
				lData.setString("PARAM", "CENSUS_REQ_DATA_CNT");
				rm2 = broker.getList(lData);
				if(rm2.next()) cnt = StringUtil.verify((String)rm2.get("cnt"));
              

    } catch(Exception e) {
		System.out.print("[shortcut_05_03.jsp] sgisWebError : [" + e.toString() );
		//2015-12-03 시큐어코딩
		e.printStackTrace();
		//logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    }
  }

  //승인 또는 반려인경우 수정불가
  String tag="";
  if(sgis_census_req_status.equals("A") || sgis_census_req_status.equals("B")) {
    tag = "readonly=\"readonly\"";
  }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<!-- 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
		<link rel="stylesheet" href="/contents/css/2014_css/css/default.css" />   
		<script type="text/javascript" src="/contents/css/2014_css/js/jquery-1.11.0.min.js"></script> 
		<script type="text/javascript" src="/contents/css/2014_css/js/default.js"></script> 
		<link rel="stylesheet" type="text/css" href="/contents/css/main/tooltip.css" />
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/main/tooltip.js"></script>
-->
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>자료제공 | 통계청SGIS 오픈플랫폼</title>
    <link href="/css/default.css" rel="stylesheet" type="text/css" />  
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/data.css" />
    <link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/nm.css" />
    <link rel="stylesheet" href="/contents/css/2014_css/css/default.css" /> 
    
    <link rel="stylesheet" type="text/css" href="/contents/css/main/tooltip.css" />
    
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    
    
    
    <script type="text/javascript" src="/js/common/common.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.bxslider.min.js"></script>
    
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	
	
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<!-- <script type="text/javascript" language="javascript" src="/contents/support/support.js"></script> --> <!-- 2017.10.20 [개발팀]  -->
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/main/tooltip.js"></script>
	
	<script type="text/javascript" language="javascript" src="/contents/design_2015/scripts/common.js"></script>


<style type="text/css">

/* 셀렉트박스 스타일링 */
.nui-selectbox-select {border: solid 1px #ddd;background-color: #fff;border-top: none; z-index: 150;}
.nui-selectbox-select a {display: block;padding: 7px 5px;}
.nui-selectbox-select a:hover {background-color: #e1e1e1;}
.selectbox_selectArea a {display: block;height: 38px;line-height: 38px;font-size: 14px;color: #666;border: solid 1px #ddd;background: url(/contents/design_2015/images/tm/bg_sel_box.gif) no-repeat 100% 0;text-indent: 9px;}



.w100 {width:54px;   height:19px; color:#666;}
.w40 {width:54px;   height:19px; color:#666;}
.w70 {width:54px;   height:19px; color:#666;}

/* 2017.10.19 [개발팀] 자료제공 레이아웃 수정 START */
.select {height:30px;line-height:30px;font-size:13px;}
.inp {height:30px;line-height:30px;font-size:13px;padding:0 10px 0 10px;}
.useTable tr th {height:40px;}
.exp_margin {font-size:13px;margin:5px 0 5px 0;}
.btn01 {height:28px;line-height:28px;}
/* 2017.10.19 [개발팀] 자료제공 레이아웃 수정 END */

</style>			
	
<script type="text/javascript" language="javascript">
$(function(){
	apiLogWrite2("E2","E21",$(".ctit").text(),"없음","00","없음");
})	
//<![CDATA[
           

pageCallReg();
           
           
//자료구분선택
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
		url: "shortcut_05_03_data.jsp",
		data:{"sgis_census_id": document.getElementById(val2).value, "sgis_census_data_name": val,
			  "sgis_census_year": val3, "sgis_census_data_id":val4},
		success:function(data){
			$('#option_data').html(data);//alert(data);
		},
		error:function(data) {
			
		}
	});

	jQuery("#sgis_census_year1").val("");
	//if ( jQuery('#sgis_census_id1').val() == "1") {
	jQuery("#sgis_census_year2").val("");
	//}
	jQuery("#sgis_census_sido1").val("");
	jQuery("#sgis_census_sigungu1").val("");
	
	// 2017.11.09 [개발팀] 추가
	if(document.getElementById(val2).value == "1" || document.getElementById(val2).value == "4") {
		$("#sgis_census_detail_data_id1").show();
		jQuery("#sgis_census_detail_data_id1").val("");
	} else {
		$("#sgis_census_detail_data_id1").hide();
	}
}

function onChange_coa_year(what_year) {
	
	//alert(what_year);
	
	var isRET = '<%=lData.getString("aT")%>';
	if ('RET' == isRET) {
		alert('수정하실 경우에는 집계구 기준년도를 변결하실 수 없습니다.');
		jQuery("#census_output_area_year").val(<%=census_output_area_year%>);
		return false;
	} else {
		
	    document.location.href="/contents/shortcut/shortcut_05_03.jsp?census_output_area_year=" + jQuery("#census_output_area_year").val();
	    
	}
	
}


//년도 선택
function yearClose() {
var yd = document.getElementById("yearDiv");
yd.style.display = "none";
}

var ison="0";

//년도 div 보이기
function yearView(val1,val2,val3,val4,val5) {
	var iframe = document.getElementById(val2).name;
  if(document.getElementById(val1).selectedIndex < 1) {
      alert("자료구분을 선택하세요.");
      return false;
  } else if(eval(iframe+".document.censusFm.sgis_census_data_id.selectedIndex") < 1) {
      alert("자료대상을 선택하세요.");
      return false;
  } else {
		  //var yd = document.getElementById("yearDiv");
		  document.getElementById(val3).value = "";	//연도 reset
		  var url="shortcut_05_03_03.jsp?sgis_census_id="+document.getElementById(val1).value+"&sgis_census_data_id="+eval(iframe+".document.censusFm.sgis_census_data_id.value")+"&sgis_census_req_id="+document.censusFm.sgis_census_req_id.value+"&sgis_census_year="+val3+"&inUse="+val4+"&years="+val5;
		  window.open(url, "census_year", "width=390, height=190, scrollbars=yes");
  }
}

//년도 div 숨기기
function yearHide() {
	if(event.srcElement.name == undefined) {
	  var yd = document.getElementById("yearDiv");
	  yd.style.display = "none";
	}
}


//연도 콤보박스
function yearView2(val1,val2,val3,val4,val5) {
	//alert('년도 onClick 시작');
		
	//var iframe = document.getElementById(val2).name;	
		
	//alert(document.getElementById(val1).selectedIndex);
	//alert(eval(iframe+".document.censusFm.sgis_census_data_id.selectedIndex"));
	//alert('년도 onClick 222');
	
	
		//document.getElementById(val3).value = "";	//연도 reset
		
		//$('#option_year').html("");
	
	/*
	if ( document.getElementById(val1).value=="3" && document.getElementById(val2).value == "0" ) { 
		//센서스지도(3)이고 DB설계(0)이면 시도/시군구를 가져올수 없는데 srv_bnd_sido_pg_hst 테이블에 DB설계에 따른 년도가 없어서 따로 처리해야하지만 시도 선택시 어떻게 처리할지 결정해야함.
		//추후 상황을 보고 이부분하고 아래 }를 주석제거하면 시도/시군구에 전국/전체가 나옴.
		$('#option_year').html(
			"<select name='sgis_census_year_id' id='sgis_census_year1' class='w40' title='년도' >" +
				"<option value=''' >=선택=</option>" +
				"<option value='2012'>2012</option>" +
			"</select>"
		);
	} else {
	*/
	
	if ( jQuery('#sgis_census_id1').val() == "1" ) { //통계자료일 경우만 년도를 from to로 보여준다.
		jQuery.ajax({
			type:"POST",
			url: "shortcut_05_03_year.jsp",
			data:{"sgis_census_id": document.getElementById(val1).value, "sgis_census_data_id": document.getElementById(val2).value,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3, 
				  "census_output_area_year":document.getElementById("census_output_area_year").value,
				  "inUse": val4, "years": val5},
			success:function(data){
				$('#option_year').html(data);
			},
			error:function(data) {
				
			}
		});
	
		jQuery.ajax({
			type:"POST",
			url: "shortcut_05_03_year2.jsp",
			data:{"sgis_census_id": document.getElementById(val1).value, "sgis_census_data_id": document.getElementById(val2).value,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3,
				  "census_output_area_year":document.getElementById("census_output_area_year").value,
				  "inUse": val4, "years": val5},
			success:function(data){
				
				$('#option_year2').show();
				$('#option_year2').html("<br /><center>~</center>"+data);
				
			},
			error:function(data) {
				
			}
		});
		
	} else {
		jQuery.ajax({
			type:"POST",
			url: "shortcut_05_03_year.jsp",
			data:{"sgis_census_id": document.getElementById(val1).value, "sgis_census_data_id": document.getElementById(val2).value,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3,
				  "census_output_area_year":document.getElementById("census_output_area_year").value,
				  "inUse": val4, "years": val5},
			success:function(data){
				
				$('#option_year').html(data);
				$('#option_year2').hide();
				
			},
			error:function(data) {
				
			}
		});
	}
	
	jQuery("#sgis_census_sido1").val("");
	jQuery("#sgis_census_sigungu1").val("");
	
	// 2017.11.03 [개발팀] 추가
	jQuery("#sgis_census_detail_data_id1").val("");
	jQuery("#sgis_census_detail_data_id1").empty();
	jQuery("#sgis_census_detail_data_id1").html("<option value='' >=선택=</option>");
	
  
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
<%--
if(num == 0) {
  document.censusFm.sgis_census_location.value="";
} else {
  <% if(!lData.getString("aT").equals("RET")) {%>
  var location =  detailMenuIfr.document.censusFm.sgis_census_location_id[num-1].value;
  document.censusFm.sgis_census_location.value=location;
  //document.censusFm.sgis_census_year.value = "";	//연도 reset
  //yearIfr.location.href="shortcut_05_03_03.jsp?sgis_census_id="+document.censusFm.sgis_census_id.value+"&sgis_census_data_id="+detailMenuIfr.document.censusFm.sgis_census_data_id.value+"&sgis_census_req_id="+document.censusFm.sgis_census_req_id.value;
  <%}else{%>
  //yearIfr.location.href="shortcut_05_03_03.jsp?sgis_census_id="+document.censusFm.sgis_census_id.value+"&sgis_census_data_id="+document.censusFm.sgis_census_data_id.value+"&sgis_census_req_id="+document.censusFm.sgis_census_req_id.value;
  <%}%>
}
--%>
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
	  alert("소속을 입력하세요.");
	  fm.sgis_census_req_company.focus();
	  return false;
}<%-- else 	if(fm.sgis_census_id.value.trim() == "") {
  alert("자료구분을 선택하세요.");
  fm.sgis_census_id.focus();
  return false;
  <% if(!lData.getString("aT").equals("RET")) {%>
} else 	if(detailMenuIfr.document.censusFm.sgis_census_data_id == undefined) {
  alert("대상자료명을 선택하세요.");
  detailMenuIfr.document.censusFm.sgis_census_data_id.focus();
  return false;
} else 	if(detailMenuIfr.document.censusFm.sgis_census_data_id.value.trim() == "") {
  alert("대상자료명을 선택하세요.");
  detailMenuIfr.document.censusFm.sgis_census_data_id.focus();
  return false;
  <%}%>
} else 	if(fm.sgis_census_year.value.trim() == "") {
  alert("년도를 선택하세요.");
  fm.sgis_census_year.focus();
  return false;
} --%>else if(len < 1) {
			alert("자료를 하나이상 선택하세요.");
			addTable();
			return false;
} 

	/*
	for(var i = 1; i<=len; i++){
	  if(document.getElementsByName("sgis_census_id")[i-1].value == "") { //fm.sgis_census_id.value.trim()
	    alert("자료구분을 선택하세요.");
	    document.getElementsByName("sgis_census_id")[i-1].focus();
	    return false;
	  } else if(eval(document.censusFm.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id") == undefined) {
	    alert("대상자료명을 선택하세요.");
	    eval(document.censusFm.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id.focus()");
	    return false;
	  } else if(eval(document.censusFm.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id.value") == "") {
	    alert("대상자료명을 선택하세요.");
	    eval(document.censusFm.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id.focus()");
	    return false;
	  } else if(document.getElementsByName("sgis_census_year")[i-1].value == "") {
	    alert("년도를 선택하세요.");
	    document.getElementsByName("sgis_census_year")[i-1].focus();
	    return false;
	  } else {
		  
	  }
	}
	*/

	/*
	for(var j= 1; j <= len-1; j++){
		for(var k= j+1; k <= len; k++){
			alert(document.getElementsByName("sgis_census_id_new")[j-1].value);
			if(document.getElementsByName("sgis_census_id_new")[j-1].value == document.getElementsByName("sgis_census_id_new")[k-1].value){
				if(document.getElementsByName("sgis_census_data_id_new")[j-1].value == document.getElementsByName("sgis_census_data_id_new")[k-1].value){
					alert("신청 목록에 같은 분류의 신청이 있습니다.");
					document.getElementsByName("sgis_census_id_new")[k-1].focus();
					return false;
				}
			}
		}
	}
	*/
	
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
  
	//통계갤러리 추가
	//유효성 검사가 끝난후
	//sgis_census_req_mokjuk 요청목적
	//sgis_census_req_kwaje 수행과제
	//sgis_census_req_goal 활용목적
	//sgis_census_id sgis_census_data_id sgis_census_year_id sgis_census_sido_id sgis_census_sigungu_id
	//sgis_census_req_tel_1 sgis_census_req_tel_2 sgis_census_req_tel_3 전화번호
	//sgis_census_req_company 소속
	//sgis_census_req_email 메일주소
	//sgis_census_req_sosok 소속 구분
	//concur 제출동의 체크
	var object = new Object();
	//2017.03.15 최재영 수정
	object.census_output_area_year = $("#census_output_area_year option:selected").text();//집계구 기준년도 추가 (20170619)
	object.sgis_census_req_mokjuk = $("#sgis_census_req_mokjuk option:selected").text();//가져가는 값 수정
	object.sgis_census_req_kwaje = $("#sgis_census_req_kwaje").val();
	object.sgis_census_req_goal = $("#sgis_census_req_goal").val();
	object.sgis_census_req_tel = $("#sgis_census_req_tel_1").val() + "-" + $("#sgis_census_req_tel_2").val() + "-" +$("#sgis_census_req_tel_3").val();
	object.sgis_census_req_company = $("#sgis_census_req_company").val();
	object.sgis_census_req_email = $("#sgis_census_req_email").val();
	object.sgis_census_req_sosok = $("#sgis_census_req_sosok option:selected").text();
	
	//2017.03.15 최재영 수정
	object.content = $("#sgis_census_req_goal").val();
	object.section = "OpenAPI";
	object.census_output_area_year2 = $("#census_output_area_year option:selected").text(); //20170619
	object.usePurpose = $("#sgis_census_req_mokjuk option:selected").text();
	object.applicationField = "기타";
	//sgis_census_id sgis_census_data_id sgis_census_year_id sgis_census_sido_id sgis_census_sigungu_id
	object.sgisCensusList = new Array();
	var rowLength = $("input[name='sgis_census_id_new']").length;
	for(var i = 0; i < rowLength; i++){
		//sgis_census_id sgis_census_data_id sgis_census_year_id sgis_census_sido_id sgis_census_sigungu_id
		var rowObject = new Object();
		rowObject.sgis_census_id = $("input[name='sgis_census_id_new']").eq(i).val();
		rowObject.sgis_census_data_id = $("input[name='sgis_census_data_id_new']").eq(i).val();
		rowObject.sgis_census_year_id = $("input[name='sgis_census_year_id_new']").eq(i).val();
		rowObject.sgis_census_sido_id = $("input[name='sgis_census_sido_id_new']").eq(i).val();
		rowObject.sgis_census_sigungu_id = $("input[name='sgis_census_sigungu_id_new']").eq(i).val();
		
		// 2017.11.03 [개발팀] 추가
		rowObject.sgis_census_detail_data_id = $("input[name='sgis_census_detail_data_id_new']").eq(i).val();

		object.sgisCensusList.push(rowObject);
	}
	
	if($("input:checkbox[id='concur']").is(":checked")){
		object.concur = true;
	}else{
		object.concur = false;
	}
	
	$.ajax({
		type : "POST",
		url : "/view/gallery/galleryAdd",
		data : {
			title : $("#sgis_census_req_kwaje").val(),
			content : $("#sgis_census_req_goal").val(),
			tag : "",
			srv_type : "6",
			survey_surv_start_dt : "", 
			survey_surv_end_dt : "",
			surveyData : "", 
			param : JSON.stringify(object),
			supportType : 'sgis_census_req',
				
		},
		
		success : function(data){
			
		},
		error : function(xhr,textStatus,error){
			
		},
		complete : function(data){
			
		}
		
	});
	//통계갤러리 추가 끝
	
	//if(!lData.getString("aT").equals("RET")) {
	  	if(fm.census_file.value.trim() == ""){
	  		if (fm.old_census_file.value == "") {
	  			//20151104 첨부파일 필수제거 ==> 추후 필수로 변경요구사항이 있을 시 아래 주석 제거하면됨.
	  			/*
	  			alert("첨부파일은 필수입니다.");
				return false;
				*/
	  		}
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
	
	//alert("fm.old_census_file.value [" + fm.old_census_file.value +"]" );
	
	if ( fm.census_file.value.trim() != "" ) {
		fm.encoding="MULTIPART/FORM-DATA";
		fm.action="/contents/shortcut/shortcut_05_03_apply.jsp";
	} else {
		fm.encoding="application/x-www-form-urlencoded";
		fm.action="/contents/shortcut/shortcut_05_03_apply2.jsp";
	}
	//alert('ddd[' + fm.census_file.value.trim());
	//alert(fm.action);
	
	//수정일 경우
	 if(fm.aT.value == "RET") {
	    var c = confirm("저장하시겠습니까?");
	    if(c == 1) {
	      fm.aT.value = "RET";
	      if(fm.census_file.value != ""){
	      	fm.old_census_file.value = "";
	      }
	      //fm.action="/contents/shortcut/shortcut_05_03_apply.jsp";
	      fm.submit();
	    }else{
	        return false;
	    }
	   
	 //신청일 경우
	 } else {
		if(document.getElementById("concur").checked){
			
			//alert(document.censusFm.sgis_census_year_id_new);
			
			if (document.censusFm.sgis_census_year_id_new == null) {
				alert("신청자료 선택 후 추가 버튼을 클릭하세요.");
				return false;
			}
			
			
		    var c = confirm("신청하시겠습니까?");
		    if(c == 1) {
		    	
		    	//============================ 연락처 세션비교후 반영 =========================
		    	var sgis_telephone = document.censusFm.sgis_census_req_tel_1.value + "-" +
										document.censusFm.sgis_census_req_tel_2.value + "-" +
										document.censusFm.sgis_census_req_tel_3.value ;
		    	var sc_tele = "<%=sc_telephone%>";
		    	
		    	//SOP로 변경되면서 이로직은 일단 주석처리한다.
		    	/*
		    	if ( sgis_telephone != sc_tele ) {
		    		var ddd = confirm("입력하신 연락처가 회원정보의 연락처와 상이합니다.\n입력하신 연락처를 회원정보에 반영하시겠습니까?\n확인을 선택하시면 반영 후 신청이 진행됩니다.");
				    if(ddd == 1) {
				    	updateMemberInfoTel();
				    } else {
				        return false;
				    }
		    	}
		    	*/
		    	//============================ 연락처 세션비교후 반영 =========================
		    	
		    	
		    	
			      fm.aT.value = "INS";
			      //fm.action="/contents/shortcut/shortcut_05_03_apply.jsp";
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
//2010.2.10


function check_dup() {
	var fm=document.censusFm;
	var myTable = document.getElementById("sgis_census_table");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	var len = myTbody.rows.length;
	for(var j= 0; j < len-1; j++){
		//alert("j [" + j + "] len [" + len);
		if ( len>1 ) {
			//alert(document.getElementsByName("sgis_census_id_new")[j].value);
			//alert(jQuery("#sgis_census_id1").val());
            
            // 2018. 01. 10 mng_s
            var temp_check = false;
            if ( $("#sgis_census_detail_data_id1").val() == "all") {
                $(function() {
                    $("#sgis_census_detail_data_id1 option").each(function(index, element){
                        if(temp_check) {
                            return 1;
                        }
                        
                        if(index > 1) {
                            if( document.getElementsByName("sgis_census_id_new")[j].value 			== jQuery("#sgis_census_id1").val() 	 	&&
                                document.getElementsByName("sgis_census_data_id_new")[j].value 		== jQuery("#sgis_census_data_id1").val() 	&&
                                document.getElementsByName("sgis_census_year_id_new")[j].value 		== jQuery("#sgis_census_year1").val() 		&&
                                document.getElementsByName("sgis_census_sido_id_new")[j].value 		== jQuery("#sgis_census_sido1").val() 		&&
                                document.getElementsByName("sgis_census_sigungu_id_new")[j].value 	== jQuery("#sgis_census_sigungu1").val()	&&		
                                
                                // 2017.11.03 [개발팀] 추가
                                document.getElementsByName("sgis_census_detail_data_id_new")[j].value 		== element.value 		
                              ){
                                    alert("신청 목록에 같은 분류의 신청이 있습니다.");
                                    temp_check = true;
                                    return 1;
                               }
                        }
                    });
                });
            } else {
                if( document.getElementsByName("sgis_census_id_new")[j].value 			== jQuery("#sgis_census_id1").val() 	 	&&
                    document.getElementsByName("sgis_census_data_id_new")[j].value 		== jQuery("#sgis_census_data_id1").val() 	&&
                    document.getElementsByName("sgis_census_year_id_new")[j].value 		== jQuery("#sgis_census_year1").val() 		&&
                    document.getElementsByName("sgis_census_sido_id_new")[j].value 		== jQuery("#sgis_census_sido1").val() 		&&
                    document.getElementsByName("sgis_census_sigungu_id_new")[j].value 	== jQuery("#sgis_census_sigungu1").val()	&&		
                    
                    // 2017.11.03 [개발팀] 추가
                    document.getElementsByName("sgis_census_detail_data_id_new")[j].value 		== jQuery("#sgis_census_detail_data_id1").val() 		
                  ){
                        alert("신청 목록에 같은 분류의 신청이 있습니다.");
                        
                        return 1;
                   }
            }
            
            if(temp_check) {
                return 1;
            }
            // 2018. 01. 10 mng_e
		}
		
	}
}


function fromToAdd() {
	if(check_dup() == 1) {
		return false;
	}
	
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
		alert("년도를 선택하세요.");
		return false;
	}
	
	// 2017.11.09 [개발팀] 추가 START
	if ( jQuery('#sgis_census_id1').val() == "1" && jQuery('#sgis_census_detail_data_id1').val() == "") {
		alert("세부자료명을 선택하세요.");
		return false;
	}
	// 2017.11.09 [개발팀] 추가 END

	if ( jQuery('#sgis_census_sido1').val() == "") {
		alert("시도를 선택하세요.");
		return false;
	}

	if ( jQuery('#sgis_census_sigungu1').val() == "") {
		alert("시군구를 선택하세요.");
		return false;
	}
	
	if ( jQuery('#sgis_census_id1').val() == "1") { //통계자료일 경우만 from ~ to로 해서 추가한다.
		
		var index = jQuery('#sgis_census_year1 option').index(jQuery('#sgis_census_year1 option:selected'));
		var index2 = jQuery('#sgis_census_year2 option').index(jQuery('#sgis_census_year2 option:selected'));
		
		//alert(index);
		//alert(index2);
		
		if (index < index2) {
			alert("시작 년도를 끝 년도보다 작게 선택하세요.");
			return;
		}
		
		// 2017.10.20 [개발팀] 로직 변경 START
		/* for ( i=index2; i<=index; i++) {
			jQuery('#sgis_census_year1').val(jQuery('#sgis_census_year1 option:eq('+i+')').val());
			//alert(jQuery('#sgis_census_year1').val());
			addTable();
		} */
		
		if ( $("#sgis_census_detail_data_id1").val() == "all") {
			$(function() {
			    $("#sgis_census_detail_data_id1 option").each(function(index, element){
			    	if(index > 1) {
			    		$("#sgis_census_detail_data_id1").val(element.value);
			    		addTable();
			    	}
			    });
                // 2018. 01. 10 mng_s
                $("#sgis_census_detail_data_id1").val("all");
                // 2018. 01. 10 mng_e
			});
		} else {
			addTable();
		}
		// 2017.10.20 [개발팀] 로직 변경 END
		
		jQuery('#sgis_census_year1').val(jQuery('#sgis_census_year1 option:eq('+index+')').val()); //아래추가 후 년도 from을 원래 선택한 값으로 돌려놓는다.
	}
	
	// 2017.11.10 [개발팀] 로직 추가 START
	else if( jQuery('#sgis_census_id1').val() == "4" ) {
		if ( $("#sgis_census_detail_data_id1").val() == "all") {
			$(function() {
			    $("#sgis_census_detail_data_id1 option").each(function(index, element){
			    	if(index > 1) {
			    		$("#sgis_census_detail_data_id1").val(element.value);
			    		addTable();
			    	}
			    });
                // 2018. 01. 10 mng_s
                $("#sgis_census_detail_data_id1").val("all");
                // 2018. 01. 10 mng_e
			});
		} else {
			addTable();
		}
	}
	// 2017.11.10 [개발팀] 로직 추가 END
	
	else {
		addTable();
	}
}

var idx = 9999;
//자료선택추가
function addTable(){
	
	/*
	if(check_dup() == 1) {
		return false;
	}
	
	
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
	*/
	
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
	
	// 2017.11.03 [개발팀] 추가 START	
	//============================== 시작 세부자료명 ====================================
	cell = document.createElement("td");
	cell.setAttribute("class","tl ");
	cell.setAttribute("className","tl ");

	try{
		input = document.createTextNode(document.censusFm.sgis_census_detail_data_id.options[document.censusFm.sgis_census_detail_data_id.selectedIndex].text);
		
	}catch(e){
		input = document.createTextNode(document.censusFm.sgis_census_detail_data_id.options[document.censusFm.sgis_census_detail_data_id.selectedIndex].text);
	}
	
	cell.appendChild(input);
	
	try{
		input = document.createElement("<input type='hidden' name='sgis_census_detail_data_id_new' id='sgis_census_detail_data_id" + idx + "' value='" + document.censusFm.sgis_census_data_id.options[document.censusFm.sgis_census_data_id.selectedIndex].value + "' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "sgis_census_detail_data_id_new");
		input.setAttribute("id", "sgis_census_detail_data_id"+idx);
		input.setAttribute("value", document.censusFm.sgis_census_detail_data_id.options[document.censusFm.sgis_census_detail_data_id.selectedIndex].value);
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	//============================== 끝 세부자료명 ====================================
	// 2017.11.03 [개발팀] 추가 END	
		
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
		input = document.createElement("<img src='/contents/design_2015/images/button_delete2.png' style='cursor:hand;' alt='삭제' onclick=\"document.getElementById('a" + idx + "').checked = true; delTable(); return false;\" />");
		
		
	}catch(e){
		
		input = document.createElement("img");
		input.setAttribute("src", "/contents/design_2015/images/button_delete2.png");
		input.setAttribute("alt", "삭제");
		input.setAttribute("style", "cursor:hand");
		input.setAttribute("onclick", "document.getElementById('a" + idx + "').checked = true; delTable(); return false;");
		//input.setAttribute("onclick", "delTable(); return false;");
	}
	
	cell.appendChild(input);
	
	
	/*
	try{
		input = document.createElement("<input type='image' src='/contents/images/button_delete2.gif' alt='삭제' title='삭제' onclick=\"document.getElementById('a" + idx + "').checked = true; delTable(); return false;\" />");
	}catch(e){	
		input = document.createElement("input");
		input.setAttribute("src", "/contents/images/button_delete2.gif");
		input.setAttribute("alt", "삭제");
		input.setAttribute("type", "image");
		input.setAttribute("title", "삭제");
		input.setAttribute("onclick", "document.getElementById('a" + idx + "').checked = true; delTable(); return false;");
	}
	cell.appendChild(input);
	*/
	
	/*
	try{
		input = document.createTextNode("document.getElementById('a" + idx + "').value");
		
		
	}catch(e){
		input = document.createTextNode("document.getElementById('a" + idx + "').value");
	}
	
	cell.appendChild(input);
	*/
	
	/*
	try{
		input = document.createElement("<img src='/contents/images/button_delete2.gif' alt='삭제' />");
		
		
	}catch(e){
		input = document.createElement("img");
		input.setAttribute("src", "/contents/images/button_delete2.gif");
		input.setAttribute("alt", "삭제");
	}
	
	cell.appendChild(input);
	*/
	
	
	row.appendChild(cell);
	// ================= 추가/삭제 끝 ===================
		
	myTbody.appendChild(row);
	
	/*
	row = document.createElement("tr");
	
	cell = document.createElement("td");
	cell.setAttribute("colSpan","2");
	cell.setAttribute("class","tl t_end");
	cell.setAttribute("className","tl t_end");

	try{
		input = document.createElement("<input type='image' src='/contents/images/sgis_year_select.gif' alt='선택' title='새창열림' onclick='yearView(\""+selectId+"\",\""+iframeId+"\",\""+yearId+"\",\""+inUseId+"\",\""+yearsId+"\"); return false;' >");
	}catch(e){	
		input = document.createElement("input");
		input.setAttribute("src", "/contents/images/sgis_year_select.gif");
		input.setAttribute("alt", "선택");
		input.setAttribute("type", "image");
		input.setAttribute("title", "새창열림");
		input.onclick=function(){yearView(selectId,iframeId,yearId,inUseId,yearsId); return false;};
	}
	cell.appendChild(input);

	var node = document.createTextNode(" ");
	cell.appendChild(node);
	
	try{
		input = document.createElement("<input type='text' name='sgis_census_year' id='"+yearId+"' title='년도' class='inp w301' readonly='readonly' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "sgis_census_year");
		input.setAttribute("id", yearId);
		input.setAttribute("title", "년도");
		input.setAttribute("class", "inp w301");
		input.setAttribute("className", "inp w301");
		input.setAttribute("readOnly", "readonly");
	}
	cell.appendChild(input);

	try{
		input = document.createElement("<input type='hidden' id='"+inUseId+"' name='inUse' />");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type","hidden");
		input.setAttribute("id",inUseId);
		input.setAttribute("name","inUse");
	}
	
	cell.appendChild(input);

	try{
		input = document.createElement("<input type='hidden' id='"+yearsId+"' name='years' />");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type","hidden");
		input.setAttribute("id",yearsId);
		input.setAttribute("name","years");
	}
	
	cell.appendChild(input);
	row.appendChild(cell);
	
	myTbody.appendChild(row);
	*/
	
	

}
function delTable(){
	var mss = true;
	var myTable = document.getElementById("sgis_census_table");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	var len = myTbody.rows.length; 

	//alert(document.getElementsByName("cbox")[0]);
	//alert(len);
	
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

var toggle_cbox = "1";
function toggleCheck() {
	if ( toggle_cbox == "1") {
		document.getElementById("sgis_all").checked = true;
		allCheck();
		toggle_cbox = "2";
	} else if ( toggle_cbox == "2") {
		document.getElementById("sgis_all").checked = false;
		allCheck();
		toggle_cbox = "1";
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
			//alert("회원정보에 반영되었습니다.");
		},
		error:function(data) {
			
		}
	});
	
}



//alert(AuthInfo.authStatus);

	</script>
	</head>

<body>
	<div id="wrap">
			<!-- cls:header start -->
			<!-- <header id="header">
				Top Include
				<script type="text/javascript"  src="/js/common/includeSearch.js"></script>
			</header> -->

		<header> 
		<!-- Top Include --> 
		<jsp:include page="/view/common/includeSearch"></jsp:include> 
		</header>
		<div id="container">
			<p class="path">
				<a href="#">
					<span class="path_el">처음페이지&nbsp;&nbsp;&gt;&nbsp;</span>
				</a>
				<a href="#">
					<span class="path_el">알림마당&nbsp;&nbsp;&gt;&nbsp;</span>
				</a>
				<a href="#">
					<span class="path_el current">자료신청</span>
				</a>
			</p>
			<h2 class="ctit">자료신청</h2>
			<p class="smr">통계청에서 자체 생산한 통계지리정보 자료를 제공하는 것으로  파일형태로 서비스하고 있습니다.
				<!-- <br><br><font color='blue'>* 2014년도 자료는 2016년 4월 6일 부터 제공할 예정입니다.</font> --> 
			</p>
			<div class="tabs">
				
				<a href="/contents/shortcut/shortcut_05_02.jsp">서비스 소개</a>
				<a href="/contents/shortcut/shortcut_05.jsp">자료제공 목록</a>
				<a href="/contents/shortcut/shortcut_05_03.jsp"  class="active">자료신청</a>
				<a href="/contents/shortcut/shortcut_05_01.jsp" >자료 다운로드</a>
				
				
			</div>
		
		
			<!-- cls:contents start -->
	
	<!-- 
	<div class="contents subbg">
		<div class="container">
					
		
					
		<div class="acticle">
		<div class="use_wrap">	
				<div class="listTab">
					<span class="listTab_font01"><a href="shortcut_05_03.jsp">자료신청</a></span>
					<span class="listTab_font02"><a href="shortcut_05_03_01.jsp">신청내역</a></span>
					<span class="listTab_font03"><a href="shortcut_05_03_past_year.jsp">과거년도 자료신청</a></span>
				</div>	
				<div class="listTitle">센서스 공간 통계 자료신청</div>
				-->
	<div id="contents">
			<div class="content">				
				<div class="listTab" style="height:50px;margin-top:40px;margin-bottom:40px;">
				<% 
           			if (lData.getString("aT").equals("RET")) { //신청내역일 경우
           		%>
					<span class="listTab_font02" style="line-height:50px;"><a href="shortcut_05_03.jsp">자료신청</a></span>
					<span class="listTab_font01" style="line-height:50px;"><a href="shortcut_05_03_01.jsp">신청내역</a></span>
					<span class="listTab_font02" style="line-height:50px;"><a href="shortcut_05_03_past_year.jsp">과거 집계구 자료신청</a></span>
					
				<%
           			} else { //자료신청일 경우
           		%>
           				<span class="listTab_font01" style="line-height:50px;"><a href="shortcut_05_03.jsp">자료신청</a></span>
    					<span class="listTab_font02" style="line-height:50px;"><a href="shortcut_05_03_01.jsp">신청내역</a></span>
    					<span class="listTab_font02" style="line-height:50px;"><a href="shortcut_05_03_past_year.jsp">과거 집계구 자료신청</a></span>
           		<%	
           			}
				%>
					
				</div>
				<div class="title">
					<h3>센서스 공간 통계 자료신청</h3>						
				</div>				
				<div class="listFont" style="margin-bottom:10px;"> <!-- 2017.10.19 [개발팀]  -->
					<span class="listFonts">*</span>필수 입력항목입니다.  
				</div>				
				
 <form id="censusFm_id" name="censusFm" method="post"  action="shortcut_05_03_apply.jsp" onsubmit="return applyClicked();">
        
        <input type="hidden" name="param_userkey" value="<%= sc_userkey %>" />
        
        <input type="hidden" name="aT" value="<%=lData.getString("aT") %>" />
        <input type="hidden" name="sgis_census_req_id" value="<%=lData.getString("sgis_census_req_id") %>" />
        <!-- <input type="hidden" name="sgis_census_data_id" value="" /> -->
        <input type="hidden" name="old_census_file" value="<%=sgis_census_req_file %>" />
				<table class="useTable" summary="자료신청">
					
					<colgroup>
						<col width="100"/> <!-- 2017.10.19 [개발팀] 너비수정  -->
						<col width=""/> 
					</colgroup>
					<tbody>
					
					
					<!-- 
						과거년도 자료신청용으로 만들어 놓았으나 현재 년도만 보여주는 걸로 변경하므로 이 부분은 주석 처리하고 
						id 값만 hidden으로 처리함.
					 -->
					<!-- 
					<tr>
						<th scope="row" width="200px"><label for="census_output_area_year">집계구 기준년도<span class="listFonts">*</span></label></th>
						<td width="600px">
						
						<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { %>
						
							<select  onChange="onChange_coa_year(document.getElementById('census_output_area_year').value);" name="census_output_area_year" id="census_output_area_year"  class="input_use02" style="width: 154px;" title="집계구 기준년도" >
								<option value="2015" <%if("2015".equals(census_output_area_year)) { %>selected="selected"<%} %>>2015</option>
								<option value="2014" <%if("2014".equals(census_output_area_year)) { %>selected="selected"<%} %>>2014</option>
								
							</select>
							<%
								if("RET".equals(lData.getString("aT"))) { //수정일 경우
							%>
									&nbsp;(신청내역 수정시 집계구 기준년도는 변경하실 수 없습니다.)
							<%
								} else { //초기 작성일 경우
							%>
									&nbsp;(집계구 기준년도를 변경하실 경우 작성하신 내역이 초기화 됩니다.)
							<%
								}
							%>
							
						<%} else{ //승인 또는 반려 상태일 경우 %>
								
								<%=census_output_area_year%>
						<% } %>			
						</td>
					</tr>
					 -->
					
					<!-- =====================================  신규 데이터 추가시 해당 기준년도를 여기서 바꾸어 주어야 한다.  ============================================ -->
					<input type="hidden" id="census_output_area_year" name="census_output_area_year" value="2016" />
					
					
					<tr>
						<th scope="row" width="200px"><label for="sgis_census_req_mokjuk">요청목적<span class="listFonts">*</span></label></th>
						<td width="600px">
						<!-- 상태값에 따라 select box 내용 변경됨. -->
						<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { %>
							
							<!-- 2017.10.19 [개발팀]  -->
										 <select name="sgis_census_req_mokjuk" id="sgis_census_req_mokjuk"  class="input_use02 select" style="width: 250px;" title="요청목적" >
												<option>= 선택 =</option>
												 <%
		                       
		                       try {                   	 
		                    	 
		                         broker = new GeneralBroker("ceaa00");
		                         lData.setString("PARAM", "CATEGORY_CODE");
		                         lData.setString("lclas_cl", "002");
		                         rm = broker.getList(lData);
		                         
		                         String sclas_cl = "";
	                        	 String sclas_nm = "";
		
		                         while(rm != null && rm.next()) {
		                        	 sclas_cl = StringUtil.verify((String)rm.get("sclas_cl"));
		                        	 sclas_nm = StringUtil.verify((String)rm.get("sclas_nm"));
		                   %>
		                     <option value="<%=sclas_cl %>" <%if(sclas_cl.equals(sgis_census_req_mokjuk)) { %>selected="selected"<%} %>><%=sclas_nm %></option>
		                   <%
		                         }
		                       } catch(Exception e) {
		                    	   System.out.print("[shortcut_05_03.jsp] sgisWebError : [" + e.toString() );
		                   		
		                         //2015-12-03 시큐어코딩
		                         e.printStackTrace();
		                         //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		                       }
		                   %>
								</select>
							  
						<%} else{ //승인 또는 반려 상태일 경우 %>
								<!-- 
								<%if(sgis_census_req_mokjuk.equals("002001")) { %>DB<%} %>
								<%if(sgis_census_req_mokjuk.equals("002002")) { %>연구<%} %>
								<%if(sgis_census_req_mokjuk.equals("002003")) { %>작성<%} %>
								 -->
								<%
			                       
			                       try {                   	 
			                    	 
			                         broker = new GeneralBroker("ceaa00");
			                         lData.setString("PARAM", "CATEGORY_CODE");
			                         lData.setString("lclas_cl", "002");
			                         rm = broker.getList(lData);
			                         
			                         String sclas_cl = "";
		                        	 String sclas_nm = "";
			
			                         while(rm != null && rm.next()) {
			                        	 sclas_cl = StringUtil.verify((String)rm.get("sclas_cl"));
			                        	 sclas_nm = StringUtil.verify((String)rm.get("sclas_nm"));
			                   %>
			                    		<%if(sclas_cl.equals(sgis_census_req_mokjuk)) { %><%=sclas_nm %><%} %>
			                   <%
			                         }
			                       } catch(Exception e) {
			                           System.out.print("sgisWebError : ");
			                         //2015-12-03 시큐어코딩
			                         //e.printStackTrace();
			                         //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			                       }
			                   %>
						<% } %>			
						</td>
					</tr> 
					<tr>
						<th scope="row"><label for="sgis_census_req_kwaje">수행과제<span class="listFonts">*</span></label></th>
						<td style="padding-bottom:10px;"> <!-- 2017.10.19 [개발팀] -->
							<%
		                		if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { 
		                	%>
							<div class="ptr exp_margin">예시)도시디자인과 교통안전고의 연관성을 실증 분석하고자 함</div> <!-- 2017.10.19 [개발팀]  -->
							<div class="bnr4"><input type="text" name="sgis_census_req_kwaje" id="sgis_census_req_kwaje" title="수행과제" maxlength="200" 
							value="<%if(StringUtil.isEmpty(sgis_census_req_status)) {%><%=""%><%} else {%><%=sgis_census_req_kwaje%><%} %>" <%=tag %> class="input_use01 inp" style="width:780px;"/></div> <!-- 2017.10.19 [개발팀] -->
							<%
		            			} else { //승인 또는 반려 상태일 경우 
			            	%>
								<%=sgis_census_req_kwaje%>
							<%	
									} 
							%>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="sgis_census_req_goal">활용목적<span class="listFonts">*</span></label></th>
						<td class="color">
						<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) {%>
							<!-- 2017.10.19 [개발팀] -->
							<textarea onmouseover="tooltip.show('100자이상 구체적으로&lt;br/&gt; 작성해주세요',180,10,-70)" onmouseout="tooltip.hide();" onfocus="tooltip.hide();"  name="sgis_census_req_goal" id="sgis_census_req_goal" rows="" cols="" class="use_area01" onkeyup="len_chk2('500');" style="width:780px;padding:5px 10px 5px 10px;"><%=sgis_census_req_goal %></textarea>
						<%}else{ %>
	                		<%=sgis_census_req_goal %>
	                	<%} %>
						</td>
					</tr>
					
					<!-- 20160411 주석처리요청으로 display:none 처리함. 주석처리했더니 오류발생해서 display:none으로변경함 -->
					<tr style="display:none;">
						<th scope="row"><%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) {%>첨부파일<!-- <span class="listFonts">*</span> --><%}else { %>첨부파일<%} %></th>
						<td>
							<div class="ptr">※ 첨부파일 크기는 최대 10MB까지 입니다.
							<%if(!StringUtil.isEmpty(sgis_census_req_file)) {%>
			                  <%=sgis_census_req_file %><br />
			                <%} %>
							</div>
							<div class="bnr4">
							<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) {%>
			                  <input type="file" name="census_file" id="census_file" value="첨부파일 찾아보기" class="inp w400 h22" />
			                <%} %>
							<a href="/contents/include/download.jsp?filename=sgis_data_request_gongmoon.hwp&path=/board/">&nbsp;공문(파일첨부용)</a>	
							</div>
						</td>
					</tr>	
					
					
					
					<tr>
						<th scope="row"><label for="sgis_census_id1">자료선택<span class="listFonts">*</span></label></th>
						<td class="bnr4">
						<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { %>
							<div class="prt">
								<a href="#" onclick="toggleCheck(); return false;"><img src="/contents/css/2014_css/img/btn/btn_allchoice.png" alt="전체선택" /></a>
								<a href="#" onclick="delTable(); return false;"><img src="/contents/css/2014_css/img/btn/btn_del.png" alt="선택삭제" /></a>
							</div>
							<!-- 2017.10.20 [개발팀] 항목추가  START-->
							<table class="listTable2" id="sgis_census_table" style="width:800px;">
								
								<!-- thead 테그 절대 삭제 금지(위의 자바스크립트에서 오류발생하므로 삭제하지 마시오.) -->
								<thead>
									<tr>
										<th class="first" style="width:10px;"><input type="checkbox" id="sgis_all" name="sgis_all" onclick="allCheck()" /></th>
										<th><label for="sgis_census_id1">자료구분</label></th>
										<th style="width:100px;"><label for="sgis_census_data_id1">대상자료명</label></th>
										<th><label for="sgis_census_year1">년도</label></th>
										<th style="width:160px;"><label for="sgis_census_detail_data_id1">세부자료명</label></th> <!-- 2017.10.20 [개발팀] 항목추가  -->
										<th><label for="sgis_census_sido1">시도</label></th>
										<th style="width:45px;"><label for="sgis_census_sigungu1">시군구</label></th>
										<th class="last"><label>추가삭제</label></th>
									</tr>
								</thead>
								<!-- thead 테그 절대 삭제 금지(위의 자바스크립트에서 오류발생하므로 삭제하지 마시오.) -->
								
								<!-- table body start -->
								<tbody >
								<% 
			            			if (lData.getString("aT").equals("RET")) {
			            		%>
								<tr>
								<!-- check box td start -->
									<td>
										<!-- <input type="checkbox"/> -->	
									</td>
								<!-- check box td end -->
								<!-- 자료구분 td start -->
									<td>
										<select class="input_use06 select" name="sgis_census_id" id="sgis_census_id1" title="자료구분" 
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
					                     <!-- <option value="<%=r_sgis_census_id %>" <%if(sgis_census_id.equals(r_sgis_census_id)) { %>selected="selected"<%} %>><%=r_sgis_census_name %></option> -->
					                     <option value="<%=r_sgis_census_id %>" ><%=r_sgis_census_name %></option>
					                   <%
					                         }
					                       } catch(Exception e) {
					                           System.out.print("sgisWebError : ");
					                         //2015-12-03 시큐어코딩
					                         //e.printStackTrace();
					                         //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
					                       }
					                   %>
										</select>
									</td>
								<!-- 자료구분 td end -->
								<!-- 자료대상명 td start -->
									<td>
										<span id="option_data">
											<select name="sgis_census_data_id" id="sgis_census_data_id1" class="input_use06 select" title="대상자료명">
												<option>=선택=</option>
											</select>
										</span>
									</td>
								<!-- 자료대상명 td end -->
								<!-- 년도 td start-->
									<td>
										<span id="option_year">
											<select name="sgis_census_year_id" id="sgis_census_year1"  class="input_use06 select" title="년도">
												<option>=선택=</option>
											</select>
										</span>
										<!-- 2017.10.20 [개발팀] 년도2 제거 -->
										<!-- <span id="option_year2"> -->
										<!-- </span> -->
										<input type="hidden" name="inUse" id="inUse1" />
										<input type="hidden" name="years" id="years1" />
									</td>
									<!-- 년도 td end-->
									<!-- 2017.10.20 [개발팀] 항목추가  -->
									<!-- 세부자료명 td start -->
									<td>
										<span id="option_detail_data">
											<select name="sgis_census_detail_data_id" id="sgis_census_detail_data_id1" class="input_use06 select" title="세부자료명">
												<option>=선택=</option>
											</select>
										</span>
									</td>
									<!-- 세부자료명 td end -->
									<!-- 시도 td start -->
									<td>
										<span id="option_sido">
											<select name="sgis_census_sido_id" id="sgis_census_sido1" class="input_use06 select" title="시도">
												<option>=선택=</option>
											</select>
										</span>
									</td>								
									<!-- 시도 td end -->
									<!-- 시군구 td start -->
									<td>
										<span id="option_sigungu">
											<select name="sgis_census_sigungu_id" id="sgis_census_sigungu1" class="input_use06 select" title="시군구">
												<option>=선택=</option>
											</select>
										</span>
									</td>
									<!-- 시군구 td end -->
									<!-- 추가삭제 td start -->
									<td>
										<!-- <a href="#" onclick="fromToAdd(); return false;"><img src="/contents/design_2015/images/button_add.gif" alt="추가"  /></a> -->
										<!-- 2017.10.20 [개발팀] css추가 -->
										<a class="check3 btn01" href="#" onclick="fromToAdd(); return false;">추가</a>
									</td>
									<!-- 추가삭제 td end -->
								</tr>	
								
								  <%	
						    try {
					
								///////////////////////////////////////////////////////////////////////
								// 콤보박스 아래의 신청내역에 대한 부분(텍스트로 되어있다.) 시작
								///////////////////////////////////////////////////////////////////////
					
								broker = new GeneralBroker("ceaa00");
								lData.setString("PARAM", "CODE");
								rm2 = broker.getList(lData);
					
					
					               
					   			broker = new GeneralBroker("ceaa00");
								lData.setString("PARAM", "CENSUS_APPLY_INFO");
								rm = broker.getList(lData);
					
					       			
								while(rm != null && rm.next()) {
									count++;
									sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
									sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
									sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
									sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
									
									sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
					                sgis_census_sido_id = StringUtil.verify((String)rm.get("sgis_census_req_sido"));
					                sgis_census_sido_nm = StringUtil.verify((String)rm.get("sido_nm"));
					                sgis_census_sigungu_id = StringUtil.verify((String)rm.get("sgis_census_req_sigungu"));
					                sgis_census_sigungu_nm = StringUtil.verify((String)rm.get("sigungu_nm"));
									
												// 2017.11.03 [개발팀] 추가
								                sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
								                sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
									lData.setString("PARAM", "CENSUS_APPLY_AVAILABLE_YEAR_GROUP");
									lData.setString("sgis_census_id",sgis_census_id);
									lData.setString("sgis_census_data_id",sgis_census_data_id);
									rm1 = broker.getList(lData);
									years = "";
									while(rm1 != null && rm1.next()) {
										years += StringUtil.verify((String)rm1.get("sgis_census_req_year")) + ",";
									}			   
								
								%>
					
					            		<tr>
					            			<td><input type="checkbox" id="a<%=count %>" name="cbox" /></td>
					            			<td class="tl">
												
												<%--
													broker = new GeneralBroker("ceaa00");
													lData.setString("PARAM", "CODE");
													rm2 = broker.getList(lData);		
													while(rm2 != null && rm2.next()) {
														r_sgis_census_id = String.valueOf((BigDecimal)rm2.get("sgis_census_id"));
														r_sgis_census_name = StringUtil.verify((String)rm2.get("sgis_census_code_name"));
														
														if ( sgis_census_id.equals(r_sgis_census_id) ) {
															out.println(r_sgis_census_name);
														}
														
													} //while
												--%>												
												<%=sgis_census_name%>
												<input type='hidden' name='sgis_census_id_new' id='sgis_census_id<%=count %>' value='<%=sgis_census_id%>' />
												
						                   </td>
						                   <td class="tl">
						                   		<%=sgis_census_data_name%>
						                   		<input type="hidden" name='sgis_census_data_id_new' id='sgis_census_data_id<%=count %>' value="<%=sgis_census_data_id%>" />
						                   </td>
					            		
					            			<td class="tl">
												<%=sgis_census_req_year%>
						                   		<input type="hidden" name='sgis_census_year_id_new' id='sgis_census_year_id<%=count %>' value="<%=sgis_census_req_year%>" />
					            			</td>
								            			<!-- 2017.11.03 [개발팀] 추가 START -->
								            			<td class="tl">
															<%=sgis_census_detail_data_nm%>
									                   		<input type="hidden" name='sgis_census_detail_data_id_new' id='sgis_census_detail_data_id<%=count %>>' value="<%=sgis_census_detail_data_id%>" />
								            			</td>
								            			<!-- 2017.11.03 [개발팀] 추가 END -->
					            			<td class="tl">
						                   		<%=sgis_census_sido_nm%>
						                   		<!-- 뒷단에서 시군구를 알기위해서는 년도가 있어야되는데 년도값을 알기위해 9999를 붙였다. substring해서 사용하기 때문에 삭제시 에러발생함. 유지보수시 주의바람. -->
						                   		<input type="hidden" name='sgis_census_sido_id_new' id='sgis_census_sido_id<%=count %>' value="<%=sgis_census_req_year%><%=sgis_census_sido_id%>" />
						                   	</td>
						                   	<td class="tl">
						                   		<%=sgis_census_sigungu_nm%>
						                   		<input type="hidden" name='sgis_census_sigungu_id_new' id='sgis_census_sigungu_id<%=count %>' value="<%=sgis_census_sigungu_id%>" />
						                   	</td>
						                    <td class="tl t_end">
						                   		<img src='/contents/design_2015/images/button_delete2.png' style='cursor:hand;' alt='삭제' onclick="document.getElementById('a<%=count %>').checked = true; delTable(); return false;" />
						                   	</td>
					            		</tr>
							<%
								}
						    } catch(Exception e) {
								System.out.print("sgisWebError : ");
								//2015-12-03 시큐어코딩
								//e.printStackTrace();
								//logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
						    }
						    %>   
								
								
								<% } else { %>
								<tr>
									<!-- checkbox td start -->
									<td><!-- <input type="checkbox" id="a1" name="cbox" /> --></td>
									<!-- checkbox td end -->
									<!-- 자료구분 td end -->
									<td>
													<select name="sgis_census_id" id="sgis_census_id1" class="input_use06 select" title="자료구분"
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
						                         //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
						                       }
						                   %>
										</select>
									</td>
									<!-- 자료구분 td end -->
									<!-- 대상자료명 td start -->
									<td>
										<span id="option_data">
														<select name="sgis_census_data_id" id="sgis_census_data_id1" class="input_use06 select" title="대상자료명">
												<option>=선택=</option>
											</select>
										</span>
									</td>
									<!-- 대상자료명 td end -->
									<!-- 년도 td start -->
									<td>
										<span id="option_year">
														<select name="sgis_census_year_id" id="sgis_census_year1" class="input_use06 select" title="년도">
												<option>=선택=</option>
											</select>
										</span>
												<!-- 2017.10.20 [개발팀] 년도2 제거 -->
													<!-- <span id="option_year2"></span> -->
													<!-- 
													<center>~</center>
						            				<select name="sgis_census_year_id2" id="sgis_census_year2" class="w40" title="년도">
														<option value="" >=선택=</option>
													</select>
													 -->
												</span>
												
												<input type="hidden" name="inUse" id="inUse1" />
												<input type="hidden" name="years" id="years1" />
									</td>
									<!-- 년도 td end -->
												<!-- 2017.10.20 [개발팀] 항목추가 -->
												<!-- 세부자료명 td start -->
												<td>
													<span id="option_detail_data">
														<select name="sgis_census_detail_data_id" id="sgis_census_detail_data_id1" class="input_use06 select" title="세부자료명">
															<option>=선택=</option>
														</select>
													</span>
												</td>
												<!-- 세부자료명 td end -->
									<!-- 시도 td start -->
									<td>
										<span id="option_sido">
														<select name="sgis_census_sido_id" id="sgis_census_sido1" class="input_use06 select" title="시도">
												<option>=선택=</option>
											</select>
										</span>
									</td>
									<!-- 시도 td end -->
									<!-- 시군구 td start -->
									<td>
										<span id="option_sigungu">
														<select name="sgis_census_sigungu_id" id="sgis_census_sigungu1" " class="input_use06 select" title="시군구">
												<option>=선택=</option>
											</select>
										</span>
									</td>
									<!-- 시도 td end -->
									<!-- 추가 삭제 td start -->
									<td>
										<!-- <a href="#" onclick="fromToAdd(); return false;"><img src="/contents/design_2015/images/button_add.gif" alt="추가"  /></a> -->
													<!-- 2017.10.20 [개발팀] css추가 -->
													<a class="check3 btn01" href="#" onclick="fromToAdd(); return false;">추가</a>
									</td>
									<!-- 추가 삭제 td end -->
								</tr>
								<% } %>
								</tbody>
								<!-- table body end -->							
							</table>
										<!-- 2017.10.20 [개발팀] 항목추가  END-->
							<!-- 여기 할 차례 -->
							<%}else{ //============================================== 승인 또는 반려 상태일 경우 ==============================================
					            	
						    try {
					
								//============================================== 승인 또는 반려 상태일 경우 ==============================================
								
					
								broker = new GeneralBroker("ceaa00");
								lData.setString("PARAM", "CODE");
								rm2 = broker.getList(lData);
					
					
					               
					   			broker = new GeneralBroker("ceaa00");
								lData.setString("PARAM", "CENSUS_APPLY_INFO");
								rm = broker.getList(lData);
					
					       			
								while(rm != null && rm.next()) {
									count++;
									sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
									sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
									sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
									sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
									
									sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
					                sgis_census_sido_id = StringUtil.verify((String)rm.get("sgis_census_req_sido"));
					                sgis_census_sido_nm = StringUtil.verify((String)rm.get("sido_nm"));
					                sgis_census_sigungu_id = StringUtil.verify((String)rm.get("sgis_census_req_sigungu"));
					                sgis_census_sigungu_nm = StringUtil.verify((String)rm.get("sigungu_nm"));
					                
								                // 2017.11.03 [개발팀] 추가
								                sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
								                sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
									lData.setString("PARAM", "CENSUS_APPLY_AVAILABLE_YEAR_GROUP");
									lData.setString("sgis_census_id",sgis_census_id);
									lData.setString("sgis_census_data_id",sgis_census_data_id);
									rm1 = broker.getList(lData);
									years = "";
									int num = rm1.getRowCount();
									int sum = 0;
									while(rm1 != null && rm1.next()) {
										sum++;
										if(num == sum){
											years += StringUtil.verify((String)rm1.get("sgis_census_req_year"));
										}else{
											years += StringUtil.verify((String)rm1.get("sgis_census_req_year")) + ",";
										}
									}
									if(years.equals(""))years = "미승인";
					%>
								
										<!-- 2017.11.03 [개발팀] 수정 -->	
										<%=sgis_census_name %> > <%=sgis_census_data_name %> > <%=sgis_census_req_year%> > <%=sgis_census_detail_data_nm%> > <%=sgis_census_sido_nm%> > <%=sgis_census_sigungu_nm%> <br/>
								
	            	<%
				            	System.out.println(count);
								count++;
								}
						 		   	
						   	} catch(Exception e) {
						     	System.out.print("sgisWebError : ");
						     	//2015-12-03 시큐어코딩
						     	//e.printStackTrace();
						     	//logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
						   	}
	            	} 
	            	%>
						</td>
					</tr>
					<tr>
						<th scope="row"><label>ID</label></th>
						<td class="bnr4"><%=sc_userid %></td>							
					</tr>
					<tr>
						<th scope="row"><label>성명</label></th>
						<td class="bnr4"><%=sc_username %></td>	
						  <%
		                    String tel_1 = "";
		                    String tel_2 = "";
		                    String tel_3 = "";
		                    if(!StringUtil.isEmpty(sgis_census_req_status) && sgis_census_req_tel.split("-").length == 3) { //자료신청이 있을 경우
		                      tel_1 = sgis_census_req_tel.substring(0, sgis_census_req_tel.indexOf("-"));
		                      tel_2 = sgis_census_req_tel.substring(sgis_census_req_tel.indexOf("-")+1, sgis_census_req_tel.lastIndexOf("-"));
		                      tel_3 = sgis_census_req_tel.substring(sgis_census_req_tel.lastIndexOf("-")+1);
		                    } else { //자료신청을 아직 하지 않은 경우 로그인 세션 정보로 처리
		                    	if(sc_telephone != null){
		                    		if (sc_telephone.split("-").length == 3 ) {
				                    	tel_1 = sc_telephone.substring(0, sc_telephone.indexOf("-"));
				                        tel_2 = sc_telephone.substring(sc_telephone.indexOf("-")+1, sc_telephone.lastIndexOf("-"));
				                        tel_3 = sc_telephone.substring(sc_telephone.lastIndexOf("-")+1);
			                    	}	
		                    	}
		                    	
		                    }
		                  %>				
					</tr>
					<tr>
						<th scope="row"><label for="sgis_census_req_tel_1">연락처<span class="listFonts">*</span></label></th>
						<td class="bnr4">
						<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { //신청 상태일 경우 %>
										<!-- 2017.10.20 [개발팀] css추가  -->
										<span><input type="text" name="sgis_census_req_tel_1" id="sgis_census_req_tel_1" title="연락처 앞번호" maxlength="3" 		class="input_use05 inp" value="<%=tel_1 %>" onkeyup="chkNumber(this)" <%=tag %> /></span> - 
										<span><input type="text" name="sgis_census_req_tel_2" id="sgis_census_req_tel_2" title="연락처 가운데번호" maxlength="4" 	class="input_use05 inp" value="<%=tel_2 %>" onkeyup="chkNumber(this)" <%=tag %>  /></span> - 
										<span><input type="text" name="sgis_census_req_tel_3" id="sgis_census_req_tel_3" title="연락처 뒷번호" maxlength="4" 		class="input_use05 inp" value="<%=tel_3 %>" onkeyup="chkNumber(this)" <%=tag %>  /></span>
						<%}else{ //승인 또는 반려 상태일 경우 %>
							<%=tel_1 %>-<%=tel_2 %>-<%=tel_3 %>
						<%} %>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="sgis_census_req_company">소속<span class="listFonts">*</span></label></th>
						<td class="bnr4">
					<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { %>	
										<!-- 2017.10.20 [개발팀] css추가  -->
										<input type="text" name="sgis_census_req_company" id="sgis_census_req_company" title="소속" class="input_use01 inp" style="width:780px;" maxlength="20" value="<%if(StringUtil.isEmpty(sgis_census_req_status)) {%><%=sc_company_name %><%} else {%><%=sgis_census_req_company%><%} %>" <%=tag %> />
					<%}else{ %>
						<%if(StringUtil.isEmpty(sgis_census_req_status)) {%><%=sc_company_name %><%} else {%><%=sgis_census_req_company%><%} %>
					<%} %>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="sgis_census_req_email">메일주소<span class="listFonts">*</span></label></th>
						<td class="bnr4">
							<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { %>
											<!-- 2017.10.20 [개발팀] css추가  -->
					                		<input type="text" name="sgis_census_req_email" id="sgis_census_req_email" title="메일주소"  class="input_use01 inp" style="width:780px;" maxlength="100" value="<%if(StringUtil.isEmpty(sgis_census_req_status)) {%><%=sc_email %><%} else {%><%=sgis_census_req_email%><%} %>" <%=tag %> />
		                		<!-- 
		                		<a href="#" onclick="updateMemberInfoMail(); return false;"><img src="/contents/images/button_info.gif" alt="회원정보에반영"  height="20x"/></a>
								<br /><span style="color: #e85f5f">※ 연락이 필요할 수 있으니 정확히 기재바랍니다.</span>
								 -->
		            		<%}else{ //승인 또는 반려 상태일 경우 %>
								<%if(StringUtil.isEmpty(sgis_census_req_status)) {%><%=sc_email %><%} else {%><%=sgis_census_req_email%><%} %>
							<%} %>
						</td>					
					</tr>
					<tr>
						<th scope="row"><label for="sgis_census_req_sosok">소속구분<span class="listFonts">*</span></label></th>
						<td class="bnr4">
						<%if(!sgis_census_req_status.equals("A") && !sgis_census_req_status.equals("B")) { %>
										<!-- 2017.10.20 [개발팀] css추가  -->
										<select name="sgis_census_req_sosok" id="sgis_census_req_sosok" class="input_use02 select" style="width:250px;" title="소속구분">
									<option value="">= 선택 =</option>
								<%
			                       /******************************/
			                       /* 자료구분 */
			                       /******************************/
			                       try {                   	 
			                    	 
			                         broker = new GeneralBroker("ceaa00");
			                         lData.setString("PARAM", "CATEGORY_CODE");
			                         lData.setString("lclas_cl", "001");
			                         rm = broker.getList(lData);
			                         
			                         String sclas_cl = "";
		                        	 String sclas_nm = "";
			
			                         while(rm != null && rm.next()) {
			                        	 sclas_cl = StringUtil.verify((String)rm.get("sclas_cl"));
			                        	 sclas_nm = StringUtil.verify((String)rm.get("sclas_nm"));
			                   	%>
			                   		<option value="<%=sclas_cl %>" <%if(sclas_cl.equals(sgis_census_req_sosok)) { %>selected="selected"<%} %>><%=sclas_nm %></option>
				                   <%
				                         }
				                       } catch(Exception e) {
				                           System.out.print("sgisWebError : ");
				                         //2015-12-03 시큐어코딩
				                         //e.printStackTrace();
				                         //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				                       }
		                   %>		
							</select>	
							<%}else{ //승인 또는 반려 상태일 경우 %>
		            			<!-- 
								<%if(sgis_census_req_sosok.equals("001001")) { %>중앙행정기관<%} %>
								<%if(sgis_census_req_sosok.equals("001002")) { %>지방자치단체<%} %>
								<%if(sgis_census_req_sosok.equals("001003")) { %>공사/공단<%} %>
								<%if(sgis_census_req_sosok.equals("001004")) { %>학술기관<%} %>
								<%if(sgis_census_req_sosok.equals("001005")) { %>민간<%} %>
								 -->
								<%
			                       
			                       try {                   	 
			                    	 
			                         broker = new GeneralBroker("ceaa00");
			                         lData.setString("PARAM", "CATEGORY_CODE");
			                         lData.setString("lclas_cl", "001");
			                         rm = broker.getList(lData);
			                         
			                         String sclas_cl = "";
		                        	 String sclas_nm = "";
			
			                         while(rm != null && rm.next()) {
			                        	 sclas_cl = StringUtil.verify((String)rm.get("sclas_cl"));
			                        	 sclas_nm = StringUtil.verify((String)rm.get("sclas_nm"));
			                   %>
			                    		<%if(sclas_cl.equals(sgis_census_req_sosok)) { %><%=sclas_nm %><%} %>
			                   <%
			                         }
			                       } catch(Exception e) {
			                           System.out.print("sgisWebError : ");
			                         //2015-12-03 시큐어코딩
			                         //e.printStackTrace();
			                         //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			                       }
			                   %>
								
							<%} %>
						</td>
					</tr>
					<tr>
					 <%
                    /****************************/
                    /* 반려일 경우 반려사유 표시 */
                    /****************************/
                    if(sgis_census_req_status.equals("B") || sgis_census_req_status.equals("A")) {
                  %>
						<th scope="row"><label>승인/반려내용</label></th>
						<td class="bnr4"><br/><%=sgis_census_req_reject %>
							
                   <%} %>
                  <%if(StringUtil.isEmpty(sgis_census_req_status)) { %>
						<th scope="row"><label for="concur">제출동의</label></th>
						<td class="bnr4"><input type="checkbox" name="concur" id="concur" />&nbsp;제공된 자료에 대한 출처를 반드시 명시하고, 결과물이 완성되었을 때 통계청에<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사본 1부를 제출할 것을 동의합니다. (논문, URL 등) <br />
                  	&nbsp;&nbsp;&nbsp;&nbsp;* 동의하지 않을 경우 신청이 불가합니다.</br>
                  			※ 자료제공 신청 시, 신청된 정보는 <font color='blue'>통계갤러리 서비스에 비공개 저장</font> 됩니다.  
                  	<%}%>
                  		 
						</td>
					</tr>
					<tr>
						<th scope="row"><label>자료제공기간</label></th>
						<td>
							※ 자료 다운로드는 <font color='blue'><b>승인 후 일주일 동안</b></font>만 가능합니다.
						</td>
					</tr>
					</tbody>
				</table>
				<div class="btnbox">
				<%if(StringUtil.isEmpty(sgis_census_req_status)) { %>
					<input type="image" src="/contents/css/2014_css/img/btn/btn_application.png" alt="신청" />
				<%} else if(sgis_census_req_status.equals("S")) {%>
					<!-- 
		            <a href="/contents/shortcut/shortcut_05_03_apply.jsp" onclick="applyClicked(); return false;;"><img src="/contents/gsks/images/button_modify.gif" alt="수정" /></a>
		            <a href="shortcut_05_03_01.jsp" onclick="census_list(); return false;"><img src="/contents/gsks/images/button_list.gif" alt="목록" /></a>
		             -->
		            <a class="check4" href="/contents/shortcut/shortcut_05_03_apply.jsp" onclick="applyClicked(); return false;;">수정</a>
		            <a class="check4" href="shortcut_05_03_01.jsp" onclick="census_list(); return false;">목록</a>
		            		             
		        <%} else {%>
		        	<!-- 
		            <a href="shortcut_05_03_01.jsp" onclick="census_list('<%=lData.getString("retUrl") %>'); return false;"><img src="/contents/gsks/images/button_list.gif" alt="목록" /></a>
		            <a href="shortcut_05_01.jsp" onclick="census_list('shortcut_05_01.jsp'); return false;"><img src="/contents/images/download_button.gif" style="width:70px; margin-top:2px;" alt="다운로드" /></a>
		             -->
		            
		            <a class="check4" href="shortcut_05_03_01.jsp" onclick="census_list('<%=lData.getString("retUrl") %>'); return false;">목록</a>
		            <a class="check4" href="shortcut_05_01.jsp" onclick="census_list('shortcut_05_01.jsp'); return false;">자료다운로드</a>
		            
		        <%} %>
		        
		        	<br><br><br>
				</div>
	</form>
      		</div>
		

		<!-- //자료신청 -->
					<!-- center contents end -->
					</div>
					
				</div>
			</div><!-- cls:contents end -->
			
			
			
			<!-- cls:footer start -->
			<!-- <footer id="footer">
		     	 <script type="text/javascript"  src="/js/common/includeBottom.js"></script>
			</footer> -->
			<footer id="footer"> 
				<jsp:include page="/view/common/includeBottom"></jsp:include> 
			</footer>
			<!-- cls:footer end -->
		</div> 
		
		<!--/wrap-->
<%if(lData.getString("aT").equals("RET")) {%>
<!-- <script type="text/javascript">locationChanged();</script> -->
<%}%>
<%} %>
		
	</body>
</html>