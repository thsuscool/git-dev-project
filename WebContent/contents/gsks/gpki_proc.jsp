<%@ page language="java" contentType="text/html;charset=euc-kr" %>
<%@ page import="kr.co.offton.jdf.db.RecordModel" %>
<%@ page import="kr.co.offton.jdf.db.DbManager" %>
<%@ page import="java.math.BigDecimal" %>
<%@ page import="java.net.*, java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.security.*" %>
<%@ page import="com.neowiz.login.LoginManager" %>
<%@ page import="kr.co.offton.pdf.basis.GeneralBroker" %>

<%@ page import="kr.co.offton.jdf.util.*" %>
<%@ page import="kr.co.offton.pdf.basis.*" %>
<%@ page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@ page import="kr.co.offton.pdf.*" %>
<%@ page import="java.net.URLDecoder" %>

<%@ include file="/contents/include/logger.jsp"%>

<%
	LData lData = null;
	String seperate = StringUtil.fromDB(request.getParameter("seperate"));
	
  if(seperate.equals("")){
  	lData = new LData( request );
  }else{
  	lData = new LData( request,seperate );
  }

	String procType = lData.getString("procType");
	String subDNValue = lData.getString("subDNValue");
	String serial = lData.getString("serial");
	System.out.println("BobbyTest...procType = "+procType);
	System.out.println("BobbyTest...subDNValue = "+subDNValue);
	System.out.println("BobbyTest...serial = "+serial);
	
	String subDN = URLDecoder.decode(subDNValue,"euc-kr");
	
	String gpki_serial = serial;
	String gpki_account = subDN;
	String comment = "";
	
	if(procType.equals("regist")){
		DbManager dbmgr = null;
		DbManager dbmgrAuth = null;
		RecordModel countSet = null;
		RecordModel countSetAuth = null;
		StringBuffer countQuery = new StringBuffer(1024);
		StringBuffer countQueryAuth = new StringBuffer(1024);
		StringBuffer updateQuery = new StringBuffer(1024);
		
		try {
			dbmgr      = new DbManager();	
			countQuery = new StringBuffer(1024);
			countQuery.append(" select count(*) as gpkiCount \n");
			countQuery.append(" from sgis_member_info \n");
			countQuery.append(" where gpki_serial = '"+gpki_serial+"' \n");
			//System.out.println(countQuery);
			dbmgr.prepareStatement(countQuery.toString());
			countSet = dbmgr.select();
			dbmgr.execute();
		} catch( Exception e ) {
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		} finally {
			dbmgr.close();
		}
		
		String gpkiCount =null;
		while(countSet != null && countSet.next()) {
			gpkiCount = countSet.get("gpkiCount").toString();
		}
		
		if(gpkiCount.equals("1")){
			%>
			<script type="text/javascript">
				alert("이미 등록되어 있는 인증서 입니다.");
				document.location="loginForm_gpki.jsp";
			</script>
			<%
			return;
		}else{
			dbmgrAuth      = null;
			countSetAuth   = null;
			countQueryAuth = new StringBuffer(1024);
			
			int str_loc = gpki_account.indexOf("cn=");
			String str_sub = gpki_account.substring(str_loc+6,str_loc+9);
		
			try {
				dbmgrAuth      = new DbManager();	
				countQueryAuth = new StringBuffer(1024);
				countQueryAuth.append(" select count(*) as authCount \n");
				countQueryAuth.append(" from sgis_member_info \n");
				countQueryAuth.append(" where sgis_name = '"+str_sub+"' \n");
				countQueryAuth.append(" and sgis_auth_id = '01' \n");
				//System.out.println(countQuery);
				dbmgrAuth.prepareStatement(countQueryAuth.toString());
				countSetAuth = dbmgrAuth.select();
				dbmgrAuth.execute();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgrAuth.close();
			}
			
			String authCount = null;
			while(countSetAuth != null && countSetAuth.next()) {
				authCount = countSetAuth.get("authCount").toString();
			}

			/* 
			out.print("countQueryAuth = "+countQueryAuth+"<br>");
			out.print("authCount = "+authCount+"<br>");   
			*/
			
			if(authCount.equals("0")){
				%>
				<script type="text/javascript">
					alert("본 인증서의 사용자는 관리자로 등록되어 있지 않습니다.");
					document.location="loginForm_gpki.jsp";
				</script>
				<%
				return;
			}else{
				dbmgr = null;
				
				try {
					dbmgr       = new DbManager();
					updateQuery = new StringBuffer(1024);
					updateQuery.append(" update sgis_member_info set \n");
					updateQuery.append(" gpki_serial = '"+gpki_serial+"' \n");
					updateQuery.append(" where sgis_name = '"+str_sub+"' \n");
					updateQuery.append(" and sgis_auth_id = '01' \n");
					//System.out.println(updateQuery);
					dbmgr.prepareStatement(updateQuery.toString());
					dbmgr.execute();
				} catch( Exception e ) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} finally {
					dbmgr.close();
				}
				
				//comment = str_sub+" 님의 GPKI 시리얼번호 '"+gpki_serial+"'가 등록되었습니다.";
				comment = str_sub+" 님의 인증서가 정상적으로 등록되었습니다.";
				%>
				<script type="text/javascript">
					alert("<%=comment%>");
					document.location="loginForm_gpki.jsp";
				</script>
				<%
				return;
			}
		}
	}else if(procType.equals("login")){
		String sc_userid=(String)session.getAttribute("sc_userid");
		int str_loc = gpki_account.indexOf("cn=");
		String str_sub = gpki_account.substring(str_loc+6,str_loc+9);
		
		GeneralBroker broker = null;
		String username = str_sub;
		
		if(StringUtil.isEmpty(sc_userid)) {
			RecordModel rm = null;

			try {
				broker = new GeneralBroker("usaa00");

				lData.setString("PARAM", "LOGIN3");
				lData.setString("username", username);
				lData.setString("gs", gpki_serial);
				rm = broker.getList(lData);

				//로그인성공 후 세션처리
				if(rm != null && rm.next()) {
					String sgis_userkey = StringUtil.verify((String)rm.get("sgis_member_key"));
					String sgis_userid = StringUtil.verify((String)rm.get("sgis_member_id"));
					String sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
					String sgis_email = StringUtil.verify((String)rm.get("sgis_email"));
					String sgis_authid = StringUtil.verify((String)rm.get("sgis_auth_id"));
					String sgis_telephone = StringUtil.verify((String)rm.get("sgis_telephone"));
					//String sgis_company_name = StringUtil.verify((String)rm.get("sgis_company_name"));
					//String sgis_intest_loc = StringUtil.verify((String)rm.get("sgis_intest_loc"));

					/***************************/
					/* 홈페이지 내부 세션 */
					/***************************/
					session.setAttribute("sc_userkey",sgis_userkey);
					session.setAttribute("sc_userid",sgis_userid);
					session.setAttribute("sc_username", sgis_name);
					session.setAttribute("sc_email", sgis_email);
					session.setAttribute("sc_userlevel", sgis_authid);
					session.setAttribute("sc_telephone", sgis_telephone);
					//session.setAttribute("sc_aoi", sgis_intest_loc);
					//session.setAttribute("sgis_company_name", sgis_company_name); 

					/***************************/
					/* 전체 공통 세션 */
					/***************************/
					session.setAttribute("userkey",sgis_userkey);
					session.setAttribute("userid",sgis_userid);
					session.setAttribute("username", sgis_name);
					session.setAttribute("userlevel", sgis_authid);
					//session.setAttribute("aoi", sgis_intest_loc); 

					response.sendRedirect("index.jsp");
				} else {
					out.print("<script>alert('해당 인증서가 관리자로 등록되었는지 확인하십시오.'); document.location='loginForm_gpki.jsp';</script>");
					return;
				}
			} catch(Exception e) {
				System.out.print("sgisWebError : ");
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			}
		} else {	//이미 로그인한 경우
			response.sendRedirect("/contents/gsks/index.jsp");
		}
	}
%>