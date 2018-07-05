<%--
/*
    ********************************************************************
    * @source      : shortcut_06_10_01.jsp
    * @description : 공유마당 - OpenAPI - API제공리스트(좌표 변환 서비스)
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    *
    * 2014-09-12 		이경현					  디자인 시각화      
    ********************************************************************
 */
--%>  
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
		var winpop =window.open("shortcut_06_10_01_pop.jsp","winpop","width=700px,height=580px");
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
		
			<!-- 좌표변환서비스  -->
			<div class="location">
				<p><span class="on"><span>OpenAPI 1.0</span> &lt;  <span>OpenAPI</span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
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
							<span class="apiTab_font01"><a href="/contents/shortcut/shortcut_06_10_01.jsp">좌표 변환 서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_02.jsp">WebMap 서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_03.jsp">Geocoder서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_04.jsp">Reverse Geocoder서비스</a></span>
						</div>
						<div>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_05.jsp"> 집계구 기반 제공 항목 검색 서비스</a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_06.jsp">원시명부항목검색서비스 </a></span>
							<span class="apiTab_font02"><a href="/contents/shortcut/shortcut_06_10_07.jsp">집계구 기반 공간통계서비스 </a></span>
						</div>							
					</div>
					<div class="apiP01">
						<p class="apiP01Tilte"> 좌표변환 서비스</p>
						<p class="apiPFont01">
						좌표 변환 서비스는 GIS의 각종 좌표체계의 원하는 좌표체계의 좌표로 변환해 주는 서비스로 상이한 좌표체계를 가진 Map API와 매쉬업을 위한 필수적인 API입니다. 
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
							<p class="apiPFont01">좌표변환 요청 문서는 인증키, source좌표 체계와 변환 좌표체계를 표현하는 설정 부분 그리고 영역으로 구성됩니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
	&lt;SgisCoordConversionRequest&gt;
	&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
	&lt;CoordConversionRequest&gt;
		&lt;CoordConverionInfo FromSrs="TM_M" toSrs="TM_K"/&gt;
		&lt;gml:pos&gt;236710 325220&lt;/gml:pos&gt;
		&lt;gml:pos&gt;236890 315700&lt;/gml:pos&gt;
		&lt;gml:pos&gt;236000 315900&lt;/gml:pos&gt;
		&lt;gml:pos&gt;235250 315218&lt;/gml:pos&gt;
		&lt;gml:pos&gt;235050 315018&lt;/gml:pos&gt;
		&lt;gml:pos&gt;236710 315220&lt;/gml:pos&gt;
	&lt;/CoordConversionRequest&gt;
