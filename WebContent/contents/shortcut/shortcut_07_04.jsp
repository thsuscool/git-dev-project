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

<!------------------------right시작----------------------------><div class="middle_right">
    	<div class="content_title">
            <img src="/contents/shortcut/images/shortcut_content_title_6_4.gif" alt="API 제공리스트">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
                <li><a href="/">home</a> > <a href="/contents/shortcut/index.jsp">서비스바로가기</a> > <a href="/contents/shortcut/shortcut_07.jsp">공간통계 OpenAPI </a> &gt; <a href="/contents/shortcut/shortcut_07_04.jsp" class="ov">API 제공리스트</a></li>
          </ul>                  
        </div>                
  <div class="content">
		<div class="notice_text_box">
		<div class="notice_text_box_top"></div>
		  <div class="shortcut_api_toptext">
		    <p>통계지도 API를 활용하여 실용적인 통계지도를 제작하세요.<br />
		       통계지도 API를 제작하기 위해서는 <strong>인증키를 발급</strong>받아야 합니다. </p>
			<div class="shortcut_api_topimg"><a href="shortcut_06_03.jsp"><img src="/contents/shortcut/images/shortcut_top_buttonAPI.gif" alt="API키 이용신청" border="0" /></a><a href="/contents/download/Open API Tutorial.doc"><img src="/contents/shortcut/images/shortcut_top_buttonTutorial.gif" alt="TUTORIAL" border="0" /></a></div>   
		  </div>
		  <div class="clear"></div>
		</div>
  <div class="clear"></div>
		  
		<h1>서비스</h1>
		<div class="api_list">
		<select name="">
		  <option>센서스공간 DB제공서비스</option>
		  <option>Map Control &amp; Overlay</option>
		  <option>WebMap Service</option>
		  <option>사업체기반 Directory 서비스</option>
		  <option>Geocoder 서비스</option>
		  <option>Reverse Geocoder 서비스</option>
		  <option>소지역통계항목검색서비스</option>
		  <option>행정경계KOSIS 통계항목검색서비스</option>
		  <option>소지역집계구기반 공간통계정보서비스</option>
		  <option>소지역포인트기반 공간통계정보서비스</option>
		  <option>행정경계 KOSIS 공간통계정보서비스</option>
		</select>
		</div>
		<div class="top_mar_20">
		  <span class="api_download left_mar_10"><a href="#">예제실행하기</a></span>
	      <span class="api_download left_mar_30"><a href="#">API문서다운로드</a></span></div>
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