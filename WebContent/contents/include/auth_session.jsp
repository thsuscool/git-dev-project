<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%
	String sgis_authid = "";
	try {
		if (session.getAttribute("userkey").toString()!=null){
			sgis_authid = (String)session.getAttribute("sc_userlevel");
		}
	}catch (Exception e) {
		  sgis_authid = "03";
	}
%>
