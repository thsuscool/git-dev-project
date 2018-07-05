<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%
	String nowPage = (String)request.getParameter("nowPage");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	String member_id=(String)session.getAttribute("member_id");								//session user id
		
	if(member_id == null){
		member_id = "";
	}
		
	if(searchCont == null){
		searchCont = "";
	}
	if(searchGb == null){
		searchGb = "";
	}
	if(nowPage == null){
		nowPage = "1";
	}
%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />  
<meta name="format-detection" content="telephone=no" /> 
<title>SGIS 통계지리정보서비스</title>         
<link rel="stylesheet" href="/edu/jsp/board/include/css/common.css" type="text/css" /> 
<link rel="stylesheet" href="/edu/jsp/board/include/css/notice.css" type="text/css" /> 
<script type="text/javascript" src="/edu/include/js/ui.js"></script>    
<script type="text/javascript" src="/edu/include/js/common.js"></script> 


<script  type="text/javascript">

var nowPage = 1;
var searchCont = "";
var searchGb = "";


var listSize = 10;			//한페이지에 표시될 리스트의 갯수
var pageSize = 10;			//한페이지에 표시될 페이지의 갯수


if(nowPage == ""){
	nowPage = 1;
}

 
function init(){
	getEduBoardList();
	
} 
//mng_s  20170801 로그 추가
apiLogWrite3("Q08","SGIS 게시판 조회");
//mng_e  20170801 로그 추가
 
 //총 게시물 수를 가져온다
 function getEduBoardList(){
	 

	 
	 var dataObj = new Object();
	 
	 
	 dataObj.gubun = "getEduBoardList";
	 dataObj.nowPage = nowPage;
	 dataObj.listSize = listSize;
	 
	 if("" != $("#board_cd").val()){
		 dataObj.board_cd = $("#board_cd").val();
	 }
	 
	 searchGb = $("#search_gb").val();
	 searchCont = $("#search_text").val();
	 if("" != $("#search_text").val()){
		 if($("#search_gb").val()== "1"){
			 dataObj.post_title = $("#search_text").val();
			 dataObj.post_content = $("#search_text").val();
			 dataObj.selectGb = "ALL";
		 }
		 if($("#search_gb").val()== "2"){
			 dataObj.post_title = $("#search_text").val();
			 dataObj.selectGb = "TIT";
			 
		 }
		 if($("#search_gb").val()== "3"){
			 dataObj.post_content = $("#search_text").val();
			 dataObj.selectGb = "CON";
			 
		 }
	 }
	 
	 
		var swt = true;
			$("#eduTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
	 

	 
	 jQuery.ajax({
 	 		type:"POST",
 	 		url: "/ServiceAPI/edu/eduMain.json",
 	 		data : dataObj,
 	 		success:function(data){
 	 			////////////////////paging 처리 start //////////////////////
				 	 var eduListCnt = data.result.eduListCnt;
				 	createPage(eduListCnt);
				////////////////////paging 처리 end //////////////////////
				 	 
				 	 
				 	 
 	 				var listHtml = "";
 	 				for(var i=0; i<data.result.eduList.length; i++){
 	 					
						var board_cd_nm = data.result.eduList[i].board_cd;
						
						if("A" == board_cd_nm){
							board_cd_nm = "자유";
						}else if("B" == board_cd_nm){
							board_cd_nm = "이벤트";
						}
 	 					
 	 					
 	 					listHtml += "<tr>";
 	 					
 	 					var id = data.result.eduList[i].reg_member_id;
 	 					
 	 				 
 	 					var paramStr = "&nowPage=" + nowPage +  "&searchCont=" + searchCont + "&searchGb=" + searchGb +"'";
 	 					
 	 					
 	 					if("0" == data.result.eduList[i].board_rep_no){
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].board_no + "</a></td>";
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + board_cd_nm + "</a></td>";
	 	 					listHtml += "<td  class='tAling'><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].post_title + "</a></td>";
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].reg_member_id + "</a></td>";
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].reg_ts + "</a></td>";
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].post_hits + "</a></td>";
 	 					}else{
	 	 					listHtml += "<td></td>";
	 	 					listHtml += "<td></td>";
	 	 					listHtml += "<td  class='tAling re'><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].post_title + "</a></td>";
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].reg_member_id + "</a></td>";
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].reg_ts + "</a></td>";
	 	 					listHtml += "<td><a href='/edu/jsp/board/edu_board_view.jsp?board_no=" + data.result.eduList[i].board_no + "&board_rep_no=" + data.result.eduList[i].board_rep_no  + paramStr + ">" + data.result.eduList[i].post_hits + "</a></td>";
 	 						
 	 					}
 	 					
 	 					listHtml += "</tr>";
 	 				}
 	 					$("#eduTblBody").append(listHtml);
 	 				
 	 				
 	 				
 	 			/* 	
 	 			<tr>
					<td>999</td>
					<td>분류1</td>
					<td class="tAling">고령화 문제에 대한 의견</td>
					<td>홍길동</td>
					<td>2017.05.22</td>
					<td>123</td>
				</tr>
				<tr>
					<td>999</td>
					<td>분류1</td>
					<td class="tAling re">고령화 문제에 대한 의견</td>
					<td>홍길동</td>
					<td>2017.05.22</td>
					<td>123</td>
				</tr>
 	 			 */	
 	 				
 	 				
 	 				
 	 				$("#listArea").html(listHtml);

				
 	 		},
 	 		error:function(data) {
				alert("error");
 	 		}
 		});
 }
 
 function pageMove(nPage){
	 
	 nowPage = nPage;
	 getEduBoardList();
} 
 
 
 //paging 처리 로직
 function createPage(eduListCnt){
	 
	 var sPage = 1;

 	 
 	 if(nowPage%10 != 0){
	 	 sPage = parseInt(nowPage / pageSize)*pageSize +1;
 	 }else{
	 	 sPage = parseInt((nowPage-1) / pageSize)*pageSize +1 ;
 	 }
 	 

 	 ePage = sPage + (pageSize-1);
 	 
 	 if(parseInt(eduListCnt/listSize) < ePage){
 		ePage = parseInt(eduListCnt/listSize)+1;
 	 }
 	 
 	 
 	var prePage = sPage-1;
 	var nextPage = parseInt(ePage+1);
 	if(prePage < 1){
 		prePage = 1;
 	}
 	if(nextPage > parseInt(eduListCnt /listSize + 1)){
 		nextPage = parseInt(eduListCnt /listSize + 1);
 	}
 	
 	
 	var pagingText = "<li><a href='javascript:pageMove(1)'>&lt;&lt;</a></li>";
 	var pagingText = pagingText + "<li><a href='javascript:pageMove(" + prePage + ");' class='mr10'>" + "&lt;" + " </a></li>";
 	
 	 for(var i= sPage; i<=ePage; i++){
 		var color = "";
 		 if(i==nowPage){
 			color = "class='on'";
 		}
 		pagingText += "<li><a href='javascript:pageMove(" + i + ");'" + color + ">" + i + "</font> </a></li>";
 	 }
 	pagingText += "<li><a href='javascript:pageMove(" + nextPage + ");'>" + "&gt;" + " </a></li> ";
 	pagingText += "<li><a href='javascript:pageMove(" + parseInt(eduListCnt /listSize + 1) + ")'>&gt;&gt;</a></li>";
 	 
		$("#pageUl").html(pagingText);
		
		/* 
		<li><a href="#">&gt;&gt;</a></li> 
		*/
		
 }

