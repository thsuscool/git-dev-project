<%
/**************************************************************************************************************************
* Program Name	 : 통계소통지도 개설시 지역 셀렉트박스 생성
* File Name		 : createAreaItem.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-05-15
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="cm_area_box">
	<select id="sidoSelect${appendId }" data-id="${appendId }" title="지역설정 시도" name="${fn:trim(appendId)!=''?'addsido':'sidoSelect' }"><option value="00" data-coor-x="989674" data-coor-y="1818313">전국</option></select>
	<select id="sggSelect${appendId }" data-id="${appendId }" title="지역설정 시군구" name="${fn:trim(appendId)!=''?'addsgg':'sggSelect' }"><option  value="999" data-coor-x="989674" data-coor-y="1818313">전체</option></select>
	<select id="emdongSelect${appendId }" data-id="${appendId }" title="지역설정 읍면동" name="${fn:trim(appendId)!=''?'addemdong':'emdongSelect' }"><option value="00" data-coor-x="989674" data-coor-y="1818313">전체</option></select>
</div>