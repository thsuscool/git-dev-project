<%--
/*
    ********************************************************************
    * @source      : supportProcess_02.jsp
    * @description : Q & A 게시판 DB처리 페이지
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
<%@ page import="java.awt.*"%>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@ page import="java.net.URLEncoder" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
    DbManager dbmgr = null;
    RecordModel rm = null;
    int rtn = 0;
    String savePath = sc_filePath + "/board";			//저장 위치
    int sizeLimit   = fileSizeLimit * 10;	//50M
    String formName = "";
    String fileName = "";


    try{
      dbmgr = new DbManager();
      MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
      Enumeration formNames  = multi.getFileNames();
      formName = (String)formNames.nextElement();	           //file tag명
      fileName = URLEncoder.encode(multi.getFilesystemName(formName), "KSC5601");	       //file tag내의 file명
      System.out.println(" ================================== ");
        System.out.println(" fileupload path = " + savePath+"/"+fileName);
        System.out.println(" application.getRealPath(fileName) = " + fileName);
      System.out.println(" ================================== ");
      Image image = Toolkit.getDefaultToolkit().getImage(application.getRealPath(fileName));
          int width = image.getWidth(null);
          int height = image.getHeight(null);
      if (!formName.equals("")) {
        out.println("{status:'UPLOADED', image_url:'/upload/board/"+fileName+"'}");
      } else {
        out.println("{status:'No file was submitted'}");
      }

          System.out.println(" ================================== ");
          System.out.println(width);System.out.println(height);

    }catch(Exception e){
      System.out.print("sgisWebError : ");
    	//2015-12-03 시큐어코딩
    	//e.printStackTrace();
    	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
      out.print("<script>alert('정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요.'); history.back();</script> 정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요.");
    }finally{
      dbmgr.close();
    }

%>