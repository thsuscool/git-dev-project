<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage01_prc.jsp
    * @description : 관리자 - 공지사항 게시판 DB 처리
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
<%@ include file="/contents/include/logger.jsp"%>
<%

        GeneralBroker broker = null;
        RecordModel rm = null;
        String sql = "";
        String aT = "";
        int rtn = 0;
        String sgis_member_key = sc_userkey;
        lData.set("sgis_member_key",sgis_member_key);


        //sc_filePath = "D:/test";
        String savePath = sc_filePath + "/board";
        int sizeLimit   = fileSizeLimit * 10;	//50M
        String formName = "";
        String fileName = "";
        String fileName2 = "";
        String sendPage = "gsks_01_06_tabpage01.jsp";
        String sgis_board_file_zone="";
        String button_info = "";


        try{

            MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
            Enumeration formNames  = multi.getFileNames();

            int i=0;
            while(formNames.hasMoreElements()) {
                formName = (String)formNames.nextElement();
                if(i == 0) fileName = multi.getFilesystemName(formName);
                else fileName2 = multi.getFilesystemName(formName);

                lData.set(formName, fileName);
                i++;
            }

            aT = multi.getParameter("aT");

            String sgis_board_file_loc = "";
            String sgis_board_file_type = "";
            if(fileName!=null && fileName.indexOf(".") > -1){
                sgis_board_file_loc = fileName;
                sgis_board_file_type = "";//fileName.substring( fileName.indexOf(".")+1, fileName.length() );
            }
            String ssss = "";
            button_info = multi.getParameter("button_info");//.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;");//.replaceAll("<","&lt;").replaceAll(">","&gt;");
            ssss = button_info.replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
            
            String imgkey = (multi.getParameter("sgis_img_key_chk")==null)? "":multi.getParameter("sgis_img_key_chk");
            String sKey = (String) request.getSession().getAttribute("imgkey");
            sKey = "admin";
            
            
            if(imgkey.equals(sKey) || aT.equals("del")){
            System.out.println("1 ---------------------------------- "+  ssss);            
            System.out.println("1 ---------------------------------- button_info"+  button_info);            
            
            lData.set("sgis_board_id",multi.getParameter("sgis_board_name"));
            lData.set("sgis_board_title",multi.getParameter("sgis_board_title"));
            lData.set("sgis_board_desc",multi.getParameter("sgis_board_desc"));
            lData.set("sgis_board_pop_start",multi.getParameter("sgis_board_pop_start"));
            lData.set("sgis_board_pop_end",multi.getParameter("sgis_board_pop_end"));
            lData.set("sgis_board_pop_chk",multi.getParameter("sgis_board_pop_chk"));
            lData.set("sgis_board_pop_width",multi.getParameter("sgis_board_pop_width"));
            lData.set("sgis_board_pop_height",multi.getParameter("sgis_board_pop_height"));
            lData.set("sgis_board_file_loc",sgis_board_file_loc);
            lData.set("sgis_board_file_type",sgis_board_file_type);
            lData.set("zone_yn",multi.getParameter("zone_yn"));
            lData.set("sgis_board_url",multi.getParameter("sgis_board_url"));
            lData.set("sgis_board_alt",multi.getParameter("sgis_board_alt"));
            lData.set("sgis_board_file_zone",fileName2);
            lData.set("ui_code",multi.getParameter("ui_code"));
            lData.set("button_info",ssss);
			

            if(aT.equals("ins")){  //등록
                broker = new GeneralBroker("adfa00");
                //최대값 SEQ

                String maxSeq = "";
                lData.setNumber("SEQ", 4);
                rm = broker.getList(lData);

                if(rm.next()) {
                    maxSeq = StringUtil.verify((String)rm.get("seq"));
                }

                lData.set("maxSeq",maxSeq);
                
                String sgis_board_name = "";
                lData.setNumber("SEQ", 6);
                rm = broker.getList(lData);

                if(rm.next()) {
                	sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name_desc"));
                }
                lData.set("sgis_board_name",sgis_board_name);
				
                if(multi.getParameter("button_info").equals("")){
                	System.out.println("1111111111");
                	lData.setNumber("SEQ", 1);
                    broker.process(Const.P_INS, lData);
                }else{
                	System.out.println("22222222222");
                	lData.setNumber("SEQ", 2);
                    broker.process(Const.P_INS, lData);
                }
                
                sendPage = "gsks_01_06_tabpage01_view.jsp?sgis_board_seq=" + maxSeq;
            }else if(aT.equals("del")){  //삭제
                broker = new GeneralBroker("adfa00");
                lData.set("sgis_board_seq",multi.getParameter("sgis_board_seq"));

                lData.setNumber("SEQ", 2);
                broker.process(Const.P_UPD, lData);

            }else if(aT.equals("upd")){  //수정
                broker = new GeneralBroker("adfa00");
                lData.set("sgis_board_seq",multi.getParameter("sgis_board_seq"));
                
                String sgis_board_name = "";
                lData.setNumber("SEQ", 6);
                rm = broker.getList(lData);

                if(rm.next()) {
                	sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name_desc"));
                }
                lData.set("sgis_board_name",sgis_board_name);

                lData.setNumber("SEQ", 3);
                broker.process(Const.P_UPD, lData);

                sendPage = "gsks_01_06_tabpage01_view.jsp?sgis_board_seq=" + multi.getParameter("sgis_board_seq");
            }
            }else{
            	out.print("<script>alert('등록확인 키가 틀렸습니다. 다시 확인해주세요.');</script>");
            	response.sendRedirect("gsks_01_06_tabpage01.jsp"); //실패인경우
            }
        }catch(Exception e){
            System.out.print("sgisWebError : ");
          	//2015-12-03 시큐어코딩	
          	//e.printStackTrace();
          	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
            out.print("<script>alert('정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요.');");
            response.sendRedirect("gsks_01_06_tabpage01.jsp"); //실패인경우
        }finally{
            response.sendRedirect(sendPage);
        }

%>