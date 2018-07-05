<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage01_write.jsp
    * @description : 관리자 - 공지사항 게시판 글쓰기
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

    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
<script type="text/javascript" src="/contents/scripts/calendar.js"></script>    
<script type="text/javascript" src="/contents/scripts/calendar_layer.js"></script>
<script type="text/javascript" src="/contents/scripts/prototype.js"></script>
<script type="text/javascript" src=/contents/scripts/common.js></script>
<script type="text/javascript" src="/contents/gsks/scripts/gsks_01_06_tabpage.js"></script>
<script language="javascript" type="text/javascript">
	function zoneChk() {
		if(document.getElementById("zone").checked == true) {
			document.fm.zone_yn.value="Y";
			document.getElementById("zone_area").style.display="block";
		} else {
			document.fm.zone_yn.value="N";
			document.getElementById("zone_area").style.display="none";
		}
	}

	function addTable(){
		var myTable = document.getElementById("button_table");
		var myTbody = myTable.getElementsByTagName("tbody")[0];
		var idx = 0;
		idx = (myTbody.rows.length/3)+1;


		var row = document.createElement("tr");
		var th = document.createElement("th");
		var td = document.createElement("td");
			
		var input;
		var button_point = "button_point"+idx;
		var button_url = "button_url"+idx;
		var button_alt = "button_alt"+idx;

		th.setAttribute("width",100);
		var node = document.createTextNode("버튼위치");

		input = document.createElement("<input type='text' name='button_point' id='"+button_point+"'/>");
		var node1 = document.createTextNode("(예: 0,0,290,204)");
		
		th.appendChild(node);
		td.appendChild(input);
		td.appendChild(node1);
		row.appendChild(th);
		row.appendChild(td);
		myTbody.appendChild(row);

		row = document.createElement("tr");
		th = document.createElement("th");
		td = document.createElement("td");
		th.setAttribute("width",100);
		node = document.createTextNode("버튼 Link URL");

		input = document.createElement("<input type='text' name='button_url' id='"+button_url+"' size='50' value='#'/>");
		th.appendChild(node);
		td.appendChild(input);
		row.appendChild(th);
		row.appendChild(td);
		myTbody.appendChild(row);

		row = document.createElement("tr");
		th = document.createElement("th");
		td = document.createElement("td");
		th.setAttribute("width",100);
		node = document.createTextNode("버튼 대체 텍스트");

		input = document.createElement("<input type='text' name='button_alt' id='"+button_alt+"' size='50'/>");
		th.appendChild(node);
		td.appendChild(input);
		row.appendChild(th);
		row.appendChild(td);
		myTbody.appendChild(row);
	}

	function delTable(){
		var myTable = document.getElementById("button_table");
		var myTbody = myTable.getElementsByTagName("tbody")[0];
		var row = myTbody.rows.length;
		if(row>1){
			myTbody.deleteRow(row-1);
			myTbody.deleteRow(row-2);
			myTbody.deleteRow(row-3);
		}
	}

	function addform(){
		var myTable = document.getElementById("button_table");
		var myTbody = myTable.getElementsByTagName("tbody")[0];
		var row = (myTbody.rows.length/3);
		var str = "";
		
		for(var i=0; i< row; i++){
			str += "<area shape=\"rect\" coords=\""+document.getElementsByName("button_point")[i].value+"\" href=\""+document.getElementsByName("button_url")[i].value+"\" title=\""+document.getElementsByName("button_alt")[i].value+"\" alt=\""+document.getElementsByName("button_alt")[i].value+"\"/>";
		}
		document.fm.button_info.value = str;
		saveProcess1();
	}
	function imgChange(){
		var idx = Math.random();
		document.getElementById("chkimg").src = "/imgkey.do?"+idx;
	}
</script>

<body class="yui-skin-sam">
<form name="fm" method="post" enctype="multipart/form-data">
	<input type="hidden" name="aT" value="<%=lData.get("aT")%>">
	<input type="hidden" name="button_info" />
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
				    <select name="sgis_board_name" onchange="">
