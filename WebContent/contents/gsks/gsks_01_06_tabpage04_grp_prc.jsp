<%--
/*********************************************************
 * @source      : gsks_01.jsp
 * @description : 관리자 / 메뉴관리 / 그룹 관리 Process 페이지
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008.11.20   SHIN HYUN MYUNG         최초등록
 *********************************************************
--%>

<%@ page language="java" contentType="text/html;charset=utf-8" %>

<%@ page import="kr.co.offton.jdf.db.RecordModel"                %>
<%@ page import="kr.co.offton.jdf.db.DbManager"                  %>

<%@ include file="/contents/include/comVarCoding.jsp"            %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	DbManager dbmgr = null;
	RecordModel rm  = null;

	String aT = lData.getString("aT");

	try {

		dbmgr = new DbManager();

		/************************ process start ************************/
		String authId[]      = lData.getString("auth_id").split(",");
		String authName[]    = lData.getString("auth_name").split(",");
		String[] list_status = lData.getString("status").split(",");
		String[] list_inUse  = lData.getString("inUse").split(",");

		if(aT.equals("INS")) {

			for(int i=0; i<authId.length; i++) {

				if(list_inUse[i].equals("Y")) {			//체크된 항목

					if(list_status[i].equals("I")) {	//등록

						StringBuffer query = new StringBuffer(1024);

						query.append(" insert into sgis_auth_id (   \n");
						query.append("     sgis_auth_id             \n");
						query.append("    ,sgis_auth_name           \n");
						query.append(" )values (                    \n");
						query.append("     ?                        \n");
						query.append("    ,?                        \n");
						query.append(" )                            \n");

						dbmgr.prepareStatement(query.toString());
						dbmgr.pstmtSet(authId[i]);
						dbmgr.pstmtSet(authName[i]);

						dbmgr.execute();
					}else if(list_status[i].equals("U")) {	//수정

						StringBuffer query = new StringBuffer(1024);

						query.append(" update sgis_auth_id set  \n");
						query.append("     sgis_auth_name  = ?  \n");
						query.append("  where sgis_auth_id = ?  \n");

						dbmgr.prepareStatement(query.toString());
						dbmgr.pstmtSet(authName[i]);
						dbmgr.pstmtSet(authId[i]);

						dbmgr.execute();
					}
				}//end of check condition
			}//end of auth_id for loop
		}else if(aT.equals("DEL")) {

			String delstat = "";
			for(int i=0; i<authId.length; i++) {

				if(list_inUse[i].equals("Y")) {	//체크된 항목

					StringBuffer query = new StringBuffer(1024);

					query.append(" select case when mem_cnt = 0 and menu_cnt = 0 then 'Y'   \n");
					query.append("             else 'N'                                     \n");
					query.append("         end delete_yn                                    \n");
					query.append("   from                                                   \n");
					query.append("   (                                                      \n");
					query.append("     select                                               \n");
					query.append("      (select count(*)                                    \n");
					query.append("       from sgis_member_info                              \n");
					query.append("      where sgis_auth_id = ?                              \n");
					query.append("      ) mem_cnt                                           \n");
					query.append("     ,(select count(*)                                    \n");
					query.append("       from sgis_menu_d_auth_set                          \n");
					query.append("      where sgis_auth_id = ?                              \n");
					query.append("      ) menu_cnt                                          \n");
					query.append("       from dual                                          \n");
					query.append("   )                                                      \n");

					dbmgr.prepareStatement(query.toString());
					dbmgr.pstmtSet(authId[i]);
					dbmgr.pstmtSet(authId[i]);
					rm = dbmgr.select();

					if(rm != null && rm.next())	delstat = StringUtil.verify((String)rm.get("delete_yn"));
					if(delstat.equals("N")) {

						out.print("<script>alert('"+authId[i]+" 권한에 관련된 사용자와 메뉴를 먼저 삭제하신후에 권한을 삭제하실수 있습니다.');</script>");
						break;
					}else {

						query = new StringBuffer(1024);
						query.append(" delete from sgis_auth_id \n");
						query.append("  where sgis_auth_id = ?  \n");

						dbmgr.prepareStatement(query.toString());
						dbmgr.pstmtSet(authId[i]);

						dbmgr.execute();
					}
				}
			}
		}//end of aT condition
		/************************* process end *************************/
	}catch(Exception e) {

		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}finally {

		if(dbmgr != null)	dbmgr.close();
	}

	out.print("<script>parent.location.href='gsks_01_06_tabpage04_grp.jsp';</script>");
	//response.sendRedirect("gsks_01_06_tabpage04_grp.jsp");
%>