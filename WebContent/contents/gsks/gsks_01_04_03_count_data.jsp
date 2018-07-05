<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%-- 
------------------------------------------------------------
"1통계자료"		0	집계구별 통계(인구)
				1	집계구별 통계(가구)
				2	집계구별 통계(주택)
				3	집계구별 통계(사업체)
------------------------------------------------------------
"2통계지역경계"	0	센서스용 행정구역경계(전체)
				1	
				2		
				3		
				4	도시화 지역
				5	도시권 경계
				6	집계구경계
------------------------------------------------------------
"3센서스지도"		0	DB설계
				1	하천
				2	건물
				3	도로
				4	철도
				5	등고
------------------------------------------------------------
--%>


<%

	String count_what = request.getParameter("count_what");
	String sgis_census_year = request.getParameter("sgis_census_year");

	GeneralBroker broker = null;
	RecordModel rm = null;

	String sgis_census_id = "";
	String sgis_census_data_id = "";
	
	if ("oa_in".equals(count_what)) { //통계자료(1), 인구(0)
		sgis_census_id = "1";
		sgis_census_data_id = "0";
	} else if ("oa_ga".equals(count_what)) { //통계자료(1), 가구(1)
		sgis_census_id = "1";
		sgis_census_data_id = "1";
	} else if ("oa_ho".equals(count_what)) { //통계자료(1), 주택(2)
		sgis_census_id = "1";
		sgis_census_data_id = "2";
	} else if ("oa_cp".equals(count_what)) { //통계자료(1), 사업체(3)
		sgis_census_id = "1";
		sgis_census_data_id = "3";
		
	//=============================================================================================
	} else if ("bnd_all".equals(count_what)) { //통계지역경계(2), 센서스용 행정구역경계(전체) (0)
		sgis_census_id = "2";
		sgis_census_data_id = "0";
	} else if ("bnd_sido".equals(count_what)) { //통계지역경계(2), 센서스용 행정구역경계(시도) (1)
		sgis_census_id = "2";
		sgis_census_data_id = "1";
	} else if ("bnd_sigungu".equals(count_what)) { //통계지역경계(2), 센서스용 행정구역경계(시군구) (2)
		sgis_census_id = "2";
		sgis_census_data_id = "2";
	} else if ("bnd_sido".equals(count_what)) { //통계지역경계(2), 센서스용 행정구역경계(읍면동) (3)
		sgis_census_id = "2";
		sgis_census_data_id = "3";
	} else if ("bnd_ua".equals(count_what)) { //통계지역경계(2), 도시화지역(4)
		sgis_census_id = "2";
		sgis_census_data_id = "4";
	} else if ("bnd_ma".equals(count_what)) { //통계지역경계(2), 도시권경계(5)
		sgis_census_id = "2";
		sgis_census_data_id = "5";
	} else if ("bnd_oa".equals(count_what)) { //통계지역경계(2), 집계구경계(6)
		sgis_census_id = "2";
		sgis_census_data_id = "6";
	//=============================================================================================
		
	} else if ("db_schema".equals(count_what)) { //센서스지도(3), DB설계(0)
		sgis_census_id = "3";
		sgis_census_data_id = "0";
	} else if ("bas_river".equals(count_what)) { //센서스지도(3), 하천(1)
		sgis_census_id = "3";
		sgis_census_data_id = "1";
	} else if ("bas_bldg".equals(count_what)) { //센서스지도(3), 건물(2)
		sgis_census_id = "3";
		sgis_census_data_id = "2";
	} else if ("bas_road".equals(count_what)) { //센서스지도(3), 도로(3)
		sgis_census_id = "3";
		sgis_census_data_id = "3";
	} else if ("bas_rail".equals(count_what)) { //센서스지도(3), 철도(4)
		sgis_census_id = "3";
		sgis_census_data_id = "4";
	} else if ("bas_cntr".equals(count_what)) { //센서스지도(3), 등고(5)
		sgis_census_id = "3";
		sgis_census_data_id = "5";
	}

	

	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_COUNT_DATA");
		lData.setString("sgis_census_id", sgis_census_id);
		lData.setString("sgis_census_data_id", sgis_census_data_id);
		lData.setString("sgis_census_year", sgis_census_year);
		rm = broker.getList(lData);
		
		String count_data = ""; 

		while(rm != null && rm.next()) {
			count_data = String.valueOf((Integer)rm.get("count_data"));
%>
   			<center style='color:#0e4d9c;' id='<%=count_what%>'><%=count_data%></center>
<%		
			cnt++;
		}
		if(cnt == 0) {
%>
			<center style='color:black;' id='<%=count_what%>'>0</center>
<%			
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>

			
