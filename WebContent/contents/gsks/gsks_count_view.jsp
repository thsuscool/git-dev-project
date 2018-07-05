<%@ page language="java" contentType="text/html;charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%!
  /**
   * @desc  문자열 가공
   * @param String originalStr 대상 문자
   *        String appendStr   덧붙일 문자
   *        int    size        분기될 문자열 길이
   */
  String getProcessCharacter(String originalStr, String appendStr, int size) {

    if(originalStr.length() == size) {

      originalStr = appendStr + originalStr;
    }
    return originalStr;
  }
%>
<%
	String req_year_month = lData.getString("req_year_month");
	String fromYear  = lData.getString("from_yy");
	String fromMonth = lData.getString("from_mm");
	
	int year      ;
	int month     ;
	if (req_year_month.equals("")) {
	  String toDate = DateTime.getShortDateString();
	  year      = NumberUtil.toInt(toDate.substring(0, 4));
	  month     = NumberUtil.toInt(toDate.substring(4, 6));
	}else{
	  year      = NumberUtil.toInt(req_year_month.substring(0, 4));
	  month     = NumberUtil.toInt(req_year_month.substring(5, 7));
	}
	if(StringUtil.isEmpty(fromYear))	fromYear  = Integer.toString(year);
	if(StringUtil.isEmpty(fromMonth))	fromMonth = Integer.toString(month);
	
	fromMonth = getProcessCharacter(fromMonth, "0", 1);
	
	String monthParam = null;
	String yearParam = null;
	yearParam = request.getParameter("year");
	monthParam = request.getParameter("month");
	if(monthParam != null){
		fromYear = yearParam; 
		fromMonth = monthParam; 
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>통계지리 정보서비스 관리자</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/quick/style.css">
<script type="text/javascript" src="/contents/search/jslb_ajax_euckr.js" language="javascript" ></script>
<script type="text/javascript" language="javascript">
var syear = null;
var smonth = null;
var smode = null;
function strUtilTrim(pm_sStr){
	//alert("1");
 	return pm_sStr.replace(/^\s+|\s+$/g,"");
}
function xmlParse(xml) {
	//alert("2");
    var dom;
    try {
      if(window.ActiveXObject){
        dom = new ActiveXObject("Microsoft.XMLDOM");
      }else{
        dom = document.implementation.createDocument("","",null);
      }

        dom.async = false;
        dom.loadXML(xml);
    } catch (error) {
        try {
            var parser = new DOMParser();
            dom = parser.parseFromString(xml, "text/xml");
            delete parser;
        } catch (error2) {
            if (debug)
                alert("XML parsing is not supported.");
        }
    }
    return dom;
}

function Kairos_Count(){
	 syear = document.getElementById("from_yy").value;
	 smonth = document.getElementById("from_mm").value;
	 smode = document.getElementById("mode").value;
	var url = "/contents/gsks/proxy_sgis_unified_count.jsp?syear="+syear+"&smonth="+smonth+"&smode="+smode;
	
	sendRequest(callBack_Count, '', 'GET', url, true, true);
}

function date_count(P_CODE){
      
     var syear = document.getElementById("from_yy").value;
	 var smonth = document.getElementById("from_mm").value;
	 var smode = document.getElementById("mode").value;

     window.open("${pageContext.request.contextPath}/contents/gsks/count_view_popup.jsp?syear="+syear+"&smonth="+smonth+"&smode="+smode+"&P_CODE="+P_CODE+"&",'eng','width=160, height=500, scrollbars=1, resizable=1');
		 
			 
	
}
var xmlType;
function callBack_Count(oj){
	xmlType = oj.responseText;
	document.getElementById("excelTable").value = xmlType;
	var reXmlText=strUtilTrim(oj.responseText);
	while(reXmlText.indexOf('\n') > -1 || reXmlText.indexOf('\t') > -1) {
		reXmlText=reXmlText.replace('\n', '').replace('\t', '');
	}
	var lm_oXML = xmlParse(reXmlText);
	var lm_sResultList = lm_oXML.getElementsByTagName("item");

	for(var i=0; i < lm_sResultList.length; i++){
		var lm_sResult = lm_sResultList.item(i);
		var P_SUM = lm_sResult.getElementsByTagName("P_SUM").item(0).firstChild.nodeValue;
		var P_MAX = lm_sResult.getElementsByTagName("P_MAX").item(0).firstChild.nodeValue;
		var P_MIN = lm_sResult.getElementsByTagName("P_MIN").item(0).firstChild.nodeValue;
		var P_AVE = lm_sResult.getElementsByTagName("P_AVE").item(0).firstChild.nodeValue;
		var CODE_NM = lm_sResult.getElementsByTagName("CODE_NM").item(0).firstChild.nodeValue;
		var P_CODE= lm_sResult.getElementsByTagName("P_CODE").item(0).firstChild.nodeValue;
		addTable(P_SUM,P_MAX,P_MIN,P_AVE,CODE_NM ,P_CODE);
	}
}

function addTable(P_SUM,P_MAX,P_MIN,P_AVE,CODE_NM,P_CODE){
	var myTable = document.getElementById("countTable");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	var year = document.getElementById("from_yy").value;
	var month = document.getElementById("from_mm").value;
	
	var row = document.createElement("tr");
	var cell = document.createElement("td");

	var node = document.createTextNode(year+"."+month);
	cell.appendChild(node);
	row.appendChild(cell);



	cell = document.createElement("td");
	node = document.createTextNode(CODE_NM);
	var aTag = document.createElement("a");
	aTag.setAttribute("href", "#");
	aTag.onclick = function(){
		date_count(P_CODE);
	}
	aTag.appendChild(node);
	cell.appendChild(aTag);
	row.appendChild(cell);

	cell = document.createElement("td");
	node = document.createTextNode(P_CODE);
	cell.appendChild(node);
	row.appendChild(cell);

	

	cell = document.createElement("td");
	node = document.createTextNode(P_SUM);
	cell.appendChild(node);
	row.appendChild(cell);

	cell = document.createElement("td");
	node = document.createTextNode(P_MAX);
	cell.appendChild(node);
	row.appendChild(cell);

	cell = document.createElement("td");
	node = document.createTextNode(P_MIN);
	cell.appendChild(node);
	row.appendChild(cell);

	cell = document.createElement("td");
	cell.setAttribute("class","t_end");
	cell.setAttribute("className","t_end");
	node = document.createTextNode(P_AVE);
	cell.appendChild(node);
	row.appendChild(cell);

	
	myTbody.appendChild(row);
}

function delTable(){
	var myTable = document.getElementById("countTable");
	var myTbody = myTable.getElementsByTagName("tbody")[0];
	var len = myTbody.rows.length;
	for(var i=0; i<len; i++){
		myTbody.deleteRow(0);
	}
}

function init(){
	delTable();
	Kairos_Count();
	
}
function m_sgis_count(){
	var ym = '?year='+syear+'&month='+smonth+'&mode='+smode;
	location.href='${pageContext.request.contextPath}/contents/gsks/gsks_count_view.jsp'+ym;
}
function m_api_count(){
	//var ym = '?year='+syear+'&month='+smonth+'&mode='+smode;
	//location.href='${pageContext.request.contextPath}/contents/gsks/gsks_count_view2.jsp'+ym;
	location.href='${pageContext.request.contextPath}/contents/gsks/monitoring/monitoring.jsp';
}
function excelDownload() {
	var fm = document.countForm;
	fm.action = 'gsks_count_excel.jsp';
	fm.target = 'excelFrame';
	fm.submit();
}
</script>
</head>
<body onload="init();" style="width: 100%;">
<center>
<br>
 <div>
  		<font size="4">
  		<label onclick="m_sgis_count()"> 통계지리카운트 </label> ::
  		<label onclick="m_api_count()"> API 카운트 </label>
  		</font>

  </div>
<form name="countForm" method="post" >
<input type="hidden" name="excelTable" id="excelTable" />
<div style="padding:10px 0px 10px 0px;">
	<select name="mode" id="mode">
	<%
	boolean mode1=false,mode2=false, mode3=false;
	if(request.getParameter("mode")!=null){
		 if(request.getParameter("mode").equals("user")){
	    	 mode1=true;
	     };
	     if(request.getParameter("mode").equals("page")){
	    	 mode2=true;
	     };
		 if(request.getParameter("mode").equals("dbCnt")){
	    	 mode3=true;
	     };
	}
	%>
		<option value="user" <%=mode1 ? "selected" : "" %>>방문자</option>
		<option value="page" <%=mode2 ? "selected" : "" %>>페이지뷰</option>
		<option value="dbCnt" <%=mode3 ? "selected" : "" %>>DB이용건수</option>
	</select>
<%
  String showValue = "";
%>
    <select name="from_yy" id="from_yy">
<%
  for(int i=(NumberUtil.toInt(fromYear)-5); i<(NumberUtil.toInt(fromYear)+5); i++) {
%>
      <option value="<%=i %>" <%=i == NumberUtil.toInt(fromYear) ? "selected" : "" %>><%=i %>년</option>
<%} %>
    </select>
    <select name="from_mm" id="from_mm">
<%

  for(int i=1; i<13; i++) {
    showValue = getProcessCharacter(Integer.toString(i), "0", 1);
%>
      <option value="<%=showValue %>"<%=i == NumberUtil.toInt(fromMonth) ? "selected" : "" %>><%=showValue %>월</option>
<%} %>
    </select>
    <img src="/contents/gsks/images/popup_button_search.gif" align="middle" onclick="init();" style="cursor:pointer;"/>
    <a href="#" onclick="excelDownload();"><img src="/contents/gsks/images/admin_button_download_excel.gif" alt="엑셀다운로드" width="100" height="22" border="0" align="absmiddle"></a>
  </div>
<table class="bbs_list_02" id="countTable">
	<caption>서비스 카운터</caption>
   	<colgroup>
   		<col width="width:100px" />
   		<col width="width:200px" />
   		<col width="width:70px" />
   		<col width="width:70px" />
   		<col width="width:70px" />
   		<col width="width:70px" />
   		<col width="width:70px" />
   	</colgroup>
	<thead>
		<tr>
			<th	>날 짜 </th>
			<th >서비스명</th>
			<th >코드명</th>
			<th >건 수</th>
		    <th>최대</th>
			<th>최저</th>
			<th class="tc t_end">평균</th>
		</tr>
	</thead>
	<tbody>
		
	</tbody>
</table>
<br />

</form>


</center>
<iframe name="excelFrame" src="" frameborder=0 width=0 height=0></iframe>
</body>
</html>