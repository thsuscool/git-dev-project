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
	
	String year_sido = lData.getString("year_sido");
	String sgis_census_id = lData.getString("sgis_census_id");
	String sgis_census_data_id = lData.getString("sgis_census_data_id");
	
	String base_year = "";
	String sido_cd = "";
	System.out.println("year_sido [" + year_sido);
	if ( !"".equals(year_sido) ) {
		base_year = year_sido.substring(0,4);
		sido_cd = year_sido.substring(4);
	}
%>
	<!-- 2017.10.20 [개발팀] css추가 -->
	<select name="sgis_census_sigungu_id" id="sgis_census_sigungu1" class="w70 select" title="시군구"  >
		<option value="" >=선택=</option>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_AVAILABLE_SIGUNGU");
		lData.setString("sgis_census_req_id", sgis_census_req_id);
		lData.setString("base_year", base_year);
		lData.setString("sido_cd", sido_cd);
		lData.setString("sgis_census_id", sgis_census_id);
		lData.setString("sgis_census_data_id", sgis_census_data_id);
		
		rm = broker.getList(lData);

		while(rm != null && rm.next()) {
			String sigungu_cd = StringUtil.verify((String)rm.get("sgis_census_sigungu"));
			String sigungu_nm = StringUtil.verify((String)rm.get("sigungu_nm"));
%>
   			<option value="<%=sigungu_cd%>"><%=sigungu_nm%></option>
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



