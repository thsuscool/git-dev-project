<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	
	System.out.println("[gsks_01_04_03_reload_data.jsp] =========================== 시작 ===========================");

	GeneralBroker broker = null;
	RecordModel rm = null;
	//String sgis_census_data_id1 = lData.getString("sgis_census_data_id");
	
	
	
	int resultFlag =  0;

	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "RELOAD_DATA");
		
		resultFlag = broker.process(Const.P_INS, lData);
						

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
			
