<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.util.NumberUtil"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>

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

	if(request.getHeader("User-Agent").indexOf("MSIE 5.5") > -1)
	{
	    response.setHeader("Content-Type", "doesn/matter;");
	    response.setHeader("Content-Disposition", "filename=사용자리스트.xls");
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename=사용자리스트.xls");
	    response.setHeader("Content-Description", "JSP Generated Data");
	}

	ConfigManager.getInstance();
	request.setCharacterEncoding("utf-8");
	String year = request.getParameter("year");
	/*******************************/
	/* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
	/*******************************/
	
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
			countQuery.append(" where api_process_date like '" +year + "%' 														\n");
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
		
    while(countSet != null && countSet.next()) {
    	api_process_date = countSet.get("api_process_date").toString();
    	use_count = countSet.get("use_count").toString();
    	
    	
    //	api_process_date = clsNf.format(Integer.parseInt(api_process_date));
    	yearSum = yearSum + Integer.parseInt(use_count);
    	
    	use_count = clsNf.format(Integer.parseInt(use_count));
    	
    	String dateView = api_process_date.substring(0,4)+"." + api_process_date.substring(4);
%>
	<tr>
		<td><a href="javascript:monthUseCountAjax('<%= api_process_date %>')"><%= dateView %></a></td>
		<td><a href="javascript:monthUseCountAjax('<%= api_process_date %>')"><%= use_count %></a></td>
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