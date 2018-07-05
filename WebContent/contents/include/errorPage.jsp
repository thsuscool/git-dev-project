<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
	String returnUrl = (String)session.getAttribute("returnUrl");
	
	if(StringUtil.isEmpty(returnUrl))
		returnUrl = "/index.jsp";

%>
<HTML>
<HEAD>
<TITLE><%=sc_pageTitle %></TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<link href="/contents/style/style.css" rel="stylesheet" type="text/css" />
<script src=/contents/scripts/common.js></script>
<script src=/contents/scripts/javascript.js></script>
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/intro/style/01intro.css" type="text/css" media="all">
<script src=/contents/scripts/javascript.js></script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>
<script src=/contents/scripts/flash.js></script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>
<script type="text/javascript">
<!--
function back(){
	document.location.replace('<%=returnUrl%>');				    
}
//-->
</script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>
<style>
body{margin:0px;}
.danger_box{width:611px; height:200px; position:absolute; left:50%; margin-left:-305px; top:50%; margin-top:-100px;}
.danger_box_button{position:absolute; width:611px; text-align:center; margin-top:-45px;}
</style>

</HEAD>

<BODY>

<div class="danger_box">
<table width="100%" border=0 cellpadding=0 cellspacing=0>
	<tr>
		<td align="center">
			<a href="javascript:back();" alt="이전페이지">
					<img src="/contents/images/danger_background.gif" alt="페이지에 오류가 있습니다. 웹페이지의 이름이 바뀌었거나, 또는 현재 사용할 수 없거나 삭제되었습니다. 입력하신 페이지 주소가 정확한지 다시 한번 확인해주시기 바랍니다.">
			</a>
		</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td align="center">
			<a href="/index.jsp"><img src="/contents/images/danger_button01.gif" alt="홈으로" /></a>
			<a href="javascript:back();"><img src="/contents/images/danger_button02.gif" alt="이전화면으로" /></a>
	  </td>
	</tr>
</table>
</div>
<!--
<div class="danger_box">
<img src="/contents/images/danger_background.gif" alt="페이지에 오류가 있습니다. 웹페이지의 이름이 바뀌었거나, 또는 현재 사용할 수 없거나 삭제되었습니다. 입력하신 페이지 주소가 정확한지 다시 한번 확인해주시기 바랍니다.">
<div class="danger_box_button">
	<a href="#"><img src="/contents/images/danger_button01.gif" alt="홈으로" /></a>
    <a href="#"><img src="/contents/images/danger_button02.gif" alt="이전화면으로" /></a>
</div>
</div>
  -->
</body>
</html>
