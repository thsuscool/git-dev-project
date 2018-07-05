<%@ page language="java" contentType="text/html;charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>

<%@page import="java.util.Calendar" %>
<%@page import="java.text.NumberFormat" %>

<%
    
    String nowDate = DateTime.getShortDateString();
    NumberFormat clsNf = NumberFormat.getInstance();
    
    int notYear = Integer.parseInt(nowDate.substring(0, 4));
    int nowMonth = Integer.parseInt(nowDate.substring(0, 6));
    
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
	<title>SGIS Open API 모니터링서비스</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/base.css" /> 
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/popup.css" /> 
</head>
<body onload="init();">
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery_chart.js"></script>
<script type="text/javascript">
var monthData = "<%= notYear%>01";
var paramData = "";
var text = "";
function windowClose(){
	window.close();
}

function init(){
	$("#searchMonth").val("<%= nowDate.substring(4,6)%>").attr("selected","selected");

	jQuery.ajax({
		type:"POST", 
		url: "popup4UseCount.jsp",
		data:{"month":"<%=nowMonth %>" }, 
		success:function(data){
			jQuery('#serviceUseCount').html(data);
		},
		error:function(data) {
			
		}
	});
	
	
}


function apiUseCountAjax(){
	paramData = $("#yearSelect").val() + $("#searchMonth").val();
	text = $("#searchText").val();
	jQuery.ajax({
		type:"POST",
		url: "popup4UseCount.jsp",
		data:{"month":paramData,
			  "serviceName":text},
		success:function(data){
			jQuery('#serviceUseCount').html(data);
		},
		error:function(data) {
			alert(data);
		}
	});
	
}

function excelDownLoad(){
	
	var fm = document.searchForm;
	fm.action = 'popup4UseCountExcel.jsp';
	fm.submit();
	
	return false;
//	location.href("popup3UseCountExcel.jsp?month=" + paramData + "&serviceName="+text);
}


</script>
<div class="popupWrap">
	<div class="popupTitle">
		<div class="titleFont">월별 모바일 사용현황</div>
		<div class="pTBtn"><a href="javascript:windowClose();"><img src="/contents/css/monitoring/img/btn_x.png" alt="버튼"/></a></div>
	</div>
	<div class="contWrap">
		<form class="search" id="searchForm" name="searchForm" method="post">
			<fieldset class="use_fieldset"> 
						<legend>월별/일별 OpenAPI 사용 현황</legend>
						<select id="yearSelect" name="yearSelect">
							<option><%=notYear %></option>
							<option><%=notYear-1 %></option>
							<option><%=notYear-2 %></option>
							<option><%=notYear-3 %></option>
						</select>년
						<select title="카테고리선택" id="searchMonth" name="searchMonth">
							<option value="01">01</option>
							<option value="02">02</option>
							<option value="03">03</option>
							<option value="04">04</option>
							<option value="05">05</option>
							<option value="06">06</option>
							<option value="07">07</option>
							<option value="08">08</option>
							<option value="09">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>월
						<span class="pSpan2"></span>
						<img src="/contents/css/monitoring/img/btn_2.png"  onclick="apiUseCountAjax()" alt="검색" />
			</fieldset>
		</form>
		<div class="tblWrapper">
			<div class="tFont">[모바일 사용횟수]</div>
			<div class="tBtn"><a href="javascript:excelDownLoad()"><img src="/contents/css/monitoring/img/btn_excel.png" alt="엑셀다운로드버튼"/></a></div>
			<div class="tblWrapper01" style="overflow:auto; height:295px">
				<table class="tType01" summary="table">
						<colgroup>
						<col width="50%"/>
						<col width="50%"/>
						</colgroup>
						<thead>
						<tr>
						</tr>
						<tr>
							<th scope="col" >날자</th>
							<th scope="col" >이용수</th>						
						</tr>
						</thead>
						<tbody id="serviceUseCount">
						</tbody>
					</table>
			</div>
		</div>
	

		
			
	</div>			



</div>






</body>
</html>