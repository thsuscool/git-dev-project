<%@ page language="java" contentType="application/vnd.ms-excel;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>

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
	    response.setHeader("Content-Disposition", "; filename=user_list.xls");
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename=user_list.xls");
	    response.setHeader("Content-Description", "JSP Generated Data");
	}

	String list_search_input  = lData.get("list_search_input");	//검색어
	String sort               = lData.get("sort");							//정렬기준
	String mem_status         = lData.get("mem_status");				//회원 상태별
	String mem_grade          = lData.get("mem_grade");					//회원 등급별

	DbManager dbmgr     = null;
	RecordModel userSet = null;

	StringBuffer query = new StringBuffer(1024);

	query.append(" select x.sgis_member_id                                      \n");
	query.append("       ,x.sgis_member_key                                     \n");
	query.append("       ,x.sgis_name                                           \n");
	query.append("       ,x.sgis_auth_id                                        \n");
	query.append("       ,a.sgis_auth_name                                        \n");
	query.append("       ,to_char(x.create_date) create_date                    \n");
	query.append("       ,to_char(x.last_update_date) last_update_date          \n");
	query.append("       ,x.sgis_birthday                                       \n");
	query.append("       ,x.sgis_password_q_reply                               \n");
	query.append("       ,decode(x.sgis_sex, 'M', '남', '여') sgis_sex           \n");
	query.append("       ,AESDecrypt(x.sgis_email,'sgis') sgis_email            \n");
	query.append("       ,x.sgis_zip_code                                       \n");
	query.append("       ,(select sgis_sido||' '||sgis_gugun||''||sgis_dong||   \n");
	query.append("                ' '||sgis_ri||' '||sgis_bldg||' '||sgis_bunji \n");
	query.append("           from sgis_zip_code                                 \n");
	query.append("          where sgis_seq = x.sgis_seq                         \n");
	query.append("        ) as base_address                                     \n");
	query.append("       ,AESDecrypt(x.sgis_address,'sgis')  sgis_address                                      \n");
	//query.append("       ,AESDecrypt(x.sgis_mobile_phone,'sgis')                                   \n");
	query.append("       ,AESDecrypt(x.sgis_telephone,'sgis')  sgis_telephone                                    \n");
	//query.append("       ,x.sgis_intest_loc                                     \n");
	query.append("       ,(select sgis_job_name                                 \n");
	query.append("           from sgis_job_div                                  \n");
	query.append("          where sgis_job_code = x.sgis_job_code               \n");
	query.append("        ) sgis_job_name                                       \n");
	//query.append("       ,x.sgis_company_name                                   \n");
	//query.append("       ,x.sgis_company_divi                                   \n");
	//query.append("       ,x.sgis_company_duty                                   \n");
	query.append("       ,case when x.sgis_use_freq = 1 then '거의매일'           \n");
	query.append("             when x.sgis_use_freq = 2 then '한달에 10회이상'     \n");
	query.append("             when x.sgis_use_freq = 3 then '한달에 5~10회'      \n");
	query.append("             when x.sgis_use_freq = 4 then '한달에 1~5회'       \n");
	query.append("             when x.sgis_use_freq = 5 then '가끔'              \n");
	query.append("         end sgis_use_freq                                    \n");
	query.append("       ,case when x.sgis_satis_num = 5 then '매우불만족'        \n");
	query.append("             when x.sgis_satis_num = 4 then '불만족'           \n");
	query.append("             when x.sgis_satis_num = 3 then '보통'             \n");
	query.append("             when x.sgis_satis_num = 2 then '만족'             \n");
	query.append("             when x.sgis_satis_num = 1 then '매우만족'          \n");
	query.append("         end sgis_satis                                       \n");
	query.append("       ,nvl((select sgis_menu_d_name                          \n");
	query.append("           from sgis_menu_config                              \n");
	query.append("          where sgis_menu_d_code_id = x.sgis_menu_d_id        \n");
	query.append("        ),'') as sgis_menu_d_name                             \n");
	query.append("   from sgis_member_info x ,sgis_auth_id a                    \n");
	query.append("  where x.sgis_auth_id = a.sgis_auth_id(+)                    \n");

	if(!StringUtil.isEmpty(list_search_input)) {
		query.append(" and ( x.sgis_name LIKE '%'|| :list_search_input ||'%' )    \n");
	}
	if(!StringUtil.isEmpty(mem_status)) {
		query.append(" and x.sgis_use_che = :mem_status                           \n");
	}
	if(!StringUtil.isEmpty(mem_grade)) {
		query.append(" and x.sgis_auth_id = :mem_grade                            \n");
	}
	if(sort.equals("1")) {
		query.append("  order by x.sgis_name asc                                  \n");
	}else {
		query.append("  order by x.create_date desc , sgis_member_key desc        \n");
	}

	try {

		dbmgr = new DbManager();
		dbmgr.prepareStatement(query.toString(), lData);

		userSet = dbmgr.select();
	}catch(Exception e) {

		System.out.print("*** ExcelPage Exception Info ***\n"+e);
	}finally {

		if(dbmgr != null)	dbmgr.close();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
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
<body>
  <table width="100%" cellpadding="0" cellspacing="0" class="table1">
    <thead>
      <tr>
        <th class="td_top">NO</th>
        <th class="td_top">성명</th>
        <th class="td_top">회원아이디</th>
        <th class="td_top">등급</th>
        <th class="td_top">생일</th>
        <th class="td_top">성별</th>
        <th class="td_top">주소</th>
        <th class="td_top">연락처</th>
        <th class="td_top">이메일</th>
        <th class="td_top">가입일자</th>
        <th class="td_top">수정일자</th>
        <th class="td_top">직업</th>
        <th class="td_top">이용빈도</th>
        <th class="td_top">만족도</th>
        <th class="td_top">이용부문</th>
        <th class="td_top">MEMBER_KEY</th>
      </tr>
    </thead>
    <tbody>
<%
	if(userSet.getRowCount() > 0) {

		String sgis_member_id        = "";
		String sgis_member_key       = "";
		String sgis_auth_id          = "";
		String sgis_name             = "";
		String sgis_auth_name        = "";
		String create_date           = "";
		String last_update_date      = "";
		String sgis_birthday         = "";
		String sgis_password_q_reply = "";
		String sgis_sex              = "";
		String sgis_email            = "";
		String sgis_zip_code         = "";
		String base_address          = "";
		String sgis_address          = "";
		//String sgis_mobile_phone     = "";
		String sgis_telephone        = "";
		//String sgis_intest_loc       = "";
		String sgis_job_name         = "";
		//String sgis_company_name     = "";
		//String sgis_company_divi     = "";
		//String sgis_company_duty     = "";
		String sgis_use_freq         = "";
		String sgis_satis            = "";
		String sgis_menu_d_name      = "";

		int rowNum = userSet.getRowCount();
		while(userSet != null && userSet.next()) {

			sgis_member_id        = StringUtil.verify((String)userSet.get("sgis_member_id"));
			sgis_member_key       = StringUtil.verify((String)userSet.get("sgis_member_key"));
			sgis_auth_id          = StringUtil.verify((String)userSet.get("sgis_auth_id"));
			sgis_auth_name        = StringUtil.verify((String)userSet.get("sgis_auth_name"));
			sgis_name             = StringUtil.verify((String)userSet.get("sgis_name"));
			create_date           = StringUtil.verify((String)userSet.get("create_date"));
			last_update_date      = StringUtil.verify((String)userSet.get("last_update_date"));
			sgis_birthday         = StringUtil.verify((String)userSet.get("sgis_birthday"));
			sgis_password_q_reply = StringUtil.verify((String)userSet.get("sgis_password_q_reply"));
			sgis_sex              = StringUtil.verify((String)userSet.get("sgis_sex"));
			sgis_email            = StringUtil.verify((String)userSet.get("sgis_email"));
			sgis_zip_code         = StringUtil.verify((String)userSet.get("sgis_zip_code"));
			base_address          = StringUtil.verify((String)userSet.get("base_address"));
			sgis_address          = StringUtil.verify((String)userSet.get("sgis_address"));
			//sgis_mobile_phone     = StringUtil.verify((String)userSet.get("sgis_mobile_phone"));
			sgis_telephone        = StringUtil.verify((String)userSet.get("sgis_telephone"));
			//sgis_intest_loc       = StringUtil.verify((String)userSet.get("sgis_intest_loc"));
			sgis_job_name         = StringUtil.verify((String)userSet.get("sgis_job_name"));
			//sgis_company_name     = StringUtil.verify((String)userSet.get("sgis_company_name"));
			//sgis_company_divi     = StringUtil.verify((String)userSet.get("sgis_company_divi"));
			//sgis_company_duty     = StringUtil.verify((String)userSet.get("sgis_company_duty"));
			sgis_use_freq         = StringUtil.verify((String)userSet.get("sgis_use_freq"));
			sgis_satis            = StringUtil.verify((String)userSet.get("sgis_satis"));
			sgis_menu_d_name      = StringUtil.verify((String)userSet.get("sgis_menu_d_name"));
			
			String address = "("+sgis_zip_code+") "+base_address+"\n"+sgis_address;
%>
      <tr>
        <td class="cell_center"><%=rowNum %></td>
        <td class="cell_left"><%=sgis_name %></td>
        <td class="cell_left"><%=sgis_member_id %></td>
        <td class="cell_center"><%=sgis_auth_name %></td>
        <td class="cell_center"><%=sgis_birthday %></td>
        <td class="cell_center"><%=sgis_sex %></td>
        <td class="cell_left"><%=address %></td>
        <td class="cell_left"><%=sgis_telephone %></td>
        <td class="cell_left"><%=sgis_email %></td>
        <td class="cell_center"><%=create_date %></td>
        <td class="cell_center"><%=last_update_date %></td>
        <td class="cell_left"><%=sgis_job_name %></td>
        <td class="cell_left"><%=sgis_use_freq %></td>
        <td class="cell_left"><%=sgis_satis %></td>
        <td class="cell_left"><%=sgis_menu_d_name %></td>
        <td class="cell_left"><%=sgis_member_key %></td>
      </tr>
<%		rowNum--;
		}//end of while
	}else {
		%>
		<tr>
			<td class="cell_center" colspan="8">데이터가 존재하지 않습니다.</td>
		</tr>
<%}	%>
    </tbody>
  </table>
</body>
</html>