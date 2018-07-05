<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%
	String board_no = (String)request.getParameter("board_no");
	String board_rep_no = (String)request.getParameter("board_rep_no");
	String nowPage = (String)request.getParameter("nowPage");
	String searchCont = (String)request.getParameter("searchCont");
	String searchGb = (String)request.getParameter("searchGb");
	if(nowPage == null){
		nowPage = "1";
	}
	
	String member_id=(String)session.getAttribute("member_id");								//session user id
%>

<!DOCTYPE html>
<html> 
<head>
<meta charset="utf-8" />  
<meta name="format-detection" content="telephone=no" /> 
<title>SGIS 통계지리정보서비스</title>         
<link rel="stylesheet" href="/edu/jsp/board/include/css/common.css" type="text/css" /> 
<link rel="stylesheet" href="/edu/jsp/board/include/css/notice.css" type="text/css" /> 
<script type="text/javascript" src="/edu/include/js/ui.js"></script>    
<script type="text/javascript" src="/edu/include/js/common.js"></script>  
<script>





var member_id = "<%= member_id%>";

var nowPage = "<%=nowPage %>";
var searchCont = "<%=searchCont %>";
var searchGb = "<%=searchGb %>";
var reg_member_id = "";

var paramStr = "nowPage=" + nowPage +  "&searchCont=" + searchCont + "&searchGb=" + searchGb;

function getEduBoardView(){
	//mng_s  20170801 로그 추가
	apiLogWrite3("Q08","SGIS 게시판 조회");
	//mng_e  20170801 로그 추가
	
	
	
	 var dataObj = new Object();
	 dataObj.gubun = "getEduBoardView";
	 dataObj.board_no = "<%= board_no%>";
	 dataObj.board_rep_no = "<%= board_rep_no%>";

	 
	 
	 jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/edu/eduMain.json",
	 		data : dataObj,
	 		success:function(data){
	 			
	 			if("<%= member_id%>" != data.result.getEduBoardView.reg_member_id2){
	 				$("#modifyBtn").hide();
	 				$("#deleteBtn").hide();
	 			}
	 			
	 			reg_member_id = data.result.getEduBoardView.reg_member_id;
	 			
	 			$("#post_title").html(data.result.getEduBoardView.post_title);
	 			
	 			$("#reg_member_id").html(data.result.getEduBoardView.reg_member_id + " " + data.result.getEduBoardView.reg_ts + "  조회수" + data.result.getEduBoardView.post_hits);
	 			
	 			var postContentStr = data.result.getEduBoardView.post_content;
	 			//alert(postContentStr);
	 			//postContentStr = replaceAll("<br />", "\n", postContentStr);
	 			
	 			//alert(postContentStr);
	 			$("#post_content").html(postContentStr);
	 			//$("#ref_file").html(data.result.getEduBoardView.ref_file);
	 			if(data.result.getEduBoardView.ref_file != null){
		 			$("#ref_file").html("<a href='/upload/edu/" + data.result.getEduBoardView.ref_file + "'>" + data.result.getEduBoardView.ref_file + "</a>");
	 			}

				
	 		},
	 		error:function(data) {
				alert("error");
	 		}
		});
	 
}

function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
}

$(document).ready(function(){
	
	 
	 
	 if("<%=board_rep_no%>" != "0"){
		 $("#replyBtn").hide();
	 }

	
	
	
	getEduBoardView();

	$("#listBtn").on('click', (function(e) {
		location.href = "/edu/jsp/board/edu_board_list.jsp?" + paramStr;
		
	}));
	
	
	$("#modifyBtn").on('click', (function(e) {
		
		location.href = "/edu/jsp/board/edu_board_modify.jsp?board_no=<%= board_no%>&board_rep_no=<%= board_rep_no%>&" + paramStr;
		
	}));
	
	$("#deleteBtn").on('click', (function(e) {
		 var dataObj = new Object();
		 dataObj.gubun = "getEduBoardDelete";
		 dataObj.board_no = "<%= board_no%>";
		 dataObj.board_rep_no = "<%= board_rep_no%>";

		 
		 if("<%= member_id%>" == reg_member_id){
				alert("본인이 등록한 글이 아닙니다");
		 }else{
			 
		 if(confirm("게시물을 삭제하시겠습니까?")){
			 
			 jQuery.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/edu/eduMain.json",
			 		data : dataObj,
			 		success:function(data){
			 			
			 			if(data.result.resultVal== 0){
			 				alert("삭제할 수 없습니다");
			 			}else{
			 				alert("삭제하였습니다");
			 				location.href = "/edu/jsp/board/edu_board_list.jsp";
			 			}
			 			
			 		},
			 		error:function(data) {
						alert("error");
			 		}
				});
		 }
		 
		 }
		
	}));
	
	
	$("#replyBtn").on('click', (function(e) {
		
		location.href = "/edu/jsp/board/edu_board_reply.jsp?board_no=<%= board_no%>&board_rep_no=<%= board_rep_no%>&"  + paramStr;
		
	}));
	

	

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
				
				<table class="table03 mt40">
				<colgroup>
					<col style="width:150px;"/>
					<col />
				</colgroup>
				<tbody>
					<tr>
						<th colspan="2"><span style="text-align:left; font-size:18px; color:#395849; float:left;" id="post_title"></span> <span id="reg_member_id"></span></th>
					</tr>
					<tr  style="height:450px;">					
						<td colspan="2">
							<div style="height:400px;" id="post_content">
							고령화 문제에 대한 의견입니다.<br/>농촌은 젊은인구가 거의 남이있지 않습니다.<br/>고령화 문제에 대한 의견입니다.<br/>농촌은 젊은인구가 거의 남이있지 않습니다.
							</div>
						</td>
					</tr>					
					<tr>
						<td>파일첨부</td>
						<td><span id="ref_file"></span></td>
					</tr>
					
				</tbody>
			</table>
			<div class="fr mt30">
				<button class="noticButton orange mr10" id="replyBtn">답글</button>
				<button class="noticButton bule mr10" id="modifyBtn">수정</button>
				<button class="noticButton bule mr10" id="deleteBtn">삭제</button>
				<button class="noticButton bule " id="listBtn">목록</button>
			</div>
			
			
			
		</div>		
	</div>
	
</div>
</body>
</html> 