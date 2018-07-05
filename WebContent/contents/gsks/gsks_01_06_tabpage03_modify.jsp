<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage03_modify.jsp
    * @description : 관리자 - Q & A 게시판 수정
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-17   김경열         1.0
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
    String leftMenu="supprot";

    DbManager dbmgr = null;
    RecordModel rm = null;
    StringBuffer sb = new StringBuffer(1024);
    String aT = "";
    String seq = "";
    String rep_seq = "";
    int pg = 0;

    String sgis_board_seq = "" ;
    String sgis_board_rep_seq = "" ;
    String sgis_board_title = "" ;
    String sgis_board_name = "" ;
    String sgis_board_desc = "" ;
    String sgis_board_cou = "" ;
    String sgis_board_file_loc = "" ;
    String create_date = "" ;

    String savePath = sc_filePath + "/board";			//저장 위치
    int sizeLimit   = fileSizeLimit * 10;	//50M
    String formName = "";
    String fileName = "";
  MultipartRequest multi = null;

    try{

        dbmgr = new DbManager();

        multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
        Enumeration formNames  = multi.getFileNames();

        try{
            formName = (String)formNames.nextElement();														//file tag명
            fileName = multi.getFilesystemName(formName);													//file tag내의 file명
        }catch(Exception e){
        }

        aT = multi.getParameter("aT");
        seq = multi.getParameter("sgis_board_seq");
        rep_seq = multi.getParameter("sgis_board_rep_seq");
        if(multi.getParameter("pg")==null)
            pg = 1;
        else
            pg = Integer.parseInt(multi.getParameter("pg"));


        //-- 게시글 조회
        sb = new StringBuffer(1024);

        sb.append("select                                   							  \n");
        sb.append("to_char(sgis_board_seq) as sgis_board_seq,     					      \n");
        sb.append("to_char(sgis_board_rep_seq) as sgis_board_rep_seq,					  \n");
        sb.append("sgis_board_title,                              						  \n");
        sb.append("sgis_board_name,                          							  \n");
        sb.append("sgis_board_desc,                           							  \n");
        sb.append("to_char(sgis_board_cou) as sgis_board_cou,          					  \n");
        sb.append("to_char(create_date, 'YYYY-MM-DD') as create_date,				  \n");
        sb.append("sgis_board_file_loc				  \n");
        sb.append("from sgis_board                        								  \n");
        sb.append("where sgis_board_seq = ? and sgis_board_rep_seq = ? ;   				  \n");

        dbmgr.prepareStatement(sb.toString());
        dbmgr.pstmtSet(seq);
        dbmgr.pstmtSet(rep_seq);
        rm = dbmgr.select();

        while(rm!=null && rm.next()) {

            sgis_board_seq = StringUtil.verify((String)rm.get("sgis_board_seq"));
            sgis_board_rep_seq = StringUtil.verify((String)rm.get("sgis_board_rep_seq"));
            sgis_board_title = StringUtil.verify((String)rm.get("sgis_board_title"));
            sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name"));
            sgis_board_desc = StringUtil.verify((String)rm.get("sgis_board_desc"));
            sgis_board_cou = StringUtil.verify((String)rm.get("sgis_board_cou"));
            sgis_board_file_loc = StringUtil.verify((String)rm.get("sgis_board_file_loc"));
            create_date = StringUtil.verify((String)rm.get("create_date"));
        }


    }catch(Exception e){
          System.out.println("------------->"+e);
    }finally{
        dbmgr.close();
    }
%>

    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
