<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="EUC-KR"%>

<%@ page import="kr.co.offton.pdf.basis.*"%>
<%

        LData lData = new LData(request);

        String logout_url = lData.get("logout_url");
      String returnUrl = "";
    /***********************************/
    /* 세션 삭제 */
    /***********************************/
    session.invalidate();

    System.out.println("logout_url ==========> "+logout_url);
    if(logout_url.equals("") || logout_url.equals("undefined"))
      //response.sendRedirect("/index.jsp");
      returnUrl = "/index.jsp";
    else
      //response.sendRedirect(logout_url);
      returnUrl = logout_url;
%>

<script type="text/javascript">
    try{
      parent.opener.parent.location.replace('/index.jsp');
    }catch(e){}

location.replace('<%=returnUrl%>');
</script>
<% response.sendRedirect(returnUrl); %>