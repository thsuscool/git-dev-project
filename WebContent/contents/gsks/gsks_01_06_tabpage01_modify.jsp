<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage01_modify.jsp
    * @description : 관리자 - 공지사항 게시판 글수정
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-17   김경열         1.0
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%@ include file="/contents/include/text_editing_tools.jsp" %>

<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	StringBuffer sb = new StringBuffer(1024);
	String aT = lData.get("aT");
	String seq = lData.get("sgis_board_seq");
	int pg = lData.getInt("pg");

	String sgis_board_seq = "" ;
	String sgis_board_id = "" ;
	String sgis_board_title = "" ;
	String sgis_board_name = "" ;
	String sgis_board_desc = "" ;
	String sgis_board_cou = "" ;
	String create_date = "" ;
	String sgis_board_pop_start = "" ;
	String sgis_board_pop_end = "" ;
	String sgis_board_use= "";
	String sgis_board_pop_chk="";
	String sgis_board_file_loc ="";
	String sgis_board_file_type ="";
	String sgis_board_pop_img_file ="";
	String sgis_board_pop_width ="";
	String sgis_board_pop_height ="";
	String zone_yn="";
	String sgis_board_file_zone="";
	String sgis_board_url="";
	String sgis_board_alt="";
	String ui_code="";
	String button_info="";

	try{

		broker = new GeneralBroker("adfa00");
		//-- 게시글 조회
		lData.setNumber("SEQ", 2);
		rm = broker.getList(lData);

		while(rm!=null && rm.next()) {

			sgis_board_seq = StringUtil.verify((String)rm.get("sgis_board_seq"));
			sgis_board_id = String.valueOf((BigDecimal)rm.get("sgis_board_id"));
			sgis_board_title = StringUtil.verify((String)rm.get("sgis_board_title"));
			sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name"));
			sgis_board_desc = StringUtil.verify((String)rm.get("sgis_board_desc"));
			sgis_board_cou = StringUtil.verify((String)rm.get("sgis_board_cou"));
			create_date = StringUtil.verify((String)rm.get("create_date"));
			sgis_board_pop_start = StringUtil.verify((String)rm.get("sgis_board_pop_start"));
			sgis_board_pop_end = StringUtil.verify((String)rm.get("sgis_board_pop_end"));
			sgis_board_use = StringUtil.verify((String)rm.get("sgis_board_use"));
			sgis_board_pop_chk = StringUtil.verify((String)rm.get("sgis_board_pop_chk"));
			sgis_board_file_loc = StringUtil.verify((String)rm.get("sgis_board_file_loc"));
			sgis_board_file_type = StringUtil.verify((String)rm.get("sgis_board_file_type"));
			sgis_board_pop_img_file = StringUtil.verify((String)rm.get("sgis_board_pop_img_file"));
			sgis_board_pop_width = StringUtil.verify((String)rm.get("sgis_board_pop_width"));
			sgis_board_pop_height = StringUtil.verify((String)rm.get("sgis_board_pop_height"));
			zone_yn = StringUtil.verify((String)rm.get("zone_yn"));
			sgis_board_file_zone = StringUtil.verify((String)rm.get("sgis_board_file_zone"));
			sgis_board_url = StringUtil.verify((String)rm.get("sgis_board_url"));
			sgis_board_alt = StringUtil.verify((String)rm.get("sgis_board_alt"));
			button_info = StringUtil.verify((String)rm.get("button_info"));
			ui_code = String.valueOf((Character)rm.get("ui_code"));
			System.out.println(button_info);
			System.out.println(ui_code);
			button_info = button_info.replaceAll("&amp;","&").replaceAll("&apos;", "\'").replaceAll("&quot;","\"").replaceAll("&lt;","<").replaceAll("&gt;",">");
            button_info = button_info.replaceAll("&","&amp;");
		}
		

	}catch(Exception e){
		  System.out.println("------------->"+e);
	}finally{

	}
%>

    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
    
