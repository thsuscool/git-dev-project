<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%
  String leftMenu="member";
  /*********************************/
  /* 결과 수신 URL */
  /*********************************/
  String retUrl = "01"+sc_webUrl+"/vname_Popup.jsp"; //결과수신 URL (01http:// 포함한 주소)
  String sessionId = (String)session.getId();

  String reqNum = sessionId.substring(0,20);
%>
<HTML>
<HEAD>
<TITLE><%=sc_pageTitle%></TITLE>
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/01intro/style/01intro.css" type="text/css" media="all">
<script src=/contents/scripts/javascript.js></script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>
<script src=/contents/scripts/flash.js></script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>
<style>
.pop_private { width:440px; margin:20px 0px 0px 10px;}
.private_box { width:422px; margin-top:10px;}
.private_box_top { background:url(/contents/images/private_box_top_image.gif) no-repeat; height:6px; width:422px; font-size:1px; line-height:1px;}
.private_box_middle {background:url(/contents/images/private_box_middle_image.gif) repeat-y; width:3422px;}
.private_box_middle .txt { margin:15px;}
.private_box_middle .txt p { text-align:justify;}
.private_box_bottom {background:url(/contents/images/private_box_bottom_image.gif) no-repeat; height:9px; width:422px; font-size:1px; line-height:1px;}
.private_copyright { float:left; margin:0px 0px 0px 10px;}
.private_button_close { float:left; margin-left:120px; margin-bottom:20px;}
.private_box2 { border: solid 1px #e1e1e1; width:390px; height:80px; padding:5px; text-align:justify; margin-top:20px; margin-bottom:20px;}
.private_box2 p { margin:5px;}
</style>
</HEAD>
<SCRIPT LANGUAGE="JavaScript">
<!--
  var CBA_window;
  function openCBAWindow(){

      CBA_window = window.open('', 'CbaWindow', 'width=410, height=450, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200' );
    document.reqCBAForm.action = 'https://name.siren24.com/vname/jsp/vname_j10.jsp';                     // 가상식별 실명확인서비스 URL
    document.reqCBAForm.target = 'CbaWindow';
    document.reqCBAForm.submit();

  }
//-->
</SCRIPT>
<BODY>
<div class="pop_private">
 <div class="private_box">
 <div class="private_box_top"></div>
        <div class="private_box_middle">
          <div class="txt">
            <h3 class="h3 left_mar_5">기존 사용자분은 실명인증 및 개인정보 수정 후 사용하세요!</h3>
            </div>
        <div class="private_box_bottom"></div>
        <div class="clear"></div>
        </div>
                    <form name="reqCBAForm" method="post">
                  <input type="hidden" name="id"       value = "<%=srvID %>">                            <!--회원사 아이디-->
                  <input type="hidden" name="reqNum"   value = "<%=reqNum%>">    <!--요청번호(영문,숫자 혼합 30자 이내, 대소문자 구분)-->
                  <input type="hidden" name="retUrl"   value = "<%=retUrl%>">  <!--결과수신 URL (01http:// 포함한 주소)-->
                  <input type="hidden" name="srvNno" value="<%=srvNno %>">
                    <div class="center top_mar_20"><a href="javascript:openCBAWindow();"><img src="/contents/member/images/button_join.gif" alt="회원가입" border="0" /></a></div>
                    </form>
</div>
</div>
</BODY>
</HTML>