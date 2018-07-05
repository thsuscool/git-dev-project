
<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="EUC-KR"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="kr.co.offton.pdf.basis.*"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
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
					
		<div class="acticle">
		
		<!--  회원탈퇴 -->
			<div class="location">
				<p><span class="on">회원탈퇴</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">회원탈퇴</p>
				<p class="txt02"></p>
			</div>			
			<div class="memberLeave">				
				<p>통계지리정보서비스 홈페이지는 회원의 개인정보 보호문제를 신중하게 취급합니다.<br/><br/>
				<span class="memberLeaveF1">통계지리정보서비스 홈페이지<span class="memberLeaveF2"> 회원탈퇴가 완료</span> 되었습니다.</span><br/><br/>
				그 동안 통계지리정보서비스 사이트에 많은 관심과 참여 진심으로 감사드립니다.<br/>
				더욱더 발전하는 통계지리정보서비스 사이트가 되도록 노력하겠습니다.
			
				</p>
				<div class="memberLeavebtn">
					<a href="/"><img src="/contents/css/2014_css/img/btn/btn_home.png" alt="홈으로가기" /></a>					
				</div>			
			</div>
			
		<!-- // 회원탈퇴 -->






					<!-- center contents end -->
			<br /><br />&nbsp;
					</div>
					
				</div>
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			<div class="footerbox02"><img src="/contents/css/2014_css/img/pic/pic_footer.png" alt="통계청" /></div>
			</div><!-- cls:footer end -->
		</div> 
	</body>
</html>