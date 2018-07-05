<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String savePath = sc_filePath + "/api";			//저장 위치
	int sizeLimit   = fileSizeLimit * 5;	//5M

	GeneralBroker broker = null;

	String api_element_id = "";
	String api_element_e_desc = "";
	String api_element_ex_name = "";
	String api_element_ex_desc = "";
	String api_element_script = "";
	String api_element_example_exe = "";
	String api_element_req_down = "";
	String api_element_res_down = "";
	String api_element_doc_down = "";
	String api_element_expert_api_doc = "";
	String aT = "";

	String formName = "";
	String fileName = "";

	try {

		/**
		 * @constructor parameter
		 *  	HttpServletRequest req
		 *  	String directory
		 *  	int maxsize
		 *  	String encoding
		 *  	FileRenamePolicy policy(파일명중복여부))
		 */
		MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
		Enumeration formNames  = multi.getFileNames();

		api_element_id = multi.getParameter("api_element_id");
		api_element_e_desc = multi.getParameter("api_element_e_desc");
		api_element_ex_name  = multi.getParameter("api_element_ex_name");
		api_element_ex_desc = multi.getParameter("api_element_ex_desc");
		api_element_script = multi.getParameter("api_element_script");
		api_element_expert_api_doc = multi.getParameter("api_element_expert_api_doc");

		lData.setString("api_element_id", api_element_id);
		lData.setString("api_element_e_desc", api_element_e_desc);
		lData.setString("api_element_ex_name", api_element_ex_name);
		lData.setString("api_element_ex_desc", api_element_ex_desc);
		lData.setString("api_element_script", api_element_script);
		lData.setString("api_element_expert_api_doc", api_element_expert_api_doc);

		aT = multi.getParameter("aT");																										//처리구분

		while(formNames.hasMoreElements()) {
			formName = (String)formNames.nextElement();														//file tag명
			fileName = multi.getFilesystemName(formName);													//file tag내의 file명

			if(formName.equals("api_element_example_exe")) api_element_example_exe = fileName;
			else if(formName.equals("api_element_req_down")) api_element_req_down = fileName;
			else if(formName.equals("api_element_res_down")) api_element_res_down = fileName;
			else if(formName.equals("api_element_doc_down")) api_element_doc_down = fileName;
		}

		lData.setString("api_element_example_exe", api_element_example_exe);
		lData.setString("api_element_req_down", api_element_req_down);
		lData.setString("api_element_res_down", api_element_res_down);
		lData.setString("api_element_doc_down", api_element_doc_down);

		int resultFlag = 0;

		/****************************************/
		/* 등록 */
		/****************************************/
		if(aT.equals("INS")) {

			broker = new GeneralBroker("apaa00");
			lData.setString("PARAM", "INSERT_SAMPLE");

			resultFlag = broker.process(Const.P_INS, lData);

		/****************************************/
		/* 수정 */
		/****************************************/
		} else if(aT.equals("UPD")) {

			broker = new GeneralBroker("apaa00");
			lData.setString("PARAM", "UPDATE_SAMPLE");

			resultFlag = broker.process(Const.P_UPD, lData);

		/****************************************/
		/* 삭제 */
		/****************************************/
		} else if(aT.equals("DEL")) {

			broker = new GeneralBroker("apaa00");
			lData.setString("PARAM", "REMOVE_SAMPLE");
			resultFlag = broker.process(Const.P_DEL, lData);
		}
        
		if(resultFlag == 1) {
			out.print("<script>alert('처리되었습니다.'); location.href='gsks_01_03_tab_page_05.jsp?api_element_id="+api_element_id+"';  window.close();</script>");
		} else {
			out.print("<script>alert('정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요.'); history.back();</script>");
		}

	}catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
