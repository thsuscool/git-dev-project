<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage05_prc.jsp
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
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%
		DbManager dbmgr = null;
		RecordModel rm = null;
		String sql = "";
		String aT = lData.get("aT");
		int rtn = 0;
		
		try{

			dbmgr = new DbManager();
	
			if(aT.equals("ins")){  //등록
				//최대값 SEQ
				String maxSeq = "";
				sql =  " SELECT to_char(NVL(MAX(sgis_term_id),0)+1) as seq FROM sgis_term ";	
				dbmgr.prepareStatement(sql);
				rm = dbmgr.select();
			
				if(rm.next()) {
					maxSeq = StringUtil.verify((String)rm.get("seq"));
				}

				sql = "INSERT INTO  sgis_term ( 																\n";
				sql+= "sgis_term_id, sgis_term_service, sgis_term_name, sgis_term_name_eng, sgis_term_desc ) 	\n";
				sql+= "VALUES ( " + maxSeq + ", ?, ?, ?, ? )													\n";

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
				
			}

      if(rtn > 0) 
				response.sendRedirect("gsks_01_06_tabpage05.jsp"); //성공인경우

		}catch(Exception e){
			System.out.println("------------------>"+e);
			response.sendRedirect("gsks_01_06_tabpage05.jsp"); //실패인경우
		}finally{
			dbmgr.close();
		}

%>