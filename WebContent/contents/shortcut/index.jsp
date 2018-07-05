<%--
/*
    ********************************************************************
    * @source      : index.jsp
    * @description : 서비스바로가기
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2009-10-14 정종세 수정
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
  String leftMenu="shortcut";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>서비스바로가기:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />

<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
<script type="text/javascript" language="javascript">
//<![CDATA[
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//]]>
</script>
</head>

<body>
<div id="wrap">
    <!-- top -->
      <%@include file="/contents/include/header.jsp" %>
      <!-- /top -->

  <!-- container -->
  <div id="container">
    <!-- nav -->
    <%@include file="/contents/include/leftMenu.jsp" %>
    <!--/nav-->

    <!--contants-->
    <div id="contents">
    <h2 id="q_contents">컨텐츠 영역</h2>
      <div id="loc"><img src="/contents/images/new/hoem_icon.gif" alt="" /> <a href="/">home</a> &gt; <a href="/contents/shortcut/index.jsp"><span class="blue">서비스바로가기</span></a></div>
      <h3><img src="/contents/shortcut/images/new/shortcut_content_title_0.gif" alt="서비스바로가기" /></h3>
      <div class="titletext">
        <dl>
          <dt><img src="/contents/shortcut/images/new/index_top_title.gif" alt="공간통계지식체계가  제공하는 다양한 통계어플리케이션을 사용해보세요" /></dt>
          <dd><b>통계정보</b>와 <b>지리정보</b>를 융합하여 실생활 공간에 통계정보를 볼수 있게 해주는 <b>신개념 통계서비스</b> 입니다.<br />
            현재 통계내비게이터, 이사/창업지역 찾기, 소지역별 고객 분포서비스, 노령화 정책지원 서비스, 센서스 경계 자료제공, OpenAPI제공 등 다양한 서비스를 한곳에서 이용할 수 있도록 <b>포털</b> 형식으로 운영하고 있습니다.</dd>
        </dl>
      </div>
      <ul class="subbox">
        <li><a href="/contents/shortcut/shortcut_02.jsp" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_1','','/contents/shortcut/images/index_menu_1_over.gif',0)"><img src="/contents/shortcut/images/index_menu_1.gif" id="index_menu_1" name="index_menu_1" alt="통계내비게이터" /></a></li>
<!-- 20090507 전정아주무관 요청으로 제외
            <li><a href="/contents/shortcut/shortcut_03.jsp" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_2','','/contents/shortcut/images/index_menu_2_over.gif',0)"><img src="images/index_menu_2.gif" alt="이사지역찾기" name="index_menu_2" width="168" height="83" border="0" id="index_menu_2" /></a></li>
 -->
        <li><a href="/contents/shortcut/shortcut_04.jsp" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_3','','/contents/shortcut/images/index_menu_3_over.gif',0)"><img src="/contents/shortcut/images/index_menu_3.gif" id="index_menu_3" name="index_menu_3" alt="소지역별 고객분포 서비스" /></a></li>
        <li><a href="/contents/shortcut/shortcut_07.jsp" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_4','','/contents/shortcut/images/index_menu_4_over.gif',0)"><img src="/contents/shortcut/images/index_menu_4.gif" id="index_menu_4" name="index_menu_4" alt="노령화 정책 지원서비스" /></a></li>
        <li><a href="/contents/shortcut/shortcut_05_02.jsp" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_5','','/contents/shortcut/images/index_menu_5_over.gif',0)"><img src="/contents/shortcut/images/index_menu_5.gif" id="index_menu_5" name="index_menu_5" alt="센서스 공간통계자료제공" /></a></li>
        <li><a href="/contents/shortcut/shortcut_06.jsp" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_6','','/contents/shortcut/images/index_menu_6_over.gif',0)"><img src="/contents/shortcut/images/index_menu_6.gif" id="index_menu_6" name="index_menu_6" alt="공간통계 Open API" /></a></li>
        <li><a href="/contents/funnySGIS/index.jsp?parentMenuId=400000" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_7','','/contents/shortcut/images/index_menu_7_over.gif',0)"><img src="/contents/shortcut/images/index_menu_7.gif" id="index_menu_7" name="index_menu_7" alt="재미있는 SGIS" /></a></li>
        <li><a href="/contents/search/index.jsp?parentMenuId=300000" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('index_menu_8','','/contents/shortcut/images/index_menu_8_over.gif',0)"><img src="/contents/shortcut/images/index_menu_8.gif" id="index_menu_8" name="index_menu_8" alt="공간통계검색" /></a></li>
      </ul>
    </div>
    <!--/contants-->
  </div>
  <!--/container-->
  <hr />
  <!-- footer-->
  <%@include file="/contents/include/footer.jsp" %>
  <!-- /footer-->
</div>
<!--/wrap-->
</body>
</html>