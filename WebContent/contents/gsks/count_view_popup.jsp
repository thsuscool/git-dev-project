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
  String smode = request.getParameter("smode");
  String sdate = syear+smonth;
  DbManager dbmgr           = null;
  RecordModel countSet    = null;
  StringBuffer countQuery = new StringBuffer(1024);
  
  
   

    try {
		dbmgr = new DbManager();
		
		if(smode.equals("user")){
			if(P_CODE.equals("000000")){
				countQuery.append("           select substring(sgis_access_date,7) as DD,  nvl(count(sgis_access_date),0) as TOTAL 											   \n");
				countQuery.append("           from (																														   \n");
				countQuery.append("                 select  sgis_access_date  ,sgis_access_user_ip  ,sgis_member_key from sgis_unified_count                                   \n");
				countQuery.append("                 where sgis_access_date like '"+sdate+"%'						                                                           \n");
				countQuery.append("                 group by sgis_member_key, sgis_access_user_ip ,sgis_access_date 						                                   \n");
				countQuery.append("                 )					                                                                                                       \n");
				countQuery.append("           where sgis_access_date like '"+sdate+"%'				                                                                           \n");
				countQuery.append("           group by sgis_access_date 				                                                                                       \n");
													
				
			}else{
			countQuery.append(" select substring(sgis_access_date,7) as DD, nvl(count(sgis_access_cnt),0) as TOTAL from sgis_unified_count																																					\n");
			countQuery.append("         where sgis_access_date like '"+sdate+"%'																																				\n");
			countQuery.append("         and sgis_service_code='"+P_CODE+"'                                           	\n");
			countQuery.append("        group by sgis_access_date 						                                   \n");
			}																							
			
		}else if(smode.equals("page")){
			countQuery.append(" select substring(sgis_access_date,7) as DD, nvl(sum(sgis_access_cnt),0) as TOTAL from sgis_unified_count																																					\n");
			countQuery.append("         where sgis_access_date like '"+sdate+"%'																																				\n");
			countQuery.append("         and sgis_service_code='"+P_CODE+"'                                           	\n");
			countQuery.append("        group by sgis_access_date 						                                   \n");
																										
			
		}else if(smode.equals("dbCnt")){
			countQuery.append(" select substring(sgis_access_date,7) as DD, nvl(sum(sgis_access_cnt),0) as TOTAL from sgis_unified_count																																					\n");
			countQuery.append("         where sgis_access_date like '"+sdate+"%'																																				\n");
			countQuery.append("         and sgis_service_code='"+P_CODE+"'                                           	\n");
			countQuery.append("        group by sgis_access_date 						                                   \n");
																										
			
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
		String dd = countSet.get("DD").toString();
		String sum  = countSet.get("TOTAL").toString();
        data[Integer.parseInt(dd)-1][1]= sum;
    }
      
%>
    




<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>일별 카운트 페이지</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/quick/style.css">
<script type="text/javascript">

 function selfClose(){
           window.close();
	 }
 

</script>
</head>
<body>
<br />
<a href="#" onclick="selfClose()" ><span style="font-size: 12px;font-weight: bold; color: red; margin-left: 50px;">닫기</span></a>
<br />
<table class="bbs_list_02" id="countTable" style="width: 110px; margin-left: 20px;">
	<caption>서비스 카운터</caption>
   	<colgroup>
   		<col width="width:50px" />
   		<col width="width:60px" />

   	</colgroup>
	<thead>
		<tr>
			<th	>날 짜 </th>
			<th class="tc t_end" >방문자수</th>
		</tr>
	</thead>
	<tbody>
<%
  for(int i=0;i<data.length; i++){
 %>
  <tr>
      <td><%=i+1%></td>
      <td class="tc t_end" ><%=data[i][1] %></td>
  </tr> 
	 
 <% 
  }
%>
	</tbody>

</table>
</body>
</html>