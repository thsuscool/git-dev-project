<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage02_prc.jsp
    * @description : FAQ 관리자(process page)
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-12    SHIN HYUN MYUNG      1.0         최초등록
    ********************************************************************
 */
--%>

<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="java.math.BigDecimal"                  %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.jdf.db.DbManager"         %>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<%!
	/* 상태에 따른 insert / update query생성 */
	String getQuery(String stat) throws Exception {

		StringBuffer query = new StringBuffer(1024);

		if(stat.equals("INS")) {

			query.append(" INSERT INTO SGIS_FAQ (   \n");
			query.append("     sgis_faq_contents    \n");
			query.append("    ,sgis_faq_id          \n");
			query.append(" )VALUES (                \n");
			query.append("     ?                    \n");
			query.append("    ,?                    \n");
			query.append(" )                        \n");
		}else if(stat.equals("UPD")) {

			query.append(" UPDATE SGIS_FAQ SET          \n");
			query.append("     sgis_faq_contents = ?    \n");
			query.append("  WHERE sgis_faq_id = ?       \n");
		}else {

			throw new Exception("not statement...");
		}

		return query.toString();
	}
%>

<%
	DbManager dbmgr       = null;
	RecordModel faqSet    = null;
	StringBuffer faqQuery = new StringBuffer();

	String sgis_faq_id       = lData.getString("sgis_faq_id");

	String sgis_faq_contents = lData.getString_s("sgis_faq_contents");
	System.out.println(sgis_faq_contents);
	String stat              = "";

	faqQuery.append(" SELECT to_char(count(*)) FROM SGIS_FAQ WHERE sgis_faq_id = ? ");

	try {

		dbmgr = new DbManager();
		dbmgr.prepareStatement(faqQuery.toString());
		dbmgr.pstmtSet(sgis_faq_id);

		faqSet = dbmgr.select();
		if(faqSet.next())	stat = NumberUtil.toInt(StringUtil.verify((String)faqSet.get(1))) > 0 ? "UPD" : "INS";

		faqQuery = new StringBuffer(1024);
		faqQuery.append(getQuery(stat));

		dbmgr.prepareStatement(faqQuery.toString());
		dbmgr.pstmtSet(sgis_faq_contents);
		dbmgr.pstmtSet(sgis_faq_id);

		dbmgr.execute();
	}catch(Exception e) {

		System.out.println("***exception info***\n"+e);
	}finally {

		if(dbmgr != null)	dbmgr.close();
		response.sendRedirect("gsks_01_06_tabpage02.jsp");
	}
%>