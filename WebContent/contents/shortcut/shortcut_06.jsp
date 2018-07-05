<%--
/*
    ********************************************************************
    * @source      : shortcut_06.jsp
    * @description : 사용안내
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2014-09-11		이경현						디자인시각화      
    ********************************************************************
 */
--%>  
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
    String leftMenu="shortcut";
    GeneralBroker broker = null;
    RecordModel rm = null;
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
		
		function expertDown() {
		    var fm=document.apiFm;
		    var filename=fm.api_element_expert_api_doc.value;
		    fm.filename.value=filename;
		    fm.target="downloadIfr";
		    fm.action="/contents/include/download.jsp";
		    fm.submit();
		}
		
		function checkLogin2014(url){
		    var loginYn = '<%=loginYn%>';

		    if(loginYn == 'Y')
		      return true;
		    else{
		      alert('로그인 후 등록할 수 있습니다.');
		      pop_login = window.open('/contents/member/pop_login.jsp?login_url='+ url,'','width=350,height=250,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=0,resizable=0');
		      return false;
		    }

		  }
		  
		function loginClick(url){

		    if(checkLogin2014(url)) {
			    window.location.replace(url);
		    }
		    return;
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
							$("#l0521").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
	<div class="acticle">
				<!-- 사용안내 -->
			<div class="location">
				<p><span class="on">사용안내</span> &lt; <span>S-Open API</span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
			</div>
			<div class="subTitle">
				<p class="txt01">사용안내</p>
				<p class="txt02">S-Open API 사용방법</p>
			</div>
			<div class="spaceTitle">
				<p class="navigatorTitleList">
											여러분이 구축하고 계신 서비스에 S-Open API를 적용하여 통계정보를 표시할 수<br />
											있습니다. 또한 S-Open API 활용 가이드문서를  참조하시면 보다 다양한 API를 <br />
											통하여 세련된 통계서비스를 구축할 수 있습니다.				<br />
											</p>				
				<!-- 
											S-Open API를 이용 하시면,당신의 홈페이지에 DHTML 및 JavaScript를 이용하여<br/> 
											통계정보를 나타낼 수 있습니다. 또한 고급사용자들은 상세 API문서를 이용하여 보다<br/>
											세련된 통계어플리케이션을 제작할 수 있습니다. 
				 -->
			</div>
			
			<div class="spaceWrap">
				<p class="spaceO"><img src="/contents/css/2014_css/img/ico/ico_space02.png" alt="블릿이미지" /> S-Open API 시작가이드</p>
				<div class="spaceBbg">
					<p>
						빠르고 쉽게 이용할 수 있는<br/><span>S-Open API </span>리스트가 제공 됩니다					
					</p>
					<div class="spaceBbgBtn"><a href="http://<%=request.getServerName()%>/OpenAPI2/contents/index.vw"><img src="/contents/css/2014_css/img/btn/btn_help.png" alt="help 시작가이드" /></a></div>
				</div>
			</div>				
			<div class="spaceWrap2">
				<p class="spaceO"><img src="/contents/css/2014_css/img/ico/ico_space01.png" alt="블릿이미지" /> S-Open API Key를 신청하세요.</p>
				<div class="spaceObg">
					<p>
						<span> S-Open API를 사용하려면<br/>먼저 인증키를 신청</span>하세요.<br/><br/>
						 S-Oepn API의<br/> <span>약관동의 및 간단한 이용자확인을</span> 통하여<br/>무료로 인증키를 발급 받을 수 있습니다					
					</p>
					<div class="spaceObgBtn"><a href="#" onclick="javascript:loginClick('/contents/shortcut/shortcut_06_03.jsp'); return false;"><img src="/contents/css/2014_css/img/btn/btn_ap.png" alt="AP키 이용등록" /></a></div>
				</div>
			</div>
			<div class="navigatorImg2">
				<img src="/contents/css/2014_css/img/pic/pic_space.png" alt="이미지" />
			</div>
	
			

		<!-- //사용안내 -->

					<!-- center contents end -->
					<br /><br />&nbsp;
					</div>
<br /><br />&nbsp;					
				</div>
			</div><!-- cls:contents end -->
		</div> 
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div>
	</body>
</html>