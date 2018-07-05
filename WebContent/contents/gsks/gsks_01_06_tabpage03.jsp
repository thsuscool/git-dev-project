<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage03.jsp
    * @description : 관리자 - Q & A 게시판 리스트
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-17   김경열         1.0
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="kr.co.offton.jdf.db.*" %>
<%@ page import="kr.co.offton.pdf.basis.*"%>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
    String leftMenu="supprot";

        /* multi-form 처리  */
    if(StringUtil.verify_s(request.getContentType()).indexOf("multi") > -1){		//multi-form 인경우
            String savePath = sc_filePath + "/board";
            int sizeLimit   = fileSizeLimit * 10;	//50M
            MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
            lData.set("cond_service", multi.getParameter("cond_service"));  //서비스구준
            lData.set("cond_type", multi.getParameter("cond_type"));  //조회조건
            lData.set("cond_text", multi.getParameter("cond_text"));    //검색어
            lData.set("pg", multi.getParameter("pg"));    //페이지
    }

    DbManager dbmgr = null;
    RecordModel rm = null;
    StringBuffer sb = new StringBuffer(1024);
    String aT = lData.get("aT");
    String cond_service = lData.get("cond_service");	  //서비스조건
    String cond_type = lData.get("cond_type");	  //조회조건
    String cond_text = lData.get("cond_text");	  //검색어

    int rtn = 0;
    /* paging 초기화  */
    int pg = lData.getInt("pg");
    int pgSize = 10;
    int blockSize = 10;
    int totPage   = 1;
    int totCount  = 0;
    if(pg==0) pg = 1;

    try{

        dbmgr = new DbManager();

        sb.append("SELECT																\n");
        sb.append("	to_char(sgis_board_seq) as sgis_board_seq,							\n");
        sb.append("	to_char(sgis_board_rep_seq) as sgis_board_rep_seq,					\n");
        sb.append("	sgis_board_title,													\n");
        sb.append("	sgis_board_name,													\n");
        sb.append("	sgis_board_cou,														\n");
        sb.append(" (select sgis_name from  sgis_member_info 							\n");
        sb.append(" WHERE  sgis_member_key = a.create_user) as sgis_name, 				\n");
        sb.append("	create_date FROM ( 													\n");
        sb.append("				SELECT													\n");
        sb.append("					sgis_board_seq,										\n");
        sb.append("					sgis_board_rep_seq,									\n");
        sb.append("					sgis_board_title,									\n");
        sb.append("					sgis_board_name,create_user,						\n");
        sb.append("					to_char(sgis_board_cou) as sgis_board_cou,			\n");
        sb.append("					to_char(create_date, 'YYYY-MM-DD') as create_date	\n");
        sb.append("					FROM  sgis_board	 								\n");
        sb.append("						  WHERE sgis_board_id = 20000					\n");
        sb.append("						  AND sgis_board_use = 'Y'						\n");

        //검색조건 처리
        if(!cond_text.equals("")){
            if(cond_type.equals("")){  //제목,내용 전체 검색
                sb.append("   AND ( sgis_board_title LIKE '%'||'"+cond_text+"'||'%'  OR sgis_board_desc LIKE '%'||'"+cond_text+"'||'%' )  \n");
            }else if(cond_type.equals("title")){
                sb.append("   AND ( sgis_board_title LIKE '%'||'"+cond_text+"'||'%' )  \n");
            }else if(cond_type.equals("contents")){
                sb.append("   AND ( sgis_board_desc LIKE '%'||'"+cond_text+"'||'%' )  \n");
            }
        }

        if(!cond_service.equals("")){
            sb.append("   AND ( sgis_board_name LIKE '%'||'"+cond_service+"'||'%' )  \n");
        }

        sb.append(" ORDER BY sgis_board_seq desc, sgis_board_rep_seq	 \n");
        sb.append(" ) a	 \n");


        dbmgr.prepareStatement(sb.toString());
        rm = dbmgr.select();

        totCount = rm.getRowCount();	//리스트 전체 수

        rm = dbmgr.select(pg, pgSize);   //page 처리 list

    }catch(Exception e){
          System.out.println("------------->"+e);
    }finally{
        dbmgr.close();
    }

    /*  block 처리 */
    totPage  = totCount / pgSize;
    if (totCount%pgSize > 0) totPage++;

    int totalBlock = totPage/blockSize;
    if(totPage%blockSize > 0) totalBlock++;
    int block = pg/blockSize;
    if(pg % blockSize > 0) block++; //현재블럭표시

    int firstPage = (block-1)*blockSize + 1;
    int lastPage = block*blockSize;

    if(totalBlock <= block) {
        lastPage = totPage;
    }

