<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%@ include file="/contents/include/text_editing_tools.jsp" %>
<%

		GeneralBroker broker = null;
		RecordModel rm = null;  //지식 상세정보
		
		try{
			broker = new GeneralBroker("seaa00");
			lData.set("sc_userkey", sc_userkey);  //로그인한 사용자

			lData.set("sql","sql02");
			rm = broker.getList(lData); /* 지식 상세보기 */
		
		}catch (Exception e){
			System.out.println(e);
		}

		String aT = lData.get("aT");

		String sgis_know_seq  = "";
		String sgis_know_service_code  = "";
		String sgis_member_key  = "";

		String sgis_know_title = "";
		String sgis_know_desc ="";
		String sgis_know_url = "";
		String sgis_know_file_name = "";

		String create_date = "";
		String comment_cnt = "";
		String sgis_view_count = "";
		String interest_cnt = "";
		String grade = "";
		String sgis_public_yn = "";
		String sgis_know_service_name = "";


		if(rm!=null && rm.next()){
			sgis_know_seq  = StringUtil.verify((String)rm.get("sgis_know_seq "));
			sgis_know_service_code  = StringUtil.verify((String)rm.get("sgis_know_service_code "));
			sgis_member_key  = StringUtil.verify((String)rm.get("sgis_member_key "));

			sgis_know_title = StringUtil.verify((String)rm.get("sgis_know_title"));
			sgis_know_desc = StringUtil.verify((String)rm.get("sgis_know_desc"));
			sgis_know_url = StringUtil.verify((String)rm.get("sgis_know_url"));
			sgis_know_file_name = StringUtil.verify((String)rm.get("sgis_know_file_name"));

			create_date = StringUtil.verify((String)rm.get("create_date"));
			comment_cnt = StringUtil.verify((String)rm.get("comment_cnt"));            //덧글수
			sgis_view_count = StringUtil.verify((String)rm.get("sgis_view_count"));   //조회수
			interest_cnt = StringUtil.verify((String)rm.get("interest_cnt"));   //관심수
			grade = StringUtil.verify((String)rm.get("grade"));   //전체평가
			sgis_know_service_name = StringUtil.verify((String)rm.get("sgis_know_service_name"));
			sgis_public_yn = StringUtil.verify(""+(Character)rm.get("sgis_public_yn"));   //관리자 승인여부
		}

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
				<td class="cell_left t_end td_top"><input name="sgis_know_title" id="sgis_know_title" value="<%=sgis_know_title%>" maxlength="30" type="text" class="input_long" /></td>
			</tr>
			<tr>
				<th><label for="author"> URL</label></th>
				<td class="cell_left t_end"><input name="sgis_know_url" id="sgis_know_url" value="<%=sgis_know_url%>" type="text" maxlength="400"  class="input_long" />
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
						DbManager dbmgr = null;
						RecordModel rm1 = null;
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
							int service_code = ((BigDecimal)rm1.get("sgis_know_service_code")).intValue();
							String service_name = StringUtil.verify((String)rm1.get("sgis_know_service_name"));
				%>
					<option value="<%=service_code %>"  <% if(sgis_know_service_code.equals(Integer.toString(service_code))) out.println("selected");%>><%=service_name %></option>
					<%} %>
				</select>
				</td>
		  </tr>
			<tr>
				<th><label for="contents">파일업로드</label></th>
				<td class="cell_left t_end">
				<input name="file" type="file" size="50" class="input_mid" />&nbsp;<%=sgis_know_file_name%>
				</td>
			</tr>
		</table>
		<table width="100%" cellspacing="0" class="table1">
			<tr>
				<td>
					<textarea name="sgis_know_desc" id="example_editor" class="add_text"><%=sgis_know_desc%></textarea>
				</td>
			</tr>
		</table>
		
		<table width="100%" cellspacing="0">
			<tr>
				<td>
						<div class="list_button_right_02">
						<a href="javascript:updateProcess('gsks_01_02_process.jsp','upd');"><img src="/contents/support/images/support_board_button_save.gif" alt="저장" width="62" height="21" border="0"></a>
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
		</form>
          </div>
        </div>
        <div class="clear"></div>
    </div>
<!------------------------right끝---------------------------->



<%@ include file="/contents/gsks/include/footer.jsp" %>
