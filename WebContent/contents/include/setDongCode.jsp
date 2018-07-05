<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%@ include file="/contents/include/logger.jsp"%>
<%
// main Window 창에 사용자 dong Code 세팅을 위한 코드 추가 2014.08.14 김종현
	DbManager dbmgr_ip           = null;
	RecordModel result_ip    = null;
	StringBuffer query_ip = new StringBuffer(1024);
	String dongCd = "2503060"; //default 둔산2동
	try {
		dbmgr_ip = new DbManager();
		if(!StringUtil.isEmpty((String)session.getAttribute("sc_userkey"))){
			//관심지역이 등록되어 있을때 관심지역의 dongCode를 불러온다
			query_ip.append("select sgis_intest_loc from sgis_like_zone where sgis_member_key = '"+(String) session.getAttribute("sc_userkey")+"'  ");			
			dbmgr_ip.prepareStatement(query_ip.toString());
			result_ip = dbmgr_ip.select();
			String sgis_intest_loc = "";
			if(result_ip != null && result_ip.next()) {
				sgis_intest_loc = result_ip.get("sgis_intest_loc").toString();
			}
			if(sgis_intest_loc.length() == 7){
				dongCd = sgis_intest_loc;
			}
		}else{
			//관심지역이 등록되어 있지 않을때 검색한 dongCd가 있는지 확인
			String user_ip = request.getRemoteAddr();
			query_ip.append("select top 1 sgis_set_dong_cd from sgis_ip_adm_dong_set where sgis_access_user_ip = '"+request.getRemoteAddr()+"' ");
			query_ip.append(" order by sgis_search_count desc, update_date desc ");
			dbmgr_ip.prepareStatement(query_ip.toString());
			result_ip = dbmgr_ip.select();
			String sgis_set_dong_cd = "";
			if(result_ip != null && result_ip.next()) {
				sgis_set_dong_cd = result_ip.get("sgis_set_dong_cd").toString();
			}
			if(sgis_set_dong_cd.length() == 7){
				dongCd = sgis_set_dong_cd;
			}
		}
	} catch( Exception e ) {
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		//오류 발생 시 또는 저장된 데이터가 없을때는 기본값을 그대로 세팅한다. 
		session.setAttribute("dongCd", dongCd);
		dbmgr_ip.close();
	}
%>