%>


<script type="text/JavaScript">
<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</script>
<script type="text/javascript">

window.onload = function() {

}

function list(pg){
    fm.pg.value = pg;
    fm.submit();
}


function goDetailView(key1,key2) {

    fm.sgis_board_seq.value   = key1;
    fm.sgis_board_rep_seq.value   = key2;

    fm.action = 'gsks_01_06_tabpage03_view.jsp';
    fm.submit();
}

//성명 검색어 입력후 엔터키 입력시 자동조회
function passEnter(){
    if ( event.keyCode == 13 ) list(1);
}

</script>
<body onLoad="MM_preloadImages('images/site_control_tab01_over.gif','images/site_control_tab02_over.gif','images/site_control_tab03_over.gif','images/site_control_tab04_over.gif','images/site_control_tab05_over.gif')">
<form name="fm" method="post">
<input type="hidden" name="aT"    value="<%=lData.get("aT")%>"/>
<input type="hidden" name="pg"    value="<%=pg%>"/>
<input type="hidden" name="check_ID" value=""/>

<!-- 상세조회 -->
<input type="hidden" name="sgis_board_seq" />
<input type="hidden" name="sgis_board_rep_seq" />
<input type="hidden" name="create_user" />

  <div class="admin_content">
  <div class="admin_middle_title">

    <div class="middle_menu">
      <div class="menu_1" align="center"><a href="/contents/gsks/gsks_01.jsp" class="menu_link">사용자 관리</a></div>
      <div class="menu_2" align="center"><a href="/contents/gsks/gsks_01_02.jsp" class="menu_link">지식정보관리</a></div>
      <div class="menu_3" align="center"><a href="/contents/gsks/gsks_01_03.jsp" class="menu_link">OpenAPI인증키 관리</a></div>
      <div class="menu_4" align="center"><a href="/contents/gsks/gsks_01_04.jsp" class="menu_link">센서스경계 자료제공</a></div>
      <div class="menu_5" align="center"><a href="/contents/gsks/gsks_01_05.jsp" class="menu_link">로그 및 통계조회</a></div>
      <div class="menu_6" align="center"><a href="/contents/gsks/gsks_01_06.jsp" class="menu_link">사이트관리</a></div>
      <div class="menu_7" align="center"><a href="/contents/gsks/gsks_01_07.jsp" class="menu_link">시스템관리</a></div>
    </div>
  </div>
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
      <div class="clear site_control_table left_mar_10">
  <table width="100%" cellpadding="0" cellspacing="0" class="table1" summary="사이트관리에 대한 내용입니다." >
    <caption>
    사이트관리
    </caption>
    <thead>
      <tr>
        <th class="td_top">NO</th>
        <th class="td_top">시스템</th>
        <th class="td_top">제목</th>
        <th class="td_top">작성자</th>
        <th class="td_top">등록일자</th>
        <th class="t_end td_top">조회수</th>
      </tr>
    </thead>
    <tbody>
            <%
            int rowNum = totCount - ((pg - 1) * pgSize); //글번호

            while(rm!=null && rm.next()) {

                String sgis_board_seq = StringUtil.verify((String)rm.get("sgis_board_seq "));
                String sgis_board_rep_seq = StringUtil.verify((String)rm.get("sgis_board_rep_seq "));
                String sgis_board_title = StringUtil.verify((String)rm.get("sgis_board_title "));
                String sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name "));
                String sgis_board_cou = StringUtil.verify((String)rm.get("sgis_board_cou "));
                String create_date = StringUtil.verify((String)rm.get("create_date "));
                String sgis_name = StringUtil.verify((String)rm.get("sgis_name "));

                if(sgis_board_rep_seq.equals("0")){
        %>
      <tr>
        <td><%=rowNum-- %></td>
        <td><%=sgis_board_name %></td>
        <td class="cell_left">
            <a href="javascript:goDetailView('<%=sgis_board_seq %>','<%=sgis_board_rep_seq %>');">
               <img src="/contents/support/images/q_button.gif" border="0">
            <%=sgis_board_title %>
        </td>
        <td><%=sgis_name %></td>
        <td><%=create_date %></td>
        <td class="t_end cell_center"><%=sgis_board_cou %></td>
      </tr>
      <%		}else{%>
      <tr>
        <td><%=rowNum-- %></td>
        <td><%=sgis_board_name %></td>
        <td class="cell_left">
            <a href="javascript:goDetailView('<%=sgis_board_seq %>','<%=sgis_board_rep_seq %>');">
            <img src="/contents/support/images/a_button.gif" border="0">
            <%=sgis_board_title %>
        </td>
        <td><%=sgis_name %></td>
        <td><%=create_date %></td>
        <td class="t_end cell_center"><%=sgis_board_cou %></td>
      </tr>
      <%
                  }
        }
      %>
    </tbody>
  </table>
