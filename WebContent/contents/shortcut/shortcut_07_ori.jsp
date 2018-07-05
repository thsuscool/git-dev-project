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
            <img src="/contents/shortcut/images/shortcut_content_title_6.gif" alt="공간통계 OpenAPI">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
            <li><a href="/">home</a> > <a href="/contents/shortcut/index.jsp">서비스바로가기</a> > <a href="/contents/shortcut/shortcut_07.jsp" class="ov">공간통계 OpenAPI</a></li>
          </ul>                  
        </div>                
        <div class="content">
		
		  <div class="openapi_top">
		    <div class="openapi_top_text"><img src="/contents/shortcut/images/openapi_text01.gif" alt="통계청! 공간통계 Open API를 사용해보세요" /></div>
			<p>통계청! 공간통계 OpenAPI가 당신을 지원합니다.<br />
			개방과 공유, 참여의 새로운 통계세상을 만들고자 합니다.</p>
			<p><strong>공간통계 OpenAPI를 이용</strong>하시면,<br />
			당신의 홈페이지에 <strong>DHTML 및 JavaScript를 이용하여 통계정보</strong>를 나타낼 수 있습니다.</p>
			<p>또한 고급사용자들은 상세 API문서를 이용하여 보다 세련된 통계어플리케이션을 제작할 수 있습니다.</p>
		  </div>
		  
		  <div>
		  <h1>통계지리정보 서비스 게이트웨이</h1>
		    <ul class="h3_ul">
			  <li>기관 혹은 사용자가 ‘공간통계제공체계’에 '센서스 공간통계서비스'를 요청하고, ‘공간통계정보제공체계’ 가 기관 혹은 사용자에게 이들 결과 정보를 응답하는 개방형 API</li>
			  <li>기관 혹은 사용자는 이들 API를 통하여 자신만의 독자 통계모델 어플리케이션 구현이 가능한 구조</li>
			</ul>
		  <h1>통계WebGIS 저작을 위한 Map API</h1>
		    <ul class="h3_ul">
			  <li>통계지리정보 서비스게이트웨이의 개방형API를 확대하여, WebGIS Map 조작 Client 환경을 빠르게 구축할 수 있는 API</li>
			</ul>
		  
		  </div>
		  
		  <div class="openapi_key top_mar_20">
		    <h4>공간통계 Open API Key를 신청하세요.</h4>
			<div class="openapi_key_box">
			  <p class="openapi_key_text01">공간통계 <strong>OpenAPI를 사용하시려면 먼저 인증키를 신청</strong>하세요.</p>
			  <p class="openapi_key_text02">공간통계 OepnAPI의<br />
		        <strong>약관동의 및 간단한 이용자확인</strong>을 통하여 무료로 인증키를 발급 받을 수 있습니다.</p>
			  <a href="#"><img src="/contents/shortcut/images/openapi_key_button.gif" alt="API키 이용신청" border="0" /></a> </div>
		  </div>
		  
		  <div class="openapi_tutorial top_mar_20">
		    <h4>공간통계 Open API Tutorial</h4>
			<div class="openapi_tutorial_box">
			  <p>빠르고 쉽게 이용할 수 있는<strong> 튜토리얼</strong>이 제공됩니다.</p>
			  <a href="#"><img src="/contents/shortcut/images/openapi_tutorial_button.gif" alt="시작가이드" border="0" /></a> </div>
		  </div>
		  
		  <div class="clear"></div>
		  
		  <div class="openapi_special">
            <div class="box_style_4_top"></div>
			<div class="box_style_4_middle">
			  <div class="openapi_special_content">
			    <p>전문가용 API상세사양문서</p>
				<ul>
				  <li><a href="#">통계지도 API</a></li>
				  <li><a href="#">좌표변환 서비스</a></li>
				  <li><a href="#">지오코더 서비스</a></li>
				  <li><a href="#">리버스 지오코더 서비스</a></li>
				  <li><a href="#">Web Map 서비스</a></li>
				  <li><a href="#">통계항목검색 서비스</a></li>
				  <li><a href="#">공간통계정보서비스</a></li>
				</ul>
				<div class="clear"></div>
			  </div>
			</div>
			<div class="box_style_4_bottom"></div>		  
		  </div>
		  <div class="top_mar_20 left_mar_10"><img src="/contents/shortcut/images/diagram_image07.gif" alt="Open API구성도" /></div>
		
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