<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%
//사용자 세션정보 등록
			request.getSession().setAttribute("sessionId", "111");								//세션 고유 ID
			request.getSession().setAttribute("member_key", "111");			//회원키
			request.getSession().setAttribute("member_id", "111");				//아이디
			request.getSession().setAttribute("member_nm", "111");				//이름
			request.getSession().setAttribute("member_grade", "111");		//회원등급
%>
