<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage03_prc.jsp
    * @description : 관리자 - Q & A 게시판 DB처리
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
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%
        DbManager dbmgr = null;
        RecordModel rm = null;
        String sql = "";
        String aT = "";
        int rtn = 0;
        String sucessUrl = "gsks_01_06_tabpage03.jsp";

        String savePath = sc_filePath + "/board";			//저장 위치
        int sizeLimit   = fileSizeLimit * 10;	//50M
        String formName = "";
        String fileName = "";

        try{

            dbmgr = new DbManager();
            MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
            Enumeration formNames  = multi.getFileNames();
            try{
                formName = (String)formNames.nextElement();														//file tag명
                fileName = multi.getFilesystemName(formName);													//file tag내의 file명
            }catch(Exception e){
            }
            aT = multi.getParameter("aT");

            String sgis_board_file_loc = "";
            String sgis_board_file_type = "";

            if(fileName!=null && fileName.indexOf(".") > -1){
                sgis_board_file_loc = fileName;
                sgis_board_file_type = "";//fileName.substring( fileName.indexOf(".")+1, fileName.length() );
            }

            lData.set("user",sc_userkey);
            lData.set("sgis_board_file_loc",sgis_board_file_loc);
            lData.set("sgis_board_file_type",sgis_board_file_type);

            lData.set("sgis_board_title",multi.getParameter("sgis_board_title"));
            lData.set("sgis_board_name",multi.getParameter("sgis_board_name"));
            lData.set("sgis_board_desc",multi.getParameter("sgis_board_desc"));

            lData.set("sgis_board_seq",multi.getParameter("sgis_board_seq"));
            lData.set("sgis_board_rep_seq",multi.getParameter("sgis_board_rep_seq"));

            if(aT.equals("ins")){  //등록
                //최대값 SEQ
                String maxSeq = "";
                sql =  " SELECT to_char(NVL(MAX(sgis_board_seq),0)+1) as seq FROM SGIS_BOARD ";
                dbmgr.prepareStatement(sql);
                rm = dbmgr.select();

                if(rm.next()) {
                    maxSeq = StringUtil.verify((String)rm.get("seq"));
                }

                sql = "INSERT INTO  SGIS_BOARD ( \n";
                sql+= "sgis_board_id, sgis_board_seq, sgis_board_rep_seq, sgis_board_title, sgis_board_name, \n";
                sql+= "sgis_board_file_loc, sgis_board_file_type,  \n";
                sql+= "sgis_board_desc, sgis_board_cou, sgis_board_use, create_user, create_date, sgis_member_key) \n";
                sql+= "values (20000," + maxSeq + ", 0, :sgis_board_title, :sgis_board_name, \n";
                sql+= ":sgis_board_file_loc, :sgis_board_file_type, \n";
                sql+= ":sgis_board_desc, 0, 'Y', :user, sysdate, :user ) \n";

                dbmgr.prepareStatement(sql, lData);
                rtn = dbmgr.executeUpdate();

            }else if(aT.equals("del")){  //삭제

                sql = "UPDATE SGIS_BOARD 			                                       	\n";
                sql+= "     SET sgis_board_use = 'N' 	                              	\n";
                sql+= " WHERE sgis_board_seq = :sgis_board_seq			          \n";
                sql+= "     AND sgis_board_rep_seq = :sgis_board_rep_seq		\n";

                dbmgr.prepareStatement(sql, lData);
                rtn = dbmgr.executeUpdate();

            }else if(aT.equals("upd")){  //수정

                sql = "UPDATE SGIS_BOARD                                   \n";
                sql+= "SET sgis_board_title =:sgis_board_title,	        	\n";
                sql+=  "      sgis_board_name =:sgis_board_name,			\n";
                sql+=  "      sgis_board_desc =:sgis_board_desc,		   	\n";

                if(!lData.get("sgis_board_file_loc").equals("")){
                    sql+=  " sgis_board_file_loc = :sgis_board_file_loc,     \n";
                    sql+=  " sgis_board_file_type = :sgis_board_file_type,  \n";
                }

                sql+=  "      last_update_user = :user,		                    	\n";
                sql+=  "      last_update_date = sysdate 	                  	\n";
                sql+=  "WHERE sgis_board_seq =:sgis_board_seq	      \n";
                sql+=  "    AND sgis_board_rep_seq = :sgis_board_rep_seq \n";

                dbmgr.prepareStatement(sql, lData);
                rtn = dbmgr.executeUpdate();

                if(rtn>0) sucessUrl = "gsks_01_06_tabpage03_view.jsp?sgis_board_seq="+lData.get("sgis_board_seq") + "&sgis_board_rep_seq="+lData.get("sgis_board_rep_seq");

            }else if(aT.equals("rep")){ //답글
                //REP SEQ
                String repSeq = "";
                sql =  " SELECT to_char(NVL(MAX(sgis_board_rep_seq),0)+1) as repseq FROM sgis_board where sgis_board_seq = :sgis_board_seq";
                dbmgr.prepareStatement(sql, lData);
                rm = dbmgr.select();

                if(rm.next()) {
                    repSeq = StringUtil.verify((String)rm.get("repseq"));
                }

                //답변등록
                String seq = lData.get("sgis_board_seq");

                sql = "INSERT INTO  SGIS_BOARD ( \n";
                sql+= "sgis_board_id, sgis_board_seq, sgis_board_rep_seq, sgis_board_title, sgis_board_name, \n";
                sql+= "sgis_board_file_loc, sgis_board_file_type,  \n";
                sql+= "sgis_board_desc, sgis_board_cou, sgis_board_use, create_user, create_date, sgis_member_key) \n";
                sql+= "values (20000,:sgis_board_seq, " + repSeq + ", :sgis_board_title, :sgis_board_name, \n";
                sql+= ":sgis_board_file_loc, :sgis_board_file_type, \n";
                sql+= ":sgis_board_desc, 0, 'Y', :user, sysdate, :user) \n";

                dbmgr.prepareStatement(sql, lData);
                rtn = dbmgr.executeUpdate();
            }

      if(rtn > 0)
                response.sendRedirect(sucessUrl); //성공인경우

        }catch(Exception e){
            System.out.println("------------------>"+e);
            response.sendRedirect("gsks_01_06_tabpage03.jsp"); //실패인경우
            //response.sendRedirect("errorPage.jsp"); //lkh 2014.05.13 에러일경우에 에러페이지 가도록 수정
        }finally{
            dbmgr.close();
        }

%>