<SCRIPT LANGUAGE="JavaScript">
<!--
function calender_view(data){
    if(data=="on")document.getElementById('popup_calendar').style.display="block";
    if(data=="off")document.getElementById('popup_calendar').style.display="none";
}
//-->
</script>
<script src=/contents/scripts/common.js></script>
<script src=/contents/gsks/scripts/gsks_01_06_tabpage03.js></script>
<form name="fm" method="post" enctype="multipart/form-data">
    <input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
    <input type="hidden" name="pg"    value="<%=pg%>">
    <!-- 상세조회 -->
    <input type="hidden" name="sgis_board_seq" value="<%=seq %>" >
    <input type="hidden" name="sgis_board_rep_seq" value="<%=rep_seq %>">
    <input type="hidden" name="user" value="<%=lData.get("user") %>">

  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>

        <div class="clear"></div>
      <div class="content_title_1">
        <div class="content_title_2">사이트관리</div>
        <ul class="navigation">
          <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
          <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">사이트관리</a></li>
        </ul>
      </div>
        <div class="content">
      <div class="admin_tab_button">
        <table border=0>
                <tr>
                    <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
                        <a href="gsks_01_06_tabpage01.jsp"><strong>공지사항</strong></a></td>
                    <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
                        <a href="gsks_01_06_tabpage02.jsp"><strong>FAQ</strong></a></td>
                    <td width="140" height="25" align="center" bgcolor="#00BFFF">
                        <a href="gsks_01_06_tabpage03.jsp"><font color="#FFFFFF"><strong>Q&A</strong></font></a></td>
                    <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
                        <a href="gsks_01_06_tabpage04.jsp"><strong>메뉴</strong></a></td>
                    <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
                        <a href="gsks_01_06_tabpage06.jsp"><strong>메인메뉴</strong></a></td>
                    <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
                        <a href="gsks_01_06_tabpage05.jsp"><strong>용어설명관리</strong></a></td>
                </tr>
                <tr>
                    <td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
                </tr>
            </table>
        <div class="clear"></div>
      </div>
              <div class="site_control_write">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table1" summary="사이트관리에 대한 내용입니다.">
              <caption>사이트관리</caption>
              <tr>
                <th width="100" class="td_top"><center>제목</center></th>
                <td class="td_top t_end">
                <label>
                <input name="sgis_board_title" type="text" size="100" maxlength="25" value="<%=sgis_board_title %>" />
                  </label>
                </th>
              </tr>
              <tr>
                <th><center>서비스</center></th>
                <td class="t_end"><label>
                  <select name="sgis_board_name" class="inout_short">
                     <option value="지식정보" <% if(sgis_board_name.equals("지식정보")) out.println("selected"); %>>지식정보</option>
                     <option value="서비스정보" <% if(sgis_board_name.equals("서비스정보")) out.println("selected"); %>>서비스정보</option>
                     <option value="openAPI" <% if(sgis_board_name.equals("openAPI")) out.println("selected"); %>>openAPI</option>
                     <option value="내비게이터" <% if(sgis_board_name.equals("내비게이터")) out.println("selected"); %>>내비게이터</option>
                     <option value="민간" <% if(sgis_board_name.equals("민간")) out.println("selected"); %>>민간</option>
                     <option value="공공" <% if(sgis_board_name.equals("공공")) out.println("selected"); %>>공공</option>
                     <option value="기타" <% if(sgis_board_name.equals("기타")) out.println("selected"); %>>기타</option>
                  </select>
                </label></td>
              </tr>
          <tr>
            <th><center>첨부파일</center></th>
            <td class="t_end">
                <%=!sgis_board_file_loc.equals("")? sgis_board_file_loc+"<br>":""%>
                            <input name="file" type="file" size="70" class="input_mid" />
            </td>
          </tr>
              <tr>
                <th><center>내용</center></th>
                <td class="t_end"><textarea name="sgis_board_desc" class="add_text" cols="80" rows="20" onkeyup="len_chk('4000');"><%=sgis_board_desc %></textarea></td>
              </tr>
              </table>
              </div>
              <div class="site_control_write_button">
                   <img src="/contents/gsks/images/button_ok.gif" alt="확인" border="0" onclick="javascript:updateProcess();" style="cursor:hand"/>
                  <a href="gsks_01_06_tabpage03.jsp"><img src="/contents/gsks/images/admin_01_03_tab_page_01_button_03.gif" alt="취소" border="0" /></a>
              </div>
          </div>
     </div>
</div>
<div class="clear"></div>
</form>

<%@ include file="/contents/gsks/include/footer.jsp" %>
