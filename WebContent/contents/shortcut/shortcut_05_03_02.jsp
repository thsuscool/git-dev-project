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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>센서스 공간통계 자료신청:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
</head>
<body>
<form name="censusFm" method="post" action="">
<table border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td>
<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	String sgis_census_data_id1 = lData.getString("sgis_census_data_id");
%>
                    <select class="w70" name="sgis_census_data_id" onchange="parent.locationChanged('<%=sgis_census_data_name %>');alert('aa');
                    											 parent.resetData('<%=sgis_census_year %>');
                    											 parent.yearView2('sgis_census_id1','sgis_census_data_id1','sgis_census_year1','inUse1','years1');
                    											">
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
			
		</td>
	</tr>
</table>
</form>	
</body>
</html>