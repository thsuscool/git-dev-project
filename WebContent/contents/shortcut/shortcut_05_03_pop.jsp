<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;
	RecordModel rm2 = null;
	String sgis_census_id = "";				//센서스 자료 ID
	String sgis_census_name = "";			//대상자료명
	String sgis_census_data_id = "";		//센서스자료구분코드
	String sgis_census_data_name = "";
	String sgis_census_req_company = "";
	String sgis_census_req_tel = "";
	String sgis_census_req_goal = "";
	String sgis_census_req_file = "";
	String sgis_census_req_status = "";
	String sgis_census_req_reject = "";
	String sgis_census_location = "";
	String sgis_census_req_app_date = "";
	String years = "";	
	int count = 0;

	
	// CODE
	String r_sgis_census_id = "";
	String r_sgis_census_name = "";	
	
	if(lData.getString("aT").equals("RET")) {
	    try {

			broker = new GeneralBroker("ceaa00");
			lData.setString("PARAM", "CENSUS_APPLY_INFO");
			rm = broker.getList(lData);
			
			while(rm != null && rm.next()) {
			   sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			   sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
			   sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			   sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
			   sgis_census_req_company = StringUtil.verify((String)rm.get("sgis_census_req_company"));
			   sgis_census_req_company = sgis_census_req_company.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
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
			}
			
			lData.setString("PARAM", "CENSUS_APPLY_AVAILABLE_YEAR");
			rm1 = broker.getList(lData);
			
			while(rm1 != null && rm1.next()) {
			  years += StringUtil.verify((String)rm1.get("sgis_census_req_year")) + ", ";
			}

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
<title>자료선택</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/pop.css" />
<script type="text/javascript" language="javascript">
//<![CDATA[
function selectDetailData(val, val2, val3, val4) {
	
	//alert(document.getElementById(val));
	//debugger;
	//alert(val2);
	//alert(document.getElementById(val2).value);
	document.getElementById(val).src ="shortcut_05_03_02.jsp?sgis_census_id="+document.getElementById(val2).value+"&sgis_census_data_name="+val+"&sgis_census_year="+val3+"&sgis_census_data_id="+val4;
	//detailMenuIfr.location.href ="shortcut_05_03_02.jsp?sgis_census_id="+document.censusFm.sgis_census_id.value;
	if(val4 == ''){
		resetData(val3);	//관련하위메뉴들 reset
	}
	//openSendStatus();
}

//관련자료 reset
function resetData(val3) {
  //document.censusFm.sgis_census_location.value = "";	//지역 reset
  document.getElementById(val3).value = "";	//연도 reset
}

//년도 선택
function yearClose() {
  var yd = document.getElementById("yearDiv");
  yd.style.display = "none";
}

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

// 자료선택추가
function addTable(){
	var myTable = document.getElementById("sgis_census_table");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	
	var idx = 0;
	idx = (myTbody.rows.length/2)+1;
	
	var row = document.createElement("tr");
	
	var cell = document.createElement("td");
	cell.setAttribute("rowSpan", "2");
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
	
	cell = document.createElement("td");

	try{
		input = document.createElement("<select name='sgis_census_id' id='"+selectId+"' title='자료구분' onchange='selectDetailData(\""+iframeId+"\",\""+selectId+"\",\""+yearId+"\",\"\")'>");
	}catch(e){
		input = document.createElement("select");
		input.setAttribute("name", "sgis_census_id");
		input.setAttribute("id", selectId);
		input.setAttribute("title", "자료구분");
		input.onchange=function(){selectDetailData(iframeId,selectId,yearId,'')};
	}
	var option1 = document.createElement("option");
	option1.setAttribute("value","");
	option1.innerHTML = "= 선택 =";
	input.appendChild(option1);
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
				option1 = document.createElement("option");
				option1.setAttribute("value","<%=r_sgis_census_id %>");
				option1.innerHTML = "<%=r_sgis_census_name %>";
				input.appendChild(option1);
	<%
			}
		} catch(Exception e) {
		   System.out.print("sgisWebError : ");
		 //2015-12-03 시큐어코딩
		 //e.printStackTrace();
		 logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
	%>
	cell.appendChild(input);
	row.appendChild(cell);

	cell = document.createElement("td");
	cell.setAttribute("class","tl t_end");
	cell.setAttribute("className","tl t_end");
	
	try{
		input = document.createElement("<iframe src='shortcut_05_03_02.jsp' id='"+iframeId+"' name='"+iframeName+"' frameBorder='0' width='100%' height='20' scrolling='no' title='년도선택 프레임' >");
	}catch(e){
		input = document.createElement("iframe");
		input.setAttribute("src", "shortcut_05_03_02.jsp");
		input.setAttribute("id", iframeId);
		input.setAttribute("name", iframeName);
		input.setAttribute("frameBorder", "0");
		input.setAttribute("width", "100%");
		input.setAttribute("height", "20");
		input.setAttribute("scrolling", "no");
		input.setAttribute("title", "년도선택 프레임");
	}
	cell.appendChild(input);

	try{
		input = document.createElement("<input type='hidden' name='"+iframeId+"' >");
	}catch(e){
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", iframeId);
	}
	cell.appendChild(input);
	row.appendChild(cell);
	
	
	myTbody.appendChild(row);
	
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
  
}
function delTable(){
	var mss = true;
	var myTable = document.getElementById("sgis_census_table");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	var len = myTbody.rows.length/2; 

	for(var i=1; i <= len; i++){
		if (document.getElementsByName("cbox")[i-1].checked == true) {
			myTbody.deleteRow(i*2-1);
			myTbody.deleteRow(i*2-2);
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

function applyClicked() {
	 var fm=document.censusFm;
	 var myTable = document.getElementById("sgis_census_table");
	 var myTbody = myTable.getElementsByTagName("tbody")[0];
	 var len = myTbody.rows.length/2;
	 if(len < 1){
		alert("자료를 하나이상 선택하세요.");
		addTable();
		return false;
	 }
	 for(var i = 1; i<=len; i++){
		  if(document.getElementsByName("sgis_census_id")[i-1].value == "") { //fm.sgis_census_id.value.trim()
		    alert("자료구분을 선택하세요.");
		    document.getElementsByName("sgis_census_id")[i-1].focus();
		    return false;
		  } else if(eval(document.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id") == undefined) {
		    alert("대상자료명을 선택하세요.");
		    eval(document.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id.focus()");
		    return false;
		  } else if(eval(document.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id.value") == "") {
		    alert("대상자료명을 선택하세요.");
		    eval(document.getElementsByTagName("iframe")[i-1].name+".document.censusFm.sgis_census_data_id.focus()");
		    return false;
		  } else if(document.getElementsByName("sgis_census_year")[i-1].value == "") {
		    alert("년도를 선택하세요.");
		    document.getElementsByName("sgis_census_year")[i-1].focus();
		    return false;
		  } else {
			  
		  }
	 }

	 for(var j= 1; j <= len-1; j++){
		for(var k= j+1; k <= len; k++){
			if(document.getElementsByName("sgis_census_id")[j-1].value == document.getElementsByName("sgis_census_id")[k-1].value){
				if(eval(document.getElementsByTagName("iframe")[j-1].name+".document.censusFm.sgis_census_data_id.value") == eval(document.getElementsByTagName("iframe")[k-1].name+".document.censusFm.sgis_census_data_id.value")){
					alert("신청 목록에 같은 분류의 신청이 있습니다.");
					document.getElementsByName("sgis_census_id")[k-1].focus();
					return false;
				}
			}
		}
	 }
	 var sgis_census_data_id = "";
	 for(var j= 1; j <= len; j++){
		 if (j==1) {
			 sgis_census_data_id = eval(document.getElementsByTagName("iframe")[j-1].name+".document.censusFm.sgis_census_data_id.value");
		 }else{
			 sgis_census_data_id = sgis_census_data_id + "-" +eval(document.getElementsByTagName("iframe")[j-1].name+".document.censusFm.sgis_census_data_id.value");
		 } 
		 fm.sgis_census_data_id.value= sgis_census_data_id;
	 }
	 
	 if(fm.aT.value == "RET"){
	     fm.action="/contents/shortcut/shortcut_05_03_pop_apply.jsp";
	     fm.submit();
	 }else{
	     fm.aT.value = "INS";
	     fm.action="/contents/shortcut/shortcut_05_03_pop_apply.jsp";
	     fm.submit();	
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
//]]>
</script>
</head>
<body>
<form name="censusFm" method="post" action="">
<input type="hidden" name="aT" value="<%=lData.getString("aT") %>" />
<input type="hidden" name="sgis_census_req_id" value="<%=lData.getString("sgis_census_req_id") %>" />
<input type="hidden" name="sgis_census_data_id" value="" />

<div id="popup_warp">
	<div id="contents">
	<fieldset class="popup_warp">
            <legend>자료선택</legend>
            <p class="cb pt10 wd600 pb10" >
            	<a href="#" onclick="addTable(); return false;"><img src="/contents/images/data_add.gif" alt="추가"/></a>
            	<a href="#" onclick="delTable(); return false;"><img src="/contents/images/data_del.gif" alt="삭제"/></a>
            </p>
            <table id="sgis_census_table" class="bbs_list_pop" summary="센서스경계 자료제공의  자료구분, 대상자료명, 년도를  보여드립니다.">
            	<caption>자료선택</caption>
            	<colgroup>
            		<col width="width:50px" />
            		<col width="width:150px" />
            		<col width="width:200px" />
            	</colgroup>
            	<thead>
            		<tr>
            			<th rowspan="2" scope="col" class="w50"><input type="checkbox" id="sgis_all" name="sgis_all" onclick="allCheck()" /></th>
            			<th scope="col" class="tc">자료구분</th>
            			<th scope="col" class="tc t_end">대상자료명</th>
            		</tr>
            		<tr>
            			<th colspan="3" scope="col" class="tc t_end">년도</th>
            		</tr>
            	</thead>
            	<tbody>
            	<% if (lData.getString("aT").equals("RET")) { 
            	
	    try {

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
            			<td rowspan="2"><input type="checkbox" id="a<%=count %>" name="cbox" /></td>
            			<td>
							<select name="sgis_census_id" id="sgis_census_id<%=count %>" class="w100" title="자료구분" onchange="selectDetailData('sgis_census_data_id<%=count %>','sgis_census_id<%=count %>','sgis_census_year<%=count %>','');">
							<option value="">= 선택 =</option>
							<%
								broker = new GeneralBroker("ceaa00");
								lData.setString("PARAM", "CODE");
								rm2 = broker.getList(lData);		
								while(rm2 != null && rm2.next()) {
									r_sgis_census_id = String.valueOf((BigDecimal)rm2.get("sgis_census_id"));
									r_sgis_census_name = StringUtil.verify((String)rm2.get("sgis_census_code_name"));
												
							%>
		                     <option value="<%=r_sgis_census_id %>" <%if(sgis_census_id.equals(r_sgis_census_id)) { %>selected="selected"<%} %>><%=r_sgis_census_name %></option>
							<%
								}
							%>		                     
							</select>
	                   </td>
	                   <td class="tl t_end">
	                   		<iframe src="shortcut_05_03_02.jsp" id="sgis_census_data_id<%=count %>" name="detailMenuIfr<%=count %>" frameborder="0" width="100%" height="20" scrolling="no" title="년도선택 프레임"></iframe>
	                 		<input type="hidden" name="sgis_census_data_id<%=count %>" value="" />
	                   </td>
            		</tr>
            		<tr>
            			<td colspan="2" class="tl t_end">
							<input type="image" src="/contents/images/sgis_year_select.gif" onclick="yearView('sgis_census_id<%=count %>','sgis_census_data_id<%=count %>','sgis_census_year<%=count %>','inUse<%=count %>','years<%=count %>'); return false;" title="새창열림" />
							<input type="text" name="sgis_census_year" id="sgis_census_year<%=count %>" title="년도" class="inp w301" value="<%=years %>" readonly="readonly" />
							<input type="hidden" name="inUse" id="inUse<%=count %>" value="Y"/>
							<input type="hidden" name="years" id="years<%=count %>" value="<%=years %>" />
							<script type="text/javascript" language="javascript">
	                   			selectDetailData('sgis_census_data_id<%=count %>','sgis_census_id<%=count %>','sgis_census_year<%=count %>','<%=sgis_census_data_id %>');
	                   		</script>
            			</td>
            		</tr>
		<%
			}
	    } catch(Exception e) {
			System.out.print("sgisWebError : ");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	    }
	    %>    	

            	<% } else { %>
            		<tr>
            			<td rowspan="2"><input type="checkbox" id="a1" name="cbox" /></td>
            			<td>
							<select name="sgis_census_id" id="sgis_census_id1" class="w100" title="자료구분" onchange="selectDetailData('sgis_census_data_id1','sgis_census_id1','sgis_census_year1','');">
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
	                   </td>
	                   <td class="tl t_end">
	                   		<iframe src="shortcut_05_03_02.jsp" id="sgis_census_data_id1" name="detailMenuIfr1" frameborder="0" width="100%" height="20" scrolling="no" title="년도선택 프레임"></iframe>
	                 		<input type="hidden" name="sgis_census_data_id1" value="" />
	                   </td>
            		</tr>
            		<tr>
            			<td colspan="2" class="tl t_end">
							<input type="image" src="/contents/images/sgis_year_select.gif" onclick="yearView('sgis_census_id1','sgis_census_data_id1','sgis_census_year1','inUse1','years1'); return false;" title="새창열림" />
							<input type="text" name="sgis_census_year" id="sgis_census_year1" title="년도" class="inp w301" value="<%=years %>" readonly="readonly" />
							<input type="hidden" name="inUse" id="inUse1" />
							<input type="hidden" name="years" id="years1" />
            			</td>
            		</tr>
            	
            	<% } %>
            	
            	</tbody>
            </table>
            <p class="cb tc pt10 wd600">
            	<a href="#" onclick="applyClicked(); return false;"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_02.gif" alt="저장"/></a>
            	<a href="#" onclick="window.close();"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_close.gif" alt="닫기"/></a>
            </p>
    </fieldset>
    </div>
</div>
</form>
</body>
</html>