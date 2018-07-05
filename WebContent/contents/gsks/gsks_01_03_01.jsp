<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@page import="kr.co.offton.pdf.Const"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;

	String api_title = "";
	String api_auth_key = "";
	String api_email = "";
	String api_tel = "";
	String api_use_org = "";
	String api_use_name = "";
	String api_esti_user_count = "";
	String api_server_ip = "";
	String api_use_reason = "";
	String api_file = "";
	String api_approve_status = "";
	String api_approve_status_name = "";
	String api_approve_date = "";
	String create_date = "";
	String api_group_name = "";
	String api_reject_desc = "";
	String api_modify_desc = "";
	String api_version = "";
	String api_use_agree = "";

	try {

		broker = new GeneralBroker("apaa00");
		DbManager dmg =  new DbManager();


		/**************************************/
		/* 승인, 반려, 수정 처리 */
		/* 승인 : A, 반려 : B */
		/**************************************/
		if(lData.getString("aT").equals("UPD")) {
			
			//lData.setString("api_auth_key",request.getParameter("api_modify_key"));
			lData.setString("PARAM", "REMOVE_API_ELEMENTS");
			broker.process(Const.P_DEL, lData);
			
			
			
			//수정이 아닌경우 상태처리
			//if(!lData.getString("approve_status").equals("EDIT")) {
				lData.setString("PARAM", "APPROVE");
				broker.process(Const.P_UPD, lData);
			//}
			lData.setString("api_auth_key",request.getParameter("api_modify_key"));
			lData.setString("PARAM", "INSERT_APPLY_ELEMENTS");
			broker.process(Const.P_INS, lData);

			/************************/
			/* 서비스등록 */
			/************************/
			//승인이거나 수정일때
			if(lData.getString("approve_status").equals("A") || lData.getString("approve_status").equals("EDIT")) {

				lData.setString("PARAM", "UPDATE_API_ELEMENTS");
				broker.process(Const.P_UPD, lData);

			}

		/**************************************/
		/* 승인 취소 처리 */
		/**************************************/
		} else if(lData.getString("aT").equals("CANCEL")) {
			try{
			/*************************/
			/* sgis_api_log remove */
			/*************************/
			String dsql0 = " delete from  sgis_api_log	";
			dsql0 += "		where api_element_id = '"+request.getParameter("api_modify_key")+"' ";
			System.out.println(dsql0);
			dmg.prepareStatement(dsql0);
			dmg.executeUpdate();
			} catch(Exception e) {
				System.out.print("sgisWebError : ");
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dmg.close();
			}
			
			
			lData.setString("PARAM", "CANCEL_APPROVE");
			broker.process(Const.P_UPD, lData);
			
			
		}

		/**************************************/
		/* 조회 */
		/**************************************/
		lData.setString("PARAM", "API_APPLY_INFO");
		rm = broker.getList(lData);

		if(rm.next()) {
			api_title = StringUtil.verify((String)rm.get("api_title"));
			api_auth_key = StringUtil.verify((String)rm.get("api_auth_key"));
			api_email = StringUtil.verify((String)rm.get("api_e_mail"));
			api_tel = StringUtil.verify((String)rm.get("api_tel"));
			api_use_org = StringUtil.verify((String)rm.get("api_use_org"));
			api_use_name = StringUtil.verify((String)rm.get("api_use_name"));
			api_esti_user_count = String.valueOf((BigDecimal)rm.get("api_esti_user_count"));
			api_server_ip = StringUtil.verify((String)rm.get("api_server_ip"));
			api_use_reason = StringUtil.verify((String)rm.get("api_use_reason"));
			api_use_reason = StringUtil.toLine(api_use_reason);
			api_file = StringUtil.verify((String)rm.get("api_file"));
			api_approve_status = String.valueOf((Character)rm.get("api_approve_status"));
			api_approve_status_name = StringUtil.verify((String)rm.get("api_approve_status_name"));
			api_approve_date = StringUtil.verify((String)rm.get("api_approve_date"));
			create_date = StringUtil.verify((String)rm.get("create_date"));
			api_group_name = StringUtil.verify((String)rm.get("api_group_name"));
			api_reject_desc = StringUtil.verify((String)rm.get("api_reject_desc"));
			api_modify_desc = StringUtil.verify((String)rm.get("api_modify_desc"));
			api_version = StringUtil.verify((String)rm.get("api_version"));
			api_use_agree =String.valueOf((Character)rm.get("api_use_agree"));
		}

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}

