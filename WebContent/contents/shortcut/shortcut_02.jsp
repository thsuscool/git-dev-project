<%--
/*
    ********************************************************************
    * @source      : shortcut_02.jsp
    * @description : 서비스소개-통계내비게이터
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2009-10-08 정종세 수정       
    * 2013-09-02 이경현 디자인시각화
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
		 var devPop = window.open('<%= ConfigManager.getStatisticsResourceURL()%>/sgisnavigator/','devPop', 'width=1250,height=768,left=0,top=0,scrollbars=auto,menubar=no,resizable=yes');
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
							$("#l012").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0121").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
	<div class="acticle">
				<!-- 통계내비게이터(소지역) -->
			<div class="location">
				<p><span class="on">소지역 통계</span>&lt;<span>서비스 소개</span>&lt;<span>SGIS 소개</span>&lt;<span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">소지역 통계</p>
				<p class="txt02">이용자 수준에 맞는 조회지원 - 초보자는 간편조회! 전문가는 상세조회!</p>
			</div>
			<div class="navigatorTitle">
				<p class="navigatorTitleList">
						 전국 1,300만 거처, 300만 사업장의 위치정보를 활용하여 읍면동의 약 1/24크기인 집계구 <br/>
						 단위에 대한 통계정보를 이용자 관심사항에 따라 설정하여 알아볼 수 있습니다.<br/>
						 또한 누구나 쉽게 다양한 통계를 조회할 수 있는 간편조회와 <br/>
						 전문적인 상세조회로 구분하여 제공합니다.</p>				
			</div>
			<div class="navigatorBtn">
				<a href="/sgisnavigator/" ><img src="/contents/css/2014_css/img/btn/btn_navigatorGo.png" alt="통계내비게이터(소지역)바로가기" /></a>
			</div>
			<ul>
				<li class="navigatorList">읍면동 단위보다 세밀한 집계구 단위의 통계 조회</li>
				<li class="navigatorList">사용자가 직접 조건검색식을 설정하여 다양한 관심 통계 획득</li>
				<li class="navigatorList">제공하는 통계항목 </li>
				<li class="navigatorList02">-인구 : 성, 연령, 교육정도, 종교, 혼인상태</li>
				<li class="navigatorList02">-가구 : 방/거실/식당수, 난방시설, 점유형태, 세대구성</li>
				<li class="navigatorList02">-주택 : 건축년도, 연건평, 주택유형</li>
				<li class="navigatorList02">사업체 : 세세산업분류별 사업체수, 종사자수</li>
			</ul>
			<div class="navigatorImg">
				<img src="/contents/css/2014_css/img/pic/pic_navigator.png" alt="소지역 통계 이용방법 소개" />
			</div>

		<!-- //통계내비게이터(소지역)-->

					<!-- center contents end -->
				<br />&nbsp;<br />&nbsp;<br />&nbsp;
					</div>
				</div>
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div> 
		</div>
	</body>
</html>