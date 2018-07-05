<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<!-- 세션정보 포함한 jsp임. 개발서버에 올릴때엔 삭제요망 -->
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<%@include file="/jsp/share/imsiLogin.jsp" %>
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

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" /><!-- 전화번호 자동 링크 생성 방지 --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
	<script type="text/javascript"  src="/js/common/includeHead.js"></script>
	<script type="text/javascript" language="javascript">
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
			
			getUseBoardList();
		}));
		$("#nextBtn").on('click',(function(e){

			nowPage = (bigIdx) * 10 + 1;
			
			getUseBoardList();
		}));
		 
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
		 
		 $("#useBoardList").html("");
		 
		 
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
				for(var i=0; i<data.result.length; i++){
					var cont = "";
					cont += "<a href=\"/jsp/share/useBoardView.jsp?sgisUseBoardSeq=" + data.result[i].sgis_use_board_seq  + "&nowPage=" + nowPage;
					cont += "&sgisUseAreaCd=" + sgisUseAreaCd +"&searchCont=" + searchCont + "&searchGb=" + searchGb+ "\">";
					cont += "게시번호" + data.result[i].sgis_use_board_seq + "|&nbsp;&nbsp;&nbsp;|";
					cont += "sgis_use_board_gb" + data.result[i].sgis_use_board_gb + "|&nbsp;&nbsp;&nbsp;|";
					cont += "sgis_use_board_title" + data.result[i].sgis_use_board_title + "|&nbsp;&nbsp;&nbsp;|";
					cont += "sgis_act_cont" + data.result[i].sgis_act_cont + "<br />";
					cont += "</a>";
					
					$("#useBoardList").append(cont);
					
				}
				
				setPage();
 	 		},
 	 		error:function(data) {
 	 		}
 		});
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
	 	 				"gubun" : "getTotCnt"
	 	 			  },
	 	 		success:function(data){
						$("#totalCnt").html(data.result[0]);

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
						$("#pageIndex").append("<span name=\"pageMove\" id=\"page" + i + "\" style=\"font-size:17px; color:red;\">"+ i + "</span>&nbsp;&nbsp;");
					}else{
						$("#pageIndex").append("<span name=\"pageMove\" id=\"page" + i + "\">" + i + "</span>&nbsp;&nbsp;");
					}
				}
			}
			
			
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
	 
	</script>
	</head>

	<body >
		<div class="wrapper">
			<!-- cls:header start -->
			<div class="header"> 
			<!-- top  탑영역-->
		  	<!-- /top -->			
  			</div><!-- cls:header end -->


			<!-- cls:contents start -->
			<div class="contents subbg">
				<div class="container">
					<div class="lnb">
					</div>
					
		<div class="acticle">
		
<!--활용사례 조회 -->
				<div class="caseselectWrapper">
					<select class="select" id="sgisUseAreaCd" name="sgisUseAreaCd">
						<option value="all">전체</option>
					</select>
					<select class="select" title="카테고리 선택" id="searchGb" name="searchGb">
						<option value="all">전체</option>
						<option value="tit">제목</option>
						<option value="cont">내용</option>
					</select>
					<input type="text" title="검색어입력" class="input_use13" id="searchCont" name="searchCont" value="" >
					<input type="button" alt="검색"  onclick="getSearchList()" />
				</div>
				<div class="caseFont">검색결과 <span id="totalCnt"></span>건</div>
				<div id="useBoardList">
				</div>
					<input type="button" id="firstBtn" value="처음" />
					<input type="button" id="preBtn" value="이전인덱스" />
				<div id="pageIndex">
					<span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>6</span> <span>7</span> <span>8</span> <span>9</span> <span>10</span>
				</div>
					<input type="button" id="nextBtn" value="다음인덱스" />
					<input type="button" id="lastBtn" value="끝" />
		<!-- //활용사례 조회-->

					<!-- center contents end -->
			<br /><br />&nbsp;
					
				</div>
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
			</div><!-- cls:footer end -->
		</div> 
	</div>
	</body>
</html>