<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>센서스 공간통계 자료조회:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
</head>
<body>
<form name="censusFm" method="post" action="">
<table border="0" cellpadding="0" cellspacing="0">
		<%
			GeneralBroker broker = null;
			DbManager dmg = null;
			RecordModel rm = null;
			RecordModel rm1 = null;
			
			String sgis_census_id = "";
			String sgis_census_name = "";
			String sgis_census_data_id = "";
			String sgis_census_data_name = "";
			String years = "";
			int count=0;
		 	try {
		 		
		 		broker = new GeneralBroker("ceaa00");
				lData.setString("PARAM", "CENSUS_APPLY_INFO");
				rm = broker.getList(lData);
				
				while(rm != null && rm.next()) {
					sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
					sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
					sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
					sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
					
					lData.setString("PARAM", "CENSUS_APPLY_AVAILABLE_YEAR_GROUP");
					lData.setString("sgis_census_id",sgis_census_id);
					lData.setString("sgis_census_data_id",sgis_census_data_id);
					rm1 = broker.getList(lData);
					years = "";
					while(rm1 != null && rm1.next()) {
						years += StringUtil.verify((String)rm1.get("sgis_census_req_year")) + ",";
					}			   
				
				%>
			<tr><td><%=sgis_census_name %> > <%=sgis_census_data_name %></td></tr>
			<tr><td><%=years %></td></tr>
		<%		
				
				System.out.println(count);
				count++;
				}
		 		   	
		   	} catch(Exception e) {
		     	System.out.print("sgisWebError : ");
		     	//2015-12-03 시큐어코딩
		     	//e.printStackTrace();
		     	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		   	}
		
		%>
		
</table>
</form>	
</body>
</html>