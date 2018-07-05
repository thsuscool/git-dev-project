<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="sun.misc.BASE64Encoder" %>
<%@ page import="sun.misc.BASE64Decoder" %>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%

	DbManager dmg = null;
	RecordModel rm = null;

	BASE64Encoder encoder = new BASE64Encoder();
	BASE64Decoder decoder = new BASE64Decoder();
	
	String old_id = (String)session.getAttribute("sc_userid");

	if(lData.getString("aT").equals("UPD")){
		try {
			dmg = new DbManager();
			
	        String sgis_userid = (String)lData.getString("sgis_userid");
			String old_sgis_pass = (String)lData.getString("old_sgis_pass");
			String new_sgis_pass = (String)lData.getString("new_sgis_pass");
			
			//String old_incoding_pass=(encoder.encodeBuffer(old_sgis_pass.getBytes())).trim();
			//String new_incoding_pass=(encoder.encodeBuffer(new_sgis_pass.getBytes())).trim();
			
			String sql = "select sgis_member_key ";
				   sql += "     ,sgis_member_id ";
				   sql += "     ,AESDecrypt(sgis_password,'sgis') as sgis_password ";
				   sql += "     ,sgis_name ";
				   sql += " from sgis_member_info ";
				   sql += "where sgis_member_key = " + sc_userkey;
				   sql += "  and sgis_password = AESEncrypt('" + old_sgis_pass+"','sgis')";
						
				   
				   dmg.prepareStatement(sql);
				   rm = dmg.select();
				   
				  
				   if (rm.getRowCount() == 0 && lData.getString("aT").equals("UPD")) {
						out.print("<script>alert('현 비밀번호를 확인하세요.'); </script>");
				   }
				   if(rm != null && rm.next()) {
						
						if(lData.getString("aT").equals("UPD")) {
							String usql  = " update sgis_member_info set "; 
							       usql += "        sgis_member_id = '"+sgis_userid+"', ";
							       usql += "        sgis_password = AESEncrypt('"+new_sgis_pass+"','sgis') ";
								   usql += " where sgis_member_key = " +sc_userkey;
						    dmg.prepareStatement(usql);
							dmg.execute();
	
						}
						session.setAttribute("sc_userid",sgis_userid);
						old_id = sgis_userid;
						out.print("<script>alert('수정되었습니다.'); </script>");
					}
					
	
		} catch(Exception e) {
			System.out.print("sgisWebError : ");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		} finally {
			dmg.close();
		}
	}
%>


