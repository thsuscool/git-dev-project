<%--
/*
    ********************************************************************
    * @source      : shortcut_07.jsp
    * @description : SGIS소개 - 서비스소개 - 고령화 현황보기
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2009-10-08 		정종세 						수정       
    * 2014-09-15 		이경현 						디자인 시각화
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
		var devPop = window.open('/publicsmodel/','devPop', 'width=1125,height=880,left=0,top=0, scrollbars=auto ,menubar=no');
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
							$("#l0127").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
			<!-- 고령화 현황보기 -->
			<div class="location">
				<p><span class="on">고령화 현황보기</span> &lt; <span>서비스 소개</span> &lt; <span>SGIS 소개</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">고령화 현황보기</p>
				<p class="txt02">노인복지 향상을 위한 지역통계 정보 서비스</p>
			</div>
			<div class="grayingTitle">
				<p class="navigatorTitleList">지역 간 고령화비교, 추세분석의 고령화 관련 통계정보를 제공하여 고령화사회에 대한<br/>
					 시대적 요청을 반영하고, 정책 수립에 기초 자료를 제공하는 서비스입니다. </p>				
			</div>
			<div class="mapBtn">
				<a href="#" onclick="openWin(); return false;" target="_blank"><img src="/contents/css/2014_css/img/btn/btn_grayingGo.png" alt="고령화 현황보기 바로가기" /></a>
			</div>
			<ul>
				<li class="navigatorList">행정구역 단위와 소지역 단위별 통계자료 제공</li>
				<li class="navigatorList">제공하는 통계항목</li>
				<li class="navigatorList02">- 현황비교 : 노인인구, 노령화지수, 고령인구비율 등 지역간 고령화 현황 비교</li>
				<li class="navigatorList02">- 추세분석 : 과거추세분석(2000년~2010년), 미래추세분석(~2030년)</li>
				<li class="navigatorList02">- 복지시설 : 개별 노인복지시설의 위치 및 시군구단위의 통계 </li>
			</ul>
			<div class="navigatorImg">
				<img src="/contents/css/2014_css/img/pic/pic_graying.png" alt="고령화 현황보기 샘플 이미지" />
			</div>

		<!-- //고령화 현황보기-->


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