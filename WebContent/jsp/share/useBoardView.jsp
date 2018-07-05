<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="kostat.sop.ServiceAPI.common.security.Security" %>
<!-- 세션정보 포함한 jsp임. 개발서버에 올릴때엔 삭제요망 -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<%
	String sgisUseBoardSeq = (String)request.getParameter("sgisUseBoardSeq");
	String sgisUseAreaCd = (String)request.getParameter("sgisUseAreaCd");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	String nowPage = (String)request.getParameter("nowPage");
	String member_id = (String)request.getSession().getAttribute("member_id");
	
	//2015-12-10 시큐어코딩
	sgisUseBoardSeq = Security.cleanXss(sgisUseBoardSeq);
	sgisUseAreaCd = Security.cleanXss(sgisUseAreaCd);
	searchCont = Security.cleanXss(searchCont);
	searchGb = Security.cleanXss(searchGb);
	nowPage = Security.cleanXss(nowPage);
	member_id = Security.cleanXss(member_id); 
		
	if("^^".equals(searchCont)){
		searchCont = "";
	}

	if(sgisUseBoardSeq == null){
		response.sendRedirect("/jsp/share/useBoardList.jsp");
	}
	
	
%>
<!doctype html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
<link rel="stylesheet" type="text/css" href="./styles/common.css" />
<link rel="stylesheet" type="text/css" href="./styles/layout.css" />
<link rel="stylesheet" type="text/css" href="./styles/nm.css" />
<link rel="stylesheet" type="text/css" href="./styles/application.css" />
<link rel="stylesheet" type="text/css" href="/html/include/css/default.css" />
<script src="./scripts/libs/jquery-1.11.1.min.js"></script>
<script src="./scripts/ui.js"></script>
<script src="./scripts/common.js"></script>
<!--[if lt IE 9]><script src="./scripts/libs/html5shiv.js"></script><![endif]-->
<!--[if lt IE 9]><script src="./scripts/libs/respond.js"></script><![endif]-->
<script src="./scripts/common.js"></script>

   <script type="text/javascript"  src="/js/common/includeHead.js"></script>
   <script type="text/javascript" src="/js/common/common.js"></script>
	<script type="text/javascript" language="javascript">
	
	pageCountPlus();


	function pageCountPlus(){
		jQuery.ajax({
			type:"POST",
			url: "/ServiceAPI/common/pageCallReg.json",
			data:{"hpage":"/jsp/share/useBoardView.jsp"},
			success:function(data){
					
			},
			error:function(data) {

			}
		});
	}
	
	
	
	var sgisUseBoardSeq = "<%=sgisUseBoardSeq%>";
	var sgisUseAreaCd = "<%=sgisUseAreaCd%>";
	var searchCont = "<%=searchCont%>";
	var searchGb = "<%=searchGb%>";
	var nowPage = "<%=nowPage%>";
	if(nowPage == null){
		nowPage = 1;
	}
	if(searchCont == null){
		searchCont = "";
	}
	if(searchGb == null){
		searchGb = "";
	}
	
	
	

	 $(function () {
		init();
		
		$("#firstBtn").on('click',(function(e){
	//		nowPage = 1;
	//		getUseBoardList();
		
		}));
		$("#listBtn").on('click',(function(e){
			
			var url = "/jsp/share/useBoardList.jsp";
			url += "?nowPage=" + nowPage;
			url += "&searchGb=" + searchGb;
			url += "&searchCont=" + searchCont;
			
	
			location.href=url;
			
		}));
		$("#modifyBtn").on('click',(function(e){
			
			var url = "/jsp/share/useBoardModify.jsp";
			url += "?nowPage=" + nowPage;
			url += "&searchGb=" + searchGb;
			url += "&searchCont=" + searchCont;
			url += "&sgisUseBoardSeq=" + sgisUseBoardSeq;
			
			location.href=url;
			
		}));
		 
	 });
	 
	 function init(){
		 getUseBoardView();
	 }
	 
	 //활용게시판 상세페이지 불러온다
	 function getUseBoardView(){
		 
		 
		 //활용사례 상세조회
		 jQuery.ajax({
 	 		type:"POST",
 	 		url: "/ServiceAPI/share/useBoardInfo.json",
 	 		data:{	
 	 				"gubun" 				: "useBoardView",
 	 				"sgisUseBoardSeq" 		: sgisUseBoardSeq,
 	 			  },
 	 		success:function(data){
 	 			
 	 				
 	 				var userId = data.result[0].regist_user;
 	 				
 	 				if(userId != "<%=member_id%>"){
 	 					$("#modifyBtn").hide();
 	 				}
 	 			
					var sgisUseBoardTitle = data.result[0].sgis_use_board_title;
					var sgisUseName = data.result[0].sgis_user_name;
					var sgisUseGb = data.result[0].sgis_use_board_gb_name;
					var sgisUsePurpose = data.result[0].sgis_use_purpose_name;
					var sgisUseAreaCd = data.result[0].sgis_use_area_cd_name;
					var sgisUseData = data.result[0].sgis_use_data;
					var sgisUseDataOther = data.result[0].sgis_use_data_other;
					var sgisActCont = data.result[0].sgis_act_cont;
					var sgisSiteUrl = data.result[0].sgis_site_url;
					var sgisRefData1 = data.result[0].sgis_ref_data1;
					var sgisRefData2 = data.result[0].sgis_ref_data2;
					var sgisRefData3 = data.result[0].sgis_ref_data3;
					var sgisRefData4 = data.result[0].sgis_ref_data4;
					var sgisRefImage = data.result[0].sgis_ref_image;
					var sgisProgressStat = data.result[0].sgis_progress_stat;
					$("#sgisUseBoardTitle").html(sgisUseBoardTitle);
					$("#sgisUseName").html(sgisUseName);
					$("#sgisUseGb").html(sgisUseGb);
					$("#sgisUsePurpose").html(sgisUsePurpose);
					$("#sgisUseAreaCd").html(sgisUseAreaCd);
					$("#sgisUseData").html(sgisUseData);
					$("#sgisUseDataOther").html(sgisUseDataOther);
					$("#sgisActCont").html(sgisActCont);
					if(sgisSiteUrl != null){
						$("#sgisSiteUrl").html("<a href=\"" + sgisSiteUrl + "\">" +sgisSiteUrl + "</a>");
					}else{
						$("#sgisSiteUrl").html("없음");
					}
					
//					<a href="/ServiceAPI/share/useBoardInfo.do?filename=sgisRefData1">sgisRefData1</a><br />
					//alert("javascript:fileDownload(" + sgisRefData1 + ")>" + sgisRefData1 + "</a>");
					if(sgisRefData1 != null){
						$("#sgisRefData1").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgisRefData1 +"\">" + sgisRefData1 + "</a>");
					}else{
						$("#sgisRefData1").html("");
					}
					if(sgisRefData2 != null){
						$("#sgisRefData2").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgisRefData2 +"\">" + sgisRefData2 + "</a>");
					}else{
						$("#sgisRefData2").html("");
					}
					if(sgisRefData3 != null){
						$("#sgisRefData3").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgisRefData3 +"\">" + sgisRefData3 + "</a>");
					}else{
						$("#sgisRefData3").html("");
					}
					if(sgisRefData4 != null){
						$("#sgisRefData4").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgisRefData4 +"\">" + sgisRefData4 + "</a>");
					}else{
						$("#sgisRefData4").html("");
					}
					if(sgisRefImage != null){
						$("#sgisRefImage").html("<img src=\"/upload/share/" + sgisRefImage + "\" alt=\"이미지\" width=\"300\" />");
					}else{
						$("#sgisRefImage").html("");
					}
					$("#sgisProgressStat").html(sgisProgressStat);
					
				//	fileDownload(sgisRefData1);
				
 	 		},
 	 		error:function(data) {
 	 			
 	 		}
 		});
	 }
	 
	</script>
