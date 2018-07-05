<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage05.jsp
    * @description : 관리자 - 용어설명 게시판 리스트
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

<%
	String leftMenu="supprot";

	DbManager dbmgr = null;
	RecordModel rm = null;
	StringBuffer sb = new StringBuffer(1024);
	String aT = lData.get("aT");
	String cond_type = lData.get("cond_type");	  //조회조건
	String cond_text = lData.get("cond_text");	  //검색어

	int rtn = 0;
	/* paging 초기화  */
	int pg = 1;
	int pgSize = 5;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;


	try{

		dbmgr = new DbManager();

		sb.append("SELECT						 							\n");
		sb.append(" 	to_char( sgis_term_id) as sgis_term_id,				\n");
		sb.append("		sgis_term_service,									\n");
		sb.append("		sgis_term_name,										\n");
		sb.append("		sgis_term_name_eng,									\n");
		sb.append("		sgis_term_desc										\n");
		sb.append("FROM SGIS_TERM											\n");

		//검색조건 처리
		if(!cond_text.equals("")){
			if(cond_type.equals("")){  //제목,내용 전체 검색
				sb.append("   WHERE ( sgis_term_name LIKE '%'||'"+cond_text+"'||'%'  OR sgis_term_desc LIKE '%'||'"+cond_text+"'||'%' )  \n");
			}else if(cond_type.equals("title")){
				sb.append("   WHERE ( sgis_term_name LIKE '%'||'"+cond_text+"'||'%' )  \n");
			}else if(cond_type.equals("contents")){
				sb.append("   WHERE ( sgis_term_name LIKE '%'||'"+cond_text+"'||'%' )  \n");
			}
		}
		sb.append(" ORDER BY sgis_term_id DESC	 \n");



		dbmgr.prepareStatement(sb.toString());
		rm = dbmgr.select();

		if(lData.containsKey("pg"))        pg = lData.getInt("pg");
		totCount = rm.getRowCount();	//리스트 전체 수

		rm = dbmgr.select(pg, pgSize);   //page 처리 list

	}catch(Exception e){
		  System.out.println("------------->"+e);
	}finally{
		dbmgr.close();
	}

	/*  block 처리 */
	totPage  = totCount / pgSize;
	if (totCount%pgSize > 0) totPage++;

	int totalBlock = totPage/blockSize;
	if(totPage%blockSize > 0) totalBlock++;
	int block = pg/blockSize;
	if(pg % blockSize > 0) block++; //현재블럭표시

	int firstPage = (block-1)*blockSize + 1;
	int lastPage = block*blockSize;

	if(totalBlock <= block) {
		lastPage = totPage;
	}

%>
<script type="text/JavaScript">
<!--
window.onload = function() {}

function list(pg){
	fm.pg.value = pg;
	fm.submit();
}
function goDetailView(key1) {
	fm.sgis_board_seq.value   = key1;
	fm.action = 'support_01_closeup.jsp';
	fm.submit();
}
//-->
</script>
    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
    
<script src="/contents/gsks/scripts/gsks_01_06_tabpage05.js"></script>
<form name="fm" method="post">
<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
<input type="hidden" name="pg"    value="<%=pg%>">
<input type="hidden" name="sgis_term_id" value=""/>
<input type="hidden" name="check_ID" value=""/>

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
	  <div class="clear site_control_table left_mar_10">
  <table width="734" cellpadding="0" cellspacing="0" class="table1" summary="사이트관리에 대한 내용입니다." >
    <caption>
    사이트관리
    </caption>
    <thead>
      <tr>
        <th class="td_top">선택</th>
        <th class="td_top">서비스</th>
        <th class="td_top">한글명</th>
        <th class="td_top">영문명</th>
        <th class="td_top">설명</th>
        <th class="t_end td_top">수정</th>
      </tr>
    </thead>
    <tbody>
    <%
    int rowNum = totCount - ((pg - 1) * pgSize); //글번호

	while(rm!=null && rm.next()) {

		String sgis_term_id = StringUtil.verify((String)rm.get("sgis_term_id "));
		String sgis_term_service = StringUtil.verify((String)rm.get("sgis_term_service "));
		String sgis_term_name = StringUtil.verify((String)rm.get("sgis_term_name "));
		String sgis_term_name_eng = StringUtil.verify((String)rm.get("sgis_term_name_eng "));
		String sgis_term_desc = StringUtil.verify((String)rm.get("sgis_term_desc "));
	%>
      <tr>
        <td>
			<label>
	          <input type="checkbox" name="checkbox" value="<%=sgis_term_id %>">
	        </label>
        </td>
        <td><%=sgis_term_service %></td>
        <td width="100"><%=sgis_term_name %></td>
        <td width="100" class="cell_left"><%=sgis_term_name_eng %></td>
        <td width="300"  class="cell_left"><%=sgis_term_desc %></td>
        <td class="t_end cell_center"><a href="javascript:modifyProcess('<%=sgis_term_id %>')">[수정]</a></td>
      </tr>
    <%} %>
    </tbody>
  </table>
<div class="list_btn_right"><a href="/contents/gsks/gsks_01_06_tabpage05_write.jsp"><img src="/contents/gsks/images/admin_01_04_tab_page_03_button_add.gif" alt="추가" border="0" /></a>
<a href="javascript:delProc();"><img src="/contents/gsks/images/admin_01_04_tab_page_03_button_delete.gif" alt="삭제" border="0" /></a></div>
  <div class="clear"></div>
<!-- page 처리 -->
<%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->
    <div align="center">
      <div class="list_search ">
        <form action="" method="">
          <select class="search_sel" name="cond_type">
            <option value="title" selected="selected">제목</option>
            <option value="contents">내용</option>
            <option value="contents">제목+내용</option>
            </select>
      <input name="cond_text" id="list_search_input" type="text" value="<%=cond_text%>" />
      <input name="image" onclick="javascript:list(1)" type='image' id="search" src="/contents/support/images/support_button_search.gif" alt="로그인" align="absmiddle" width="57px" height="19px" border="0" />
          </form>
      </div>
    </div>
	</div><div class="clear"></div>




  </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
