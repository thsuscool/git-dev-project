<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	//String sgis_census_data_id1 = lData.getString("sgis_census_data_id");
	
	String checked_id = request.getParameter("checked_id");
	String[] sgis_census_req_id = checked_id.split(",");
	
	int resultFlag =  0;

	try {

		broker = new GeneralBroker("ceaa00");
		
		for( int i=0; i < sgis_census_req_id.length; i++) {
			lData.setString("PARAM", "APPROVAL_CANCEL_DATA");
			lData.setString("sgis_census_req_id", sgis_census_req_id[i]);
			resultFlag = broker.process(Const.P_UPD, lData);
		}
		
						

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
			
