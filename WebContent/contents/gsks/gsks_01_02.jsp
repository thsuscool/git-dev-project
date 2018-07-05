<%--
/*********************************************************
 * @source      : gsks_01_02.jsp
 * @description : 관리자 / 지식관리
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008-11-12   김민수                 상세보기
 *********************************************************
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"     %>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%

		String aT = lData.get("aT");
		String cond_type = lData.get("cond_type");	  //조회조건
		String cond_text = lData.get("cond_text");	    //검색어

		/* paging 초기화  */
		int pg = lData.getInt("pg");
		int pgSize = 10;
		int blockSize = 10;
		int totPage   = 1;
		int totCount  = 0;
		if(pg==0) pg = 1;

		GeneralBroker broker = null;
		RecordModel rm = null;

		try{
			broker = new GeneralBroker("seaa00");
			lData.set("sql","sql01"); //지식조회 SQL
			lData.set("sgis_public_yn",""); //공개된 지식
			lData.set("sgis_know_service_code",""); //서비스 구분
			lData.set("order","1"); //최신순

			rm = broker.getList(lData);
			totCount = rm.getRowCount();	            //리스트 전체 수

			rm = broker.getList(lData, pg, pgSize);   //page 처리 list

		}catch (Exception e){
			System.out.println(e);
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
<link href="/contents/gsks/style/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">

function lockProcess(key1, key2, key3, isPublic) {

	var msg = '';
	var sgis_public_yn = '';

  if(isPublic=='Y'){
		msg = '비공개';
		sgis_public_yn = 'N';
	}else{
		msg = '공개';
		sgis_public_yn = 'Y';
	}

	if(!confirm(msg+'하시겠습니까?')) return;

	fm.sgis_know_seq.value   = key1;
	fm.sgis_know_service_code.value  = key2;
	fm.sgis_member_key.value = key3;
	fm.sgis_public_yn.value = sgis_public_yn;

	document.fm.aT.value="public";

	fm.action = 'gsks_01_02_process2.jsp';
	fm.target = '_self';

	fm.submit();
}

function list(pg){
	fm.pg.value = pg;
	fm.action = 'gsks_01_02.jsp';
	fm.target = '_self';
	fm.submit();
}

function goDetailView(key1, key2, key3) {

	fm.sgis_know_seq.value   = key1;
	fm.sgis_know_service_code.value  = key2;
	fm.sgis_member_key.value = key3;

	fm.action = 'gsks_01_02_02.jsp';
	fm.target = '_self';

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

function addProcess(){
	if(!confirm('등록하시겠습니까?')) return;
    fm.target = '_self';
	fm.action = 'gsks_01_02_04.jsp';
	fm.submit();
}

//성명 검색어 입력후 엔터키 입력시 자동조회
function passEnter(){
	if ( event.keyCode == 13 ) list(1);
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
	<form name="fm" method="post">
	<input type="hidden" name="aT"    value="<%=lData.get("aT")%>">
	<input type="hidden" name="pg"    value="<%=pg%>">
	<!-- 상세조회 -->
	<input type="hidden" name="sgis_know_seq" >
	<input type="hidden" name="sgis_know_service_code" >
	<input type="hidden" name="sgis_member_key">
	<input type="hidden" name="sgis_public_yn">
	    
<%

		while(rm!=null && rm.next()) {

				String sgis_know_seq  = StringUtil.verify((String)rm.get("sgis_know_seq "));
				String sgis_know_service_code  = StringUtil.verify((String)rm.get("sgis_know_service_code "));
				String sgis_member_key  = StringUtil.verify((String)rm.get("sgis_member_key "));
				String sgis_member_name  = StringUtil.verify((String)rm.get("sgis_member_name "));

				String sgis_know_file_name = StringUtil.verify((String)rm.get("sgis_know_file_name"));
				String sgis_know_title = StringUtil.verify((String)rm.get("sgis_know_title"));
				String sgis_know_desc = StringUtil.verify((String)rm.get("sgis_know_desc"));
				String sgis_know_url = StringUtil.verify((String)rm.get("sgis_know_url"));
				String create_date = StringUtil.verify((String)rm.get("create_date"));
				String comment_cnt = StringUtil.verify((String)rm.get("comment_cnt"));            //덧글수
				String sgis_view_count = StringUtil.verify((String)rm.get("sgis_view_count"));   //조회수
				String interest_cnt = StringUtil.verify((String)rm.get("interest_cnt"));   //관심수
				String grade = StringUtil.verify((String)rm.get("grade"));   //전체평가
				String sgis_know_service_name = StringUtil.verify((String)rm.get("sgis_know_service_name"));   //서비스구분
				String sgis_public_yn = StringUtil.verify(""+(Character)rm.get("sgis_public_yn"));   //관리자 승인여부
				String sgis_auth_id = StringUtil.verify((String)rm.get("sgis_auth_id"));   //관리자구분

				sgis_know_desc = sgis_know_desc.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "");//tag 제거
%>

					<div class="mypage_board_middle">
						 <div class="left">
							 <div class="mypage_board_middle_caption">관심/조회
							 <p><%=interest_cnt%>/<%=sgis_view_count%></p></div>
				<div class="mypage_board_middle_star">
					<%
							//전체 평가 표시
							double sumGrade = Double.parseDouble(grade);
							String star_img = "";

							for(int i=0; i<5; i++){
								if(i< sumGrade) {

									 if(i == (sumGrade-0.5))
										star_img = "mypage_board_middle_star_half";
									else
										star_img = "mypage_board_middle_star_full";

								}else{
									star_img = "mypage_board_middle_star_empty";
								}
	          %>
							       <img src="/contents/mypage/images/<%=star_img%>.gif" alt=""/>
	                <%

							}
            	%>
           </div>
				</div>
							 </div>
					 <div class="left left_mar_10">
						 <div class="mypage_board_middle_text">
						    <span onclick="javascript:goDetailView('<%=sgis_know_seq %>', '<%=sgis_know_service_code %>', '<%=sgis_member_key %>')" style="cursor:pointer;text-decoration:underline">[<%=sgis_know_service_name%>] <%=StringUtil.toShortenStringB(sgis_know_title,50)%></span>
						    <span onclick="javascript:openView('<%=sgis_know_url%>')" style="cursor:pointer;text-decoration:underline"><%=!sgis_know_url.equals("")? "[실행]":""%></span>
				     <span onclick="javascript:fileDownload(fm,'<%=sgis_know_file_name %>')" style="cursor:pointer;text-decoration:underline"><%=!sgis_know_file_name.equals("")? "[다운로드]":""%></span>
						 <img style="cursor:pointer" onclick="javascript:lockProcess('<%=sgis_know_seq %>', '<%=sgis_know_service_code %>', '<%=sgis_member_key %>','<%=sgis_public_yn.equals("Y")?"Y":"N"%>');" src="/contents/gsks/images/<%=sgis_public_yn.equals("Y")? "icon_admin_01_02_unlock":"icon_admin_01_02_lock"%>.gif" alt="<%=sgis_public_yn.equals("Y")? "공개":"비공개"%>" align="absmiddle" />
						 </div><div class="mypage_board_middle_text2">
						 </div>
				<div class="mypage_board_bottom">
					<div class="reply"><img src="/contents/images/button_show_reply.gif" alt="덧글" align="absmiddle" /> <%=comment_cnt%></div>
				<div class="right mypage_point ">[<%=sgis_auth_id.equals("01")? "통계청":sgis_member_name%> &nbsp;&nbsp;<%=create_date%>]</div>
				<div class="clear">
					</div>
				</div>
					 </div>
					 <div class="clear dot_admin"></div>

 <%
     }
%>
	<!-- 파일다운로드  -->
	<input type="hidden" name="filename" value="">
	<input type="hidden" name="path" value="/know/">
<!-- nodata 처리 -->
<%@ include file="/contents/include/nodata.jsp" %>
 <!-- nodata 처리 -->

<!-- page 처리 -->
<%@ include file="/contents/include/pagelist.jsp" %>
 <!-- page 처리 -->    

        <div align="center">
      <div class="list_search ">
				<table	width="400" border="0"> 
					<tr>
						<td align="center">
							<select class="search_sel" name="cond_type">
								<option value=""  <%=cond_type.equals("")? "selected":""%>>전체</option>
								<option value="title" <%=cond_type.equals("title")? "selected":""%>>제목</option>
								<option value="contents" <%=cond_type.equals("contents")? "selected":""%>>내용</option>
							</select>
							<input name="cond_text"  value="<%=cond_text%>" type="text" id="cond_text" style="width:100;height:18px;border:1px solid #d9d9d9;"  onkeydown="javascrit:passEnter()"/>
							<input name="image" type='image' id="search" onclick="javascript:list(1)" src="/contents/support/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />&nbsp;

						</td>
						<td>
								<!-- 신규  -->
						   <a href="javascript:addProcess();"><img src="/contents/gsks/images/button_admin_01_02_add.gif" alt="신규" border="0"></a>
						</td>
					</tr>
				</form>
				</table>
      </div>
    </div>
	</div><div class="clear"></div>
<iframe name="downloadIfr" height="0" width=0 frameborder=0></iframe>

    </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>
