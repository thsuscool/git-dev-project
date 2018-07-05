<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<html>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<SCRIPT language=javascript src="/contents/scripts/prototype.js"></SCRIPT>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;

	String sgis_census_req_id	= lData.getString("sgis_census_req_id");
	String sgis_census_id = "";
	String sgis_census_name = "";
	String sgis_census_data_id = "";
	String sgis_census_data_name = "";
	String sgis_census_req_app_date = "";
	String create_date = "";
	String sgis_census_req_status = "";
	String sgis_census_req_status_name = "";
	String sgis_member_key = "";
	String sgis_name = "";
	String sgis_member_id = "";
	String sgis_census_req_company = "";
	String sgis_census_req_tel = "";
	String sgis_census_req_file = "";
	String sgis_census_location = "";
	String sgis_census_req_goal = "";
	String sgis_census_req_reject = "";

	String years="";
	
	String sgis_census_req_email = "";
	String sgis_census_req_sosok = "";
	String sgis_census_req_mokjuk = "";
	String sgis_census_req_kwaje = "";
	String sgis_census_req_year = "";
	String sgis_census_sido_id = "";
	String sgis_census_sido_nm = "";
	String sgis_census_sigungu_id = "";
	String sgis_census_sigungu_nm = "";

	try {

		broker = new GeneralBroker("ceaa00");

		/**************************************/
		/* 승인, 반려, 수정 처리 */
		/* 승인 : A, 반려 : B, 수정 : EDIT */
		/**************************************/
		if(lData.getString("aT").equals("UPD")) {

			//수정이 아닌경우 상태처리
			if(!lData.getString("approve_status").equals("EDIT")) {
				lData.setString("PARAM", "UPDATE_CENSUS_APPLY_STATUS");
				broker.process(Const.P_UPD, lData);
			}

			/************************/
			/* 서비스등록 */
			/************************/
			//승인이거나 수정일때
			if(lData.getString("approve_status").equals("A") || lData.getString("approve_status").equals("EDIT")) {

				//년도 및 게시일자 처리
				lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
				broker.process(Const.P_DEL, lData); //개발 디버그를 위하여 일단 주석처리함. 디버그 후 주석제거 요망 2014.05.16 김준하

				lData.setString("PARAM", "CENSUS_APPLY_ST_ED_YEAR");
				broker.process(Const.P_INS, lData);
			}

		}

		/**************************************/
		/* 조회 */
		/**************************************/
		lData.setString("PARAM", "CENSUS_APPLY_INFO2");
		rm = broker.getList(lData);

		if(rm.next()) {
			//sgis_census_id	= String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			//sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
			//sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			//sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
			create_date = StringUtil.verify((String)rm.get("create_date"));
			sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
			sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
			sgis_census_req_status_name = StringUtil.verify((String)rm.get("sgis_census_req_status_name"));
			sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
			sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
			sgis_census_req_company = StringUtil.verify((String)rm.get("sgis_census_req_company"));
			sgis_census_req_tel = StringUtil.verify((String)rm.get("sgis_census_req_tel"));
			sgis_census_req_file = StringUtil.verify((String)rm.get("sgis_census_req_file"));
			if(sgis_census_req_file.equals("null")) sgis_census_req_file = "";
			sgis_census_location = StringUtil.verify((String)rm.get("sgis_census_location"));
			sgis_census_req_goal = StringUtil.verify((String)rm.get("sgis_census_req_goal"));
			sgis_census_req_goal = sgis_census_req_goal.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
			sgis_census_req_reject = StringUtil.verify((String)rm.get("sgis_census_req_reject")).replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
			
			sgis_census_req_email = StringUtil.verify((String)rm.get("sgis_census_req_email"));
            sgis_census_req_sosok = StringUtil.verify((String)rm.get("sgis_census_req_sosok"));
            sgis_census_req_mokjuk = StringUtil.verify((String)rm.get("sgis_census_req_mokjuk"));
            sgis_census_req_kwaje = StringUtil.verify((String)rm.get("sgis_census_req_kwaje"));
            sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
            sgis_census_sido_id = StringUtil.verify((String)rm.get("sgis_census_req_sido"));
            sgis_census_sido_nm = StringUtil.verify((String)rm.get("sido_nm"));
            sgis_census_sigungu_id = StringUtil.verify((String)rm.get("sgis_census_req_sigungu"));
            sgis_census_sigungu_nm = StringUtil.verify((String)rm.get("sigungu_nm"));
		}

			/********************************/
			/* 년도 */
			/********************************/
			lData.setString("PARAM", "CENSUS_APPLY_ST_ED_YEAR_GROUP");
			rm1 = broker.getList(lData);

			while(rm1 != null && rm1.next()) {
				String e_sgis_census_req_y_use_che = String.valueOf((Character)rm1.get("sgis_census_req_y_use_che"));
				if(e_sgis_census_req_y_use_che.equals("Y")) {
					years += StringUtil.verify((String)rm1.get("sgis_census_req_year")) + ", ";
				}
			}

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}