<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<link href="/contents/gsks/style/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<script type="text/javascript">
<!--
	//비밀번호 영문 & 숫자 조합으로만 사용 했는지 확인
	function mycheck(p) {
	    chk1 = /^[a-z\d]{6,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
	    chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
	    chk3 = /\d/;  //적어도 한개의 0-9 확인
	    return chk1.test(p) && chk2.test(p) && chk3.test(p);
	}
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
	
	// 20111013 이준근
	// 패스워드 숫자, 영문, 특수키 혼합하여 9 ~ 20자리 사용 여부 확인 
	function passwd_check(p){
		var reg =/^.*(?=.{9,20})(?=.*\D)(?=.*[a-zA-Z])(?=.*[!@#$% *^&(){}]).*$/;
		return reg.test(p);
	}
	
	function confirmUserInfo() {
		var fm = document.joinFm;
		if(fm.old_sgis_pass.value.trim() == ""){
			alert("현 비밀번호입력은 필수입니다.");
			fm.old_sgis_pass.focus();
			return;
		} else if(fm.sgis_userid.value.trim() == "") {
			alert("새 아이디를 입력하세요.");
			fm.sgis_userid.focus();
			return;
		} else if(fm.sgis_userid.value.length < 6) {
			alert("새 아이디는 6자리이상 12자리이하입니다.");
			fm.sgis_userid.focus();
			return;
		} else if(!inputCheckSpecial(fm.sgis_userid.value)) {
			alert("특수문자는 입력 할 수 없습니다..");
			fm.sgis_userid.focus();
			return;
		} else if(fm.isIDChk.value == "N") {
			alert("새 아이디 중복확인을 하세요.");
			fm.sgis_userid.focus();
			return;
		} else if(fm.new_sgis_pass.value.trim() == "") {
			alert("새 비밀번호를 입력하세요.");
			fm.new_sgis_pass.focus();
			return;
		} else	if(!passwd_check(fm.new_sgis_pass.value)){
        	alert("비밀번호는  9~20자리의 숫자와 영문자, 특수문자 등을 혼합하여 설정하셔야 합니다.");
        	fm.new_sgis_pass.value='';
        	fm.re_adminpassword.value='';
        	fm.new_sgis_pass.focus();
            return;
		} else if(fm.new_sgis_pass.value != fm.re_adminpassword.value) {
			alert("입력하신 새 비밀번호가 다릅니다. 새 비밀번호를 확인하세요.");
			fm.new_sgis_pass.value='';
        	fm.re_adminpassword.value='';
			fm.new_sgis_pass.focus();
			return;
		}
//Start///////////////////////////2012:02:06///////////////////////////////////////////////////  :Swan
		else if(fm.old_sgis_pass.value.trim() == fm.new_sgis_pass.value.trim()) {
			alert("기존비밀번호와 새 비밀번호를  다르게 설정 하여야 됩니다.");
			fm.new_sgis_pass.focus();
			return;
		}
//End///////////////////////////2012:02:06:Swan////////////////////////////////////////////////////

		var c = confirm("저장하시겠습니까?");
		if(c == 1) {
		fm.action = "gsks_info_modify.jsp";
		fm.target = "_self";
		fm.aT.value="UPD";
		fm.submit();
		}
		
	}
//-->
</script>

  <div class="admin_content">
  
    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>


  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">관리자 정보변경</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">관리자 정보변경</a></li>
      </ul>
    </div>
  <div class="content_admin">
	  <form name="joinFm" method="post">
	  <input type="hidden" name="isIDChk" value="Y"/>	<!-- 아이디중복체크여부 -->
	  <input type="hidden" name="aT">
	  	<table width="100%" class="table1">
			<tr bgcolor="#FFFFFF">
				<th class="td_top" align="left" width="150px">현 ID </th>
				<td class="td_top td_end"><%=old_id %></td>
			</tr>
			<tr bgcolor="#FFFFFF">
				<th align="left">현 비밀번호<span class="orange" title="필수항목">*</span> </th>
				<td class="td_end"><input type="password" id="old_sgis_pass" name="old_sgis_pass" maxlength="12" value="" class="inp w150" ></input></td>
			</tr>
	  	 	<tr bgcolor="#FFFFFF">
				<td height="15" colspan="2" class="td_end"></td>
			</tr>
			<tr bgcolor="#FFFFFF">
				<th align="left" >새 ID </th>
				<td class="td_end">
					<input type="text" id="sgis_userid" name="sgis_userid" value="<%=old_id %>" class="inp w150 bg_g" readonly="readonly"></input>
					<a href="/contents/member/member_overlap.jsp" target="_blank" onclick="javascript:overLap(); return false;">
                       <img src="/contents/member/images/button_overlap.gif" alt="중복확인"  title="새창열림" />
                    </a>
				</td>
			</tr>
			<tr bgcolor="#FFFFFF">
				<th align="left">새 비밀번호 </th>
				<td class="td_end"><input type="password" id="new_sgis_pass" name="new_sgis_pass" value="" maxlength="12" class="inp w150" ><span style="color:#e85f5f">9~20자리의 숫자와  영문자, 특수문자 등을 혼합하여  설정</span></input></td>
			</tr>
			<tr bgcolor="#FFFFFF">
				<th align="left">새 비밀번호 확인</th>
				<td class="td_end"><input type="password" id="re_adminpassword" name="re_adminpassword" value="" maxlength="12" class="inp w150" ></input></td>
			</tr>
	  	</table>
	  	<p class="cb tc pt10">
	  		<a href="#" onclick="javascript:confirmUserInfo();" ><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_02.gif" alt="저장"/></a>
	  	</p>
	  </form>
  </div>
  </div>


<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>