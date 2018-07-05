<%--
/*
    ********************************************************************
    * @source      : shortcut_06_10_07.jsp
    * @description : 공유마당-OpenAPI-OpenAPI1.0-집계구 기반 공간 통계 서비스
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    *       
    * 2014-09-15 		이경현							디자인 시각화      
    ********************************************************************
 */
--%>  
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
    String leftMenu="shortcut";
    RecordModel rm = null;
    GeneralBroker broker = null;
    String  api_expert_doc = new String("공간통계OpenAPI_사용자지침서.pdf");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" /><!-- 전화번호 자동 링크 생성 방지 --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
		<link rel="stylesheet" href="/contents/css/2014_css/css/default.css" />   
		<script type="text/javascript" src="/contents/css/2014_css/js/jquery-1.11.0.min.js"></script> 
		<script type="text/javascript" src="/contents/css/2014_css/js/default.js"></script> 
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
	<script type="text/javascript" src="/contents/scripts/divwriter.js"></script>
			
	
	<script type="text/javascript" language="javascript">
	//<![CDATA[
	  function apiRun(){
	var winpop =window.open("shortcut_06_10_07_pop.jsp","winpop","width=700px,height=580px");

		
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
		<div class="wrapper">
			<!-- cls:header start -->
			<div class="header"> 
			<!-- top -->
		  	<%@include file="/contents/include/header_2014.jsp" %>		<!-- 헤어 영역 -->
		  	<!-- /top -->			
  			</div><!-- cls:header end -->


			<!-- cls:contents start -->
			<div class="contents subbg">
				<div class="container">
					<div class="lnb">
						<%@include file="/contents/include/leftMenu_2014.jsp" %>
						<script type="text/javascript">
							$("#l05").attr("style", "display:block");		//left Menu에서 참여바당 부분 보여줌.
							$("#l052").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0525").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
			<!--   집계구기반 공간통계서비스  -->
			<div class="location">
				<p><span class="on"><span>OpenAPI 1.0</span> &lt;  <span>OpenAPI </span> &lt;  <span>공유마당 </span> &lt;  <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">OpenAPI 1.0</p>
				<p class="txt02">S-OpenAPI 1.0의 내용은 다음과 같습니다.</p>
			</div>
			<div class="use_wrap">	
					<div class="apiTitleBlue">※ S-OpenAPI 1.0은 2013년 12월 말 서비스 종료 되었습니다.</div>
					<div class="apiTab">
						<div>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_08.jsp">MapControl/Overlay서비스</a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_01.jsp">좌표 변환 서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_02.jsp">WebMap 서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_03.jsp">Geocoder서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_04.jsp">Reverse Geocoder서비스</a></span>
						</div>
						<div>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_05.jsp"> 집계구 기반 제공 항목 검색 서비스</a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_06.jsp">원시명부항목검색서비스 </a></span>
							<span class="apiTab_font01"><a href="/contents/shortcut/shortcut_06_10_07.jsp">집계구 기반 공간통계서비스 </a></span>
						</div>							
					</div>
					<div class="apiP01">
						<p class="apiP01Tilte">집계구 기반 공간통계 서비스</p>
						<p class="apiPFont01">
						통계지리정보서비스가 제공하는 각종 공간 통계 정보의 분류항목 및 통계항목에 대한 검색API에 전달되는 요청문서의 구성을 통해 집계구 기반 공간통계을 조회합니다.
						</p>
					</div>
					<div class="apiP01">
						<p class="apiP02Title">1. 기본정보</p>
						<div class="apiPFont01">
							<table class="useTable" summary="자료 신청">
								<caption>센서스 공간통계 자료 신청.</caption>
								<colgroup>
									<col width="120"/>
									<col width=""/> 
								</colgroup>
								<tbody>
								<tr>
									<th scope="row">Request URL</th>
									<td>http://sgis1.kostat.go.kr/SGisService/getstaticsxml</td>
								</tr> 
								<tr>
									<th scope="row">호출방법</th>
									<td>HTTP POST</td>
								</tr>
								<tr>
									<th scope="row">검색결과포맷</th>
									<td>XML</td>
								</tr>						
								</tbody>
							</table>
						</div>
					</div>
					<div class="apiP02">
							<p class="apiP02Title">2. 요청문서</p>
							<h5 class="apiPFont02">2.1 요청문서 구성</h5>
							<p class="apiPFont01">공간통계 요청 문서는 인증키, 영역, 통계항목, 응답형식으로 구성됩니다.</p>							
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisStaticsRequest&gt;
	&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
	&lt;StaticsRequest&gt;
		&lt;ReqRegionInfo&gt;
			&lt;Region regionid="region_1"&gt;
				&lt;gml:Envelope&gt;
					&lt;gml:pos&gt;236998.80784611683 314810.4218812939&lt;/gml:pos&gt;
					&lt;gml:pos&gt;238221.19215388317 315629.5781187061&lt;/gml:pos&gt;
				&lt;/gml:Envelope&gt;
			&lt;/Region&gt;
		&lt;/ReqRegionInfo&gt;
		&lt;ReqStatItemInfo&gt;
			&lt;MartStatItem itemId="item_1" itemName=""&gt;
				&lt;baseYear&gt;2005&lt;/baseYear&gt;
				&lt;itemFieldName&gt;to_in_001&lt;/itemFieldName&gt;
			&lt;/MartStatItem&gt;
		&lt;/ReqStatItemInfo&gt;
		&lt;StaticsOutput targetSrs="LL_W" outputEormat="KML" outputUbit="OA"&gt;
	&lt;/StaticsRequest&gt;
&lt;/SgisStaticsRequest&gt;				
							</textarea>	
							<div>
								<table class="listTable">
								<caption>요청문서 구성</caption>
									<tr>
										<th class="first">순번</th>
										<th>요소명</th>
										<th class="last">설명</th>
									</tr>
									<tr>
										<td>1</td>
										<td class="listTableAlian">&lt;svcKey&gt;</td>									
										<td class="listTableAlian">통계지리정보서비스에서 발급받은 API이용키</td>
									</tr>
									<tr>
										<td>2</td>
										<td class="listTableAlian">&lt;ReqRegionInfo&gt;</td>
										<td class="listTableAlian">지리적 공간통계 조회 대상 영역 Bounding Box, Center Point <br/>&amp; Radius, Polygon, 행정경계코드 중 선택하여 지정 합니다.</td>
									</tr>
									<tr>
										<td>3</td>
										<td class="listTableAlian">&lt;ReqStatItemInfo&gt;</td>
										<td class="listTableAlian"> 집계구 기반 제공 공간통계 항목 설정 </td>
									</tr>
									<tr>
										<td>4</td>
										<td class="listTableAlian">&lt;StaticsOutput&gt;</td>
										<td class="listTableAlian">응답포맷 및 집계구 인코딩을 위한 좌표체계 지정</td>
									</tr>								
							</table>
						</div>
					</div>
					<div class="apiP02">
							<h5 class="apiPFont02">2.2 요청영역설정</h5>
							<h6 class="apiPFont03">2.2.1 Bounding Box</h6>
							<p class="apiPFont01">Minx, MinY, maxX, maxY의 지리적 좌표를 입력하고 해당 영역과 겹치는 집계구의 통계정보를 검색 합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;ReqRegionInfo&gt;
	&lt;Region regionid="region_1"&gt;
		&lt;gml:Envelope&gt;
			&lt;gml:pos&gt;236998.80784611683 314810.4218812939&lt;/gml:pos&gt;
			&lt;gml:pos&gt;238221.19215388317 315629.5781187061&lt;/gml:pos&gt;
		&lt;/gml:Envelope&gt;			
	&lt;/Region&gt;
&lt;/ReqRegionInfo&gt;</textarea>
							<h6 class="apiPFont03">2.2.2 CircleByCenterPoint</h6>	
							<p class="apiPFont01">지리적 중심 좌표 및 반지름을 입력하여 해당 영역과 겹치는 집계구의 통계정보를 검색 합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;ReqRegionInfo&gt;
	&lt;Region regionid="region_1"&gt;
		&lt;gml:CircleByCenterPoint&gt;
			&lt;gml:pos&gt;236998.80784611683 314810.4218812939&lt;/gml:pos&gt;
			&lt;gml:radius&gt;500&lt;/gml:radius&gt;
		&lt;/gml:CircleByCenterPoint&gt;
	&lt;/Region&gt;
&lt;/ReqRegionInfo&gt;
							</textarea>								
							<h6 class="apiPFont03">2.2.3 Polygon</h6>	
							<p class="apiPFont01">임의의 다각형을 구성하는 지리적 좌표 목록을 입력하여 해당 영역과 겹치는 집계구의 통계정보를 검색 합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;gml:Polygon&gt;
	&lt;gml:exterior&gt;
		&lt;gml:LinearRing&gt;
			&lt;gml:pos&gt;236998 314810&lt;/gml:pos&gt;
			&lt;gml:pos&gt;238221 314810&lt;/gml:pos&gt;
			&lt;gml:pos&gt;238221 315629&lt;/gml:pos&gt;
			&lt;gml:pos&gt;236998 314810&lt;/gml:pos&gt;
		&lt;/gml:LinearRing&gt;
	&lt;/gml:exterior&gt;
&lt;/gml:Polygon&gt;</textarea>
							<h5 class="apiPFont03">2.3 통계 항목 설정</h5>							
							<p class="apiPFont01">집계구 기반 제공 항목 검색 서비스를 통해 검색된 항목 아이디 중 통계를 조회를 원하는 항목을&lt;itemFieldName&gt;에 설정하며 기준년도&lt;baseyear&gt;는 인구,가구,주택은 2000년과 2005년만 제공되고 사업체는 2000년부터 2009년까지만 제공됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;ReqStatItemInfo&gt;
	&lt;MartStatItem itemId="item_1" itemName=""&gt;
		&lt;baseYear&gt;2005&lt;/baseYear&gt;
		&lt;itemFieldName&gt;to_in_001&lt;/itemFieldName&gt;
	&lt;/MartStatItem&gt;		
&lt;/ReqStatItemInfo&gt;</textarea>
							<h5 class="apiPFont03">2.4 응답 형식 지정</h5>							
							<p class="apiPFont01">“&lt;StaticsOutput&gt;” 요소를 구성하는 속성에 원하는 정보 인코딩 형식을 지정합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;SgisStaticsRequest&gt;
	&lt;StaticsRequest&gt;
	     .......
		&lt;StaticsOutput targetSrs="LL_W" outputEormat="KML" outputUbit="OA"&gt;
	&lt;/StaticsRequest&gt;
&lt;/SgisStaticsRequest&gt;
					</textarea>
					<p class="apiPFont01">위 예제는 KML 형식을 준수하여 통계정의문서를 생성하고 이 때 사용하는 좌표계는 “WGS84” 경위도 좌표계를 사용하여 지형형상을 인코딩하라는 의미입니다.
아래 표는 각 속성에 적용될 수 있는 값을 설명합니다.</p>
					<table class="listTable">
							<caption>요청문서 구성</caption>
								<tr>
									<th class="first">순번</th>
									<th>요소명</th>
									<th class="last">설명</th>
								</tr>
								<tr>
									<td rowspan="7" class="listTableLeft">targetSrs</td>
									<td class="listTableAlian">LL_B</td>									
									<td class="listTableAlian">BESSEL 타원체 경위도 좌표</td>
								</tr>
								<tr>
									<td class="listTableAlian">LL_W</td>
									<td class="listTableAlian">WGS84 타원체 경위도 좌표</td>
								</tr>
								<tr>									
									<td class="listTableAlian">TM_M</td>
									<td class="listTableAlian">TM 중부원점</td>
								</tr>
								<tr>
									<td class="listTableAlian">TM_W</td>
									<td class="listTableAlian">TM 서부원점</td>
								</tr>
								<tr>
									<td class="listTableAlian">TM_W</td>
									<td class="listTableAlian">TM 동부원점</td>
								</tr>
								<tr>
									<td class="listTableAlian">TM_K</td>
									<td class="listTableAlian">UTM-K 형식</td>
								</tr>
								<tr>
									<td class="listTableAlian">UTM_52</td>
									<td class="listTableAlian">UTM52N 좌푯</td>
								</tr>
								<tr>
									<td rowspan="2" class="listTableLeft">targetSrs</td>
									<td class="listTableAlian">KML</td>									
									<td class="listTableAlian">KML 형식 정보 인코딩</td>
								</tr>
								<tr>
									<td class="listTableAlian">KML</td>
									<td class="listTableAlian">GML 형식 정보 인코딩</td>
								</tr>
								<tr>
									<td rowspan="2" class="listTableLeft">targetSrs</td>
									<td class="listTableAlian">OA</td>									
									<td class="listTableAlian">요청영역과 겹치는 소지역 집계구 기반 정보 인코딩</td>
								</tr>
								<tr>
									<td class="listTableAlian">DONG</td>
									<td class="listTableAlian">요청영역과 겹치는 읍면동 기반 정보 인코딩</td>
								</tr>
						</table>
						<h5 class="apiPFont02">2.5 요청문서샘플</h5>
						<h6 class="apiPFont02">2.5.1 Bounding Box에 집계구 기반 공간통계 검색</h6>
						<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;SgisStaticsRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
	&lt;StaticsRequest&gt;
		&lt;ReqRegionInfo&gt;
			&lt;Region regionid="region_1"&gt;
				&lt;gml:Envelope&gt;
					&lt;gml:pos&gt;236998.80784611683 314810.4218812939&lt;/gml:pos&gt;
					&lt;gml:pos&gt;238221.19215388317 315629.5781187061&lt;/gml:pos&gt;
				&lt;/gml:Envelope&gt;
			&lt;/Region&gt;
		&lt;/ReqRegionInfo&gt;
		&lt;ReqStatItemInfo&gt;
			&lt;MartStatItem itemId="item_1" itemName=""&gt;
				&lt;baseYear&gt;2005&lt;/baseYear&gt;
				&lt;itemFieldName&gt;to_in_001&lt;/itemFieldName&gt;
			&lt;/MartStatItem&gt;			
		&lt;/ReqStatItemInfo&gt;
		&lt;StaticsOutput targetSrs="LL_W" outputFormat="KML" outputUnit="OA"/&gt;
	&lt;/StaticsRequest&gt;
&lt;/SgisStaticsRequest&gt;				
							</textarea>	
					</div>
							
					<div class="apiP02">
							<p class="apiP02Title">3. 응답문서</p>							
							<p class="apiPFont01">요청문서에 지정된 응답형식에 따라 인코딩 된 문서를 가리키는 URL을 포함하는 응답문서가 반환됩니다. 사용자는 URL에 접근함으로써 공간통계정의문서를 이용합니다.</p>							
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="euc-kr"?&gt;
&lt;SgisStaticsResponse xmlns="http://service.gis.knso.org/sgistype"&gt;
	&lt;StaticsResponse outputFormat="KML" outputUnit="OA"&gt;
		&lt;URL&gt;http://211.34.86.118/SGisService/data/2011/08/09/20110809145444909638.kml&lt;/URL&gt;
	&lt;/StaticsResponse&gt;
&lt;/SgisStaticsResponse&gt;
							</textarea>	
					</div>

					<div class="apiP02">	
							<p class="apiP02Title">4. API 이용샘플</p>
							<h5 class="apiPFont02">4.1 JAVA</h5>
							<p class="apiPFont01">크로스 도메인 해결을 위한 서버코드 작성을 위한 자바 샘플 코드 입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">package test.testapis;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URLConnection;
import java.net.URLEncoder;

import java.net.URL;

public class StaticsXml {

	public String sgisApiStaticsXml(String requestXml) {
		final String apiurl = "http://sgis1.kostat.go.kr/SGisService/getstaticsxml";
		StringBuffer responseXml = new StringBuffer();

		try {
			/**
			 *
			 */
			//String reqData = URLEncoder.encode(requestXml, "UTF-8");
			
			URL url = new URL(apiurl);
			URLConnection conn = url.openConnection();
			conn.setDoOutput(true);

			OutputStreamWriter owr = new OutputStreamWriter(conn
					.getOutputStream());
			owr.write(requestXml);
			owr.flush();

			InputStream is = conn.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is));

			String line;
			while ((line = br.readLine()) != null) {
				responseXml.append(line);
			}

		} catch (MalformedURLException me) {
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+me);

		} catch (IOException ioe) {
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+ioe);

		}
		return responseXml.toString();
	}

	public static void main(String[] args) throws Exception {
StaticsXml api = new StaticsXml();
//요청문서 작성 시작
	final String reqXml = "&lt;?xml version='1.0' encoding='UTF-8'?&gt;";
		 reqXml += "&lt;SgisStaticsRequest  xmlns='http://service.gis.knso.org/sgistype' ";
reqXml += "xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;";
		 reqXml += "&lt;svcKey&gt;API발급키&lt;/svcKey&gt;";
		 reqXml += "&lt;StaticsRequest&gt;";
		 reqXml += "&lt;ReqRegionInfo&gt;";
reqXml += "&lt;Region regionid = 'region_1'&gt;";
		 reqXml +="&lt;gml:Envelope&gt;";
reqXml += "&lt;gml:pos&gt;236998.80784611683 314810.4218812939&lt;/gml:pos&gt;";
reqXml +="&lt;gml:pos&gt;238221.19215388317 315629.5781187061&lt;/gml:pos&gt;";
reqXml += "&lt;/gml:Envelope&gt;";
		 reqXml +="&lt;/Region&gt;";
reqXml += "&lt;/ReqRegionInfo&gt;";
		 reqXml += "&lt;ReqStatItemInfo&gt;";
reqXml += "&lt;MartStatItem itemId = 'item_1' itemName=''&gt;";
reqXml += "&lt;baseYear&gt;2005&lt;/baseYear&gt;";
reqXml += "&lt;itemFieldName&gt;to_in_001&lt;/itemFieldName&gt;";
reqXml += "&lt;/MartStatItem&gt;";
reqXml += "&lt;MartStatItem itemId = 'item_2' itemName=''&gt;";
reqXml += "&lt;baseYear&gt;2005&lt;/baseYear&gt;";
reqXml += "&lt;itemFieldName&gt;to_in_002&lt;/itemFieldName&gt;";
reqXml += "&lt;/MartStatItem&gt;";
reqXml += "&lt;/ReqStatItemInfo&gt;";
		 reqXml += "&lt;StaticsOutput targetSrs='LL_W' outputFormat='KML' outputUnit='OA'/&gt;";
		 reqXml +="&lt;/StaticsRequest&gt;";
reqXml += "&lt;/SgisStaticsRequest&gt;";
//요청문서 작성 끝
		String response = api.sgisApiStaticsXml(reqXml);
		System.out.println(response);	}

}							</textarea>

							<h5 class="apiPFont02">4.2 Javascript</h5>
							<p class="apiPFont01">AJAX 를 적용하여 통계 조회 어플리케이션 작성을 위한 샘플 코드 입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
  &lt;title&gt; New Document &lt;/title&gt;
  &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
  &lt;script type="text/javascript"&gt;
	function aaaaopen(){
		var url = "http://sgis1.kostat.go.kr/SGisService/getstaticsxml";
                        //요청문서 작성 시작
		  var xml= "&lt;?xml version='1.0' encoding='UTF-8'?&gt;";
		 xml += "&lt;SgisStaticsRequest  xmlns='http://service.gis.knso.org/sgistype' ";
xml += "xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;";
		 xml += "&lt;svcKey&gt;API발급키&lt;/svcKey&gt;";
		 xml += "&lt;StaticsRequest&gt;";
		 xml += "&lt;ReqRegionInfo&gt;";
xml += "&lt;Region regionid = 'region_1'&gt;";
		 xml +="&lt;gml:Envelope&gt;";
xml += "&lt;gml:pos&gt;236998.80784611683 314810.4218812939&lt;/gml:pos&gt;";
xml +="&lt;gml:pos&gt;238221.19215388317 315629.5781187061&lt;/gml:pos&gt;";
xml += "&lt;/gml:Envelope&gt;";
		 xml +="&lt;/Region&gt;";
xml += "&lt;/ReqRegionInfo&gt;";
		 xml += "&lt;ReqStatItemInfo&gt;";
xml += "&lt;MartStatItem itemId = 'item_1' itemName=''&gt;";
xml += "&lt;baseYear&gt;2005&lt;/baseYear&gt;";
xml += "&lt;itemFieldName&gt;to_in_001&lt;/itemFieldName&gt;";
xml += "&lt;/MartStatItem&gt;";
xml += "&lt;MartStatItem itemId = 'item_2' itemName=''&gt;";
xml += "&lt;baseYear&gt;2005&lt;/baseYear&gt;";
xml += "&lt;itemFieldName&gt;to_in_002&lt;/itemFieldName&gt;";
xml += "&lt;/MartStatItem&gt;";
xml += "&lt;/ReqStatItemInfo&gt;";
		 xml += "&lt;StaticsOutput targetSrs='LL_W' outputFormat='KML' outputUnit='OA'/&gt;";
		 xml +="&lt;/StaticsRequest&gt;";
xml += "&lt;/SgisStaticsRequest&gt;";                       
//요청문서 작성 끝
		var req = new ActiveXObject("Microsoft.XMLHTTP");
		req.open("POST", url, false);
		req.setRequestHeader("Content-type","text/plain");
		req.send(xml);
		if(req.status == 200)
		alert(req.responseText);
		else
		alert("error");
		
	}
  &lt;/script&gt;
 &lt;/head&gt;
 &lt;body&gt;
  &lt;form name="f_submit"&gt;  
   &lt;input type="button" name="btnsubmit" id="submit" value="전송" onclick="javascript:aaaaopen();"/&gt;
  &lt;/form&gt;
 &lt;/body&gt;
&lt;/html&gt;</textarea>
					</div>

					<p class="abiPBtn"><a href="#" onclick="apiRun();"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>
				</div>			
				<!--  집계구기반 공간통계서비스 -->

					<!-- center contents end -->
			<br /><br />&nbsp;
					</div>
					
				</div>
    <form name="apiFm" method="post" action="/contents/include/download.jsp" target="downloadIfr" onsubmit="return false;">
        <input type="hidden" name="filename"/>
        <input type="hidden" name="path" value="/api/"/>
        <input type="hidden" name="api_element_expert_api_doc" value="<%=java.net.URLEncoder.encode(api_expert_doc) %>"/>
   </form>
     <iframe name="downloadIfr" src="#" height="0" width="0" frameborder="0" title="다운로드프레임"></iframe><%-- 다운로드 타겟 프레임 --%>
 
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div> 
	</body>
</html>