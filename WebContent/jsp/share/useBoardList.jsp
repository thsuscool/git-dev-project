<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<!-- 세션정보 포함한 jsp임. 개발서버에 올릴때엔 삭제요망 -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<%
	String sgisUseBoardSeq = (String)request.getParameter("sgisUseBoardSeq");
	String sgisUseAreaCd = (String)request.getParameter("sgisUseAreaCd");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	String nowPage = (String)request.getParameter("nowPage");
	
	if(nowPage == null){
		nowPage = "1";
	}
%>
<!doctype html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">



<!-- <link rel="stylesheet" type="text/css" href="/statsPotal/css/layout.css" />
<link rel="stylesheet" type="text/css" href="./styles/common.css" />
<link rel="stylesheet" type="text/css" href="./styles/layout.css" />
 -->
<link rel="stylesheet" type="text/css" href="./styles/nm.css" />
<link rel="stylesheet" type="text/css" href="./styles/application.css" />
<style>
/* 탭처리 공통 */
.tabs {width: 100%;margin-bottom: 50px;font-size: 0;overflow: hidden;}
.tabs span,
.tabs a {float: left;width: 50%;height: 60px;background-color: #d9d9d9;font-size: 18px;line-height: 60px;font-weight: bold;color: #fff;text-indent: 20px;}
.tabs-quad span {width: 25%;}
.tabs .active,
.tabs .active {background-color: #4f87b6;}
.tabs * {vertical-align: top;}
.tabs em {font-weight: bold;font-size: 24px;line-height: 60px;}
</style>
<script src="./scripts/libs/jquery-1.11.1.min.js"></script>
<script src="./scripts/ui.js"></script>

   <script type="text/javascript"  src="/js/common/includeHead.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>



<!--[if lt IE 9]><script src="./scripts/libs/html5shiv.js"></script><![endif]-->
<!--[if lt IE 9]><script src="./scripts/libs/respond.js"></script><![endif]-->
<script src="./scripts/common.js"></script>
<title>활용사례 조회 | 통계지리정보서비스</title>
<script>

pageCountPlus();


function pageCountPlus(){
	jQuery.ajax({
		type:"POST",
		url: "/ServiceAPI/common/pageCallReg.json",
		data:{"hpage":"/jsp/share/useBoardList.jsp"},
		success:function(data){
				
		},
		error:function(data) {

		}
	});
}









var nowPage = "<%=nowPage%>";
if(nowPage == ""){
	nowPage = 1;
}
var smallIdx = 1;
var bigIdx = 1; 
var totCnt = 0;
var sgisUseAreaCd = "";
var searchCont = "";
var searchGb = "";

 $(function () {
	init();
	
	$("#firstBtn").on('click',(function(e){
		nowPage = 1;
		getUseBoardList();
	}));
	$("#lastBtn").on('click',(function(e){
		if(totCnt %5==0){
			nowPage = parseInt(totCnt /5);
		}else if(totCnt %5 != 0){
			nowPage = parseInt((totCnt /5) + 1);
			
		}
		getUseBoardList();
	}));
	
	$("#preBtn").on('click',(function(e){
		
		nowPage = (bigIdx -2) * 10 + 1;
		
		if(nowPage <= 0){
			nowPage = 1;
		}
		
		getUseBoardList();
	}));
	$("#nextBtn").on('click',(function(e){

		nowPage = (bigIdx) * 10 + 1;
		
		var maxPage = 0;
		if(totCnt %5==0){
			maxPage = parseInt(totCnt /5);
		}else if(totCnt %5 != 0){
			maxPage = parseInt((totCnt /5) + 1);
			
		}
		
		if(nowPage >= maxPage){
			nowPage = maxPage;
		}
		
		getUseBoardList();
	}));
	
	
	$("#searchCont").bind("keydown", function (event) {
		if (event.which === 13) {
			getSearchList();
		}
	});
	 
 });
 
 function init(){
	 getUseBoardList();
	 getUseArea();
	 getTotCnt();
	// setPage();
 }
 
 function getSearchList(){
	 nowPage = 1;
	 getUseBoardList();
	 getTotCnt();
 }
 
 //활용게시판 리스트를 불러온다
 function getUseBoardList(){
	 
	 $("#contentUl").html("");
	 
		 sgisUseAreaCd = $("#sgisUseAreaCd").val();
		 searchCont = $("#searchCont").val();
		 searchGb = $("#searchGb").val();
		 
	 if(searchCont == ""){
		 searchCont = "^^";
	 }
	 //검색, 페이징
	 jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/share/useBoardInfo.json",
	 		data:{	
	 				"gubun" 		: "useBoardList",
	 				"sgisUseAreaCd" : sgisUseAreaCd,
	 				"searchCont" 	: searchCont,
	 				"searchGb"		: searchGb,
	 				"nowPage"		: nowPage
	 			  },
	 			  
	 			  
	 			  
	 		success:function(data){

	 			var cont = "";
	 			if(data == null){
	 				alert("데이터가 없음");
	 			}else{
	 				
	 			for(var i=0; i<data.result.length; i++){
						
						var sgis_use_board_seq = data.result[i].sgis_use_board_seq;
						var sgis_use_board_title = data.result[i].sgis_use_board_title;
						var sgis_user_name = data.result[i].sgis_user_name;
						var sgis_use_board_gb = data.result[i].sgis_use_board_gb;
						var sgis_use_purpose = data.result[i].sgis_use_purpose;
						var sgis_use_area_cd = data.result[i].sgis_use_area_cd;
						var sgis_use_data = data.result[i].sgis_use_data;
						var sgis_use_data_other = data.result[i].sgis_use_data_other;
						var sgis_act_cont = data.result[i].sgis_act_cont;
						sgis_act_cont = replaceAll('<br />', '', sgis_act_cont);
						sgis_act_cont = replaceAll('<br/>', '', sgis_act_cont);
						if(sgis_act_cont.length > 200){
							sgis_act_cont = sgis_act_cont.substring(0, 197)+ "...";
						}
						var regist_user = data.result[i].regist_user;
						var regist_date = data.result[i].regist_date;

						cont += "<li>";
						cont += "<div class=\"listLeft\">";
						if(sgis_use_area_cd == "001"){
							cont += "<img src=\"./images/application/icon4.png\" alt=\"경제산업\"/>";	
							cont += "<p>경제산업</p>";
						}else if(sgis_use_area_cd == "002"){
							cont += "<img src=\"./images/application/icon2.png\" alt=\"교육문화\"/>";	
							cont += "<p>교육문화</p>";
							
						}else if(sgis_use_area_cd == "003"){
							cont += "<img src=\"./images/application/icon3.png\" alt=\"교통환경\"/>";	
							cont += "<p>교통환경</p>";
							
						}else if(sgis_use_area_cd == "004"){
							cont += "<img src=\"./images/application/icon4.png\" alt=\"도시계획\"/>";	
							cont += "<p>도시계획</p>";
							
						}else if(sgis_use_area_cd == "005"){
							cont += "<img src=\"./images/application/icon5.png\" alt=\"사회복지\"/>";	
							cont += "<p>사회복지</p>";
							
						}else if(sgis_use_area_cd == "006"){
							cont += "<img src=\"./images/application/icon6.png\" alt=\"재해기후\"/>";	
							cont += "<p>재해기후</p>";
							
						}else{
							cont += "<img src=\"./images/application/icon7.png\" alt=\"기타\"/>";	
							cont += "<p>기타</p>";
		
						}
						cont += "</div>";
						cont += "<div class=\"listRight\">";
						
						cont += "<a href=\"/jsp/share/useBoardView.jsp?sgisUseBoardSeq=" + data.result[i].sgis_use_board_seq  + "&nowPage=" + nowPage;
						cont += "&sgisUseAreaCd=" + sgisUseAreaCd +"&searchCont=" + searchCont + "&searchGb=" + searchGb+ "\">";
						
						cont += "<p class=\"listTilte\">";
						cont += sgis_use_board_title;
						cont += "<span class=\"ml20\">"+ regist_date +"</span>";
						cont += "</p>";
						cont += "<p class=\"listGroup\">";
						cont += "<b>활용자</b>";
						cont += " : " + sgis_user_name + "";
						
						var sgis_use_board_gb_name = "";
						if(sgis_use_board_gb == "001"){
							sgis_use_board_gb_name = "공간통계자료";
							
						}else if(sgis_use_board_gb == "002"){
							sgis_use_board_gb_name = "OpenAPI";
		
						}
						
						cont += "<span class=\"ml20\"><b>분류</b> : " + sgis_use_board_gb_name + "</span>";
						cont += "</p>";
						cont += "<p class=\"listSummary mt5\">";
						cont += "";
						cont += sgis_act_cont;
						cont += "</p>";
						
						cont += "";
						
						cont += "</div>";
						cont += "</li>";
	 			}
				
				//" + sgis_user_name + "
				
//				cont += "<a href=\"/jsp/share/useBoardView.jsp?sgisUseBoardSeq=" + data.result[i].sgis_use_board_seq  + "&nowPage=" + nowPage;
//				cont += "&sgisUseAreaCd=" + sgisUseAreaCd +"&searchCont=" + searchCont + "&searchGb=" + searchGb+ "\">";
//				cont += "게시번호" + data.result[i].sgis_use_board_seq + "|&nbsp;&nbsp;&nbsp;|";
//				cont += "sgis_use_board_gb" + data.result[i].sgis_use_board_gb + "|&nbsp;&nbsp;&nbsp;|";
//				cont += "sgis_use_board_title" + data.result[i].sgis_use_board_title + "|&nbsp;&nbsp;&nbsp;|";
//				cont += "sgis_act_cont" + data.result[i].sgis_act_cont + "<br />";
//				cont += "</a>";
				$("#contentUl").append(cont);
			}

			setPage();
			getTotCnt();
	 		},
	 		error:function(data) {
	 		}
		});
 }
 
 function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
 }
 
 //활용분야 정보를 가져온다.
 function getUseArea(){
	 //검색의 콤보박스
	 //sgisUseAreaCd
	 jQuery.ajax({
 	 		type:"POST",
 	 		url: "/ServiceAPI/share/useBoardInfo.json",
 	 		data:{	
 	 				"gubun" : "getCode",
 	 				"code" : "010"
 	 			  },
 	 		success:function(data){
 	 			console.log("data ::", data);
				for(var i=0; i<data.result.length; i++){
					var cont = "";
					cont = "<option value=\"" + data.result[i].sclas_cl + "\">" + data.result[i].sclas_nm +"</option>";
					$("#sgisUseAreaCd").append(cont);
				}
 	 		},
 	 		error:function(data) {
				alert("error");
 	 		}
 		});
 }
 
 //총 게시물 수를 가져온다
 function getTotCnt(){
	 //검색의 콤보박스
	 //sgisUseAreaCd
	 jQuery.ajax({
 	 		type:"POST",
 	 		url: "/ServiceAPI/share/useBoardInfo.json",
 	 		data:{	
 	 				"gubun" : "getTotCnt",
 	 				"sgisUseAreaCd" : sgisUseAreaCd,
	 				"searchCont" 	: searchCont,
	 				"searchGb"		: searchGb,
 	 			  },
 	 		success:function(data){
					$("#totalCnt").html(data.result[0] + "건");

					totCnt = data.result[0];
					
					setPage();
				
 	 		},
 	 		error:function(data) {
				alert("error");
 	 		}
 		});
 }
 
 function setPage(){
	 
		// 큰 인덱스 계산
		if(nowPage % 10 == 0){
			bigIdx = parseInt(nowPage/10);
		}else{
			bigIdx = parseInt(nowPage/10)+1;
		}
		
		//alert(bigIdx);
		
		//총 페이지 계산
		if(totCnt % 5 == 0){
			smallIdx = parseInt(totCnt/5); 
		}else{
			smallIdx = parseInt(totCnt/5)+1;
		}
	 
	 
		$("#pageIndex").html("");
		var startPoint = (bigIdx -1) * 10 + 1;
		for(i=startPoint; i<=startPoint+9; i++){
			if(i <= smallIdx){
				if(i == nowPage){
					$("#pageIndex").append("<span id=\"page" + i + "\" name=\"pageMove\"  class=\"page current\" style=\"cursor:pointer;\">"+ i + "</span>");
				}else{
					$("#pageIndex").append("<span id=\"page" + i + "\" name=\"pageMove\"  class=\"page\" style=\"cursor:pointer;\">"+ i + "</span>");
		//			$("#pageIndex").append("<span name=\"pageMove\" id=\"page" + i + "\">" + i + "</span>&nbsp;&nbsp;");
				}
			}
		}
		
	//	<a href="" class="page">1</a>
	//	<a href="" class="page">2</a>
	//	<a href="" class="page">3</a>
	//	<!-- 현재 페이지활성화 시 current 클래스 추가 -->
	//	<a href="" class="page current">4</a>
	//	<a href="" class="page">5</a>
	//	<a href="" class="page">6</a>
	//	<a href="" class="page">7</a>
		
		
		$("[name='pageMove']").on('click',(function(e){
   			var pageNum = $(this).attr("id");
   			nowPage = pageNum.substring(4);		// id는 "page4" 형식으로 되어 있음. 4만 필요함
   			getUseBoardList();
		})); 
 }
 
 
 
 //활용게시판 상세페이지를 본다
 function getUseBoardView(){
	 //상세View, 
 }
 
 //페이징 다음페이지를 불러온다
 function getNextIndex(){
	 
 }


