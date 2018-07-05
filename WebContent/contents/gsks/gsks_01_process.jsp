<%--
/*********************************************************
* @source      : gsks_01_process.jsp
* @description : 관리자 / 사용자 신규입력 및 수정
*********************************************************
*    DATE    |     AUTHOR      |        DESC
*--------------------------------------------------------
* 2012.05.22       Bobby                수정
*********************************************************
--%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.pdf.basis.*" %>
<%@ page import="sun.misc.BASE64Encoder" %>
<%@page import="kr.co.techinmotion.util.encryptSHA256"%>

<%@ page import="kr.co.offton.jdf.db.DbManager" %>
<%@ page import="java.net.*, java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.security.*" %>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	String aT         = lData.getString("aT");
	String sendPage   = "";
	String userID     = session.getAttribute("userid").toString();

	GeneralBroker broker = null;

	try {

		broker = new GeneralBroker("adaa00");
		encryptSHA256 enc = new encryptSHA256();

		String list_search_input  = lData.get("list_search_input");	//검색어
		String sort               = lData.get("sort");			    //정렬기준
		String mem_status         = lData.get("mem_status");		//회원 상태별
		String mem_grade          = lData.get("mem_grade");			//회원 등급별
		String mem_cond           = lData.get("mem_cond");
		String newPassword        = enc.encryptSHA256(lData.get("userpassword"), "salt".getBytes());
		//System.out.println("list_search_input + " + list_search_input);
		
		
		//System.out.println("enc.encryptSHA256 [" + enc.encryptSHA256(""));
		
		
		if(aT.equals("INS") || aT.equals("UPD")) {
			lData.setString("userid"          , lData.getString("userid"));
			lData.setString("virtual_key"     , lData.getString("virtual_key"));
			lData.setString("username"        , lData.getString("username"));
			lData.setString("create_user"     , sc_userkey);
			lData.setString("answer"          , lData.getString("answer").replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", ""));
			lData.setString("address2"        , lData.getString("address2").replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", ""));
			lData.setString("telephone"       , lData.getString("telephone1")+ "-" + lData.getString("telephone2") + "-" + lData.getString("telephone3"));
			lData.setString("zip_code"        , lData.getString("zip1")+ "-" +  lData.getString("zip2"));
			lData.setString("company_name"    , lData.getString("company_name").replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", ""));
			lData.setString("company_divi"    , lData.getString("company_divi").replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", ""));
			lData.setString("company_duty"    , lData.getString("company_duty").replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", ""));
			lData.setString("last_update_user", sc_userkey);
			lData.setString("intest_loc"      , lData.getString("dongSelectBox"));

			BASE64Encoder encoder = new BASE64Encoder();
			//lData.setString("userpassword", (encoder.encodeBuffer(lData.get("userpassword").getBytes())).trim());
			//lData.setString("userpassword", lData.get("userpassword").trim());
			lData.setString("userpassword", newPassword);


			if(lData.get("email2").equals("etc")){	
				lData.setString("email", lData.get("email").replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "") + "@" + lData.get("emailetc"));
			} else {
				lData.setString("email", lData.get("email").replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "") + "@" + lData.get("email2"));
			}

			/*
			if(!StringUtil.isEmpty(lData.getString("mobile_phone1")) && !StringUtil.isEmpty(lData.getString("mobile_phone2"))  && !StringUtil.isEmpty(lData.getString("mobile_phone3"))) {
				lData.setString("mobile_phone", lData.getString("mobile_phone1") + "-" + lData.getString("mobile_phone2") + "-" + lData.getString("mobile_phone3"));
			}
			*/

			LData rtl = new LData();
			String memKey = "";

			if(aT.equals("INS")) {
				rtl    = (LData)broker.methodCall("insertProcess", new Object[]{lData});
				memKey = rtl.getString("new_member_key");
			}else if(aT.equals("UPD")) {
				lData.setNumber("SEQ", 1);
				lData.setString("last_update_user", userID);
				broker.process(Const.P_UPD, lData);
				memKey = lData.getString("sgis_member_key");
			}

			/* 관리자 로그 시작
			201.04.19...Bobby */
			DbManager dbmgr = null;
			RecordModel targetInfoSet = null;
			StringBuffer strQuery = new StringBuffer(1024);

			String memID = lData.getString("userid");

			try {
				dbmgr = new DbManager();
				strQuery = new StringBuffer(1024);
				strQuery.append(" select \n");
				strQuery.append(" sgis_member_id \n");
				strQuery.append(" ,(select sgis_auth_name from sgis_auth_id \n");
				strQuery.append(" where sgis_auth_id = sgis_member_info.sgis_auth_id) as sgis_auth_name \n");
				strQuery.append(" from sgis_member_info \n");
				strQuery.append(" where sgis_member_id = '"+memID+"' \n");
				System.out.println(strQuery);
				dbmgr.prepareStatement(strQuery.toString());
				targetInfoSet = dbmgr.select();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgr.close();
			}

			String targetID = null;
			String targetAUTH = null;

			while(targetInfoSet != null && targetInfoSet.next()) {
				targetID = targetInfoSet.get("sgis_member_id").toString();
				targetAUTH = targetInfoSet.get("sgis_auth_name").toString();
			}
			//System.out.println("targetID = "+targetID);
			//System.out.println("targetAUTH = "+targetAUTH);

			dbmgr = null;
			strQuery = new StringBuffer(1024);

			try {
				System.out.print("사용자 조회 로그기록");
				String strLog = "";

				if(aT.equals("INS")) {
					strLog = targetID+" "+targetAUTH+" 정보 입력";
				}else if(aT.equals("UPD")) {
					strLog = targetID+" "+targetAUTH+" 정보 수정";
				}

				dbmgr = new DbManager();
				strQuery = new StringBuffer(1024);
				strQuery.append(" insert into sgis_admin_log values ('"+userID+"','"+strLog+"',SYSDATE) \n");
				System.out.println(strQuery);
				dbmgr.prepareStatement(strQuery.toString());
				dbmgr.execute();
			} catch( Exception e ) {
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			} finally {
				dbmgr.close();
			}
			/* 관리자 로그 끝 */

			if (lData.getString("sgis_auth_id").equals("01")) {
				dbmgr = null;
				RecordModel countSet = null;
				StringBuffer countQuery = new StringBuffer(1024);

				String memkey = lData.getString("sgis_member_key");
				String memid = lData.getString("userid");

				try {
					System.out.print("사용자 권한 등록");
					dbmgr = new DbManager();
					countQuery = new StringBuffer(1024);
					countQuery.append(" insert into sgis_auth_manage  values ('"+ memkey+ "','"+memid+"', \n");
					countQuery.append(" 'N','N','N','N','N','N','N','N','N','N') \n");
					//System.out.println(countQuery);
					dbmgr.prepareStatement(countQuery.toString());
					countSet = dbmgr.select();
					dbmgr.execute();
				} catch (Exception e) {
					//2015-12-03 시큐어코딩
					//e.printStackTrace();
					logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
				} finally {
					dbmgr.close();
				}
			}else{
				dbmgr = null;
				RecordModel countSet = null;
				StringBuffer countQuery = new StringBuffer(1024);

				String memkey = lData.getString("sgis_member_key");
				String memid = lData.getString("userid");

				try {
					// 관리자 권한 등록 여부
					dbmgr = new DbManager();	
					countQuery = new StringBuffer(1024);
					countQuery.append(" select count(*) as countmit from sgis_auth_manage \n");
					countQuery.append(" where sgis_member_key = '"+memkey+"' and sgis_member_id = '"+memid+"' \n");
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

				String countMit =null;
				while(countSet != null && countSet.next()) {
					countMit = countSet.get("countmit").toString();
				}
				
				if(countMit.equals("1")){
					dbmgr = null;
					StringBuffer deleteQuery = new StringBuffer(1024);
					StringBuffer updateQuery = new StringBuffer(1024);
					
					try {
						// 관리자 권한 삭제처리
						dbmgr = new DbManager();	
						deleteQuery = new StringBuffer(1024);
						deleteQuery.append(" delete from sgis_auth_manage \n");
						deleteQuery.append(" where sgis_member_key = '"+memkey+"' and sgis_member_id = '"+memid+"' \n");
						System.out.println(deleteQuery);
						dbmgr.prepareStatement(deleteQuery.toString());
						dbmgr.execute();
					} catch( Exception e ) {
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
					} finally {
						dbmgr.close();
					}
					
					try {
						// GPKI 정보 삭제처리
						dbmgr = new DbManager();	
						updateQuery = new StringBuffer(1024);
						updateQuery.append(" update sgis_member_info set  \n");
						updateQuery.append(" gpki_serial = null  \n");
						updateQuery.append(" where sgis_member_key = '"+memkey+"' and sgis_member_id = '"+memid+"' \n");
						System.out.println(updateQuery);
						dbmgr.prepareStatement(updateQuery.toString());
						dbmgr.execute();
					} catch( Exception e ) {
						//2015-12-03 시큐어코딩
						//e.printStackTrace();
						logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
					} finally {
						dbmgr.close();
					}
				}
			}

			sendPage = "gsks_01_correct.jsp?aT=UPD&sgis_member_key="+memKey;
			response.sendRedirect(sendPage);

		}else if(aT.equals("STAT")) {	//회원 상태변경

			lData.setNumber("SEQ", 2);
			System.out.println("list_search_input aaaa " + StringUtil.verify(list_search_input));

			//sendPage = "gsks_01.jsp?list_search_input="+StringUtil.verify(list_search_input)+"&sort="+sort+"&mem_status="+mem_status+"&mem_grade="+mem_grade+"&mem_cond="+mem_cond;	//	
			String[] keys = lData.getString("chk").split(",");

			for(int i=0; i<keys.length; i++) {
				lData.setString("sgis_use_che", lData.getString("sgis_use_che_"+keys[i]));
				lData.setString("sgis_member_key", keys[i]);
				broker.process(Const.P_UPD, lData);
			}
%>
<HTML>
<HEAD>
<SCRIPT LANGUAGE="JavaScript">
<!--
	function aa(){
		fm.action= "gsks_01.jsp";
		fm.submit();	  
	}
//-->
</SCRIPT>
</HEAD>

<body onload="javascript:aa();">
<form name="fm" method="post">
	<input type="hidden" name="list_search_input" value="<%=list_search_input %>">
	<input type="hidden" name="mem_status" value="<%=mem_status %>">
	<input type="hidden" name="mem_grade" value="<%=mem_grade %>">
	<input type="hidden" name="mem_cond" value="<%=mem_cond %>">
	<input type="hidden" name="sort" value="<%=sort %>">
</form>
</body>
</HTML>			
<%
		}
	}catch(Exception e) {
		System.out.println("***Process Page exception info***\n"+e);
		//e.printStackTrace();
	}
%>