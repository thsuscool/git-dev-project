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
	
	<select name="sgis_census_year_id" id="sgis_census_year1" class="w100" title="년도"  onchange="sido('sgis_census_id1','sgis_census_data_id1', this.value,'inUse1','years1'); " >
		<option value="" >=선택=</option>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_AVAILABLE_YEAR_SUPPLY");
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



<script type="text/javascript" language="javascript">
//시도 콤보박스
function sido(val1,val2,val3,val4,val5) {
	
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_03_sido.jsp",
		data:{"sgis_census_id": document.getElementById(val1).value, "sgis_census_data_id": document.getElementById(val2).value,
			  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3,
			  "inUse": val4, "years": val5},
		success:function(data){
			//alert("회원정보에 반영되었습니다.");
			$('#option_sido').html(data);//alert(data);
		},
		error:function(data) {
			
		}
	});
}
</script>
