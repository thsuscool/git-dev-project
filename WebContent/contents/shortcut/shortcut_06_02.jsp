<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
	String leftMenu="shortcut";
%>
<HTML>
<HEAD>
<TITLE><%=sc_pageTitle %></TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">

<link rel="stylesheet" href="style/style.css" type="text/css">
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
function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}
//-->
</script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>
<style>
body{background:url(/contents/images/sub_background.jpg) repeat-x;}
</style>
</HEAD>

<BODY>

<table width="100%" border=0 cellpadding=0 cellspacing=0>
	<tr>
		<td>

<!-- header -->
<%@ include file="/contents/include/header.jsp"%>

<!-- left -->
<%@ include file="/contents/include/leftMenu.jsp"%>

<!------------------------right시작---------------------------->
    <div class="middle_right">
    	<div class="content_title">
            <img src="/contents/shortcut/images/shortcut_content_title_6_2.gif" alt="시작가이드">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
            <li><a href="/">home</a> > <a href="/contents/shortcut/index.jsp">서비스바로가기</a> > <a href="/contents/shortcut/shortcut_06.jsp">공간통계 OpenAPI</a> &gt; <a href="/contents/shortcut/shortcut_06_02.jsp" class="ov">시작가이드 </a></li>
            </ul>
        </div>
        <div class="content">

		<div class="notice_text_box">
		<div class="notice_text_box_top"></div>
		  <div class="notice_text_box_icon top_mar_5"><img src="/contents/shortcut/images/notice_text_box_icon07.gif" alt="공간통계OpenAPI" /></div>
		  <div class="notice_text_box_text">
		    <div><strong>공간통계OpenAPI</strong>는</div>
			<p>관련된 도움말의 내용을 넣어주세요. 관련된 도움말의 내용을 넣어주세요. 관련된 도움말의 내용을 넣어주세요. 관련된 도움말의 내용을 넣어주세요. 관련된 도움말의 내용을 넣어주세요. </p>
		  </div>
		  <div class="clear"></div>
		</div>

		<h1>프로그램 소개</h1>
		<h1>API키 발급받기</h1>
		<h1>개발환경구성</h1>
		<h1>프로그램의 구조</h1>
		<h1>마치며</h1>

        </div>
        <div class="clear"></div>
    </div>
<!------------------------right끝---------------------------->
<!-- bottom -->
<%@ include file="/contents/include/footer.jsp" %>

		</td>
	</tr>
</table>

</body>
</html>