<div class="list_btn_right">
    <a href="/contents/gsks/gsks_01_06_tabpage03_write.jsp"><img src="/contents/gsks/images/button_write.gif" alt="등록" border="0" /></a>
    </div>
  <div class="clear"></div>

 <!-- nodata 처리 -->
 <%@ include file="/contents/include/nodata.jsp" %>
 <!-- nodata 처리 -->

 <!-- page 처리 -->
 <%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->
        <div class="clear"></div>

            <table width="734" border="0" height="30" >
                <tr>
                    <td align="left">
                        <select class="search_sel" style="width:145" name="cond_service">
                            <option value=""  <%=cond_service.equals("")? "selected":""%>>서비스전체</option>
                            <option value="통계내비게이터" <%=cond_service.equals("통계내비게이터")? "selected":""%>>통계내비게이터</option>
                            <option value="OpenAPI" <%=cond_service.equals("OpenAPI")? "selected":""%>>OpenAPI</option>
                            <option value="지식정보" <%=cond_service.equals("지식정보")? "selected":""%>>지식정보</option>
                            <option value="이사지역찾기" <%=cond_service.equals("이사지역찾기")? "selected":""%>>이사지역찾기</option>
                            <option value="소지역별고객분포서비스" <%=cond_service.equals("소지역별고객분포서비스")? "selected":""%>>소지역별고객분포서비스</option>
                            <option value="노령화정책지원서비스 " <%=cond_service.equals("노령화정책지원서비스")? "selected":""%>>노령화정책지원서비스</option>
                            <option value="센서스경계자료제공 " <%=cond_service.equals("센서스경계자료제공")? "selected":""%>>센서스경계자료제공</option>
                            <option value="기타" <%=cond_service.equals("기타")? "selected":""%>>기타</option>
                        </select>
                        <select class="search_sel" name="cond_type">
                            <option value=""  <%=cond_type.equals("")? "selected":""%>>전체</option>
                            <option value="title" <%=cond_type.equals("title")? "selected":""%>>제목</option>
                            <option value="contents" <%=cond_type.equals("contents")? "selected":""%>>내용</option>
                        </select>
                        <input name="cond_text" id="list_search_input" type="text" value="<%=cond_text%>" onkeydown="javascrit:passEnter()" />
                        <input name="image" onclick="javascript:list(1)" type='image' id="search" src="/contents/support/images/support_button_search.gif" alt="로그인" align="absmiddle" width="57px" height="19px" border="0" />
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                </tr>
            </table>
</form>
<div class="clear"></div>
</div>
</div>
</div>
</div>
<%@ include file="/contents/gsks/include/footer.jsp" %>

        </td>
    </tr>
</table>

</body>
</html>