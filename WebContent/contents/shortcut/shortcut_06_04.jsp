<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
    String leftMenu="shortcut";
    RecordModel rm = null;
    GeneralBroker broker = null;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>공간통계 Open API제공리스트:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/section/sub.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/quick/style.css" />
<link rel="stylesheet" type="text/css" href="/contents/css/main/global.css" />
<link rel="stylesheet" type="text/css" href="/contents/inc/style.css" />

<script type="text/javascript" language="javascript" src="/contents/scripts/quickLink.js"></script>
<script type="text/javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" src="/contents/scripts/javascript.js"></script>
<script type="text/javascript" src="/contents/scripts/divwriter.js"></script>

<script type="text/javascript">
//<![CDATA[
function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function onLoadAjax(id) {}

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

function init() {
    var divElem = document.getElementById('detailApiDiv');

    divElem.setAttribute('type', 'table');
    divElem.setAttribute('data', 'shortcut_06_04_01.jsp');
}

function apiChanged() {
    var fm=document.pFm;
    var api_element_id = fm.api_element_id.value;

    if(api_element_id != '') {
        setParam(['api_element_id:'+api_element_id]);
        writeDiv(['detailApiDiv']);
    } else {
        document.getElementById('detailApiDiv').innerHTML = '';
    }
}

//API문서 다운로드
function apifileDownload(){
    var fm=document.pFm;

    fm.filename.value = fm.api_element_doc_down.value;
    fm.target="downloadIfr";
    fm.action="/contents/include/download.jsp";
    fm.submit();
}

//요청다운로드
function requestDownload() {
    var fm=document.pFm;

    fm.filename.value = fm.api_element_req_down.value;
    fm.target="downloadIfr";
    fm.action="/contents/include/download.jsp";
    fm.submit();
}
//응답다운로드
function responseDownload() {
    var fm=document.pFm;

    fm.filename.value = fm.api_element_res_down.value;
    fm.target="downloadIfr";
    fm.action="/contents/include/download.jsp";
    fm.submit();
}

//예제 실행하기
function examplesClicked() {
    var fm=document.pFm;

    if(fm.api_element_id.value == "") {
        alert("서비스를 선택하세요.");
        return;
    } else {

        var url = fm.api_element_example_exe.value;
        window.open(url, "api_samples", "width=850, height=650, resizable=yes");
    }
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

    <!--contents-->
    <div id="contents">
    <h2 id="q_contents">컨텐츠 영역</h2>
      <div id="loc"><img src="/contents/images/new/hoem_icon.gif" alt="" /> <a href="/">home</a> &gt; <a href="/contents/shortcut/shortcut_02.jsp">서비스바로가기</a> &gt;<a href="/contents/shortcut/shortcut_06.jsp">공간통계 OpenAPI</a> &gt; <a href="/contents/shortcut/shortcut_06_04.jsp"><span class="blue">통계지도 API</span></a></div>
      <h3><img src="/contents/shortcut/images/new/shortcut_content_title_6_4.gif" alt="API제공리스트" /></h3>
      <div id="article">
      <!-- 상단 박스-->
      <div class="notice_text_box">
      <p class="notice_top"></p>
      <div class="notice_center">
         <dl>
          <dt class="fl w315 pt20 pl20">통계지도API를 활용하여 실용적인 통계지도를 제작하세요. 통계지도API를 제작하기 위해서는 <span class="fb" >인증키를 발급</span>받아야합니다.</dt>
          <dd class="fr pr30"><a href="shortcut_06_03.jsp" title="새창열림"><img src="/contents/shortcut/images/shortcut_top_buttonAPI.gif" alt="API 이용등록" /></a> <a href="/contents/include/download.jsp?filename=Open API Tutorial.pdf" target="downloadIfr" onclick="fileDownload(pFm,'Open API Tutorial.pdf'); return false;" title="새창열림(도움말을 다운받아 보실 수 있습니다.)"><img src="/contents/shortcut/images/shortcut_top_buttonTutorial.gif" alt="HELP TUTORIAL" /></a></dd>

        </dl>
      </div>
      <p class="notice_bottom"></p>

<form name="pFm" method="post" action="shortcut_06_04.jsp" onsubmit="return false;">
    <input type="hidden" name="filename"/>
    <input type="hidden" name="path" value="/api/"/>

      <h4 class="left_ball_01"><label for="api_element_id">서비스</label></h4>
       <fieldset class="service_api">
       <legend>서비스</legend>
<%
    try {
        broker = new GeneralBroker("apaa00");

        lData.setString("PARAM","ELEMENTS2");
        lData.setString("sc_userkey", sc_userkey);
        lData.setString("sc_authid", sc_authid);
        rm = broker.getList(lData);

%>
        <select name="api_element_id" id="api_element_id" class="w222">
            <option value="">= 선택 =</option>
<%
        while(rm != null && rm.next()) {
            if(rm.get("api_basic_setting")!=null){
                String api_element_id = String.valueOf((BigDecimal)rm.get("api_element_id"));
                String api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
%>
            <option value="<%=api_element_id %>" <%if(lData.getString("api_element_id").equals(api_element_id)) {%>selected="selected"<%} %>><%=api_element_name.replaceAll("&", "&amp;") %></option>
<%
            }
        }
    }catch(Exception e) {
        System.out.print("sgisWebError : ");
      //2015-12-03 시큐어코딩
      //e.printStackTrace();
      logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
    }
%>
        </select> <a href="#" onclick="apiChanged(); return false;"><img src="/contents/images/btn_sec.gif" alt="이동" /></a>

      </fieldset>
       <div id="detailApiDiv" style="overflow: hidden;"></div>
</form>

      </div>
      </div>
    </div>
    <!--/contents-->

    </div>
    <!--/container-->
    <hr />

    <iframe name="downloadIfr" src="#" height="0" width="0" frameborder="0" title="다운로드프레임"></iframe><%-- 다운로드 타겟 프레임 --%>
    <!-- footer-->
    <%@include file="/contents/include/footer.jsp" %>
    <!-- /footer-->
</div>
<%@ include file="/contents/include/quickLink.jsp"%>
<!-- /quickLink-->
</body>
</html>