$(document).ready(function(){
	
	nowPage = "<%=nowPage%>";
	searchCont = "<%=searchCont%>";
	searchGb = "<%=searchGb%>";
	
	$("#search_text").val(searchCont); 
	$("#search_gb").val(searchGb);
	
	
	
	
	 $("#btn_search").on('click',(function(e){
		 nowPage = "1";
		 getEduBoardList();
  	  }));
	
	 $("#goRegist").on('click',(function(e){
		 
		 var paramStr = "?nowPage=" + nowPage +  "&searchCont=" + searchCont + "&searchGb=" + searchGb;
		 
		 
		 if("<%=member_id%>" != ""){
			 location.href = "http://sgis.kostat.go.kr/edu/jsp/board/edu_board_regist.jsp" + paramStr;
		 }else{
				if(confirm("로그인 하시겠습니까? \n 취소버튼 클릭시 글쓰기 모드로 글을 쓸수 있습니다")){
					var url = "//sgis.kostat.go.kr/edu/jsp/board/edu_board_regist.jsp" + paramStr;
					var curUrl = "/view/member/login_new?returnPage=" + encodeURI(url);
					window.location.href = curUrl;
				}else{
//					location.href = "http://sgis.kostat.go.kr/edu/jsp/board/edu_board_regist.jsp" + paramStr;
					location.href = "/edu/jsp/board/edu_board_regist.jsp" + paramStr;
				}
		 }
		 
		 
  	  }));
	 
	 
	 init();

});
</script>




</head>  
<body>      
	<div class="header" id="header">
		<h1>
			<a href="/"><img src="/edu/jsp/board/include/img/etc/etc_logo.png" alt="SGIS"></a>
			<a href="/edu/jsp/main.jsp"><img src="/edu/jsp/board/include/img/etc/edu_home.png" alt="SGIS" style="margin-left:-15px;"></a>
		</h1>
		<ul class="gnb">
			<li><a id="tit01" href="/edu/jsp/sub01.jsp">SGIS에듀가 알려주는 사회변화</a></li>
			<li><a id="tit02" href="/edu/jsp/sub05.jsp">생활에 유익한 SGIS에듀 체험</a></li>
			<li><a id="tit03" href="/edu/jsp/board/edu_board_list.jsp"  style="color:#ff8e70">이벤트게시판</a></li>
			<li><a id="tit02" href="/edu/jsp/game01.jsp">카드뒤집기</a></li>
			<li><a id="tit02" href="/edu/jsp/game02.jsp">OX퀴즈</a></li>
		</ul>
	</div>
	<div class="container">
		<div class="noticWrap">
			<div class="notic">
				<h1>SGIS에듀 게시판</h1>
				<div class="search">
					<select class="mr10 ml20" id="board_cd">
						<option value="">전체</option>
						<option value="B">이벤트</option>
						<option value="A">자유</option>
						<!-- 
						<option value="C">분류3</option>
						 -->
					</select>
					<select class="mr10"  id="search_gb">
						<option value="1">제목+내용</option>
						<option value="2">제목</option>
						<option value="3">내용</option>
					</select>
					<input type="text" class="mr10" id="search_text" />
					<input type="button"  id="btn_search" value=" "/>
				</div>
				<table class="table01 mt10" id="eduTbl">
				<colgroup>
					<col style="width:px">
					<col style="width:px">
					<col style="width:500px">
					<col style="width:px">
					<col style="width:px">
					<col style="width:px">
				</colgroup>
				<tbody id="eduTblBody">
					<tr>
						<th>글번호</th>
						<th>분류</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일</th>
						<th>조회수</th>
					</tr>
				</tbody>
			</table>
			<button class="noticButton orange fr mt10" id="goRegist">등록</button>
			<div class="page">
				<ul id="pageUl">
				</ul>
			</div>
			
			
		</div>		
	</div>
</div>	

</body>
</html> 