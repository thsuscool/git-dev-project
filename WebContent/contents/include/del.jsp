
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
		<meta name="format-detection" content="telephone=no" /><!-- ��ȭ��ȣ �ڵ� ��ũ ���� ���� --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS ���������������</title> 
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
		  	<%@include file="/contents/include/header_2014.jsp" %>		<!-- ��� ���� -->
		  	<!-- /top -->			
  			</div><!-- cls:header end -->


			<!-- cls:contents start -->
			<div class="contents subbg">
				<div class="container">
					
		<div class="acticle">
		
		<!--  ȸ��Ż�� -->
			<div class="location">
				<p><span class="on">ȸ��Ż��</span> &lt; <span><a href="/">ó��������</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">ȸ��Ż��</p>
				<p class="txt02"></p>
			</div>			
			<div class="memberLeave">				
				<p>��������������� Ȩ�������� ȸ���� �������� ��ȣ������ �����ϰ� ����մϴ�.<br/><br/>
				<span class="memberLeaveF1">��������������� Ȩ������<span class="memberLeaveF2"> ȸ��Ż�� �Ϸ�</span> �Ǿ����ϴ�.</span><br/><br/>
				�� ���� ��������������� ����Ʈ�� ���� ���ɰ� ���� �������� ����帳�ϴ�.<br/>
				����� �����ϴ� ��������������� ����Ʈ�� �ǵ��� ����ϰڽ��ϴ�.
			
				</p>
				<div class="memberLeavebtn">
					<a href="/"><img src="/contents/css/2014_css/img/btn/btn_home.png" alt="Ȩ���ΰ���" /></a>					
				</div>			
			</div>
			
		<!-- // ȸ��Ż�� -->






					<!-- center contents end -->
			<br /><br />&nbsp;
					</div>
					
				</div>
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			<div class="footerbox02"><img src="/contents/css/2014_css/img/pic/pic_footer.png" alt="���û" /></div>
			</div><!-- cls:footer end -->
		</div> 
	</body>
</html>