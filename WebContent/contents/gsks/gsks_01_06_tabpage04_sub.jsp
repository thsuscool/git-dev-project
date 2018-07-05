<%--
/*********************************************************
 * @source      : gsks_01.jsp
 * @description : 관리자 / 메뉴관리 / 서브메뉴 관리
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008.11.19   SHIN HYUN MYUNG         최초등록
 *********************************************************
--%>

<%@ page language="java" contentType = "text/html;charset=utf-8" %>
<%@ page import="kr.co.offton.jdf.util.StringUtil"               %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"                %>
<%@ page import="kr.co.offton.jdf.db.DbManager"                  %>

<%@ page import="java.math.BigDecimal"                           %>

<%@ include file="/contents/include/comVarCoding.jsp"            %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	DbManager dbmgr     = null;
	RecordModel rm      = null;
	RecordModel authSet = null;

	String h_id = lData.getString("sgis_menu_h_id");

	StringBuffer menuQuery = new StringBuffer(1024);
	StringBuffer authQuery = new StringBuffer(1024);

	menuQuery.append(" select x.sgis_menu_d_code_id     \n");
	menuQuery.append("       ,x.sgis_menu_d_name        \n");
	menuQuery.append("       ,x.sgis_menu_url           \n");
	menuQuery.append("       ,x.sgis_menu_use_yn        \n");
	menuQuery.append("       ,x.sgis_menu_pop_chk       \n");
//	menuQuery.append("       ,y.sgis_auth_id            \n");
	menuQuery.append("   from sgis_menu_config x        \n");
//	menuQuery.append("       ,sgis_menu_d_auth_set y    \n");
//	menuQuery.append("  where x.sgis_menu_d_code_id = y.sgis_menu_d_code_id(+)  \n");
	menuQuery.append("  where x.sgis_menu_h_id = ?      \n");

	authQuery.append(" select sgis_auth_id                                              \n");
	authQuery.append("       ,sgis_auth_name                                            \n");
	authQuery.append("       ,decode(sgis_auth_id, ref_auth_id, 'Y', 'N') is_checked    \n");
	authQuery.append("   from                                                           \n");
	authQuery.append("   (                                                              \n");
	authQuery.append("     select x.sgis_auth_id                                        \n");
	authQuery.append("           ,x.sgis_auth_name                                      \n");
	authQuery.append("           ,y.sgis_auth_id ref_auth_id                            \n");
	authQuery.append("       from sgis_auth_id x                                        \n");
	authQuery.append("           ,(select sgis_auth_id                                  \n");
	authQuery.append("               from sgis_menu_d_auth_set                          \n");
	authQuery.append("              where sgis_menu_d_code_id = ?) y                    \n");
	authQuery.append("      where x.sgis_auth_id = y.sgis_auth_id(+)                    \n");
	authQuery.append("   )                                                              \n");

	try {

		dbmgr = new DbManager();
		dbmgr.prepareStatement(menuQuery.toString());
		dbmgr.pstmtSet(h_id);

		rm = dbmgr.select();
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {

		if(dbmgr != null)	dbmgr.close();
	}
%>

<form name="subForm" method="post">
	<input type="hidden" name="aT"/>
	<input type="hidden" name="gb" value="SUB"/>
	<input type="hidden" name="sgis_menu_h_id" value="<%=h_id %>"/>

	<table cellpadding="0" cellspacing="1" class="table1">
		<thead>
			<tr>
			  <th class="td_top"       width="20"><input type="checkbox" name="mainChk" onclick="checkedAll(this.checked, 'sub_chk')"></th>
			  <th class="td_top"       width="60" >코드</th>
			  <th class="td_top"       width="140">메뉴명</th>
			  <th class="td_top"       width="140">메뉴URL</th>
			  <th class="td_top"       width="200" >권한</th>
			  <th class="td_top"                   >사용여부</th>
			  <th class="t_end td_top"             >팝업</th>
			</tr>
		</thead>

<%
	try {
		dbmgr = new DbManager();

		int rowCnt = 0;
		while(rm != null && rm.next()) {
			String sgis_menu_d_code_id = String.valueOf((BigDecimal)rm.get("sgis_menu_d_code_id"));
			String sgis_menu_d_name    = StringUtil.verify((String)rm.get("sgis_menu_d_name"));
			String sgis_menu_url       = StringUtil.verify((String)rm.get("sgis_menu_url"));
			String sgis_menu_use_yn    = StringUtil.verify(((Character)rm.get("sgis_menu_use_yn")).toString());
			String sgis_menu_pop_chk   = (Character)rm.get("sgis_menu_pop_chk") != null ? ((Character)rm.get("sgis_menu_pop_chk")).toString() : "";
	%>
		<tr>
			<td class="cell_center"><input type="checkbox" name="sub_chk"></td>
			<td class="cell_center"><input type="text"     name="sgis_menu_d_code_id" value="<%=sgis_menu_d_code_id %>" style="border:0; width:50px" readOnly/></td>
			<td class="cell_center"><input type="text"     name="sgis_menu_d_name"    value="<%=sgis_menu_d_name %>"   onfocus="updateChecked(<%=rowCnt %>, 'sub_chk')" style="width:140px;"/></td>
			<td class="cell_center"><input type="text"     name="sgis_menu_url"       value="<%=sgis_menu_url %>"      onfocus="updateChecked(<%=rowCnt %>, 'sub_chk')" style="width:140px;"/></td>
			<td class="cell_left">
<%
			dbmgr.prepareStatement(authQuery.toString());
			dbmgr.pstmtSet(sgis_menu_d_code_id);

			authSet = dbmgr.select();
			while(authSet != null && authSet.next()) {

				String authName   = StringUtil.verify((String)authSet.get("sgis_auth_name"));
				String authId     = StringUtil.verify((String)authSet.get("sgis_auth_id"));
				String is_checked = StringUtil.verify((String)authSet.get("is_checked"));
%>
				<input type="checkbox" name="auth_<%=sgis_menu_d_code_id %>" value="<%=authId %>" <%="Y".equals(is_checked) ? "checked" : "" %> onclick="updateChecked(<%=rowCnt %>, 'sub_chk')"/><%=authName %><br>
<%
			}//end of auth loop
%>
				<%--<input type="checkbox" name="auth_<%=sgis_menu_d_code_id %>" value="B" <%="02".equals(sgis_auth_id) ? "checked" : "" %>/>일반회원
				<input type="checkbox" name="auth_<%=sgis_menu_d_code_id %>" value="C" <%="03".equals(sgis_auth_id) ? "checked" : "" %>/>기타회원--%>
				<input type="hidden"   name="sub_status" value="U">
				<input type="hidden"   name="sub_inUse"  value="N">
			</td>
			<td class="cell_center">
				<select name="sgis_menu_use_yn" onchange="updateChecked(<%=rowCnt %>, 'sub_chk')">
					<option value="Y" <%=sgis_menu_use_yn.equals("Y") ? "selected" : "" %>>사용</option>
					<option value="N" <%=sgis_menu_use_yn.equals("N") ? "selected" : "" %>>미사용</option>
				</select>
			</td>
			<td class="cell_center">
				<select name="sgis_menu_pop_chk" onchange="updateChecked(<%=rowCnt %>, 'sub_chk')">
					<option value="Y" <%=sgis_menu_pop_chk.equals("Y") ? "selected" : "" %>>Y</option>
					<option value="N" <%=sgis_menu_pop_chk.equals("N") ? "selected" : "" %>>N</option>
				</select>
			</td>
		</tr>

<%
			rowCnt++;
		}//end of menu loop
	}catch(Exception e) {
		System.out.println("*** exception info *** \n"+e.toString());
	}finally {
		if(dbmgr != null)	dbmgr.close();
	}
%>
		<tr>
			<td id="sub_addmenu1" class="cell_center"></td>
			<td id="sub_addmenu2" class="cell_center"></td>
			<td id="sub_addmenu3" class="cell_center"></td>
			<td id="sub_addmenu4" class="cell_center"></td>
			<td id="sub_addmenu5" class="cell_center"></td>
			<td id="sub_addmenu6" class="cell_center"></td>
			<td id="sub_addmenu7" class="cell_center"></td>
		</tr>
	</table>
	<table border="0">
			<tr>
				<td>
					<a href="javascript:addClicked(2);"><img src="images/admin_01_04_tab_page_03_button_add.gif" border=0></a>
					<a href="javascript:subControlClicked('INS');"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0 ></a>
					<a href="javascript:subControlClicked('DEL');"><img src="images/admin_01_04_tab_page_03_button_delete.gif" border=0></a>
				</td>
			</tr>
	</table>
</form>