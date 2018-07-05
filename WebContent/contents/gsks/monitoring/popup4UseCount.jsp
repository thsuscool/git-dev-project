<%@ page language="java" contentType="text/html;charset=utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
	ConfigManager.getInstance();
	request.setCharacterEncoding("utf-8");
	String month = request.getParameter("month");
	String serviceName = request.getParameter("serviceName");
	if(serviceName == null || "".equals(serviceName)){
		serviceName = "";
	}
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
		

		countQuery.append("select 														\n");
		countQuery.append("    api_process_date,										\n");
		countQuery.append("    sum(use_count) as use_count								\n");
		countQuery.append("from															\n");
		countQuery.append("    sgis_api_log_group										\n");
		countQuery.append("where														\n");
		countQuery.append("    api_auth_key = 'SGIS2011101952956623'					\n");
		countQuery.append("and substr(api_process_date, 0, 6) = '" + month +"'				\n");
		countQuery.append("group by api_process_date									\n");
		
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
		
		int totalCount = 0;
		
    while(countSet != null && countSet.next()) {
    	api_process_date = countSet.get("api_process_date").toString();
    	use_count = countSet.get("use_count").toString();
    	
    	
    	String dateView = api_process_date.substring(0,4)+"." + api_process_date.substring(4,6)+ "." + api_process_date.substring(6);
    	
    	totalCount = totalCount + Integer.parseInt(use_count);
    	use_count = clsNf.format(Integer.parseInt(use_count));
    	
%>
	<tr>
		<td><%= dateView %></td>
		<td><%= use_count %></td>
	</tr>
<%
    }
%>
	<tr>
		<td class="color">합계</td>
		<td><%= clsNf.format(totalCount) %></td>
	</tr>
