<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;

	/* paging 초기화  */
	int pg = 1;
	int pgSize = 15;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;
	String autoApproveFlag = "N";

	if(lData.containsKey("pg"))        pg = lData.getInt("pg");
	if(StringUtil.isEmpty(lData.getString("sort"))) lData.setString("sort", "1");	//신청일자순

	try {
		broker = new GeneralBroker("apaa00");
		
		lData.setString("PARAM", "IS_AUTO_APPROVE");
		rm = broker.getList(lData);
		if(rm.next())	autoApproveFlag = (String)rm.get("value");	//자동승인여부
		
		lData.setString("PARAM", "API_APPLY_LIST");
		rm = broker.getList(lData);
		if(rm.next())	totCount = rm.getRowCount();	//리스트 전체 수

		lData.setString("PARAM", "API_APPLY_LIST");
		rm = broker.getList(lData, pg, pgSize);

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
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
<script language="javascript">
	function searchClicked() {
			document.apiFm.submit();
	}

	function list(pg){
		document.apiFm.pg.value = pg;
		document.apiFm.submit();
	}

	function detailView(key) {
		var fm=document.apiFm;
		fm.api_auth_key.value=key;
		fm.action="gsks_01_03_01.jsp";
		fm.submit();
	}
	
	function setApprovalFlag(){
		var fm=document.apiFm;
		fm.target = "autoApproveFrame";
		fm.action="gsks_01_03_apply.jsp";
		fm.submit();
	}
</script>

<div class="admin_content">
  
    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">OpenAPI인증키 관리</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="#">OpenAPI인증키 관리</a></li>
      </ul>
    </div>
    <div class="content_admin">
    	<div class="list_wrap">
    <div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
					    <a href="gsks_01_03.jsp"><font color="#FFFFFF"><strong>인증키관리</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02.jsp"><strong>그룹설정</strong></a></td>
					<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02_2.jsp"><strong>그룹설정(NEW)</strong></a></td> -->
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_03_tab_page_03.jsp"><strong>항목관리</strong></a></td>
					<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_03_tab_page_03_2.jsp"><strong>항목관리(NEW)</strong></a></td> -->
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_04.jsp"><strong>서비스로그</strong></a></td>
				</tr>
			<tr>
				<td colspan="4"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="100%" height="1px"></td>
			</tr>
		</table>
		</div>
		<form name="apiFm" method="post" style="margin-top:0px;">
        	<input type="hidden" name="pg" value="<%=pg %>">
        	<input type="hidden" name="api_auth_key">
		<table style="margin:0px;" width="100%">
			<tr>
				<td width="100%" align="right">
					<input type="checkbox" name="approvalFlag" id="approvalFlag" value="Y" onclick="javascript:setApprovalFlag()">자동승인
				</td>
			</tr>
		</table>
       <div class="clear">
  <table width="100%" cellpadding="0" cellspacing="0" class="table1" summary="인증키관리에 대한 내용입니다." >
    <caption>
    인증키관리
    </caption>
    <thead>
      <tr>
        <th class="td_top">NO</th>
        <th class="td_top">신청자(ID)</th>
        <th class="td_top">사용처</th>
        <th class="td_top">담당자</th>
        <th class="td_top">시스템명</th>
        <th class="td_top">예상<br>사용자수</th>
        <th class="td_top">신청일자</th>
        <th class="td_top">승인상태</th>
        <th class="t_end td_top">승인/반려<br>처리</th>
      </tr>
    </thead>
    <tbody>
    <%
    	try {

    		int rowcnt=0;
    		while(rm != null && rm.next()) {
    			String api_auth_key= StringUtil.verify((String)rm.get("api_auth_key"));
    			String sgis_name= StringUtil.verify((String)rm.get("sgis_name"));
    			String sgis_member_id= StringUtil.verify((String)rm.get("sgis_member_id"));
    			String api_use_org= StringUtil.verify((String)rm.get("api_use_org"));
    			String api_use_name= StringUtil.verify_s((String)rm.get("api_use_name"));
    			String api_title= StringUtil.verify((String)rm.get("api_title"));
    			String api_esti_user_count= String.valueOf((BigDecimal)rm.get("api_esti_user_count"));
    			String create_date= StringUtil.verify((String)rm.get("create_date"));
    			String api_approve_status= String.valueOf((Character)rm.get("api_approve_status"));
    			String api_approve_date= StringUtil.verify((String)rm.get("api_approve_date"));
    			String api_approve_status_name= StringUtil.verify((String)rm.get("api_approve_status_name"));
    			String api_version= StringUtil.verify((String)rm.get("api_version"));
    %>
      <tr>
        <td class="cell_center"><%=(totCount - ((pg-1)*pgSize) - rowcnt) %></td>
        <td class="cell_left"><%=sgis_name %>(<%=sgis_member_id %>)</td>
        <td class="cell_center"><%=api_use_org %></td>
        <td class="cell_leftr"><%=api_use_name %></td>
        <td class="cell_left"><%=StringUtil.toShortenStringB(api_title,8) %></td>
        <td class="cell_center"><%=api_esti_user_count %></td>
        <td class="cell_center"><%=create_date %></td>
        <td class="cell_center"><%=api_approve_status_name %><%if(!api_approve_status.equals("S")) { %><br>(<%=api_approve_date %>)<%} %></td>
        <td class="t_end cell_center"><a href="javascript:detailView('<%=api_auth_key %>')">[상세]</a></td>
      </tr>
     <% rowcnt++;} %>

     <%if(rowcnt == 0) {%>
     	<tr>
     		<td colspan="9" class="cell_center">No Data</td>
     	</tr>
     <%} %>
     <%} catch(Exception e) {
    		System.out.print("sgisWebError : ");
    		//2015-12-03 시큐어코딩
    		//e.printStackTrace();
    		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
     } %>
    </tbody>
  </table></div>

<!-- page 처리 -->
<%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->

<div class="clear"><br></div>

    <div align="center">
          <b>정렬</b>
		  <input type="radio" name="sort" value="1" <%if(lData.getString("sort").equals("1")) {%>checked<%} %>>신청일자
		  <input type="radio" name="sort" value="2" <%if(lData.getString("sort").equals("2")) {%>checked<%} %>>예상사용자수						
          <select name="search_sel2" class="search_sel" style="width:50px">
            <option value="">전체</option>
            <option value="S" <%if(lData.getString("search_sel2").equals("S")) {%>selected<%} %>>신청</option>
            <option value="A" <%if(lData.getString("search_sel2").equals("A")) {%>selected<%} %>>승인</option>
            <option value="B" <%if(lData.getString("search_sel2").equals("B")) {%>selected<%} %>>반려</option>
          </select>
          <select name="search_sel3" class="search_sel" style="width:50px">
            <option value="">전체</option>
            <option value="개인" <%if(lData.getString("search_sel3").equals("개인")) {%>selected<%} %>>개인</option>
            <option value="기관" <%if(lData.getString("search_sel3").equals("기관")) {%>selected<%} %>>기관</option>
          </select>		  
          <b>신청자(ID)</b> 
          <input name="search_input" type="text" id="list_search_input" style="width:65px" value="<%=lData.getString("search_input") %>"/>						
          <input name="image" onclick="searchClicked();" type='image' src="/contents/support/images/support_button_search.gif" alt="검색" align="middle" width="57px" height="19px" border="0" />
    </div>
          </form>
	</div><div class="clear"></div>

    </div>
  </div>

<div class="clear"></div>
<script language="javascript">
	if("<%=autoApproveFlag%>" == "Y"){
		document.getElementById("approvalFlag").checked = "checked";
	}
</script>
<iframe name="autoApproveFrame" id="autoApproveFrame" src="#" width="0" height="0" scrolling="no" frameborder="0"></iframe>
<%@ include file="/contents/gsks/include/footer.jsp" %>
