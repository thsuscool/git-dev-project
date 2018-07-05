<%--
/*
    ********************************************************************
    * @source      : gsks_01_06_tabpage01_view.jsp
    * @description : 관리자 - 공지사항 게시판 상세보기
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
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"     %>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%

	GeneralBroker broker = null;
	RecordModel rm = null;
	StringBuffer sb = new StringBuffer(1024);
	String aT = lData.get("aT");
	String seq = lData.get("sgis_board_seq");
	int pg = lData.getInt("pg");

	String sgis_board_seq = "" ;
	String sgis_board_title = "" ;
	String sgis_board_name = "" ;
	String sgis_board_desc = "" ;
	String sgis_board_cou = "" ;
	String create_date = "" ;
	String sgis_board_pop_start = "" ;
	String sgis_board_pop_end = "" ;
	String sgis_board_use= "";
	String sgis_board_pop_chk= "";
	String sgis_board_file_loc ="";
	String sgis_board_file_type ="";
	String sgis_board_pop_img_file ="";
	String sgis_board_pop_width ="";
	String sgis_board_pop_height ="";
	String zone_yn="";
	String sgis_board_url="";
	String sgis_board_alt="";
	String sgis_board_file_zone="";

	String p_seq ="";
	String n_seq ="";

	try{


		broker = new GeneralBroker("adfa00");
		//-- 게시글 조회
		lData.setNumber("SEQ", 2);
		rm = broker.getList(lData);

		while(rm!=null && rm.next()) {

			sgis_board_seq = StringUtil.verify((String)rm.get("sgis_board_seq"));
			sgis_board_title = StringUtil.verify((String)rm.get("sgis_board_title"));
			sgis_board_name = StringUtil.verify((String)rm.get("sgis_board_name"));
			sgis_board_desc = StringUtil.toLine((String)rm.get("sgis_board_desc"));
			sgis_board_cou = StringUtil.verify((String)rm.get("sgis_board_cou"));
			create_date = StringUtil.verify((String)rm.get("create_date"));
			sgis_board_pop_start = StringUtil.verify((String)rm.get("sgis_board_pop_start"));
			sgis_board_pop_end = StringUtil.verify((String)rm.get("sgis_board_pop_end"));
			sgis_board_use = StringUtil.verify((String)rm.get("sgis_board_use"));
			sgis_board_pop_chk = StringUtil.verify((String)rm.get("sgis_board_pop_chk"));
			sgis_board_file_loc = StringUtil.verify((String)rm.get("sgis_board_file_loc"));
			sgis_board_file_type = StringUtil.verify((String)rm.get("sgis_board_file_type"));
			sgis_board_pop_img_file = StringUtil.verify((String)rm.get("sgis_board_pop_img_file"));
			sgis_board_pop_width = StringUtil.verify((String)rm.get("sgis_board_pop_width"));
			sgis_board_pop_height = StringUtil.verify((String)rm.get("sgis_board_pop_height"));
			zone_yn = StringUtil.verify((String)rm.get("zone_yn"));
			sgis_board_url = StringUtil.verify((String)rm.get("sgis_board_url"));
			sgis_board_alt = StringUtil.verify((String)rm.get("sgis_board_alt"));
			sgis_board_file_zone = StringUtil.verify((String)rm.get("sgis_board_file_zone"));
		}

		//--이전글, 다음글 조회
		lData.setNumber("SEQ", 3);
		rm = broker.getList(lData);

		while(rm!=null && rm.next()) {

			p_seq = StringUtil.verify((String)rm.get("p_seq"));
			n_seq = StringUtil.verify((String)rm.get("n_seq"));

		}

	}catch(Exception e){
		  System.out.println("------------->"+e);
	}finally{

	}
%>

<script src="/contents/gsks/scripts/gsks_01_06_tabpage.js"></script>
<script type="text/javascript">

function goDetailView(key1) {

	fm.sgis_board_seq.value   = key1;
    fm.target = "_self";
	fm.action = 'gsks_01_06_tabpage01_view.jsp';
	fm.submit();
}
function goDetailUpdate(key1) {

	fm.sgis_board_seq.value   = key1;
    fm.target = "_self";
	fm.action = 'gsks_01_06_tabpage01_modify.jsp';
	fm.submit();
}

function listProcess(){

	var 	url = 'gsks_01_06_tabpage01.jsp';

	fm.action = url;  //리스트 조회
	fm.target = '_self';
	fm.submit();

}


</script>
    <!-- MM_ Script Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_MM.jsp" %>
 
   		<div class="admin_content">
		   <form name="fm" method="post">
			<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
			<input type="hidden" name="pg"    value="<%=pg%>">
			<!-- 상세조회 -->
			<input type="hidden" name="sgis_board_seq" value="<%=sgis_board_seq%>" >

			<input type="hidden" name="cond_type" value="<%=lData.get("cond_type")%>">
			<input type="hidden" name="cond_text" value="<%=lData.get("cond_text")%>">
			<input type="hidden" name="cond_service" value="<%=lData.get("cond_service")%>">
<!-- 파일다운로드 -->
<input type="hidden" name="filename" value="<%=sgis_board_file_loc %>">
<input type="hidden" name="path" value="/board/"> 			
           </form>

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
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
    					<a href="gsks_01_06_tabpage01.jsp"><font color="#FFFFFF"><strong>공지사항</strong></font></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_06_tabpage02.jsp"><strong>FAQ</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_06_tabpage03.jsp"><strong>Q&A</strong></a></td>
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
			  <div class="">
				  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table1" summary="사이트관리에 대한 내용입니다.">
					  <caption>사이트관리</caption>
						  <tr>
							<th width="100" class="td_top"><center>구분</center></th>
							<td class="td_top t_end"><%=sgis_board_name %> &nbsp;&nbsp;<a href="javascript:openNotice('<%=sgis_board_seq%>', '<%=sgis_board_pop_width%>', '<%=sgis_board_pop_height%>');">[팝업확인]</a></td>
						  </tr>
						  <tr>
							<th><center>제목</center></th>
							<td class="t_end"><%=sgis_board_title %> </td>
						  </tr>
						  <tr>
							<th><center>작성일</center></th>
							<td class="t_end"><%=create_date %></td>
						  </tr>
						  <tr>
							<th><center>팝업 유무</center></th>
							<td class="t_end">
									<%=sgis_board_pop_chk %>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<%=!sgis_board_pop_width.equals("")? "WIDTH :"+sgis_board_pop_width : ""%>
									<%=!sgis_board_pop_height.equals("")? "HEIGHT :"+sgis_board_pop_height : ""%>
							</td>
						  </tr>						  
						  <tr>
							<th><center>게시기간</center></th>
							<td class="t_end"><%=sgis_board_pop_start %> ~ <%=sgis_board_pop_end %></td>
						  </tr>
						  <tr>
							<th><center>첨부 파일</center></th>
							<td class="t_end">
								<span onclick="javascript:fileDownload(fm,'<%=sgis_board_file_loc%>')" style="cursor:pointer;text-decoration:underline"><%=!sgis_board_file_loc.equals("")? sgis_board_file_loc:""%></span>
							</td>
						  </tr>
						  <%if(zone_yn.equals("Y")) { %>
						  <tr>
						  	<th>알림정보(링크URL)</th>
						  	<td class="t_end"><%=sgis_board_url %></td>
						  </tr>
						  <tr>
						  	<th>알림정보(대체텍스트)</th>
						  	<td class="t_end"><%=sgis_board_alt %></td>
						  </tr>	
						  <tr>
						  	<th>알림정보(첨부이미지)</th>
						  	<td class="t_end"><a href="#" onclick="javascript:fileDownload(fm,'<%=sgis_board_file_zone%>')" style="text-decoration:underline"><font color="red"><%=sgis_board_file_zone %></font></a></td>
						  </tr>
						  <%} %>
						  <!--  <tr>
							<th><center>이미지파일</center></th>
							<td class="t_end">
								<span onclick="javascript:fileDownload('<%=java.net.URLEncoder.encode(sgis_board_pop_img_file)%>')" style="cursor:pointer;text-decoration:underline"><%=!sgis_board_pop_img_file.equals("")? sgis_board_pop_img_file:""%></span>
							</td>
						  </tr>	-->					  
						  <tr>
							<th valign="top"><center>내용</center></th>
							<td valign="top">
									<%=StringEscapeUtils.unescapeHtml( sgis_board_desc) %>
							</td>
						  </tr>
				  </table>
			  </div>
			  <div class="site_control_write_button">
			  	<a href="javascript:goDetailUpdate('<%=sgis_board_seq %>')""><img src="/contents/gsks/images/button_modify.gif" alt="수정" border="0" /></a>
			  	<a href="javascript:deleteProcess1();"><img src="/contents/gsks/images/button_delete.gif" alt="삭제" border="0" /></a>
			  	<a href="javascript:listProcess();"><img src="/contents/gsks/images/button_list.gif" alt="목록" border="0" /></a>
			  	  <%if(p_seq.equals("")){}else{ %>
					<a href="javascript:goDetailView('<%=p_seq %>')"><img src="/contents/gsks/images/button_previous.gif" alt="이전글" border="0" /></a>
				  <%}if(n_seq.equals("")){}else{ %>
					<a href="javascript:goDetailView('<%=n_seq %>')"><img src="/contents/gsks/images/button_next.gif" alt="다음글" border="0" /></a>
				  <%} %>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  </div>
	</div>
</div>
<div class="clear"></div>
<iframe name="downloadIfr" height="0" width=0 frameborder=0></iframe>
<%@ include file="/contents/gsks/include/footer.jsp" %>
