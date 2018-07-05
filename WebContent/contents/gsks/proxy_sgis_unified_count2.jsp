<%@page import="java.text.SimpleDateFormat"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page language="java" contentType="text/xml;charset=euc-kr" pageEncoding="euc-kr"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
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
  	String sdate = syear+smonth;
   
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
				countQuery.append("select 'API 월별 이용건수(전체)' as nm ,nvl(sum(total),0) as sum ,nvl(max(total),0) as max ,nvl(min(total),0) as min ,nvl(ceil(avg(total)),0) as avg   \n");       
				countQuery.append("from(select substr(api_process_time,0,8),count(*) as total                                                           \n");
				countQuery.append("from sgis_api_log"+tableNM+"                                                                                                    \n");
				countQuery.append(" with (nolock) \n");                                                                                                    
				countQuery.append("where api_process_time like '"+sdate+"%'                                                                             \n");
				countQuery.append("group by substr(api_process_time,0,8))                                                                               \n");
				countQuery.append("union                                                                                                                \n");
				countQuery.append("select 'API 월별 이용건수(외부이용자)',nvl(sum(total),0),nvl(max(total),0),nvl(min(total),0),nvl(ceil(avg(total)),0)                                    \n");
				countQuery.append("from(select left(api_process_time,8), count(*) as total  from  sgis_api_log"+tableNM+" with (nolock)                                         \n");
				countQuery.append("where api_process_time like '"+sdate+"%'                                                                               \n");
				countQuery.append("and api_auth_key like 'ESGA%'                                                                                      \n");
				countQuery.append("group by  left(api_process_time,8))                                                                                  \n");
				countQuery.append("union                                                                                                                \n");
				countQuery.append("select '모바일 서비스 이용건수' ,nvl(sum(total),0),nvl(max(total),0),nvl(min(total),0),nvl(ceil(avg(total)),0)                                          \n");
				countQuery.append("from(select left(api_process_time,8), api_auth_key, count(*) as total  from  sgis_api_log"+tableNM+" with (nolock)                            \n");
				countQuery.append("where api_process_time like '"+sdate+"%'                                                                               \n");
				countQuery.append("and api_auth_key ='SGIS2011101952956623'                                  \n");
				countQuery.append("group by left(api_process_time,8), api_auth_key                                                                      \n");
				countQuery.append(") ;                                                                                             \n");
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
		int i = 0 ;
	while(countSet != null && countSet.next()) {
		titlenm = countSet.get("nm").toString();
		P_SUM = countSet.get("sum").toString();
		P_MAX = countSet.get("max").toString();
		P_MIN = countSet.get("min").toString();
		P_AVE = countSet.get("avg").toString();
		i=i+1;
	
%>
	<item>
	<P_SUM><![CDATA[<%=P_SUM%>]]></P_SUM>
	<P_MAX><![CDATA[<%=P_MAX%>]]></P_MAX>
	<P_MIN><![CDATA[<%=P_MIN%>]]></P_MIN>
	<P_AVE><![CDATA[<%=P_AVE%>]]></P_AVE>
	<CODE_NM><![CDATA[<%=titlenm%>]]></CODE_NM>
	<P_CODE><![CDATA[<%=i%>]]></P_CODE>
	</item>
<%  } %>
</root>