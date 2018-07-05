<%--
	/*********************************************************
	* @source      : gsks_06.jsp
	* @description : 관리자 / 관리자 관리
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
	RecordModel authSet  = null;

	String list_search_input  = lData.get("list_search_input");	//검색어
	String sort               = lData.get("sort");			    //정렬기준
	String mem_status         = lData.get("mem_status");		//회원 상태별
	String mem_grade          = lData.get("mem_grade");			//회원 등급별
	String mem_cond          = lData.get("mem_cond");			//회원 등급별

	/* paging 초기화  */
	int pg        = lData.getInt("pg");;
	int pgSize    = 10;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;

	if(pg==0) pg = 1;

	try {
		broker = new GeneralBroker("adaa0000");

		lData.setNumber("SEQ", 1);
		userSet = broker.getList(lData);

		totCount = userSet.getRowCount();							//totalList
		userSet  = broker.getList(lData, pg, pgSize);	//pageList

		/* lData.setNumber("SEQ", 2);
		authSet = broker.getList(lData); */
	}catch(Exception e) {
		System.out.print("*** gsks_06.jsp Exception info ***\n"+e);
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
		fm.action = 'gsks_06.jsp';
		fm.target = '_self';
		fm.submit();
	}
	
	// 관리자 신규등록 
	function insertUser() {
		var fm = document.listForm;

		fm.aT.value = 'INS';
		fm.action = 'gsks_06_correct.jsp';
		fm.target = '_self';
		fm.submit();
	}
	
	function updateUser(memKey,pg) {
		var fm = document.listForm;

		fm.pg.value = pg;
		fm.sgis_member_key.value = memKey;
		fm.aT.value = 'UPD';
		fm.action = 'gsks_06_correct.jsp';
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
		<div class="content_title_2">관리자 권한 관리</div>
		<ul class="navigation">
			<li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
			<li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">관리자 관리</a> > <a href="#">관리자 권한 관리</a></li>
		</ul>
	</div>

	<div class="content_admin">
		<div class="list_wrap">
			<div class="left left_mar_10"></div>

			<div class="right right_mar_5"><b>관리자 수 <%=totCount %>명</b></div>
			<div class="clear"></div>

			<table width="100%" cellpadding="0" cellspacing="0" class="table1" summary="사용자게시판" >
				<caption>관리자게시판</caption>
				<thead>
					<tr>
						<th class="td_top">NO</th>
						<th class="td_top">성명</th>
						<th class="td_top">ID</th>
						<th class="td_top">등록일자</th>
						<th class="t_end td_top">수정일자</th>
					</tr>
				</thead>
				<tbody>
					<%
						if(totCount > 0) {
							String sgis_member_key  = "";
							String sgis_name        = "";
							String sgis_member_id   = "";
							String sgis_auth_id     = "";
							String sgis_auth_name   = "";
							String sgis_use_che     = "";
							String create_date      = "";
							String last_update_date = "";
							String know_cnt         = "";
							String interest_cnt     = "";
							String log_status = "";

							int rowNum = totCount - ((pg - 1) * pgSize);
							while(userSet != null && userSet.next()) {
								sgis_member_key  = StringUtil.verify((String)userSet.get("sgis_member_key"));
								sgis_name        = StringUtil.verify((String)userSet.get("sgis_name"));
								sgis_member_id   = StringUtil.verify((String)userSet.get("sgis_member_id"));
								sgis_auth_id     = StringUtil.verify((String)userSet.get("sgis_auth_id"));
								sgis_auth_name   = StringUtil.verify((String)userSet.get("sgis_auth_name"));
								sgis_use_che     = StringUtil.verify(((Character)userSet.get("sgis_use_che")).toString());
								create_date      = StringUtil.verify((String)userSet.get("create_date"));
								last_update_date = StringUtil.verify((String)userSet.get("last_update_date"));
								know_cnt         = StringUtil.verify((String)userSet.get("know_cnt"));
								interest_cnt     = StringUtil.verify((String)userSet.get("interest_cnt"));
								log_status       = StringUtil.verify((String)userSet.get("log_status"));
					%>
					<tr>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=rowNum %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=sgis_name %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=sgis_member_id %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=create_date %></td>
						<td class="t_end cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=last_update_date %></td>
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

			<div align="center">
				<div class="list_search">
					<select class="search_sel" name="mem_cond">
						<option value="">전체</option>
						<option value="성명" <%=mem_cond.equals("성명") ? "selected" : "" %>>성명</option>
						<option value="ID" <%=mem_cond.equals("ID") ? "selected" : "" %>>ID</option>
					</select>
					<input name="list_search_input" type="text" id="list_search_input" value="<%=list_search_input%>" onkeydown="javascrit:passEnter()"/>
					<input name="image" onclick="javascript:list(1)" type='image' id="search" src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
				</div>
			</div>

			<div class="clear"></div>

			<iframe name="excelFrame" src="" frameborder=0 width=0 height=0></iframe>
		</div>
	</div>
	<div class="clear"></div>
</div>
</form>
<!-- end admin_middle(include) -->
<%@ include file="/contents/gsks/include/footer.jsp" %>