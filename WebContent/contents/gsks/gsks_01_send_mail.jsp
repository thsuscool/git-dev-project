<%--
/*********************************************************
 * @source      : gsks_01_send_mail.jsp
 * @description : 관리자 / 사용자관리 / 메일발송
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008-11-20   김민수         최초등록
 *********************************************************
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ page import="kr.co.offton.jdf.db.DbManager"       %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"     %>

<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%
		
		LData lData = new LData( request );
		String members = lData.get("members");
		DbManager dbmgr = null;
		RecordModel rm = null;
		StringBuffer sb = new StringBuffer(1024);
	
		try{
			dbmgr = new DbManager();
			
			sb.append(" SELECT sgis_name,  AESDecrypt(sgis_email,'sgis') as  sgis_email                 \n");
			sb.append("       FROM sgis_member_info                       \n");
			sb.append("     WHERE sgis_member_key                       \n");
			sb.append("                     IN ("+members.substring(1)+") \n");
			
			dbmgr.prepareStatement(sb.toString(), lData);
			rm = dbmgr.select();
		}catch(Exception e){
			out.println(e);
		}finally{
			dbmgr.close();
		}

%>
<!DOCTYPE.jsp PUBLIC "-//W3C//DTD/html 4.0 Transitional//EN">
<html>
<HEAD>
<TITLE>메일 발송</TITLE>
<meta http-equiv="Content-Type" content="text.jsp; charset=utf-8" />
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all" />
<link rel="stylesheet" href="/contents/gsks/style/style.css" type="text/css" media="all" />
<style type="text/css">
body {background:#c8e2ed;}
</style>
<script type="text/javascript">
		function sendmail(){
			if(!confirm('발송하시겠습니까?')) return;

			fm.action = 'send_mail_process.jsp';
			fm.target = '_self';
			fm.submit();
    }
</script>
</HEAD>
<body>
<form name="fm" method="post">
<input type="hidden" name="members" value="<%=lData.get("members")%>"/>
<div class="popup_mail">
  <div class="popup_title"><img src="/contents/gsks/images/icon_admin_popup_send_mail.gif" align="absmiddle" style="margin-left:15px;"/> 메일발송</div>
  <p><strong>수신인 :</strong>
	<%
			int rowCnt =  rm.getRowCount();
			int cnt = 0;
			
			while(rm!=null && rm.next()) {
				String sgis_name  = StringUtil.verify((String)rm.get("sgis_name "));
				out.println(sgis_name);
				if(cnt < (rowCnt - 1)) out.println(",");
				
				cnt++;
			}
	%></p>
 
  <div class="popup_box3">
    <div>제목
    <input  type="text" name="subject" style="margin-left:2px;"></div>
      </div>
 <div class="left left_mar_25 top_mar_10">내용</div><div class="left"><textarea name="content" class="popup_box3_textarea_write"></textarea></div>
<div class="clear"></div>
<div class="popup_button3">
	<a href="javascript:sendmail();"><img src="/contents/gsks/images/button_admin_popup_send_mail.gif" alt="발송" style="margin-right:5px;"></a>
	<a href="javascript:window.close();"><img src="/contents/gsks/images/button_admin_popup_close_mail.gif" alt="닫기"></a>
</div>
<div class="clear"></div>
</div>
</form>
</body>
</html>