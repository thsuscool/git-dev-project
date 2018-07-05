<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String savePath = sc_absouteRoot + "/contents/images/";			//저장 위치
	int sizeLimit   = fileSizeLimit * 5;	//5M

	DbManager dmg = null;
	RecordModel rm = null;

	String sgis_main_low_id = "";
	String sgis_main_low_site = "";
	String sgis_main_low_url = "";
	String sgis_main_low_seq  = "";
	String sgis_census_file = "";
	String sgis_main_loc_code = "";
	String sgis_main_low_image_on="";
	String sgis_main_low_image_off="";
	String aT = "";

	String formName = "";
	String fileName = "";

	String sql = "";

	try {

		/**
		 * @constructor parameter
		 *  	HttpServletRequest req
		 *  	String directory
		 *  	int maxsize
		 *  	String encoding
		 *  	FileRenamePolicy policy(파일명중복여부))
		 */

		dmg = new DbManager();

		MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
		Enumeration formNames  = multi.getFileNames();

		sgis_main_low_id = multi.getParameter("sgis_main_low_id");
		sgis_main_low_site = multi.getParameter("sgis_main_low_site");				//site
		sgis_main_low_url  = multi.getParameter("sgis_main_low_url");				//url
		sgis_main_low_seq = multi.getParameter("sgis_main_low_seq");				//순서
		sgis_main_loc_code = multi.getParameter("sgis_main_loc_code");

		aT = multi.getParameter("aT");																										//처리구분

		while(formNames.hasMoreElements()) {
			formName = (String)formNames.nextElement();														//file tag명
			fileName = multi.getFilesystemName(formName);													//file tag내의 file명

			if(formName.equals("sgis_main_low_image_on")) sgis_main_low_image_on = fileName;
			else if(formName.equals("sgis_main_low_image_off")) sgis_main_low_image_off = fileName;
		}

		int resultFlag = 0;

		/****************************************/
		/* 등록 */
		/****************************************/

		if(aT.equals("INS")) {

				String msql = " select nvl(max(sgis_main_low_id)+1,0) maxnum from sgis_main_low_set	";
								msql += "	where sgis_main_loc_code = '"+sgis_main_loc_code+"'";

				dmg.prepareStatement(msql);
				rm = dmg.select();
				String maxnum = "";

				if(rm.next()) maxnum  = String.valueOf((BigDecimal)rm.get("maxnum"));

			  sql += " insert into sgis_main_low_set	";
				sql += "				( ";
				sql += "							sgis_main_low_id		";
				sql += "					    , sgis_main_loc_code ";
				sql += "					    , sgis_main_low_site ";
				sql += "					    , sgis_main_low_url ";
				sql += "					    , sgis_main_low_seq ";
				sql += "					    , sgis_main_low_image_on ";
				sql += "					    , sgis_main_low_image_off ";
				sql += "					) ";
				sql += "					values ";
				sql += "					( ";
				sql += "						'"+maxnum+"'	";
				sql += "					, '"+sgis_main_loc_code+"'		";
				sql += "					, '"+sgis_main_low_site+"'";
				sql += "					, '"+sgis_main_low_url+"'";
				sql += "					, '"+sgis_main_low_seq+"'";
				sql += "					, '"+sgis_main_low_image_on+"'";
				sql += "					, '"+sgis_main_low_image_off+"'";
				sql += "					)";

				dmg.prepareStatement(sql);
				resultFlag = dmg.executeUpdate();

		} else if(aT.equals("UPD")){

		/****************************************/
		/* 수정 */
		/****************************************/

						sql += " update sgis_main_low_set	";
						sql += " 				set		";
						sql += "							sgis_main_low_site = '"+sgis_main_low_site+"' ";
						sql += "							, sgis_main_low_url = '"+sgis_main_low_url+"' ";
						sql += "							, sgis_main_low_seq = '"+sgis_main_low_seq+"' ";
						if(!StringUtil.isEmpty(sgis_main_low_image_on)) {
						sql += "							, sgis_main_low_image_on = '"+sgis_main_low_image_on+"' ";
						}
						if(!StringUtil.isEmpty(sgis_main_low_image_off)) {
						sql += "							, sgis_main_low_image_off = '"+sgis_main_low_image_off+"' ";
						}
						sql += "		where sgis_main_low_id = '"+sgis_main_low_id+"'		";
						sql += "							and sgis_main_loc_code = '"+sgis_main_loc_code+"'		";

						dmg.prepareStatement(sql);
						resultFlag = dmg.executeUpdate();
		}

		if(resultFlag == 1) {
			out.print("<script>alert('처리되었습니다.'); opener.location.href='gsks_01_06_tabpage06.jsp';  window.close();</script>");
		} else {
			out.print("<script>alert('정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요.'); window.close();</script>");
		}

	}catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		dmg.close();
	}
%>