%>
 
<script language="javascript">
	function confirmClicked() {
		var fm=document.censusFm;

		var c = confirm("승인하시겠습니까?");
		if(c == 1) {
			if(document.censusFm.refuse.value.trim() == "") {
				alert("승인내용을 입력하세요.");
				return;
			}else{
				if(fm.inUse == undefined) {
						if(fm.sgis_census_chk.checked) fm.inUse.value = "Y";
						else fm.inUse.value = "N";
				} else {
					for(i=0; i < fm.inUse.length; i++) {
						if(fm.sgis_census_chk[i].checked) fm.inUse[i].value = "Y";
						else fm.inUse[i].value = "N";
					}
				}
				document.censusFm.action = "";
				document.censusFm.aT.value="UPD";
				document.censusFm.approve_status.value="A";
				document.censusFm.target = "_self";
				document.censusFm.submit();
			}
		}
	}

	function refuseClicked() {
		var c = confirm("반려하시겠습니까?");
		if(c == 1) {
			if(document.censusFm.refuse.value.trim() == "") {
				alert("반려내용을 입력하세요.");
				return;
			} else {
				document.censusFm.action = "";
				document.censusFm.aT.value="UPD";
				document.censusFm.approve_status.value="B";
				document.censusFm.target = "_self";
				document.censusFm.submit();
			}
		}
	}

	function editClicked() {
		var fm=document.censusFm;
		var c = confirm("수정하시겠습니까?");
		if(c == 1) {
			if(fm.inUse.length == undefined) {
					if(fm.sgis_census_chk.checked) fm.inUse.value = "Y";
					else fm.inUse.value = "N";
			} else {
				for(i=0; i < fm.inUse.length; i++) {
					if(fm.sgis_census_chk[i].checked) fm.inUse[i].value = "Y";
					else fm.inUse[i].value = "N";
				}
			}
			document.censusFm.action = "";
			document.censusFm.aT.value="UPD";
			document.censusFm.approve_status.value="EDIT";
			document.censusFm.target = "_self";
			document.censusFm.submit();
		}
	}

	function editChanged(num) {
		eval("document.censusFm.sgis_census_chk["+num+"].checked=true;");
	}

	function censusList() {
		var fm=document.listFm;
		fm.action="gsks_01_04.jsp";
		fm.target = "_self";
		fm.submit();
	}
	
	function calendar_check(param1,param2,param3){
	 
		var paramLen = param2.length;
	
		if(paramLen == undefined){
			Calendar(param2,param3);
		}else{ 
		 
		 	Calendar(param1,param3);
		}
	
	
	}

	function len_chk(len){

	    var frm = document.censusFm.refuse;

	    if(getLength(frm.value) > len ){
	       alert("입력가능한 글자수는 한글 "+len/2+"자, 영문 " +len+ "자로 제한되어 있습니다.")
	       frm.value = frm.value.substring(0, len/2);
	       frm.focus();
	    }
	}
