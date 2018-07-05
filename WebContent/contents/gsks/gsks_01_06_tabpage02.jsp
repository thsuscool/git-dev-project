<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage02.jsp
    * @description : FAQ 관리자
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-12    SHIN HYUN MYUNG      1.0         최초등록
    ********************************************************************
 */
--%>

<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.jdf.db.DbManager"         %>

<%@ include file="/contents/gsks/include/header.jsp"   %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	GeneralBroker broker = null;
	RecordModel faqSet = null;

	int rowCount             = 0;
	String sgis_faq_id       = "";
	String sgis_faq_contents = "";

	try {

		broker = new GeneralBroker("adfb00");
		
		lData.set("sql","list");
		faqSet = broker.getList(lData);
		if(faqSet != null)	rowCount =	faqSet.getRowCount();

	}catch(Exception e) {

		System.out.println("***exception info***\n"+e);
	}
%>
    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
    
<SCRIPT LANGUAGE="JavaScript">
<!--
function goRegistForm(id) {

	var fm = document.viewForm;

	fm.sgis_faq_id.value = id;
	fm.action = './gsks_01_06_tabpage02_reg.jsp';
	fm.target = '_self';

	fm.submit();
}
//-->
</script>
<form name="viewForm" method="post" style="margin:0px;">
	<input type="hidden" name="sgis_faq_id"/>

  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>
    
  	<div class="clear"></div>

    <div class="content_title_1">
      <div class="content_title_2">사이트관리</div>
	      <ul class="navigation">
	        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
	        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">사이트관리</a></li>
	      </ul>
    </div>

    <div class="content">
	  <div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_06_tabpage01.jsp"><strong>공지사항</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage02.jsp"><font color="#FFFFFF"><strong>FAQ</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_06_tabpage03.jsp"><strong>Q&A</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage04.jsp"><strong>메뉴</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage06.jsp"><strong>메인메뉴</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage05.jsp"><strong>용어설명관리</strong></a></td>
				</tr>
				<tr>
					<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
				</tr>
			</table>
		<div class="clear"></div>
	  </div>

<%
	if(rowCount > 0) {

		if(faqSet.next()) {
			sgis_faq_id       = StringUtil.verify((String)faqSet.get("sgis_faq_id"));
			sgis_faq_contents = (String)faqSet.get("sgis_faq_contents");

%>
			<%=sgis_faq_contents %>
<%	}//end of while
	}else { %>
			<div style="height:30px;"></div>
			<div class="center">데이터가 존재하지 않습니다.</div>
<%}	%>

			<div class="site_cotrol_faq_button"><img src="/contents/gsks/images/button_entry.gif" onclick="goRegistForm('30000')" style="cursor:pointer;" alt="등록/수정" border="0" /></div>

    </div><!-- end content div -->
  </div>	<!-- end admin_content div -->
	<div class="clear"></div>
</form>
</div>		<!-- end admin_middle(include) -->
<%@ include file="/contents/gsks/include/footer.jsp" %>
