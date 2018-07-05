<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;

	String api_element_e_desc = "";
	String api_element_ex_name = "";
	String api_element_ex_desc = "";
	String api_element_script = "";
	String api_element_example_exe = "";
	String api_element_req_down = "";
	String api_element_res_down = "";
	String api_element_doc_down = "";
	String api_element_expert_api_doc = "";

		try {
			broker = new GeneralBroker("apaa00");
			lData.setString("PARAM", "SAMPLE_ELEMENT");

			rm = broker.getList(lData);
			if(rm.next()) {
				api_element_e_desc = StringUtil.verify((String)rm.get("api_element_e_desc"));
				api_element_ex_name = StringUtil.verify((String)rm.get("api_element_ex_name"));
				api_element_ex_desc = StringUtil.verify((String)rm.get("api_element_ex_desc"));
				api_element_script = StringUtil.verify((String)rm.get("api_element_script"));
				api_element_example_exe = StringUtil.verify((String)rm.get("api_element_example_exe"));
				api_element_req_down = StringUtil.verify((String)rm.get("api_element_req_down"));
				api_element_res_down = StringUtil.verify((String)rm.get("api_element_res_down"));
				api_element_doc_down = StringUtil.verify((String)rm.get("api_element_doc_down"));
				api_element_expert_api_doc = StringUtil.verify((String)rm.get("api_element_expert_api_doc"));
			}

		} catch(Exception e) {
			System.out.print("sgisWebError : ");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}

	if(StringUtil.isEmpty(api_element_e_desc)) {
		lData.setString("aT", "INS");
	} else {
		lData.setString("aT", "UPD");
	}

%>
<script language="javascript">
	function elementChanged() {
		var fm = document.eFm;
		fm.submit();
	}

	function saveClicked() {
		var fm=document.eFm;
		var c = confirm("저장하시겠습니까?");
		if(c == 1) {
			if(fm.api_element_id.value == "") {
				alert("서비스를 선택하세요.");
				return;
			} else if(fm.api_element_e_desc.value == "") {
				alert("서비스설명을 입력하세요.");
				return;
			} else if(fm.api_element_ex_name.value == "") {
				alert("예제명을 입력하세요.");
				return;
			} else if(fm.api_element_ex_desc.value == "") {
				alert("예제설명을 입력하세요.");
				return;
			}

			fm.encoding="MULTIPART/FORM-DATA"
			fm.action="gsks_01_03_tab_page_05_prc.jsp";
			fm.submit();
		}
	}

	function removeClicked() {
		var fm=document.eFm;
		var c = confirm("삭제하시겠습니까?");
		if(c == 1) {
			if(fm.api_element_id.value =="") {
				alert("서비스를 선택하세요.");
				return;
			}
			fm.aT.value="DEL";
			fm.encoding="MULTIPART/FORM-DATA"
			fm.action="gsks_01_03_tab_page_05_prc.jsp";
			fm.submit();
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
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02.jsp"><strong>그룹설정</strong></a></td>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
							<a href="gsks_01_03_tab_page_03.jsp"><font color="#FFFFFF"><strong>항목관리</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_04.jsp"><strong>서비스로그</strong></a></td>
				</tr>
				<tr>
					<td colspan="4"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="575" height="1px"></td>
				</tr>
			</table>
		</div>

		<div class="clear">
	<br>
  <table width="100%" cellpadding="0" cellspacing="0" summary="권한관리에 대한 내용입니다." >
  	<tr>
  		<td><a href="gsks_01_03_tab_page_03.jsp"><strong>[항목설정]</strong></a> <a href="gsks_01_03_tab_page_05.jsp"><strong>[제공리스트]</strong></a></td>
    </tr>
  </table>

<br>

	<table width="620" cellpadding="0" cellspacing="1" class="table1">
			<form name="eFm" method="post">
			<input type="hidden"	 name="aT" value="<%=lData.getString("aT") %>">
			<input type="hidden" name="api_element_expert_api_doc" value="전문가용API상세사양문서.doc">

	   <thead>
			<tr>
				<th class="td_top t_end" colspan="2">서비스
				<select name="api_element_id" onChange="elementChanged();">
					<option value="">= 선택 =</option>
				<%

				try {
					broker = new GeneralBroker("apaa00");
					lData.setString("PARAM", "ELEMENTS");
					rm = broker.getList(lData);

					while(rm != null && rm.next()) {
						String r_api_element_id = String.valueOf((BigDecimal)rm.get("api_element_id"));
						String r_api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
				%>
					<option value="<%=r_api_element_id %>" <%if(lData.getString("api_element_id").equals(r_api_element_id)) {%>selected<%} %>><%=r_api_element_name %></option>
				<%
					}
				%>
				<%
				} catch(Exception e) {
					System.out.print("sgisWebError : ");
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				}
				%>
								</select>
				</td>
			</tr>
		</thead>
		<tr>
			<td>서비스 설명 : </td>
			<td class="t_end"><input type="text" name="api_element_e_desc" style="width:400px" value="<%=api_element_e_desc %>"></td>
	</tr>
		<tr>
			<td>예제명 : </td>
			<td class="t_end"><input type="text" name="api_element_ex_name" style="width:400px" value="<%=api_element_ex_name %>"></td>
		</tr>
		<tr>
			<td>예제설명 : </td>
			<td class="t_end"><input type="text" name="api_element_ex_desc" style="width:400px" value="<%=api_element_ex_desc %>"></td>
		</tr>
		<tr>
			<td>스크립트 : </td>
			<td class="t_end"><textarea name="api_element_script" style="width:400px" cols="50" rows="20"><%=api_element_script %></textarea></td>
		</tr>
		<tr>
			<td>예제실행하기 : </td>
			<td class="t_end"><input type="file" name="api_element_example_exe" style="width:300px">
			<%if(lData.getString("aT").equals("UPD")) {%><br><%=api_element_example_exe %><%} %></td>
		</tr>
		<tr>
			<td>요청다운로드 : </td>
			<td class="t_end"><input type="file" name="api_element_req_down" style="width:300px">
			<%if(lData.getString("aT").equals("UPD")) {%><br><%=api_element_req_down %><%} %></td>
		</tr>
		<tr>
			<td>응답다운로드 : </td>
			<td class="t_end"><input type="file" name="api_element_res_down" style="width:300px">
			<%if(lData.getString("aT").equals("UPD")) {%><br><%=api_element_res_down %><%} %></td>
		</tr>
		<tr>
			<td>API문서다운로드 : </td>
			<td class="t_end"><input type="file" name="api_element_doc_down" style="width:300px">
			<%if(lData.getString("aT").equals("UPD")) {%><br><%=api_element_doc_down %><%} %></td>
		</tr>
		</form>
</table>
<br>
<table width="560">
	<tr>
		<td align="right"><a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0></a>
			<a href="javascript:removeClicked();"><img src="images/admin_01_04_tab_page_03_button_delete.gif" border=0></a></td>
	</tr>
</table>

 </div>

 </div><div class="clear"></div>

    </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>

