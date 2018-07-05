<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage01_write.jsp
    * @description : 관리자 - 용어설명 게시판 글쓰기
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-18   김경열         1.0
    ********************************************************************
 */
--%>

<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
<SCRIPT LANGUAGE="JavaScript">
<!--
function calender_view(data){
	if(data=="on")document.getElementById('popup_calendar').style.display="block";
	if(data=="off")document.getElementById('popup_calendar').style.display="none";
}
//-->
</script>
<script src="/contents/gsks/scripts/gsks_01_06_tabpage05.js"></script>
  <div class="admin_content">
    	<form name="fm" method="post">
		<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">

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
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage02.jsp"><strong>FAQ</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_06_tabpage03.jsp"><strong>Q&A</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage04.jsp"><strong>메뉴</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage06.jsp"><strong>메인메뉴</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage05.jsp"><font color="#FFFFFF"><strong>용어설명관리</strong></font></a></td>
				</tr>
				<tr>
					<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
				</tr>
			</table>
		<div class="clear"></div>
	  </div>
	  <div class="site_control_write">
	  <table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" summary="사이트관리에 대한 내용입니다.">
	  <caption>사이트관리</caption>
	  <tr>
		<th width="100" class="td_top"><center>서비스</center></th>
		<td class="td_top t_end">
		<label>
			<select name="sgis_term_service">
			  <option value="공통">공통</option>
			  <option value="지식정보">지식정보</option>
			  <option value="서비스정보">서비스정보</option>
			  <option value="openAPI">openAPI</option>
	        </select>
		</label>
		</th>
	  </tr>
	  <tr>
		<th><center>한글명</center></th>
		<td class="t_end"><label>
		<input name="sgis_term_name" type="text" size="100" MAXLENGTH="22"  />
		</label></td>
	  </tr>
	  <tr>
		<th><center>영문명</center></th>
		<td class="t_end"><input name="sgis_term_name_eng" type="text" size="100" MAXLENGTH="22" /></td>
	  </tr>
	  <tr>
		<th><center>설명</center></th>
		<td class="t_end"><textarea name="sgis_term_desc" cols="" rows=""></textarea></td>
	  </tr>
	  </table>
	  </div>
	  <div class="site_control_write_button">
	  	<a href="javascript:saveProcess();"><img src="/contents/gsks/images/button_ok.gif" alt="확인" border="0" /></a>
	  	<a href="gsks_01_06_tabpage05.jsp"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" alt="취소" border="0" /></a></div>
    </div></form>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
