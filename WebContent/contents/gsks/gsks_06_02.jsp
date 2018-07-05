<%--
	/*********************************************************
	* @source      : gsks_06_02.jsp
	* @description : 관리자 / 관리자 활동 로그
	*********************************************************
	*    DATE    |     AUTHOR      |        DESC
	*--------------------------------------------------------
	* 2012.04.10       Bobby               최초등록
	*********************************************************
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="java.math.BigDecimal"%>
<%@ page import="kr.co.offton.jdf.db.RecordModel"%>
<%@ page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	GeneralBroker broker = null;
	RecordModel userSet  = null;

	String list_search_input  = lData.get("list_search_input");	//검색어
	String mem_cond           = lData.get("mem_cond");			//회원 등급별

	/* paging 초기화  */
	int pg        = lData.getInt("pg");;
	int pgSize    = 10;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;

	if(pg==0){
		pg = 1;
	}

	try {
		broker = new GeneralBroker("adaa00000");

		lData.setNumber("SEQ", 1);
		userSet = broker.getList(lData);

		totCount = userSet.getRowCount();							//totalList
		userSet  = broker.getList(lData, pg, pgSize);	//pageList
	}catch(Exception e) {
		System.out.print("*** gsks_06_02.jsp Exception info ***\n"+e);
	}finally {
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
<script type="text/javascript">
	function list(pg){
		var fm = document.listForm;

		fm.pg.value = pg;
		fm.action = 'gsks_06_02.jsp';
		fm.target = '_self';
		fm.submit();
	}

	function selectedRowCheck(key) {
		var chk = document.getElementsByName('chk');

		for(var i=0; i<chk.length; i++) {
			if(chk[i].value == key)	chk[i].checked = true;
		}
	}

	//성명 검색어 입력후 엔터키 입력시 자동조회
	function passEnter(){
		if ( event.keyCode == 13 ) list(1);
	}
</script>

<form name="listForm" method="post">
<input type="hidden" name="pg"/>
<input type="hidden" name="aT"/>
<input type="hidden" name="sgis_member_key"/>
<div class="admin_content">
	<!-- 메뉴Include -->
	<%@ include file="/contents/gsks/include/gsks_menu_AM.jsp" %>

	<div class="clear"></div>

	<div class="content_title_1">
		<div class="content_title_2">관리자 활동 로그</div>
		<ul class="navigation">
			<li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
			<li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_06.jsp">관리자 관리</a> > <a href="#">관리자 활동 로그</a></li>
		</ul>
	</div>

	<div class="content_admin">
		<div class="list_wrap">
			<div class="left left_mar_10"></div>

			<div class="right right_mar_5"><b>로그내역 <%=totCount %>건</b></div>
			<div class="clear"></div>

			<table width="100%" cellpadding="0" cellspacing="0" class="table1" summary="사용자게시판" >
				<caption>관리자게시판</caption>
				<thead>
					<tr>
						<th class="td_top">NO</th>
						<th class="td_top">성명</th>
						<th class="td_top">ID</th>
						<th class="td_top">활동 내역</th>
						<th class="t_end td_top">활동 일시</th>
					</tr>
				</thead>
				<tbody>
					<%
						if(totCount > 0) {
							//int seq = 0;
							String name = "";
							String id = "";
							String log = "";
							String logdate = "";

							int rowNum = totCount - ((pg - 1) * pgSize);
							while(userSet != null && userSet.next()) {
								//seq = StringUtil.verify((int)userSet.get("seq"));
								name = StringUtil.verify((String)userSet.get("sgis_name"));
								id = StringUtil.verify((String)userSet.get("id"));
								log = StringUtil.verify((String)userSet.get("log"));
								logdate = StringUtil.verify((String)userSet.get("logdate"));
					%>
					<tr>
						<td class="cell_center"><%=rowNum %></td>
						<td class="cell_center"><%=name %></td>
						<td class="cell_center"><%=id %></td>
						<td class="cell_center"><%=log %></td>
						<td class="t_end cell_center"><%=logdate %></td>
					</tr>
					<%
								rowNum--;
							}//end of while
						}else{
					%>
					<tr>
						<td class="cell_center" colspan="9">데이터가 존재하지 않습니다.</td>
					</tr>
					<%
						}	
					%>
				</tbody>
			</table>

			<div class="list_btn_right">
				&nbsp;
				<!-- <a href="javascript:insertUser()"><img src="/contents/gsks/images/admin_button_user_new.gif" alt="관리자 신규등록" width="100" height="22" border="0"></a> -->
			</div>

			<div class="clear"></div>

			<!-- page 처리 start -->
			<center>
			<%@ include file="/contents/include/pagelist.jsp" %>
			</center>
			<!-- page 처리 end -->
			
			<div class="clear">&nbsp;</div>

			<div align="center">
				<div class="list_search_2" style="border:0px solid red;">
					<select class="search_sel" name="mem_cond">
						<option value="">전체</option>
						<option value="name" <%=mem_cond.equals("name") ? "selected" : "" %>>성명</option>
						<option value="id" <%=mem_cond.equals("id") ? "selected" : "" %>>ID</option>
						<option value="log" <%=mem_cond.equals("log") ? "selected" : "" %>>활동 내역</option>
					</select>
					<input name="list_search_input" type="text" id="list_search_input" value="<%=list_search_input%>" onkeydown="javascrit:passEnter()"/>
					<input name="image" onclick="javascript:list(1)" type='image' id="search" src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
				</div>
			</div>
			
		</div>
	</div>
	<div class="clear"></div>
</div>
</form>
<!-- end admin_middle(include) -->
<%@ include file="/contents/gsks/include/footer.jsp" %>