&lt;/SgisCoordConversionRequest&gt;
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
											<td class="listTableAlian">&lt;CoordConversionRequest&gt;<br/>&lt;coordConvserionInfo&gt;</td>
											<td class="listTableAlian">Source좌표 체계와 변환될 좌표체계 표현</td>									
										</tr>
										<tr>
											<td>3</td>
											<td class="listTableAlian" >&lt;CoordConversionRequest&gt;<br/>&lt;gml:pos&gt;</td>
											<td class="listTableAlian">변환할 좌표.<br/>pos, coord, coordinates 중 선택하여 구성.<br/>pos, coord, coordinates의 구성은 GML의 정의 준수. </td>				
										</tr>							
								</table>
							</div>
					</div>
					<div class="apiP02">
							<h5 class="apiPFont02">2.2 변환될 좌표체계 설정</h5>
							<p class="apiPFont01">“&lt;coordConvserionInfo&gt;” 요소를 구성하는 속성에 source좌표 체계 형식과 변환할 좌표체계 형식을 지정합니다.<br/>
							&lt;CoordConvserionInfo fromSrs="TM_M" toSrs="TM_K"/&gt;<br/>
							위 예제는 “TM_M”(TM 중부원점)좌표 계를 “TM_K”(UTM-K 형식)좌표 계로 변환하라는 의미입니다.
							아래의 표는 각 속성에 적용될 수 있는 값을 설명합니다.
							</p>
							<table class="listTable">
							<caption>변환될 좌표체계 설정</caption>
								<tr>
									<th class="first">속성명</th>
									<th>요소명</th>
									<th class="last">설명</th>
								</tr>
								<tr>
									<td rowspan="7" class="listTableLeft" >BESSEL 타원체 경위도 좌표</td>
									<td class="listTableAlian">LL_B</td>									
									<td class="listTableAlian">BESSEL 타원체 경위도 좌표</td>
								</tr>
								<tr>									
									<td class="listTableAlian">LL_W</td>
									<td class="listTableAlian">WGS84 타원체 경위도 좌표</td>									
								</tr>
								<tr>									
									<td class="listTableAlian">TM_M</td>
									<td class="listTableAlian">TM 중부원점 </td>									
								</tr>	
								<tr>									
									<td class="listTableAlian">TM_W</td>
									<td class="listTableAlian">TM 서부원점 </td>									
								</tr>
								<tr>									
									<td class="listTableAlian">TM_E</td>
									<td class="listTableAlian">TM 동부원점</td>									
								</tr>
								<tr>									
									<td class="listTableAlian">TM_K</td>
									<td class="listTableAlian"> UTM-K 형식 </td>									
								</tr>
								<tr>									
									<td class="listTableAlian">UTM_52</td>
									<td class="listTableAlian">UTM52N 좌표 </td>									
								</tr>
								<tr>
									<td rowspan="7" class="listTableLeft" >toSrs</td>
									<td class="listTableAlian">LL_B</td>									
									<td class="listTableAlian">BESSEL 타원체 경위도 좌표</td>
								</tr>
								<tr>									
									<td class="listTableAlian">LL_W</td>
									<td class="listTableAlian">WGS84 타원체 경위도 좌표</td>									
								</tr>
								<tr>									
									<td class="listTableAlian">TM_M</td>
									<td class="listTableAlian">TM 중부원점 </td>									
								</tr>	
								<tr>									
									<td class="listTableAlian">TM_W</td>
									<td class="listTableAlian">TM 서부원점 </td>									
								</tr>
								<tr>									
									<td class="listTableAlian">TM_E</td>
									<td class="listTableAlian">TM 동부원점</td>									
								</tr>
								<tr>									
									<td class="listTableAlian">TM_K</td>
									<td class="listTableAlian"> UTM-K 형식 </td>									
								</tr>
								<tr>									
									<td class="listTableAlian">UTM_52</td>
									<td class="listTableAlian">UTM52N 좌표 </td>									
								</tr>
						</table>
							
																									
					</div>
						<div class="apiP02">							
							<h5 class="apiPFont02">2.3 변환할 좌표 설정</h5>
							<h6 class="apiPFont03">2.3.1 pos Element 이용</h6>
							<p class="apiPFont01">하나의 “&lt;gml:pos&gt;” element는 하나의 좌표 X, Y를 ‘ ’(공백문자)를 이용해 나누어 표시합니다.<br/>
&lt;gml:pos>236710 315220&lt;/gml:pos&gt;</p>
							<h6 class="apiPFont03">2.3.2 coord Element 이용</h6>
							<p class="apiPFont01">하나의 “&lt;gml:coord&gt;” element는 하나의 좌표 X, Y를 “&lt;gml:X&gt;”, “&lt;gml:Y&gt;”를 이용해 표시합니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">>&lt;gml:coord&gt;
	&lt;gml:X&gt;236710&lt;/gml:X&gt;
	&lt;gml:Y&gt;315220&lt;/gml:Y&gt;
&lt;/gml:coord&gt;
							</textarea>
							<h6 class="apiPFont03">2.3.3 coordinates Element 이용</h6>
							<p class="apiPFont01">하나의 “&lt;gml:coordinates&gt;” element는 여러 개의 좌표를 속성 cs, ts를 이용해 구분하여 표시합니다.