<title>활용사례 조회 | 통계지리정보서비스</title>
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="wrap">
	<!-- header // -->
	<!-- <header id="header"> -->
               <!-- Top Include -->
              <!--  <script type="text/javascript"  src="/js/common/includeSearch.js"></script>
       	 </header> -->
	<!-- //header -->
	
	<header >
	<!-- Top Include -->
	<jsp:include page="/view/common/includeSearch"></jsp:include>
	</header>
	<div id="container">
		<p class="path">
			<a href="#">
				<span class="path_el">처음페이지&nbsp;&nbsp;&gt;&nbsp;</span>
			</a>
			<a href="#">
				<span class="path_el">활용갤러리&nbsp;&nbsp;&gt;&nbsp;</span>
			</a>
			<a href="#">
				<span class="path_el current">활용사례 조회</span>
			</a>
		</p>
		<h2 class="ctit">활용사례 조회</h2>
		<p class="smr">이용자가 자료를 제공받아 직접 활용한 사례를 공유합니다.</p>
		<div class="tabs">
			<a href="/jsp/share/useBoardList.jsp" class="active">활용사례 조회</a>
			<a href="/jsp/share/useBoardRegist.jsp">활용사례 등록</a>
		</div>
		<div id="contents">
			<div id="content">
				<!-- 게시판 전체 영역// -->
				<div id="article-wrap">
					<div class="account-join data-modify">
					<form action="#" method="post" class="account-info">
						<fieldset>
							<div class="f-el">
								<span class="el-h">	제목</span>
								<span class="el-b" id="sgisUseBoardTitle"></span>
							</div>
							<div class="f-el">
								<span class="el-h">활용자명</span>
								<span class="el-b" id="sgisUseName"></span>								
							</div>
							<div class="f-el">
								<span class="el-h">	구분</span>
								<span class="el-b"  id="sgisUseGb"></span>								
							</div>
							<div class="f-el">
								<span class="el-h">활용목적</span>
								<span class="el-b"  id="sgisUsePurpose"></span>								
							</div>
							<div class="f-el">
								<span class="el-h">활용분야</span>
								<span class="el-b" id="sgisUseAreaCd"></span>								
							</div>
							<div class="f-el">
								<span class="el-h lineHeight">이용자료<br/>(통계청)</span>
								<span class="el-b" id="sgisUseData"></span>								
							</div>
							<div class="f-el">
								<span class="el-h lineHeight">이용자료<br/>(타기관)</span>
								<span class="el-b" id="sgisUseDataOther"></span>								
							</div>
							<div class="f-el">
								<span class="el-h">주요 활용내용</span>
								<span class="el-b" id="sgisActCont"></span>								
							</div>
							<div class="f-el">
								<span class="el-h">사이트 URL</span>
								<span class="el-b" id="sgisSiteUrl"></span>								
							</div>
							<div class="f-el">
								<span class="el-h">참고자료</span>
								<span class="el-b" id="sgisRefData1"><a href="#"></a> </span><br />								
								<span class="el-h"></span><span class="el-b" id="sgisRefData2"><a href="#"></a> </span><br />						
								<span class="el-h"></span><span class="el-b" id="sgisRefData3"><a href="#"></a> </span><br />				
								<span class="el-h"></span><span class="el-b" id="sgisRefData4"><a href="#"></a> </span><br />		
							</div>
							<div class="f-el">
								<span class="el-h lineHeight">대표이미지<br/>/분석결과</span>
								<span class="el-b" id="sgisRefImage"></span>								
							</div>
							<div class="f-el">
								<span class="el-h">진행단계</span>
								<span class="el-b" id="sgisProgressStat">승인</span>								
							</div>
						</fieldset>
						<div class="sbm">
							<input type="button" value="목록보기"  id="listBtn" style="cursor: pointer;" />
							<input type="button" value="수정"  id="modifyBtn" style="cursor: pointer;" />
						</div>
					</form>
				</div>		
				</div>
				<!-- //게시판 전체 영역 -->
			</div>
		</div>
	</div>
	<!-- footer// 
	<footer id="footer">
		<div class="footer-in">
			<ul class="terms">
				<li><a href="#">질문 및 개선요청</a></li>
				<li><a href="#">이메일집단수집거부</a></li>
				<li><a href="#">개인정보처리방침</a></li>
			</ul>
			<ul class="relation">
				<li><a href="#"><img src="./images/common/f_link1.gif" alt="MDSS" /></a></li>
				<li><a href="#"><img src="./images/common/f_link2.gif" alt="통계청" /></a></li>
				<li><a href="#"><img src="./images/common/f_link3.gif" alt="OPEN API" /></a></li>
				<li><a href="#"><img src="./images/common/f_link4.gif" alt="e나라지표" /></a></li>
			</ul>
			<div class="info">
				<p class="address">(302-702)대전광역시 서구 청사로 189 통계청</p>
				<dl class="tel">
					<dt>콜센터 :</dt>
					<dd>02)2012-9114</dd>
					<dt>SGIS 담당자 :</dt>
					<dd>042)481-2342</dd>
					<dt>자료제공담당자 :</dt>
					<dd>(042)481-2438</dd>
				</dl>
			</div>
			<p class="copyright">COPYRIGHT STATICS KOREA. ALL RIGHTS RESERVED SINCE 2014</p>
		</div>
	</footer>
	-->
	<!-- 
	<footer id="footer2">
                <div class='footer-in'>
						<ul class='terms'>
							<li><a href='/html/member/personalInfo.html'>개인정보처리방침</a></li>
							<li><a href='/html/member/emailInfo.html'>이메일무단수집거부</a></li>
						</ul>
						<ul class='relation'>
							<li style='margin-right:7px;'><a href='http://kostat.go.kr' target='_blank'>통계청 |</a></li>
							<li style='margin-right:7px;'><a href='http://kosis.kr' target='_blank'>KOSIS |</a></li>
							<li style='margin-right:7px;'><a href='http://mdss.kostat.go.kr' target='_blank'>MDSS |</a></li>
							<li style='margin-right:7px;'><a href='https://kssc.kostat.go.kr:8443/ksscNew_web/index.jsp' target='_blank'>통계분류</a></li>
						</ul>
						<div class='info'>
							<p class='address'>(35208)대전광역시 서구 청사로 189</p>
							<dl class='tel'>
								<dt>통계청콜센터 :</dt>
								<dd>02)2012-9114</dd>
								<dt>관리자 :</dt>
								<dd>042)481-2248</dd>
								<dt>자료제공담당자 :</dt>
								<dd>(042)481-2438</dd>
							</dl>
						</div>
					</div>
            </footer>
	 -->
	<!-- //footer -->
		 <div style="padding-bottom: 10px;">&nbsp;</div>
	    <!-- footer// 
	    <footer id="footer">
	    	<script type="text/javascript"  src="/jsp/share/js/2015_includeBottom_main.js"></script>
	    </footer>
	    -->
	    <footer id="footer">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
 	    </footer>
</div>
</body>
</html>
