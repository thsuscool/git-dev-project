<%--
/*
    ********************************************************************
    * @source      : support_03.jsp
    * @description : FAQ
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2008-11-11    SHIN HYUN MYUNG      1.0         최초등록
    * 2009-10-06 정종세 수정   
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>

<%@ page import="kr.co.offton.jdf.db.DbManager"       %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"     %>
<%@ page import="kr.co.offton.jdf.util.StringUtil"    %>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%
	/* left menu info */
	String leftMenu="supprot";
	GeneralBroker broker = null;
	RecordModel faqSet = null;

	int rowCount             = 0;
	String sgis_faq_id       = "";
	String sgis_faq_contents = "";

	try {

		broker = new GeneralBroker("adfb00");
		
		lData.set("sql","list");
		faqSet = broker.getList(lData);

		if(faqSet != null)	rowCount =	faqSet.getRowCount();
	}catch(Exception e) {

		System.out.println("***exception info***\n"+e);

	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>FAQ:통계지리정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/quick/style.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/main/global.css" />
<link rel="stylesheet" type="text/css" href="/contents/inc/style.css" />
<script type="text/javascript" language="javascript" src="/contents/scripts/quickLink.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
<style type="text/css">
.support_03_faq {background:url(images/site_control_top.gif) repeat-x left top;margin-left:10px;}
.support_03_question {background:url(/contents/gsks/images/site_control_faq_line.gif) no-repeat left bottom;}
.support_03_question p {margin:0;padding:8px 0 7px 40px;background:url(/contents/gsks/images/bullet_question.gif) no-repeat 20px 10px;color:#000000;}
.support_03_answer {background:#f8f8f8 url(/contents/gsks/images/site_control_faq_line.gif) no-repeat left bottom;}
.support_03_answer p {margin:0;padding:8px 0 7px 54px;background:url(/contents/gsks/images/bullet_answer.gif) no-repeat 20px 6px;color:#999999;}
</style>
</head>

<body>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>
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
    
      <div id="loc"><img src="/contents/images/new/hoem_icon.gif" alt="" /> <a href="/">home</a> &gt; <a href="/contents/support/support_01.jsp">참여마당</a> &gt; <a href="/contents/support/support_03.jsp"><span class="blue">FAQ</span></a></div>
      <h3><img src="/contents/support/images/support_content_title_3.gif" alt="FAQ" /></h3>
        
      <div id="article">
<%
	if(rowCount > 0) {

		if(faqSet.next()) {
			sgis_faq_id       = StringUtil.verify_s((String)faqSet.get("sgis_faq_id"));
			sgis_faq_contents = (String)faqSet.get("sgis_faq_contents");
%>
			<%=sgis_faq_contents %>
<%	}//end of while
	}else { %>
			<div style="height:30px;"></div>
			<div class="center">데이터가 존재하지 않습니다.</div>
<%} %>
<!--       
        <ul>
          <li class="left_ball_04"> SGIS유통홈페이지
            <ul class="pb20 pt10">
              <li>SGIS유통홈페이지 질문</li>
              <li>SGIS유통홈페이지 답변</li>
            </ul>
          </li>
          <li class="left_ball_04"> 통계네비게이터
            <ul class="pb20 pt10">
              <li>통계내비게이터 질문</li>
              <li>통계내비게이터 답변</li>
            </ul>
          </li>
          <li class="left_ball_04"> OpenAPI
            <ul class="pb20 pt10">
              <li>OpenAPI 질문</li>
              <li>OpenAPI 답변</li>
            </ul>
          </li>
        </ul>
-->        
      </div>
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
<%@ include file="/contents/include/quickLink.jsp"%>
<!-- /quickLink-->
</body>
</html>