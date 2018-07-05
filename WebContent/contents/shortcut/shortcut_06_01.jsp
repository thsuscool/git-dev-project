<%--
/*
    ********************************************************************
    * @source      : shortcut_06_01.jsp
    * @description : 공유마당-OpenAPI-사용안내
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    *     
    * 2014-09-15 		이경현						디자인시각화      
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
	  function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
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
							$("#l05").attr("style", "display:block");		//left Menu에서 참여바당 부분 보여줌.
							$("#l052").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0522").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
		<!--  S-Open API -->
			<div class="location">
				<p><span class="on">S-Open API 소개 &lt; <span> S-Open API</span></span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">S-Open API 소개</p>
				<p class="txt02">S-Open API를 통하여 매쉬업을 수행할 수 있습니다.</p>
			</div>
			<div class="directionInfo">
				<div class="directionInfoTitle">S-Open API는</div>
				<p>
				S-Open API(Application Programming Interface)는 통계지리정보서비스에 정의되어<br/> 
				있는 함수들의 집합으로 외부 개발자들이 서비스를 개발하는데 활용할 수 있도록 제공되는<br/>
				 함수를 말합니다. 통계청에서는 지도, 경계, 통계 등 부문에서 외부 개발자들이 활용할 <br/>
				 수 있도록 API를 제공하고 있습니다.
				<!-- 
				통계청이 가지고 있는 양질의 공간통계 정보를 S-Open API를 활용하여 제공하면 <br/>
				공간통계를 활용한 매쉬업 서비스가 활성화가 될 것입니다. 이를 통하여 공간통계정보가<br/> 
				수요자의 참여에 의해 자가발전하여 지식정보체계로 발전할 수 있습니다. 
				 -->
				</p>
				<a href="/contents/include/know_api_pop.jsp"  onclick="window.open('/contents/include/know_api_pop.jsp', 'api_pop', 'width=440, height=509'); return false;"><img src="/contents/css/2014_css/img/ico/ico_S-OpenAPI02.png" alt="알림정보I" /></a>
			</div>
			<div class="directionList">
				<dl>
					<dt>S-Open API는 어떤 서비스인가요?</dt>
					<dd>개발자가 통계청의 다양한 S-Open API를 이용해, 작게는 운영 사이트의 다양한 서비스 활용을 지원하고,
							넓게는 창조적이고 다양한 애플리케이션을 개발할 수 있도록 기술과 서비스를 공유하는 프로그램입니다.</dd>
					<dt>S-Open API는 어떤 서비스들을 제공하고 있습니까?</dt>
					<dd>S-Open API에는 통계지리정보서비스에서 사용하고 있는 MapControl, 경계, 통계, 주소 변환 부문의 다양한 API를 제공하고 있습니다.</dd>
					<dt>처음방문했습니다.어떻게 이용하면 되나요?</dt>
					<dd>1. 사용안내에서 S-OpenAPI 2.0 바로가기를 통해 S-Open API 정보를 참조해 주세요.</dd>
					<dd>2. S-Open API 제공목록에서 활용하고자 하는 API를 찾아 보세요.</dd>
					<dd>3. S-Open API를 사용하기 위해서는 Key가 필요합니다. API Key 이용 신청을 해주세요.</dd>
					<dd>4. 선택한 S-Open API의 사용방법을 참고하셔서 사용 목적에 맞게 활용하세요.</dd>
					<dd>5. S-Open API를 사용하여 서비스를 구축하셨다면 모두가 공유하여 활용할 수 있도록</dd>
					<dd>  &nbsp;&nbsp; 홈페이지>공유마당>활용갤러리>활용사례 등록을 해주시면 감사하겠습니다.</dd>
					<!-- 
					<dd>1. S-Open API 사용을 위해서는 key가 필요합니다. 이용신청을 해주세요.</dd>
					<dd>2. 제공 API 목록에서 어떤 API 를 이용할지 골라보세요.? </dd>
					<dd>3. 각 서비스 별 안내문을 참고하셔서, 원하시는 API를 목적에 맞게 사용하세요. </dd>
					<dd>4. 원하시는 서비스 및 어플리케이션을 만드셨다면, <a href="http://<%=request.getServerName()%>/OpenAPI2/contents/index.vw">S-Open API 활용 페이지</a>에 제작한 어플리케이션의 
							URL을 등록하여 모두가 공유하고 즐길 수 있도록 해주세요. </dd>
					 -->
					<dt>S-Open API는 무료인가요?</dt>
					<dd>네, 무료로 제공됩니다. </dd>
				</dl>
			</div>
		<!-- // 사용안내 -->






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