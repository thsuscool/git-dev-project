<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String sgis_census_data_name = request.getParameter("sgis_census_data_name");
	String sgis_census_year = request.getParameter("sgis_census_year");
%>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	String sgis_census_data_id1 = lData.getString("sgis_census_data_id");
%>
		<!-- 2017.10.20 [개발팀] css 추가 -->
		<select class="w100 select" name="sgis_census_data_id" id="sgis_census_data_id1"  onchange="yearView2('sgis_census_id1','sgis_census_data_id1','sgis_census_year1','inUse1','years1');  ">
			<option value="">= 선택 =</option>
<%
	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "DATA_CODE");
		rm = broker.getList(lData);
		
		

		while(rm != null && rm.next()) {
			String sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			String sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_name"));
%>
			<option value="<%=sgis_census_data_id %>" <%if(sgis_census_data_id1.equals(sgis_census_data_id)) { %>selected="selected"<%} %>><%=sgis_census_name %></option>
<%
		}
%>
		 </select>
<%
						

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
			
