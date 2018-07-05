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
		
		
		//String sgis_member_key = sc_userkey; //로그인한 사용자
		
		try{

			dbmgr = new DbManager();
	
			if(aT.equals("del")){  //삭제
				
				sql = "Update sgis_board 					\n";
				sql+= "SET sgis_board_use = 'N' 			\n";
				sql+= "WHERE sgis_board_seq = ?				\n";
				
				dbmgr.prepareStatement(sql, lData);
				dbmgr.pstmtSet(lData.get("sgis_board_seq"));
				rtn = dbmgr.executeUpdate();
			
			}

      if(rtn > 0) 
				response.sendRedirect("gsks_01_06_tabpage01.jsp"); //성공인경우

		}catch(Exception e){
			System.out.println("------------------>"+e);
			response.sendRedirect("gsks_01_06_tabpage01.jsp"); //실패인경우
		}finally{
			dbmgr.close();
		}

%>