<script src="/contents/scripts/calendar.js"></script>
<script src=/contents/scripts/common.js></script>
<script src="/contents/gsks/scripts/gsks_01_06_tabpage.js"></script>
<script src="/contents/scripts/text_editing_tools.js"></script>
<script type="text/javascript">
	function zoneChk() {
		if(document.getElementById("zone").checked) {
			document.fm.zone_yn.value="Y";
			document.getElementById("zone_area").style.display="block";
		} else {
			document.fm.zone_yn.value="N";
			document.getElementById("zone_area").style.display="none";
		}
	}
	function button_info_set(){
		document.getElementById("button_info").value = "";
	}
	function imgChange(){
		var idx = Math.random();
		document.getElementById("chkimg").src = "/imgkey.do?"+idx;
	}
</script>
</body>
<body class="yui-skin-sam">
<form name="fm" method="post" enctype="multipart/form-data">
	<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
	<input type="hidden" name="pg"    value="<%=pg%>">
	<!-- 상세조회 -->
	<input type="hidden" name="sgis_board_seq" value="<%=seq %>" >
	<input type="hidden" name="file_loc" value="<%=sgis_board_file_loc %>">
	<input type="hidden" name="file_type" value="<%=sgis_board_file_type %>">
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
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage01.jsp"><font color="#FFFFFF"><strong>공지사항</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage02.jsp"><strong>FAQ</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_06_tabpage03.jsp"><strong>Q&A</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage04.jsp"><strong>메뉴</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage06.jsp"><strong>메인메뉴</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage05.jsp"><strong>용어설명관리</strong></a></td>
				</tr>
				<tr>
					<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
				</tr>
			</table>
		<div class="clear"></div>
	  </div>
		  <div class="site_control_write">
			  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table1" summary="사이트관리에 대한 내용입니다.">
			  <caption>사이트관리</caption>
			  <tr>
				<th width="100" class="td_top"><center>제목</center></th>
				<td class="td_top t_end">
				<label>
				    <select name="sgis_board_name">
<%
	String sgis_board_code_id = "" ;
	String sgis_board_name_desc = "" ;
	
	try{


		broker = new GeneralBroker("adfa00");
		//-- 코드조회
		lData.setNumber("SEQ", 5);
		rm = broker.getList(lData);
		while(rm!=null && rm.next()) {
			sgis_board_code_id = String.valueOf((BigDecimal)rm.get("sgis_board_id"));
			sgis_board_name_desc = StringUtil.verify((String)rm.get("sgis_board_name_desc"));
%>
				    	<option value="<%=sgis_board_code_id %>" <%=sgis_board_id.equals(sgis_board_code_id) ? "selected=selected" : "" %>><%=sgis_board_name_desc %></option>
<%
		}
	}catch(Exception e){
		  System.out.println("------------->"+e);
	}finally{

	}
