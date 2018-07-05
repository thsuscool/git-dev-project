<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>



<script type="text/javascript" language="javascript" src="/contents/scripts/main/jquery-1.5.1.min.js"></script>

<%

	String sgis_census_req_y_s_d = lData.getString("sgis_census_req_y_s_d");
	String sgis_census_req_y_e_d = lData.getString("sgis_census_req_y_e_d");
	
	//if(StringUtil.isEmpty(sgis_census_req_y_s_d)) sgis_census_req_y_s_d = StringUtil.split(sc_toDay,"422","-"); //오늘
	if(StringUtil.isEmpty(sgis_census_req_y_s_d)) {
		sgis_census_req_y_s_d = StringUtil.split((String.valueOf(DateTime.calDay(-30))),"422","-");
		
		lData.setString("sgis_census_req_y_s_d", sgis_census_req_y_s_d); //결재관리 메뉴 클릭시 조회기간 설정하려면 이걸 사용하고 전체를 다 보려면 주석처리
	}
	if(StringUtil.isEmpty(sgis_census_req_y_e_d)) {
		sgis_census_req_y_e_d = StringUtil.split((String.valueOf(DateTime.calDay(0))),"422","-");	//7일뒤
		lData.setString("sgis_census_req_y_e_d", sgis_census_req_y_e_d); //결재관리 메뉴 클릭시 조회기간 설정하려면 이걸 사용하고 전체를 다 보려면 주석처리
	}


		GeneralBroker broker = null;
		RecordModel rm = null;
		RecordModel rm1 = null;

		/* paging 초기화  */
		int pg = 1;
		int pgSize = 15;
		int blockSize = 10;
		int totPage   = 1;
		int totCount  = 0;

		if(lData.containsKey("pg"))        pg = lData.getInt("pg");

		try {

			broker = new GeneralBroker("ceaa00");

			/**************************************/
			/* 조회 */
			/**************************************/
			lData.setString("PARAM", "CENSUS_APPLY_GROUP_LIST_GYULJE");
			rm = broker.getList(lData);
			totCount = rm.getRowCount();	//리스트 전체 수

			rm = broker.getList(lData, pg, pgSize);

		} catch(Exception e) {
			out.print(e);
		}

		/*  block 처리 */
		totPage  = totCount / pgSize;
		if (totCount%pgSize > 0) totPage++;

		int totalBlock = totPage/blockSize;
		if(totPage%blockSize > 0) totalBlock++;
		int block = pg/blockSize;
		if(pg % blockSize > 0) block++; //현재블럭표시

		int firstPage = (block-1)*blockSize + 1;
		int lastPage = block*blockSize;

		if(totalBlock <= block) {
			lastPage = totPage;
		}
%>
<script language="javascript">
	function list(pg){
		document.censusFm.pg.value = pg;
		document.censusFm.submit();
	}

	function onLoadAjax(id) {}

	function searchClicked() {
			document.censusFm.submit();
	}
	
	function search_list() {
		document.censusFm.submit();
	}
	


function detailView(id) {
	var fm=document.censusFm;
	fm.sgis_census_req_id.value = id;
	fm.action="gsks_01_04_06_detail.jsp";
	fm.submit();
}


//대상자료 선택 (사용하지 않음)
function locationChanged() {}



function calendar_check(param1,param2,param3){
 
	var paramLen = param2.length;

	if(paramLen == undefined){
		Calendar(param2,param3);
	}else{ 
	 
	 	Calendar(param1,param3);
	}
}

function allCheck(){
	var len = document.getElementsByName("cbox").length;
	if(document.getElementById("sgis_all").checked == true){
		for(var i=0; i<len; i++){
			document.getElementsByName("cbox")[i].checked = true;
		}	
	}else{
		for(var i=0; i<len; i++){
			document.getElementsByName("cbox")[i].checked = false;
		}
	}
}

