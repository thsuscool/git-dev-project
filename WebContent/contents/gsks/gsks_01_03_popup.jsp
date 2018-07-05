<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%

	DbManager dmg = null;
	RecordModel rm = null;
	RecordModel rm1 = null;

	if(lData.getString("aT").equals("INS")) {

			try {

				dmg = new DbManager();

				String api_element_id = lData.getString("api_element_id");
				String[] elements = api_element_id.split(",");

				/**********************************/
				/* group 존재 여부 */
				/**********************************/
				String ssql = " select count(api_group_id) cnt from sgis_api_group_code where api_group_name = '"+lData.getString("group_name").toUpperCase()+"'";
				dmg.prepareStatement(ssql);
				rm = dmg.select();
				int gcnt=0;
				if(rm.next()) gcnt = (Integer)rm.get("cnt");

				if(gcnt > 0) {
					out.print("<script>alert('동일한 그룹명이 존재합니다.'); history.back();</script>");
				} else {

					for(int i=0; i < elements.length; i++) {

						//maxnum
						String msql = " select nvl(max(api_group_id)+1,0) mannum from sgis_api_group_code ";

						dmg.prepareStatement(msql);
						rm = dmg.select();
						String maxnum="";
						if(rm.next()) maxnum = String.valueOf((BigDecimal)rm.get("mannum"));

						/**********************************/
						/* group 추가 */
						/**********************************/
						String isql = " insert  into sgis_api_group_code	";
										isql += "	( ";
										isql += "  	api_group_id ";
										isql += "  	, api_group_name ";
										isql += "  	, api_group_desc ";
										isql += " 	 	, api_basic_setting ";
										isql += "	)";
										isql += "	values ";
										isql += "	(";
										isql += "	'"+maxnum+"'";
										isql += "	, '"+lData.getString("group_name").toUpperCase()+"'";
										isql += "	, '"+lData.getString("group_desc")+"'";
										isql += "	, 'N'";
										isql += "	)";


						dmg.prepareStatement(isql);
						dmg.executeUpdate();

						/**********************************/
						/* group 에 element 추가 */
						/**********************************/
						String esql = " select api_element_id from sgis_api_element_code order by api_element_id ";
						dmg.prepareStatement(esql);
						rm = dmg.select();

						while(rm != null && rm.next()) {

							String r_api_element_id = String.valueOf((BigDecimal)rm.get("api_element_id"));

							String emaxsql = "  select nvl(max(api_group_set_code)+1,0) maxnum from sgis_api_group_set where api_group_id='"+maxnum+"'   ";
							dmg.prepareStatement(emaxsql);
							rm1 = dmg.select();
							String element_max = "";
							if(rm1.next()) element_max = String.valueOf((BigDecimal)rm1.get("maxnum"));

							String isql2 = " insert into sgis_api_group_set ";
											isql2 += "						values ";
											isql2 += "						( ";
											isql2 += "						    '"+maxnum+"' ";
											isql2 += "						    , '"+element_max+"'	";
											isql2 += "						    , '"+r_api_element_id+"'		";
											isql2 += "						) ";

											dmg.prepareStatement(isql2);
											dmg.executeUpdate();
						}

						out.print("<script>opener.location.href='gsks_01_03_tab_page_02.jsp'; window.close();</script>");
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
	}
%>
<!DOCTYPE.jsp PUBLIC "-//W3C//DTD.jsp 4.0 Transitional//EN">
<HEAD>
<TITLE><%=sc_pageTitle %></TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<meta http-equiv="Content-Type" content="text.jsp; charset=utf-8" />
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/gsks/style/style.css" type="text/css" media="all">
<script language="javascript">

	function saveClicked() {
			if(document.gFm.group_name.value == "") {
				alert("그룹명을 입력하세요.");
				return;
			} else {
				var c = confirm("저장하시겠습니까?");
				if(c == 1) {
						document.gFm.aT.value="INS";
						document.gFm.submit();
				}
			}
	}

</script>
</HEAD>
<body>

		<div class="clear">
	<br>
	<table width="100%" cellpadding="0" cellspacing="0">

				<form name="gFm" method="post">
					<input type="hidden" name="aT">
				<tr>
					<td>

					<table width="100%" cellpadding="0" cellspacing="0">
			      <tr>
			        <th class="td_top">그룹명 : </th>
			        <td><input type="text" name="group_name" size="5" maxlengh="1" style="text-align:center"></td>
			      </tr>
			      <tr>
			        <th class="td_top">그룹설명 : </th>
			        <td><input type="text" name="group_desc" size="30" maxlengh="1" style="text-align:center"></td>
			      </tr>
			      <tr>
			      	<td colspan="2" height="20"></td>
			      </tr>
			      <tr>
			      	<td colspan="2" align="center"><a href="javascript:saveClicked();"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_02.gif" alt="저장" border=0/></a></td>
			      </tr>
			  </form>
			    </table>
		 </div>

    </div>
  </div>
</div>
<div class="clear"></div>

</body>
</html>