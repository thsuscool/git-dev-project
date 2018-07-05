<%@ page language="java" contentType="application/vnd.ms-excel;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>
 
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%@page import="java.util.Calendar" %>
<%@page import="java.text.NumberFormat" %>

<%@ include file="/contents/include/logger.jsp"%>

<%
	response.setHeader("Content-Type","Application/vnd.ms-excel;charset=utf-8");
	response.setHeader("Content-Disposition","attachment;filename=YearCount.xls");
	
	ConfigManager.getInstance();
	request.setCharacterEncoding("utf-8");
	String year = request.getParameter("year");
	/*******************************/
	/* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
	/*******************************/
	 LData lData     = null;
	  String seperate = StringUtil.fromDB(request.getParameter("seperate"));
	  
	if(seperate.equals("")) lData     = new LData( request );
	else lData     = new LData( request,seperate);
	
  	DbManager dbmgr           = null;
    RecordModel countSet    = null;
    StringBuffer countQuery = new StringBuffer(1024);
    
    String nowDate = DateTime.getShortDateString();
    
    NumberFormat clsNf = NumberFormat.getInstance();
    
	try {
    	countQuery.delete(0, countQuery.length());
		dbmgr = new DbManager();
		
			countQuery.append(" select 																						\n");
			countQuery.append("     substring(api_process_date, 0, 6) as api_process_date, 									\n");
			countQuery.append("     sum(use_count) as use_count 															\n");
			countQuery.append("	from  sgis_api_log_group																	\n");
			countQuery.append(" where api_process_date like '" + year +"%' 														\n");
			countQuery.append("  group by substring(api_process_date, 0, 6)													\n");
			countQuery.append("  																							\n");
	
		dbmgr.prepareStatement(countQuery.toString(), lData);
		countSet = dbmgr.select();
    
    
    } catch( Exception e ) {
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    } finally {
    	dbmgr.close();
    }
		
		String api_process_date="";
		String use_count="";
		
		int yearSum = 0;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<title></title>
<style type='text/css'>

.table1 {margin:5px 0px 0px 0px; padding:0px; border-collapse:collapse;}
.table1 caption{display: none;}
.table1 th{color:#33698f; background-color:#e3f0f9; border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px; font-size:12px;}
.table1 td{font-weight:normal;text-align:justify;  border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px;}
.table1 .t_end{ border-right:none; }
.table1 .td_top{ border-top:2px solid #72aacf;}
.table1 .td_bottom{ border-bottom:none;}
.table1 .cell_left {text-align:left;}
.table1 .cell_right{text-align:right;}
.table1 .cell_center{text-align:center;}
.table1 .cell_point {background:#f3faff;}
.table1 a:link{font-weight:normal;}
.table1 a:active{font-weight:normal;}
.table1 a:visited{font-weight:normal;}
.table1 a:hover{font-weight:normal;}

</style>
</head>
<body>
	
<table width="15%" border=0 cellpadding="0" cellspacing="0" class="table1"  >
  <thead>
      <tr>
        <th class="td_top" >년월</th>
        <th class="t_end td_top" >활용횟수</th>
      </tr>
    </thead>

    <tbody>
<%
		
    while(countSet != null && countSet.next()) {
    	api_process_date = countSet.get("api_process_date").toString();
    	use_count = countSet.get("use_count").toString();
    	
    	
    //	api_process_date = clsNf.format(Integer.parseInt(api_process_date));
    	yearSum = yearSum + Integer.parseInt(use_count);
    	
    	use_count = clsNf.format(Integer.parseInt(use_count));
    	
    	String dateView = api_process_date.substring(0,4)+"년" + api_process_date.substring(4,6) + "월";
%>
	<tr>
		<td><%= dateView %></td>
		<td><%= use_count %></td>
	</tr>
<%
    }
	int avr = 0;
	if(countSet.getRowCount() == 0){
		avr = 0;
	}else{
		avr = yearSum/countSet.getRowCount();
	}
%>
	<tr>
		<td class="color">합계</td>
		<td><%= clsNf.format(yearSum) %></td>
	</tr>
	<tr>
		<td class="color">평균</td>
		<td><%= clsNf.format(avr)%></td>
	</tr>
	</tbody>
	</table>
	</body>