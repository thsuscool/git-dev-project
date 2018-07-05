<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%@ include file="/include/editor/htmlEditor.jsp" %>


<script language="javascript">
	window.onload = function() {
	 	if(navigator.userAgent.indexOf('MSIE') != -1 )  // IE 인 경우만
	 editor_generate('editor', null, 640, 80);
	}

	function saveClicked() {
		var fm=document.censusFm;
		var str_leng = 2000; 

		if(fm.census_info_word.value.trim() == "") {
			alert("안내문구를 입력하세요.");
			return;
		} else if(fm.census_name.value.trim() == "") {
			alert("연락처 안내를 입력하세요.");
			return;

		}else if(getLength(fm.census_info_word.value) > str_leng) {
	        alert("안내문구  글자수는  한글 "+str_leng/2+"자, 영문 " +str_leng+ "자로 제한되어 있습니다.\n현재글자수 :" + getLength(fm.census_info_word.value));
		} else {
			var c = confirm("저장하시겠습니까?");
			if(c == 1) {
				fm.aT.value = "INS";
				fm.submit();
			}
		}
	}
</script>

<%
	DbManager dmg = null;
	RecordModel rm = null;

	String sgis_census_info_word = "";
	String sgis_census_info_name = "";

	try {

		dmg = new DbManager();

		/*****************************/
		/* 센서스 경계 자료제공 등록 */
		/*****************************/
		if(lData.getString("aT").equals("INS")) {

			String dsql = " delete from sgis_census_info	";

			dmg.prepareStatement(dsql);
			dmg.executeUpdate();

			String con_sgis_req_link = lData.getString("census_req_link");
			con_sgis_req_link = con_sgis_req_link.replaceAll("<","&lt;");
			con_sgis_req_link = con_sgis_req_link.replaceAll(">","&gt;");
			con_sgis_req_link = con_sgis_req_link.replaceAll("\"","&quot;");
			con_sgis_req_link = con_sgis_req_link.replaceAll("\'","&apos;");

			String isql = "	insert into sgis_census_info ";
							isql += "	(	";
							isql += "			sgis_census_id	";
							isql += "				, sgis_census_info_word  ";
							isql += "		        , sgis_census_info_name ";
							isql += "	) ";
							isql += "	values ";
							isql += "	(	";
							isql += "			'1'	";
							isql += "			, '"+lData.getString("census_info_word")+"'	";
							isql += "			, '"+lData.getString("census_name")+"'	";
							isql += "	) ";

							dmg.prepareStatement(isql);
							dmg.executeUpdate();

		}

		String sql = "  select sgis_census_info_word  ";
						sql += "		        , sgis_census_info_name ";
						sql += "		    from sgis_census_info	";

		dmg.prepareStatement(sql);
		rm = dmg.select();
		    System.out.println(sgis_census_info_word);
		if(rm.next()) {
			sgis_census_info_word = (String)rm.get("sgis_census_info_word");
			sgis_census_info_name = StringUtil.verify((String)rm.get("sgis_census_info_name"));
			 System.out.println(sgis_census_info_word);
		}

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	} finally {
		dmg.close();
	}

%>
  <div class="admin_content">
  
    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">센서스경계 자료제공</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="#">센서스경계 자료제공</a></li>
      </ul>
    </div>

    <div class="content_admin">

		<div class="list_wrap">
		<div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="120" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_04.jsp"><strong>요청관리</strong></a></td>
					<td width="120" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_01.jsp"><strong>자료제공</strong></a></td>
					<td width="120" height="25" align="center" bgcolor="#00BFFF">
							<a href="gsks_01_04_02.jsp"><font color="#FFFFFF"><strong>자료및안내</strong></font></a></td>
					<td width="120" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_04_03.jsp"><strong>자료목록관리</strong></a></td>
    				<td width="120" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_05.jsp"><strong>자료제공관리</strong></a></td>
					<td width="120" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
						<a href="gsks_01_04_06.jsp"><strong>결재관리</strong></a></td>
				</tr>
			<tr>
				<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="720" height="1px"></td>
			</tr>
		</table>

		<br>

		<form name="censusFm" method="post">
			<input type="hidden" name="aT">

    <table width="100%">
    	<tr>
    		<td><strong>* 안내문구</strong></td>
    	</tr>
    </table>
    <table width="100%" border=0>
    	<tr>
    		<td><textarea name="census_info_word" id='editor' class="add_text"><%=sgis_census_info_word %></textarea></td>
    	</tr>
    </table>

		<br>
    <table width="100%" border=0>
    	<tr>
    		<td><strong>* 연락처 안내</strong></td>
    	</tr>
    </table>
   <table width="100%" border=0>
    	<tr>
    		<td><input type="text" name="census_name" size="80" value="<%=sgis_census_info_name%>"></td>
    	</tr>
    </table>
</div>
<div class="clear"></div>
   <table width="100%" border=0>
	<div class="list_button_right_02"><a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0></a></div>
	</table>
</div>

    </form>
				</div>
  </div>
	</div>

<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>