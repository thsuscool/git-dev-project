<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<SCRIPT language=javascript src="/contents/scripts/prototype.js"></SCRIPT>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;

	/* paging 초기화  */
	int pg = 1;
	int pgSize = 15;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;

	if(lData.containsKey("pg")){
		pg = lData.getInt("pg");
	}

	try {
		broker = new GeneralBroker("ceaa00");

		String r_sgis_census_req_y_s_d = lData.getString("sgis_census_req_y_s_d");
		String r_sgis_census_req_y_e_d = lData.getString("sgis_census_req_y_e_d");
		String r_sgis_census_id = lData.getString("sgis_census_id");
		String r_sgis_census_data_id = lData.getString("sgis_census_data_id");
		String r_sgis_census_req_id = lData.getString("sgis_census_req_id");
		String r_sgis_census_req_year = lData.getString("sgis_census_req_year");
		String inUse = lData.getString("inUse");

		lData.setString("r_sgis_census_req_id", r_sgis_census_req_id);
		lData.setString("r_sgis_census_id", r_sgis_census_id);
		lData.setString("r_sgis_census_data_id", r_sgis_census_data_id);
		lData.setString("r_sgis_census_req_year", r_sgis_census_req_year);
		lData.setString("r_sgis_census_req_y_s_d", r_sgis_census_req_y_s_d);
		lData.setString("r_sgis_census_req_y_e_d", r_sgis_census_req_y_e_d);

		/***************************************/
		/* 게시, 종료일자 수정 */
		/***************************************/
		if(lData.getString("aT").equals("INS")) {

			lData.setString("PARAM", "UPDATE_ST_ED");
			broker.process(Const.P_UPD, lData);

		/***************************************/
		/* 게시, 종료일자 삭제 */
		/***************************************/
		} else if(lData.getString("aT").equals("DEL")) {

			lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE3");
			broker.process(Const.P_DEL, lData);
		}

		/***************************************/
		/* 조회 */
		/***************************************/
		lData.setString("PARAM", "CENSUS_APPROVE_LIST");
		rm = broker.getList(lData);
		totCount = rm.getRowCount();	//리스트 전체 수

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
	function editChanged(num) {
		if(document.censusFm.sgis_census_chk.length == undefined){
			eval("document.censusFm.sgis_census_chk.checked=true;");
		}else{
			eval("document.censusFm.sgis_census_chk["+num+"].checked=true;");
		}
	}

	function list(pg){
		document.searchFm.pg.value = pg;
		document.searchFm.submit();
	}

	function searchChanged() {

		if(document.searchFm.search_sel.value == "id") {
			document.searchFm.search_input.readOnly = false;
			document.searchFm.search_input.style.backgroundColor="#FFFFFF";
		} else {
			document.searchFm.search_input.readOnly = true;
			document.searchFm.search_input.style.backgroundColor="#EFEFEF";
		}
	}

	function searchClicked() {
		if(document.searchFm.search_sel.value == "") {
			alert("검색조건을 선택하세요.");
			return;
		} else {
			document.searchFm.submit();
		}
	}

	function saveClicked() {
		var c=confirm("저장하시겠습니까?");
		if(c == 1) {
			var cnt=document.censusFm.sgis_census_chk.length;
			var ischk=0;

			for(i=0; i < cnt; i++) {
				if(document.censusFm.sgis_census_chk[i].checked) ischk++;
			}

			if(ischk == 0) {
				alert("선택 항목이 없습니다.");
				return;
			} else {

				for(i=0; i < cnt; i++) {
					if(document.censusFm.sgis_census_chk[i].checked) document.censusFm.inUse[i].value = "Y";
					else document.censusFm.inUse[i].value = "N";
				}

				document.censusFm.aT.value = "INS";
				document.censusFm.submit();
			}
		}
	}

	function removeClicked() {
		var c=confirm("삭제하시겠습니까?");
		if(c == 1) {
			var cnt=document.censusFm.sgis_census_chk.length;
			var ischk=0;

			for(i=0; i < cnt; i++) {
				if(document.censusFm.sgis_census_chk[i].checked) ischk++;
			}
			
			if(document.censusFm.sgis_census_chk.length == undefined){
			
				if(document.censusFm.sgis_census_chk.checked == false) {
					alert("선택 항목이 없습니다.");
					return;
				} else {
	
					
					if(document.censusFm.sgis_census_chk.checked) document.censusFm.inUse.value = "Y";
					else document.censusFm.inUse.value = "N";
					
	
					document.censusFm.aT.value = "DEL";
					document.censusFm.submit();
				}
			}else{
				if(ischk == 0) {
					alert("선택 항목이 없습니다.");
					return;
				} else {
	
					for(i=0; i < cnt; i++) {
						if(document.censusFm.sgis_census_chk[i].checked) document.censusFm.inUse[i].value = "Y";
						else document.censusFm.inUse[i].value = "N";
					}
	
					document.censusFm.aT.value = "DEL";
					document.censusFm.submit();
				}
			
			}
		}
	}

	function excelDownload() {
		var fm = document.censusFm;
		fm.action = 'gsks_01_04_01_excel.jsp';
		fm.target = 'excelFrame';
		fm.submit();
	}
	
	function calendar_check(param1,param2,param3){
	 
		var paramLen = param2.length;
	
		if(paramLen == undefined){
			Calendar(param2,param3);
		}else{ 
		 
		 	Calendar(param1,param3);
		}
	
	
	}
</script>

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
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_04.jsp"><strong>요청관리</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_04_01.jsp"><font color="#FFFFFF"><strong>자료제공</strong></font></a></td>
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

	<table width="100%" cellpadding="0" cellspacing="0" class="table1">
		<form name="censusFm" method="post">
			<input type="hidden" name="aT">
			<input type="hidden" name="search_sel" value="<%=lData.getString("search_sel")%>">
			<input type="hidden" name="search_input" value="<%=lData.getString("search_input")%>">

    <thead>
      <tr>
        <th class="td_top" width="20"></th>
        <th class="td_top">성명(ID)</th>
        <th class="td_top" width="80">구분</th>
        <th class="td_top" width="80">대상자료명</th>
        <th class="td_top" width="40">년도</th>
        <th class="td_top">승인일자</th>
        <th class="td_top" width="80">게시시작일자</th>
        <th class="t_end td_top" width="80">게시종료일자</th>
      </tr>
    </thead>
    <tbody>
      <%
      try {

      	int rowcnt=0;

      		while(rm.next()) {
      			String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
      			String sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
      			String sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
      			String sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
      			String sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
      			String sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
      			String sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
      			String sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
      			String sgis_census_app_date = StringUtil.verify((String)rm.get("sgis_census_app_date"));
      			String sgis_census_req_y_s_d = StringUtil.verify((String)rm.get("sgis_census_req_y_s_d"));
      			String sgis_census_req_y_e_d = StringUtil.verify((String)rm.get("sgis_census_req_y_e_d"));
      			String sgis_census_req_y_use_che = String.valueOf((Character)rm.get("sgis_census_req_y_use_che"));

	     			String short_sgis_census_name = StringUtil.toShortenStringB(sgis_census_name, 12);
      			String short_sgis_census_data_name = StringUtil.toShortenStringB(sgis_census_data_name, 12);
      %>
      <tr>
        <td class="cell_center"><input type="checkbox" name="sgis_census_chk"></td>
        <td class="cell_left"><%=sgis_name %>(<%=sgis_member_id %>)</td>
        <td class="cell_left" title="<%=sgis_census_name%>"><%=short_sgis_census_name %></td>
        <td class="cell_left" title="<%=sgis_census_data_name%>"><%=short_sgis_census_data_name %></td>
        <td class="cell_center"><%=sgis_census_req_year %></td>
        <td class="cell_center"><%=sgis_census_app_date %></td>
        <td class="cell_center"><input type="text" name="sgis_census_req_y_s_d" value="<%=sgis_census_req_y_s_d %>" size="6" readOnly
        style="text-align:center; cursor:pointer; width:80px" onClick="calendar_check(document.censusFm.sgis_census_req_y_s_d[<%=rowcnt %>],this,event); editChanged('<%=rowcnt %>');" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_s_d[<%=rowcnt %>],this,event );" onfocus="this.blur()"></td>
        <td class="cell_center"><input type="text" name="sgis_census_req_y_e_d" value="<%=sgis_census_req_y_e_d %>" size="6" readOnly
        style="text-align:center; cursor:pointer; width:80px" onClick="calendar_check(document.censusFm.sgis_census_req_y_e_d[<%=rowcnt %>],this,event); editChanged('<%=rowcnt %>');" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_e_d[<%=rowcnt %>],this,event );" onfocus="this.blur()"></td>
        <input type="hidden" name="sgis_census_req_id" value="<%=sgis_census_req_id%>">
				<input type="hidden" name="sgis_census_id" value="<%=sgis_census_id%>">
				<input type="hidden" name="sgis_census_data_id" value="<%=sgis_census_data_id%>">
				<input type="hidden" name="sgis_census_req_year" value="<%=sgis_census_req_year%>">
        <input type="hidden" name="inUse">

      </tr>
      <%rowcnt++; }

      } catch(Exception e) {
    	  System.out.print("sgisWebError : ");
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
      }
      %>

    </tbody>
    </form>
  </table>