%>
<html>
<head>
</head>
<script language="javascript">
	function confirmClicked(code) {
	    var f = document.apiFm;
	    if (code == "A") {
		    if (f.api_modify_desc.value.trim() == "") {
		        alert("변경사유를 입력하세요.");
		        f.api_modify_desc.foucs();
		        return;
		    }
		}    
		var c = confirm("승인하시겠습니까?");
		if(c == 1) {
			f.aT.value="UPD";
			f.target = "_self";
			f.approve_status.value="A";
			f.submit();
		}
	}
	
    // 반려
	function refuseClicked() {
		var f = document.apiFm;
		if(f.refuse.value.trim() == "") {
			f.refuse.focus();
			alert("반려사유를 입력하세요.");
			return;	
		}
		var c = confirm("반려하시겠습니까?");
		if(c == 1) {
			F.aT.value="UPD";
			f.target = "_self";
			f.approve_status.value="B";
			f.submit();
		}
	}

	function editClicked() {
		var c = confirm("수정하시겠습니까?");
		if(c == 1) {
			document.apiFm.aT.value="UPD";
			document.apiFm.target = "_self";
			//document.apiFm.approve_status.value="EDIT";
			document.apiFm.approve_status.value="<%=api_approve_status%>";
			document.apiFm.submit();
		}
	}

	function cencelClicked() {
	    var f = document.apiFm;
	    if (f.api_modify_desc.value.trim() == "") {
	        alert("변경사유를 입력하세요.");
	        f.api_modify_desc.foucs();
	        return;
	    }
		var c = confirm("승인취소하시겠습니까?\n승인상태는 신청상태로 변경 됩니다. ");
		if(c == 1) {
		    document.apiFm.target = "_self";
			document.apiFm.aT.value="CANCEL";
			document.apiFm.submit();
		}
	}

	function apiList() {
		var fm=document.apiFm;
		fm.target = "_self";
		fm.action="gsks_01_03.jsp";
		fm.submit();
	}

	function ServiceLog() {
		var fm=document.apiFm;
		fm.target = "_self";
		fm.action="gsks_01_03_tab_page_04.jsp";
		fm.submit();
	}	

// 내용입력팝업
function Clicked(co) {
  var f = document.apiFm;
  var key = "<%= api_auth_key %>";
  var code = co;
  var obj = new paramObject(window,code);
  
  if (co == "C") { // 
	  if (key == "SGIS2009010660714461" || key == "SGIS2009010675004882" || key == "SA2I2012102276242864" ||
	      key == "SGIS2008121921012291" || key == "SGIS2008121992075588" || key == "SGIS2009020383732981") {
	      alert("필수 서비스 인증키 입니다. 취소 할 수 없습니다.");
	      return;
	  }
  }

  var height="260" ;
  var width="280";
  var winx=(screen.width -width)/2;
  var winy=(screen.height-height)/2;
  var settings ="dialogHeight: "+height+"px;";
  settings+="dialogWidth:  "+width+"px;";
  settings+="dialogTop:  "+winy+";";
  settings+="dialogLeft:   "+winx+";";
  settings+="scroll: no  ";
  settings+="resizable: no ";
  settings+="help:    no ";
  settings+="status:    no ";
  settings+="unadorned: yes";
 
  var url = "/contents/gsks/gsks_01_03_01_contents.jsp?co="+code;

  //window.showModalDialog(url,obj, settings);
  window.showModalDialog(url,window, settings);
  

}
function paramObject(WinObject, code) {
    this.WinObject = WinObject;
    this.code = code;
}


