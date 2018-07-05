<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<%
	DbManager dmg = null;
	RecordModel rm = null;

	String sgis_main_low_url = "";
	String sgis_main_low_site = "";
	String sgis_main_low_image_on = "";
	String sgis_main_low_image_off = "";
	String sgis_main_low_seq = "";

	try {

		dmg = new DbManager();

		if(lData.getString("aT").equals("RET")) {
			String sql = " select  sgis_main_low_url	";
							sql += "					, sgis_main_low_site	";
							sql += "					, sgis_main_low_image_on	";
							sql += "					, sgis_main_low_image_off	";
							sql += "					, sgis_main_low_seq ";
							sql += "				from sgis_main_low_set	";
							sql += "		where sgis_main_low_id = '"+lData.getString("s_sgis_main_low_id")+"' ";
							sql += "							and sgis_main_loc_code = '"+lData.getString("s_sgis_main_loc_code")+"' ";

							dmg.prepareStatement(sql);
							rm = dmg.select();

							if(rm != null && rm.next()) {
								sgis_main_low_url = StringUtil.verify((String)rm.get("sgis_main_low_url"));
								sgis_main_low_site = StringUtil.verify((String)rm.get("sgis_main_low_site"));
								sgis_main_low_image_on = StringUtil.verify((String)rm.get("sgis_main_low_image_on"));
								sgis_main_low_image_off = StringUtil.verify((String)rm.get("sgis_main_low_image_off"));
								sgis_main_low_seq = String.valueOf((BigDecimal)rm.get("sgis_main_low_seq"));
							}
		}

	} catch(Exception e) {

	} finally {
				dmg.close();
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title><%=sc_pageTitle %></title>
<link href="/contents/style/style.css" rel="stylesheet" type="text/css" />
<link href="/contents/gsks/style/style.css" rel="stylesheet" type="text/css" />
<script language="javascript">
	function saveClicked() {
		var fm = document.menuFm;

		if(fm.sgis_main_low_site.value == "") {
			alert("사이트명을 입력하세요.");
			return;
			/*
		} else if(fm.sgis_main_low_url.value == "") {
			alert("메뉴URL을 입력하세요.");
			return;

		} else if(fm.sgis_main_low_image_on.value == "") {
			alert("메뉴이미지 ON을 선택하세요.");
			return;
		} else if(fm.sgis_main_low_image_off.value == "") {
			alert("메뉴이미지 OFF을 선택하세요.");
			return;
			*/
		} else if(fm.sgis_main_low_seq.value == "") {
			alert("순서를 입력하세요.");
			return;
		} else {
			fm.action="gsks_01_06_tabpage06_prc.jsp";
			if(fm.aT.value == "RET") {
				fm.aT.value = "UPD";
			} else {
				fm.aT.value="INS";
			}
			fm.target="_self";
			fm.submit();
		}
	}
</script>
</head>
<body>
	<form name="menuFm" method="post" enctype="multipart/form-data">
		<input type="hidden" name="aT" value="<%=lData.getString("aT") %>">
		<input type="hidden" name="sgis_main_loc_code" value="<%=lData.getString("s_sgis_main_loc_code")%>">
		<input type="hidden" name="sgis_main_low_id" value="<%=lData.getString("s_sgis_main_low_id")%>">

		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table1">
		  <tr>
				<th width="110" class="td_top">메뉴위치</th>
				<td class="td_top t_end"><%=lData.getString("s_sgis_main_loc_desc") %></td>
		  </tr>
		  <tr>
				<th>사이트명</th>
				<td class="t_end"><input type="text" name="sgis_main_low_site" style="width:200px" value="<%=sgis_main_low_site %>"></td>
		  </tr>
		  <tr>
				<th>메뉴URL</th>
				<td class="t_end"><input type="text" name="sgis_main_low_url" style="width:350px" value="<%=sgis_main_low_url %>"></td>
		  </tr>
		  <tr>
				<th>메뉴이미지 ON</th>
				<td class="t_end"><input type="file" name="sgis_main_low_image_on" style="width:350px"><%if(!StringUtil.isEmpty(sgis_main_low_image_on)) {%><br>[<%=sgis_main_low_image_on%>]<%} %></td>
		  </tr>
		  <tr>
				<th>메뉴이미지 OFF</th>
				<td class="t_end"><input type="file" name="sgis_main_low_image_off" style="width:350px"><%if(!StringUtil.isEmpty(sgis_main_low_image_off)) {%><br>[<%=sgis_main_low_image_off%>]<%} %></td>
		  </tr>
		  <tr>
				<th>순서</th>
				<td class="t_end"><input type="text" name="sgis_main_low_seq" style="width:30px" value="<%=sgis_main_low_seq %>"></td>
		  </tr>
		</table>
		<br>
		<table width="100%" border=0>
			<tr>
				<td align="center">
					<a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0></a>
					<a href="javascript:window.close();"><img src="images/admin_01_03_tab_page_01_button_03.gif" border=0></a>
				</td>
			</tr>
		</table>

	</form>
</body>
</html>
