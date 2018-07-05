<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage03_write.jsp
    * @description : 관리자 - Q & A 게시판 글쓰기
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-17   김경열         1.0
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<script type="text/JavaScript">
<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
function calender_view(data){
	if(data=="on")document.getElementById('popup_calendar').style.display="block";
	if(data=="off")document.getElementById('popup_calendar').style.display="none";
}
//-->
</script>
<script src=/contents/scripts/common.js></script>
<script src=/contents/gsks/scripts/gsks_01_06_tabpage03.js></script>
<form name="fm" method="post" enctype="multipart/form-data">
<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
<input type="hidden" name="user"    value="<%=sc_userkey%>">
<!-- 상세조회 -->
  <div class="admin_content">
  <div class="admin_middle_title">

    <div class="middle_menu">
      <div class="menu_1" align="center"><a href="/contents/gsks/gsks_01.jsp" class="menu_link">사용자 관리</a></div>
      <div class="menu_2" align="center"><a href="/contents/gsks/gsks_01_02.jsp" class="menu_link">지식정보관리</a></div>
      <div class="menu_3" align="center"><a href="/contents/gsks/gsks_01_03.jsp" class="menu_link">OpenAPI인증키 관리</a></div>
      <div class="menu_4" align="center"><a href="/contents/gsks/gsks_01_04.jsp" class="menu_link">센서스경계 자료제공</a></div>
      <div class="menu_5" align="center"><a href="/contents/gsks/gsks_01_05.jsp" class="menu_link">로그 및 통계조회</a></div>
      <div class="menu_6" align="center"><a href="/contents/gsks/gsks_01_06.jsp" class="menu_link">사이트관리</a></div>
      <div class="menu_7" align="center"><a href="/contents/gsks/gsks_01_07.jsp" class="menu_link">시스템관리</a></div>
    </div>
  </div>
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
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage03.jsp"><font color="#FFFFFF"><strong>Q&A</strong></font></a></td>
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
	  <div class="site_control_write">
	  <table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" summary="사이트관리에 대한 내용입니다.">
	  <caption>사이트관리</caption>
	  <tr>
		<th width="100" class="td_top"><center>제목</center></th>
		<td class="td_top t_end">
		<label>
		<input name="sgis_board_title" type="text" size="100" maxlength="25" />
		  </label>
		</th>		</tr>
	  <tr>
		<th><center>시스템</center></th>
		<td class="t_end"><label>
		<select name="sgis_board_name">
  			<option value="지식정보" selected="selected">지식정보</option>
	        <option value="서비스정보">서비스정보</option>
	        <option value="openAPI">openAPI</option>
	        <option value="내비게이터">내비게이터</option>
	        <option value="민간">민간</option>
	        <option value="공공">공공</option>
	        <option value="기타">기타</option>
	      </select>
		</label></td>
	  </tr>
      <tr>
        <th><center>첨부</center></th>
         <td class="t_end">
				  <input name="file" type="file" size="70" class="input_mid" />
				</td>
      </tr>
	  <tr>
		<th><center>내용</center></th>
		<td class="t_end"><textarea name="sgis_board_desc" cols="80" rows="20" onkeyup="len_chk('4000');"></textarea></td>
	  </tr>
	  </table>
	  </div>
	  <div class="site_control_write_button">
	  	<a href="javascript:saveProcess('gsks_01_06_tabpage03_prc.jsp')"><img src="/contents/gsks/images/button_ok.gif" alt="확인" border="0" /></a>
	  	<a href="gsks_01_06_tabpage03.jsp"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" alt="취소" border="0" /></a>
	  </div>
    </div>
  </div>
</div>
<div class="clear"></div>
</form>
<%@ include file="/contents/gsks/include/footer.jsp" %>
