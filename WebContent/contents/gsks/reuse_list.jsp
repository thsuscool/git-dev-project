<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ page import="java.math.BigDecimal"%>
<%@ page import="kr.co.offton.jdf.db.RecordModel"%>
<%@ page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%
	GeneralBroker broker = null;
	RecordModel userSet  = null;
	RecordModel authSet  = null;
	RecordModel countSet  = null;   /// 2012-03-29  SWan

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
		broker = new GeneralBroker("adaa000"); ////쿼리 변경

		lData.setNumber("SEQ", 1);
		userSet = broker.getList(lData);

		totCount = userSet.getRowCount();							//totalList
		userSet  = broker.getList(lData, pg, pgSize);	//pageList

		lData.setNumber("SEQ", 2);
		authSet = broker.getList(lData);
		
		////////////////////////////
		lData.setNumber("SEQ", 7);
		countSet = broker.getList(lData);
		////////////////////////////
	}catch(Exception e) {
		System.out.print("*** gsks_01.jsp Exception info ***\n"+e);
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
<!DOCTYPE.jsp PUBLIC "-//W3C//DTD.jsp 4.0 Transitional//EN">
<HEAD>
<TITLE>통계지리정보서비스</TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<meta http-equiv="Content-Type" content="text.jsp; charset=utf-8" />
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/gsks/style/style_2012.css" type="text/css" media="all">
<script src=/contents/scripts/javascript.js></script>
<script src=/contents/scripts/common.js></script>
<script src=/contents/scripts/calendar.js></script>
<script src=/contents/scripts/stringUtil.js></script>
<script src=/contents/scripts/divwriter.js></script>

<script type="text/javascript">
	function MM_openBrWindow(theURL,winName,features) { //v2.0
	  window.open(theURL,winName,features);
	}
	function calender_view(data){
	  if(data=="on")document.getElementById('popup_calendar').style.display="block";
	  if(data=="off")document.getElementById('popup_calendar').style.display="none";
	}
</script>

<noscript>
<p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>
<script src=/contents/scripts/flash.js></script>
<noscript>
<p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>

</HEAD>
<BODY>

<div class="admin_middle">

<script type="text/javascript">
	function checkedAll(isCheck) {
		var chk = document.getElementsByName('chk');

		for(var i=0; i<chk.length; i++) {
			chk[i].checked = isCheck;
		}
	}

	//성명 검색어 입력후 엔터키 입력시 자동조회
	function passEnter(){
		if ( event.keyCode == 13 ) list(1);
	}
	
	function reuseSelect(memKey){
		var fm = document.listForm;

		fm.sgis_member_key.value = memKey;
		//alert(memKey);
		fm.aT.value              = 'one';
		fm.action = 'reuse_proc.jsp';
		fm.target = '_self';
		fm.submit();
		
	}
	function reuseAll(){
		var fm = document.listForm;
		
		if(!confirm("모든 신청을 승인하시겠습니까?")){
			return false;
		}
		
		fm.aT.value = 'all';
		fm.action = 'reuse_proc.jsp';
		fm.target = '_self';
		fm.submit();
	}
	
	
	function reuseStat() {
		var fm        = document.listForm;
		var chk       = document.getElementsByName('chk');
		var isChecked = false;

		for(var i=0; i<chk.length; i++) {
			if(chk[i].checked)	isChecked = true;
		}

		if(!isChecked) {
			alert('선택된 항목이 없습니다.');
			return;
		}else {
			if(!confirm('선택한 항목을 승인하시겠습니까?'))	return false;

			fm.aT.value = 'STAT';
			fm.action   = 'reuse_proc.jsp';
			fm.target   = '_self';
			fm.submit();
		}
	}
</script>

<form name="listForm" method="post">
<input type="hidden" name="pg"/>
<input type="hidden" name="aT"/>
<input type="hidden" name="sgis_member_key"/>
<div class="admin_content">

	<div class="clear"></div>

	<div class="content_title_1">
		<div class="content_title_2">계정정지 해지신청자 관리</div>
	</div>

	<div class="content_admin">
		<div class="list_wrap_2" style="border:0px solid red;">
			<% 
				String countSet_count = "";
				while(countSet != null && countSet.next()) {
					countSet_count = StringUtil.verify((String)countSet.get("reusecount").toString());
				}
			%>
			<div class="right right_mar_5"><b>신청자 수 <%=countSet_count%>명 </b></div>
			<div class="clear"></div>
			<table width="100%" cellpadding="0" cellspacing="0" class="table1" summary="신청자게시판" >
				<caption>신청자게시판</caption>
				<thead>
					<tr>
						<th class="td_top"><input type="checkbox" name="mainChk" onclick="checkedAll(this.checked)"></th>
						<th class="td_top">NO</th>
						<th class="td_top">성명</th>
						<th class="td_top">ID</th>
						<th class="td_top">등급</th>
						<th class="td_top">가입일자</th>
						<th class="td_top">신청일자</th>
						<th class="t_end td_top">신청접수</th>
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
						<td class="cell_center"><input type="checkbox" name="chk" id="chk" value="<%=sgis_member_key %>"/></td>
						<td class="cell_center"><%=rowNum %></td>
						<td class="cell_center"><%=sgis_name%></td>
						<td class="cell_center"><%=sgis_member_id %></td>
						<td class="cell_center"><%=sgis_auth_name %></td>
						<td class="cell_center"><%=create_date %></td>
						<td class="cell_center"><%=last_update_date %></td>
						<td class="t_end cell_center" onclick="javascript:reuseSelect('<%=sgis_member_key%>')" style="cursor:pointer">[신청 승인]</td>
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
		
			<div class="list_btn_left">
				<a href="#" onclick="javascript:reuseAll();"><img src="/contents/gsks/images/btn_all_agree.gif" alt="모두 승인" width="55" height="22" border="0"></a>
			</div>
			<div class="list_btn_right">
				<a href="javascript:reuseStat()"><img src="/contents/member/images/button_ok.gif" alt="확인" height="22" border="0"></a>
			</div>
		
			<div class="clear"></div>
	
			<!-- page 처리 start -->
			<center>
			<%@ include file="/contents/include/pagelist.jsp" %>
			</center>
			<!-- page 처리 end -->

			<div align="center">
				<div class="list_search">
					<b>정렬</b>
					<input type="radio" name="sort" value="1" <%=sort.equals("1") ? "checked" : "" %>>성명
					<input type="radio" name="sort" value="2" <%=sort.equals("2") ? "checked" : "" %>>가입일자
					<input type="radio" name="sort" value="3" <%=sort.equals("3") ? "checked" : "" %>>신청일자
					<%-- <select name="sort">
						<option value="1" <%=sort.equals("1") ? "selected" : "" %>>성명</option>
						<option value="2" <%=sort.equals("2") ? "selected" : "" %>>가입일자</option>
						<option value="3" <%=sort.equals("3") ? "selected" : "" %>>신청일자</option>
					</select> --%>
					</br>
					<b>검색</b>
					<select name="mem_grade">
						<option value="">등급</option>
						<%
							while(authSet != null && authSet.next()) {
								String auth_id   = StringUtil.verify((String)authSet.get("sgis_auth_id"));
								String auth_name = StringUtil.verify((String)authSet.get("sgis_auth_name"));
						%>
						<option value="<%=auth_id %>" <%=auth_id.equals(mem_grade) ? "selected" : "" %>><%=auth_name %></option>
						<%
							} 
						%>
					</select>
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

		</div>
	</div>
	<div class="clear"></div>

</div>
</form>

</div>

</BODY>
</html>