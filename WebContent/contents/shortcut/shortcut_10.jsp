<%--
/*
    ********************************************************************
    * @source      : shortcut_02.jsp
    * @description : 서비스소개-지도로보는 행정구역통계
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2011-07-12 이태경      
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
							$("#l012").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0122").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
				<!-- 지도로보는 행정구역통계 -->
			<div class="location">
				<p><span class="on">행정구역 통계</span>&lt;<span>서비스 소개</span>&lt;<span>SGIS소개</span>&lt;<span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">행정구역 통계</p>
				<p class="txt02">이용자 맞춤형 행정구역단위 공간통계정보서비스</p>
			</div>
			<div class="mapTitle">
				<p class="navigatorTitleList">KOSIS의 수록자료 중 행정구역별 통계를 사용자가 지도 위에서<br/>
					 쉽게 이용할 수 있는 서비스입니다.</p>				
			</div>
			<div class="mapBtn">
				<a href="/statbd/" ><img src="/contents/css/2014_css/img/btn/btn_mapGo.png" alt="지도로보는 행정구역 통계 바로가기" /></a>
			</div>
			<ul>
				<li class="navigatorList">KOSIS와 연계하여 행정구역단위로 제공이 가능한 인구총조사, 인구동향조사, 전국사업체조사 등의 통계정보 제공</li>
			</ul>
			<div class="navigatorImg">
				<img src="/contents/css/2014_css/img/pic/statbd.png" width="740" alt="행정구역 통계 지도이미지" />
			</div>

		<!-- //지도로보는 행정구역통계-->


					<!-- center contents end -->
					<br />&nbsp;<br />&nbsp;
					
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