<%@page language="java" contentType="text/xml;charset=euc-kr" pageEncoding="euc-kr"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%@ include file="/contents/include/logger.jsp"%>
<%	
	ConfigManager.getInstance();
	request.setCharacterEncoding("euc-kr");
	String funny_domain = "http://sgis.nso.go.kr";
	/*******************************/
	/* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
	/*******************************/
	String seperate = StringUtil.fromDB(request.getParameter("seperate"));
	LData lData     = null;
	
	if(seperate.equals("")) lData     = new LData( request );
	else lData     = new LData( request,seperate);
	
  	DbManager dbmgr           = null;
    RecordModel countSet    = null;
    StringBuffer countQuery = new StringBuffer(1024);
  
  	String syear = request.getParameter( "syear" );
  	String smonth = request.getParameter( "smonth" );
  	String smode = request.getParameter( "smode" );
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
		
		System.out.println(countQuery);
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
<?xml version='1.0' encoding='euc-kr'?>

<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%><root>
<% 
	String titlenm = "";
	String P_SUM = "";
	String P_MAX = "";
	String P_MIN = "";
	String P_AVE = "";
	String P_CODE = "";
	while(countSet != null && countSet.next()) {
		titlenm = countSet.get("CODE_NM").toString();
		P_SUM = countSet.get("P_SUM").toString();
		P_MAX = countSet.get("P_MAX").toString();
		P_MIN = countSet.get("P_MIN").toString();
		P_AVE = countSet.get("P_AVE").toString();
		P_CODE = countSet.get("P_CODE").toString();
%>
	<item>
	<P_SUM><![CDATA[<%=P_SUM%>]]></P_SUM>
	<P_MAX><![CDATA[<%=P_MAX%>]]></P_MAX>
	<P_MIN><![CDATA[<%=P_MIN%>]]></P_MIN>
	<P_AVE><![CDATA[<%=P_AVE%>]]></P_AVE>
	<CODE_NM><![CDATA[<%=titlenm%>]]></CODE_NM>
	<P_CODE><![CDATA[<%=P_CODE%>]]></P_CODE>
	</item>
<%  } %>
</root>