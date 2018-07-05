<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="통계, 통계지리, 정보, 서비스" />
<meta name="Description" content="통계, 통계지리, 정보, 서비스" />
<title>공간통계 Open API제공리스트:통계지리 정보서비스</title>
<link rel="stylesheet" type="text/css" href="/contents/css/layout/layout.css" />

<script type="text/javascript">
//<![CDATA[

function xmlGo(){
	 	var url = "<%=sc_webUrl%>/SGisService/getstaticsxml";
		var req = null
		var xml = document.getElementById("xmlcontent").value;
		if(window.XMLHttpRequest){
			req = new XMLHttpRequest();
		}else{
            req	= new ActiveXObject("Microsoft.XMLHTTP");
			
		}	
	
	    req.open("POST", url, false);
		req.setRequestHeader("Content-type","text/plain");
		req.send(xml);
		 if(req.status == 200){
			document.getElementById("resXML").value = req.responseText;
			
		}else{
			
			alert("잘못된 요청입니다.");
		} 
		
	}

//]]>
</script>
</head>

<body>
<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>

<div id="wrap">


    <!--contents-->
    <div id="contents">
    <h2 id="q_contents">컨텐츠 영역</h2>
     
      <div id="article">
		
		<!-- API 추가 시작 -->
		
	
		
			<div class="api_wrap">
			<p class="api_title">집계구 기반 공간통계  서비스</p>
			<h5 class="mrt20">1.집계구 기반 공간통계 서비스 요청 XML문서 작성</h5>
			<p class="api_tt2"> 1.요청XML를 완성해 주십시오.</p>
			<p class="api_tt2"> 2."API발급키"는 사용자에게 발급된 키로 꼭 바꾸셔야 합니다.</p>
			<p class="api_tt2"> 3.기준년도(baseyear)는 인구,가구,주택은 2000년과 2005만 제공되고 사업체는 2000년부터 2009년까지만 제공됩니다.</p>
			<p class="api_tt2"> 4.문서 완성 후 예제 실행하기를 눌러 주십시오.</p>
			<div class="api_sample">
			<textarea id="xmlcontent" rows="" cols="" >&lt;?xml version='1.0' encoding='UTF-8'?&gt;
&lt;SgisStaticsRequest  xmlns='http://service.gis.knso.org/sgistype' 
 xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;
&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
&lt;StaticsRequest&gt;
&lt;ReqRegionInfo&gt;
&lt;Region regionid = 'region_1'&gt;
&lt;gml:Envelope&gt;
&lt;gml:pos&gt;236998.80784611683 314810.4218812939&lt;/gml:pos&gt;
&lt;gml:pos&gt;238221.19215388317 315629.5781187061&lt;/gml:pos&gt;
&lt;/gml:Envelope&gt;
&lt;/Region&gt;
&lt;/ReqRegionInfo&gt;
&lt;ReqStatItemInfo&gt;
&lt;MartStatItem itemId = 'item_1' itemName=''&gt;
&lt;baseYear&gt;2005&lt;/baseYear&gt;
&lt;itemFieldName&gt;to_in_001&lt;/itemFieldName&gt;
&lt;/MartStatItem&gt;
&lt;MartStatItem itemId = 'item_2' itemName=''&gt;
&lt;baseYear&gt;2005&lt;/baseYear&gt;
&lt;itemFieldName&gt;to_in_002&lt;/itemFieldName&gt;
&lt;/MartStatItem&gt;
&lt;/ReqStatItemInfo&gt;
&lt;StaticsOutput targetSrs='LL_W' outputFormat='KML' outputUnit='OA'/&gt;
&lt;/StaticsRequest&gt;
&lt;/SgisStaticsRequest&gt;      </textarea>
			  <div class="api_play"><a href="#" onclick="xmlGo();"><img src="/contents/shortcut/images/new/btn_sample_play.gif" alt="예제실행하기" /></a></div>
			<h5 class="mrt20">2.예제 실행 후 응답이 표시됩니다.</h5>
			<textarea id="resXML" rows="" cols="" >
			</textarea>
			</div><!--// api_sample -->
		     
		</div><!--// api_wrap -->
		<!-- API 추가 끝 -->
      <!-- 상단 박스-->
		<div class="notice_text_box">

 

 
      </div>
      </div>
    </div>
    <!--/contents-->

    </div>
    <!--/container-->
    <hr />

   
</div>

</body>
</html>
