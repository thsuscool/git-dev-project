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
	response.setHeader("Content-Disposition","attachment;filename=UserCount.xls");

	ConfigManager.getInstance();
	request.setCharacterEncoding("utf-8");
	String year = request.getParameter("searchYear");
	String month = request.getParameter("searchMonth");
	if(month == null || "".equals(month)){
		month = "";
	}
	if(year == null || "".equals(year)){
		year = "";
	}
	month = "" + year + month;
	String useName = request.getParameter("apiUseName");
	if(useName == null || "".equals(useName)){
		useName = "";
	}
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
		
		countQuery.append("	select			\n");
		countQuery.append("	    substr(a.api_process_date, 0, 6) as api_process_date,			\n");
		countQuery.append("	    sum(a.use_count) as use_count ,			\n");
		countQuery.append("	    b.api_auth_key,			\n");
		countQuery.append("	    b.api_use_name,			\n");
		countQuery.append("	    b.api_server_ip			\n");
		countQuery.append("	from			\n");
		countQuery.append("	    sgis_api_log_group a			\n");
		countQuery.append("	left outer join sgis_api_auth_key_grant b			\n");
		countQuery.append("	on a.api_auth_key = b.api_auth_key			\n");
		countQuery.append(" where a.api_process_date like '" + month +"%' 												\n");
		countQuery.append(" and b.api_use_name like '%" + useName + "%'												\n");
		countQuery.append("	group by substr(a.api_process_date, 0, 6), b.api_auth_key, b.api_use_name, b.api_server_ip			\n");

	
		dbmgr.prepareStatement(countQuery.toString(), lData);
		countSet = dbmgr.select();
    
    
    } catch( Exception e ) {
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    } finally {
    	dbmgr.close();
    }
		
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
        <th class="td_top" >ApiKey</th>
        <th class="td_top" >사용자명</th>
        <th class="td_top" >홈페이지</th>
        <th class="t_end td_top" >활용횟수</th>
      </tr>
    </thead>
    <tbody>
<%
		
	String api_auth_key="";
	String api_use_name="";
	String use_count="";
	String api_server_ip="";
	
	int apiSum = 0;
	
	while(countSet != null && countSet.next()) {
		api_auth_key = countSet.get("api_auth_key").toString();
	api_use_name = countSet.get("api_use_name").toString();
	use_count = countSet.get("use_count").toString();
	api_server_ip = countSet.get("api_server_ip").toString();
	
	
	//	api_process_date = clsNf.format(Integer.parseInt(api_process_date));
	
	apiSum = apiSum + Integer.parseInt(use_count);
	use_count = clsNf.format(Integer.parseInt(use_count));%>
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
		<th class="td_top" colspan="3">합계</th>
		<td><%= clsNf.format(apiSum) %></td>
	</tr>
	</tbody>
	</table>
	</body>
</html>
