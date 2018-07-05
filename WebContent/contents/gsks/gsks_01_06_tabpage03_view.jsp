<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage03_view.jsp
    * @description : 관리자 - Q & A 게시판 상세보기
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-17   김경열         1.0
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="kr.co.offton.jdf.db.*" %>
<%@ page import="kr.co.offton.pdf.basis.*"%>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%
	String leftMenu="supprot";
	DbManager dbmgr = null;
	RecordModel rm = null;
	StringBuffer sb = new StringBuffer(1024);
	String aT = lData.get("aT");
	String seq = lData.get("sgis_board_seq");
	String rep_seq = lData.get("sgis_board_rep_seq");
	int pg = lData.getInt("pg");

	String sgis_board_seq = "" ;
	String sgis_board_rep_seq = "";
	String sgis_board_title = "" ;
	String sgis_board_name = "" ;
	String sgis_board_desc = "" ;
	String sgis_board_cou = "" ;
	String sgis_board_file_loc = "" ;
	String create_date = "" ;
	String create_user = "" ;

	String p_seq ="";
	String n_seq ="";

	try{

		dbmgr = new DbManager();
		/*
		//-- 조회수 증가 :관리자는 제외
		sb.append(" Update sgis_board 							\n");
		sb.append("	 set sgis_board_cou = sgis_board_cou + 1 	\n");
		sb.append("		 where  sgis_board_seq = ? ; 			\n");


		dbmgr.prepareStatement(sb.toString());
		dbmgr.pstmtSet(seq);
		dbmgr.execute();
    */
		//-- 게시글 조회
		sb = new StringBuffer(1024);

		sb.append(" select								\n");
		sb.append("	to_char(sgis_board_seq) as sgis_board_seq,						\n");
		sb.append(" to_char(sgis_board_rep_seq) as sgis_board_rep_seq,				\n");
		sb.append("	sgis_board_title,						\n");
		sb.append("	sgis_board_name,					\n");
		sb.append("	sgis_board_desc,					\n");
		sb.append("	to_char(sgis_board_cou) as sgis_board_cou,						\n");
		sb.append("	to_char(create_date, 'YYYY-MM-DD') as create_date,						\n");
		sb.append(" to_char(create_user) as create_user,		\n");
		sb.append(" sgis_board_file_loc     		\n");
		sb.append("		 from sgis_board					\n");
		sb.append("			 where sgis_board_seq = ? and sgis_board_rep_seq = ?		\n");

		dbmgr.prepareStatement(sb.toString());
		dbmgr.pstmtSet(seq);
		dbmgr.pstmtSet(rep_seq);
		rm = dbmgr.select();

		while(rm!=null && rm.next()) {

			sgis_board_seq = StringUtil.verify((String)rm.get("sgis_board_seq"));
			sgis_board_rep_seq = StringUtil.verify((String)rm.get("sgis_board_rep_seq"));
			sgis_board_title = StringUtil.verify((String)rm.get("sgis_board_title"));
			sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name"));
			sgis_board_desc = StringUtil.toLine((String)rm.get("sgis_board_desc"));
			sgis_board_cou = StringUtil.verify((String)rm.get("sgis_board_cou"));
			sgis_board_file_loc = StringUtil.verify((String)rm.get("sgis_board_file_loc"));
			create_date = StringUtil.verify((String)rm.get("create_date"));
			create_user = StringUtil.verify((String)rm.get("create_user"));
		}

		//--이전글, 다음글 조회
		sb = new StringBuffer(1024);

		sb.append("select		\n");
		sb.append("	 to_char(sgis_board_seq) as sgis_board_seq,		\n");
		sb.append("      to_char((SELECT max(sgis_board_seq)			\n");
		sb.append("                FROM sgis_board		\n");
		sb.append("               WHERE sgis_board_seq < ? AND sgis_board_use = 'Y')) as p_seq,		\n");
		sb.append("      to_char((SELECT min(sgis_board_seq)		\n");
		sb.append("                FROM sgis_board		\n");
		sb.append("               WHERE sgis_board_seq > ? AND sgis_board_use = 'Y')) as n_seq		\n");
		sb.append("from		\n");
		sb.append("	 sgis_board a		\n");
		sb.append("where		\n");
		sb.append("	  sgis_board_seq = ?;		\n");

		dbmgr.prepareStatement(sb.toString());
		dbmgr.pstmtSet(seq);
		dbmgr.pstmtSet(seq);
		dbmgr.pstmtSet(seq);
		rm = dbmgr.select();

		while(rm!=null && rm.next()) {

			p_seq = StringUtil.verify((String)rm.get("p_seq"));
			n_seq = StringUtil.verify((String)rm.get("n_seq"));

		}

	}catch(Exception e){
		  System.out.println("------------->"+e);
	}finally{
		dbmgr.close();
	}
