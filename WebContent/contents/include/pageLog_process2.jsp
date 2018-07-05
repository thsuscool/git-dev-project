<%-- <%@ page language="java" contentType="text/html;charset=euc-kr" pageEncoding="euc-kr"%> --%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.jdf.db.DbManager"       %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"     %>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<script type="text/javascript" language="javascript">
//<![CDATA[     
    function openMovie()
    {
        str = "scrollbars=no,width=" + 660 +", height="+ 730;
        linkurl="/movie2.jsp";
        noticeWindow = window.open(linkurl, '' , str);
        noticeWindow.focus();
    }
//]]>
</script>
<%
  DbManager dbmgr = null;
  RecordModel rm  = null;

  String menuUrl =   lData.getString("sgis_menu_url");
  String popYn   =   lData.getString("sgis_menu_pop_chk");
  String dcodeid   = lData.getString("sgis_menu_d_code_id");
  String logKey  = "";
  int num = (int)(Math.random() * 10000) + 1;

  try {

    dbmgr = new DbManager();
    StringBuffer logQuery = new StringBuffer(1024);


    logQuery = new StringBuffer(1024);

    logQuery.append(" insert into sgis_page_log (   \n");
    logQuery.append("     sgis_page_log_id          \n");
    logQuery.append("     , sgis_menu_d_code_id          \n");
    logQuery.append(" )values (                     \n");
    logQuery.append("     sys_guid()               \n");
    logQuery.append("     ,:sgis_menu_d_code_id      \n");
    logQuery.append(" )                             \n");

    dbmgr.prepareStatement(logQuery.toString(), lData);
    dbmgr.execute();

  }catch(Exception e) {

	//2015-12-03 시큐어코딩
	//e.printStackTrace();
	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
  }finally {

      if(dbmgr != null) dbmgr.close();
    if(popYn.equals("Y")) {
         if (dcodeid.equals("110100")||dcodeid.equals("999001")){           
                  out.println("<script>var devPop"+num+" = window.open('"+ menuUrl +"','devPop"+num+"', 'width=1024,height=768,left=0,top=0,scrollbars=auto,menubar=no,resizable=yes');");
                  out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110200")||dcodeid.equals("999002")){
                  out.println("<script>var devPop"+num+" = window.open('" + menuUrl +"','devPop"+num+"', 'width=1024,height=768,left=0,top=0,scrollbars=auto,menubar=no,resizable=yes');");     
                  out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110300")||dcodeid.equals("999003")){ 
                  out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1400,height=897,left=0,top=0,scrollbars=yes,menubar=no, resizable=yes');");
                  out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110400")||dcodeid.equals("999004")){ 
                  out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1125,height=880,left=0,top=0, scrollbars=no');");
                  out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110500")||dcodeid.equals("999005")){
                  out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1100,height=897,left=0,top=0, scrollbars=yes, resizable=yes');" );
                  out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110600")||dcodeid.equals("999006")){
                  out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1100,height=897,left=0,top=0, scrollbars=yes, resizable=yes');");
                  out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110700")||dcodeid.equals("999007")){ 
                 out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1100,height=897,left=0,top=0, scrollbars=yes, resizable=yes');");
                 out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110800")||dcodeid.equals("999008")){
                  out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1100,height=897,left=0,top=0, scrollbars=yes, resizable=yes');" );
                  out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("110900")||dcodeid.equals("999009")){
           //out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=560,height=600,left=0,top=0, scrollbars=auto, resizable=no');" );
           out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1045,height=800,left=0,top=0, scrollbars=yes, resizable=yes');" );
           out.println("devPop"+num+".focus();</script>");
         }else if(dcodeid.equals("111000")||dcodeid.equals("999010")){ 
                out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1100,height=897,left=0,top=0, scrollbars=yes, resizable=yes');");
                out.println("devPop"+num+".focus();</script>");
         }else if (dcodeid.equals("999013")){
                 out.println("<script> var noticeWindow = window.open('" +   menuUrl      +"', 'noticeWindow' ,'scrollbars=no,width=660, height=730');"); 
                  out.println("noticeWindow.focus();</script>");    
         }else if(dcodeid.equals("120300")||dcodeid.equals("330000")||dcodeid.equals("999015")){ 
                out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1200,height=768,left=0,top=0, scrollbars=yes, resizable=yes');");
                out.println("devPop"+num+".focus();</script>");
          }else if(dcodeid.equals("112000")||dcodeid.equals("999016")){ 
                out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1260,height=768,left=0,top=0, scrollbars=yes, resizable=yes');");
                out.println("devPop"+num+".focus();</script>");
         } else if(dcodeid.equals("114000")||dcodeid.equals("999018")){ 
            out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1260,height=768,left=0,top=0, scrollbars=yes, resizable=yes');");
            out.println("devPop"+num+".focus();</script>");
         } else if(dcodeid.equals("110110")||dcodeid.equals("999019")){ 
            out.println("<script>var devPop"+num+" = window.open('" +   menuUrl      +"','devPop"+num+"', 'width=1260,height=768,left=0,top=0, scrollbars=yes, resizable=yes');");
            out.println("devPop"+num+".focus();</script>");
         } 
         
    }else {
      out.print("<script>parent.location.href='"+menuUrl+"'</script>");
    }
  }
%>