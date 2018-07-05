<%--
/*
    ********************************************************************
    * @source      : shortcut_06_10_03.jsp
    * @description : 공유마당-OpenAPI-OpenApi1.0-API 제공리스트(Geocoder서비스)
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 
    * 2014-09-12 		이경현      				디자인시각화
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
	var winpop =window.open("shortcut_06_10_03_pop.jsp","winpop","width=700px,height=580px");

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
							$("#l01").attr("style", "display:block");		//left Menu에서 참여바당 부분 보여줌.
							$("#l012").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0525").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
			<!-- Geocoder서비스  -->
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
							<span class="apiTab_font01"><a href="/contents/shortcut/shortcut_06_10_03.jsp">Geocoder서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_04.jsp">Reverse Geocoder서비스</a></span>
						</div>
						<div>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_05.jsp"> 집계구 기반 제공 항목 검색 서비스</a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_06.jsp">원시명부항목검색서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_07.jsp">집계구 기반 공간통계서비스 </a></span>
						</div>							
					</div>
					<div class="apiP01">
						<p class="apiP01Tilte">Geocoder서비스</p>
						<p class="apiPFont01">
						Geocode서비스는 건물정보에 있는 지번 및 도로명/건물번호 등으로 구성된 새주소 정보를 이용하여 주소정보를 위치정보로 변환해 주는 서비스입니다.
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
									<td>http://sgis1.kostat.go.kr/SGisService/coordconversion	</td>
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
							<p class="apiPFont01">공간통계 요청 문서는 인증키, 새주소(도로명), 구주소(지번)로 구성됩니다</p>
							<h6 class="apiPFont03">2.1 요청문서 구성</h6>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisGeocodeRequest&gt;
	&lt;svcKey&gt;api발급키&lt;/svcKey&gt;
	&lt;xls:GeocodeRequest&gt;
		&lt;xls:Address&gt;
			&lt;xls:Place type="SigunguName"&gt;금천구&lt;/xls:Place&gt;
			&lt;xls:Place type="LawDongName"&gt;가산동&lt;/xls:Place&gt;
			&lt;xls:ParcelAddress"&gt;371-28&lt;/xls:ParcelAddress&gt;
		&lt;/xls:Address&gt;
	&lt;/xls:GeocodeRequest&gt;
&lt;/SgisGeocodeRequest&gt;
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
											<td class="listTableAlian">&lt;GeocodeRequestt&gt;<br/>&lt;Address&gt;</td>
											<td class="listTableAlian">&lt;Place&gt;, &lt;ParcelAddress&gt;로 구성되어 있으며 &lt;Place&gt;의 type 속성<br/>에는 “SidoName“, “SigunguName” , “LawDongName”이 있으며 각각 시도, 시군구,<br/> 읍면동 명칭이 들어가며 선택적으로 사용할 수 있습니다.<br/>
		&lt;ParcelAddress&gt;에는 찾고자 하는 지번을 지정 할 수 있으면 필수 사항입니다.</td>									
										</tr>												
							</table>
						</div>
					</div>
					<div class="apiP02">
							<h6 class="apiPFont03">2.1.2. 새주소(도로명) 요청문서 구청</h6>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisGeocodeRequest&gt;
	&lt;svcKey&gt;api발급키&lt;/svcKey&gt;
	&lt;xls:GeocodeRequest&gt;
		&lt;xls:Address&gt;
			&lt;xls:Place type="SigunguName"&gt;서구&lt;/xls:Place&gt;
			&lt;xls:StreetAddress&gt;
				&lt;xls:Street offcialName="양천로"&gt;
				&lt;xls:Building number="110"&gt;
			&lt;/xls:StreetAddress&gt;
		&lt;/xls:Address&gt;
	&lt;/xls:GeocodeRequest&gt;
&lt;/SgisGeocodeRequest&gt;
							</textarea>		
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
									<td class="listTableAlian">&lt;GeocodeRequestt&gt;<br/>&lt;Address&gt;</td>
									<td class="listTableAlian">&lt;Place&gt;, &lt; StreetAddress&gt;로 구성되어 있으며 &lt;Place&gt;의 type 속성<br/>에는 “SidoName“, “SigunguName” , “LawDongName”이 있으며 각각 시도, 시군구,<br/> 읍면동 명칭이 들어가며 선택적으로 사용할 수 있습니다.<br/>
&lt;StreetAddress&gt;는 하위 항목으로 &lt;street&gt;와 &lt;Buiding&gt;으로 나눠져 있으며 &lt;street&gt;의 <br/>“officialName에는 도로명을 &lt;Building&gt;의 number에는 건물번호가 들어갑니다.</td>									
								</tr>												
						</table>
					</div>
						<div class="apiP02">							
							<h5 class="apiPFont02">2.3 요청좌표 설정</h5>	
							<h6 class="apiPFont03">2.2.1 구주소(지번)</h6>								
							<p class="apiPFont01">&lt;Place&gt;의 type에는 “SidoName”, “SigunguName”, ”LawDongName”이 있으면 각각 시도, 시군구,읍면동 명칭이 들어가며 선택적으로 사용할 수 있으며 &lt;ParcelAddress&gt;는 필수사항이며 찾고자 하는 지번으로 설정하시면 됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;xls:GeocodeRequest&gt;
	&lt;xls:Address&gt;
		&lt;xls:Place type="LawDongName"&gt;가산동&lt;/xls:Place&gt;
		&lt;xls:ParcelAddress&gt;371-28&lt;/xls:ParcelAddress&gt;
	&lt;/xls:Address&gt;
&lt;/xls:GeocodeRequest&gt;
							</textarea>
							<h6 class="apiPFont03">2.2.2. 새주소(도로명)</h6>
							<p class="apiPFont01">&lt;Place&gt;의 type 속성에는 “SidoName“, “SigunguName”이 있으며 각각 시도, 시군구 명칭이 들어가며 선택적으로 사용할 수 있으며, 필수 항목인 &lt;Street&gt;의속성 officialName는 도로명, &lt;Building&gt;의 속성인 number 일 경우 건물주소를 입력하면 됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;xls:GeocodeRequest&gt;
	&lt;xls:Address&gt;
		&lt;xls:Place type="SigunguName"&gt;서구&lt;/xls:Place&gt; 
		&lt;xls:StreetAddress&gt;
			&lt;xls:Street officialName="양천로"/&gt;
			&lt;xls:Building number="110"/&gt;
		&lt;/xls:StreetAddress&gt;
	&lt;/xls:Address&gt;
&lt;/xls:GeocodeRequest&gt;
							</textarea>
						</div>
						<div class="apiP02">							
							<h5 class="apiPFont02">2.3 요청문서샘플</h5>	
							<h6 class="apiPFont03">2.3.1 구주소(지번)</h6>															
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisGeocodeRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt; api발급키입력 &lt;/svcKey&gt;
	&lt;xls:GeocodeRequest&gt;
		&lt;xls:Address&gt;
			&lt;xls:Place type="LawDongName"&gt;가산동&lt;/xls:Place&gt;
			&lt;xls:ParcelAddress&gt;371-28&lt;/xls:ParcelAddress&gt;
		&lt;/xls:Address&gt;
	&lt;/xls:GeocodeRequest&gt;
&lt;/SgisGeocodeRequest&gt;
							</textarea>
							<h6 class="apiPFont03">2.3.2 새주소(도로명)</h6>
							<p class="apiPFont01">찾고자 하는 새주소의 도로명과 건물번호 및 해당 시군구 지역을 알 경우 다음과 같이 작성을 하시면됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisGeocodeRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt;api발급키입력&lt;/svcKey&gt;
	&lt;xls:GeocodeRequest&gt;
		&lt;xls:Address&gt;
			&lt;xls:Place type="SigunguName"&gt;강서구&lt;/xls:Place&gt; 
			&lt;xls:StreetAddress&gt;
				&lt;xls:Street officialName="양천로"/&gt;
				&lt;xls:Building number="110"/&gt;
			&lt;/xls:StreetAddress&gt;
		&lt;/xls:Address&gt;
	&lt;/xls:GeocodeRequest&gt;
&lt;/SgisGeocodeRequest&gt;
							</textarea>
						</div>
					<div class="apiP02">
							<p class="apiP02Title">3. 응답문서</p>
							<p class="apiPFont01">입력된 주소가 위치정보로 변환되어 응답됩니다.</p>
							<h5 class="apiPFont02">3.1. 구주소(지번)</h5>
							<p class="apiPFont01">&lt;GeocodeResponseList&gt;의 리스트로 반환되며 &lt;gml:pos&gt;에는 해당되는 주소지의 중심좌표 값이 &lt;xls:freeFormAddress&gt;는 구주소 값이 지정되어 반환됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisGeocodeResponse xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;xls:GeocodeResponse&gt;
		&lt;xls:GeocodeResponseList&gt;
			&lt;xls:GeocodedAddress&gt;
				&lt;gml:Point&gt;
					&lt;gml:pos&gt;189542.696363691 441980.2291124032&lt;/gml:pos&gt;
				&lt;/gml:Point&gt;
				&lt;xls:Address&gt;
					&lt;xls:freeFormAddress&gt;서울특별시 금천구 가산동 371-28&lt;/xls:freeFormAddress&gt;
				&lt;/xls:Address&gt;
			&lt;/xls:GeocodedAddress&gt;
		&lt;/xls:GeocodeResponseList&gt;
	&lt;/xls:GeocodeResponse&gt;
&lt;/SgisGeocodeResponse&gt;
							</textarea>	
							<h5 class="apiPFont02">3.2. 새주소(도로명)</h5>
							<p class="apiPFont01">&lt;GeocodeResponseList&gt;의 리스트로 반환되며 &lt;gml:pos&gt;에는 해당되는 주소지의 중심좌표 값이 &lt;xls:freeFormAddress&gt;는 새주소 값이 지정되어 반환됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version='1.0' encoding='euc-kr'?&gt;
&lt;SgisGeocodeResponse xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
  &lt;xls:GeocodeResponse&gt;
    &lt;xls:GeocodeResponseList&gt;
      &lt;xls:GeocodedAddress&gt;
        &lt;gml:Point&gt;
          &lt;gml:pos&gt;183110.27615000005 452482.9428000001&lt;/gml:pos&gt;
        &lt;/gml:Point&gt;
        &lt;xls:Address&gt;
          &lt;xls:freeFormAddress&gt;서울특별시 강서구 양천로1길 110&lt;/xls:freeFormAddress&gt;
        &lt;/xls:Address&gt;
      &lt;/xls:GeocodedAddress&gt;
    &lt;/xls:GeocodeResponseList&gt;
  &lt;/xls:GeocodeResponse&gt;
&lt;/SgisGeocodeResponse&gt;
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
		final String apiurl = "http://sgis1.kostat.go.kr/SGisService/geocoder";
		StringBuffer responseXml = new StringBuffer();

		try {
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
		final String reqXml = "&lt;?xml version='1.0' encoding='EUC-KR'?&gt;";
                     reqXml += "&lt;SgisGeocodeRequest xmlns='http://service.gis.knso.org/sgistype' ";
                     reqXml += " xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;;
	                 reqXml += "&lt;svcKey&gt;api발급키&lt;/svcKey&gt;";
	                 reqXml += "&lt;xls:GeocodeRequest&gt;";
                    reqXml += "&lt;xls:Address&gt;";
	                reqXml += "&lt;xls:Place type='SigunguName'&gt;강서구&lt;/xls:Place&gt;";
	                reqXml += "&lt;xls:StreetAddress&gt;";
	                reqXml += "&lt;xls:Street officialName='양천로'/&gt;;
	                reqXml += "&lt;xls:Building number='110'/&gt;;
	               reqXml += "&lt;/xls:StreetAddress&gt;";
	               reqXml += "&lt;/xls:Address&gt;";
	               reqXml += "&lt;/xls:GeocodeRequest&gt;";
 reqXml += "&lt;/SgisGeocodeRequest&gt;”;
//요청문서 작성 끝		
	String response = api.sgisApiStaticsXml(reqXml);
	System.out.println(response);	}
}</textarea>	
							<h5 class="apiPFont02">4.2 Javascript</h5>
							<p class="apiPFont01">AJAX 를 적용하여 통계 조회 어플리케이션 작성을 위한 샘플 코드 입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
  &lt;title&gt; New Document &lt;/title&gt;
  &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
  &lt;script type="text/javascript"&gt;
	function aaaaopen(){
	   var url = "http://sgis1.kostat.go.kr/SGisService/geocoder";
		//요청문서 작성 시작
		var xml= "&lt;?xml version='1.0' encoding='EUC-KR'?&gt;";
                 xml += "&lt;SgisGeocodeRequest xmlns='http://service.gis.knso.org/sgistype' ";
                 xml += " xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;;
	 xml += "&lt;svcKey&gt;api발급키&lt;/svcKey&gt;";
	             xml += "&lt;xls:GeocodeRequest&gt;";
                 xml += "&lt;xls:Address&gt;";
	 xml += "&lt;xls:Place type='SigunguName'&gt;강서구&lt;/xls:Place&gt;";
	 xml += "&lt;xls:StreetAddress&gt;";
	 xml += "&lt;xls:Street officialName='양천로'/&gt;;
	 xml += "&lt;xls:Building number='110'/&gt;;
	             xml += "&lt;/xls:StreetAddress&gt;";
	             xml += "&lt;/xls:Address&gt;";
	             xml += "&lt;/xls:GeocodeRequest&gt;";
xml += "&lt;/SgisGeocodeRequest&gt;";
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
&lt;/html&gt;			</textarea>
					<p class="abiPBtn"><a href="#" onclick="apiRun();"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>
					</div>		

				</div>
					
				<!-- //Geocoder서비스  -->

					<!-- center contents end -->
			<br /><br />&nbsp;
					</div>
					
				</div>
			</div><!-- cls:contents end -->
 <form name="apiFm" method="post" action="/contents/include/download.jsp" target="downloadIfr" onsubmit="return false;">
        <input type="hidden" name="filename"/>
        <input type="hidden" name="path" value="/api/"/>
        <input type="hidden" name="api_element_expert_api_doc" value="<%=java.net.URLEncoder.encode(api_expert_doc) %>"/>
   </form>
 <iframe name="downloadIfr" src="#" height="0" width="0" frameborder="0" title="다운로드프레임"></iframe><%-- 다운로드 타겟 프레임 --%>
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div> 
	</body>
</html>