<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@ include file="/contents/include/logger.jsp"%>

<html>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%

  String P_CODE = request.getParameter("P_CODE");
  String syear = request.getParameter("syear");
  String smonth = request.getParameter("smonth");

  String sdate = syear+smonth;
  DbManager dbmgr           = null;
  RecordModel countSet    = null;
  StringBuffer countQuery = new StringBuffer(1024);
  

  Calendar cal = Calendar.getInstance();
	cal.setTime( new Date(System.currentTimeMillis()));
	String date = new SimpleDateFormat("yyyy").format(cal.getTime());
	System.out.println(date+"ddddd");
	String tableNM = "_"+syear; 
	if(syear.equals(date)){
		tableNM = ""; 
	}
    try {
		dbmgr = new DbManager();
		
		if(P_CODE.equals("1")){
			countQuery.append("select left(api_process_time,8) as dd, count(*) as total  from  sgis_api_log"+tableNM+" \n");
			countQuery.append("where  (api_auth_key like 'ESGA%')  \n");
			countQuery.append("and (api_process_time like '"+sdate+"%')\n");
			countQuery.append("group by  left(api_process_time,8); \n");
		}else if(P_CODE.equals("2")){
			countQuery.append("select substr(api_process_time,0,8) as dd,count(*) as total \n");
			countQuery.append("from sgis_api_log"+tableNM+" \n");
			countQuery.append("where api_process_time like '"+sdate+"%' \n");
			countQuery.append("group by substr(api_process_time,0,8); \n");
		}else{
			countQuery.append("select left(api_process_time,8) as dd , count(*) as total  from  sgis_api_log"+tableNM+" \n");
			countQuery.append("where (api_auth_key ='SGIS2011101952956623' or api_auth_key='SGIS2011101955161960') \n");
			countQuery.append("and (api_process_time like '"+sdate+"%') \n");
			countQuery.append("group by  left(api_process_time,8);  \n");			
		}
	
		
		System.out.println(countQuery);
		dbmgr.prepareStatement(countQuery.toString());
		countSet = dbmgr.select();
    
    
    } catch( Exception e ) {
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    } finally {
    	dbmgr.close();
    }
    
    String[][] data = new String[31][2];
    for(int i=0; i < data.length; i++){
    	   data[i][0]= String.valueOf(i);
    	   data[i][1]= "0";
    }
    
    while(countSet != null && countSet.next()) {
		String dd = countSet.get("dd").toString();
		dd= dd.substring(6,8);
		String sum  = countSet.get("total").toString();
        data[Integer.parseInt(dd)-1][1]= sum;
    }
      
%>





<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>일별 카운트 페이지</title>
<link rel="stylesheet" type="text/css"
	href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css"
	href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css"
	href="/contents/css/quick/style.css">
<script type="text/javascript">
	function selfClose() {
		window.close();
	}
</script>
</head>
<body>
	<br />
	<a href="#" onclick="selfClose()"><span
		style="font-size: 12px; font-weight: bold; color: red; margin-left: 50px;">닫기</span>
	</a>
	<br />
	<table class="bbs_list_02" id="countTable"
		style="width: 110px; margin-left: 20px;">
		<caption>서비스 카운터</caption>
		<colgroup>
			<col width="width:50px" />
			<col width="width:60px" />

		</colgroup>
		<thead>
			<tr>
				<th>날 짜</th>
				<th class="tc t_end">방문자수</th>
			</tr>
		</thead>
		<tbody>
			<%
  for(int i=0;i<data.length; i++){
 %>
			<tr>
				<td><%=i+1%></td>
				<td class="tc t_end"><%=data[i][1] %></td>
			</tr>

			<% 
  }
%>
		</tbody>

	</table>
</body>
</html>