//결재
function approval() {
	//alert('approval');
	var checked_id = "";
	var i_comma = 0;
	jQuery("input:checkbox[name='cbox']").each(function(){
		//this.checked=true;
		if (this.checked){
			//alert(this.value);
			if ( i_comma == 0 ) {
				checked_id =  this.value ;
			} else {
				checked_id = checked_id + ", " + this.value;
			}
			
			i_comma++;
		}
	});
	
	//alert(checked_id);
	
	if ( checked_id == "") {
		alert("결제하실 내역을 체크해주세요.");
		return false;
	}
	
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_06_gyulje.jsp",
		data:{"checked_id":checked_id   },
		success:function(data){
			//alert('gsks_reload_data() ====== ajax success===');
			alert('결재를 완료하였습니다.');
			document.location.reload();
		},
		error:function(data) {
			
		}
	});
	  
    
}

//결재취소
function approval_cancel() {
	//alert('approval');
	var checked_id = "";
	var i_comma = 0;
	jQuery("input:checkbox[name='cbox']").each(function(){
		//this.checked=true;
		if (this.checked){
			//alert(this.value);
			if ( i_comma == 0 ) {
				checked_id =  this.value ;
			} else {
				checked_id = checked_id + ", " + this.value;
			}
			
			i_comma++;
		}
	});
	
	//alert(checked_id);
	
	if ( checked_id == "") {
		alert("결제취소하실 내역을 체크해주세요.");
		return false;
	}
	
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_04_06_gyulje_cancel.jsp",
		data:{"checked_id":checked_id   },
		success:function(data){
			//alert('gsks_reload_data() ====== ajax success===');
			alert('결재취소를 완료하였습니다.');
			document.location.reload();
		},
		error:function(data) {
			
		}
	});
	  
    
}


</script>
	<!-- 	//2015-12-03 시큐어코딩 -->
  	<form name="censusFm" method="POST">
		<input type="hidden" name="aT">
		<input type="hidden" name="sgis_census_req_id">
     	<input type="hidden" name="pg" value="<%=pg %>">

  <div class="admin_content">
  
    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

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
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04.jsp"><strong>요청관리</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_01.jsp"><strong>자료제공</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_04_02.jsp"><strong>자료및안내</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_03.jsp"><strong>자료목록관리</strong></a></td>
    				<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_05.jsp"><strong>자료제공관리</strong></a></td>
    				<td width="140" height="25" align="center" bgcolor="#00BFFF">
					    <a href="gsks_01_04_06.jsp"><font color="#FFFFFF"><strong>결재관리</strong></font></a></td>
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
			</tr>
		</table>
</div>

<br />

<div class="admin_tab_search">
		&nbsp;&nbsp;조회기간 :&nbsp; 
		<input type="text" name="sgis_census_req_y_s_d" value="<%=sgis_census_req_y_s_d %>" style="width:80px; text-align:center; cursor:pointer"  
        	onClick="calendar_check(document.censusFm.sgis_census_req_y_s_d,this,event);" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_s_d,this,event );" onfocus="this.blur()" readOnly />
		
		&nbsp; ~ &nbsp;
		
		<input type="text" name="sgis_census_req_y_e_d" value="<%=sgis_census_req_y_e_d %>" style="width:80px; text-align:center; cursor:pointer"  
			onClick="calendar_check(document.censusFm.sgis_census_req_y_e_d,this,event);" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_e_d,this,event );" onfocus="this.blur()" readOnly />
		
		
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;구분 : &nbsp;
		
		<select name="sgis_census_gyulje" id="sgis_census_gyulje">
		    <option value=""  <%if(lData.getString("sgis_census_gyulje").equals("")) {%>selected<%} %>>전체</option>
			<option value="X" <%if(lData.getString("sgis_census_gyulje").equals("X")) {%>selected<%} %>>미처리내역</option>
			<option value="A" <%if(lData.getString("sgis_census_gyulje").equals("A")) {%>selected<%} %>>처리내역</option>
		</select>
		&nbsp;&nbsp;&nbsp;
		<a href="#" target="_blank" onclick="javascript:search_list(); return false;">
           	<img src="images/button_inquiry.gif" alt="조회"  title="조회"  align="middle" border="0"/>
        </a>&nbsp;
		<a href="#" target="_blank" onclick="javascript:approval(); return false;">
           	<img src="images/button_approval.gif" alt="결재"  title="결재"  align="middle" border="0"/>
        </a>&nbsp;
		<a href="#" target="_blank" onclick="javascript:approval_cancel(); return false;">
           	<img src="images/button_approval_cancel.gif" alt="결재취소"  title="결재취소"   align="middle" border="0"/>
		</a>
		
	<div class="clear"></div>
