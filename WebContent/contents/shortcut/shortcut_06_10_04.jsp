<%--
/*
    ********************************************************************
    * @source      : shortcut_06_10_04.jsp
    * @description : 공유마당-OpenAPI - OpenAPI1.0 - API제공리스트- Reverse Geocoder 서비스
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    *    
    * 2014-09-12 		이경현      				디자인 시각화
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
	var winpop =window.open("shortcut_06_10_04_pop.jsp","winpop","width=700px,height=580px");

		
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
		
			<!-- Reverse Geocoder 서비스  -->
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
							<span class="apiTab_font01"><a href="/contents/shortcut/shortcut_06_10_04.jsp">Reverse Geocoder서비스</a></span>
						</div>
						<div>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_05.jsp"> 집계구 기반 제공 항목 검색 서비스</a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_06.jsp">원시명부항목검색서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_07.jsp">집계구 기반 공간통계서비스 </a></span>
						</div>							
					</div>
					<div class="apiP01">
						<p class="apiP01Tilte">Reverse Geocoder 서비스</p>
						<p class="apiPFont01">
						Reverse Geocode 서비스는 건물정보에 있는 지번 및 도로명/건물번호 등으로 구성된 새주소정보를 이용하여 위치정보를 주소정보로 변환해 주는 서비스입니다.
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
							<p class="apiPFont01">공간통계 요청 문서는 인증키, 위치정보로 이루어져 있습니다.</p>
							<h6 class="apiPFont03">2.1.1. 구주소(지번) 요청문서 구성</h6>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisReverseGeocodeRequest&gt;
	&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
	&lt;xls:ReverseGeocodeRequest&gt;
		&lt;xls:Position&gt;
			&lt;gml:Point&gt;
				&lt;gml:pos&gt;234271 318191&lt;/gml:pos&gt;
			&lt;/gml:Point&gt;
		&lt;/xls:Position&gt;
		&lt;xls:ReverseGeocodePreference"&gt;ParcelAddress&lt;/xls:ReverseGeocodePreference&gt;
	&lt;/xls:ReverseGeocodeRequest&gt;
&lt;/SgisReverseGeocodeRequest&gt;
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
									<td class="listTableAlian">&lt;xls:Position&gt;<br/>&lt;gml:Point&gt; <br/>&lt;gml:pos&gt;</td>
									<td class="listTableAlian">찾고자 하는 위치 정보를 지정</td>									
								</tr>	
								<tr>
									<td>3</td>
									<td class="listTableAlian">&lt;xls:ReverseGeocodePreference&gt;</td>
									<td class="listTableAlian">구주소(지번)와 신주소(도로명) 요청문서의 구분 값</td>									
								</tr>
						</table>
					</div>
					<div class="apiP02">
							<h5 class="apiPFont02">2.2 요청주소설정</h5>
							<h6 class="apiPFont03">2.2.1. 구주소(지번)</h6>
							<p class="apiPFont01">&lt;gml:pos&gt;항목에 위치정보를 지정하며 구조소(지번) 요청문서임을 표시하기 위해 &lt;xls:ReverseGeocodePreference&gt;에 ParcelAddres를 지정합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;xls:ReverseGeocodeRequest&gt;
	&lt;xls:Position&gt;
		&lt;gml:Point&gt;
			&lt;gml:pos&gt;234271 318191&lt;/gml:pos&gt;
		&lt;/gml:Point&gt;
	&lt;/xls:Position&gt;
	&lt;xls:ReverseGeocodePreference&gt;ParcelAddress&lt;/xls:ReverseGeocodePreference&gt;
&lt;/xls:ReverseGeocodeRequest&gt;
							</textarea>	
							<h6 class="apiPFont03">2.2.2 새주소(도로명)</h6>
							<p class="apiPFont01">&lt;gml:pos&gt;항목에 위치정보를 지정하며 새주소(도로명) 요청문서임을 표시하기 위해  &lt;xls:ReverseGeocodePreference&gt;에 항목을 삭제합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;xls:ReverseGeocodeRequest&gt;
	&lt;xls:Position&gt;
		&lt;gml:Point&gt;
			&lt;gml:pos&gt;234271 318191&lt;/gml:pos&gt;
		&lt;/gml:Point&gt;
	&lt;/xls:Position&gt;
&lt;/xls:ReverseGeocodeRequest&gt;
							</textarea>		
					</div>
						<div class="apiP02">							
							<h5 class="apiPFont02">2.3 요청문서샘플</h5>	
							<h6 class="apiPFont03">2.3.1 구주소</h6>								
							<p class="apiPFont01">&lt;gml:pos&gt;항목에 알고자 하는 중심좌표를 입력하고 다음과 같이 작성합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg02">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisReverseGeocodeRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt; api발급키입력 &lt;/svcKey&gt;
	&lt;xls:ReverseGeocodeRequest&gt;
		&lt;xls:Position&gt;
			&lt;gml:Point&gt;
				&lt;gml:pos&gt;234271 318191&lt;/gml:pos&gt;
			&lt;/gml:Point&gt;
		&lt;/xls:Position&gt;
		&lt;xls:ReverseGeocodePreference&gt;ParcelAddress&lt;/xls:ReverseGeocodePreference&gt;
	&lt;/xls:ReverseGeocodeRequest&gt;
&lt;/SgisReverseGeocodeRequest&gt;
							</textarea>
							<h6 class="apiPFont03">2.3.2 신주소</h6>
							<p class="apiPFont01">&lt;gml:pos&gt;항목에 알고자 하는 중심좌표를 입력하고 다음과 같이 작성합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisReverseGeocodeRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt; api발급키입력 &lt;/svcKey&gt;
	&lt;xls:ReverseGeocodeRequest&gt;
		&lt;xls:Position&gt;
			&lt;gml:Point&gt;
				&lt;gml:pos&gt;189583.90 441874.18&lt;/gml:pos&gt;
			&lt;/gml:Point&gt;
		&lt;/xls:Position&gt;
	&lt;/xls:ReverseGeocodeRequest&gt;
&lt;/SgisReverseGeocodeRequest&gt; 
							</textarea>
						</div>
						
					<div class="apiP02">
							<p class="apiP02Title">3. 응답문서</p>
							<p class="apiPFont01">입력된 위치정보가 주소로 응답됩니다.</p>
							<h5 class="apiPFont02">3.1. 구주소(지번) 응답문서</h5>
							<p class="apiPFont01">구주소(지번)의 요청 문서에 대한 응답 문서는 다음과 같습니다.<br/>&lt;gml:pos&gt;에는 구주소(지번)의 중심좌표가 있으며 &lt;xls:freeFormAddress&gt;에는 요청한 중심좌표의 주소가 있습니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;SgisReverseGeocodeResponse xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;xls:ReverseGeocodeResponse&gt;
		&lt;xls:ReverseGeocodedLocation&gt;
			&lt;gml:Point&gt;
				&lt;gml:pos&gt;234271.51750000002 318191.63999999996&lt;/gml:pos&gt;
			&lt;/gml:Point&gt;
			&lt;xls:Address&gt;
				&lt;xls:freeFormAddress&gt;대전광역시 서구 둔산동 920&lt;/xls:freeFormAddress&gt;
			&lt;/xls:Address&gt;
		&lt;/xls:ReverseGeocodedLocation&gt;
	&lt;/xls:ReverseGeocodeResponse&gt;
&lt;/SgisReverseGeocodeResponse&gt;
							</textarea>	
							<h5 class="apiPFont02">3.2 신주소(도로명) 응답문서</h5>
							<p class="apiPFont01">신주소(도로명)의 요청 문서에 대한 응답 문서는 다음과 같습니다.<br/>&lt;gml:pos&gt;에는 신주소(지번)의 중심좌표가 있으며  &lt;xls:freeFormAddress&gt;에는 요청한 중심좌표의 주소가 있습니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version='1.0' encoding='euc-kr'?&gt;
&lt;SgisReverseGeocodeResponse xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
  &lt;xls:ReverseGeocodeResponse&gt;
    &lt;xls:ReverseGeocodedLocation&gt;
      &lt;gml:Point&gt;
        &lt;gml:pos&gt;189571.02608749992 441913.2371624997&lt;/gml:pos&gt;
      &lt;/gml:Point&gt;
      &lt;xls:Address&gt;
        &lt;xls:freeFormAddress&gt;서울특별시 금천구 가산디지털1로 168&lt;/xls:freeFormAddress&gt;
      &lt;/xls:Address&gt;
    &lt;/xls:ReverseGeocodedLocation&gt;
  &lt;/xls:ReverseGeocodeResponse&gt;
&lt;/SgisReverseGeocodeResponse&gt;
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
		final String apiurl = "http://sgis1.kostat.go.kr/SGisService/reversegeocoder";
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
                      reqXml += "&lt;SgisReverseGeocodeRequest xmlns='http://service.gis.knso.org/sgistype' ";
                      reqXml += " xmlns:xls=http://www.opengis.net/xls xmlns:gml='http://www.opengis.net/gml'&gt;";
	                  reqXml += "&lt;svcKey&gt;api발급키&lt;/svcKey&gt;";
	                  reqXml += "&lt;xls:ReverseGeocodeRequest&gt;";
                      reqXml += "&lt;xls:Position&gt;";
	                  reqXml += "&lt;gml:Point&gt;";
	                  reqXml += "&lt;gml:pos&gt;234271 318191&lt;/gml:pos&gt;";
	                  reqXml += "&lt;/gml:Point&gt;";
	                  reqXml += "&lt;xls:Building number='110'/&gt;";
	                  reqXml += "&lt;/xls:Position&gt;";
	                  reqXml += "&lt;xls:ReverseGeocodePreference&gt;ParcelAddress&lt;/xls:ReverseGeocodePreference&gt;";
	                  reqXml += "&lt;/xls:ReverseGeocodeRequest&gt;";
                      reqXml += "&lt;/SgisReverseGeocodeRequest&gt;";	
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
		var url = "http://sgis1.kostat.go.kr/SGisService/reversegeocoder";
		//요청문서 작성 시작
		var    xml= "&lt;?xml version='1.0' encoding='EUC-KR'?&gt;";
                         xml += "&lt;SgisReverseGeocodeRequest xmlns='http://service.gis.knso.org/sgistype' ";
 xml += " xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;";
	 xml += "&lt;svcKey&gt;api발급키&lt;/svcKey&gt;";
	 xml += "&lt;xls:ReverseGeocodeRequest&gt;";
                        xml += "&lt;xls:Position&gt;";
	 xml += "&lt;gml:Point&gt;";
	 xml += "&lt;gml:pos&gt;234271 318191&lt;/gml:pos&gt;";
	                    xml += "&lt;/gml:Point&gt;;
	                     xml += "&lt;xls:Building number='110'/&gt;";
	 xml += "&lt;/xls:Position&gt;";
	 xml += "&lt;xls:ReverseGeocodePreference&gt;ParcelAddress&lt;/xls:ReverseGeocodePreference&gt;";
	                 xml += "&lt;/xls:ReverseGeocodeRequest&gt;";
                    xml += "&lt;/SgisReverseGeocodeRequest&gt;";	
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

					<p class="abiPBtn"><a href="#" onclick="apiRun();"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>
					</div>		

				</div>
					
				<!-- //Reverse Geocoder 서비스 -->

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