</script>


<div class="admin_content">
  
    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

<!-- 
디버깅용 ==> lData.getString("aT") [<%= lData.getString("aT") %>]
<br>sgis_census_req_status [<%=sgis_census_req_status %>]
<br>approve_status [<%=lData.getString("approve_status")%>]
<br>approve_status [<%=lData.getString("approve_status")%>]
 -->


  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">센서스경계 자료제공</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="#">센서스경계 자료제공</a></li>
      </ul>
    </div>
    <div class="content_admin">
    	<div class="list_wrap">
    <div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
					    <a href="gsks_01_04.jsp"><font color="#FFFFFF"><strong>요청관리</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_01.jsp"><strong>자료제공</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_04_02.jsp"><strong>자료및안내</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_03.jsp"><strong>자료목록관리</strong></a></td>
    				<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_05.jsp"><strong>자료제공관리</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_06.jsp"><strong>결재관리</strong></a></td>
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
			</tr>
		</table>

		<form name="listFm" method="post">
				<input type="hidden" name="search_input" value="<%=lData.getString("search_input") %>">
				<input type="hidden" name="search_sel2" value="<%=lData.getString("search_sel2") %>">
		</form>

	<form name="censusFm" method="post">
		<input type="hidden" name="aT">
		<input type="hidden" name="approve_status">
		<input type="hidden" name="sgis_census_req_id" value="<%=sgis_census_req_id %>">

	<!-- 파일다운로드  -->
  <input type="hidden" name="filename" value="">
  <input type="hidden" name="path" value="/census/reqdoc/">	
	 <div class="clear"><br></div>

		  <div class="openapi_special">
            <div class="box_style_4_top"></div>
								<div class="box_style_4_middle">
										<div class="openapi_special_content">
				  <table width="100%" cellpadding="5" cellspacing="5">
				  	<tr>
				  		<td bgcolor="#FFFFFF">
				  				<table width="100%" class="table1">
										<tr bgcolor="#FFFFFF">
											<th class="td_top" align="left" width="100px">성명(ID) </th>
											<td class="td_top td_end"><%=sgis_name %>(<%=sgis_member_id %>)</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">회사 </th>
											<td class="td_end"><%=sgis_census_req_company %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">연락처 </th>
											<td class="td_end"><%=sgis_census_req_tel %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">신청일자 </th>
											<td><%=create_date %></td>
										</tr>
										
										
										<tr bgcolor="#FFFFFF">
											<th align="left">메일주소 </th>
											<td><%=sgis_census_req_email %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">소속구분 </th>
											<td>
												<%if(sgis_census_req_sosok.equals("001001")) { %>중앙행정기관<%} %>
												<%if(sgis_census_req_sosok.equals("001002")) { %>지방자치단체<%} %>
												<%if(sgis_census_req_sosok.equals("001003")) { %>공사/공단<%} %>
												<%if(sgis_census_req_sosok.equals("001004")) { %>학술기관<%} %>
												<%if(sgis_census_req_sosok.equals("001005")) { %>민간<%} %>
											</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">요청목적 </th>
											<td>
												<%if(sgis_census_req_mokjuk.equals("002001")) { %>DB<%} %>
												<%if(sgis_census_req_mokjuk.equals("002002")) { %>연구<%} %>
												<%if(sgis_census_req_mokjuk.equals("002003")) { %>작성<%} %>
											</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">수행과제 </th>
											<td><%=sgis_census_req_kwaje %></td>
										</tr>
										
										
										<tr bgcolor="#FFFFFF">
											<th align="left">첨부파일 </th>
											<td class="td_end">
                                                 <%if(sgis_census_req_file.equals("null")) { %>
											     <%} else { %>
															<span onclick="javascript:fileDownload(censusFm,'<%=sgis_census_req_file%>')" style="cursor:pointer;text-decoration:underline"><%=sgis_census_req_file%></span>
												 <%} %>										
											</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">활용목적 </th>
											<td class="td_end"><%=StringUtil.toLine(sgis_census_req_goal) %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<td height="15" colspan="2" class="td_end"></td>
										</tr>
										
										<tr bgcolor="#FFFFFF">
											<th align="left">승인여부 </th>
											<td class="td_end"><%=sgis_census_req_status_name %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left"><%if(sgis_census_req_status.equals("B")){ %>반려일자<%}else{%>승인일자<%}%> </th>
											<td class="td_end"><%=sgis_census_req_app_date %></td>
										</tr>
										<%if(sgis_census_req_status.equals("B") || sgis_census_req_status.equals("A")) {%>
										<tr bgcolor="#FFFFFF">
											<th align="left">승인/반려내용 </th>
											<td class="td_end"><%=sgis_census_req_reject %></td>
										</tr>
										<%} %>
									</table>
								</td>
							</tr>
				  </table>
									  <div class="clear"></div>
									  	</div>
				  			</div>
				  			<div class="box_style_4_bottom"></div>
				  </div>
			</div>

	<table>
		<tr>
			<td height="20"></td>
		</tr>
	</table>

	<table width="650" cellpadding="0" cellspacing="0" class="table1">
    <thead>
      	<tr>
	        <th class="td_top">선택</th>
	        <th class="td_top">자료구분</th>
	        <th class="td_top">대상자료명</th>
	        <th class="td_top">년도</th>
	        <th class="td_top">시도</th>
	        <th class="td_top">시군구</th>
	        <th class="td_top">게시시작일자</th>
	        <th class="td_end td_top">게시종료일자</th>
    	</tr>
    	<%
    			rm1.setIterator();
    			int rowcnt=0;

    			while(rm1 != null && rm1.next()) {
					 String r_sgis_census_id = String.valueOf((BigDecimal)rm1.get("sgis_census_id"));
					 String r_sgis_census_data_id = String.valueOf((BigDecimal)rm1.get("sgis_census_data_id"));    				
					 String r_sgis_census_req_year = StringUtil.verify((String)rm1.get("sgis_census_req_year"));
					 String r_sgis_census_req_y_s_d = StringUtil.verify((String)rm1.get("sgis_census_req_y_s_d"));
					 String r_sgis_census_req_y_e_d = StringUtil.verify((String)rm1.get("sgis_census_req_y_e_d"));
					 String r_sgis_census_req_y_use_che = String.valueOf((Character)rm1.get("sgis_census_req_y_use_che"));
					 String sgis_census_code_name = StringUtil.verify((String)rm1.get("sgis_census_code_name"));
					 sgis_census_name = StringUtil.verify((String)rm1.get("sgis_census_name"));
					 
	                 sgis_census_sido_id 	= StringUtil.verify((String)rm1.get("sgis_census_req_sido"));
	                 sgis_census_sido_nm 	= StringUtil.verify((String)rm1.get("sido_nm"));
	                 sgis_census_sigungu_id = StringUtil.verify((String)rm1.get("sgis_census_req_sigungu"));
	                 sgis_census_sigungu_nm = StringUtil.verify((String)rm1.get("sigungu_nm"));

					 
					 if(StringUtil.isEmpty(r_sgis_census_req_y_s_d)) r_sgis_census_req_y_s_d = StringUtil.split(sc_toDay,"422","-");
					 if(StringUtil.isEmpty(r_sgis_census_req_y_e_d)) r_sgis_census_req_y_e_d = StringUtil.split((String.valueOf(DateTime.calDay(7))),"422","-");	//한달뒤
    	%>
					<tr>
				        <td class="cell_center"><input type="checkbox" name="sgis_census_chk" <%if(r_sgis_census_req_y_use_che.equals("Y")){ %>checked<%} %>></td>
				        <td class="cell_center"><%=sgis_census_code_name %></td>
				        <td class="cell_center"><%=sgis_census_name %></td>
				        <td class="cell_center"><%=r_sgis_census_req_year %></td>
				        
				        <td class="cell_center"><%=sgis_census_sido_nm %></td>
				        <td class="cell_center"><%=sgis_census_sigungu_nm %></td>
				        
				        <td class="cell_center"><input type="text" name="sgis_census_req_y_s_d" value="<%=r_sgis_census_req_y_s_d %>" style="width:80px; text-align:center; cursor:pointer"  onClick="calendar_check(document.censusFm.sgis_census_req_y_s_d[<%=rowcnt %>],this,event); editChanged('<%=rowcnt %>');" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_s_d[<%=rowcnt %>],this,event );" onfocus="this.blur()"  readOnly></td>
				        <td class="cell_center"><input type="text" name="sgis_census_req_y_e_d" value="<%=r_sgis_census_req_y_e_d %>" style="width:80px; text-align:center; cursor:pointer"  onClick="calendar_check(document.censusFm.sgis_census_req_y_e_d[<%=rowcnt %>],this,event); editChanged('<%=rowcnt %>');" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_e_d[<%=rowcnt %>],this,event );" onfocus="this.blur()"  readOnly></td>
				        
				        <input type="hidden" name="inUse" value="<%=r_sgis_census_req_y_use_che %>">
				        <input type="hidden" name="sgis_census_req_year" value="<%=r_sgis_census_req_year %>">
				        <input type="hidden" name="sgis_census_id" value="<%=r_sgis_census_id %>">
				        <input type="hidden" name="sgis_census_data_id" value="<%=r_sgis_census_data_id %>">
				        
				        <input type="hidden" name="sgis_census_sido_id" value="<%=sgis_census_sido_id %>">
				        <input type="hidden" name="sgis_census_sigungu_id" value="<%=sgis_census_sigungu_id %>">
				    </tr>
	    
	        <%
	        		rowcnt++;
	        	} //end of while
	        %>
	        
	        
		    <input type="hidden" name="sgis_census_chk">
		    <input type="hidden" name="inUse">
		    <input type="hidden" name="sgis_census_req_year">
	
	    </thead>
	</table>

	<table>
		<tr>
			<td height="20"></td>
		</tr>
	</table>

