<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
  if(loginYn.equals("N")) {
    out.print("<script>alert('로그인 해주세요.'); location.href='/contents/sgis_top/sgis00.jsp'; </script>");
  } else {
    if(!sc_authid.equals("01")) out.print("<script>alert('관리자만 이용하실수 있습니다.'); location.href='/contents/sgis_top/sgis00.jsp' ;</script>");
  }
%>
<!-------------------top 시작----------------------->
<!DOCTYPE.jsp PUBLIC "-//W3C//DTD.jsp 4.0 Transitional//EN">
<HEAD>
<TITLE><%=sc_pageTitle %></TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<meta http-equiv="Content-Type" content="text.jsp; charset=utf-8" />
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/gsks/style/style.css" type="text/css" media="all">
<script src=/contents/scripts/javascript.js></script>
<script src=/contents/scripts/common.js></script>
<script src=/contents/scripts/calendar.js></script>
<script src=/contents/scripts/stringUtil.js></script>
<script src=/contents/scripts/divwriter.js></script>
<script type="text/javascript">
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
function calender_view(data){
  if(data=="on")document.getElementById('popup_calendar').style.display="block";
  if(data=="off")document.getElementById('popup_calendar').style.display="none";
}
</script>
<noscript>
<p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>
<script src=/contents/scripts/flash.js></script>
<noscript>
<p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>
<style>
</style>
</HEAD><BODY>
<div class="admin_top">
  <div>
    <div class="top_logo"><img src="/contents/gsks/images/admin_top_logo.gif" alt="<%=sc_pageTitle%>"></div>
    <div class="admin_title"><img src="/contents/gsks/images/admin_title.gif" alt="관리자페이지"></div>
    <div class="admin_title top_margin_20"><a href="/index.jsp"><img src="/contents/gsks/images/sgis_go_home.gif" alt="SGIS홈페이지바로가기" border="0"></a></div>
  </div>
  <div class="clear"></div>
  <div>
    <div class="admin_login">
      <div class="login_text"><img src="/contents/gsks/images/admin_icon.gif" alt=".." align="absmiddle"><span class="bold_black"> <%=sc_username %></span> 님 환영합니다!</div>
      <div class="login_button"><a href="/contents/include/logout.jsp"><img src="/contents/gsks/images/admin_logout.gif" alt="로그아웃" border="0"></a><a href="#"><img src="/contents/gsks/images/member_information.gif" alt="회원정보" border="0"></a></div>
    </div>

    <div class="middle_top">
      <div class="middle_title"><img src="/contents/gsks/images/admin_title_middle.gif" alt="SGIS유통홈페이지 관리"></div>
    </div>
  </div>
<!------------------------top끝---------------------------->
</div>
<div class="admin_middle">