function changeKey(){
	var f =	document.apiFm	;
	var fm = document.all;
	//alert(fm.changeKey.value);
<%
	if(!api_version.equals("2.0")){
%>		
	if(fm.changeKey.value == '외부'){
		fm.apiKey.value = 'ESGA'+fm.apiKey.value.substring(4);
	}else{
		fm.apiKey.value = 'SGIS'+fm.apiKey.value.substring(4);
	}
<%
	}else{
%>
	if(fm.changeKey.value == '외부'){
		fm.apiKey.value = 'SA2O'+fm.apiKey.value.substring(4);
	}else{
		fm.apiKey.value = 'SA2I'+fm.apiKey.value.substring(4);
	}
<%
	}
%>	
	
	f.api_modify_key.value = fm.apiKey.value;
	
	f.random_auth_key.value = f.api_modify_key.value;
	
	
}

function apiKeyChange(){
	var fm = document.all;

<%
	if(api_version.equals("2.0")){
%>	
	if(fm.apiKey.value.substring(0,4) == 'SA2I'){
		fm.changeKey.value = '내부';
	}else if(fm.apiKey.value.substring(0,4) == 'SA2O'){
		fm.changeKey.value = '외부';
	}
	
	<%
	}else{
%>

	if(fm.apiKey.value.substring(0,4) == 'SGIS'){
		fm.changeKey.value = '내부';
	}else if(fm.apiKey.value.substring(0,4) == 'ESGA'){
		fm.changeKey.value = '외부';
	}
<%
	}
%>	

}
function openaa(){
alert('a');
}
</script>
<body onload="apiKeyChange();">
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
					    <% if (lData.get("code").equals("S")) { %>
								<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    		<a href="gsks_01_03.jsp"><strong>인증키관리</strong></a></td>
					    <% } else { %>
					    		<td width="140" height="25" align="center" bgcolor="#00BFFF">
					    		<a href="gsks_01_03.jsp">
					    	   	<font color="#FFFFFF"><strong>인증키관리</strong></font>
					    		</a>
								</td>					    	   	
					    <% } %>

					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02.jsp"><strong>그룹설정</strong></a></td>
    			<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02_2.jsp"><strong>그룹설정(NEW)</strong></a></td> -->
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_03_tab_page_03.jsp"><strong>항목관리</strong></a></td>
					<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_03_tab_page_03_2.jsp"><strong>항목관리(NEW)</strong></a></td> -->

					    <% if (lData.get("code").equals("S")) { %>
							<td width="140" height="25" align="center" bgcolor="#00BFFF">
    						<a href="gsks_01_03_tab_page_04.jsp"><font color="#FFFFFF"><strong>서비스로그</strong></font></a></td>
					    <% } else { %>
					    	<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					     <a href="gsks_01_03_tab_page_04.jsp"><a href="gsks_01_03_tab_page_03.jsp"><strong>서비스로그</strong></a></td>
					    <% } %>
    					
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="100%" height="1px"></td>
			</tr>
		</table>

	 <div class="clear"><br></div>

		  <div class="openapi_special">
            <div class="box_style_4_top"></div>
								<div class="box_style_4_middle">
										<div class="openapi_special_content">
				<table width="100%" cellpadding="5" cellspacing="5" summary="인증키관리에 대한 내용입니다.">
				   <tr>
				      <td bgcolor="#FFFFFF">
			  		     <table width="100%" border=0>
						    <tr>
							   <td colspan="2" style="padding-left:10px"><b>신청정보</b></td>
							</tr>
								<tr>
									<td colspan="2" height="10"></td>
								</tr>										
								<tr bgcolor="#FFFFFF">
									<td width="180"><b>○ 사용자 구분 : </b><%=api_use_org %>사용자</td>
									<td><b>○ 담당자 : </b><%=api_use_name %></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td><b>○ E-mail : </b><%=api_email %></td>
									<td><b>○ 대표연락처 : </b><%=api_tel %></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td><b>○ 시스템명 : </b><%=api_title %></td>
									<td><b>○ 예상사용자수 : </b><%=api_esti_user_count %>명</td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td><b>○ 사용서버 URL(IP) : </b><a href="javascript:link('<%=api_server_ip.trim()%>')"><%=api_server_ip %></a></td>
									<td><b>○ 신청일자 : </b><%=create_date %></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td height="15" colspan="2"></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td colspan="2"><b>○ 사용용도 : </b></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td colspan="2" style="padding-left:20px"><%=StringUtil.toLine(api_use_reason)  %></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td height="15" colspan="2"></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<%-- <td colspan="2"><b>○ 첨부파일 :</b> <%if(api_file.equals("null")) { %>
											<%} else { %>
													<span onclick="javascript:fileDownload(apiFm,'<%=api_file%>')" style="cursor:pointer;text-decoration:underline"><%=api_file%></span>
											<%} %>	 </td> --%>
										 <td colspan="2"><b>○ 활용페이지 서비스 공개 동의 :</b>&nbsp<%=api_use_agree %></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td><b>○ 인증그룹 : </b><%=api_group_name %>그룹</td>
									<td><b>○ 인증키 : <font color="blue"><input type="text" name="apiKey" size="25" value="<%=api_auth_key%>" style="border:0" readonly/></font></b>
									
									
									</td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td><b>○ 승인여부 : </b><%=api_approve_status_name %></td>
									<td><b>○ 인증키 사용구분 : <select name="changeKey" style="width:80px;" class="img_align" onChange="changeKey();">
                     
                   
                      				  <option value="">선택</option>
				                      <option value="내부">내부</option>
				                      <option value="외부">외부</option>
				                      
				                    </select></td>
								</tr>
								
								<tr bgcolor="#FFFFFF">
									<td>
										<b>○ 반려사유 : </b>
									</td>
									<td><b>○ <%if(api_approve_status.equals("B")) {%>반려<%} else { %>승인<%} %>일자 : </b> <%=api_approve_date %></td>
								<tr bgcolor="#FFFFFF">
									<td colspan="2" style="padding-left:20px"><%=StringUtil.toLine(api_reject_desc)  %></td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td>
										<b>○ 변경사유 : </b>
									</td>
								</tr>
								<tr bgcolor="#FFFFFF">
									<td colspan="2" style="padding-left:20px"><%=StringUtil.toLine(api_modify_desc)  %></td>
								</tr>																				
				           </table>

