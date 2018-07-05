<%--
/*
    ********************************************************************
    * @source      : admin_01_06_tabpage05_prc.jsp
    * @description : 관리자 - 용어설명 게시판 DB처리 
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-17   김경열         1.0                
    ********************************************************************
 */
--%> 
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.jdf.db.*" %>
<%@ page import="kr.co.offton.pdf.basis.*"%>
<%@page import="java.math.BigDecimal"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
		GeneralBroker broker = null;
		DbManager dbmgr = null;
		RecordModel rm = null;
		RecordModel rmmod = null; // 수정
		broker = new GeneralBroker("ceaa00");
		String sql = "";
		String maxSeq = "";
		String aT = lData.get("aT");
		String sgis_census_req_id = lData.getString("sgis_census_req_id");
		String sgis_census_id[] = request.getParameterValues("sgis_census_id");
		String sgis_census_data_id = request.getParameter("sgis_census_data_id");
		String years[] = request.getParameterValues("years");
		String inUse[] = request.getParameterValues("inUse");
		int resultFlag =  0;
		int count = 0;
		
		String sgis_census_req_company = "";
		String sgis_census_req_tel = "";
		String sgis_census_req_goal = ""; 		
		String sgis_census_req_file = "";		
		String sgis_census_req_status = "";	
		String sgis_census_req_reject = "";		
		String sgis_census_location = "";		
		String sgis_census_req_app_date	= "";			
		
		try{

			
			/***************************************/
			/* 센서스 신청 */
			/***************************************/	
			
			if (aT.equals("RET")) {
			    lData.setString("PARAM", "CENSUS_APPLY_INFO_MOD");
			    rmmod = broker.getList(lData);
				
			    // 기존에 등록된 공통 값 변수 등록
			    if(rmmod.next()) {
			    	System.out.println("aaaaaaaaa");
	                sgis_census_req_company = StringUtil.verify((String)rmmod.get("sgis_census_req_company"));
	                System.out.println("bbbbbb");
	                sgis_census_req_company = sgis_census_req_company.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
	                System.out.println("ccccccccccc");
	                sgis_census_req_tel = StringUtil.verify((String)rmmod.get("sgis_census_req_tel"));
	                System.out.println("cccccccc");
	                sgis_census_req_goal = StringUtil.verify((String)rmmod.get("sgis_census_req_goal"));
	                sgis_census_req_goal = sgis_census_req_goal.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
	                System.out.println("dddddddddd");
	                sgis_census_req_file = StringUtil.verify((String)rmmod.get("sgis_census_req_file"));
	                sgis_census_location = StringUtil.verify((String)rmmod.get("sgis_census_location"));
	                if(sgis_census_req_file.equals("null")) sgis_census_req_file="";
	                sgis_census_req_status = String.valueOf((Character)rmmod.get("sgis_census_req_status"));	//A : 승인 , B : 반려
	                sgis_census_req_app_date = StringUtil.verify((String)rmmod.get("sgis_census_req_app_date"));			    	
			    }
			    System.out.println("111111111");
			    // 센서스자료신청년도 삭제
				lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
				System.out.println("2222222222");
				broker.process(Const.P_DEL, lData);
			    // 센서스자료신청 삭제
				lData.setString("PARAM", "REMOVE_CENSUS_REQ");
				broker.process(Const.P_DEL, lData);			    
				System.out.println("33333333");
			}
			
				
				System.out.println("111111111");
				if (aT.equals("INS")) {
					lData.setString("PARAM", "CENSUS_APPLY_MAXNUM");
	   			    rm = broker.getList(lData);
					if(rm.next()) sgis_census_req_id = String.valueOf((BigDecimal)rm.get("maxnum"));
				}
				
				System.out.println("22222222222222");
				for(int i = 0; i < sgis_census_id.length; i++){
					
					System.out.println(sgis_census_req_id);
					System.out.println(sgis_census_data_id.split("-")[i]);
					System.out.println(sgis_census_id[i]);
					System.out.println(sc_userkey);
					lData.setString("PARAM", "CENSUS_APPLY");
					lData.setString("sgis_census_req_id", sgis_census_req_id);
					lData.setString("sgis_census_data_id", sgis_census_data_id.split("-")[i]);
					lData.setString("sgis_census_id", sgis_census_id[i]);
					lData.setString("sc_userkey", sc_userkey);
					lData.setString("sgis_census_req_company", sgis_census_req_company);
					lData.setString("sgis_census_req_tel", sgis_census_req_tel);
					lData.setString("sgis_census_req_goal", sgis_census_req_goal);
					lData.setString("fileName", sgis_census_req_file);
					lData.setString("sc_userkey", sc_userkey);
					lData.setString("sgis_census_req_reject", "ZZ");
					
					// 2018. 01. 04 mng_s
					lData.setString("detail_data_seq", Integer.toString(i));
					// 2018. 01. 04 mng_e
	
					resultFlag = broker.process(Const.P_INS, lData);
					System.out.println("3333333");
					/******************************/
					/* 센서스 년도 신청 등록 */
					/******************************/
					System.out.println("years[i] : " + years[i].split(",").length);
					System.out.println("years[i] : " + years[i]);
					for(int j=0; j < years[i].split(",").length; j++) {
						
						System.out.println(years[i].split(",")[j]);
						System.out.println(sgis_census_id[i]);
						System.out.println(sgis_census_data_id.split("-")[i]);
						System.out.println(sgis_census_req_id);
						lData.setString("PARAM", "CENSUS_APPLY_YEAR");
						lData.setString("years", years[i].split(",")[j]);
						lData.setString("sgis_census_id", sgis_census_id[i]);
						lData.setString("sgis_census_data_id", sgis_census_data_id.split("-")[i]);
						lData.setString("sgis_census_req_id", sgis_census_req_id);
						lData.setString("inUse", "Y");
						
						// 2018. 01. 04 mng_s
						lData.setString("detail_data_seq", Integer.toString(i));
						// 2018. 01. 04 mng_e

						broker.process(Const.P_INS, lData);
					}
					count++;
				}
				
				if(resultFlag > 0) {
					out.print("<script>alert('자료선택을 완료하셨습니다.'); opener.document.censusFm.sgis_census_req_id.value ="+""+sgis_census_req_id+"; opener.document.censusFm.sgis_sum.value ="+""+count+"; opener.showData(); window.close(); </script> 자료선택을 완료하였습니다. <a href='opener.document.censusFm.sgis_census_req_id.value = "+sgis_census_req_id+"; opener.document.censusFm.sgis_sum.value ="+count+"; opener.showData(); window.close();'>창닫기</a>");
				} else {
					out.print("<script>alert('자료선택이 정상적으로 처리되지 않았습니다. 신청 내용을 확인해 주세요.'); history.back();</script> 자료선택이 정상적으로 처리되지 않았습니다. 신청 내용을 확인해 주세요. <a href='shortcut_05_03_pop.jsp'>돌아가기</a>");
				}

			/*
			if(aT.equals("ins")){  //등록
				//최대값 SEQ
				
				String maxSeq = "";
				sql =  " SELECT to_char(NVL(MAX(sgis_term_id),0)+1) as seq FROM SGIS_CENSUS_REQ ";	
				dbmgr.prepareStatement(sql);
				rm = dbmgr.select();
				
				if(rm.next()) {
					maxSeq = StringUtil.verify((String)rm.get("seq"));
				}

				sql = "INSERT INTO  SGIS_CENSUS_REQ ( 																\n";
				sql+= "sgis_term_id, sgis_term_service, sgis_term_name, sgis_term_name_eng, sgis_term_desc ) 	\n";
				sql+= "VALUES ( " + maxSeq + ", ?, ?, ?, ? )													\n";
				
				sql = "INSERT INTO SGIS_CENSUS_REQ\n";
				sql+= "(SGIS_CENSUS_REQ_ID,SGIS_CENSUS_DATA_ID,SGIS_CENSUS_ID,SGIS_MEMBER_KEY,SGIS_CENSUS_REQ_STATUS,\n";
				sql+= "SGIS_CENSUS_REQ_COMPANY,SGIS_CENSUS_REQ_TEL,SGIS_CENSUS_REQ_GOAL,CREATE_USER,CREATE_DATE,\n";
				sql+= "LAST_UPDATE_USER,LAST_UPDATE_DATE)\n";
				sql+= "VALUES ("+ maxSeq +",0,1,'10062','S','company','11-1111-1111','goal','10062',SYSDATE,'10062',SYSDATE) \n";
				
				dbmgr.prepareStatement(sql, lData);
				dbmgr.pstmtSet(lData.get("sgis_term_service"));
				dbmgr.pstmtSet(lData.get("sgis_term_name"));
				dbmgr.pstmtSet(lData.get("sgis_term_name_eng"));
				dbmgr.pstmtSet(lData.get("sgis_term_desc")); 
				
				rtn = dbmgr.executeUpdate();
			
			}else if(aT.equals("del")){  //삭제
				
				String checkID = lData.get("check_ID");
				String[] chk_ID = checkID.split("-");

				sql = " DELETE FROM sgis_term WHERE	sgis_term_id = ?	\n";
				for(int i = 1 ; chk_ID.length > i ; i++){
					sql += "or sgis_term_id = ? \n";
				}
				
				dbmgr.prepareStatement(sql, lData);
				
				for(int j = 0 ; chk_ID.length > j ; j++){
					dbmgr.pstmtSet(chk_ID[j]);
				}

				rtn = dbmgr.executeUpdate();

			
			}else if(aT.equals("upd")){  //수정
				
				sql = "UPDATE sgis_term 					\n";
				sql+= "SET  sgis_term_service =?,			\n";
				sql+= "		sgis_term_name =?,				\n";
				sql+= "		sgis_term_name_eng =?,			\n";
				sql+= "		sgis_term_desc =?				\n";
				sql+= "WHERE sgis_term_id = ? 				\n";
				
			
				dbmgr.prepareStatement(sql, lData);
				dbmgr.pstmtSet(lData.get("sgis_term_service"));
				dbmgr.pstmtSet(lData.get("sgis_term_name"));
				dbmgr.pstmtSet(lData.get("sgis_term_name_eng"));
				dbmgr.pstmtSet(lData.get("sgis_term_desc"));
				dbmgr.pstmtSet(lData.get("sgis_term_id"));
				
				System.out.println("sgis_term_service" + lData.get("sgis_term_service")); 
				System.out.println("sgis_term_name" + lData.get("sgis_term_name"));    
				System.out.println("sgis_term_name_eng" + lData.get("sgis_term_name_eng"));
				System.out.println("sgis_term_desc" + lData.get("sgis_term_desc"));
				System.out.println("sgis_term_id" + lData.get("sgis_term_id"));


				rtn = dbmgr.executeUpdate();
				
			}*/

		}catch(Exception e) {
			System.out.print("sgisWebError : ");
			out.print("<script>alert('정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요.'); history.back();</script> 정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요. <a href='shortcut_05_03.jsp'>돌아가기</a>");
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}

%>