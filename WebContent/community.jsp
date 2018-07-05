<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    
<%
	String community_id = request.getParameter("id");
	response.sendRedirect("/view/community/view?cmmnty_map_id=" + community_id);
%>