<%
	// 서비스로그
	String pg = "1";
	String pg1 = "1";
	if(!lData.containsKey("code")) {
		pg = lData.get("pg");
	}else{
		pg1 = lData.get("pg1");
	}
%>				           
<form name="apiFm" method="post">
<input type="hidden" name="aT">
<input type="hidden" name="approve_status" value="<%=api_approve_status%>">
<input type="hidden" name="search_input" value="<%=lData.getString("search_input") %>">
<input type="hidden" name="search_sel2" value="<%=lData.getString("search_sel2") %>">
<input type="hidden" name="search_sel3" value="<%=lData.getString("search_sel3") %>">
<input type="hidden" name="sort" value="<%=lData.getString("sort") %>">
<input type="hidden" name="api_auth_key" value="<%=api_auth_key %>">
<input type="hidden" name="pg" value="<%=pg%>">
<!-- 파일다운로드 -->
<input type="hidden" name="filename" value="">
<input type="hidden" name="path" value="/know/">
<!-- 서비스로그 -->
<input type="hidden" name="toYear" value="<%=lData.getString("toYear")%>">
<input type="hidden" name="toMonth" value="<%=lData.getString("toMonth")%>">
<input type="hidden" name="toDay" value="<%=lData.getString("toDay")%>">
<input type="hidden" name="fromYear" value="<%=lData.getString("fromYear")%>">
<input type="hidden" name="fromMonth" value="<%=lData.getString("fromMonth")%>">
<input type="hidden" name="fromDay" value="<%=lData.getString("fromDay")%>">
<input type="hidden" name="search_input1" value="<%=lData.get("search_input1")%>">
<input type="hidden" name="search_sel" value="<%=lData.get("search_sel")%>">
<input type="hidden" name="sort1" value="<%=lData.get("sort1")%>">
<input type="hidden" name="pg1" value="<%=pg1%>">
<input type="hidden" name="code1" value="S">
<input type="hidden" name="api_modify_key" value="<%=api_auth_key%>">
<input type="hidden" name="random_auth_key" value="<%=api_auth_key%>">

							<table width="100%" border=0>
								<tr>
									<td colspan="2" height="20"></td>
								</tr>
								<tr>
									<td colspan="2" style="padding-left:10px"><b>서비스 사용관리(사용여부)</b></td>
								</tr>
								<tr>
									<td colspan="2" height="10"></td>
								</tr>
								<%
							
										try {
											lData.setString("PARAM", "API_APPROVE_ELEMENTS");
											lData.setString("api_version", api_version);
											rm = broker.getList(lData);
							
										} catch(Exception e) {
											System.out.print("sgisWebError : ");
											//2015-12-03 시큐어코딩
											//e.printStackTrace();
											logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
										}
							
										int listcnt=0;
										while(rm.next()) {
											String api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
											String api_element_id = String.valueOf((BigDecimal)rm.get("api_element_id"));
											String api_versions = String.valueOf((String)rm.get("api_version"));
											String api_use_yn = String.valueOf((Character)rm.get("api_use_yn"));
								%>
								<tr>
									<td width="50%"><%=listcnt+1%>. <%=api_element_name %> (<%=api_versions%>)</td>
									<td width="50%" align="left">
									<input type="checkbox" name="api_element_id" value="<%=api_element_id %>"
															<% if(api_use_yn.equals("Y")) {	%>	checked
															<%} %>>
									</td>
								</tr>
								<%listcnt++; } %>
								<tr>
									<td colspan="2" height="20"></td>
								</tr>
								<tr>
							</table>		
							
							<table width="100%" border=0>
								<tr>
									<td class="t_end">
										<input type="hidden" name="api_modify_desc" value="<%=api_modify_desc %>">
									</td>
								</tr>
								<tr>
									<td class="t_end">
										 <input type="hidden" name="refuse" value="<%=api_reject_desc %>">
									</td>
								</tr>																					
							</table>
							<table width="100%" border=0>
								<tr>
									<td>
									<%
											//신청일 경우
									if(api_approve_status.equals("S")) {%>
											<a href="javascript:void(0);"><img src="/contents/images/button_return.gif" onClick="Clicked('B');" border=0 align="absmiddle">
											<a href="javascript:confirmClicked();"><img src="/contents/images/button_approval.gif" border=0 align="absmiddle"></a>
									<%} else if(api_approve_status.equals("A")){ 	//승인한경우%>
										 <a href="javascript:void(0);"><img src="/contents/images/button_modify.gif" onClick="Clicked('M');" border=0 align="absmiddle"></a>
										<!--<a href="javascript:void(0);"><img src="/contents/images/button_return.gif" onClick="Clicked('B');" border=0 align="absmiddle"> -->
										<a href="javascript:void(0);"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" onClick="Clicked('C');" border=0 align="absmiddle"></a>
									<%} else if(api_approve_status.equals("B")){ 	//반려한경우%>
											<a href="javascript:confirmClicked();"><img src="/contents/images/button_approval.gif" border=0 align="absmiddle"></a>
									<%} %>
									<% if (lData.get("code").equals("S")) { %>
											<a href="javascript:ServiceLog();"><img src="images/button_list.gif" border=0></a>
									<% } else { %>
											<a href="javascript:apiList();"><img src="images/button_list.gif" border=0></a>
									<% } %>
									</td>
								</tr>
							</table>
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



  </div>

	</div><div class="clear"></div>

    </div>
  </div>
</div>
<div class="clear"></div>

<iframe name="downloadIfr" height="0" width=0 frameborder=0></iframe>
</body>
</html>
<%@ include file="/contents/gsks/include/footer.jsp" %>