<div>
    <div class="list_button_right_02">
	   <a href="javascript:;" onclick="excelDownload();"><img src="/contents/gsks/images/admin_button_download_excel.gif" alt="엑셀다운로드" width="100" height="22" border="0" align="absmiddle"></a>
     <a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" alt="저장" align="absmiddle"/></a>
     <a href="javascript:removeClicked();"><img src="images/admin_01_04_tab_page_03_button_delete.gif" alt="삭제" align="absmiddle"/></a>
</div>

<div class="clear">

<!-- page 처리 -->
<%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->
</div>

	<div align="center">
      <div class="list_search ">
        <form name="searchFm" method="post">
        	<input type="hidden" name="pg" value="<%=pg %>">

          <select name="search_sel" class="search_sel" style="width:80px" onChange="searchChanged();">
            <option value="id" <%if(!StringUtil.isEmpty(lData.getString("search_sel"))) {%>selected<%} %>>성명(ID)</option>
            </select>
          <input name="search_input" type="text" id="list_search_input" value="<%=lData.getString("search_input")%>"/>
          <input name="image" onclick="searchClicked();" type='image' src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
          </form>
      </div>
	</div>

					</div>
				</div>
			</div>
  </div>
</div>
<div class="clear"></div>

<iframe name="excelFrame" src="" frameborder=0 width=0 height=0></iframe>
<SCRIPT language=javascript src="/contents/scripts/calendar_layer.js"></SCRIPT>
<%@ include file="/contents/gsks/include/footer.jsp" %>