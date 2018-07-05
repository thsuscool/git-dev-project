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
<script type="text/JavaScript">
<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
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
//-->
</script>

<div class="middle_right">
    	<div class="content_title">
          <img src="/contents/shortcut/images/shortcut_content_title_6_5.gif" alt="검색 및 변환 API">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
                <li><a href="/">home</a> > <a href="/contents/shortcut/index.jsp">서비스소개</a> > <a href="/contents/shortcut/shortcut_06.jsp">공간통계 OpenAPI</a> &gt; <a href="/contents/shortcut/shortcut_06_05.jsp" class="ov">검색 및 변환 API </a></li>
          </ul>
        </div>
        <div class="content">

		<div class="staticmap_api_top">
		  <div class="staticmap_api_top_text">
		    <p>검색 및 변환 API를 활용하여 통계API를 제작하세요.<br />검색 및 변환 API가 제공하는 다양한 통계자료를 이용하기 위해서는 <strong>인증키를 발급</strong>받아야 합니다.</p>
			<p>자세한정보를 얻으려면? <span class="api_download"><a href="#">API문서다운로드</a></span></p>
		  </div>
		  <div class="staticmap_api_top_button">
		    <a href="#"><img src="/contents/shortcut/images/button_apikey.gif" alt="API키 이용신청" border="0" /></a><a href="#"><img src="/contents/shortcut/images/button_tutorial.gif" alt="TUTORIAL" border="0" /></a></div>
		</div>
		<div class="clear"></div>

		<div class="tab">
		  <ul>
		    <li><a href="/contents/shortcut/shortcut_06_05_tab_page01.jsp"><img src="/contents/shortcut/images/transformation_tab01_over.gif" alt="좌표변화서비스" border="0" id="Image1" onmouseover="MM_swapImage('Image1','','/contents/shortcut/images/transformation_tab01_over.gif',1)" onfocus="MM_swapImage('Image1','','/contents/shortcut/images/transformation_tab01_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
			<li><a href="/contents/shortcut/shortcut_06_05_tab_page02.jsp"><img src="/contents/shortcut/images/transformation_tab02.gif" alt="Geocoder서비스" border="0" id="Image2" onmouseover="MM_swapImage('Image2','','/contents/shortcut/images/transformation_tab02_over.gif',1)" onfocus="MM_swapImage('Image2','','/contents/shortcut/images/transformation_tab02_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
			<li><a href="/contents/shortcut/shortcut_06_05_tab_page03.jsp"><img src="/contents/shortcut/images/transformation_tab03.gif" alt="ReverseGeocoder" border="0" id="Image3" onmouseover="MM_swapImage('Image3','','/contents/shortcut/images/transformation_tab03_over.gif',1)" onfocus="MM_swapImage('Image3','','/contents/shortcut/images/transformation_tab03_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
			<li><a href="/contents/shortcut/shortcut_06_05_tab_page04.jsp"><img src="/contents/shortcut/images/transformation_tab04.gif" alt="WebMap Service" border="0" id="Image4" onmouseover="MM_swapImage('Image4','','/contents/shortcut/images/transformation_tab04_over.gif',1)" onfocus="MM_swapImage('Image4','','/contents/shortcut/images/transformation_tab04_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
			<li><a href="/contents/shortcut/shortcut_06_05_tab_page05.jsp"><img src="/contents/shortcut/images/transformation_tab05.gif" alt="통계항목검색서비스" border="0" id="Image5" onmouseover="MM_swapImage('Image5','','/contents/shortcut/images/transformation_tab05_over.gif',1)" onfocus="MM_swapImage('Image5','','/contents/shortcut/images/transformation_tab05_over.gif',1)" onmouseout="MM_swapImgRestore()" onblur="MM_swapImgRestore()" /></a></li>
		  </ul>
		  <div class="clear"></div>
		</div>

		<h1>좌표변화서비스</h1>
		<div>
		  <div class="box_style_5_top"></div>
		  <div class="box_style_5_middle">
		    <div class="overlap_content">
			  컨텐츠 내용이 들어갑니다.
			</div>
		  </div>
		  <div class="box_style_5_bottom"></div>
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