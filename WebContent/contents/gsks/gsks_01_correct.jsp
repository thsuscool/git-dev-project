<%--
/*********************************************************
* @source      : gsks_01_correct.jsp
* @description : 관리자 / 사용자 신규입력 및 수정
*********************************************************
*    DATE    |     AUTHOR      |        DESC
*--------------------------------------------------------
* 2012.04.19       Bobby                수정
*********************************************************
--%>
<%@page import="org.apache.poi.hssf.record.PageBreakRecord.Break"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ page import="java.math.BigDecimal"                  %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.pdf.basis.*"              %>

<%@ page import="sun.misc.BASE64Decoder"                %>

<%@ page import="kr.co.offton.jdf.db.DbManager" %>
<%@ page import="java.net.*, java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.security.*" %>

<%@ include file="/contents/gsks/include/header.jsp"   %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%@ include file="/contents/gsks/scripts/interest_loc.jsp" %>

<%
	String pg = lData.getString("pg");
	String aT     = lData.getString("aT");
	String memKey = lData.getString("sgis_member_key");
	
	if (!memKey.equals("")){
		/* 관리자 로그 시작
		201.05.01...Bobby */
		DbManager dbmgr01 = null;
		RecordModel targetInfoSet = null;
		StringBuffer strQuery = new StringBuffer(1024);
		
		String userID = session.getAttribute("userid").toString();
		
		try {
			dbmgr01 = new DbManager();
			strQuery = new StringBuffer(1024);
			strQuery.append(" select \n");
			strQuery.append(" sgis_member_id \n");
			strQuery.append(" ,(select sgis_auth_name from sgis_auth_id \n");
			strQuery.append(" where sgis_auth_id = sgis_member_info.sgis_auth_id) as sgis_auth_name \n");
			strQuery.append(" from sgis_member_info \n");
			strQuery.append(" where sgis_member_key = "+memKey+" \n");
			//System.out.println(strQuery);
			dbmgr01.prepareStatement(strQuery.toString());
			targetInfoSet = dbmgr01.select();
		} catch( Exception e ) {
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		} finally {
			dbmgr01.close();
		}
		
		String targetID = null;
		String targetAUTH = null;
		while(targetInfoSet != null && targetInfoSet.next()) {
			targetID = targetInfoSet.get("sgis_member_id").toString();
			//System.out.println(targetID);
			if(!targetID.equals("****")){
				targetAUTH = targetInfoSet.get("sgis_auth_name").toString();
			}else{
				targetAUTH = "GUEST";
			}
			//System.out.println(targetAUTH);
		}
		//System.out.println("targetID = "+targetID);
		//System.out.println("targetAUTH = "+targetAUTH);
		
		if("GUEST".equals(targetAUTH)){
			//System.out.println("GUEST계정 열람불가");
			%>
			<script type="text/javascript">
				alert("GUEST계정은 열람할 수 없습니다.");
				history.back();
			</script>
			<%
		}
		
		if(!"".equals(targetID) && !"".equals(targetAUTH) && !"GUEST".equals(targetAUTH)){
			dbmgr01 = null;
			targetInfoSet = null;
			strQuery = new StringBuffer(1024);
			try {
				//System.out.println("사용자 조회 로그기록");
				String strLog = targetID+" "+targetAUTH+" 정보 열람";
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
		}
		/* 관리자 로그 끝 */
	}
	
	BASE64Decoder decoder = new BASE64Decoder();

	GeneralBroker broker = null;
	RecordModel userSet  = null;
	RecordModel pwdSet   = null;
	RecordModel jobSet   = null;
	RecordModel menuSet  = null;
	RecordModel authSet  = null;

	String sgis_member_id         = "";	//아이디
	String sgis_password          = "";	//패스워드
	String sgis_new_password      = "";	//패스워드
	String sgis_name              = "";	//이름
	String sgis_auth_id           = "";	//권한
	String sgis_birthday          = "";	//생일
	String sgis_password_q_reply  = "";	//패스워드찾기 질문답변
	String sgis_password_q_id     = "";	//패스워드 질문 id
	String sgis_sex               = "";	//성별
	String sgis_email             = "";	//이메일
	String sgis_address           = "";	//상세주소
	String sgis_mobile_phone      = "";	//핸드폰
	String sgis_telephone         = "";	//집전화
	String sgis_intest_loc        = "";	//관심지역
	String sgis_job_code          = "";	//직종
	String sgis_company_name      = "";	//회사명
	String sgis_company_divi      = "";	//부서명
	String sgis_company_duty      = "";	//직책
	String sgis_use_freq          = "";	//이용빈도
	String sgis_satis_num         = "";	//만족도
	String sgis_zip_code          = "";	//우편번호
	String sgis_seq               = "";	//우편번호 seq
	String base_address           = "";	//기본주소
	String sgis_menu_d_id         = "";	//하위메뉴코드
	String sgis_menu_h_id         = "";	//상위메뉴코드
	String decoding_password      = "";

	String event   = aT.equals("INS") ? "onClick='resetID();'" : "";
	String bgcolor = aT.equals("UPD") ? "background-color:#DDDDDD;" : "";

	try {

		broker = new GeneralBroker("adaa00");

		if(aT.equals("UPD")) {
			lData.setNumber("SEQ", 6);
			lData.setString("member_key", memKey);
			userSet = broker.getList(lData);
		}

		/* 비밀번호 질문List */
		lData.setNumber("SEQ", 3);
		pwdSet = broker.getList(lData);

		/* 직업List */
		lData.setNumber("SEQ", 4);
		jobSet = broker.getList(lData);

		/* 상위메뉴List */
		lData.setNumber("SEQ", 5);
		menuSet = broker.getList(lData);

		/* 사용자 등급List*/
		lData.setNumber("SEQ", 2);
		authSet = broker.getList(lData);

		if(userSet != null && userSet.next()) {
			sgis_member_id         = StringUtil.verify((String)userSet.get("sgis_member_id"));
			sgis_password          = StringUtil.verify((String)userSet.get("sgis_password"));
			sgis_new_password      = StringUtil.verify((String)userSet.get("sgis_new_password"));
			//sgis_password = new String(decoder.decodeBuffer(sgis_password));
			sgis_zip_code          = StringUtil.verify((String)userSet.get("sgis_zip_code"));
			sgis_seq               = StringUtil.verify(((BigDecimal)userSet.get("sgis_seq")).toString());
			base_address           = StringUtil.verify((String)userSet.get("base_address"));			
			sgis_name              = StringUtil.verify((String)userSet.get("sgis_name"));
			sgis_auth_id           = StringUtil.verify((String)userSet.get("sgis_auth_id"));
			sgis_birthday          = StringUtil.verify((String)userSet.get("sgis_birthday"));
			sgis_password_q_reply  = StringUtil.verify((String)userSet.get("sgis_password_q_reply"));
			sgis_password_q_id     = StringUtil.verify(((BigDecimal)userSet.get("sgis_password_q_id")).toString());
			sgis_sex               = StringUtil.verify(((Character)userSet.get("sgis_sex")).toString());
			sgis_email             = StringUtil.verify((String)userSet.get("sgis_email"));
			sgis_address           = StringUtil.verify((String)userSet.get("sgis_address"));
			//sgis_mobile_phone      = StringUtil.verify((String)userSet.get("sgis_mobile_phone"));
			sgis_telephone         = StringUtil.verify((String)userSet.get("sgis_telephone"));
			//sgis_intest_loc        = StringUtil.verify((String)userSet.get("sgis_intest_loc"));
			sgis_job_code          = StringUtil.verify(((Character)userSet.get("sgis_job_code")).toString());
			//sgis_company_name      = StringUtil.verify((String)userSet.get("sgis_company_name"));
			//sgis_company_divi      = StringUtil.verify((String)userSet.get("sgis_company_divi"));
			//sgis_company_duty      = StringUtil.verify((String)userSet.get("sgis_company_duty"));
			sgis_use_freq          = StringUtil.verify((String)userSet.get("sgis_use_freq"));
			sgis_satis_num         = StringUtil.verify((String)userSet.get("sgis_satis_num"));

			try{
				sgis_menu_d_id = StringUtil.verify(((BigDecimal)userSet.get("sgis_menu_d_id")).toString());
				sgis_menu_h_id = StringUtil.verify(((BigDecimal)userSet.get("sgis_menu_h_id")).toString());
			}catch (Exception e) {
				sgis_menu_d_id = "";
				sgis_menu_h_id = "";
				System.out.println("[gsks_01_correct.jsp] *** member_information get exception info***\n"+e);
			}

			if(sgis_birthday.indexOf("-") == -1 && !StringUtil.isEmpty(sgis_birthday))	sgis_birthday = StringUtil.split(sgis_birthday, "422", "-");
		}

	}catch(Exception e) {
		System.out.println("***Main Page exception info***\n"+e);
	}finally {
	}

	String sgis_email_id = "";
	if(sgis_email.indexOf("@") != -1)	sgis_email_id = sgis_email.substring(0,sgis_email.indexOf("@")) ;

	String sgis_email_add = "";
	if(sgis_email.indexOf("@") != -1)	sgis_email_add = sgis_email.substring(sgis_email.indexOf("@")+1) ;

	String etc_email_add = "Y";
