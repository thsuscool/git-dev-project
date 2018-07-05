<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%

	DbManager dmg = null;
	RecordModel rm = null;

	if(lData.getString("aT").equals("INS")) {

			try {

				dmg = new DbManager();

				String dsql = " delete from sgis_api_group_set ";
								dsql += "			where api_group_id = '"+lData.getString("group_id")+"'	";

				dmg.prepareStatement(dsql);
				dmg.executeUpdate();

				String api_element_id = lData.getString("api_element_id");
				String[] elements = api_element_id.split(",");

				for(int i=0; i < elements.length; i++) {

					String msql = " select nvl(max(api_group_set_code)+1,0) mannum from sgis_api_group_set ";
					msql += "			where api_group_id = '"+lData.getString("group_id")+"'";

					dmg.prepareStatement(msql);
					rm = dmg.select();
					String maxnum="";
					if(rm.next()) maxnum = String.valueOf((BigDecimal)rm.get("mannum"));

					String isql = " insert into sgis_api_group_set	";
									isql += "			( ";
									isql += "				    api_group_id ";
									isql += "				    , api_group_set_code ";
									isql += "				    , api_element_id ";
									isql += "			) ";
									isql += "				values  ";
									isql += "			( ";
									isql += "			'"+lData.getString("group_id")+"'";
									isql += "			, '"+maxnum+"'";
									isql += "			, '"+elements[i]+"' ";
									isql += "			)";

					dmg.prepareStatement(isql);
					dmg.executeUpdate();
				}

			} catch(Exception e) {
				System.out.print("sgisWebError : ");
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dmg.close();
			}
	} else if(lData.getString("aT").equals("UPD")) {

		try {

			dmg = new DbManager();

			String usql1 = " update sgis_api_group_code set api_basic_setting = 'N' where api_version = '1.0'	";
				dmg.prepareStatement(usql1);
				dmg.executeUpdate();

			String usql2 = " update sgis_api_group_code set api_basic_setting = 'Y' 	";
							usql2 += " where api_group_id = '"+lData.getString("group_id")+"'	 ";

				dmg.prepareStatement(usql2);
				dmg.executeUpdate();

		} catch(Exception e) {
			System.out.print("sgisWebError : ");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		} finally {
			dmg.close();
		}

	} else if(lData.getString("aT").equals("DEL")) {

		try {

			dmg = new DbManager();

			/********************/
			/* group set remove */
			/********************/
			String dsql1 = " delete  sgis_api_group_set where api_group_id = '"+lData.getString("group_id")+"' 	";

			dmg.prepareStatement(dsql1);
			dmg.executeUpdate();

			/********************/
			/*  info remove */
			/********************/
			String dsql2 = " delete sgis_api_auth_key_grant where api_group_id = '"+lData.getString("group_id")+"' ";

			dmg.prepareStatement(dsql2);
			dmg.executeUpdate();

			/********************/
			/* group  remove */
			/********************/
			String dsql3 = " delete sgis_api_group_code where api_group_id = '"+lData.getString("group_id")+"' 	";

			dmg.prepareStatement(dsql3);
			dmg.executeUpdate();

		} catch(Exception e) {
			System.out.print("sgisWebError : ");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		} finally {
			dmg.close();
		}
	}