&lt;gml:coordinates cs="," ts=" "&gt; 127.40969565,36.337086910 127.4117231258,36.34140560311 127.40181879,36.34324141&lt;/gml:coordinates&gt;</p>																					
					</div>
						<div class="apiP02">							
							<h5 class="apiPFont02">2.4 요청문서샘플</h5>
							<h6 class="apiPFont03">2.4.1 pos Element를 이용한 TM_M(TM 중부원점)에서 TM_K(UTM-k 형식)으로 좌표 변환</h6>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;SgisCoordConversionRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
	&lt;CoordConversionRequest&gt;
		&lt;CoordConvserionInfo fromSrs="TM_M" toSrs="TM_K"/&gt;
		&lt;gml:pos&gt;236710 315220&lt;/gml:pos&gt;
		&lt;gml:pos&gt;236890 315700&lt;/gml:pos&gt;
		&lt;gml:pos&gt;236000 315900&lt;/gml:pos&gt;
		&lt;gml:pos&gt;235250 315218&lt;/gml:pos&gt;
		&lt;gml:pos&gt;235050 315018&lt;/gml:pos&gt;
		&lt;gml:pos&gt;236710 315220&lt;/gml:pos&gt;
	&lt;/CoordConversionRequest&gt;
&lt;/SgisCoordConversionRequest&gt;</textarea>
							<h6 class="apiPFont03">2.4.2 coord Element를 이용한 TM_M(TM 중부원점)에서 LL_W(WGS84 타원체 경위도 좌표)로 좌표 변환</h6>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;SgisCoordConversionRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
	&lt;CoordConversionRequest&gt;
		&lt;CoordConvserionInfo fromSrs="TM_M" toSrs="LL_W"/&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;236710&lt;/gml:X&gt;
			&lt;gml:Y&gt;315220&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;236890&lt;/gml:X&gt;
			&lt;gml:Y&gt;315700&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;236000&lt;/gml:X&gt;
			&lt;gml:Y&gt;315900&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;235250&lt;/gml:X&gt;
			&lt;gml:Y&gt;315218&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;235050&lt;/gml:X&gt;
			&lt;gml:Y&gt;315018&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;236710&lt;/gml:X&gt;
			&lt;gml:Y&gt;315220&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
	&lt;/CoordConversionRequest&gt;
&lt;/SgisCoordConversionRequest&gt;</textarea>
							<h6 class="apiPFont03">2.4.3 coordinates Element를 이용한 LL_W(WGS84 타원체 경위도 좌표) 에서 TM_M(TM 중부원점)으로 좌표 변환</h6>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;SgisCoordConversionRequest xmlns="http://service.gis.knso.org/sgistype" xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;svcKey&gt;API발급키&lt;/svcKey&gt;
	&lt;CoordConversionRequest&gt;
		&lt;CoordConvserionInfo fromSrs="LL_W" toSrs="TM_M"/&gt;
		&lt;gml:coordinates cs="," ts=" "&gt; 127.4,36.3 127.4,36.3 127.4,36.3&lt;/gml:coordinates&gt;
	&lt;/CoordConversionRequest&gt;
&lt;/SgisCoordConversionRequest&gt;</textarea>						
					</div>
					<div class="apiP02">
							<p class="apiP02Title">3. 응답문서</p>
							<p class="apiPFont01">요청문서에 사용된 좌표 표시 형식에 따라 같은 형식으로 표시된 응답문서가 반환됩니다.</p>
							<h5 class="apiPFont02">3.1 응답문서샘플</h5>
							<h6 class="apiPFont03">3.1.1 pos Element를 이용한 요청의 응답</h6>							
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="euc-kr"?&gt;
&lt;SgisCoordConversionResponse xmlns="http://service.gis.knso.org/sgistype" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;CoordConversionResponse Srs="TM_K"&gt;
		&lt;gml:pos&gt;347203.31309876003 415321.4346266351&lt;/gml:pos&gt;
		&lt;gml:pos&gt;347388.23784955905 415799.51359229593&lt;/gml:pos&gt;
		&lt;gml:pos&gt;346500.4201707282 416008.66387309553&lt;/gml:pos&gt;
		&lt;gml:pos&gt;345743.4878334269 415334.48786508146&lt;/gml:pos&gt;
		&lt;gml:pos&gt;345541.45221536746 415136.57627164805&lt;/gml:pos&gt;
		&lt;gml:pos&gt;347203.31309876003 415321.4346266351&lt;/gml:pos&gt;
	&lt;/CoordConversionResponse&gt;
