<%@ page language="java" contentType="application/vnd.ms-excel;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>

<%@page import="kostat.sop.ServiceAPI.common.security.SecureDB"%>
<%@page import="java.sql.Timestamp"%>

<%
  ConfigManager.getInstance();
  request.setCharacterEncoding("UTF-8");
  String funny_domain = "http://sgis.nso.go.kr";
  /*******************************/
  /* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
  /*******************************/
  String seperate = StringUtil.fromDB(request.getParameter("seperate"));
  LData lData     = null;

  if(seperate.equals("")) lData     = new LData( request );
  else lData     = new LData( request,seperate);

  /*************************/
  /* 공통변수 */
  /*************************/
  String sc_toDay = DateTime.getShortDateString();														//금일 (예:20081104)
//	String sc_webUrl = "http://127.0.0.1:8080";																		//local web url
  String sc_webUrl = ConfigManager.getScWebUrl();																		//web url
//	String sc_absouteRoot = "C:/projects/sgis/web";														//local absolute path
  String sc_absouteRoot = ConfigManager.getScAbsouteRoot();																	//absolute path
  String sc_userid=(String)session.getAttribute("sc_userid");								//session user id
  String sc_userkey = (String)session.getAttribute("sc_userkey");					//session user key
  String sc_username=(String)session.getAttribute("sc_username");			//session user name
  String sc_authid = (String)session.getAttribute("sc_userlevel");					//session level
  String sc_telephone = (String)session.getAttribute("sc_telephone");		//session telephone
  
  
  // 20140508 add by joonha
  String sc_mobile_phone = (String)session.getAttribute("sc_mobile_phone");		//session sc_mobile_phone 
  String sc_email = (String)session.getAttribute("sc_email");					//session sc_email
  
  //String sc_company_name = (String)session.getAttribute("sc_company_name");		//session company
  //String sc_aoi = (String)session.getAttribute("sc_aoi");												//session interest location
  String pop_status = (String)session.getAttribute("pop_status");					//승인된 게시물 알림여부
  
  // 
  String countURL = ConfigManager.getStatisticsURL();					//승인된 게시물 알림여부

//	String sc_filePath = "C:/projects/sgis/upload";																//local file path
  String sc_filePath = ConfigManager.getScFilePath();		  //file path
  String sc_pageTitle=ConfigManager.getScPageTitle();																			//title
  String loginYn = ConfigManager.getLoginYn();																																				//login Y : N
  int fileSizeLimit = ConfigManager.getFileSizeLimit();																									//최대 첨부파일 용량 (default:5M)

  // 메일설정
  String mail_host = ConfigManager.getMailHost();
  String mail_name = ConfigManager.getMailFromName();
  String mail_from = ConfigManager.getMailFromAddress();

  // 실명인증 서비스키
  String srvID = ConfigManager.getNameCheckServiceID();
  String srvNno = ConfigManager.getNamecheckServiceNO();

  // 관리자 허용IP
  String sc_ip1 = ConfigManager.getIpCheckip1();
  String sc_ip2 = ConfigManager.getIpCheckip2();
  String sc_ip3 = ConfigManager.getIpCheckip3();
  String sc_ip4 = ConfigManager.getIpCheckip4();
  String sc_ip5 = ConfigManager.getIpCheckip5();
  
  // 메인화면 설정
  String mainCode = (String)session.getAttribute("mainCode");
  String sgisKey  =  ConfigManager.getApiKey();
  //로그인되었을 경우 Y, 아니면 N

  String wasId = ConfigManager.getWasId();
  if(!StringUtil.isEmpty(sc_userid)) loginYn="Y";
%>

<%

	if(request.getHeader("User-Agent").indexOf("MSIE 5.5") > -1)
	{
	    response.setHeader("Content-Type", "doesn/matter;");
	    response.setHeader("Content-Disposition", "; filename=sop_member_info.xls");
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename=sop_member_info.xls");
	    response.setHeader("Content-Description", "JSP Generated Data");
	}
	

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
			sql.append( "	birth_code birth,                              \n " ); //2016 스키마 변경됨.
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
			sql.append( "	auth_div,						   	\n " );
			sql.append( "	login_limit_yn,                     \n " );
			sql.append( "	parent_member_id,                   \n " );
			sql.append( "	fourteen_less_than_yn,              \n " );
			sql.append( "	parent_agree_yn                     \n " );
			sql.append( "from srv_dt_memberinfo                 \n " );
			
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

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<title></title>
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
<body>
	
<table width="100%" border=0 cellpadding="0" cellspacing="0" class="table1"  >
  <thead>

      <tr>
        <th class="td_top" >번호</th>
        <th class="td_top" >아이디</th>
        
        <th class="td_top" >이름</th>
        <th class="td_top" >생년월일</th>
        <th class="td_top" >성별</th>
        <th class="td_top" >전화번호</th>
        <th class="td_top" >이메일</th>
        <th class="td_top" >회원등급</th>
        <th class="td_top" >비번최종수정일</th>
        <th class="td_top" >비번실패횟수</th>
        
        
        
        <!--<th class="td_top" >비밀번호</th>-->
        <th class="td_top" >멤버키</th>
        
        <th class="td_top" >회원약관동의</th>
        <th class="td_top" >개인정보동의</th>
        <th class="td_top" >제3자동의</th>
        <th class="td_top" >auth_div</th>
        <th class="td_top" >부모아이디</th>
        <th class="td_top" >14세미만여부</th>
        <th class="td_top" >부모동의여부</th>
        
        
        <th class="td_top" >최종접속IP</th>
		<th class="td_top" >최종접속일</th>
		<th class="td_top" >최종로그아웃날짜</th>
		<th class="td_top" >reg_ts</th>
		<th class="td_top" >mod_ts</th>
		<th class="t_end td_top"  >로그인제한여부</th>
        
      </tr>
    </thead>

    <tbody>
<%
	try {
		int cnt=0;
		
		
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
   			<td class="cell_center"  ><%= cnt+1 %></td>
			<td class="cell_center"  ><%= member_id %></td>
			
			<td class="cell_center"  ><%= member_nm %></td>
			<td class="cell_center"  ><%= birth %></td>
			<td class="cell_center"  ><%= gender %></td>
			<td class="cell_center"  ><%= cp_no %></td>
			<td class="cell_center"  ><%= email %></td>
			<td class="cell_center"  ><%= member_grade %></td>
			<td class="cell_center"  ><%= pw_last_mod_dt %></td>
			<td class="cell_center"  ><%= pw_fail_cnt %></td>
			
			<!--<td class="cell_center"  ><%//= pw %></td>-->
			<td class="cell_center"  ><%= member_key %></td>
			
			<td class="cell_center"  ><%= srv_agreement_agree_yn %></td>
			<td class="cell_center"  ><%= person_info_agreement_agree_yn %></td>
			<td class="cell_center"  ><%= other_people_supply_agree_yn %></td>
			<td class="cell_center"  ><%= auth_div %></td>
			<td class="cell_center"  ><%= parent_member_id %></td>
			<td class="cell_center"  ><%= parent_member_id %></td>
			<td class="cell_center"  ><%= parent_agree_yn %></td>
			
			
			<td class="cell_center"  ><%= last_access_ip %></td>
			<td class="cell_center"  ><%= last_access_dt %></td>
			<td class="cell_center"  ><%= last_logout_dt %></td>
			<td class="cell_center"  ><%= reg_ts %></td>
			<td class="cell_center"  ><%= mod_ts %></td>
			<td class="cell_center"  ><%= login_limit_yn %></td>
	        
	         
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

</body>
</html>