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
            <img src="/contents/shortcut/images/shortcut_content_title_6_3.gif" alt="API키 이용신청">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
            <li><a href="/">home</a> > <a href="/contents/shortcut/index.jsp">서비스바로가기</a> > <a href="/contents/shortcut/shortcut_07.jsp">공간통계 OpenAPI</a> &gt; <a href="/contents/shortcut/shortcut_06_03.jsp" class="ov">API키 이용등록 </a></li>
          </ul>                  
        </div>                
        <div class="content">
		
		  <div class="openapi_top">
		    <div class="openapi_top_text"><img src="/contents/shortcut/images/openapi_text02.gif" alt="공간통계 Open API 이용약관" /></div>
			<div class="openapi_use_text">
			  <h4>제 1 조 (목적) </h4>
			  <p>이 약관은 통계청이 제공하는 OpenAPI 이용과 관련하여 통계청과 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
			  <p>이 약관은 통계청이 제공하는 OpenAPI 이용과 관련하여 통계청과 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
			  <h4>제 1 조 (목적) </h4>
			  <p>이 약관은 통계청이 제공하는 OpenAPI 이용과 관련하여 통계청과 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
			</div>
		  </div>
		  
		  <h1 class="top_mar_40">API키 발급 필수 항목</h1>
		  <div class="openapi_form_tip"><img src="/contents/shortcut/images/icon_sign.gif" alt="필수입력항목" /> 필수입력항목입니다.</div>
		  <div class="openapi_form">
		    <div class="box_style_1_top"></div>
			<div class="box_style_1_middle">
			  <div>
			    <table width="615" border="0" cellspacing="0" cellpadding="0" class="table1" summary="API키 이용등록 발급 신청 필수항목 양식입니다.">
				  <caption>API키 발급 필수 항목</caption>
                  <tr>
                    <th width="125" class="td_top">시스템명<img src="/contents/shortcut/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
                    <td class="td_top t_end">
					<label>
                      <input type="text" name="textfield" />
                    </label></td>
                  </tr>
                  <tr>
                    <th>E-mail<img src="/contents/shortcut/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
                    <td class="t_end"><input name="textfield2" type="text" size="8" />
                      @
                      <input name="textfield3" type="text" size="24" /></td>
                  </tr>
                  <tr>
                    <th>연락처<img src="/contents/shortcut/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
                    <td class="t_end"><input name="textfield4" type="text" size="4" />
                      -
                      <input name="textfield5" type="text" size="4" />
                      -
                      <input name="textfield6" type="text" size="4" /></td>
                  </tr>
                  <tr>
                    <th>예상사용자수<img src="/contents/shortcut/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
                    <td class="t_end"><input type="text" name="textfield7" /></td>
                  </tr>
                  <tr>
                    <th>사용서버 IP<img src="/contents/shortcut/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
                    <td class="t_end"><input type="text" name="textfield8" /></td>
                  </tr>
                  <tr>
                    <th>사용용도<img src="/contents/shortcut/images/icon_sign.gif" alt="필수입력항목" class="icon_sign" /></th>
                    <td class="t_end">API를 이용하여 어떤서비스를 구현하고자 하는지 적어주세요.<br />고객님들의 의견은 더 좋은 공간통계 OpenAPI를 만들어가는데 큰 도움이 됩니다.<textarea name="" cols="" rows=""></textarea> </td>
                  </tr>
                </table>
			  </div>
			</div>
			<div class="box_style_1_bottom"></div>
	      </div>
	      <div class="center top_mar_20"><img src="/contents/shortcut/images/button_application.gif" alt="신청" /></div>
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