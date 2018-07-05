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

<%@ include file="/contents/include/logger.jsp"%>

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
	    response.setHeader("Content-Disposition", "; filename=data_service_record.xls");
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename=data_service_record.xls");
	    response.setHeader("Content-Description", "JSP Generated Data");
	}
	

	String what_year = lData.getString("excel_down");

	GeneralBroker broker = null;
	RecordModel rm = null;
	
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
        <th class="td_top" >일련번호</th>
        <th class="td_top" >신청일자</th>
        <th class="td_top" >제공기관</th>
        <th class="td_top" >제공자료</th>
        <th class="td_top" >건수</th>
        <th class="td_top" >통계자료</th>
        <th class="td_top" >통계지역경계</th>
        <th class="td_top" >센서스지도</th>
        <th class="td_top" >요청목적</th>
        <th class="td_top" >DB</th>
        <th class="td_top" >연구</th>
        <th class="td_top" >작성</th>
        <th class="td_top" >활용목적</th>
        <th class="td_top" >중앙행정기관</th>
        <th class="td_top" >지방자치단체</th>
        <th class="td_top" >공사/공단</th>
        <th class="td_top" >대학</th>
        <th class="t_end td_top" >민간</th>
      </tr>
    </thead>

    <tbody>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_REQ_EXCEL");
		lData.setString("what_year", what_year);
		rm = broker.getList(lData);
		
		String dt = 	"";
		String nm = 	"";
		String gbn = 	"";
		String su_t = 	"";
		String s1 = 	"";
		String s2 = 	"";
		String s3 = 	"";
		String mok = 	"";
		String b1 = 	"";
		String b2 = 	"";
		String b3 = 	"";
		String goal = 	"";
		String sosok =  "";
		String sosok_001001 = "";
		String sosok_001002 = "";
		String sosok_001003 = "";
		String sosok_001004 = "";
		String sosok_001005 = "";

		while(rm != null && rm.next()) {
			dt = 	StringUtil.verify((String)rm.get("dt"));
			nm = 	StringUtil.verify((String)rm.get("nm"));
			gbn = 	StringUtil.verify((String)rm.get("gbn"));			
			su_t = 	StringUtil.verify((String)rm.get("su_t"));
			s1 = 	StringUtil.verify((String)rm.get("s1"));
			s2 = 	StringUtil.verify((String)rm.get("s2"));
			s3 = 	StringUtil.verify((String)rm.get("s3"));
			
			mok = 	StringUtil.verify((String)rm.get("mok"));
			if ("002001".equals(mok)) mok = "DB";
			if ("002002".equals(mok)) mok = "연구";
			if ("002003".equals(mok)) mok = "작성";
			
			b1 = 	StringUtil.verify((String)rm.get("b1"));
			b2 = 	StringUtil.verify((String)rm.get("b2"));
			b3 = 	StringUtil.verify((String)rm.get("b3"));
			goal = 	StringUtil.verify((String)rm.get("goal"));
			
			sosok_001001 = "";
			sosok_001002 = "";
			sosok_001003 = "";
			sosok_001004 = "";
			sosok_001005 = "";
			
			sosok = StringUtil.verify((String)rm.get("sosok"));
			if ("001001".equals(sosok)) sosok_001001 = "1";
			if ("001002".equals(sosok)) sosok_001002 = "1";
			if ("001003".equals(sosok)) sosok_001003 = "1";
			if ("001004".equals(sosok)) sosok_001004 = "1";
			if ("001005".equals(sosok)) sosok_001005 = "1";
			
			
%>
   			
   			<tr>
   			<td class="cell_center"><%= cnt+1 %></td>
	        <td class="cell_center"><%= dt %></td>
	        <td class="cell_center"><%= nm %></td>
	        <td class="cell_center"><%= gbn %></td>
	        <td class="cell_center"><%= su_t %></td>
	        <td class="cell_center"><%= s1 %></td>
	        <td class="cell_center"><%= s2 %></td>
	        <td class="cell_center"><%= s3 %></td>
	        <td class="cell_center"><%= mok %></td>
	        <td class="cell_center"><%= b1 %></td>
	        <td class="cell_center"><%= b2 %></td>
	        <td class="cell_center"><%= b3 %></td>
	        <td class="cell_center"><%= goal %></td>
	        <td class="cell_center"><%= sosok_001001 %></td>
	        <td class="cell_center"><%= sosok_001002 %></td>
	        <td class="cell_center"><%= sosok_001003 %></td>
	        <td class="cell_center"><%= sosok_001004 %></td>
	        <td class="cell_center"><%= sosok_001005 %></td>
	        
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
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
	</tbody>
</table>

</body>
</html>