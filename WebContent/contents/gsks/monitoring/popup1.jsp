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
    
%>

<html>
<head>
	<title>SGIS Open API 모니터링서비스</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/base.css" > 
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/popup.css" > 
</head>
<body onload="init();">
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery_chart.js"></script>
<script type="text/javascript">
	var monthData = "<%= notYear%>01";
	function windowClose(){
		window.close();
	}
	
	function init(){
//		$("#searchMonth").val("<%= nowDate.substring(4,6)%>").attr("selected","selected");

		jQuery.ajax({
			type:"POST", 
			url: "popup1YearUseCountExe.jsp",
			data:{"year":"<%=notYear %>" }, 
			success:function(data){
				jQuery('#yearUseCount').html(data);
				startMonth();
			},
			error:function(data) {
				
			}
		}); 
		
	
		
		
	}
	function startMonth(){
		jQuery.ajax({
			type:"POST",
			url: "popup1MonthUseCountExe.jsp",
			data:{"month":"<%=notYear %>01" },
			success:function(data){
				jQuery('#monthCount').html(data);
			},
			error:function(data) {
				
			}
		});
	}
	
	
	function yearUseCountAjax(){
		var paramData = $("#yearSelect").val();
		jQuery.ajax({
			type:"POST",
			url: "popup1YearUseCountExe.jsp",
			data:{"year":paramData },
			success:function(data){
				jQuery('#yearUseCount').html(data);
			},
			error:function(data) {
				alert(data);
			}
		});
		
	}
	
	function monthUseCountAjax(paramData){
		monthData = paramData;
		jQuery.ajax({
			type:"POST",
			url: "popup1MonthUseCountExe.jsp",
			data:{"month":paramData },
			success:function(data){ 
				jQuery('#monthCount').html(data);
			},
			error:function(data) {
				
			}
		});
	}

	function excelYearDownLoad(){
		paramData = $("#yearSelect").val();
		location.href("popup1YearUseCountExecel.jsp?year=" + paramData);
	}
	
	function excelMonthDownLoad(){
		paramData = monthData;
		location.href("popup1MonthUseCountExecel.jsp?month=" + paramData);
	}
	
	
	
</script>
<div class="popupWrap">
	<div class="popupTitle">
		<div class="titleFont">월별/일별 OpenAPI 사용 현황</div>
		<div class="pTBtn"><a href="javascript:windowClose();"><img src="/contents/css/monitoring/img/btn_x.png" alt="버튼" ></a></div>
	</div>
	<div class="contWrap">
		<form class="search" action="">
			<fieldset class="use_fieldset">
						<legend>월별/일별 OpenAPI 사용 현황</legend>
						<select id="yearSelect" name="yearSelect">
							<option><%=notYear %></option>
							<option><%=notYear-1 %></option>
							<option><%=notYear-2 %></option>
							<option><%=notYear-3 %></option>
						</select>년
						<span class="pSpan"></span>
						
						<img src="/contents/css/monitoring/img/btn_2.png" onclick="yearUseCountAjax()" alt="검색" >
			</fieldset>
		</form>
		<div class="tblWrapperL">
			<div class="tFont">[월별 사용횟수]</div>
			<div class="tBtn"><a href="javascript:excelYearDownLoad()"><img src="/contents/css/monitoring/img/btn_excel.png" alt="엑셀다운로드버튼"></a></div>
			<div class="tblWrapper01" style="overflow:auto; height:295px">
				<table class="tType01" summary="table">
						<colgroup>
						<col width="50%">
						<col width="50%">					
						</colgroup>
						<thead>
						<tr>
							<th scope="col" >월</th>
							<th scope="col" >활용횟수</th>						
						</tr>
						</thead>
						<tbody id="yearUseCount"> 
							<tr>
								<td></td>
								<td></td>						
							</tr>
						</tbody>
					</table>
			</div>
		</div>
		<div class="tblImg"><img src="/contents/css/monitoring/img/arrow.png" alt="화살표" ></div>
		<div class="tblWrapperR">
			<div class="tFont">[일별 사용횟수]</div>
			<div class="tBtn"><a href="javascript:excelMonthDownLoad()"><img src="/contents/css/monitoring/img/btn_excel.png" alt="엑셀다운로드버튼" ></a></div>
			<div class="tblWrapper01" style="overflow:auto; height:295px">
				<table class="tType01" summary="table">
						<colgroup>
						<col width="50%">
						<col width="50%">					
						</colgroup>
						<thead>
						<tr>
							<th scope="col" >일</th>
							<th scope="col" >활용횟수</th>						
						</tr>
						</thead>
						<tbody id="monthCount">
							<tr>
								<td></td>
								<td></td>						
							</tr>
						</tbody>
					</table>
			</div>
		</div>
	</div>			
</div>
</body>
</html>