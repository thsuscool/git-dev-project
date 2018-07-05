<%--
	/*********************************************************
	* @source      : gsks_01.jsp
	* @description : 관리자 / 사용자관리
	*********************************************************
	*    DATE    |     AUTHOR      |        DESC
	*--------------------------------------------------------
	* 2012.04.26       Bobby                수정
	* 2012.07.19       Bobby                수정
	*********************************************************
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="java.math.BigDecimal"%>
<%@ page import="kr.co.offton.jdf.db.RecordModel"%>
<%@ page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	GeneralBroker broker = null;
	RecordModel userSet  = null;
	RecordModel authSet  = null;

	String list_search_input  = lData.get("list_search_input");	//검색어
	String sort               = lData.get("sort");			    //정렬기준
	String mem_status         = lData.get("mem_status");		//회원 상태별
	String mem_grade          = lData.get("mem_grade");			//회원 등급별
	String mem_cond           = lData.get("mem_cond");
	String mem_term           = lData.get("mem_term");
	String srcStatus          = lData.get("srcStatus");
	if(srcStatus.equals("")){
		srcStatus = "N";
	}

	/* paging 초기화  */
	int pg        = lData.getInt("pg");;
	int pgSize    = 10;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;

	if(pg==0) pg = 1;

	try {
		broker = new GeneralBroker("adaa00");

		lData.setNumber("SEQ", 1);
		userSet = broker.getList(lData);

		totCount = userSet.getRowCount();							//totalList
		userSet  = broker.getList(lData, pg, pgSize);	//pageList

		lData.setNumber("SEQ", 2);
		authSet = broker.getList(lData);
		
		
		// 관리자 로그 시작
		// 2012.07.19...Bobby
		String userID = session.getAttribute("userid").toString();
		
		DbManager dbmgr01 = null;
		RecordModel targetInfoSet = null;
		StringBuffer strQuery = new StringBuffer(1024);
		
		dbmgr01 = null;
		targetInfoSet = null;
		strQuery = new StringBuffer(1024);
		try {
			String strLog = "";
			String srcLog = "";
			if(srcStatus.equals("N")){
				strLog = "사용자 전체리스트 조회";
			}else if(srcStatus.equals("Y")){
				if(!mem_term.equals("")){
					srcLog = srcLog+" 기간("+mem_term+"개월 이전접속) ";
				}
				if(!mem_grade.equals("")){
					String memAuthName = "";
					if(mem_grade.equals("01")){
						memAuthName = "관리자";
					}else if(mem_grade.equals("02")){
						memAuthName = "일반사용자";
					}else if(mem_grade.equals("03")){
						memAuthName = "GUEST";
					}
					srcLog = srcLog+" 등급("+memAuthName+") ";
				}
				if(!mem_status.equals("")){
					String memStatusName = "";
					if(mem_status.equals("Y")){
						memStatusName = "사용";
					}else if(mem_status.equals("S")){
						memStatusName = "정지";
					}else if(mem_status.equals("N")){
						memStatusName = "탈퇴";
					}
					srcLog = srcLog+" 상태("+memStatusName+") ";
				}
				if(!mem_cond.equals("")){
					srcLog = srcLog+" 검색조건("+mem_cond+") ";
				}
				if(!list_search_input.equals("")){
					srcLog = srcLog+" 검색어("+list_search_input+") ";
				}
				strLog = "사용자 리스트 검색 : "+srcLog;
			}
			dbmgr01 = new DbManager();
			strQuery = new StringBuffer(1024);
			strQuery.append(" insert into sgis_admin_log values ('"+userID+"','"+strLog+"',SYSDATE) \n");
			//System.out.println(strQuery);
			dbmgr01.prepareStatement(strQuery.toString());
			dbmgr01.execute();
		} catch( Exception e ) {
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		} finally {
			dbmgr01.close();
		}
		// 관리자 로그 끝
	}catch(Exception e) {
		System.out.print("*** gsks_01.jsp Exception info ***\n"+e);
	}finally {
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
<script type="text/javascript">
	function list(pg){
		var fm = document.listForm;

		fm.pg.value = pg;
		fm.srcStatus.value = 'Y';
		fm.action = 'gsks_01.jsp';
		fm.target = '_self';
		fm.submit();
	}

	function updateUser(memKey,pg) {
		var fm = document.listForm;

		fm.pg.value = pg;
		fm.sgis_member_key.value = memKey;
		fm.aT.value = 'UPD';
		fm.action = 'gsks_01_correct.jsp';
		fm.target = '_self';
		fm.submit();
	}
	
	// 사용자신규등록 
	function insertUser() {
		var fm = document.listForm;

		fm.aT.value = 'INS';
		fm.action = 'gsks_01_correct.jsp';
		fm.target = '_self';
		fm.submit();
	}

	function updateUserStat() {
		var fm        = document.listForm;
		var chk       = document.getElementsByName('chk');
		var isChecked = false;

		for(var i=0; i<chk.length; i++) {
			if(chk[i].checked)	isChecked = true;
		}

		if(!isChecked) {
			alert('선택된 항목이 없습니다.');
			return;
		}else {
			if(!confirm('선택한 항목을 수정하시겠습니까?'))	return false;

			fm.aT.value = 'STAT';
			fm.action   = './gsks_01_process.jsp';
			fm.target   = '_self';
			fm.submit();
		}
	}

	function selectedRowCheck(key) {
		var chk = document.getElementsByName('chk');

		for(var i=0; i<chk.length; i++) {
			if(chk[i].value == key)	chk[i].checked = true;
		}
	}

	function checkedAll(isCheck) {
		var chk = document.getElementsByName('chk');

		for(var i=0; i<chk.length; i++) {
			chk[i].checked = isCheck;
		}
	}

	function excelDownload() {
		var fm = document.listForm;

		fm.action = 'gsks_01_excel.jsp';
		fm.target = 'excelFrame';
		fm.submit();
	}

	function sendEmail(){
		var fm        = document.listForm;
		var chk       = document.getElementsByName('chk');
		var isChecked = false;
		var members = '';

		for(var i=0; i<chk.length; i++) {
			if(chk[i].checked)	 {
				isChecked = true;
				members += ',' + chk[i].value ;
			}
		}

		if(!isChecked) {
			alert('선택된 대상자가 없습니다.');
			return;
		}

		MM_openBrWindow('/contents/gsks/gsks_01_send_mail.jsp?members='+members,'','width=369,height=318');
	}

	//성명 검색어 입력후 엔터키 입력시 자동조회
	function passEnter(){
		if ( event.keyCode == 13 ) list(1);
	}
	
	// 사용자별 로그인 정보 삭제
	function fn_sessionOut(userkey){
		//alert(userid);
		if(userkey == "all"){
			
		if(!confirm('접속상태 데이터를 일괄적으로 정리합니다.')) return;
		}else{
			if(!confirm('접속을 끊으시겠습니까?')) return;
		}
		document.location.href = "gsks_session_out.jsp?userkey="+userkey;
		
		
	/* 	var fm = document.listForm;

		fm.sgis_member_key.value = userkey;
		fm.action = 'gsks_session_out.jsp';
		fm.target = '_self';
		fm.submit(); */
	}
	
	// 계정정지 해지신청자 목록 팝업. 2012.03.30...Bobby
	function fn_popReuse(){
		MM_openBrWindow('/contents/gsks/reuse_list.jsp','','width=700,height=600,scroll=yes');
	}
</script>

<form name="listForm" method="post" action="gsks_01.jsp" onsubmit="return list(1);">
<input type="hidden" name="pg"/>
<input type="hidden" name="aT"/>
<input type="hidden" name="sgis_member_key"/>
<input type="hidden" name="srcStatus" value="<%=srcStatus%>"/>
<div class="admin_content">
	<!-- 메뉴Include -->
	<%@ include file="/contents/gsks/include/gsks_menu_AM.jsp" %>

	<div class="clear"></div>

	<div class="content_title_1">
		<div class="content_title_2">사용자 관리</div>
		<ul class="navigation">
			<li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
			<li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">관리자 관리</a> > <a href="#">사용자관리</a></li>
		</ul>
	</div>

	<div class="content_admin">
		<div class="list_wrap">
			<div class="left left_mar_10">
				<!-- 
				※ 등급 <img src="/contents/gsks/images/admin_icon_administraotor.gif" alt="관리자" align="absmiddle" /> 
				관리자 <img src="/contents/gsks/images/admin_icon_user.gif" alt="일반회원" align="absmiddle" /> 
				일반회원 <img src="/contents/gsks/images/admin_icon_etc.gif" alt="기타회원" align="absmiddle"  /> 기타회원 
				-->
			</div>

			<div class="right right_mar_5"><b>가입자 수 <%=totCount %>명</b></div>
			<div class="clear"></div>

			<table width="100%" cellpadding="0" cellspacing="0" class="table1" summary="사용자게시판" >
				<caption>사용자게시판</caption>
				<thead>
					<tr>
						<th class="td_top"><input type="checkbox" name="mainChk" onclick="checkedAll(this.checked)"></th>
						<th class="td_top">NO</th>
						<th class="td_top">성명</th>
						<th class="td_top">ID</th>
						<th class="td_top">등급</th>
						<th class="td_top">가입일자</th>
						<th class="td_top">수정일자</th>
						<th class="td_top">지식등록/<br>관심지식 수</th>
						<th class="td_top">회원상태</th>
						<th class="t_end td_top">접속상태</th>
					</tr>
				</thead>
				<tbody>
					<%
						if(totCount > 0) {
							String sgis_member_key  = "";
							String sgis_name        = "";
							String sgis_member_id   = "";
							String sgis_auth_id     = "";
							String sgis_auth_name   = "";
							String sgis_use_che     = "";
							String create_date      = "";
							String last_update_date = "";
							String know_cnt         = "";
							String interest_cnt     = "";
							String log_status = "";

							int rowNum = totCount - ((pg - 1) * pgSize);
							while(userSet != null && userSet.next()) {
								sgis_member_key  = StringUtil.verify((String)userSet.get("sgis_member_key"));
								sgis_name        = StringUtil.verify((String)userSet.get("sgis_name"));
								sgis_member_id   = StringUtil.verify((String)userSet.get("sgis_member_id"));
								sgis_auth_id     = StringUtil.verify((String)userSet.get("sgis_auth_id"));
								sgis_auth_name   = StringUtil.verify((String)userSet.get("sgis_auth_name"));
								sgis_use_che     = StringUtil.verify(((Character)userSet.get("sgis_use_che")).toString());
								create_date      = StringUtil.verify((String)userSet.get("create_date"));
								last_update_date = StringUtil.verify((String)userSet.get("last_update_date"));
								know_cnt         = StringUtil.verify((String)userSet.get("know_cnt"));
								interest_cnt     = StringUtil.verify((String)userSet.get("interest_cnt"));
								log_status       = StringUtil.verify((String)userSet.get("log_status"));
					%>
					<tr>
						<td class="cell_center"><input type="checkbox" name="chk" id="chk" value="<%=sgis_member_key %>"/></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=rowNum %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=sgis_name %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=sgis_member_id %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=sgis_auth_name %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=create_date %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=last_update_date %></td>
						<td class="cell_center" onclick="javascript:updateUser('<%=sgis_member_key %>','<%=pg %>')" style="cursor:pointer"><%=know_cnt %>&nbsp;/&nbsp;<%=interest_cnt %></td>
						<td class="cell_center">
							<input type="radio" name="sgis_use_che_<%=sgis_member_key %>" onclick="selectedRowCheck('<%=sgis_member_key %>')" value="Y" <%="Y".equals(sgis_use_che) ? "checked" : "" %>/>사용
							<input type="radio" name="sgis_use_che_<%=sgis_member_key %>" onclick="selectedRowCheck('<%=sgis_member_key %>')" value="S" <%="S".equals(sgis_use_che) ? "checked" : "" %>/>정지
							<input type="radio" name="sgis_use_che_<%=sgis_member_key %>" onclick="selectedRowCheck('<%=sgis_member_key %>')" value="N" <%="N".equals(sgis_use_che) ? "checked" : "" %>/>탈퇴
						</td>
						<td class="t_end cell_center">
							<% if(log_status.equals("Y")){ %>
								<a href="#" onclick="javascript:fn_sessionOut('<%=sgis_member_key%>');">[접속중]</a>
							<% }else{ %>
								[미접속]
							<% } %>
						</td>
					</tr>
					<%
								rowNum--;
							}//end of while
						}else{
					%>
					<tr>
						<td class="cell_center" colspan="10">데이터가 존재하지 않습니다.</td>
					</tr>
					<%
						}	
					%>
				</tbody>
			</table>

			<div class="list_btn_right">
				<a href="#" onclick="javascript:fn_popReuse();"><img src="/contents/gsks/images/btn_reuse_list.gif" alt="계정정지 해지신청자 목록" width="135" height="22" border="0"></a>
				<a href="#" onclick="javascript:fn_sessionOut('all');"><img src="/contents/gsks/images/admin_button_sessionOutAll.gif" alt="접속상태 일괄정리" width="100" height="22" border="0"></a>
				<a href="javascript:;" onclick="excelDownload();"><img src="/contents/gsks/images/admin_button_download_excel.gif" alt="엑셀다운로드" width="100" height="22" border="0"></a>
				<a href="javascript:;" onclick="sendEmail()" onkeypress="MM_openBrWindow('/contents/gsks/gsks_01_send_mail.jsp','','width=369,height=318')"><img src="/contents/gsks/images/admin_button_mail.gif" alt="메일발송" width="100" height="22" border="0"></a>
				<!-- 보안관계상 사용자 신규등록 잠정 폐쇄 20140730 -->
				<!-- <a href="javascript:insertUser()"><img src="/contents/gsks/images/admin_button_user_new.gif" alt="사용자 신규등록" width="100" height="22" border="0"></a> -->
				<a href="javascript:updateUserStat()"><img src="/contents/member/images/button_ok.gif" alt="확인" height="22" border="0"></a>
			</div>

			<div class="clear"></div>

			<!-- page 처리 start -->
			</br>
			<center>
			<%@ include file="/contents/include/pagelist.jsp" %>
			</center>
			<!-- page 처리 end -->

			<div align="center" >
				<div class="list_search">
					<b>정렬</b>
					<input type="radio" name="sort" value="1" <%=sort.equals("1") ? "checked" : "" %>>성명
					<input type="radio" name="sort" value="2" <%=sort.equals("2") ? "checked" : "" %>>가입일자
					</br>
					<b>검색</b>
					<select name="mem_term">
						<option value="" <%=mem_term.equals("") ? "selected" : "" %>>기간</option>
						<%
							String num = ""; 
							for(int i=0; i<13; i++) {
								if(i>0){
									i = i+2;
								}
								
								if(i>0){
									num = i+"";
						%>
						<option value="<%=num%>" <%=mem_term.equals(num) ? "selected" : "" %>><%=i %>개월 이전 접속</option>
						<%
								}
							} 
						%>
					</select>
					<select name="mem_grade">
					<option value="">등급</option>
						<%
							while(authSet != null && authSet.next()) {
								String auth_id   = StringUtil.verify((String)authSet.get("sgis_auth_id"));
								String auth_name = StringUtil.verify((String)authSet.get("sgis_auth_name"));
						%>
						<option value="<%=auth_id %>" <%=auth_id.equals(mem_grade) ? "selected" : "" %>><%=auth_name %></option>
						<%
							} 
						%>
					</select>
					<select class="search_sel" name="mem_status">
						<option value="">상태</option>
						<option value="Y" <%=mem_status.equals("Y") ? "selected" : "" %>>사용</option>
						<option value="S" <%=mem_status.equals("S") ? "selected" : "" %>>정지</option>
						<option value="N" <%=mem_status.equals("N") ? "selected" : "" %>>탈퇴</option>
					</select>
					<select class="search_sel" name="mem_cond">
						<option value="">전체</option>
						<option value="성명" <%=mem_cond.equals("성명") ? "selected" : "" %>>성명</option>
						<option value="ID" <%=mem_cond.equals("ID") ? "selected" : "" %>>ID</option>
					</select>
					<input name="list_search_input" type="text" id="list_search_input" value="<%=list_search_input%>" onkeydown="javascrit:passEnter()"/>
					<!-- <input name="image" onclick="javascript:list(1)" type='image' id="search" src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" /> -->
					<input name="image" type='image' id="search" src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
				</div>
			</div>

			<div class="clear"></div>

			<iframe name="excelFrame" src="" frameborder=0 width=0 height=0></iframe>
		</div>
	</div>
	<div class="clear"></div>
</div>
</form>
<!-- end admin_middle(include) -->
<%@ include file="/contents/gsks/include/footer.jsp" %>