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
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
	<title>SGIS Open API 모니터링서비스</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/base.css" /> 
	<link rel="stylesheet" type="text/css" media="all" href="/contents/css/monitoring/css/popup.css" /> 
	<script language="javascript" type="text/javascript" src="/contents/scripts/main/jquery_chart.js"></script>
</head>
<body onload="init();">
<script type="text/javascript">
	function windowClose(){
		window.close();
	}
	
	function init(){
		$("#searchMonth").val("<%= nowDate.substring(4,6)%>").attr("selected","selected");
		
		var basicSearch = $("#yearSelect").val() + $("#searchMonth").val();
		
		jQuery.ajax({
			type:"POST", 
			url: "popup2UseCount.jsp",
			data:{"month":basicSearch }, 
			success:function(data){
				jQuery('#apiCount').html(data);
			},
			error:function(data) {
				
			}
		});
	}
	
	function search(){
		var searchMonth = $("#yearSelect").val() + $("#searchMonth").val();
		var useName = $("#apiUseName").val();
		jQuery.ajax({
			type:"POST", 
			url: "popup2UseCount.jsp",
			data:{"month":searchMonth,
				  "useName":useName	
			}, 
			success:function(data){
				jQuery('#apiCount').html(data);
			},
			error:function(data) {
				
			}
		});
	}
	
	function excelDown(){
	//	paramData = $("#yearSelect").val() + $("#searchMonth").val();
		
		
		var fm = document.searchForm;
		fm.action = 'popup2UseCountExcel.jsp';
		fm.submit();
		
		return false;
	//	location.href("popup2UseCountExcel.jsp?month=" + paramData);
	}
</script>
<div class="popupWrap">
	<div class="popupTitle">
		<div class="titleFont">사용자별 활용순위</div>
		<div class="pTBtn"><a href="javascript:windowClose();"><img src="/contents/css/monitoring/img/btn_x.png" alt="버튼"/></a></div>
	</div>
	<div class="contWrap">
		<form class="search" id="searchForm" name="searchForm" action="" method="post">
			<fieldset class="use_fieldset">
						<legend>OpenAPI별 활용순위</legend>
						<select id="yearSelect" id="searchYear" name="searchYear">
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
						<span class="pSpan3">서비스명</span>
						<input type="text" title="검색어입력" class="use_searchinput" id="apiUseName" name="apiUseName" onkeydown="if(event.keyCode==13){return false;}"/>
						<img src="/contents/css/monitoring/img/btn_2.png" alt="검색" onclick="search();" />
			</fieldset>
		</form>
		<div class="tblWrapper" >
			<div class="tFont">[OpenAPI별 사용횟수]</div>
			<div class="tBtn"><a href="javascript:excelDown();"><img src="/contents/css/monitoring/img/btn_excel.png" alt="엑셀다운로드버튼"/></a></div>
			<div class="tblWrapper01"  style="overflow:auto; height:295px">
				<table class="tType01" summary="table">
						<colgroup>
						<col width="25%"/>
						<col width="20%"/>
						<col width="30%"/>
						<col width="24.9%"/>
						</colgroup>
						<thead>
						<tr>
						</tr>
						<tr>
							<th scope="col" >API KEY</th>
							<th scope="col" >사용자명</th>						
							<th scope="col" >홈페이지</th>
							<th scope="col" >활용횟수</th>
						</tr>
						</thead>
						<tbody id="apiCount">
						</tbody>
					</table>
			</div>
		</div>
	

		
			
	</div>			



</div>






</body>
</html>