<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	
	String sgis_board_id = "" ;
	String sgis_board_name_desc = "" ;
	
	try{


		broker = new GeneralBroker("adfa00");
		//-- 코드조회
		lData.setNumber("SEQ", 5);
		rm = broker.getList(lData);
		while(rm!=null && rm.next()) {
			sgis_board_id = String.valueOf((BigDecimal)rm.get("sgis_board_id"));
			sgis_board_name_desc = StringUtil.verify((String)rm.get("sgis_board_name_desc"));
%>
				      <option value="<%=sgis_board_id %>"><%=sgis_board_name_desc %></option>
<%
		}
	}catch(Exception e){
		  System.out.println("------------->"+e);
	}finally{

	}
%>
			        </select>
				  <input type="text" name="sgis_board_title" size="80" maxlength="25"/>
				</tr>
			  <tr id="popup_c">
			  	<th><center>팝업 유무</center></th>
			  	<td class="t_end">
			  		<input name="sgis_board_pop_chk" type="radio" value="Y">Yes
			  		<input name="sgis_board_pop_chk" type="radio" value="N" checked>No
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						WIDTH
						<input type="text" name="sgis_board_pop_width"  maxlength="4" size="6" onKeyUp="chkNumber(this);" />pixel  &nbsp;&nbsp;
						HEIGHT
						<input type="text" name="sgis_board_pop_height" maxlength="4" size="6" onKeyUp="chkNumber(this);" />pixel 
			  	</td>
			  </tr>				
			  <tr>
				<th><center>게시기간</center></th>
				<td class="t_end">
				  <input name="sgis_board_pop_start" type="text" size="11" align="center" maxlength="10" onblur="closechk()"  onclick="return popUpCalendar(this,sgis_board_pop_start,'yyyy-mm-dd')" />
				~
				<input name="sgis_board_pop_end" type="text" size="11" align="center" maxlength="10" onblur="closechk()" onclick="return popUpCalendar(this,sgis_board_pop_end,'yyyy-mm-dd')" /> 
				예)2008-10-30 형식으로 작성
				</td>
			  </tr>
			  <tr>
				<th><center>UI선택</center></th>
				<td class="t_end">
				  <input type="radio" name="ui_code" value="a" checked="checked" title="기존메인" />기존메인 <input type="radio" name="ui_code" value="b" title="신규메인"/>신규메인<br/>
				</td>
			  </tr>
				<tr>
					<th><label for="contents"><center>첨부파일</center></label></th>
					<td class="cell_left t_end">
					<input name="sgis_board_file_loc" type="file" size="70" class="input_mid" /><br /><br />
					<input type="checkbox" name="zone" onclick="zoneChk();" /> <font color="blue">* 알림존</font><br />
					<div id="zone_area" style="display:none;">
					<font color="red">* 알림존에 들어갈 이미지는 (290 * 204) 사이즈입니다.</font><br />
					* 이미지 : <input type="file" name="sgis_board_file_zone" size="70" class="input_mid"  /><br />
					* Link URL : <input type="text" name="sgis_board_url" size="50" value="#" /><br />
					* 대체 텍스트 : <input type="text" name="sgis_board_alt" size="50" /><br/>
					* 버튼정보 	<a href="#" onclick="addTable();">추가</a> <a href="#" onclick="delTable();">삭제</a><br/>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table1" id="button_table">
					 	<caption>버튼정보</caption>
					 	<tbody>
		            	
		            	</tbody>
					</table>
					</div>
					<input type="hidden" name="zone_yn" value="N" />
					</td>
				</tr>
				<!-- <tr>
					<th><label for="contents"><center>이미지파일</center></label></th>
					<td class="cell_left t_end">
					<input name="sgis_board_pop_img_file" type="file" size="70" class="input_mid" />
					</td> 
				</tr>-->
			  <tr>
				<th><center>내용</center></th>
				<td class="t_end">  
 					<textarea name="sgis_board_desc" id="example_editor"> </textarea>  
				</td>
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
			  <input id="sgis_img_key_chk" name="sgis_img_key_chk" type="hidden" value="admin"/>
			  </table>
		  </div>
		  <div class="site_control_write_button">
			<a href="javascript:addform();"><img src="/contents/gsks/images/button_ok.gif" alt="확인" border="0" /></a>
			<a href="/contents/gsks/gsks_01_06_tabpage01.jsp"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" alt="취소" border="0" /></a>
		  </div>
	  </div>
</div>
</form>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