%>
<script language="javascript">
	function addClicked() {
		window.open("gsks_01_03_popup.jsp","","width=450, height=120");
	}

	function gClicked(id, name) {
		document.gFm.aT.value = "RET";
		document.gFm.group_name.value=name;
		document.gFm.group_id.value=id;
		document.gFm.submit();
	}

	function saveClicked() {
		var c = confirm("저장하시겠습니까?");
		if(c == 1) {
			document.gFm.aT.value="INS";
			document.gFm.submit();
		}
	}

	function basicClicked(id, name) {
		var c = confirm("기본그룹설정 하시게습니까?");
		if(c == 1) {
			document.gFm.aT.value="UPD";
			document.gFm.group_id.value = id;
			document.gFm.submit();
			//gClicked(id, name);
		} else {
			document.gFm.reset();
		}
	}

	function removeClicked(id, name) {
		var c = confirm(""+name+"그룹을 삭제하시겠습니까? 삭제를 하시면 관련된 정보도 모두 삭제됩니다.");
		if(c == 1) {
			document.gFm.aT.value="DEL";
			document.gFm.group_id.value = id;
			document.gFm.submit();
		}
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
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_03.jsp"><strong>인증키관리</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_03_tab_page_02.jsp"><font color="#FFFFFF"><strong>그룹설정</strong></font></a></td>
    			<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02_2.jsp"><strong>그룹설정(NEW)</strong></a></td>
				 -->	<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_03_tab_page_03.jsp"><strong>항목관리</strong></a></td>
					<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_03_tab_page_03_2.jsp"><strong>항목관리(NEW)</strong></a></td>
				 -->	<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_04.jsp"><strong>서비스로그</strong></a></td>
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="100%" height="1px"></td>
			</tr>
		</table>
		</div>

		<div class="clear">
	<br>
	<table width="100%" cellpadding="0" cellspacing="0">

				<form name="gFm" method="post">
					
		<tr>
			<td valign="top">

			  <table width="300" cellpadding="0" cellspacing="0" >
			      <tr>
			        <th class="td_top" align="left">* 그룹</th>
			      </tr>
			  </table>

		<table width="100%" cellpadding="0" cellspacing="0">
			<tr>
				<td valign="top">
					  <table width="300" cellpadding="0" cellspacing="0" class="table1">
					    <thead>
					      <tr>
					        <th class="td_top" width="50">그룹</th>
					        <th class="td_top" width="80">기본그룹설정</th>
					        <th class="td_top">설명</th>
					        <th class="t_end td_top" width="50"></th>
					      </tr>
					    </thead>
						    <tbody>
					      <%
					      		String gsql = " select api_group_id, api_group_name, api_group_desc, api_basic_setting from sgis_api_group_code where api_version=1 order by api_group_name ";
					      		String basic_api_group_id ="";
							      String basic_api_group_name = "";
						      try {
						    	  dmg = new DbManager();
						    	  dmg.prepareStatement(gsql);
						    	  rm = dmg.select();

						      } catch(Exception e) {
						    	  System.out.print("sgisWebError : ");
						    	//2015-12-03 시큐어코딩
						    	//e.printStackTrace();
						    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
						      } finally {
						    	  dmg.close();
						      }

						      while(rm != null && rm.next()) {
										String api_group_id = String.valueOf((BigDecimal)rm.get("api_group_id"));
										String api_group_name = StringUtil.verify((String)rm.get("api_group_name"));
										String api_group_desc = StringUtil.verify((String)rm.get("api_group_desc"));
										String api_basic_setting = String.valueOf((Character)rm.get("api_basic_setting"));
										if(api_basic_setting.equals("Y")) {
											basic_api_group_name = api_group_name;
											basic_api_group_id = api_group_id;
										}
										String short_api_group_desc = StringUtil.toShortenStringB(api_group_desc, 10);
						      %>
						    <tr>
						      <td class="cell_center"><a href="javascript:gClicked('<%=api_group_id %>','<%=api_group_name %>');"><%=api_group_name %>그룹</a></td>
						      <td class="cell_center"><input type="radio" name="group_id_radio" value="<%=api_group_id %>" <%if(api_basic_setting.equals("Y")) {%>checked<%} %> onClick="basicClicked('<%=api_group_id %>','<%=api_group_name %>');"/></td>
						      <td class="cell_left" title="<%=short_api_group_desc %>"><a href="javascript:gClicked('<%=api_group_id %>','<%=api_group_name %>');"><%=short_api_group_desc %></a></td>
						      <td class="cell_center t_end"><a href="javascript:removeClicked('<%=api_group_id %>','<%=api_group_name %>');"><img src="images/button_admin_01_02_delete.gif" border=0></a></td>
						    </tr>
						    <%} %>
						   </tbody>
					  </table>
					</td>
				</tr>
		</table>
					</td>
					<td width="50"></td>
					<td>

			  <table width="300" cellpadding="0" cellspacing="0" >
			      <tr>
			        <td height="15"></td>
			      </tr>
			  </table>

					<table width="350" border=0 cellpadding="0" cellspacing="0" class="table1">
				      <tr>
			        <th class="td_top" colspan="2">그룹명 : <input type="text" name="group_name" size="5" maxlengh="1" style="text-align:center" onKeyUp="groupSearch();" value="<%if(StringUtil.isEmpty(lData.getString("group_name"))) {%><%=basic_api_group_name %><%} else {%><%=lData.getString("group_name")%><%}%>" readOnly></th>
			      </tr>
			      <tr>
				  	<th class="td_top" colspan="2">1.0</th>
				  	</tr>
					<%

							String sql = " select d.api_element_id 	";
											sql += "						        , d.api_element_name ";
											sql += "						        , c.api_basic_setting ";
											sql += "						    from sgis_api_group_code c ,  ";
											sql += "						( ";
											sql += "						select a.api_element_id  ";
											sql += "						        , a.api_element_name ";
											sql += "						        , b.api_group_id ";
											sql += "						    from sgis_api_element_code a, sgis_api_group_set b ";
											sql += "						where a.api_element_id = b.api_element_id(+) ";
											sql += "							and a.api_version = '1.0' ";

											if(StringUtil.isEmpty(lData.getString("group_id"))) {
												sql += " and b.api_group_id(+) = (select api_group_id from sgis_api_group_code where api_basic_setting = 'Y' and api_version = '1.0') ";
											} else {
												sql += "						    and b.api_group_id(+) = '"+lData.getString("group_id")+"' ";
											}
											sql += "						group by a.api_element_id, a.api_element_name, b.api_group_id ";
											sql += "						) d ";
											sql += "						where c.api_group_id(+) = d.api_group_id ";
											sql += "							and not c.api_version(+) = '2.0' ";

											try {
												dmg = new DbManager();
												dmg.prepareStatement(sql);
												rm = dmg.select();

											} catch(Exception e) {
												System.out.print("sgisWebError : ");
												//2015-12-03 시큐어코딩
												//e.printStackTrace();
												logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
											} finally {
												dmg.close();
											}

											int rowcnt=0;
											while(rm != null && rm.next()) {

												String api_element_id = String.valueOf((BigDecimal)rm.get("api_element_id"));
												String api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
												String api_basic_setting = String.valueOf((Character)rm.get("api_basic_setting"));

					%>
				  	<tr>
				  		<td><%=rowcnt+1 %>. <%=api_element_name %></td>
				  		<td class="cell_center t_end" width="50"><input type="checkbox" name="api_element_id" value="<%=api_element_id %>" <%if(api_basic_setting.equals("Y") || api_basic_setting.equals("N")) {%>checked<%} %>></td>
				  	</tr>
				  	<%	rowcnt++; } %>
				  	<tr>
				  	<th class="td_top" colspan="2">2.1</th>
				  	</tr>
				  	
				  	<%

							sql = " select d.api_element_id 	";
											sql += "						        , d.api_element_name ";
											sql += "						        , c.api_basic_setting ";
											sql += "						    from sgis_api_group_code c ,  ";
											sql += "						( ";
											sql += "						select a.api_element_id  ";
											sql += "						        , a.api_element_name ";
											sql += "						        , b.api_group_id ";
											sql += "						    from sgis_api_element_code a, sgis_api_group_set b ";
											sql += "						where a.api_element_id = b.api_element_id(+) ";
											sql += "							and a.api_version = '2.1' ";

											if(StringUtil.isEmpty(lData.getString("group_id"))) {
												sql += " and b.api_group_id(+) = (select api_group_id from sgis_api_group_code where api_basic_setting = 'Y' and api_version = '1.0') ";
											} else {
												sql += "						    and b.api_group_id(+) = '"+lData.getString("group_id")+"' ";
											}
											sql += "						group by a.api_element_id, a.api_element_name, b.api_group_id ";
											sql += "						) d ";
											sql += "						where c.api_group_id(+) = d.api_group_id ";
											sql += "							and not c.api_version(+) = '2.0' ";

											try {
												dmg = new DbManager();
												dmg.prepareStatement(sql);
												rm = dmg.select();

											} catch(Exception e) {
												System.out.print("sgisWebError : ");
												//2015-12-03 시큐어코딩
												//e.printStackTrace();
												logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
											} finally {
												dmg.close();
											}

											rowcnt=0;
											while(rm != null && rm.next()) {

												String api_element_id = String.valueOf((BigDecimal)rm.get("api_element_id"));
												String api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
												String api_basic_setting = String.valueOf((Character)rm.get("api_basic_setting"));

					%>
				  	<tr>
				  		<td><%=rowcnt+1 %>. <%=api_element_name %></td>
				  		<td class="cell_center t_end" width="50"><input type="checkbox" name="api_element_id" value="<%=api_element_id %>" <%if(api_basic_setting.equals("Y") || api_basic_setting.equals("N")) {%>checked<%} %>></td>
				  	</tr>
				  	<%	rowcnt++; } %>
				  </table>
			</td>
	</tr>
</table>
					<input type="hidden" name="aT">
					<input type="hidden" name="group_id" value="<%=lData.getString("group_id")==null||lData.getString("group_id").trim().equals("")?basic_api_group_id :lData.getString("group_id")%>">
				  </form>
		 </div>

 </div><div class="clear"></div>
     <div class="list_button_right_02">
     <a href="javascript:addClicked();"><img src="images/admin_01_04_tab_page_03_button_add.gif" border=0></a>
     <a href="javascript:saveClicked();"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_02.gif" alt="저장" /></a>
		</div>

    </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