$(document).ready(function(){
	$('.selectbox').selectbox();
});
</script>
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<link href="/css/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="wrap">
	<!-- header // -->
<!-- 		  <header id="header">
               Top Include
               <script type="text/javascript"  src="/js/common/includeSearch.js"></script>
               
               
           </header> -->
           <header >
	<!-- Top Include -->
	<jsp:include page="/view/common/includeSearch"></jsp:include>
	</header>
	<!-- //header -->
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
					<!-- 게시물 검색// -->
					<div class="article-search3">
							<fieldset>
								<legend class="blind">게시물 검색</legend>
								<div class="f-el f-el-select">
									<span class="el-h blind">
										<label for="atc-sel1">전체</label>
									</span>
									<span class="el-b">
										<select class="selectbox" id="sgisUseAreaCd" name="sgisUseAreaCd">
											<option value="all">전체</option>
										</select>
									</span>
								</div>
								<div class="f-el f-el-select">
									<span class="el-h blind" >
										<label for="atc-sel1">전체</label>
									</span>
									<span >
										<select class="selectbox" id="searchGb">
											<option value="all">전체</option>
											<option value="tit">제목</option>
											<option value="con">내용</option>
										</select>
									</span>
								</div>
								<div>
									<span >
										<label for="searchCont"><!-- 검색어 입력 --></label>
									</span>
									<span >
										<input type="text" id="searchCont" name="searchCont" /> &nbsp;&nbsp;
										<input style="cursor: pointer; width:100px; height:40px; font-size:14px; border:none; color:#fff; background-color:#21b69a;" type="button" onclick="getSearchList()" value="검색">
									</span>
								</div>
							</fieldset>
					</div>
					<!-- // 게시물 검색 -->
					<!-- 게시물 목록 // -->
					<div class="article-list">
						<div class="search-result">
							검색결과 <span class="count" id="totalCnt"></span>
						</div>
						<ul id="contentUl">
							<li>
							</li>
						</ul>
					</div>
					
					<!-- //게시물 목록 -->
					<!-- 페이지 네이션// -->
					<div class="pagenation">
						<span class="btn prev" id="firstBtn" style="cursor:pointer;">&lt;&lt;</span>
						<span class="btn prev" id="preBtn" style="cursor:pointer;">&lt;</span>
						<span class="pages" id=pageIndex>
							<a href="#" class="page current">1</a>
							<a href="#" class="page">2</a>
							<a href="#" class="page">3</a>
							<!-- 현재 페이지활성화 시 current 클래스 추가 -->
							<a href="#" class="page">4</a>
							<a href="#" class="page">5</a>
							<a href="#" class="page">6</a>
							<a href="#" class="page">7</a>
						</span>
						<span class="btn next" id="nextBtn" style="cursor:pointer;">&gt;</span>
						<span class="btn next" id="lastBtn" style="cursor:pointer;">&gt;&gt;</span>
					</div>
					<!-- //페이지 네이션 -->
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
document.write("	<iframe id='authFrame' src='' width='0' height='0' frameborder='0'></iframe>");		//SSO인증
document.write("	<iframe id='registerFrame' src='' width='0' height='0' frameborder='0'></iframe>");					//회원가입
document.write("	<iframe id='unRegisterFrame' src='' width='0' height='0' frameborder='0'></iframe>");				//회원탈퇴
document.write("	<iframe id='loginFrame' src='' width='0' height='0' frameborder='0'></iframe>");					//로그인
document.write("	<iframe id='logoutFrame' src='' width='0' height='0' frameborder='0'></iframe>");					//로그아웃
document.write("	<iframe id='modifyFrame' src='' width='0' height='0' frameborder='0'></iframe>");					//회원수정
	 -->
	<!-- //footer -->
	
	
	 <div style="padding-bottom: 10px;">&nbsp;</div>
	    <!-- footer// -->
	    <!-- <footer id="footer">
	    	<script type="text/javascript"  src="/jsp/share/js/2015_includeBottom_main.js"></script>
	    </footer> -->
	    <footer id="footer">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
 	    </footer>
</div>
</body>
</html>
