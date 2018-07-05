<%@page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="sun.misc.BASE64Encoder" %>
<%@page import="sun.misc.BASE64Decoder" %>
<%@page import="java.net.*, java.io.*" %>
<%@page import="java.util.*" %>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<html>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;

	String sgis_census_req_id	= lData.getString("sgis_census_req_id");
	String sgis_census_id = "";
	String sgis_census_name = "";
	String sgis_census_data_id = "";
	String sgis_census_data_name = "";
	String sgis_census_req_app_date = "";
	String create_date = "";
	String sgis_census_req_status = "";
	String sgis_census_req_status_name = "";
	String sgis_member_key = "";
	String sgis_name = "";
	String sgis_member_id = "";
	String sgis_census_req_company = "";
	String sgis_census_req_tel = "";
	String sgis_census_req_file = "";
	String sgis_census_location = "";
	String sgis_census_req_goal = "";
	String sgis_census_req_reject = "";

	String years="";

	try {
		
		//System.out.println("shortcut_05_03_upd_tel.jsp 호출");
		//System.out.println("lData.getString(\"sgis_telephone\") [" + lData.getString("sgis_telephone"));
		//System.out.println("lData.getString(\"sgis_member_id\") [" + lData.getString("sgis_member_id"));
		

		broker = new GeneralBroker("ceaa00");
		
		lData.setString("PARAM", "UPDATE_MEMBER_INFO_TEL");
		broker.process(Const.P_UPD, lData);
		
		
		
		
		//========================== 아래 주석처리 부분은 코딩시 참조 ===============================

		/**************************************/
		/* 승인, 반려, 수정 처리 */
		/* 승인 : A, 반려 : B, 수정 : EDIT */
		/**************************************/
		/*
		
		broker = new GeneralBroker("ceaa00");
		
		if(lData.getString("aT").equals("UPD")) {

			//수정이 아닌경우 상태처리
			if(!lData.getString("approve_status").equals("EDIT")) {
				lData.setString("PARAM", "UPDATE_CENSUS_APPLY_STATUS");
				broker.process(Const.P_UPD, lData);
			}
			*/

			/************************/
			/* 서비스등록 */
			/************************/
			/*
			//승인이거나 수정일때
			if(lData.getString("approve_status").equals("A") || lData.getString("approve_status").equals("EDIT")) {

				//년도 및 게시일자 처리
				lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
				broker.process(Const.P_DEL, lData);

				lData.setString("PARAM", "CENSUS_APPLY_ST_ED_YEAR");
				broker.process(Const.P_INS, lData);
			}
		}
		*/

		/**************************************/
		/* 조회 */
		/**************************************/
		/*
		lData.setString("PARAM", "CENSUS_APPLY_INFO2");
		rm = broker.getList(lData);

		if(rm.next()) {
			create_date = StringUtil.verify((String)rm.get("create_date"));
			sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
			sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
			sgis_census_req_status_name = StringUtil.verify((String)rm.get("sgis_census_req_status_name"));
			sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
			sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
			sgis_census_req_company = StringUtil.verify((String)rm.get("sgis_census_req_company"));
			sgis_census_req_tel = StringUtil.verify((String)rm.get("sgis_census_req_tel"));
			sgis_census_req_file = StringUtil.verify((String)rm.get("sgis_census_req_file"));
			if(sgis_census_req_file.equals("null")) sgis_census_req_file = "";
			sgis_census_location = StringUtil.verify((String)rm.get("sgis_census_location"));
			sgis_census_req_goal = StringUtil.verify((String)rm.get("sgis_census_req_goal"));
			sgis_census_req_goal = sgis_census_req_goal.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
			sgis_census_req_reject = StringUtil.verify((String)rm.get("sgis_census_req_reject")).replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
		}
		*/

		/********************************/
		/* 년도 */
		/********************************/
		/*
		lData.setString("PARAM", "CENSUS_APPLY_ST_ED_YEAR_GROUP");
		rm1 = broker.getList(lData);

		while(rm1 != null && rm1.next()) {
			String e_sgis_census_req_y_use_che = String.valueOf((Character)rm1.get("sgis_census_req_y_use_che"));
			if(e_sgis_census_req_y_use_che.equals("Y")) {
				years += StringUtil.verify((String)rm1.get("sgis_census_req_year")) + ", ";
			}
		}
		*/

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}

%>


</html>
