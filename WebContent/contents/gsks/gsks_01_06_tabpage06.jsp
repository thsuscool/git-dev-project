<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage06.jsp
    * @description : 관리자 - 메인메뉴
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-25  Chung jong se        1.0
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
	String leftMenu="supprot";

	DbManager dmg = null;
	RecordModel rm = null;

	try {

		dmg = new DbManager();

		String[] inUse1 = null;
		String[] inUse2 = null;
		String[] sgis_main_loc_code = null;
		String[] sgis_main_loc_desc = null;
		String[] status1 = null;
		String[] status2 = null;
		String[] sgis_main_low_id = null;

		inUse1 = lData.getString("inUse1").split(",");
		inUse2 = lData.getString("inUse2").split(",");
		sgis_main_loc_code = lData.getString("sgis_main_loc_code").split(",");
		sgis_main_loc_desc = lData.getString("sgis_main_loc_desc").split(",");
		status1 = lData.getString("status1").split(",");
		status2 = lData.getString("status2").split(",");
		sgis_main_low_id = lData.getString("sgis_main_low_id").split(",");

		/**********************************/
		/* 등록, 수정 */
		/**********************************/
		if(lData.getString("aT").equals("INS")) {

			for(int i=0; i < inUse1.length; i++) {

				//체크된것만 처리
				if(inUse1[i].equals("Y")) {

					String isql="";
					//등록
					if(status1[i].equals("I")) {

										isql += " insert into sgis_main_div	";
										isql += "	( ";
										isql += "	sgis_main_loc_code	";
										isql += "		, sgis_main_loc_desc ";
										isql += "	) ";
										isql += " values ";
										isql += "	( ";
										isql += "	'"+sgis_main_loc_code[i].toUpperCase()+"' ";
										isql += "	, '"+sgis_main_loc_desc[i]+"' ";
										isql += "	) ";

					//수정
					} else	if(status1[i].equals("U")) {

											isql += " update sgis_main_div	 set";
											isql += "		sgis_main_loc_desc = '"+sgis_main_loc_desc[i]+"'";
											isql += "	where sgis_main_loc_code	= '"+sgis_main_loc_code[i].toUpperCase()+"' ";
					}

					dmg.prepareStatement(isql);
					dmg.execute();

				}
			}

		/**********************************/
		/* 삭제 */
		/**********************************/
		} else	if(lData.getString("aT").equals("DEL")) {

			/********************/
			/* 서브 링크 삭제 */
			/********************/
			for(int i=0; i < inUse2.length; i++) {

				//체크된것만 처리
				if(inUse2[i].equals("Y")) {

					String dsql="";
									dsql += " delete from sgis_main_low_set ";
									dsql += "	where sgis_main_loc_code	= '"+lData.getString("s_sgis_main_loc_code")+"' ";
									dsql += "					and sgis_main_low_id = '"+sgis_main_low_id[i]+"' ";

					dmg.prepareStatement(dsql);
					dmg.execute();

				}
			}

			/********************/
			/* 메인 링크 삭제 */
			/********************/
			for(int i=0; i < inUse1.length; i++) {

				//체크된것만 처리
				if(inUse1[i].equals("Y")) {

					//서브링크 부터 삭제
					String dsql2 = " delete from sgis_main_low_set ";
									dsql2 += "	where sgis_main_loc_code = '"+sgis_main_loc_code[i].toUpperCase()+"' ";;

									dmg.prepareStatement(dsql2);
									dmg.execute();

					//메인 링크 삭제
					String dsql="";
									dsql += " delete from sgis_main_div	 ";
									dsql += "	where sgis_main_loc_code	= '"+sgis_main_loc_code[i].toUpperCase()+"' ";

					dmg.prepareStatement(dsql);
					dmg.execute();

				}
			}

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
<script src=/contents/scripts/common.js></script>
<script src=/contents/scripts/javascript.js></script>
<script src=/contents/scripts/divwriter.js></script>
    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
    
<script type="text/JavaScript">
<!--

function onLoadAjax() {}
function addMenu(no) {
	var fm=document.menuFm;
	var menu1=document.getElementById("menu1");
	var menu2=document.getElementById("menu2");

	if(no == 1) {
		var text = "<input type=\"checkbox\" name=\"m1\" checked>&nbsp;";
				text += "<input type=\"text\" name=\"sgis_main_loc_code\" style=\"width:40px\" maxlength=\"1\">&nbsp;";
				text += "<input type=\"text\" name=\"sgis_main_loc_desc\" style=\"width:180px\">";
				text += "<input type=\"hidden\" name=\"inUse1\" value=\"Y\">";
				text += "<input type=\"hidden\" name=\"status1\" value=\"I\">";

				menu1.innerHTML = text;
	}
}

function addSubMenu(id, desc) {
		var fm=document.menuFm;
		window.open("", "main_detail_menu", "width=600, height=320, scrollbars=yes");
		fm.target="main_detail_menu";
		fm.action="gsks_01_06_tabpage06_popup.jsp";
		fm.submit();
}

function editClicked(id) {
		var fm=document.menuFm;
		window.open("", "main_detail_menu", "width=600, height=320, scrollbars=yes");
		fm.s_sgis_main_low_id.value=id;
		fm.aT.value="RET";
		fm.target="main_detail_menu";
		fm.action="gsks_01_06_tabpage06_popup.jsp";
		fm.submit();
}

function saveClicked() {
	var fm=document.menuFm;
	var c=confirm("저장하시겠습니까?");
	if(c == 1) {
		fm.target="_self";
		fm.aT.value="INS";
		fm.submit();
	}
}

function removeClicked() {
	var fm=document.menuFm;
	var c=confirm("삭제하시겠습니까?");
	if(c == 1) {
		if(fm.inUse1.length == undefined) {
			if(fm.m1.checked) fm.inUse1.value="Y";
			else fm.inUse1.value="N";
		}

		for(i=0; i < fm.inUse1.length; i++) {
			if(fm.m1[i].checked) fm.inUse1[i].value="Y";
			else fm.inUse1[i].value="N";
		}

		if(fm.inUse2.length == undefined) {
			if(fm.m2.checked) fm.inUse2.value="Y";
			else fm.inUse2.value="N";
		}

		for(i=0; i < fm.inUse2.length; i++) {
			if(fm.m2[i].checked) fm.inUse2[i].value="Y";
			else fm.inUse2[i].value="N";
		}

		fm.aT.value="DEL";
		fm.submit();
	}
}

function editChanged(no, num) {
	var fm=document.menuFm;
	if(no == 1) {
		fm.m1[num].checked = true;
		fm.inUse1[num].value="Y";
	} else if(no == 2) {
		fm.m2[num].checked = true;
		fm.inUse2[num].value="Y";
	}
}

function subMenu(id, desc) {
	  setParam(['sgis_main_loc_code:'+id,'sgis_main_loc_desc:'+desc]);
    writeDiv(['detailMenuDiv']);
}
//-->

</script>

<form name="menuFm" method="post">
	<input type="hidden" name="aT">
	<input type="hidden" name="s_sgis_main_low_id">

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
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_06_tabpage01.jsp"><strong>공지사항</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage02.jsp"><strong>FAQ</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_06_tabpage03.jsp"><strong>Q&A</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage04.jsp"><strong>메뉴</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage06.jsp"><font color="#FFFFFF"><strong>메인메뉴</strong></font></a></td>
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

	<table width="100%" border=0>
		<tr>
			<td align="left" valign="top">
			  <table width="300" cellpadding="0" cellspacing="0" class="table1">
			    <thead>
			      <tr>
			        <th class="td_top" width="40"></th>
			        <th class="td_top" width="60">코드</th>
			        <th class="t_end td_top" width="200">메뉴설명</th>
			      </tr>
			    </thead>
			    <tbody>
			    <%
			    	try {

			    		int rowcnt=0;

			    		dmg = new DbManager();

			    		String sql = " select sgis_main_loc_code, sgis_main_loc_desc ";
			    						sql += "			from sgis_main_div ";
			    						sql += "	order by sgis_main_loc_code	";

			    						dmg.prepareStatement(sql);
			    						rm = dmg.select();

			    						while(rm != null && rm.next()) {
			    							String sgis_main_loc_code = String.valueOf((Character)rm.get("sgis_main_loc_code"));
			    							String sgis_main_loc_desc = StringUtil.verify((String)rm.get("sgis_main_loc_desc"));
			    							%>
			    							<tr>
			    								<td><input type="checkbox" name="m1"></td>
			    								<td><input type="text" name="sgis_main_loc_code" style="width:40px; text-align:center; border:0; cursor:pointer" maxlength="1" onClick="subMenu('<%=sgis_main_loc_code %>', '<%=sgis_main_loc_desc %>');" value="<%=sgis_main_loc_code %>" readOnly></td>
			    								<td><input type="text" name="sgis_main_loc_desc" style="width:180px" onClick="editChanged(1, <%=rowcnt %>);subMenu('<%=sgis_main_loc_code %>', '<%=sgis_main_loc_desc %>');" value="<%=sgis_main_loc_desc %>"></td>
			    								<input type="hidden" name="inUse1" value="N">
			    								<input type="hidden" name="status1" value="U">
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
			    	<td colspan="3"><span id="menu1"></span></td>
			    </tr>
			  </table>
			  <br>
			  <table width="300" border=0>
			  	<tr>
			  		<td align="right"><img src="images/top_menu_add.gif" onClick="addMenu(1);" border=0 style="cursor:pointer" align="absmiddle"></td>
			  	</tr>
			  </table>
			 </td>
			 <td valign="top">
			 	<table width="240" border=0>
			 		<tr>
			 			<td>
								<div id='detailMenuDiv' type='table' data='gsks_01_06_tabpage06_01.jsp' foRow='1' style=" overflow-y:hidden;"></div>
						</td>
					</tr>
				</table>
		 </td>
		</tr>
	</table>

<div class="list_btn_right"><a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0 align="absmiddle"></a>
<a href="javascript:removeClicked();"><img src="images/admin_01_04_tab_page_03_button_delete.gif" border=0 align="absmiddle"></a></div>

  <div class="clear"></div>

	</div><div class="clear"></div>

  </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
