<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.pdf.basis.*"%>
<%@ page import="com.neowiz.login.LoginManager" %>
<%@ page import="kr.co.offton.jdf.util.StringUtil"    %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	//LData lData = new LData(request);
	LoginManager loginManager = LoginManager.getInstance();
	
	//String userid = session.getAttribute("sc_userid");
	String logout_url = lData.get("logout_url");
	String returnUrl = "";
    String userid = sc_userid;    // 세션 가지고 있는 아이디 값
//System.out.println("로그아웃");
//System.out.println(userid);

  	 // 로그아웃 아이디  2012 03 20  SWan
  /***********************************/
  /* 세션 삭제 */
  /***********************************/

	//loginManager.valueUnbound();
	

//세션 정보 db 삭제   2012 03 20  SWan
                       DbManager dbmgr      = null;
					   RecordModel countSet    = null;
						StringBuffer countQuery = new StringBuffer(1024);
										
						try {
							//접속 30분 여부 체크
							dbmgr = new DbManager();	
							countQuery = new StringBuffer(1024);
							countQuery.append("    	delete from sgis_logcheck where userid='"+userid+"'  \n");
							System.out.println(countQuery);
							dbmgr.prepareStatement(countQuery.toString());
							//countSet = dbmgr.select();
							dbmgr.execute();
						} catch( Exception e ) {
							//2015-12-03 시큐어코딩
							//e.printStackTrace();
							logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
						} finally {
							dbmgr.close();
						}

  //System.out.println("logout_url ==========> "+logout_url);
  if(logout_url.equals("") || logout_url.equals("undefined")){
    //response.sendRedirect("/index.jsp");
    returnUrl = "/index.jsp";
  }else{
    //response.sendRedirect(logout_url);
    returnUrl = logout_url;
  }
  session.invalidate(); //세션 정보 삭제   2012 03 20  SWan
%>
<script type="text/javascript">
	try{
	  parent.opener.parent.location.replace('/index.jsp');
	}catch(e){}

	location.replace('<%=returnUrl%>');
</script>
<% response.sendRedirect(returnUrl); %>