%>
<!-- 관심지역  -->
<script type="text/javascript" src="/contents/search/stringutil.js" charset=UTF-8></script>
<script type="text/javascript" src="/contents/search/scriptLib.js" charset=UTF-8></script>
<script type="text/javascript" src="/contents/search/ajaxUtil.js" charset=UTF-8></script>
<script type="text/javascript" src="/contents/search/jslb_ajax.js" charset=UTF-8></script>
<script type="text/javascript">
	function list(pg){
		var fm = document.joinFm;

		fm.pg.value = pg;
		fm.action = 'gsks_01.jsp';
		fm.target = '_self';
		fm.submit();
	}

	window.onload = function () {
		setParam(['key:<%=sgis_menu_h_id %>', 'sgis_menu_d_id:<%=sgis_menu_d_id %>']);
		writeDiv(['d_menu']);
	}

	function changedMenu(param) {
		setParam(['key:'+param, 'sgis_menu_d_id: ']);
		writeDiv(['d_menu']);
	}

	function onLoadAjax() {
	}

	function writeEmail(){
		if(document.joinFm.email2.options.value == "etc"){
			document.joinFm.emailetc.style.display = "block";
		}else if(document.joinFm.email2.options.value != "etc"){
			document.joinFm.emailetc.value = "";
			document.joinFm.emailetc.style.display = "none";
		}
	}

	/**
	* @desc  회원정보수정 확인
	*/
	function confirmUserInfo() {
		var fm = document.joinFm;
		/**
		if(fm.sgis_auth_id.value != '01'){  관리자가 아닌경우만 확인

		if(!mycheck(fm.userpassword.value)){
		alert(fm.userpassword.value);
		alert("비밀번호는 6~12자의 영문과 숫자 조합으로만 사용할 수 있습니다.");
		fm.userpassword.focus();
		fm.userpassword.value = '';
		fm.re_userpassword.value = '';
		return;
		}
		}
		**/

		if(fm.userid.value.trim() == "") {
			alert("아이디를 입력하세요.");
			return;
		} else 	if(fm.userid.value.length < 6) {
			alert("아이디는 6자리이상 12자리이하입니다.");
			return;
		} else if(!inputCheckSpecial(fm.userid.value)) {
			alert("특수문자는 입력 할 수 없습니다..");
			return;
		} else 	if(fm.isIDChk.value == "N" && fm.aT.value == 'INS') {
			alert("아이디 중복확인을 하세요.");
			return;
		} else  if(fm.username.value == '') {
			alert("이름을 입력하세요.");
			return;
		} else 	if(fm.sgis_auth_id.value == "") {
			alert("회원권한을 선택하세요.");
			return;
		
		
		/* 
		} else if(fm.userpassword.value.trim() == "") {
			alert("비밀번호를 입력하세요.");
			return;
		} else 	if(fm.userpassword.value.length < 6) {
			alert("비밀번호는 6자리이상 12자리이하입니다.");
			return;
		*/
		
		//보안관계상 비밀번호 폐쇄 20140730
		/*
		} else 	if(fm.userpassword.value != fm.re_userpassword.value) {
			alert("입력하신 비밀번호가 다릅니다. 비밀번호를 확인하세요.");
			return;
		*/
		
		} else 	if(fm.question.value.trim() == "") {
			alert("비밀번호 찾기시 사용할 질문을 입력하세요.");
			return;
		} else 	if(fm.answer.value.trim() == "") {
			alert("질문에 대한 답을 입력하세요.");
			return;
		} else 	if(fm.birthday.value.trim() == "") {
			alert("생년월일을 입력하세요.");
			return;
		} else 	if(fm.sex.value.trim() == "") {
			alert("성별을 선택하세요.");
			return;
		} else 	if(fm.email.value.trim() == "") {
			alert("이메일을 입력하세요.");
			return;
		} else 	if(fm.email2.value.trim() == "") {
			alert("이메일을 입력하세요.");
			return;
		} else 	if(fm.zip1.value.trim() == "" || fm.zip2.value.trim() == "") {
			alert("주소를 입력하세요.");
			return;
		} else 	if(fm.address2.value.trim() == "") {
			alert("상세주소를 입력하세요.");
			return;
		} else 	if(fm.telephone1.value.trim() == "" || fm.telephone2.value.trim() == "" || fm.telephone3.value.trim() == "") {
			alert("전화번호를 입력하세요.");
			return;
		} else 	if(fm.telephone1.value.length < 2 || fm.telephone2.value.length < 3 || fm.telephone3.value.length < 3) {
			alert("전화번호를 정확히 입력하세요.");
			return;
		} else 	if(!Number(fm.telephone1.value)  || !Number(fm.telephone2.value) || !Number(fm.telephone3.value)) {
			alert("전화번호를 숫자로 입력하세요.");
			return;	
		} else 	if(fm.job_code.value == "") {
			alert("직업을 선택하세요.");
			return;
		} else {
			var mail;
			if(fm.email2.value == "etc"){
				mail = fm.email.value + "@" + fm.emailetc.value;
			}else{
				mail = fm.email.value + "@" + fm.email2.value;
			}

			if (!mail.isEmail()){ 
				alert("이메일 형식에 맞지 않습니다. 이메일을 다시 확인하세요.");
				fm.email.focus();
				return;
			}

			

			if (!isDate(fm.birthday.value) || !is_valid_date(fm.birthday.value) ) {
				alert("입력한 날짜 형식(YYYY-MM-DD)에 안맞습니다.");
				fm.birthday.focus();
				return;
			}	

			

			var c = confirm("저장하시겠습니까?");
			if(c == 1) {
				fm.action = "gsks_01_process.jsp";
				fm.target = "_self";
				fm.submit();
			}
		}
	}

	//비밀번호 영문 & 숫자 조합으로만 사용 했는지 확인
	function mycheck(p) {
		chk1 = /^[a-z\d]{6,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
		chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
		chk3 = /\d/;  //적어도 한개의 0-9 확인

		return chk1.test(p) && chk2.test(p) && chk3.test(p);
	}

	//특수문자처리
	function inputCheckSpecial(strobj) {
		re = /[~!@\#$%^&*\()\-=+_']/gi;

		if(re.test(strobj)){
			return false;
		}
		return true;
	}

	//아이디 입력시 중복확인 N
	function resetID() {
		document.joinFm.isIDChk.value='N';
	}

	// ID중복체크 팝업
	function overLap(){
		var fm = document.joinFm;

		window.open("", "overLap", "width=369, height=172");
		fm.target="overLap";
		fm.action="/contents/member/member_overlap.jsp";
		fm.submit();				
	}

	
</script>

<form name="joinFm" method="post" style="margin:0px;">
<input type="hidden" name="pg" value="<%=pg %>"/>
<input type="hidden" name="aT" value="<%=aT %>"/>
<input type="hidden" name="sgis_member_key" value="<%=memKey %>"/>
<input type="hidden" name="isIDChk" value="N">					<!-- 아이디중복체크여부 -->
<input type="hidden" name="census_download" value="N">	<!-- census (default : N) -->
<input type="hidden" name="virtual_key" value=""> <!-- virtual key -->
<input type="hidden" name="mem_cond" value="<%=lData.get("mem_cond")%>"> <!-- 검색어 -->
<input type="hidden" name="list_search_input" value="<%=lData.get("list_search_input")%>"> <!-- 검색어 -->
<input type="hidden" name="sort" value="<%=lData.get("sort")%>">
<input type="hidden" name="mem_status" value="<%=lData.get("mem_status")%>">
<input type="hidden" name="mem_grade" value="<%=lData.get("mem_grade")%>">

<!------------------------left끝---------------------------->      
<div class="admin_content">

	<!-- 메뉴Include -->
	<%@ include file="/contents/gsks/include/gsks_menu_AM.jsp" %>

	<div class="clear"></div>

	<div class="content_title_1"> 
		<div class="content_title_2">사용자 관리</div>
		<ul class="navigation">
			<li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
			<li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">사용자관리</a></li>
		</ul>
	</div>
	
	<div class="content_admin">    
		<div class="agreement_form">
			<div class="agreement_form_tip"><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" /> 필수입력항목입니다.</div>
			<table width="734" border="0" cellspacing="0" cellpadding="0" class="table1" summary="마이페이지 개인정보입니다.">
				<caption>마이페이지 개인정보</caption>
				<tr>
					<th width="110" class="td_top"><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 아이디</th>
					<td class="td_top t_end">
						<label>
						<input name="userid" id="userid" tabindex="1" value="<%=sgis_member_id %>" title="아이디" type="text" size="20" style="<%=bgcolor %>" <%=event %> <%=aT.equals("UPD") ? "readonly" : "" %>/>
						</label>
						<%
							if(aT.equals("INS")) {
						%>
						<a href="javascript:;" onclick="javascript:overLap()" onfocus="this.blur()"><img src="/contents/member/images/button_overlap.gif" tabindex="2" alt="중복확인" border="0" /></a>
						<%} %>
					</td>
				</tr>
				
				<!-- 
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 비밀번호</th>
					<td class="t_end"><input name="userpassword" id="userpassword" value="<%//=sgis_password %>" title="비밀번호" type="password" size="20"  tabindex="3"/></td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 비밀번호 확인</th>
					<td class="t_end"><input name="re_userpassword" id="re_userpassword" value="<%//=sgis_password %>" title="비밀번호 확인" type="password" size="20"  tabindex="4"/></td>
				</tr>
				 -->
				
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 비밀번호 찾기</th>
					<td class="t_end"><span class="b_b">질문</span>
						<select name="question" id="question"  title="비밀번호찾기 질문" style="width:200" tabindex="5">
							<option value="">= 선택 =</option>
							<%
								while(pwdSet != null && pwdSet.next()) {
									String password_q_id   = StringUtil.verify(((BigDecimal)pwdSet.get("sgis_password_q_id")).toString());
									String password_q_name = StringUtil.verify((String)pwdSet.get("sgis_password_q_name"));
							%>
							<option value="<%=password_q_id %>" <%=password_q_id.equals(sgis_password_q_id) ? "selected" : "" %>><%=password_q_name %></option>
							<% }//end of while %>
						</select>
						<span class="b_b">답</span>
						<input name="answer" id="answer" value="<%=sgis_password_q_reply %>"  title="비밀번호찾기 답" type="text" size="20"  tabindex="6"/>
					</td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 이름</th>
					<td class="t_end"><span class="bla_b"><input name="username" id="username" value="<%=sgis_name %>"  title="이름" tabindex="7" type="text" size="20" maxlength="20"  value="" <%=aT.equals("UPD") ? "readonly" : "" %> style="<%=bgcolor %>" /></span></td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 회원권한</th>
					<td class="t_end"><span class="bla_b">
						<select name="sgis_auth_id" id="sgis_auth_id" tabindex="8">
							<option value="">= 선택 =</option>
							<%
								while(authSet != null && authSet.next()) {
									String auth_id   = StringUtil.verify((String)authSet.get("sgis_auth_id"));
									String auth_name = StringUtil.verify((String)authSet.get("sgis_auth_name"));
							%>
							<option value="<%=auth_id %>" <%=sgis_auth_id.equals(auth_id) ? "selected" : "" %>><%=auth_name %></option>
							<%} %>
						</select>
					</td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 생년월일</th>
					<td class="t_end">
						<%
							if(aT.equals("UPD")) {
						%>
						<input name="birthday" id="birthday" value="<%=sgis_birthday %>"  title="생년월일" type="text" size="10" align="center" maxlength="10" tabindex="11"/>
						<%}else if(aT.equals("INS")) { %>
						<input name="birthday" id="birthday" value=""  title="생년월일" type="text" size="9" align="center" maxlength="10" tabindex="11"/ > 
						<%} %>
						<a onclick="popUpCalendar(this,birthday,'yyyy-mm-dd');" onfocus="this.blur()"><img src="/contents/member/images/bullet_calender.gif" alt="생년월일 검색" border="0" align="absmiddle" tabindex="10"></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ex) 2008-08-01
					</td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 성별</th>
					<td class="t_end">
						<label>
						<select name="sex" id="sex"  title="성별" style="width:75px" tabindex="12">
							<option value="">= 선택 =</option>
							<option value="M" <%="M".equals(sgis_sex) ? "selected" : "" %>>남성</option>
							<option value="F" <%="F".equals(sgis_sex) ? "selected" : "" %>>여성</option>
						</select>
						</label>
					</td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 이메일</th>
					<td class="t_end">
						<table class="table_no">
							<tr>
								<td><input name="email" type="text" size="40" value="<%=sgis_email_id %>" style="ime-mode:disabled;width:110px" tabindex="13"/></td>
								<td>@</td>
								<td>
									<select name="email2" style="width:110px" onchange="javascript:writeEmail();" tabindex="14">
										<option value="naver.com"    <%if("naver.com".equals(sgis_email_add)){    etc_email_add="N"; %>selected<%}else{%> <% } %>>naver.com</option>
										<option value="freechal.com" <%if("freechal.com".equals(sgis_email_add)){ etc_email_add="N"; %>selected<%}else{%> <% } %>>freechal.com</option>
										<option value="dreamwiz.com" <%if("dreamwiz.com".equals(sgis_email_add)){ etc_email_add="N"; %>selected<%}else{%> <% } %>>dreamwiz.com</option>
										<option value="korea.com"    <%if("korea.com".equals(sgis_email_add)){    etc_email_add="N"; %>selected<%}else{%> <% } %>>korea.com</option>
										<option value="nate.com"     <%if("nate.com".equals(sgis_email_add)){     etc_email_add="N"; %>selected<%}else{%> <% } %>>nate.com</option>
										<option value="lycos.co.kr"  <%if("lycos.co.kr".equals(sgis_email_add)){  etc_email_add="N"; %>selected<%}else{%> <% } %>>lycos.co.kr</option>
										<option value="yahoo.co.kr"  <%if("yahoo.co.kr".equals(sgis_email_add)){  etc_email_add="N"; %>selected<%}else{%> <% } %>>yahoo.co.kr</option>
										<option value="netian.com"   <%if("netian.com".equals(sgis_email_add)){   etc_email_add="N"; %>selected<%}else{%> <% } %>>netian.com</option>
										<option value="empal.com"    <%if("empal.com".equals(sgis_email_add)){    etc_email_add="N"; %>selected<%}else{%> <% } %>>empal.com</option>
										<option value="paran.com"    <%if("paran.com".equals(sgis_email_add)){    etc_email_add="N"; %>selected<%}else{%> <% } %>>paran.com</option>
										<option value="hotmail.com"  <%if("hotmail.com".equals(sgis_email_add)){  etc_email_add="N"; %>selected<%}else{%> <% } %>>hotmail.com</option>
										<option value="hanafos.com"  <%if("hanafos.com".equals(sgis_email_add)){  etc_email_add="N"; %>selected<%}else{%> <% } %>>hanafos.com</option>
										<option value="hanmail.net"  <%if("hanmail.net".equals(sgis_email_add)){  etc_email_add="N"; %>selected<%}else{%> <% } %>>hanmail.net</option>
										<option value="etc" <%="Y".equals(etc_email_add) ? "selected" : "" %>>직접입력</option>
									</select>
								</td>
								<td><input type="text" name="emailetc" maxlength=60 style="width:104px;display:<%="Y".equals(etc_email_add) ? "block" : "none" %>;" value="<%=sgis_email_add %>" tabindex="15"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 주소</th>
					<td class="t_end">
						<input type="hidden" name="zip_seq" id="zip_seq" value="<%=sgis_seq %>"/>
						<input name="zip1" id="zip1" value="<%=sgis_zip_code.split("-").length == 2 ? sgis_zip_code.split("-")[0] : "" %>"  title="우편번호" type="text" size="4" readOnly />
						-<input name="zip2" id="zip2" value="<%=sgis_zip_code.split("-").length == 2 ? sgis_zip_code.split("-")[1] : "" %>"  title="우편번호" type="text" size="4" readOnly/>
						<a href="javascript:;" onclick="MM_openBrWindow('/contents/member/member_post.jsp','','width=369,height=318')" onfocus="this.blur()">
						<img src="/contents/member/images/button_zone_number.gif" alt="우편번호 검색" border="0" align="absmiddle" tabindex="16"/></a>
						<br />
						<input name="address1" id="address1" value="<%=base_address %>"  title="주소" type="text" size="60" readOnly/>
						<br />
						<input name="address2" id="address2" value="<%=sgis_address %>"  title="주소" type="text" size="60" tabindex="17"/>
					</td>
				</tr>
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle"/> 전화번호</th>
					<td class="t_end">
						<%
							int telephone1_cnt=0; 
							String telephone1 = sgis_telephone.split("-").length == 3 ? sgis_telephone.split("-")[0] : "";
						%>
						<select name="telephone1" style="width:80px" tabindex="17">
							<option value="010" <%if(telephone1.equals("010")) { telephone1_cnt++;%>selected<%} %>>010</option>
							<option value="011" <%if(telephone1.equals("011")) { telephone1_cnt++;%>selected<%} %>>011</option>
							<option value="016" <%if(telephone1.equals("016")) { telephone1_cnt++;%>selected<%} %>>016</option>
							<option value="018" <%if(telephone1.equals("018")) { telephone1_cnt++;%>selected<%} %>>018</option>
							<option value="019" <%if(telephone1.equals("019")) { telephone1_cnt++;%>selected<%} %>>019</option>
							<option value="02"  <%if(telephone1.equals("02")) { telephone1_cnt++;%>selected<%} %>>02</option>
							<option value="031" <%if(telephone1.equals("031")) { telephone1_cnt++;%>selected<%} %>>031</option>
							<option value="032" <%if(telephone1.equals("032")) { telephone1_cnt++;%>selected<%} %>>032</option>
							<option value="041" <%if(telephone1.equals("041")) { telephone1_cnt++;%>selected<%} %>>041</option>
							<option value="042" <%if(telephone1.equals("042")) { telephone1_cnt++;%>selected<%} %>>042</option>
							<option value="043" <%if(telephone1.equals("043")) { telephone1_cnt++;%>selected<%} %>>043</option>
							<option value="051" <%if(telephone1.equals("051")) { telephone1_cnt++;%>selected<%} %>>051</option>
							<option value="052" <%if(telephone1.equals("052")) { telephone1_cnt++;%>selected<%} %>>052</option>
							<option value="053" <%if(telephone1.equals("053")) { telephone1_cnt++;%>selected<%} %>>053</option>
							<option value="054" <%if(telephone1.equals("054")) { telephone1_cnt++;%>selected<%} %>>054</option>
							<option value="055" <%if(telephone1.equals("055")) { telephone1_cnt++;%>selected<%} %>>055</option>
							<option value="061" <%if(telephone1.equals("061")) { telephone1_cnt++;%>selected<%} %>>061</option>
							<option value="062" <%if(telephone1.equals("026")) { telephone1_cnt++;%>selected<%} %>>062</option>
							<option value="063" <%if(telephone1.equals("063")) { telephone1_cnt++;%>selected<%} %>>063</option>
							<option value="064" <%if(telephone1.equals("064")) { telephone1_cnt++;%>selected<%} %>>064</option>
							<option value="" <%if(telephone1_cnt == 0) {%>selected<%} %>>= 선택 =</option>	
						</select>
						-<input name="telephone2" id="telephone2" value="<%=sgis_telephone.split("-").length == 3 ? sgis_telephone.split("-")[1] : "" %>" type="text" size="4" title="전화번호" maxlength="4" tabindex="18"/>
						-<input name="telephone3" id="telephone3" value="<%=sgis_telephone.split("-").length == 3 ? sgis_telephone.split("-")[2] : "" %>" type="text" size="4" title="전화번호" maxlength="4" tabindex="19"/>
					</td>
				</tr>
				
				
				<tr>
					<th><img src="/contents/member/images/icon_sign.gif" alt="필수입력항목" align="absmiddle" /> 직업분류</th>
					<td class="t_end">
						<select name="job_code" id="job_code"  title="직업분류" tabindex="26">
							<option value="">= 선택 =</option>
							<%
								while(jobSet != null && jobSet.next()) {
									String job_code = ((Character)jobSet.get("sgis_job_code")).toString();
									String sgis_job_name = StringUtil.verify((String)jobSet.get("sgis_job_name"));
							%>
							<option value="<%=job_code %>" <%=job_code.equals(sgis_job_code) ? "selected":"" %>><%=sgis_job_name %></option>
							<% } %>
						</select>
					</td>
				</tr>
				
				<% if(aT.equals("UPD")) { %>
				<tr>
					<th>이용빈도</th>
					<td class="t_end">
						<input type="radio" name="use_freq" value="1" <%="1".equals(sgis_use_freq) ? "checked" : "" %> tabindex="30">거의매일 &nbsp;&nbsp;
						<input type="radio" name="use_freq" value="2" <%="2".equals(sgis_use_freq) ? "checked" : "" %>>한달에 10회이상 &nbsp;&nbsp;
						<input type="radio" name="use_freq" value="3" <%="3".equals(sgis_use_freq) ? "checked" : "" %>>한달에 5~10회 &nbsp;&nbsp;
						<input type="radio" name="use_freq" value="4" <%="4".equals(sgis_use_freq) ? "checked" : "" %>>한달에 1~5회 &nbsp;&nbsp;
						<input type="radio" name="use_freq" value="5" <%="5".equals(sgis_use_freq) ? "checked" : "" %>>가끔
					</td>
				</tr>
				<%} %>
				<tr>
					<th>이용부문</th><!-- ajax 사용 select 박스로 변경 -->
					<td class="t_end">
						<table border="0" cellspacing="0" cellpadding="0" class="table_no">
							<tr>
								<td>상위메뉴</td>
								<td>
									<select name="menu_high_id" onchange="changedMenu(this[this.selectedIndex].value)" tabindex="31">
										<option value="">= 선택 =</option>
										<%
											while(menuSet != null && menuSet.next()) {
												String menu_h_id   = StringUtil.verify(((BigDecimal)menuSet.get("sgis_menu_h_id")).toString());
												String menu_h_name = StringUtil.verify((String)menuSet.get("sgis_menu_h_name"));
										%>
										<option value="<%=menu_h_id %>" <%=menu_h_id.equals(sgis_menu_h_id) ? "selected" : "" %>><%=menu_h_name %></option>
										<%} %>
									</select>
								</td>
								<td>하위메뉴</td>
								<td><div id="d_menu" type="field" data="/contents/mypage/myPage_04_d_menu.jsp" tabindex="32"></div></td>
							</tr>
						</table>
					</td>
				</tr>
				<% if(aT.equals("UPD")) { %>
				<tr>
					<th>만족도</th>
					<td class="t_end">
						<input type="radio" name="satis_num" value="1" <%="1".equals(sgis_satis_num) ? "checked" : "" %> tabindex="33">매우만족 
						<input type="radio" name="satis_num" value="2" <%="2".equals(sgis_satis_num) ? "checked" : "" %>>만족 
						<input type="radio" name="satis_num" value="3" <%="3".equals(sgis_satis_num) ? "checked" : "" %>>보통 
						<input type="radio" name="satis_num" value="4" <%="4".equals(sgis_satis_num) ? "checked" : "" %>>불만족 
						<input type="radio" name="satis_num" value="5" <%="5".equals(sgis_satis_num) ? "checked" : "" %>>매우불만족&nbsp;&nbsp;
					</td>
				</tr>
				<%} %>
			</table>
		</div>

		<div class="center top_mar_20">
			<a href="javascript:confirmUserInfo();" onfocus="this.blur()"><img src="images/admin_01_03_tab_page_01_button_02.gif" tabindex="34" alt="확인" border="0"></a>
			<a href="javascript:document.joinFm.reset();" onfocus="this.blur()"><img src="images/admin_01_03_tab_page_01_button_03.gif" tabindex="35" alt="취소" border="0"></a>
			<a href="javascript:list('<%=pg %>');" onfocus="this.blur()"><img src="images/admin_01_03_tab_page_01_button_04.gif" tabindex="36" alt="목록" border="0"></a>	
		</div>

		<div id="popup_calendar">
			<div class="popup_calendar_button">
				<a href="#"><img src="/contents/member/images/popup_calendar_move.gif" alt="이동" border="0" /></a>
				<a href="javascript:;" onclick="calender_view('off')" onkeypress="calender_view('off')"><img src="/contents/member/images/popup_calendar_close.gif" alt="닫기" border="0" /></a>
			</div>

			<div class="popup_calendar_wrapper">
				<div class="popup_calendar_content">
					<div class="popup_calendar_top">
						<ul>
							<li class="arrow1"><img src="/contents/member/images/bullet_arrow01.gif" alt="이전달" /></li>
							<li class="month">11월</li>
							<li class="year">2008년</li>
							<li class="year_icon">
								<a href="#"><img src="/contents/member/images/bullet_arrow03.gif" alt="작년" border="0" /></a>
								<a href="#"><img src="/contents/member/images/bullet_arrow04.gif" alt="내년" border="0" /></a>
							</li>
							<li class="arrow2"><img src="/contents/member/images/bullet_arrow02.gif" alt="다음달" /></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</form>

<%@ include file="/contents/gsks/include/footer.jsp" %>
