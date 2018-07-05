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
            <img src="/contents/shortcut/images/shortcut_content_title_8.gif" alt="<%=sc_pageTitle%>">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
            <li><a href="/">home</a> > <a href="/contents/shortcut/">서비스바로가기</a> > <a href="/contents/shortcut/shortcut_01.jsp" class="ov"><%=sc_pageTitle%></a></li>
          </ul>
        </div>
        <div class="content">
          <div class="notice_text_box">
            <div class="notice_text_box_top"></div>
            <div class="notice_text_box_icon top_mar_5"><img src="/contents/intro/images/notice_text_box_icon01.gif" alt="<%=sc_pageTitle%>" /></div>
            <div class="notice_text_box_text">
              <div><strong><%=sc_pageTitle%></strong>는 공간통계지식체계의 서비스명칭 입니다.</div>
              <p><strong><%=sc_pageTitle%></strong>는 <strong>통계정보</strong>와 <strong>지리정보</strong>를 융합하여 실생활 공간에서 통계정보를 볼 수 있게 해주는 <strong>新개념 통계서비스</strong> 입니다. 현재 통계내비게이터, 이사/창업지역 찾기, 소지역별 고객 분포서비스, 노령화 정책지원 서비스, 센서스경계 자료제공, OpenAPI제공 등 다양한 서비스를 한 곳에서 이용할 수 있도록 <strong>포털</strong> 형식으로 운영하고 있습니다.</p>
            </div>
            <div class="clear"></div>
          </div>
      <div class="center top_mar_20"><img src="/contents/shortcut/images/diagram_image01.gif" alt="지리정보 + 통계정보" longdesc="process01.jsp" /></div>

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