%>			        
			        </select>
				  <input name="sgis_board_title" type="text" size="80" value="<%=sgis_board_title %>" maxlength="25"/>
				  </label>
				</th>
				</tr>

			  <tr>
			  	<th><center>팝업 유무</center></th>
			  	<td class="t_end">

			  		<input name="sgis_board_pop_chk" type="radio" value="Y" <%if("Y".equals(sgis_board_pop_chk)) out.println("checked"); %>>Yes
			  		<input name="sgis_board_pop_chk" type="radio" value="N" <%if("N".equals(sgis_board_pop_chk)) out.println("checked"); %>>No

						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						WIDTH
						<input type="text" name="sgis_board_pop_width"  value="<%=sgis_board_pop_width%>" maxlength="4" size="6" onKeyUp="chkNumber(this);" />
						HEIGHT
						<input type="text" name="sgis_board_pop_height" value="<%=sgis_board_pop_height%>" maxlength="4" size="6" onKeyUp="chkNumber(this);" />
			  	</td>
			  </tr>
			  <tr>
				<th><center>게시기간</center></th>
				<td class="t_end"><label>
				  <input name="sgis_board_pop_start" type="text" size="11" align="center" maxlength="10" onclick="return popUpCalendar(this,sgis_board_pop_start,'yyyy-mm-dd')" value="<%=sgis_board_pop_start %>" />
				~
				  <input name="sgis_board_pop_end" type="text" size="11" align="center" maxlength="10" onclick="return popUpCalendar(this,sgis_board_pop_end,'yyyy-mm-dd')"  value="<%=sgis_board_pop_end %>" />
				예)2008-10-30 형식으로 작성
				</label></td>
			  </tr>
			  <tr>
				<th><center>UI선택</center></th>
				<td class="t_end">
				  <input type="radio" name="ui_code" value="a" <%if(ui_code.equals("a") || ui_code.equals("") ){%>checked="checked"<%} %> title="기존메인" />기존메인 <input type="radio" name="ui_code" value="b" <%if(ui_code.equals("b")){%>checked="checked"<%} %> title="신규메인"/>신규메인<br/>
				</td>
			  </tr>			  
				<tr>
					<th><label for="contents"><center>첨부파일</center></label></th>
					<td class="cell_left t_end">
					<%=!sgis_board_file_loc.equals("")? sgis_board_file_loc+"<br>":""%>
					<input name="sgis_board_file_loc" type="file" size="70" class="input_mid" /><br /><br />
					<input type="checkbox" name="zone" onclick="zoneChk();" <%if(zone_yn.equals("Y")) {%>checked="checked"<%} %>/> <font color="blue">* 알림존</font><br />
					<div id="zone_area" <%if(!zone_yn.equals("Y")) {%>style="display:none;"<%} %>>
					<font color="red">* 알림존에 들어갈 이미지는 (290 * 204) 사이즈입니다.</font><br />
					* 이미지 : <input type="file" name="sgis_board_file_zone" size="70" class="input_mid"  /><br />
					<%if(!sgis_board_file_zone.equals("")) {%>* 등록된 이미지 : <input type="text" name="sgis_board_file_zone_name" value="<%=sgis_board_file_zone %>" size="50" readonly style="border:0; text-decoration:underline"/><br /><%} %>
					* Link URL : <input type="text" name="sgis_board_url" size="70" value="<%=sgis_board_url %>" /><br />
					* 대체 텍스트 : <input type="text" name="sgis_board_alt" size="72" value="<%=sgis_board_alt %>" />
					* 버튼정보<br />
					<textarea name="button_info" id="button_info" rows="3" cols="3"><%if(!button_info.equals("")){ %><%=button_info %><%} %></textarea>
					</div>
					<input type="hidden" name="zone_yn" value="<%=zone_yn %>" />
					</td>
				</tr>
				<!-- <tr>
					<th><label for="contents"><center>이미지파일</center></label></th>
					<td class="cell_left t_end">
						<%=!sgis_board_pop_img_file.equals("")? sgis_board_pop_img_file+"<br>":""%>
						<input name="sgis_board_pop_img_file" type="file" size="70" class="input_mid" />
					</td>
				</tr>-->
			  <tr>
					<th><center>내용</center></th>
					<td class="t_end">
					<textarea name="sgis_board_desc" id="example_editor"><%=sgis_board_desc %></textarea> 
			  </tr>
			  <!--
			  <tr>
				<th><center>자동생성방지</center></th>
				<td class="t_end">  
 					<img id="chkimg" src="/imgkey.do" style="position: relative" class="inp w70 h22"/>
				    <input type="button" value="새로고침" onclick="javascript:imgChange();"/>
				    <input id="sgis_img_key_chk" name="sgis_img_key_chk" type="text" maxlength="5" class="inp w70 h22"/> 
				</td>
			  </tr>
			  -->
			  <input id="sgis_img_key_chk" name="sgis_img_key_chk" type="hidden" value="admin" /> 
			  </table>
		  </div>
		  <div class="site_control_write_button">
		  	<a href="javascript:updateProcess1();"><img src="/contents/gsks/images/button_ok.gif" alt="확인" border="0" /></a>
		  	<a href="/contents/gsks/gsks_01_06_tabpage01.jsp"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" alt="취소" border="0" /></a>
		  </div>
	    </div>
	    </div></form>
<div class="clear"></div>
</div>
<%@ include file="/contents/gsks/include/footer.jsp" %>
