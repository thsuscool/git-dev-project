<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"     %>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%
	String sgis_know_seq = lData.getString("sgis_know_seq");
	String sgis_member_key  = lData.getString("sgis_member_key");
	String sgis_know_service_code  = lData.getString("sgis_know_service_code");

	GeneralBroker broker = null;
	RecordModel rm = null;  //지식 상세정보
	RecordModel rm2 = null;  //관련 덧글

	try{
		broker = new GeneralBroker("seaa00");
		lData.set("sc_userkey", sc_userkey);  //로그인한 사용자

		lData.set("sql","sql02");
		rm = broker.getList(lData); /* 지식 상세보기 */
	
		lData.set("sql","sql03");
		rm2 = broker.getList(lData); /* 덧글 리스트 */

	}catch (Exception e){
		System.out.println(e);
	}

	String sgis_know_title = "";
	String sgis_know_desc = "";
	String sgis_know_url = "";
	String sgis_know_file_name = "";
	String create_date = "";
	String comment_cnt = "";                   //덧글수
	String sgis_view_count = "";              //조회수
	String interest_cnt = "";                      //관심수
	String grade = "";                              //평가
	String sgis_public_yn = "";                //관리자 승인여부
	String sgis_know_service_name = ""; //정보구분
	String sgis_member_name = "";         //등록자
	String sgis_know_grade = "";                    //등록자가 평가한


		if(rm != null && rm.next()) {

			sgis_know_title = StringUtil.verify((String)rm.get("sgis_know_title"));
			sgis_know_desc = StringUtil.verify((String)rm.get("sgis_know_desc"));
			sgis_know_url = StringUtil.verify((String)rm.get("sgis_know_url"));
			sgis_know_file_name = StringUtil.verify((String)rm.get("sgis_know_file_name"));
			create_date = StringUtil.verify((String)rm.get("create_date"));
			comment_cnt = StringUtil.verify((String)rm.get("comment_cnt"));            //덧글수
			sgis_view_count = StringUtil.verify((String)rm.get("sgis_view_count"));   //조회수
			interest_cnt = StringUtil.verify((String)rm.get("interest_cnt"));   //관심수
			grade = StringUtil.verify((String)rm.get("grade"));   //전체평가
			sgis_public_yn = StringUtil.verify(""+(Character)rm.get("sgis_public_yn"));   //관리자 승인여부
			sgis_know_service_name = StringUtil.verify((String)rm.get("sgis_know_service_name"));  //정보구분
			sgis_member_name = StringUtil.verify((String)rm.get("sgis_member_name"));  //등록자
			sgis_know_grade = StringUtil.verify((String)rm.get("sgis_know_grade"));  //평가점수

		}

%>
<link href="/contents/mypage/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">

	function list(pg){
	    fm.action = 'gsks_01_02.jsp';
	    fm.target = '_self';
		fm.pg.value = pg;
		fm.submit();
	}

	function insertComment() {

		fm.aT.value = 'cmtins';	//상태구분

		fm.action = 'gsks_01_02_process2.jsp';
		fm.target = '_self';
		fm.submit();
	}

	function deleteComment(sgis_know_comment_seq ) {

		fm.aT.value = 'cmtdel';	//상태구분

		if(!confirm('삭제하시겠습니까?'))	 return;

		fm.sgis_know_comment_seq.value = sgis_know_comment_seq;

		fm.action = 'gsks_01_02_process2.jsp';
		fm.target = '_self';
		fm.submit();
	}


	function doValuation() {

		var sgis_know_grade = document.getElementsByName('sgis_know_grade');
		var isChecked    = false;

		for(var i=0; i<sgis_know_grade.length; i++) {

			if(sgis_know_grade[i].checked)	isChecked = true;
		}

		if(!isChecked) {
			alert('만족도를 체크해주십시오.');
			return false;
		}

		if(!confirm('평가하시겠습니까?')) return;

		fm.aT.value = 'dovalue';
		fm.action = 'gsks_01_02_process2.jsp';
		fm.target = '_self';
		fm.submit();

	}


