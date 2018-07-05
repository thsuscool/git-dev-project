<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="java.util.Properties" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	//response.sendRedirect("/view/service");
	response.sendRedirect("/robots.txt");
%>