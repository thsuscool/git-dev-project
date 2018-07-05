<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String sgis_census_year_id = request.getParameter("sgis_census_year");
	String inUseId = request.getParameter("inUse");
	String yearsId = request.getParameter("years");
%>


<%
	GeneralBroker broker = null;
	RecordModel rm = null;

	String sgis_census_req_id = lData.getString("sgis_census_req_id");
	if(StringUtil.isEmpty(sgis_census_req_id))  sgis_census_req_id = "-1";
%>
	<!-- 2017.10.20 [개발팀] css추가 -->
	<select name="sgis_census_year_id2" id="sgis_census_year2" class="w40 select" title="년도" onchange="sido('sgis_census_id1','sgis_census_data_id1', this.value,'inUse1','years1'); " >
		<option value="" >=선택=</option>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_AVAILABLE_YEAR");
		lData.setString("sgis_census_req_id", sgis_census_req_id);
		rm = broker.getList(lData);

		while(rm != null && rm.next()) {
			String sgis_census_year = StringUtil.verify((String)rm.get("sgis_census_year"));
			//String sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
%>
   			<option value="<%=sgis_census_year%>"><%=sgis_census_year%></option>
<%		
			cnt++;
		}
		if(cnt == 0) {
%>
			<!-- <option >N/A</option> -->
<%			
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
	</select>

