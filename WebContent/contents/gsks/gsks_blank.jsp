<%--
/*********************************************************
* @source      : gsks_blank.jsp
* @description : 관리자  신규입력 및 수정
*********************************************************
*    DATE    |     AUTHOR      |        DESC
*--------------------------------------------------------
* 2012.04.26       Bobby               최초등록
*********************************************************
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ page import="java.math.BigDecimal"                  %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.pdf.basis.*"              %>

<%@ page import="sun.misc.BASE64Decoder"                %>

<%@ include file="/contents/gsks/include/header.jsp"   %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>
<%@ include file="/contents/gsks/scripts/interest_loc.jsp" %>

<%
	String auth = lData.getString("auth");
%>
<script type="text/javascript">
	function on_init(auth){
		if(auth != ""){
			if(auth == "statistics"){
				window.open('/statistics/admin/index.jsp') ; 
			}else if(auth == "msgis"){
				window.open('/msgis/admin') ; 
			}else if(auth == "publicsmodel"){
				window.open('/publicsmodel/admin/useHistoryList.vw') ; 
			}else if(auth == "funny_month"){
				window.open('/funny_month/top/monthEleSetList.do') ; 
			}else if(auth == "statbd"){
				window.open('http://211.34.86.29/statbd_up/kosis_tbl_up.vw') ; 
			}
		}
	}
</script>
<!------------------------left끝---------------------------->      
<div class="admin_content">

	<!-- 메뉴Include -->
	<%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

	<div class="clear"></div>

	<div class="content_title_1"> 
		<div class="content_title_2">관리자</div>

		<ul class="navigation">
			<li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
			<li><a href="/contents/gsks/index.jsp">관리자</a></li>
		</ul>
	</div>

	<div class="content_admin" style="border:0px solid red;">
		<div class="agreement_form">
		<% if(auth.equals("non")){ %>
		권한이 없습니다.</br>최고관리자에게 문의하시기 바랍니다.
		<% } %>
		</div>
	</div>

</div>
<script>
<% if(!auth.equals("") || !auth.equals("non")){ %>
on_init("<%=auth%>");
<% } %>
</script>
<%@ include file="/contents/gsks/include/footer.jsp" %>