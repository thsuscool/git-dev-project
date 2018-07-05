<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.DateTime"%>

<%@include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
		DbManager dmg = null;
		RecordModel rm = null;

		try {

			dmg = new DbManager();

			/**********************************/
			/* 등록 */
			/**********************************/
			if(lData.getString("aT").equals("INS")) {

				String sgis_census_id = lData.getString("sgis_census_id");
				String sgis_census_data_id = lData.getString("sgis_census_data_id");
				String sgis_census_offer_id = lData.getString("sgis_census_offer_id");
				String sgis_census_start_date = lData.getString("sgis_census_start_date");
				String sgis_census_end_date = lData.getString("sgis_census_end_date");
				String inUse = lData.getString("inUse");

				String[] list_sgis_census_id = sgis_census_id.split(",");
				String[] list_sgis_census_data_id = sgis_census_data_id.split(",");
				String[] list_sgis_census_offer_id = sgis_census_offer_id.split(",");
				String[] list_sgis_census_start_date = sgis_census_start_date.split(",");
				String[] list_sgis_census_end_date = sgis_census_end_date.split(",");
				String[] list_inUse = inUse.split(",");

				//기존자료 삭제
				String dsql = "	delete from sgis_census_offer ";
								dsql += "		where sgis_member_key = '"+lData.getString("sgis_member_key")+"' ";

				dmg.prepareStatement(dsql);
				dmg.executeUpdate();

				//sequence
				for(int i=0; i < list_sgis_census_id.length; i++) {

					String msql = " select nvl(max(sgis_census_offer_id)+1,0) maxnum from sgis_census_offer ";

					dmg.prepareStatement(msql);
					rm = dmg.select();
					String maxnum = "";
					if(rm.next()) maxnum = String.valueOf((BigDecimal)rm.get("maxnum"));

					//insert
					String isql = " insert into sgis_census_offer ";
									isql += "					( ";
									isql += "					    sgis_census_offer_id ";
									isql += "					    , sgis_census_id ";
									isql += "					    , sgis_census_data_id ";
									isql += "					    , sgis_member_key ";
									isql += "					    , sgis_census_start_date ";
									isql += "					    , sgis_census_end_date ";
									isql += "					    , sgis_census_approve_date ";
									isql += "					    , sgis_census_down_count ";
									isql += "					    , sgis_census_yn ";
									isql += "					) ";
									isql += "					values ";
									isql += "					( ";
									isql += "							'"+maxnum+"'	";
									isql += "							, '"+list_sgis_census_id[i]+"' ";
									isql += "							, '"+list_sgis_census_data_id[i]+"' ";
									isql += "							, '"+lData.getString("sgis_member_key")+"' ";
									isql += "							, to_date('"+list_sgis_census_start_date[i]+"') ";
									isql += "							, to_date('"+list_sgis_census_end_date[i]+"') ";
									isql += "							, sysdate ";
									isql += "							, 0 ";
									isql += "							, '"+list_inUse[i]+"' ";
									isql += "					)";

									dmg.prepareStatement(isql);
									dmg.executeUpdate();
				}

				/*****************************************/
				/*	회원테이블에 승인처리 */
				/*****************************************/
				String usql = " update sgis_member_info set sgis_census_download = 'Y'	";
								usql += "	where sgis_member_key = '"+lData.getString("sgis_member_key")+"' ";

								dmg.prepareStatement(usql);
								dmg.executeUpdate();

				out.print("<script>opener.location.href='gsks_01_04.jsp'; window.close();</script>");
			}

			/***********************************/
			/* 조회 */
			/***********************************/
			String sql = " select a.sgis_census_id	";
							sql += "		        , a.sgis_census_data_id ";
							sql += "		        , c.sgis_census_offer_id ";
							sql += "		        , b.sgis_census_code_name  sgis_census_id_name ";
							sql += "		        , a.sgis_census_name ";
							sql += "		        , to_char(sgis_census_start_date,'yyyy-mm-dd') sgis_census_start_date ";
							sql += "		        , to_char(sgis_census_end_date,'yyyy-mm-dd') sgis_census_end_date ";
							sql += "						, nvl(c.sgis_census_yn,'N') sgis_census_yn	";
							sql += "		    from sgis_census_data a, sgis_census_code b, sgis_census_offer c ";
							sql += "		where a.sgis_census_id = b.sgis_census_id ";
							sql +="		    and a.sgis_census_public_yn = 'Y' ";
							sql += "		    and a.sgis_census_id = c.sgis_census_id(+) ";
							sql += "		    and a.sgis_census_data_id = c.sgis_census_data_id(+) ";
							sql += "		    and c.sgis_member_key(+) = '"+lData.getString("sgis_member_key")+"' ";
							sql += "		order by sgis_census_id	";

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
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title><%=sc_pageTitle %></title>
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/gsks/style/style.css" type="text/css" media="all">
<script src=/contents/scripts/javascript.js></script>
<script src=/contents/scripts/common.js></script>
<script src=/contents/scripts/calendar.js></script>
<script language="javascript">
	function approveClicked() {
		var c = confirm("저장 하시겠습니까?");
		if(c == 1) {
			var cnt = document.censusFm.sgis_census_offer_id.length;
			var ischk=0;
			for(i=0; i < cnt; i++) {
				if(document.censusFm.sgis_census_offer_id[i].checked) ischk++;
			}

			if(ischk == 0) {
				alert("선택 항목이 없습니다.");
				return;
			} else {
				for(i=0; i < cnt; i++) {
					if(document.censusFm.sgis_census_offer_id[i].checked) document.censusFm.inUse[i].value = "Y";
					else document.censusFm.inUse[i].value = "N";
				}

				document.censusFm.aT.value="INS";
				document.censusFm.submit();
			}
		}
	}

	function editChanged(num) {
		eval("document.censusFm.sgis_census_offer_id["+num+"].checked=true;");
	}

	var isAll="0";

	function allChecked() {
		var fm=document.censusFm;
		var cnt = fm.sgis_census_offer_id.length;

		if(isAll == "0") {
			for(i=0; i < cnt; i++) {
				fm.sgis_census_offer_id[i].checked=true;
				isAll="1";
			}
		} else if(isAll == "1") {
			for(i=0; i < cnt; i++) {
				fm.sgis_census_offer_id[i].checked=false;
				isAll="0";
			}
		}
	}
</script>
</head>
<body>

<table width="98%" border="0" cellspacing="0" cellpadding="0" align="center">
	<tr>
		<td align="right" height="50"><a href="javascript:window.close();"><img src="images/button_admin_popup_close_mail.gif" border=0 align="absmiddle"></a></td>
	</tr>
</table>

<table width="98%" border=0 align="center">

			  	<form name="censusFm" method="post">
						<input type="hidden" name="aT">
						<input type="hidden" name="sgis_member_key" value="<%=lData.getString("sgis_member_key") %>">
	<tr>
		<td>
			<table width="652" border=0 cellpadding="0" cellspacing="0" class="table1">
			  <thead>
			      <tr>
			        <th class="td_top" width="40"><input type="checkbox" name="chkAll" onClick="allChecked();"></th>
			        <th class="td_top" width="100">구분</th>
			        <th class="td_top">대상자료명</th>
			        <th class="td_top" width="100">게시시작일자</th>
			        <th class="t_end td_top" width="100">게시종료일자</th>
			      </tr>
			    </table>

					<div id="" style="width:670px; height:350px; overflow-y:scroll; overflow-x:hidden">
			      <table width="653" border=0 cellpadding="0" cellspacing="0" class="table1">
			      <%
			      		int rowcnt=0;
			      		while(rm != null && rm.next()) {
			      			String sgis_census_offer_id = String.valueOf((BigDecimal)rm.get("sgis_census_offer_id"));
			      			String sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			      			String sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			      			String sgis_census_id_name = StringUtil.verify((String)rm.get("sgis_census_id_name"));
			      			String sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_name"));
			      			String sgis_census_start_date = StringUtil.verify((String)rm.get("sgis_census_start_date"));
			      			String sgis_census_end_date = StringUtil.verify((String)rm.get("sgis_census_end_date"));
			      			String sgis_census_yn = StringUtil.verify((String)rm.get("sgis_census_yn"));

			      			if(StringUtil.isEmpty(sgis_census_start_date)) sgis_census_start_date = StringUtil.split(sc_toDay,"422","-");	//금일
			      			if(StringUtil.isEmpty(sgis_census_end_date)) sgis_census_end_date = (String.valueOf(DateTime.RelativeDate(30))).substring(0,10);	//금일부터 30일이후
			      %>
			      <tr>
			        <td class="cell_center" width="40"><input type="checkbox" name="sgis_census_offer_id" value="<%=sgis_census_offer_id %>" <%if(sgis_census_yn.equals("Y")) { %>checked<%} %>></td>
			        <td class="cell_left" width="100"><%=sgis_census_id_name %></td>
			        <td class="cell_left"><%=sgis_census_name %></td>
			        <td class="cell_center" width="100"><input type="text" name="sgis_census_start_date" value="<%=sgis_census_start_date %>" size="6" readOnly
			        style="text-align:center; cursor:pointer" onClick="Calendar_D(censusFm.sgis_census_start_date[<%=rowcnt %>]); editChanged('<%=rowcnt %>');"></td>
			        <td class="cell_center" width="100"><input type="text" name="sgis_census_end_date" value="<%=sgis_census_end_date %>" size="6" readOnly
			        style="text-align:center; cursor:pointer" onClick="Calendar_D(censusFm.sgis_census_end_date[<%=rowcnt %>]); editChanged('<%=rowcnt %>');"></td>

			        <input type="hidden" name="sgis_census_id" value="<%=sgis_census_id %>">
			        <input type="hidden" name="sgis_census_data_id" value="<%=sgis_census_data_id %>">
			        <input type="hidden" name="inUse">

			      </tr>
			      <% rowcnt++; } %>
			    </thead>
			    <tbody>
			  	</tbody>

			  	</form>
			  </table>
				</div>

			<div class="clear"></div>
			<div class="list_button_right_02"><a href="javascript:approveClicked();"><img src="images/admin_01_04_tab_page_02_button_apply.gif" border=0></a></div>
		</td>
	</tr>
</table>
</body>
</html>
