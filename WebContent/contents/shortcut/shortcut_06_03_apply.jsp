<%@page import="kr.co.offton.pdf.Const"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%

	String savePath = sc_filePath + "/know";			//저장 위치
	int sizeLimit   = fileSizeLimit ; 		//5메가까지 제한 넘어서면 예외발생

	GeneralBroker broker = null;
	RecordModel rm = null;

	String api_use_org = "";
	String api_version = "";
	String api_use_name  = "";
	String api_title = "";
	String api_email1 = "";
	String api_email2 = "";
	String api_email = "";
	String api_tel1 = "";
	String api_tel2 = "";
	String api_tel3 = "";
	String api_tel = "";
	String api_esti_user_count = "";
	String api_server_ip = "";
	String api_use_reason = "";
	//String api_file = "";
	String aT = "";
	String api_auth_key = "";
	String url_check = "";
	
	String formName = "";
	//String fileName = "";
	String autoApproveFlag = "";

	/*******************************/
	/* random auth key 생성 (20자리)*/
	/*******************************/
	String random_auth_key = String.valueOf((int)(Math.random() * 100000000));
	String zero="";

	if(random_auth_key.length() < 8) {
		for(int i=0; i < 8 - random_auth_key.length(); i++) {
			zero += "0";
		}
	}
	random_auth_key = "ESGA" + sc_toDay + random_auth_key + zero;

	try {

		broker = new GeneralBroker("apaa00");

		/**
		 * @constructor parameter
		 *  	HttpServletRequest req
		 *  	String directory
		 *  	int maxsize
		 *  	String encoding
		 *  	FileRenamePolicy policy(파일명중복여부))
		 */
		MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
		Enumeration formNames  = multi.getFileNames();

		api_use_org = multi.getParameter("api_use_org");												//사용처
		api_version = multi.getParameter("api_version");												//Version
		api_use_name  = multi.getParameter("api_use_name");								//담당자명
		api_title = multi.getParameter("api_title");																		//시스템명
		api_email1 = multi.getParameter("api_email1");
		api_email2 = multi.getParameter("api_email2");
		aT = multi.getParameter("aT");
		api_email = api_email1 + "@" + api_email2;																	//이메일
		api_tel1 = multi.getParameter("api_tel1");
		api_tel2 = multi.getParameter("api_tel2");
		api_tel3 = multi.getParameter("api_tel3");
		api_tel = api_tel1 + "-" + api_tel2 + "-" + api_tel3;												//전화번호
		api_esti_user_count = multi.getParameter("api_esti_user_count");	//예상 사용자수
		api_server_ip = multi.getParameter("api_server_ip");										//사용서버URL
		api_use_reason = multi.getParameter("api_use_reason");							//사용용도
		api_use_reason = api_use_reason.replaceAll("\'","&apos;");
		api_auth_key = multi.getParameter("api_auth_key");
		url_check = multi.getParameter("url_check");
		
		if(url_check==null){
			url_check="N";
		}
		
		if(api_version.equals("2.0")){
			random_auth_key = "SA2O" + random_auth_key.substring(4);
		}

		// 개인정보 노출 점검
		String privacy01 = api_title + " " + api_use_name + " " + api_use_reason;   // 점검 데이터
		String privacy02 = StringUtil.privacy(privacy01);               // 점검	
		
		//formName = (String)formNames.nextElement();														//file tag명
		//fileName = multi.getFilesystemName(formName);													//file tag내의 file명
        
		lData.setString("random_auth_key", random_auth_key);
		lData.setString("api_auth_key", api_auth_key);
		lData.setString("sc_userkey", sc_userkey);
		lData.setString("api_title", api_title);
		lData.setString("api_email", api_email.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", ""));
		lData.setString("api_tel", api_tel);
		lData.setString("api_use_org", api_use_org);
		lData.setString("api_version", api_version);
		lData.setString("api_use_name", api_use_name);
		lData.setString("api_esti_user_count", api_esti_user_count);
		lData.setString("api_server_ip", api_server_ip.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", ""));
		//lData.setString("fileName", fileName);
		lData.setString("api_use_reason", api_use_reason);
		lData.setString("url_check", url_check);
		/******************************/
		/* API 이용 신청 등록 */
		/******************************/
		if (privacy02.equals("")) { // 개인정보 노출 점검
			if(aT.equals("INS")) {
				lData.setString("PARAM", "API_APPLY");
	
				int resultFlag = broker.process(Const.P_INS, lData);
				
	
				//API 신청 항목리스트 등록
				lData.setString("PARAM", "INSERT_APPLY_ELEMENTS");
				lData.setString("random_auth_key", random_auth_key);
				broker.process(Const.P_INS, lData);
				
				lData.setString("PARAM", "IS_AUTO_APPROVE");
				rm = broker.getList(lData);
				if(rm.next())	autoApproveFlag = (String)rm.get("value");	//자동승인여부
				
				if(autoApproveFlag.equals("Y")){
					lData.setString("approve_status", "A");
					lData.setString("api_modify_key", random_auth_key);
					lData.setString("api_auth_key", random_auth_key);
					lData.setString("PARAM", "APPROVE");
					broker.process(Const.P_UPD, lData);
					
					if(resultFlag == 1) {
						out.print("<script>alert('API 이용신청이 신청 및 승인되었습니다. '); location.href ='shortcut_06_03_01.jsp'</script> API 이용신청이 신청되었습니다. <br /><br />승인확인은 \"마이페이지 > 알림정보\" 에서 확인 하시면 됩니다. <a href='shortcut_06_03_01.jsp'>신청내역보기</a>");
					} else {
						out.print("<script>alert('API 이용신청이 정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요.'); history.back();</script> API 이용신청이 정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요. <a href='shortcut_06_03.jsp'>돌아가기</a>");
					}
				}else{
					if(resultFlag == 1) {
						out.print("<script>alert('API 이용신청이 신청되었습니다. \\n\\n승인확인은 \"마이페이지 > 알림정보\" 에서 확인 하시면 됩니다.'); location.href ='shortcut_06_03_01.jsp'</script> API 이용신청이 신청되었습니다. <br /><br />승인확인은 \"마이페이지 > 알림정보\" 에서 확인 하시면 됩니다. <a href='shortcut_06_03_01.jsp'>신청내역보기</a>");
					} else {
						out.print("<script>alert('API 이용신청이 정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요.'); history.back();</script> API 이용신청이 정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요. <a href='shortcut_06_03.jsp'>돌아가기</a>");
					}
				}
	
			/******************************/
			/* API 이용 신청 수정 */
			/******************************/
			} else if(aT.equals("UPD")) {
				//이미 승인 또는 반려된 경우 수정할 수 있는 권한없음
				lData.setString("PARAM", "ISEDIT");
				rm = broker.getList(lData);
				String status="";
				if(rm != null && rm.next()) status = String.valueOf((Character)rm.get("api_approve_status"));
				if(!status.equals("S")) {
					out.print("<script>alert('API 이용 신청이 승인(반려) 되었습니다. 수정하실 수 있는 권한이 없습니다.'); location.href ='shortcut_06_03_01.jsp'; </script> API 이용 신청이 승인(반려) 되었습니다. 수정하실 수 있는 권한이 없습니다. <a href='shortcut_06_03_01.jsp'>돌아가기</a>");
				} else {
					if(api_version.equals("2.0")){
						random_auth_key = "SA2O" + api_auth_key.substring(4);
					}else{
						random_auth_key = "ESGA" + api_auth_key.substring(4);
					}
					
					lData.setString("random_auth_key", random_auth_key);
					
					if(!api_auth_key.equals(random_auth_key)){
						//API 제공 리스트 삭제
						lData.setString("PARAM", "REMOVE_API_ELEMENTS");
						broker.process(Const.P_DEL, lData);
					}
					
					
					lData.setString("PARAM", "UPDATE_API_APPLY");
					int resultFlag = broker.process(Const.P_UPD, lData);
					
					if(!api_auth_key.equals(random_auth_key)){
						lData.setString("PARAM", "INSERT_APPLY_ELEMENTS");
						broker.process(Const.P_INS, lData);
					}
					
					lData.setString("PARAM", "IS_AUTO_APPROVE");
					rm = broker.getList(lData);
					if(rm.next())	autoApproveFlag = (String)rm.get("value");	//자동승인여부
					
					if(autoApproveFlag.equals("Y")){
						lData.setString("approve_status", "A");
						lData.setString("api_modify_key", random_auth_key);
						lData.setString("api_auth_key", random_auth_key);
						lData.setString("PARAM", "APPROVE");
						broker.process(Const.P_UPD, lData);
						
						if(resultFlag == 1) {
							out.print("<script>alert('저장 및 승인되었습니다.'); location.href='shortcut_06_03_01.jsp'</script> 저장되었습니다. <a href='shortcut_06_03_01.jsp'>내역보기</a>");
						} else {
							out.print("<script>alert('정상적으로 처리되지 않았습니다.'); location.href ='shortcut_06_03_01.jsp'</script> 정상적으로 처리되지 않았습니다. <a href='shortcut_06_03_01.jsp'>돌아가기</a>");
						}
					}else{
						if(resultFlag == 1) {
							out.print("<script>alert('저장되었습니다.'); location.href='shortcut_06_03_01.jsp'</script> 저장되었습니다. <a href='shortcut_06_03_01.jsp'>내역보기</a>");
						} else {
							out.print("<script>alert('정상적으로 처리되지 않았습니다.'); location.href ='shortcut_06_03_01.jsp'</script> 정상적으로 처리되지 않았습니다. <a href='shortcut_06_03_01.jsp'>돌아가기</a>");
						}
					}
	
				}
	
			/******************************/
			/* API 이용 신청 취소 */
			/******************************/
			} else if(aT.equals("DEL")) {
	
				//이미 승인 또는 반려된 경우 수정할 수 있는 권한없음
				lData.setString("PARAM", "ISEDIT");
				rm = broker.getList(lData);
				String status="";
				if(rm != null && rm.next()) status = String.valueOf((Character)rm.get("api_approve_status"));
				if(!status.equals("S")) {
					out.print("<script>alert('API 이용 신청이 승인(반려) 되었습니다. 취소하실 수 있는 권한이 없습니다.'); location.href ='shortcut_06_03_01.jsp'; </script> API 이용 신청이 승인(반려) 되었습니다. 취소하실 수 있는 권한이 없습니다. <a href='shortcut_06_03_01.jsp'>돌아가기</a>");
				} else {
	
					//API 제공 리스트 삭제
					lData.setString("PARAM", "REMOVE_API_ELEMENTS");
					broker.process(Const.P_DEL, lData);
	
					//API 삭제
					lData.setString("PARAM", "REMOVE_API");
					int resultFlag = broker.process(Const.P_DEL, lData);
	
					if(resultFlag == 1) {
						out.print("<script>alert('취소되었습니다.'); location.href ='shortcut_06_03_01.jsp'</script> 취소되었습니다. <a href='shortcut_06_03_01.jsp'>돌아가기</a>");
					} else {
						out.print("<script>alert('정상적으로 처리되지 않았습니다.'); location.href ='shortcut_06_03_01.jsp'</script> 정상적으로 처리되지 않았습니다. <a href='shortcut_06_03_01.jsp'>돌아가기</a>");
					}
				}
			}
		}else{
			out.print("<script>alert('개인정보 노출  (주민번호, 사업자번호, 법인번호, 신용카드번호, 핸드폰번호) 제거 후 등록 하세요.\\n"+""+privacy02+"'); history.back('');</script> 개인정보 노출  (주민번호, 사업자번호, 법인번호, 신용카드번호, 핸드폰번호) 제거 후 등록 하세요.\\n"+""+privacy02+"'); <a href='/'>메인화면</a>");
		}

	}catch(Exception e) {
		out.print("<script>alert('정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요.'); history.back();</script> 정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요. <a href='shortcut_06_03.jsp'>돌아가기</a>");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