&lt;/SgisCoordConversionResponse&gt;
							</textarea>		
							<h6 class="apiPFont03">3.1.2 coord Element를 이용한 요청의 응답.</h6>							
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="euc-kr"?&gt;
&lt;SgisCoordConversionResponse xmlns="http://service.gis.knso.org/sgistype" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;CoordConversionResponse Srs="LL_W"&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;127.4096956516236360812399652786552906036376953125&lt;/gml:X&gt;
			&lt;gml:Y&gt;36.33708691060491702273793634958565235137939453125&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;127.4117231258929194837037357501685619354248046875&lt;/gml:X&gt;
			&lt;gml:Y&gt;36.34140560311792711445377790369093418121337890625&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;127.40181879457060176719096489250659942626953125&lt;/gml:X&gt;
			&lt;gml:Y&gt;36.34324141019290976828415296040475368499755859375&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;127.3934338139529955924444948323071002960205078125&lt;/gml:X&gt;
			&lt;gml:Y&gt;36.3371231298523156283408752642571926116943359375&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;127.391197229469440799221047200262546539306640625&lt;/gml:X&gt;
			&lt;gml:Y&gt;36.3353280771282385330778197385370731353759765625&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
		&lt;gml:coord&gt;
			&lt;gml:X&gt;127.4096956516236360812399652786552906036376953125&lt;/gml:X&gt;
			&lt;gml:Y&gt;36.33708691060491702273793634958565235137939453125&lt;/gml:Y&gt;
		&lt;/gml:coord&gt;
	&lt;/CoordConversionResponse&gt;
&lt;/SgisCoordConversionResponse&gt;
							</textarea>			 		 		
							<h6 class="apiPFont03">3.1.3 coordinates Element를 이용한 요청의 응답.</h6>							
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;?xml version="1.0" encoding="euc-kr"?&gt;
&lt;SgisCoordConversionResponse xmlns="http://service.gis.knso.org/sgistype" xmlns:gml="http://www.opengis.net/gml"&gt;
	&lt;CoordConversionResponse Srs="TM_K"&gt;
		&lt;gml:coordinates decimal="." cs="," ts=" "&gt;107447.39487650298,102452.03477217606 107447.39694636146,102452.03907316655 107447.38705555745,102452.04100499582&lt;/gml:coordinates&gt;
	&lt;/CoordConversionResponse&gt;
&lt;/SgisCoordConversionResponse&gt;</textarea >
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

