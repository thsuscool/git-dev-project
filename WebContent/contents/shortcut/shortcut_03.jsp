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
<script src="/contents/scripts/common.js"></script>
<script src="/contents/scripts/javascript.js"></script>
<link rel="stylesheet" href="/contents/style/style.css" type="text/css" media="all">
<link rel="stylesheet" href="/contents/intro/style/01intro.css" type="text/css" media="all">
<script src=/contents/scripts/javascript.js></script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>
<script src=/contents/scripts/flash.js></script>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>
<script type="text/javascript">
<!--
  function openWin(){
    doInsertPageLog('230000', '<%= ConfigManager.getStatisticsResourceURL()%>/msgis/main.jsp', 'Y', '200000');
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
<%-- <%@ include file="/contents/include/header.jsp"%> --%>

<!-- left -->
<%-- <%@ include file="/contents/include/leftMenu.jsp" %> --%>
<link rel="stylesheet" href="/contents/shortcut/style/style.css" type="text/css" media="all">

<!------------------------right시작---------------------------->
    <div class="middle_right">
      <div class="content_title">
            <img src="/contents/shortcut/images/shortcut_content_title_2.gif" alt="이사지역찾기">
          <ul class="navigation">
            <li><img src="/contents/images/hoem_icon.gif" alt="HOME"></li>
            <li><a href="/">home</a> > <a href="/contents/shortcut/index.jsp">서비스바로가기</a> > <a href="/contents/shortcut/shortcut_03.jsp" class="ov">이사지역찾기</a></li>
            </ul>
        </div>
        <div class="content">

        <div class="notice_text_box">
    <div class="notice_text_box_top"></div>
      <div class="notice_text_box_icon top_mar_5"><img src="/contents/intro/images/notice_text_box_icon03.gif" width="77" alt="이사/창업지역찾기" /></div>
      <div class="notice_text_box_text">
        <div><strong>이사지역찾기</strong></div>
      <p>통계GIS OpenAPI를 이용한 서비스 모델로, 통계내비게이터의 일부 기능을 부동산 데이터와 접목하여 이사지역 찾기 기능으로 특화 및 발전시킨 서비스입니다.</p>
      <span class="right"><a href="javascript:openWin();"><img src="/contents/shortcut/images/link_button03.gif" alt="이사지역찾기 바로가기" border="0" /></a></span>
      </div>
      <div class="clear"></div>
    </div>


    <h3 class="h3 top_mar_15 left_mar_15">'이사'와 관련한 실생활적 명제에 도움을 주는 서비스입니다.</h3>
        <h3 class="h3 left_mar_15">국민 생활 통계데이터에 기반하여 관심 동네를 평가/선별해 줍니다.</h3>
        <h3 class="h3 left_mar_15">이사지역 선별 시, 주요 기준 중 하나인 부동산 정보(아파트 실거래가/시세)를 함께 조회할 수 있습니다.</h3>
        <h3 class="h3 left_mar_15">서비스 이용 시, 3단계의 순차적인 전개 방식으로 간단하고 편리합니다.</h3>

    <div class="top_mar_20 center"><img src="/contents/shortcut/images/diagram_image03.gif" alt="1단계(넓은 범위의 관심 지역 설정) → 2단계(관심동네여건설정) → 3단계(관심지역 최적 조건의 이사 지역 선별)" longdesc="process03.jsp" /></div>


        </div>
        <div class="clear"></div>
    </div>
<!------------------------right끝---------------------------->


<!-- bottom -->
<%-- <%@ include file="/contents/include/footer.jsp" %> --%>

    </td>
  </tr>
</table>

</body>
</html>