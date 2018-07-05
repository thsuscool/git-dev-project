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
<%@ include file="/contents/include/leftMenu.jsp" %>
<link rel="stylesheet" href="/contents/shortcut/style/style.css" type="text/css" media="all">

<!------------------------right시작---------------------------->
    <div class="middle_right">
    	<div class="content_title">
            <img src="/contents/shortcut/images/shortcut_content_title_6_1.gif" alt="사용안내">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
                <li><a href="/">home</a> > <a href="/contents/shortcut/index.jsp">서비스바로가기</a> > <a href="/contents/shortcut/shortcut_07.jsp">공간통계 OpenAPI</a> &gt; <a href="/contents/shortcut/shortcut_06_01.jsp" class="ov">사용안내</a></li>
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
        
		<div class="openapi_text_content">
		  <h1>공간통계 OpenAPI는 어떤 서비스인가요?</h1>
		  <p>개발자가 통계청의 다양한 공간통계 OpenAPI를 이용해, 작게는 운영 사이트의 다양한 서비스 활용을 지원하고, 넓게는 창조적이고 다양한 애플리케이션을 개발할 수 있도록 기술과 서비스를 공유하는 프로그램입니다.</p>
		  <h1>공간통계 OpenAPI는 어떤 서비스들을 제공하고 있습니까?</h1>
		  <p>통계지도 제작을 위한 지도 API와 다양한 통계항목검색을 위한 검색 API 및 좌표 및 주소를 변환하기 위한 변환하는 API를 제공하고 있습니다. </p>
		  <div class="link_button"><a href="#"><img src="/contents/shortcut/images/link_button07.gif" alt="공간통계 OpenAPI" border="0" /></a></div>
		  <h1>처음방문했습니다. 어떻게 이용하면 되나요?</h1>
		    <ul class="left_mar_20">
		    <li>1. Open Api 사용을 위해서는 key가 필요합니다. 이용신청을 해주세요.</li>
	        <li>2. 제공 API 목록에서 어떤 API 를 이용할지 골라보세요. </li>
	        <li>3. 각 서비스 별 안내문을 참고하셔서, 원하시는 API를 목적에 맞게 사용하세요.</li>
	        <li>4. 원하시는 서비스 및 어플리케이션을 만드셨다면, 우측의 “지식등록마법사”를 이용하여 제작한 어플리케이션의<br />　&nbsp;URL을 등록하여 모두가 공유하고 즐길 수 있도록 해주세요.</li>
		    </ul>
		  <h1>공간통계 OpenAPI는 무료인가요?</h1>
		  <p>네, 무료로 제공됩니다. </p>
		  </div>
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