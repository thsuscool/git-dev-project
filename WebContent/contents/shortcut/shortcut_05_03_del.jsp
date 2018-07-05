<%@page import="kr.co.offton.pdf.Const"%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
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
	GeneralBroker broker = null;
	RecordModel rm = null;

	try {

		broker = new GeneralBroker("ceaa00");

	    // 센서스자료신청년도 삭제
		lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
		broker.process(Const.P_DEL, lData);
		
	    // 센서스자료신청 삭제
		lData.setString("PARAM", "REMOVE_CENSUS_REQ");
		broker.process(Const.P_DEL, lData);			    
		
		out.print("<script>alert('삭제되었습니다.'); location.href='shortcut_05_03_01.jsp'</script> 삭제되었습니다.<a href='shortcut_05_03_01.jsp'>돌아가기</a>");	
	}catch(Exception e) {
			System.out.print("sgisWebError : ");
			out.print("<script>alert('정상적으로 처리되지 않았습니다.'); history.back();</script> 정상적으로 처리되지 않았습니다.<a href='shortcut_05_03_01.jsp'>돌아가기</a>");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>

