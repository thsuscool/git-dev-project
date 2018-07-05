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
		RecordModel rm1 = null;

		/* paging 초기화  */
		int pg = 1;
		int pgSize = 15;
		int blockSize = 10;
		int totPage   = 1;
		int totCount  = 0;

		if(lData.containsKey("pg"))        pg = lData.getInt("pg");

		try {

			broker = new GeneralBroker("ceaa00");

			/**************************************/
			/* 조회 */
			/**************************************/
			lData.setString("PARAM", "CENSUS_APPLY_GROUP_LIST");
			rm = broker.getList(lData);
			totCount = rm.getRowCount();	//리스트 전체 수

			rm = broker.getList(lData, pg, pgSize);

		} catch(Exception e) {
			out.print(e);
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
	function list(pg){
		document.censusFm.pg.value = pg;
		document.censusFm.submit();
	}

function onLoadAjax(id) {}

	function searchClicked() {
			document.censusFm.submit();
	}

	function detailView(id) {
		var fm=document.censusFm;
		fm.sgis_census_req_id.value = id;
		fm.action="gsks_01_04_04.jsp";
		fm.submit();
	}


//대상자료 선택 (사용하지 않음)
function locationChanged() {}

</script>

  	<form name="censusFm" method="post">
			<input type="hidden" name="aT">
			<input type="hidden" name="sgis_census_req_id">
     	<input type="hidden" name="pg" value="<%=pg %>">

  <div class="admin_content">
  
    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">센서스경계 자료제공</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="#">센서스경계 자료제공</a></li>
      </ul>
    </div>

<div class="content_admin">
		<div class="list_wrap">
<div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
					    <a href="gsks_01_04.jsp"><font color="#FFFFFF"><strong>요청관리</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_01.jsp"><strong>자료제공</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_02.jsp"><strong>자료및안내</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_03.jsp"><strong>자료목록관리</strong></a></td>
    				<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_05.jsp"><strong>자료제공관리</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_06.jsp"><strong>결재관리</strong></a></td>
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
			</tr>
		</table>
</div>

<table width="100%" border=0 cellpadding="0" cellspacing="0" class="table1" summary="인증키관리에 대한 내용입니다." >
  <thead>

      <tr>
        <th class="td_top" width="50">No</th>
        <th class="td_top" width="110">신청자(ID)</th>
        <th class="td_top" width="100">요청번호</th>
        <th class="td_top" width="100">진행상태</th>
        <th class="td_top" width="70">신청일자</th>
        <th class="t_end td_top" width="120">승인/반려처리</th>
      </tr>
    </thead>

    <tbody>
      <%
      		int rowcnt=0;
      		while(rm != null && rm.next()) {
      			String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
      			String sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
      			String sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
      			String create_date = StringUtil.verify((String)rm.get("create_date"));
      			String sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
      			String sgis_census_req_status_name = "";
      			if (sgis_census_req_status.equals("S")) {
      				sgis_census_req_status_name = "신청";
      			}else if (sgis_census_req_status.equals("A")){
      				sgis_census_req_status_name = "승인";
      			}else if (sgis_census_req_status.equals("B")){
      				sgis_census_req_status_name = "반려";	
      			}
      			String sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
      %>
      <tr>
        <td class="cell_center"><%=(totCount - (pg-1) - rowcnt) %></td>
        <td class="cell_left"><%=sgis_name %>(<%=sgis_member_id %>)</td>
        <td class="cell_center"><%=sgis_census_req_id %></td>
        <td class="cell_center"><%=sgis_census_req_status_name %><%if(!sgis_census_req_status.equals("S")) { %>(<%=sgis_census_req_app_date%>)<%} %></td>        
        <td class="cell_center"><%=create_date %></td>
        <td class="cell_center"><a href="javascript:detailView('<%=sgis_census_req_id %>');">[상세]</a></td>
      </tr>
      <% rowcnt++; } %>
  	</tbody>

  </table>
<br>
<!-- page 처리 -->
<%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->
 </div>
<div class="clear"><br></div>
		<div class="clear" align="center">
				<table border=0>
					<tr>
						<td>
					

          <select name="search_sel2" class="search_sel" style="width:50px">
            <option value="">전체</option>
            <option value="S" <%if(lData.getString("search_sel2").equals("S")) {%>selected<%} %>>신청</option>
            <option value="A" <%if(lData.getString("search_sel2").equals("A")) {%>selected<%} %>>승인</option>
            <option value="B" <%if(lData.getString("search_sel2").equals("B")) {%>selected<%} %>>반려</option>
          </select>

          </td>
          <td>
          <b>신청자(ID)</b>&nbsp;<input name="search_input" type="text" id="list_search_input" style="width:65px" value="<%=lData.getString("search_input")%>"/>
          <div id='detailMenuDiv' type='table' data='/contents/shortcut/shortcut_05_03_02.jsp' foRow='1' style=" overflow-y:hidden;"></div>
					</td>
					<td>
          <input name="image" onclick="searchClicked();" type='image' src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
          </td>
         </tr>
        </table>
     </div>

      	</div>
			</div>
  </div>
</div>
<div class="clear"></div>
</form>

<%@ include file="/contents/gsks/include/footer.jsp" %>