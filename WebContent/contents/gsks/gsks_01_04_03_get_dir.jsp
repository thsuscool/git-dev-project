<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%

	GeneralBroker broker = null;
	RecordModel rm = null;
	
	String sgis_census_id = lData.getString("sgis_census_id");
	String sgis_census_data_id = lData.getString("sgis_census_data_id");
	String sgis_census_year = lData.getString("sgis_census_year");
	String sgis_census_sido = lData.getString("sgis_census_sido");
		   sgis_census_sido = sgis_census_sido.substring(4);
	String sgis_census_sigungu = lData.getString("sgis_census_sigungu");
	String sgis_census_dir = "";
	
   		
   		try {
   	
   				broker = new GeneralBroker("ceaa00");
   				lData.setString("PARAM", "CENSUS_AVAILABLE_FILE_SUPPLY");
   				
   				lData.setString("sgis_census_id", sgis_census_id);
   				lData.setString("sgis_census_data_id", sgis_census_data_id);
   				lData.setString("sgis_census_year", sgis_census_year);
   				lData.setString("sgis_census_sido", sgis_census_sido);
   				lData.setString("sgis_census_sigungu", sgis_census_sigungu);
   				
   				rm = broker.getList(lData);
   				
   			while(rm.next()) {
   				sgis_census_dir = String.valueOf(rm.get("sgis_census_dir"));
   		%>
   				<%=sgis_census_dir%>
   		<%
   			}
		%>
   		
   		<%
    		} catch(Exception e) {
   				System.out.print("sgisWebError : ");
	   			//2015-12-03 시큐어코딩
	   			//e.printStackTrace();
	   			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
   			} 
  		%>
		