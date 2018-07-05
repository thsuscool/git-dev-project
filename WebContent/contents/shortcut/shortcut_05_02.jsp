<%--
/*
    ********************************************************************
    * @source      : shortcut_05_04_02.jsp
    * @description : 공유마당 - 자료신청 -센서스 공간통계 자료제공
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2009-10-14 		정종세 						수정       
    * 2014-09-15 		이경현						디자인시각화       
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp"%>
<%-- <%@ include file="/contents/include/logger.jsp"%> --%>
<%
  String leftMenu="shortcut";

	GeneralBroker broker = null;
	RecordModel rm = null;
	String sgis_census_return_call = "";
	
	try {
	broker = new GeneralBroker("ceaa00");
	
	/***************************/
	/* 안내문 자료 */
	/***************************/
	lData.setString("PARAM","INFORMATION");
	rm = broker.getList(lData);
	
	if(rm.next()) {
	  sgis_census_return_call = StringUtil.toLine(StringUtil.verify((String)rm.get("sgis_census_return_call")));
	}
	
	} catch(Exception e) {
		
		//out.print(e);
		//e.printStackTrace();
		//2015-12-03 시큐어코딩
		//e.printStackTrace();
		//logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<!-- 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
		<link rel="stylesheet" href="/contents/css/2014_css/css/default.css" />   
		<script type="text/javascript" src="/contents/css/2014_css/js/jquery-1.11.0.min.js"></script> 
		<script type="text/javascript" src="/contents/css/2014_css/js/default.js"></script>
	-->

<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>자료제공 | 통계청SGIS 오픈플랫폼</title>
<link href="/css/default.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/css/main.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/data.css" />
<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.bxslider.min.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>


<script type="text/javascript" language="javascript">
$(function(){
	$(document).ready(function() {
		//맨위로 버튼///////
		var scrollWidthVal = 970 + ($(window).width()-970)/2 - 61;
		$("#topScrollTag").css("left", scrollWidthVal)
		$(window).scroll(function(){
		    var currentScrollY = $(this).scrollTop();
		    if(currentScrollY >= 10){
		    	$("#topScrollTag").fadeIn("fast");
		    }else{
		    	$("#topScrollTag").fadeOut("fast");
		    }
		});
	});
});
	function openWin(){
		var devPop = window.open('<%= ConfigManager.getStatisticsResourceURL()%>/statbd/','devPop', 'width=1260,height=768,left=0,top=0,scrollbars=auto, resizable=yes');	
		    devPop.focus();
	}
	
	//alert(AuthInfo.authStatus);
	
	pageCallReg();
	
	</script>
</head>









<body class="main">

	<div id="wrap">
		<!-- header // -->
		<!-- <header id="header"> --> 
		<!-- Top Include --> 
		<!-- <script type="text/javascript" src="/js/common/includeSearch.js"></script> 
		</header> -->
		<header> 
		<!-- Top Include --> 
		<jsp:include page="/view/common/includeSearch"></jsp:include> 
		</header>
		<!-- body -->

		<div id="container">
			<p class="path">
				<a href="#"> <span class="path_el">처음페이지&nbsp;&nbsp;&gt;&nbsp;</span>
				</a> <a href="#"> <span class="path_el">알림마당&nbsp;&nbsp;&gt;&nbsp;</span>
				</a> <a href="#"> <span class="path_el current">자료신청</span>
				</a>
			</p>
			<h2 class="ctit">자료신청</h2>
			<p class="smr">통계청에서 자체 생산한 통계지리정보 자료를 제공하는 것으로 파일형태로 서비스하고 있습니다.</p>
			<div class="tabs">
				<a href="/contents/shortcut/shortcut_05_02.jsp" class="active">서비스
					소개</a> <a href="/contents/shortcut/shortcut_05.jsp">자료제공 목록</a> <a
					href="/contents/shortcut/shortcut_05_03.jsp">자료신청</a> <a
					href="/contents/shortcut/shortcut_05_01.jsp">자료 다운로드</a>
			</div>
			<div id="contents">
				<div class="account-join account-join-info">
					<div class="title">
						<h3>서비스 소개</h3>
						<p>통계청에서 자체 생산한 통계지리정보 자료를 제공하는 것으로 파일형태로 서비스하고 있습니다.
							<!-- <br><br><font color='blue'>* 2014년도 자료는 2016년 4월 6일 부터 제공할 예정입니다.</font> --> 
						</p>
					</div>
				</div>
				<div id="content">
					<div class="account-modify04">
						<div class="pl20 pr20">
							<p class="para mb30">통계청에서 자체 생산한 통계지리정보자료를 정부기관 및 민간에서 활용하여
								더 큰 부가가치를 창출할 수 있도록 자료를 제공하는 것으로 현재 센서스 공간통계 자료를 파일형태로 서비스하고
								있습니다.</p>

							<h4 class="itit">서비스 목적</h4>
							<p class="para mb30">통계청에서 자체 구축한 통계지리정보의 공동 활용을 통한 국가 경쟁력 강화
							</p>
							<h4 class="itit">자료제공 절차</h4>
							<img src="/contents/design_2015/images/data/data.gif" alt="" />
							<h4 class="itit">자료제공 신청방법</h4>
							<p class="para mb30">
								<a
									href="/contents/include/download.jsp?filename=sgis_data_request_guide.hwp&amp;path=/board/">[다운로드]</a>
							</p>
							<p class="lnfo">문의사항연락처: ☏042-481-2438, parkkb@korea.kr</p>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!-- 맨위로 버튼 -->
        <a id=topScrollTag href="javascript:window.scroll(0,0)" style="position: fixed; bottom:150px; display:none; border-radius: 5px; width: 50px; height: 50px;cursor: pointer;background-color: #8e787f; opacity: 0.4; filter: alpha(opacity=40);">
        	<img id="topScrollImg" src="/img/ico/arrowup.png" alt="맨위로 가기" >
        </a>
		
		<!-- footer// -->
		<!-- <footer id="footer"> <script type="text/javascript"
			src="/js/common/includeBottom.js"></script> </footer> -->
		<!-- //footer -->
		<footer id="footer"> <jsp:include
			page="/view/common/includeBottom"></jsp:include> </footer>
	</div>
</body>
</html>





