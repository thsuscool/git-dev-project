<!-- 2012 11 06 자동승인처리  -->
<%@page import="java.util.ArrayList"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.pdf.basis.*"            %>
<%@ page import="sun.misc.BASE64Encoder"              %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	String approvalFlag         = lData.getString("approvalFlag").equals("")?"N":lData.getString("approvalFlag");

	DbManager dbmgr      = null;
	 RecordModel countSet    = null;
	StringBuffer countQuery = new StringBuffer(1024);
			
			try {
				
				dbmgr = new DbManager();	
				countQuery = new StringBuffer(1024);
				countQuery.append("    	update sgis_system_properties set value='"+approvalFlag+"' where code='00001'  \n");
				System.out.println(countQuery);
				dbmgr.prepareStatement(countQuery.toString());
				dbmgr.execute();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgr.close();
			}
			
			%>
			<script type="text/javascript">
			alert("<%=approvalFlag.equals("Y")?"자동":"수동"%>승인처리 되었습니다.");
			</script>