function listProcess(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_02.jsp';

	formElem.action = url;  //리스트 조회
	formElem.target = '_self';
	formElem.submit();
}

function deleteProcess(url){

	if(!url)	url          = 'gsks_01_02_process2.jsp';

	if(!confirm('삭제하시겠습니까?')) return;
	var fm=document.fm;
    fm.target = '_self';
	fm.aT.value = "del";
	fm.action   = url;
	fm.submit();
}

function modifyProcess(formElem, url){

	if(!formElem)	formElem = document.fm;
	if(!url)	url          = 'gsks_01_02_03.jsp';

	if(!confirm('수정하시겠습니까?')) return;
    fm.target = '_self';
	formElem.action = url;
	formElem.submit();
}

function addProcess(){
	if(!confirm('등록하시겠습니까?')) return;
    fm.target = '_self';
	fm.action = 'gsks_01_02_04.jsp';
	fm.submit();
}

function openView(sgis_know_url){
	var url = sgis_know_url;
	if(url == '') {
		alert('등록된 URL이 없습니다.');
		return;
	}
	var sParam  = "resizable=0, menubar=1, toobar=1, location=1. directories=0, status=1, scrollbars=1, resizable=1 left=0, top=0, width=1024, height=665";
	var wind = window.open(url, 'viewer', sParam);

	wind.focus();
}
</script>

  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu.jsp" %>

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
<form name="fm" method="post">
<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
<!-- 상세조회 -->
<input type="hidden" name="sgis_know_seq"  value="<%=lData.getString("sgis_know_seq")%>">
<input type="hidden" name="sgis_know_service_code"  value="<%=lData.getString("sgis_know_service_code")%>">
<input type="hidden" name="sgis_member_key" value="<%=lData.getString("sgis_member_key")%>">
<input type="hidden" name="sgis_know_comment_seq" >

<input type="hidden" name="cond_type" value="<%=lData.get("cond_type")%>">
<input type="hidden" name="cond_text" value="<%=lData.get("cond_text")%>">
<!-- 파일다운로드 -->
<input type="hidden" name="filename" value="<%=sgis_know_file_name %>">
<input type="hidden" name="path" value="/know/"> 
  <div class="mypage_board_middle2">
         <div class="left">
           <div class="mypage_board_middle_caption">관심/조회
           <p><%=interest_cnt %>/<%=sgis_view_count %></p></div>
        	    <div class="mypage_board_middle_star">
					<%
						double sumGrade = Double.parseDouble(grade);
						String star_img = "";

						/* 등급 이미지(별)처리 */
						for(int i=0; i<5; i++) {

							if(i < sumGrade) {

								if(i == (sumGrade - 0.5)) {

									star_img = "mypage_board_middle_star_half";
								}else {

									star_img = "mypage_board_middle_star_full";
								}
							}else {

								star_img = "mypage_board_middle_star_empty";
							}
					%>
							<img src="/contents/mypage/images/<%=star_img%>.gif" alt=""/>
					<%
						}//end for	%>
								</div>
    </div>
           </div>
       <div class="left left_mar_10">
         <div class="mypage_board_middle_text">
            <span style="text-decoration:underline">[<%=sgis_know_service_name%>] <%=sgis_know_title%></span><br>
            <span onclick="javascript:openView('<%=sgis_know_url%>')" style="cursor:pointer;text-decoration:underline"><%=!sgis_know_url.equals("")? "["+sgis_know_url+"]":""%></span><br>
			<span onclick="javascript:fileDownload(fm,'<%=sgis_know_file_name%>')" style="cursor:pointer;text-decoration:underline"><%=!sgis_know_file_name.equals("")? "["+sgis_know_file_name+"]":""%></span>
	     </div>
    <div class="mypage_board_middle_text2"><%=StringEscapeUtils.unescapeHtml(sgis_know_desc)%></div>
     <div class="mypage_board_bottom">
      <div class="reply2">등록일 : <%=create_date%></div>
    <div class="left left_mar_30">등록인 : <%=sgis_member_name%></div>
    <div class="right">
					<a href="javascript:addProcess();"><img src="/contents/gsks/images/button_admin_01_02_add.gif" alt="신규" border="0"></a>
					<a href="javascript:listProcess();"><img src="/contents/gsks/images/button_admin_01_02_list.gif" alt="목록" style="margin-right:5px;" /></a>
					<a href="javascript:modifyProcess();"><img src="/contents/gsks/images/button_admin_01_02_correct.gif" alt="수정" style="margin-right:5px;" /></a>
					<a href="javascript:deleteProcess();"><img src="/contents/gsks/images/button_admin_01_02_delete.gif" alt="삭제" /></a>
				</div><div class="clear">
      </div>
         <div class="clear"></div>
    </div>
       </div><div class="clear"></div>
