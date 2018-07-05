<%--
/*
    ********************************************************************
    * @source      : shortcut_06_03.jsp
    * @description : API키 이용신청- 신청내역
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 
    * 2014-09-11 		이경현      				디자인 시각화
    ********************************************************************
 */
--%>  
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="java.math.BigDecimal"%>
<%@ page import="kr.co.offton.jdf.util.StringUtil"%>
<%@ page import="kr.co.offton.jdf.db.RecordModel"%>
<%@ page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
    String leftMenu="shortcut";

    if(loginYn.equals("N")) {
        out.print("<script>alert('로그인 후 이용할 수 있습니다.'); location.href='/index.jsp'; </script> 로그인 후 이용할 수 있습니다. <a href='shortcut_05_02.jsp'>돌아가기</a>");
    }

    GeneralBroker broker = null;
    RecordModel rm = null;
    RecordModel rm1 = null;
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
	  function MM_showHideLayers() { //v9.0
		  var i,p,v,obj,args=MM_showHideLayers.arguments;
		  for (i=0; i<(args.length-2); i+=3)
		  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
		    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
		    obj.visibility=v; }
		}
		
		function api_view(id) {
		    var fm=document.apiFm;
		    fm.aT.value = "RET";
		    fm.api_auth_key.value = id;
		    fm.action="shortcut_06_03.jsp";
		    fm.submit();
		}
	//]]>
	</script>
	</head>

	<body>
	 <form name="apiFm" method="post" action="shortcut_06_03.jsp" onsubmit="return false;">
        <input type="hidden" name="aT"/>
        <input type="hidden" name="api_auth_key"/>
    </form>
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
							$("#l0523").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
	<div class="acticle">
							<!-- API키 이용신청 -->
			<div class="location">
				<p><span class="on">API키 이용신청 </span> &lt;  <span>공간통계 S-OpenAPI</span> &lt; <span>OpenAPI</span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">API키 이용신청 </p>
				<p class="txt02">통계지리정보서비스의 새로운 소식을 빠르게 전해 드립니다.</p>
			</div>
			<div class="use_wrap">	
					<div class="listTab"><span class="listTab_font02"><a href="/contents/shortcut/shortcut_06_03.jsp">API키 이용신청</a></span><span class="listTab_font01"><a href="/contents/shortcut/shortcut_06_03_01.jsp">신청내역</a></span>	</div>	
								
					<table class="listTable">
					<caption>신청내역.</caption>
						<tr>
							<th class="first">NO</th>
							<th>진행상태</th>
							<th>사용처</th>
							<th>시스템명</th>
							<th>신청일자</th>
							<th>API Key</th>
							<th class="last">승인/반려일자</th>
						</tr>
						<%
    try {
        broker = new GeneralBroker("apaa00");
        lData.setString("PARAM", "API_APPLY_INDIVIDUAL");
        lData.setString("sc_userkey", sc_userkey);
        rm = broker.getList(lData);

        int totcount = rm.getRowCount();
        int i=0;

        while(rm != null && rm.next()) {
            String api_auth_key = StringUtil.verify((String)rm.get("api_auth_key"));
            String api_approve_status_name = StringUtil.verify((String)rm.get("api_approve_status_name"));
            String api_use_org = StringUtil.verify((String)rm.get("api_use_org"));
            String api_title = StringUtil.verify((String)rm.get("api_title"));
            api_title = api_title.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
            String create_date = StringUtil.verify((String)rm.get("create_date"));
            String api_approve_status = String.valueOf((Character)rm.get("api_approve_status"));
            String api_approve_date = StringUtil.verify((String)rm.get("api_approve_date"));
%>
            <tr>
              <td><%=totcount - i %></td>
              <td><%=api_approve_status_name %></td>
              <td ><%=api_use_org %></td>
              <td class="tl"><a class="blue_01" href="shortcut_06_03.jsp?api_auth_key=<%=api_auth_key %>&amp;aT=RET" onclick="api_view('<%=api_auth_key %>'); return false;"><%=api_title %></a></td>
              <td><%=create_date %></td>
              <td><%=api_auth_key %></td>
              <td class="t_end"><%if(!api_approve_status.equals("S")) {%><%=api_approve_status_name%><br/>(<%=api_approve_date %>)<%} %></td>
            </tr>
<%
            i++;
        }
        if(i == 0) {
        %>
    	<tr>
			<td colspan="6" align="center">조회된 데이터가 없습니다.</td>
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
					
			</div>
			<!-- // 공간통계자료제공-->

					<!-- center contents end -->
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