<table width="100%" border=0>
	<tr>
		<td>
		<% 
			//신청일 경우
			if(sgis_census_req_status.equals("S")) { //신청일 경우
		%>
				<span class="b_b">승인/반려내용 </span><br/>
				<textarea type="text" name="refuse" style="width:600px; height: 150px; " onkeyup="len_chk(1000)"></textarea><br/>
				<a href="javascript:confirmClicked();"><img src="/contents/images/button_approval.gif" border=0 align="absmiddle"></a>
				<a href="javascript:refuseClicked();"><img src="/contents/images/button_return.gif" border=0 align="absmiddle"></a>
		<%
			} else if(sgis_census_req_status.equals("B")){ 	//반려한경우
		%>
				<span class="b_b">승인/반려내용 </span><br/>
				<textarea type="text" name="refuse" style="width:600px; height: 150px; " onkeyup="len_chk(1000)"><%=sgis_census_req_reject %></textarea><br/>
				<a href="javascript:confirmClicked();"><img src="/contents/images/button_approval.gif" border=0 align="absmiddle"></a>
		<% 
			}  
		%>
		<a href="javascript:editClicked();"><img src="images/button_modify.gif" border=0 align="middle"></a>
		<a href="javascript:censusList();"><img src="images/button_list.gif" border=0 align="middle"></a>
		
		</td>
	</tr>
</table>
</form>

  </div>

	</div><div class="clear"></div>

    </div>
  </div>
</div>
<div class="clear"></div>
<SCRIPT language=javascript src="/contents/scripts/calendar_layer.js"></SCRIPT>
<%@ include file="/contents/gsks/include/footer.jsp" %>
