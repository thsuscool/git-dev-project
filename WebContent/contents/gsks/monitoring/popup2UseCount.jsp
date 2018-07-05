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
	String useName = request.getParameter("useName");
	if(useName == null || "".equals(useName)){
		useName = "";
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
		
		countQuery.append("	select	\n");
		countQuery.append("	    substr(a.api_process_date, 0, 6) as api_process_date,			\n");
		countQuery.append("	    sum(a.use_count) as use_count ,			\n");
		countQuery.append("	    a.api_auth_key,			\n");
		countQuery.append("	    b.api_use_name,			\n");
		countQuery.append("	    b.api_server_ip  			\n");
		countQuery.append("	from			\n");
		countQuery.append("	    sgis_api_log_group a			\n");
		countQuery.append("	left outer join sgis_api_auth_key_grant b			\n");
		countQuery.append("	on a.api_auth_key = b.api_auth_key			\n");
		countQuery.append(" where a.api_process_date like '" + month +"%' 												\n");
		if(useName != null && !"".equals(useName)){
			countQuery.append(" and b.api_use_name like '%" + useName + "%'												\n");
		}
		countQuery.append("	group by substr(a.api_process_date, 0, 6), a.api_auth_key, b.api_use_name, b.api_server_ip		\n");
			countQuery.append(" order by use_count desc												\n");

		dbmgr.prepareStatement(countQuery.toString(), lData);
		countSet = dbmgr.select();
    
    
    } catch( Exception e ) {
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    } finally {
    	dbmgr.close();
    }
		
	String api_auth_key="";
	String api_use_name="";
	String use_count="";
	String api_server_ip = "";
	
	int apiSum = 0;
	
	while(countSet != null && countSet.next()) {
		if(countSet.get("api_auth_key") != null){
			api_auth_key = countSet.get("api_auth_key").toString();
		}else{
			api_auth_key = "";
		}
		if(countSet.get("api_use_name") != null){
			api_use_name = countSet.get("api_use_name").toString();
		}else{
			api_use_name="";
		}
		if(countSet.get("use_count") != null){
			use_count = countSet.get("use_count").toString();
		}else{
			use_count="";
		}
		if(countSet.get("api_server_ip") != null){
			api_server_ip = countSet.get("api_server_ip").toString();
		}else{
			api_server_ip="";
		}
	
    	
    	
    //	api_process_date = clsNf.format(Integer.parseInt(api_process_date));
    	
    	apiSum = apiSum + Integer.parseInt(use_count);
    	use_count = clsNf.format(Integer.parseInt(use_count));
    	
%>
	<tr>
		<td><%= api_auth_key %></td>
		<td><%= api_use_name %></td> 
		<td><%= api_server_ip %></td>
		<td><%= use_count %></td>
	</tr>
<%
    }
%>
	<tr>
		<td class="color" colspan="3">합계</td>
		<td><%= clsNf.format(apiSum) %></td>
	</tr>