%>

<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<script src=/contents/gsks/scripts/gsks_01_06_tabpage03.js></script>
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
<script type="text/javascript">

function goDetailUpdate(key1) {
	if(fm.sc_authid.value == "01"){
		fm.sgis_board_seq.value   = key1;

		fm.action = 'gsks_01_06_tabpage03_modify.jsp';
		fm.submit();
	}else{
		alert("관리자만 수정 가능합니다.");
	}
}
function goDetailRep(key1) {
	if(fm.sc_authid.value == "01"){
		fm.sgis_board_seq.value   = key1;

		fm.action = 'gsks_01_06_tabpage03_reply.jsp';
		fm.submit();
	}else{
		alert("관리자만 답변 가능합니다.");
	}
}

function listProcess(){

	var 	url = 'gsks_01_06_tabpage03.jsp';

	fm.action = url;  //리스트 조회
	fm.target = '_self';
	fm.submit();

}

</script>

<form name="fm" method="post"  enctype="multipart/form-data">
<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
<input type="hidden" name="pg"    value="<%=pg%>">
<!-- 상세조회 -->
<input type="hidden" name="sgis_board_seq" value="<%=sgis_board_seq %>" >
<input type="hidden" name="sgis_board_rep_seq" value="<%=sgis_board_rep_seq %>" >
<input type="hidden" name="create_user" value="<%=create_user %>">
<input type="hidden" name="user" value="<%=sc_userkey %>">
<input type="hidden" name="sc_authid" value="<%=sc_authid %>">
<input type="hidden" name="cond_type" value="<%=lData.get("cond_type")%>">
<input type="hidden" name="cond_text" value="<%=lData.get("cond_text")%>">
<input type="hidden" name="cond_service" value="<%=lData.get("cond_service")%>">
<!-- 파일다운로드 --> 
</form>
<form name="fd" method="post" action="">
    <input type="hidden" name="filename" value="<%=sgis_board_file_loc %>" />
    <input type="hidden" name="path" value="/board/" />
</form>
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
	  <table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" style="table-layout:fixed; word-break:break-all;" summary="사이트관리에 대한 내용입니다.">
	  <caption>사이트관리</caption>
	  <tr>
		<th width="100" class="td_top"><center>제목</center></th>
		<td class="td_top t_end"><%=sgis_board_title %></td>
	  </tr>
	  <tr>
		<th><center>서비스</center></th>
		<td class="t_end"><%=sgis_board_name %></td>
	  </tr>

    <tr>
      <th><center>첨부파일</center></th>
        <td class="t_end">
				<span onclick="javascript:fileDownload(fd,'<%=sgis_board_file_loc%>')" style="cursor:pointer;text-decoration:underline"><%=!sgis_board_file_loc.equals("")? sgis_board_file_loc:""%></span>
				</td>
     </tr>

	  <tr>
		<th height="230"><center>내용</center></th>
		<td class="t_end" valign="top"><%=sgis_board_desc %></td>
	  </tr>
	  </table>
	  </div>

	  <div class="site_control_write_button">
	  	<a href="javascript:goDetailUpdate('<%=sgis_board_seq %>')"><img src="/contents/gsks/images/button_modify.gif" alt="수정" border="0" /></a>
	  	<%if (sgis_board_rep_seq.equals("0")) { %>
	  	<a href="javascript:goDetailRep('<%=sgis_board_seq %>')"><img src="/contents/gsks/images/button_reply.gif" alt="답변" border="0" /></a>
	  	<% } %>
	  	<a href="javascript:deleteProcess()"><img src="/contents/gsks/images/button_delete.gif" alt="삭제" border="0" /></a>
	  	<a href="javascript:listProcess();"><img src="/contents/gsks/images/button_list.gif" alt="목록" border="0" /></a>
	  </div>
	</div>
    </div>
  </div>
</div>
<div class="clear"></div>

<!------------------------right끝---------------------------->
<iframe name="downloadIfr" height="0" width=0 frameborder=0></iframe>


<%@ include file="/contents/gsks/include/footer.jsp" %>
