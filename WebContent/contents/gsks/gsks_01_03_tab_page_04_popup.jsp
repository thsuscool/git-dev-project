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

	String sgis_name = "";
	String sgis_member_id = "";
	String api_auth_key = "";
	String api_title = "";
	String api_server_ip = "";
	String api_element_name = "";

	//조회기간
	String from = lData.getString("fromYear") + "-" + lData.getString("fromMonth") + "-" + lData.getString("fromDay");
	String to = lData.getString("toYear") + "-" + lData.getString("toMonth") + "-" + lData.getString("toDay");

	try {

		dmg = new DbManager();

		String sql = " select sgis_name ";
						sql += "					, sgis_member_id     ";
						sql += "	        , a.api_auth_key ";
						sql += "	        , api_title ";
						sql += "	        , api_server_ip ";
						sql += "	        , api_element_name ";
						sql += "	    from sgis_api_log a, sgis_api_auth_key_grant b ";
						sql += "	        , sgis_member_info c, sgis_api_element_code d ";
						sql += "		where a.api_element_id = '"+lData.getString("api_element_id")+"' ";
						sql += "							and a.api_auth_key = '"+lData.getString("sgis_auth_key")+"' ";
						sql +=	"							and a.api_auth_key = b.api_auth_key ";
						sql += "							and b.sgis_member_key = c.sgis_member_key ";
						sql += "							and a.api_element_id = d.api_element_id ";
						sql += "			group by sgis_name, sgis_member_id, a.api_auth_key, api_title ";
						sql += "						    , api_server_ip, api_element_name ";

						dmg.prepareStatement(sql);
						rm = dmg.select();

						if( rm != null && rm.next()) {
							sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
							sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
							api_auth_key = StringUtil.verify((String)rm.get("api_auth_key"));
							api_title = StringUtil.verify((String)rm.get("api_title"));
							api_server_ip = StringUtil.verify((String)rm.get("api_server_ip"));
							api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
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
<HTML>
<HEAD>
<TITLE><%=sc_pageTitle %></TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<link href="/contents/style/style.css" rel="stylesheet" type="text/css" />
<script src=/contents/scripts/common.js></script>
<script src=/contents/scripts/javascript.js></script>
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
</script>
<style>
body{background:url(/contents/images/sub_background.jpg) repeat-x;}
</style>
</HEAD>

<BODY>

<table width="100%" border=0 style="padding-left:10px; padding-top:10px; padding-right:10px; padding-bottom:10px">
	<tr>
		<td>

  <div class="admin_content">
  		<div class="clear">

		  <div class="openapi_special">
            <div class="box_style_4_top"></div>
								<div class="box_style_4_middle">
										<div class="openapi_special_content">
				  <table width="100%" cellpadding="5" cellspacing="5">
				  	<tr>
				  		<td valign="top">
								  <table width="100%">
									  	<tr>
									  		<td align="right">성명 : </td>
									  		<td><%=sgis_name %>(<%=sgis_member_id %>)</td>
									  	</tr>
									  	<tr>
									  		<td align="right">항목 : </td>
									  		<td><%=api_element_name %></td>
									  	</tr>
									  	<tr>
									  		<td align="right">인증키 : </td>
									  		<td><%=api_auth_key %></td>
									  	</tr>
									  	<tr>
									  		<td align="right">시스템명 : </td>
									  		<td><%=api_title %></td>
									  	</tr>
									  	<tr>
									  		<td align="right">서버IP : </td>
									  		<td><%=api_server_ip %></td>
									  	</tr>
									  </table>
									</td>
									<td valign="top">

									<form name="eFm" method="post">
										<input type="hidden"	 name="aT">

								<table width="180" cellpadding="0" cellspacing="1">
									<tr>
										<td>기간 : <%=from %> ~ <%=to %></td>
									</tr>
								</table>
								<table width="180" cellpadding="0" cellspacing="1" class="table1">

							   <thead>
							      <tr>
							        <th class="td_top" width="100">일자</th>
							        <th class="t_end td_top">Count</th>
							      </tr>
							    </thead>

								</table>

								<div style="width:200px; height:285px; overflow-y:scroll; overflow-x:hidden">
								<table width="180" cellpadding="0" cellspacing="1" class="table1">
							    <%
							    	int total=0;
							    	try {

											dmg  = new DbManager();                                       
							    		String ssql = " select to_char(to_date(substr(api_process_time,1,8),'YYYYMMDD'),'YYYY-MM-DD') api_process_time ";
							    						ssql += "					, count(api_process_time) cnt  ";
							    						ssql += "							    		    from sgis_api_log ";
							    						ssql += "    where api_element_id = '"+lData.getString("api_element_id")+"' ";
							    						ssql += "				    		    and api_auth_key = '"+lData.getString("sgis_auth_key")+"' ";
							    						ssql += "										and to_char(to_date(substr(api_process_time,1,8),'YYYYMMDD'),'YYYY-MM-DD') between '"+from+"' and '"+to+"'";
							    						ssql += "   group by  to_char(to_date(substr(api_process_time,1,8),'YYYYMMDD'),'YYYY-MM-DD')";
							    						ssql += "	order by api_process_time desc	";

							    		dmg.prepareStatement(ssql);
							    		rm1 = dmg.select();

							    		while(rm1 != null && rm1.next()) {
							    			String api_process_time = StringUtil.verify((String)rm1.get("api_process_time"));
							    			String cnt = String.valueOf((Integer)rm1.get("cnt"));
							    			total += (Integer)rm1.get("cnt");

							    %>
							    	<tr>
							    		<td width="100" class="cell_center"><%=api_process_time %></td>
							    		<td class="t_end cell_center"><%=cnt %></td>
							    	</tr>
							    <%}
							    	} catch(Exception e) {
							    		System.out.print("sgisWebError : ");
							    		//2015-12-03 시큐어코딩
							    		//e.printStackTrace();
							    		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
							    	}	 finally {
							    		dmg.close();
							    	}
							    		%>
							    		<tr>
							    			<td class="cell_center">합계</td>
							    			<td class="t_end cell_center"><%=total %></td>
							    		</tr>
							</table>
							</div>

								</form>

									</td>
								</tr>
							</table>
									  <div class="clear"></div>
									  	</div>
				  			</div>
				  			<div class="box_style_4_bottom"></div>
				  </div>
			</div>
			<br>
	<center><a href="javascript:window.close();"><img src="images/button_admin_popup_close_mail.gif" border=0></a></center>
	<br>
 </div><div class="clear"></div>

    </div>
  </div>
</div>
<div class="clear"></div>

			</td>
		</tr>
	</table>

</body>
</html>