
<%@ page language="java" contentType="application/vnd.ms-excel;charset=utf-8"%>
<%@ page import="java.math.BigDecimal"                  %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.jdf.db.DbManager"         %>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%@ include file="/contents/include/logger.jsp"%>
<%
	
	String syear = request.getParameter( "syear" );
  	String smonth = request.getParameter( "smonth" );
  	String smode = request.getParameter( "smode" );
	System.out.println("syear : " + syear );
	System.out.println("smonth : " + smonth );
	System.out.println("smode : " + smode );
	String filename = syear+"_" + smonth +"_";
	if(smode.equals("user")){
		filename += "방문자카운트.xls";
	}else if(smode.equals("page")){
		filename += "페이지카운트.xls";
	}else if(smode.equals("dbCnt")){
	    filename += "디비접속카운트.xls";
	}

	if(request.getHeader("User-Agent").indexOf("MSIE 5.5") > -1)
	{
	    response.setHeader("Content-Type", "doesn/matter;");
	    response.setHeader("Content-Disposition", "filename="+filename);
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename="+filename);
	    response.setHeader("Content-Description", "JSP Generated Data");
	}

	DbManager dbmgr           = null;
    RecordModel countSet    = null;
	String seperate = "";
	LData lData     = null;

	if(seperate.equals("")) lData     = new LData( request );
	else lData     = new LData( request,seperate);

	ConfigManager.getInstance();
	request.setCharacterEncoding("euc-kr");

    StringBuffer countQuery = new StringBuffer(1024);
  	String sdate = syear+smonth;

	try {   
		dbmgr = new DbManager();
		
		if(smode.equals("user")){
			countQuery.append(" select  nvl(sum(a.cnt),0) as P_SUM,																																					\n");
			countQuery.append("         nvl(max(a.cnt),0) as P_MAX,																																				\n");
			countQuery.append("         nvl(decode(count(a.cnt),decode('"+sdate+"',to_char(sysdate,'yyyymm'),extract(day from sysdate),to_char(last_day('"+sdate+"01'), 'DD')),min(a.cnt),0),0) as P_MIN, 	\n");
			countQuery.append("         nvl(decode('"+sdate+"',to_char(sysdate,'yyyymm'), trunc( sum(a.cnt) / extract(day from sysdate) ), trunc(sum(a.cnt)/ to_char(last_day('"+sdate+"01'),'DD'))), 0)  as P_AVE,						\n");
			countQuery.append("         a.code as P_CODE,																																								\n");
			countQuery.append("         b.sgis_service_name as CODE_NM																																								\n");
			countQuery.append("   from (																																										\n");
			countQuery.append("         select   nvl(count(sgis_access_date),0) as cnt, sgis_service_code as code, sgis_access_date 																																										\n");
			countQuery.append("         from sgis_unified_count																																					\n");
			countQuery.append("         where sgis_access_date like '"+sdate+"%'	and left(sgis_service_code,1) <> 'X'																																						\n");
			countQuery.append("         group by sgis_service_code, sgis_access_date																																				\n");
			countQuery.append("         union all  																																										\n");
			countQuery.append("         select   nvl(count(sgis_access_date),0) as cnt, '000000' as code , sgis_access_date  																																			\n");
			countQuery.append("         from ( 																																							\n");
			countQuery.append("                select  sgis_access_date  ,sgis_access_user_ip  ,sgis_member_key from sgis_unified_count																																			\n");
			countQuery.append("                where sgis_access_date like '"+sdate+"%'		and left(sgis_service_code,1) <> 'X'											\n");
			countQuery.append("          	   group by sgis_member_key, sgis_access_user_ip ,sgis_access_date 																																	\n");
			countQuery.append("       		   ) 																																		\n");
			countQuery.append("          where sgis_access_date like '"+sdate+"%'																																					\n");
			countQuery.append("          group by sgis_access_date																																				\n");
			countQuery.append("          ) a , sgis_service_div b  																																									\n");
			countQuery.append("         where a.code = b.sgis_service_code																																									\n");
			countQuery.append("         group by a.code, b.sgis_service_name ;																																									\n");
			
		}else if(smode.equals("page")){
			countQuery.append(" select  nvl(sum(a.total),0) as P_SUM,																																					\n");
			countQuery.append("         nvl(max(a.total),0) as P_MAX,																																				\n");
			countQuery.append("         nvl(decode(count(a.total),decode('"+sdate+"',to_char(sysdate,'yyyymm'),extract(day from sysdate),to_char(last_day('"+sdate+"01'), 'DD')),min(a.total),0),0) as P_MIN, 	\n");
			countQuery.append("         nvl(decode('"+sdate+"',to_char(sysdate,'yyyymm'), trunc( sum(a.total) / extract(day from sysdate) ), trunc(sum(a.total)/ to_char(last_day('"+sdate+"01'),'DD'))), 0)  as P_AVE,							\n");
			countQuery.append("         a.sgis_service_code as P_CODE,																																								\n");
			countQuery.append("         b.sgis_service_name as CODE_NM																																								\n");
			countQuery.append("   from (																																										\n");
			countQuery.append("         select   nvl(sum(sgis_access_cnt),0) as total, sgis_service_code, sgis_access_date 																																										\n");
			countQuery.append("         from sgis_unified_count																																					\n");
			countQuery.append("         where sgis_access_date like '"+sdate+"%'	and left(sgis_service_code,1) <> 'X'																																						\n");
			countQuery.append("          group by sgis_service_code, sgis_access_date																																				\n");
			countQuery.append("          ) a , sgis_service_div b  																																									\n");
			countQuery.append("          where a.sgis_service_code = b.sgis_service_code																																									\n");
			countQuery.append("         group by a.sgis_service_code, b.sgis_service_name ;																																									\n");		
		}else if(smode.equals("dbCnt")){
			countQuery.append(" select  nvl(sum(a.total),0) as P_SUM,																																					\n");
			countQuery.append("         nvl(max(a.total),0) as P_MAX,																																				\n");
			countQuery.append("         nvl(decode(count(a.total),decode('"+sdate+"',to_char(sysdate,'yyyymm'),extract(day from sysdate),to_char(last_day('"+sdate+"01'), 'DD')),min(a.total),0),0) as P_MIN, 	\n");
			countQuery.append("         nvl(decode('"+sdate+"',to_char(sysdate,'yyyymm'), trunc( sum(a.total) / extract(day from sysdate) ), trunc(sum(a.total)/ to_char(last_day('"+sdate+"01'),'DD'))), 0)  as P_AVE,							\n");
			countQuery.append("         a.sgis_service_code as P_CODE,																																								\n");
			countQuery.append("         b.sgis_service_name as CODE_NM																																								\n");
			countQuery.append("   from (																																										\n");
			countQuery.append("         select   nvl(sum(sgis_access_cnt),0) as total, sgis_service_code, sgis_access_date 																																										\n");
			countQuery.append("         from sgis_unified_count																																					\n");
			countQuery.append("         where sgis_access_date like '"+sdate+"%'  and left(sgis_service_code,1) = 'X'							\n");
			countQuery.append("          group by sgis_service_code, sgis_access_date																																				\n");
			countQuery.append("          ) a , sgis_service_div b  																																									\n");
			countQuery.append("          where a.sgis_service_code = b.sgis_service_code																																									\n");
			countQuery.append("         group by a.sgis_service_code, b.sgis_service_name ;																																									\n");
		}
		
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
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
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
  <table width="100%" cellpadding="0" cellspacing="1" border=1>
    <thead>
      <tr>
        <th class="td_top">날짜</th>
        <th class="td_top">서비스명</th>
        <th class="td_top">코드명</th>
        <th class="td_top">건수</th>
        <th class="td_top">최대</th>
        <th class="td_top">최저</th>
        <th class="td_top">평균</th>
      </tr>
    </thead>
    <tbody>
<%
try {
	String titlenm = "";
	String P_SUM = "";
	String P_MAX = "";
	String P_MIN = "";
	String P_AVE = "";
	String P_CODE = "";
	String pDate = syear+"년" + smonth +"월";
	while(countSet != null && countSet.next()) {
		titlenm = countSet.get("CODE_NM").toString();
		P_SUM = countSet.get("P_SUM").toString();
		P_MAX = countSet.get("P_MAX").toString();
		P_MIN = countSet.get("P_MIN").toString();
		P_AVE = countSet.get("P_AVE").toString();
		P_CODE = countSet.get("P_CODE").toString();
%>
      <tr>
        <td align="center"><%=pDate%></td>
        <td align="center"><%=titlenm %></td>
        <td align="center"><%=P_CODE %></td>
        <td align="center"><%=P_SUM %></td>
        <td align="center"><%=P_MAX %></td>
        <td align="center"><%=P_MIN %></td>
        <td align="center"><%=P_AVE %></td>

      </tr>
<%		
		}
}catch(Exception e){
	//2015-12-03 시큐어코딩
	//e.printStackTrace();
	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
}
%>

    </tbody>
  </table>
</body>
</html>