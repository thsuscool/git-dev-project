<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage01.jsp
    * @description : 관리자 - 공지사항 게시판 리스트
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
<%


		GeneralBroker broker = null;
		RecordModel rm = null;
		String aT = lData.get("aT");
		String cond_service = lData.get("cond_service"); //구분
		String cond_type = lData.get("cond_type");	  //조회조건
		String cond_text = lData.get("cond_text");	  //검색어
		String pageNum = lData.get("pg");

		int rtn = 0;
		/* paging 초기화  */
		int pg = 1;
		int pgSize = 10;
		int blockSize = 10;
		int totPage   = 1;
		int totCount  = 0;

		if(!pageNum.equals("")) pg = Integer.parseInt(pageNum);
		if(pg == 0) pg = 1;

		try{

			broker = new GeneralBroker("adfa00");

			lData.setNumber("SEQ", 1);
			rm = broker.getList(lData);

			totCount = rm.getRowCount();							//totalList
			rm  = broker.getList(lData, pg, pgSize);	//pageList

		}catch(Exception e){
			  System.out.println("------------->"+e);
		}finally{

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

<script src=/contents/support/support.js></script>
<script type="text/javascript">

window.onload = function() {

}

function list(pg){
	fm.pg.value = pg;
	fm.submit();
}


function goDetailView(key1) {

	fm.sgis_board_seq.value   = key1;

	fm.action = 'gsks_01_06_tabpage01_view.jsp';
	fm.submit();
}

//성명 검색어 입력후 엔터키 입력시 자동조회
function passEnter(){
	if ( event.keyCode == 13 ) list(1);
}

//-->
</script>
<script type="text/JavaScript">
<!--
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
//-->
</script>
<body onLoad="MM_preloadImages('images/site_control_tab01_over.gif','images/site_control_tab02_over.gif','images/site_control_tab03_over.gif','images/site_control_tab04_over.gif','images/site_control_tab05_over.gif')">
<form name="fm" method="post" style="margin:0px;">
<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
<input type="hidden" name="pg"    value="<%=pg%>">
<!-- 상세조회 -->
<input type="hidden" name="sgis_board_seq" >

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
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage01.jsp"><font color="#FFFFFF"><strong>공지사항</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage02.jsp"><strong>FAQ</strong></a></td>
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

	  <div class="clear site_control_table left_mar_10">
  <table width="100%" cellpadding="0" cellspacing="0" class="table1" summary="사이트관리에 대한 내용입니다." >
    <caption>
    사이트관리
    </caption>
    <thead>
      <tr align="center">
        <th class="td_top">NO</th>
        <th class="td_top">구분</th>
        <th class="td_top"><center>제목</center></th>
        <th class="td_top">등록일자</th>
        <th class="td_top">게시기간</th>
        <th class="td_top">조회수</th>
        <th class="td_top">팝업</th>
      </tr>
    </thead>
    <tbody>

    <%
    int rowNum = totCount - ((pg - 1) * pgSize); //글번호

	while(rm!=null && rm.next()) {

		String sgis_board_seq = StringUtil.verify((String)rm.get("sgis_board_seq "));
		String sgis_board_title = StringUtil.verify((String)rm.get("sgis_board_title "));
		String sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name "));
		String sgis_board_cou = StringUtil.verify((String)rm.get("sgis_board_cou "));
		String create_date = StringUtil.verify((String)rm.get("create_date "));
		String sgis_board_use = StringUtil.verify((String)rm.get("sgis_board_use "));
		String sgis_board_pop_start = StringUtil.verify((String)rm.get("sgis_board_pop_start "));
		String sgis_board_pop_end = StringUtil.verify((String)rm.get("sgis_board_pop_end "));
		String sgis_board_pop_chk = StringUtil.verify((String)rm.get("sgis_board_pop_chk "));
	%>
      <tr onclick="javascript:goDetailView('<%=sgis_board_seq %>')" style="cursor:pointer">
        <td><%=rowNum-- %></td>
        <td><%=sgis_board_name %></td>
        <td class="cell_left"><%=sgis_board_title %></td>
        <td><%=create_date %></td>
        <td><%=sgis_board_pop_start %>~<%=sgis_board_pop_end %></td>
        <td><%=sgis_board_cou %></td>
        <td><%=sgis_board_pop_chk %></td>
      </tr>
    <%} %>
    </tbody>
  </table>
<div class="list_btn_right"><a href="/contents/gsks/gsks_01_06_tabpage01_write.jsp"><img src="/contents/gsks/images/button_write.gif" alt="등록" border="0" /></a></div>
  <div class="clear"></div>

 <!-- nodata 처리 -->
 <%@ include file="/contents/include/nodata.jsp" %>
 <!-- nodata 처리 -->
 
 <!-- page 처리 -->
 <%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->
  
		<div align="center">
      <div class="list_search ">
        <select class="search_sel_90" name="cond_service">
           <option value="">구분</option>
<%
	String sgis_board_id = "" ;
	String sgis_board_name_desc = "" ;
	
	try{
		lData.setNumber("SEQ", 5);
		rm = broker.getList(lData);
		while(rm!=null && rm.next()) {
			sgis_board_id = String.valueOf((BigDecimal)rm.get("sgis_board_id"));
			sgis_board_name_desc = StringUtil.verify((String)rm.get("sgis_board_name_desc"));
%>
	       <option value="<%=sgis_board_id %>" <%=cond_service.equals(sgis_board_id) ? "selected" : "" %>><%=sgis_board_name_desc %></option>
<%
		}
	}catch(Exception e){
		  System.out.println("------------->"+e);
	}finally{

	}
%>	    
	  	</select>  
		<select class="search_sel_90" name="cond_type">
			<option value=""  <%=cond_type.equals("")? "selected":""%>>전체</option>
			<option value="title" <%=cond_type.equals("title")? "selected":""%>>제목</option>
		    <option value="contents" <%=cond_type.equals("contents")? "selected":""%>>내용</option>
		</select>			
      <input name="cond_text" id="list_search_input" type="text" value="<%=cond_text%>" onkeydown="javascrit:passEnter()" />
      <input name="image" onclick="javascript:list(1)" type='image' id="search" src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />

      </div>
    </div>
	</div><div class="clear"></div>
</form>



  </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
