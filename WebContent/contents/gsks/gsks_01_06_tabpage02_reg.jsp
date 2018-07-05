<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage02_reg.jsp
    * @description : FAQ 관리자(등록화면)
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
	RecordModel dataSet = null;

	String sgis_faq_contents = "";

	try {

		broker = new GeneralBroker("adfb00");
		
		lData.set("sql","ret");
		dataSet = broker.getList(lData);

		if(dataSet.next()) {

			sgis_faq_contents = StringUtil.fromDB((String)dataSet.get("sgis_faq_contents"));
		}
	}catch(Exception e) {

		System.out.println("***exception info***\n"+e);
	}
%>
    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>

<SCRIPT LANGUAGE="JavaScript">
<!--
function doRegistProcess() {

	var fm = document.regiForm;

	fm.action = './gsks_01_06_tabpage02_prc.jsp';
	fm.target = '_self';

	fm.submit();
}
//-->
</SCRIPT>

<form name="regiForm" method="post" style="margin:0px;">
	<input type="hidden" name="sgis_faq_id" value="<%=lData.getString("sgis_faq_id") %>"/>

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
	String example = "";
	example += "<!-- 아래의 내용을 복사후 입력해주십시오.       \n";
	example += "<h2>SGIS유통홈페이지</h2> \n";
	example += "<div class='support_03_faq'>             \n";
	example += "<div class='support_03_question'>        \n";
	example += "  <p>질문을 입력해주십시오.</p>          		 \n";
	example += "</div>                               		 \n";
	example += "<div class='support_03_answer'>      		 \n";
	example += "  <p>답변을 입력해주십시오.</p>          		 \n";
	example += "</div>                               		 \n";
	example += "<div class='clear'></div>            		 \n";
	example += "</div>                                   \n";
	example += "<h2 class='top_mar_30'>통계네비게이터</h2>	 \n";
	example += "<div class='support_03_faq'>             \n";
	example += "<div class='support_03_question'>    		 \n";
	example += "  <p>질문을 입력해주십시오.</p>          		 \n";
	example += "</div>                               		 \n";
	example += "<div class='support_03_answer'>      		 \n";
	example += "  <p>답변을 입력해주십시오.</p>          		 \n";
	example += "</div>                               		 \n";
	example += "<div class='clear'></div>            		 \n";
	example += "</div>                                   \n";
	example += "<h2 class='top_mar_30'>OpenAPI</h2>   	 \n";
	example += "<div class='support_03_faq'>             \n";
	example += "<div class='support_03_question'>    		 \n";
	example += "  <p>질문을 입력해주십시오.</p>          		 \n";
	example += "</div>                               		 \n";
	example += "<div class='support_03_answer'>      		 \n";
	example += "  <p>답변을 입력해주십시오.</p>          		 \n";
	example += "</div>                               		 \n";
	example += "<div class='clear'></div>            		 \n";
	example += "</div>                                   \n";
	example += "-->           ";

	if(!StringUtil.isEmpty(sgis_faq_contents))	example = "";
%>
		  <div class="site_control_write">
			  <table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" summary="사이트관리에 대한 내용입니다.">
				  <caption>사이트관리</caption>
				  <tr>
						<th class="td_top">내용</th>
						<td class="td_top t_end"><textarea name="sgis_faq_contents" cols="" rows=""><%=example + "\n" +sgis_faq_contents %></textarea></td>
				  </tr>
			  </table>
		  </div>

	  	<div class="site_control_write_button">
	  		<img src="/contents/gsks/images/button_ok.gif" onclick="doRegistProcess()" style="cursor:pointer;" alt="확인" border="0" />
	  		<img src="/contents/gsks/images/gsks_01_03_tab_page_01_button_03.gif" onclick="location.replace('./gsks_01_06_tabpage02.jsp')" style="cursor:pointer;" alt="취소" border="0" />
	  	</div>

    </div><!-- end content div -->
  </div>	<!-- end admin_content div -->
	<div class="clear"></div>
</form>
</div>		<!-- end admin_middle(include) -->
<%@ include file="/contents/gsks/include/footer.jsp" %>
