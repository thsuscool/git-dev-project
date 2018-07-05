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
	
	String detail_what = lData.getString("detail_what");
	String sgis_census_year = request.getParameter("sgis_census_year");
	String search_word = request.getParameter("search_word");
	
	String sgis_census_id = "";
	String sgis_census_data_id = "";
	String detail_name = "";
	
	if ("oa_in".equals(detail_what)) { //통계자료(1), 인구(0)
		sgis_census_id = "1";
		sgis_census_data_id = "0";
		detail_name = "집계구별 통계(인구)";
	} else if ("oa_ga".equals(detail_what)) { //통계자료(1), 가구(1)
		sgis_census_id = "1";
		sgis_census_data_id = "1";
		detail_name = "집계구별 통계(가구)";
	} else if ("oa_ho".equals(detail_what)) { //통계자료(1), 주택(2)
		sgis_census_id = "1";
		sgis_census_data_id = "2";
		detail_name = "집계구별 통계(주택)";
	} else if ("oa_cp".equals(detail_what)) { //통계자료(1), 사업체(3)
		sgis_census_id = "1";
		sgis_census_data_id = "3";
		detail_name = "집계구별 통계(사업체)";
		
		
	//=============================================================================================
	
	} else if ("bnd_all".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(전체) (0)
		sgis_census_id = "2";
		sgis_census_data_id = "0";
		detail_name = "센서스용 행정구역경계(전체)";
	} else if ("bnd_sido".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(시도) (1)
		sgis_census_id = "2";
		sgis_census_data_id = "1";
		detail_name = "센서스용 행정구역경계(시도)";		
	} else if ("bnd_sigungu".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(시군구) (2)
		sgis_census_id = "2";
		sgis_census_data_id = "2";
		detail_name = "센서스용 행정구역경계(시군구)";
	} else if ("bnd_dong".equals(detail_what)) { //통계지역경계(2), 센서스용 행정구역경계(읍면동) (3)
		sgis_census_id = "2";
		sgis_census_data_id = "3";
		detail_name = "센서스용 행정구역경계(읍면동)";
	} else if ("bnd_ua".equals(detail_what)) { //통계지역경계(2), 도시화지역(4)
		sgis_census_id = "2";
		sgis_census_data_id = "4";
		detail_name = "도시화지역";
	} else if ("bnd_ma".equals(detail_what)) { //통계지역경계(2), 도시권경계(5)
		sgis_census_id = "2";
		sgis_census_data_id = "5";
		detail_name = "도시권경계";
	} else if ("bnd_oa".equals(detail_what)) { //통계지역경계(2), 집계구경계(6)
		sgis_census_id = "2";
		sgis_census_data_id = "6";
		detail_name = "집계구경계";
	//=============================================================================================
			
			
	} else if ("db_schema".equals(detail_what)) { //센서스지도(3), DB설계(0)
		sgis_census_id = "3";
		sgis_census_data_id = "0";
		detail_name = "DB설계";
	} else if ("bas_river".equals(detail_what)) { //센서스지도(3), 하천(1)
		sgis_census_id = "3";
		sgis_census_data_id = "1";
		detail_name = "하천";
	} else if ("bas_bldg".equals(detail_what)) { //센서스지도(3), 건물(2)
		sgis_census_id = "3";
		sgis_census_data_id = "2";
		detail_name = "건물";
	} else if ("bas_road".equals(detail_what)) { //센서스지도(3), 도로(3)
		sgis_census_id = "3";
		sgis_census_data_id = "3";
		detail_name = "도로";
	} else if ("bas_rail".equals(detail_what)) { //센서스지도(3), 철도(4)
		sgis_census_id = "3";
		sgis_census_data_id = "4";
		detail_name = "철도";
	} else if ("bas_cntr".equals(detail_what)) { //센서스지도(3), 등고(5)
		sgis_census_id = "3";
		sgis_census_data_id = "5";
		detail_name = "등고";
	}
%>


<tbody id="search_result">

   		<%
   			try {
   				


   				broker = new GeneralBroker("ceaa00");
   				lData.setString("PARAM", "SIGUNGU_DETAIL_DATA_RESULT");
   				
   				lData.setString("sgis_census_id", sgis_census_id);
   				lData.setString("sgis_census_data_id", sgis_census_data_id);
   				lData.setString("sgis_census_year", sgis_census_year);
   				lData.setString("search_word", search_word);
   				
   				rm = broker.getList(lData);
   				
   				String sgis_census_meaning = "";
   				String sgis_census_file = "";

	   			while(rm.next()) {
	   				sgis_census_meaning = String.valueOf(rm.get("sgis_census_meaning"));
	   				sgis_census_file = String.valueOf(rm.get("sgis_census_file"));
	   		%>
	   				<tr>
				        <td width="370" class="tl"><%=sgis_census_meaning %></td>
				        <td width="220" class="tl t_end"><%=sgis_census_file %></td> 
				    </tr>
					  
	   		<%
	   			} //while
			%>
	   		
	   		<%
    		} catch(Exception e) {
   				System.out.print("sgisWebError : ");
   			//2015-12-03 시큐어코딩
   			//e.printStackTrace();
   			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
   			} 
  			%>

</tbody>