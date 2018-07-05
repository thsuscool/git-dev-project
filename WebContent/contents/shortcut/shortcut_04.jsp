<%--
/*
    ********************************************************************
    * @source      : shortcut_04.jsp
    * @description : 서비스소개-소지역별고객분포서비스
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2009-10-08 정종세 수정       
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
<title>소지역별 고객분포서비스:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />

<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
<script type="text/javascript" language="javascript">
//<![CDATA[
  function openWin(){
    doInsertPageLog('250000', '<%= ConfigManager.getStatisticsResourceURL()%>/msgis/main.jsp?mode=state', 'Y', '200000');
  }
//]]>
</script>
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
    
<div id="loc"><img src="/contents/images/new/hoem_icon.gif" alt="" /> <a href="/">home</a> &gt; <a href="/contents/shortcut/index.jsp">서비스바로가기</a> &gt; <a href="/contents/shortcut/shortcut_04.jsp"><span class="blue">소지역별 고객분포서비스</span></a></div>
      <h3><img src="/contents/shortcut/images/new/shortcut_content_title_3.gif" alt="지식정보검색" /></h3>
          
      <div id="article">
      <!-- 상단 박스-->
	  <div class="notice_text_box">
	  <p class="notice_top"></p>
	  <div class="notice_center">
		 <dl>		  
		  <dt class="fl"><img src="/contents/intro/images/notice_text_box_icon04.gif" alt="" /></dt>
          <dd class="fl w525">
            <ul class="pl10">
              <li class="orange fb title_sbg pb10 pl10 pt5">소지역별 고객분포서비스</li>
              <li class="pl10">통계GIS Open API를 이용한 서비스 모델로, 소규모 영업점의 고객데이터를 지도 위에
표시하고 고객현황을 파악할 수 있도록 해 주는 고객관리 도우미입니다.</li>
              <li class="fr"><a href="<%= ConfigManager.getStatisticsResourceURL()%>/msgis/main.jsp?mode=state" onclick="javascript:openWin(); return false;" target="_blank"><img src="/contents/shortcut/images/link_button04.gif" alt="소지역별 고객분포서비스" title="새창열림" /></a></li>
            </ul>
          </dd>
        </dl>		
	  </div>
	  <p class="notice_bottom"></p>
	   <ul class="pl20 pb25 pt20">
		<li class="left_ball">고객데이터를 확보한 소상공인이면 누구나 고객관리에 도움을 주는 정보를 분석해 볼 수 있도록 데이터 등록/변환
기능을 제공합니다.</li>
		<li class="left_ball">통계와 GIS 특성이 두루 반영된 고객정보 분석 결과를 보여줍니다.</li>
		</ul>
		<p class="tc pt10"><img src="/contents/shortcut/images/diagram_image04.gif" alt="1단계:고객데이터 등록(필수-이름/주소) (선택-매출/성별/결혼/나이) → 2단계:고객데이터 분석 결과 확인(고객분포도조회, 구매분포도조회, 방문성향분석조회, 고객공략지조회)"   longdesc="/contents/shortcut/process04.jsp" /></p>		
	  </div>
	  <!-- /상단 박스-->
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
</body>
</html>