<div class="mypage_02_02_box_green">
  <div class="left_mar_15">
    <p><img src="/contents/mypage/images/mypage_02_02_icon_question.gif" alt="Q" /> 이 페이지에서 제공하는 정보에 만족하셨습니까?</p>

	  <div style="float:right; padding-right:20px;">
	  	<img src="/contents/mypage/images/mypage_board_top_button_ok.gif" onclick="doValuation('<%=sgis_know_seq %>', '<%=sgis_member_key %>','<%=sgis_know_service_code%>')" style="cursor:pointer;">
	  </div>

    <input name="sgis_know_grade" type="radio" value="5" <%="5".equals(sgis_know_grade) ? "checked" : "" %>/>
    매우만족
    <input name="sgis_know_grade" type="radio" value="4" <%="4".equals(sgis_know_grade) ? "checked" : "" %>/>
    만족
    <input name="sgis_know_grade" type="radio" value="3" <%="3".equals(sgis_know_grade) ? "checked" : "" %>/>
    보통
    <input name="sgis_know_grade" type="radio" value="2" <%="2".equals(sgis_know_grade) ? "checked" : "" %>/>
    불만족
    <input name="sgis_know_grade" type="radio" value="1" <%="1".equals(sgis_know_grade) ? "checked" : "" %>/>
    매우불만족
  </div>
</div>

<!-- 덧글 처리 -->
     <div class="mypage_02_02_reply">덧글(<%=comment_cnt %>)</div><div class="mypage_02_02_caption"></div>
     <div class="clear mypage_02_02_line_green"></div>
<%
			//덧글이 있는 경우
			while(rm2!=null && rm2.next()){
				String sgis_know_comment_seq        = StringUtil.verify((String)rm2.get("sgis_know_comment_seq"));
				String cmt_create_date        = StringUtil.verify((String)rm2.get("create_date"));
				String sgis_know_comment_desc = StringUtil.verify((String)rm2.get("sgis_know_comment_desc"));
				String member_name        = StringUtil.verify((String)rm2.get("member_name"));
				String create_user        = StringUtil.verify((String)rm2.get("create_user"));
%>
		 <div class="mypage_02_02_reply_left"><%=member_name%>
            <p><%=cmt_create_date%></p>
         </div>
         <div class="mypage_02_02_reply_right"><%=sgis_know_comment_desc%>
		    <img src="/contents/mypage/images/mypage_board_top_button_del.gif" align="absmiddle" onclick="deleteComment('<%=sgis_know_comment_seq %>')" style="cursor:pointer;">
		 </div>
     <div class="clear mypage_02_02_line_gray"></div>
<%
			}
%>


     <div class="mypage_02_02_reply_bottom"><textarea name="sgis_know_comment_desc" class="add_text"></textarea></div><div class="left left_mar_5">
			<img src="/contents/mypage/images/mypage_02_02_button_write_reply.gif" onclick="insertComment('<%=sgis_know_seq %>', '<%=sgis_know_service_code %>')" style="cursor:pointer;" alt="덧글입력" />
			</div>
     <div class="clear"></div>

    </div>
  </div>
</div>
<div class="clear"></div>
</form>
<!------------------------right끝---------------------------->
<iframe name="downloadIfr" height="0" width=0 frameborder=0></iframe>


<%@ include file="/contents/gsks/include/footer.jsp" %>
