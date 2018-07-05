<%--
/*
    ********************************************************************
    * @source      : shortcut_11.jsp
    * @description : SGIS소개 - SGIS란?
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2014-09-16		이경현						디자인 시각화
    ********************************************************************
 */
--%>  
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
  String leftMenu="shortcut";
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
			
	
	<script type="text/javascript" language="javascript">
	//<![CDATA[
	  function openWin(){
		var devPop = window.open('<%= ConfigManager.getStatisticsResourceURL()%>/statbd/','devPop', 'width=1260,height=768,left=0,top=0,scrollbars=auto, resizable=yes');	
		    devPop.focus();
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
							$("#l011").attr("class", "on");					//공자사항 선택한 표시 해줌
						</script>
					</div>
					
		<div class="acticle">
		
		<!--  SGIS란? -->
			<div class="location">
				<p><span class="on">SGIS란?</span>  &lt; <span>SGIS소개</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">SGIS란?</p>
				<p class="txt02">Statistical Geographic Information Service의 약자로 통계정보와 지리정보를 융합한 <br/>통계지리정보서비스입니다.</p>
			</div>
			<div class="sgisTitle">
				<p class="navigatorTitleList">
					 「소지역 통계」를 비롯한 12개의 콘텐츠를 서비스하고 있으며, 모바일 서비스인 <br/>「S-통계내비게이터」를 통해 「소지역 통계」, 「사업체 위치찾기」를 서비스하고 있습니다.
						또한,<br/> 이용자가 자료를 직접 활용하도록 공간통계자료와 OpenAPI를 제공하고 있습니다. </p>				
			</div>
			<div class="listTitle02"><img src="/contents/css/2014_css/img/ico/ico_2.png" alt="컨텐츠 목록" style="width:11px;"/>&nbsp;컨텐츠 목록</div>
			<table class="listTable">
					<caption>요청문서 구성</caption>
						<tbody><tr>
							<th class="first" width="150px">컨텐츠 종류</th>					
							<th class="last">서비스 내용</th>
						</tr>
						<tr>
							<td class="left2">소지역 통계</td>
							<td class="listTableAlian">인구·주택·가구 및 농림어업, 사업체센서스 자료를 토대로 지도위에서 소지역(집계구) 단위 통계를 제공</td>	
						</tr>
						<tr>
							<td class="left2">S-통계내비게이터</td>
							<td class="listTableAlian">인구·주택·가구 및 농림어업, 사업체 소지역 통계와 사업체 위치정보 제공</td>
						</tr>
						<tr>
							<td class="left2">생활관심 지역찾기</td>
							<td class="listTableAlian"> 주거환경, 교육환경 등 이용자 기호에 맞는 일상생활에서 관심 있는 통계정보 제공</td>
						</tr>	
						<tr>
							<td class="left2">행정구역 통계</td>
							<td class="listTableAlian">행정구역단위(시도, 시군구, 읍면동)의 통계를 통계지도로 제공</td>
						</tr>
						<tr>
							<td class="left2">고령화 현황보기</td>
							<td class="listTableAlian">고령화 현황의 지역간 비교, 추세분석, 노인복지시설 등 고령화 관련 통계와 보도자료를 제공 </td>
						</tr>
						<tr>
							<td class="left2">지방의 변화보기</td>
							<td class="listTableAlian">’95년부터 ’10년까지 5년 주기로 지방의 변화되는 모습을 제공 </td>
						</tr>
						<tr>
							<td class="left2">월간 통계</td>
							<td class="listTableAlian">월간 발표되는 주요 통계를 이용자가 알기 쉽도록 통계지도로 제공 </td>
						</tr>
						<tr>
							<td class="left2">통계지도 체험</td>
							<td class="listTableAlian">사용자가 직접 자료를 입력하여 다양한 통계지도를 작성할 수 있는 기능 제공</td>
						</tr>
						<tr>
							<td class="left2">움직이는 인구피라미드</td>
							<td class="listTableAlian">추계인구를 기준으로 연령별 과거와 미래의 인구분포 변화모습을 피라미드 형태로 표현</td>
						</tr>
						<tr>
							<td class="left2">성씨분포</td>
							<td class="listTableAlian">인구 기준으로 우리나라 50대 성씨와 100대 본관의 지역별 분포에 대한 통계정보 제공</td>
						</tr>
						<tr>
							<td class="left2">인구이동 통계</td>
							<td class="listTableAlian">주민등록에 의한 지역별 인구와 인구이동통계를 지도 위에서 제공</td>
						</tr>
						<tr>
							<td class="left2">사업체 위치찾기</td>
							<td class="listTableAlian">사업체 명칭이나 산업분류를 활용하여 지도 위에 사업체 위치정보 및 산업분류별 시계열 변화 모습 제공</td>
						</tr>
						<tr>
							<td class="left2">통계시계열 서비스</td>
							<td class="listTableAlian">인구 ․ 사업체수 등과 같은 센서스 통계의 시공간적인 변화에 대한 현황파악, 변화패턴 분석, 시각화를 통해 공간통계를 볼 수 있는 서비스</td>
						</tr>
						<tr>
							<td class="left2">자료신청</td>
							<td class="listTableAlian">공공·민간·개인에서 활용할 수 있도록 센서스지도, 통계경계, 통계자료 등의 공간통계 자료를 파일형태(txt, shp)로 제공</td>
						</tr>
						<tr>
							<td class="left2">OpenAPI</td>
							<td class="listTableAlian">이용자가 직접 통계지리정보시스템을 접근하지 않고도 이용자가 갖고 있는 시스템에서 통계지리정보를 응용하여 활용할 수 있도록 제공</td>
						</tr>
				</tbody>
			</table>

			<div class="directionList">
				<dl>
					<dt><img src="/contents/css/2014_css/img/ico/ico_2.png" alt="SGIS 연혁" style="width:11px;"/>&nbsp;SGIS 연혁</dt>
					<dd>2006. 12. : 대전광역시 시범 서비스</dd>
					<dd>2007. 12. : 7개 특․광역시 서비스 확대</dd>
					<dd>2008. 12. : 전국 자료 구축 및 시스템 확충</dd>
					<dd>2009.  5.~ : 통계지리정보서비스(SGIS) 전국 서비스 실시</dd>
					<dd>2010년~ : 매년 자료 업데이트</dd>
					<dd>2011. 12. : 통계지도 시계열서비스, S-통계내비게이터, 지도로 보는 행정구역통계 서비스 개시</dd>
				
					<dt><img src="/contents/css/2014_css/img/ico/ico_2.png" alt="SGIS DB구축 과정" style="width:11px;"/>&nbsp;SGIS DB구축 과정</dt>
					<dd>1단계 - 센서스 지도 구축 : 공간분석 서비스가 가능한 수치지도(Digital Map) 구축</dd>
					<dd>2단계 - 개별 통계 조사대상처의 정보 입력 : 전국 거처와 사업체의 위치정보를 등록하고 속성정보를 연결하는 DB구축</dd>
					<dd>3단계 - 기초단위구 구축 : 도로, 하천, 능선 등 항구적 지형지물을 기준으로 기초단위구를 구획</dd>
					<dd>4단계 - 집계구 구축 : 기초단위구를 묶어 일정규모(인구 최적 500명 내외)의 집계구를 획정</dd>
					<dd>5단계 - 서비스 제공 : 통계지리정보서비스 및 공간통계 자료제공</dd>
				</dl>
			</div>

			<div class="listTitle03" style="margin-left:4px;"><img src="/contents/css/2014_css/img/ico/ico_2.png" alt="시스템 개념도" style="width:11px;"/>&nbsp;시스템 개념도</div>
			<ul>
					<li class="navigatorList">통계지리정보시스템은 소지역통계, 지도로 보는 행정구역 통계 등의 콘텐츠를 공공기관과 민간에 서비스</li>
					<li class="navigatorList">통계지리정보시스템의 서비스 Data는 조사 및 관리용 DB로부터 서비스용 데이터로 정제되어 제공</li>
			</ul>

			<div class="navigatorImg">
				<img src="/contents/css/2014_css/img/pic/sgis.png" alt="시스템 개념도"/>
			</div>
			
		<!-- // SGIS란? -->





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
	</body>
</html>