</div>

<br />

<table width="100%" border=0 cellpadding="0" cellspacing="0" class="table1" summary="인증키관리에 대한 내용입니다." >
  <thead>

      <tr>
        <th class="td_top" width="50"><input type="checkbox" id="sgis_all" name="sgis_all" onclick="allCheck()" />전체</th>
        <th class="td_top" width="130">신청자(ID)</th>
        <th class="td_top" width="100">신청일자</th>
        <th class="td_top" width="120">진행상태</th>
        <th class="td_top" width="80">상세보기</th>
        <th class="t_end td_top" width="90">미처리</th>
      </tr>
    </thead>

    <tbody>
      <%
      		int rowcnt=0;
      		while(rm != null && rm.next()) {
      			String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
      			String sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
      			String sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
      			String create_date = StringUtil.verify((String)rm.get("create_date"));
      			String sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
      			String sgis_census_req_status_name = "";
      			if (sgis_census_req_status.equals("S")) {
      				sgis_census_req_status_name = "신청";
      			}else if (sgis_census_req_status.equals("A")){
      				sgis_census_req_status_name = "승인";
      			}else if (sgis_census_req_status.equals("B")){
      				sgis_census_req_status_name = "반려";	
      			}
      			String sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
      			String gyulje = StringUtil.verify((String)rm.get("sgis_census_req_gyulje"));
      %>
      <tr>
        <td class="cell_center"><input type="checkbox" id="a<%=rowcnt %>" name="cbox" value='<%=sgis_census_req_id%>' /></td>
        <td class="cell_left"><%=sgis_name %>(<%=sgis_member_id %>)</td>
        <td class="cell_center"><%=create_date %></td>
        <td class="cell_center"><%=sgis_census_req_status_name %><%if(!sgis_census_req_status.equals("S")) { %>(<%=sgis_census_req_app_date%>)<%} %></td>
        <td class="cell_center"><a href="javascript:detailView('<%=sgis_census_req_id %>');">[상세]</a></td>
        <td class="cell_center">
        	<%
				if("A".equals(gyulje)) { //결재한것은 A, 미결재는 ""
					out.println("처리");
				} else {
					out.println("미처리");
				}
			%>
		</td>
      </tr>
      <% rowcnt++; } %>
  	</tbody>

  </table>
<br>
<!-- page 처리 -->
<%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->
 </div>
		<div class="clear"><br></div>
		
<!-- 
		<div class="clear" align="center">
			<table border=0>
				<tr>
					<td>
					

			          <select name="search_sel2" class="search_sel" style="width:50px">
			            <option value="">전체</option>
			            <option value="S" <%if(lData.getString("search_sel2").equals("S")) {%>selected<%} %>>신청</option>
			            <option value="A" <%if(lData.getString("search_sel2").equals("A")) {%>selected<%} %>>승인</option>
			            <option value="B" <%if(lData.getString("search_sel2").equals("B")) {%>selected<%} %>>반려</option>
			          </select>
			
			        </td>
			        <td>
			          <b>신청자(ID)</b>&nbsp;<input name="search_input" type="text" id="list_search_input" style="width:65px" value="<%=lData.getString("search_input")%>"/>
			          <div id='detailMenuDiv' type='table' data='/contents/shortcut/shortcut_05_03_02.jsp' foRow='1' style=" overflow-y:hidden;"></div>
								</td>
								<td>
			          <input name="image" onclick="searchClicked();" type='image' src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
			        </td>
		        </tr>
		    </table>
     	</div>
 -->

   	</div>
</div>

<div class="clear"></div>
</form>

<SCRIPT language=javascript src="/contents/scripts/prototype.js"></SCRIPT><!-- 이걸 임포트해야 달력이 뜬다. -->
<SCRIPT language=javascript src="/contents/scripts/calendar_layer.js"></SCRIPT>

<%@ include file="/contents/gsks/include/footer.jsp" %>