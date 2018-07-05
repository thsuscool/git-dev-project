<%--
	/*
	********************************************************************
	* @source      : shortcut_05_03_01.jsp
	* @description : 공간통계자료 신청내역
	********************************************************************
	* DATE              AUTHOR         VERSION     DESCRIPTION
	* ---------- -------- ------- --------------------------------------
	* 2014-08-21 이경현 수정				디자인 시각화
	********************************************************************
	*/
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String leftMenu="shortcut";

	if(loginYn.equals("N")) {
		out.print("<script>alert('로그인 후 이용할 수 있습니다.'); location.href='/index.jsp'; </script> 로그인 후 이용할 수 있습니다. <a href='shortcut_05_02.jsp'>돌아가기</a>");
	} else {

	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>자료제공 | 통계청SGIS 오픈플랫폼</title>
    <link href="/css/default.css" rel="stylesheet" type="text/css" />  
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/data.css" />
    <link rel="stylesheet" type="text/css" href="/contents/design_2015/styles/nm.css" />
    <link rel="stylesheet" href="/contents/css/2014_css/css/default.css" /> 
    
    <link rel="stylesheet" type="text/css" href="/contents/css/main/tooltip.css" />
    
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    
    
    
    <script type="text/javascript" src="/js/common/common.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.bxslider.min.js"></script>
    
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	
	
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/main/tooltip.js"></script>
	
			
	
	<script type="text/javascript" language="javascript">
	//<![CDATA[
	           
	pageCallReg();
	           
	function census_view(id) {
		var fm=document.censusFm;
		fm.sgis_census_req_id.value = id;
		fm.aT.value = "RET";
		fm.action="shortcut_05_03.jsp";
		fm.submit();
	}

	function census_del(id) {
		var fm=document.censusFm;
		var c = confirm("삭제하시겠습니까?");
	    if(c == 1) {
		   	fm.sgis_census_req_id.value = id;
		   	fm.action="shortcut_05_03_del.jsp";
		   	fm.submit();
	    }
	}
	//]]>
	</script>
	</head>

	<body>
		<div id="wrap">
			<!-- cls:header start -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>


			<div id="container">
			<p class="path">
				<a href="#">
					<span class="path_el">처음페이지&nbsp;&nbsp;&gt;&nbsp;</span>
				</a>
				<a href="#">
					<span class="path_el">알림마당&nbsp;&nbsp;&gt;&nbsp;</span>
				</a>
				<a href="#">
					<span class="path_el current">자료신청</span>
				</a>
			</p>
			<h2 class="ctit">자료신청</h2>
			<p class="smr">통계청에서 자체 생산한 통계지리정보 자료를 제공하는 것으로  파일형태로 서비스하고 있습니다.</p>
			<div class="tabs">
				
				<a href="/contents/shortcut/shortcut_05_02.jsp">서비스 소개</a>
				<a href="/contents/shortcut/shortcut_05.jsp">자료제공 목록</a>
				<a href="/contents/shortcut/shortcut_05_03.jsp"  class="active">자료신청</a>
				<a href="/contents/shortcut/shortcut_05_01.jsp" >자료 다운로드</a>
				
			</div>
		
		
		<div id="contents">
			<div class="content">				
				<div class="listTab" style="height:50px;margin-top:40px;margin-bottom:40px;">
					<span class="listTab_font02" style="line-height:50px;"><a href="shortcut_05_03.jsp">자료신청</a></span>
					<span class="listTab_font01" style="line-height:50px;"><a href="shortcut_05_03_01.jsp">신청내역</a></span>
					<span class="listTab_font02" style="line-height:50px;"><a href="shortcut_05_03_past_year.jsp">과거 집계구 자료신청</a></span>
				</div>
				<div class="title">
					<h3>센서스 공간 통계 자료신청 내역</h3>						
				</div>			
				<table class="listTable">
				<caption>신청내역.</caption>
					<tr>
						<th class="first">NO</th>
						<th>요청번호</th>
						<th>진행상태</th>
						<th>신청일자</th>
						<th>승인/반려(일자)</th>
						<th class="last">삭제</th>
					</tr>
 <%
 	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_APPLY_GROUP");
		lData.setString("sc_userkey", sc_userkey);
			rm = broker.getList(lData);

						int totcount = rm.getRowCount();
 						int i=0;

 						while(rm != null && rm.next()) {
 							String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
 							String sgis_census_req_status_name = StringUtil.verify((String)rm.get("sgis_census_req_status_name"));
 							String sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
 							String create_date = StringUtil.verify((String)rm.get("create_date"));
 							String sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
 							%>
					<tr>
						<td><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=totcount - i %></a></td>
						<td><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=sgis_census_req_id %></a></td>
						<td ><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=sgis_census_req_status_name %></a></td>
						<td><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=create_date %></a></td>
						<td><%if(!sgis_census_req_status.equals("S")) {%><%=sgis_census_req_status_name%>(<%=sgis_census_req_app_date %>)<%} %></td>
						<td><%if(sgis_census_req_status.equals("S")) {%><a href="#" onclick="census_del('<%=sgis_census_req_id %>'); return false;"><img src="/contents/css/2014_css/img/btn/btn_del02.png" alt="삭제 " /></a><%} %></a></td>
					</tr>
					 							<%
 							i++;
 						}
 						if(i == 0) {
 						%>
 						<tr>
 							<td colspan="6" align="center" class="t_end">조회된 데이터가 없습니다.</td>
 						</tr>
 						<%
 						}
 	} catch(Exception e) {
 		System.out.print("sgisWebError : ");
 		//2015-12-03 시큐어코딩
 		//e.printStackTrace();
 		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
 	}
 %>					
			</table>
			<br></br><br></br>
      	</div>
		

		<!-- // 공간통계자료제공-->
					<!-- center contents end -->
					</div>
					
				</div>
			</div><!-- cls:contents end -->
<form name="censusFm" method="post" action="">
	<input type="hidden" name="aT" />
	<input type="hidden" name="sgis_census_req_id" />
</form>			
			
			<!-- cls:footer start -->
			<footer id="footer">
				<jsp:include page="/view/common/includeBottom"></jsp:include>
			</footer>
			
			
		</div> 
		<%} %>
	</body>
</html>