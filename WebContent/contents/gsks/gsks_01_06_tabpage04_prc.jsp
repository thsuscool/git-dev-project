<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%
	DbManager dmg = null;
	RecordModel rm = null;

	try {

		dmg = new DbManager();

		/*************************************/
		/* 대메뉴 등록, 수정 */
		/*************************************/
		if(lData.getString("gb").equals("HIGH")) {

			String sgis_menu_h_id = lData.getString("sgis_menu_h_id");
			String sgis_menu_h_name = lData.getString("sgis_menu_h_name");
			String status = lData.getString("status");
			String inUse = lData.getString("inUse");

			String[] list_sgis_menu_h_id = sgis_menu_h_id.split(",");
			String[] list_sgis_menu_h_name = sgis_menu_h_name.split(",");
			String[] list_status = status.split(",");
			String[] list_inUse = inUse.split(",");

			if(lData.getString("aT").equals("INS")) {

				for(int i=0; i < list_sgis_menu_h_id.length; i++) {

					//체크된것만 처리
					if(list_inUse[i].equals("Y")) {

						//등록
						if(list_status[i].equals("I")) {

							String isql = " insert into sgis_menu_high_code ";
											isql += " ( ";
											isql += "			sgis_menu_h_id ";
											isql += "					, sgis_menu_h_name ";
											isql += "	) ";
											isql += "	values ";
											isql += "	( ";
											isql += "	'"+list_sgis_menu_h_id[i]+"'";
											isql += "	, '"+list_sgis_menu_h_name[i]+"'";
											isql += "	) ";

											dmg.prepareStatement(isql);
											dmg.executeUpdate();

						//수정
						} else if(list_status[i].equals("U")) {

								String usql = " update sgis_menu_high_code set ";
												usql += "			 sgis_menu_h_name = '"+list_sgis_menu_h_name[i]+"' ";
												usql += " where sgis_menu_h_id = 	'"+list_sgis_menu_h_id[i]+"'";

											dmg.prepareStatement(usql);
											dmg.executeUpdate();

						}
					}
				}

			/******************************************************/
			/* 대메뉴 삭제 1.권한, log 삭제 - 2.서브메뉴삭제 - 3.대메뉴삭제 */
			/******************************************************/
			} else if(lData.getString("aT").equals("DEL")) {

				for(int i=0; i < list_sgis_menu_h_id.length; i++) {

					//체크된것만 처리
					if(list_inUse[i].equals("Y")) {

						/* 권한삭제를 위한 서브메뉴의 key select */
						String sql  = " select to_char(sgis_menu_d_code_id) sgis_menu_d_code_id  \n";
					         sql += "   from sgis_menu_config                                  \n";
					         sql += "  where sgis_menu_h_id = ?                                 ";

					  dmg.prepareStatement(sql);
					  dmg.pstmtSet(list_sgis_menu_h_id[i]);
					  rm = dmg.select();

					  if(rm != null) {
						  /* 권한삭제 */
						  while(rm.next()) {

							  String menu_d_id = StringUtil.verify((String)rm.get("sgis_menu_d_code_id"));

							  sql  = " delete from sgis_menu_d_auth_set  \n";
							  sql += "  where sgis_menu_d_code_id = ?      ";

							  dmg.prepareStatement(sql);
							  dmg.pstmtSet(menu_d_id);
							  dmg.execute();
						  }
						  rm.setIterator();

						  /* log삭제 */
						  while(rm.next()) {

							  String menu_d_id = StringUtil.verify((String)rm.get("sgis_menu_d_code_id"));

							  sql  = " delete from sgis_page_log      \n";
							  sql += "  where sgis_menu_d_code_id = ?   ";

							  dmg.prepareStatement(sql);
							  dmg.pstmtSet(menu_d_id);
							  dmg.execute();
						  }
					  }

					  /* 서브메뉴삭제 */
					  sql  = " delete from sgis_menu_config  \n";
					  sql += "  where sgis_menu_h_id = ?       ";

					  dmg.prepareStatement(sql);
					  dmg.pstmtSet(list_sgis_menu_h_id[i]);
					  dmg.execute();

					  /* 대메뉴삭제 */
						String dsql = " delete from sgis_menu_high_code ";
										dsql += "		where sgis_menu_h_id = '"+list_sgis_menu_h_id[i]+"' ";

										dmg.prepareStatement(dsql);
										dmg.executeUpdate();
					}
				}
			}

			out.print("<script>parent.location.href='gsks_01_06_tabpage04.jsp';</script>");

		} else if(lData.getString("gb").equals("SUB")) {
			/*************************************/
			/* 소메뉴 등록, 수정 */
			/*************************************/

			String[] menuId      = lData.getString("sgis_menu_d_code_id").split(",");
			String[] menuNm      = lData.getString("sgis_menu_d_name").split(",");
			String[] useYn       = lData.getString("sgis_menu_use_yn").split(",");
			String[] menuUrl     = lData.getString("sgis_menu_url").split(",");
			String[] popChk      = lData.getString("sgis_menu_pop_chk").split(",");
			String[] list_status = lData.getString("sub_status").split(",");
			String[] list_inUse  = lData.getString("sub_inUse").split(",");
			String h_id          = lData.getString("sgis_menu_h_id");

			if(lData.getString("aT").equals("INS")) {

				for(int i=0; i<menuId.length; i++) {

					if(list_inUse[i].equals("Y")) {	//체크된 항목만 insert

						if(list_status[i].equals("I")) {	//등록

							StringBuffer insertQuery = new StringBuffer(1024);

							insertQuery.append(" insert into sgis_menu_config ( \n");
							insertQuery.append("     sgis_menu_d_code_id        \n");
							insertQuery.append("    ,sgis_menu_d_name           \n");
							insertQuery.append("    ,sgis_menu_use_yn           \n");
							insertQuery.append("    ,sgis_menu_url              \n");
							insertQuery.append("    ,sgis_menu_h_id             \n");
							insertQuery.append("    ,sgis_menu_pop_chk          \n");
							insertQuery.append(" )values (                      \n");
							insertQuery.append("     ?                          \n");
							insertQuery.append("    ,?                          \n");
							insertQuery.append("    ,?                          \n");
							insertQuery.append("    ,?                          \n");
							insertQuery.append("    ,?                          \n");
							insertQuery.append("    ,?                          \n");
							insertQuery.append(" )                              \n");

							dmg.prepareStatement(insertQuery.toString());
							dmg.pstmtSet(menuId[i]);
							dmg.pstmtSet(menuNm[i]);
							dmg.pstmtSet(useYn[i]);
							dmg.pstmtSet(menuUrl[i]);
							dmg.pstmtSet(h_id);
							dmg.pstmtSet(popChk[i]);

							if(dmg.executeUpdate() > 0) {

								String[] auth = lData.getString("auth_new").split(",");

								for(int j=0; j<auth.length; j++) {
									insertQuery  = new StringBuffer(1024);

									insertQuery.append(" insert into sgis_menu_d_auth_set ( \n");
									insertQuery.append("     sgis_menu_d_code_id            \n");
									insertQuery.append("    ,sgis_auth_id                   \n");
									insertQuery.append(" )values (                          \n");
									insertQuery.append("     ?                              \n");
									insertQuery.append("    ,?                              \n");
									insertQuery.append(" )                                  \n");

									dmg.prepareStatement(insertQuery.toString());
									dmg.pstmtSet(menuId[i]);
									dmg.pstmtSet(auth[j]);

									dmg.executeUpdate();
								}
							}
						}else if(list_status[i].equals("U")) {	//수정

							StringBuffer updateQuery = new StringBuffer(1024);

							updateQuery.append(" update sgis_menu_config set      \n");
							updateQuery.append("     sgis_menu_d_name  = ?        \n");
							updateQuery.append("    ,sgis_menu_use_yn  = ?        \n");
							updateQuery.append("    ,sgis_menu_url     = ?        \n");
							updateQuery.append("    ,sgis_menu_pop_chk = ?        \n");
							updateQuery.append("  where sgis_menu_h_id      = ?   \n");
							updateQuery.append("    and sgis_menu_d_code_id = ?   \n");

							dmg.prepareStatement(updateQuery.toString());
							dmg.pstmtSet(menuNm[i]);
							dmg.pstmtSet(useYn[i]);
							dmg.pstmtSet(menuUrl[i]);
							dmg.pstmtSet(popChk[i]);
							dmg.pstmtSet(h_id);
							dmg.pstmtSet(menuId[i]);

							if(dmg.executeUpdate() > 0) {

								updateQuery = new StringBuffer(1024);

								/* 권한 delete */
								updateQuery.append(" delete from sgis_menu_d_auth_set   \n");
								updateQuery.append("  where sgis_menu_d_code_id = ?     \n");

								dmg.prepareStatement(updateQuery.toString());
								dmg.pstmtSet(menuId[i]);
								dmg.execute();

								if(!StringUtil.isEmpty(lData.getString("auth_"+menuId[i]))) {
									String[] auth = lData.getString("auth_"+menuId[i]).split(",");

									/* 권한 insert */
									for(int j=0; j<auth.length; j++) {
										updateQuery  = new StringBuffer(1024);

										updateQuery.append(" insert into sgis_menu_d_auth_set ( \n");
										updateQuery.append("     sgis_menu_d_code_id            \n");
										updateQuery.append("    ,sgis_auth_id                   \n");
										updateQuery.append(" )values (                          \n");
										updateQuery.append("     ?                              \n");
										updateQuery.append("    ,?                              \n");
										updateQuery.append(" )                                  \n");

										dmg.prepareStatement(updateQuery.toString());
										dmg.pstmtSet(menuId[i]);
										dmg.pstmtSet(auth[j]);

										dmg.executeUpdate();
									}
								}
							}
						}
					}
				}
			}else if(lData.getString("aT").equals("DEL")) {

				for(int i=0; i<menuId.length; i++) {

					if(list_inUse[i].equals("Y")) {	//체크된 항목만 delete

						StringBuffer deleteQuery = new StringBuffer(1024);

						/* 권한삭제 */
						deleteQuery.append(" delete from sgis_menu_d_auth_set   \n");
						deleteQuery.append("  where sgis_menu_d_code_id = ?     \n");

						dmg.prepareStatement(deleteQuery.toString());
						dmg.pstmtSet(menuId[i]);
						dmg.execute();

						/* log 삭제 */
						deleteQuery = new StringBuffer(1024);

						deleteQuery.append(" delete from sgis_page_log      \n");
						deleteQuery.append("  where sgis_menu_d_code_id = ? \n");

						dmg.prepareStatement(deleteQuery.toString());
						dmg.pstmtSet(menuId[i]);
						dmg.execute();


						deleteQuery = new StringBuffer(1024);
						/* 메뉴삭제 */
						deleteQuery.append(" delete from sgis_menu_config   \n");
						deleteQuery.append("  where sgis_menu_d_code_id = ? \n");
						deleteQuery.append("    and sgis_menu_h_id = ?      \n");

						dmg.prepareStatement(deleteQuery.toString());
						dmg.pstmtSet(menuId[i]);
						dmg.pstmtSet(h_id);

						dmg.executeUpdate();
					}
				}
			}

			out.print("<script>parent.location.href='gsks_01_06_tabpage04.jsp';</script>");
		}

	} catch(Exception e) {
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		dmg.close();
	}
%>

