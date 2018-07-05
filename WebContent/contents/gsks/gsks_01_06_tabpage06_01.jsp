<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%

	DbManager dmg = null;
	RecordModel rm = null;
%>

 
<link href="/contents/style/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
			  <table width="240" cellpadding="0" cellspacing="1" class="table1">
			    <thead>
			      <tr>
			        <th class="td_top" width="40"></th>
			        <th class="t_end td_top" width="200">메뉴설명</th>
			        <th class="t_end td_top" width="50"></th>
			      </tr>
			    </thead>
			    <tbody>
<%
			try {

				int rowcnt=0;

				dmg = new DbManager();

				String sql = " select sgis_main_low_id ";
								sql += "			    , sgis_main_low_site  ";
								sql += "		    from sgis_main_low_set ";
								sql += " 	where sgis_main_loc_code = '"+lData.getString("sgis_main_loc_code")+"'";

								dmg.prepareStatement(sql);
								rm = dmg.select();

								while(rm != null && rm.next()) {
									String sgis_main_low_id = String.valueOf((BigDecimal)rm.get("sgis_main_low_id"));
									String sgis_main_low_site = StringUtil.verify((String)rm.get("sgis_main_low_site"));
									%>
									<tr>
										<td><input type="checkbox" name="m2"></td>
										<td><input type="text" name="sgis_main_low_site" style="width:180px" onClick="editChanged(2, <%=rowcnt %>);" value="<%=sgis_main_low_site %>"></td>
										<td><a href="javascript:editClicked('<%=sgis_main_low_id %>')"><img src="images/button_admin_01_02_correct.gif" border=0></a></td>
													<input type="hidden" name="sgis_main_low_id" value="<%=sgis_main_low_id %>">
			    								<input type="hidden" name="inUse2" value="N">
			    								<input type="hidden" name="status2" value="U">
									</tr>
									<%
									rowcnt++;
								}

			} catch(Exception e) {
				System.out.print("sgisWebError : ");
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dmg.close();
			}
%>
			    </tbody>
			    <tr>
			    	<td colspan="3"><span id="menu2"></span></td>
			    </tr>
			   </table>
				<br>
			  <table width="220" border=0>
			  	<tr>
			  		<td align="right"><img src="images/bottom_menu_add.gif" onClick="addSubMenu();" border=0 style="cursor:pointer" align="absmiddle"></td>
			  	</tr>
			  </table>

		<input type="hidden" name="s_sgis_main_loc_code" value="<%=lData.getString("sgis_main_loc_code") %>">
		<input type="hidden" name="s_sgis_main_loc_desc" value="<%=lData.getString("sgis_main_loc_desc") %>">

  </body>
 