<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@page import="kostat.sop.ServiceAPI.common.security.SecureDB"%>
<%@page import="java.sql.Timestamp"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<head>


<style type='text/css'>

.table1 {margin:5px 0px 0px 0px; padding:0px; border-collapse:collapse;}
.table1 caption{display: none;}
.table1 th{color:#33698f; background-color:#e3f0f9; border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px; font-size:12px;}
.table1 td{font-weight:normal;text-align:justify;  border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px;}
.table1 .t_end{ border-right:none; }
.table1 .td_top{ border-top:2px solid #72aacf;}
.table1 .td_bottom{ border-bottom:none;}
.table1 .cell_left {text-align:left;}
.table1 .cell_right{text-align:right;}
.table1 .cell_center{text-align:center;}
.table1 .cell_point {background:#f3faff;}
.table1 a:link{font-weight:normal;}
.table1 a:active{font-weight:normal;}
.table1 a:visited{font-weight:normal;}
.table1 a:hover{font-weight:normal;}

</style>
</head>
<%=request.getRemoteAddr()%>
<%
	//String what_year = lData.getString("what_year");
//=================================== IP체크부분(외부에서 접근불가하도록) ==========================================
 if ( 
	
		"125.128.71.121".equals(request.getRemoteAddr()) ||
	    "125.128.71.121".equals(request.getRemoteAddr()) 
	    // || true //로컬테스트시 주석제거
	    
   ) {
			
	
	 DbManager resultDbmgr           = null;
	 RecordModel rm    = null;
	 StringBuffer sql = new StringBuffer(2048);
	 try {
			//접속 30분 여부 체크
			resultDbmgr = new DbManager();	
			sql = new StringBuffer(1024);
			
			/*******************************/
			/*SOP 회원정보 */
			/*******************************/
			
			sql.append( "Select                                 \n " );
			sql.append( "	member_id,                          \n " );
			sql.append( "	pw,                                 \n " );
			sql.append( "	member_nm,                          \n " );
			sql.append( "	birth_code birth,                              \n " ); //2016에서 스키마 변경됨.
			sql.append( "	gender,							   	\n " );
			sql.append( "	cp_no,                              \n " );
			sql.append( "	email,                              \n " );
			sql.append( "	member_grade,                       \n " );
			sql.append( "	pw_last_mod_dt,                     \n " );
			sql.append( "	pw_fail_cnt,					   	\n " );
			sql.append( "	member_key,                         \n " );
			sql.append( "	last_access_ip,                     \n " );
			sql.append( "	last_access_dt,                     \n " );
			sql.append( "	last_logout_dt,                     \n " );
			sql.append( "	reg_ts,                             \n " );
			sql.append( "	mod_ts,                             \n " );
			sql.append( "	srv_agreement_agree_yn,             \n " );
			sql.append( "	psn_info_agreement_agree_yn person_info_agreement_agree_yn,     \n " ); //2016 스키마 변경됨.
			sql.append( "	other_people_provd_agree_yn other_people_supply_agree_yn,       \n " ); //2016 스키마 변경됨.
			sql.append( "	auth_div						   	\n " );
			//sql.append( "	nvl(login_limit_yn,'N') login_limit_yn,                     \n " );
			//sql.append( "	nvl(parent_member_id,'N') parent_member_id,                   \n " );
			//sql.append( "	nvl(fourteen_less_than_yn,'N') fourteen_less_than_yn,              \n " );
			//sql.append( "	nvl(parent_agree_yn,'N') parent_agree_yn                     \n " );
			sql.append( "from srv_dt_memberinfo               \n " );
			
			resultDbmgr.prepareStatement(sql.toString());
			rm = resultDbmgr.select();
			resultDbmgr.execute();
		} catch( Exception e ) {
			e.printStackTrace();
		} finally {
			resultDbmgr.close();
		}
		
		

	

	//GeneralBroker broker = null;
	//RecordModel rm = null;	
	
%>

<br />
<a href="#"><img src="images/admin_button_download_excel.gif" onClick="jo_excel_down();" alt="엑셀다운로드"  title="엑셀다운로드"  height="20px" align="middle" border="0" /></a>
<br />

<!-- <div style="clear:both; position:relative; overflow:auto; width:1024px; height:768px; padding:7px; "> -->

<table width="100%" border=0 cellpadding="0" cellspacing="0" class="table1"  >
  <thead>

      <tr>
        <th class="td_top w40" >번호</th>
        <th class="td_top w80" >아이디</th>
        
        <th class="td_top w80" >이름</th>
        <th class="td_top w80" >생년월일</th>
        <th class="td_top w80" >성별</th>
        <th class="td_top w80" >전화번호</th>
        <th class="td_top w80" >이메일</th>
        <th class="td_top w80" >회원등급</th>
        <th class="td_top w80" >비번최종수정일</th>
        <th class="td_top w80" >비번실패횟수</th>
        
        
        
        <!-- <th class="td_top w80" >비밀번호</th> -->
        <th class="td_top w80" >멤버키</th>
        
        <th class="td_top w80" >회원약관동의</th>
        <th class="td_top w80" >개인정보동의</th>
        <th class="td_top w80" >제3자동의</th>
        <th class="td_top w80" >auth_div</th>
        <th class="td_top w80" >부모아이디</th>
        <th class="td_top w80" >14세미만여부</th>
        <th class="td_top w80" >부모동의여부</th>
        
        
        <th class="td_top w80" >최종접속IP</th>
		<th class="td_top w80" >최종접속일</th>
		<th class="td_top w80" >최종로그아웃날짜</th>
		<th class="td_top w80" >reg_ts</th>
		<th class="td_top w80" >mod_ts</th>
		<th class="t_end td_top w80"  >로그인제한여부</th>
        
      </tr>
    </thead>

    <tbody>
<%
	try {
		int cnt=0;
		//broker = new GeneralBroker("ceaa00");
		//lData.setString("PARAM", "SOP_MEMBER");
		//rm = broker.getList(lData);

		/*
		sql.append(" select member_id, pw, member_nm, birth, gender, cp_no, email                         \n");
		sql.append(" , member_grade, pw_last_mod_dt, pw_fail_cnt, member_key, srv_agreement_agree_yn      \n");
		sql.append(" , person_info_agreement_agree_yn, other_people_supply_agree_yn, auth_div             \n");
		sql.append(" , parent_member_id, fourteen_less_than_yn, parent_agree_yn                           \n");
		sql.append(" from srv_dt_memberinfo                                                               \n");
		*/
		
		String member_id = 	"";
		String pw = 	"";
		String member_nm = 	"";
		String birth = 	"";
		String gender = 	"";
		String cp_no = 	"";
		String email = 	"";
		String member_grade = 	"";
		String pw_last_mod_dt = 	"";
		String pw_fail_cnt = 	"";
		String member_key = 	"";
		String srv_agreement_agree_yn = 	"";
		String person_info_agreement_agree_yn =  "";
		String other_people_supply_agree_yn = "";
		String auth_div = "";
		String parent_member_id = "";
		String fourteen_less_than_yn = "";
		String parent_agree_yn = "";
		
		
		String last_access_ip = "";   
		String last_access_dt = "";   
		String last_logout_dt = "";   
		String reg_ts = "";           
		String mod_ts = "";   
		String login_limit_yn  = "";  
		
		

		while(rm != null && rm.next()) {
			member_id 		= 	StringUtil.verify((String)rm.get("member_id"));
			pw 				= 	StringUtil.verify((String)rm.get("pw"));
			member_nm 		= 	StringUtil.verify((String)rm.get("member_nm"));			
			birth 			= 	StringUtil.verify((String)rm.get("birth"));
			gender 			= 	StringUtil.verify( ((Character)(rm.get("gender"))).toString()  ); 
			cp_no 			= 	StringUtil.verify((String)rm.get("cp_no"));
			email 			= 	StringUtil.verify((String)rm.get("email"));
			
			member_grade 	= 	StringUtil.verify( ((String)(rm.get("member_grade"))).toString() );
			
			pw_last_mod_dt 	= 	StringUtil.verify( DateTime.verify(((Timestamp)(rm.get("pw_last_mod_dt")))).toString() );
			//pw_fail_cnt 	= 	StringUtil.verify( ((Short)(rm.get("pw_fail_cnt"))).toString() );
			pw_fail_cnt 	= 	"";
			member_key 		= 	StringUtil.verify((String)rm.get("member_key"));
			
			
			srv_agreement_agree_yn 			= 	StringUtil.verify( ((Character)(rm.get("srv_agreement_agree_yn"))).toString());
			person_info_agreement_agree_yn 	= 	StringUtil.verify(((Character)(rm.get("person_info_agreement_agree_yn"))).toString());
			other_people_supply_agree_yn 	= 	StringUtil.verify(((Character)(rm.get("other_people_supply_agree_yn"))).toString());
			//auth_div 						= 	StringUtil.verify(((Character)(rm.get("auth_div"))).toString());
			//parent_member_id 				= 	StringUtil.verify((String)rm.get("parent_member_id"));
			//fourteen_less_than_yn 			= 	StringUtil.verify(((Character)(rm.get("fourteen_less_than_yn"))).toString());
			//parent_agree_yn 				= 	StringUtil.verify(((Character)(rm.get("parent_agree_yn"))).toString());
			
			//================================
			
			last_access_ip 		= 	StringUtil.verify((String)rm.get("last_access_ip"));
			
			last_access_dt 		= 	StringUtil.verify( DateTime.verify(((Timestamp)(  rm.get("last_access_dt")  ))).toString() );
			
			last_logout_dt 		= 	StringUtil.verify( DateTime.verify(((Timestamp)(  rm.get("last_logout_dt")  ))).toString() );
			
			reg_ts 				= 	StringUtil.verify( DateTime.verify(((Timestamp)(rm.get("reg_ts")))).toString() );
			mod_ts 				= 	StringUtil.verify( DateTime.verify(((Timestamp)(rm.get("mod_ts")))).toString() );
			//login_limit_yn 		= 	StringUtil.verify( ((Character)(rm.get("login_limit_yn"))).toString());
			
			
			//pw = SecureDB.decryptAria256(pw);
			birth = SecureDB.decryptAria256(birth);
			cp_no = SecureDB.decryptAria256(cp_no);
			email = SecureDB.decryptAria256(email);
			
			
%>
   			
   			<tr>
   			<td class="cell_center w40"  ><%= cnt+1 %></td>
			<td class="cell_center w80"  ><%= member_id %></td>
			
			<td class="cell_center w80"  ><%= member_nm %></td>
			<td class="cell_center w80"  ><%= birth %></td>
			<td class="cell_center w80"  ><%= gender %></td>
			<td class="cell_center w80"  ><%= cp_no %></td>
			<td class="cell_center w80"  ><%= email %></td>
			<td class="cell_center w80"  ><%= member_grade %></td>
			<td class="cell_center w80"  ><%= pw_last_mod_dt %></td>
			<td class="cell_center w80"  ><%= pw_fail_cnt %></td>
			
			<!-- <td class="cell_center w80"  ><%//= pw %></td> -->
			<td class="cell_center w80"  ><%= member_key %></td>
			
			<td class="cell_center w80"  ><%= srv_agreement_agree_yn %></td>
			<td class="cell_center w80"  ><%= person_info_agreement_agree_yn %></td>
			<td class="cell_center w80"  ><%= other_people_supply_agree_yn %></td>
			<td class="cell_center w80"  ><%= auth_div %></td>
			<td class="cell_center w80"  ><%= parent_member_id %></td>
			<td class="cell_center w80"  ><%= parent_member_id %></td>
			<td class="cell_center w80"  ><%= parent_agree_yn %></td>
			
			
			<td class="cell_center w80"  ><%= last_access_ip %></td>
			<td class="cell_center w80"  ><%= last_access_dt %></td>
			<td class="cell_center w80"  ><%= last_logout_dt %></td>
			<td class="cell_center w80"  ><%= reg_ts %></td>
			<td class="cell_center w80"  ><%= mod_ts %></td>
			<td class="cell_center w80"  ><%= login_limit_yn %></td>
	        
	         
	      </tr>
   			
<%		
			cnt++;
		}
		if(cnt == 0) {
%>
			
<%			
		}
		
	
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}

  } //end of if	


%>
	</tbody>
</table>

<!-- </div> -->

<form name="sop_member"></form>

<script language="javascript">
function jo_excel_down() {
	
	document.sop_member.action = "sop_member_excel_down.jsp";
	document.sop_member.submit();
	return false;
	
	
}

</script>

<span id='result_dwon'></span>

