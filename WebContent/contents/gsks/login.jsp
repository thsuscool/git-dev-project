<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="java.math.BigDecimal"%>
<%@ page import="sun.misc.BASE64Encoder" %>
<%@ page import="sun.misc.BASE64Decoder" %>
<%@ page import="java.net.*, java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.security.*" %>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@page import="kr.co.techinmotion.util.encryptSHA256"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	encryptSHA256 enc = new encryptSHA256();
	GeneralBroker broker = null;
	String userid = lData.getString("userid");												//id
	String userpassword = lData.getString("userpassword");	//password

	userid = userid.replaceAll("\'","").replaceAll("\"","").replaceAll("&","").replaceAll("<","").replaceAll(">","");
	userpassword = userpassword.replaceAll("\'","").replaceAll("\"","").replaceAll("&","").replaceAll("<","").replaceAll(">","");
	
	//SHA-256 사용한 단방향 암호화. 2012.05.17...Bobby
	String newPassword = enc.encryptSHA256(userpassword, "salt".getBytes());

	BASE64Encoder encoder = new BASE64Encoder();
	BASE64Decoder decoder = new BASE64Decoder();

	/**********************************/
	/* 관리자만 로그인하도록 처리*/
	/**********************************/
	if(StringUtil.isEmpty(sc_userid)) {

		RecordModel rm = null;
		RecordModel rm1 = null;

		try {
			broker = new GeneralBroker("usaa00");

			/**************************/
			/* password incoding */
			/**************************/
			String incodingPassword=(encoder.encodeBuffer(userpassword.getBytes())).trim();

			lData.setString("PARAM", "LOGIN");
			lData.setString("userid", userid);
			//lData.setString("incodingPassword", incodingPassword);
			//lData.setString("incodingPassword", userpassword);
			lData.setString("incodingPassword", newPassword);
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
				String sgis_intest_loc = StringUtil.verify((String)rm.get("sgis_intest_loc"));

				/***************************/
				/* 홈페이지 내부 세션 */
				/***************************/
				session.setAttribute("sc_userkey",sgis_userkey);															//key
				session.setAttribute("sc_userid",sgis_userid);																	//id
				session.setAttribute("sc_username", sgis_name);														//name
				session.setAttribute("sc_email", sgis_email);																		//email
				session.setAttribute("sc_userlevel", sgis_authid);															//level
				session.setAttribute("sc_telephone", sgis_telephone);											//telephone
				session.setAttribute("sc_aoi", sgis_intest_loc);																//interest location
				//session.setAttribute("sgis_company_name", sgis_company_name);		//company name
				
				/***************************/
				/* 전체 공통 세션 */
				/***************************/
				session.setAttribute("userkey",sgis_userkey);																	//key
				session.setAttribute("userid",sgis_userid);																			//id
				session.setAttribute("username", sgis_name);																	//name
				session.setAttribute("userlevel", sgis_authid);																	//level
				//session.setAttribute("aoi", sgis_intest_loc);																			//interest location
				
				response.sendRedirect("index.jsp");

			//아이디 또는 비밀번호가 다를경우
			} else {
					out.print("<script>alert('아이디 또는 비밀번호를 확인하세요.'); history.back();</script>");
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

%>