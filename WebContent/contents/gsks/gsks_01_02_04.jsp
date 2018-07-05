<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%@ include file="/contents/include/text_editing_tools.jsp" %>

<%

		DbManager dbmgr = null;
		RecordModel rm = null;
		RecordModel rm1 = null;

%>
<link href="/contents/mypage/style/style.css" rel="stylesheet" type="text/css" />
<script src="/contents/gsks/scripts/gsks_01_02.js"></script>
  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>
</body>


<body class="yui-skin-sam">
  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">지식정보관리</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="/contents/gsks/gsks_01.jsp">SGIS유통홈페이지 관리자</a> > <a href="#">지식정보관리</a></li>
      </ul>
    </div>
    <div class="content_admin">
<!------------------------right시작---------------------------->
	<form name="fm" method="post" enctype="multipart/form-data">
	  <input type="hidden" name="aT">
		<input type="hidden" name="sgis_know_seq"  value="<%=lData.get("sgis_know_seq")%>">
		<input type="hidden" name="sgis_member_key" value="<%=lData.get("sgis_member_key")%>">

		<table width="100%" cellpadding="7" cellspacing="0" class="table1" summary="테이블에 대한 설명글이 들어가는 부분입니다" >
			<caption>
			테이블의 제목이 들어가는 부분
			</caption>
			<tr>
				<th class="td_top" width="120"><label for="title">제목</label></th>
				<td class="cell_left t_end td_top"><input name="sgis_know_title" id="sgis_know_title" maxlength="30" type="text" class="input_long" /></td>
			</tr>
			<tr>
				<th><label for="author"> URL</label></th>
				<td class="cell_left t_end"><input name="sgis_know_url" id="sgis_know_url"  type="text" maxlength="400"  class="input_long" />
				</td>
			</tr>
		  <tr>
				<th><label for="author"> 이용부문</label></th>
				<td class="t_end">
				 <select name="sgis_know_service_code" >
				<%
					/******************************/
					/* 이용부문 */
					/******************************/
						String menusql = " SELECT sgis_know_service_code, sgis_know_service_name ";
								  	menusql += "		FROM   sgis_know_service ";
										menusql += "  ORDER BY sgis_know_service_code			";

						try {

							dbmgr = new DbManager();
							dbmgr.prepareStatement(menusql);
							rm1 = dbmgr.select();

						} catch(Exception e) {
							System.out.print("sgisWebError : ");
							//2015-12-03 시큐어코딩
							//e.printStackTrace();
							logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
						} finally {
							dbmgr.close();
						}

						while(rm1.next()) {
							int sgis_know_service_code = ((BigDecimal)rm1.get("sgis_know_service_code")).intValue();
							String sgis_know_service_name = StringUtil.verify((String)rm1.get("sgis_know_service_name"));
				%>
					<option value="<%=sgis_know_service_code %>"><%=sgis_know_service_name %></option>
					<%} %>
				</select>
				</td>
		  </tr>
			<tr>
				<th><label for="contents">파일업로드</label></th>
				<td class="cell_left t_end">
				<input name="file" type="file" size="50" class="input_mid" />
				</td>
			</tr>
		</table>
		<table width="100%" cellspacing="0" class="table1">
			<tr>
				<td>
					<textarea name="sgis_know_desc" id="example_editor"></textarea>
				</td>
			</tr>
		</table>
		</form>
		<table width="100%" cellspacing="0" >
			<tr>
				<td>
						<div class="list_button_right_02">
						<a href="javascript:updateProcess('gsks_01_02_process.jsp','ins');"><img src="/contents/support/images/support_board_button_save.gif" alt="저장" width="62" height="21" border="0"></a>
						<a href="javascript:listProcess();"><img src="/contents/support/images/support_board_button_list.gif" alt="목록" width="62" height="21" border="0"></a>
						<!-- <a href="javascript:cancelProcess();"><img src="/contents/support/images/support_board_button_cancel.gif" alt="취소" width="62" height="21" border="0"></a> -->
						</div>
				</td>
			</tr>
		</table>
		<div id="popup_calendar">
		<div class="popup_calendar_button">
			<a href="#"><img src="/contents/member/images/popup_calendar_move.gif" alt="이동" border="0" /></a>
			<a href="javascript:;" onclick="calender_view('off')" onkeypress="calender_view('off')"><img src="/contents/member/images/popup_calendar_close.gif" alt="닫기" border="0" /></a>
		</div>
		  <div class="popup_calendar_wrapper">
		    <div class="popup_calendar_content">
		      <div class="popup_calendar_top">
		        <ul>
		          <li class="arrow1"><img src="/contents/member/images/bullet_arrow01.gif" alt="이전달" /></li>
				  <li class="month">11월</li>
	              <li class="year">2008년</li>
	              <li class="year_icon"><a href="#"><img src="/contents/member/images/bullet_arrow03.gif" alt="작년" border="0" /></a><a href="#">
				  <img src="/contents/member/images/bullet_arrow04.gif" alt="내년" border="0" /></a></li>
	              <li class="arrow2"><img src="/contents/member/images/bullet_arrow02.gif" alt="다음달" /></li>
               </ul>
		      </div>
		    </div>
		  </div>
		  		
          </div>
        </div>
        <div class="clear"></div>
    </div>
<!------------------------right끝---------------------------->



<%@ include file="/contents/gsks/include/footer.jsp" %>