public class CoordConversion {
	public String sgisApiCoordConversion(String requestXml) {
		final String apiurl = "http://sgis1.kostat.go.kr/SGisService/coordconversion";
		StringBuffer responseXml = new StringBuffer();

		try {
			URL url = new URL(apiurl);
			URLConnection conn = url.openConnection();
			conn.setDoOutput(true);

			OutputStreamWriter owr = new OutputStreamWriter(conn.getOutputStream());
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
	CoordConversion api = new CoordConversion();
		
	//요청문서 작성 시작
	final String reqXml = "&lt;?xml version='1.0' encoding='UTF-8'?&gt;";
		 reqXml +="&lt;SgisCoordConversionRequest xmlns='http://service.gis.knso.org/sgistype' “;
reqXml += “ xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;";
	 reqXml +=  "&lt;svcKey&gt;api발급키&lt;/svcKey&gt;";
	 reqXml +=  "&lt;CoordConversionRequest&gt;";
	 reqXml +=  "&lt;CoordConvserionInfo fromSrs='LL_W' toSrs='TM_W'/&gt;";
	 reqXml +=  "&lt;gml:pos&gt;236710 315220&lt;/gml:pos&gt;";
	 reqXml +=  "&lt;gml:pos&gt;236890 315700&lt;/gml:pos&gt;";
	 reqXml +=  "&lt;gml:pos&gt;236000 315900&lt;/gml:pos&gt;";
	 reqXml +=  "&lt;gml:pos&gt;235250 315218&lt;/gml:pos&gt;";
	 reqXml +=  "&lt;gml:pos&gt;235050 315018&lt;/gml:pos&gt;";
	 reqXml +=  "&lt;gml:pos&gt;236710 315220&lt;/gml:pos&gt;";
	 reqXml +=   "&lt;/CoordConversionRequest&gt;";
	 reqXml +=   "&lt;/SgisCoordConversionRequest&gt;";
                    //요청문서 작성 끝			
		System.out.println(reqXml);
		
		String response = api.sgisApiCoordConversion(reqXml);
		System.out.println(response);
	}

} }</textarea>	
							<h5 class="apiPFont02">4.2 Javascript</h5>
							<p class="apiPFont01">AJAX 를 적용하여 통계 조회 어플리케이션 작성을 위한 샘플 코드 입니다.</p>
							<textarea rows="2" cols="20" readonly="readonly" class="abiPBg">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
  &lt;title&gt; New Document &lt;/title&gt;
  &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
  &lt;script type="text/javascript"&gt;
	function aaaaopen(){
		var url = "http://sgis1.kostat.go.kr/SGisService/coordconversion";
        //요청문서 작성 시작
		var  xml = "&lt;?xml version='1.0' encoding='UTF-8'?&gt;";
		     xml +="&lt;SgisCoordConversionRequest xmlns='http://service.gis.knso.org/sgistype' ";
             xml += " xmlns:xls='http://www.opengis.net/xls' xmlns:gml='http://www.opengis.net/gml'&gt;";
	         xml +=  "&lt;svcKey&gt;api발급키&lt;/svcKey&gt;";
	         xml +=  "&lt;CoordConversionRequest&gt;";
	         xml +=  "&lt;CoordConvserionInfo fromSrs='LL_W' toSrs='TM_W'/&gt;";
	         xml +=  "&lt;gml:pos&gt;236710 315220&lt;/gml:pos&gt;";
	         xml +=  "&lt;gml:pos&gt;236890 315700&lt;/gml:pos&gt;";
	         xml +=  "&lt;gml:pos&gt;236000 315900&lt;/gml:pos&gt;";
	         xml +=  "&lt;gml:pos&gt;235250 315218&lt;/gml:pos&gt;";
	         xml +=  "&lt;gml:pos&gt;235050 315018&lt;/gml:pos&gt;";
	         xml +=  "&lt;gml:pos&gt;236710 315220&lt;/gml:pos&gt;";
	         xml +=   "&lt;/CoordConversionRequest&gt;";
	         xml +=   "&lt;/SgisCoordConversionRequest&gt;";
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
&lt;/html&gt;						</textarea>
					<p class="abiPBtn"><a href="#" onclick="apiRun();"><img src="/contents/css/2014_css/img/btn/btn_example.png" alt="예제실행하기" /></a></p>
					</div>		

				</div>
					
				<!-- //MapControl/Overlay서비스  -->
					<!-- center contents end -->
			<br /><br />&nbsp;
					</div>
					
				</div>
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div> 
    <form name="apiFm" method="post" action="/contents/include/download.jsp" target="downloadIfr" onsubmit="return false;">
        <input type="hidden" name="filename"/>
        <input type="hidden" name="path" value="/api/"/>
        <input type="hidden" name="api_element_expert_api_doc" value="<%=java.net.URLEncoder.encode(api_expert_doc) %>"/>
   </form>
	</body>
</html>