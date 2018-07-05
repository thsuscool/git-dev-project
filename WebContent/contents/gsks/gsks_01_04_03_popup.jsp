<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;

	String sgis_census_name = "";
	String sgis_census_public_format = "SHP";
	String sgis_census_public_yn = "";
	String sgis_census_location = "";
	String sgis_census_price = "";
	String sgis_census_file = "";
	String sgis_census_id_name = "";
	String sgis_census_year="";
	String path = "/census/";

	if(lData.getString("aT").equals("RET")) {

		try {

			broker = new GeneralBroker("ceaa00");

			lData.setString("PARAM", "CENSUS_DATA_INFO");
			rm = broker.getList(lData);

			if(rm.next()) {
					sgis_census_name= StringUtil.verify((String)rm.get("sgis_census_name"));
					sgis_census_id_name= StringUtil.verify((String)rm.get("sgis_census_id_name"));
    			sgis_census_public_format= StringUtil.verify((String)rm.get("sgis_census_public_format"));
    			sgis_census_public_yn= String.valueOf((Character)rm.get("sgis_census_public_yn"));
    			sgis_census_location= StringUtil.verify((String)rm.get("sgis_census_location"));
    			sgis_census_price= StringUtil.verify((String)rm.get("sgis_census_price"));
			}

		} catch(Exception e) {
			System.out.print("sgisWebError : ");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title><%=sc_pageTitle %></title>
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/gsks/style/style.css" type="text/css" media="all">
<script src=/contents/scripts/common.js></script>
<script language="javascript">
	function saveClicked() {
		var fm=document.censusFm;

		if(fm.sgis_census_id.value.trim() == "") {
			alert("구분을 선택하세요.");
			return;
		} else if(fm.census_name.value.trim() == "") {
			alert("대상자료명을 입력하세요.");
			return;
		} else if(fm.census_public_format.value.trim() == "") {
			alert("배포포맷을 입력하세요.");
			return;
		} else if(fm.census_public_yn.value.trim() == "") {
			alert("공개여부를 선택하세요.");
			return;
		} else if(fm.census_location.value.trim() == "") {
			alert("대상지역을 입력하세요.");
			return;
		} else if(fm.census_price.value.trim() == "") {
			alert("가격을 입력하세요.");
			return;
//		} else if(fm.census_file.value.trim() == "" && fm.aT.value == "") {	//등록일 경우만 체크
//			alert("파일을 선택하세요.");
//			return;
		} else {

try {
			var ycnt=fm.census_stand_year.length;
			var ducnt=0;
		} catch(e) {}

			if(ycnt == undefined && fm.census_stand_year) ycnt = 1;

			if(ycnt == 1) {
				if(fm.census_stand_year.value.length != 4 || !Number(fm.census_stand_year.value)) {
					alert("년도를 정확히 입력하세요.");
					return;
				}

			} else {

				var ycnt2=0;
				for(i=0; i  < ycnt; i++) {
					if(fm.census_stand_year[i].value.length != 4 || !Number(fm.census_stand_year[i].value)) ycnt2++;
				}

				if(ycnt2 != 0) {
					alert("년도를 정확히 입력하세요.");
					return;
				}

				for(i=0; i  < ycnt; i++) {
					for(j=i+1; j < ycnt; j++) {
						if(fm.census_stand_year[i].value == fm.census_stand_year[j].value) ducnt++;
					}
				}
			}

				if(ducnt != 0 && ducnt != undefined) {
							alert("동일한 년도가 존재합니다. 년도를 확인하세요.");
							return;
				}

			//파일 확장자 필터링
//			if(fileExtendFilter(fm.census_file.value)) {

					var c = confirm("저장하시겠습니까?");
					if(c == 1) {

						//수정일 경우
						if(fm.aT.value == "RET" || fm.aT.value == "UPD") {
							fm.aT.value="UPD";
						} else {	//등록일 경우
							fm.aT.value="INS";
						}

						fm.action="gsks_01_04_03_popup_prc.jsp";
						fm.submit();
					}

				}
//			}
	}

	function removeClicked() {
		var c = confirm("사용자에게 제공된 모든 신청 건이 삭제됩니다. 삭제하시겠습니까?")
		if(c == 1) {
			document.censusFm.aT.value = "DEL";
			document.censusFm.target="_self";
			document.censusFm.action="gsks_01_04_03_popup_prc.jsp";
			document.censusFm.submit();
		}
	}

	function download(file) {
			document.censusFm.filename.value = file;
			downloadIfr.location.href="/contents/include/download.jsp?filename="+document.censusFm.filename.value + "&path="+ document.censusFm.path.value;
	}

	//수정일 경우 추가 기준년도를 0부터 시작
<%if(lData.getString("aT").equals("RET")) {%>
	var num=0;
	var no=0;
<%} else {%>
	var num=1;
	var no=1;
<%}%>
	function addClicked() {
		var fm=document.censusFm;
		//수정일 경우 등록된 년도이후부터 시작
		if(num == 0) {
			num = Number(fm.rowcnt.value);
		}
		var nextnum = num+1;
		var nextColumn = no + 1;

		var text="<br>년도 : <input type=\"text\" name=\"census_stand_year\" style=\"width:40px\"  maxlength=\"4\"> 파일 : <input type=\"file\" name=\"census_year_file"+nextnum+"\">";
				text += "<input type='hidden' name='inUse' value='I'>";
				text += "<span id=\"addColumn"+nextColumn+"\"></span>";

		var add = document.getElementById("addColumn"+no);
		add.innerHTML = text;
		no = no+1;
		num = nextnum;
	}

</script>
</head>
<body>

    <table width="98%" border="0" cellspacing="0" cellpadding="0" align="center">
    	<tr>
    		<td align="right" height="50"><a href="javascript:window.close();"><img src="images/button_admin_popup_close_mail.gif" border=0 align="absmiddle"></a></td>
    	</tr>
    </table>

<iframe name="downloadIfr" height="0" width=0 frameborder=0></iframe>

    <table width="98%" border="0" cellspacing="0" cellpadding="0" class="table1" align="center">
<!-- 파일다운로드 -->
<form name="fd" method="post">
<input type="hidden" name="filename">
<input type="hidden" name="path" value="<%=path %>">
</form>
    <form name="censusFm" method="post" enctype="multipart/form-data">

    	<input type="hidden" name="aT" value="<%=lData.getString("aT") %>">
    	<input type="hidden" name="origin_sgis_census_id" value="<%=lData.getString("selected_sgis_census_id") %>">
    	<input type="hidden" name="origin_sgis_census_data_id" value="<%=lData.getString("selected_sgis_census_data_id") %>">

	    <tr>
		    <th width="100" class="td_top">구분</th>
		    <td class="td_top t_end">
		    <%if(lData.getString("aT").equals("RET")) { %>
		    <%=sgis_census_id_name %><input type="hidden" name="sgis_census_id" value="<%=lData.getString("selected_sgis_census_id") %>">
		    <%} else { %>
		    		<select name="sgis_census_id">
		    			<option value="">= 선택 =</option>
		    		<%
		    			try {

		    				broker = new GeneralBroker("ceaa00");
		    				lData.setString("PARAM", "CODE");
		    				rm = broker.getList(lData);

		    			while(rm.next()) {
		    				String census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
		    				String census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
		    		%>
		    		<option value="<%=census_id %>" <%if(lData.getString("selected_sgis_census_id").equals(census_id)) {%>selected<%} %>><%=census_name %></option>
		    		<%} %>
		    		</select>
		    		<%
		    		} catch(Exception e) {
	    				System.out.print("sgisWebError : ");
	    				//2015-12-03 시큐어코딩
	    				//e.printStackTrace();
	    				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	    			}} %>
		    </td>
    	</tr>
	    <tr>
		    <th>대상자료명</th>
		    <td class="t_end">
		    		<input type="text" name="census_name" size="50" value="<%=sgis_census_name %>">
		    </td>
    	</tr>
	    <tr>
		    <th>배포포맷</th>
		    <td class="t_end">
		    		<input type="text" name="census_public_format" size="10" value="<%=sgis_census_public_format %>">
		    </td>
    	</tr>
	    <tr>
		    <th>공개여부</th>
		    <td class="t_end">
		    		<select name="census_public_yn">
		    			<option value="">= 선택 =</option>
		    			<option value="Y" <%if(sgis_census_public_yn.equals("Y")) {%>selected<%} %>>공개</option>
		    			<option value="N" <%if(sgis_census_public_yn.equals("N")) {%>selected<%} %>>비공개</option>
		    			<option value="S" <%if(sgis_census_public_yn.equals("S")) {%>selected<%} %>>제한·공개</option>
		    		</select>
		    </td>
    	</tr>
	    <tr>
		    <th>대상지역</th>
		    <td class="t_end">
		    		<input type="text" name="census_location" size="50" value="<%=sgis_census_location %>">
		    </td>
    	</tr>
	    <tr>
		    <th>가격</th>
		    <td class="t_end">
		    		<input type="text" name="census_price" size="10" value="<%=sgis_census_price %>">
		    </td>
    	</tr>
	    <tr>
		    <th>기준년도</th>
		    <td>
		    	<table width="100%" border=0 cellpadding=0 cellspacing=0>
		    	<tr>
		    		<td class="t_end" colspan="2"><a href="javascript:addClicked();"><img src="images/admin_01_04_tab_page_03_button_add.gif" align="absmiddle" border=0></a></td>
					</tr>
<%
		int rowcnt=0;
%>
<%if(lData.getString("aT").equals("RET")) {
				try {

					broker = new GeneralBroker("ceaa00");
					lData.setString("PARAM", "CENSUS_DATA_YEAR2");
					lData.setString("r_sgis_census_id", lData.getString("selected_sgis_census_id"));
					lData.setString("r_sgis_census_data_id", lData.getString("selected_sgis_census_data_id"));

					rm1 = broker.getList(lData);

					while(rm1 != null && rm1.next()) {
						String list_sgis_census_year = StringUtil.verify((String)rm1.get("sgis_census_year"));
						String list_sgis_census_file = StringUtil.verify((String)rm1.get("sgis_census_file"));
%>

		    		<tr>
		    			<td class="t_end">
		    		년도 :	<input type="text" name="census_stand_year" value="<%=list_sgis_census_year %>" style="width:40px; background-color:#EFEFEF" maxlength="4" readOnly >
		    		 <%if(!list_sgis_census_file.equals("null")) {%>/ 파일 : <a href="javascript:fileDownload(fd,'<%=list_sgis_census_file %>');"><%=list_sgis_census_file %></a><br><%} %>
		    		<input type="hidden" name="inUse" value="U">
		    		 <input type="file" name="census_year_file<%=rowcnt+1 %>">
		    			</td>
		    			<td class="t_end"><input type="checkbox" name="removeYear" value="<%=list_sgis_census_year %>"> 삭제</td>
		    		</tr>
<%
					rowcnt++;
									}
			} catch(Exception e) {
				System.out.print("sgisWebError : ");
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			}
%>
				<tr>
					<td colspan="2" class="t_end">	<span id="addColumn0"></span></td>
				</tr>
<%}  else { %>
		    		<tr>
		    			<td class="t_end">
		    		년도 : <input type="text" name="census_stand_year" style="width:40px" value="" maxlength="4">  파일 : <input type="file" name="census_year_file1"> <!-- <a href="javascript:addClicked();"><img src="images/admin_01_04_tab_page_03_button_add.gif" align="absmiddle" border=0></a>-->
		    		<span id="addColumn1"></span>
		    			</td>
		    		</tr>
<%} %>
		    	</table>
		    </td>
    	</tr>
    	<input type="hidden" name="rowcnt" value="<%=rowcnt %>">
			</form>
    </table>

		<br>
		<table width="100%" border=0>
			<tr>
				<td align="center"><a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0 align="absmiddle"></a>
				<%if(lData.getString("aT").equals("RET")) {%>
				<!-- <a href="javascript:removeClicked();">전체<img src="images/admin_01_04_tab_page_03_button_delete.gif" border=0 align="absmiddle"></a>-->
				<%} %>
					<a href="javascript:window.close();"><img src="images/admin_01_03_tab_page_01_button_03.gif" border=0 align="absmiddle"></a>
				</td>
			</tr>
		</table>
	<br>
</body>
</html>